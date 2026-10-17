# Website plan: The Kanpur Income Tax and GST Bar Association (Regd.)

Living plan. Builders: Arjit + Claude. Maintainers: Arjit's father and other members, editing
through their own Claude Code sessions (see `CLAUDE.md`).

**Status (17 Oct 2026):** Phase 1 is live, and Membership (from Phase 2) is done.
Live at **https://thekanpurincometaxandgstbar.com** since 17 Oct 2026.

## Goals (in priority order)
1. **Credibility and visibility.** A clean, official-looking site that shows the association is
   real, active and well run, and that people can find on Google.
2. **Useful to members.** Membership, notices, professional links, newsletters.

## Key facts
| Fact | Source |
|---|---|
| Full name: The Kanpur Income Tax and GST Bar Association (Regd.). Always written with "The" | letterhead, Association |
| Registered with the Bar Council of Uttar Pradesh, Allahabad. **The first Income Tax and GST association in Kanpur to be registered with it** (the selling point) | letterhead, Association |
| Established 2019. Founders: Adv. Rajesh Kumar Srivastava, Adv. Pankaj Kumar Srivastava, Adv. Ramji Singh and others | Association |
| Registered office: 104A/274, Ram Bagh, Near Leela Shah Dharamshala, Kanpur 208012 | letterhead |
| Email: thekanpurincometaxgstbar@gmail.com | letterhead |
| Members: advocates practising Income Tax and GST law only | Association |
| Fees: ₹1,000 new membership (entry fee + first year), ₹500 annual renewal. Payment by UPI QR, cheque or cash | Association |
| Payment QR: Central Bank of India merchant QR in the Association's name ("THE KANPUR INCOME TAX") | decoded 17 Oct 2026 |
| Domain: **thekanpurincometaxandgstbar.com**, registered at Cloudflare on 17 Oct 2026 for 2 years (expires 17 Oct 2028, auto-renew on). DNS: 4 A records + `www` CNAME to GitHub Pages, DNS only (grey cloud) | Cloudflare / whois |

## Tech decisions
- **Astro**, static output, deployed to **GitHub Pages** through GitHub Actions on every push to `main`,
  plus a daily rebuild at 06:00 IST so past events move out of "Upcoming".
- **No CMS.** The repo is the CMS: typed content collections (YAML/Markdown) validated by zod schemas, so a bad edit
  fails the build instead of shipping a broken page. `CLAUDE.md` is the maintainer runbook.
- **Bilingual:** English at `/`, Hindi at `/hi/`. Every text field has `en` and `hi`, and missing Hindi falls back to English.
- **Mobile-first, WhatsApp-ready:** every page has an Open Graph share image (a JPEG, for WhatsApp).
- **SEO:** `sitemap-index.xml` (with en/hi hreflang alternates) and `robots.txt` are generated at build time.
- **No backend:** membership is a downloadable PDF form plus the payment QR.

## Pages
| Page | Status |
|---|---|
| Home: hero, upcoming/recent events, office bearers, About teaser, press | ✅ live |
| About: founding story (en/hi), oath-taking ceremony 2026–27 photos, at-a-glance facts | ✅ live |
| Committee: office bearers, appointed office bearers, secretaries, executive members, all with headshots | ✅ live |
| Events and seminars: detail pages with poster, photos, guests, YouTube recording, press link | ✅ live (4 events) |
| In the news | ✅ live (1 clipping) |
| Gallery: photos grouped by event | ✅ live |
| Membership: fees, how to apply, form PDF, payment QR (blurred until tapped), enquiry contacts | ✅ live |
| Contact: address, map, email, President and General Secretary phones | ✅ live (map pin approximate, see below) |
| Notices and circulars | Phase 2 |
| Useful links: IT e-filing, GST portal, CBDT, CBIC, ITAT, Allahabad HC, Bar Council of U.P. (link to official due-date calendars, never our own dates) | Phase 2 |
| Representations | Phase 2 |
| Newsletter archive | Phase 2 |
| Member directory (opt-in only, BCI Rule 36) | Phase 3 |

## Decisions
- **Titles:** Kriti Srivastava is **Chairperson (Admin & Legal Affairs)**. **D.K. Pandey is the Association's
  Chairman (Taxation)**: a member *appointed* to the role (not elected) who runs the Association's webinars.
  He appears on the Committee page under "Appointed office bearers".
- **Spellings:** Prashant Gupta · Gyanendra Kumar Singh · Rajesh Kumar Srivastava · founder Ramji Singh.
- **Phones:** publish mobiles for all committee members **except women members** (Kriti Srivastava, Radhika Joshi).
  Their headshots are published, with their consent (confirmed 17 Oct 2026).
- **Registration wording:** "(Regd.)" / "Registered" / "(पंजीकृत)". Never "®".
- **Logo:** redrawn as SVG from the letterhead (`src/components/Logo.astro`).
- **Membership form:** the pre-printed "S.No.150" is blanked to "S.No. ____" (the office numbers forms by hand), and the
  payment line offers Cash / Cheque / UPI with a UTR field. The original scan is in git history.
- **Sharbat programme write-up:** the "Income Tax Bar Association" office bearers mentioned there belong to a *separate* association.
- **Map pin:** leave the approximate pin (neighbouring plot 104A/275) for now.
- **Repo is public:** the letterhead (all phone numbers) and the webinar invite (Zoom ID) stay git-ignored in `references/`.

## Next steps
1. ✅ **Custom domain** live (17 Oct 2026): `public/CNAME`, `site` in `astro.config.mjs`, GitHub Pages custom domain + Enforce HTTPS.
2. ✅ **Google Search Console** (17 Oct 2026): Domain property owned by the Association's Gmail, verified through a
   `google-site-verification=…` TXT record at Cloudflare (**never delete it**), sitemap submitted, key pages sent for indexing.
   The email anti-spoofing records are also in place: TXT `@` `v=spf1 -all` and TXT `_dmarc` `v=DMARC1; p=reject; …`.
3. **Google Business Profile** for the registered office, so the Association shows up in Maps and name searches. Link it to the website.
4. **WhatsApp:** no link for now. When there is one, set `whatsapp_url` in `src/data/site.yaml` and the buttons appear.
5. Phase 2 pages (Notices first), then Phase 3.

## Still open
- Whether the constitution or bye-laws can be published.
- More press coverage, and photos or recordings for the 10 Oct GST Council webinar.
