# Design Lead scratch — Pass 1

What was considered and rejected. Later rounds should not relitigate these without new information.

---

## 1. Reference study — what actually happened

Five URLs, five fetches, then a second round of targeted fetches.

- **dribbble.com/shots/26995447** — returned no page content at all, twice. Blocked. I have not seen it and DESIGN.md says so. Do not let a later round quietly "summarise" this one.
- **wallofportfolios.in/portfolios/diodona-maenggartama/** and **/geonwoo-john-yang/** — these fetched, but what came back is the *directory's own profile card* (name, role, badges, "Only 30% of portfolios make it to the Wall", booking buttons), not the designer's portfolio. I asked a second time specifically for outbound links to the designers' own sites; the tool reported there are none on the page. So there is no portfolio behind these URLs that I can reach. DESIGN.md records the directory chrome as what was seen and nothing more. **If the Orchestrator can supply the two designers' actual portfolio URLs, that is a real gap worth closing.**
- **abhaysingh.in** — real content, twice, including the metric triplets. Genuinely useful.
- **amix-design.com/tl/web-g-threejs/** — real content. Useful mostly as a counter-example (it is a WebGL gallery, and §6 has already ruled WebGL out).

Net: two of five references are usable, one is partially usable as a negative reference, two are unavailable. I built the direction on the two usable ones plus §5.6's instruction to extract mechanism.

## 2. Palette directions rejected

- **Cream + high-contrast serif + terracotta.** Banned outright by §9.4. Also would have been my first instinct for "warm, Indian, human studio", which is exactly why it is banned.
- **Near-black + single acid accent.** Banned by §9.4, and it is the developer-portfolio costume §9.2 warns about with a coat of paint.
- **All-light studio world, no dark region anywhere.** Rejected: an isometric room needs a ground you can go both lighter and darker from. On a white page the floor either floats or turns into a diagram. The room needs to be a room.
- **Site-wide dark mode.** Rejected for Pass 1 and raised as an open question instead. Three worlds × two colour schemes is six palettes to keep at AA, and the §14 review loop has three rounds per surface. Not worth it unless the owners ask.
- **A second chromatic accent for "positive/negative" states.** Rejected. There are no error states on a static lead-gen site beyond the contact form, and one signal colour used in exactly three places is stronger than two used in nine.
- **Giving Tanya her own hue.** Rejected deliberately, and this one matters: §9.3 forbids a decorative treatment for her, and every hue I tried for her page (plum, oxblood, teal) either read soft or collided with the studio petrol. Her world differentiates on **structure and value**, not hue — it is the most achromatic and most rigorously aligned of the three. That is a stronger answer than a colour, and it cannot be misread as the "pretty" page.

## 3. Type directions rejected

- **Bricolage Grotesque** for display. Genuinely good, four axes, distinctive. Rejected on two counts: it is becoming the 2025-26 default for "designed but not corporate", and it is a heavy file against the Engineer's two-family ceiling (PLAN.md §10.5).
- **Geist / Geist Mono.** Rejected: it is the current tech-default pairing and reads as a Vercel template.
- **Inter / Inter Tight.** Rejected on sight.
- **Any serif display.** Rejected: §9.4 bans the serif-display combination, and a serif here would be a taste move with nothing in §5 behind it.
- **A third family for numerals** (Spline Sans Mono, Martian Mono, JetBrains Mono). Rejected on the Engineer's font-count ceiling and because §9.4 bans monospace-for-every-small-label; the numeral role is served by Anek Latin's width axis plus tabular figures instead. Documented in DESIGN.md as a fallback only if the chosen faces turn out to lack `tnum`.
- **Roboto Flex** as "the Android vernacular". Rejected: it *is* the Android system font, so it reads as unstyled rather than as vernacular.

## 4. Floor compositions rejected

- **Seven agent desks.** §6 says five to six; §7 says cut to five if crowded. At 360 with eight-plus stations nothing is tappable. Five agent desks, chosen so all four human gates plus the release gate are represented on the floor.
- **Six desks at desktop, five at mobile.** Rejected hard: the roster is one semantic list. A different desk count per breakpoint means the content changes with the viewport, which breaks §6's "semantic HTML first, scene layered on top".
- **Cursor-following interaction card.** Rejected: unreachable by keyboard, jitters, occludes the scene, and produces a different experience for hover than for tap. §6 says touch has no hover and the mobile version must feel designed.
- **Bottom-sheet card on mobile** (the Engineer's PLAN.md §4.3 default). Rejected on visual judgement, not feasibility: a sheet covers the room, so you cannot see which desk you tapped while reading the card, and dismissing it costs a gesture. A panel pinned directly below the scene is always visible, needs no dismiss, has no focus-containment problem, and lets the default state (the empty chair's card) make the argument before any interaction. It is also strictly less code than a `popover`/`<dialog>`. Flagged to the Engineer as a change from PLAN.md §4.3, not a conflict.
- **Horizontally scrolling floor on mobile.** Rejected: horizontal scroll on a page that also scrolls vertically is a known gesture trap and hides content. Replaced with a portrait re-plan of the same room (2 wide × 4 deep instead of 5 wide × 4 deep) — same eight stations, same DOM, different `<use>` transforms.
- **Animating the empty chair to draw the eye.** Rejected, and this is the best decision in the document: in a room where every other station idles, the one that is perfectly still is the one you look at. Motion would have made it one of the crowd.
- **SVG filters for the lamp cone / desk shadows.** Rejected on PLAN.md §10.4 and the 80 KB line. Flat opaque parallelograms and one linear gradient only.

## 5. Sahib directions rejected

- **Time-structured (career arc + shipped work on one spine).** Rejected: it is a timeline, and the whole point of §9.2 is that the two person pages split by *shape of contribution*. Making his a timeline and hers a system would have been fine, but a timeline is also the CV cliché and it buries the 2025 Keenai fact in the middle of a scroll instead of putting it at the loudest point of the composition.
- **Teaching-led.** Genuinely the most persuasive to a technical buyer, and I wanted it. Rejected on content volume: §5.4 verifies exactly three post subjects. A writing-led page with three items is thin, and inventing a fourth is the §14 failure mode. Kept as the recommended *second* section of the page rather than the spine, so it costs nothing if more posts are confirmed later.
- **A skills bar chart / proficiency meter of the four stacks.** Rejected: self-rated proficiency is unverifiable, and filled progress tracks are a dashboard cliché.

## 6. Tanya directions rejected

- **Any chronological layout.** Explicitly wrong per §9.3.
- **T2 (the workflow graph) as the recommendation.** It is the better idea and it links hardest to the site's pitch. Rejected as the *build* because §5 gives her subject areas but not a single named practice, tool or workflow change she introduced. A node graph with unnamed nodes is empty, and filling them is invention. Documented fully in DESIGN.md so it can be swapped in the moment that content exists — which is a real possibility, since her sign-off comes after the build.
- **Making T2's palette dark** to distinguish it from T1. Rejected: it would have made her page look like Sahib's. T2 now shares T1's tokens exactly and differs only in layout module, which is the cheapest possible swap and the literal thing §9.3 asks for.

## 7. Where I disagreed with the brief, and deferred

1. **§6.1 suggests the work cards may also appear on the studio home as a compressed strip.** I think they should not, and §9.4's "spend boldness once" plus "remove one thing" agrees with me. Raised as an open question rather than decided, because the brief left the door open.
2. **The em-dash.** The `design-taste-frontend` skill bans the character outright; §7's own copy deck uses it throughout and §9.4 bans only the `WORD — fragment` label pattern. Brief wins — the character is allowed. But it is a Copywriter call, and I have flagged that the middle-dot meta string in §7's work-card table (`Motive Fleet App · Kotlin`) is banned by §9.4 and is set as two lines in my card spec instead.
3. **The skill requires dual light/dark mode as a default.** The brief does not, and the budget and review-loop cost is real. Brief wins; raised as open question 1.
4. **The skill discourages hand-rolled SVG.** §6 mandates it. Brief wins, obviously.
5. **The skill's 20-word hero subtext cap.** Hero variant A's drafted subhead is 33 words. I did not rewrite it — that is the Copywriter's remit — but I have specified the line budget it has to fit and flagged it as a question.

## 8. Things I could not resolve without a human, and refused to guess

- No wordmark or logo for TheGeekDogs exists anywhere in §5. The header is specified as the studio name set in the display face until someone says otherwise. I did not design a mark.
- §5.4 asserts Sahib has shipped production work in **all four** stacks, but §7's work-card table attributes only Android/Kotlin, Dart/Flutter and the end-to-end AI work. Native iOS and KMP have no company or product behind them. The coverage map is designed to render honestly either way (a third cell state, or a single honest line under the map) rather than to hide the gap — but this is a real hole in the page's central argument and it needs an answer.
- Headshot route is unresolved (QUESTIONS.md item 23), so the hero's right half and both person-page portrait slots are specified as reserved space with dimensions, not as filled compositions.

---

# Round 2 — six items from the Orchestrator

Pass 1's direction, tokens, floor composition, cards, stage indicator, both person worlds and the
motion spec came back approved as proposed, and the contrast arithmetic was independently
recomputed and matched. Six corrections applied in place. Nothing else was touched.

1. **Rating corrected, 4.6 → 4.3.** FACTS.md row 2 has the live Play Store listing at 4.3★ with
   24 reviews; the 4.6 came from the brief, not from the store. Changed in §B.6 principle 2, both
   proof wireframes (§B.8, §B.9) and §J's `/work/pocket-manager/` row. The `4.6vw` clamp in §B.4's
   type scale is a coincidence of digits and was left alone.

2. **Navigation at 360 — decided, not deferred.** Pass 1's "ONE link, no nav, no hamburger" header
   made `/work/`, `/sahib/`, `/tanya/` and `/contact/` unreachable from navigation at the
   breakpoint carrying most of the traffic, which fails the brief's §14 QA gate. Fixed with a
   plain 44px nav row under the wordmark (header 64 → 92px) carrying COPY.md §1's four labels, plus
   the footer nav repeat COPY.md §1 already specifies. Rejected: a hamburger — it costs a button, a
   panel, a focus trap, an `aria-expanded` state and a tap to show four words that fit on one line
   (236 of 320px at 14px). Rejected: footer nav only — it makes a visitor scroll the entire home
   page to navigate. The header keeps no contact link; the contact action stays the §B.10 sticky
   plate, which is what frees slot 4 to be `Contact`. Fold checked: primary CTA bottom edge lands
   at ~464px on a 640-tall viewport, so §B.7's subhead constraint is unchanged. The §B.8 footer
   also lost its `github links · legal one-liner` middle dot, which §9.4 bans and Pass 1 missed in
   its own wireframe.

3. **§B.9's roster line redrawn with commas.** The wireframe was setting the seven roles as a
   middle-dot strip while its own annotation said not to. §9.4 bans the pattern. Now matches the
   §B.8 version exactly.

4. **Desk count out of the copy.** §B.8, §B.9 and §C.7 were printing "Eight desks. Two have people
   at them." COPY.md §2.2 forbids a printed desk count — §7 permits cutting the floor to five
   agents and the number would go stale — and supplies the lines. Replaced with COPY's body and
   instruction line verbatim. **Sized honestly: the 84-character body sets to FOUR lines at
   display-section 27px on 320px** (the h1 gives ~19ch at 38px, so ~26ch at 27px), one more than
   the block should carry, so the `[COPY NEEDED: ≤ 12 words]` marker stays for the Copywriter. The
   instruction line adds two more at body 16px. At 1440 the body is three lines and the
   instruction is one.

5. **Station order aligned to COPY.md §2.4.** §C.2, §C.3, §C.7 and §C.8 ran Spec Writer,
   Programmer, Reviewer, Test Engineer, Security Auditor; COPY's pipeline order is Spec Writer,
   Programmer, Test Engineer, Security Auditor, Reviewer. Copy is right and Pass 1 was wrong: it
   put Reviewer third because Reviewer and Programmer share the human-code-review gate, but the
   human diff review is the last thing before the release cut, which makes Reviewer the desk
   immediately upstream of the empty chair — a better read of the floor, not just a compliant one.
   Desktop plan swapped Programmer into row 1 and Test Engineer into row 2, so the same cell
   occupancy now reads in pipeline order back-to-front; the chair's isolation, the empty row 4 and
   the human column are untouched. Mobile plan re-labelled to read row-major in the same order.
   Tab order and DOM order follow. §C.8 said "the order is the argument", and the argument is
   Copy's to state.

6. **PLAN.md §4.3 disagreement closed.** §C.6 now records that the Engineer is updating PLAN.md
   §4.3 to the fixed card slot this round, so the popover and the bottom sheet leave that document
   rather than sitting in it as a live alternative.

**Not relitigated, and deliberately so:** everything in the Pass 1 sections above. In particular
the fixed card slot over the bottom sheet (§4 above, Pass 1), the achromatic decision for Tanya's
world (§2), and the five-agent floor (§4) are settled unless new information arrives.

---

# Round 3 (Pass 2) — the owners' answers applied

Gate 1 passed. `QUESTIONS.md` items 45–55 came back and several of them changed the spec rather
than confirming it. What follows is what I decided where the answer left a choice, and what I
rejected. Pass 1 and round 2 above are not relitigated except where an answer forced it.

## 1. Ten stations — Pass 1 was wrong about the arithmetic, not the constraint

Item 32/51: seven agent desks. Pass 1's scratch §4 rejected seven on the grounds that "at 360 with
eight-plus stations nothing is tappable". That was true **of the 2 × 4 portrait plan**, and I never
checked whether a different plan existed. It does. At **3 wide × 6 deep**, scene 320 × 520, the
cabins span the full width across the top two rows and the seven agents run 3-up beneath them:
agent targets **101 × 64**, cabins 320 × 88, chair 104 × 96. Smallest dimension 64px, 45% above the
44 floor. So the honest correction is that the constraint held and my plan was lazy.

Desktop went 5 × 4 → **6 × 5**, scene 792 × 560 (the 856 in Pass 1 did not match cols 1–8 at the
stated grid; 792 does). The seven agents sit on a checkerboard through columns C–F, rows 1–4, read
row-major in COPY.md §2.4 order. The chair kept row 5 entirely to itself, which is *more* isolation
than the eight-station plan gave it, not less.

Rejected: cutting a row of agents at 360 and keeping five there. Same sin as round 2 §5 — the
roster is one DOM list and it does not change with viewport width.

Rejected: shrinking the chair to buy room. The chair is the largest agent-class target in both
plans and that is deliberate.

## 2. Cabins — the budget did not move

Item 52. The thing I was most worried about was the detail budget, and it turned out to be a
non-issue: Pass 1 budgeted ~14 path segments per bespoke human desk, and a cabin comes in at 14
(Sahib) and 13 (Tanya) because the desk, monitor and chair are `<use>`d sub-symbols, not redrawn.
So the cabins are the *same* geometry spend, redirected from a placeholder second monitor into two
walls, a wall piece and two props.

Props: Sahib gets a whiteboard (3-box architecture sketch, no text), a portrait second monitor
drawn dark, and a desk plant. Tanya gets a painting (one frame, two-band abstract), a device shelf
with three phones, and three books. **They are crossed on purpose.** The soft organic object is on
the CTO's desk and the hardware bench is on the product owner's, because the obvious assignment —
plant and painting for her, whiteboard and monitors for him — is precisely §9.4's banned
pastel-for-Tanya split. Stated in §C.4 as a test: if a reader can tell whose cabin is whose before
reading the nameplate, the props failed.

Rejected: a fourth wall or a ceiling. A cabin that closes is a box and a box has no contents.
Rejected: text on the whiteboard. At this scale it is unreadable or it is a lie.
Rejected: a third prop each. It doubles the bespoke segment count and buys nothing.

## 3. The card slot min-height, and a Pass 1 error found while computing it

PLAN.md §13 item 1 asked for the ≥1024 number. Computing it surfaced something else: **the longest
card is now Tanya's, not an agent's**, because item 19's gate ownership gave the two human cards a
sub-block the agents' "Checked by" block already had. 331.03 computed → **344px** on the 8px grid.
At 360 the same arithmetic gives 313 → **320px**, which means **Pass 1's 168 was simply wrong** —
the chair's own four-line card already computed to ~180 there. The reservation had never been
checked against the copy. Both numbers ship with the build-time assertion still required, because
38 characters per line is an estimate of Instrument Sans's average advance, not a measurement.

## 4. Sahib's map — the third cell state is removed, not kept as grammar

Item 45 fills native iOS (Motive, smallcase) and KMP (Motive). The Orchestrator asked whether to
keep the "asserted" state as a grammar for future unattributed claims. **Removed.** A drawn way to
make an unattributed claim gets used; the honest answer to a future claim with no product behind it
is prose beneath the map or silence, not a hollow cell. A two-state map cannot lie by omission.

The better part of item 45 is compositional and I nearly missed it: the Motive row is now three
adjacent filled cells, which is what stops the lone KMP cell competing with the lone lamp cell for
the "one loud thing" read. The gap closing made the lamp *louder*.

Left open on purpose: Pocket Manager's stack. Item 44 sends it to the codebase rather than
answering it, so the TheGeekDogs row's cell rests on item 44's own phrase and carries a `[BLOCKED]`
until the Fact Checker reads the project. I did not fill it from the package name.

## 5. T1 vs T2 — the recommendation held, the argument did not

This was the round's real decision and I changed my mind twice.

The resume closes T2's only stated blocker completely: six named practices with places (KMP
business-logic modules + Clean Architecture, Compose migration, CI/CD and workflow automation,
release ownership with phased rollouts and crash/ANR monitoring, MVVM migration at HSBC, APK-size
reduction at Naskay). Item 19 supplies the gates. Mapped onto T2's six nodes, **every node gets a
gate she owns and a named practice with a company behind it.** On Pass 1's stated reasoning, T2
should now win. I spent most of this round expecting to swap.

What stopped it is a fact that did not exist in Pass 1: **items 32/51 put all seven pipeline roles
on the visible floor.** The home page now *is* the pipeline diagram. A six-node directed graph on
her page would be the site's second one, arguing the same thing in a different projection, and
§9.3 asks for connection without repetition. At eight stations T2 cleared that bar. At ten it does
not. So the floor growing is what decided her page, which I did not see coming.

T1 got better in the same breath, and this is the part I like: the resume splits three ways along
T1's own axis with no forcing. Compose is Android-only → Android edge. KMP modules, Clean
Architecture, CI/CD, release ownership → core. Fleet App (item 46) → iOS edge. **One company,
three layers**, with two 2px ticks running out of the core card into both edges. That is the KMP
shape drawn out of her own work rather than asserted about it, and T2 has no equivalent move —
its graph would queue all six Motive facts.

T2 is now documented as **unblocked and buildable**, not blocked. That is a materially better
position for her post-build review than Pass 1 left it in, and §G.5 names exactly what would flip
it: cutting the floor back to five agent desks.

Rejected: putting a duplicate Motive card on the iOS edge. The tick-plus-card reads as one product
arriving on a platform; two identical cards read as a bug.
Rejected: claiming Swift or UIKit work anywhere on her page. Item 46 attributes the Fleet App; the
resume names KMP shared modules and Bluetooth verification flows. The iOS edge card's small print
is `[COPY NEEDED]` with that constraint written into the marker.

## 6. The work-card strip — included, and made to earn it

Item 50 overrode my Pass 1 recommendation to omit. Fine; the job then is to make it not be a
liability. Two rows, two cards each, **two fields per card** (company, dates) — §D.5's four levels
minus role and the product/stack small print. 112 tall against a full card's 168/196. Two cards at
*every* breakpoint, not three-then-two, for the same reason the desk roster does not change with
viewport width.

Placed directly after the floor on `--band`: the room has just named two people at two desks and
the strip answers who they are, before the gates section says what they refuse to hand over. It
also happens to be the only section family on the page with a row label outside the content, so
the "six sections, six families" line survives as seven and seven.

Noted honestly in §B.8: Sahib's list is truncated (five companies, two shown), Tanya's is not. The
equal treatment is the count and the truncation is his — §9.3's warning about padding her row count
cuts the other way here.

## 7. Small things

- **§J's `/` row** could no longer be "the strip", so the pre-committed cut became the floor seam
  lines. A pre-committed cut cannot be the thing the owners just asked for.
- **Idle stagger** 600ms → **533ms**: nine working stations across 4800ms. At 600 two would have
  wrapped into unison, which is exactly the page-wide-effect read §C.5 exists to prevent.
- **"Lights on" stagger** 90ms → **70ms**, so nine stations finish in ~2.5s instead of ~2.7s. The
  400ms hold was never on the table — the hold *is* the moment.
- **§C.9 still frame:** Pass 1 gave both human desks 0.80. That is the uniformity mistake the
  section exists to prevent, committed one level up. Cabins now differ, 0.84 / 0.82.
- **`docs/scratch/references.md` does not exist** despite item 55's answer pointing at it. Recorded
  in §A rather than skipped, and §A.1–§A.3 are unchanged.
- The plate width was **checked, not assumed**: the longest of the three addresses needs 209 of the
  260px plate, so no wireframe changed width when the label became per-page.

---

# Round 4 — dark mode on every page, and a toggle

`QUESTIONS.md` item 49 came back **reversed**: dark mode everywhere, plus a manual light/dark
toggle on every page, both owner decisions on 2026-09-05. Pass 1's scratch §2 rejected site-wide
dark mode ("three worlds × two colour schemes is six palettes to keep at AA... not worth it unless
the owners ask"). The owners asked. The cost estimate was right — it is six palettes — and the
estimate is now paid rather than argued with. What follows is what I decided where the reversal
left a choice, and what I rejected. Nothing above is relitigated.

## 1. What I did not do: rename the token system

The obvious move was to re-cut all six palettes onto role names (`--page`, `--page-alt`, `--ink`,
`--ink-2`, `--room`, `--accent`) so that every value could invert cleanly under one attribute.
**Rejected.** It is a rename of every token reference in three documents and in the Engineer's
`tokens.css` to solve exactly one problem: `--floor` does two jobs in the light studio (room ground
*and* page text) and cannot do the second one on a dark page.

One alias solves that one problem: **`--ink`**, which is `--floor` in light and `--chalk` in dark.
Everything else keeps its name and only changes value, which is what makes PLAN.md §1.2's
`[data-world][data-theme]` block a value list rather than a redesign. Two more theme-invariant
names (`--card-ink`, `--card-ink-2`) were added for the same economy — they were already the de
facto rule in §F.6, they just had no name.

Rejected with it: giving the dark scheme its own token prefix (`--d-floor` etc.). That is two
systems to keep in step and it makes every component declaration conditional.

## 2. The dark studio — three rejected attempts before the one that shipped

- **Keep `--floor` at `#0F2A2E` in both schemes and put the dark page above it.** Genuinely
  attractive: "the room is a physical place, the page is the thing with a theme," and the entire
  room table (chalk 12.74, lamp 7.56, chalk@72 7.25) would have carried over untouched. **Rejected
  on arithmetic.** Every dark page value that stays legibly dark sits within 1.07 : 1 of
  `#0F2A2E`, so the floor band would have all but disappeared into the page — and the floor is the
  site's one bold moment. The room had to go deeper: `#07181B`, floor-to-page **1.21 : 1**.
- **Make the dark `--band` a step *darker* than the dark sheet**, mirroring the light scheme's
  direction. **Rejected**: it puts the alternation band between the page and the floor in
  luminance, so a `--band` section reads as a half-entry into the room. The rule that shipped is
  *the band steps away from the floor, never toward it* — darker in light, lighter in dark — which
  keeps the floor the darkest fill on the page in both schemes.
- **A borderless contact plate in dark**, since the amber carries 7.54 : 1 against the dark sheet
  on its own and the 2px ink border is no longer load-bearing. **Rejected**: §B.10 spent a
  paragraph proving the plate is one component at one size on every page and every breakpoint, and
  trading that for 2px is a bad trade. The border stays and reads as a keyline.

The genuinely satisfying result: `--chalk` and `--lamp` do not move at all, so the *room* is the
same room in both schemes and only the page around it changes. That is the §B.1 idea surviving
intact rather than being restated.

## 3. Sahib — his existing palette is his dark mode. No deeper variant.

The tempting version was a deeper dark for him (`#0E1220`-ish) so that "dark mode" felt like a
distinct state rather than the status quo. **Rejected on three counts**, and the third is the one
that decided it: the majority of traffic arrives with `prefers-color-scheme: dark`, so a deeper
variant would mean **the approved page is the one almost nobody sees by default**. It is also a
seventh palette to keep at AA for no argument, and his round-1 palette was designed as a dark
ground for the coverage map in the first place — the dark-mode reasoning was already done.

Consequence worth flagging to the Engineer, and flagged in §F.4a: his world is the one where
`[data-theme="dark"]` is **empty** and `[data-theme="light"]` carries the overrides. Pattern-
matching the other two worlds inverts his page.

His light counterpart keeps the indigo-slate hue and lands every pair within 0.2 of its dark twin
(14.09/14.11, 12.52/12.16, 5.79/5.73, 5.15/4.94). Rejected: letting the light page drift toward
the studio's cool off-white, which would have made two of the three worlds look like one.

The lamp rule did the work here rather than needing an exception. On his light ground `--lamp` is
1.74 : 1, so the 2025 cell is a **fill with a 2px `--s-ink` border** and its text is `--s-ink` at
8.10 : 1 — which is what §B.2 said to do on any light surface, restated in round 4 as a property of
the ground (text-legal below L ≈ 0.09, fill-only above) rather than of the scheme's name. One
sentence, six palettes, no per-world exception.

## 4. Tanya — achromatic in dark is a decision, not a default

Every dark-mode instinct pulls toward a tinted near-black: blue-black reads "product", brown-black
reads "editorial", both read "designed". **Both rejected.** Her ground is `#191B1B`, R/G/B within
2 of each other, for exactly the reason her light ink is `#1B2020` and not `#000` — a tinted
near-black posing as sophistication is the decorative move §9.3 forbids on her page specifically.

Her dark scheme beats her light one on every pair but one (14.35/14.18, 6.19/5.59, 5.11/4.81; the
core pair is 11.85 against 12.20), so "the strictest surface on the site" survives the theme. That
was the bar and it is met by arithmetic, not by assertion.

The interesting small decision: `--lamp-ink`'s dark twin **is `--lamp` itself** — the counterpart
of the counterpart. It clears body contrast on both her dark grounds (8.66, 7.15), which means the
light scheme's "large text or marks only on `--t-core`" restriction is no longer *forced* in dark.
**I kept it anyway**, as a design rule rather than a contrast consequence: her page has exactly one
chromatic mark doing exactly one job, and letting it become a word in one scheme and not the other
would give her page two different amounts of colour depending on the visitor's OS. Recorded in
§G.1a so nobody later "fixes" it by reading the ratio table alone.

Rejected: a warm amber for her dark cap that is *not* the studio lamp (a muted `#E0A84A` was
drawn). It is a seventh colour value that nobody can tell apart from the sixth.

## 5. The toggle — what it is not

- **Not a sun/moon pair.** It is the single most template-y icon pairing in circulation and it says
  nothing about this site. The glyph is the floor's pendant lamp: shade alone in light, shade plus a
  **solid filled cone** in dark. The state is carried by a shape being present or absent, which
  survives greyscale at 20px with colour switched off — the same test §E.1's three stage states
  pass, applied to a control.
- **Not a sliding switch.** A track-and-knob is a 60 × 32 object that animates, has a mid-travel
  state, and imports a UI-kit vocabulary §9.4 bans. A 44 × 44 button with two glyphs has none of
  that.
- **Not three positions.** No "system" option in the UI. The default *is* the system preference;
  the toggle is the override; there is nothing to return to that clearing storage does not do.
- **Not amber.** The glyph is monochrome `--ink` in all six palettes. On a light ground amber
  breaks the lamp rule outright, and on Tanya's page it would be a **second** chromatic mark. One
  rule beats three exceptions. Amber appears on the control only as the focus ring's inner half,
  which is the identity it already has everywhere else.
- **Not repeated in the footer.** The footer nav exists so a visitor at the bottom of a long page
  can still *go* somewhere; a duplicated stateful control is two focus stops, two accessible names
  and a sync problem, for a preference set once.
- **Never animating the page.** The 200ms page-wide colour cross-fade is the definitive dark-mode
  tell. No colour property on this site carries a `transition`, so there is nothing to fade and no
  half-themed frame can exist. Only the cone moves, 120ms, and reduced motion takes even that to 0.

Position was arithmetic, not taste: at 360 the four nav labels use 236 of the 320 content width, so
a 44 × 44 control right-aligned to the content edge leaves **40px of clear space** after `Contact`
and the header stays 92px — the fold arithmetic from round 2 is untouched. Rejected: a second
header row for it (costs the fold), and tucking it into the footer only (a preference nobody can
find is a preference nobody uses).

## 6. What the dark scheme found in the light scheme

Re-running §E.1's numbers on dark surfaced that the **light** future-node stroke,
`rgba(15,42,46,.45)` over `--sheet`, is **2.65 : 1** — under 3 : 1. Its dark twin at the same alpha
is 3.76 : 1, because a light mark on a dark ground is simply more efficient. It is not a live
failure (the node's label is real text at 5.62 : 1 and the dashed connector is a second channel),
and I did **not** quietly raise an approved round-1 value to make my own new table look tidy. It is
§I item 5 with the fix priced (`.60` → 4.01 : 1) and the decision left where it belongs.

Also decided rather than discovered: **print always uses the light tokens**, in every world,
whatever the visitor's theme. A dark page sent to a printer is either a flooded sheet or — once the
browser suppresses backgrounds — light text on white, which is an unreadable document produced
silently. One line in the print stylesheet removes the entire failure class, and §D.8 now says so.

## 7. Housekeeping, and one thing I want seen rendered

§I was reconciled rather than extended: item 6 closed against `FACTS.md` §(d) (a direct read of the
Pocket Manager repo — Kotlin, Compose-only, Hilt, Room), item 7 closed as "T1 stands", item 9 closed
as stale (COPY.md cut the hero body to 24 words in round 3, inside §B.7's budget). Items 1, 5 and 8
are now `QUESTIONS.md` 64–66 and are tracked there, not duplicated. Items 2–4 are the Copywriter's
this round.

The one I actually want eyes on: **the dark floor band sits only 1.21 : 1 below the dark page.** The
arithmetic says it works — it is still the darkest region, still the only one with lit surfaces and
a lamp cone, and it takes a 1px `rgba(232,237,233,.14)` top edge, which is the same device §F.4
already accepted at a *smaller* 1.16 : 1 step. But the room is the site's one bold moment and 1.21
is a quiet boundary next to the 13.53 the light scheme gets for free. §I item 6 says it, and it
should be the first screenshot of the round-4 review at both 360 and 1440. I would rather be told
it is thin on a rendered page than defend it on paper.

# Round 5 — housekeeping
Connector: the table wins, solid out of `◉` (a connector states whether the node it leaves happened), and §E.2's two wireframes plus §E.3's two are corrected to match the build. Future-node light stroke raised to `rgba(15,42,46,.60)` — 4.01 : 1 on `--sheet`, 3.83 : 1 on `--band`, both clearing SC 1.4.11; the dark twin stays at `.45` because 3.76 / 3.49 already clear it and the schemes should match on ratio, not on alpha. OG cards are light-only and `theme-color` ships per scheme, recorded in §B.2a with the toggle-override mismatch named rather than hidden. New §B.12: the favicon is the lamp cone alone — cord, trapezoid, detached pool, amber on petrol, two colours, one flat SVG with no `prefers-color-scheme` inside it because the tile is dark in both schemes and the three PNGs could not follow a media query anyway. It is browser chrome and it never touches the page; item 48's "no logo" is untouched. §I is down to four: three with the Copywriter, one still wanting the dark floor band rendered.

# Round 6 — the map's cells get their products
Item 72 finished what item 45 started: every one of the map's ten filled cells now prints a product, so the two-state grammar is the whole grammar and the reserved honest line under the map is deleted (a disclaimer under a fully attributed diagram only teaches doubt). "Asserted" survives as documented grammar for a future row, undrawn. Cells changed: smallcase's three now read smallcase Android / Tickertape on native iOS / Tickertape Flutter for iOS then Android migrated, instead of "Tickertape" three times; Motive's three now read Fleet + Driver apps / same plus Views-to-Compose / KMP design-components library across both, instead of "Motive Fleet App" three times. Cleartrip, TheGeekDogs and Keenai are unchanged in content; the `[BLOCKED]` markers on Pocket Manager come out, since FACTS.md §(d) is a direct repo read and §I closed the question in round 5. Geometry did not move — item 72 changed what the cells say, not where they sit — so the region is still ten of twenty-five, no empty row, no empty column, and its shape is a staircase falling right to left from the lit pair to the native-Android column that carries the bottom two rows. The Keenai pair touches the Motive bar corner to corner only; that corner is what makes the step read as a step, and it is why I stopped calling the lamp cell "solitary" and started calling it the mark that stands apart. Footer: nothing to do. Neither wireframe nor §B.11 ever printed a city, so item 71's Bengaluru-only amendment lands entirely in COPY.md. §I unchanged apart from one stale cross-reference to the markers I removed.

# Round 7 — the two rulings written in
Both of step 2's conflicts land in the spec. (a) The `< 768` full-bleed bar is withdrawn: §B.10 is now one 260 × 56 plate inset 16px bottom-right of the *viewport* at every width on every page, the §B.8 wireframe draws the inset plate instead of a bottom bar, and the §B.9 note says outright there is no full-bleed variant. At 360 that is 276 of 360 with 84px of clear space — a plate, not the viewport, and never a rule across the page. (b) The keep-out lane is deleted. §B.5 gains "one grid, every section, no exceptions" plus the line that the split forms — proof band, gates' closing line, §C.6's slot — engage at **1024, not 1440**. The reserve is only the +56px bottom padding, and the composition rule replaces the lane: no load-bearing mark (a stage node, a CTA, a form control, a card's price line) in the viewport's bottom-right 276 × 72 CSS px at ≥ 768 while the plate is present. Stated once, in §B.10, with the practical test written down — inside the plate's 276px band *and* within 72px of its own section's bottom — because a viewport-relative rule needs a scroll-independent way to check it. Two consequences priced: the proof band keeps cols 7–12 and the full 1200, and pays by **ending the track's axis at x 1132 at 1440** (five node centres 732/832/932/1032/1132 at a 100px pitch, last ring closing 23px clear of the plate at 1164) — which incidentally gives §E.2's label row a 100px pitch instead of 67px, so `Submitted for review` sets in two lines; and §C.6's slot returns to cols 9–12 at 1024 untouched, because it sits ~184px above the floor section's bottom edge. The 1024 slot forced an honest number I had ducked: cols 9–12 at 1024 is 293px, not the 366 the reservation was derived at, so Tanya's card runs 6 body lines and 3 gate lines there and `min-height` is **392 at 1024–1439**, 344 at ≥ 1440, 320 at 360. The narrower column costs height, not the arrangement. Review item 4 (numbered 5 in the brief I was handed) applied: §C.6 now states the slot has no container — no border, outline, fill or radius, it is a reservation — and §J's `/` row becomes that border, with the floor-seam lines dropping to the fallback. Both gate blocks in §B.8 and §B.9 redrawn against COPY §2.6 as it now prints: the owners' names are back in the placeholders, and the line under the four has a slot of its own with no hung numeral, because it is not a fifth gate. The slot is unbounded in height, so the longer strings cost lines and not layout.

# Round 8 — the floor review's rulings written into §C
Deviations 2, 3 and 4 accepted into the spec and deviation 1 sent back, as the review ruled. §C.3: cabin buttons are **128 × 136** and the old 232 × 148 is withdrawn (at 128 the x separation equals the sum of the half-widths, so no pair can overlap whatever the height, which is what makes 136 free); buttons are centred on the drawn station, not on the plan module; nameplates sit on the near half of their own module, which is the checkerboard's constraint and not a preference. The scene box is re-derived as **856 × 520** — room 704 × 392 drawn 1:1 with 76 of horizontal margin for the plates' overhang and 64 of vertical, the same height as the portrait box so nothing jumps at the switch — and the projection is written down once, centre(c, r) = (396 + 64(c − r), 72 + 32(c + r)), so every coordinate in the section is reproducible. With the lane gone the room is 856 × 520 at both 1440 and 1920, 682 × 414 at 1024 and 704 × 428 stacked at 768; the slot is untouched at cols 9–12 (384 / 293) because the lane never gave the slot anything, it took from the scene. 1024 is the tightest point on the site at **89 × 44.6** and I have stated it rather than rounded it up, with the fix named in advance (the bleed or the box margin, never the target). The portrait plan switches **below 768**, not below 1024: 768's content is 704, the wide box scales in at 0.822 and the smallest target is 92 × 46. Portrait re-derived on a 3 × 6 grid, three columns of 101.3 with 8px gaps and six rows summing to exactly 520, every station's y stated; the plate rule inverts to **top of its own button** — the occlusion argument that forces "below" on the checkerboard has nothing to occlude on a 3-up orthogonal grid — which makes "no plate in another station's target" a proof (a rectangle inside one member of a disjoint set is inside no other) rather than a screenshot, and it bought 4px of target height rather than costing any: smallest target **101.3 × 68**. Remove one thing: the skewed wall-mounted cabin plate goes (§C.4), and the cabin name is set horizontally on the near half of its own cabin floor at the same baseline as every other plate — Sahib's at (396, 204), which clears Tanya's button by 26 in x. New **§C.11 Pointer**, because the requirement the build broke was the one the spec had only ever implied: every station reachable by pointer and touch, hit-tested on the button's own box, nothing intercepting it, and the acceptance test is `document.elementFromPoint` at each station's centre returning that station's button at all six widths in both schemes. §J's `/` row becomes the skewed plate; the slot border leaves the list because a pre-committed cut cannot be spent on something §C.6 already forbids in terms.

# Round 9 — the composition rule amended, and the two marks it now catches
Run A's blockers 2 and 3 are one fault seen twice: §B.10's round-7 test was a rest test on a **section** and the plate is a **viewport** object, so a printed address 351px above its section's bottom passed the test and was struck through on first paint. The 72px box is retired, the 276px band is kept, and the test is now one number per mark — its right edge. Rule as written into §B.10, verbatim from the review: *no load-bearing mark — one whose meaning is lost when part of it is hidden: a stage node, a printed address, a CTA, a form control, a card's price line — may have its right edge inside the plate's 276px band at ≥ 768, anywhere inside the plate's wrapper. Prose and headings may run under the band; a mark that is read as a unit may not end inside it.* It still costs no width, no container, no column, no measure and no lane, and it is still scroll-independent because the plate's *horizontal* rest position is. §B.9's proof band already answers to it (axis stops at 1132, last ring closes at 1141, band at 1164, 23px clear), and the two paragraphs that leaned on the retired box are rebased on the rule's own prose exemption rather than on the bottom-72 escape: §C.6's slot at cols 9–12 / x 682–976 at 1024 passes because the interaction card is a name, a line and a gate list in a container and no line in it is read as a unit — the same correction made at §C.6's own "side-by-side arrives at 1024" line, which was still quoting the 276 × 72 box. **`/work/`:** the horizontal axis is fixed at x 137 with a 124px pitch cap, so its right end is 647 from 900 up while the band moves with the viewport — collides **768 to 930**, clear at **931**. So §E.2's vertical form runs to 930 and the horizontal form starts at 931; the breakpoint moves and nothing else about the component does. The narrower cap is refused and refused once, in terms, so it stops coming back: `band − 16` is an 85px pitch at 768, which drops `Submitted for review` to three lines and breaks the two-line label reservation this run just closed. **`/contact/`:** the 3-up runs **inside cols 1–9 at ≥ 1024** and stacks below. The breakpoint alone was not the fix and I said so in the spec — at full width the third column ends at 1140 against a band at 924 at 1200, so ≥ 1200 fails the same way. Cols 1–9 is 690 at 1024 (row ends x **738**, band **748**) and 894 at 1440 (x **954**, band **1164**); 1024 is the tightest width and every width above is looser because the band moves 1px per viewport px and the row's right edge ~0.75. Blocks are **214px** at 1024 and 282 at 1440, and the longest address needs ~169, so all three set on one line. Cols 10–12 are the page's one §B.9 void and the plate rests in them. **§E.1 checked, not changed:** `rgba(15,42,46,.60)` is the only light future-node stroke in the document — the surviving `.45`s are the dark twin `rgba(232,237,233,.45)` (correct, §E.1a), the round-4/5 history that names the value it replaced, a 1.45 line-height and a dark stand shadow. The build shipped `.45`; the spec did not, and that is the Engineer's fix, not mine.

# Round 10 — the plate below 768, and mechanism 2's false claim
Round 7's ruling (a) traded a bad bar for a plate that is the wrong size for a 360 viewport, and round 9's "below 768 it does not bind" repeated the error one level down. `floor-360-{light,dark}.png` shows it: the 260 plate's band starts at x 84 and the card panel's measure is x 40-320, so **236 of 280 — 84% of the line width — is covered while the visitor reads the default card.** 84px of clear space in a 360 viewport is not clearance. Ruling: **two changes below 768, because neither alone meets the standard.** (1) **112 × 56, band 128, beginning x 232 at 360 / x 262 at 390**, and the composition rule now **binds below 768 too** at that band instead of being exempted there — measured clearances: work-card date line ends ~181 (51 clear), `/contact/` addresses end 209 (**23 clear**, the same margin the 1440 proof band holds), `/work/` vertical track label ends ~210 (22 clear); all three were struck by the 260 band. That change alone makes the plate obey the rule §B.10 wrote for itself. (2) **Below 768 the wrapper on `/` begins at the end of the floor section**, so the card panel is never overlaid at any scroll position — the width change alone still leaves 88 of its 280 measure under the plate, and prose exemption is not the same as "never covered". Mechanism: `position: sticky` in a wrapper that does not span the region — the same mechanism §B.10 already uses to retire the plate before the final CTA. **No JS, no `view-timeline`, no scroll-driven animation, therefore nothing to cancel under reduced motion and nothing to fall back from**; a scroll-timeline fade fails twice into the defect (unsupported → always visible; reduced motion → always visible) and that is why it was not taken. Cost: 112 cannot print a 22-char address (needs ~209), so below 768 the plate carries a `[COPY NEEDED: ≤ 9 characters]` label with the address in its accessible name. **Item 53 amended below 768, not overturned** — the address is still printed in the final CTA, three times on `/contact/`, and in each person page's closing line, at every width; the plate below 768 is the way to act, not the proof, and on a phone the address is tapped, never transcribed. Docked full-width strip refused a second time, with the reason written down so it stops returning: it only differs from the withdrawn bar if content never passes under it, which needs the document to become an inner scroller — 72 of a 640 viewport permanently, iOS URL-bar collapse, find-in-page and scroll restoration all broken, and a fixed amber row across `/404` is the §9.4 rule-across-the-page. Also corrected: the **reserve is +72, not +56** (56 plate + 16 inset) — the old number under-reserved by exactly the inset. Card panel `min-height: 320` unchanged and takes no plate allowance. §C.3 mechanism 2: "the single largest area of accent colour on the entire site" is false — the cone is smaller than a 260 × 56 plate — and it was reaching outside the scene to make a point about the scene. Rewritten to the true and sufficient claim: the cone is the room's only chromatic mark, `--lamp` appears nowhere else in it, so in a room of `--floor` and `--chalk` the one place colour lands is the one place nobody sits.

**Round 11 (§B.9 proof band at 1024, §E.3).** Engineer's Build-run-B finding accepted: cols 7–12 at 1024 measure 452 and offer 215px of usable axis (col 7 x 524 → band 748, less the 9px ring) against the 409 that five nodes at §B.10's 100px pitch need. Option (i) refused twice over — re-split as 1–4 / 5–12 puts the last ring at 774.2, **26.2px inside the band**, and leaves the prose 293.2px, 17.2em against `--measure-body`'s 32em. Option (ii) refused — cols 7–12 scale to a **53.8px pitch**, and the compact labels are *not* shorter (the header row is §E.2's own five strings, `Submitted for review` included, which is why §B.10's 1440 note reasons about them), so the 85px refusal at 768–930 applies with more force: at 53.8 the word `touches` is exactly one pitch wide and `Final touches` takes three lines. Option (iii) taken, with its threshold corrected from the proposed 1200 to **1440**: col 7's left edge is `12 + 100vw/2` at every width from 1024 up and the band is `100vw − 276`, so the 100px pitch clears only from **vw 1394** — at 1200 the last ring would close at 1021 against a band at 924, 97px inside it. 1394's only named breakpoint is 1440, and 1440 is where the split already ships. So: stacked 768–1439, split at 1440, and the pitch is 100 at every width — where 100 does not fit, the section changes shape, never the component. At 1024 the stack is prose + figures + store link in cols 1–7 (531.3px, 31.2em), then the label row and both runners in cols 1–6 with the axis x 48 → 448 (centres 48/148/248/348/448), last ring closing at **457 against a band at 748 — 291px clear**, the component's largest clearance at any width; caption and the ≤ 8-word line as prose in cols 1–9. 768–1023 unchanged and checked as the tighter stacked width: ring closes 441, band 492, 51px clear. Edits: §B.5's "1024, not 1440" paragraph now names only the closing line and the card slot and carries the crossover arithmetic; §B.9 gains a round-11 note under the wireframe with all three options costed; §E.3 gains the unabbreviated label ruling and a per-width geometry table; §B.10's proof-band bullet is scoped to 1440. **The 1440 layout is untouched** — axis 732 → 1132, last ring 1141, band 1164, 23px clear.

# Round 12 — the reviewer's proof grid, the unconditional plate, and Tanya's columns back
Thirty run-B items, one arbitration, one new section. **§B.5 gains a ruling that supersedes round 11's**: "the split forms engage at 1024" holds for §C.6's slot and the gates' closing line, and does **not** hold for a two-column arrangement whose second column is a diagram with a fixed minimum extent — those engage where the diagram fits and are **one grid, two rows** below it. Round 11's stack (prose cols 1–6, right 46% of a 918px section empty) is withdrawn on render, which is the round's governing principle: rendered evidence outranks arithmetic alone. **§B.9's proof grid at 1024–1439:** row 1 prose, three figures and the store link in cols 1–7 (x 48 → 579.3, 531.3 = 31.2em), caption and its note in cols 8–12 top-aligned (x 603.1 → 975.6, prose, exempt by §B.10's own rule — the right of the row is filled by writing, not by a void); row 2 the two-runner track, block cols 1–9, node centres **252 / 352 / 452 / 552 / 652** at the 100px pitch, axis ink 243 → 661, **96px clear** of the band at 748 node-centre-to-band and 87 ring-to-band. The right anchor is written once and is band-relative — `min(block right − 33, 100vw − 372)` — the one place in the document where §B.10's viewport rule *sets* a coordinate rather than only testing one. **1440 keeps the existing split because it clears**: cols 7–12, axis 732 → 1132, last ring 1141, band 1164, **23 clear**. 768–1023 keeps §E.3's stacked form (ring 441, band 492, 51 clear) and gains the allocation that closes B1 there — figures cols 1–5 of 8, prose cols 1–6. All five stage labels centre on their nodes in every form at every width; §E.3's round-11 per-width table is replaced.
**§B.10, the half of the blockers that was mine.** Reserve 3 promised "the panel's text is never covered" and the same section exempted the card slot from the band as prose. Both cannot stand. The promise wins, verbatim and unconditional: **the plate never covers content — not a load-bearing mark, not a card, not prose, at any scroll position, at any width, on any route; where a region cannot be kept clear by where its marks go, the wrapper does not span that region.** Round 10's change three loses its `< 768` condition — the wrapper never spans the floor section — and `/contact/` loses the plate entirely, which is the exception run A said I would write. Every struck mark is now covered by a rule: `1,000+` by §B.9's column allocation, the Designer station and the card's `Owns` line by the wrapper's absence, Tanya's `Owns` line by "no load-bearing mark right of col 9". `qa:plate` gains four marks it never measured.
**§G.3.** The build put core at cols 4–7 and iOS at 8–9 and left 10–12 standing empty down the whole band — a keep-out lane in all but name, which §B.5 forbids in terms. Restored at ≥ 1024: **Android 1–3, core 4–9, iOS 10–12**; core 451.8 wide at 1024 (measure 387.8, **~47 characters**, against the rendered 31 — T4 closed) and 588 at 1440 (measure 524, 30.8em). Col 9's right edge is 737.7 against a band at 748, **10.3 clear**, so no load-bearing mark goes right of col 9 at any width. Both ticks terminate at the core's own boundary with the edge card top-aligned one gutter beyond — symmetric, and a tick crossing the right gutter at 1024 would end 13.7px inside the band. Edge fields end where their content ends (T2); no full-height rules at ≥ 1024 (T3); quotes keep their marks and lose their rule (T5). §G.5 gains a round-12 block: the design held and the render did not, and the four things that close it need no new content.
**Also applied.** §C.3: the wide plan read its own pipeline backwards on screen (5·3·2 / 7·6·4) — **the seven roles are re-assigned to the same seven modules**, same checkerboard parity, no coordinate moves, and the room now reads 1 / 2·3·4 / 5·6·7; the chair gains a back and a support with the 250ms frame as its acceptance test; its plate moves off the cone below 768. §C.6: min-heights re-derived from measurement — **352 / 416 / 264 / 320**, because COPY §2.3 round 12 made Sahib's gate line the long one and 392 was 15px short of it. §C.8: selected fill 34% → **52%**, with a pixel-difference acceptance test, because "built to spec and invisible" is a spec defect. §D.1: a 768 row, and **no work card wider than 420 anywhere**. §D.8: the **whole person page** collapses to one column in print, and the map's marks take the stage indicator's stroke-plus-size discipline so they survive default background suppression. §E.2: the axis takes its block's inner edges, pitch falls out (142.8 / 164.5 / 219), the 930/931 switch untouched. §B.11: the wedding planner's differentiator at 2× in cols 1–4 with §5.2 beside it. §F.4b, new: **`--s-fill`** splits off `--s-panel` — light `#868AA0` at 2.97 : 1, dark `#5E6480` at 2.91 : 1, matched on ratio per §B.2a — which closes S2 and frees `--s-panel` for the two section blocks that close S1. §H.3: a 120ms lag behind the core's boundary, which is the difference between a claim and a wipe. §I question 4 closed on render; §I is down to three.
**§J re-checked per route and six rows moved**, on the discipline that a pre-committed cut cannot be spent on something the spec now forbids — round 12 turned four of the reviewer's eight nominations into rules, so those routes get live ones: `/` the seam grid, `/work/` the index store link, pocket-manager the `Build` bulleted list, wedding-planner the bullet markers, `/contact/` the split header, `/sahib/` the duplicated address, `/tanya/` the intro's second paragraph, `/404` the footer's nav repeat and `Elsewhere` block named explicitly.
**New §K, the presentation packet for Tanya**, made concrete: six frames in order (`tanya-band-1440-light`, `-1440-dark`, `-1024-light` shown *as a named defect*, `-360-light`, `tanya-quotes-1440-light`, `print-tanya-p1`), three passages (§G.4 in full as the alternative, §G.5 including its round-12 block, brief §9.3 with §G.1's achromatic paragraph), and one question — **does the strictness read as rigour or as austerity?** — asked after frame 4. Two things not to ask, and the named fix if the answer is austerity: the `--lamp-ink` cap earns a second placement on the two ticks, never a hue.
**Disposition table appended after §J: 26 of 30 items spec-side, 4 build-side** — T1 (the Compose migration has been the Android edge's first content since round 3), T3 (§G.3 asks for the rule at 360 only), T5 (COPY §7.1 supplies the quotation marks and addressed the note to me), E1 (§B.11 has specified the empty room since round 3). Plus the audit's print ruling, spec-side.

# Round 13 — the reconciliation round after build run D
Four items, no new rule and no weakened one. **§B.8 vs §B.10 below 768, and both wrong sentences were mine.** `qa:plate`'s seven flags are two marks on `/` at 360 and 390 (`1,000+`, `downloads`) and one on `/tanya/` at 360, 390 and 768 (the core's `Owns` line). §B.8's "3 across at 320: 96px each" is Pass 1 arithmetic against a band at x 84 and does not survive the 128 band at x 232 — the third column runs 244–340, so the figure ends 309 and the label ~302. Narrowing is refused on arithmetic: three columns inside x 20–232 is 212px, 60px a column at §B.5's 16px gutter, against `1,000+`'s own **65px of ink**, and the only ways out are a fourth numeral size (§B.4 gives two) or an 8px gutter with 0.3px of slack. **So the figures stack below 768:** numeral in a 68px column from x 20 (§B.5's own 360 column, 3px wider than the widest numeral), micro label from x 104 (col 2's left edge) on the same baseline, rows 16px apart. Widest ink is `downloads` ending **x 162 — a constant at every width below 768 — 70px clear at 360**, 100 at 390. Costs **57px of height once** (104 against 46.85) and puts three tabular numerals in one left column, which is what `tnum` is for and what three-across never gave them. §E.3 already ruled 768–1023 and above, so the row is now one instrument at every width. **§B.10's "the `Owns` line is covered by being full width" is deleted** — full width is the fault, not the fix; a line that sets to its field's measure ends where the field ends (x 305 at 360, x 539 at 768). The core does **not** narrow: a measure cap that clears the band is 192px at 360, ~23 characters, under §C.6's 29-character card floor and inside the 245/31 field item T4 was raised to remove, and §B.5 calls the core a diagram with a fixed minimum extent. **The line breaking changes instead — one gate per line below 1024**, no commas, separation by space (§B.2), a real `<ul>` as PM1/WP2 left every other list: longest is `security and privacy`, 157px from x 40 → **ends x 197, 35 clear of 232**; x 221 vs 262 at 390; 167px from x 64 → **x 231 vs 492 at 768, 261 clear**. Constants per breakpoint, so every width in range is looser than its floor. Kept above 1024 too — five owned gates read as five gates, and the comma run-on was always what the narrow column forced. Two compositions, seven marks, **no exemption and no region left the wrapper**. Also corrected in §B.10: the promise's "not prose" is struck against reserve 1's "prose and headings are exempt", because a sticky element in flow passes over what is above it and a promise no mechanism can keep hid a real defect. The promise is load-bearing marks plus the named regions; the reserve is unchanged.
**§G.3a's tick, and it is a meaning decision before it is a geometry one.** Round 12's "edge card top-aligned to the tick" is not expressible — the edge field's first mark is its platform label, and aligning a row across three independent columns needs the core split or a JS measurement (§H.1). Withdrawn. **A tick is where a platform layer attaches to the core, and it attaches to the layer's *name*, not to any card in it:** stroke centre on the **platform label's first baseline**, one baseline shared by all three fields because all three take the same **36px lead-in** (the core's 4px `--lamp-ink` cap + 32px padding; the edge fields carry no cap, no fill, same padding) and the same label type, Anek 500 `wdth` 75 at micro 13/1.45 — **50px below the band's top border edge** on the shipped subset. The baseline is the spec, 50 is its consequence, and PLAN's assertion compares the two edge baselines to the core's rather than checking 50. The pairing is carried by content — Motive in all three fields — which is where it always was; round 12 asked a stroke to do the cards' job and paid in an alignment nobody can build. Consequences: **the tick no longer waits on T1**, and T2's "edge fields top-aligned to the core's first card row" becomes "to the band's body row", same defect, same fix. At 360 the ticks leave the core's **bottom** edge, not the Motive card, and land on each edge block's label baseline. Both wireframes redrawn.
**§C.8, H9.** Recorded as measured: selected fill **2.36 : 1 light / 2.61 : 1 dark**. 3 : 1 is unreachable by this mechanism — 100% `--chalk` on `--floor` is only 4.9 : 1, and the cap below the monitor glow's 55–85% is a decision I am keeping, because a table brighter than the screens is a different room. **The 1px `--chalk` edge carries the state** (12.74 : 1 on `--floor`), taken on measurement exactly as the bullet priced it; the fill is the quiet half of a two-part indicator, the same discipline §F.6's map and §E.1's stroke-plus-size take. **My ≥ 30% pixel-share test is retired, not lowered** — the top face is ~25% of the station's box at 1440 and ~16% at 360, so 30% of the box was never reachable from that face by any amplitude. Replaced by: delta ≥ 60 on the face (met, 67/69) **and ≥ 100 on the edge** (met, 106–178), share reported (16.6% / 25.4%) so a change to the drawing shows.
**§C.4's 6% warm offset is deleted from the spec.** Open since run A, unbuilt in every pass, already ruled against by the step-2 review. It was a fifth fill in a scene §C.1 and §C.10 both cap at four, spent on a difference §C.4 itself calls sub-threshold, on the one distinction §C.4 says is *not* carried by colour — and a warm tint on the two human surfaces is the pastel-for-the-humans move §9.4 bans one level down. Four fills is the line. The Warmth row now says what actually does the work: the walls' shadow fill on their right faces, which is what gives a cabin an interior.
**Written up as §I.1** with a four-row disposition table, plus a round-13 paragraph in the document's preamble. Still open and none of it mine: T1's Android-edge Motive label (Copywriter), both headshots (item 23), §K's packet.

# Round 14 — S2, and the fill route is closed by arithmetic rather than by taste
The audit does not waive Finding 1 and it is right not to: `--s-fill` on `--s-ground` is **2.97 : 1 light / 2.91 : 1 dark**, under SC 1.4.11's 3 : 1, and "deliberate, spec'd and a big improvement" is not a pass. Its proposed action — nudge the fill to 3.0–3.2 — **cannot be executed in either scheme**, and I am printing the bounds rather than arguing it, because a refused action needs a number and not an opinion. The fill is squeezed from both sides: darker to clear the ground, lighter to keep the product name §F.1 spent two rounds putting inside every filled cell at AA body. Light, by §B.2's method: ground L 0.864418 and 3.2 : 1 demand `L_fill ≤ 0.914418/3.2 − 0.05 = **0.235756**`; `--s-ink` #1A2033 L 0.014917 and 4.5 : 1 demand `L_fill ≥ 4.5 × 0.064917 − 0.05 = **0.242124**`. **The window is empty by 0.0064.** Dark: ground L 0.011983 demands `L_fill ≥ 3.2 × 0.061983 − 0.05 = **0.148347**`; `--s-ink` #E9EAF0 L 0.824605 demands `L_fill ≤ 0.874605/4.5 − 0.05 = **0.144357**`. **Empty by 0.0040.** The ceiling in both schemes, at the AA-body floor, is **3.13 : 1 light / 3.14 : 1 dark** — over the line by 0.13, with the cell's own text sitting exactly on 4.5, which is a fix that clears one check by pushing another onto its threshold. Refused. The two escapes are worse: dropping the product name under AA body undoes item 72's whole gain, and minting a seventh Sahib value for cell text is the fourth-palette move item 49's reasoning already rules out.
**So the distinction moves to a mark, which is what this document does every other time a fill cannot carry a state.** §E.1's stage indicator carries three states on shape, size and stroke; §C.8's selected desk carries its state on a 1px `--chalk` edge at 12.74 : 1 because 3 : 1 on the fill is unreachable under the glow ceiling; §I.1 row 3 took that exact ruling one round ago. **New in §F.4c: a 1.5px `--s-ink` stroke on every filled cell — 14.09 : 1 light, 14.11 : 1 dark against `--s-ground`, and 4.74 / 4.84 : 1 against the `--s-fill` it encloses.** Both sides of the boundary clear 3 : 1 with margin measured in multiples, not hundredths, which is the whole point of not shipping 3.13. `--s-dim` was the other candidate and is **refused for this mark**: it clears the field at 5.79 / 5.73 : 1 but sits at **1.95 / 1.97 : 1 against the fill it would bound**, so the stroke would dissolve into its own cell and I would have traded a soft region for a soft outline. A boundary has two sides. 1.5px and not 1px because 1px is a hairline at 1× and this mark has to survive a 4× DPR sample and 125% zoom; at 4× it is 6 device px, exactly the auditor's own patch, and it stays visibly under the lit cell's 2px border.
**No token value changes, in either scheme** — `--s-fill` stays #868AA0 / #5E6480 and every ratio in §F.4 and §F.4a stands hex for hex. §F.4b's split of the fill off `--s-panel` is what makes this affordable: the fill is now free to be the quiet half of a two-part mark instead of the load-bearing half of a one-part one, and it keeps doing the thing it was actually good at, which is making the region read as a region at a glance. **The contract for the auditor's pixel check is restated in terms, because the last round's number was checked against the wrong channel and I do not want that to recur: sample the 1.5px `--s-ink` stroke against `--s-ground`, on the outer side of a filled cell's long edge, away from corners and away from any shared edge — 14.09 : 1 light, 14.11 : 1 dark, against 3 : 1.** Fill-vs-ground at 2.97 / 2.91 is **not** a pass/fail channel and is recorded as reinforcement.
**What it does to §F.1's argument, which was the thing I was actually protecting.** Where two filled cells touch — the Motive and smallcase three-cell bars — the shared edge **draws once** at 1.5px, never a doubled 3px seam, so the ten cells stay one bounded region with internal divisions rather than becoming ten boxes. That is a stronger read of the staircase than 2.97 : 1 ever gave: a low-vision reader now gets the *shape* at 14 : 1 before finding the lamp at its corner, which is the order §F.1 has always claimed and could not previously deliver. The lit 2025 cell keeps its 2px `--s-ink` border unchanged and is no longer the only bounded cell on the map — it is the amber one among ten bounded ones, and `--lamp` against `--s-fill` is untouched at **1.71 : 1 light / 2.91 : 1 dark** with the boundary at 14.09 / 14.11 and the ink inside it at 8.10 : 1 light. 360's row strips unchanged, per §F.4b. **One thing written down that was right in the build and missing from the spec:** the lit cell's text flips token with the scheme — `--s-ink` on amber is 8.10 : 1 in light but **1.66 : 1 in dark**, so dark takes `--s-ground` at 8.48 : 1. Run D derived it correctly; §F.4c now prints it, because a value only the stylesheet knows is a value the next round gets wrong. Edits: §F.1's cell-state table, the `--s-ink` role line in §F.4 and §F.4a, new §F.4c, §I.1 row 5. **The round adds one mark and one number and moves no token.**
