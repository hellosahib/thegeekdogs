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

/**
 * COPY.md §1, nav labels. The wordmark is slot 0 and links home.
 *
 * Only the routes that exist are rendered (see Header.astro): a nav item pointing at
 * a page that has not been built is a broken link, and `qa:links` is right to fail on
 * one. Each entry comes back the step its route lands.
 */
export const NAV = [
  { label: 'Work', href: '/work/' },
  { label: 'Sahib', href: '/sahib/' },
  { label: 'Tanya', href: '/tanya/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** The routes this build actually ships. Anything else is not linked. */
export const BUILT_ROUTES = new Set<string>(['/']);

/**
 * COPY.md §1, dark mode toggle. The accessible name states the action performed,
 * never the state the page is already in.
 */
export const THEME_TOGGLE = {
  groupLabel: 'Theme',
  toLight: { accessibleName: 'Switch to light mode', announcement: 'Light mode on.' },
  toDark: { accessibleName: 'Switch to dark mode', announcement: 'Dark mode on.' },
} as const;

/** COPY.md §1, "Back to the studio". */
export const BACK_TO_STUDIO = {
  label: 'Back to the studio',
  accessibleName: 'Back to the studio home page',
} as const;

/** COPY.md §1, footer. */
export const FOOTER = {
  studioLine: 'TheGeekDogs. A two-person mobile studio.',
  locationLine: 'Bengaluru and New Delhi. We work in IST.',
  emailLabel: STUDIO_EMAIL,
  elsewhereHeading: 'Elsewhere',
  /** COPY.md §1: four outbound links and no more. Labels verbatim. */
  elsewhere: [
    { label: 'Sahib on GitHub', person: 'sahib-singh', social: 'github' },
    { label: 'Tanya on GitHub', person: 'tanya-jain', social: 'github' },
    { label: 'Sahib on LinkedIn', person: 'sahib-singh', social: 'linkedin' },
    { label: 'Tanya on LinkedIn', person: 'tanya-jain', social: 'linkedin' },
  ],
  rightsLine: '© 2026 TheGeekDogs',
  employerNote:
    "Company names on this site are the two founders' employment history. None of them are clients of TheGeekDogs and none endorse it.",
} as const;
