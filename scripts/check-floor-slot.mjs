#!/usr/bin/env node
/**
 * check-floor-slot — DESIGN.md §C.6's reservation, asserted the way a reader meets it.
 *
 * §C.6: the slot is *"a reservation, not a box"*, sized so that **"the longest card fits
 * without the section reflowing"**. PLAN.md §4.3 asked for a build-time assertion of that
 * promise and what it got was an assertion of the *numbers* — the tallest card measured
 * against the `min-height` written beside it. The final rendered review (item N2) found
 * what that misses: `min-height` is a BORDER-BOX number, `box-sizing: border-box` is set
 * site-wide, and this slot carries 24px of padding at both ends, so a 320 reservation
 * offers a card 272. Every one of the four numbers was short by roughly its own padding,
 * and the page grew when a visitor opened a human's card —
 *
 *   360: +57.0    390: +31.1    768: +35.3    1024: +38.7    1440: 0
 *
 * — the whole floor section and everything under it stepping down, 57px of it under the
 * reader's own thumb at 360. Lighthouse could not see it, because a shift initiated by an
 * input inside 500ms is excluded from CLS by definition. That exclusion is correct for
 * CLS and useless here: §C.6's promise is that nothing moves, not that nothing is *scored*
 * for moving.
 *
 * So this script asserts the promise itself rather than the arithmetic behind it. It opens
 * each of the ten cards through the real path a visitor uses — a click on the station
 * button — and requires `document.documentElement.scrollHeight` to be **exactly** what it
 * was with the default card showing. Not "within a few pixels": the reservation either
 * holds the longest card or it does not, and a partial reservation is the defect.
 *
 * It is a stronger assertion than the numbers were, and it is cheaper to keep true: a copy
 * edit that adds a line to any card fails here without anyone having to re-measure a table.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

/** §C.6's own four breakpoints, plus 390 — the width the review measured the thumb at. */
const WIDTHS = [360, 390, 768, 1024, 1440];

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let opened = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' });

  /*
    §H.3's "lights on" is a set of CSS animations on the scene, and one of them is still
    running on the frame after `load`. None of them moves a box — §H.3 is opacity and
    transform only — but the wait costs nothing and removes the question from the result.
  */
  await page.waitForTimeout(3000);

  const ids = await page.$$eval('[data-floor-slot] [data-card]', (cards) =>
    cards.map((card) => card.dataset.card ?? ''),
  );

  if (ids.length !== 10) {
    failures.push(`@ ${width}: the floor has ${ids.length} cards and §C.2 says ten`);
    await ctx.close();
    continue;
  }

  const baseline = await page.evaluate(() => document.documentElement.scrollHeight);
  const openCard = await page.evaluate(
    () =>
      [...document.querySelectorAll('[data-floor-slot] [data-card]')].find((c) => !c.hidden)
        ?.dataset.card ?? '',
  );

  for (const id of ids) {
    /*
      The station button, not the card — this is the visitor's path, and it exercises the
      script's own `show()` alongside the reservation. Playwright scrolls the button into
      view before it clicks, which moves `scrollTop` and never `scrollHeight`.
    */
    await page.click(`[data-station="${id}"]`);
    const shown = await page.$eval(`[data-card="${id}"]`, (card) => !card.hidden);
    if (!shown) {
      failures.push(`@ ${width}: clicking the "${id}" station did not open its card`);
      continue;
    }
    opened += 1;

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    if (height !== baseline) {
      const delta = height - baseline;
      failures.push(
        `@ ${width}: opening the "${id}" card moved the page ${delta > 0 ? '+' : ''}${delta}px ` +
          `(scrollHeight ${baseline} -> ${height}); §C.6 reserves the longest card's whole box, ` +
          `and the fix is the reservation, never the card`,
      );
    }
  }

  const moved = failures.filter((line) => line.startsWith(`@ ${width}:`)).length;
  console.log(
    `      ${width}: ten cards opened from "${openCard}", baseline scrollHeight ${baseline}` +
      (moved === 0 ? ' — held' : ` — MOVED on ${moved}`),
  );
  await ctx.close();
}

await browser.close();
close();

console.log(`      ${opened} card opening(s) measured across ${WIDTHS.length} widths`);
process.exit(report('check-floor-slot', failures));
