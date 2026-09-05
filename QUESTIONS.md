# QUESTIONS.md

Answered by the owners 2026-09-05 (items 1 to 55). Open items are marked. New items go at the end.

Every gap and decision that needs a human. Answer inline under each item; one line is enough. Items marked **gate** block a human gate in `docs/brief.md` §14. Nothing here gets a plausible guess in the meantime.

Already decided, not re-opened: employer names are used; outside work is permitted; Tanya's direction is signed off after her page is built; the Data Safety fix ships in the next Pocket Manager build.

## A. Studio and engagement (brief §5.1) · gate 2, gate 3

1. Intake email: is `thegeekdogs@gmail.com` the address that should receive client enquiries, or is there a different one?
   Answer: Yes, thegeekdogs@gmail.com.
2. Phone or WhatsApp number on the site? If yes, which, and which of you answers it?
   Answer: None.
3. Timezone to state (IST assumed unless told otherwise)?
   Answer: IST.
4. Capacity: do you take client work alongside your day jobs, and how many concurrent projects? The CTA wording depends on this. "One project at a time" is a strong line if it is true.
   Answer: One project at a time.
5. Engagement model: fixed-scope projects, retainers, or both?
   Answer: Both.
6. Typical time from kickoff to the first build a client can open on their phone?
   Answer: A few days to a first MVP.
7. Any starting price or "starts at" figure you are willing to print? "No" is a fine answer.
   Answer: No.
8. What does a first conversation look like (call, async, a short written brief)?
   Answer: A short written brief.
## B. The second product (brief §5.3) · gate 2

9. Does the wedding planner appear on the site at all before its name is settled? Options: (a) full `/work/wedding-planner/` page, name-agnostic; (b) one line in the proof section only; (c) off entirely, Pocket Manager alone.
   Answer: (a) Full name-agnostic page.
10. If it appears: may we use the five real-device screenshots and the store icon from `assets/brand/store/`? The feature graphic carries the placeholder wordmark, so it is excluded unless you say otherwise.
    Answer: Yes.
11. Email capture for it: yes or no? If yes, which service (Formspree, Tally, Google Form)?
    Answer: No.
12. May the site say publicly that a headline feature was cut from this app's own store listing because the button was not wired up yet (brief §7 proof section)?
    Answer: No. Do not say it publicly.
## C. Pocket Manager (brief §5.2) · gate 2

13. Exact first-release date from the Play Console. The site currently says "since 2020" and nothing more precise.
    Answer: 2020.
14. Exact wording of the corrected Data Safety declaration: what is collected, whether it is encrypted in transit, whether deletion is offered. "Resolved" is not enough; each of those licenses a different sentence.
    Answer: Do not mention privacy at all. Flag stays off; no flag-ON copy.
15. When does that build go live on the store? The privacy flag stays off until someone verifies the live listing.
    Answer: Next week (moot given 14).
16. Which store screenshots may the case study use?
    Answer: Derive new screenshots from the latest app version locally.
## D. People (brief §5.4) · gate 2, gate 3

17. Sahib: socials beyond GitHub to link (X, blog, personal email)?
    Answer: No personal data. Resume link later; LinkedIn CTA for now (see 40).
18. Tanya: socials beyond GitHub to link?
    Answer: Same as 17.
19. Which of the four human gates (architecture review, code review, real-device QA, security and privacy review) does each of you own? The floor cards say "checked by" and need a name behind each.
    Answer: Architecture review: Sahib. Code review: Sahib and Tanya. Device QA: Tanya. Security, privacy, ASO: Tanya. Product spec: Tanya. Persona: Tanya is the CEO/marketing/product person, Sahib the CTO person.
20. Sahib: three adjectives you want a stranger to use after seeing your page.
    Answer: (Answered with pronouns) He/him. Adjectives still open, not blocking.
21. Tanya: three adjectives you want a stranger to use after seeing your page.
    Answer: (Answered with pronouns) She/her. Adjectives still open, not blocking.
22. Anything to leave OFF either page: a company, the AVP title, a date range?
    Answer: No.
23. Headshots: which route from brief §5.5? (1) real photos with a shared treatment; (2) an AI headshot tool trained on your own selfies; (4) an illustrated or halftone portrait derived from a real photo. Option 3, fully synthetic, is off the table.
    Answer: Option 2: AI headshot tool trained on own selfies. Images to be supplied.
## E. Work-card rows marked *confirm* (brief §7) · gate 2

24. Sahib at smallcase: which surface, the smallcase app, Tickertape, or gateway?
    Answer: Tickertape.
25. Sahib at Keenai: may Keenai Pulse be listed alongside Keenai Wealth?
    Answer: Yes.
26. Tanya at Motive: Driver app or Fleet app?
    Answer: Fleet App.
27. Tanya at HSBC: which product, if it can be named at all?
    Answer: No product name.
28. Tanya at Naskay: can any client project be named, or is it all under NDA?
    Answer: Yes, can be named (from the resume, docs/tanya-jain-resume.pdf).
## F. Direction · gate 1

Items here are filled once `DESIGN.md` Pass 1 is reviewed. They will ask you to pick a hero variant, a direction per person page, and to confirm the floor composition.

29. Hero variant: A, B or C (brief §7)? The team's recommendation and reasoning are in `DESIGN.md` §B.
    Answer: Blank. Orchestrator proceeds with the recommendation, variant A, pending objection.
30. Sahib's page direction: see `DESIGN.md` §F for the options and the recommendation.
    Answer: Blank. Orchestrator proceeds with S1, the coverage map, pending objection.
31. Tanya's page direction: see `DESIGN.md` §G. Both are documented; Tanya reviews after build per the standing decision.
    Answer: Blank. Orchestrator proceeds with T1, re-checked against the resume and item 19.
32. Floor: seven agent desks or five (Security Auditor and Reviewer stay in either case)?
    Answer: Seven agent desks.
## G. Deployment (brief §13)

33. GitHub repo: org or personal account, and its name? Needed for Actions and Pages.
    Answer: Personal account. Repo name not given; Orchestrator assumes thegeekdogs.com unless told otherwise.
34. Who holds DNS for `thegeekdogs.com` (registrar)? The A/ALIAS and CNAME records are listed in `PLAN.md` §8 for whoever applies them.
    Answer: GoDaddy.
35. Analytics: Cloudflare Web Analytics or Plausible? The Engineer's recommendation (`PLAN.md` §1.8) is Plausible, at **$9/month** for up to 10,000 combined pageviews+events (Plausible's Starter plan, checked against plausible.io's pricing page 2026-09-05) — this is the only option of the two that can meet the brief's requirement to track CTA and mailto-link clicks; Cloudflare Web Analytics is confirmed (via its own FAQ) to support page views and Core Web Vitals only, with no custom-event tracking. Are you willing to pay the $9/month, or should the site ship with Cloudflare Web Analytics and lose click tracking?
    Answer: Firebase Analytics. (Orchestrator note: the brief excluded Google Analytics unless asked; this is the ask. Engineer must keep it inside the JS budget and use consent-mode defaults that avoid a banner.)
## H. Raised by the Fact Checker (`FACTS.md`) · gate 2

36. Pocket Manager rating: the public Play Store listing shows 4.3★ from 24 reviews today, not the 4.6★ in the brief. The site will print the public number. Does the Play Console show something different, and if so for which country?
    Answer: Use 4.3.
37. Keenai Global's Bengaluru office: the company site names only Singapore. May the site say "Singapore and Bengaluru" on Sahib's Keenai card?
    Answer: Yes.
38. Sahib's three Android posts (channelFlow vs callbackFlow; Android 16 orientation locks; ViewModel vs SavedStateHandle) and the "283 reactions, 13 reposts" figure are not publicly findable. Please supply URLs, or the sentence prints without numbers.
    Answer: Four post URLs supplied: linkedin.com/feed/update/urn:li:activity:7430310577153011712/, .../7421603431334932481/, .../7420752263364796416/, .../7419068733480022016/
39. GitHub placement. Fact Checker's read: Sahib's profile supports a plain link on his page (pinned repos are older learning projects, but the languages span the four stacks). Tanya's is sparse, has no KMP repo, and undercuts her page's narrative, so the recommendation is a footer link only. Accept, or place differently?
    Answer: Place GitHub links on both pages.
40. A readable export of both LinkedIn profiles (PDF or screenshots). LinkedIn blocked every fetch, so every §5.4 fact currently rests on owner-provided text.
    Answer: Resume links later. For now a link CTA to LinkedIn on each person page.
41. "Developer of record: Sahib Singh" was cut from the Pocket Manager page because the public listing shows only "TheGeekDogs". Any objection?
    Answer: No objection.
42. The floor cards use six "checked by" labels (architecture review, design review, human code review, QA pass, security review, release gate) but the site names four human gates. Copy will map design review onto architecture review and release gate onto the empty chair's ship approval unless you want a different mapping.
    Answer: Fine.
43. Contact success state proposes "usually within a couple of days" as a reply-time promise. Agree a number, or it drops out.
    Answer: A couple of days.
44. Pocket Manager case study, Build section: what it is built in and one early decision that still pays off. The brief has the store listing and nothing about the codebase.
    Answer: No written notes; derive from the codebase at the local Pocket Manager Android Studio project.
## I. Raised by the Design Lead (`DESIGN.md` §I) · gate 1

45. Sahib's native iOS and KMP work: which employer or product carries each? The brief asserts all four stacks, but the work-card table attributes only Android, Flutter and the end-to-end AI work. `DESIGN.md` §F.1 builds his page around a coverage map, and these two columns are currently empty. (His GitHub shows Swift repos and a KMP-protobuf repo per `FACTS.md`, so something may be nameable.)
    Answer: Native iOS: Motive and smallcase. KMP: Motive.
46. Tanya's iOS work: anything nameable for the iOS edge column of her page (`DESIGN.md` §G.3), or does that column carry structure with no card in it?
    Answer: Fleet App at Motive.
47. Tanya: three to six specific practices, tools or workflow changes you introduced, and where. Without these the alternative direction T2 (`DESIGN.md` §G.4) cannot be built; with them it becomes an option at her post-build review.
    Answer: Resume attached at docs/tanya-jain-resume.pdf.
48. Does a TheGeekDogs wordmark or logo exist that the site may use? If not, the header sets the name in the display face and that is a deliberate choice.
    Answer: Display name only, no logo.
49. Dark mode: lock each world to one appearance (recommended) or also ship a dark scheme? Three worlds times two schemes is six palettes to keep at AA.
    Answer: Lock each world to one scheme.
50. Home page work-card strip: omit (recommended; the floor already spent the boldness) or include?
    Answer: Include.
51. The visible floor shows five agent desks (Spec Writer, Programmer, Test Engineer, Security Auditor, Reviewer); Designer and Release Watcher appear in the text roster below it. Is leaving Designer off the visible floor acceptable, given neither founder is a designer? Swapping Designer in for Spec Writer is the alternative.
    Answer: Add Designer and Release Watcher to the visible floor (seven agent desks).
52. Each human desk on the floor may carry one personal object (`DESIGN.md` §C.4). Name one each, or both desks ship with a second monitor.
    Answer: Human desks become cabins with persona-specific items, plus paintings or a whiteboard in each cabin.
53. Persistent contact plate: print the plain email address (design's preference; more credible, but scrapeable) or a label such as "Start a project" over a mailto link (copy's current draft)?
    Answer: Print the addresses: sahiboffc@gmail.com (Sahib), jaintanya999@gmail.com (Tanya). Studio stays thegeekdogs@gmail.com.
54. Person pages in print: omit the studio floor entirely (recommended) or print the roster as a text list?
    Answer: Omit the floor in print.
55. Two of the five design references were unreachable (the Dribbble shot, and both Wall of Portfolios entries resolved to directory pages). If you can supply the Dribbble image and the two designers' actual portfolio URLs, the reference study is redone; otherwise the direction stands on the two that resolved.
    Answer: Orchestrator checked them in Chrome; notes in docs/scratch/references.md.

## J. Raised by the answers · 2026-09-05

56. Ship approval, the empty chair: who cuts the release, Sahib or Tanya or both? Item 19 named every gate except this one.
    Answer:
57. Firebase Analytics needs the web app config (apiKey, projectId, appId, measurementId) from the Firebase console. Paste them here or add them to `.env` locally; the build runs without them and the analytics script is omitted until they exist.
    Answer:
58. GitHub repo name under your personal account. Orchestrator assumes `thegeekdogs.com`. Confirm, and say when to create the remote and push; nothing is pushed until you do.
    Answer:
59. Three adjectives each (items 20 and 21 were answered with pronouns). Not blocking.
    Answer:
60. Pocket Manager screenshots (item 16): who captures them from the local build, and on which device or emulator size? The case study needs at least the calendar and statistics screens.
    Answer:
