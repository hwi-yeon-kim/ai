# Post-Crash UX: Multi-Modal Interfaces for Immediate Driver Response

**Organization** · Hyundai Motor Company
**Role** · Product Designer — GUI concept definition and design, experiment design, results analysis, and paper writing
**Recognition** · Co-filed a patent with the USPTO based on this research; findings published as a Work-in-Progress paper at AutomotiveUI 2025

## Overview

When Hyundai's team disagreed over whether a new in-car "accident response mode" should use a step-by-step Wizard UI or a conversational Chat UI, and on which device (vehicle display vs. mobile), I designed and ran a controlled crash-simulation experiment with 25 drivers to settle the question with data instead of opinion. The study found that device and interface preference split sharply by driving experience and accident history — evidence that directly shaped a personalized-design recommendation — and the results were accepted as a Work-in-Progress paper at AutomotiveUI 2025.

## Problem / Context

The team was designing a new vehicle-system concept letting drivers handle minor accidents themselves (auto-notifying police/ambulance/insurance, collecting on-site information) but was split on two open design questions: an AI Chat-style interface vs. a step-by-step guided (Wizard) interface, and whether it should live on the in-vehicle display or the driver's mobile phone. Existing academic research on driver behavior focused almost entirely on accident *prevention* (risk perception, cognitive load in complex driving environments, trust in ADAS) and offered no evidence on how drivers want to be supported in the minutes immediately *after* a collision. With no reference concept and no usability research to draw on, design decisions were being made from individual team members' personal driving/accident experiences rather than evidence.

## Process / Approach

Designed and ran a between-subjects lab experiment with **25 licensed drivers**, screened by age, gender, education, driving experience/frequency, digital literacy, and prior accident history. Each session followed a 4-stage protocol: screening → pre-interview (on the participant's own accident experiences and pain points) → the experimental task (watching a realistic crash video in a physical driving-simulator rig, then handling the resulting accident-response flow, with both device options available and interface type — Wizard or Chat — assigned by participant group) → post-interview (device choice rationale and an interface-preference vote). Cognitive workload was measured quantitatively with the **NASA-TLX** scale; preference differences were tested for statistical significance using chi-square/Cramer's V, and open-ended interview responses were analyzed via **thematic coding** to surface qualitative themes.

## Solution / Design

Designed and prototyped two complete interface concepts, each built to run on either device form factor (in-vehicle display or mobile), so the experiment could independently test device and interface type. The **Wizard UI** used an explicit step-by-step flow — accident detection → automatic report confirmation (119 ambulance / 112 police / insurance company) → live collection of accident-related info (nearby CCTV, vehicle condition) → a final accident-handling status screen. The **Chat UI** delivered the same underlying accident-response logic through an AI assistant conversation — asking clarifying questions (e.g., "Is an ambulance needed?"), narrating automatic-reporting progress, and surfacing the same status information conversationally rather than as discrete screens. This 2×2 device × interface design, backed by a physical simulator rig (dashboard monitor for the crash video, a vehicle-interface display, and a mounted mobile device), turned an internal design disagreement into a testable hypothesis.

## Impact / Outcome

Across the 25 participants, device and interface preference were driven almost entirely by driving experience and accident history, not personal taste: **93.3% of drivers with 1+ years of experience preferred mobile**, versus **80% of novice drivers (<1 year) preferring the in-vehicle display** (p = .001, Cramer's V = 0.66); every participant with a prior accident history (8/8, 100%) preferred mobile, citing familiarity and ease of taking photos for claims. Interface preference showed the same split: **87.5% of novice drivers preferred the Wizard UI**, while **71.4% of experienced drivers preferred the Chat UI** (p < .05, Cramer's V = 0.47). Overall cognitive workload (NASA-TLX) was statistically identical between the two interfaces (22.43 vs. 22.43), but Wizard UI scored significantly higher on the Mental Demand sub-scale specifically (p = .005) — evidence that a rigid step-by-step structure can demand more active attention than a conversational one, even at equal overall workload. The study was accepted as a Work-in-Progress paper at **AutomotiveUI 2025** ("Post-Crash UX: Multi-Modal Interfaces for Immediate Driver Response"), and the underlying interface concepts were developed into a patent co-filed with the USPTO.

## Reflection

This project shows how a team-level design disagreement with no clear "right answer" can be resolved by designing a controlled experiment rather than continuing to debate from anecdote. Segmenting the statistical results by driving experience and accident history — rather than only reporting an aggregate preference — turned a simple "which UI is better?" question into an actionable, personalized-design recommendation (guide novices step-by-step; let experienced drivers delegate to automation).
