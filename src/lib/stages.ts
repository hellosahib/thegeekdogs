import { STAGES, type Stage } from '../content.config';

/**
 * The five stage labels and their meaning lines, COPY.md §2.8. These are the
 * exact strings; they are not reworded per product, and they are identical on
 * the home page, /work/ and each product page. One string, used everywhere.
 *
 * The three state words and the per-item accessible-name pattern are COPY.md §10.4.
 */
export const STAGE_LABELS: Record<Stage, { label: string; meaning: string }> = {
  specced: {
    label: 'Specced',
    meaning: "Written down. Scope, constraints, and what it deliberately won't do.",
  },
  building: {
    label: 'Building',
    meaning: 'Features landing, device-verified as they go.',
  },
  'final-touches': {
    label: 'Final touches',
    meaning: 'Feature-complete. Working through the last blockers before it can be submitted.',
  },
  submitted: {
    label: 'Submitted for review',
    meaning: 'With the store. Out of our hands.',
  },
  live: {
    label: 'Live',
    meaning: 'Installable.',
  },
};

/** COPY.md §10.4 — the list's accessible name, prefixed by the product it belongs to. */
export const TRACK_GROUP_LABEL = 'build stage';

/** COPY.md §10.4 — the visible summary line above a track that hides its labels. */
export function stageSummary(current: Stage): string {
  return `Stage: ${STAGE_LABELS[current].label}`;
}

/** COPY.md §10.4 — state is spoken as well as shown, so it survives greyscale. */
export const STATE_WORDS = {
  complete: 'Done',
  current: 'Where it is now',
  upcoming: 'Not yet',
} as const;

export type StageState = keyof typeof STATE_WORDS;

export interface StageStep {
  key: Stage;
  label: string;
  meaning: string;
  state: StageState;
}

/**
 * PLAN.md §6 — state is computed at build time by comparing each stage's index
 * in the fixed five-item order against the current stage's index. No client JS.
 */
export function stageSteps(current: Stage): StageStep[] {
  const currentIndex = STAGES.indexOf(current);
  return STAGES.map((key, index) => ({
    key,
    label: STAGE_LABELS[key].label,
    meaning: STAGE_LABELS[key].meaning,
    state: index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming',
  }));
}
