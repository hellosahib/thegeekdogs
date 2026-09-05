#!/usr/bin/env node
/**
 * check-floor-pointer — DESIGN.md §C.11's acceptance test, plus §C.7's nameplate proof.
 *
 * §C.11 exists because the step-3 build shipped a floor that was dead to mouse and
 * touch at every width in both schemes while every target-size table read clean: a
 * table measures rectangles, and the rectangles were correct while
 * `document.elementFromPoint` returned `<main>` at 0 of 9 sampled stations. So this is
 * a test and not a look, and it is the two tests §C.11 and §C.7 write down:
 *
 *  1. **Pointer.** For each of the ten stations, at 360, 390, 768, 1024, 1440 and 1920,
 *     in BOTH schemes, `document.elementFromPoint` at that station's button centre
 *     returns that station's own button (or a node inside it whose
 *     `closest('[data-station]')` is that button), and a real click at the same point
 *     puts that station's card in the slot and its selected state on the station in the
 *     room. Ten of ten, at every width, in both schemes.
 *
 *  2. **Nameplates.** At every one of those widths, no nameplate's box intersects
 *     another station's button box. §C.7 states the rule at 360 and 390, which is where
 *     the old one failed, and it is a disjointness proof — every plate lies wholly
 *     inside its own button's top 20-unit band and the ten buttons are pairwise disjoint
 *     — and this is that proof measured on the rendered page, because the rule it
 *     replaced put nine of the ten plates inside a neighbour's target and drew the focus
 *     ring on Spec Writer around a box labelled "Test Engineer".
 *
 * Each station is scrolled to the middle of the viewport before it is hit-tested. That
 * is not the test being made easy: §B.10's contact plate is `position: sticky` at the
 * viewport's bottom-right, so it is over *something* at every scroll offset, and the
 * question §C.11 asks is whether a visitor looking at a station can hit it.
 */
import { chromium } from 'playwright';
import { report, requireDist } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

requireDist();

/** DESIGN.md §C.11's own list. */
const WIDTHS = [360, 390, 768, 1024, 1440, 1920];
const SCHEMES = ['light', 'dark'];
/**
 * §C.7 states its nameplate proof at 360 and 390, which is where the rule it replaced
 * failed. It is run at every width because the same failure had a wide-plan half — the
 * skewed cabin plate put "Sahib Singh" inside Tanya's button at 1024, 1440 and 1920 —
 * and one check that holds everywhere is cheaper than two that each hold somewhere.
 */
const PLATE_WIDTHS = WIDTHS;
/** DESIGN.md §C.2 — ten stations, and the count is asserted rather than assumed. */
const STATIONS = 10;

const failures = [];
const { base, close } = await serveDist();
const browser = await chromium.launch();

/** Two rectangles intersect when they overlap on both axes. Touching is not overlap. */
const overlaps = (a, b) =>
  a.left < b.right - 0.01 &&
  b.left < a.right - 0.01 &&
  a.top < b.bottom - 0.01 &&
  b.top < a.bottom - 0.01;

for (const scheme of SCHEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 800 },
      deviceScaleFactor: 1,
      colorScheme: scheme,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });

    const ids = await page.$$eval('[data-station]', (nodes) =>
      nodes.map((n) => n.dataset.station),
    );
    if (ids.length !== STATIONS) {
      failures.push(`${width}/${scheme}: the floor has ${ids.length} stations, §C.2 says ${STATIONS}`);
    }

    let hits = 0;
    for (const id of ids) {
      const point = await page.evaluate((station) => {
        const button = document.querySelector(`[data-station="${station}"]`);
        button.scrollIntoView({ block: 'center', behavior: 'instant' });
        const r = button.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const hit = document.elementFromPoint(cx, cy);
        return {
          cx,
          cy,
          w: r.width,
          h: r.height,
          hit: hit?.closest('[data-station]')?.dataset.station ?? hit?.tagName ?? 'nothing',
        };
      }, id);

      if (point.hit !== id) {
        failures.push(
          `${width}/${scheme}: elementFromPoint at ${id}'s centre returned ${point.hit}`,
        );
        continue;
      }
      if (point.w < 44 || point.h < 44) {
        failures.push(
          `${width}/${scheme}: ${id} measures ${point.w.toFixed(1)} x ${point.h.toFixed(1)}, under the 44 x 44 floor`,
        );
      }

      await page.mouse.click(point.cx, point.cy);
      const after = await page.evaluate((station) => {
        const card = document.querySelector(`[data-card="${station}"]`);
        const button = document.querySelector(`[data-station="${station}"]`);
        const group = document.querySelectorAll(`[data-scene="${station}"][data-on]`);
        const open = [...document.querySelectorAll('[data-card]')]
          .filter((c) => !c.hidden)
          .map((c) => c.dataset.card);
        return {
          shown: card ? !card.hidden : false,
          only: open.length === 1 && open[0] === station,
          selected: button?.dataset.selected === 'true',
          marked: group.length > 0,
        };
      }, id);

      if (!after.shown || !after.only) {
        failures.push(`${width}/${scheme}: a click on ${id} did not put its card alone in the slot`);
      } else if (!after.selected || !after.marked) {
        failures.push(`${width}/${scheme}: a click on ${id} left no selected state on the station`);
      } else {
        hits += 1;
      }
    }
    console.log(`      pointer ${width} ${scheme}: ${hits} of ${ids.length} stations`);

    if (PLATE_WIDTHS.includes(width)) {
      const collisions = await page.evaluate(() => {
        const box = (el) => {
          const r = el.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        };
        const visible = (el) => el.getClientRects().length > 0 && el.getBoundingClientRect().width > 0;
        const plates = [...document.querySelectorAll('[data-plate]')]
          .filter(visible)
          .map((el) => ({ id: el.dataset.plate, rect: box(el) }));
        const buttons = [...document.querySelectorAll('[data-station]')].map((el) => ({
          id: el.dataset.station,
          rect: box(el),
        }));
        return { plates, buttons };
      });

      if (collisions.plates.length !== STATIONS) {
        failures.push(
          `${width}/${scheme}: ${collisions.plates.length} nameplates are rendered, §C.2 says ${STATIONS}`,
        );
      }
      let bad = 0;
      for (const plate of collisions.plates) {
        for (const button of collisions.buttons) {
          if (button.id === plate.id) continue;
          if (overlaps(plate.rect, button.rect)) {
            bad += 1;
            failures.push(
              `${width}/${scheme}: the "${plate.id}" nameplate is inside ${button.id}'s button`,
            );
          }
        }
      }
      console.log(
        `      nameplates ${width} ${scheme}: ${collisions.plates.length - bad} of ${collisions.plates.length} clear of every other station`,
      );
    }

    await context.close();
  }
}

await browser.close();
close();

process.exit(report('check-floor-pointer', failures));
