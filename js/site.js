/* Site behaviour: language switch, shared header and footer, and the lists
   (events, notices, gallery, committee, contact) drawn from js/data.js. */
(function () {
  'use strict';

  var DATA = window.SITE_DATA || {};
  var STR = window.SITE_STRINGS;
  var LANGS = ['hi', 'en'];
  var IST = 'Asia/Kolkata';
  var PAGES = [
    ['home', 'index.html'],
    ['about', 'about.html'],
    ['notices', 'notices.html'],
    ['events', 'events.html'],
    ['gallery', 'gallery.html'],
    ['contact', 'contact.html']
  ];
  var page = document.body.getAttribute('data-page') || 'home';
  var lang = initialLang();

  /* ---------- language ---------- */

  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) > -1) { save(q); return q; }
    try {
      var s = localStorage.getItem('kit-lang');
      if (LANGS.indexOf(s) > -1) return s;
    } catch (e) { /* storage unavailable */ }
    return 'hi';
  }
  function save(l) { try { localStorage.setItem('kit-lang', l); } catch (e) { /* ignore */ } }

  function t(key) {
    if (STR[lang] && STR[lang][key] != null) return STR[lang][key];
    return STR.en[key] != null ? STR.en[key] : key;
  }
  function tx(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.en || v.hi || '';
  }

  /* ---------- small DOM helpers ---------- */

  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'text') n.textContent = v;
      else if (k === 'class') n.className = v;
      else n.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) {
      if (c == null || c === false) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }

  /* ---------- dates (all shown in India time) ---------- */

  function locale() { return lang === 'hi' ? 'hi-IN' : 'en-IN'; }
  function parse(s) { return new Date(s.length <= 10 ? s + 'T00:00:00+05:30' : s); }
  function hasTime(s) { return s.length > 10; }
  function fmtDate(s, opts) {
    return new Intl.DateTimeFormat(locale(), Object.assign({ timeZone: IST }, opts)).format(parse(s));
  }
  var LONG = { day: 'numeric', month: 'long', year: 'numeric' };
  function fmtTime(s) {
    return new Intl.DateTimeFormat(locale(), { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true }).format(parse(s));
  }
  function endOf(ev) {
    var st = parse(ev.start);
    return hasTime(ev.start) ? new Date(st.getTime() + 3 * 3600e3) : new Date(st.getTime() + 24 * 3600e3 - 1);
  }
  function isUpcoming(ev) { return endOf(ev) > new Date(); }
  function newestFirst(a, b) { return parse(b.start || b.date) - parse(a.start || a.date); }

  /* ---------- shared header and footer ---------- */

  function seal(id) {
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' +
      '<defs><path id="' + id + '" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"/></defs>' +
      '<circle cx="50" cy="50" r="48" fill="#1B2A6B"/>' +
      '<circle cx="50" cy="50" r="44" fill="none" stroke="#B8892B" stroke-width="1.2"/>' +
      '<circle cx="50" cy="50" r="27" fill="none" stroke="#B8892B" stroke-width="1"/>' +
      '<text font-family="Mukta,sans-serif" font-size="8.4" font-weight="600" fill="#fff" letter-spacing="1" text-anchor="middle">' +
      '<textPath href="#' + id + '" startOffset="25%">KANPUR INCOME TAX &amp; GST BAR</textPath></text>' +
      '<text x="50" y="48" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#fff" text-anchor="middle">KIT</text>' +
      '<text x="50" y="64" font-family="Georgia,serif" font-size="15" font-weight="700" fill="#B8892B" text-anchor="middle">GST</text>' +
      '</svg>';
  }

  function buildHeader() {
    var host = $('site-header');
    if (!host) return;
    host.className = 'site-header';
    var brand = h('a', { class: 'brand', href: 'index.html' });
    brand.innerHTML = seal('ring-h');
    brand.appendChild(h('span', { class: 'brand-name', 'data-i18n': 'org.short' }));

    var nav = h('nav', { class: 'nav', id: 'site-nav', 'data-i18n-aria': 'ui.mainNav' });
    PAGES.forEach(function (p) {
      nav.appendChild(h('a', { href: p[1], 'data-i18n': 'nav.' + p[0], 'aria-current': p[0] === page ? 'page' : null }));
    });

    var langBox = h('div', { class: 'lang', role: 'group', 'data-i18n-aria': 'ui.langLabel' }, [
      h('button', { type: 'button', 'data-lang': 'hi', lang: 'hi', text: 'हिंदी' }),
      h('button', { type: 'button', 'data-lang': 'en', lang: 'en', text: 'English' })
    ]);
    langBox.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (b) setLang(b.getAttribute('data-lang'));
    });

    var menu = h('button', { type: 'button', class: 'menu-btn', 'aria-expanded': 'false', 'aria-controls': 'site-nav', 'data-i18n': 'ui.menu' });
    menu.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });

    host.appendChild(h('div', { class: 'container header-row' }, [brand, nav, langBox, menu]));
  }

  function buildFooter() {
    var host = $('site-footer');
    if (!host) return;
    host.className = 'site-footer';
    var brand = h('div', { class: 'footer-brand' });
    brand.innerHTML = seal('ring-f');
    brand.appendChild(h('span', { class: 'footer-name', 'data-i18n': 'org.name' }));

    var list = h('ul', { class: 'footer-nav' });
    PAGES.forEach(function (p) {
      list.appendChild(h('li', null, [h('a', { href: p[1], 'data-i18n': 'nav.' + p[0] })]));
    });

    host.appendChild(h('div', { class: 'container footer-row' }, [
      brand,
      h('nav', { 'data-i18n-aria': 'ui.mainNav' }, [list]),
      h('p', { class: 'footer-rights' }, [
        '© ' + new Date().getFullYear() + ' ',
        h('span', { 'data-i18n': 'org.name' }),
        ' ',
        h('span', { 'data-i18n': 'footer.rights' })
      ])
    ]));
  }

  /* ---------- apply language to fixed text ---------- */

  function applyStatic() {
    document.documentElement.lang = lang;
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (n) {
      n.textContent = t(n.getAttribute('data-i18n'));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (n) {
      n.setAttribute('aria-label', t(n.getAttribute('data-i18n-aria')));
    });
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    var key = 'title.' + page;
    document.title = (page === 'home' ? t('org.name') : t(key) + ' | ' + t('org.short'));
    var alt = $('hero-alt');
    if (alt) {
      var other = lang === 'hi' ? 'en' : 'hi';
      alt.textContent = STR[other]['org.name'];
      alt.setAttribute('lang', other);
    }
  }

  /* ---------- list renderers ---------- */

  function fact(label, value) {
    return h('p', { class: 'fact' }, [h('span', { class: 'fact-label', text: label }), value]);
  }

  function eventRow(ev, detailed) {
    var main = h('div', null, [h('h3', { class: 'ledger-title', text: tx(ev.title) })]);
    if (detailed) {
      if (ev.speaker) main.appendChild(fact(t('events.speaker'), tx(ev.speaker)));
      if (hasTime(ev.start)) main.appendChild(fact(t('events.time'), fmtTime(ev.start) + ' ' + t('ui.ist')));
      if (ev.mode) main.appendChild(fact(t('events.mode'), t('mode.' + ev.mode)));
      if (ev.description) main.appendChild(h('p', { class: 'ledger-text', text: tx(ev.description) }));
      if (ev.album) main.appendChild(h('p', null, [h('a', { href: 'gallery.html#' + ev.album, text: t('events.viewPhotos') })]));
    } else {
      var sub = ev.speaker ? tx(ev.speaker) : tx(ev.description);
      if (sub) main.appendChild(h('p', { class: 'ledger-sub', text: sub }));
    }
    return h('li', null, [
      h('div', { class: 'ledger-date', text: fmtDate(ev.start, LONG) }),
      main,
      ev.kind ? h('span', { class: 'tag', text: t('kind.' + ev.kind) }) : null
    ]);
  }

  function noticeRow(n) {
    var main = h('div', null, [h('h3', { class: 'ledger-title', text: tx(n.title) })]);
    if (n.summary) main.appendChild(h('p', { class: 'ledger-sub', text: tx(n.summary) }));
    if (n.file) main.appendChild(h('p', { class: 'ledger-text' }, [h('a', { href: n.file, text: t('notices.openFile') })]));
    return h('li', null, [h('div', { class: 'ledger-date', text: fmtDate(n.date, LONG) }), main, h('span')]);
  }

  function fillLedger(host, rows, emptyKey) {
    clear(host);
    if (!rows.length) { host.appendChild(h('p', { class: 'empty', text: t(emptyKey) })); return; }
    host.appendChild(h('ul', { class: 'ledger' }, rows));
  }

  function renderBoard() {
    var slot = $('board-content');
    if (!slot) return;
    clear(slot);
    var events = (DATA.events || []).slice().sort(newestFirst);
    var upcoming = events.filter(isUpcoming).sort(function (a, b) { return parse(a.start) - parse(b.start); })[0];
    var ev = upcoming || events[0];
    if (!ev) { slot.appendChild(h('p', { text: t('board.none') })); return; }
    slot.appendChild(h('p', { class: 'board-kind', text: t(upcoming ? 'board.upcoming' : 'board.latest') }));
    slot.appendChild(h('h2', { text: tx(ev.title) }));
    slot.appendChild(h('p', { text: fmtDate(ev.start, LONG) }));
    if (hasTime(ev.start)) slot.appendChild(h('p', { text: fmtTime(ev.start) + ' ' + t('ui.ist') }));
    if (ev.speaker) slot.appendChild(h('p', { text: tx(ev.speaker) }));
  }

  function renderHome() {
    renderBoard();
    var events = (DATA.events || []).slice().sort(newestFirst).slice(0, 3);
    fillLedger($('home-events'), events.map(function (e) { return eventRow(e, false); }), 'board.none');
    var notices = (DATA.notices || []).slice().sort(function (a, b) { return parse(b.date) - parse(a.date); }).slice(0, 3);
    fillLedger($('home-notices'), notices.map(noticeRow), 'notices.empty');
  }

  function renderAbout() {
    var host = $('committee');
    clear(host);
    var people = DATA.committee || [];
    if (!people.length) { host.appendChild(h('p', { class: 'empty', text: t('about.committeeEmpty') })); return; }
    host.appendChild(h('ul', { class: 'people' }, people.map(function (p) {
      return h('li', { class: 'person' }, [
        p.photo ? h('img', { src: p.photo, alt: '', width: 96, height: 96, loading: 'lazy' }) : null,
        h('p', { class: 'person-name', text: tx(p.name) }),
        h('p', { class: 'person-role', text: tx(p.role) })
      ]);
    })));
  }

  function renderNotices() {
    var rows = (DATA.notices || []).slice().sort(function (a, b) { return parse(b.date) - parse(a.date); }).map(noticeRow);
    fillLedger($('notice-list'), rows, 'notices.empty');
  }

  function renderEvents() {
    var events = (DATA.events || []).slice();
    var up = events.filter(isUpcoming).sort(function (a, b) { return parse(a.start) - parse(b.start); });
    var past = events.filter(function (e) { return !isUpcoming(e); }).sort(newestFirst);
    fillLedger($('events-upcoming'), up.map(function (e) { return eventRow(e, true); }), 'events.upcomingEmpty');
    fillLedger($('events-past'), past.map(function (e) { return eventRow(e, true); }), 'board.none');
  }

  var lightbox;
  function openPhoto(photo) {
    if (!lightbox) {
      var img = h('img', { alt: '' });
      var cap = h('p');
      var close = h('button', { type: 'button' });
      lightbox = h('dialog', { class: 'lightbox' }, [img, cap, close]);
      close.addEventListener('click', function () { lightbox.close(); });
      lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
      document.body.appendChild(lightbox);
    }
    var parts = lightbox.children;
    parts[0].src = photo.src;
    parts[0].alt = tx(photo.alt);
    parts[1].textContent = tx(photo.alt);
    parts[2].textContent = t('gallery.close');
    lightbox.showModal();
  }

  function renderGallery() {
    var host = $('albums');
    clear(host);
    var albums = (DATA.albums || []).slice().sort(newestFirst);
    if (!albums.length) { host.appendChild(h('p', { class: 'empty', text: t('gallery.empty') })); return; }
    albums.forEach(function (a) {
      var grid = h('div', { class: 'photos' });
      if (a.photos && a.photos.length) {
        a.photos.forEach(function (p) {
          var btn = h('button', { type: 'button', class: 'photo-btn', 'aria-label': tx(p.alt) }, [
            h('img', { src: p.src, alt: tx(p.alt), loading: 'lazy' })
          ]);
          btn.addEventListener('click', function () { openPhoto(p); });
          grid.appendChild(btn);
        });
      } else {
        for (var i = 0; i < 6; i++) grid.appendChild(h('div', { class: 'frame', 'aria-hidden': 'true' }));
      }
      host.appendChild(h('section', { class: 'album', id: a.id }, [
        h('h2', { text: tx(a.title) }),
        h('p', { class: 'album-meta', text: fmtDate(a.date, LONG) + (a.photos && a.photos.length ? '' : ' – ' + t('gallery.soon')) }),
        grid
      ]));
    });
    if (location.hash) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView();
    }
  }

  function renderContact() {
    var host = $('contact-info');
    clear(host);
    var c = DATA.contact || {};
    var rows = [[t('contact.city'), t('contact.cityValue'), null]];
    if (c.address && tx(c.address)) rows.push([t('contact.address'), tx(c.address), null]);
    if (c.phone) rows.push([t('contact.phone'), c.phone, 'tel:' + c.phone.replace(/[^+\d]/g, '')]);
    if (c.email) rows.push([t('contact.email'), c.email, 'mailto:' + c.email]);
    host.appendChild(h('dl', { class: 'contact-list' }, rows.map(function (r) {
      return h('div', { class: 'contact-row' }, [
        h('dt', { text: r[0] }),
        h('dd', null, [r[2] ? h('a', { href: r[2], text: r[1] }) : r[1]])
      ]);
    })));
    if (rows.length === 1) host.appendChild(h('p', { class: 'empty', style: 'margin-top:24px', text: t('contact.more') }));
  }

  var RENDER = {
    home: renderHome, about: renderAbout, notices: renderNotices,
    events: renderEvents, gallery: renderGallery, contact: renderContact
  };

  function renderPage() { if (RENDER[page]) RENDER[page](); }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    save(l);
    applyStatic();
    renderPage();
  }

  buildHeader();
  buildFooter();
  applyStatic();
  renderPage();
})();
