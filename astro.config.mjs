// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Until the custom domain is live, GitHub Pages serves the site under /website/.
// When thekanpurincometaxandgstbar.com is live: set `site` to it, delete `base`, and add public/CNAME
// (see "Custom domain" in PLAN.md).
export default defineConfig({
  site: 'https://the-kanpur-income-tax-and-gst-bar.github.io',
  base: '/website',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', hi: 'hi-IN' } },
    }),
  ],
});
