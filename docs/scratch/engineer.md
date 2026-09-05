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
