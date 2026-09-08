# DESIGN.md — TheGeekDogs.com

Design Lead, Pass 2 (round 3), amended in round 4. Pass 1 cleared the Direction human gate; the owners' answers are in `QUESTIONS.md` items 45–55 and are applied here in place. Structure and voice are Pass 1's; what changed is marked in the section that changed.

**Round 4.** Two owner decisions reverse `QUESTIONS.md` item 49: **every page ships a dark scheme**, and **every page carries a manual light/dark toggle**. Applied in place. Six palettes now exist, three light and three dark, all computed to AA by §B.2's method: §B.2 / §B.2a (studio), §F.4 / §F.4a (Sahib — his existing palette *is* his dark scheme), §G.1 / §G.1a (Tanya). The toggle is specified in §B.10a; the stage indicator is re-checked on dark in §E.1a; print (§D.8) always uses the light tokens; §H.4 confirms the toggle adds no motion. Round 3's other decisions are untouched.

**Round 13 — reconciliation, after build run D.** Four items, no new rules and no weakened ones; the full disposition is §I.1. **(1)** §B.8 and §B.10 disagreed below 768 and §B.8 was wrong: the three proof figures **stack** rather than set three across, and §B.10's claim that Tanya's `Owns` line was covered "by being full width" is deleted — the gates block sets **one gate per line below 1024**. Between them those close all seven of `qa:plate`'s sub-768 collisions by composition, with no exemption and no region leaving the plate's wrapper. **(2)** §G.3a's tick aligns to the **platform label's baseline**, because a tick attaches a layer to the core by its name and not by a card. **(3)** §C.8 records the selected fill at **2.36 : 1 light / 2.61 : 1 dark** and hands the state to the 1px `--chalk` edge; the unreachable 30%-pixel-share test is replaced by a channel-delta test on that edge. **(4)** §C.4's 6% warm offset is **deleted** — four fills is the line.

Scope of this document: art direction, three token systems, layout, hierarchy, responsive behaviour, the studio floor composition, the work-card treatment, the build-stage indicator, motion spec. No application code. No user-facing copy — drafted copy from §7 is quoted only to size the boxes, and copy that does not exist yet is marked `[COPY NEEDED]`. Facts that do not exist in §5 are marked `[BLOCKED]` and never guessed.

Contrast arithmetic is done, not estimated. Method is printed in §B.2 so anyone can re-run it.

---

## A. Reference study (§5.6)

Five URLs were fetched, then a second targeted round. Two returned usable design content. Two returned a directory listing rather than the portfolio. One returned nothing.

**Round 3 note.** Item 55's answer says the Orchestrator opened the three unreachable references in Chrome and left plain descriptions at `docs/scratch/references.md`. **That file does not exist** as of this pass, so nothing in §A.1–§A.3 has been rewritten and the direction still stands on the two references that resolved (§A.4, §A.5), exactly as Pass 1 said it would. This is recorded rather than quietly skipped: if the notes arrive, §A.1–§A.3 get redone and §A.6 gets re-checked against them.

### A.1 `dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations` — **not seen**

Two fetch attempts returned no page content. I have not seen this shot and will not describe it. If the Orchestrator can supply a screenshot or an accessible mirror, this section gets rewritten; until then it contributes nothing to the direction.

### A.2 `wallofportfolios.in/portfolios/diodona-maenggartama/` — **directory page, not the portfolio**

What loaded is Wall of Portfolios' own profile card for the designer: name, "Multidisciplinary" role line, company affiliation, a silver achievement badge, message/bookmark/profile actions, and the platform's exclusivity line about how few portfolios get listed. A second fetch asking specifically for outbound links to the designer's own site reported that the page contains none. So I saw the directory's chrome, not Diodona Maenggartama's work.

**Mechanism visible in what I did see** (the directory, not the portfolio): hierarchy is built almost entirely by size jump plus whitespace — one large name, one small role line, then icon-and-label pairs on a strict repeating spacing interval. No rules, no cards-within-cards, no accent colour doing hierarchy work. The expensive feeling comes from a very small number of type sizes reused with discipline.

**Take:** the discipline of few type sizes, hierarchy carried by size jump and vertical space rather than by decoration. **Leave:** everything else, because I did not see the actual work. **Gap to close:** the designer's real portfolio URL.

### A.3 `wallofportfolios.in/portfolios/geonwoo-john-yang/` — **directory page, not the portfolio**

Same situation. Large name, "Multidisciplinary Designer" line, a portrait given room, consistent icon spacing, neutral white/grey field, the same platform badge and exclusivity messaging. Second fetch confirmed no outbound link to his own site.

**Mechanism visible:** the portrait is the only saturated thing on the page, and it is surrounded by more space than it needs. Restraint here is not "less content", it is "one thing allowed to be loud".

**Take:** exactly that — one element per view is permitted to be loud, and it earns it by having empty space around it, not by being large. That principle drives the empty chair's staging in §C. **Leave:** the profile-card layout itself, which is a directory pattern and has nothing to do with a studio site.

### A.4 `abhaysingh.in` — **seen, and the most useful of the five**

Section order: positioning statement → featured case studies → a philosophy line → additional project previews → contact. The H1 is a claim about what he does for clients ("Design rescue for noteworthy brands"), not a name and not a job title. Each featured project is a compact unit: project name, one line of context, then three quantified results printed as short label/value pairs — a duration, a revenue movement, an audience movement. Body copy is minimal. The philosophy section is a single line. Footer is one line.

**Mechanisms that make it read expensive:**

1. **The numbers carry the hierarchy, not the type scale.** `5 years`, `0 → ₹40m`, `100k ↑` are doing the persuading. The prose around them is deliberately small and short. There is no third type size fighting the first two.
2. **Every project is the same shape.** Name, context, three metrics. Because the shape repeats exactly, the eye stops parsing layout after the first one and starts comparing values. That is a scanning affordance, not decoration.
3. **Credibility before work.** The positioning claim is above the case studies. The visitor is told what the site is arguing before being shown evidence for it.
4. **Withheld:** no logo wall, no testimonial carousel, no process diagram, no "my skills". The page is short because the evidence is dense.

**Take:** all four. This is the closest reference to what §3 needs. Specifically: (a) the H1 is a claim, which validates hero variant A over C; (b) the metric-as-hierarchy move becomes design principle 2 and directly justifies §6.1's decision to put dates in the price position on the work cards; (c) the repeating-unit-so-you-compare-values move becomes the work-card grid and the two-product build-stage view; (d) credibility-before-work becomes the home section order.

**Leave:** the arrow glyphs used as affordances (`See ↓`, `→`). §9.4 explicitly bans `→` appended to link text, and the arrows on this site would be the generic-template tell that everything else avoids. Also leave the "additional projects" tail — we have two products, not seven, and a thin tail would advertise thinness.

### A.5 `amix-design.com/tl/web-g-threejs/` — **seen; useful as a counter-example**

A vertical gallery of six browser-based 3D games, each entry a consistent card unit, on a dark neutral field so the screenshots carry all the colour. Japanese headline with an English subtitle beneath. The page states that the page itself is rendered with Three.js r185.

**Mechanism:** the atmosphere comes from the ground being dark and unsaturated so that a small number of bright things read as lit. Also: the curated set is six items, not sixty, and the technical flex is stated in one line of body copy rather than performed in chrome.

**Take, and only this:** the dark unsaturated ground as a way to make a small amount of light read as atmosphere. That is the entire mechanism behind the studio floor being a full-bleed ink band with one lamp in it — a lit room, not a glowing page. And the "state the flex in one line, don't perform it" discipline, which is the tone §3 asks for.

**Leave:** the stack. §6 already rules out WebGL and the Engineer restates it (PLAN.md §10.3). §6 calls this site "the ambition ceiling for atmosphere, not a stack recommendation" and that is exactly how it is used here — the ambition is borrowed at 1/50th the weight, in SVG, with real DOM nodes and real focus rings, which WebGL cannot give.

### A.6 What the study changed

Nothing in the direction came from a surface. Three things came from mechanism:

- Numbers, not adjectives, carry hierarchy (A.4). → principle 2, work-card date treatment, the stage view.
- One thing per view is loud, and it earns it with surrounding emptiness (A.3). → the empty chair's staging.
- A dark unsaturated ground makes small light read as atmosphere (A.5). → the floor is a full-bleed ink band, not a page-coloured diagram.

---

## B. Studio world — home, `/work/*`, `/contact/`, `/404`

### B.1 The idea in one line

**The room is lit; the page is printed.** There is exactly one room on this site — the studio floor — and it obeys a single light source from the upper left. Everything outside the room is a printed sheet: flat, quiet, no shadows, no glow. The acrylic work cards are the hinge between the two, because they are printed things that sit in a lit room, which is why they get an edge highlight and a contact shadow and nothing else does.

This is the mechanism that lets §9.4's "spend boldness in one place" be a rule you can actually apply: if an element needs light to be understood and it is not in the room, the element is wrong.

### B.2 Tokens

**Round 4: item 49 is reversed. Every page ships a dark scheme, and every page carries a manual light/dark toggle** (QUESTIONS.md item 49, answered 2026-09-05). So each world now has two schemes, not one: the studio is light-by-default with two inverted regions **and** a dark counterpart (§B.2a); Sahib's world is dark-by-default with a light counterpart (§F.4a); Tanya's is light-by-default with a dark counterpart (§G.1a). Six palettes, all computed, all AA. The section below is the **light** studio scheme and is unchanged from round 3 — every number in it still holds.

**How the two schemes are scoped** (PLAN.md §1.2). The world is a `data-world` attribute on a wrapper per route; the scheme is a `data-theme` attribute on the root element. Every dark token below **keeps the name of its light twin** and only changes value, so the Engineer writes exactly one block per world:

```
[data-world="studio"] { … light values … }
[data-world="studio"][data-theme="dark"] { … dark values … }
```

Three names are theme-invariant across the whole site and are declared once: `--chalk`, `--lamp`, and the two card inks defined below. One new alias absorbs the single role that genuinely inverts:

| Alias | Light value | Dark value | Why it exists |
|---|---|---|---|
| `--ink` | `--floor` | `--chalk` | Primary text **on the page**. In the light studio `--floor` does two jobs (room ground and page text); in the dark studio it cannot, because the page is dark. `--ink` is the one indirection that lets every component keep one declaration. Text **inside the room** stays `--chalk` in both schemes and needs no alias. |
| `--card-ink` / `--card-ink-2` | `#0F2A2E` / `#4E6468` | same | The work card is a printed white object sitting in whatever light the page has. **Print does not invert**, so its two inks never change with the theme — in any world, in either scheme. This is already how §F.6 treats the cards on Sahib's dark ground; round 4 only gives it a name. |

Six named values. Contrast computed per WCAG 2.x: channel `c` in sRGB 0–1, linearised as `c/12.92` when `c ≤ 0.03928` else `((c+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`; ratio `= (L_light + 0.05) / (L_dark + 0.05)`.

| Token | Hex | Relative luminance L | Role |
|---|---|---|---|
| `--floor` | `#0F2A2E` | 0.019547 | Deep petrol. The room's ground **and** all primary text on light surfaces. One value doing two jobs is what ties the printed page to the room. |
| `--sheet` | `#F1F3F0` | 0.890932 | The page. Cool off-white with a faint green cast so it reads as device-UI neutral, not editorial cream (§9.4). |
| `--band` | `#E2E6E1` | 0.781986 | Section alternation, and the only permitted backdrop behind a work card. |
| `--muted` | `#4E6468` | 0.117335 | Secondary text on light surfaces only. Never used on `--floor`. |
| `--chalk` | `#E8EDE9` | 0.836074 | Text and marks on `--floor`. |
| `--lamp` | `#F2A93B` | 0.475689 | The one signal. Used in exactly three places: the empty chair's light, the inner half of every focus ring, and the persistent contact plate. |

Two derived values, printed because they carry text:

| Derived | Composite | L | Where |
|---|---|---|---|
| `--chalk` at 72% over `--floor` | `#ABB6B5` | 0.454500 | Secondary text inside the room. |
| White at 82% over `--band` | `#FAFBFA` | 0.962205 | The worst-case work-card surface. See §D.6. |

**Every text-on-background pair in use:**

| Foreground | Background | Ratio | AA body (4.5) | AA large (3.0) |
|---|---|---|---|---|
| `--floor` `#0F2A2E` | `--sheet` `#F1F3F0` | **13.53 : 1** | pass | pass |
| `--floor` | `--band` `#E2E6E1` | **11.96 : 1** | pass | pass |
| `--floor` | card surface `#FAFBFA` | **14.55 : 1** | pass | pass |
| `--muted` `#4E6468` | `--sheet` | **5.62 : 1** | pass | pass |
| `--muted` | `--band` | **4.97 : 1** | pass | pass |
| `--muted` | card surface `#FAFBFA` | **6.05 : 1** | pass | pass |
| `--chalk` `#E8EDE9` | `--floor` | **12.74 : 1** | pass | pass |
| `--chalk` @72% `#ABB6B5` | `--floor` | **7.25 : 1** | pass | pass |
| `--lamp` `#F2A93B` | `--floor` | **7.56 : 1** | pass | pass |
| `--floor` | `--lamp` (contact plate, ink on amber) | **7.56 : 1** | pass | pass |

**One failure, and the rule that follows from it:**

`--lamp` on `--sheet` is **1.79 : 1**. It fails everything. Therefore:

> **Lamp rule.** `--lamp` may be a *fill* on a light surface but never a *mark* and never *text* on one, and any lamp fill on a light surface carries a 2px `--floor` border so its boundary has 13.53 : 1. On `--floor` it is unrestricted, including as text.

This is why the build-stage indicator (§E) carries its three states on shape, size and stroke pattern rather than on colour — which §6.2 requires anyway.

**Focus ring** (WCAG 2.2 SC 1.4.11 needs 3 : 1 against adjacent colour): a two-tone ring, 3px outer + 2px inner, 3px offset. The outer is the maximum-contrast neutral for the surface it lands on — `--floor` on light (13.53 : 1), `--chalk` on the room (12.74 : 1). The inner is always `--lamp`, so focus has one identity everywhere while the outer ring is what carries the contrast. `outline: none` is never used without this replacement.

Borders are derived at alpha rather than tokenised: card edge highlight `rgba(255,255,255,.72)` top/left and `rgba(15,42,46,.14)` bottom/right; hairlines inside a card `rgba(15,42,46,.12)`. These are decorative separators, not information carriers, so they are not held to 3 : 1. Structural separation between sections is done with fill changes (`--sheet` ↔ `--band` ↔ `--floor`) and space, never with rules — §9.4 bans broadsheet hairlines and this removes the temptation entirely.

### B.2a Dark scheme — studio

Same method as §B.2, re-run. Nothing here is estimated.

**The idea survives, and it survives by staying literal.** §B.1 says *the room is lit; the page is printed*. A dark page does not make the room disappear — it makes the room a **darker** region inside a dark page, which is exactly what a real unlit floor looks like next to a dim printed sheet. So the dark scheme keeps the same three facts and changes only the values:

1. **The floor is still the darkest thing on the site, and it is still the only lit region.** `--floor` goes *deeper* in dark (`#07181B`, L 0.007776) rather than staying where it was, so the room does not get overtaken by the page. It is the only region carrying lit surfaces (desk tops at `--chalk` 22%, the lamp cone), and in dark those lit surfaces read *more* strongly, not less, because the surrounding page is no longer bright.
2. **The dark sheet is a step lighter than the floor and stays flat.** `--sheet` `#18292D` is one step above the floor; **floor-to-sheet is 1.21 : 1**. No shadow, no glow, no elevation anywhere on it — flatness, not brightness, is what makes it "printed", and flatness survives the theme intact.
3. **The alternation band moves the other way.** In light, `--band` is a step *darker* than `--sheet`; in dark it is a step *lighter* (`#213539`, **1.17 : 1** above the sheet). The rule is: *the band steps away from the floor, never toward it*, so the floor stays the darkest fill on the page in both schemes and section alternation never gets confused with entering the room.

Those two steps (1.21 and 1.17) are small by construction — every step between two dark values is. They are both **larger than the 1.16 : 1 panel-to-ground step already accepted on Sahib's page** (§F.4), and they carry the same reinforcement: a 1px inset `rgba(232,237,233,.14)` top edge on the floor band and on the work-card stand's band, plus space. Region separation in dark is edge-plus-content, not fill contrast, and it is stated here rather than discovered at build time.

| Token | Light value | **Dark value** | Relative luminance L (dark) | Role in dark |
|---|---|---|---|---|
| `--floor` | `#0F2A2E` | **`#07181B`** | 0.007776 | The room's ground only. It no longer doubles as page text — `--ink` does that job (§B.2). |
| `--sheet` | `#F1F3F0` | **`#18292D`** | 0.019695 | The page. One step above the floor, flat. |
| `--band` | `#E2E6E1` | **`#213539`** | 0.031649 | Section alternation, and still the only permitted backdrop behind a work card. Steps *away* from the floor. |
| `--muted` | `#4E6468` | **`#93A6A8`** | 0.363026 | Secondary text on the page. Never used on `--floor`, exactly as in light. |
| `--chalk` | `#E8EDE9` | **`#E8EDE9`** | 0.836074 | Unchanged. Text and marks in the room, **and** primary text on the page via `--ink`. |
| `--lamp` | `#F2A93B` | **`#F2A93B`** | 0.475689 | Unchanged. The one signal does not change colour when the room does. |

Two derived values, printed because they carry text:

| Derived | Composite | L | Where |
|---|---|---|---|
| `--chalk` at 72% over dark `--floor` | `#A9B1AF` | 0.431294 | Secondary text inside the room. (Light twin: `#ABB6B5`.) |
| White at 90% over dark `--sheet` | `#E8EAEA` | 0.816977 | The worst-case work-card surface in dark. See below. |

**Every text-on-background pair in use, dark studio:**

| Foreground | Background | Ratio | AA body (4.5) | AA large (3.0) |
|---|---|---|---|---|
| `--ink` = `--chalk` `#E8EDE9` | `--sheet` `#18292D` | **12.71 : 1** | pass | pass |
| `--ink` | `--band` `#213539` | **10.85 : 1** | pass | pass |
| `--muted` `#93A6A8` | `--sheet` | **5.93 : 1** | pass | pass |
| `--muted` | `--band` | **5.06 : 1** | pass | pass |
| `--chalk` | `--floor` `#07181B` | **15.34 : 1** | pass | pass |
| `--chalk` @72% `#A9B1AF` | `--floor` | **8.33 : 1** | pass | pass |
| `--lamp` `#F2A93B` | `--floor` | **9.10 : 1** | pass | pass |
| `--lamp` | `--sheet` | **7.54 : 1** | pass | pass |
| `--lamp` | `--band` | **6.44 : 1** | pass | pass |
| `--card-ink` `#0F2A2E` | card surface `#E8EAEA` | **12.47 : 1** | pass | pass |
| `--card-ink-2` `#4E6468` | card surface `#E8EAEA` | **5.18 : 1** | pass | pass |
| `--floor` `#07181B` | `--chalk` (primary CTA, inverted) | **15.34 : 1** | pass | pass |
| `--floor` | `--lamp` (contact plate, ink on amber) | **9.10 : 1** | pass | pass |

Every pair is at least as strong as its light twin except `--muted`, which is deliberately set to sit within 0.1 of its light twin's ratios (5.93 / 5.06 dark against 5.62 / 4.97 light) so secondary text has the same *voice* in both schemes rather than being quietly louder in one.

**The lamp rule, re-derived — and it inverts.**

> **Lamp rule, dark.** On the dark sheet `--lamp` is **7.54 : 1** and on the dark band **6.44 : 1**. So in the dark studio `--lamp` **may be text and may be a mark**, on the page as well as in the room, with no border and no size restriction. The light-scheme restriction — fill only, never mark, never text, and any lamp fill on a light surface carries a 2px `--floor` border for a 13.53 : 1 boundary — applies to the **light** scheme only, and it applies there because the ground is light, not because the token is amber.

The rule is therefore restated as a property of the ground, not of the theme name: **`--lamp` is text-legal on any ground darker than L ≈ 0.09 and fill-only above it.** That is one sentence the Engineer can hold in both schemes and in all three worlds, and it is what makes §F.4a's light Sahib page fall out of the same rule rather than needing a new one.

**What the inverted rule does *not* license.** `--lamp` still appears in exactly three places (the empty chair's light, the inner half of every focus ring, the persistent contact plate). Being *permitted* as text in dark is not permission to use it as one — §B.6 principle 4 and §9.4's one-accent-word ban are unchanged, and a headline with one amber word remains banned in both schemes. The only thing that changes is that the dark scheme no longer needs the 2px border to make the contact plate's boundary legal.

**Work cards on the dark studio page — the 90% rule, computed.** §F.6 sets card fill at 82% white on light grounds and 90% on dark. The dark studio is a dark ground, so it takes 90%, and the worst case is the **darker** of the two permitted backdrops, which in dark is `--sheet` (the band steps lighter):

**Worst-case composite:** white at 90% over `#18292D`
`R = 0.90(255) + 0.10(24) = 231.9` · `G = 0.90(255) + 0.10(41) = 233.6` · `B = 0.90(255) + 0.10(45) = 234.0`
→ effective card surface **`#E8EAEA`**, L = **0.816977**

| Card text | Ratio on `#E8EAEA` | AA body |
|---|---|---|
| `--card-ink` `#0F2A2E` (company, dates, role) | **12.47 : 1** | pass |
| `--card-ink-2` `#4E6468` (one-liner, products, stack) | **5.18 : 1** | pass |

At 82% the same surface would be `#D5D8D9` and `--card-ink-2` reads **4.40 : 1** — a fail. So the 90% figure is re-derived here independently of §F.6 and lands in the same place, which is the check worth having. Over `--band` (`#213539`) the composite is `#E9EBEB` and the two ratios are 12.60 and 5.24, both better, confirming `--sheet` as the worst case.

**Three card details that do change in dark**, because a dark ground eats a dark shadow:

- **Contact shadow** `0 2px 3px -1px rgba(0,0,0,.55)` and **ambient** `0 10px 24px -12px rgba(0,0,0,.34)`. Same two-shadow ratio as §D.2, re-based on black rather than on `--floor`, because `rgba(15,42,46,.38)` over `#18292D` is invisible.
- **Stand** takes the dark `--band` value; its lowest 1px goes to `rgba(0,0,0,.45)`.
- **Edge highlight** is unchanged: `inset 1px 1px 0 rgba(255,255,255,.72)` top/left, `inset -1px -1px 0 rgba(15,42,46,.14)` bottom/right. The card is a white object and the light still comes from upper left, so its cut edge behaves identically. Radius stays 3px, tilt stays §D.4's.

**Focus ring, dark.** Same construction as §B.2 — 3px outer + 2px inner, 3px offset, 4px radius — with the outer recomputed as the maximum-contrast neutral for the surface it lands on:

| Surface | Outer ring | Ratio against surface |
|---|---|---|
| `--sheet` `#18292D` | `--chalk` | **12.71 : 1** |
| `--band` `#213539` | `--chalk` | **10.85 : 1** |
| `--floor` `#07181B` (the room) | `--chalk` | **15.34 : 1** |
| work-card surface `#E8EAEA` | `--card-ink` `#0F2A2E` | **12.47 : 1** |

The inner is always `--lamp`, unchanged, so focus keeps one identity across both schemes and all three worlds. On the card surface the outer flips to ink for the same reason the card's text does: the card is a light object in either scheme.

**Buttons, dark.** The hero's primary CTA inverts: `--chalk` fill with `--floor` text, **15.34 : 1** (light twin: `--floor` fill, `--chalk` text, 12.74 : 1). The secondary keeps its outline treatment with the outline and label both at `--ink` — 1.5px `--chalk`, **12.71 : 1** on the sheet. Neither changes size, radius or position, so no wireframe in §B.8 or §B.9 moves.

**The contact plate, dark** (§B.10). Fill stays `--lamp`; text is the theme's `--floor`, so **9.10 : 1** in dark against 7.56 : 1 in light. The plate's *boundary* is where the schemes differ: in light the amber-on-sheet edge is 1.79 : 1 and the 2px `--floor` border is what makes it 13.53 : 1, while in dark the fill itself carries **7.54 : 1** against the sheet and the border is no longer load-bearing. **The border stays anyway**, at the dark `--floor` value, because dropping it would change the plate's box model and §B.10's "one component, one size, every page, every breakpoint" line is worth more than 2px. In dark it reads as a keyline; against the amber it is 9.10 : 1.

**Section fill order is unchanged** — sheet, floor, band, sheet, band, sheet, floor. The dark scheme swaps values, never the order, so the page's rhythm is identical in both and §B.9's seven-families argument is untouched.

**OG images and `theme-color`, ruled** (round 4's §I item 4; PLAN.md §1.7). Every OG card, on every page, is built from the **light** studio tokens only — one set, no dark variant: a scraper has no theme, the card is the same argument print makes (§D.8), and the floor composition still reads inside a light card because it is the darkest region in either scheme. `theme-color` ships as two `<meta>` entries keyed to `prefers-color-scheme`, which is emitted per scheme and therefore follows the *system* setting rather than a visitor's stored override from the §B.10a toggle — a browser-chrome colour that can disagree with the page for an overriding visitor, accepted here deliberately rather than discovered later, because the alternative is scripting the meta tag at runtime for two hairlines of chrome.

### B.3 Typeface roles

Two families. The Engineer's ceiling is two (PLAN.md §10.5) and I am not spending the third.

| Role | Face | Why |
|---|---|---|
| **Display** — h1, section heads, company names, dates | **Anek Latin** (SIL OFL, variable: `wght` 100–800, `wdth` 75–125, by Ek Type). Self-hosted, subset, from the foundry's variable release via Fontsource. | It is not Inter, not Space Grotesk, not a serif, not the tech-default. It is drawn by an Indian foundry for a multi-script superfamily, and the studio ships a Hindi UI in its second product — so if a Devanagari string ever has to appear, **Anek Devanagari** is the same skeleton rather than a mismatched second decision. The `wdth` axis is what lets one file cover a 60px hero and a condensed tabular date without a second family. |
| **Body** — all prose, card small print, labels | **Instrument Sans** (SIL OFL, variable `wght` 400–700). | A grotesque with slightly warm terminals that stays neutral at 16px and does not read as a system font. Reads as "written by a person", which is the tone §3 asks for, without any editorial affectation. |
| **Numerals / data** — dates, ratings, install counts, stage positions | **Anek Latin at `wdth` 87.5, `wght` 500, `font-variant-numeric: tabular-nums`, tracking 0.** Not a third family. | Dates and counts are the persuasion (A.4, principle 2). Condensing them gives them a distinct "ticket" quality and lets columns of them align, without a monospace face — which §9.4 bans as a label default and which would drag the developer-portfolio costume in with it. |

**Justification against §9.4:** no serif display; no monospace-for-every-label; no cream+serif+terracotta; no tracked-out all-caps eyebrows anywhere (there are no eyebrows in this system at all — sections are separated by fill and space, and a section head is a plain sentence-case display line); no one-word colour accent in a headline (`--lamp` cannot be text on light surfaces, which makes that mistake impossible by construction).

**Fallback if `tabular-nums` is unavailable in the shipped Anek Latin build:** add **Spline Sans Mono** (OFL, variable) *for numerals only*, ~25 KB subset, and tell the Perf Auditor. This is the only circumstance in which a third face is permitted.

### B.4 Type scale

Two sizes do the work; everything between them is weight and width, not size. That is the mechanism from A.4.

| Step | 360 | 1440 | Line height | Face / axis |
|---|---|---|---|---|
| display-hero | 38px | 60px `clamp(2.375rem, 4.6vw, 3.75rem)` | 1.04 | Anek 600 / `wdth` 100, tracking −0.015em |
| display-section | 27px | 40px `clamp(1.6875rem, 2.8vw, 2.5rem)` | 1.10 | Anek 600 |
| numeral-large | 24px | 28px | 1.0 | Anek 500 / `wdth` 87.5, tnum |
| title | 20px | 22px | 1.2 | Anek 600 |
| body | 16px | 17px | 1.62 | Instrument 400 |
| small | 14px | 14px | 1.5 | Instrument 400/600 |
| micro | 13px | 13px | 1.45 | Instrument 500 |

Measure: display ≤ 28ch, body ≤ 62ch. The h1 must set as two sentences on two lines at ≥ 1024 and may run to three at 360; it may not run to four.

### B.5 Grid and rhythm

8px base grid; type set on a 4px sub-grid.

| Breakpoint | Cols | Outer | Gutter | Content | Column |
|---|---|---|---|---|---|
| 360 | 4 | 20 | 16 | 320 | 68 |
| 768 | 8 | 32 | 20 | 704 | 70.5 |
| 1024 | 12 | 48 | 24 | 928 | 55.3 |
| 1440 | 12 | 60 | 24 | 1200 | 78 |

Page max-width 1320 (content 1200); it stops growing there. Section vertical padding: 72 / 96 / 128 / 160 by breakpoint. Spacing scale 4-8-12-16-24-32-48-64-96-128-160; nothing else.

The floor section and the final CTA section are the only two full-bleed regions; they break the container to the viewport edge. Everything else stays in the grid.

**One grid, every section, no exceptions.** Every section on every page is laid out on the table above and on nothing else. No section carries an extra `padding-right`, a reserved right band or a keep-out lane, and there is never more than one content width or one column width on a page at a time. The persistent plate (§B.10) is kept clear by a composition rule about where marks go, never by taking width away from the grid — a page whose right edge steps in and out down its own length has two grids, and §B.5 gives one.

**The split forms engage at 1024.** The twelve-column grid arrives at 1024, and so does every two-column arrangement in this document: the gates' anchored closing line (cols 9–12) and §C.6's side-by-side card slot (cols 9–12). **1024, not 1440.** Below 1024 they stack in DOM order — gates then closing line, scene then card panel. Nothing in this document holds a split back to 1440 for the sake of caution, and any wording that appears to is stale.

**Two arrangements do not split at 1024, and round 12 gives them a rule rather than an exception.** §B.9's proof band and §G.3's three-field core band are both a two-column arrangement whose second column is **a diagram with a fixed minimum extent** — a five-node track at §B.10's 100px pitch, a core field at §B.4's measure. A split that does not fit such a diagram does not degrade gracefully; it either crushes the diagram or crushes the prose beside it, and round 11 chose a third thing that was worse than both.

> **Ruled, round 12, arbitrated by the Orchestrator against the rendered run-B pages. "The split forms engage at 1024" holds for §C.6's card slot and for the gates' anchored closing line. It does *not* hold for a two-column arrangement whose second column is a diagram with a fixed minimum extent. Those arrangements engage where their diagram fits, and below that width they are one grid, two rows — never a stack in one half of the page, and never a second content width.**

The instrument is one grid and two rows, both rows on §B.5's table: row 1 carries the prose and whatever the prose owns; row 2 carries the diagram at the width the diagram needs. Nothing is narrowed, nothing is indented, no section carries a `padding-right`, and the void §B.9 permits exactly once is still spent exactly once. **Round 11's "stacks 768–1439, splits at 1440" is withdrawn** — the rendered evidence is `home-proof-1024-light.png`, where the stack put two content widths in one block and left the right 46% of a 918px section empty from top edge to bottom edge, which is the shape run A item 5 was written about. Rendered evidence outranks arithmetic alone. §B.9 and §E.3 carry the coordinates; §G.3 carries Tanya's.

### B.6 Design principles

Five, each specific to this brief. Generic ones are not here on purpose.

1. **The room is lit; the page is printed.** One light source, upper left, governs the floor's shading, the acrylic cards' edge highlights and their contact shadows. Nothing outside the room gets a shadow. If an element needs elevation to be understood and it is not in the room, redesign the element.

2. **A claim gets a number or it gets cut.** 4.3 stars, 24 reviews, 1K+ installs, five stages, four gates, four stacks, seven years, two people. Numerals are the second-loudest type on this site after the display and they are tabular so columns of them compare. Adjectives get body size. This is why the dates take the price position on a shelf-talker (§6.1) and why the two-product stage view is the centrepiece of the proof section rather than a paragraph.

3. **Nothing important is behind a hover.** Every state a pointer can reach is reachable by tap and by keyboard, produces the identical result, and produces it in the identical place on screen. This is why the floor's interaction card lives in a fixed slot rather than following the cursor, and it is a design constraint before it is an accessibility one — most of the traffic is Android on mobile data (§4).

4. **Stillness is the accent.** In a room where every station idles, the one that does not move is where the eye lands. Generalised: the current build stage is the only node with two concentric parts; the 2025 column is the only lit column on Sahib's map; the shared core is the only marked column on Tanya's. The site never has two loud things at once, and the loud thing is usually the quiet one.

5. **The Play Store is the vernacular, not "studio" abstraction.** Ratings, install counts, "last updated", stage tracks, portrait screens, 44px targets, a real store link. Where a design-industry convention and a store convention disagree, take the store convention — the people being sold to open apps, not agency sites. Concretely this rules out: a case-study hero image with a floating browser chrome; a "selected work 01/02" index; a process diagram with abstract shapes.

### B.7 Hero variant: **A**

> **AI writes a lot of our code. It doesn't get the last word.**

Conversion is job one (§2, §8), and A is the only variant whose headline contains the actual differentiator — B states the outcome without the mechanism, and C makes a stranger scroll before learning anything, which is a luxury a two-person studio's first impression cannot afford. A also gives the page its two-CTA structure honestly: "Start a project" is the conversion, and "Look around the floor" is the only in-page link that hands the visitor to the one bold moment, which means the floor is entered deliberately rather than encountered.

Copy constraint back to the Copywriter: A's drafted subhead is 33 words and sets to five lines at 360, which pushes the primary CTA below the fold on a 640-tall viewport. **The subhead needs to fit ≤ 3 lines at 360 (≈ 26 words at this measure).** Not rewriting it here — that is not my remit.

### B.8 Home page, 360

Content 320, margins 20. Sections in §7 order.

```
┌────────────────────────────────────────┐ 360
│ 20│                                 │20 │
│   thegeekdogs                          │  48  header row 1. THE WORDMARK IS
│                                        │      THE DISPLAY NAME (item 48): no
│                                        │      logo exists and none is drawn.
│                                        │      Anek 600, links home. not sticky.
│   Work    Sahib    Tanya    Contact    │  44  header row 2. THE NAV. the same
│   ────────────────────────────────────  │      four items as 1440, COPY.md §1
│                                        │      labels. small 14px --floor,
│                                        │      44px tall targets, 24px apart,
│                                        │      236 of the 320 used. no
│                                        │      hamburger, no disclosure.
│                                        │  72  --sheet
│   AI writes a lot of                   │      h1, Anek 600, 38/1.04, --floor
│   our code. It doesn't                 │      3 lines max at 360
│   get the last word.                   │
│                                        │  24
│   TheGeekDogs is a two-person studio   │      body 16/26, --muted, 62ch cap
│   running an agent fleet on every      │      [COPY: fit 3 lines / ~26 words]
│   build, with human review before      │
│   anything reaches you.                │
│                                        │  32
│   ┌──────────────────────────────────┐ │      primary: --floor fill,
│   │        Start a project           │ │  48  --chalk text, 12.74:1
│   └──────────────────────────────────┘ │
│   ┌──────────────────────────────────┐ │      secondary: 1.5px --floor
│   │     Look around the floor        │ │  48  outline, --floor text
│   └──────────────────────────────────┘ │
│                                        │  72
╞════════════════════════════════════════╡      FULL BLEED. --floor ground.
│▓▓▓▓▓▓▓▓▓▓▓▓▓ THE FLOOR ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│      the one bold moment.
│▓                                      ▓│  48
│▓  Two desks have people at            ▓│      display-section 27px --chalk.
│▓  them. The rest are agents.          ▓│      COPY.md §2.2 verbatim. 84 chars
│▓  One chair stays empty on            ▓│      at ~26ch on 320 => FOUR lines.
│▓  purpose.                            ▓│      [COPY NEEDED: <= 12 words. four
│▓                                      ▓│  16   lines is one more than the
│▓  Open any desk to see the job and    ▓│       block should carry]
│▓  the human who checks it.            ▓│      instruction line, COPY.md §2.2.
│▓                                      ▓│      body 16/26 chalk@72%, 2 lines.
│▓  ┌──────────────────────────────┐    ▓│  32
│▓  │ portrait room, 320 x 520     │    ▓│      iso scene. plan and stations
│▓  │ 3 modules wide, 6 deep       │    ▓│      in §C.7. TEN stations. agent
│▓  │ see §C.7 for the plan        │    ▓│      targets 101 x 68, cabins
│▓  │                              │    ▓│      320 x 88, chair 104 x 92.
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  20
│▓  ┌──────────────────────────────┐    ▓│      CARD PANEL. below the scene,
│▓  │ Ship approval                │    ▓│      never over it. min-height
│▓  │                              │    ▓│      320 (§C.6), reserved for the
│▓  │ This chair stays empty. No   │    ▓│      longest card => zero CLS.
│▓  │ agent decides that something │    ▓│      DEFAULT CONTENT = the chair,
│▓  │ is ready for your users. A   │    ▓│      so the argument is on screen
│▓  │ person does, every release.  │    ▓│      before any interaction.
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  40
│▓  The full pipeline                   ▓│      the seven roles as text, in
│▓  Spec Writer, Designer, Programmer,  ▓│      COPY.md §2.4 order. all seven
│▓  Test Engineer, Security Auditor,    ▓│      are now ALSO on the floor
│▓  Reviewer, Release Watcher.          ▓│      (§C.2); this line is the
│▓                                      ▓│      readable, screen-reader-first
│▓                                      ▓│  72  copy of the same list.
╞════════════════════════════════════════╡      small 14px, chalk@72%
│░░░░░░░░░░░░░ --band ░░░░░░░░░░░░░░░░░░░│  72  FULL BLEED. THE COMPRESSED
│░                                      ░│      WORK-CARD STRIP (§6.1, item
│░  Sahib Singh                         ░│      50). sits directly after the
│░                                      ░│  16  floor: the room has just named
│░  ┌──────────────────────────────┐    ░│      two people at two desks, and
│░  │ Keenai Global                │    ░│      this answers who they are.
│░  │ 2025 - now                   │    ░│
│░  └──────────────────────────────┘    ░│      COMPRESSED CARD: TWO fields
│░       ▁▁▁▁▁▁▁▁▁▁                     ░│      only -- company (Anek 600,
│░                                      ░│  28  title) and dates (numeral-
│░  ┌──────────────────────────────┐    ░│      large, price position). role,
│░  │ Motive                       │    ░│      product and stack are DROPPED.
│░  │ 2023 - 2025                  │    ░│      that is the compression, and
│░  └──────────────────────────────┘    ░│      it is what stops the strip
│░       ▁▁▁▁▁▁▁▁▁▁                     ░│      being the person page in
│░                                      ░│  16  miniature. min-height 112 vs
│░  [link to /sahib/]                   ░│      168 for a full card at 360.
│░                                      ░│  40  base, edge and tilt are §D's,
│░  Tanya Jain                          ░│      unchanged -- the object is the
│░                                      ░│  16  same object, with two of its
│░  ┌──────────────────────────────┐    ░│      four levels removed.
│░  │ Motive                       │    ░│
│░  │ 2024 - now                   │    ░│      TWO cards per person at every
│░  └──────────────────────────────┘    ░│      breakpoint. not three at 1440
│░       ▁▁▁▁▁▁▁▁▁▁                     ░│      and two at 360: the strip is
│░                                      ░│  28  one DOM list and its contents
│░  ┌──────────────────────────────┐    ░│      do not change with viewport
│░  │ HSBC                         │    ░│      width (the §C.2 rule).
│░  │ 2021 - 2023                  │    ░│
│░  └──────────────────────────────┘    ░│      tilt continues §D.4's cycle:
│░       ▁▁▁▁▁▁▁▁▁▁                     ░│      -1.4, +0.8, -2.1, +1.7.
│░                                      ░│  16
│░  [link to /tanya/]                   ░│      small 14px --floor
│░                                      ░│  72  [COPY NEEDED: the strip's two
╞════════════════════════════════════════╡       link labels, <= 5 words each]
│                                        │  72  --sheet
│   Four things we don't hand            │      display-section
│   to an agent.                         │
│                                        │  40
│ 01  Architecture review.               │      the ONLY numbered sequence on
│     Sahib decides the shape before a   │      the site. §9.4 permits it: the
│     line is written...                 │      gates are genuinely ordered.
│                                        │      numeral hung in the 20px
│ 02  Code review.                       │      margin at 360; title Anek 600
│     Every change is read by a person   │      20px; body 16/26 --muted.
│     before it merges, and both of us   │
│     are on this one...                 │      THE FOUR BODIES ARE COPY.md
│                                        │      §2.6 VERBATIM AND THEY NAME
│ 03  QA on real devices.                │      THEIR OWNERS. the excerpts
│     Tanya runs the build on physical   │      drawn here are wireframe
│     phones, not just an emulator...    │      placeholders and never print.
│                                        │      the slot is unbounded in
│ 04  Security and privacy review.       │      height, so the longer strings
│     Tanya reads what the app collects, │      cost LINES, not layout: at
│     where it goes, what's stored...    │      ~28ch on 320, gate 01 sets to
│                                        │  24  6 lines and 02-04 to 4-5.
│     Design review and the release      │
│     itself stay with Sahib and         │      THE LINE UNDER THE FOUR
│     Tanya...                           │      (COPY.md §2.6). body 16/26
│                                        │      --muted, NO hung numeral --
│                                        │      it is not a fifth gate.
│                                        │  40
│   That's the difference between        │      closing line, display-section
│   generated software and shipped       │      --floor. NOT a card, NOT a
│   software.                            │      pull-quote. Just the line.
│                                        │  72
╞════════════════════════════════════════╡
│░░░░░░░░░░░░░░ --band ░░░░░░░░░░░░░░░░░░│  72  full-bleed band
│░                                      ░│
│░  We run this on our own app first.   ░│      display-section
│░                                      ░│  32
│░  Pocket Manager has been in the      ░│      body --muted
│░  Play Store since 2020, maintained   ░│
│░  by the same pipeline...             ░│
│░                                      ░│  16
│░  4.3★      rating                    ░│      THE THREE FIGURES STACK
│░                                      ░│  16  BELOW 768 (round 13, and the
│░  24        reviews                   ░│      arithmetic is in §B.10).
│░                                      ░│  16  numeral-large 24px tabular in
│░  1,000+    downloads                 ░│      a 68px column from x 20; the
│░                                      ░│      micro label from x 104, on
│░                                      ░│      the SAME baseline, so each
│░                                      ░│      row reads "1,000+ downloads".
│░                                      ░│      widest ink ends x 162 -- 70
│░                                      ░│  24  clear of the 128 band at 232.
│░  Open it in the Play Store           ░│      real link, no arrow glyph
│░                                      ░│  40
│░  ┌──────────────────────────────┐    ░│      COMPACT STAGE VIEW (§E.3)
│░  │ Pocket Manager               │    ░│      mobile form: name, 5-node
│░  │ ●─●─●─●─◉        Live        │    ░│      mini track, current stage
│░  ├──────────────────────────────┤    ░│      named as text.
│░  │ [second app]                 │    ░│      product 2 SHIPS (item 9a):
│░  │ ●─●─◉╌○╌○   Final touches    │    ░│      a full name-agnostic page.
│░  └──────────────────────────────┘    ░│
│░                                      ░│  24
│░  A second app is in final touches    ░│      body --muted
│░  behind it...                        ░│
│░                                      ░│  72
╞════════════════════════════════════════╡
│                                        │  72  --sheet. quietest section.
│   You'll be holding something          │      display-section
│   before you're bored of the           │
│   kickoff.                             │
│                                        │  24
│   The first thing we hand over is a    │      body
│   working build you can open on        │
│   your phone.                          │
│                                        │
│   [FILL — timeline, engagement         │      visible TODO per §4. does not
│    model, first conversation]          │      ship; blocks the Copy gate.
│                                        │  72
╞════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓ --floor, FULL BLEED ▓▓▓▓▓▓▓▓▓│  72  bookends the room.
│▓                                      ▓│
│▓  Tell us what you're building.       ▓│      display-section --chalk
│▓                                      ▓│  24
│▓  One email, a real reply from one    ▓│      body chalk@72%
│▓  of us, and a straight answer.       ▓│
│▓                                      ▓│  32
│▓  thegeekdogs@gmail.com               ▓│      numeral-large size, Anek 600,
│▓  ─────────────────────               ▓│      --lamp (7.56:1 on floor, so
│▓                                      ▓│      legal here and ONLY here)
│▓                                      ▓│  72
│▓  Work        Sahib                   ▓│      FOOTER NAV. the four COPY.md §1
│▓  Tanya       Contact                 ▓│      labels repeated 2-up, small
│▓                                      ▓│      14px --chalk, 44px rows. the
│▓                                      ▓│  24  second route to every page.
│▓  Sahib on GitHub                     ▓│      small, chalk@72%
│▓  Tanya on GitHub                     ▓│
│▓                                      ▓│  24
│▓  TheGeekDogs. A two-person mobile    ▓│      micro, chalk@72%. studio line,
│▓  studio.                             ▓│      rights line and the employer
│▓  © 2026 TheGeekDogs                  ▓│      note, stacked on their own
│▓  Company names on this site are the  ▓│      lines. no middle dots anywhere
│▓  founders' employment history...     ▓│      in this block (§9.4).
│▓                                      ▓│  72  RESERVE: +72 bottom padding on
└────────────────────────────────────────┘      every section the plate can
                             ┌────────┐         overlay (56 plate + 16 inset,
                             │ [COPY] │  56     §B.10). that is the WHOLE
                             └────────┘         reservation -- no lane, no
                              ◀─112─▶ 16        padding-right, content stays
                                                the full 320.
    band begins x 232 ───────▲
                                                PERSISTENT CONTACT (§B.10):
                                                112 x 56 BELOW 768, NOT the
                                                260 plate 1440 carries -- one
                                                object, two widths (round 10).
                                                --lamp fill, 2px --floor
                                                border, inset 16px from the
                                                bottom and right of the
                                                VIEWPORT, sticky, released
                                                before the final CTA, and
                                                ABSENT over the floor section
                                                at every width (round 12).
                                                NOT A BAR: 128 of 360, so it
                                                never rules a line across the
                                                page (§9.4). The band it casts
                                                begins at x 232 (100vw - 128)
                                                and BINDS below 768: no load-
                                                bearing mark's right edge may
                                                fall inside it. That is why
                                                the three figures above stack.
```

**The three proof figures stack below 768 — round 13, and it replaces "3 across at 320: 96px each".** That line was written in Pass 1 against a plate whose band began at x 84, and it does not survive the 128px band §B.10 has cast below 768 since round 10: three across at 320 puts the third column at x 244–340, so `1,000+` ends at **x 309** and `downloads` at **~302** against a band beginning at **x 232**. Both are load-bearing by §B.10's own definition — a figure whose last digit is hidden is a different number — and `qa:plate` flags them at 360 and 390. **Narrowing the row is refused on arithmetic:** three columns inside x 20 → 232 is 212px, which at §B.5's 16px gutter gives 60px a column against `1,000+`'s own **65px of ink** at numeral-large 24px Anek 500 `wdth` 87.5, and the only ways to make 60 work are a fourth numeral size (§B.4 gives two sizes and this is not one of them) or an 8px gutter that lands the ink 0.3px inside its column. So the row stacks:

> **Below 768 the proof figures set one per row, three rows: the numeral in a 68px column from x 20, its micro label from x 104 on the same baseline, rows 16px apart.** 68 is §B.5's own 360 column and it is 3px wider than the widest numeral; 104 is col 2's left edge. The widest ink in the block is `downloads` at micro 13px Instrument 500 — ~58px from x 104, ending at **x 162**. That is a constant at every width below 768, against a band that never begins before **x 232**, so the clearance is **70px at 360**, 100 at 390, and it only grows. The cost is **57px of height, once** — three 24px rows and two 16px gaps is 104 against the 46.85 the figure-over-label row measured — and it is paid on the one section where §B.6 principle 2 says the numerals are the argument. It also puts three tabular numerals in a single left column, which is the arrangement `tnum` exists for and which three-across never gave them.

**The work-card strip, specified.** Item 50 says include it, so here is what it is and what it is
not. It is **two rows, one per person, two cards each, two fields per card** — company in the title
position, date range in the price position — plus one link per row to that person's page. Ten
things on screen, not thirty. The compression is subtractive, not stylistic: the card keeps §D's
base, edge, tilt, radius and shadow pair exactly, and simply loses two of §D.5's four levels (role,
and the product/stack small print). A compressed card is 112 tall against a full card's 168 at 360
and 196 at 1024, so the strip costs roughly 60% of what a full card grid would.

Three constraints follow. **(a)** Two cards each at *every* breakpoint — the strip is one DOM list
and its contents do not change with viewport width, which is the same rule §C.2 applies to the desk
roster. **(b)** Sahib's list is truncated (five companies, two shown) and Tanya's is not (three
companies, two shown); the equal treatment is the count, and the truncation is his. §9.3's warning
about padding her row count to match his cuts the other way here and the strip respects it.
**(c)** The strip is the only place on the site where a work card appears without its role and
stack, so the person pages remain the only complete rendering of §D.5. Section ground is `--band`,
which keeps the page's fill alternation intact (sheet, floor, band, sheet, band, sheet, floor) and
satisfies §D.7's controlled-backdrop rule without a new value.

**How the other four pages are reached at 360, and why there is no hamburger.** The nav is a
plain row of four links sitting on its own 44px line directly under the wordmark, and the same
four labels repeat as a 2-up block in the footer. `Work`, `Sahib`, `Tanya` and `Contact` at 14px
measure roughly 236px of the 320px content width including three 24px gaps, so all four fit on one
line with real 44px targets and nothing has to be hidden behind a control. **The light/dark toggle
is the fifth item on that same row** (§B.10a), right-aligned to the content edge: 236 + 44 = 280 of
the 320 available, leaving 40px of clear space between `Contact` and the control. The header height
is unchanged at 92px and the fold arithmetic below is unchanged. That is the whole
argument for this over a disclosure: a hamburger costs a button, a panel, a focus trap, an
`aria-expanded` state and a tap before anyone can see where the site goes — more code and more
interaction than simply printing the four destinations, which is the same trade the floor's fixed
card slot makes in §C.6. It also means the navigation is **one component at every breakpoint**:
the 360 row and the 1440 header carry identical labels in identical order, wrap instead of
collapse, and the footer repeat is the second route to every page from the bottom of every page,
which is what satisfies the §14 QA gate. The header is still not sticky and it still holds no
contact link — the contact action is the persistent plate (§B.10), which is why slot 4 can be
`Contact` rather than `Email us`. Cost to the fold: the header grows 64 → 92px, which puts the
primary CTA's bottom edge at ~464px on a 640-tall viewport. It stays above the fold, so §B.7's
subhead constraint is unchanged.

### B.9 Home page, 1440

Content 1200, 12 cols × 78 + 11 gutters × 24, outer 60. Column ruler shown as `1..12`.

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤

┌──────────────────────────────────────────────────────────────────────────┐
│ thegeekdogs                            Work    Sahib    Tanya    Contact │ 72
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     160  │  --sheet
│ AI writes a lot of our code.                                             │  h1 60/1.04
│ It doesn't get the last word.                        (cols 1-9)          │  2 lines, one
│                                                                          │  sentence each
│ TheGeekDogs is a two-person studio running an                            │  body 17/28
│ agent fleet on every build...          (cols 1-6, 62ch)                   │  --muted
│                                                                          │
│ [ Start a project ]  [ Look around the floor ]     (cols 1-5)            │
│                                                                          │
│                                        cols 8-12 DELIBERATELY EMPTY.     │  the only void
│                                        the void sets up the room that    │  on the page.
│                                        arrives full-bleed next. the two  │  reserved
│                                        AI headshots (item 23, option 2)  │  520 x 420 so
│                                        land here when supplied.          │  filling it
│                                        [PENDING: headshot images]        │  causes no
│                                                                     160  │  reflow.
╞══════════════════════════════════════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ FULL BLEED --floor. THE ROOM. ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ 128
│▓                                                                        ▓│
│▓ Two desks have people at them.                                         ▓│  display-section 40px
│▓ The rest are agents. One chair                    (cols 1-8)           ▓│  --chalk. COPY.md §2.2
│▓ stays empty on purpose.                                                ▓│  verbatim. 3 lines here,
│▓                                                                        ▓│  4 at 360 (§B.8).
│▓ Open any desk to see the job and the human who checks it.              ▓│  instruction, body 17/28
│▓                                        [COPY NEEDED: <=12 words]       ▓│  chalk@72%, 1 line.
│▓                                                                        ▓│
│▓ ┌────────────────────────────────────────┐  ┌───────────────────────┐  ▓│
│▓ │                                        │  │ CARD SLOT             │  ▓│
│▓ │   isometric scene, cols 1-8            │  │ cols 9-12, 384 wide   │  ▓│
│▓ │   856 x 520, 6 wide x 5 deep plan      │  │ vertically centred    │  ▓│
│▓ │   TEN stations, see §C.3               │  │ to the scene          │  ▓│
│▓ │                                        │  │                       │  ▓│
│▓ │   the empty chair sits alone at        │  │ min-height 344px      │  ▓│
│▓ │   near-right, lit, with the whole      │  │ (§C.6), reserved for  │  ▓│
│▓ │   of row 5 empty beside it             │  │ the longest card      │  ▓│
│▓ │                                        │  │                       │  ▓│
│▓ │   the two CABINS hold column A-B,      │  │ default = Ship        │  ▓│
│▓ │   rows 1-4 (§C.4)                      │  │ approval              │  ▓│
│▓ └────────────────────────────────────────┘  └───────────────────────┘  ▓│
│▓                                                                        ▓│
│▓ The full pipeline                                                      ▓│
│▓ Spec Writer, Designer, Programmer, Test Engineer,      (cols 1-8)      ▓│  small, chalk@72%
│▓ Security Auditor, Reviewer, Release Watcher.                           ▓│  [set as a wrapped
│▓                                                                   128  ▓│   sentence, not a
╞══════════════════════════════════════════════════════════════════════════╡   dotted meta strip]
│░░░░░░░░░░░░░░░░░ FULL BLEED --band. THE WORK-CARD STRIP. ░░░░░░░░░ 128 ░░│
│░                                                                        ░│
│░ Sahib Singh  │ ┌───────────────┐  ┌───────────────┐ │                  ░│  row label in
│░ (cols 1-2)   │ │ Keenai Global │  │ Motive        │ │ [link to /sahib/]░│  cols 1-2, Anek
│░ Anek 600 20px│ │ 2025 - now    │  │ 2023 - 2025   │ │  cols 11-12      ░│  600, links to
│░              │ └───────────────┘  └───────────────┘ │                  ░│  the page.
│░              │    ▁▁▁▁▁▁▁▁▁▁        ▁▁▁▁▁▁▁▁▁▁      │                  ░│
│░              │  cols 3-9: 2 x 316 + one 24 gutter   │                  ░│  cards carry TWO
│░                                                                    40  ░│  fields only:
│░ Tanya Jain   │ ┌───────────────┐  ┌───────────────┐ │                  ░│  company (title)
│░ (cols 1-2)   │ │ Motive        │  │ HSBC          │ │ [link to /tanya/]░│  and dates (the
│░              │ │ 2024 - now    │  │ 2021 - 2023   │ │                  ░│  price position).
│░              │ └───────────────┘  └───────────────┘ │                  ░│  min-height 112.
│░              │    ▁▁▁▁▁▁▁▁▁▁        ▁▁▁▁▁▁▁▁▁▁      │                  ░│  row gap 40 so
│░                                                                   128  ░│  the tilts never
╞══════════════════════════════════════════════════════════════════════════╡  read as a pile.
│                                                                     160  │  --sheet
│ 01  Architecture review.                   │  That's the difference      │
│     Sahib decides the shape before a line  │  between generated          │  the closing line
│     is written: what the data looks like,  │  software and shipped       │  is anchored in
│     where the boundaries are, what this    │  software.                  │  cols 9-12 = 384,
│     has to survive in two years.           │                             │  vertically
│                  (cols 2-7 = 588 wide)     │  (cols 9-12,                │  centred to the
│                                            │   display-section)          │  whole group.
│ 02  Code review.                           │                             │  it is not a
│     Every change is read by a person       │                             │  card and not a
│     before it merges, and both of us are   │                             │  pull-quote.
│     on this one.                           │                             │
│                                            │                             │  THE FOUR BODIES
│ 03  QA on real devices.                    │                             │  ARE COPY.md §2.6
│     Tanya runs the build on physical       │                             │  VERBATIM AND THEY
│     phones, not just an emulator.          │                             │  NAME THEIR OWNERS.
│                                            │                             │  what is drawn here
│ 04  Security and privacy review.           │                             │  is a wireframe
│     Tanya reads what the app collects,     │                             │  placeholder and it
│     where it goes, what's stored.          │                             │  never prints.
│                                            │                             │
│     Design review and the release itself   │                             │  THE LINE UNDER THE
│     stay with Sahib and Tanya.             │                             │  FOUR (COPY.md
│                            (cols 2-7)      │                             │  §2.6): body 17/28,
│                                            │                             │  NO hung numeral,
│                                            │                             │  set on the gate
│                                            │                             │  bodies' left edge.
│                                                                     160  │
╞══════════════════════════════════════════════════════════════════════════╡
│░░░░░░░░░░░░░░░░░░░░ FULL BLEED --band ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 128 ░│
│░                                          │                             ░│
│░ We run this on our own app first.        │  Pocket Manager             ░│  the compact
│░                          (cols 1-5)      │  ●───●───●───●───◉          ░│  two-product
│░ Pocket Manager has been in the Play      │  Specced Building Final  ... ░│  stage view.
│░ Store since 2020, maintained by the      │                             ░│  ONE set of
│░ same pipeline and the same review        │  [second app]               ░│  column headers,
│░ gates.                                   │  ●───●───◉╌╌╌○╌╌╌○          ░│  two runners.
│░                                          │                             ░│  band cols 7-12,
│░ 4.3★      24          1K+                │  one shipped, one nearly    ░│  full 1200 width.
│░ rating    reviews     installs           │  there.                     ░│  THE AXIS STOPS
│░                                          │  [COPY NEEDED: <=8 words]   ░│  AT x 1132 (§B.10)
│░ Open it in the Play Store                │                             ░│
│░                                                                    128 ░│
╞══════════════════════════════════════════════════════════════════════════╡
│                                                                     160  │  --sheet
│           You'll be holding something before you're                      │  quietest
│           bored of the kickoff.              (cols 3-10)                 │  section on the
│                                                                          │  site. one
│           The first thing we hand over is a working build you            │  display line,
│           can open on your phone.            (cols 3-9, 62ch)            │  one paragraph,
│                                                                          │  no device, no
│           [FILL — timeline, engagement model]                            │  card, nothing.
│                                                                     160  │
╞══════════════════════════════════════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ FULL BLEED --floor. bookends the room. ▓▓▓▓▓▓▓▓▓▓▓ 128 ▓▓│
│▓                                                                        ▓│
│▓ Tell us what you're building.        (cols 1-6)                        ▓│
│▓                                                                        ▓│
│▓ One email, a real reply from one of us, and a straight                 ▓│
│▓ answer about whether we're the right fit.                              ▓│
│▓                                                                        ▓│
│▓ thegeekdogs@gmail.com     (--lamp, 7.56:1, legal on floor only)        ▓│
│▓                                                        cols 8-12 empty ▓│
│▓ ────────────────────────────────────────────────────────────────       ▓│
│▓ github.com/hellosahib   github.com/Tanya-jain99          (micro)   128 ▓│
└──────────────────────────────────────────────────────────────────────────┘
                              ┌──────────────────────────┐
                              │ thegeekdogs@gmail.com    │  PERSISTENT CONTACT:
                              └──────────────────────────┘  260x56 plate, --lamp
                                            (bottom-right, 16px inset from the
                                             VIEWPORT, released before the
                                             final CTA section)

                              THE SAME PLATE AT EVERY BREAKPOINT, 360 to 1440
                              (§B.10). there is no full-bleed variant at any
                              width. the 276 x 72 corner it claims is kept
                              clear by §B.10's composition rule, NOT by a
                              keep-out lane: every section above keeps the
                              full 1200 content width and §B.5's one grid.
```

**The proof band above is drawn at 1440, and that drawing is unchanged. Round 12 gives it its 1024–1439 form: one grid, two rows.**

Round 11 costed three ways out of the 1024 collision and took the wrong one. The collision is real and its arithmetic still stands: §B.10 fixes the track's pitch at 100px, five nodes at that pitch is a 400px axis plus the last node's 9px ring, and at 1024 col 7's left edge is x 524 against a band beginning at x 748 — 215px of usable axis against the 409 the form needs. Two of round 11's three options remain refused **and are refused permanently, so they stop coming back**:

- **Re-split as cols 1–4 / 5–12, keeping the 100px pitch — refused, twice over.** The axis would start at col 5's left edge, x 365.3, and its last ring would close at **774.2, 26.2px inside the band**, which is the same collision one column further left. And the prose it displaces would be 293.2px wide — 17.2em at 17/28, roughly half of `--measure-body`'s 32em and about 34 characters a line. The section's left column is a paragraph, not a caption; four columns is not a measure.
- **Scale the pitch to fit cols 7–12 — refused.** x 524 to 739 (the band, less the ring) is 215.2px of axis, a **53.8px pitch**. The 85px pitch already refused for `/work/`'s full track at 768–930 (§B.10) is 58% wider than that. The compact view's labels are **not** shorter: its header row carries §E.2's own five strings, which is why §B.10's 1440 note reasons about `Submitted for review` setting in two lines *in this band*. The same reservation, the same objection, and here it fails harder — at 53.8 the word `touches` alone is 53.8px wide at small/14 Instrument 600, so `Final touches` takes three lines and the label row has no gap between neighbours at all.
- **Stack it in cols 1–6 and let cols 7–12 stand empty for the section's whole height — taken in round 11 and now withdrawn.** `home-proof-1024-light.png` is why: two content widths in one block, and the right 46% of a 918px-tall section empty from its top edge to its bottom. It also squeezed §G.3's core to 31 characters by the same reasoning applied one page over. It was refused on render, and render outranks arithmetic alone.

**The proof grid, 1024–1439. One grid, two rows, no second content width.**

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░ FULL BLEED --band ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 128 ░░│
│░                                                                        ░│
│░ We run this on our own app first.       │ One shipped, one nearly     ░│  ROW 1.
│░                                          │ there.                      ░│  prose, figures
│░ Pocket Manager has been in the Play      │                             ░│  and the store
│░ Store since 2020, maintained by the      │ [COPY NEEDED: <=8 words]    ░│  link, cols 1-7.
│░ same pipeline and the same review        │                             ░│  the caption and
│░ gates.                                   │ (cols 8-12, top-aligned,    ░│  its note, cols
│░                                          │  PROSE -- exempt under      ░│  8-12, top-
│░ 4.3*      24          1K+                │  §B.10's own rule, which    ░│  aligned.
│░ rating    reviews     installs           │  is why the right of the    ░│
│░                                          │  row is filled by writing   ░│  the figures now
│░ Open it in the Play Store                │  and not by a void)         ░│  live inside a
│░                        (cols 1-7)        │                             ░│  seven-column
│░                                                                     48 ░│  measure, 168.7
│░                                                                        ░│  clear of the
│░  Pocket Manager                                                        ░│  band at 1024.
│░        ●───────●───────●───────●───────◉                               ░│
│░  [second app]                                                          ░│  ROW 2.
│░        ●───────●───────◉╌╌╌╌╌╌╌○╌╌╌╌╌╌╌○                               ░│  the two-runner
│░     Specced Building  Final  Submitted  Live                           ░│  shared axis,
│░                      touches for review                                ░│  block cols 1-9.
│░                                          (block cols 1-9)              ░│  ALL FIVE LABELS
│░                                                                    128 ░│  CENTRED.
└──────────────────────────────────────────────────────────────────────────┘
```

- *Row 1.* COPY §2.7's headline, its paragraph, the three figures and the store link in **cols 1–7** — x 48 → 579.3 at 1024, **531.3px = 31.2em** at 17/28, inside `--measure-body`'s 32em, which the full 928 is not. COPY §2.8's caption `One shipped, one nearly there.` and its `[COPY NEEDED: ≤ 8 words]` note in **cols 8–12**, top-aligned, x 603.1 → 975.6. That block sits inside the plate's band and is *supposed to* — it is prose, which §B.10's rule exempts by name, and filling the right of the row with writing rather than with emptiness is the whole point of the arrangement. **The figures stop being the only thing that crosses the block**, which is blocker B1's actual cause: the rightmost figure's ink now ends at or before 579.3 against a band at 748, **168.7px clear** at 1024 and 353.5 at 1439.
- *Row 2.* The two-runner shared-axis track, block **cols 1–9** (x 48 → 737.7 at 1024). The product labels sit **above** their runners as the 1440 wireframe already draws them, so the block takes col 1's left edge and no label column is subtracted. Five node centres at the **100px pitch**, anchored on the right.
- *The right anchor, written once so it is reproducible.* **Last node centre = `min(block right − 33, 100vw − 372)`.** The second term is the plate's band (`100vw − 276`) less **96px**, one step on §B.5's spacing scale; the first is the block's right edge less the ring's 9px and one 24px gutter. The anchor is band-relative because the plate is a viewport object and §B.10's rule is a viewport rule — this is the one place in the document where a viewport-relative constraint sets a coordinate rather than only testing one. At **1024** the band term governs: **last node x 652**, centres **252 / 352 / 452 / 552 / 652**, axis ink (including the last ring) **243 → 661**, **96px clear** of the band at 748 measured node-centre-to-band and **87px** measured ring-to-band. The block has 76.7px to spare to its right, which is where the centred `Live` label's overhang goes.
- *All five stage labels centre on their nodes*, here and in every other form of this component. See §E.3.
- *≥ 1440 — the split band above, unchanged, and its numbers stated in the same terms.* Row 1's prose in cols 1–5 with the figures and the store link beneath it; the band's diagram in **cols 7–12**; axis **x 732 → 1132**, centres **732 / 832 / 932 / 1032 / 1132**, last ring closing at **1141** against a band at **1164** — **23px clear**. It clears, so it keeps the split; the two-row instrument is not applied where the split already works. The only change at 1440 is that all five labels now centre (item H7), and the two end labels' ink may overhang the axis by up to half a label — `Live` at small/14 overhangs to ~1145, still inside 1164, and it is prose in any case.
- *768–1023.* The 8-column grid, so the twelve-column instrument does not apply. §E.3's stacked form holds — axis x 32 → 432, last ring 441, band 492, **51px clear** — and **the prose takes cols 1–6 and the three figures and the store link take cols 1–5**, which is the rule that closes blocker B1 at these widths: cols 1–5 ends at x 464.5 at 768 (**27.5 clear** of a band at 492), 545.3 at 900 (78.8 clear) and 620 at 1023 (127 clear). The figures were struck at 768–1022 because they ran the full content width; they now run a column allocation, and no width in the range needs a case of its own.
- *< 768.* Unchanged: §E.3's one-row-per-product form.

**The header row above carries one more item than it did in round 3:** the light/dark toggle sits 24px to the right of `Contact`, right-aligned to the 1200 content edge, 44 × 44, last in the header's tab order (§B.10a). The header height stays 72px and no other element in this wireframe moves.

**Layout families used, one each:** asymmetric-left hero with a void; full-bleed scene plus fixed slot; left-labelled card rail (the work-card strip — the only structure on the site where a row label sits outside the content and the objects run out from it); hung-numeral list with an anchored closing line; split band with a diagram; narrow centred statement; full-bleed inverted CTA. Seven sections, seven families — nothing repeats. Adding the strip did not cost a repeat, which is the test it had to pass to be worth including.

**One deliberate exception to page-theme lock:** the floor and the final CTA invert to `--floor` while the rest of the page is `--sheet`. This is not section-level theme flicker; the room is a place, entered once and bookended once, and inverting it is what makes it read as somewhere rather than as a panel.

### B.10 The persistent contact affordance

§8: not a chat bubble, not an exit modal. It is the empty chair's nameplate, reused — the same amber plate with ink text, because the thing you are being invited to do is talk to the person who signs off.

**The plate prints the address in plain text** (item 53). Not a label over a `mailto:`. A page whose whole argument is "a real person answers" cannot hide the person's address behind a button; the address *is* the proof, and printing it is the cheapest possible demonstration of the claim. The scraping cost is accepted, and it is accepted with open eyes: these are Gmail addresses with Google's own filtering behind them, and no obfuscation scheme survives a determined scraper anyway.

**The address is per world:**

| Where | Address printed on the plate |
|---|---|
| `/`, `/work/*`, `/contact/`, `/404` | `thegeekdogs@gmail.com` |
| `/sahib/` | `sahiboffc@gmail.com` |
| `/tanya/` | `jaintanya999@gmail.com` |

The same rule governs each page's own closing line: a person page closes with that person's address, the studio pages close with the studio's. The plate and the page never disagree about who is being written to, which is the whole reason the person pages get their own addresses at all.

- **Mechanism:** `position: sticky; bottom: 0` on an element inside a wrapper that spans from the end of the hero — or, on `/`, from the **end of the floor section** (round 12, at every width) — to the start of the final CTA. It appears when that region begins, follows down the page, and retires on its own when the real CTA arrives. On `/contact/` there is no wrapper and no plate. No JS, no scroll listener, no dismiss state.
- **One component, every page, every breakpoint. One height, one fill, one border, one radius, one type size, one inset — and, from round 10, two widths: a 260 × 56 plate at ≥ 768 and a 112 × 56 plate below it.** `--lamp` fill, 2px theme-`--floor` border, inset **16px from the bottom and right of the viewport**, sticky in the wrapper above. **There is no full-bleed variant at any width, on any page, in any world**, and the two widths are the same object at two sizes, not two components: same fill, same border, same 3px radius, same small/14px Instrument 600, same focus ring, same `display: none` in print.
- **≥ 768: the plate prints the address**, as a `mailto:` filling the plate. The width does not change between pages, and that is checked rather than assumed: set at small/14px Instrument 600 with 20px padding each side, the longest of the three addresses (`jaintanya999@gmail.com`, 22 characters ≈ 169px) needs 209px of the 260 available; `thegeekdogs@gmail.com` needs ~202px and `sahiboffc@gmail.com` ~186px. All three clear 260 with ≥ 51px to spare, so **no wireframe in §B.9, §F.8 or §G.3 changes width**. The composition rule below binds from 768 up at a 276px band.
- **< 768: the plate is 112 × 56 and it carries a label, not the address — and it is not present over the floor section. Round 10, and it is two changes because neither one alone is sufficient.** The full-bleed bar stays withdrawn; a docked strip is refused again below. The evidence is `docs/reviews/floor2/engineer/floor-360-{light,dark}.png`: at 360 the 260 plate plus its 16px inset occupies x 84–344 against a card panel whose measure runs x 40–320, so it covers **236 of 280 CSS px — 84% of the line width — while the visitor is reading the default card.** 84px of clear space to the plate's left is not an object on the page; at this width it is the page.
  - **Change one, the width. 112 × 56, inset 16, so the band below 768 is 128px** and begins at `100vw − 128` — x **232** at 360, x **262** at 390. §B.10's amended composition rule now **binds below 768 as well as above it**, at this narrower band, with the same two exemptions. Measured at 360, the marks it protects: the work-card strip's date line (`2023 – 2025`, numeral-large 24px Anek 500 `wdth` 87.5, from x 60) ends at **~181** — 51 clear, where the 260 plate struck it through; `/contact/`'s stacked addresses (169px from x 40) end at **209** — **23 clear**, the same margin §B.9's stage track holds at 1440; `/work/`'s vertical stage track label `Submitted for review` (20 ch, small/14px, from x 56) ends at **~210** — 22 clear. All three failed against the 260 plate's band at x 84. **This is the change that makes the plate obey the rule §B.10 already wrote for itself.**
  - **Change two, the label.** 112 with 19.5px padding each side leaves ~73px of type — 9 characters at small/14px Instrument 600 (7.68px/char, the same measurement the 260 proof uses). `[COPY NEEDED: the plate's label below 768, ≤ 9 characters, the action rather than the address.]` `[COPY NEEDED: the plate's accessible name below 768, ≤ 8 words — it must speak the address the plate links to, because the printed proof is what the label gives up and the screen-reader path must not give it up too.]` The `mailto:` target is unchanged and stays per world (the table above). **Item 53 is amended below 768, not overturned**: the address is still printed in plain text, at every width, in the page's own final CTA and three times on `/contact/`, and each person page still closes with that person's address. What the plate gives up below 768 is being *the* printed proof; what it keeps is being the way to act. On a phone the address is tapped, never transcribed, and the proof already sits in the flow two screens down. That is a smaller loss than 84% of the card panel.
  - **Change three, the floor — made in round 10 below 768 and made *unconditional* in round 12.** See "Where the plate is not" below; it is no longer a property of this breakpoint and it no longer lives in this bullet.
  - **Why not a docked full-width strip (the option this round considered and refused).** A slim strip differs from the withdrawn bar only if content never passes *under* it, and that requires the document to become an inner scroller — `main { flex: 1; overflow-y: auto }` under a 72px fixed row. It costs 72 of a 640px viewport permanently (11%), on a page where §B.8 already has the primary CTA's bottom edge at ~464; it breaks iOS URL-bar collapse, find-in-page scrolling and scroll restoration; and a fixed 360-wide amber row is the horizontal rule across `/404` that §9.4 bans by name and that round 9 removed. Refused here and wherever it is proposed again.
**Where the plate is not — the third mechanism, and in round 12 it is unconditional.**

Run B blocked on this section three times (`plate-over-figures-900-light.png`, `plate-over-scene-900-light.png`, `plate-over-panel-1024-light.png`), and two of the three were the same fault: §B.10 promised in one sentence that the floor's panel is *never covered* and in another sentence exempted the card slot from the band **as prose**. Both sentences cannot stand. An exemption says *this mark may be covered and survive it*; the promise says *nothing here is covered at all*. **The promise wins and the exemption goes.**

> **The promise, restated so it is one sentence and it is testable: the plate never covers a load-bearing mark. Not a stage node, not a figure, not a printed address, not a card, ~~not prose~~ (round 13: struck — see the wording correction below), not at rest, not mid-scroll, not at any scroll position, at any width, on any route. Where a region cannot be kept clear by where its marks go, the plate's wrapper does not span that region, and the region is named below rather than argued case by case.**

- **The floor section on `/`, at every width.** The plate's wrapper on `/` begins at the **end of the floor section**, not at the end of the hero. Round 10 made this true below 768 and priced it there; round 12 removes the width condition, because the trade is identical at 1440 and the evidence at ≥ 768 is worse. At 768–1023 the plate covered the whole Designer station — artwork and nameplate together (blocker B2) — and at 768, 1024 and 1440 it struck through the card's `Owns` line so that the page said Sahib owns "architecture review, code review, design review, the releas" (blocker B3). The room is the site's one bold moment (§9.4) and a station is a mark read as a unit; the `Owns` line is §6's answer to *which human checks it* and §6 forbids splitting it from the flex. **A contact plate over the room is the definition of obtrusive at 1440 as much as at 360**, and §8 asks for unobtrusive first.
- **The whole of `/contact/`, at every width.** Run A said this exception would be written and round 12 writes it. §J's row for the route is "the second call to action. One email, one link, one answer." The page's entire content is three printed addresses, and the plate is a fourth printing of the first of them, 300px from itself. A persistent affordance that repeats the page it is resting on is not persistent, it is redundant. **`/contact/` carries no plate.** This also retires the tightest clearance on the site (738 against 748 at 1024) as something anyone has to keep checking.
- **The mechanism, unchanged and still free.** `position: sticky` inside a wrapper that does not span the region — the same mechanism §B.10 already uses at the other end to retire the plate before the final CTA. **No JS, no scroll listener, no `view-timeline`, no scroll-driven animation — and therefore nothing to cancel under `prefers-reduced-motion` and nothing to fall back from in a browser without scroll-driven animation, both of which would have landed back on the defect.** Reduced motion, forced colours, no-JS and print all render exactly this. It is one containing block per route, and it needs no new component.
- **The cost, stated.** On `/` the plate is absent for the hero plus the floor — ~1,770px at 360, ~2,050px at 1440 — during which the hero's own `Start a project` button has been on screen and the room is being read; on `/contact/` it is absent entirely. That is the trade change three already priced below 768 and accepted, taken at every width, plus one route. It buys the removal of three blockers and it takes the one amber rectangle off the one bold moment, which is also §J's row for `/`.

- **Reserve — restated, and it is three numbers, none of them a lane.**
  1. **Horizontal.** The band is **276px at ≥ 768** and **128px below 768**, measured from the viewport's right edge. No load-bearing mark's right edge may fall inside it, at any width, anywhere in the plate's wrapper. Prose and headings are exempt at both widths. **The band does not exist in a region the wrapper does not span** — that is what makes the promise above a rule and not a second exemption.
  2. **Vertical. Every section the plate can overlay carries +72px bottom padding** — the plate's 56 plus its 16px inset. **This corrects the +56 this section previously specified**, which under-reserved by exactly the inset and left a section's last line 16px inside the plate's lowest rest position. It stops the plate resting on a last line and it stops any CLS. That is the entire vertical reservation. A section the wrapper does not span carries no such padding, because there is nothing to reserve for.
  3. **The floor's card panel takes no plate allowance at all — and now it needs none.** Its `min-height` (§C.6) is derived purely from the longest card at every breakpoint, with no plate term in the arithmetic, because the wrapper does not span the floor section at any width. **The round-11 wording — that at ≥ 768 the panel is the card slot, "which the band exempts as prose" — is deleted.** It was the half of the contradiction that lost.

  **Each struck mark run B found is now covered by a rule, not by a case.** The `1,000+` figure at 768–1022: §B.9's column allocation for the figures row (cols 1–5 of 8, cols 1–7 of 12) — reserve 1, applied by composition. The Designer station at 768–1023 and the card's `Owns` line at 768/1024/1440: the wrapper does not span the floor section — the promise above. Tanya's `Owns` line at 768: ~~it sits in the core field, which §G.3 keeps left of col 9 at ≥ 1024 and full-width below 768 where the band is 128 — reserve 1 again~~ — **this clause was false and round 13 replaces it below.** Full width is not clearance; a line that sets to its field's own width ends where the field ends. Three marks, two rules, no exemptions.

  **`qa:plate` measures four more marks than the 432 it measured in run B**: `.figures__figure`, `.figures__label`, the floor's SVG `text` nodes, and `.core__gates-line`. All four are load-bearing by the rule's own definition and none of the four was in the set.

  **Round 13 — the seven marks the four new selectors found below 768, reconciled. The rule does not move.** `qa:plate` flagged seven collisions on the run-D build and failed none of them, pending this section. They are two marks on `/` at two widths and one mark on `/tanya/` at three, and each one is a place where a *different* section of this document promised clearance it had not measured. Both promises were mine.

  | # | Route, widths | Mark | Band | Ink ended | Which section was wrong |
  |---|---|---|---|---|---|
  | 1–2 | `/` at 360 | `.figures__figure` `1,000+`, `.figures__label` `downloads` | 232 | **309**, ~302 | §B.8's "3 across at 320: 96px each" — Pass 1 arithmetic against a band at x 84 |
  | 3–4 | `/` at 390 | the same two | 262 | ~330 | the same line |
  | 5–6 | `/tanya/` at 360, 390 | `.core__gates-line` | 232, 262 | **305** | this section's "full-width below 768 … reserve 1 again" |
  | 7 | `/tanya/` at 768 | `.core__gates-line` | 492 | **539** | the same clause |

  **1–4 are fixed by composition, in §B.8: the three figures stack below 768** — numeral in a 68px column from x 20, micro label from x 104 on the same baseline, three rows. The block's widest ink ends at **x 162** at every width below 768, against a band that never begins before **232**: **70px clear at 360**, three times the 23px `/contact/`'s addresses hold. §B.8 carries the derivation and the refusal of the narrow-row alternative. §E.3's allocation already closed the same mark at 768–1023 (cols 1–5 of 8) and above (cols 1–7 of 12), so the figures row is now ruled at every width and by the same instrument — reserve 1, applied to where the marks go.

  **5–7 are fixed by composition too, in §G.3a: the gates block sets one gate per line below 1024, and the core keeps every pixel of its width.** The mark is a five-item list read as a unit, and a comma-separated list is the only thing in the core that runs to its field's full measure. Set one per line, the longest item is `security and privacy` — 20 characters, **157px** at body 16/1.62 from the core's inner left at x 40, ending at **x 197 at 360**, 35 clear of 232; **x 221 at 390**, 41 clear of 262; and at 768 the core's inner left is x 64 and 20 characters at body 17/1.62 is 167px, ending at **x 231** against a band at **492 — 261px clear**. The block's right edge is a constant per breakpoint and does not move with the viewport, so every width in the range is looser than its floor.

  **Why the core's measure does not yield, stated so it stops being re-proposed.** Capping the gates block to clear the band by measure needs it to end at `100vw − 128` from an inner left of 40, which is **192px at 360 — about 23 characters**, under the 29-character floor §C.6 sets for a *card* and inside the 245px/31-character field item T4 was raised to remove. §B.5's round-12 ruling names the core a diagram with a fixed minimum extent; you do not narrow one of those to clear a band, which is the whole reason that ruling exists. Line-breaking is free, measure is not, so the line breaking changes and the field does not.

  **And it is a better line.** Five owned gates set as five lines is a list rendered as a list, which is what §B.2 asked for when PM1 and WP2 took the markers off and left the separation to space. The comma-separated form stays on §C.6's floor cards, where the slot is 293px wide and a stacked list would be five lines of two words.

  **Neither fix is an exemption and neither region leaves the wrapper.** The plate is still present on `/` from the end of the floor section and on `/tanya/` from the end of the hero, at every width; nothing gained a `padding-right`; no content width changed; the band is 276 at ≥ 768 and 128 below it, as it was. Seven marks, two compositions, no new rule. **`qa:plate` should now fail rather than flag**, and the four selectors stay in the set.

  **One wording correction the Engineer is owed** (run D, "and one wording note under both of them"). The restated promise above says the plate never covers "not a load-bearing mark, not a card, **not prose**", while reserve 1 says "prose and headings are exempt at both widths". Those are two rules and the second is the built one. **The first is corrected here, not the second:** the promise's subject is *load-bearing marks, plus the named regions the wrapper does not span at all*. A sticky element in normal flow passes over whatever is above it on a page long enough to scroll — that is precisely what makes it cost no JS — so a promise that no prose is ever passed over is a promise no sticky affordance can keep, and asserting it hid a real defect behind an unmeasurable sentence. Strike "not prose" from the promise; prose and headings may run under the band, everywhere except the named regions, where nothing runs under anything because the plate is not there.

  **There is still no keep-out lane.** No section carries a `padding-right`, no section has a reserved right band, and every section keeps the full content width and §B.5's one grid at every breakpoint. A lane buys the same collision for a second content width, a second column width, a right edge that steps in and out down the page, and four more voids where §B.9 allows exactly one — which costs more of the design than the collision it removes.

**The 360 wireframe — the floor section's bottom, with the plate in place.** Drawn as a 360 × 640 viewport at the scroll position where the floor section ends and the plate's wrapper begins, which is the first position at 360 where the plate exists at all.

```
┌────────────────────────────────────────┐ 360 x 640 viewport
│▓  │ is ready for your users.     │    ▓│  CARD PANEL, min-height 320.
│▓  │ A person does, every         │    ▓│  text measure x 40-320, all
│▓  │ release, every time.         │    ▓│  280 of it. NOTHING over it:
│▓  └──────────────────────────────┘    ▓│  the plate's wrapper does not
│▓                                      ▓│  span this section AT ANY WIDTH.
│▓  The full pipeline                   ▓│  40
│▓  Spec Writer, Designer, Programmer,  ▓│  small 14px, chalk@72%
│▓  Test Engineer, Security Auditor,    ▓│
│▓  Reviewer, Release Watcher.          ▓│
│▓                                      ▓│  72  <- the reserve, +72 not
╞════════════════════════════════════════╡      +56 (56 plate + 16 inset)
│░░░░░░░░░░░░░ --band ░░░░░░░░░░░░░░░░░░░│  END OF FLOOR. the plate's
│░                                      ░│  wrapper starts on this edge
│░  Sahib Singh                         ░│  and runs to the final CTA.
│░                                      ░│  16
│░  ┌──────────────────────────────┐    ░│
│░  │ Keenai Global                │    ░│  compressed card, x 40-320
│░  │ 2025 - now                   │    ░│  date line ends x ~181,
│░  └──────────────────────────────┘    ░│  51 clear of the band
│░       ▁▁▁▁▁▁▁▁▁▁                     ░│
│░                                      ░│  28
│░  ┌──────────────────────────────┐    ░│
│░  │ Motive                       │    ░│
│░  │ 2023 - 2025                  │    ░│
│░  └──────────────────────────────┘    ░│
│░       ▁▁▁▁▁▁▁▁▁▁          ┌────────┐ ░│  THE PLATE. 112 x 56.
│░                           │ [COPY] │ ░│  --lamp fill, 2px --floor
│░                           └────────┘ ░│  border, x 232-344, y 568-624.
│░                                      ░│  16
└────────────────────────────────────────┘
    band begins x 232 ─────────▲
    (100vw - 128). content x 20-340, measure x 40-320:
    the plate covers the last 88px of a 280 measure on the
    sections it does overlay, and none of the card panel.
```

**The composition rule.** Stated once, here, and owned here. **Amended in round 9, and the amendment is mine.** The round-8 test — inside the 276px band *and* within 72px of the bottom of its own section — measured the wrong thing. It was a rest test on a **section**, and the plate is a **viewport** object: on `/contact/` a printed address sitting 351px above its section's bottom passes that test and is struck through on first paint at 1024 (run A blocker 2), and on `/work/` the last two stage nodes are covered while passing it too (blocker 3). The 72px box is retired. The 276px band is kept, and the test becomes one number per mark — its right edge:

> **No load-bearing mark — one whose meaning is lost when part of it is hidden: a stage node, a printed address, a CTA, a form control, a card's price line — may have its *right edge* inside the plate's 276px band at ≥ 768, anywhere inside the plate's wrapper. Prose and headings may run under the band; a mark that is read as a unit may not end inside it.**

The band is the plate's 260 plus its 16px inset, measured from the viewport's right edge: it begins at `100vw − 276`. Like the box it replaces this is a constraint on **where marks go**, not a tax on how wide the page is — no container, no column, no measure and no padding changes, and there is still no keep-out lane — and it is still independent of scroll position, because the plate's *horizontal* rest position is. **Round 10 extends it below 768 rather than exempting it there.** The round-9 wording — that it does not bind below 768, because the plate has 84px of clear space beside it — was the same error one level down: 84px of clear space in a 360px viewport is not clearance, and the rendered 360 screenshots show the 260 plate's band at x 84 striking the work-card date line, `/contact/`'s addresses and `/work/`'s vertical track labels. The rule is one rule at every width; only the band's width changes, 276 at ≥ 768 and 128 below it, and the bullets above give the measured clearances. It is the same instrument §B.9's proof band already answers to — the shared axis stops at x 1132 at 1440, the last ring closes at **1141**, the band begins at **1164**, 23px clear, measured — and its two exemptions are in the rule itself: prose and headings may run under the band.

**The measured consequence, `/work/`.** *(Round 12: the fixed geometry described in this paragraph is superseded by §E.2's block-anchored axis; the 930/931 breakpoint it derives is unchanged and the derivation is kept because it is what produced that breakpoint.)* §E.2's horizontal track capped its node pitch at 124px and anchored its axis at x 137, so its right end is fixed at 647 from 900 up while the band moves with the viewport. The two cross at vw 923 for the last node and vw ≈ 931 for its label — at 768 the band starts at 492 against a label end of 644.5, at 900 it starts at 624 against 655.3, and at 1024 it starts at 748 against 671, clear by 85. **The horizontal track therefore collides from 768 to 930 and is clear at 931 and above, so §E.2's vertical form runs up to 930 and its horizontal form starts at 931.** The remedy is deliberately *not* a narrower cap: capping the axis at `band − 16` gives an **85px pitch at 768, which drops `Submitted for review` to three lines and breaks §E.2's two-line label reservation** — the defect this build just closed — so the cap is refused here and wherever it is proposed again. The vertical form is the same component, the same 44px rows, already built, and it has no right-hand extent to collide with. `/work/` is the only route affected: both product pages put their track directly under the h1, above every plate rest position, and are clear at every width.

**What it costs the two sections that could collide.**

- **§B.9's proof band, at every width from 768 up** (round 12: 768–1023 stacked, 1024–1439 one grid in two rows, split at 1440; see §B.5, §B.9 and §E.3). The shared stage track's fifth node is a load-bearing mark, so this is the one place the rule does real work — and at 1024–1439 it is also the one place the rule *sets* a coordinate rather than only testing one: §B.9 anchors the last node centre at `100vw − 372`, the band less 96px, giving **x 652 at 1024**. The clearances the rule buys, end to end: **51** at 768, **96** at 1024, **23** at 1440. The band keeps cols 7–12 and the page keeps its full 1200 content width; what changes is where the **axis** stops. At 1440 the content runs to x 1320 and the plate's leading edge is at x 1164, so **the track's axis runs x 732 → x 1132** — from the left edge of col 7 to 188px short of the content edge — with the five node centres at a 100px pitch: **732 / 832 / 932 / 1032 / 1132**. (§E.3's product row labels sit *above* their runners in this band, as §B.9's wireframe draws them, so the axis takes col 7's left edge rather than being indented behind a label column.) The last node's 18px ring closes at 1141, 23px clear of the plate. The band's right column keeps clear by **ending the track there**; the caption and the `[COPY NEEDED: ≤ 8 words]` line still use the full cols 7–12 width, as prose the amended rule exempts, and the stage labels ride the axis they belong to. The band is not padded, not narrowed and not indented, and §E.2's two-line label reservation gets a 100px column pitch rather than 67px, which is what lets `Submitted for review` set in two lines instead of three.
- **§C.6's side-by-side slot at 1024 — and this bullet is rewritten in round 12.** The slot returns to **cols 9–12 at 1024**, as §C.6 has always stated: x 682–976 in a 1024 viewport whose band begins at x 748. Round 9 passed it on the rule's prose exemption, and run B showed what that exemption actually bought — the plate striking through the card's `Owns` line at 768, 1024 and 1440, so that the page said Sahib owns "the releas". **The exemption is withdrawn. The slot is not exempt; it is out of the wrapper's reach**, because the wrapper does not span the floor section at any width (above). The slot's position, its width and its reservations are unchanged and were never the problem — what changes is that the plate is not there to test them against. The card slot is now the one region on the site that the composition rule does not have to speak about at all.
- Contrast: `--floor` on `--lamp` = 7.56 : 1; plate boundary against `--sheet` via its ink border = 13.53 : 1. On Sahib's `--s-ground` and Tanya's `--t-ground` the same ink border carries 14.11 : 1 and 14.18 : 1 respectively, so the plate needs no per-world variant. **In dark** the plate's own amber fill carries the boundary (7.54 : 1 on the dark studio sheet, 8.66 : 1 on Tanya's dark ground) and its text is the theme's `--floor` at 9.10 : 1; the 2px border stays for box-model reasons only. See §B.2a.
- Print: the plate is `display: none` (§D.8). A sticky amber bar is not a thing that belongs on paper, and the address prints once at the top of page 1 instead.

### B.10a The light/dark toggle

Item 49's second half: every page carries a manual toggle. One control, one per page, in the header. Behaviour is specified here; the Engineer implements it (PLAN.md §1.2's `data-theme` on the root).

**Default and persistence.**

- **No stored choice → follow `prefers-color-scheme`.** The visitor's OS preference is the default on first visit, on every page, in all three worlds. A visitor who has set their machine to dark gets Sahib's page exactly as round 3 designed it and the studio in §B.2a.
- **No stored choice and no OS preference expressed → light.** Light is the tie-break because it is also the print scheme (§D.8) and the scheme every wireframe in this document is drawn in.
- **The toggle overrides and persists per visitor**, across pages and across sessions. A stored choice outranks the OS preference permanently, including if the OS preference later changes — a person who chose light at 9am does not get flipped at sunset. There is no third "system" position on the control and no reset in the UI; clearing it is a browser-storage action, not a design affordance.
- **No flash.** The stored value must be applied before first paint. If it cannot be, the page paints light and corrects — never the reverse, because a dark flash on a light page is the more violent of the two. This is the Engineer's call to make; the design constraint is only that the *floor band* must never be seen in the wrong scheme, since it is the one region whose meaning depends on being the darkest thing on screen.

**Where it sits.**

| Breakpoint | Position | Arithmetic |
|---|---|---|
| **360** | Fifth and last item on the header's nav row (§B.8 row 2), right-aligned to the 320 content edge, on the same 44px line as the four links. | Four labels + three 24px gaps = 236; + 44 = 280 of 320; 40px of clear space between `Contact` and the control. Header stays 92px; the primary CTA's bottom edge stays at ~464px on a 640-tall viewport. |
| **≥ 768** | Same row as the wordmark and nav, after `Contact`, right-aligned to the content edge. | 24px from `Contact`, inside the 1200 content width at 1440. Header stays 72px. |

- **Last in the header's tab order**, after the four nav links, in every world and at every breakpoint. It is a preference, not a destination, so it does not come before the navigation.
- **One instance per page. The footer does not repeat it.** The footer nav exists because a visitor at the bottom of a long page still needs to *go* somewhere; a second copy of a stateful control is two focus stops, two accessible names and two things to keep in sync for a preference that is set once and then left alone.
- **On every route**, including `/404` and both person pages. There is no page where the control is absent, because a visitor who lands on `/sahib/` first must be able to change scheme without finding the home page.

**Size and shape.**

- **Target 44 × 44** at every breakpoint (§B.6 principle 5), containing a 28 × 28 plate at the site's one 3px radius, containing a 20 × 20 glyph. The plate is not a border and not a fill — it is the hit area made visible at the same weight as a nav label.
- **The glyph is the floor's pendant lamp**, which is the only iconography this site owns. **Two states, distinguished by shape:**
  - **Light scheme active** — the shade alone, drawn as an outlined trapezoid on a 2px stem. No cone.
  - **Dark scheme active** — the same shade and stem, plus a **solid filled cone** below it. A shape is present that was absent.
- **The differentiator is the presence of a filled triangle, never colour.** In greyscale, at 20px, with colour removed entirely, the two states are still one-shape-versus-two. A sun/moon pair was rejected (scratch, round 4): it is the generic-template tell §9.4 exists to prevent, and it says nothing about this site.
- **The glyph shows the scheme now in effect**, not the scheme pressing it would produce. The action lives in the accessible name, which is where an action belongs. `[COPY NEEDED: the toggle's accessible name, ≤ 5 words, phrased as the action taken, not the current state]` and `[COPY NEEDED: the live announcement after a change, ≤ 6 words, or the decision that there is none]`.
- **Monochrome in every world and both schemes.** Shade, stem and cone are all drawn in the world's `--ink` — never `--lamp`. Two reasons, and the second is the load-bearing one: on a light ground `--lamp` is 1.79 : 1 and would break the lamp rule outright; and on Tanya's page an amber glyph would be a **second** chromatic mark, when her whole world is built on there being exactly one (§G.1). One rule covers all six palettes.

**Per world.**

| World / scheme | Glyph colour | Ratio against the header ground | Plate |
|---|---|---|---|
| Studio, light | `--ink` = `--floor` `#0F2A2E` on `--sheet` | **13.53 : 1** | none — the glyph sits on the sheet |
| Studio, dark | `--ink` = `--chalk` on `--sheet` `#18292D` | **12.71 : 1** | none |
| Sahib, dark (his default) | `--s-ink` `#E9EAF0` on `--s-ground` | **14.11 : 1** | none |
| Sahib, light | `--s-ink` `#1A2033` on `--s-ground` `#EEEFF4` | **14.09 : 1** | none |
| Tanya, light | `--t-ink` `#1B2020` on `--t-ground` | **14.18 : 1** | none |
| Tanya, dark | `--t-ink` `#E9EAEA` on `--t-ground` `#191B1B` | **14.35 : 1** | none |

Every one of the six is above 12.5 : 1, which is what lets the glyph be a 2px stroke rather than a filled blob. The control is the same object in all six — same geometry, same position, same two shapes — and only the ink changes, which is the same discipline the nav labels already follow.

**Focus.** The §B.2 / §B.2a two-tone ring, unchanged: 3px outer in the surface's maximum-contrast neutral (the six ratios in the table above are exactly the outer ring's ratios, since the glyph and the ring take the same ink), 2px `--lamp` inner, 3px offset, 4px radius traced around the 44 × 44 target rather than the 28 × 28 plate. This is the only place `--lamp` appears on the control, and only while focused.

**Motion — and the hard rule.**

> **The toggle never animates the page.** Every colour token switches instantly. No `transition` is declared on any colour, background, border or fill property anywhere on this site, so there is nothing to cross-fade and no half-themed frame can exist. A 200ms page-wide colour fade is the single most common dark-mode tell and it is banned here outright.

The **only** thing permitted to move is the control's own glyph: the cone fades and scales in or out over `--dur-1` (120ms), `opacity` and `transform` only, `--ease-out`. Nothing else on the page moves, nothing reflows, and the toggle is not one of §H.3's orchestrated moments — it is a response to a user action, which §10 always allows.

### B.11 `/work/*`, `/contact/`, `/404`

Same tokens, same grid, no new devices.

- **`/work/`** — two entries, each a `--band` block: product name, one line, the full labelled build-stage track (§E), a store link where one exists. No hero image. `[COPY NEEDED: /work/ index intro, ≤ 20 words]`
- **`/work/pocket-manager/`** — problem, build, review process, outcome, store link, per §8. Screenshots in the real device aspect ratio (portrait 9:19.5), max two above the fold, explicit dimensions. The full stage track sits directly under the h1 because "Live" is the strongest fact on the page.
- **`/work/wedding-planner/`** — identical shell, descriptive title, stage at Final touches, no dates anywhere, no store link (there is nothing to link to). **The route ships** (item 9a: full page, name-agnostic), so the layout is built, not held. `[COPY NEEDED: the name-agnostic page title, ≤ 5 words — the placeholder name may not appear (§5.3).]`
  - **The differentiator screenshot gets a composition, round 12** (review item WP1, `wp-1440-light-full.png`). Run A item 9 asked for a grid built for one screenshot instead of a four-column grid with three collapsed tracks, and the build delivered that. The composition did not follow: rendered, the one real screen of the multi-function view is a **280 × 609 thumbnail alone at the far left of a 1200px row**, the smallest object on a 3,104px page, with ~940px of empty sheet beside it and nothing to read there. §J's row for this route says that one screen **is** the differentiator; it cannot also be the page's smallest mark. **At ≥ 1024 the shot runs at 2× in cols 1–4 with COPY §5.2's differentiator paragraph in cols 6–10 beside it**, top-aligned to the shot, so the row carries the picture and the sentence that explains it and no third thing. Below 1024 the shot is full content width with the paragraph beneath it. The image keeps its explicit `width`/`height` and the real 9:19.5 device aspect at both sizes, so nothing about §B.11's layout-holds-with-images-aborted guarantee changes.
- **`/contact/`** — three addressed blocks per §8 (studio `thegeekdogs@gmail.com`, Sahib `sahiboffc@gmail.com`, Tanya `jaintanya999@gmail.com`) as a **3-up inside cols 1–9 at ≥ 1024**, stacked below. Run A blocker 2: at full content width the third column ran x 682.7–976 at 1024 against a plate band beginning at 748, and the plate struck through `jaintanya999@gmail.com` on first paint in a 900-tall viewport. A printed address is the first mark §B.10's amended rule names, and this page is nothing but three of them, so the fix is the column allocation and not the breakpoint — going 3-up only at ≥ 1200 does not help, because at full width the third column would end at 1140 against a band at 924 and fail again. **Cols 1–9** is 9 × 55.3 + 8 × 24 = 690 at 1024, so the row ends at x **738** against a band at **748**, and 9 × 78 + 8 × 24 = 894 at 1440, ending at x **954** against **1164**. 1024 is the tightest width and every width above it is looser, because the band moves 1px per viewport px and the row's right edge moves ~0.75. Each block is (690 − 48) / 3 = **214px** at 1024 and **282px** at 1440; the longest address, `jaintanya999@gmail.com`, needs ~169px (§B.10), so all three set on one line at both. Cols 10–12 are this page's one §B.9 void and the plate rests in them. **No form** (item 11): three printed addresses and nothing to submit, which removes a service dependency, a success state, a spam surface and a whole class of validation design. No orchestrated moment; a contact page's job is to be answered, not performed.
- **`/404`** — the only page that shows an **empty room**: the floor slab and the lamp, no desks, no chair. It reuses the floor's slab symbol and its lamp gradient and adds nothing, so it costs roughly zero new bytes. One line, one link home. `[COPY NEEDED: 404 line, ≤ 12 words.]` This is the one joke the site gets, and it is a joke that is also the argument. **Review item E1 is build-side, not spec-side**: this bullet has specified the empty room since round 3, the Engineer recorded it as outside run B's scope rather than as a disagreement, and run B rendered a headline, a link and the site chrome (`404-1440-light-full.png`). Nothing here changes; it is owed. **The slab renders at the same 2:1 isometry and the same `--floor` fill as `/`'s, at the section's own width, with the lamp cone over the cell where the chair would be** — the absence is the joke and it only works if the room is recognisably the same room.

### B.12 Favicon and app icons

**This is not a logo.** QUESTIONS.md item 48 is answered "display name only, no logo", and that answer stands: the header sets *The Geek Dogs* in the display face and nothing else. A favicon is **browser chrome** — a tab, a bookmark, a home-screen tile, a manifest entry — and it is the one place the site cannot set type, because 16px will not hold a letterform of a two-word name. So the mark below exists only outside the document. **It never appears on a page**: not in the header, not in the footer, not on the floor, not in an OG card (§B.2a), not on a work card. If it ever turns up rendered in the layout, it has become a logo and it is wrong.

**What it is a picture of.** The site has exactly one prop — the empty chair's lamp (§C.1) — and the lamp's cone is already the only thing on the site drawn in `--lamp` as a shape. The chair itself is out: an isometric chair at 16px is four grey smudges. The cone is in, because a bright wedge narrowing to a point is legible at any size and it is the site's single signal, reduced to its silhouette. The chair is implied by what the cone points at, exactly as it is on `/404`.

**Geometry.** Square canvas, `viewBox="0 0 32 32"`, full-bleed ground, no corner radius (iOS and Android mask the tile themselves), no stroke, no gradient — §C.1's lamp is a 2-stop linear gradient and a gradient across 16 physical pixels is a smear, so the favicon takes flat `--lamp`. Three marks, all one fill:

1. **Cord** — a 2 × 4 bar, x 15–17, running from y 0 to y 4 so it leaves the top edge. It reads as *hanging* rather than floating, and it is the element allowed to disappear first at 16px.
2. **Cone** — an isosceles trapezoid, apex up: top edge 8 wide at y 4 (x 12–20), splaying to a base 22 wide at y 25 (x 5–27). This is the mark; everything else is support.
3. **Pool** — a 22 × 3 bar at y 28–31 (x 5–27), separated from the cone by a 3-unit clear gap. The gap is what makes the pool read as a lit floor rather than as the cone's own base.

```
schematic, 1 cell ≈ 2 units; ▓ = --lamp, · = --floor

·······▓▓·······   cord, 2 wide, off the top edge
······▓▓▓▓······   cone top edge, 8 wide, y 4
·····▓▓▓▓▓▓·····
····▓▓▓▓▓▓▓▓····
···▓▓▓▓▓▓▓▓▓▓···
··▓▓▓▓▓▓▓▓▓▓▓▓··   cone base, 22 wide, y 25
················   3-unit clear gap
··▓▓▓▓▓▓▓▓▓▓▓▓··   pool, 22 × 3, y 28–31
```

At 16px that is a 4px-wide top edge, an 11px base and a 1.5px pool line — three bands of decreasing width, which survives both the size and the greyscale test the build-stage indicator is held to (§E.1).

**Two colours, and no third.** Ground `--floor`, mark `--lamp` — the same pairing the room uses, and the only place on the site where `--lamp` is a *shape* rather than a fill, a focus ring or a plate. This is not a fourth amber under §B.2's three-places rule: the rule governs the rendered page, and the favicon is not on it.

| Variant | Ground | Mark | Mark-on-ground ratio |
|---|---|---|---|
| Light | `--floor` `#0F2A2E` | `--lamp` `#F2A93B` | **7.56 : 1** |
| Dark | `--floor` `#07181B` | `--lamp` `#F2A93B` | **9.10 : 1** |

**One SVG is enough, and it carries no `prefers-color-scheme` block.** Ship the light values hard-coded. The two grounds are 1.4 : 1 apart and invisible at 16px; more importantly the tile is *dark in both schemes* — §B.2a's whole argument is that the floor stays the darkest thing on the site whichever way the page goes — so a single dark-petrol tile with an amber cone sits correctly on light and on dark browser chrome alike. A media query inside the SVG would also buy a difference the three PNGs below cannot follow, leaving the vector and the rasters disagreeing on machines that pick either. If a dark variant is ever wanted, it is one `<style>` block and one hex, and it is deliberately not being spent now.

**File set for the Engineer.** Four files, all exported from the one SVG, which is the source of truth:

| File | Size | Slot |
|---|---|---|
| `/favicon.svg` | `viewBox 0 0 32 32`, vector | `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`. The primary icon everywhere it is supported. |
| `/favicon-32.png` | 32 × 32 | `<link rel="icon" type="image/png" sizes="32x32">`. Fallback for browsers without SVG favicon support. |
| `/apple-touch-icon.png` | 180 × 180 | `<link rel="apple-touch-icon">`. Full-bleed, **opaque**, square, no pre-applied corner radius — iOS masks it and a self-rounded tile gets rounded twice. |
| `/icon-512.png` | 512 × 512 | Web manifest `icons[]`, `"purpose": "any"`. |

No `.ico`, no 16px PNG: the SVG covers modern browsers and the 32px PNG downsamples cleanly to 16, which is why the geometry above is authored on a 32 grid rather than a 16 one. No maskable variant either — a maskable icon needs 40% safe padding, which would shrink the cone to the size the mark was designed to avoid.

---

## C. The studio floor (§6)

### C.1 Projection and light

Standard 2:1 isometric (30° rows), camera at front-centre. Single light source upper-left, which is the same light that lifts the work cards' top-left edge. Floor modules are 128 × 64 in scene units. The scene never rotates, never parallaxes, and never responds to the pointer position — it is a room you look at, not a toy you spin.

Four fills in the whole scene, all derived from the six tokens:

| Fill | Value | Use |
|---|---|---|
| floor slab | `--floor` | the ground |
| surface, lit | `--chalk` @ 22% over floor | desk tops, chair seat |
| surface, shadow | `--floor` darkened, `#0A1E21` light / **`#051113` dark** | desk right faces, contact shadows |
| glow | `--chalk` @ 55–85% | monitors |
| lamp | `--lamp`, one 2-stop linear gradient | the empty chair's cone only |

**In dark** (§B.2a) three of these five follow `--floor` automatically, because they are alphas over it: the lit surface, the glow and the lamp gradient are unchanged declarations and simply sit on a deeper ground, which makes the lit surfaces read *more* strongly rather than less. Only the shadow fill is an absolute value and it takes the second hex above, keeping the same luminance relationship to the dark floor that `#0A1E21` has to the light one. The scene is one SVG with one set of fills in both schemes — **no second scene, no per-scheme geometry, and no addition to §C.10's weight table.**

### C.2 Seven agent desks, two cabins, one empty chair — ten stations

**Decision taken by the owners (items 32 and 51): two human cabins + seven agent desks + one empty chair = ten stations.** Pass 1 argued for five agent desks on the grounds that ten would drop touch targets below comfort. That argument was right about the constraint and wrong about the arithmetic: it assumed the eight-station portrait plan (2 wide × 4 deep) had to absorb two more desks, when the honest answer is a different plan. Re-planned at 3 wide × 6 deep (§C.7), ten stations hold **101.3 × 68 CSS px** for the seven agent desks, 320 × 88 for the cabins and 104 × 92 for the chair — every one of them clear of the 44 × 44 floor, the smallest dimension in the set sitting 55% above it. So the count changed and nothing was cut to pay for it. Item 51 also closes Pass 1's own flag: Designer is on the floor, and the studio is not quietly admitting it has no design discipline.

All seven roles are now on the visible floor **and** in the roster text beneath it. The roster is no longer a place to park the two that did not fit; it is the readable, screen-reader-first copy of the same list, in the same order, which is what §6's semantic-first requirement wanted in the first place. The station count does **not** change between breakpoints — one DOM list, two CSS arrangements.

**Desk-to-gate table, with the human who owns each gate** (item 19). This is what makes the scene legible as a pipeline rather than as a mascot lineup: every agent's card names a gate, and every gate now names a person.

| # | Desk | Gate it feeds (COPY.md §2.4) | Human who owns that gate (item 19) |
|---|---|---|---|
| 1 | Spec Writer | Architecture review | **Sahib** |
| 2 | Designer | `[COPY NEEDED: Designer's checking gate, ≤ 3 words. COPY.md §2.4 says "Design review"; item 42 mapped design review onto architecture review when Designer was off the floor. Now that the desk is visible its card needs a gate that is either its own or honestly shared.]` | Follows from the gate |
| 3 | Programmer | Human code review | **Sahib and Tanya** |
| 4 | Test Engineer | QA pass, on real devices | **Tanya** |
| 5 | Security Auditor | Security and privacy review | **Tanya** |
| 6 | Reviewer | Human code review | **Sahib and Tanya** |
| 7 | Release Watcher | `[COPY NEEDED: Release Watcher's checking gate, ≤ 3 words. COPY.md §2.4 says "Release gate"; item 42 mapped the release gate onto the empty chair's Ship approval. With this desk visible, the two now collide on the same floor and Copy has to separate them — the chair is the decision to ship, the Release Watcher's gate is whatever checks what happens after.]` | **Sahib** owns the release cut |
| — | Ship approval (the empty chair) | — the gate itself, unowned by any agent | **Sahib** cuts the release; the card names no worker |

Two notes on that table. **First**, item 19 gives Tanya the product spec while the Spec Writer's checking gate is architecture review, which is Sahib's. That is not a contradiction and the card should not try to resolve it in one line: the spec is written, Tanya owns what it says the product is, Sahib owns whether the shape survives. It is flagged in §I because the two-owner case may want a card treatment rather than a copy fix. **Second**, two of the seven gates are `[COPY NEEDED]` rather than guessed. Both are genuinely copy decisions — the gate names are Copy's vocabulary and the Release Watcher / empty chair collision is a narrative problem, not a layout one — and the card slot's geometry is identical whichever way they land.

The order of the table is **COPY.md §2.4's pipeline order** — spec, design, code, tests, scan, review, watch — and it is the order used by the plan below, by the DOM and by the tab order in §C.8. Copy owns the pipeline narrative and the narrative is the argument, so the design follows it, including where it puts Release Watcher last and therefore nearest the chair.

### C.3 Composition — plan

ASCII cannot honestly draw isometry, so this is the **plan** (top-down). The projection maps plan-x to screen right-down and plan-y to screen right-up; the near corner of the plan is the bottom of the screen.

**Wide plan, 6 modules wide × 5 deep (scene box 856 × 520, drawn 1:1 at ≥ 1440; it runs down to 768, not to 1024 — §C.7):**

```
  back-left ─────────────────────────────────────────────────────── back-right
       A        B        C        D        E        F
   ┌────────┬────────┬────────┬────────┬────────┬────────┐
 1 │                 │ SPEC   │        │ TEST   │        │   row 1, far
   │   SAHIB CABIN   │ WRITER │   ·    │ ENGIN. │   ·    │
   ├      2 x 2      ┼────────┼────────┼────────┼────────┤
 2 │      (§C.4)     │        │ PROG-  │        │RELEASE │   row 2
   │                 │   ·    │ RAMMER │   ·    │WATCHER │
   ├────────┬────────┼────────┼────────┼────────┼────────┤
 3 │                 │ DESI-  │        │ REVIEW │        │   row 3
   │   TANYA CABIN   │ GNER   │   ·    │ -ER    │   ·    │
   ├      2 x 2      ┼────────┼────────┼────────┼────────┤
 4 │      (§C.4)     │        │ SECUR. │        │        │   row 4
   │                 │   ·    │ AUDITOR│   ·    │   ·    │
   ├────────┬────────┼────────┼────────┼────────┼────────┤
 5 │        │        │        │        │        │ ┌────┐ │   row 5, near
   │   ·    │   ·    │   ·    │   ·    │   ·    │ │CHAIR│ │
   │        │        │        │        │        │ │ ☐   │ │
   └────────┴────────┴────────┴────────┴────────┴────────┘
  front-left ──────────────────────────────────────────── front-right
                                                     ▲
                              the whole of row 5 is empty except this
```

**Round 12 re-assigns the seven roles to the same seven modules, because the wide plan read its own pipeline backwards on screen.** Review item H4, measured off `floor-1440-light.png` against this section's own projection: the previous assignment put Security Auditor and Release Watcher at screen x 396, Spec Writer / Programmer / Reviewer at 524, and Designer and Test Engineer at 652, so the two lower screen rows read left-to-right as **5 · 3 · 2** and **7 · 6 · 4**. A visitor reading the labels across got Security Auditor → Programmer → Designer. The build rendered this section's coordinates exactly; **the defect was in the plan, and it is mine.** The DOM, the tab order, the roster sentence and the portrait plan at 360 all ran forwards; only the wide plan ran backwards.

**The fix is the assignment, and nothing else moves.** The projection maps plan (c, r) to screen x `396 + 64(c − r)` and screen y `72 + 32(c + r)`, so the plan's own row-major order is *not* the screen's row-major order — and the screen is what is read. **The seven occupied modules are unchanged** (C1, C3, D2, D4, E1, E3, F2 — the same set, the same checkerboard parity, the same footprint), so every coordinate, button box, target size, clearance proof and scale figure in this section holds without recomputation. Only which nameplate sits on which module changes:

| Pipeline order (COPY §2.4) | Module | Screen centre (x, y) | Screen row | Was |
|---|---|---|---|---|
| 1 Spec Writer | C1 | (524, 200) | 1 | C1 — unchanged |
| 2 Designer | C3 | (396, 264) | 2, left | E1 |
| 3 Programmer | D2 | (524, 264) | 2, middle | D2 — unchanged |
| 4 Test Engineer | E1 | (652, 264) | 2, right | F2 |
| 5 Security Auditor | D4 | (396, 328) | 3, left | C3 |
| 6 Reviewer | E3 | (524, 328) | 3, middle | E3 — unchanged |
| 7 Release Watcher | F2 | (652, 328) | 3, right | D4 |

Read across the screen, top to bottom, the room now says **1 / 2 · 3 · 4 / 5 · 6 · 7** — COPY §2.4's order exactly, which is what mechanism 5 has always claimed and what the portrait plan at 360 already did. **Two plate clearances re-checked** because the two widest strings moved: `Release Watcher` (~107px at 13 units) now sits at x 652, so it runs 598.5–705.5 — 18.5 clear of the Reviewer button's right edge at 580 and 74.5 inside the floor's right corner at 780; `Security Auditor` (~114px) at x 396 runs 339–453, 15 clear of the Reviewer button's left edge at 468. Both were already inside the 76-unit box margin this section sized for exactly these two strings.

The seven agent desks sit on a checkerboard through columns C–F, rows 1–4, and read **row-major on screen in COPY.md §2.4's pipeline order**. The checkerboard is not decoration — it is what keeps a neighbour within one module of every agent desk, which is the condition mechanism 3 below depends on, and it is preserved exactly because the module set did not change.

Scene arithmetic, so the box is not a guess: at 2:1 isometry with 128 × 64 modules, a 6 × 5 plan projects to (6+5) × 64 = **704px wide** and (6+5) × 32 = **352px tall** on screen. The cabin walls add ~40 above the floor's back edge and the pendant's cord and cone hang *above the chair*, which is the near-front cell, so they do not extend the drawn room upward: the drawn room is **704 × 392**.

**The wide scene box is 856 × 520, and the room draws at 1:1 inside it.** 704 + 76 each side = 856; 392 + 64 each side = 520. The 76 is not slack: the nameplates now sit on their own modules (below), and the widest of them — `Release Watcher`, `Security Auditor` — overhang their module's 128 by up to 51 at each end, and the focus ring adds 8 beyond a button's box. The 64 vertical carries the same overhang at the back wall and the chair's contact shadow at the near corner. **520 is the same height as the portrait box (§C.7), so the scene's vertical footprint does not change when the plan switches at 768.** The old 792 × 560 is withdrawn: it was 88 too narrow for the plates and 40 too tall for a room whose lamp hangs over its nearest cell, and the review measured its consequence at 1440 (item 6).

**Where the box sits, and how it scales.** The box's **right edge is the card slot's left edge**; its left edge is where the floor section's full bleed allows it to go, because what sits in that margin is empty scene and never a mark. At ≥ 1440 the box is capped at 856 and the room draws at **1:1** — the room stops growing where the page stops growing (§B.5's 1320/1200), and 1440 and 1920 are the same picture. Below 1440 the box takes what is left between the section's bleed limit and the slot, and the whole scene scales as one unit.

| Viewport | Scene box, CSS px | Scale | Agent desk | Cabin | Chair | Smallest target |
|---|---|---|---|---|---|---|
| 1920 | 856 × 520 (x 320 → 1176) | 1.000 | 112 × 56 | 128 × 136 | 128 × 88 | **56** |
| 1440 | 856 × 520 (x 80 → 936) | 1.000 | 112 × 56 | 128 × 136 | 128 × 88 | **56** |
| 1024 | 682 × 414 (x 0 → 682) | 0.797 | 89 × 44.6 | 102 × 108 | 102 × 70 | **44.6** |
| 768 | 704 × 428, stacked, full content width | 0.822 | 92 × 46.1 | 105 × 112 | 105 × 72 | **46.1** |
| < 768 | portrait plan, 320 × 520 | 1.000 | 101 × 68 | 320 × 88 | 104 × 92 | **68** |

1024 is the tightest point on the site: cols 1–8 is 610, the gutter it may borrow is 24 and the section's left outer margin is 48, so the box gets 682 and the smallest target lands at **89 × 44.6** — 0.6px of margin over the floor, stated rather than rounded up. It is tight because 1024 is the width at which the side-by-side card arrives (§C.6, §B.5) and the room pays 22px for it. That is the one place the room does not grow with the viewport, and it is a trade the visitor can see, unlike a room that shrinks into a void. **If the built page measures below 44 at 1024, the fix is the scene's left bleed or the box's 76-unit margin — never the target, never the station count, and never the side-by-side** (§C.10's cut order and §B.5 both say so).

Desktop touch and pointer targets, in scene units: agent-desk buttons **112 × 56**, cabin buttons **128 × 136**, the chair **128 × 88**. **The 232 × 148 this section used to print was wrong and is withdrawn.** Two 2 × 2 cabins one module apart project to centres 128 apart in x and 64 in y, so any pair of buttons wider than 128 overlaps and the nearer one steals the farther cabin's clicks; at exactly 128 the x separation equals the sum of the half-widths and no overlap is possible whatever the height, which is what makes 136 free. Both dimensions clear 44 by a wide margin at every breakpoint in the table above.

**Buttons are centred on the drawn station, not on the plan module.** A desk is 104 units tall and its button is 56, so where those 56 land decides whether a pointer on the monitor hits the desk it is over; centred on the module, the monitor sits outside its own target. A target that does not contain the thing it names is not a target, and the module centre is an accident of the projection rather than a design decision.

**Nameplates sit on their own module.** Each plate is set horizontally on the **near half of its own station's module**, inside its own button and nearer its own station than any other. This is the checkerboard's constraint, not a preference: a desk and the desk behind-left of it share a screen x and are 64 apart in y, so a plate set *above* a desk lands squarely inside the button of the desk behind it. Below, it is inside its own hit target with 8 units of clearance to the next button's leading edge. No plate is printed across its station's artwork — text beside the thing, never on it.

**The projection, written down once so the coordinates below are reproducible.** In the 856 × 520 box, module (c, r) — c = 1…6 for columns A–F, r = 1…5 for rows 1–5 — centres at **(396 + 64(c − r), 72 + 32(c + r))**. That puts the floor's back vertex at y 104, its near vertex at y 456, its left corner at x 76 and its right at x 780: 704 × 352 with the 76 and 64 margins above.

**The two cabin plates follow the same rule, horizontally, on their own cabin floor** (§C.4 — the wall-mounted skewed plate is removed). The cabins' 2 × 2 footprints centre at (396, 168) for Sahib and (268, 232) for Tanya in the 856 × 520 box, and their 128 × 136 buttons — centred on the artwork, which the 40-unit walls lift 20 above the footprint — run **x 332–460, y 80–216** and **x 204–332, y 144–280**. Sahib's plate is the one the review found inside Tanya's button, because it was hung on his left wall, which faces down-left straight into her cabin. It moves to the near face of his own cabin floor:

| Plate | Centre | Box, 15px Anek 600 | Inside its own button | Nearest other button |
|---|---|---|---|---|
| Sahib Singh | **(396, 204)** | x 358.5–433.5, y 196–212 | yes, 4 clear of its bottom edge | Tanya's, x ≤ 332 — **26 clear**; Security Auditor's, y ≥ 236 — 24 clear |
| Tanya Jain | **(268, 268)** | x 234–302, y 260–276 | yes, 4 clear of its bottom edge | Sahib's, x ≥ 332 — 30 clear |

**No plate renders below 13 CSS px** (§B.4's smallest step). The scene scales and its text scales with it, so the plate's `font-size` is expressed in scene units per breakpoint to land on the same rendered size: 13 units at ≥ 1440, 16.3 at 1024, 15.8 at 768, 13 in the portrait plan. Cabin plates take the step above, 15px rendered, at every width.

**How the eye is led to the empty chair — five mechanisms, all free, all unchanged by the count going from eight stations to ten:**

1. **It is the only station that does not move.** Every other station has a monitor glow on a slow idle loop. The chair does not. In a moving field, the still thing is what you look at (principle 4). This is the whole trick and it costs nothing. Nine idling stations make it work *better* than seven did.
2. **It is the only lit thing.** A pendant lamp above it casts a cone in `--lamp` onto the chair and the floor immediately around it, and that cone is the room's only chromatic mark: `--lamp` appears nowhere else in the scene — not in the cabins, not on a prop, not on a painting, not on a nameplate — so in a room drawn entirely in `--floor` and `--chalk`, the one place colour lands is the one place nobody sits. (Round 10 withdraws the claim that this is the largest area of accent colour on the site; the mechanism is the cone's uniqueness inside the scene, and a comparison against marks outside the scene is neither true nor needed.)
3. **Emptiness around it.** Row 5 is otherwise completely bare — **five** empty modules to its left, up from four in the eight-station plan, plus F4 empty directly behind it. Every other station has a neighbour within one module. From A.3: one thing is allowed to be loud, and it earns it with the space around it. The bigger room bought the chair more isolation, not less.
4. **It is nearest.** Front-right in an isometric projection is the closest cell to the viewer and renders largest.
5. **It is downstream.** Reading the room as a pipeline, work moves back-to-front and left-to-right **on screen** — round 12's re-assignment above is what makes that sentence true rather than aspirational — and it reads in COPY.md §2.4's order exactly, terminating at the chair, which is nearest the viewer and downstream of every station. The two cabins in columns A–B are open on their near and right sides so both occupants' monitors face across the room toward it.

**The chair has to be identifiable as a chair, and at 250ms it is not.** Review item H5, `lightson-1440-250ms.png`: before the cone comes up the chair is a lit slab over a small dark box — no back, no legs, no silhouette, at any width. The card that opens on it says "This chair stays empty" about an object nobody can name, and §B.12's whole favicon argument is that "the chair is implied by what the cone points at", which requires the thing being pointed at to be a chair. Step 3 raised this, run B raised it again, and it is a drawing problem this section never specified. **It is specified now: `#fl-chair` carries three parts, not one — a seat plane, a back panel standing at the far edge of the seat at roughly 0.6 of the seat's depth in height, and a visible support beneath the seat**, all in the room's existing `--floor` / `--chalk` vocabulary with the §C.1 light from upper-left, so the back's near face is the lit one and the support reads in shade. No new token, no new gradient, no additional `<symbol>` beyond the parts of the one that already exists. **The acceptance test is the 250ms frame, not the finished frame**: at `lightson-*-250ms.png`, with the cone absent, the object must be nameable as a chair at every width in both schemes.

**And below 768 the chair's nameplate must come off the cone.** At 360 and 390, `Ship approval` sets across the cone — chalk@72% on `--lamp`, roughly **1.6 : 1**, the least legible text on the page, at the width that carries 80%+ of the traffic. §C.3 is explicit that text goes *beside* the thing and never on it, and §C.7's portrait rule puts every plate in the top 20 units of its own button, which is precisely the band the cone rises through. The cone is the mark and it does not move. **The chair is the one exception to the portrait plate rule: its plate sets in the bottom 20 units of its own button, below the cone's pool, on `--floor`.** The disjointness proof the portrait rule rests on is untouched — a rectangle inside one member of a disjoint set is inside no other, and top or bottom does not enter that argument — and the plate returns to chalk@72% on `--floor`, the same contrast every other plate in the room gets.

### C.4 Human cabins vs agent desks

They must read as the same room but not the same class of thing. §6: humans get "more detail and warmth", agents are "deliberately more schematic". Item 52 makes the human stations **cabins** — a room inside the room — each with persona-specific items and a wall piece.

| | Human cabin | Agent desk |
|---|---|---|
| Footprint | **2 × 2 modules** (256 × 128 scene units in plan) | 1 × 1 module |
| Enclosure | Two waist-high partition walls on the **far and left** plan edges, 40 scene units tall. Open on the near and right sides so the camera sees straight in. **No ceiling and no fourth wall** — a cabin that closes is a box, and a box has no contents. | None |
| Silhouette | Bespoke geometry per person: the two walls, a floor patch in a slightly lit fill, the wall piece, and two props. Desk, monitor and chair are the **shared sub-symbols**, `<use>`d, not redrawn. | One shared `<symbol>`, instanced **seven** times with only a translate. Identical to each other on purpose. |
| Chair | Present, occupied, pulled out at a slight angle | Present, pushed in, square to the desk |
| Nameplate | Name in `--chalk`, title case, Anek 600, **set horizontally on the near half of the cabin's own floor, on the same baseline treatment as every other plate in the room** (§C.3 for the coordinates) | Role in `--chalk` @72%, Instrument 600, one step smaller, **on the near half of its own module** (§C.3) |
| Detail budget | **≤ 16 bespoke path segments per cabin, plus 3 shared `<use>`s.** See the accounting note below. | ~9 path segments, shared once across all seven |
| Warmth | The cabin floor patch and desk top take the same lit fill at 22% as every other surface in the room. **The warmth is the interior, not a tint:** the two walls take the shadow fill on their right faces, so a cabin has a lit floor with a shaded inside edge and an agent desk has neither. *(Round 13: the "6% warm offset toward `--lamp`" this row asked for since Pass 1 is **deleted**. See the note below.)* | Neutral lit fill only |
| Glow | **One** glow rectangle, on the main monitor only. Sahib's portrait monitor is drawn dark. | One glow rectangle |

The distinction is carried by **enclosure, footprint, uniqueness and occupancy**, in that order. Not by colour, and not by size alone — seven identical things next to two rooms is the read, and it is the honest one.

**The 6% warm offset is deleted — round 13, and it is closed rather than deferred.** It has been carried as an open item since run A, reported unbuilt in every engineering pass since, and ruled against once already by the step-2 review ("the four-fill line wins"). It was a **fifth fill value in a scene §C.1 and §C.10 both cap at four**, spent on a difference the same row calls "below the threshold at which it reads as a colour" — which is the definition of a value that costs a fill and buys nothing. It also cuts against the sentence directly above it: the distinction is enclosure, footprint, uniqueness and occupancy, *not colour*, and a warm tint on the two human surfaces is exactly the pastel-for-the-humans move §9.4 bans one step down. **Four fills is the line; the offset is out of the spec, and it stops appearing on anyone's open list.**

**The wall-mounted, skewed door plate is removed** (step 3's "remove one thing", §J). It was the only skewed type on the site, the only nameplate treatment that changed between breakpoints — `matrix(1 -0.5 0 1 0 0)` at ≥ 1024, plain horizontal below 768, so the two widths disagreed about what the object was — the least legible text on the page, and at ≥ 1024 it put "Sahib Singh" inside Tanya's button. It costs nothing to lose: the four distinctions above are enclosure, footprint, uniqueness and occupancy, and none of them is the plate. **One room, one nameplate treatment, one baseline, at every width.**

**The props.** Two per cabin plus one wall piece, all `[APPROVE: prop list]` in §I. They are **decor, not facts**: none of them is a claim, none carries text, and removing any one of them changes nothing the site asserts. They are chosen against item 19's personas and then deliberately crossed so the pair cannot be read as the split §9.4 bans.

| | Sahib — the CTO cabin | Tanya — the CEO/product cabin |
|---|---|---|
| Wall piece | **A whiteboard**: three boxes and two connecting lines, an architecture sketch. 5 path segments, `--chalk` strokes on a lit ground, **no text** — text on a whiteboard at this scale is either unreadable or a lie. | **A painting**: one frame, a two-band abstract composition inside it, 3 path segments, `--chalk` at two opacities. No image, no texture, nothing representational. |
| Prop 1 | **A second monitor turned portrait**, beside the main one — the code-review posture. Drawn dark, so it adds a silhouette and no light. 2 segments. | **A device shelf**: three phones standing on a small riser beside the desk — the real-device QA bench. 4 segments. |
| Prop 2 | **A desk plant** in a small pot. 4 segments. The one organic silhouette in the room. | **A stack of three books** on the desk's left edge, spines to the camera. 3 segments. |
| Maps to (item 19) | architecture review, code review, the release cut | device QA, security and privacy, product spec |

**The §9.4 check, stated because it is the failure this could have walked into.** The warm, soft object — the plant — is on the CTO's desk, and the hardware bench is on the product owner's. The whiteboard is a working surface and the painting is not, which puts the "technical" wall piece on the person who is not the engineer-by-title. Nothing in either cabin is rounder, paler or more decorative than its counterpart, and neither cabin uses a colour the other does not. If a reader can tell which cabin belongs to which person before reading the nameplate, the props have failed and the fix is to swap one, not to add.

**Detail budget, checked rather than asserted.** Sahib's cabin: 2 walls + 1 floor patch + 5 whiteboard + 2 portrait monitor + 4 plant = **14 bespoke segments**. Tanya's: 2 walls + 1 floor patch + 3 painting + 4 device shelf + 3 books = **13**. Pass 1's two bespoke human desks were budgeted at ~14 segments each, so **the cabins are the same geometry budget, spent on walls and props instead of on a placeholder second monitor.** That is the fact that lets §C.10's weight line survive the change, and it is why the budget is ≤ 16 and not "as much as a cabin needs".

### C.5 Idle state — one loop

One loop for the whole scene, on one property.

- **What moves:** the monitor glow rectangle's `opacity`, and nothing else. No transform, no position, no colour change, no scale. Zero layout, zero paint outside the glow rect, composited.
- **Amplitude:** opacity 0.55 → 0.85 → 0.55. ±0.15 around a 0.70 midpoint.
- **Period:** 4800ms, easing `cubic-bezier(.4, 0, .6, 1)` — symmetric, so the loop has no direction and no perceptible "start".
- **Phase:** each station offset by `index × 533ms`. There are now **nine** working stations (seven agent desks plus one glow per cabin), and 9 × 533 = 4797ms fills the 4800ms period without two stations ever sharing a phase. Pass 1's 600ms stagger was sized for seven and would have wrapped two stations into unison at ten. A unison pulse reads as a page-wide effect; staggered pulses read as nine people working independently, which is the point.
- **One glow rectangle per station, nine in total.** Sahib's portrait monitor is drawn dark (§C.4) rather than given a second glow — the loop stays one property on one rect per station, and the budget and the "no jitter" line both hold.
- **The empty chair does not participate.** Its lamp cone is static at full. See C.3 mechanism 1.
- No blink, no cursor, no typing. §6 says "one idle loop, low amplitude, no jitter" and this is the minimum thing that satisfies "reads as working".

### C.6 The interaction card

**Contents**, in this order:

1. Name (human) or role (agent) — Anek 600, title size, `--chalk`.
2. One line of what they do — Instrument 400, body, `--chalk` @72%.
3. **For agents only:** a distinct sub-block, separated by 16px and a 1px `rgba(232,237,233,.16)` rule — the label "Checked by" in micro `--chalk`@72%, then the gate name in Instrument 600 body `--chalk`. §6 is explicit that the flex and the reassurance arrive in the same card and must not be split, so this sub-block is part of the card, never a separate tooltip or a second interaction.
4. **For the two humans:** the *same* sub-block geometry — 16px, the same rule, a micro label, then a list of the gates that person owns, in Instrument 600 body `--chalk`, comma-separated on up to two lines. Sahib: architecture review, code review, the release cut. Tanya: product spec, code review, device QA, security and privacy, ASO. This is item 19's answer rendered where it does the most work: the agent cards say "checked by a human", and the two human cards say which human. `[COPY NEEDED: the field label above the gate list on the human cards, ≤ 2 words — "Checked by" is the agent-card equivalent and this is its counterpart.]`
5. **For the chair:** the Ship approval copy, no worker, no sub-block at all. It is the only card with an absence in it, and the absence is visible because every other card has a block there and this one has empty space.

**Placement — a fixed slot, not a cursor-following popover.** This is a change from PLAN.md §4.3 and it is a visual-judgement call, not a feasibility one (it is also strictly less code — no `popover`, no anchor positioning, no light-dismiss, no focus containment). The Engineer updated PLAN.md §4.3 to the fixed slot in round 3, so the popover and the bottom sheet are out of that document and the two specs do not disagree.

- **≥ 1440:** cols 9–12, **384px** wide (4 × 78 + 3 × 24), vertically centred to the scene, **`min-height: 352px`**.
- **1024–1439:** cols 9–12, **293px** wide (4 × 55.3 + 3 × 24), vertically centred to the scene, **`min-height: 416px`**.
- **768–1023:** below the scene, full content width, **`min-height: 264px`**.
- **< 768:** below the scene, full width, **`min-height: 320px`**. See C.7.

**Round 12 re-derives three of those four, against measurement rather than against arithmetic** (review item H6, `measure-floor.json`). §C.6 computed 392 from *Tanya's* card, before design review and the release cut had owners; COPY §2.3 round 12 put both names on both lists and **Sahib's gate line is now the long one**. Measured with each card forced visible in the slot: at 1024 the tallest card is **Sahib's at 406.7** against a 392 reservation — the reservation was 15px short of its own longest card and PLAN.md §4.3's assertion should have failed the build. At 1440 the two humans tie at **339.2** against 344, which is 4.8px of slack and not the ~13 this section claimed. At 768 the tallest is **251.3** against 344 — 93px of reserved void under a two-line card, which reads as an unfinished panel.

| Breakpoint | Measured tallest card | Reservation | Slack | Was |
|---|---|---|---|---|
| ≥ 1440 | 339.2 (both humans) | **352** | 12.8 | 344 |
| 1024–1439 | **406.7 (Sahib)** | **416** | 9.3 | 392 — **15px short** |
| 768–1023 | 251.3 | **264** | 12.7 | 344 — 93px over |
| < 768 | 313.2 (computed) | 320 | 6.8 | unchanged |

The rule this applies is §C.6's own: *"the fix is the copy or the padding — never a shorter reservation."* Every number above is the measured maximum rounded up to the next 8px step with at least one step of slack, and **PLAN.md §4.3's build-time assertion keeps asserting the measured maximum against 352 / 416 / 264 / 320 and failing the build loudly** if a copy edit overflows. Reserving 93px of nothing is as much a defect as reserving 15px too few; it is just a quieter one.

**The side-by-side arrives at 1024, and it always did.** The slot is beside the scene from 1024 up, at the width §B.5's grid gives cols 9–12 at that breakpoint. It is not held back to 1440, it does not drop below the roster, and it is not narrowed to make room for the plate. **Round 12 changes why.** Round 9 passed the slot on §B.10's prose exemption — the card being a name, a line and a gate list in a container — and run B showed the plate striking through the card's `Owns` line at 768, 1024 and 1440 anyway, because a gate list *is* read as a unit even when it sets as prose. **The exemption is withdrawn and replaced by absence: the plate's wrapper does not span the floor section at any width** (§B.10), so no part of this panel is ever under the plate at any scroll position, and §C.6's promise is kept by geometry instead of by an argument about what counts as prose. Any wording that puts this arrangement at 1440, or that defends it with an exemption, is stale and is overruled by this line.

**The floor's two-column layout, restated with the keep-out lane gone** (§B.5, §B.10; step 3 review items 3, 5 and 6). Every number below is on §B.5's one grid at the full content width, and the scene is the width its own column gives it rather than what a lane left over.

| Viewport | Content | Scene box | Card slot | `min-height` |
|---|---|---|---|---|
| 1920 | 1200 (x 360–1560) | **856 × 520**, 1:1, x 320 → 1176 | cols 9–12, **384**, x 1176–1560 | 352 |
| 1440 | 1200 (x 120–1320) | **856 × 520**, 1:1, x 80 → 936 | cols 9–12, **384**, x 936–1320 | 352 |
| 1024 | 928 (x 48–976) | **682 × 414**, x 0 → 682 | cols 9–12, **293**, x 682–976 | 416 |
| 768 | 704 | **704 × 428**, below the intro, full width | below the scene, full width **704** | 264 |
| < 768 | 320 / 350 | portrait plan, **320 × 520** (§C.7) | below the scene, full width | 320 |

The slot's widths, its reservations and its cols 9–12 position are **unchanged** by this round — the lane never gave the slot anything, it took from the scene. What changes is the room: it was rendering 654 × 462 at 1440 and 700 × 495 at 1024, which is smaller at the larger width, and it now renders 856 × 520 at both 1440 and 1920 with the whole card beside it. The scene box's transparent right margin (76 units, 76px at 1:1) meets the slot's left edge with no gutter drawn between them, and the optical air between the room's right corner and the card's first character is that 76 plus the slot's own 24 of padding — 100px at 1440.

**The slot has no container.** It is a reservation, not a box: no border, no outline, no fill, no radius, no shadow. §C.6 specifies contents and a min-height and has never asked for a frame, and a 1px rule drawn round a 344px reservation converts invisible space into a visible empty container — on the two human cards, which carry no `Checked by` block, roughly 45% of it is ruled-off emptiness. It would also be the only outlined rectangle on the site, which is the SaaS-card-kit tell §9.4 bans by name. The card's own internal 1px rule above `Checked by` stays; that one separates two things and carries meaning. See §J, where this is `/`'s pre-committed cut.

**The ≥ 1440 min-height, derived rather than reserved-in-the-abstract.** PLAN.md §13 item 1 and §4.3 ask for this number so the Engineer does not have to invent one or measure it at build time. It is computed from the longest card at §B.4's ≥ 1024 type sizes, in the 366px slot with 24px padding — a 318px measure, which at Instrument Sans 17px (average advance ≈ 0.49em ≈ 8.33px) holds **≈ 38 characters per line**.

The longest card is **Tanya's**, not an agent's, because the human cards gained the gate-ownership block above: COPY.md §2.3's body is 154 characters → 5 lines, and her five gates set to 2 lines.

| Part | Metric | Height |
|---|---|---|
| padding-top | | 24.00 |
| Name, title 22px / 1.2 | 1 line | 26.40 |
| gap | | 8.00 |
| Body, 17px / 1.62 | 5 lines | 137.70 |
| gap + rule + gap | 16 + 1 + 16 | 33.00 |
| Field label, micro 13px / 1.45 | 1 line | 18.85 |
| gap | | 4.00 |
| Gate list, 17px / 1.62 | 2 lines | 55.08 |
| padding-bottom | | 24.00 |
| **Total** | | **331.03** |

Rounded up to the 8px grid that gave **344px** — and round 12 supersedes it with the measured number, **352px**, because the derivation above was run against Tanya's card and COPY §2.3 round 12 made Sahib's gate line the long one. The arithmetic is kept because it is the method; the table above is the answer.

**At 1024 the same slot is narrower and the reservation is not the same number.** Cols 9–12 at 1024 is 293px, a 245px measure, ≈ **29** characters a line against the 38 above. Tanya's card computes to 386.11 there — 6 body lines and 3 gate lines rather than 5 and 2 — which is where 392 came from; **Sahib's measures 406.7, so 1024–1439 reserves 416** (table above). The narrower column costs height, not the arrangement, and it costs it in a reservation rather than in reflow. 29 characters is also the narrowest measure this document tolerates for a card, which is the number §G.3's core is now held above (§G.3, item T4). This is the honest price of the side-by-side at 1024 and it is cheaper than the alternatives, both of which were tried and rejected: dropping the slot below the roster renders a 700 × 344 void, and taking width off the grid re-grids five sections (§B.5, §B.10). Security Auditor — the longest agent card, 160 characters of body over 5 lines plus a one-line gate — computes to ~306, so it sits 38px inside the reservation. At 360 the same arithmetic with §B.4's mobile sizes (title 20/1.2, body 16/1.62, 280px measure ≈ 35 ch/line) gives 313.15 → **320px**. Pass 1's §C.7 wireframe said 168, which was simply wrong: the chair's own four-line card already computed to ~180 at 360, so the reservation had never been checked against the copy. It is now.

**This number does not remove the build-time assertion.** 38 characters per line is an estimate of Instrument Sans's average advance, not a measurement, and one extra wrapped line is 28px. PLAN.md §4.3's script should keep asserting the measured maximum against **352, 416, 264** and 320 at their breakpoints and **fail the build loudly** if a copy edit overflows, rather than the value being quietly raised. If it does overflow, the fix is the copy or the padding — never a shorter reservation.
- **Default content at every breakpoint: the empty chair's card.** Nobody has to interact to receive the argument. This is the single highest-value decision in the floor spec, because most visitors will not touch anything.
- Hover, focus and tap all replace the slot's content, identically, in the same place. Nothing important is behind a hover (principle 3).

### C.7 Mobile decision: **tappable floor, portrait re-plan, panel below**

**Decision: a tappable floor with the card panel pinned directly below the scene. Not a vertical roster, and not a bottom sheet.**

Why not a vertical roster: the floor is the one bold moment on the site, and 80%+ of traffic is mobile. Throwing the moment away on the viewport where it matters most is exactly the "reduced, not designed" outcome §6 forbids.

Why not a bottom sheet (PLAN.md §4.3's default): a sheet covers the room, so you cannot see the desk you just tapped while reading its card; dismissing it costs a gesture; and it means the default state on load is "no card", which throws away the free argument in C.6.

Why not shrink the desktop plan to fit: 6 modules across 320px gives ~53px desks. Below a comfortable target and illegible.

**The switch is at 768. The wide plan runs at ≥ 768; the portrait plan runs below it.** Not below 1024. The premise for below-1024 was that the floor sat inside the contact plate's keep-out lane and had 460 of 704 to draw in — and the lane was withdrawn entirely by the step 2 review and is forbidden in terms by §B.5. With it gone, 768's content width is 704, which is the wide room's own projected width to the pixel, and §C.3's box scales into it at 0.822: agent desks **92 × 46**, cabins 105 × 112, the chair 105 × 72, every one of them past 44 × 44. (The review's estimate of ~100 × 50 assumed a box with no margins; the real box carries 76 units of plate overhang each side, which costs the 4px.) 46 is the tightest the wide plan ever gets, and it is still 5% clear. The plan swap is a **layout** decision — below 768 a 6-module room is 53px a desk and unreadable — and it is taken at the width where that becomes true.

**The move:** the same **ten** stations are re-planned into a **portrait room, 3 modules wide × 6 deep**, scene **320 × 520** — the same height as the wide box (§C.3), so the section does not jump when the plan switches. Same `<symbol>`s, same DOM, same order, different `<use>` transforms and `viewBox` — a layout change, not a content change.

**The two cabins span the full three-module width** and take the top two rows. That is not a compromise, it is the humans-first read made structural: at 360 the two largest objects in the room are the two people's rooms, they are the first thing on screen, the first thing in tab order and the first thing a screen reader meets. The seven agent desks then run 3-up beneath them in pipeline order, read row-major, and the chair sits alone at the bottom-right.

**The module grid, re-derived.** Three columns of **101.3** with two 8px gaps fill the 320 box exactly (3 × 101.3 + 16 = 320). Six rows: the two cabins span all three columns, three rows of agent desks run 3-up beneath them, and the chair takes the near-right cell of the last row. Every button carries its own **20-unit plate band across its top**, above the station's artwork and inside its own target (below), which is where the extra 4px of row height went.

| Row | y | Height | Contents |
|---|---|---|---|
| 1 | 0 | 88 | Sahib's cabin, x 0, **320 × 88** |
| — | 88 | 8 | |
| 2 | 96 | 88 | Tanya's cabin, x 0, **320 × 88** |
| — | 184 | 12 | |
| 3 | 196 | 68 | Spec Writer x 0 · Designer x 109.3 · Programmer x 218.7, each **101.3 × 68** |
| — | 264 | 8 | |
| 4 | 272 | 68 | Test Engineer x 0 · Security Auditor x 109.3 · Reviewer x 218.7 |
| — | 340 | 8 | |
| 5 | 348 | 68 | Release Watcher x 0. **c2 and c3 empty** — the lamp's cord and cone rise through c3, over floor and not over a station |
| — | 416 | 12 | |
| 6 | 428 | 92 | **c1 and c2 empty**; Ship approval, x 216, **104 × 92** |

**Height arithmetic**, so 520 is derived and not chosen: 88 + 8 + 88 + 12 + 68 + 8 + 68 + 8 + 68 + 12 + 92 = **520**. The scene renders 1:1 at 360 and 390 — 320 units wide, centred in the content (x 20 at 360, x 35 at 390) — so every number above is a CSS pixel at both widths, and the two widths are the same picture.

**The nameplate rule for the portrait plan: the plate sits at the top of its own button, above its own station's artwork, never below it.** This is the opposite of the wide plan's rule and it is opposite for a reason: "below" is forced on the checkerboard by the occlusion of the desk behind-left (§C.3), and a 3-up orthogonal grid has nothing behind-left to occlude. Each plate is centred on its button's x-axis inside the button's top **20 units** — box y `top + 2` to `top + 18`, 13px micro, the artwork taking the remaining 48 (agents), 68 (cabins) or 72 (the chair).

**Why no plate can land in another station's target, at 360 and at 390.** Every plate lies wholly inside its own button's top band, and the ten buttons are pairwise disjoint — 8 units between columns, 8 or 12 between rows. A rectangle inside one member of a disjoint set is inside no other member. That is a proof and not a screenshot, which is what the previous rule lacked: with plates drawn *below* their stations, nine of the ten sat inside a neighbour's target at 360 and 768, the focus ring on Spec Writer was drawn around a box labelled "Test Engineer", and "Tanya Jain" and "Designer" abutted at a 0px gap and read as one two-line label saying that Tanya Jain is the Designer. Under this rule Tanya's plate sits at y 98–114, at the top of her own 88-unit cabin, and Designer's at y 198–214, at the top of its own desk — 84 units of cabin, gap and desk between two labels that used to touch.

**Targets, and the honest numbers.** Agent desks: **101.3 × 68 CSS px**. Cabins: **320 × 88**. The chair: **104 × 92** — the largest agent-class target in the room, because it is nearest and because it is the one thing the whole scene is pointing at. **The smallest target anywhere in the portrait set is 101.3 × 68, and 68 is 55% above the 44 × 44 floor.** It is 4px taller than the previous plan's 64 because the plate came inside the button; the plate rule bought target height rather than costing it. This is the number I can hold, and it is stated rather than rounded up.

**360 wireframe of the floor section:**

```
┌────────────────────────────────────────┐ 360
│▓▓▓▓▓▓▓▓ --floor, full bleed ▓▓▓▓▓▓▓▓▓▓▓│
│▓                                      ▓│
│▓  Two desks have people at            ▓│  display-section 27px --chalk.
│▓  them. The rest are agents.          ▓│  COPY.md §2.2 verbatim, four lines
│▓  One chair stays empty on            ▓│  at 320 (see §B.8 for the count).
│▓  purpose.                            ▓│  [COPY NEEDED, <=12 words]
│▓                                      ▓│  16
│▓  Open any desk to see the job and    ▓│  instruction line, body 16/26,
│▓  the human who checks it.            ▓│  chalk@72%, two lines.
│▓                                      ▓│  32
│▓  ┌──────────────────────────────┐    ▓│  scene 320 x 520
│▓  │ plan: 3 wide x 6 deep        │    ▓│  (drawn here as plan, not iso)
│▓  │ ┌──────────────────────────┐ │    ▓│
│▓  │ │      SAHIB  CABIN        │ │ r1 ▓│  the two CABINS span the full
│▓  │ │      ▓▓▓▓▓▓▓▓▓▓▓▓        │ │    ▓│  width, 320 x 88 each. the two
│▓  │ ├──────────────────────────┤ │    ▓│  people are the largest objects
│▓  │ │      TANYA  CABIN        │ │ r2 ▓│  in the room, first on screen,
│▓  │ │      ▓▓▓▓▓▓▓▓▓▓▓▓        │ │    ▓│  first in tab order
│▓  │ ├────────┬────────┬────────┤ │    ▓│
│▓  │ │ SPEC   │ DESI-  │ PROG-  │ │ r3 ▓│  seven agent desks 3-up at
│▓  │ │ WRITER │ GNER   │ RAMMER │ │    ▓│  101 x 68, read ROW-MAJOR in
│▓  │ ├────────┼────────┼────────┤ │    ▓│  COPY.md §2.4's pipeline order
│▓  │ │ TEST   │ SECUR. │ REVIEW │ │ r4 ▓│
│▓  │ │ ENGIN. │ AUDITOR│ -ER    │ │    ▓│
│▓  │ ├────────┼────────┼────────┤ │    ▓│
│▓  │ │RELEASE │        │        │ │ r5 ▓│  the chair keeps its isolation
│▓  │ │WATCHER │   ·    │   ·    │ │    ▓│  and gains some: FOUR empty
│▓  │ ├────────┼────────┼────────┤ │    ▓│  modules adjacent (r5 c2-c3,
│▓  │ │        │        │ ┌────┐ │ │ r6 ▓│  r6 c1-c2), nearest to the
│▓  │ │   ·    │   ·    │ │CHAIR│ │ │ ◀─ ▓│  viewer, lit, and still.
│▓  │ └────────┴────────┴─┴────┴─┘ │    ▓│  104 x 92.
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  20
│▓  ┌──────────────────────────────┐    ▓│  CARD PANEL, always visible,
│▓  │ Ship approval                │    ▓│  never an overlay, no dismiss.
│▓  │                              │    ▓│  min-height 320 (§C.6), derived
│▓  │ This chair stays empty. No   │    ▓│  from Tanya's card, the longest.
│▓  │ agent decides that something │    ▓│  default = the chair.
│▓  │ is ready for your users.     │    ▓│
│▓  │ A person does, every         │    ▓│  the selected station keeps a
│▓  │ release, every time.         │    ▓│  persistent selected state in
│▓  └──────────────────────────────┘    ▓│  the scene, so the panel and
│▓                                      ▓│  the room stay connected
│▓  The full pipeline                   ▓│
│▓  Spec Writer, Designer, Programmer,  ▓│  all seven roles, now also all
│▓  Test Engineer, Security Auditor,    ▓│  on the floor. same list, same
│▓  Reviewer, Release Watcher.          ▓│  order, readable form.
│▓                                      ▓│
└────────────────────────────────────────┘
```

At 360 the room is entered from the top where the two people's cabins are, and read downward through the pipeline to the chair. That is the same argument as the desktop plan, told in a portrait room.

**The cost, stated.** Scene 520 + 20 + panel 320 + the intro text (~200) + the roster (~120) puts the floor section at roughly **1180px** at 360 — about 1.8 viewports on a 640-tall screen, up from ~1000 at eight stations. That is a real cost of the owners' count and it is worth paying, because the default card is on screen immediately below the room and no interaction is needed to get the argument. If it turns out to be too much, the fix is the two human card bodies (copy), which are what drove the panel from 168 to 320 — **not** the target sizes and not the station count. Flagged in §I.

### C.8 Keyboard

- **Tab order, ten stops:** Sahib → Tanya → Spec Writer → Designer → Programmer → Test Engineer → Security Auditor → Reviewer → Release Watcher → Ship approval. Humans first, chair last, and the seven agents in COPY.md §2.4's pipeline order — spec, design, code, tests, scan, review, watch. This is DOM order at every breakpoint regardless of visual position, because the order is the argument, and the argument is Copy's to state. Ten stops is two more than Pass 1 and still well under the point at which a keyboard user would want a bypass; the skip link below already jumps the whole section for anyone who does not want it.
- **Focus treatment:** the two-tone ring from §B.2, on the room's surface: 3px `--chalk` outer (12.74 : 1 against `--floor`) + 2px `--lamp` inner, 3px offset, 4px radius, following the desk button's rectangle rather than the desk's silhouette — a ring that traces an isometric parallelogram is illegible at 2px and expensive to draw.
- **Focus is never the only indicator.** A focused desk also takes the selected fill and updates the card slot, exactly as hover and tap do.
- **The selected fill is `--chalk` @ 52%, up from 34% (round 12).** Review item H9: the 34% lift was built exactly and cannot be seen. Pixel-differenced under `reduce` so that only the state differs, `desk-selected-1440.png` against `desk-unselected-1440.png` gives **13.4% of the desk's pixels changed at a maximum channel delta of 27** at 1440 and 3.0% at 360; at 1:1 the two frames are indistinguishable. **The amplitude was my spec's and it was too small.** 22% → 52% roughly doubles the step over the unlit desk top (§C.1's `--chalk` @ 22%) and keeps the selected desk below the monitor glow's 55–85%, so the room's brightest thing is still a screen and not a table. This matters most at < 768, where §C.7 puts the card panel below the scene's fold and the selected desk is the only thing on screen connecting the panel to the room it came from.
- **Acceptance test, because "built to spec and invisible" is the failure this replaces:** the same pixel-difference method, under `reduce`, at 360 and 1440 in both schemes — ~~**≥ 30% of the desk's pixels changed** at~~ a maximum channel delta ≥ 60. If 52% does not reach it, the priced fallback is a **1px `--chalk` top-edge inset on the selected station**, a mark the room already draws elsewhere; the fallback is a second indicator and is taken only on measurement, never in addition on preference.

- **Round 13 records what was measured, takes the fallback, and retires the 30% (review item H9, build run D).** At 52% alone the delta passes and the share does not: **67 light / 69 dark** against the ≥ 60 line, on **15.5% of the station's pixels at 360 and 24.6% at 1440**. The fallback is therefore taken **on measurement, as this bullet requires** — the 1px `--chalk` edge on the selected desk top ships — and with it the delta goes to **106–178** while the share moves only to 16.6% / 25.4%.

  **The 30% was my number and it was a number about the drawing, not about the state.** The only thing that differs between the two frames is the desk's top face, and that face is ~25% of the station's own box at 1440 and ~16% at 360 — the box also holds the monitor, the chair, the shadow faces and the empty scene around them. No fill value and no second mark *on the top face* can move 30% of those pixels, so the test was unreachable by construction and would have stayed red however good the indicator got. **It is replaced, not lowered:**

  > **Acceptance test, round 13.** Under `reduce`, at 360 and 1440 in both schemes, pixel-differencing selected against unselected: **maximum channel delta ≥ 60 on the desk's top face** (met at 67 / 69) **and ≥ 100 on the selected station's 1px `--chalk` top edge** (met at 106–178). The changed-pixel share is **reported, not gated** — it is a property of how much of the station's box the top face occupies, and the Engineer records it (16.6% at 360, 25.4% at 1440) so a future change to the drawing is visible.

- **The selected fill measures 2.36 : 1 in light and 2.61 : 1 in dark against the unlit desk top, and 3 : 1 is not reachable by this mechanism.** `--chalk` @ 52% over `--floor` against `--chalk` @ 22% over the same ground is under the 3 : 1 a meaningful non-text mark wants, and raising the fill does not fix it: at 100% `--chalk` the step is only **4.9 : 1**, and this section caps the selected desk below the monitor glow's 55–85% so the brightest thing in the room stays a screen. That cap is a design decision I am keeping — a table brighter than the screens is a different room — so the ratio is what the cap costs. **The 1px `--chalk` edge is what carries the selected state at full contrast**, which is why it was priced here as the fallback and why it is now shipped rather than optional. `--chalk` on `--floor` is 12.74 : 1 (§B.2), so the edge clears 3 : 1 by four times over, and the state is never carried by fill alone — the same discipline §F.6's map takes with its 2px `--s-ink` border and §E.1's indicator takes with a stroke plus a size difference. The fill is now the *quiet* half of a two-part indicator, and 2.36 / 2.61 is recorded as measured rather than defended as sufficient.
- Skip link above the floor. The floor's roster is reachable and readable in order by screen reader with the SVG `aria-hidden`, per PLAN.md §4.1.
- **Keyboard is not the whole of it.** The same ten buttons must be hit-testable by mouse and by touch on their own boxes, which is §C.11 and which the step 3 build failed at every width while every keyboard path above passed.

### C.9 Reduced motion — the still state

`prefers-reduced-motion: reduce` removes the "Lights on" moment (§H) and the idle loop. It removes nothing else.

The still frame is **designed, not stopped**: each monitor glow renders at a *different* static opacity, so the room reads as nine stations lit slightly differently, which is what a room looks like. A uniform 0.70 across all nine would look switched-off-but-on.

| Station (DOM order) | Static glow opacity |
|---|---|
| Sahib's cabin | 0.84 |
| Tanya's cabin | 0.82 |
| Spec Writer | 0.62 |
| Designer | 0.74 |
| Programmer | 0.68 |
| Test Engineer | 0.80 |
| Security Auditor | 0.64 |
| Reviewer | 0.76 |
| Release Watcher | 0.70 |

Three things about those numbers. **The seven agent values span 0.62–0.80** — the exact amplitude of the live loop — with the midpoint 0.70 present once, so the still frame is a legal frame of the animation rather than a separate design. **They are non-monotonic**: read down the DOM they go down, up, down, up, down, up, down, so no gradient forms across the room and nothing reads as a sequence of brightness. **The two cabins differ from each other** (0.84 / 0.82) — Pass 1 gave both human desks 0.80, which is the same uniformity mistake this section exists to avoid, one level up.

The lamp cone is at full. The card slot still swaps content on interaction, instantly, with no fade and no slide.

Nothing is missing from this frame. It is a finished picture of the same room.

### C.10 Weight strategy — hitting ≤ 80 KB gzipped

The Engineer calls this the tightest line on the site (PLAN.md §7). The composition is built to leave headroom rather than to consume it.

- **Shared symbols.** One `<symbol>` for the agent desk, instanced **7×** with `<use transform="translate(x,y)">`. One for the empty chair. One for a floor module. One each for the desk, monitor and chair sub-parts. Only the two cabins are bespoke geometry, and they `<use>` those same three sub-symbols rather than redrawing a desk, a monitor or a chair.
- **Two plans, one geometry.** The portrait mobile plan (3 × 6) is the *same* symbols at different `<use>` transforms and a different `viewBox`, swapped by CSS at the breakpoint. There is not a second scene, and the ten stations are one DOM list.
- **Four fills, no more** (§C.1). One `<linearGradient>` in total, for the lamp cone.
- **No `<filter>` anywhere.** No `feGaussianBlur`, no `feDropShadow`. Contact shadows are flat opaque parallelograms at a fixed offset. This is both the budget decision and the mobile-paint decision (PLAN.md §10.4).
- **No embedded raster, no base64, no external asset.**
- **Coordinates rounded to one decimal**, integer where possible; a 128 × 64 module grid makes most vertices integral by construction.
- **Text is real DOM text**, never outlined paths — it stays selectable, crisp at any zoom, and translatable.
- **No per-desk bespoke CSS.** Desk positions come from a single `--x` / `--y` custom-property pair per button, set once; the CSS rule is written once. This is aimed at the Engineer's specific concern that per-desk positioning CSS is the biggest unknown in the CSS budget.

**Accounting, re-done for ten stations plus cabin detail.** Pass 1's figures are kept beside the new ones so the cost of the owners' decision is legible rather than absorbed.

| Item | Pass 1 (8 stations) | Round 3 (10 stations, 2 cabins) | Why it moved |
|---|---|---|---|
| Shared `<symbol>` defs (agent desk, chair, floor module, desk/monitor/chair sub-parts) | 2.5 KB | 2.5 KB | One agent-desk symbol however many instances. Seven `<use>`s cost no geometry. |
| Two bespoke cabins | *(inside the line above)* | +1.1 KB | 27 bespoke segments total (§C.4) + 6 `<use>`s. Same segment budget as Pass 1's two human desks, spent differently. |
| Floor slab + seams | 1.0 KB | 1.3 KB | 6 × 5 grid instead of 5 × 4. |
| `<use>` + buttons + nameplates | 3.5 KB | 4.4 KB | Ten stations instead of eight. |
| Server-rendered station cards (markup + copy) | *not counted* | 2.6 KB | Ten `<article>`s. Pass 1 omitted this line entirely; it is counted now because PLAN.md §4.3 renders all cards at build time. |
| Scene-positioning CSS (one rule, `--x`/`--y` per button, two plans) | 4.0 KB | 4.6 KB | Two more coordinate pairs and a taller mobile `viewBox`. No per-desk bespoke CSS in either version. |
| Floor interaction JS | 4.0 KB | 4.0 KB | Unchanged — the `hidden` toggle does not care how many cards there are. |
| **Total, raw** | **~15.0 KB** | **~20.5 KB** | |
| **Total, gzipped** (~38% of raw for SVG/CSS/JS text) | ~5.7 KB | **~7.8 KB** | |

**Against the ≤ 80 KB gzipped line: ~7.8 KB, about 10% of it, with ~72 KB of headroom.** Ten stations plus two cabins cost ~5.5 KB raw / ~2.1 KB gzipped over eight stations — and ~2.6 KB of that raw increase is the card markup Pass 1 never counted, so **the composition itself grew by ~2.9 KB raw.** The line the Engineer called the tightest on the site (PLAN.md §7) remains a wide-margin pass, and `scripts/check-floor-budget.mjs` stays the authority over this table.

**The headroom is still deliberately not spent.** If the floor ever has to shrink, the cut order is: (1) the faint floor-seam lines, (2) the second prop in each cabin, (3) the cabin walls, leaving the cabins as open desks with their props. A station is never the cut, and neither is a target size.

### C.11 Pointer — every station is reachable by mouse and by touch

This was implicit and it should never have been. §C.6 says hover, focus and tap replace the slot's content identically; §C.7's whole mobile decision is the word *tappable*; §B.6 principle 3 says every state a pointer can reach is reachable by tap and by keyboard. None of those sentences says the thing a build can fail: **each of the ten station buttons must be the topmost hit-tested element over its own drawn station, at every breakpoint, in both schemes.** Hit testing is on the button's own box — the same rectangle the focus ring traces and the same one §C.3's target table measures — and nothing may intercept it: not the decorative `<svg>` (it is `aria-hidden` and `pointer-events: none`, which makes it invisible to the pointer, not a lid over it), not a `content-visibility` or `contain` declaration on the section, not a stacking context, a transform, an overlay, a pseudo-element, or a `pointer-events: none` inherited from any wrapper the floor sits inside — including the sticky contact-plate wrapper of §B.10, which is where the step 3 build lost the whole floor to the pointer at every width. A target-size table proves nothing here: it measures rectangles, and the rectangles were correct while `document.elementFromPoint` returned `<main>` at 0 of 9 sampled stations.

**Acceptance test, and it is a test rather than a look:** for each of the ten stations, at 360, 390, 768, 1024, 1440 and 1920, `document.elementFromPoint(cx, cy)` at that station's button centre returns that station's own button (or a node inside it whose `closest('[data-station]')` is that button), and a synthetic `click` at the same point puts that station's card in the slot and its selected state on the station in the room. Ten of ten, at every width, in both schemes, in CI — not a CSS edit checked by eye.

---

## D. Work cards (§6.1)

### D.1 Dimensions

| | 360 | **768** | 1024 |
|---|---|---|---|
| Layout | 1 column | **1 column, left-aligned** | 2 columns |
| Card width | 320 (full content) | **420 (capped)** | 316 |
| Min height | 168 | **196** | 196 |
| Gap | 28 vertical | **28 vertical** | 32 vertical, 32 horizontal |
| Padding | 20 all round, 24 bottom | **24 all round, 28 bottom** | 24 all round, 28 bottom |

The 28px vertical gap is not arbitrary: a 320px card tilted 2.5° overshoots ~7px at each end, so 28px keeps ≥ 20px of real air between cards and stops the tilts from reading as collisions. At 1440 the grid goes to 3 columns at 328 wide.

**The 768 row is new in round 12, and it is a ruling on a question the Engineer recorded rather than invented.** This table had a 360 row and a 1024 row and no 768 row, and the build filled the gap with "full width": a compressed strip card renders **704 × 112** on `/` and a full card renders **710 × 250–330** on `/sahib/` (review items H8 and S3; `home-768-light-full.png`, `sahib-cards-768-light.png`). Two things break at that width, and both are this section's own arguments turned against it.

- **§D.2's stand is 56% of the card width.** On a 710px card the stand is ~398 and the card overhangs its own lip by ~155px at each end, so the object reads as a slab balanced on a wedge rather than as a thing resting on a counter — which §D.2 says is the entire illusion and the reason the shadow pair exists.
- **§D.5's shelf-talker hierarchy needs the date in the price position at the right of a *narrow* object.** At 710px the company and the date sit together at the left with ~500px of white beside them, and the price position stops being a position.

> **Ruled: no work card is wider than 420px, at any width, on any page, in any world — and where the grid gives more, the card is left-aligned in its column and the remaining space is left as space.** 420 is the width at which the stand is 235 (§D.2), the company line still sets on one line at §D.5's 24/28, and the date's right edge is close enough to the company's to be read as the same object. The cap binds only at 768–1023, where the grid runs one column of cards; 360 is 320 by content width, 1024 is 316 by the two-column grid and 1440 is 328 by the three-column grid, all already inside it. This is one number rather than a per-page fix, and it covers the strip on `/`, both person pages, and anything later that uses the card.

### D.2 The base and the contact shadow

The card meets a surface, and the surface is directly beneath it.

- **Stand:** a 4px-tall bar, 56% of the card width, centred, flush with the card's bottom edge, filled `--band` with its lowest 1px at `rgba(15,42,46,.22)`. It reads as the lip of an acrylic holder.
- **Contact shadow:** `0 2px 3px -1px rgba(15,42,46,.38)` — tight, dark, immediately under the stand.
- **Ambient shadow:** `0 10px 24px -12px rgba(15,42,46,.16)` — wide, faint, well below the contact shadow's density.

The ratio between them is the whole illusion: a floating div gets one soft shadow, an object resting on a counter gets a dark tight one plus a faint wide one. Both are `box-shadow`, neither is a filter, neither ever animates.

### D.3 The edge

Real acrylic catches light on its cut edge, and the light comes from upper-left (§B.1).

Two inset box-shadows rather than four borders, so the corners have no seam:

- `inset 1px 1px 0 rgba(255,255,255,.72)` — top and left, lit
- `inset -1px -1px 0 rgba(15,42,46,.14)` — bottom and right, in shade

Corner radius 3px across every card and every hierarchy level on this site. One radius scale, no exceptions — §9.4's SaaS-card-kit ban is partly about radius soup, and 3px is small enough to read as a cut edge rather than as a UI card.

### D.4 Tilt

Under 3°, varied, deterministic by index so it is reproducible and printable. `transform-origin: bottom center`, so the stand stays planted while the card leans.

| Card index | Rotation |
|---|---|
| 1 | −1.4° |
| 2 | +0.8° |
| 3 | −2.1° |
| 4 | +1.7° |
| 5 | −0.6° |
| 6+ | repeat the cycle |

Never animated, at any breakpoint, under any motion preference. It is a layout property (§6.1 says so explicitly). Removed only in print.

### D.5 Typography, mapped to the shelf-talker

```
┌──────────────────────────────────┐
│                                  │
│  Motive                          │  company. Anek 600, 22/26 at 360,
│  Fleet management, US            │  24/28 at 1024. --floor. THE THING.
│                                  │  one line under it: Instrument 400,
│  2023 - 2025                     │  14/20, --muted, <= 38 chars.
│                                  │
│  ──────────────────────────────  │  the number, in the price position:
│  Android Engineer                │  Anek 500, wdth 87.5, tabular,
│  Motive Fleet App                │  24px at 360 / 28px at 1024, --floor.
│  Kotlin                          │  hyphen, not en-dash.
│                                  │
└──────────────────────────────────┘  1px rgba(15,42,46,.12) full width.
      ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁              role: Instrument 600, 13px, --floor.
                                    product: Instrument 400, 13px, --muted.
                                    stack: Instrument 400, 13px, --muted.
```

Four levels, and the order is the shelf-talker's, not a CV's: **company largest → dates in the price position → role and products as small print.** §6.1 is explicit that the title does not go in the price position, because a visitor scanning a work history is scanning for duration.

**One change from §7's source table:** §7 renders products and stack as `Motive Fleet App · Kotlin`. §9.4 bans middle-dot meta strings. On the card they are two lines. The information is identical and the template tell is gone.

Semantics (also PLAN.md §5.5): the cards are a `<ul>` of roles read as company → dates → role → products. Everything above is CSS over that list.

### D.6 Backdrop treatment — option 2, static translucent white, no live blur

§6.1 offers three. **Choose: a static semi-transparent white with an optional fine noise, and no `backdrop-filter` at all.** This matches the Engineer's default (PLAN.md §5.1) and it is the right call on three independent grounds:

1. **Option 3 (blur on hover/focus only) is disqualified by the brief itself.** It means the object's material appears only for pointer users. Touch has no hover (§4), so 80%+ of traffic would see a different object. That is not a perf trade-off, it is a broken design.
2. **Option 1 (one shared blurred layer) still costs a compositing layer that has to be re-rasterised as it scrolls, on the exact pages where a visitor scrolls a column of a dozen cards** — the person pages. The INP risk in §11 is real and this is where it would land.
3. **The illusion does not need it.** §6.1 says three details carry it: a base, an edge, a tilt. All three are in place and all three are free. A live blur would be adding the expensive fourth thing to prop up three cheap things that already work.

Option 2 is also the only one of the three that prints correctly, that is identical under `prefers-reduced-transparency`, and that behaves identically on every device — which matters on a site arguing that it tests on real hardware.

**Spec:** card fill = white at **82%** on light grounds, **90%** on dark grounds (see §F.4 for why). **Round 4: the rule is keyed to the ground, not to the world or to the theme name** — any backdrop with L below ≈ 0.09 takes 90%, anything above takes 82%. That one sentence covers all six palettes without a per-world exception: the studio's dark sheet (§B.2a, composite `#E8EAEA`), Sahib's dark ground (§F.6, `#E8E8EA`) and Tanya's dark ground (§G.1a, `#E8E8E8`) all land within one point of each other, and Sahib's new *light* ground (§F.4a) takes 82% like every other light ground on the site. The two card inks are theme-invariant (§B.2), so a card looks and reads the same in both schemes. Optional noise: a single tiled SVG turbulence pattern at 96 × 96, `opacity .035`. The noise is on the "remove one thing" list (§J) — the card works without it.

### D.7 The controlled background band, and the worst case

**Rule: nothing but `--sheet` or `--band` may sit behind a work card in the studio world.** No photograph, no gradient, no floor. This is the constraint PLAN.md §10.8 asks for, stated as a design rule so the contrast check has a fixed worst case instead of a scroll-dependent one.

`--band` `#E2E6E1` is the darker of the two, so it is the worst case.

**Worst-case composite:** white at 82% over `#E2E6E1`
`R = 0.82(255) + 0.18(226) = 249.8` · `G = 0.82(255) + 0.18(230) = 250.5` · `B = 0.82(255) + 0.18(225) = 249.6`
→ effective card surface **`#FAFBFA`**, L = **0.962205**

| Card text | Ratio on `#FAFBFA` | AA body |
|---|---|---|
| `--floor` `#0F2A2E` (company, dates, role) | **14.55 : 1** | pass |
| `--muted` `#4E6468` (one-liner, products, stack) | **6.05 : 1** | pass |

**Safety margin:** if the Engineer needs more transparency, at 70% opacity the surface becomes `#F6F8F6` (L = 0.933815) and `--muted` still reads at **5.88 : 1**. So **0.70 is the floor and 0.82 is the spec.** Below 0.70, `--muted` must be replaced with `--floor` on the small print, and that is a design change, not a tuning knob.

### D.8 Print

**Print always uses the light tokens, in every world, whatever the visitor's theme** (round 4). `@media print` re-declares each world's light values on the root regardless of `data-theme`, so a page read in dark mode prints exactly the same document as a page read in light. This is not a nicety: dark tokens on paper are either an ink-flooded page or, once the browser's own print-background suppression kicks in, light text on white — which is an unreadable document produced silently. The rule is one line in the print stylesheet and it removes the whole failure class. The toggle itself is `display: none` in print, alongside the contact plate — a control that cannot be pressed is not a thing that belongs on paper.

Cards flatten to a plain CV, because somebody will print or PDF a person page. Under `@media print` the tilt goes to `transform: none`, the fill goes to solid `#fff`, every shadow and the stand and the edge highlight are removed, the card's own padding drops to zero, and the `<ul>` reflows to a single column with a single 1px bottom rule between items and no rule under the last; the company and the date range set on one line with the date right-aligned so a printed column of dates still scans, `--muted` resolves to `#444`, `--lamp` never prints, `page-break-inside: avoid` applies per item, and the person's name and email print once at the top of page 1 — the person's own address per §B.10, since a printed CV that routes replies to a studio inbox is a worse document.

**The whole person page collapses to one column in print, not just the cards** (round 12; Perf & A11y audit ruling 1, and the S5 audit found `/tanya/` printing as three columns). §D.8 said "the `<ul>` reflows to a single column" and the build read that as *the cards* reflow, which is literally what it said — so `/tanya/`'s three-field band printed as Android / core / iOS side by side on paper, at a third of a page width each, with the core's measure at roughly 20 characters. **The rule is the page, not the component: under `@media print` every multi-column arrangement on `/sahib/` and `/tanya/` becomes one column in DOM order** — the cards, the coverage map's grid, the core band's three fields, the quotes block, the links row, and anything a later round adds. A printed CV is a single column of information read top to bottom; a three-column layout on A4 is a screen layout that happened to be sent to a printer. The map keeps its shape because it is a `<table>` and a table is not a layout column; everything else flattens. §G.3's ticks do not print — a connector between two blocks that are now stacked says nothing — and each edge field prints under its own platform label, which is the same structure §G.3's 360 form already uses and is therefore already drawn.

**In default print the map's marks must keep their state** (review item S5, `print-sahib-nobg-p1.png` against `print-sahib-p1.png`). With the browser's own print-background suppression on — the default, and the one nobody chooses — `/sahib/`'s five-mark row strips lose their fill: empty marks vanish entirely, filled marks become a thin outline, and the lit mark becomes an amber outline at **1.87 : 1 on white**. The state is carried by fill alone, which is exactly what §E.1 refuses to do for the stage indicator and refuses for the same reason. **The marks take the stage indicator's discipline: a stroke plus a size difference, so the three states survive with every fill suppressed** — filled is the larger mark with a solid stroke, empty is the smaller mark with a hairline stroke, and the lit mark is the larger mark with a doubled stroke and a `--s-ink` outer ring, which is a shape difference and not a colour one. `print-color-adjust: exact` on the strip is the cheaper fix and it is refused: it asks the visitor's printer for permission the rest of §D.8 is built not to need.

**Print omits the floor entirely** (item 54). The whole floor section — scene, buttons, card slot and roster — is `display: none` on every page that carries it, and no text substitute is printed in its place. The persistent contact plate is `display: none` too. The reasoning is that the roster-as-a-text-list would print as an unexplained list of seven job titles under a person's CV, which raises a question the paper cannot answer; the room is an argument that needs the screen, and a document that tries to carry it becomes a worse document. What survives is the thing people actually print these pages for: name, address, and a clean column of roles and dates. The output should be a document you would attach to an email, which is the actual reason anyone prints this.

---

## E. Build-stage indicator (§6.2)

### E.1 Three states that survive greyscale

Each state differs on **three redundant channels** — size, internal structure, and the pattern of the line leading out of it — so removing colour, or removing lightness, still leaves two.

| | Done | Current | Future |
|---|---|---|---|
| Shape | filled disc | ring with a concentric core | hollow disc |
| Diameter | 10px | **18px** | 10px |
| Fill | `--floor` solid | core: `--floor` solid, 8px, with a 4px clear gap inside the ring | none — the ground shows through |
| Stroke | none | 3px `--floor` on the ring | 1.5px `rgba(15,42,46,.60)` |
| Outgoing connector | 2px solid `--floor` | 2px solid `--floor` | 2px **dashed** `rgba(15,42,46,.22)`, 4-4 |
| Label | Instrument 500, `--muted` | Instrument 600, `--floor` | Instrument 400, `--muted` |

The current node is the largest thing on the track and the only one with two concentric parts (principle 4 again: it is distinct by structure, not by shine). On `--floor` grounds the inner core becomes `--lamp` (7.56 : 1) — but that is emphasis only; the size and structure still carry it, so the greyscale test passes with colour switched off entirely.

**The current node's outgoing connector is solid, and the table above is normative** (step 1 review item 16): a connector belongs to the node it leaves and states whether *that* stage happened, so the segment out of `◉` is solid because the product has genuinely reached that stage, and the dashes begin at the first future node — §E.2's and §E.3's wireframes are corrected below to match, and the build already follows this.

**Future-node stroke, raised to `.60`** (round 4's §I item 5, ruled: 3 : 1 for a meaningful graphic is a Perf & A11y line, not a preference). The light value is now **`rgba(15,42,46,.60)`**, replacing `.45`. Computed on both grounds the track is permitted to sit on, by §B.2's method:

| Composite | Effective hex | L | Against | Ratio | Needs |
|---|---|---|---|---|---|
| `rgba(15,42,46,.60)` over `--sheet` `#F1F3F0` | `#697A7C` | 0.184856 | `--sheet` | **4.01 : 1** | 3 : 1 |
| `rgba(15,42,46,.60)` over `--band` `#E2E6E1` | `#637576` | 0.167421 | `--band` | **3.83 : 1** | 3 : 1 |

Both clear SC 1.4.11, and the light stroke now sits above its dark twin's 3.76 : 1 (§E.1a) rather than below it. The drawing does not change — same 1.5px, same 10px hollow disc — so no wireframe, no geometry and no weight figure moves. The dashed connector's `rgba(15,42,46,.22)` is deliberately **not** raised with it: the connector is the state's second channel, never its carrier, and the node stroke is what the 3 : 1 line is about.

Semantics: an `<ol>`, current step marked `aria-current="step"`. Not divs (§6.2).

### E.1a The three states on dark

The component does not change shape, size or structure in dark — it changes one token. Every value below that was `--floor` in light becomes `--ink`, which resolves to `--chalk` on a dark page and back to `--floor` on a light one, so there is exactly one declaration per property and no second component.

| | Done | Current | Future |
|---|---|---|---|
| Shape | filled disc | ring with a concentric core | hollow disc |
| Diameter | 10px | 18px | 10px |
| Fill | `--ink` solid | core: **`--lamp`** solid, 8px, 4px clear gap inside the ring | none — the dark ground shows through |
| Stroke | none | 3px `--ink` on the ring | 1.5px `rgba(232,237,233,.45)` |
| Outgoing connector | 2px solid `--ink` | 2px solid `--ink` | 2px dashed `rgba(232,237,233,.22)`, 4-4 |
| Label | Instrument 500, `--muted` | Instrument 600, `--ink` | Instrument 400, `--muted` |

**Re-checked against the dark sheet `#18292D`, which is where the track sits on `/work/*` and in §E.3's compact home view:**

| Mark | Ratio against the dark sheet | Needs |
|---|---|---|
| Done node, `--chalk` fill | **12.71 : 1** | 3 : 1 (non-text) |
| Current node ring, `--chalk` 3px stroke | **12.71 : 1** | 3 : 1 |
| Current node core, `--lamp` | **7.54 : 1** | 3 : 1 |
| Future node, `rgba(232,237,233,.45)` → `#768182` | **3.76 : 1** | 3 : 1 |
| Current label, `--ink` | **12.71 : 1** | 4.5 : 1 (text) |
| Done / future labels, `--muted` | **5.93 : 1** | 4.5 : 1 |

Two notes. **First, the current node's core is `--lamp` in dark and `--floor` in light** — §E.1 already made that switch conditional on the ground rather than on the page, and the dark scheme is simply another dark ground. The gap inside the ring shows the sheet, so the ring (12.71) and the core (7.54) are each measured against the ground and never against each other; the concentric read holds. **Second, the state is still carried by size and structure with colour switched off entirely** — 18px versus 10px, two concentric parts versus one, solid connector versus dashed. The greyscale test passes in both schemes, which is what §6.2 asks for and what makes the whole component theme-proof.

**Round 4's one finding, now closed.** The light future-node stroke was `rgba(15,42,46,.45)`, which computes to **2.65 : 1** over `--sheet` — under the 3 : 1 that SC 1.4.11 asks of a meaningful graphic, against its dark twin's 3.76 : 1 at the same alpha. It was raised as a question rather than fixed unilaterally, because it is a change to an approved round-1 light value. **Ruled, round 5: the priced fix is applied** — 3 : 1 for a meaningful graphic is a Perf & A11y line, not a preference. §E.1's light stroke is now `rgba(15,42,46,.60)`: **4.01 : 1** on `--sheet` and **3.83 : 1** on `--band`.

**The dark stroke stays at `rgba(232,237,233,.45)` and is not raised with it**, because it already clears the line on both dark grounds and a light mark on a dark ground is simply more efficient at the same alpha — the two schemes are matched on *ratio*, which is the thing that matters, not on alpha:

| Dark stroke composite | Effective hex | Against | Ratio | Needs |
|---|---|---|---|---|
| `rgba(232,237,233,.45)` over dark `--sheet` `#18292D` | `#768182` | `--sheet` | **3.76 : 1** | 3 : 1 |
| `rgba(232,237,233,.45)` over dark `--band` `#213539` | `#7B8888` | `--band` | **3.49 : 1** | 3 : 1 |

All four grounds, both schemes, clear 3 : 1. The state is still carried by size and structure with colour switched off entirely.

### E.2 The full track

**≥ 931 — horizontal**, five nodes evenly spaced, labels beneath. "Submitted for review" wraps to two lines, so the label row reserves two lines of height for all five nodes and no layout shifts.

```
   ●───────●───────◉───────○╌╌╌╌╌╌╌○
Specced  Building  Final    Submitted   Live
                   touches  for review
```

**≤ 930 — vertical**, for two reasons that now stack. Below 768, five labels across 320px gives 64px each and "Submitted for review" cannot set. From 768 to 930, the horizontal axis ends inside the plate's 276px band and the last two nodes — the two that say the product is not out yet — are covered, which §B.10's amended rule forbids; the vertical form has no right-hand extent, so it is the remedy rather than a narrower pitch. **The breakpoint moves from 768 to 930 and nothing else about the component changes.** Nodes in a column, connector vertical, label to the right, 44px row height.

```
 ●  Specced
 │
 ●  Building
 │
 ◉  Final touches            <- current, 18px, ring + core
 │
 ○  Submitted for review
 ╎
 ○  Live
```

**The horizontal axis takes its block's own inner edges (round 12, review item W1).** Run A item 6 asked for a track that answers the grid instead of being a fixed 567px object, and the build gave the pitch a column span, which was the mechanism asked for. The composition did not follow: rendered at 1440 the label row runs x **168 → 966** inside a `--band` block running x **120 → 1014**, so the axis starts 48 inside its block and stops 48 short of it, and at 930 the vertical track sits in the left 250px of an 866-wide block. **48px of dead margin at each end is what makes a diagram look dropped in rather than laid out**, and it is `/work/`'s "remove one thing" (§J).

> **The axis's first node centre sits at the block's left inner edge + 9 (the ring), and its last node centre at `min(block right inner edge − 9, 100vw − 300)` — the block, or the plate's band less 24px, whichever is smaller. The pitch is whatever those two ends and five nodes make it. There is no pitch ceiling; the floor is 100px, below which the section changes shape (§B.10) rather than the component.**

| vw | Block inner edges | Band | Last node | Pitch | Clear of band |
|---|---|---|---|---|---|
| 931 | 42 → 889 | 655 | 622 | **142.8** | 24 |
| 1024 | 48 → 976 | 748 | 715 | **164.5** | 24 |
| 1440 | 120 → 1014 | 1164 | 1005 | **219.0** | 150 |

**This supersedes the "124px pitch cap, axis anchored at x 137" wording in §B.10**, which described a fixed object and is stale; the collision arithmetic in that paragraph is what produced the 930/931 breakpoint and *that* is unchanged and verified in render (`work-track-930-light.png`, `work-track-931-light.png`). The switch stays where run A put it: the anchor above governs the horizontal form only, and below 931 the vertical form runs for its own two reasons, which are the label row's legibility and the fact that a vertical track has no right-hand extent to collide with.

No dates, no estimates, no "expected in" anywhere in this component. There is no slot for one, which is the point.

### E.3 Compact home variant — both products, one axis

§6.2 asks for one compressed view showing the pipeline at a glance: one shipped, one nearly there.

**≥ 768: one set of stage labels, two runners.** A single column header row carrying the five stage names, then two rows of nodes aligned to those columns, each row labelled with its product at the left. Because the two rows share one axis, the eye compares positions instead of reading two separate diagrams — the A.4 mechanism, applied.

```
                 Specced   Building   Final touches   Submitted   Live
                    │          │            │             │         │
 Pocket Manager     ●──────────●────────────●─────────────●─────────◉
                    │          │            │             │         │
 [second app]       ●──────────●────────────◉─────────────○╌╌╌╌╌╌╌╌╌○
```

**The label row carries §E.2's five strings, unabbreviated** — `Specced`, `Building`, `Final touches`, `Submitted for review`, `Live`. The wireframe above elides the fourth for ASCII width only; it is not a shorter label set. So this row inherits §E.2's two-line reservation whole: the row reserves two lines of height for all five, and the pitch that lets `Submitted for review` set in two lines rather than three is **100px**, the number §B.10 fixes. There is no width at which this component gets a smaller pitch — where 100 does not fit, the section changes shape instead (below).

**All five stage labels centre on their nodes, in every form of this component, at every width.** The label row's ink may overhang the axis at either end by up to half a label; §B.10 exempts prose and this row is five words, not five marks. Round 10's fix for run A item 10 edge-aligned `Specced` and `Live` to nodes 1 and 5 so that the row's ink matched the axis exactly, and the cost was visible in `home-proof-1440-light.png`: three labels centred and two half a pitch off the dot they name, which in a five-item row reads as a mistake and not as a rule. **The axis is what the rule constrains; the label row is prose that rides it.** This retires the two-alignment inconsistency (item H7) and it is now the same rule everywhere.

**Where the two-runner block sits, by width (round 12).** The pitch is **100px at every width**, and where 100 does not fit the section changes shape rather than the component. The product label rides *above* its runner rather than beside it (§B.10), so no label column is subtracted from the axis.

| Width | Form | Block | Axis ink | Node centres | Last ring closes | Band begins | Clear |
|---|---|---|---|---|---|---|---|
| < 768 | one row per product | content | mini-track, 140 total | — | — | 128-band | n/a |
| 768–1023 | stacked, prose cols 1–6, figures cols 1–5 | cols 1–6 of 8 | x 32 → 441 | 32 / 132 / 232 / 332 / 432 | 441 | 492 | **51** |
| 1024–1439 | **one grid, two rows** (§B.9) | cols 1–9 of 12 | x 243 → 661 | 252 / 352 / 452 / 552 / **652** | 661 | 748 | **87** (ring) / **96** (node centre) |
| ≥ 1440 | split band (§B.9) | cols 7–12 | x 723 → 1141 | 732 / 832 / 932 / 1032 / 1132 | 1141 | 1164 | **23** |

The 1024 row is the round-12 ruling: the block spans cols 1–9 and the axis is anchored on its right at `min(block right − 33, 100vw − 372)`, which at 1024 is the band term — **x 652**, 96px clear of a band at 748. §B.9 carries the derivation and the row-1 allocation. The 1439 end of the same range is governed by the block term instead, so the axis fills its block there rather than floating in it; the anchor is one expression and it hands over between the two terms without a breakpoint.

768–1023 is listed because it is the tighter of the two non-split widths and it still clears by 51px, which is what proves one pitch serves the whole range. **The figures and the store link take cols 1–5 at 768–1023 and cols 1–7 at 1024–1439** — that allocation, not a per-width case, is what closes blocker B1.

**< 768: one row per product,** product name, a 5-node mini-track (nodes only, 140px total, no per-node labels), and the current stage printed as text beside it. Only the four non-current labels are dropped — the fact a visitor actually needs stays as words.

```
 Pocket Manager
 ●─●─●─●─◉                    Live

 [second app]
 ●─●─◉─○╌○                    Final touches
```

The `<ol>` supplies the full label text in both forms; at < 768 the four non-current labels are visually hidden but present for screen readers, and the node graphics are `aria-hidden`.

**The second product ships** (item 9a: a full, name-agnostic page), so the two-runner form is what gets built and the single-runner degradation is no longer a live branch.
`[COPY NEEDED: the descriptive label for the second product in this view, ≤ 18 characters, since the placeholder name may not appear (§5.3).]`

---

## F. Sahib's world (§9.2)

His axis is **range**. Three directions were considered; two are proposed here with reasoning, the third is documented in the scratch file with the reason it was dropped.

### F.1 Direction S1 — the coverage map *(recommended)*

**The breadth itself is the composition.** The page's centre is a matrix: five columns for the surfaces he has shipped on — native iOS, native Android, KMP, Flutter, and *end to end with AI (backend, frontend, tests)* — crossed against the five places he has shipped from — Cleartrip, smallcase, Motive, Keenai Global, TheGeekDogs. Each cell that is filled names a real product. The takeaway is not any single cell; it is the **shape of the filled region**, which spans the whole width and seven years.

The fifth column exists in exactly one row: Keenai Global, 2025. It is the newest, smallest, and only lit region of the map. §5.4 calls the Keenai fact "the single most important fact on the page", and this composition makes it the visual event rather than a bullet in the middle of a scroll.

The finance thread is the texture, per §5.4's instruction to pick one spine and let the other be texture: four of the five rows are finance or fintech, and the row labels carry that as a one-line domain note rather than as a second diagram.

**Why this over the others:** it is the only one where a stranger gets the argument without reading; §9.2 literally describes it ("the breadth itself is the composition"); and it is the shape of contribution rather than a sequence, which keeps it distinct from Tanya's page in the way §9.2 asks.

**The honest-gap problem is closed twice over, and the third cell state is gone.** Pass 1 designed a three-state cell grammar — attributed / asserted / empty — because §5.4 claimed four stacks while §7's table attributed three, leaving native iOS and KMP as columns with nothing behind them. Item 45 named the stacks (**native iOS at Motive and smallcase; KMP at Motive**) and **item 72 named the products behind them**: at smallcase, the smallcase Android app and Tickertape on native iOS, then the Tickertape Flutter app for iOS and the Android app migrated to Flutter; at Motive, the Fleet and Driver apps natively on both platforms, a design-components library in KMP shared across the two, and the Views-to-Compose migration on Android. **Every filled cell on the map now prints a product name.** There is nothing left on this page for an "asserted" cell to say.

**Decision: remove the "asserted" state.** It is retained here as documented grammar for a future row whose stack is real but whose product cannot be named — and for nothing else, because no cell on Sahib's page is in that condition. Two states are drawn:

| Cell state | Treatment | Means |
|---|---|---|
| Attributed | **1.5px `--s-ink` stroke on every edge** (§F.4c), `--s-fill` inside it, product name printed inside that | we can name the product |
| Empty | nothing — no stroke, no fill | no claim |

**Round 14: the stroke is the state, and the fill is the reinforcement.** The two-state grammar is carried by the **presence or absence of a 1.5px `--s-ink` stroke**, which measures **14.09 : 1 in light and 14.11 : 1 in dark** against `--s-ground`. `--s-fill` is unchanged (2.97 : 1 light / 2.91 : 1 dark) and is no longer asked to carry the distinction on its own — §F.4c prints the arithmetic showing that it arithmetically cannot, in either scheme, without breaking the product name's AA body inside the cell. Where two filled cells are adjacent — the Motive and smallcase three-cell bars — **the shared edge draws once**, at the same 1.5px, never a doubled 3px seam: the ten cells read as one bounded region with internal divisions, which is the staircase this section argues from, now with a 14 : 1 outer boundary instead of a 2.97 : 1 one. The lit 2025 cell keeps its **2px** `--s-ink` border unchanged (§F.4a) — heavier than the 1.5px, and the only chromatic fill on the map, so it still stands apart as the one lit region. **At 360 the row strips are unchanged**, as §F.4b already rules.

Keeping the third state *drawn* "in case we need it" would be keeping a rendered way to make an unattributed claim, and a drawn affordance gets used. **The one line of prose this section used to reserve beneath the map is deleted with it**, because nothing under the map is unattributed and a disclaimer under a fully attributed diagram only teaches the reader to doubt the diagram. A two-state map cannot lie by omission, because the only thing it can say is "here is a product". That is a stronger position than a grammar, and it costs one CSS rule less.

**What the closed gap does to the composition, which is more than filling two holes.** The Motive row carries **three adjacent filled cells** — native iOS, native Android, KMP: the Fleet and Driver apps, and the design-components library shared between them — and the smallcase row carries three of its own — native iOS, native Android, Flutter. Those two bars are the densest thing on the map. They do real work: the KMP column has exactly one filled cell, and so does the end-to-end-with-AI column, and two lone cells on the same map would have diluted the "one lit region" read that §H.3's orchestrated moment depends on. Because Motive's KMP cell sits inside a three-cell bar, it does not read as isolated, and **the 2025 lamp cell stays the one mark on the map that stands apart.**

The filled region spans **all five columns and all five rows** — ten of twenty-five cells, no empty column, no empty row. **Its shape is a staircase descending right to left:** the lit pair at the top right steps down into the two wide middle rows, which then narrow to the single native-Android column running unbroken to the bottom. The Keenai pair meets the Motive bar corner to corner rather than edge to edge, which is what makes the step read as a step and keeps the lamp at the head of the figure rather than buried inside it. Item 72 changed what the cells *say*, not where they sit — the geometry is round 5's, now with a product name in every one of the ten. That is what §9.2's "the breadth itself is the composition" was always describing, and until item 45 it was a claim the map could not actually make.

### F.2 Direction S2 — teaching-led

His writing is the entry point. The page opens with the three verified post subjects framed as the questions he answers — `channelFlow` vs `callbackFlow`; Android 16 dropping orientation locks and the duplicate-fragment bug; `ViewModel` vs `onSaveInstanceState` vs `SavedStateHandle` — with the work history underneath.

**The case for it:** to a technical buyer this is the most persuasive page we could build. Someone who explains reentrancy and lifecycle correctly in public is someone you trust with your architecture, and one of those posts drew 283 reactions and 13 reposts, which is a number and therefore usable (principle 2). It also links straight to §3: teaching is what review looks like when it is done out loud.

**Why not:** §5 verifies exactly three post subjects. A writing-led *spine* with three items is thin, and adding a fourth is the invention failure §14 warns about. It is retained as the recommended **second section** of S1 rather than as the page's structure, so it costs nothing now and can be promoted the moment more posts are confirmed.

### F.3 Recommended: **S1**, with S2's material as its second section.

### F.4 Tokens for S1

Sahib's world inverts the studio: his page is a dark ground, because a coverage map reads as light marks on dark, and because the ground being dark makes the single lit column unmissable. The hue is shifted off the studio petrol to indigo-slate so the two are visibly different rooms, not one theme reskinned.

**Round 4:** the values in this section are now his **dark** scheme — unchanged, and still the default for any visitor whose OS asks for dark. His light counterpart, and the reasoning for not drawing a deeper dark instead, are in §F.4a.

| Token | Hex | L | Role |
|---|---|---|---|
| `--s-ground` | `#161C2E` | 0.011983 | Page ground. |
| `--s-panel` | `#1F2841` | 0.021905 | Raised surface — **section blocks** (§F.4b). The map's filled cells left this token in round 12 and took `--s-fill`. |
| `--s-ink` | `#E9EAF0` | 0.824605 | Primary text; the text inside a filled cell; **and the filled cell's 1.5px stroke** (§F.4c). Value unchanged in round 14. |
| `--s-dim` | `#8E96AC` | 0.305420 | Secondary text, row and column labels. |
| `--lamp` | `#F2A93B` | 0.475689 | Shared with the studio. Used **only** on the 2025 end-to-end-with-AI column. |

| Foreground | Background | Ratio | AA body |
|---|---|---|---|
| `--s-ink` | `--s-ground` | **14.11 : 1** | pass |
| `--s-ink` | `--s-panel` | **12.16 : 1** | pass |
| `--s-dim` | `--s-ground` | **5.73 : 1** | pass |
| `--s-dim` | `--s-panel` | **4.94 : 1** | pass |
| `--lamp` | `--s-ground` | **8.48 : 1** | pass |
| `--lamp` | `--s-panel` | **7.31 : 1** | pass |
| `--floor` `#0F2A2E` | work-card surface `#E8E8EA` | **12.34 : 1** | pass |
| `--muted` `#4E6468` | work-card surface `#E8E8EA` | **5.13 : 1** | pass |

`--s-panel` sits only 1.16× above `--s-ground` in luminance. That is intentional — panels on a dark ground are separated by an inset 1px `rgba(233,234,240,.14)` top-left edge highlight (the same acrylic language as the work cards, inverted) plus space, not by fill contrast. A panel that fights the ground on brightness makes a dark page look like a grid of boxes.

### F.4a Light scheme — Sahib

**The decision item 49 forces: his existing palette *is* his dark scheme, unchanged, hex for hex. The new work is his light counterpart.** No deeper variant is drawn.

Three reasons, and the third is the one that decides it.

1. **The palette above was designed as a dark ground and reviewed as one.** `#161C2E` / `#1F2841` / `#E9EAF0` / `#8E96AC` came out of round 1, survived two review rounds, and its whole argument — a dark ground so the single lit 2025 column is unmissable — is a dark-mode argument already. A "deeper" variant would be re-solving a solved problem.
2. **A deeper variant is a fourth palette to keep at AA for no gain.** Six palettes is already the cost of item 49; seven, with two of them dark and near-identical, is the version of this that gets out of sync.
3. **The default matters more than the label.** The visitor arriving with `prefers-color-scheme: dark` — the majority of the traffic §4 describes — lands on the page exactly as designed and approved. Making his dark mode a *different* dark would mean the approved page is the one nobody sees by default, which is a strange thing to ship on purpose.

So `/sahib/` is the one route where the toggle's two positions are "as designed" and "the counterpart", rather than "the counterpart" and "as designed". The `data-theme="dark"` block for his world is therefore **empty of overrides** — his `[data-world="sahib"]` base values are the dark ones, and it is `[data-theme="light"]` that carries the overrides. Stated explicitly so the Engineer does not invert it by pattern-matching the other two worlds.

**His light counterpart keeps the indigo-slate hue**, so the two schemes are the same room at two times of day rather than two different pages. Same names, same roles, inverted values:

| Token | Dark value (his default) | **Light value** | L (light) | Role |
|---|---|---|---|---|
| `--s-ground` | `#161C2E` | **`#EEEFF4`** | 0.864418 | Page ground. |
| `--s-panel` | `#1F2841` | **`#E0E2EC`** | 0.762961 | **Section blocks** (§F.4b); no longer the map's field. Steps *darker* than the ground in light, *lighter* in dark — the same "step away from the extreme" rule as the studio's band (§B.2a). |
| `--s-ink` | `#E9EAF0` | **`#1A2033`** | 0.014917 | Primary text; the text inside a filled cell; **and the filled cell's 1.5px stroke** (§F.4c). Value unchanged in round 14. |
| `--s-dim` | `#8E96AC` | **`#545C74`** | 0.108001 | Secondary text, row and column labels. |
| `--lamp` | `#F2A93B` | `#F2A93B` | 0.475689 | Unchanged. Still only on the 2025 end-to-end-with-AI column. |

| Foreground | Background | Ratio | AA body |
|---|---|---|---|
| `--s-ink` `#1A2033` | `--s-ground` `#EEEFF4` | **14.09 : 1** | pass |
| `--s-ink` | `--s-panel` `#E0E2EC` | **12.52 : 1** | pass |
| `--s-dim` `#545C74` | `--s-ground` | **5.79 : 1** | pass |
| `--s-dim` | `--s-panel` | **5.15 : 1** | pass |
| `--s-ink` | `--lamp` (text inside the lit cell) | **8.10 : 1** | pass |
| `--card-ink` `#0F2A2E` | work-card surface `#F9FAFC` | **14.44 : 1** | pass |
| `--card-ink-2` `#4E6468` | work-card surface `#F9FAFC` | **6.00 : 1** | pass |

Every light pair is within 0.2 of its dark twin (14.09/14.11, 12.52/12.16, 5.79/5.73, 5.15/4.94). That is deliberate: the page should not feel *sharper* in one scheme than the other, because the map's read depends on the difference between a filled cell and an empty one, not on how loud the ink is.

**The lit cell in light, and the lamp rule doing its job.** `--lamp` on his light ground is **1.74 : 1** and on his light panel **1.55 : 1**, so by §B.2a's restated rule (`--lamp` is text-legal only on grounds below L ≈ 0.09) it is **fill-only** here. The 2025 cell is a filled region, which is exactly what the composition needs, so nothing about §F.1's argument changes:

- The cell is a `--lamp` **fill** carrying a **2px `--s-ink` border**, which gives its boundary 14.09 : 1 against the ground.
- The text inside it sets in `--s-ink`, **8.10 : 1** on the amber.
- It is still the only filled-with-colour region on the page, still the newest and smallest, and still the only solitary mark — the Motive row's three-cell bar still does the work §F.1 describes.
- A lamp **mark or text** on his light page — if one is ever wanted, and none is specified — uses `--lamp-ink` `#8A5A08` (5.16 : 1 on the ground, 4.58 : 1 on the panel), the same dark-amber counterpart Tanya's world already defines. Borrowing an existing token rather than minting a sixth one.

**Work cards on his light page** take 82% white (the ground is light) over the worst-case backdrop, which in light is the **darker** of his two permitted grounds — `--s-panel`:

**Worst-case composite:** white at 82% over `#E0E2EC` → **`#F9FAFC`**, L = **0.954532**, with the two card inks at 14.44 : 1 and 6.00 : 1 (table above). The §D.7 controlled-backdrop rule is unchanged and still names `--s-ground` and `--s-panel` as the only permitted backdrops; only which of the two is the worst case flips with the scheme.

**Panel separation flips with it.** §F.4 says panels on his dark ground are separated by an inset 1px `rgba(233,234,240,.14)` top-left edge highlight plus space, not by fill contrast — because a panel that fights the ground on brightness turns a dark page into a grid of boxes. In light the panel is genuinely a step darker than the ground (1.13 : 1 by luminance) and the edge highlight inverts to `rgba(22,28,46,.10)` on the bottom-right, matching the light direction that governs everything else on this site. The map's field reads as a field in both schemes for the same reason: it is the only large area of the non-ground fill.

**Focus ring on his light page:** 3px `--s-ink` outer (14.09 : 1 on the ground, 12.52 : 1 on the panel) + 2px `--lamp` inner, unchanged geometry. On his dark page the outer is `--s-ink` at 14.11 : 1, also unchanged.

**"The map fills" (§H.3) is scheme-agnostic.** Four columns fade up, 300ms hold, then the end-to-end column arrives alone in `--lamp`. Nothing in that sequence depends on the ground's lightness — the lamp column is the only chromatic event in either scheme — so the orchestrated moment is one animation, not two.

### F.4b Round 12 — the map's fill leaves `--s-panel`, and `--s-panel` goes back to work

Two run-B items (S1, S2) are one token doing two jobs badly, and the fix is to split it.

**S2, the map's two-state grammar is a 1.13 : 1 step in light.** Sampled off `sahib-map-1440-light.png`: filled cells `#E0E2EC`, empty cells `#EEEFF4`, lit cell `#F2A93B` with its 2px `--s-ink` border — §F.1 and §F.4a exactly, and honestly built. But §F.1's whole argument is that "the takeaway is the **shape** of the filled region… a staircase descending right to left", and at 1.13 : 1 that shape is at the edge of perception: the product names do the work and the diagram reads as a table. The dark map is arithmetically the same step — `#1F2841` on `#161C2E` is **1.16 : 1** — and reads better only because of where those two values sit on the tone curve. **That is a coincidence, not a design, and this site does not ship a diagram whose legibility depends on the visitor's scheme.**

**New token `--s-fill`, the map's filled cell and nothing else.**

| Token | Dark | Light | L (dark / light) | Role |
|---|---|---|---|---|
| `--s-fill` | **`#5E6480`** | **`#868AA0`** | 0.130504 / 0.257833 | The coverage map's filled cells. Used nowhere else, in either scheme. |

| Pair | Dark | Light |
|---|---|---|
| `--s-fill` against `--s-ground` (the shape) | **2.91 : 1** | **2.97 : 1** |
| `--s-ink` inside a filled cell (the product name) | **4.85 : 1** | **4.74 : 1** |
| `--lamp` against `--s-fill` (the lit cell against its neighbours) | **2.91 : 1** | **1.71 : 1** |

The two schemes now match on **ratio**, which is §B.2a's rule, rather than on hex distance. Three things this buys beyond the shape: the product names inside the cells still clear AA body in both schemes; the lit cell separates from its neighbours *better* than it did (1.55 : 1 before, in light), because the fill has stepped past `--lamp` rather than toward it; and the 2px `--s-ink` border on the lit cell stays, so the map keeps §E.1's discipline — the state is never carried by fill alone. **At 360 the row strips are unchanged**; the review found the shape already reads better at 360 than at 1440 (`sahib-map-360-light.png`), and the strips' mark discipline is what the wide map is now borrowing rather than replacing.

**S1, `/sahib/` is 5,235px of one fill and `--s-panel` is never a section block.** §F.4 has always named `--s-panel` for "the map's field, **section blocks**"; measured, every section on the page computes `rgba(0,0,0,0)` over the body at every width in both schemes, and only the map's cells took the token. Run A item 8 blocked both product pages for exactly this and they were fixed; the fault moved to the longer page, where six sections separated by space alone — with 390 / 540 / 400px gaps between the map, the cards and the writing — read as an unfinished page rather than as a quiet one.

**With `--s-fill` carrying the cells, `--s-panel` is free for the job it was named for. The alternation on `/sahib/`, and it steps around the map:**

| Section | Fill |
|---|---|
| Intro | `--s-ground` |
| The coverage map | `--s-ground` — the map is the page's one loud thing and nothing sits behind it |
| Work cards | **`--s-panel`**, full-bleed |
| He writes it down | `--s-ground` |
| Background | **`--s-panel`**, full-bleed |
| Links and closing | `--s-ground` |

Two blocks, not six, and neither is adjacent to the map. §D.7's controlled-backdrop rule already names `--s-ground` and `--s-panel` as the only permitted card backdrops, so the cards on `--s-panel` are inside a case that is already costed, and §F.4's own note applies — panels on a dark ground are separated by an inset 1px `rgba(233,234,240,.14)` top-left edge highlight plus space, never by fill contrast.

**S6 — the map and the cards arrive with no section line, and that is a copy gap, not a build fault.** §F.7 and §F.8 both draw `Where he has shipped` above the map and `Seven years, four companies` above the cards; rendered, the page has three headings — the h1, `He writes it down` and `Background` — because COPY.md writes neither string. The wireframes are right and the build is right against COPY. Recorded here so it routes: `[COPY NEEDED: the display-section line above the coverage map on /sahib/, ≤ 5 words.]` `[COPY NEEDED: the display-section line above the work cards on /sahib/, ≤ 5 words.]` Both are display-section size, `--s-ink`, on the left edge of their own section.

### F.4c Round 14 — S2 closed on the stroke, because the fill cannot reach 3.2 : 1 without breaking the cell's own text

The final audit does not waive S2: `--s-fill` on `--s-ground` measures **2.97 : 1 light / 2.91 : 1 dark**, under SC 1.4.11's 3 : 1 for a meaningful graphic. The auditor's proposed action was to nudge `--s-fill`'s luminance further from `--s-ground`. **That route is arithmetically closed, and the proof is short enough to print.**

**The two constraints on `--s-fill`, in light.** Method is §B.2's, unchanged. `--s-ground` `#EEEFF4` is L = 0.864418; `--s-ink` `#1A2033` is L = 0.014917.

- For the fill to reach **3.2 : 1** against the ground it must be *darker*, so `L_fill ≤ (0.864418 + 0.05) / 3.2 − 0.05 = 0.914418 / 3.2 − 0.05 = **0.235756**`.
- For the product name printed inside the cell to hold **AA body, 4.5 : 1**, the fill must be *lighter*, so `L_fill ≥ 4.5 × (0.014917 + 0.05) − 0.05 = 4.5 × 0.064917 − 0.05 = **0.242124**`.

**0.242124 > 0.235756: the window is empty.** The best the fill can do in light while the product name still clears AA body is `L_fill = 0.242124`, which gives `0.914418 / 0.292124 = **3.13 : 1**` — over 3, under the 3.2 the margin asks for, and one rendering rounding away from the line it just cleared.

**The same in dark.** `--s-ground` `#161C2E` is L = 0.011983; `--s-ink` `#E9EAF0` is L = 0.824605.

- For **3.2 : 1** the fill must be *lighter*: `L_fill ≥ 3.2 × (0.011983 + 0.05) − 0.05 = 3.2 × 0.061983 − 0.05 = **0.148347**`.
- For the product name at **4.5 : 1** the fill must be *darker*: `L_fill ≤ (0.824605 + 0.05) / 4.5 − 0.05 = 0.874605 / 4.5 − 0.05 = **0.144357**`.

**0.144357 < 0.148347: empty again**, and the ceiling is `0.194357 / 0.061983 = **3.14 : 1**`.

So in both schemes the fill route tops out at ~3.13 : 1, has no margin, and buys that by walking the cell's own text down onto the AA line. **Refused.** Raising it further would mean either dropping the product name below AA body — the thing §F.1 spent two rounds putting *into* every filled cell — or minting a seventh palette value for cell text, which item 49's own reasoning rules out.

**Taken instead: a 1.5px `--s-ink` stroke on every filled cell, carrying the distinction on its own.**

| Pair | Light | Dark | Against |
|---|---|---|---|
| **1.5px `--s-ink` stroke vs `--s-ground`** — the map's field, and the contract | **14.09 : 1** | **14.11 : 1** | 3 : 1 |
| 1.5px `--s-ink` stroke vs `--s-fill` — the stroke against the cell it encloses | 4.74 : 1 | 4.84 : 1 | 3 : 1 |
| 1.5px `--s-ink` stroke vs `--s-panel` — if the map ever sat on one; it does not (§F.4b) | 12.52 : 1 | 12.16 : 1 | 3 : 1 |
| `--s-fill` vs `--s-ground` — now reinforcement, not the contract | 2.97 : 1 | 2.91 : 1 | — |
| `--s-ink` inside a filled cell — the product name | 4.74 : 1 | 4.84 : 1 | 4.5 : 1 |

**Why `--s-ink` and not `--s-dim`.** `--s-dim` clears the field — 5.79 : 1 light, 5.73 : 1 dark — but against the fill it encloses it is **1.95 : 1 light and 1.97 : 1 dark**, so the stroke would dissolve into its own cell and the cell would read as a soft blob rather than a bounded one. A boundary has two sides and both have to hold. `--s-ink` clears 3 : 1 on both sides in both schemes, at 14.09/14.11 outward and 4.74/4.84 inward, with margin measured in multiples rather than hundredths. **`--s-dim` is refused for this mark and stays on the row and column labels**, where it is a text token and 5.79/5.73 on the ground is what it is for.

**Why 1.5px and not 1px.** 1px is a hairline at 1× and the mark has to survive the auditor's 4× DPR sample and a 125% browser zoom. 1.5px is 6 device px at 4×, which is exactly the auditor's own 6×6 patch, and it stays a stroke rather than becoming a border — the lit cell's 2px `--s-ink` border (§F.4a) is still the heavier mark and still unchanged.

**The channel that is the contract for the pixel check, stated so the auditor does not have to infer it.** The S2 check is a **stroke-vs-adjacent-colour** check, not a fill-vs-ground one. Sample the **1.5px `--s-ink` stroke against `--s-ground`**, taking the patch along a filled cell's long edge on the *outer* side of the boundary, away from corners and away from any adjacent filled cell's shared edge. At 4× DPR the stroke is 6 device px, so the existing 6×6 averaged patch fits it exactly when centred on the stroke's run. **The number the check must return is 14.09 : 1 in light and 14.11 : 1 in dark, against a 3 : 1 line.** `--s-fill` vs `--s-ground` remains 2.97 : 1 / 2.91 : 1 and is **not** a pass/fail channel — it is the second half of a two-part mark, exactly as §E.1's stage indicator and §C.8's selected desk are two-part, and this document's standing rule is that no state is ever carried by fill alone.

**The lit cell against the new grammar, printed as asked.** `--s-fill` does not move, so nothing about the lamp's neighbourhood changes:

| Pair | Light | Dark |
|---|---|---|
| `--lamp` `#F2A93B` vs `--s-fill` — the lit cell against its filled neighbours | **1.71 : 1** | **2.91 : 1** |
| `--lamp` vs `--s-ground` | 1.74 : 1 | 8.48 : 1 |
| The lit cell's **2px `--s-ink` border** vs `--s-ground` — its boundary | **14.09 : 1** | **14.11 : 1** |
| The ink set inside the lit cell — the product name on amber | `--s-ink`, **8.10 : 1** | `--s-ground`, **8.48 : 1** |

The lamp is **fill-only** on the light page by §B.2a's rule and always was; its boundary is the 2px `--s-ink` border, which is the same 14.09/14.11 the new stroke gets. The lit cell's *text* flips token with the scheme — `--s-ink` on amber is 8.10 : 1 in light but only **1.66 : 1** in dark, so dark takes `--s-ground` at 8.48 : 1, which is §F.4's own `--lamp` / `--s-ground` pair read the other way round. **This was derived correctly in build run D and is not written down here**, which is the gap this round closes by printing it: it is a consequence of §B.2's method, not a new value, and it mints nothing. **What the round changes for the lamp is that it is no longer the only cell on the map with a stroke** — so the lit cell now reads as *the amber one among ten bounded cells* rather than *the one bounded cell*. That is the stronger read, not the weaker one: §F.1's argument is that the shape of the filled region comes first and the lamp sits at its head, and a region whose ten cells are all bounded at 14 : 1 is a region a low-vision reader can actually see the shape of before finding the lamp at its corner.

**Nothing else moves.** `--s-fill`, `--s-ground`, `--s-panel`, `--s-ink`, `--s-dim` and `--lamp` keep every value in §F.4 and §F.4a, hex for hex, in both schemes; no ratio in either of those tables changes; §F.4b's split of `--s-fill` off `--s-panel` stands and is what makes the fill safe to demote. The round adds one mark and one number.

### F.5 Typefaces on Sahib's page

Same two families, same roles, different emphasis. The **numerals role does more work here than anywhere else on the site**: years, row counts, the seven-year span. Column headers and row labels set in Anek Latin at `wdth` 87.5 / `wght` 500 so the matrix's labels are condensed and the grid can be narrower without shrinking type. Body prose stays Instrument Sans. No new face.

### F.6 Work cards on Sahib's page

The `<ul>` of roles from §D, unchanged in structure, sitting on `--s-ground`. Two changes, both computed:

- **Card fill goes to 90% white** (not 82%), because 82% over `#161C2E` composites to `#D5D6D9` where `--muted` reads at **4.32 : 1** and fails AA. At 90% the surface is `#E8E8EA` and `--muted` reads at **5.13 : 1** (table above). So: **82% on light grounds, 90% on dark grounds**, one rule, derived rather than eyeballed.
- The controlled-band rule from §D.7 still applies: `--s-ground` and `--s-panel` are the only permitted backdrops, and `--s-ground` is the worst case **in his dark scheme**. In his light scheme (§F.4a) the permitted pair is unchanged but the worst case flips to `--s-panel`, the darker of the two there — composite `#F9FAFC` at 82%, 14.44 : 1 and 6.00 : 1. The worst case is always the darker permitted backdrop; which token that is depends on the scheme.

The cards live **below** the map, as the attribution layer: the map makes the claim, the cards are the receipts. Each attributed cell in the map is the same company as a card below it.

### F.7 Sahib, 360

```
┌────────────────────────────────────────┐ 360  --s-ground
│  ← thegeekdogs                         │  64  quiet way back (§8), not a
│                                        │      bolted-on studio header
│                                        │  56
│  Sahib Singh                           │      Anek 600, 38/1.04, --s-ink
│                                        │  16
│  Mobile across native iOS, native      │      body 16/26, --s-dim
│  Android, KMP and Flutter. Builder     │      [drafted, §7 floor card]
│  at Keenai Global.                     │
│                                        │  24
│  ┌──────────────────────────────────┐  │      portrait slot, 320 x 320
│  │  [PENDING: AI headshot, item 23  │  │      reserved with explicit
│  │   option 2. image to be supplied]│  │      dimensions so filling it
│  └──────────────────────────────────┘  │      later causes no reflow
│                                        │  56
│  Where he has shipped                  │      display-section 27px
│  [COPY NEEDED: map lead-in, <=14 wds]  │
│                                        │  24
│  ┌──────────────────────────────────┐  │      THE MAP. at 360 it rotates:
│  │            iOS And KMP Flt  AI   │  │      surfaces become COLUMNS at
│  │ Keenai      ·   ·   ·   ■   ▣    │  │      44px each (5 x 44 = 220),
│  │ 2025-        Keenai Wealth,      │  │      companies become ROWS at
│  │              Keenai Pulse        │  │      64px, growing by 20 for each
│  │              end to end with AI  │  │      product line the row needs.
│  │ ─────────────────────────────────│  │      product names move out of
│  │ Motive      ■   ■   ■   ·   ·    │  │      the cells into the row's own
│  │ 2023-25      Fleet + Driver apps │  │      lines, since a 44px cell
│  │              KMP components lib, │  │      cannot hold text.
│  │              Compose migration   │  │
│  │ ─────────────────────────────────│  │      ■ attributed  ▣ lamp (2025)
│  │ smallcase   ■   ■   ·   ■   ·    │  │      · empty. TWO states only --
│  │ 2020-23      smallcase Android;  │  │      the "asserted" state is
│  │              Tickertape iOS;     │  │      removed (§F.1), and so is
│  │              Tickertape Flutter, │  │      the line of prose that used
│  │              iOS then Android    │  │      to sit under the map: every
│  │ ─────────────────────────────────│  │      filled cell now names its
│  │ Cleartrip   ·   ■   ·   ·   ·    │  │      own product, so there is
│  │ 2019-20      Cleartrip Android   │  │      nothing left to qualify.
│  │ ─────────────────────────────────│  │
│  │ TheGeekDogs ·   ■   ·   ·   ·    │  │      the row lines carry the
│  │ 2020-        Pocket Manager      │  │      products, and a row may now
│  └──────────────────────────────────┘  │      hold more than one: Keenai,
│                                        │      Motive and smallcase take
│  [the finance domain note runs as a    │      three lines each, Cleartrip
│   second row line; §J cuts it]         │      and TheGeekDogs one.
│                                        │  56
│  What he writes about                  │      S2's material, as section 2
│  ─ channelFlow vs callbackFlow         │      three verified subjects.
│  ─ Android 16, orientation locks,      │      283 reactions on the third
│    and the duplicate-fragment bug      │      is a number -> it prints.
│  ─ ViewModel vs SavedStateHandle       │
│                                        │  56
│  Seven years, four companies           │      the work cards (§D)
│  ┌──────────────────────────────────┐  │      1 column at 360, white at
│  │ Keenai Global                    │  │      90% on --s-ground
│  │ Wealth-tech, Singapore & B'luru  │  │
│  │ 2025 - now                       │  │
│  │ ─────────────────────────────────│  │
│  │ Builder (AVP, Mobile)            │  │
│  │ Keenai Wealth                    │  │
│  │ Flutter, Dart                    │  │
│  └──────────────────────────────────┘  │
│       ▁▁▁▁▁▁▁▁▁▁▁▁                     │      tilt -1.4 deg
│  ┌──────────────────────────────────┐  │
│  │ Motive ...                       │  │      tilt +0.8 deg
│  └──────────────────────────────────┘  │      ... and so on, §D.4
│                                        │
│  github.com/hellosahib                 │      item 39: GitHub links go on
│                                        │      both person pages.
│  Tell us what you're building.         │
│  sahiboffc@gmail.com                   │      HIS address, not the studio's
└────────────────────────────────────────┘      (§B.10, item 53)
```

### F.8 Sahib, 1440

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │  --s-ground
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     128  │
│ Sahib Singh                                    ┌──────────────────────┐  │  h1 60/1.04
│                          (cols 1-6)            │ [PENDING: AI headshot│  │
│ Mobile across native iOS, native Android,      │  item 23, option 2]  │  │  portrait slot
│ KMP and Flutter. Builder at Keenai Global,     │ 366 x 440 reserved   │  │  cols 9-12
│ shipping features end to end with AI.          └──────────────────────┘  │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Where he has shipped                                     (cols 1-6)      │
│                                                                          │
│              native   native                        end to end           │  THE MAP,
│              iOS      Android    KMP      Flutter   with AI              │  full 12 cols.
│            ┌────────┬─────────┬─────────┬─────────┬──────────────┐       │  columns are
│ Keenai     │   ·    │    ·    │    ·    │ Keenai  │  backend,    │ 2025- │  surfaces,
│ wealth     │        │         │         │ Wealth, │  frontend,   │       │  rows are
│            │        │         │         │ Keenai  │  tests  ▣    │       │  places. every
│            │        │         │         │ Pulse   │              │       │  filled cell
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  names a real
│ Motive     │ Motive │ Motive  │ design- │    ·    │      ·       │ 2023- │  product
│ fleet      │ Fleet  │ Fleet   │ compo-  │         │              │  25   │  (items 45, 72).
│            │ and    │ and     │ nents   │         │              │       │
│            │ Driver │ Driver; │ library │         │              │       │  ▣ = --lamp,
│            │ apps   │ Views   │ across  │         │              │       │  the ONLY lit
│            │        │ to Com- │ Fleet + │         │              │       │  cell on the
│            │        │ pose    │ Driver  │         │              │       │  page, newest
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  and smallest
│ smallcase  │ Ticker-│ small-  │    ·    │ Ticker- │      ·       │ 2020- │  region.
│ investing  │ tape   │ case    │         │ tape    │              │  23   │
│            │        │ Android │         │ Flutter │              │       │  the Motive and
│            │        │ app     │         │ for iOS,│              │       │  smallcase rows
│            │        │         │         │ Android │              │       │  are THREE-cell
│            │        │         │         │ migrated│              │       │  bars, which is
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  what stops the
│ Cleartrip  │   ·    │ Clear-  │    ·    │    ·    │      ·       │ 2019- │  lone KMP cell
│ travel     │        │ trip    │         │         │              │  20   │  competing with
│            │        │ Android │         │         │              │       │  the lamp cell.
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  10 of 25 cells
│ TheGeek-   │   ·    │ Pocket  │    ·    │    ·    │      ·       │ 2020- │  filled. NO empty
│ Dogs       │        │ Manager │         │         │              │       │  column, no empty
│ personal   │        │         │         │         │              │       │  row, 5 surfaces,
│ finance    └────────┴─────────┴─────────┴─────────┴──────────────┘       │  7 years, and one
│                                                                     128  │  descending stair
│                                                                          │  from lamp to base.
├──────────────────────────────────────────────────────────────────────────┤
│ What he writes about              │  channelFlow vs callbackFlow         │  S2 material.
│                     (cols 1-4)    │  Android 16, orientation locks,      │  three verified
│ Technical writing, in public,     │  and the duplicate-fragment bug      │  subjects. no
│ regularly.                        │  ViewModel vs onSaveInstanceState    │  fourth invented.
│                                   │  vs SavedStateHandle    (cols 6-12)  │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Seven years, four companies                              (cols 1-6)      │
│                                                                          │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │  work cards,
│ │ Keenai       │  │ Motive       │  │ smallcase    │                     │  3-up at 1440,
│ │ Global       │  │ Fleet mgmt   │  │ Investing    │                     │  328 wide,
│ │ 2025 - now   │  │ 2023 - 2025  │  │ 2020 - 2023  │                     │  white @ 90%
│ │ ─────────────│  │ ─────────────│  │ ─────────────│                     │  on --s-ground
│ │ Builder      │  │ Android Eng. │  │ SDE1>SDE2>SE │                     │
│ └──────────────┘  └──────────────┘  └──────────────┘                     │  tilts -1.4,
│    ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁          ▁▁▁▁▁▁▁▁                           │  +0.8, -2.1
│ ┌──────────────┐  ┌──────────────┐                                       │  then +1.7, -0.6
│ │ Cleartrip    │  │ TheGeekDogs  │                                       │
│ └──────────────┘  └──────────────┘                                       │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Tell us what you're building.   sahiboffc@gmail.com   github.com/...     │
└──────────────────────────────────────────────────────────────────────────┘
```

The page is the shape of breadth, not a CV list: the map is the argument, the cards are the footnotes, and the CV order (newest first) is preserved only inside the footnotes.

---

## G. Tanya's world (§9.3)

Her axis is **the system, not the timeline**. Both directions below are spatial and relational; neither is a dated list; neither is softer or more decorative than Sahib's. Both are documented to the same depth so that swapping is a decision already reasoned through (§9.3), and both share **the same token set**, which makes the swap a layout-module change and nothing else.

### G.1 Shared tokens (both directions)

Her world is the most achromatic of the three, and that is a positional argument, not an absence: she is the person who makes the work *legible* and *repeatable*, so her page is the most rigorously aligned and least decorated surface on the site. Giving her a hue would have been the easiest way to fall into the stereotype §9.3 forbids; giving her the strictest grid is the opposite move.

| Token | Hex | L | Role |
|---|---|---|---|
| `--t-ground` | `#EDEEEE` | 0.853266 | Page ground. Near-neutral, faintly cool. |
| `--t-core` | `#DCDEDE` | 0.727321 | The shared-core field (T1) / the node field (T2). |
| `--t-ink` | `#1B2020` | 0.013703 | Primary text and every structural stroke. Genuinely achromatic, not a tinted near-black posing as sophistication — pure `#000` vibrates against a light ground at body sizes, and that is the whole reason. |
| `--t-edge` | `#56605F` | 0.111704 | Secondary text, platform-edge labels, connector strokes. |
| `--lamp-ink` | `#8A5A08` | 0.127331 | The dark counterpart of `--lamp`, so the studio's one signal can appear on a light ground. Marks the shared core. |

| Foreground | Background | Ratio | AA body | AA large |
|---|---|---|---|---|
| `--t-ink` | `--t-ground` | **14.18 : 1** | pass | pass |
| `--t-ink` | `--t-core` | **12.20 : 1** | pass | pass |
| `--t-edge` | `--t-ground` | **5.59 : 1** | pass | pass |
| `--t-edge` | `--t-core` | **4.81 : 1** | pass | pass |
| `--lamp-ink` | `--t-ground` | **5.09 : 1** | pass | pass |
| `--lamp-ink` | `--t-core` | **4.38 : 1** | **fail** | pass |
| `--t-ink` | work-card surface `#F9F9F9` | **15.66 : 1** | pass | pass |
| `--t-edge` | work-card surface `#F9F9F9` | **6.17 : 1** | pass | pass |

**One constraint follows:** `--lamp-ink` is body-legal on `--t-ground` only. On `--t-core` it is **large text (≥ 24px, or ≥ 19px bold) or non-text marks only.** Since its job on this page is a 4px column cap and a section marker, that is where it stays.

Work cards on her page sit on `--t-core` (worst case), white at 82%, composite `#F9F9F9` — computed in the table above.

### G.1a Dark scheme — Tanya (both directions)

Her light scheme is the strictest surface on the site: the most achromatic, the most rigorously aligned, the least decorated, and that is a positional argument rather than an absence (§G.1). **The dark counterpart has to be at least as strict, or the argument only holds in one scheme.** It is, on every pair.

Achromatic in dark is harder than it sounds, because the easy dark-mode move is to warm the ground — a blue-black or a brown-black reads "designed" and costs nothing. Both were rejected (scratch, round 4). Her ground is `#191B1B`: R, G and B within 2 of each other, the same discipline as `--t-ink` `#1B2020` in light, and for the same reason — a tinted near-black posing as sophistication is precisely the decorative move §9.3 forbids on her page.

| Token | Light value | **Dark value** | L (dark) | Role in dark |
|---|---|---|---|---|
| `--t-ground` | `#EDEEEE` | **`#191B1B`** | 0.010697 | Page ground. Genuinely achromatic, not a blue-black. |
| `--t-core` | `#DCDEDE` | **`#282B2B`** | 0.023533 | The shared-core field (T1) / the node field (T2). Steps *lighter* than the ground, where in light it steps darker — the field is always the one step away from the page, in whichever direction the page is not. **1.21 : 1**, the same step the dark studio uses between its floor and its page, and reinforced the same way: a 1px inset `rgba(233,234,234,.14)` top edge plus space. |
| `--t-ink` | `#1B2020` | **`#E9EAEA`** | 0.821098 | Primary text and every structural stroke. Not `#FFF`: pure white on a near-black ground vibrates at body sizes exactly as pure `#000` does on a light one, which is the same reason her light ink is not `#000`. The rule is symmetric because the problem is. |
| `--t-edge` | `#56605F` | **`#959C9C`** | 0.325668 | Secondary text, platform-edge labels, connector strokes. |
| `--lamp-ink` | `#8A5A08` | **`#F2A93B`** | 0.475689 | The one chromatic mark. In light it is the studio lamp's dark counterpart; in dark the counterpart of the counterpart **is the lamp itself**, unchanged, so her single mark and the studio's single signal are literally the same value on a dark ground. |

| Foreground | Background | Ratio | AA body | AA large |
|---|---|---|---|---|
| `--t-ink` `#E9EAEA` | `--t-ground` `#191B1B` | **14.35 : 1** | pass | pass |
| `--t-ink` | `--t-core` `#282B2B` | **11.85 : 1** | pass | pass |
| `--t-edge` `#959C9C` | `--t-ground` | **6.19 : 1** | pass | pass |
| `--t-edge` | `--t-core` | **5.11 : 1** | pass | pass |
| `--lamp-ink` `#F2A93B` | `--t-ground` | **8.66 : 1** | pass | pass |
| `--lamp-ink` | `--t-core` | **7.15 : 1** | pass | pass |
| `--card-ink` `#1B2020` | work-card surface `#E8E8E8` | **13.47 : 1** | pass | pass |
| `--card-ink-2` `#56605F` | work-card surface `#E8E8E8` | **5.31 : 1** | pass | pass |

**Every pair beats its light twin** (14.35 > 14.18, 11.85 < 12.20 by 0.35, 6.19 > 5.59, 5.11 > 4.81, and the card pair 13.47 / 5.31 against 15.66 / 6.17). Her dark scheme is the strictest surface on the site by the same margin her light one is, which was the requirement.

**The one restriction that relaxes, and is kept anyway.** In light, `--lamp-ink` fails body contrast on `--t-core` (4.38 : 1) and is therefore restricted to large text or non-text marks there. In dark it clears body on both grounds (8.66 and 7.15), so the restriction is no longer forced. **It stays.** Her one chromatic mark is a 4px column cap and a section marker in both schemes; letting it become a word in one scheme and not the other would give her page two different amounts of colour depending on the visitor's OS, and "one mark, one job" is the whole reason the token exists. The constraint is now a design rule rather than a contrast consequence, which is stated here so nobody later "fixes" it by reading the ratio table alone.

**Work cards in dark** take 90% white (the ground is dark) over the worst case, which in dark is the **darker** of her two permitted backdrops — `--t-ground`, where in light it was `--t-core`:

**Worst-case composite:** white at 90% over `#191B1B` → **`#E8E8E8`**, L = **0.808193**, card inks at 13.47 : 1 and 5.31 : 1 (table above). At 82% the same surface would be `#D6D6D6` and `--card-ink-2` reads **4.46 : 1** — a fail by 0.04, which re-derives §F.6's 90% rule a third time, independently, on her page.

**Focus ring, dark:** 3px `--t-ink` outer (**14.35 : 1** on the ground, **11.85 : 1** on the core) + 2px `--lamp` inner, geometry unchanged. Note that this is the one place where amber appears on her page in dark other than the core cap — as it already does in light, and only while focused.

**T1 and T2 both use this set, unchanged, exactly as they both use §G.1's.** Swapping her direction is still a layout-module change that touches no token, in either scheme (§G.4). The 2px ticks out of the Motive card, the core field's boundary, the edge columns' left rules and T2's connector strokes all take `--t-ink` and `--t-edge`, so they follow the scheme with no per-direction rule.

**"The core draws" (§H.3) is scheme-agnostic:** the core field's boundary draws top to bottom and each edge column appears as the core passes its row. That choreography is about order, not about lightness, so it is one animation in both schemes.

### G.2 Typefaces (both directions)

Same two families. Emphasis differs from Sahib's: on her page the **width axis carries structure rather than data**. Column and layer labels set in Anek Latin at `wdth` 75 / `wght` 600 — condensed, so a narrow structural column can carry a full-size label without shrinking it, which is what lets the three-column layout hold at 1024. Prose in Instrument Sans. Numerals get the least emphasis of the three worlds, deliberately: her argument is not a count.

### G.3 Direction T1 — the shared core *(recommended)*

**The page's own layout is a KMP architecture.** One fixed central column is the shared core; two flanking columns are the native edges, Android on the left, iOS on the right. Content sits in the column that owns it: anything shared — a practice, a workflow decision, a review gate, an architectural rule — sits in the core; anything platform-specific sits in an edge column, narrower and indented. The core is a continuous vertical field running the full page height, so it reads as a spine rather than as a stack of sections.

Her work history attaches as **annotations pinned to the layer they belong to**, not as a chronological run. The resume (item 47) is what makes this concrete, and its single best gift to the layout is that **one company lands in three positions at once**:

| Layer | What sits there | Where it comes from |
|---|---|---|
| **Android edge** | The **Jetpack Compose migration** at Motive. HSBC's MVVM migration off a legacy architecture, and its REST/Retrofit and UI-performance work. Naskay's Kotlin/Glide/Retrofit build and APK-size reduction. | Compose is Android-only, so it cannot be core, and saying so is the layout doing its job. |
| **Shared core** | **KMP business-logic modules + Clean Architecture** at Motive, 2024 to now. CI/CD pipelines and workflow automation. Release ownership: phased rollouts, crash and ANR monitoring. Bluetooth device-verification flows. Plus the review gates she owns (item 19). | All cross-platform, all shared. This is the field's content, named and dated. |
| **iOS edge** | The **Motive Fleet App** (item 46). | The edge that consumes the shared modules. |

**Motive appears on all three layers, and that is the page's argument, not a duplication bug.** The card lives in the core, where the KMP work is; the Android and iOS edges each carry a short connector — a 2px `--t-ink` tick leaving the core's card horizontally, with the edge's own Motive card top-aligned to it one gutter beyond (geometry in §G.3a) — showing the same product arriving on each platform. That is literally what a KMP architecture looks like, it fills the iOS column with a named product rather than with structure alone, and it costs one label per side rather than two duplicate cards.

Two numerals from the resume take the core's numeral slots, because a claim gets a number or it gets cut (principle 2): **99.8% crash-free** and **~20% faster startup**, both at Motive. `[CONFIRM: both figures are resume-sourced, not publicly verifiable — the Fact Checker signs them off before publish or they drop out.]`

The visitor learns the shape of KMP by reading a page built in it. That is the argument delivered by structure rather than by claim, which is the highest form of what §9.3 is asking for.

The connection §9.3 requires to the home page is now **named, not gestured at**: the core column closes with the gates she owns — product spec, code review, device QA, security and privacy, ASO (item 19) — set as a block in the core, because a gate she shares with Sahib is exactly the kind of thing that belongs to everyone and therefore belongs in the core field. The home page's four gates and this block are the same four gates seen from her side.

**Why this over T2:** see §G.5. T2's content blocker is closed and it is now buildable; the reason to prefer T1 has changed rather than persisted.

**T1 at 1440:**

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │  --t-ground
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     128  │
│ Tanya Jain                       ┌───────────────────────────────────┐   │  h1 60/1.04
│                    (cols 1-5)    │ [PENDING: AI headshot, item 23    │   │  --t-ink
│ Native Android and KMP, and the  │  option 2. image to be supplied]  │   │
│ iOS side too. She owns how the   │ 366 x 440 reserved, cols 9-12     │   │
│ work gets made.                  └───────────────────────────────────┘   │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│  ANDROID       │▒◀────── SHARED CORE ───────▶▒│        iOS               │  ROUND 13: THE TWO TICKS
│  cols 1-3      │▒     cols 4-9, --t-core     ▒│        cols 10-12        │  SIT ON THIS ROW, on the
│  --t-ground    │▒  4px --lamp-ink top cap    ▒│        --t-ground        │  PLATFORM LABEL BASELINE
│                │▒                            ▒│                          │  -- one baseline shared
│                │▒  What belongs to everyone  ▒│                          │  by all three fields.
│                │▒                            ▒│                          │
│  Android-only  │▒  [COPY NEEDED: the core    ▒│  iOS-only concerns       │  the core is ONE
│  concerns      │▒   statement, ~40 words]    ▒│  live here. narrower,    │  continuous field running
│  live here.    │▒                            ▒│  indented, --t-edge      │  the section's full
│  narrower,     │▒  99.8%        ~20%         ▒│  labels.                 │  height, not a stack of
│  indented.     │▒  crash-free   faster start ▒│                          │  blocks.
│                │▒  [CONFIRM: resume-sourced] ▒│                          │
│                │▒                            ▒│                          │  edges are narrower AND
│  ┌──────────┐  │▒  ┌──────────────────────┐  ▒│                          │  indented, so the
│  │ Motive   │  │▒  │ Motive               │  ▒│  ┌──────────┐            │  hierarchy survives even
│  │ Compose  │  │▒  │ Fleet management, US │  ▒│  │ Motive   │            │  in greyscale.
│  │ migration│  │▒  │ 2024 - now           │  ▒│  │ Fleet    │            │
│  └──────────┘  │▒  │ ─────────────────────│  ▒│  │ App      │            │
│                │▒  │ Software Engineer 2  │  ▒│  └──────────┘            │
│  ┌──────────┐  │▒  │ Motive Fleet App     │  ▒│  [COPY NEEDED: the iOS   │  ONE COMPANY,
│  │ HSBC     │  │▒  │ Kotlin, KMP business │  ▒│   edge card's small      │  THREE LAYERS.
│  │ MVVM,    │  │▒  │ logic, Clean Arch.   │  ▒│   print, <= 12 words.    │  the two ticks
│  │ REST,    │  │▒  └──────────────────────┘  ▒│   must NOT claim Swift   │  out of the
│  │ Retrofit │  │▒                            ▒│   or UIKit work: item    │  core ARE the
│  │ 2021-23  │  │▒  CI/CD and workflow        ▒│   46 attributes the      │  KMP shape,
│  └──────────┘  │▒  automation. Releases:     ▒│   Fleet App, and the     │  drawn.
│                │▒  phased rollouts, crash    ▒│   resume names KMP       │
│  ┌──────────┐  │▒  and ANR monitoring.       ▒│   shared modules, not    │  2px --t-ink ticks; they
│  │ Naskay   │  │▒  Bluetooth device          ▒│   Swift.]                │  attach to the LAYER'S
│  │ Kotlin,  │  │▒  verification flows.       ▒│                          │  NAME, not to a card.
│  │ APK size │  │▒                            ▒│                          │
│  │ 2020-21  │  │▒  THE GATES SHE OWNS        ▒│                          │  item 19, set as a block
│  └──────────┘  │▒  Product spec              ▒│                          │  in the CORE -- a gate
│                │▒  code review               ▒│                          │  shared with Sahib is
│                │▒  device QA                 ▒│                          │  shared work. ROUND 13:
│                │▒  security and privacy      ▒│                          │  ONE GATE PER LINE below
│                │▒  ASO                       ▒│                          │  1024, and kept above it
│                │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│                          │  -- five owned gates read
│                                                                     128  │  as five gates.
├──────────────────────────────────────────────────────────────────────────┤
│ Those are the same four gates the home page names. (cols 4-9)            │  the §9.3
│ [COPY NEEDED: the link back to the home page's four gates, ~25 words]    │  connection,
│                                                                          │  made on the
│ github.com/Tanya-jain99      jaintanya999@gmail.com                      │  core column
└──────────────────────────────────────────────────────────────────────────┘
```

### G.3a T1's three fields — the allocation at 1024 and up (round 12), the ticks and the gates block at every width (round 13)

The run-B render of this band is the reason §B.5 gained a ruling this round. Measured at 1440 (`tanya-band-1440-light.png`): Android edge **x 120–402**, core **x 426–810**, iOS edge **x 834–1014** — that is Android cols 1–3, **core cols 4–7** and **iOS cols 8–9**, with **cols 10–12 empty down the whole band**. §G.3 draws the core at cols 4–9 and the iOS edge at cols 10–12. The build moved two fields left and left three columns standing empty, which is a **keep-out lane for the contact plate in all but name**, and §B.5 forbids one in terms. At 1024 the same allocation crushed the core to a **245px field — 31 characters over 24 lines** (item T4), which is a newspaper column and narrower than §C.6's own floor for a *card*.

**The allocation, restored, at every width from 1024 up:**

| Field | Cols | 1024 (content 928, x 48–976) | 1440 (content 1200, x 120–1320) |
|---|---|---|---|
| Android edge | **1–3** | x 48 → 261.9, **213.9** wide | x 120 → 402, **282** wide |
| Shared core | **4–9** | x 285.9 → **737.7**, **451.8** wide | x 426 → **1014**, **588** wide |
| iOS edge | **10–12** | x 761.7 → 976, **214.3** wide | x 1038 → 1320, **282** wide |

**Measures.** The core's field carries 32px of inner padding at both widths, so its measure is **387.8px at 1024 — ~47 characters at 17/28** — and **524px at 1440 — 30.8em, inside `--measure-body`'s 32em, ~63 characters**. 47 is well past the ≥ 45 this band has to clear and past §C.6's 29-character card floor; item T4 closes on the allocation and needs no copy change. The edge fields are 213.9 and 282 — narrower than the core at both widths, which is §G.3's hierarchy, and wide enough for a card at §D.1's 420 cap.

**The core stays left of the plate's band, and that is the whole of the plate's effect on this page.** Col 9's right edge is **737.7** at 1024 against a band beginning at **748** — **10.3px clear** — and 1014 against 1164 at 1440, 150 clear. **No load-bearing mark on this page goes right of col 9 at any width**, which is what puts the `Owns` line, the gates block and both ticks out of the plate's reach by rule rather than by case. The iOS field sits inside the band and carries only a heading and a card — prose in a container — which §B.10 exempts, and which is the same standing §C.6's slot used to claim and no longer needs.

**Below 1024 the core is full width, and round 13 rules what that costs the gates block.** §B.10 asserted that the `Owns` line was covered below 768 "by being full width". It is not: a line that sets to its field's own measure ends where the field ends, and measured on the run-D build the gates line ends at **x 305 at 360** against a band at **232**, and at **x 539 at 768** against **492** — three of `qa:plate`'s seven flags (`/tanya/` at 360, 390 and 768). The core does not narrow; §B.5 calls it a diagram with a fixed minimum extent and item T4 exists because it was narrowed once already. **What changes is the line breaking:**

> **Below 1024 the gates block sets one gate per line — five lines, no commas, separated by space (§B.2), a real `<ul>` with no markers and no indent, as PM1 and WP2 left every other list on this site.** The label above it is unchanged.

The numbers, and they are constants rather than viewport expressions. The longest gate is `security and privacy`, 20 characters. At 360 the core's inner left is **x 40** (content x 20–340, the field full-bleed to the content edges, 20px pad) and 20 characters at body 16/1.62 is **157px**, so the line ends at **x 197 — 35px clear** of the band at 232. At 390, **x 221** against 262, 41 clear. At 768 the core's inner left is **x 64** and 20 characters at body 17/1.62 is **167px**, ending at **x 231** against a band at **492 — 261px clear**. Nothing in that arithmetic moves with the viewport, so every width inside each range is looser than the width quoted. At ≥ 1024 the block may keep either form and keeps this one: five owned gates read as five gates, and the comma-separated run-on was always the compromise the narrow column forced. §C.6's floor cards keep the comma form, because a 293px slot turns five lines into five lines of two words.

**The two ticks, and where they stop.** §G.3's claim is that "the two ticks out of the core **are** the KMP shape, drawn". Round 12 fixes their horizontal geometry: **each tick is a 2px `--t-ink` stroke leaving the core horizontally and terminating at the core field's own boundary** — x 285.9 and x 737.7 at 1024, x 426 and x 1014 at 1440. The ticks do not cross the gutter, for two reasons and both are rules already in this document: no component on this site draws across one of §B.5's gutters, and a tick crossing the right gutter at 1024 would end at 761.7, **13.7px inside the plate's band**, which the composition rule forbids for a connector whose meaning is exactly its continuity. Symmetric, one rule, both sides, every width ≥ 1024.

**Round 13 gives them their vertical geometry, and it is a different y than round 12 implied.** Round 12 said the edge card sat one gutter beyond, "top-aligned to the tick", and the Engineer is right that this is not expressible: each edge field's first mark is its platform label, so the card's top is a label's height below the field's top, and aligning a row across three independent columns needs either the core split into grid rows — which costs "one continuous field" — or a measurement in JS, which §H.1 forbids for layout. The wording is withdrawn. What replaces it is a decision about **what the tick means**, and the geometry falls out of it:

> **A tick is the point at which a platform layer attaches to the core. It attaches to the layer's *name*, not to any card in it.** Each tick's stroke centre sits on the **platform label's first baseline** — `SHARED` at the core end, `ANDROID` and `iOS` at the edge ends — which is one baseline shared by all three fields, because all three labels are the same type at the same lead-in.

Three things follow, and each one closes something that was open.

- **The offset is a constant, not a measurement.** The core field's lead-in is its 4px `--lamp-ink` cap plus 32px of inner padding; **the two edge fields carry no cap and no fill and take the same 36px of lead-in**, so three identical labels — Anek 500 `wdth` 75 at micro 13/1.45 — land on one baseline with nothing measured. On the shipped Anek subset that baseline is **50px below the band's top border edge**, and the tick is a 2px stroke centred on it. **50 is the consequence and the baseline is the spec:** if the shipped face's ascent moves the number, the number is corrected and the alignment is not, and PLAN.md §4.3's assertion checks the two labels' baselines against the core's rather than checking 50.
- **The pairing is carried by content, which is where it was always carried.** `Motive` appears in all three fields (item T1) and that is what says one company, three layers; the tick says the *layer* comes out of the core. Round 12 asked a stroke to do a job the cards were already doing, and paid for it in an alignment nobody can build. **The tick therefore no longer waits on T1** — it is buildable the day this line lands, with or without the Android edge's Motive string.
- **The band's rows, restated so the tick's y is unambiguous.** The band is two rows: a label row carrying the three platform labels on one baseline, and a body row where all three fields' content begins. **Item T2's "the edge fields are top-aligned to the core's first card row" is superseded by "top-aligned to the band's body row"** — same reason, same defect: the core's first card sits below a ~40-word statement and two numerals, so its y is a measurement and not a grid line. Everything else in T2 stands: the band's height is the core's height, each edge field stops at its own last card, and no field draws a boundary, fill or rule below its content.

**At 360 the same rule, rotated.** The two ticks leave the **core field's bottom edge** and terminate at the top of each edge block, meeting that block's platform label on its baseline — the same 2px `--t-ink` stroke, the same meaning, one turn. They no longer leave the Motive card mid-field as the wireframe below draws them; that drawing is round 12's and the ticks in it move to the foot of the core.

**Item T1 — Motive lands on two layers and there is one tick — is build-side, not spec-side.** Rendered, the core holds the Motive card, the iOS edge holds a label, a 20px dash and the three words `Motive Fleet App`, and **the Android edge holds HSBC and Naskay and no Motive at all**: the Jetpack Compose migration is printed inside the core card's small print instead. §G.3's practice table has named the Compose migration as the **Android edge's first content** since round 3, §G.4's own table lists it at row 2, and COPY §7.2's Motive card supplies the string. The spec is right and it is unbuilt; the page's central claim is half built and it is the first thing to fix here. **The Android edge's card order is Motive (Compose migration) → HSBC → Naskay, and the iOS edge's is Motive (Fleet App)**, so Motive is the first card in all three fields and "one company, three layers" is legible without reading a word.

**Item T2 — each field's block ends where its content ends.** Measured at 1440 the Android cards ended at y 675 and then 775px of nothing followed; the iOS field carried three words at the top and **1,395px of nothing**; at 1024 the band was 1,705px tall and roughly 60% of its area was empty. §G.3's own words for what item 46 bought are that it "fills the iOS column with a named product **rather than with structure alone**", and structure-with-a-caption-in-it is the condition §G.5 recorded as closed. **The band's height is the core's height. The edge fields are top-aligned to ~~the core's first card row~~ the band's body row (round 13 — see the ticks above; the core's first card sits below a ~40-word statement and two numerals, so its y is a measurement and not a grid line) and stop at their own last card — they are not stretched to the core's foot, and no field draws a boundary, fill or rule below its content.** With T1 built, the iOS field carries a real card and the Android field carries three, so the remaining difference in column heights is the honest one: the core has more in it, which is the argument.

**Item T3 — no full-height rules at ≥ 1024. Cut them.** Both edge columns took a 2px `--t-ink` left rule running the **full 1,450px height of the band**, and in dark those two rules are near-white and the brightest things on her page — brighter than her text. §9.4 bans the broadsheet hairline by name, §B.2 says structural separation is done with fill and space and never with rules, and §B.6 principle 4 says the site never has two loud things at once. **§G.3 asks for that rule at 360 and only at 360**, where depth replaces horizontal position and the rule is the only thing doing the separating; at ≥ 1024 the three fields are already separated by the core's fill, by the grid's gutters and by the edges' indentation, and the rules were drawing a box around emptiness. This is `/tanya/`'s "remove one thing" (§J).

**Item T5 — the quotes keep their quotation marks and lose the rule.** COPY §7.1 supplies both quotes inside typographic quotation marks and addresses a note to me: "the two quotes are short and load-bearing… **they must read as quotation, not as pull-quote decoration**." Rendered, the marks are dropped, the text sets at body size in `--t-ink`, and the only cue is a left rule — which is the pull-quote convention, so the instruction is inverted exactly. **Print the marks; drop the rule** (§B.2 again, and §T3's ruling one paragraph up applies to the same 2px stroke). The attribution sets in **Instrument Sans regular, never oblique** — the family ships no italic and the browser was synthesising one. The quotes block takes **cols 4–9**, the core's own columns, so the two quotes sit under the field whose argument they support rather than in a band of their own.

**T1 at 360** — the three columns collapse to one, and the structure survives as **indentation depth plus a rule**, not as horizontal position. Core content is full width on `--t-core`; edge content is inset 24px with a 2px `--t-ink` left rule and a condensed platform label above it. The two ticks out of the Motive card rotate from left-and-right to **down-and-down**, pointing at the two edge blocks that now sit below rather than beside — the same 2px stroke, the same labels, the same claim. The reader still learns which things are shared, which are platform-specific, and that one product is all three, which is the only thing the layout has to survive.

```
┌────────────────────────────────────────┐ 360  --t-ground
│  ← thegeekdogs                         │  64
│                                        │  56
│  Tanya Jain                            │      Anek 600, 38/1.04, --t-ink
│                                        │  16
│  Native Android and KMP, and the iOS   │      body, --t-edge
│  side too. She owns how the work       │
│  gets made.                            │
│                                        │  24
│  ┌──────────────────────────────────┐  │      portrait slot 320 x 320
│  │ [PENDING: AI headshot, item 23   │  │      reserved
│  │  option 2. image to be supplied] │  │
│  └──────────────────────────────────┘  │
│                                        │  56
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │      4px --lamp-ink cap: the ONLY
│ ▒  SHARED                            ▒ │      colour on the page, marking
│ ▒                                    ▒ │      the core. label Anek wdth 75.
│ ▒  [COPY NEEDED: core statement,    ▒ │
│ ▒   ~40 words]                       ▒ │      --t-core field, full bleed to
│ ▒                                    ▒ │      the content edges. 20px pad.
│ ▒  99.8%          ~20%               ▒ │
│ ▒  crash-free     faster start       ▒ │      numeral-large, tabular.
│ ▒  [CONFIRM: resume-sourced]         ▒ │
│ ▒                                    ▒ │
│ ▒  ┌──────────────────────────────┐  ▒ │      the Motive card sits INSIDE
│ ▒  │ Motive                       │  ▒ │      the core field, because the
│ ▒  │ Fleet management, US         │  ▒ │      KMP work is shared work.
│ ▒  │ 2024 - now                   │  ▒ │      white @82% on --t-core,
│ ▒  │ ─────────────────────────────│  ▒ │      surface #F9F9F9, 15.66:1
│ ▒  │ Software Engineer 2          │  ▒ │
│ ▒  │ Motive Fleet App             │  ▒ │
│ ▒  │ Kotlin, KMP business logic,  │  ▒ │
│ ▒  │ Clean Architecture           │  ▒ │
│ ▒  └──────────────────────────────┘  ▒ │
│ ▒                                    ▒ │
│ ▒  CI/CD and workflow automation.    ▒ │
│ ▒  Releases: phased rollouts, crash  ▒ │
│ ▒  and ANR monitoring. Bluetooth     ▒ │
│ ▒  device verification flows.        ▒ │
│ ▒                                    ▒ │
│ ▒  THE GATES SHE OWNS                ▒ │      item 19, in the CORE. ROUND
│ ▒  Product spec                      ▒ │      13: ONE GATE PER LINE below
│ ▒  code review                       ▒ │      1024, no commas, separation
│ ▒  device QA                         ▒ │      by space (§B.2). longest is
│ ▒  security and privacy              ▒ │      "security and privacy", 157px
│ ▒  ASO                               ▒ │      from x 40 -> ends x 197, 35
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │      clear of the band at 232.
│       │                       │        │      THE TWO TICKS, round 13:
│       ▼                       ▼        │      they leave the CORE'S BOTTOM
│                                        │  40  EDGE, not the Motive card,
│  │ ANDROID EDGE                        │      and land on each edge block's
│  │                                     │      PLATFORM LABEL BASELINE --
│  │ ┌────────────────────────────────┐  │      the layer's name is what a
│  │ │ Motive                         │  │      tick attaches to. inset 24px
│  │ │ 2024 - now                     │  │      + 2px --t-ink left rule;
│  │ │ ───────────────────────────────│  │      depth replaces horizontal
│  │ │ Jetpack Compose migration      │  │      position. Motive appears
│  │ └────────────────────────────────┘  │      here too, as the Compose
│  │      ▁▁▁▁▁▁▁▁▁▁▁                    │      migration -- the Android-only
│  │                                     │      half of the same job. that is
│  │                                     │      the layout doing its work,
│  │                                     │      not a duplicate.
│  │ ┌────────────────────────────────┐  │
│  │ │ HSBC                           │  │
│  │ │ Global bank                    │  │
│  │ │ 2021 - 2023                    │  │
│  │ │ ───────────────────────────────│  │
│  │ │ Software Engineer              │  │
│  │ │ [no product name -- item 27]   │  │
│  │ │ MVVM migration, REST, Retrofit │  │
│  │ └────────────────────────────────┘  │
│  │      ▁▁▁▁▁▁▁▁▁▁▁                    │
│  │ ┌────────────────────────────────┐  │
│  │ │ Naskay Technologies            │  │
│  │ │ 2020 - 2021                    │  │
│  │ │ ───────────────────────────────│  │
│  │ │ Android Intern                 │  │
│  │ │ Kotlin, Glide, Retrofit        │  │
│  │ └────────────────────────────────┘  │
│                                        │  40
│  │ iOS EDGE                            │
│  │ ┌────────────────────────────────┐  │      item 46. the column is no
│  │ │ Motive Fleet App               │  │      longer structure with nothing
│  │ │ 2024 - now                     │  │      in it.
│  │ │ ───────────────────────────────│  │
│  │ │ [COPY NEEDED: <= 12 words. no  │  │      MUST NOT claim Swift or UIKit
│  │ │  Swift/UIKit claim]            │  │      work -- the resume names KMP
│  │ └────────────────────────────────┘  │      shared modules, not Swift.
│                                        │  56
│  Those are the same four gates the     │      the §9.3 home-page link,
│  home page names.                      │      restated here
│  [COPY NEEDED: ~25 words]              │
│                                        │
│  github.com/Tanya-jain99               │
│  jaintanya999@gmail.com                │      her address, not the studio's
└────────────────────────────────────────┘      (§B.10, item 53)
```

### G.4 Direction T2 — the pipeline she owns *(unblocked, buildable, still not recommended)*

**Her page is the studio floor seen from above, as a process rather than as a room.** A directed graph of the build pipeline — spec, build, review, QA, security, release — laid out as a plan, with edges showing the path work takes. Selecting a node reveals the practice at that point, the tooling decision behind it, and where she did it. §7 says the review gates are hers; this makes the page an argument about the gates.

**The case for it:** it is the strongest possible link between her page and the site's pitch (§9.3's explicit ask), it is unambiguously diagrammatic and non-chronological, and it reuses the floor's plan vocabulary without repeating the floor's room.

**Pass 1's blocker is closed.** Item 47's answer is her resume, and it names six practices with places — which is what a node graph needs and what §5 alone could not give:

| # | Practice, tool or workflow change | Where | Which T2 node it fills |
|---|---|---|---|
| 1 | Re-architecture with **KMP business-logic modules + Clean Architecture** | Motive, 2024 – now | Build |
| 2 | **Jetpack Compose migration** | Motive | Build |
| 3 | **CI/CD pipeline enhancement and workflow automation** | Motive | Release |
| 4 | **Owning releases** — phased rollouts, crash and ANR monitoring | Motive | Release |
| 5 | **MVVM migration** off a legacy architecture | HSBC, 2021 – 2023 | Build / Review |
| 6 | **APK-size reduction** through code and resource optimisation | Naskay, 2020 – 2021 | Build |

Combined with item 19, every node would carry both a gate she owns and a named practice with a company behind it — spec ← product spec, review ← code review, QA ← device QA, security ← security and privacy — so **T2 could now be built with no invention at all.** It is not recommended for a different reason, given in §G.5: the floor at ten stations has made the home page the site's pipeline diagram, and T2 would be the second one.

**T2 tokens: identical to G.1.** Not similar — identical. Connector strokes use `--t-edge` (5.59 : 1 on `--t-ground`, comfortably over the 3 : 1 a meaningful graphic needs). The node field uses `--t-core`. The traversed path is marked with `--lamp-ink` at large-mark sizes only. **Swapping T1 for T2 is a layout-module change and a page-content change; it touches no token and no shared component.** That is exactly the swappability §9.3 requires.

**T2 at 1440:**

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │
├──────────────────────────────────────────────────────────────────────────┤
│ Tanya Jain                       ┌───────────────────────────────────┐   │
│ She owns how the work gets made. │ [PENDING: AI headshot, item 23]   │   │
│                    (cols 1-5)    └───────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│  THE GRAPH  (cols 1-8)                       │  PANEL (cols 9-12)        │
│                                              │                           │
│         ┌────────┐        ┌────────┐         │  fixed slot, the same     │  the same
│         │ SPEC   │───────▶│ BUILD  │         │  pattern as the floor's   │  interaction
│         │  (1)   │        │(2,5,6) │         │  card slot (§C.6): hover, │  grammar as the
│         └────────┘        └───┬────┘         │  focus and tap all land   │  floor -- which
│                               │              │  here.                    │  is now the very
│                          ┌────▼───┐          │                           │  reason NOT to
│         ┌────────┐◀──────│ REVIEW │          │  default content = the    │  build it (§G.5)
│         │  QA    │       │  (19)  │          │  node she is most         │
│         │  (19)  │       └────┬───┘          │  associated with.         │  node numbers
│         └───┬────┘            │              │                           │  refer to §G.4's
│             │            ┌────▼─────┐        │  every node now carries   │  practice table;
│             └───────────▶│ SECURITY │        │  a gate she owns AND a    │  (19) means the
│                          │   (19)   │        │  named practice with a    │  gate comes from
│                          └────┬─────┘        │  company behind it. no    │  item 19.
│                          ┌────▼────┐         │  node is empty any more.  │
│                          │ RELEASE │         │                           │
│                          │  (3,4)  │         │                           │
│                          └─────────┘         │                           │
│                                              │                           │
│  the graph is a PLAN, not a line: work       │                           │
│  loops back from review, which is the        │                           │
│  honest shape and the persuasive one         │                           │
├──────────────────────────────────────────────────────────────────────────┤
│  Where she has done this                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │  work cards,
│  │ Motive       │  │ HSBC         │  │ Naskay       │                    │  3-up, attached
│  └──────────────┘  └──────────────┘  └──────────────┘                    │  to nodes, not
│     ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁                           │  to dates
└──────────────────────────────────────────────────────────────────────────┘
```

**T2 at 360:** the graph becomes a vertical traversal — nodes in a single column, connectors in the left gutter drawn as 2px `--t-edge` strokes including the loop-back from review, each node 64px tall and a full-width `<button>`; the panel opens inline directly beneath the selected node rather than as a sheet, for the same reason as §C.7. The loop-back edge survives because it is drawn in the gutter, which is the one thing that must not be lost when the graph goes vertical.

### G.5 The decision, re-taken against the resume and item 19

Pass 1 recommended T1 for one reason only: T2's content did not exist. `docs/tanya-jain-resume.pdf` (item 47) and item 19 between them destroy that reason. **The recommendation still stands, but the argument for it has changed completely, and so has T2's status.**

**What the new information does.** The resume supplies exactly what item 47 asked for — six named practices with places (listed in §G.4). Item 19 makes her the owner of product spec, device QA, security/privacy/ASO and half of code review. Map those onto T2's six nodes and every node gets both a gate she owns and a named practice with a company behind it: spec ← product spec; build ← the Compose migration and the KMP modules at Motive; review ← code review; QA ← device QA and the 99.8% crash-free figure; security ← security and privacy; release ← owned releases, phased rollouts, crash/ANR monitoring and the CI/CD work at Motive. **T2 is now buildable, honestly, with no invention.** That is a real change and it must be said plainly rather than buried.

**Why T1 still wins anyway — and the deciding argument is new, not a restatement of Pass 1's.**

1. **The floor grew, and it took T2's territory.** Items 32 and 51 put all seven agent roles on the visible floor. The home page now *shows* the pipeline — spec, design, code, tests, scan, review, watch — as ten stations a visitor can open one at a time. A six-node directed graph of spec → build → review → QA → security → release on her page would be the site's **second pipeline diagram**, in a different projection, arguing the same thing. §9.3 asks her page to connect to the home page without repeating it, and at eight stations T2 cleared that bar; at ten it does not. Pass 1 could not have known this, and it is the fact that decides the round.
2. **T1's own hole closed in the same breath.** Item 46 fills the iOS edge with the Motive Fleet App, and the resume attributes the shared core to a named, dated re-architecture — *KMP Business Logic Modules + Clean Architecture*, Motive, 2024 to now. T1's central field is no longer a metaphor with one card in it; it is the thing she actually did, named, with a company and a date on it. The direction that was recommended-by-default is now recommended-on-merit.
3. **The resume made T1 structurally richer than T2.** Its content splits three ways along T1's own axis with no forcing: the Jetpack Compose migration is Android-only and belongs on the Android edge; the KMP business-logic modules, Clean Architecture, CI/CD, workflow automation and release ownership are cross-platform and belong in the core; the Fleet App on iOS belongs on the iOS edge. **One company, three positions.** That is the KMP shape drawn out of her own work rather than asserted about it, and T2 has no equivalent move — its graph would put all six Motive facts in a queue.
4. **Item 19's content is a list, and lists do not need a graph.** Gate ownership prints as a named block on the core column, which is where §G.3's closing section already was, previously carrying a `[COPY NEEDED]` link back to the home page's four gates. That slot now holds real names. T2 would spend a whole page's structure delivering something a block delivers.

**What would flip it.** If the floor were ever cut back to five agent desks, argument 1 evaporates and T2 becomes the stronger page. Tanya's sign-off comes after the build (§9.3), and T2 is now a live, unblocked option at that review rather than a documented might-have-been — which is a materially better position than it was in Pass 1. The swap remains a layout-module change and touches no token and no shared component (§G.4).

**Round 12 — what changed, and why equality now holds in render and not only in design.**

The run-B review passed this section's design argument and refused its render, and the distinction is the point. *In design*, nothing on her page is softer, rounder, paler or more decorative than his: same two families, same card object, same numeral treatment, no hue on hers that his does not have and none on his that hers does not, and in dark hers is the stricter of the two. Brief §9.3's stereotype trap is cleanly avoided and it was avoided on paper in round 3. *In render, at 1024–1439, hers read as the lesser page* — **a 31-character prose column between two mostly empty gutters, with the iOS field carrying three words down 1,700px, against a map on his page that is a dense diagram naming ten products across nine columns.** A visitor comparing the two pages at that width was not comparing two designs; she was comparing a built page with an under-built one, and no amount of token symmetry answers that.

Four things close it, and **none of them needs new content** — the Compose migration, the Fleet App, the second tick and the core statement are all already written, in COPY §7.2 and §7.3 and in this section's own practice table:

| | Was, rendered | Is, specified |
|---|---|---|
| Core measure at 1024 | 245px, **31 characters** over 24 lines | 387.8px, **~47 characters** — cols 4–9 restored (T4) |
| Motive's layers | two — the Compose migration buried in the core card's small print | **three**, one card per field, Motive first in each (T1) |
| Ticks | one, a floating dash 60px above and 300px right of its card | **two**, symmetric, leaving the core's own boundary (T1) |
| iOS field | a label, a dash and three words above 1,395px of nothing | a named product card; **the field ends where its content ends** (T2) |
| Loudest marks on the page | two full-height 2px rules, brighter than her text in dark | **cut at ≥ 1024**; separation by fill, space and indentation (T3) |

**The test this section now holds itself to is a rendered one**, and it is the one the packet in §K asks her to answer: at 1024 and at 1440, in both schemes, her band must carry **three occupied fields, three Motive cards, two ticks and a core at a full measure**, and the page must read as the denser of the two at the width where his map is densest. Equality of ambition was never in doubt in this document; equality of *execution* is what run B measured and what round 12 specifies. Her page still carries the harder layout problem of the two and it still does not pad.

On equality: her page carries the harder layout problem of the two (a three-field structure that has to survive collapse to one column while keeping its meaning, versus Sahib's matrix which collapses by rotation), and it does not pad. §7 warns against padding her row count to match his; she has three companies and gets four cards — three companies plus the iOS-edge card, and the fourth exists because Motive genuinely lands on two layers, not because his page has five. The test is whether removing the iOS-edge card would remove information: it would, because item 46 is the answer to a question §I asked, so it stays. Nothing on her page is softer, rounder, paler or more decorative than his; if anything hers is the stricter of the two.

---

## H. Motion spec (§10)

### H.1 Shared timing tokens

| Token | Value | Meaning |
|---|---|---|
| `--dur-1` | 120ms | State acknowledgement — press, focus ring, selected fill. |
| `--dur-2` | 200ms | A small element changing — card slot content, a stage node. |
| `--dur-3` | 360ms | An element entering or leaving — the mobile card panel. |
| `--dur-4` | 640ms | One step of the page's orchestrated moment. |
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | Things arriving. |
| `--ease-inout` | `cubic-bezier(.65, 0, .35, 1)` | Things moving between two known states. |
| `--ease-idle` | `cubic-bezier(.4, 0, .6, 1)` | The only easing permitted on a loop. Symmetric, so the loop has no direction. |
| `--loop-floor` | 4800ms | The floor's idle period. The only loop on the site. |

Every animation is interruptible. Nothing blocks text paint. There are **no scroll-driven effects anywhere on this site** — no parallax, no scroll-linked scrub, no reveal-on-scroll. That is a deliberate choice, not an omission: it removes an entire class of budget risk and reduced-motion risk, and §9.4's "spend boldness once" implies the scroll itself should be boring. Sections do not fade up. Cards do not lift on hover.

### H.2 How each world uses them differently

- **Studio — motion is spatial.** Uses all four durations. Things arrive from the direction they belong to: the floor's card-slot content enters with an 8px translate from the scene's side, so the card visibly comes *from* the desk. `--ease-out` for arrivals, `--ease-idle` for the one loop.
- **Sahib — motion is incremental.** Uses `--dur-1`, `--dur-2` and `--dur-4` once. Nothing slides; cells only fade and take a 1px scale on fill. Rationale: breadth is a quantity argument, so the motion should accumulate rather than travel.
- **Tanya — motion is structural.** Uses `--dur-2`, `--dur-3` and `--dur-4` once. Nothing fades in; elements move into alignment. Rationale: her subject is structure, so motion should show dependency order, not arrival.

### H.3 The one orchestrated moment per page

| Page | Named moment | What happens |
|---|---|---|
| `/` | **Lights on** | Fires only after the h1 has painted. Nine monitor glows come up in DOM order — Sahib's cabin, Tanya's cabin, then the seven agents — at **70ms** stagger, `--dur-4` each, opacity 0 → their §C.9 still-frame value. Then a **400ms hold with nothing happening**, and the empty chair's lamp cone comes up alone over 900ms. Total ≈ **2.5s** (last glow starts at 8 × 70 = 560ms, ends at 1200ms; + 400 hold; + 900 lamp). Pass 1's 90ms stagger was sized for seven stations and would run nine to ~2.7s, which starts to feel like a load screen — the stagger tightened rather than the hold shortening, because **the hold is the moment** and it is the one part of this that must not be cut. Nothing moves position; nothing is offscreen-then-onscreen; nothing blocks paint. The room fills, then stops, then one light comes on where nobody is sitting. |
| `/work/pocket-manager/`, `/work/wedding-planner/` | **The track fills** | Stage nodes fill left to right at 90ms stagger and **stop hard at the current node**. Future nodes never animate at all — no fade, no pulse, nothing. The animation stops exactly where the truth stops, which is the same rule the whole site is selling. |
| `/sahib/` | **The map fills** | Coverage cells fade up column by column: iOS, Android, KMP, Flutter — then a 300ms hold — then the end-to-end-with-AI column arrives alone in `--lamp`. 120ms per column. The hold makes the 2025 fact the event. Item 45 is what makes this moment work: every one of the first four columns now has a cell to fade up, so the sequence reads as four filling and one arriving, rather than as two filling, two staying blank, and one arriving. |
| `/tanya/` (T1) | **The core draws** | The shared-core field's boundary draws top to bottom over 900ms; each edge column's content becomes visible only as the core passes its row, **and it appears 120ms *after* the core has passed it** (round 12). The edges cannot appear before the core does, which is the architectural claim made as choreography. **The lag is the whole moment and it is one delay.** Run B rendered core and edges clipped at the same y at 300ms (`tanya-coredraws-300ms.png`), which makes the claim technically true and visually absent: with zero lag a visitor sees a reveal wipe, the generic scroll-effect move §H.1 removes from the rest of the site by banning scroll-driven effects. At 120ms — one step below `--dur-4` and above the threshold at which two events read as one — the edges are visibly *following* the core, and the dependency is watched rather than asserted. |
| `/tanya/` (T2) | **The path resolves** | Graph edges draw in traversal order, including the loop-back from review, 140ms per edge. |
| `/work/`, `/contact/`, `/404` | none | A contact page's job is to be answered, not performed. |

### H.4 Reduced motion, per page

`prefers-reduced-motion: reduce` removes idle loops and orchestrated moments. It removes nothing else, and every still state is a designed frame.

| Page | What is removed | What the still state looks like |
|---|---|---|
| `/` | "Lights on"; the floor's idle loop | The room at §C.9's still frame — nine glows at nine *different* static opacities, lamp cone at full. The card slot still swaps content, instantly, no slide, no fade. The sticky contact plate still appears (it is `position: sticky`, never animated). |
| `/work/*` | "The track fills" | The track renders complete: done nodes filled, current node at 18px with its ring and core, future nodes hollow with dashed connectors. Identical to the end frame of the animation. |
| `/sahib/` | "The map fills" | The map renders fully filled, with the end-to-end column in `--lamp`. Identical to the end frame. |
| `/tanya/` T1 | "The core draws" | Core field fully drawn, both edge columns visible, `--lamp-ink` cap present. |
| `/tanya/` T2 | "The path resolves" | All edges drawn, including the loop-back. |
| everywhere | the toggle's glyph transition (§B.10a) — the cone's 120ms fade-and-scale goes to 0ms | **Nothing else about the toggle changes, because there was nothing else.** The scheme switch is already instant for every visitor: no colour property on this site carries a `transition`, so there is no page-wide fade to remove and no half-themed frame to suppress. Under `reduce`, the cone appears or disappears between frames and the tokens switch exactly as they always do. The control keeps its position, its size, its two shapes, its focus ring and its persistence. |
| everywhere | nothing else | Focus rings, selected states and the card-slot swap all still respond, at 0ms. Response to a user action is not decoration and it is not removed — §10 says motion answering a user action is always welcome, and instant is a valid duration. |

**One consequence worth stating plainly:** the dark scheme adds **no motion to this site at all.** Every orchestrated moment in §H.3 is scheme-agnostic (the lamp column, the core's draw order, the track stopping at the truth), every still frame in the table above is the same frame in both schemes, and the only new animation in round 4 is 120ms on a 20px glyph. Six palettes cost zero new motion budget and zero new reduced-motion branches.

The reduced-motion site is a complete, still, finished site (§4). It is not the site with the animation subtracted; on every page above, the still frame *is* the animation's last frame, which is why it looks finished.

### H.5 Note to the Interaction Engineer

Library choice is not mine. The only thing this spec requires of it: the one loop must be pure CSS wrapped in `@media (prefers-reduced-motion: no-preference)` so the default, unconditional state is the still one (PLAN.md §4.4 already plans this and it is the right call). Everything else here is a one-shot on `opacity` and `transform` only. No property outside `opacity`, `transform` and — for the stage nodes — `stroke-dashoffset` is ever animated on this site. Blur radius is never animated (§6.1), and there is no exception.

---

## I. Open questions

Round 5. Round 4's list carried six items; **two of them are now ruled and removed**, leaving four. Factual and copy gaps live in `QUESTIONS.md` and `COPY.md` and are not duplicated here.

**Ruled and closed in round 5, and where the answer now lives:**

- **Round 4 item 4, OG images and `theme-color` under two schemes** — **ruled.** One set of OG cards built from the **light** tokens for every page; `theme-color` emitted as two entries keyed to `prefers-color-scheme`, with the toggle-override mismatch accepted rather than scripted around. Recorded in **§B.2a**. Removed from this list.
- **Round 4 item 5, the future stage node's light stroke alpha** — **ruled: the priced fix is applied.** 3 : 1 for a meaningful graphic is a Perf & A11y line, not a preference, so `rgba(15,42,46,.45)` becomes `rgba(15,42,46,.60)` — **4.01 : 1** on `--sheet`, **3.83 : 1** on `--band`. **§E.1** carries the new value and the arithmetic, **§E.1a** records why the dark twin is not raised with it. Removed from this list.

**Closed in round 4, and why:**

- **Round 3 item 6, Pocket Manager's stack** — **resolved.** `FACTS.md` §(d) is a direct read of the local repo: Kotlin 2.0.21 with a six-file Java remainder, Compose-only presentation with no `res/layout*` and a repo test pinning that, Hilt, Room, WorkManager, minSdk 23 / targetSdk 36. The TheGeekDogs row of the coverage map no longer rests on item 44's phrase, and the `[BLOCKED]` markers in §F.7 and §F.8 are **removed in round 6** against that section — the cell prints Pocket Manager, native Android, like every other cell on the map. Removed from this list.
- **Round 3 item 7, T2** — **closed: T1 stands.** §G.5's argument (the floor at ten stations has made the home page the site's pipeline diagram; T2 would be the second one) is the recommendation, T2 remains documented as unblocked and buildable, and Tanya's post-build review is where a swap would be raised. Nothing further is owed here, so it stops being an open question.
- **Round 3 item 9, hero subhead length** — **stale.** `COPY.md` §1 cut the variant A body to **24 words** in round 3, inside §B.7's ≤ 26-word budget, with the 41-word version kept in Appendix A as "hero body, long form". The constraint is met; the question was answered by the Copywriter before it was asked twice. Removed.

**Moved to `QUESTIONS.md`, and tracked there, not here:**

- Round 3 item 1, the cabin prop list (§C.4) → **`QUESTIONS.md` 64.**
- Round 3 item 5, the ~1180px mobile floor section (§C.7) → **`QUESTIONS.md` 65.**
- Round 3 item 8, the person pages' closing address (§B.10) → **`QUESTIONS.md` 66.**

Each is stated there in the owners' terms and none of them is repeated below. If any comes back with a different answer, the section it names is what changes.

**With the Copywriter since round 4, still open:**

1. **The Designer desk's checking gate** (§C.2). COPY.md §2.4 says "Design review"; item 42 mapped design review onto architecture review back when the desk was off the floor. Now that it is visible, does its card say design review, architecture review, or something else? — **being resolved by the Copywriter in round 4.** The card slot's geometry is identical whichever way it lands, so nothing in §C.6 waits on it.
2. **The Release Watcher desk's gate, and its collision with the empty chair** (§C.2). Item 42 mapped the release gate onto the chair's Ship approval; with both on the floor the chair is the decision to ship and the Release Watcher needs a gate of its own. — **being resolved by the Copywriter in round 4.** It is a narrative problem, not a layout one.
3. **The two-owner gates on the human cards** (§C.6). Code review is Sahib's and Tanya's; the Spec Writer's architecture review is Sahib's while item 19 gives the product spec to Tanya. — **being resolved by the Copywriter in round 4** as a one-line copy fix. If the copy cannot carry it, it becomes a card-design change and comes back here **before** the 344 / 320 min-heights are locked, since a second line in that block is 28px.

**Out of the dark scheme, still open:**

4. **Does the studio floor band keep its full-bleed inversion in dark? — CLOSED, round 12, on render.** Run B rendered it at 360 and at 1440 in both schemes and the answer is yes: the 1.21 : 1 boundary reads, **because the region carries the only lit surfaces on the page**, which is exactly what §B.2a predicted and could not prove on paper. `home-1440-dark-full.png`, `plate-over-scene-900-light.png`. The question asked for a screenshot rather than an argument and it got four; nothing in §B.2a changes. The original text is kept below for the record and the item is off the list — **§I is down to three, all three with the Copywriter.**

   ~~It does in this spec, and the arithmetic supports it — the floor sits 1.21 : 1 below the dark page, it is the only region with lit surfaces, and it takes a 1px `rgba(232,237,233,.14)` top edge (§B.2a). But 1.21 : 1 is a *quiet* boundary next to the 13.53 : 1 the light scheme gets for free, and the room is the site's one bold moment. This is still the one thing I would most like seen rendered at 360 and at 1440 before it is called settled, and it should be the first screenshot of the first review that ships the dark scheme rather than a question answered on paper. The step 1 review rendered light only, so it is not yet answered.~~

## J. Before-ship: remove one thing (§9.4)

Per page, the thing to cut in the final pass. These are pre-committed so the decision is not relitigated when everyone is attached to the work. **Round 12 re-checks all ten rows against the run-B render, and six move.**

**The discipline that moved them, stated once.** §J's own rule since round 7 is that **a pre-committed cut cannot be spent on something the spec forbids in terms** — a spec violation is a defect and gets fixed, and spending the route's one discretionary cut on it means the route gets nothing. Round 12 turned four of the run-B reviewer's eight nominations into rules: the plate over the room and the plate on `/contact/` (§B.10), the axis's dead end-margins on `/work/` (§E.2), and Tanya's two full-height edge rules (§G.3). **That is the right outcome and it costs those four routes their nomination**, so each gets a live one below. Two more rows are spent: `/`'s skewed cabin plate and `/work/`'s one-line descriptions were both verified built in run B (items 12 and 13).

| Page | Remove | Changed this round? |
|---|---|---|
| `/` | **The floor's seam grid** (§C.10, first in the weight order). Round 8's row — the skewed wall-mounted cabin nameplate — is **spent**: run B verified both plates horizontal, 15px, `--chalk`, on the near half of their own cabin floor, each inside its own button and no other at every width. The run-B reviewer nominated *the plate over the room* and round 12 made that §B.10's unconditional rule instead, so it is not available. The seam grid is: it is already first in §C.10's cut order, it is the cheapest byte on the page, and it has the second reason round 8 recorded — **the grid renders a full module past the occupied plan on every side, so the room's footprint reads larger than anything standing in it.** Cutting it makes the room the size of what is in it. | **Yes.** |
| `/` | ~~**The cabin nameplate mounted on the wall, skewed.**~~ Set "Sahib Singh" and "Tanya Jain" on the same horizontal baseline as every other plate in the room, in `--chalk` at the same size step, on the near half of their own cabin floors (§C.3, §C.4), and drop the door-plate conceit. It buys back the only skewed type on the site, the only nameplate treatment that changes between breakpoints, the least legible text on the page, and the plate that landed inside Tanya's button at 1024, 1440 and 1920. It costs nothing: §C.4 carries the cabin/desk distinction on enclosure, footprint, uniqueness and occupancy, in that order, and none of the four is the plate.~~ **SPENT — verified built in run B (item 12).** | **Yes.** Step 3's rendered review named it. The previous row — the border around §C.6's card slot — leaves this list because it is no longer a discretionary cut: §C.6 now forbids the container in terms, the border is a spec violation the step 3 review raised as an item, and a pre-committed cut cannot be spent on something the spec already bans. The floor-seam lines stay in the fallback, first in §C.10's weight order, and they now have a second reason to go (the seam grid renders a full module past the occupied plan on every side, so the room's footprint reads larger than anything standing in it). |
| `/work/` | **The store link on the index row.** The previous row — the one-line description under each product name — is **spent**: run B verified neither entry prints its one-liner. The run-B reviewer nominated the axis's 48px dead end-margins and §E.2 now rules them out by construction, so they are not available. The store link is: `/work/pocket-manager/` prints the same link ~400px later on the page the index row exists to send you to, and an index whose job is to route does not need to convert twice. The product name and its stage track carry the row, which is what run B proved when the one-liner came off. | **Yes.** |
| `/work/pocket-manager/` | **The seven-item bulleted list in `Build`.** It is one of only two bulleted lists on the site, §B.2 separates with space rather than with glyphs, and the four feature lines read faster without a marker in front of them. This displaces the Play Store badge graphic and run A's fourth-screenshot nomination (`05-export.png`, by COPY §4.7's own account a row in settings tagged Beta, not a screen); **both stay on the bench and either is right if this one is refused.** The two-above-the-fold fix did not need the screenshot cut, so it is genuinely unspent. | **Yes**, to the run-B reviewer's preferred nomination. |
| `/work/wedding-planner/` | **The bullet markers on "What's in it".** Seven short lines separated by space read faster than seven with a glyph in front of them, and this is the site's other bulleted list. It displaces the second device screenshot, which is not spendable this round for a mechanical reason — item 73 has not supplied screenshots 03 and 04, so the page ships one shot and there is no second one to cut. That row returns the moment the owners supply them. | **Yes**, and the previous row is deferred rather than dropped. |
| `/sahib/` | **The duplicated email address in the closing links row** (item S4). The page closes with `Sahib on GitHub · Sahib on LinkedIn · sahiboffc@gmail.com` and then, 40px under it, `sahiboffc@gmail.com` again at display size with a rule beneath. COPY §6.5 writes **one** email link. Drop it from the links row and keep the closing one, which is the one §B.10's per-world address rule is about. The previous row — the finance-domain annotation down the map's row labels — **was never built, so it cannot be cut**; it stays on the bench and its case is still stronger than it was, since item 45 took the map from 6 filled cells to 10 and item 72 put a product name in every one. | **Yes.** |
| `/tanya/` | **The intro's second paragraph** (COPY §7.1: "Underneath that is the shape she works on: a shared core, native code at the edges, and the developer practices that keep the two from drifting apart."). Her page **is** that sentence — §G.3's whole argument is that the visitor learns the shape of KMP by reading a page built in it — and saying it as well as building it is the one place on this page the layout explains its own joke before the reader gets it. The run-B reviewer nominated the two full-height edge rules and §G.3 now cuts them by rule, so they are not available; the platform glyphs were never built and cannot be cut either, and their case is **stronger** now that Motive appears on all three layers, since the edge labels carry a real distinction an icon would blur. | **Yes.** |
| `/contact/` | **The split header.** The previous row — the second call to action, "one email, one link, one answer" — is **spent by rule**: the second call to action on this page was the sticky plate, and §B.10 now removes the plate from `/contact/` at every width, because a persistent affordance that repeats the page it rests on is redundant rather than persistent. What is left to cut is the header's two-part split; on a page whose entire content is three printed addresses inside cols 1–9, one header line is enough and the split is a composition borrowed from pages that have more to say. | **Yes.** |
| `/404` | **The footer's nav repeat and the `Elsewhere` block** — this row made specific (item E2). Rendered, the page is 1,120px of which **615px is footer**: the studio line, the location line, the address, a four-item nav repeat, an `Elsewhere` block with four outbound links, the employer note and the rights line. "A nav menu underneath the joke" is exactly that nav repeat and that `Elsewhere` block, and naming them is what makes this row spendable instead of aspirational. **The header nav stays** — it is site chrome on every route — and so do the studio line, the location line, the address and the rights line, which are the footer everywhere else. | **Yes**, made specific. |
| everywhere | The noise texture on the work-card surface (§D.6). The base, the edge and the tilt carry the object; the noise is the fourth thing propping up three that already work. | No, and it now applies to four more objects: the compressed strip's cards use the same surface. |
| everywhere | **The light/dark toggle is exempt: it is a control, not decoration.** A pre-committed cut cannot remove a thing a visitor operates, and item 49 puts it on every page by decision. What *is* removable, if this row ever has to pay, is the toggle's 28 × 28 plate (§B.10a) — the glyph alone inside its 44 × 44 target reads at 12.7–14.4 : 1 in all six palettes and loses nothing but a visible box. The two shapes, the target size and the focus ring are not on the table. | **New this round.** |

**Not on this list, and deliberately.** The two cabins' props (§C.4) are not a "remove one thing" candidate, because item 52 asked for them by name. If the floor ever has to lose weight the order is in §C.10 — seam lines, then the second prop in each cabin, then the cabin walls — and a station is never the cut. **Note that `/`'s round-12 row now spends the seam lines, so if the floor later needs weight the order starts at the second prop in each cabin.**

---

## Round 12 disposition — every run-B review item, appendix to §J

Thirty items. **Twenty-six are spec-side and are applied above; four are build-side, where this document is right and unbuilt.** Nothing is deferred and nothing is refused.

| # | Item | Sections touched | Disposition |
|---|---|---|---|
| H1 / B1 | Plate strikes `1,000+` at 768–1022 | §B.9, §E.3, §B.10 | **Spec.** Figures take cols 1–5 of 8 and cols 1–7 of 12; a column allocation, not a per-width case. |
| H2 / B2 | Plate covers the Designer station at 768–1023 | §B.10, §C.3 | **Spec.** The wrapper does not span the floor section at any width. |
| H3 / B3 | Plate strikes the card's `Owns` line at 768 / 1024 / 1440 | §B.10, §C.6 | **Spec, and the contradiction was mine.** The card-slot exemption is deleted; the promise stands. |
| H4 | The room reads its pipeline backwards at ≥ 768 | §C.3 | **Spec.** Seven roles re-assigned to the same seven modules; no coordinate moves. |
| H5 | The chair does not read as a chair; its plate sets on the cone < 768 | §C.3, §C.7 | **Spec.** Seat + back + support specified, with a 250ms acceptance test; the chair's plate moves to the bottom of its own button. |
| H6 | The 1024 slot reservation is 15px short of its own longest card | §C.6 | **Spec.** Re-derived from measurement: 352 / 416 / 264 / 320. |
| H7 | Five stage labels, two alignments | §E.3, §E.2 | **Spec.** All five centre, in every form, at every width. |
| H8 | The strip card is full content width at 768 | §D.1, §D.2, §D.5 | **Spec.** New 768 row; no card wider than 420 anywhere. |
| H9 | The selected fill is built to spec and cannot be seen | §C.8 | **Spec, and the amplitude was mine.** 34% → 52%, with a pixel-difference acceptance test. |
| H10 | The proof band at 1024–1439 | §B.5, §B.9, §E.3 | **Spec.** One grid, two rows; round 11's stack withdrawn. |
| W1 | The horizontal axis fills 70% of its own band block | §E.2 | **Spec.** The axis takes its block's inner edges; the pitch falls out. |
| PM1 | Run A's cut is unspent, and there is a better one | §J | **Spec.** §J's row is now the `Build` bulleted list. |
| WP1 | The differentiator is a 280px thumbnail in a 1200px row | §B.11 | **Spec.** 2× in cols 1–4 with §5.2's paragraph in cols 6–10. |
| WP2 | The bullet markers on "What's in it" | §J | **Spec.** §J's row for the route. |
| C1 | The plate prints the studio address 300px from itself | §B.10, §J | **Spec.** `/contact/` carries no plate; §J's row becomes the split header. |
| S1 | 5,235px of one fill; `--s-panel` is never a section block | §F.4b | **Spec.** Two full-bleed `--s-panel` blocks, stepping around the map. |
| S2 | The map's two-state grammar is 1.13 : 1 in light | §F.4b | **Spec.** New `--s-fill`, 2.97 : 1 light and 2.91 : 1 dark. |
| S3 | The work card at 768 overhangs its own stand | §D.1 | **Spec.** Same ruling as H8. |
| S4 | The closing address prints twice | §J | **Spec.** §J's row for the route. |
| S5 | In default print the map's marks lose their state | §D.8 | **Spec.** Stroke plus size difference; `print-color-adjust` refused. |
| S6 | The map and the cards arrive with no section line | §F.4b | **Copy gap, recorded as spec.** The wireframes draw both strings and COPY writes neither; two `[COPY NEEDED]` markers added. |
| **T1** | Motive lands on two layers; one tick, floating | §G.3 | **BUILD.** §G.3's practice table has named the Compose migration as the Android edge's first content since round 3 and COPY §7.2 supplies the string. The spec is right and unbuilt. Geometry clarified above so it cannot be built the other way again. |
| T2 | The iOS column is a labelled void | §G.3 | **Spec.** Each field's block ends where its content ends; the band's height is the core's. |
| **T3** | Two 2px full-height rules are the loudest marks on her page | §G.3 | **BUILD.** §G.3 asks for the rule at 360 and only at 360; the ≥ 1024 rules were added by the build against §B.2 and §9.4. Written into §G.3 as a prohibition so it cannot recur. |
| T4 | The core's measure is 31 characters at 1024 | §G.3 | **Spec.** Core restored to cols 4–9; ~47 characters at 1024. |
| **T5** | The quotes lost their marks and kept the pull-quote rule | §G.3 | **BUILD.** COPY §7.1 supplies both quotes inside typographic quotation marks and addresses the note to me; the instruction was inverted exactly. The treatment is now written down so it is not a note in a copy file. |
| T6 | "The core draws" is a single wipe | §H.3 | **Spec.** A 120ms lag behind the core's boundary. |
| T7 | The plate takes her `Owns` line at 768 | §B.10, §G.3 | **Spec.** Same ruling as H3, plus "no load-bearing mark right of col 9". |
| **E1** | There is no empty room on `/404` | §B.11 | **BUILD.** §B.11 has specified the empty room since round 3; the Engineer recorded it as out of run B's scope. Owed, not disputed. |
| E2 | §J's cut is unspent, and it is the clearest of the eight | §J | **Spec.** §J's row now names the footer's nav repeat and the `Elsewhere` block. |

**Plus the Perf & A11y audit's design ruling:** `/tanya/` printing as three columns → §D.8, **spec**, the whole person page collapses to one column in print.

### I.1 Round 13 — the reconciliation round after build run D

Four items in round 13, all of them places where two sections of this document disagreed or where a number I wrote could not be reached, **plus row 5 added in round 14** for the final audit's one non-waived finding. **No new rule, no weakened rule, nothing deferred.**

| # | What run D reported | Sections touched | Disposition |
|---|---|---|---|
| 1 | `qa:plate`'s **seven** sub-768 collisions, flagged not failed: `/`'s `1,000+` and `downloads` at 360 and 390, and `/tanya/`'s `Owns` line at 360, 390 and 768 | §B.8, §B.10, §G.3a | **Spec, and both wrong sentences were mine.** §B.8's "3 across at 320: 96px each" predates the 128px band and is replaced — **the three figures stack below 768**, numeral in a 68px column from x 20, label from x 104 on the same baseline, widest ink at **x 162 against a band at 232**. §B.10's claim that the `Owns` line was covered "by being full width" is deleted — **the gates block sets one gate per line below 1024**, longest line ending **x 197 at 360** and **x 231 at 768**. Two compositions, seven marks, **no exemption and no region left the wrapper**. `qa:plate` should now fail rather than flag. |
| 2 | §G.3a's tick geometry is not expressible: "top-aligned to the tick" needs a row aligned across three independent columns | §G.3a | **Spec, and the wording was mine.** **A tick attaches to the layer's *name*, not to a card:** its stroke centre sits on the **platform label's first baseline**, one baseline shared by all three fields because all three take the same 36px lead-in and the same label type — **50px below the band's top border edge** on the shipped face. The baseline is the spec and 50 is its consequence. T2's "top-aligned to the core's first card row" becomes "top-aligned to the band's body row", for the same reason. **The tick no longer waits on T1.** |
| 3 | §C.8's selected fill measures **2.36 : 1 light / 2.61 : 1 dark**, and its own ≥ 30% pixel-share test is unreachable | §C.8 | **Spec, and the 30% was mine.** The share is a number about the desk's drawing — the top face is ~25% of the station's box at 1440 and ~16% at 360 — so no fill on that face can move 30% of it. The test is **replaced, not lowered**: delta ≥ 60 on the top face (met, 67 / 69) **and ≥ 100 on the 1px `--chalk` edge** (met, 106–178), with the share reported. **The edge carries the selected state**, because 3 : 1 on fill alone is unreachable under the glow ceiling this section keeps — 100% `--chalk` is only 4.9 : 1. |
| 4 | §C.4's 6% warm offset, open since run A | §C.4, §C.1, §C.10 | **Deleted from the spec.** A fifth fill in a four-fill scene, spent on a difference this document itself calls sub-threshold, on the one distinction §C.4 says is *not* carried by colour. The step-2 review already ruled it out; round 13 removes it from the text so it stops being reported as open. |
| **5** (round 14) | The final audit's **Finding 1**: `--s-fill` on `--s-ground` is **2.97 : 1 light / 2.91 : 1 dark**, under SC 1.4.11's 3 : 1, **not waived** | §F.1, §F.4, §F.4a, **§F.4c** (new) | **Spec, and the auditor's proposed fix is refused on arithmetic while the finding is upheld in full.** Nudging `--s-fill` cannot reach the 3.2 : 1 margin in either scheme: the fill is squeezed between the ground on one side and the product name's AA body 4.5 : 1 on the other, and §F.4c prints both bounds — light needs `L ≤ 0.235756` and `L ≥ 0.242124`, dark needs `L ≥ 0.148347` and `L ≤ 0.144357`. Both windows are empty; the ceiling is ~3.13 : 1 with no margin, bought by walking the cell's own text onto the AA line. **Taken instead: a 1.5px `--s-ink` stroke on every filled cell, at 14.09 : 1 light / 14.11 : 1 dark against `--s-ground` and 4.74 / 4.84 : 1 against the fill it encloses — the distinction carried on its own, with margin in multiples rather than hundredths.** `--s-dim` refused for this mark: 1.95 / 1.97 : 1 against its own fill, so it would dissolve into the cell it bounds. **No token value changes in either scheme.** The contract for the auditor's pixel check is restated as the **stroke against the ground**, not the fill against the ground; `--s-fill`'s 2.97 / 2.91 : 1 is demoted to the quiet half of a two-part mark, the same discipline §E.1 and §C.8 already take. |

**One wording correction, owed to the Engineer and made in §B.10.** The promise "the plate never covers content — not prose" and reserve 1's "prose and headings are exempt at both widths" are two different rules, and reserve 1 is the built and testable one. The promise's "not prose" is struck. A sticky element in normal flow passes over what is above it — that is what makes it free — so the promise is about load-bearing marks plus the named regions the wrapper does not span, and nothing else. Correcting the promise rather than the reserve is what keeps the rule from being weakened.

**Still open after this round, and none of it is mine:** T1's Android-edge Motive label (Copywriter), both headshots (QUESTIONS.md item 23), and §K's packet.

---

## K. Presentation packet for Tanya

Brief §9.3 gives her the sign-off and it gives it to her **after** the build. §G.5 is the argument for T1 over T2, and an argument she cannot see the alternative to is not an argument she can answer — she could only say yes, or "something's off". This section is what the owners put in front of her, in order, and the one thing they ask.

**Show it after the consolidated fix run, not before.** T1, T2, T3, T4 and §D.8's print ruling are all open against her page, and asking her to sign off on a defect is how a review gets a polite yes. The one exception is `tanya-band-1024-light.png`, which goes in the packet *as a named defect* — see step 3.

### K.1 What she is shown, in this order

| # | File, under `docs/reviews/runB/` | Why it is in the packet |
|---|---|---|
| 1 | `tanya-band-1440-light.png` | The three-field structure at its best: the shared core as a continuous field, the 4px `--lamp-ink` cap, one company in the core. This is the page's argument in one frame. |
| 2 | `tanya-band-1440-dark.png` | The same band in dark, where hers is the stricter of the two person pages. Shown second so the structure is read before the scheme. |
| 3 | `tanya-band-1024-light.png` | **Shown with the defect named out loud.** The narrow core and the empty iOS column are items T4 and T2 and they are being fixed; §G.3 carries the numbers. She is being asked about the structure, not about a build state. |
| 4 | `tanya-band-360-light.png` | The honest proof that the structure survives collapse — as indentation plus a rule rather than as horizontal position. This is the hardest thing on her page and the frame that shows it works. |
| 5 | `tanya-quotes-1440-light.png` | How her recommendation of Sahib is quoted back on her own page. She wrote the words; she should see the setting. |
| 6 | `print-tanya-p1.png` | What her page prints as — the document someone attaches to an email. |

Six frames. No measurement files, no wireframes, no token tables: she is reviewing a page, not a spec.

### K.2 What she is given to read

Three passages, and the first two are the alternative:

1. **§G.4 in full — Direction T2, "the pipeline she owns".** The practice-to-node table, the 1440 graph wireframe and the 360 vertical traversal. This is the page she is *not* getting, and it is unblocked and buildable — the resume and item 19 closed its content gap, and swapping to it is a layout-module change that touches no token and no shared component. She has to see it or she cannot disagree with the decision.
2. **§G.5 — the decision, and what would flip it.** The argument for T1 over T2, and the one fact that reverses it, named: the floor dropping back to five agent desks. **Include §G.5's round-12 block**, which says plainly that the design held and the render did not, and what closes the gap.
3. **Brief §9.3 itself, and §G.1's paragraph on why her world is the most achromatic surface on the site.** Both, together, because the second is a consequence of the first and she is the only person who can say whether the consequence is acceptable.

### K.3 The one question

Everything above is context for a single question, and it is the one no screenshot answers:

> **"Does the strictness read as rigour, or as austerity?"**

Her page is the most achromatic surface on the site by design (§G.1) — one 4px `--lamp-ink` cap and nothing else — and that decision was taken to avoid brief §9.3's stereotype trap, not because anyone asked her. It is the one judgement in this document made *about* her rather than *with* her, and it is the one thing that cannot be settled by measurement, by contrast ratio or by a rendered frame.

Ask it after frame 4 and before frames 5 and 6, so she answers on the structure rather than on the quotes.

**Two things not to ask.** Do not ask whether she prefers T1 or T2 as a first question — §G.5 has taken that decision on stated grounds and asking it cold invites a courtesy answer; ask the question above, and let T2 be the thing she reaches for if the answer is "austerity". And do not ask her to approve the two resume-sourced numerals: `FACTS.md` row 52 cleared them for publication in their attributed form and the attribution is not hers to waive.

**If the answer is "austerity",** the fix is not a hue on her page — that is §9.3's trap arriving by the back door. It is §G.1's own lever: the `--lamp-ink` cap earns a second placement, on the two ticks out of the core, which are the page's structural claim and the one mark that would carry colour without softening anything.
