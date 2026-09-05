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
