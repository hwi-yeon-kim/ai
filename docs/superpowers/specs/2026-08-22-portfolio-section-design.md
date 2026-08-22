# Portfolio Section Design

Date: 2026-08-22

## Summary

Add a new `Portfolio` section as the last section of `index.html`, displaying a thumbnail grid of 6 selected projects. Each tile links out (new tab) to either an existing case-study HTML page or a PDF in `portfolio/`.

## Scope

- New `<section id="portfolio">` added after the existing `#awards` section, at the end of `<main class="content">`.
- New nav link `<li><a href="#portfolio">Portfolio</a></li>` added as the last item in `.nav-links`.
- 6 project tiles (see Content list below). Two other candidate projects (IVI PoC, Thyroscope back-office design) are excluded per user decision — no thumbnail images were provided for them and they are out of scope for this pass.
- No changes to existing sections, existing `projects/*.html` case study pages, or the Employment section's existing case-study badge link.

## Content list (order = most recent first)

| # | Title | Org · Date | Thumbnail | Link | Link target |
|---|---|---|---|---|---|
| 1 | 사고대처모드 서비스 컨셉 검증 | Hyundai Motor Company · 2024-2025 | `portfolio/1.png` | `projects/hyundai-post-crash.html` | existing case study page |
| 2 | 공모전 수상 | Hyundai Motor Company · 2026 | `portfolio/3.png` | `portfolio/(현대자동차)%20공모전%20수상.pdf` | PDF |
| 3 | 지능형 문서처리(IDP) API 데모 디자인 | Upstage INC. · 2022 | `portfolio/4.png` | `portfolio/(업스테이지)%20지능형%20문서처리(IDP)%20API%20데모%20디자인.pdf` | PDF |
| 4 | 마이데이터 UI/UX 개편 제안 | BNK Kyungnam Bank · 2020-2022 | `portfolio/5.png` | `portfolio/(경남은행)%20마이데이터%20UI:UX%20개편%20제안.pdf` | PDF |
| 5 | 갑상선 헬스케어 앱 개선 및 출시 | Thyroscope INC. | `portfolio/6.png` | `projects/thyroscope.html` | existing case study page |
| 6 | 시각화 썸네일에 대한 디자인 스터디 | UNIST · 2019-2021 | `portfolio/8.png` | `portfolio/(UNIST,%20논문)%20시각화%20썸네일에%20대한%20디자인%20스터디.pdf` | PDF |

All thumbnail source images are 1675×1024 px (ratio ≈ 1.64:1, close to 5:3), already placed by the user in `portfolio/`.

Filenames containing spaces must be percent-encoded (`%20`) in the `href` attribute for HTML validity (`vnu`) and browser compatibility. Parentheses and colons do not require encoding in a non-first path segment per RFC 3986 (they are valid `pchar`/sub-delim characters).

## Markup structure

```html
<section id="portfolio">
    <h2>Portfolio</h2>
    <div class="portfolio-grid">
        <a class="portfolio-tile" href="projects/hyundai-post-crash.html" target="_blank">
            <div class="portfolio-thumb">
                <img src="portfolio/1.png" alt="사고대처모드 서비스 컨셉 검증 썸네일">
            </div>
            <div class="portfolio-caption">
                <span class="portfolio-title">사고대처모드 서비스 컨셉 검증</span>
                <span class="portfolio-meta">Hyundai Motor Company · 2024-2025</span>
            </div>
        </a>
        <!-- ...5 more tiles, same structure, per Content list table -->
    </div>
</section>
```

Nav link addition in `.nav-links` (last `<li>`):

```html
<li><a href="#portfolio">Portfolio</a></li>
```

## CSS

Reuses existing custom properties (`--text-color`, `--border-color`, `--light-bg`, `--meta-color`, `--primary-color`) and existing typographic conventions (`.item-title`/`.item-subtitle` styling is mirrored, not reused directly, since tiles are anchors not divs).

```css
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.portfolio-tile {
    display: block;
    color: inherit;
    text-decoration: none;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s, border-color 0.2s;
}
.portfolio-tile:hover {
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    text-decoration: none;
}
.portfolio-thumb {
    aspect-ratio: 5 / 3;
    background: var(--light-bg);
}
.portfolio-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.portfolio-caption {
    padding: 0.75rem 1rem;
}
.portfolio-title {
    display: block;
    font-weight: 600;
    font-size: 1.1rem;
}
.portfolio-meta {
    display: block;
    color: var(--meta-color);
    font-size: 0.9rem;
    margin-top: 0.2rem;
}
```

Add to the existing `@media (max-width: 768px)` block:

```css
.portfolio-grid {
    grid-template-columns: 1fr;
}
```

No new breakpoints are introduced — this reuses the site's single 768px breakpoint per project convention.

## Accessibility

- `.portfolio-tile` is a native `<a>`, so it is keyboard-focusable and inherits the global `a:hover`/focus behavior — no `outline: none` is applied, satisfying the project's focus-visibility requirement.
- Each thumbnail `<img>` has a specific, descriptive `alt` (project title + "썸네일"), not generic text.
- Link text includes the visible project title inside the anchor, so the accessible name of each tile is meaningful without relying on the image alone.
- `.portfolio-title` / `.portfolio-meta` colors reuse existing variables already verified for contrast elsewhere in the site (`--text-color` on white, `--meta-color` on white) — no new color introduced.

## Out of scope / explicitly excluded

- IVI 데이터 분석 효율화 PoC 개발, 헬스케어 앱 관리자 백오피스 디자인 — excluded per user decision (no thumbnail provided).
- No changes to the existing Employment section's `View Case Study →` badge link behavior (stays same-tab, unlike the new Portfolio tiles which open in a new tab).
- No image optimization/compression pass on `portfolio/1.png, 3.png, 4.png, 5.png, 6.png, 8.png` (current sizes: 400KB–1.1MB each, ~4.4MB total) — flagged as a possible follow-up but not required by this task.

## Testing / validation

Per project CLAUDE.md workflow, after implementation:
1. Serve locally (`python3 -m http.server 8000`) and visually check the grid on desktop and mobile widths (DevTools emulation at ≤768px).
2. Verify all 6 tiles open the correct target in a new tab (2 HTML case studies, 4 PDFs).
3. Run `vnu index.html` — confirm no new errors, especially around the percent-encoded PDF hrefs.
4. Run Lighthouse accessibility audit — confirm no new violations from the added section.
5. Check keyboard tab order reaches all 6 tiles with visible focus outline.
