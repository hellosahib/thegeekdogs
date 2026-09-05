# thegeekdogs.com

Static site for TheGeekDogs, built the way the site says work gets built: agents draft, humans review, nothing ships unchecked.

**Status: gates 1 and 3 passed. Every route in brief §8 is built — home with the isometric floor, `/work/` and both case studies, `/contact/`, `/sahib/`, `/tanya/` and `/404` — in both schemes, with OG cards, structured data and a print stylesheet. `/404` is the empty room DESIGN.md §B.11 asks for — the floor's own slab and lamp, no desks, no chair — and the contact plate now prints its label below 768 (DESIGN.md §B.10, round 10). Lighthouse 100/100/100/100 on all eight routes in both schemes, `/404.html`'s SEO excepted, which is `is-crawlable` on a `noindex` page. Open: font subsetting and fallback-metric matching (step 8), and both headshots.** Local commits only; a human pushes.

## What needs you now

1. Open [QUESTIONS.md](QUESTIONS.md). Items 1 to 55 are answered. Items 56 to 67 are open; 56 (who cuts the release), 57 (Firebase config), 58 (repo name and push), 64 (cabin props) and 67 (Astro 7) block the next steps.
2. Read [DESIGN.md](DESIGN.md) §B (studio), §C (the floor), §F (Sahib), §G (Tanya). Say yes, or say what is wrong, per section.
3. Skim [COPY.md](COPY.md) for anything you would not put your name to. Every `[CONFIRM]` and `[FILL]` in it is a question in QUESTIONS.md.

## The documents

| File | Owner | What it is |
|---|---|---|
| [docs/brief.md](docs/brief.md) | you | The brief. Every decision cites a section of it. |
| [DESIGN.md](DESIGN.md) | Design Lead | Reference study, three token systems with computed contrast, the floor composition, work cards, stage indicator, both person-page directions, motion spec, open questions. |
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
- restricts **Anek Latin's `wdth` axis to 75–100** with `fonttools varLib.instancer`, which
  §1.5 makes part of the build step rather than optional. The axis stays *live* and
  narrower, because §B.3's numerals are `wdth` 87.5 and §G.2's labels are `wdth` 75;
  `wght` keeps its full 100–800, and the build fails if either axis is gone;
- **asserts `tnum` survives.** DESIGN.md §B.3's tabular figures are why the Spline Sans
  Mono fallback is not needed, and a subsetter that quietly dropped the feature would take
  the argument with it;
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
| `npm run qa:contrast` | any DESIGN.md colour pair below AA, or any pair whose computed ratio disagrees with the figure DESIGN.md publishes — including the marks declared at an alpha, checked at their composite |
| `npm run qa:worlds` | a world token that computes to something other than DESIGN.md's hex, measured in a browser on the real page in both schemes. It exists because `[data-world="…"]` and `:root` weigh the same, so a partial imported in the wrong order silently hands a world the studio's palette |
| `npm run qa:plate` | a load-bearing mark whose right edge falls inside the contact plate's band (DESIGN.md §B.10's composition rule), measured as ink rather than as a box, on every route at eight widths |
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

### How the theme scopes work

`src/styles/tokens.css` holds every value DESIGN.md names, in two layers. The first layer is
DESIGN.md's own token names, transcribed exactly (`--floor`, `--sheet`, `--s-ground`, `--t-core`,
and so on) — a value change in DESIGN.md is a one-line edit there and nowhere else. The second
layer maps those onto semantic names (`--tgd-surface`, `--tgd-ink`, `--tgd-accent`, …) that shared
components consume, redeclared under `[data-world="sahib"]` and `[data-world="tanya"]`.

`src/styles/global.css` points Tailwind's `@theme` at the semantic layer, so `bg-surface-alt`
compiles to `background-color: var(--tgd-surface-alt)`. **The block is `@theme inline`, and it has
to be**: plain `@theme` computes the value once on `:root` and inherits it, which would freeze all
three worlds to the studio palette. `inline` substitutes the reference into the utility so it
resolves at the element, inside whichever world scope it sits in.

Setting a world is one prop: `<BaseLayout world="tanya">`. One Tailwind build, one CSS bundle,
three visual worlds.

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
