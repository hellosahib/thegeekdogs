#!/usr/bin/env node
/**
 * Playwright screenshots of the built dist/, at the given widths, in both schemes.
 *
 * Usage:
 *   node screenshots.mjs <outDir> <route:name> [<route:name> ...] -- <width,width>
 *
 * Routes are given as "path:label", e.g. "/work/:work".
 *
 * Two optional flags, both added for the floor-pass-2 evidence and both general:
 *   --el <css>   shoot that element rather than the full page. The file is named
 *                "<label>-<width>-<scheme>.png" rather than "…-full.png".
 *   --reduce     run the contexts under `prefers-reduced-motion: reduce`, and mark
 *                the files "-reduced".
 */
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from './lib/serve.mjs';

const argv = process.argv.slice(2);

const reduce = argv.includes('--reduce');
const elIndex = argv.indexOf('--el');
const selector = elIndex === -1 ? null : argv[elIndex + 1];

const args = argv.filter((a, i) => a !== '--reduce' && i !== elIndex && i !== elIndex + 1);
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
      reducedMotion: reduce ? 'reduce' : 'no-preference',
    });
    const page = await ctx.newPage();
    for (const route of routes) {
      await page.goto(base + route.path, { waitUntil: 'networkidle' });
      /* Long enough for §H.3's whole 2.5s moment to have played out and settled, so
         what is captured is the room at rest rather than a frame of the sequence. */
      await page.waitForTimeout(reduce ? 600 : 3200);
      const suffix = reduce ? '-reduced' : '';
      if (selector) {
        const target = page.locator(selector);
        await target.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await target.screenshot({
          path: join(outDir, `${route.name}-${width}-${scheme}${suffix}.png`),
        });
      } else {
        await page.screenshot({
          path: join(outDir, `${route.name}-${width}-${scheme}${suffix}-full.png`),
          fullPage: true,
        });
      }
    }
    await ctx.close();
  }
}

await browser.close();
close();
console.log('shots written to', outDir);
