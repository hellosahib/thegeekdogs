/**
 * Global strings, transcribed verbatim from COPY.md §1.
 *
 * Nothing in this file is written by the Engineer. If a string is needed and
 * COPY.md does not have it, the element is left out rather than invented.
 */
export const SITE_NAME = 'TheGeekDogs';

export const STUDIO_EMAIL = 'thegeekdogs@gmail.com';

export const WORDMARK_ACCESSIBLE_NAME = 'TheGeekDogs, home';

export const SKIP_LINK = 'Skip to main content';

/** COPY.md §1, persistent contact affordance. One affordance, one destination. */
export const CONTACT_AFFORDANCE = {
  label: 'Start a project',
  accessibleName: `Start a project. Opens an email to ${STUDIO_EMAIL}`,
} as const;

/** COPY.md §1, "Back to the studio". */
export const BACK_TO_STUDIO = {
  label: 'Back to the studio',
  accessibleName: 'Back to the studio home page',
} as const;

/** COPY.md §1, footer. */
export const FOOTER = {
  studioLine: 'TheGeekDogs. A two-person mobile studio.',
  emailLabel: STUDIO_EMAIL,
  rightsLine: '© 2026 TheGeekDogs',
  employerNote:
    "Company names on this site are the two founders' employment history. None of them are clients of TheGeekDogs and none endorse it.",
} as const;
