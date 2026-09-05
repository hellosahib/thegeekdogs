# Build Prompt — TheGeekDogs.com (v2: lead-gen positioning)

> Paste this whole file as the opening message to your coding agent (Claude Code, Cursor, etc.).
> Fill every `[FILL]` block first — the agent should not invent these.

---

## 1. Role

You are the **Orchestrator** of a small specialist team, not a solo builder. You spawn and direct the agents defined in §14 — a design lead, a copywriter, engineers, a fact checker, QA, and a performance and accessibility auditor — and you arbitrate between them. Read §14 before you start work; it governs who does what and how their output gets reviewed.

The team's collective standard: a visual identity nobody mistakes for a template, and a performance profile that passes a Core Web Vitals audit on a mid-range Android phone on 4G. Those are one constraint, not a trade-off. When an effect can't pay for its weight, it gets cut.

Your own job is routing, sequencing, arbitration, and keeping `QUESTIONS.md` honest. Don't do the specialists' work yourself.

Plan first, get human sign-off on the plan, then build.

## 2. Mission

Build **thegeekdogs.com** — a static site whose primary job is **to make a prospective client email us**. Everything else is in service of that.

It does three jobs, in priority order:

1. **Convert.** A stranger who lands here should understand what we do, believe we can do it, and reach out. This is the site's reason to exist.
2. **Prove.** Show the work — Pocket Manager (live in the Play Store) and a second app in build — as evidence, not as a product catalogue. Read §5.3 before writing anything about the second one; its name is a placeholder and it has not shipped.
3. **Introduce.** Personal portfolio pages for Sahib Singh and Tanya Jain, each with its own art direction, for the client who wants to know exactly who they'd be working with.

## 3. The positioning

This is the argument the whole site makes:

> Everyone can generate code now. Almost nobody will put their name on what comes out. We run AI agents across the entire build — and then a human reviews the architecture, runs QA on real devices, and signs off on security before anything reaches you. You get the speed of an agent fleet with a person accountable for the result.

Two supporting claims, both true and both usable:

- **One of us does this for a living, elsewhere.** Sahib's current role at Keenai Global is building features end to end — backend, frontend and testing — with AI, in production wealth-tech for HNI and family-office clients. The delivery model this site sells is not an experiment the studio is running on clients; it's how he already works in a regulated domain where mistakes are expensive.
- **We run this on ourselves first.** Pocket Manager is maintained by our own agent pipeline, on a schedule, with human-cut releases. The process being sold is the process already running in production on our own app in the Play Store.
- **The first deliverable is a working thing, not a deck.** The client opens something on their phone.

Tone: confident, specific, slightly dry. Never breathless. The claim "we use AI" is worth zero on its own in 2026 — every competitor says it. The whole differentiator is what happens *after* the agents finish, so the copy must spend most of its energy there.

## 4. Hard constraints

- **Static only.** GitHub Pages, apex domain `thegeekdogs.com`. No server runtime, SSR, API routes, or database.
- **Performance budget** enforced in CI (§11). Feature vs budget — budget wins.
- **No invented facts.** Every claim about a person, app, metric or client traces to §5. Gaps go in `QUESTIONS.md` with a visible TODO in the markup, never a plausible guess.
- **Mobile-first.** Most traffic will be Android on mobile data. Design mobile first; desktop is the elaboration. **Nothing important may depend on hover.**
- **`prefers-reduced-motion: reduce` yields a complete, still, finished site** — not a stripped one.

## 5. Source data

### 5.1 Studio

- **TheGeekDogs** — two-person product studio. Sahib Singh, Tanya Jain. No employees.
- Contact: `thegeekdogs@gmail.com`
- `[FILL]` — the real intake email if different, a phone/WhatsApp number if they want one, timezone, and whether they take client work full-time or alongside their own products. This changes the CTA wording.
- `[FILL]` — engagement model: fixed-scope projects, retainers, or both? Typical first-deliverable timeline? Rough starting price or "starts at" figure, if they're willing to state one.

### 5.2 Pocket Manager (live) — verified from the Play Store

- Store name: **Pocket Manager | Finance Manager** · package `com.thegeekdogs.pocketguard2`
- `https://play.google.com/store/apps/details?id=com.thegeekdogs.pocketguard2`
- Finance · Rated for 3+ · **4.6★ from 24 reviews** · **1K+ downloads** · last updated **29 Aug 2025**
- Features per the listing: simple interface, multiple categories, a calendar screen showing a chosen day's records with daily and monthly balance, a statistics screen with graphs and date ranges up to 90 days, transaction export
- Developer of record: Sahib Singh
- Reviews on the listing date back to early 2021, so the app has been live and maintained for roughly five years — **verify the exact first-release date before printing it.**

**Data Safety — resolved, but not yet live. Read the sequencing carefully.**

The listing as it stands today declares that the app may collect location and financial info, that data isn't encrypted in transit, and that data can't be deleted on request. The owners have fixed this; the corrected declaration ships with the **next build**.

That creates a window where the website could be live and the old declaration could still be the one on the store. **The rule is: the site's privacy claim must match what is on the Play Store listing at the moment the site publishes — not what will be true after the next release.**

So:

- Write the privacy claim as a **content flag, default off.** With the flag off, the Pocket Manager page describes the product without any privacy or encryption claim. With it on, the stronger claim appears. Flipping it is a one-line content edit, same pattern as the build stage in §6.2.
- **Fact Checker: get the exact wording of the corrected declaration before writing the claim, and don't accept "it's resolved" as the source.** "Resolved" can mean the data is no longer collected, or that it's now encrypted, or that deletion is now offered — and each licenses a different sentence. "Data is deleted on request" and "data never leaves your device" are very different promises, and only one of them may be true.
- Whoever flips the flag verifies the live listing first. Marketing copy contradicting a Play Store declaration is a listing-policy risk, and it's the exact failure this studio sells itself on catching.

### 5.3 The wedding planner app — sourced from the project's own ASO document

**Read this section before writing a single word about this product. Most of it is a list of things you may not say.**

**The name is not final.** The working title is **Milan** (मिलन, "union"). ADR-0037 named it; **ADR-0046 (2026-08-20) downgraded that to a placeholder** — the owner's own words: *"No its not official. It is just for placeholder."* A human must pick the final name before store submission. The bundle id `com.thegeekdogs.wedme` is internal and never user-facing.

**It has not shipped.** Store listing status is draft, not submitted, gated on: a keystore (human-owned), a real launcher icon, the final name decision, and — for iOS — Apple sign-in, which App Store Guideline 4.8 makes a hard blocker while Google sign-in is offered.

**Consequences for the website, and these are not negotiable:**

- Do **not** build a page branded "Milan" with the name as the headline. Do not put "Milan" in a URL slug, a page title, an OG image or structured data. The product page lives at `/work/wedding-planner/` and refers to the product descriptively.
- Do **not** write "launching in days," "out this week," or any date. Nothing is submitted, and store review adds unknown time on top.
- The honest frame is: **the second product, in build.** That's a credible thing for a studio site to show — it demonstrates an active pipeline. It is not a launch announcement.
- Build the content entry so a name, a store URL and a launch state can all be filled in later without touching a component.
- If there's an email capture, it uses a real form service (Formspree / Tally / Google Form). Never a form that goes nowhere.

**Positioning, verbatim from the ASO doc:** the wedding planner that works offline, never sells your data, and handles a wedding with more than one function.

**The differentiator — this is the thing worth showing:** one wedding, several functions (Sangeet, Mehendi, Haldi, Wedding), several different guest lists and headcounts, on one screen. Every competitor's screenshots are the same three shots — checklist, budget, countdown. Nobody else shows the multi-function view.

**Reachable in the shipped UI, therefore honest to describe:**
- Works fully offline; no account needed to plan a wedding
- Planning Board with a per-function guest list and headcount
- Per-function budget, a "who's paid what" split card, and a payment timeline by month
- Optional Google sign-in for cloud backup — framed as *"sign in only if you want it, nothing required"*
- More than one wedding on one device (create and switch)
- Hindi UI
- No ads, ever. Everything free in V1.

**Built in the codebase but NOT reachable by a tap — must not be described, shown, or implied:**
- The share-a-code collaboration feature. The logic and security rules are built and tested, but the sheet a user would tap does not open. **No "invite your partner," "share with your co-planner," or "plan together" copy anywhere.** This is the app's headline feature and it is the single easiest mistake to make on this page.
- Account deletion confirmation.
- Apple sign-in.

**Never claim, because the product will never have them:** a vendor marketplace or directory, a guest-facing app, in-app payments, a paid tier or upgrade, or "ad-free" as a premium feature (say "no ads" — there are none at all, ever).

**No gendered language.** Never "bride" or "groom" in any copy, marketing included.

**Tone, per the product's own rule:** plain and warm, never chirpy. The reward this product offers is relief, not achievement. Don't congratulate anyone for anything.

**Assets exist** at `assets/brand/store/` in the project repo: Play icon (512), App Store icon (1024), a feature graphic in brand vermilion with the wordmark in Plus Jakarta Sans, and five real-device screenshots. Ask for these rather than mocking anything up. Note the wordmark carries the placeholder name — check before using it on the site.

**`[FILL]`** — whether the owners want this product on the site at all before the name is settled. It's a legitimate call to leave it off and show only Pocket Manager.

### 5.4 People — read from their LinkedIn profiles

Both are cross-platform mobile engineers — native iOS, native Android, KMP and Flutter between them. That's the studio's real shape: two mobile specialists with overlapping stacks, not a designer-plus-developer pair. Don't invent a design discipline neither of them has; if the site needs visual design work, that's a gap to be honest about internally, not papered over in copy.

LinkedIn titles undersell both of them, so the corrections below come from the owners directly and override the profile text.

**Sahib Singh** · `https://www.linkedin.com/in/sahib-singh-876959143/` · he/him · Bengaluru

- **AVP, Mobile.** Not an Android engineer — he works across **native iOS, native Android, KMP and Flutter**, and has shipped production work in all four. Breadth across the whole mobile surface is the thing to lead with; do not narrow him to one platform anywhere on the site.
- **Keenai Global** — Jun 2025 to present. Wealth-tech for Indian HNIs, UHNIs and family offices. His current role there is **Builder**: shipping features end to end — backend, frontend and testing — using AI. **This is the single most important fact on the page.** He is not selling an AI-assisted delivery model as a theory; he does it daily in production, in regulated fintech, at his day job. Everything §3 claims, he already practises somewhere with real money and real auditors attached.
- **Android Engineer, Motive** — Nov 2023 to May 2025. Kotlin, Android framework. Fleet app.
- **smallcase** — 3 yrs 8 mos total: SDE 1 (Mar 2020), SDE 2 (Apr 2022, Dart/Flutter), Senior Software Engineer (Apr 2023). Fintech.
- **Android Developer intern, Cleartrip** — Feb 2019 to Feb 2020.
- BE, Chitkara University (2016–2020). Google Associate Android Developer certification (2019). Udacity Android Basics Nanodegree. Google/Udacity Challenge Scholarship, phases 1 and 2 — top 1,000 of 10,000.
- Founder & lecturer, **PyHour** — a student initiative at Chitkara running free Python classes for juniors.
- 51 skills listed, led by Kotlin and Jetpack Compose. 2,176 LinkedIn followers.
- **Writes regularly and it performs.** Android technical posts: channelFlow vs callbackFlow, Android 16 dropping orientation locks and the duplicate-fragment bug, ViewModel vs onSaveInstanceState vs SavedStateHandle. The Android 16 post drew 283 reactions and 13 reposts.
- Recommendations from a mobile lead at smallcase and from a Google Developer Expert.
- **Two threads worth building his page around.** First, **breadth**: four mobile stacks, and now the full stack end to end with AI. He is the person who has already done the thing the studio is selling. Second, **finance**, over and over — Cleartrip, smallcase, Motive, Keenai, Pocket Manager. He didn't wander into building a finance app; it's the domain he keeps choosing. Pick one as the spine and let the other be the texture.

**Tanya Jain** · `https://www.linkedin.com/in/tanyajain06/` · Delhi

- **Mobile engineer specialising in native Android and KMP**, and she works on the iOS side too. Her LinkedIn headline says "Software Engineer Android", which undersells her — cross-platform depth is the accurate description and the one to use.
- **Software Engineer, Android at Motive** — Jan 2024 to present.
- **Software Engineer, HSBC** — Aug 2021 to Dec 2023. REST APIs, Retrofit.
- **Android Developer, Naskay Technologies** — Nov 2020 to Jul 2021. Retrofit, MVVM.
- BTech Computer Science, APJ Abdul Kalam Technological University (2017–2021).
- Udacity Android Developer Nanodegree. HackerRank Java problem solving. TCS CodeVita Season 9 pre-qualifier, AIR 2023.
- 17 skills listed, led by Coroutines and **KMM**.
- **Sahib's own recommendation of her (3 Jul 2026) is the best single source on what she does**, and it names two things precisely: she is *"always looking for ways to improve developer productivity, whether by refining workflows or introducing better development practices,"* and she was the team's *"go-to person for KMP-related discussions."*
- **The thread worth building her page around:** she's the one who improves how the work gets made. Developer productivity, workflow, practices, and cross-platform architecture — KMP as the shared core, native Android and iOS at the edges. On a studio selling a disciplined AI pipeline, that is not a supporting role: the review gates in §7 are exactly her subject matter.

**Both worked at Motive**, overlapping. Tanya is still there; Sahib was there Nov 2023 – May 2025. That's how they know each other, and it's a better origin story than anything invented.

**GitHub, both public:**

- Sahib: `https://github.com/hellosahib`
- Tanya: `https://github.com/Tanya-jain99`

Link both from the person pages and put them in each `Person` JSON-LD `sameAs`. **Fact Checker: look at both profiles before deciding how prominently to feature them.** A GitHub link is only an asset if what's behind it supports the claim — a profile with pinned, active, readable repos earns a prominent link, while a sparse or stale one linked from a hero undercuts the page more than omitting it would. Report what's actually there and let the owners decide placement. Never fabricate contribution graphs, streaks or repo counts.

**Still `[FILL]` for both:**

```
Socials beyond GitHub: X, personal blog, email
Which of the four human gates in §7 each of them owns
Three adjectives each wants a stranger to use after seeing their page
Anything they want left OFF — current employers, specific companies, the AVP title
```

### 5.5 Headshots

**Read this before generating anything.** This site's entire pitch is that AI does the volume work and humans check it so the client doesn't get slop. Fully AI-generated faces of two real people sit awkwardly against that — AI headshots have a recognisable look (glassy skin, too-perfect symmetry, that specific studio-lighting sheen), a fair number of prospects now spot them, and being caught faking the founders' faces on a page about not faking things is a bad trade for saving a photo shoot.

**Recommended order:**

1. **A real photo, given a consistent treatment.** Two phone photos in soft window light, same crop, same background, same grade in post. This is an hour of work and it beats any generated image for this specific use.
2. **An AI headshot tool trained on their own selfies** (Aragon, HeadshotPro, Photo AI and similar). Still their actual face — the model learns their likeness from 10–20 real photos. This is the honest middle path and what to use if a shoot isn't happening.
3. **Fully synthetic faces:** don't. Not on this site.
4. **A drawn or abstracted portrait** — an illustrated or halftone treatment derived from a real photo — is a legitimate fourth option and sidesteps the uncanny-valley problem entirely. It may suit the studio floor's illustrated register better than photographs anyway. Worth proposing.

**Prompts for option 2**, tuned so each person's portrait matches their page's art direction (§9). Feed these alongside their own training photos.

> **Sahib.** Professional headshot of the subject, chest-up, three-quarter turn with eyes to camera. Soft directional daylight from the left, gentle falloff, no hard specular highlights on skin. Neutral mid-tone background with subtle depth, slightly darker than the subject. Relaxed, direct expression — considered rather than smiling. Dark plain shirt, no pattern, no logo. Shallow depth of field, roughly 85mm equivalent, natural skin texture with visible pores retained. Documentary editorial style, colour-graded cool-neutral. No retouching of skin texture, no beauty smoothing, no teeth whitening, no background blur halo.

> **Tanya.** Professional headshot of the subject, chest-up, square to camera, eyes to camera. Soft even daylight, large source, minimal shadow. Clean light background, a shade lighter than the subject. Calm, level expression, faint natural smile. Dark plain top, no pattern, no logo. Roughly 85mm equivalent, natural skin texture retained. Documentary editorial style, colour-graded cool-neutral. No retouching of skin texture, no beauty smoothing, no background blur halo.

The two prompts differ deliberately — Sahib's three-quarter turn and directional light against Tanya's square, evenly lit frame — so the portraits carry the same breadth-versus-structure distinction the pages do, while still reading as one set. Match the crop, aspect ratio and grade exactly across both; the difference should be legible only when they're side by side.

**Whatever route is chosen, both people approve their own image before it publishes.** And if AI was used, the studio should be willing to say so if asked — on this site of all sites, the answer to "is that a real photo" needs to be one you'd give happily.

**Current employers are named. Decided by the owners — treat it as settled.**

- Sahib: **Keenai Global**, where his role is Builder — features end to end, backend through testing, with AI, in wealth-tech.
- Tanya: **Motive**.

Name them plainly on the person pages and in each floor card. Don't hedge with "a fintech company" or "a US logistics company" — vagueness reads as something to hide, and the specificity is the credibility. Both companies are real, checkable, and the calibre of them is part of the argument.

Do not, however, imply either company endorses, sponsors or is a client of TheGeekDogs. Employer names appear as biography, never as logos in a client wall or a "trusted by" strip. That distinction matters legally and it matters to how the page reads.

**Outside work is permitted for both — confirmed by the owners. Closed; don't re-raise it.** Neither employment arrangement restricts client work, so the site can solicit it plainly and name both employers without hedging.

**One related item stays open, and it's commercial rather than legal:** what capacity to promise. Two people with full-time roles have a real ceiling on concurrent projects, and the CTA copy in §7 depends on knowing it — "we take one project at a time" is a strong, credible line, while an unstated capacity that gets discovered mid-engagement is how a first client becomes a last one. That answer lives in the §5.1 `[FILL]` on engagement model and timeline.

### 5.6 Design references

Study these first. Extract the *mechanism* that makes each feel expensive, not the surface look. In your plan, note what you're taking and what you're leaving from each.

- `https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations`
- `https://www.wallofportfolios.in/portfolios/diodona-maenggartama/`
- `https://www.wallofportfolios.in/portfolios/geonwoo-john-yang/`
- `https://www.abhaysingh.in/`
- `https://amix-design.com/tl/web-g-threejs/`

## 6. The hero: The Studio Floor

The centrepiece and the site's one bold moment. An **isometric studio floor** the visitor can look around.

### What's on the floor

- **Two human desks**, occupied: Sahib and Tanya. Rendered with more detail and warmth than everything else — they are the point.
- **Five to six agent desks**, each with a named agent working. Visually consistent with each other and deliberately more schematic than the humans.
- **One empty chair** with a nameplate reading **Ship approval**. Nobody sits there because it isn't a role an agent gets. This is the whole argument compressed into one prop — build the scene so the eye finds it.

### Interaction

- Hover (desktop) or tap (touch) a desk → a card with that worker's name, what they do, and — for agents — **which human gate checks their output**. The flex and the reassurance arrive in the same card. That pairing is the design's central idea; don't split it.
- Desks have a subtle idle state (a monitor glow, a slow blink) that reads as "working." One idle loop, low amplitude, no jitter.
- The empty chair gets its own treatment on interaction — the only card with no worker in it.

### Non-negotiable behaviours

- **Touch has no hover.** On mobile the floor either becomes tappable with the card in a sheet below, or degrades to a vertical roster. Decide deliberately and make the mobile version feel designed, not reduced.
- **Build the roster as semantic HTML first** — a real list of people and agents with headings and text — and layer the isometric scene on top as progressive enhancement. Every desk is a focusable `<button>` with a proper accessible name. The whole floor must be navigable by keyboard and readable by a screen reader, in order.
- **Reduced motion** kills every idle loop. The still scene must look finished.
- The floor must not delay LCP. The headline paints first.

### Technique

Build it in **inline, hand-tuned SVG** with CSS and a small amount of JS. Not Three.js.

This beats WebGL on every axis that matters here: it's a fraction of the weight, the text stays crisp and selectable, the desks are real DOM nodes so accessibility and keyboard focus come free, and it can't stutter on a mid-range phone. The amix-design reference is the ambition ceiling for atmosphere, not a stack recommendation.

Budget: the scene ships at **≤ 80 KB gzipped** including the SVG. If it can't, simplify the scene, not the accessibility.

## 6.1 The work cards

The work history renders as **small frosted-white standing cards** — the acrylic shelf-talkers and table tents you see propped on a restaurant table or beside a product in a shop, naming the thing and its price. Each role gets one card.

### Why the metaphor works here

A shelf-talker has a fixed, learned hierarchy: the thing, the number, then the small print. Map the content onto it exactly, and the card does information work instead of decoration:

```
┌─────────────────────────────┐
│                             │
│  MOTIVE                     │  ← the thing: company, largest type
│  Fleet management, US       │  ← what they do, one line
│                             │
│  2023 – 2025                │  ← the number: reads at a glance
│                             │
│  ─────────────────────────  │
│  Android Engineer           │  ← the small print
│  Motive Fleet App · Kotlin  │
│                             │
└─────────────────────────────┘
        ▁▁▁▁▁▁▁▁▁▁▁▁▁            ← the stand, and its contact shadow
```

The dates take the price position because a visitor scanning a work history is scanning for duration. Don't put the job title there; the title is small print on a shelf-talker and it should be small print here.

### Making it read as an object, not a div with opacity

Three details carry the whole illusion, and all three are cheap:

1. **A base.** The card meets a surface. Give it a stand or a lip, and a tight contact shadow directly beneath it — much darker and tighter than the soft ambient shadow a floating card would get.
2. **An edge.** Real acrylic catches light on its cut edge. A one-pixel lighter border on the top and left, slightly darker bottom and right, does more than any amount of blur.
3. **A slight, varied tilt.** Cards on a counter are never perfectly aligned. A degree or two of rotation, different per card, kills the CSS-grid look instantly. Keep it under 3° or it reads as a gimmick.

### Constraints, and one of them is load-bearing

- **`backdrop-filter` is the expensive part.** A dozen live-blurring cards on a scrolling mobile page is one of the reliable ways to blow the INP budget in §11. Options in order of preference: blur a single shared background layer once rather than per card; use a static semi-transparent white with a subtle noise texture and skip live blur entirely; or apply `backdrop-filter` only to the card under focus or hover. Measure on real hardware before committing — do not assume it's fine because it's fine on a laptop.
- **Never animate the blur radius.** It re-rasterizes every frame.
- **Contrast is a real risk.** Translucent white over a varied background will fail WCAG AA somewhere. Either constrain what sits behind the cards to a controlled band, or raise the card's own opacity until the text passes at AA against the worst case. Check it; don't eyeball it.
- **Semantics first.** The cards are a `<ul>` of roles, or a description list, marked up so a screen reader reads company, dates, role and products in that order. The card is styling over that list, not a replacement for it.
- **Reduced motion** removes the tilt animation and any float or parallax. The static tilt can stay — it's a layout property, not motion.
- **Print stylesheet:** these flatten to a clean, plain CV. Somebody will print or PDF a portfolio page.

### Where they go

Primarily the two person pages, as the work-history section. They can also appear on the studio home as a compressed strip — but only if the strip earns its place; §9.4 says spend boldness once, and the studio floor already spent it.

## 6.2 The build-stage indicator

This solves §5.3. The second product can't claim a launch date, but "we're building something and won't say what stage it's at" is worse than saying nothing. A stage track fixes both: it's specific, it's honest, and a prospect reading it learns something useful about how this studio works — namely that there are stages at all, and that submission isn't one of the early ones.

Five stages, in order. Both products carry one.

```
  ●───────●───────●───────○───────○
Specced  Building  Final   Submitted  Live
                   touches for review
```

| Stage | Means |
|---|---|
| **Specced** | Written down. Scope, constraints and what it deliberately won't do. |
| **Building** | Features landing, device-verified as they go. |
| **Final touches** | Feature-complete. Working through the last blockers before it can be submitted. |
| **Submitted for review** | With the store. Out of our hands. |
| **Live** | Installable. |

**Current states, from source:**

- **Pocket Manager → Live.** In the Play Store, 4.6★, still updated.
- **The wedding planner → Final touches.** Per the ASO doc: features are shipped and device-verified, but the final name isn't chosen, there's no keystore, the launcher icon isn't done, Apple sign-in is open, and the share-code sheet doesn't mount. **Not "Submitted for review" — it has explicitly not been submitted.** Do not advance this stage on the website until the owners confirm the submission actually happened.

Rules:

- The stage lives in the product's content entry as a single field. Advancing it is a one-line edit, no component changes. That's the whole point — it will change, possibly several times, and nobody should have to open a component to do it.
- **No dates, no estimates, no "expected in Q4."** The stage says where it is, not when it'll move. An unmet public date is worse than no date, and this product has already been renamed once.
- Completed stages, current stage and future stages need three visually distinct states, and the distinction must survive greyscale — never carry it on colour alone.
- Semantically it's an ordered list with the current step marked via `aria-current="step"`. Not a row of divs.
- On the studio home, the two products can share one compressed view of this so a visitor sees the pipeline at a glance: one shipped, one nearly there. That's the strongest thing a two-person studio can show — not volume, but that things actually finish.

## 7. Copy deck

Use this as the drafted copy. Tighten it, don't inflate it. Sentence case throughout. No em-dash-fragment labels, no all-caps eyebrows, no "→" glued to link text.

### Hero — three variants, pick one and note why

**A (recommended)**
> **AI writes a lot of our code. It doesn't get the last word.**
>
> TheGeekDogs is a two-person studio running an agent fleet on every build — with human architecture review, real-device QA, and a security pass before anything reaches you. Prototype speed, production discipline.
>
> `Start a project` · `Look around the floor`

**B**
> **Everyone ships fast now. We ship fast and put our name on it.**
>
> Two people, a floor full of agents, and four human checks between the code and your users.

**C (scene-led, for a quieter opening)**
> **Come in. Have a look around.**
>
> Two of the desks have people at them. The rest are agents. One chair stays empty on purpose.

### The floor cards

**Humans** — drafted from §5.4. Confirm both lines with the people themselves before publishing.

> **Sahib Singh** — Mobile across all four stacks: native iOS, native Android, KMP, Flutter. Builder at Keenai Global, shipping features end to end — backend, frontend, tests — with AI, in production wealth-tech. Owns architecture and the release cut here.
>
> **Tanya Jain** — Native Android and KMP, and the iOS side too. Android engineer at Motive. Owns how the work gets made: the practices, the workflow, the shared-core decisions. The review gates below are hers.

Give both lines equal weight. Neither is the assistant.

**Agents** — one desk per role in the pipeline. Each card names the job and the human who checks it. These are the same roles that build client work, and they map directly onto the team in §14 — the floor is a picture of the actual process, not a mascot lineup.

| Desk | Job | Checked by |
|---|---|---|
| **Spec Writer** | Turns the brief into a written spec: scope, constraints, and what the thing deliberately won't do. | Architecture review |
| **Designer** | Layouts, states, and the empty and error screens everyone else forgets. | Design review |
| **Programmer** | Writes the code. Fast, and far more of it than a person would. | Human code review |
| **Test Engineer** | Writes the tests around the edges you'd have shipped without. | QA pass |
| **Security Auditor** | Runs the scans: dependencies, permissions, what the app collects and where it goes. | Security review |
| **Reviewer** | Reads every diff for what a tired human misses at 1am. | Human code review |
| **Release Watcher** | Watches crashes and performance in production, and files the ticket before your users do. | Release gate |

**One thing the copy must get right.** The Security Auditor desk and the human security review in the next section are not the same job, and a reader who spots the overlap will assume the page is padding. Say the difference plainly on the card: **the agent runs the scan, a person reads the result and decides.** Same for the Test Engineer and the QA pass. That distinction is the honest version and it's also the more persuasive one — automated coverage plus human judgement is a stronger claim than either alone.

Seven desks is a lot to render legibly on a phone. If the floor gets crowded, cut to five and put the full list in the section below — but keep Security Auditor and Reviewer in the visible five, because those are the two that carry the argument.

**The empty chair**

> **Ship approval**
>
> This chair stays empty. No agent decides that something is ready for your users. A person does, every release, every time.

### The work cards — content

Sourced from both LinkedIn profiles and the companies' own sites. **Confirmed** means the person's own profile names it. **Confirm** means the company makes it but the profile doesn't say they worked on it — ask before printing.

**Sahib — seven years, four companies, finance almost throughout**

| Company | What they do | Years | Role | Products · stack |
|---|---|---|---|---|
| Keenai Global | Wealth-tech, Singapore and Bengaluru. Built with Lighthouse Canton, for accredited investors and family offices. | 2025 – now | Builder (AVP, Mobile) | **Keenai Wealth** — multi-asset platform, 50+ global markets, custody at BNY Pershing · Flutter, Dart · *confirmed* — and end-to-end feature work, backend through testing, with AI. Keenai also runs **Keenai Pulse** for single-family offices — *confirm* before listing. |
| Motive | Fleet management, US. Formerly KeepTruckin. AI dashcams, ELD compliance, telematics. | 2023 – 2025 | Android Engineer | **Motive Fleet App** — the fleet-manager side: live GPS, hours-of-service, vehicle health, dashcam review · Kotlin · *confirmed, named in his own skills* |
| smallcase | Investing platform, India. Curated portfolios of stocks and ETFs. | 2020 – 2023 | SDE 1 → SDE 2 → Senior Engineer | Android first, then Dart and Flutter · *confirmed*. Which surface — the smallcase app, Tickertape, or gateway — is *confirm*. |
| Cleartrip | Travel booking, India. Flights, hotels, trains. | 2019 – 2020 | Android Developer, internship | **Cleartrip Android App** · *confirmed, named in his own skills* |
| TheGeekDogs | This studio. | 2020 – now | — | **Pocket Manager** · 4.6★, 1K+ installs, still shipping |

**Tanya — five years, three companies, banking to logistics**

| Company | What they do | Years | Role | Products · stack |
|---|---|---|---|---|
| Motive | Fleet management, US. | 2024 – now | Software Engineer, Android | Kotlin, Coroutines, KMP · Which app — Driver or Fleet — is *confirm*. |
| HSBC | Global bank. | 2021 – 2023 | Software Engineer | REST APIs, Retrofit · *confirmed*. Which product is *confirm*; don't guess at a bank. |
| Naskay Technologies | Mobile and product studio, Noida. ~20 people, client work. | 2020 – 2021 | Android Developer | Retrofit, MVVM · *confirmed*. Client projects are *confirm* — agency work is often under NDA, so ask rather than reading their case studies and assuming. |

Two things the cards should not do. Don't pad Tanya's row count to match Sahib's — a shorter, denser history is not a weaker one, and visible padding says otherwise. And don't add a logo to any card; §5.4 rules that employer names are biography, not endorsement, and a wall of company logos is exactly the "trusted by" read that rule exists to prevent.

### Section: what the humans actually do

Headline: **Four things we don't hand to an agent.**

> **Architecture review.** Before a line is written, a person decides the shape: what the data looks like, where the boundaries are, what this has to survive in two years. Agents are good at filling in a structure and bad at choosing one.
>
> **Code review.** Every change is read by a human before it merges. Not skimmed for style — read for whether it does what it claims.
>
> **QA on real devices.** Physical phones, not just an emulator. Slow networks, low battery, older Android versions, the states people actually hit.
>
> **Security and privacy review.** What the app collects, where it goes, what's stored, what's exposed. Checked by a person against what we told your users we'd do.

Closing line: **That's the difference between generated software and shipped software.**

### Section: proof

Headline: **We run this on our own app first.**

> Pocket Manager has been in the Play Store since 2020, maintained by the same pipeline and the same review gates. 4.6 stars across 24 reviews, 1,000+ downloads, still getting updates five years on. `[Open it in the Play Store]`
>
> A second app is in final touches behind it — the one that had a headline feature cut from its own store listing because the button wasn't wired up yet. That rule is the whole point.

That second paragraph is the strongest proof on the site and it costs nothing to make: the team's own ASO document forbids describing the share-a-code feature because the sheet doesn't open, even though the logic is built and tested. A studio that polices its own marketing that hard is making an argument no competitor's landing page can match. **Verify the owners are comfortable saying it publicly before using it** — and if the second product stays off the site entirely per §5.3, keep this line anyway and attribute it generically to the app in build.

Sahib's LinkedIn lists Pocket Manager as a project running Dec 2020 – Dec 2022, and store reviews go back to early 2021, so "since 2020" is safe. Confirm the exact first-release date from the Play Console before printing anything more precise.

### Section: what you get

Headline: **You'll be holding something before you're bored of the kickoff.**

> The first thing we hand over is a working build you can open on your phone — not a deck, not a Figma walkthrough, not a status update. Everything after that is iteration on a thing that already runs.
>
> `[FILL — typical timeline to first build, engagement model, what a first conversation looks like]`

### Final CTA

Headline: **Tell us what you're building.**

> One email, a real reply from one of us, and a straight answer about whether we're the right fit. If we're not, we'll say so.
>
> `thegeekdogs@gmail.com`

### Words to avoid

craft, crafted, delightful, seamless, cutting-edge, leverage, robust, empower, solutions, journey, "we're passionate about", "at TheGeekDogs, we believe". If a sentence would survive on a competitor's site with the name swapped, rewrite it.

Use the word **slop** at most once, in the hero region if at all. Once it lands; twice it's a tic.

## 8. Information architecture

```
/                        Studio home — hero floor, positioning, gates, proof, CTA
/work/                   The two products, as evidence
/work/pocket-manager/    Case study — problem, build, review process, outcome, store link
/work/wedding-planner/   Second product, in build. Descriptive slug — NOT the placeholder name (§5.3)
/sahib/                  Sahib's portfolio  ← own visual world
/tanya/                  Tanya's portfolio  ← own visual world
/contact/                Intake — studio, Sahib, Tanya
/404.html
```

- Because conversion is job one, the home page must carry the full argument end to end. A visitor who never clicks past `/` should still know what we do, why it's different, what we've shipped, and how to reach us.
- A persistent, unobtrusive contact affordance follows the visitor down the home page. Not a chat bubble, not a modal on exit.
- Person pages carry a quiet way back to the studio, not a bolted-on studio header.
- Lowercase URLs, trailing-slash behaviour set explicitly in config so Pages and local dev agree.

## 9. Art direction

### 9.1 Process

Two passes before code. Deliver a compact token system per world: 4–6 named hex values, typeface roles, a layout concept with ASCII wireframes, alignment guidance, and 3–5 principles specific to *this* brief.

Ground the studio direction in what these two actually do: consumer mobile apps, two people, India, real store listings, real devices. Mobile viewports, release cadence and actual screens are the vernacular. Don't reach for generic "studio" abstraction.

### 9.2 Sahib

Both work across the same platforms, so the pages can't be split by stack. Split them by **shape of contribution** instead: Sahib's is breadth, Tanya's is depth.

Sahib's axis is **range**. Four mobile stacks — native iOS, native Android, KMP, Flutter — seven years, four companies, finance almost the whole way through, and now building end to end across backend, frontend and testing with AI. He also teaches publicly and often, and the posts land.

Three directions worth exploring: a **surface-area** page where the breadth itself is the composition and the visitor sees how much ground one person covers; a **time-structured** page where the career arc and the shipped work share one spine; or a **teaching-led** page where his writing is the entry point and the CV sits underneath. Propose at least two with reasoning.

Avoid the developer-portfolio costume: terminal green on black, fake editor chrome, typing-animation hero. That's costume, not craft — and it's the exact look every Android engineer's portfolio already has.

### 9.3 Tanya

Her axis is **the system, not the timeline**: developer productivity, workflow, practices, and cross-platform architecture — KMP shared core, native Android and iOS at the edges. She's the person who improves how the work gets made. A chronological CV layout would actively misrepresent that; it's the wrong shape for someone whose contribution is structural rather than sequential. A layered or shared-core structure is closer to the truth of what she does, and it's a more interesting layout problem than a timeline.

Direction should come from that: something spatial, relational or diagrammatic rather than a dated list. Propose two options with rationale, build the stronger one, and get sign-off after.

**Her sign-off happens after the build, not before — decided by the owners.** That's workable, but it changes how her page must be engineered, and the Engineer needs to know this before starting:

- Build `/tanya/` **last**, after everything else has settled. Late feedback on the final page costs less than late feedback on the second page.
- Her direction must be **swappable at the token and layout level**, not baked into markup. If she asks for the other direction, that should be a change to `DESIGN.md`, her theme scope and her page's layout module — never a rewrite of components shared with the rest of the site.
- Keep the rejected direction documented in `DESIGN.md` rather than discarded, so switching is a decision that's already been reasoned through.
- Present both directions to her when you present the built one. Someone reviewing a finished page with no alternative in front of them can only say yes or "something's off," and neither is useful feedback.

Two things to hold to. First, she is the shorter CV of the two and it would be easy to let her page feel like the lesser one — don't. Give it the same ambition and the harder layout problem. Second, do not default her to a decorative, pastel or soft-serif treatment while Sahib gets the technical one. They work on the same platforms in the same languages. That split would be a stereotype with nothing in the source data to support it, and it will read as one.

On the studio site specifically: her subject matter *is* the pitch. A studio selling "AI writes it, humans review it" is selling developer practice and workflow discipline — which is precisely what her recommendation says she does. Make that connection on the home page rather than leaving it for the visitor to find on a subpage.

### 9.4 Anti-generic rules

Avoid unless the brief specifically demands it:

- Cream background (~`#F4F1EA`) + high-contrast serif display + terracotta accent (~`#D97757`).
- Near-black background with one acid-green or vermilion accent.
- Broadsheet layout: hairline rules, zero radius, dense newsprint columns.
- The SaaS card kit: identical rounded cards, one radius for every hierarchy level, the same soft grey shadow under each, gradient washes as decoration.
- Template chrome: tracked-out all-caps eyebrows, meta strings joined with middle dots, `WORD — fragment` labels, tinted near-black standing in for black, monospace for every small label, `→` appended to link text.
- Accenting one word in a headline with a different colour or weight.

Structural devices must encode information. `01 / 02 / 03` markers only if the content is genuinely a sequence — the four gates in §7 are, the agent roster isn't.

**Spend boldness in one place: the studio floor.** Everything around it stays disciplined and quiet. Before shipping each page, remove one thing.

## 10. Motion

- **One orchestrated moment per page.** On the home page it's the floor. Not fade-and-slide-up on every section, not hover transform on every card — that's the generic default and it reads as machine-made.
- Motion answering a user action (open, expand, confirm, navigate) is always welcome; it shows what changed.
- Every animation interruptible, none blocking text paint.
- Timing tokens shared across the three worlds, used differently in each.
- `prefers-reduced-motion` cancels idle loops and scroll-driven effects, pauses autoplay.

No WebGL. The floor is SVG (§6). If a later page has a genuine case for WebGL, argue it against the budget first.

## 11. Stack and budget

### Stack

- **Astro 5**, `output: 'static'`, TypeScript strict. Islands only where interactivity is real.
- **Tailwind v4** over a hand-authored token layer. Per-world themes via CSS custom properties on a wrapper, not three builds.
- **Content collections** (Zod-typed) for people, agents, products, gates. All copy lives in content, not in components — the owners will edit it.
- Motion: **Motion One** or **GSAP**, justified in the plan, loaded only where used.
- Lenis smooth scroll only if it survives the budget and the reduced-motion path. Optional.
- Fonts self-hosted, variable, subset to glyphs used, `font-display: swap`, preload LCP text only. No Google Fonts CDN.
- Images via Astro's pipeline → AVIF with WebP fallback, explicit dimensions, lazy below the fold, placeholder holding layout.
- Different stack? Argue it against these constraints and wait for sign-off.

### Budget, per route, enforced by Lighthouse CI as failing assertions

| Metric | Limit |
|---|---|
| JS transferred, home | ≤ 100 KB gzipped |
| CSS transferred, home | ≤ 40 KB gzipped |
| Studio floor SVG + its JS | ≤ 80 KB gzipped |
| LCP (mobile, throttled 4G, mid-tier CPU) | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| Lighthouse mobile: Perf / A11y / Best Practices / SEO | ≥ 95 / 100 / 95 / 100 |
| Total page weight, home | ≤ 1.2 MB |

A PR that breaks the budget doesn't merge.

## 12. Metadata, SEO, accessibility

- Per-page title, description, canonical, OG and Twitter cards. **Generate OG images at build time** so they can't drift from the copy. The home OG image should show the floor.
- JSON-LD: `Organization` for the studio, `SoftwareApplication` per app (Pocket Manager gets `aggregateRating` 4.6 / 24), `Person` for each of Sahib and Tanya with `sameAs` to their real profiles.
- `sitemap.xml`, `robots.txt`.
- WCAG 2.2 AA contrast on every surface — check the low-contrast premium palettes, don't assume them.
- Designed, visible keyboard focus. Never `outline: none` without a replacement.
- Full keyboard operability including the floor, logical tab order, skip link.
- Semantic landmarks, one `h1` per page, no skipped heading levels.
- Meaningful alt text; decorative images get `alt=""`.
- Test the home page and one person page with an actual screen reader.

## 13. Deployment

- GitHub Actions → `actions/deploy-pages`. No committed `dist/`.
- `public/CNAME` with `thegeekdogs.com`.
- DNS: apex `A`/`ALIAS` to Pages IPs, `www` `CNAME` to the Pages host, `www` → apex redirect, HTTPS enforced.
- `site: 'https://thegeekdogs.com'` in Astro config for absolute canonicals, sitemap and OG URLs.
- Apex domain means base path `/` — no repo-name base.
- `404.html` at root.
- Analytics: Cloudflare Web Analytics or Plausible. Not Google Analytics unless asked — it costs budget and adds a consent obligation. **Track CTA clicks and email-link clicks**; this is a conversion page and the owners need to know if it converts.

## 14. How the work is organised — specialist agents, reviewing each other

Build this with a team of specialist subagents, not one generalist. Two rules govern everything below:

1. **Nobody works outside their remit.** The engineer does not write copy. The designer does not write application code. When an agent hits something outside its remit, it raises a blocker — it never fills the gap itself. **The single most common failure mode in this setup is an engineer who needs a headline, doesn't have one, and types something plausible.** That is how lorem ipsum, invented statistics and "Lorem Studio" ship to production.
2. **Nobody works in a silo.** Specs go one way, but review comes back the other way, repeatedly, until the reviewer signs off. A handoff is not a completion.

There's a reason to get this right beyond craft. This site's entire pitch (§3) is *agents build it, humans review it, nothing ships unchecked*. A site making that claim that was itself built by agents with no review gates would be lying in its own source code.

### The roster

| Agent | Owns | Must never |
|---|---|---|
| **Orchestrator** | Routing, sequencing, arbitration between agents, and `QUESTIONS.md`. Decides when a disagreement escalates to the human. | Do any of the specialist work itself. |
| **Design Lead** | Art direction, the three token systems, layout, hierarchy, responsive behaviour, the studio floor composition, the work-card treatment. Writes `DESIGN.md`. Reviews rendered output. | Write application code. Approve its own work. |
| **Copywriter** | Every user-facing word: headlines, floor cards, gate descriptions, alt text, button labels, error and empty states, meta descriptions. Writes `COPY.md`. | Write code or CSS. Invent a fact — see Fact Checker. |
| **Engineer** | Astro/Tailwind implementation, content schemas, routing, build, deploy pipeline, CI. | Write or alter copy. Invent a colour, spacing value or type size not in the tokens. Fill a content gap with a placeholder. |
| **Interaction Engineer** | The studio floor SVG, the work cards, motion, keyboard paths, reduced-motion variants. | Ship an effect that breaks the §11 budget. Add motion the Design Lead didn't spec. |
| **Fact Checker** | Verifying every factual claim against source: the ASO doc, both LinkedIn profiles, the Play Store listing, company sites. Owns the *confirmed* / *confirm* distinction in §7. | Approve a claim on plausibility. Soften a claim to make it pass — an unverifiable claim gets cut, not hedged. |
| **QA** | Functional and content verification across the whole site. Holds the no-slop gate below. | Sign off on "it looks fine." Every pass is evidenced. |
| **Perf & A11y Auditor** | The §11 budget, WCAG 2.2 AA, keyboard, screen reader, real-device testing. **Has veto power** — a budget or contrast failure blocks merge regardless of how good the thing looks. | Waive a budget line to save a feature. That decision goes to the human. |

Merge Interaction Engineer into Engineer, or Fact Checker into QA, if the runtime can't support seven. Never merge Design Lead with Engineer, or QA with either — those are the pairs whose independence the whole scheme depends on.

### How they collaborate rather than hand off

**Kickoff per surface, all three principals together.** Before anything is designed or written, Design Lead, Copywriter and Engineer agree the content inventory for that surface: what it must say, roughly how much of it there is, and what's technically constrained. This one meeting prevents the classic sequential failure — the designer draws boxes, then the copywriter has to amputate real sentences to fit them.

**Copy and design develop in parallel, not in series.** Copy length drives layout; layout constrains copy. Neither is downstream of the other. They exchange drafts and converge.

**The Engineer attends the design review, before build.** Feasibility and budget objections belong at spec time, not after two days of implementation. If the Design Lead specs twelve live-blurring cards (§6.1), the Engineer says so then.

### The review loop

```
Design Lead + Copywriter → spec  →  Engineer builds
                                         ↓
                        Design Lead reviews the RENDERED page
                        (style, layout, hierarchy, responsiveness)
                                         ↓
                    APPROVED ─────────────┴───────── CHANGES REQUESTED
                        ↓                                   ↓
                Fact Checker → QA → Perf & A11y      back to Engineer
                        ↓                            with numbered items
                  human gate → merge
```

Rules that make this terminate and stay honest:

- **Reviews are of rendered output, not code.** The Design Lead reviews screenshots at every named breakpoint — 360, 390, 768, 1024, 1440 — plus keyboard-focus and reduced-motion states. Reviewing the CSS instead of the page is how a designer misses that the layout collapses at 360.
- **Every verdict is one of three:** `APPROVED`, `CHANGES REQUESTED` (numbered, specific, each item independently actionable and each citing evidence — a screenshot, a Lighthouse number, a file and line), or `BLOCKED` (needs a human; goes straight to `QUESTIONS.md`).
- **"Looks good" is not a verdict.** A review that approves without having looked at the named breakpoint states is a failed review, and the Orchestrator sends it back.
- **Three rounds maximum per surface.** If a surface hasn't converged after three, it escalates to the human with both positions written out. Unbounded agent-to-agent review loops burn budget and converge on mush.
- **Disagreements resolve by remit, not by seniority.** The Design Lead wins on visual judgement. The Engineer wins on feasibility. The Perf & A11y Auditor wins outright on budget and accessibility — those aren't opinions. Anything genuinely contested goes to the human rather than being split down the middle.
- **All handoffs are written artifacts in the repo**, not chat. `DESIGN.md`, `COPY.md`, `QUESTIONS.md`, and `REVIEWS.md` — an append-only log of every verdict, who gave it, and what evidence they cited. That log is how the human audits the process later, and it's the same discipline the site is selling.

### QA's no-slop gate

QA runs this on every surface before it can merge. **Automate what can be automated** — a checklist an agent self-reports against is a checklist that passes. Write the grep and the link-check as scripts in CI.

Automated, blocking:

- Zero matches for `lorem`, `ipsum`, `TODO`, `FIXME`, `XXX`, `placeholder`, `[FILL]`, `Coming soon`, `example.com`, `#` as an href, `John Doe` / `Jane Doe`, and any leftover reference to the placeholder product name (§5.3) in slugs, titles or metadata.
- No image referenced but missing. No image without `alt` (empty `alt=""` is a valid, deliberate answer; a missing attribute is not).
- No broken internal or external links. No route in §8 that 404s. No orphan page unreachable from navigation.
- No console errors or warnings on any route.
- Build succeeds with zero TypeScript errors and zero Astro warnings.

Manual, evidenced with a screenshot or a recording:

- **Every interactive element does something.** Every button, link and control on the studio floor, the work cards and the contact section. A control wired to a handler that opens nothing is not shipped — it's the exact failure the ASO doc catches in your own app, and it must not appear on the site selling that discipline.
- Every form actually submits and the submission is received at the real endpoint. Test it end to end; don't inspect the markup and assume.
- Every content field is real. No lifted-from-a-template bio, no invented metric, no rounded-up download count.
- The mobile path for the studio floor works on touch, where hover doesn't exist (§6).
- Reduced-motion renders a complete, finished page — not a broken one with the animation removed.
- Real device: at least one mid-range Android on a throttled connection. Not an emulator, not a resized desktop window.

Anything QA can't verify because the information doesn't exist yet is `BLOCKED`, not "assumed fine."

### Human gates

Four points where a person, not an agent, signs off. These mirror §7's four gates deliberately — the site should be built the way it says work gets built.

1. **Direction**, after Pass 1 planning and before any code: the token systems, the studio floor composition, the chosen hero variant.
2. **Facts**, before anything publishes: every claim the Fact Checker marked *confirm*, plus the §5.4 employment and capacity questions and the §5.3 decision on whether the second product appears at all.
3. **Copy**, before publish: it's a public sales page carrying two people's names and their employers'.
4. **Release.** A human cuts it. Every time. That's the empty chair in §6, and it would be absurd to build the site any other way.

### Build order

Same sequence as before, now with the full loop applied to each item rather than to the project as a whole:

1. Repo, content schemas, tokens, deploy pipeline, Lighthouse CI, and the QA scripts. Ship a plain working `thegeekdogs.com` before any design lands.
2. Home page structure and copy, floor as a static semantic roster. **Verify it converts as plain HTML before it becomes a scene.**
3. The studio floor: SVG, interaction, mobile, keyboard, reduced motion.
4. `/work/pocket-manager/`.
5. `/work/wedding-planner/`, in-build state, name-agnostic.
6. `/sahib/`, then `/tanya/`, with the work cards.
7. Contact, 404, OG generation, structured data.
8. Full-site audit: real hardware, screen reader, keyboard-only, reduced motion, 4G throttle.

Each agent keeps a scratch file of what it tried and rejected, so later rounds don't relitigate settled ground.

## 15. Deliverables

1. Repo building green, deployed, budget enforced in CI.
2. `README.md` — how to run, how to add a project/person/agent, how to set the second product's final name and store URL when they exist, how theme scopes work.
3. `QUESTIONS.md` — every gap and decision needing a human, listed for inline answers.
4. `DESIGN.md` — the three token systems and their rationale.
5. `COPY.md` — final copy, so it can be edited without touching components.
6. `REVIEWS.md` — the append-only review log: every verdict, its author, its evidence, and how each disagreement resolved.
7. Agent charters — the remit and the never-do list for each agent, so the same team can be reconstituted for the next round of changes.
8. Lighthouse report per route in the PR description.

## 16. Before you start

Ask everything in one batch:

- The `[FILL]` blocks in §5.1 (engagement model, timeline, pricing, and the capacity ceiling), §5.3 (whether the second product appears at all), §5.4 (remaining socials, gate ownership).
- Pocket Manager's actual first-release date.
- The exact wording of the corrected Data Safety declaration (§5.2), and when that build goes live.
- The `confirm`-marked rows in the work cards (§7): the smallcase surface, which Motive app Tanya works on, the HSBC product, and whether her Naskay client work can be named at all.
- Which of the four human gates each person owns (§7).

**Already decided — do not re-open these.** Employer names are used. Outside work is permitted. Tanya's direction is signed off after her page is built. The Data Safety fix is coming in the next app build.

Then produce Pass 1 and stop for review.
