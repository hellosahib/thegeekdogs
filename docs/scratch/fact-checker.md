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
