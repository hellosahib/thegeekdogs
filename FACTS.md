# FACTS.md — Fact Checker verification log

Checked on 2026-09-05 against primary sources where reachable. Status legend: **CONFIRMED** (seen at a primary source) · **CONFIRM-WITH-OWNER** (brief marks it confirm, or only the owners can know) · **OWNER-PROVIDED** (from LinkedIn/owner text this session could not independently reach) · **UNVERIFIABLE** (looked, could not find) · **CONTRADICTED** (source says something different — quoted).

| # | Claim (as the site would state it) | Source checked | Status | Evidence | Checked on |
|---|---|---|---|---|---|
| 1 | Store name "Pocket Manager \| Finance Manager", package `com.thegeekdogs.pocketguard2` | Play Store listing | CONFIRMED | play.google.com/store/apps/details?id=com.thegeekdogs.pocketguard2 — title "Pocket Manager\|Finance Manager" | 2026-09-05 |
| 2 | "4.6★ from 24 reviews" (§5.2, §7 proof, §12 JSON-LD `aggregateRating`) | Play Store listing | **CONTRADICTED** | play.google.com/…/pocketguard2 — header shows "**4.3**★ · 24 reviews" (24 reviews count is correct; the rating is not) | 2026-09-05 |
| 3 | "1K+ downloads" | Play Store listing | CONFIRMED | Same listing — "1K+ Downloads" | 2026-09-05 |
| 4 | Last updated 29 Aug 2025 | Play Store listing | CONFIRMED | Same listing — "Updated on / Aug 29, 2025" | 2026-09-05 |
| 5 | "Rated for 3+" | Play Store listing | CONFIRMED | Same listing — badge reads "Rated for 3+" | 2026-09-05 |
| 6 | Developer of record: Sahib Singh | Play Store listing + developer page | CONFIRM-WITH-OWNER | The public listing and `/store/apps/developer?id=TheGeekDogs` page show the developer name as **"TheGeekDogs"** only — no personal name appears anywhere on the public listing. "Sahib Singh" as developer of record is a Play Console fact only the owner can confirm. | 2026-09-05 |
| 7 | Feature description: simple interface, categories, calendar screen with daily/monthly balance, statistics with graphs up to 90-day range, transaction export | Play Store listing | CONFIRMED | Listing "About this app" bullets match; "What's new" note confirms "added multiple date range selectors... insights for up to 90 days" | 2026-09-05 |
| 8 | Data Safety currently declares location + financial info collected | Play Store Data Safety section | CONFIRMED | `/store/apps/datasafety?id=com.thegeekdogs.pocketguard2` — "Data collected... Location (Approximate location)... Financial info (Other financial info)" | 2026-09-05 |
| 9 | Data Safety currently declares data isn't encrypted in transit | Play Store Data Safety section | CONFIRMED | Same page — "Data isn't encrypted / Your data isn't transferred over a secure connection" | 2026-09-05 |
| 10 | Data Safety currently declares no deletion on request | Play Store Data Safety section | CONFIRMED | Same page — "Data can't be deleted / The developer doesn't provide a way for you to request that your data be deleted" | 2026-09-05 |
| 11 | The corrected Data Safety declaration is "resolved but not yet live" — the *old* declaration above is what's currently public | Play Store Data Safety section | CONFIRMED | As of today the live listing still shows items 8–10 verbatim. **The privacy content flag must stay OFF** — nothing published to date changes this. The exact wording of the *corrected* declaration was not available anywhere public (it ships with the next build) — that piece is **UNVERIFIABLE** until the owners share it directly; do not accept "it's resolved" as sufficient per the brief's own instruction. | 2026-09-05 |
| 12 | Pocket Manager's exact first-release date | Play Store listing + developer page | UNVERIFIABLE | Current Play Store UI does not expose an original release date anywhere on the listing or developer page. Only the Play Console (owner-only) has this. | 2026-09-05 |
| 13 | "Reviews date back to early 2021" | Play Store reviews (default/most-relevant view) | CONFIRMED (partial) | Oldest review visible without further pagination: Cody Watts, "March 24, 2021" — consistent with "early 2021," but the tooling could not page through all 24 reviews to rule out an earlier one. | 2026-09-05 |
| 14 | "In the Play Store since 2020... still getting updates five years on" | Play Store + owner's LinkedIn (per brief) | CONFIRM-WITH-OWNER | Store shows no first-release date (see #12); brief cites Sahib's LinkedIn listing the "Pocket Manager" project as Dec 2020–Dec 2022, which this session could not independently view (LinkedIn blocked, see #30). "Since 2020" is plausible but not independently confirmed from a primary source this session could reach. | 2026-09-05 |
| 15 | GitHub: hellosahib — 21 public repos, pinned SharedPrefManager / CanvasExperiments-Android / ChitChat-Android, breadth across Kotlin/Java, Swift, Go, Flutter | github.com/hellosahib | CONFIRMED | Profile: "Repositories 21", "Stars 42"; pinned repos and descriptions as listed matched exactly. No profile README present. | 2026-09-05 |
| 16 | GitHub: Tanya-jain99 — 13 public repos, mostly Java/Kotlin student-style projects, no KMP-named repo | github.com/Tanya-jain99 | CONFIRMED | Profile: "Repositories 13", "Stars 2"; no manually pinned repos (auto "Popular repositories" shown instead); September 2026 activity log reads "has no activity yet for this period." | 2026-09-05 |
| 17 | Keenai Global — Singapore HQ | keenaiglobal.com (own site) | CONFIRMED | keenaiglobal.com homepage — "Singapore (SG) · HQ — 16 Collyer Quay, #11-02, Singapore 049318" | 2026-09-05 |
| 18 | Keenai Global — Bengaluru office | keenaiglobal.com (own site) + independent directories | CONFIRM-WITH-OWNER | The word "Bengaluru"/"Bangalore" does **not** appear anywhere on keenaiglobal.com's homepage or /know-us/ page (checked explicitly). Two independent business directories (in.enrollbusiness.com, karosearch.com) list a Keenai Global office at Brigade Tech Gardens, Bengaluru 560037 — corroborating, but not the company's own statement. | 2026-09-05 |
| 19 | Keenai — "built in partnership with Lighthouse Canton" | keenaiglobal.com/know-us/ | CONFIRMED | "Keenai is developed in partnership with Lighthouse Canton Pte. Ltd., a MAS-regulated entity based in Singapore." | 2026-09-05 |
| 20 | Keenai Wealth — multi-asset platform, "50+ global markets" | keenaiglobal.com/wealth | CONFIRMED | "Keenai Wealth is a multi-asset wealth management platform built for accredited investors." / "Access spans 50 global markets and 20+ currencies" | 2026-09-05 |
| 21 | Keenai Wealth — custody at BNY Pershing | keenaiglobal.com/wealth | CONFIRMED | "Independent custody at BNY Pershing, held in your name" | 2026-09-05 |
| 22 | Keenai Pulse — for single-family offices | keenaiglobal.com/keenai-pulse/ | CONFIRMED | "Built for the way family offices actually run"; "Pulse gives the SFO CIO a single governed view of the entire estate..." | 2026-09-05 |
| 23 | Sahib worked on Keenai Pulse specifically (brief marks this "confirm before listing") | Keenai's own site names the product; whether Sahib worked on it is not stated anywhere public | CONFIRM-WITH-OWNER | Product is real (#22); his involvement with it specifically is not verifiable from any public source. | 2026-09-05 |
| 24 | Motive — fleet management, US, formerly KeepTruckin, AI dashcams, ELD compliance, telematics | gomotive.com, Wikipedia, Motive Help Center | CONFIRMED | "KeepTruckin rebranded to Motive in March 2022"; help center and reviews confirm dashcams, ELD, telematics as core product lines | 2026-09-05 |
| 25 | Product names "Motive Fleet App" and "Motive Driver App" | Motive Help Center / App Store listings | CONFIRMED | Help Center articles titled "Introduction to Fleet App" and "Getting Started with Motive for Drivers"; App Store lists both "Motive Driver" and "Motive Fleet" apps by name | 2026-09-05 |
| 26 | Which Motive app Tanya works on (Driver vs Fleet) | Not stated on either public source | CONFIRM-WITH-OWNER | Both apps exist and are real (#25); which one Tanya works on is internal knowledge only. | 2026-09-05 |
| 27 | smallcase — investing platform, India, curated portfolios of stocks/ETFs | smallcase.com | CONFIRMED | "India's largest model portfolios platform" / "Readymade model portfolios of stocks, ETFs and mutual funds" | 2026-09-05 |
| 28 | smallcase surfaces exist: the smallcase app, Tickertape, smallcase Gateway | smallcase.com footer | CONFIRMED | Tickertape and Gateway both appear as named products under the site's "Offerings" footer nav | 2026-09-05 |
| 29 | Which smallcase surface Sahib worked on | Not named on his profile per brief; company site doesn't attribute individuals | CONFIRM-WITH-OWNER | Products are real (#28); attribution to Sahib specifically needs the owner. | 2026-09-05 |
| 30 | Cleartrip — travel booking, India, flights/hotels/trains | cleartrip.com | CONFIRMED | "Book Domestic & International Flight Tickets," hotel booking, and "Cleartrip enables you to buy train tickets" all present; site now states "a Flipkart company" | 2026-09-05 |
| 31 | HSBC — global bank (no product claim needed, per brief) | N/A — existence only | CONFIRMED | HSBC is a real, well-known global bank; no further claim to check per brief's own instruction | 2026-09-05 |
| 32 | Which HSBC product Tanya worked on | Not stated anywhere public | CONFIRM-WITH-OWNER | "Don't guess at a bank" per the brief — this needs the owner directly. | 2026-09-05 |
| 33 | Naskay Technologies — mobile/product studio, Noida, ~20 people, client work | Web search (naskay.com, LinkedIn company page, RocketReach) | CONFIRMED | Noida-based, founded 2018; RocketReach reports 21 employees, LinkedIn band is 11–50 — "~20 people" is consistent | 2026-09-05 |
| 34 | Whether Tanya's specific Naskay client projects can be named | Not publicly stated; agency work is commonly NDA'd | CONFIRM-WITH-OWNER | Per the brief's own caution — do not infer from Naskay's public case studies. | 2026-09-05 |
| 35 | Chitkara University — real institution, BE plausible | Wikipedia, chitkara.edu.in, UGC record | CONFIRMED | Chitkara Educational Trust founded 1998; university status granted 2009 (HP campus)/2010 (Punjab campus); UGC-listed | 2026-09-05 |
| 36 | APJ Abdul Kalam Technological University — real institution, BTech CS plausible | Wikipedia, collegedunia | CONFIRMED | State university in Thiruvananthapuram, Kerala, established 2014 (formerly Kerala Technological University), AICTE/UGC approved | 2026-09-05 |
| 37 | LinkedIn — sahib-singh-876959143 profile content (title, role dates, skills, followers, recommendations) | linkedin.com/in/sahib-singh-876959143/ | UNVERIFIABLE (access blocked) | Attempt redirected straight to LinkedIn's "Join LinkedIn" signup wall — no profile content rendered. WebFetch also returned nothing usable (auth wall). | 2026-09-05 |
| 38 | LinkedIn — tanyajain06 profile content | linkedin.com/in/tanyajain06/ | UNVERIFIABLE (access blocked) | Same signup wall; WebFetch returned HTTP 404 (also effectively blocked). | 2026-09-05 |
| 39 | **All §5.4 claims sourced from either LinkedIn profile** (titles, exact employment dates, skills counts, follower counts, recommendations, "3 yrs 8 mos" breakdown, certifications, AIR 2023, etc.) | LinkedIn (blocked, see #37–38) | **OWNER-PROVIDED, not independently verified** | Per the brief's own instruction: since LinkedIn could not be reached, every fact in §5.4 that traces only to a LinkedIn profile carries this status, not CONFIRMED. | 2026-09-05 |
| 40 | Sahib's "channelFlow vs callbackFlow" post | Web search (Google) | UNVERIFIABLE | No independently indexed copy found; only generic third-party articles on the same technical topic surfaced, none authored by Sahib Singh. | 2026-09-05 |
| 41 | Sahib's Android 16 orientation-lock / duplicate-fragment post, "283 reactions and 13 reposts" | Web search (Google) | UNVERIFIABLE | Search surfaced other authors' posts on the same Android 16 topic, none by Sahib Singh, and no engagement numbers could be seen (LinkedIn content is not indexed/viewable without login). | 2026-09-05 |
| 42 | Sahib's ViewModel vs onSaveInstanceState vs SavedStateHandle post | Web search (Google) | UNVERIFIABLE | No independently indexed copy found. | 2026-09-05 |
| 43 | (Noise, logged for transparency) A site "sahibsingh.dev" surfaced in search | sahibsingh.dev | N/A — not the same person | This is a different Sahib Singh (self-described "Software Developer, specializing in Web and DevOps"), not the mobile engineer this brief describes. Do not use as a source or link target. | 2026-09-05 |
| 44 | Sahib — "seven years, four companies" (§7 table header) | Arithmetic cross-check against §5.4 dates | CONFIRMED | Feb 2019 (Cleartrip start) → Sep 2026 (today) ≈ 7 yrs 7 mo. No overlaps/impossible gaps: Cleartrip Feb 2019–Feb 2020 → smallcase Mar 2020–~Nov 2023 (3 yr 8 mo, matches §5.4 exactly) → Motive Nov 2023–May 2025 → Keenai Jun 2025–now. "Seven years" is a defensible rounding-down, not a mismatch. | 2026-09-05 |
| 45 | Tanya — "five years, three companies" (§7 table header) | Arithmetic cross-check against §5.4 dates | CONFIRMED | Nov 2020 (Naskay start) → Sep 2026 (today) ≈ 5 yr 10 mo. No overlaps: Naskay Nov 2020–Jul 2021 → HSBC Aug 2021–Dec 2023 → Motive Jan 2024–now. "Five years" is a defensible rounding-down, not a mismatch. | 2026-09-05 |
| 46 | "Still getting updates five years on" (Pocket Manager, §7 proof section) | Arithmetic cross-check | CONFIRMED | 2020 (stated launch year) + "five years" = 2025; last update per the live listing is Aug 29, 2025 (#4). Arithmetic is internally consistent, contingent on the "since 2020" premise in #14 which itself is CONFIRM-WITH-OWNER. | 2026-09-05 |

## (a) Data Safety section — verbatim, as it reads today (2026-09-05)

> **Data safety**
> Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time.
>
> **This app may share these data types with third parties**
> App activity and App info and performance
>
> **This app may collect these data types**
> Location, Financial info and 2 others
>
> Data isn't encrypted
> Data can't be deleted

Full detail page (`/store/apps/datasafety?id=com.thegeekdogs.pocketguard2`):

> **Data shared** — Data that may be shared with other companies or organizations
> - App info and performance — Crash logs and Other app performance data
> - App activity — App interactions
>
> **Data collected** — Data this app may collect
> - App info and performance — Crash logs, Diagnostics, and Other app performance data
> - Location — Approximate location
> - App activity — App interactions and Other actions
> - Financial info — Other financial info
>
> **Security practices**
> - Data isn't encrypted — Your data isn't transferred over a secure connection
> - Data can't be deleted — The developer doesn't provide a way for you to request that your data be deleted

This matches the brief's description of the *current* (unfixed) declaration exactly. **The corrected declaration's wording was not found anywhere public** — it ships with the next build, per the brief. Until the owners hand over the exact new wording, the privacy content flag described in §5.2 must stay OFF, and no stronger privacy claim should be written.

## (b) GitHub profiles — plain read and placement recommendation

**Sahib (github.com/hellosahib).** The profile reads as a real, currently-used account: 21 public repos, 42 stars received, 33 followers, and the LinkedIn vanity URL cross-links correctly to the one named in the brief. The three pinned repos and the wider repo list genuinely span the claimed breadth — Kotlin/Java for Android, Swift for iOS, Go, and a Flutter project — which is real corroboration of the "four stacks" claim. The caveat: almost everything publicly pinned or listed is old, learning-oriented work (Udacity Nanodegree exercises, a canvas-drawing practice repo, a Firebase chat-app clone) rather than current production code; the more serious-looking recent activity (a KMP-protobuf repo, private-repo contributions) is visible only as graph shading, not as browsable content. There is no profile README.

*Placement recommendation:* link it plainly from his page (bio line or a small "GitHub" link near the work history) as one more piece of evidence for range, but do not build a hero moment or a "see my code" CTA around it — the visible content doesn't carry that weight, and the brief is explicit that a stale or thin repo undercuts more than it helps.

**Tanya (github.com/Tanya-jain99).** The profile is real but sparse: 13 public repos, 2 stars total, 8 followers, and no manually pinned repos — GitHub falls back to an auto-generated "Popular repositories" list of mostly older Java/Udacity-style projects. The most substantial repo (NewsApp — MVVM, Room, Coroutines, Dagger) is a genuine, well-tagged piece of work, but it's one repo among many thinner ones. Notably, there is no KMP-named or Kotlin-Multiplatform-tagged repo, and no Swift/iOS repo, anywhere in the public list — which sits awkwardly next to the page's planned "KMP shared-core, native Android and iOS at the edges" narrative. The contribution log shows no activity for the current period ("Tanya-jain99 has no activity yet for this period").

*Placement recommendation:* link it quietly (footer/contact area) rather than featuring it prominently on her page. A visitor who clicks through expecting evidence of the KMP/architecture story that her page is built around will not find it there; the LinkedIn recommendation quote already drafted in §5.4 is the stronger, more on-thesis piece of evidence and should carry more of the page's weight than GitHub does for her specifically.

## (c) Questions for the owners — only they can answer

1. What is Pocket Manager's exact first-release date (visible only in Play Console, not on the public listing)?
2. What is the exact wording of the corrected Data Safety declaration, and on what date does the build that carries it go live? (Do not accept "it's resolved" — need the literal new sentence(s) for collection, sharing, encryption, and deletion.)
3. Is "Sahib Singh" the developer of record on the Play Console for Pocket Manager? (The public listing shows only "TheGeekDogs," not a personal name.)
4. Can you provide direct, readable access to both LinkedIn profiles (e.g., a PDF export or screenshots), since this session's fetch attempts were both blocked by LinkedIn's signup wall? Every §5.4 fact — titles, exact dates beyond what's independently dated elsewhere, skills counts, follower counts, both recommendations, certifications, the "AIR 2023" and "top 1,000 of 10,000" figures — currently rests entirely on LinkedIn text this session could not see directly.
5. Can you point to (or provide) the URLs for Sahib's three named Android posts — channelFlow vs callbackFlow, the Android 16 orientation/duplicate-fragment post, and ViewModel vs SavedStateHandle — including the claimed "283 reactions and 13 reposts" figure? None were found through public search.
6. Which smallcase surface did Sahib actually work on — the smallcase app, Tickertape, or smallcase Gateway?
7. Which Motive app does Tanya work on — Motive Driver or Motive Fleet?
8. Which HSBC product/team was Tanya's work on?
9. Can Tanya's specific client work at Naskay Technologies be named publicly, or is it NDA-restricted?
10. Are you comfortable with the site stating that Keenai Global has a Bengaluru office? The company's own website does not state this anywhere checked; it's only corroborated by third-party business directories.
11. Did Sahib work on Keenai Pulse specifically, or only on Keenai Wealth? (Keenai Pulse is a real, separate product for single-family offices — his involvement in it isn't stated anywhere public.)
12. All the remaining `[FILL]` items already flagged elsewhere in the brief (§5.1 engagement/pricing, §5.3 whether the wedding-planner product appears at all, §5.4 gate ownership and "leave off" list) — these are outside the Fact Checker's remit but block publish per §14 gate 2.
