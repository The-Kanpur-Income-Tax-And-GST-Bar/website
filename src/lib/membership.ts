/**
 * Membership page text. Every entry needs both languages.
 * A member should check the Hindi.
 *
 * To change a fee, edit the numbers in `fees` below.
 * The application form is the PDF in public/membership/membership-application-form.pdf
 * and the payment QR is public/membership/payment-qr.jpg. To replace either, save the new file with the same name.
 */
type Text = { en: string; hi: string };

export const intro: Text = {
  en: 'Advocates who practise Income Tax and GST law are welcome to become members of the Association. The Association promotes professional knowledge in tax law, protects the interests of its members, encourages mutual cooperation, and holds discussions, seminars and educational programmes on Income Tax and GST.',
  hi: 'आयकर एवं जीएसटी विधि में प्रैक्टिस करने वाले अधिवक्ताओं का एसोसिएशन की सदस्यता ग्रहण करने के लिए स्वागत है। एसोसिएशन का उद्देश्य कर संबंधी व्यावसायिक ज्ञान को बढ़ावा देना, सदस्यों के हितों की रक्षा करना, आपसी सहयोग को प्रोत्साहित करना तथा आयकर एवं जीएसटी से संबंधित विषयों पर विचार-विमर्श, संगोष्ठियाँ एवं शैक्षणिक कार्यक्रम आयोजित करना है।',
};

export const fees = [
  {
    title: { en: 'New membership', hi: 'नई सदस्यता' },
    amount: '₹1,000',
    words: { en: 'One thousand rupees only', hi: 'रुपये एक हजार मात्र' },
    note: {
      en: 'Includes the entry fee and the annual subscription for the first year.',
      hi: 'इसमें प्रवेश शुल्क एवं प्रथम वर्ष का वार्षिक सदस्यता शुल्क शामिल है।',
    },
  },
  {
    title: { en: 'Annual renewal', hi: 'वार्षिक नवीनीकरण' },
    amount: '₹500',
    words: { en: 'Five hundred rupees only', hi: 'रुपये पाँच सौ मात्र' },
    note: {
      en: 'Membership renewal fee for every following year.',
      hi: 'आगामी प्रत्येक वर्ष का सदस्यता नवीनीकरण शुल्क।',
    },
  },
];

export const steps: Text[] = [
  {
    en: 'Download the Application Form for Permanent Membership, print it and fill it in. Stick a recent photograph on it and sign across it.',
    hi: 'स्थायी सदस्यता का आवेदन पत्र डाउनलोड करें, उसका प्रिंट लें और भरें। उस पर हाल की फोटो लगाकर हस्ताक्षर करें।',
  },
  {
    en: 'Fill in your name, father or husband name, date of birth, address, mobile number, date of enrolment, enrolment number, C.O.P. number, name of your Bar Council and Aadhaar number.',
    hi: 'अपना नाम, पिता/पति का नाम, जन्म तिथि, पता, मोबाइल नंबर, नामांकन की तिथि, नामांकन संख्या, C.O.P. संख्या, बार काउंसिल का नाम और आधार संख्या भरें।',
  },
  {
    en: 'Attach a photocopy of your certificate of enrolment and a photocopy of your Aadhaar card.',
    hi: 'अपने नामांकन प्रमाण पत्र की फोटोकॉपी और आधार कार्ड की फोटोकॉपी संलग्न करें।',
  },
  {
    en: 'Pay the prescribed membership fee by scanning the QR code on this page. Keep the payment receipt or screenshot and give it along with the form.',
    hi: 'इस पृष्ठ पर दिए गए क्यूआर कोड को स्कैन करके निर्धारित सदस्यता शुल्क का भुगतान करें। भुगतान की रसीद या स्क्रीनशॉट अपने पास रखें और फॉर्म के साथ दें।',
  },
  {
    en: 'Give the completed form to the General Secretary at the registered office. Your application will be checked, and membership is confirmed once it is approved under the Association’s constitution and rules.',
    hi: 'भरा हुआ फॉर्म पंजीकृत कार्यालय पर महासचिव को सौंपें। आवेदन की जाँच के बाद, एसोसिएशन के संविधान एवं नियमावली के अनुसार स्वीकृति मिलने पर सदस्यता की पुष्टि की जाएगी।',
  },
];

export const importantNote: Text = {
  en: 'Membership is subject to the Association’s constitution and rules. Any change in the membership fee takes effect only after approval by the competent authority.',
  hi: 'सदस्यता की स्वीकृति एसोसिएशन के लागू संविधान एवं नियमावली के अधीन होगी। सदस्यता शुल्क में किसी भी परिवर्तन को सक्षम प्राधिकारी की स्वीकृति के बाद ही लागू किया जाएगा।',
};
