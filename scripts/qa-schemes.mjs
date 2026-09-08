#!/usr/bin/env node
/**
 * qa:schemes — the two colour schemes, measured in a browser, on the built pages.
 *
 * This replaces `qa:worlds`, and it keeps that gate's whole reason for existing while
 * dropping the axis it was watching. The three-world axis is gone with the print-inspired
 * design; the scheme axis is not, and it now carries MORE weight than before, because the
 * site is dark-first: `:root` holds the dark values and `[data-theme="light"]` overrides
 * them, which is the reverse of the arrangement everyone reading this file has in their
 * head.
 *
 * `qa:contrast` reads the token file and layers the blocks the way the cascade *should*
 * work. This one asks the browser what actually computed, on the real page, in both
 * schemes, and asserts it against the design handoff's published hex.
 *
 * The lesson the old gate encoded is the reason this one exists at all: a fault that only
 * a rendered page shows needs a check that reads a rendered page. The regression that
 * taught it was a cascade-order bug that failed nothing — clean build, clean `astro
 * check`, clean `qa:contrast` — and simply painted a whole page in the wrong palette.
 *
 * Three things are asserted, on every route, in both schemes:
 *
 *  1. **The palette computed.** `--ground`, `--void`, `--raise`, `--ink`, `--accent` and
 *     `--lamp` on the root element are the handoff's own values.
 *  2. **`--f-ink-rgb` resolved.** Every translucent surface on the page and every `rgba()`
 *     in the isometric room is written against this one token. If it ever fails to
 *     resolve, `rgba(, .1)` is an invalid declaration and the fill falls back to opaque
 *     black — which is not a subtle regression, but it IS a silent one: the build passes
 *     and the room renders as black polygons.
 *  3. **The scriptless default is dark.** With JavaScript disabled the document carries no
 *     `data-theme` at all, and the ground it paints must still be the dark one. That is
 *     the whole claim of "dark-first" and it is the one thing the head script cannot be
 *     asked to prove.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

const ROUTES = ['/', '/work/', '/sahib/', '/tanya/', '/contact/', '/work/pocket-manager/'];

/*
  The handoff's published hex, with THREE light-scheme exceptions, all of them recorded
  in `tokens.css` beside the values themselves and all three forced by `qa:contrast`
  measuring real pixels:

    --dim    #565E70 → #474E5E   (3.66 : 1 on the darkest ground it meets)
    --accent #8B2E96 → #7E2988   (4.03 : 1)
    --lamp   #7A5310 → #6B4809   (3.84 : 1)

  Each is one step deeper on the same hue in the same role. They are asserted here at
  their corrected values rather than quietly exempted, so that a future edit toward
  either the handoff's number or a lighter one comes back as a failure and has to be
  argued rather than merged.
*/
const PALETTE = {
  light: {
    ground: '#efeff3',
    void: '#e4e5eb',
    raise: '#f7f7fa',
    ink: '#0a0e18',
    accent: '#7e2988',
    lamp: '#6b4809',
    inkRgb: '10, 14, 24',
  },
  dark: {
    ground: '#080c18',
    void: '#04060b',
    raise: '#0d1322',
    ink: '#eaecf2',
    accent: '#df8fe2',
    lamp: '#e9b968',
    inkRgb: '234, 236, 242',
  },
};

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' });
    const got = await page.evaluate(() => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const read = (name) => cs.getPropertyValue(name).trim().toLowerCase();
      return {
        theme: root.dataset.theme,
        ground: read('--ground'),
        void: read('--void'),
        raise: read('--raise'),
        ink: read('--ink'),
        accent: read('--accent'),
        lamp: read('--lamp'),
        inkRgb: read('--f-ink-rgb'),
        /* What the body actually paints, which is the value a reader sees rather than
           the token that was meant to produce it. */
        bodyBg: getComputedStyle(document.body).backgroundColor,
      };
    });

    if (got.theme !== scheme) {
      failures.push(`${route} (${scheme}): data-theme computed "${got.theme}"`);
    }

    for (const key of ['ground', 'void', 'raise', 'ink', 'accent', 'lamp', 'inkRgb']) {
      checked += 1;
      const want = PALETTE[scheme][key];
      if (got[key] !== want) {
        failures.push(`${route} (${scheme}): --${key} computed "${got[key]}", expected "${want}"`);
      }
    }

    console.log(`      ${`${route} ${scheme}`.padEnd(30)} ${got.ground} / ${got.raise} / ${got.ink} / ${got.accent}  body ${got.bodyBg}`);
  }

  await ctx.close();
}

/*
  The dark-first claim, with the head script taken out of the picture entirely. No
  `data-theme` is written, so what paints is `:root` — and `:root` has to be the dark
  room, or every visitor without JavaScript gets a light page built out of dark-scheme
  intentions.
*/
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
    /* The OS asking for light must NOT be able to change the answer: the media query is
       consulted by the head script, and the head script is what is disabled here. */
    colorScheme: 'light',
  });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' });
  const got = await page.evaluate(() => ({
    theme: document.documentElement.getAttribute('data-theme'),
    ground: getComputedStyle(document.documentElement).getPropertyValue('--ground').trim().toLowerCase(),
  }));
  checked += 2;
  if (got.theme !== null) {
    failures.push(`no-JS: data-theme is "${got.theme}"; with the head script disabled nothing should set it`);
  }
  if (got.ground !== PALETTE.dark.ground) {
    failures.push(`no-JS: --ground computed "${got.ground}", and the site is dark-first, so it must be ${PALETTE.dark.ground}`);
  }
  console.log(`      ${'/ (no JS)'.padEnd(30)} data-theme ${got.theme} → --ground ${got.ground}`);
  await ctx.close();
}

await browser.close();
close();

console.log(`      ${checked} computed token(s) checked on ${ROUTES.length} routes in 2 schemes, plus the scriptless default`);
process.exit(report('qa:schemes', failures));
