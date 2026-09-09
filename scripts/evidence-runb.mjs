#!/usr/bin/env node
/**
 * Build run B's rendered evidence, in one pass over the built `dist/`.
 *
 * Written for this run and left in the repo because the next one needs the same four
 * things: reduced motion, keyboard focus on the first three stops, the print stylesheet
 * as an actual PDF (Playwright's `page.pdf` emulates print media, which a screenshot
 * with `emulateMedia` alone does not), and the routes this run changed.
 *
 * `scripts/screenshots.mjs` still covers plain full-page shots at a list of widths.
 */
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from './lib/serve.mjs';

const OUT = process.argv[2] ?? 'docs/reviews/runB/engineer';
const PERSON = [
  { path: '/sahib/', name: 'sahib' },
  { path: '/tanya/', name: 'tanya' },
];
const FIXED = [
  { path: '/', name: 'home' },
  { path: '/work/', name: 'work' },
  { path: '/work/pocket-manager/', name: 'pm' },
  { path: '/work/milan/', name: 'wp' },
  { path: '/contact/', name: 'contact' },
  { path: '/404.html', name: '404' },
];

const { base, close } = await serveDist();
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

/** The first three tab stops: skip link, wordmark, then the first nav label. */
async function focusShots(page, name, width, scheme) {
  await page.keyboard.press('Tab');
  for (let stop = 1; stop <= 3; stop += 1) {
    await page.screenshot({ path: join(OUT, `${name}-${width}-${scheme}-focus${stop}.png`) });
    await page.keyboard.press('Tab');
  }
}

for (const scheme of ['light', 'dark']) {
  // Reduced motion: §H.4's still frame is the complete map and the complete band.
  for (const width of [360, 1440]) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: scheme,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    for (const route of PERSON) {
      await page.goto(base + route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);
      await page.screenshot({
        path: join(OUT, `${route.name}-${width}-${scheme}-reducedmotion.png`),
        fullPage: true,
      });
    }
    await ctx.close();
  }

  // Focus, first three stops, on the two new routes.
  for (const width of [360, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const route of PERSON) {
      await page.goto(base + route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2600);
      await focusShots(page, route.name, width, scheme);
    }
    await ctx.close();
  }

  // The routes this run changed, at the two ends.
  for (const width of [360, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const route of FIXED) {
      await page.goto(base + route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2600);
      await page.screenshot({
        path: join(OUT, `fixed-${route.name}-${width}-${scheme}-full.png`),
        fullPage: true,
      });
    }
    await ctx.close();
  }
}

/*
  The print stylesheet, as PDF. §D.8 prints the LIGHT tokens whatever the visitor's
  theme, so this is taken from a context seeded dark: if the sheet is right the PDF is
  identical to one taken light, and if it is wrong the PDF is the failure.
*/
const printCtx = await browser.newContext({ viewport: { width: 1024, height: 900 }, colorScheme: 'dark' });
const printPage = await printCtx.newPage();
for (const route of [...PERSON, { path: '/', name: 'home' }]) {
  await printPage.goto(base + route.path, { waitUntil: 'networkidle' });
  await printPage.emulateMedia({ media: 'print' });
  await printPage.pdf({ path: join(OUT, `print-${route.name}.pdf`), format: 'A4', printBackground: true });
  await printPage.screenshot({ path: join(OUT, `print-${route.name}.png`), fullPage: true });
  await printPage.emulateMedia({ media: 'screen' });
}
await printCtx.close();

await browser.close();
close();
console.log('run B evidence written to', OUT);
