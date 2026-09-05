#!/usr/bin/env node
/**
 * Playwright screenshots of the built dist/, at the given widths, in both schemes.
 *
 * Usage: node shots.mjs <outDir> <route:name> [<route:name> ...] -- <width,width>
 * Routes are given as "path:label", e.g. "/work/:work".
 */
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from './lib/serve.mjs';

const args = process.argv.slice(2);
const sep = args.indexOf('--');
const outDir = args[0];
const routes = args.slice(1, sep === -1 ? undefined : sep).map((s) => {
  const i = s.lastIndexOf(':');
  return { path: s.slice(0, i), name: s.slice(i + 1) };
});
const widths = (sep === -1 ? '360,768,1440' : args[sep + 1]).split(',').map(Number);

const { base, close } = await serveDist();

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
close();
console.log('shots written to', outDir);
