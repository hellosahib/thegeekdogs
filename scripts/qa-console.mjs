#!/usr/bin/env node
/**
 * qa:console — PLAN.md §9.
 *
 * Serves dist/ and visits every built route headless, failing on any
 * console.error, console.warn, uncaught pageerror, or failed request.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { chromium } from '@playwright/test';
import { DIST, htmlFiles, report, requireDist } from './lib/dist.mjs';

requireDist();

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(pathname) {
  const candidates = [join(DIST, pathname)];
  if (pathname.endsWith('/')) candidates.push(join(DIST, pathname, 'index.html'));
  else candidates.push(join(DIST, `${pathname}/index.html`), join(DIST, `${pathname}.html`));
  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = await resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const routes = htmlFiles().map((file) => {
  const path = relative(DIST, file);
  return path === '404.html' ? '/404.html' : '/' + path.replace(/index\.html$/, '');
});

const failures = [];
const browser = await chromium.launch();

for (const route of routes) {
  const page = await browser.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      failures.push(`${route}  console.${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => failures.push(`${route}  pageerror: ${error.message}`));
  page.on('requestfailed', (request) =>
    failures.push(`${route}  request failed: ${request.url()} (${request.failure()?.errorText})`),
  );
  const response = await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
  if (!response || !response.ok()) {
    failures.push(`${route}  returned ${response ? response.status() : 'no response'}`);
  }
  await page.close();
}

await browser.close();
server.close();

console.log(`      ${routes.length} route(s) visited: ${routes.join(', ')}`);
process.exit(report('qa:console', failures));
