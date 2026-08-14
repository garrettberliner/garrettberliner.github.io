# garrettberliner.github.io

My personal site. Hand-written HTML, CSS, &amp; JavaScript - no framework, no build step, no dependencies.
GitHub Pages serves these files exactly as they are in this repo.

**Live:** [garrettberliner.github.io](https://garrettberliner.github.io/)

---

## What's here

```
.
├── index.html              Home - hero
├── about/index.html        Background, upbringing, skills & interests
├── experience/index.html   Career, education, research, teaching, leadership (largest page)
├── research/index.html     4 peer-reviewed publications + ScholarlyArticle structured data
├── resume/index.html       1-page resume, inline PDF viewer + download
├── cv/index.html           Full CV, inline PDF viewer + download
├── 404.html                Not-found page (GitHub Pages serves this automatically)
├── sitemap.xml             Search-engine sitemap
├── robots.txt              Crawler rules
├── LICENSE                 MIT
└── src/
    ├── styles/main.css     Everything visual (~1,690 lines)
    ├── scripts/main.js     Everything interactive (~260 lines)
    └── assets/             Images, PDFs, favicon - see src/assets/README.md
```

There is no `publications/` folder, no `diary/`, &amp; no `src/partials/`. Older versions of this
README described those; they're gone.

---

## The design: "Ridgeline"

The idea: **Seattle's skyline &amp; the Cascades ridgeline are the same horizon, seen from two sides
of the same life.** The city is where I work hard; the mountains are where I reset.

So the site has two atmospheres, toggled from the header:

| | **Trailhead** | **Downtown** |
|---|---|---|
| Mood | Reconnect | Focus |
| Paper | Fog cream | Rain slate |
| Background pattern | Topographic contour lines | Seattle street grid, rotated 32° |
| Horizon above the footer | Cascades ridgeline | Seattle skyline, Space Needle &amp; all |
| Accent | Ember orange | Ember orange |

Ember orange is deliberately the **same in both** - it's the through-line.

The toggle doubles as light/dark mode. It's stored in `localStorage` under the key `atmosphere`
&amp; first-time visitors get whatever their OS prefers.

### Why the Seattle grid is rotated 32°

Because the real one is. Downtown Seattle's street grid sits about 32° off true north. Small detail,
but it's the difference between "a grid" &amp; "*that* grid."

---

## Design tokens

All tokens live at the top of `src/styles/main.css`, inside `@layer tokens`. Change them there &amp;
they propagate everywhere.

### Trailhead (default, `:root`)

| Token | Value | Used for |
|---|---|---|
| `--paper` | `#F4F0E6` | Page background |
| `--paper-raised` | `#FAF7F0` | Cards |
| `--ink` | `#1F2E26` | Body text |
| `--ink-soft` | `#46574E` | Secondary text |
| `--ink-faint` | `#7C8A81` | Metadata, captions |
| `--ember` | `#BE5129` | Accent, links, active states |
| `--moss` | `#4B6B4E` | Contours on About |
| `--cedar` | `#6B4A32` | Contours on Experience |
| `--ground` | `#3D5943` | Footer + the ground below the horizon |
| `--rule` | hairline | Card borders, dividers |

### Downtown (`[data-atmosphere='downtown']`)

| Token | Value |
|---|---|
| `--paper` | `#10151A` |
| `--paper-raised` | `#171E25` |
| `--ink` | `#E6EDF3` |
| `--ember` | `#F0824C` (brighter, for contrast on dark) |
| `--ground` | `#080C10` |

Both atmospheres were contrast-checked. Downtown is the riskier one - if you change a color there,
re-check it.

---

## Typography

Three typefaces, one per identity:

| Font | Where | Why |
|---|---|---|
| **Fraunces** | Headings | A variable serif with `SOFT` &amp; `WONK` axes - it's deliberately a little imperfect &amp; organic. The nature side. |
| **Instrument Sans** | Body &amp; UI | Clean, neutral, urban. The city side. |
| **JetBrains Mono** | Dates, places, venues, section labels | It's a code font. The developer-experience side. |

Section labels get a `//` prefix via CSS (`::before`) - a comment marker, because that's the work I do.

Loaded from Google Fonts in one request. **If you edit the font URL, keep the axes in alphabetical
order** (lowercase standard axes first, then uppercase custom axes) or Google returns a 400.

---

## JavaScript

`src/scripts/main.js` is one IIFE. Every function is an *enhancement* - the site is fully readable
&amp; navigable with JavaScript turned off.

| Function | What it does |
|---|---|
| `initAtmosphere` | Trailhead ⇄ Downtown toggle + `localStorage` persistence |
| `initHeader` | Adds `.is-scrolled` to the header once you scroll |
| `initNav` | Mobile menu open/close |
| `initReveal` | Fades sections in on scroll (IntersectionObserver) |
| `initAccordions` | "Show more" / "Show less" on experience cards |
| `initYear` | Fills the copyright year |
| `initTrailhead` | The easter egg |

### The `js` class - important

The inline `<head>` script on every page adds a `js` class to `<html>`. The fade-in CSS is written as
`.js .fade-in { opacity: 0 }`, so **without JavaScript nothing is ever hidden**. If you remove that
class, the whole site goes blank for anyone with JS disabled.

### Why the theme script is inline in `<head>`

It has to run *before the first paint*, otherwise every page load flashes the wrong theme for a frame.
A `defer`red script is too late. That's why it's duplicated in all 7 pages rather than living in
`main.js`.

### Easter egg

Type `hike` anywhere on the site. Fog rolls in off the Sound. It's skippable, respects
`prefers-reduced-motion`, &amp; never blocks content.

---

## Editing content

### Add a publication

In `research/index.html`, copy an existing `<article class="pub-card card fade-in">` block &amp; fill it
in. Then add a matching entry to the `ScholarlyArticle` JSON-LD array in `<head>` - that's what
Google Scholar &amp; search engines read.

### Add a role

In `experience/index.html`, copy an `<div class="exp-item fade-in" id="role-...">` block &amp; fill it
in. Roles are grouped under the `// PROFESSIONAL`, `// RESEARCH`, `// EDUCATION` &amp; `// LEADERSHIP`
section labels - drop it in the right group &amp; keep the dates in reverse-chronological order.

### Swap a PDF

Drop the new file in `src/assets/`, then update the `href`, `download`, &amp; `<iframe src>` in
`resume/index.html` or `cv/index.html`. There are 3 references per page. Also bump the
"Last Updated" stat &amp; the `<p>Last updated ...</p>` line.

### Navigation

The nav &amp; footer are **copy-pasted into all 7 pages**, on purpose. The old version fetched a shared
partial at runtime, which meant every page briefly rendered with no navigation. Duplication is the
cheaper problem.

If you add a page: copy the `<header>` block, move `aria-current="page"` onto the right link, &amp; add
the URL to `sitemap.xml`.

---

## Running it locally

Any static file server works. From the repo root:

```bash
python -m http.server 8080
```

Then open <http://127.0.0.1:8080>.

Don't open the `.html` files directly with `file://` - all the links &amp; asset paths are
root-relative (`/src/...`), so they'll 404.

---

## Deploying

Push to `main`. GitHub Pages redeploys automatically, usually within a minute. There's no build
step &amp; no CI - what's in the repo is what's on the site.

---

## Ground rules for future changes

- **No build step.** If a change needs npm, it's the wrong change for this repo.
- **Everything works without JavaScript.** Content first, enhancement second.
- **Check both atmospheres.** A change that looks great in Trailhead can be unreadable in Downtown.
- **Respect `prefers-reduced-motion`.** The block at the bottom of `main.css` handles it - don't add
  animation that escapes it.

---

## License

[MIT](LICENSE)
