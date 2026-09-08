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
- Item 59 gave three adjectives per person. They are register, not vocabulary: `/sahib/` should
  leave a stranger with drive and delivery, `/tanya/` with forethought and attention to the person
  using the thing. None of the six words is printed anywhere on this site and none is to be added;
  the pages earn the impression from what they report, not from claiming it.

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

- Visible label, 768 and above: the address itself, in plain text. Item 53 chose the address over a
  label, and DESIGN.md §B.10 holds the same table: `thegeekdogs@gmail.com` on `/`, `/work/*`,
  `/contact/` and `/404.html`; `sahiboffc@gmail.com` on `/sahib/` and `jaintanya999@gmail.com` on
  `/tanya/`, per item 66.
- **Label, below 768:** `Email` (5 characters). DESIGN.md §B.10 round 10 narrowed the plate to
  112 × 56 there, which leaves about 73px of type, 9 characters at small/14px, so the address
  cannot print and the plate carries the action instead. One string for all three worlds, and it
  carries no pronoun on purpose: `us` would name the studio while the `mailto:` names one person,
  and §B.10 requires that the plate and the page never disagree about who is being written to. It
  is also the first word of the accessible name below, so the printed word and the spoken name
  start on the same verb.
- Accessible name, one pattern for all three addresses and both widths: `Email <address>. Opens a new message about a project.`
  Substitute the page's own address for `<address>`, so the spoken name and the printed label never
  name different people. Below 768 this is the only place the address is spoken, which is why the
  pattern does not shorten with the plate.
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
- Location line: `Bengaluru. We work in IST.`
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

**The gate block, both cards.** DESIGN.md §C.6 item 4 gives the two human cards the same sub-block
geometry the agent cards have, with a micro label and then the gates that person owns. The agent
cards say `Checked by`. Its counterpart here is one word, because on a human card the person is the
one doing the checking rather than the one being checked:

- **Field label above the gate list on the human cards:** `Owns`
- **Gate list, Sahib:** `Architecture review, code review, design review, the release cut.`
- **Gate list, Tanya:** `Spec, code and design review, device QA, security and privacy, ASO, release cut.`

Item 19 assigned the first five, item 56 put both names on the release cut, and item 71 put both
names on design review, so those two appear on both lists rather than on neither. The short forms
here are §C.6's own, not §2.4's `Checked by` strings: this block is a comma list inside a 318px
measure, and `QA on real devices` and `Security and privacy review` set at full length push it past
its budget. The Engineer should not assert these against the gate collection the way the agent
cards' single label is asserted.

Note for Design Lead and Engineer, on height. §C.6's reservation budgets two lines for the gate
list and was computed before design review and the release cut had owners. Sahib's line is 65
characters and sets to two. Tanya's was 96, which set to three at both the ≥ 1024 measure
(≈ 38 characters) and the 360 measure (≈ 35). It is 80 now, and all seven responsibilities are
still on it: code review and design review are grouped into one phrase, `product spec` is the
`Spec` the body two lines above spells out in full, and `the release cut` is `release cut`. Nothing
was dropped. That is as far as the copy goes without dropping a gate somebody owns, so if 80 still
overflows two lines at the 360 measure, §C.6's own rule applies and the remainder is padding, never
a shorter reservation and never a gate. Copy does not choose which gate would go, because none of
them would.

Item 19 assigned every gate but one, and it assigned them unevenly: two of the four are hers
outright, code review is shared, architecture is his, and the product spec, which is not one of the
four, is hers as well. The cards print that split rather than balancing it, because a card that
squares an uneven division is a card that stopped being true.

### 2.4 The agent cards

One card per role. Each names the job and the human gate that checks its output. The pairing of
the flex and the reassurance is the point; do not split them across two cards.

Order below is pipeline order. Item 32 settled the floor at seven agent desks, so all seven render
and the roster list carries the same seven in the same order.

The gate names in the right column are the same strings as the gates in §2.6: three of the numbered
four, plus the three named under them or outside them, which are the product spec, Tanya's; ship
approval, the empty chair in §2.5; and design review, which item 70 gave to both of them. Item 42's
mapping of design review onto architecture review is superseded, because a gate with an owner of
its own gets a label of its own. The release gate still maps onto ship approval, so no further
label is invented there. Architecture review is now the one gate with no desk under it, which is
correct rather than awkward: it happens before there is anything to check.

| Desk | Job | Checked by |
|---|---|---|
| Spec Writer | `Turns the brief into a written spec: scope, constraints, and what the thing deliberately won't do.` | `Product spec review` |
| Designer | `Layouts, states, and the empty and error screens everyone else forgets.` | `Design review` |
| Programmer | `Writes the code. Fast, and far more of it than a person would.` | `Code review` |
| Test Engineer | `Writes the tests around the edges you'd have shipped without. The agent writes them and runs them. A person judges whether they test what matters.` | `QA on real devices` |
| Security Auditor | `Scans dependencies, permissions, and what the app collects and where it goes. The agent runs the scan. A person reads the result and decides what to do about it.` | `Security and privacy review` |
| Reviewer | `Reads every diff for what a tired human misses at 1am.` | `Code review` |
| Release Watcher | `Watches crashes and performance in production and files the ticket before your users do.` | `Ship approval` |

Design review has an owner now. Item 70 answered it the way item 56 answered ship approval: both of
them. So the Designer's `Checked by` cell reads `Design review`, its own label rather than
architecture review borrowed under item 42's mapping, and §10.2's desk button speaks that same
string. The two names print in §2.6's design-review line.

Ship approval has an owner now. Item 56 answered it: Sahib and Tanya cut every release together.
The Release Watcher's `Checked by` cell stays the gate name and nothing else, because §10.2 speaks
that same string in the desk button's accessible name and six strings serve the whole floor. The
two names print in §2.6's ship-approval line instead, where every other gate names its owner.

The two long cards are long on purpose. §7 is explicit that a reader who notices Security Auditor
and the human security review overlapping will assume the page is padding, and the same for Test
Engineer and the QA pass. The scan-versus-decision sentence is the answer and it must not be cut
for length. If the card is too small for it, the card gets bigger.

Field label above the gate name on each card: `Checked by`

**The roster line.** DESIGN.md §B.8 and §B.9 set the seven roles as a readable wrapped sentence
under the scene, at every breakpoint, with a short label above it. It is the screen-reader-first
copy of the same list the floor draws, so it carries the same seven names in the same order as the
table above and nothing else.

- **Roster label:** `The full pipeline`
- **Roster line, as a sentence:** `Spec Writer, Designer, Programmer, Test Engineer, Security Auditor, Reviewer and Release Watcher.`

The label is §B.8's own wireframe string and stays it. Do not print a count above or beside this
line, for the reason §2.2 and §10.2 both give: a number in body copy goes stale the day the roster
changes. The line itself is the count anyone needs.

### 2.5 The empty chair

- **Nameplate:** `Ship approval`
- **Body:** `This chair stays empty. No agent decides that something is ready for your users. A person does, every release.`

This card has no worker in it and should not pretend otherwise. There is no role line, no
"checked by" field.

### 2.9a Work-card strip

Numbered 2.9a, positioned here. It sits directly after the floor and before the four gates, which
is where DESIGN.md §B.8 and §B.9 put it: the room has just said two of the desks have people at
them, and the strip answers who they are. The number is out of order and the position is not.

Two rows, one per person, two compressed cards each, and one link per row. The cards carry company
and years only. Both fields are already written: Sahib's two are §6.2 cards 1 and 2, Tanya's are
§7.2 cards 1 and 2, and they print as those sections give them. No new company string, no new date
string, and no role or stack line here, because §B.8 makes the person pages the only complete
rendering of a work card.

- **Row label, first row:** `Sahib Singh`
- **Row label, second row:** `Tanya Jain`
- **Link label, first row:** `Sahib's work in full`
- **Accessible name:** `Sahib's work in full, on his page`
- **Link label, second row:** `Tanya's work in full`
- **Accessible name:** `Tanya's work in full, on her page`

Both labels are four words and both name the person, so a screen reader user tabbing out of the
strip hears which page each link goes to without the row label as context. "In full" is the honest
promise: the strip shows two of Sahib's five companies and two of Tanya's three, with two of the
four card levels dropped, and the person page is where all of it prints. The pronouns are items 20
and 21's.

- **Section heading:** `Where they've worked`

Neither wireframe draws a heading or an intro line above the strip. §B.8 and §B.9 both open the
section with the first row label, and adding a printed line above it would take height the strip
was included on the condition of not taking. So the heading above is the section's accessible name
rather than a printed line, and there is no intro. If the Design Lead adds a visible slot later,
that is the string for it and it needs no rewrite.

### 2.6 The four gates

- **Headline:** `Four things we don't hand to an agent.`

These are genuinely a sequence, so §9.4 permits numbering them. Nothing else on the page gets
numbers.

1. **`Architecture review.`** `Sahib decides the shape before a line is written: what the data looks like, where the boundaries are, what this has to survive in two years. Agents are good at filling in a structure and bad at choosing one.`
2. **`Code review.`** `Every change is read by a person before it merges, and both of us are on this one. Not skimmed for style. Read for whether it does what it claims.`
3. **`QA on real devices.`** `Tanya runs the build on physical phones, not just an emulator. Slow networks, low battery, older Android versions, the states people actually hit.`
4. **`Security and privacy review.`** `Tanya reads what the app collects, where it goes, what's stored and what's exposed, against what we told your users we'd do.`

- **Line under the four:** `Design review and the release itself stay with Sahib and Tanya: both read the layouts before build, and both names go on every release.`
- **Closing line:** `That's the difference between generated software and shipped software.`

Item 56 settled ship approval and item 70 settled design review, both of them jointly in each case.
That line sits under the numbered four rather than inside them, because the four are the gates
§2.4's cards map to, item 42 put the release gate on the empty chair, and design review arrived
after the four were set. The empty chair's own card in §2.5 stays exactly as written and names
nobody; a chair with two names on it is a chair with someone in it.

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

`A second app sits behind it in final touches, built through the same pipeline and stopped at the same gates. There's no date on it. The list of what's left is short, and a person decides when it ends.`

Item 68 came back yes: the second app is built and maintained through the same pipeline and the
same review gates, so the pipeline clause is the shipping text. The `FACTS.md` §(d) audit still
read the Pocket Manager repository only, and the claim now rests on the owners' answer rather than
on that audit. If the second repository is ever audited and reads differently, this clause comes
out of here, §3.1 and §3.4 together.

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
- **Short intro:** `The two apps this studio builds and maintains, with the same review gates a client would get.`
- **Long body:** `The work below isn't a portfolio of things we made for other people. It's the two apps this studio builds and maintains with the same pipeline and the same review gates a client would get. One is in the Play Store. One is in final touches.`

Item 68 confirmed both products run through the same pipeline and the same gates, so the clause
prints here rather than waiting behind a variant.

The short intro is 17 words, against DESIGN.md §B.11's 20. It is the one that prints if only one
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
- **Meta description:** `Pocket Manager, live in the Play Store since 2020. A wedding planner in final touches. Both built and maintained by the pipeline this studio sells.`
- **OG title:** `Two products, both ours.`
- **OG description:** `One shipped and still updated. One in final touches. Built with the same review gates a client would get.`

Both descriptions are the item 68 wording, promoted out of variant on the owners' yes.

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
  - `Export to CSV from settings.`

The last item says where export lives and stops there. The app tags the export, import and share
rows Beta, which is a state and not a feature, so the label stays off the marketing line and the
line claims nothing about how finished the feature is. It is not called a screen anywhere on this
site, because it is a row in settings that hands off to the system file picker.

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

The screenshots exist. Item 60 captured twelve of them from the latest local build rather than off
the store listing (item 16): six screens, each in the app's own light and dark themes, with ten
seeded September 2026 transactions in them. `docs/assets/pocket-manager/README.md` records what is
on each one, and the four lines below are written against those images, not against the old ones.

The case study uses four screens. Alt text describes what is on screen, and what is on screen does
not change with the theme, so each screen has one alt line and the light file and its `-dark` twin
share it. Two of the filenames are older than the images: `04-categories.png` is the foot of the
statistics screen and `05-export.png` is the data section of settings. They are file names, not
screen names, and nothing user-facing repeats them.

- **Alt, `01-home.png` and `01-home-dark.png`:** `The Pocket Manager home screen, showing September's balance with the month's income and spending under it, above the day's transactions.`
- **Alt, `02-calendar.png` and `02-calendar-dark.png`:** `The Pocket Manager calendar screen, with 3 September picked out on the month grid and that day's three records below it, beside the day's balance and the month's.`
- **Alt, `04-categories.png` and `04-categories-dark.png`:** `The Pocket Manager statistics screen, showing seven days of spending as a bar chart and, further down the same screen, each category's share of it as a percentage.`
- **Alt, `05-export.png` and `05-export-dark.png`:** `The Pocket Manager settings screen, scrolled to the rows that export the data, import it and share it as a CSV file, each of the three tagged Beta.`

Three things this section used to get wrong, all of them settled by the images. There is no
categories list on a screen of its own: it is the last card on the statistics screen, which is why
the third line describes one screen and not two. That card prints percentages, not rupee totals,
so the line says percentage. And export has no screen of its own: it is a row in settings, and the
app tags it and its two neighbours Beta on screen, so the alt says so rather than cropping it out.
The statistics range on that capture is seven days while the home and calendar screens are monthly,
which the third line states rather than smoothing over.

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
no address, ships no field, and posts to no endpoint. Item 69 closed the same question for the
whole site, email only and no form anywhere, so nothing reopens this one either.

What ships instead is images. Item 10 cleared five screenshots and the store icon from
`assets/brand/store/`, copied to `docs/assets/wedding-planner/`. The feature graphic is excluded,
because it carries the placeholder wordmark and no asset on this site prints that name. Of the
five, one is cleared to publish, two are waiting, and two never publish at all.

- **Alt, `01-planning-board-functions.png`:** `The planning board, with a card for each function of the wedding, each carrying its own date and its own colour.`

That is the only line settled. It describes the screen and stops there: the card for each function
is §5.2's whole argument and §5.3's first board item, and the alt claims nothing the image does not
show, so it does not say guest list or headcount, which this capture does not print.

`03-money-who-paid-what.png` and `04-money-payment-schedule.png` are the two money screens. Both
sit inside §5.3's money item, and neither is written until item 73 answers, because an alt line
that describes an image the page may not use is a line written twice.

- **Alt, `03-money-who-paid-what.png`:** `[CONFIRM: item 73]`
- **Alt, `04-money-payment-schedule.png`:** `[CONFIRM: item 73]`

`02-planning-board-compare.png` and `05-compare-view-hindi.png` do not ship, in any round. Both
show a board of shortlisted options with quoted prices, which is outside the §5.3 list, and this
page does not print an image of a feature it will not describe. No alt line is written for either,
because copy that is never used still has to be read by somebody. The Hindi interface §5.3 names
is real, but the only capture of it is one of these two, so this page ships no Hindi screenshot.

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

The cross-check item 61 made possible has been run. `FACTS.md` section (g) reads this page line by
line against `docs/sahib-singh-resume.pdf`, and round 4's rulings are applied below: the Cleartrip
title is the resume's own, the Udacity entry is the resume's own, an iOS Nanodegree is added, and
the Motive, smallcase and Cleartrip cards each print the work the resume attributes to him. Item 72
settled the stacks. The month-level differences section (g) found change
nothing here, because this page prints years and never months. The resume predates his Keenai role
and says nothing about it, so card 1 rests where it always did, on items 25 and 37.

### 6.1 Intro

**Spine: breadth. Finance is the texture.** In one line, the case for the reverse: finance is the
better story, because four employers in a row in money is a pattern nobody chooses by accident,
but it argues for hiring a fintech contractor rather than this studio, and breadth is the thread
that makes the studio's delivery model credible.

- **Headline:** `Sahib Singh`
- **Role line:** `AVP, Mobile. Native iOS, native Android, KMP and Flutter, with production work shipped in all four.`
- **Body:** `Seven years, four companies, and no single platform to narrow him to. At Keenai Global he's a Builder: features end to end, backend through testing, with AI, in wealth-tech for Indian HNIs, UHNIs and family offices. That matters here more than anything else on this page. The delivery model this studio sells isn't a theory he's trying out on clients. It's how he already works every day, in a regulated domain with real money and real auditors attached.`
- **Map section line**, the display-section heading above the coverage map, sitting above the lead-in (DESIGN.md §F.7, §F.8, ≤ 5 words): `What he ships and where` **(5 words)**
- **Map lead-in**, the one line above the coverage map, under the section line (DESIGN.md §F.7, ≤ 14 words): `Five surfaces, five places. A filled cell means a product we can name.`
- **Texture line, placed after the work cards:** `One more thing worth noticing about the list above: travel bookings, then investing, then wealth, with fleet telematics the one exception. Three of the four put him next to other people's money, which is not a place anyone lands by accident.`

Note on the lead-in. It is 13 words and names the axes, not a claim: five surfaces against five
places, and a filled cell is one with a product behind it.

Note on the section line, which closes the copy gap `docs/reviews/runB-design-review.md` S6
recorded. The heading and the lead-in under it do different jobs and must not say the same thing
twice: the heading is the plain-English subject of the thing below it, and the lead-in is the
precise one, with the numbers and the rule for reading a cell. So the heading names the two axes in
words a stranger has already, what he ships and where he shipped it, and leaves *five*, *surfaces*
and *filled cell* to the line beneath it. It is the design's drafted `Where he has shipped` with the
other axis added, because a map with columns is not only about where.

Item 72 is the owner's own clarification of item 45 and it settles both open columns, which is the
case DESIGN.md §F.1 designed for and the better of the two outcomes it planned around. At smallcase
the Tickertape work was native Android and native iOS first, then the move to a Flutter codebase.
At Motive it is native Android, native iOS and KMP. Every column on the map now has a product
behind it, so the honest line drafted for the outlined state comes out of the page entirely: it
existed to name a gap, and there is no gap. Nothing else on the page changed with it.

### 6.2 Work cards

- **Cards section line**, the display-section heading above the work-card list (DESIGN.md §F.7,
  §F.8, ≤ 5 words): `The roles behind the map` **(5 words)**

The second half of S6. DESIGN.md §F.6 gives this section its job in one sentence: the map makes the
claim and the cards are the receipts, and each attributed cell is the same company as a card below
it. The heading says that and nothing else, so a reader arriving at a list of five companies knows
it is the same five they have just read across the top of the map rather than a second, unrelated
history. The design's drafted `Seven years, four companies` is not used: §6.1's body opens with that
exact clause, four is the count of employers where the list below runs to five cards, and a count is
not what the section is for. Sentence case, no marker, nothing here that the map does not already
print.

Content per role, in the §7 table. Every *confirm* row in that table has now been read against the
resume, in `FACTS.md` section (g), and cards 2, 3 and 4 carry the result. Card hierarchy per §6.1:
company largest, then what they do, then the years in the price position, then the small print. The
"Products and stack" line is that small print, which is why the added work is stated once and not
explained.

The attribution phrase is rationed to one use on this page, and round 9 put it on the smallcase
card, which carries the strongest personal claim: leading the team of seven. Repeating it on three
cards in a row read as a disclaimer rather than as care, and it spent its own credibility. The
Cleartrip download figure is a public store fact and takes no attribution. Each of the three lines
is 35 words or fewer, because a card's small print that runs past a reader's patience is small
print nobody reads.

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
- **Products and stack:** `Motive Fleet App, fleet-manager side: GPS, hours of service, vehicle health, dashcam review. Native Android, native iOS, KMP. He built the Driver and Fleet design-components library, migrated View-based screens to Compose, and worked on KMP.`

`FACTS.md` g8 supplied the three added facts, including that the design-components library spans
both the Driver and the Fleet apps rather than Fleet alone, which is what this card used to imply.
The sentence pointing at the map's columns is gone with it: every column has a product now, so a
card does not have to tell a reader which cell it fills.

**Card 3: smallcase**

- **Company:** `smallcase`
- **What they do:** `Investing platform, India. Curated portfolios of stocks and ETFs.`
- **Years:** `2020 – 2023`
- **Role:** `SDE 1 to SDE 2 to Senior Software Engineer`
- **Products and stack:** `Tickertape. Native Android and native iOS first, then Flutter. By his own account he led the team of seven that launched the Flutter iOS app, migrated Android to Flutter, and set up the Flutter architecture.`

Item 24 named the surface: Tickertape, not the smallcase app and not gateway. Item 72 gave the
order the work happened in, and the resume's Tickertape lines, recorded at `FACTS.md` g7, describe
the Flutter phase that followed rather than a different account of the same one.

**Card 4: Cleartrip**

- **Company:** `Cleartrip`
- **What they do:** `Travel booking, India. Flights, hotels, trains.`
- **Years:** `2019 – 2020`
- **Role:** `Android Intern`
- **Products and stack:** `The Cleartrip Android app, over 10 million downloads. He worked on the hotel-booking feature.`

The role is the resume's own wording, per `FACTS.md` section (g), and it matches the register of
Tanya's Naskay card in §7.2 rather than describing the same thing two ways on two pages.

**Card 5: TheGeekDogs**

- **Company:** `TheGeekDogs`
- **What they do:** `This studio.`
- **Years:** `2020 – now`
- **Role:** no role line on this card. The §7 table leaves it blank and inventing one would be an
  invented fact.
- **Products and stack:** `Pocket Manager. 4.3 stars, 1,000+ installs, still shipping.`

### 6.3 Teaching and writing

- **Heading:** `He writes it down`
- **Body:** `Sahib writes Android posts regularly and they land: channelFlow versus callbackFlow, Android 16 dropping orientation locks and the duplicate-fragment bug it caused, ViewModel versus onSaveInstanceState versus SavedStateHandle, and why coroutine cancellation is cooperative. The Android 16 post drew 283 reactions and 13 reposts on LinkedIn. Before any of that he founded PyHour at Chitkara, a student initiative running free Python classes for juniors.`
- **Link targets.** Each of the four post subjects in the body is the link text for one post, in the
  order the body names them. Four subjects, four links, or none of them link.

| Link text, exactly as it prints in the body | Destination |
|---|---|
| `channelFlow versus callbackFlow` | `https://www.linkedin.com/feed/update/urn:li:activity:7430310577153011712/` |
| `Android 16 dropping orientation locks and the duplicate-fragment bug it caused` | `https://www.linkedin.com/feed/update/urn:li:activity:7421603431334932481/` |
| `ViewModel versus onSaveInstanceState versus SavedStateHandle` | `https://www.linkedin.com/feed/update/urn:li:activity:7420752263364796416/` |
| `why coroutine cancellation is cooperative` | `https://www.linkedin.com/feed/update/urn:li:activity:7419068733480022016/` |

Each of the four is an outbound link and takes `Opens a new tab.` on its accessible name, per §10.5.

- **Closing line:** `Someone who can explain a thing clearly to strangers is usually the person who can explain it to a reviewer.`

Item 62 resolved the mapping and item 38's fourth URL. The Orchestrator opened all four in a
logged-in Chrome session and wrote the notes to `docs/scratch/references.md`; `FACTS.md` rows 40 to
42b carry them, and row 42b is the fourth post, on coroutine cancellation, which the brief never
named. It is added to the list because it is his, it is real, and a list of three that leaves a
supplied URL unaccounted for is a list with a loose end in it.

The reaction figure prints plainly now. `FACTS.md` rows 40 to 42 were upgraded to CONFIRMED on that
same logged-in read: 283 reactions and 13 reposts is the Android 16 post's own count, read off the
post page rather than reported to us, so the attribution hedge it carried through round 7 comes
out. One caveat the Fact Checker states and this page honours by omission: the counts are
point-in-time and will drift upward, which is why no other post's figures print at all.

### 6.4 Background

- **Heading:** `Background`
- Items:
  - `BE, Chitkara University, 2016 to 2020.`
  - `Google Associate Android Developer certification, 2019.`
  - `Udacity Android Nanodegree.`
  - `Udacity iOS Nanodegree.`
  - `Google and Udacity Challenge Scholarship, phases 1 and 2. Top 1,000 of 10,000.`
  - `Recommendations from a mobile lead at smallcase and from a Google Developer Expert.`

Two lines changed here on `FACTS.md` section (g). The Udacity credential is the resume's own name
for it, "Android Nanodegree", which round 4 ruled true under either programme, where "Android
Basics Nanodegree" names a different and shorter one. The iOS Nanodegree is new to this page and is
on the resume; it is a training credential and the list is where training credentials go, not
evidence of production work, which the cards in §6.2 carry on their own. The resume's data-science
certification is not added: round 4 ruled it off-thesis for a mobile studio, and a background list
that reaches for every credential a person holds argues less than one that reaches for the
relevant ones.

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
- **Body, long form (cut per DESIGN.md §J round 12; not printed):** `Underneath that is the shape she works on: a shared core, native code at the edges, and the developer practices that keep the two from drifting apart.`
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
the Naskay-to-HSBC boundary, which is August 2021 on both sides rather than a July handover. The
months settle which card a boundary belongs to; they are not printed. Every `Years` field on this
page and on `/sahib/` prints years only, because DESIGN.md §D.5 puts the years in the price position
and a month makes that line longer without making it more useful to a reader scanning duration.

**Card 1: Motive**

- **Company:** `Motive`
- **What they do:** `Fleet management, US.`
- **Years:** `2024 – now`
- **Role:** `Software Engineer 2`
- **Products and stack:** `Motive Fleet App. Kotlin, Coroutines, Compose, and KMP business-logic modules under Clean Architecture. Bluetooth device-verification flows, CI/CD and workflow automation.`
- **Ownership line:** `She owns app releases there: phased rollouts, crash and ANR monitoring, and the fixes that follow.`
- **Her own account, attributed:** `By her account, a 99.8% crash-free rate held and about 20% off startup time, from cold-start and dependency work.`
- **Android-edge annotation (Motive)**, the small print on the Android edge's Motive card (DESIGN.md
  §G.3a, item T1, ≤ 20 words): `Jetpack Compose migration, and the Android releases she owns: phased rollouts, crash and ANR monitoring.`

Fifteen words. This is the third printing of the name Motive in the band and the only one that is
Android-only, which is what makes "one company, three layers" legible: Compose is an Android
toolkit, and the release path she owns is a Play Store path, so neither can sit in the shared core.
The KMP business-logic modules and Clean Architecture stay in the core card's stack line above, and
the Fleet App stays on the iOS edge. `FACTS.md` row 51 is the source for both halves of the line and
marks them OWNER-PROVIDED, so the line stays descriptive of her work and claims nothing about
Motive's engineering at large. The two figures do not repeat here: §7.2 attributes them once, on the
core card, and once per page is the rule.

The two figures print only in that attributed form. `FACTS.md` row 52 clears them for publication
and is explicit about why the attribution is not optional: Motive does not publish the numbers, so
nobody outside the company can check them, and a studio arguing for review gates does not print an
uncheckable statistic as if it had checked it.

**Card 2: HSBC**

- **Company:** `HSBC`
- **What they do:** `Global bank.`
- **Years:** `2021 – 2023`
- **Role:** `Software Engineer`
- **Products and stack:** `Mobile banking. Migration to MVVM, UI performance work, and diagnosis of production issues.`

No product name on this card. Her resume names one; item 27 says not to print it, and the owners'
answer wins over the document.

**Card 3: Naskay Technologies**

- **Company:** `Naskay Technologies`
- **What they do:** `Mobile and product studio, Noida. Around 20 people, client work.`
- **Years:** `2020 – 2021`
- **Role:** `Android Intern`
- **Products and stack:** `Kotlin, Glide, Retrofit. A UI rebuild, APK size cut through code and resource work, and refactoring.`
- **Project line:** `The Jillian Michaels fitness app, built at Naskay for a US client.`

Item 63 chose the name over the generic description, and items 28 and 47 cleared it: the resume
names the project and the owners confirmed it can be printed. It prints as the resume gives it,
descriptively and in sentence case, with no trademark symbol and no ownership claim. The card says
where she worked and what she worked on; it does not say the brand is a client of this studio, and
the footer's employer note in §1 covers the rest.

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
aren't wired up does not ship a field that goes nowhere. `QUESTIONS.md` item 69 asked the owners
directly and they answered email only, no form, so this is a settled decision rather than a
pending one and no later round reopens it. The form heading, its four
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

The persistent contact plate also renders here, and it is site chrome specified by DESIGN.md §B.10
for every page rather than this page's link, so the page's own content stays a headline and one link
home.

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
string as the gate's own heading in §2.6, or, for ship approval and design review, the line
under the four. Six strings on the floor, used everywhere they appear, and the pronouns are the
ones items 20 and 21 gave: he and him for Sahib, she and her for Tanya.

The card slot never empties, so there is no close control: a station's card is replaced only by another station's card.

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

## 11. `/work/wedding-planner/privacy/`

**Read before editing this route.** It is the only page on this site that a machine reads before a
person does: Google Play will not take a submission without a public privacy policy URL, and this
is that URL. Two rules follow from that and neither is stylistic.

**Every sentence describes the build that exists today.** Not the next build, not the one being
submitted if it differs, not a control whose copy is written but whose button is not mounted. Each
claim below was checked against the app's own source before it was written: the fields the app
reads off a signed-in account, what the sync codecs actually carry, what the crash reporter strips,
how many analytics events there are, and which settings rows are reachable. Three things the app
has code for but does not ship — Apple sign-in, sharing a wedding with another person, and in-app
deletion — are described nowhere on this page, in any tense.

**It does not name the product.** §5's rule holds here: the page calls it `Wedding planner`, the
entry's own `descriptiveName`, and the route carries the slug. The owner has settled a name for the
store listing; that is a decision about the listing, and QUESTIONS.md item 78 asks whether it is
also a decision about this site. Until it is answered, `qa:no-slop` blocks the word from `dist/`
and this page has no reason to be the first route to carry it.

The strings live in `privacyPolicy` on `src/data/products/wedding-planner.json`, one paragraph per
array entry, and the schema in `src/content.config.ts` refuses an empty one. Two things are
deliberately *not* strings there: the studio address, which is `STUDIO_EMAIL` so a policy cannot
print an inbox the rest of the site does not, and the product's name, which is `descriptiveName`
for the reason above.

### 11.1 Head

- **Eyebrow:** the entry's `descriptiveName`.
- **Headline:** `Privacy policy`. The one h1 on this site that is a label rather than a statement,
  and deliberately: a store reviewer scanning for the policy needs to find the words they are
  looking for at the top of the page, and a better line here would cost more than it bought.
- **Date line:** `Last updated <date>`, from `privacyPolicy.updated`. The only date on the page and
  the only version marker on it.
- **Intro:** two paragraphs. The first says what the document is and that it describes the app as
  built. The second is the whole policy in five sentences, for the reader who stops there.

### 11.2 The eleven sections

In order, and the order is the argument: what never leaves the phone, then the two things that can
make it leave, then the three permissions, then what is measured, then what is refused, then how to
get rid of it.

`What is on your phone` · `Signing in, which you do not have to do` · `Cloud backup` ·
`Your contacts` · `The camera, your photos and your calendar` · `Crash reports` ·
`What the app measures` · `What the app does not do` · `Deleting your data` · `Children` ·
`When this page changes`

Four sentences on this page are load-bearing and none of them may be softened by a later round:

- **Photos never sync.** Not "unless you turn on backup" — they are excluded from the cloud copy
  outright, and the section says so twice because a reader who skims the backup section is the one
  most likely to assume otherwise.
- **The account record holds an email address; the app's data does not.** Both halves ship. Firebase
  Authentication writes the Google account's email, name and picture into its own record and the app
  reads a stable identifier and a provider out of it. Stating only the second half would understate
  what is collected, which is the direction a privacy policy may never err in.
- **Contacts are read for a name, and guest rows sync.** Those are two different sentences about two
  different things and collapsing them is the easiest mistake on this page.
- **There is one analytics event, named.** Not "minimal analytics", not "a few events". One, and the
  page prints its name.

### 11.3 Deletion, and the sentence that has to stay true

The app has no in-app control that deletes cloud data. The section says that plainly and gives the
studio address instead. It may not describe a button before the button exists, and on the day one
ships it may not keep describing an email route. QUESTIONS.md item 80 puts both halves to the
owners, along with whether `STUDIO_EMAIL` is the right inbox to receive deletion requests.

### 11.4 Contact and meta

- **Contact heading:** `Who to write to`
- **Address:** `STUDIO_EMAIL`, rendered as a `link-row`. No second address: `/contact/`'s three-way
  split is about routing a project enquiry to the right person, and a deletion request has one
  destination.
- **Back link:** `Back to the wedding planner`, built from `descriptiveName`.
- **Meta title:** `Privacy policy, a wedding planner | TheGeekDogs`
- **Meta description:** `What our wedding planner app stores, where it stores it, and what leaves your phone. It needs no account, it works offline, and cloud backup does nothing until you sign in.`
- **OG:** none written, so none renders. `/404` sets that precedent. A share card for a privacy
  policy is a thing nobody needs.

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

Rebuilt again in round 11, on the same rule round 4 set: a marker survives only if it names an open
item in QUESTIONS.md, or a fact that no round can ever verify and only the owners can supply.
Numbering follows the surviving markers in document order, so the old C-numbers do not carry across
rounds. Round 8 closed four of round 7's six. Round 11 closed round 8's first one: the Pocket
Manager captures exist, item 60 recorded what is on each of them, and §4.7's four alt lines are
written against the images rather than against a plan for them, so §4.7 carries no marker now.

What is left is one marker on an image nobody has made yet and two on images nobody has cleared
yet. All three are alt text, which is the only kind of copy that cannot be settled by a copy round:
it describes a specific picture, and either the picture or the permission to use it is missing.

### CONFIRM. Fact Checker owns these. An unverifiable claim gets cut, not softened.

| # | Where | What needs confirming | Traces to |
|---|---|---|---|
| C1 | §5.5 | The alt lines for the two wedding-planner money screenshots, `03-money-who-paid-what.png` and `04-money-payment-schedule.png`. The images exist and are described in `docs/assets/wedding-planner/README.md`; what is open is whether the page uses them. Item 73 asks. Two markers, one question: the pair is answered together or not at all. | Item 73, open |
| C2 | §10.1 | Both headshot alt lines, once the owners supply the portraits item 23 chose. Only they can produce the images, each approves their own, and the alt has to describe what actually ships. | Item 23, images pending |

### FILL. Only the owners can answer these.

None. Every `[FILL]` in this document at the end of round 3 has an answer.

For the record, and so a later round does not reopen a closed decision as though it were a gap:
F1 is answered by item 3, the resume and human gate 3 (Bengaluru, IST, one city); F2 by items 17
and 18 (no personal data beyond GitHub and LinkedIn); F3 by items 4 to 8; F4, F5 and F6 by item 9,
which chose the full name-agnostic page, so a missing product name and a missing store link are the
shipping state of that page rather than a hole in it; F7 and F13 by item 69, which answered email
only and no form, on this site and on the wedding planner page alike; F8 by
item 44 and the codebase audit in `FACTS.md` section (d); F9 by item 16 and item 60, whose captures
closed the last of it; F10, F11 and F12 by items 1, 2, 3 and 53.

**Totals: 2 distinct `[CONFIRM]` questions and 0 `[FILL]`. 2 open items, down from 6, from 8 and
from 33.**

A grep of this document finds 3 `[CONFIRM:` and 0 `[FILL:` markers, once the two legend lines in
"How to read this document" and the quoted strings in this appendix's own heading, totals line and
count paragraph are excluded. Three markers, two questions: C1 stands twice, once on each of the
two money screenshots item 73 rules on together, and it is the only marker in this document that
appears more than once. C2 appears once.

Round 11 resolved one marker and added one question's worth of them. The Pocket Manager captures
landed, so §4.7's alt lines are written and its marker is gone; the wedding-planner captures landed
too, but two of the five are outside §5.3 and never ship, one is cleared and written, and the last
two wait on item 73. Neither survivor can be resolved by a copy round: C1 unblocks when item 73 is
answered, C2 when the owners supply their portraits.

Neither survivor may reach production unresolved.
