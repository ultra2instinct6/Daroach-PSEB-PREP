# Chapter 6 — Life Processes (Build Plan)

**Catalog:** `n: 6`, subject `biology`, currently `placeholder: true`, `slides: 0`.
**Target:** 32 slides. **Physical folder to create:** `Chapter 06 - Life Processes/` (note: folders 06–13 are currently offset; this is a NEW folder — pick a name that does not collide, e.g. keep official numbering `Chapter 06 - Life Processes`).
**Architecture to copy:** biology decks use the `moveSlide()` engine + `assets/deck-ch06-07.css`. Clone `Chapter 06 - Control and Coordination` as the structural template (nav bar, `#counter`, `#slider`, `transitionend` reset loop, TTS, quiz sub-slider engine, Anki export).
**Bilingual:** every heading + key term gets a Gurmukhi `.punjabi` / `.punjabi-block` gloss.

## Reusable interactives to include (already engineered in shared assets)
- **pd-game** (pick-and-drop, `assets/deck-enhance.js`): add `.pd-game` to this deck's `touchend` swipe-ignore list. No per-chapter JS.
- **flip-card**, **cloze-blank**, **match-grid**, **sequencer**, **spot-error**: shared handlers via `enhanceInteractives()`.

## Slide-by-slide blueprint (32)
1. **Cover** — "Chapter 6 · Life Processes" + Punjabi ਜੀਵਨ ਕਿਰਿਆਵਾਂ.
2. **Core Vocabulary** — nutrition, respiration, transportation, excretion (flip-cards).
3. **More Key Terms** — autotroph, heterotroph, stomata, enzymes, alveoli, nephron.
4. **What are Life Processes?** — 4 essential processes that maintain life; why even resting organisms need energy.
5. **Nutrition: Autotrophic vs Heterotrophic** — comparison table.
6. **Photosynthesis** — equation, raw materials, site (chloroplast), conditions (light, chlorophyll).
7. **How Stomata Work** — gaseous exchange + transpiration; guard cells open/close (diagram).
8. **Heterotrophic Nutrition Types** — saprophytic, parasitic, holozoic (examples).
9. **Nutrition in Amoeba & Paramecium** — steps: ingestion→digestion→egestion (sequencer).
10. **Human Digestive System** — labelled alimentary canal (diagram/SVG). *(candidate pd-game: label the organs)*
11. **Digestion Step-by-Step** — mouth → stomach → small intestine; enzymes table (amylase, pepsin, trypsin, lipase, bile).
12. **INTERACTIVE — pd-game:** "Match enzyme → substrate" OR "Label the digestive organs".
13. **Respiration: Aerobic vs Anaerobic** — glucose breakdown pathways + energy yield (with equations).
14. **Human Respiratory System** — nostrils→trachea→bronchi→alveoli (diagram).
15. **Exchange of Gases at Alveoli** — why alveoli are efficient (surface area, capillaries).
16. **Breathing vs Respiration** — clarify the common exam confusion.
17. **Transportation in Humans: Blood** — plasma, RBC, WBC, platelets (roles).
18. **The Human Heart** — 4 chambers, valves, double circulation (diagram). *(sequencer: trace a drop of blood)*
19. **Double Circulation** — pulmonary + systemic loops; why mammals need it.
20. **Blood Vessels** — arteries vs veins vs capillaries (table).
21. **Lymph** — role in transport & immunity.
22. **Transport in Plants: Xylem & Phloem** — water up / food down (table).
23. **Transpiration Pull** — how water rises in tall trees.
24. **Translocation** — movement of food (needs energy/ATP).
25. **Excretion in Humans** — kidneys, ureter, bladder, urethra (diagram).
26. **The Nephron** — filtration unit; how urine forms (sequencer).
27. **Dialysis** — artificial kidney; when it is needed.
28. **Excretion in Plants** — O₂, CO₂, water vapour, resins, gums; leaf fall.
29. **INTERACTIVE — pd-game:** "Sort: which organ system?" (digestion / respiration / circulation / excretion).
30. **Chapter Recap** — `ratta-box` of one-line must-knows.
31. **Quick Check (MCQ sub-slider, 8 Q)** + **True/False (8 Q)** — reuse quiz engine.
32. **Say It Back (short-answer, 8 Q)** + **Anki export** end slide.

## Board focus (mark high-value)
Photosynthesis equation; human digestive/respiratory/excretory diagrams; nephron; double circulation; xylem vs phloem — all frequent 3- & 5-mark questions.

## Post-build checklist
- Update `assets/chapters.js`: set `n:6` `file:"Chapter 06 - Life Processes/…html"`, `slides:32`, remove `placeholder:true`.
- Update `index.html` "Total Slides" (+32 → 443).
- `<title>` and cover `<h1>` must say "Chapter 6" so `deck-enhance.js` keys progress correctly.
- Validate div balance and open in browser (test pd-games, quizzes, outline/bookmark toolbar).
