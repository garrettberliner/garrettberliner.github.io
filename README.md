# garrettberliner.github.io

Personal website for **Garrett Miguel Berliner** — Technical Program / Product Manager at Microsoft. Built with pure HTML, CSS, and vanilla JavaScript (no frameworks, no build tools).

Live at: [garrettberliner.github.io](https://garrettberliner.github.io)

---

## Project Structure

```
garrettberliner.github.io/
├── index.html                  # Home / Hero page
├── 404.html                    # Custom 404 error page
├── LICENSE
├── README.md
│
├── about/
│   └── index.html              # Photo + short overview paragraph
│
├── experience/
│   └── index.html              # Bulleted list: professional, education,
│                                  research & teaching, leadership
│
├── research/
│   └── index.html              # Bulleted list of publications & theses
│
├── cv/
│   └── index.html              # Link to the CV PDF
│
├── resume/
│   └── index.html              # Link to the resume PDF
│
├── diary/                       # Diary section (currently hidden from nav)
│   ├── index.html              # Diary listing — data-driven from JSON
│   ├── entry.html              # Single diary entry detail page
│   ├── entries.json            # Diary entries data
│   └── HOW_TO_ADD_ENTRIES.md   # Instructions for adding new entries
│
└── src/
    ├── assets/
    │   ├── IMG_3456.jpg        # Profile photo (Home)
    │   ├── IMG_6428.jpg        # Profile photo (About)
    │   ├── Dec-25-Resume.pdf   # Resume PDF
    │   └── Dec-25-CV.pdf       # CV PDF
    │
    ├── scripts/
    │   └── main.js             # Mobile menu behavior, diary rendering
    │
    └── styles/
        └── main.css            # All site CSS
```

## Architecture

### Technology

- **Pure static HTML/CSS/JS** — no build tools, no bundler, no framework
- **Google Fonts** — DM Serif Display (headings) + Inter (body)
- **Navigation** — static header markup in every page (no runtime fetch), so it renders instantly and works without JavaScript. The current page's link has `class="active" aria-current="page"` set in that page's HTML. When editing the nav, update all pages: `index.html`, `about/`, `experience/`, `research/`, `resume/`, `cv/`, `diary/index.html`, `diary/entry.html`, `404.html`
- **Diary** — fully data-driven from `diary/entries.json`; cards and detail pages rendered dynamically by JavaScript

### Design System

| Token | Value |
|---|---|
| Primary background | `#F5EDE3` (cream) |
| Primary text | `#3B2A1F` (forest) |
| Accent | `#D4764E` (burnt orange) |
| Hover accent | `#C4553A` (terracotta) |
| Card style | Glassmorphism — translucent backgrounds, `backdrop-filter: blur(16px)`, multi-layered shadows |
| Card hover | Shadow + gradient top border (no movement) |
| Border radius | `20px` (cards), `12px` (buttons) |
| Transitions | Color, shadow, and opacity only — no motion animations |

### Key Features

- **No motion animations** — no entrance, typewriter, floating, drifting, pulsing, or hover-lift effects
- **Simple list pages** — Experience and Research are plain bulleted lists
- **Direct PDF links** — Resume and CV pages link straight to the PDFs
- **Mobile menu** — full-screen menu at ≤768px; closes via the toggle, a link, tapping empty space, Escape, or widening past the breakpoint; keeps keyboard focus inside while open
- **Nav states** — hover shows a light background; only the current page is underlined
- **Focus-visible styles** — 2px burnt-orange outlines for keyboard navigation
- **Skip-to-content link** — accessible jump link before the navigation
- **No-JavaScript support** — an inline `<head>` script adds `js` to `<html>`; without it, mobile nav links render inline instead of behind the menu button
- **Open Graph + Twitter Card meta** — rich previews on social media sharing
- **Custom 404 page** — with navigation back to the site

### Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `> 1024px` | Desktop (full layout) |
| `≤ 1024px` | Tablet (single-column about hero, stacked doc hero) |
| `≤ 768px` | Mobile (hamburger menu, stacked layouts, PDF fallback) |
| `≤ 480px` | Small mobile (reduced typography, compact cards) |

### JavaScript Modules (main.js)

1. **Mobile menu** — open/close, Escape, tap-outside, focus trap, `inert` background, breakpoint reset
2. **Diary loader** — fetches `entries.json`, renders cards, filters, and detail pages (entry text is HTML-escaped)

## Local Development

```bash
# Clone the repo
git clone https://github.com/garrettberliner/garrettberliner.github.io.git
cd garrettberliner.github.io

# Serve locally (any static server works)
npx http-server -p 8080 -c-1

# Open http://localhost:8080
```

No build step required — edit HTML/CSS/JS directly and refresh.

## License

MIT — see [LICENSE](LICENSE) for details.