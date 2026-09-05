#!/usr/bin/env node
/**
 * qa:plate — DESIGN.md §B.10's composition rule, measured.
 *
 * > No load-bearing mark — one whose meaning is lost when part of it is hidden: a stage
 * > node, a printed address, a CTA, a form control, a card's price line — may have its
 * > *right edge* inside the plate's band, anywhere inside the plate's wrapper. Prose and
 * > headings may run under the band; a mark that is read as a unit may not end inside it.
 *
 * Round 10 makes the rule bind at every width and gives the band two values: 276px at
 * >= 768 and 128px below it, both measured from the viewport's right edge.
 *
 * The rule has been enforced three times now by three people reading screenshots, and it
 * has been broken three times in the same way — the run A review found `/contact/`'s
 * third address and `/work/`'s last two stage nodes, and this run found the coverage
 * map's lit cell and a work card's date line at 768. It is arithmetic on a rendered box,
 * so it should be a script and not a reading.
 *
 * The selector list below is the rule's own list, made concrete. A mark whose right edge
 * lands inside the band fails; everything else on the page is prose or a heading, which
 * the rule exempts in terms.
 *
 * **It measures INK, not boxes.** A vertical stage track's label lives in a grid cell
 * that spans the container, and a card's date line is a block that spans the card, so
 * the element box says "this mark reaches x 736" when the mark itself stops at x 190.
 * Every text mark is therefore measured through a Range over its own contents, which is
 * where the glyphs actually end; a mark with no text — a stage node, the map's lit cell —
 * falls back to its box, because for those the box IS the mark.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

const ROUTES = [
  '/',
  '/work/',
  '/work/pocket-manager/',
  '/work/wedding-planner/',
  '/sahib/',
  '/tanya/',
  '/contact/',
  '/404.html',
];

/** Every width the site is drawn at, plus the two edges of §E.2's own breakpoint. */
const WIDTHS = [360, 390, 768, 930, 931, 1024, 1440, 1920];

/** §B.10's list, as selectors. Each entry is [what the rule calls it, selector]. */
const MARKS = [
  ["a card's price line", '.card__years'],
  ["a card's price line", '.work-card__years'],
  ['a stage node', '.full-track__node'],
  ['a stage node', '.track__node'],
  ['a stage label', '.full-track__label'],
  ['a stage label', '.track__head-cell'],
  ['a printed address', '.routes__address a'],
  ['a printed address', '.lamp-address'],
  ['a printed address', '.close__address'],
  ['a CTA', '.button'],
  ['the map’s lit cell', '.map__cell[data-lamp][data-filled]'],
  ['an edge annotation', '.edge__note'],
];

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' });
    const found = await page.evaluate((marks) => {
      // Round 10: the band is the plate's width plus its 16px inset.
      const band = window.innerWidth - (window.innerWidth >= 768 ? 276 : 128);
      const plate = document.querySelector('.plate');
      const wrapper = plate?.closest('.plate-span') ?? null;
      // A mark outside the plate's wrapper cannot be covered by it, and the rule says so.
      const inWrapper = (el) => Boolean(wrapper && wrapper.contains(el));
      const platePresent = Boolean(plate && getComputedStyle(plate).display !== 'none');
      const out = [];
      let seen = 0;
      if (platePresent) {
        for (const [kind, selector] of marks) {
          for (const el of document.querySelectorAll(selector)) {
            if (!inWrapper(el)) continue;
            const box = el.getBoundingClientRect();
            if (box.width === 0 && box.height === 0) continue;

            let right = box.right;
            if ((el.textContent ?? '').trim().length > 0) {
              const range = document.createRange();
              range.selectNodeContents(el);
              const rects = [...range.getClientRects()].filter((r) => r.width > 0);
              if (rects.length > 0) right = Math.max(...rects.map((r) => r.right));
            }

            seen += 1;
            if (right > band) {
              out.push({ kind, selector, right: Math.round(right), text: (el.textContent ?? '').trim().slice(0, 40) });
            }
          }
        }
      }
      return { band: Math.round(band), platePresent, seen, out };
    }, MARKS);

    checked += found.seen;
    for (const bad of found.out) {
      failures.push(
        `${route} @ ${width}: ${bad.kind} (${bad.selector}) ends at x ${bad.right}, inside the band that begins at x ${found.band} — "${bad.text}"`,
      );
    }
  }

  await ctx.close();
}

await browser.close();
close();

console.log(`      ${checked} load-bearing mark(s) measured across ${ROUTES.length} routes at ${WIDTHS.length} widths`);
process.exit(report('qa:plate', failures));
