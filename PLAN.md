# PLAN.md — Engineering plan, Pass 1

Owner: Engineer. Scope: Astro/Tailwind architecture, content schemas, routing, build, deploy, CI, Lighthouse CI, QA scripts. This document does not contain user-facing copy or design tokens — where an example value is needed, it's written as `<field-name>`. Where I have not verified an API against current docs, it's marked **verify at build**.

Companion file: `docs/scratch/engineer.md` — alternatives considered and rejected.

---

## 1. Stack decisions

### 1.1 Astro 5 static, TS strict, islands policy

`astro.config.mjs`: `output: 'static'`, `site: 'https://thegeekdogs.com'`, `trailingSlash: 'always'` (§9 below), `tsconfig.json` extending `astro/tsconfigs/strict`.

**Islands policy: zero UI framework, by default zero JS.** No React/Vue/Svelte/Preact is added to the project. §6's "small amount of JS" for the floor, §6.1's card interactions, and §10's orchestrated moments are all achievable with plain `<script>` modules (`type="module" defer`) scoped per component via Astro's script hoisting, driving native DOM APIs (WAAPI via Motion One mini, `popover`/`<dialog>`, `matchMedia`). Introducing a component framework for islands would mean shipping that framework's runtime (even Preact's ~4KB, even "just for one card") against a 100KB JS budget that the floor and cards alone should consume a small fraction of. If a genuine case for client-side reactivity turns up (none identified yet — the content is static per-request), it gets argued against §11's JS line before it's added, not assumed.

Justification against §11: "Islands only where interactivity is real" is satisfied by having *no* framework islands at all — every interactive surface (floor desks, work cards, stage indicator, contact affordance) is real interactivity implemented directly against the DOM, not framework-mediated. This is the strictest reading of "default is zero JS."

### 1.2 Tailwind v4 with a hand-authored token layer

Tailwind v4 config is CSS-first: no `tailwind.config.js`, an `@theme` block in the global entry CSS (`src/styles/global.css`) is what generates utility classes and registers them as CSS custom properties.

**How DESIGN.md tokens become CSS custom properties:** DESIGN.md ships 4-6 named hex values, typeface roles, and layout guidance per world. Those land in three places:

1. `src/styles/tokens.css` — semantic custom properties only (`--color-surface`, `--color-ink`, `--color-accent`, `--font-display`, `--font-body`, spacing/radius scale), declared once on `:root` with the **studio** world's values as the fallback/default, then re-declared under `[data-world="sahib"] { ... }` and `[data-world="tanya"] { ... }` scopes with that world's values. This file is where a DESIGN.md value change is a one-line edit.
2. `src/styles/global.css`'s `@theme` block maps Tailwind's utility namespace onto those variables (e.g. `--color-surface: var(--color-surface);` inside `@theme` so `bg-surface` compiles once), rather than hard-coding hex values into `@theme` itself. This indirection is what makes the token layer swappable without touching `@theme` or regenerating utilities.
3. A single `data-world` attribute on a wrapper per route (set server-side in the relevant layout — `data-world="studio"` on the root layout, overridden to `"sahib"`/`"tanya"` on those routes) scopes which variable set is live. One Tailwind build, one CSS bundle, three visual worlds — satisfies §11's "not three builds."

**How Tanya's direction stays swappable (§9.3) without touching shared components:** her page imports a layout module — `src/layouts/tanya/LayoutA.astro` or `LayoutB.astro` — selected by a single import line in `src/pages/tanya/index.astro`. Her token overrides live in their own partial (`src/styles/worlds/tanya.css`), imported once, never referenced by shared components (nav, work cards, contact affordance, footer). Switching her direction after the late review in §9.3 is: (a) change which layout module `/tanya/` imports, (b) point at a different token partial if the rejected direction used different values, both changes confined to files under `layouts/tanya/` and `styles/worlds/`. Shared components only ever consume the generic `--color-*`/`--font-*` names, never a Tanya-specific one, so they cannot regress when her direction flips.

**Not yet verified against current Tailwind v4 docs:** the exact mechanic of pointing `@theme` at a `var()` rather than a literal value (Tailwind v4's `@theme` is documented as accepting CSS custom properties, but I have not built and measured this indirection pattern in this codebase) — **verify at build**, with a fallback of hand-writing the theme-consuming utilities as plain CSS classes (`.bg-surface { background: var(--color-surface); }`) outside `@theme` if the indirection doesn't compile cleanly.

### 1.3 Motion library: Motion One vs GSAP

- GSAP core: ~23-27KB gzip; ScrollTrigger and other plugins add more per plugin (individually tree-shakeable). All plugins are free now (Webflow made GSAP 100% free, April 2025), so this is a weight argument, not a licensing one.
- Motion One / "Motion" `animate()`: **mini** build ~2.3KB gzip (WAAPI-only, hardware-accelerated, no timeline/sequencing extras); **hybrid** build ~18KB (adds independent transforms, motion values, sequencing).

**What the floor and cards actually need:** the idle loop (monitor glow, slow blink) is a looping, low-amplitude, no-jitter animation — pure CSS `@keyframes` handles this with zero JS, and it's the only way to guarantee it's trivially killed by `prefers-reduced-motion` (wrap the keyframe rule in `@media (prefers-reduced-motion: no-preference)`, nothing to toggle in JS). The remaining needs — card open/close, a staggered desk reveal, the stage-indicator's step transition, one orchestrated per-page moment (§10) — are one-shot, WAAPI-expressible animations.

**Pick: Motion One mini (~2.3KB gzip) for the handful of JS-driven, one-shot moments; CSS for everything looping/idle; no GSAP.** GSAP's extra ~20KB+ buys sequencing/plugin capability nothing on this site needs. Considered "no library at all" seriously — CSS alone covers idle states and simple transitions, but coordinating multiple elements against user input (staggered reveal, synchronized open/close) in raw WAAPI without a thin wrapper reinvents what Motion One's 2.3KB already gives cleanly.

### 1.4 Lenis: out

Under 4KB gzip on its own, so not a budget problem, but rejected on fit: the floor's desks must be real, natively-focusable `<button>` elements, and scroll-hijacking libraries have a history of fighting native focus-scroll-into-view and native momentum scroll — exactly the behaviour §6 requires to be perfect. Native scroll is also simply faster to respond (matters for INP on a conversion page) than an eased scroll layer. Revisit only if a specific page's "one orchestrated moment" (§10) needs scroll-linked choreography — check CSS `animation-timeline: scroll()` support first (**verify at build**), since that would replace Lenis at zero JS cost if supported broadly enough.

### 1.5 Fonts: self-hosting pipeline — measured against DESIGN.md §B.3, round 3

DESIGN.md §B.3 names the actual faces: **Anek Latin** (SIL OFL, variable `wght` 100–800 **and** `wdth` 75–125, by Ek Type, via Fontsource) for display/numerals, and **Instrument Sans** (SIL OFL, variable `wght` 400–700) for body. Both are self-hosted, not Google Fonts CDN (excluded by §11). This section replaces Pass 1's 15-30KB/face guess with real measurements, since a two-axis variable font is not the same weight class as the single-axis font Pass 1 pictured.

**Measured, not estimated (checked 2026-09-05).** Fetched both packages' file manifests from `data.jsdelivr.com` for `@fontsource-variable/anek-latin@5.3.0` and `@fontsource-variable/instrument-sans@5.3.0` (npm packages Fontsource itself publishes, the same files `1.5`'s original text pointed at), downloaded the actual `.woff2` binaries from `cdn.jsdelivr.net/npm/@fontsource-variable/...`, and ran `pyftsubset` (fonttools 4.64.0, installed locally for this check) against a representative Latin working-copy subset (`U+0020-007E,U+00A0,U+2013-2014,U+2018-201F,U+2026,U+2605` — base ASCII, nbsp, en/em dash, curly quotes, ellipsis, and the star glyph the 4.6★ figure needs). This is a stand-in for glyphhanger's dist-crawl (below); the real subset will differ slightly once actual copy exists, but is very unlikely to be larger since typographic punctuation is already over-included here.

| File | Axes shipped | Raw, unsubsetted | Raw, subsetted (this check) |
|---|---|---|---|
| Anek Latin, `latin-standard` (Fontsource's combined-axis build) | `wght` 100–800 + `wdth` 75–125 | 103,760 B (101.3 KB) | 69,680 B (68.1 KB) |
| Anek Latin, `latin-wght` (Fontsource's single-axis build) | `wght` 100–800 only, `wdth` pinned 100 | 44,796 B (43.75 KB) | 29,276 B (28.6 KB) |
| Instrument Sans, `latin-wght` (single-axis build; DESIGN.md only asks for `wght`) | `wght` 400–700 only | 30,092 B (29.4 KB) | 20,328 B (19.9 KB) |

**woff2 does not compress further under gzip** — measured directly (gzip on the raw files above changed size by less than 0.1%, and in every case made the file marginally *larger* than the woff2 encoding alone, because woff2 already applies its own Brotli-based compression). So "gzip size" and "raw woff2 size" are the same number for every row above and below — there is no second compression pass to bank on, unlike the JS/CSS lines in §7.

**The honest total, two-axis Anek + Instrument Sans, both subsetted: 69,680 + 20,328 = 90,008 B ≈ 87.9 KB.** Against Pass 1's ~50KB (2 faces × ~25KB) assumption, that is +76%. This is the real number DESIGN.md's font choice costs, and it does not fit the old line — **but it fits the site's actual budgets once corrected below**, because §11's binding ceiling is the 1.2MB total-page-weight line, not the withdrawn 50KB placeholder.

**Mitigation — costs the design nothing, measured:** DESIGN.md's own type scale (§B.4, §F.5, §G.2) never asks for a `wdth` value above 100 anywhere on the site — hero is `wdth 100` (the axis default), numerals and Sahib's headers are `wdth 87.5`, Tanya's labels are `wdth 75`. The shipped file's `wdth 100–125` half of the axis is dead weight for this brief. Restricting the axis range (not pinning it — the axis stays live, just narrower) via `fonttools varLib.instancer anek-latin-latin-standard-normal.woff2 wdth=75:100` and re-subsetting: **52,076 B (50.9 KB)**, a 25% cut with zero effect on anything DESIGN.md specifies, since nothing above `wdth 100` is ever asked for. This range restriction is now part of the font build step, not optional:

- Anek Latin, `wght` 100–800 + `wdth` **75–100** (range-restricted), subsetted: **~50.9 KB**
- Instrument Sans, `wght` 400–700 only, subsetted: **~19.9 KB**
- **Revised font payload total: ~70.7 KB.** Still above the old 50KB guess, comfortably inside the 1.2MB total-page-weight line (§7), and now the number actually reflects what DESIGN.md asks for rather than a Pass-1 placeholder.

**The alternative mitigation DESIGN.md itself anticipated — dropping the `wdth` axis entirely for a static-width instance — is measured too (~28.1KB, matching Fontsource's own single-axis `wght`-only build) but is *not* recommended**, because it is strictly worse than the range-restriction above on every axis: it saves only ~23KB more, and it costs real design intent — §B.3's numeral "ticket" quality (`wdth 87.5`) and §G.2's condensed Tanya labels (`wdth 75`, "lets the three-column layout hold at 1024") both stop working. The range-restriction mitigation gets nearly the same file-size relief with none of that cost, so it is the one specified here.

**LCP-specific note:** §11's LCP line cares about render-blocking bytes on the preload path, not the whole font payload. Since only the hero headline's exact face+weight+width instance (`Anek 600 / wdth 100`) is the actual preload candidate (this section's own preload rule, below), a further-restricted build — `fonttools varLib.instancer` pinning `wght=600 wdth=100` fully static, then subsetting — was also measured: **12,528 B (12.2 KB)**. Preloading this ~12.5KB static instance for the hero text specifically, and loading the full range-restricted variable file (50.9KB) non-blocking for everything else (numerals, other weights, Tanya's labels), is recommended over preloading the full variable file just to render one instance of it. `font-display: swap` means the fallback system font paints immediately regardless, so this doesn't change *whether* LCP is met, but it does cut the bytes competing for bandwidth on the critical path, which is the more actionable lever than the font's total size.

**Tabular figures confirmed present — DESIGN.md's fallback is not triggered.** Checked the actual `GSUB` feature list in the downloaded Anek Latin binary (fontTools): `ccmp, dnom, frac, liga, locl, numr, rvrn, tnum`. `tnum` (tabular figures) ships in this build, so `font-variant-numeric: tabular-nums` works as DESIGN.md §B.3 specifies without needing the Spline Sans Mono fallback. No third face.

**Sources, checked 2026-09-05:**
- `https://data.jsdelivr.com/v1/packages/npm/@fontsource-variable/anek-latin@5.3.0` (file manifest + sizes)
- `https://data.jsdelivr.com/v1/packages/npm/@fontsource-variable/instrument-sans@5.3.0` (file manifest + sizes)
- `https://cdn.jsdelivr.net/npm/@fontsource-variable/anek-latin@5.3.0/files/anek-latin-latin-standard-normal.woff2` and sibling files (actual binaries, downloaded and measured locally)
- `https://cdn.jsdelivr.net/npm/@fontsource-variable/anek-latin@5.3.0/scss/metadata.scss` and the Instrument Sans equivalent (axis ranges, confirmed `wdth` 75–125 on Anek, `wdth` 75–100 + `wght` 400–700 + `ital` on Instrument Sans — Instrument Sans ships a `wdth` axis too, unused by DESIGN.md, left at its default 100)

**Remaining pipeline, unchanged from Pass 1 except as noted above:**
- Subsetting: **glyphhanger**, run against the *built* `dist/` output (`glyphhanger --subset=*.woff2 --formats=woff2 https://localhost:PORT/**` or its dist-crawling equivalent) rather than the hand-picked Latin subset used for this estimate, so the real subset is exactly the glyph set the three worlds' actual copy uses. `pyftsubset` (fonttools) is the fallback if glyphhanger's crawl step is awkward in CI — same underlying subsetting engine, and the same one used to produce the numbers above. The `wdth`-range restriction (75–100) is applied via `fonttools varLib.instancer` as a build step before or after glyphhanger's subsetting pass — order doesn't matter, both operate on the binary.
- Preload: only the hero's exact face+weight+width instance, ideally the further-restricted ~12.5KB static build described above, one `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `<head>`. No other face or instance is preloaded.
- `font-display: swap` on every `@font-face`.
- CLS risk from swap-induced reflow: match the fallback system font's metrics via `ascent-override`/`descent-override`/`size-adjust` (a tool like Fontaine or Capsize-derived values) so the swap doesn't shift layout — **verify at build**, flagged in the budget table as an at-risk CLS line.
- **Does the LCP plan still hold?** Yes. `font-display: swap` decouples the hero text's first paint (and therefore LCP, since LCP for a text node is satisfied by the fallback-font paint under swap) from font download time, so the extra ~20-40KB this round found does not by itself push LCP over 2.0s — it competes for bandwidth on the same connection as render-blocking CSS, which is a real but secondary cost, addressed by preloading only the ~12.5KB static hero instance rather than the full variable file. The CLS risk from the swap (already flagged, unchanged) is the line that actually needs the fallback-metric-matching step to hold, regardless of which font is chosen.

### 1.6 Images

Astro's built-in image pipeline (`astro:assets`, `<Image>`/`<Picture>`, sharp service): `formats: ['avif', 'webp']` with a same-size fallback, explicit `width`/`height` (or `layout` with intrinsic aspect ratio) on every image to prevent CLS, `loading="lazy" decoding="async"` on everything below the fold, `loading="eager" fetchpriority="high"` reserved only if an actual image ever becomes the LCP candidate (unlikely — §6 requires the headline text to paint first, so by design no image should be the LCP element on the home page). Screenshots (Pocket Manager, wedding planner) go through the same pipeline with hashed, content-addressed filenames in `dist/`.

### 1.7 OG images at build time

Satori (HTML/CSS/JSX → SVG) + `@resvg/resvg-js` (SVG → PNG), run inside a prerendered Astro endpoint (`src/pages/og/[slug].png.ts`, `export const prerender = true`), one route per page needing a card, generated from the same content-collection data the page itself renders — so OG copy can't drift from on-page copy. Picked over `astro-og-canvas`: canvas-API template generation is reported as too fixed-layout for what the home OG needs, which is to actually render the floor composition (reusing the floor's own `<symbol>` defs, not a generic title-card template). Runs entirely at build time; zero runtime cost, matches static-only constraint.

### 1.8 Analytics

> **Superseded by QUESTIONS.md item 35, answered: Firebase Analytics.** The owner picked a third option neither this section nor the question offered. The recommendation below is kept for the record; what is built is described in **§1.8a**. The brief's two objections to a Google analytics product — script weight, and the consent banner a cookie-setting tracker obliges — are answered by measurement and by configuration respectively, not waived.

### 1.8a Firebase Analytics, as built (build step 1)

- **No consent banner, by configuration.** Google Consent Mode defaults are set to `analytics_storage: 'denied'` (along with the three ad-storage signals) via `setConsent` before `initializeApp` runs. Under denied analytics storage the SDK writes no cookie and no device identifier; it sends cookieless pings only. There is nothing stored to consent to, so no banner is owed and none is built.
- **Weight, measured 2026-09-05 against `firebase@12.18.0`: 15,806 B gzip total.** That splits into a 915 B gzip bootstrap in the page and a 14,891 B gzip lazy chunk (`firebase/app` + `firebase/analytics`, 72,293 B raw). 15.4% of §11's 100KB JS line.
- **Load timing.** The SDK is a dynamic `import()`, requested only after the window `load` event and then only inside `requestIdleCallback` (4s timeout, `setTimeout` fallback). Nothing about it is on the critical path: LCP and TBT are unaffected, measured at 0 B of script on the initial load path.
- **Events.** One delegated, passive, capture-phase `click` listener fires `cta_click` for any `[data-cta]` control and `mailto_click` for any `a[href^="mailto:"]` — the two §13 requires. No per-element wiring, so a new CTA is tracked by carrying the attribute.
- **Config never enters the repo.** The seven values are read from `import.meta.env.PUBLIC_FIREBASE_*`; `.env.example` documents the names. When they are unset the guard is statically false, the import is dead code, no chunk is emitted, and the page ships zero JavaScript. A build without analytics config is a smaller build, not a broken one.

### 1.8b Plausible, the superseded recommendation

**Plausible**, not Cloudflare Web Analytics, not Google Analytics (excluded explicitly by §13). This reverses Pass 1's pick after checking current Cloudflare documentation rather than assuming: Cloudflare Web Analytics reports page views and Core Web Vitals only, and its own FAQ states plainly that custom events are not supported — *"Not yet, but we may add support for this in the future."* (https://developers.cloudflare.com/web-analytics/faq/, checked 2026-09-05). §13 requires tracking CTA clicks and mailto-link clicks; Cloudflare Web Analytics cannot meet that requirement today, so it cannot be the pick, no matter how favorable its price or script weight.

**Plausible meets the requirement.** Its "tagged events" mechanism tracks clicks by CSS class name with no custom JS: adding a `plausible-event-name=<Name>` class to any element (e.g. `plausible-event-name=CTA+Click` on a `[data-cta]` element, `plausible-event-name=Mailto+Click` on `a[href^="mailto:"]`) is enough — the tracking script itself detects the class on click and fires the event (https://plausible.io/docs/custom-event-goals, checked 2026-09-05). Script weight, measured directly rather than assumed (fetched both files from plausible.io and gzipped locally, 2026-09-05): the base `script.js` is ~1.3KB gzip; the `script.tagged-events.js` variant this site needs (base pageview tracking plus class-based tagged events) is ~4.2KB raw / ~1.8KB gzip — both trivial against the 100KB JS line and smaller than Motion One mini alone.

**Cost, not free:** Plausible's Starter plan is $9/month for up to 10,000 combined pageviews+events per site (https://plausible.io, pricing page, checked 2026-09-05). This is a real recurring cost, not an engineering decision — it is stated as a line in `QUESTIONS.md` (§G, item 35) for the owners to approve, not decided here.

**Cloudflare Web Analytics stays documented as the free fallback** if the owners decline the recurring cost: no cookies, no consent-banner obligation, free indefinitely, page views and Core Web Vitals only — but choosing it means accepting that the site cannot meet §13's CTA/mailto click-tracking requirement. That tradeoff is spelled out in `QUESTIONS.md`, not silently absorbed.

### 1.9 Contact form service

**Formspree**, free tier: 50 submissions/month per form, honeypot (`_gotcha`) spam handling with no client-side JS and no third-party challenge widget — the form is a plain `<form method="POST" action="https://formspree.io/f/<form-id>">`, functioning even with JavaScript disabled, consistent with the zero-JS-by-default policy. Web3Forms (250/month free, built-in hCaptcha) is the documented fallback if 50/month proves too low once real lead volume is known — flagged as a budget/capacity risk in §7 and §12, tied to the still-open §5.1 capacity `[FILL]`.

**End-to-end submission test evidence (§14 QA gate):** QA submits a real test entry through the live, deployed form (not a markup inspection), captures a screenshot of the Formspree dashboard showing the received submission and a screenshot/forward of the resulting notification email at `thegeekdogs@gmail.com` (or the real intake address once §5.1's `[FILL]` resolves), both attached to the relevant `REVIEWS.md` entry. This is scripted as a documented manual QA step, not automated — a real external service, submitted live, is the point.

### 1.10 Trailing slash and lowercase URLs

`trailingSlash: 'always'` — matches §8's IA, which is written entirely in directory form (`/work/`, `/sahib/`, `/contact/`), and matches static-site folder/`index.html` output so `astro dev`, a local `npx serve dist` check, and the deployed Pages site all agree on one canonical URL shape. Rejected `'never'` (fights the brief's own IA) and the default `'ignore'` (under-specified — doesn't pick a canonical form for sitemap/OG/JSON-LD).

Lowercase enforcement: every content-collection `slug` field is validated with a Zod regex (`/^[a-z0-9-]+$/`) at the schema level, so an uppercase slug fails the content build rather than shipping; a CI check (part of `qa:no-slop`, §9) additionally scans generated `dist/**/index.html` paths for any uppercase character and fails the build if found, as a backstop against a hand-written redirect or static route bypassing the schema.

---

## 2. Content collections

All schemas in `src/content.config.ts` using Astro 5's Content Layer API (`defineCollection` + `glob`/`file` loaders, Zod schemas). TypeScript is used here per the brief's explicit carve-out — the schema is the content contract.

```ts
// src/content.config.ts
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const slug = z.string().regex(/^[a-z0-9-]+$/, 'lowercase, hyphenated slug only');

const gates = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/gates' }),
  schema: z.object({
    slug,
    order: z.number().int().nonnegative(),
    name: z.string().min(1),
    description: z.string().min(1),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/people' }),
  schema: ({ image }) => z.object({
    slug,
    name: z.string().min(1),
    pronouns: z.string().min(1).optional(), // the brief supplies pronouns for Sahib only (§5.4) — required would force inventing Tanya's; when absent, Person JSON-LD and copy simply omit pronouns rather than guessing
    city: z.string().min(1),
    headlineRole: z.string().min(1),
    currentEmployer: z.string().min(1),
    bio: z.string().min(1),
    gatesOwned: z.array(reference('gates')),
    socials: z.object({
      github: z.string().url(),
      linkedin: z.string().url(),
      x: z.string().url().optional(),
      blog: z.string().url().optional(),
      email: z.string().email().optional(),
    }),
    headshot: image(),
    headshotAlt: z.string().min(1),
    workHistory: z.array(z.object({
      company: z.string().min(1),
      whatTheyDo: z.string().min(1),
      years: z.string().min(1), // display string, e.g. "<start> – <end>" or "<start> – now"
      role: z.string().min(1),
      productsStack: z.array(z.string().min(1)),
      confirmed: z.boolean(),
    })),
  }),
});

const agentsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/agents' }),
  schema: z.object({
    slug,
    name: z.string().min(1),
    job: z.string().min(1),
    checkedBy: reference('gates'),
    deskSlot: z.string().regex(/^desk-\d+$/, 'desk slot id, e.g. "desk-7"'), // named slot the floor SVG defines, not raw coordinates — keeps content decoupled from layout. Slot *count* is deliberately not hard-coded here (COPY.md §2.4 lists seven agent desks; an enum of six would be wrong the moment that count moves again) — see the build-time validation note below the schema block.
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/products' }),
  schema: ({ image }) => z.object({
    slug,
    name: z.string().min(1).nullable(), // null until a final name is chosen (§5.3) — never a placeholder string
    descriptiveName: z.string().min(1), // always present; what renders in headings/nav/OG/JSON-LD while name is null
    stage: z.enum(['specced', 'building', 'final-touches', 'submitted', 'live']),
    storeUrl: z.string().url().nullable(),
    storeStats: z.object({
      rating: z.number().min(0).max(5),
      ratingCount: z.number().int().nonnegative(),
      downloads: z.string().min(1), // display string, e.g. "<1K+>" — matches the store listing's own rounding, never invented
      lastUpdated: z.string().min(1), // ISO date string
    }).nullable(),
    privacyClaimEnabled: z.boolean().default(false),
    features: z.array(z.string().min(1)), // only reachable, shippable features belong here — there is no field for unreachable/hidden functionality, so it structurally cannot leak
    screenshots: z.array(image()).default([]),
  }),
});

export const collections = { gates, people, agents: agentsCollection, products };
```

**`sameAs` note:** there is no `sameAs` field on the `people` schema — the block above is what actually gets written. Rather than hand-duplicating the socials object into a flat array in every person's content file (a place a typo could silently diverge from `socials`), `sameAs` is computed at the point of use — a small helper (`src/lib/person.ts`) that maps `Object.values(person.data.socials).filter(Boolean)` into the array the `Person` JSON-LD needs. This is a data-shape decision, not a content decision, so it lives as a helper function, never a schema field.

**`deskSlot` validation note:** the schema only constrains *shape* (`desk-\d+`), not the valid *set* of slot ids — that set is owned by the floor component, not the content schema, per the same decoupling `deskSlot` is meant to express. A build-time check (run as part of `qa:build`, before `qa:no-slop`) reads the canonical list of slot ids the floor component actually defines — exported once from a single source of truth (e.g. `src/components/floor/deskSlots.ts`, a `const DESK_SLOTS = ['desk-1', ...] as const` that both the SVG-generating component and this check import) — and cross-checks every `agents` entry's `deskSlot` against it. Any agent referencing a slot the floor doesn't define, or any floor-defined slot with no agent assigned to it (the empty chair excepted, which isn't an `agents` entry at all), fails the build with a printed list of the mismatched ids. This makes a slot-count change (six desks to seven, or any future change) a one-file edit to `deskSlots.ts` that immediately surfaces any content file left pointing at a stale slot — never a silent drift between content and layout.

### 2.1 The wedding planner entry, today and later

`src/data/products/wedding-planner.json` today:

```json
{
  "slug": "wedding-planner",
  "name": null,
  "descriptiveName": "<the descriptive, non-placeholder name Copywriter provides — e.g. \"the wedding planning app\">",
  "stage": "final-touches",
  "storeUrl": null,
  "storeStats": null,
  "privacyClaimEnabled": false,
  "features": ["<feature-1>", "<feature-2>"],
  "screenshots": ["<asset-path-1>", "<asset-path-2>"]
}
```

Once the name is chosen and the app ships:

```json
{
  "slug": "wedding-planner",
  "name": "<final chosen name>",
  "descriptiveName": "<same descriptive fallback, kept for continuity>",
  "stage": "live",
  "storeUrl": "<play store or app store URL>",
  "storeStats": { "rating": 0, "ratingCount": 0, "downloads": "<downloads string>", "lastUpdated": "<date>" },
  "privacyClaimEnabled": false,
  "features": ["<feature-1>", "<feature-2>", "<feature-3>"],
  "screenshots": ["<asset-path-1>", "<asset-path-2>", "<asset-path-3>"]
}
```

Every field that changes between these two states is a plain JSON edit. No component under `src/components/` or `src/pages/work/wedding-planner.astro` references `name`, `storeUrl`, `stage`, or `storeStats` by a hard-coded literal — the templates branch on presence/absence (`{name ?? descriptiveName}`, `{storeUrl && <a href={storeUrl}>...}`, the stage indicator reading `stage` directly) so filling these in later is content work, never a code change.

### 2.2 Where the privacy flag and stage field live

Both are single top-level fields on the `products` schema (`privacyClaimEnabled: boolean`, `stage: enum`), stored per-product in that product's own JSON file under `src/data/products/`. Flipping either is opening one file and changing one line — no other file references either value except the template that reads it for rendering (`/work/pocket-manager/`'s page component reads `privacyClaimEnabled` to decide whether the stronger privacy paragraph renders at all; every product page's stage-track component reads `stage` to compute which `<li>` gets `aria-current="step"`).

---

## 3. Routing

Routes per §8, all under `src/pages/`, static output:

```
src/pages/index.astro                        → /
src/pages/work/index.astro                    → /work/
src/pages/work/pocket-manager/index.astro     → /work/pocket-manager/
src/pages/work/wedding-planner/index.astro    → /work/wedding-planner/   (descriptive slug, enforced by content, never the placeholder name)
src/pages/sahib/index.astro                   → /sahib/
src/pages/tanya/index.astro                   → /tanya/
src/pages/contact/index.astro                 → /contact/
src/pages/404.astro                           → /404.html (Astro's static build emits this exact filename for src/pages/404.astro)
```

**Persistent contact affordance — superseded by DESIGN.md §B.10, round 3.** Pass 1 specified `position: fixed`; DESIGN.md §B.10 specifies `position: sticky; bottom: 0` on the plate, nested inside a wrapper `<div>` that spans from the end of the hero section to the start of the final-CTA section — "It appears when the hero leaves, follows down the page, and retires on its own when the real CTA arrives. No JS, no scroll listener, no dismiss state." This is feasible as specified, confirmed against three specific interactions this Engineer's own architecture raises:

1. **Interaction with `content-visibility: auto` on the floor section (§4.5).** The floor sits between the hero and the final CTA, i.e. inside the sticky wrapper's span. `content-visibility: auto` is applied to the floor `<section>` itself, not to the sticky wrapper — the wrapper stays normally rendered throughout. Sticky positioning only depends on the containing block's (the wrapper's) own box geometry, not on how its descendants are painted, so a descendant skipping paint while off-screen doesn't disturb the plate's stuck/unstuck calculation. The one real coupling: the floor section's `contain-intrinsic-size` (already required by §4.5 to prevent CLS on its own) must be measured/set **after** §B.10's own reserve (next point) is applied to that section, not before — otherwise the intrinsic-size placeholder undershoots the section's real height by exactly the reserved padding, and the CLS the `content-visibility` pairing exists to prevent comes back in through this side door. Noted as a build-order dependency between §4.5 and §B.10, not a blocker.
2. **Interaction with the +56px section padding reserve.** DESIGN.md: "every section it can overlay gets +56px bottom padding, so it never covers content and never causes CLS." Because this reserve is a static, build-time CSS value (not computed at runtime), it contributes zero to CLS by construction — it's part of the section's initial layout box from first paint, not a later adjustment. No new CLS risk, provided (per point 1) the floor section's `contain-intrinsic-size` accounts for it.
3. **INP.** `position: sticky` with no scroll listener and no JS is a compositor-level operation — it costs nothing on the main thread, which is the same zero-JS bias already used for the floor's idle loop (§4.4) and the old fixed-position plate. No INP risk; if anything this is a cleaner win than Pass 1's `position: fixed` version since neither approach needed JS, but sticky additionally guarantees the "retires before the final CTA" behavior geometrically, without a scroll-position check.

**One implementation note the sticky wrapper needs that DESIGN.md doesn't have to specify (a feasibility detail, not a design decision):** at ≥768 the visible plate is a 260×56px box bottom-right, but the *sticky wrapper* spans the section's full width and a large vertical range. The wrapper itself must carry `pointer-events: none` with the inner plate element carrying `pointer-events: auto` — otherwise the wrapper's own (invisible) box would sit on top of whatever is normally at that position (e.g. the floor's near-right desk, which is exactly where DESIGN.md's own composition puts the empty chair, §C.3) and silently swallow clicks/taps meant for the content underneath. This is a one-line CSS addition, not a design change.

A single shared partial (`src/components/ContactAffordance.astro`), included once in the base layout, with real, visible text (not an icon-only bubble) — the email as a `mailto:` link — no modal, no dismiss-and-reappear-on-exit-intent logic.

**Person-page quiet way back:** a small text link (`src/components/QuietBack.astro`) placed at the top of `/sahib/` and `/tanya/` — a single plain-text anchor to `/`, carrying the exact label and accessible name COPY.md §1 "Back to the studio" specifies, with no arrow or other decorative character glued to the link text (banned by brief §9.4's anti-generic rules), styled as inline text sized and positioned per that world's tokens — explicitly not a repeated site-wide header/nav bar, since §8 calls out that a "bolted-on studio header" is the wrong shape here.

**404 handling on Pages:** `src/pages/404.astro` builds to `dist/404.html`, which GitHub Pages serves automatically for any unmatched path on a custom domain (this is GitHub Pages' documented behavior for a root-level `404.html`, not an Astro-specific mechanism) — no additional Pages configuration needed beyond the file existing at the build root.

**404's empty room — shared SVG assets without a shared runtime sprite, round 3.** DESIGN.md §B.11 has `/404` reuse the floor's slab symbol and lamp gradient, "so it costs roughly zero new bytes." This is a static multi-page build (§1.1 — one Astro route per page, one standalone HTML file each), so a `<use>` referencing another page's inline `<defs>` isn't available the way it would be in a single-page app's shared sprite sheet — the referencing element and the referenced `<symbol>`/gradient must live in the same document. Two ways to get the same source-level sharing DESIGN.md is asking for without a runtime cross-document fetch:

- **Picked: author the slab polygon and the lamp's two-stop `linearGradient` once as a shared Astro component** (e.g. `src/components/floor/FloorSlab.astro`), imported into both `index.astro` (full floor, all eight stations) and `404.astro` (empty room, slab + lamp only, no desks/chair/buttons). Astro compiles this into two independent, self-contained HTML outputs — the *source* is DRY (one definition, one place to update the slab geometry or the gradient stops), the *shipped bytes* are duplicated inline per page. This is the right tradeoff at this size: an external SVG sprite fetched via `<use href="/sprite.svg#slab">` would add a second HTTP request and a flash-of-missing-icon risk on the 404 page for an asset this small — not worth it against DESIGN.md's own "costs roughly zero new bytes" framing.
- **Byte cost, estimated from the same accounting as §4.6:** DESIGN.md's §C.10 figure for the *full* floor's "slab + seams" is ~1KB raw, but the 404 page needs only the slab polygon plus the lamp's gradient definition and cone shape — no seams between multiple modules, no desks, no chair, no buttons. Estimated at roughly 400-600 bytes raw markup (a single ground polygon, a 2-stop `linearGradient`, one lamp-cone shape reusing it), which gzips to a few hundred bytes given how repetitive SVG path/gradient syntax is. Confirms DESIGN.md's "roughly zero new bytes" claim is accurate, not just rhetorical.

---

## 4. The studio floor: technical plan

*(Composition — desk placement, the empty chair's staging, the overall scene — is the Design Lead's, per §6's own framing. This section is the engineering substrate only.)*

### 4.1 Markup structure: HTML buttons over a decorative SVG, not foreignObject, not SVG-native fake buttons

The interactive layer is a set of real HTML `<button>` elements, absolutely positioned (via CSS, matched to the SVG's `viewBox` coordinate space through a shared percentage-based positioning scheme) over a purely decorative SVG (`aria-hidden="true"` on the `<svg>` root, built from `<symbol>` definitions instantiated via `<use>` for the repeated agent-desk artwork, one hand-tuned instance for each human desk and the empty chair).

Argued against the alternatives (full reasoning in `docs/scratch/engineer.md`): `foreignObject` has inconsistent cross-engine support for interactive form controls and complicates stacking/hit-testing for no benefit here; SVG-native "fake buttons" (`<g role="button" tabindex="0">`) require hand-rolling keyboard activation and accessible-name plumbing that a real `<button>` gets from the browser for free. Real HTML buttons overlaid on decorative SVG is the cheapest path to "real focusable buttons with accessible names," and it directly enables the build-order requirement (§14 step 2 vs 3): the *exact same* button markup ships first as a plain vertical roster (no SVG at all, step 2), then gets repositioned by CSS onto desk coordinates once the SVG scene is added (step 3) and repositioned again into a mobile-appropriate layout at narrow viewports — one DOM, multiple CSS-only visual arrangements.

### 4.2 Hover, tap, and keyboard reaching the same card

Every desk button has one `click`/`Enter`/`Space` handler (native to `<button>`, no custom key handling needed) that opens the same card component regardless of input method. Desktop additionally gets a `:hover`/`:focus-visible`-triggered preview (CSS-only, `transition` on a `visibility`/`opacity` pair, no JS) that the click handler's opened state supersedes. Because touch has no hover (§4 of the brief), the tap path and the keyboard path are made identical deliberately — both call the same "open card" function — so there is exactly one code path to test, not three.

### 4.3 Card rendering: a fixed card slot, not a popover — superseded by DESIGN.md §C.6/§C.7, round 3

**This replaces Pass 1's popover/bottom-sheet design entirely.** DESIGN.md §C.6 specifies a fixed card slot, not a cursor-following or viewport-anchored overlay: "Placement — a fixed slot, not a cursor-following popover. This is a change from PLAN.md §4.3 and it is a visual-judgement call, not a feasibility one (it is also strictly less code — no `popover`, no anchor positioning, no light-dismiss, no focus containment)." §C.7 rules out a bottom sheet for the same reason on mobile: a sheet covers the room, costs a dismiss gesture, and starts with no card visible, which throws away the "default content is the argument" mechanism (principle 3). Agreed — this is less code than Pass 1's plan, not more, and the "verify at build" flag against `popover`/anchor-positioning support is removed: **neither API is used anywhere in this component.**

**Structure.** All eight station cards (five agents, two humans, the empty chair) are server-rendered at build time from the same `agents`/`people` collection entries the desk buttons already read, as sibling elements inside one slot container — not fetched, not templated client-side. Each card is a plain element (e.g. `<article data-station="desk-3">…</article>`) holding the exact markup DESIGN.md §C.6 specifies (name/role, one-line description, and for agents the "Checked by" sub-block; for the chair, the Ship-approval copy with no worker block).

**Visibility mechanism: the native `hidden` attribute, not a `data-selected` CSS toggle.** Every card except the default (the empty chair's, per §C.6/§C.7: "Default content at every breakpoint: the empty chair's card") carries the `hidden` attribute on initial render. The desk-button script (§4.2) toggles `hidden` on `click`/`focus`/`hover` (via the same single "open card" call already unified across input methods) — it removes `hidden` from the target card and adds it to whichever card currently lacks it. **Why `hidden` and not a CSS-only `data-selected` swap:** `hidden` (a boolean HTML attribute, equivalent to `display: none`) removes the seven non-selected cards from the accessibility tree entirely, so a screen-reader user linearly reading the page — or one who hasn't touched a desk yet — encounters exactly one card's content, not eight stacked, mostly-redundant announcements. This is the same "boring, reliable HTML" bias as the desk buttons themselves (§4.1) — no ARIA choreography to get wrong. `data-selected` is layered on *in addition*, on both the active desk button and its card, purely as a CSS styling hook (e.g. to lift the desk's fill per §C.8's "a focused desk also takes the selected fill") — it carries no visibility semantics, so the two attributes don't fight each other.

**How a screen-reader/keyboard user actually experiences the swap.** The slot container is marked `aria-live="polite"`. Per DESIGN.md principle 3 ("nothing important is behind a hover... produces the identical result in the identical place"), focus never moves off the desk button when the card updates — a keyboard user tabs across desks and, because the slot is a polite live region, hears the newly-revealed card's content announced without losing their place in the tab sequence. This is the mechanism that makes hover, focus and tap genuinely equivalent (DESIGN.md's own requirement), not just visually equivalent.

**No fade, no slide on swap** — DESIGN.md §C.9 is explicit that even outside reduced-motion, "the card slot still swaps content on interaction, instantly, with no fade and no slide." So the `hidden` toggle needs no accompanying WAAPI/Motion One call; it is a plain attribute flip, at `--dur-2` (200ms) budget headroom unused because there's nothing to animate here.

**Placement per breakpoint**, per §C.6/§C.7, all pure CSS (grid-column placement at ≥1024, block order below the scene at <1024 — no JS repositioning):
- **≥ 1024:** the slot sits in CSS grid columns 9–12, 366px wide, vertically centred to the scene column.
- **768–1023 and < 768:** the slot renders as a full-width block directly below the scene, in DOM order (this is also the mobile tab-order-friendly position, consistent with §C.8's DOM-order tab sequence ending at the chair).

**Min-height reservation.** DESIGN.md gives a concrete number only for the <768 layout ("min-height 168 reserved for the longest card," §C.7's wireframe); no number is given for ≥1024 ("min-height reserved for the longest card," §C.6, no px value). Because `hidden` removes a card from layout entirely, the seven non-visible cards contribute nothing to the slot's natural height — so without an explicit `min-height`, the slot would resize every time a shorter or taller card becomes visible, which is exactly the reflow DESIGN.md's "so nothing reflows" language rules out. Per this Engineer's charter (no invented spacing value not in DESIGN.md), the ≥1024 number is not guessed here. Two options, in order of preference:
1. **Design Lead supplies the ≥1024 min-height value** directly (cheapest — this is a design decision about a design-specified reservation, not a computed one).
2. Absent that, a build-time measurement script (same pattern as `check-floor-budget.mjs`, §4.6) renders all eight card variants at each breakpoint, measures each via a headless pass over the built `dist/` page (toggle `hidden` on each card in turn, read `getBoundingClientRect().height`), takes the maximum plus a small safety margin, and writes that value into the CSS as a custom property — with the script re-run and re-asserted on every build, so a future copy change that produces a taller card fails the build loudly instead of silently reflowing in production. This is listed in §7/§12 as a new, small script if option 1 doesn't resolve it before build.

**Never behind a hover, still true:** desktop hover is additive over the always-available click/keyboard path (§4.2, unchanged) — hover previews into the same slot the click/`Enter`/`Space` path also writes to, so touch (no hover) and keyboard get the identical destination, matching DESIGN.md principle 3.

### 4.4 Idle loop: CSS-only, killed by `prefers-reduced-motion`

The monitor-glow/blink idle states are `@keyframes` rules wrapped in `@media (prefers-reduced-motion: no-preference)` — meaning the *default*, unconditional CSS is the still state, and the loop is additive only when the user hasn't asked for reduced motion. This guarantees the reduced-motion path can't regress to "animation minus its loop" (a common bug pattern where JS toggles a class) — there is no JS toggle to get wrong.

### 4.5 LCP protection

The hero headline is the designated LCP element: its font face is preloaded (§1.5), and it is the first paintable content in DOM order, ahead of the floor section. The floor's `<section>` is not `fetchpriority="high"` on anything within it, its `<script type="module" defer>` does not block parsing or paint, and `content-visibility: auto` is applied to the floor section so the browser isn't forced to fully lay out/paint the (possibly large) inline SVG before the headline above it can paint. No image in the floor scene is eligible to become the LCP candidate because the scene is decorative SVG, not a raster image.

`content-visibility: auto` must ship with a `contain-intrinsic-size` on the same section (or another explicit height reservation sized to the floor's actual rendered aspect ratio once DESIGN.md's composition is final). Without it, the browser has nothing to size the off-screen/unrendered section against, so the section's box can jump from a near-zero placeholder height to its real height the moment it's laid out — a layout shift and scrollbar jump that directly fights the CLS budget line this same optimization is meant to protect. This is not optional hardening; it's the other half of the `content-visibility: auto` pairing.

### 4.6 Weight budget and measurement — reconciled against DESIGN.md §C.10, round 3

Pass 1's raw-markup guess (~40-45KB before gzip) was a conservative placeholder made before any composition existed. DESIGN.md §C.10 now gives a real, itemised accounting for the actual composition (shared `<symbol>`s, one gradient, four fills, no filters, integer-rounded coordinates, real DOM text) — and it is considerably leaner than the placeholder. Reconciled into one table, with a gzip expectation added (DESIGN.md's numbers are raw bytes; the gzip column below is an estimate pending the real measurement script, not a substitute for it):

| Component | Raw (DESIGN.md §C.10) | Gzip, estimated* | Note |
|---|---|---|---|
| Shared `<symbol>` defs (agent desk, empty chair, floor module) | ~2.5 KB | ~1.0 KB | Repetitive path syntax across instances compresses well |
| Floor slab + seams | ~1 KB | ~0.4 KB | Simple polygon geometry |
| 8× `<use>` + 8 buttons + labels | ~3.5 KB | ~1.3 KB | Real DOM text per §C.10's own note — see below |
| Scene-positioning CSS (one rule, `--x`/`--y` custom properties per button — §C.10's answer to the "biggest CSS unknown" this Engineer flagged in Pass 1) | ~4 KB | ~1.5 KB | One rule shared across all desks, not per-desk bespoke CSS |
| Floor interaction JS (open/close via `hidden` toggle per §4.3, keyboard wiring, reduced-motion gating) | ~4 KB | ~1.6 KB | Matches Pass 1's own 4-6KB guess for this piece |
| **Subtotal, floor-specific** | **~15 KB** | **~5.8 KB** | |
| Motion One mini (shared library; only relevant here if the floor uses a one-shot WAAPI call — the card-slot swap itself is instant/no-animation per §C.9, so this is mostly a shared-library line already counted once in §7's site-wide JS budget, not floor-specific weight) | 2.3 KB gzip (published figure) | 2.3 KB | Counted once, not doubled |

*Gzip figures above are estimates (SVG/CSS/JS text typically compresses to 35-40% of raw size); they are not a substitute for the real measurement below.

**Net: the floor's real composition is lighter than Pass 1's own conservative estimate, not heavier.** Where Pass 1 guessed ~40-45KB raw / ~10-12KB gzip, DESIGN.md's actual, disciplined composition comes in around ~15KB raw / ~6-8KB gzip including JS — this **lowers**, not raises, the risk on what was called "the single tightest budget on the site" (§7, §12 item 1). The 80KB ceiling stops being a near-miss and becomes a wide-margin pass, assuming the composition doesn't grow past what §C.10 describes.

**Confirmed, per DESIGN.md §C.10 and this task's own check:** no `<filter>` anywhere (no `feGaussianBlur`, no `feDropShadow` — contact shadows are flat opaque parallelograms), no embedded raster, no base64, no external asset, and all card/label/roster text is real DOM text rather than outlined SVG paths — meaning it stays selectable, crisp at any zoom, translatable, and (not incidentally) compresses far better under gzip than path data would.

**Measurement is still a dedicated script, not a Lighthouse resource-summary assertion**, because the SVG is inline in the HTML document rather than a separate network resource Lighthouse can attribute individually. `scripts/check-floor-budget.mjs`: parses the built `dist/index.html`, extracts the floor `<section id="studio-floor">...</section>` fragment plus the content of its associated JS module file(s), concatenates, gzips with Node's `zlib.gzipSync`, and exits non-zero with the measured byte count if the total exceeds `80 * 1024` bytes. Wired into CI (§8) as a required check. This script is the authority, not the estimates in the table above — DESIGN.md's own headroom note applies here too: "the headroom is deliberately not spent," so the script staying green with room to spare is expected, not a signal to add scene complexity.

---

## 5. Work cards

### 5.1 `backdrop-filter` strategy

All three §6.1 options are implemented and switchable via a single `data-blur-strategy` attribute on the cards' container, so the Design Lead's final pick (or a later change) is a one-line attribute/config edit, not a component rewrite:

- `data-blur-strategy="static"` (default) — a static semi-transparent white background plus a small tiled SVG noise pattern (not a raster PNG texture, to keep weight down), no live blur at all. Ships as the default because it's the cheapest and safest for INP.
- `data-blur-strategy="shared"` — a single `backdrop-filter: blur(...)` applied once to a shared background layer behind all cards in a section, rather than per-card.
- `data-blur-strategy="focus-only"` — `backdrop-filter` applied only to the card currently under `:hover`/`:focus-within`, via a CSS selector, not JS-toggled inline styles.

Whichever the Design Lead specs in DESIGN.md becomes the default value of that attribute; switching later is changing that one value.

**Never animate the blur radius** — enforced by not exposing `backdrop-filter` as an animatable property anywhere in the card's transition list; only `transform`/`opacity` are ever transitioned on the card itself.

### 5.2 Contrast

Whatever the effective background band behind the cards is (constrained per the Design Lead's layout, or the card's own opacity raised to compensate) gets checked programmatically, not eyeballed: a small script (part of `qa:contrast`, using a WCAG contrast-ratio library against the rendered card text color and the worst-case computed background color at the AA threshold for the given font size) runs against the built page. Flagged as needing the Design Lead's actual token values before it can run for real — **verify at build** once DESIGN.md lands.

### 5.3 INP measurement on real hardware

Lighthouse CI's lab metrics (Total Blocking Time) are used as a *leading indicator* only — they are not a substitute for real INP, which needs real input timing on real hardware. The Perf & A11y Auditor's real-device pass injects the `web-vitals` package's `onINP` callback temporarily during manual QA on the required mid-range Android device (§14), logging the measured value to the console/a visible overlay, captured as a screenshot per the QA no-slop gate's evidence requirement. This is a manual, evidenced gate — not automatable in CI, since CI has no real touch-input timing to measure against.

### 5.4 Print stylesheet

A `@media print` block strips `backdrop-filter`, `box-shadow`, and the per-card tilt `transform` entirely, sets the card background to solid full-opacity, and re-flows the semantic `<ul>`/description-list markup into a plain single-column, bordered-rule CV layout — hiding the contact affordance, nav, and any decorative floor markup (`display: none` under print, scoped to non-content chrome only).

### 5.5 Semantics

The cards are always a `<ul>` (or `<dl>`) of roles marked up so a screen reader reads company, dates, role, and products/stack in that source order — the visual card (tilt, base, edge highlight, blur strategy) is a CSS treatment of that list, never a replacement DOM structure. `aria-hidden` is never applied to the list itself, only to any purely decorative pseudo-elements (the "stand"/contact-shadow shapes).

---

## 6. Build-stage indicator

```html
<ol class="stage-track" aria-label="<product name> build stage">
  <li data-state="complete">Specced</li>
  <li data-state="complete">Building</li>
  <li data-state="current" aria-current="step">Final touches</li>
  <li data-state="upcoming">Submitted for review</li>
  <li data-state="upcoming">Live</li>
</ol>
```

`data-state` (`complete`/`current`/`upcoming`) is computed server-side at build time from the product's single `stage` enum field, by comparing each stage's index in the fixed 5-item order against the current stage's index — pure Astro templating, no client JS. The three states get three visually distinct treatments that do not rely on color alone (per §12): distinct icon/marker shape (filled circle with a check for complete, a filled ring for current, an open/outline circle for upcoming) plus a border-style difference, so the distinction survives grayscale as required.

**Confirmed against DESIGN.md §E, with two markup corrections, round 3.**

**1. Connectors are inline SVG, not CSS borders — the "identical `<ol>` markup" claim below needs one addition.** DESIGN.md §E.1's connector column is a literal dash pattern (`2px dashed rgba(15,42,46,.22), 4-4`), and §H.3's "The track fills" moment fills stage nodes "left to right" while §H.5 names `stroke-dashoffset` as one of only three properties ever animated on the whole site, scoped explicitly "for the stage nodes." `stroke-dashoffset` is an SVG-only property — a CSS `border-style: dashed` divider can approximate the *look* of a dash but cannot be progressively revealed via `stroke-dashoffset`, and can't hit an exact `4-4` unit dash/gap the way `stroke-dasharray="4 4"` can. So each connector segment between two `<li>` markers is a short inline `<svg>` (or one continuous `<svg>` spanning the whole track with a `<line>`/`<path>` per segment), decorative (`aria-hidden="true"`, the connector carries no information the `data-state`-driven marker and label don't already carry), sized to the gap between adjacent markers. The `<ol>`/`<li>` semantic structure, the text labels, and `aria-current="step"` are unchanged — only the connector's rendering technique moves from an assumed CSS border to explicit SVG, which is also what makes DESIGN.md's exact per-state marker sizes (10px/18px/10px) and stroke widths cheap to hit precisely.

**2. Vertical layout at < 768** (§E.2: nodes in a column, connector vertical, label to the right, 44px row height) is a pure CSS reflow of the same `<ol>` — no markup change, `flex-direction: column` (or an equivalent grid reflow) plus rotating the connector SVGs 90°. Confirmed compatible with the existing markup as-is.

**3. The compact home variant (§E.3) is not simply "the identical `<ol>` markup, styled smaller" — Pass 1's claim below undersold what DESIGN.md is asking for, and this is corrected here.** §E.3's ≥768 layout is "one set of stage labels, two runners" sharing a single column-header row, so the eye compares two products' positions against one shared axis — that is a two-row, five-column relationship between two products and five stages, not two independent single-product tracks. The right primitive for that is a real HTML `<table>`: `<caption>` (visually hidden if redundant with a visible heading), `<thead>` with one `<th scope="col">` per stage name, `<tbody>` with one `<tr>` per product, `<th scope="row">` for the product name, and a `<td>` per stage holding that product's node marker (plus `aria-current="step"`-equivalent marking on the current cell). A table gives free row/column-header announcement to screen readers, which is exactly the "shared axis, compare positions" mechanism DESIGN.md's A.4 reference cites — closer to the design intent than duplicating a five-item `<ol>` per product would be. At **< 768**, §E.3 drops to "one row per product, product name, a 5-node mini-track... and the current stage printed as text beside it" — a genuinely different, simpler layout (no shared column headers at all). Rather than shipping two DOM copies (one per breakpoint) and hiding one, this uses the standard responsive-table technique: the same `<table>` markup, collapsed at < 768 via `display: block` on `table`/`tr`/`td` with each row's cells re-flowing to the stacked mini-track-plus-current-stage-text layout in CSS — one semantic structure, two visual presentations, matching how the full track (§E.2) already handles its own 768px breakpoint switch.

**Labels, both variants:** the identical `data-state` computation feeds both the full track and the compact table — same server-side comparison of each stage's index against the current stage's index (unchanged from Pass 1, below). In the compact table, only the current stage's label prints as visible text (beside the mini-track at < 768, or via the shared column header at ≥768); the other four stage names stay in the DOM as visually-hidden text per node, same mechanism as the full track (below) — so the complete label set is always available to assistive tech, never dropped, matching §E.3's own instruction: "Only the four non-current labels are dropped — the fact a visitor actually needs stays as words." `title` is deliberately not used for this, on either variant: it is not a reliable accessible name (no keyboard/touch exposure, inconsistent screen-reader support, and it doesn't participate in the accessibility tree the way a real label does) — a visually-hidden element (`.sr-only`-style, clipped not `display: none`) carrying the same text is the only mechanism used to keep the accessible name present while hiding it visually.

---

## 7. Budget accounting table

| §11 line | Estimate | Measurement method | At risk? |
|---|---|---|---|
| JS transferred, home (≤100KB gzip) | **Measured at build step 1: 0 B.** The home page as it stands ships no JavaScript at all. Projected once the rest lands: Motion One mini ~2.3KB + floor/card interaction scripts ~8-12KB + stage indicator 0KB (no JS) + **Firebase Analytics 15,806 B gzip, measured** — see the row below | Lighthouse CI `resource-summary:script:size` assertion (bytes), plus `npm run qa:weight` per file locally | Low risk, large headroom |
| Firebase Analytics (QUESTIONS.md item 35) | **Measured 2026-09-05 against `firebase@12.18.0`, built with the config present: 15,806 B gzip total** — a 915 B gzip bootstrap in the page (the consent-mode defaults and the idle scheduler) plus a 14,891 B gzip lazy chunk (`firebase/app` + `firebase/analytics`, 72,293 B raw). Only the 915 B is on the initial load path; the chunk is fetched after `load` inside `requestIdleCallback`, so it contributes nothing to LCP and nothing to TBT. 15.4% of the 100KB line | `npm run qa:weight` on a build with `PUBLIC_FIREBASE_*` set | Low. Consent Mode defaults are `analytics_storage: 'denied'`, so it runs cookieless and needs no banner — the brief's two objections to Google Analytics (weight, a consent banner) are both answered by measurement rather than assertion |
| CSS transferred, home (≤40KB gzip) | ~15-25KB after Tailwind's utility scan across templates | `resource-summary:stylesheet:size` | Moderate — the floor's bespoke per-desk positioning CSS is the biggest unknown; watch this once desk count/layout is final |
| Studio floor SVG + JS (≤80KB gzip) | **Revised down, round 3:** ~15KB raw / ~6-8KB gzip per DESIGN.md §C.10's real composition (§4.6) — well under the old ~40-45KB raw guess, now that a concrete, disciplined composition exists (no filters, shared symbols, real DOM text) | Custom script `scripts/check-floor-budget.mjs` (§4.6, §8) — the authority, not the estimate | Risk lowered, not raised, by DESIGN.md landing — was the highest-risk line when it was still an unknown; now a wide-margin pass assuming the composition doesn't grow past §C.10's description |
| Card slot min-height at ≥1024 (§4.3) | No px value in DESIGN.md §C.6 (only the <768 value, 168px, is given in §C.7) | Build-time measurement script or a Design-Lead-supplied number (§4.3) | Small — not a byte-budget risk, but flagged so a value doesn't get invented in violation of this Engineer's own charter |
| LCP, mobile 4G mid-tier CPU (<2.0s) | Depends on font preload discipline + minimal render-blocking CSS above the fold. **Round 3:** confirmed still achievable under `font-display: swap` even with Anek Latin's heavier two-axis file (§1.5), provided only the ~12.5KB static hero instance is preloaded, not the full ~51KB variable file | Lighthouse CI LCP assertion under `throttlingMethod: 'devtools'` + a mobile/4G/mid-tier-CPU preset | At risk if more than one font weight/instance is preloaded, or if the floor's `content-visibility` isn't applied correctly |
| CLS (<0.05) | Near zero if image dimensions are always explicit and font-swap metrics are matched | Lighthouse CI CLS assertion | At risk from font-swap reflow unless fallback-metric-matching (§1.5) is verified working |
| INP (<200ms) | Depends on the blur strategy default and floor card open/close cost | Lab: Lighthouse TBT as a proxy. Real: `web-vitals` `onINP` on real device (§5.3) | At risk if `data-blur-strategy` defaults to `shared`/`focus-only` on first ship without real-device verification — default is `static` precisely to de-risk this |
| Lighthouse mobile Perf/A11y/BP/SEO (≥95/100/95/100) | Perf: high headroom given the JS/CSS budgets above. A11y 100 and SEO 100 are strict floors | Lighthouse CI category-score assertions | A11y=100 is at risk pending DESIGN.md's actual contrast values and the floor's ARIA correctness under real screen-reader testing |
| Total page weight, home (≤1.2MB) | **Revised, round 3:** fonts (~71KB measured, §1.5 — up from the ~50KB Pass-1 guess) + floor (~15KB raw / ~6-8KB gzip, revised down, §4.6) + CSS/JS (~65KB combined) + any home-page images leaves generous headroom regardless — the font increase and the floor decrease roughly offset each other, and both are trivial against 1.2MB | Lighthouse CI `resource-summary:total:size` | At risk only if the home page ends up embedding full-resolution screenshots instead of appropriately downscaled AVIF/WebP variants — unchanged by this round |

---

## 8. CI and deploy

### 8.1 GitHub Actions workflow (`.github/workflows/deploy.yml`)

```
on: push to main, and pull_request (build+QA+Lighthouse only, no deploy) for every PR

jobs:
  build:
    - checkout
    - setup-node (pinned LTS version)
    - npm ci
    - astro check                     # TS + Astro template diagnostics, must be zero errors/warnings
    - npm run build                   # astro build → dist/
    - npm run qa:no-slop              # grep gate, §9
    - npm run qa:links                # link checker, §9
    - npm run qa:images               # missing image / missing alt, §9
    - npm run qa:console              # Playwright console-error check, §9
    - node scripts/check-floor-budget.mjs   # §4.6
    - upload dist/ as a build artifact (for the lighthouse job and, on main, for deploy-pages)

  lighthouse:
    needs: build
    - download the dist/ artifact
    - npx @lhci/cli autorun --config=lighthouserc.json
      # `lighthouserc.json`'s `collect.staticDistDir` points at the downloaded dist/ artifact —
      # LHCI's OWN built-in static server is used here, deliberately, not `npx serve`. Checked
      # against LHCI's current source (packages/cli/src/collect/fallback-server.js): that server
      # is an Express app with the `compression` middleware installed unconditionally
      # (`this._app.use(compression())`), so every response is gzipped per the request's
      # Accept-Encoding header, the same as a real host would do. `npx serve` (the `vercel/serve`
      # package) does NOT gzip by default — its own tracker (vercel/serve#460) confirms
      # compression support was never restored after being dropped — so it is not used as the
      # collect-time server. This means every `resource-summary:*:size` assertion below measures
      # actual gzip-transfer bytes, matching the §11 budget lines (all stated "gzipped"), not
      # raw/uncompressed bytes. Confirmed at build: the deployed GitHub Pages host must also
      # serve gzip/brotli for these lab numbers to hold in production — Pages does this by
      # default, but re-check response headers on the live domain once deployed.
      # assertions in lighthouserc.json map 1:1 to the §11 table as failing assertions:
      #   resource-summary:script:size      maxNumericValue: 102400   (bytes; ≤100KB gzip)
      #   resource-summary:stylesheet:size  maxNumericValue: 40960    (≤40KB gzip)
      #   resource-summary:total:size       maxNumericValue: 1258291  (≤1.2MB)
      #   largest-contentful-paint          maxNumericValue: 2000
      #   cumulative-layout-shift           maxNumericValue: 0.05
      #   categories:performance            minScore: 0.95
      #   categories:accessibility          minScore: 1.0
      #   categories:best-practices         minScore: 0.95
      #   categories:seo                    minScore: 1.0
      # INP has no direct Lighthouse audit key as of current LHCI docs — Total Blocking Time is used
      # as the CI-time proxy (documented as a proxy, not equivalent) pending real-device INP evidence
      # gathered manually per §5.3. — verify at build against current LHCI audit key names.

  deploy:
    needs: [build, lighthouse]
    if: github.ref == 'refs/heads/main'
    - download the dist/ artifact
    - actions/upload-pages-artifact
    - actions/deploy-pages
```

A PR failing any QA script, the floor-budget script, or a Lighthouse assertion does not merge — this is the literal enforcement of §11's "a PR that breaks the budget doesn't merge."

### 8.2 `public/CNAME`, DNS, config

- `public/CNAME` contains exactly `thegeekdogs.com`.
- DNS: apex `A` records to GitHub Pages' published IP addresses (these are documented by GitHub and can change — **verify at build**, do not hardcode without checking current values at DNS-setup time), or an `ALIAS`/`ANAME` record to the Pages default domain if the registrar supports one instead of bare `A` records; `www` as a `CNAME` to `<github-username-or-org>.github.io`; `www` → apex redirect handled by enabling the custom domain + "Enforce HTTPS" in the repo's Pages settings (GitHub handles the redirect once both apex and `www` are configured as the custom domain); HTTPS enforced via that same repo setting.
- `site: 'https://thegeekdogs.com'` in `astro.config.mjs` for absolute canonicals, sitemap URLs, and OG image URLs.
- Apex domain means `base: '/'` — no repo-name base path.
- `@astrojs/sitemap` integration generates `sitemap.xml` automatically respecting `trailingSlash: 'always'`.
- `public/robots.txt` references the sitemap URL, disallows nothing (public marketing site, nothing to hide from crawlers).

---

## 9. QA scripts spec (§14 no-slop gate)

All scripts run against the **built `dist/` output**, never source files (source may legitimately contain a `<field>` placeholder in a schema comment; the built output must not).

| Script | What it checks | Exits non-zero on |
|---|---|---|
| `qa:no-slop` | Case-insensitive grep across `dist/**/*.html` for: `lorem`, `ipsum`, `TODO`, `FIXME`, `XXX`, `placeholder`, `[FILL]` (literal brackets), `[CONFIRM` (literal, open bracket only, no closing bracket — COPY.md uses both `[FILL: …]` and `[CONFIRM: …]` markers and neither may reach `dist/`), `coming soon`, `example.com`, `John Doe`, `Jane Doe`; case-sensitive whole-word match for the placeholder product name `Milan`; a scan of `dist/` **file paths** and all HTML content for the bundle id fragment `wedme`; an exact-string check for `href="#"` (bare dead-link fragment — not `href="#section-id"`, which is a legitimate in-page anchor) | Any match found — prints file, line, matched pattern |
| `qa:links` | Internal + external link check via `linkinator --recurse` against the built `dist/` output; cross-references `sitemap.xml` against actual generated pages to flag any page not reachable from navigation (orphan check) | Any broken link, any §8 route returning 404, any orphaned page |
| `qa:images` | Scans `dist/**/*.html` for `<img>` (and `<source>` in `<picture>`) missing an `alt` attribute entirely (`alt=""` is accepted as a deliberate, valid answer; a missing attribute is not); cross-checks every referenced `src`/`srcset` path resolves to a file that exists in `dist/` | Any missing-alt image, any referenced-but-missing image asset |
| `qa:console` | A Playwright script that visits every route in §8 headless, collects `console.error`/`console.warn` and uncaught `pageerror` events | Any non-empty console error/warning/pageerror on any route |
| `qa:build` | `astro check` (TypeScript + Astro template diagnostics) plus a grep of the `astro build` log output for warning-level lines | Any TypeScript error, any Astro diagnostic, any build warning |
| `qa:contrast` | Programmatic WCAG AA contrast check of card/text colors against their actual rendered (worst-case) background, using DESIGN.md's final token values | Any text/background pair failing AA at its rendered font size |

**On `placeholder` in the grep list:** this pattern is deliberately broad enough to also catch the HTML `placeholder=` attribute on any `<input>`/`<textarea>` — that's the point, not a side effect. The site rule is **no `placeholder` attributes anywhere**: every field hint is real, visible text in the DOM (COPY.md §8.3 already writes these as, e.g., "Field hint: `So we can reply.`"), never attribute-only text that vanishes on focus, fails to persist for screen-reader/zoom users, and reads as an unlabeled field once typed into. This is a component-level constraint on the contact form markup, not just a CI grep — no code path in `src/components/` sets a `placeholder` attribute at all, so the grep gate is a backstop, not the primary enforcement.

---

## 10. Feasibility notes for the Design Lead

1. No per-card live `backdrop-filter` — the default is a static semi-transparent surface plus a small tiled noise pattern (§5.1); live blur is available as an opt-in toggle but must clear real-device INP testing first.
2. Never animate blur radius — if a card needs a "coming into focus" moment, animate `opacity`/`transform` instead.
3. No WebGL anywhere (§10 of the brief already rules this out; repeating here because it constrains what "atmosphere" references like the amix-design site can actually inspire, not license).
4. SVG filters (`feGaussianBlur` and similar) are expensive, especially over large areas or under scroll/animation — fine for a small, static decorative touch; avoid on anything that moves or covers a large fraction of the viewport.
5. Font count ceiling: budget assumes roughly two font families total (a display/headline role and a body role), each contributing one variable-font file after subsetting (§1.5) — a third family or multiple static weights of the same family risks the CSS/page-weight and LCP-preload budgets.
6. Above-the-fold image weight: keep combined image bytes visible without scrolling on the home page well under the 1.2MB total-page-weight ceiling (a rough target of well under a few hundred KB combined) — the floor itself is SVG, not raster, specifically so it doesn't compete against this.
7. The 80KB studio-floor line (§4.6, §7) is the single tightest budget on the site — every additional desk, decorative flourish, or filter effect in the SVG composition trades directly against it. If the composition needs to grow, the accessibility layer (real HTML buttons, semantic roster) is never what gets cut to make room; visual complexity is.
8. Backdrop-filter's contrast risk (§5.2, §6.1) means a translucent-card treatment needs a *controlled* band behind it — an arbitrary busy background photo/pattern behind the cards makes the AA contrast check fail unpredictably depending on scroll position.

---

## 11. Build order, per §14, with blockers

1. **Repo, content schemas, tokens, deploy pipeline, Lighthouse CI, QA scripts.** Blocked on: DESIGN.md's token *names* existing (not final values) so the CSS-variable contract in §1.2 can be scaffolded; not blocked on final copy. This step also includes an early spike proving the `@theme`-points-at-`var()` multi-world technique (§1.2, flagged verify at build) so it's not discovered late at Tanya's build stage (§9.3's own stated risk).
2. **Home page structure and copy, floor as a static semantic roster.** Blocked on: the hero variant decision (§7 of the brief has three) going through the Direction human gate (§14); the §5.1 `[FILL]`s on engagement model/capacity (affects CTA copy) being answered in `QUESTIONS.md`; the §5.3 decision on whether the wedding planner appears at all (affects home-page IA/nav).
3. **The studio floor: SVG, interaction, mobile, keyboard, reduced motion.** Blocked on: the Design Lead's floor composition (desk layout, empty-chair staging) in DESIGN.md; the Copywriter's final floor-card copy (§7) for accessible names and card content; the Fact Checker/Copywriter resolving which gate label(s) populate the `gates` collection (the copy deck currently shows six distinct "Checked by" values for seven desks — this collection's exact contents are content, not engineering, and this step can't render final card content until they're settled).
4. **`/work/pocket-manager/`.** Blocked on: the Fact Checker's verified first-release date, the exact corrected Data Safety wording and its ship timing (§5.2 — governs when `privacyClaimEnabled` flips), and the real store screenshot/asset files.
5. **`/work/wedding-planner/`.** Blocked on: the §5.3 human decision on whether this product appears on the site at all; every `confirm`-marked fact in §7's work-card table being resolved or the row omitted; the Copywriter's non-placeholder `descriptiveName`.
6. **`/sahib/`, then `/tanya/`, with the work cards.** Sahib's page blocked on: the Design Lead's chosen direction (of the two-plus proposed per §9.2) passing the Direction gate, and the remaining §5.4 `[FILL]`s (his three adjectives, which gate he owns, anything to omit). Tanya's page blocked on all of Sahib's-equivalent items for her own page, *and* structurally on step 1's swappable token/layout scaffold already existing (§9.3's late-review requirement depends on that scaffold being in place before her page is built, not retrofitted after).
7. **Contact, 404, OG generation, structured data.** Blocked on: a real Formspree form ID existing (the owners provisioning the account) before the contact form can be wired to a real endpoint; Fact-Checker-cleared values for every `Person`/`SoftwareApplication` JSON-LD field (`sameAs` URLs, Pocket Manager's `aggregateRating`).
8. **Full-site audit: real hardware, screen reader, keyboard-only, reduced motion, 4G throttle.** Blocked on: the Facts and Copy human gates having passed for every surface audited (auditing unapproved copy wastes the audit); physical access to a mid-range Android device for the Perf & A11y Auditor's real-device INP pass (§5.3).

---

## 12. Risks, ranked, with mitigation

1. **Studio floor exceeds the 80KB gzip line.** **Downgraded, round 3:** DESIGN.md §C.10's real composition measures ~15KB raw / ~6-8KB gzip (§4.6) — a wide-margin pass, not a near-miss. Residual risk is scope creep against the headroom DESIGN.md itself says not to spend ("the headroom is deliberately not spent"), not the composition as specified. Mitigation unchanged: ship the plain roster first (build order step 2) so a later budget breach degrades gracefully to "roster without the scene" rather than blocking the whole page; `scripts/check-floor-budget.mjs` wired into CI from step 1 remains the authority, not the table estimate.
9. **Sticky contact plate's build-order dependency on the floor's `contain-intrinsic-size`.** New, round 3: DESIGN.md §B.10's sticky plate and PLAN.md §4.5's `content-visibility: auto` on the floor section both touch the same section's box height — the floor's `contain-intrinsic-size` must be set to include §B.10's own +56px bottom-padding reserve, or the intrinsic-size placeholder undershoots the section's real height and CLS returns through the gap between the two specs. Mitigation: sequence this explicitly at build time (§3) — measure/set `contain-intrinsic-size` after the +56px reserve is applied, not before, and cover it in the same CLS Lighthouse assertion already gating this line (§7, §8).
2. **`backdrop-filter` INP failures on real Android hardware.** Mitigation: default to the `static` (no live blur) strategy (§5.1); only promote to `shared`/`focus-only` after the real-device INP pass (§5.3) clears it explicitly.
3. **Contrast failures from translucent-card tokens once DESIGN.md's real values land.** Mitigation: the `qa:contrast` script (§9) checks the worst-case rendered background programmatically before merge — never eyeballed, per the brief's own instruction.
4. **Formspree's 50-submissions/month free cap silently drops leads if the site converts well** — a real risk for a page whose entire job is conversion. Mitigation: document the Web3Forms fallback and the paid-tier upgrade path in `README.md`; monitor submission volume against the cap once live.
5. **The Tailwind v4 `@theme`-via-`var()` multi-world pattern is unproven in this codebase** (§1.2, flagged verify at build). Mitigation: prove it in step 1's spike, not discovered when Tanya's late-reviewed page needs to swap direction (§9.3) and the mechanism turns out not to work as assumed.
6. **`trailingSlash` / GitHub Pages redirect edge cases** — current Astro documentation and open issues show some rough edges around trailing-slash handling for static output. Mitigation: test parity between `astro dev`, a local `npx serve dist` of the actual build output, and the deployed Pages site before each release — not `astro dev` alone.
7. **Font-swap-driven CLS.** Mitigation: fallback-metric matching (§1.5), verified against the CLS Lighthouse assertion, flagged verify at build for the exact tooling.
8. **Wedding planner content gaps (§5.3's pending human decision) blocking build-order step 5.** Mitigation: the build order already sequences Sahib's and Tanya's pages (steps 6) independently of this decision, so it doesn't block unrelated later work; worst case, `/work/wedding-planner/` ships last or is omitted per the owners' call without touching anything else.

---

---

## 13. Design review verdict (round 3)

**APPROVED.**

DESIGN.md, Pass 1, is buildable as a spec within the brief's §11 budgets and this Engineer's zero-JS-by-default architecture. Nothing in it required a visual-judgement change back to the Design Lead — every place DESIGN.md superseded a Pass 1 assumption (the card slot replacing the popover, §4.3; the two-axis Anek Latin font, §1.5; the concrete floor composition, §4.6; the sticky contact plate, §3; the 404 empty room, §3; the stage indicator's SVG connectors and compact-table structure, §6) was resolved by updating PLAN.md, not by asking DESIGN.md to change. In every one of those six places, the design as specified is strictly buildable, and in two of them (the card slot, the floor's real weight) DESIGN.md's decision is measurably *cheaper* to build than what Pass 1 had assumed.

The four items below are not objections to DESIGN.md's content — nothing here is infeasible or over budget as specified. They are the residual, independently-actionable follow-ups this review surfaced, kept in writing per brief §14 so they don't get relitigated or silently dropped before build.

1. **DESIGN.md §C.6 gives no numeric min-height for the ≥1024 card slot** (only the <768 value, 168px, appears, in §C.7's wireframe). PLAN.md §4.3 resolves this with a build-time measurement script rather than a guessed number, per this Engineer's own charter ("Invent a colour, spacing value or type size not in DESIGN.md tokens" is prohibited). Cheaper fix: the Design Lead supplies the ≥1024 number directly before that build step starts.
2. **DESIGN.md §B.3's two-axis Anek Latin (`wght` 100–800, `wdth` 75–125) measures ~68-70KB raw after subsetting** (measured via Fontsource + local `pyftsubset`, 2026-09-05), well over Pass 1's ~25KB/face placeholder in the old PLAN.md §1.5. PLAN.md §1.5 now specifies a zero-design-cost mitigation — restricting the shipped `wdth` range to 75–100 via `fonttools varLib.instancer`, since DESIGN.md never specifies a `wdth` value above 100 anywhere on the site — bringing the total font payload to ~71KB. This fits §11's 1.2MB total-page-weight ceiling with room to spare and does not require a design change; flagged here so the real number (not the Pass-1 guess) is what the Orchestrator and owners see going into build.
3. **DESIGN.md §H.3/§H.5 implies the stage-track connectors are SVG (`stroke-dashoffset` is one of only three properties ever animated site-wide, scoped explicitly to "the stage nodes"), not the CSS-border connectors Pass 1's §6 implied.** PLAN.md §6 now specifies inline SVG line segments for connectors, which is what makes the exact `4-4` dash pattern (§E.1) and the "track fills" orchestrated moment (§H.3) achievable exactly as written, rather than approximated.
4. **DESIGN.md §E.3's ≥768 compact home variant ("one set of column headers, two runners") is a two-product, five-stage shared-axis comparison, not two independent single-product tracks** — Pass 1's §6 undersold this as "the identical `<ol>` markup... styled smaller." PLAN.md §6 now specifies a semantic `<table>` (collapsing to the existing per-product stacked view at <768 via responsive-table CSS), which gives screen readers the row/column-header relationship DESIGN.md's own A.4 reference cites as the mechanism worth borrowing.

Everything else DESIGN.md asks for across §B.2, §B.3, §B.5, §B.10, §B.11, §C, §D, §E, §F.4, §F.6, §G.1 and §H that isn't named above is buildable as specified — silence on a section means this review found nothing to flag in it.

---

*End of Pass 1 engineering plan, updated through the round 3 design review. Awaiting the remaining human gates per §14 (Direction, Facts, Copy) before full build proceeds; §13 above is this round's sign-off on DESIGN.md as a build spec.*
