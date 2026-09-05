#!/usr/bin/env node
/**
 * Playwright screenshots of the built dist/, at the given widths, in both schemes.
 *
 * Usage: node shots.mjs <outDir> <route:name> [<route:name> ...] -- <width,width>
 * Routes are given as "path:label", e.g. "/work/:work".
 */
import { createServer } from 'node:http';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const REPO = new URL('..', import.meta.url).pathname;
const DIST = join(REPO, 'dist');

const args = process.argv.slice(2);
const sep = args.indexOf('--');
const outDir = args[0];
const routes = args.slice(1, sep === -1 ? undefined : sep).map((s) => {
  const i = s.lastIndexOf(':');
  return { path: s.slice(0, i), name: s.slice(i + 1) };
});
const widths = (sep === -1 ? '360,768,1440' : args[sep + 1]).split(',').map(Number);

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
  let p = join(DIST, decodeURIComponent(urlPath));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
  } catch {
    return null;
  }
  try {
    await stat(p);
  } catch {
    return null;
  }
  return p;
}

const server = createServer(async (req, res) => {
  const file = await resolve(new URL(req.url, 'http://x').pathname);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('missing');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const scheme of ['light', 'dark']) {
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    for (const route of routes) {
      await page.goto(base + route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);
      await page.screenshot({
        path: join(outDir, `${route.name}-${width}-${scheme}-full.png`),
        fullPage: true,
      });
    }
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log('shots written to', outDir);
