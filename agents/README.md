# Agent charters

One file per specialist. Each charter is the remit, the never-do list, the inputs the agent reads, the artifact it writes, and how its work is reviewed. The same team is reconstituted from these files for every later round of changes.

Two rules bind every agent:

1. Nobody works outside their remit. When an agent needs something outside its remit (the engineer needs a headline, the designer needs a fact), it raises a blocker in `QUESTIONS.md` or in its report. It never fills the gap itself.
2. Nobody works in a silo. Specs go one way; review comes back the other way, repeatedly, until the reviewer signs off. A handoff is not a completion.

Verdicts are exactly one of `APPROVED`, `CHANGES REQUESTED` (numbered, each item independently actionable, each citing evidence), or `BLOCKED` (needs a human, goes to `QUESTIONS.md`). "Looks good" is not a verdict. Three rounds maximum per surface, then it escalates to the human with both positions written out.

Disagreements resolve by remit, not seniority: Design Lead wins on visual judgement, Engineer on feasibility, Perf & A11y Auditor outright on budget and accessibility. Genuinely contested items go to the human, never split down the middle.

All handoffs are files in this repo: `DESIGN.md`, `COPY.md`, `FACTS.md`, `PLAN.md`, `QUESTIONS.md`, `REVIEWS.md`. Each agent keeps a scratch file in `docs/scratch/<agent>.md` of what it tried and rejected, so later rounds do not relitigate settled ground.

| Agent | Charter | Writes |
|---|---|---|
| Orchestrator | [orchestrator.md](orchestrator.md) | `QUESTIONS.md`, `REVIEWS.md` routing entries |
| Design Lead | [design-lead.md](design-lead.md) | `DESIGN.md` |
| Copywriter | [copywriter.md](copywriter.md) | `COPY.md` |
| Engineer | [engineer.md](engineer.md) | `PLAN.md`, source, CI |
| Interaction Engineer | [interaction-engineer.md](interaction-engineer.md) | floor SVG, cards, motion |
| Fact Checker | [fact-checker.md](fact-checker.md) | `FACTS.md` |
| QA | [qa.md](qa.md) | QA entries in `REVIEWS.md`, QA scripts' pass/fail evidence |
| Perf & A11y Auditor | [perf-a11y-auditor.md](perf-a11y-auditor.md) | audit entries in `REVIEWS.md`, Lighthouse reports |

Merge rules if the runtime cannot support eight: Interaction Engineer may fold into Engineer; Fact Checker may fold into QA. Never merge Design Lead with Engineer, or QA with either. Those pairs' independence is what the scheme depends on.
