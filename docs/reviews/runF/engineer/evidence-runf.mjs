/**
 * Run F's rendered evidence — items N1 and N2.
 *
 * N1: `/sahib/`'s coverage map at 360 and 390, both schemes, with the plate on screen, and
 *     the measured ink right edge of every product name against §B.10's band.
 * N2: `/` at 360 with the fourth station card open, and the document's own scrollHeight
 *     before and after, which is the number §C.6's reservation is actually about.
 */
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from '../../../../scripts/lib/serve.mjs';

const OUT = new URL('.', import.meta.url).pathname;
const { base, close } = await serveDist();
const browser = await chromium.launch();

/* --- N1 --- */
for (const scheme of ['light', 'dark']) {
  for (const width of [360, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(base + '/sahib/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2200);

    const measured = await page.evaluate(() => {
      const band = window.innerWidth - 128;
      const rows = [];
      for (const el of document.querySelectorAll('.map__cell-product')) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.width > 0);
        rows.push({
          text: (el.textContent ?? '').trim(),
          right: Math.round(Math.max(...rects.map((r) => r.right)) * 10) / 10,
        });
      }
      rows.sort((a, b) => b.right - a.right);
      return { band, widest: rows[0], over: rows.filter((r) => r.right > band).length };
    });

    await page.locator('.map').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.screenshot({ path: join(OUT, `sahib-map-${width}-${scheme}.png`) });
    console.log(
      `N1  ${scheme.padEnd(5)} ${width}  widest product ink x ${measured.widest.right} against a band at x ${measured.band}` +
        `  ("${measured.widest.text}")  over the band: ${measured.over}`,
    );
    await ctx.close();
  }
}

/* --- N2 --- */
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);

  const before = await page.evaluate(() => document.documentElement.scrollHeight);
  const fourth = await page.evaluate(
    () => [...document.querySelectorAll('[data-floor-slot] [data-card]')][3]?.dataset.card ?? '',
  );
  await page.click(`[data-station="${fourth}"]`);
  const after = await page.evaluate(() => document.documentElement.scrollHeight);

  await page.locator('.floor__slot').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(OUT, `home-card4-360-${scheme}.png`) });
  console.log(
    `N2  ${scheme.padEnd(5)} 360  fourth card "${fourth}" opened: scrollHeight ${before} -> ${after} (${after - before}px)`,
  );
  await ctx.close();
}

await browser.close();
close();
