# DESIGN.md — TheGeekDogs.com

Design Lead, Pass 2 (round 3), amended in round 4. Pass 1 cleared the Direction human gate; the owners' answers are in `QUESTIONS.md` items 45–55 and are applied here in place. Structure and voice are Pass 1's; what changed is marked in the section that changed.

**Round 4.** Two owner decisions reverse `QUESTIONS.md` item 49: **every page ships a dark scheme**, and **every page carries a manual light/dark toggle**. Applied in place. Six palettes now exist, three light and three dark, all computed to AA by §B.2's method: §B.2 / §B.2a (studio), §F.4 / §F.4a (Sahib — his existing palette *is* his dark scheme), §G.1 / §G.1a (Tanya). The toggle is specified in §B.10a; the stage indicator is re-checked on dark in §E.1a; print (§D.8) always uses the light tokens; §H.4 confirms the toggle adds no motion. Round 3's other decisions are untouched.

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
│▓  │ see §C.7 for the plan        │    ▓│      targets 101 x 64, cabins
│▓  │                              │    ▓│      320 x 88, chair 104 x 96.
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
│ 01  Architecture review                │      the ONLY numbered sequence on
│     Before a line is written, a        │      the site. §9.4 permits it: the
│     person decides the shape...        │      gates are genuinely ordered.
│                                        │      numeral hung in the 20px
│ 02  Code review                        │      margin at 360; title Anek 600
│     Every change is read by a          │      20px; body 16/26 --muted
│     human before it merges...          │
│                                        │
│ 03  QA on real devices                 │
│     Physical phones, not just an       │
│     emulator...                        │
│                                        │
│ 04  Security and privacy review        │
│     What the app collects, where       │
│     it goes, what's stored...          │
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
│░  4.3★   24 reviews   1K+ installs    ░│      numeral-large 24px tabular
│░  ────   ──────────   ───────────     ░│      + micro label under each.
│░                                      ░│      3 across at 320: 96px each.
│░                                      ░│  24
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
│▓                                      ▓│  56  reserve for the sticky plate
╞════════════════════════════════════════╡
│▒▒▒▒ thegeekdogs@gmail.com  (--lamp) ▒▒▒│  56  PERSISTENT CONTACT (§B.10)
└────────────────────────────────────────┘      sticky bottom bar, released
                                                before the final CTA.
```

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
│▓ │   isometric scene, cols 1-8            │  │ cols 9-12, 366 wide   │  ▓│
│▓ │   792 x 560, 6 wide x 5 deep plan      │  │ vertically centred    │  ▓│
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
│ 01  Architecture review                    │  That's the difference      │
│     Before a line is written, a person     │  between generated          │  the closing line
│     decides the shape: what the data       │  software and shipped       │  is anchored in
│     looks like, where the boundaries       │  software.                  │  cols 9-12,
│     are.                (cols 2-7)         │                             │  vertically
│                                            │  (cols 9-12,                │  centred to the
│ 02  Code review                            │   display-section)          │  whole group.
│     Every change is read by a human...     │                             │  it is not a
│                                            │                             │  card and not a
│ 03  QA on real devices                     │                             │  pull-quote.
│     Physical phones, not just an           │                             │
│     emulator...                            │                             │
│                                            │                             │
│ 04  Security and privacy review            │                             │
│     What the app collects, where it        │                             │
│     goes, what's stored, what's exposed.   │                             │
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
│░                                          │                             ░│  (cols 7-12)
│░ 4.3★      24          1K+                │  one shipped, one nearly    ░│  §E.3
│░ rating    reviews     installs           │  there.                     ░│
│░                                          │  [COPY NEEDED: <=8 words]   ░│
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
                                            (bottom-right, 16px inset, released
                                             before the final CTA section)
```

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

- **Mechanism:** `position: sticky; bottom: 0` on an element inside a wrapper that spans from the end of the hero to the start of the final CTA. It appears when the hero leaves, follows down the page, and retires on its own when the real CTA arrives. No JS, no scroll listener, no dismiss state.
- **< 768:** full-bleed bar, 56px tall, `--lamp` fill, 2px `--floor` top border, the address as a `mailto:` link filling the bar. Whole bar is the target. No width question here — the bar is the viewport.
- **≥ 768:** 260 × 56 plate, bottom-right, 16px inset from the viewport, same colours, same 2px border. **The plate width does not change between pages**, and that is checked rather than assumed: set at small/14px Instrument 600 with 20px padding each side, the longest of the three addresses (`jaintanya999@gmail.com`, 22 characters ≈ 169px) needs 209px of the 260 available; `thegeekdogs@gmail.com` needs ~202px and `sahiboffc@gmail.com` ~186px. All three clear 260 with ≥ 51px to spare, so **no wireframe in §B.8, §B.9, §F.7, §F.8 or §G.3 changes width**, and the plate stays one component with one size at every breakpoint on every page.
- **Reserve:** every section it can overlay gets +56px bottom padding, so it never covers content and never causes CLS.
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
- **`/contact/`** — three addressed blocks per §8 (studio `thegeekdogs@gmail.com`, Sahib `sahiboffc@gmail.com`, Tanya `jaintanya999@gmail.com`) as a 3-up at ≥1024, stacked at 360. **No form** (item 11): three printed addresses and nothing to submit, which removes a service dependency, a success state, a spam surface and a whole class of validation design. No orchestrated moment; a contact page's job is to be answered, not performed.
- **`/404`** — the only page that shows an **empty room**: the floor slab and the lamp, no desks, no chair. It reuses the floor's slab symbol and its lamp gradient and adds nothing, so it costs roughly zero new bytes. One line, one link home. `[COPY NEEDED: 404 line, ≤ 12 words.]` This is the one joke the site gets, and it is a joke that is also the argument.

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

**Decision taken by the owners (items 32 and 51): two human cabins + seven agent desks + one empty chair = ten stations.** Pass 1 argued for five agent desks on the grounds that ten would drop touch targets below comfort. That argument was right about the constraint and wrong about the arithmetic: it assumed the eight-station portrait plan (2 wide × 4 deep) had to absorb two more desks, when the honest answer is a different plan. Re-planned at 3 wide × 6 deep (§C.7), ten stations hold **101 × 64 CSS px** for the seven agent desks, 320 × 88 for the cabins and 104 × 96 for the chair — every one of them clear of the 44 × 44 floor, the smallest dimension in the set sitting 45% above it. So the count changed and nothing was cut to pay for it. Item 51 also closes Pass 1's own flag: Designer is on the floor, and the studio is not quietly admitting it has no design discipline.

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

**Desktop plan, 6 modules wide × 5 deep (scene box 792 × 560 at 1440, cols 1–8):**

```
  back-left ─────────────────────────────────────────────────────── back-right
       A        B        C        D        E        F
   ┌────────┬────────┬────────┬────────┬────────┬────────┐
 1 │                 │ SPEC   │        │ DESI-  │        │   row 1, far
   │   SAHIB CABIN   │ WRITER │   ·    │ GNER   │   ·    │
   ├      2 x 2      ┼────────┼────────┼────────┼────────┤
 2 │      (§C.4)     │        │ PROG-  │        │ TEST   │   row 2
   │                 │   ·    │ RAMMER │   ·    │ ENGIN. │
   ├────────┬────────┼────────┼────────┼────────┼────────┤
 3 │                 │ SECUR. │        │ REVIEW │        │   row 3
   │   TANYA CABIN   │ AUDITOR│   ·    │ -ER    │   ·    │
   ├      2 x 2      ┼────────┼────────┼────────┼────────┤
 4 │      (§C.4)     │        │RELEASE │        │        │   row 4
   │                 │   ·    │WATCHER │   ·    │   ·    │
   ├────────┬────────┼────────┼────────┼────────┼────────┤
 5 │        │        │        │        │        │ ┌────┐ │   row 5, near
   │   ·    │   ·    │   ·    │   ·    │   ·    │ │CHAIR│ │
   │        │        │        │        │        │ │ ☐   │ │
   └────────┴────────┴────────┴────────┴────────┴────────┘
  front-left ──────────────────────────────────────────── front-right
                                                     ▲
                              the whole of row 5 is empty except this
```

The seven agent desks sit on a checkerboard through columns C–F, rows 1–4, and read **row-major in COPY.md §2.4's pipeline order**: Spec Writer and Designer across the far row, Programmer and Test Engineer across row 2, Security Auditor and Reviewer across row 3, Release Watcher alone in row 4. The checkerboard is not decoration — it is what keeps a neighbour within one module of every agent desk, which is the condition mechanism 3 below depends on.

Scene arithmetic, so the box is not a guess: at 2:1 isometry with 128 × 64 modules, a 6 × 5 plan projects to (6+5) × 64 = **704px wide** and (6+5) × 32 = **352px tall** on screen, plus ~40px of cabin wall elevation and ~60px for the lamp cone above the chair, giving a drawn room of roughly **704 × 500** inside the 792 × 560 box. That leaves 44px of horizontal margin each side and 30px vertical — enough that the focus ring on an edge station never clips.

Desktop touch and pointer targets: agent-desk buttons ≈ **112 × 56**, cabin buttons ≈ **232 × 148**, the chair ≈ **128 × 88**. All are well past 44 × 44; at this breakpoint the binding constraint is legibility of the nameplate, not the target.

**How the eye is led to the empty chair — five mechanisms, all free, all unchanged by the count going from eight stations to ten:**

1. **It is the only station that does not move.** Every other station has a monitor glow on a slow idle loop. The chair does not. In a moving field, the still thing is what you look at (principle 4). This is the whole trick and it costs nothing. Nine idling stations make it work *better* than seven did.
2. **It is the only lit thing.** A pendant lamp above it casts a cone in `--lamp` onto the desk. It is the single largest area of accent colour on the entire site, and `--lamp` appears nowhere else in the scene — not in the cabins, not on a prop, not on a painting.
3. **Emptiness around it.** Row 5 is otherwise completely bare — **five** empty modules to its left, up from four in the eight-station plan, plus F4 empty directly behind it. Every other station has a neighbour within one module. From A.3: one thing is allowed to be loud, and it earns it with the space around it. The bigger room bought the chair more isolation, not less.
4. **It is nearest.** Front-right in an isometric projection is the closest cell to the viewer and renders largest.
5. **It is downstream.** Reading the plan as a pipeline, work moves back-to-front and left-to-right, and it reads in COPY.md §2.4's order exactly, terminating at the chair. The two cabins in columns A–B are open on their near and right sides so both occupants' monitors face across the room toward it.

### C.4 Human cabins vs agent desks

They must read as the same room but not the same class of thing. §6: humans get "more detail and warmth", agents are "deliberately more schematic". Item 52 makes the human stations **cabins** — a room inside the room — each with persona-specific items and a wall piece.

| | Human cabin | Agent desk |
|---|---|---|
| Footprint | **2 × 2 modules** (256 × 128 scene units in plan) | 1 × 1 module |
| Enclosure | Two waist-high partition walls on the **far and left** plan edges, 40 scene units tall. Open on the near and right sides so the camera sees straight in. **No ceiling and no fourth wall** — a cabin that closes is a box, and a box has no contents. | None |
| Silhouette | Bespoke geometry per person: the two walls, a floor patch in a slightly lit fill, the wall piece, and two props. Desk, monitor and chair are the **shared sub-symbols**, `<use>`d, not redrawn. | One shared `<symbol>`, instanced **seven** times with only a translate. Identical to each other on purpose. |
| Chair | Present, occupied, pulled out at a slight angle | Present, pushed in, square to the desk |
| Nameplate | Name in `--chalk`, title case, Anek 600, mounted on the near face of the left wall so it reads as a door plate | Role in `--chalk` @72%, Instrument 600, smaller, floating above the desk |
| Detail budget | **≤ 16 bespoke path segments per cabin, plus 3 shared `<use>`s.** See the accounting note below. | ~9 path segments, shared once across all seven |
| Warmth | The cabin floor patch and desk top get the lit fill at 22% with a 6% warm offset toward `--lamp` — below the threshold at which it reads as a colour, above the threshold at which the room feels uneven. The walls take the shadow fill on their right faces, which is what gives a cabin its interior. | Neutral lit fill only |
| Glow | **One** glow rectangle, on the main monitor only. Sahib's portrait monitor is drawn dark. | One glow rectangle |

The distinction is carried by **enclosure, footprint, uniqueness and occupancy**, in that order. Not by colour, and not by size alone — seven identical things next to two rooms is the read, and it is the honest one.

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

- **≥ 1024:** cols 9–12, 366px wide, vertically centred to the scene, **`min-height: 344px`**.
- **768–1023:** below the scene, full content width, `min-height: 344px`.
- **< 768:** below the scene, full width, **`min-height: 320px`**. See C.7.

**The ≥ 1024 min-height, derived rather than reserved-in-the-abstract.** PLAN.md §13 item 1 and §4.3 ask for this number so the Engineer does not have to invent one or measure it at build time. It is computed from the longest card at §B.4's ≥ 1024 type sizes, in the 366px slot with 24px padding — a 318px measure, which at Instrument Sans 17px (average advance ≈ 0.49em ≈ 8.33px) holds **≈ 38 characters per line**.

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

Rounded up to the 8px grid: **344px**, with ~13px of slack. Security Auditor — the longest agent card, 160 characters of body over 5 lines plus a one-line gate — computes to ~306, so it sits 38px inside the reservation. At 360 the same arithmetic with §B.4's mobile sizes (title 20/1.2, body 16/1.62, 280px measure ≈ 35 ch/line) gives 313.15 → **320px**. Pass 1's §C.7 wireframe said 168, which was simply wrong: the chair's own four-line card already computed to ~180 at 360, so the reservation had never been checked against the copy. It is now.

**This number does not remove the build-time assertion.** 38 characters per line is an estimate of Instrument Sans's average advance, not a measurement, and one extra wrapped line is 28px. PLAN.md §4.3's script should keep asserting the measured maximum against 344 and 320 and **fail the build loudly** if a copy edit overflows, rather than the value being quietly raised. If it does overflow, the fix is the copy or the padding — never a shorter reservation.
- **Default content at every breakpoint: the empty chair's card.** Nobody has to interact to receive the argument. This is the single highest-value decision in the floor spec, because most visitors will not touch anything.
- Hover, focus and tap all replace the slot's content, identically, in the same place. Nothing important is behind a hover (principle 3).

### C.7 Mobile decision: **tappable floor, portrait re-plan, panel below**

**Decision: a tappable floor with the card panel pinned directly below the scene. Not a vertical roster, and not a bottom sheet.**

Why not a vertical roster: the floor is the one bold moment on the site, and 80%+ of traffic is mobile. Throwing the moment away on the viewport where it matters most is exactly the "reduced, not designed" outcome §6 forbids.

Why not a bottom sheet (PLAN.md §4.3's default): a sheet covers the room, so you cannot see the desk you just tapped while reading its card; dismissing it costs a gesture; and it means the default state on load is "no card", which throws away the free argument in C.6.

Why not shrink the desktop plan to fit: 6 modules across 320px gives ~53px desks. Below a comfortable target and illegible.

**The move:** the same **ten** stations are re-planned into a **portrait room, 3 modules wide × 6 deep**, scene **320 × 520**. Same `<symbol>`s, same DOM, same order, different `<use>` transforms and `viewBox` — a layout change, not a content change.

**The two cabins span the full three-module width** and take the top two rows. That is not a compromise, it is the humans-first read made structural: at 360 the two largest objects in the room are the two people's rooms, they are the first thing on screen, the first thing in tab order and the first thing a screen reader meets. The seven agent desks then run 3-up beneath them in pipeline order, read row-major, and the chair sits alone at the bottom-right.

**Targets, and the honest numbers.** Agent desks: **101 × 64 CSS px** (320 less two 8px gaps, divided by three, and a 64px row). Cabins: **320 × 88**. The chair: **104 × 96** — the largest agent-class target in the room, because it is nearest and because it is the one thing the whole scene is pointing at. The smallest dimension anywhere in the set is 64px, which is 45% above the 44 × 44 floor. Pass 1's eight-station plan gave 88 × 72; ten stations trade 8px of height for 13px of width and stay clear. This is the number I can hold, and it is stated rather than rounded up.

**Height arithmetic**, so 520 is derived and not chosen: 88 (cabin) + 8 + 88 (cabin) + 12 + 64 + 8 + 64 + 8 + 64 + 12 + 96 (chair) = **512**, in a 520 box with 8px for the lamp cone's spill above the chair.

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
│▓  │ │ WRITER │ GNER   │ RAMMER │ │    ▓│  101 x 64, read ROW-MAJOR in
│▓  │ ├────────┼────────┼────────┤ │    ▓│  COPY.md §2.4's pipeline order
│▓  │ │ TEST   │ SECUR. │ REVIEW │ │ r4 ▓│
│▓  │ │ ENGIN. │ AUDITOR│ -ER    │ │    ▓│
│▓  │ ├────────┼────────┼────────┤ │    ▓│
│▓  │ │RELEASE │        │        │ │ r5 ▓│  the chair keeps its isolation
│▓  │ │WATCHER │   ·    │   ·    │ │    ▓│  and gains some: FOUR empty
│▓  │ ├────────┼────────┼────────┤ │    ▓│  modules adjacent (r5 c2-c3,
│▓  │ │        │        │ ┌────┐ │ │ r6 ▓│  r6 c1-c2), nearest to the
│▓  │ │   ·    │   ·    │ │CHAIR│ │ │ ◀─ ▓│  viewer, lit, and still.
│▓  │ └────────┴────────┴─┴────┴─┘ │    ▓│  104 x 96.
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
- **Focus is never the only indicator.** A focused desk also takes the selected fill (its desk-top surface lifts to `--chalk` @ 34%) and updates the card slot, exactly as hover and tap do.
- Skip link above the floor. The floor's roster is reachable and readable in order by screen reader with the SVG `aria-hidden`, per PLAN.md §4.1.

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

---

## D. Work cards (§6.1)

### D.1 Dimensions

| | 360 | 1024 |
|---|---|---|
| Layout | 1 column | 2 columns |
| Card width | 320 (full content) | 316 |
| Min height | 168 | 196 |
| Gap | 28 vertical | 32 vertical, 32 horizontal |
| Padding | 20 all round, 24 bottom | 24 all round, 28 bottom |

The 28px vertical gap is not arbitrary: a 320px card tilted 2.5° overshoots ~7px at each end, so 28px keeps ≥ 20px of real air between cards and stops the tilts from reading as collisions. At 1440 the grid goes to 3 columns at 328 wide.

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

**≥ 768 — horizontal**, five nodes evenly spaced, labels beneath. "Submitted for review" wraps to two lines, so the label row reserves two lines of height for all five nodes and no layout shifts.

```
   ●───────●───────◉───────○╌╌╌╌╌╌╌○
Specced  Building  Final    Submitted   Live
                   touches  for review
```

**< 768 — vertical**, because five labels across 320px gives 64px each and "Submitted for review" cannot set. Nodes in a column, connector vertical, label to the right, 44px row height.

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
| Attributed | filled, product name printed inside | we can name the product |
| Empty | nothing | no claim |

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
| `--s-panel` | `#1F2841` | 0.021905 | Raised surface — the map's field, section blocks. |
| `--s-ink` | `#E9EAF0` | 0.824605 | Primary text, filled cells. |
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
| `--s-panel` | `#1F2841` | **`#E0E2EC`** | 0.762961 | The map's field, section blocks. Steps *darker* than the ground in light, *lighter* in dark — the same "step away from the extreme" rule as the studio's band (§B.2a). |
| `--s-ink` | `#E9EAF0` | **`#1A2033`** | 0.014917 | Primary text, filled cells. |
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

**Motive appears on all three layers, and that is the page's argument, not a duplication bug.** The card lives in the core, where the KMP work is; the Android and iOS edges each carry a short connector — a 2px `--t-ink` tick running out of the core's card into the edge column, with a label at its end — showing the same product arriving on each platform. That is literally what a KMP architecture looks like, it fills the iOS column with a named product rather than with structure alone, and it costs one label per side rather than two duplicate cards.

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
│  ANDROID       │▒▒▒▒▒▒▒▒ SHARED CORE ▒▒▒▒▒▒▒▒│        iOS               │
│  cols 1-3      │▒     cols 4-9, --t-core     ▒│        cols 10-12        │
│  --t-ground    │▒  4px --lamp-ink top cap    ▒│        --t-ground        │
│                │▒                            ▒│                          │
│                │▒  What belongs to everyone  ▒│                          │  the core is
│                │▒                            ▒│                          │  ONE continuous
│  Android-only  │▒  [COPY NEEDED: the core    ▒│  iOS-only concerns       │  field running
│  concerns      │▒   statement, ~40 words]    ▒│  live here. narrower,    │  the section's
│  live here.    │▒                            ▒│  indented, --t-edge      │  full height,
│  narrower,     │▒  99.8%        ~20%         ▒│  labels.                 │  not a stack
│  indented.     │▒  crash-free   faster start ▒│                          │  of blocks.
│                │▒  [CONFIRM: resume-sourced] ▒│                          │
│                │▒                            ▒│                          │  edges are
│  ┌──────────┐  │▒  ┌──────────────────────┐  ▒│                          │  narrower AND
│  │ Motive   │  │▒  │ Motive               │  ▒│  ┌──────────┐            │  indented, so
│  │ Compose  │◀─┼▒──│ Fleet management, US │──▒┼─▶│ Motive   │            │  the hierarchy
│  │ migration│  │▒  │ 2024 - now           │  ▒│  │ Fleet    │            │  survives even
│  └──────────┘  │▒  │ ─────────────────────│  ▒│  │ App      │            │  in greyscale
│                │▒  │ Software Engineer 2  │  ▒│  └──────────┘            │
│  ┌──────────┐  │▒  │ Motive Fleet App     │  ▒│  [COPY NEEDED: the iOS   │  ONE COMPANY,
│  │ HSBC     │  │▒  │ Kotlin, KMP business │  ▒│   edge card's small      │  THREE LAYERS.
│  │ MVVM,    │  │▒  │ logic, Clean Arch.   │  ▒│   print, <= 12 words.    │  the two ticks
│  │ REST,    │  │▒  └──────────────────────┘  ▒│   must NOT claim Swift   │  out of the
│  │ Retrofit │  │▒                            ▒│   or UIKit work: item    │  core ARE the
│  │ 2021-23  │  │▒  CI/CD and workflow        ▒│   46 attributes the      │  KMP shape,
│  └──────────┘  │▒  automation. Releases:     ▒│   Fleet App, and the     │  drawn.
│                │▒  phased rollouts, crash    ▒│   resume names KMP       │
│  ┌──────────┐  │▒  and ANR monitoring.       ▒│   shared modules, not    │  2px --t-ink
│  │ Naskay   │  │▒  Bluetooth device          ▒│   Swift.]                │  ticks, labelled
│  │ Kotlin,  │  │▒  verification flows.       ▒│                          │  at the end
│  │ APK size │  │▒                            ▒│                          │
│  │ 2020-21  │  │▒  THE GATES SHE OWNS        ▒│                          │  item 19, set
│  └──────────┘  │▒  Product spec, code        ▒│                          │  as a block in
│                │▒  review, device QA,        ▒│                          │  the CORE -- a
│                │▒  security and privacy, ASO ▒│                          │  gate shared
│                │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│                          │  with Sahib is
│                                                                     128  │  shared work.
├──────────────────────────────────────────────────────────────────────────┤
│ Those are the same four gates the home page names. (cols 4-9)            │  the §9.3
│ [COPY NEEDED: the link back to the home page's four gates, ~25 words]    │  connection,
│                                                                          │  made on the
│ github.com/Tanya-jain99      jaintanya999@gmail.com                      │  core column
└──────────────────────────────────────────────────────────────────────────┘
```

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
│ ▒     │                       │      ▒ │      the two TICKS out of the card
│ ▒     ▼ to Android            ▼ to   ▒ │      survive the collapse: at 360
│ ▒       edge                    iOS  ▒ │      they point DOWN to the two
│ ▒                                    ▒ │      edge blocks instead of left
│ ▒  CI/CD and workflow automation.    ▒ │      and right. same 2px --t-ink.
│ ▒  Releases: phased rollouts, crash  ▒ │
│ ▒  and ANR monitoring. Bluetooth     ▒ │
│ ▒  device verification flows.        ▒ │
│ ▒                                    ▒ │
│ ▒  THE GATES SHE OWNS                ▒ │      item 19, in the CORE
│ ▒  Product spec, code review,        ▒ │
│ ▒  device QA, security and privacy,  ▒ │
│ ▒  ASO                               ▒ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│                                        │  40
│  │ ANDROID EDGE                        │      inset 24px + 2px --t-ink
│  │                                     │      left rule. depth replaces
│  │ ┌────────────────────────────────┐  │      horizontal position.
│  │ │ Motive                         │  │
│  │ │ 2024 - now                     │  │      Motive appears here too, as
│  │ │ ───────────────────────────────│  │      the Compose migration -- the
│  │ │ Jetpack Compose migration      │  │      Android-only half of the same
│  │ └────────────────────────────────┘  │      job. that is the layout doing
│  │      ▁▁▁▁▁▁▁▁▁▁▁                    │      its work, not a duplicate.
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
| `/tanya/` (T1) | **The core draws** | The shared-core field's boundary draws top to bottom over 900ms; each edge column's content becomes visible only as the core passes its row. The edges cannot appear before the core does, which is the architectural claim made as choreography. |
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

4. **Does the studio floor band keep its full-bleed inversion in dark?** It does in this spec, and the arithmetic supports it — the floor sits 1.21 : 1 below the dark page, it is the only region with lit surfaces, and it takes a 1px `rgba(232,237,233,.14)` top edge (§B.2a). But 1.21 : 1 is a *quiet* boundary next to the 13.53 : 1 the light scheme gets for free, and the room is the site's one bold moment. This is still the one thing I would most like seen rendered at 360 and at 1440 before it is called settled, and it should be the first screenshot of the first review that ships the dark scheme rather than a question answered on paper. The step 1 review rendered light only, so it is not yet answered.

## J. Before-ship: remove one thing (§9.4)

Per page, the thing to cut in the final pass. These are pre-committed so the decision is not relitigated when everyone is attached to the work. Every row below was re-checked against the round-3 decisions; three moved.

| Page | Remove | Changed this round? |
|---|---|---|
| `/` | **The floor's faint floor-seam lines.** The desks, the cabin walls and the empty modules define the room without them, and at 6 × 5 there are 30 of them rather than 20. | **Yes.** Pass 1's answer was the work-card strip, which item 50 has now put in the page on purpose. A pre-committed cut cannot be the thing the owners just asked for, so the fallback becomes the commitment. |
| `/work/` | The one-line description under each product name. The product name and its stage track say enough on an index page. | No. |
| `/work/pocket-manager/` | The Play Store badge graphic. The 4.3 / 24 / 1K+ figures already carry it, and the badge is Google's chrome sitting inside our composition. | No. |
| `/work/wedding-planner/` | The second device screenshot. One real screen of the multi-function view is the differentiator (§5.3); a second one dilutes it. | No — and the row is now live rather than conditional, since item 9a ships the page. |
| `/sahib/` | The finance-domain annotation running down the map's row labels. It is texture competing with the map, and the work cards below already carry the domains. | No, and the case is **stronger**: item 45 took the map from 6 filled cells to 10, every one now printing a product name. The map got busier, so the second annotation running down its left edge has less room to earn than it did. |
| `/tanya/` | The platform glyphs at the edge columns. The words "Android" and "iOS" are shorter, clearer and cheaper than any icon. | No, and the case is **stronger**: Motive now appears on all three layers (§G.3), so the edge labels are carrying a real distinction and an icon would blur exactly the thing the layout is arguing. |
| `/contact/` | The second call to action. One email, one link, one answer. | No — and with item 11 removing the form, the page is now three addresses, which makes the cut easier rather than harder. |
| `/404` | Everything except the line and the link home. The empty room is the joke; a nav menu underneath it is not. | No. |
| everywhere | The noise texture on the work-card surface (§D.6). The base, the edge and the tilt carry the object; the noise is the fourth thing propping up three that already work. | No, and it now applies to four more objects: the compressed strip's cards use the same surface. |
| everywhere | **The light/dark toggle is exempt: it is a control, not decoration.** A pre-committed cut cannot remove a thing a visitor operates, and item 49 puts it on every page by decision. What *is* removable, if this row ever has to pay, is the toggle's 28 × 28 plate (§B.10a) — the glyph alone inside its 44 × 44 target reads at 12.7–14.4 : 1 in all six palettes and loses nothing but a visible box. The two shapes, the target size and the focus ring are not on the table. | **New this round.** |

**Not on this list, and deliberately.** The two cabins' props (§C.4) are not a "remove one thing" candidate, because item 52 asked for them by name. If the floor ever has to lose weight the order is in §C.10 — seam lines, then the second prop in each cabin, then the cabin walls — and a station is never the cut.
