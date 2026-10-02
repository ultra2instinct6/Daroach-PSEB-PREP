# Changelog

Content and engine changes to the BOLO.INSTINCT PSEB Class 10 Science decks.
Newest first.

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
