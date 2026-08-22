# Glandy: Thyroid Healthcare App Improvement & Launch

**Organization** · Thyroscope
**Role** · Product Designer — user research (interviews & surveys) to define improvement points, app UI/UX design, and Google Analytics analysis to inform product strategy

## Overview

Glandy is a habit-formation healthcare app for thyroid patients that combines resting-heart-rate tracking, diagnostic surveys, and a medication diary to help users manage a chronic condition day to day. During the paid beta, users were confused by basic functions and lacked motivation to complete daily tracking tasks. I led user interviews and GA funnel analysis to redefine the product around real disease-management needs, restructured the core app experience into three purpose-built tabs, and separately fixed a signup funnel that was losing more than half of new downloads — lifting download-to-signup conversion by 18.6 percentage points within two weeks of shipping.

## Problem / Context

The beta app generated frequent user-voice complaints about locating basic functions ("Where do I go to edit the survey?") and lacked motivation for daily-tracking features users didn't understand the purpose of ("Why do I need to measure my heart rate every day?"). The company's existing feature definitions were business-driven rather than grounded in what hypothyroidism/hyperthyroidism patients actually needed at each stage of managing their condition, and it was unclear whether the app's paid-beta feature set reflected what users actually wanted to use. Separately, a marketing campaign was driving app downloads, but a large share of new users dropped off before completing signup, wasting acquisition spend.

## Process / Approach

Conducted in-depth interviews (IDI) with 5 beta users who had used the service for 3+ months (ages 26–50, mix of hypothyroidism and hyperthyroidism diagnoses) to surface real disease-management scenarios and pain points. Synthesized findings into 2 target personas differentiated by underlying motivation (emotional encouragement vs. professional/clinical trust) and mapped a 6-stage user journey (pre-diagnosis → immediately post-diagnosis → in treatment → complications → prognosis monitoring → cured) to define which features the app needed at each stage. Post-launch, surveyed 57 in-app community users on feature usage, then ran follow-up IDIs with the 5 respondents who volunteered. Separately, used Google Analytics funnel analysis to quantify drop-off at each step of the signup flow (entry 99.5% → back button 62.5% → login 46% → back 32.9% / signup 64.2% → back 70.6%), isolating exactly where and how much of the funnel was leaking.

## Solution / Design

Restructured the app's information architecture from overlapping, ambiguous functions into three purpose-built tabs: **Home** (daily essential routine — heart rate graph, diagnostic survey, daily medication check), **Records** (weekly health tracking — heart rate, medication achievement, weight), and **Statistics** (1+ month trends as a comprehensive report). Redesigned the resting-heart-rate widget from a single-day number into a 7-day trend chart (validated through internal usability testing and medical-expert input) and changed medication checking from a per-pill toggle to a single batch check-in by dose/time. Shipped 3 new features sourced directly from interview pain points: an eye-complication self-screening tool built with an ophthalmologist (selfie-based pre-diagnosis), an AI-assisted coaching report generated from lifestyle-survey and diagnostic data, and a peer community with expert columns.

For the signup funnel, formed a hypothesis from the GA data — users without an account tap the most visible "Login" button, then bounce because there's no visible path to sign-up — and shipped 3 minimal, targeted changes: rebalanced CTA button emphasis on the login/signup screen, collapsed the terms-agreement step into a single consent-and-continue button, and added Naver/Kakao social login alongside Apple/Google/email to reduce friction for the 40–50s segment (the group most likely to drop off), who showed low preference for email verification (18.75%).

## Impact / Outcome

Download-to-signup conversion rose **18.6 percentage points (28.1% → 46.7%)** within roughly two weeks of shipping the signup-funnel changes. In the post-launch survey of 57 users, the redesigned core features matched actual usage: heart rate monitoring (20.3%) and the lifestyle/symptom survey (18.1%) ranked as the top two most-used features, validating the information-architecture decisions drawn from the interview findings. Qualitatively, users reported forming new health-monitoring habits and independently noticing correlations between their heart rate trends and thyroid blood test results after the redesign.

## Reflection

This project paired qualitative research (interviews, personas, journey mapping) with quantitative funnel analysis on the same product, applying each method where it was strongest — interviews to find the right features, funnel data to fix the right screen. The signup-funnel work in particular reflects a habit of forming a testable hypothesis from data before touching the UI, then verifying impact with a number after shipping.
