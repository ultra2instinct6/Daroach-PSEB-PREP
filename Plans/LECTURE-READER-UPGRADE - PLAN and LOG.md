# Lecture Reader Upgrade — Gurmukhi, Balancer, Flashcards, Recall — PLAN and LOG

Bug-fix and interaction upgrade of the slide-based lecture reader (the 16
chapter decks plus the shared `assets/` presentation layer), covering broken
Gurmukhi rendering, the chemical equation balancer, Quick Revision flashcards,
glossary popovers, active recall, and preference persistence.

**Status: COMPLETE.** All five phases shipped and verified in the browser
across both colorways, desktop and 390px mobile, and with storage blocked.

## Constraints honoured
- **Zero backend, zero build step, zero frameworks.** Everything added is
  vanilla HTML/CSS/JS in the existing classic-script style (no modules, so the
  decks keep working over `file://`).
- **Scope.** Changes are confined to the lecture reader, its widgets and the
  shared presentation assets. Routing, the chapter index and the MCQ engine are
  untouched apart from one additive `<link rel="preload">` per page.
- **Preserved.** Neon/Classic colorways, the `EN ⇄ ਪੰਜਾਬੀ` toggle, all keyboard
  shortcuts, slide deep-linking, the offline PWA, and every existing
  `localStorage` key and its shape.
- **Touch-first.** Every new control clears a ~44px tap target at 360–390px,
  and all new motion is disabled under `prefers-reduced-motion`.

---

## Phase 1 — Critical bug and data fixes

### 1.1 Broken Gurmukhi rendering (tofu boxes `☒☒☒☒`)
**Root cause.** Every Gurmukhi stack in the app already asked for
`'Noto Sans Gurmukhi'` first, but *no webfont was ever loaded*. On Windows and
most Android builds no Gurmukhi face is installed at all, so the whole stack
fell through to a default that has no Gurmukhi coverage. This single missing
`@font-face` is what produced tofu — and it is also why the vocabulary tables
*looked* empty and why the pronunciation chips *looked* like floating colons:
the Punjabi data was present all along, it simply had no glyphs to render with.

**Fix.** Self-hosted the Gurmukhi subset of the upstream variable font
(33 KB, `wght 100–900`) and declared it in `assets/gurmukhi-type.css` with a
`unicode-range` limited to the Gurmukhi block, so Latin text keeps the page's
own typeface.

The font is **self-hosted rather than loaded from `fonts.gstatic.com`** on
purpose: `sw.js` only caches same-origin responses, so a CDN link would have
left offline students — the core audience for this PWA — back on tofu. It is
registered in the service worker shell and preloaded on all 18 pages.

### 1.2 Punjabi vocabulary data
Audited every `<td>`, `.punjabi`, `.punjabi-block` and `.phonetic` node across
all 16 decks plus `index.html` and `mcq.html`: **0 empty cells and 0 orphan
chips**. The Slide 5 terminology was already correct and matches the requested
PSEB terms (ਅਭਿਕਾਰਕ, ਉਤਪਾਦ, ਸਮੀਕਰਣ, ਤਾਪ ਨਿਕਾਸੀ, ਤਾਪ ਸੋਖੀ, ਅਵਖੇਪ). No data
needed to be added — Phase 1.1 made the existing data visible.

### 1.3 Layout artifacts
- Added a defensive `:empty { display: none }` guard for `.phonetic`,
  `.punjabi`, `.punjabi-block`, `.vocab-pa` and `.bi-tag`, so a gloss that ever
  renders empty can no longer paint a chip containing only its separator.
- Slide 6 etymology: wrapped each Gurmukhi gloss in a tagged
  `<span lang="pa">` and replaced the cramped `(Exit/ਬਾਹਰ)` with
  `(Exit&nbsp;/&nbsp;ਬਾਹਰ)`, so the parenthetical can no longer break across
  lines mid-pair and the Gurmukhi run gets the correct font and line-height.

---

## Phase 2 — Chemical equation balancer

### 2.1 Touch-friendly steppers
Each coefficient now carries stacked `+` / `−` buttons (58×30px desktop,
52×34px mobile) above and below the field. The native number field is kept for
keyboard and screen-reader users but its spinners are suppressed, since they
duplicated the new controls and shrank the tap target. Handlers are delegated,
so they survive every re-render, and the buttons disable at the 1–9 bounds.

### 2.2 Visual particle and atom-count indicators
The LHS/RHS ledger now colour-codes each element row green when
`LHS === RHS` and red when it does not, with a `✅`/`⚠️` flag per row, and
renders a CPK-coloured dot per element (Fe brown, O red, H white, C dark,
N blue, Cl green…) — the same colour on both sides, so conservation of mass
reads visually rather than only numerically.

### 2.3 Step-by-step guided walkthrough
"Show Answer" gave away the result and skipped the reasoning the exam actually
tests, so it was replaced by a **Walkthrough accordion** that reveals one hint
at a time. Each of the nine equations has an authored 3-step sequence in the
PSEB teaching order (single-species element first, hydrogen and oxygen last) —
e.g. for Fe + H₂O: balance Fe → balance O via H₂O → balance H via H₂. Steps
also self-mark green as the student's own coefficients become correct, so the
walkthrough tracks their work and not just their clicks. The final answer is
still reachable, but only as a deliberate last step.

### 2.4 Success animation
Reaching balance triggers a green pulse on the panel, a lift on the equation
and a bouncing checkmark. It fires only on the *transition* into balance, so it
does not replay on every subsequent keystroke.

---

## Phase 3 — Quick Revision flashcards

### 3.1 3D card flip
The abrupt show/hide was replaced by a real `rotateY(180deg)` flip over
`transform-style: preserve-3d` with hidden backfaces. The perspective scene
deliberately sets no `overflow`, which would flatten the 3D context in WebKit.
The rotating box reserves the taller of the two faces (capped at 56vh) so a
long answer is never clipped mid-flip, and there is an
`@supports not (transform-style: preserve-3d)` fallback to a plain swap.

### 3.2 Mini-Leitner self-assessment
The back of each card now offers **🔁 Review again** and **✅ Mastered**.
"Review again" splices the card back in 5 positions later — inside the same
session but not immediately, which is the point of spaced recall — and tags it
"Second look". "Mastered" retires it and advances the tally. A progress bar
reports `Mastered: X / Y` live, and the closing summary shows the final count.

---

## Phase 4 — Glossary, TTS and active recall

### 4.1 Dual phonetic transliteration
Glossary popovers now show both `Roman: ree-AK-shun` and
`ਉਚਾਰਨ: ਰੀ-ਐਕ-ਸ਼ਨ`.

Rather than hand-authoring a second transliteration for all 233 entries —
which would silently drift out of sync the moment a `ph` string was edited —
the Gurmukhi respelling is **derived** from the Roman one by a small
syllable-aware transliterator in `assets/glossary.js`. It splits each syllable
into onset/nucleus/coda, picks a matra vs. an independent vowel depending on
whether the syllable opens with a consonant, and handles English-specific
behaviour: silent final `e` (`OK-side` → ਔਕਸਾਈਡ), unstressed `-er` reducing to
schwa (`WAW-ter` → ਵਾਟਰ, not ਵਾਟੌਰ), `ng` taking a tippi or bindi according to
the preceding vowel (ਟਿੰਗ vs. ਗੈਂਗ), and conjuncts only where Punjabi actually
writes them (ਟ੍ਰ, but ਸਕੇਲ not ਸ੍ਕੇਲ). Verified over all 233 entries.

### 4.2 Safe Web Speech API
- Voices are matched on **language prefix**; the previous substring match could
  return an unrelated locale.
- If the device has **no Punjabi voice**, Gurmukhi is no longer handed to an
  English engine (which is silent or spells it out letter by letter, teaching
  the wrong pronunciation). The user gets an explanatory toast instead.
- The blocking `alert()` was replaced with a non-blocking toast.
- Every utterance carries a watchdog timeout, because some engines never fire
  `onend` — which is what previously left a button stuck on "Speaking…" or
  stranded the bilingual reader mid-paragraph.

### 4.3 Interactive cloze deletion (`H`)
Blurring the entire slide hid the context too, leaving the student nothing to
reason from. Active recall now masks only the key terms as individually
tappable `[ ??? ]` blanks while the surrounding sentence stays perfectly
readable. Tapping (or Enter/Space on) one blank fades in just that term;
pressing `H` again resets every blank.

Choosing *what* to mask took two rounds of tuning against the real decks:

- Short answer-like runs only (≤5 words, ≤48 chars); masking a whole sentence
  would remove the very context the student needs.
- **Run-in labels are skipped.** These decks also bold labels — "Example:",
  "Raw materials:", "Thermal (Heat):" — and hiding one of those removes the
  *question* rather than the answer. Anything ending in a colon, and anything
  inside a heading, stays visible.
- **Widget scaffolding is skipped.** Recall was blanking out the balancer
  walkthrough's own hints ("balance **iron (Fe)** first"), destroying the hint
  the student had just opened.

Original markup is preserved so reveal is lossless; leaving and returning to a
slide re-masks it so it re-tests rather than re-shows; and printing a handout
restores the real content for the printed render and re-masks afterwards, so a
handout never prints as a page of blanks.

---

## Phase 5 — Persistence

`bolo_bookmarks` / `bolo_theme` / `bolo_language` already existed under the
app's established key names — `pseb.bookmarks.v1`, `pseb.decktheme.v1`,
`pseb.lang.v1` — and are mirrored to IndexedDB by `assets/pwa.js`. These were
**kept as-is**: renaming them would have silently orphaned the saved progress
of every existing student. All three were verified to survive a full reload.

Two genuine robustness bugs were found and fixed while verifying:

1. **`getScale()` read `localStorage` unguarded at module scope.** Reading
   `localStorage` *throws* (not returns null) when storage is blocked — Safari
   Private Browsing, "block all cookies", some Android WebViews — so the entire
   `deck-enhance.js` IIFE died on line 1 and the student lost the whole
   enhancement layer: toolbar, outline, bookmarks, revision, recall.
2. **`installMirror()` in `pwa.js` had the same flaw**, throwing before the
   IndexedDB mirror could install.

All persistence now goes through `lsGet` / `lsSet` / `lsGetJSON` / `lsSetJSON`
wrappers that fail soft, so preferences degrade to session-only instead of
taking the deck down. Verified: with `localStorage` throwing on every access,
the deck loads with **zero console errors** and every feature still works.

---

## Files touched

| File | Change |
| --- | --- |
| `assets/fonts/noto-sans-gurmukhi-var.woff2` | **New.** Self-hosted Gurmukhi variable font (33 KB). |
| `assets/gurmukhi-type.css` | `@font-face` declaration with Gurmukhi `unicode-range`. |
| `assets/deck-ch01-05.css` | Balancer steppers, atom ledger, walkthrough accordion, success animation + mobile sizing. |
| `assets/deck-theme.css` | Theme tokens for the new balancer chrome; `:empty` chip guard; `.balancer-eq` colour. |
| `assets/deck-enhance.js` | 3D flip + Leitner flashcards; cloze-deletion recall; hardened TTS; safe-storage wrappers. |
| `assets/glossary.js` | Roman→Gurmukhi transliterator (`gurmukhiPhonetic`). |
| `assets/sci-term.js` | Dual transliteration in popovers; voice-aware, fail-soft speech. |
| `assets/pwa.js` | Guarded `localStorage` access in `installMirror()`. |
| `sw.js` | Font added to precache; `CACHE_VERSION` → `v8`. |
| `Chapter 01 …html` | Balancer markup + logic, walkthrough data, etymology fix. |
| 15 other chapter decks, `index.html`, `mcq.html` | One additive `<link rel="preload">` for the font. |

> `index.html`, `mcq.html`, `assets/bmc-coffee.js` and
> `assets/deck-theme-init.js` also carry unrelated pre-existing uncommitted
> changes that are **not** part of this work.

---

## Verification

Served locally and driven in a real browser:

- **Font** — `document.fonts.check()` confirms the self-hosted face is loaded
  and ahead of any local font; Gurmukhi renders correctly on chapter decks,
  `index.html` and `mcq.html`. All 23 service-worker shell assets resolve.
- **Balancer** — solved Fe + H₂O end-to-end using only the `+`/`−` steppers;
  ledger flips all rows green, banner and celebration fire once, walkthrough
  reveals one step at a time and self-marks progress.
- **Flashcards** — flip, aria-hidden face swapping, "Review again" re-queueing
  at +5 (confirmed by position), mastered tally and progress bar.
- **Glossary** — popover shows both transliterations; all 233 entries produce
  clean Gurmukhi output.
- **TTS** — with English-only voices stubbed in, Gurmukhi correctly refuses and
  toasts while English still speaks.
- **Cloze** — individual reveal, markup preserved, `H` resets, re-masks on
  slide change, print cycle swaps blanks for real content and back. Swept all
  16 decks: **0 labels masked**, walkthrough hints intact.
- **Persistence** — bookmarks/theme/language survive reload; with storage
  throwing on every access the deck loads with zero errors.
- **Regression** — all 16 decks plus `index.html` and `mcq.html` load with no
  console errors; `node --check` passes on every edited JS file and on the
  Chapter 1 inline scripts.

### Bugs found and fixed during verification
1. `.bal-step` set `display: flex`, which overrides the UA rule for `[hidden]` —
   so every walkthrough hint rendered at once and gave the answer away
   immediately. Fixed with an explicit `.bal-step[hidden] { display: none }`.
2. Printing a handout while active recall was on produced a page of `[ ??? ]`
   blanks. Fixed with `beforeprint` / `afterprint` handlers.
3. Cloze masking initially hit run-in labels ("Example:", "Raw materials:") and
   the balancer walkthrough's own hint text — hiding the question instead of
   the answer. Fixed by skipping colon-terminated runs, headings and widget
   scaffolding.
4. Two unguarded `localStorage` reads that killed the deck when storage is
   blocked — see *Phase 5*.

---
---

# Round 2 — PSEB Board-Exam Content Upgrade (Chapters 1–3)

Board-exam hardening of the three chemistry chapters: state symbols on every
equation, high-yield "Board Favorite" callouts with model answers, colour-change
observation badges, and four new interactive widgets.

**Status: COMPLETE.** Verified in both colorways, on desktop and at 360/390px,
with zero console errors.

## Scope
Only `Chapter 01/02/03` HTML plus the two shared stylesheets they already use
(`assets/deck-ch01-05.css`, `assets/deck-theme.css`). No routing, no other
chapters, no dependencies added.

---

## Section 1 — Global board standards

### 1.1 Physical state annotations
Audited **every** reaction across the three decks and added `(s)` / `(l)` /
`(g)` / `(aq)` plus `↑` / `↓` where they were missing. Coverage is now
**15/15 (Ch1), 11/11 (Ch2), 4/4 (Ch3)** on genuine teaching equations.

Two categories were deliberately **left alone**, and this is a correctness
decision rather than an omission:

- **Generic patterns** (`A + B → AB`, `Acid + Metal → Salt + H₂↑`). These are
  reaction *templates*, not specific reactions; state symbols are meaningless
  on them and would be marked wrong in an exam.
- **Quiz prompts.** Their text is mirrored in `data-q` attributes that key the
  missed-question tracking and Quick Revision. Editing the visible text without
  the attribute would silently desync a student's saved progress.

### 1.2 `<sub>` / `<sup>` vs. the existing convention
The brief asked to replace "flat text" formulas with `<sub>`/`<sup>`. On
inspection **there is no flat text** — all 16 decks already use Unicode
subscripts (`H₂O`, `Fe₂O₃`), which render correctly and are what the quiz
engine, glossary and search index match against.

Converting ~200 occurrences to markup would have been pure churn with real
regression risk and no visible change, so the existing convention was kept and
followed in the new content (`Mg²⁺`, `Cl⁻`). `<sub>`/`<sup>` is used only where
markup genuinely helps, e.g. `MgCl<sub>2</sub>` inside prose.

### 1.3 "★ PSEB Board Favorite" callouts
A new `.board-alert` component: amber badge with the mark weighting, the
question in **English and Gurmukhi**, and a **model answer** written the way the
examiner wants it. The answer is always visible — this is revision material, not
a quiz. **Nine** callouts were added:

| Chapter | Questions |
| --- | --- |
| 1 | Respiration as exothermic; why paint prevents rusting |
| 2 | Distilled vs. rain water conductivity; curd in brass/copper; tooth decay below pH 5.5; why PoP needs a moisture-proof container |
| 3 | Roasting vs. calcination; Na/K stored in kerosene; aluminium for cooking utensils |

### 1.4 Colour-transition observation badges
A new `.obs-badge` component renders each stage as a chip with a **real colour
swatch**, so a student who has never done the practical can still see the colour
the examiner asks about. A new Chapter 1 slide, *"What You Actually See"*,
collects the five classic observations: FeSO₄·7H₂O, Pb(NO₃)₂, Fe + CuSO₄,
Pb(NO₃)₂ + KI, and the lime-water test (including the milkiness
**disappearing** in excess CO₂).

`2FeSO₄·7H₂O` is shown releasing **both SO₂ and SO₃**, matching the NCERT/PSEB
equation, rather than SO₂ alone.

---

## Section 2 — Chapter-specific widgets

### Chapter 2 · pH indicator swatches
Rather than building a second slider, the **existing** pH tool was extended, so
the quick-jump buttons and the info panel keep working and drive the new
swatches too. Litmus, phenolphthalein and methyl orange each render a live
colour chip plus a reading.

Transition bands are reported honestly instead of snapping at an integer —
phenolphthalein is labelled *"no change below 8.2"* and methyl orange shows an
explicit orange transition at 3.1–4.4.

### Chapter 2 · Salt revision cards
Four colour-coded cards (bleaching powder, baking soda, washing soda,
PoP/gypsum) with formula, preparation equation and two uses each. Baking soda
additionally carries the **thermal decomposition** equation and the reason
tartaric acid is added; PoP carries the **reversible** hydration pair, which is
the part PSEB actually tests.

### Chapter 3 · Reactivity series ladder
13 tappable metals in three colour-coded tiers keyed to **extraction method**
(electrolytic / carbon reduction / native), which is the real reason the series
matters. Each metal reports its behaviour, occurrence and extraction route.
Hydrogen is drawn as a **dashed reference chip**, since it is not a metal but is
the dividing line for displacement from acids. Mnemonic given in English and
Gurmukhi.

### Chapter 3 · Lewis electron-dot step viewer
Three steps (configuration → transfer → ions attract) for **NaCl** and
**MgCl₂**. Dots are positioned on a circle purely from the valence count, so
there is no artwork; transferring electrons are red and gained electrons green.
MgCl₂ makes the 1:2 ratio explicit — magnesium has 2 electrons to give but each
chlorine accepts only 1.

---

## Files touched (Round 2)

| File | Change |
| --- | --- |
| `assets/deck-ch01-05.css` | Six new components + mobile rules. |
| `assets/deck-theme.css` | Dark/light theme tokens for all six. |
| `Chapter 01 …html` | State symbols, 2 board alerts, new observations slide. |
| `Chapter 02 …html` | State symbols, indicator swatches + JS, salt-cards slide, 4 board alerts. |
| `Chapter 03 …html` | State symbols, ladder slide + JS, Lewis slide + JS, 3 board alerts, `ਨਿਸਤਾਪਨ` terminology fix. |
| `assets/glossary.js` | Calcination `pa` aligned to `ਨਿਸਤਾਪਨ` (see note below). |
| `sw.js` | `CACHE_VERSION` → `v9` so the new content reaches existing students. |

### Terminology: Calcination
The brief specified **ਨਿਸਤਾਪਨ**, but the deck said ਕੈਲਸੀਨੇਸ਼ਨ and
`assets/glossary.js` said ਨਿਖੇਪਣ — three different words for one term. Changing
only the slide would have meant a student tapping "Calcination" saw a *different*
Punjabi word than the table directly above it, so the glossary entry was aligned
too. This is the single edit made outside the three chapter files, and it is a
one-line data change with no behavioural effect.

---

## Verification (Round 2)

- **Structure** — all three decks balance exactly (Ch1 511/511 divs, Ch2
  598/598, Ch3 495/495) with one `.content-box` per slide and **0 empty slides**.
- **Components** — Ch1: 2 alerts + 6 badges. Ch2: 4 alerts + 4 salt cards + 3
  indicators. Ch3: 3 alerts + 13 ladder metals + Lewis viewer.
- **Chemistry** — indicator colours correct at pH 1/4/7/9/13; Lewis gives
  Na⁺/Cl⁻ and Cl⁻/Mg²⁺/Cl⁻ with the right transferred/gained dot counts.
- **Responsive** — at 360–390px both grids collapse to one column, tap targets
  stay ≥40px, and there is **no horizontal overflow**.
- **Both colorways** — legacy light resolves to dark text on light amber.
- **No errors** — zero console errors on all three decks; `new Function()` parse
  check passes on every inline script.

### Bugs found and fixed during Round 2
1. `.content-box` is `opacity: 0` until its parent slide is `.active` — this is
   what made several verification screenshots come out blank, and it cost real
   time to diagnose. The decks themselves were never broken.
2. Two of my own edits accidentally dropped a line (`const m1 = …`) and a slide
   opening (`<h2>Extraction Deep Dive</h2>`); both were caught by the structural
   div-balance check and restored.
3. The Lewis init ran before `renderLewis` was defined — the init was moved
   below the definitions.
4. The selected ladder chip used near-black text on a saturated red tier colour;
   changed to white for contrast.
5. A verification run appeared to show the glossary disagreeing with the Ch3
   table. It was the browser's HTTP disk cache for `glossary.js`; a fresh fetch
   and a clean browser context both returned the corrected term. The `v9` cache
   bump is what makes this land for real students.
