#!/usr/bin/env python3
"""Add Gurmukhi glosses to slide headings that only carry English.

Heading-level bilingual coverage was wildly uneven: 83% of Chapter 6 (Control
and Coordination) headings carried a Punjabi gloss, against 12% in Chapter 16
and 14% in Chapter 14. A Punjabi-medium student skimming for a topic could
navigate some chapters and not others, which is the exact inequity the deck's
bilingual design exists to remove.

This script fills the gaps using the deck's existing convention:

    <h2>Electric Power <span class="punjabi">(ਬਿਜਲਈ ਸ਼ਕਤੀ)</span></h2>

The gloss goes immediately after the English title and *before* any
<span class="board-badge">, so the badge stays at the end of the line.

Deliberately skipped:
  * headings that already contain Gurmukhi
  * the chapter-divider slide, whose Gurmukhi title is a sibling of the <h2>

Run from the repository root; it is idempotent:

    python3 "Scripts/apply_punjabi_headings.py"
    python3 "Scripts/apply_punjabi_headings.py" --check   # report only
"""

from __future__ import annotations

import html as htmllib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

H2 = re.compile(r"<h2\b[^>]*>(.*?)</h2>", re.S)
GURMUKHI = re.compile(r"[\u0A00-\u0A7F]")
BADGE = re.compile(r'\s*<span class="board-badge">.*?</span>\s*$', re.S)
TAGS = re.compile(r"<[^>]+>")

# Repeated structural headings. Checked before the exact table so a chapter
# number never has to be spelled out sixteen times.
PATTERNS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"^Say It Back: Chapter \d+$"), "ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦੱਸੋ"),
    (re.compile(r"^Quick Check: Chapter \d+$"), "ਤੁਰੰਤ ਜਾਂਚ"),
    (re.compile(r"^Chapter \d+ Quick Recap$"), "ਤੁਰੰਤ ਦੁਹਰਾਈ"),
    (re.compile(r"^Chapter \d+ Recap$"), "ਦੁਹਰਾਈ"),
    (re.compile(r"^Case Study Question$"), "ਕੇਸ ਸਟੱਡੀ ਪ੍ਰਸ਼ਨ"),
    (re.compile(r"^True or False\?$"), "ਸਹੀ ਜਾਂ ਗਲਤ?"),
    (re.compile(r"^Memorize This: Chapter Recap$"), "ਯਾਦ ਰੱਖੋ — ਦੁਹਰਾਈ"),
    (re.compile(r"^Spot the Error$"), "ਗਲਤੀ ਲੱਭੋ"),
    (re.compile(r"^Exam Writing Frame$"), "ਉੱਤਰ ਲਿਖਣ ਦਾ ਢਾਂਚਾ"),
]

EXACT: dict[str, str] = {
    # ---- Chapter 1 ----
    "Decomposition Specifics (3 Marks) PSEB 2018, 2021, 2023": "ਅਪਘਟਨ ਦੇ ਵਿਸ਼ੇਸ਼ ਨੁਕਤੇ",
    "Oxidation Tracking (Example)": "ਆਕਸੀਕਰਨ ਦੀ ਪਛਾਣ (ਉਦਾਹਰਨ)",
    "Respiration vs. Photosynthesis": "ਸਾਹ ਕਿਰਿਆ ਬਨਾਮ ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ",
    "Case Study: Endothermic Reactions": "ਕੇਸ ਸਟੱਡੀ — ਤਾਪ-ਸ਼ੋਸ਼ੀ ਕਿਰਿਆਵਾਂ",
    # ---- Chapter 2 ----
    "Metallic vs Non-Metallic Oxides": "ਧਾਤਵੀ ਬਨਾਮ ਅਧਾਤਵੀ ਆਕਸਾਈਡ",
    'Top "Give Reason" Questions PSEB 2017, 2019, 2023': "ਮੁੱਖ “ਕਾਰਨ ਦੱਸੋ” ਪ੍ਰਸ਼ਨ",
    "The Chlor-Alkali Process PSEB 2020, 2022": "ਕਲੋਰ-ਐਲਕਲੀ ਕਿਰਿਆ",
    "Manufacturing Salts: Bleaching Powder & Baking Soda": "ਲੂਣ ਬਣਾਉਣਾ — ਬਲੀਚਿੰਗ ਪਾਊਡਰ ਅਤੇ ਖਾਣ ਵਾਲਾ ਸੋਡਾ",
    "Manufacturing Salts: Washing Soda & Plaster of Paris": "ਲੂਣ ਬਣਾਉਣਾ — ਧੋਣ ਵਾਲਾ ਸੋਡਾ ਅਤੇ ਪਲਾਸਟਰ ਆਫ਼ ਪੈਰਿਸ",
    "Case Study: The Chlor-Alkali Process": "ਕੇਸ ਸਟੱਡੀ — ਕਲੋਰ-ਐਲਕਲੀ ਕਿਰਿਆ",
    # ---- Chapter 3 ----
    "The Exceptions Rulebook": "ਅਪਵਾਦਾਂ ਦੀ ਸੂਚੀ",
    "Anodizing Aluminum": "ਐਲੂਮੀਨੀਅਮ ਦਾ ਐਨੋਡੀਕਰਨ",
    "Metallurgy: The 3 Stages": "ਧਾਤੁ ਕਰਮ — ਤਿੰਨ ਪੜਾਅ",
    "Extraction Based on Reactivity": "ਕਿਰਿਆਸ਼ੀਲਤਾ ਅਨੁਸਾਰ ਨਿਸ਼ਕਰਸ਼ਣ",
    "Roasting vs. Calcination (3-Mark Question) PSEB 2018, 2022": "ਭਰਜਨ ਬਨਾਮ ਨਿਖਾਰਨ",
    "Extraction Deep Dive": "ਨਿਸ਼ਕਰਸ਼ਣ — ਵਿਸਥਾਰ ਨਾਲ",
    "Case Study: Thermit Reaction": "ਕੇਸ ਸਟੱਡੀ — ਥਰਮਿਟ ਕਿਰਿਆ",
    # ---- Chapter 4 ----
    "Why does Carbon Share? (Reasoning)": "ਕਾਰਬਨ ਇਲੈਕਟ੍ਰਾਨ ਸਾਂਝੇ ਕਿਉਂ ਕਰਦਾ ਹੈ?",
    "Saturated vs. Unsaturated Hydrocarbons": "ਸੰਤ੍ਰਿਪਤ ਬਨਾਮ ਅਸੰਤ੍ਰਿਪਤ ਹਾਈਡਰੋਕਾਰਬਨ",
    "Traits of a Homologous Series PSEB 2020, 2022": "ਸਮਜਾਤੀ ਲੜੀ ਦੇ ਲੱਛਣ",
    "Naming Carbon Compounds: IUPAC Rules": "ਕਾਰਬਨ ਯੌਗਿਕਾਂ ਦਾ ਨਾਮਕਰਨ — IUPAC ਨਿਯਮ",
    "The 4 Chemical Properties of Carbon": "ਕਾਰਬਨ ਦੇ ਚਾਰ ਰਸਾਇਣਕ ਗੁਣ",
    "Ethanol vs. Ethanoic Acid": "ਐਥੇਨਾਲ ਬਨਾਮ ਐਥੇਨਾਇਕ ਐਸਿਡ",
    "Cleansing Action of Soap PSEB 2019, 2021, 2023 (5 Marks)": "ਸਾਬਣ ਦੀ ਸਫ਼ਾਈ ਕਿਰਿਆ",
    "Case Study: Saponification": "ਕੇਸ ਸਟੱਡੀ — ਸਾਬਣੀਕਰਨ",
    # ---- Chapter 5 ----
    "Early Classification: Dobereiner's Triads": "ਮੁੱਢਲਾ ਵਰਗੀਕਰਨ — ਡੋਬਰਾਈਨਰ ਦੀਆਂ ਤ੍ਰਿਕਾਂ",
    "Newlands' Law of Octaves": "ਨਿਊਲੈਂਡ ਦਾ ਅਸ਼ਟਕ ਨਿਯਮ",
    "Mendeleev's Periodic Table": "ਮੈਂਡਲੀਵ ਦੀ ਆਵਰਤੀ ਸਾਰਣੀ",
    "Mendeleev's Hidden Genius PSEB 2019, 2023": "ਮੈਂਡਲੀਵ ਦੀ ਦੂਰਅੰਦੇਸ਼ੀ",
    "Solving Mendeleev's Problems": "ਮੈਂਡਲੀਵ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ",
    "Case Study: Moseley's Discovery": "ਕੇਸ ਸਟੱਡੀ — ਮੋਜ਼ਲੇ ਦੀ ਖੋਜ",
    # ---- Chapter 6 · Control and Coordination ----
    "The Reflex Arc Sequence": "ਪ੍ਰਤੀਵਰਤੀ ਚਾਪ ਦਾ ਕ੍ਰਮ",
    "Human Brain: Three Divisions": "ਮਨੁੱਖੀ ਦਿਮਾਗ਼ — ਤਿੰਨ ਭਾਗ",
    "Human Endocrine Glands": "ਮਨੁੱਖੀ ਅੰਤਹ-ਸ੍ਰਾਵੀ ਗ੍ਰੰਥੀਆਂ",
    # ---- Chapter 6 · Life Processes ----
    "What Are Life Processes?": "ਜੀਵਨ ਕਿਰਿਆਵਾਂ ਕੀ ਹਨ?",
    "Nutrition: Autotrophic vs Heterotrophic": "ਪੋਸ਼ਣ — ਸਵੈਪੋਸ਼ੀ ਬਨਾਮ ਪਰਪੋਸ਼ੀ",
    "Photosynthesis 5-Mark Core": "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ",
    "Photosynthesis": "ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ",
    "How Stomata Work": "ਸਟੋਮੈਟਾ ਕਿਵੇਂ ਕੰਮ ਕਰਦੇ ਹਨ",
    "Heterotrophic Nutrition Types": "ਪਰਪੋਸ਼ੀ ਪੋਸ਼ਣ ਦੀਆਂ ਕਿਸਮਾਂ",
    "Nutrition in Amoeba & Paramecium": "ਅਮੀਬਾ ਅਤੇ ਪੈਰਾਮੀਸ਼ੀਅਮ ਵਿੱਚ ਪੋਸ਼ਣ",
    "Human Digestive System": "ਮਨੁੱਖੀ ਪਾਚਨ ਪ੍ਰਣਾਲੀ",
    "Digestion Step-by-Step": "ਪਾਚਨ — ਕਦਮ ਦਰ ਕਦਮ",
    "Interactive: Match Enzyme to Food": "ਐਨਜ਼ਾਈਮ ਨੂੰ ਭੋਜਨ ਨਾਲ ਮਿਲਾਓ",
    "Respiration: Aerobic vs Anaerobic": "ਸਾਹ ਕਿਰਿਆ — ਆਕਸੀ ਬਨਾਮ ਅਣਆਕਸੀ",
    "Human Respiratory System": "ਮਨੁੱਖੀ ਸਾਹ ਪ੍ਰਣਾਲੀ",
    "Exchange of Gases at Alveoli": "ਐਲਵਿਓਲਾਈ ਵਿੱਚ ਗੈਸਾਂ ਦਾ ਵਟਾਂਦਰਾ",
    "Breathing vs Respiration": "ਸਾਹ ਲੈਣਾ ਬਨਾਮ ਸਾਹ ਕਿਰਿਆ",
    "Transportation in Humans: Blood": "ਮਨੁੱਖਾਂ ਵਿੱਚ ਪਰਿਵਹਨ — ਲਹੂ",
    "The Human Heart": "ਮਨੁੱਖੀ ਦਿਲ",
    "Double Circulation": "ਦੋਹਰਾ ਪਰਿਸੰਚਰਣ",
    "Blood Vessels": "ਲਹੂ ਨਾੜੀਆਂ",
    "Lymph": "ਲਿੰਫ਼",
    "Transport in Plants: Xylem & Phloem": "ਪੌਦਿਆਂ ਵਿੱਚ ਪਰਿਵਹਨ — ਜ਼ਾਈਲਮ ਅਤੇ ਫਲੋਇਮ",
    "Transpiration Pull": "ਵਾਸ਼ਪ-ਉਤਸਰਜਨ ਖਿੱਚ",
    "Translocation": "ਸਥਾਨਾਂਤਰਣ",
    "Excretion in Humans": "ਮਨੁੱਖਾਂ ਵਿੱਚ ਨਿਕਾਸ",
    "The Nephron": "ਨੈਫ਼ਰਾਨ",
    "Dialysis: Artificial Kidney": "ਡਾਇਲਸਿਸ — ਬਣਾਉਟੀ ਗੁਰਦਾ",
    "Excretion in Plants": "ਪੌਦਿਆਂ ਵਿੱਚ ਨਿਕਾਸ",
    "Interactive: Sort the Life Process": "ਜੀਵਨ ਕਿਰਿਆ ਛਾਂਟੋ",
    "Interactive: Fix the Life Process Misconception": "ਗ਼ਲਤਫ਼ਹਿਮੀ ਠੀਕ ਕਰੋ",
    # ---- Chapter 7 ----
    "Post-Fertilization Changes": "ਨਿਸ਼ੇਚਨ ਤੋਂ ਬਾਅਦ ਬਦਲਾਅ",
    "Asexual vs. Sexual Reproduction": "ਅਲਿੰਗੀ ਬਨਾਮ ਲਿੰਗੀ ਪ੍ਰਜਨਨ",
    "Modes of Asexual Reproduction": "ਅਲਿੰਗੀ ਪ੍ਰਜਨਨ ਦੇ ਢੰਗ",
    "Why Regeneration isn't true Reproduction": "ਪੁਨਰਜਨਨ ਸਹੀ ਪ੍ਰਜਨਨ ਕਿਉਂ ਨਹੀਂ",
    "Vegetative Propagation": "ਕਾਇਕ ਪ੍ਰਜਨਨ",
    "Anatomy of a Flower & Fertilization": "ਫੁੱਲ ਦੀ ਬਣਤਰ ਅਤੇ ਨਿਸ਼ੇਚਨ",
    "Seed Germination Anatomy": "ਬੀਜ ਅੰਕੁਰਣ ਦੀ ਬਣਤਰ",
    "Changes at Puberty": "ਕਿਸ਼ੋਰ ਅਵਸਥਾ ਦੇ ਬਦਲਾਅ",
    "Male Reproductive System Anatomy": "ਨਰ ਜਣਨ ਪ੍ਰਣਾਲੀ ਦੀ ਬਣਤਰ",
    "Female Reproductive System & Placenta": "ਮਾਦਾ ਜਣਨ ਪ੍ਰਣਾਲੀ ਅਤੇ ਪਲੈਸੈਂਟਾ",
    "Methods of Contraception": "ਗਰਭ ਨਿਰੋਧ ਦੇ ਢੰਗ",
    # ---- Chapter 8 ----
    "Heredity & Variation": "ਅਨੁਵੰਸ਼ਿਕਤਾ ਅਤੇ ਵਿਭਿੰਨਤਾ",
    "Inherited vs. Acquired Traits": "ਅਨੁਵੰਸ਼ਿਕ ਬਨਾਮ ਉਪਾਰਜਿਤ ਲੱਛਣ",
    "Why Mendel Chose Pea Plants": "ਮੈਂਡਲ ਨੇ ਮਟਰ ਦੇ ਪੌਦੇ ਕਿਉਂ ਚੁਣੇ",
    "Mendel's Three Laws": "ਮੈਂਡਲ ਦੇ ਤਿੰਨ ਨਿਯਮ",
    "Alleles & Genetic Symbols": "ਐਲੀਲ ਅਤੇ ਅਨੁਵੰਸ਼ਿਕ ਚਿੰਨ੍ਹ",
    "3. Mendel's Monohybrid Cross (One Trait)": "ਇੱਕ-ਸੰਕਰ ਕਰਾਸ",
    "Punnett Square: P Cross (TT × tt)": "ਪਨੈੱਟ ਵਰਗ — P ਪੀੜ੍ਹੀ",
    "Punnett Square: F1 Self-Cross (Tt × Tt)": "ਪਨੈੱਟ ਵਰਗ — F1 ਸਵੈ-ਕਰਾਸ",
    "4. Mendel's Dihybrid Cross (Two Traits)": "ਦੋ-ਸੰਕਰ ਕਰਾਸ",
    "Sex Determination in Humans": "ਮਨੁੱਖਾਂ ਵਿੱਚ ਲਿੰਗ ਨਿਰਧਾਰਨ",
    "How Are Traits Expressed?": "ਲੱਛਣ ਕਿਵੇਂ ਪ੍ਰਗਟ ਹੁੰਦੇ ਹਨ?",
    "Human Inherited Traits": "ਮਨੁੱਖੀ ਅਨੁਵੰਸ਼ਿਕ ਲੱਛਣ",
    "Test Cross": "ਪਰਖ ਕਰਾਸ",
    "Match the Terms": "ਸ਼ਬਦ ਮਿਲਾਓ",
    "Spot the Error": "ਗਲਤੀ ਲੱਭੋ",
    "Dihybrid Cross: Building 9:3:3:1": "ਦੋ-ਸੰਕਰ ਕਰਾਸ — 9:3:3:1",
    # ---- Chapter 9 ----
    "Laws of Reflection": "ਪਰਾਵਰਤਨ ਦੇ ਨਿਯਮ",
    "Real vs. Virtual Images": "ਵਾਸਤਵਿਕ ਬਨਾਮ ਆਭਾਸੀ ਪ੍ਰਤੀਬਿੰਬ",
    "Plane Mirror: Image Characteristics": "ਸਮਤਲ ਦਰਪਣ — ਪ੍ਰਤੀਬਿੰਬ ਦੇ ਲੱਛਣ",
    "Spherical Mirrors: Key Terms": "ਗੋਲਾਕਾਰ ਦਰਪਣ — ਮੁੱਖ ਸ਼ਬਦ",
    "Rules for Mirror Ray Diagrams": "ਦਰਪਣ ਕਿਰਨ ਚਿੱਤਰ ਦੇ ਨਿਯਮ",
    "Concave Mirror: Image for Each Position": "ਅਵਤਲ ਦਰਪਣ — ਹਰ ਸਥਿਤੀ ਦਾ ਪ੍ਰਤੀਬਿੰਬ",
    "Convex Mirror: Uses": "ਉੱਤਲ ਦਰਪਣ ਦੀ ਵਰਤੋਂ",
    "New Cartesian Sign Convention": "ਨਵੀਂ ਕਾਰਤੀ ਚਿੰਨ੍ਹ ਪਰੰਪਰਾ",
    "The Mirror Formula": "ਦਰਪਣ ਸੂਤਰ",
    "Numerical: Mirror Formula": "ਸੰਖਿਆਤਮਕ — ਦਰਪਣ ਸੂਤਰ",
    "Rules for Lens Ray Diagrams": "ਲੈਂਜ਼ ਕਿਰਨ ਚਿੱਤਰ ਦੇ ਨਿਯਮ",
    "The Image Formation Cheat Sheet": "ਪ੍ਰਤੀਬਿੰਬ ਬਣਨ ਦੀ ਸਾਰਣੀ",
    "The Formula Builder (Lens Formula)": "ਸੂਤਰ ਬਣਾਓ — ਲੈਂਜ਼ ਸੂਤਰ",
    "Laws of Refraction (Snell's Law)": "ਅਪਵਰਤਨ ਦੇ ਨਿਯਮ — ਸਨੈੱਲ ਦਾ ਨਿਯਮ",
    "Refractive Index in Detail": "ਅਪਵਰਤਨ ਅੰਕ — ਵਿਸਥਾਰ ਨਾਲ",
    "Power of a Lens": "ਲੈਂਜ਼ ਦੀ ਸ਼ਕਤੀ",
    "Refractive Index Math Guide": "ਅਪਵਰਤਨ ਅੰਕ — ਗਣਿਤ",
    "Match: Optics Terms": "ਪ੍ਰਕਾਸ਼ ਵਿਗਿਆਨ ਦੇ ਸ਼ਬਦ ਮਿਲਾਓ",
    "Practice: Reflection & Refraction": "ਅਭਿਆਸ — ਪਰਾਵਰਤਨ ਅਤੇ ਅਪਵਰਤਨ",
    "Concave Mirror: Image Positions": "ਅਵਤਲ ਦਰਪਣ — ਪ੍ਰਤੀਬਿੰਬ ਸਥਿਤੀਆਂ",
    # ---- Chapter 10 ----
    "Structure of the Human Eye": "ਮਨੁੱਖੀ ਅੱਖ ਦੀ ਬਣਤਰ",
    "Parts of the Eye & Their Functions": "ਅੱਖ ਦੇ ਭਾਗ ਅਤੇ ਕੰਮ",
    "Retina: Rods and Cones": "ਰੈਟਿਨਾ — ਰਾਡ ਅਤੇ ਕੋਨ",
    "Persistence of Vision": "ਦ੍ਰਿਸ਼ਟੀ ਨਿਰੰਤਰਤਾ",
    "The Eye Works Like a Camera": "ਅੱਖ ਕੈਮਰੇ ਵਾਂਗ ਕੰਮ ਕਰਦੀ ਹੈ",
    "Defects of Vision: Overview": "ਦ੍ਰਿਸ਼ਟੀ ਦੋਸ਼ — ਸੰਖੇਪ",
    "Presbyopia & Cataract": "ਜਰਾ-ਦ੍ਰਿਸ਼ਟੀ ਅਤੇ ਮੋਤੀਆਬਿੰਦ",
    "Dispersion of Light through a Prism": "ਪ੍ਰਿਜ਼ਮ ਰਾਹੀਂ ਪ੍ਰਕਾਸ਼ ਦਾ ਵਿਖੇਪਣ",
    "Recombination of White Light": "ਚਿੱਟੇ ਪ੍ਰਕਾਸ਼ ਦਾ ਮੁੜ ਸੰਯੋਜਨ",
    "Atmospheric Refraction: Why Planets Don't Twinkle": "ਗ੍ਰਹਿ ਕਿਉਂ ਨਹੀਂ ਟਿਮਟਿਮਾਉਂਦੇ",
    "Why the Sky is Blue & Sunset is Red": "ਅਸਮਾਨ ਨੀਲਾ ਅਤੇ ਸੂਰਜ ਡੁੱਬਣ ਵੇਲੇ ਲਾਲ ਕਿਉਂ",
    "Why Danger Signals Are Red": "ਖ਼ਤਰੇ ਦੇ ਸੰਕੇਤ ਲਾਲ ਕਿਉਂ ਹੁੰਦੇ ਹਨ",
    "Match: Eye Parts & Function": "ਅੱਖ ਦੇ ਭਾਗ ਅਤੇ ਕੰਮ ਮਿਲਾਓ",
    "Practice: The Human Eye": "ਅਭਿਆਸ — ਮਨੁੱਖੀ ਅੱਖ",
    "Defects of Vision": "ਦ੍ਰਿਸ਼ਟੀ ਦੋਸ਼",
    # ---- Chapter 11 ----
    "Electric Current & Charge": "ਬਿਜਲਈ ਕਰੰਟ ਅਤੇ ਚਾਰਜ",
    "Potential Difference (Voltage)": "ਪੁਟੈਂਸ਼ਲ ਅੰਤਰ (ਵੋਲਟੇਜ)",
    "Ohm's Law & the V-I Graph": "ਓਹਮ ਦਾ ਨਿਯਮ ਅਤੇ V-I ਗ੍ਰਾਫ਼",
    "Ohm's Law: Statement": "ਓਹਮ ਦੇ ਨਿਯਮ ਦਾ ਕਥਨ",
    "Numerical: Using Ohm's Law": "ਸੰਖਿਆਤਮਕ — ਓਹਮ ਦਾ ਨਿਯਮ",
    "Factors Affecting Resistance": "ਪ੍ਰਤੀਰੋਧ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ ਵਾਲੇ ਕਾਰਕ",
    "Resistivity of Materials": "ਪਦਾਰਥਾਂ ਦੀ ਪ੍ਰਤੀਰੋਧਕਤਾ",
    "Series vs. Parallel Circuits": "ਲੜੀਵਾਰ ਬਨਾਮ ਸਮਾਂਤਰ ਪਰਿਪਥ",
    "Resistors in Series": "ਲੜੀਵਾਰ ਪ੍ਰਤੀਰੋਧਕ",
    "Resistors in Parallel": "ਸਮਾਂਤਰ ਪ੍ਰਤੀਰੋਧਕ",
    "Match: Series vs Parallel": "ਲੜੀਵਾਰ ਬਨਾਮ ਸਮਾਂਤਰ ਮਿਲਾਓ",
    "4. Joule's Law of Heating": "ਜੂਲ ਦਾ ਤਾਪਨ ਨਿਯਮ",
    "Electric Power": "ਬਿਜਲਈ ਸ਼ਕਤੀ",
    "Electrical Energy & the Commercial Unit": "ਬਿਜਲਈ ਊਰਜਾ ਅਤੇ ਵਪਾਰਕ ਇਕਾਈ",
    "Heating Effect: Applications": "ਤਾਪਨ ਪ੍ਰਭਾਵ ਦੀ ਵਰਤੋਂ",
    "Practice: Ohm's Law": "ਅਭਿਆਸ — ਓਹਮ ਦਾ ਨਿਯਮ",
    "Match: Quantity Unit": "ਰਾਸ਼ੀ ਅਤੇ ਇਕਾਈ ਮਿਲਾਓ",
    "Match: Quantity \u2194 Unit": "ਰਾਸ਼ੀ ਅਤੇ ਇਕਾਈ ਮਿਲਾਓ",
    "Numerical: Equivalent Resistance": "ਸੰਖਿਆਤਮਕ — ਤੁੱਲ ਪ੍ਰਤੀਰੋਧ",
    # ---- Chapter 12 ----
    "Magnetic Field & Field Lines": "ਚੁੰਬਕੀ ਖੇਤਰ ਅਤੇ ਖੇਤਰ ਰੇਖਾਵਾਂ",
    "Field Lines of a Bar Magnet": "ਛੜ ਚੁੰਬਕ ਦੀਆਂ ਖੇਤਰ ਰੇਖਾਵਾਂ",
    "Oersted's Experiment": "ਓਅਰਸਟੇਡ ਦਾ ਪ੍ਰਯੋਗ",
    "Field Patterns & Hand Rules": "ਖੇਤਰ ਨਮੂਨੇ ਅਤੇ ਹੱਥ ਨਿਯਮ",
    "Field due to a Straight Conductor": "ਸਿੱਧੇ ਚਾਲਕ ਕਾਰਨ ਖੇਤਰ",
    "Field due to a Circular Loop": "ਗੋਲ ਕੁੰਡਲੀ ਕਾਰਨ ਖੇਤਰ",
    "Solenoids & Electromagnets": "ਸੋਲੇਨਾਇਡ ਅਤੇ ਬਿਜਲਈ ਚੁੰਬਕ",
    "Force on a Conductor & Fleming's LHR": "ਚਾਲਕ ਉੱਤੇ ਬਲ ਅਤੇ ਫਲੈਮਿੰਗ ਦਾ ਖੱਬਾ ਹੱਥ ਨਿਯਮ",
    "Electromagnet vs Permanent Magnet": "ਬਿਜਲਈ ਚੁੰਬਕ ਬਨਾਮ ਸਥਾਈ ਚੁੰਬਕ",
    "Electric Motor": "ਬਿਜਲਈ ਮੋਟਰ",
    "Electromagnetic Induction": "ਬਿਜਲ-ਚੁੰਬਕੀ ਪ੍ਰੇਰਣ",
    "Fleming's Left-Hand vs Right-Hand Rule": "ਫਲੈਮਿੰਗ ਦਾ ਖੱਬਾ ਬਨਾਮ ਸੱਜਾ ਹੱਥ ਨਿਯਮ",
    "Electric Generator (Dynamo)": "ਬਿਜਲਈ ਜਨਰੇਟਰ (ਡਾਇਨਮੋ)",
    "AC vs DC: The Difference": "AC ਬਨਾਮ DC — ਫ਼ਰਕ",
    "Domestic Electric Circuit": "ਘਰੇਲੂ ਬਿਜਲਈ ਪਰਿਪਥ",
    "Earthing & the Fuse": "ਅਰਥਿੰਗ ਅਤੇ ਫ਼ਿਊਜ਼",
    "Match: Rules & Devices": "ਨਿਯਮ ਅਤੇ ਯੰਤਰ ਮਿਲਾਓ",
    "How an Electric Motor Rotates": "ਬਿਜਲਈ ਮੋਟਰ ਕਿਵੇਂ ਘੁੰਮਦੀ ਹੈ",
    "Practice: Magnetic Effects": "ਅਭਿਆਸ — ਚੁੰਬਕੀ ਪ੍ਰਭਾਵ",
    "The Magnetic Hand Rules": "ਚੁੰਬਕੀ ਹੱਥ ਨਿਯਮ",
    # ---- Chapter 13 ----
    "Components of an Ecosystem": "ਪਰਿਸਥਿਤਕ ਤੰਤਰ ਦੇ ਅੰਗ",
    "Producers, Consumers & Decomposers": "ਉਤਪਾਦਕ, ਉਪਭੋਗਤਾ ਅਤੇ ਅਪਘਟਕ",
    "Food Webs": "ਆਹਾਰ ਜਾਲ",
    "Trophic Levels & Ecological Pyramids": "ਪੋਸ਼ਣ ਪੱਧਰ ਅਤੇ ਪਰਿਸਥਿਤਕ ਪਿਰਾਮਿਡ",
    "Practice: Build a Food Chain": "ਅਭਿਆਸ — ਆਹਾਰ ਲੜੀ ਬਣਾਓ",
    "Energy Flow: The 10% Law": "ਊਰਜਾ ਪ੍ਰਵਾਹ — 10% ਨਿਯਮ",
    "Biological Magnification": "ਜੈਵ ਵਿਸ਼ਾਲੀਕਰਨ",
    "Biodegradable vs Non-biodegradable": "ਜੈਵ-ਨਿਮਨੀਕਰਨਯੋਗ ਬਨਾਮ ਅਜੈਵ-ਨਿਮਨੀਕਰਨਯੋਗ",
    "Sort the Waste": "ਕੂੜਾ ਛਾਂਟੋ",
    "How CFCs Destroy Ozone": "CFC ਓਜ਼ੋਨ ਨੂੰ ਕਿਵੇਂ ਨਸ਼ਟ ਕਰਦੇ ਹਨ",
    "Effects of Ozone Depletion": "ਓਜ਼ੋਨ ਘਟਣ ਦੇ ਪ੍ਰਭਾਵ",
    "The 10% Law: Energy Flow": "10% ਨਿਯਮ — ਊਰਜਾ ਪ੍ਰਵਾਹ",
    # ---- Chapter 14 ----
    "A Good Source of Energy": "ਚੰਗੇ ਊਰਜਾ ਸਰੋਤ ਦੇ ਗੁਣ",
    "Conventional vs Non-conventional Sources": "ਪਰੰਪਰਾਗਤ ਬਨਾਮ ਗ਼ੈਰ-ਪਰੰਪਰਾਗਤ ਸਰੋਤ",
    "Fossil Fuels": "ਪਥਰਾਟ ਬਾਲਣ",
    "Thermal Power Plant": "ਤਾਪ ਬਿਜਲੀ ਘਰ",
    "Limitations of Fossil Fuels": "ਪਥਰਾਟ ਬਾਲਣਾਂ ਦੀਆਂ ਸੀਮਾਵਾਂ",
    "Improving Fuel Efficiency": "ਬਾਲਣ ਕੁਸ਼ਲਤਾ ਵਧਾਉਣਾ",
    "Hydro Power Plants": "ਪਣ-ਬਿਜਲੀ ਘਰ",
    "Environmental Problems of Dams": "ਡੈਮਾਂ ਦੀਆਂ ਵਾਤਾਵਰਨ ਸਮੱਸਿਆਵਾਂ",
    "Biomass": "ਬਾਇਓਮਾਸ",
    "Biogas Plant": "ਬਾਇਓਗੈਸ ਪਲਾਂਟ",
    "Wind Energy": "ਪੌਣ ਊਰਜਾ",
    "Interactive: Renewable or Non-renewable?": "ਨਵਿਆਉਣਯੋਗ ਜਾਂ ਗ਼ੈਰ-ਨਵਿਆਉਣਯੋਗ?",
    "Solar Energy": "ਸੂਰਜੀ ਊਰਜਾ",
    "Solar Cooker": "ਸੂਰਜੀ ਕੁੱਕਰ",
    "Solar Cells": "ਸੂਰਜੀ ਸੈੱਲ",
    "Energy from the Sea": "ਸਮੁੰਦਰ ਤੋਂ ਊਰਜਾ",
    "Geothermal Energy": "ਭੂ-ਤਾਪੀ ਊਰਜਾ",
    "Nuclear Energy": "ਨਾਭਿਕੀ ਊਰਜਾ",
    "Hydrogen as a Fuel": "ਬਾਲਣ ਵਜੋਂ ਹਾਈਡਰੋਜਨ",
    "Comparing Energy Sources": "ਊਰਜਾ ਸਰੋਤਾਂ ਦੀ ਤੁਲਨਾ",
    "Local Decision Scenario": "ਸਥਾਨਕ ਫ਼ੈਸਲੇ ਦੀ ਸਥਿਤੀ",
    "Interactive: Match Source to Limitation": "ਸਰੋਤ ਨੂੰ ਸੀਮਾ ਨਾਲ ਮਿਲਾਓ",
    "Interactive: Choose the Best Energy Source": "ਸਭ ਤੋਂ ਵਧੀਆ ਊਰਜਾ ਸਰੋਤ ਚੁਣੋ",
    "Case Study: India's Energy Mix": "ਕੇਸ ਸਟੱਡੀ — ਭਾਰਤ ਦਾ ਊਰਜਾ ਮਿਸ਼ਰਣ",
    # ---- Chapter 16 ----
    "Why Manage Natural Resources?": "ਕੁਦਰਤੀ ਸਰੋਤਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਿਉਂ?",
    "Sustainable Development": "ਟਿਕਾਊ ਵਿਕਾਸ",
    "The 5 R's Exam Favourite": "ਪੰਜ R",
    "The 5 R's": "ਪੰਜ R",
    "Interactive: Sort the 5 R's": "ਪੰਜ R ਛਾਂਟੋ",
    "Forests and Wildlife": "ਜੰਗਲ ਅਤੇ ਜੰਗਲੀ ਜੀਵ",
    "Stakeholders in Forest Conservation": "ਜੰਗਲ ਸੰਭਾਲ ਦੇ ਹਿੱਸੇਦਾਰ",
    "Chipko Movement": "ਚਿਪਕੋ ਅੰਦੋਲਨ",
    "People's Participation": "ਲੋਕਾਂ ਦੀ ਭਾਗੀਦਾਰੀ",
    "Dams: Benefits": "ਡੈਮ — ਲਾਭ",
    "Dams: Problems": "ਡੈਮ — ਸਮੱਸਿਆਵਾਂ",
    "Water Harvesting": "ਜਲ ਸੰਭਾਲ",
    "Traditional Water Harvesting Systems": "ਰਵਾਇਤੀ ਜਲ ਸੰਭਾਲ ਪ੍ਰਣਾਲੀਆਂ",
    "Watershed Management": "ਜਲ-ਗ੍ਰਹਿਣ ਖੇਤਰ ਪ੍ਰਬੰਧਨ",
    "Interactive: Problem → Sustainable Solution": "ਸਮੱਸਿਆ ਤੋਂ ਟਿਕਾਊ ਹੱਲ",
    "Coal and Petroleum": "ਕੋਲਾ ਅਤੇ ਪੈਟਰੋਲੀਅਮ",
    "Why Conserve Coal & Petroleum?": "ਕੋਲਾ ਅਤੇ ਪੈਟਰੋਲੀਅਮ ਦੀ ਸੰਭਾਲ ਕਿਉਂ?",
    "Cleaner Choices": "ਸਾਫ਼-ਸੁਥਰੇ ਬਦਲ",
    "Energy, Economy and Equity": "ਊਰਜਾ, ਆਰਥਿਕਤਾ ਅਤੇ ਬਰਾਬਰੀ",
    "Biodiversity Loss": "ਜੈਵ ਵਿਭਿੰਨਤਾ ਦਾ ਨੁਕਸਾਨ",
    "Conservation Strategies": "ਸੰਭਾਲ ਦੀਆਂ ਰਣਨੀਤੀਆਂ",
    "Case Study: Local Resource Conflict": "ਕੇਸ ਸਟੱਡੀ — ਸਥਾਨਕ ਸਰੋਤ ਟਕਰਾਅ",
    "Compare: Environment vs Management": "ਤੁਲਨਾ — ਵਾਤਾਵਰਨ ਬਨਾਮ ਪ੍ਰਬੰਧਨ",
    "Interactive: Balance the Stakeholders": "ਹਿੱਸੇਦਾਰਾਂ ਵਿੱਚ ਸੰਤੁਲਨ ਬਣਾਓ",
}


def plain(fragment: str) -> str:
    """Heading markup -> the bare English title, badges and tags removed."""
    without_badge = BADGE.sub("", fragment)
    return htmllib.unescape(TAGS.sub("", without_badge)).replace("\u00a0", " ").strip()


def gloss_for(title: str) -> str | None:
    for pattern, pa in PATTERNS:
        if pattern.match(title):
            return pa
    return EXACT.get(title)


def apply(path: Path, check_only: bool) -> tuple[int, int, list[str]]:
    html = path.read_text(encoding="utf-8")
    added = 0
    missing: list[str] = []

    def repl(match: re.Match[str]) -> str:
        nonlocal added
        whole, inner = match.group(0), match.group(1)
        if GURMUKHI.search(inner):
            return whole
        # The chapter-divider slide already shows its Gurmukhi title as a
        # sibling of the heading; a second copy inside would be noise.
        start = match.start()
        if "chapter-divider" in html[max(0, start - 200):start]:
            return whole
        title = plain(inner)
        pa = gloss_for(title)
        if not pa:
            missing.append(title)
            return whole
        added += 1
        badge = BADGE.search(inner)
        span = f' <span class="punjabi">({pa})</span>'
        if badge:
            head = inner[: badge.start()].rstrip()
            return whole.replace(inner, head + span + badge.group(0))
        return whole.replace(inner, inner.rstrip() + span)

    out = H2.sub(repl, html)
    total = len(H2.findall(html))
    if added and not check_only:
        path.write_text(out, encoding="utf-8")
    return added, total, missing


def main() -> None:
    check_only = "--check" in sys.argv
    grand_added = 0
    grand_missing: list[str] = []
    for folder in sorted(p for p in ROOT.iterdir() if p.is_dir() and p.name.startswith("Chapter ")):
        deck = next(p for p in folder.iterdir() if p.suffix == ".html")
        added, total, missing = apply(deck, check_only)
        grand_added += added
        grand_missing.extend(missing)
        state = "would add" if check_only else "added"
        print(f"{folder.name}: {state} {added} gloss(es) of {total} headings" +
              (f", {len(missing)} still untranslated" if missing else ""))
        for m in missing:
            print(f"    untranslated: {m}")
    print(f"\nTotal {'would add' if check_only else 'added'}: {grand_added}")
    if grand_missing:
        print(f"Untranslated headings remaining: {len(grand_missing)}")


if __name__ == "__main__":
    main()
