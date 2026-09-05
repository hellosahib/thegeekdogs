import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { DIST } from './dist.mjs';

/**
 * The one static server the browser-driven scripts share.
 *
 * Every QA script in this repo runs against the built `dist/`, never against `astro
 * dev` — a dev server serves different bytes, and the budget, the hit tests and the
 * screenshots all have to be true of the thing that ships.
 */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolve(urlPath) {
  let file = join(DIST, decodeURIComponent(urlPath));
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await stat(file);
  } catch {
    return null;
  }
  return file;
}

/** Serves `dist/` on an ephemeral port. Returns `{ base, close }`. */
export async function serveDist() {
  const server = createServer(async (req, res) => {
    const file = await resolve(new URL(req.url, 'http://x').pathname);
    if (!file) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      res.end('missing');
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return {
    base: `http://127.0.0.1:${server.address().port}`,
    close: () => server.close(),
  };
}
