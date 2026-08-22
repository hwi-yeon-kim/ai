# IDP API Demo: Turning a CLI-Only Product into a Self-Serve GUI Funnel

**Organization** · Upstage Inc. — Document Intelligence Team
**Role** · Product Designer — stakeholder and end-user interviews, UX design (hi-fi prototype), and self-serve onboarding ("hooking") strategy

## Overview

Upstage's Intelligent Document Processing (IDP) OCR API had no GUI of its own — the only demo tool that existed was built for internal model QA, and every prospective customer had to go through a manual, multi-step process just to try it. I redesigned that internal tool into a public, self-serve demo embedded directly on the homepage, removing the login/token-issuance steps entirely, based on interviews with both internal stakeholders and real API customers. The redesigned demo drove homepage visitors directly into product trial and signup, and cut the customer-to-purchase process from 4 manual steps to 2.

## Problem / Context

The product had recently pivoted from selling bespoke, GUI-based extraction software directly to financial/insurance clients (with low-code customization) to selling the same core OCR capability as a CLI-first API on a self-serve SaaS platform — a shift from white-glove, one-on-one delivery to broad, self-service adoption. The only existing demo tool, however, had been built purely for internal model QA: it exposed technical parameters (model version selectors, confidence thresholds, box-color settings) and internal jargon (e.g., "파싱"/parsing) that meant nothing to an evaluating customer, and getting access to it required a manual request-to-CX-then-token-issuance flow — a process built for a small number of high-touch leads, not for a product now trying to let anyone try it in seconds.

## Process / Approach

Conducted **in-depth interviews (~40 minutes each, with a CX manager present)** with three internal stakeholder teams — Biz (frontline promotion and demo operation), Ops (customer inquiries and token issuance), and Marketing (customer analysis and demo guide creation) — to map the existing demo-delivery process and its pain points. Separately reviewed the existing internal demo's UX directly (a wireframe teardown) to pinpoint two concrete usability failures: unintuitive internal-QA terminology and interface, and a core "upload image" action that was hidden and hard to find despite being the single most support-requested step. Complemented this with an **actual API customer interview** (a Closed Beta Test customer) to understand real purchase-evaluation behavior — customers benchmark competing APIs' performance before buying, purchase decisions involve non-developer stakeholders (PMs, designers) as much as engineers, and some customers reverse-engineer new use cases (e.g., a masking feature) directly from raw API response data. Synthesized all three inputs into a purpose-to-strategy map and redefined the target user from "customers with active purchase intent" to "anyone with interest," collapsing the funnel from a manual 3-step, CX-gated flow ("homepage → token issuance/login → demo") into a 1-step self-serve flow ("homepage demo, no login or token required").

## Solution / Design

Redesigned the demo interface around extraction-result visualization instead of internal QA controls: an example-image gallery to convey the technology's context and suggest new business use cases, an image viewer with zoom/rotate (designed for the demo's small embedded footprint rather than a full screen) so users could compare the source document against the extracted output side by side, and a simplified results panel with a Text/JSON toggle and one-click download in place of the old model-selection and confidence-threshold controls. Embedded this redesigned demo directly on the product homepage with CTA buttons, a free-trial popup, and platform links funneling visitors into SaaS console signup, paired with a free-credit incentive (30,000 KRW of OCR credits for new Upstage Console signups) to convert first-time trial into an active account.

## Impact / Outcome

**40.47% of homepage visitors who reached the demo uploaded an image to try it**, confirming strong interest in hands-on evaluation over passive browsing. Of the visitors who engaged with the demo, the CTA button converted **31.8%**, the free-trial popup **43.3%**, and platform links **24.7%** into further movement toward the SaaS platform. On the sales side, collapsing the manual CX-assignment and back-and-forth negotiation process into a self-serve "try → check pricing → buy" flow reduced the customer-to-purchase process from 4 steps to 2, cutting **up to 2 weeks** off the time from first contact to signed usage.

## Reflection

As the first person to own this API product's demo experience, I initially underweighted the need for a GUI at all — the primary user of an API is a developer, and developers can just call the endpoint directly. The interviews corrected that assumption: developers used the GUI demo to visually sanity-check model quality before writing code, and non-technical stakeholders used it to build internal buy-in for the purchase. This project also reinforced the value of shipping in short, scoped cycles (core functionality first, then visual polish, then marketing/branding) once cross-team scope started growing mid-project, to protect the delivery timeline without cutting quality.
