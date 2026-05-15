import fs from 'node:fs';
import path from 'node:path';
import { sendStream, createError, getHeader, setResponseHeader } from 'h3';

export default defineEventHandler(async (event) => {
  // 1. Basic Anti-Hotlinking
  const referer = getHeader(event, 'referer');
  const host = getHeader(event, 'host');
  if (!referer || !referer.includes(host as string)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden Access' });
  }

  // 2. Resolve Path (Local vs Docker)
  const config = useRuntimeConfig(event);
  const baseDir = path.resolve(process.cwd(), config.serverDataDir);
  
  const requestedPath = event.context.params?.slug; 
  if (!requestedPath) throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

  const fullPath = path.resolve(baseDir, requestedPath);

  // 3. Security: Prevent Directory Traversal
  if (!fullPath.startsWith(baseDir)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden Path' });
  }

  // 4. Check File Exists
  if (!fs.existsSync(fullPath)) {
    throw createError({ statusCode: 404, statusMessage: 'Contract not found' });
  }

  // 5. Stream the Parquet File
  const stat = fs.statSync(fullPath);
  setResponseHeader(event, 'Content-Length', stat.size);
  setResponseHeader(event, 'Content-Type', 'application/vnd.apache.parquet');
  setResponseHeader(event, 'Cache-Control', 'private, max-age=3600');

  const fileStream = fs.createReadStream(fullPath);
  return sendStream(event, fileStream);
});