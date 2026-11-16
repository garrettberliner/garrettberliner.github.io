document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();

  const diaryGrid = document.getElementById("diary-grid");
  const diaryFilters = document.getElementById("diary-filters");
  const diaryDetail = document.getElementById("diary-entry-detail");

  if (diaryGrid) {
    loadEntries()
      .then((entries) => {
        renderEntries(entries);
        renderFilters(entries);
      })
      .catch(showDiaryError);
  }

  if (diaryDetail) {
    loadEntries().then(renderDetail).catch(showDiaryError);
  }

  function initNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("primary-nav");
    if (!toggle || !menu) return;

    const logo = document.querySelector(".header-logo");
    const background = [document.querySelector("main"), document.querySelector("footer")].filter(Boolean);
    const isOpen = () => menu.classList.contains("active");

    const setOpen = (open) => {
      toggle.classList.toggle("active", open);
      menu.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
      background.forEach((element) => element.toggleAttribute("inert", open));
    };

    toggle.addEventListener("click", () => {
      const open = !isOpen();
      setOpen(open);
      if (open) menu.querySelector("a")?.focus();
    });

    // Close on a link tap, or a tap on the empty area around the links.
    menu.addEventListener("click", (event) => {
      if (event.target === menu || event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (!isOpen()) return;
      if (event.key === "Escape") {
        setOpen(false);
        toggle.focus();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep keyboard focus inside the open menu (logo, links, close button).
      const focusable = [logo, ...menu.querySelectorAll("a"), toggle].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Reset if the window grows past the mobile breakpoint or the page is restored from cache.
    window.matchMedia("(max-width: 768px)").addEventListener("change", (event) => {
      if (!event.matches && isOpen()) setOpen(false);
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted && isOpen()) setOpen(false);
    });
  }

  async function loadEntries() {
    const response = await fetch("/diary/entries.json");
    if (!response.ok) throw new Error("Diary entries could not be loaded");
    return response.json();
  }

  function renderEntries(entries, selectedTag = "all") {
    const visibleEntries = entries
      .filter((entry) => selectedTag === "all" || entry.tag === selectedTag)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    diaryGrid.innerHTML = visibleEntries.map((entry) => `
      <a href="/diary/entry.html?slug=${encodeURIComponent(entry.slug)}" class="diary-card-link">
        <article class="diary-card">
          <div class="diary-card-header">
            <span class="diary-card-emoji" aria-hidden="true">${escapeHtml(entry.emoji || "📝")}</span>
            <span class="diary-card-tag ${escapeHtml(entry.tag)}">${escapeHtml(entry.tag)}</span>
          </div>
          <h3>${escapeHtml(entry.title)}</h3>
          <p class="diary-card-preview">${escapeHtml(entry.content ?? "")}</p>
          <div class="diary-card-footer">
            <span class="diary-card-date">${escapeHtml(entry.date)}</span>
            <span class="diary-card-read-more">Read more →</span>
          </div>
        </article>
      </a>
    `).join("");
  }

  function renderFilters(entries) {
    if (!diaryFilters) return;
    const tags = ["all", ...new Set(entries.map((entry) => entry.tag))];
    diaryFilters.innerHTML = tags.map((tag) => `
      <button class="diary-filter-btn${tag === "all" ? " active" : ""}" type="button" data-filter="${escapeHtml(tag)}" aria-pressed="${tag === "all"}">
        ${escapeHtml(tag)}
      </button>
    `).join("");

    diaryFilters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      diaryFilters.querySelectorAll(".diary-filter-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderEntries(entries, button.dataset.filter);
    });
  }

  function renderDetail(entries) {
    const slug = new URLSearchParams(window.location.search).get("slug");
    const entry = entries.find((item) => item.slug === slug);
    if (!entry) {
      document.title = "Entry not found - Garrett Miguel Berliner";
      diaryDetail.innerHTML = '<h1 class="diary-detail-title">Entry not found</h1>';
      return;
    }

    document.title = `${entry.title} - Garrett Miguel Berliner`;
    const paragraphs = (entry.detail ?? entry.content ?? "")
      .split("\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");

    diaryDetail.innerHTML = `
      <div class="diary-detail-header">
        <span class="diary-card-emoji" aria-hidden="true">${escapeHtml(entry.emoji || "📝")}</span>
        <span class="diary-card-tag ${escapeHtml(entry.tag)}">${escapeHtml(entry.tag)}</span>
      </div>
      <h1 class="diary-detail-title">${escapeHtml(entry.title)}</h1>
      <div class="diary-detail-date">${escapeHtml(entry.date)}</div>
      <div class="diary-detail-body">${paragraphs}</div>
    `;
  }

  function showDiaryError(error) {
    console.error(error);
    const target = diaryGrid || diaryDetail;
    if (target) target.innerHTML = '<p class="text-brown">Diary entries are temporarily unavailable.</p>';
  }

  // Escapes quotes too, because values are also placed inside HTML attributes.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[char]);
  }
});
