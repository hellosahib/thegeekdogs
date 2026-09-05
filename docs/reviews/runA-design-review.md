# Build run A — Design Lead review of rendered output

Reviewer: Design Lead (review role). Reviewed the **rendered pages only**, never the stylesheet.
Every screenshot was taken against the frozen copy at
`scratchpad/dist-runA`, served statically and driven with Playwright, so the concurrent
work in the repo cannot have moved under this review.

Routes: `/`, `/work/`, `/work/pocket-manager/`, `/work/wedding-planner/`, `/contact/`.
Widths 360 / 390 / 768 / 1024 / 1440 in **both schemes**, plus 800 / 850 / 900 / 910 / 920 / 923 /
930 / 950 / 1000 / 1023 for the `/work/` ruling. At 360 and 1440 on every route, in both schemes:
keyboard focus on the first three stops, mid-scroll with the plate up, and reduced motion. The two
product pages additionally: the full track's three states in colour and in greyscale at three
widths, the screenshots' rendered aspect, the lazy case with the image responses held open, the
hard-failure case with them aborted, and the store link. `/contact/`: the three address blocks at
four widths in both schemes. The home page: every step-2 item re-checked, the plate at every
breakpoint, and the floor after the lights-on sequence has run. The five OG PNGs in `dist-runA/og/`
were opened and judged against §B.2a and the copy's OG strings.

**288 screenshots in `docs/reviews/runA/`; every one was opened and looked at.** Geometry and
colour are read off the rendered page (`measure.json`, `measure2.json`, `measure-home.json`), not
off CSS.

Deliberate omissions on the Engineer's list (COPY §2.8's five meaning lines, COPY §4.1's store
listing name, no closing CTA on `/work/*` or `/contact/`, no OG card for `/404`, the two `/sahib/`
and `/tanya/` nav entries and the strip's two row links, font subsetting, fallback-metric matching)
are not counted against this build and are not listed as items.

---

## Verdict

**BLOCKED**

The thirteen step-2 items are, on the evidence, **fifteen of fifteen closed**, both rulings are
built to the letter, and the plate is now one component — 260 × 56, sticky, 16px inset, `--lamp`
fill, theme-`--floor` ink and border — at **80 of 80** route × width × scheme combinations
measured. `/work/`, both product pages and `/contact/` all render on §B.5's one grid with no
`padding-right` anywhere. That is a clean pass on everything the last review asked for.

It is blocked on three things, none of which is a step-2 item.

The first is the one that matters. **The room is not lit.** The scene's `<defs>` carry `fl-cone`,
`fl-seat` and the lit-surface fill and the scene never instantiates them: no lamp cone over the
empty chair, no desk tops at `--chalk` 22%, no chair. The OG card, built from the same
`symbols.ts` and the same `plan.ts`, draws all three correctly — which is what makes this a build
regression with a known-good reference rather than a design question. §B.1 is *the room is lit; the
page is printed*, §B.2a's first claim is that the floor is the darkest region **and the only lit
one**, and §B.2's whole three-places rule for `--lamp` exists to protect a light that is not on the
page. Step-2 item 15 was carried forward to be judged when the scene arrived. It has arrived, and
it fails.

The second and third are the same fault seen twice: §B.10's composition rule is a **rest test on a
section**, and the plate is a **viewport** object. On `/contact/` at 1024 the plate covers
Tanya's address on first paint, on a page whose entire content is three printed addresses. On
`/work/` between 768 and 922 it covers the last two nodes of both stage tracks. Both marks pass the
rule as written. The rule, not the build, is what has to move — and it is mine.

---

## The ruling the Engineer asked for: `/work/` between 768 and 1023

> **Upheld, and the range in the flag is wrong. The rule is right about *where* and wrong about
> *what it measures*. `/work/` fails between 768 and 930, is clear at 931 and above, and the remedy
> is §E.2's vertical track, not a narrower cap.**

**The range.** Measured across eleven widths (`measure2.json` → `workSweep`), the track's node
pitch caps at 124px and its axis is a fixed object anchored at x 137, so its right end is 647 at
every width from 900 up. The plate's band starts at `100vw − 276`. The two cross at
**vw = 923** for the nodes and **vw ≈ 931** for the labels:

| vw | band starts | axis ends (node / label) | in band? |
|---|---|---|---|
| 768 | 492 | 636.2 / 644.5 | **yes, by 144 / 152** |
| 850 | 574 | 647 / 655.3 | **yes, by 73 / 81** |
| 900 | 624 | 647 / 655.3 | **yes, by 23 / 31** |
| 923 | 647 | 647 / 655.3 | node clear, label in by 8 |
| 950 | 674 | 647 / 655.3 | clear |
| 1024 | 748 | 663 / 671 | clear by 85 |
| 1440 | 1164 | 735 / 743 | clear by 429 |

So it is 768–922, not 768–1023. At 1024 and 1440 both tracks are clear with room
(`work-1024-light-plate-at-track2-clear.png`, `work-1440-light-plate-over-track2.png`).

**Why it fails anyway.** Rendered, this is not a mark half-covered. At 768
(`work-768-light-plate-over-track2.png`, `work-768-dark-plate-over-track2.png`) the plate sits over
the wedding planner's fourth and fifth nodes and their labels, so a five-stage track reads as a
three-stage track ending at `Final touches` — and the two stages it hides are precisely the two
that say the product is **not out yet**. At 900 (`work-900-light-plate-over-track2.png`) it hides
the fifth node and the dashed tail. A stage node is the first mark §B.10's rule names by name, and
§E.3's whole mechanism is that the eye takes the stages in one pass. Covering the end of the track
does not degrade the mark, it changes what it says.

**The rule.** §B.10's test — *inside the 276px right band **and** within 72px of the bottom of its
own section* — was chosen because it is the only geometry independent of scroll position. That was
the right instinct and the wrong test, and `/contact/` proves it independently: a mark 351px above
its section's bottom passes the test and is covered on first paint (blocker 2). **§B.10's
composition rule is amended, and I own the amendment:**

> **No load-bearing mark — one whose meaning is lost when part of it is hidden: a stage node, a
> printed address, a CTA, a form control, a card's price line — may have its *right edge* inside
> the plate's 276px band at ≥ 768, anywhere inside the plate's wrapper. Prose and headings may run
> under the band; a mark that is read as a unit may not end inside it.**

This costs no width, changes no container and no measure, and it is the same instrument §B.10
already used once: the home band's axis stops at 1132 against a plate at 1164, and that is exactly
why the home track passes here (last ring closes at **1141**, 23px clear, measured).

**The remedy for `/work/`, and why it is not a narrower cap.** Capping the axis at
`band − 16` gives a pitch of 85px at 768, which drops `Submitted for review` to three lines and
breaks §E.2's two-line label reservation — the defect step 2 raised as item 7 and this run closed.
So: **§E.2's vertical track runs to 930 rather than to 768.** Same component, same 44px rows,
already built, no right-hand extent to collide with, and §E.2's breakpoint is a design decision
rather than a spec constant. At ≥ 931 the horizontal form is clear by measurement and nothing else
moves. `/work/` is the only route affected; both product pages put their track under the h1, far
above any plate rest position, and are clear at every width.

---

## Blockers

### B1. The scene defines the lamp cone, the chair seat and the lit desk tops and instantiates none of them. §B.1, §B.2a, §C.1, §C.6, §B.12
`floorlit-1440-light.png`, `floorlit-1440-dark.png`, `floorlit-768-light.png`,
`floorlit-360-dark.png`, `desk-zoom-1440-light.png`, `chair-zoom-1440-dark.png`, against
`dist-runA/og/home.png`.

Read off the rendered SVG at 1440 in both schemes, after the lights-on sequence has run: the scene
holds **11 `<use>` elements**, referencing exactly three symbols — `#fl-ch`, `#fl-dk`, `#fl-mon`.
`#fl-cone`, `#fl-seat`, `#fl-agent`, `#fl-cabin-s` and `#fl-cabin-t` are present in `<defs>` and
referenced by nothing, and **zero elements in the document take `url(#fl-cone)` as a fill.** What
renders is a near-black slab, nine monitor glows and ten text labels floating on it. §C.1's five
fills are reduced to two. The empty chair — the site's one prop, the only place `--lamp` is a
shape, the subject of §B.12's favicon, and the thing "Ship approval" points at — is not drawn.

The OG card built from the same symbols and the same plan draws the lit desk tops, the shadow
faces, the cabin walls, the seam grid and the amber cone over the chair. The drawing is right; the
page is not receiving it.

This also answers step-2 item 15, which was carried forward for exactly this moment: **the floor is
measurably the darkest fill in both schemes and it is not the lit one.** In light it is darker than
its own `--floor` ground and reads as a hole cut in the petrol; in dark it is indistinguishable
from it. Until this lands, §B.1's sentence is not true of the page and §9.4's "spend boldness in
one place" has nothing to spend.

### B2. `/contact/` — the plate covers the third printed address on first paint at 1024. §B.10, §B.11, COPY §8.2
`contact-1024-light-full.png`, `contact-1440-light-plate-over-tanya.png`,
`routes-contact-1440-dark.png`, `routes-contact-1024-light.png`.

Measured (`measure2.json` → `contactSweep`): the third route column runs x 682.7–976 at 1024,
x 853.3–1232 at 1280 and x 936–1320 at 1440. The plate's band begins at 748, 1004 and 1164. The
third column is inside it at **every width the 3-up runs**. At 1024 in a 900-tall viewport the
plate rests at y 828–884 and Tanya's block occupies y 730–903.8, so with no scrolling at all the
plate strikes through `jaintanya999@gmail.com`. At 1440 mid-scroll it takes the tail of her line.

COPY §8.2 and item 53 are explicit that all three addresses print in full, and this page has no
other content — §8.3 removed the form precisely so that three printed addresses would be the whole
argument. The block sits 351px above its section's bottom, so it passes §B.10's rule as written;
see the amendment above. Two fixes work and one is better: run the routes as a 3-up inside cols
1–9 so the third column's right edge lands at 976 at 1440, **or** drop the plate from `/contact/`
(see "remove one thing").

### B3. `/work/` — both stage tracks run under the plate between 768 and 922. §B.10, §E.2, §E.3
Ruled above. `work-768-light-plate-over-track2.png`, `work-850-light-plate-over-track1.png`,
`work-900-light-plate-over-track2.png`, `work-768-dark-plate-over-track2.png`, and the clear side
at `work-1024-light-plate-at-track2-clear.png`.

---

## Items

### 4. The future-node stroke is the pre-round-5 value and fails SC 1.4.11. §E.1
`home-track-1440-light-greyscale.png`, `track-wp-1440-light-greyscale.png`,
`track-wp-360-light-greyscale.png`.

Computed border on every future node on `/`, `/work/` and `/work/wedding-planner/` in light:
`rgba(15, 42, 46, 0.45)`. §E.1 was amended in round 5 to **`rgba(15, 42, 46, .60)`** — 4.01 : 1 on
`--sheet`, 3.83 : 1 on `--band` — precisely because `.45` computes to **2.65 : 1** on the sheet and
**2.53 : 1** on the band, under the 3 : 1 a meaningful graphic needs. That ruling was taken, priced
and recorded; the build ships the value it replaced. The dark stroke is `rgba(232, 237, 233, .45)`,
which is correct and stays (§E.1a, 3.76 / 3.49 : 1).

### 5. Two components on the whole build use §B.5's twelve columns. Everything else is a 530px column in a 1200px page. §B.5, §B.9
`wp-1440-light-full.png`, `pm-1440-light-full.png`, `work-1440-light-plate-over-track2.png`,
`contact-1440-light-plate-over-tanya.png`, `home-sec-cta-1440-light.png`.

The floor's scene + slot and the proof band's split are the only two arrangements that cross the
grid. On all four other routes and in four of the home page's seven sections, every heading, every
paragraph and every link sits in one 529.9px measure at x 120 and the remaining 670px is empty from
the section's top to its bottom. `/work/wedding-planner/` is the clearest case: 3,071px of page in
which nothing at any point uses the right 55% of the content width. §B.9 gives the page **one**
void and spends it in the hero; the lane was withdrawn in step 2 for manufacturing four more, and
the same four voids are back by a different route. Nothing here needs a new device — the strip, the
gates and the proof band already show what a second column is for.

### 6. `/work/` — the full track is a fixed 567px object that never answers the grid. §E.2, §B.5, §B.9
`work-1440-light-plate-over-track2.png`, `work-1024-light-plate-at-track2-clear.png`.

Node centres measured at 137 / 261 / 385 / 509 / 629 at 900, 1023 **and** 1024, and 225 / 349 /
473 / 597 / 717 at 1440 — a 124px pitch under a max-width, so the axis is the same 510px at every
width from 900 up while its `--band` block grows from 836 to 1200. The result at 1440 is a track
sitting in the left 42% of its block with 570px of dead band beside it. This is the mechanism
behind blocker 3 as well: the axis neither fills the band nor clears the plate, because it is not
placed on the grid at all. Give it a column span, and the plate clearance falls out of §B.10's
amended rule instead of being an accident of a max-width.

### 7. `/work/pocket-manager/` — four screenshots above the fold at ≥ 1024. §B.11
`shots-pm-1440-light.png`, `shots-pm-1024-light.png`, `pm-1440-light-full.png`.

§B.11: "Screenshots in the real device aspect ratio (portrait 9:19.5), **max two above the fold**,
explicit dimensions." Measured: the row runs y 600–1207 at 1440 in a 900-tall viewport, four
280 × 607 frames in one `280px 280px 280px 280px` grid. Aspect and dimensions are exactly right
(280/607 = 0.4613 against 9/19.5 = 0.4615, `width` and `height` on every `<img>`); the count above
the fold is not. At 768 it is a 2 × 2 and correct.

### 8. Both product pages carry no fill change from the header to the footer. §B.2, §B.2a, §B.9
`pm-1440-light-full.png`, `wp-1440-light-full.png`, `pm-360-dark-full.png`.

Measured: every section on both pages computes `rgba(0,0,0,0)` over the body, so `/work/pocket-manager/`
is 3,531px and `/work/wedding-planner/` 3,071px of a single `--sheet`, with `Problem`, `Build`,
`Review process` and `Outcome` separated by space alone. §B.2 states that structural separation is
done "with fill changes … **and** space, never with rules", and §B.9's argument for the home page's
seven families is that a long page needs the fill to mark where the argument turns. `/work/` — the
shortest of the three — is the only one of the four that alternates.

### 9. `/work/wedding-planner/` — one screenshot in a four-column grid. §B.11, §J
`shots-wp-1440-light.png`, `wp-1440-light-full.png`.

Computed `grid-template-columns: 280px 0px 0px 0px`. The single cleared screenshot renders
correctly at 280 × 609, and the three empty tracks are invisible — but the shot then sits alone at
the far left of a 1200px row, which is the one place on this page where a single image had a chance
to be the page's object. §J already rules that one screen is the differentiator here; the layout
should be built for the one rather than left as the four with three collapsed.

### 10. Home — the proof band's shared label row does not sit on cols 7–12. §B.10, §B.9, §E.3
`home-sec-proof-1440-light.png`, `home-track-1440-light.png`.

Measured at 1440: the five labels occupy x 682–1182 (each 100px, centred on its node), while
§B.9's cols 7–12 run x 732–1320 and §B.10 says in terms that "the stage labels, the caption and the
… line still use the full cols 7–12 width above the plate's 72px band". Rendered, the row hangs
50px left of the band's left edge — into col 6 — and stops 138px short of its right. The caption
below it is correctly 588px at x 732, which makes the label row the one element in the band that
is off the grid, and it is visible: `Specced` starts left of `Pocket Manager`.

### 11. The four non-home OG cards end in an empty 135px `--floor` band. §B.2a, §B.1
`dist-runA/og/work.png`, `og/pocket-manager.png`, `og/wedding-planner.png`, `og/contact.png`,
against `og/home.png`.

All five cards are light-scheme and every string is COPY.md's verbatim (§2.11, §3.4, §4.8, §5.6,
§8.4 — checked word for word). The home card is right: the floor is in it and the cone is lit. The
other four end in a 1200 × 135 strip of `--floor` carrying nothing at all. It is not the room —
nothing is in it — and it is not a rule, so it reads as a crop that lost its picture. Either put
something in it (§B.12's cone is one mark and already exists as a symbol) or take the band off and
let the card be the sheet.

### 12. §J's pre-committed cut for `/` is still not taken: the cabin nameplates are skewed. §J, §C.4
`floorlit-1440-light.png`, `floorlit-1440-dark.png`, `home-sec-floor-360-light.png`.

`Sahib Singh` and `Tanya Jain` are set on an angle on the cabin wall face; every other plate in the
room is horizontal. §J names this by name as the thing to cut from `/`, the step-3 review named it,
and it is still the only skewed type on the site and the least legible text on the page.

### 13. §J's pre-committed cut for `/work/` is still not taken: the one-line descriptions print. §J
`work-1440-light-full.png`, `work-360-light-full.png`.

Both entries print their COPY §3.2 / §3.3 one-liner under the product name. §J: "The product name
and its stage track say enough on an index page." The strings are correct and the cut is
pre-committed; this is the pass in which it is spent.

---

## Step 2 items verified

| # | Step-2 item | Closed |
|---|---|---|
| 1 | The keep-out lane re-grids five of seven sections | **Yes** — every `.shell` on all five routes measures one width per breakpoint (1320 / pl 60 / pr 60 at 1440), no `padding-right` anywhere, twelve equal columns. `home-1440-light-full.png` |
| 2 | The plate covers content at every scroll position below 768 | **Yes** — one 260 × 56 plate, sticky, `bottom: 16px`, right inset 16, at **80 of 80** route × width × scheme combinations. The full-bleed bar is gone. `plate-home-360-light.png`, `plate-home-1440-dark.png` |
| 3 | Gate bodies are not COPY §2.6's strings; owners' names gone | **Yes** — all four verbatim with the names in them ("Sahib decides the shape before a line is written", "Tanya runs the build on physical phones…"), and §2.6's line under the four is one line. `home-sec-gates-1440-light.png` |
| 4 | The card slot is an outlined empty box | **Yes** — `.floor__slot` computes `border-width: 0`, `background: rgba(0,0,0,0)`, `border-radius: 0`, `min-height: 344px`. `home-sec-floor-1440-light.png` |
| 5 | The roster is ten full-width hairlines | **Yes** — the semantic roster is visually collapsed behind the scene; every `.roster__item` computes `border-bottom-width: 0`. `home-sec-floor-1440-dark.png` |
| 6 | The closing line sets to six lines in a 332px column | **Yes** — x 936–1320, **384px** = cols 9–12, 40px, four lines. `home-sec-gates-1440-light.png` |
| 7 | The track's shared label row is three ragged heights | **Yes** — all five label cells measure y 3643.7, **h 42**, one row, 100px pitch; `Submitted for review` sets in two. `home-sec-proof-1440-light.png` (see item 10 for its x) |
| 8 | The strip's date column mixes granularity | **Yes** — `2025 – now`, `2023 – 2025`, `2024 – now`, `2021 – 2023`. Years only. `home-sec-strip-1440-light.png` |
| 9 | The page ends on a `--band` footer below the `--floor` CTA | **Yes** — CTA `#0F2A2E` ends at y 5568.8, footer `#0F2A2E` starts at 5568.8 and its bottom equals the document's. `home-sec-footer-1440-light.png` |
| 10 | The header's right edge does not align with the body's | **Yes** — toggle right edge x 1320; slot, closing line and strip cards all end at 1320. `home-1440-light-full.png` |
| 11 | The CTA address drops COPY §2.10's verb | **Yes** — `Email thegeekdogs@gmail.com` as `--lamp` text on `--floor` with a lamp rule under it. `home-sec-cta-1440-light.png` |
| 12 | The toggle's focus ring is built differently | **Yes** — toggle: `outline: 3px solid #0F2A2E`, offset 3px, `box-shadow: #F2A93B 0 0 0 2px`; station: the same construction with `--chalk` as the outer. Ring traced outside the 44 × 44. `toggle-focus-1440-light.png`, `station-focus-1440-dark.png` |
| 13 | The gate numeral hangs 106px from its title | **Yes** — numeral at x 120, title at x 184: **64px**, a two-digit column plus one gutter. `home-sec-gates-1440-light.png` |
| 14 | Flagged: a second `aria-live` region carrying all ten cards | **Yes, as Perf & A11y ruled** — two `aria-live="polite"` regions, both empty at rest, neither containing the cards; the slot is not a live region. `home-1440-light-focus3.png` |
| 15 | Carried forward: §B.2a's "only lit region" | **No — and this is blocker 1.** The floor is the darkest fill in both schemes (`#0F2A2E` / `#07181B`, band stepping away in both) and is **not** lit: no cone, no seat, no lit desk tops. `floorlit-1440-light.png` vs `og/home.png` |

Fifteen of fifteen resolved as asked. Item 15 was a carry-forward to be judged, and it is judged
here as a fail.

---

## Passed

- **The plate is one component.** 260 × 56, `position: sticky`, `bottom: 16px`, right inset 16px,
  `--lamp` fill, 2px theme-`--floor` border, the address as plain text in a `mailto:`, on all five
  routes at all five widths in both schemes — **80 of 80** measured, no exceptions and no variant.
  §B.10. `plate-home-{360,390,768,1024,1440}-{light,dark}.png`
- **One grid, every section, every route.** No section on any of the five routes carries a
  `padding-right`; content is 320 / 704 / 928 / 1200 at 360 / 768 / 1024 / 1440 with outer margins
  20 / 32 / 48 / 60, exactly §B.5. §B.5, §B.10.
- **Every token matches §B.2 and §B.2a to the hex, on every route.** Light `--sheet #F1F3F0`,
  `--band #E2E6E1`, `--floor #0F2A2E`, `--muted #4E6468`; dark `--sheet #18292D`, `--band #213539`,
  `--floor #07181B`, `--muted #93A6A8`; `--lamp #F2A93B` and `--chalk #E8EDE9` theme-invariant;
  plate ink is the theme's `--floor` in both.
- **The band steps away from the floor in both schemes, on every route.** §B.2a.
- **The three build states survive greyscale, in both schemes, on all three tracks.** Done = 10px
  filled disc; current = 18px ring with a concentric core (`--floor` light, `--lamp` dark, measured);
  future = hollow disc with a dashed connector. Solid out of `◉`, dashes from the first future node,
  per §E.1's normative table. `track-pm-1440-light-greyscale.png`,
  `track-wp-1440-dark-greyscale.png`, `home-track-360-dark-greyscale.png` (see item 4 for the
  future stroke's alpha)
- **§E.2's two-line label reservation holds on the full track at every width ≥ 768.** Track box
  measures 64px tall at 768, 900, 1023, 1024 and 1440; `Submitted for review` sets to two lines and
  nothing shifts. §E.2.
- **`Stage: {current}` prints above the track at 360 and is `display: none` at ≥ 768**, on `/work/`
  and both product pages. COPY §10.4, step-1 item 17. `track-pm-360-light.png`
- **The screenshots hold their layout while lazy.** With every image response held open for 12s,
  all four `/work/pocket-manager/` frames measure 280 × 607 and the document height is 3,531 —
  identical to the loaded state. `width` and `height` on every `<img>`, first eager with
  `fetchpriority="high"`, the rest lazy. Aspect 0.4613 against 9:19.5's 0.4615. §B.11.
  `shots-pm-1440-lazypending.png`
- **The store link is a text link, not a badge.** `Open Pocket Manager in the Play Store`, accessible
  name `Open Pocket Manager in the Google Play Store. Opens a new tab.`, `target="_blank"`,
  `rel="noopener noreferrer"` — COPY §4.1 and §10.5 verbatim. No Play badge graphic anywhere.
  `store-link-pm-1440-light.png`
- **No store link and no product name on `/work/wedding-planner/`**, and no privacy section, no
  email capture and no date anywhere on it. COPY §5, §5.1, §5.4. `wp-1440-light-full.png`
- **`/contact/` prints all three addresses in full as `mailto:` links over the visible address**,
  3-up at 1024 and above (293.3 / 384px columns), stacked below. COPY §8.2, item 53, §B.11.
  `routes-contact-{360,768,1024,1440}-{light,dark}.png`
- **No form anywhere on the site.** COPY §8.3, items 11 and 69.
- **Focus on a station takes the two-tone ring and Enter writes its card into the slot, in the same
  place, with no container.** Ring: 3px `--chalk` outer at 3px offset with the 2px `--lamp` ring
  outside the box, identical in construction to the toggle's. The card carries name, one line, a
  16px gap, a 1px rule, `Checked by` and the gate name — §C.6 items 1–3 — inside an unframed 344px
  reservation. §B.2, §C.6, §C.8. `station-focus-1440-dark.png`, `card-station3-enter-1440-light.png`
- **Focus order is the same on all five routes**: skip link → wordmark (`TheGeekDogs, home`) →
  `Work`. The skip link is `--lamp` with a `--floor` border, focus-only. COPY §1.
  `*-{360,1440}-{light,dark}-focus{1,2,3}.png` — 60 files
- **`prefers-reduced-motion: reduce` renders identically to the default** on all five routes at 360
  and 1440, including the floor's still state. §H.4, §C.9. `*-reducedmotion.png`,
  `floorlit-1440-light-reducedmotion.png`
- **Section fill order on the home page is §B.2a's**, identical in both schemes: sheet, floor, band,
  sheet, band, sheet, floor, and the footer takes the floor. §B.2a, §B.9.
- **Section vertical padding** measures 72 / 96 / 128 / 160 by breakpoint with +56 on every
  `section--reserve`, on all five routes. §B.5, §B.10.
- **h1 line counts**: 1 line at 768–1440 on all four inner routes, 2 at 360 where the string is long
  (`The second one, in build.`, `Two people, one inbox.`), never 4. §B.4.
- **Work cards, unchanged from step 2 and still correct**: `#FAFBFA` surface, 3px radius, tilt
  −1.4° / +0.8° / −2.1° / +1.7°, never animated. §D.2–§D.6. `home-sec-strip-1440-light.png`
- **No template chrome on any of the four new routes.** No tracked-out all-caps eyebrow, no
  middle-dot meta string, no arrow glyph, no gradient wash, no monospace label, no rounded card kit,
  no outlined container, one numbered sequence on the site. §9.4.
- **COPY coverage on the four new routes is complete and verbatim.** §3.1 headline and short intro;
  §3.2 and §3.3 name, one-liner, both link labels and the store link with its "Opens a new tab.";
  §4.1–§4.5 headline, subhead, store link, all four bodies, the four feature lines and both closing
  lines; §4.7's four alt strings; §5.1–§5.4 in full and §5.5's single cleared alt line; §8.1, §8.2's
  three routes and the engagement line; COPY §1's footer block on every page. Nothing prints that
  COPY.md does not contain. The two waiting alt lines (`03`, `04`) and the two that never publish
  are correctly absent.
- **All five OG cards carry COPY.md's strings word for word** (§2.11, §3.4, §4.8, §5.6, §8.4) and
  all five are light-scheme only, per §B.2a. The home card shows the floor. (Item 11 is the other
  four's bottom band; blocker 1 is that the page does not match its own card.)

---

## Seen

Every file below was opened and looked at. **288 files in `docs/reviews/runA/`**, plus the five PNGs
in `dist-runA/og/`.

**Full pages, five routes × five widths × both schemes (50):**
`{home,work,pm,wp,contact}-{360,390,768,1024,1440}-{light,dark}-full.png`

**Focus, first three stops, 360 and 1440, both schemes (60):**
`{home,work,pm,wp,contact}-{360,1440}-{light,dark}-focus{1,2,3}.png`

**Mid-scroll with the plate up (20):** `{home,work,pm,wp,contact}-{360,1440}-{light,dark}-scrollmid.png`

**Reduced motion (10):** `{home,work,pm,wp,contact}-{360,1440}-{dark,light}-reducedmotion.png`

**The plate, home, every breakpoint, both schemes (10):**
`plate-home-{360,390,768,1024,1440}-{light,dark}.png`

**The `/work/` ruling (26):** `work-{768,850,900,1023,1024,1440}-{light,dark}-plate-over-track{1,2}.png`,
`work-{1024,1440}-light-plate-at-track2-clear.png`

**The full track, three states, colour and greyscale (24):**
`track-{pm,wp}-{360,768,1440}-{light,dark}.png` and `…-greyscale.png`

**Screenshots (12):** `shots-{pm,wp}-{360,768,1024,1440}-light.png`,
`shots-{pm,wp}-1440-noimages.png`, `shots-{pm,wp}-1440-lazypending.png`

**Store link (2):** `store-link-pm-1440-{light,dark}.png`

**`/contact/`'s three address blocks (10):** `routes-contact-{360,768,1024,1440}-{light,dark}.png`,
`contact-{1024,1440}-light-plate-over-tanya.png`

**Home section crops, 360 and 1440, both schemes (32):**
`home-sec-{hero,floor,strip,gates,proof,offer,cta,footer}-{360,1440}-{light,dark}.png`

**Home compact track (8):** `home-track-{360,1440}-{light,dark}.png` and `…-greyscale.png`

**The floor after the lights-on sequence (12):** `floorlit-{360,768,1024,1440}-{light,dark}.png`,
`floorlit-1440-{light,dark}-greyscale.png`, `floorlit-1440-{light,dark}-reducedmotion.png`

**Scene zooms (4):** `chair-zoom-1440-{light,dark}.png`, `desk-zoom-1440-{light,dark}.png`

**Focus zooms and the card slot after Enter (9):** `toggle-focus-1440-{light,dark}.png`,
`station-focus-{1440-light,1440-dark,360-dark}.png`,
`card-station3-enter-{1440-light,1440-dark,360-dark}.png`

**OG (5):** `dist-runA/og/{home,work,pocket-manager,wedding-planner,contact}.png`

Four things were looked at and are **not** items:

1. **At 360 mid-scroll the plate crosses live text**, including the last word of the gates' closing
   display line (`home-360-dark-scrollmid.png`). Below 768 the plate is 276 of 360 — 86% of the
   320px measure — so when it crosses a line it hides the whole line rather than its end. This is
   the accepted cost of step 2's ruling (a), which chose persistence on mobile deliberately, and I
   am not reopening it in this pass. It is worth revisiting once the person pages land.
2. **The floor's rendered left-to-right reading order is the reverse of the pipeline order** —
   the plan puts Designer, Programmer, Security Auditor right-to-left while the DOM, the tab order
   and `The full pipeline` line all run Spec Writer → Designer → Programmer → Test Engineer →
   Security Auditor. That is §C.3's plan and the step-3 floor review's to rule on, not mine, and it
   is recorded here only because I saw it while measuring blocker 1.
3. **The header carries two nav labels, not four**, and `/sahib/`, `/tanya/` and the strip's two row
   links are absent. Run B, on the Engineer's own list.
4. **A hard image failure reflows the screenshot row** into four columns of alt text
   (`shots-pm-1440-noimages.png`). That is the browser's alt fallback, not a reservation failure —
   the lazy case holds layout exactly (see Passed) — and the alt lines read well enough that the
   fallback is not embarrassing.

---

## Before ship: remove one thing, per route

| Route | Remove |
|---|---|
| `/` | **The skewed cabin nameplates** — §J's pre-committed cut, unspent for two rounds. Set `Sahib Singh` and `Tanya Jain` on the same horizontal baseline as every other plate in the room. It is still the only skewed type on the site and the least legible text on the page (item 12). |
| `/work/` | **The one-line description under each product name** — §J's pre-committed cut, unspent. The name and the track say enough on an index page, and the entry then has one job per row (item 13). |
| `/work/pocket-manager/` | **The fourth screenshot.** §J's row (the Play badge) is already honoured, so this is the new nomination: `05-export.png` is the weakest of the four and, by COPY §4.7's own account, not a screen at all — it is a row in settings tagged Beta. Cutting it takes the row to three and takes the above-the-fold count to §B.11's two at 1024 (item 7). |
| `/work/wedding-planner/` | **The bullet markers on "What's in it".** §J's row (the second screenshot) is already honoured — only one ships. The seven-item list is the one bulleted list on the site; §B.2 separates with space, and seven short lines separated by space read faster than seven with a glyph in front of them. |
| `/contact/` | **The sticky plate.** §J's row is "the second call to action. One email, one link, one answer." The plate is a fourth printing of `thegeekdogs@gmail.com` on a page whose whole content is three printed addresses — it duplicates route 1 verbatim 300px away, and it covers route 3 (blocker 2). §B.10 is mine and I will write the exception: the plate is the persistent address on pages that are *not* the address. |

---

## What I own out of this review

§B.10's composition rule is amended as stated in the ruling — right edge, not section bottom — and
§B.10 gains one exception: `/contact/` does not carry the plate. §E.2's vertical track runs to 930.
Both go into DESIGN.md in my next pass; build to the text above in the meantime.
