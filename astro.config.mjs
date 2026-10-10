// @ts-check
import { defineConfig } from 'astro/config';

// Until the custom domain is live, GitHub Pages serves the site under /website/.
// When the domain is set up: put it in `site`, delete `base`, and add public/CNAME.
export default defineConfig({
  site: 'https://the-kanpur-income-tax-and-gst-bar.github.io',
  base: '/website',
  trailingSlash: 'always',
});
