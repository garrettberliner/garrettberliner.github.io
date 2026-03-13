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
│   └── index.html              # About, skills, education, GCCUT, honors
│
├── experience/
│   └── index.html              # Professional, research, teaching, presentations,
│                                  leadership, professional development, education
│
├── publications/
│   └── index.html              # Research & Publications (4 peer-reviewed papers)
│
├── cv/
│   └── index.html              # CV page with embedded PDF viewer
│
├── resume/
│   └── index.html              # Resume page with embedded PDF viewer
│
├── diary/                       # Diary section (currently hidden from nav)
│   ├── index.html              # Diary listing — data-driven from JSON
│   ├── entry.html              # Single diary entry detail page
│   ├── entries.json            # Diary entries data
│   └── HOW_TO_ADD_ENTRIES.md   # Instructions for adding new entries
│
└── src/
    ├── assets/
    │   ├── IMG_3456.jpg        # Profile photo (used on Home + About)
    │   ├── Dec-25-Resume.pdf   # Resume PDF
    │   └── Dec-25-CV.pdf       # CV PDF
    │
    ├── partials/
    │   └── nav.html            # Shared navigation (loaded via fetch at runtime)
    │
    ├── scripts/
    │   └── main.js             # All site JavaScript (~350 lines)
    │
    └── styles/
        └── main.css            # All site CSS (~2,400 lines)
```

## Architecture

### Technology

- **Pure static HTML/CSS/JS** — no build tools, no bundler, no framework
- **Google Fonts** — DM Serif Display (headings) + Inter (body)
- **Navigation** — shared partial (`src/partials/nav.html`) fetched at runtime via `fetch()` and injected into each page's `#navbar` div
- **Diary** — fully data-driven from `diary/entries.json`; cards and detail pages rendered dynamically by JavaScript

### Design System

| Token | Value |
|---|---|
| Primary background | `#F5EDE3` (cream) |
| Primary text | `#3B2A1F` (forest) |
| Accent | `#D4764E` (burnt orange) |
| Hover accent | `#C4553A` (terracotta) |
| Card style | Glassmorphism — translucent backgrounds, `backdrop-filter: blur(16px)`, multi-layered shadows |
| Card hover | 3D tilt (`perspective/rotateX/Y`) + gradient top border |
| Border radius | `20px` (cards), `12px` (buttons) |
| Transitions | `0.4s cubic-bezier(0.16, 1, 0.3, 1)` |

### Key Features

- **Glassmorphism cards** — frosted glass effect with `backdrop-filter` and layered shadows
- **Animated gradient mesh** — warm-toned radial gradients animate behind the hero section
- **Typewriter effect** — hero heading types character-by-character on page load
- **Magnetic buttons** — CTAs subtly follow cursor on desktop (max ±6px)
- **Drifting organic blobs** — background shapes animate with a gentle drift keyframe
- **Publication shimmer** — gold gradient sweep on publication numbers on hover
- **Timeline pulse** — expanding ring on experience timeline dots as they scroll into view
- **Scroll-triggered animations** — `IntersectionObserver`-based fade/slide/stagger entrances
- **Mobile hamburger** — full-screen overlay menu with body scroll lock
- **Mobile PDF fallback** — on ≤768px, PDF iframes are replaced with download buttons
- **Animated nav underlines** — gradient underline (`burnt-orange → amber`) on hover
- **Frosted glass header** — header becomes translucent with `backdrop-filter` on scroll
- **`prefers-reduced-motion`** — all animations suppressed for users who prefer reduced motion
- **Focus-visible styles** — 2px burnt-orange outlines for keyboard navigation
- **Skip-to-content link** — accessible jump link before the navigation
- **Noscript fallback** — basic navigation renders if JavaScript fails
- **Open Graph + Twitter Card meta** — rich previews on social media sharing
- **Custom 404 page** — warm-styled with navigation back to the site

### Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `> 1024px` | Desktop (full layout) |
| `≤ 1024px` | Tablet (single-column about hero, stacked doc hero) |
| `≤ 768px` | Mobile (hamburger menu, stacked layouts, PDF fallback) |
| `≤ 480px` | Small mobile (reduced typography, compact cards) |

### JavaScript Modules (main.js)

1. **Navbar loader** — fetches and injects shared nav partial
2. **Header scroll effect** — adds frosted glass on scroll > 50px
3. **Scroll-triggered animations** — `IntersectionObserver` for fade/slide/stagger
4. **Experience toggles** — accordion show-more/less on experience items
5. **Cursor glow** — radial gradient follows mouse on hero (desktop)
6. **Diary loader** — fetches `entries.json`, renders cards + filters + detail pages
7. **Page enter animation** — opacity/translateY entrance on `<main>`
8. **Footer year** — auto-fills current year
9. **Smooth scroll** — intercepts `#` anchor clicks
10. **Typewriter** — character-by-character hero heading animation
11. **Magnetic buttons** — cursor-following transform on `.btn` elements
12. **Animated counters** — count-up animation for `[data-counter]` elements

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