// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from the custom domain (public/CNAME). DNS is at Cloudflare: four A records + www CNAME to GitHub Pages,
// set to "DNS only" (grey cloud).
export default defineConfig({
  site: 'https://thekanpurincometaxandgstbar.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', hi: 'hi-IN' } },
    }),
  ],
});
