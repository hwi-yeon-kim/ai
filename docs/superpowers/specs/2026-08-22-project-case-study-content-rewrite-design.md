# Project Case Study Content Rewrite — Design

Date: 2026-08-22

## Summary

Rewrite the content of all 6 portfolio case studies as structured, English-language `.md` drafts, curated for a US big-tech audience across two overlapping target roles: **Product Designer** and **Quant UX Researcher**. This is **Phase 1 (content) of a two-phase effort**; visual/style redesign of the case study pages (including reconsidering `hyundai-post-crash.html`'s current design system) is **Phase 2**, explicitly deferred to a separate future spec.

Content work proceeds **one project at a time**: read source PDF → write `.md` draft → request needed images/fact-checks from the user → get user approval → move to the next project.

## Scope

**In scope — all 6 existing/planned case studies, all sourced from PDFs in `portfolio/`:**

| Project | Source PDF | Draft slug (proposed) |
|---|---|---|
| 사고대처모드 서비스 컨셉 검증 | `(현대자동차) 사고대처모드 서비스 컨셉 검증.pdf` | `hyundai-post-crash` |
| 갑상선 헬스케어 앱 개선 및 출시 | `(타이로스코프) 갑상선 헬스케어 앱 개선 및 출시.pdf` | `thyroscope` |
| 공모전 수상 | `(현대자동차) 공모전 수상.pdf` | `hyundai-competition-award` |
| 지능형 문서처리(IDP) API 데모 디자인 | `(업스테이지) 지능형 문서처리(IDP) API 데모 디자인.pdf` | `upstage-idp-demo` |
| 마이데이터 UI/UX 개편 제안 | `(경남은행) 마이데이터 UI:UX 개편 제안.pdf` | `bnk-mydata-redesign` |
| 시각화 썸네일에 대한 디자인 스터디 | `(UNIST, 논문) 시각화 썸네일에 대한 디자인 스터디.pdf` | `unist-visualization-study` |

Note: `hyundai-post-crash` and `thyroscope` already have existing (differently-styled) HTML pages — those pages are **not edited in this phase**. This phase only produces new `.md` drafts under `projects/drafts/`, sourced from the PDFs above, replacing what those HTML pages currently say as the basis for a future Phase 2 rebuild.

**Explicitly out of scope for this phase:**
- Any HTML/CSS work on `projects/*.html` or `index.html` (Phase 2).
- The 2 previously-excluded projects (IVI PoC, Thyroscope back-office design) — still excluded; not reconsidered in this pass.
- Sourcing images (mockups, screenshots) — requested from the user per-project as needed, not fetched automatically.
- The `index.html` About-section positioning statement ("Product Designer with a data/engineering background") — flagged here as a related follow-up but written as its own separate small task, not part of this content-rewrite spec.

## Process

1. Work **one project at a time**, in this order: `thyroscope` (already selected by the user as first) → remaining 5 in an order the user can adjust as we go.
2. For each project:
   a. Read the full source PDF (all pages).
   b. Draft `projects/drafts/<slug>.md` in English, following the shared template below.
   c. If the draft needs an image (app mockup, diagram) not already available in English, ask the user to supply a translated/English version.
   d. If any fact needs verification (metrics, dates, org names, outcomes) that aren't clearly stated in the PDF, ask the user directly rather than guessing.
   e. Present the draft to the user for review/approval before moving to the next project.

## Template

Every `.md` draft uses this shared structure (general case-study shape, not the research-paper-style structure of the current `hyundai-post-crash.html`):

```markdown
# <Project Title>

**Organization** · <Org> · <Date range>
**Role** · <Role(s)>
**Recognition** · <Awards/patents/publications, if any>

## Overview
2-4 sentences: what the project was, why it mattered, one-line outcome.

## Problem / Context
What problem existed, for whom, and why it was worth solving. Include the business/user context that motivated the work.

## Process / Approach
How the problem was investigated and how decisions were made. **Must name the specific method(s) used** (e.g., "log data analysis of N sessions", "moderated usability test with N participants", "A/B test with N% traffic split", "statistical significance testing") — not just "conducted research."

## Solution / Design
What was actually designed/built. Include any technical/engineering artifacts produced (data pipelines, visualization systems, dashboards) alongside the design output — this is a deliberate signal of the data/engineering-adjacent design skillset.

## Impact / Outcome
**Must lead with a number** where one exists (conversion lift, error reduction, patent/publication credit, award, adoption rate). If no hard metric exists for a given project, state the most concrete qualitative outcome available — do not fabricate a number.

## Reflection (recommended, not strictly required)
1-3 sentences on what this project demonstrates about the intersection of design and data/engineering — kept short, since the portfolio-wide positioning statement lives in `index.html`'s About section, not repeated per-project.
```

## Content curation lens ("US big tech" bar)

Two target roles are being optimized for simultaneously: **Product Designer** and **Quant UX Researcher**, leveraging a data/engineering background. Per-project curation must satisfy both audiences via two mandatory elements embedded in the template above, not via separate framing per role:

- **Method naming** (in Process/Approach): reviewers evaluating for Quant UX Researcher roles look for reproducible methodology, not just "did research."
- **Quantified impact** (in Impact/Outcome): numbers first, wherever the source material supports them.

The broader positioning statement ("Product Designer with a data/engineering background," targeting Product Designer + Quant UX Researcher roles) is stated once, in `index.html`'s About section — tracked as a follow-up task, not part of this spec's deliverables.

## Save location

`projects/drafts/<slug>.md` — one file per project, matching the slugs table above. Directory already created (`projects/drafts/`).

## Out of scope / explicitly deferred

- **Phase 2 (visual/style redesign)**: reconsidering `hyundai-post-crash.html`'s current design system for a US-big-tech-caliber look, and applying a unified style across all 6 projects to convert these `.md` drafts into final HTML pages. Deferred to its own future spec, to be brainstormed after Phase 1 content is complete and approved.
- `index.html` About section positioning statement update — small separate follow-up task, not bundled into this content spec.
- IVI PoC and Thyroscope back-office projects — remain excluded.

## Testing / validation

Since this phase produces Markdown drafts (no HTML/CSS), validation is manual and content-focused:
1. After each draft, the user reviews it directly (no automated check applicable).
2. Confirm every fact in the draft traces back to either the source PDF or an explicit user-provided answer — no invented metrics or claims.
3. Confirm the draft follows the shared template's six sections (Reflection may be omitted only if it adds nothing project-specific).
