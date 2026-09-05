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
