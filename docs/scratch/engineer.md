# Engineer scratch log

Session: 2026-09-05. Alternatives considered and rejected, so later rounds don't relitigate.

## Motion library

- **GSAP** (core ~23-27KB gzip, ScrollTrigger extra) — rejected as the default. Now fully free (Webflow made all plugins free, Apr 2025) so licensing isn't the objection — weight and surface area are. Nothing on this site needs GSAP's timeline sequencing, ScrollTrigger pinning, or SVG morphing. The floor's idle loop is CSS-only; the "one orchestrated moment per page" (§10) is a handful of transform/opacity animations. Keeping a spike in reserve: if the Interaction Engineer finds a genuine staggered-sequence need GSAP handles better than Motion One, argue it then against the JS budget — don't default to it.
- **Motion One / "Motion" `animate()` mini build** (~2.3KB gzip, WAAPI-only) — picked. Covers card entrance stagger, floor reveal sequencing, stage-indicator transitions. Falls back cleanly: mini uses native Web Animations API, so `prefers-reduced-motion` handling is a single `matchMedia` check gating whether `animate()` is even called.
- **No library at all** — seriously considered for v1. CSS `@keyframes` + `transition` covers the idle loop and simple state changes entirely. Rejected as *the only* answer because a couple of interactions (staggered desk reveal, coordinated card open/close where timing must be JS-orchestrated against user input) are awkward in pure CSS without extra class-juggling JS that ends up reinventing what Motion One mini already does in 2.3KB. Net: CSS for idle/looping, Motion One mini for the handful of orchestrated one-shot moments.

## Lenis

Rejected. Under 4KB gzip on its own so it's not a budget-breaker, but:
- The floor's desks are real focusable `<button>` elements — smooth-scroll libraries that hijack the scroll container have a history of fighting native focus-scroll-into-view behavior, which is exactly the thing §6 requires to work perfectly.
- Native scroll is already instant and predictable, which matters more for INP/conversion on a lead-gen page than scroll easing.
- One extra dependency, one extra reduced-motion code path to verify, for a "nice to have" the brief marks optional and conditions on surviving the budget.
- Revisit only if the Design Lead's "one orchestrated moment" for a specific page turns out to need scroll-linked choreography that CSS scroll-driven animations (`animation-timeline: scroll()`) can't express — check browser support for that CSS feature first, since if it's usable it replaces Lenis entirely at zero JS cost. Flagged verify at build.

## Studio floor interactive layer

- **`foreignObject` with real HTML `<button>`s inside the SVG** — rejected. Support for interactive form controls inside `foreignObject` is inconsistent enough across engines, and it complicates hit-testing/z-order/stacking with the surrounding page. Doesn't buy anything a plain overlay doesn't already give us.
- **SVG-native fake buttons** (`<a>`/`<g role="button" tabindex="0">` inside the SVG) — rejected. SVG has no real form controls, so this means hand-rolling keyboard activation (Enter/Space), focus rings, and accessible-name plumbing that HTML gives for free. More JS, more ARIA surface to get wrong, for no visual gain since the SVG is otherwise decorative.
- **Real HTML `<button>` elements absolutely positioned over a decorative, `aria-hidden` SVG background** — picked. Native focus, native keyboard activation, native accessible name from visible text or `aria-label`, zero custom ARIA choreography. The SVG becomes pure paint; the interactive layer is boring, reliable HTML. This is also what makes the "roster first, scene as progressive enhancement" build order (§14 step 2→3) trivial: it's the *same* buttons, repositioned by CSS.

## OG image generation

- **astro-og-canvas** — rejected for the home page specifically. It draws via the Canvas API against a fairly fixed template shape; multiple sources describe it as "too limited... predefined layout." We need the home OG to show the actual floor composition, which is an arbitrary SVG/HTML layout, not a title-card template.
- **Satori + resvg via a prerendered Astro endpoint** — picked. Satori converts HTML/CSS (JSX-like) to SVG, resvg rasterizes to PNG, both run at build time inside a `prerender = true` image endpoint, so zero runtime cost and no drift from copy (image is generated from the same content collections as the page). Reuses the floor's own `<symbol>` defs for the home OG.

## Analytics

- **Google Analytics** — excluded per §13 explicitly (cost + consent obligation).
- **Plausible** — considered. Script is small (~2.5KB gzip per current docs) but it's a paid product now (no indefinitely-free tier, trial-based) and still heavier than the alternative below.
- **Cloudflare Web Analytics** — picked. No cookies, so no consent banner obligation (matches §13's steer), beacon script is smaller than Plausible's, free indefinitely. Custom event tracking (CTA/mailto clicks) API surface needs confirming against current CF docs before implementation — flagged verify at build.

## Contact form service

- **Tally** — rejected. Free tier is described as "branding-heavy" (Tally watermark/redirect UX), which is a bad look on a page selling craft discipline.
- **Web3Forms** — close second. Higher free cap (250/mo vs Formspree's 50/mo) and built-in hCaptcha. Rejected as the default because hCaptcha is a third-party script + a visible challenge widget, adding JS weight and friction to what should be a one-field, no-JS-required mailto-style form. Kept as the documented fallback if Formspree's 50/mo cap turns out to be too low once real lead volume is known.
- **Formspree** — picked. Free tier honeypot (`_gotcha`) spam handling needs no client JS and no third-party challenge UI — the form works as a plain HTML `<form method="POST">`, functioning even with JS disabled, which fits the zero-JS-by-default policy better than a captcha-gated alternative. The 50/month cap is a real risk, called out in the budget/risk sections.

## Tailwind v4 multi-world theming

- **Three separate Tailwind builds** (one per world) — explicitly rejected by §11 ("one build, not three"). Not seriously considered.
- **Everything inside `@theme`** — considered, rejected as the whole mechanism. Tailwind v4's `@theme` block is a static, build-time token registration (it's what generates the utility classes), so per-world *runtime* switching can't live there directly.
- **`@theme` maps semantic token names to `var(--...)` references; the actual custant values are declared as plain CSS custom properties scoped under `[data-world="…"]` selectors, outside `@theme`** — picked. Utilities like `bg-surface` compile once, reference a variable, and that variable's value flips per `data-world` scope with no rebuild. This exact pattern (indirection through a variable Tailwind's `@theme` points at) is the standard v4 technique for runtime-themeable tokens, but I have not built and measured it in this codebase yet — flagged verify at build in the plan.

## Trailing slash

- `trailingSlash: 'never'` — rejected. §8's IA is written entirely in directory form (`/work/`, `/sahib/`, `/contact/`), so `'never'` would fight the brief's own routing table.
- `trailingSlash: 'ignore'` (Astro default) — rejected as under-specified; §8 explicitly wants dev and Pages to agree, and `'ignore'` doesn't enforce which form canonical URLs/sitemap entries take.
- `trailingSlash: 'always'` — picked. Matches the IA as written, matches static-site folder/`index.html` output, gives one canonical URL shape for sitemap/OG/JSON-LD.

---

## Round 2 (Orchestrator changes requested, 2026-09-05)

Ten items applied to `PLAN.md` in place. Listed here so a later round doesn't relitigate.

1. **Analytics pick reversed: Plausible, not Cloudflare Web Analytics.** Checked current Cloudflare docs rather than trusting Pass 1's assumption. Cloudflare's own FAQ (https://developers.cloudflare.com/web-analytics/faq/) states custom events are not supported: *"Not yet, but we may add support for this in the future."* That makes it structurally unable to meet §13's CTA/mailto click-tracking requirement, so it can't be the pick regardless of price. Plausible's tagged-events mechanism (`plausible-event-name=<Name>` CSS class, https://plausible.io/docs/custom-event-goals) does this with zero custom JS. Measured script weight directly rather than quoting a marketing number: fetched `https://plausible.io/js/script.js` (2841 B raw / 1306 B gzip) and `https://plausible.io/js/script.tagged-events.js` (4185 B raw / 1826 B gzip) and gzipped both locally. Pricing checked at plausible.io: Starter plan, $9/month, up to 10,000 combined pageviews+events. That cost is now a line in `QUESTIONS.md` §G item 35 for the owners to approve — Cloudflare Web Analytics stays documented in `PLAN.md` §1.8 as the free fallback if they decline, with the tradeoff (loses click tracking) stated explicitly rather than absorbed silently.
2. **`agents.deskPosition` → `deskSlot`, shape-only regex (`/^desk-\d+$/`), not a fixed enum.** COPY.md §2.4 has seven agent desks against Pass 1's six-slot enum. Added a build-time validation note: a single source of truth for valid slot ids (e.g. `src/components/floor/deskSlots.ts`) is cross-checked against every `agents.deskSlot` value; a reference to an undefined slot, or a defined slot nothing occupies, fails the build with the mismatched ids printed.
3. **`people.pronouns` made optional.** The brief only supplies pronouns for Sahib (§5.4); a required field would force inventing Tanya's. JSON-LD and copy omit pronouns when the field is absent.
4. **`sameAs` removed from the schema code block.** It was listed as a field in the block but the prose immediately below said to remove it — an internal contradiction. The block now matches what's actually written; the derived-helper approach (computed in `src/lib/person.ts` from `socials`) is unchanged.
5. **Deleted the Devanagari-glyph clause in §1.5 fonts**, no replacement. It was speculative ("if the wedding planner's working name is ever printed") and brief §5.3 confirms the working name is never printed anywhere on the site.
6. **§3 QuietBack example markup removed.** The `<a href="/">← the studio</a>`-shaped example glued an arrow to link text, which brief §9.4 bans outright. Replaced with a description in words, pointing at COPY.md §1 "Back to the studio" for the actual label and accessible name.
7. **`qa:no-slop` clarified and extended.** Added `[CONFIRM` (open bracket, no close) to the grep list alongside `[FILL]`, since COPY.md uses both markers. Also stated explicitly, as a site-wide rule (not just a grep side effect), that the `placeholder` pattern is meant to catch the HTML `placeholder=` attribute too — no field on the site uses a placeholder attribute; every hint is visible text, matching how COPY.md §8.3 already writes hints ("Field hint: `So we can reply.`").
8. **Lighthouse CI now explicitly uses LHCI's own built-in static server (`staticDistDir`), not `npx serve`.** Checked LHCI's current source directly (`packages/cli/src/collect/fallback-server.js` on GoogleChrome/lighthouse-ci): it's an Express app with `compression()` middleware installed unconditionally, so it gzips by Accept-Encoding like a real host. Checked `npx serve` (`vercel/serve`) separately: its own tracker (`vercel/serve#460`) confirms compression was dropped and never restored — it serves raw bytes. Using `serve` would have made every `resource-summary:*:size` assertion measure uncompressed bytes against gzip-stated budgets, i.e. wrong thresholds. Left one open item: still need to confirm the deployed GitHub Pages host itself serves gzip/brotli so the CI numbers hold in production — flagged verify at build in §8.1.
9. **§4.5 `content-visibility: auto` now paired with `contain-intrinsic-size`.** Without a size hint, the floor section's box has nothing to size against before it's laid out, so it can jump height and shift the scrollbar the moment it renders — directly fighting the CLS line the optimization was meant to help.
10. **§6 compact stage-indicator variant: `title` attribute dropped, visually-hidden text only.** `title` isn't a reliable accessible name (no keyboard/touch exposure, inconsistent AT support). A clipped, visually-hidden element carrying the same text is now the only mechanism specified.

---

## Round 3 (Design review, DESIGN.md Pass 1, 2026-09-05)

Verdict: **APPROVED** (PLAN.md §13). Six PLAN.md sections updated in place (§1.5, §3, §4.3, §4.6, §6, §7, §12) to match DESIGN.md's decisions; no visual-judgement change requested back to the Design Lead.

**Font measurements — the actual numbers behind PLAN.md §1.5, checked 2026-09-05:**

- Package manifests: `https://data.jsdelivr.com/v1/packages/npm/@fontsource-variable/anek-latin@5.3.0` and `.../@fontsource-variable/instrument-sans@5.3.0`.
- Binaries downloaded from `https://cdn.jsdelivr.net/npm/@fontsource-variable/anek-latin@5.3.0/files/anek-latin-latin-standard-normal.woff2` (two-axis, `wght`100–800 + `wdth`75–125, unsubsetted: 103,760 B) and `.../anek-latin-latin-wght-normal.woff2` (single-axis, unsubsetted: 44,796 B); `https://cdn.jsdelivr.net/npm/@fontsource-variable/instrument-sans@5.3.0/files/instrument-sans-latin-wght-normal.woff2` (single-axis, unsubsetted: 30,092 B) and `.../instrument-sans-latin-standard-normal.woff2` (two-axis incl. an unused `wdth` axis, unsubsetted: 57,332 B).
- Axis metadata confirmed via `.../scss/metadata.scss` on both packages: Anek Latin ships `wght` 100–800 + `wdth` 75–125; Instrument Sans ships `wght` 400–700 + `wdth` 75–100 (unused by DESIGN.md, left at default) + `ital`.
- Installed fonttools 4.64.0 locally (venv, since no system fonttools was present) and ran `pyftsubset` against a representative Latin subset (`U+0020-007E,U+00A0,U+2013-2014,U+2018-201F,U+2026,U+2605`) as a stand-in for glyphhanger's real dist-crawl: Anek two-axis → 69,680 B; Anek single-axis → 29,276 B; Instrument single-axis → 20,328 B.
- Confirmed gzip adds nothing on top of woff2 (measured directly — woff2 is already Brotli-compressed; gzip changed size by <0.1%, sometimes making it marginally larger).
- Mitigation measured with `fonttools varLib.instancer`: restricting Anek's `wdth` axis from 75–125 down to 75–100 (a range restriction, not a full pin — DESIGN.md never asks for `wdth` above 100 anywhere) → subsetted size drops to 52,076 B, a 25% cut with zero cost to anything DESIGN.md specifies. A full axis drop (pin `wdth=100`, keep `wght` variable) was also measured for comparison: 28,820 B — smaller, but costs real design intent (numerals' `wdth 87.5`, Tanya's `wdth 75` condensed labels), so not recommended. A fully static single instance (`wght=600 wdth=100`, pinned, for the hero text only) measured 12,528 B — recommended as the actual preload candidate instead of the full variable file.
- Confirmed `tnum` (tabular figures) present in Anek Latin's `GSUB` table via fontTools (`ccmp, dnom, frac, liga, locl, numr, rvrn, tnum`) — DESIGN.md §B.3's Spline Sans Mono fallback is not triggered.
- Revised font payload: ~71KB (Anek ~51KB range-restricted + Instrument ~20KB), up from Pass 1's ~50KB guess but well inside the 1.2MB total-page-weight ceiling; LCP plan still holds under `font-display: swap` since LCP for text is satisfied by the fallback-font paint, not by webfont download completion.

**Other round 3 findings, briefly (full reasoning in PLAN.md itself):**

- §4.3 (card slot): DESIGN.md's fixed-slot design is less code than Pass 1's popover plan, not more — `popover`/anchor-positioning removed entirely, replaced with a `hidden`-attribute toggle across 8 server-rendered cards plus an `aria-live="polite"` slot so hover/focus/tap stay genuinely equivalent for AT users. ≥1024 min-height has no DESIGN.md number (only <768's 168px does) — resolved via a build-time measurement script rather than inventing one.
- §4.6 (floor weight): DESIGN.md §C.10's real composition (~15KB raw / ~6-8KB gzip) is far leaner than Pass 1's own placeholder guess (~40-45KB raw) — risk on this line goes down, not up, now that a real composition exists.
- §3 (sticky contact plate): DESIGN.md's `position: sticky` plate is feasible; flagged a build-order dependency (the floor's `content-visibility: auto` / `contain-intrinsic-size` must account for §B.10's own +56px reserve) and a `pointer-events` detail (wrapper `none`, plate `auto`) so the sticky wrapper's invisible box doesn't swallow clicks meant for the floor underneath.
- §3 (404 empty room): shared slab/lamp-gradient markup authored once as a shared Astro component, duplicated inline per static page at build time (no runtime sprite fetch) — estimated 400-600 bytes raw for the 404 page's stripped-down version, confirming DESIGN.md's "roughly zero new bytes" claim.
- §6 (stage indicator): DESIGN.md's `stroke-dashoffset` motion spec (§H.5) implies SVG-drawn connectors, not CSS borders as Pass 1 assumed; the compact home variant's "one set of column headers, two runners" (§E.3) is a table relationship, not two reused single-product `<ol>`s — both corrected in PLAN.md §6.

---

## Build step 1 — repo, tokens, content, routes, QA, CI (2026-09-05)

Scope per brief §14 step 1 and PLAN.md §11 step 1: a plain working site before any design lands. No floor, no person pages, no motion, no work or contact routes.

### The `@theme`-via-`var()` spike (PLAN.md §1.2, §12 risk 5) — resolved, with a correction

**Plain `@theme` does not work for the three-world scope. `@theme inline` does.** Proved by building both and reading the emitted CSS:

- `@theme { --color-surface-alt: var(--tgd-surface-alt); }` emits `--color-surface-alt: var(--tgd-surface-alt)` on `:root` and compiles the utility to `background-color: var(--color-surface-alt)`. Custom properties substitute their `var()` references at computed-value time **on the element where they are declared**, so `--color-surface-alt` computes once at `:root` to the studio value and inherits that value everywhere. A `[data-world="tanya"]` override of `--tgd-surface-alt` would never reach it. This is the failure mode PLAN.md §1.2 flagged and could not name.
- `@theme inline { --color-surface-alt: var(--tgd-surface-alt); }` substitutes the reference **into the utility**: the shipped rule is `.bg-surface-alt{background-color:var(--tgd-surface-alt)}`, resolved at the element, so a world scope overrides it correctly. Verified in `dist/_astro/style.*.css`.

So PLAN.md §1.2's fallback (hand-writing theme-consuming utilities as plain CSS outside `@theme`) is **not needed**. The one-word change from `@theme` to `@theme inline` is the whole fix. `src/styles/global.css` carries the reasoning inline so nobody "simplifies" it back.

Two naming collisions found while doing it, both fixed in `tokens.css`: DESIGN.md's `--font-display` / `--font-body` and `--ease-out` / `--ease-inout` / `--ease-idle` occupy the same names as Tailwind's own `--font-*` and `--ease-*` theme namespaces, which makes the mapping self-referential. The font tokens are renamed `--tgd-font-display` / `--tgd-font-body`; DESIGN.md §H.1's easing tokens keep their exact DESIGN.md names and are deliberately not mapped into `@theme` at all (no motion ships this step, and they are available as plain `var()`).

### Deferred, deliberately — do not look for these in source, they are here on purpose

`qa:no-slop` greps the built output for `TODO` and `FIXME`, so nothing below may be written as a marker in a source file. This list is the marker.

1. **Font subsetting and the `wdth` range restriction (PLAN.md §1.5) is step 8's job.** Today `public/fonts/` carries the full unsubsetted Fontsource binaries: Anek Latin two-axis 103,760 B and Instrument Sans single-axis 30,092 B, 133,852 B total — exactly the raw figures §1.5 measured. The pipeline §1.5 specifies (glyphhanger against the built `dist/`, `fonttools varLib.instancer` restricting `wdth` to 75–100, a pinned ~12.5KB static hero instance as the only preload candidate) brings that to ~71KB, and is worth doing only once the real copy exists to subset against. `npm run fonts:sync` is where that step hooks in.
2. **Fallback-metric matching for `font-display: swap` (PLAN.md §1.5, risk 7).** Not applied. Measured CLS is 0 today because the page is short and the swap happens above the fold before layout settles; this needs the `ascent-override`/`size-adjust` work before the page grows.
3. **The nav links and the footer's "Elsewhere" group.** COPY.md §1 gives four nav labels (Work, Sahib, Tanya, Contact) and the footer's nav repeat. Those four routes are not built, so rendering the links would be four broken links and `qa:links` would be right to fail. They go back in at step 2 as their routes land. `src/components/Header.astro` and `Footer.astro` each carry a comment saying so.
4. **The hero's secondary button, "Look around the floor".** It exists to hand the visitor to the floor, and there is no floor yet. Returns with step 3.
5. **A favicon.** There is none, so every page load requests `/favicon.ico` and gets a 404, which is the single reason Lighthouse's best-practices score is 96 rather than 100 (`errors-in-console`, one network 404). QUESTIONS.md item 48 says there is no logo and the header sets the name in the display face — that answers the wordmark, not the tab icon. This is a Design Lead deliverable; inventing one would be inventing artwork.
6. **OG image.** `og:image` is not emitted. PLAN.md §1.7's Satori pipeline renders the floor composition, which does not exist yet, and COPY.md §2.11 specifies the image's text but not a fallback image. Step 7.

### Other decisions made this step

- **Astro is pinned to `5.18.2`, the newest 5.x, per the brief. `npm audit` reports eight high-severity advisories against it, none of which has a patched 5.x release** — every fix landed in 6.x or 7.x, and the current line is 7.3.1. Every one of the eight concerns dynamically rendered values: `define:vars`, server islands, spread attribute names, `transition:*` directives, View Transition animation properties, slot names, and a prerendered error page's Host header. This build is fully static, has no server runtime, no islands, no view transitions, and renders no user-supplied value, so the practical exposure is nil. Flagged to the Orchestrator all the same: staying on Astro 5 means staying on a line that no longer receives security patches, and moving to 7 is a stack change that needs sign-off, not a quiet upgrade.
- **`optionalGlob` (`src/loaders/optional-glob.ts`).** Astro's `glob()` loader warns when its directory is empty, and `people`/`agents` are legitimately empty until step 2. Rather than weakening `qa:build`'s zero-warning gate with an allowlist, the loader skips the glob entirely when there is no matching file, so the collection is empty and quiet. Every warning the build does emit stays a real one.
- **One narrow Rollup `onwarn` filter, in `astro.config.mjs`.** When `PUBLIC_FIREBASE_*` is unset the analytics bootstrap compiles to an empty chunk, and Rollup says so. That is the designed outcome, and it is scoped to `EMPTY_BUNDLE` on the Analytics module only.
- **`qa:links` skips `^https://thegeekdogs.com/`.** That origin appears as `<link rel="canonical">` and `og:url`. Fetching it from a pre-deploy checker tests whatever is currently live, not the build under test — it returned 520 before it was skipped. No external 404 is silenced by this.
- **`qa:no-slop`'s lowercase check is scoped to `.html` routes.** Vite's content hashes are legitimately mixed-case and are not URLs anyone types. PLAN.md §1.10's intent is route slugs, which the Zod regex already enforces at the schema level.
- **The compact stage view is one `<ol>` per product**, per REVIEWS.md's arbitration of 2026-09-05 (brief §6.2 outranks both PLAN.md §6's `<table>` and DESIGN.md §E.3). The shared axis comes from a visible, aligned header row of the five stage names plus two lists carrying identical item text in identical order; each list carries an accessible name naming its product, and every item carries its state as a spoken word (COPY.md §10.4) so nothing rests on the graphic.
- **The contact plate is in flow at the end of its sticky wrapper**, which is what gives it the "retires when the real CTA arrives" behaviour geometrically. Sections inside the wrapper carry the +56px bottom reserve DESIGN.md §B.10 specifies.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| JS shipped, home page, no analytics config | **0 B** — no `<script>` tag at all |
| CSS shipped, home page | 23,811 B raw / **5,681 B gzip** (14% of the 40KB line) |
| Home HTML | 2,345 B gzip |
| Fonts | 133,852 B (unsubsetted; ~71KB after step 8) |
| Home page total | **141,878 B gzip** (11% of the 1.2MB line) |
| Firebase Analytics, config present | 915 B gzip bootstrap + 14,891 B gzip lazy chunk = **15,806 B gzip** (15.4% of the 100KB line) |
| Lighthouse mobile, 3 runs, LHCI static server | Performance **100**, Accessibility **100**, Best practices **96**, SEO **100** |
| LCP | 1,341 / 1,341 / 1,484 ms (line is 2,000) |
| CLS | **0** (line is 0.05) |
| TBT | **0 ms** |
| Contrast pairs checked against DESIGN.md's published ratios | 26, all matching to two decimals |

---

## Build step 2 — the whole home page, the roster, the dark scheme (2026-09-05)

Scope per brief §14 step 2: the complete home page with the floor as a static semantic
roster, the dark scheme and its toggle, and the sixteen items from
`docs/reviews/step1-design-review.md` that are the Engineer's. No SVG scene, no motion.

### The sixteen review items, and how each was closed

| # | Fix |
|---|---|
| 1 | Every section inside the plate's sticky span reserves the plate's own footprint on the right at ≥768 (`--plate-keepout`), so there is no scroll position at which the two can meet. See the caveat below — this is only true at ≥768. |
| 2, 3 | One axis, five columns defined once on `.track` and taken by the label row and both runners through `subgrid`. A node's position no longer depends on the widths of the nodes before it, and a label is centred on its own node rather than on a second grid. |
| 4, 5, 6 | The gates are one hung-numeral column; `01`–`04` set with `decimal-leading-zero` and hung into the outer margin at 360, into col 1 at ≥1024; the closing line anchored in cols 9–12 at display-section size, vertically centred to the group, at 1440. |
| 7 | The three figures as the numeral-large block: Anek 500 at `wdth` 87.5, `font-variant-numeric: tabular-nums`, a micro label under each. |
| 8 | `--measure-body` is `32em`, not `62ch`. The rendered hero body is ~65 characters, not 79. |
| 9 | Proof is the full-bleed `--band` split, prose cols 1–5 and the track cols 7–12 at 1440, which also restores the fill alternation to sheet, floor, band, sheet, band, sheet, floor. |
| 10 | §2.7 paragraph 2, §2.8's caption and §2.8's body all print. |
| 11 | The whole "What you get" section, both paragraphs. |
| 12 | The footer's location line. |
| 13 | The plate on /404, in the same sticky wrapper. |
| 14 | The final CTA's address is `--lamp` text on `--floor` with a 2px rule under it. The site is back to exactly three ambers. |
| 15 | `body` is a flex column with `min-block-size: 100dvh` and `main { flex: 1 0 auto }`, so the footer band sits on the viewport's bottom edge on a short page. |
| 17 | The trailing `Stage:` line is `display: none` at ≥768 and sits *above* its track below it, where COPY.md §10.4 puts it. |

### Item 1 is a spec conflict, and this is how far it goes

§B.10 says the plate "never covers content"; §B.9 puts content in every column of a
1200px grid; and a `position: sticky` element pinned to the viewport's bottom-right will
pass over whatever is under it at some scroll position. Those three cannot all hold. The
lane is the reviewer's own first suggested fix and it works, but it costs width:

| Viewport | Keep-out | Content left |
|---|---|---|
| 768 | 244 of 704 | 460 |
| 1024 | 228 of 928 | 700 |
| 1440 | 156 of 1200 | 1044 |
| ≥ 1872 | 0 | full |

**Below 768 there is no lane at all** — §B.10 makes the plate a full-bleed 56px bar, so
it is the viewport's width and there is nothing to move content out of. `home-360-*-scrollmid.png`
shows it over the tail of a paragraph. That is not fixable in CSS; it needs either a
narrower plate below 768 or the plate not being sticky there, and both are the Design
Lead's calls. **Flagged for round 4.**

Two layout consequences of the lane, both deviations from a spec written before it:

- **§B.9's two side-by-side forms come in at 1440, not 1024.** Below 1440 the remaining
  right-hand column is too narrow to hold either at the size §B.9 sets: the closing line
  broke to five short lines and the five-column stage axis lost its label row to
  collisions at 1024. §B.9 is drawn at 1440 and has no 1024 counterpart, so 1024 stacks
  the way 768 does.
- **§C.6's card slot goes beside the roster at 1440, not at 1024.** Below 1440 a 366px
  slot, the lane and a readable roster do not all fit, and §C.6's own 344px reservation
  is derived from that 366px width — narrowing the slot would break the arithmetic, not
  just the picture. Between 768 and 1439 the slot takes §C.6's other stated position,
  full width directly below the stations.

### Where COPY.md and DESIGN.md disagree, and which won

1. **The toggle's visible label.** COPY.md §1 gives a group label `Theme` and a control
   label `Dark` / `Light`. DESIGN.md §B.10a specifies a 44 × 44 glyph-only control whose
   state is carried by shape and whose action lives in the accessible name, and §B.8's
   header arithmetic (236 + 44 = 280 of 320) only works at 44px. **§B.10a won**: the
   control prints no word, and COPY.md's three strings are carried as the group's
   accessible name and the button's. If the labels are meant to print, the header
   arithmetic needs redoing.
2. **The download figure.** COPY.md §2.7 prints `1,000+ downloads`; the store listing's
   own rounding, stored in `src/data/products/pocket-manager.json`, is `1K+`; DESIGN.md
   §B.9's wireframe writes `1K+ installs`. **COPY.md won**, and the build asserts the
   rating and review count against the product entry so the two cannot drift silently.
3. **Date dashes.** DESIGN.md §D.5 says "hyphen, not en-dash"; COPY.md §6.2 and §7.2
   write en dashes. **COPY.md won** — the string is Copy's.
4. **The `Checked by` label in the desk button's spoken name.** COPY.md §10.2's example
   lowercases it mid-sentence ("Checked by security and privacy review"), so the build
   does too — except where the label starts with an initialism, because lowering the
   first letter of `QA on real devices` produces `qA`, which a screen reader spells out.

### The dark scheme

Every value in §B.2a, §F.4a and §G.1a is in `tokens.css` under a `[data-world][data-theme]`
block. Three things worth not relearning:

- **`data-theme` is always set explicitly**, never left absent, because Sahib's world
  inverts: his `[data-world="sahib"]` block holds the *dark* values and `[data-theme="light"]`
  carries the overrides (§F.4a). A missing attribute would give him his dark page in
  both positions.
- **`--ink` is the one alias that earns its keep.** In the light studio `--floor` is both
  the room's ground and the page's text; in dark it cannot be, and `--ink` is what lets
  every component keep one declaration. `--focus-outer` follows it — except inside the
  room, where `.room` re-points it at `--chalk`, because in the light scheme `--ink`
  resolves to the room's own ground and the outer half of the ring would be invisible.
- **The future stage node's stroke stays at `rgba(15,42,46,.45)` in light**, computing
  2.65 : 1. DESIGN.md §E.1a records that its dark twin reaches 3.76 and that raising the
  light alpha to `.60` would give 4.01, but §I item 5 leaves that as an open question for
  the Design Lead rather than a decision, so the approved value ships. It has never been
  the sole carrier of that state.

`qa:contrast` now parses `tokens.css` per selector, layers `:root` → world → theme the
way the cascade does, resolves `var()` inside the resulting scope, and checks **56 pairs
across all six palettes**. Four tokens are alpha composites that DESIGN.md publishes as a
rounded hex while quoting the ratio from the unrounded one; those four pairs get a 0.05
tolerance and everything else stays at 0.011, which is still far tighter than a mistyped
hex.

### Deferred, deliberately — the step-1 list, updated

Closed this step: **the hero's secondary button** (the floor exists, so
`Look around the floor` hands the visitor to `#studio-floor`) and **the footer's
"Elsewhere" group** (the `people` collection now carries the four profile URLs).

Still open, and why:

1. **Font subsetting and the `wdth` range restriction.** Step 8. `public/fonts/` still
   carries the full unsubsetted binaries, 133,852 B.
2. **Fallback-metric matching for `font-display: swap`.** Not applied; measured CLS is
   still 0.
3. **The four nav links.** `/work/`, `/sahib/`, `/tanya/` and `/contact/` do not exist,
   so `Header.astro` filters `NAV` against `BUILT_ROUTES` and renders nothing — the
   `<nav>` element itself is omitted rather than shipped empty. The footer's nav repeat
   is filtered by the same set. Each link appears the step its route lands; adding the
   route to `BUILT_ROUTES` is the whole change.
4. **A favicon.** Still none, and still the only reason Lighthouse's best-practices score
   is 96 rather than 100. Design Lead's deliverable.
5. **OG image.** Still not emitted; the Satori pipeline renders the floor composition,
   which is step 3's.
6. **The work-strip's two row links.** §B.8 asks for one link per row to that person's
   page. Both the labels (`[COPY NEEDED: the strip's two link labels, ≤ 5 words each]`)
   and the two routes are missing, so no link renders and nothing stands in for one.
7. **§B.8's "The full pipeline" roster line.** The wireframe sets the seven roles as a
   readable sentence beneath the scene, with `The full pipeline` as its label. That label
   is not a string COPY.md contains, and at this step the roster *is* the readable list,
   so the line is not printed. It comes back with the scene in step 3, if Copy supplies
   the label.
8. **§C.6's gate-ownership sub-block on the two human cards.** Its field label is
   `[COPY NEEDED: ≤ 2 words]`, so the block does not render. The human cards carry
   COPY.md §2.3's role line and body, which already name what each person owns.

### Other decisions made this step

- **`linksToSkip` gains `^https://www\.linkedin\.com/`.** LinkedIn answers an automated
  request with a signup wall or a 429 and never with the profile — `FACTS.md` rows 37, 38
  and 42a record exactly that. A 429 from a host that blocks every bot is not evidence of
  a broken link. Nothing else is skipped.
- **`agents.checkedBy` is a string, not a collection reference.** Two of the seven labels
  are not one of §2.6's four gates: `Product spec review` and `Ship approval`. An
  optional `checkedByGate` reference sits beside it for the five that are, and
  `src/lib/floor.ts` asserts at build time that the gate's name and the agent's label are
  the same string. Design review joined that list in round 8 — it has an owner and its
  own label now, so it is a sixth gate rather than architecture review borrowed.
- **`people.headshot`, `headshotAlt` and `workHistory[].role` are optional.** The images
  do not exist (item 23) and COPY.md §6.2 card 5 has no role line. Three fields on
  `workHistory` are new and optional — `ownershipLine`, `attributedAccount`,
  `projectLine` — so §7.2's three extra lines are stored rather than dropped, even though
  the compressed strip renders none of them.
- **`check-floor-budget` counts inline module scripts.** Astro inlines a script this
  small rather than emitting a file and hoists it out of the section, so counting only
  `<script src>` measured the floor's script at zero. It counts both forms now, which
  over-counts slightly (the toggle's script is in there too) and is the safe direction.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| JS shipped, home page | **700 B gzip** (1,686 B raw, two inline modules: the floor's and the toggle's) — the 4 KB line holds with room to spare |
| CSS shipped, home page | 36,715 B raw / **7,829 B gzip** (19% of the 40 KB line) |
| Home HTML | 6,531 B gzip |
| Fonts | 133,852 B (unsubsetted; ~71 KB after step 8) |
| Home page total | **148,212 B gzip** (12% of the 1.2 MB line) |
| Floor section + its script | 10,120 B raw / **2,069 B gzip** (2.5% of the 80 KB line) |
| Lighthouse mobile, 3 runs, light | Performance **100**, Accessibility **100**, Best practices **96**, SEO **100** |
| Lighthouse mobile, 3 runs, dark | Performance **100**, Accessibility **100**, Best practices **96**, SEO **100** |
| LCP | 1,383–1,392 ms light, 1,390–1,395 ms dark (line is 2,000) |
| CLS | **0** in both schemes (line is 0.05) |
| TBT | **0 ms** in both schemes |
| Contrast pairs checked | **56**, across six palettes, all at or above their thresholds and all matching DESIGN.md's published figures |

The dark Lighthouse runs were taken against a scratch copy of `dist/` whose head script
was patched to force `data-theme="dark"`, because neither LHCI nor a Chrome flag can
seed `localStorage` or `prefers-color-scheme` for a static run. Nothing shipped was
changed to produce them.

Screenshots at 360, 768, 1024 and 1440 in both schemes, plus both mid-scroll states and
one focused-station state, are in `docs/reviews/step2/engineer/`. Every one was opened
and looked at; the focus ring on the room, the toggle's glyph geometry, its alignment to
the content edge, and the 1024 split-layout collisions were all found that way and fixed.

---

## Build step 3 — the Astro 7 upgrade (QUESTIONS.md item 67, 2026-09-05)

Owner signed off on item 67, so the 5 → 6 → 7 move landed as its own commit before the
scene. Read Astro's own upgrade guides for both majors rather than assuming.

### Versions

| Package | Was | Now |
|---|---|---|
| `astro` | 5.18.2 | **7.3.1** |
| `@astrojs/sitemap` | 3.7.4 | 3.7.4 (already current; works unchanged on 7) |
| `@astrojs/check` | 0.9.10 | 0.9.10 (already current) |
| `tailwindcss` / `@tailwindcss/vite` | 4.3.3 | 4.3.3 (already current) |
| `typescript` | 5.9.3 | **6.0.3** |

**TypeScript is held at 6, not 7.** TS 7.0.2 is out, but `@astrojs/check@0.9.10` declares
`typescript: "^5.0.0 || ^6.0.0"` and there is no newer `@astrojs/check`. Installing TS 7
fails `npm install` outright on the peer range; `--force` would only move the breakage to
`astro check`. 6.0.3 is the newest version that satisfies the gate this repo actually runs.

### The breaking changes that touched this repo

Most of both guides is about things this build does not have — no SSR adapter, no
islands, no view transitions, no `@astrojs/db`, no markdown content, no i18n, no
sessions, no actions. Four changes were real:

1. **`import { z } from 'astro:content'` is deprecated in 7** and goes in 8 (`astro check`
   printed 40 `ts(6385)` warnings for it). `src/content.config.ts` now imports `z` from
   `astro/zod`, which is the same instance — that identity is what keeps the `image()`
   and `reference()` schemas assignable.
2. **Zod 4 moved the string-format validators to the top level** (Astro 6 shipped Zod 4).
   `z.string().url()` → `z.url()`, `z.string().email()` → `z.email()`, six call sites.
3. **Rolldown (Vite 8) does not constant-fold a property read off an object literal.**
   This was the only silent regression, and it cost real bytes: `Analytics.astro` read
   the seven `PUBLIC_FIREBASE_*` values into a `config` object and then branched on
   `config.apiKey && …`. Under Rollup that guard folded away on a build with no `.env`
   and no chunk was emitted (build step 1's "0 B JS" line). Under Rolldown the branch
   stayed live and the build shipped the whole Firebase SDK — **41,930 B raw / 13,496 B
   gzip of analytics nobody configured**, plus a 937 B bootstrap. The four required
   values are now read straight into the `if`, so the condition is a literal
   `undefined && …` again; the object is built inside the branch. Measured back to
   **0 B** of external JS. Nothing about this was reported as a warning — it was found
   by reading `measure-bundles.mjs`'s output against step 2's table.
4. **`compressHTML` defaults to `'jsx'` in 7**, which strips whitespace between adjacent
   inline elements by JSX rules rather than HTML rules. Checked rather than assumed:
   scanned every text run in the built `dist/index.html` for glued words; the eleven hits
   are all `TheGeekDogs`, `iOS`, `KMP` and `GitHub`, i.e. real capitals inside real
   strings. No space was lost, so the default is left alone.

Astro 7's stricter Rust compiler (closing tags required, no auto-corrected nesting) found
nothing — the build is clean and `astro check` reports **0 errors, 0 warnings, 0 hints**
across 19 files. The narrow `EMPTY_BUNDLE` `onwarn` filter in `astro.config.mjs` no longer
fires under Rolldown; it is left in place as a guard rather than removed, since it is
scoped to one module and silences nothing today.

### `npm audit` after the upgrade

**All eight Astro advisories are gone.** Seven high advisories remain, and every one of
them is inside `@lhci/cli`'s dependency tree — `tmp`, `extract-zip`, and the
`puppeteer-core` / `@puppeteer/browsers` / `lighthouse` chain it pulls in.

- `@lhci/cli@0.15.1` is the newest release (0.15.1, June 2025); there is no fixed version
  to move to.
- `npm audit fix --force` proposes `@lhci/cli@0.1.0`, a fifteen-major-version downgrade
  that would delete the Lighthouse gate rather than fix it. Not taken.
- All seven are `devDependencies` of a measurement tool. Nothing in the tree reaches
  `dist/`; the shipped site has one production dependency graph (`astro`,
  `@astrojs/sitemap`, `firebase`) and it is clean.

So: **zero high advisories against anything that ships, seven against the Lighthouse CI
toolchain with no upstream fix available.** Recorded rather than suppressed.

---

## Build step 3 — the isometric scene, the favicon set (2026-09-05)

Scope per brief §14 step 3 and DESIGN.md §C: the studio floor drawn as an inline SVG
under the step-2 roster, plus §B.12's four icon files. The Astro 7 upgrade above landed
first, as its own commit, before anything here.

### What the scene is made of

`src/components/floor/plan.ts` holds the geometry and computes it; the component holds
the drawing. Nothing about a station's position is typed twice.

- **Projection.** 2:1 isometry, 128 x 64 modules, `wpt(c, r) = (320 + 64(c - r), 32(c + r))`.
  §C.3's own arithmetic is the check and it lands exactly: the 6 x 5 plan projects to
  704 x 352, the near corner (row 5) is the bottom of the screen, and F5 — the empty
  chair — is the closest cell to the camera.
- **Symbols.** `#fl-mod` (floor module), `#fl-dk`, `#fl-mon`, `#fl-ch` (the shared desk,
  monitor and chair sub-parts), `#fl-agent` (one symbol, seven `<use>`s, translate only),
  `#fl-seat`, and the two bespoke cabins, which `<use>` the same three sub-parts rather
  than redraw them. Every symbol's `viewBox` is its own bounding box and every `<use>`
  repeats those four numbers as x/y/width/height, so the desktop plan renders at exactly
  1:1 and the portrait plan is one uniform 0.6 off it. **Bespoke segment count: Sahib 15,
  Tanya 13**, against §C.4's budget of 16.
- **Three `<svg>` roots, not one.** `viewBox` is an attribute, not a CSS property, so the
  two plans cannot be one element. The `<defs>` therefore live in their own zero-sized
  svg, and whichever scene is `display: none`, the symbols still resolve.
- **Four fills, one gradient.** `--fl-ground` (`--tgd-room`), `--fl-lit`
  (`rgba(232,237,233,.22)`), `--fl-shadow` (`#0A1E21`, `#051113` in dark) and `--fl-glow`
  (`--chalk`). The desk reads in three tones out of those four: lit top, ground-value
  left face, shadow right face. No `<filter>`, no raster, no outlined text.
- **Both schemes** resolve from the tokens; the only absolute value is the shadow fill,
  which takes §C.1's second hex under `[data-theme='dark']`.

### The interaction layer

The ten buttons are the step-2 buttons: same DOM, same order, same accessible names,
same `hidden`-attribute card slot. Only their CSS changed. `--x` / `--y` is one pair per
station per plan, set inline as `--xw/--yw` and `--xt/--yt`, and one rule picks the pair
for the breakpoint. Footprints are three `[data-kind]` rules, not ten.

**Measured, in the browser, on the built page — target sizes and pairwise overlap:**

| Viewport | Scene | Smallest target | Overlapping pairs |
|---|---|---|---|
| 360 | 320 x 520 | **64** (agent desks are 101.3 x 64) | none |
| 390 | 320 x 520 | 64 | none |
| 768 | 320 x 520 | 64 | none |
| 1024 | 700 x 495 | 49.5 | none |
| 1440 | 654 x 462 | 46.2 | none |
| 1920 | 792 x 560 | 56 | none |

### Four places the drawing had to argue with the spec, and the arithmetic

1. **The portrait plan runs below 1024, not below 768.** The floor sits inside the
   contact plate's keep-out lane, which leaves 460 of 704px at 768. The 6 x 5 plan
   scaled into 460px gives 65 x 33 agent buttons and 33 is under the 44 x 44 floor. The
   portrait plan at its own 320px width gives 101 x 64 there instead. The plan swap moved
   up a breakpoint rather than the targets coming down.
2. **Cabin buttons are 128 x 136, not §C.3's "= 232 x 148".** Two 2 x 2 cabins one module
   apart project to centres 128 apart in x and 64 apart in y, so *any* pair of rectangles
   wider than 128 and taller than 64 overlaps and the nearer button steals the farther
   cabin's clicks. 128 x 136 is the largest pair that cannot. Both dimensions are still
   far past 44, and the same arithmetic clears the Security Auditor's desk below.
3. **Buttons are centred on the artwork, not on the module.** A desk is 104 units tall
   and its button is §C.3's 56, so where those 56 land decides whether a pointer on the
   monitor hits the desk it is over. Centred on the module, the whole monitor was outside
   its own target.
4. **An agent's nameplate sits on the near half of its own module**, not floating above
   the desk as §C.4 has it. On the checkerboard a desk and the desk behind-left of it
   share a screen x and are 64 apart in y, so a plate above the desk lands squarely on
   the desk behind: the first render had "Reviewer" inside the Programmer's own button.
   Below the desk it is inside its own hit target and nearer its own desk than any other.
   Found by screenshot, not by reasoning. **All four are the Design Lead's to accept or
   overrule.**

### Motion

**No library. Motion One was not used and is not installed for this.** "Lights on" is
nine staggered `opacity` animations and one more for the lamp; CSS `animation-delay`
expresses the stagger and the 400ms hold exactly, and a WAAPI call per element would have
cost 2.3 KB to do the same thing less declaratively. The scratch note above kept Motion
One in reserve for "a staggered sequence CSS handles worse" — this is not that sequence.

- **Idle loop:** `@keyframes` on the glow rects' `opacity` only, `--loop-floor` (4800ms),
  `--ease-idle`, `animation-delay: calc(var(--d) * -533ms)`, inside
  `@media (prefers-reduced-motion: no-preference)`. The unconditional CSS is
  `opacity: var(--g)` — §C.9's still frame, nine different static values set inline.
- **"Lights on"** fades a `<g>` *wrapper* around each glow rect from 0 to 1 rather than
  the rect itself, so the loop runs underneath the whole time and the room does not jump
  when the moment ends. The JS decides only whether and when: it arms at module-execution
  time (before the section can paint, so the room is never seen lit and then switched
  off) and fires in a `requestAnimationFrame` after `load`, which is provably after first
  paint. It cancels on the first `pointerdown` or `focusin`, and it is skipped entirely
  when `matchMedia('(prefers-reduced-motion: no-preference)')` does not match.
- **Measured against §H.3, sampled every 200ms in the browser:** nine glows up in DOM
  order at 70ms stagger, last complete at ~1200ms; 1200-1600ms nothing happens; the lamp
  cone alone from 1600 to 2500ms; idle loop running underneath at nine distinct phases
  throughout. The chair never animates and its cone is static once up.

### Two things the drawing does not do

- **§C.4's "6% warm offset toward `--lamp`" on the cabin floor patch and desk top is not
  implemented.** It is a fifth fill value, and §C.1's "four fills in the whole scene" is
  the harder line. §C.4 says the offset sits below the threshold at which it reads as a
  colour, so nothing legible is lost. Design Lead's call.
- **§B.8's "The full pipeline" roster line is still not printed** — its label is still not
  a string COPY.md contains. The seven roles are now readable on the floor as real SVG
  `<text>` nameplates, and every station's spoken name is on its button, so nothing is
  only visual and nothing is only spoken.

### Favicon (§B.12)

`public/favicon.svg` is the source of truth; `npm run icons` exports `favicon-32.png`,
`apple-touch-icon.png` (180, full-bleed, opaque, no pre-applied radius) and
`icon-512.png` from it with sharp, which Astro already depends on. `site.webmanifest`
carries the name and the one 512 icon and nothing else. No `.ico`, no 16px PNG, no
maskable variant, no `prefers-color-scheme` block inside the SVG — all four are §B.12's
own rulings. **This closes deferred item 4 and, with it, the `/favicon.ico` 404 that had
been holding Lighthouse best practices at 96 since step 1.**

Note for whoever edits the SVG: the file's own commentary is in `<title>`/`<desc>`, not in
an XML comment, because a comment containing a token name (`--lamp`) is a double hyphen
and libvips refuses to parse the file at all.

### Deferred, deliberately — the step-2 list, updated

Closed this step: **the favicon**, and **the OG image's blocker** is now half-gone (the
floor composition exists and its `<symbol>` defs are reusable), though the image itself is
still step 7.

Still open: font subsetting (step 8); fallback-metric matching (CLS is still 0); the four
nav links (their routes do not exist); the OG image; the work strip's two row links; §B.8's
"The full pipeline" label; §C.6's gate-ownership sub-block on the two human cards.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| JS shipped, home page | **891 B gzip** (2,243 B raw, two inline modules, no external chunk) — the 4 KB line holds |
| CSS shipped, home page | 39,235 B raw / **8,499 B gzip** (21% of the 40 KB line) |
| Home HTML | 9,876 B gzip |
| **Floor section + its script** | 32,574 B raw / **5,125 B gzip — 6.3% of the 80 KB line** |
| Home page total | **152,227 B gzip** (12% of the 1.2 MB line) |
| Lighthouse mobile, 3 runs, light | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| Lighthouse mobile, 3 runs, dark | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| LCP | 1,418-1,459 ms light, 1,405-1,415 ms dark (line is 2,000); LCP element is the `<h1>` |
| CLS | **0** in both schemes | 
| TBT | **0 ms** in both schemes |
| Smallest hit target at 360 | **64 px** (agent desks, 101.3 x 64) |

Screenshots at 360, 768 and 1440 in both schemes, the same six under `reduce`, the card
slot and the two-tone focus ring after keyboard activation of a station at 360 and 1440,
and one frame of "Lights on" mid-sequence are in `docs/reviews/step3/engineer/`. Every one
was opened and looked at; the nameplate collisions, the misaligned hit targets, the
`<use>` href prefix bug, the focus ring cutting through the portrait nameplates and the
undersized scene container were all found that way and fixed.

---

## Build run A — the step 2 items, the rulings, and steps 4, 5 and 7 (2026-09-05)

Scope: the thirteen step-2 rendered-review defects, the two rulings, the Perf & A11y
aria-live ruling, the copy re-transcription, and brief §14 steps 4, 5 and 7 — `/work/`,
both case studies, `/contact/`, the full nav, the OG cards and the structured data.
Person pages are run B.

### The thirteen items, and how each was closed

| # | Fix |
|---|---|
| 1 | The keep-out lane is gone. No section carries a `padding-right`; every section keeps the full 1200 content width and §B.5's one grid at every breakpoint. §B.9's split proof band, the anchored closing line and §C.6's cols 9–12 slot all come back at **1024**, as §B.5 and §C.6 say they always did. |
| 2 | One 260 × 56 plate at every breakpoint, inset 16px from the bottom and right of the viewport. The `< 768` full-bleed bar is withdrawn. At 360 that is 276 of 360, with 84px of clear space to its left. |
| 3 | The four gate bodies are COPY.md §2.6 verbatim, with their owners' names in them, and §2.6's line under the four is one line again. |
| 4 | The card slot has no container. No border, no fill, no radius. |
| 5 | Already closed by step 3 — the roster's ten hairlines went with the semantic list when the scene replaced it. Verified against the built CSS: the only `--rule-on-room` marks left are the card's own internal rule and the footer's, both of which separate two things. |
| 6, 10 | Resolve with item 1. The closing line has its full cols 9–12 from 1024 up, and the header's toggle and every section head share one right edge again. Item 10 needed one more fix of its own: the nav and the toggle both carried `margin-inline-start: auto` at ≥ 768, which splits the free space between them and left the nav floating mid-header. The nav takes it now and the toggle sits 24px after `Contact`. |
| 7 | The compact track runs on §B.10's **100px pitch** with the node centres on the column start lines — x 732 / 832 / 932 / 1032 / 1132 in the band at 1440, the last ring closing at 1141 and 23px clear of the plate. The product label moves above its runner there (§B.10), so the axis takes col 7's left edge rather than being indented behind a label column. `Submitted for review` sets in two lines. |
| 8 | The strip prints years only, and the build throws if a month survives into it. `Jan 2024 – now` → `2024 – now`. COPY.md §7.2's month-level strings are untouched. |
| 9 | The footer takes the room's ground and follows the final CTA with no seam, so the page is bookended by the floor as §B.9 says. §B.9's rule sits above it. |
| 11 | The final CTA prints COPY.md §2.10's `Email thegeekdogs@gmail.com`, still as lamp text on `--floor` with a 2px rule. |
| 12 | The toggle's focus ring is the §B.2 construction — the global outline, 3px offset, the `--lamp` ring outside the target rather than inset. |
| 13 | The gate numeral is a two-digit column plus one gutter from its title at ≥ 1024, not a full column plus a gutter. §2.6's line under the four is set on the gate bodies' own left edge. |
| 14 | Ruled by Perf & A11y, implemented as ruled: the slot is **not** a live region. Focus and hover write to it silently; only activation announces, through a region that is in the DOM from first paint. |

Item 15 is the Design Lead's own carry-forward and needs the scene, which now exists.

### The step-3 floor review's blocker 1, fixed here because it was mine

`docs/reviews/step3-floor-review.md` landed while this run was in progress. Its blockers
2 and 3 and its items 4 and 5 are items 2, 1, 4 and 1 above and are closed by this run.
Two more were fixed because they are in files this run already had open:

- **Blocker 1, the whole floor dead to pointer and touch at every breakpoint.** The cause
  was `pointer-events: none` on the sticky-plate wrapper, inherited by every section
  inside it. PLAN.md §3 asked for that against a `position: fixed` plate whose own box
  could sit over the floor; the plate is `position: sticky` **in normal flow** and the
  wrapper is the sections' own parent, not an overlay, so there was no invisible box to
  make transparent and making one swallowed every click on the page. Both declarations
  are gone. Re-measured with a real hit test rather than by eye: at 360, 768, 1024 and
  1440, `elementFromPoint` at the centre of all ten stations returns that station —
  **10 of 10, four widths** — and a real mouse click on the third station opens Spec
  Writer's card at every one of them.
- **Item 7 / deviation 4, the portrait nameplates.** Every plate now sits inside its own
  station's target, six units inside its own bottom edge, instead of ten units above its
  row — which on a 3-up orthogonal grid is inside the row above, and which put nine of
  the ten plates in another station's button. Measured: **10 plates, 0 misplaced at 360**.
  `Tanya Jain` and `Designer` are a full desk row apart and no longer read as one label.

Not fixed here, and left with the floor's owner: the wide plan's cabin and chair plates
sit outside every button (they are on the wall face and under the chair, per §C.4) —
they collide with nothing, but the review's deviation-2 correction asks for the cabin
plate to be moved; and items 8 and 9, which are the drawing.

### What the plate's own box was doing

The plate is in flow at the end of its wrapper, which is what makes "retires when the
real CTA arrives" geometric rather than a scroll listener. Its box is now pulled back
over the last section's +56px reserve (`margin-block-start: -56px`) rather than adding
56px of its own. The reserve **is** the reservation (§B.10); the extra 56px showed as a
strip of bare `--sheet` between a `--band` block and the footer on `/contact/`.

### Routes

`/work/` — §3.1's headline and the 17-word short intro (§3.1 says outright it is the one
that prints if only one can, and §B.11 caps the slot at 20 words), then two `--band`
blocks, each with the product name, its one line, the full labelled §E.2 track and its
links. The long body is not placed.

`/work/pocket-manager/` and `/work/wedding-planner/` — one shell used twice, per item
9a. Problem, Build, Review process, Outcome on one; the differentiator, what's in it and
why it isn't out yet on the other. The full track sits directly under each h1 (§B.11).
No privacy section (item 14), no email capture (items 11 and 69), no store link where
there is nothing to link to, no product name where a human has not picked one.

`/contact/` — §8's three routes as a 3-up at 1024, stacked below, all three addresses
printed in full as `mailto:` links over the visible address. No form.

Nav carries Work and Contact. `/sahib/` and `/tanya/` are still out of `BUILT_ROUTES`,
and so are the work strip's two row links, which point at them; both land in run B.

### Deliberate omissions on these routes, and why

1. **COPY.md §2.8's five "meaning lines" print nowhere.** DESIGN.md §E.2 draws labels
   only and gives them no slot on `/work/` or on a product page. Inventing one would be
   inventing a layout; the strings are Copy's and the slot is the Design Lead's.
2. **COPY.md §4.1's store listing name is on the entry but not on the page.** §4.1 gives
   it "where the full listing title is quoted", and nothing on the page quotes it; a bare
   quoted string with no sentence around it reads as orphaned text. It is used as the
   application's `alternateName` in the structured data instead.
3. **No closing CTA on `/work/*` or `/contact/`.** §B.10 says the studio pages close with
   the studio's address, and the plate is that address on every one of them. COPY.md
   writes no closing CTA for these routes and none is invented.
4. **`/404` gets no OG card.** COPY.md §9 gives it no OG fields and the page is
   `noindex`, so there is no string to put on one and nowhere it would be shown.

### The OG cards

Satori → `@resvg/resvg-js`, in a prerendered endpoint, one card per route, 1200 × 630,
light only (§B.2a). The home card shows the real floor: the scene's `<defs>` moved to
`src/components/floor/symbols.ts` and are imported by both the page and the card, and
both take their placements from `plan.ts`, so a change to a symbol or to where a station
stands reaches both. The scene is rasterised to PNG by resvg before satori sees it,
because resvg renders raster `<image>` payloads reliably and nested SVG ones less so.

**Fonts.** Satori reads woff/ttf/otf and cannot apply a variation axis, so the cards load
`@fontsource`'s **static** 600 and 400 cuts of the same two faces rather than rendering
Anek at its variable default weight and calling it the display face. Both are build-time
devDependencies; nothing new reaches the browser. Recorded because it is a second copy of
two fonts in the repo, and the reason it is not the same file the site ships is `woff2`.

### The structured data

`Organization` + a `Person` per founder on `/` and `/contact/`; a `SoftwareApplication`
per app on `/work/` and one on each case study, with the `aggregateRating` (4.3 from 24)
on Pocket Manager alone. `sameAs` is computed from `socials`, per PLAN.md §2's own note.

**Validated with `schema-dts`, offline** — schema.org's vocabulary as TypeScript types,
so `astro check` is the validator and a misspelled property or a wrongly-typed value
fails the build. That is a structural check and not a Rich Results check; **no network
validator was run**, and no Google Rich Results test was performed.

Fields omitted rather than guessed: `applicationCategory` and `operatingSystem` on the
wedding planner (it has not been submitted anywhere, and the Pocket Manager values come
from the Play listing's own title and platform); `Person.url` (their pages land in run
B); `addressCountry`; any `offers`, since no price is stated anywhere on this site.

### Deferred, deliberately — the step-3 list, updated

Closed this run: the OG image, the four nav links (two of them; two wait on run B), and
§B.8's "The full pipeline" line, whose label COPY.md §2.4 now carries.

Still open:

1. **Font subsetting and the `wdth` range restriction.** Step 8. `public/fonts/` still
   carries the full unsubsetted binaries, 133,852 B.
2. **Fallback-metric matching for `font-display: swap`.** Now load-bearing rather than
   theoretical: `/contact/` measures a repeatable **CLS 0.030** in both schemes — the one
   route with a non-zero figure — and it is the swap moving the `--band` block under a
   five-line body paragraph. It clears the 0.05 line with room, and the fix is
   `ascent-override` / `size-adjust`, which is step 8's.
3. **The work strip's two row links**, and the `/sahib/` and `/tanya/` nav entries. Run B.
4. **§C.6's `Owns` block is live**, but §C.4's cabin plate placement in the wide plan is
   the floor review's to rule on.

### Flagged for the Design Lead

**On `/work/` between 768 and 1023 the two full stage tracks reach into the plate's right
band.** §B.10's composition rule is stated as a test — a mark fails if it is inside the
276px right band **and** within 72px of the bottom of its own section — and by that test
both tracks pass with room, because they sit far above their section's bottom edge. But
the plate does cross them mid-scroll at that width, and the track is the same kind of
mark the rule was written for. At 1024 and 1440 they are clear (the track ends at x 716
against a band starting at 748, and at 788 against 1164). Either the rule is right as
written and this is fine, or the track needs a narrower cap between 768 and 1023.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| JS shipped, home page, no analytics config | **0 B** external; 1,242 B gzip of inline module script (3,278 B raw, the floor's and the toggle's) |
| CSS shipped, all routes | 48,824 B raw / **9,697 B gzip** (24% of the 40 KB line) |
| Home HTML | 11,358 B gzip |
| Fonts | 133,852 B (unsubsetted; ~71 KB after step 8) |
| **Home page total** | **154,907 B gzip** (13% of the 1.2 MB line) |
| Floor section + its script | 32,655 B raw / **5,658 B gzip** (6.9% of the 80 KB line) |
| Lighthouse mobile, 3 runs, **light**, all five routes | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| Lighthouse mobile, 3 runs, **dark**, all five routes | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| LCP | 1,402–1,476 ms across the five routes, both schemes (line is 2,000) |
| CLS | **0** on four routes; **0.030** on `/contact/`, both schemes (line is 0.05) |
| TBT | **0 ms** on every route in both schemes |
| Contrast pairs checked | **56**, unchanged, all passing |
| Floor stations hit-tested by pointer | **10 of 10** at 360, 768, 1024 and 1440 |
| Portrait nameplates inside their own station | **10 of 10** at 360 |

The first screenshot on each case study is `loading="eager"` with `fetchpriority="high"`;
every other one is lazy. PLAN.md §1.6 reserves exactly that for "if an actual image ever
becomes the LCP candidate", and measured, it does: §B.11 puts up to two screenshots above
the fold, and lazy the first one's load did not start until 1.4s in and LCP came out at
**2,488 ms** against the 2,000 line. Eager it is 1,474 ms.

The dark runs were taken against a scratch copy of `dist/` whose head script default was
flipped to `dark`, the same method step 2 used, because neither LHCI nor a Chrome flag can
seed `localStorage` or `prefers-color-scheme` for a static run. Nothing shipped was
changed to produce them.

**Keyless build.** No `.env` and no `PUBLIC_FIREBASE_*` in the environment: the build
succeeds and ships **0 B** of analytics — no external JS file at all, and the only
occurrence of the string "firebase" anywhere in `dist/` is COPY.md §4.3's own sentence on
the Pocket Manager page.

Screenshots of all four new routes at 360, 768 and 1440 in both schemes, plus `/` and
`/404` at 360 and 1440 in both, are in `docs/reviews/runA/engineer/`. Every one was opened
and looked at; the header's floating nav, the stray `--sheet` strip above the footer on
`/contact/`, the two product pages' vertical rhythm, the unmarked feature list and the
portrait nameplates were all found that way and fixed.

### Other decisions made this run

- **The five shipped screenshots were COPIED into `src/assets/`, not moved.** The two
  `docs/assets/*/README.md` files are another role's record of what was captured and they
  index those paths by name; moving the files would have falsified two documents this
  Engineer does not own. `docs/assets/` stays the archive, `src/assets/` is what the
  image pipeline reads.
- **`02` and `05` of the wedding planner never ship** and `03` and `04` wait on
  QUESTIONS.md item 73, which is still unanswered. `alt` is a required field on the
  screenshot schema, so an image whose line is not written cannot be added by accident.
- **`descriptiveName` is capped at 18 characters in the schema**, which is §E.3's own
  limit for the compact view's row label, and `indexName` carries the longer descriptive
  form `/work/` prints. The two used to be one field.
- **`scripts/screenshots.mjs`** serves the built `dist/` and drives Playwright over a
  list of routes, widths and both schemes. Written for this run's evidence and left in
  the repo because run B needs the same thing.
- **`satori`, `@resvg/resvg-js`, `schema-dts` and the two static font packages are
  devDependencies, not dependencies.** All five run at build time and none of them
  reaches `dist/`. It is not a tidiness point: `satori` pulls `fflate` 0.7.x, which
  carries a moderate advisory (GHSA-px8p-9vwx-vf98, an infinite loop on a malformed
  ZIP64 archive — nothing this build ever parses), and with it in `dependencies`
  `npm audit --omit=dev` went from 0 to 2. It is back to **0 vulnerabilities against
  everything that ships**, which is the number the deploy gate reads. `npm ci` installs
  devDependencies, so the build is unaffected.

---

## Floor pass 2 — the step-3 floor review's remaining items (2026-09-05)

Scope: bring the studio floor to DESIGN.md §C as corrected in round 8, and close the
step-3 floor review's seventeen items. Blockers 1, 2 and 3 and items 4, 5 and 11 were
already closed by run A; the fourteen below are this pass.

### The regression this pass found before it found anything else

**The whole scene was rendering as one flat black silhouette, at every width, in both
schemes.** Run A moved the `<defs>` out of the component into `src/components/floor/
symbols.ts` so the OG card could reuse them — which makes them a string injected with
`set:html`, and **Astro cannot put its scope attribute on markup it did not compile**.
`.fl-lit[data-astro-cid-…]` matched nothing inside a `<symbol>`, `fill` fell back to its
initial `black`, and the room, the desks, the monitors, the walls, the seams and the
lamp's gradient stops all went with it. Nothing in `astro check`, `npm run qa` or the
target-size numbers moved: it is a rendering fault that only a rendered picture shows,
which is exactly the argument §C.11 makes about hit testing, one layer up.

The scene's fill rules are `:global` now. They are all prefixed `fl-`, they exist nowhere
else on the site, and they belong to the drawing rather than to the component's box.

Two things follow from it that are worth recording. **Item 12 was this bug**: §C.8's lift
of a selected desk top to `--chalk` @ 34% was always declared and was invisible because
`.fl-top` never matched; measured now, `--fl-desk-top` goes `#e8ede938` → `#e8ede957` on
selection and the desk is visibly lighter than its neighbours. And **item 16 was not a
duration**: the declaration always said 900ms, and `--ease-out` is
`cubic-bezier(.16, 1, .3, 1)`, which is at 90% of its travel inside 330ms — which is why
the review measured a 620ms rise. The lamp takes `--ease-inout`, §H.1's symmetric curve;
re-instrumented per frame, the cone starts at 1,666ms and completes at 2,516ms.

### The seventeen items, and how each was closed

| # | Fix |
|---|---|
| 1 | Run A. Re-verified here by `scripts/check-floor-pointer.mjs`: **10 of 10 stations, at 360, 390, 768, 1024, 1440 and 1920, in both schemes**. |
| 2 | Run A. One 260 × 56 plate, inset 16, at every width. |
| 3 | Run A. `padding-right` occurs **0 times** in the built CSS. |
| 4 | Run A. The slot has no border, outline, fill or radius. |
| 5 | Run A, and measured again: at 1024 the slot is **293 × 392 at x 683**, beside a **683 × 415** scene at x 0. |
| 6 | §C.3's box is **856 × 520** and the room draws 1:1 in it. The old 792 × 560 is withdrawn. Measured: **856 × 520 at 1920 (x 320) and at 1440 (x 80)**, **683 × 415 at 1024**, **704 × 428 at 768**, **320 × 520 below 768**. It was 654 × 462 at 1440 and 700 × 495 at 1024 — smaller at the larger width. |
| 7 | Run A moved the portrait plates inside their own targets; this pass makes §C.7's rule structural. Every plate is centred in its button's **top 20-unit band**, the grid is §C.7's own 88 / 8 / 88 / 12 / 68 / 8 / 68 / 8 / 68 / 12 / 92 = 520, and the ten cells are pairwise disjoint. Checked on the rendered page at every width, not only at 360. |
| 8 | `#fl-occ` — a shared `<symbol>`, a shadow-fill torso and a lit head, `<use>`d in both cabins, so neither cabin spends any of §C.4's 16-segment budget on it. Each cabin's chair is turned rather than square, which is §C.4's own "pulled out at a slight angle". |
| 9 | `#fl-seat` draws its own chair — a shadow-fill back standing out of a lit seat, pulled clear of a desk moved back 14 units. And §C.1's one gradient paints three marks instead of one: the pool the lamp throws on the floor module, the wash on the desk top, and the cone in the air. See the open item below. |
| 10 | Already live from run A: both human cards carry `Owns` and their gate list, from `ownsLine` on each person's entry. |
| 11 | Already live from run A: `The full pipeline` and the wrapped sentence, derived from the same collection the desks are. |
| 12 | The fills regression above. |
| 13 | No plate renders below 13 CSS px. The size is in scene units per breakpoint, per §C.3 — 13 at 1:1, 16.3 at 1024, 15.8 at 768 — and the cabin plate takes the step above at 15px rendered, the same ratio at every one. The portrait agent plates were 11. |
| 14 | The wall-mounted skewed cabin plate is gone — §J's pre-committed cut for `/`. Both cabin plates are horizontal on the near half of their own cabin floor, at §C.3's coordinates: **(396, 204)** and **(268, 268)**. One treatment, one baseline, at every width. |
| 15 | An agent's plate sits on its module's midline with a central baseline, which puts its box below the desk's artwork and 8 units clear of the next button's leading edge — §C.3's own number. |
| 16 | The easing, above. |
| 17 | The seam grid is cut. It ran the full 6 × 5 room on every side, so the room's footprint read larger than anything standing in it and the chair's isolation was drawn by ruled lines rather than by emptiness. §C.10 has seams first in its cut order and §J now gives them a second reason. The slab keeps its own 1px edge, which is the room. |

### The two acceptance scripts

`scripts/check-floor-pointer.mjs`, wired into `npm run qa:floor` and into CI:

- **§C.11.** For each of the ten stations, at 360, 390, 768, 1024, 1440 and 1920 in both
  schemes: `document.elementFromPoint` at the button's centre returns that station's own
  button, the button measures at least 44 × 44, and a real click at the same point puts
  that station's card **alone** in the slot and its selected state on the station in the
  room. **120 of 120 (10 × 6 widths × 2 schemes).**
- **§C.7.** No nameplate's box intersects another station's button box. §C.7 states it at
  360 and 390; it runs at all six widths, because the same failure had a wide-plan half
  (the skewed cabin plate inside Tanya's button at 1024, 1440 and 1920). **10 of 10 clear
  at every width in both schemes.**

Each station is scrolled to the middle of the viewport before it is hit-tested. That is
not the test made easy: §B.10's plate is `position: sticky` at the viewport's
bottom-right, so it is over *something* at every scroll offset, and §C.11's question is
whether a visitor looking at a station can hit it.

`scripts/lib/serve.mjs` is the static server the screenshot script and this one share.

### Two places this pass had to argue with the spec, and the arithmetic

1. **§C.3's "near half of its own module" and "inside its own button" cannot both hold
   for an agent plate.** A module is 64 deep, its near half is 32–64, and an
   artwork-centred 56-tall button (deviation 3, accepted) spans −16 to +40 — an
   8-unit intersection, which a 13-unit plate does not fit in. The plate is set on the
   module's **midline** with a central baseline, which is the largest overlap with the
   near half that stays inside the button, and it lands its box 8.2 units clear of the
   next button's leading edge — §C.3's own stated clearance. Measured: no plate is inside
   another station's button at any width, and at 1440 and 1920 nine of ten are wholly
   inside their own.
2. **§C.3's clearance note reads Security Auditor's button top as y 236.** That is the
   module centre, and §C.3's own accepted deviation 3 puts the button on the artwork
   centre, which is y 216. Sahib's plate box ends at 212, so it is 4 clear rather than
   §C.3's 24. It collides with nothing; recorded because the number in the table and the
   number in the prose disagree and the prose is the one that was accepted.

### Still open, with the reason

- **§C.3 mechanism 2: the lamp is not "the single largest area of accent colour on the
  entire site".** It is now ~8,600 scene units² over three marks against ~3,500 for the
  old lone wedge, it is the only `--lamp` in the scene, and it is by a wide margin the
  largest light in the room. It is still smaller than §B.10's contact plate, which is
  260 × 56 = 14,560 px² of solid `--lamp` on the same screen. Beating that would need a
  cone about 230 units tall in a room 352 deep. **Design Lead's call**: either mechanism
  2 means "in the scene", or the plate is what has to give.
- **§C.4's "6% warm offset toward `--lamp`" on the cabin floor patch and desk top** is
  still not implemented. It is a fifth fill value against §C.1's four. Carried from
  step 3, still the Design Lead's call.
- **Below 768 the contact plate still crosses the default card's middle lines** at some
  scroll offsets. That is §B.10's own ruling rather than a defect — one 260 × 56 plate at
  every width, 276 of 360 with 84px clear beside it, and "below 768 the rule does not
  bind" — but it is the same picture the step-3 review objected to at blocker 2, so it is
  flagged rather than assumed settled.
- **The three portrait scales are per station class, not one.** §C.7 gives three artwork
  bands (48, 68, 72) and each symbol's scale is its band over its own drawn box, so the
  band above every plate is genuinely empty. A single uniform scale cannot do that: the
  cabin symbol is 184 deep against a 68 band, so at any scale that suits the agent desks
  it runs a third of the way into the row below.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| **Floor section + its script** | 32,602 B raw / **6,149 B gzipped — 7.5% of the 80 KB line** |
| CSS shipped, all routes | 48,944 B raw / **9,804 B gzip** (24% of the 40 KB line) |
| Home HTML | 11,817 B gzip |
| JS shipped, home page | **0 B** external; 1,242 B gzip of inline module script |
| Home page total | **155,473 B gzip** (13% of the 1.2 MB line) |
| Smallest hit target at 360 and 390 | **101.3 × 68** — 68, 55% above the 44 × 44 floor |
| Smallest hit target at 768 | **92 × 46** |
| Smallest hit target at 1024 | **89 × 44.7** — the tightest point on the site, as §C.3 says it is |
| Smallest hit target at 1440 and 1920 | **112 × 56** |
| §C.11 pointer acceptance | **10 of 10 stations at 6 widths in 2 schemes** |
| §C.7 nameplate overlap | **0 collisions, 6 widths, 2 schemes** |
| Lighthouse mobile, 3 runs, `/`, light | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| Lighthouse mobile, 3 runs, `/`, dark | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| LCP | 1,428–1,436 ms light, 1,438–1,444 ms dark (line is 2,000); the LCP element is the `<h1>` |
| CLS | **0** in both schemes |
| TBT | **0 ms** in both schemes |
| "Lights on", re-instrumented | glows in DOM order at 70ms stagger; cone starts **1,666 ms**, completes **2,516 ms** — §H.3's 900ms rise, felt |

The dark Lighthouse runs used a scratch copy of `dist/` whose head-script default was
flipped to `dark`, the same method steps 2 and 3 and run A used. Nothing shipped was
changed to produce them.

Evidence in `docs/reviews/floor2/engineer/`: the floor section at 360, 390, 768, 1024,
1440 and 1920 in both schemes, the same section under `reduce` at 360 and 1440 in both,
and `lighthouse.json`. Every one was opened and looked at; the black scene, the missing
chair, the invisible occupants, the clipped `Release Watcher` plate, the portrait chair
hung below its own cell and the OG card's stale crop were all found that way and fixed.

---

## Build run B — the two person pages, the run A items, the round 10 plate (2026-09-05)

Scope per brief §14 step 6: `/sahib/` and `/tanya/`, the thirteen items from
`docs/reviews/runA-design-review.md`, copy round 12, the full nav and the work strip's
two row links, the §J cuts, and §D.8's print stylesheet for both person pages.

### The thirteen run A items, and how each was closed

| # | Fix |
|---|---|
| B1 | Already closed by floor pass 2, and verified here rather than assumed: the scene instantiates `#fl-cone`, `#fl-seat`, `#fl-agent` and both cabins, and `qa:floor:pointer` still returns 10 of 10 stations at six widths in both schemes. |
| B2 | `/contact/`'s three routes are a 3-up **inside cols 1–9** at ≥ 1024, per §B.11 as amended in round 9. Measured on the rendered page: the third column runs x 524–738 at 1024 against a band beginning at 748, and x 732–1014 at 1440 against 1164; the third address's own ink ends at 715 and 930. |
| B3 | §E.2's vertical track runs to 930 and the horizontal form starts at 931. The breakpoint moved and nothing else about the component did. |
| 4 | `--node-future-stroke` is `rgba(15,42,46,.60)` in `tokens.css` and in the print block that re-declares the light values. `qa:contrast` gained alpha-composite pairs, so the stroke is now checked at the colour it renders as: **4.02 : 1** on `--sheet`, **3.84 : 1** on `--band`, against §E.1's published 4.01 and 3.83. The dark twin stays at `.45` and is asserted at 3.75 / 3.50. |
| 5 | Every route that was one 530px measure in a 1200px page is now on §B.5's grid: `/work/`'s headline and intro are cols 1–5 and 7–12; both case studies split the same way and set each section as a heading rail (cols 1–3) beside its prose (cols 4–9); `/contact/`'s header splits and its routes take cols 1–9. **The home page's four are §B.9's own drawn arrangement** — the hero's void is the one §B.9 allows, the offer section is drawn as "the quietest section on the site", and the CTA's wireframe says "cols 8–12 empty" — so they are not changed. |
| 6 | The full track's width is `--track-span`, which a page sets to the column span it wants filled; the default is five times §B.10's own `--track-pitch`. `/work/` uses the pitch between 931 and 1023 and the cols 1–9 span above it; both case studies fill cols 1–9. The axis has a stated width instead of a max-width nobody chose. |
| 7 | The screenshot row is capped at two columns from 768 up, so no page puts more than §B.11's two above the fold. Nothing was cut to achieve it — the review's "remove one thing" nomination for that route is still available to spend. |
| 8 | The four sections on both case studies alternate `--sheet` and `--band`. The fill carrier pads 16px and pulls the same 16px back as a negative margin, so its content box is the content width and the grid inside it stays on §B.5's columns. |
| 9 | The screenshot grid's column count is the screenshot count, capped at two, so `/work/wedding-planner/` is laid out for the one screenshot it has rather than as four tracks with three collapsed. |
| 10 | The compact track's label row is half a pitch wider than the axis it labels. The three middle labels stay centred on their nodes; the two end labels take half a pitch of padding on their outer side and align to the ends of the **axis**, so the row's ink runs x 732 → 1132 at 1440, which is §B.10's axis exactly. See the deviation below: §B.10 as amended in round 9 says the labels ride the axis, so the other half of item 10 — that the row should reach col 12 — is refused, because reaching col 12 puts a mark inside the plate's band. |
| 11 | The four non-home OG cards lose the empty 135px band and the card is the sheet. §B.12 rules out the review's other suggestion in terms — the favicon's cone "never appears … in an OG card", and putting it there would make it a logo. The home card keeps its floor, because the floor is in it. |
| 12 | Already closed by floor pass 2, verified: both cabin plates are horizontal, on the near half of their own cabin floor, at §C.3's coordinates. `qa:floor` re-checks nameplate disjointness at six widths. |
| 13 | §J's pre-committed cut for `/work/` is spent: the one-line description under each product name does not print. COPY.md §3.2's and §3.3's strings are untouched; they are simply not placed. |

### What the two person pages are built as

**The coverage map is a real `<table>`**, with `scope` on both header axes and every table
element carrying its ARIA role explicitly — because below 1024 the rows are restyled into
stacked blocks and changing `display` on a table element drops its implicit role in every
engine. That is the documented mitigation, not a hack. One DOM, two layouts: the matrix
at ≥ 1024 with the product name inside its cell, and at < 1024 §F.7's rotation, where the
row header carries the company, its years and a five-mark strip and the product names
move onto the row's own lines. The strip is `aria-hidden` because the cells beneath it
carry the truth; the inline surface label is `aria-hidden` because the column header has
already been announced. Nothing is written twice.

The map asserts §F.1's own arithmetic at build time — ten filled cells, no empty row, no
empty column, exactly one lit column — because §H.3's moment only reads as four columns
filling and one arriving if every column has a cell to fill.

**T1 is one file**, `src/layouts/tanya/LayoutA.astro`, selected by one import in
`src/pages/tanya/index.astro`; her tokens are one partial, `src/styles/worlds/tanya.css`;
and every component both pages share — the header, the footer, the plate, the work card,
the links block — consumes only the generic `--tgd-*` names. Swapping to T2 touches
neither. The core is a continuous field with a 4px `--lamp-ink` cap; Android and iOS are
the two edge columns, narrower and indented; the Motive card sits in the core with the KMP
work and a 2px tick carries the Fleet App into the iOS edge. DOM order is core, Android,
iOS — §G.3's own 360 collapse, and the reading order at every width.

### Where this run had to argue with the spec, and the arithmetic

1. **Every mark on every route now lives in cols 1–9, and cols 10–12 are the plate's
   rest.** §B.11 states that allocation for `/contact/` and derives it; the same
   arithmetic forces it everywhere. At 1024 the band begins at x 748 and col 9 ends at
   738, so nothing load-bearing can sit right of col 9 at the tightest width on the site.
   §G.3 draws Tanya's iOS edge at cols 10–12; at 1024 col 10 *starts* at 762, inside the
   band. Her three fields are Android 1–3, core 4–7, iOS 8–9, which keeps §G.3's
   hierarchy exactly — the core is the widest field, the edges narrower and indented.
2. **§B.9's split proof band cannot engage at 1024.** §B.10 computes the band at 1440 and
   nowhere else. At 1024 col 7 starts at x 524 and the plate's band at 748, leaving 224px
   for an axis that needs 500 at the 100px pitch that makes §E.2's two-line label
   reservation hold; shrinking the pitch to 56 is the three-line `Submitted for review`
   step 2 raised as item 7. Measured before the change, the last three nodes and three
   labels all ended inside the band at 1024. The section stacks from 1024 to 1439 and
   splits at 1440 — the same remedy §B.10 chose for `/work/`, the form with no right-hand
   extent rather than a narrower pitch. **§B.5 says every split engages at 1024. Flagged
   for the Design Lead.**
3. **§G.3's two numeral slots in the core are not filled as drawn.** COPY.md §7.2 says in
   terms that the 99.8% and ~20% figures "print only in that attributed form", so the
   attributed sentence prints on her Motive card and the core carries no bare figures.
4. **§6.5's and §7.5's written accessible names for the two profile links are not used.**
   `Sahib Singh on GitHub. Opens a new tab.` does not contain its own visible label
   `Sahib on GitHub`, which is SC 2.5.3, Label in Name; Lighthouse's
   `label-content-name-mismatch` audit caught it and took `/sahib/` to 98. COPY.md §10.5's
   general rule — append `Opens a new tab.` to the link's own name — produces a name that
   contains the label by construction, so the general rule wins over the two written-out
   strings. Both are still in `copy.ts` so the conflict is visible.
5. **The work card's company is a `<p>`, not an `<h3>`.** On `/sahib/` the cards follow
   the map, which COPY.md gives no heading — §F.7's and §F.8's section labels are
   wireframe labels, not COPY.md strings — so an `<h3>` skipped a level and
   `heading-order` was right. PLAN.md §5.5 describes a list of roles; the list carries the
   structure and the type carries the hierarchy.
6. **§F.7's and §F.8's `Tell us what you're building.` above the closing address is not
   printed.** It is COPY.md §2.10's home-page CTA headline and COPY.md writes no
   person-page equivalent, so each person page closes with that person's address alone,
   under §6.5's and §7.5's own label and accessible name.

### DESIGN.md §B.10, round 10 — landed, and applied except for one bullet

Re-read at the end of the run, as asked. The sub-768 ruling **has** landed. Three of its
four changes are in:

- **The reserve is +72, not +56.** The plate is 56 tall and sits 16 above the viewport's
  bottom edge, so 56 alone left a section's last line 16px inside its lowest rest
  position.
- **Two widths, one object:** 260 × 56 at ≥ 768, 112 × 56 below it, with the band at 276
  and 128.
- **The composition rule binds at every width**, at whichever band applies.

**Change two — the label below 768 — is a copy blocker and the plate is held there.**
Round 10 replaces the address with a label at that width because 112px leaves ~73px of
type against the 169px the shortest address needs. Both of that label's strings are
`[COPY NEEDED]` in §B.10 and neither is in COPY.md: not the ≤ 9-character label, not the
≤ 8-word accessible name that has to speak the address the plate links to. An amber box
with nothing in it and no accessible name is not a smaller failure than the 84%-of-the-line
one round 10 fixed, so the element waits for its strings, exactly as the strip's row links
and §B.8's pipeline label waited for theirs. The 112px width and the 72px reserve are
already in `tokens.css` and the 128px band is already enforced, so the day the two strings
arrive this is one `display` declaration. **Change three — the wrapper on `/` starting
after the floor below 768 — is not built either, because with no plate below 768 there is
nothing for it to change.** Both return together.

### Two regressions this run caused and found by measuring, not by reading

1. **Moving Tanya's tokens into their own partial rendered her entire page in the studio
   palette.** PLAN.md §1.2 asks for a swappable token partial; the `@import` went at the
   top of `tokens.css`, which puts `[data-world="tanya"]` **before** `:root` — and both
   selectors are specificity (0,1,0), a pseudo-class and an attribute selector weighing
   the same, so `:root` won on source order. Nothing failed: the build was clean, `astro
   check` was clean, `qa:contrast` was clean because it layers by selector name rather
   than by document order, and a pale achromatic page is what hers is supposed to look
   like. Measured `--tgd-surface` in a browser: `#f1f3f0`, the studio sheet. The import
   moved to `global.css`, in order, after `tokens.css`.
2. **The T1 band rendered as three stacked blocks above 1024.** With DOM order core,
   Android, iOS, grid auto-placement will not backtrack to column 1, so the core took row
   1 and both edges went below it. Explicit `grid-row: 1` on each field.

Both are the same lesson the floor's `set:html` scoping bug taught one layer up: a fault
that only a rendered page shows needs a check that reads a rendered page. Hence the two
new gates below.

### Two new QA gates

**`qa:worlds`** asks the browser what actually computed, on the real page, in both
schemes: `--tgd-surface`, `--tgd-surface-alt`, `--tgd-ink` and `--tgd-accent` on four
routes, against DESIGN.md's published hex. **32 computed values.** It is the check that
would have caught regression 1 in seconds.

**`qa:plate`** is §B.10's composition rule, measured. The rule has been enforced three
times by three people reading screenshots and broken three times the same way; it is
arithmetic on a rendered box, so it is a script. Every mark the rule names by name — a
card's price line, a stage node, a stage label, a printed address, a CTA, the map's lit
cell, an edge annotation — is measured against the band at eight widths on all eight
routes, inside the plate's own wrapper. **432 marks.** It measures **ink**, through a
`Range` over each element's contents, not element boxes: a vertical track's label lives in
a full-width grid cell and a card's date in a full-width block, so boxes over-report by
500px and the first run produced 80 false failures on top of the real ones.

It found six real failures, three of them pre-existing:

- the home strip's and Sahib's cards went 2-up at 768, putting the right-hand card's date
  line at x 522 against a band beginning at 492. §D.1's own table is one column then two,
  with no 768 row, so the 2-up now arrives with the twelve-column grid;
- the map's lit cell was a full-width block below 1024, ending at x 706 against 492 — it
  shrinks to its content now, which is also the picture §F.1 describes, "the newest,
  smallest" region;
- §B.9's proof band at 1024, above.

### Deferred, deliberately — the run A list, updated

Closed this run: the four nav links (all of them), the work strip's two row links, and
§D.8's print stylesheet.

Still open:

1. **Font subsetting and the `wdth` range restriction.** Step 8. `public/fonts/` still
   carries the full unsubsetted binaries, 133,852 B.
2. **Fallback-metric matching for `font-display: swap`.** Still the fix for `/contact/`'s
   CLS, and still step 8's.
3. **The plate below 768**, above — two COPY.md strings.
4. **Both headshots.** QUESTIONS.md item 23's images do not exist and COPY.md §10.1's two
   alt lines are still `[CONFIRM]`-marked against them. The slot is reserved at §F.7's
   320 × 320 and §F.8's 366 × 440 with **no image and no placeholder** — no frame, no
   fill, no label, no icon — so filling it later causes no reflow and nothing on the page
   pretends a picture is coming.
5. **§C.4's 6% warm offset**, the floor's.
6. **§B.11's empty room on `/404`.** Seen while shooting this run's evidence and recorded
   rather than fixed, because it is outside run B's scope: §B.11 gives `/404` "the floor
   slab and the lamp, no desks, no chair", reusing the floor's own slab symbol and lamp
   gradient for "roughly zero new bytes". The page today is the headline, the link home,
   the plate and the site chrome, and no room. No review has raised it — the run A review
   did not include `/404` in its routes — so it is on this list rather than in a commit.

### Other decisions made this run

- **`scripts/screenshots.mjs` dropped its own output directory on every run without
  `--el`.** `elIndex` is −1 when the flag is absent and `-1 + 1` is 0, so the filter
  removed `argv[0]`. Fixed; it is the script run A left for run B to use.
- **The years rule is shared.** COPY.md §7.2 round 12 prints years only on both person
  pages as well as in the strip, so `yearsOnly` and its assertion moved to
  `src/lib/person.ts` and the card asserts against it. Every card printed a month before
  this — `Jan 2024 – now`, `Aug 2021 – Dec 2023`. The months stay in the data, where they
  are the source that settles which card a boundary belongs to.
- **The lit cell's ink is one token, `--s-lamp-ink`.** `--s-ink` on `--lamp` is 8.10 : 1
  in light (§F.4a) and `--s-ground` on `--lamp` is 8.48 : 1 in dark (§F.4's own pair read
  the other way round). Both are published; `--s-ink` on `--lamp` in *dark* would be
  1.66 : 1, which is why this is a token and not one declaration.
- **The print sheet closed two failures §D.8's own light-token rule exists to remove, one
  layer down.** The closing address printed amber on a `--floor` ground the browser
  suppresses — 1.79 : 1 on white — and the two inverted regions printed `--chalk` on
  white at 1.20 : 1. Both are ink on paper now. The map's lit cell keeps its 2px boundary
  and loses its fill, and its text comes back to the page ink with it.
- **Below 1024 a single work card is the full content width** — 704px at 768. §D.1 caps
  nothing and nothing is covered, but it is a wide object for a shelf-talker and the
  Design Lead may want a cap. Recorded rather than invented.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| JS shipped, `/sahib/` and `/tanya/` | **0 B external**; 450 B gzip of inline module script (1,028 B raw — the theme toggle's, and nothing else) |
| CSS shipped, all routes | 69,020 B raw / **12,352 B gzip** (30% of the 40 KB line) |
| `/sahib/` HTML | 6,486 B gzip |
| `/tanya/` HTML | 5,982 B gzip |
| Home HTML | 11,944 B gzip |
| Home page total | **158,221 B gzip** (13% of the 1.2 MB line) |
| Contrast pairs checked | **62** across six palettes, including four alpha composites |
| Computed world tokens checked in a browser | **32**, four routes × two schemes |
| Load-bearing marks measured against §B.10's band | **432**, eight routes × eight widths, 0 inside the band |
| §C.11 pointer acceptance | **10 of 10** stations, six widths, both schemes |
| "The map fills", instrumented per 100ms | columns 1–4 up in order at a 120ms stagger, complete at ~560ms; **nothing from 560 to 860**; the lamp column alone from 860, complete ~1,500ms — §H.3's 300ms hold, measured |
| "The core draws" | exactly **one** animation on the page, `core-draws`, 900ms |
| Reduced motion | the complete map and the complete band at first paint, both schemes |
| Lighthouse mobile, 3 runs, **light**, all seven routes | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| Lighthouse mobile, 3 runs, **dark**, all seven routes | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** |
| LCP, light | 1,415-1,511 ms across the seven routes (line is 2,000); `/sahib/` 1,439-1,448, `/tanya/` 1,438-1,441 |
| LCP, dark | 1,422-1,512 ms; `/sahib/` 1,447-1,455, `/tanya/` 1,437-1,443 |
| CLS | **0** on six routes in both schemes; **0.030** on `/contact/`, unchanged from run A and still the font swap (line is 0.05) |
| TBT | **0 ms** on every route in both schemes |

The dark runs used a scratch copy of `dist/` whose head-script default was flipped to
`dark`, the same method steps 2 and 3, run A and floor pass 2 used, because neither LHCI
nor a Chrome flag can seed `localStorage` or `prefers-color-scheme` for a static run.
Nothing shipped was changed to produce them. **The first light run of this pass failed its
own accessibility assertion at 98 on `/sahib/`** — `heading-order` and
`label-content-name-mismatch`, both above — which is the gate working; both are fixed and
the numbers here are the re-run.

**Keyless build.** No `.env`, no `PUBLIC_FIREBASE_*` in the environment: the build
succeeds, **0 external `<script>` files in `dist/`**, and no file in `dist/` mentions
Firebase.

Evidence in `docs/reviews/runB/engineer/`: both person pages at 360, 768, 1024 and 1440 in
both schemes; the same two under `reduce` at 360 and 1440 in both; keyboard focus on the
first three stops at 360 and 1440 in both; the map zoomed at four widths; the six fixed
routes at 360 and 1440 in both; and the print stylesheet as PDF and PNG for both person
pages and `/`, taken from a context seeded **dark** so that §D.8's light-token rule is
what the PDF proves. Every one was opened and looked at; the studio palette on Tanya's
page, the three stacked T1 fields, the months on every card date, the shrink-wrapped map
caption, the centred `th`s, the missing field fill at 360, the map's lit cell inside the
plate's band, the invisible lit-cell text in print, the dark studio printing dark, the
footer printing --chalk on white, and COPY.md §10.4's `Stage:` line printing above a
vertical track whose five labels were already visible were all found that way and fixed.

`work-{360,768,930,931}-light-track.png` is §E.2's breakpoint, both sides of it: at 930
the track is vertical with all five labels and no right-hand extent; at 931 it is
horizontal and its axis ends at x 580 against a plate band beginning at x 655, 75px clear
at the tightest width in the range.

---

## Pass C — the sub-768 plate, and §B.11's empty room on `/404` (2026-09-05)

Run B's two held items, both closed. Nothing else was in scope and nothing else was
touched.

### 1. The plate below 768

`ContactPlate.astro`'s `display: none` at `max-width: 767px` is gone. COPY.md §1 now
carries both of round 10's `[COPY NEEDED]` strings, and only one of them is new:

- **Visible label below 768: `Email`.** Five characters against the ~73px of type a 112px
  plate leaves. One string for all three worlds, no pronoun, because `us` would name the
  studio while the `mailto:` names one person.
- **The accessible name is the SAME pattern at both widths** — `Email <address>. Opens a
  new message about a project.` with the page's own address substituted. That is worth
  saying out loud, because it is what makes SC 2.5.3 hold at both widths without a second
  string: `Email` is the name's first word and the address is its second, so whichever of
  the two the plate is printing, the visible label is contained in the name. Lighthouse's
  `label-content-name-mismatch` — the audit that took `/sahib/` to 98 in run B — is clean
  on all eight routes in both schemes.

Two spans, one shown at a time by a `display` declaration. The fill, the border, the 3px
radius, the type size, the inset, the focus ring and the print rule are all still one
declaration on `.plate` in `global.css`: **one object at two sizes, not two components.**
Measured at 360, 390 and 767: 112 × 56 with `Email`; at 768, 1024 and 1440: 260 × 56 with
the address. Per world, measured: studio on `/`, `/work/*`, `/contact/` and `/404.html`,
`sahiboffc@gmail.com` on `/sahib/`, `jaintanya999@gmail.com` on `/tanya/`.

### 2. The wrapper on `/`, and one thing measuring found that reading did not

Round 10's change three — below 768 the plate's wrapper begins at the **end of the floor
section** — is a `position: sticky` containing-block question, and a sticky element's
containing block is its parent's box. So the span is two nested wrappers and one
declaration decides which is the plate's: below 768 `.plate-span__after-floor` is a real
box and the plate cannot rise above the work-card strip; at ≥ 768 it is `display:
contents`, generates no box at all, and the containing block is `.plate-span` again, floor
included, exactly as before. `display: contents` on a plain `<div>` removes the box and
nothing else — no role, no name, no styles, an identical accessibility tree. **No JS, no
scroll listener, no `view-timeline`, no scroll-driven animation**, so there is nothing to
cancel under `reduce` and nothing to fall back from.

**Then the plate was still over the room, and only a sweep showed it.** The plate carries
`margin-block-start: -56px` so that it adds no height at the end of its wrapper. A sticky
element is clamped by its **margin box**, not its border box — so that same −56 buys it
56px of travel *above* its wrapper's own top edge. Everywhere else that edge is a
section's bottom padding and nothing is seen; here it is the floor. Walked in 80px steps
at 360 and 390 in both schemes, the plate's box was over the floor section at **17 of 88
scroll positions** — an amber plate on the room, which is the thing change three exists to
prevent, sitting inside a change that had otherwise landed. The fix is to move the flow
saving off the plate and onto the wrapper (`margin-block-end: -56px` there, `0` on the
plate below 768): identical arithmetic, and the plate's margin box is now its border box,
which is what the clamp reads. Measured again: **0 of 88, all four combinations.** The
sweep is in `scripts/evidence-runc.mjs` and prints its count on every run.

**The reserve.** `--plate-reserve` was already 72. What was missing is that two of the
sections the plate can overlay did not carry it: the work-card strip and the gates. Below
768 the plate's span now *begins* at the strip, and at ≥ 768 both were always inside it,
so both take `section--reserve` — §B.10's reserve point 2 is "every section the plate can
overlay", and it now is. The floor takes none, per §B.10 point 3.

**`qa:plate` measures the real containing block now.** It used to take
`plate.closest('.plate-span')`, which on `/` below 768 is the outer wrapper and would have
checked the floor's marks against a band the plate cannot reach. It walks up past every
`display: contents` ancestor instead, which is the CSS rule itself. **566 marks across 8
routes at 8 widths, 0 inside the band** — up from 432, because 360 and 390 now have a
plate to measure against.

### 3. `/404` — §B.11's empty room

The slab and the lamp, no desks, no chair, and **no geometry authored for it**:

- the slab is `WIDE_SLAB`, the same projected outline of the same 6 × 5 room;
- the lamp's cord and shade were two paths at the top of `#fl-seat`; they are now a
  shared `#fl-lamp` symbol that `#fl-seat` `<use>`s, so the chair on `/` is byte-for-byte
  the same drawing and `/404` can hang the same lamp with nothing under it;
- `LAMP_DEFS` — the `#fl-cone` gradient plus that symbol — is split out of `FLOOR_DEFS`,
  which is the string both pages now read. Taking the whole of `FLOOR_DEFS` to `/404`
  would have shipped seven desks, two cabins and an occupant to a page that draws none;
- the pool and the cone are the two `d` strings the floor draws at its chair station, at
  the chair's own `wideTransform` off `placements()`. §B.12 already said the chair on
  `/404` "is implied by what the cone points at". It is.

**The box is cropped to what is drawn.** §C.3's 856 × 520 carries 140 units of margin for
nameplates that do not exist here; at 360 that was the difference between a room and a
smudge. The crop is computed from the slab's own extents and the lamp's, not typed.

**Scoped for the `set:html` lesson.** The `<defs>` are injected, so Astro cannot scope
them and every class they carry is styled `:global`. They are restated in `EmptyRoom.astro`
rather than borrowed from `StudioFloor.astro` on purpose: **a route must not depend on the
stylesheet of a component it never mounts.** Same values, same tokens.

**No idle loop** — `.fl-glow` is a monitor's screen and there are no monitors, so there is
no glow, no `--d` phase and no animation declared anywhere in the component. **The cone is
static**: §H.3's moment belongs to the page it introduces, and a 404 that performs a
lighting cue is asking to be admired for having gone wrong. Under `reduce` and without it
this renders identically, because there is nothing to reduce.

**One section, and it is the room.** Two were tried first and measured: with the headline
on the sheet and the room below it, at 1440 × 900 the room's top edge landed at y 502 and
the lamp at y 662 — the joke entirely below the fold on the one page whose whole content
is the joke. The headline and the link stand in the room instead, on `--chalk` over
`--floor` at 12.74 : 1 and 15.34 : 1, both already published. At 360 × 640 the header, the
line, the link, the whole room and the plate are in the first screen. `noindex` is
unchanged, the page is still a headline and one link, and the plate is chrome.

**`content-visibility` and `contain-intrinsic-size`, and the second thing measuring found.**
The home floor's height is content-derived and one 1180px estimate fits it. This room's is
`width ÷ 5:3` and **no single number fits it at more than one width**: declared `auto
432px` it reserved 432 against a room that renders 164 at 360 and 190 at 412, and because
`/404` is short enough that the footer sits in the first viewport, all of that jump was
counted — **CLS 0.0596 against a 0.05 line, identical across three Lighthouse runs.**
Isolated by re-running with `content-visibility` disabled (0) and with the fonts blocked
(0.0596), so it was the reservation and not the swap. A size-contained box prefers
`contain-intrinsic-size` to its `aspect-ratio`, so the fix is to give it nothing to
prefer: the ratio lives on the box that carries the width cap, and the intrinsic size is
`auto none` — the remembered size for a second paint, and the ratio otherwise, which is
exact at **every** width rather than at one. Measured after at 360, 412 and 1440: 0,
0.0027 and 0, and the 0.0027 is the font swap.

### Lighthouse now covers `/404.html`, and how

It was not in `lighthouserc.json` at all, which is why the CLS above was never seen. It is
now, and the config is an `assertMatrix` rather than one block, because `categories:seo`
at `minScore: 1` cannot hold on a page COPY.md §9 requires to be `noindex`: `is-crawlable`
is weight 4.04 of 12.04, so a correct `/404` scores **0.66** and always will. Rather than
relax the category to a number that means nothing, the 404 row turns the category off and
asserts the **eight** SEO audits that do apply, each at `minScore: 1` — `document-title`,
`meta-description`, `http-status-code`, `link-text`, `crawlable-anchors`, `robots-txt`,
`hreflang`, `canonical`. Every other assertion is identical to the other seven routes'.

### Still open — run B's list, updated

Closed this pass: item 3 (the plate below 768) and item 6 (§B.11's empty room). Unchanged
and still open: **1.** font subsetting and the `wdth` restriction; **2.** fallback-metric
matching, which is still `/contact/`'s 0.0304 CLS and now also the 0.0027 residual on
`/404` at 360; **4.** both headshots; **5.** §C.4's 6% warm offset. Also still open, and
not raised again by this pass: §B.9's split proof band at 1024, flagged for the Design
Lead in run B.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| `qa:plate` | **566** load-bearing marks, 8 routes × 8 widths, **0** inside the band |
| Plate below 768 | 112 × 56, `Email`, on all eight routes at 360, 390 and 767 |
| Plate at ≥ 768 | 260 × 56, the page's own address, at 768, 1024, 1440 |
| Plate over the floor on `/`, swept per 80px | **0 of 88** at 360 and **0 of 86** at 390, both schemes (17 before the margin fix) |
| `/404` room, markup | 1,561 B raw, **615 B gzip** |
| `/404` room, its own CSS | 447 B raw, **32 B gzip** |
| `/404.html` total | 11,837 B raw, **4,124 B gzip** |
| CSS, all routes | 69,840 B raw / **12,517 B gzip** (31% of the 40 KB line; +165 B on run B) |
| Home page total | **158,797 B gzip** (13% of the 1.2 MB line) |
| Floor budget | **6,336 B gzip** of 81,920 |
| `qa:*` | build, no-slop, images, links, console, contrast (62 pairs), worlds (32 tokens), plate (566 marks), floor budget, floor pointer, weight — all pass |
| Lighthouse mobile, 3 runs, **light**, all **eight** routes | Performance **100**, Accessibility **100**, Best practices **100**, SEO **100** — and 0.66 on `/404.html`, which is `is-crawlable` on a `noindex` page and is the design |
| Lighthouse mobile, 3 runs, **dark**, all eight routes | the same eight rows, same scores |
| LCP, light | 1,443–1,531 ms (line 2,000); `/404.html` 1,443–1,449 |
| LCP, dark | 1,442–1,535 ms; `/404.html` 1,447–1,450 |
| CLS | **0** on seven routes in both schemes; **0.0304** on `/contact/`, unchanged since run A and still the font swap |
| TBT | **0 ms** on every route in both schemes |

The dark runs used the same method runs A and B used: a scratch copy of `dist/` whose
head-script default is flipped to `dark`, because neither LHCI nor a Chrome flag can seed
`localStorage` or `prefers-color-scheme` for a static run. Nothing shipped was changed to
produce them.

Evidence in `docs/reviews/runC/engineer/`: `/404.html` full-page and viewport at 360 and
1440 in both schemes; `/` full-page at 360 and 390 in both; `/` mid-scroll at 360 and 390
in both with the plate at rest over the strip, and again with the floor filling the
viewport and no plate on it; the floor's chair station at 1440 in both, which is the
`#fl-lamp` refactor's proof that the room on `/` did not move; and all 48 Lighthouse
reports under `lighthouse/{light,dark}/`. Every screenshot was opened and looked at — the
plate on the room, the below-the-fold empty room and the 432px over-reservation were all
found that way or by the sweep the pictures prompted.

---

## Build run D — the consolidated fix run (2026-09-05)

Thirty run-B review items, the audit's three, the two COPY round-14 strings, the font
pipeline, and DESIGN.md round 12 — which landed in the Design Lead's own scratch partway
through this run, which is why parts A to D were built against the spec text first and
part E ran afterwards.

### First, the three blockers, measured against pass C rather than assumed

The brief asked whether pass C's wrapper change had already closed B1, B2 or B3. It had
not, and the answer is measured on a worktree built from `868f01c` rather than argued from
the diff:

| | Measured on the pass-C build | Verdict |
|---|---|---|
| **B1** | `1,000+` ink ends **x 573.4 at 768** against a band at 492, and **661.4 at 900** against 624 | still open — the wrapper never touched the proof band |
| **B2** | `Designer` ends **x 701.7** and `Test Engineer` **718.8** at 900, against a band at 624 | still open |
| **B3** | the card slot is inside the plate's wrapper at **768, 900, 1024 and 1440** (`wrapper.contains(slot) === true` at all four) | still open |

Pass C's change was `@media (max-width: 767px)`, so at every width from 768 up the floor
and the slot were inside the plate's span exactly as run B found them. All three are closed
in part E below, and the same script now measures them on every run.

### Part A — home and the floor

- **H5, the chair.** §C.3 round 12 specified the object rather than leaving it to the
  drawing, and the old back panel is why: at local x −34.4 to −15.6 rising to y 8.8, it sat
  **under the desk's own near-left edge**, which crosses that span at y −1 to 10. The chair
  was standing behind the thing it stands in front of, and what was left was the "lit slab
  over a small dark box" three reviews described. It is five paths now — seat, rim, back
  near face, back cap, two legs — with the back **14 units tall**, which is 0.6 of the
  seat's 22-unit plan depth *and* the number that keeps the whole back clear of the desk:
  measured at local x −16 the desk stops at y 10 and the back starts at 15; at x 0, 18
  against 23; at x 6, 15 against 26. Five units at the tightest point. Shot at the 250ms
  frame with the cone absent, which is §C.3's own acceptance test, at 360 and 1440 in both
  schemes.
- **H5's second half.** The chair is §C.7's one exception to the portrait plate rule and
  its 20-unit band is at the **bottom** of its button. Its pool bottoms out at exactly
  y 500 and the band runs 500–520, so `Ship approval` sets on bare `--floor` at chalk@72%
  instead of across the cone at ~1.6 : 1. §C.7's disjointness proof is untouched — it says
  a rectangle inside one member of a disjoint set is inside no other, and top or bottom
  does not enter that argument.
- **H6.** 264 / 416 / 352, §C.6 round 12's measured numbers. The old 392 was 15px short of
  Sahib's own 406.7px card at 1024 and the old 344 reserved 93px of void at 768.
- **H7.** The two edge-aligned labels go; all five centre. `Live` then ends 2px inside the
  band at 768, which is the overhang §E.3 exempts in terms — see the gate note below.
- **H8 / S3.** One number, `.card` and `.work-card` both: **no work card is wider than
  420px**, left-aligned where the grid gives more, and the cap is lifted in print because
  §D.8 removes both the stand and the price position that §D.1 argues from.
- **H9.** Below.

### H9, and the acceptance test that cannot be reached by amplitude

§C.8 raised the selected fill from 34% to 52% and wrote its own acceptance test: the same
pixel-difference method under `reduce`, at 360 and 1440 in both schemes, needing **≥ 30% of
the desk's pixels changed at a maximum channel delta ≥ 60**. Measured at 52% alone:

| | 360 | 1440 |
|---|---|---|
| pixels changed | 15.5% | 24.6% |
| max channel delta | **67** light / **69** dark | 67 / 69 |

The delta passes and the share does not, so §C.8's **priced fallback is taken on that
measurement** — a 1px `--chalk` edge on the selected desk top, which is the stroke the
slab's own edge and the cabin walls already draw. Delta goes to **106–178**; the share
moves only to 16.6% / 25.4%.

**It cannot go further, and the reason is geometry rather than amplitude.** The only thing
that changes between the two states is the desk's top face, and that face is ~25% of the
station's own box at 1440 and ~16% at 360 — the box also contains the monitor, the chair,
the shadow faces and the empty scene around them. No fill value and no second indicator on
the *top face* can move 30% of those pixels. The 30% is a number about the desk's drawing,
not about the state, and it is flagged here for the Design Lead rather than chased.

**Contrast, since the brief asked for a ratio.** `--chalk` @ 52% over `--floor` against
`--chalk` @ 22% over the same ground is **2.36 : 1 in light and 2.61 : 1 in dark** — under
3 : 1. 3 : 1 is not reachable by this mechanism either: at 100% `--chalk` on `--floor` the
step is 4.9 : 1, and §C.8 caps the selected desk below the monitor glow's 55–85% so that
the brightest thing in the room stays a screen. The 1px `--chalk` edge is what carries the
state at full contrast, which is why §C.8 priced it as the fallback.

### Part B — routes

- **W1.** §E.2's round-12 anchor, as one expression: first node centre at the block's left
  edge + 9, last at `min(block right, 100vw − 300) − 9`, and the list is 1.25 axes wide
  starting an eighth of an axis before it, because with five equal columns a node centre
  sits half a column in. Measured against §E.2's own table: **931 → last node 622, ring 631,
  band 655, 24 clear, pitch 145.3; 1024 → 715 / 724 / 748 / 24 / 164.5; 1440 → 1005 / 1014 /
  1164 / 150 / 219.0.** The track escapes the `--band` block's 48px padding so `100%` is the
  block's border box, which is what §E.2's table means by its inner edges.
- **PM1 and WP2.** One rule, both routes: the markers go, the indent goes with them, and the
  separation moves to space (§B.2). Still a real `<ul>`.
- **WP1.** A one-screenshot page renders no standalone screenshot row at all. The shot moves
  into the section it is evidence for — cols 1–4 at ≥ 1024 with COPY §5.2's paragraph in
  cols 6–10 top-aligned beside it, full content width below. 603px is the largest display
  width that still downscales at 2× from the 1206px source. The shot spans both grid rows
  and row 2 is the flexible one, because an `auto` pair splits the picture's height between
  them and drops the paragraph half a screenshot below its own heading — found by looking.
- **C1.** `/contact/` carries no plate at any width. The wrapper stays, because it is what
  hands `main`'s growth to the section that carries `flex: 1 0 auto`.
- **E2.** `quietFooter` on `/404` only. The header nav, the studio line, the location line,
  the address, the employer note and the rights line all stay; §J names the nav repeat and
  the `Elsewhere` block and only those.

### Part C — the person pages

- **S2, and the numbers.** `--s-fill` splits off `--s-panel`: **2.97 : 1 in light and
  2.91 : 1 in dark** against the ground, sampled off the rendered page rather than off the
  token, against the 1.13 : 1 the review measured. The product name inside a filled cell is
  4.74 / 4.84 : 1, and the lit cell separates from its neighbours **better** than before in
  light — 1.71 : 1 against 1.55 — because the fill stepped past `--lamp` rather than toward
  it. The 2px `--s-ink` border on the lit cell stays, so no state is carried by fill alone.
- **S1.** Two `--s-panel` blocks, the cards and the background, neither adjacent to the map.
  §D.2's stand takes the panel with the cards, since the stand's fill is the surface the
  card is standing on.
- **S5.** In print the row strips take the stage indicator's discipline — a stroke plus a
  size difference — so the three states survive with every fill suppressed. Verified in a
  print render at A4's own 794px width, which is the form that actually prints, rather than
  at the 1440 the earlier preview was taken at.
- **S4, S6.** The links row drops its email; the two round-14 section lines print.
- **T3, T5, T6.** The edge rules are cut at ≥ 1024; the quotes keep COPY §7.1's own
  quotation marks (they had been dropped in transcription, which is the whole of T5) and
  lose the pull-quote rule, with the attribution in Instrument Sans regular instead of a
  browser-synthesised oblique; and "the core draws" moves its clip off the band and onto
  each field, with the edges 120ms behind.
- **The audit's print ruling.** `.grid` and `.person-links` go to `display: block` in print
  on the two person worlds, which is the whole of it: every column placement on both pages
  is a `grid-column` on a `.grid` child, and a `grid-column` on a block box is inert.

### Part D — the fonts

`npm run fonts` (`scripts/build-fonts.mjs`), run against `dist/`, per PLAN.md §1.5.

| | Source | Shipped | Glyphs |
|---|---|---|---|
| Anek Latin, `wdth` restricted to 75–100 | 103,760 B | **48,204 B** | 125 |
| Instrument Sans | 30,092 B | **20,256 B** | 133 |
| **Total** | 133,852 B | **68,460 B (66.9 KB)** | |

**2,248 B under §1.5's 70,708 B target**, and the home page total falls from 159,689 B
gzipped to **94,841 B**. The subset is **108 code points** — 97 walked out of `dist/`'s own
built files plus §1.5's safety set (curly quotes, the ellipsis, the nbsp, the star). `wght`
keeps 100–800 and the `wdth` axis stays *live* at 75–100 rather than pinned, because §B.3's
numerals are `wdth` 87.5 and §G.2's labels are 75; the build fails if either axis is gone.

**`tnum` survives, and it is asserted twice** — in the script against the subsetted
binary's GSUB, and in the browser against the shipped build: at 200px, proportional `1111`
is 268.77 and `0000` is 452.75 on Anek, while tabular `1111` and `0000` are both 434.98.
Instrument Sans: 305.61 / 541.81 proportional, 480 / 480 tabular. §B.3's Spline Sans Mono
fallback stays unnecessary.

**Kept:** `ccmp locl rvrn tnum liga kern`. **Dropped:** `dnom numr frac` (nothing on this
site prints a fraction, and their glyphs are 32 of the 157 the default feature list drags
in) and `mark mkmk` (the subset has no combining marks). `rvrn` is not optional — it is how
a variable font swaps glyphs across its own design space, and dropping it breaks the axis
rather than shrinking the file.

### Fallback metrics, and the reference string that decides them

The overrides are measured, not looked up: ascent, descent, line gap and units-per-em come
out of each subsetted binary's own `hhea` and `head`, and `size-adjust` is an advance ratio
measured in a real browser against the local face that resolves there — **Helvetica Neue**
on this machine, and the script prints which one it found.

**The reference string is the site's own prose, pulled out of `dist/`, and that is a
finding rather than a preference.** Capsize and Fontaine both use the bare lowercase
alphabet. Measured three ways on this build, against the layout drift between the webfont
and its fallback across `/`, `/contact/`, `/sahib/` and `/tanya/`:

| Reference | Instrument size-adjust | worst document-height drift |
|---|---|---|
| lowercase alphabet | 104.23% | **114px** |
| alphabet + capitals, digits, punctuation | 103.00% | 88px |
| **the site's own paragraphs** | **100.82%** | **26px** |

The thing the number has to get right is *where a paragraph wraps*, and that depends on the
mix of letters, spaces and punctuation the paragraph actually has. With the prose reference
the matched fallback is **better than the bare generic on `/sahib/` (17 against 36) and on
`/tanya/` (26 against 21 by height, 0 against 47 by mark position)** and within 26px
everywhere.

**`/contact/`'s CLS is 0.0001**, three runs, on the finished build — against the brief's
0.01 line and §11's 0.05, and against 0.0304 self-reported in run B and 0.0063 measured by
the run-B auditor. **It is 0.0001 on all eight routes in both schemes**, which is the first
time this site has measured that.

Worth recording *how* it got there, because the intermediate numbers say something. With
the overrides computed off the alphabet reference the number stayed at 0.0063 and the
layout drift got worse; measured three ways — with the overrides, without them, and with
the fallback family stripped out of the stack entirely — `/contact/` sat at 0.0063 in all
three. It moved only when the reference string became the site's own prose, and it moved to
0.0001. The lesson is the one above: an average advance over an alphabet is not the same
quantity as where a paragraph wraps, and CLS is the second thing.

`sync-fonts.mjs` is deleted rather than left: it copied the unsubsetted binaries back over
the subset, which is a trap with a plausible name.

### Part E — round 12, which arrived mid-run

- **B1.** §E.3's allocation, not a per-width case: figures cols 1–5 of 8 at 768–1023, cols
  1–7 of 12 above. The third figure's ink ends **x 398.4 at 768** against a band at 492,
  where it ended at 573.4.
- **B2 / B3.** The wrapper is unconditional. Swept in 80px steps at 360, 390, 768, 1024 and
  1440 in both schemes: the plate's box is over the floor section or the card panel at
  **0 of 818 scroll positions**.
- **H4.** The seven roles move to the same seven modules. Read off the rendered nameplates
  at 1440, the room now says **Spec Writer → Designer → Programmer → Test Engineer →
  Security Auditor → Reviewer → Release Watcher → Ship approval**, across and down.
- **H10.** One grid, two rows at 1024–1439, and every number is §B.9's: lead **x 48 →
  579.3**, aside **603.3 → 976**, node centres **252 / 352 / 452 / 552 / 652**, last ring
  661 against a band at 748. The right anchor is one band-relative expression and it hands
  over to the block term at 1439 without a breakpoint — measured at 1439 the block term
  binds and the axis fills its block, at 1440 the split takes over with its 23px clear.
- **T4 and T2.** Android 1–3, core 4–9, iOS 10–12. The core is 452 wide at 1024 with a
  **388px measure — 47 characters over 15 lines**, against the 245 / 31 / 24 run B measured;
  588 / 524 at 1440. Col 9's right edge is 738 against a band at 748. `align-items: start`
  in place of `stretch`, so at 1024 the Android field is 807 tall, the iOS field 66 and the
  core 1,224 — each ends at its own content.
- **§J's three remaining live rows**: `/work/`'s index store link, `/contact/`'s split
  header, `/tanya/`'s intro second paragraph. The strings stay in the content layer,
  unplaced.

### The gate changed twice, and both times the spec is the reason

**`.track__head-cell` left `qa:plate`'s mark list.** §E.3 round 12 rules in terms that "the
axis is what the rule constrains; the label row is prose that rides it", and that the row's
ink may overhang by up to half a label. With all five labels centred (H7) `Live` ends at
x 494 at 768 against a band at 492 — two pixels of a five-letter word, which is exactly
what the section exempts. The nodes stay measured and they are the marks the rule names.

**`qa:plate` gained §B.10's four**: `.figures__figure`, `.figures__label`, the floor's SVG
`text` nodes and `.core__gates-line`. **560 marks**, up from 512, and the three blockers'
own marks are in the set now. `.edge__note` came off, per §G.3a's exemption for the iOS
field.

### Seven collisions the four new marks found, flagged and not failed

Both are two sections of DESIGN.md disagreeing, and both were invisible until round 12
named these marks. The script prints them under their own heading on every run.

1. **`/` at 360 and 390 — `1,000+` and `downloads`.** §B.8's own 360 wireframe draws the
   three figures "3 across at 320: 96px each", so the third column runs x 244 → 309 against
   a 128-band beginning at x 232. §B.10 round 12 both adds these selectors to the rule's
   list and keeps the band binding below 768, and its worked 360 example lists the three
   marks it checked there — the strip's date line, `/contact/`'s addresses, `/work/`'s
   vertical label — with the figures not among them.
2. **`/tanya/` at 360, 390 and 768 — the core's `Owns` line.** §B.10 states that this mark
   is covered below 768 because the core is "full-width below 768 where the band is 128 —
   reserve 1 again". Full width is exactly the problem: measured, the line ends at **x 305
   at 360** against a band at 232 and at **x 539 at 768** against 492. §G.3 keeps the core
   full width below 1024 and §B.10 keeps the band binding there, and both cannot hold for a
   line that sets to its field's own width.

Recorded rather than invented, on the same discipline run B used for §B.9's proof split at
1024. Neither fix is a build decision: one is a composition (§B.9's 360 wireframe), the
other is which of the two rules yields.

**And one wording note under both of them.** §B.10 round 12's restated promise reads "the
plate never covers content — not a load-bearing mark, **not prose**", while reserve 1, the
part of the same section that is testable and that `qa:plate` implements, keeps "prose and
headings are exempt at both widths". Those are different rules, and the difference is
visible: at 360 on `/work/wedding-planner/` the plate at rest sits across the section
heading `One wedding, several functions, one screen.`
(`wp-360-light-full.png`). A sticky affordance in normal flow will pass over prose on any
page long enough to scroll — that is what makes it free and JS-less — so the promise can
only be read as *load-bearing marks plus the named regions*, which is how it is built and
how the gate measures it. Flagged so the two sentences can be made one.

### Left for the next run

1. **T1 — the Android edge's Motive card, and it is a copy blocker.** §G.3a says "COPY §7.2's
   Motive card supplies the string", and it does not: §7.2's line is one sentence —
   `Motive Fleet App. Kotlin, Coroutines, Compose, and KMP business-logic modules under
   Clean Architecture.` — and taking "the Compose migration" out of it is writing a new one.
   §G.3's practice table and the §G.3a wireframe both say *Jetpack Compose migration*, and
   both are DESIGN.md's own labels, which is the same class of string §F.7's and §F.8's
   section labels were before COPY round 14 wrote them. So: `[COPY NEEDED: the Android
   edge's Motive label on /tanya/, the Compose migration, ≤ 6 words]`. The mechanism is
   already built — `edgeAnnotations` takes `{ layer: 'android', fromCompany, label }` and
   the iOS edge uses it — so this is one JSON line the day the string arrives.
2. **§G.3a's tick geometry, and the top-alignment that goes with it.** The rule is that each
   tick leaves the core horizontally, terminates at the core field's own boundary, and the
   edge card it names sits one gutter beyond, **top-aligned to the tick**. The first two are
   a pseudo-element on the core. The third is not expressible: each edge field's first mark
   is its platform label, not its card, so the card's top is a label's height below the
   field's top, and there is no CSS that aligns a row across three independent columns
   without either splitting the core into two grid rows (which costs "one continuous field")
   or measuring in JS (which §H.1 and PLAN.md forbid for layout). It also needs T1's card to
   have something to align to. **For the Design Lead: does the platform label move into the
   band's own header row, or does the tick take the label's row?**
3. **The seven `qa:plate` flags**, above.
4. **§C.8's 30% pixel share**, above — a number about the desk's drawing, not the state.
5. **Both headshots.** QUESTIONS.md item 23. The slots are still reserved at §F.7's 320 × 320
   and §F.8's 366 × 440 with no image and no placeholder, so filling them causes no reflow.
6. **§C.4's 6% warm offset**, the cabins'. Unchanged since run A.
7. **§K's presentation packet for Tanya.** New this round and not in this run's brief; the
   six frames it names are all in `docs/reviews/runD/engineer/`.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| Fonts, both faces | **68,460 B** (48,204 + 20,256), 2,248 under PLAN.md §1.5's target |
| Home page total | **94,841 B** gzipped, from 159,689 (13% → 7.5% of the 1.2 MB line) |
| CSS, all routes | 73,675 B raw / **13,160 B** gzip (32% of the 40 KB line) |
| JS shipped | **0 B external**, 1,253 B gzip of inline module script in the home HTML |
| Floor budget | **6,813 B** gzip of 81,920 |
| `qa:plate` | **560** marks, 8 routes × 8 widths, **0 failed**, 7 flagged |
| `qa:contrast` | 62 pairs across six palettes |
| `qa:worlds` | 32 computed tokens, four routes × two schemes |
| §C.11 pointer | **10 of 10** stations, six widths, both schemes |
| Plate over the floor or the card panel | **0 of 818** scroll positions |
| Map's filled step | **2.97 : 1** light, **2.91 : 1** dark |
| Selected desk | max channel delta **106–178**, 16.6–25.4% of the station's pixels |
| CLS, all eight routes, both schemes | **0.0001** |
| Lighthouse mobile, 3 runs, 8 routes x 2 schemes | **100 / 100 / 100 / 100**, except `/404.html`'s SEO at 66, which is `is-crawlable` on a `noindex` page and is the design |
| Worst LCP of the 48 runs | **1,506 ms** on `/work/pocket-manager/` (line 2,000) |
| TBT | **0 ms**, 48 of 48 |
| Keyless build | 8 pages, **0 external `<script src>`**, and the only "Firebase" in `dist/` is COPY §4.5's own sentence about Pocket Manager's stack |

Evidence in `docs/reviews/runD/engineer/`: all eight routes at 360, 768, 1024 and 1440 in
both schemes, full page; the chair at the 250ms frame and finished, at 360 and 1440 in both;
the proof band at 768, 1024 and 1440; `/work/`'s axis at 931 and 1440; the wedding planner's
differentiator row at 768 and 1440; pocket-manager's `Build` list; both print PDFs and their
suppressed-background renders at A4's own width; and the Lighthouse reports.

## Build run E — the last fix run before final review (2026-09-05)

Three things were open after run D: T1, §G.3a's tick geometry, and the seven `qa:plate`
collisions the round-12 selectors found below 768. DESIGN.md round 13 (§I.1) rules on all
three plus §C.4, and every one of its build-side rows is in this run. **`qa:plate` reports
560 marks, 0 failed, and there is no flag list left to report anything under.**

### T1 — Motive lands on all three layers

COPY round 15 wrote §7.2's `Android-edge annotation (Motive)`, which is the string run D
raised as a copy blocker and refused to write. It is one entry in `edgeAnnotations` and it
leads the Android field, so the card order is **Motive → HSBC → Naskay** and Motive is the
first thing in all three fields, which is §G.3a's own test: "one company, three layers is
legible without reading a word."

One rendering decision was needed and it is recorded rather than assumed. The annotation's
label does not contain the word `Motive` — the string is about the Compose migration and
the Android release path — so the note prints `fromCompany` above it. `fromCompany` has
been on the entry since round 3 as "the company whose core card the tick leaves", and
round 13 is what freed it to print: with the tick attaching to the layer's *name* rather
than to a card, §G.3a says the pairing "is carried by content, which is where it was always
carried". Where a label already names its company (the iOS edge's `Motive Fleet App`) it is
not printed twice. That is one conditional and no new string.

### The two ticks, and the two coordinates they had to hit

§I.1 row 2 replaces round 12's unbuildable "top-aligned to the tick" with a rule about what
a tick *means*, and the geometry falls out of it: the stroke centre sits on the platform
label's first baseline, one baseline shared by all three fields.

**Two things had to be built for that baseline to exist.** The edge fields carried no top
lead-in at all, so their labels sat 36px above the core's; they take `4px + 32px` now, the
core's cap plus its inner padding, which is §I.1's own arithmetic. And the ticks are hung
on the core label's own flex line — an empty flex item synthesises its baseline from its
border box, so a 2px stroke's bottom lands on the text baseline structurally rather than at
a measured offset. **The alignment is the spec and 50 is its consequence**, so `qa:worlds`
asserts the three baselines against each other and *prints* the 50. It measures **51.0px**
below the band's top border edge on the shipped Anek subset, at both 1024 and 1440.

**And a real defect the measurement caught, which reading would not have.** Each tick
reaches its boundary by hanging the core's own 32px of padding, so it lands on the boundary
exactly when the label's line runs the field's full inner width. It did not: `--measure-body`
is 32em, which at the label's size is **448px**, so at 1440 the label stopped at x 906 and
took the right-hand tick 76px short of the core's edge at 1014. A two-word structural label
is not prose with a measure; it is the field's name and here it is also the rail the ticks
hang on. With the cap off, measured: **x 286 and 738 at 1024, x 426 and 1014 at 1440** —
§G.3a's own four numbers. `qa:worlds` asserts both ends against the core's border box now,
so it cannot come back quietly.

Below 1024 the same rule rotated: a 2px stroke comes down onto each edge block's label
baseline, as an inline-block with `vertical-align: baseline` whose three margins sum to
zero, so it hangs in the edge's own 24px indent and moves no type.

### The seven collisions, closed by two compositions

| | Mark | Band | Was | Now |
|---|---|---|---|---|
| 1–4 | `/`'s `1,000+` and `downloads` at 360 and 390 | 232 / 262 | 309, ~302 / ~330 | **169** at both |
| 5–6 | `/tanya/`'s gates line at 360 and 390 | 232 / 262 | 305 | **207** at both |
| 7 | the same at 768 | 492 | 539 | **219** |

**The figures.** Three rows below 768, numeral in a 68px column from x 20 and the micro
label from x 104 on the same baseline. Measured, the numeral column is x 20 and 68 wide and
the label starts at x 104 at both widths — §B.8's coordinates exactly — and the widest ink
is `downloads` ending at **x 169**, not the 162 §B.8 derives. The 7px is the shipped
Instrument subset setting nine characters wider than the section's estimate, and it is the
same class of number as §G.3a's 50: the coordinates bind and the ink extent is reported.
63px clear at 360 either way.

**The gates block.** One gate per line, a real `<ul>` with no markers and no indent, split
at COPY §2.3's own commas. This is line-breaking and not copy: no word is reworded,
reordered or added. Two notes on it. The sentence's terminal full stop goes with the
sentence, because a list of items is not a sentence and no other item carries a stop — that
is the only mark this build touches. And **§G.3a's wireframe draws five gates; the shipped
line carries six** (`Spec`, `code and design review`, `device QA`, `security and privacy`,
`ASO`, `release cut`), because the wireframe was written against item 19's list and the
copy is §2.3's. The count is the copy's. The longest item is therefore `code and design
review` at 22 characters rather than §G.3a's `security and privacy` at 20, which is why the
measured ends are 207 and 219 rather than the section's 197 and 231.

**One thing the `<ul>` needed that a `<p>` did not.** A block `<li>` spans the core's whole
measure, so the *box* reached x 324 at 360 while the ink stopped at 207 — and `qa:plate`
failed it, correctly, because a line box is what a focus ring and a forced-colours backplate
draw. `max-content` with a `100%` cap makes each gate's box its own gate.

### §I.1's other rows

- **Row 3, §C.8.** Recorded, nothing to build: the 1px `--chalk` edge that carries the
  selected state shipped in run D, and round 13 replaces the unreachable 30% pixel-share
  test with the channel-delta test that edge already passes at 106–178.
- **Row 4, §C.4's 6% warm offset.** Deleted from the spec, and it was never in the source —
  grepped: no warm offset, no fifth fill, in `src/styles/` or in the floor's symbols. It
  comes off the open list without a diff.
- **The §B.10 wording correction** the run-D note asked for is made in DESIGN.md, and the
  build already implemented the surviving rule: reserve 1 exempts prose and headings, and
  `qa:plate`'s mark list is load-bearing marks plus the named regions.

### One thing to look at, and it is prose under the band by rule

At 360 the plate's rest position sits across the middle line of the Android edge's new
Motive annotation (`tanya-band-360-{light,dark}.png`). `.edge__note` is off `qa:plate`'s
mark list — §G.3a round 12 took it off as "prose in a container, which §B.10 exempts" — and
round 13's corrected promise says in terms that prose and headings may run under the band
everywhere except the named regions. So this passes by rule and not by exemption, and the
only fix that would remove it is a keep-out lane, which §B.5 and §B.10 both forbid in terms.
Recorded here so it is a decision on the record rather than something the final review finds.

### Measured, this machine, 2026-09-05

| Thing | Number |
|---|---|
| `qa:plate` | **560** marks, 8 routes × 8 widths, **0 failed, 0 flagged** — and no flag list left |
| Ticks | x **286 / 738** at 1024, x **426 / 1014** at 1440; three labels on one baseline **51.0px** below the band's top edge |
| Figures below 768 | numeral column x **20**, 68 wide; label from x **104**; widest ink **x 169** against a band at 232 |
| Gates line | ends x **207** at 360 and 390, x **219** at 768 |
| Fonts, both faces | **68,984 B** (48,432 + 20,552), 1,724 under PLAN.md §1.5's target; 126 and 134 glyphs |
| Home page total | **95,517 B** gzipped (HTML 13,221 + CSS 13,312 + fonts 68,984) |
| `/tanya/` total | **88,949 B** gzipped (HTML 6,653 + the same CSS and fonts) |
| `/sahib/` total | **89,075 B** gzipped (HTML 6,779) |
| CSS, all routes | 74,896 B raw / **13,312 B** gzip (33% of the 40 KB line) |
| JS shipped | **0 B external**, 1,253 B gzip of inline module script in the home HTML |
| Floor budget | **6,813 B** gzip of 81,920 |
| `qa` suite | 10 checks, all PASS: build, no-slop, images, links, console, contrast, worlds, plate, floor, weight |
| `qa:contrast` | 62 pairs across six palettes |
| `qa:worlds` | 38 assertions — 32 computed tokens plus the tick and baseline geometry at two widths |
| Lighthouse mobile, 3 runs, 8 routes × 2 schemes | **100 / 100 / 100 / 100**, except `/404.html`'s SEO at 66, which is `is-crawlable` on a `noindex` page and is the design |
| Worst LCP of the 48 runs | **1,530 ms** on `/work/pocket-manager/` dark (line 2,000) |
| TBT / CLS | **0 ms** and **0.0001**, 48 of 48 |
| Keyless build | 8 pages, no `.env` and no `PUBLIC_FIREBASE_*` in the environment, **0 external `<script src>`**, and the only "Firebase" in `dist/` is COPY §4.5's own sentence about Pocket Manager's stack |

Evidence in `docs/reviews/runE/engineer/`: `/` full page and the proof block and the floor's
`Owns` card at 360 and 390 in both schemes; `/tanya/` full page and the band at 1024 and
1440 in both, plus the band at 360 for the rotated ticks; both print PDFs and their
suppressed-background renders at A4's own 794px width; the Lighthouse run log, summary and
runner; and the two small scripts that produced the print and `Owns` frames.

### Left after this run, and none of it is a build decision

1. **Both headshots.** QUESTIONS.md item 23. The slots are still reserved at §F.7's
   320 × 320 and §F.8's 366 × 440 with no image and no placeholder, so filling them causes
   no reflow.
2. **§K's presentation packet for Tanya.** The six frames it names are `runB` and `runD`
   files; frames 1 to 4 are now stale against this build and the equivalents are in
   `docs/reviews/runE/engineer/`. Whose call the packet is has not been settled.
3. **The 360 plate over the Android annotation**, above — ruled, not open, but worth a look.

## qa:glyphs, added 2026-09-05

The committed `public/fonts/*.woff2` are hand-cut (`npm run fonts`) and CI's `astro build`
never regenerates them — a copy edit landing a character outside the committed subset
would render as tofu with nothing catching it. `scripts/check-glyphs.mjs` (`npm run
qa:glyphs`, wired into the `qa` chain and the CI QA step) closes that: it walks
`dist/**/*.html`, maps every painted character (text nodes, plus `alt`/`aria-label`/
`title`) to the face the site's own CSS renders it in — read out of the CSS itself, not
guessed — and checks that face's cmap via `fontkit@2.0.4` (new, pinned devDependency).
Passes clean on the current build (21,459 characters checked, 0 uncovered). Proved the
failure path by appending `₹` to `src/data/agents/programmer.json`'s `job` string,
rebuilding, and confirming the gate fails naming `U+20B9 "₹"` and `dist/index.html`;
reverted and confirmed green again.

## Comment sweep and qa:no-slop's new HTML-comment gate, 2026-09-05

`docs/reviews/final-fact-check.md`'s finding 1: COPY.md §7.1's second `/tanya/` intro
paragraph was cut under DESIGN.md §J but left live in an HTML comment in
`src/pages/tanya/index.astro`, and that comment ships verbatim in `dist/tanya/index.html`
— checked directly, `compressHTML` (on by default, nothing overrides it in
`astro.config.mjs`) strips inter-tag whitespace only, never `<!-- -->` content, so the
gate below is not redundant against it. Removed that comment, then grepped all of `src/`
for the same failure class: any `<!-- -->` in an `.astro` template body (they render
verbatim into `dist/**/*.html`, unlike frontmatter/`.ts`/`<style>`/`<script>` comments,
which are either compiled away or stripped by the build's minifier — confirmed by
grepping dist for a `<script>`-block comment string and finding nothing). Removed 32 such
comments across 11 `.astro` files (WorkCardStrip, ThemeToggle, 404, index, BaseLayout,
`layouts/tanya/LayoutA`, `components/floor/StudioFloor`, `pages/tanya/index` (2, past the
one above), `pages/sahib/index`, `pages/work/index`, `pages/contact/index`) plus 11 more
in `src/components/floor/symbols.ts`, whose SVG defs are template strings reached through
`set:html` and so leak exactly the same way — confirmed by grepping the pre-fix `dist/`
for the lamp-gradient comment text and finding it. Left untouched: `.ts`/frontmatter/
`<style>`/`<script>` comments that explain a mechanism (why a `display: contents` toggle
decides the plate's containing block, why `<cite>` needs `font-style: normal`, etc.) —
these never reach dist and are the legitimate home for engineering rationale; the
§-citations, round numbers and ruling references inside them are fine there. What must
never sit in *any* comment, per the fact-check finding, is a verbatim cut copy string —
none remain.

Added the check to `scripts/qa-no-slop.mjs` (already the first step in `qa` and its own
named CI step) rather than a new script: walks `dist/**/*.html`, flags every `<!-- -->`
except a conditional comment (`<!--[if ...]>`, which Astro's static output never emits
here but the allowance costs nothing). Verified both directions — clean build passes;
injecting `<!-- test leak -->` into a built `dist/index.html` and rerunning fails naming
the file, line and snippet. Full `npm run qa` (all twelve steps) green after the sweep.
