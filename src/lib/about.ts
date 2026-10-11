/**
 * The Association's story, shown on the About page (one paragraph per entry)
 * and, in short form, on the home page. Every paragraph needs both languages.
 * A member should check the Hindi (names especially).
 */
type Text = { en: string; hi: string };

export const story: Text[] = [
  {
    en: 'The Kanpur Income Tax and GST Bar Association was founded in 2019 by Adv. Rajesh Kumar Srivastava, Adv. Pankaj Kumar Srivastava, Adv. Ramji Singh and other members.',
    hi: 'द कानपुर इनकम टैक्स एंड जीएसटी बार एसोसिएशन की स्थापना वर्ष 2019 में अधिवक्ता राजेश कुमार श्रीवास्तव, अधिवक्ता पंकज कुमार श्रीवास्तव, अधिवक्ता रामजी सिंह और अन्य सदस्यों ने मिलकर की।',
  },
  {
    en: 'At that time no income tax association in Kanpur was registered with the Bar Council of Uttar Pradesh, which was causing difficulty for members. The members met and decided to form an association for Income Tax and GST and to register it with the Bar Council of Uttar Pradesh.',
    hi: 'उस समय कानपुर में आयकर की कोई भी एसोसिएशन बार काउंसिल ऑफ उत्तर प्रदेश से पंजीकृत नहीं थी, जिससे सदस्यों को दिक्कत हो रही थी। इस पर सदस्यों ने बैठक की और तय किया कि आयकर और जीएसटी की एक संस्था बनाई जाए और उसे बार काउंसिल ऑफ उत्तर प्रदेश से पंजीकृत कराया जाए।',
  },
  {
    en: 'It is the first Income Tax and GST association in Kanpur to be registered with the Bar Council of Uttar Pradesh. Membership is open only to advocates who practise Income Tax and GST law.',
    hi: 'कानपुर में आयकर और जीएसटी की यह पहली संस्था है जो बार काउंसिल ऑफ उत्तर प्रदेश से पंजीकृत हुई। इसकी सदस्यता केवल उन अधिवक्ताओं के लिए है जो आयकर और जीएसटी की प्रैक्टिस करते हैं।',
  },
  {
    en: 'The oath-taking ceremony for 2026–27 was held in May 2026. The chief guest was Senior Advocate Shri P.M. Chaudhary, former President of the Sales Tax Bar Association.',
    hi: 'संस्था का शपथ ग्रहण समारोह मई 2026 में संपन्न हुआ, जो वर्ष 2026-27 के लिए था। समारोह के मुख्य अतिथि वरिष्ठ अधिवक्ता श्री पी.एम. चौधरी, पूर्व अध्यक्ष, सेल्स टैक्स बार एसोसिएशन थे।',
  },
  {
    en: 'Since then the Association has held a number of programmes, and it will keep doing so.',
    hi: 'इसके बाद एसोसिएशन ने कई कार्यक्रम आयोजित किए हैं और आगे भी करती रहेगी।',
  },
];

/** Short version for the home page. */
export const teaser: Text = {
  en: 'The Association was founded in 2019 by advocates practising Income Tax and GST law in Kanpur. It is registered with the Bar Council of Uttar Pradesh, and membership is open only to advocates.',
  hi: 'एसोसिएशन की स्थापना 2019 में कानपुर के आयकर और जीएसटी अधिवक्ताओं ने की। यह बार काउंसिल ऑफ उत्तर प्रदेश से पंजीकृत है, और सदस्यता केवल अधिवक्ताओं के लिए है।',
};
