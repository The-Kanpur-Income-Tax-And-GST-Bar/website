# CLAUDE.md: maintaining the Association website

This repo is the website of **The Kanpur Income Tax and GST Bar Association (Regd.)**, Kanpur.
It is maintained by members of the Association, who are advocates and not programmers, through Claude Code.
Talk to them in plain language. Skip jargon, and when they write in Hindi, reply in Hindi.

The site is bilingual: English at `/` and Hindi at `/hi/`. Everything is a static Astro site on GitHub Pages.
Pushing to `main` publishes it in about 2 minutes.

## Golden rules (always apply)
1. **Never publish a woman member's phone number.** This is the Association's decision. In `committee.yaml`,
   women members have no `phone:` line. Keep it that way, including for new members.
2. **Write "(Regd.)" / "Registered" / "(पंजीकृत)". Never write "®".** The name is a registered association, not a trademark.
   **Always start the name with "The"** (**"द"** in Hindi), wherever it is written:
   "The Kanpur Income Tax and GST Bar Association (Regd.), Kanpur" / "द कानपुर इनकम टैक्स एंड जीएसटी बार एसोसिएशन (पंजीकृत), कानपुर".
   Never shorten it to "Kanpur Income Tax & GST Bar". The short form is "The Kanpur Income Tax and GST Bar".
3. **No Zoom IDs, passcodes or private links** on event pages. Strip phone numbers from posters
   unless the people shown have agreed to publish them.
4. **No advertising language about individual advocates** (Bar Council of India Rule 36). Use plain facts only:
   name, role, contact. No "best", "leading", "expert", no client lists, no fees.
5. **Every piece of text gets both languages** (`en:` and `hi:`). If you translate into Hindi yourself, tell the
   member so they can check it, especially people's names in Devanagari.
6. **Always run `npm run build` before publishing.** It validates every content file. If it fails, fix the file it names.
7. **Ask before publishing.** Show what changed, then `git commit` and `git push` only after the member says yes.

## Where things live
| What | File(s) |
|---|---|
| Association name, address, email, WhatsApp link, contact numbers on the Contact page | `src/data/site.yaml` |
| Office bearers, secretaries, executive members (in display order) | `src/data/committee.yaml` |
| Committee photos | `src/assets/committee/<member-id>.jpg` |
| Events and seminars, one file each | `src/content/events/YYYY-MM-DD-short-name.md` |
| Event posters and photos | `src/assets/events/YYYY-MM-DD-short-name/` |
| Press coverage, one file each | `src/content/press/YYYY-MM-DD-outlet-topic.yaml` |
| About page text (founding story) and the short version on the home page | `src/lib/about.ts` |
| Membership page text and fees | `src/lib/membership.ts` |
| Membership form (PDF) and payment QR. Replace a file by saving the new one under the same name | `public/membership/` |
| Fixed interface words (menu labels, buttons) | `src/lib/ui.ts` |
| Plan, roadmap, open questions | `PLAN.md` |
| Original source material (posters, press notes). The letterhead and webinar invite are kept locally only (git-ignored, the repo is public) | `references/` |

The field rules for every content type are in `src/content.config.ts`.

## Recipes

### Add an event
1. Pick a slug: `YYYY-MM-DD-short-name` (lowercase, hyphens), e.g. `2026-11-15-budget-seminar`.
2. If there is a poster or photos, put them in `src/assets/events/<slug>/`. Name them `banner.jpg`, `photo-1.jpg`, `photo-2.jpg` and so on.
   JPG and PNG are fine, and large files get optimised automatically.
3. Create `src/content/events/<slug>.md`, copying the shape of an existing event:
   ```md
   ---
   title:
     en: Union Budget 2027 Seminar
     hi: केंद्रीय बजट 2027 संगोष्ठी
   date: 2027-02-05
   time: "4:00 PM"
   kind: seminar          # seminar | webinar | meeting | community | celebration
   venue:
     en: Merchants' Chamber Hall, Kanpur
     hi: मर्चेंट्स चैंबर हॉल, कानपुर
   summary:
     en: One or two sentences on what the event is about.
     hi: कार्यक्रम का एक-दो वाक्य में परिचय।
   guests:
     - name: { en: "Shri A.B. Sharma", hi: "श्री ए.बी. शर्मा" }
       role: { en: "Speaker · Advocate, High Court", hi: "वक्ता · अधिवक्ता, उच्च न्यायालय" }
   poster: ../../assets/events/2027-02-05-budget-seminar/banner.jpg
   photos:
     - src: ../../assets/events/2027-02-05-budget-seminar/photo-1.jpg
       caption: { en: Members at the seminar, hi: संगोष्ठी में सदस्यगण }
   ---

   Optional longer write-up in English goes here. A Hindi write-up can go in a `body_hi:` field in the front matter.
   ```
   - Put text inside `{ en: ..., hi: ... }` in "quotes" whenever it contains a comma.
   - `poster`, `photos`, `guests`, `time` and `partners` are optional.
4. The event shows as **Upcoming** until its date has passed, then moves to **Past events** by itself
   (the site rebuilds every morning). GitHub pauses that daily rebuild after 60 days without any change to the
   repo. Any push restarts it, or re-enable "Deploy to GitHub Pages" under the repo's **Actions** tab.
   The poster (or the first photo) becomes the preview image when the event link is shared on WhatsApp.
5. **After the event**, add photos to the same folder and list them under `photos:`. They also appear in the Gallery.
6. **Recording**: if the event was recorded and uploaded to YouTube, add `video: https://www.youtube.com/watch?v=...` to the front matter.
   The video plays on the event page, and the event card gets a "Recording" label. Do not use the flyer as `poster` if it
   shows a Zoom ID or passcode (golden rule 3); leave `poster` out instead.

### Add a press clipping
Create `src/content/press/YYYY-MM-DD-outlet-topic.yaml`:
```yaml
outlet: Dainik Jagran
date: 2026-11-16
url: https://example.com/article
language: hi                      # language of the article itself
event: 2026-11-15-budget-seminar  # optional: links the clipping to an event page
headline:
  en: English translation of the headline
  hi: मूल शीर्षक
summary:
  en: One line on what the article covers.
  hi: एक पंक्ति में सार।
```

### Change the committee (after elections, a new role, a correction)
- Edit `src/data/committee.yaml`. **The order in the file is the order on the site.**
- `group` is `office` (top four elected office bearers), `appointed` (members appointed to a role rather than
  elected, e.g. D.K. Pandey, Chairman (Taxation)), `secretary` or `executive`.
- `id` is the name in lowercase with hyphens. Keep ids stable, because `site.yaml` → `contact_people` refers to them.
- `phone` is a 10-digit mobile number in quotes. **Leave it out for women members** (golden rule 1).
- To add a headshot: save it as `src/assets/committee/<id>.jpg` (square, at least 400×400 px) and add
  `photo: ../assets/committee/<id>.jpg` to that person.
- If the President or General Secretary changes, update `contact_people` in `site.yaml` too.

### Update the WhatsApp link, email or address
Edit `src/data/site.yaml`. The WhatsApp button appears on Home and Contact as soon as `whatsapp_url` is set.
The map on the Contact page uses `map_query`, which is the pin as `"latitude,longitude"` (not the address text, because
Google cannot find plot numbers). To set the exact pin: open Google Maps on the office, press and hold (or right-click) the
spot, and copy the two numbers shown.

### Change the About page text
Edit `src/lib/about.ts`. `story` holds one `{ en, hi }` entry per paragraph, in display order, and `teaser` is the short
version on the home page. The "Aims & objectives" list was removed until the Association supplies it. To add it back,
add an `aims` list to `about.ts` (both languages) and render it in `src/pages/[...lang]/about.astro`.

## Preview, check, publish
```sh
npm install          # first time only
npm run dev          # live preview at http://localhost:4321/website/  (Hindi: /website/hi/)
npm run build        # MUST pass before publishing
```
Then, **after the member confirms**:
```sh
git add -A && git commit -m "Add Budget 2027 seminar"
git push
gh run watch         # wait for the deploy to finish, then share the live link
```
Live site: https://the-kanpur-income-tax-and-gst-bar.github.io/website/. It moves to https://thekanpurincometaxandgstbar.com once the domain is live;
the switch-over steps are in `PLAN.md` → Next steps.

## When the build fails
`npm run build` names the file and field, e.g. `events → 2027-02-05-budget-seminar: date: Invalid date`.
The usual causes:
- A comma inside `{ en: ..., hi: ... }` without quotes.
- An image path that doesn't match the real file name. Paths are case-sensitive: `.JPG` ≠ `.jpg`.
- A `kind:` value that isn't in the list.
- A phone number that isn't exactly 10 digits, or isn't in quotes.
- Wrong indentation in YAML (use 2 spaces, never tabs).
