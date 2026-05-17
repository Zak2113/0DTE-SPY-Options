import type * as duckdb from '@duckdb/duckdb-wasm';

let dbInstance: duckdb.AsyncDuckDB | null = null;

export const useDuckDb = () => {
  const initDB = async () => {
    if (import.meta.server) return null;
    if (dbInstance) return dbInstance;

    const duckdbLib = await import('@duckdb/duckdb-wasm');
    const duckdb_wasm = (await import('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url')).default;
    
    // FIX 1: Changed from ?worker to ?url
    const mvp_worker = (await import('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url')).default;
    
    const duckdb_wasm_eh = (await import('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url')).default;
    
    // FIX 1: Changed from ?worker to ?url
    const eh_worker = (await import('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url')).default;

    const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
      mvp: { mainModule: duckdb_wasm, mainWorker: mvp_worker },
      eh: { mainModule: duckdb_wasm_eh, mainWorker: eh_worker },
    };

    const bundle = await duckdbLib.selectBundle(MANUAL_BUNDLES);
    
    // FIX 2: Explicitly call new Worker() using the string URL
    const worker = new Worker(bundle.mainWorker!);
    
    const logger = new duckdbLib.ConsoleLogger();
    const db = new duckdbLib.AsyncDuckDB(logger, worker);
    
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    dbInstance = db;
    return db;
  };

  const getContractData = async (fileUrl: string, fileName: string) => {
    const db = await initDB();
    if (!db) throw new Error("Database failed to initialize");
    
    // 1. FETCH THE FILE FROM YOUR SERVER
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to fetch data from ${fileUrl}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // 2. Load the fetched buffer into DuckDB's memory
    await db.registerFileBuffer(fileName, buffer);
    
    const conn = await db.connect();

    // 3. Dynamically check the schema 
    // (Handles variations where column is 'date' vs 'timestamp', or missing 'volume')
    const schemaQuery = await conn.query(`DESCRIBE SELECT * FROM read_parquet('${fileName}')`);
    const cols = schemaQuery.toArray().map(r => r.column_name);
    
    const timeCol = cols.includes('timestamp') ? 'timestamp' : 'date';
    const volSelect = cols.includes('volume') ? 'volume' : '0 as volume';

    // 4. Extract OHLCV
    const query = `
      SELECT 
        epoch(CAST(${timeCol} AS TIMESTAMP)) as time, 
        open, high, low, close, ${volSelect}
      FROM read_parquet('${fileName}')
      WHERE open IS NOT NULL
      ORDER BY time ASC
    `;
    
    const result = await conn.query(query);
    await conn.close();
    
    // 5. Drop the file from memory to keep the app lightweight
    await db.dropFile(fileName);

    // Format for Plotly
    return result.toArray().map((row) => ({
      time: Number(row.time),
      open: Number(row.open),
      high: Number(row.high),
      low: Number(row.low),
      close: Number(row.close),
      value: Number(row.volume || 0), 
      // Using solid hex colors for Plotly
      color: Number(row.close) >= Number(row.open) ? '#10B981' : '#EF4444' 
    }));
  };

  return { initDB, getContractData };
};

//test