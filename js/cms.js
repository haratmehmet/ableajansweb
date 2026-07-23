/**
 * ABLE AJANS — CMS Content Loader
 * cms.js v1.0
 * localStorage'dan içerik okur ve sayfayı doldurur.
 */

(function () {
  'use strict';

  /* ============================================================
     DEFAULT CONTENT — Admin panelde veri yoksa bunlar gösterilir
  ============================================================ */
  const DEFAULTS = {
    // Site
    'site-title': 'Able Ajans | Yeni Nesil Dijital Çözümler',
    'site-desc': 'Able Ajans — Yazılım, sosyal medya yönetimi, web tasarım, dijital pazarlama ve drone çekimi.',

    // Hero
    'hero-eyebrow': 'Able Ajans · 2026',
    'hero-headline-plain': 'Dijitalde ',
    'hero-headline-accent': 'Güçlü',
    'hero-headline-rest': 'Varoluş Başlıyor',
    'hero-subline': 'İşletmeleri dijital dünyada büyüten yenilikçi çözümler geliştiriyoruz. Yeni web sitemiz çok yakında yayında.',
    'hero-cta-primary-text': 'Bizi Arayın',
    'hero-cta-secondary-text': 'WhatsApp İletişim',
    'hero-phone-link': 'tel:+905458550089',
    'hero-wa-link': 'https://wa.me/905458550089',
    'social-1': 'Güvenilir Ajans',
    'social-2': 'Premium Çözümler',
    'social-3': 'Yenilikçi Yaklaşım',

    // Services
    'services-title-plain': 'Neler ',
    'services-title-accent': 'Yapıyoruz?',
    'services-subtitle': 'İşletmenizi dijital dünyada öne çıkaracak kapsamlı hizmetler sunuyoruz.',

    // About
    'about-title-plain': 'Dijitalde ',
    'about-title-accent': 'Fark Yaratan',
    'about-title-rest': ' Ekip',
    'about-body': 'Able Ajans olarak, işletmelerin dijital dönüşüm yolculuklarında güvenilir bir partner olarak yer alıyoruz. Yazılım geliştirmeden sosyal medya yönetimine, web tasarımından drone çekimine kadar geniş bir yelpazede hizmet sunuyoruz.',
    'about-body-2': 'Genç, dinamik ve yaratıcı ekibimizle her projeye özgün bir bakış açısı getiriyor, müşterilerimizin hedeflerine ulaşmalarını sağlıyoruz.',

    // Refs
    'refs-title-plain': 'Birlikte ',
    'refs-title-accent': 'Başarı',
    'refs-title-rest': ' Yarattıklarımız',
    'refs-subtitle': 'Güvenimizi kazanan markalar ve projeler.',

    // Contact
    'contact-title-plain': 'Projenizi ',
    'contact-title-accent': 'Konuşalım',
    'contact-subtitle': 'Hayalinizdeki dijital deneyimi birlikte inşa edelim.',

    // Footer
    'footer-copy': '© 2026 Able Ajans · Tüm hakları saklıdır.',
  };

  const DEFAULT_SERVICES = [
    { id: 's1', icon: 'code', name: 'Yazılım Geliştirme', desc: 'Web uygulamaları, mobil uygulamalar ve özel yazılım çözümleri geliştiriyoruz.' },
    { id: 's2', icon: 'strategy', name: 'Dijital Strateji', desc: 'İşletmenizin dijital hedeflerine ulaşması için kapsamlı stratejiler oluşturuyoruz.' },
    { id: 's3', icon: 'social', name: 'Sosyal Medya Yönetimi', desc: 'Markanızı sosyal medyada güçlü kılan içerikler ve kampanyalar hazırlıyoruz.' },
    { id: 's4', icon: 'web', name: 'Web Tasarım', desc: 'Modern, hızlı ve kullanıcı dostu web siteleri tasarlıyor ve geliştiriyoruz.' },
    { id: 's5', icon: 'marketing', name: 'Dijital Pazarlama', desc: 'SEO, SEM ve performans pazarlaması ile markanızı büyütüyoruz.' },
    { id: 's6', icon: 'drone', name: 'Drone Çekimi', desc: 'Profesyonel hava fotoğrafçılığı ve video çekimi hizmetleri sunuyoruz.' },
  ];

  const DEFAULT_TEAM = [];
  const DEFAULT_REFS = [];
  const DEFAULT_CONTACT = {
    phone: '+90 545 855 00 89',
    phoneLink: 'tel:+905458550089',
    whatsapp: '+90 545 855 00 89',
    whatsappLink: 'https://wa.me/905458550089',
    email: '',
    emailLink: '',
    address: '',
    mapLink: '',
  };
  const DEFAULT_SOCIAL = [];
  const DEFAULT_STATS = [
    { number: '50+', label: 'Proje' },
    { number: '30+', label: 'Müşteri' },
    { number: '3+', label: 'Yıl' },
  ];

  /* ============================================================
     STORAGE HELPERS
  ============================================================ */
  function get(key, fallback) {
    try {
      const raw = localStorage.getItem('able_cms_' + key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function getString(key) {
    return get(key, DEFAULTS[key] || '');
  }

  /* ============================================================
     ICON SVG MAP
  ============================================================ */
  const ICONS = {
    code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    strategy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
    social: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    web: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    marketing: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    drone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M6.343 6.343a8 8 0 000 11.314M17.657 17.657a8 8 0 000-11.314M6.343 17.657a8 8 0 010-11.314M17.657 6.343a8 8 0 010 11.314"/></svg>`,
    star: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
    whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    map: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    twitter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`,
    youtube: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
    tiktok: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.25 8.25 0 004.83 1.56V6.87a4.85 4.85 0 01-1.06-.18z"/></svg>`,
    link: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  };

  function getIcon(key) {
    return ICONS[key] || ICONS['star'];
  }

  /* ============================================================
     RENDER FUNCTIONS
  ============================================================ */

  // Simple text replacement
  function fillText(sel, val) {
    document.querySelectorAll(sel).forEach(el => { el.textContent = val || ''; });
  }

  // Services Grid
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    const services = get('services', DEFAULT_SERVICES);
    if (!services.length) {
      grid.innerHTML = '<div class="empty-state">Henüz hizmet eklenmedi.</div>';
      return;
    }
    grid.innerHTML = services.map(s => `
      <div class="service-card anim-fade-up" role="listitem">
        <div class="service-card-icon">${getIcon(s.icon || 'star')}</div>
        <div class="service-card-name">${esc(s.name)}</div>
        <div class="service-card-desc">${esc(s.desc)}</div>
      </div>
    `).join('');
  }

  // Team Grid
  function renderTeam() {
    const grid = document.getElementById('teamGrid');
    const statsEl = document.getElementById('aboutStats');
    if (!grid) return;

    const team = get('team', DEFAULT_TEAM);
    if (!team.length) {
      grid.innerHTML = '';
    } else {
      grid.innerHTML = team.map(m => `
        <div class="team-card anim-fade-up">
          ${m.photo
            ? `<img src="${m.photo}" alt="${esc(m.name)}" class="team-avatar">`
            : `<div class="team-avatar-placeholder">${esc(m.name.charAt(0))}</div>`
          }
          <div class="team-name">${esc(m.name)}</div>
          <div class="team-role">${esc(m.role)}</div>
        </div>
      `).join('');
    }

    // Stats
    if (statsEl) {
      const stats = get('stats', DEFAULT_STATS);
      statsEl.innerHTML = stats.map(s => `
        <div class="stat-item">
          <div class="stat-number">${esc(s.number)}</div>
          <div class="stat-label">${esc(s.label)}</div>
        </div>
      `).join('');
    }
  }

  // Referanslar
  function renderRefs() {
    const grid = document.getElementById('refsGrid');
    if (!grid) return;
    const refs = get('refs', DEFAULT_REFS);
    if (!refs.length) {
      grid.innerHTML = '<div class="empty-state">Referanslar yakında eklenecek.</div>';
      return;
    }
    grid.innerHTML = refs.map(r => {
      const initials = r.name ? r.name.substring(0, 2).toUpperCase() : '?';
      const logoHtml = r.logo
        ? `<img src="${r.logo}" alt="${esc(r.name)}" class="ref-logo">`
        : `<div class="ref-logo-placeholder">${initials}</div>`;
      const inner = `
        ${logoHtml}
        <div class="ref-name">${esc(r.name)}</div>
        ${r.desc ? `<div class="ref-desc">${esc(r.desc)}</div>` : ''}
      `;
      return r.url
        ? `<a href="${esc(r.url)}" class="ref-card" target="_blank" rel="noopener noreferrer">${inner}</a>`
        : `<div class="ref-card">${inner}</div>`;
    }).join('');
  }

  // Contact Cards
  function renderContact() {
    const el = document.getElementById('contactCards');
    if (!el) return;
    const c = get('contact', DEFAULT_CONTACT);
    const cards = [];

    if (c.phone) cards.push({ icon: 'phone', label: 'Telefon', value: c.phone, href: c.phoneLink || 'tel:' + c.phone.replace(/\s/g,'') });
    if (c.whatsapp) cards.push({ icon: 'whatsapp', label: 'WhatsApp', value: c.whatsapp, href: c.whatsappLink || 'https://wa.me/' + c.whatsapp.replace(/\D/g,'') });
    if (c.email) cards.push({ icon: 'email', label: 'E-posta', value: c.email, href: c.emailLink || 'mailto:' + c.email });
    if (c.address) cards.push({ icon: 'map', label: 'Adres', value: c.address, href: c.mapLink || null });

    if (!cards.length) {
      el.innerHTML = '<div class="empty-state">İletişim bilgisi eklenmedi.</div>';
      return;
    }

    el.innerHTML = cards.map(card => {
      const tag = card.href ? 'a' : 'div';
      const hrefAttr = card.href ? `href="${esc(card.href)}" ${card.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}` : '';
      return `<${tag} ${hrefAttr} class="contact-card">
        <div class="contact-card-icon">${getIcon(card.icon)}</div>
        <div class="contact-card-label">${card.label}</div>
        <div class="contact-card-value">${esc(card.value)}</div>
      </${tag}>`;
    }).join('');
  }

  // Social Links (iletisim section + footer)
  function renderSocial() {
    const socials = get('social', DEFAULT_SOCIAL);

    const contactSoc = document.getElementById('socialLinks');
    if (contactSoc) {
      if (!socials.length) {
        contactSoc.innerHTML = '';
      } else {
        contactSoc.innerHTML = socials.map(s => `
          <a href="${esc(s.url)}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">
            ${getIcon(s.icon || 'link')}
            ${esc(s.name)}
          </a>
        `).join('');
      }
    }

    const footerSoc = document.getElementById('footerSocialLinks');
    if (footerSoc) {
      footerSoc.innerHTML = socials.map(s => `
        <a href="${esc(s.url)}" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.name)}">
          ${esc(s.name)}
        </a>
      `).join('');
    }
  }

  // CTA hrefs
  function fillHrefs() {
    const contact = get('contact', DEFAULT_CONTACT);
    const phoneLink = contact.phoneLink || DEFAULT_CONTACT.phoneLink;
    const waLink = contact.whatsappLink || DEFAULT_CONTACT.whatsappLink;

    document.querySelectorAll('[data-cms-href="hero-phone-link"]').forEach(el => el.href = phoneLink);
    document.querySelectorAll('[data-cms-href="hero-wa-link"]').forEach(el => el.href = waLink);
  }

  /* ============================================================
     XSS ESCAPING
  ============================================================ */
  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ============================================================
     MAIN INIT
  ============================================================ */
  function init() {
    // --- Simple text fields ---
    document.querySelectorAll('[data-cms]').forEach(el => {
      const key = el.getAttribute('data-cms');
      const val = getString(key);
      if (val) el.textContent = val;
    });

    // --- Page title ---
    const title = getString('site-title');
    if (title) document.title = title;

    // --- Render dynamic sections ---
    renderServices();
    renderTeam();
    renderRefs();
    renderContact();
    renderSocial();
    fillHrefs();

    // --- Nav links from CMS ---
    const navItems = get('nav-links', null);
    if (navItems && navItems.length) {
      const desktopNav = document.getElementById('navLinks');
      const mobileNav = document.querySelector('.mobile-nav-links');
      const linkHtml = navItems.map((item, i) =>
        `<li><a href="${esc(item.href)}" class="nav-link" data-section="${esc(item.section || '')}">${esc(item.label)}</a></li>`
      ).join('');
      const mobHtml = navItems.map(item =>
        `<li class="mob-link-item"><a href="${esc(item.href)}" class="mobile-nav-link" data-section="${esc(item.section || '')}">${esc(item.label)}</a></li>`
      ).join('');
      if (desktopNav) desktopNav.innerHTML = linkHtml;
      if (mobileNav) mobileNav.innerHTML = mobHtml;
    }
  }

  // Run before DOM is complete (data-cms attributes on static elements)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for script.js to call after preloader
  window.CMS = { init };

})();
