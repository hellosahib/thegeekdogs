# Round 7 — Fact Checker, final parity pass (`dist-final`, commit `6283b4a`)

Subject: the frozen copy at
`/private/tmp/claude-502/-Users-sahib-singh-FlutterProjects-tgd-website/5beb27f0-7e2b-48fb-a55a-4ca9ee01f2ad/scratchpad/dist-final`.
A short parity pass covering only what changed since round 6's built-output pass on `dist-runB`
(`docs/reviews/runB-fact-check.md`). Visible text of `/sahib/` and `/tanya/` extracted with the same
`HTMLParser`-based script used in round 6 and diffed line-for-line against a fresh extraction of
`dist-runB`'s own `/sahib/` and `/tanya/` (the round 6 baseline), rather than against `COPY.md`
directly, so every line that moved since round 6 — not just the three expected strings — surfaces.
Read against `COPY.md` §1, §6.1, §6.2, §7.1, §7.2, §9, and `docs/scratch/engineer.md`'s "Build run D"
and "Build run E" entries for what the Engineer re-transcribed and why.

## Verdict: APPROVED, one difference worth recording (a documented design removal, not a copy bug)

The three expected new strings — `/sahib/`'s two section lines and `/tanya/`'s Motive Android-edge
annotation — all print verbatim, in the right place, and nothing else on either page drifted from
`COPY.md` except one line that a build-run-E design ruling deliberately pulled off the render (see
finding 1). The sub-768 plate gap round 6 flagged is closed on all eight routes. The full round-6
sweep list is still zero hits everywhere. Font subset glyph coverage is complete for every character
actually used on the site.

## Parity table, the three changed strings

| String | Where `COPY.md` places it | Found in `dist-final` | Match |
|---|---|---|---|
| `What he ships and where` | §6.1, map section line, above the coverage map's lead-in | `/sahib/`, `<h2 class="section-line">` immediately before "Five surfaces, five places..." | Exact |
| `The roles behind the map` | §6.2, cards section line, above the work-card list | `/sahib/`, `<h2 class="section-line">` immediately before Card 1 (Keenai Global) | Exact |
| `Jetpack Compose migration, and the Android releases she owns: phased rollouts, crash and ANR monitoring.` | §7.2, "Android-edge annotation (Motive)", the small print on the Android edge's Motive card | `/tanya/`, inside `edgeAnnotations`, Android field, preceded by the `fromCompany` label `Motive` | Exact |

`Motive` now appears on all three layers of `/tanya/`'s band as designed: the core card (`Motive`,
`Motive Fleet App...`), the iOS edge (`Motive Fleet App`), and the Android edge (`Motive` label plus
the annotation above). This matches `docs/scratch/engineer.md`'s "Build run E" note that this was
the last of the three run-D-open items (T1) to land, and that the annotation deliberately does not
repeat the word "Motive" inside its own sentence, relying on the `fromCompany` label printed above
it instead.

## Diff against the round 6 baseline, full pages

**`/sahib/`:** only the two section lines above, plus the sub-768 plate fix (see below). Nothing
else moved.

**`/tanya/`:** the Motive annotation and its `fromCompany` label, plus the sub-768 plate fix, plus
two cosmetic-only changes that are not copy changes:
- The gates line (`Spec, code and design review, device QA, security and privacy, ASO, release
  cut.`) now renders as a real `<ul>` with one `<li>` per gate instead of one comma-separated
  sentence. Same six words, same order, same terminal full stop dropped from the list (a list is
  not a sentence); this is the build-run-E line-breaking change documented in
  `docs/scratch/engineer.md`, not a wording change.
- The two quote lines render with visible straight-quote characters around them (semantic
  `<blockquote>` styling) where round 6's extraction showed them unquoted; the words inside are
  identical.

**One difference, recorded rather than treated as a silent pass:** `COPY.md` §7.1's "Second
paragraph" — `Underneath that is the shape she works on: a shared core, native code at the edges,
and the developer practices that keep the two from drifting apart.` — was a live, visible `<p>` in
`dist-runB` and is **not rendered** in `dist-final`. Checked directly in the shipped HTML: the
sentence is not gone from the source, it is moved into an HTML comment, and the comment itself
explains the decision in the Engineer's own words, citing "§J round 12, `/tanya/`'s 'remove one
thing'" and arguing the page's own KMP-built structure already makes the point the sentence made.
This is a real, documented design call (also referenced in `docs/scratch/engineer.md`'s Build run D
"§J's three remaining live rows" note), not an unauthorized cut or an engineer-invented edit — but
it is a place where the shipped page no longer matches `COPY.md`'s own text, which `COPY.md` itself
was never updated to reflect. Recording it here per the "nothing else changed against `COPY.md`"
instruction, the same way round 6 recorded the sub-768 gap: known, reasoned, not blocking, but on
the record.

## Sub-768 plate, all eight routes

`.plate__label{display:none}` by default, overridden to `display:inline` under
`@media (width<=767px)`, with `.plate__address` doing the reverse — confirmed in
`_astro/style.DrcBOPU7.css`. This closes round 6's one open finding. Accessible name pattern and
per-page address checked directly in each route's HTML:

| Route | `aria-label` on the plate | Address correct |
|---|---|---|
| `/` | `Email thegeekdogs@gmail.com. Opens a new message about a project.` | Yes |
| `/contact/` | same, `thegeekdogs@gmail.com` | Yes |
| `/work/` | same, `thegeekdogs@gmail.com` | Yes |
| `/work/pocket-manager/` | same, `thegeekdogs@gmail.com` | Yes |
| `/work/wedding-planner/` | same, `thegeekdogs@gmail.com` | Yes |
| `/sahib/` | `Email sahiboffc@gmail.com. Opens a new message about a project.` | Yes |
| `/tanya/` | `Email jaintanya999@gmail.com. Opens a new message about a project.` | Yes |
| `/404.html` | `Email thegeekdogs@gmail.com. Opens a new message about a project.` | Yes |

## `/404.html`

Unchanged from round 6: headline, one content link ("Back to the studio"), the sitewide plate as
chrome per `COPY.md` §9's own carve-out, `<meta name="robots" content="noindex">` present. Text
extraction shows nothing beyond headline, nav/footer chrome, one link, and the plate.

## Sweep: twenty terms plus pronouns, full build

Grepped every `*.html`, `*.xml`, `*.json`, `*.txt` in `dist-final`, case-insensitive, for the full
round-6 list: `[CONFIRM`, `[FILL`, `TODO`, `placeholder`, `Milan`, `wedme`, `lorem`, `example.com`,
`href="#"`, `New Delhi`, `Delhi`, `8630059091`, `9878951565`, `on-device`, `bride`, `groom`,
`ad-free`, `invite`, `co-planner`, `plan together`, `by his account`.

**Zero hits on every term**, including the OG filenames (`og/sahib.png`, `og/tanya.png`, no
placeholder name in either) and `sitemap-0.xml` (seven URLs, all real routes, no stray entry).
`by his own account` (with "own") is present on `/sahib/`'s smallcase card, correctly not matching
the forbidden `by his account` substring. Pronoun check: `/sahib/` — three "He", six "he", two "him",
one "his", zero "she"/"her"/"hers". `/tanya/` — zero "his"/"him" outside the already-cleared quote
attribution and footer disclaimer (unchanged from round 6).

## JSON-LD

Extracted every `<script type="application/ld+json">` block on `/`, `/contact/`, `/work/`,
`/sahib/`, `/tanya/` and diffed byte-for-byte against the same blocks in `dist-runB`. All five
routes: identical. No new or removed schema, no changed `sameAs`, no changed `aggregateRating`, no
`jobTitle` field (still absent everywhere, still not a gap — never specified in `COPY.md` or
`DESIGN.md`). Matches the check's expectation of zero change.

## Fonts and glyph coverage

Two subset files ship: `fonts/anek-latin-subset.woff2` (48,432 B) and
`fonts/instrument-sans-subset.woff2` (20,552 B), matching the sizes `docs/scratch/engineer.md`'s
Build run E table reports. Read both with `fontTools` directly (not just measured by file size):
each subset's `cmap` covers 106 codepoints. Every character actually printed anywhere in
`dist-final`'s HTML was extracted and checked against both cmaps:

- All visible text on `/sahib/` and `/tanya/` is ASCII plus `©` (U+00A9) and `–`, the en dash
  (U+2013) — both present in both subsets.
- `₹` (U+20B9) is **not** in either subset's cmap, but a full-build grep confirms the rupee sign is
  not used anywhere in `dist-final`'s HTML, so this is not a live gap.
- A full-build grep for the Unicode replacement character (mojibake's usual tell) returned zero
  hits in any HTML file.

Visual spot-check: screenshots of `/sahib/` and `/tanya/` at 1440 (both color schemes, as served)
render crisp text with no missing-glyph boxes at the top of each page and in the coverage-map's
filled cells (`FlutterKeenai Wealth, Keenai Pulse`, `native iOSMotive Fleet and Driver apps`, etc.,
read directly off computed cell content) and the `/tanya/` band. The Android-edge annotation string
was independently confirmed present and readable via the rendered accessibility tree, not just the
HTML source. The sandbox's browser pane was intermittently unable to hold a rendered frame while
scrolled far down the page (an environment quirk, not a site defect — confirmed by cross-checking
DOM content and computed styles, which were correct and visible, at the same scroll positions where
the screenshot itself came back blank); the programmatic cmap/mojibake checks above are the
authoritative result for this check and do not depend on that.

## What's clean (no finding needed)

Everything else matches round 6 exactly: per-route existence, all five work cards on `/sahib/`,
all three on `/tanya/`, the four LinkedIn post links and mapping, both OG images, meta/canonical/OG
fields, no `<img>` tags on either person page (headshots still correctly pending), Lighthouse/CLS/
TBT figures reported by the Engineer for this build, and the JSON-LD Organization/Person entries.

## Recommendation

Ship. Finding 1 (the removed second paragraph on `/tanya/`) is a documented design decision with a
paper trail in the shipped HTML's own comment and in `docs/scratch/engineer.md`; it is not an
invented fact, a marker leak, or a broken link, so it does not block on fact-checking grounds — but
`COPY.md` §7.1 should be updated to note the line is intentionally unrendered, so the next reader of
`COPY.md` doesn't reopen this as a regression.
