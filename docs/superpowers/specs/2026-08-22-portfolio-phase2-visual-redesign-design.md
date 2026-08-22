# Portfolio Phase 2: Visual/Style Redesign of Case Study Pages — Design

Date: 2026-08-22

## Summary

Turn the 6 English-language case-study `.md` drafts (produced in Phase 1, `projects/drafts/*.md`) into 6 unified, dedicated HTML pages under `projects/`, replacing the two existing bespoke pages (`thyroscope.html`, `hyundai-post-crash.html`) and adding 4 new pages. All 6 pages share one external stylesheet and one 6-section content template, so a future visual upgrade only requires editing shared files. `index.html`'s portfolio grid is updated to link to these 6 pages with English captions. One page (Hyundai Competition Award / "HiMate") is gated behind client-side password protection.

This is **Phase 2 (visual/style) of a two-phase effort**; Phase 1 (content rewrite) is complete and documented in `docs/superpowers/specs/2026-08-22-project-case-study-content-rewrite-design.md`.

## Scope

**In scope:**

| Project | Draft source | Page (new/rebuilt) | Notes |
|---|---|---|---|
| Thyroscope | `projects/drafts/thyroscope.md` | `projects/thyroscope.html` (rebuilt) | Existing bespoke page replaced entirely |
| Hyundai Post-Crash UX | `projects/drafts/hyundai-post-crash.md` | `projects/hyundai-post-crash.html` (rebuilt) | Existing bespoke page replaced entirely |
| Hyundai Competition Award (HiMate) | `projects/drafts/hyundai-competition-award.md` | `projects/hyundai-competition-award.html` (new) | Client-side password-gated |
| Upstage IDP Demo | `projects/drafts/upstage-idp-demo.md` | `projects/upstage-idp-demo.html` (new) | Standard template |
| BNK MyData Redesign | `projects/drafts/bnk-mydata-redesign.md` | `projects/bnk-mydata-redesign.html` (new) | Standard template |
| UNIST Visualization Study | `projects/drafts/unist-visualization-study.md` | `projects/unist-visualization-study.html` (new) | Adds a "Presentation Video" section before Overview |

Also in scope:
- New shared stylesheet `projects/case-study.css`, used by all 6 pages.
- New shared client-side crypto helper `projects/case-study-crypto.js`, used only by the HiMate page.
- Updating `index.html`'s `#portfolio` grid: captions translated to English, all 6 tile links pointed at the new/rebuilt HTML pages (replacing the 4 direct-PDF links and repointing the 2 existing HTML links).
- Accessibility and responsive verification of all 6 pages plus the modified `#portfolio` section, per `CLAUDE.md`'s existing testing workflow (`vnu`, `html-validate --preset a11y`, Lighthouse, WebAIM contrast).

**Explicitly out of scope:**
- **Phase B visual upgrade** (a more premium/bold visual treatment) — this spec covers Phase A (minimalist, consistent with the current site's tone) only. Phase B is a separate future effort that edits `case-study.css` without touching page HTML or content.
- Sourcing or generating any new screenshots/mockups. Body content uses only text and coded (HTML/CSS/SVG) data visualizations; each page's header uses only the existing per-project thumbnail (`portfolio/N.png`). Any future screenshot need is supplied by the user directly — not requested as a mid-build action item, not extracted from PDFs by the agent.
- Real server-side security for the HiMate page. The password gate is an explicit, acknowledged **deterrent, not real security** — client-side-only, appropriate for a statically-hosted GitHub Pages site.
- Any changes to `index.html` outside the `#portfolio` section (sidebar, About, Employment, Education, Patents, Publications sections are untouched).
- Any changes to the 2 previously-excluded projects (IVI PoC, Thyroscope back-office design) — remain excluded, consistent with Phase 1.
- `projects/drafts/*.md` content itself — already finalized in Phase 1; Phase 2 only presents this content visually. Any wording changes needed to fit the new format are cosmetic (e.g., splitting a paragraph into a stat card) and must not alter facts or claims.

## Architecture & File Structure

```
projects/
  case-study.css          # new — shared stylesheet for all 6 pages (sidebar, header, 6-section
                           #        template, reusable components, 768px breakpoint)
  case-study-crypto.js     # new — Web Crypto (PBKDF2 + AES-GCM) helper, used only by HiMate page
  thyroscope.html                    # rebuilt under shared template
  hyundai-post-crash.html            # rebuilt under shared template
  hyundai-competition-award.html     # new — HiMate, password-gated
  upstage-idp-demo.html              # new
  bnk-mydata-redesign.html           # new
  unist-visualization-study.html     # new — includes video section
  drafts/                 # unchanged — Phase 1 content source, read but not modified
index.html                 # modified — only the #portfolio grid section
```

Each of the 6 page files is self-contained HTML (no embedded `<style>` blocks beyond a `<link>` to `case-study.css`), following the existing site's no-build-tools, no-JS-framework philosophy. `case-study-crypto.js` is loaded only by `hyundai-competition-award.html` via a plain `<script src="case-study-crypto.js"></script>` tag — no bundler, no module system.

## Unified Page Template

All 6 pages share this structure, mapping directly onto the Phase 1 `.md` draft's 6 sections:

```html
<body>
  <aside class="sidebar">
    <a href="../index.html" class="back-link">&larr; Back to Portfolio</a>
    <nav class="nav-links">
      <a href="#overview">Overview</a>
      <a href="#problem">Problem &amp; Context</a>
      <a href="#process">Process &amp; Approach</a>
      <a href="#solution">Solution &amp; Design</a>
      <a href="#impact">Impact &amp; Outcome</a>
      <a href="#reflection">Reflection</a>
    </nav>
  </aside>
  <main>
    <header class="project-header">
      <img src="../portfolio/N.png" alt="<descriptive alt text>" class="project-thumbnail">
      <h1><Project Title></h1>
      <p class="project-meta"><Organization> · <Role> · <Recognition, if any></p>
    </header>
    <section id="overview">...</section>
    <section id="problem">...</section>
    <section id="process">...</section>
    <section id="solution">...</section>
    <section id="impact">...</section>
    <section id="reflection">...</section>
  </main>
</body>
```

This directly replaces both existing pages' divergent section-naming schemes (`#challenge/#research/#design/#results/#findings/#impact` and `#overview/#role/#phase1/#phase2/#achievements/#lessons`) with one scheme used by all 6 pages.

## Reusable Components (in `case-study.css`)

Data from the `.md` drafts is presented via a small set of coded (no-screenshot) visualization components:

- **`.stat-card` / `.stats-row`** — a row of boxed numbers with labels (e.g., "161 participants", "99.5% preference probability"). Used wherever a draft states a headline metric.
- **`.funnel`** — a vertical step-down bar visualization for sequential/funnel-shaped data (e.g., participant exclusion counts).
- **`.bar-row`** — a labeled horizontal bar for comparative counts (e.g., per-condition participant counts, per-outlet thumbnail-strategy counts). Bar length is decorative; the numeric value is always rendered as visible text alongside the bar (see Accessibility).
- **`.comparison-grid`** — a side-by-side before/after or multi-option grid (already proven in current `thyroscope.html`; carried into the shared stylesheet).
- **`.highlight-box`** — a callout box for a single important quote, finding, or caveat.
- **`.role-pills`** — small inline tags for listing methods or responsibilities (e.g., "chi-squared testing", "thematic coding").
- **`.two-col`** — a simple two-column layout for pairing related text blocks (e.g., two persona summaries).
- **`.video-embed`** — a responsive `<iframe>` wrapper, used only on the UNIST page.
- **`.password-gate`** — full-page overlay with password input, used only on the HiMate page.

No component renders a screenshot or image other than the page header's thumbnail.

## Per-Project Specifics

- **UNIST Visualization Study**: header thumbnail is in the same format as all other 5 projects (no video substitution in the header). A new first content section, `<section id="video">`, is inserted immediately after the header and before `#overview`, embedding the VIS2023 presentation (`https://www.youtube.com/watch?v=0zHERZNI6NY`) via `.video-embed`. A corresponding sidebar nav link "Presentation Video" (`#video`) is added — unique to this page, since no other page has this section.
- **Hyundai Competition Award (HiMate)**: entire `<main>` content is encrypted at build time and stored as ciphertext in the page's HTML (e.g., a `data-ciphertext` attribute or embedded JSON blob). On load, `.password-gate` overlays the page with a labeled password `<input>`. On submit, `case-study-crypto.js` derives a key from the entered password via PBKDF2 and attempts AES-GCM decryption; on success, the decrypted HTML replaces the gated content and the overlay is removed; on failure, an `aria-live="polite"` error message is shown and the input is not cleared. No plaintext content is ever present in the page source — this is what makes it more than a trivial show/hide gate, while still being explicitly acknowledged as a deterrent rather than real security (anyone with the password, or with sufficient effort against client-side crypto, can access it — acceptable for this use case per the user's decision).
- **Thyroscope, Hyundai Post-Crash UX, Upstage IDP Demo, BNK MyData Redesign**: standard template, no page-specific sections beyond the shared 6.

## `index.html` Changes

Only the `#portfolio` section (`.portfolio-grid` of `.portfolio-tile` cards, currently at lines ~449–508) is modified:
- All 6 tile captions are translated from Korean to English (removing `lang="ko"` attributes on those captions), matching each project's `.md` draft title.
- All 6 tile links point to `projects/<slug>.html` (the 4 tiles currently linking directly to PDFs are repointed to the new pages; the 2 tiles already linking to `thyroscope.html`/`hyundai-post-crash.html` keep the same href, now pointing at the rebuilt versions).
- No other part of `index.html` changes.

## Accessibility & Responsive Plan

- **Breakpoint**: unify on the site-wide 768px breakpoint (replacing `thyroscope.html`'s current 900px), matching `CLAUDE.md`'s single-breakpoint convention.
- **Heading hierarchy**: each page has exactly one `<h1>` (the project title in the header); the 6 (or 7, for UNIST) sections use `<h2>`; any sub-groupings inside a section use `<h3>` — no skipped levels.
- **Images**: the header thumbnail always has descriptive `alt` text specific to the project (not a generic "thumbnail").
- **Coded visualizations**: any component that encodes a number as a visual property (bar length in `.bar-row`, step height in `.funnel`) must also render that number as visible text in the same component — never bar-length-only data.
- **Video embed**: the UNIST `<iframe>` has a descriptive `title` attribute (e.g., "IEEE VIS 2023 presentation: Visualization Thumbnail Design").
- **Password gate**: the input has an associated `<label>` (visually hidden if needed, but present in the DOM), and the error-message region uses `aria-live="polite"` so failed attempts are announced to screen readers.
- **Contrast**: only new component colors (stat-card backgrounds, highlight-box, role-pills) need a fresh WebAIM check — the existing site palette is already WCAG-verified and is reused wherever possible.
- **Focus order**: DOM order on every page follows sidebar → header → sections in template order, so tab order matches visual/reading order with no `tabindex` overrides needed.
- **Validation tools**: `vnu`, `html-validate --preset a11y`, and a Lighthouse accessibility pass are run against all 6 new/rebuilt pages plus `index.html`, per `CLAUDE.md`'s existing workflow.

## Rollout / Build Order

1. Build shared foundation files: `projects/case-study.css`, `projects/case-study-crypto.js`.
2. Rebuild the 2 existing pages (`thyroscope.html`, `hyundai-post-crash.html`) under the new shared template, using content from their respective `.md` drafts.
3. Build the 3 new unprotected pages (`upstage-idp-demo.html`, `bnk-mydata-redesign.html`, `unist-visualization-study.html` with its video section).
4. Build the new protected page (`hyundai-competition-award.html`), including the encryption/password-gate flow — built last, as the most complex page.
5. Update `index.html`'s `#portfolio` grid (English captions, links to all 6 new/rebuilt pages).
6. Run the full accessibility/responsive verification pass (`vnu`, `html-validate --preset a11y`, Lighthouse, WebAIM contrast) across all 6 pages and `index.html`, fixing any issues found.

**Explicitly deferred**: Phase B (premium visual upgrade of `case-study.css`) — a separate future effort, out of scope here.

## Testing / Validation

Since this phase is purely static HTML/CSS/vanilla-JS with no build process, validation is manual:
1. Serve locally (`python3 -m http.server 8000`) and visually check all 6 pages plus the updated `#portfolio` grid in Chrome, Safari, and Firefox.
2. Test mobile responsiveness at the 768px breakpoint via DevTools device emulation.
3. Run `vnu` against all 6 new/rebuilt HTML files and `index.html`.
4. Run `html-validate --preset a11y` against the same files, if installed.
5. Run a Lighthouse accessibility audit on each page.
6. Manually verify: every internal anchor link (sidebar nav, portfolio grid) resolves; the UNIST video embed plays; the HiMate password gate correctly blocks access without the password and correctly reveals content with it.
7. Check contrast of any new component colors using the WebAIM contrast checker.

## Out of Scope / Explicitly Deferred

- **Phase B premium visual upgrade** — deferred to a future spec/effort, achieved by editing `case-study.css` alone.
- Real server-side authentication for HiMate — not possible on GitHub Pages; client-side deterrent is the accepted final approach for this project.
- Any new screenshots/mockups — to be supplied by the user if and when needed, not sourced by the agent.
- The `web-accessibility` skill install (`supercent-io/skills-template@web-accessibility`) remains unresolved (repository does not exist) — not blocking this spec; may be retried later if the user supplies a corrected path.
