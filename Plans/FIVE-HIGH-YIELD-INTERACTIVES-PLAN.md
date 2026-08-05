# Five High-Yield Interactive Slides - Plan and Build Log

## Selection criteria

Each slide must teach a high-frequency board concept through prediction, manipulation, immediate feedback, and transfer to a new case. It must be useful without teacher narration, bilingual where the chapter uses Punjabi support, keyboard operable, touch friendly, theme aware, and readable on a 390 px viewport.

## 1. Acid Reaction Outcome Lab

- Chapter: 2 - Acids, Bases and Salts.
- Placement: immediately after "Acids with Carbonates" and before "Metallic vs Non-Metallic Oxides".
- Why here: learners have just met the three acid reaction patterns and carbonate equations. The lab forces comparison before the chapter moves to oxide classification.
- Learning objective: predict products, gas evidence, and test observations for acid + metal, carbonate, base, or metal oxide.
- Interaction: choose HCl or H2SO4, choose the reacting substance, then mix. The vessel changes state and the word equation, balanced example, and confirmatory test appear together.
- Misconceptions targeted: CO2 vs H2 confusion; expecting gas in neutralisation; forgetting that metal oxides behave as bases.
- Success check: all eight acid/partner combinations render a valid outcome and observation.

## 2. Concave-Mirror Image Formation Bench

- Chapter: 10 - Light: Reflection and Refraction.
- Placement: immediately after "Concave Mirror: Image for Each Position" and before convex-mirror uses.
- Why here: it converts a dense table into a manipulable spatial model while C, F, and P are still active in working memory.
- Learning objective: connect object position to image position, size, orientation, and screen test.
- Interaction: choose beyond C, at C, between C and F, at F, or between F and P. The image arrow moves and changes size/orientation while four readouts update.
- Misconceptions targeted: virtual image inside F; image at infinity for object at F; screenability of virtual images.
- Success check: all five canonical positions produce the textbook image properties.

## 3. Vision Defect Corrector

- Chapter: 11 - The Human Eye and Colourful World.
- Placement: immediately after "Defects of Vision Mechanics" and before dispersion.
- Why here: it closes the eye-defect sequence with causal practice before the chapter changes topic to atmospheric optics.
- Learning objective: diagnose myopia, hypermetropia, presbyopia, and cataract; select concave, convex, bifocal, or surgery; explain how focus moves.
- Interaction: inspect one clinical clue and focus marker, choose a correction, receive causal feedback, then advance through four cases with a running score.
- Misconceptions targeted: swapping myopia/hypermetropia lenses; treating cataract with spectacles; treating presbyopia as only one focal defect.
- Success check: correct option and retina focus are revealed after every answer; all four cases cycle.

## 4. Ohm's Law Live Circuit Lab

- Chapter: 12 - Electricity.
- Placement: immediately after "Ohm's Law & the V-I Graph" and before the formal statement.
- Why here: learners can discover the V/I relationship experimentally before consolidating the definition and constant-temperature condition.
- Learning objective: manipulate voltage and resistance, calculate current, interpret meter response, and relate points to a straight V-I pattern.
- Interaction: voltage and resistance sliders update I = V/R, three meter values, a current bar, and a plotted point. Presets create fast compare-and-predict cases.
- Misconceptions targeted: voltage and current as identical quantities; higher resistance increasing current; forgetting units.
- Success check: current updates numerically for every slider input and presets show proportional/inverse effects.

## 5. Fleming's Left-Hand Rule Direction Trainer

- Chapter: 13 - Magnetic Effects of Electric Current.
- Placement: immediately after "Force on a Conductor & Fleming's LHR" and before electromagnet comparison.
- Why here: the hand rule is procedural and needs repeated directional retrieval before motor applications.
- Learning objective: determine force from magnetic-field and current directions, and predict how reversing one or both vectors changes force.
- Interaction: six vector scenarios show field and current. Learners choose up, down, into page, or out of page; correct force and reasoning are revealed with a running score.
- Misconceptions targeted: mixing left- and right-hand rules; confusing current with field fingers; failing to reverse force when one input reverses.
- Success check: all six cross-product scenarios grade correctly and explain the reversal pattern.

## Shared quality requirements

- One shared engine in `assets/deck-enhance.js`; no duplicated chapter logic.
- Theme-aware styles in `assets/deck-theme.css` using deck tokens.
- `.flagship-lab` excluded from swipe navigation in all five chapters.
- Minimum 44 px touch targets, keyboard-operable buttons/selects/ranges, no horizontal overflow at 390 px.
- Browser checks: initial render, every scenario transition, correct/incorrect state, responsive screenshot, and no console errors.
- Catalog: add one slide to Chapters 2, 10, 11, 12, and 13 in `assets/chapters.js`.
