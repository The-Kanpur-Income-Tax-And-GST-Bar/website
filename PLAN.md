# Website plan: The Kanpur Income Tax and GST Bar Association (Regd.)

Living plan. Builders: Arjit + Claude. Maintainers after launch: Arjit's father and other
members, editing through their own Claude Code sessions.

## Goals (in priority order)
1. **Credibility and visibility.** A clean, official-looking site that shows the association is
   real, active and well run.
2. **Useful to members.** Notices, membership, professional links, newsletters.

## What we know
| Fact | Source |
|---|---|
| Full name: The Kanpur Income Tax and GST Bar Association (Regd.) | letterhead |
| Registered with the Bar Council of U.P., Allahabad (Prayagraj) | letterhead |
| Established 2019 | letterhead, banner |
| Registered office: 104A/274, Ram Bagh, Near Leela Shah Dharamshala, Kanpur 208012 | letterhead |
| Email: thekanpurincometaxgstbar@gmail.com | letterhead |
| Members: advocates only | Arjit |
| Membership fee ₹1,000; form exists; UPI QR exists | Arjit (form details pending) |
| Events: Plantation programme 9 Oct 2026 (JIMMC, with the Forest Dept); GST Council webinar 10 Oct 2026 (Shri D.K. Pandey) | banners, invite |
| Press: newsjungal.com, 9 Oct 2026 | `references/press-2026-10-09-newsjungal.md` |

The raw material is in `references/`.

## Tech decisions
- **Astro**, static output, deployed to **GitHub Pages** through a GitHub Actions workflow.
  Arjit has admin access on the org repo.
  - Until the domain is bought the site is served at `the-kanpur-income-tax-and-gst-bar.github.io/website/`,
    so `base` is set to `/website`. When the domain exists: add `public/CNAME`, remove `base`, and turn on HTTPS.
- **No CMS.** Maintainers edit through Claude, so the repo itself is the CMS:
  - **Typed content collections.** Each notice, event, press item, newsletter and committee member
    is its own small Markdown or YAML file, validated by a zod schema. A bad edit fails the build
    instead of shipping a broken page.
  - **`CLAUDE.md` runbook** (a core deliverable). It is written for the father's Claude session:
    how to add a notice or event, upload photos, change office bearers, add Hindi text, preview, and publish.
- **Bilingual (English + Hindi).**
  - Routes: `/` is English and `/hi/` is Hindi (Astro i18n), with a language toggle in the header.
  - Content: each entry has `title_en`/`title_hi`-style fields, plus a body file per language where needed.
    Missing Hindi falls back to English.
  - Static UI text lives in one dictionary file per language.
  - Font: Noto Sans Devanagari or Mukta for Hindi.
  - **A member reviews all Hindi**, especially names written in Devanagari. Claude only drafts it.
- **Mobile-first.** Most visits will come from WhatsApp links. Every event and notice page gets a
  proper share preview (Open Graph image, title, description).
- **No backend.** The membership form is a downloadable PDF and/or a Google Form; payment uses the UPI QR image plus a `upi://pay` deep link.

## Site map
### Phase 1: credibility (launch)
- **Home.** Logo, name, "Est. 2019 · Registered with the Bar Council of U.P.", next or latest event,
  latest notices, a few photos, and a WhatsApp group button.
- **About.** Who we are, aims and objectives, and the constitution or bye-laws as a PDF (if shareable).
- **Committee.** Chairperson, President, VP, General Secretary, the portfolio secretaries (Income Tax,
  GST, Culture, Sports, Library, Media) and the executive members, with photos where available.
- **Events and seminars.** Upcoming and past events. Each has a detail page with poster, date, venue, guests, photos and a press link.
  Seeded with the 9 Oct plantation programme and the 10 Oct GST webinar.
- **In the news / press.** Press clippings and links. Seeded with the newsjungal article.
- **Gallery.** Photos grouped by event.
- **Contact.** Address, Google Map of the registered office, email, official phone(s), WhatsApp link.
- Hindi versions of all of the above.

### Phase 2: member utility
- **Notices and circulars.** Association announcements (AGM, elections, meetings, condolences), with PDF attachments.
- **Membership.** Eligibility (advocates enrolled with the Bar Council), ₹1,000 fee, the form, UPI QR, and the process.
- **Useful links.** Income Tax e-filing, GST portal, CBDT, CBIC, ITAT, Allahabad High Court, Bar Council of U.P.
  For due dates we **link to official calendars rather than maintaining our own dates**: a wrong
  date on a tax bar's own site would damage exactly the credibility we're building.
- **Representations.** Letters and memoranda sent to authorities.
- **Newsletter archive.** PDFs by month or issue.

### Phase 3: directory
- **Member directory.** Name, enrolment number, practice area and contact, **opt-in only** and kept to
  plain information in line with Bar Council of India Rule 36 (no solicitation or advertising wording).

## Design direction
- Two palettes are in use today: saffron, blue and red on the letterhead and banners, and navy and gold on the webinar invite.
  **Proposal: navy + gold as the primary palette** (institutional, legal), with a small saffron accent from the letterhead.
- Logo: the advocate-band emblem with a "Kanpur" ribbon. We need a clean source file. Failing that, we recreate it as an SVG.
- Serif display face for headings (e.g. Playfair Display, matching the invite) and a clean sans for body text, plus a Devanagari pair.

## Decisions (10 Oct 2026)
- **Titles:** Kriti Srivastava is **Chairperson (Admin & Legal Affairs)**. D.K. Pandey was an *external speaker*, not a committee member.
- **Spellings:** Prashant Gupta · Gyanendra Kumar Singh · Rajesh Kumar Srivastava.
- **Phones:** publish mobiles for all office bearers **except women members** (Kriti Srivastava, Radhika Joshi). Their cards show name and role only.
- **Registration wording:** "(Regd.)" / "Registered". Never "®".
- **Logo:** redraw as SVG from the letterhead.
- **Headshots, founding story, aims:** lorem-ipsum placeholders for now. Arjit will supply the real ones.

## Still pending from Arjit
1. WhatsApp link.
2. Membership form details and the UPI QR image.
3. Headshots, founding story, aims and objectives (placeholders until then).
4. Domain. Candidates: `kitgba.in`, `kanpurtaxbar.in`, `kanpurtaxbar.org`.
5. Whether the constitution can be published.

## Publishing hygiene
- Past webinar pages drop the Zoom meeting ID and passcode.
- Strip phone numbers from posters if we publish them as images, or get consent.

## Build order
1. Scaffold Astro, the GitHub Actions deploy, and the base layout (header, footer, language toggle, fonts, palette).
2. Content collections and schemas (events, press, committee, notices, newsletters).
3. Phase 1 pages and seed content, in English, then Hindi.
4. `CLAUDE.md` maintainer runbook. Test it by doing a "fresh session adds a notice" dry run.
5. Domain, `CNAME`, HTTPS.
6. Phase 2, then Phase 3.
