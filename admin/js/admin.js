/**
 * ABLE AJANS — Admin Panel Logic
 * admin.js v1.0
 */

(function () {
  'use strict';

  /* ============================================================
     STORAGE HELPERS
  ============================================================ */
  const PREFIX = 'able_cms_';

  function save(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); return true; }
    catch(e) { console.error(e); return false; }
  }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function savePass(p) { localStorage.setItem('able_admin_pass', p); }
  function loadPass() { return localStorage.getItem('able_admin_pass') || 'able2026'; }
  function saveToken(t) { sessionStorage.setItem('able_admin_token', t); }
  function loadToken() { return sessionStorage.getItem('able_admin_token'); }
  function clearToken() { sessionStorage.removeItem('able_admin_token'); }

  /* ============================================================
     DEFAULTS
  ============================================================ */
  const DEF_SERVICES = [
    { id: uid(), icon: 'code', name: 'Yazılım Geliştirme', desc: 'Web uygulamaları, mobil uygulamalar ve özel yazılım çözümleri geliştiriyoruz.' },
    { id: uid(), icon: 'strategy', name: 'Dijital Strateji', desc: 'İşletmenizin dijital hedeflerine ulaşması için kapsamlı stratejiler oluşturuyoruz.' },
    { id: uid(), icon: 'social', name: 'Sosyal Medya Yönetimi', desc: 'Markanızı sosyal medyada güçlü kılan içerikler ve kampanyalar hazırlıyoruz.' },
    { id: uid(), icon: 'web', name: 'Web Tasarım', desc: 'Modern, hızlı ve kullanıcı dostu web siteleri tasarlıyor ve geliştiriyoruz.' },
    { id: uid(), icon: 'marketing', name: 'Dijital Pazarlama', desc: 'SEO, SEM ve performans pazarlaması ile markanızı büyütüyoruz.' },
    { id: uid(), icon: 'drone', name: 'Drone Çekimi', desc: 'Profesyonel hava fotoğrafçılığı ve video çekimi hizmetleri sunuyoruz.' },
  ];

  const DEF_STATS = [
    { id: uid(), number: '50+', label: 'Proje' },
    { id: uid(), number: '30+', label: 'Müşteri' },
    { id: uid(), number: '3+', label: 'Yıl' },
  ];

  const DEF_NAV = [
    { id: uid(), label: 'Ana Sayfa', href: '#hero', section: 'hero' },
    { id: uid(), label: 'Hizmetler', href: '#hizmetler', section: 'hizmetler' },
    { id: uid(), label: 'Biz Kimiz', href: '#hakkimizda', section: 'hakkimizda' },
    { id: uid(), label: 'Referanslar', href: '#referanslar', section: 'referanslar' },
    { id: uid(), label: 'İletişim', href: '#iletisim', section: 'iletisim' },
  ];

  const DEF_CONTACT = {
    phone: '+90 545 855 00 89',
    phoneLink: 'tel:+905458550089',
    whatsapp: '+90 545 855 00 89',
    whatsappLink: 'https://wa.me/905458550089',
    email: '', emailLink: '',
    address: '', mapLink: '',
  };

  /* ============================================================
     UTILITY
  ============================================================ */
  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function toast(msg, type = 'success') {
    const el = document.getElementById('toast');
    el.textContent = (type === 'success' ? '✓ ' : '✕ ') + msg;
    el.className = 'toast show ' + type;
    setTimeout(() => { el.classList.remove('show'); }, 3000);
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setVal(id, v) {
    const el = document.getElementById(id);
    if (el) el.value = v || '';
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  /* ============================================================
     ICON SVG STRINGS
  ============================================================ */
  const ICONS = {
    code: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    strategy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M20 12h-2M6 12H4M17.66 17.66l1.41 1.41M4.93 6.34l1.41 1.41M12 20v-2M12 4V2"/></svg>`,
    social: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
    web: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    marketing: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    drone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M6.343 6.343a8 8 0 000 11.314M17.657 17.657a8 8 0 000-11.314M6.343 17.657a8 8 0 010-11.314M17.657 6.343a8 8 0 010 11.314"/></svg>`,
    star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    camera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    video: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
    chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  };

  const ICON_LABELS = { code:'Kod', strategy:'Strateji', social:'Sosyal', web:'Web', marketing:'Pazarlama', drone:'Drone', star:'Yıldız', camera:'Fotoğraf', video:'Video', chart:'Grafik', mail:'Mail' };
  const SOC_ICONS = ['instagram','linkedin','twitter','youtube','tiktok','link'];
  const SOC_LABELS = { instagram:'Instagram', linkedin:'LinkedIn', twitter:'X/Twitter', youtube:'YouTube', tiktok:'TikTok', link:'Diğer' };

  /* ============================================================
     LOGIN
  ============================================================ */
  function checkAuth() {
    if (loadToken() === 'authenticated') {
      showAdmin();
    }
  }

  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('loginPass').value;
    const errEl = document.getElementById('loginError');
    if (pass === loadPass()) {
      saveToken('authenticated');
      errEl.textContent = '';
      showAdmin();
    } else {
      errEl.textContent = 'Hatalı şifre. Tekrar deneyin.';
      document.getElementById('loginPass').value = '';
      document.getElementById('loginPass').focus();
    }
  });

  // Toggle password visibility
  document.getElementById('togglePass')?.addEventListener('click', () => {
    const input = document.getElementById('loginPass');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  function showAdmin() {
    document.getElementById('loginScreen').style.display = 'none';
    const shell = document.getElementById('adminShell');
    shell.style.display = 'flex';
    initAdmin();
  }

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearToken();
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminShell').style.display = 'none';
    document.getElementById('loginPass').value = '';
  });

  /* ============================================================
     SIDEBAR & NAVIGATION
  ============================================================ */
  function initAdmin() {
    setupSidebar();
    setupPanels();
    loadAllPanels();
    renderDashboard();
  }

  function setupSidebar() {
    const topbarMenu = document.getElementById('topbarMenu');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const overlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }

    topbarMenu?.addEventListener('click', openSidebar);
    sidebarClose?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);
  }

  function setupPanels() {
    document.querySelectorAll('[data-panel]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.dataset.panel;
        switchPanel(key);
        // close sidebar on mobile
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('open');
      });
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
      btn.addEventListener('click', () => switchPanel(btn.dataset.goto));
    });
  }

  function switchPanel(key) {
    // Nav items
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.panel === key);
    });
    // Panels
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.remove('active');
    });
    const target = document.getElementById('panel' + cap(key));
    if (target) target.classList.add('active');

    // Update topbar title
    const titles = {
      dashboard: 'Dashboard', hero: 'Hero / Ana Sayfa', services: 'Hizmetler',
      about: 'Biz Kimiz & Ekip', refs: 'Referanslar', contact: 'İletişim Bilgileri',
      social: 'Sosyal Medya', 'nav-editor': 'Navigasyon Menüsü', settings: 'Genel Ayarlar',
    };
    const topbarTitle = document.getElementById('topbarTitle');
    if (topbarTitle) topbarTitle.textContent = titles[key] || key;
  }

  function cap(str) {
    if (!str) return '';
    const parts = str.split('-');
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('-');
  }

  /* ============================================================
     DASHBOARD
  ============================================================ */
  function renderDashboard() {
    const services = load('services', DEF_SERVICES);
    const team     = load('team', []);
    const refs     = load('refs', []);
    const social   = load('social', []);
    const contact  = load('contact', DEF_CONTACT);

    const stats = [
      { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`, num: services.length, label: 'Hizmet' },
      { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`, num: team.length, label: 'Ekip Üyesi' },
      { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>`, num: refs.length, label: 'Referans' },
      { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`, num: social.length, label: 'Sosyal Medya' },
      { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07"/></svg>`, num: contact.phone ? 1 : 0, label: 'İletişim Aktif' },
    ];

    const el = document.getElementById('dashStats');
    if (el) {
      el.innerHTML = stats.map(s => `
        <div class="stat-card">
          <div class="stat-card-icon">${s.icon}</div>
          <div class="stat-card-num">${s.num}</div>
          <div class="stat-card-label">${s.label}</div>
        </div>
      `).join('');
    }
  }

  /* ============================================================
     LOAD ALL PANELS
  ============================================================ */
  function loadAllPanels() {
    loadHero();
    loadServices();
    loadAbout();
    loadRefs();
    loadContact();
    loadSocial();
    loadNav();
    loadSettings();
  }

  /* ============================================================
     HERO PANEL
  ============================================================ */
  function loadHero() {
    setVal('heroEyebrow',        load('hero-eyebrow', 'Able Ajans · 2026'));
    setVal('heroHeadlinePlain',  load('hero-headline-plain', 'Dijitalde '));
    setVal('heroHeadlineAccent', load('hero-headline-accent', 'Güçlü'));
    setVal('heroHeadlineRest',   load('hero-headline-rest', 'Varoluş Başlıyor'));
    setVal('heroSubline',        load('hero-subline', 'İşletmeleri dijital dünyada büyüten yenilikçi çözümler geliştiriyoruz.'));
    setVal('heroPhoneLink',      load('hero-phone-link', 'tel:+905458550089'));
    setVal('heroWaLink',         load('hero-wa-link', 'https://wa.me/905458550089'));
    setVal('heroCtaPrimaryText', load('hero-cta-primary-text', 'Bizi Arayın'));
    setVal('heroCtaSecondaryText', load('hero-cta-secondary-text', 'WhatsApp İletişim'));
    setVal('social1',            load('social-1', 'Güvenilir Ajans'));
    setVal('social2',            load('social-2', 'Premium Çözümler'));
    setVal('social3',            load('social-3', 'Yenilikçi Yaklaşım'));
  }

  window.Admin = window.Admin || {};
  Admin.saveHero = function() {
    save('hero-eyebrow',          val('heroEyebrow'));
    save('hero-headline-plain',   val('heroHeadlinePlain'));
    save('hero-headline-accent',  val('heroHeadlineAccent'));
    save('hero-headline-rest',    val('heroHeadlineRest'));
    save('hero-subline',          val('heroSubline'));
    save('hero-phone-link',       val('heroPhoneLink'));
    save('hero-wa-link',          val('heroWaLink'));
    save('hero-cta-primary-text', val('heroCtaPrimaryText'));
    save('hero-cta-secondary-text', val('heroCtaSecondaryText'));
    save('social-1',              val('social1'));
    save('social-2',              val('social2'));
    save('social-3',              val('social3'));
    toast('Hero bölümü kaydedildi!');
    renderDashboard();
  };

  Admin.resetSection = function(section) {
    if (!confirm('Bu bölümdeki içeriği sıfırlamak istediğinizden emin misiniz?')) return;
    if (section === 'hero') {
      ['hero-eyebrow','hero-headline-plain','hero-headline-accent','hero-headline-rest',
       'hero-subline','hero-phone-link','hero-wa-link','hero-cta-primary-text',
       'hero-cta-secondary-text','social-1','social-2','social-3'].forEach(k => localStorage.removeItem(PREFIX + k));
      loadHero();
    }
    toast('Sıfırlandı.', 'success');
  };

  /* ============================================================
     SERVICES PANEL
  ============================================================ */
  let servicesData = [];

  function loadServices() {
    servicesData = load('services', DEF_SERVICES).map(s => ({ ...s, id: s.id || uid() }));
    setVal('servicesSubtitle', load('services-subtitle', 'İşletmenizi dijital dünyada öne çıkaracak kapsamlı hizmetler sunuyoruz.'));
    renderServices();
  }

  function renderServices() {
    const el = document.getElementById('servicesList');
    const cnt = document.getElementById('servicesCount');
    if (!el) return;
    if (cnt) cnt.textContent = servicesData.length + ' hizmet';
    if (!servicesData.length) {
      el.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;text-align:center;padding:32px">Henüz hizmet yok. "+ Hizmet Ekle" ile başlayın.</p>';
      return;
    }
    el.innerHTML = servicesData.map((s, i) => `
      <div class="item-row" data-id="${s.id}">
        <div class="item-drag" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>
        <div class="item-info">
          <div class="item-name">${esc(s.name)}</div>
          <div class="item-sub">${esc(s.desc)}</div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="Admin.editService('${s.id}')" aria-label="Düzenle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon danger" onclick="Admin.deleteService('${s.id}')" aria-label="Sil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  Admin.addService = function() {
    openModal('Yeni Hizmet', serviceModalBody(), function() {
      const name = val('mServiceName');
      const desc = val('mServiceDesc');
      const icon = document.querySelector('.icon-opt.selected')?.dataset.icon || 'star';
      if (!name) { toast('Hizmet adı gerekli.', 'error'); return false; }
      servicesData.push({ id: uid(), name, desc, icon });
      renderServices();
      return true;
    });
  };

  Admin.editService = function(id) {
    const s = servicesData.find(x => x.id === id);
    if (!s) return;
    openModal('Hizmeti Düzenle', serviceModalBody(s), function() {
      const name = val('mServiceName');
      const desc = val('mServiceDesc');
      const icon = document.querySelector('.icon-opt.selected')?.dataset.icon || s.icon;
      if (!name) { toast('Hizmet adı gerekli.', 'error'); return false; }
      const idx = servicesData.findIndex(x => x.id === id);
      if (idx > -1) servicesData[idx] = { id, name, desc, icon };
      renderServices();
      return true;
    });
  };

  Admin.deleteService = function(id) {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;
    servicesData = servicesData.filter(x => x.id !== id);
    renderServices();
    toast('Hizmet silindi.');
  };

  Admin.saveServices = function() {
    save('services', servicesData);
    save('services-subtitle', val('servicesSubtitle'));
    toast('Hizmetler kaydedildi!');
    renderDashboard();
  };

  function serviceModalBody(s = {}) {
    return `
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Hizmet Adı</label>
        <input type="text" class="form-input" id="mServiceName" value="${esc(s.name || '')}" placeholder="Hizmet adı..." autofocus>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Açıklama</label>
        <textarea class="form-input form-textarea" id="mServiceDesc" rows="3" placeholder="Kısa açıklama...">${esc(s.desc || '')}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">İkon</label>
        <div class="icon-picker">
          ${Object.keys(ICONS).map(k => `
            <button type="button" class="icon-opt ${(s.icon || 'star') === k ? 'selected' : ''}" data-icon="${k}" title="${ICON_LABELS[k] || k}" onclick="document.querySelectorAll('.icon-opt').forEach(o=>o.classList.remove('selected'));this.classList.add('selected')">
              ${ICONS[k]}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ============================================================
     ABOUT PANEL
  ============================================================ */
  let teamData = [];
  let statsData = [];

  function loadAbout() {
    setVal('aboutBody',  load('about-body',  'Able Ajans olarak, işletmelerin dijital dönüşüm yolculuklarında güvenilir bir partner olarak yer alıyoruz.'));
    setVal('aboutBody2', load('about-body-2','Genç, dinamik ve yaratıcı ekibimizle her projeye özgün bir bakış açısı getiriyoruz.'));
    teamData  = load('team',  []).map(m => ({ ...m, id: m.id || uid() }));
    statsData = load('stats', DEF_STATS).map(s => ({ ...s, id: s.id || uid() }));
    renderTeam();
    renderStats();
  }

  function renderTeam() {
    const el = document.getElementById('teamList');
    if (!el) return;
    if (!teamData.length) {
      el.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;text-align:center;padding:32px">Henüz ekip üyesi yok.</p>';
      return;
    }
    el.innerHTML = teamData.map(m => `
      <div class="item-row" data-id="${m.id}">
        <div class="item-info">
          <div class="item-name">${esc(m.name)}</div>
          <div class="item-sub">${esc(m.role)}</div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="Admin.editTeam('${m.id}')" aria-label="Düzenle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon danger" onclick="Admin.deleteTeam('${m.id}')" aria-label="Sil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  function renderStats() {
    const el = document.getElementById('statsEditor');
    if (!el) return;
    el.innerHTML = statsData.map((s, i) => `
      <div class="stat-edit-item">
        <input type="text" value="${esc(s.number)}" placeholder="50+" oninput="statsData[${i}].number=this.value" aria-label="Sayı">
        <span style="color:var(--text-tertiary);font-size:0.7rem;padding:0 4px">—</span>
        <input type="text" value="${esc(s.label)}" placeholder="Proje" oninput="statsData[${i}].label=this.value" aria-label="Etiket">
        <button class="btn-icon danger" onclick="Admin.deleteStat(${i})" aria-label="Sil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
        </button>
      </div>
    `).join('');
  }

  Admin.addStat = function() {
    statsData.push({ id: uid(), number: '0+', label: 'Yeni' });
    renderStats();
  };

  Admin.deleteStat = function(i) {
    statsData.splice(i, 1);
    renderStats();
  };

  Admin.addTeam = function() {
    openModal('Yeni Ekip Üyesi', teamModalBody(), function() {
      const name = val('mTeamName');
      const role = val('mTeamRole');
      const photo = teamPhotoData || '';
      if (!name) { toast('İsim gerekli.', 'error'); return false; }
      teamData.push({ id: uid(), name, role, photo });
      renderTeam();
      return true;
    });
  };

  Admin.editTeam = function(id) {
    const m = teamData.find(x => x.id === id);
    if (!m) return;
    openModal('Ekip Üyesini Düzenle', teamModalBody(m), function() {
      const name = val('mTeamName');
      const role = val('mTeamRole');
      const photo = teamPhotoData !== undefined ? teamPhotoData : m.photo;
      if (!name) { toast('İsim gerekli.', 'error'); return false; }
      const idx = teamData.findIndex(x => x.id === id);
      if (idx > -1) teamData[idx] = { id, name, role, photo };
      renderTeam();
      return true;
    });
  };

  Admin.deleteTeam = function(id) {
    if (!confirm('Bu üyeyi silmek istediğinizden emin misiniz?')) return;
    teamData = teamData.filter(x => x.id !== id);
    renderTeam();
    toast('Üye silindi.');
  };

  let teamPhotoData = undefined;

  function teamModalBody(m = {}) {
    teamPhotoData = undefined;
    return `
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">İsim Soyisim</label>
        <input type="text" class="form-input" id="mTeamName" value="${esc(m.name || '')}" placeholder="Ad Soyad" autofocus>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Unvan / Rol</label>
        <input type="text" class="form-input" id="mTeamRole" value="${esc(m.role || '')}" placeholder="Kurucu, Tasarımcı...">
      </div>
      <div class="form-group">
        <label class="form-label">Fotoğraf</label>
        <div class="img-upload-zone" id="teamPhotoZone">
          ${m.photo ? `<img src="${m.photo}" class="img-preview" id="teamPhotoPreview" style="display:block" alt="Fotoğraf">` : '<img class="img-preview" id="teamPhotoPreview" alt="Önizleme">'}
          <svg style="width:32px;height:32px;color:var(--text-tertiary);margin:0 auto 8px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <p class="img-upload-text">Tıkla veya sürükle — JPG, PNG, GIF (max 2MB)</p>
          <input type="file" accept="image/*" id="teamPhotoFile" aria-label="Fotoğraf yükle">
        </div>
      </div>
    `;
  }

  // Photo upload
  document.addEventListener('change', function(e) {
    if (e.target.id === 'teamPhotoFile' || e.target.id === 'refLogoFile') {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { toast('Dosya 2MB\'dan küçük olmalı.', 'error'); return; }
      const reader = new FileReader();
      reader.onload = function(ev) {
        const data = ev.target.result;
        if (e.target.id === 'teamPhotoFile') {
          teamPhotoData = data;
          const prev = document.getElementById('teamPhotoPreview');
          if (prev) { prev.src = data; prev.style.display = 'block'; }
        } else {
          refLogoData = data;
          const prev = document.getElementById('refLogoPreview');
          if (prev) { prev.src = data; prev.style.display = 'block'; }
        }
      };
      reader.readAsDataURL(file);
    }
  });

  Admin.saveAbout = function() {
    save('about-body',  val('aboutBody'));
    save('about-body-2',val('aboutBody2'));
    save('team',  teamData);
    save('stats', statsData);
    toast('Hakkımızda bölümü kaydedildi!');
    renderDashboard();
  };

  /* ============================================================
     REFERANSLAR PANEL
  ============================================================ */
  let refsData = [];
  let refLogoData = undefined;

  function loadRefs() {
    refsData = load('refs', []).map(r => ({ ...r, id: r.id || uid() }));
    renderRefs();
  }

  function renderRefs() {
    const el = document.getElementById('refsList');
    const cnt = document.getElementById('refsCount');
    if (!el) return;
    if (cnt) cnt.textContent = refsData.length + ' referans';
    if (!refsData.length) {
      el.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;text-align:center;padding:32px">Henüz referans yok.</p>';
      return;
    }
    el.innerHTML = refsData.map(r => `
      <div class="item-row" data-id="${r.id}">
        ${r.logo ? `<img src="${r.logo}" style="width:36px;height:36px;border-radius:8px;object-fit:contain;background:var(--bg-elevated);border:1px solid var(--border-soft);padding:4px;flex-shrink:0" alt="${esc(r.name)}">` : ''}
        <div class="item-info">
          <div class="item-name">${esc(r.name)}</div>
          <div class="item-sub">${esc(r.desc || r.url || '')}</div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="Admin.editRef('${r.id}')" aria-label="Düzenle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon danger" onclick="Admin.deleteRef('${r.id}')" aria-label="Sil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  Admin.addRef = function() {
    openModal('Yeni Referans', refModalBody(), function() {
      const name = val('mRefName');
      const desc = val('mRefDesc');
      const url  = val('mRefUrl');
      const logo = refLogoData || '';
      if (!name) { toast('Şirket adı gerekli.', 'error'); return false; }
      refsData.push({ id: uid(), name, desc, url, logo });
      renderRefs();
      return true;
    });
  };

  Admin.editRef = function(id) {
    const r = refsData.find(x => x.id === id);
    if (!r) return;
    openModal('Referansı Düzenle', refModalBody(r), function() {
      const name = val('mRefName');
      const desc = val('mRefDesc');
      const url  = val('mRefUrl');
      const logo = refLogoData !== undefined ? refLogoData : r.logo;
      if (!name) { toast('Şirket adı gerekli.', 'error'); return false; }
      const idx = refsData.findIndex(x => x.id === id);
      if (idx > -1) refsData[idx] = { id, name, desc, url, logo };
      renderRefs();
      return true;
    });
  };

  Admin.deleteRef = function(id) {
    if (!confirm('Bu referansı silmek istediğinizden emin misiniz?')) return;
    refsData = refsData.filter(x => x.id !== id);
    renderRefs();
    toast('Referans silindi.');
  };

  Admin.saveRefs = function() {
    save('refs', refsData);
    toast('Referanslar kaydedildi!');
    renderDashboard();
  };

  function refModalBody(r = {}) {
    refLogoData = undefined;
    return `
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Şirket / Marka Adı</label>
        <input type="text" class="form-input" id="mRefName" value="${esc(r.name || '')}" placeholder="Şirket adı" autofocus>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Kısa Açıklama (opsiyonel)</label>
        <input type="text" class="form-input" id="mRefDesc" value="${esc(r.desc || '')}" placeholder="Proje türü veya sektör...">
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Web Sitesi URL (opsiyonel)</label>
        <input type="url" class="form-input" id="mRefUrl" value="${esc(r.url || '')}" placeholder="https://...">
      </div>
      <div class="form-group">
        <label class="form-label">Logo / Görsel</label>
        <div class="img-upload-zone">
          ${r.logo ? `<img src="${r.logo}" class="img-preview" id="refLogoPreview" style="display:block" alt="Logo">` : '<img class="img-preview" id="refLogoPreview" alt="Önizleme">'}
          <svg style="width:28px;height:28px;color:var(--text-tertiary);margin:0 auto 8px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          <p class="img-upload-text">Logo yükle — SVG, PNG, JPG (max 2MB)</p>
          <input type="file" accept="image/*" id="refLogoFile" aria-label="Logo yükle">
        </div>
      </div>
    `;
  }

  /* ============================================================
     CONTACT PANEL
  ============================================================ */
  function loadContact() {
    const c = load('contact', DEF_CONTACT);
    setVal('contactPhone',        c.phone || '');
    setVal('contactPhoneLink',    c.phoneLink || '');
    setVal('contactWhatsapp',     c.whatsapp || '');
    setVal('contactWhatsappLink', c.whatsappLink || '');
    setVal('contactEmail',        c.email || '');
    setVal('contactEmailLink',    c.emailLink || '');
    setVal('contactAddress',      c.address || '');
    setVal('contactMapLink',      c.mapLink || '');
  }

  Admin.saveContact = function() {
    save('contact', {
      phone:         val('contactPhone'),
      phoneLink:     val('contactPhoneLink'),
      whatsapp:      val('contactWhatsapp'),
      whatsappLink:  val('contactWhatsappLink'),
      email:         val('contactEmail'),
      emailLink:     val('contactEmailLink'),
      address:       val('contactAddress'),
      mapLink:       val('contactMapLink'),
    });
    toast('İletişim bilgileri kaydedildi!');
    renderDashboard();
  };

  /* ============================================================
     SOCIAL MEDIA PANEL
  ============================================================ */
  let socialData = [];

  function loadSocial() {
    socialData = load('social', []).map(s => ({ ...s, id: s.id || uid() }));
    renderSocial();
  }

  function renderSocial() {
    const el = document.getElementById('socialList');
    const cnt = document.getElementById('socialCount');
    if (!el) return;
    if (cnt) cnt.textContent = socialData.length + ' hesap';
    if (!socialData.length) {
      el.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;text-align:center;padding:32px">Henüz sosyal medya hesabı yok.</p>';
      return;
    }
    el.innerHTML = socialData.map(s => `
      <div class="item-row" data-id="${s.id}">
        <div class="item-info">
          <div class="item-name">${esc(s.name)}</div>
          <div class="item-sub">${esc(s.url)}</div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="Admin.editSocial('${s.id}')" aria-label="Düzenle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon danger" onclick="Admin.deleteSocial('${s.id}')" aria-label="Sil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  Admin.addSocial = function() {
    openModal('Yeni Sosyal Medya', socialModalBody(), function() {
      const name = val('mSocialName');
      const url  = val('mSocialUrl');
      const icon = document.querySelector('#mSocialIconPicker .icon-opt.selected')?.dataset.icon || 'link';
      if (!name || !url) { toast('Platform adı ve URL gerekli.', 'error'); return false; }
      socialData.push({ id: uid(), name, url, icon });
      renderSocial();
      return true;
    });
  };

  Admin.editSocial = function(id) {
    const s = socialData.find(x => x.id === id);
    if (!s) return;
    openModal('Sosyal Medya Düzenle', socialModalBody(s), function() {
      const name = val('mSocialName');
      const url  = val('mSocialUrl');
      const icon = document.querySelector('#mSocialIconPicker .icon-opt.selected')?.dataset.icon || s.icon;
      if (!name || !url) { toast('Platform adı ve URL gerekli.', 'error'); return false; }
      const idx = socialData.findIndex(x => x.id === id);
      if (idx > -1) socialData[idx] = { id, name, url, icon };
      renderSocial();
      return true;
    });
  };

  Admin.deleteSocial = function(id) {
    if (!confirm('Bu hesabı silmek istediğinizden emin misiniz?')) return;
    socialData = socialData.filter(x => x.id !== id);
    renderSocial();
    toast('Hesap silindi.');
  };

  Admin.saveSocial = function() {
    save('social', socialData);
    toast('Sosyal medya hesapları kaydedildi!');
    renderDashboard();
  };

  function socialModalBody(s = {}) {
    const SOC_ICON_SVG = {
      instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
      linkedin:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
      twitter:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>`,
      youtube:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
      tiktok:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.25 8.25 0 004.83 1.56V6.87a4.85 4.85 0 01-1.06-.18z"/></svg>`,
      link:      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
    };
    return `
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Platform Adı</label>
        <input type="text" class="form-input" id="mSocialName" value="${esc(s.name || '')}" placeholder="Instagram, LinkedIn..." autofocus>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">URL</label>
        <input type="url" class="form-input" id="mSocialUrl" value="${esc(s.url || '')}" placeholder="https://instagram.com/...">
      </div>
      <div class="form-group">
        <label class="form-label">İkon</label>
        <div class="icon-picker" id="mSocialIconPicker">
          ${SOC_ICONS.map(k => `
            <button type="button" class="icon-opt ${(s.icon || 'link') === k ? 'selected' : ''}" data-icon="${k}" title="${SOC_LABELS[k]}" onclick="document.querySelectorAll('#mSocialIconPicker .icon-opt').forEach(o=>o.classList.remove('selected'));this.classList.add('selected')">
              ${SOC_ICON_SVG[k] || SOC_ICON_SVG.link}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ============================================================
     NAVIGATION PANEL
  ============================================================ */
  let navData = [];

  function loadNav() {
    navData = load('nav-links', null);
    if (!navData) navData = DEF_NAV.map(n => ({ ...n, id: n.id || uid() }));
    else navData = navData.map(n => ({ ...n, id: n.id || uid() }));
    renderNav();
  }

  function renderNav() {
    const el = document.getElementById('navList');
    const cnt = document.getElementById('navCount');
    if (!el) return;
    if (cnt) cnt.textContent = navData.length + ' link';
    if (!navData.length) {
      el.innerHTML = '<p style="color:var(--text-tertiary);font-size:0.85rem;text-align:center;padding:32px">Menü boş.</p>';
      return;
    }
    el.innerHTML = navData.map((n, i) => `
      <div class="item-row" data-id="${n.id}">
        <div class="item-info">
          <div class="item-name">${esc(n.label)}</div>
          <div class="item-sub">${esc(n.href)}</div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="Admin.moveNav(${i},-1)" ${i===0?'disabled':''} aria-label="Yukarı taşı" title="Yukarı">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="btn-icon" onclick="Admin.moveNav(${i},1)" ${i===navData.length-1?'disabled':''} aria-label="Aşağı taşı" title="Aşağı">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="btn-icon" onclick="Admin.editNavLink('${n.id}')" aria-label="Düzenle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon danger" onclick="Admin.deleteNavLink('${n.id}')" aria-label="Sil">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  Admin.moveNav = function(idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= navData.length) return;
    [navData[idx], navData[newIdx]] = [navData[newIdx], navData[idx]];
    renderNav();
  };

  Admin.addNavLink = function() {
    openModal('Yeni Menü Linki', navModalBody(), function() {
      const label = val('mNavLabel');
      const href  = val('mNavHref');
      const section = val('mNavSection');
      if (!label || !href) { toast('Etiket ve URL gerekli.', 'error'); return false; }
      navData.push({ id: uid(), label, href, section });
      renderNav();
      return true;
    });
  };

  Admin.editNavLink = function(id) {
    const n = navData.find(x => x.id === id);
    if (!n) return;
    openModal('Linki Düzenle', navModalBody(n), function() {
      const label = val('mNavLabel');
      const href  = val('mNavHref');
      const section = val('mNavSection');
      if (!label || !href) { toast('Etiket ve URL gerekli.', 'error'); return false; }
      const idx = navData.findIndex(x => x.id === id);
      if (idx > -1) navData[idx] = { id, label, href, section };
      renderNav();
      return true;
    });
  };

  Admin.deleteNavLink = function(id) {
    if (!confirm('Bu linki silmek istediğinizden emin misiniz?')) return;
    navData = navData.filter(x => x.id !== id);
    renderNav();
    toast('Link silindi.');
  };

  Admin.saveNav = function() {
    save('nav-links', navData);
    toast('Navigasyon menüsü kaydedildi!');
  };

  Admin.resetNav = function() {
    if (!confirm('Menüyü varsayılana sıfırlamak istediğinizden emin misiniz?')) return;
    localStorage.removeItem(PREFIX + 'nav-links');
    navData = DEF_NAV.map(n => ({ ...n, id: uid() }));
    renderNav();
    toast('Menü sıfırlandı.');
  };

  function navModalBody(n = {}) {
    return `
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Menü Etiketi</label>
        <input type="text" class="form-input" id="mNavLabel" value="${esc(n.label || '')}" placeholder="Hizmetler" autofocus>
      </div>
      <div class="form-group" style="margin-bottom:20px">
        <label class="form-label">Bağlantı (href)</label>
        <input type="text" class="form-input" id="mNavHref" value="${esc(n.href || '')}" placeholder="#hizmetler veya https://...">
      </div>
      <div class="form-group">
        <label class="form-label">Section ID (Scroll Spy için)</label>
        <input type="text" class="form-input" id="mNavSection" value="${esc(n.section || '')}" placeholder="hizmetler">
      </div>
    `;
  }

  /* ============================================================
     SETTINGS PANEL
  ============================================================ */
  function loadSettings() {
    setVal('siteTitle',  load('site-title',  'Able Ajans | Yeni Nesil Dijital Çözümler'));
    setVal('siteDesc',   load('site-desc',   'Able Ajans — Yazılım, sosyal medya yönetimi...'));
    setVal('footerCopy', load('footer-copy', '© 2026 Able Ajans · Tüm hakları saklıdır.'));
  }

  Admin.saveMeta = function() {
    save('site-title',  val('siteTitle'));
    save('site-desc',   val('siteDesc'));
    save('footer-copy', val('footerCopy'));
    toast('SEO ayarları kaydedildi!');
  };

  Admin.changePassword = function() {
    const current  = document.getElementById('currentPass').value;
    const newP     = document.getElementById('newPass').value;
    const confirm  = document.getElementById('newPassConfirm').value;
    if (current !== loadPass()) { toast('Mevcut şifre yanlış.', 'error'); return; }
    if (!newP)                  { toast('Yeni şifre boş olamaz.', 'error'); return; }
    if (newP !== confirm)       { toast('Şifreler eşleşmiyor.', 'error'); return; }
    if (newP.length < 6)        { toast('Şifre en az 6 karakter olmalı.', 'error'); return; }
    savePass(newP);
    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('newPassConfirm').value = '';
    toast('Şifre güncellendi!');
  };

  Admin.resetAll = function() {
    if (!confirm('TÜM CMS içeriği silinecek ve varsayılana dönecek. Bu işlem GERİ ALINAMAZ. Emin misiniz?')) return;
    if (!confirm('Son kez onaylayın: Tüm içerik sıfırlansın mı?')) return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
    toast('Tüm içerik sıfırlandı. Sayfa yenileniyor...', 'success');
    setTimeout(() => location.reload(), 1500);
  };

  /* ============================================================
     MODAL
  ============================================================ */
  let modalCallback = null;

  function openModal(title, bodyHtml, onConfirm) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    modalCallback = onConfirm;
    document.getElementById('modalBackdrop').classList.add('open');
    // Focus first input
    setTimeout(() => {
      const first = document.querySelector('#modalBody input, #modalBody textarea');
      if (first) first.focus();
    }, 100);
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    modalCallback = null;
    teamPhotoData = undefined;
    refLogoData = undefined;
  }

  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalCancel')?.addEventListener('click', closeModal);
  document.getElementById('modalBackdrop')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  document.getElementById('modalConfirm')?.addEventListener('click', function() {
    if (modalCallback) {
      const result = modalCallback();
      if (result !== false) closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('modalBackdrop').classList.contains('open')) {
      closeModal();
    }
  });

  /* ============================================================
     BOOT
  ============================================================ */
  checkAuth();

})();
