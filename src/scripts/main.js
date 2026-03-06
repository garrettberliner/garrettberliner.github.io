document.addEventListener("DOMContentLoaded", () => {
  // ----------------------
  // 1. Load Navbar
  // ----------------------
  const navbarElement = document.getElementById("navbar");
  if (navbarElement) {
    fetch("/src/partials/nav.html")
      .then(r => { if (!r.ok) throw new Error("Nav load failed"); return r.text(); })
      .then(data => {
        navbarElement.innerHTML = data;
        initNav();
        highlightCurrentPage();
      })
      .catch(e => console.error("Error loading navbar:", e));
  }

  function initNav() {
    const toggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }

  function highlightCurrentPage() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (path === href || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }

  // ----------------------
  // 2. Header scroll effect
  // ----------------------
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ----------------------
  // 3. Scroll-triggered animations
  // ----------------------
  const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');
  if (animEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => obs.observe(el));
  }

  // ----------------------
  // 4. Experience toggles
  // ----------------------
  document.querySelectorAll('.exp-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const hidden = btn.closest('.exp-item')?.querySelector('.exp-hidden');
      if (hidden) {
        hidden.classList.toggle('open');
        btn.classList.toggle('expanded');
      }
    });
  });

  // ----------------------
  // 5. Cursor glow on hero (desktop)
  // ----------------------
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    hero.appendChild(glow);
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // ----------------------
  // 6. Diary entry loader
  // ----------------------
  const diaryGrid = document.getElementById('diary-grid');
  const diaryFilters = document.getElementById('diary-filters');
  const diaryDetail = document.getElementById('diary-entry-detail');

  if (diaryGrid) loadDiaryEntries();
  if (diaryDetail) loadDiaryDetail();

  async function loadDiaryEntries() {
    try {
      const resp = await fetch('/diary/entries.json');
      if (!resp.ok) throw new Error('Failed to load diary entries');
      const entries = await resp.json();
      renderDiaryEntries(entries);
      if (diaryFilters) initDiaryFilters(entries);
    } catch (err) {
      console.error('Diary load error:', err);
      if (diaryGrid) {
        diaryGrid.innerHTML = '<p class="text-brown" style="grid-column:1/-1;text-align:center;padding:2rem;">No diary entries yet. Add entries to <code>/diary/entries.json</code>!</p>';
      }
    }
  }

  function renderDiaryEntries(entries, filter = 'all') {
    if (!diaryGrid) return;
    const filtered = filter === 'all' ? entries : entries.filter(e => e.tag === filter);
    // Sort by date descending
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    diaryGrid.innerHTML = filtered.map((entry, i) => `
      <a href="/diary/entry.html?slug=${entry.slug}" class="diary-card-link fade-in" style="transition-delay: ${i * 0.06}s">
        <article class="diary-card">
          <div class="diary-card-header">
            <span class="diary-card-emoji">${entry.emoji || '📝'}</span>
            <span class="diary-card-tag ${entry.tag}">${entry.tag}</span>
          </div>
          <h3>${entry.title}</h3>
          <p class="diary-card-preview">${entry.content}</p>
          <div class="diary-card-footer">
            <span class="diary-card-date">📅 ${entry.date}</span>
            <span class="diary-card-read-more">Read more →</span>
          </div>
        </article>
      </a>
    `).join('');
    requestAnimationFrame(() => {
      diaryGrid.querySelectorAll('.fade-in').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 50);
      });
    });
  }

  function initDiaryFilters(entries) {
    const tags = ['all', ...new Set(entries.map(e => e.tag))];
    diaryFilters.innerHTML = tags.map(tag =>
      `<button class="diary-filter-btn ${tag === 'all' ? 'active' : ''}" data-filter="${tag}">${tag}</button>`
    ).join('');
    diaryFilters.querySelectorAll('.diary-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        diaryFilters.querySelectorAll('.diary-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDiaryEntries(entries, btn.dataset.filter);
      });
    });
  }

  async function loadDiaryDetail() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug || !diaryDetail) return;

    try {
      const resp = await fetch('/diary/entries.json');
      if (!resp.ok) throw new Error('Failed to load entries');
      const entries = await resp.json();
      const entry = entries.find(e => e.slug === slug);
      if (!entry) {
        diaryDetail.innerHTML = '<p class="text-brown" style="text-align:center;padding:3rem;">Entry not found.</p>';
        return;
      }

      document.title = `${entry.title} - Diary - Garrett Berliner`;

      const detailText = (entry.detail || entry.content)
        .split('\n')
        .filter(p => p.trim())
        .map(p => `<p>${p}</p>`)
        .join('');

      const imageGallery = (entry.images && entry.images.length > 0)
        ? `<div class="diary-detail-gallery">${entry.images.map(img =>
            `<img src="${img}" alt="${entry.title}" class="diary-detail-image" loading="lazy">`
          ).join('')}</div>`
        : `<div class="diary-detail-image-placeholder">
            <p>📷 Upload images to this entry by adding paths to the <code>images</code> array in <code>entries.json</code></p>
          </div>`;

      diaryDetail.innerHTML = `
        <div class="diary-detail-header">
          <span class="diary-card-emoji" style="font-size:3rem;">${entry.emoji || '📝'}</span>
          <span class="diary-card-tag ${entry.tag}" style="font-size:0.85rem;">${entry.tag}</span>
        </div>
        <h1 class="diary-detail-title">${entry.title}</h1>
        <div class="diary-detail-date">📅 ${entry.date}</div>
        <div class="diary-detail-body">${detailText}</div>
        ${imageGallery}
      `;

      diaryDetail.classList.add('visible');
    } catch (err) {
      console.error('Detail load error:', err);
      diaryDetail.innerHTML = '<p class="text-brown" style="text-align:center;padding:3rem;">Could not load entry.</p>';
    }
  }

  // ----------------------
  // 7. Page enter animation
  // ----------------------
  document.querySelector('main')?.classList.add('page-enter');

  // ----------------------
  // 8. Footer year
  // ----------------------
  const yearEl = document.querySelector('.current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----------------------
  // 9. Smooth scroll for anchors
  // ----------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
  