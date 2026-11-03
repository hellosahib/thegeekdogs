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

/**
 * COPY.md §1, the persistent contact plate's visible label below 768 (DESIGN.md §B.10
 * round 10). Five characters against the ~73px of type a 112px plate leaves. One string
 * for all three worlds: it carries no pronoun, because `us` would name the studio while
 * the `mailto:` names one person.
 *
 * Its accessible name is not a second string — it is `Email <address>. Opens a new
 * message about a project.`, the same pattern the >= 768 plate uses, built in
 * ContactPlate.astro from the page's own address.
 */
export const PLATE_LABEL = 'Email';

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
  { label: 'Contact', href: '/contact/' },
] as const;

/**
 * The routes this build actually ships. Anything else is not linked.
 *
 * Nothing in the set is unbuilt.
 */
export const BUILT_ROUTES = new Set<string>([
  '/',
  '/work/',
  '/sahib/',
  '/contact/',
]);

/**
 * COPY.md §2.9a — one link per work-strip row, to that person's own page. Both labels
 * are four words and both name the person, so a screen reader user tabbing out of the
 * strip hears which page each link goes to without the row label as context.
 */
export const STRIP_ROW_LINKS: Record<string, { href: string; label: string; accessibleName: string }> =
  {
    'sahib-singh': {
      href: '/sahib/',
      label: "Sahib's work in full",
      accessibleName: "Sahib's work in full, on his page",
    },
  };

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
      'Pocket Manager, live in the Play Store since 2020. Milan, a wedding planner, live there too. Both built and maintained by the pipeline this studio sells.',
    ogTitle: 'Two products, both ours.',
    ogDescription:
      'Both shipped, one of them since 2020. Built with the same review gates a client would get.',
  },
} as const;

/**
 * COPY.md §8, `/contact/`. Three printed addresses and nothing to submit: items 11 and
 * 69 both answered no form, so this page collects nothing and posts nowhere.
 */
export const CONTACT = {
  headline: 'Two people, one inbox.',
  body: "Email is the whole intake. Tell us what you're building, which platforms it has to run on, and roughly when you need it in someone's hands. You'll get a reply from one of us, and a straight answer about whether we're the right fit. If we're not, we'll say so and tell you what we'd look for instead.",
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
  ],
  engagementLine:
    "Fixed-scope projects and retainers, both. It starts with a short written brief rather than a call, a first MVP follows a few days after the go-ahead, and we work in IST. There's no phone number: email is the route, and you'll usually hear back within a couple of days.",
  meta: {
    title: 'Contact | TheGeekDogs',
    description:
      "Email thegeekdogs@gmail.com. A reply from one of us, and a straight answer about whether we're the right fit for what you're building.",
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
  /** Sahib's two outbound links. The co-founder's are not published. */
  elsewhere: [
    { label: 'Sahib on GitHub', person: 'sahib-singh', social: 'github' },
    { label: 'Sahib on LinkedIn', person: 'sahib-singh', social: 'linkedin' },
  ],
  rightsLine: '© 2026 TheGeekDogs',
  employerNote:
    "Company names on this site are the two founders' employment history. None of them are clients of TheGeekDogs and none endorse it.",
} as const;

/**
 * COPY.md §6, `/sahib/`. Every string below is COPY.md's, verbatim.
 *
 * The section labels DESIGN.md §F.7 and §F.8 draw — `Where he has shipped`,
 * `Seven years, four companies` — are wireframe labels, not COPY.md strings, so they do
 * not print. The map's own lead-in (§6.1) is COPY.md's and it is what names the map;
 * the work cards follow the map with no heading above them, as the strip's own section
 * heading is handled (COPY.md §2.9a).
 *
 * §F.7 and §F.8 also draw COPY.md §2.10's `Tell us what you're building.` above the
 * closing address. That string is the HOME page's final CTA and COPY.md writes no
 * person-page equivalent, so the closing block is the address alone, under §6.5's own
 * label and accessible name.
 */
export const SAHIB = {
  slug: 'sahib-singh',
  roleLine:
    'AVP, Mobile. Native iOS, native Android, KMP and Flutter, with production work shipped in all four.',
  body: "Seven years, four companies, and no single platform to narrow him to. At Keenai Global he's a Builder: features end to end, backend through testing, with AI, in wealth-tech for Indian HNIs, UHNIs and family offices. That matters here more than anything else on this page. The delivery model this studio sells isn't a theory he's trying out on clients. It's how he already works every day, in a regulated domain with real money and real auditors attached.",
  /**
   * COPY.md §6.1 and §6.2, round 14 — the two display-section lines that close review item
   * S6's copy gap. DESIGN.md §F.7 and §F.8 both draw a line above the map and a line above
   * the cards; COPY.md now writes them, and neither is the design's own drafted string.
   * The map's heading names the two axes in words a stranger already has and leaves
   * `five`, `surfaces` and `filled cell` to the lead-in beneath it; the cards' heading says
   * that the five companies above the map are the five below it.
   */
  mapSectionLine: 'What he ships and where',
  cardsSectionLine: 'The roles behind the map',
  mapLeadIn: 'Five surfaces, five places. A filled cell means a product we can name.',
  textureLine:
    "One more thing worth noticing about the list above: travel bookings, then investing, then wealth, with fleet telematics the one exception. Three of the four put him next to other people's money, which is not a place anyone lands by accident.",

  /**
   * COPY.md §6.3. The body is one paragraph and four of its phrases are link text, in
   * the order the body names them — "Four subjects, four links, or none of them link."
   * The body is therefore stored as the runs between those four phrases, so the linked
   * text is COPY.md's own words in COPY.md's own sentence rather than a second copy of
   * them sitting beside it.
   */
  writing: {
    heading: 'He writes it down',
    lead: 'Sahib writes Android posts regularly and they land: ',
    links: [
      {
        text: 'channelFlow versus callbackFlow',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7430310577153011712/',
        after: ', ',
      },
      {
        text: 'Android 16 dropping orientation locks and the duplicate-fragment bug it caused',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7421603431334932481/',
        after: ', ',
      },
      {
        text: 'ViewModel versus onSaveInstanceState versus SavedStateHandle',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7420752263364796416/',
        after: ', and ',
      },
      {
        text: 'why coroutine cancellation is cooperative',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7419068733480022016/',
        after: '. ',
      },
    ],
    tail:
      'The Android 16 post drew 283 reactions and 13 reposts on LinkedIn. Before any of that he founded PyHour at Chitkara, a student initiative running free Python classes for juniors.',
    closingLine:
      'Someone who can explain a thing clearly to strangers is usually the person who can explain it to a reviewer.',
  },

  background: {
    heading: 'Background',
    items: [
      'BE, Chitkara University, 2016 to 2020.',
      'Google Associate Android Developer certification, 2019.',
      'Udacity Android Nanodegree.',
      'Udacity iOS Nanodegree.',
      'Google and Udacity Challenge Scholarship, phases 1 and 2. Top 1,000 of 10,000.',
      'Recommendations from a mobile lead at smallcase and from a Google Developer Expert.',
    ],
  },

  links: {
    github: { label: 'Sahib on GitHub', accessibleName: 'Sahib Singh on GitHub. Opens a new tab.' },
    linkedin: {
      label: 'Sahib on LinkedIn',
      accessibleName: 'Sahib Singh on LinkedIn. Opens a new tab.',
    },
    email: {
      address: 'sahiboffc@gmail.com',
      label: 'sahiboffc@gmail.com',
      accessibleName: 'Email Sahib at sahiboffc@gmail.com',
    },
  },

  meta: {
    title: 'Sahib Singh | TheGeekDogs',
    description:
      'Mobile engineer across native iOS, native Android, KMP and Flutter. Builder at Keenai Global, shipping features end to end with AI in production wealth-tech.',
    ogTitle: 'Sahib Singh',
    ogDescription:
      'Four mobile stacks, seven years, and finance almost the whole way through. Now building end to end with AI in wealth-tech.',
    ogImageTitle: 'Sahib Singh',
    ogImageLine: 'Native iOS, native Android, KMP, Flutter.',
  },
} as const;
