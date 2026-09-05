# Pocket Manager screenshots

Captured for QUESTIONS.md item 60 (which answered item 16: derive new screenshots from the
latest local build rather than pulling them off the store listing).

## Capture conditions

| | |
|---|---|
| Device profile | Pixel 6 Pro AVD (`hw.device.name=pixel_6_pro`), 1440 × 3120, 560 dpi, arm64-v8a |
| Android version | 15 (API 35), `system-images/android-35/default/arm64-v8a` |
| App versionName | 2.0.0 (versionCode 21), debug build, applicationId `com.thegeekdogs.pocketguard2.debug` |
| Source | `/Users/sahib.singh/AndroidStudioProjects/PocketManager-Android`, `./gradlew assembleDebug` |
| Captured | 2026-09-05 |
| Method | `adb exec-out screencap -p`, portrait, native resolution, no crop or resize |

All twelve files are 1440 × 3120 PNG. Six screens, each in the app's own light and dark
themes (Settings → Appearance → Light / Dark); the dark files carry the `-dark` suffix.

The SystemUI demo mode was on during capture, so the status bar reads a fixed 9:30 with a
full battery and no notification icons. Nothing inside the app was altered by it.

## Sample data

The app keeps no account and shipped with an empty database, so ten transactions were seeded
into September 2026 before capture, using category names the app already ships with and plain
Indian-rupee amounts. No brand names and no person names appear in any of them.

- Income: Monthly salary ₹85,000 (Salary), 1 Sep.
- Expenses: House rent ₹24,000 (Rent, 1 Sep); Monthly groceries ₹4,250 (Grocery, 2 Sep);
  Vegetables and fruit ₹680, Auto fare ₹140, Lunch at work ₹320 (3 Sep); Coffee ₹180,
  Metro card recharge ₹500 (4 Sep); Dinner out ₹1,240, Milk and bread ₹210 (5 Sep).
- Totals: in ₹85,000, out ₹31,520, balance ₹53,480.

## Files

Each line describes only what is visible on screen.

| File | What is on screen |
|---|---|
| `01-home.png` | The Home tab. A month selector reading "September 2026", a Balance card showing ₹53,480 with the line "You're under your income this month." and In ₹85,000 / Out ₹31,520, a "Filter Transactions" control and a search button, then a transaction list grouped by day: under "Today", Dinner out (Food & Drinks) −₹1,240 and Milk and bread (Grocery) −₹210; under "Yesterday", Coffee (Food & Drinks) −₹180. A purple add button floats over the list, and the bottom bar shows Home, Calendar, Trips, Stats, Settings. |
| `02-calendar.png` | The Calendar tab, scrolled so the month's Balance of ₹53,480.00 sits above the grid. September 2026 is shown as a month grid with 3 selected as a filled circle and 5 outlined as today; dots under 1 to 5 mark the days that have records. Below the grid, "Thu, 03 Sep 2026" with that day's Income ₹0.00, Expense ₹1140.00 and Balance ₹−1140.00, then the day's three records: Vegetables and fruit (Grocery) −₹680.00, Auto fare (Transport) −₹140.00, and Lunch at work (Food & Drinks) −₹320.00, the last partly behind the floating add button. |
| `03-statistics.png` | The Statistics screen with the range selector reading "Last 7 days" and the Expense tab selected. A "Total Expenses ₹31,520" card, then a bar chart headed "Expenses value by date" with one bar per weekday — Tue 24000, Wed 4250, Thu 1140, Fri 680, Sat 1450 — and the note "All values are in ₹". The top of the "Most Transacted Expense Categories" card is visible below it. |
| `04-categories.png` | The same Statistics screen scrolled to its foot. The "Expenses value by date" bar chart, then the "Most Transacted Expense Categories" card: a donut chart beside a list reading Rent 76.14%, Grocery 16.3%, Food & Drinks 5.52%, Transport 2.03%. |
| `05-export.png` | The Settings screen scrolled to its data section. Rows for Notification (on), American date format (off), then "Export Data" tagged Beta with the line "Backup file, you choose where it's saved", "Import Data" tagged Beta, "Share as CSV" tagged Beta with "Spreadsheet copy, sent to an app you choose", "Share the app", and "About and licences". Below them, "V 2.0.0" and the line "Your data is backed up via Android's built-in backup, tied to your Google account." |
| `06-settings.png` | The top of the Settings screen: "Your name — Not set", "Monthly budget — Not set", "Recurring transactions — None yet", an Appearance card with System / Light / Dark and Light selected, "Currency ₹", a Notification toggle set on, an American date format toggle set off, and the first two rows of the data section, Export Data and Import Data. |

`01-home-dark.png` through `06-settings-dark.png` show the same six screens with the same data
in the app's dark theme. The one difference in content is `06-settings-dark.png`, where the
Appearance card has Dark selected rather than Light.

## Notes for whoever writes the alt text

Three things do not match COPY.md §4.7 as it currently stands. The alt lines need rewriting
against these images rather than the images being restaged.

1. **There is no separate categories screen.** The category breakdown is the last card on the
   Statistics screen, not a screen of its own. `03-statistics.png` and `04-categories.png` are
   the top and the bottom of one scrolling screen, so they share the bar chart.
2. **The category list shows percentages, not totals.** §4.7 says "with a spending total beside
   each category"; the app prints 76.14%, 16.3%, 5.52%, 2.03%. No rupee amount appears per
   category anywhere in that card.
3. **There is no export screen.** Export is a row in Settings that hands off to the system file
   picker, so `05-export.png` shows the Settings data section that contains it. The app also
   labels Export Data, Import Data and Share as CSV as **Beta**, which is on screen and would
   have to be described or the screenshot dropped.

Also worth a decision: the Statistics range selector reads "Last 7 days", not a month, so the
figures on `03`/`04` are a seven-day window while `01` and `02` are monthly. And there is no
app-lock or PIN screen in this build — the Settings screen above is the whole of it — so the
optional sixth capture named in the task is the Settings screen instead.
