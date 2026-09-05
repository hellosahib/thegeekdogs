# COPY.md, thegeekdogs.com

Pass 1. Every user-facing word on the site. Structured by route in §8 order, and within each route
by reading order, so it maps to content collections without interpretation.

**How to read this document**

- Field labels are consistent: `Headline`, `Subhead`, `Body`, `Primary button`, `Secondary button`,
  `Link label`, `Label`, `Meta title`, `Meta description`, `OG title`, `OG description`, `OG image
  text`, `Alt`.
- `[CONFIRM: …]` marks a fact the brief says must be verified before publishing. Fact Checker owns
  these. They are numbered in Appendix B.
- `[FILL: …]` marks content only the owners can supply. They are numbered in Appendix B.
- Both markers are the publish gate. QA's automated scan blocks on `[FILL]`, which is correct: no
  marker may survive to production, resolved or cut.
- Nothing here is a suggestion to a designer about layout. Copy length is stated where it matters.

**Rules this copy was written against**

- Sentence case everywhere. No all-caps eyebrows, no dash-fragment labels, no arrows on links, no
  middle-dot meta strings.
- At most one em-dash per section. In practice there are none; the budget is unspent.
- The one word §7 rations to a single use across the whole site is used zero times. Reasoning in
  `docs/scratch/copywriter.md`.
- The "not X, not Y, not Z" triple appears exactly once on the home page, in "What you get". Do not
  add a second anywhere on `/`.
- The second product is never named. Its working title, which ADR-0046 downgraded to an internal label only,
  appears in no headline, slug, title, alt text, OG field or structured data, and it is not written
  in this document either.

---

## 1. Global

### Site name

TheGeekDogs

Written as one word, capital T, capital G, capital D. Never "The Geek Dogs", never "TGD" in
user-facing copy.

### Nav labels

Four items and the wordmark. Nothing else earns a slot.

| Slot | Label | Destination |
|---|---|---|
| Wordmark | TheGeekDogs | `/` |
| 1 | Work | `/work/` |
| 2 | Sahib | `/sahib/` |
| 3 | Tanya | `/tanya/` |
| 4 | Contact | `/contact/` |

Wordmark accessible name when it is the link home: `TheGeekDogs, home`.

### Persistent contact affordance

Follows the visitor down the home page. Not a modal, not a chat bubble.

- Label: `Start a project`
- Accessible name: `Start a project. Opens an email to thegeekdogs@gmail.com`
- Behaviour note for Engineer: this is a `mailto:` link, not a button that opens a form. One
  affordance, one destination.

### Skip link

`Skip to main content`

### Dark mode toggle

On every page, at every breakpoint (item 49). `prefers-color-scheme` sets the opening state; the
toggle overrides it and the choice persists per visitor. The button's accessible name states the
action it performs, never the state the page is already in, so a screen reader user is never told
"dark mode" and left to guess whether that is a description or an instruction.

- **Visible label, group:** `Theme`
- **Visible label on the control:** `Dark` when the page is light, `Light` when the page is dark.
  One word, the destination, matching the accessible name's verb.
- **Accessible name while the page is light:** `Switch to dark mode`
- **Accessible name while the page is dark:** `Switch to light mode`
- **`aria-live` announcement after the switch, polite:** `Dark mode on.` / `Light mode on.`
  Four words, past the point of action, so the announcement confirms rather than instructs.

### Back to the studio

The quiet return link on `/sahib/` and `/tanya/`. Not a studio header.

- Link label: `Back to the studio`
- Accessible name: `Back to the studio home page`

### Footer

- Studio line: `TheGeekDogs. A two-person mobile studio.`
- Location line: `Bengaluru and New Delhi. We work in IST.`
- Email label: `thegeekdogs@gmail.com`
- Link group heading: `Elsewhere`
- Links: `Sahib on GitHub`, `Tanya on GitHub`, `Sahib on LinkedIn`, `Tanya on LinkedIn`
- Nav repeat: `Work`, `Sahib`, `Tanya`, `Contact`
- Rights line: `© 2026 TheGeekDogs`
- Employer note, required by §5.4 so employer names cannot be read as endorsement. Print it small
  but print it: `Company names on this site are the two founders' employment history. None of them are clients of TheGeekDogs and none endorse it.`

Four outbound links and no more. Items 17 and 18 closed the question: no personal data beyond
GitHub and LinkedIn, no X, no blog, no second address. Resume links may be added later, and when
they are they are a footer link like the others, not a new section.

---

## 2. `/` Home

The home page carries the full argument. A visitor who never clicks past `/` should know what we
do, why it is different, what we have shipped, and how to reach us.

### 2.1 Hero

**Chosen variant: A.**

Why, in two sentences. A is the only variant that names the mechanism rather than the posture: it
tells a cold visitor what is bought (agent-speed builds) and what is guaranteed (a person is
accountable), which is the one thing a conversion-first page above the fold cannot omit. B states
the same claim as an attitude a competitor could copy verbatim, and C, which is the best-written
of the three, opens with an invitation to a scene the reader has not yet been given a reason to
care about.

B and C are preserved in Appendix A.

- **Headline:** `AI writes a lot of our code. It doesn't get the last word.`
- **Body:** `A two-person mobile studio. Agents do the volume work. Then a person reviews the architecture, tests on real phones, and signs off on security.`
- **Primary button:** `Start a project`
- **Secondary button:** `Look around the floor`

Body length, round 3. DESIGN.md §B.7 caps the subhead at three lines at 360, about 26 words at that
measure, because the 41-word version pushed the primary button below the fold. The body above is 24
words and still names the mechanism: agents do the volume, a person reviews architecture, tests on
real phones, signs off on security. The 41-word version is kept in Appendix A as "hero body, long
form" in case there is room for it at 1440.

Notes for Engineer. The headline is the LCP text and must paint before the floor (§6). The
secondary button moves focus to the floor region; its accessible name is `Look around the studio
floor`.

### 2.2 The floor intro

Sits between the hero and the scene. Two short lines, then the instruction.

- **Lead-in:** `Two desks have people at them. The rest are agents.`
- **Instruction line:** `Open any desk to see the job and the human who checks it.`
- **Body, long form:** `Two desks have people at them. The rest are agents. One chair stays empty on purpose.`

The lead-in is 10 words. DESIGN.md caps this slot at 12 words at 360 (§C.7) and at 1440 (§B.9), so
the lead-in is what prints and the long form is held for a slot that does not exist yet. Nothing is
lost by dropping the empty-chair sentence here: the chair's own card is the default content of the
card panel at every breakpoint (§C.6), so the argument is on screen without it.

Note for Design Lead and Engineer. The instruction says "open", not "tap" or "hover", because the
same sentence has to be true on touch, on a mouse and on a keyboard (§6). Do not print a desk
count in this line. Item 32 settled the floor at seven agent desks, and a number written into body
copy goes stale the day the roster changes, which a roster on a live site eventually does.

### 2.3 The two human cards

Equal weight. Neither is the assistant. Each card names what that person owns, from item 19.

**Sahib Singh**

- **Role line:** `Mobile across all four stacks: native iOS, native Android, KMP, Flutter.`
- **Body:** `Builder at Keenai Global, shipping features end to end, backend through testing, with AI, in production wealth-tech. He owns architecture review here, and shares code review with Tanya.`

**Tanya Jain**

- **Role line:** `Native Android and KMP, and the iOS side too.`
- **Body:** `Software Engineer 2 at Motive, where she owns releases. Here she owns the product spec, real-device QA, and the security, privacy and ASO review. She shares code review with Sahib.`

Item 19 assigned every gate but one, and it assigned them unevenly: two of the four are hers
outright, code review is shared, architecture is his, and the product spec, which is not one of the
four, is hers as well. The cards print that split rather than balancing it, because a card that
squares an uneven division is a card that stopped being true.

### 2.4 The agent cards

One card per role. Each names the job and the human gate that checks its output. The pairing of
the flex and the reassurance is the point; do not split them across two cards.

Order below is pipeline order. Item 32 settled the floor at seven agent desks, so all seven render
and the roster list carries the same seven in the same order.

The gate names in the right column are the same strings as the four gates in §2.6, plus the two
item 19 named outside them: the product spec, which is Tanya's, and ship approval, which is the
empty chair in §2.5. Item 42 accepted mapping design review onto architecture review and the
release gate onto ship approval, so no seventh label is invented for either.

| Desk | Job | Checked by |
|---|---|---|
| Spec Writer | `Turns the brief into a written spec: scope, constraints, and what the thing deliberately won't do.` | `Product spec review` |
| Designer | `Layouts, states, and the empty and error screens everyone else forgets.` | `Architecture review` |
| Programmer | `Writes the code. Fast, and far more of it than a person would.` | `Code review` |
| Test Engineer | `Writes the tests around the edges you'd have shipped without. The agent writes them and runs them. A person judges whether they test what matters.` | `QA on real devices` |
| Security Auditor | `Scans dependencies, permissions, and what the app collects and where it goes. The agent runs the scan. A person reads the result and decides what to do about it.` | `Security and privacy review` |
| Reviewer | `Reads every diff for what a tired human misses at 1am.` | `Code review` |
| Release Watcher | `Watches crashes and performance in production and files the ticket before your users do.` | `Ship approval` |

`[CONFIRM: who reviews design. Item 19 names an owner for every other gate on this floor and none for this one, so the Designer card currently borrows architecture review under item 42's mapping. If a person owns design review by name, this cell and §10.2's spoken button name both change.]`

`[CONFIRM: who cuts the release, and therefore whose name sits behind ship approval on the Release Watcher card and the empty chair. QUESTIONS.md item 56 is open.]`

The two long cards are long on purpose. §7 is explicit that a reader who notices Security Auditor
and the human security review overlapping will assume the page is padding, and the same for Test
Engineer and the QA pass. The scan-versus-decision sentence is the answer and it must not be cut
for length. If the card is too small for it, the card gets bigger.

Field label above the gate name on each card: `Checked by`

### 2.5 The empty chair

- **Nameplate:** `Ship approval`
- **Body:** `This chair stays empty. No agent decides that something is ready for your users. A person does, every release.`

This card has no worker in it and should not pretend otherwise. There is no role line, no
"checked by" field.

### 2.6 The four gates

- **Headline:** `Four things we don't hand to an agent.`

These are genuinely a sequence, so §9.4 permits numbering them. Nothing else on the page gets
numbers.

1. **`Architecture review.`** `Sahib decides the shape before a line is written: what the data looks like, where the boundaries are, what this has to survive in two years. Agents are good at filling in a structure and bad at choosing one.`
2. **`Code review.`** `Every change is read by a person before it merges, and both of us are on this one. Not skimmed for style. Read for whether it does what it claims.`
3. **`QA on real devices.`** `Tanya runs the build on physical phones, not just an emulator. Slow networks, low battery, older Android versions, the states people actually hit.`
4. **`Security and privacy review.`** `Tanya reads what the app collects, where it goes, what's stored and what's exposed, against what we told your users we'd do.`

- **Closing line:** `That's the difference between generated software and shipped software.`

### 2.7 Proof

- **Headline:** `We run this on our own app first.`

**Paragraph 1, always shown.**

`Pocket Manager has been in the Play Store since 2020, maintained by the same pipeline and the same review gates. 4.3 stars from 24 reviews, 1,000+ downloads, and it still gets updates five years on.`

- **Link label:** `Open Pocket Manager in the Play Store`
- **Secondary link label:** `Read how it gets built`  → `/work/pocket-manager/`

The rating and the review count are the live listing's own figures, verified at the store and
confirmed by item 36. Item 13 gave the release year and nothing finer, so "since 2020" is the whole
of what this page knows about the first release and the whole of what it says.

**No privacy line, on this page or any other.** Item 14 closed it: the site makes no privacy,
encryption or deletion claim for Pocket Manager, now or later. There is no content flag to flip,
because there is no flag-on wording to write. Do not soften one back in either; a hedged claim
against a live Data Safety declaration is the same listing-policy risk as a hard one.

**Paragraph 2.**

`A second app sits behind it in final touches. There's no date on it. The list of what's left is short, and a person decides when it ends.`

**Variant if item 68 is yes:** `A second app sits behind it in final touches, built through the same pipeline and stopped at the same gates. There's no date on it. The list of what's left is short, and a person decides when it ends.`

The pipeline audit in `FACTS.md` §(d) read the Pocket Manager repository only. Until item 68 comes
back yes, the second app's pipeline is unaudited and the shipping paragraph does not claim it.

Item 12 was answered no: the site does not say publicly that a feature was cut from the second
app's own store listing. The paragraph above carries the "in build" frame without it, on the one
fact that survives: a person ends it. Do not reinstate the cut-feature sentence here or in §5.4 in
any wording.

### 2.8 The shared build-stage view

Both products on one compressed track, so a visitor sees the pipeline at a glance.

- **Headline:** `One shipped, one nearly there.`
- **Body:** `The track shows both products and where each one actually is: Pocket Manager shipped and still updated, the second one close enough that the list of what's left is short. Neither carries a date, and neither will. A date we miss in public is worse than no date at all.`

**The five stage labels, in order. These are the exact strings; do not reword them per product.**

| Stage label | Meaning line |
|---|---|
| `Specced` | `Written down. Scope, constraints, and what it deliberately won't do.` |
| `Building` | `Features landing, device-verified as they go.` |
| `Final touches` | `Feature-complete. Working through the last blockers before it can be submitted.` |
| `Submitted for review` | `With the store. Out of our hands.` |
| `Live` | `Installable.` |

**Current states**

- Pocket Manager: `Live`
- The wedding planner: `Final touches`

**Product labels in this compressed view**

DESIGN.md §E.3 caps the second label at 18 characters, because the row label sits in the left
gutter of a shared axis beside `Pocket Manager` (14 characters). `The wedding planner` is 19 and
does not fit.

- `Pocket Manager` (14 characters)
- `Wedding planner` (15 characters), descriptive only. No name, no store link, no launch state
  beyond the stage. The article is dropped so the two row labels are the same kind of phrase; the
  longer descriptive form stays in use on `/work/` (§3.3), where it is a product name and not a row
  label.

**Caption, beside the two-product track (DESIGN.md §B.9, ≤ 8 words)**

- **Caption:** `One shipped, one nearly there.`

Five words. This is the same string as the §2.8 headline above, reused rather than rewritten: at
1440 the compact track sits inside the proof band under §2.7's headline, so the §2.8 headline has
no separate slot there and becomes the caption. One string, used in whichever slot the breakpoint
gives it. Do not write a second, near-identical line for the other case.

**Accessible text for the track**: see §10.4.

### 2.9 What you get

- **Headline:** `You'll be holding something before you're bored of the kickoff.`
- **Body:** `The first thing we hand over is a working build you can open on your phone. Not a deck, not a Figma walkthrough, not a status update. Everything after that is iteration on a thing that already runs.`

This is the one place on `/` that uses the "not X, not Y, not Z" triple. Do not add a second.

- **Second paragraph:** `One project at a time. Fixed scope or a retainer, both work here. It starts with a short written brief rather than a call, and a first MVP is a few days from the go-ahead.`

Items 4, 5, 6 and 8, printed plainly. "One project at a time" is the capacity ceiling stated as the
studio states it, and it is the only place on the site that sentence appears: it is the strongest
line the engagement facts produce, and repeating it on `/contact/` would spend it twice. §8.2
carries the rest of the same answer without restating this one. No starting price is printed
anywhere, per item 7.

### 2.10 Final CTA

- **Headline:** `Tell us what you're building.`
- **Body:** `One email, a real reply from one of us, and a straight answer about whether we're the right fit. If we're not, we'll say so.`
- **Primary button:** `Email thegeekdogs@gmail.com`
- **Accessible name for the primary button:** `Email thegeekdogs@gmail.com to start a project`

### 2.11 Meta

- **Meta title:** `TheGeekDogs, a two-person mobile studio`
- **Meta description:** `Two-person mobile studio. Agents write most of the build; a person reviews the architecture, tests on real phones, and signs off before anything ships.`
- **OG title:** `AI writes a lot of our code. It doesn't get the last word.`
- **OG description:** `A two-person mobile studio with four human gates between the code and your users. Pocket Manager is live in the Play Store.`
- **OG image text** (the build-time image shows the floor, per §12): `TheGeekDogs` and, under it, `Two people. A floor of agents. One chair kept empty.`
- **Alt for the OG image, if it is ever rendered inline:** see §10.2.

---

## 3. `/work/` index

### 3.1 Intro

- **Headline:** `Two products, both ours.`
- **Short intro:** `The two apps this studio builds and maintains. One is in the Play Store, one is in final touches.`
- **Long body:** `The work below isn't a portfolio of things we made for other people. It's the two apps this studio builds and maintains. One is in the Play Store. One is in final touches.`

**Variant if item 68 is yes:**

- **Short intro:** `The two apps this studio builds and maintains, with the same review gates a client would get.`
- **Long body:** `The work below isn't a portfolio of things we made for other people. It's the two apps this studio builds and maintains with the same pipeline and the same review gates a client would get. One is in the Play Store. One is in final touches.`

The short intro is 18 words, against DESIGN.md §B.11's 20. It is the one that prints if only one
can. The long body is the Design Lead's to place or cut; the headline already carries the "both
ours" fact, so cutting the long body costs the page nothing it cannot survive.

Note: the studio has no published client work yet, so the intro says so rather than implying a
roster. If the owners have client work that can be named, that is a new `[FILL]` for a later pass;
nothing is invented here.

### 3.2 Card: Pocket Manager

- **Product name:** `Pocket Manager`
- **Stage:** `Live`
- **One-line description:** `A personal expense tracker: categories, a calendar of any day's records, statistics with graphs, and export.`
- **Link label:** `Read the case study`
- **Accessible name for the link:** `Read the Pocket Manager case study`
- **Secondary link label:** `Open in the Play Store`

### 3.3 Card: the wedding planner

- **Product name:** `A wedding planner`, descriptive. The name is not final and the site ships
  without one: item 9 chose the full name-agnostic page, so this card, its slug, its page title and
  its OG fields are descriptive by decision, not by omission. ADR-0046 reduced the working title to
  an internal label and nothing on this site uses it. If a name is picked later it replaces the
  descriptive string in five places and nothing else on the page moves.
- **Stage:** `Final touches`
- **One-line description:** `Works offline, and handles a wedding that's more than one event.`
- **Link label:** `See what's in build`
- **Accessible name for the link:** `See what's in build on the wedding planner`

### 3.4 Meta

- **Meta title:** `Work | TheGeekDogs`
- **Meta description:** `Pocket Manager, live in the Play Store since 2020. A wedding planner in final touches, with no date on it and a person deciding when it ends.`
- **OG title:** `Two products, both ours.`
- **OG description:** `One shipped and still updated. One in final touches. No date on the second, and a person decides when it ends.`

**Variant if item 68 is yes:**

- **Meta description:** `Pocket Manager, live in the Play Store since 2020. A wedding planner in final touches. Both built and maintained by the pipeline this studio sells.`
- **OG description:** `One shipped and still updated. One in final touches. Built with the same review gates a client would get.`

---

## 4. `/work/pocket-manager/`

Every fact here traces to §5.2. Nothing about the app's internals is stated, because §5 does not
contain it.

### 4.1 Page header

- **Headline:** `Pocket Manager`
- **Subhead:** `A personal expense tracker, in the Play Store since 2020 and still shipping updates.`
- **Stage:** `Live`
- **Store link label:** `Open Pocket Manager in the Play Store`
- **Accessible name for the store link:** `Open Pocket Manager in the Google Play Store. Opens a new tab.`
- **Store listing name, where the full listing title is quoted:** `Pocket Manager | Finance Manager`

### 4.2 Problem

- **Heading:** `Problem`
- **Body:** `An expense tracker earns its place only if logging something takes seconds and the answer is on screen before you put the phone down. Pocket Manager is built around two questions: what did I spend today, and what does the month come to. The calendar screen answers the first, showing a chosen day's records with the daily and monthly balance beside them. The statistics screen answers the second, with graphs over date ranges up to 90 days.`

The paragraph is derived from the Play Store listing's own feature list, which the Fact Checker
verified at the source. It went to the owners with the rest of round 3 and came back uncorrected,
so it stands as written.

### 4.3 Build

Every fact in this section comes from a read-only audit of the app's own repository, recorded in
`FACTS.md` section (d). Nothing here is a description of the codebase supplied by the owners; item
44 said there were no written notes and to read the code instead.

- **Heading:** `Build`
- **Body:** `Kotlin, and Jetpack Compose for every screen. The migration off XML layouts is finished, and a test in the repository fails the build if a layout file comes back. Hilt wires the app together, Room holds the data with no network layer behind it, and WorkManager runs the scheduled work. The home-screen widgets are Glance, the app lock is the platform biometric API, and the charts on the statistics screen are our own code rather than a charting library. Export runs through a vendored SQLite-to-Excel module. Analytics and crash reporting are Firebase. minSdk 23, so it still installs on a phone running Android 6.`
- **Closing line:** `The repository's first commit is dated November 2020.`

That last line is a commit, not a release, and the page says so by calling it one. The two are
different events and only the year is common to both.

One shape of sentence is forbidden here: the one claiming nothing ever leaves the phone, in any
wording. The app's own records have no network layer, which is a build fact and printable; the
Firebase analytics and crash-reporting SDKs do send data off the phone, which makes the larger
claim false. Item 14's ban on privacy claims covers the rest.

- **Feature list, safe to print as-is, straight from the listing:**
  - `A simple interface with multiple categories.`
  - `A calendar screen showing a chosen day's records, with the daily and monthly balance.`
  - `A statistics screen with graphs and date ranges up to 90 days.`
  - `Transaction export.`

### 4.4 Review process

This is the section the whole site exists to support, and it is the one section whose claims a
reader cannot check from the store listing. It is written from the pipeline's own configuration
files, audited in `FACTS.md` section (d): the scheduled task, the repository contract, and the two
CI workflows.

- **Heading:** `Review process`
- **Body:** `An autonomous run picks up Pocket Manager every two hours on our own machine, and the rule it runs under is written into the repository: a human cuts every release, and the agent never pushes. The release workflow is manual-trigger only, so no scheduled run can start one. A separate workflow runs the unit tests on every push. The same four gates apply here as to client work: a person decides the architecture, reads the diffs, runs QA on physical phones, and checks what the app collects against what the listing says. There is no version of this where an agent decides the app is ready.`
- **Closing line:** `The process being sold on the home page is the process running on this app.`

Note on the fourth gate. The security and privacy review runs on this app like any other, but this
page states no outcome from it, because item 14 forbids a privacy claim of any kind here. Naming
the gate is a process fact; naming what it found would be the claim.

### 4.5 Outcome

- **Heading:** `Outcome`
- **Body:** `4.3 stars from 24 reviews. 1,000+ downloads. Reviews on the listing go back to early 2021, so the app has been live and maintained for roughly five years, and the last update was 29 August 2025.`

Do not round, inflate or re-describe any of those four numbers. The smallness of 24 reviews is
part of the argument: a maintained small app is better evidence of discipline than a large
abandoned one.

Item 13 gave 2020 as the release year and no month, so "since 2020" and "roughly five years" are
the most precise things this page will ever say about the first release. The repository's first
commit, in §4.3, is a commit and is labelled as one.

### 4.6 Privacy

There is no privacy section on this page, and its absence is deliberate rather than pending: item
14 settled that the site makes no privacy, encryption or deletion claim for Pocket Manager, so
there is no "Data safety" heading, no sentence about what is collected, and no flag to turn on
later.

### 4.7 Screenshots

New screenshots, captured from the latest build rather than pulled off the store listing (item 16).
The alt lines below describe the screens the §5.2 feature list names, and each is checked against
the image that actually ships before it publishes.

- **Alt, calendar screen:** `The Pocket Manager calendar screen, showing one day's transactions with the daily and monthly balance above them.`
- **Alt, statistics screen:** `The Pocket Manager statistics screen, showing spending as a graph over a selected date range.`
- **Alt, categories screen:** `The Pocket Manager category list, with a spending total beside each category.`
- **Alt, export:** `The Pocket Manager export screen.`

`[CONFIRM: every alt line above, against the new screenshots, once they exist. QUESTIONS.md item 60 is open on who captures them and at which device size; the calendar and statistics screens are the two the case study cannot do without. If a captured screen shows something other than the line describes, the alt is rewritten, not stretched.]`

### 4.8 Meta

- **Meta title:** `Pocket Manager | TheGeekDogs`
- **Meta description:** `Our own expense tracker, live in the Play Store since 2020. 4.3 stars from 24 reviews, still updated, and maintained by the same agent pipeline and human review gates we sell.`
- **OG title:** `Pocket Manager`
- **OG description:** `Live in the Play Store since 2020. Maintained by the same pipeline and the same four human gates as client work.`
- **OG image text:** `Pocket Manager` and, under it, `Live. 4.3 stars, five years, still shipping.`

---

## 5. `/work/wedding-planner/`

**Read before editing this route.** The product has no final name and has not shipped. Nothing on
this page names it, dates it, or describes the collaboration feature, account deletion, or Apple
sign-in. Nothing here mentions a vendor directory, a guest-facing app, in-app payments, or a paid
tier. There is no gendered language. Tone is plain and warm, never chirpy: the reward this product
offers is relief, and nobody is congratulated.

Item 9 chose option (a): the full page ships, name-agnostic, before the name is settled. Item 12
was answered no, so nothing on this page or the home page says a feature was cut from the store
listing. Item 11 was answered no, so there is no email capture here.

### 5.1 Page header

- **Headline:** `The second one, in build.`
- **Subhead:** `A wedding planner that works offline, never sells your data, and handles a wedding with more than one function.`
- **Stage:** `Final touches`
- **Product name field:** empty, by decision. Every reference on this page, in its slug, its title,
  its OG fields and its structured data is descriptive until a human picks a name. The internal
  bundle id is never user-facing.
- **Store link field:** empty, by decision. The app has not been submitted, so no store link
  renders and no link label is shown. Do not ship a link to nothing.

The subhead is the ASO document's own positioning line, used verbatim. Do not paraphrase it.

### 5.2 The differentiator

This is the section worth the page.

- **Headline:** `One wedding, several functions, one screen.`
- **Body:** `A wedding isn't one event. It's a Sangeet, a Mehendi, a Haldi and the wedding itself, each with a different guest list and a different headcount, and the numbers don't match. Every competitor's store screenshots show the same three screens: a checklist, a budget, a countdown. None of them show the thing that actually makes the planning hard.`
- **Closing line:** `The planning board puts every function on one screen, with its own list and its own count.`

### 5.3 What it does

Only these. Everything on this list is reachable by a tap in the shipped build, which is why it is
honest to describe. Nothing is added to this list without checking §5.3.

- **Heading:** `What's in it`
- Items:
  - `Works fully offline. No account needed to plan a wedding.`
  - `A planning board with a guest list and a headcount for each function.`
  - `A budget per function, a card showing who has paid what, and a payment timeline by month.`
  - `Optional Google sign-in for cloud backup. Sign in only if you want it, nothing required.`
  - `More than one wedding on the same device. Create them, switch between them.`
  - `A Hindi interface.`
  - `No ads. Everything in the first version is free.`

### 5.4 Why it isn't out yet

Honest, and it does more work than a launch date would.

- **Heading:** `Why it isn't out yet`
- **Body:** `The features are built and verified on real devices. What's left is the short list you'd expect at this stage: the name isn't final, and the release signing and the launcher icon aren't done. None of it is the kind of thing you rush, and none of it is a reason to put a date on the page.`
- **Closing line:** `It goes to the store when a person says it's ready, and not before.`

Note: item 12 was answered no. The paragraph that used to sit here referred to a fully built,
fully tested feature that is described nowhere because the button that opens it doesn't open yet.
That sentence is out of this section and out of §2.7, in any wording. The "in build" frame stands
on the three remaining facts and the closing line, which is the one that was doing the argument's
work anyway: a person ends it.

### 5.5 Screenshots

The email-capture section that stood here is cut: item 11 was answered no, so this page collects
no address, ships no field, and posts to no endpoint.

What ships instead is images. Item 10 cleared the five real-device screenshots and the store icon
from `assets/brand/store/`. The feature graphic is excluded, because it carries the placeholder
wordmark and no asset on this site prints that name.

- **Alt, planning board:** `The planning board, with each function of the wedding on its own row, carrying its own guest list and its own headcount.`
- **Alt pattern for the other four:** `{What the screen shows}, in the app's own words.` Each line
  is written against the image that ships and names only features the §5.3 list already names. A
  screenshot showing anything outside that list is not used, because describing it here would
  describe the feature §5.3 forbids describing.

### 5.6 Meta

No route, title, description, OG field or structured-data value on this page contains the
product's internal working title.

- **Meta title:** `A wedding planner, in build | TheGeekDogs`
- **Meta description:** `Our second app, in final touches. It works offline and handles a wedding with more than one function: a guest list and a headcount for each, on one screen.`
- **OG title:** `One wedding, several functions, one screen.`
- **OG description:** `The second app from TheGeekDogs, in final touches. Offline, no account needed, and built for a wedding that's more than one event.`
- **OG image text:** `In build` and, under it, `A wedding planner for more than one function.`

---

## 6. `/sahib/`

`[CONFIRM: every title, date boundary and stack attribution on this page, against Sahib's own resume, once it is supplied. QUESTIONS.md item 61 is open. Tanya's page was cross-checked against a document; this one rests on the brief's paraphrase and one-line owner answers, which is a weaker source for the same kind of claim.]`

### 6.1 Intro

**Spine: breadth. Finance is the texture.** In one line, the case for the reverse: finance is the
better story, because four employers in a row in money is a pattern nobody chooses by accident,
but it argues for hiring a fintech contractor rather than this studio, and breadth is the thread
that makes the studio's delivery model credible.

- **Headline:** `Sahib Singh`
- **Role line:** `AVP, Mobile. Native iOS, native Android, KMP and Flutter, with production work shipped in all four.`
- **Body:** `Seven years, four companies, and no single platform to narrow him to. At Keenai Global he's a Builder: features end to end, backend through testing, with AI, in wealth-tech for Indian HNIs, UHNIs and family offices. That matters here more than anything else on this page. The delivery model this studio sells isn't a theory he's trying out on clients. It's how he already works every day, in a regulated domain with real money and real auditors attached.`
- **Map lead-in**, the one line above the coverage map (DESIGN.md §F.7, ≤ 14 words): `Five surfaces, five places. A filled cell means a product we can name.`
- **Texture line, placed after the work cards:** `One more thing worth noticing about the list above: travel bookings, then investing, then wealth, with fleet telematics the one exception. Three of the four put him next to other people's money, which is not a place anyone lands by accident.`

Note on the lead-in. It is 13 words and names the axes, not a claim: five surfaces against five
places, and a filled cell is one with a product behind it.

Item 45 came back with employers for both open columns, which is the case DESIGN.md §F.1 designed
for and the better of the two outcomes it planned around. Native iOS is Motive and smallcase; KMP
is Motive. Both cells fill, and the honest line that was drafted for the outlined state comes out
of the page entirely: it existed to name a gap, and the gap is closed. Nothing else on the page
changed with it.

### 6.2 Work cards

Content per role, in the §7 table. Every *confirm* marker is preserved. Card hierarchy per §6.1:
company largest, then what they do, then the years, then the small print.

**Card 1: Keenai Global**

- **Company:** `Keenai Global`
- **What they do:** `Wealth-tech, Singapore and Bengaluru. Built with Lighthouse Canton, for accredited investors and family offices.`
- **Years:** `2025 – now`
- **Role:** `Builder (AVP, Mobile)`
- **Products and stack:** `Keenai Wealth, a multi-asset platform covering 50 global markets with custody at BNY Pershing, and Keenai Pulse, which the firm runs for single-family offices. Flutter, Dart. And end-to-end feature work, backend through testing, with AI.`

Item 37 cleared "Singapore and Bengaluru" and item 25 cleared Keenai Pulse. Both now print without
a marker, on the owners' authorisation: the company's own site names only Singapore, and it names
Pulse as a product without naming who builds it.

**Card 2: Motive**

- **Company:** `Motive`
- **What they do:** `Fleet management, US. Formerly KeepTruckin. AI dashcams, ELD compliance, telematics.`
- **Years:** `2023 – 2025`
- **Role:** `Android Engineer`
- **Products and stack:** `Motive Fleet App, the fleet-manager side: live GPS, hours of service, vehicle health, dashcam review. Kotlin, native iOS, and KMP. This is the card that carries the KMP column of the map, and one of the two that carry native iOS.`

**Card 3: smallcase**

- **Company:** `smallcase`
- **What they do:** `Investing platform, India. Curated portfolios of stocks and ETFs.`
- **Years:** `2020 – 2023`
- **Role:** `SDE 1 to SDE 2 to Senior Software Engineer`
- **Products and stack:** `Tickertape. Android first, then Dart and Flutter, and native iOS.`

Item 24 named the surface: Tickertape, not the smallcase app and not gateway. Item 45 put the
second half of his native iOS work here.

**Card 4: Cleartrip**

- **Company:** `Cleartrip`
- **What they do:** `Travel booking, India. Flights, hotels, trains.`
- **Years:** `2019 – 2020`
- **Role:** `Android Developer, internship`
- **Products and stack:** `Cleartrip Android app.`

**Card 5: TheGeekDogs**

- **Company:** `TheGeekDogs`
- **What they do:** `This studio.`
- **Years:** `2020 – now`
- **Role:** no role line on this card. The §7 table leaves it blank and inventing one would be an
  invented fact.
- **Products and stack:** `Pocket Manager. 4.3 stars, 1,000+ installs, still shipping.`

### 6.3 Teaching and writing

- **Heading:** `He writes it down`
- **Body:** `Sahib writes Android posts regularly and they land: channelFlow versus callbackFlow, Android 16 dropping orientation locks and the duplicate-fragment bug it caused, ViewModel versus onSaveInstanceState versus SavedStateHandle. By his account, the Android 16 post drew 283 reactions and 13 reposts on LinkedIn. Before any of that he founded PyHour at Chitkara, a student initiative running free Python classes for juniors.`
- `[CONFIRM: which supplied URL belongs to which post title. Item 38 gave four LinkedIn URLs for the three posts named above and did not map them; QUESTIONS.md item 62 asks which is which and what the fourth one is. Three titles print with three links or none of them link.]`
- `[CONFIRM: "283 reactions and 13 reposts", permanently. LinkedIn blocks every fetch, so this figure is the owners' own count and cannot be checked from any URL they supply. FACTS.md (e)3 records it as a standing limitation, not a pending question. It prints as their figure or it comes out.]`
- **Closing line:** `Someone who can explain a thing clearly to strangers is usually the person who can explain it to a reviewer.`

### 6.4 Background

- **Heading:** `Background`
- Items:
  - `BE, Chitkara University, 2016 to 2020.`
  - `Google Associate Android Developer certification, 2019.`
  - `Udacity Android Basics Nanodegree.`
  - `Google and Udacity Challenge Scholarship, phases 1 and 2. Top 1,000 of 10,000.`
  - `Recommendations from a mobile lead at smallcase and from a Google Developer Expert.`

### 6.5 Links

- **GitHub link label:** `Sahib on GitHub`
- **Accessible name:** `Sahib Singh on GitHub. Opens a new tab.`
- **LinkedIn link label:** `Sahib on LinkedIn`
- **Accessible name:** `Sahib Singh on LinkedIn. Opens a new tab.`
- **Email link label:** `sahiboffc@gmail.com`
- **Accessible name:** `Email Sahib at sahiboffc@gmail.com`
- **Back link:** `Back to the studio`

Item 39 put the GitHub link on this page, which is what the Fact Checker recommended: the account
is real and in use and the repos do span the four stacks, though what is publicly visible is mostly
older learning work. It is a plain link in this section and nothing more prominent. Never print
contribution counts, streaks or repo numbers.

The LinkedIn link is plain too, labelled for what it is rather than dressed as an invitation. Item
40 asked for a link CTA and this is the honest shape of one; a resume link joins it when a resume
exists. Items 17 and 18 closed everything else, so these three and the back link are the section.

### 6.6 Meta

- **Meta title:** `Sahib Singh | TheGeekDogs`
- **Meta description:** `Mobile engineer across native iOS, native Android, KMP and Flutter. Builder at Keenai Global, shipping features end to end with AI in production wealth-tech.`
- **OG title:** `Sahib Singh`
- **OG description:** `Four mobile stacks, seven years, and finance almost the whole way through. Now building end to end with AI in wealth-tech.`
- **OG image text:** `Sahib Singh` and, under it, `Native iOS, native Android, KMP, Flutter.`

---

## 7. `/tanya/`

Copy is written so it does not assume a chronological layout. §9.3 rules that a timeline
misrepresents what she does; nothing below depends on one.

### 7.1 Intro

- **Headline:** `Tanya Jain`
- **Role line:** `Mobile engineer. Native Android and KMP, and the iOS side too.`
- **Body:** `Software Engineer 2 at Motive, on the Fleet App, where she owns releases: phased rollouts, crash and ANR monitoring, and the fixes that follow. Here she owns QA on real devices and the security and privacy review outright, and shares code review with Sahib. She also owns the spec that starts the work and the ASO that ships it.`
- **Second paragraph:** `Underneath that is the shape she works on: a shared core, native code at the edges, and the developer practices that keep the two from drifting apart.`
- **Quote, verbatim from Sahib's recommendation of her, 3 July 2026:** `"always looking for ways to improve developer productivity, whether by refining workflows or introducing better development practices"`
- **Second quote, same source:** `"go-to person for KMP-related discussions"`
- **Quote attribution line:** `Sahib Singh, who worked alongside her at Motive.`
- **Closing line:** `On a studio whose entire argument is that review gates catch what agents miss, that is the argument. It isn't a supporting role.`

Note for the Design Lead: the two quotes are short and load-bearing. They are the only quoted
material on the site and they must read as quotation, not as pull-quote decoration.

### 7.2 Work cards

Every *confirm* marker preserved. Do not pad this list to match Sahib's length; a shorter, denser
history is not a weaker one and visible padding says otherwise.

Dates and titles on all three cards are the resume's, not the brief's. The brief was wrong in three
places and `FACTS.md` rows 47, 48 and 50 caught each one: her Naskay title, her Motive title, and
the Naskay-to-HSBC boundary, which is August 2021 on both sides rather than a July handover.

**Card 1: Motive**

- **Company:** `Motive`
- **What they do:** `Fleet management, US.`
- **Years:** `Jan 2024 – now`
- **Role:** `Software Engineer 2`
- **Products and stack:** `Motive Fleet App. Kotlin, Coroutines, Compose, and KMP business-logic modules under Clean Architecture. Bluetooth device-verification flows, CI/CD and workflow automation.`
- **Ownership line:** `She owns app releases there: phased rollouts, crash and ANR monitoring, and the fixes that follow.`
- **Her own account, attributed:** `By her account, a 99.8% crash-free rate held and about 20% off startup time, from cold-start and dependency work.`

The two figures print only in that attributed form. `FACTS.md` row 52 clears them for publication
and is explicit about why the attribution is not optional: Motive does not publish the numbers, so
nobody outside the company can check them, and a studio arguing for review gates does not print an
uncheckable statistic as if it had checked it.

**Card 2: HSBC**

- **Company:** `HSBC`
- **What they do:** `Global bank.`
- **Years:** `Aug 2021 – Dec 2023`
- **Role:** `Software Engineer`
- **Products and stack:** `Mobile banking. Migration to MVVM, UI performance work, and diagnosis of production issues.`

No product name on this card. Her resume names one; item 27 says not to print it, and the owners'
answer wins over the document.

**Card 3: Naskay Technologies**

- **Company:** `Naskay Technologies`
- **What they do:** `Mobile and product studio, Noida. Around 20 people, client work.`
- **Years:** `Nov 2020 – Aug 2021`
- **Role:** `Android Intern`
- **Products and stack:** `Kotlin, Glide, Retrofit. A UI rebuild, APK size cut through code and resource work, and refactoring.`
- **Project line:** `[CONFIRM: how to describe the Naskay project. Item 28 cleared naming it and her resume names it, but it is a real US personality's trademarked fitness brand rather than Naskay's own product. QUESTIONS.md item 63 asks the owners to choose: name the brand, or print "a fitness app for a US client". The card carries no project line until they pick one.]`

### 7.3 How the work gets made

The section that connects her to the home page's pitch.

- **Heading:** `How the work gets made`
- **Core statement**, inside the shared-core field, under `What belongs to everyone` (DESIGN.md line 1147, ~40 words): `A shared core is a decision about what everyone has to agree on: the data, the rules, the review gate, the order the work moves in. The platform code at the edges stays small because the core settled it first.`
- **Gates link, 1440**, the line in the core column at the foot of the page, under `The review gates below are hers.` (DESIGN.md line 1165, ~25 words): `The four gates on the home page are this layout applied to a build: one core everyone agrees on, and edges small enough to review.`
- **Gates link, 360** (DESIGN.md line 1227, ~25 words): the same string, unchanged. The two markers
  are one slot at two breakpoints, not two slots. The 360 wireframe restates the 1440 line rather
  than replacing it, so one string serves both, on the same rule as §10.4's stage labels.
- **Body, long form:** `Three of the four gates on the home page have her on them, two of them hers alone. She writes the spec that says what the thing deliberately won't do, she runs the build on physical phones, and she reads what it collects and what the listing says about it before anyone outside sees either. At Motive she owns releases the same way: phased rollouts, crash and ANR monitoring, and CI/CD work so the path from merge to store is one a person can repeat. A studio selling "agents write it, humans review it" needs someone whose subject that already is, and the shared core is the same argument one layer down: agree the data, the rules and the order of the work once, and the platform code at the edges stays small enough to review.`

The long form is still the section's paragraph where a paragraph fits. The two short fields above
are the strings DESIGN.md §G.3 has slots for: the core statement sits inside the shared-core field
and says what a shared core is, and the gates link sits under the core column at the foot of the
page and makes the §9.3 connection back to `/` explicit. Neither repeats the other; the first is
about the layer, the second is about the gates.

The long form was rewritten in round 4 so that ownership carries the section and subject matter
follows it. Item 19 gave her four of the things a person has to do on every build; the resume gave
evidence that she already does them where more is at stake, with releases owned, rollouts phased,
crashes and ANRs watched and the pipeline improved. The shared core stayed in, at the end, as the
layer under the gates rather than as the page's opening claim.

### 7.4 Background

- **Heading:** `Background`
- Items:
  - `BTech, Computer Science and Engineering. Meerut Institute of Engineering and Technology, affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow. 2017 to 2021.`
  - `Udacity Android Developer Nanodegree.`
  - `HackerRank Java problem solving.`
  - `TCS CodeVita Season 9 pre-qualifier, all-India rank 2023.`
  - `Task Manager, an open-source multi-module Android app: github.com/Tanya-jain99/TaskManager.`

The education line is a correction, not an edit for style. `FACTS.md` row 36 marks the brief's
version contradicted: it named a state university in Kerala, and her resume names a college in
Meerut affiliated to a different university in Lucknow that shares the same namesake. Do not print
"Kerala" or "Technological University" on this page. The Task Manager line prints because the
repository was fetched and exists; it is the one item on this page verified at a primary source
rather than on the resume's word.

### 7.5 Links

- **GitHub link label:** `Tanya on GitHub`
- **Accessible name:** `Tanya Jain on GitHub. Opens a new tab.`
- **LinkedIn link label:** `Tanya on LinkedIn`
- **Accessible name:** `Tanya Jain on LinkedIn. Opens a new tab.`
- **Email link label:** `jaintanya999@gmail.com`
- **Accessible name:** `Email Tanya at jaintanya999@gmail.com`
- **Back link:** `Back to the studio`

Item 39 overrode the Fact Checker's placement recommendation and put the GitHub link on this page
as well as his. The caveat behind that recommendation is still true and worth writing down: the
public profile is sparse and carries no KMP or iOS repo, so a visitor arriving from this page finds
less than the section above describes. What answers it is the Task Manager repository in §7.4,
which is on that account and is real, and the recommendation quotes in §7.1. Never print
contribution counts, streaks or repo numbers.

The LinkedIn link is the CTA item 40 asked for, labelled plainly. Items 17 and 18 closed the rest.

### 7.6 Meta

- **Meta title:** `Tanya Jain | TheGeekDogs`
- **Meta description:** `Mobile engineer in native Android and KMP, working on the iOS side too. Software Engineer 2 at Motive, where she owns releases. Here she owns the spec, device QA and the security and privacy review.`
- **OG title:** `Tanya Jain`
- **OG description:** `The product spec, QA on real devices, and the security and privacy review are hers. So are releases at Motive, phased and monitored.`
- **OG image text:** `Tanya Jain` and, under it, `Native Android, KMP, and how the work gets made.`

---

## 8. `/contact/`

### 8.1 Header

- **Headline:** `Two people, one inbox.`
- **Body:** `Email is the whole intake. Tell us what you're building, which platforms it has to run on, and roughly when you need it in someone's hands. You'll get a reply from Sahib or Tanya, and a straight answer about whether we're the right fit. If we're not, we'll say so and tell you what we'd look for instead.`

### 8.2 The three routes

- **Section heading:** `Where to send it`

**Route 1: the studio**

- **Label:** `The studio`
- **Address:** `thegeekdogs@gmail.com`
- **Line:** `Everything starts here. Both of us read it.`

**Route 2: Sahib**

- **Label:** `Sahib`
- **Line:** `Architecture, the release cut, and anything about how a build would actually be structured.`
- **Address:** `sahiboffc@gmail.com`

**Route 3: Tanya**

- **Label:** `Tanya`
- **Line:** `The spec, device QA, the security and privacy pass, and what the shared core carries versus what stays native.`
- **Address:** `jaintanya999@gmail.com`

All three addresses print in full, per item 53. The plate and the routes are `mailto:` links over
the visible address, not a label over a hidden one.

**Engagement line, under the three routes**

- **Line:** `Fixed-scope projects and retainers, both. It starts with a short written brief rather than a call, a first MVP follows a few days after the go-ahead, and we work in IST. There's no phone number: email is the route, and you'll usually hear back within a couple of days.`

Items 2, 3, 5, 6, 8 and 43. The capacity answer, item 4, is on the home page in §2.9 and is not
repeated here. No starting price prints anywhere, per item 7.

### 8.3 No form

There is no contact form on this site, and none on the wedding planner page either. No form ships:
email is the intake, nothing posts to an endpoint, and a page about not shipping things that
aren't wired up does not ship a field that goes nowhere. `QUESTIONS.md` item 69 asks the owners
directly, and a form is added only if they say yes. The form heading, its four
fields, its two hints, the submit label, the sending, success and failure states and both
validation errors are cut, and the response-time clause they carried now sits in §8.2's engagement
line, where item 43 put a number behind it.

### 8.4 Meta

- **Meta title:** `Contact | TheGeekDogs`
- **Meta description:** `Email thegeekdogs@gmail.com. A reply from Sahib or Tanya, and a straight answer about whether we're the right fit for what you're building.`
- **OG title:** `Two people, one inbox.`
- **OG description:** `Tell us what you're building. You'll get a real reply from one of us, and a straight answer either way.`

---

## 9. `/404.html`

- **Headline:** `This page isn't here.`
- **Link label:** `Back to the studio`
- **Meta title:** `Page not found | TheGeekDogs`
- **Meta description:** `That page isn't here. One link back to the studio, and nothing else on it.`
- **Robots:** `noindex`

Four words and one link, per DESIGN.md §B.11 and §J: the page is an empty room, and the body, the
second link and the third are cut. The joke is the empty room and it lives entirely in the design,
so the copy names none of it: no desks, no chairs, no "nobody's at this desk". A line explaining a
visual joke kills the joke and doubles the page.

---

## 10. Alt text and accessible names

### 10.1 Headshots

Item 23 settled the route: portraits from a headshot tool trained on each person's own selfies,
images to be supplied. The two lines below describe what that route produces and stay provisional
until the images arrive, because an alt line has to describe the image that actually ships.

- **Alt, Sahib:** `Sahib Singh, chest-up, turned three-quarters towards the camera with his eyes to it, in soft daylight falling from the left.`
- **Alt, Tanya:** `Tanya Jain, chest-up, square to the camera with her eyes to it, in soft even daylight against a light background.`
- `[CONFIRM: both headshot alt lines, once the owners supply the images item 23 chose. Only they can produce them, and each person approves their own before it publishes. If a portrait comes back looking like something other than a photograph, the line says so; an illustration described as a photograph is a small lie on a site about not telling them.]`

### 10.2 The studio floor

**One-sentence alt for the whole scene**, used on the static image fallback and on the OG image:

`An isometric studio floor seen from above: two desks with people working at them, a group of more schematic desks around them where the agents work, and one empty chair with a nameplate reading Ship approval.`

Do not print a desk count in this sentence. Item 32 settled the floor at seven agent desks, and a
count written into an alt line goes stale the day the roster changes.

**Note for the Engineer.** The floor is built as a semantic roster first (§6). Where the roster is
real text, the SVG scene layered on top is decorative and takes `aria-hidden="true"`; the alt above
exists for the static-image and OG cases only. Do not do both, or a screen reader hears the roster
twice.

**Accessible name patterns for the desk buttons.** Every desk is a focusable button with a proper
name, read in order.

| Desk type | Accessible name pattern | Example |
|---|---|---|
| Human | `{Name}. Open {his, her} card.` | `Sahib Singh. Open his card.` and `Tanya Jain. Open her card.` |
| Agent | `{Agent name}, agent. Checked by {gate name}. Open its card.` | `Security Auditor, agent. Checked by security and privacy review. Open its card.` |
| Empty chair | `Ship approval. The empty chair. Open the card.` | (as written) |

The gate name is spoken in the button name deliberately: on a screen reader, a visitor tabbing the
floor without opening a single card still hears that every agent has a human checking it. That is
the page's whole argument, delivered by the tab key.

The gate name spoken here is the same string as the `Checked by` field in §2.4, which is the same
string as the gate's own heading in §2.6. Six strings, used everywhere they appear, and the
pronouns are the ones items 20 and 21 gave: he and him for Sahib, she and her for Tanya.

**Card close control**

- **Label:** `Close`
- **Accessible name:** `Close this card`

**Floor empty state**, if the scene fails to load and only the roster renders. No apology, no
error tone, because the roster is a complete answer:

- `The desks, as a list.`

### 10.3 Work cards

**Decision: decorative, and there are no images to alt.**

§7 forbids a logo on any work card, so the cards carry no imagery at all. The stand, the lip, the
cut-edge highlight and the contact shadow are CSS on a list of roles. Any SVG or graphic element
used to draw them takes `aria-hidden="true"` and no alt attribute question arises. The card's
accessible content is the underlying list: company, what they do, years, role, products and stack,
read in that order.

If a future pass introduces an image on these cards, that is a copy change and it comes back here.

### 10.4 The build-stage indicator

An ordered list, with the current step carrying `aria-current="step"`. The state must survive
greyscale, so state is spoken as well as shown.

- **Group label (the list's accessible name):** `Build stage`
- **Per-item accessible name pattern:** `{Stage name}. {State}.`
- **The three state words:** `Done`, `Where it is now`, `Not yet`
  - Example, Pocket Manager: `Specced. Done.` … `Live. Where it is now.`
  - Example, the wedding planner: `Final touches. Where it is now.` / `Submitted for review. Not yet.`
- **Visible summary line above each track:** `Stage: {current stage name}`
- **The five visible stage labels and their meaning lines** are in §2.8. They are identical on the
  home page, `/work/`, and each product page. One string, used everywhere.

No dates, no estimates, no "expected", anywhere near this component.

### 10.5 Store badge and outbound links

- **Alt, Google Play badge:** `Get it on Google Play`
- **Accessible name for any outbound link opening a new tab:** append `Opens a new tab.` to the
  link's own name. Do not use an icon alone to convey it.

---

## Appendix A. The two unused hero variants, and the long hero body

Kept per §7 so the choice does not get relitigated, and so the human Direction gate has all three
in front of it.

**Hero body, long form**

The approved body through round 2, cut to 24 words in round 3 because DESIGN.md §B.7 caps the
subhead at three lines at 360. It is kept here in case the Design Lead finds room for it at 1440,
where the hero body sets to a wider measure. It is the same claim at full length, not a different
one.

> TheGeekDogs is a two-person mobile studio. An agent fleet does the volume work: the spec, the
> code, the tests, the scans. Then a person reviews the architecture, runs QA on physical phones,
> and signs off on security before anything reaches you.

Forty-one words. If it is ever restored, it is restored whole; the half-cut versions tried in
round 3 lost the "spec, code, tests, scans" list, which is the only place on the page that says
what "volume work" means.

**Variant B**

> **Everyone ships fast now. We ship fast and put our name on it.**
>
> Two people, a floor full of agents, and four human checks between the code and your users.

Why not chosen: the headline states a posture rather than a mechanism, and "put our name on it" is
a claim a visitor cannot check or act on. The body is excellent and its "four human checks between
the code and your users" phrasing survives in the OG description.

**Variant C, scene-led**

> **Come in. Have a look around.**
>
> Two of the desks have people at them. The rest are agents. One chair stays empty on purpose.

Why not chosen as the hero: it is the best-written of the three and the wrong opening for a page
whose first job is conversion. A stranger arriving cold learns nothing about what is sold before
being invited to browse. Its three lines were not wasted: they are the floor intro in §2.2, where
the scene is actually on screen and the lines do the work they were written for.

---

## Appendix B. Every `[CONFIRM]` and `[FILL]`, numbered for QUESTIONS.md

Rebuilt from scratch in round 4. The owners answered every item from 1 to 55, the Fact Checker
audited the Pocket Manager codebase, and Tanya's resume arrived, so the previous list of twenty
CONFIRM and thirteen FILL questions no longer described this document. Numbering restarts. A marker
survives round 4 only if it is an open item in QUESTIONS.md section J, or a fact that no round can
ever verify and only the owners can supply.

### CONFIRM. Fact Checker owns these. An unverifiable claim gets cut, not softened.

| # | Where | What needs confirming | Traces to |
|---|---|---|---|
| C1 | §2.4 | Who reviews design. Item 19 named an owner for every other gate on the floor and none for this one, so the Designer card borrows architecture review under item 42's accepted mapping. If a person owns design review by name, this cell and the spoken button name in §10.2 both change. | Item 19's gap |
| C2 | §2.4 | Who cuts the release, and therefore whose name sits behind ship approval on the Release Watcher card and on the empty chair in §2.5. | Item 56, open |
| C3 | §4.7 | Every Pocket Manager screenshot alt line, against the new screenshots once they are captured. Item 16 replaced the store screenshots with fresh ones from the latest build; item 60 has not said who captures them or at what device size. | Item 60, open |
| C4 | §6 | Every title, date boundary and stack attribution on Sahib's page, against his own resume. Tanya's page was corrected in three places by cross-checking hers; his has had no equivalent document. | Item 61, open |
| C5 | §6.3 | Which of the four supplied LinkedIn URLs belongs to which of the three named posts, and what the fourth one is. | Item 62, open |
| C6 | §6.3 | The "283 reactions and 13 reposts" figure. Permanent, not pending: LinkedIn blocks every fetch, so no URL the owners supply can be opened to count it. It prints as their own figure or it comes out. | FACTS.md (e)3 |
| C7 | §7.2 | How to describe Tanya's Naskay project. Item 28 cleared naming it and her resume names it, but the name is a real US personality's trademarked fitness brand rather than Naskay's own product. Name the brand, or print "a fitness app for a US client". | Item 63, open |
| C8 | §10.1 | Both headshot alt lines, once the owners supply the portraits item 23 chose. Only they can produce the images, each approves their own, and the alt has to describe what actually ships. | Item 23, images pending |

### FILL. Only the owners can answer these.

None. Every `[FILL]` in this document at the end of round 3 has an answer.

For the record, and so a later round does not reopen a closed decision as though it were a gap:
F1 is answered by items 3 and the resume (Bengaluru and New Delhi, IST); F2 by items 17 and 18 (no
personal data beyond GitHub and LinkedIn); F3 by items 4 to 8; F4, F5 and F6 by item 9, which chose
the full name-agnostic page, so a missing product name and a missing store link are the shipping
state of that page rather than a hole in it; F7 and F13 by the shipping decision itself, no form
anywhere, email as the intake, with `QUESTIONS.md` item 69 asking the owners directly and a form
added only if they say yes; F8 by
item 44 and the codebase audit in `FACTS.md` section (d); F9 by item 16, with only the capture
logistics left open as C3; F10, F11 and F12 by items 1, 2, 3 and 53.

**Totals: 8 distinct `[CONFIRM]` questions and 0 `[FILL]`. 8 open items, down from 33.**

A grep of this document finds 8 `[CONFIRM:` and 0 `[FILL:` markers, once the two legend lines in
"How to read this document", the four quoted strings in this appendix's own heading and totals
line, and the two in the count paragraph below are excluded. There are no cross-references left:
every marker appears exactly once, in one section, so the marker count and the question count are
the same number for the first time.

Round 4 removed nineteen markers and wrote three new ones. C1, C2, C3, C4, C5 and C7 are new or
renumbered against open items; C6 and C8 are the two that no amount of checking will close, and
they are marked so nobody spends another round trying. Six markers were not resolved but retired,
because the question behind them stopped being a question: gate ownership, the privacy declaration,
the cut-feature sentence, the smallcase surface, the Motive app and the HSBC product.

None of them may reach production unresolved. C2 is the one that changes a card rather than a
sentence, and it should go to the human gate first.
