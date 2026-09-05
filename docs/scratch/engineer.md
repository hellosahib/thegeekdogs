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
