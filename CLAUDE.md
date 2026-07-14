# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static HTML portfolio website** showcasing professional achievements, research, patents, and publications. It's a single-page application with no build tools, JavaScript frameworks, or dependencies—just semantic HTML with embedded CSS.

**Key characteristics:**
- Single `index.html` file (~22KB) containing all HTML and CSS
- Responsive design with fixed sidebar navigation (280px on desktop, full-width on mobile)
- Anchor-based navigation with six main sections
- CSS custom properties for theming and easy color/typography adjustments
- No package.json, no build process, no npm dependencies

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
- **Sidebar (280px):** Fixed on desktop, collapsible on mobile (breakpoint at 768px)
  - Profile image (circular, 150px)
  - Name and contact info
  - Navigation links to sections
- **Main content:** Flexible width, max-width for readability
- **Sections:** Anchor-based navigation with consistent structure

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

**Color Palette** (defined as CSS custom properties in `:root`):
- `--primary-color: #0056b3` (blue, used for links)
- `--text-color: #333` (dark gray, body text)
- `--light-bg: #f8f9fa` (light gray, sidebar background)
- `--border-color: #e9ecef` (borders)
- `--meta-color: #6c757d` (secondary text like dates)

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
- Single breakpoint at 768px (mobile/tablet cutoff)
- Below 768px: sidebar becomes full-width, content flex-direction changes
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
4. Use `.bullet-list` for descriptions (optional strong tags for categories)

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
- **Links:** All links must have visible focus outline and meaningful link text
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
- No external JavaScript dependencies
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

Avoid CSS that requires polyfills or very recent browser features.

## File Structure

```
.
├── index.html          # Complete website (HTML + CSS)
├── profile.jpg         # Profile image (150px circular in sidebar)
├── README.md           # Project description
└── CLAUDE.md           # This file
```

No hidden config files or build artifacts. Everything is visible and editable.

## Design Philosophy

This portfolio emphasizes:
- **Clarity:** Clean typography and generous whitespace
- **Accessibility:** Semantic HTML, keyboard navigation, contrast compliance
- **Simplicity:** No JavaScript, no dependencies, single file
- **Responsiveness:** Works beautifully on mobile and desktop
- **Professionalism:** Academic styling appropriate for research/product design portfolios

When making changes, prioritize these values over adding features.
