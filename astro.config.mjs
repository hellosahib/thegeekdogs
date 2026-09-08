// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://thegeekdogs.com',
  output: 'static',
  trailingSlash: 'always',
  base: '/',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  image: {
    // PLAN.md §1.6
    responsiveStyles: true,
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    css: {
      /*
        **Explicit browser targets, and this is a bug fix rather than a preference.**

        Tailwind v4's Vite plugin minifies with Lightning CSS, and with no targets set it
        collapses a prefixed/unprefixed pair to whichever is declared LAST. Every glass
        surface on this site hand-wrote `backdrop-filter` followed by
        `-webkit-backdrop-filter`, so the standard property was the one thrown away:
        the shipped stylesheet carried seven `-webkit-backdrop-filter` declarations and
        zero unprefixed ones.

        Chrome has since dropped the `-webkit-` alias, so the result was that **nothing
        blurred in Chrome, Edge or Firefox** — and the `@supports not (…)` fallback did
        not rescue it either, because those engines DO support the unprefixed property
        and the condition was false. The site landed in exactly the hole the fallback was
        written to cover: a 72%-alpha sticky header with body copy legible through it, and
        `.05`-alpha panels sitting on a lit isometric room with nothing separating them.

        Declaring the pair in the other order would only invert the loss. Targets are the
        fix: Lightning CSS emits BOTH forms itself, in the right order, and the hand-written
        prefixes come out of the source.
      */
      lightningcss: {
        targets: {
          chrome: 120 << 16,
          firefox: 128 << 16,
          safari: (15 << 16) | (4 << 8),
        },
      },
      transformer: 'lightningcss',
    },
    build: {
      // PLAN.md §7 measures gzip of the emitted bundles; keep them addressable as files.
      cssCodeSplit: false,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          // The analytics bootstrap compiles to nothing when PUBLIC_FIREBASE_* is
          // unset: the guard is statically false, so the SDK import is dead code
          // and no chunk is emitted. That is the designed outcome, not a defect,
          // and reporting it would make `qa:build`'s zero-warning gate untrue for
          // every build without analytics config. Every other warning still fires.
          if (warning.code === 'EMPTY_BUNDLE' && /Analytics\.astro/.test(warning.names?.join() ?? warning.message)) {
            return;
          }
          defaultHandler(warning);
        },
      },
    },
  },
});
