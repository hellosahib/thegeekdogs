# Round 5 — Fact Checker, built-output pass (`dist-runA`)

Subject: the frozen build at
`/private/tmp/claude-502/-Users-sahib-singh-FlutterProjects-tgd-website/5beb27f0-7e2b-48fb-a55a-4ca9ee01f2ad/scratchpad/dist-runA`.
Read against `COPY.md` (current, post-round-11), `FACTS.md` (rounds 1–4), and `QUESTIONS.md` items
13, 14, 36, 53, 56, 63, 66, 68, 69, 70, 72, 73. Every HTML file in the build was stripped of markup
with a small Python script (`extract.py` in the scratchpad) to get exactly what a browser renders as
text, plus separate extraction of `<script type="application/ld+json">` blocks, `<meta>`/`<link>`
tags, `<img>` tags and `<a href>` targets. Screenshots and OG PNGs were opened with the Read tool
and inspected directly, not inferred from filenames.

## Verdict: BLOCKED

Not "changes requested" — the build is missing two entire routes that `COPY.md` §6 and §7 write in
full and that three rounds of `FACTS.md` fact-checking were spent verifying. That is not a wording
difference QA can wave through; it is content that does not exist on the site a visitor will see,
and its absence breaks the nav and a whole page section as a direct consequence (below). Everything
that *did* ship is in very good shape — meta, JSON-LD, alt text, stage indicator strings and the
marker/forbidden-word sweep are all clean — but the site as built cannot go out this way.

## What is actually in the build

Six HTML files: `index.html`, `contact/index.html`, `work/index.html`,
`work/pocket-manager/index.html`, `work/wedding-planner/index.html`, `404.html`. Sitemap
(`sitemap-0.xml`) lists exactly five URLs: `/`, `/contact/`, `/work/`, `/work/pocket-manager/`,
`/work/wedding-planner/`. **There is no `/sahib/` and no `/tanya/` anywhere in this build** — no
directory, no file, no sitemap entry. `COPY.md` §6 (`/sahib/`) and §7 (`/tanya/`) between them
specify a headline, role line, body, work cards, quotes, a background list, GitHub/LinkedIn links
and full meta for each person — none of it is rendered anywhere in `dist-runA`. This is corroborated
independently by `docs/reviews/runA/notes-a.json` (this run's own a11y tab-stop log), whose tab
order on every page jumps straight from `"TheGeekDogs, home"` to `"Work"` — confirming the missing
nav items were already true at capture time, not an artifact of this pass.

## Per-route parity table

| Route | Exists in build? | String parity vs `COPY.md` | Notes |
|---|---|---|---|
| `/` | Yes | Matches, with the exceptions in the numbered list below | Hero, floor, gates, proof, stage track, "what you get", final CTA, footer all verified word-for-word |
| `/contact/` | Yes | Matches exactly | Header, three routes, all three addresses, engagement line, footer — all verbatim |
| `/work/` | Yes | Matches exactly | Intro (short form), both cards, both stage tracks, meta |
| `/work/pocket-manager/` | Yes | Matches exactly | Header, Problem, Build, Review process, Outcome, four alt lines, meta — all verbatim; no privacy section (correct) |
| `/work/wedding-planner/` | Yes | Matches exactly | Header, differentiator, feature list (7 items), "why not out yet", one screenshot with matching alt, meta — all verbatim |
| `/sahib/` | **No — 404s** | N/A | Entire §6 content unrendered anywhere |
| `/tanya/` | **No — 404s** | N/A | Entire §7 content unrendered anywhere |
| `/404.html` | Yes | Headline and link label match | Ships a second link the copy explicitly forbids — see finding 6 |

## Marker-leak sweep

Grepped the full build (`*.html`, `*.xml`, `*.json`, `*.txt`) for every string on the list:
`[CONFIRM`, `[FILL`, `TODO`, `placeholder`, `Milan`, `wedme`, `lorem`, `example.com`, `href="#"`,
`New Delhi`, `Delhi`, `8630059091`, `9878951565`, `on-device`, `bride`, `groom`, `ad-free`, `invite`,
`co-planner`, `plan together`.

**Zero hits on every one of them.** No marker survived, no forbidden word appears, no dead link
(`href="#"`), no phone number, no city other than Bengaluru. OG PNG filenames
(`contact.png`, `home.png`, `pocket-manager.png`, `wedding-planner.png`, `work.png`) carry no
placeholder name either. This is the cleanest part of the build.

## JSON-LD findings

Present on every page except `404.html` (correct — a noindex error page needs none).

- **Organization**: `name: "TheGeekDogs"`, `email: "thegeekdogs@gmail.com"`, `address.addressLocality: "Bengaluru"` and nothing else in the address — compliant, no street address, no second city.
- **Person (Sahib)**: `name: "Sahib Singh"`, `sameAs: ["https://github.com/hellosahib", "https://www.linkedin.com/in/sahib-singh-876959143/"]`. No gender/pronoun field. URLs match `FACTS.md` rows 15 and 37 exactly.
- **Person (Tanya)**: `name: "Tanya Jain"`, `sameAs: ["https://github.com/Tanya-jain99", "https://www.linkedin.com/in/tanyajain06/"]`. No gender/pronoun field. URLs match `FACTS.md` rows 16 and 38.
- **SoftwareApplication (Pocket Manager)**: `name: "Pocket Manager"`, `alternateName: "Pocket Manager | Finance Manager"`, `sameAs`/`installUrl` both the correct Play Store URL (`id=com.thegeekdogs.pocketguard2`), `aggregateRating: {ratingValue: 4.3, reviewCount: 24, bestRating: 5, worstRating: 1}` — matches `FACTS.md` row 2 exactly. `applicationCategory: "FinanceApplication"` — a real schema.org category, no placeholder leak.
- **SoftwareApplication (wedding planner)**: `name: "A wedding planner"`, no `sameAs`, no `installUrl`, no `aggregateRating`, no `applicationCategory` at all. Correctly has no store URL and no rating. One thing worth a second look: it does carry a `name` field (the descriptive string `COPY.md` §3.3/§5.1 explicitly authorizes as the product's name-agnostic identity, not the internal codename) — if the intent behind "the entry has no name" was literally an absent `name` property, this doesn't satisfy that; if the intent was "no leaked internal working title," it's compliant, since the string used is the approved descriptive one and the internal label never appears anywhere in the build (confirmed by the marker sweep above).

## Meta findings

Checked `<title>`, `<meta name="description">`, `og:title`, `og:description`, `<link rel="canonical">`,
`<meta name="robots">`, and both `theme-color` tags on all six files, against `COPY.md` §2.11, §3.4,
§4.8, §5.6, §8.4 and §9.

**All fully compliant, on every page:**
- Titles, descriptions, OG title/description match `COPY.md` verbatim on all five real routes and 404.
- Canonicals are absolute `https://thegeekdogs.com/...` with a trailing slash on every page (404's is `.../404/`).
- `robots: noindex` appears on `404.html` only — no other page carries it.
- `theme-color` is present twice on every page, correctly split by `prefers-color-scheme`: `#F1F3F0` (light) and `#18292D` (dark).
- OG image text was checked visually (see Images, below) for the three pages `COPY.md` specifies OG image text for (home, Pocket Manager, wedding planner) and matches exactly, character for character.
- No stale `4.6★` rating anywhere in the build (the only `4.6` substring found anywhere is unrelated SVG path coordinates for the theme-toggle icon). No `50+` anywhere either.

## Image findings

- Pocket Manager's four `<img alt>` lines match `COPY.md` §4.7 verbatim, one for one (`01-home`, `02-calendar`, `04-categories`, `05-export`).
- The wedding-planner page ships exactly one screenshot (`01-planning-board-functions.png`), and its alt line matches §5.5's approved text exactly. No `02`/`05` (the forbidden vendor-comparison screens) and no `03`/`04` (still gated on item 73, which is unanswered in `QUESTIONS.md` — correctly still absent).
- Opened all five shipped screenshots directly: none show the internal working title, "Milan," or any other placeholder brand — the wedding-planner screenshot shows only generic sample content ("Priya · Arjun," "Sangeet," "Wedding," "Reception," "Haldi Sunset"). Pocket Manager's four screens show real September 2026 seeded data matching their alt text exactly (the calendar screen's "3 September," the stats screen's seven-day bar chart and category percentages, the settings screen's three Beta-tagged rows).
- OG images for home, Pocket Manager and wedding planner were opened directly and match `COPY.md`'s OG image text fields exactly, including the exact line breaks.

## Stage-indicator findings

Checked on `/`, `/work/`, `/work/pocket-manager/` and `/work/wedding-planner/`. Pocket Manager's
current state prints `Live`, the wedding planner's prints `Final touches`, matching §2.8/§10.4
exactly. The spoken-state pattern from §10.4 (`{Stage name}. {State}.`) is rendered verbatim,
e.g. `Live. Where it is now.` and `Submitted for review. Not yet.` — matches the worked examples in
COPY.md character for character. No date, estimate, or "expected" string appears anywhere near any
instance of the track.

## Numbered list of differences

1. **Route, `/sahib/` and `/tanya/` — entire routes missing.** `COPY.md` §6 and §7 specify full
   pages for both. Built state: both URLs are absent from the build and from the sitemap; visiting
   either 404s. Nothing to compare string-for-string because nothing renders.
2. **`/` and every other page, header/footer nav — two items missing.** Approved (`COPY.md` §1 Nav
   labels): four items, `Work`, `Sahib`, `Tanya`, `Contact`. Built: `<nav aria-label="Primary">`
   and the footer nav both contain only `Work` and `Contact` — two of the four required items are
   simply not there, a direct consequence of finding 1.
3. **`/`, §2.9a work-card strip — the two "in full" links are missing entirely.** Approved: a link
   per row, `Sahib's work in full` (accessible name `Sahib's work in full, on his page`) and
   `Tanya's work in full` (`Tanya's work in full, on her page`). Built: each `<div class="strip__row">`
   contains only the `<h2>` name and the `<ul>` of cards — no `<a>` element at all in either row.
   Again a direct consequence of finding 1: there is no `/sahib/` or `/tanya/` to link to.
4. **`/`, §2.9a Tanya's work-card-strip years — month precision dropped.** Approved (`COPY.md` §7.2,
   which §2.9a says prints "as those sections give them"): `Jan 2024 – now` (Motive) and
   `Aug 2021 – Dec 2023` (HSBC). Built: `2024 – now` and `2021 – 2023` — both months stripped out.
   (Sahib's two cards on the same strip are correctly year-only, because his own §6.2 source fields
   are year-only — this difference is specific to Tanya's row.)
5. **Sitewide persistent contact plate — visible text doesn't match its own spec in `COPY.md` §1.**
   Approved (§1, "Persistent contact affordance"): Label `Start a project`, accessible name
   `Start a project. Opens an email to thegeekdogs@gmail.com`. Built: the sitewide element
   (`data-cta="contact-plate"`, present on every one of the six pages including 404) renders the
   visible text `thegeekdogs@gmail.com` with no `aria-label` at all. This actually matches the
   *later* decision in `QUESTIONS.md` item 53 ("print the addresses") and `COPY.md` §8.2's own note
   ("the plate... [is a] mailto: link over the visible address, not a label over a hidden one") —
   but §1 itself was never edited to match, so `COPY.md` currently contains two contradictory specs
   for the same element and the build follows the newer, unwritten-in-§1 one. This is exactly the
   kind of stale-revision gap the brief for this round called out (cf. the already-fixed §2.6/§2.3
   examples) — §1 needs a copy fix, not the build.
6. **`/404.html` — ships two links, not one.** Approved (`COPY.md` §9): "Four words and one link...
   the body, the second link and the third are cut." Built: the page has the `Back to the studio`
   link *and* the sitewide contact plate (`mailto:thegeekdogs@gmail.com`) described in finding 5 —
   a second link that the copy explicitly says must not be there. Direct consequence of the contact
   plate being wired sitewide rather than scoped to the pages `COPY.md` §1 describes it for ("Follows
   the visitor down the home page").

## What's clean (no finding needed)

Everything not listed above was checked and matches: hero, floor intro, both human cards' body and
gate lists (§2.3), all seven agent cards and their `Checked by` mappings (§2.4, including the
design-review/ship-approval joint-ownership strings from items 56/70), the empty chair (§2.5), the
four gates and their exact bodies (§2.6), the Pocket Manager and wedding-planner proof paragraphs
including the item-68 pipeline clause (§2.7), the shared stage track (§2.8), "what you get" (§2.9),
final CTA (§2.10), all of `/work/`, all of `/work/pocket-manager/` (including the "since 2020," "4.3
stars from 24 reviews," and Firebase/no-network-layer build facts, with no "on-device only" claim
anywhere), all of `/work/wedding-planner/` (including all seven feature bullets, the "why it isn't
out yet" paragraph, and no collaboration/vendor/payment/gendered language), all of `/contact/`
(all three addresses, the engagement line, no contact form of any kind), and `/404.html`'s headline
and link label. Footer disclaimer, rights line, and the four `Elsewhere` links (Sahib/Tanya ×
GitHub/LinkedIn, correct URLs) are identical on all six pages.

## Engineer-authored copy

None found. Every printed string traces to `COPY.md`, `FACTS.md`, or a `QUESTIONS.md` owner answer
except the two contact-plate items already flagged (findings 5–6), which are a wiring/scope gap, not
invented wording — the text itself (`thegeekdogs@gmail.com`) is approved copy, just rendered in a
place and manner `COPY.md` §1 didn't anticipate.

## Recommendation

Do not publish this build. Before it goes back to QA: (1) build and ship `/sahib/` and `/tanya/`
from `COPY.md` §6/§7, which restores the nav and the work-card-strip links as a side effect; (2)
fix Tanya's work-card-strip years to print the month-level strings §7.2 already specifies; (3)
either scope the persistent contact plate off `/404.html` (restoring "one link only") or get an
explicit decision that the plate is sitewide and update `COPY.md` §1 to match what's actually
shipping, including its accessible-name treatment.
