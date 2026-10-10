# The Kanpur Income Tax and GST Bar Association (Regd.): website

A plain HTML, CSS and JavaScript website in Hindi and English. There is nothing to install or build.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| About and executive committee | `about.html` |
| Notices and circulars | `notices.html` |
| Events and webinars | `events.html` |
| Gallery | `gallery.html` |
| Contact | `contact.html` |

Visitors switch between Hindi and English with the button in the header. The choice is remembered. A link such as `index.html?lang=en` opens the page in English.

## How to update the site

All changing content lives in one file: **`js/data.js`**. Copy an existing entry, change the text (Hindi and English), and save.

- **New event or webinar**: add a block to `events`.
- **New notice or circular**: add a block to `notices`. To attach a PDF, put it in `assets/notices/` and write its path in `file`.
- **Photos of an event**: put the pictures in `assets/photos/<album-id>/`, then list them in that album under `albums`.
- **Executive committee**: add one block per person to `committee`.
- **Email, phone and address**: fill them in under `contact`. Empty values stay hidden.

Fixed text (menus, headings, descriptions) is in `js/strings.js`, Hindi and English side by side.

Upcoming and past events sort themselves by date. The notice board on the home page always shows the next event, or the latest one when nothing is upcoming.

## Look at the site on your computer

```
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Put it online (GitHub Pages)

In the repository, open Settings, then Pages, choose the `main` branch and the root folder, and save. The site appears at the address GitHub shows there. A custom domain name can be added on the same screen.
