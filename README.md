# thegeekdogs.com

Static site for TheGeekDogs, built the way the site says work gets built: agents draft, humans review, nothing ships unchecked.

**Status: redesigned. Eight routes, Astro 7, dark-first, twelve CI gates green. The print-inspired visual system that shipped runs A–F has been replaced by the dark, dimensional one in `.design_handoff/` — new palette, new type, glass panels, a lit isometric room. Structure, routes and copy are unchanged. Nothing pushed; a human pushes.** What the owners still owe is listed under "What needs you now".

## What needs you now

1. Push. Add the GitHub remote for `thegeekdogs.com` under your account and push `main`; set Pages to deploy from Actions; add the GoDaddy records listed under "Deploy" below.
2. Put the Firebase web config in `.env` (names in `.env.example`). The site builds and runs without it; analytics is simply absent until then.
3. Run the two passes no agent can: a mid-range Android phone on throttled 4G through the checklist in [docs/reviews/final-qa-gate.md](docs/reviews/final-qa-gate.md), and VoiceOver over the home page and one person page (QUESTIONS.md item 74).
4. Show Tanya her page using [docs/reviews/tanya-packet.md](docs/reviews/tanya-packet.md) and record her answer in QUESTIONS.md.
5. Supply the headshots (item 23) and decide wedding planner screenshots 03 and 04 (item 73). Both are the only content still absent.
2. Read [DESIGN.md](DESIGN.md), which is the spec of record for the redesign, and its closing section "I. Open" — three items there need your decision, including a wordmark that contradicts your own "no logo" ruling.
3. Skim [COPY.md](COPY.md) for anything you would not put your name to. Every `[CONFIRM]` and `[FILL]` in it is a question in QUESTIONS.md.

## The documents

| File | Owner | What it is |
|---|---|---|
| [docs/brief.md](docs/brief.md) | you | The brief. Every decision cites a section of it. |
| [DESIGN.md](DESIGN.md) | Design Lead | Spec of record for the dark-first redesign: tokens, type, the floor's materials and light, both person-page centres, motion, and what the gates now measure. |
| [docs/design-legacy.md](docs/design-legacy.md) | Design Lead | The 2,739-line print-inspired spec that shipped runs A–F. History only. **It does not describe the site any more.** |
| [COPY.md](COPY.md) | Copywriter | Every user-facing string, by route and section, with `[CONFIRM]` and `[FILL]` markers where a fact or decision is missing. |
| [FACTS.md](FACTS.md) | Fact Checker | Every claim checked against a primary source, with status and URL. Includes the Play Store Data Safety text verbatim and the GitHub profile reads. |
| [PLAN.md](PLAN.md) | Engineer | Stack, content schemas, floor technique, budget accounting, CI, QA scripts, build order with blockers, risks. |
| [QUESTIONS.md](QUESTIONS.md) | Orchestrator | Everything that needs a human. Answer inline. |
| [REVIEWS.md](REVIEWS.md) | all | Append-only log of every verdict, its evidence, and how disagreements resolved. |
| [agents/](agents/) | Orchestrator | One charter per specialist: remit, never-do list, model. The team is rebuilt from these for every later change. |
| [docs/scratch/](docs/scratch/) | each agent | What each agent tried and rejected, so later rounds do not relitigate. |

## Findings you should know about

- The Play Store listing shows **4.3 stars**, not 4.6. The site prints the public number (QUESTIONS.md item 36).
- The corrected Data Safety declaration is **not live**. The privacy content flag stays off until someone reads the live listing (items 14 and 15).
- Tracking CTA and email clicks, which the brief requires, needs Plausible at **$9/month**. Cloudflare Web Analytics is free but cannot do it (item 35).
- Sahib's page is built around a coverage map of five stacks by five employers. Native iOS and KMP currently have **no product attributed** to them (item 45).
- LinkedIn blocked every fetch, so every fact sourced from it is marked owner-provided, not verified (item 40).
- The two chosen fonts weigh about **71 KB** after subsetting, not the 50 KB first guessed. It fits the budget; the Engineer has the mitigation in PLAN.md §1.5.

## How the build will run

Order per the brief §14: repo and CI first, then a plain semantic home page, then the floor, then the two product pages, then Sahib, then Tanya last, then contact, 404, OG images and structured data, then the full audit on real hardware. Each surface goes through Design Lead review of the rendered page, Fact Checker, QA, and the Perf & A11y Auditor before a human cuts the release. Three review rounds maximum per surface, then it escalates to you.

Run instructions, content-editing instructions, and the theme-scope notes arrive here with the first code commit.

---

## Run it

Node 22.12 or newer. Everything below runs from the repo root.

```bash
npm install            # once
npx playwright install chromium   # once, for qa:console
npm run dev            # http://localhost:4321
npm run build          # → dist/
npm run qa             # every gate, in order, against dist/
```

The QA scripts run against the **built output**, never against source, so build first.

### The fonts are a build step, and it is not part of `npm run build`

```bash
python3 -m venv .venv-fonts && .venv-fonts/bin/pip install "fonttools[woff]" brotli   # once
npm run build && npm run fonts     # rebuild, then re-cut the fonts from what was built
```

`npm run fonts` is PLAN.md §1.5's pipeline, and it runs **against `dist/`** because that is
what §1.5 asks for: the subset is the glyph set the built pages actually paint, not a
hand-picked Latin range. It does four things and asserts three of them:

- subsets both faces to the code points found in `dist/` plus §1.5's own safety set
  (curly quotes, the ellipsis, the non-breaking space, the star) — currently **108 code
  points**;
- **asserts the axes.** `wght` must survive subsetting, and `wdth` must be absent — neither
  Schibsted Grotesk nor Spline Sans Mono has one, and a fontsource upgrade that shipped a
  second axis would silently double the design space the subset carries;
- **asserts `tnum` survives on the proportional face.** It is not asked of the mono face:
  a monospace font has no tabular-figures feature because every glyph in it is already one
  advance wide, and demanding it would fail a font for being the kind of font it was chosen
  for being;
- writes the two metric-matched fallback `@font-face` blocks that make `font-display: swap`
  cost no layout shift — `ascent-override`, `descent-override`, `line-gap-override` from
  the subsetted binary's own `hhea`/`head` tables, and `size-adjust` from an advance ratio
  measured in a real browser against the local face that actually resolves there.

Output: `public/fonts/*.woff2` and **`src/styles/fonts.css`, which is generated and
committed** — so a fresh checkout builds and deploys with no Python anywhere near it. Only
re-run it when the copy changes enough to need a glyph the subset does not carry, or when
either package is upgraded.

CI never runs `npm run fonts`, so the committed `.woff2` files can drift silently behind a
copy edit — `npm run qa:glyphs` is the gate that catches it: it maps every character
`dist/**/*.html` actually paints to the face the site's CSS renders it in and fails,
naming the character and the file, if that face's committed subset doesn't have it.

| Script | What fails it |
|---|---|
| `npm run qa:build` | any TypeScript error, any Astro diagnostic or hint, any build warning |
| `npm run qa:no-slop` | `lorem`, `TODO`, `FIXME`, `placeholder` (including the HTML attribute), `[FILL`, `[CONFIRM`, `coming soon`, `example.com`, `href="#"`, the placeholder product name, the second app's bundle-id fragment, an uppercase character in a built route |
| `npm run qa:images` | an `<img>` with no `alt` attribute (`alt=""` passes), or a referenced image that is not in `dist/` |
| `npm run qa:links` | a broken internal or external link, or a built page missing from the sitemap |
| `npm run qa:console` | a console error or warning, an uncaught error, or a failed request on any route |
| `npm run qa:contrast` | any text run below AA **measured against the pixels the page actually paints**. It renders each route twice — as it ships, and with the text's fill made transparent — diffs the two to isolate the pixels a letter covered, and checks the text colour against the darkest *and* the lightest real pixel behind those glyphs. Nothing on this site sits on one flat colour any more, so nothing can be checked by layering token values. 1,858 runs, both schemes, 390 and 1440 |
| `npm run qa:schemes` | a token that computes to something other than the published value, on the real page, in either scheme — plus two things a stylesheet cannot promise: that `--f-ink-rgb` resolves (if it ever does not, every fill in the isometric room falls back to opaque black and the build still passes), and that with JavaScript disabled the page still paints the dark room, which is the whole claim of "dark-first" |
| `npm run qa:floor` | the studio floor over 80KB gzipped (passes trivially until the floor exists) |
| `npm run qa:weight` | JS over 100KB, CSS over 40KB, or the home page over 1.2MB, all gzipped |
| `npm run qa:glyphs` | a character `dist/**/*.html` paints (text, or an `alt`/`aria-label`/`title`) that the committed `public/fonts/*.woff2` subset for the face rendering it doesn't contain |

Lighthouse runs the same assertions the brief's budget table states, over all eight routes:

```bash
npm run build && npx lhci autorun --config=lighthouserc.json
```

`/404.html` is asserted separately, and only on one line. COPY.md §9 requires the page to
be `noindex`, so Lighthouse's `is-crawlable` audit fails there by design — it is weight
4.04 of the SEO category's 12.04, so a correct 404 scores 0.66 and always will. Rather
than relax `categories:seo` to a number that means nothing, the config asserts the eight
SEO audits that do apply to that page, each at `minScore: 1`. Every other assertion is
identical to the other seven routes'.

### Adding content

Content lives in `src/data/` as JSON, one file per entry, validated by the Zod schemas in
`src/content.config.ts`. A field that breaks a schema fails the build; it does not ship.

- **A product** — `src/data/products/<slug>.json`. `slug` must be lowercase and hyphenated.
  `name` may be `null` when no final name has been chosen; `descriptiveName` is always present and
  is what renders in headings and metadata while `name` is null. `stage` is one of `specced`,
  `building`, `final-touches`, `submitted`, `live`. `features` holds only functionality a user can
  actually reach in the shipped build — there is no field for anything unreachable, so it cannot
  leak onto the site by accident.
- **A person** — `src/data/people/<slug>.json`, matching the `people` schema. `gatesOwned` holds
  slugs from `src/data/gates/`. The directory is empty today and that is a valid state: nothing
  renders a stand-in for a person who is not there yet.
- **An agent** — `src/data/agents/<slug>.json`. `checkedBy` references a gate slug; `deskSlot` is a
  `desk-N` id the floor component owns.

### Naming the second product and adding its store link

Open `src/data/products/wedding-planner.json` and change three fields:

```json
{ "name": "<the chosen name>", "stage": "live", "storeUrl": "<the store URL>" }
```

Add `storeStats` when the listing has figures worth printing. Nothing else changes: no component
references any of those fields by a hard-coded value — the templates branch on presence, so a
missing name falls back to `descriptiveName` and a missing store URL renders no link rather than a
dead one.

### How the theme works

`src/styles/tokens.css` holds every value the design names, in two layers. The first layer is the
handoff's own token names, transcribed (`--ground`, `--void`, `--raise`, `--ink`, `--accent`,
`--lamp`, and the `--f-*` ramp the isometric room is lit with) — a value change in the design is a
one-line edit there and nowhere else. The second layer maps those onto semantic names
(`--tgd-surface`, `--tgd-ink`, `--tgd-accent`, …) that shared components and the QA scripts
consume.

**There is one axis now: scheme.** The three-world axis (`data-world`) went with the design that
needed it. Both people sit in the same room; what distinguishes their pages is the evidence on
them, not the palette under it.

**The site is dark-first.** `:root` carries the dark values and `[data-theme="light"]` overrides
them — the reverse of the file this replaces. That reversal is what makes the no-JS default dark:
a document with no attribute renders `:root`, and `:root` is the dark room. `qa:schemes` asserts
exactly that, with JavaScript disabled and the OS asking for light.

Every translucent surface on the page and every `rgba()` inside the room is written against
`--f-ink-rgb`, so **one variable inverts the whole site's glass and the whole room at once.** That
is the mechanism, not the values, that makes light mode work — preserve it.

`src/styles/global.css` points Tailwind's `@theme` at the token layer. The block is `@theme
inline` so a utility resolves its token at the element rather than once on `:root`, which is what
lets a utility follow `[data-theme="light"]`.

### Deploy, and the DNS records someone has to add

The site deploys to GitHub Pages from `.github/workflows/deploy.yml`: build, every QA script,
Lighthouse CI, then `actions/deploy-pages` — and only on `main`. A pull request runs everything
except the deploy, so a PR that breaks a budget line does not merge.

**Set the Pages source to Actions before the first run.** In the repository, Settings → Pages →
Build and deployment → Source → **GitHub Actions**. Then set the custom domain to
`thegeekdogs.com` and tick **Enforce HTTPS** once the DNS below has propagated. `public/CNAME`
already carries the domain, so the custom domain survives every redeploy.

If Firebase Analytics is wanted, add the seven values from `.env.example` as repository secrets
under Settings → Secrets and variables → Actions. Without them the site builds and deploys fine and
simply ships no analytics.

**DNS at GoDaddy.** GoDaddy has no `ALIAS`/`ANAME` record at the apex, so the apex needs the four A
records. Verified against GitHub's documentation on 2026-09-05:
<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |
| AAAA | `@` | `2606:50c0:8000::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8001::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8002::153` | 1 hour |
| AAAA | `@` | `2606:50c0:8003::153` | 1 hour |
| CNAME | `www` | `<github-username>.github.io` | 1 hour |

The AAAA records are optional but recommended; the four A records are the required part. Replace
`<github-username>` with the account that owns the repository — the value is the account's default
Pages domain, with no repository name after it. Delete GoDaddy's default parked-domain A record and
its `www` CNAME first, or they will conflict. Once both apex and `www` resolve, GitHub serves the
`www` → apex redirect and the certificate itself; nothing further is needed at the registrar.

These records are documented by GitHub and have changed before. Re-check the page above before
applying them if this file is more than a few months old.
