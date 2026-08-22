# Portfolio Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Portfolio" section as the last section of `index.html`, showing a 3-column (1-column on mobile) thumbnail grid linking to 6 existing projects.

**Architecture:** Pure HTML + embedded CSS, no JavaScript, no build step — matches the existing single-file site architecture. New CSS classes (`.portfolio-grid`, `.portfolio-tile`, `.portfolio-thumb`, `.portfolio-caption`, `.portfolio-title`, `.portfolio-meta`) are added to the existing `<style>` block, reusing existing CSS custom properties. A new `<section id="portfolio">` with 6 `<a class="portfolio-tile">` tiles is added at the end of `<main class="content">`, and a matching nav link is added as the last item of `.nav-links`.

**Tech Stack:** Static HTML5, CSS3 (Grid, custom properties), no dependencies.

**Reference spec:** `docs/superpowers/specs/2026-08-22-portfolio-section-design.md`

**Note on testing:** This project has no JavaScript and no automated test runner (see `CLAUDE.md`). Its established verification method is: local server + `vnu` HTML validation + manual browser check (including mobile emulation) + Lighthouse accessibility audit. Each task below uses that method instead of unit tests — this follows the project's actual, documented workflow rather than introducing a new one.

---

### Task 1: Add Portfolio nav link

**Files:**
- Modify: `index.html` (`.nav-links` list, around line 192-199)

- [ ] **Step 1: Add the nav link**

In `index.html`, find:

```html
        <ul class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#employment">Employment</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#patents">Patents</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="#awards">Awards & Recognitions</a></li>
        </ul>
```

Replace with:

```html
        <ul class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#employment">Employment</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#patents">Patents</a></li>
            <li><a href="#publications">Publications</a></li>
            <li><a href="#awards">Awards & Recognitions</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
        </ul>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "Add Portfolio nav link"
```

---

### Task 2: Add Portfolio CSS

**Files:**
- Modify: `index.html` (`<style>` block: insert before the existing `@media (max-width: 768px)` rule, and add one rule inside that existing media query)

- [ ] **Step 1: Insert the new component CSS**

Find this exact block (the end of `.publication-venue` immediately followed by the media query):

```html
        .publication-venue {
            font-style: italic;
            margin-top: 0.2rem;
        }
        @media (max-width: 768px) {
```

Replace with (adds the new rules, keeps the media query start intact):

```html
        .publication-venue {
            font-style: italic;
            margin-top: 0.2rem;
        }
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
        @media (max-width: 768px) {
```

- [ ] **Step 2: Add the mobile override inside the existing media query**

Find this exact block (the end of the existing media query):

```html
            .item-date {
                margin-top: 0.2rem;
            }
        }
```

Replace with:

```html
            .item-date {
                margin-top: 0.2rem;
            }
            .portfolio-grid {
                grid-template-columns: 1fr;
            }
        }
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Portfolio section CSS"
```

---

### Task 3: Add Portfolio section markup

**Files:**
- Modify: `index.html` (end of `<main class="content">`, after the `#awards` section)

- [ ] **Step 1: Insert the new section**

Find this exact block (end of the Awards section, right before `</main>`):

```html
        </section>

    </main>
```

Replace with:

```html
        </section>

        <!-- PORTFOLIO -->
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
                <a class="portfolio-tile" href="portfolio/(현대자동차)%20공모전%20수상.pdf" target="_blank">
                    <div class="portfolio-thumb">
                        <img src="portfolio/3.png" alt="공모전 수상 썸네일">
                    </div>
                    <div class="portfolio-caption">
                        <span class="portfolio-title">공모전 수상</span>
                        <span class="portfolio-meta">Hyundai Motor Company · 2026</span>
                    </div>
                </a>
                <a class="portfolio-tile" href="portfolio/(업스테이지)%20지능형%20문서처리(IDP)%20API%20데모%20디자인.pdf" target="_blank">
                    <div class="portfolio-thumb">
                        <img src="portfolio/4.png" alt="지능형 문서처리(IDP) API 데모 디자인 썸네일">
                    </div>
                    <div class="portfolio-caption">
                        <span class="portfolio-title">지능형 문서처리(IDP) API 데모 디자인</span>
                        <span class="portfolio-meta">Upstage INC. · 2022</span>
                    </div>
                </a>
                <a class="portfolio-tile" href="portfolio/(경남은행)%20마이데이터%20UI:UX%20개편%20제안.pdf" target="_blank">
                    <div class="portfolio-thumb">
                        <img src="portfolio/5.png" alt="마이데이터 UI/UX 개편 제안 썸네일">
                    </div>
                    <div class="portfolio-caption">
                        <span class="portfolio-title">마이데이터 UI/UX 개편 제안</span>
                        <span class="portfolio-meta">BNK Kyungnam Bank · 2020-2022</span>
                    </div>
                </a>
                <a class="portfolio-tile" href="projects/thyroscope.html" target="_blank">
                    <div class="portfolio-thumb">
                        <img src="portfolio/6.png" alt="갑상선 헬스케어 앱 개선 및 출시 썸네일">
                    </div>
                    <div class="portfolio-caption">
                        <span class="portfolio-title">갑상선 헬스케어 앱 개선 및 출시</span>
                        <span class="portfolio-meta">Thyroscope INC.</span>
                    </div>
                </a>
                <a class="portfolio-tile" href="portfolio/(UNIST,%20논문)%20시각화%20썸네일에%20대한%20디자인%20스터디.pdf" target="_blank">
                    <div class="portfolio-thumb">
                        <img src="portfolio/8.png" alt="시각화 썸네일에 대한 디자인 스터디 썸네일">
                    </div>
                    <div class="portfolio-caption">
                        <span class="portfolio-title">시각화 썸네일에 대한 디자인 스터디</span>
                        <span class="portfolio-meta">UNIST · 2019-2021</span>
                    </div>
                </a>
            </div>
        </section>

    </main>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "Add Portfolio section markup with 6 project tiles"
```

---

### Task 4: Validate and verify

**Files:** none (verification only; fix-forward into the files above if issues are found)

- [ ] **Step 1: Serve the site locally**

Run: `python3 -m http.server 8000`

- [ ] **Step 2: Visually check the new section**

Open `http://localhost:8000` in a browser, click "Portfolio" in the sidebar nav, and confirm:
- The grid shows 3 columns of tiles (6 tiles, 2 full rows) on a desktop-width window.
- Each of the 6 thumbnails renders (no broken image icons) and is cropped without obvious distortion.
- Hovering a tile shows the border/shadow hover state.

- [ ] **Step 3: Check mobile layout**

In Chrome DevTools, toggle device emulation to a width ≤768px (e.g. iPhone). Confirm the grid collapses to a single column.

- [ ] **Step 4: Check link targets**

Click each of the 6 tiles and confirm:
- Tile 1 (사고대처모드) and tile 5 (갑상선 헬스케어) open `projects/hyundai-post-crash.html` and `projects/thyroscope.html` respectively, in a new tab.
- Tiles 2, 3, 4, 6 open their respective PDFs in a new tab (no 404 — this confirms the `%20`-encoded filenames match the real files on disk).

- [ ] **Step 5: Run HTML validation**

Run: `vnu index.html`
Expected: no new errors related to the `#portfolio` section or `.portfolio-*` classes. (If `vnu` is not installed, run `brew install vnu` first, per `CLAUDE.md`.)

If `vnu` reports an unencoded-space or invalid-URL error on any of the PDF hrefs, double check the exact on-disk filename with `ls portfolio/` and adjust the `%20` encoding in the affected `<a href="...">` in `index.html` to match exactly.

- [ ] **Step 6: Run accessibility audit**

In Chrome DevTools → Lighthouse → check "Accessibility" → Analyze page load.
Expected: no new violations introduced (e.g. missing alt text, insufficient contrast, non-focusable interactive elements). Since `.portfolio-title`/`.portfolio-meta` reuse existing color variables already used elsewhere on the page, no new contrast issues are expected.

- [ ] **Step 7: Keyboard navigation check**

Tab through the page with the keyboard from the "Awards & Recognitions" nav link onward. Confirm the "Portfolio" nav link and all 6 portfolio tiles receive a visible focus outline in tab order.

- [ ] **Step 8: Commit any fixes**

If any issues were found and fixed in `index.html` during this task, commit them:

```bash
git add index.html
git commit -m "Fix Portfolio section issues found during validation"
```

If no issues were found, skip this step (nothing to commit).
