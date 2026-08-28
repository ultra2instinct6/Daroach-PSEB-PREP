# PSEB Class 10 Science — Review, Learning Pass & Follow-up Pathway

_A quality + consistency review across all 16 chapter decks._

## 1. Headline finding
The platform is **content-complete and high quality**. All 16 chapters exist and
are structurally whole (cover → readings → vocabulary → concept slides →
interactive quizzes/sub-sliders → recap). An objective spell + doubled-word
sweep across every deck found **zero** real grammar/spelling errors, and a
scientific-accuracy audit found **no** genuine factual errors — the flagged
"errors" were all false positives (see §4).

Bottom line: content is relevant, exam-focused, and well-stressed. The main
gains left are **consistency polish** and optional **depth**, not fixes.

## 2. What was changed in this pass
| # | Change | Chapters | Status |
|---|--------|----------|--------|
| 1 | Added Gurmukhi phonetic guides (`ਉਚਾਰਨ:`) to **all 52 chemistry vocab terms** so chemistry matches the bio/physics/env decks | 1–5 | ✅ Done |
| 2 | Added a `.phonetic` style rule to `assets/deck-ch01-05.css` (chemistry stylesheet lacked it) | assets | ✅ Done |
| 3 | Clarified a vague definition: "Arrangement of elements" → "Arrangement of elements by increasing atomic number" | 5 | ✅ Done |

### Pass of 2026-08-27 (Anki wipe · language system · lecture upgrades)
| # | Change | Chapters | Status |
|---|--------|----------|--------|
| 4 | Fresh 4-agent scientific-accuracy audit (chem/bio/physics/env) — **zero genuine errors**; one flag (Ch14 biomass) verified as a false positive against NCERT (see §4) | 1–16 | ✅ Done |
| 5 | **Removed every in-lecture Anki download**: "What is Anki?" / "Download Your Bilingual Flashcards" slides, all `Export to Anki` buttons, and all `exportToAnki()` functions (incl. dead ones in Ch1–4). `Scripts/remove_anki.py` documents the removal | 1–16 | ✅ Done |
| 6 | **Site-wide persistent reading language**: the per-reading ਪੰਜਾਬੀ/English toggle now drives one shared preference (`pseb.lang.v1`) — new toolbar ਪੰ/EN button + `L` shortcut flip **all** readings at once and are remembered across chapters and visits | assets | ✅ Done |
| 7 | **⚡ Quick Revision** in-deck flashcards (`R`): built live from each deck's Say-It-Back cards, Again/Got-it recall queue, bilingual answers + "why" — replaces the Anki value with zero downloads | assets | ✅ Done |
| 8 | **Quiz score tracking**: every MCQ/TF/short-answer result tallied per chapter (`pseb.scores.v1`); finishing a quiz shows a score toast; missed questions are queued first in Quick Revision as "Tricky · ਔਖਾ" and cleared once re-answered correctly | assets | ✅ Done |
| 9 | **Full-text bilingual slide search**: the outline (`O`) now searches all slide text in English *and* Gurmukhi, not just titles | assets | ✅ Done |
| 10 | **Gurmukhi-aware TTS**: `speakWord()` is wrapped so any Gurmukhi text is spoken with a Punjabi (pa-IN) voice | assets | ✅ Done |

> ⚠️ **Please verify** the 52 Gurmukhi transliterations in the chemistry vocab
> tables. They are standard English-pronunciation spellings (e.g. Metal →
> ਉਚਾਰਨ: ਮੈਟਲ), but a native check is worthwhile before final publish.

## 3. Consistency scan (per-chapter feature parity)
| Feature | Chem 1–5 | Bio 6–8 | Physics 9–13 | Env 14/16 |
|---|---|---|---|---|
| Vocabulary slides | ✅ (tables) | ✅ (grid) | ✅ | ✅ |
| Phonetic guides | ✅ *(added this pass)* | ✅ | ✅ | ✅ |
| Interactive engine | classifier + sub-sliders | pd-game/flip/seq | pd-game/flip/seq | pd-game |
| MCQ / True-False / Short-answer banks | ✅ | ✅ | ✅ | ✅ |
| Recap + ⚡ Quick Revision | ✅ | ✅ | ✅ | ✅ |

Chemistry uses a different (but equally rich) interactive vocabulary
(`classifier-panel`, `lab-box`, `pitfall-box`, case studies) than the
drag-drop `pd-game` decks. That is a legitimate stylistic choice, not a gap.

## 4. False positives — DO NOT "fix" these
These were flagged by automated review but are **correct as written**:
- **Chapter numbers are offset from folder numbers on purpose.** Folder
  `Chapter 08 - Heredity` displays as "Chapter 9", folder 11 Electricity =
  "Chapter 12", etc. This matches `assets/chapters.js` and `deck-enhance.js`
  keys progress off these numbers. **Never renumber the decks or titles.**
- **Ch12 True/False Q4** ("Overloading occurs when live and neutral wires
  touch directly") is a deliberately-false statement; the answer key is
  correctly "False", and short-circuit is attributed correctly elsewhere.
- **Ch04**: oxidising alcohols to carboxylic acids with alkaline KMnO₄ is
  correct NCERT chemistry.
- **Ch09**: lens magnification `m = v/u` is correct (only mirrors use `-v/u`).
- **Ch04**: saturated hydrocarbons burning with a clean **blue** flame is correct.
- **Ch14**: biomass (and wind) listed under **conventional** sources is correct
  per NCERT 14.1.4 ("improvements in technology for using conventional sources
  of energy — bio-mass and wind"). Do not move biomass to non-conventional.

## 5. Open, optional improvements (low priority)
1. **Ch14 & Ch16 have only 6 vocab terms** each vs 10–15 elsewhere. Could add
   3–4 key terms (Ch14: turbine, photovoltaic, nuclear fission; Ch16:
   stakeholder, aquifer, sustainability) for parity.
2. A few definitions are terse but pedagogically fine for Class 10
   (e.g. Renewable = "A source that refills"). Optional expansion only.

## 6. Follow-up pathway (how to keep improving)
**Tier A — verification (do first)**
- [ ] Native-Punjabi check of the 52 new chemistry phonetic guides.
- [ ] Open decks 1–5 in the browser and confirm phonetic lines render on every
      vocab slide (verified on Ch3 in this pass).

**Tier B — parity & depth**
- [ ] Bring Ch14/Ch16 vocab up to ~10 terms (see §5).
- [ ] Add 1 `board-trap`/`pitfall-box` "common exam mistake" callout to any
      slide that lacks one, so every chapter flags at least 3 exam traps.
- [ ] Confirm each chapter has a diagram/visual for its highest-value board
      question (photosynthesis, nephron, heart, ray diagrams, domestic circuit).

**Tier C — assessment quality**
- [ ] Cross-check every quiz `data-correct`/`checkAnswer` boolean against the
      answer (spot audit; sub-slider banks are large).
- [ ] Add a short "5-mark model answer" frame slide to chapters that only have
      MCQ/short-answer practice.

**Tier D — process**
- [ ] Re-run the objective spell/doubled-word sweep after any content edit.
- [ ] Keep the chapter-number offset note (§4) visible to avoid regressions.

## 7. How the review was run
- 6 parallel read-only audit agents (2–3 chapters each) returned exact-quote
  issue lists; every claim was then verified by hand against the source.
- Objective checks: tag-stripped spell scan (`pyspellchecker`), doubled-word
  regex, div/span balance counts, and browser render verification.
- Full machine-readable issue log lives in the session SQL `issues` table.
