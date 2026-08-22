# Project Case Study Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task, in this session, pausing for user review after each task. Do NOT use subagent-driven-development for this plan — every task ends with a mandatory user-approval gate (and possibly an image/fact request) before the next task may start, which requires staying in the same conversation with the user rather than dispatching isolated subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce 6 English-language `.md` case study drafts (one per project) in `projects/drafts/`, each following the shared template and content lens defined in `docs/superpowers/specs/2026-08-22-project-case-study-content-rewrite-design.md`.

**Architecture:** No code changes. Each task reads one source PDF end-to-end, drafts a Markdown file following the shared template, surfaces any open questions (missing facts, needed images) to the user, and commits only after the user approves the draft. Tasks run strictly in sequence — task N+1 does not start until task N's draft is approved.

**Tech Stack:** Markdown, the `Read` tool (PDF support), git.

**Reference spec:** `docs/superpowers/specs/2026-08-22-project-case-study-content-rewrite-design.md`

**Note on testing:** This is a content-authoring plan, not a code change — there is no automated test suite to run. Each task's "verification" step is the user reading the draft and either approving it or requesting changes. This follows the spec's own "Testing / validation" section, which specifies manual, content-focused review instead of automated tests.

---

### Task 1: Draft Thyroscope case study content

**Files:**
- Create: `projects/drafts/thyroscope.md`
- Read (source): `portfolio/(타이로스코프) 갑상선 헬스케어 앱 개선 및 출시.pdf` (14 pages)

- [ ] **Step 1: Read the full source PDF**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(타이로스코프) 갑상선 헬스케어 앱 개선 및 출시.pdf", pages: "1-14" })
```
14 pages fits in a single `Read` call (the tool's cap is 20 pages per request).

- [ ] **Step 2: Extract the facts the template needs**

While reading, note down (in your own scratch notes, not yet in the file):
- Org name, project date range, your role(s), any awards/patents/publications mentioned.
- The core problem/context: what user or business problem existed before this project.
- The specific method(s) used to investigate the problem (e.g. usability testing, log/funnel analysis, A/B test, survey — name the actual method described in the PDF, with sample sizes if given).
- What was actually designed/built, including any data/engineering artifact (dashboard, pipeline, analysis script) if the PDF mentions one.
- Any quantified outcome (conversion change, retention change, award, adoption number). If the PDF gives no hard number, note the most concrete qualitative outcome instead — do not invent a number.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/thyroscope.md` with this exact structure (fill in each section using ONLY facts found in Step 2 — leave a `[NEEDS INPUT: ...]` marker inline for anything the PDF doesn't answer, rather than guessing):

```markdown
# <Project Title>

**Organization** · <Org> · <Date range>
**Role** · <Role(s)>
**Recognition** · <Awards/patents/publications, if any — or omit this line entirely if none>

## Overview
<2-4 sentences>

## Problem / Context
<what problem, for whom, why it mattered>

## Process / Approach
<name the specific method(s) used, with sample sizes/scale where available>

## Solution / Design
<what was designed/built, including any data/engineering artifact>

## Impact / Outcome
<lead with a number if one exists; otherwise the most concrete qualitative outcome>

## Reflection
<1-3 sentences on what this project demonstrates about the design/data intersection — keep short>
```

- [ ] **Step 4: List open questions for the user**

In your response to the user (not in the file), list:
- Any `[NEEDS INPUT: ...]` markers left in the draft, as direct questions.
- Any image/mockup from the PDF that would strengthen the draft and should be requested as a translated/English asset.

- [ ] **Step 5: Present the draft and wait for approval**

Show the user the full drafted content of `projects/drafts/thyroscope.md`. Do not proceed to Task 2 until the user approves this draft (they may ask for edits — apply them and re-present before moving on).

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/thyroscope.md
git commit -m "Add Thyroscope case study content draft"
```

---

### Task 2: Draft Hyundai Post-Crash case study content

**Files:**
- Create: `projects/drafts/hyundai-post-crash.md`
- Read (source): `portfolio/(현대자동차) 사고대처모드 서비스 컨셉 검증.pdf` (7 pages)

- [ ] **Step 1: Read the full source PDF**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(현대자동차) 사고대처모드 서비스 컨셉 검증.pdf", pages: "1-7" })
```

- [ ] **Step 2: Extract the facts the template needs**

Same extraction checklist as Task 1, Step 2. Additionally: the existing `projects/hyundai-post-crash.html` and `index.html`'s Employment section already describe this project (co-filed USPTO patent `PAT-5`, AutomotiveUI publication `A-2`) — cross-check the PDF's content against these existing claims for consistency, but the PDF is the source of truth for this draft per the approved spec.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/hyundai-post-crash.md` using the exact same template structure shown in Task 1 Step 3, filled in from this project's PDF content.

- [ ] **Step 4: List open questions for the user**

Same as Task 1 Step 4.

- [ ] **Step 5: Present the draft and wait for approval**

Same as Task 1 Step 5, for `projects/drafts/hyundai-post-crash.md`. Do not proceed to Task 3 until approved.

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/hyundai-post-crash.md
git commit -m "Add Hyundai Post-Crash case study content draft"
```

---

### Task 3: Draft Hyundai Competition Award case study content

**Files:**
- Create: `projects/drafts/hyundai-competition-award.md`
- Read (source): `portfolio/(현대자동차) 공모전 수상.pdf` (9 pages)

- [ ] **Step 1: Read the full source PDF**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(현대자동차) 공모전 수상.pdf", pages: "1-9" })
```

- [ ] **Step 2: Extract the facts the template needs**

Same extraction checklist as Task 1, Step 2.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/hyundai-competition-award.md` using the exact same template structure shown in Task 1 Step 3.

- [ ] **Step 4: List open questions for the user**

Same as Task 1 Step 4.

- [ ] **Step 5: Present the draft and wait for approval**

Same as Task 1 Step 5, for `projects/drafts/hyundai-competition-award.md`. Do not proceed to Task 4 until approved.

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/hyundai-competition-award.md
git commit -m "Add Hyundai Competition Award case study content draft"
```

---

### Task 4: Draft Upstage IDP Demo case study content

**Files:**
- Create: `projects/drafts/upstage-idp-demo.md`
- Read (source): `portfolio/(업스테이지) 지능형 문서처리(IDP) API 데모 디자인.pdf` (9 pages)

- [ ] **Step 1: Read the full source PDF**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(업스테이지) 지능형 문서처리(IDP) API 데모 디자인.pdf", pages: "1-9" })
```

- [ ] **Step 2: Extract the facts the template needs**

Same extraction checklist as Task 1, Step 2. This project is likely to have the strongest "engineering artifact" angle (an API demo) — pay particular attention to any technical implementation details described (data flow, model integration, demo architecture) for the Solution/Design section.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/upstage-idp-demo.md` using the exact same template structure shown in Task 1 Step 3.

- [ ] **Step 4: List open questions for the user**

Same as Task 1 Step 4.

- [ ] **Step 5: Present the draft and wait for approval**

Same as Task 1 Step 5, for `projects/drafts/upstage-idp-demo.md`. Do not proceed to Task 5 until approved.

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/upstage-idp-demo.md
git commit -m "Add Upstage IDP Demo case study content draft"
```

---

### Task 5: Draft BNK MyData Redesign case study content

**Files:**
- Create: `projects/drafts/bnk-mydata-redesign.md`
- Read (source): `portfolio/(경남은행) 마이데이터 UI:UX 개편 제안.pdf` (10 pages)

- [ ] **Step 1: Read the full source PDF**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(경남은행) 마이데이터 UI:UX 개편 제안.pdf", pages: "1-10" })
```

- [ ] **Step 2: Extract the facts the template needs**

Same extraction checklist as Task 1, Step 2.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/bnk-mydata-redesign.md` using the exact same template structure shown in Task 1 Step 3.

- [ ] **Step 4: List open questions for the user**

Same as Task 1 Step 4.

- [ ] **Step 5: Present the draft and wait for approval**

Same as Task 1 Step 5, for `projects/drafts/bnk-mydata-redesign.md`. Do not proceed to Task 6 until approved.

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/bnk-mydata-redesign.md
git commit -m "Add BNK MyData Redesign case study content draft"
```

---

### Task 6: Draft UNIST Visualization Study case study content

**Files:**
- Create: `projects/drafts/unist-visualization-study.md`
- Read (source): `portfolio/(UNIST, 논문) 시각화 썸네일에 대한 디자인 스터디.pdf` (23 pages — exceeds the 20-page-per-`Read`-call limit, requires 2 calls)

- [ ] **Step 1: Read the full source PDF in two chunks**

Run:
```
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(UNIST, 논문) 시각화 썸네일에 대한 디자인 스터디.pdf", pages: "1-20" })
Read({ file_path: "/Users/hmc7449283/work/ai/portfolio/(UNIST, 논문) 시각화 썸네일에 대한 디자인 스터디.pdf", pages: "21-23" })
```

- [ ] **Step 2: Extract the facts the template needs**

Same extraction checklist as Task 1, Step 2. This is an academic paper — it will likely have the most rigorous, explicit research methodology (hypotheses, study design, statistical results) of all 6 projects. Extract the actual study design (participant count, conditions, statistical tests/results) precisely for the Process/Approach and Impact/Outcome sections, since this project is the strongest evidence point for the Quant UX Researcher angle.

- [ ] **Step 3: Write the draft using the shared template**

Create `projects/drafts/unist-visualization-study.md` using the exact same template structure shown in Task 1 Step 3.

- [ ] **Step 4: List open questions for the user**

Same as Task 1 Step 4.

- [ ] **Step 5: Present the draft and wait for approval**

Same as Task 1 Step 5, for `projects/drafts/unist-visualization-study.md`.

- [ ] **Step 6: Commit the approved draft**

```bash
git add projects/drafts/unist-visualization-study.md
git commit -m "Add UNIST Visualization Study case study content draft"
```

---

### Task 7: Final review pass across all 6 drafts

**Files:** none created/modified unless issues are found (fix-forward into the relevant `projects/drafts/*.md` file)

- [ ] **Step 1: Re-read all 6 drafts back to back**

```bash
for f in projects/drafts/*.md; do echo "=== $f ==="; cat "$f"; echo; done
```

- [ ] **Step 2: Check cross-project consistency**

Confirm:
- All 6 files use the exact same section headers (`## Overview`, `## Problem / Context`, `## Process / Approach`, `## Solution / Design`, `## Impact / Outcome`, `## Reflection`).
- No leftover `[NEEDS INPUT: ...]` markers remain in any file (each should have been resolved during that project's approval step).
- No two projects use materially different quality bars — e.g. one project naming a specific method/number and another staying vague when the source PDF had the same kind of information available.

- [ ] **Step 3: Report to the user**

Summarize: all 6 drafts complete and approved, ready for Phase 2 (visual/style redesign, to be brainstormed separately). Note explicitly that no HTML/CSS work has started, per the spec's scope boundary.

- [ ] **Step 4: Commit if any fixes were made**

```bash
git add projects/drafts/
git commit -m "Fix cross-project consistency issues in case study drafts"
```

If no issues were found in Step 2, skip this step (nothing to commit).
