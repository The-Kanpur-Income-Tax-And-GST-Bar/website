/* The content of the site. To add an event, notice, photo or committee member,
   copy an existing entry, change the text, and save. Nothing else needs editing.
   Every text field has a Hindi (hi) and an English (en) version.
   Dates are written as "YYYY-MM-DD", or with a time as "YYYY-MM-DDTHH:MM:00+05:30" (India time). */
window.SITE_DATA = {

  /* Leave a value empty ("") to hide that row on the Contact page. */
  contact: {
    email: "",
    phone: "",
    address: { hi: "", en: "" }
  },

  /* Executive committee. Add one block per person, in the order they should appear.
     photo is optional, for example "assets/photos/committee/name.jpg". */
  committee: [
    // { name: { hi: "श्री ...", en: "Shri ..." }, role: { hi: "अध्यक्ष", en: "President" }, photo: "" },
  ],

  /* Events, in any order; the site sorts them by date.
     kind: "webinar" or "programme".  mode (optional): "zoom" or "inperson".
     album (optional): the id of an album below, to link to its photos. */
  events: [
    {
      id: "gst-council-webinar-2026-10-10",
      start: "2026-10-10T15:00:00+05:30",
      kind: "webinar",
      mode: "zoom",
      title: {
        hi: "जी.एस.टी. काउंसिल बैठक 2026: निर्णय और प्रभाव",
        en: "GST Council Meeting 2026: Decisions and Impact"
      },
      speaker: {
        hi: "श्री डी.के. पाण्डेय, अधिवक्ता उच्च न्यायालय, चेयरमैन टैक्सेशन",
        en: "Shri D.K. Pandey, Advocate High Court, Chairman Taxation"
      },
      description: {
        hi: "जी.एस.टी. काउंसिल की बैठक में लिए गए निर्णयों और उनके प्रभाव पर चर्चा।",
        en: "A discussion of the decisions taken at the GST Council meeting and their impact."
      }
    },
    {
      id: "plantation-2026-10-09",
      start: "2026-10-09",
      kind: "programme",
      title: {
        hi: "वृक्षारोपण कार्यक्रम",
        en: "Plantation programme"
      },
      description: {
        hi: "एसोसिएशन द्वारा आयोजित वृक्षारोपण कार्यक्रम।",
        en: "Plantation programme organised by the association."
      },
      album: "plantation-2026-10-09"
    }
  ],

  /* Notices and circulars. file (optional) is a PDF placed in the assets folder,
     for example "assets/notices/circular-01.pdf". */
  notices: [
    {
      date: "2026-10-10",
      title: {
        hi: "जी.एस.टी. काउंसिल बैठक 2026 पर वेबिनार",
        en: "Webinar on the GST Council Meeting 2026"
      },
      summary: {
        hi: "10 अक्टूबर 2026 को अपराह्न 3:00 बजे (भारतीय समय) ज़ूम वेबिनार, वक्ता श्री डी.के. पाण्डेय।",
        en: "Zoom webinar on 10 October 2026 at 3:00 PM (IST), with Shri D.K. Pandey as speaker."
      },
      file: ""
    }
  ],

  /* Photo albums. Put the pictures in assets/photos/<album-id>/ and list them here.
     An album with no photos shows empty frames and a "photos coming soon" line. */
  albums: [
    {
      id: "plantation-2026-10-09",
      date: "2026-10-09",
      title: { hi: "वृक्षारोपण कार्यक्रम", en: "Plantation programme" },
      photos: [
        // { src: "assets/photos/plantation-2026-10-09/01.jpg", alt: { hi: "पौधा लगाते सदस्य", en: "Members planting a sapling" } },
      ]
    }
  ]
};
