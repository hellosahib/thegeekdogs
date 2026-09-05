# Wedding planner store assets

Copied for QUESTIONS.md item 10, which cleared the five real-device screenshots and the store
icons from the product repo's `assets/brand/store/`. Copied 2026-09-05.

## Source

`/Users/sahib.singh/FlutterProjects/wedme/assets/brand/store/`

Repo identified by the bundle id `com.thegeekdogs.wedme` (brief §5.3). Its own
`assets/brand/store/README.md` records the screenshots as real captures from
`factory/EVIDENCE/CARD-0442-CARD-0044/`, taken on an **iPhone 17 Pro simulator** via
`tool/journey.sh` during run 159's regression pass on 2026-08-25 — not mockups, but a
simulator rather than a physical handset. The brief calls them "real-device screenshots";
if that phrase is going to appear on the site, it needs the owner's sign-off first.

The `play/screenshots/` and `appstore/screenshots/` directories hold byte-identical files
(verified by checksum); the copies below are from `play/`.

## Excluded

`play/feature-graphic-1024x500.png` is **not** copied. It carries the placeholder wordmark
"Milan / Wedding Planner", and brief §5.3 plus COPY.md §5.5 exclude it for that reason.

## Files

| File | Source | What is on screen |
|---|---|---|
| `icon-play-512.png` | `play/icon-512.png` | The app icon, 512 × 512, RGBA. Mark only, no wordmark. |
| `icon-app-store-1024.png` | `appstore/icon-1024.png` | The same icon at 1024 × 1024, RGB with no alpha. Mark only, no wordmark. |
| `01-planning-board-functions.png` | `play/screenshots/01-homeboard-functions.png` | The Home screen. A couple's names and date at the top with "365 days to go", a progress row reading "1 of 17 decisions settled" and a "1 thing is overdue" chip, then one card per function of the wedding — Sangeet (Aug 24, 2027), Wedding (Aug 25, 2027), Reception (Aug 26, 2027) and Haldi Sunset — each with its own colour dot and date. Below them an "Open questions" card. Bottom bar: Home, Boards, Money, Guests, Calendar. |
| `02-planning-board-compare.png` | `play/screenshots/02-board-compare-view.png` | A planning board titled "Gifts & Favours" with Card / Compare toggles and Compare selected. A comparison table with one column per option, rows for Photo, Quoted price (₹5,60,000 and ₹4,20,000), Alcohol licence, Rating, Status (both Shortlisted), To ask and Pros & cons. An "Add an option" button floats bottom right. |
| `03-money-who-paid-what.png` | `play/screenshots/03-money-who-paid-what.png` | The Money screen with "Show chart" selected. Four contributors ranked by share, each with an avatar, an amount and a percentage bar — ₹1,47,500 / 57%, ₹52,500 / 20%, ₹38,500 / 15%, ₹22,000 / 8% — with a payment count under each. Below, a "By side" summary splitting the total between the two sides and the couple, and the line "Based on 7 rows". A "Record a payment" button floats bottom right. |
| `04-money-payment-schedule.png` | `play/screenshots/04-money-payment-schedule.png` | A payment-schedule sheet over the Money screen. A booking named at the top, a "Payment schedule" heading with an "Add instalment" action, two instalments — "Booking advance ₹2,80,000" and "Final balance ₹2,80,000", both marked Due with no due date — then "Scheduled ₹5,60,000" and the line "The instalments match the booking total." Below, a "Split it" row of presets: 50 / 50, 25 / 50 / 25, 30 / 40 / 30, Advance + balance, Custom. |
| `05-compare-view-hindi.png` | `play/screenshots/05-hindi-localisation.png` | The same "Gifts & Favours" board with the interface in Hindi: the toggles read कार्ड and तुलना, the button reads विकल्प जोड़ें, and the bottom bar reads होम, बोर्ड, पैसा, मेहमान, कैलेंडर. Two option cards with photos, one priced ₹4,20,000 and one reading अभी भाव नहीं मिला, both tagged छाँटा हुआ. |

All five screenshots are 1206 × 2622.

## Placeholder name check

**None of the five screenshots shows the placeholder name "Milan" anywhere** — not as a
wordmark, not in a title bar, not in a splash. Every screen was opened and read. Each is a
screen inside the app, and the app's own screens are titled by their content ("Home", "Money",
"Gifts & Favours"), never by the product name. Neither icon carries a wordmark either. On this
test, all seven copied files can ship.

## Other things a reviewer should decide

These are not blockers for item 10, but they are real and they are visible.

1. **`02` and `05` show a vendor-comparison board, not the multi-function planning board.**
   COPY.md §5.2 makes the multi-function board the differentiator and §5.3 fixes the feature
   list a screenshot may illustrate: "A planning board with a guest list and a headcount for
   each function." Neither of these two images shows a guest list or a headcount; they show
   shortlisted options with quoted prices. §5.5 says a screenshot showing anything outside the
   §5.3 list is not used. `01` is the only one of the five that shows the functions.
2. **The source README mislabels `05`.** It calls it "Compare view in Hindi"; the image is the
   **Card** view (कार्ड is the selected tab, not तुलना).
3. **`05` is only partly localised.** The board title "Gifts & Favours" and both option names
   stay in English while the chrome is Hindi. §5.3 claims "A Hindi interface."
4. **The sample data carries invented person, couple and venue names** (on `01`, `03` and `04`).
   They are the product team's fixtures, not real people, but they will be legible on the site.
5. The upstream README notes that plan item 4 wanted a payment timeline by month and no such
   capture exists; `04` is a per-booking instalment schedule instead. COPY.md §5.3 says "a
   payment timeline by month", which this image does not show.
