# Round 6 — Fact Checker, built-output pass (`dist-runB`)

Subject: the frozen build at
`/private/tmp/claude-502/-Users-sahib-singh-FlutterProjects-tgd-website/5beb27f0-7e2b-48fb-a55a-4ca9ee01f2ad/scratchpad/dist-runB`,
all seven routes plus `/404.html`. Read against `COPY.md` (final, rounds 1–13), `FACTS.md` (all
rounds, especially section (g) and rows 40–42b), and `QUESTIONS.md` items 39, 40, 53, 63, 66, 70,
72, 73, against the background of `docs/reviews/runA-fact-check.md` (this checker's own three
findings there) and the Orchestrator's rulings on them in `REVIEWS.md` ("Run A built-output fact
pass" and the rounds that followed it). Text was extracted from every HTML file with a small Python
`HTMLParser` script to get what a browser renders, plus separate regex extraction of
`<script type="application/ld+json">`, `<meta>`/`<link>` tags, `<img>` tags and `<a href>` targets.
Both OG PNGs for the two new pages were opened with the Read tool and inspected directly.

## Verdict: APPROVED, 1 difference (a pre-flagged, already-triaged gap)

`/sahib/` and `/tanya/` now exist, are fully built, and match `COPY.md` §6/§7 word for word,
including the harder strings this round was told to look at closely: the "native" role line, the
three 35/35/14-word card lines, "50 global markets", both Udacity Nanodegree lines, "Android Intern"
at Cleartrip, the four LinkedIn posts as real hrefs in the stated order, "on LinkedIn" in the
reaction sentence, years-only on every card, Keenai Pulse, and Tickertape named. All three of run
A's findings are resolved: the nav and footer carry all four items everywhere, the work-card-strip
links exist with the correct accessible names, and Tanya's strip years are year-only (`2024 – now`,
`2021 – 2023`) matching the round-12 fix to `COPY.md` §7.2. The one open item is the sub-768 plate
label, which was already known and deferred before this pass started — see the numbered list.

## Per-route parity table

| Route | Exists? | String parity vs `COPY.md` | Notes |
|---|---|---|---|
| `/` | Yes | Matches | Nav now 4 items; strip carries both "work in full" links with correct accessible names; Tanya's strip years fixed to year-only |
| `/contact/` | Yes | Matches exactly | Header, three routes, all three addresses, engagement line, footer |
| `/work/` | Yes | Matches exactly | Both cards, both stage tracks, meta, JSON-LD `@graph` for both SoftwareApplications |
| `/work/pocket-manager/` | Yes | Matches exactly | Header, Problem, Build, Review, Outcome, alt lines, meta |
| `/work/wedding-planner/` | Yes | Matches exactly | Feature list, "why not out yet", one screenshot, meta |
| `/sahib/` | **Yes (new)** | Matches `COPY.md` §6 word for word, incl. map | See coverage-map table below |
| `/tanya/` | **Yes (new)** | Matches `COPY.md` §7 word for word | Quotes are semantic `<blockquote>`, attributed correctly |
| `/404.html` | Yes | Matches `COPY.md` §9 | One content link ("Back to the studio") + the sitewide plate as chrome, per the round-6/COPY-round-12 ruling that closed run A finding 6 |

## Coverage-map cell table (`/sahib/`, §6.1's five-surface map)

Built as a real `<table role="table">` with 25 `role="cell"`, 6 `columnheader`, 5 `rowheader` — not
a decorative grid. Every filled cell checked against `QUESTIONS.md` item 72 and `DESIGN.md`'s own
line 1563 gloss on it (the only place the per-cell product assignment is spelled out), and against
`FACTS.md` section (g):

| Row | Filled cells (product printed) | Supported by |
|---|---|---|
| Keenai Global | Flutter → "Keenai Wealth, Keenai Pulse"; end-to-end w/ AI → "Backend, frontend, tests" | Item 37 (Bengaluru), item 25 (Pulse), `COPY.md` §6.2 card 1 |
| Motive | native iOS → "Motive Fleet and Driver apps"; native Android → "...; Views to Compose"; KMP → "Design-components library across Fleet and Driver" | Item 45 ("native iOS: Motive"), `FACTS.md` g8, `DESIGN.md` line 1563 ("a design-components library in KMP shared across the two") |
| smallcase | native iOS → "Tickertape"; native Android → "smallcase Android app"; Flutter → "Tickertape Flutter for iOS, Android migrated" | Item 72 exactly (Android and iOS first, then the Flutter move); `FACTS.md` g7 |
| Cleartrip | native Android → "Cleartrip Android app" | `FACTS.md` g9, row 30 |
| TheGeekDogs | native Android → "Pocket Manager" | `COPY.md` §6.2 card 5 |

No cell claims a product `FACTS.md` does not support, and no cell is filled outside the ten
`DESIGN.md` line 1576 authorizes ("all five columns and all five rows... ten of twenty-five
cells"). The Motive/KMP cell's wording traces to `DESIGN.md`'s own gloss rather than to the résumé
directly (the résumé attributes the design-components library and the KMP work as two separate
bullets, `FACTS.md` g8) — this is a design decision already made and ruled on, not a new gap, so it
is noted here rather than listed as a finding.

## Marker and forbidden-word sweep

Grepped the full build (`*.html`, `*.xml`, `*.json`, `*.txt`, case-insensitive) for every term on
the list: `[CONFIRM`, `[FILL`, `TODO`, `placeholder`, `Milan`, `wedme`, `lorem`, `example.com`,
`href="#"`, `New Delhi`, `Delhi`, `8630059091`, `9878951565`, `on-device`, `bride`, `groom`,
`ad-free`, `invite`, `co-planner`, `plan together`, `by his account`.

**Zero hits on every one of them**, including on the two new routes and their OG filenames
(`og/sahib.png`, `og/tanya.png` — no placeholder name in either). `COPY.md`'s own "by his own
account" (with "own") appears on `/sahib/`, which does not match the forbidden "by his account"
substring — correctly not a hit.

**Pronoun check.** `/tanya/` uses "she"/"her"/"hers" throughout for Tanya; the only "his"/"him" on
the page is inside the attributed quote line ("Sahib Singh, who worked alongside her at Motive" —
"her" refers to Tanya, correct) and the shared footer disclaimer ("None of them are clients..." —
"them" refers to companies, not a person). `/sahib/` uses "he"/"his"/"him" throughout with zero
instances of "she"/"her". No pronoun for either founder falls outside their approved set anywhere
in the build.

## JSON-LD findings

Checked on all seven routes (absent, correctly, on `404.html`).

- **Organization**: `name: "TheGeekDogs"`, `email: "thegeekdogs@gmail.com"`, `address.addressLocality: "Bengaluru"` only — identical on every page.
- **Person (Sahib)**: `sameAs: ["https://github.com/hellosahib", "https://www.linkedin.com/in/sahib-singh-876959143/"]` — exactly the two URLs, matching `FACTS.md` rows 15/37.
- **Person (Tanya)**: `sameAs: ["https://github.com/Tanya-jain99", "https://www.linkedin.com/in/tanyajain06/"]` — exactly the two URLs, matching `FACTS.md` rows 16/38.
- **No `jobTitle` field exists anywhere in the schema** (confirmed by a full-build grep, zero hits). This isn't a gap: `PLAN.md`'s content-collection schema never defines one, and neither `COPY.md` nor `DESIGN.md` ever specifies a `jobTitle` value for either Person entry — there is nothing to check for mismatch, and none was invented.
- Both `SoftwareApplication` entries (`Pocket Manager`, `A wedding planner`) are byte-identical to the run A build already cleared: same `aggregateRating` (4.3/24/5/1), same `installUrl`, no rating or store URL on the wedding planner, no internal working title anywhere.

## Meta and OG findings, the two new pages

`<title>`, `<meta name="description">`, canonical, and all `og:*` tags on `/sahib/` and `/tanya/`
match `COPY.md` §6.6 and §7.6 verbatim, character for character, including the exact OG description
sentences. Both OG PNGs (`og/sahib.png`, `og/tanya.png`) were opened directly: each prints
`TheGeekDogs`, the person's name, and the OG image text line under it exactly as `COPY.md` states —
`Native iOS, native Android, KMP, Flutter.` for Sahib and `Native Android, KMP, and how the work
gets made.` for Tanya, no line-break or wording drift. `/404.html`'s meta (`Page not found |
TheGeekDogs`, the description, `noindex`) is unchanged from run A and still correct.

## Link findings

Every external `href` on `/sahib/` and `/tanya/` resolves to the intended target and carries
`target="_blank" rel="noopener noreferrer"` with an `Opens a new tab.` `sr-only` span in the
accessible name:

- GitHub: `https://github.com/hellosahib`, `https://github.com/Tanya-jain99` — both appear on both
  pages' footers (item 39: "place GitHub links on both pages") and once each on the person's own
  page.
- LinkedIn: `https://www.linkedin.com/in/sahib-singh-876959143/`,
  `https://www.linkedin.com/in/tanyajain06/` — match `FACTS.md` rows 15/37 and 16/38.
- The four post URLs on `/sahib/` are in the exact order and mapping `FACTS.md` rows 40–42b lock
  down: `.../7430310577153011712/` → channelFlow vs callbackFlow, `.../7421603431334932481/` →
  Android 16, `.../7420752263364796416/` → ViewModel, `.../7419068733480022016/` → coroutine
  cancellation.
- The Play Store URL (`id=com.thegeekdogs.pocketguard2`) is unchanged and correct on `/work/` and
  `/work/pocket-manager/`.
- All three `mailto:` addresses (studio, Sahib, Tanya) point to the correct inboxes on their
  respective pages, each with the `Email <address>. Opens a new message about a project.` plate
  pattern from `COPY.md` §1 round 12/13, and the separate `sahiboffc@gmail.com` /
  `jaintanya999@gmail.com` in-page email links carry the §6.5/§7.5 `Email <Name> at <address>` form.

## Image findings

No `<img>` tag exists anywhere on `/sahib/` or `/tanya/` — confirmed by a full-page grep on both
files, zero matches. This is correct per `COPY.md` §10.1: headshots are pending owner-supplied
images and the `[CONFIRM]` marker for their alt text stays open; the pages ship with no placeholder
image, broken alt, or empty slot standing in for one. Pocket Manager's and wedding-planner's alt
text is unchanged from the already-cleared run A build.

## Numbered list of differences

1. **`/sahib/`, `/tanya/`, `/404.html` and every other page — the persistent contact plate below
   768px still prints the full address, not the `Email` label `COPY.md` §1 (round 10/13) specifies.**
   Checked directly: no CSS `content:` swap and no JS exists anywhere in the build (`_astro/` has no
   `.js` file at all) that would shorten the plate's visible text at any breakpoint — the anchor's
   text node is the full address (`sahiboffc@gmail.com`, `jaintanya999@gmail.com`,
   `thegeekdogs@gmail.com`) unconditionally. This matches `REVIEWS.md`'s own build-run-B note ("Held
   by the Engineer: the sub-768 plate (its label landed in copy round 13 after the run started)") —
   it is a known, already-triaged gap from before this pass, not a new find, and is recorded here
   once per instruction rather than raised as a fresh blocker.

## What's clean (no finding needed)

Everything checked and not listed above matches `COPY.md` exactly: the full text of `/sahib/` §6.1
through §6.6 (intro, all five work cards, the texture line, the writing section with all four post
subjects and the reaction sentence, background list, links, meta) and `/tanya/` §7.1 through §7.6
(intro, both quotes and their attribution, the closing line, all three work cards including the
HSBC card's deliberate absence of a product name and Naskay's named "Jillian Michaels fitness app",
the "How the work gets made" section's core statement and both gates-link strings, the education
line naming Meerut Institute of Engineering and Technology and Dr. A.P.J. Abdul Kalam Technical
University, background list, links, meta); the home page's now-complete nav and work-card strip;
`/contact/`'s three addresses and engagement line; `/work/`, `/work/pocket-manager/` and
`/work/wedding-planner/` (unchanged and already clean from run A); and `/404.html`'s one-link
content per the round-12 ruling. No engineer-authored copy was found anywhere — every printed
string traces to `COPY.md`, `FACTS.md`, or an owner answer in `QUESTIONS.md`, including the map's
KMP-column wording, which traces to `DESIGN.md`'s own gloss on item 72 rather than to invention.

## Recommendation

Ship. The one open item (finding 1) is cosmetic at one breakpoint, was already flagged and assigned
to the Engineer before this pass began, and touches no fact, no marker, and no link — it does not
block on fact-checking grounds. Confirm with the Engineer that it lands before the next rendered
review closes out run B.
