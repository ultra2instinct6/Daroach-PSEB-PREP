# Changelog

Content and engine changes to the BOLO.INSTINCT PSEB Class 10 Science decks.
Newest first.

---

## 2026-10-03 — BOLO.IM product naming

- Renamed the visible internal-medicine study product to BOLO.IM across the
  tool, home-screen launcher, About section, access screens and page title.
- Kept accurate ABIM exam-preparation references and explicit
  non-affiliation/trademark disclosures; BOLO.IM is not presented as an
  official board product.
- Preserved Gumroad's existing `bolo-abim` permalink, verification product
  identifier and local activation key so configured checkout and existing
  license holders are not broken.
- Refreshed the service-worker cache for this branding update.

## 2026-10-02 — ABIM upfront education mission

- Promoted the opening ABIM funding note into a clearly labelled,
  theme-aware mission panel matching the About page's rounded accent styling.
- Explicitly explained that purchases fund BOLO.INSTINCT, keep PSEB tools
  free for Punjabi youth and support further bilingual content development.
- Matched the checkout and study-footer wording, preserved all medical/AI
  notices and acknowledgement behavior, and refreshed the offline cache to v50.

## 2026-10-02 — Potential and opportunity

- Reworded the opening About quote to emphasize potential in every village
  and town, and equitable opportunity to realize it; offline cache v49.

## 2026-10-02 — Transparent AI-use disclosure

- Added a clearly labelled disclosure at the bottom of About explaining
  AI use in educational content, questions, translations, code and About copy.
- Explicitly acknowledged incorrect facts, answer keys, translations and
  outdated information; did not claim exhaustive expert review or guaranteed
  correctness. Added textbook/teacher verification and medical-use cautions.
- Included a Punjabi summary and a regression test for the disclosure.
- Refreshed the offline cache to v48 for the complete About release.

## 2026-10-02 — Rural education equity and founder vision

- Expanded About with caste-related barriers to educational access and
  the Class 10 transition, distinguishing these from examination marking.
  Linked verified national research without claiming Punjab-specific
  statistics or proven impact from this project.
- Described the rural Punjab focus, inclusive access, independent founder
  effort and hope for future multilingual, worldwide applications.
- Added "It is not about the money" and the three supplied YouTube links
  to the guiding principles, with descriptive new-tab labels.
- Added the existing Gumroad purchase destination for BOLO.ABIM, explaining
  its US physician audience and support for free Punjabi youth resources.
- Added Punjabi summaries and responsive three-card styling; cache v47.
- Verified 12 responsive cases (375–1440px in both themes), all three
  video links, the Gumroad destination, touch targets and sticky dismissal.
  Ten targeted About/offline tests pass; no browser exceptions captured.

## 2026-10-02 — About the founder and mission

- Made the homepage curator name an interactive, hover-highlighted credit
  with a visible About cue and keyboard focus styling.
- Added a theme-aware About dialog with the supplied founder biography,
  Punjab roots, education mission, learning philosophy and dedication.
- Kept the credit tappable on mobile and tablet, with responsive content,
  Punjabi mission text and 44px controls.
- Used a native modal dialog for focus containment, Escape dismissal and
  background isolation; added backdrop dismissal, scroll locking and focus
  restoration. Homepage shortcuts are inactive while About is open.
- Clarified that free PSEB tools are supported by optional contributions,
  advertising and the separate paid ABIM product; included independence
  disclosures and the existing Support BOLO destination.
- Precached About assets for offline use; service-worker cache v46.
- Verified both color themes at 375–1440px, keyboard focus containment,
  dismissal, hover highlighting and offline reload. Nine targeted About
  and service-worker regression tests pass.

## 2026-10-02 — ABIM support-for-free-education note

- Added a short note to the every-visit disclaimer, purchase screen and
  study footer explaining that BOLO.ABIM purchases help keep BOLO.INSTINCT's
  STEM education resources free for learners in Punjab, India.
- Preserved the existing medical, AI and trademark disclosures; cache v45.

## 2026-10-02 — ABIM trademark footer and checkout verification

- Added the requested trademark, non-affiliation and educational-use wording
  below the coffee link in a normal-flow ABIM footer, plus the activation
  screen so prospective purchasers can read it before checkout.
- Docked the existing coffee link in that footer on ABIM only; it no longer
  floats over study options. Other pages retain their existing support UI.
- Retained Neon/Classic styling and bumped the service-worker cache to v44.
- The notice clarifies independence; it is not a legal opinion or guarantee
  of nominative fair use.

## 2026-10-02 — Release review of Chapters 11-16

A pre-release pass over the five decks in folders 11, 12, 13, 14 and 16
(board chapters 12, 13, 15, 14 and 16 — the folder labels are legacy, and
`assets/chapters.js` maps them deliberately). Content was verified item by
item; three real defects were found, all of which affected every chapter, so
the fixes are in the shared engine.

### 1. Long short answers were impossible to get right

Grading was a literal string comparison:

```js
ok = typed.toLowerCase() === expected.toLowerCase();
```

Fine for "Methane". But **30 of the 401 short answers expect four or more
words** — "Blue colour fades and reddish-brown copper deposits", "It absorbs
moisture and slowly turns back into gypsum" — and nobody reproduces those
verbatim. A student who knew the answer was told "Not quite".

Grading now normalises both sides (case, punctuation, `&` vs `and`, `+`,
subscripts, arrows, simple plurals) and then:

* **1-3 content words** must still match, but survive punctuation, plurals and
  a single-character typo;
* **4+ content words** are scored on content-word overlap, so a correct answer
  phrased differently passes while a different concept does not.

Guarded by `Scripts/test_short_answers.js` — **1,232 assertions**: all 401 real
answers still accepted verbatim / uppercased / punctuated, 16 reasonable
rephrasings now accepted, and 13 near-miss wrong answers still rejected
("nuclear fusion" against "nuclear fission" scores 0.5 and fails).

### 2. Screen-reader gaps

* **51 short-answer boxes** in these five chapters (and more elsewhere) had no
  label at all — announced as "edit text, blank". They now take an
  `aria-label` from their own question plus a bilingual placeholder.
* **510 Gurmukhi spans** carried no `lang` attribute inside a `lang="en"`
  document, so a screen reader pronounced Punjabi with an English voice. All
  `.punjabi` / `.punjabi-block` text is now marked `lang="pa"`, including the
  feedback cards, breadcrumb and milestone banners that are generated at
  runtime.
* Equations rendered with KaTeX `output: "html"`, which omits the MathML layer
  entirely. Switched to **`htmlAndMathml`**: screen readers now get a proper
  MathML reading and the visual layer is marked `aria-hidden`. A chemistry deck
  a blind student cannot read is not finished.
* Icons inside already-labelled buttons, and pure-shape graphics with no text,
  are now `aria-hidden` so assistive tech stops narrating vector paths.

### 3. Chapter 16 contradicted itself on stakeholders

The Stakeholders slide lists **four** groups (local people, forest department,
industrialists, wildlife enthusiasts), matching NCERT. A quiz item asked for
"the three main stakeholder groups" and accepted only three. Question, expected
answer and both explanations corrected to four.

### Verified

Content for all five chapters was reviewed item by item — every True/False
statement, every keyed multiple choice, every short answer and every worked
numerical (Ohm's law, power, energy in kWh, parallel resistance, `F = BIL`).
Chapters 11, 12, 13 and 14 needed no content changes.

Because the fixes are in shared files, the whole syllabus was re-tested at
414px and 1440px:

| Check | Result |
|---|---|
| MCQ / True-False groups responding | **1,236 / 1,236** |
| Short answers responding | **802 / 802** |
| Toolbar rows / horizontal overflow | 1 row, 0 overflow |
| KaTeX render errors | 0 |
| Unlabelled inputs · Punjabi without `lang` | 0 · 0 |
| Console and page errors | 0 |

Also checked for these five chapters: deck audit clean, 79 local asset
references all resolve, no element overflows its content box at 375/414/768/
1440, and every interactive widget responds without throwing.

`sw.js` bumped to **v43**.

---

## 2026-10-02 — Dead answer buttons fixed

Reported symptom: "some slides and MCQ questions don't respond to answer
selection". Two separate causes, both of which left a button looking perfectly
normal — rendered, enabled, styled — while doing nothing at all when tapped.

### 1. Case Study questions did nothing (10 questions, Chapters 1–5)

The shared answer handler resolved its question container with
`btn.closest(".sub-slide")` and bailed out when that returned null:

```js
var qDiv = btn.closest(".sub-slide");
if (!qDiv) return;          // <- silently gave up
```

Most quizzes sit inside a `.sub-slide` carousel, but the **Case Study question
slides put their options straight into the content box**, with no `.sub-slide`
anywhere. Every one of those answers was a no-op.

Fixed by resolving the quiz through a new `qfScope()` helper that falls back to
the content box and locates the matching `.feedback` by walking forward from
the option group. Buttons are scoped to their own group rather than the whole
box, so a slide carrying two quizzes can never disable both at once.

Affected: 2 Case Study questions in each of Chapters 1, 2, 3, 4 and 5.

### 2. One True/False button had no handler at all (Chapter 4)

```html
<button class="option-btn" oncli
    ck="checkAnswer(this, true, false)">True</button>
```

The attribute name was split across a line break, so the browser read two
meaningless attributes (`oncli` and `ck`) and attached no handler. This was the
**correct** answer on Chapter 4's True/False question 2 — a student picking the
right answer got nothing back.

### Verification

Every quiz item in every chapter was driven programmatically: click an option,
then assert the button disables, takes a correct/incorrect class, and renders
feedback. Short answers were filled with their expected value and submitted.

| | Before | After |
|---|---|---|
| MCQ / True-False groups responding | 607 / 618 | **618 / 618** |
| Short answers responding | 401 / 401 | **401 / 401** |

Every other interactive widget was also exercised across all 16 chapters —
Next Question, sort-and-drop, matching, sequencers, flip cards, cloze blanks,
the flagship labs, the ray bench, the balancer steppers and the reaction
classifier — **0 thrown errors, 0 console errors**.

### Guards added

`Scripts/audit_decks.js` gained two checks that catch these classes directly,
verified by reintroducing the Chapter 4 bug and confirming it is reported:

- every answer button (`.option-btn`, `.sa-submit-btn`) must carry a click
  handler — **1,949 checked**;
- no `on*` attribute name may be split by whitespace.

Together with the existing handler-parse check, **3,597 inline handlers** are
now validated on every run.

`sw.js` cache version bumped to **v42** so the corrected engine reaches students
who already have the old copy cached offline.

---

## 2026-10-02 — Mobile ABIM launcher clearance

- Replaced the mobile home-screen ABIM text pill with an accessible 48px
  stethoscope button beside the coffee cup instead of above it.
- Kept a compact due-count badge, matching safe-area-aware bottom spacing
  for both buttons and retaining desktop labels and theme styling.
- Hide the redundant floating ABIM shortcut inside the study tool on phones;
  the header's Start Practice control remains available without covering
  answer options. Service-worker cache bumped to v41.

## 2026-10-02 — ABIM study-home and release navigation polish

- Added two selectable Study Home panels: Test Bank and Flashcard Review.
  Removed the automatic practice-launcher interruption after activation.
- Added system-by-system flashcard sections with due-card review and
  optional practice of all saved cards, using the same SRS grading engine.
- Preserved header Review access from the test bank/submitted question
  review, with explicit protection for unsubmitted practice blocks.
- Added Study Home/section return routes, mobile stacking, visible keyboard
  focus and reduced-motion support in both Neon and Classic themes.
- Cancel pending flashcard grading animations when leaving review, avoiding
  delayed actions against a different study screen.
- Service-worker cache bumped to v40.

## 2026-10-02 — Upfront disclaimer on every visit and themed access screens

- Show the Medical & AI Disclaimer before license entry, checkout and study
  on every ABIM page visit, including returning purchasers and receipt URLs.
- Acknowledgement is now in-memory only; old saved acceptance never skips
  the notice. Receipt verification waits for acknowledgement.
- Keep background interaction and study initialization blocked until both
  acknowledgement and license activation have completed.
- Match both access screens to the shared Neon/Classic preference and add
  theme switches with accessible focus containment.
- Updated gate-flow regressions and service-worker cache to v39.

## 2026-10-02 — Full website publication and memory-card durability

- Published the pending PSEB MCQ expansion: 238 bilingual questions
  (Science 42, Math 87, English 109), including its existing review log.
  Added a reproducible schema, duplicate, bilingual-field and syntax audit.
- Classified ABIM activation as device-wide so learner resets/imports
  preserve it and new backup files never export the license key.
  Legacy backup activation fields are omitted with an explicit warning.
- Added ABIM SRS and PSEB flashcard progress to the IndexedDB mirror,
  including memory-card import/reset housekeeping.
- MCQ, flashcard and ABIM engines now wait for learner-slot and backup
  restoration before reading saved progress, preventing restored data from
  being replaced by a fresh session at startup.
- Verified isolated slot switching across home, MCQs, flashcards, lectures
  and ABIM after mocked purchase activation; checked backup round-trips and
  restoration after removing only synthetic localStorage study keys.
- Restored GitHub Pages publishing from `main` after the repository became
  public again. Service-worker cache bumped to v38.

## 2026-10-02 — Medical & AI disclaimer acceptance

- Added the requested trademark, AI accuracy, and educational-use disclaimer
  after Gumroad activation and before study initialization.
- Remember acceptance device-wide under `bolo_abim_disclaimer_accepted`;
  only `"true"` bypasses the disclaimer on subsequent visits.
- Require explicit acceptance with focus containment and blocked background
  keyboard/pointer interactions. Failed storage writes show a retry error.
- Added regression coverage for paywall priority, deferred initialization,
  missing/false acceptance, keyboard blocking, and persistence failure.
- Service-worker cache bumped to v37.

## 2026-10-02 — ABIM/PSEB integration verification

- Corrected timeout reporting when Gumroad's response body stalls.
- Respect the shared memory-card helper's failed-write result, showing an
  explicit visit-only activation warning instead of implying the key saved.
- Excluded receipt/admin ABIM URLs from service-worker caching so license
  credentials are not retained in cache request keys; cache bumped to v36.
- Added response-body timeout and service-worker regression tests while
  retaining public PSEB and ordinary ABIM offline caching.
- Full PSEB deck audit and the 250-question/750-card ABIM audit passed.
  Public checkout overlay and live invalid-license rejection were checked;
  a real paid-license activation still requires a seller-controlled test.
- Isolated browser smoke checks covered PSEB MCQs, flashcards, lecture
  navigation and themes, plus ABIM Tutor/Mock, Labs, SRS, expiry submission
  and learner-slot isolation. Existing learner data was not used or reset.

## 2026-10-02 — ABIM v3.2: ABIM-only page and Gumroad activation

- Removed the legacy PSEB question/demo mode from the ABIM page. It now
  opens as BOLO.ABIM with or without URL parameters; the floating pill
  launches an ABIM session instead of switching subjects.
- Added a fullscreen activation form, Gumroad checkout overlay/link,
  URL receipt-key verification, loading/error states, and remembered
  device-wide activation without changing learner-slot progress.
- Rejects invalid, refunded, chargebacked and disputed purchases.
  Credentials are removed from URLs before analytics runs.
- No hardcoded master password or URL administrator bypass is published.
  This static activation screen is bypassable; cached activation is not
  revocation enforcement. Secure paid-content delivery requires a backend,
  as documented in [ABIM-ACCESS.md](./ABIM-ACCESS.md).
- Added mocked activation tests; no real license is used in validation.
- Service worker cache bumped to v35, including the activation assets.

## 2026-10-02 — ABIM Board Prep v3.1: Tutor and timed practice blocks

- **Full editorial review of all 250 questions and 750 cards**, including
  the entire latest 80-item expansion. Reviewed clinical context,
  single-best-answer defensibility, explanation/option consistency,
  flashcard details and duplicate tested decisions.
  - Refined 137 question records across the two review scopes, including
    clinical clarification and distractor-quality improvements, not just
    factual corrections.
  - Updated guideline-sensitive teaching: 2024 hyperglycemic crisis
    guidance, 2025 primary aldosteronism and retinal screening, 2026
    dyslipidemia guidance, HRS criteria, and US medication availability.
  - Distinguished postpartum thyroiditis **diagnosis** from **management
    during lactation**, and pregnancy antihypertensive safety from
    **preeclampsia prophylaxis planning**, resolving repeated decisions
    without changing stable question IDs, answer positions or card keys.
  - Related diagnoses remain where the tested task differs; exact stem and
    front/back-card duplicates are checked automatically. Editorial review
    is not clinical certification or a guarantee against future guideline
    changes.
  - Source checks include [ACC 2026 dyslipidemia guidance](https://www.acc.org/latest-in-cardiology/journal-scans/2026/03/13/15/20/acc-aha-release-new-clinical-guideline-for-managing-dyslipidemia),
    [AAO retinal screening](https://www.aao.org/education/clinical-statement/revised-recommendations-on-screening-chloroquine-h),
    [FDA clozapine REMS update](https://www.fda.gov/drugs/drug-safety-communications/fda-removes-risk-evaluation-and-mitigation-strategy-rems-program-antipsychotic-drug-clozapine),
    [FDA Andexxa safety/US sales update](https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/update-safety-andexxa),
    and [CDC adult vaccine notes](https://www.cdc.gov/vaccines/hcp/imz-schedules/adult-notes.html).
- **Create Session / Start Practice** selects Tutor or Timed Mock, Unused /
  Incorrect / Flagged / All questions, and 10 / 30 / 60 items. When fewer
  eligible questions exist, the launcher explains the smaller available
  block rather than repeating items.
- **Tutor** retains immediate feedback, explanations and unlocked core
  concepts. **Timed Mock** keeps changeable selections separate from saved
  progress and hides feedback until submission.
- Mock blocks allocate **100 seconds per item** (60 items = 100 minutes).
  A deadline-based countdown continues while the tab is hidden, warns below
  five minutes and submits automatically at zero.
- Flagging, numbered navigation and option elimination support block
  navigation without revealing the key. Touch long-press provides
  elimination without selecting an answer.
- Submission includes an unanswered-item confirmation (except automatic
  timeout), raw score, percentage, pace against the 100-second target, and
  a per-system breakdown. **65–68% is a study target only**; ABIM uses scaled
  scoring, not a fixed raw-percent passing threshold. This is an independent
  educational simulation, not an official ABIM or Prometric product.
- Debrief offers review of all or only missed items and an explicit action
  to send missed concepts, including unanswered items, to the active slot's
  spaced-review deck at the **Again / 10-minute** interval.
- Memory-card slots, existing saved cards, lab references, both themes and
  spaced review remain integrated. Session answers/configuration are
  memory-only; submitted progress and flags use the active slot.
- Added `node Scripts/audit_abim.js`: validates the 250-question / 750-card
  schema, stable balanced answer positions, unique stems and card pairs,
  table dimensions, explanation markup and inline engine syntax.
- Browser regression exercised rendering and unlocking all 250 items /
  750 cards at phone width, both modes, 60-item timing/expiry, answer privacy,
  touch elimination, block submission/review, 10-minute missed-card
  scheduling, save failure/retry, corrupt-storage protection, and learner
  slot isolation. Tests use isolated browser contexts with synthetic data.
- Service worker cache bumped to v34.

## 2026-10-02 — ABIM Board Prep v3.0: 250 questions and study-flow UI

- **Content: 170 → 250 questions, 750 core-concept cards, 184 comparison
  tables.**
  - The 80 new items follow the blueprint weighting: CV 10, Endo 7, GI 7,
    Pulm 7, Rheum 7, ID 6, Neph 5, Heme 5, Onc 5, Neuro 4, Psych 3, Derm 3,
    OB/GYN 3, Geri 3, Foundations 3, Critical Care 2.
  - New topics include NSTEMI timing, CCTA, constriction, ATTR amyloid,
    Mobitz II, torsades, IV iron in HF, Brugada, myocarditis, HHS, CSW vs
    SIADH, Graves in pregnancy, prolactinoma, atypical femur fracture, dRTA,
    ADPKD, Barrett/EoE/achalasia, MASLD FIB-4, HRS, PBC, A–a gradient, PFT
    patterns, HP, bronchiectasis, asbestosis, COPD triple therapy, CPPD, APS,
    SSc-ILD, HCQ retinal screening, necrotizing fasciitis, TB-IRIS, PCP
    steroids, ARN, IgG4-RD, DIC, G6PD, MGUS, CLL, EGFR NSCLC, testicular
    markers, TCA toxicity, CO poisoning, ALS, RLS, clozapine, PTSD, erythema
    nodosum, ectopic pregnancy, Beers criteria, pressure injury, elder abuse,
    proxy decisions, emergency consent and asplenia vaccines.
  - Every new item passed schema validation and an independent accuracy
    review (5 corrections, including Barrett surveillance intervals).
  - The answer key stays balanced (A 64 / B 62 / C 62 / D 62).
  - Older items where the correct answer was obviously the longest had their
    distractors rewritten to remove the length cue.
- **Status filter**: All / ✦ New / ✖ Missed / ✓ Correct, with live counts,
  combined with the system filter. The list is frozen until a filter
  changes, so answering a "New" item does not yank it away. 🎲 Random jumps
  within the current list. An empty list shows a friendly empty state.
- **Compact system chips**: one horizontally scrolling row (it was four
  wrapped rows) with a thin per-system completion bar.
- **Dense progress track**: banks over 40 items render as a continuous heat
  strip with a raised current marker. At 250 items the old spaced pills had
  collapsed to zero width.
- **Option elimination**: ⊘ button, right-click, or Shift+A–D strikes out a
  distractor, as in the real exam interface.
- **Pacing timer**: ⏱ per item, which turns amber past 2:00 (ABIM pace),
  pauses when the tab is hidden, and is saved with the answer.
- **⇥ Next new** link and the `N` key jump to the next unanswered item.
- **📊 Progress dashboard** (replaces the Blueprint button): answered,
  accuracy, average time and cards due, plus per-system answered/accuracy
  bars. It suggests the weakest system ("Review missed ▸"), and tapping any
  row drills that system. The blueprint outline sits below.
- Service worker cache bumped to v33.

## 2026-10-02 — ABIM Board Prep v2.9: comparison tables and motion

- **📊 Comparison tables** (new optional `tb` field): 147 of the 510 cards now
  carry a compact table, covering differentials, criteria and thresholds,
  grade → action, drug choice by scenario, and type A vs B.
  - Two independent reviewers checked every table, and 11 were corrected.
  - The review card shows a full table whose rows cascade in after the flip.
  - Unlocked and saved cards show a compact grid version.
- **Motion**:
  - The 3D flip now animates in place. Before, the card was re-rendered, so
    the rotation never played.
  - New cards deal in.
  - Hovering tilts the card slightly (desktop only).
  - A light sweep crosses the answer panel when it appears.
  - Graded cards fly out by grade (Again left, Good right, Easy up, Hard down)
    and a toast shows the next interval. Fast repeat key presses are ignored.
  - The grade buttons cascade in, the session progress bar shimmers, and the
    "New" chip glows.
  - Saving a card pops its [+] badge, and finishing a session shows a 🎉 burst.
  - All motion is disabled under prefers-reduced-motion.
- **Accuracy**: DKA now follows the 2024 ADA/EASD hyperglycemic crises
  consensus. Insulin is held if K <3.5, and dextrose is added once glucose is
  below 250. This is applied to the option, explanation, cards and table.
- Service worker cache bumped to v32.

---

## 2026-10-02 — ABIM Board Prep v2.8: premium flashcards

A second full editorial and accuracy review of all 510 ABIM flashcards. Card
order did not change, so saved decks and spaced-repetition progress carry over.

- **🧠 Memory hook** (new `m` field on every card): a short anchor, such as a
  mnemonic, a number rule, or a contrast, that makes the fact stick.
- **Editorial polish**: sharper fronts that don't give the answer away. Backs
  lead with the decisive answer and its threshold. "Why it matters" explains
  the mechanism, and each trap names a specific wrong choice.
- **Accuracy updates**:
  - severe AS valve area ≤1.0 cm²
  - DKA resolution judged by ketones (<0.6 mmol/L) plus pH ≥7.3 or HCO₃ ≥18
  - AGA ferritin cutoff <45 ng/mL
  - H. pylori testing in ITP is selective
  - grade 4 irAE: usually stop the ICI permanently
  - steroid exceptions for endocrine irAEs
  - adrenal incidentaloma: homogeneous ≤10 HU is benign regardless of size
    (ESE 2023; explanation updated too)
  - dermatomyositis cancer screening is risk-stratified
  - PCOS: OGTT preferred
- **Premium review card**:
  - layered gradient faces
  - top strip with Concept n/3, the task type and memory status
    (New / Learning · Nd / Mature · Nd / Relearning)
  - answer shown in a highlighted panel, with why / trap / hook sections
  - session progress bar
  - the hook also appears on unlocked and saved cards
  - Classic theme styled as well
- Service worker cache bumped to v31.

---

## 2026-10-02 — ABIM Board Prep v2.7: flashcard quality upgrade

All 510 ABIM flashcards were rewritten for active recall. Card order did not
change, so saved decks and spaced-repetition progress carry over.

- **Sharper prompts**: each front is a specific, board-style question.
- **Tighter answers**: each back holds the one fact you need to recall.
- **💡 Why it matters** (new `x` field): the mechanism or clinical reasoning
  behind the answer.
- **⚠️ Board trap** (new `t` field): the classic distractor or pitfall that this
  fact rules out.
- **Engine**: the details show on the unlocked core concepts, in the saved deck
  list, and on the back of the Review flip card. The flip card now sizes to its
  content, so longer backs are no longer cut off. Both themes are supported.
- Facts were checked against the accuracy fixes from the v2.6 review.
- Service worker cache bumped to v30.

---

## 2026-10-02 — ABIM Board Prep v2.6: 170 questions, accuracy review

Separate internal-medicine module (`abim.html` + `assets/abim-data.js`),
reached from the 🩺 pill on the home screen. It is not part of the PSEB content.

- **Content:** 170 single-best-answer vignette MCQs across 16 blueprint
  systems, each with an explanation and 3 question→answer flashcards
  (510 cards) that feed the spaced-repetition Review deck.
  - v2.5 added 32 items across every system.
  - v2.6 added 32 items for thin areas: OB/GYN, psychiatry, dermatology,
    oncology and neurology, plus valve and aortic disease, altitude medicine,
    glomerular disease, travel/transplant infections, von Willebrand disease,
    hospice and PPV.
- **Accuracy review** of all 170 items against current guidelines. 22 corrections in 14 items:
  - aortic dissection targets: HR 60–80/min, SBP < 120 mm Hg (ACC/AHA 2022)
  - apixaban held 72 h before neuraxial anesthesia (ASRA)
  - PHPT hypercalciuria thresholds: > 250 mg/day women, > 300 mg/day men
    (2022 workshop)
  - adrenal incidentaloma ≤ 10 HU needs no metanephrines (ESE 2023)
  - PrEP kidney monitoring yearly, not every 3 months (CDC)
  - Cushing screening repeats, TLS hypocalcemia, ranitidine replaced with
    famotidine, galantamine indication, LTBI timing before TNF inhibitors,
    pelvic exam statement, AAA growth threshold, and a lung-screening
    eligibility inconsistency
- **Item-writing review:** fixed the "longest option is correct" cue. It had
  appeared clearly in 40 items; now only the original verbatim HFrEF item has
  it. Distractors were made more plausible, and answer letters did not change,
  so saved progress is unaffected.
- Answer key balanced A 44 / B 42 / C 42 / D 42. `sw.js` cache is v28.

---

## 2026-10-02 — Memory Card: 4 learner profiles per device

PlayStation-style 4-slot profile system so siblings or study groups can share
one phone without mixing progress. No login, no server, works offline.

- `assets/memory-card.js` + `assets/memory-card.css`, loaded first on every page.
  All learner keys (`pseb.*`, `bolo.*`, `bolo_*`) are routed per slot: Slot 1
  keeps the original keys (existing users migrate automatically into
  "ਮੁੱਖ ਪ੍ਰੋਫਾਈਲ / Main Profile"); Slots 2–4 use `bolo_slot_N::<key>`.
  Registry lives in `bolo_memory_card_v1`.
- Memory Card modal (2×2 grid, 1 column on phones): create, load, rename
  (✏️, any slot including Slot 1), erase, per-slot backup, whole-card backup,
  and import of `.json`/`.bolo` saves. Slots 2–4 suggest the names Gian,
  Gurdeep and Gagan. Switching profiles fires `bolo:slotChanged` and reloads.
- Imports are atomic: if the device runs out of storage mid-import, the
  previous slots are restored. After a storage eviction the slot registry is
  recovered from the IndexedDB backup before anything overwrites it.
- Triggers: 💾 pill in the menu utility hub, in the MCQ / Flashcards / ABIM
  headers, and in the deck toolbar ("Memory Card" in the More drawer).
- `assets/pwa.js` IndexedDB mirror is now slot-aware; `sw.js` precaches the new
  files (cache v24).

---

## 2026-10-02 — Content audit, bilingual parity and lecture objectives

### Content correctness

A full correctness pass was run over all 16 chapters (538 slides, ~1.9 MB of
authored HTML). Because that is far too much to proof-read reliably by eye, the
pass was built on mechanical checks wherever a claim could be decided by
machine, backed by four independent reading passes for conceptual errors.

**Fixed**

| Chapter | Slide | Problem | Fix |
|---|---|---|---|
| 1 — Chemical Reactions | 17 "What You Actually See" | `2FeSO₄·7H₂O(s) --Heat→ Fe₂O₃(s) + SO₂↑ + SO₃↑` is unbalanced — the 14 water molecules of the heptahydrate vanish (O 22 vs 8, H 28 vs 0) | Added `+ 14H₂O(g) ↑` so the equation balances |
| 1 — Chemical Reactions | 8 "Word Equation vs. Skeletal Equation" | The deliberately unbalanced `Mg(s) + O₂(g) → MgO(s)` was indistinguishable from a mistake | Marked `data-skeletal` so it is exempt from the audit but still shown as the teaching step |
| 12 — Magnetic Effects | Fleming's rule short answer | **A dead button.** The handler was `checkSA(this, 'Fleming\\'s Left-Hand Rule', …)` — the escaped apostrophe ends the JavaScript string early, so the whole `onclick` was a syntax error. The button rendered and enabled normally and did nothing when tapped | Escaped as `\u0027`; verified in-browser that the answer now checks and shows the bilingual explanation |

**Verified clean** (no changes needed)

- **48 chemical equations** balanced atom-by-atom — 42 in dedicated equation
  blocks plus 6 embedded in prose, tables and quiz explanations. All balance.
  (41 further equation blocks were correctly skipped as word equations, generic
  `A + B → AB` schematics or process chains.)
- **9 equation-balancer answers** re-derived from their own atom maps; all
  balance and all are in lowest terms.
- **36 reaction-classifier items** checked against reactant/product counts;
  every label matches the equation shape, and every one balances.
- **618 quiz groups and 401 short answers** confirmed to have exactly one keyed
  answer / a non-empty expected answer.
- **3,596 inline `on*` handlers** parsed as JavaScript — this is what caught the
  dead button above.
- **Explanation/answer agreement** across every multiple-choice item; 5
  candidates surfaced and all 5 were manually confirmed correct (the heuristic
  was matching a distractor's wording that appears incidentally in the
  explanation).
- **7 physics numericals** re-derived — mirror formula, lens formula (including
  the sign difference), magnification, lens power and the kWh conversion.
- **Markup health**: no duplicate `id`s, no sub-slide jumps to missing targets.

**Two blind spots found in the audit tool itself** (both now closed):

- `checkQuiz` only looked inside `.sub-slide` carousels, so the standalone
  Case Study question slides were silently skipped. Quiz groups are now located
  with a real nested-tag matcher that bounds each block exactly, which raised
  coverage from 608 to 618 groups.
- Nothing validated inline event handlers, which is where the dead button hid.

**Triaged and rejected** — one reading pass flagged Chapter 5's Moseley case
study, claiming "The Position of Isotopes" was the wrong key. It is the right
key: ordering by atomic number is exactly what gives isotopes a single shared
position, and NCERT lists "no fixed position for isotopes" as a Mendeleev
demerit resolved by the modern periodic law. The deck is correct; no change
made. A second suggested replacement from the same pass was incoherent.

**Review depth, honestly stated.** The four independent reading passes varied a
lot, so their counts were checked against `grep`:

| Chapters | Reading-pass coverage |
|---|---|
| 1–5 | Weak (claimed 7 items per chapter against ~43 actual) — so **I reviewed all ~380 keyed answers and short answers in these five chapters myself**; all correct |
| 6, 6, 7, 8 | Thorough — reported counts match the real option/short-answer/explanation totals almost exactly |
| 9, 10, 11 | Thorough — same, with two chapter totals transposed |
| 12, 13, 14, 16 | Partial — multiple-choice keys covered, short answers not, so I reviewed the Chapter 12 and 13 short answers directly (which is how the dead button surfaced) |

### Bilingual parity — 271 Gurmukhi headings added

Heading-level Punjabi coverage was wildly uneven: 83% in Chapter 6 (Control and
Coordination) against **12% in Chapter 16 and 14% in Chapter 14**. A
Punjabi-medium student could navigate some chapters by skimming and not others.

Every English-only slide heading in all 16 chapters now carries a gloss in the
deck's existing convention, placed before any board badge:

```html
<h2>Electric Power <span class="punjabi">(ਬਿਜਲਈ ਸ਼ਕਤੀ)</span></h2>
```

Coverage is now **97% in every chapter** — the single remaining heading per
chapter is the chapter-divider slide, which already shows its Gurmukhi title as
a sibling of the heading and does not want a second copy.

| Chapter | Before | After |
|---|---|---|
| 1 Chemical Reactions | 72% | 97% |
| 2 Acids, Bases and Salts | 71% | 97% |
| 3 Metals and Non-metals | 64% | 97% |
| 4 Carbon Compounds | 58% | 97% |
| 5 Periodic Table | 63% | 97% |
| 6 Control and Coordination | 83% | 97% |
| 6 Life Processes | 16% | 97% |
| 7 How do Organisms Reproduce | 59% | 97% |
| 8 Heredity | 41% | 97% |
| 9 Light — Reflection and Refraction | 37% | 97% |
| 10 The Human Eye | 47% | 97% |
| 11 Electricity | 39% | 97% |
| 12 Magnetic Effects | 36% | 97% |
| 13 Our Environment | 48% | 97% |
| 14 Sources of Energy | 14% | 97% |
| 16 Sustainable Management | 12% | 97% |

### Learning objectives for every sub-topic

The milestone banner previously carried objectives in Chapter 1 only. All
**95 numbered sections across all 16 chapters** now open with three concrete,
exam-oriented objectives in **both languages** — 285 objectives per language.

They are phrased as things a student can actually do ("Apply the New Cartesian
sign convention without slips", "Keep the left-hand and right-hand rules
straight"), not as topic restatements.

### Engine

- **Sub-topic navigation**: `[` and `]` jump to the previous/next section.
  Inside a section the first `[` rewinds to that section's own opening slide,
  matching how chapter-skip works on a media player.
- **Section deep links**: `#section=heating` opens the deck at that sub-topic,
  so a teacher can assign one sub-topic rather than "open chapter 11 and scroll
  to about slide twenty". Works on load and on in-page hash change.
- **Bilingual heading layout fixed**: the deck CSS laid `<h2>` out as
  `display:flex; justify-content:space-between`. With a gloss added, the English
  title became an *anonymous* flex item — which cannot be given
  `flex-shrink: 0` — so it squeezed to its longest word and broke mid-phrase
  ("Practice:" / "Ohm's" / "Law"). Headings now use normal block flow with the
  trailing badge floated right, which preserves the original look.

### Widgets reused across chapters

- **Chapter 9** — the convex-mirror slide now carries the interactive ray
  tracer in convex mode, so "always virtual, erect and diminished" is something
  the student can verify by dragging rather than a claim to memorise.
- **Chapter 2** — displacement animation on the acid-with-metals slide;
  double-displacement animation on the salt family tree.
- **Chapter 3** — displacement animation above the displacement predictor.

### New maintenance tooling

| Script | Purpose |
|---|---|
| `Scripts/audit_decks.js` | All the mechanical correctness checks above — equation balance, balancer and classifier data, quiz keying, inline-handler syntax, numericals, markup and section metadata. `node Scripts/audit_decks.js [chapter...] [--only kind] [--stats]`. Exits non-zero on any finding, so it can gate a deploy. |
| `Scripts/apply_punjabi_headings.py` | Applies the Gurmukhi heading glosses from a reviewable translation table. Idempotent; `--check` reports without writing. |
| `Scripts/apply_sections.py` | Extended with the learning objectives for all 16 chapters. |

Authoring note: a deliberately unbalanced skeletal equation must be marked
`data-skeletal` so the audit does not report it forever.

---

## 2026-10-01 — Lecture engine upgrade

### Intra-lecture organisation

- Slides carry `data-section-id` / `-en` / `-pa` / `-mins` / `-goals`; following
  slides inherit, so a section can never have a hole in the middle.
  110 sections stamped across all 16 decks.
- **Breadcrumb** in the header: `Chapter 1 › 2. Balancing Equations 2/3`,
  updating on slide change and following the reading-language toggle.
- **Milestone banner** on the first slide of each sub-topic — high-contrast
  badge, estimated duration, slide count and learning objectives — generated
  from the section metadata rather than adding 110 near-empty cover slides.
- **Outline modal** groups slides under section headings with durations.
- **Chapter 1 reordered** so each formative drill follows the sub-topic it
  tests: the equation balancer now sits inside *Balancing Equations*, the
  reaction classifier inside *Types of Reactions*, and the redox drill inside
  *Oxidation & Reduction* — previously 8–11 slides downstream. The slider is
  stamped `data-slide-order` so the reorder is idempotent.

### Chemical and mathematical typesetting

- **KaTeX 0.16.11 + mhchem vendored locally** (628 KB, woff2 only) rather than
  loaded from a CDN: these decks are used offline over rural mobile data and the
  service worker precaches the local copy.
- `assets/deck-chem.js` transpiles the deck's existing Unicode chemistry to
  mhchem at runtime, so thousands of equations were upgraded without rewriting
  them: **68 converted, 0 render failures, 18 correctly skipped**.
  - `--Heat→` becomes a Δ-labelled arrow; `--373K→` becomes `->[\pu{373 K}]`.
  - Handles hydrates, state symbols, ↑/↓, ionic charges, `e⁻` half-equations,
    `(excess)` annotations and `Roasting:` labels.
  - Also typesets algebraic formulas: `R = ρL / A` → a stacked fraction.
  - **Refuses** word equations, generic schematics and process chains such as
    `Nostrils → Trachea → Alveoli`, which stay exactly as authored.
- Original markup stays until a render succeeds and the height is frozen before
  the swap, so a blocked KaTeX is a no-op and there is no layout shift.
- A MutationObserver re-typesets widgets that rewrite their own equations — the
  reaction classifier previously reverted to raw Unicode after question 1.

### Interactive widgets

- `assets/deck-optics.js` — draggable concave/convex mirror ray tracer with live
  construction rays, dashed virtual extensions and a real/virtual ·
  inverted/erect · magnified/diminished read-out. Uses the *through-F* ray
  rather than the ray aimed at C, because the C-ray reflects back along its own
  path and never visibly bounces.
- `assets/deck-reactions.js` — looping particle animations for combination,
  decomposition, displacement and double displacement, an electron-transfer
  redox scene, and a test tube where blue CuSO₄ fades to pale green FeSO₄ with
  reddish-brown copper on the iron nail. Fully static under
  `prefers-reduced-motion`.

### Responsive UI

- Below 1300px the toolbar keeps only Index · Language · Recall · Outline · ⋯
  and moves the rest into a **More Actions** drawer. Previously 13 icons wrapped
  onto three rows over the slide.
- Shared swipe navigation that **defers to each deck's own handler** — it
  compares the slide index after the gesture and only acts if nothing moved, so
  no deck double-advances. Double-tap toggles active recall.
- The help modal shows touch gestures only on touch devices, above the keyboard
  list.
