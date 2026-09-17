# BOLO.MCQ v2.0 — Question-Bank Upgrade — PLAN and LOG

Upgrade of the MCQ module (`mcq.html`) from a linear practice engine into a
medical-question-bank-standard learning tool, borrowing the UX patterns that
make AMBOSS and UWorld effective and adapting them to PSEB Class 10 Science,
Math and English.

**Status: COMPLETE.** All seven requested features shipped and verified in the
browser across both themes, both languages, and mobile width.

## Constraints honoured
- **Zero backend, zero login.** Everything is vanilla HTML/CSS/JS driven by
  `localStorage`. No frameworks, no build step, no network calls added.
- **Scope.** All engine, markup and styling changes live in `mcq.html`. One
  additive line in `assets/pwa.js` (see *Files touched*) was required to make
  the new progress key as durable as every other progress key in the app.
- **Preserved.** Neon/Classic themes, the `EN ⇄ ਪੰਜਾਬੀ` toggle, subject tabs,
  option shuffling, flagging, per-question timing, chapter/difficulty
  breakdowns, resume-mid-run persistence, and the page-transition veil.

---

## 1. Distractor elimination
The existing per-option `✕` strike button was kept and extended:
- **Desktop:** right-click anywhere on an option rules it out; the strike button
  now fades to 25% opacity until the row is hovered or focused, so it stops
  competing with the option text.
- **Keyboard:** `Shift + A/B/C/D` toggles elimination (plain letters answer).
- **Mobile/touch:** the dedicated strike button remains always visible.
- Struck options dim, get `line-through`, are `aria-disabled`, and are ignored by
  both click and keyboard answering until restored. Every toggle is announced.

## 2. Tutor Mode vs Timed Exam Mode
A persistent segmented switch sits in the header (`data-mode`).
- **Tutor (default):** instant grading, rationales, peer stats, pitfall,
  high-yield table and Educational Objective the moment an option is chosen.
- **Timed Exam:** picking an option records the answer (accent ring + `●`) but
  reveals *nothing*. A block countdown (`questions × seconds`) runs in the
  header, turning red under 60 s. The live score pill is hidden so grading
  cannot leak. `Review & Submit` opens a dialog summarising answered /
  unanswered / flagged / time-left, then unlocks every explanation at once.
- Timer expiry auto-submits. A block whose deadline passed while the tab was
  closed is submitted on restore rather than resuming with impossible time.
- Reveal gating is centralised in `isRevealed()` / `answersLocked()` so no
  render path can accidentally expose answers early.

## 3. Progressive "Need a Clue?" disclosure
Every one of the 44 questions has an authored bilingual `hint` that nudges the
reasoning without naming the answer. Offered only before committing and only in
Tutor mode; shown afterwards as "Clue you used". `H` toggles it, and clue usage
is counted on the results screen.

## 4. Upgraded explanation panel
Per-option rationales and the Educational Objective banner are unchanged. Added:
- **Common Pitfall / Trap Alert** — authored for all 44 questions, explaining
  why the tempting distractor tempts (calculation slips in Math, displacement vs
  double displacement in Science, irregular-verb and conditional traps in
  English). Falls back to the most-chosen distractor's own rationale.
- **High-Yield Summary** — a collapsible `<details>` comparison table on 28
  questions (reaction types, pH scale, oxide nature, functional groups, reflex
  arc, Punnett square, mirrors, vision defects, Ohm's law, series vs parallel,
  discriminant, AP formulas, standard angles, modals, conditionals, …).

## 5. Simulated peer response statistics
A percentage bar under each option in the explanation view: green for the
correct answer, red for the student's pick, grey otherwise. With no backend,
the split is derived deterministically from an FNV-1a hash of the question id
and its difficulty — the same question always shows the same distribution,
harder questions show a flatter spread, and totals always sum to exactly 100%.
An authored `peerPct` on the options overrides the simulation. A closing line
normalises mistakes ("only 46% get this right") or reinforces ("most students…").

## 6. Custom Quiz & filter modal
`⚙️ Custom Quiz` builds a practice set from:
- **Subject** — Science / Math / English / **Mixed** (draws across all banks).
- **Question Mode** — All / Unused / Incorrect / Flagged, each chip showing a
  live count and disabling itself when empty.
- **Count** — 5 / 10 / 15 / All, clamped to what the filter can supply.
- **Mode & timer** — Tutor or Timed Exam at 45 / 60 / 90 s or untimed.
A custom run shows a dismissible badge in the header and gets its own results
screen, including a per-subject breakdown for mixed sets.

## 7. Client-side persistence
- `bolo_mcq_history_v1` (new) — lifetime `seen` / `wrong` / `flagged` sets plus
  per-subject accuracy. Recorded once per question per run (guarded by
  `recorded`), so replaying never inflates the stats. This is what powers the
  Unused/Incorrect/Flagged filters and the history grid in the modal.
- `bolo_mcq_attempts_v1` — extended to namespaced scopes: one saved run per
  subject bank plus a `CUSTOM` scope, each holding answers, strikes, flags,
  timings, clues opened, option permutation, exam deadline and position.
- Stale ids and invalid permutations are validated away on restore, so editing
  the bank in a later deploy can never crash a returning student.
- **Reset History** in the modal, with a two-tap confirm, clears history and all
  saved runs.

---

## Files touched
| File | Change |
| --- | --- |
| `mcq.html` | All engine, markup and CSS work. Question bank gained `hint`, `trap` and `table` fields on all 44 questions. |
| `assets/pwa.js` | **One line added by this task:** `bolo_mcq_history_v1` appended to `MIRRORED_KEYS`. Without it the new lifetime history would have been the only progress key not mirrored to IndexedDB, so it alone would be lost to a storage eviction. Additive — cannot affect other pages. Reaches clients on their next visit via the service worker's stale-while-revalidate. *Note: this file also carries an unrelated concurrent edit (guarding `window.localStorage` access for Safari Private Browsing) that did not originate from this task and was deliberately left untouched.* |

No other file was modified. `sw.js` needs no version bump: `pwa.js` is not
matched by `IMMUTABLE_RE`, so it is already served stale-while-revalidate.

## Accessibility & input
`aria-pressed` on mode, strike and chip buttons; `aria-expanded` on the clue;
`role="dialog"` + `aria-modal` on both modals with focus move, focus restore,
`Esc` to close and backdrop-click to dismiss; `role="timer"` with a live label;
every state change announced through the existing live region.
Keyboard: `A–E` answer, `Shift+A–E` eliminate, `F` flag, `H` clue, `←/→`
navigate, `Enter` advance/submit, `Esc` close.

## Verification performed
- Automated walk of **all 44 questions in all three banks**, asserting for each:
  peer percentages total exactly 100%, the bar flagged "Correct" aligns with the
  correct option *after* shuffling (i.e. the display↔authored permutation is
  applied correctly), and a pitfall and objective are present. **44/44 passed,
  0 misaligned.**
- Exam mode: answers verified hidden pre-submit (options show "recorded", score
  pill hidden, progress segments neutral); `Review & Submit` and timer
  auto-submit both verified, including clock fast-forward to expiry.
- History integrity: re-answering a recorded question does **not** double-count
  attempts; a reload resumes the exact run, subject and score.
- Custom quiz: Mixed × All × 5 in Timed Exam verified end to end; empty-filter
  chips disable correctly; Reset History verified to clear both history and runs.
- Themes: Neon and Classic both checked, including the modal, tables and bars.
- Mobile: 390 × 844 viewport checked — header wraps, action bar stacks.
- `node --check` clean on both inline scripts and on `assets/pwa.js`.

## Extending the bank
Append to `BANKS[SUBJECT].questions`. Required: `id`, `ch`, `competency`,
`diff`, `prompt{pa,en}`, `options[{t{pa,en}, correct, r{pa,en}}]`,
`objective{pa,en}`. Optional: `hint{pa,en}`, `trap{pa,en}`,
`table{title,headers,rows,note}` (all cells `{pa,en}`), and `peerPct` per option
to override simulated statistics. `subj` is stamped automatically at boot.

---

# v2.1 — Question Bank Expansion (44 → 95)

**Status: COMPLETE.** 51 new board-pattern MCQs added: Science +22 (20→42),
Math +15 (12→27), English +14 (12→26).

## Why these questions
Two chapters in each of Science and Math had **zero** questions despite being
examinable, so those were filled first:

| Was missing | Now |
| --- | --- |
| Science Ch 14 · Sources of Energy | 1 question (biogas composition) |
| Science Ch 16 · Sustainable Management | 1 question (coliform as pollution indicator) |
| Math Ch 9 · Applications of Trigonometry | 1 question (angle of elevation) |
| Math Ch 13 · Surface Areas and Volumes | 2 questions — one of the highest-weight board chapters |

English gained four categories it had never covered: **conjunctions, relative
clauses, one-word substitution and phrasal verbs**.

Every remaining chapter was raised to at least two questions so a chapter-wise
breakdown on the results screen is meaningful rather than a single data point.

## Quality controls applied
- **Every numeric answer was recomputed independently in Python** before being
  written into the bank (HCF–LCM, discriminant, AP sum, section formula,
  sector area, sphere→cylinder recast, probability, elevation height).
- **Distractors are diagnostic, not filler.** Each wrong option corresponds to a
  specific, nameable student error — squaring omitted, ratio inverted, `(n−1)`
  read as `n`, tense correct but number wrong, `little` vs `a little`,
  ozone depletion confused with global warming, lactic acid confused with
  ethanol. Each one's rationale says exactly which slip produces it.
- **No repeats.** The injector aborts if any new id *or* any new English prompt
  already exists in the bank; both checks passed.
- Bilingual throughout — prompt, all four options, all four rationales,
  objective, clue and pitfall in both Punjabi and English.
- 34 of the 95 questions now carry a high-yield comparison table.
- Difficulty spread kept board-realistic: Easy 14, Medium 62, Hard 19.

## Verification
- `node --check` clean; bank parsed and structurally validated
  (95 unique ids, 95 unique prompts, exactly one correct option each, no
  missing bilingual field, no table column/header mismatch).
- Automated browser walk of **all 95 questions**: peer percentages total 100%,
  the bar marked "Correct" aligns with the correct option after shuffling,
  and every card renders a pitfall, an objective and one rationale per option.
  **95/95 passed, 0 failures.**

## Questions added

## SCIENCE — 22 new

| # | ID | Chapter / Area | Diff | Question | Correct answer |
|---|---|---|---|---|---|
| 1 | `SCI-CH1-03` | Ch 1 · ਰਸਾਇਣਕ ਪ੍ਰਤੀਕ੍ਰਿਆਵਾਂ | Medium | Why are packets of chips flushed with nitrogen gas instead of air? | **Nitrogen removes oxygen and prevents oxidation (rancidity) of the fats** |
| 2 | `SCI-CH1-04` | Ch 1 · ਰਸਾਇਣਕ ਪ੍ਰਤੀਕ੍ਰਿਆਵਾਂ | Hard | In the reaction CuO + H₂ → Cu + H₂O, which substance is being oxidised? | **H₂ (hydrogen)** |
| 3 | `SCI-CH2-03` | Ch 2 · ਤੇਜ਼ਾਬ, ਖਾਰ ਅਤੇ ਲੂਣ | Medium | What is the correct chemical formula of Plaster of Paris (POP)? | **CaSO₄·½H₂O** |
| 4 | `SCI-CH2-04` | Ch 2 · ਤੇਜ਼ਾਬ, ਖਾਰ ਅਤੇ ਲੂਣ | Medium | Tooth decay begins when the pH of the mouth falls below 5.5. For this reason, toothpastes are usually: | **Mildly basic, so that the excess acid is neutralised** |
| 5 | `SCI-CH3-03` | Ch 3 · ਧਾਤਾਂ ਅਤੇ ਅਧਾਤਾਂ | Medium | An iron nail placed in blue copper sulphate solution turns brownish and the blue colour fades. Why? | **Iron is more reactive than copper, so it displaces copper from the solution** |
| 6 | `SCI-CH3-04` | Ch 3 · ਧਾਤਾਂ ਅਤੇ ਅਧਾਤਾਂ | Medium | In galvanisation, iron is coated with zinc. Why does the iron stay protected even if the coating gets slightly scratched? | **Zinc is more reactive than iron, so it corrodes first and sacrifices itself** |
| 7 | `SCI-CH4-03` | Ch 4 · ਕਾਰਬਨ ਅਤੇ ਉਸਦੇ ਯੋਗਿਕ | Hard | Soap produces very little lather with hard water and forms a white curdy 'scum'. What causes this? | **Calcium and magnesium ions in hard water form insoluble salts with the soap** |
| 8 | `SCI-CH4-04` | Ch 4 · ਕਾਰਬਨ ਅਤੇ ਉਸਦੇ ਯੋਗਿਕ | Medium | Two successive members of a homologous series differ by: | **One —CH₂— unit, i.e. 14 u of molecular mass** |
| 9 | `SCI-CH5-02` | Ch 5 · ਤੱਤਾਂ ਦਾ ਆਵਰਤੀ ਵਰਗੀਕਰਨ | Hard | Why does atomic radius decrease as we move from left to right across a period in the Modern Periodic Table? | **Nuclear charge increases while the number of shells stays the same, pulling the electrons in tighter** |
| 10 | `SCI-CH6-02` | Ch 6 · ਜੀਵਨ ਪ੍ਰਕਿਰਿਆਵਾਂ | Medium | What causes cramps in the leg muscles after running fast for a long time? | **A shortage of oxygen forces anaerobic respiration, and lactic acid builds up** |
| 11 | `SCI-CH6-03` | Ch 6 · ਜੀਵਨ ਪ੍ਰਕਿਰਿਆਵਾਂ | Medium | Which statement correctly describes the roles of xylem and phloem in plants? | **Xylem carries water and minerals upward from the roots; phloem carries food in both directions** |
| 12 | `SCI-CH6B-02` | Ch 6 · ਕੰਟਰੋਲ ਅਤੇ ਤਾਲਮੇਲ | Medium | A person's blood sugar level stays persistently high. Which gland is under-secreting which hormone? | **Pancreas — insulin** |
| 13 | `SCI-CH7-02` | Ch 7 · ਜੀਵ ਪ੍ਰਜਣਨ ਕਿਵੇਂ ਕਰਦੇ ਹਨ | Medium | By which method do Hydra and yeast reproduce asexually? | **Budding** |
| 14 | `SCI-CH8-02` | Ch 8 · ਅਨੁਵੰਸ਼ਿਕਤਾ | Medium | In humans, which parent determines the sex of the child, and why? | **The father, because he contributes either an X or a Y chromosome** |
| 15 | `SCI-CH9-03` | Ch 9 · ਪ੍ਰਕਾਸ਼ – ਪਰਾਵਰਤਨ ਅਤੇ ਅਪਵਰਤਨ | Hard | An object is placed 20 cm from a concave mirror of focal length 10 cm. What is the nature of the image? | **At 20 cm from the mirror — real, inverted and the same size as the object** |
| 16 | `SCI-CH9-04` | Ch 9 · ਪ੍ਰਕਾਸ਼ – ਪਰਾਵਰਤਨ ਅਤੇ ਅਪਵਰਤਨ | Medium | What is the power of a convex lens whose focal length is 50 cm? | **+2 D** |
| 17 | `SCI-CH10-03` | Ch 10 · ਮਨੁੱਖੀ ਅੱਖ ਅਤੇ ਰੰਗੀਨ ਸੰਸਾਰ | Medium | Why are danger signals (such as stop lights) made red rather than any other colour? | **Red has the longest wavelength, so it is scattered least and stays visible from the greatest distance** |
| 18 | `SCI-CH11-03` | Ch 11 · ਬਿਜਲੀ | Hard | What is the resistance of a 100 W bulb designed to work on a 220 V supply? | **484 Ω** |
| 19 | `SCI-CH12-02` | Ch 12 · ਬਿਜਲਈ ਧਾਰਾ ਦੇ ਚੁੰਬਕੀ ਪ੍ਰਭਾਵ | Medium | What is the main purpose of the earth wire in a domestic electric circuit? | **It gives leakage current a low-resistance path to the ground, preventing electric shock** |
| 20 | `SCI-CH13-02` | Ch 13 · ਸਾਡਾ ਵਾਤਾਵਰਣ | Medium | What is the importance of the ozone layer, and which chemicals damage it? | **It absorbs the Sun's harmful ultraviolet (UV) radiation, and it is damaged by CFCs** |
| 21 | `SCI-CH14-01` | Ch 14 · ਊਰਜਾ ਦੇ ਸ੍ਰੋਤ | Easy | What is the main constituent of biogas, and why does it make a good fuel? | **Methane (about 75%) — it burns without smoke and gives a high heat output** |
| 22 | `SCI-CH16-01` | Ch 16 · ਕੁਦਰਤੀ ਸਾਧਨਾਂ ਦਾ ਟਿਕਾਊ ਪ੍ਰਬੰਧਨ | Medium | The presence of coliform bacteria in a water sample indicates: | **The water is contaminated with sewage or faecal matter** |

## MATH — 15 new

| # | ID | Chapter / Area | Diff | Question | Correct answer |
|---|---|---|---|---|---|
| 1 | `MAT-CH1-02` | Ch 1 · ਵਾਸਤਵਿਕ ਸੰਖਿਆਵਾਂ | Medium | Which of the following rational numbers has a non-terminating repeating decimal expansion? | **64/455** |
| 2 | `MAT-CH2-02` | Ch 2 · ਬਹੁਪਦ | Hard | If α and β are the zeroes of the polynomial x² − 5x + 6, what is the value of 1/α + 1/β? | **5/6** |
| 3 | `MAT-CH3-02` | Ch 3 · ਦੋ ਚਲਾਂ ਵਾਲੇ ਰੇਖੀ ਸਮੀਕਰਨ | Hard | For what value of k will the pair 2x + 3y = 5 and 4x + ky = 10 have infinitely many solutions? | **k = 6** |
| 4 | `MAT-CH4-02` | Ch 4 · ਦੁਘਾਤੀ ਸਮੀਕਰਨ | Medium | For which positive value of k does the equation x² + kx + 4 = 0 have real and equal roots? | **k = 4** |
| 5 | `MAT-CH5-02` | Ch 5 · ਅੰਕਗਣਿਤਕ ਲੜੀ (AP) | Medium | What is the sum of the first 20 terms of the AP 2, 5, 8, 11, …? | **610** |
| 6 | `MAT-CH6-02` | Ch 6 · ਤ੍ਰਿਭੁਜ | Medium | In ΔABC, DE ∥ BC with D on AB and E on AC. If AD = 2 cm, DB = 3 cm and AE = 4 cm, find EC. | **6 cm** |
| 7 | `MAT-CH7-02` | Ch 7 · ਨਿਰਦੇਸ਼ ਅੰਕ ਜਿਓਮੈਟਰੀ | Hard | Point P divides the line segment joining A(1, 3) and B(6, −2) internally in the ratio 2 : 3. Find the coordinates of P. | **(3, 1)** |
| 8 | `MAT-CH8-02` | Ch 8 · ਤਿਕੋਣਮਿਤੀ | Medium | If sin θ = 3/5 for an acute angle θ, what is the value of cos θ? | **4/5** |
| 9 | `MAT-CH9-01` | Ch 9 · ਤਿਕੋਣਮਿਤੀ ਦੇ ਉਪਯੋਗ | Medium | From a point 30 m away from the foot of a tower, the angle of elevation of its top is 30°. Find the height of the tower. | **10√3 m (about 17.3 m)** |
| 10 | `MAT-CH10-02` | Ch 10 · ਚੱਕਰ | Medium | From an external point P, two tangents PA and PB are drawn to a circle with centre O. If ∠APB = 60°, find ∠AOB. | **120°** |
| 11 | `MAT-CH12-02` | Ch 12 · ਚੱਕਰ ਨਾਲ ਸੰਬੰਧਿਤ ਖੇਤਰਫਲ | Medium | Find the area of a sector of angle 60° in a circle of radius 21 cm. (Take π = 22/7) | **231 cm²** |
| 12 | `MAT-CH13-01` | Ch 13 · ਸਤਹੀ ਖੇਤਰਫਲ ਅਤੇ ਆਇਤਨ | Hard | A solid sphere of radius 3 cm is melted and recast into a cylinder of radius 3 cm. What is the height of the cylinder? | **4 cm** |
| 13 | `MAT-CH13-02` | Ch 13 · ਸਤਹੀ ਖੇਤਰਫਲ ਅਤੇ ਆਇਤਨ | Medium | What is the total surface area of a solid hemisphere of radius r? | **3πr²** |
| 14 | `MAT-CH14-02` | Ch 14 · ਅੰਕੜਾ ਵਿਗਿਆਨ | Medium | Which measure of central tendency of grouped data can be determined graphically by drawing an ogive? | **Median** |
| 15 | `MAT-CH15-02` | Ch 15 · ਸੰਭਾਵਨਾ | Medium | One card is drawn from a well-shuffled deck of 52 cards. What is the probability that it is a red face card? | **3/26** |

## ENGLISH — 14 new

| # | ID | Chapter / Area | Diff | Question | Correct answer |
|---|---|---|---|---|---|
| 1 | `ENG-GR-09` | Grammar · Tenses | Medium | Choose the correct option: "I ______ my keys, so I cannot open the door." | **have lost** |
| 2 | `ENG-GR-10` | Grammar · Voice | Medium | Change the following sentence into the passive voice: "The teacher praised the students." | **The students were praised by the teacher.** |
| 3 | `ENG-GR-11` | Grammar · Narration | Hard | Choose the correct indirect speech: The teacher said to the boys, "Sit down." | **The teacher ordered the boys to sit down.** |
| 4 | `ENG-GR-12` | Grammar · Modals | Medium | Choose the correct modal: "He ______ swim across the river when he was only ten." | **could** |
| 5 | `ENG-GR-13` | Grammar · Prepositions | Easy | Choose the correct preposition: "My sister is very good ______ mathematics." | **at** |
| 6 | `ENG-GR-14` | Grammar · Determiners | Hard | Choose the correct option: "There is ______ milk in the jug, so we must buy some more." | **little** |
| 7 | `ENG-GR-15` | Grammar · Subject-Verb Agreement | Medium | Choose the correct option: "One of the students ______ absent today." | **is** |
| 8 | `ENG-GR-16` | Grammar · Conditionals | Medium | Choose the correct option: "If it rains tomorrow, we ______ the match." | **will cancel** |
| 9 | `ENG-GR-17` | Grammar · Conjunctions | Medium | Choose the correct conjunction: "______ you work hard, you will not pass the examination." | **Unless** |
| 10 | `ENG-GR-18` | Grammar · Relative Clauses | Easy | Choose the correct relative pronoun: "This is the boy ______ won the first prize." | **who** |
| 11 | `ENG-VOC-04` | Vocabulary · One-Word Substitution | Medium | Choose the one-word substitution: "The life story of a person written by that person himself." | **Autobiography** |
| 12 | `ENG-VOC-05` | Vocabulary · Phrasal Verbs | Medium | Choose the correct phrasal verb: "The plane will ______ at six in the morning." | **take off** |
| 13 | `ENG-COM-02` | Comprehension | Hard | "Despite repeated warnings from his parents, Rohan kept riding his motorcycle without a helmet. Last Monday, his luck finally ran out." — What can be inferred from this passage? | **Rohan met with an accident on Monday** |
| 14 | `ENG-COM-03` | Comprehension | Medium | "The old banyan tree in our village square has witnessed weddings, quarrels and festivals for over a hundred years. To cut it down would be to erase a living record of our shared past." — What is the writer's main argument? | **The tree should be preserved because it is part of the village's shared history** |
