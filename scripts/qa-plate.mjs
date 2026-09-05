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
  /*
    `.track__head-cell` — §E.3's shared label row — is NOT on this list any more, and the
    spec is what took it off. Round 12 rules in terms: "All five stage labels centre on
    their nodes, in every form of this component, at every width. The label row's ink may
    overhang the axis at either end by up to half a label; §B.10 exempts prose and this row
    is five words, not five marks. **The axis is what the rule constrains; the label row is
    prose that rides it.**"

    Round 10 had edge-aligned the two end labels precisely so that the row's ink matched
    the axis and this selector could stay on the list, and the review found the cost:
    three labels centred on their dots and two half a pitch off the dot they name (item
    H7). With all five centred, `Live` at 768 ends at x 494 against a band at 492 — two
    pixels of a five-letter word, which is exactly the overhang §E.3 permits.

    What still binds is the axis, and it is measured: `.track__node` and
    `.full-track__node` are on this list and they are the marks the rule names.
  */
  ['a printed address', '.routes__address a'],
  ['a printed address', '.lamp-address'],
  ['a printed address', '.close__address'],
  ['a CTA', '.button'],
  ['the map’s lit cell', '.map__cell[data-lamp][data-filled]'],
  /*
    The final review's item N1 puts the map's product names on this list, and its ruling is
    the reason: below 768 the row strip IS the map, §F.1's lead sentence tells the reader
    that a filled cell's payload is a name, and a name whose second half is under the plate
    is a mark that has lost its meaning — "a mark read as a unit, whose meaning is lost when
    part of it is hidden", which is §B.10's own definition. It is not the `.edge__note` case
    §G.3a took off this list: that is prose in a container, this is the field's payload.

    It is measured at EVERY width, not only below 768, because at >= 1024 the same names
    print inside the matrix's cells and the rightmost column is the one the plate reaches.
  */
  ["the map's product name", '.map__cell-product'],
  /*
    §B.10 round 12's own list, added here: all four are load-bearing by the rule's
    definition and none of the four was in run B's 432. `.figures__figure` and
    `.figures__label` are blocker B1 — the `1,000+` install count is the second-loudest
    type on the site by §B.6 principle 2, and it rendered as `1,0` over `dow` at 900. The
    floor's SVG `text` nodes are blocker B2, the Designer station's nameplate. And
    `.core__gates-line` is Tanya's `Owns` line, blocker B3's other half.
  */
  ['a figure', '.figures__figure'],
  ["a figure's label", '.figures__label'],
  ['a nameplate', '.floor__scene text'],
  ['the gate list', '.core__gates-line'],
  /*
    `.edge__note` leaves the list, and §G.3a round 12 is the authority: with the allocation
    restored to Android 1–3 / core 4–9 / iOS 10–12, "the iOS field sits inside the band and
    carries only a heading and a card — prose in a container — which §B.10 exempts", and
    "no load-bearing mark on this page goes right of col 9 at any width" is what the rule
    binds on instead. The marks that carry this page's argument — the `Owns` line, the
    gates block, the core's cards — are all inside col 9 and all still measured.
  */
];

/**
 * **The FLAGGED list is gone, and §I.1 round 13 is why.**
 *
 * Run D measured seven collisions below 768 that the four round-12 selectors found, and
 * flagged rather than failed them because each one was two sections of DESIGN.md
 * disagreeing with each other and the resolution was a design decision, not a build one:
 *
 * 1. `/` at 360 and 390 — `1,000+` and `downloads`, against §B.8's "3 across at 320:
 *    96px each", which predated the 128px band.
 * 2. `/tanya/` at 360, 390 and 768 — the core's `Owns` line, against §B.10's claim that
 *    it was covered below 768 "by being full width".
 *
 * §I.1 row 1 rules on both, and both sentences were the Design Lead's. §B.8's row form
 * below 768 is replaced — **the three figures stack**, numeral in a 68px column from
 * x 20, label from x 104 on the same baseline, widest ink at x 162 against a band at 232.
 * §B.10's full-width clause is deleted — **the gates block sets one gate per line below
 * 1024**. Two compositions, seven marks, no exemption and no region left the plate's
 * wrapper, and the section's closing instruction to this script is one line:
 * **"`qa:plate` should now fail rather than flag, and the four selectors stay in the
 * set."** So there is no flag list, and a collision at any width on any route is a
 * failure again.
 */

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
      /*
        The plate's wrapper is not "the nearest .plate-span" — it is the plate's own
        STICKY CONTAINING BLOCK, which is the nearest ancestor that actually generates a
        box. Round 10, change three, makes the two differ on `/`: below 768 the plate
        lives inside `.plate-span__after-floor`, a real box that starts after the floor,
        and at >= 768 that div is `display: contents` and the containing block is the
        outer `.plate-span` again. Walking past every `display: contents` ancestor is the
        CSS rule itself, so the script measures the span the browser measures — and on
        `/` at 360 and 390 the floor is correctly outside it.
      */
      let wrapper = plate?.parentElement ?? null;
      while (wrapper && getComputedStyle(wrapper).display === 'contents') {
        wrapper = wrapper.parentElement;
      }
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
