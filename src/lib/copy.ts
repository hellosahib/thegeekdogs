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

/** COPY.md §2.10, the final CTA's primary. The verb is part of the string. */
export const FINAL_CTA = {
  label: `Email ${STUDIO_EMAIL}`,
  accessibleName: `Email ${STUDIO_EMAIL} to start a project`,
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

/**
 * The routes this build actually ships. Anything else is not linked.
 *
 * `/sahib/` and `/tanya/` land in build run B, which is the person pages' own step, and
 * their nav entries come back with them. The work-card strip's two row links (COPY.md
 * §2.9a) point at the same two routes and are held on the same condition.
 */
export const BUILT_ROUTES = new Set<string>(['/', '/work/', '/contact/']);

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

/**
 * COPY.md §3, the `/work/` index's own strings. Everything about the two products
 * themselves comes off the `products` collection; only the page's frame is here.
 *
 * §3.1 supplies a short intro and a long body. DESIGN.md §B.11 caps the slot at 20
 * words, the short intro is 17, and §3.1 says outright that it is the one that prints
 * if only one can — so the long body is held rather than placed.
 */
export const WORK_INDEX = {
  headline: 'Two products, both ours.',
  intro:
    'The two apps this studio builds and maintains, with the same review gates a client would get.',
  meta: {
    title: 'Work | TheGeekDogs',
    description:
      'Pocket Manager, live in the Play Store since 2020. A wedding planner in final touches. Both built and maintained by the pipeline this studio sells.',
    ogTitle: 'Two products, both ours.',
    ogDescription:
      'One shipped and still updated. One in final touches. Built with the same review gates a client would get.',
  },
} as const;

/**
 * COPY.md §8, `/contact/`. Three printed addresses and nothing to submit: items 11 and
 * 69 both answered no form, so this page collects nothing and posts nowhere.
 */
export const CONTACT = {
  headline: 'Two people, one inbox.',
  body: "Email is the whole intake. Tell us what you're building, which platforms it has to run on, and roughly when you need it in someone's hands. You'll get a reply from Sahib or Tanya, and a straight answer about whether we're the right fit. If we're not, we'll say so and tell you what we'd look for instead.",
  routesHeading: 'Where to send it',
  routes: [
    {
      label: 'The studio',
      line: 'Everything starts here. Both of us read it.',
      address: STUDIO_EMAIL,
    },
    {
      label: 'Sahib',
      line: 'Architecture, the release cut, and anything about how a build would actually be structured.',
      address: 'sahiboffc@gmail.com',
    },
    {
      label: 'Tanya',
      line: 'The spec, device QA, the security and privacy pass, and what the shared core carries versus what stays native.',
      address: 'jaintanya999@gmail.com',
    },
  ],
  engagementLine:
    "Fixed-scope projects and retainers, both. It starts with a short written brief rather than a call, a first MVP follows a few days after the go-ahead, and we work in IST. There's no phone number: email is the route, and you'll usually hear back within a couple of days.",
  meta: {
    title: 'Contact | TheGeekDogs',
    description:
      "Email thegeekdogs@gmail.com. A reply from Sahib or Tanya, and a straight answer about whether we're the right fit for what you're building.",
    ogTitle: 'Two people, one inbox.',
    ogDescription:
      "Tell us what you're building. You'll get a real reply from one of us, and a straight answer either way.",
  },
} as const;

/** COPY.md §9, `/404.html`. Four words and one link. */
export const NOT_FOUND = {
  headline: "This page isn't here.",
  meta: {
    title: 'Page not found | TheGeekDogs',
    description: "That page isn't here. One link back to the studio, and nothing else on it.",
  },
} as const;

/** COPY.md §1, footer. */
export const FOOTER = {
  studioLine: 'TheGeekDogs. A two-person mobile studio.',
  locationLine: 'Bengaluru. We work in IST.',
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
