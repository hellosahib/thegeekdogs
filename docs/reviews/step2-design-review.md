# Step 2 — Design Lead review of rendered output

Reviewer: Design Lead (review role). Reviewed the **rendered pages only**, never the stylesheet.
`npm run build` was run once and `dist/` copied to a scratch directory; every screenshot below was
taken against that frozen copy, so a concurrent edit to the repo cannot have moved under this
review. Widths 360 / 390 / 768 / 1024 / 1440, **both schemes**, plus keyboard focus after three
Tabs, focus on a floor station, the card slot after activating the third station with Enter,
`prefers-reduced-motion: reduce`, mid-scroll with the plate up, and the toggle in both states.
Measurements are read off the rendered page (computed geometry and computed colour), not off CSS.
130 screenshots in `docs/reviews/step2/`; every one was opened and looked at.

Deliberate omissions on the Engineer's list (the SVG scene, the four nav routes and therefore the
header/footer nav, the favicon, the OG image, font subsetting, the strip's two row links, §B.8's
"The full pipeline" line, §C.6's gate-ownership block on the human cards) are not counted against
this build and are not listed as items.

## Verdict

**CHANGES REQUESTED**

The sixteen fixes that were the Engineer's are, on the evidence, **fifteen closed and two closed
only above 768**. The dark scheme is correct to the value in every palette I could measure, the
toggle is right, the roster is right, and the track is now one axis with its labels on it. What
stops this being an approval is that the mechanism chosen to close step 1 item 1 — a plate keep-out
lane — has re-gridded five of the page's seven sections at every breakpoint, which costs more of
the design than the collision it removed. That is conflict (b), and I am ruling it out below.

---

## Rulings on the two conflicts the Engineer flagged

### (a) Below 768 the plate is a full-bleed bar and passes over content mid-scroll

**§B.10's own "one component, one size, every page, every breakpoint" wins. The `< 768` full-bleed
bar is withdrawn from the spec.**

The bar is the inconsistency inside §B.10, not a considered exception to it: the section spends a
paragraph proving that all three addresses fit one 260px plate precisely so that "no wireframe
changes width", and then hands `< 768` a different component. Rendered, that different component is
the worst object on the site. Scanning nine scroll positions at 360 (`home-360-light-full.png`,
`home-360-dark-scrollmid.png`, `sec-floor-360-light.png`, `sec-gates-360-light.png`,
`sec-proof-360-dark.png`) the bar covers, in turn: the `Sahib Singh` and `Tanya Jain` roster rows,
five agent rows, **the heading and first line of the empty chair's default card**, the tail of gate
04's body, and **the Pocket Manager runner's node row**. Two of those are the page's highest-value
decisions — §C.6's "the argument is on screen before any interaction" and §E.3's track — and item 1
of the step 1 review was raised about the second of them. On `/404` at 360 and 390 the bar lands on
the sheet/footer seam and reads as a horizontal rule across the page, which is the one thing §9.4
bans by name (`404-360-light-full.png`, `404-390-dark-full.png`).

**What the Engineer should do.** Below 768 render the *same* plate: 260 × 56, `--lamp` fill, 2px
theme-`--floor` border, inset 16px from the bottom and right of the viewport, sticky in the same
wrapper. At 360 that is 276 of 360 with 84px of clear space to its left, so it stays a plate rather
than becoming the viewport. Persistence on mobile — which is the whole point of §B.10 and where
80%+ of the traffic is — is kept. §B.10's `< 768` bullet is mine to rewrite and I will; build to the
plate.

### (b) The keep-out lane forces §B.9's split forms and §C.6's side-by-side slot to 1440

**§B.5's grid and §C.6's stated breakpoints win. The keep-out lane is withdrawn entirely.**
§B.10's "it never covers content" is narrowed to what it was actually protecting: the +56px bottom
reserve, so the plate never covers a section's *last line* and never causes CLS.

The lane costs far more than the Engineer's note reports. Measured on the rendered page, the lane
is a `padding-right` of **276px at 768 and at 1024, and 216px at 1440**, applied to the shells of
five of the seven sections — floor, strip, gates, proof, offer — while the header, hero, final CTA
and footer keep the full outer margin. So the page has **two content widths and two column widths
at once**: 1200 / 78px in the hero, header and CTA, and **1044 / 65px** in everything between them
(`home-1440-light-full.png`). §B.5 gives one grid. Four things fall out of that, all visible:

- The right edge steps in and out down the page, and the toggle at x 1276–1320 sits 156px right of
  every section head under it (`toggle-1440-light-header.png` against `sec-gates-1440-light.png`).
- §B.9's hero void — "the only void on the page" — is no longer the only one. Five sections now
  carry the same dead right band, so the void stops being a device and becomes the page's default.
- At 768 the lane is 36% of the viewport: the roster's 2-up runs in 460px of 704
  (`home-768-light-full.png`).
- At 1024 §C.6's slot drops below the roster and renders as a **700 × 344 outlined empty rectangle**
  (`home-1024-light-full.png`), which is a worse outcome than any collision the lane prevents.

**What the Engineer should do.** Delete the lane. Restore §B.5's grid on every section. §B.9's split
proof band and §C.6's cols 9–12 slot come back at **1024** as both sections state. In place of the
lane, §B.10 gains one composition rule that costs no width and that I own: **no section may place a
load-bearing mark inside the bottom-right 276 × 72 of the viewport at ≥ 768.** The proof band
already satisfies it — the track's last node measures x 1132.6 against a plate starting at 1164 —
and it is a constraint on where marks go, not a tax on how wide the page is.

---

## Items

### 1. The keep-out lane re-grids five of seven sections. §B.5, §B.9
`home-1440-light-full.png`, `home-1024-light-full.png`, `home-768-light-full.png`. Measured shells:
hero/CTA/header/footer 1320 with 60px padding and twelve 78px columns; floor/strip/gates/proof/offer
1320 with 60 left and **216 right**, twelve **65px** columns. At 768 and 1024 the right padding is
276. See ruling (b). This is the item that gates the step.

### 2. The plate covers content at every scroll position below 768. §B.10, §C.6, §B.6 principle 3
`home-360-dark-scrollmid.png`, `sec-floor-360-light.png`, `sec-gates-360-light.png`. Nine of nine
sampled scroll positions at 360 put the bar over live text, including the default card's own
heading. See ruling (a). Above 768 the collision scan is clean at all three widths, so step 1 item 1
is closed there and only there.

### 3. The four gate bodies are not COPY.md §2.6's strings, and the owners' names are gone. COPY §2.6
`sec-gates-1440-light.png`, `sec-gates-360-light.png`. Rendered gate 01 opens "Before a line is
written, a person decides the shape"; COPY §2.6 writes "**Sahib** decides the shape before a line is
written". Gate 03 rendered drops "**Tanya** runs the build on"; gate 02 drops "and both of us are on
this one" and swaps "a person" for "a human"; gate 04 is rewritten. Those strings are the §B.8
wireframe's abbreviated placeholders, not Copy's finished lines — the wireframe text was never meant
to print. The cost is not stylistic: item 19's whole answer is *which* human owns each gate, and the
rendered page removes both names from three of the four while the two lines beneath them still name
Sahib and Tanya, so the section now contradicts itself in tone.

### 4. The card slot is an outlined empty box. §C.6, §9.4 — **and this is the one thing to remove**
`sec-floor-1440-light.png`, `home-1024-light-full.png`, `home-1440-dark-focus-station.png`. The slot
draws a 1px `rgba(232,237,233,.16)` rectangle around its 344px reservation. §C.6 specifies contents
and a min-height; it never asks for a container. The border converts an invisible reservation into a
visible empty container — on the human cards, which have no `Checked by` block yet, roughly 45% of
the box is ruled-off emptiness, and at 1024 it is a 700 × 344 empty rectangle. It is also the only
outlined rectangle on the site, which is the SaaS-card-kit tell §9.4 bans. Remove the border; keep
the reservation. The card's own internal 1px rule above `Checked by` stays — that one carries
meaning.

### 5. The roster is ten full-width hairlines. §B.2, §9.4
`sec-floor-1440-light.png`, `roster-hi-1440-light-greyscale.png`, `sec-floor-360-dark.png`. Each
station row carries a 1px `rgba(232,237,233,.16)` bottom border, so the one bold moment on the site
renders as an eleven-rule table. §B.2 is explicit that structural separation is done "with fill
changes and space, never with rules". The stations already have 56px rows, a 20–22px display face
and a selected fill; the rules add nothing and cost the room its character. Separate with space.
(The scene replaces this in step 3, but it ships as-is now and it is what a visitor sees today.)

### 6. The closing line sets to six lines in a 332px column. §B.4, §B.9
`sec-gates-1440-light.png`. "That's the / difference / between / generated / software and / shipped
software." at 40px in 332px is roughly 12 characters a line against §B.4's ≤ 28ch display measure.
§B.9 anchors it in cols 9–12 = 384px, and it is at 332 because of item 1. It is correct in position,
weight and vertical centring — this is a width consequence, and it resolves with the lane.

### 7. The track's shared label row is three ragged heights. §E.2, §E.3
`track-hi-1440-light.png`, `sec-proof-1440-dark.png`. §E.2 reserves **two** lines for the label row
so the five stages read as one row. At the rendered 67px column pitch, `Submitted for review` sets
to three lines and `Final touches` to two, so the header is a stepped block rather than a row and
the eye no longer takes the five stages in one pass — which is the mechanism §E.3 exists for. Also a
width consequence: the track has 510px where §B.9 gives it cols 7–12 = 588.

### 8. The strip's date column mixes granularity. §D.5, §B.6 principle 2, §B.8, §B.9
`sec-strip-1440-light.png`, `sec-strip-360-light.png`. `2025 – now` and `2023 – 2025` on Sahib's
row; `Jan 2024 – now` and `Aug 2021 – Dec 2023` on Tanya's. The date is the price position and the
reason it is tabular is so a column of them compares; two different granularities in one column
cannot. §B.8's and §B.9's wireframes both print bare years here, and COPY §6.2 states outright that
Sahib's page "prints years and never months". **Ruling: the strip prints years only** — `2024 – now`,
`2021 – 2023`. COPY §7.2's month-level strings are hers and stay, on her own page, where the full
card is rendered. This is a Copy change to a strip-only variant, not to §7.2.

### 9. The page ends on a `--band` footer below the `--floor` CTA. §B.8, §B.9
`home-1440-light-full.png`, `sec-footer-1440-light.png`. §B.8 and §B.9 both put the footer's nav
repeat, the two GitHub lines and the three micro lines **inside** the final `--floor` block, and
§B.9 names that block as what "bookends the room". Rendered, the CTA ends and a separate `--band`
footer follows, so the last fill on the page is the band and the room is bookended by a light panel.
The fill order through the seven sections is otherwise exactly §B.2a's (sheet, floor, band, sheet,
band, sheet, floor), so this is the footer alone.

### 10. The header's right edge does not align with the body's. §B.5
`toggle-1440-light-header.png` over `sec-proof-1440-light.png`. The toggle's 44px target ends at
x 1320 — correct against §B.10a — while every section head, paragraph and card under it ends at
1164. A control that is the page's only right-aligned element should sit on the same right edge as
the content. Resolves with item 1.

### 11. The CTA address drops COPY §2.10's verb. COPY §2.10, §B.9
`sec-cta-1440-light.png`. COPY §2.10 gives the primary as `Email thegeekdogs@gmail.com`; §B.9's
wireframe prints `thegeekdogs@gmail.com` as lamp text with a rule. The build took the wireframe,
which is right for the *form* (step 1 item 14 asked for exactly that) and wrong for the *string* —
copy is Copy's. **Ruling: the form is mine and stands; the string is Copy's.** Print
`Email thegeekdogs@gmail.com` as the lamp line, or Copy shortens §2.10. Either way one of the two
documents moves; the page should not arbitrate it silently.

### 12. The toggle's focus ring is built differently from every other control's. §B.2, §B.10a
`toggle-1440-light-focus.png` against `home-1440-light-focus-station-zoom.png`. On a station:
`outline: 3px --chalk`, `outline-offset: 3px`, plus a 2px `--lamp` ring outside the box — the §B.2
construction. On the toggle: `outline-offset: 0` and the `--lamp` ring is *inset*, so the amber runs
inside the 44px target instead of between the target and the outer ring. §B.10a asks for the ring
"traced around the 44 × 44 target" at 3px offset. It reads as a slightly different object under
focus; make it the same one.

### 13. The gate numeral hangs 106px from its title. §B.8, §B.9
`sec-gates-1440-light.png`. `01` sits at x 120 and `Architecture review.` at x 226. A hung numeral
binds to the line it numbers; at a full column plus gutter of separation the pair reads as two
columns that happen to be adjacent. At 360 it is correct (`sec-gates-360-light.png`) — the numeral
hangs in the 20px margin, which is exactly the relationship wanted. Close the gap at ≥ 1024.

### 14. Flagged, not an item: a second `aria-live="polite"` region appears to carry all ten cards
Reading the live regions after a toggle press returned two: the toggle's own `Dark mode on.`, and a
second whose text content is every station card concatenated. If that region is the card slot and
all ten cards are in the DOM under it, a screen reader may be told far more than the one card that
changed. This is Perf & A11y's call, not mine, and it is recorded here only because I saw it while
measuring.

### 15. Not judgeable this step, recorded so it is not forgotten: §B.2a's "only lit region"
§B.2a's first claim is that in dark the floor is both the darkest region *and* the only lit one. The
floor is measurably the darkest fill in both schemes and the band steps away from it in both
(`home-1440-dark-full.png`). The *lit* half cannot be assessed until the scene, its desk tops at
`--chalk` 22% and the lamp cone arrive in step 3. It carries forward to that review.

---

## Step 1 items verified

| # | Item | Fixed |
|---|---|---|
| 1 | Sticky plate covers the build-stage track | **Partly** — clean at 768 / 1024 / 1440 (collision scan empty; `home-1440-light-scrollmid.png`); still colliding at 360 and 390 (`home-360-dark-scrollmid.png`). See ruling (a). |
| 2 | The two runners do not share one axis | **Yes** — node centres 863.4 / 930.2 / 997.0 / 1063.8 / 1132.6, identical on both rows. `track-hi-1440-light.png` |
| 3 | Stage labels not aligned to their nodes | **Yes** — labels centred on the same five x; `Live` off by 2.0px. `track-1440-light-zoom.png` |
| 4 | Gates are a 2 × 2 grid | **Yes** — one hung-numeral column at every width. `sec-gates-1440-light.png` |
| 5 | Closing line not anchored right at 1440 | **Yes** — cols 9–12, display-section 40px, vertically centred to the group. (See item 6 for its measure.) `sec-gates-1440-light.png` |
| 6 | Numerals not hung, not two-digit | **Yes** — `01`–`04` via `decimal-leading-zero`, Anek 500, hung. `sec-gates-360-light.png` |
| 7 | No numeral-large block, nothing tabular | **Yes** — 27.36px Anek 500, `wdth` 87.5, `tabular-nums`, micro label under each. `sec-proof-1440-light.png` |
| 8 | Body measure ~79 characters | **Yes** — cap is 32em (512px at 360/768/1024, 530px at 1440); first hero line is 66 characters. `sec-hero-1440-light.png` |
| 9 | Proof is not the split band | **Partly** — at 1440 it is the full-bleed band split, prose left, track right (`sec-proof-1440-light.png`); at 1024 and 768 it stacks (`home-1024-light-full.png`). See ruling (b). |
| 10 | §2.7 ¶2, §2.8 headline/body and caption missing | **Yes** — all four print, verbatim. `sec-proof-1440-light.png` |
| 11 | "What you get" section missing | **Yes** — headline and both paragraphs. `sec-offer-1440-light.png` |
| 12 | Footer location line missing | **Yes** — `Bengaluru. We work in IST.`, matching COPY §1 as it now stands. `sec-footer-1440-light.png` |
| 13 | /404 has no contact plate | **Yes** — present at all five widths, both schemes. `404-1440-light-full.png`, `404-360-dark-full.png` |
| 14 | A fourth amber | **Yes** — three: the focus-only skip link, the plate, and the CTA address as lamp text on `--floor` with a rule. `sec-cta-1440-light.png` |
| 15 | /404 ends on a loose edge | **Yes** — footer bottom equals document bottom at every width; no bare sheet below. `404-768-light-full.png` |
| 16 | DESIGN.md contradicts itself on the current node's connector | **Yes** — §E.1 is now normative and §E.2/§E.3 corrected; the render follows it, solid out of `◉`, dashes from the first future node. `track-hi-1440-dark.png` |
| 17 | The trailing `Stage:` line at ≥ 768 | **Yes** — `display: none` at ≥ 768, and at 360 it prints *above* its track, where COPY §10.4 puts it. `track-hi-360-light.png` |

Fifteen closed outright, two closed above 768 only, both because of the plate.

---

## Passed

- **Ten stations, DOM order, focusable buttons.** `sahib-singh → tanya-jain → spec-writer →
  designer → programmer → test-engineer → security-auditor → reviewer → release-watcher →
  ship-approval` — §C.8's tab order exactly, identical at every width, each a `<button>` with an
  accessible name in COPY §10.2's pattern. §C.2, §C.8. `sec-floor-1440-light.png`
- **The slot defaults to the empty chair's card, at every width and in both schemes.** §C.6.
  `sec-floor-1440-light.png`, `sec-floor-360-light.png`
- **Focus and activation both write to the slot, in the same place.** Focus on a station takes the
  ring *and* the selected fill *and* updates the slot; Enter on the third station replaces the slot
  with Spec Writer's card. §C.6, §C.8, §B.6 principle 3.
  `home-1440-light-focus-station-zoom.png`, `home-1440-light-card-station3-enter.png`
- **No reflow on activation.** Slot height 344 → 344 at 1440 and 320 → 320 at 360; document height
  6065 and 6636 unchanged before and after. §C.6. `home-360-dark-card-station3-enter.png`
- **Min-heights hold.** 344px at 1024 and 1440, 320px at 360 and 390, measured. §C.6.
- **The two-tone focus ring on a station.** 3px `--chalk` outer, 3px offset, 2px `--lamp` inner, in
  both schemes. §B.2, §B.2a, §C.8. `home-360-dark-focus-station-zoom.png`
- **All seven `Checked by` labels render**, one per agent card, in a sub-block separated by 16px and
  a 1px rule. §C.6 item 3. `home-1440-light-card-station3-enter.png`
- **Toggle position, size and order.** 44 × 44 at both widths; right edge on the content edge (340 of
  360, 1320 of 1440); second header row at 360, wordmark row at 1440; last in tab order. §B.10a.
  `toggle-360-light-header.png`, `toggle-1440-dark-header.png`
- **Toggle states are shape, not colour.** Light = outlined shade on a stem; dark = the same shade
  plus a filled cone. Legible at 20px and in greyscale. Monochrome `--ink`, never `--lamp`. §B.10a.
  `toggle-hi-1440-light.png`, `toggle-hi-1440-dark.png`
- **No page-wide transition.** The only declared transition anywhere on either page is
  `opacity, transform 0.12s` on the glyph's cone path. §B.10a's hard rule.
  `home-1440-light-after-toggle-top.png`
- **The toggle's accessible name and live announcement.** `Switch to dark mode` / `Switch to light
  mode`, and a polite `Dark mode on.` / `Light mode on.` COPY §1.
- **Every dark token matches §B.2a to the hex.** `--floor #07181b`, `--sheet #18292d`,
  `--band #213539`, `--muted #93a6a8`, `--chalk` and `--lamp` unchanged, `--ink` = `--chalk`.
- **The floor is the darkest fill on the dark page and the band steps away from it**, at all five
  widths. §B.2a. `home-1440-dark-full.png`, `home-360-dark-full.png`
- **Lamp text on the dark sheet reads**, and on the floor in both schemes; the plate's text takes the
  theme's `--floor` (`#0f2a2e` light, `#07181b` dark). §B.2a. `sec-cta-1440-dark.png`
- **Section fill order is identical in both schemes** — sheet, floor, band, sheet, band, sheet,
  floor. §B.2a, §B.9.
- **Buttons invert correctly in dark** — primary `--chalk` fill with `--floor` text, secondary an
  `--ink` outline; neither moves. §B.2a. `sec-hero-1440-dark.png`
- **Work cards: base, edge, tilt, surface.** Measured on the rendered card — fill `#FAFBFA` (light)
  and `#E8EAEA` (dark), radius 3px, `inset 1px 1px 0 rgba(255,255,255,.72)` /
  `inset -1px -1px 0 rgba(15,42,46,.14)`, contact `0 2px 3px -1px rgba(15,42,46,.38)`, ambient
  `0 10px 24px -12px rgba(15,42,46,.16)`, stand present and planted. §D.2, §D.3, §D.6.
  `card-zoom-1440-light.png`, `card-zoom-1440-dark.png`
- **Tilt is §D.4's cycle exactly and all under 3°** — −1.4°, +0.8°, −2.1°, +1.7°, never animated.
  `sec-strip-1440-light.png`
- **Work-card hierarchy is the shelf-talker's.** Company Anek 600 at 21.6px in the title position;
  dates Anek 500 `wdth` 87.5 `tabular-nums` at 27.36px in the price position; role, product and
  stack correctly absent from the compressed card. §D.5, §B.8.
- **Small print over the band.** Card ink is theme-invariant in both schemes and reads on both
  composites. §B.2, §B.2a, §D.7.
- **The three build states survive greyscale, in both schemes.** Done = 10px filled disc; current =
  18px ring with a concentric core (`--floor` light, `--lamp` dark); future = hollow disc with a
  dashed connector. `track-hi-1440-light-greyscale.png`, `track-hi-1440-dark-greyscale.png`,
  `track-360-dark-greyscale-zoom.png`
- **`prefers-reduced-motion: reduce` renders identically to the default**, at 360 and 1440 in both
  schemes, as it must when the only motion on the site is a 120ms glyph. §H.4.
  `home-1440-light-reducedmotion.png`, `home-360-dark-reducedmotion.png`
- **Section vertical padding** measured 72 / 96 / 128 / 160 by breakpoint, with +56 on the two
  `section--reserve` sections. §B.5, §B.10.
- **h1 line count** — 3 at 360 and 390, 2 at 768, 1024 and 1440. §B.4.
- **No template chrome.** No tracked-out all-caps eyebrow, no middle-dot meta string, no arrow
  glyph, no gradient wash, no monospace label, no rounded card kit, one numbered sequence only, and
  the wordmark is the display name with no logo. §9.4. All home and 404 screenshots. (Two ruled
  treatments are flagged as items 4 and 5 — neither is a template import, both are rules where §B.2
  asks for space.)
- **390 renders as 360 does**, in both schemes, with no intermediate breakage.
  `home-390-light-full.png`, `home-390-dark-full.png`
- **/404 prints COPY §9 and nothing else** above the global footer, in both schemes at five widths.
- **COPY.md §2 coverage.** §2.1 hero (headline, body, both buttons), §2.2 lead-in and instruction,
  §2.3 both role lines and bodies, §2.4 all seven jobs and all seven `Checked by` gates, §2.5 the
  chair's nameplate and body, §2.6 headline plus the ship-approval and design-review lines plus the
  closing line, §2.7 ¶1 and ¶2 and the store link, §2.8 caption, body, five stage labels and both
  current states, §2.9 headline and both paragraphs, §2.10 headline and body, and COPY §1's footer
  block in full. The four gate bodies are the exception and are item 3. Nothing prints that COPY.md
  does not contain.

---

## Seen

Every file below was opened and looked at. 130 files, in `docs/reviews/step2/`.

**Full pages, both schemes (20):** `home-{360,390,768,1024,1440}-{light,dark}-full.png`,
`404-{360,390,768,1024,1440}-{light,dark}-full.png`.

**Focus after three Tabs (8):** `home-{360,1440}-{light,dark}-focus3tab.png`,
`404-{360,1440}-{light,dark}-focus3tab.png`.

**Focus on a floor station (12):** `home-{360,1440}-{light,dark}-focus-station.png`,
`home-{360,1440}-{light,dark}-focus-station-zoom.png`,
`station-focus-hi-{360,1440}-{light,dark}.png`.

**Card slot after Enter on the third station (4):**
`home-{360,1440}-{light,dark}-card-station3-enter.png`.

**Reduced motion (4):** `home-{360,1440}-{light,dark}-reducedmotion.png`.

**Mid-scroll with the plate visible (4):** `home-{360,1440}-{light,dark}-scrollmid.png`.

**The toggle, both states (24):** `toggle-{360,1440}-{light,dark}-{header,glyph,focus,after-press-header}.png`,
`toggle-hi-1440-{light,dark}.png`, `toggle-hi-1440-{light,dark}-pressed.png`,
`home-{360,1440}-{light,dark}-after-toggle-top.png`.

**Build-stage track and greyscale (18):** `track-{360,1440}-{light,dark}-zoom.png`,
`track-{360,1440}-{light,dark}-greyscale.png`, `track-{360,1440}-{light,dark}-greyscale-zoom.png`,
`track-hi-{360,1440}-{light,dark}.png`, `track-hi-1440-{light,dark}-greyscale.png`.

**Roster and work card, high-dpi (4):** `roster-hi-1440-{light,dark}-greyscale.png`,
`card-zoom-1440-{light,dark}.png`.

**Section crops, 360 and 1440, both schemes (32):**
`sec-{hero,floor,strip,gates,proof,offer,cta,footer}-{360,1440}-{light,dark}.png`.
