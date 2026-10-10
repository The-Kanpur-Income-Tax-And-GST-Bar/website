export type Lang = 'en' | 'hi';
export type Text = { en: string; hi?: string };

/** getStaticPaths for pages under src/pages/[...lang]: English at the root, Hindi under /hi/. */
export function langPaths() {
  return [{ params: { lang: undefined } }, { params: { lang: 'hi' } }];
}

export function getLang(param: string | undefined): Lang {
  return param === 'hi' ? 'hi' : 'en';
}

/** Pick the right language, falling back to English when Hindi is missing. */
export function t(text: Text | undefined, lang: Lang): string {
  if (!text) return '';
  return lang === 'hi' ? (text.hi ?? text.en) : text.en;
}

/** Site URL for a language-neutral path such as '' or 'events/some-slug'. */
export function href(lang: Lang, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/|\/$/g, '');
  const parts = [lang === 'hi' ? 'hi' : '', clean].filter(Boolean).join('/');
  return `${base}/${parts}${parts ? '/' : ''}`;
}

export function formatDate(date: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { ...opts, timeZone: 'UTC' }).format(date);
}
