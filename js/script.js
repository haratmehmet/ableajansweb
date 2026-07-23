/**
 * ABLE AJANS — Landing Page
 * script.js v3.0
 */

(function () {
  'use strict';

  /* ============================================================
     1. PRELOADER
  ============================================================ */
  const preloader = document.getElementById('preloader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          triggerEntranceAnimations();
        }, 820);
      }
    }, 1400);
  });

  /* ============================================================
     2. ENTRANCE ANIMATIONS
  ============================================================ */
  function triggerEntranceAnimations() {
    const elements = document.querySelectorAll('.anim-fade-up');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    elements.forEach((el) => io.observe(el));
  }

  /* ============================================================
     3. STICKY NAV — Scroll detection
  ============================================================ */
  const navBar = document.getElementById('navBar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navBar?.classList.add('scrolled');
    } else {
      navBar?.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ============================================================
     4. SCROLL SPY — Active nav link
  ============================================================ */
  const sections = ['hero', 'hizmetler', 'hakkimizda', 'referanslar', 'iletisim'];

  function updateActiveLink() {
    let current = '';
    const offset = 120;

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top <= offset) current = id;
      }
    });

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  /* ============================================================
     5. HAMBURGER MENU
  ============================================================ */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    hamburger?.setAttribute('aria-expanded', 'true');
    hamburger?.setAttribute('aria-label', 'Menüyü Kapat');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Menüyü Aç');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on mobile link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ============================================================
     6. SMOOTH SCROLL — Override anchor behaviour
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  /* ============================================================
     7. HERO LOGO PARALLAX
  ============================================================ */
  const heroLogoWrap = document.getElementById('heroLogoWrap');
  let rafId = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = ((e.clientX - cx) / cx) * -6;
    targetY = ((e.clientY - cy) / cy) * -4;
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    if (heroLogoWrap) {
      heroLogoWrap.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
    rafId = requestAnimationFrame(animateParallax);
  }

  animateParallax();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      animateParallax();
    }
  });

  /* ============================================================
     8. SERVICE CARD HOVER GLOW
  ============================================================ */
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.service-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

})();
