#!/usr/bin/env node
/**
 * Run C's evidence, which `screenshots.mjs` cannot take on its own.
 *
 * Two things this run changed need a picture at a SCROLL POSITION rather than a full
 * page, because both are about what the sticky plate is over at the moment it rests:
 *
 * 1. `/` at 360 and 390, scrolled so the plate is at rest over the work-card strip —
 *    DESIGN.md §B.10 round 10's own 360 wireframe, which is drawn at the first scroll
 *    position where the plate exists at all below 768.
 * 2. `/` at 360 scrolled into the FLOOR, where the plate must be absent: round 10's
 *    change three takes the plate's wrapper off the floor section below 768, and the
 *    card panel's 280px measure must be uncovered at every scroll position.
 *
 * It also shoots the empty room on `/404` at its own viewport rather than full page, and
 * the floor's chair station on `/`, because run C moved the lamp's cord and shade out of
 * `#fl-seat` into a shared `#fl-lamp` symbol and the chair must be unchanged by it.
 */
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from './lib/serve.mjs';

const outDir = process.argv[2] ?? 'docs/reviews/runC/engineer';
const { base, close } = await serveDist();
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

const shot = (page, name) => page.screenshot({ path: join(outDir, `${name}.png`) });

for (const scheme of ['light', 'dark']) {
  /* --- `/` below 768: the plate at rest, and the floor without it. --- */
  for (const width of [360, 390]) {
    const ctx = await browser.newContext({
      viewport: { width, height: 640 },
      deviceScaleFactor: 1,
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3200);

    /*
      The floor carries `content-visibility: auto`, so its box is the 1180px
      `contain-intrinsic-size` estimate until it has actually been laid out. Measuring it
      from scroll 0 puts every position below it in the wrong place, so the page is
      walked to the bottom and back first and the measurement is taken after that.
    */
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) window.scrollTo(0, y);
      window.scrollTo(0, 0);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    });
    const top = await page.evaluate(() => {
      const floor = document.querySelector('#studio-floor');
      return Math.round(floor.getBoundingClientRect().bottom + window.scrollY);
    });
    await page.evaluate((y) => window.scrollTo(0, y), top + 120);
    await page.waitForTimeout(300);
    await shot(page, `home-${width}-${scheme}-plate-strip`);

    /*
      And the same page at the LAST scroll position where the floor fills the viewport —
      the floor's bottom edge on the viewport's bottom edge, which is the tightest case
      round 10's change three has to answer: with the old single wrapper the plate rested
      here, 16px up and 112 wide, over the card panel's last lines.
    */
    await page.evaluate((y) => window.scrollTo(0, y), top - 640);
    await page.waitForTimeout(300);
    await shot(page, `home-${width}-${scheme}-floor-noplate`);

    /*
      The picture is one scroll position; the rule is every scroll position. Walk the
      whole page in 80px steps and assert that the plate's own box never intersects the
      floor section's. §B.10 change three's standard for the card panel is "never
      covered — not at rest, not mid-scroll, not at any scroll position".
    */
    const hits = await page.evaluate(async () => {
      const floor = document.querySelector('#studio-floor');
      const plate = document.querySelector('.plate');
      const bad = [];
      let steps = 0;
      for (let y = 0; y < document.body.scrollHeight; y += 80) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(r));
        steps += 1;
        const f = floor.getBoundingClientRect();
        const p = plate.getBoundingClientRect();
        if (p.bottom > f.top && p.top < f.bottom && p.right > f.left && p.left < f.right) {
          bad.push(y);
        }
      }
      window.scrollTo(0, 0);
      return { steps, bad };
    });
    console.log(
      `      / @ ${width} ${scheme}: ${hits.steps} scroll positions, plate over the floor at ${hits.bad.length}` +
        (hits.bad.length ? ` — ${hits.bad.slice(0, 5).join(', ')}` : ''),
    );

    await ctx.close();
  }

  /* --- `/404`: the empty room in the viewport it is read in. --- */
  for (const width of [360, 1440]) {
    const ctx = await browser.newContext({
      viewport: { width, height: width === 360 ? 640 : 900 },
      deviceScaleFactor: 1,
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    await page.goto(base + '/404.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await shot(page, `404-${width}-${scheme}-viewport`);
    await ctx.close();
  }

  /* --- the floor's chair, which the `#fl-lamp` refactor must have left alone. --- */
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: scheme,
  });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);
  const scene = page.locator('.scene--wide');
  await scene.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const b = await scene.boundingBox();
  await page.screenshot({
    path: join(outDir, `floor-chair-1440-${scheme}.png`),
    clip: { x: b.x + b.width * 0.36, y: b.y + b.height * 0.5, width: b.width * 0.34, height: b.height * 0.52 },
  });
  await ctx.close();
}

await browser.close();
close();
console.log('run C evidence written to', outDir);
