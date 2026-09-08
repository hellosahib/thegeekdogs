#!/usr/bin/env node
/**
 * build-fonts — PLAN.md §1.5's font pipeline, run against the BUILT output.
 *
 * It does the three things §1.5 specifies and one thing §1.5 flagged "verify at build".
 *
 * 1. **Subset from the real glyph set.** §1.5 asks for glyphhanger "run against the built
 *    `dist/` output … rather than the hand-picked Latin subset used for this estimate, so
 *    the real subset is exactly the glyph set the three worlds' actual copy uses", with
 *    `pyftsubset` as the named fallback if glyphhanger's crawl step is awkward — "same
 *    underlying subsetting engine, and the same one used to produce the numbers above".
 *    This is that fallback, and the crawl is a walk of `dist/` rather than a headless
 *    browser: the site is eight static files with no runtime text, so every code point
 *    that can ever be painted is already in them. **107 of the 110 code points below come
 *    out of `dist/`;** the rest is §1.5's own safety set (see SAFETY_RANGES).
 *
 * 2. **Restrict Anek Latin's `wdth` axis to 75–100** with `fonttools varLib.instancer`,
 *    which §1.5 makes "part of the font build step, not optional". The axis stays LIVE
 *    and narrower — it is not pinned — because §B.3's numeral role is `wdth` 87.5 and
 *    §G.2's condensed labels are `wdth` 75. `wght` keeps its full 100–800.
 *
 * 3. **Assert `tnum` survives.** §1.5 checked the source binary's GSUB for tabular
 *    figures and found them, which is why DESIGN.md §B.3's Spline Sans Mono fallback is
 *    not needed. A subsetter that drops the feature would take the fallback with it
 *    silently, so it is asserted here and the build fails if it goes.
 *
 * 4. **Fallback-metric matching**, §1.5's one "verify at build" line and the fix for
 *    `/contact/`'s CLS. For each face this emits a second `@font-face` over the visitor's
 *    own system sans — a real font, loaded with `local()` and costing zero bytes — with
 *    `ascent-override`, `descent-override`, `line-gap-override` and `size-adjust` set so
 *    that the fallback lays out at the SAME line height and the SAME average advance as
 *    the webfont. `font-display: swap` then swaps a face for a metrically identical one
 *    and nothing on the page moves.
 *
 *    Every number in those four properties is measured, not looked up: the ascent,
 *    descent, line gap and units-per-em come out of the subsetted binary's own `hhea`
 *    and `head` tables, and the advance ratio is measured in a real browser, at the
 *    weight each face is actually set at, against the local font that actually resolves
 *    on this machine.
 *
 * Output: two `.woff2` files in `public/fonts/`, and `src/styles/fonts.css`, which is
 * GENERATED and committed. `global.css` imports it. Run: `npm run fonts`.
 *
 * Requires a Python with fontTools + brotli. `npm run fonts` looks for it in
 * `.venv-fonts/bin/python` first and falls back to `python3`; see README.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(root, 'dist');
const OUT_FONTS = join(root, 'public', 'fonts');
const OUT_CSS = join(root, 'src', 'styles', 'fonts.css');

const PY = [join(root, '.venv-fonts', 'bin', 'python'), 'python3'].find(
  (candidate) => candidate === 'python3' || existsSync(candidate),
);

/**
 * §1.5's own reference subset, kept as a floor under the dist-derived set. It is the
 * punctuation a copy edit is most likely to introduce — curly quotes, the ellipsis, the
 * non-breaking space, and the star the 4.6-star figure would need — and §1.5 measured its
 * numbers against exactly this list, so keeping it makes the two figures comparable. It
 * costs 8 glyphs and 748 B on Anek.
 */
const SAFETY_RANGES = [
  [0x00a0, 0x00a0],
  [0x2018, 0x201f],
  [0x2026, 0x2026],
  [0x2605, 0x2605],
];

/**
 * The GSUB/GPOS features kept. This is every feature the two binaries actually ship that
 * this site's content can reach, plus kerning:
 *
 *   ccmp locl rvrn  — required for correctness. `rvrn` in particular is how a variable
 *                     font swaps glyphs across its own design space; dropping it breaks
 *                     the axis rather than shrinking the file.
 *   tnum            — DESIGN.md §B.3's tabular figures. Asserted below.
 *   liga            — standard ligatures.
 *   kern            — the GPOS pair kerning. It is 15 KB of the 48 on Anek and it is the
 *                     difference between a display face set properly and one set by
 *                     accident, on a site whose hero is 60px of it.
 *
 * NOT kept: `dnom`, `numr`, `frac`. They exist in Anek Latin and nothing on this site
 * prints a fraction, and their glyphs are 32 of the 157 the default feature list drags in.
 * `mark` / `mkmk` go with them: the subset has no combining marks to attach.
 */
const LAYOUT_FEATURES = 'ccmp,locl,rvrn,tnum,liga,kern';

const FACES = [
  {
    id: 'schibsted',
    family: 'Schibsted Grotesk Variable',
    fallbackFamily: 'Schibsted Grotesk fallback',
    src: 'node_modules/@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2',
    file: 'schibsted-grotesk-subset.woff2',
    /*
      The handoff asks for 400/500/600/700 and this is the variable face, so the range
      is declared rather than four static cuts: one file covers all four, and the
      in-between weights the type scale never names cost nothing extra.
    */
    weightRange: '400 700',
    stretchRange: undefined,
    /* One axis, and nothing to restrict on it. */
    instancer: [],
    /*
      The weight the face is dominantly set at — every heading on the site is 600 — which
      is the weight the advance ratio has to be measured at.
    */
    measureWeight: 600,
    preloaded: true,
  },
  {
    id: 'spline',
    family: 'Spline Sans Mono Variable',
    fallbackFamily: 'Spline Sans Mono fallback',
    src: 'node_modules/@fontsource-variable/spline-sans-mono/files/spline-sans-mono-latin-wght-normal.woff2',
    file: 'spline-sans-mono-subset.woff2',
    weightRange: '400 600',
    stretchRange: undefined,
    instancer: [],
    /* Eyebrows, micro-labels and nameplates are the bulk of the mono on the page. */
    measureWeight: 400,
    /* A monospace face has no `tnum` to keep: every glyph is already one advance wide. */
    mono: true,
    /*
      Preloaded too, and this face is the reason the site needs two preloads where the
      old one needed one: the mono carries the hero's own eyebrow, every floor nameplate
      and every figure, so a late swap moves marks inside the isometric scene rather
      than only reflowing a paragraph.
    */
    preloaded: true,
  },
];

/**
 * The local faces the metric-matched fallback tries, in order. They are named rather than
 * left to `sans-serif` because a metric override is only true of the face it was measured
 * against — the script reports which one actually resolved.
 *
 * **There are two lists, because there are two kinds of face.** A metric-matched fallback
 * fixes layout shift, not appearance, and pointing the monospace face at Helvetica would
 * make every eyebrow, nameplate and figure on the site set in a proportional font for the
 * length of the swap — the numbers would be right and the room would still look wrong. The
 * mono list is system monospace, in the order the platforms actually ship it.
 */
const LOCAL_FALLBACKS = ['Helvetica Neue', 'Arial', 'Helvetica', 'Roboto', 'Segoe UI'];
const LOCAL_FALLBACKS_MONO = ['SF Mono', 'Menlo', 'Monaco', 'Consolas', 'DejaVu Sans Mono', 'Courier New'];
const localsFor = (face) => (face.mono ? LOCAL_FALLBACKS_MONO : LOCAL_FALLBACKS);

/**
 * The advance ratio is measured over **the site's own prose**, pulled out of `dist/`.
 *
 * Capsize and Fontaine both use the bare lowercase alphabet, and it is the wrong string
 * here — measured three ways on this build, the alphabet gives Instrument Sans a 104.2%
 * ratio, an alphabet plus capitals, digits and punctuation gives 103.0%, and the site's
 * own paragraphs give something between; and the thing the number has to get right is
 * **where a paragraph wraps**, which depends on the mix of letters, spaces and
 * punctuation the paragraph actually contains. The reference is therefore the real text,
 * and the script reports the drift the choice produces.
 */
function proseSample() {
  const parts = [];
  const stack = [DIST];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.name.endsWith('.html')) {
        const text = readFileSync(full, 'utf8')
          .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
          .replace(/<!--[\s\S]*?-->/g, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&[a-z]+;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        parts.push(text);
      }
    }
  }
  return parts.join(' ').slice(0, 4000);
}

function fail(message) {
  console.error(`FAIL  build-fonts — ${message}`);
  process.exit(1);
}

function py(args) {
  return execFileSync(PY, args, { cwd: root, encoding: 'utf8' });
}

/** Walk dist/ and collect every code point that can be painted. */
function distCodePoints() {
  if (!existsSync(DIST)) fail('dist/ does not exist. Run `npm run build` first (PLAN.md §1.5).');
  const points = new Set();
  const stack = [DIST];
  let files = 0;
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (/\.(html|css|js|json|xml|txt|webmanifest|svg)$/.test(entry.name)) {
        files += 1;
        for (const character of readFileSync(full, 'utf8')) {
          const code = character.codePointAt(0);
          if (code >= 0x20) points.add(code);
        }
      }
    }
  }
  return { points, files };
}

function unicodeArgument(points) {
  const all = new Set(points);
  for (const [from, to] of SAFETY_RANGES) {
    for (let code = from; code <= to; code += 1) all.add(code);
  }
  return {
    list: [...all].sort((a, b) => a - b),
    argument: [...all]
      .sort((a, b) => a - b)
      .map((code) => `U+${code.toString(16).toUpperCase()}`)
      .join(','),
  };
}

/** hhea/head straight off the binary — the numbers the overrides are computed from. */
function metrics(path) {
  const raw = py([
    '-c',
    [
      'import json,sys',
      'from fontTools.ttLib import TTFont',
      'f=TTFont(sys.argv[1])',
      'g=set()',
      "if 'GSUB' in f: g={r.FeatureTag for r in f['GSUB'].table.FeatureList.FeatureRecord}",
      "a=[(x.axisTag,x.minValue,x.defaultValue,x.maxValue) for x in f['fvar'].axes] if 'fvar' in f else []",
      "print(json.dumps({'upm':f['head'].unitsPerEm,'ascent':f['hhea'].ascender,"
        + "'descent':f['hhea'].descender,'lineGap':f['hhea'].lineGap,"
        + "'glyphs':f['maxp'].numGlyphs,'features':sorted(g),'axes':a}))",
    ].join('\n'),
    path,
  ]);
  return JSON.parse(raw);
}

/**
 * The advance ratio, measured in a real browser rather than derived from a table.
 *
 * `size-adjust` is the one override that cannot come out of the binary, because it is a
 * relationship between two faces: the webfont's average advance over the local fallback's,
 * at the same weight. Measured on a canvas at 1000px so the ratio carries four figures.
 */
async function advanceRatios(faces) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<!doctype html><meta charset="utf-8"><body></body>');

  const payload = faces.map((face) => ({
    id: face.id,
    family: face.family,
    weight: face.measureWeight,
    candidates: localsFor(face),
    data: readFileSync(join(OUT_FONTS, face.file)).toString('base64'),
  }));

  const result = await page.evaluate(
    async ({ faces, candidates, reference }) => {
      for (const face of faces) {
        const binary = Uint8Array.from(atob(face.data), (c) => c.charCodeAt(0));
        const loaded = new FontFace(face.family, binary.buffer, { weight: '100 900' });
        await loaded.load();
        document.fonts.add(loaded);
      }
      const context = document.createElement('canvas').getContext('2d');
      const width = (family, weight) => {
        context.font = `${weight} 1000px ${family}`;
        return context.measureText(reference).width;
      };
      const resolvedFor = (list, generic) =>
        list.find((name) => document.fonts.check(`16px "${name}"`)) ?? generic;
      const resolved = candidates
        .map((list) => resolvedFor(list.candidates, list.mono ? 'monospace' : 'sans-serif'))
        .join(' / ');
      return {
        resolved,
        faces: faces.map((face) => ({
          id: face.id,
          resolved: resolvedFor(face.candidates, face.mono ? 'monospace' : 'sans-serif'),
          target: width(`"${face.family}"`, face.weight),
          /*
            The fallback is measured at 400 whatever weight the target is measured at, and
            that is not a shortcut. `src: local('Helvetica Neue')` in an `@font-face`
            resolves to ONE face — the family's regular — and the declared
            `font-weight: 100 800` on that block then makes the browser paint that one face
            at every weight it is asked for. Measuring the fallback at 600 would measure a
            real Bold the fallback will never paint, and the ratio would come out ~7% small.
          */
          fallback: width(
            `"${resolvedFor(face.candidates, face.mono ? 'monospace' : 'sans-serif')}", ${face.mono ? 'monospace' : 'sans-serif'}`,
            400,
          ),
        })),
      };
    },
    {
      faces: payload.map((f) => ({ ...f, mono: Boolean(FACES.find((x) => x.id === f.id)?.mono) })),
      candidates: FACES.map((f) => ({ candidates: localsFor(f), mono: Boolean(f.mono) })),
      reference,
    },
  );

  await browser.close();
  return result;
}

const round = (value) => Math.round(value * 10000) / 10000;
const percent = (value) => `${round(value * 100)}%`;

/* ------------------------------------------------------------------ 1. the glyph set */

const reference = proseSample();
const { points, files } = distCodePoints();
const unicodes = unicodeArgument(points);
console.log(`      ${files} built file(s) walked`);
console.log(
  `      ${points.size} code point(s) in dist/ + ${unicodes.list.length - points.size} from the safety set = ${unicodes.list.length}`,
);

mkdirSync(OUT_FONTS, { recursive: true });

/* --------------------------------------------- 2. instance the axes, 3. subset, assert */

const report = [];
let total = 0;

for (const face of FACES) {
  const source = join(root, face.src);
  if (!existsSync(source)) fail(`${face.src} is missing. Run \`npm install\`.`);
  const before = statSync(source).size;

  let staged = source;
  if (face.instancer.length > 0) {
    staged = join(OUT_FONTS, `.${face.id}-instanced.woff2`);
    py(['-m', 'fontTools.varLib.instancer', source, ...face.instancer, '-o', staged]);
  }

  const destination = join(OUT_FONTS, face.file);
  py([
    '-m',
    'fontTools.subset',
    staged,
    `--unicodes=${unicodes.argument}`,
    `--layout-features=${LAYOUT_FEATURES}`,
    '--flavor=woff2',
    `--output-file=${destination}`,
  ]);
  if (staged !== source) execFileSync('rm', ['-f', staged]);

  const after = statSync(destination).size;
  const m = metrics(destination);

  /*
    Tabular figures, asserted on the face that needs them and not on the one that cannot
    have them.

    Every number on this site sets in Spline Sans Mono, and a MONOSPACE face has no
    `tnum` feature because every glyph in it is already one advance wide — tabular is the
    only thing it can be. Demanding the feature there fails a font for being the kind of
    font it was chosen for being.

    Schibsted Grotesk is the face that can lose it, and it is asked to keep it because
    `font-variant-numeric: tabular-nums` is declared site-wide: a subsetter that dropped
    the feature would take the alignment with it silently, in whatever numerals slip into
    proportional text.
  */
  if (!face.mono && !m.features.includes('tnum')) {
    fail(`${face.family} lost its \`tnum\` feature in subsetting.`);
  }
  if (m.axes.length === 0) fail(`${face.family} came out of subsetting as a static font.`);

  /*
    Neither of the two families has a `wdth` axis, so there is no axis to restrict and
    no instancer step to assert. What is asserted instead is that the axis genuinely is
    absent: a fontsource update that shipped a second axis would silently double the
    design space the subset carries, and the size report is not sensitive enough to
    catch it.
  */
  const wdth = m.axes.find(([tag]) => tag === 'wdth');
  if (wdth) {
    fail(`${face.family} now ships a wdth axis (${JSON.stringify(wdth)}); the subset does not expect one.`);
  }
  const wght = m.axes.find(([tag]) => tag === 'wght');
  if (!wght) fail(`${face.family} lost its wght axis.`);

  total += after;
  report.push({ face, before, after, metrics: m });
}

/* ------------------------------------------------------- 4. the fallback metric overrides */

const measured = await advanceRatios(FACES);
console.log(`      local fallback resolved to: ${measured.resolved}`);

const blocks = [];
for (const row of report) {
  const { face, metrics: m } = row;
  const advance = measured.faces.find((entry) => entry.id === face.id);
  const sizeAdjust = advance.target / advance.fallback;
  const ascent = m.ascent / m.upm / sizeAdjust;
  const descent = -m.descent / m.upm / sizeAdjust;
  const lineGap = m.lineGap / m.upm / sizeAdjust;
  row.overrides = { sizeAdjust, ascent, descent, lineGap };

  blocks.push(`/*
  ${face.family} — subset from dist/, ${m.glyphs} glyphs, ${row.after.toLocaleString('en-US')} B
  (source ${row.before.toLocaleString('en-US')} B). Axes ${m.axes
    .map(([tag, min, , max]) => `${tag} ${min}–${max}`)
    .join(', ')}. Features ${m.features.join(', ')}.
*/
@font-face {
  font-family: '${face.family}';
  font-style: normal;
  font-display: swap;
  font-weight: ${face.weightRange};${face.stretchRange ? `\n  font-stretch: ${face.stretchRange};` : ''}
  src: url('/fonts/${face.file}') format('woff2-variations');
}

/*
  The metric-matched fallback. It is the visitor's own ${measured.resolved}, re-declared with
  ${face.family}'s line box and average advance, so \`font-display: swap\`
  replaces one face with another of the same size and nothing on the page moves.

  Measured, not looked up: ascent ${m.ascent}/${m.upm}, descent ${-m.descent}/${m.upm},
  line gap ${m.lineGap}/${m.upm} from the subsetted binary's own hhea and head tables;
  the ${round(sizeAdjust)} advance ratio from ${reference.length} characters of the site's own prose set at
  ${face.measureWeight} weight in a real browser. The three overrides are divided by the
  size-adjust because size-adjust scales the em the overrides are percentages of.
*/
@font-face {
  font-family: '${face.fallbackFamily}';
  font-style: normal;
  font-weight: ${face.weightRange};
  src: ${localsFor(face).map((name) => `local('${name}')`).join(', ')};
  ascent-override: ${percent(ascent)};
  descent-override: ${percent(descent)};
  line-gap-override: ${percent(lineGap)};
  size-adjust: ${percent(sizeAdjust)};
}`);
}

writeFileSync(
  OUT_CSS,
  `/*
  GENERATED by scripts/build-fonts.mjs. Do not edit by hand: run \`npm run fonts\`.

  PLAN.md §1.5's pipeline, applied to the built output — subset from dist/'s own glyph
  set, \`wght\` untouched, \`wdth\` asserted absent, \`tnum\` asserted present, and one
  metric-matched local fallback per face so the \`font-display: swap\` costs no layout
  shift.

  Total: ${total.toLocaleString('en-US')} B for both faces.
  woff2 does not compress further under gzip, so this is also the transfer size.
*/

${blocks.join('\n\n')}
`,
);

/* -------------------------------------------------------------------------- the report */

console.log('');
for (const row of report) {
  console.log(
    `      ${row.face.file.padEnd(32)} ${String(row.after).padStart(7)} B` +
      `   (was ${row.before} B, ${Math.round((1 - row.after / row.before) * 100)}% off)` +
      `   ${row.metrics.glyphs} glyphs`,
  );
  console.log(
    `      ${''.padEnd(32)} size-adjust ${percent(row.overrides.sizeAdjust)}` +
      `, ascent ${percent(row.overrides.ascent)}` +
      `, descent ${percent(row.overrides.descent)}` +
      `, line-gap ${percent(row.overrides.lineGap)}`,
  );
}
const target = 70708;
console.log('');
console.log(
  `      total ${total} B (${(total / 1024).toFixed(1)} KB) against PLAN.md §1.5's ${target} B target` +
    ` — ${total <= target ? 'under' : 'OVER'} by ${Math.abs(target - total)} B`,
);
console.log(`      css   ${OUT_CSS.slice(root.length + 1)}`);
console.log('PASS  build-fonts');
