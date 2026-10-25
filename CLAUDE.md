# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static HTML portfolio website** (GitHub Pages) showcasing professional achievements, research, patents, and publications. There are no JavaScript frameworks, bundlers, or npm dependencies—just semantic HTML and CSS.

**Key characteristics:**
- `index.html` (~55KB) holds the main page with all of its HTML and CSS embedded
- `projects/` holds six case-study pages that share `projects/case-study.css`
- Responsive design with fixed sidebar navigation (280px on desktop, stacked on mobile)
- Light/dark mode that follows the system setting, plus a bottom-left toggle that remembers the visitor's choice
- Anchor-based navigation with seven main sections
- CSS custom properties for all colors
- JavaScript is limited to the Umami analytics tag, the theme toggle (`theme.js`), and the HiMate password gate; the career-journey diagram uses CSS `:target`, not JS
- No package.json and no build process. The one dev helper, `tools/encrypt-gated.mjs`, needs only Node

## Local Development

### Serving Locally

Use Python's built-in HTTP server (no install required):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Important:** Do not open `index.html` directly via `file://` in the browser—browser security policies can block relative resource loads. Always use a local server.

### Recommended Workflow

| Task | Command |
|---|---|
| Serve locally | `python3 -m http.server 8000` |
| Validate HTML structure | `vnu index.html` |
| Validate with accessibility focus | `html-validate --preset a11y index.html` |
| Full accessibility audit | Chrome DevTools → Lighthouse → Accessibility tab |
| Check CSS colors | Paste CSS into https://jigsaw.w3.org/css-validator/ |
| Check color contrast | Use https://webaim.org/resources/contrastchecker/ |

**Validation installs (one-time):**
```bash
# For vnu (official W3C validator)
brew install vnu

# For html-validate (optional, more detailed feedback)
npm i -g html-validate
```

## Architecture & Content Structure

### Page Layout
- **Sidebar (280px):** Fixed on desktop, stacked on top on mobile (breakpoint at 768px)
  - Profile image (circular, 150px; 96px on mobile)
  - Name, contact links (email, LinkedIn, Google Scholar), and a "CV" link that downloads the PDF; the CV link carries `data-umami-event="cv-download"`, so Umami records each click as a `cv-download` event
  - Navigation links to sections (pill buttons on mobile)
- **Main content:** Flexible width, max-width for readability
- **Sections:** Anchor-based navigation with consistent structure

### Sections of `index.html`

`#about` (summary plus the interactive career-journey diagram), `#portfolio` (Projects grid linking to `projects/*.html`), `#employment`, `#education`, `#patents`, `#publications`, `#awards`.

- **Career-journey diagram:** one inline SVG. Each stop's ring is split by `stroke-dasharray`/`stroke-dashoffset` among patents, publications, awards, and case studies, in that fixed order. Each stop links to a `.journey-popup` (`#pop-bs`, `#pop-ms`, `#pop-thy`, `#pop-bnk`, `#pop-ups`, `#pop-hy`) that opens via `:target`; the close link returns to `#journey-panel`. When adding or removing an output at a stop, update both the ring segments and the popup.
- **Patents and publications:** `<details class="item-accordion">` with ids `PAT-n`, `J-n`, `C-n`, `A-n`. Employment and the journey popups cross-reference them with `.badge` links, so keep ids stable.

### HTML Content Patterns

**Sections:** Use semantic `<section>` landmarks with IDs matching navigation links:
```html
<section id="employment">
  <h2>Employment</h2>
  <!-- content -->
</section>
```

**Item blocks** (jobs, education, patents): Use consistent structure with header, subtitle, and bullet lists:
```html
<div class="item">
  <div class="item-header">
    <span class="item-title">Job Title</span>
    <span class="item-date">May 2024 - Present</span>
  </div>
  <div class="item-subtitle">Company | Department</div>
  <ul class="bullet-list">
    <li><strong>[Category]</strong> Description...</li>
  </ul>
</div>
```

**Badges:** Use for cross-referencing patents and publications:
```html
<!-- Internal reference badge (no href) -->
<a href="#patents" class="badge">PAT-5</a>

<!-- External link badge -->
<a href="https://example.com" class="badge">External Link</a>
```

### CSS Design System

**Color Palette** (CSS custom properties in `:root`; light values shown). Never hardcode a color in a rule; add or reuse a variable so the dark theme can override it:
- `--primary-color: #0056b3` (blue, used for links)
- `--text-color: #333` (dark gray, body text)
- `--bg: #fff` (page background; `--light-bg: #f8f9fa` is the sidebar/panel background)
- `--border-color: #e9ecef` (borders; `--divider` for darker rules)
- `--meta-color: #6c757d` (secondary text like dates)
- Badge, placeholder, and shadow variables (`--badge-bg`, `--badge-link-bg`, `--shadow`, ...), plus `--c-patents`, `--c-publications`, `--c-awards`, `--c-case-studies` for the journey diagram

**Dark mode:** each color variable holds both themes in one value, `--bg: light-dark(#fff, #121417)`, and `:root` sets `color-scheme: light dark` so the system setting decides by default. When you add a color, give it both values and check text contrast (4.5:1) in each. `index.html` and `projects/case-study.css` each define their own tokens, so keep them in sync.

**Theme toggle:** `theme.js` (loaded synchronously in `<head>` on every page, `../theme.js` from `projects/`) adds a round button at the bottom-left. Clicking it sets `<html data-theme="light|dark">`, which overrides `color-scheme` through `:root[data-theme=...]`, and saves the choice in `localStorage` (guarded, since storage can be blocked). Until a visitor chooses, no attribute is set and the system setting applies. The button is created by JS, so new pages only need the script tag and the `.theme-toggle` CSS already in each stylesheet. The sidebar keeps `padding-bottom: 5rem` so the button never hides its last link. The CV (`cv/cv.html`) is deliberately light-only because it is printed.

**Typography:**
- System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Base line-height: 1.6
- Headings use semantic tags with consistent sizing and weights

**Spacing & Layout:**
- Sidebar padding: 3rem 2rem (desktop), 2rem (mobile)
- Content padding: 4rem (desktop), 2rem (mobile)
- Section margin-bottom: 4rem
- Item margin-bottom: 2rem

**Responsive Design:**
- Main breakpoint at 768px (mobile/tablet cutoff); the Projects grid also drops from 3 to 2 columns at 1100px, and padding tightens at 480px
- Below 768px: sidebar becomes full-width, content flex-direction changes
- Wide components (timelines, tables) keep a `min-width` inside an `overflow-x: auto` wrapper instead of letting the page scroll sideways
- Use relative units (`rem`, percentages) for scalability

### Mobile Responsiveness

The site uses a mobile-first approach triggered at the 768px breakpoint:
- On desktop: sidebar fixed, content flows next to it
- On mobile: sidebar stacks on top, full-width layout

Key mobile adjustments:
- `body { flex-direction: column }` (stack instead of side-by-side)
- Sidebar becomes `position: relative` (not fixed)
- Item headers change to `flex-direction: column` (stack date below title)

## Common Modification Tasks

### Adding a New Section
1. Add the section HTML with unique `id` matching the navigation link
2. Add an `<a>` element in the sidebar navigation `.nav-links`
3. Follow the existing `<h2>` heading and section structure

### Updating Employment/Education Entries
1. Use the existing `.item` div structure
2. Include `.item-header` with title and date
3. Add `.item-subtitle` for organization/context
4. Employment items use the company as `.item-title` and "Role | Team" as `.item-subtitle`. Group the work under `.item-group`, each with a `<p class="group-label">` (small uppercase theme name) followed by a `.bullet-list`:
   ```html
   <div class="item-group">
       <p class="group-label">Theme name</p>
       <ul class="bullet-list">
           <li>One sentence with the key figure in <strong>bold</strong>.</li>
       </ul>
   </div>
   ```
   Write one sentence per bullet; a second sentence becomes a second bullet. Bold one key figure per bullet at most.
5. Employment content is taken from the CV; change `cv/cv.html` and regenerate the PDF whenever employment, patents, publications, or awards change

### Updating the CV
`cv/cv.html` is the source and `cv/Hwiyeon-Kim-CV.pdf` is what the sidebar link downloads. Regenerate the PDF after every edit:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf="$PWD/cv/Hwiyeon-Kim-CV.pdf" "file://$PWD/cv/cv.html"
```

Keep it to 2 A4 pages and check that no section heading is stranded at the bottom of page 1. Do not put a phone number in it; the file is public.

### Case Studies (`projects/`)
Each page uses the shared `projects/case-study.css` (sidebar, `.stats-row`, `.comparison-grid`, `.case-figure`, tables, etc.), so a new component belongs there with both light and dark values. Images live in `projects/images/`. `projects/drafts/` holds working notes, is git-ignored, and must stay out of the repo.

### The HiMate Password Gate (`projects/hyundai-competition-award.html`)
The page body is AES-GCM ciphertext in `<script id="gated-payload">`; `case-study-crypto.js` decrypts it in the browser. It is a deterrent, not security, and the images it references (`projects/images/hyundai-competition-award-*.png`) are publicly reachable.

- **The plaintext is not in this repo.** The source lives outside it, in `~/Documents/work/himate-private/gated-content.html`. Edit that file, then re-encrypt:

  ```bash
  HIMATE_PW='the password' node tools/encrypt-gated.mjs ~/Documents/work/himate-private/gated-content.html
  ```
- **The password is not stored anywhere in the repo.** If it is lost it cannot be recovered; set a new one with the command above, rebuilding the plaintext from the page content if the source file is also gone.
- Never commit the plaintext, the password, or a draft of the gated content.

### Creating Badge References
Use the `.badge` class for all references. Make href values match section IDs for internal links:
- Internal: `<a href="#section-id" class="badge">Label</a>`
- External: `<a href="https://url" class="badge" target="_blank">Label</a>`

### Modifying the Color Scheme
Update the CSS custom properties in the `:root` selector. All colors flow from these definitions:
```css
:root {
  --primary-color: #0056b3;      /* Links and hover states */
  --text-color: #333;             /* Body text */
  --light-bg: #f8f9fa;            /* Sidebar background */
  --border-color: #e9ecef;        /* Section dividers */
  --meta-color: #6c757d;          /* Dates, subtitles */
}
```

### Adjusting Typography
Font sizes are defined at multiple levels:
- Body: `font-family` and base line-height in `body { }`
- Headings: `h1`, `h2` use relative sizing (e.g., `1.8rem`)
- Use `rem` units so changes scale with user preferences

## Accessibility Requirements

All modifications must maintain WCAG 2.2 AA compliance:

- **Headings:** Sequential levels (h1 → h2 → h3), no skipped levels, exactly one h1 per page
- **Images:** Every `<img>` must have descriptive `alt` text (or `alt=""` if decorative)
- **Links:** All links must have visible focus outline and meaningful link text (`:focus-visible` outlines are defined for links and `<summary>`)
- **Motion:** Transitions and smooth scrolling are disabled under `prefers-reduced-motion`
- **Themes:** Check contrast in both light and dark mode
- **Color contrast:** Text must have 4.5:1 contrast ratio against background (check with WebAIM tool)
- **Semantic HTML:** Use `<section>`, `<nav>`, `<article>` landmarks appropriately
- **Focus order:** Tab navigation should follow logical reading order

**Audit workflow:**
1. Serve locally: `python3 -m http.server 8000`
2. Open in Chrome and press F12 (DevTools)
3. Go to Lighthouse tab → check "Accessibility" → Analyze page load
4. Fix any issues before committing

## Git Workflow

- Commit messages should clearly describe what changed (e.g., "Add 2026 employment entry", "Update color scheme")
- Since this is a static site, all changes are safe to commit directly—no build artifacts or generated files
- Profile images and other assets should be optimized before committing (JPEG for photos, <2MB)

## Performance Considerations

The site is very lightweight by design. Keep it that way:
- Profile image should be under 1MB (currently ~1MB)
- No external JavaScript dependencies, apart from the deferred Umami analytics tag already on every page
- CSS is embedded (no external stylesheets to reduce HTTP requests)
- Fonts use system font stack (no web font downloads)
- Keep HTML semantic and semantic HTML parsing is fast

## Testing & Validation

Before committing changes:
1. Serve locally and test in Chrome, Safari, and Firefox
2. Test mobile responsiveness (DevTools device emulation, or real mobile device)
3. Run validation: `vnu index.html`
4. Run accessibility check: `html-validate --preset a11y index.html` (if installed)
5. Run Lighthouse accessibility audit
6. Verify all links work (internal anchors and external URLs)
7. Check color contrast on any color changes using WebAIM tool

## Browser Support

The site uses modern CSS (flexbox, CSS custom properties) and targets:
- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)

Avoid CSS that requires polyfills or very recent browser features. The one exception is `light-dark()` (Chrome 123+, Safari 17.5+, Firefox 120+), which the color tokens depend on.

## File Structure

```
.
├── index.html                  # Main page (HTML + embedded CSS)
├── profile.jpg                 # Profile image (150px circular in sidebar)
├── theme.js                    # Light/dark toggle, shared by every page
├── cv/
│   ├── cv.html                 # CV source (print layout, A4)
│   └── Hwiyeon-Kim-CV.pdf      # Generated from cv.html; linked from the sidebar
├── projects/
│   ├── case-study.css          # Shared styles for all case-study pages
│   ├── case-study-crypto.js    # Password gate (HiMate page only)
│   ├── *.html                  # Six case-study pages
│   ├── images/                 # Case-study images
│   └── drafts/                 # Local working notes (git-ignored)
├── portfolio/                  # Project-grid thumbnails and PDF portfolios
├── tools/encrypt-gated.mjs     # Re-encrypts the HiMate page body
├── docs/superpowers/           # Planning specs and plans
├── README.md                   # Project description
└── CLAUDE.md                   # This file
```

No build artifacts. `.gitignore` excludes `projects/drafts/` and `.DS_Store`.

## Design Philosophy

This portfolio emphasizes:
- **Clarity:** Clean typography and generous whitespace
- **Accessibility:** Semantic HTML, keyboard navigation, contrast compliance
- **Simplicity:** Minimal JavaScript (analytics, theme toggle, and the password gate only), no dependencies, no build step
- **Responsiveness:** Works beautifully on mobile and desktop
- **Professionalism:** Academic styling appropriate for research/product design portfolios

When making changes, prioritize these values over adding features.
