#!/usr/bin/env node
/**
 * qa:contrast — WCAG AA, measured against the pixels the page actually paints.
 *
 * **This is a rewrite, and the reason for it is the redesign's one real accessibility
 * hazard.** The gate it replaces read `tokens.css` and layered the blocks the way the
 * cascade should work, which was the right tool for a design made of flat, opaque fills:
 * every piece of text sat on exactly one named colour, so the ratio could be computed
 * from the stylesheet.
 *
 * That is no longer true of a single element on this site. Text now sits on glass — a
 * translucent gradient over a band, sometimes over a cursor-tracked radial, sometimes
 * over the lit slab of an isometric room — and **a `.05`-alpha fill over a gradient does
 * not have one measurable background colour.** The design handoff says so in terms and
 * says what to do about it: check text against the *darkest and lightest* points behind
 * each panel, not an average, and if a panel fails, raise the panel's fill alpha rather
 * than lightening the text.
 *
 * A stylesheet cannot answer that question. A rendered page can, so this script asks it:
 *
 *  1. Collect every visible text run on the page — its box, its colour, its size and
 *     weight, which is what decides whether AA wants 4.5 : 1 or 3 : 1.
 *  2. Screenshot the page as it ships.
 *  3. Make all text invisible WITHOUT changing a single box: `color: transparent` on HTML
 *     and `fill: transparent` on SVG text. Layout, backgrounds, gradients, borders and
 *     shadows are all untouched, so what is left is exactly what was behind the words.
 *     Screenshot that too, and hand both PNGs back to the browser to decode into canvases
 *     — which is how this runs with no image library at all.
 *  4. **Diff the two, and keep only the pixels that changed.** Those pixels, and no
 *     others, are where a letter was painted. This is the step that makes the gate
 *     honest: a bounding box contains the logo beside the wordmark, the ground outside a
 *     pill's rounded corners, and the leading above and below the line, and every one of
 *     those would otherwise be reported as "behind the text" when no letter is anywhere
 *     near it. Only the glyphs count.
 *  5. For each run, take the DARKEST and the LIGHTEST of the text-free pixels under its
 *     own glyphs. Both are checked, and the worse of the two ratios is the element's,
 *     because a reader meets the worst part of a gradient as readily as the best.
 *
 * Every ratio it reports is therefore a ratio a person could actually measure with an
 * eyedropper on the shipped page, in that scheme, at that width.
 *
 * ---
 *
 * **A gate that cannot measure something must not report it as passed.** An audit of the
 * first version of this script found the opposite: a skipped run was neither counted nor
 * printed nor failed, and three separate things could make a run skip silently — a
 * `!important` colour beating the blanking rule, text clipped inside a horizontal
 * scroller, and an intermittent capture that collected one run on a route that has
 * thirty-six. The gate printed PASS each time. Four defences close that:
 *
 *  - **The blanking is verified**, not assumed: after the rule is injected every run's
 *    computed colour is read back, and a run that did not blank fails by name.
 *  - **Clipped runs get a second pass** with their scroll container moved, and anything
 *    still unmeasured after that fails by name. That is not hypothetical: the coverage
 *    map's product names and date ranges live inside a horizontal scroller at 360 and
 *    390, and they were invisible to the first version of this gate.
 *  - **The run count carries a floor.** A route that measured thirty-six runs at one
 *    width and one run at another has gone quiet rather than clean.
 *  - **Runs this method cannot judge fail rather than skip** — any `opacity` below 1, and
 *    any text colour carrying its own alpha, because both are composited before a reader
 *    sees them and the declared colour is then not the colour on the screen.
 *
 * Text over a photograph is exempt and says so: the two product pages put captions
 * beside their screenshots, never on them, so nothing on this site is text over an
 * image — and if something ever is, this gate would rightly fail it rather than quietly
 * average the picture.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

const ROUTES = [
  '/',
  '/work/',
  '/work/pocket-manager/',
  '/work/wedding-planner/',
  // The policy route. It is a wall of body text at --step-small on the page ground, which
  // is the one thing this gate is least likely to be surprised by and the one page a
  // store reviewer is guaranteed to open, so it is measured rather than assumed.
  '/work/wedding-planner/privacy/',
  '/sahib/',
  '/tanya/',
  '/contact/',
  '/404.html',
];

/**
 * Every width the project's own charter names, not just the two ends. 768 and 1024 are
 * exactly where the coverage map and the shared core change form, so a range that skipped
 * them was measuring the two widths least likely to break.
 */
const WIDTHS = [360, 390, 768, 1024, 1440];

/*
  How different a pixel has to be between the two renders to count as "a letter was
  painted here", summed over the three channels.

  It is a threshold rather than a test for any change because subpixel antialiasing tints
  the pixels at a glyph's edge by a channel or two without a letter covering them, and
  those edge pixels sit half on the background — including them would report a background
  that is partly the text's own colour. 90 keeps the body of a stroke and drops its
  fringe; at 12px mono, the smallest type on the site, a stroke is still 1–2px of core.

  It has one consequence worth stating: text whose colour is within 90 of its own
  background produces no pixels over the threshold. That is text at roughly 1.3 : 1 or
  below — invisible text — and it now FAILS as unmeasured rather than skipping quietly,
  which is the only safe way to treat a run the method cannot see.
*/
const MIN_DELTA = 90;

const BLANK_TEXT = `*, *::before, *::after { color: transparent !important; text-shadow: none !important; }
  text, tspan { fill: transparent !important; }`;

/** Collect every visible text run, stamped with an id so later passes can match it. */
function collectRuns(page) {
  return page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    let n = 0;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = (node.nodeValue ?? '').trim();
      if (!text) continue;
      const el = node.parentElement;
      if (!el || seen.has(el)) continue;
      seen.add(el);

      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      /* The visually-hidden pattern: 1px clipped boxes carry the site's spoken text and
         are never painted, so they have no contrast to have. */
      if (el.closest('.sr-only')) continue;

      const where =
        el.tagName.toLowerCase() +
        (typeof el.className === 'string' && el.className.trim()
          ? `.${el.className.trim().split(/\s+/).join('.')}`
          : '');

      /*
        Any partial transparency, not just zero. A run at `opacity: .6` is composited
        against its background before a reader sees it, so the declared colour this gate
        measures is not the colour on the screen and the run cannot be judged here.
      */
      const alpha = Number(cs.opacity);
      if (!Number.isNaN(alpha) && alpha < 1) {
        out.push({ unmeasurable: `opacity ${cs.opacity}`, where, sample: text.slice(0, 48) });
        continue;
      }

      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;

      /*
        A control that is parked off-canvas until it is focused — the skip link is the
        site's only one. It is real, painted, keyboard-reachable text, so it has to be
        measured; it simply cannot be measured in the state the page loads in. It is
        collected here and handed to the focus pass instead.
      */
      const focusOnly = r.bottom + scrollY <= 0 || r.right + scrollX <= 0;

      const isSvg = el.ownerSVGElement != null;
      const colour = isSvg ? cs.fill : cs.color;
      /* A text colour carrying its own alpha is composited too, and `parse()` below reads
         only three channels — it would measure a 60%-opaque ink as fully opaque. */
      if (/rgba?\([^)]*,[^)]*,[^)]*,\s*(0?\.\d+|0)\s*\)/.test(colour)) {
        out.push({ unmeasurable: `translucent colour ${colour}`, where, sample: text.slice(0, 48) });
        continue;
      }

      if (!el.dataset.qaRun) el.dataset.qaRun = `r${n}`;
      n += 1;

      const size = parseFloat(cs.fontSize) || 16;
      const weight = Number(cs.fontWeight) || 400;
      /* AA's large-text threshold: 18pt / 14pt-bold, in px. */
      const large = size >= 24 || (size >= 18.66 && weight >= 700);

      out.push({
        id: el.dataset.qaRun,
        focusOnly,
        /* Page coordinates: the capture below is the full page, not the viewport. */
        box: {
          x: Math.round(r.left + scrollX),
          y: Math.round(r.top + scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        colour,
        size,
        weight,
        large,
        sample: text.slice(0, 48),
        where,
        inHeader: Boolean(el.closest('.site-header')),
      });
    }
    return out;
  });
}

/**
 * The page as it ships, and the same page with its text blanked — plus the list of runs
 * whose colour REFUSED to blank, which is the failure mode that would otherwise delete a
 * run from the gate rather than fail it.
 */
async function capturePair(page) {
  const withText = (await page.screenshot({ fullPage: true, type: 'png' })).toString('base64');

  const tag = await page.addStyleTag({ content: BLANK_TEXT });
  await page.waitForTimeout(80);

  const notBlanked = await page.evaluate(() =>
    [...document.querySelectorAll('[data-qa-run]')]
      .filter((el) => {
        const cs = getComputedStyle(el);
        const c = (el.ownerSVGElement != null ? cs.fill : cs.color).trim();
        return !/^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/.test(c);
      })
      .map((el) => {
        const cs = getComputedStyle(el);
        return `${el.tagName.toLowerCase()} → ${el.ownerSVGElement != null ? cs.fill : cs.color}`;
      }),
  );

  const noText = (await page.screenshot({ fullPage: true, type: 'png' })).toString('base64');

  await tag.evaluate((el) => el.remove());
  await page.waitForTimeout(50);

  return { withText, noText, notBlanked };
}

/**
 * The measurement itself, run inside the page so the browser decodes both PNGs for us and
 * this script needs no image library at all.
 */
function measure(page, runs, withText, noText) {
  return page.evaluate(
    async ({ runs, withText, noText, minDelta }) => {
      const load = async (b64) => {
        const img = new Image();
        img.src = 'data:image/png;base64,' + b64;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const cx = canvas.getContext('2d', { willReadFrequently: true });
        cx.drawImage(img, 0, 0);
        return { canvas, cx };
      };
      const a = await load(withText);
      const b = await load(noText);
      const canvas = b.canvas;
      const cx = b.cx;

      const lin = (c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      const lum = (r, g, bl) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(bl);
      const ratio = (x, y) => (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);

      const parse = (css) => {
        const m = css.match(/-?\d*\.?\d+/g);
        if (!m) return null;
        return [Number(m[0]), Number(m[1]), Number(m[2])];
      };

      return runs.map((run) => {
        const rgb = parse(run.colour);
        if (!rgb) return { ...run, skipped: 'unparseable colour' };
        const fg = lum(rgb[0], rgb[1], rgb[2]);

        const x0 = Math.max(0, run.box.x);
        const y0 = Math.max(0, run.box.y);
        const x1 = Math.min(canvas.width, run.box.x + run.box.w);
        const y1 = Math.min(canvas.height, run.box.y + run.box.h);
        if (x1 <= x0 || y1 <= y0) return { ...run, skipped: 'box off the canvas' };

        const w = x1 - x0;
        const h = y1 - y0;
        const painted = a.cx.getImageData(x0, y0, w, h).data;
        const data = cx.getImageData(x0, y0, w, h).data;

        let lo = Infinity;
        let hi = -Infinity;
        let loPx = null;
        let hiPx = null;
        let glyphPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          /*
            A pixel counts only if taking the text away CHANGED it, and changed it by more
            than an antialiasing edge would. That is the definition of "a letter was here",
            and it is what keeps the logo beside a wordmark, the ground outside a pill's
            corners and the leading around a line out of the sample.
          */
          const delta =
            Math.abs(painted[i] - data[i]) +
            Math.abs(painted[i + 1] - data[i + 1]) +
            Math.abs(painted[i + 2] - data[i + 2]);
          if (delta < minDelta) continue;
          glyphPixels += 1;
          const l = lum(data[i], data[i + 1], data[i + 2]);
          if (l < lo) {
            lo = l;
            loPx = [data[i], data[i + 1], data[i + 2]];
          }
          if (l > hi) {
            hi = l;
            hiPx = [data[i], data[i + 1], data[i + 2]];
          }
        }
        if (glyphPixels < 4) return { ...run, skipped: 'no glyph pixels found in its box' };

        /* Both ends of whatever is behind the run; the worse of the two is what it is
           judged on, because a reader meets the worst part of a gradient as readily as
           the best. */
        const against = [
          { ratio: ratio(fg, lo), px: loPx, end: 'darkest' },
          { ratio: ratio(fg, hi), px: hiPx, end: 'lightest' },
        ].sort((p, q) => p.ratio - q.ratio)[0];

        return {
          ...run,
          ratio: against.ratio,
          end: against.end,
          behind: against.px,
          glyphPixels,
          need: run.large ? 3 : 4.5,
        };
      });
    },
    { runs, withText, noText, minDelta: MIN_DELTA },
  );
}

/**
 * Runs that only exist once something is focused — on this site, the skip link.
 *
 * Each is focused in turn, which brings it on-canvas, and then measured exactly as any
 * other run is. Skipping them instead would leave the first control a keyboard user meets
 * as the one piece of text on the site nobody had checked.
 */
async function measureFocusRevealed(page, runs) {
  const out = [];
  for (const run of runs) {
    const ok = await page.evaluate((id) => {
      const el = document.querySelector(`[data-qa-run="${id}"]`);
      if (!el) return false;
      el.focus();
      return document.activeElement === el;
    }, run.id);
    if (!ok) continue;
    await page.waitForTimeout(60);

    const fresh = (await collectRuns(page)).find((r) => r.id === run.id);
    if (!fresh) continue;
    const { withText, noText } = await capturePair(page);
    for (const r of await measure(page, [{ ...fresh, focusOnly: false }], withText, noText)) {
      if (!r.skipped) out.push(r);
    }
    await page.evaluate(() => document.activeElement?.blur());
  }
  return out;
}

/**
 * The sticky header, over the content that scrolls under it.
 *
 * At scroll 0 there is nothing behind the header but the top of the page, so a full-page
 * capture measures the nav against its own ground and learns nothing. The header's whole
 * hazard is the other case — it is translucent and it sits over moving body copy — and
 * that is what this measures: the same glyph diff, on the viewport, at several scroll
 * depths.
 */
async function measureSticky(page, height) {
  const out = [];
  const max = await page.evaluate(() => document.body.scrollHeight - innerHeight);
  const stops = [0.25, 0.5, 0.75].map((f) => Math.round(max * f)).filter((y) => y > height);

  for (const y of stops) {
    await page.evaluate((to) => window.scrollTo(0, to), y);
    await page.waitForTimeout(120);

    const runs = (await collectRuns(page)).filter((r) => r.inHeader);
    if (runs.length === 0) continue;

    /* The viewport, not the page: a full-page capture re-renders a sticky element at its
       static position, which is exactly the case this is trying to leave behind. */
    const withText = (await page.screenshot({ type: 'png' })).toString('base64');
    const tag = await page.addStyleTag({ content: BLANK_TEXT });
    await page.waitForTimeout(60);
    const noText = (await page.screenshot({ type: 'png' })).toString('base64');
    await tag.evaluate((el) => el.remove());

    /* Viewport capture, so the boxes are viewport coordinates. */
    const viewportRuns = runs.map((r) => ({ ...r, box: { ...r.box, y: r.box.y - y } }));
    for (const r of await measure(page, viewportRuns, withText, noText)) {
      if (!r.skipped) out.push({ ...r, where: `${r.where} (over content at scrollY ${y})` });
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);
  return out;
}

/**
 * The second pass, for runs whose text is clipped inside a horizontal scroller.
 *
 * The coverage map is an 840px-minimum table inside `overflow-x: auto`, so at 360 and 390
 * most of its product names, company names and date ranges are simply not painted into a
 * screenshot. They are real, readable text that a visitor scrolls to — and the first
 * version of this gate could not see a single one of them.
 *
 * Each scroll container is walked to its end in viewport-sized steps; at every step the
 * boxes are re-read, because they move with the scroll, a fresh pair is captured, and
 * whatever has become visible is measured. Runs already measured are not re-measured.
 */
async function measureClipped(page, wantedIds) {
  const found = new Map();
  const containers = await page.evaluate(() =>
    [...document.querySelectorAll('*')]
      .filter((el) => {
        const cs = getComputedStyle(el);
        return /(auto|scroll)/.test(cs.overflowX) && el.scrollWidth - el.clientWidth > 4;
      })
      .map((el, i) => {
        el.dataset.qaScroller = `s${i}`;
        return { id: `s${i}`, steps: Math.ceil(el.scrollWidth / Math.max(el.clientWidth, 1)) };
      }),
  );

  for (const c of containers) {
    for (let step = 1; step <= c.steps; step += 1) {
      const moved = await page.evaluate(
        ({ id, step }) => {
          const el = document.querySelector(`[data-qa-scroller="${id}"]`);
          if (!el) return false;
          const target = Math.min(el.clientWidth * step, el.scrollWidth - el.clientWidth);
          el.scrollLeft = target;
          return Math.abs(el.scrollLeft - target) < 2;
        },
        { id: c.id, step },
      );
      if (!moved) continue;
      await page.waitForTimeout(60);

      const runs = (await collectRuns(page)).filter(
        (r) => r.id && wantedIds.includes(r.id) && !found.has(r.id),
      );
      if (runs.length === 0) continue;

      const { withText, noText } = await capturePair(page);
      for (const r of await measure(page, runs, withText, noText)) {
        if (!r.skipped) found.set(r.id, r);
      }
    }
    await page.evaluate((id) => {
      const el = document.querySelector(`[data-qa-scroller="${id}"]`);
      if (el) el.scrollLeft = 0;
    }, c.id);
  }

  return [...found.values()];
}

/* -------------------------------------------------------------------------------- run */

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;
/*
  The tightest run is ranked by MARGIN, not by raw ratio: a 24px heading at 4.5 : 1 needs
  3 and has 1.5 in hand, while a 15px paragraph at 4.6 : 1 needs 4.5 and is a rounding
  error from failing. Ranking by ratio reports the first and never mentions the second.
*/
let worst = { margin: Infinity };
/** Highest run count seen per route, as a floor against a pass going quiet. */
const counts = new Map();

for (const scheme of ['dark', 'light']) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      colorScheme: scheme,
      deviceScaleFactor: 1,
      /* Reveal animations would otherwise leave half the page at opacity 0 and the gate
         would silently check nothing. */
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();

    for (const route of ROUTES) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(250);

      const runs = await collectRuns(page);
      const { withText, noText, notBlanked } = await capturePair(page);

      for (const el of notBlanked) {
        failures.push(
          `${route} @ ${width} ${scheme}: text did not blank for measurement (${el}) — an author ` +
            "`!important` colour is beating this gate's own, so the run cannot be measured",
        );
      }

      const results = await measure(
        page,
        runs.filter((r) => r.id && !r.focusOnly),
        withText,
        noText,
      );

      const skipped = results.filter((r) => r.skipped);
      const recovered =
        skipped.length > 0 ? await measureClipped(page, skipped.map((r) => r.id)) : [];

      const byId = new Map(results.filter((r) => !r.skipped).map((r) => [r.id, r]));
      for (const r of recovered) byId.set(r.id, r);

      /* The skip link, focused, and the header's own nav over whatever scrolls under it. */
      for (const r of await measureFocusRevealed(page, runs.filter((r) => r.focusOnly))) {
        byId.set(r.id, r);
      }
      for (const r of await measureSticky(page, 200)) byId.set(`sticky:${r.id}:${r.where}`, r);

      for (const r of byId.values()) {
        checked += 1;
        const margin = r.ratio - r.need;
        if (margin < worst.margin) worst = { ...r, margin, route, scheme, width };
        if (r.ratio + 0.005 < r.need) {
          const behind = r.behind ? `rgb(${r.behind.join(', ')})` : 'unknown';
          failures.push(
            `${route} @ ${width} ${scheme}: ${r.ratio.toFixed(2)} : 1 against its ${r.end} pixel ${behind} ` +
              `(needs ${r.need}) — ${r.colour} ${Math.round(r.size)}px/${r.weight} on ${r.where} — "${r.sample}"`,
          );
        }
      }

      /* Anything the gate could not measure fails by name. An unmeasured run is not a
         passing one, and treating it as one is how this gate was found reporting PASS
         over a route it had measured a single element of. */
      const stillSkipped = skipped.filter((r) => !byId.has(r.id));
      for (const r of stillSkipped) {
        failures.push(
          `${route} @ ${width} ${scheme}: could not measure "${r.sample}" on ${r.where} ` +
            `(${r.skipped}) — an unmeasured run is not a passing one`,
        );
      }
      for (const u of runs.filter((r) => r.unmeasurable)) {
        failures.push(
          `${route} @ ${width} ${scheme}: ${u.where} cannot be judged by this gate ` +
            `(${u.unmeasurable}) — "${u.sample}"`,
        );
      }

      /* A floor on the count itself: every failure above needs a run to attach to. */
      const seen = byId.size;
      const floor = counts.get(route) ?? seen;
      counts.set(route, Math.max(floor, seen));
      if (seen * 2 < floor) {
        failures.push(
          `${route} @ ${width} ${scheme}: measured ${seen} run(s) where this route has measured ` +
            `${floor} elsewhere — the gate went quiet rather than clean`,
        );
      }

      console.log(
        `      ${`${route} ${width} ${scheme}`.padEnd(40)} ${String(seen).padStart(3)} run(s)` +
          (recovered.length > 0 ? `  +${recovered.length} from a scroller` : '') +
          (stillSkipped.length > 0 ? `  ${stillSkipped.length} UNMEASURED` : ''),
      );
    }

    await ctx.close();
  }
}

await browser.close();
close();

if (Number.isFinite(worst.margin)) {
  console.log(
    `\n      tightest margin: ${worst.ratio.toFixed(2)} : 1 against a ${worst.need} threshold ` +
      `on ${worst.route} @ ${worst.width} ${worst.scheme} — ${worst.where} — "${worst.sample}"`,
  );
}
console.log(
  `      ${checked} text run(s) measured against real pixels in 2 schemes at ${WIDTHS.join(', ')}`,
);
process.exit(report('qa:contrast', failures));
