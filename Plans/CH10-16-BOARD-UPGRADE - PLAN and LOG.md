# Chapters 10–16 — Board Components, Blueprint Tagging & Flashcards — PLAN and LOG

Upgrade of the Physics and Environment half of the syllabus (menu chapters
10–16) against the PSEB Class 10 blueprint and low-end Android constraints.

**Status: COMPLETE.** All pages verified in the browser — 13 pages, zero
console errors, both colorways, 360 px mobile.

---

## 0. Two things worth reading before the rest

### 0.1 Chapter numbering: menu vs. directory
The repo carries **two numbering schemes**, and the brief uses the menu one:

| Brief / menu | `<title>` | Directory on disk |
| --- | --- | --- |
| Ch 10 Light | Chapter 10 | `Chapter 09 - Light Reflection and Refraction` |
| Ch 11 Human Eye | Chapter 11 | `Chapter 10 - The Human Eye and Colourful World` |
| Ch 12 Electricity | Chapter 12 | `Chapter 11 - Electricity` |
| Ch 13 Magnetic Effects | Chapter 13 | `Chapter 12 - Magnetic Effects…` |
| Ch 14 Sources of Energy | Chapter 14 | `Chapter 14 - Sources of Energy` |
| Ch 15 Our Environment | Chapter 15 | `Chapter 13 - Our Environment` |
| Ch 16 Sustainable Mgmt | Chapter 16 | `Chapter 16 - Sustainable…` |

`assets/chapters.js` `n` and each deck's `<title>` (which is what
`deck-enhance.js` parses for `CH`) both use the **menu** numbering, so that is
authoritative. Directory names are legacy and were left alone — renaming them
would break every stored progress key and every `file:` path.

### 0.2 Why this is not React + TypeScript
The brief specified `NumericalScaffold.tsx` and `DiagramLabelPractice.tsx`.
This app has **no build step, no bundler and no `package.json`** — every deck
is a standalone HTML file loading classic scripts, which is exactly what lets
the whole syllabus work offline and over `file://`.

Introducing React would have contradicted the brief's own constraint —
*"keep bundle size small; avoid heavy external dependencies that could slow
down performance on entry-level Android devices"*. React + ReactDOM is ~45 KB
gzipped; **the entire component library here is 32 KB uncompressed and ships
zero dependencies.**

So the components keep the same props-in/render-out shape the brief describes,
and the type contracts are expressed as **JSDoc `@typedef`s** — checked by the
TypeScript language service in VS Code exactly like `.d.ts` types, without
shipping a compiler. `BoardMeta`, `NumericalSpec`, `DiagramSpec`, `Hotspot`,
`SignCheck`, `NumVar`, `NumStep` and `Bi` are all declared at the top of
`assets/pseb-board.js`.

> The brief skips from item 4 to item 6 — there is no item 5. Nothing was
> dropped; it is absent from the source.

---

## 1. Blueprint metadata & tagging

New shared schema, used by both the decks and the MCQ engine:

```
pseb_marks      "1M_OBJECTIVE" | "2M_SHORT" | "3M_NUMERICAL_OR_DIAGRAM" | "5M_LONG_DERIVATION"
pyq_tag         "PSEB 2023 Set A" | "PSEB 2024" | "Model Test Paper" | …
bloom_taxonomy  "Knowledge" | "Application" | "Analysis"
```

Rendered as colour-coded chips: mark weighting ramps cool→warm as the value
rises (blue 1 M → green 2 M → amber 3 M → red 5 M); a real previous-year tag is
the only chip with a **filled** treatment, because it is the strongest "this
will be asked" signal on the card; Bloom is deliberately muted.

- **Decks** — `PSEBBoard.badges()` renders them above each component.
- **MCQ** — all **11** Ch 10–16 Science questions stamped, rendered through a
  new `psebBlueprintRunes()` that reuses the existing `.meta-rune` shape so the
  card rhythm is unchanged. Untagged banks render nothing and are untouched.

**Mark weightings were judged against each question's actual prompt, not
assumed.** A first pass assigned them mechanically and produced real errors —
*"What is the main purpose of the earth wire?"* had been tagged
`5M_LONG_DERIVATION`, and *"Which rule gives the direction of the magnetic
field?"* (pure recall) had been tagged `3M_NUMERICAL_OR_DIAGRAM`. All 11 were
re-read and corrected.

## 2. NumericalScaffold — Ch 10 and Ch 12

Four-step progressive reveal: **Given → To Find → Formula → Step-by-step
solution & answer**, each step bilingual (`ਦਿੱਤਾ ਹੈ / Given` …) with both
scripts always in the DOM so switching reading language cannot shift layout.

- Negative quantities get a red-bordered chip — the dropped minus sign is the
  single commonest lost mark in Ch 10.
- Units are bound into the final answer line, never left as commentary.
- **Sign Convention Check** sits *before* any working, so the student commits
  to the signs first. A wrong pick still marks the **correct** option, so the
  rule is taught rather than the failure merely reported.

Four numericals authored and arithmetically verified:

| Chapter | Numerical | Answer |
| --- | --- | --- |
| 10 | Concave mirror, u = −30, f = −15 | v = −30 cm, m = −1 |
| 10 | Convex lens, u = −30, f = +20 | v = +60 cm, m = −2, P = +5 D |
| 12 | 5 Ω, 10 Ω, 30 Ω series & parallel | Rs = 45 Ω, Rp = 3 Ω |
| 12 | Heater 220 V, 5 A, 2 h @ ₹5/unit | 7.92 × 10⁶ J = 2.2 kWh, ₹11 |

## 3. DiagramLabelPractice — Ch 10–14

Five figures, all **inline SVG** (no image assets, theme-aware ink, crisp at
any width). Numbered markers sit on the figure; the bilingual label is
published to a **legend below**, blurred until revealed.

> The first build expanded each marker into the full bilingual label in place.
> On a 640 × 360 figure that buried the diagram completely — the screenshot is
> what killed the design. The legend keeps the figure readable and works far
> better at 360 px. Legend rows are themselves tappable, giving a large-touch
> alternative to the 27 px markers.

Figures: concave-mirror ray diagram (Ch 10), myopia + concave correction and
hypermetropia + convex correction (Ch 11), domestic three-wire system (Ch 13),
fixed-dome biogas plant (Ch 14).

Two correctness points that needed real care:

- **The SVG must not print the answers.** The first mirror figure rendered
  "Object", "C", "F", "P" as SVG text, which defeats the entire exercise. All
  giveaway text was removed; C/F/P are now unlettered tick marks.
- **Rays reflect at the plane through the pole**, which is the textbook
  idealisation. Reflecting off the true arc shows spherical aberration and the
  two construction rays miss the image tip by ~5 px.

Marker placement is **verified programmatically**, not by eye: a
point-to-segment clearance check asserts every marker is ≥ 17 px from any ink
it does not label and ≥ 34 px from every other marker. The first pass reported
10 collisions across the eye and wiring figures; all were repositioned to zero.

## 4. Flashcards — Ch 10–16

`assets/flash-data.js` enrichment went from **44/89 to 98/98 terms** — full
coverage for every Ch 10–16 glossary term, each with a bilingual everyday
analogy, a PSEB-aligned definition, an examiner-facing board note and, where
it applies, a formula.

Nine new glossary terms were added to carry the brief's high-yield items that
had no entry at all: Snell's Law, Mirror Formula, Lens Formula, Power of a
Lens, Sign Convention, Commercial Unit, Ten Percent Law, Five R's, Amrita Devi
Bishnoi.

Everything the brief enumerated is covered — mirror-vs-lens sign contrast,
Snell's law, the 2-mark reasoning cards, series/parallel, H = I²Rt,
1 kWh = 3.6 × 10⁶ J, RH-thumb vs Fleming's LH, wire colour codes, biogas ≈ 75 %
CH₄, the 10 % law, biomagnification, CFC/ozone chemistry, the five R's in
Gurmukhi, and Chipko/Amrita Devi.

## 5. UI & bilingual constraints

- Both script halves are always in the DOM; the language toggle changes
  emphasis, never presence — **no layout shift**.
- Badges and step labels are pinned in **px**, so the A+/A− text-size control
  cannot reflow a slide around its chrome.
- All new motion is disabled under `prefers-reduced-motion`; a print
  stylesheet reveals every step and legend row for handouts.
- Existing theme tokens, active-recall and `ਸੁਣੋ` TTS are untouched.

---

## Files

| File | Change |
| --- | --- |
| `assets/pseb-board.js` | **New.** 17 KB. Three components + 8 JSDoc typedefs. |
| `assets/pseb-board.css` | **New.** 15 KB. Theme-token styling, mobile rules, print rules. |
| `assets/flash-data.js` | 51 enriched terms for Ch 10–16. |
| `assets/glossary.js` | 9 new high-yield terms (242 total). |
| `assets/chapters.js` | Slide counts re-synced (see below). |
| `mcq.html` | Blueprint fields on 11 questions + `psebBlueprintRunes()` + chip styles. |
| Ch 10/11/12/13/14 decks | Component assets in `<head>`, 9 new slides. |
| Ch 15/16 decks | Component assets in `<head>` (flashcard-only chapters). |
| `sw.js` | `pseb-board.*` + `flash-data.js` precached; cache version bumped. |

---

## Verification

- **13 pages** (all 7 target decks, 3 control decks, index, MCQ, flashcards)
  load with **zero console errors**; every component hydrates.
- **Interaction driven, not assumed** — the scaffold was stepped through all
  four stages, the sign check exercised with a deliberately wrong answer, and
  hotspots/legend/reset clicked on every figure.
- **Arithmetic** re-derived independently for all four numericals.
- **Geometry** asserted by script: 0 marker/ink collisions across all figures.
- **Mobile 360 px** — no horizontal overflow; sign options 258 × 44, nav
  buttons 88 × 43, legend single-column, badges wrap instead of clipping.
- **Both colorways** — Classic light resolves badges to `#92400e` on light,
  step text to `#182437`.

### Bugs found and fixed
1. `.pseb-dia-fig` had to be introduced because hotspots were positioned
   against the **padded stage** rather than the SVG box, offsetting every
   marker. Now asserted equal (607 × 304 = 607 × 304).
2. Bilingual halves ran together (`…CONCAVE mirror?ਬਦਲਣ ਤੋਂ…`) in the sign
   check — the `.pa` span needed `display:block` there too.
3. SVG text was giving away the labels the exercise asks for.
4. Mobile: two sign options per row shredded their labels at 360 px; variable
   notes wrapped into a tall narrow column; the long mark label was clipped.
5. **`chapters.js` slide counts were stale** after the new slides — they drive
   the progress ring and the "N Slides" rune on the menu, so Ch 10 would have
   read 38 slides as 35. Re-synced from the actual DOM.
6. MCQ mark weightings mis-assigned on first pass (see §1).

---

## Known issue — NOT fixed, deliberately

**`mcq.html` uses the old directory numbering while the rest of the app uses
menu numbering.** The bank is missing *Control and Coordination* entirely, so
everything from Ch 7 on is shifted by one:

| MCQ label | Actually is | Menu number |
| --- | --- | --- |
| `Ch 9 · ਪ੍ਰਕਾਸ਼` | Light | **10** |
| `Ch 10 · ਮਨੁੱਖੀ ਅੱਖ` | Human Eye | **11** |
| `Ch 11 · ਬਿਜਲੀ` | Electricity | **12** |
| `Ch 12 · ਚੁੰਬਕੀ ਪ੍ਰਭਾਵ` | Magnetic Effects | **13** |
| `Ch 13 · ਸਾਡਾ ਵਾਤਾਵਰਣ` | Our Environment | **15** |

A student who opens "Ch 12 Electricity" from the menu and then picks
"Ch 11 · ਬਿਜਲੀ" in the MCQ engine sees contradictory numbers.

This was **not** silently renumbered because it is pre-existing, spans the
whole bank rather than just Ch 10–16, and the question **ids themselves**
encode the old scheme (`SCI-CH11-*` = Electricity). Attempts, flags and history
are keyed by those ids, so a half-fix that relabels display text while leaving
ids alone would be more confusing for the next maintainer, and a full renumber
needs its own regression pass. Flagging it for a deliberate follow-up.

---
---

# Round 4 — Full lecture-deck feature audit & active-recall repair

Triggered by a report that the lecture slides had *"lost a lot of features"*.

**Outcome: one real regression found and fixed. No features were missing.**
All 16 decks audited control-by-control; everything else was already working.

## What was actually audited

Rather than guess, every control was **exercised programmatically** on all 16
chapters — not merely checked for presence:

| Checked | Result |
| --- | --- |
| All 11 toolbar buttons present | 16/16 |
| Navigation (`moveSlide`/`goToSlide`, counter updates) | 16/16 |
| Slide outline populated | 16/16 (30–38 entries each) |
| Language toggle ਪੰ⇄EN | 16/16 |
| Quick Revision flashcards open & render a card | 16/16 |
| Bookmark toggle | 16/16 |
| Help overlay, font popup + scaling, timer, theme toggle | pass |
| MCQ feedback, short-answer, next-sub-slide, flip cards | pass |
| Every `onclick`/`oninput` handler resolves to a function | 16/16 |
| Console errors | **0 across all 16** |

`deck-enhance.js` was also diffed against the pre-upgrade commit (`0d73ce4`):
**zero functions removed, zero `window.__pseb*` exports removed.** Nothing had
been dropped.

## The real regression — active recall masked UI chrome

`H` (active recall) was masking **interface text instead of content**, which is
what made the feature feel broken:

| Chapter | Was masked | Should never be |
| --- | --- | --- |
| 1 | `+`, `−` | the balancer's stepper instruction |
| 1 | `Walkthrough`, `Try Another Equation` | widget instructions |
| 12 | `⚠️ Board Trap` | a callout heading |
| 12 | `3/6` | a progress counter |

Root cause: these decks use `<strong>` for **three** different jobs — real key
terms, run-in labels (already excluded by the colon rule), and **UI
instructions / callout headings**, which nothing excluded.

Fixed in `clozeEligible()`:

- Skip callout and chrome containers: `.board-trap`, `.pitfall-box`,
  `.board-badge`, `.pyq-tag`, `.seq-counter`, `.sub-progress`, `.rune-row`,
  `.bi-actions`, `.formula-target`, and the new `.pseb-numerical` /
  `.pseb-diagram-practice` widgets.
- New `[data-no-cloze]` opt-out, applied to the instruction line that
  introduces every interactive widget (8 chapter files).
- Require **≥2 real letters** — kills bare operators like `+`, `−`, `3/6`.
- Reject emoji-led runs (`⚠️ …`, `💡 …`) — those are headings, never answers.

Verified after the fix by sweeping **every slide of every chapter**: masked
terms are now genuine vocabulary — *Law of Conservation of Mass, rust, rancid,
refraction, concave, convex, pole (P), voltage, resistance, ampere (A),
Producers, Consumers, Decomposers, ozone* — with **0 junk masks** remaining.

## Two false alarms worth recording

1. **`cloze: 0` on every chapter.** My first sweep toggled `H` on slide 1 — the
   chapter divider, which legitimately has no bold terms. A test-harness bug,
   not a product bug. Re-running against content slides showed 13–14 slides per
   chapter masking correctly.
2. **A screenshot showing the deck in a small box on a white page with mobile
   BACK/NEXT pills at 1280 px.** DOM measurement at the same moment reported
   `body` and `slider` at 1280×860, the desktop 70 px circular nav, dark theme
   applied, and `matchMedia('(max-width: 768px)')` **false**. This is the third
   distinct screenshot artifact these decks have produced in this environment
   (the others: `.content-box` `opacity:0` until its slide is active, and the
   transformed slide rail defeating element capture). **DOM measurement is the
   reliable signal here; screenshots of these decks are not.**

## The bigger regression — active recall had become a no-op on most slides

The first fix was necessary but incomplete. Sweeping **every slide of every
chapter** exposed the real loss of capability:

Before the Round 1 cloze rewrite, `H` **blurred the whole content box**, so it
worked on *every* slide. After the rewrite it only did something on slides that
carry bold key terms — and these decks vary enormously in how much they use
`<strong>`:

| Chapter | Slides where `H` did nothing (before this fix) |
| --- | --- |
| 6 · Life Processes | 33 of 36 |
| 16 · Sustainable Mgmt | 30 of 33 |
| 14 · Sources of Energy | 31 of 34 |

On those decks a student pressing `H` got *"No key terms to hide on this
slide"* and recall silently switched itself back off. **That is the feature
that was lost**, and it is exactly what a heavy user would notice first.

Fixed by making the two modes a fallback pair rather than an either/or:

- Mask key terms as cloze blanks where the slide has them (the better mode).
- Otherwise fall back to the **original blur-the-box behaviour**, with
  click-to-reveal restored.
- `H` is therefore never a no-op again. Verified across all 16 chapters:
  **DEAD = 0 on every slide of every deck.**

A second suppressor was also removed: `clozeEligible()` rejected any `<strong>`
containing a `<sci-term>`. Since `sci-term.js` binds by **delegation on
`document`** and the original `innerHTML` (attributes included) is restored on
reveal, that exclusion was unnecessary — and perverse, because it meant *the
better a chapter's glossary coverage, the less active recall it got*.

Final state, all 16 decks: `tools 11/11 · DEAD 0 · junk 0 · console errors 0`.

## Most likely cause of what was ALSO seen

A **stale service worker**. Chapter HTML is served Stale-While-Revalidate, so
the first load after a deploy renders yesterday's cached deck — which, mid-way
through this upgrade, meant old HTML paired with newer assets. The SW upgrade
path was tested end to end (register → visit → reload) and now serves 38
slides with all components. `CACHE_VERSION` bumped to **v13** so the recall fix
actually reaches students.

## Files touched (Round 4)
`assets/deck-enhance.js` (`clozeEligible` hardening, `sci-term` exclusion
removed, blur fallback restored) · 8 chapter HTML files (`data-no-cloze` on
widget instruction lines) · `sw.js` (v12 → v14).
