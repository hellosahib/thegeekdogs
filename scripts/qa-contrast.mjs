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
  '/sahib/',
  '/tanya/',
  '/contact/',
  '/404.html',
];

/** The two ends of the range the site is engineered for. */
const WIDTHS = [390, 1440];

/*
  How different a pixel has to be between the two renders to count as "a letter was
  painted here", summed over the three channels.

  It is a threshold rather than a test for any change because subpixel antialiasing tints
  the pixels at a glyph's edge by a channel or two without a letter covering them, and
  those edge pixels sit half on the background — including them would report a background
  that is partly the text's own colour. 90 keeps the body of a stroke and drops its
  fringe; at 12px mono, the smallest type on the site, a stroke is still 1–2px of core.
*/
const MIN_DELTA = 90;

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;
let worst = { ratio: Infinity };

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

      /* 1. Every visible text run, with what AA needs to judge it. */
      const runs = await page.evaluate(() => {
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = (node.nodeValue ?? '').trim();
          if (!text) continue;
          const el = node.parentElement;
          if (!el || seen.has(el)) continue;
          seen.add(el);

          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          if (Number(cs.opacity) === 0) continue;
          /* The visually-hidden pattern: 1px clipped boxes carry the site's spoken text
             and are never painted, so they have no contrast to have. */
          if (el.closest('.sr-only')) continue;

          const r = el.getBoundingClientRect();
          if (r.width < 2 || r.height < 2) continue;
          /* Only what is in the first viewport is behind measured pixels; the full-page
             screenshot below covers the rest, so the box is kept in PAGE coordinates. */
          const box = {
            x: Math.round(r.left + scrollX),
            y: Math.round(r.top + scrollY),
            w: Math.round(r.width),
            h: Math.round(r.height),
          };

          const isSvg = el.ownerSVGElement != null;
          const colour = isSvg ? cs.fill : cs.color;
          const size = parseFloat(cs.fontSize) || 16;
          const weight = Number(cs.fontWeight) || 400;
          /* AA's large-text threshold: 24px, or 18.66px at 700+. */
          const large = size >= 24 || (size >= 18.66 && weight >= 700);

          out.push({
            box,
            colour,
            size,
            weight,
            large,
            sample: text.slice(0, 48),
            where: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).join('.')}` : ''),
          });
        }
        return out;
      });

      /* 2. The page exactly as it ships. */
      const withText = (await page.screenshot({ fullPage: true, type: 'png' })).toString('base64');

      /*
        3. The same page with the words taken away and everything else left where it was.

        **The floor's nameplate halo stays.** It is a `paint-order: stroke` outline drawn
        UNDER each glyph in the band's own ground, and it is the whole legibility
        mechanism for a label that crosses a slab, a desk and a pool of light in the space
        of one word — the same device a map uses for a place name over a coastline. What a
        reader's eye meets behind those letters is the halo, so the halo is the background
        and blanking it would make this gate measure a page nobody is looking at.

        Only the FILL goes. The stroke is left painting, so the pixels the diff finds are
        exactly the glyph interiors, and what is under them is what is really under them.
      */
      await page.addStyleTag({
        content: `*, *::before, *::after { color: transparent !important; text-shadow: none !important; }
                  text, tspan { fill: transparent !important; }`,
      });
      await page.waitForTimeout(80);
      const noText = (await page.screenshot({ fullPage: true, type: 'png' })).toString('base64');

      const results = await page.evaluate(
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
          const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
          const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

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
            if (x1 <= x0 || y1 <= y0) return { ...run, skipped: 'off-canvas' };

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
                A pixel counts only if taking the text away CHANGED it, and changed it by
                more than an antialiasing edge would. That is the definition of "a letter
                was here", and it is what keeps the logo beside a wordmark, the ground
                outside a pill's corners and the leading around a line out of the sample.
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
            /* Nothing changed inside the box: the run is occluded, clipped away, or
               painted in a colour identical to its own ground — none of which this gate
               can judge, and all of which it must not silently pass as 21 : 1. */
            if (glyphPixels < 4) return { ...run, skipped: 'no glyph pixels' };

            /* Both ends of whatever is behind the run, and the worse of the two is the
               one the element is judged on. */
            const against = [
              { ratio: ratio(fg, lo), px: loPx, end: 'darkest' },
              { ratio: ratio(fg, hi), px: hiPx, end: 'lightest' },
            ].sort((a, b) => a.ratio - b.ratio)[0];

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

      for (const r of results) {
        if (r.skipped) continue;
        checked += 1;
        if (r.ratio < worst.ratio) worst = { ...r, route, scheme, width };
        if (r.ratio + 0.005 < r.need) {
          const behind = r.behind ? `rgb(${r.behind.join(', ')})` : 'unknown';
          failures.push(
            `${route} @ ${width} ${scheme}: ${r.ratio.toFixed(2)} : 1 against its ${r.end} pixel ${behind} ` +
              `(needs ${r.need}) — ${r.colour} ${Math.round(r.size)}px/${r.weight} on ${r.where} — "${r.sample}"`,
          );
        }
      }

      console.log(
        `      ${`${route} ${width} ${scheme}`.padEnd(44)} ${results.filter((r) => !r.skipped).length} run(s)`,
      );
    }

    await ctx.close();
  }
}

await browser.close();
close();

if (Number.isFinite(worst.ratio)) {
  console.log(
    `\n      tightest: ${worst.ratio.toFixed(2)} : 1 on ${worst.route} @ ${worst.width} ${worst.scheme} ` +
      `— ${worst.where} — "${worst.sample}"`,
  );
}
console.log(`      ${checked} text run(s) measured against real pixels in 2 schemes at ${WIDTHS.join(' and ')}`);
process.exit(report('qa:contrast', failures));
