# thegeekdogs.com

Static site for TheGeekDogs, built the way the site says work gets built: agents draft, humans review, nothing ships unchecked.

**Status: Pass 1 planning complete. No code yet.** The next step is human gate 1 (Direction). Nothing gets built until the items under "What needs you now" are answered.

## What needs you now

1. Open [QUESTIONS.md](QUESTIONS.md) and answer inline. Items 29 to 32 and 45 to 55 are the Direction gate; the rest block Facts and Copy before publish. One line each is enough. "No" and "leave it off" are valid answers.
2. Read [DESIGN.md](DESIGN.md) §B (studio), §C (the floor), §F (Sahib), §G (Tanya). Say yes, or say what is wrong, per section.
3. Skim [COPY.md](COPY.md) for anything you would not put your name to. Every `[CONFIRM]` and `[FILL]` in it is a question in QUESTIONS.md.

## The documents

| File | Owner | What it is |
|---|---|---|
| [docs/brief.md](docs/brief.md) | you | The brief. Every decision cites a section of it. |
| [DESIGN.md](DESIGN.md) | Design Lead | Reference study, three token systems with computed contrast, the floor composition, work cards, stage indicator, both person-page directions, motion spec, open questions. |
| [COPY.md](COPY.md) | Copywriter | Every user-facing string, by route and section, with `[CONFIRM]` and `[FILL]` markers where a fact or decision is missing. |
| [FACTS.md](FACTS.md) | Fact Checker | Every claim checked against a primary source, with status and URL. Includes the Play Store Data Safety text verbatim and the GitHub profile reads. |
| [PLAN.md](PLAN.md) | Engineer | Stack, content schemas, floor technique, budget accounting, CI, QA scripts, build order with blockers, risks. |
| [QUESTIONS.md](QUESTIONS.md) | Orchestrator | Everything that needs a human. Answer inline. |
| [REVIEWS.md](REVIEWS.md) | all | Append-only log of every verdict, its evidence, and how disagreements resolved. |
| [agents/](agents/) | Orchestrator | One charter per specialist: remit, never-do list, model. The team is rebuilt from these for every later change. |
| [docs/scratch/](docs/scratch/) | each agent | What each agent tried and rejected, so later rounds do not relitigate. |

## Findings you should know about

- The Play Store listing shows **4.3 stars**, not 4.6. The site prints the public number (QUESTIONS.md item 36).
- The corrected Data Safety declaration is **not live**. The privacy content flag stays off until someone reads the live listing (items 14 and 15).
- Tracking CTA and email clicks, which the brief requires, needs Plausible at **$9/month**. Cloudflare Web Analytics is free but cannot do it (item 35).
- Sahib's page is built around a coverage map of five stacks by five employers. Native iOS and KMP currently have **no product attributed** to them (item 45).
- LinkedIn blocked every fetch, so every fact sourced from it is marked owner-provided, not verified (item 40).
- The two chosen fonts weigh about **71 KB** after subsetting, not the 50 KB first guessed. It fits the budget; the Engineer has the mitigation in PLAN.md §1.5.

## How the build will run

Order per the brief §14: repo and CI first, then a plain semantic home page, then the floor, then the two product pages, then Sahib, then Tanya last, then contact, 404, OG images and structured data, then the full audit on real hardware. Each surface goes through Design Lead review of the rendered page, Fact Checker, QA, and the Perf & A11y Auditor before a human cuts the release. Three review rounds maximum per surface, then it escalates to you.

Run instructions, content-editing instructions, and the theme-scope notes arrive here with the first code commit.
