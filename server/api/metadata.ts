import fs from 'node:fs/promises';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  
  // Magic routing: Handles both relative (Local) and absolute (Docker) paths automatically
  const dataDir = path.resolve(process.cwd(), config.serverDataDir);
  const metadata: Record<string, { C: number[], P: number[] }> = {};

  try {
    const folders = await fs.readdir(dataDir, { withFileTypes: true });

    for (const folder of folders) {
      if (!folder.isDirectory() || !folder.name.startsWith('day_str=')) continue;

      const dateStr = folder.name.replace('day_str=', '');
      
      // Filter weekends
      const dateObj = new Date(`${dateStr}T12:00:00Z`);
      const dayOfWeek = dateObj.getUTCDay(); 
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const dayPath = path.join(dataDir, folder.name);
      const files = await fs.readdir(dayPath);

      metadata[dateStr] = { C: [], P: [] };

      for (const file of files) {
        const match = file.match(/part-(\d+(?:\.\d+)?)-([CP])\.parquet/);
        if (match) {
          const strike = Number(match[1]);
          const right = match[2] as 'C' | 'P';
          if (!metadata[dateStr][right].includes(strike)) {
            metadata[dateStr][right].push(strike);
          }
        }
      }

      // Sort strikes
      metadata[dateStr].C.sort((a, b) => a - b);
      metadata[dateStr].P.sort((a, b) => a - b);
    }

    return metadata;
  } catch (error) {
    console.error(`Metadata Error: Could not read directory at ${dataDir}`);
    return {}; 
  }
});