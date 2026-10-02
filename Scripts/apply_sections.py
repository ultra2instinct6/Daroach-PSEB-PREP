#!/usr/bin/env python3
"""Apply intra-lecture section structure to the chapter decks.

Each deck is a flat run of ~32 ``<div class="slide">`` siblings. Flat is fine
for authoring but it gives the student no sense of where they are inside a
45-minute lecture, so this script stamps the first slide of every sub-topic
with the attributes assets/deck-enhance.js reads:

    data-section-id          stable slug, used for deep links
    data-section-en          English sub-topic title (breadcrumb + outline)
    data-section-pa          Gurmukhi sub-topic title
    data-section-mins        estimated minutes, shown in the outline
    data-section-unnumbered  front matter: part of the lecture, not "1."

Slides that carry no attributes inherit the previous section, so a section can
never have a hole in the middle.

Chapter 1 additionally gets its slides reordered (ORDER below) so each
formative drill sits immediately after the sub-topic it tests instead of being
clustered at the end of the deck.

Run from the repository root; it is idempotent:

    python3 "Scripts/apply_sections.py"

Afterwards rebuild the slide search index, whose slide numbers shift with the
Chapter 1 reorder:

    python3 "Scripts/build_search_index.py"
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SLIDE_OPEN = re.compile(r'<div class="slide"[^>]*>')

# (slug, English, Gurmukhi, start index 0-based). The first entry of every
# chapter is the unnumbered front matter.
SECTIONS: dict[str, list[tuple[str, str, str, int]]] = {
    "Chapter 01 - Chemical Reactions": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("reactions", "Chemical Reactions & Equations", "ਰਸਾਇਣਕ ਕਿਰਿਆਵਾਂ ਅਤੇ ਸਮੀਕਰਣ", 6),
        ("balancing", "Balancing Equations", "ਸਮੀਕਰਣ ਸੰਤੁਲਿਤ ਕਰਨਾ", 9),
        ("types", "Types of Reactions", "ਕਿਰਿਆਵਾਂ ਦੀਆਂ ਕਿਸਮਾਂ", 12),
        ("redox", "Oxidation & Reduction", "ਆਕਸੀਕਰਨ ਅਤੇ ਲਘੂਕਰਨ", 18),
        ("energy", "Energy Changes", "ਊਰਜਾ ਪਰਿਵਰਤਨ", 23),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 27),
    ],
    "Chapter 02 - Acids, Bases and Salts": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("acids-bases", "Acids & Bases", "ਤੇਜ਼ਾਬ ਅਤੇ ਖਾਰ", 6),
        ("ph", "Indicators & the pH Scale", "ਸੂਚਕ ਅਤੇ pH ਸਕੇਲ", 8),
        ("reactions", "Reactions of Acids & Bases", "ਤੇਜ਼ਾਬ ਅਤੇ ਖਾਰ ਦੀਆਂ ਕਿਰਿਆਵਾਂ", 12),
        ("manufacture", "Chlor-Alkali & Salt Manufacture", "ਕਲੋਰ-ਐਲਕਲੀ ਅਤੇ ਲੂਣ ਬਣਾਉਣਾ", 19),
        ("daily-life", "Salts in Daily Life", "ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਵਿੱਚ ਲੂਣ", 24),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 30),
    ],
    "Chapter 03 - Metals and Non-metals": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("properties", "Properties of Metals & Non-metals", "ਧਾਤਾਂ ਅਤੇ ਅਧਾਤਾਂ ਦੇ ਗੁਣ", 6),
        ("bonding", "Ionic Bonding", "ਆਇਓਨਿਕ ਬੰਧਨ", 9),
        ("reactivity", "The Reactivity Series", "ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ", 11),
        ("metallurgy", "Metallurgy & Extraction", "ਧਾਤੂ ਨਿਸ਼ਕਰਸ਼ਣ", 16),
        ("corrosion", "Corrosion, Alloys & Refining", "ਖੋਰ, ਮਿਸ਼ਰਤ ਧਾਤਾਂ ਅਤੇ ਸ਼ੁੱਧੀਕਰਨ", 20),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 28),
    ],
    "Chapter 04 - Carbon Compounds": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("bonding", "Bonding in Carbon", "ਕਾਰਬਨ ਵਿੱਚ ਬੰਧਨ", 6),
        ("hydrocarbons", "Hydrocarbons & Homologous Series", "ਹਾਈਡਰੋਕਾਰਬਨ ਅਤੇ ਸਮਜਾਤੀ ਲੜੀ", 10),
        ("naming", "Naming & Functional Groups", "ਨਾਮਕਰਨ ਅਤੇ ਕਿਰਿਆਸ਼ੀਲ ਸਮੂਹ", 13),
        ("properties", "Chemical Properties of Carbon", "ਕਾਰਬਨ ਦੇ ਰਸਾਇਣਕ ਗੁਣ", 18),
        ("soaps", "Soaps & Detergents", "ਸਾਬਣ ਅਤੇ ਡਿਟਰਜੈਂਟ", 20),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 27),
    ],
    "Chapter 05 - Periodic Table": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("early", "Early Classification", "ਮੁੱਢਲਾ ਵਰਗੀਕਰਨ", 6),
        ("mendeleev", "Mendeleev's Periodic Table", "ਮੈਂਡਲੀਵ ਦੀ ਆਵਰਤੀ ਸਾਰਣੀ", 8),
        ("modern", "The Modern Periodic Table", "ਆਧੁਨਿਕ ਆਵਰਤੀ ਸਾਰਣੀ", 12),
        ("trends", "Periodic Trends", "ਆਵਰਤੀ ਰੁਝਾਨ", 15),
        ("compare", "Comparisons & Case Study", "ਤੁਲਨਾ ਅਤੇ ਕੇਸ ਸਟੱਡੀ", 18),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 25),
    ],
    "Chapter 06 - Control and Coordination": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("neurons", "Neurons & the Nerve Impulse", "ਨਿਊਰਾਨ ਅਤੇ ਨਸ ਆਵੇਗ", 6),
        ("reflex-brain", "Reflex Action & the Brain", "ਪ੍ਰਤੀਵਰਤੀ ਕਿਰਿਆ ਅਤੇ ਦਿਮਾਗ਼", 11),
        ("endocrine", "The Endocrine System", "ਅੰਤਹ-ਸ੍ਰਾਵੀ ਪ੍ਰਣਾਲੀ", 16),
        ("plants", "Coordination in Plants", "ਪੌਦਿਆਂ ਵਿੱਚ ਤਾਲਮੇਲ", 20),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 23),
    ],
    "Chapter 06 - Life Processes": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("nutrition", "Nutrition", "ਪੋਸ਼ਣ", 7),
        ("respiration", "Respiration", "ਸਾਹ ਕਿਰਿਆ", 15),
        ("transport", "Transportation", "ਪਰਿਵਹਨ", 19),
        ("excretion", "Excretion", "ਨਿਕਾਸ", 27),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 31),
    ],
    "Chapter 07 - How do Organisms Reproduce": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("pollination", "Pollination & Fertilisation", "ਪਰਾਗਣ ਅਤੇ ਨਿਸ਼ੇਚਨ", 5),
        ("asexual", "Asexual Reproduction", "ਅਲਿੰਗੀ ਪ੍ਰਜਨਨ", 9),
        ("plants", "Sexual Reproduction in Plants", "ਪੌਦਿਆਂ ਵਿੱਚ ਲਿੰਗੀ ਪ੍ਰਜਨਨ", 18),
        ("human", "Human Reproduction", "ਮਨੁੱਖੀ ਪ੍ਰਜਨਨ", 20),
        ("health", "Reproductive Health", "ਪ੍ਰਜਨਨ ਸਿਹਤ", 25),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 27),
    ],
    "Chapter 08 - Heredity": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("variation", "Heredity & Variation", "ਅਨੁਵੰਸ਼ਿਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ", 7),
        ("mendel", "Mendel's Experiments", "ਮੈਂਡਲ ਦੇ ਪ੍ਰਯੋਗ", 10),
        ("crosses", "Monohybrid & Dihybrid Crosses", "ਇਕ-ਸੰਕਰ ਅਤੇ ਦੋ-ਸੰਕਰ ਕਰਾਸ", 13),
        ("sex-traits", "Sex Determination & Traits", "ਲਿੰਗ ਨਿਰਧਾਰਨ ਅਤੇ ਲੱਛਣ", 18),
        ("practice", "Practice & Derivations", "ਅਭਿਆਸ ਅਤੇ ਵਿਉਤਪਤੀ", 22),
        ("evolution", "Evolution", "ਜੈਵ ਵਿਕਾਸ", 26),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 30),
    ],
    "Chapter 09 - Light Reflection and Refraction": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("reflection", "Reflection of Light", "ਪ੍ਰਕਾਸ਼ ਦਾ ਪਰਾਵਰਤਨ", 6),
        ("mirrors", "Spherical Mirrors", "ਗੋਲਾਕਾਰ ਦਰਪਣ", 9),
        ("mirror-formula", "Mirror Formula & Numericals", "ਦਰਪਣ ਸੂਤਰ ਅਤੇ ਸੰਖਿਆਤਮਕ", 15),
        ("lenses", "Lenses & Image Formation", "ਲੈਂਜ਼ ਅਤੇ ਪ੍ਰਤੀਬਿੰਬ ਬਣਨਾ", 21),
        ("refraction", "Refraction & Refractive Index", "ਅਪਵਰਤਨ ਅਤੇ ਅਪਵਰਤਨ ਅੰਕ", 25),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 29),
    ],
    "Chapter 10 - The Human Eye and Colourful World": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("eye", "Structure of the Human Eye", "ਮਨੁੱਖੀ ਅੱਖ ਦੀ ਬਣਤਰ", 6),
        ("defects", "Defects of Vision", "ਦ੍ਰਿਸ਼ਟੀ ਦੋਸ਼", 12),
        ("dispersion", "Dispersion & the Rainbow", "ਪ੍ਰਕਾਸ਼ ਵਿਖੇਪਣ ਅਤੇ ਸਤਰੰਗੀ ਪੀਂਘ", 17),
        ("atmospheric", "Atmospheric Refraction", "ਵਾਯੂਮੰਡਲੀ ਅਪਵਰਤਨ", 20),
        ("scattering", "Scattering of Light", "ਪ੍ਰਕਾਸ਼ ਦਾ ਖਿੰਡਾਅ", 22),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 25),
    ],
    "Chapter 11 - Electricity": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("current", "Current, Charge & Potential Difference", "ਕਰੰਟ, ਚਾਰਜ ਅਤੇ ਪੁਟੈਂਸ਼ਲ ਅੰਤਰ", 6),
        ("ohm", "Ohm's Law", "ਓਹਮ ਦਾ ਨਿਯਮ", 9),
        ("resistance", "Resistance & Resistivity", "ਪ੍ਰਤੀਰੋਧ ਅਤੇ ਪ੍ਰਤੀਰੋਧਕਤਾ", 13),
        ("circuits", "Series & Parallel Circuits", "ਲੜੀਵਾਰ ਅਤੇ ਸਮਾਂਤਰ ਪਰਿਪਥ", 15),
        ("heating", "Heating Effect & Electric Power", "ਤਾਪਨ ਪ੍ਰਭਾਵ ਅਤੇ ਬਿਜਲਈ ਸ਼ਕਤੀ", 19),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 26),
    ],
    "Chapter 12 - Magnetic Effects of Electric Current": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("field", "Magnetic Field & Field Lines", "ਚੁੰਬਕੀ ਖੇਤਰ ਅਤੇ ਖੇਤਰ ਰੇਖਾਵਾਂ", 6),
        ("current-field", "Field due to a Current", "ਕਰੰਟ ਕਾਰਨ ਚੁੰਬਕੀ ਖੇਤਰ", 10),
        ("motor", "Force on a Conductor & the Motor", "ਚਾਲਕ ਉੱਤੇ ਬਲ ਅਤੇ ਬਿਜਲਈ ਮੋਟਰ", 14),
        ("induction", "Induction & the Generator", "ਚੁੰਬਕੀ ਪ੍ਰੇਰਣ ਅਤੇ ਜਨਰੇਟਰ", 18),
        ("domestic", "Domestic Circuits & Safety", "ਘਰੇਲੂ ਪਰਿਪਥ ਅਤੇ ਸੁਰੱਖਿਆ", 23),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 26),
    ],
    "Chapter 13 - Our Environment": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("ecosystem", "Ecosystem & Its Components", "ਪਰਿਸਥਿਤਕ ਤੰਤਰ ਅਤੇ ਇਸਦੇ ਅੰਗ", 6),
        ("food-chain", "Food Chains & Food Webs", "ਆਹਾਰ ਲੜੀ ਅਤੇ ਆਹਾਰ ਜਾਲ", 8),
        ("energy-flow", "Energy Flow & Biomagnification", "ਊਰਜਾ ਪ੍ਰਵਾਹ ਅਤੇ ਜੈਵ ਵਿਸ਼ਾਲੀਕਰਨ", 12),
        ("ozone-waste", "Ozone & Waste Management", "ਓਜ਼ੋਨ ਅਤੇ ਕੂੜਾ ਪ੍ਰਬੰਧਨ", 14),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 20),
    ],
    "Chapter 14 - Sources of Energy": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("good-source", "What Makes a Good Energy Source", "ਚੰਗੇ ਊਰਜਾ ਸਰੋਤ ਦੇ ਗੁਣ", 5),
        ("fossil", "Fossil Fuels & Thermal Power", "ਪਥਰਾਟ ਬਾਲਣ ਅਤੇ ਤਾਪ ਬਿਜਲੀ ਘਰ", 7),
        ("renewables", "Hydro, Biomass & Wind", "ਪਣ-ਬਿਜਲੀ, ਬਾਇਓਮਾਸ ਅਤੇ ਪੌਣ ਊਰਜਾ", 11),
        ("solar", "Solar Energy", "ਸੂਰਜੀ ਊਰਜਾ", 17),
        ("alternative", "Sea, Geothermal & Nuclear", "ਸਮੁੰਦਰੀ, ਭੂ-ਤਾਪੀ ਅਤੇ ਨਾਭਿਕੀ ਊਰਜਾ", 20),
        ("choosing", "Choosing a Source", "ਸਹੀ ਸਰੋਤ ਦੀ ਚੋਣ", 24),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 29),
    ],
    "Chapter 16 - Sustainable Management of Natural Resources": [
        ("start", "Getting Started", "ਸ਼ੁਰੂਆਤ", 0),
        ("why", "Why Manage Natural Resources", "ਸਰੋਤ ਪ੍ਰਬੰਧਨ ਕਿਉਂ", 5),
        ("forests", "Forests & Wildlife", "ਜੰਗਲ ਅਤੇ ਜੰਗਲੀ ਜੀਵ", 9),
        ("water", "Water: Dams & Harvesting", "ਪਾਣੀ: ਡੈਮ ਅਤੇ ਜਲ ਸੰਭਾਲ", 13),
        ("fuels", "Coal & Petroleum", "ਕੋਲਾ ਅਤੇ ਪੈਟਰੋਲੀਅਮ", 19),
        ("biodiversity", "Biodiversity & Conservation", "ਜੈਵ ਵਿਭਿੰਨਤਾ ਅਤੇ ਸੰਭਾਲ", 23),
        ("recap", "Recap & Practice", "ਦੁਹਰਾਈ ਅਤੇ ਅਭਿਆਸ", 30),
    ],
}

# Chapter 1 only: the two formative drills and the summary tables were authored
# at the end of the deck, so a student met the reaction-type classifier eleven
# slides after the reaction types and the redox drill eight slides after redox.
# This is the original slide order rearranged so every drill lands immediately
# after the sub-topic it tests.
ORDER_VERSION = "sections-v1"

ORDER = {
    "Chapter 01 - Chemical Reactions": [
        0, 1, 2, 3, 4, 5,          # cover, readings, vocabulary
        6, 7, 25,                  # reactions & equations (+ signs of a reaction)
        8, 11, 9,                  # balancing (+ states) -> balancer drill
        10, 12, 13, 14, 15, 24,    # types -> classifier drill -> table
        16, 17, 18, 19, 27,        # redox -> redox drill
        26, 21, 22, 23,            # energy changes -> case study
        20, 28, 29, 30, 31,        # recap & practice
    ],
}


# Brief learning objectives shown on the milestone banner of a section's first
# slide. Pipe-separated; the Gurmukhi list is optional and falls back to English.
GOALS: dict[str, dict[str, tuple[str, str]]] = {
    "Chapter 01 - Chemical Reactions": {
        "reactions": (
            "Tell a physical change from a chemical one|Write a word equation and turn it into a skeletal equation|Name the five signs that a reaction has happened",
            "ਭੌਤਿਕ ਅਤੇ ਰਸਾਇਣਕ ਪਰਿਵਰਤਨ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਸ਼ਬਦ ਸਮੀਕਰਣ ਨੂੰ ਢਾਂਚਾ ਸਮੀਕਰਣ ਵਿੱਚ ਬਦਲੋ|ਰਸਾਇਣਕ ਕਿਰਿਆ ਦੇ ਪੰਜ ਸੰਕੇਤ ਪਛਾਣੋ",
        ),
        "balancing": (
            "Apply the law of conservation of mass|Balance an equation by the hit-and-trial method|Add the correct physical state symbols",
            "ਪੁੰਜ ਦੀ ਸੰਭਾਲ ਦਾ ਨਿਯਮ ਲਾਗੂ ਕਰੋ|ਸਮੀਕਰਣ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰੋ|ਸਹੀ ਭੌਤਿਕ ਅਵਸਥਾ ਚਿੰਨ੍ਹ ਲਿਖੋ",
        ),
        "types": (
            "Classify combination, decomposition, displacement and double displacement|Give a PSEB example of each type|State what you would actually observe",
            "ਸੰਜੋਜਨ, ਅਪਘਟਨ, ਵਿਸਥਾਪਨ ਅਤੇ ਦੋਹਰਾ ਵਿਸਥਾਪਨ ਪਛਾਣੋ|ਹਰ ਕਿਸਮ ਦੀ ਇੱਕ ਉਦਾਹਰਨ ਦਿਓ|ਪ੍ਰਯੋਗ ਵਿੱਚ ਕੀ ਦਿਸੇਗਾ, ਦੱਸੋ",
        ),
        "redox": (
            "Define oxidation and reduction by oxygen and hydrogen|Identify the oxidising and reducing agent|Explain corrosion and rancidity",
            "ਆਕਸੀਕਰਨ ਅਤੇ ਲਘੂਕਰਨ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਆਕਸੀਕਾਰਕ ਅਤੇ ਲਘੂਕਾਰਕ ਪਛਾਣੋ|ਖੋਰ ਅਤੇ ਖਰਾਪਣ ਸਮਝਾਓ",
        ),
        "energy": (
            "Separate exothermic from endothermic reactions|Read energy terms written into an equation|Link respiration and photosynthesis to energy flow",
            "ਤਾਪ-ਨਿਕਾਸੀ ਅਤੇ ਤਾਪ-ਸ਼ੋਸ਼ੀ ਕਿਰਿਆਵਾਂ ਵੱਖ ਕਰੋ|ਸਮੀਕਰਣ ਵਿੱਚ ਊਰਜਾ ਪਦ ਪੜ੍ਹੋ|ਸਾਹ ਕਿਰਿਆ ਅਤੇ ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਨਾਲ ਜੋੜੋ",
        ),
        "recap": (
            "Recall every definition without the slide|Attempt the PSEB-style practice questions|Spot the traps the board repeats",
            "ਸਲਾਈਡ ਤੋਂ ਬਿਨਾਂ ਪਰਿਭਾਸ਼ਾਵਾਂ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 02 - Acids, Bases and Salts": {
        "acids-bases": (
            "Define an acid and a base by the ions they release|List the physical and chemical properties of each|Explain what makes an acid or base strong or weak",
            "ਆਇਨਾਂ ਦੇ ਆਧਾਰ ਤੇ ਤੇਜ਼ਾਬ ਅਤੇ ਖਾਰ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਦੋਹਾਂ ਦੇ ਭੌਤਿਕ ਅਤੇ ਰਸਾਇਣਕ ਗੁਣ ਦੱਸੋ|ਪ੍ਰਬਲ ਅਤੇ ਦੁਰਬਲ ਦਾ ਅੰਤਰ ਸਮਝਾਓ",
        ),
        "ph": (
            "Read the pH scale from 0 to 14|Name the indicator colours for acids, bases and neutral|Apply pH to digestion, soil and tooth decay",
            "0 ਤੋਂ 14 ਤੱਕ pH ਸਕੇਲ ਪੜ੍ਹੋ|ਸੂਚਕਾਂ ਦੇ ਰੰਗ ਦੱਸੋ|ਪਾਚਨ, ਮਿੱਟੀ ਅਤੇ ਦੰਦਾਂ ਵਿੱਚ pH ਲਾਗੂ ਕਰੋ",
        ),
        "reactions": (
            "Write what an acid gives with a metal, a carbonate and a base|Perform the gas tests for hydrogen and carbon dioxide|State the safe way to dilute a concentrated acid",
            "ਧਾਤ, ਕਾਰਬੋਨੇਟ ਅਤੇ ਖਾਰ ਨਾਲ ਤੇਜ਼ਾਬ ਦੀਆਂ ਕਿਰਿਆਵਾਂ ਲਿਖੋ|ਹਾਈਡਰੋਜਨ ਅਤੇ CO₂ ਦੀ ਜਾਂਚ ਕਰੋ|ਤੇਜ਼ਾਬ ਪਤਲਾ ਕਰਨ ਦਾ ਸੁਰੱਖਿਅਤ ਢੰਗ ਦੱਸੋ",
        ),
        "manufacture": (
            "Describe the chlor-alkali process and name its three products|Give the formula and one use of each manufactured salt|Explain what happens on heating washing soda and gypsum",
            "ਕਲੋਰ-ਐਲਕਲੀ ਕਿਰਿਆ ਅਤੇ ਇਸਦੇ ਤਿੰਨ ਉਤਪਾਦ ਦੱਸੋ|ਹਰ ਲੂਣ ਦਾ ਸੂਤਰ ਅਤੇ ਵਰਤੋਂ ਦਿਓ|ਧੋਣ ਵਾਲੇ ਸੋਡੇ ਅਤੇ ਜਿਪਸਮ ਨੂੰ ਗਰਮ ਕਰਨ ਦਾ ਅਸਰ ਸਮਝਾਓ",
        ),
        "daily-life": (
            "Classify a salt as acidic, basic or neutral from its parents|Explain water of crystallisation with an example|Connect pH to antacids, soil treatment and bee stings",
            "ਲੂਣ ਨੂੰ ਤੇਜ਼ਾਬੀ, ਖਾਰੀ ਜਾਂ ਉਦਾਸੀਨ ਵਿੱਚ ਵੰਡੋ|ਕ੍ਰਿਸਟਲਨ ਜਲ ਉਦਾਹਰਨ ਸਹਿਤ ਸਮਝਾਓ|ਐਂਟਾਸਿਡ, ਮਿੱਟੀ ਅਤੇ ਮੱਖੀ ਦੇ ਡੰਗ ਨਾਲ pH ਜੋੜੋ",
        ),
        "recap": (
            "Recall every formula and definition unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਹਰ ਸੂਤਰ ਅਤੇ ਪਰਿਭਾਸ਼ਾ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 03 - Metals and Non-metals": {
        "properties": (
            "List the physical properties of metals and non-metals|Name the standard exceptions to each property|Explain why aluminium is anodised",
            "ਧਾਤਾਂ ਅਤੇ ਅਧਾਤਾਂ ਦੇ ਭੌਤਿਕ ਗੁਣ ਦੱਸੋ|ਹਰ ਗੁਣ ਦੇ ਅਪਵਾਦ ਦੱਸੋ|ਐਲੂਮੀਨੀਅਮ ਦਾ ਐਨੋਡੀਕਰਨ ਕਿਉਂ, ਸਮਝਾਓ",
        ),
        "bonding": (
            "Explain how an ionic bond forms by electron transfer|Draw electron dot structures for NaCl and MgCl₂|State the properties of ionic compounds",
            "ਇਲੈਕਟ੍ਰਾਨ ਤਬਾਦਲੇ ਨਾਲ ਆਇਓਨਿਕ ਬੰਧਨ ਸਮਝਾਓ|NaCl ਅਤੇ MgCl₂ ਦੇ ਇਲੈਕਟ੍ਰਾਨ ਬਿੰਦੂ ਚਿੱਤਰ ਬਣਾਓ|ਆਇਓਨਿਕ ਯੌਗਿਕਾਂ ਦੇ ਗੁਣ ਦੱਸੋ",
        ),
        "reactivity": (
            "Recite the reactivity series in order|Predict whether a displacement reaction will happen|Compare how metals react with water and with acids",
            "ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ ਕ੍ਰਮ ਵਿੱਚ ਦੱਸੋ|ਵਿਸਥਾਪਨ ਕਿਰਿਆ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ|ਪਾਣੀ ਅਤੇ ਤੇਜ਼ਾਬ ਨਾਲ ਕਿਰਿਆਵਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
        ),
        "metallurgy": (
            "Name the three stages of metallurgy|Match the extraction method to the metal's reactivity|Distinguish roasting from calcination",
            "ਧਾਤੁ ਕਰਮ ਦੇ ਤਿੰਨ ਪੜਾਅ ਦੱਸੋ|ਕਿਰਿਆਸ਼ੀਲਤਾ ਅਨੁਸਾਰ ਨਿਸ਼ਕਰਸ਼ਣ ਢੰਗ ਚੁਣੋ|ਭਰਜਨ ਅਤੇ ਨਿਖਾਰਨ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ",
        ),
        "corrosion": (
            "Explain rusting and the conditions it needs|Describe galvanisation, alloying and electroplating|Set up and label electrolytic refining",
            "ਜੰਗ ਲੱਗਣ ਦੀਆਂ ਸ਼ਰਤਾਂ ਸਮਝਾਓ|ਗੈਲਵਨੀਕਰਨ, ਮਿਸ਼ਰਤ ਧਾਤ ਅਤੇ ਬਿਜਲੀ ਲੇਪਨ ਦੱਸੋ|ਬਿਜਲਈ ਸ਼ੁੱਧੀਕਰਨ ਦਾ ਚਿੱਤਰ ਬਣਾਓ",
        ),
        "recap": (
            "Recall the reactivity series without looking|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ ਬਿਨਾਂ ਵੇਖੇ ਦੁਹਰਾਓ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 04 - Carbon Compounds": {
        "bonding": (
            "Explain covalent bonding and why carbon shares electrons|Draw electron dot structures for simple molecules|Define catenation and tetravalency",
            "ਸਹਿ-ਸੰਯੋਜਕ ਬੰਧਨ ਅਤੇ ਇਲੈਕਟ੍ਰਾਨ ਸਾਂਝ ਸਮਝਾਓ|ਸਰਲ ਅਣੂਆਂ ਦੇ ਇਲੈਕਟ੍ਰਾਨ ਬਿੰਦੂ ਚਿੱਤਰ ਬਣਾਓ|ਸ਼੍ਰਿੰਖਲਨ ਅਤੇ ਚਤੁਰ-ਸੰਯੋਜਕਤਾ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ",
        ),
        "hydrocarbons": (
            "Tell saturated from unsaturated hydrocarbons|Explain why one burns with a clean flame and the other sooty|List the traits of a homologous series",
            "ਸੰਤ੍ਰਿਪਤ ਅਤੇ ਅਸੰਤ੍ਰਿਪਤ ਹਾਈਡਰੋਕਾਰਬਨ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਸਾਫ਼ ਅਤੇ ਧੂੰਏਂ ਵਾਲੀ ਲਾਟ ਦਾ ਕਾਰਨ ਦੱਸੋ|ਸਮਜਾਤੀ ਲੜੀ ਦੇ ਲੱਛਣ ਦੱਸੋ",
        ),
        "naming": (
            "Apply the IUPAC rules to name a carbon compound|Recognise each functional group and its suffix|Draw the structural isomers of butane and pentane",
            "IUPAC ਨਿਯਮਾਂ ਨਾਲ ਨਾਮ ਲਿਖੋ|ਕਿਰਿਆਸ਼ੀਲ ਸਮੂਹ ਅਤੇ ਉਹਨਾਂ ਦੇ ਪਿਛੇਤਰ ਪਛਾਣੋ|ਬਿਊਟੇਨ ਅਤੇ ਪੈਂਟੇਨ ਦੇ ਸਮਾਂਗ ਬਣਾਓ",
        ),
        "properties": (
            "Describe combustion, oxidation, addition and substitution|Compare ethanol and ethanoic acid|Explain hydrogenation and the role of a catalyst",
            "ਜਲਣ, ਆਕਸੀਕਰਨ, ਜੋੜ ਅਤੇ ਪ੍ਰਤਿਸਥਾਪਨ ਕਿਰਿਆਵਾਂ ਦੱਸੋ|ਐਥੇਨਾਲ ਅਤੇ ਐਥੇਨਾਇਕ ਐਸਿਡ ਦੀ ਤੁਲਨਾ ਕਰੋ|ਹਾਈਡਰੋਜਨੀਕਰਨ ਅਤੇ ਉਤਪ੍ਰੇਰਕ ਸਮਝਾਓ",
        ),
        "soaps": (
            "Explain the cleansing action of soap with a micelle diagram|Say why soap fails in hard water but detergent does not|Describe saponification",
            "ਮਿਸੈਲ ਚਿੱਤਰ ਨਾਲ ਸਾਬਣ ਦੀ ਸਫ਼ਾਈ ਕਿਰਿਆ ਸਮਝਾਓ|ਕਠੋਰ ਪਾਣੀ ਵਿੱਚ ਸਾਬਣ ਕਿਉਂ ਨਹੀਂ ਚੱਲਦਾ, ਦੱਸੋ|ਸਾਬਣੀਕਰਨ ਬਿਆਨ ਕਰੋ",
        ),
        "recap": (
            "Recall every functional group and suffix|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਹਰ ਕਿਰਿਆਸ਼ੀਲ ਸਮੂਹ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 05 - Periodic Table": {
        "early": (
            "State Dobereiner's law of triads with an example|State Newlands' law of octaves and its limits|Say why both early attempts failed",
            "ਡੋਬਰਾਈਨਰ ਦਾ ਤ੍ਰਿਕ ਨਿਯਮ ਉਦਾਹਰਨ ਸਹਿਤ ਦੱਸੋ|ਨਿਊਲੈਂਡ ਦਾ ਅਸ਼ਟਕ ਨਿਯਮ ਅਤੇ ਸੀਮਾਵਾਂ ਦੱਸੋ|ਦੋਵੇਂ ਕੋਸ਼ਿਸ਼ਾਂ ਕਿਉਂ ਅਸਫਲ ਰਹੀਆਂ",
        ),
        "mendeleev": (
            "State Mendeleev's periodic law|List the merits, including the predicted elements|List the demerits, including isotopes and hydrogen",
            "ਮੈਂਡਲੀਵ ਦਾ ਆਵਰਤੀ ਨਿਯਮ ਦੱਸੋ|ਗੁਣ ਅਤੇ ਭਵਿੱਖਬਾਣੀ ਕੀਤੇ ਤੱਤ ਦੱਸੋ|ਦੋਸ਼ — ਆਈਸੋਟੋਪ ਅਤੇ ਹਾਈਡਰੋਜਨ ਦੱਸੋ",
        ),
        "modern": (
            "State the modern periodic law based on atomic number|Find an element's period and group from its configuration|Separate valency from valence electrons",
            "ਪਰਮਾਣੂ ਸੰਖਿਆ ਤੇ ਆਧਾਰਿਤ ਆਧੁਨਿਕ ਨਿਯਮ ਦੱਸੋ|ਇਲੈਕਟ੍ਰਾਨ ਵੰਡ ਤੋਂ ਆਵਰਤ ਅਤੇ ਸਮੂਹ ਲੱਭੋ|ਸੰਯੋਜਕਤਾ ਅਤੇ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ",
        ),
        "trends": (
            "Predict how atomic size changes across and down|Predict metallic and non-metallic character|Justify each trend by nuclear charge and shells",
            "ਪਰਮਾਣੂ ਆਕਾਰ ਦਾ ਰੁਝਾਨ ਦੱਸੋ|ਧਾਤਵੀ ਅਤੇ ਅਧਾਤਵੀ ਲੱਛਣ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ|ਨਾਭਿਕੀ ਚਾਰਜ ਅਤੇ ਕੋਸ਼ਾਂ ਨਾਲ ਕਾਰਨ ਦਿਓ",
        ),
        "compare": (
            "Compare Mendeleev's table with the modern table|Explain how Moseley's work resolved the anomalies|Place an element as metal, non-metal or metalloid",
            "ਮੈਂਡਲੀਵ ਅਤੇ ਆਧੁਨਿਕ ਸਾਰਣੀ ਦੀ ਤੁਲਨਾ ਕਰੋ|ਮੋਜ਼ਲੇ ਨੇ ਦੋਸ਼ ਕਿਵੇਂ ਦੂਰ ਕੀਤੇ, ਸਮਝਾਓ|ਤੱਤ ਨੂੰ ਧਾਤ, ਅਧਾਤ ਜਾਂ ਉਪਧਾਤ ਵਿੱਚ ਰੱਖੋ",
        ),
        "recap": (
            "Recall both periodic laws word for word|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਦੋਵੇਂ ਆਵਰਤੀ ਨਿਯਮ ਸ਼ਬਦ-ਬ-ਸ਼ਬਦ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 06 - Control and Coordination": {
        "neurons": (
            "Label a neuron and state what each part does|Trace an impulse from dendrite to synapse|Name the three types of neuron and their jobs",
            "ਨਿਊਰਾਨ ਦੇ ਭਾਗ ਅਤੇ ਕੰਮ ਦੱਸੋ|ਡੈਂਡਰਾਈਟ ਤੋਂ ਸਿਨੈਪਸ ਤੱਕ ਆਵੇਗ ਦਾ ਰਾਹ ਦੱਸੋ|ਤਿੰਨ ਕਿਸਮ ਦੇ ਨਿਊਰਾਨ ਅਤੇ ਕੰਮ ਦੱਸੋ",
        ),
        "reflex-brain": (
            "Write the reflex arc in the correct order|Explain why reflexes bypass the brain|Name the three divisions of the brain and their functions",
            "ਪ੍ਰਤੀਵਰਤੀ ਚਾਪ ਸਹੀ ਕ੍ਰਮ ਵਿੱਚ ਲਿਖੋ|ਪ੍ਰਤੀਵਰਤੀ ਕਿਰਿਆ ਦਿਮਾਗ਼ ਨੂੰ ਕਿਉਂ ਛੱਡਦੀ ਹੈ|ਦਿਮਾਗ਼ ਦੇ ਤਿੰਨ ਭਾਗ ਅਤੇ ਕੰਮ ਦੱਸੋ",
        ),
        "endocrine": (
            "Match each gland to its hormone and effect|Explain the insulin feedback loop|Link iodine deficiency to goitre",
            "ਹਰ ਗ੍ਰੰਥੀ ਨੂੰ ਹਾਰਮੋਨ ਅਤੇ ਅਸਰ ਨਾਲ ਮਿਲਾਓ|ਇਨਸੁਲਿਨ ਦਾ ਫੀਡਬੈਕ ਚੱਕਰ ਸਮਝਾਓ|ਆਇਓਡੀਨ ਦੀ ਕਮੀ ਅਤੇ ਗਿੱਲ੍ਹੜ ਜੋੜੋ",
        ),
        "plants": (
            "Name the plant hormones and what each controls|Tell tropic from nastic movements|Give an example of each tropism",
            "ਪੌਦਾ ਹਾਰਮੋਨ ਅਤੇ ਉਹਨਾਂ ਦਾ ਕੰਮ ਦੱਸੋ|ਅਨੁਵਰਤੀ ਅਤੇ ਅਨੁਕੁੰਚਨ ਗਤੀ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਹਰ ਅਨੁਵਰਤਨ ਦੀ ਉਦਾਹਰਨ ਦਿਓ",
        ),
        "recap": (
            "Recall the reflex arc and gland table unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਪ੍ਰਤੀਵਰਤੀ ਚਾਪ ਅਤੇ ਗ੍ਰੰਥੀ ਸਾਰਣੀ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 06 - Life Processes": {
        "nutrition": (
            "Write the photosynthesis equation and its three steps|Trace food through the alimentary canal|Match each enzyme to its substrate and product",
            "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਦਾ ਸਮੀਕਰਣ ਅਤੇ ਤਿੰਨ ਪੜਾਅ ਲਿਖੋ|ਭੋਜਨ ਦਾ ਪਾਚਨ ਨਾਲੀ ਵਿੱਚ ਰਾਹ ਦੱਸੋ|ਐਨਜ਼ਾਈਮ ਨੂੰ ਭੋਜਨ ਨਾਲ ਮਿਲਾਓ",
        ),
        "respiration": (
            "Compare aerobic and anaerobic respiration products|Label the human respiratory system|Explain gas exchange at the alveoli",
            "ਆਕਸੀ ਅਤੇ ਅਣਆਕਸੀ ਸਾਹ ਕਿਰਿਆ ਦੇ ਉਤਪਾਦ ਦੱਸੋ|ਮਨੁੱਖੀ ਸਾਹ ਪ੍ਰਣਾਲੀ ਦਾ ਚਿੱਤਰ ਬਣਾਓ|ਐਲਵਿਓਲਾਈ ਵਿੱਚ ਗੈਸ ਵਟਾਂਦਰਾ ਸਮਝਾਓ",
        ),
        "transport": (
            "Label the heart and trace double circulation|Compare arteries, veins and capillaries|Explain transport by xylem and phloem",
            "ਦਿਲ ਦਾ ਚਿੱਤਰ ਅਤੇ ਦੋਹਰਾ ਪਰਿਸੰਚਰਣ ਦੱਸੋ|ਧਮਣੀ, ਸ਼ਿਰਾ ਅਤੇ ਕੇਸ਼ਿਕਾ ਦੀ ਤੁਲਨਾ ਕਰੋ|ਜ਼ਾਈਲਮ ਅਤੇ ਫਲੋਇਮ ਰਾਹੀਂ ਪਰਿਵਹਨ ਸਮਝਾਓ",
        ),
        "excretion": (
            "Label the nephron and describe how urine forms|Explain how dialysis replaces the kidney|Say how plants get rid of their wastes",
            "ਨੈਫ਼ਰਾਨ ਦਾ ਚਿੱਤਰ ਅਤੇ ਮੂਤਰ ਬਣਨ ਦੀ ਕਿਰਿਆ ਦੱਸੋ|ਡਾਇਲਸਿਸ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਸਮਝਾਓ|ਪੌਦੇ ਕਚਰਾ ਕਿਵੇਂ ਕੱਢਦੇ ਹਨ",
        ),
        "recap": (
            "Recall all four life processes unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਚਾਰੇ ਜੀਵਨ ਕਿਰਿਆਵਾਂ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 07 - How do Organisms Reproduce": {
        "pollination": (
            "Tell self-pollination from cross-pollination|Say what each flower part becomes after fertilisation|Describe double fertilisation in brief",
            "ਸਵੈ-ਪਰਾਗਣ ਅਤੇ ਪਰ-ਪਰਾਗਣ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਨਿਸ਼ੇਚਨ ਮਗਰੋਂ ਹਰ ਭਾਗ ਕੀ ਬਣਦਾ ਹੈ|ਦੋਹਰਾ ਨਿਸ਼ੇਚਨ ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ",
        ),
        "asexual": (
            "Name every mode of asexual reproduction with an organism|Tell binary fission from multiple fission|Say why regeneration is not true reproduction",
            "ਅਲਿੰਗੀ ਪ੍ਰਜਨਨ ਦੇ ਹਰ ਢੰਗ ਦੀ ਉਦਾਹਰਨ ਦਿਓ|ਦੋ-ਖੰਡਨ ਅਤੇ ਬਹੁ-ਖੰਡਨ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਪੁਨਰਜਨਨ ਸਹੀ ਪ੍ਰਜਨਨ ਕਿਉਂ ਨਹੀਂ",
        ),
        "plants": (
            "Label a flower and name the reproductive parts|Describe seed germination and its parts|List the advantages of vegetative propagation",
            "ਫੁੱਲ ਦਾ ਚਿੱਤਰ ਅਤੇ ਜਣਨ ਭਾਗ ਦੱਸੋ|ਬੀਜ ਅੰਕੁਰਣ ਅਤੇ ਇਸਦੇ ਭਾਗ ਦੱਸੋ|ਕਾਇਕ ਪ੍ਰਜਨਨ ਦੇ ਲਾਭ ਦੱਸੋ",
        ),
        "human": (
            "Label the male and female reproductive systems|Describe the menstrual cycle in order|Explain the placenta's role",
            "ਨਰ ਅਤੇ ਮਾਦਾ ਜਣਨ ਪ੍ਰਣਾਲੀ ਦਾ ਚਿੱਤਰ ਬਣਾਓ|ਮਾਹਵਾਰੀ ਚੱਕਰ ਕ੍ਰਮ ਵਿੱਚ ਦੱਸੋ|ਪਲੈਸੈਂਟਾ ਦਾ ਕੰਮ ਸਮਝਾਓ",
        ),
        "health": (
            "Classify the methods of contraception|Name common STDs and how they spread|Explain why reproductive health matters",
            "ਗਰਭ ਨਿਰੋਧ ਦੇ ਢੰਗ ਵੰਡੋ|ਆਮ STD ਅਤੇ ਫੈਲਣ ਦੇ ਕਾਰਨ ਦੱਸੋ|ਪ੍ਰਜਨਨ ਸਿਹਤ ਦੀ ਲੋੜ ਸਮਝਾਓ",
        ),
        "recap": (
            "Recall every mode of reproduction unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਪ੍ਰਜਨਨ ਦੇ ਹਰ ਢੰਗ ਨੂੰ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 08 - Heredity": {
        "variation": (
            "Define heredity and variation|Tell inherited traits from acquired ones|Separate genotype from phenotype",
            "ਅਨੁਵੰਸ਼ਿਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਅਨੁਵੰਸ਼ਿਕ ਅਤੇ ਉਪਾਰਜਿਤ ਲੱਛਣ ਵੱਖ ਕਰੋ|ਜੀਨ ਰੂਪ ਅਤੇ ਲੱਛਣ ਰੂਪ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ",
        ),
        "mendel": (
            "Say why Mendel chose the pea plant|State Mendel's three laws|Use the standard allele symbols correctly",
            "ਮੈਂਡਲ ਨੇ ਮਟਰ ਕਿਉਂ ਚੁਣਿਆ, ਦੱਸੋ|ਮੈਂਡਲ ਦੇ ਤਿੰਨ ਨਿਯਮ ਦੱਸੋ|ਐਲੀਲ ਚਿੰਨ੍ਹ ਸਹੀ ਵਰਤੋ",
        ),
        "crosses": (
            "Draw a monohybrid Punnett square and read the 3:1 ratio|Draw a dihybrid cross and read the 9:3:3:1 ratio|Explain what a test cross reveals",
            "ਇੱਕ-ਸੰਕਰ ਪਨੈੱਟ ਵਰਗ ਬਣਾ ਕੇ 3:1 ਪੜ੍ਹੋ|ਦੋ-ਸੰਕਰ ਕਰਾਸ ਬਣਾ ਕੇ 9:3:3:1 ਪੜ੍ਹੋ|ਪਰਖ ਕਰਾਸ ਕੀ ਦੱਸਦਾ ਹੈ",
        ),
        "sex-traits": (
            "Explain sex determination by X and Y chromosomes|Say why the father decides the child's sex|Give examples of human inherited traits",
            "X ਅਤੇ Y ਗੁਣਸੂਤਰ ਨਾਲ ਲਿੰਗ ਨਿਰਧਾਰਨ ਸਮਝਾਓ|ਪਿਤਾ ਹੀ ਲਿੰਗ ਕਿਉਂ ਤੈਅ ਕਰਦਾ ਹੈ|ਮਨੁੱਖੀ ਅਨੁਵੰਸ਼ਿਕ ਲੱਛਣ ਦੱਸੋ",
        ),
        "practice": (
            "Derive the 9:3:3:1 ratio step by step|Solve a cross for an unseen pair of traits|Check your ratios against the Punnett square",
            "9:3:3:1 ਅਨੁਪਾਤ ਕਦਮ ਦਰ ਕਦਮ ਕੱਢੋ|ਨਵੇਂ ਲੱਛਣ ਜੋੜੇ ਦਾ ਕਰਾਸ ਹੱਲ ਕਰੋ|ਪਨੈੱਟ ਵਰਗ ਨਾਲ ਅਨੁਪਾਤ ਜਾਂਚੋ",
        ),
        "evolution": (
            "Explain Darwin's natural selection|List the evidences for evolution|Compare Lamarck with Darwin and define speciation",
            "ਡਾਰਵਿਨ ਦਾ ਕੁਦਰਤੀ ਚੋਣ ਸਿਧਾਂਤ ਸਮਝਾਓ|ਜੈਵ ਵਿਕਾਸ ਦੇ ਪ੍ਰਮਾਣ ਦੱਸੋ|ਲੈਮਾਰਕ ਅਤੇ ਡਾਰਵਿਨ ਦੀ ਤੁਲਨਾ ਕਰੋ",
        ),
        "recap": (
            "Recall Mendel's laws and both ratios unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਮੈਂਡਲ ਦੇ ਨਿਯਮ ਅਤੇ ਦੋਵੇਂ ਅਨੁਪਾਤ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 09 - Light Reflection and Refraction": {
        "reflection": (
            "State the two laws of reflection|Tell a real image from a virtual one|List the characteristics of a plane-mirror image",
            "ਪਰਾਵਰਤਨ ਦੇ ਦੋ ਨਿਯਮ ਦੱਸੋ|ਵਾਸਤਵਿਕ ਅਤੇ ਆਭਾਸੀ ਪ੍ਰਤੀਬਿੰਬ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਸਮਤਲ ਦਰਪਣ ਦੇ ਪ੍ਰਤੀਬਿੰਬ ਦੇ ਲੱਛਣ ਦੱਸੋ",
        ),
        "mirrors": (
            "Label pole, centre of curvature, focus and the relation f = R/2|Apply the four ray rules to draw a diagram|Give the image for all five object positions",
            "ਧਰੁਵ, ਵਕਰਤਾ ਕੇਂਦਰ, ਫੋਕਸ ਅਤੇ f = R/2 ਦੱਸੋ|ਚਾਰ ਕਿਰਨ ਨਿਯਮ ਵਰਤ ਕੇ ਚਿੱਤਰ ਬਣਾਓ|ਪੰਜੇ ਸਥਿਤੀਆਂ ਲਈ ਪ੍ਰਤੀਬਿੰਬ ਦੱਸੋ",
        ),
        "mirror-formula": (
            "Apply the New Cartesian sign convention without slips|Solve 1/v + 1/u = 1/f for any unknown|Read the nature of the image from the sign of m",
            "ਨਵੀਂ ਕਾਰਤੀ ਚਿੰਨ੍ਹ ਪਰੰਪਰਾ ਸਹੀ ਲਾਗੂ ਕਰੋ|1/v + 1/u = 1/f ਹੱਲ ਕਰੋ|m ਦੇ ਚਿੰਨ੍ਹ ਤੋਂ ਪ੍ਰਤੀਬਿੰਬ ਦੀ ਪ੍ਰਕਿਰਤੀ ਦੱਸੋ",
        ),
        "lenses": (
            "Apply the lens ray rules to draw a diagram|Use 1/v − 1/u = 1/f and note the sign difference from mirrors|Recall the image table for a convex lens",
            "ਲੈਂਜ਼ ਕਿਰਨ ਨਿਯਮ ਵਰਤ ਕੇ ਚਿੱਤਰ ਬਣਾਓ|1/v − 1/u = 1/f ਵਰਤੋ ਅਤੇ ਚਿੰਨ੍ਹ ਦਾ ਫ਼ਰਕ ਧਿਆਨ ਰੱਖੋ|ਉੱਤਲ ਲੈਂਜ਼ ਦੀ ਪ੍ਰਤੀਬਿੰਬ ਸਾਰਣੀ ਯਾਦ ਕਰੋ",
        ),
        "refraction": (
            "State Snell's law and define refractive index|Calculate power P = 1/f with f in metres|Explain why a pencil looks bent in water",
            "ਸਨੈੱਲ ਦਾ ਨਿਯਮ ਅਤੇ ਅਪਵਰਤਨ ਅੰਕ ਦੱਸੋ|P = 1/f ਨਾਲ ਸ਼ਕਤੀ ਕੱਢੋ (f ਮੀਟਰ ਵਿੱਚ)|ਪਾਣੀ ਵਿੱਚ ਪੈਨਸਿਲ ਟੇਢੀ ਕਿਉਂ ਦਿਸਦੀ ਹੈ",
        ),
        "recap": (
            "Recall both formulas and the sign convention unaided|Work every numerical without looking at the steps|Spot the traps the board repeats",
            "ਦੋਵੇਂ ਸੂਤਰ ਅਤੇ ਚਿੰਨ੍ਹ ਪਰੰਪਰਾ ਯਾਦ ਕਰੋ|ਹਰ ਸੰਖਿਆਤਮਕ ਆਪ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 10 - The Human Eye and Colourful World": {
        "eye": (
            "Label the eye and state each part's function|Explain accommodation and the role of the ciliary muscles|Give the near point and far point of a normal eye",
            "ਅੱਖ ਦਾ ਚਿੱਤਰ ਅਤੇ ਹਰ ਭਾਗ ਦਾ ਕੰਮ ਦੱਸੋ|ਸਮਾਯੋਜਨ ਅਤੇ ਸਿਲੀਅਰੀ ਪੱਠਿਆਂ ਦਾ ਕੰਮ ਸਮਝਾਓ|ਸਧਾਰਨ ਅੱਖ ਦਾ ਨਿਕਟ ਅਤੇ ਦੂਰ ਬਿੰਦੂ ਦੱਸੋ",
        ),
        "defects": (
            "Describe myopia and correct it with a concave lens|Describe hypermetropia and correct it with a convex lens|Tell presbyopia from cataract",
            "ਨਿਕਟ ਦ੍ਰਿਸ਼ਟੀ ਅਤੇ ਅਵਤਲ ਲੈਂਜ਼ ਨਾਲ ਸੁਧਾਰ ਦੱਸੋ|ਦੂਰ ਦ੍ਰਿਸ਼ਟੀ ਅਤੇ ਉੱਤਲ ਲੈਂਜ਼ ਨਾਲ ਸੁਧਾਰ ਦੱਸੋ|ਜਰਾ-ਦ੍ਰਿਸ਼ਟੀ ਅਤੇ ਮੋਤੀਆਬਿੰਦ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ",
        ),
        "dispersion": (
            "Explain dispersion through a prism and the VIBGYOR order|Say which colour deviates most and why|Explain how a rainbow forms",
            "ਪ੍ਰਿਜ਼ਮ ਰਾਹੀਂ ਵਿਖੇਪਣ ਅਤੇ VIBGYOR ਕ੍ਰਮ ਸਮਝਾਓ|ਕਿਹੜਾ ਰੰਗ ਸਭ ਤੋਂ ਵੱਧ ਮੁੜਦਾ ਹੈ ਤੇ ਕਿਉਂ|ਸਤਰੰਗੀ ਪੀਂਘ ਕਿਵੇਂ ਬਣਦੀ ਹੈ",
        ),
        "atmospheric": (
            "Explain why stars twinkle but planets do not|Explain the advance sunrise and delayed sunset|Define the atmospheric refraction causing both",
            "ਤਾਰੇ ਕਿਉਂ ਟਿਮਟਿਮਾਉਂਦੇ ਹਨ, ਗ੍ਰਹਿ ਕਿਉਂ ਨਹੀਂ|ਸੂਰਜ ਜਲਦੀ ਚੜ੍ਹਨਾ ਅਤੇ ਦੇਰ ਨਾਲ ਡੁੱਬਣਾ ਸਮਝਾਓ|ਵਾਯੂਮੰਡਲੀ ਅਪਵਰਤਨ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ",
        ),
        "scattering": (
            "Explain the Tyndall effect|Say why the sky is blue and the sunset red|Say why danger signals are red",
            "ਟਿੰਡਲ ਪ੍ਰਭਾਵ ਸਮਝਾਓ|ਅਸਮਾਨ ਨੀਲਾ ਅਤੇ ਸੂਰਜ ਡੁੱਬਣ ਵੇਲੇ ਲਾਲ ਕਿਉਂ|ਖ਼ਤਰੇ ਦੇ ਸੰਕੇਤ ਲਾਲ ਕਿਉਂ ਹੁੰਦੇ ਹਨ",
        ),
        "recap": (
            "Recall the eye diagram and every defect correction|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਅੱਖ ਦਾ ਚਿੱਤਰ ਅਤੇ ਹਰ ਦੋਸ਼ ਦਾ ਸੁਧਾਰ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 11 - Electricity": {
        "current": (
            "Define current and potential difference with units|Draw the standard circuit symbols|Say where the ammeter and voltmeter go in a circuit",
            "ਕਰੰਟ ਅਤੇ ਪੁਟੈਂਸ਼ਲ ਅੰਤਰ ਦੀ ਪਰਿਭਾਸ਼ਾ ਅਤੇ ਇਕਾਈ ਦੱਸੋ|ਪਰਿਪਥ ਚਿੰਨ੍ਹ ਬਣਾਓ|ਐਮਮੀਟਰ ਅਤੇ ਵੋਲਟਮੀਟਰ ਕਿੱਥੇ ਲੱਗਦੇ ਹਨ",
        ),
        "ohm": (
            "State Ohm's law and its conditions|Read and draw the V–I graph|Solve for V, I or R in any numerical",
            "ਓਹਮ ਦਾ ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ ਦੱਸੋ|V–I ਗ੍ਰਾਫ਼ ਬਣਾਓ ਅਤੇ ਪੜ੍ਹੋ|V, I ਜਾਂ R ਕੱਢੋ",
        ),
        "resistance": (
            "List the four factors that change resistance|Use R = ρL/A correctly|Compare the resistivity of conductors, alloys and insulators",
            "ਪ੍ਰਤੀਰੋਧ ਬਦਲਣ ਵਾਲੇ ਚਾਰ ਕਾਰਕ ਦੱਸੋ|R = ρL/A ਸਹੀ ਵਰਤੋ|ਚਾਲਕ, ਮਿਸ਼ਰਤ ਧਾਤ ਅਤੇ ਰੋਧਕ ਦੀ ਤੁਲਨਾ ਕਰੋ",
        ),
        "circuits": (
            "Derive and use Rs = R₁ + R₂ + R₃|Derive and use 1/Rp = 1/R₁ + 1/R₂ + 1/R₃|Say why household wiring is in parallel",
            "Rs = R₁ + R₂ + R₃ ਕੱਢੋ ਅਤੇ ਵਰਤੋ|1/Rp = 1/R₁ + 1/R₂ + 1/R₃ ਕੱਢੋ ਅਤੇ ਵਰਤੋ|ਘਰੇਲੂ ਤਾਰਾਂ ਸਮਾਂਤਰ ਕਿਉਂ ਹੁੰਦੀਆਂ ਹਨ",
        ),
        "heating": (
            "State Joule's law H = I²Rt|Use P = VI = I²R = V²/R|Convert energy to kWh and cost it",
            "ਜੂਲ ਦਾ ਨਿਯਮ H = I²Rt ਦੱਸੋ|P = VI = I²R = V²/R ਵਰਤੋ|ਊਰਜਾ ਨੂੰ kWh ਵਿੱਚ ਬਦਲ ਕੇ ਖ਼ਰਚ ਕੱਢੋ",
        ),
        "recap": (
            "Recall every formula and unit unaided|Work every numerical without looking at the steps|Spot the traps the board repeats",
            "ਹਰ ਸੂਤਰ ਅਤੇ ਇਕਾਈ ਯਾਦ ਕਰੋ|ਹਰ ਸੰਖਿਆਤਮਕ ਆਪ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 12 - Magnetic Effects of Electric Current": {
        "field": (
            "Define a magnetic field and draw field lines|State the properties of field lines|Describe Oersted's experiment and what it proved",
            "ਚੁੰਬਕੀ ਖੇਤਰ ਦੀ ਪਰਿਭਾਸ਼ਾ ਅਤੇ ਰੇਖਾਵਾਂ ਬਣਾਓ|ਖੇਤਰ ਰੇਖਾਵਾਂ ਦੇ ਗੁਣ ਦੱਸੋ|ਓਅਰਸਟੇਡ ਦਾ ਪ੍ਰਯੋਗ ਅਤੇ ਸਿੱਟਾ ਦੱਸੋ",
        ),
        "current-field": (
            "Apply the right-hand thumb rule to a straight wire|Draw the field of a circular loop and a solenoid|Say how a solenoid becomes an electromagnet",
            "ਸਿੱਧੀ ਤਾਰ ਲਈ ਸੱਜੇ ਹੱਥ ਅੰਗੂਠਾ ਨਿਯਮ ਵਰਤੋ|ਗੋਲ ਕੁੰਡਲੀ ਅਤੇ ਸੋਲੇਨਾਇਡ ਦਾ ਖੇਤਰ ਬਣਾਓ|ਸੋਲੇਨਾਇਡ ਬਿਜਲਈ ਚੁੰਬਕ ਕਿਵੇਂ ਬਣਦਾ ਹੈ",
        ),
        "motor": (
            "Apply Fleming's LEFT-hand rule for force|Label the electric motor and explain its rotation|Say what the split-ring commutator does",
            "ਬਲ ਲਈ ਫਲੈਮਿੰਗ ਦਾ ਖੱਬਾ ਹੱਥ ਨਿਯਮ ਵਰਤੋ|ਬਿਜਲਈ ਮੋਟਰ ਦਾ ਚਿੱਤਰ ਅਤੇ ਘੁੰਮਣ ਸਮਝਾਓ|ਸਪਲਿਟ-ਰਿੰਗ ਕਮਿਊਟੇਟਰ ਦਾ ਕੰਮ ਦੱਸੋ",
        ),
        "induction": (
            "Define electromagnetic induction|Apply Fleming's RIGHT-hand rule for induced current|Compare AC and DC and label the generator",
            "ਬਿਜਲ-ਚੁੰਬਕੀ ਪ੍ਰੇਰਣ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਪ੍ਰੇਰਿਤ ਕਰੰਟ ਲਈ ਸੱਜਾ ਹੱਥ ਨਿਯਮ ਵਰਤੋ|AC ਅਤੇ DC ਦੀ ਤੁਲਨਾ ਕਰੋ",
        ),
        "domestic": (
            "Name the three household wires and their colours|Explain the fuse and why it sits in the live wire|Explain earthing, short circuit and overloading",
            "ਤਿੰਨੇ ਘਰੇਲੂ ਤਾਰਾਂ ਅਤੇ ਰੰਗ ਦੱਸੋ|ਫ਼ਿਊਜ਼ ਜਿਊਂਦੀ ਤਾਰ ਵਿੱਚ ਕਿਉਂ ਲੱਗਦਾ ਹੈ|ਅਰਥਿੰਗ, ਸ਼ਾਰਟ ਸਰਕਟ ਅਤੇ ਓਵਰਲੋਡ ਸਮਝਾਓ",
        ),
        "recap": (
            "Keep the left-hand and right-hand rules straight|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਖੱਬਾ ਅਤੇ ਸੱਜਾ ਹੱਥ ਨਿਯਮ ਨਾ ਰਲਾਓ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 13 - Our Environment": {
        "ecosystem": (
            "Name the biotic and abiotic components|Define producer, consumer and decomposer|Give examples of natural and artificial ecosystems",
            "ਜੈਵਿਕ ਅਤੇ ਅਜੈਵਿਕ ਅੰਗ ਦੱਸੋ|ਉਤਪਾਦਕ, ਉਪਭੋਗਤਾ ਅਤੇ ਅਪਘਟਕ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਕੁਦਰਤੀ ਅਤੇ ਬਣਾਉਟੀ ਪਰਿਸਥਿਤਕ ਤੰਤਰ ਦੀਆਂ ਉਦਾਹਰਨਾਂ ਦਿਓ",
        ),
        "food-chain": (
            "Build a food chain with the arrows the right way round|Tell a food chain from a food web|Count trophic levels correctly",
            "ਸਹੀ ਦਿਸ਼ਾ ਵਾਲੇ ਤੀਰਾਂ ਨਾਲ ਆਹਾਰ ਲੜੀ ਬਣਾਓ|ਆਹਾਰ ਲੜੀ ਅਤੇ ਆਹਾਰ ਜਾਲ ਵਿੱਚ ਫ਼ਰਕ ਦੱਸੋ|ਪੋਸ਼ਣ ਪੱਧਰ ਸਹੀ ਗਿਣੋ",
        ),
        "energy-flow": (
            "Apply the 10% law through several trophic levels|Say why food chains rarely exceed four levels|Explain biological magnification",
            "ਕਈ ਪੋਸ਼ਣ ਪੱਧਰਾਂ ਵਿੱਚ 10% ਨਿਯਮ ਲਾਗੂ ਕਰੋ|ਆਹਾਰ ਲੜੀ ਚਾਰ ਪੱਧਰਾਂ ਤੋਂ ਵੱਧ ਕਿਉਂ ਨਹੀਂ|ਜੈਵ ਵਿਸ਼ਾਲੀਕਰਨ ਸਮਝਾਓ",
        ),
        "ozone-waste": (
            "Explain how ozone forms and how CFCs destroy it|Sort waste into biodegradable and non-biodegradable|Apply the three R's to a real situation",
            "ਓਜ਼ੋਨ ਕਿਵੇਂ ਬਣਦੀ ਹੈ ਅਤੇ CFC ਕਿਵੇਂ ਨਸ਼ਟ ਕਰਦੇ ਹਨ|ਕੂੜੇ ਨੂੰ ਜੈਵ-ਨਿਮਨੀਕਰਨਯੋਗ ਅਤੇ ਅਜੈਵ ਵਿੱਚ ਵੰਡੋ|ਤਿੰਨ R ਅਸਲ ਹਾਲਾਤ ਵਿੱਚ ਵਰਤੋ",
        ),
        "recap": (
            "Recall the 10% law and the ozone story unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "10% ਨਿਯਮ ਅਤੇ ਓਜ਼ੋਨ ਦੀ ਕਹਾਣੀ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 14 - Sources of Energy": {
        "good-source": (
            "List what makes a source of energy good|Tell conventional from non-conventional sources|Tell renewable from non-renewable sources",
            "ਚੰਗੇ ਊਰਜਾ ਸਰੋਤ ਦੇ ਗੁਣ ਦੱਸੋ|ਪਰੰਪਰਾਗਤ ਅਤੇ ਗ਼ੈਰ-ਪਰੰਪਰਾਗਤ ਸਰੋਤ ਵੱਖ ਕਰੋ|ਨਵਿਆਉਣਯੋਗ ਅਤੇ ਗ਼ੈਰ-ਨਵਿਆਉਣਯੋਗ ਵੱਖ ਕਰੋ",
        ),
        "fossil": (
            "Name the fossil fuels and how they formed|Trace the energy chain in a thermal power plant|List the limitations and pollution they cause",
            "ਪਥਰਾਟ ਬਾਲਣ ਅਤੇ ਉਹਨਾਂ ਦਾ ਬਣਨਾ ਦੱਸੋ|ਤਾਪ ਬਿਜਲੀ ਘਰ ਦੀ ਊਰਜਾ ਲੜੀ ਦੱਸੋ|ਸੀਮਾਵਾਂ ਅਤੇ ਪ੍ਰਦੂਸ਼ਣ ਦੱਸੋ",
        ),
        "renewables": (
            "Trace the energy conversions in a hydro power plant|Label a biogas plant and name its fuel|State the requirements and limits of wind energy",
            "ਪਣ-ਬਿਜਲੀ ਘਰ ਦੇ ਊਰਜਾ ਪਰਿਵਰਤਨ ਦੱਸੋ|ਬਾਇਓਗੈਸ ਪਲਾਂਟ ਦਾ ਚਿੱਤਰ ਬਣਾਓ|ਪੌਣ ਊਰਜਾ ਦੀਆਂ ਲੋੜਾਂ ਅਤੇ ਸੀਮਾਵਾਂ ਦੱਸੋ",
        ),
        "solar": (
            "Explain how a solar cooker traps heat|Say why a solar cell box is painted black with a glass sheet|Give the uses and cost limits of solar cells",
            "ਸੂਰਜੀ ਕੁੱਕਰ ਤਾਪ ਕਿਵੇਂ ਰੋਕਦਾ ਹੈ|ਡੱਬਾ ਕਾਲਾ ਅਤੇ ਸ਼ੀਸ਼ੇ ਵਾਲਾ ਕਿਉਂ ਹੁੰਦਾ ਹੈ|ਸੂਰਜੀ ਸੈੱਲਾਂ ਦੀ ਵਰਤੋਂ ਅਤੇ ਸੀਮਾਵਾਂ ਦੱਸੋ",
        ),
        "alternative": (
            "Tell tidal, wave and ocean thermal energy apart|Explain geothermal energy from hot spots|Describe nuclear fission and its hazards",
            "ਜਵਾਰ, ਲਹਿਰ ਅਤੇ ਸਮੁੰਦਰੀ ਤਾਪ ਊਰਜਾ ਵੱਖ ਕਰੋ|ਭੂ-ਤਾਪੀ ਊਰਜਾ ਸਮਝਾਓ|ਨਾਭਿਕੀ ਵਿਖੰਡਨ ਅਤੇ ਖ਼ਤਰੇ ਦੱਸੋ",
        ),
        "choosing": (
            "Compare sources on cost, pollution and availability|Justify a choice of source for a given village|Write a structured exam answer on energy choice",
            "ਖ਼ਰਚ, ਪ੍ਰਦੂਸ਼ਣ ਅਤੇ ਉਪਲਬਧਤਾ ਤੇ ਤੁਲਨਾ ਕਰੋ|ਕਿਸੇ ਪਿੰਡ ਲਈ ਸਰੋਤ ਚੁਣ ਕੇ ਕਾਰਨ ਦਿਓ|ਢਾਂਚਾਗਤ ਉੱਤਰ ਲਿਖੋ",
        ),
        "recap": (
            "Recall every source with one advantage and one limit|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਹਰ ਸਰੋਤ ਦਾ ਇੱਕ ਲਾਭ ਅਤੇ ਇੱਕ ਸੀਮਾ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
    "Chapter 16 - Sustainable Management of Natural Resources": {
        "why": (
            "Define sustainable development|Say why resources must be managed, not just used|Apply the five R's to everyday choices",
            "ਟਿਕਾਊ ਵਿਕਾਸ ਦੀ ਪਰਿਭਾਸ਼ਾ ਦਿਓ|ਸਰੋਤਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਿਉਂ ਜ਼ਰੂਰੀ ਹੈ|ਪੰਜ R ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਵਿੱਚ ਵਰਤੋ",
        ),
        "forests": (
            "Name the four stakeholders in forest management|Describe the Chipko movement and its result|Explain why local participation works",
            "ਜੰਗਲ ਪ੍ਰਬੰਧਨ ਦੇ ਚਾਰ ਹਿੱਸੇਦਾਰ ਦੱਸੋ|ਚਿਪਕੋ ਅੰਦੋਲਨ ਅਤੇ ਨਤੀਜਾ ਦੱਸੋ|ਲੋਕਾਂ ਦੀ ਭਾਗੀਦਾਰੀ ਕਿਉਂ ਕੰਮ ਕਰਦੀ ਹੈ",
        ),
        "water": (
            "List the benefits and the problems of big dams|Describe traditional water harvesting systems|Explain watershed management",
            "ਵੱਡੇ ਡੈਮਾਂ ਦੇ ਲਾਭ ਅਤੇ ਸਮੱਸਿਆਵਾਂ ਦੱਸੋ|ਰਵਾਇਤੀ ਜਲ ਸੰਭਾਲ ਪ੍ਰਣਾਲੀਆਂ ਦੱਸੋ|ਜਲ-ਗ੍ਰਹਿਣ ਖੇਤਰ ਪ੍ਰਬੰਧਨ ਸਮਝਾਓ",
        ),
        "fuels": (
            "Say why coal and petroleum must be conserved|Name cleaner alternatives to fossil fuels|Link energy use to economy and equity",
            "ਕੋਲਾ ਅਤੇ ਪੈਟਰੋਲੀਅਮ ਦੀ ਸੰਭਾਲ ਕਿਉਂ ਜ਼ਰੂਰੀ|ਸਾਫ਼ ਬਦਲ ਦੱਸੋ|ਊਰਜਾ ਵਰਤੋਂ ਨੂੰ ਆਰਥਿਕਤਾ ਅਤੇ ਬਰਾਬਰੀ ਨਾਲ ਜੋੜੋ",
        ),
        "biodiversity": (
            "Explain what biodiversity loss costs us|Name the conservation strategies and give an example|Weigh the stakeholders in a resource conflict",
            "ਜੈਵ ਵਿਭਿੰਨਤਾ ਦੇ ਨੁਕਸਾਨ ਦਾ ਅਸਰ ਦੱਸੋ|ਸੰਭਾਲ ਦੀਆਂ ਰਣਨੀਤੀਆਂ ਅਤੇ ਉਦਾਹਰਨ ਦਿਓ|ਸਰੋਤ ਟਕਰਾਅ ਵਿੱਚ ਹਿੱਸੇਦਾਰਾਂ ਨੂੰ ਤੋਲੋ",
        ),
        "recap": (
            "Recall the five R's and the stakeholder list unaided|Work through the PSEB-style practice questions|Spot the traps the board repeats",
            "ਪੰਜ R ਅਤੇ ਹਿੱਸੇਦਾਰਾਂ ਦੀ ਸੂਚੀ ਯਾਦ ਕਰੋ|ਅਭਿਆਸ ਪ੍ਰਸ਼ਨ ਹੱਲ ਕਰੋ|ਬੋਰਡ ਦੇ ਦੁਹਰਾਏ ਜਾਣ ਵਾਲੇ ਜਾਲ ਪਛਾਣੋ",
        ),
    },
}


def find_slides(html: str) -> list[tuple[int, int]]:
    """Return (start, end) offsets of every top-level slide div."""
    spans = []
    for m in SLIDE_OPEN.finditer(html):
        depth = 0
        i = m.start()
        tag = re.compile(r"<(/?)div\b[^>]*?(/?)>", re.I)
        for t in tag.finditer(html, i):
            if t.group(2) == "/":
                continue  # self-closing <div/> never appears, but be safe
            depth += -1 if t.group(1) else 1
            if depth == 0:
                spans.append((m.start(), t.end()))
                break
        else:
            raise SystemExit(f"unbalanced slide starting at offset {m.start()}")
    return spans


def strip_section_attrs(tag: str) -> str:
    return re.sub(r'\s+data-section-[a-z-]+(?:="[^"]*")?', "", tag)


def apply(folder: str) -> str:
    deck_dir = ROOT / folder
    files = [p for p in deck_dir.iterdir() if p.suffix == ".html"]
    if len(files) != 1:
        raise SystemExit(f"expected one deck in {folder}, found {len(files)}")
    path = files[0]
    html = path.read_text(encoding="utf-8")

    spans = find_slides(html)
    chunks = [html[s:e] for s, e in spans]
    head = html[: spans[0][0]]
    tail = html[spans[-1][1] :]
    between = [html[spans[i][1] : spans[i + 1][0]] for i in range(len(spans) - 1)]
    joiner = between[0] if between else "\n"

    order = ORDER.get(folder)
    if order:
        if sorted(order) != list(range(len(chunks))):
            raise SystemExit(f"{folder}: ORDER must be a permutation of 0..{len(chunks) - 1}")
        # Reordering is destructive if repeated, so stamp the slider once and
        # treat the stamp as "already in the new order" on every later run.
        stamp = f'data-slide-order="{ORDER_VERSION}"'
        if stamp in head:
            order = None
        else:
            chunks = [chunks[i] for i in order]
            head = head.replace('<div class="slider"', f'<div class="slider" {stamp}', 1)

    sections = SECTIONS[folder]
    starts = {start: spec for spec in sections for start in (spec[3],)}
    if max(starts) >= len(chunks):
        raise SystemExit(f"{folder}: section start {max(starts)} past last slide {len(chunks) - 1}")

    bounds = sorted(starts)
    for pos, idx in enumerate(bounds):
        slug, en, pa, _ = starts[idx]
        last = bounds[pos + 1] if pos + 1 < len(bounds) else len(chunks)
        mins = max(2, round((last - idx) * 1.5))
        chunk = chunks[idx]
        open_tag = SLIDE_OPEN.match(chunk).group(0)
        clean = strip_section_attrs(open_tag)
        attrs = (
            f' data-section-id="{slug}"'
            f' data-section-en="{en}"'
            f' data-section-pa="{pa}"'
            f' data-section-mins="{mins}"'
        )
        goal = GOALS.get(folder, {}).get(slug)
        if goal:
            attrs += f' data-section-goals="{goal[0]}"'
            if goal[1]:
                attrs += f' data-section-goals-pa="{goal[1]}"'

        if pos == 0:
            attrs += " data-section-unnumbered"
        new_tag = clean[:-1] + attrs + ">"
        chunks[idx] = new_tag + chunk[len(open_tag) :]

    # Any slide that still carries stale attributes from a previous run must
    # lose them, otherwise an edited boundary leaves a ghost section behind.
    for i, chunk in enumerate(chunks):
        if i in starts:
            continue
        open_tag = SLIDE_OPEN.match(chunk).group(0)
        if "data-section-" in open_tag:
            chunks[i] = strip_section_attrs(open_tag) + chunk[len(open_tag) :]

    out = head + joiner.join(chunks) + tail
    if out != html:
        path.write_text(out, encoding="utf-8")
        return f"updated ({len(chunks)} slides, {len(sections)} sections)"
    return f"unchanged ({len(chunks)} slides, {len(sections)} sections)"


def main() -> None:
    for folder in sorted(SECTIONS):
        print(f"{folder}: {apply(folder)}")


if __name__ == "__main__":
    main()
