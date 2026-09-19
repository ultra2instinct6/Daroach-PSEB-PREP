/* PSEB Class 10 Science — BOLO.FLASH enrichment layer.

   Adds the structured, high-yield fields that the raw glossary and the
   in-deck Say-It-Back cards do not carry:

     roots  — morpheme dictionary used to build the ESL root breakdown
              ("Exo (out / ਬਾਹਰ) + Thermic (heat / ਤਾਪ)") on the fly.
     split  — explicit morpheme splits for terms the auto-splitter cannot infer.
     terms  — per-term enrichment, keyed by the lower-cased English term so it
              lines up with assets/glossary.js:
                ctx     [en, pa]  one-line everyday analogy
                def     [en, pa]  PSEB-aligned scientific definition
                formula string    plain-text equation (see the formula notes)
                board   [en, pa]  board example / sensory observation,
                                  **bold** marks the examiner-facing keyword
                vvip    boolean   recurring board high-yield term

   Formula notation (rendered by flashcards.html, no LaTeX engine needed):
     ->   becomes a reaction arrow       H2 + Cl2 -> 2HCl
     digits after a letter or ")" become subscripts     H2O -> H2O
     ^... becomes a superscript                         H^+ -> H+
     leading coefficients stay full size                6CO2

   Loaded with a classic <script> tag (no modules) so it keeps working over
   the file:// scheme, matching assets/chapters.js and assets/glossary.js. */
(function () {
  "use strict";

  /* ---- Morphemes: [English gloss, Gurmukhi gloss] ---------------------- */
  var ROOTS = {
    "exo": ["out", "ਬਾਹਰ"],
    "endo": ["inside", "ਅੰਦਰ"],
    "intra": ["within", "ਅੰਦਰ"],
    "inter": ["between", "ਵਿਚਕਾਰ"],
    "trans": ["across", "ਪਾਰ"],
    "peri": ["around", "ਆਲੇ-ਦੁਆਲੇ"],
    "sub": ["under", "ਹੇਠਾਂ"],
    "hyper": ["too much", "ਬਹੁਤ ਜ਼ਿਆਦਾ"],
    "hypo": ["too little", "ਬਹੁਤ ਘੱਟ"],
    "re": ["again / back", "ਮੁੜ"],
    "de": ["removal of", "ਹਟਾਉਣਾ"],
    "non": ["not", "ਨਹੀਂ"],
    "un": ["not", "ਨਹੀਂ"],
    "an": ["without", "ਬਿਨਾਂ"],
    "anti": ["against", "ਵਿਰੁੱਧ"],
    "con": ["together", "ਇਕੱਠੇ"],
    "syn": ["together", "ਇਕੱਠੇ"],
    "mono": ["one", "ਇੱਕ"],
    "bi": ["two", "ਦੋ"],
    "di": ["two", "ਦੋ"],
    "tri": ["three", "ਤਿੰਨ"],
    "tetra": ["four", "ਚਾਰ"],
    "multi": ["many", "ਬਹੁਤ"],
    "poly": ["many", "ਬਹੁਤ"],
    "iso": ["equal / same", "ਬਰਾਬਰ"],
    "homo": ["same", "ਇੱਕੋ ਜਿਹਾ"],
    "hetero": ["different", "ਵੱਖਰਾ"],
    "allo": ["other form", "ਦੂਜਾ ਰੂਪ"],
    "thermic": ["heat", "ਤਾਪ"],
    "thermal": ["heat", "ਤਾਪ"],
    "therm": ["heat", "ਤਾਪ"],
    "photo": ["light", "ਪ੍ਰਕਾਸ਼"],
    "hydro": ["water", "ਪਾਣੀ"],
    "aqua": ["water", "ਪਾਣੀ"],
    "geo": ["earth", "ਧਰਤੀ"],
    "bio": ["life", "ਜੀਵਨ"],
    "chloro": ["green", "ਹਰਾ"],
    "chromo": ["colour", "ਰੰਗ"],
    "aero": ["air / oxygen", "ਹਵਾ / ਆਕਸੀਜਨ"],
    "electro": ["electricity", "ਬਿਜਲੀ"],
    "nucleo": ["nucleus", "ਨਿਊਕਲੀਅਸ"],
    "oxy": ["oxygen", "ਆਕਸੀਜਨ"],
    "neuro": ["nerve", "ਤੰਤੂ"],
    "nephro": ["kidney", "ਗੁਰਦਾ"],
    "auto": ["self", "ਆਪਣੇ ਆਪ"],
    "zygo": ["joined", "ਜੁੜਿਆ"],
    "gamo": ["union", "ਮਿਲਾਪ"],
    "synthesis": ["building up", "ਬਣਾਉਣਾ"],
    "lysis": ["splitting", "ਤੋੜਨਾ"],
    "genesis": ["origin", "ਉਤਪਤੀ"],
    "gen": ["producing", "ਪੈਦਾ ਕਰਨ ਵਾਲਾ"],
    "phyll": ["leaf", "ਪੱਤਾ"],
    "tropism": ["growth response", "ਵਧਣ ਦੀ ਦਿਸ਼ਾ"],
    "trophic": ["feeding", "ਪੋਸ਼ਣ"],
    "meter": ["measure", "ਮਾਪ"],
    "opia": ["eye condition", "ਅੱਖ ਦੀ ਹਾਲਤ"],
    "some": ["body", "ਪਿੰਡ"],
    "valency": ["combining power", "ਸੰਯੋਜਕਤਾ"],
    "ation": ["the process of", "ਪ੍ਰਕਿਰਿਆ"],
    "able": ["able to be", "ਯੋਗ"],
    "ity": ["the quality of", "ਗੁਣ"]
  };

  /* Explicit splits for terms the auto-splitter cannot infer. */
  var SPLIT = {
    "exothermic": ["exo", "thermic"],
    "endothermic": ["endo", "thermic"],
    "photosynthesis": ["photo", "synthesis"],
    "chlorophyll": ["chloro", "phyll"],
    "autotrophic nutrition": ["auto", "trophic"],
    "heterotrophic nutrition": ["hetero", "trophic"],
    "aerobic respiration": ["aero", "bic"],
    "anaerobic respiration": ["an", "aero", "bic"],
    "transpiration": ["trans", "spiration"],
    "translocation": ["trans", "location"],
    "peristalsis": ["peri", "stalsis"],
    "phototropism": ["photo", "tropism"],
    "geotropism": ["geo", "tropism"],
    "biodegradable": ["bio", "degradable"],
    "non-biodegradable": ["non", "bio", "degradable"],
    "biomagnification": ["bio", "magnification"],
    "biomass": ["bio", "mass"],
    "biogas": ["bio", "gas"],
    "hydrocarbon": ["hydro", "carbon"],
    "hydrogenation": ["hydro", "gen", "ation"],
    "hydro power": ["hydro", "power"],
    "geothermal energy": ["geo", "thermal"],
    "electromagnet": ["electro", "magnet"],
    "electromagnetic induction": ["electro", "magnetic"],
    "monohybrid cross": ["mono", "hybrid"],
    "dihybrid cross": ["di", "hybrid"],
    "binary fission": ["bi", "nary"],
    "multiple fission": ["multi", "ple"],
    "tetravalency": ["tetra", "valency"],
    "isomer": ["iso", "mer"],
    "homologous series": ["homo", "logous"],
    "homologous organs": ["homo", "logous"],
    "analogous organs": ["ana", "logous"],
    "allotrope": ["allo", "trope"],
    "amphoteric oxide": ["ampho", "teric"],
    "myopia": ["myo-(near)", "opia"],
    "hypermetropia": ["hyper", "metr", "opia"],
    "presbyopia": ["presby", "opia"],
    "nephron": ["nephro", "on"],
    "neuron": ["neuro", "on"],
    "haemoglobin": ["haemo", "globin"],
    "chromosome": ["chromo", "some"],
    "zygote": ["zygo", "te"],
    "gamete": ["gamo", "te"],
    "dialysis": ["dia", "lysis"],
    "nuclear fission": ["nucleo", "fission"],
    "nuclear fusion": ["nucleo", "fusion"],
    "chlorofluorocarbon": ["chloro", "fluoro", "carbon"],
    "decomposition reaction": ["de", "composition"],
    "decomposer": ["de", "composer"],
    "regeneration": ["re", "generation"],
    "reproduction": ["re", "production"],
    "reflection": ["re", "flection"],
    "refraction": ["re", "fraction"],
    "saponification": ["sapon", "ification"],
    "esterification": ["ester", "ification"],
    "galvanisation": ["galvani", "ation"],
    "calcination": ["calci", "ation"],
    "neutralisation": ["neutral", "ation"],
    "speciation": ["species", "ation"],
    "pollination": ["pollin", "ation"],
    "fertilisation": ["fertil", "ation"],
    "sustainable development": ["sustain", "able"],
    "malleability": ["malle", "ability"],
    "ductility": ["duct", "ility"],
    "electronegativity": ["electro", "negativity"],
    "metalloid": ["metal", "oid"]
  };

  /* Glosses used only inside SPLIT, so a breakdown never shows a bare
     morpheme with no meaning beside it. */
  var EXTRA = {
    "bic": ["living", "ਜੀਵਨ"],
    "spiration": ["breathing out", "ਸਾਹ ਛੱਡਣਾ"],
    "location": ["place", "ਥਾਂ"],
    "stalsis": ["contraction", "ਸੁੰਗੜਨ"],
    "degradable": ["able to break down", "ਟੁੱਟਣਯੋਗ"],
    "magnification": ["enlarging", "ਵਾਧਾ"],
    "mass": ["bulk", "ਪੁੰਜ"],
    "gas": ["gas", "ਗੈਸ"],
    "carbon": ["carbon", "ਕਾਰਬਨ"],
    "power": ["power", "ਸ਼ਕਤੀ"],
    "magnet": ["magnet", "ਚੁੰਬਕ"],
    "magnetic": ["magnetic", "ਚੁੰਬਕੀ"],
    "hybrid": ["cross-bred", "ਸੰਕਰ"],
    "nary": ["part", "ਹਿੱਸਾ"],
    "ple": ["fold", "ਗੁਣਾ"],
    "mer": ["part", "ਹਿੱਸਾ"],
    "logous": ["relation", "ਸੰਬੰਧ"],
    "ana": ["similar in use", "ਵਰਤੋਂ ਵਿੱਚ ਸਮਾਨ"],
    "trope": ["form", "ਰੂਪ"],
    "ampho": ["both", "ਦੋਵੇਂ"],
    "teric": ["natured", "ਸੁਭਾਅ ਵਾਲਾ"],
    "myo-(near)": ["near", "ਨੇੜੇ"],
    "metr": ["measure", "ਮਾਪ"],
    "presby": ["old age", "ਬੁਢਾਪਾ"],
    "on": ["unit", "ਇਕਾਈ"],
    "haemo": ["blood", "ਖ਼ੂਨ"],
    "globin": ["protein", "ਪ੍ਰੋਟੀਨ"],
    "te": ["cell", "ਕੋਸ਼ਿਕਾ"],
    "dia": ["through", "ਰਾਹੀਂ"],
    "fission": ["splitting", "ਵਿਖੰਡਨ"],
    "fusion": ["joining", "ਸੰਯੋਜਨ"],
    "fluoro": ["fluorine", "ਫਲੋਰੀਨ"],
    "composition": ["putting together", "ਜੋੜ"],
    "composer": ["one who puts together", "ਜੋੜਨ ਵਾਲਾ"],
    "generation": ["creation", "ਪੈਦਾਇਸ਼"],
    "production": ["making", "ਬਣਾਉਣਾ"],
    "flection": ["bending back", "ਮੁੜਨਾ"],
    "fraction": ["breaking", "ਟੁੱਟਣਾ"],
    "sapon": ["soap", "ਸਾਬਣ"],
    "ification": ["making of", "ਬਣਾਉਣ ਦੀ ਕਿਰਿਆ"],
    "ester": ["ester (sweet-smelling)", "ਐਸਟਰ"],
    "galvani": ["zinc coating", "ਜਸਤੇ ਦੀ ਪਰਤ"],
    "calci": ["lime / strong heat", "ਚੂਨਾ / ਤੇਜ਼ ਤਾਪ"],
    "neutral": ["neither acid nor base", "ਨਾ ਤੇਜ਼ਾਬ ਨਾ ਖਾਰ"],
    "species": ["kind of organism", "ਜਾਤੀ"],
    "pollin": ["pollen", "ਪਰਾਗ"],
    "fertil": ["fruitful", "ਉਪਜਾਊ"],
    "sustain": ["to keep going", "ਟਿਕਾਈ ਰੱਖਣਾ"],
    "malle": ["hammer", "ਹਥੌੜਾ"],
    "ability": ["the ability to", "ਯੋਗਤਾ"],
    "duct": ["to draw out", "ਖਿੱਚਣਾ"],
    "ility": ["the quality of", "ਗੁਣ"],
    "negativity": ["pulling power", "ਖਿੱਚ ਸ਼ਕਤੀ"],
    "metal": ["metal", "ਧਾਤ"],
    "oid": ["like", "ਵਰਗਾ"]
  };
  for (var k in EXTRA) { if (!ROOTS[k]) ROOTS[k] = EXTRA[k]; }

  window.PSEB_FLASH_DATA = { roots: ROOTS, split: SPLIT, terms: {} };
  var T = window.PSEB_FLASH_DATA.terms;

  /* ================= Ch 1 · Chemical Reactions and Equations ============= */
  T["exothermic"] = {
    ctx: ["Striking a matchstick — the heat rushes OUT onto your fingers.",
          "ਮਾਚਿਸ ਬਾਲਣਾ — ਤਾਪ ਬਾਹਰ ਨਿਕਲ ਕੇ ਉਂਗਲਾਂ ਤੱਕ ਪਹੁੰਚਦਾ ਹੈ।"],
    def: ["A reaction that releases heat energy to the surroundings.",
          "ਉਹ ਕਿਰਿਆ ਜੋ ਆਲੇ-ਦੁਆਲੇ ਨੂੰ ਤਾਪ ਊਰਜਾ ਦਿੰਦੀ ਹੈ।"],
    formula: "CaO + H2O -> Ca(OH)2 + heat",
    board: ["Quicklime added to water: the beaker turns **hot to touch** and steam rises.",
            "ਬਿਨਾਂ ਬੁਝਿਆ ਚੂਨਾ ਪਾਣੀ ਵਿੱਚ: ਬੀਕਰ **ਛੂਹਣ 'ਤੇ ਗਰਮ** ਹੋ ਜਾਂਦਾ ਹੈ ਤੇ ਭਾਫ਼ ਨਿਕਲਦੀ ਹੈ।"],
    vvip: true
  };
  T["endothermic"] = {
    ctx: ["An ice pack on a bruise — it pulls heat IN and your skin feels cold.",
          "ਸੱਟ 'ਤੇ ਬਰਫ਼ ਦੀ ਪੋਟਲੀ — ਇਹ ਤਾਪ ਅੰਦਰ ਖਿੱਚਦੀ ਹੈ ਤੇ ਚਮੜੀ ਠੰਢੀ ਲੱਗਦੀ ਹੈ।"],
    def: ["A reaction that absorbs heat energy from the surroundings.",
          "ਉਹ ਕਿਰਿਆ ਜੋ ਆਲੇ-ਦੁਆਲੇ ਤੋਂ ਤਾਪ ਊਰਜਾ ਸੋਖਦੀ ਹੈ।"],
    formula: "6CO2 + 6H2O -> C6H12O6 + 6O2",
    board: ["Photosynthesis and the thermal decomposition of CaCO3 both need **continuous heating**.",
            "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਅਤੇ CaCO3 ਦਾ ਤਾਪ ਅਪਘਟਨ ਦੋਵਾਂ ਨੂੰ **ਲਗਾਤਾਰ ਤਾਪ** ਚਾਹੀਦਾ ਹੈ।"],
    vvip: true
  };
  T["oxidation"] = {
    ctx: ["A cut apple browning on the plate — oxygen is being added to it.",
          "ਕੱਟਿਆ ਸੇਬ ਪਲੇਟ ਵਿੱਚ ਭੂਰਾ ਹੋਣਾ — ਉਸ ਵਿੱਚ ਆਕਸੀਜਨ ਜੁੜ ਰਹੀ ਹੈ।"],
    def: ["Gain of oxygen, or loss of hydrogen, by a substance.",
          "ਕਿਸੇ ਪਦਾਰਥ ਦੁਆਰਾ ਆਕਸੀਜਨ ਦਾ ਵਾਧਾ ਜਾਂ ਹਾਈਡ੍ਰੋਜਨ ਦਾ ਘਟਣਾ।"],
    formula: "2Cu + O2 -> 2CuO",
    board: ["Heated copper turns from brown to a **black coating** of copper(II) oxide.",
            "ਗਰਮ ਕੀਤਾ ਤਾਂਬਾ ਭੂਰੇ ਤੋਂ **ਕਾਲੀ ਪਰਤ** (ਕਾਪਰ ਆਕਸਾਈਡ) ਵਿੱਚ ਬਦਲ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["reduction"] = {
    ctx: ["Oxygen being taken away — the exact opposite partner of oxidation.",
          "ਆਕਸੀਜਨ ਦਾ ਹਟਣਾ — ਆਕਸੀਕਰਨ ਦਾ ਬਿਲਕੁਲ ਉਲਟ ਸਾਥੀ।"],
    def: ["Loss of oxygen, or gain of hydrogen, by a substance.",
          "ਕਿਸੇ ਪਦਾਰਥ ਦੁਆਰਾ ਆਕਸੀਜਨ ਦਾ ਘਟਣਾ ਜਾਂ ਹਾਈਡ੍ਰੋਜਨ ਦਾ ਵਾਧਾ।"],
    formula: "CuO + H2 -> Cu + H2O",
    board: ["Black CuO turns back to **reddish-brown copper** when hydrogen passes over it.",
            "ਹਾਈਡ੍ਰੋਜਨ ਲੰਘਾਉਣ 'ਤੇ ਕਾਲਾ CuO ਮੁੜ **ਲਾਲ-ਭੂਰਾ ਤਾਂਬਾ** ਬਣ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["redox reaction"] = {
    ctx: ["A give-and-take deal: whatever one substance loses, the other gains.",
          "ਲੈਣ-ਦੇਣ ਦਾ ਸੌਦਾ: ਜੋ ਇੱਕ ਪਦਾਰਥ ਗੁਆਉਂਦਾ ਹੈ, ਦੂਜਾ ਹਾਸਲ ਕਰਦਾ ਹੈ।"],
    def: ["A reaction in which oxidation and reduction happen at the same time.",
          "ਉਹ ਕਿਰਿਆ ਜਿਸ ਵਿੱਚ ਆਕਸੀਕਰਨ ਅਤੇ ਲਘੂਕਰਨ ਇੱਕੋ ਸਮੇਂ ਹੁੰਦੇ ਹਨ।"],
    formula: "ZnO + C -> Zn + CO",
    board: ["Name the **oxidising agent and reducing agent** separately — a standard 2-mark question.",
            "**ਆਕਸੀਕਾਰਕ ਅਤੇ ਲਘੂਕਾਰਕ** ਵੱਖ-ਵੱਖ ਦੱਸੋ — ਇਹ ਆਮ 2-ਅੰਕ ਵਾਲਾ ਪ੍ਰਸ਼ਨ ਹੈ।"],
    vvip: true
  };
  T["corrosion"] = {
    ctx: ["The orange flakes on an old cycle chain left out in the monsoon.",
          "ਬਰਸਾਤ ਵਿੱਚ ਪਏ ਪੁਰਾਣੇ ਸਾਈਕਲ ਦੀ ਚੇਨ 'ਤੇ ਸੰਤਰੀ ਪੇਪੜੀਆਂ।"],
    def: ["The slow eating away of a metal by air, moisture or chemicals.",
          "ਹਵਾ, ਨਮੀ ਜਾਂ ਰਸਾਇਣਾਂ ਦੁਆਰਾ ਧਾਤ ਦਾ ਹੌਲੀ-ਹੌਲੀ ਖੁਰਨਾ।"],
    formula: "4Fe + 3O2 + xH2O -> 2Fe2O3.xH2O",
    board: ["Iron needs **both air and water** to rust — the classic three-test-tube experiment.",
            "ਲੋਹੇ ਨੂੰ ਜੰਗ ਲੱਗਣ ਲਈ **ਹਵਾ ਅਤੇ ਪਾਣੀ ਦੋਵੇਂ** ਚਾਹੀਦੇ ਹਨ — ਤਿੰਨ ਟੈਸਟ-ਟਿਊਬ ਵਾਲਾ ਪ੍ਰਯੋਗ।"],
    vvip: true
  };
  T["rancidity"] = {
    ctx: ["Old pakoras smelling and tasting off after sitting in the kitchen.",
          "ਰਸੋਈ ਵਿੱਚ ਪਏ ਪੁਰਾਣੇ ਪਕੌੜਿਆਂ ਦੀ ਬਦਬੂ ਤੇ ਖ਼ਰਾਬ ਸੁਆਦ।"],
    def: ["Oxidation of fats and oils, giving a bad smell and taste.",
          "ਚਰਬੀ ਅਤੇ ਤੇਲਾਂ ਦਾ ਆਕਸੀਕਰਨ, ਜਿਸ ਨਾਲ ਬਦਬੂ ਅਤੇ ਖ਼ਰਾਬ ਸੁਆਦ ਆਉਂਦਾ ਹੈ।"],
    board: ["Chip packets are flushed with **nitrogen** to keep oxygen away from the oil.",
            "ਚਿਪਸ ਦੇ ਪੈਕਟਾਂ ਵਿੱਚ **ਨਾਈਟ੍ਰੋਜਨ** ਭਰੀ ਜਾਂਦੀ ਹੈ ਤਾਂ ਜੋ ਤੇਲ ਤੱਕ ਆਕਸੀਜਨ ਨਾ ਪਹੁੰਚੇ।"],
    vvip: true
  };
  T["decomposition reaction"] = {
    ctx: ["One thing breaking into many — like a long train splitting into coaches.",
          "ਇੱਕ ਚੀਜ਼ ਦਾ ਕਈਆਂ ਵਿੱਚ ਟੁੱਟਣਾ — ਜਿਵੇਂ ਲੰਮੀ ਰੇਲ ਦੇ ਡੱਬੇ ਵੱਖ ਹੋਣਾ।"],
    def: ["A single compound splits into two or more simpler substances.",
          "ਇੱਕ ਯੋਗਿਕ ਟੁੱਟ ਕੇ ਦੋ ਜਾਂ ਵੱਧ ਸਰਲ ਪਦਾਰਥ ਬਣਾਉਂਦਾ ਹੈ।"],
    formula: "2FeSO4 -> Fe2O3 + SO2 + SO3",
    board: ["Heated ferrous sulphate: **green crystals turn reddish-brown** with a burning-sulphur smell.",
            "ਗਰਮ ਕੀਤਾ ਫੈਰਸ ਸਲਫ਼ੇਟ: **ਹਰੇ ਕ੍ਰਿਸਟਲ ਲਾਲ-ਭੂਰੇ** ਹੋ ਜਾਂਦੇ ਹਨ ਤੇ ਗੰਧਕ ਦੀ ਬਦਬੂ ਆਉਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["displacement reaction"] = {
    ctx: ["A stronger player pushing a weaker one off the seat.",
          "ਤਾਕਤਵਰ ਖਿਡਾਰੀ ਦਾ ਕਮਜ਼ੋਰ ਨੂੰ ਸੀਟ ਤੋਂ ਹਟਾ ਦੇਣਾ।"],
    def: ["A more reactive metal displaces a less reactive metal from its salt solution.",
          "ਵੱਧ ਕਿਰਿਆਸ਼ੀਲ ਧਾਤ ਘੱਟ ਕਿਰਿਆਸ਼ੀਲ ਧਾਤ ਨੂੰ ਉਸ ਦੇ ਲੂਣ ਦੇ ਘੋਲ ਵਿੱਚੋਂ ਵਿਸਥਾਪਿਤ ਕਰਦੀ ਹੈ।"],
    formula: "Fe + CuSO4 -> FeSO4 + Cu",
    board: ["An iron nail in blue CuSO4: the solution fades to **green** and the nail gets a **brown coat**.",
            "ਨੀਲੇ CuSO4 ਵਿੱਚ ਲੋਹੇ ਦੀ ਕਿੱਲ: ਘੋਲ **ਹਰਾ** ਹੋ ਜਾਂਦਾ ਹੈ ਤੇ ਕਿੱਲ 'ਤੇ **ਭੂਰੀ ਪਰਤ** ਚੜ੍ਹ ਜਾਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["double displacement"] = {
    ctx: ["Two couples swapping partners on the dance floor.",
          "ਨਾਚ ਵਿੱਚ ਦੋ ਜੋੜਿਆਂ ਦਾ ਆਪਸ ਵਿੱਚ ਸਾਥੀ ਬਦਲ ਲੈਣਾ।"],
    def: ["Two compounds exchange their ions to form two new compounds.",
          "ਦੋ ਯੋਗਿਕ ਆਪਣੇ ਆਇਨ ਬਦਲ ਕੇ ਦੋ ਨਵੇਂ ਯੋਗਿਕ ਬਣਾਉਂਦੇ ਹਨ।"],
    formula: "Na2SO4 + BaCl2 -> BaSO4 + 2NaCl",
    board: ["A **white precipitate** of barium sulphate appears at once.",
            "ਬੇਰੀਅਮ ਸਲਫ਼ੇਟ ਦਾ **ਚਿੱਟਾ ਅਵਖੇਪ** ਤੁਰੰਤ ਬਣ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["precipitate"] = {
    ctx: ["The solid that suddenly clouds a clear glass of water.",
          "ਉਹ ਠੋਸ ਜੋ ਸਾਫ਼ ਪਾਣੀ ਨੂੰ ਅਚਾਨਕ ਧੁੰਦਲਾ ਕਰ ਦਿੰਦਾ ਹੈ।"],
    def: ["An insoluble solid formed when two solutions are mixed.",
          "ਦੋ ਘੋਲ ਮਿਲਾਉਣ 'ਤੇ ਬਣਿਆ ਨਾ-ਘੁਲਣਸ਼ੀਲ ਠੋਸ।"],
    board: ["Always write the precipitate with a **downward arrow** in the equation.",
            "ਸਮੀਕਰਣ ਵਿੱਚ ਅਵਖੇਪ ਨਾਲ ਹਮੇਸ਼ਾ **ਹੇਠਾਂ ਵੱਲ ਤੀਰ** ਲਿਖੋ।"]
  };
  T["combination reaction"] = {
    ctx: ["Two ingredients joining to make one dish.",
          "ਦੋ ਸਮੱਗਰੀਆਂ ਦਾ ਜੁੜ ਕੇ ਇੱਕ ਪਕਵਾਨ ਬਣਨਾ।"],
    def: ["Two or more substances combine to form a single product.",
          "ਦੋ ਜਾਂ ਵੱਧ ਪਦਾਰਥ ਮਿਲ ਕੇ ਇੱਕ ਉਤਪਾਦ ਬਣਾਉਂਦੇ ਹਨ।"],
    formula: "CaO + H2O -> Ca(OH)2",
    board: ["Slaked lime solution turns lime water **milky** with CO2.",
            "ਚੂਨੇ ਦਾ ਪਾਣੀ CO2 ਨਾਲ **ਦੁੱਧੀਆ** ਹੋ ਜਾਂਦਾ ਹੈ।"]
  };
  T["conservation of mass"] = {
    ctx: ["Nothing vanishes in a kitchen — the weight before cooking equals the weight after.",
          "ਰਸੋਈ ਵਿੱਚ ਕੁਝ ਵੀ ਗਾਇਬ ਨਹੀਂ ਹੁੰਦਾ — ਪਕਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਤੇ ਬਾਅਦ ਦਾ ਭਾਰ ਬਰਾਬਰ।"],
    def: ["Mass can neither be created nor destroyed in a chemical reaction.",
          "ਰਸਾਇਣਕ ਕਿਰਿਆ ਵਿੱਚ ਪੁੰਜ ਨਾ ਬਣਦਾ ਹੈ ਨਾ ਨਸ਼ਟ ਹੁੰਦਾ ਹੈ।"],
    board: ["This is exactly **why every equation must be balanced**.",
            "ਇਸੇ ਕਰਕੇ **ਹਰ ਸਮੀਕਰਣ ਸੰਤੁਲਿਤ ਕਰਨਾ ਜ਼ਰੂਰੀ** ਹੈ।"],
    vvip: true
  };

  /* ================= Ch 2 · Acids, Bases and Salts ======================= */
  T["acid"] = {
    ctx: ["The sharp sour bite of lemon juice or imli on your tongue.",
          "ਨਿੰਬੂ ਜਾਂ ਇਮਲੀ ਦਾ ਜੀਭ 'ਤੇ ਤਿੱਖਾ ਖੱਟਾ ਸੁਆਦ।"],
    def: ["A substance that gives H+ ions in water and turns blue litmus red.",
          "ਉਹ ਪਦਾਰਥ ਜੋ ਪਾਣੀ ਵਿੱਚ H+ ਆਇਨ ਦਿੰਦਾ ਹੈ ਅਤੇ ਨੀਲੇ ਲਿਟਮਸ ਨੂੰ ਲਾਲ ਕਰਦਾ ਹੈ।"],
    formula: "HCl -> H^+ + Cl^-",
    board: ["Acid + metal always gives a **pop sound** with a burning splint (H2 gas).",
            "ਤੇਜ਼ਾਬ + ਧਾਤ ਹਮੇਸ਼ਾ ਬਲਦੀ ਤੀਲੀ ਨਾਲ **ਪੌਪ ਆਵਾਜ਼** ਦਿੰਦੇ ਹਨ (H2 ਗੈਸ)।"],
    vvip: true
  };
  T["base"] = {
    ctx: ["The slippery, soapy feel of washing soda on wet fingers.",
          "ਗਿੱਲੀਆਂ ਉਂਗਲਾਂ 'ਤੇ ਧੋਣ ਵਾਲੇ ਸੋਡੇ ਦਾ ਤਿਲਕਣਾ, ਸਾਬਣ ਵਰਗਾ ਅਹਿਸਾਸ।"],
    def: ["A substance that gives OH- ions in water and turns red litmus blue.",
          "ਉਹ ਪਦਾਰਥ ਜੋ ਪਾਣੀ ਵਿੱਚ OH- ਆਇਨ ਦਿੰਦਾ ਹੈ ਅਤੇ ਲਾਲ ਲਿਟਮਸ ਨੂੰ ਨੀਲਾ ਕਰਦਾ ਹੈ।"],
    formula: "NaOH -> Na^+ + OH^-",
    board: ["**All alkalis are bases, but not all bases are alkalis** — bases that dissolve are alkalis.",
            "**ਸਾਰੇ ਖਾਰੀ ਖਾਰ ਹਨ, ਪਰ ਸਾਰੇ ਖਾਰ ਖਾਰੀ ਨਹੀਂ** — ਘੁਲਣਸ਼ੀਲ ਖਾਰ ਹੀ ਖਾਰੀ ਹਨ।"],
    vvip: true
  };
  T["ph scale"] = {
    ctx: ["A 0–14 ruler that measures how sour or how soapy something is.",
          "0–14 ਦਾ ਪੈਮਾਨਾ ਜੋ ਦੱਸਦਾ ਹੈ ਕਿ ਕੋਈ ਚੀਜ਼ ਕਿੰਨੀ ਖੱਟੀ ਜਾਂ ਕਿੰਨੀ ਖਾਰੀ ਹੈ।"],
    def: ["A scale from 0 to 14 measuring the H+ ion concentration of a solution.",
          "0 ਤੋਂ 14 ਤੱਕ ਦਾ ਪੈਮਾਨਾ ਜੋ ਘੋਲ ਵਿੱਚ H+ ਆਇਨ ਦੀ ਮਾਤਰਾ ਮਾਪਦਾ ਹੈ।"],
    board: ["Tooth decay starts below **pH 5.5**; the best soil pH is **6.5–7.0**.",
            "ਦੰਦਾਂ ਦਾ ਖੋਰਾ **pH 5.5** ਤੋਂ ਹੇਠਾਂ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ; ਵਧੀਆ ਮਿੱਟੀ pH **6.5–7.0**।"],
    vvip: true
  };
  T["neutralisation"] = {
    ctx: ["An antacid tablet calming the burning in your stomach.",
          "ਐਂਟਾਸਿਡ ਗੋਲੀ ਦਾ ਪੇਟ ਦੀ ਜਲਣ ਸ਼ਾਂਤ ਕਰਨਾ।"],
    def: ["An acid reacts with a base to give salt and water only.",
          "ਤੇਜ਼ਾਬ ਅਤੇ ਖਾਰ ਦੀ ਕਿਰਿਆ ਨਾਲ ਸਿਰਫ਼ ਲੂਣ ਅਤੇ ਪਾਣੀ ਬਣਦੇ ਹਨ।"],
    formula: "NaOH + HCl -> NaCl + H2O",
    board: ["Bee sting (methanoic acid) is treated with **baking soda**, a mild base.",
            "ਮਧੂ-ਮੱਖੀ ਦੇ ਡੰਗ (ਮੀਥੇਨੋਇਕ ਤੇਜ਼ਾਬ) 'ਤੇ **ਖਾਣ ਵਾਲਾ ਸੋਡਾ** ਲਾਇਆ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["baking soda"] = {
    ctx: ["The white powder that makes your pakoras and cakes puff up.",
          "ਉਹ ਚਿੱਟਾ ਪਾਊਡਰ ਜੋ ਪਕੌੜਿਆਂ ਤੇ ਕੇਕ ਨੂੰ ਫੁੱਲਾ ਦਿੰਦਾ ਹੈ।"],
    def: ["Sodium hydrogencarbonate, a mild non-corrosive base.",
          "ਸੋਡੀਅਮ ਹਾਈਡ੍ਰੋਜਨਕਾਰਬੋਨੇਟ, ਇੱਕ ਹਲਕਾ ਨਾ-ਖੋਰੂ ਖਾਰ।"],
    formula: "NaHCO3",
    board: ["On heating it releases **CO2**, which is what makes the dough rise.",
            "ਗਰਮ ਕਰਨ 'ਤੇ **CO2** ਨਿਕਲਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਆਟਾ ਫੁੱਲਦਾ ਹੈ।"],
    vvip: true
  };
  T["washing soda"] = {
    ctx: ["The crystals your family uses to soften hard water for laundry.",
          "ਉਹ ਕ੍ਰਿਸਟਲ ਜੋ ਕੱਪੜੇ ਧੋਣ ਲਈ ਸਖ਼ਤ ਪਾਣੀ ਨਰਮ ਕਰਦੇ ਹਨ।"],
    def: ["Sodium carbonate decahydrate, used to remove permanent hardness of water.",
          "ਸੋਡੀਅਮ ਕਾਰਬੋਨੇਟ ਡੈਕਾਹਾਈਡ੍ਰੇਟ, ਪਾਣੀ ਦੀ ਸਥਾਈ ਕਠੋਰਤਾ ਦੂਰ ਕਰਨ ਲਈ।"],
    formula: "Na2CO3.10H2O",
    board: ["The **10 water molecules** are its water of crystallisation — a favourite one-marker.",
            "**10 ਪਾਣੀ ਦੇ ਅਣੂ** ਇਸ ਦਾ ਕ੍ਰਿਸਟਲਨ ਜਲ ਹਨ — ਪਸੰਦੀਦਾ 1-ਅੰਕ ਪ੍ਰਸ਼ਨ।"],
    vvip: true
  };
  T["plaster of paris"] = {
    ctx: ["The white cast the doctor puts on a fractured arm.",
          "ਟੁੱਟੀ ਬਾਂਹ 'ਤੇ ਡਾਕਟਰ ਵੱਲੋਂ ਚੜ੍ਹਾਇਆ ਚਿੱਟਾ ਪਲਸਤਰ।"],
    def: ["Calcium sulphate hemihydrate, made by heating gypsum to 373 K.",
          "ਕੈਲਸ਼ੀਅਮ ਸਲਫ਼ੇਟ ਹੈਮੀਹਾਈਡ੍ਰੇਟ, ਜਿਪਸਮ ਨੂੰ 373 K 'ਤੇ ਗਰਮ ਕਰਕੇ ਬਣਦਾ ਹੈ।"],
    formula: "CaSO4.1/2H2O",
    board: ["Remember the odd **half (½) water molecule** and the temperature **373 K**.",
            "**ਅੱਧਾ (½) ਪਾਣੀ ਦਾ ਅਣੂ** ਅਤੇ ਤਾਪਮਾਨ **373 K** ਯਾਦ ਰੱਖੋ।"],
    vvip: true
  };
  T["bleaching powder"] = {
    ctx: ["The sharp chlorine smell near a freshly cleaned swimming pool.",
          "ਹੁਣੇ ਸਾਫ਼ ਕੀਤੇ ਤਰਨ-ਤਾਲ ਕੋਲ ਕਲੋਰੀਨ ਦੀ ਤਿੱਖੀ ਬਦਬੂ।"],
    def: ["Calcium oxychloride, made by passing chlorine over dry slaked lime.",
          "ਕੈਲਸ਼ੀਅਮ ਆਕਸੀਕਲੋਰਾਈਡ, ਸੁੱਕੇ ਬੁਝੇ ਚੂਨੇ ਉੱਤੇ ਕਲੋਰੀਨ ਲੰਘਾ ਕੇ ਬਣਦਾ ਹੈ।"],
    formula: "Ca(OH)2 + Cl2 -> CaOCl2 + H2O",
    board: ["Used to **disinfect drinking water** and to bleach cotton and paper.",
            "**ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਨੂੰ ਕੀਟਾਣੂ-ਰਹਿਤ** ਕਰਨ ਅਤੇ ਕੱਪੜਾ-ਕਾਗਜ਼ ਵਿਰੰਜਣ ਲਈ।"],
    vvip: true
  };
  T["water of crystallisation"] = {
    ctx: ["Water quietly locked inside a crystal, like moisture inside a raisin.",
          "ਕ੍ਰਿਸਟਲ ਅੰਦਰ ਬੰਦ ਪਾਣੀ, ਜਿਵੇਂ ਸੌਗੀ ਅੰਦਰ ਨਮੀ।"],
    def: ["A fixed number of water molecules present in one formula unit of a salt.",
          "ਲੂਣ ਦੀ ਇੱਕ ਸੂਤਰ ਇਕਾਈ ਵਿੱਚ ਮੌਜੂਦ ਪਾਣੀ ਦੇ ਅਣੂਆਂ ਦੀ ਨਿਸ਼ਚਿਤ ਗਿਣਤੀ।"],
    formula: "CuSO4.5H2O",
    board: ["Heating blue copper sulphate turns it **white**; adding water makes it blue again.",
            "ਨੀਲੇ ਕਾਪਰ ਸਲਫ਼ੇਟ ਨੂੰ ਗਰਮ ਕਰਨ 'ਤੇ **ਚਿੱਟਾ** ਹੋ ਜਾਂਦਾ ਹੈ; ਪਾਣੀ ਪਾਉਣ 'ਤੇ ਮੁੜ ਨੀਲਾ।"],
    vvip: true
  };
  T["chlor-alkali process"] = {
    ctx: ["Passing electricity through salty water to harvest three useful products.",
          "ਲੂਣ ਵਾਲੇ ਪਾਣੀ ਵਿੱਚੋਂ ਬਿਜਲੀ ਲੰਘਾ ਕੇ ਤਿੰਨ ਲਾਭਦਾਇਕ ਉਤਪਾਦ ਲੈਣਾ।"],
    def: ["Electrolysis of brine (NaCl solution) giving NaOH, Cl2 and H2.",
          "ਨਮਕੀਨ ਘੋਲ (NaCl) ਦਾ ਬਿਜਲੀ ਅਪਘਟਨ ਜਿਸ ਤੋਂ NaOH, Cl2 ਅਤੇ H2 ਮਿਲਦੇ ਹਨ।"],
    formula: "2NaCl + 2H2O -> 2NaOH + Cl2 + H2",
    board: ["**Chlorine at the anode, hydrogen at the cathode**, NaOH near the cathode.",
            "**ਕਲੋਰੀਨ ਐਨੋਡ 'ਤੇ, ਹਾਈਡ੍ਰੋਜਨ ਕੈਥੋਡ 'ਤੇ**, NaOH ਕੈਥੋਡ ਕੋਲ।"],
    vvip: true
  };
  T["indicator"] = {
    ctx: ["Litmus paper acting like a traffic light for acids and bases.",
          "ਲਿਟਮਸ ਪੇਪਰ ਦਾ ਤੇਜ਼ਾਬ ਤੇ ਖਾਰ ਲਈ ਟ੍ਰੈਫ਼ਿਕ ਲਾਈਟ ਵਾਂਗ ਕੰਮ ਕਰਨਾ।"],
    def: ["A substance that shows a different colour in acidic and basic solutions.",
          "ਉਹ ਪਦਾਰਥ ਜੋ ਤੇਜ਼ਾਬੀ ਤੇ ਖਾਰੀ ਘੋਲਾਂ ਵਿੱਚ ਵੱਖਰਾ ਰੰਗ ਦਿਖਾਉਂਦਾ ਹੈ।"],
    board: ["Phenolphthalein is **colourless in acid, pink in base**; methyl orange is **red in acid, yellow in base**.",
            "ਫਿਨੌਲਫਥੈਲੀਨ **ਤੇਜ਼ਾਬ ਵਿੱਚ ਰੰਗਹੀਣ, ਖਾਰ ਵਿੱਚ ਗੁਲਾਬੀ**; ਮਿਥਾਈਲ ਔਰੇਂਜ **ਤੇਜ਼ਾਬ ਵਿੱਚ ਲਾਲ, ਖਾਰ ਵਿੱਚ ਪੀਲਾ**।"],
    vvip: true
  };

  /* ================= Ch 3 · Metals and Non-metals ======================== */
  T["malleability"] = {
    ctx: ["Beating gold into a wafer-thin sheet for a sweet shop's silver varak.",
          "ਸੋਨੇ ਨੂੰ ਕੁੱਟ ਕੇ ਮਠਿਆਈ ਵਾਲੇ ਵਰਕ ਜਿੰਨੀ ਪਤਲੀ ਚਾਦਰ ਬਣਾਉਣਾ।"],
    def: ["The property of a metal that lets it be hammered into thin sheets.",
          "ਧਾਤ ਦਾ ਉਹ ਗੁਣ ਜਿਸ ਕਾਰਨ ਇਸ ਨੂੰ ਕੁੱਟ ਕੇ ਪਤਲੀਆਂ ਚਾਦਰਾਂ ਬਣਾਈਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।"],
    board: ["**Gold and silver are the most malleable** metals.",
            "**ਸੋਨਾ ਅਤੇ ਚਾਂਦੀ ਸਭ ਤੋਂ ਵੱਧ ਕੁਟੀਯੋਗ** ਧਾਤਾਂ ਹਨ।"],
    vvip: true
  };
  T["ductility"] = {
    ctx: ["Drawing copper out into the thin wire inside a charger cable.",
          "ਤਾਂਬੇ ਨੂੰ ਖਿੱਚ ਕੇ ਚਾਰਜਰ ਦੀ ਤਾਰ ਜਿੰਨਾ ਪਤਲਾ ਬਣਾਉਣਾ।"],
    def: ["The property of a metal that lets it be drawn into thin wires.",
          "ਧਾਤ ਦਾ ਉਹ ਗੁਣ ਜਿਸ ਕਾਰਨ ਇਸ ਨੂੰ ਖਿੱਚ ਕੇ ਪਤਲੀਆਂ ਤਾਰਾਂ ਬਣਾਈਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।"],
    board: ["**Gold is the most ductile** metal — 1 g can be drawn into 2 km of wire.",
            "**ਸੋਨਾ ਸਭ ਤੋਂ ਵੱਧ ਖਿੱਚੀਯੋਗ** ਹੈ — 1 g ਤੋਂ 2 km ਤਾਰ ਬਣ ਸਕਦੀ ਹੈ।"],
    vvip: true
  };
  T["alloy"] = {
    ctx: ["Stainless steel in your kitchen — iron mixed with other metals so it never rusts.",
          "ਰਸੋਈ ਦਾ ਸਟੇਨਲੈੱਸ ਸਟੀਲ — ਲੋਹੇ ਵਿੱਚ ਹੋਰ ਧਾਤਾਂ ਮਿਲਾਈਆਂ ਤਾਂ ਜੰਗ ਨਾ ਲੱਗੇ।"],
    def: ["A homogeneous mixture of a metal with another metal or non-metal.",
          "ਧਾਤ ਦਾ ਕਿਸੇ ਹੋਰ ਧਾਤ ਜਾਂ ਅਧਾਤ ਨਾਲ ਸਮਾਂਗ ਮਿਸ਼ਰਣ।"],
    board: ["Brass = **Cu + Zn**; Bronze = **Cu + Sn**; Solder = **Pb + Sn** (low melting point).",
            "ਪਿੱਤਲ = **Cu + Zn**; ਕਾਂਸੀ = **Cu + Sn**; ਸੋਲਡਰ = **Pb + Sn** (ਘੱਟ ਪਿਘਲਣ ਬਿੰਦੂ)।"],
    vvip: true
  };
  T["amphoteric oxide"] = {
    ctx: ["A student who gets along with both rival groups in class.",
          "ਉਹ ਵਿਦਿਆਰਥੀ ਜੋ ਜਮਾਤ ਦੇ ਦੋਵਾਂ ਵਿਰੋਧੀ ਗਰੁੱਪਾਂ ਨਾਲ ਨਿਭਾ ਲੈਂਦਾ ਹੈ।"],
    def: ["A metal oxide that reacts with both acids and bases to give salt and water.",
          "ਉਹ ਧਾਤ ਆਕਸਾਈਡ ਜੋ ਤੇਜ਼ਾਬ ਅਤੇ ਖਾਰ ਦੋਵਾਂ ਨਾਲ ਕਿਰਿਆ ਕਰਕੇ ਲੂਣ ਤੇ ਪਾਣੀ ਦਿੰਦਾ ਹੈ।"],
    formula: "Al2O3 + 6HCl -> 2AlCl3 + 3H2O",
    board: ["**Al2O3 and ZnO** are the two amphoteric oxides you must be able to name.",
            "**Al2O3 ਅਤੇ ZnO** ਉਹ ਦੋ ਉਭੈਧਰਮੀ ਆਕਸਾਈਡ ਹਨ ਜੋ ਯਾਦ ਰੱਖਣੇ ਜ਼ਰੂਰੀ ਹਨ।"],
    vvip: true
  };
  T["roasting"] = {
    ctx: ["Dry-roasting peanuts in a pan — strong heat, plenty of air.",
          "ਕੜਾਹੀ ਵਿੱਚ ਮੂੰਗਫਲੀ ਭੁੰਨਣਾ — ਤੇਜ਼ ਤਾਪ, ਖੁੱਲ੍ਹੀ ਹਵਾ।"],
    def: ["Heating a sulphide ore strongly in the presence of excess air.",
          "ਸਲਫ਼ਾਈਡ ਕੱਚੀ ਧਾਤ ਨੂੰ ਵਾਧੂ ਹਵਾ ਵਿੱਚ ਤੇਜ਼ ਗਰਮ ਕਰਨਾ।"],
    formula: "2ZnS + 3O2 -> 2ZnO + 2SO2",
    board: ["Roasting is for **sulphide** ores — remember the pungent **SO2** given off.",
            "ਭੁੰਨਣਾ **ਸਲਫ਼ਾਈਡ** ਧਾਤਾਂ ਲਈ ਹੈ — ਤਿੱਖੀ **SO2** ਨਿਕਲਦੀ ਹੈ।"],
    vvip: true
  };
  T["calcination"] = {
    ctx: ["Heating limestone in a closed kiln with almost no air.",
          "ਚੂਨੇ ਦੇ ਪੱਥਰ ਨੂੰ ਬੰਦ ਭੱਠੀ ਵਿੱਚ ਲਗਭਗ ਬਿਨਾਂ ਹਵਾ ਗਰਮ ਕਰਨਾ।"],
    def: ["Heating a carbonate ore strongly in limited air or absence of air.",
          "ਕਾਰਬੋਨੇਟ ਕੱਚੀ ਧਾਤ ਨੂੰ ਸੀਮਤ ਹਵਾ ਜਾਂ ਬਿਨਾਂ ਹਵਾ ਤੇਜ਼ ਗਰਮ ਕਰਨਾ।"],
    formula: "ZnCO3 -> ZnO + CO2",
    board: ["Calcination is for **carbonate** ores — the gas released is **CO2**.",
            "ਨਿਸਤਾਪਨ **ਕਾਰਬੋਨੇਟ** ਧਾਤਾਂ ਲਈ ਹੈ — ਨਿਕਲਣ ਵਾਲੀ ਗੈਸ **CO2** ਹੈ।"],
    vvip: true
  };
  T["galvanisation"] = {
    ctx: ["The dull grey coating on a new bucket or roofing sheet.",
          "ਨਵੀਂ ਬਾਲਟੀ ਜਾਂ ਛੱਤ ਵਾਲੀ ਚਾਦਰ 'ਤੇ ਫਿੱਕੀ ਸਲੇਟੀ ਪਰਤ।"],
    def: ["Coating iron or steel with a thin layer of zinc to prevent rusting.",
          "ਲੋਹੇ ਜਾਂ ਸਟੀਲ ਉੱਤੇ ਜਸਤੇ ਦੀ ਪਤਲੀ ਪਰਤ ਚੜ੍ਹਾ ਕੇ ਜੰਗ ਤੋਂ ਬਚਾਉਣਾ।"],
    board: ["Zinc protects even if scratched, because it is **more reactive than iron**.",
            "ਖ਼ਰੋਚ ਲੱਗਣ 'ਤੇ ਵੀ ਜਸਤਾ ਬਚਾਉਂਦਾ ਹੈ ਕਿਉਂਕਿ ਇਹ **ਲੋਹੇ ਨਾਲੋਂ ਵੱਧ ਕਿਰਿਆਸ਼ੀਲ** ਹੈ।"],
    vvip: true
  };
  T["thermit reaction"] = {
    ctx: ["The blinding white flare used to weld cracked railway tracks on site.",
          "ਟੁੱਟੀਆਂ ਰੇਲ ਪਟੜੀਆਂ ਜੋੜਨ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਚਮਕਦਾਰ ਚਿੱਟੀ ਲਾਟ।"],
    def: ["A highly exothermic displacement of iron oxide by aluminium.",
          "ਐਲੂਮੀਨੀਅਮ ਦੁਆਰਾ ਆਇਰਨ ਆਕਸਾਈਡ ਦਾ ਅਤਿ ਤਾਪ-ਨਿਕਾਸੀ ਵਿਸਥਾਪਨ।"],
    formula: "Fe2O3 + 2Al -> 2Fe + Al2O3 + heat",
    board: ["The iron is produced in the **molten state** — that is why it can weld joints.",
            "ਲੋਹਾ **ਪਿਘਲੀ ਹਾਲਤ** ਵਿੱਚ ਬਣਦਾ ਹੈ — ਇਸੇ ਕਰਕੇ ਜੋੜ ਵੈਲਡ ਹੋ ਜਾਂਦੇ ਹਨ।"],
    vvip: true
  };
  T["aqua regia"] = {
    ctx: ["The only mixture a jeweller can use to dissolve pure gold.",
          "ਇੱਕੋ-ਇੱਕ ਮਿਸ਼ਰਣ ਜਿਸ ਨਾਲ ਸੁਨਿਆਰਾ ਸ਼ੁੱਧ ਸੋਨਾ ਘੋਲ ਸਕਦਾ ਹੈ।"],
    def: ["A 3:1 mixture of concentrated HCl and concentrated HNO3.",
          "ਗਾੜ੍ਹੇ HCl ਅਤੇ ਗਾੜ੍ਹੇ HNO3 ਦਾ 3:1 ਮਿਸ਼ਰਣ।"],
    formula: "3HCl + 1HNO3",
    board: ["Ratio **3 parts HCl : 1 part HNO3** — it dissolves gold and platinum.",
            "ਅਨੁਪਾਤ **3 ਭਾਗ HCl : 1 ਭਾਗ HNO3** — ਇਹ ਸੋਨਾ ਤੇ ਪਲੈਟੀਨਮ ਘੋਲ ਦਿੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["ionic bond"] = {
    ctx: ["One atom handing an electron over to another, then the two sticking together.",
          "ਇੱਕ ਪਰਮਾਣੂ ਦਾ ਦੂਜੇ ਨੂੰ ਇਲੈਕਟ੍ਰਾਨ ਦੇਣਾ, ਫਿਰ ਦੋਵਾਂ ਦਾ ਜੁੜ ਜਾਣਾ।"],
    def: ["A bond formed by the complete transfer of electrons from a metal to a non-metal.",
          "ਧਾਤ ਤੋਂ ਅਧਾਤ ਨੂੰ ਇਲੈਕਟ੍ਰਾਨਾਂ ਦੇ ਪੂਰੇ ਤਬਾਦਲੇ ਨਾਲ ਬਣਿਆ ਬੰਧ।"],
    formula: "Na + Cl -> Na^+ Cl^-",
    board: ["Ionic compounds have **high melting points** and **conduct only when molten or in solution**.",
            "ਆਇਓਨਿਕ ਯੋਗਿਕਾਂ ਦਾ **ਪਿਘਲਣ ਬਿੰਦੂ ਉੱਚਾ** ਹੁੰਦਾ ਹੈ ਤੇ ਇਹ **ਸਿਰਫ਼ ਪਿਘਲੀ ਹਾਲਤ ਜਾਂ ਘੋਲ ਵਿੱਚ ਚਾਲਕ** ਹਨ।"],
    vvip: true
  };
  T["ore"] = {
    ctx: ["The rock worth digging up because the metal inside pays for the mining.",
          "ਉਹ ਚੱਟਾਨ ਜਿਸ ਨੂੰ ਪੁੱਟਣਾ ਲਾਹੇਵੰਦ ਹੈ ਕਿਉਂਕਿ ਅੰਦਰਲੀ ਧਾਤ ਖ਼ਰਚਾ ਪੂਰਾ ਕਰ ਦਿੰਦੀ ਹੈ।"],
    def: ["A mineral from which a metal can be extracted profitably.",
          "ਉਹ ਖਣਿਜ ਜਿਸ ਤੋਂ ਧਾਤ ਲਾਭਦਾਇਕ ਢੰਗ ਨਾਲ ਕੱਢੀ ਜਾ ਸਕੇ।"],
    board: ["**Every ore is a mineral, but every mineral is not an ore.**",
            "**ਹਰ ਕੱਚੀ ਧਾਤ ਖਣਿਜ ਹੈ, ਪਰ ਹਰ ਖਣਿਜ ਕੱਚੀ ਧਾਤ ਨਹੀਂ।**"],
    vvip: true
  };
  T["gangue"] = {
    ctx: ["The sand and mud you throw away after washing out the useful ore.",
          "ਕੱਚੀ ਧਾਤ ਧੋਣ ਤੋਂ ਬਾਅਦ ਸੁੱਟੀ ਜਾਣ ਵਾਲੀ ਰੇਤ ਤੇ ਮਿੱਟੀ।"],
    def: ["The unwanted earthy impurities present along with an ore.",
          "ਕੱਚੀ ਧਾਤ ਨਾਲ ਮੌਜੂਦ ਬੇਲੋੜੀਆਂ ਮਿੱਟੀ ਵਰਗੀਆਂ ਅਸ਼ੁੱਧੀਆਂ।"],
    board: ["Gangue is removed **before** extraction, during concentration of the ore.",
            "ਮਲੜ ਨੂੰ ਧਾਤ ਕੱਢਣ ਤੋਂ **ਪਹਿਲਾਂ**, ਸੰਘਣਨ ਦੌਰਾਨ ਹਟਾਇਆ ਜਾਂਦਾ ਹੈ।"]
  };
  T["sonorous"] = {
    ctx: ["The ringing note of a temple bell or a steel thali when struck.",
          "ਮੰਦਰ ਦੀ ਘੰਟੀ ਜਾਂ ਸਟੀਲ ਦੀ ਥਾਲੀ ਵੱਜਣ 'ਤੇ ਆਉਂਦੀ ਗੂੰਜ।"],
    def: ["Producing a ringing sound when struck.",
          "ਠੋਕਣ 'ਤੇ ਗੂੰਜਦੀ ਆਵਾਜ਼ ਪੈਦਾ ਕਰਨ ਵਾਲਾ।"],
    board: ["This is why **metals are used to make bells and wires for musical instruments**.",
            "ਇਸੇ ਕਰਕੇ **ਘੰਟੀਆਂ ਅਤੇ ਸਾਜ਼ਾਂ ਦੀਆਂ ਤਾਰਾਂ ਧਾਤਾਂ ਤੋਂ ਬਣਦੀਆਂ ਹਨ**।"]
  };

  /* ================= Ch 4 · Carbon and its Compounds ===================== */
  T["covalent bond"] = {
    ctx: ["Two friends sharing one set of earphones rather than giving them away.",
          "ਦੋ ਦੋਸਤਾਂ ਦਾ ਇੱਕੋ ਈਅਰਫ਼ੋਨ ਸਾਂਝਾ ਕਰਨਾ, ਦੇਣਾ ਨਹੀਂ।"],
    def: ["A bond formed by the sharing of electron pairs between atoms.",
          "ਪਰਮਾਣੂਆਂ ਵਿਚਕਾਰ ਇਲੈਕਟ੍ਰਾਨ ਜੋੜੇ ਸਾਂਝੇ ਕਰਨ ਨਾਲ ਬਣਿਆ ਬੰਧ।"],
    formula: "H2O, CH4, CO2",
    board: ["Covalent compounds have **low melting points** and are **poor conductors**.",
            "ਸਹਿ-ਸੰਯੋਜਕ ਯੋਗਿਕਾਂ ਦਾ **ਪਿਘਲਣ ਬਿੰਦੂ ਘੱਟ** ਤੇ ਇਹ **ਮਾੜੇ ਚਾਲਕ** ਹੁੰਦੇ ਹਨ।"],
    vvip: true
  };
  T["catenation"] = {
    ctx: ["Carbon atoms holding hands in a line, like children forming a human chain.",
          "ਕਾਰਬਨ ਪਰਮਾਣੂਆਂ ਦਾ ਲੜੀ ਵਿੱਚ ਹੱਥ ਫੜਨਾ, ਜਿਵੇਂ ਬੱਚੇ ਮਨੁੱਖੀ ਲੜੀ ਬਣਾਉਂਦੇ ਹਨ।"],
    def: ["The ability of carbon to bond with itself forming long chains and rings.",
          "ਕਾਰਬਨ ਦੀ ਆਪਣੇ ਆਪ ਨਾਲ ਜੁੜ ਕੇ ਲੰਮੀਆਂ ਸ਼੍ਰਿੰਖਲਾਵਾਂ ਤੇ ਛੱਲੇ ਬਣਾਉਣ ਦੀ ਯੋਗਤਾ।"],
    board: ["Catenation plus tetravalency is **why millions of carbon compounds exist**.",
            "ਸ਼੍ਰਿੰਖਲਨ ਅਤੇ ਚਤੁਰ-ਸੰਯੋਜਕਤਾ ਕਰਕੇ ਹੀ **ਕਾਰਬਨ ਦੇ ਲੱਖਾਂ ਯੋਗਿਕ ਮੌਜੂਦ ਹਨ**।"],
    vvip: true
  };
  T["tetravalency"] = {
    ctx: ["Carbon has exactly four hands, so it can hold four partners at once.",
          "ਕਾਰਬਨ ਦੇ ਠੀਕ ਚਾਰ ਹੱਥ ਹਨ, ਸੋ ਇਹ ਇੱਕੋ ਸਮੇਂ ਚਾਰ ਸਾਥੀ ਫੜ ਸਕਦਾ ਹੈ।"],
    def: ["Carbon has four valence electrons and forms four covalent bonds.",
          "ਕਾਰਬਨ ਦੇ ਚਾਰ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨ ਹਨ ਅਤੇ ਇਹ ਚਾਰ ਸਹਿ-ਸੰਯੋਜਕ ਬੰਧ ਬਣਾਉਂਦਾ ਹੈ।"],
    formula: "CH4",
    board: ["Carbon **cannot lose or gain 4 electrons**, so it shares — that is the key reason.",
            "ਕਾਰਬਨ **4 ਇਲੈਕਟ੍ਰਾਨ ਨਾ ਗੁਆ ਸਕਦਾ ਨਾ ਲੈ ਸਕਦਾ**, ਇਸ ਲਈ ਸਾਂਝੇ ਕਰਦਾ ਹੈ।"],
    vvip: true
  };
  T["saturated compound"] = {
    ctx: ["A full bus with no standing room — every seat already taken by single bonds.",
          "ਭਰੀ ਹੋਈ ਬੱਸ ਜਿੱਥੇ ਖੜ੍ਹਨ ਦੀ ਥਾਂ ਨਹੀਂ — ਹਰ ਸੀਟ ਇੱਕਹਿਰੇ ਬੰਧਾਂ ਨਾਲ ਭਰੀ।"],
    def: ["A hydrocarbon in which all carbon-carbon bonds are single bonds.",
          "ਉਹ ਹਾਈਡ੍ਰੋਕਾਰਬਨ ਜਿਸ ਵਿੱਚ ਸਾਰੇ ਕਾਰਬਨ-ਕਾਰਬਨ ਬੰਧ ਇੱਕਹਿਰੇ ਹੋਣ।"],
    formula: "CnH2n+2",
    board: ["Alkanes burn with a **clean blue flame** because they need less oxygen.",
            "ਐਲਕੇਨ **ਸਾਫ਼ ਨੀਲੀ ਲਾਟ** ਨਾਲ ਸੜਦੇ ਹਨ ਕਿਉਂਕਿ ਇਨ੍ਹਾਂ ਨੂੰ ਘੱਟ ਆਕਸੀਜਨ ਚਾਹੀਦੀ ਹੈ।"],
    vvip: true
  };
  T["unsaturated compound"] = {
    ctx: ["A bus with empty seats — double or triple bonds leave room to add more.",
          "ਖਾਲੀ ਸੀਟਾਂ ਵਾਲੀ ਬੱਸ — ਦੂਹਰੇ ਜਾਂ ਤੀਹਰੇ ਬੰਧ ਹੋਰ ਜੋੜਨ ਦੀ ਥਾਂ ਛੱਡਦੇ ਹਨ।"],
    def: ["A hydrocarbon containing at least one double or triple carbon-carbon bond.",
          "ਉਹ ਹਾਈਡ੍ਰੋਕਾਰਬਨ ਜਿਸ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਦੂਹਰਾ ਜਾਂ ਤੀਹਰਾ ਕਾਰਬਨ ਬੰਧ ਹੋਵੇ।"],
    formula: "CnH2n (alkene), CnH2n-2 (alkyne)",
    board: ["Unsaturated hydrocarbons burn with a **yellow sooty flame**.",
            "ਅਸੰਤ੍ਰਿਪਤ ਹਾਈਡ੍ਰੋਕਾਰਬਨ **ਪੀਲੀ ਧੂੰਏਂ ਵਾਲੀ ਲਾਟ** ਨਾਲ ਸੜਦੇ ਹਨ।"],
    vvip: true
  };
  T["homologous series"] = {
    ctx: ["A family ladder where each step adds exactly one CH2 rung.",
          "ਪਰਿਵਾਰਕ ਪੌੜੀ ਜਿਸ ਦੇ ਹਰ ਡੰਡੇ 'ਤੇ ਠੀਕ ਇੱਕ CH2 ਜੁੜਦਾ ਹੈ।"],
    def: ["A series of compounds with the same functional group differing by CH2.",
          "ਇੱਕੋ ਕਿਰਿਆਸ਼ੀਲ ਸਮੂਹ ਵਾਲੇ ਯੋਗਿਕਾਂ ਦੀ ਲੜੀ ਜੋ CH2 ਨਾਲ ਵੱਖ ਹੁੰਦੇ ਹਨ।"],
    formula: "CH4, C2H6, C3H8, C4H10",
    board: ["Successive members differ by **CH2 and 14 u** of molecular mass.",
            "ਲਗਾਤਾਰ ਮੈਂਬਰ **CH2 ਅਤੇ 14 u** ਅਣਵੀ ਪੁੰਜ ਨਾਲ ਵੱਖ ਹੁੰਦੇ ਹਨ।"],
    vvip: true
  };
  T["isomer"] = {
    ctx: ["Same Lego bricks, two different models — identical parts, different shape.",
          "ਇੱਕੋ ਜਿਹੇ ਬਲਾਕ, ਦੋ ਵੱਖਰੇ ਮਾਡਲ — ਪੁਰਜ਼ੇ ਇੱਕੋ, ਸ਼ਕਲ ਵੱਖਰੀ।"],
    def: ["Compounds with the same molecular formula but different structures.",
          "ਇੱਕੋ ਅਣਵੀ ਸੂਤਰ ਪਰ ਵੱਖਰੀ ਬਣਤਰ ਵਾਲੇ ਯੋਗਿਕ।"],
    formula: "C4H10 -> n-butane, iso-butane",
    board: ["Isomerism starts from **butane (C4H10)** onwards.",
            "ਸਮਅੰਗਕਤਾ **ਬਿਊਟੇਨ (C4H10)** ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ।"],
    vvip: true
  };
  T["esterification"] = {
    ctx: ["The sweet fruity smell rising when acid and alcohol are warmed together.",
          "ਤੇਜ਼ਾਬ ਤੇ ਅਲਕੋਹਲ ਇਕੱਠੇ ਗਰਮ ਕਰਨ 'ਤੇ ਆਉਂਦੀ ਮਿੱਠੀ ਫਲਾਂ ਵਰਗੀ ਮਹਿਕ।"],
    def: ["Reaction of a carboxylic acid with an alcohol to form a sweet-smelling ester.",
          "ਕਾਰਬੋਕਸਿਲਿਕ ਤੇਜ਼ਾਬ ਅਤੇ ਅਲਕੋਹਲ ਦੀ ਕਿਰਿਆ ਨਾਲ ਮਿੱਠੀ ਮਹਿਕ ਵਾਲਾ ਐਸਟਰ ਬਣਨਾ।"],
    formula: "CH3COOH + C2H5OH -> CH3COOC2H5 + H2O",
    board: ["Needs **conc. H2SO4** as catalyst; esters are used in **perfumes and flavours**.",
            "**ਗਾੜ੍ਹਾ H2SO4** ਉਤਪ੍ਰੇਰਕ ਚਾਹੀਦਾ; ਐਸਟਰ **ਇਤਰ ਤੇ ਸੁਆਦ** ਵਿੱਚ ਵਰਤੇ ਜਾਂਦੇ ਹਨ।"],
    vvip: true
  };
  T["saponification"] = {
    ctx: ["The traditional way soap is made — boiling oil with caustic soda.",
          "ਸਾਬਣ ਬਣਾਉਣ ਦਾ ਰਵਾਇਤੀ ਤਰੀਕਾ — ਤੇਲ ਨੂੰ ਕਾਸਟਿਕ ਸੋਡੇ ਨਾਲ ਉਬਾਲਣਾ।"],
    def: ["Hydrolysis of an ester or fat with an alkali to give soap and glycerol.",
          "ਐਸਟਰ ਜਾਂ ਚਰਬੀ ਦਾ ਖਾਰ ਨਾਲ ਜਲ-ਅਪਘਟਨ ਜਿਸ ਤੋਂ ਸਾਬਣ ਤੇ ਗਲਿਸਰੋਲ ਬਣਦੇ ਹਨ।"],
    formula: "Ester + NaOH -> Soap + Alcohol",
    board: ["The name literally means **soap-making**; the by-product is **glycerol**.",
            "ਨਾਮ ਦਾ ਅਰਥ ਹੀ **ਸਾਬਣ ਬਣਾਉਣਾ** ਹੈ; ਸਹਿ-ਉਤਪਾਦ **ਗਲਿਸਰੋਲ** ਹੈ।"],
    vvip: true
  };
  T["micelle"] = {
    ctx: ["Soap molecules surrounding a grease spot like a crowd circling a player.",
          "ਸਾਬਣ ਦੇ ਅਣੂਆਂ ਦਾ ਤੇਲ ਦੇ ਧੱਬੇ ਨੂੰ ਘੇਰਨਾ, ਜਿਵੇਂ ਭੀੜ ਖਿਡਾਰੀ ਨੂੰ ਘੇਰ ਲਵੇ।"],
    def: ["A spherical cluster of soap molecules trapping oil at its centre.",
          "ਸਾਬਣ ਦੇ ਅਣੂਆਂ ਦਾ ਗੋਲ ਝੁੰਡ ਜੋ ਤੇਲ ਨੂੰ ਵਿਚਕਾਰ ਫਸਾ ਲੈਂਦਾ ਹੈ।"],
    board: ["The **hydrophobic tail faces the oil** and the **hydrophilic head faces the water**.",
            "**ਜਲ-ਵਿਰੋਧੀ ਪੂਛ ਤੇਲ ਵੱਲ** ਅਤੇ **ਜਲ-ਪ੍ਰੇਮੀ ਸਿਰ ਪਾਣੀ ਵੱਲ** ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["hydrogenation"] = {
    ctx: ["Turning liquid cooking oil into solid vanaspati ghee.",
          "ਤਰਲ ਖਾਣ ਵਾਲੇ ਤੇਲ ਨੂੰ ਠੋਸ ਵਨਸਪਤੀ ਘਿਓ ਵਿੱਚ ਬਦਲਣਾ।"],
    def: ["Addition of hydrogen to an unsaturated compound using a nickel catalyst.",
          "ਨਿੱਕਲ ਉਤਪ੍ਰੇਰਕ ਨਾਲ ਅਸੰਤ੍ਰਿਪਤ ਯੋਗਿਕ ਵਿੱਚ ਹਾਈਡ੍ਰੋਜਨ ਜੋੜਨਾ।"],
    formula: "C2H4 + H2 -> C2H6",
    board: ["Catalyst is **nickel**; this is how **vegetable oil becomes vanaspati**.",
            "ਉਤਪ੍ਰੇਰਕ **ਨਿੱਕਲ** ਹੈ; ਇਸੇ ਤਰ੍ਹਾਂ **ਬਨਸਪਤੀ ਤੇਲ ਵਨਸਪਤੀ ਬਣਦਾ ਹੈ**।"],
    vvip: true
  };
  T["denatured alcohol"] = {
    ctx: ["Spirit deliberately spoiled so nobody is tempted to drink it.",
          "ਜਾਣ-ਬੁੱਝ ਕੇ ਖ਼ਰਾਬ ਕੀਤੀ ਸਪਿਰਿਟ ਤਾਂ ਜੋ ਕੋਈ ਪੀਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਨਾ ਕਰੇ।"],
    def: ["Ethanol made unfit for drinking by adding poisonous substances.",
          "ਜ਼ਹਿਰੀਲੇ ਪਦਾਰਥ ਮਿਲਾ ਕੇ ਪੀਣਯੋਗ ਨਾ ਰਹਿਣ ਦਿੱਤੀ ਗਈ ਈਥੇਨੌਲ।"],
    board: ["**Methanol and dyes** are added — the colour warns people it is poisonous.",
            "**ਮੀਥੇਨੌਲ ਤੇ ਰੰਗ** ਮਿਲਾਏ ਜਾਂਦੇ ਹਨ — ਰੰਗ ਚੇਤਾਵਨੀ ਦਿੰਦਾ ਹੈ ਕਿ ਇਹ ਜ਼ਹਿਰੀਲੀ ਹੈ।"]
  };
  T["allotrope"] = {
    ctx: ["Diamond and graphite — same carbon, wildly different personalities.",
          "ਹੀਰਾ ਤੇ ਗ੍ਰੈਫ਼ਾਈਟ — ਕਾਰਬਨ ਇੱਕੋ, ਸੁਭਾਅ ਬਿਲਕੁਲ ਵੱਖਰਾ।"],
    def: ["Different physical forms of the same element in the same state.",
          "ਇੱਕੋ ਤੱਤ ਦੇ ਇੱਕੋ ਅਵਸਥਾ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਭੌਤਿਕ ਰੂਪ।"],
    board: ["**Diamond is the hardest; graphite conducts electricity** — same element, different structure.",
            "**ਹੀਰਾ ਸਭ ਤੋਂ ਸਖ਼ਤ; ਗ੍ਰੈਫ਼ਾਈਟ ਬਿਜਲੀ ਚਲਾਉਂਦਾ ਹੈ** — ਤੱਤ ਇੱਕੋ, ਬਣਤਰ ਵੱਖਰੀ।"],
    vvip: true
  };
  T["functional group"] = {
    ctx: ["The badge on a uniform that tells you which team a compound plays for.",
          "ਵਰਦੀ 'ਤੇ ਲੱਗਿਆ ਬੈਜ ਜੋ ਦੱਸਦਾ ਹੈ ਕਿ ਯੋਗਿਕ ਕਿਸ ਟੀਮ ਦਾ ਹੈ।"],
    def: ["An atom or group of atoms that decides the chemical properties of a compound.",
          "ਉਹ ਪਰਮਾਣੂ ਜਾਂ ਪਰਮਾਣੂ ਸਮੂਹ ਜੋ ਯੋਗਿਕ ਦੇ ਰਸਾਇਣਕ ਗੁਣ ਤੈਅ ਕਰਦਾ ਹੈ।"],
    formula: "-OH alcohol, -CHO aldehyde, -COOH acid",
    board: ["Learn the four: **-OH, -CHO, -CO-, -COOH** with one example each.",
            "ਚਾਰ ਯਾਦ ਕਰੋ: **-OH, -CHO, -CO-, -COOH** ਹਰ ਇੱਕ ਦੀ ਇੱਕ ਉਦਾਹਰਣ ਨਾਲ।"],
    vvip: true
  };

  /* ================= Ch 5 · Periodic Classification ===================== */
  T["periodic table"] = {
    ctx: ["A seating plan where every element sits with others of similar behaviour.",
          "ਬੈਠਣ ਦੀ ਯੋਜਨਾ ਜਿੱਥੇ ਹਰ ਤੱਤ ਆਪਣੇ ਵਰਗੇ ਸੁਭਾਅ ਵਾਲਿਆਂ ਨਾਲ ਬੈਠਦਾ ਹੈ।"],
    def: ["A table arranging elements by increasing atomic number in periods and groups.",
          "ਤੱਤਾਂ ਨੂੰ ਵਧਦੀ ਪਰਮਾਣੂ ਸੰਖਿਆ ਅਨੁਸਾਰ ਆਵਰਤਾਂ ਤੇ ਸਮੂਹਾਂ ਵਿੱਚ ਰੱਖਣ ਵਾਲੀ ਸਾਰਨੀ।"],
    board: ["Modern table has **18 groups and 7 periods**, based on **atomic number**.",
            "ਆਧੁਨਿਕ ਸਾਰਨੀ ਵਿੱਚ **18 ਸਮੂਹ ਤੇ 7 ਆਵਰਤ** ਹਨ, ਆਧਾਰ **ਪਰਮਾਣੂ ਸੰਖਿਆ**।"],
    vvip: true
  };
  T["valency"] = {
    ctx: ["The number of hands an atom has free for holding other atoms.",
          "ਪਰਮਾਣੂ ਕੋਲ ਦੂਜੇ ਪਰਮਾਣੂ ਫੜਨ ਲਈ ਖਾਲੀ ਹੱਥਾਂ ਦੀ ਗਿਣਤੀ।"],
    def: ["The combining capacity of an element, set by its valence electrons.",
          "ਤੱਤ ਦੀ ਸੰਯੋਜਨ ਸਮਰੱਥਾ, ਜੋ ਇਸ ਦੇ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨਾਂ ਤੋਂ ਤੈਅ ਹੁੰਦੀ ਹੈ।"],
    formula: "Al(3) + O(2) -> Al2O3",
    board: ["Valency stays **the same down a group** but changes across a period.",
            "ਸੰਯੋਜਕਤਾ **ਸਮੂਹ ਵਿੱਚ ਹੇਠਾਂ ਜਾਂਦੇ ਇੱਕੋ ਜਿਹੀ** ਰਹਿੰਦੀ ਹੈ, ਆਵਰਤ ਵਿੱਚ ਬਦਲਦੀ ਹੈ।"],
    vvip: true
  };
  T["atomic radius"] = {
    ctx: ["How wide an atom is — it shrinks across a row, swells down a column.",
          "ਪਰਮਾਣੂ ਕਿੰਨਾ ਚੌੜਾ ਹੈ — ਕਤਾਰ ਵਿੱਚ ਘਟਦਾ, ਕਾਲਮ ਵਿੱਚ ਵਧਦਾ।"],
    def: ["The distance from the nucleus to the outermost shell of an atom.",
          "ਪਰਮਾਣੂ ਦੇ ਨਿਊਕਲੀਅਸ ਤੋਂ ਸਭ ਤੋਂ ਬਾਹਰਲੇ ਸ਼ੈੱਲ ਤੱਕ ਦੀ ਦੂਰੀ।"],
    board: ["**Decreases left to right** (stronger nuclear pull), **increases down a group** (new shell).",
            "**ਖੱਬੇ ਤੋਂ ਸੱਜੇ ਘਟਦਾ** (ਨਿਊਕਲੀ ਖਿੱਚ ਵਧਦੀ), **ਸਮੂਹ ਵਿੱਚ ਹੇਠਾਂ ਵਧਦਾ** (ਨਵਾਂ ਸ਼ੈੱਲ)।"],
    vvip: true
  };
  T["electronegativity"] = {
    ctx: ["How hard an atom tugs at the shared electrons in a tug-of-war.",
          "ਰੱਸਾਕਸ਼ੀ ਵਿੱਚ ਪਰਮਾਣੂ ਸਾਂਝੇ ਇਲੈਕਟ੍ਰਾਨਾਂ ਨੂੰ ਕਿੰਨੀ ਜ਼ੋਰ ਨਾਲ ਖਿੱਚਦਾ ਹੈ।"],
    def: ["The tendency of an atom to attract a shared pair of electrons.",
          "ਪਰਮਾਣੂ ਦੀ ਸਾਂਝੇ ਇਲੈਕਟ੍ਰਾਨ ਜੋੜੇ ਨੂੰ ਖਿੱਚਣ ਦੀ ਪ੍ਰਵਿਰਤੀ।"],
    board: ["**Fluorine is the most electronegative** element; it increases across a period.",
            "**ਫਲੋਰੀਨ ਸਭ ਤੋਂ ਵੱਧ ਬਿਜਲਈ ਰਿਣਾਤਮਕ** ਹੈ; ਆਵਰਤ ਵਿੱਚ ਇਹ ਵਧਦੀ ਹੈ।"],
    vvip: true
  };
  T["law of octaves"] = {
    ctx: ["Musical notes repeating every eighth key — Newlands saw the same in elements.",
          "ਹਰ ਅੱਠਵੀਂ ਸੁਰ ਦਾ ਦੁਹਰਾਉਣਾ — ਨਿਊਲੈਂਡਸ ਨੇ ਤੱਤਾਂ ਵਿੱਚ ਵੀ ਇਹੀ ਵੇਖਿਆ।"],
    def: ["Newlands' law: every eighth element has properties similar to the first.",
          "ਨਿਊਲੈਂਡਸ ਦਾ ਨਿਯਮ: ਹਰ ਅੱਠਵੇਂ ਤੱਤ ਦੇ ਗੁਣ ਪਹਿਲੇ ਵਰਗੇ ਹੁੰਦੇ ਹਨ।"],
    board: ["It failed **after calcium** and worked only for lighter elements.",
            "ਇਹ **ਕੈਲਸ਼ੀਅਮ ਤੋਂ ਬਾਅਦ** ਅਸਫਲ ਰਿਹਾ ਤੇ ਸਿਰਫ਼ ਹਲਕੇ ਤੱਤਾਂ ਲਈ ਚੱਲਿਆ।"],
    vvip: true
  };
  T["mendeleev's periodic law"] = {
    ctx: ["A table so good it left blank chairs for guests who had not arrived yet.",
          "ਇੰਨੀ ਵਧੀਆ ਸਾਰਨੀ ਕਿ ਅਜੇ ਨਾ ਆਏ ਮਹਿਮਾਨਾਂ ਲਈ ਕੁਰਸੀਆਂ ਖਾਲੀ ਛੱਡ ਦਿੱਤੀਆਂ।"],
    def: ["Properties of elements are a periodic function of their atomic masses.",
          "ਤੱਤਾਂ ਦੇ ਗੁਣ ਉਨ੍ਹਾਂ ਦੇ ਪਰਮਾਣੂ ਪੁੰਜ ਦਾ ਆਵਰਤੀ ਫਲਨ ਹਨ।"],
    board: ["He **left gaps for undiscovered elements** like eka-boron and eka-silicon.",
            "ਉਸ ਨੇ **ਅਣਖੋਜੇ ਤੱਤਾਂ ਲਈ ਥਾਂ ਖਾਲੀ ਛੱਡੀ**, ਜਿਵੇਂ ਏਕਾ-ਬੋਰਾਨ ਤੇ ਏਕਾ-ਸਿਲੀਕਾਨ।"],
    vvip: true
  };
  T["metalloid"] = {
    ctx: ["An element sitting on the fence — part metal, part non-metal.",
          "ਵਾੜ 'ਤੇ ਬੈਠਾ ਤੱਤ — ਕੁਝ ਧਾਤ, ਕੁਝ ਅਧਾਤ।"],
    def: ["An element showing properties of both metals and non-metals.",
          "ਉਹ ਤੱਤ ਜੋ ਧਾਤਾਂ ਤੇ ਅਧਾਤਾਂ ਦੋਵਾਂ ਦੇ ਗੁਣ ਦਿਖਾਵੇ।"],
    board: ["**B, Si, Ge, As, Sb, Te** form the staircase between metals and non-metals.",
            "**B, Si, Ge, As, Sb, Te** ਧਾਤਾਂ ਤੇ ਅਧਾਤਾਂ ਵਿਚਕਾਰ ਪੌੜੀ ਬਣਾਉਂਦੇ ਹਨ।"]
  };

  /* ================= Ch 6 · Life Processes ============================== */
  T["photosynthesis"] = {
    ctx: ["A leaf running a solar-powered kitchen that cooks sugar out of air and water.",
          "ਪੱਤਾ ਸੂਰਜੀ ਰਸੋਈ ਚਲਾਉਂਦਾ ਹੈ ਜੋ ਹਵਾ ਤੇ ਪਾਣੀ ਤੋਂ ਖੰਡ ਪਕਾਉਂਦੀ ਹੈ।"],
    def: ["Green plants make glucose from CO2 and water using sunlight and chlorophyll.",
          "ਹਰੇ ਪੌਦੇ ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਤੇ ਹਰਿਤ ਲਵਕ ਨਾਲ CO2 ਤੇ ਪਾਣੀ ਤੋਂ ਗਲੂਕੋਜ਼ ਬਣਾਉਂਦੇ ਹਨ।"],
    formula: "6CO2 + 6H2O -> C6H12O6 + 6O2",
    board: ["Starch test: the leaf turns **blue-black with iodine** only where light fell.",
            "ਸਟਾਰਚ ਪਰਖ: ਪੱਤਾ ਸਿਰਫ਼ ਉੱਥੇ **ਆਇਓਡੀਨ ਨਾਲ ਨੀਲਾ-ਕਾਲਾ** ਹੁੰਦਾ ਹੈ ਜਿੱਥੇ ਰੌਸ਼ਨੀ ਪਈ।"],
    vvip: true
  };
  T["stomata"] = {
    ctx: ["Tiny adjustable windows on a leaf that open for air and close to save water.",
          "ਪੱਤੇ 'ਤੇ ਛੋਟੀਆਂ ਖਿੜਕੀਆਂ ਜੋ ਹਵਾ ਲਈ ਖੁੱਲ੍ਹਦੀਆਂ ਤੇ ਪਾਣੀ ਬਚਾਉਣ ਲਈ ਬੰਦ ਹੁੰਦੀਆਂ ਹਨ।"],
    def: ["Tiny pores on leaves for gaseous exchange and transpiration.",
          "ਪੱਤਿਆਂ 'ਤੇ ਛੋਟੇ ਛੇਕ ਜੋ ਗੈਸਾਂ ਦੇ ਵਟਾਂਦਰੇ ਤੇ ਵਾਸ਼ਪ ਉਤਸਰਜਨ ਲਈ ਹਨ।"],
    board: ["**Guard cells** open the pore when swollen with water and close it when flaccid.",
            "**ਰੱਖਿਅਕ ਕੋਸ਼ਿਕਾਵਾਂ** ਪਾਣੀ ਨਾਲ ਫੁੱਲਣ 'ਤੇ ਛੇਕ ਖੋਲ੍ਹਦੀਆਂ ਤੇ ਢਿੱਲੀਆਂ ਹੋਣ 'ਤੇ ਬੰਦ ਕਰਦੀਆਂ ਹਨ।"],
    vvip: true
  };
  T["aerobic respiration"] = {
    ctx: ["Normal breathing while you walk to school — oxygen all the way.",
          "ਸਕੂਲ ਜਾਂਦੇ ਸਮੇਂ ਆਮ ਸਾਹ ਲੈਣਾ — ਪੂਰਾ ਸਮਾਂ ਆਕਸੀਜਨ।"],
    def: ["Breakdown of glucose in the presence of oxygen, giving CO2, water and much energy.",
          "ਆਕਸੀਜਨ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦਾ ਟੁੱਟਣਾ, ਜਿਸ ਤੋਂ CO2, ਪਾਣੀ ਤੇ ਬਹੁਤ ਊਰਜਾ ਮਿਲਦੀ ਹੈ।"],
    formula: "C6H12O6 + 6O2 -> 6CO2 + 6H2O + energy",
    board: ["Happens in the **mitochondria** and releases **far more ATP** than anaerobic.",
            "ਇਹ **ਮਾਈਟੋਕਾਂਡਰੀਆ** ਵਿੱਚ ਹੁੰਦਾ ਹੈ ਤੇ ਅਣਆਕਸੀ ਨਾਲੋਂ **ਕਿਤੇ ਵੱਧ ATP** ਦਿੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["anaerobic respiration"] = {
    ctx: ["The cramp in your legs after sprinting — muscles working without enough oxygen.",
          "ਦੌੜਨ ਤੋਂ ਬਾਅਦ ਲੱਤਾਂ ਵਿੱਚ ਖਿਚਾਅ — ਪੱਠੇ ਘੱਟ ਆਕਸੀਜਨ ਨਾਲ ਕੰਮ ਕਰ ਰਹੇ ਹਨ।"],
    def: ["Breakdown of glucose without oxygen, giving less energy.",
          "ਆਕਸੀਜਨ ਬਿਨਾਂ ਗਲੂਕੋਜ਼ ਦਾ ਟੁੱਟਣਾ, ਜਿਸ ਤੋਂ ਘੱਟ ਊਰਜਾ ਮਿਲਦੀ ਹੈ।"],
    formula: "C6H12O6 -> 2C2H5OH + 2CO2 (yeast)",
    board: ["**Muscles give lactic acid; yeast gives ethanol + CO2** — learn both products.",
            "**ਪੱਠੇ ਲੈਕਟਿਕ ਤੇਜ਼ਾਬ; ਖ਼ਮੀਰ ਈਥੇਨੌਲ + CO2** ਦਿੰਦਾ ਹੈ — ਦੋਵੇਂ ਯਾਦ ਰੱਖੋ।"],
    vvip: true
  };
  T["transpiration"] = {
    ctx: ["A plant sweating through its leaves, which pulls more water up the stem.",
          "ਪੌਦੇ ਦਾ ਪੱਤਿਆਂ ਰਾਹੀਂ ਪਸੀਨਾ ਛੱਡਣਾ, ਜਿਸ ਨਾਲ ਹੋਰ ਪਾਣੀ ਉੱਪਰ ਖਿੱਚਿਆ ਜਾਂਦਾ ਹੈ।"],
    def: ["Loss of water vapour from the aerial parts of a plant, mainly through stomata.",
          "ਪੌਦੇ ਦੇ ਹਵਾਈ ਹਿੱਸਿਆਂ ਤੋਂ, ਮੁੱਖ ਤੌਰ 'ਤੇ ਸਟੋਮੈਟਾ ਰਾਹੀਂ, ਜਲ ਵਾਸ਼ਪ ਦਾ ਨਿਕਲਣਾ।"],
    board: ["It creates the **transpiration pull** that lifts water through the **xylem**.",
            "ਇਹ **ਵਾਸ਼ਪ ਖਿੱਚ** ਪੈਦਾ ਕਰਦਾ ਹੈ ਜੋ **ਜ਼ਾਈਲਮ** ਰਾਹੀਂ ਪਾਣੀ ਉੱਪਰ ਲੈ ਜਾਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["xylem"] = {
    ctx: ["The plant's water pipeline, always running upward from root to leaf.",
          "ਪੌਦੇ ਦੀ ਪਾਣੀ ਵਾਲੀ ਪਾਈਪਲਾਈਨ, ਹਮੇਸ਼ਾ ਜੜ੍ਹ ਤੋਂ ਪੱਤੇ ਵੱਲ ਉੱਪਰ।"],
    def: ["Tissue that carries water and minerals upward from roots to leaves.",
          "ਉਹ ਟਿਸ਼ੂ ਜੋ ਪਾਣੀ ਤੇ ਖਣਿਜ ਜੜ੍ਹਾਂ ਤੋਂ ਪੱਤਿਆਂ ਤੱਕ ਉੱਪਰ ਲੈ ਜਾਂਦਾ ਹੈ।"],
    board: ["Xylem transport is **one-way (upward)** and needs **no energy**.",
            "ਜ਼ਾਈਲਮ ਦਾ ਵਹਾਅ **ਇੱਕ-ਪਾਸੜ (ਉੱਪਰ ਵੱਲ)** ਹੈ ਤੇ **ਊਰਜਾ ਨਹੀਂ** ਚਾਹੀਦੀ।"],
    vvip: true
  };
  T["phloem"] = {
    ctx: ["The plant's food delivery service, running both up and down the stem.",
          "ਪੌਦੇ ਦੀ ਭੋਜਨ ਪਹੁੰਚਾਉਣ ਵਾਲੀ ਸੇਵਾ, ਜੋ ਉੱਪਰ ਤੇ ਹੇਠਾਂ ਦੋਵੇਂ ਪਾਸੇ ਚੱਲਦੀ ਹੈ।"],
    def: ["Tissue that transports food made in leaves to all parts of the plant.",
          "ਉਹ ਟਿਸ਼ੂ ਜੋ ਪੱਤਿਆਂ ਵਿੱਚ ਬਣਿਆ ਭੋਜਨ ਪੌਦੇ ਦੇ ਸਾਰੇ ਹਿੱਸਿਆਂ ਤੱਕ ਪਹੁੰਚਾਉਂਦਾ ਹੈ।"],
    board: ["Translocation in phloem is **bidirectional** and **uses ATP energy**.",
            "ਫਲੋਇਮ ਵਿੱਚ ਸਥਾਨਾਂਤਰਣ **ਦੋ-ਪਾਸੜ** ਹੈ ਤੇ **ATP ਊਰਜਾ ਵਰਤਦਾ** ਹੈ।"],
    vvip: true
  };
  T["nephron"] = {
    ctx: ["One of a million tiny filter units inside a kidney.",
          "ਗੁਰਦੇ ਅੰਦਰ ਦਸ ਲੱਖ ਛੋਟੀਆਂ ਛਾਣਨ ਇਕਾਈਆਂ ਵਿੱਚੋਂ ਇੱਕ।"],
    def: ["The structural and functional unit of the kidney.",
          "ਗੁਰਦੇ ਦੀ ਬਣਤਰੀ ਅਤੇ ਕਿਰਿਆਤਮਕ ਇਕਾਈ।"],
    board: ["Filtration happens in the **glomerulus**; useful glucose is **reabsorbed** in the tubule.",
            "ਛਾਣਨ **ਗਲੋਮੇਰੂਲਸ** ਵਿੱਚ ਹੁੰਦੀ ਹੈ; ਲਾਭਦਾਇਕ ਗਲੂਕੋਜ਼ ਨਲੀ ਵਿੱਚ **ਮੁੜ ਸੋਖਿਆ** ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["double circulation"] = {
    ctx: ["Blood passing through the heart twice in one full round of the body.",
          "ਖ਼ੂਨ ਦਾ ਸਰੀਰ ਦੇ ਇੱਕ ਪੂਰੇ ਚੱਕਰ ਵਿੱਚ ਦਿਲ ਵਿੱਚੋਂ ਦੋ ਵਾਰ ਲੰਘਣਾ।"],
    def: ["Blood passes through the heart twice in one complete cycle of the body.",
          "ਖ਼ੂਨ ਸਰੀਰ ਦੇ ਇੱਕ ਪੂਰੇ ਚੱਕਰ ਵਿੱਚ ਦਿਲ ਵਿੱਚੋਂ ਦੋ ਵਾਰ ਲੰਘਦਾ ਹੈ।"],
    board: ["It keeps **oxygenated and deoxygenated blood completely separate**.",
            "ਇਹ **ਆਕਸੀਜਨ ਵਾਲਾ ਤੇ ਬਿਨਾਂ ਆਕਸੀਜਨ ਖ਼ੂਨ ਬਿਲਕੁਲ ਵੱਖ** ਰੱਖਦਾ ਹੈ।"],
    vvip: true
  };
  T["peristalsis"] = {
    ctx: ["Squeezing toothpaste along the tube — the wave that pushes food down.",
          "ਟੂਥਪੇਸਟ ਨੂੰ ਟਿਊਬ ਵਿੱਚ ਦਬਾਉਣਾ — ਉਹੀ ਲਹਿਰ ਜੋ ਭੋਜਨ ਹੇਠਾਂ ਧੱਕਦੀ ਹੈ।"],
    def: ["Rhythmic wave-like contractions of the alimentary canal that move food along.",
          "ਆਹਾਰ ਨਾਲੀ ਦੇ ਲਹਿਰ ਵਰਗੇ ਲੈਅਬੱਧ ਸੁੰਗੜਨ ਜੋ ਭੋਜਨ ਅੱਗੇ ਤੋਰਦੇ ਹਨ।"],
    board: ["It works **even when you are upside down** — gravity is not needed.",
            "ਇਹ **ਉਲਟੇ ਲਟਕੇ ਹੋਏ ਵੀ** ਕੰਮ ਕਰਦਾ ਹੈ — ਗੁਰੂਤਾ ਦੀ ਲੋੜ ਨਹੀਂ।"]
  };
  T["haemoglobin"] = {
    ctx: ["The red taxi in your blood that carries oxygen to every cell.",
          "ਖ਼ੂਨ ਵਿੱਚ ਲਾਲ ਟੈਕਸੀ ਜੋ ਹਰ ਕੋਸ਼ਿਕਾ ਤੱਕ ਆਕਸੀਜਨ ਪਹੁੰਚਾਉਂਦੀ ਹੈ।"],
    def: ["The red iron-containing pigment in RBCs that carries oxygen.",
          "ਲਾਲ ਰਕਤਾਣੂਆਂ ਵਿੱਚ ਲੋਹੇ ਵਾਲਾ ਲਾਲ ਵਰਣਕ ਜੋ ਆਕਸੀਜਨ ਢੋਂਦਾ ਹੈ।"],
    board: ["Low haemoglobin causes **anaemia** and constant tiredness.",
            "ਘੱਟ ਹੀਮੋਗਲੋਬਿਨ **ਅਨੀਮੀਆ** ਤੇ ਲਗਾਤਾਰ ਥਕਾਵਟ ਪੈਦਾ ਕਰਦਾ ਹੈ।"]
  };
  T["autotrophic nutrition"] = {
    ctx: ["Cooking your own meal from scratch instead of ordering it.",
          "ਆਰਡਰ ਕਰਨ ਦੀ ਥਾਂ ਆਪਣਾ ਭੋਜਨ ਆਪ ਬਣਾਉਣਾ।"],
    def: ["Mode of nutrition in which an organism makes its own food from simple substances.",
          "ਉਹ ਪੋਸ਼ਣ ਵਿਧੀ ਜਿਸ ਵਿੱਚ ਜੀਵ ਸਰਲ ਪਦਾਰਥਾਂ ਤੋਂ ਆਪਣਾ ਭੋਜਨ ਆਪ ਬਣਾਉਂਦਾ ਹੈ।"],
    board: ["Green plants and **cyanobacteria** are autotrophs.",
            "ਹਰੇ ਪੌਦੇ ਤੇ **ਸਾਇਨੋਬੈਕਟੀਰੀਆ** ਸਵੈਪੋਸ਼ੀ ਹਨ।"]
  };

  /* ================= Ch 7 · Control and Coordination ==================== */
  T["neuron"] = {
    ctx: ["A living wire carrying messages from your fingertip to your brain.",
          "ਜੀਵਤ ਤਾਰ ਜੋ ਉਂਗਲ ਤੋਂ ਦਿਮਾਗ਼ ਤੱਕ ਸੁਨੇਹੇ ਪਹੁੰਚਾਉਂਦੀ ਹੈ।"],
    def: ["The structural and functional unit of the nervous system.",
          "ਤੰਤੂ ਪ੍ਰਣਾਲੀ ਦੀ ਬਣਤਰੀ ਅਤੇ ਕਿਰਿਆਤਮਕ ਇਕਾਈ।"],
    board: ["Path of the impulse: **dendrite - cell body - axon - nerve ending**.",
            "ਸੰਕੇਤ ਦਾ ਰਾਹ: **ਡੈਂਡ੍ਰਾਈਟ - ਕੋਸ਼ਿਕਾ ਪਿੰਡ - ਐਕਸਾਨ - ਤੰਤੂ ਸਿਰਾ**।"],
    vvip: true
  };
  T["synapse"] = {
    ctx: ["A tiny gap between two nerves that the message must jump using chemicals.",
          "ਦੋ ਤੰਤੂਆਂ ਵਿਚਕਾਰ ਛੋਟਾ ਪਾੜਾ ਜਿਸ ਨੂੰ ਸੁਨੇਹਾ ਰਸਾਇਣਾਂ ਨਾਲ ਪਾਰ ਕਰਦਾ ਹੈ।"],
    def: ["The microscopic gap between two neurons across which impulses pass.",
          "ਦੋ ਤੰਤੂ ਕੋਸ਼ਿਕਾਵਾਂ ਵਿਚਕਾਰ ਸੂਖਮ ਪਾੜਾ ਜਿਸ ਵਿੱਚੋਂ ਸੰਕੇਤ ਲੰਘਦੇ ਹਨ।"],
    board: ["The signal crosses as a **chemical (neurotransmitter)**, not as electricity.",
            "ਸੰਕੇਤ **ਰਸਾਇਣ (ਨਿਊਰੋਟ੍ਰਾਂਸਮੀਟਰ)** ਵਜੋਂ ਪਾਰ ਹੁੰਦਾ ਹੈ, ਬਿਜਲੀ ਵਜੋਂ ਨਹੀਂ।"],
    vvip: true
  };
  T["reflex action"] = {
    ctx: ["Pulling your hand off a hot tawa before you even realise it is hot.",
          "ਗਰਮ ਤਵੇ ਤੋਂ ਹੱਥ ਹਟਾ ਲੈਣਾ, ਇਹ ਸਮਝਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਕਿ ਇਹ ਗਰਮ ਹੈ।"],
    def: ["A rapid, automatic response to a stimulus, controlled by the spinal cord.",
          "ਉਤੇਜਨਾ ਪ੍ਰਤੀ ਤੇਜ਼, ਆਪਣੇ-ਆਪ ਹੋਣ ਵਾਲਾ ਪ੍ਰਤੀਕਰਮ, ਜੋ ਸੁਖਮਨਾ ਕੰਟਰੋਲ ਕਰਦੀ ਹੈ।"],
    board: ["The **spinal cord, not the brain**, completes the reflex arc — that is why it is so fast.",
            "ਪ੍ਰਤੀਵਰਤੀ ਚਾਪ **ਦਿਮਾਗ਼ ਨਹੀਂ, ਸੁਖਮਨਾ** ਪੂਰੀ ਕਰਦੀ ਹੈ — ਇਸੇ ਲਈ ਇਹ ਇੰਨੀ ਤੇਜ਼ ਹੈ।"],
    vvip: true
  };
  T["cerebellum"] = {
    ctx: ["The part that lets you ride a cycle without falling over.",
          "ਉਹ ਹਿੱਸਾ ਜੋ ਤੁਹਾਨੂੰ ਡਿੱਗੇ ਬਿਨਾਂ ਸਾਈਕਲ ਚਲਾਉਣ ਦਿੰਦਾ ਹੈ।"],
    def: ["The hindbrain region controlling posture, balance and precision of movement.",
          "ਪਿਛਲੇ ਦਿਮਾਗ਼ ਦਾ ਹਿੱਸਾ ਜੋ ਮੁਦਰਾ, ਸੰਤੁਲਨ ਤੇ ਹਰਕਤ ਦੀ ਸ਼ੁੱਧਤਾ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ।"],
    board: ["**Balance = cerebellum**; thinking = cerebrum; breathing = medulla.",
            "**ਸੰਤੁਲਨ = ਸੇਰੀਬੈਲਮ**; ਸੋਚਣਾ = ਸੇਰੀਬ੍ਰਮ; ਸਾਹ = ਮੈਡੂਲਾ।"],
    vvip: true
  };
  T["medulla"] = {
    ctx: ["The autopilot that keeps your heart beating while you sleep.",
          "ਉਹ ਆਟੋਪਾਇਲਟ ਜੋ ਸੁੱਤੇ ਹੋਏ ਵੀ ਦਿਲ ਧੜਕਦਾ ਰੱਖਦਾ ਹੈ।"],
    def: ["The hindbrain region controlling involuntary actions like breathing and heartbeat.",
          "ਪਿਛਲੇ ਦਿਮਾਗ਼ ਦਾ ਹਿੱਸਾ ਜੋ ਸਾਹ ਤੇ ਦਿਲ ਦੀ ਧੜਕਣ ਵਰਗੀਆਂ ਅਣਇੱਛਤ ਕਿਰਿਆਵਾਂ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ।"],
    board: ["Controls **blood pressure, salivation and vomiting** too.",
            "**ਖ਼ੂਨ ਦਾ ਦਬਾਅ, ਥੁੱਕ ਆਉਣਾ ਤੇ ਉਲਟੀ** ਵੀ ਇਹੀ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ।"],
    vvip: true
  };
  T["thyroxine"] = {
    ctx: ["The hormone that needs iodised salt in your kitchen to be made.",
          "ਉਹ ਹਾਰਮੋਨ ਜਿਸ ਨੂੰ ਬਣਨ ਲਈ ਰਸੋਈ ਦੇ ਆਇਓਡੀਨ ਵਾਲੇ ਲੂਣ ਦੀ ਲੋੜ ਹੈ।"],
    def: ["A thyroid hormone that regulates carbohydrate, protein and fat metabolism.",
          "ਥਾਇਰਾਇਡ ਦਾ ਹਾਰਮੋਨ ਜੋ ਕਾਰਬੋਹਾਈਡ੍ਰੇਟ, ਪ੍ਰੋਟੀਨ ਤੇ ਚਰਬੀ ਦਾ ਪਾਚਕਪਣ ਨਿਯਮਿਤ ਕਰਦਾ ਹੈ।"],
    board: ["Iodine deficiency causes **goitre** — this is why salt is iodised.",
            "ਆਇਓਡੀਨ ਦੀ ਕਮੀ **ਗਿੱਲ੍ਹੜ** ਪੈਦਾ ਕਰਦੀ ਹੈ — ਇਸੇ ਲਈ ਲੂਣ ਆਇਓਡੀਨ ਵਾਲਾ ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["insulin"] = {
    ctx: ["The hormone that tells your body to store sugar after a big meal.",
          "ਉਹ ਹਾਰਮੋਨ ਜੋ ਵੱਡੇ ਖਾਣੇ ਤੋਂ ਬਾਅਦ ਸਰੀਰ ਨੂੰ ਖੰਡ ਸਾਂਭਣ ਲਈ ਕਹਿੰਦਾ ਹੈ।"],
    def: ["A pancreatic hormone that lowers and regulates blood sugar level.",
          "ਪੈਨਕ੍ਰੀਆਸ ਦਾ ਹਾਰਮੋਨ ਜੋ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ੱਕਰ ਦਾ ਪੱਧਰ ਘਟਾਉਂਦਾ ਤੇ ਨਿਯਮਿਤ ਕਰਦਾ ਹੈ।"],
    board: ["Its deficiency causes **diabetes mellitus**; it is secreted by the **pancreas**.",
            "ਇਸ ਦੀ ਕਮੀ **ਸ਼ੂਗਰ ਰੋਗ** ਪੈਦਾ ਕਰਦੀ ਹੈ; ਇਹ **ਪੈਨਕ੍ਰੀਆਸ** ਤੋਂ ਨਿਕਲਦਾ ਹੈ।"],
    vvip: true
  };
  T["adrenaline"] = {
    ctx: ["The rush before an exam — pounding heart, fast breath, sweaty palms.",
          "ਪ੍ਰੀਖਿਆ ਤੋਂ ਪਹਿਲਾਂ ਦਾ ਜੋਸ਼ — ਧੜਕਦਾ ਦਿਲ, ਤੇਜ਼ ਸਾਹ, ਪਸੀਨੇ ਵਾਲੇ ਹੱਥ।"],
    def: ["The emergency hormone from the adrenal gland, preparing the body for fight or flight.",
          "ਐਡਰੀਨਲ ਗ੍ਰੰਥੀ ਦਾ ਐਮਰਜੈਂਸੀ ਹਾਰਮੋਨ, ਜੋ ਸਰੀਰ ਨੂੰ ਲੜਨ ਜਾਂ ਭੱਜਣ ਲਈ ਤਿਆਰ ਕਰਦਾ ਹੈ।"],
    board: ["Known as the **fight-or-flight hormone**; raises heartbeat and breathing rate.",
            "ਇਸ ਨੂੰ **ਲੜੋ-ਜਾਂ-ਭੱਜੋ ਹਾਰਮੋਨ** ਕਹਿੰਦੇ ਹਨ; ਇਹ ਦਿਲ ਦੀ ਧੜਕਣ ਤੇ ਸਾਹ ਵਧਾਉਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["phototropism"] = {
    ctx: ["A money plant on the windowsill slowly bending toward the light.",
          "ਖਿੜਕੀ 'ਤੇ ਰੱਖਿਆ ਮਨੀ ਪਲਾਂਟ ਹੌਲੀ-ਹੌਲੀ ਰੌਸ਼ਨੀ ਵੱਲ ਝੁਕਣਾ।"],
    def: ["Growth movement of a plant part in response to the direction of light.",
          "ਪ੍ਰਕਾਸ਼ ਦੀ ਦਿਸ਼ਾ ਪ੍ਰਤੀ ਪੌਦੇ ਦੇ ਹਿੱਸੇ ਦੀ ਵਾਧਾ ਗਤੀ।"],
    board: ["Shoots are **positively phototropic**, roots are **negatively phototropic**.",
            "ਤਣੇ **ਧਨਾਤਮਕ ਪ੍ਰਕਾਸ਼ ਅਨੁਵਰਤੀ**, ਜੜ੍ਹਾਂ **ਰਿਣਾਤਮਕ ਪ੍ਰਕਾਸ਼ ਅਨੁਵਰਤੀ** ਹਨ।"],
    vvip: true
  };
  T["auxin"] = {
    ctx: ["The growth chemical that gathers on the shady side and bends the stem.",
          "ਵਾਧੇ ਵਾਲਾ ਰਸਾਇਣ ਜੋ ਛਾਂ ਵਾਲੇ ਪਾਸੇ ਇਕੱਠਾ ਹੋ ਕੇ ਤਣਾ ਝੁਕਾ ਦਿੰਦਾ ਹੈ।"],
    def: ["A plant hormone that promotes cell elongation and controls tropic movements.",
          "ਪੌਦਾ ਹਾਰਮੋਨ ਜੋ ਕੋਸ਼ਿਕਾ ਦੀ ਲੰਬਾਈ ਵਧਾਉਂਦਾ ਤੇ ਅਨੁਵਰਤੀ ਗਤੀਆਂ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ।"],
    board: ["Auxin moves to the **shaded side**, making that side grow longer and bend the shoot.",
            "ਆਕਸਿਨ **ਛਾਂ ਵਾਲੇ ਪਾਸੇ** ਜਾਂਦਾ ਹੈ, ਉਹ ਪਾਸਾ ਵੱਧ ਵਧਦਾ ਹੈ ਤੇ ਤਣਾ ਝੁਕ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["abscisic acid"] = {
    ctx: ["The stop-growing signal that makes leaves fall in autumn.",
          "'ਵਧਣਾ ਬੰਦ ਕਰੋ' ਦਾ ਸੰਕੇਤ ਜੋ ਪੱਤਝੜ ਵਿੱਚ ਪੱਤੇ ਝਾੜ ਦਿੰਦਾ ਹੈ।"],
    def: ["A plant hormone that inhibits growth and causes wilting and leaf fall.",
          "ਪੌਦਾ ਹਾਰਮੋਨ ਜੋ ਵਾਧਾ ਰੋਕਦਾ ਹੈ ਅਤੇ ਮੁਰਝਾਉਣਾ ਤੇ ਪੱਤੇ ਝੜਨਾ ਕਰਾਉਂਦਾ ਹੈ।"],
    board: ["It is the only **growth inhibitor** among the four plant hormones you study.",
            "ਤੁਹਾਡੇ ਚਾਰ ਪੌਦਾ ਹਾਰਮੋਨਾਂ ਵਿੱਚੋਂ ਇਹ ਇੱਕੋ-ਇੱਕ **ਵਾਧਾ ਰੋਕੂ** ਹੈ।"]
  };

  /* ================= Ch 8 · How do Organisms Reproduce ================== */
  T["binary fission"] = {
    ctx: ["One cell neatly splitting into two equal halves, like slicing a roti in two.",
          "ਇੱਕ ਕੋਸ਼ਿਕਾ ਦਾ ਦੋ ਬਰਾਬਰ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਣਾ, ਜਿਵੇਂ ਰੋਟੀ ਦੋ ਹਿੱਸੇ ਕਰਨਾ।"],
    def: ["An asexual method in which a parent cell divides into two identical daughter cells.",
          "ਅਲਿੰਗੀ ਵਿਧੀ ਜਿਸ ਵਿੱਚ ਜਨਕ ਕੋਸ਼ਿਕਾ ਦੋ ਇੱਕੋ ਜਿਹੀਆਂ ਧੀ-ਕੋਸ਼ਿਕਾਵਾਂ ਵਿੱਚ ਵੰਡੀ ਜਾਂਦੀ ਹੈ।"],
    board: ["Examples: **Amoeba and Leishmania** (which divides along a definite plane).",
            "ਉਦਾਹਰਣ: **ਅਮੀਬਾ ਤੇ ਲੈਸ਼ਮੇਨੀਆ** (ਜੋ ਨਿਸ਼ਚਿਤ ਤਲ ਦੇ ਨਾਲ ਵੰਡਦਾ ਹੈ)।"],
    vvip: true
  };
  T["multiple fission"] = {
    ctx: ["One cell bursting into many at once, like a pod scattering seeds.",
          "ਇੱਕ ਕੋਸ਼ਿਕਾ ਦਾ ਇੱਕੋ ਵਾਰ ਕਈਆਂ ਵਿੱਚ ਫੁੱਟਣਾ, ਜਿਵੇਂ ਫਲੀ ਬੀਜ ਖਿਲਾਰੇ।"],
    def: ["A parent cell divides into many daughter cells simultaneously.",
          "ਜਨਕ ਕੋਸ਼ਿਕਾ ਇੱਕੋ ਸਮੇਂ ਕਈ ਧੀ-ਕੋਸ਼ਿਕਾਵਾਂ ਵਿੱਚ ਵੰਡੀ ਜਾਂਦੀ ਹੈ।"],
    board: ["Classic example: **Plasmodium**, the malaria parasite.",
            "ਮਸ਼ਹੂਰ ਉਦਾਹਰਣ: **ਪਲਾਜ਼ਮੋਡੀਅਮ**, ਮਲੇਰੀਏ ਦਾ ਪਰਜੀਵੀ।"],
    vvip: true
  };
  T["vegetative propagation"] = {
    ctx: ["Growing a new rose bush from a cut stem pushed into soil.",
          "ਮਿੱਟੀ ਵਿੱਚ ਲਾਈ ਕਲਮ ਤੋਂ ਨਵਾਂ ਗੁਲਾਬ ਦਾ ਬੂਟਾ ਉਗਾਉਣਾ।"],
    def: ["New plants develop from vegetative parts such as roots, stems or leaves.",
          "ਜੜ੍ਹ, ਤਣਾ ਜਾਂ ਪੱਤੇ ਵਰਗੇ ਕਾਇਕ ਅੰਗਾਂ ਤੋਂ ਨਵੇਂ ਪੌਦੇ ਬਣਦੇ ਹਨ।"],
    board: ["Bananas and roses are grown this way because they **bear no viable seeds**.",
            "ਕੇਲਾ ਤੇ ਗੁਲਾਬ ਇਸੇ ਤਰ੍ਹਾਂ ਉਗਾਏ ਜਾਂਦੇ ਹਨ ਕਿਉਂਕਿ ਇਨ੍ਹਾਂ ਦੇ **ਜੀਵਤ ਬੀਜ ਨਹੀਂ** ਬਣਦੇ।"],
    vvip: true
  };
  T["pollination"] = {
    ctx: ["A bee carrying yellow dust from one flower to the next.",
          "ਮਧੂ-ਮੱਖੀ ਦਾ ਇੱਕ ਫੁੱਲ ਤੋਂ ਦੂਜੇ ਤੱਕ ਪੀਲੀ ਧੂੜ ਲੈ ਜਾਣਾ।"],
    def: ["Transfer of pollen grains from the anther to the stigma of a flower.",
          "ਪਰਾਗਕਣਾਂ ਦਾ ਪਰਾਗਕੋਸ਼ ਤੋਂ ਫੁੱਲ ਦੇ ਵਰਤਿਕਾਗਰ ਤੱਕ ਤਬਾਦਲਾ।"],
    board: ["**Self-pollination** = same flower; **cross-pollination** = different flower.",
            "**ਸਵੈ-ਪਰਾਗਣ** = ਇੱਕੋ ਫੁੱਲ; **ਪਰ-ਪਰਾਗਣ** = ਵੱਖਰਾ ਫੁੱਲ।"],
    vvip: true
  };
  T["fertilisation"] = {
    ctx: ["The moment two gametes merge and a brand-new life begins.",
          "ਉਹ ਪਲ ਜਦੋਂ ਦੋ ਯੁਗਮਕ ਮਿਲਦੇ ਹਨ ਤੇ ਨਵਾਂ ਜੀਵਨ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ।"],
    def: ["Fusion of the male and female gametes to form a zygote.",
          "ਨਰ ਤੇ ਮਾਦਾ ਯੁਗਮਕਾਂ ਦੇ ਮਿਲਣ ਨਾਲ ਯੁਗਮਨਜ ਬਣਨਾ।"],
    board: ["In humans fertilisation happens in the **fallopian tube**, not the uterus.",
            "ਮਨੁੱਖਾਂ ਵਿੱਚ ਨਿਸ਼ੇਚਨ **ਫੈਲੋਪੀਅਨ ਨਲੀ** ਵਿੱਚ ਹੁੰਦਾ ਹੈ, ਬੱਚੇਦਾਨੀ ਵਿੱਚ ਨਹੀਂ।"],
    vvip: true
  };
  T["placenta"] = {
    ctx: ["The living bridge that feeds a baby before it is born.",
          "ਜੀਵਤ ਪੁਲ ਜੋ ਜਨਮ ਤੋਂ ਪਹਿਲਾਂ ਬੱਚੇ ਨੂੰ ਭੋਜਨ ਦਿੰਦਾ ਹੈ।"],
    def: ["A disc-like tissue that supplies nutrients and oxygen from mother to embryo.",
          "ਤਸ਼ਤਰੀਨੁਮਾ ਟਿਸ਼ੂ ਜੋ ਮਾਂ ਤੋਂ ਭਰੂਣ ਨੂੰ ਪੋਸ਼ਕ ਤੱਤ ਤੇ ਆਕਸੀਜਨ ਪਹੁੰਚਾਉਂਦਾ ਹੈ।"],
    board: ["**Villi** increase its surface area for efficient exchange.",
            "**ਵਿਲਾਈ** ਇਸ ਦਾ ਸਤਹੀ ਖੇਤਰਫਲ ਵਧਾਉਂਦੇ ਹਨ ਤਾਂ ਜੋ ਵਟਾਂਦਰਾ ਵਧੀਆ ਹੋਵੇ।"],
    vvip: true
  };
  T["regeneration"] = {
    ctx: ["A cut Planaria growing back into a whole animal.",
          "ਕੱਟਿਆ ਹੋਇਆ ਪਲੈਨੇਰੀਆ ਮੁੜ ਪੂਰਾ ਜੀਵ ਬਣ ਜਾਂਦਾ ਹੈ।"],
    def: ["The ability of an organism to regrow lost or damaged body parts.",
          "ਜੀਵ ਦੀ ਗੁਆਚੇ ਜਾਂ ਨੁਕਸਾਨੇ ਅੰਗ ਮੁੜ ਉਗਾਉਣ ਦੀ ਯੋਗਤਾ।"],
    board: ["Seen in **Hydra and Planaria** — this is not the same as reproduction.",
            "**ਹਾਈਡ੍ਰਾ ਤੇ ਪਲੈਨੇਰੀਆ** ਵਿੱਚ ਵੇਖਿਆ ਜਾਂਦਾ ਹੈ — ਇਹ ਪ੍ਰਜਨਨ ਨਹੀਂ ਹੈ।"]
  };
  T["budding"] = {
    ctx: ["A small bump growing on Hydra that later drops off as a new individual.",
          "ਹਾਈਡ੍ਰਾ 'ਤੇ ਉੱਗਿਆ ਛੋਟਾ ਉਭਾਰ ਜੋ ਬਾਅਦ ਵਿੱਚ ਵੱਖ ਹੋ ਕੇ ਨਵਾਂ ਜੀਵ ਬਣਦਾ ਹੈ।"],
    def: ["A new organism develops from an outgrowth or bud on the parent body.",
          "ਜਨਕ ਸਰੀਰ 'ਤੇ ਉੱਗੀ ਕਲੀ ਤੋਂ ਨਵਾਂ ਜੀਵ ਬਣਦਾ ਹੈ।"],
    board: ["Examples: **Hydra and yeast**.",
            "ਉਦਾਹਰਣ: **ਹਾਈਡ੍ਰਾ ਤੇ ਖ਼ਮੀਰ**।"]
  };

  /* ================= Ch 9 · Heredity and Evolution ====================== */
  T["dominant trait"] = {
    ctx: ["The louder voice in a pair — it is heard even when the other speaks.",
          "ਜੋੜੇ ਵਿੱਚ ਉੱਚੀ ਆਵਾਜ਼ — ਦੂਜੇ ਦੇ ਬੋਲਣ 'ਤੇ ਵੀ ਇਹੀ ਸੁਣਦੀ ਹੈ।"],
    def: ["The trait that appears in the F1 generation even when only one allele is present.",
          "ਉਹ ਲੱਛਣ ਜੋ F1 ਪੀੜ੍ਹੀ ਵਿੱਚ ਇੱਕ ਹੀ ਐਲੀਲ ਹੋਣ 'ਤੇ ਵੀ ਪ੍ਰਗਟ ਹੁੰਦਾ ਹੈ।"],
    formula: "Tt -> tall (T dominant)",
    board: ["In Mendel's pea cross, **all F1 plants were tall** — tallness is dominant.",
            "ਮੈਂਡਲ ਦੇ ਮਟਰ ਕਰਾਸ ਵਿੱਚ **ਸਾਰੇ F1 ਪੌਦੇ ਲੰਮੇ ਸਨ** — ਲੰਬਾਈ ਪ੍ਰਭਾਵੀ ਹੈ।"],
    vvip: true
  };
  T["monohybrid cross"] = {
    ctx: ["Tracking just one feature — say height — across two generations.",
          "ਸਿਰਫ਼ ਇੱਕ ਲੱਛਣ — ਜਿਵੇਂ ਕੱਦ — ਦੋ ਪੀੜ੍ਹੀਆਂ ਤੱਕ ਵੇਖਣਾ।"],
    def: ["A cross between parents differing in a single pair of contrasting traits.",
          "ਇੱਕ ਜੋੜੇ ਵਿਰੋਧੀ ਲੱਛਣਾਂ ਵਿੱਚ ਵੱਖਰੇ ਜਨਕਾਂ ਵਿਚਕਾਰ ਕਰਾਸ।"],
    formula: "TT x tt -> F2 = 3:1",
    board: ["F2 phenotype ratio **3:1**, genotype ratio **1:2:1** — memorise both.",
            "F2 ਦਿੱਖ ਅਨੁਪਾਤ **3:1**, ਜੀਨ ਅਨੁਪਾਤ **1:2:1** — ਦੋਵੇਂ ਯਾਦ ਕਰੋ।"],
    vvip: true
  };
  T["dihybrid cross"] = {
    ctx: ["Following two features at once — shape and colour of the seed together.",
          "ਇੱਕੋ ਸਮੇਂ ਦੋ ਲੱਛਣ ਵੇਖਣਾ — ਬੀਜ ਦੀ ਸ਼ਕਲ ਤੇ ਰੰਗ ਇਕੱਠੇ।"],
    def: ["A cross between parents differing in two pairs of contrasting traits.",
          "ਦੋ ਜੋੜੇ ਵਿਰੋਧੀ ਲੱਛਣਾਂ ਵਿੱਚ ਵੱਖਰੇ ਜਨਕਾਂ ਵਿਚਕਾਰ ਕਰਾਸ।"],
    formula: "F2 ratio = 9:3:3:1",
    board: ["The **9:3:3:1** ratio proves traits are **inherited independently**.",
            "**9:3:3:1** ਅਨੁਪਾਤ ਸਾਬਤ ਕਰਦਾ ਹੈ ਕਿ ਲੱਛਣ **ਸੁਤੰਤਰ ਰੂਪ ਵਿੱਚ ਵਿਰਸੇ** ਮਿਲਦੇ ਹਨ।"],
    vvip: true
  };
  T["genotype"] = {
    ctx: ["The hidden genetic code — the recipe, not the finished dish.",
          "ਲੁਕਿਆ ਜੈਨੇਟਿਕ ਕੋਡ — ਵਿਅੰਜਨ, ਬਣਿਆ ਪਕਵਾਨ ਨਹੀਂ।"],
    def: ["The genetic makeup of an organism, written as allele pairs.",
          "ਜੀਵ ਦੀ ਜੈਨੇਟਿਕ ਬਣਤਰ, ਜੋ ਐਲੀਲ ਜੋੜਿਆਂ ਵਜੋਂ ਲਿਖੀ ਜਾਂਦੀ ਹੈ।"],
    formula: "TT, Tt, tt",
    board: ["**Genotype = genes (TT); phenotype = appearance (tall)** — never mix the two.",
            "**ਜੀਨ ਪ੍ਰਰੂਪ = ਜੀਨ (TT); ਦਿੱਖ ਪ੍ਰਰੂਪ = ਦਿੱਖ (ਲੰਮਾ)** — ਦੋਵੇਂ ਨਾ ਰਲਾਓ।"],
    vvip: true
  };
  T["chromosome"] = {
    ctx: ["Thread-like packets in the nucleus that carry the family instruction manual.",
          "ਨਿਊਕਲੀਅਸ ਵਿੱਚ ਧਾਗੇ ਵਰਗੇ ਪੈਕਟ ਜੋ ਪਰਿਵਾਰਕ ਹਦਾਇਤ-ਪੁਸਤਕ ਲੈ ਕੇ ਚੱਲਦੇ ਹਨ।"],
    def: ["Thread-like structures in the nucleus that carry genes.",
          "ਨਿਊਕਲੀਅਸ ਵਿੱਚ ਧਾਗੇ ਵਰਗੀਆਂ ਬਣਤਰਾਂ ਜੋ ਜੀਨ ਰੱਖਦੀਆਂ ਹਨ।"],
    board: ["Humans have **23 pairs**; sex is decided by **XX (girl) or XY (boy)**.",
            "ਮਨੁੱਖਾਂ ਵਿੱਚ **23 ਜੋੜੇ** ਹਨ; ਲਿੰਗ **XX (ਕੁੜੀ) ਜਾਂ XY (ਮੁੰਡਾ)** ਤੋਂ ਤੈਅ ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["homologous organs"] = {
    ctx: ["A human arm and a bat wing — same bones inside, different jobs outside.",
          "ਮਨੁੱਖੀ ਬਾਂਹ ਤੇ ਚਮਗਿੱਦੜ ਦਾ ਖੰਭ — ਅੰਦਰ ਹੱਡੀਆਂ ਇੱਕੋ, ਬਾਹਰ ਕੰਮ ਵੱਖਰਾ।"],
    def: ["Organs with the same basic structure but different functions.",
          "ਉਹ ਅੰਗ ਜਿਨ੍ਹਾਂ ਦੀ ਮੂਲ ਬਣਤਰ ਇੱਕੋ ਪਰ ਕੰਮ ਵੱਖਰੇ ਹੋਣ।"],
    board: ["They prove a **common ancestor** — the evidence for divergent evolution.",
            "ਇਹ **ਸਾਂਝੇ ਪੂਰਵਜ** ਦਾ ਸਬੂਤ ਹਨ — ਅਪਸਾਰੀ ਵਿਕਾਸ ਦਾ ਪ੍ਰਮਾਣ।"],
    vvip: true
  };
  T["analogous organs"] = {
    ctx: ["A bat wing and an insect wing — same job, completely different build.",
          "ਚਮਗਿੱਦੜ ਦਾ ਖੰਭ ਤੇ ਕੀੜੇ ਦਾ ਖੰਭ — ਕੰਮ ਇੱਕੋ, ਬਣਤਰ ਬਿਲਕੁਲ ਵੱਖਰੀ।"],
    def: ["Organs with different basic structures but the same function.",
          "ਉਹ ਅੰਗ ਜਿਨ੍ਹਾਂ ਦੀ ਮੂਲ ਬਣਤਰ ਵੱਖਰੀ ਪਰ ਕੰਮ ਇੱਕੋ ਹੋਵੇ।"],
    board: ["They show **convergent evolution**, not a common ancestor.",
            "ਇਹ **ਅਭਿਸਾਰੀ ਵਿਕਾਸ** ਦਰਸਾਉਂਦੇ ਹਨ, ਸਾਂਝਾ ਪੂਰਵਜ ਨਹੀਂ।"],
    vvip: true
  };
  T["speciation"] = {
    ctx: ["A river splitting one population in two until they can no longer interbreed.",
          "ਦਰਿਆ ਦਾ ਇੱਕ ਆਬਾਦੀ ਨੂੰ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਣਾ, ਜਦ ਤੱਕ ਉਹ ਆਪਸ ਵਿੱਚ ਪ੍ਰਜਨਨ ਨਾ ਕਰ ਸਕਣ।"],
    def: ["The process by which new species arise from an existing population.",
          "ਉਹ ਪ੍ਰਕਿਰਿਆ ਜਿਸ ਨਾਲ ਮੌਜੂਦਾ ਆਬਾਦੀ ਤੋਂ ਨਵੀਆਂ ਜਾਤੀਆਂ ਬਣਦੀਆਂ ਹਨ।"],
    board: ["Main causes: **geographical isolation, genetic drift and natural selection**.",
            "ਮੁੱਖ ਕਾਰਨ: **ਭੂਗੋਲਿਕ ਇਕੱਲਾਪਣ, ਜੈਨੇਟਿਕ ਵਹਾਅ ਤੇ ਕੁਦਰਤੀ ਚੋਣ**।"],
    vvip: true
  };
  T["fossil"] = {
    ctx: ["A stone imprint of a creature that died millions of years ago.",
          "ਲੱਖਾਂ ਸਾਲ ਪਹਿਲਾਂ ਮਰੇ ਜੀਵ ਦੀ ਪੱਥਰ ਵਿੱਚ ਛਾਪ।"],
    def: ["The preserved remains or impressions of organisms from the distant past.",
          "ਦੂਰ ਅਤੀਤ ਦੇ ਜੀਵਾਂ ਦੇ ਸੁਰੱਖਿਅਤ ਅਵਸ਼ੇਸ਼ ਜਾਂ ਛਾਪਾਂ।"],
    board: ["Deeper fossils are **older**; dating uses the **carbon-14** method.",
            "ਡੂੰਘੇ ਪਥਰਾਟ **ਵੱਧ ਪੁਰਾਣੇ** ਹੁੰਦੇ ਹਨ; ਉਮਰ **ਕਾਰਬਨ-14** ਵਿਧੀ ਨਾਲ ਪਤਾ ਲੱਗਦੀ ਹੈ।"]
  };
  /* ================= Ch 10 · Light: Reflection and Refraction =========== */
  T["concave mirror"] = {
    ctx: ["A shaving or make-up mirror that shows your face bigger when held close.",
          "ਸ਼ੇਵਿੰਗ ਜਾਂ ਮੇਕਅੱਪ ਵਾਲਾ ਸ਼ੀਸ਼ਾ ਜੋ ਨੇੜੇ ਰੱਖਣ 'ਤੇ ਚਿਹਰਾ ਵੱਡਾ ਦਿਖਾਉਂਦਾ ਹੈ।"],
    def: ["A spherical mirror whose reflecting surface curves inward, converging light.",
          "ਗੋਲਾਕਾਰ ਦਰਪਣ ਜਿਸ ਦੀ ਪਰਾਵਰਤਕ ਸਤਹ ਅੰਦਰ ਵੱਲ ਮੁੜੀ ਹੋਵੇ ਤੇ ਪ੍ਰਕਾਸ਼ ਇਕੱਠਾ ਕਰੇ।"],
    formula: "1/v + 1/u = 1/f",
    board: ["Object at **C** gives an image at **C**: real, inverted and the **same size**.",
            "ਵਸਤੂ **C** 'ਤੇ ਹੋਵੇ ਤਾਂ ਪ੍ਰਤਿਬਿੰਬ **C** 'ਤੇ: ਵਾਸਤਵਿਕ, ਉਲਟਾ ਤੇ **ਬਰਾਬਰ ਆਕਾਰ**।"],
    vvip: true
  };
  T["convex mirror"] = {
    ctx: ["The wide-angle mirror on a scooter that shows the whole road behind.",
          "ਸਕੂਟਰ ਦਾ ਚੌੜਾ ਸ਼ੀਸ਼ਾ ਜੋ ਪਿੱਛੇ ਦੀ ਪੂਰੀ ਸੜਕ ਦਿਖਾਉਂਦਾ ਹੈ।"],
    def: ["A spherical mirror whose reflecting surface bulges outward, diverging light.",
          "ਗੋਲਾਕਾਰ ਦਰਪਣ ਜਿਸ ਦੀ ਪਰਾਵਰਤਕ ਸਤਹ ਬਾਹਰ ਵੱਲ ਉੱਭਰੀ ਹੋਵੇ ਤੇ ਪ੍ਰਕਾਸ਼ ਖਿਲਾਰੇ।"],
    board: ["It **always** gives a virtual, erect, diminished image — hence the wide field of view.",
            "ਇਹ **ਹਮੇਸ਼ਾ** ਆਭਾਸੀ, ਸਿੱਧਾ ਤੇ ਛੋਟਾ ਪ੍ਰਤਿਬਿੰਬ ਦਿੰਦਾ ਹੈ — ਇਸੇ ਲਈ ਦ੍ਰਿਸ਼ ਖੇਤਰ ਚੌੜਾ ਹੈ।"],
    vvip: true
  };
  T["refractive index"] = {
    ctx: ["A number saying how much a medium slows light down and bends it.",
          "ਇੱਕ ਸੰਖਿਆ ਜੋ ਦੱਸਦੀ ਹੈ ਕਿ ਮਾਧਿਅਮ ਪ੍ਰਕਾਸ਼ ਨੂੰ ਕਿੰਨਾ ਹੌਲੀ ਕਰਕੇ ਮੋੜਦਾ ਹੈ।"],
    def: ["The ratio of the speed of light in vacuum to its speed in a medium.",
          "ਨਿਰਵਾਤ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ ਦੀ ਚਾਲ ਅਤੇ ਮਾਧਿਅਮ ਵਿੱਚ ਚਾਲ ਦਾ ਅਨੁਪਾਤ।"],
    formula: "n = c/v",
    board: ["Higher refractive index means **light travels slower** and bends more — diamond is 2.42.",
            "ਵੱਧ ਅਪਵਰਤਨ ਅੰਕ ਦਾ ਅਰਥ **ਪ੍ਰਕਾਸ਼ ਹੌਲੀ ਚੱਲਦਾ** ਤੇ ਵੱਧ ਮੁੜਦਾ ਹੈ — ਹੀਰੇ ਦਾ 2.42 ਹੈ।"],
    vvip: true
  };
  T["power of a lens"] = {
    ctx: ["The number on a spectacle prescription, like -2.5 D.",
          "ਐਨਕ ਦੇ ਨੁਸਖ਼ੇ 'ਤੇ ਲਿਖੀ ਸੰਖਿਆ, ਜਿਵੇਂ -2.5 D।"],
    def: ["The degree of convergence or divergence of light produced by a lens.",
          "ਲੈਂਜ਼ ਦੁਆਰਾ ਪ੍ਰਕਾਸ਼ ਨੂੰ ਇਕੱਠਾ ਜਾਂ ਖਿਲਾਰਨ ਦੀ ਮਾਤਰਾ।"],
    formula: "P = 1/f (f in metres)",
    board: ["Unit is the **dioptre (D)**; convex lenses are **+**, concave lenses are **-**.",
            "ਇਕਾਈ **ਡਾਇਆਪਟਰ (D)** ਹੈ; ਉੱਤਲ ਲੈਂਜ਼ **+**, ਅਵਤਲ ਲੈਂਜ਼ **-** ਹੁੰਦੇ ਹਨ।"],
    vvip: true
  };
  T["magnification"] = {
    ctx: ["How many times bigger or smaller the image looks than the object.",
          "ਪ੍ਰਤਿਬਿੰਬ ਵਸਤੂ ਨਾਲੋਂ ਕਿੰਨੇ ਗੁਣਾ ਵੱਡਾ ਜਾਂ ਛੋਟਾ ਦਿਸਦਾ ਹੈ।"],
    def: ["The ratio of the height of the image to the height of the object.",
          "ਪ੍ਰਤਿਬਿੰਬ ਦੀ ਉਚਾਈ ਅਤੇ ਵਸਤੂ ਦੀ ਉਚਾਈ ਦਾ ਅਨੁਪਾਤ।"],
    formula: "m = h'/h = -v/u",
    board: ["A **negative m means a real, inverted image**; positive means virtual and erect.",
            "**ਰਿਣਾਤਮਕ m ਦਾ ਅਰਥ ਵਾਸਤਵਿਕ, ਉਲਟਾ ਪ੍ਰਤਿਬਿੰਬ**; ਧਨਾਤਮਕ ਦਾ ਅਰਥ ਆਭਾਸੀ ਤੇ ਸਿੱਧਾ।"],
    vvip: true
  };
  T["real image"] = {
    ctx: ["The image a cinema projector throws onto a screen — you can catch it.",
          "ਸਿਨੇਮਾ ਪ੍ਰੋਜੈਕਟਰ ਦਾ ਪਰਦੇ 'ਤੇ ਸੁੱਟਿਆ ਪ੍ਰਤਿਬਿੰਬ — ਇਸ ਨੂੰ ਫੜਿਆ ਜਾ ਸਕਦਾ ਹੈ।"],
    def: ["An image formed when rays actually meet; it can be caught on a screen.",
          "ਉਹ ਪ੍ਰਤਿਬਿੰਬ ਜੋ ਕਿਰਨਾਂ ਦੇ ਸੱਚਮੁੱਚ ਮਿਲਣ ਨਾਲ ਬਣੇ; ਇਹ ਪਰਦੇ 'ਤੇ ਫੜਿਆ ਜਾ ਸਕਦਾ ਹੈ।"],
    board: ["Real images are **always inverted**; virtual images are **always erect**.",
            "ਵਾਸਤਵਿਕ ਪ੍ਰਤਿਬਿੰਬ **ਹਮੇਸ਼ਾ ਉਲਟੇ**; ਆਭਾਸੀ ਪ੍ਰਤਿਬਿੰਬ **ਹਮੇਸ਼ਾ ਸਿੱਧੇ** ਹੁੰਦੇ ਹਨ।"],
    vvip: true
  };

  /* ================= Ch 11 · Human Eye and Colourful World ============== */
  T["accommodation"] = {
    ctx: ["Your eye lens instantly refocusing from the blackboard to your notebook.",
          "ਅੱਖ ਦੇ ਲੈਂਜ਼ ਦਾ ਬਲੈਕਬੋਰਡ ਤੋਂ ਕਾਪੀ 'ਤੇ ਤੁਰੰਤ ਫੋਕਸ ਬਦਲਣਾ।"],
    def: ["The ability of the eye lens to adjust its focal length to see near and far.",
          "ਅੱਖ ਦੇ ਲੈਂਜ਼ ਦੀ ਫੋਕਸ ਦੂਰੀ ਬਦਲ ਕੇ ਨੇੜੇ ਤੇ ਦੂਰ ਵੇਖਣ ਦੀ ਯੋਗਤਾ।"],
    board: ["The **ciliary muscles** change the lens shape; focal length can never become zero.",
            "**ਸਿਲਿਅਰੀ ਪੱਠੇ** ਲੈਂਜ਼ ਦੀ ਸ਼ਕਲ ਬਦਲਦੇ ਹਨ; ਫੋਕਸ ਦੂਰੀ ਕਦੇ ਸਿਫ਼ਰ ਨਹੀਂ ਹੋ ਸਕਦੀ।"],
    vvip: true
  };
  T["myopia"] = {
    ctx: ["A classmate who reads a book fine but cannot see the blackboard.",
          "ਉਹ ਸਹਿਪਾਠੀ ਜੋ ਕਿਤਾਬ ਤਾਂ ਪੜ੍ਹ ਲੈਂਦਾ ਹੈ ਪਰ ਬਲੈਕਬੋਰਡ ਨਹੀਂ ਵੇਖ ਸਕਦਾ।"],
    def: ["Near-sightedness: distant objects appear blurred as the image forms before the retina.",
          "ਨਿਕਟ ਦ੍ਰਿਸ਼ਟੀ: ਦੂਰ ਦੀਆਂ ਚੀਜ਼ਾਂ ਧੁੰਦਲੀਆਂ ਦਿਸਦੀਆਂ ਹਨ ਕਿਉਂਕਿ ਪ੍ਰਤਿਬਿੰਬ ਰੈਟੀਨਾ ਤੋਂ ਪਹਿਲਾਂ ਬਣਦਾ ਹੈ।"],
    board: ["Corrected with a **concave lens** — remember: **myopia = minus lens**.",
            "**ਅਵਤਲ ਲੈਂਜ਼** ਨਾਲ ਠੀਕ ਹੁੰਦੀ ਹੈ — ਯਾਦ ਰੱਖੋ: **ਨਿਕਟ ਦ੍ਰਿਸ਼ਟੀ = ਮਾਈਨਸ ਲੈਂਜ਼**।"],
    vvip: true
  };
  T["hypermetropia"] = {
    ctx: ["An elder who holds the newspaper far away to read it clearly.",
          "ਉਹ ਬਜ਼ੁਰਗ ਜੋ ਅਖ਼ਬਾਰ ਦੂਰ ਰੱਖ ਕੇ ਪੜ੍ਹਦਾ ਹੈ।"],
    def: ["Far-sightedness: near objects appear blurred as the image forms behind the retina.",
          "ਦੂਰ ਦ੍ਰਿਸ਼ਟੀ: ਨੇੜੇ ਦੀਆਂ ਚੀਜ਼ਾਂ ਧੁੰਦਲੀਆਂ ਦਿਸਦੀਆਂ ਹਨ ਕਿਉਂਕਿ ਪ੍ਰਤਿਬਿੰਬ ਰੈਟੀਨਾ ਦੇ ਪਿੱਛੇ ਬਣਦਾ ਹੈ।"],
    board: ["Corrected with a **convex lens** — **hypermetropia = plus lens**.",
            "**ਉੱਤਲ ਲੈਂਜ਼** ਨਾਲ ਠੀਕ ਹੁੰਦੀ ਹੈ — **ਦੂਰ ਦ੍ਰਿਸ਼ਟੀ = ਪਲੱਸ ਲੈਂਜ਼**।"],
    vvip: true
  };
  T["dispersion"] = {
    ctx: ["A rainbow appearing after rain, or sunlight through a glass prism.",
          "ਮੀਂਹ ਤੋਂ ਬਾਅਦ ਸਤਰੰਗੀ ਪੀਂਘ, ਜਾਂ ਕੱਚ ਦੇ ਪ੍ਰਿਜ਼ਮ ਵਿੱਚੋਂ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ।"],
    def: ["Splitting of white light into its seven constituent colours.",
          "ਚਿੱਟੇ ਪ੍ਰਕਾਸ਼ ਦਾ ਆਪਣੇ ਸੱਤ ਰੰਗਾਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾਣਾ।"],
    board: ["**Red bends least, violet bends most** — that is why VIBGYOR forms in that order.",
            "**ਲਾਲ ਸਭ ਤੋਂ ਘੱਟ, ਬੈਂਗਣੀ ਸਭ ਤੋਂ ਵੱਧ ਮੁੜਦਾ ਹੈ** — ਇਸੇ ਲਈ VIBGYOR ਇਸ ਕ੍ਰਮ ਵਿੱਚ ਬਣਦਾ ਹੈ।"],
    vvip: true
  };
  T["scattering of light"] = {
    ctx: ["Why the sky is blue at noon and red at sunset.",
          "ਕਿਉਂ ਅਸਮਾਨ ਦੁਪਹਿਰੇ ਨੀਲਾ ਤੇ ਸੂਰਜ ਡੁੱਬਣ ਵੇਲੇ ਲਾਲ ਹੁੰਦਾ ਹੈ।"],
    def: ["Spreading of light in different directions by particles in a medium.",
          "ਮਾਧਿਅਮ ਦੇ ਕਣਾਂ ਦੁਆਰਾ ਪ੍ਰਕਾਸ਼ ਦਾ ਵੱਖ-ਵੱਖ ਦਿਸ਼ਾਵਾਂ ਵਿੱਚ ਖਿੰਡਣਾ।"],
    board: ["**Blue scatters most** (sky is blue); at sunset light travels far so only **red** survives.",
            "**ਨੀਲਾ ਸਭ ਤੋਂ ਵੱਧ ਖਿੰਡਦਾ ਹੈ** (ਅਸਮਾਨ ਨੀਲਾ); ਸੂਰਜ ਡੁੱਬਣ ਵੇਲੇ ਸਿਰਫ਼ **ਲਾਲ** ਬਚਦਾ ਹੈ।"],
    vvip: true
  };
  T["tyndall effect"] = {
    ctx: ["Sunbeams made visible by dust in a dark room, or headlights in fog.",
          "ਹਨੇਰੇ ਕਮਰੇ ਵਿੱਚ ਧੂੜ ਨਾਲ ਦਿਸਦੀਆਂ ਸੂਰਜ ਦੀਆਂ ਕਿਰਨਾਂ, ਜਾਂ ਧੁੰਦ ਵਿੱਚ ਹੈੱਡਲਾਈਟ।"],
    def: ["Scattering of a light beam by colloidal particles, making its path visible.",
          "ਕੋਲਾਇਡੀ ਕਣਾਂ ਦੁਆਰਾ ਪ੍ਰਕਾਸ਼ ਪੁੰਜ ਦਾ ਖਿੰਡਾਅ, ਜਿਸ ਨਾਲ ਇਸ ਦਾ ਰਾਹ ਦਿਸਦਾ ਹੈ।"],
    board: ["Needs **particles comparable in size to the wavelength** of light.",
            "ਇਸ ਲਈ **ਪ੍ਰਕਾਸ਼ ਦੀ ਤਰੰਗ ਲੰਬਾਈ ਜਿੰਨੇ ਕਣ** ਚਾਹੀਦੇ ਹਨ।"],
    vvip: true
  };
  T["atmospheric refraction"] = {
    ctx: ["Stars twinkling at night while planets shine steadily.",
          "ਰਾਤ ਨੂੰ ਤਾਰਿਆਂ ਦਾ ਟਿਮਟਿਮਾਉਣਾ ਜਦਕਿ ਗ੍ਰਹਿ ਸਥਿਰ ਚਮਕਦੇ ਹਨ।"],
    def: ["Bending of light as it passes through air layers of changing density.",
          "ਬਦਲਦੀ ਘਣਤਾ ਵਾਲੀਆਂ ਹਵਾ ਦੀਆਂ ਪਰਤਾਂ ਵਿੱਚੋਂ ਲੰਘਦੇ ਪ੍ਰਕਾਸ਼ ਦਾ ਮੁੜਨਾ।"],
    board: ["Causes **twinkling of stars** and the sun being visible **2 minutes before actual sunrise**.",
            "ਇਸ ਨਾਲ **ਤਾਰੇ ਟਿਮਟਿਮਾਉਂਦੇ** ਹਨ ਤੇ ਸੂਰਜ **ਅਸਲ ਚੜ੍ਹਨ ਤੋਂ 2 ਮਿੰਟ ਪਹਿਲਾਂ** ਦਿਸਦਾ ਹੈ।"],
    vvip: true
  };

  /* ================= Ch 12 · Electricity ================================ */
  T["electric current"] = {
    ctx: ["Water flowing through a pipe — but the flowing thing is charge.",
          "ਪਾਈਪ ਵਿੱਚ ਵਗਦਾ ਪਾਣੀ — ਪਰ ਇੱਥੇ ਵਗਣ ਵਾਲੀ ਚੀਜ਼ ਚਾਰਜ ਹੈ।"],
    def: ["The rate of flow of electric charge through a conductor.",
          "ਚਾਲਕ ਵਿੱਚੋਂ ਬਿਜਲਈ ਚਾਰਜ ਦੇ ਵਹਾਅ ਦੀ ਦਰ।"],
    formula: "I = Q/t",
    board: ["Unit **ampere (A)**; measured with an **ammeter connected in series**.",
            "ਇਕਾਈ **ਐਂਪੀਅਰ (A)**; **ਐਮੀਟਰ ਲੜੀਵਾਰ ਜੋੜ ਕੇ** ਮਾਪਿਆ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["potential difference"] = {
    ctx: ["The height of a water tank — the push that makes water flow down.",
          "ਪਾਣੀ ਦੀ ਟੈਂਕੀ ਦੀ ਉਚਾਈ — ਉਹ ਧੱਕਾ ਜੋ ਪਾਣੀ ਹੇਠਾਂ ਵਗਾਉਂਦਾ ਹੈ।"],
    def: ["The work done to move a unit charge between two points in a circuit.",
          "ਸਰਕਟ ਵਿੱਚ ਦੋ ਬਿੰਦੂਆਂ ਵਿਚਕਾਰ ਇਕਾਈ ਚਾਰਜ ਲਿਜਾਣ ਲਈ ਕੀਤਾ ਕੰਮ।"],
    formula: "V = W/Q",
    board: ["Unit **volt (V)**; measured with a **voltmeter connected in parallel**.",
            "ਇਕਾਈ **ਵੋਲਟ (V)**; **ਵੋਲਟਮੀਟਰ ਸਮਾਨਾਂਤਰ ਜੋੜ ਕੇ** ਮਾਪਿਆ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["ohm's law"] = {
    ctx: ["Push harder and more current flows — as long as the temperature holds.",
          "ਵੱਧ ਧੱਕਾ ਲਾਓ ਤਾਂ ਵੱਧ ਧਾਰਾ ਵਗੇਗੀ — ਜਦ ਤੱਕ ਤਾਪਮਾਨ ਸਥਿਰ ਰਹੇ।"],
    def: ["At constant temperature, current is directly proportional to potential difference.",
          "ਸਥਿਰ ਤਾਪਮਾਨ 'ਤੇ ਧਾਰਾ ਵਿਭਵ ਅੰਤਰ ਦੇ ਸਿੱਧੇ ਅਨੁਪਾਤ ਵਿੱਚ ਹੁੰਦੀ ਹੈ।"],
    formula: "V = IR",
    board: ["The V-I graph is a **straight line through the origin**; its slope gives **R**.",
            "V-I ਗ੍ਰਾਫ਼ **ਮੂਲ ਬਿੰਦੂ ਵਿੱਚੋਂ ਸਿੱਧੀ ਰੇਖਾ** ਹੈ; ਇਸ ਦੀ ਢਲਾਣ **R** ਦਿੰਦੀ ਹੈ।"],
    vvip: true
  };
  T["resistance"] = {
    ctx: ["A narrow pipe that makes it harder for water to get through.",
          "ਤੰਗ ਪਾਈਪ ਜਿਸ ਵਿੱਚੋਂ ਪਾਣੀ ਲੰਘਣਾ ਔਖਾ ਹੋ ਜਾਂਦਾ ਹੈ।"],
    def: ["The opposition offered by a conductor to the flow of current.",
          "ਚਾਲਕ ਦੁਆਰਾ ਧਾਰਾ ਦੇ ਵਹਾਅ ਵਿੱਚ ਪਾਈ ਗਈ ਰੁਕਾਵਟ।"],
    formula: "R = pl/A",
    board: ["Resistance **increases with length** and **decreases with thicker wire**.",
            "ਪ੍ਰਤੀਰੋਧ **ਲੰਬਾਈ ਨਾਲ ਵਧਦਾ** ਤੇ **ਮੋਟੀ ਤਾਰ ਨਾਲ ਘਟਦਾ** ਹੈ।"],
    vvip: true
  };
  T["series combination"] = {
    ctx: ["Old fairy lights where one broken bulb kills the whole string.",
          "ਪੁਰਾਣੀਆਂ ਲੜੀ ਵਾਲੀਆਂ ਲਾਈਟਾਂ ਜਿੱਥੇ ਇੱਕ ਬਲਬ ਫਿਊਜ਼ ਹੋਣ 'ਤੇ ਸਾਰੀ ਲੜੀ ਬੰਦ।"],
    def: ["Resistors joined end to end so the same current passes through each.",
          "ਪ੍ਰਤੀਰੋਧਕ ਸਿਰੇ ਨਾਲ ਸਿਰਾ ਜੋੜੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਹਰ ਇੱਕ ਵਿੱਚੋਂ ਇੱਕੋ ਧਾਰਾ ਲੰਘੇ।"],
    formula: "Rs = R1 + R2 + R3",
    board: ["**Current is the same** everywhere; **voltage divides** across the resistors.",
            "**ਧਾਰਾ ਹਰ ਥਾਂ ਇੱਕੋ** ਹੁੰਦੀ ਹੈ; **ਵੋਲਟੇਜ ਵੰਡੀ ਜਾਂਦੀ** ਹੈ।"],
    vvip: true
  };
  T["parallel combination"] = {
    ctx: ["Home wiring — the fan keeps running even if a bulb fuses.",
          "ਘਰ ਦੀ ਵਾਇਰਿੰਗ — ਬਲਬ ਫਿਊਜ਼ ਹੋਣ 'ਤੇ ਵੀ ਪੱਖਾ ਚੱਲਦਾ ਰਹਿੰਦਾ ਹੈ।"],
    def: ["Resistors joined across the same two points so each gets the full voltage.",
          "ਪ੍ਰਤੀਰੋਧਕ ਇੱਕੋ ਦੋ ਬਿੰਦੂਆਂ ਵਿਚਕਾਰ ਜੋੜੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਹਰ ਇੱਕ ਨੂੰ ਪੂਰੀ ਵੋਲਟੇਜ ਮਿਲੇ।"],
    formula: "1/Rp = 1/R1 + 1/R2 + 1/R3",
    board: ["**Voltage is the same** across each; this is why **household circuits use parallel**.",
            "**ਹਰ ਇੱਕ ਉੱਤੇ ਵੋਲਟੇਜ ਇੱਕੋ** ਹੁੰਦੀ ਹੈ; ਇਸੇ ਲਈ **ਘਰਾਂ ਵਿੱਚ ਸਮਾਨਾਂਤਰ ਸੰਯੋਜਨ** ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["joule's law"] = {
    ctx: ["Why an iron or heater coil glows hot but the connecting wires stay cool.",
          "ਕਿਉਂ ਪ੍ਰੈੱਸ ਜਾਂ ਹੀਟਰ ਦੀ ਕੁੰਡਲੀ ਗਰਮ ਹੁੰਦੀ ਹੈ ਪਰ ਜੋੜਨ ਵਾਲੀਆਂ ਤਾਰਾਂ ਠੰਢੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ।"],
    def: ["Heat produced in a resistor is proportional to I squared, R and time.",
          "ਪ੍ਰਤੀਰੋਧਕ ਵਿੱਚ ਪੈਦਾ ਤਾਪ I ਦੇ ਵਰਗ, R ਅਤੇ ਸਮੇਂ ਦੇ ਅਨੁਪਾਤ ਵਿੱਚ ਹੁੰਦਾ ਹੈ।"],
    formula: "H = I^2Rt",
    board: ["Heating element has **high resistance and high melting point** (nichrome).",
            "ਤਾਪਨ ਤੱਤ ਦਾ **ਪ੍ਰਤੀਰੋਧ ਤੇ ਪਿਘਲਣ ਬਿੰਦੂ ਉੱਚਾ** ਹੁੰਦਾ ਹੈ (ਨਾਈਕ੍ਰੋਮ)।"],
    vvip: true
  };
  T["electric power"] = {
    ctx: ["The watt rating printed on a bulb — how fast it eats electricity.",
          "ਬਲਬ 'ਤੇ ਲਿਖੀ ਵਾਟ ਰੇਟਿੰਗ — ਇਹ ਕਿੰਨੀ ਤੇਜ਼ੀ ਨਾਲ ਬਿਜਲੀ ਖਪਾਉਂਦਾ ਹੈ।"],
    def: ["The rate at which electrical energy is consumed or supplied.",
          "ਉਹ ਦਰ ਜਿਸ ਨਾਲ ਬਿਜਲਈ ਊਰਜਾ ਖਪਤ ਜਾਂ ਸਪਲਾਈ ਹੁੰਦੀ ਹੈ।"],
    formula: "P = VI = I^2R = V^2/R",
    board: ["Commercial unit is the **kilowatt-hour**: **1 kWh = 3.6 x 10^6 J**.",
            "ਵਪਾਰਕ ਇਕਾਈ **ਕਿਲੋਵਾਟ-ਘੰਟਾ** ਹੈ: **1 kWh = 3.6 x 10^6 J**।"],
    vvip: true
  };

  /* ================= Ch 13 · Magnetic Effects =========================== */
  T["right hand thumb rule"] = {
    ctx: ["Grip the wire with your right hand — your fingers show the field circles.",
          "ਸੱਜੇ ਹੱਥ ਨਾਲ ਤਾਰ ਫੜੋ — ਉਂਗਲਾਂ ਚੁੰਬਕੀ ਖੇਤਰ ਦੇ ਗੋਲੇ ਦਰਸਾਉਂਦੀਆਂ ਹਨ।"],
    def: ["If the thumb points along the current, the curled fingers give the field direction.",
          "ਜੇ ਅੰਗੂਠਾ ਧਾਰਾ ਦੀ ਦਿਸ਼ਾ ਵੱਲ ਹੋਵੇ, ਤਾਂ ਮੁੜੀਆਂ ਉਂਗਲਾਂ ਖੇਤਰ ਦੀ ਦਿਸ਼ਾ ਦਿੰਦੀਆਂ ਹਨ।"],
    board: ["Used for a **straight current-carrying conductor**; also called Maxwell's corkscrew rule.",
            "**ਸਿੱਧੇ ਧਾਰਾਵਾਹੀ ਚਾਲਕ** ਲਈ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ; ਇਸ ਨੂੰ ਮੈਕਸਵੈੱਲ ਦਾ ਪੇਚ ਨਿਯਮ ਵੀ ਕਹਿੰਦੇ ਹਨ।"],
    vvip: true
  };
  T["fleming's left hand rule"] = {
    ctx: ["The rule that tells you which way a motor's coil will kick.",
          "ਉਹ ਨਿਯਮ ਜੋ ਦੱਸਦਾ ਹੈ ਕਿ ਮੋਟਰ ਦੀ ਕੁੰਡਲੀ ਕਿਸ ਪਾਸੇ ਧੱਕਾ ਖਾਵੇਗੀ।"],
    def: ["Thumb, forefinger and middle finger at right angles give force, field and current.",
          "ਅੰਗੂਠਾ, ਪਹਿਲੀ ਤੇ ਵਿਚਕਾਰਲੀ ਉਂਗਲ ਸਮਕੋਣ 'ਤੇ ਬਲ, ਖੇਤਰ ਤੇ ਧਾਰਾ ਦਿੰਦੇ ਹਨ।"],
    board: ["**Left hand = motor** (force); **right hand = generator** (induced current).",
            "**ਖੱਬਾ ਹੱਥ = ਮੋਟਰ** (ਬਲ); **ਸੱਜਾ ਹੱਥ = ਜਨਰੇਟਰ** (ਪ੍ਰੇਰਿਤ ਧਾਰਾ)।"],
    vvip: true
  };
  T["electromagnetic induction"] = {
    ctx: ["Moving a magnet in and out of a coil makes the galvanometer needle jump.",
          "ਕੁੰਡਲੀ ਵਿੱਚ ਚੁੰਬਕ ਅੰਦਰ-ਬਾਹਰ ਕਰਨ 'ਤੇ ਗੈਲਵੈਨੋਮੀਟਰ ਦੀ ਸੂਈ ਹਿੱਲਦੀ ਹੈ।"],
    def: ["Production of current in a coil due to a changing magnetic field.",
          "ਬਦਲਦੇ ਚੁੰਬਕੀ ਖੇਤਰ ਕਾਰਨ ਕੁੰਡਲੀ ਵਿੱਚ ਧਾਰਾ ਪੈਦਾ ਹੋਣਾ।"],
    board: ["Current flows **only while the magnet is moving** — stop it and the needle returns to zero.",
            "ਧਾਰਾ **ਸਿਰਫ਼ ਚੁੰਬਕ ਹਿੱਲਣ ਦੌਰਾਨ** ਵਗਦੀ ਹੈ — ਰੋਕਣ 'ਤੇ ਸੂਈ ਸਿਫ਼ਰ 'ਤੇ ਆ ਜਾਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["solenoid"] = {
    ctx: ["A coil of wire that behaves exactly like a bar magnet when switched on.",
          "ਤਾਰ ਦੀ ਕੁੰਡਲੀ ਜੋ ਚਾਲੂ ਹੋਣ 'ਤੇ ਬਿਲਕੁਲ ਛੜ ਚੁੰਬਕ ਵਾਂਗ ਵਿਹਾਰ ਕਰਦੀ ਹੈ।"],
    def: ["A long coil of insulated wire that produces a uniform magnetic field inside.",
          "ਇੰਸੂਲੇਟਿਡ ਤਾਰ ਦੀ ਲੰਮੀ ਕੁੰਡਲੀ ਜੋ ਅੰਦਰ ਇੱਕਸਾਰ ਚੁੰਬਕੀ ਖੇਤਰ ਪੈਦਾ ਕਰਦੀ ਹੈ।"],
    board: ["Field inside is **uniform and parallel**; adding a soft iron core makes an **electromagnet**.",
            "ਅੰਦਰਲਾ ਖੇਤਰ **ਇੱਕਸਾਰ ਤੇ ਸਮਾਨਾਂਤਰ** ਹੈ; ਨਰਮ ਲੋਹੇ ਦਾ ਕੋਰ ਪਾਉਣ 'ਤੇ **ਬਿਜਲਈ ਚੁੰਬਕ** ਬਣਦਾ ਹੈ।"],
    vvip: true
  };
  T["short circuit"] = {
    ctx: ["Live and neutral wires touching — a spark, a bang and the fuse blows.",
          "ਲਾਈਵ ਤੇ ਨਿਊਟਰਲ ਤਾਰਾਂ ਦਾ ਛੂਹਣਾ — ਚੰਗਿਆੜੀ, ਧਮਾਕਾ ਤੇ ਫਿਊਜ਼ ਉੱਡ ਜਾਂਦਾ ਹੈ।"],
    def: ["Accidental contact of live and neutral wires, causing a huge surge of current.",
          "ਲਾਈਵ ਤੇ ਨਿਊਟਰਲ ਤਾਰਾਂ ਦਾ ਗ਼ਲਤੀ ਨਾਲ ਮਿਲਣਾ, ਜਿਸ ਨਾਲ ਧਾਰਾ ਬਹੁਤ ਵਧ ਜਾਂਦੀ ਹੈ।"],
    board: ["Resistance drops nearly to zero, so current **shoots up** — the **fuse melts** to protect the circuit.",
            "ਪ੍ਰਤੀਰੋਧ ਲਗਭਗ ਸਿਫ਼ਰ ਹੋ ਜਾਂਦਾ ਹੈ, ਧਾਰਾ **ਬਹੁਤ ਵਧ ਜਾਂਦੀ** ਹੈ — **ਫਿਊਜ਼ ਪਿਘਲ** ਕੇ ਬਚਾਉਂਦਾ ਹੈ।"],
    vvip: true
  };
  T["earthing"] = {
    ctx: ["The third, thicker pin on a plug that saves you from a shock.",
          "ਪਲੱਗ ਦਾ ਤੀਜਾ, ਮੋਟਾ ਪਿੰਨ ਜੋ ਤੁਹਾਨੂੰ ਬਿਜਲੀ ਦੇ ਝਟਕੇ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ।"],
    def: ["Connecting a metallic appliance body to the earth through a low-resistance wire.",
          "ਧਾਤ ਦੇ ਉਪਕਰਣ ਦੇ ਢਾਂਚੇ ਨੂੰ ਘੱਟ ਪ੍ਰਤੀਰੋਧ ਵਾਲੀ ਤਾਰ ਰਾਹੀਂ ਧਰਤੀ ਨਾਲ ਜੋੜਨਾ।"],
    board: ["Any leakage current flows **safely to the earth** instead of through your body.",
            "ਲੀਕ ਹੋਈ ਧਾਰਾ ਤੁਹਾਡੇ ਸਰੀਰ ਦੀ ਥਾਂ **ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਧਰਤੀ** ਵਿੱਚ ਚਲੀ ਜਾਂਦੀ ਹੈ।"],
    vvip: true
  };

  /* ================= Ch 14 · Sources of Energy ========================== */
  T["renewable energy"] = {
    ctx: ["Sunlight and wind — they arrive again tomorrow, free of cost.",
          "ਧੁੱਪ ਤੇ ਹਵਾ — ਇਹ ਕੱਲ੍ਹ ਫਿਰ ਮੁਫ਼ਤ ਮਿਲ ਜਾਣਗੀਆਂ।"],
    def: ["Energy from sources that are replenished naturally and will not run out.",
          "ਉਨ੍ਹਾਂ ਸੋਮਿਆਂ ਤੋਂ ਊਰਜਾ ਜੋ ਕੁਦਰਤੀ ਤੌਰ 'ਤੇ ਮੁੜ ਭਰਦੇ ਹਨ ਤੇ ਕਦੇ ਖ਼ਤਮ ਨਹੀਂ ਹੁੰਦੇ।"],
    board: ["Solar, wind, hydro, biomass and geothermal — all **inexhaustible**.",
            "ਸੌਰ, ਪੌਣ, ਪਣ, ਜੈਵ ਪੁੰਜ ਤੇ ਭੂ-ਤਾਪੀ — ਸਾਰੇ **ਅਮੁੱਕ** ਹਨ।"],
    vvip: true
  };
  T["biogas"] = {
    ctx: ["The gas a village gobar-gas plant makes from cow dung slurry.",
          "ਪਿੰਡ ਦਾ ਗੋਬਰ-ਗੈਸ ਪਲਾਂਟ ਜੋ ਗੋਬਰ ਦੇ ਘੋਲ ਤੋਂ ਗੈਸ ਬਣਾਉਂਦਾ ਹੈ।"],
    def: ["A mixture of gases produced by anaerobic decomposition of biomass.",
          "ਜੈਵ ਪੁੰਜ ਦੇ ਅਣਆਕਸੀ ਅਪਘਟਨ ਤੋਂ ਬਣਿਆ ਗੈਸਾਂ ਦਾ ਮਿਸ਼ਰਣ।"],
    board: ["It is about **75% methane**; the leftover slurry is an excellent **manure**.",
            "ਇਸ ਵਿੱਚ ਲਗਭਗ **75% ਮੀਥੇਨ** ਹੈ; ਬਚਿਆ ਘੋਲ ਵਧੀਆ **ਖਾਦ** ਹੈ।"],
    vvip: true
  };
  T["nuclear fission"] = {
    ctx: ["Splitting one heavy atom releases the energy that runs a power station.",
          "ਇੱਕ ਭਾਰੀ ਪਰਮਾਣੂ ਦੇ ਟੁੱਟਣ ਨਾਲ ਇੰਨੀ ਊਰਜਾ ਨਿਕਲਦੀ ਹੈ ਕਿ ਬਿਜਲੀ ਘਰ ਚੱਲਦਾ ਹੈ।"],
    def: ["Splitting of a heavy nucleus into lighter nuclei with a huge release of energy.",
          "ਭਾਰੀ ਨਿਊਕਲੀਅਸ ਦਾ ਹਲਕੇ ਨਿਊਕਲੀਅਸਾਂ ਵਿੱਚ ਟੁੱਟਣਾ ਤੇ ਬਹੁਤ ਊਰਜਾ ਨਿਕਲਣਾ।"],
    formula: "U-235 + neutron -> Ba + Kr + 3 neutrons + energy",
    board: ["Fuel is **uranium-235**; the danger is **radioactive waste disposal**.",
            "ਬਾਲਣ **ਯੂਰੇਨੀਅਮ-235** ਹੈ; ਖ਼ਤਰਾ **ਰੇਡੀਓਐਕਟਿਵ ਕੂੜੇ ਦੇ ਨਿਪਟਾਰੇ** ਦਾ ਹੈ।"],
    vvip: true
  };
  T["nuclear fusion"] = {
    ctx: ["The reaction powering the Sun — light nuclei joining, not splitting.",
          "ਸੂਰਜ ਨੂੰ ਚਲਾਉਣ ਵਾਲੀ ਕਿਰਿਆ — ਹਲਕੇ ਨਿਊਕਲੀਅਸ ਜੁੜਦੇ ਹਨ, ਟੁੱਟਦੇ ਨਹੀਂ।"],
    def: ["Joining of light nuclei to form a heavier nucleus, releasing enormous energy.",
          "ਹਲਕੇ ਨਿਊਕਲੀਅਸਾਂ ਦਾ ਜੁੜ ਕੇ ਭਾਰੀ ਨਿਊਕਲੀਅਸ ਬਣਨਾ, ਜਿਸ ਨਾਲ ਬਹੁਤ ਊਰਜਾ ਨਿਕਲਦੀ ਹੈ।"],
    formula: "2H + 2H -> 3He + neutron + energy",
    board: ["Needs **millions of degrees**, which is why it is not yet used commercially on Earth.",
            "ਇਸ ਲਈ **ਲੱਖਾਂ ਡਿਗਰੀ** ਤਾਪਮਾਨ ਚਾਹੀਦਾ ਹੈ, ਇਸੇ ਲਈ ਧਰਤੀ 'ਤੇ ਵਪਾਰਕ ਵਰਤੋਂ ਨਹੀਂ ਹੋਈ।"],
    vvip: true
  };
  T["solar cell"] = {
    ctx: ["The blue panel on a street light that charges a battery all day.",
          "ਸਟਰੀਟ ਲਾਈਟ 'ਤੇ ਲੱਗਿਆ ਨੀਲਾ ਪੈਨਲ ਜੋ ਸਾਰਾ ਦਿਨ ਬੈਟਰੀ ਚਾਰਜ ਕਰਦਾ ਹੈ।"],
    def: ["A device that converts solar energy directly into electricity.",
          "ਉਹ ਯੰਤਰ ਜੋ ਸੌਰ ਊਰਜਾ ਨੂੰ ਸਿੱਧਾ ਬਿਜਲੀ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।"],
    board: ["Made of **silicon**; a single cell gives about **0.5–1 V**.",
            "**ਸਿਲੀਕਾਨ** ਤੋਂ ਬਣਦਾ ਹੈ; ਇੱਕ ਸੈੱਲ ਲਗਭਗ **0.5–1 V** ਦਿੰਦਾ ਹੈ।"],
    vvip: true
  };

  /* ================= Ch 15 · Our Environment ============================ */
  T["food chain"] = {
    ctx: ["Grass eaten by a deer, the deer eaten by a tiger.",
          "ਘਾਹ ਹਿਰਨ ਖਾਂਦਾ ਹੈ, ਹਿਰਨ ਨੂੰ ਬਾਘ ਖਾਂਦਾ ਹੈ।"],
    def: ["A series of organisms through which energy flows by eating and being eaten.",
          "ਜੀਵਾਂ ਦੀ ਲੜੀ ਜਿਸ ਵਿੱਚੋਂ ਖਾਣ ਤੇ ਖਾਧੇ ਜਾਣ ਨਾਲ ਊਰਜਾ ਵਗਦੀ ਹੈ।"],
    board: ["Energy flow is **unidirectional**; chains rarely exceed **4 trophic levels**.",
            "ਊਰਜਾ ਦਾ ਵਹਾਅ **ਇੱਕ-ਪਾਸੜ** ਹੈ; ਲੜੀਆਂ ਘੱਟ ਹੀ **4 ਪੋਸ਼ੀ ਪੱਧਰਾਂ** ਤੋਂ ਵੱਧ ਹੁੰਦੀਆਂ ਹਨ।"],
    vvip: true
  };
  T["trophic level"] = {
    ctx: ["Each step on the food ladder, from grass at the bottom upward.",
          "ਭੋਜਨ ਪੌੜੀ ਦਾ ਹਰ ਡੰਡਾ, ਹੇਠਾਂ ਘਾਹ ਤੋਂ ਸ਼ੁਰੂ ਹੋ ਕੇ ਉੱਪਰ ਵੱਲ।"],
    def: ["Each step or feeding level in a food chain.",
          "ਭੋਜਨ ਲੜੀ ਦਾ ਹਰ ਕਦਮ ਜਾਂ ਪੋਸ਼ਣ ਪੱਧਰ।"],
    board: ["The **ten per cent law**: only **10%** of energy passes to the next level.",
            "**ਦਸ ਪ੍ਰਤੀਸ਼ਤ ਨਿਯਮ**: ਸਿਰਫ਼ **10%** ਊਰਜਾ ਅਗਲੇ ਪੱਧਰ ਤੱਕ ਜਾਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["biomagnification"] = {
    ctx: ["Pesticides getting more concentrated at every step up the food chain.",
          "ਕੀਟਨਾਸ਼ਕਾਂ ਦਾ ਭੋਜਨ ਲੜੀ ਦੇ ਹਰ ਕਦਮ 'ਤੇ ਹੋਰ ਸੰਘਣਾ ਹੁੰਦੇ ਜਾਣਾ।"],
    def: ["Progressive increase in the concentration of harmful chemicals at higher trophic levels.",
          "ਉੱਚੇ ਪੋਸ਼ੀ ਪੱਧਰਾਂ 'ਤੇ ਹਾਨੀਕਾਰਕ ਰਸਾਇਣਾਂ ਦੀ ਮਾਤਰਾ ਦਾ ਲਗਾਤਾਰ ਵਧਣਾ।"],
    board: ["**Humans are at the top**, so we receive the highest pesticide concentration.",
            "**ਮਨੁੱਖ ਸਭ ਤੋਂ ਉੱਪਰ** ਹਨ, ਇਸ ਲਈ ਸਾਨੂੰ ਸਭ ਤੋਂ ਵੱਧ ਕੀਟਨਾਸ਼ਕ ਮਿਲਦੇ ਹਨ।"],
    vvip: true
  };
  T["ozone layer"] = {
    ctx: ["Earth's sunscreen, sitting high up in the stratosphere.",
          "ਧਰਤੀ ਦੀ ਸਨਸਕ੍ਰੀਨ, ਜੋ ਉੱਪਰ ਸਟਰੈਟੋਸਫ਼ੀਅਰ ਵਿੱਚ ਹੈ।"],
    def: ["A layer of O3 in the stratosphere that absorbs harmful ultraviolet radiation.",
          "ਸਟਰੈਟੋਸਫ਼ੀਅਰ ਵਿੱਚ O3 ਦੀ ਪਰਤ ਜੋ ਹਾਨੀਕਾਰਕ ਪਰਾਬੈਂਗਣੀ ਕਿਰਨਾਂ ਸੋਖਦੀ ਹੈ।"],
    formula: "O2 -> O + O ; O + O2 -> O3",
    board: ["**CFCs** destroy it; UV exposure causes **skin cancer and cataract**.",
            "**CFC** ਇਸ ਨੂੰ ਨਸ਼ਟ ਕਰਦੇ ਹਨ; UV ਕਿਰਨਾਂ **ਚਮੜੀ ਦਾ ਕੈਂਸਰ ਤੇ ਮੋਤੀਆਬਿੰਦ** ਕਰਦੀਆਂ ਹਨ।"],
    vvip: true
  };
  T["biodegradable"] = {
    ctx: ["Vegetable peels in the compost pit that vanish into soil in weeks.",
          "ਖਾਦ ਦੇ ਟੋਏ ਵਿੱਚ ਸਬਜ਼ੀਆਂ ਦੇ ਛਿਲਕੇ ਜੋ ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਮਿੱਟੀ ਬਣ ਜਾਂਦੇ ਹਨ।"],
    def: ["Substances that can be broken down by decomposers into simpler substances.",
          "ਉਹ ਪਦਾਰਥ ਜਿਨ੍ਹਾਂ ਨੂੰ ਅਪਘਟਕ ਸਰਲ ਪਦਾਰਥਾਂ ਵਿੱਚ ਤੋੜ ਸਕਦੇ ਹਨ।"],
    board: ["Paper and peels are biodegradable; **plastic and DDT are not**.",
            "ਕਾਗ਼ਜ਼ ਤੇ ਛਿਲਕੇ ਜੈਵ ਵਿਘਟਨਸ਼ੀਲ ਹਨ; **ਪਲਾਸਟਿਕ ਤੇ DDT ਨਹੀਂ**।"],
    vvip: true
  };
  T["decomposer"] = {
    ctx: ["Fungi and bacteria — nature's cleaning crew for dead leaves.",
          "ਉੱਲੀ ਤੇ ਬੈਕਟੀਰੀਆ — ਸੁੱਕੇ ਪੱਤਿਆਂ ਲਈ ਕੁਦਰਤ ਦਾ ਸਫ਼ਾਈ ਦਸਤਾ।"],
    def: ["Organisms that break down dead remains and return nutrients to the soil.",
          "ਉਹ ਜੀਵ ਜੋ ਮਰੇ ਅਵਸ਼ੇਸ਼ ਤੋੜ ਕੇ ਪੋਸ਼ਕ ਤੱਤ ਮਿੱਟੀ ਨੂੰ ਵਾਪਸ ਕਰਦੇ ਹਨ।"],
    board: ["Without them, **nutrient cycling would stop** and soil would lose its fertility.",
            "ਇਨ੍ਹਾਂ ਬਿਨਾਂ **ਪੋਸ਼ਕ ਚੱਕਰ ਰੁਕ ਜਾਵੇਗਾ** ਤੇ ਮਿੱਟੀ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਖ਼ਤਮ ਹੋ ਜਾਵੇਗੀ।"],
    vvip: true
  };

  /* ================= Ch 16 · Sustainable Management ===================== */
  T["sustainable development"] = {
    ctx: ["Using today's forests and water without robbing your grandchildren.",
          "ਅੱਜ ਦੇ ਜੰਗਲ ਤੇ ਪਾਣੀ ਇੰਝ ਵਰਤਣਾ ਕਿ ਪੋਤੇ-ਪੋਤੀਆਂ ਦਾ ਹਿੱਸਾ ਨਾ ਖੋਹਿਆ ਜਾਵੇ।"],
    def: ["Development that meets present needs without compromising future generations.",
          "ਉਹ ਵਿਕਾਸ ਜੋ ਅੱਜ ਦੀਆਂ ਲੋੜਾਂ ਪੂਰੀਆਂ ਕਰੇ ਪਰ ਆਉਣ ਵਾਲੀਆਂ ਪੀੜ੍ਹੀਆਂ ਦਾ ਨੁਕਸਾਨ ਨਾ ਕਰੇ।"],
    board: ["Follow the **five Rs: Refuse, Reduce, Reuse, Repurpose, Recycle**.",
            "**ਪੰਜ R ਅਪਣਾਓ: ਇਨਕਾਰ, ਘਟਾਓ, ਮੁੜ ਵਰਤੋ, ਨਵੀਂ ਵਰਤੋਂ, ਰੀਸਾਈਕਲ**।"],
    vvip: true
  };
  T["rainwater harvesting"] = {
    ctx: ["Pipes from a rooftop feeding a recharge pit instead of the street drain.",
          "ਛੱਤ ਤੋਂ ਪਾਈਪਾਂ ਜੋ ਪਾਣੀ ਗਲੀ ਦੀ ਨਾਲੀ ਦੀ ਥਾਂ ਰੀਚਾਰਜ ਟੋਏ ਵਿੱਚ ਪਾਉਂਦੀਆਂ ਹਨ।"],
    def: ["Collecting and storing rainwater to recharge groundwater.",
          "ਵਰਖਾ ਦਾ ਪਾਣੀ ਇਕੱਠਾ ਕਰਕੇ ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਨੂੰ ਮੁੜ ਭਰਨਾ।"],
    board: ["Groundwater **does not evaporate** and is **not a breeding ground for mosquitoes**.",
            "ਧਰਤੀ ਹੇਠਲਾ ਪਾਣੀ **ਭਾਫ਼ ਨਹੀਂ ਬਣਦਾ** ਤੇ **ਮੱਛਰ ਵੀ ਨਹੀਂ ਪਲਦੇ**।"],
    vvip: true
  };
  T["chipko movement"] = {
    ctx: ["Village women in Garhwal hugging trees so contractors could not cut them.",
          "ਗੜ੍ਹਵਾਲ ਦੀਆਂ ਪਿੰਡ ਦੀਆਂ ਔਰਤਾਂ ਦਾ ਰੁੱਖਾਂ ਨੂੰ ਜੱਫੀ ਪਾਉਣਾ ਤਾਂ ਜੋ ਠੇਕੇਦਾਰ ਨਾ ਕੱਟ ਸਕਣ।"],
    def: ["A grassroots forest-protection movement in which people hugged trees to stop felling.",
          "ਜੰਗਲ ਬਚਾਉਣ ਦੀ ਲੋਕ ਲਹਿਰ ਜਿਸ ਵਿੱਚ ਲੋਕਾਂ ਨੇ ਰੁੱਖਾਂ ਨੂੰ ਜੱਫੀ ਪਾ ਕੇ ਕਟਾਈ ਰੋਕੀ।"],
    board: ["Began in **Reni village, Garhwal (Uttarakhand)** in the 1970s.",
            "1970ਵਿਆਂ ਵਿੱਚ **ਰੇਣੀ ਪਿੰਡ, ਗੜ੍ਹਵਾਲ (ਉੱਤਰਾਖੰਡ)** ਤੋਂ ਸ਼ੁਰੂ ਹੋਈ।"],
    vvip: true
  };
  T["coliform bacteria"] = {
    ctx: ["The bug that tells a lab the river water has sewage in it.",
          "ਉਹ ਕੀਟਾਣੂ ਜੋ ਲੈਬ ਨੂੰ ਦੱਸਦਾ ਹੈ ਕਿ ਦਰਿਆ ਦੇ ਪਾਣੀ ਵਿੱਚ ਗੰਦਗੀ ਹੈ।"],
    def: ["A group of bacteria found in human intestines, used as an indicator of water pollution.",
          "ਮਨੁੱਖੀ ਆਂਦਰਾਂ ਵਿੱਚ ਮਿਲਣ ਵਾਲੇ ਬੈਕਟੀਰੀਆ, ਜੋ ਪਾਣੀ ਦੇ ਪ੍ਰਦੂਸ਼ਣ ਦੇ ਸੂਚਕ ਹਨ।"],
    board: ["Their presence confirms **contamination by untreated sewage**.",
            "ਇਨ੍ਹਾਂ ਦੀ ਮੌਜੂਦਗੀ **ਬਿਨਾਂ ਸੋਧੇ ਸੀਵਰੇਜ ਦੀ ਮਿਲਾਵਟ** ਸਾਬਤ ਕਰਦੀ ਹੈ।"],
    vvip: true
  };
  T["watershed management"] = {
    ctx: ["Building small check dams so rain soaks in instead of running off.",
          "ਛੋਟੇ ਬੰਨ੍ਹ ਬਣਾਉਣਾ ਤਾਂ ਜੋ ਮੀਂਹ ਦਾ ਪਾਣੀ ਵਗਣ ਦੀ ਥਾਂ ਜ਼ਮੀਨ ਵਿੱਚ ਰਚੇ।"],
    def: ["Scientific conservation of soil and water to increase production sustainably.",
          "ਮਿੱਟੀ ਤੇ ਪਾਣੀ ਦੀ ਵਿਗਿਆਨਕ ਸੰਭਾਲ ਤਾਂ ਜੋ ਉਪਜ ਟਿਕਾਊ ਢੰਗ ਨਾਲ ਵਧੇ।"],
    board: ["It **recharges groundwater, reduces floods and droughts** together.",
            "ਇਹ **ਧਰਤੀ ਹੇਠਲਾ ਪਾਣੀ ਭਰਦਾ, ਹੜ੍ਹ ਤੇ ਸੋਕਾ ਦੋਵੇਂ ਘਟਾਉਂਦਾ** ਹੈ।"]
  };


  /* ==== Ch 10-16 board high-yield enrichment (Round 3) ================
     Physics and environment terms the brief flagged as recurring PSEB
     questions. Same shape as the Ch 1-9 entries above. */
  T["mirror formula"] = {
    ctx: ["One equation ties object, image and focus together for every spherical mirror.",
          "ਇੱਕੋ ਸਮੀਕਰਨ ਹਰ ਗੋਲਾਕਾਰ ਦਰਪਣ ਲਈ ਵਸਤੂ, ਪ੍ਰਤਿਬਿੰਬ ਅਤੇ ਫੋਕਸ ਨੂੰ ਜੋੜਦਾ ਹੈ।"],
    def: ["Relates image distance v, object distance u and focal length f for a spherical mirror.",
          "ਗੋਲਾਕਾਰ ਦਰਪਣ ਲਈ v, u ਅਤੇ f ਵਿਚਕਾਰ ਸਬੰਧ।"],
    formula: "1/v + 1/u = 1/f",
    board: ["Mirror uses **PLUS** (1/v + 1/u), lens uses **MINUS** (1/v − 1/u). Mixing them up is the commonest lost mark.",
            "ਦਰਪਣ ਵਿੱਚ **ਜੋੜ (+)** ਅਤੇ ਲੈਂਜ਼ ਵਿੱਚ **ਘਟਾਓ (−)** ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["lens formula"] = {
    ctx: ["The lens twin of the mirror equation — same idea, one sign different.",
          "ਦਰਪਣ ਸਮੀਕਰਨ ਦਾ ਲੈਂਜ਼ ਰੂਪ — ਸਿਰਫ਼ ਇੱਕ ਚਿੰਨ੍ਹ ਵੱਖਰਾ।"],
    def: ["Relates v, u and f for a thin lens.",
          "ਪਤਲੇ ਲੈਂਜ਼ ਲਈ v, u ਅਤੇ f ਵਿਚਕਾਰ ਸਬੰਧ।"],
    formula: "1/v - 1/u = 1/f",
    board: ["For a lens m = **v/u** (no minus); for a mirror m = **−v/u**. Convex lens f is **+**, concave lens f is **−**.",
            "ਲੈਂਜ਼ ਲਈ m = **v/u**; ਦਰਪਣ ਲਈ m = **−v/u**।"],
    vvip: true
  };
  T["sign convention"] = {
    ctx: ["Agree where zero is and which way is positive — then the algebra does the rest.",
          "ਪਹਿਲਾਂ ਤੈਅ ਕਰੋ ਕਿ ਸਿਫ਼ਰ ਕਿੱਥੇ ਹੈ ਤੇ ਕਿਹੜੀ ਦਿਸ਼ਾ ਧਨਾਤਮਕ ਹੈ।"],
    def: ["All distances are measured from the pole (or optical centre); those measured along the incident light are positive, against it negative.",
          "ਸਾਰੀਆਂ ਦੂਰੀਆਂ ਧਰੁਵ ਤੋਂ ਮਾਪੀਆਂ ਜਾਂਦੀਆਂ ਹਨ; ਆਪਾਤੀ ਪ੍ਰਕਾਸ਼ ਦੀ ਦਿਸ਼ਾ ਵਿੱਚ ਧਨਾਤਮਕ।"],
    board: ["u is **always negative** for a real object. Concave mirror **f = −**, convex mirror **f = +**; convex lens **f = +**, concave lens **f = −**.",
            "ਵਾਸਤਵਿਕ ਵਸਤੂ ਲਈ u **ਹਮੇਸ਼ਾ ਰਿਣਾਤਮਕ**। ਅਵਤਲ ਦਰਪਣ f = −, ਉੱਤਲ ਦਰਪਣ f = +।"],
    vvip: true
  };
  T["snell's law"] = {
    ctx: ["Light bends by a fixed ratio whenever it crosses into a new medium.",
          "ਪ੍ਰਕਾਸ਼ ਨਵੇਂ ਮਾਧਿਅਮ ਵਿੱਚ ਜਾਂਦਿਆਂ ਇੱਕ ਨਿਸ਼ਚਿਤ ਅਨੁਪਾਤ ਵਿੱਚ ਮੁੜਦਾ ਹੈ।"],
    def: ["For two given media the ratio of sin i to sin r is a constant, the refractive index.",
          "ਦੋ ਮਾਧਿਅਮਾਂ ਲਈ sin i ਅਤੇ sin r ਦਾ ਅਨੁਪਾਤ ਸਥਿਰ ਹੁੰਦਾ ਹੈ — ਅਪਵਰਤਨ ਅੰਕ।"],
    formula: "n = sin i / sin r",
    board: ["Both angles are measured from the **normal**, never from the surface. Denser medium ⇒ ray bends **towards** the normal.",
            "ਦੋਵੇਂ ਕੋਣ **ਲੰਬ** ਤੋਂ ਮਾਪੇ ਜਾਂਦੇ ਹਨ। ਸੰਘਣੇ ਮਾਧਿਅਮ ਵਿੱਚ ਕਿਰਨ ਲੰਬ **ਵੱਲ** ਮੁੜਦੀ ਹੈ।"],
    vvip: true
  };
  T["power of a lens"] = {
    ctx: ["A strong lens bends light hard over a short distance — high power.",
          "ਸ਼ਕਤੀਸ਼ਾਲੀ ਲੈਂਜ਼ ਪ੍ਰਕਾਸ਼ ਨੂੰ ਥੋੜ੍ਹੀ ਦੂਰੀ ਵਿੱਚ ਵੱਧ ਮੋੜਦਾ ਹੈ।"],
    def: ["The degree of convergence or divergence a lens produces; the reciprocal of focal length in metres.",
          "ਲੈਂਜ਼ ਦੁਆਰਾ ਪੈਦਾ ਕੀਤਾ ਅਭਿਸਰਣ/ਅਪਸਰਣ; ਮੀਟਰ ਵਿੱਚ ਫੋਕਸ ਦੂਰੀ ਦਾ ਉਲਟ।"],
    formula: "P = 1/f",
    board: ["f **must be in metres**: f = 20 cm ⇒ P = 1/0.20 = **+5 D**. Convex **+**, concave **−**. SI unit is the **dioptre (D)**.",
            "f **ਮੀਟਰ ਵਿੱਚ** ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। ਉੱਤਲ **+**, ਅਵਤਲ **−**। ਮਾਤ੍ਰਕ **ਡਾਇਆਪਟਰ (D)**।"],
    vvip: true
  };
  T["focal length"] = {
    ctx: ["How far from the mirror or lens a distant object comes to a sharp point.",
          "ਦੂਰ ਦੀ ਵਸਤੂ ਦਾ ਪ੍ਰਤਿਬਿੰਬ ਕਿੰਨੀ ਦੂਰੀ 'ਤੇ ਤਿੱਖਾ ਬਣਦਾ ਹੈ।"],
    def: ["Distance between the pole (or optical centre) and the principal focus.",
          "ਧਰੁਵ ਅਤੇ ਮੁੱਖ ਫੋਕਸ ਵਿਚਕਾਰ ਦੂਰੀ।"],
    formula: "f = R/2",
    board: ["For a spherical mirror **f = R/2** — the focus is exactly halfway to the centre of curvature.",
            "ਗੋਲਾਕਾਰ ਦਰਪਣ ਲਈ **f = R/2**।"],
    vvip: true
  };
  T["reflection"] = {
    ctx: ["Your face in a mirror — light bounces straight back off a smooth surface.",
          "ਸ਼ੀਸ਼ੇ ਵਿੱਚ ਆਪਣਾ ਚਿਹਰਾ — ਪ੍ਰਕਾਸ਼ ਵਾਪਸ ਮੁੜਦਾ ਹੈ।"],
    def: ["The bouncing back of light when it strikes a polished surface.",
          "ਚਮਕਦਾਰ ਸਤ੍ਹਾ ਤੋਂ ਪ੍ਰਕਾਸ਼ ਦਾ ਵਾਪਸ ਮੁੜਨਾ।"],
    formula: "∠i = ∠r",
    board: ["Angle of incidence = angle of reflection (**∠i = ∠r**), and the incident ray, reflected ray and normal all lie in **one plane**.",
            "**∠i = ∠r**, ਅਤੇ ਆਪਾਤੀ ਕਿਰਨ, ਪਰਾਵਰਤਿਤ ਕਿਰਨ ਤੇ ਲੰਬ ਇੱਕੋ ਤਲ ਵਿੱਚ ਹੁੰਦੇ ਹਨ।"],
    vvip: true
  };
  T["refraction"] = {
    ctx: ["A straw looks bent at the water's surface — light changed speed.",
          "ਪਾਣੀ ਵਿੱਚ ਤੀਲਾ ਟੇਢਾ ਦਿਸਦਾ ਹੈ — ਪ੍ਰਕਾਸ਼ ਦੀ ਚਾਲ ਬਦਲੀ।"],
    def: ["The bending of light as it passes from one transparent medium into another.",
          "ਇੱਕ ਮਾਧਿਅਮ ਤੋਂ ਦੂਜੇ ਵਿੱਚ ਜਾਂਦਿਆਂ ਪ੍ਰਕਾਸ਼ ਦਾ ਮੁੜਨਾ।"],
    board: ["Refraction happens because light **changes speed**, not because it changes colour. A ray along the normal (i = 0) goes **straight through**.",
            "ਅਪਵਰਤਨ **ਚਾਲ ਬਦਲਣ** ਕਾਰਨ ਹੁੰਦਾ ਹੈ। ਲੰਬ ਦੇ ਨਾਲ ਆਉਂਦੀ ਕਿਰਨ ਸਿੱਧੀ ਲੰਘਦੀ ਹੈ।"],
    vvip: true
  };
  T["virtual image"] = {
    ctx: ["What you see 'inside' a plane mirror — no light actually gets there.",
          "ਸਮਤਲ ਦਰਪਣ ਦੇ 'ਅੰਦਰ' ਦਿਸਦਾ ਪ੍ਰਤਿਬਿੰਬ।"],
    def: ["An image that cannot be caught on a screen, formed where rays only appear to meet.",
          "ਉਹ ਪ੍ਰਤਿਬਿੰਬ ਜੋ ਪਰਦੇ 'ਤੇ ਨਹੀਂ ਲਿਆ ਜਾ ਸਕਦਾ।"],
    board: ["Virtual images are **always erect**; real images are **always inverted**. A convex mirror and a concave lens give only virtual images.",
            "ਆਭਾਸੀ ਪ੍ਰਤਿਬਿੰਬ **ਹਮੇਸ਼ਾ ਸਿੱਧਾ**; ਵਾਸਤਵਿਕ **ਹਮੇਸ਼ਾ ਉਲਟਾ**।"],
    vvip: true
  };
  T["centre of curvature"] = {
    ctx: ["The centre of the ball the mirror was sliced from.",
          "ਜਿਸ ਗੋਲੇ ਤੋਂ ਦਰਪਣ ਕੱਟਿਆ, ਉਸ ਦਾ ਕੇਂਦਰ।"],
    def: ["The centre of the sphere of which the mirror forms a part.",
          "ਉਸ ਗੋਲੇ ਦਾ ਕੇਂਦਰ ਜਿਸ ਦਾ ਦਰਪਣ ਹਿੱਸਾ ਹੈ।"],
    formula: "R = 2f",
    board: ["**C = 2f**. A ray aimed at C hits the mirror along the normal and comes **straight back**.",
            "**C = 2f**। C ਵੱਲ ਜਾਂਦੀ ਕਿਰਨ ਉਸੇ ਰਾਹ ਵਾਪਸ ਆਉਂਦੀ ਹੈ।"],
    vvip: false
  };
  T["principal axis"] = {
    ctx: ["The straight line running through the middle of the mirror.",
          "ਦਰਪਣ ਦੇ ਵਿਚਕਾਰੋਂ ਲੰਘਦੀ ਸਿੱਧੀ ਰੇਖਾ।"],
    def: ["The line passing through the pole and the centre of curvature.",
          "ਧਰੁਵ ਅਤੇ ਵਕਰਤਾ ਕੇਂਦਰ ਵਿੱਚੋਂ ਲੰਘਦੀ ਰੇਖਾ।"],
    board: ["Every distance in the mirror and lens formulas is measured **along** this axis.",
            "ਸਾਰੀਆਂ ਦੂਰੀਆਂ ਇਸੇ ਧੁਰੇ ਦੇ **ਨਾਲ** ਮਾਪੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।"],
    vvip: false
  };
  T["lens"] = {
    ctx: ["A magnifying glass — curved glass that gathers light to a point.",
          "ਵੱਡਦਰਸ਼ੀ ਸ਼ੀਸ਼ਾ — ਪ੍ਰਕਾਸ਼ ਨੂੰ ਇੱਕ ਬਿੰਦੂ 'ਤੇ ਇਕੱਠਾ ਕਰਦਾ ਹੈ।"],
    def: ["A transparent medium bounded by two surfaces, at least one of which is curved.",
          "ਦੋ ਸਤਹਾਂ ਨਾਲ ਘਿਰਿਆ ਪਾਰਦਰਸ਼ੀ ਮਾਧਿਅਮ।"],
    board: ["Convex = **converging** (thicker in the middle); concave = **diverging** (thinner in the middle).",
            "ਉੱਤਲ = **ਅਭਿਸਾਰੀ**; ਅਵਤਲ = **ਅਪਸਾਰੀ**।"],
    vvip: true
  };
  T["dioptre"] = {
    ctx: ["The unit an optician writes on your spectacle prescription.",
          "ਐਨਕ ਦੇ ਨੰਬਰ ਦਾ ਮਾਤ੍ਰਕ।"],
    def: ["The SI unit of lens power — the power of a lens of focal length 1 metre.",
          "ਲੈਂਜ਼ ਸ਼ਕਤੀ ਦਾ SI ਮਾਤ੍ਰਕ।"],
    formula: "1 D = 1 m^-1",
    board: ["1 D = 1 m⁻¹. A −2.5 D prescription means a **concave** lens of focal length **40 cm**, i.e. myopia.",
            "1 D = 1 m⁻¹। −2.5 D ਦਾ ਮਤਲਬ **ਅਵਤਲ** ਲੈਂਜ਼।"],
    vvip: true
  };
  T["presbyopia"] = {
    ctx: ["Older eyes struggle with small print held close.",
          "ਵੱਡੀ ਉਮਰ ਵਿੱਚ ਨੇੜੇ ਦਾ ਪੜ੍ਹਨਾ ਔਖਾ।"],
    def: ["Age-related loss of accommodation; both near and distant vision weaken.",
          "ਉਮਰ ਨਾਲ ਸਮੰਜਨ ਸ਼ਕਤੀ ਦਾ ਘਟਣਾ।"],
    board: ["Caused by **weakening of the ciliary muscles** and hardening of the lens. Corrected by **bifocal** lenses.",
            "**ਪੱਠਿਆਂ ਦੇ ਕਮਜ਼ੋਰ** ਹੋਣ ਕਾਰਨ। **ਬਾਈਫੋਕਲ** ਲੈਂਜ਼ ਨਾਲ ਠੀਕ।"],
    vvip: true
  };
  T["cataract"] = {
    ctx: ["The lens clouds over like a frosted window.",
          "ਲੈਂਜ਼ ਧੁੰਦਲਾ ਹੋ ਜਾਂਦਾ ਹੈ।"],
    def: ["Clouding of the eye lens causing partial or complete loss of vision.",
          "ਅੱਖ ਦੇ ਲੈਂਜ਼ ਦਾ ਧੁੰਦਲਾ ਹੋਣਾ।"],
    board: ["**Cannot** be corrected by spectacles — it needs **surgical replacement** of the lens.",
            "ਐਨਕ ਨਾਲ ਠੀਕ **ਨਹੀਂ** ਹੁੰਦਾ — **ਸਰਜਰੀ** ਲੋੜੀਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["retina"] = {
    ctx: ["The screen at the back of the eye where the picture lands.",
          "ਅੱਖ ਦੇ ਪਿੱਛੇ ਪਰਦਾ ਜਿੱਥੇ ਪ੍ਰਤਿਬਿੰਬ ਬਣਦਾ ਹੈ।"],
    def: ["The light-sensitive screen at the back of the eye carrying rods and cones.",
          "ਅੱਖ ਦੇ ਪਿੱਛੇ ਪ੍ਰਕਾਸ਼-ਸੰਵੇਦੀ ਪਰਦਾ।"],
    board: ["The image on the retina is **real and inverted**; the brain turns it the right way up. **Rods** see dim light, **cones** see colour.",
            "ਪ੍ਰਤਿਬਿੰਬ **ਵਾਸਤਵਿਕ ਅਤੇ ਉਲਟਾ** ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["cornea"] = {
    ctx: ["The clear front window of the eye.",
          "ਅੱਖ ਦੀ ਸਾਫ਼ ਅਗਲੀ ਖਿੜਕੀ।"],
    def: ["The transparent front layer through which light enters the eye.",
          "ਪਾਰਦਰਸ਼ੀ ਅਗਲੀ ਪਰਤ।"],
    board: ["**Most of the refraction** happens at the cornea, not at the lens — the lens only fine-tunes the focus.",
            "**ਸਭ ਤੋਂ ਵੱਧ ਅਪਵਰਤਨ** ਕੋਰਨੀਆ 'ਤੇ ਹੁੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["iris"] = {
    ctx: ["The coloured ring that widens in the dark.",
          "ਰੰਗਦਾਰ ਛੱਲਾ ਜੋ ਹਨੇਰੇ ਵਿੱਚ ਖੁੱਲ੍ਹਦਾ ਹੈ।"],
    def: ["The coloured diaphragm that controls the size of the pupil.",
          "ਰੰਗਦਾਰ ਪਰਦਾ ਜੋ ਪੁਤਲੀ ਦਾ ਆਕਾਰ ਕਾਬੂ ਕਰਦਾ ਹੈ।"],
    board: ["The iris controls **how much light enters** by resizing the pupil.",
            "ਆਇਰਿਸ **ਪ੍ਰਕਾਸ਼ ਦੀ ਮਾਤਰਾ** ਕਾਬੂ ਕਰਦੀ ਹੈ।"],
    vvip: false
  };
  T["spectrum"] = {
    ctx: ["The rainbow of colours a prism pulls out of white light.",
          "ਪ੍ਰਿਜ਼ਮ ਤੋਂ ਨਿਕਲਦੇ ਸਤਰੰਗੀ ਰੰਗ।"],
    def: ["The band of seven colours obtained when white light is dispersed.",
          "ਚਿੱਟੇ ਪ੍ਰਕਾਸ਼ ਦੇ ਵਿਖਰਾਅ ਤੋਂ ਬਣਿਆ ਸੱਤ ਰੰਗਾਂ ਦਾ ਪੱਟਾ।"],
    board: ["Order is **VIBGYOR**. **Red bends least, violet bends most** — because violet travels slowest in glass.",
            "ਕ੍ਰਮ **VIBGYOR**। **ਲਾਲ ਸਭ ਤੋਂ ਘੱਟ, ਜਾਮਨੀ ਸਭ ਤੋਂ ਵੱਧ** ਮੁੜਦਾ ਹੈ।"],
    vvip: true
  };
  T["commercial unit"] = {
    ctx: ["The 'unit' your family's electricity bill is counted in.",
          "ਬਿਜਲੀ ਦੇ ਬਿੱਲ ਦੀ 'ਯੂਨਿਟ'।"],
    def: ["The kilowatt-hour — the energy used by a 1 kW appliance running for 1 hour.",
          "ਕਿਲੋਵਾਟ-ਘੰਟਾ — 1 kW ਉਪਕਰਨ ਦੀ 1 ਘੰਟੇ ਦੀ ਊਰਜਾ।"],
    formula: "1 kWh = 3.6 x 10^6 J",
    board: ["**1 kWh = 3.6 × 10⁶ J**. Derived as 1000 W × 3600 s. Meters count kWh, never joules.",
            "**1 kWh = 3.6 × 10⁶ J** = 1000 W × 3600 s।"],
    vvip: true
  };
  T["resistivity"] = {
    ctx: ["Copper wires the same size as nichrome — but one heats up and one does not.",
          "ਇੱਕੋ ਆਕਾਰ ਦੀਆਂ ਤਾਰਾਂ, ਪਰ ਵੱਖਰਾ ਵਿਹਾਰ।"],
    def: ["The resistance of a conductor of unit length and unit cross-sectional area.",
          "ਇਕਾਈ ਲੰਬਾਈ ਅਤੇ ਇਕਾਈ ਕਾਟ-ਖੇਤਰ ਵਾਲੇ ਚਾਲਕ ਦਾ ਪ੍ਰਤਿਰੋਧ।"],
    formula: "R = rho L / A",
    board: ["Depends **only on the material and temperature**, NOT on length or thickness. SI unit **Ω m**. Alloys like nichrome have high ρ, so they are used in heaters.",
            "ਸਿਰਫ਼ **ਪਦਾਰਥ ਅਤੇ ਤਾਪਮਾਨ** 'ਤੇ ਨਿਰਭਰ। ਮਾਤ੍ਰਕ **Ω m**।"],
    vvip: true
  };
  T["heating effect"] = {
    ctx: ["A bulb filament glowing white-hot.",
          "ਬਲਬ ਦਾ ਤੰਤੂ ਚਿੱਟਾ-ਗਰਮ ਹੋ ਕੇ ਚਮਕਦਾ ਹੈ।"],
    def: ["The production of heat when current flows through a resistor.",
          "ਪ੍ਰਤਿਰੋਧ ਵਿੱਚੋਂ ਧਾਰਾ ਲੰਘਣ 'ਤੇ ਤਾਪ ਪੈਦਾ ਹੋਣਾ।"],
    formula: "H = I^2Rt",
    board: ["H depends on **I², so doubling the current gives four times the heat**. Used in heaters, irons, and the fuse.",
            "H **I² 'ਤੇ** ਨਿਰਭਰ — ਧਾਰਾ ਦੁੱਗਣੀ ਕਰੋ ਤਾਂ ਤਾਪ ਚਾਰ ਗੁਣਾ।"],
    vvip: true
  };
  T["rheostat"] = {
    ctx: ["The dimmer knob that slides a lamp from dim to bright.",
          "ਬਲਬ ਦੀ ਰੌਸ਼ਨੀ ਘਟਾਉਣ-ਵਧਾਉਣ ਵਾਲਾ ਨੌਬ।"],
    def: ["A variable resistor used to change the current in a circuit.",
          "ਸਰਕਟ ਵਿੱਚ ਧਾਰਾ ਬਦਲਣ ਵਾਲਾ ਪਰਿਵਰਤੀ ਪ੍ਰਤਿਰੋਧ।"],
    board: ["Always connected **in series** with the component whose current is being controlled.",
            "ਹਮੇਸ਼ਾ **ਲੜੀਬੱਧ** ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ।"],
    vvip: false
  };
  T["voltmeter"] = {
    ctx: ["Measures the electrical 'push' across a component.",
          "ਕਿਸੇ ਹਿੱਸੇ ਦੇ ਦੋਵੇਂ ਪਾਸੇ ਦਾ 'ਧੱਕਾ' ਮਾਪਦਾ ਹੈ।"],
    def: ["An instrument that measures potential difference.",
          "ਵਿਭਵ ਅੰਤਰ ਮਾਪਣ ਵਾਲਾ ਯੰਤਰ।"],
    board: ["Connected **in PARALLEL** and has **very high resistance**, so it draws almost no current.",
            "**ਸਮਾਨਾਂਤਰ** ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ; **ਬਹੁਤ ਉੱਚ ਪ੍ਰਤਿਰੋਧ**।"],
    vvip: true
  };
  T["ammeter"] = {
    ctx: ["Counts how much charge flows past each second.",
          "ਹਰ ਸਕਿੰਟ ਲੰਘਦਾ ਚਾਰਜ ਗਿਣਦਾ ਹੈ।"],
    def: ["An instrument that measures electric current.",
          "ਬਿਜਲਈ ਧਾਰਾ ਮਾਪਣ ਵਾਲਾ ਯੰਤਰ।"],
    board: ["Connected **in SERIES** and has **very low resistance**, so it barely disturbs the circuit.",
            "**ਲੜੀਬੱਧ** ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ; **ਬਹੁਤ ਘੱਟ ਪ੍ਰਤਿਰੋਧ**।"],
    vvip: true
  };
  T["magnetic field"] = {
    ctx: ["The invisible region where a magnet can pull an iron nail.",
          "ਉਹ ਅਣਦਿਸਦਾ ਖੇਤਰ ਜਿੱਥੇ ਚੁੰਬਕ ਅਸਰ ਪਾਉਂਦਾ ਹੈ।"],
    def: ["The region around a magnet where its force can be detected.",
          "ਚੁੰਬਕ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਦਾ ਖੇਤਰ ਜਿੱਥੇ ਬਲ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ।"],
    board: ["A **vector** quantity — it has both magnitude and direction. SI unit **tesla (T)**.",
            "ਇਹ **ਸਦਿਸ਼** ਰਾਸ਼ੀ ਹੈ। ਮਾਤ੍ਰਕ **ਟੈਸਲਾ (T)**।"],
    vvip: true
  };
  T["magnetic field lines"] = {
    ctx: ["Iron filings around a bar magnet arrange into curves.",
          "ਚੁੰਬਕ ਦੁਆਲੇ ਲੋਹ-ਚੂਰਾ ਰੇਖਾਵਾਂ ਬਣਾਉਂਦਾ ਹੈ।"],
    def: ["Curves that show the direction a free north pole would move.",
          "ਉਹ ਰੇਖਾਵਾਂ ਜੋ ਸੁਤੰਤਰ ਉੱਤਰੀ ਧਰੁਵ ਦੀ ਦਿਸ਼ਾ ਦਰਸਾਉਂਦੀਆਂ ਹਨ।"],
    board: ["Outside the magnet they run **N → S**; inside they run **S → N**. They **never intersect** — two directions at one point is impossible.",
            "ਬਾਹਰ **N → S**, ਅੰਦਰ **S → N**। ਇਹ **ਕਦੇ ਨਹੀਂ ਕੱਟਦੀਆਂ**।"],
    vvip: true
  };
  T["electromagnet"] = {
    ctx: ["Scrapyard cranes pick up cars, then drop them by switching off.",
          "ਕਬਾੜ ਦੀ ਕ੍ਰੇਨ ਸਵਿੱਚ ਬੰਦ ਕਰਕੇ ਲੋਹਾ ਛੱਡ ਦਿੰਦੀ ਹੈ।"],
    def: ["A soft iron core magnetised by the current in a surrounding solenoid.",
          "ਸੋਲੀਨਾਇਡ ਵਿੱਚ ਧਾਰਾ ਨਾਲ ਚੁੰਬਕੀ ਬਣਿਆ ਨਰਮ ਲੋਹੇ ਦਾ ਕੋਰ।"],
    board: ["Uses **soft iron**, not steel, because soft iron **loses its magnetism** the moment the current stops.",
            "**ਨਰਮ ਲੋਹਾ** ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ ਕਿਉਂਕਿ ਇਹ ਚੁੰਬਕਤਾ **ਤੁਰੰਤ ਗੁਆ** ਦਿੰਦਾ ਹੈ।"],
    vvip: true
  };
  T["fleming's right hand rule"] = {
    ctx: ["The generator rule — motion in, current out.",
          "ਜਨਰੇਟਰ ਦਾ ਨਿਯਮ।"],
    def: ["Gives the direction of induced current in a conductor moved through a magnetic field.",
          "ਚੁੰਬਕੀ ਖੇਤਰ ਵਿੱਚ ਹਿਲਦੇ ਚਾਲਕ ਵਿੱਚ ਪ੍ਰੇਰਿਤ ਧਾਰਾ ਦੀ ਦਿਸ਼ਾ।"],
    board: ["**RIGHT hand = generator** (induced current). **LEFT hand = motor** (force). Thumb = motion, forefinger = field, middle = current.",
            "**ਸੱਜਾ ਹੱਥ = ਜਨਰੇਟਰ**, **ਖੱਬਾ ਹੱਥ = ਮੋਟਰ**।"],
    vvip: true
  };
  T["electric motor"] = {
    ctx: ["A fan turning — electricity becoming motion.",
          "ਪੱਖਾ ਘੁੰਮਦਾ ਹੈ — ਬਿਜਲੀ ਤੋਂ ਗਤੀ।"],
    def: ["A device that converts electrical energy into mechanical energy.",
          "ਬਿਜਲਈ ਊਰਜਾ ਨੂੰ ਯਾਂਤ੍ਰਿਕ ਊਰਜਾ ਵਿੱਚ ਬਦਲਣ ਵਾਲਾ ਯੰਤਰ।"],
    board: ["The **split-ring commutator reverses the current every half turn**, which keeps the coil rotating the same way. Uses **Fleming's LEFT hand rule**.",
            "**ਸਪਲਿਟ-ਰਿੰਗ** ਹਰ ਅੱਧੇ ਚੱਕਰ 'ਤੇ ਧਾਰਾ ਉਲਟਾਉਂਦਾ ਹੈ। **ਖੱਬੇ ਹੱਥ** ਦਾ ਨਿਯਮ।"],
    vvip: true
  };
  T["generator"] = {
    ctx: ["A cycle dynamo lighting a lamp as you pedal.",
          "ਸਾਈਕਲ ਦੀ ਡਾਇਨਮੋ।"],
    def: ["A device that converts mechanical energy into electrical energy.",
          "ਯਾਂਤ੍ਰਿਕ ਊਰਜਾ ਨੂੰ ਬਿਜਲਈ ਊਰਜਾ ਵਿੱਚ ਬਦਲਦਾ ਹੈ।"],
    board: ["Works by **electromagnetic induction**. **Slip rings ⇒ AC**; a **split ring ⇒ DC**. Uses **Fleming's RIGHT hand rule**.",
            "**ਸਲਿੱਪ ਰਿੰਗ ⇒ AC**, **ਸਪਲਿਟ ਰਿੰਗ ⇒ DC**। **ਸੱਜੇ ਹੱਥ** ਦਾ ਨਿਯਮ।"],
    vvip: true
  };
  T["alternating current"] = {
    ctx: ["Mains electricity — it flips direction 50 times a second.",
          "ਘਰੇਲੂ ਬਿਜਲੀ — ਦਿਸ਼ਾ ਬਦਲਦੀ ਰਹਿੰਦੀ ਹੈ।"],
    def: ["Current that reverses its direction periodically.",
          "ਉਹ ਧਾਰਾ ਜੋ ਨਿਯਮਿਤ ਰੂਪ ਵਿੱਚ ਦਿਸ਼ਾ ਬਦਲਦੀ ਹੈ।"],
    board: ["In India AC reverses **100 times per second** — its frequency is **50 Hz**, and one cycle has two reversals. AC can be **transmitted over long distances** with far less loss.",
            "ਭਾਰਤ ਵਿੱਚ ਆਵਿਰਤੀ **50 Hz** — ਦਿਸ਼ਾ **100 ਵਾਰ ਪ੍ਰਤੀ ਸਕਿੰਟ** ਬਦਲਦੀ ਹੈ।"],
    vvip: true
  };
  T["direct current"] = {
    ctx: ["A torch cell — current always flows one way.",
          "ਟਾਰਚ ਦਾ ਸੈੱਲ — ਧਾਰਾ ਇੱਕੋ ਦਿਸ਼ਾ ਵਿੱਚ।"],
    def: ["Current that flows in one direction only.",
          "ਸਿਰਫ਼ ਇੱਕ ਦਿਸ਼ਾ ਵਿੱਚ ਵਗਦੀ ਧਾਰਾ।"],
    board: ["Given by **cells and batteries**. Cannot be stepped up or down by a transformer, so it is poor for long-distance transmission.",
            "**ਸੈੱਲਾਂ ਅਤੇ ਬੈਟਰੀਆਂ** ਤੋਂ ਮਿਲਦੀ ਹੈ।"],
    vvip: false
  };
  T["non-renewable energy"] = {
    ctx: ["Coal took 300 million years to form — and we burn it in a moment.",
          "ਕੋਲਾ ਕਰੋੜਾਂ ਸਾਲਾਂ ਵਿੱਚ ਬਣਿਆ।"],
    def: ["Sources present in limited amount that cannot be replenished on a human timescale.",
          "ਸੀਮਤ ਸ੍ਰੋਤ ਜੋ ਮੁੜ ਨਹੀਂ ਬਣਦੇ।"],
    board: ["Coal, petroleum, natural gas and nuclear fuel. They **pollute** and **will run out** — the two marks examiners look for.",
            "ਕੋਲਾ, ਪੈਟਰੋਲੀਅਮ, ਕੁਦਰਤੀ ਗੈਸ। ਇਹ **ਪ੍ਰਦੂਸ਼ਣ** ਕਰਦੇ ਹਨ ਅਤੇ **ਖ਼ਤਮ** ਹੋ ਜਾਣਗੇ।"],
    vvip: true
  };
  T["fossil fuel"] = {
    ctx: ["Buried plants and animals, pressure-cooked for millions of years.",
          "ਕਰੋੜਾਂ ਸਾਲ ਦੱਬੇ ਜੀਵ-ਜੰਤੂ।"],
    def: ["Fuel formed from the remains of organisms buried under pressure and heat.",
          "ਦੱਬੇ ਹੋਏ ਜੀਵਾਂ ਦੇ ਅਵਸ਼ੇਸ਼ਾਂ ਤੋਂ ਬਣਿਆ ਬਾਲਣ।"],
    board: ["Burning them releases **CO₂ (greenhouse effect)** plus **oxides of sulphur and nitrogen, which cause acid rain**.",
            "ਇਨ੍ਹਾਂ ਨੂੰ ਸਾੜਨ ਨਾਲ **CO₂** ਅਤੇ **ਤੇਜ਼ਾਬੀ ਵਰਖਾ** ਵਾਲੀਆਂ ਗੈਸਾਂ ਨਿਕਲਦੀਆਂ ਹਨ।"],
    vvip: true
  };
  T["biomass"] = {
    ctx: ["Cow dung cakes and firewood — stored sunlight.",
          "ਪਾਥੀਆਂ ਅਤੇ ਬਾਲਣ — ਸੰਭਾਲੀ ਹੋਈ ਧੁੱਪ।"],
    def: ["Organic matter from plants and animals used as a fuel.",
          "ਪੌਦਿਆਂ ਅਤੇ ਜਾਨਵਰਾਂ ਤੋਂ ਮਿਲਦਾ ਬਾਲਣ।"],
    board: ["**Charcoal** burns better than wood: it gives **more heat per kg, no smoke and no flame**.",
            "**ਚਾਰਕੋਲ** ਲੱਕੜ ਨਾਲੋਂ ਵਧੀਆ — **ਵੱਧ ਤਾਪ, ਧੂੰਆਂ ਨਹੀਂ**।"],
    vvip: true
  };
  T["solar cooker"] = {
    ctx: ["A box that cooks dal using nothing but sunshine.",
          "ਸਿਰਫ਼ ਧੁੱਪ ਨਾਲ ਦਾਲ ਪਕਾਉਣ ਵਾਲਾ ਡੱਬਾ।"],
    def: ["A device that traps solar energy to cook food.",
          "ਸੂਰਜੀ ਊਰਜਾ ਨਾਲ ਭੋਜਨ ਪਕਾਉਣ ਵਾਲਾ ਯੰਤਰ।"],
    board: ["Painted **black inside** to absorb heat, covered with a **glass sheet** for the greenhouse effect, and a **plane mirror** reflects extra light in. Reaches 100–140 °C.",
            "ਅੰਦਰੋਂ **ਕਾਲਾ**, ਉੱਤੇ **ਕੱਚ**, ਅਤੇ **ਸਮਤਲ ਦਰਪਣ**।"],
    vvip: true
  };
  T["hydro power"] = {
    ctx: ["A dam turning falling water into electricity.",
          "ਡੈਮ ਤੋਂ ਡਿਗਦਾ ਪਾਣੀ ਬਿਜਲੀ ਬਣਾਉਂਦਾ ਹੈ।"],
    def: ["Electricity generated from the potential energy of stored water.",
          "ਸੰਭਾਲੇ ਪਾਣੀ ਦੀ ਸਥਿਤਿਜ ਊਰਜਾ ਤੋਂ ਬਿਜਲੀ।"],
    board: ["Renewable and non-polluting, **but** dams **submerge farmland and forests and displace people** — the standard 'disadvantages' answer.",
            "ਨਵਿਆਉਣਯੋਗ, **ਪਰ** ਡੈਮ **ਜ਼ਮੀਨ ਡੁਬੋਂਦੇ ਅਤੇ ਲੋਕ ਉਜਾੜਦੇ** ਹਨ।"],
    vvip: true
  };
  T["geothermal energy"] = {
    ctx: ["Hot springs — the Earth's own underground furnace.",
          "ਗਰਮ ਚਸ਼ਮੇ — ਧਰਤੀ ਦੀ ਆਪਣੀ ਭੱਠੀ।"],
    def: ["Energy obtained from heat stored in the Earth's hot spots.",
          "ਧਰਤੀ ਦੇ ਗਰਮ ਸਥਾਨਾਂ ਵਿੱਚ ਸੰਭਾਲੇ ਤਾਪ ਤੋਂ ਊਰਜਾ।"],
    board: ["Underground water becomes **steam** in hot spots; the steam drives a turbine. Clean, but usable at **very few sites**.",
            "ਭੂਮੀਗਤ ਪਾਣੀ **ਭਾਫ਼** ਬਣਦਾ ਹੈ ਜੋ ਟਰਬਾਈਨ ਘੁਮਾਉਂਦੀ ਹੈ।"],
    vvip: false
  };
  T["ten percent law"] = {
    ctx: ["Ten roti-fulls of grass make only one roti-full of deer.",
          "ਦਸ ਹਿੱਸੇ ਘਾਹ ਤੋਂ ਸਿਰਫ਼ ਇੱਕ ਹਿੱਸਾ ਹਿਰਨ ਬਣਦਾ ਹੈ।"],
    def: ["Only about 10% of the energy at one trophic level passes to the next.",
          "ਇੱਕ ਪੋਸ਼ੀ ਪੱਧਰ ਦੀ ਸਿਰਫ਼ 10% ਊਰਜਾ ਅਗਲੇ ਪੱਧਰ ਤੱਕ ਜਾਂਦੀ ਹੈ।"],
    formula: "10% transferred, 90% lost as heat",
    board: ["The other **90% is lost as heat** and in life processes. This is exactly why food chains are limited to **3 or 4 trophic levels**.",
            "ਬਾਕੀ **90% ਤਾਪ ਵਜੋਂ ਨਸ਼ਟ** ਹੁੰਦੀ ਹੈ — ਇਸੇ ਲਈ ਭੋਜਨ ਲੜੀ **3-4 ਪੱਧਰਾਂ** ਤੱਕ ਸੀਮਤ ਹੈ।"],
    vvip: true
  };
  T["ecosystem"] = {
    ctx: ["A pond: fish, plants, water and sunlight all working as one.",
          "ਇੱਕ ਛੱਪੜ — ਮੱਛੀ, ਪੌਦੇ, ਪਾਣੀ ਸਭ ਇਕੱਠੇ।"],
    def: ["All the living organisms of an area together with their non-living surroundings.",
          "ਕਿਸੇ ਖੇਤਰ ਦੇ ਸਾਰੇ ਜੀਵ ਅਤੇ ਉਨ੍ਹਾਂ ਦਾ ਨਿਰਜੀਵ ਵਾਤਾਵਰਣ।"],
    board: ["**Biotic** = living components; **abiotic** = non-living. A **forest is natural**, an **aquarium is artificial**.",
            "**ਜੈਵਿਕ** = ਸਜੀਵ; **ਅਜੈਵਿਕ** = ਨਿਰਜੀਵ। ਐਕੁਏਰੀਅਮ **ਬਣਾਵਟੀ** ਹੈ।"],
    vvip: true
  };
  T["food web"] = {
    ctx: ["Real life is not a single chain — it is a tangled net.",
          "ਅਸਲ ਵਿੱਚ ਭੋਜਨ ਲੜੀ ਨਹੀਂ, ਜਾਲ ਹੁੰਦਾ ਹੈ।"],
    def: ["A network of many interconnected food chains in an ecosystem.",
          "ਆਪਸ ਵਿੱਚ ਜੁੜੀਆਂ ਕਈ ਭੋਜਨ ਲੜੀਆਂ ਦਾ ਜਾਲ।"],
    board: ["More realistic than a single chain because most animals **eat more than one kind of food**, which makes the ecosystem **more stable**.",
            "ਜ਼ਿਆਦਾ ਵਾਸਤਵਿਕ, ਕਿਉਂਕਿ ਜੀਵ **ਕਈ ਤਰ੍ਹਾਂ ਦਾ ਭੋਜਨ** ਖਾਂਦੇ ਹਨ।"],
    vvip: true
  };
  T["producer"] = {
    ctx: ["Green plants — the only ones that make their own food.",
          "ਹਰੇ ਪੌਦੇ — ਆਪਣਾ ਭੋਜਨ ਆਪ ਬਣਾਉਂਦੇ ਹਨ।"],
    def: ["Organisms that make their own food by photosynthesis.",
          "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਨਾਲ ਆਪਣਾ ਭੋਜਨ ਬਣਾਉਣ ਵਾਲੇ ਜੀਵ।"],
    board: ["Always the **first trophic level**. All the energy in every food chain **enters through the producers**.",
            "ਹਮੇਸ਼ਾ **ਪਹਿਲਾ ਪੋਸ਼ੀ ਪੱਧਰ**।"],
    vvip: true
  };
  T["consumer"] = {
    ctx: ["Everything that has to eat something else to live.",
          "ਹਰ ਉਹ ਜੀਵ ਜਿਸ ਨੂੰ ਖਾਣਾ ਪੈਂਦਾ ਹੈ।"],
    def: ["Organisms that depend on producers or other consumers for food.",
          "ਭੋਜਨ ਲਈ ਪੌਦਿਆਂ ਜਾਂ ਹੋਰ ਜੀਵਾਂ 'ਤੇ ਨਿਰਭਰ ਜੀਵ।"],
    board: ["**Herbivores** eat plants, **carnivores** eat animals, **omnivores** eat both, **parasites** feed on a living host.",
            "**ਸ਼ਾਕਾਹਾਰੀ, ਮਾਸਾਹਾਰੀ, ਸਰਵਾਹਾਰੀ, ਪਰਜੀਵੀ**।"],
    vvip: false
  };
  T["non-biodegradable"] = {
    ctx: ["A plastic bag outlives the person who threw it away.",
          "ਪਲਾਸਟਿਕ ਦਾ ਲਿਫ਼ਾਫ਼ਾ ਸਦੀਆਂ ਰਹਿੰਦਾ ਹੈ।"],
    def: ["Substances that cannot be broken down by decomposers.",
          "ਉਹ ਪਦਾਰਥ ਜੋ ਅਪਘਟਕਾਂ ਦੁਆਰਾ ਨਹੀਂ ਟੁੱਟਦੇ।"],
    board: ["Plastics, DDT and glass. Because they persist, they **enter food chains and cause biomagnification**.",
            "ਪਲਾਸਟਿਕ, DDT। ਇਹ **ਭੋਜਨ ਲੜੀ ਵਿੱਚ ਜਾ ਕੇ ਜੈਵ ਵੱਡਦਰਸ਼ਨ** ਕਰਦੇ ਹਨ।"],
    vvip: true
  };
  T["chlorofluorocarbon"] = {
    ctx: ["The gas old fridges and sprays leaked into the sky.",
          "ਪੁਰਾਣੇ ਫਰਿੱਜਾਂ ਤੇ ਸਪਰੇਆਂ ਤੋਂ ਨਿਕਲੀ ਗੈਸ।"],
    def: ["Synthetic compounds of carbon, chlorine and fluorine used in refrigerants and sprays.",
          "ਕਾਰਬਨ, ਕਲੋਰੀਨ ਅਤੇ ਫਲੋਰੀਨ ਦੇ ਬਣਾਵਟੀ ਯੋਗਿਕ।"],
    formula: "O3 + Cl -> ClO + O2",
    board: ["UV light frees a **chlorine atom**, and **one Cl atom destroys about 100 000 ozone molecules**. Banned by the **1987 Montreal Protocol**.",
            "UV ਨਾਲ **ਕਲੋਰੀਨ ਪਰਮਾਣੂ** ਨਿਕਲਦਾ ਹੈ ਜੋ ਹਜ਼ਾਰਾਂ ਓਜ਼ੋਨ ਅਣੂ ਨਸ਼ਟ ਕਰਦਾ ਹੈ। **ਮਾਂਟਰੀਅਲ ਪ੍ਰੋਟੋਕੋਲ 1987**।"],
    vvip: true
  };
  T["five r's"] = {
    ctx: ["Refuse it, use less, use again, repurpose, then recycle.",
          "ਨਾਂਹ ਕਰੋ, ਘੱਟ ਵਰਤੋ, ਮੁੜ ਵਰਤੋ, ਮੁੜ ਮੰਤਵ, ਪੁਨਰ-ਚੱਕਰਣ।"],
    def: ["The five-step waste hierarchy for sustainable living.",
          "ਟਿਕਾਊ ਜੀਵਨ ਲਈ ਪੰਜ-ਪੜਾਵੀ ਕ੍ਰਮ।"],
    board: ["**Refuse (ਨਾਂਹ ਕਰਨਾ) · Reduce (ਘੱਟ ਵਰਤੋਂ) · Reuse (ਮੁੜ ਵਰਤੋਂ) · Repurpose (ਮੁੜ ਮੰਤਵ) · Recycle (ਪੁਨਰ-ਚੱਕਰਣ)**. Note the order: **Reduce comes before Recycle**, because recycling still costs energy.",
            "**ਨਾਂਹ ਕਰਨਾ · ਘੱਟ ਵਰਤੋਂ · ਮੁੜ ਵਰਤੋਂ · ਮੁੜ ਮੰਤਵ · ਪੁਨਰ-ਚੱਕਰਣ**। **ਘੱਟ ਵਰਤੋਂ ਪਹਿਲਾਂ** ਆਉਂਦੀ ਹੈ।"],
    vvip: true
  };
  T["amrita devi bishnoi"] = {
    ctx: ["A woman who hugged a tree and would not let go.",
          "ਇੱਕ ਔਰਤ ਜਿਸ ਨੇ ਰੁੱਖ ਨੂੰ ਜੱਫੀ ਪਾ ਲਈ।"],
    def: ["The leader who, with 363 Bishnois, died in 1731 protecting khejri trees at Khejarli, Rajasthan.",
          "ਉਹ ਆਗੂ ਜਿਸ ਨੇ 363 ਬਿਸ਼ਨੋਈਆਂ ਨਾਲ 1731 ਵਿੱਚ ਖੇਜਰੀ ਰੁੱਖਾਂ ਲਈ ਜਾਨ ਦਿੱਤੀ।"],
    board: ["India's **Amrita Devi Bishnoi Wildlife Protection Award** is named after her. She is the historical ancestor of the **Chipko Movement**.",
            "ਭਾਰਤ ਦਾ **ਅੰਮ੍ਰਿਤਾ ਦੇਵੀ ਬਿਸ਼ਨੋਈ ਪੁਰਸਕਾਰ** ਉਨ੍ਹਾਂ ਦੇ ਨਾਂ 'ਤੇ ਹੈ। **ਚਿਪਕੋ ਅੰਦੋਲਨ** ਦੀ ਪ੍ਰੇਰਨਾ।"],
    vvip: true
  };
  T["conservation"] = {
    ctx: ["Use the forest, but leave enough for your grandchildren.",
          "ਜੰਗਲ ਵਰਤੋ, ਪਰ ਅਗਲੀ ਪੀੜ੍ਹੀ ਲਈ ਵੀ ਬਚਾਓ।"],
    def: ["The careful and planned use of natural resources so they last.",
          "ਕੁਦਰਤੀ ਸ੍ਰੋਤਾਂ ਦੀ ਸੋਚੀ-ਸਮਝੀ ਵਰਤੋਂ।"],
    board: ["Conservation means **wise use**, not no use — that is the difference examiners test against **preservation**.",
            "ਸੰਭਾਲ ਦਾ ਮਤਲਬ **ਸਿਆਣੀ ਵਰਤੋਂ** ਹੈ, ਵਰਤੋਂ ਬੰਦ ਕਰਨਾ ਨਹੀਂ।"],
    vvip: true
  };
  T["stakeholder"] = {
    ctx: ["Everyone with something to gain or lose from the forest.",
          "ਜੰਗਲ ਨਾਲ ਜੁੜੇ ਸਾਰੇ ਲੋਕ।"],
    def: ["Any group with an interest in how a resource is managed.",
          "ਸ੍ਰੋਤ ਦੇ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਹਿੱਤ ਰੱਖਣ ਵਾਲਾ ਕੋਈ ਵੀ ਸਮੂਹ।"],
    board: ["The four forest stakeholders: **local people, the Forest Department, industrialists, and wildlife/nature activists**.",
            "ਚਾਰ ਹਿੱਤਧਾਰਕ: **ਸਥਾਨਕ ਲੋਕ, ਜੰਗਲਾਤ ਵਿਭਾਗ, ਉਦਯੋਗਪਤੀ, ਵਾਤਾਵਰਣ ਕਾਰਕੁਨ**।"],
    vvip: true
  };
  T["ganga action plan"] = {
    ctx: ["A national clean-up for a river treated as sacred.",
          "ਪਵਿੱਤਰ ਦਰਿਆ ਦੀ ਸਫ਼ਾਈ ਦੀ ਯੋਜਨਾ।"],
    def: ["A multi-crore project launched in 1985 to clean the Ganga.",
          "1985 ਵਿੱਚ ਗੰਗਾ ਦੀ ਸਫ਼ਾਈ ਲਈ ਸ਼ੁਰੂ ਕੀਤੀ ਯੋਜਨਾ।"],
    board: ["Water quality is judged by **coliform bacteria**, whose presence indicates **contamination by untreated sewage**.",
            "ਪਾਣੀ ਦੀ ਜਾਂਚ **ਕੋਲੀਫਾਰਮ ਬੈਕਟੀਰੀਆ** ਨਾਲ — ਇਹ **ਮਲ-ਪ੍ਰਦੂਸ਼ਣ** ਦਰਸਾਉਂਦੇ ਹਨ।"],
    vvip: false
  };

}());
