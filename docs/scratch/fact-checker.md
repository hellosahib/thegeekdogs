# Fact Checker scratch log

Session: 2026-09-05

## URLs tried and outcomes

(appending as I go)

## Pocket Manager Play Store — https://play.google.com/store/apps/details?id=com.thegeekdogs.pocketguard2
Fetched via browser tool (WebFetch truncated the page, browser get_page_text worked).

- Title: "Pocket Manager|Finance Manager", developer shown as "TheGeekDogs" (link -> /store/apps/developer?id=TheGeekDogs). No personal name "Sahib Singh" visible anywhere on public listing or developer page.
- Rating: 4.3 stars (star icon), 24 reviews. NOT 4.6 as brief/§5.2/§7/§12 state. Confirmed via zoomed screenshot of header.
- Downloads: "1K+"
- Updated on: Aug 29, 2025 -- matches brief.
- Content rating: "Rated for 3+" -- matches brief.
- Data safety (from /store/apps/datasafety?id=com.thegeekdogs.pocketguard2), verbatim:
  "Data shared: App info and performance (Crash logs and Other app performance data); App activity (App interactions)"
  "Data collected: App info and performance (Crash logs, Diagnostics, and Other app performance data); Location (Approximate location); App activity (App interactions and Other actions); Financial info (Other financial info)"
  "Security practices: Data isn't encrypted -- Your data isn't transferred over a secure connection. Data can't be deleted -- The developer doesn't provide a way for you to request that your data be deleted."
  This CONFIRMS the brief's description of the CURRENT (old/unfixed) declaration is accurate as of today 2026-09-05. The corrected declaration has NOT shipped yet -- content flag must stay OFF.
- No "released on" / first-release date visible anywhere on the modern Play Store UI (checked details page and developer page).
- Oldest review visible in default (non-paginated, "most relevant") view: Cody Watts, March 24, 2021: "Convenient way to keep track of my finances, it's so easy and it has everything nicely organized for me". Could not page through all 24 reviews to find an earlier one (Play Store review widget doesn't expose full chronological list without additional interaction not accessible via this tooling); early-2021 claim is consistent with what's visible but exact first-release date remains unverified.
- Developer page (/store/apps/developer?id=TheGeekDogs) lists exactly one app: Pocket Manager. No legal/personal developer name shown publicly.

## GitHub — https://github.com/hellosahib
- Name: "Sahib Singh", handle hellosahib, bio "Mobile Engineer", status emoji "Working from home". 33 followers, 55 following.
- Linked: in/sahib-singh-876959143 (matches brief's LinkedIn vanity).
- Public repos: 21. Stars (received across repos): 42.
- No profile README (no hellosahib/hellosahib special repo).
- Pinned repos (3 shown, in pin order):
  1. SharedPrefManager -- "An Android library which helps you create an Shared Preferences Manager with just annotations" -- Kotlin, 4 stars, 1 fork
  2. CanvasExperiments-Android -- "Classes Made As to Learn About Canvas in Android" -- Kotlin, 1 star
  3. ChitChat-Android -- "An Chat App Made Using Firebase" -- Java, no stars shown
- Full repo list (sorted by updated) also includes: KMP-protobuf (Kotlin), jailbreak_root_detection (fork, Kotlin), Go_Basics-Bootcamp (Go), DataStructures_Chitkara (archived, C++), Virtual-Tourist-IOS/ChatForMe-IOS/Meme-Me2.0-IOS/PitchPerfectIOS/WeatherOnGo-IOS/OnTheMap-IOS/MeMe-Me-IOS (Swift, mostly Udacity iOS Nanodegree exercises), TukTuk-Android/WeatherOnGo-Android/ScoreKeeper-Android/MusicalStructure-Android/TourGuide-Android/NBuzz2.0-Android (Java, several explicitly "Udacity ABND Project" exercises), WhatsappClone-Flutter (Makefile).
- Contribution graph shows activity (225 contributions in private repos noted for Sep 2026 partial month; "2,185 contributions in the last year" banner seen once) -- NOT using these as marketing numbers per instruction not to feature/estimate; noting only that the graph shows regular activity, mostly in private repos.
- Overall: real breadth across Kotlin/Java (Android), Swift (iOS), Go, Flutter -- consistent with the "four stacks" claim, but most PUBLIC repos are old learning/Nanodegree-style exercises, not current production code. Readable, one-line descriptions on each. Profile looks active (recent private contributions) but the public-facing repo content is dated.

## GitHub — https://github.com/Tanya-jain99
- Name: "Tanya Jain", handle Tanya-jain99, bio "Android Developer", status emoji "Focusing". 8 followers, 4 following. Email visible on profile: jaintanya999@gmail.com.
- Public repos: 13. Stars received: 2.
- No profile README.
- No manually pinned repos -- GitHub shows an auto "Popular repositories" list instead: MotiveAssignment (Kotlin, 1 star, "Motive Assignment"), Freshlybuilt-Android-app (fork, Java, "Working on Prototype"), sandwich-club-starter-code-master (Java, "Udacity Nanodegree 1st Submission"), movieStage1 (Java), BakingApp (Java), xyzreader (Java).
- Full repo list (by updated) also includes: TaskManager (Kotlin), NewsApp (Kotlin -- MVVM, Room, Coroutines, Dagger, Paging, 1 star -- the most substantial-looking repo), go-backend-clean-architecture (forked template, Go), EventAttendee (Java), GoogleLensClone, Tic_Tac_Toe (Kotlin), BuildBigger (Java).
- No KMP/Kotlin-Multiplatform-named repo, no Swift/iOS repo visible publicly, despite brief's "native Android and KMP, and the iOS side too" description.
- September 2026 contribution activity log: "Tanya-jain99 has no activity yet for this period" -- profile reads as currently inactive on the public side (private work may differ but isn't visible).
- Overall: real but slight public footprint -- mostly older/student-style Java projects, one solid modern Kotlin repo (NewsApp), low stars/followers, no recent (this month) visible activity.

## Company sites
- keenaiglobal.com (own site, /know-us/ and /wealth and /pulse and homepage fetched via WebFetch):
  - Singapore HQ confirmed on own site: "16 Collyer Quay, #11-02, Singapore 049318."
  - Lighthouse Canton partnership confirmed: "Keenai is developed in partnership with Lighthouse Canton Pte. Ltd., a MAS-regulated entity based in Singapore."
  - Bengaluru: NOT found anywhere on keenaiglobal.com homepage or /know-us/ page (checked explicitly for the word "Bengaluru"/"Bangalore" -- absent). Independently, third-party business directories (in.enrollbusiness.com, karosearch.com) list a Keenai Global office at Brigade Tech Gardens, Kundalahalli, Bengaluru 560037 -- corroborating but not sourced from the company's own site.
  - Keenai Wealth: "Keenai Wealth is a multi-asset wealth management platform built for accredited investors." "Access spans 50 global markets and 20+ currencies." "Independent custody at BNY Pershing, held in your name." All CONFIRMED verbatim-ish on keenaiglobal.com/wealth.
  - Keenai Pulse: keenaiglobal.com/keenai-pulse/ (redirect from /pulse) explicitly targets single-family offices: "Built for the way family offices actually run" and a "Who Uses Pulse" section: "Pulse gives the SFO CIO a single governed view of the entire estate..." CONFIRMED.
- Motive: gomotive.com / Wikipedia / help center confirm: formerly KeepTruckin (rebranded March 2022), fleet management/telematics, AI dashcams, ELD compliance, US-based. Two distinct products confirmed by name: "Motive Driver App" (for drivers -- HOS, DVIR, documents) and "Motive Fleet App" (for fleet admins/managers -- GPS tracking, driver logs). Matches brief.
- smallcase: own site confirms "India's largest model portfolios platform," "Readymade model portfolios of stocks, ETFs and mutual funds." Tickertape and Gateway both appear in the footer "Offerings" nav, confirming they are real associated surfaces/products, though the homepage doesn't elaborate on them.
- Cleartrip: own site confirms travel booking in India -- flights, hotels, buses, holiday packages, and train tickets ("Cleartrip enables you to buy train tickets"). Now described as "a Flipkart company." Matches brief (flights/hotels/trains).
- Naskay Technologies: Noida-based mobile/app dev studio, founded 2018. Employee count varies by source: LinkedIn says 11-50, RocketReach says 21. Brief's "~20 people" is consistent with RocketReach's 21 and within LinkedIn's band.
- Chitkara University: real university, Chitkara Educational Trust founded 1998; university status granted 2009 (Himachal Pradesh campus) / 2010 (Punjab campus, near Rajpura/Chandigarh). Real, accredited.
- APJ Abdul Kalam Technological University: real state university in Thiruvananthapuram, Kerala, established 2014 (formerly Kerala Technological University), AICTE/UGC approved.

## LinkedIn attempts
(see below)

## LinkedIn — both blocked
- https://www.linkedin.com/in/sahib-singh-876959143/ -- browser navigate redirected to LinkedIn "Join LinkedIn" signup wall, no profile content rendered. WebFetch also could not retrieve usable content (auth wall).
- https://www.linkedin.com/in/tanyajain06/ -- same signup wall via browser; WebFetch returned HTTP 404.
- Conclusion: all §5.4 facts sourced only from LinkedIn get status OWNER-PROVIDED, not independently verified.

## Public writing search (Sahib's three named Android posts)
- "channelFlow vs callbackFlow" -- WebSearch found only third-party articles on the same generic topic (ProAndroidDev, Medium, other LinkedIn authors), nothing by Sahib Singh. UNVERIFIABLE.
- Android 16 orientation lock / duplicate-fragment bug, "283 reactions, 13 reposts" -- WebSearch found other authors' LinkedIn posts on the same Android 16 topic (Muhammad Arslan Khalid, vkartha) but nothing by Sahib Singh, and no way to see engagement numbers even if found (LinkedIn content unindexed/walled). UNVERIFIABLE.
- ViewModel vs onSaveInstanceState vs SavedStateHandle -- WebSearch found only generic Android-dev tutorials, nothing by Sahib Singh. UNVERIFIABLE.
- Noise: found "sahibsingh.dev" -- checked via WebFetch, this is a DIFFERENT Sahib Singh (self-described web/DevOps developer, not mobile). Not a match, not used as a source.
- Found (search snippet only, not opened): a LinkedIn post URL under the correct vanity "sahib-singh-876959143" ("I'm happy to share that I'm starting a new... activity-7171427764019945472") -- this confirms the vanity URL is a real, posting LinkedIn account, but the post itself (a job-change announcement, not one of the three named technical posts) was not opened/verified since LinkedIn blocks access.

## Date/arithmetic cross-checks (§7 tables vs §5.4)
- Sahib: Cleartrip Feb2019-Feb2020 -> smallcase Mar2020-~Nov2023 (3y8m, matches "3 yrs 8 mos" in §5.4 exactly: Mar 2020 + 44 months = Nov 2023) -> Motive Nov2023-May2025 -> Keenai Jun2025-now (today 2026-09-05). No gaps/overlaps. Total career Feb2019-Sep2026 = ~7y7m. "Seven years, four companies" (§7) is a defensible round-down, not contradicted.
- Tanya: Naskay Nov2020-Jul2021 -> HSBC Aug2021-Dec2023 -> Motive Jan2024-now. No gaps/overlaps. Total Nov2020-Sep2026 = ~5y10m. "Five years, three companies" (§7) is a defensible round-down, not contradicted.
- "Since 2020 ... five years on" (Pocket Manager, §7 proof) = 2020+5=2025, and last update is Aug 29 2025 -- internally consistent (contingent on the "since 2020" launch-year premise, which itself is CONFIRM-WITH-OWNER since Play Store shows no first-release date).
- No arithmetic mismatches found anywhere checked.

## Final deliverable
Written to /Users/sahib.singh/FlutterProjects/tgd_website/FACTS.md -- 46-row table + Data Safety verbatim + GitHub placement write-up + 12 owner questions.

---

## Round 2 (2026-09-05) -- owner answers, resume, Pocket Manager codebase

Inputs this round: QUESTIONS.md (all 55 answered), docs/tanya-jain-resume.pdf, and a read-only pass over /Users/sahib.singh/AndroidStudioProjects/PocketManager-Android.

### Resume PDF extraction
- Read via the Read tool (renders PDF text + a page image). No pypdf/PyPDF2/pdftotext/qpdf/mutool available locally; installed nothing (PEP 668 externally-managed env blocked pip install without --break-system-packages, which I did not use).
- Link annotations aren't exposed as visible PDF text, so I extracted them by regex-scanning the raw PDF bytes for `/URI (...)` objects (uncompressed annotation objects, not inside a FlateDecode stream) -- found three: github.com/Tanya-Jain99 (profile), linkedin.com/in/tanyajain06 (profile), and github.com/Tanya-jain99/TaskManager (the open-source Task Manager project link, not visible as page text -- this is the one the brief's Task A asked me to "extract if the PDF exposes it").
- Fetched the TaskManager URL directly: HTTP 200, page title confirms it's Tanya-jain99's repo. Upgraded to CONFIRMED (row 53) -- the only Task-A resume item independently reachable at a primary source.
- Phone number (+91-86300...) is on the resume. Per explicit instruction, never written to FACTS.md or any other repo file. Confirmed via `grep -rl` after writing that it does not appear anywhere in the repo.

### Education contradiction (the one Round 1 got wrong by not checking)
- Round 1 (FACTS.md row 36) confirmed "APJ Abdul Kalam Technological University" is a real Kerala state university and stopped -- it never checked this is the school Tanya actually attended.
- Resume says: B.Tech CSE, Meerut Institute of Engineering and Technology (AKTU), 2017-2021.
- Verified both institutions exist and are distinct: miet.ac.in resolves (200) and uses "AKTU" on its own site; aktu.ac.in resolves (200); Wikipedia's page for that AKTU is titled "Dr. A. P. J. Abdul Kalam Technical University, Lucknow" -- a different, Lucknow/Uttar-Pradesh university from the Kerala one Round 1 checked (formerly Kerala Technological University, Thiruvananthapuram). Same namesake (Dr. Kalam), unrelated schools.
- Corrected row 36: site should print "B.Tech, Computer Science & Engineering -- Meerut Institute of Engineering and Technology, affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow -- 2017-2021." Never print "Kerala" or "Technological University" (the Kerala name) on Tanya's page.

### Other resume vs. brief discrepancies found
- Naskay title: resume says "Android Intern," brief said "Android Developer." CONTRADICTED, use "Android Intern."
- Motive title: resume says "Software Engineer 2," brief/work-card said "Software Engineer, Android." "Android" isn't in her actual title anywhere on the resume. Flagged, not silently corrected for her -- recommend printing her real title.
- Naskay->HSBC boundary: resume gives Naskay ending Aug 2021 and HSBC starting Aug 2021 (same month); brief said Naskay ended Jul 2021. One-month discrepancy, noted as CONTRADICTED at row 50; doesn't break the "five years, three companies" arithmetic either way.
- HSBC product: resume names "HSBC Online Banking" as the project, but QUESTIONS.md #27 says explicitly "No product name" -- owner answer overrides the resume. Flagged in row 32 as a must-not-print.

### Owner-answer sweep (QUESTIONS.md)
Mapped every Task-B item to its existing FACTS.md row by QUESTIONS.md item number (not FACTS row number -- the two numbering schemes collide, e.g. QUESTIONS #36 is the rating question, not FACTS.md row 36 which is the education row; kept these straight throughout). New status OWNER-CONFIRMED added to the legend specifically for QUESTIONS.md answers, kept distinct from OWNER-PROVIDED (resume/LinkedIn self-reported text) -- an owner settling an ambiguity is a different kind of source than a person's own CV copy, and neither is a primary source the Fact Checker independently verified.

One exception: row 2 (rating). Owner said "Use 4.3" but that's also exactly what the live Play Store listing shows (confirmed Round 1) -- so that row went to CONFIRMED, not OWNER-CONFIRMED, since it's independently verifiable regardless of the owner's answer.

Also caught: QUESTIONS.md #38 supplied four LinkedIn post URLs for three named posts, with no mapping given. Fetched one directly (`.../7430310577153011712/`): HTTP 200 but body is LinkedIn's "Agree & Join" login wall, same block as Round 1's profile fetches. Recorded all four as OWNER-PROVIDED URLs only; flagged the 3-vs-4 mismatch as an open question rather than guessing which is which.

### Pocket Manager codebase audit (read-only, /Users/sahib.singh/AndroidStudioProjects/PocketManager-Android)
- Kotlin 232 files + Java 6 files (per docs/architecture.md, itself dated/audited against a specific commit -- trusted this repo doc since it cites its own sourcing method, but cross-checked its headline claims against the actual gradle files directly rather than taking it purely on faith).
- Compose-only UI, migration from XML views complete and pinned by a test (NoViewBindingOrLayoutsRemainTest). Minor build.gradle.kts leftover: still declares appcompat/constraintlayout/material -- noted as a caveat, not a contradiction (MainActivity is still an AppCompatActivity host).
- minSdk 23, targetSdk/compileSdk 36 (android_sdk_config.gradle).
- Room, WorkManager+Hilt, Kizitonwose CalendarView, Glance widgets, vendored :external:sqlite2excel module for export, androidx.biometric, custom (non-library) chart code. No Retrofit/OkHttp/network client for app data.
- IMPORTANT: Firebase Analytics + Firebase Crashlytics are both present and both network-capable -- app/build.gradle.kts confirms both dependencies. docs/architecture.md's "no network layer" claim is about the app's own data (transactions stay in Room/SQLite only) and does NOT mean nothing leaves the device -- crash logs, diagnostics, and app-activity analytics do transmit via these two Firebase SDKs. This lines up with, doesn't contradict, the Data Safety declaration already confirmed in Round 1 (crash logs/diagnostics/app activity collected). Flagged explicitly so nobody writes "fully on-device" or "nothing leaves your device" copy for Pocket Manager.
- git log --reverse: first commit 2020-11-28 "Inital Commit" (sic), f3791fb. Labelled "first commit" not "first release" per instructions -- corroborates but doesn't prove the owner's "2020" answer for first release.
- git tags found (not necessarily = Play Store release history): 1.0, 1.7-1.9.1, 2-5, 1.10.0-1.13.1. No CHANGELOG.md in the repo.
- Agent pipeline claim ("maintained by our own agent pipeline, on a schedule, with human-cut releases"): found DIRECT, STRONG, primary-source evidence, not just plausible inference. ~/.claude/scheduled-tasks/pocketmanager-factory-run/SKILL.md (read per instructions, did not modify) is a real local scheduled task, cron 37 */2 * * * (every 2h + jitter), matched by factory/SCHEDULE.md in the repo itself. factory/STATE.md logs a real, detailed run (run 200, 2026-08-24) including a subagent mistake caught on review before merge. .claude/CLAUDE.md states as a hard rule: "A human cuts releases from master... releases are the human's job (HARD STOP #2)" and "You never push... origin is the owner's to push (HARD STOP #7)." .github/workflows/android-release.yml is workflow_dispatch-only with a comment explicitly stating autonomous runs never trigger it; android-ci.yml runs unit tests on every push/PR. This is CONFIRMED at a primary source (the repo's own contract and scheduler config), not CONFIRM-WITH-OWNER -- the strongest single finding of this round.

### Status count in the final FACTS.md
CONFIRMED: majority of original Play Store/company-site rows plus all new codebase rows (section d) and the Task Manager repo row. OWNER-CONFIRMED: every row resolved directly by a QUESTIONS.md answer (rating printing decision, Bengaluru, Tickertape, Keenai Pulse, Fleet App, HSBC no-name, Naskay nameable, developer-of-record cut, first-release year, privacy-off decision, gate ownership, Sahib's iOS/KMP employers, Tanya's iOS claim, GitHub placement override). OWNER-PROVIDED: resume-sourced biographical/technical claims not independently auditable (titles corroboration, Motive KMP/Compose/CI-CD bullets, crash-free/startup figures, LinkedIn post URLs). CONTRADICTED: education (row 36, the big one), Naskay title, Motive title label, Naskay/HSBC date boundary. UNVERIFIABLE: none newly added this round that weren't resolved or reclassified. CONFIRM-WITH-OWNER remaining: none of the original 12 -- all answered; five new open questions raised in FACTS.md section (e) instead (Sahib's own resume missing, the 4-URLs-for-3-posts mapping, the reaction-count permanent limitation, the Jillian Michaels trademark question, and a phone-number audit request across other repo files).

Written to /Users/sahib.singh/FlutterProjects/tgd_website/FACTS.md: added ~13 new table rows (47-58, plus 42a), edited 13 existing rows in place, rewrote section (a)'s closing paragraph, rewrote section (c) into a Round-1-questions-now-answered index, added section (d) (Pocket Manager codebase, ~10 rows plus pipeline-evidence writeup), added section (e) (5 new Round 2 owner questions). Added OWNER-CONFIRMED to the status legend.

---

## Round 3 (2026-09-05) -- line-by-line fact check of COPY.md (approved through round 5)

Inputs: agents/fact-checker.md, FACTS.md rounds 1-2, QUESTIONS.md (all answers), docs/brief.md full text (esp. §3, §5, §7), docs/tanya-jain-resume.pdf (re-read via Read tool), COPY.md in full (every line).

### Method
Walked COPY.md route by route (§1 Global through §10 alt text + Appendices A/B), pulling out every sentence asserting a number, date, name, title, employer, product, feature, process step, location, rating or claim about app behaviour. Cross-referenced each against: FACTS.md rows 1-58 and sections (a)-(e), QUESTIONS.md items 1-55, brief.md §3/§5/§7 verbatim text, and the resume. Wrote 76 rows (f1-f76) to a new FACTS.md section (f), plus a "compliance" sub-list for prohibitions checked and found clean, plus a "must cut or confirm" list of 8 items.

### Mechanical verification via grep (bash), not just reading
Ran greps against COPY.md to check things a human skim would miss:
- `[CONFIRM:` count = 10 raw hits; 2 are meta (the legend line explaining the marker, and the appendix's own self-referential mention) -> 8 real open markers, matching the document's own "Totals: 8 distinct" claim. Verified CONFIRMED.
- `[FILL:` count = 2 raw hits, both meta (same two lines) -> 0 in content, matching the document's own claim. Verified CONFIRMED.
- "milan" (case-insensitive): zero matches anywhere in COPY.md. Compliant.
- "bride|groom": zero matches. Compliant.
- "ad-free": zero matches (correctly says "No ads" instead). Compliant.
- "invite|co-planner|plan together|share.*code|collaborat": only meta-instructional lines (§5's own "must not describe X" note, and one line in Appendix A's rationale prose that says "being invited to browse" -- unrelated, about the hero variant C). No actual collaboration-feature copy anywhere. Compliant.
- "marketplace|guest.facing|paid tier|in-app payment": only the meta-instructional line in §5's own header note listing what must never be claimed. No violation. Compliant.
- "4\.6" (old wrong rating): only hit is the unrelated heading "### 4.6 Privacy" (a section number, not a rating). Compliant -- the dead 4.6★ figure from the brief never appears as a rating anywhere.
- "never leaves|nothing leaves|on.device only|fully on.device": zero matches. Compliant -- the on-device-only trap FACTS §(d) warned about was not made.
- Character counts recomputed in Python: "Pocket Manager"=14, "Wedding planner"=15, "The wedding planner"=19 -- all three match what COPY.md itself claims. CONFIRMED.
- "50+" vs "50 global markets": COPY §6.2 card 1 prints "50+ global markets," but FACTS.md row 20's own quoted evidence from keenaiglobal.com/wealth reads "Access spans **50** global markets and **20+** currencies" -- the plus belongs to currencies, not markets. This is a real, previously-unnoticed discrepancy (it was already latent in FACTS row 20's claim heading and the brief, and COPY carried it forward without catching it). Flagged CONTRADICTED (minor) and added to the must-cut-or-confirm list.
- "items? 1[13]" search around the §8.3 "no contact form" citation: confirmed QUESTIONS.md item 13 is Pocket Manager's release-date question ("2020"), completely unrelated to contact forms. COPY.md cites "Items 11 and 13" as the authority for "no contact form anywhere on the site" -- item 11 (wedding-planner email capture) is relevant, item 13 is not, and no QUESTIONS.md item actually covers a site-wide "no form on /contact/" decision. Flagged as a citation error and added to must-cut-or-confirm.

### New substantive findings this round (beyond mechanical checks)
- **The "same pipeline" claim for the second product** (§2.7, §2.8, §3.1, §3.4): FACTS §(d)'s pipeline evidence (scheduled task, CLAUDE.md hard-stop contract, CI workflows) was read only from the Pocket Manager repo. COPY.md repeatedly says both products share "the same pipeline," which is not something audited for the wedding-planner codebase specifically. Marked UNVERIFIABLE, biggest item on the must-cut-or-confirm list.
- **Sahib's reaction count printed without attribution** (§6.3): "The Android 16 post drew 283 reactions and 13 reposts" reads as a bare confirmed fact. COPY.md's own Appendix B (C6) says this figure "prints as their own figure or it comes out" -- i.e. it needs attribution, the same way Tanya's crash-rate stat in §7.2 is correctly framed ("By her account, a 99.8% crash-free rate..."). The Sahib sentence doesn't do this. Real inconsistency between the two people's pages, caught by comparing them side by side rather than reading each in isolation.
- **"Flutter, Dart" on Sahib's Keenai card** and **the Motive Fleet App feature list (live GPS, hours of service, vehicle health, dashcam review) presented as his specific work**: neither traces to any FACTS row, brief text, or owner answer. Both look like plausible-sounding elaborations carried over from adjacent, actually-sourced claims (Flutter/Dart is confirmed for smallcase, not Keenai; the Fleet App feature list reads like a generic description of what such an app does, not a sourced account of his contributions). Flagged UNVERIFIABLE, not CONTRADICTED -- nothing says these are false, but nothing says they're true either, and the Fact Checker's mandate is to cut or confirm, never soften or wave through on plausibility.
- Reaffirmed (not new, but re-checked given the resume was in hand this round): Tanya's Background section (§7.4) lists Udacity Nanodegree, HackerRank, and TCS CodeVita AIR 2023 -- none of which appear anywhere in her resume (no certifications/achievements section exists on the document at all). Stays OWNER-PROVIDED, unchanged status, but worth stating explicitly since this round had the primary document to check it against and it still doesn't corroborate.

### Verdict
CHANGES REQUESTED. Two items are hard blockers before Copy gate (the pipeline overclaim and the unattributed reaction count both assert something as fact that the studio's own rules say must be attributed or cut); the remaining six are confirm-or-cut items, several already flagged as open `[CONFIRM]`s by Copy itself and correctly left unresolved rather than guessed at.

## Round 4 (2026-09-05) -- Sahib's resume, LinkedIn posts verified, owner answers 56-69

Inputs: agents/fact-checker.md, FACTS.md rounds 1-3 in full, QUESTIONS.md items 24/25/38/45/56-70, docs/brief.md §5.4 and the §7 Sahib table, COPY.md §2.3 and §6, docs/sahib-singh-resume.pdf (read directly via Read tool), docs/scratch/references.md (bottom section, the Orchestrator's logged-in LinkedIn verification).

### Method
Read Sahib's resume the same way Tanya's was in Round 2: line by line against every §5.4/§7/COPY.md §6 claim about him, one row per claim in a new FACTS.md section (g). Cross-referenced dates arithmetically (e.g. brief's "3 yrs 8 mos" at smallcase implies an end month, checked that implied month against the resume's stated end month rather than trusting the rounded year figure both sources happen to agree on). Then read references.md's LinkedIn table directly and matched its four rows against FACTS.md rows 40-42/42a by post subject line, not by guessing.

### What the resume actually contradicts (not just "doesn't corroborate")
This is a shorter, punchier list than Tanya's Round 2 audit, but every item is a specific, checkable mismatch, not a vibe:
- **Motive title:** resume says "Android Developer." Brief §5.4, §7 table and COPY §6.2 card 2 all say "Android Engineer." Different words, both plausible-sounding, only one is on his own resume.
- **Motive start date:** resume says Oct 2023. Brief/COPY round to "2023" but the brief's prose elsewhere and item 45's framing assume Nov 2023. One month off.
- **smallcase end date:** resume gives an explicit "March 2020 - Sept 2023." The brief's "3 yrs 8 mos" total, starting from the resume's own March 2020, lands around Nov 2023 -- two months later than what he actually wrote down. The rounded-year arithmetic cross-check from Round 2 (row 44, "seven years, four companies") still holds regardless, but the precise duration figure doesn't survive contact with his own document.
- **Pocket Manager's own project window:** two of his own sources disagree with each other. The brief (line 432) says his LinkedIn lists it as Dec 2020 - Dec 2022; his resume says Dec 2020 - Dec 2021. A full year apart, both self-reported, neither currently printed anywhere on the site (good -- "since 2020" is the only figure that survives either way).
- **Udacity nanodegree naming:** resume says "Android Nanodegree." Brief/COPY say "Udacity Android Basics Nanodegree." These are two different real Udacity programs (Basics was the free intro track, Nanodegree was the paid longer one) -- a naming substitution, not a rounding difference.

### What the resume adds that nothing else did
- **A second, previously-unlisted Nanodegree: "iOS Nanodegree (Udacity)."** Not in the brief, not in COPY.md, and directly relevant to the item 45 iOS question below -- it's real evidence he has formal iOS training, though training isn't the same claim as "native iOS work at a specific employer."
- **IIIT-B Data Science certification** -- also not on the site anywhere.
- Motive bullets the site doesn't currently print: a design-components library spanning **both** Driver and Fleet (COPY only claims Fleet for him), a Views-to-Compose migration, bug-bash sessions and unit testing. The "Improving KMP Usage" bullet is genuinely useful corroboration for item 45's "KMP: Motive" answer -- it's his own resume text about the actual work, not just a one-line reply to a direct question.
- Cleartrip bullets the site doesn't currently print: hotel-booking feature on a 10M+-download app, memory-leak fixes, GraphQL adoption (50% fewer API calls), a move to multi-modular architecture.

### The item 45 tension -- the one that actually matters
Item 45's answer ("Native iOS: Motive and smallcase. KMP: Motive.") is what fills DESIGN.md §F's coverage map and COPY.md §6.2's "native iOS" language on two of his four work cards. The resume does not support "native" at either employer. At smallcase specifically it actively describes the opposite: "Led a team of 7 members to launch the Tickertape Flutter App for iOS" -- that's cross-platform Flutter, stated in his own words, not a native iOS codebase. At Motive the resume just never mentions iOS, Swift, or anything Apple -- four bullets, all Android/Compose/KMP/testing, zero iOS.

Called this CONTRADICTED (partial) rather than a flat CONTRADICTED, because the two employers aren't in the same position: smallcase is an active contradiction (the resume describes the same-sounding project as cross-platform), Motive is a silence (unconfirmed, not denied). Recorded exactly what's still printable: "iOS" without "native" for smallcase survives on the resume's own evidence (he did ship an iOS app, just not a native one); "native iOS" at either employer does not survive from anything this session can read. This is a bigger deal than a title typo because two design/copy artifacts (DESIGN.md §F, COPY.md §6.2) already treat item 45 as having closed a gap, and it's reopening a version of that gap rather than just correcting a date.

### LinkedIn posts (items 38, 62) -- resolved, not just less-unverifiable
Round 2/3 could never get past LinkedIn's login wall on direct fetch -- every attempt hit the "Agree & Join" page, and the four supplied URLs for three named posts were never mapped. references.md records the Orchestrator doing this in an actual logged-in session and reading real numbers off each post. Matched by subject line, not URL-order guessing: channelFlow/callbackFlow -> 110 reactions; the Android 16 post -> 283 reactions, 12 comments, 13 reposts (matches the brief's "283 and 13" exactly); the ViewModel post -> 92 reactions; and a fourth post, not named in the brief at all, about coroutine cancellation being cooperative -> 17 reactions. Upgraded FACTS.md rows 40, 41, 42 and 42a from OWNER-PROVIDED to CONFIRMED, added a new row 42b for the fourth post, and flagged once, clearly, that these are point-in-time counts as of 2026-09-05 read in a single session -- not something this Fact Checker viewed directly, and not something that stays true forever the way a Play Store screenshot's text does.

### Owner answers 56-69 folded in
Four of these were real resolutions to previously-open items, not new information to merely log: item 56 (both founders cut every release -- closes the empty-chair question from Round 3's f75/must-cut item 8), item 63 (name Tanya's Naskay project, "Jillian Michaels | Fitness App," despite the trademark flag raised in Round 2 section (e) question 4 -- their call, made), item 68 (wedding planner shares Pocket Manager's pipeline, by owner say-so, **not by audit** -- the only pipeline audit in this repo still covers the Pocket Manager repo alone, so this closes the must-cut item by owner authority while leaving the underlying audit gap on the record rather than pretending it's now verified), and item 69 (contact form is email-only -- this is the citation error from Round 3's must-cut item 3; the decision is now sourced, but COPY.md's text still cites the wrong QUESTIONS.md items and needs a copy fix, not just a fact-check sign-off). Item 67 (Astro 7) is logged for completeness since it was in the batch, but it's an engineering/stack decision, not a claim about the world -- noted, not treated as a FACTS-style verification.

### Status count, new/updated rows this round
Section (g) resume cross-check: 3 CONTRADICTED (Motive title, Motive start month, smallcase end date/duration) + 1 CONTRADICTED (Pocket Manager date range, two owner sources disagreeing) + 1 CONTRADICTED (Udacity nanodegree naming) = **5 CONTRADICTED rows**. 1 N/A (Motive end date, resume predates it, cannot speak to it either way). 1 dedicated CONTRADICTED (partial) row for the item 45 native-iOS/KMP tension. Remaining resume rows (Tickertape/smallcase work, Motive work, Cleartrip work, education, three of five certification lines, languages) are OWNER-PROVIDED, several newly corroborating what was previously LinkedIn-only, two flagging brand-new unprinted facts. LinkedIn posts: 4 rows (40, 41, 42, 42a) upgraded OWNER-PROVIDED -> CONFIRMED, 1 new row (42b) added as CONFIRMED. Owner-answer rows: 4 new OWNER-CONFIRMED rows (items 56, 63, 68, 69) plus one logged engineering note (item 67). Seven new questions for the owners raised in section (j), all narrowly scoped to what this round could not resolve on its own.

Written to /Users/sahib.singh/FlutterProjects/tgd_website/FACTS.md: updated the intro paragraph to name the three Round 4 sources; edited rows 40, 41, 42, 42a in place and added row 42b; added section (g) (resume cross-check, ~17 rows including the item 45 discussion), section (h) (LinkedIn posts pointer/caveat), section (i) (owner answers 56-69, 5 rows), and section (j) (7 questions for the owners); updated the Round 3 must-cut-or-confirm list items 1, 2, 3 and 6, and item 8's sub-bullets, with resolution notes rather than deleting the original text.

---

## Round 5 (2026-09-05) — built-output fact check, `dist-runA`

Different job this round: not auditing `COPY.md` against sources, but auditing the frozen build at
`.../scratchpad/dist-runA` against `COPY.md` itself — what a browser actually renders. Wrote a small
Python script to strip tags and pull out visible text, JSON-LD, meta tags, `<img>` alts and
`<a href>` targets from all six HTML files, then diffed by hand against `COPY.md` §1–§10 and
Appendix B, plus spot-checked images (four Pocket Manager screenshots, one wedding-planner
screenshot, all five OG PNGs) with the Read tool directly rather than trusting filenames or alt
text.

**Headline finding: `/sahib/` and `/tanya/` do not exist in this build.** Sitemap lists only five
URLs (`/`, `/contact/`, `/work/`, `/work/pocket-manager/`, `/work/wedding-planner/`); no
`/sahib/index.html` or `/tanya/index.html` anywhere in `dist-runA`, and no sitemap entry for either.
`COPY.md` §6/§7 write two complete pages that are simply not present in what a visitor would see.
Cross-checked against `docs/reviews/runA/notes-a.json` (this same run's own a11y tab-stop capture)
and it independently corroborates: tab order on every page jumps `"TheGeekDogs, home"` →
`"Work"`, confirming the nav was already missing its Sahib/Tanya items at capture time, not an
artifact of my extraction method.

Direct consequences traced and written up as separate numbered findings rather than folded into
finding 1, since each is independently checkable and each would need its own fix even after the
missing routes are built: the header/footer nav is short two of its four required items; the
`/` work-card strip (§2.9a) has no `<a>` element in either row (the "Sahib's/Tanya's work in full"
links have nowhere to point); and the persistent contact plate — wired sitewide including onto
`/404.html` — puts a second link on the 404 page, directly contradicting §9's explicit "one link
only, the second and third are cut" rule.

**Other findings, independent of the missing routes:**
- Tanya's two work-card-strip entries on `/` print year-only ("2024 – now", "2021 – 2023") where
  §7.2 (which §2.9a says to print verbatim) gives month-level dates ("Jan 2024 – now", "Aug 2021 –
  Dec 2023"). Sahib's two cards are correctly year-only, because his own source fields are
  year-only — this is specific to Tanya's row.
- The persistent contact plate's rendered text (`thegeekdogs@gmail.com`, no `aria-label`) doesn't
  match `COPY.md` §1's own spec for it (`Start a project` label, an accessible name built around
  that label) — but does match the *later* `QUESTIONS.md` item 53 decision and §8.2's own note
  about "the plate" being an address-over-mailto, not a label-over-mailto. §1 was never edited to
  reconcile with that later decision, so `COPY.md` itself now carries two contradictory specs for
  one element. Flagged as a copy fix, not a build bug — the build followed the newer, correct
  intent; the document didn't catch up.

**Clean sweep, worth recording since it's the majority of the audit:** marker/forbidden-word grep
across the whole build (`[CONFIRM`, `[FILL`, `TODO`, `placeholder`, `Milan`, `wedme`, `lorem`,
`example.com`, `href="#"`, `New Delhi`, `Delhi`, both phone numbers, `on-device`, `bride`, `groom`,
`ad-free`, `invite`, `co-planner`, `plan together`) returned **zero hits, on every term**. JSON-LD
(Organization, two Persons, two SoftwareApplications) matches `FACTS.md`-confirmed facts exactly —
names, `sameAs` URLs, the 4.3/24 `aggregateRating`, the Play Store URL, no invented pronouns, no
address beyond Bengaluru. Meta (title/description/OG/canonical/robots/theme-color) is fully
compliant on all six pages, including `noindex` correctly scoped to 404 only and both light/dark
`theme-color` values present everywhere. All five alt lines that do ship (four Pocket Manager, one
wedding-planner) match `COPY.md` verbatim, and the images behind them were opened directly and show
no placeholder branding. Stage-indicator strings match §10.4's exact patterns on every page they
appear. No stale 4.6★ rating and no "50+" anywhere in the build (the only `4.6` substring found is
unrelated SVG icon path data). No Engineer-authored copy found anywhere — every shipped string
traces to `COPY.md`, `FACTS.md`, or a `QUESTIONS.md` owner answer.

### Verdict

**BLOCKED**, not merely changes-requested — two of the site's core routes, extensively fact-checked
across three prior rounds, render nowhere in this build, and that absence actively breaks the nav
and the 404 page's own explicit single-link rule. Everything that did ship is clean. Written to
`docs/reviews/runA-fact-check.md`: verdict, per-route parity table, marker-leak sweep, JSON-LD/meta/
image findings, and six numbered differences with route, built string and approved string for each.

## Round 6 — built-output pass, `dist-runB` (all seven routes + 404)

`/sahib/` and `/tanya/` now exist and match `COPY.md` §6/§7 verbatim, including the map, all work cards, both quotes, the four LinkedIn post links in the correct order/mapping (`FACTS.md` rows 40-42b), and the coverage-map cells (checked against item 72 and `DESIGN.md` line 1563 gloss — no cell claims an unsupported product). Run A's three findings are all resolved: 4-item nav everywhere, work-card-strip links present with correct accessible names, Tanya's strip years fixed to year-only. Marker/forbidden-word sweep: zero hits on all 20 terms, including on the two new routes and their OG PNGs. Pronouns clean (he/his for Sahib, she/her for Tanya, no crossover). JSON-LD `sameAs` exact on both Persons; no `jobTitle` field exists anywhere (never specified, not a gap). Meta and both new OG images match `COPY.md` §6.6/§7.6 character for character. No `<img>` on either person page (headshots correctly still pending). One difference recorded: the sub-768 plate still prints the full address instead of the `Email` label (`COPY.md` §1 round 10/13) — no CSS or JS in the build shortens it at any breakpoint. This was already known and assigned to the Engineer before this pass (`REVIEWS.md`, build run B note) and is recorded once here per instruction, not raised as new.

### Verdict

**APPROVED**, one difference (pre-flagged, non-blocking). Written to `docs/reviews/runB-fact-check.md`.

## Round 7 — final parity pass, `dist-final` (commit `6283b4a`)

Diffed `/sahib/` and `/tanya/` line-for-line against a fresh extraction of round 6's own `dist-runB`, not just against `COPY.md`, to catch anything that moved beyond the three expected strings. All three land verbatim in the right place: `/sahib/`'s two section lines (`What he ships and where`, `The roles behind the map`) and `/tanya/`'s Motive Android-edge annotation, with `Motive` now printed on all three of the band's layers. The sub-768 plate gap from round 6 is closed on all eight routes — `.plate__label`/`.plate__address` swap at the `767px` breakpoint in the shipped CSS, and every route's `aria-label` reads `Email <address>. Opens a new message about a project.` with the right address. Full round-6 sweep (20 terms + pronouns): zero hits, unchanged. JSON-LD byte-identical to round 6 on every route checked. Font subsets (`anek-latin-subset.woff2`, `instrument-sans-subset.woff2`) read directly with `fontTools`: every non-ASCII character actually used on the site (`©`, en dash) is in both subsets' cmaps; `₹` is missing from both but is never used, so not a live gap; zero replacement characters anywhere in the build. One difference recorded, not blocking: `COPY.md` §7.1's intro second paragraph ("Underneath that is the shape she works on...") is no longer rendered on `/tanya/` — it's been moved into an HTML comment that itself documents the reasoning ("§J round 12, `/tanya/`'s 'remove one thing'"), matching `docs/scratch/engineer.md`'s Build run D/E notes. A real, reasoned design cut, but `COPY.md` was never updated to reflect it, so it's on the record rather than silently passed.

### Verdict

**APPROVED**, one difference (a documented design removal, not a copy bug or regression). Written to `docs/reviews/final-fact-check.md`.
