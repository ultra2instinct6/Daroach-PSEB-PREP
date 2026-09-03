/* PSEB Class 10 Science — shared bilingual scientific-terminology glossary.
   Single source of truth for:
     • <sci-term> inline vocabulary popovers (assets/sci-term.js)
     • bilingual cross-language syllabus search (index.html + assets/search-index.js)

   Loaded with a classic <script> tag (no modules) so it keeps working over the
   file:// scheme, matching assets/chapters.js.

   Entry shape:
     en   — canonical English term (also the lookup key, lower-cased)
     pa   — Gurmukhi equivalent
     ph   — syllabic phonetic breakdown, stressed syllable in CAPS
     ch   — chapter numbers (menu numbering, 1-16) where the term is taught
     alt  — optional extra English spellings/synonyms that resolve to this entry */
(function () {
  "use strict";

  var TERMS = [
    /* ---- Ch 1 · Chemical Reactions and Equations ---- */
    { en: "Chemical Reaction", pa: "ਰਸਾਇਣਕ ਕਿਰਿਆ", ph: "KEM-i-kal ree-AK-shun", ch: [1] },
    { en: "Chemical Equation", pa: "ਰਸਾਇਣਕ ਸਮੀਕਰਣ", ph: "KEM-i-kal i-KWAY-zhun", ch: [1] },
    { en: "Reactant", pa: "ਅਭਿਕਾਰਕ", ph: "ree-AK-tant", ch: [1] },
    { en: "Product", pa: "ਉਤਪਾਦ", ph: "PROD-ukt", ch: [1] },
    { en: "Combination Reaction", pa: "ਸੰਯੋਜਨ ਕਿਰਿਆ", ph: "kom-bi-NAY-shun ree-AK-shun", ch: [1] },
    { en: "Decomposition Reaction", pa: "ਅਪਘਟਨ ਪ੍ਰਤੀਕਿਰਿਆ", ph: "de-com-po-ZISH-un ree-AK-shun", ch: [1], alt: ["Decomposition"] },
    { en: "Displacement Reaction", pa: "ਵਿਸਥਾਪਨ ਕਿਰਿਆ", ph: "dis-PLAYS-ment ree-AK-shun", ch: [1, 3], alt: ["Displacement"] },
    { en: "Double Displacement", pa: "ਦੂਹਰਾ ਵਿਸਥਾਪਨ", ph: "DUB-ul dis-PLAYS-ment", ch: [1, 2] },
    { en: "Oxidation", pa: "ਆਕਸੀਕਰਨ", ph: "ok-si-DAY-shun", ch: [1, 3, 4] },
    { en: "Reduction", pa: "ਲਘੂਕਰਨ", ph: "ri-DUK-shun", ch: [1, 3] },
    { en: "Redox Reaction", pa: "ਰੈਡੌਕਸ ਕਿਰਿਆ", ph: "REE-doks ree-AK-shun", ch: [1] },
    { en: "Exothermic", pa: "ਤਾਪ ਨਿਕਾਸੀ", ph: "ek-so-THUR-mik", ch: [1] },
    { en: "Endothermic", pa: "ਤਾਪ ਸੋਖੀ", ph: "en-do-THUR-mik", ch: [1] },
    { en: "Corrosion", pa: "ਖੋਰ", ph: "kuh-ROH-zhun", ch: [1, 3] },
    { en: "Rancidity", pa: "ਗੰਧਲਾਪਨ", ph: "ran-SID-i-tee", ch: [1] },
    { en: "Precipitate", pa: "ਅਵਖੇਪ", ph: "pri-SIP-i-tayt", ch: [1, 2] },
    { en: "Catalyst", pa: "ਉਤਪ੍ਰੇਰਕ", ph: "KAT-uh-list", ch: [1, 4] },
    { en: "Conservation of Mass", pa: "ਪੁੰਜ ਦੀ ਸੰਭਾਲ", ph: "kon-ser-VAY-shun uv MASS", ch: [1] },

    /* ---- Ch 2 · Acids, Bases and Salts ---- */
    { en: "Acid", pa: "ਤੇਜ਼ਾਬ", ph: "AS-id", ch: [2] },
    { en: "Base", pa: "ਖਾਰ", ph: "BAYSS", ch: [2] },
    { en: "Salt", pa: "ਲੂਣ", ph: "SAWLT", ch: [2] },
    { en: "Indicator", pa: "ਸੂਚਕ", ph: "IN-di-kay-tor", ch: [2] },
    { en: "Neutralisation", pa: "ਉਦਾਸੀਨੀਕਰਨ", ph: "new-truh-lie-ZAY-shun", ch: [2], alt: ["Neutralization"] },
    { en: "pH Scale", pa: "pH ਪੈਮਾਨਾ", ph: "PEE-AYCH skayl", ch: [2] },
    { en: "Alkali", pa: "ਖਾਰੀ", ph: "AL-kuh-lie", ch: [2] },
    { en: "Water of Crystallisation", pa: "ਕ੍ਰਿਸਟਲਨ ਜਲ", ph: "WAW-ter uv kris-tuh-lie-ZAY-shun", ch: [2], alt: ["Water of Crystallization"] },
    { en: "Efflorescence", pa: "ਫੁਟਾਵ", ph: "ef-luh-RESS-unss", ch: [2] },
    { en: "Chlor-alkali Process", pa: "ਕਲੋਰ-ਖਾਰ ਪ੍ਰਕਿਰਿਆ", ph: "KLOR-AL-kuh-lie PRO-sess", ch: [2] },
    { en: "Baking Soda", pa: "ਖਾਣ ਵਾਲਾ ਸੋਡਾ", ph: "BAY-king SOH-duh", ch: [2] },
    { en: "Washing Soda", pa: "ਧੋਣ ਵਾਲਾ ਸੋਡਾ", ph: "WOSH-ing SOH-duh", ch: [2] },
    { en: "Plaster of Paris", pa: "ਪਲਾਸਟਰ ਆਫ਼ ਪੈਰਿਸ", ph: "PLAH-ster uv PA-riss", ch: [2] },
    { en: "Bleaching Powder", pa: "ਵਿਰੰਜਕ ਚੂਰਨ", ph: "BLEE-ching POW-der", ch: [2] },

    /* ---- Ch 3 · Metals and Non-metals ---- */
    { en: "Metal", pa: "ਧਾਤ", ph: "MET-ul", ch: [3] },
    { en: "Non-metal", pa: "ਅਧਾਤ", ph: "non-MET-ul", ch: [3], alt: ["Nonmetal"] },
    { en: "Malleability", pa: "ਕੁਟੀਯੋਗਤਾ", ph: "mal-ee-uh-BIL-i-tee", ch: [3], alt: ["Malleable"] },
    { en: "Ductility", pa: "ਖਿੱਚੀਯੋਗਤਾ", ph: "duk-TIL-i-tee", ch: [3], alt: ["Ductile"] },
    { en: "Sonorous", pa: "ਖੜਕਦਾਰ", ph: "SON-uh-rus", ch: [3] },
    { en: "Alloy", pa: "ਮਿਸ਼ਰਤ ਧਾਤ", ph: "AL-oy", ch: [3] },
    { en: "Amphoteric Oxide", pa: "ਉਭੈਧਰਮੀ ਆਕਸਾਈਡ", ph: "am-fuh-TERR-ik OK-side", ch: [3] },
    { en: "Ionic Bond", pa: "ਆਇਓਨਿਕ ਬੰਧ", ph: "eye-ON-ik BOND", ch: [3] },
    { en: "Reactivity Series", ph: "ree-ak-TIV-i-tee SEER-eez", pa: "ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ", ch: [3] },
    { en: "Ore", pa: "ਕੱਚੀ ਧਾਤ", ph: "OR", ch: [3] },
    { en: "Gangue", pa: "ਮਲੜ", ph: "GANG", ch: [3] },
    { en: "Roasting", pa: "ਭੁੰਨਣਾ", ph: "ROHS-ting", ch: [3] },
    { en: "Calcination", pa: "ਨਿਖੇਪਣ", ph: "kal-si-NAY-shun", ch: [3] },
    { en: "Galvanisation", pa: "ਜਸਤੀਕਰਨ", ph: "gal-vuh-nie-ZAY-shun", ch: [3], alt: ["Galvanization"] },
    { en: "Thermit Reaction", pa: "ਥਰਮਿਟ ਕਿਰਿਆ", ph: "THUR-mit ree-AK-shun", ch: [3] },
    { en: "Aqua Regia", pa: "ਐਕਵਾ ਰੀਜੀਆ", ph: "AH-kwuh REE-jee-uh", ch: [3] },

    /* ---- Ch 4 · Carbon and its Compounds ---- */
    { en: "Covalent Bond", pa: "ਸਹਿ-ਸੰਯੋਜਕ ਬੰਧ", ph: "koh-VAY-lunt BOND", ch: [4] },
    { en: "Catenation", pa: "ਸ਼੍ਰਿੰਖਲਨ", ph: "kat-uh-NAY-shun", ch: [4] },
    { en: "Tetravalency", pa: "ਚਤੁਰ-ਸੰਯੋਜਕਤਾ", ph: "tet-ruh-VAY-lun-see", ch: [4] },
    { en: "Hydrocarbon", pa: "ਹਾਈਡ੍ਰੋਕਾਰਬਨ", ph: "HIE-droh-kar-bun", ch: [4] },
    { en: "Saturated Compound", pa: "ਸੰਤ੍ਰਿਪਤ ਯੋਗਿਕ", ph: "SATCH-uh-ray-ted KOM-pownd", ch: [4] },
    { en: "Unsaturated Compound", pa: "ਅਸੰਤ੍ਰਿਪਤ ਯੋਗਿਕ", ph: "un-SATCH-uh-ray-ted KOM-pownd", ch: [4] },
    { en: "Isomer", pa: "ਸਮਅੰਗਕ", ph: "EYE-so-mer", ch: [4], alt: ["Isomerism"] },
    { en: "Homologous Series", pa: "ਸਮਜਾਤੀ ਲੜੀ", ph: "huh-MOL-uh-gus SEER-eez", ch: [4] },
    { en: "Functional Group", pa: "ਕਿਰਿਆਸ਼ੀਲ ਸਮੂਹ", ph: "FUNK-shun-ul GROOP", ch: [4] },
    { en: "Esterification", pa: "ਐਸਟਰੀਕਰਨ", ph: "es-ter-i-fi-KAY-shun", ch: [4] },
    { en: "Saponification", pa: "ਸਾਬਣੀਕਰਨ", ph: "suh-pon-i-fi-KAY-shun", ch: [4] },
    { en: "Micelle", pa: "ਮਿਸੈੱਲ", ph: "my-SELL", ch: [4] },
    { en: "Hydrogenation", pa: "ਹਾਈਡ੍ਰੋਜਨੀਕਰਨ", ph: "hie-druh-juh-NAY-shun", ch: [4] },
    { en: "Denatured Alcohol", pa: "ਵਿਕ੍ਰਿਤ ਅਲਕੋਹਲ", ph: "dee-NAY-cherd AL-kuh-hol", ch: [4] },
    { en: "Allotrope", pa: "ਅਪਰਰੂਪ", ph: "AL-uh-trohp", ch: [4], alt: ["Allotropy"] },

    /* ---- Ch 5 · Periodic Classification of Elements ---- */
    { en: "Periodic Table", pa: "ਆਵਰਤੀ ਸਾਰਨੀ", ph: "peer-ee-OD-ik TAY-bul", ch: [5] },
    { en: "Atomic Number", pa: "ਪਰਮਾਣੂ ਸੰਖਿਆ", ph: "uh-TOM-ik NUM-ber", ch: [5] },
    { en: "Valence Electron", pa: "ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨ", ph: "VAY-lunss i-LEK-tron", ch: [5] },
    { en: "Valency", pa: "ਸੰਯੋਜਕਤਾ", ph: "VAY-lun-see", ch: [5] },
    { en: "Period", pa: "ਆਵਰਤ", ph: "PEER-ee-ud", ch: [5] },
    { en: "Group", pa: "ਸਮੂਹ", ph: "GROOP", ch: [5] },
    { en: "Electronegativity", pa: "ਬਿਜਲਈ ਰਿਣਾਤਮਕਤਾ", ph: "i-lek-troh-neg-uh-TIV-i-tee", ch: [5] },
    { en: "Atomic Radius", pa: "ਪਰਮਾਣੂ ਅਰਧ ਵਿਆਸ", ph: "uh-TOM-ik RAY-dee-us", ch: [5] },
    { en: "Metalloid", pa: "ਉਪਧਾਤ", ph: "MET-uh-loyd", ch: [5] },
    { en: "Dobereiner's Triads", pa: "ਡੌਬਰਾਈਨਰ ਦੀਆਂ ਤਿੱਕੜੀਆਂ", ph: "DOH-ber-eye-ner TRY-adz", ch: [5], alt: ["Triads"] },
    { en: "Law of Octaves", pa: "ਅਸ਼ਟਕ ਨਿਯਮ", ph: "LAW uv OK-tayvz", ch: [5] },
    { en: "Mendeleev's Periodic Law", pa: "ਮੈਂਡਲੀਵ ਦਾ ਆਵਰਤੀ ਨਿਯਮ", ph: "men-duh-LAY-ef peer-ee-OD-ik LAW", ch: [5], alt: ["Mendeleev"] },

    /* ---- Ch 6 · Life Processes ---- */
    { en: "Nutrition", pa: "ਪੋਸ਼ਣ", ph: "noo-TRISH-un", ch: [6] },
    { en: "Photosynthesis", pa: "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ", ph: "foh-toh-SIN-thuh-siss", ch: [6] },
    { en: "Chlorophyll", pa: "ਹਰਿਤ ਲਵਕ", ph: "KLOR-uh-fil", ch: [6] },
    { en: "Stomata", pa: "ਸਟੋਮੈਟਾ", ph: "stoh-MAH-tuh", ch: [6], alt: ["Stoma"] },
    { en: "Autotrophic Nutrition", pa: "ਸਵੈਪੋਸ਼ੀ ਪੋਸ਼ਣ", ph: "aw-toh-TROH-fik noo-TRISH-un", ch: [6], alt: ["Autotroph"] },
    { en: "Heterotrophic Nutrition", pa: "ਪਰਪੋਸ਼ੀ ਪੋਸ਼ਣ", ph: "het-uh-roh-TROH-fik noo-TRISH-un", ch: [6], alt: ["Heterotroph"] },
    { en: "Respiration", pa: "ਸਾਹ ਕਿਰਿਆ", ph: "res-pi-RAY-shun", ch: [6] },
    { en: "Anaerobic Respiration", pa: "ਅਣਆਕਸੀ ਸਾਹ ਕਿਰਿਆ", ph: "an-uh-ROH-bik res-pi-RAY-shun", ch: [6], alt: ["Anaerobic"] },
    { en: "Aerobic Respiration", pa: "ਆਕਸੀ ਸਾਹ ਕਿਰਿਆ", ph: "air-OH-bik res-pi-RAY-shun", ch: [6], alt: ["Aerobic"] },
    { en: "Transpiration", pa: "ਵਾਸ਼ਪ ਉਤਸਰਜਨ", ph: "tran-spi-RAY-shun", ch: [6] },
    { en: "Translocation", pa: "ਸਥਾਨਾਂਤਰਣ", ph: "tranz-loh-KAY-shun", ch: [6] },
    { en: "Xylem", pa: "ਜ਼ਾਈਲਮ", ph: "ZY-lem", ch: [6] },
    { en: "Phloem", pa: "ਫਲੋਇਮ", ph: "FLOH-em", ch: [6] },
    { en: "Excretion", pa: "ਮਲ ਤਿਆਗ", ph: "ek-SKREE-shun", ch: [6] },
    { en: "Nephron", pa: "ਨੈਫ਼ਰਾਨ", ph: "NEF-ron", ch: [6] },
    { en: "Dialysis", pa: "ਡਾਇਲਿਸਿਸ", ph: "die-AL-i-siss", ch: [6] },
    { en: "Peristalsis", pa: "ਕ੍ਰਮਾਕੁੰਚਨ", ph: "pe-ri-STAL-siss", ch: [6] },
    { en: "Double Circulation", pa: "ਦੂਹਰਾ ਸੰਚਾਰ", ph: "DUB-ul sir-kyoo-LAY-shun", ch: [6] },
    { en: "Haemoglobin", pa: "ਹੀਮੋਗਲੋਬਿਨ", ph: "HEE-muh-gloh-bin", ch: [6], alt: ["Hemoglobin"] },
    { en: "Lymph", pa: "ਲਸਿਕਾ", ph: "LIMF", ch: [6] },
    { en: "Enzyme", pa: "ਐਨਜ਼ਾਈਮ", ph: "EN-zime", ch: [6] },

    /* ---- Ch 7 · Control and Coordination ---- */
    { en: "Neuron", pa: "ਤੰਤੂ ਕੋਸ਼ਿਕਾ", ph: "NYOO-ron", ch: [7] },
    { en: "Synapse", pa: "ਸਿਨੈਪਸ", ph: "SIN-aps", ch: [7] },
    { en: "Reflex Action", pa: "ਪ੍ਰਤੀਵਰਤੀ ਕਿਰਿਆ", ph: "REE-fleks AK-shun", ch: [7] },
    { en: "Reflex Arc", pa: "ਪ੍ਰਤੀਵਰਤੀ ਚਾਪ", ph: "REE-fleks ARK", ch: [7] },
    { en: "Cerebrum", pa: "ਸੇਰੀਬ੍ਰਮ", ph: "suh-REE-brum", ch: [7] },
    { en: "Cerebellum", pa: "ਸੇਰੀਬੈਲਮ", ph: "se-ruh-BEL-um", ch: [7] },
    { en: "Medulla", pa: "ਮੈਡੂਲਾ", ph: "muh-DUL-uh", ch: [7] },
    { en: "Hormone", pa: "ਹਾਰਮੋਨ", ph: "HOR-mohn", ch: [7] },
    { en: "Endocrine Gland", pa: "ਅੰਤਹ-ਸਰਾਵੀ ਗ੍ਰੰਥੀ", ph: "EN-doh-krin GLAND", ch: [7] },
    { en: "Thyroxine", pa: "ਥਾਈਰਾਕਸਿਨ", ph: "thigh-ROK-seen", ch: [7] },
    { en: "Insulin", pa: "ਇਨਸੁਲਿਨ", ph: "IN-suh-lin", ch: [7] },
    { en: "Adrenaline", pa: "ਐਡਰੀਨਲਿਨ", ph: "uh-DREN-uh-lin", ch: [7] },
    { en: "Tropism", pa: "ਅਨੁਵਰਤਨ", ph: "TROH-pizm", ch: [7] },
    { en: "Phototropism", pa: "ਪ੍ਰਕਾਸ਼ ਅਨੁਵਰਤਨ", ph: "foh-TOT-ruh-pizm", ch: [7] },
    { en: "Geotropism", pa: "ਗੁਰੂਤਾ ਅਨੁਵਰਤਨ", ph: "jee-OT-ruh-pizm", ch: [7] },
    { en: "Auxin", pa: "ਆਕਸਿਨ", ph: "AWK-sin", ch: [7] },
    { en: "Gibberellin", pa: "ਜਿਬਰੈਲਿਨ", ph: "jib-uh-REL-in", ch: [7] },
    { en: "Cytokinin", pa: "ਸਾਈਟੋਕਾਈਨਿਨ", ph: "sigh-toh-KY-nin", ch: [7] },
    { en: "Abscisic Acid", pa: "ਐਬਸਿਸਿਕ ਤੇਜ਼ਾਬ", ph: "ab-SIS-ik AS-id", ch: [7] },

    /* ---- Ch 8 · How do Organisms Reproduce? ---- */
    { en: "Reproduction", pa: "ਪ੍ਰਜਨਨ", ph: "ree-pruh-DUK-shun", ch: [8] },
    { en: "Asexual Reproduction", pa: "ਅਲਿੰਗੀ ਪ੍ਰਜਨਨ", ph: "ay-SEK-shoo-ul ree-pruh-DUK-shun", ch: [8] },
    { en: "Sexual Reproduction", pa: "ਲਿੰਗੀ ਪ੍ਰਜਨਨ", ph: "SEK-shoo-ul ree-pruh-DUK-shun", ch: [8] },
    { en: "Binary Fission", pa: "ਦੋ-ਖੰਡੀ ਵਿਭਾਜਨ", ph: "BY-nuh-ree FISH-un", ch: [8] },
    { en: "Multiple Fission", pa: "ਬਹੁ-ਖੰਡੀ ਵਿਭਾਜਨ", ph: "MUL-ti-pul FISH-un", ch: [8] },
    { en: "Budding", pa: "ਕਲੀਕਰਨ", ph: "BUD-ing", ch: [8] },
    { en: "Fragmentation", pa: "ਖੰਡਨ", ph: "frag-men-TAY-shun", ch: [8] },
    { en: "Regeneration", pa: "ਪੁਨਰਜਨਨ", ph: "ri-jen-uh-RAY-shun", ch: [8] },
    { en: "Vegetative Propagation", pa: "ਕਾਇਕ ਪ੍ਰਜਨਨ", ph: "VEJ-uh-tay-tiv prop-uh-GAY-shun", ch: [8] },
    { en: "Pollination", pa: "ਪਰਾਗਣ", ph: "pol-i-NAY-shun", ch: [8] },
    { en: "Fertilisation", pa: "ਨਿਸ਼ੇਚਨ", ph: "fur-ti-lie-ZAY-shun", ch: [8], alt: ["Fertilization"] },
    { en: "Gamete", pa: "ਯੁਗਮਕ", ph: "GAM-eet", ch: [8, 9] },
    { en: "Zygote", pa: "ਯੁਗਮਨਜ", ph: "ZY-goht", ch: [8, 9] },
    { en: "Placenta", pa: "ਪਲੈਸੈਂਟਾ", ph: "pluh-SEN-tuh", ch: [8] },
    { en: "Puberty", pa: "ਜਵਾਨੀ", ph: "PYOO-ber-tee", ch: [8] },
    { en: "Contraception", pa: "ਗਰਭ ਨਿਰੋਧ", ph: "kon-truh-SEP-shun", ch: [8] },

    /* ---- Ch 9 · Heredity and Evolution ---- */
    { en: "Heredity", pa: "ਅਨੁਵੰਸ਼ਿਕਤਾ", ph: "huh-RED-i-tee", ch: [9] },
    { en: "Evolution", pa: "ਵਿਕਾਸ", ph: "ev-uh-LOO-shun", ch: [9] },
    { en: "Gene", pa: "ਜੀਨ", ph: "JEEN", ch: [9] },
    { en: "Allele", pa: "ਐਲੀਲ", ph: "uh-LEEL", ch: [9] },
    { en: "Dominant Trait", pa: "ਪ੍ਰਭਾਵੀ ਲੱਛਣ", ph: "DOM-i-nunt TRAYT", ch: [9], alt: ["Dominant"] },
    { en: "Recessive Trait", pa: "ਅਪ੍ਰਭਾਵੀ ਲੱਛਣ", ph: "ri-SESS-iv TRAYT", ch: [9], alt: ["Recessive"] },
    { en: "Genotype", pa: "ਜੀਨ ਪ੍ਰਰੂਪ", ph: "JEE-nuh-type", ch: [9] },
    { en: "Phenotype", pa: "ਦਿੱਖ ਪ੍ਰਰੂਪ", ph: "FEE-nuh-type", ch: [9] },
    { en: "Monohybrid Cross", pa: "ਇੱਕ-ਸੰਕਰ ਕਰਾਸ", ph: "mon-oh-HY-brid KROSS", ch: [9] },
    { en: "Dihybrid Cross", pa: "ਦੋ-ਸੰਕਰ ਕਰਾਸ", ph: "die-HY-brid KROSS", ch: [9] },
    { en: "Chromosome", pa: "ਗੁਣ ਸੂਤਰ", ph: "KROH-muh-sohm", ch: [9] },
    { en: "Speciation", pa: "ਜਾਤੀ ਉਦਭਵ", ph: "spee-shee-AY-shun", ch: [9] },
    { en: "Natural Selection", pa: "ਕੁਦਰਤੀ ਚੋਣ", ph: "NATCH-uh-rul si-LEK-shun", ch: [9] },
    { en: "Genetic Drift", pa: "ਜੈਨੇਟਿਕ ਵਹਾਅ", ph: "juh-NET-ik DRIFT", ch: [9] },
    { en: "Homologous Organs", pa: "ਸਮਜਾਤ ਅੰਗ", ph: "huh-MOL-uh-gus OR-gunz", ch: [9] },
    { en: "Analogous Organs", pa: "ਸਮਰੂਪ ਅੰਗ", ph: "uh-NAL-uh-gus OR-gunz", ch: [9] },
    { en: "Fossil", pa: "ਪਥਰਾਟ", ph: "FOSS-ul", ch: [9] },

    /* ---- Ch 10 · Light: Reflection and Refraction ---- */
    { en: "Reflection", pa: "ਪਰਾਵਰਤਨ", ph: "ri-FLEK-shun", ch: [10] },
    { en: "Refraction", pa: "ਅਪਵਰਤਨ", ph: "ri-FRAK-shun", ch: [10, 11] },
    { en: "Concave Mirror", pa: "ਅਵਤਲ ਦਰਪਣ", ph: "kon-KAYV MIR-or", ch: [10], alt: ["Concave"] },
    { en: "Convex Mirror", pa: "ਉੱਤਲ ਦਰਪਣ", ph: "KON-veks MIR-or", ch: [10], alt: ["Convex"] },
    { en: "Focal Length", pa: "ਫੋਕਸ ਦੂਰੀ", ph: "FOH-kul LENGTH", ch: [10] },
    { en: "Principal Axis", pa: "ਮੁੱਖ ਧੁਰਾ", ph: "PRIN-si-pul AK-siss", ch: [10] },
    { en: "Centre of Curvature", pa: "ਵਕਰਤਾ ਕੇਂਦਰ", ph: "SEN-ter uv KUR-vuh-cher", ch: [10] },
    { en: "Real Image", pa: "ਵਾਸਤਵਿਕ ਪ੍ਰਤਿਬਿੰਬ", ph: "REEL IM-ij", ch: [10] },
    { en: "Virtual Image", pa: "ਆਭਾਸੀ ਪ੍ਰਤਿਬਿੰਬ", ph: "VUR-choo-ul IM-ij", ch: [10] },
    { en: "Magnification", pa: "ਵੱਡਦਰਸ਼ਨ", ph: "mag-ni-fi-KAY-shun", ch: [10] },
    { en: "Refractive Index", pa: "ਅਪਵਰਤਨ ਅੰਕ", ph: "ri-FRAK-tiv IN-deks", ch: [10] },
    { en: "Lens", pa: "ਲੈਂਜ਼", ph: "LENZ", ch: [10, 11] },
    { en: "Power of a Lens", pa: "ਲੈਂਜ਼ ਦੀ ਸਮਰੱਥਾ", ph: "POW-er uv uh LENZ", ch: [10] },
    { en: "Dioptre", pa: "ਡਾਇਆਪਟਰ", ph: "die-OP-ter", ch: [10], alt: ["Diopter"] },

    /* ---- Ch 11 · The Human Eye and the Colourful World ---- */
    { en: "Accommodation", pa: "ਸਮਾਯੋਜਨ ਸਮਰੱਥਾ", ph: "uh-kom-uh-DAY-shun", ch: [11] },
    { en: "Myopia", pa: "ਨਿਕਟ ਦ੍ਰਿਸ਼ਟੀ", ph: "my-OH-pee-uh", ch: [11] },
    { en: "Hypermetropia", pa: "ਦੂਰ ਦ੍ਰਿਸ਼ਟੀ", ph: "hie-per-muh-TROH-pee-uh", ch: [11] },
    { en: "Presbyopia", pa: "ਜਰਾ ਦ੍ਰਿਸ਼ਟੀ", ph: "prez-bee-OH-pee-uh", ch: [11] },
    { en: "Cataract", pa: "ਮੋਤੀਆਬਿੰਦ", ph: "KAT-uh-rakt", ch: [11] },
    { en: "Retina", pa: "ਰੈਟੀਨਾ", ph: "RET-i-nuh", ch: [11] },
    { en: "Cornea", pa: "ਕਾਰਨੀਆ", ph: "KOR-nee-uh", ch: [11] },
    { en: "Iris", pa: "ਆਇਰਿਸ", ph: "EYE-riss", ch: [11] },
    { en: "Dispersion", pa: "ਵਿਖੇਪਣ", ph: "dis-PUR-zhun", ch: [11] },
    { en: "Spectrum", pa: "ਵਰਣ ਪੱਟੀ", ph: "SPEK-trum", ch: [11] },
    { en: "Scattering of Light", pa: "ਪ੍ਰਕਾਸ਼ ਦਾ ਖਿੰਡਾਅ", ph: "SKAT-er-ing uv LITE", ch: [11], alt: ["Scattering"] },
    { en: "Tyndall Effect", pa: "ਟਿੰਡਲ ਪ੍ਰਭਾਵ", ph: "TIN-dul i-FEKT", ch: [11] },
    { en: "Atmospheric Refraction", pa: "ਵਾਯੂਮੰਡਲੀ ਅਪਵਰਤਨ", ph: "at-mos-FEER-ik ri-FRAK-shun", ch: [11] },

    /* ---- Ch 12 · Electricity ---- */
    { en: "Electric Current", pa: "ਬਿਜਲਈ ਧਾਰਾ", ph: "i-LEK-trik KUR-unt", ch: [12] },
    { en: "Potential Difference", pa: "ਬਿਜਲਈ ਵਿਭਵ ਅੰਤਰ", ph: "puh-TEN-shul DIF-runss", ch: [12] },
    { en: "Resistance", pa: "ਪ੍ਰਤੀਰੋਧ", ph: "ri-ZIS-tunss", ch: [12] },
    { en: "Resistivity", pa: "ਪ੍ਰਤੀਰੋਧਕਤਾ", ph: "ree-zis-TIV-i-tee", ch: [12] },
    { en: "Ohm's Law", pa: "ਓਹਮ ਦਾ ਨਿਯਮ", ph: "OHMZ LAW", ch: [12] },
    { en: "Series Combination", pa: "ਲੜੀਵਾਰ ਸੰਯੋਜਨ", ph: "SEER-eez kom-bi-NAY-shun", ch: [12] },
    { en: "Parallel Combination", pa: "ਸਮਾਨਾਂਤਰ ਸੰਯੋਜਨ", ph: "PA-ruh-lel kom-bi-NAY-shun", ch: [12] },
    { en: "Heating Effect", pa: "ਤਾਪਨ ਪ੍ਰਭਾਵ", ph: "HEE-ting i-FEKT", ch: [12] },
    { en: "Joule's Law", pa: "ਜੂਲ ਦਾ ਨਿਯਮ", ph: "JOOLZ LAW", ch: [12] },
    { en: "Electric Power", pa: "ਬਿਜਲਈ ਸ਼ਕਤੀ", ph: "i-LEK-trik POW-er", ch: [12] },
    { en: "Rheostat", pa: "ਰੀਓਸਟੈਟ", ph: "REE-uh-stat", ch: [12] },
    { en: "Voltmeter", pa: "ਵੋਲਟਮੀਟਰ", ph: "VOHLT-mee-ter", ch: [12] },
    { en: "Ammeter", pa: "ਐਮੀਟਰ", ph: "AM-ee-ter", ch: [12] },

    /* ---- Ch 13 · Magnetic Effects of Electric Current ---- */
    { en: "Magnetic Field", pa: "ਚੁੰਬਕੀ ਖੇਤਰ", ph: "mag-NET-ik FEELD", ch: [13] },
    { en: "Magnetic Field Lines", pa: "ਚੁੰਬਕੀ ਬਲ ਰੇਖਾਵਾਂ", ph: "mag-NET-ik FEELD LINEZ", ch: [13] },
    { en: "Solenoid", pa: "ਸੋਲੇਨਾਇਡ", ph: "SOH-luh-noyd", ch: [13] },
    { en: "Electromagnet", pa: "ਬਿਜਲਈ ਚੁੰਬਕ", ph: "i-LEK-troh-mag-net", ch: [13] },
    { en: "Right Hand Thumb Rule", pa: "ਸੱਜੇ ਹੱਥ ਅੰਗੂਠਾ ਨਿਯਮ", ph: "RITE hand THUM ROOL", ch: [13] },
    { en: "Fleming's Left Hand Rule", pa: "ਫਲੈਮਿੰਗ ਦਾ ਖੱਬੇ ਹੱਥ ਨਿਯਮ", ph: "FLEM-ingz LEFT hand ROOL", ch: [13] },
    { en: "Fleming's Right Hand Rule", pa: "ਫਲੈਮਿੰਗ ਦਾ ਸੱਜੇ ਹੱਥ ਨਿਯਮ", ph: "FLEM-ingz RITE hand ROOL", ch: [13] },
    { en: "Electromagnetic Induction", pa: "ਬਿਜਲਈ ਚੁੰਬਕੀ ਪ੍ਰੇਰਣ", ph: "i-lek-troh-mag-NET-ik in-DUK-shun", ch: [13] },
    { en: "Electric Motor", pa: "ਬਿਜਲਈ ਮੋਟਰ", ph: "i-LEK-trik MOH-ter", ch: [13] },
    { en: "Generator", pa: "ਜਨਰੇਟਰ", ph: "JEN-uh-ray-ter", ch: [13] },
    { en: "Alternating Current", pa: "ਪਰਿਵਰਤੀ ਧਾਰਾ", ph: "AWL-ter-nay-ting KUR-unt", ch: [13] },
    { en: "Direct Current", pa: "ਦਿਸ਼ਟ ਧਾਰਾ", ph: "di-REKT KUR-unt", ch: [13] },
    { en: "Short Circuit", pa: "ਸ਼ਾਰਟ ਸਰਕਟ", ph: "SHORT SUR-kit", ch: [13] },
    { en: "Earthing", pa: "ਭੂ-ਸੰਪਰਕਣ", ph: "URTH-ing", ch: [13] },

    /* ---- Ch 14 · Sources of Energy ---- */
    { en: "Renewable Energy", pa: "ਨਵਿਆਉਣਯੋਗ ਊਰਜਾ", ph: "ri-NYOO-uh-bul EN-er-jee", ch: [14] },
    { en: "Non-renewable Energy", pa: "ਨਾ-ਨਵਿਆਉਣਯੋਗ ਊਰਜਾ", ph: "non-ri-NYOO-uh-bul EN-er-jee", ch: [14] },
    { en: "Fossil Fuel", pa: "ਪਥਰਾਟ ਬਾਲਣ", ph: "FOSS-ul FYOO-ul", ch: [14] },
    { en: "Biomass", pa: "ਜੈਵ ਪੁੰਜ", ph: "BY-oh-mass", ch: [14] },
    { en: "Biogas", pa: "ਬਾਇਓਗੈਸ", ph: "BY-oh-gass", ch: [14] },
    { en: "Solar Cooker", pa: "ਸੌਰ ਕੁੱਕਰ", ph: "SOH-ler KOOK-er", ch: [14] },
    { en: "Solar Cell", pa: "ਸੌਰ ਸੈੱਲ", ph: "SOH-ler SELL", ch: [14] },
    { en: "Hydro Power", pa: "ਪਣ ਬਿਜਲੀ", ph: "HIE-droh POW-er", ch: [14] },
    { en: "Geothermal Energy", pa: "ਭੂ-ਤਾਪੀ ਊਰਜਾ", ph: "jee-oh-THUR-mul EN-er-jee", ch: [14] },
    { en: "Nuclear Fission", pa: "ਨਿਊਕਲੀ ਵਿਖੰਡਨ", ph: "NOO-klee-er FISH-un", ch: [14] },
    { en: "Nuclear Fusion", pa: "ਨਿਊਕਲੀ ਸੰਯੋਜਨ", ph: "NOO-klee-er FYOO-zhun", ch: [14] },

    /* ---- Ch 15 · Our Environment ---- */
    { en: "Ecosystem", pa: "ਪਰਿਸਥਿਤਕ ਪ੍ਰਣਾਲੀ", ph: "EE-koh-sis-tum", ch: [15] },
    { en: "Food Chain", pa: "ਭੋਜਨ ਲੜੀ", ph: "FOOD CHAYN", ch: [15] },
    { en: "Food Web", pa: "ਭੋਜਨ ਜਾਲ", ph: "FOOD WEB", ch: [15] },
    { en: "Trophic Level", pa: "ਪੋਸ਼ੀ ਪੱਧਰ", ph: "TROH-fik LEV-ul", ch: [15] },
    { en: "Producer", pa: "ਉਤਪਾਦਕ", ph: "pruh-DYOO-ser", ch: [15] },
    { en: "Consumer", pa: "ਖਪਤਕਾਰ", ph: "kun-SYOO-mer", ch: [15] },
    { en: "Decomposer", pa: "ਅਪਘਟਕ", ph: "dee-kum-POH-zer", ch: [15] },
    { en: "Biodegradable", pa: "ਜੈਵ ਵਿਘਟਨਸ਼ੀਲ", ph: "by-oh-di-GRAY-duh-bul", ch: [15, 16] },
    { en: "Non-biodegradable", pa: "ਅਜੈਵ ਵਿਘਟਨਸ਼ੀਲ", ph: "non-by-oh-di-GRAY-duh-bul", ch: [15, 16] },
    { en: "Biomagnification", pa: "ਜੈਵ ਵੱਡਦਰਸ਼ਨ", ph: "by-oh-mag-ni-fi-KAY-shun", ch: [15] },
    { en: "Ozone Layer", pa: "ਓਜ਼ੋਨ ਪਰਤ", ph: "OH-zohn LAY-er", ch: [15] },
    { en: "Chlorofluorocarbon", pa: "ਕਲੋਰੋਫਲੋਰੋਕਾਰਬਨ", ph: "klor-oh-FLOR-oh-kar-bun", ch: [15], alt: ["CFC"] },

    /* ---- Ch 16 · Sustainable Management of Natural Resources ---- */
    { en: "Sustainable Development", pa: "ਟਿਕਾਊ ਵਿਕਾਸ", ph: "suh-STAYN-uh-bul di-VEL-up-munt", ch: [16] },
    { en: "Conservation", pa: "ਸੰਭਾਲ", ph: "kon-ser-VAY-shun", ch: [16] },
    { en: "Watershed Management", pa: "ਜਲ-ਗ੍ਰਹਿਣ ਪ੍ਰਬੰਧਨ", ph: "WAW-ter-shed MAN-ij-munt", ch: [16] },
    { en: "Rainwater Harvesting", pa: "ਵਰਖਾ ਜਲ ਸੰਭਾਲ", ph: "RAYN-waw-ter HAR-vist-ing", ch: [16] },
    { en: "Coliform Bacteria", pa: "ਕੋਲੀਫਾਰਮ ਬੈਕਟੀਰੀਆ", ph: "KOH-li-form bak-TEER-ee-uh", ch: [16] },
    { en: "Chipko Movement", pa: "ਚਿਪਕੋ ਅੰਦੋਲਨ", ph: "CHIP-koh MOOV-munt", ch: [16] },
    { en: "Stakeholder", pa: "ਹਿੱਤਧਾਰਕ", ph: "STAYK-hohl-der", ch: [16] },
    { en: "Ganga Action Plan", pa: "ਗੰਗਾ ਕਾਰਜ ਯੋਜਨਾ", ph: "GUN-guh AK-shun PLAN", ch: [16] }
  ];

  /* Lookup map: every English spelling (canonical + alt) -> entry. */
  var byEn = Object.create(null);
  for (var i = 0; i < TERMS.length; i++) {
    var t = TERMS[i];
    byEn[t.en.toLowerCase()] = t;
    if (t.alt) {
      for (var j = 0; j < t.alt.length; j++) byEn[t.alt[j].toLowerCase()] = t;
    }
  }

  function lookup(term) {
    if (!term) return null;
    return byEn[String(term).toLowerCase().replace(/\s+/g, " ").trim()] || null;
  }

  window.PSEB_GLOSSARY = {
    terms: TERMS,
    lookup: lookup,
    /* All matchable English spellings, longest first so "Displacement Reaction"
       wins over "Displacement" when auto-tagging slide text. */
    spellings: Object.keys(byEn).sort(function (a, b) { return b.length - a.length; })
  };
}());
