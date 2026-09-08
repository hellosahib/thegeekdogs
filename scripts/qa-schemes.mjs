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
  The handoff's published hex, with TWO light-scheme exceptions, both recorded in
  `tokens.css` beside the values themselves and both forced by `qa:contrast` measuring
  real pixels:

    --dim  #565E70 → #474E5E   (4.22–4.37 : 1 on glass over the raised band)
    --lamp #7A5310 → #6B4809   (3.84–4.43 : 1 on the --void band and the floor panel)

  `--accent` was briefly a third and is not one: it was moved on a worst-case calculation
  rather than a measured failure, and re-measured, the handoff's #8B2E96 fails nothing.

  Every token below is pinned by string, not only the two that moved. That is deliberate
  and it is what the gate this replaces did: asserting a published figure catches a
  mistyped hex BY NAME even when the mistype still passes AA, which measuring ratios
  alone never will.
*/
const PALETTE = {
  light: {
    ground: '#efeff3',
    void: '#e4e5eb',
    raise: '#f7f7fa',
    ink: '#0a0e18',
    'ink-2': '#2e3646',
    dim: '#474e5e',
    accent: '#8b2e96',
    'accent-ink': '#ffffff',
    lamp: '#6b4809',
    'plate-halo': '#ffffff',
    inkRgb: '10, 14, 24',
    'f-a': '#d8dbe6',
    'f-b': '#b4bacb',
    'f-c': '#8d95a8',
    'f-d': '#767f94',
    'f-screen-2': '#2c7c8e',
    'f-cone': '#c98a12',
  },
  dark: {
    ground: '#080c18',
    void: '#04060b',
    raise: '#0d1322',
    ink: '#eaecf2',
    'ink-2': '#c9cedb',
    dim: '#96a0b5',
    accent: '#df8fe2',
    'accent-ink': '#160a18',
    lamp: '#e9b968',
    'plate-halo': '#04060b',
    inkRgb: '234, 236, 242',
    'f-a': '#141c2e',
    'f-b': '#070a12',
    'f-c': '#0a0f1a',
    'f-d': '#05070c',
    'f-screen-2': '#7fd7e8',
    'f-cone': '#e9b968',
  },
};

/** Every key above is asserted; `inkRgb` is the one whose token name differs. */
const TOKEN_OF = (key) => (key === 'inkRgb' ? '--f-ink-rgb' : `--${key}`);

/*
  A custom property's computed value is the token's text, minified by the CSS pipeline
  along the way — `#ffffff` comes back as `#fff`. Comparing the two forms as strings would
  fail on a value that is correct, so both sides are normalised to full six-digit hex
  first. Anything that is not a hex colour (the `--f-ink-rgb` triple) passes through
  untouched and is still compared exactly.
*/
const norm = (v) =>
  /^#[0-9a-f]{3}$/.test(v) ? `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}` : v;

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' });
    const got = await page.evaluate((names) => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const read = (name) => cs.getPropertyValue(name).trim().toLowerCase();
      return {
        theme: root.dataset.theme,
        values: Object.fromEntries(names.map((n) => [n, read(n === 'inkRgb' ? '--f-ink-rgb' : `--${n}`)])),
        /* What the body actually paints, which is the value a reader sees rather than
           the token that was meant to produce it. */
        bodyBg: getComputedStyle(document.body).backgroundColor,
      };
    }, Object.keys(PALETTE[scheme]));

    if (got.theme !== scheme) {
      failures.push(`${route} (${scheme}): data-theme computed "${got.theme}"`);
    }

    for (const [key, want] of Object.entries(PALETTE[scheme])) {
      checked += 1;
      const had = norm(got.values[key]);
      if (had !== norm(want)) {
        failures.push(`${route} (${scheme}): ${TOKEN_OF(key)} computed "${had}", expected "${want}"`);
      }
    }

    console.log(
      `      ${`${route} ${scheme}`.padEnd(30)} ${got.values.ground} / ${got.values.raise} / ${got.values.ink} / ${got.values.accent}  body ${got.bodyBg}`,
    );
  }

  await ctx.close();
}

/*
  **The glass actually blurs.**

  This is here because it already went wrong once, silently, in the built artifact rather
  than the source. Tailwind v4's Lightning CSS pass collapses a prefixed/unprefixed
  `backdrop-filter` pair to whichever is declared last, and it cannot autoprefix a value
  written as a custom property at all — so the shipped stylesheet carried seven
  `-webkit-backdrop-filter` declarations and zero standard ones, Chrome has dropped that
  alias, and every glass surface on the site rendered as a flat translucent wash. The
  source was correct throughout, `astro check` was clean, and every other gate passed.

  So this reads the computed value off the rendered page, which is the only place the
  answer lives.
*/
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'load' });
  const blurs = await page.evaluate(() => {
    const read = (sel) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el).backdropFilter : '(absent)';
    };
    return {
      '.site-header': read('.site-header'),
      '.glass': read('.glass'),
      '.card': read('.card'),
      '.pill--ghost': read('.pill--ghost'),
      '.theme-toggle__button': read('.theme-toggle__button'),
    };
  });
  for (const [sel, value] of Object.entries(blurs)) {
    checked += 1;
    if (!/blur\(/.test(value)) {
      failures.push(
        `${sel}: computed backdrop-filter is "${value}" — the glass is not blurring, and ` +
          'the `@supports not` fallback will not fire either, because the engine does ' +
          'support the property. Check the built CSS, not the source.',
      );
    }
  }
  console.log(`      ${'backdrop-filter'.padEnd(30)} ${Object.values(blurs).join(' / ')}`);
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
