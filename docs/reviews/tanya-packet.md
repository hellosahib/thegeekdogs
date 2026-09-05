# Presentation packet — Tanya's page

Prepared by the Design Lead, per `DESIGN.md` §K, against the finished build (commit `6283b4a`).
All six frames are rendered from that build and live in `docs/reviews/final/`.

**Read this first if you have not seen the project.** TheGeekDogs is a two-person mobile studio —
Sahib and Tanya. The website's argument is one sentence: *agents write a lot of the code, and a
person still signs off*. Each of the two founders gets a page of their own. Tanya's page had to do
two things at once: say what she does, and connect to that argument without repeating the home page.

**What her page is.** Her subject is Kotlin Multiplatform — one shared core of business logic, with
native Android and native iOS code at the edges. So the page is laid out as that architecture. There
is one wide, tinted centre column: the **shared core**, holding the work that is common to both
platforms. On either side of it is a narrower, indented column: the **Android edge** on the left and
the **iOS edge** on the right, holding the work that only exists on one platform. Motive — where she
works — appears in all three columns, because the same job genuinely landed on all three layers: the
shared KMP modules in the core, the Jetpack Compose migration on Android, the Fleet App on iOS. Two
short amber-free strokes ("ticks") leave the core and stop at its own edge, on the same line as the
three column names, to show the edges attaching to it.

The point is that a visitor learns the shape of KMP by reading a page built in it. Nothing on the
page claims that in words; the layout does it.

**One thing to know before you look.** She is being asked about the **structure**, not about the
facts. The two numbers on the page (99.8% crash-free, ~20% faster startup) came from her own résumé
and were cleared for publication in that attributed form; they are not hers to re-approve here.

---

## The six frames, in this order

| # | File in `docs/reviews/final/` | What to look at |
|---|---|---|
| 1 | `tanya-band-1440-light.png` | The page's argument in one frame, on a laptop. Three columns; the core tinted and continuous; a thin amber cap along its top edge — the only colour on the page; Motive first in all three columns; the two ticks leaving the core at its own left and right edges. |
| 2 | `tanya-band-1440-dark.png` | The same thing in dark mode. Shown second so the structure is read before the colour scheme. Hers is the stricter-looking of the two founder pages in dark, and that is deliberate. |
| 3 | `tanya-band-1024-light.png` | A narrower laptop. This frame used to be the weak one — the centre column had been squeezed to a 31-character strip and the iOS column ran 1,700 pixels with three words in it. Both are fixed: the core now sets at about 47 characters a line, and every column stops where its own content stops. |
| 4 | `tanya-band-360-light.png` | A phone. The hardest thing on the page: three columns cannot survive at this width, so the structure survives as **depth instead of position** — the core stays a full-width tinted field, and the two edges sit below it, indented, each behind a thin rule with its platform name above it. The two ticks rotate to meet those names. The reader still learns which work is shared, which is platform-specific, and that one company is all three. |
| 5 | `tanya-quotes-1440-light.png` | How Sahib's recommendation of her is quoted on her page — inside quotation marks, set as speech rather than as decoration, attributed underneath. The words are his about her; she should see the setting. |
| 6 | `print-tanya-p1.png` | Page one of what her page prints as — the document someone attaches to an email. One column, light on white whatever theme the screen was in, her own address at the top, no sticky email button. |

**One defect to name out loud before she comments, so she is not asked to sign off on something we
already know about.** On frames 1 and 3, at certain scroll positions the amber email button in the
bottom-right corner can sit over the word **iOS** — the right-hand column's name. It is on the fix
list (item N4 in `docs/reviews/final-design-review.md`). It affects a label, not the structure.

---

## Three passages to read

Give her these three sections of `DESIGN.md`, in this order. They are short.

1. **§G.3 — Direction T1, "the shared core".** This is the page she is looking at, described before
   it was built: which content belongs in which column and why, the practice-by-layer table, and the
   full-width and phone wireframes. Read it alongside frames 1 and 4.
2. **§G.4 — Direction T2, "the pipeline she owns".** **This is the page she is *not* getting**, and
   it is a real, buildable alternative, not a discarded sketch. Instead of an architecture diagram,
   her page would be a **flow diagram of the build pipeline she owns** — spec → build → review → QA
   → security → release — drawn as six connected boxes, where clicking a box opens what she does at
   that point, which tool decision sits behind it, and where she did it. Every one of the six boxes
   has a real practice and a real company behind it, so nothing would need inventing. Read the
   practice table, the wide wireframe and the phone version. She cannot disagree with the decision
   without seeing this.
3. **§G.5 — the decision, and what would reverse it.** Why T1 was chosen over T2, stated as four
   arguments. The short version: the site's **home page** is already a pipeline diagram — a studio
   floor with ten desks you can open one at a time — so T2 would make her page the site's *second*
   pipeline diagram, arguing the same thing in a different projection. T1 does something the home
   page does not. §G.5 also names the one fact that would flip the decision: if the home page's floor
   were ever cut back to five desks, T2 becomes the stronger page. Read its round-12 block too — it
   is the honest record of the design holding up on paper and the first build not holding up on
   screen, and of what was fixed.

---

## The one question

Everything above is context for a single question, and it is the one no screenshot answers:

> **"Does the strictness read as rigour, or as austerity?"**

Ask it **after frame 4 and before frames 5 and 6**, so she answers on the structure rather than on
the quotes.

**Why this is the question.** Her page is deliberately the most colour-free surface on the whole
site: greys, one thin amber cap on the core, and nothing else. That choice was made *about* her
rather than *with* her — to avoid the obvious trap of making the woman's page softer, rounder or
paler than the man's — and it is the one judgement in the design that cannot be settled by
measurement, by a contrast ratio or by a rendered frame. Only she can say whether it reads as rigour
or as coldness.

**Two things not to ask.** Do not open with "do you prefer T1 or T2?" — that decision has been taken
on stated grounds and asking it cold invites a polite yes. Ask the question above, and let T2 be the
thing she reaches for if the answer is "austerity". And do not ask her to approve the two résumé
numbers; that is settled.

**If the answer is "austerity",** the fix is not to add a colour to her page — that is the trap
arriving by the back door. It is to give the one colour already on the page a second placement: the
two ticks out of the core, which are the page's structural claim and the one mark that would carry
colour without softening anything.

---

## If the answer is "no"

Swapping her page from T1 to T2 replaces one layout module and one small token file — the rest of her
page, and every part of the site she shares with Sahib, is untouched: same typefaces, same cards,
same navigation, same colours, same print behaviour, same home page. It is a change to her page's
middle section and to the words in it, not a redesign, so a "no" here costs a build round rather
than a rebuild.
