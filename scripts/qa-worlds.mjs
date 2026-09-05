#!/usr/bin/env node
/**
 * qa:worlds — the three worlds, measured in a browser, on the built pages.
 *
 * `qa:contrast` reads the token file and layers the blocks the way the cascade *should*
 * work. This one asks the browser what actually computed, on the real page, in both
 * schemes, and asserts it against DESIGN.md's published hex.
 *
 * It exists because of a regression this run caused and then found by measuring rather
 * than by reading: moving Tanya's tokens into their own partial (PLAN.md §1.2's
 * swappable token partial) with the import at the TOP of tokens.css put her
 * `[data-world="tanya"]` block BEFORE `:root`. Both selectors are specificity (0,1,0) —
 * a pseudo-class and an attribute selector weigh the same — so `:root` won on source
 * order and her entire page rendered the studio palette. Nothing failed: the build was
 * clean, `astro check` was clean, `qa:contrast` was clean, because it layers by selector
 * name rather than by document order, and at a glance the page looked like a pale
 * achromatic page, which is exactly what hers is meant to look like.
 *
 * The lesson is the one the floor's `set:html` scoping bug already taught one layer up:
 * a fault that only a rendered page shows needs a check that reads a rendered page.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

/**
 * DESIGN.md §B.2 and §B.2a (studio), §F.4 and §F.4a (Sahib), §G.1 and §G.1a (Tanya).
 * `--tgd-surface` is the page ground, `--tgd-surface-alt` the field that steps away from
 * it, `--tgd-ink` the primary text and `--tgd-accent` the world's one signal.
 */
const EXPECTED = [
  {
    route: '/',
    world: 'studio',
    light: { surface: '#f1f3f0', alt: '#e2e6e1', ink: '#0f2a2e', accent: '#f2a93b' },
    dark: { surface: '#18292d', alt: '#213539', ink: '#e8ede9', accent: '#f2a93b' },
  },
  {
    route: '/work/',
    world: 'studio',
    light: { surface: '#f1f3f0', alt: '#e2e6e1', ink: '#0f2a2e', accent: '#f2a93b' },
    dark: { surface: '#18292d', alt: '#213539', ink: '#e8ede9', accent: '#f2a93b' },
  },
  {
    route: '/sahib/',
    world: 'sahib',
    // §F.4a: HIS PALETTE IS THE DARK ONE. [data-theme="light"] carries the overrides.
    light: { surface: '#eeeff4', alt: '#e0e2ec', ink: '#1a2033', accent: '#f2a93b' },
    dark: { surface: '#161c2e', alt: '#1f2841', ink: '#e9eaf0', accent: '#f2a93b' },
  },
  {
    route: '/tanya/',
    world: 'tanya',
    light: { surface: '#edeeee', alt: '#dcdede', ink: '#1b2020', accent: '#8a5a08' },
    dark: { surface: '#191b1b', alt: '#282b2b', ink: '#e9eaea', accent: '#f2a93b' },
  },
];

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: scheme,
  });
  const page = await ctx.newPage();

  for (const entry of EXPECTED) {
    await page.goto(base + entry.route, { waitUntil: 'load' });
    const got = await page.evaluate(() => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const read = (name) => cs.getPropertyValue(name).trim().toLowerCase();
      return {
        world: root.dataset.world,
        theme: root.dataset.theme,
        surface: read('--tgd-surface'),
        alt: read('--tgd-surface-alt'),
        ink: read('--tgd-ink'),
        accent: read('--tgd-accent'),
      };
    });

    if (got.world !== entry.world) {
      failures.push(`${entry.route}: data-world is "${got.world}", expected "${entry.world}"`);
    }
    if (got.theme !== scheme) {
      failures.push(`${entry.route} (${scheme}): data-theme is "${got.theme}"`);
    }

    for (const key of ['surface', 'alt', 'ink', 'accent']) {
      checked += 1;
      if (got[key] !== entry[scheme][key]) {
        failures.push(
          `${entry.route} (${scheme}): --tgd-${key === 'alt' ? 'surface-alt' : key} computed ${got[key]}, DESIGN.md says ${entry[scheme][key]}`,
        );
      }
    }
    console.log(
      `      ${`${entry.route} ${scheme}`.padEnd(22)} ${got.surface} / ${got.alt} / ${got.ink} / ${got.accent}`,
    );
  }

  await ctx.close();
}

/*
  DESIGN.md §I.1 row 2 — **the tick attaches to the layer's name, and the three names sit
  on one baseline.** §G.3a states the rule and then states what to check:

  > On the shipped Anek subset that baseline is 50px below the band's top border edge, and
  > the tick is a 2px stroke centred on it. **50 is the consequence and the baseline is the
  > spec:** if the shipped face's ascent moves the number, the number is corrected and the
  > alignment is not, and the assertion checks the two labels' baselines against the core's
  > rather than checking 50.

  So this measures the three platform labels' first baselines against each other, and the
  two ticks' stroke centres against that baseline, at both widths the three-column
  allocation exists at. The 50 is reported, never asserted.
*/
for (const width of [1024, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 1200 } });
  const page = await ctx.newPage();
  await page.goto(base + '/tanya/', { waitUntil: 'load' });
  const got = await page.evaluate(() => {
    /*
      A first baseline, read rather than computed: a zero-size inline-block with
      `vertical-align: baseline` sits with its bottom margin edge ON the line's baseline,
      so its own box is the measurement. Nothing here assumes a font metric.
    */
    const baselineOf = (el) => {
      if (!el) return null;
      const probe = document.createElement('span');
      probe.style.cssText =
        'display:inline-block;width:0;height:0;vertical-align:baseline;padding:0;margin:0';
      el.insertBefore(probe, el.firstChild);
      const y = probe.getBoundingClientRect().bottom;
      probe.remove();
      return y;
    };
    const core = document.querySelector('.core-band .core');
    const drawn = (el, pseudo) => {
      if (!el) return false;
      const cs = getComputedStyle(el, pseudo);
      return cs.content !== 'none' && cs.display !== 'none' && parseFloat(cs.width) > 0;
    };
    const coreLabel = document.querySelector('.core__label');
    /*
      Each tick hangs its own 32px of core padding, so the stroke's outer end lands on the
      core field's boundary exactly when the label's line runs the field's full inner
      width. It did not: `--measure-body` is 32em, 448px at the label's size, so at 1440
      the label stopped 76px short and took the right tick with it. Measured here, because
      the tick ends are the two coordinates §G.3a fixes.
    */
    const labelBox = coreLabel ? coreLabel.getBoundingClientRect() : null;
    const coreBox = core ? core.getBoundingClientRect() : null;
    return {
      tickEnds:
        labelBox && coreBox
          ? [
              Math.round(labelBox.left - coreBox.left - 32),
              Math.round(coreBox.right - labelBox.right - 32),
            ]
          : null,
      coreEdges: coreBox ? [Math.round(coreBox.left), Math.round(coreBox.right)] : null,
      bandTop: core ? core.getBoundingClientRect().top : null,
      core: baselineOf(coreLabel),
      android: baselineOf(document.querySelector('.edge--android .edge__label')),
      ios: baselineOf(document.querySelector('.edge--ios .edge__label')),
      ticks: [drawn(coreLabel, '::before'), drawn(coreLabel, '::after')].filter(Boolean).length,
    };
  });

  checked += 3;
  if (got.ticks !== 2) {
    failures.push(
      `/tanya/ @ ${width}: the core draws ${got.ticks} tick(s), and §G.3's shape is two — one out of each side of the field`,
    );
  }
  for (const field of ['android', 'ios']) {
    const delta = Math.abs((got[field] ?? 0) - (got.core ?? 0));
    if (delta > 1) {
      failures.push(
        `/tanya/ @ ${width}: the ${field} label's first baseline is ${delta.toFixed(1)}px off the core's — §I.1 row 2 puts all three on one baseline`,
      );
    }
  }
  checked += 1;
  for (const [side, gap] of [['left', got.tickEnds?.[0]], ['right', got.tickEnds?.[1]]]) {
    if (gap !== 0) {
      failures.push(
        `/tanya/ @ ${width}: the ${side} tick stops ${gap}px short of the core field's boundary — §G.3a terminates it ON the boundary`,
      );
    }
  }
  console.log(
    `      /tanya/ @ ${width}   ${got.ticks} tick(s) ending on the core's own x ${got.coreEdges?.join(' and ')}, three labels on one baseline, ${((got.core ?? 0) - (got.bandTop ?? 0)).toFixed(1)}px below the band's top edge (§G.3a's 50 is reported, never asserted)`,
  );

  await ctx.close();
}

await browser.close();
close();

console.log(`      ${checked} computed token(s) and baseline(s) checked on ${EXPECTED.length} routes in 2 schemes`);
process.exit(report('qa:worlds', failures));
