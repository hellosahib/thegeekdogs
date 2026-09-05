/**
 * The Firebase Analytics module. Loaded dynamically, after `load` and inside
 * `requestIdleCallback`, and only when PUBLIC_FIREBASE_* config is present --
 * see src/components/Analytics.astro for why.
 *
 * Google Consent Mode defaults are set to denied before initialisation, so the
 * SDK runs cookieless: it stores nothing on the device, which is what removes
 * the obligation for a consent banner.
 */
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent, setConsent } from 'firebase/analytics';

type FirebaseConfig = Record<string, string>;

export async function start(config: FirebaseConfig): Promise<void> {
  // Consent defaults first, before any measurement call is made.
  setConsent({
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });

  if (!(await isSupported())) return;

  const app = initializeApp(config);
  const analytics = getAnalytics(app);

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const cta = target.closest<HTMLElement>('[data-cta]');
      if (cta) {
        logEvent(analytics, 'cta_click', {
          cta_id: cta.dataset.cta ?? '',
          page_path: window.location.pathname,
        });
      }

      const mailto = target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (mailto) {
        logEvent(analytics, 'mailto_click', {
          address: mailto.getAttribute('href')?.replace(/^mailto:/, '') ?? '',
          page_path: window.location.pathname,
        });
      }
    },
    { capture: true, passive: true },
  );
}
