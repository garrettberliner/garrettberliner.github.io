/* =============================================================
   RIDGELINE — behaviour
   -------------------------------------------------------------
   Everything here is an enhancement. Nothing here is load-bearing:
   the nav, the footer, every word of content, & the experience
   timeline all render fine with JavaScript switched off.
   ============================================================= */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;

  /* -----------------------------------------------------------
     Atmosphere — Trailhead ⇄ Downtown
     The initial value is set by an inline <head> script so the
     page never paints in the wrong world. This only handles the
     switching after that.
     ----------------------------------------------------------- */
  function initAtmosphere() {
    const toggle = document.querySelector('.atmosphere');
    if (!toggle) return;

    const apply = (name) => {
      root.setAttribute('data-atmosphere', name);
      toggle.setAttribute('aria-pressed', String(name === 'downtown'));
    };

    apply(root.getAttribute('data-atmosphere') || 'trailhead');

    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-atmosphere') === 'downtown' ? 'trailhead' : 'downtown';
      apply(next);
      try {
        localStorage.setItem('atmosphere', next);
      } catch (err) {
        /* Private browsing. The toggle still works for this visit. */
      }
    });
  }

  /* -----------------------------------------------------------
     Header hairline on scroll
     ----------------------------------------------------------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    };

    update();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     Mobile navigation
     ----------------------------------------------------------- */
  function initNav() {
    const toggle = document.querySelector('.menu-toggle');
    const list = document.querySelector('.nav__list');
    const overlay = document.querySelector('.nav-overlay');
    if (!toggle || !list) return;

    const setOpen = (open) => {
      toggle.classList.toggle('is-open', open);
      list.classList.toggle('is-open', open);
      if (overlay) overlay.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => setOpen(!list.classList.contains('is-open')));
    if (overlay) overlay.addEventListener('click', () => setOpen(false));
    list.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && list.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     Scroll-triggered entrances
     ----------------------------------------------------------- */
  function initReveal() {
    const targets = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');
    if (!targets.length) return;

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  /* -----------------------------------------------------------
     Experience accordions
     ----------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('.exp-toggle').forEach((btn) => {
      const panel = btn.closest('.exp-item')?.querySelector('.exp-hidden');
      if (!panel) return;

      if (!panel.id) panel.id = `panel-${Math.random().toString(36).slice(2, 9)}`;
      btn.setAttribute('aria-controls', panel.id);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        const open = !panel.classList.contains('is-open');
        panel.classList.toggle('is-open', open);
        btn.classList.toggle('is-expanded', open);
        btn.setAttribute('aria-expanded', String(open));
        btn.querySelector('.exp-toggle__text').textContent = open ? 'Show less' : 'Show more';
      });
    });
  }

  /* -----------------------------------------------------------
     Footer year
     ----------------------------------------------------------- */
  function initYear() {
    document.querySelectorAll('.current-year').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* -----------------------------------------------------------
     Easter egg
     Type "hike" & the fog rolls in off the Sound.
     ----------------------------------------------------------- */
  function initTrailhead() {
    const word = 'hike';
    let buffer = '';

    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-word.length);
      if (buffer !== word) return;
      buffer = '';

      root.setAttribute('data-atmosphere', 'trailhead');
      try {
        localStorage.setItem('atmosphere', 'trailhead');
      } catch (err) { /* no-op */ }

      const toggle = document.querySelector('.atmosphere');
      if (toggle) toggle.setAttribute('aria-pressed', 'false');

      document.body.classList.add('is-fogged');
      showMarker();
      setTimeout(() => document.body.classList.remove('is-fogged'), 4200);
    });

    function showMarker() {
      if (document.querySelector('.trail-marker')) return;

      const marker = document.createElement('div');
      marker.className = 'trail-marker';
      marker.setAttribute('role', 'status');
      marker.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M3 20h18L14 5l-4 8-2-3z"/></svg>' +
        '<span>Trail found. Fog rolling in off the Sound.</span>';

      document.body.appendChild(marker);
      requestAnimationFrame(() => marker.classList.add('is-visible'));

      setTimeout(() => {
        marker.classList.remove('is-visible');
        setTimeout(() => marker.remove(), 600);
      }, 4000);
    }
  }

  /* -----------------------------------------------------------
     Go
     ----------------------------------------------------------- */
  function init() {
    initAtmosphere();
    initHeader();
    initNav();
    initReveal();
    initAccordions();
    initYear();
    initTrailhead();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();