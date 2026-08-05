# Quiz Explanations & Consistent Widget UI — PLAN and LOG

## Goal
Every MCQ, True/False and Short-Answer question across all chapters shows a
consistent bilingual (English + Punjabi) feedback card that:
- states Correct / Incorrect,
- reveals the correct answer, and
- gives a short **"why it's right"** explanation.

## Mechanism (DONE, shared, one source of truth)
- `assets/deck-enhance.js` — overrides `window.checkAnswer` and `window.checkSA`
  (installed on DOMContentLoaded, after each chapter's inline copy loads) with a
  single consistent implementation used by **all 16 chapters**. It reads
  `data-explain` (EN) and `data-explain-pa` (PA) from the active `.sub-slide`
  and renders the unified `.quiz-feedback` card. Backward-compatible: no data =
  no explanation block.
- `assets/deck-theme.css` — `.quiz-feedback` panel styling (theme-aware, dark +
  light). Also already normalises widget sizing across the 3 deck CSS groups.
- Verified in browser (Chapter 1) in both Instinct-dark and Classic-light.

## Content pipeline (per chapter)
1. `python3 Scripts/quiz_explain.py extract "<chapter>.html"` → JSON of every
   sub-slide (id, type, question EN, correct answer).
2. Author `Scripts/explain-maps/chNN.json` = { "<sub-slide-id>": {"en":..,"pa":..} }.
   Skip guided builders like `formula-ch1-*` (they already scaffold steps).
3. `python3 Scripts/quiz_explain.py apply "<chapter>.html" Scripts/explain-maps/chNN.json`
   (idempotent — re-running replaces existing explain attrs).

## Rollout progress — COMPLETE (431 explanations across 16 chapters)
- [x] Chapter 01 - Chemical Reactions — 38
- [x] Chapter 02 - Acids, Bases and Salts — 37
- [x] Chapter 03 - Metals and Non-metals — 38
- [x] Chapter 04 - Carbon Compounds — 37
- [x] Chapter 05 - Periodic Table — 34
- [x] Chapter 06 - Control and Coordination — 24
- [x] Chapter 06 - Life Processes — 21 (has TF+SA+MCQ; earlier grep missed its no-space checkAnswer format)
- [x] Chapter 07 - How do Organisms Reproduce — 24
- [x] Chapter 08 - Heredity — 24
- [x] Chapter 09 - Light Reflection and Refraction — 28 (incl. 4 numericals)
- [x] Chapter 10 - The Human Eye and Colourful World — 24
- [x] Chapter 11 - Electricity — 28 (incl. 4 numericals)
- [x] Chapter 12 - Magnetic Effects of Electric Current — 28 (incl. 4 numericals)
- [x] Chapter 13 - Our Environment — 24
- [x] Chapter 14 - Sources of Energy — 11
- [x] Chapter 16 - Sustainable Management of Natural Resources — 11

## Verification (browser, http://localhost:8777)
- MCQ path: Chapter 1 (wrong click → red status, green correct option, correct-answer reveal, bilingual Why).
- TF path: Chapter 13 slide 29 (wrong click → "✗ Incorrect (ਗਲਤ)", "Correct answer: True (ਸਹੀ)", bilingual Why). Screenshot confirmed.
- SA path: Chapter 13 slide 30 ("O2" → "✗ Not quite (ਲਗਭਗ)", "Expected answer: O3", bilingual Why). Screenshot confirmed.
- All three widget types render the identical `.quiz-feedback` card → consistent UI.

## Notes
- EN/PA attribute parity verified: every chapter's `data-explain` count == `data-explain-pa` count.
- Anki `data-q`/`data-a` untouched by the pipeline.
- Interactive builders (formula-*, iso-*, ph-*, oxides-*, trends-*) intentionally skipped — not standard quiz questions.
- Browser cache: verify with a `?v=` cache-buster query on the chapter URL.
- Explanation maps live in `Scripts/explain-maps/` (ch01..ch16, plus ch06-control.json / ch06-life.json).
