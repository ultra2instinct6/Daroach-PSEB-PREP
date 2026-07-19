# -*- coding: utf-8 -*-
"""Bilingual (Punjabi-first + English) reading passages for all 16 PSEB decks.
Consumed by build_readings.py. Each chapter has exactly 3 readings.
Fields: (pa_title, en_title, pa_text, en_text)."""

# chapter key -> relative html path
FILES = {
    "1":  "Chapter 01 - Chemical Reactions/Chapter 01 - Chemical Reactions.html",
    "2":  "Chapter 02 - Acids, Bases and Salts/Chapter 02 - Acids, Bases and Salts.html",
    "3":  "Chapter 03 - Metals and Non-metals/Chapter 03 - Metals and Non-metals.html",
    "4":  "Chapter 04 - Carbon Compounds/Chapter 04 - Carbon Compounds.html",
    "5":  "Chapter 05 - Periodic Table/Chapter 05 - Periodic Table.html",
    "6cc": "Chapter 06 - Control and Coordination/Chapter 06 - Control and Coordination.html",
    "6lp": "Chapter 06 - Life Processes/Chapter 06 - Life Processes.html",
    "7":  "Chapter 07 - How do Organisms Reproduce/Chapter 07 - How do Organisms Reproduce.html",
    "8":  "Chapter 08 - Heredity/Chapter 08 - Heredity.html",
    "9":  "Chapter 09 - Light Reflection and Refraction/Chapter 09 - Light Reflection and Refraction.html",
    "10": "Chapter 10 - The Human Eye and Colourful World/Chapter 10 - The Human Eye and Colourful World.html",
    "11": "Chapter 11 - Electricity/Chapter 11 - Electricity.html",
    "12": "Chapter 12 - Magnetic Effects of Electric Current/Chapter 12 - Magnetic Effects of Electric Current.html",
    "13": "Chapter 13 - Our Environment/Chapter 13 - Our Environment.html",
    "14": "Chapter 14 - Sources of Energy/Chapter 14 - Sources of Energy.html",
    "16": "Chapter 16 - Sustainable Management of Natural Resources/Chapter 16 - Sustainable Management of Natural Resources.html",
}

READINGS = {}

READINGS["1"] = [
 ("ਪੁੰਜ ਦੀ ਸੰਭਾਲ ਦਾ ਨਿਯਮ", "The Law of Conservation of Mass",
  "18ਵੀਂ ਸਦੀ ਵਿੱਚ ਫ਼ਰਾਂਸੀਸੀ ਰਸਾਇਣ ਵਿਗਿਆਨੀ ਐਂਟੋਇਨ ਲੈਵੋਸ਼ੀਏ ਨੇ ਕਿਸੇ ਰਸਾਇਣਕ ਕਿਰਿਆ ਤੋਂ ਪਹਿਲਾਂ ਅਤੇ ਬਾਅਦ ਪਦਾਰਥਾਂ ਨੂੰ ਧਿਆਨ ਨਾਲ ਤੋਲਿਆ। ਉਸਨੇ ਵੇਖਿਆ ਕਿ ਬੰਦ ਬਰਤਨ ਦਾ ਕੁੱਲ ਪੁੰਜ ਕਦੇ ਨਹੀਂ ਬਦਲਦਾ। ਇਸੇ ਨੂੰ <span class=\"k\">ਪੁੰਜ ਦੀ ਸੰਭਾਲ ਦਾ ਨਿਯਮ</span> ਕਿਹਾ ਜਾਂਦਾ ਹੈ — ਰਸਾਇਣਕ ਕਿਰਿਆ ਵਿੱਚ ਪਦਾਰਥ ਨਾ ਬਣਦਾ ਹੈ ਨਾ ਨਸ਼ਟ ਹੁੰਦਾ ਹੈ। ਇਸੇ ਕਾਰਨ ਅਸੀਂ ਸਮੀਕਰਣਾਂ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਦੇ ਹਾਂ: ਹਰ ਪਰਮਾਣੂ ਜੋ ਅਭਿਕਾਰਕ ਵੱਲੋਂ ਆਉਂਦਾ ਹੈ, ਉਤਪਾਦ ਵਿੱਚ ਵੀ ਗਿਣਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।",
  "In the 18th century the French chemist Antoine Lavoisier carefully weighed substances before and after a reaction and found that the total mass of a sealed container never changed. This became the <span class=\"k\">Law of Conservation of Mass</span>: matter can neither be created nor destroyed in a chemical reaction. This is exactly why we balance equations \u2014 every atom that enters as a reactant must be accounted for in the products."),

 ("ਜੀਵਨ ਦੀ ਤਪਸ਼", "The Heat of Life",
  "ਅਸੀਂ ਸੋਚਦੇ ਹਾਂ ਕਿ ਰਸਾਇਣਕ ਕਿਰਿਆਵਾਂ ਸਿਰਫ਼ ਪ੍ਰਯੋਗਸ਼ਾਲਾ ਵਿੱਚ ਹੁੰਦੀਆਂ ਹਨ, ਪਰ ਧਰਤੀ ਦੀ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ <span class=\"k\">ਤਾਪ ਨਿਕਾਸੀ</span> ਕਿਰਿਆ ਇਸ ਵੇਲੇ ਤੁਹਾਡੇ ਸੈੱਲਾਂ ਵਿੱਚ ਹੋ ਰਹੀ ਹੈ। ਭੋਜਨ ਗਲੂਕੋਜ਼ ਵਿੱਚ ਟੁੱਟਦਾ ਹੈ ਅਤੇ ਸਾਹ ਰਾਹੀਂ ਆਈ ਆਕਸੀਜਨ ਇਸ ਨਾਲ ਕਿਰਿਆ ਕਰਦੀ ਹੈ। ਇਸ ਕਿਰਿਆ ਨੂੰ <span class=\"k\">ਸਾਹ ਕਿਰਿਆ</span> ਕਹਿੰਦੇ ਹਨ, ਜੋ ਹੌਲੀ-ਹੌਲੀ ਊਰਜਾ ਛੱਡਦੀ ਹੈ ਅਤੇ ਸਾਡੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ, ਦਿਮਾਗ਼ ਤੇ ਸਰੀਰ ਨੂੰ ਗਰਮ ਰੱਖਦੀ ਹੈ।",
  "We imagine reactions happen only in laboratories, yet the most important <span class=\"k\">exothermic</span> reaction on Earth is happening in your cells right now. Food is broken down into glucose, and the oxygen you breathe in reacts with it. This reaction, called <span class=\"k\">respiration</span>, slowly releases energy that powers your muscles and brain and keeps your body warm. Without this microscopic chemical fire, life would stop instantly."),

 ("ਖ਼ਾਮੋਸ਼ ਵਿਨਾਸ਼ਕਾਰੀ", "The Silent Destroyers",
  "ਆਕਸੀਕਰਨ ਹਮੇਸ਼ਾ ਭੜਕਦੀ ਅੱਗ ਨਹੀਂ ਹੁੰਦੀ; ਕਦੇ-ਕਦੇ ਇਹ ਹੌਲੀ ਤੇ ਖ਼ਾਮੋਸ਼ ਚੋਰ ਵਾਂਗ ਹੁੰਦੀ ਹੈ। ਜਦੋਂ ਲੋਹਾ ਹਵਾ ਦੀ ਨਮੀ ਦੇ ਸੰਪਰਕ ਵਿੱਚ ਆਉਂਦਾ ਹੈ ਤਾਂ ਭੂਰੇ ਰੰਗ ਦੀ ਪਰਤ ਬਣਦੀ ਹੈ — ਇਹ <span class=\"k\">ਜੰਗ</span> ਹੈ, ਜੋ ਪੁਲ, ਜਹਾਜ਼ ਤੇ ਗੱਡੀਆਂ ਨੂੰ ਖਾ ਜਾਂਦੀ ਹੈ। ਇਸੇ ਤਰ੍ਹਾਂ ਖੁੱਲ੍ਹੇ ਵਿੱਚ ਪਏ ਤੇਲ ਤੇ ਚਰਬੀ ਆਕਸੀਕਰਨ ਕਾਰਨ <span class=\"k\">ਬੇਹੇ (rancid)</span> ਹੋ ਜਾਂਦੇ ਹਨ। ਇਸ ਤੋਂ ਬਚਣ ਲਈ ਅਸੀਂ ਧਾਤਾਂ ਉੱਤੇ ਜ਼ਿੰਕ ਦੀ ਪਰਤ ਲਾਉਂਦੇ ਹਾਂ ਅਤੇ ਚਿਪਸ ਦੇ ਪੈਕਟ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਭਰਦੇ ਹਾਂ।",
  "Oxidation is not always a violent fire; sometimes it is a slow, silent thief. When iron meets moist air, a reddish-brown crust called <span class=\"k\">rust</span> forms and eats away bridges, ships and cars. In the same way, oils and fats left in the open oxidise and turn <span class=\"k\">rancid</span>, changing their smell and taste. To fight this, we coat metals with zinc and flush chip packets with nitrogen gas to keep oxygen away."),
]

READINGS["2"] = [
 ("ਲਿਟਮਸ ਦਾ ਜਾਦੂ", "The Magic of Litmus",
  "ਡਿਜੀਟਲ pH ਮੀਟਰ ਤੋਂ ਬਹੁਤ ਪਹਿਲਾਂ, ਪੁਰਾਣੇ ਰਸਾਇਣ ਵਿਗਿਆਨੀ ਕੁਦਰਤ ਉੱਤੇ ਭਰੋਸਾ ਕਰਦੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਵੇਖਿਆ ਕਿ ਕੁਝ ਕੁਦਰਤੀ ਰੰਗ ਵਾਤਾਵਰਨ ਅਨੁਸਾਰ ਰੰਗ ਬਦਲਦੇ ਹਨ। ਸਭ ਤੋਂ ਮਸ਼ਹੂਰ ਹੈ <span class=\"k\">ਲਿਟਮਸ</span>, ਜੋ ਲਾਈਕੇਨ ਤੋਂ ਮਿਲਦਾ ਜਾਮਣੀ ਰੰਗ ਹੈ। ਤੇਜ਼ਾਬੀ ਘੋਲ ਵਿੱਚ ਇਹ ਲਾਲ ਹੋ ਜਾਂਦਾ ਹੈ ਤੇ ਖਾਰੀ ਘੋਲ ਵਿੱਚ ਨੀਲਾ। ਇਸ ਸਧਾਰਨ <span class=\"k\">ਸੂਚਕ</span> ਨੇ ਵਿਗਿਆਨੀਆਂ ਨੂੰ ਸਿਰਫ਼ ਰੰਗ ਵੇਖ ਕੇ ਤਰਲ ਦੀ ਪ੍ਰਕਿਰਤੀ ਪਛਾਣਨ ਦੀ ਸ਼ਕਤੀ ਦਿੱਤੀ।",
  "Long before digital pH meters, early chemists relied on nature. They found that certain natural dyes change colour with their surroundings. The most famous is <span class=\"k\">litmus</span>, a purple dye from lichens. In acid it turns red, and in a base it turns blue. This simple <span class=\"k\">indicator</span> gave scientists the power to 'see' whether a liquid was acidic or basic just by watching the colour shift."),

 ("ਤੇਜ਼ਾਬੀ ਵਰਖਾ ਦਾ ਸੰਕਟ", "The Acid Rain Crisis",
  "ਜਦੋਂ ਕੋਲਾ ਤੇ ਪੈਟਰੋਲੀਅਮ ਵਰਗੇ ਬਾਲਣ ਫ਼ੈਕਟਰੀਆਂ ਤੇ ਵਾਹਨਾਂ ਵਿੱਚ ਬਲਦੇ ਹਨ, ਤਾਂ ਸਲਫ਼ਰ ਡਾਈਆਕਸਾਈਡ ਤੇ ਨਾਈਟ੍ਰੋਜਨ ਦੇ ਆਕਸਾਈਡ ਹਵਾ ਵਿੱਚ ਛੱਡੇ ਜਾਂਦੇ ਹਨ। ਇਹ ਗੈਸਾਂ ਹਵਾ ਦੀ ਨਮੀ ਨਾਲ ਮਿਲ ਕੇ ਪਤਲੇ ਸਲਫ਼ਿਊਰਿਕ ਤੇ ਨਾਈਟ੍ਰਿਕ ਤੇਜ਼ਾਬ ਬਣਾਉਂਦੀਆਂ ਹਨ। ਜਦੋਂ ਇਹ ਧਰਤੀ ਉੱਤੇ ਡਿੱਗਦੀ ਹੈ, ਇਸ ਨੂੰ <span class=\"k\">ਤੇਜ਼ਾਬੀ ਵਰਖਾ</span> ਕਹਿੰਦੇ ਹਨ। ਆਮ ਵਰਖਾ ਦਾ pH ਲਗਭਗ 5.6 ਹੁੰਦਾ ਹੈ, ਪਰ ਤੇਜ਼ਾਬੀ ਵਰਖਾ ਇਸ ਤੋਂ ਬਹੁਤ ਹੇਠਾਂ ਚਲੀ ਜਾਂਦੀ ਹੈ ਤੇ ਨਦੀਆਂ-ਝੀਲਾਂ ਦੇ ਜਲ-ਜੀਵਾਂ ਲਈ ਖ਼ਤਰਾ ਬਣਦੀ ਹੈ।",
  "When fuels like coal and petroleum burn in factories and vehicles, they release sulfur dioxide and nitrogen oxides. These gases mix with moisture in the air to form dilute sulfuric and nitric acids. When this falls to Earth it is called <span class=\"k\">acid rain</span>. Normal rain has a pH near 5.6, but acid rain drops far lower, making lakes and rivers deadly for sensitive fish and frogs."),

 ("ਬੇਕਿੰਗ ਸੋਡਾ ਜਵਾਲਾਮੁਖੀ", "The Baking Soda Volcano",
  "ਜੇ ਤੁਸੀਂ ਕਦੇ ਸਿਰਕਾ ਤੇ ਬੇਕਿੰਗ ਸੋਡਾ ਮਿਲਾ ਕੇ ਨਕਲੀ ਜਵਾਲਾਮੁਖੀ ਬਣਾਇਆ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਇੱਕ <span class=\"k\">ਤੇਜ਼ਾਬ-ਕਾਰਬੋਨੇਟ</span> ਕਿਰਿਆ ਵੇਖੀ ਹੈ। ਸਿਰਕੇ ਵਿੱਚ ਈਥੇਨੋਇਕ ਤੇਜ਼ਾਬ ਤੇ ਬੇਕਿੰਗ ਸੋਡਾ ਸੋਡੀਅਮ ਹਾਈਡ੍ਰੋਜਨਕਾਰਬੋਨੇਟ ਹੁੰਦਾ ਹੈ। ਮਿਲਣ ਉੱਤੇ ਪਾਣੀ ਤੇ ਬਹੁਤ ਸਾਰੀ <span class=\"k\">ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ</span> ਗੈਸ ਨਿਕਲਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਬੁਲਬੁਲੇ ਬਣਦੇ ਹਨ। ਬੇਕਰ ਇਸੇ ਸਿਧਾਂਤ ਨਾਲ ਕੇਕ ਬਣਾਉਂਦੇ ਹਨ — ਗੈਸ ਦੇ ਬੁਲਬੁਲੇ ਆਟੇ ਵਿੱਚ ਫਸ ਕੇ ਇਸ ਨੂੰ ਫੁੱਲਾ ਤੇ ਹਲਕਾ ਬਣਾ ਦਿੰਦੇ ਹਨ।",
  "If you have ever mixed vinegar and baking soda to make a fake volcano, you have seen an <span class=\"k\">acid\u2013carbonate</span> reaction. Vinegar contains ethanoic acid and baking soda is sodium hydrogencarbonate. When they meet they release water and a surge of <span class=\"k\">carbon dioxide</span> gas, causing the bubbling. Bakers use the same idea for cakes: trapped gas bubbles make the dough rise and turn light and fluffy."),
]

READINGS["3"] = [
 ("ਐਲੂਮੀਨੀਅਮ ਦੀ ਢਾਲ", "The Anodising Shield",
  "ਐਲੂਮੀਨੀਅਮ ਇੱਕ ਦਿਲਚਸਪ ਧਾਤ ਹੈ। ਰਸਾਇਣਕ ਤੌਰ 'ਤੇ ਇਹ ਬਹੁਤ ਕਿਰਿਆਸ਼ੀਲ ਹੈ ਤੇ ਜਲਦੀ ਖ਼ਰਾਬ ਹੋਣੀ ਚਾਹੀਦੀ, ਪਰ ਇਸ ਕੋਲ ਗੁਪਤ ਹਥਿਆਰ ਹੈ। ਹਵਾ ਦੇ ਸੰਪਰਕ ਵਿੱਚ ਆਉਂਦੇ ਹੀ ਇਸ ਉੱਤੇ <span class=\"k\">ਐਲੂਮੀਨੀਅਮ ਆਕਸਾਈਡ</span> ਦੀ ਪਾਰਦਰਸ਼ੀ, ਪਤਲੀ ਪਰਤ ਬਣ ਜਾਂਦੀ ਹੈ। ਲੋਹੇ ਦੀ ਜੰਗ ਵਾਂਗ ਇਹ ਝੜਦੀ ਨਹੀਂ, ਸਗੋਂ ਸਤ੍ਹਾ ਨਾਲ ਚਿਪਕੀ ਰਹਿ ਕੇ ਹੋਰ ਆਕਸੀਜਨ ਨੂੰ ਰੋਕਦੀ ਹੈ। ਇੰਜੀਨੀਅਰ ਬਿਜਲੀ ਨਾਲ ਇਸ ਪਰਤ ਨੂੰ ਹੋਰ ਮੋਟਾ ਬਣਾਉਂਦੇ ਹਨ — ਇਸ ਨੂੰ <span class=\"k\">ਐਨੋਡਾਈਜ਼ਿੰਗ</span> ਕਹਿੰਦੇ ਹਨ।",
  "Aluminium is fascinating. By logic it is very reactive and should corrode fast, but it has a secret weapon. The moment it meets air, a thin, transparent skin of <span class=\"k\">aluminium oxide</span> forms. Unlike iron rust, this skin does not flake off; it sticks tightly and blocks further oxygen. Engineers deliberately thicken this oxide layer using electricity, a process called <span class=\"k\">anodising</span>, making aluminium nearly weatherproof."),

 ("ਥਰਮਿਟ ਵੈਲਡਿੰਗ", "The Thermit Welding Process",
  "ਥਰਮਿਟ ਕਿਰਿਆ ਸਭ ਤੋਂ ਸ਼ਾਨਦਾਰ <span class=\"k\">ਵਿਸਥਾਪਨ</span> ਕਿਰਿਆਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ। ਜਦੋਂ ਆਇਰਨ(III) ਆਕਸਾਈਡ ਤੇ ਐਲੂਮੀਨੀਅਮ ਪਾਊਡਰ ਦੇ ਮਿਸ਼ਰਣ ਨੂੰ ਜਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਵਧੇਰੇ ਕਿਰਿਆਸ਼ੀਲ ਐਲੂਮੀਨੀਅਮ ਲੋਹੇ ਨੂੰ ਉਸ ਦੇ ਆਕਸਾਈਡ ਤੋਂ ਹਟਾ ਦਿੰਦਾ ਹੈ। ਇਹ ਕਿਰਿਆ ਇੰਨੀ <span class=\"k\">ਤਾਪ ਨਿਕਾਸੀ</span> ਹੈ ਕਿ ਪੈਦਾ ਹੋਇਆ ਲੋਹਾ ਪਿਘਲ ਕੇ ਤਰਲ ਬਣ ਜਾਂਦਾ ਹੈ। ਇੰਜੀਨੀਅਰ ਇਸੇ ਪਿਘਲੇ ਲੋਹੇ ਨੂੰ ਟੁੱਟੀਆਂ ਰੇਲ ਪਟੜੀਆਂ ਦੇ ਜੋੜਾਂ ਵਿੱਚ ਵਹਾ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜੋੜਦੇ ਹਨ।",
  "The thermit reaction is one of the most spectacular <span class=\"k\">displacement</span> reactions. When iron(III) oxide and aluminium powder are ignited, the more reactive aluminium displaces iron from its oxide. The reaction is so <span class=\"k\">exothermic</span> that the iron produced is molten. Engineers pour this liquid iron into gaps in broken railway tracks to weld the heavy steel rails together seamlessly."),

 ("ਕਾਂਸੀ ਯੁੱਗ ਦੀ ਸਵੇਰ", "The Dawn of the Bronze Age",
  "ਸ਼ੁੱਧ ਤਾਂਬਾ ਸੋਹਣਾ ਪਰ ਹਥਿਆਰ ਬਣਾਉਣ ਲਈ ਬਹੁਤ ਨਰਮ ਹੁੰਦਾ ਹੈ। ਹਜ਼ਾਰਾਂ ਸਾਲ ਪਹਿਲਾਂ ਧਾਤੂ-ਕਾਰੀਗਰਾਂ ਨੇ ਇੱਕ ਯੁੱਗ-ਪਲਟ ਖੋਜ ਕੀਤੀ: ਤਾਂਬੇ ਵਿੱਚ ਥੋੜ੍ਹਾ ਟੀਨ ਮਿਲਾ ਕੇ ਉਨ੍ਹਾਂ ਨੇ ਇੱਕ ਨਵਾਂ ਪਦਾਰਥ ਬਣਾਇਆ। ਦੋ ਧਾਤਾਂ ਦੇ ਇਸ ਮਿਸ਼ਰਣ ਨੂੰ <span class=\"k\">ਮਿਸ਼ਰਧਾਤ (alloy)</span> ਕਹਿੰਦੇ ਹਨ ਤੇ ਇਹ ਦੋਵਾਂ ਤੋਂ ਵਧੇਰੇ ਸਖ਼ਤ ਤੇ ਟਿਕਾਊ ਸੀ। ਇਸ ਨੂੰ <span class=\"k\">ਕਾਂਸੀ (Bronze)</span> ਕਿਹਾ ਗਿਆ, ਜਿਸ ਨੇ ਮਜ਼ਬੂਤ ਹਲ ਤੇ ਤਿੱਖੀਆਂ ਤਲਵਾਰਾਂ ਬਣਾ ਕੇ ਸੱਭਿਅਤਾਵਾਂ ਬਦਲ ਦਿੱਤੀਆਂ।",
  "Pure copper is beautiful but far too soft for strong tools. Thousands of years ago metalworkers made a world-changing discovery: melting copper with a little tin created a new material. This mixture of metals, called an <span class=\"k\">alloy</span>, was harder and more durable than either parent metal. They named it <span class=\"k\">Bronze</span>, and it built stronger ploughs, sharper swords and mighty empires \u2014 the Bronze Age."),
]

READINGS["4"] = [
 ("ਹੀਰਾ ਅਤੇ ਪੈਨਸਿਲ", "The Diamond and the Pencil",
  "ਕਾਰਬਨ ਭੇਸ ਬਦਲਣ ਦਾ ਮਾਹਿਰ ਹੈ। ਇਹ ਇੱਕੋ-ਇੱਕ ਤੱਤ ਹੈ ਜੋ ਸਿਰਫ਼ ਪਰਮਾਣੂਆਂ ਦੇ ਜੁੜਨ ਦਾ ਢੰਗ ਬਦਲ ਕੇ ਬਿਲਕੁਲ ਵਿਪਰੀਤ ਗੁਣ ਵਾਲੇ ਪਦਾਰਥ ਬਣਾ ਸਕਦਾ ਹੈ। ਧਰਤੀ ਦੇ ਅੰਦਰ ਭਾਰੀ ਦਬਾਅ ਹੇਠ ਕਾਰਬਨ ਪਰਮਾਣੂ ਤ੍ਰੈ-ਪਾਸੀ ਜਾਲ ਵਿੱਚ ਬੱਝ ਕੇ <span class=\"k\">ਹੀਰਾ</span> ਬਣਾਉਂਦੇ ਹਨ — ਸਭ ਤੋਂ ਸਖ਼ਤ ਕੁਦਰਤੀ ਪਦਾਰਥ। ਉਹੀ ਪਰਮਾਣੂ ਸਮਤਲ ਪਰਤਾਂ ਵਿੱਚ ਸਜ ਜਾਣ ਤਾਂ <span class=\"k\">ਗ੍ਰੇਫ਼ਾਈਟ</span> ਬਣਦਾ ਹੈ, ਜੋ ਇੰਨਾ ਨਰਮ ਹੈ ਕਿ ਪੈਨਸਿਲ ਦੀ 'ਲੈੱਡ' ਬਣ ਜਾਂਦਾ ਹੈ। ਇੱਕੋ ਬਿਲਡਿੰਗ-ਬਲਾਕ ਤੋਂ ਦੋ ਵੱਖਰੀਆਂ ਦੁਨੀਆਂ।",
  "Carbon is the master of disguise \u2014 the only element that forms materials with opposite properties just by changing how its atoms join. Deep in the Earth, under huge pressure, carbon atoms lock into a rigid 3-D grid to form <span class=\"k\">diamond</span>, the hardest natural substance. The same atoms arranged in flat sliding sheets form <span class=\"k\">graphite</span>, so soft we use it as pencil 'lead'. Two different worlds from one building block."),

 ("ਸੱਪ ਅਤੇ ਚੱਕਰ", "The Serpent and the Ring",
  "1860 ਦੇ ਦਹਾਕੇ ਵਿੱਚ ਵਿਗਿਆਨੀ ਬੈਂਜ਼ੀਨ ਦੀ ਬਣਤਰ ਤੋਂ ਹੈਰਾਨ ਸਨ। ਇਸ ਦਾ ਫ਼ਾਰਮੂਲਾ C6H6 ਸੀ, ਪਰ ਛੇ ਕਾਰਬਨ ਤੇ ਛੇ ਹਾਈਡ੍ਰੋਜਨ ਪਰਮਾਣੂ ਸਿੱਧੀ ਲੜੀ ਵਿੱਚ ਕਿਵੇਂ ਜੁੜਦੇ, ਇਹ ਸਮਝ ਨਹੀਂ ਆ ਰਿਹਾ ਸੀ। ਕਥਾ ਹੈ ਕਿ ਜਰਮਨ ਰਸਾਇਣ ਵਿਗਿਆਨੀ <span class=\"k\">ਕੈਕੂਲੇ</span> ਨੇ ਸੁਪਨੇ ਵਿੱਚ ਇੱਕ ਸੱਪ ਨੂੰ ਆਪਣੀ ਪੂਛ ਫੜ ਕੇ ਚੱਕਰ ਬਣਾਉਂਦੇ ਵੇਖਿਆ। ਜਾਗਦੇ ਹੀ ਉਸ ਨੂੰ ਸਮਝ ਆਈ ਕਿ ਬੈਂਜ਼ੀਨ ਦੇ ਛੇ ਕਾਰਬਨ ਪਰਮਾਣੂ ਬੰਦ <span class=\"k\">ਛੇ-ਭੁਜੀ ਚੱਕਰ</span> ਵਿੱਚ ਹਨ। ਇਸ ਖੋਜ ਨੇ ਏਰੋਮੈਟਿਕ ਰਸਾਇਣ ਵਿਗਿਆਨ ਖੋਲ੍ਹ ਦਿੱਤਾ।",
  "In the 1860s scientists were baffled by benzene. Its formula was C6H6, but they could not see how six carbons and six hydrogens joined in a straight chain. Legend says the German chemist <span class=\"k\">Kekul\u00e9</span> dreamt of a snake grabbing its own tail to form a circle. He woke realising benzene's six carbons form a closed <span class=\"k\">hexagonal ring</span> \u2014 a discovery that unlocked the whole field of aromatic chemistry."),

 ("ਸਾਬਣ ਦੀ ਰੱਸਾਕਸ਼ੀ", "The Soap Tug-of-War",
  "ਗੰਦੀ ਕਮੀਜ਼ ਧੋਣਾ ਇੱਕ ਰੌਚਕ ਰੱਸਾਕਸ਼ੀ ਹੈ। ਸਾਬਣ ਦੇ ਅਣੂ ਲੰਬੀਆਂ ਲੜੀਆਂ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਦੋ ਵੱਖਰੇ ਸਿਰੇ ਹਨ। ਇੱਕ <span class=\"k\">ਜਲ-ਪਿਆਰਾ (hydrophilic)</span> ਸਿਰ ਪਾਣੀ ਨੂੰ ਪਸੰਦ ਕਰਦਾ ਹੈ, ਦੂਜੀ <span class=\"k\">ਜਲ-ਵਿਰੋਧੀ (hydrophobic)</span> ਪੂਛ ਤੇਲ ਤੇ ਮੈਲ ਵੱਲ ਖਿੱਚੀ ਜਾਂਦੀ ਹੈ। ਪਾਣੀ ਵਿੱਚ ਪੂਛਾਂ ਮੈਲ ਵਿੱਚ ਧੱਸ ਜਾਂਦੀਆਂ ਹਨ ਤੇ ਸਿਰ ਬਾਹਰ ਪਾਣੀ ਵੱਲ ਰਹਿੰਦੇ ਹਨ, ਇੰਜ ਗੋਲ ਬਣਤਰ <span class=\"k\">ਮਿਸੈੱਲ</span> ਬਣਦੀ ਹੈ। ਮਸ਼ੀਨ ਦੇ ਹਿਲਾਉਣ ਨਾਲ ਮੈਲ ਕੱਪੜੇ ਤੋਂ ਟੁੱਟ ਕੇ ਪਾਣੀ ਵਿੱਚ ਵਹਿ ਜਾਂਦੀ ਹੈ।",
  "Washing a greasy shirt is a chemical tug-of-war. Soap molecules are long chains with two ends. The <span class=\"k\">hydrophilic</span> head loves water, while the <span class=\"k\">hydrophobic</span> tail is pulled toward oil and dirt. In water, the tails bury into the grease while the heads face outward, forming a sphere called a <span class=\"k\">micelle</span>. As the machine agitates, the dirt is torn from the fabric and washed away."),
]

READINGS["5"] = [
 ("ਮੈਂਡਲੀਵ ਦਾ ਦਲੇਰ ਦਾਅ", "Mendeleev's Bold Gamble",
  "ਦਿਮਿਤ੍ਰੀ ਮੈਂਡਲੀਵ ਨੂੰ ਸਿਰਫ਼ ਇਸ ਲਈ ਹੀ ਨਹੀਂ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਕਿ ਉਸ ਨੇ ਸਾਰਣੀ ਵਿੱਚ ਕੀ ਰੱਖਿਆ, ਸਗੋਂ ਇਸ ਲਈ ਵੀ ਕਿ ਉਸ ਨੇ ਕੀ ਖ਼ਾਲੀ ਛੱਡਿਆ। ਤੱਤਾਂ ਨੂੰ ਪਰਮਾਣੂ ਪੁੰਜ ਅਨੁਸਾਰ ਸਜਾਉਂਦਿਆਂ ਉਸ ਨੇ ਗ਼ਲਤ ਸਮੂਹ ਵਿੱਚ ਧੱਕਣ ਦੀ ਬਜਾਏ <span class=\"k\">ਖ਼ਾਲੀ ਥਾਵਾਂ</span> ਛੱਡੀਆਂ ਤੇ ਭਵਿੱਖਬਾਣੀ ਕੀਤੀ ਕਿ ਇਹ ਅਜੇ ਅਣਖੋਜੇ ਤੱਤਾਂ ਦੀਆਂ ਹਨ। ਉਸ ਨੇ ਐਲੂਮੀਨੀਅਮ ਹੇਠ ਇੱਕ ਥਾਂ ਨੂੰ 'ਏਕਾ-ਐਲੂਮੀਨੀਅਮ' ਕਿਹਾ। ਬਾਅਦ ਵਿੱਚ ਲੱਭੇ <span class=\"k\">ਗੈਲੀਅਮ</span> ਦੇ ਗੁਣ ਉਸ ਦੀ ਭਵਿੱਖਬਾਣੀ ਨਾਲ ਮੇਲ ਖਾ ਗਏ।",
  "Dmitri Mendeleev is remembered not only for what he put in his table but for what he left out. Arranging elements by atomic mass, he refused to force them into wrong groups and instead left <span class=\"k\">gaps</span>, predicting undiscovered elements. He named one space under aluminium 'Eka-Aluminium'. Years later the metal <span class=\"k\">gallium</span> was found, and its properties matched his prediction almost perfectly."),

 ("ਮੋਜ਼ਲੇ ਦੀ ਐਕਸ-ਰੇ ਕ੍ਰਾਂਤੀ", "Moseley's X-Ray Revolution",
  "1913 ਵਿੱਚ 25 ਸਾਲਾਂ ਦੇ ਭੌਤਿਕ ਵਿਗਿਆਨੀ ਹੈਨਰੀ ਮੋਜ਼ਲੇ ਨੇ ਧਾਤੂ ਨਿਸ਼ਾਨਿਆਂ ਉੱਤੇ ਇਲੈਕਟ੍ਰੋਨ ਸੁੱਟ ਕੇ ਨਿਕਲੀਆਂ ਐਕਸ-ਰੇਆਂ ਮਾਪੀਆਂ। ਉਸ ਨੇ ਵੇਖਿਆ ਕਿ ਐਕਸ-ਰੇ ਦੀ ਆਵਿਰਤੀ ਨਿਊਕਲੀਅਸ ਦੇ ਧਨ ਚਾਰਜ ਨਾਲ ਜੁੜੀ ਹੈ — ਜਿਸ ਨੂੰ ਅਸੀਂ <span class=\"k\">ਪਰਮਾਣੂ ਸੰਖਿਆ</span> ਕਹਿੰਦੇ ਹਾਂ। ਇਸ ਨੇ ਸਾਬਤ ਕੀਤਾ ਕਿ ਤੱਤਾਂ ਨੂੰ ਪਰਮਾਣੂ ਪੁੰਜ ਨਹੀਂ, ਸਗੋਂ <span class=\"k\">ਪਰਮਾਣੂ ਸੰਖਿਆ</span> ਅਨੁਸਾਰ ਸਜਾਉਣਾ ਚਾਹੀਦਾ ਹੈ। ਇਸੇ ਨੇ ਮੈਂਡਲੀਵ ਦੀ ਸਾਰਣੀ ਦੀਆਂ ਖ਼ਾਮੀਆਂ ਦੂਰ ਕੀਤੀਆਂ।",
  "In 1913 the 25-year-old physicist Henry Moseley fired electrons at metal targets and measured the X-rays they emitted. He found the X-ray frequency was tied to the positive charge in the nucleus \u2014 a value we call the <span class=\"k\">atomic number</span>. This proved elements should be ordered by atomic number, not atomic mass, and fixed the flaws in Mendeleev's table."),

 ("ਟੇਢੀ-ਮੇਢੀ ਲਕੀਰ", "The Zig-Zag Line",
  "ਆਧੁਨਿਕ ਆਵਰਤ ਸਾਰਣੀ ਦੇ ਸੱਜੇ ਪਾਸੇ ਇੱਕ ਪੌੜੀ ਵਰਗੀ <span class=\"k\">ਟੇਢੀ ਲਕੀਰ</span> ਖਿੱਚੀ ਹੁੰਦੀ ਹੈ, ਜੋ ਖੱਬੇ ਦੀਆਂ <span class=\"k\">ਧਾਤਾਂ</span> ਤੇ ਸੱਜੇ ਦੀਆਂ <span class=\"k\">ਅਧਾਤਾਂ</span> ਵਿਚਕਾਰ ਸਰਹੱਦ ਹੈ। ਪਰ ਇਸ ਸਰਹੱਦ ਉੱਤੇ ਬੈਠੇ ਤੱਤ — ਸਿਲੀਕਾਨ, ਜਰਮੇਨੀਅਮ, ਆਰਸੈਨਿਕ — ਕੋਈ ਪੱਖ ਨਹੀਂ ਚੁਣਦੇ। ਇਨ੍ਹਾਂ ਨੂੰ <span class=\"k\">ਉਪ-ਧਾਤਾਂ (metalloids)</span> ਕਹਿੰਦੇ ਹਨ। ਇਹ ਧਾਤਾਂ ਵਾਂਗ ਚਮਕਦੇ ਪਰ ਅਧਾਤਾਂ ਵਾਂਗ ਭੁਰਭੁਰੇ ਹਨ ਤੇ 'ਅਰਧ-ਚਾਲਕ' ਹੋਣ ਕਾਰਨ ਕੰਪਿਊਟਰ ਚਿੱਪ ਦਾ ਆਧਾਰ ਬਣਦੇ ਹਨ।",
  "On the right side of the Modern Periodic Table runs a staircase-like <span class=\"k\">zig-zag line</span>, the border between <span class=\"k\">metals</span> on the left and <span class=\"k\">non-metals</span> on the right. Elements sitting on the border \u2014 silicon, germanium, arsenic \u2014 refuse to pick a side. Called <span class=\"k\">metalloids</span>, they shine like metals but are brittle like non-metals, and being semiconductors they form the basis of every computer chip."),
]

READINGS["6cc"] = [
 ("ਪ੍ਰਤੀਕਿਰਿਆ ਕਿਉਂ?", "Why Respond?",
  "ਹਰ ਜੀਵ — ਭਾਵੇਂ ਸੂਰਜਮੁਖੀ ਸੂਰਜ ਵੱਲ ਮੁੜੇ ਜਾਂ ਮਨੁੱਖ ਗਰਮ ਚੀਜ਼ ਤੋਂ ਹੱਥ ਖਿੱਚੇ — ਆਪਣੇ ਵਾਤਾਵਰਨ ਦੇ ਬਦਲਾਵਾਂ ਨੂੰ ਮਹਿਸੂਸ ਕਰ ਸਕਦਾ ਹੈ। ਇਨ੍ਹਾਂ ਬਦਲਾਵਾਂ ਨੂੰ <span class=\"k\">ਉਦੀਪਨ (stimuli)</span> ਕਹਿੰਦੇ ਹਨ। ਜੀਵਿਤ ਰਹਿਣ ਲਈ ਬਹੁ-ਸੈੱਲੀ ਜੀਵ ਦੇ ਲੱਖਾਂ ਸੈੱਲਾਂ ਨੂੰ ਮਿਲ ਕੇ ਸਹੀ ਪ੍ਰਤੀਕਿਰਿਆ ਦੇਣੀ ਪੈਂਦੀ ਹੈ। ਵੱਖ-ਵੱਖ ਅੰਗਾਂ ਦੇ ਇਸ ਤਾਲਮੇਲ ਨੂੰ ਹੀ <span class=\"k\">ਨਿਯੰਤਰਣ ਅਤੇ ਤਾਲਮੇਲ</span> ਕਹਿੰਦੇ ਹਨ।",
  "Every living thing \u2014 whether a sunflower turning to the sun or a human pulling a hand off a hot surface \u2014 must sense changes in its surroundings. These changes are called <span class=\"k\">stimuli</span>. To survive, the millions of cells in a multicellular body must work together to produce the correct response. This synchronised working of the organs is what we call <span class=\"k\">control and coordination</span>."),

 ("ਨਸਾਂ ਦੀ ਗਤੀ-ਸੀਮਾ", "The Speed Limit of Nerves",
  "ਨਾੜੀ ਊਤਕ ਬਹੁਤ ਤੇਜ਼ ਪ੍ਰਤੀਕਿਰਿਆ ਦਿੰਦਾ ਹੈ, ਪਰ ਇਸ ਦੀਆਂ ਹੱਦਾਂ ਹਨ। ਪਹਿਲਾ, ਬਿਜਲਈ ਸੰਵੇਗ ਸਿਰਫ਼ ਉਨ੍ਹਾਂ ਸੈੱਲਾਂ ਤੱਕ ਪਹੁੰਚਦਾ ਹੈ ਜੋ ਨਾੜੀ-ਤੰਤੂਆਂ ਨਾਲ ਜੁੜੇ ਹੋਣ। ਦੂਜਾ, ਇੱਕ ਵਾਰ ਸੰਵੇਗ ਭੇਜਣ ਮਗਰੋਂ ਨਿਊਰਾਨ ਨੂੰ ਮੁੜ ਤਿਆਰ ਹੋਣ ਲਈ ਸਮਾਂ ਲੱਗਦਾ ਹੈ। ਸਾਰੇ ਸਰੀਰ ਵਿੱਚ ਹੌਲੀ ਪਰ ਵਿਆਪਕ ਤਾਲਮੇਲ ਲਈ ਅਸੀਂ <span class=\"k\">ਅੰਤਃਸ੍ਰਾਵੀ ਪ੍ਰਣਾਲੀ</span> ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਾਂ, ਜੋ <span class=\"k\">ਹਾਰਮੋਨ</span> ਨਾਂ ਦੇ ਰਸਾਇਣਕ ਸੰਦੇਸ਼ਵਾਹਕ ਸਿੱਧੇ ਲਹੂ ਵਿੱਚ ਛੱਡਦੀ ਹੈ।",
  "Nervous tissue allows very fast responses, but it has limits. First, an electrical impulse only reaches cells joined by nerve fibres. Second, after firing, a neuron needs time to reset. For slow, steady, body-wide coordination \u2014 like growth or puberty \u2014 we rely on the <span class=\"k\">endocrine system</span>, which sends chemical messengers called <span class=\"k\">hormones</span> straight into the bloodstream to reach every cell."),

 ("ਹੌਲੀ, ਪਰ ਸਿਆਣੇ", "Slower, But Smart",
  "ਜਾਨਵਰਾਂ ਦੇ ਉਲਟ ਪੌਦਿਆਂ ਕੋਲ ਨਾ ਨਾੜੀ ਪ੍ਰਣਾਲੀ ਹੈ ਨਾ ਮਾਸਪੇਸ਼ੀਆਂ। ਉਹ ਦੌੜ ਕੇ ਭੱਜ ਨਹੀਂ ਸਕਦੇ। ਇਸ ਦੀ ਥਾਂ ਉਹ ਆਪਣਾ ਵਿਹਾਰ <span class=\"k\">ਪਾਦਪ ਹਾਰਮੋਨਾਂ (phytohormones)</span> ਰਾਹੀਂ ਤਾਲਮੇਲਿਤ ਕਰਦੇ ਹਨ। ਜਦੋਂ ਪੌਦਾ ਰੋਸ਼ਨੀ, ਗੁਰੂਤਾ ਜਾਂ ਪਾਣੀ ਮਹਿਸੂਸ ਕਰਦਾ ਹੈ, ਇਹ ਹੌਲੀ ਚੱਲਣ ਵਾਲੇ ਰਸਾਇਣ ਖ਼ਾਸ ਸੈੱਲਾਂ ਦੀ ਵਾਧਾ-ਦਰ ਬਦਲ ਦਿੰਦੇ ਹਨ, ਜਿਸ ਨਾਲ ਤਣਾ ਰੋਸ਼ਨੀ ਵੱਲ ਝੁਕਦਾ ਹੈ ਤੇ ਜੜ੍ਹਾਂ ਡੂੰਘੇ ਪਾਣੀ ਵੱਲ ਵਧਦੀਆਂ ਹਨ।",
  "Unlike animals, plants have no nervous system and no muscles; they cannot run from danger. Instead they coordinate through <span class=\"k\">phytohormones</span> (plant hormones). When a plant senses light, gravity or water, these slow-moving chemicals change the growth rate of particular cells, letting the stem bend toward light and the roots reach for deep water."),
]

READINGS["6lp"] = [
 ("ਸਾਨੂੰ ਜ਼ਿੰਦਾ ਕੀ ਰੱਖਦਾ ਹੈ?", "What Keeps Us Alive?",
  "ਹਰ ਜੀਵ ਨੂੰ ਜ਼ਿੰਦਾ ਰਹਿਣ ਲਈ ਕੁਝ ਬੁਨਿਆਦੀ ਕੰਮ ਲਗਾਤਾਰ ਕਰਨੇ ਪੈਂਦੇ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ <span class=\"k\">ਜੀਵਨ ਕਿਰਿਆਵਾਂ</span> ਕਹਿੰਦੇ ਹਨ। <span class=\"k\">ਪੋਸ਼ਣ</span> ਊਰਜਾ ਲਈ ਭੋਜਨ ਦਿੰਦਾ ਹੈ, <span class=\"k\">ਸਾਹ ਕਿਰਿਆ</span> ਭੋਜਨ ਵਿੱਚੋਂ ਊਰਜਾ ਕੱਢਦੀ ਹੈ, <span class=\"k\">ਪਰਿਵਹਨ</span> ਪਦਾਰਥਾਂ ਨੂੰ ਸਰੀਰ ਵਿੱਚ ਲਿਜਾਂਦਾ ਹੈ, ਤੇ <span class=\"k\">ਉਤਸਰਜਨ</span> ਫ਼ਾਲਤੂ ਪਦਾਰਥ ਬਾਹਰ ਕੱਢਦਾ ਹੈ। ਆਰਾਮ ਕਰਦੇ ਜੀਵ ਨੂੰ ਵੀ ਟੁੱਟੇ ਸੈੱਲਾਂ ਦੀ ਮੁਰੰਮਤ ਲਈ ਊਰਜਾ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਇਸ ਲਈ ਇਹ ਕਿਰਿਆਵਾਂ ਕਦੇ ਨਹੀਂ ਰੁਕਦੀਆਂ।",
  "Every organism must keep doing a few basic jobs to stay alive; these are the <span class=\"k\">life processes</span>. <span class=\"k\">Nutrition</span> supplies food for energy, <span class=\"k\">respiration</span> releases energy from that food, <span class=\"k\">transportation</span> carries materials around the body, and <span class=\"k\">excretion</span> removes wastes. Even a resting organism needs energy to repair worn-out cells, which is why these processes never stop."),

 ("ਹਰੀ ਰਸੋਈ", "The Green Kitchen",
  "ਪੌਦੇ ਧਰਤੀ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਰਸੋਈ ਹਨ। ਪੱਤਿਆਂ ਵਿਚਲਾ ਹਰਾ ਰੰਗਦ੍ਰਵ <span class=\"k\">ਕਲੋਰੋਫ਼ਿਲ</span> ਸੂਰਜ ਦੀ ਰੋਸ਼ਨੀ ਫੜਦਾ ਹੈ। ਇਸ ਊਰਜਾ ਨਾਲ ਪੌਦਾ <span class=\"k\">ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ</span> ਤੇ ਪਾਣੀ ਤੋਂ ਗਲੂਕੋਜ਼ ਬਣਾਉਂਦਾ ਹੈ ਤੇ ਆਕਸੀਜਨ ਛੱਡਦਾ ਹੈ — ਇਸੇ ਕਿਰਿਆ ਨੂੰ <span class=\"k\">ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ</span> ਕਹਿੰਦੇ ਹਨ। ਪੱਤੇ ਦੇ ਛੋਟੇ ਛੇਕ <span class=\"k\">ਸਟੋਮੈਟਾ</span> ਗੈਸਾਂ ਦੇ ਆਦਾਨ-ਪ੍ਰਦਾਨ ਲਈ ਖੁੱਲ੍ਹਦੇ-ਬੰਦ ਹੁੰਦੇ ਹਨ। ਇਸੇ ਹਰੀ ਰਸੋਈ ਸਦਕਾ ਧਰਤੀ ਦੇ ਸਾਰੇ ਜੀਵਾਂ ਨੂੰ ਭੋਜਨ ਤੇ ਆਕਸੀਜਨ ਮਿਲਦੀ ਹੈ।",
  "Plants run the largest kitchen on Earth. The green pigment <span class=\"k\">chlorophyll</span> in their leaves traps sunlight. Using this energy the plant turns <span class=\"k\">carbon dioxide</span> and water into glucose and releases oxygen \u2014 a process called <span class=\"k\">photosynthesis</span>. Tiny pores called <span class=\"k\">stomata</span> open and close for gas exchange. Thanks to this green kitchen, almost every living thing on Earth gets its food and oxygen."),

 ("ਲਹੂ ਦੇ ਦੋ ਸਫ਼ਰ", "Two Journeys of Blood",
  "ਮਨੁੱਖੀ ਦਿਲ ਇੱਕ ਦੋਹਰਾ ਪੰਪ ਹੈ। ਹਰ ਵਾਰ ਲਹੂ ਦਿਲ ਵਿੱਚੋਂ ਦੋ ਵਾਰ ਲੰਘਦਾ ਹੈ, ਜਿਸ ਨੂੰ <span class=\"k\">ਦੋਹਰਾ ਪਰਿਸੰਚਰਣ</span> ਕਹਿੰਦੇ ਹਨ। ਪਹਿਲੇ ਸਫ਼ਰ ਵਿੱਚ ਅਸ਼ੁੱਧ ਲਹੂ ਦਿਲ ਤੋਂ ਫੇਫੜਿਆਂ ਵੱਲ ਜਾਂਦਾ ਹੈ, ਜਿੱਥੇ ਇਹ ਆਕਸੀਜਨ ਲੈਂਦਾ ਹੈ। ਦੂਜੇ ਸਫ਼ਰ ਵਿੱਚ ਇਹ ਸ਼ੁੱਧ ਲਹੂ ਦਿਲ ਤੋਂ ਸਾਰੇ ਸਰੀਰ ਵੱਲ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ। ਦਿਲ ਦੇ ਚਾਰ ਖ਼ਾਨੇ ਤੇ ਵਾਲਵ ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ ਕਿ ਸ਼ੁੱਧ ਤੇ ਅਸ਼ੁੱਧ ਲਹੂ ਰਲਦੇ ਨਾ, ਤਾਂ ਜੋ ਸਰੀਰ ਨੂੰ ਲਗਾਤਾਰ ਆਕਸੀਜਨ ਮਿਲਦੀ ਰਹੇ।",
  "The human heart is a double pump. Each round, blood passes through the heart twice \u2014 called <span class=\"k\">double circulation</span>. On the first journey, deoxygenated blood goes from the heart to the lungs to pick up oxygen. On the second, oxygen-rich blood is pumped from the heart to the whole body. The heart's four chambers and valves keep oxygenated and deoxygenated blood from mixing, so the body gets a steady oxygen supply."),
]

READINGS["7"] = [
 ("ਪ੍ਰਜਣਨ ਦੀ ਊਰਜਾ ਕੀਮਤ", "The Energy Cost of Reproduction",
  "ਸਾਹ ਜਾਂ ਪਾਚਨ ਵਰਗੀਆਂ ਕਿਰਿਆਵਾਂ ਦੇ ਉਲਟ, <span class=\"k\">ਪ੍ਰਜਣਨ</span> ਕਿਸੇ ਇਕੱਲੇ ਜੀਵ ਨੂੰ ਜ਼ਿੰਦਾ ਰੱਖਣ ਲਈ ਜ਼ਰੂਰੀ ਨਹੀਂ। ਸਗੋਂ ਨਵਾਂ ਜੀਵ ਪੈਦਾ ਕਰਨ ਲਈ ਬਹੁਤ ਊਰਜਾ ਲੱਗਦੀ ਹੈ। ਫਿਰ ਜੀਵ ਇਹ ਊਰਜਾ ਕਿਉਂ ਖ਼ਰਚਦੇ ਹਨ? ਜਵਾਬ ਵਿਅਕਤੀ ਦੀ ਨਹੀਂ, ਸਗੋਂ <span class=\"k\">ਜਾਤੀ ਦੀ ਬਚਤ</span> ਵਿੱਚ ਲੁਕਿਆ ਹੈ। ਪ੍ਰਜਣਨ ਹੀ ਇੱਕੋ-ਇੱਕ ਤਰੀਕਾ ਹੈ ਜੋ ਕਿਸੇ ਜਾਤੀ ਨੂੰ ਲੁਪਤ ਹੋਣ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ ਤੇ ਉਸ ਦੇ ਵਿਲੱਖਣ <span class=\"k\">DNA ਨਕਸ਼ੇ</span> ਨੂੰ ਅਗਲੀ ਪੀੜ੍ਹੀ ਤੱਕ ਪਹੁੰਚਾਉਂਦਾ ਹੈ।",
  "Unlike respiration or digestion, <span class=\"k\">reproduction</span> is not needed to keep an individual alive. In fact, making a new individual costs a great deal of energy. So why spend it? The answer lies in the survival of the <span class=\"k\">species</span>, not the individual. Reproduction is the only way a species avoids extinction, passing its unique <span class=\"k\">DNA blueprint</span> forward through time."),

 ("ਬਚਾਅ ਦੀ ਚਾਸ਼ਨੀ", "The Spice of Survival",
  "ਪ੍ਰਜਣਨ ਦਾ ਮੂਲ ਕੰਮ ਸੈੱਲ ਦੇ ਨਿਊਕਲੀਅਸ ਵਿੱਚ <span class=\"k\">DNA ਦੀ ਨਕਲ</span> ਬਣਾਉਣਾ ਹੈ। ਪਰ ਕੋਈ ਵੀ ਜੈਵ-ਰਸਾਇਣਕ ਕਿਰਿਆ ਪੂਰੀ ਤਰ੍ਹਾਂ ਭਰੋਸੇਯੋਗ ਨਹੀਂ ਹੁੰਦੀ। ਇਸ ਲਈ ਬਣੀਆਂ ਨਕਲਾਂ ਮਿਲਦੀਆਂ-ਜੁਲਦੀਆਂ ਤਾਂ ਹੁੰਦੀਆਂ ਹਨ ਪਰ ਬਿਲਕੁਲ ਇੱਕੋ-ਜਿਹੀਆਂ ਨਹੀਂ। ਇਹ ਛੋਟੀਆਂ ਗ਼ਲਤੀਆਂ <span class=\"k\">ਵਿਭਿੰਨਤਾ (variation)</span> ਪੈਦਾ ਕਰਦੀਆਂ ਹਨ। ਹਲਕੀਆਂ ਵਿਭਿੰਨਤਾਵਾਂ ਜਾਤੀ ਨੂੰ ਬਦਲਦੇ ਵਾਤਾਵਰਨ — ਜਿਵੇਂ ਵਧਦੀ ਗਰਮੀ ਜਾਂ ਨਵੀਆਂ ਬਿਮਾਰੀਆਂ — ਨਾਲ ਢਲਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ।",
  "The core event of reproduction is copying the <span class=\"k\">DNA</span> inside the cell nucleus. But no biochemical reaction is perfectly reliable, so the copies are similar but rarely identical. These small copying errors create <span class=\"k\">variation</span>. While severe errors can kill a cell, slight variations are the 'spice of life', letting a species slowly adapt to changes like rising temperatures or new diseases."),

 ("ਪਰਿਪੱਕਤਾ ਵੱਲ ਮੋੜ", "The Shift to Maturity",
  "ਬਚਪਨ ਵਿੱਚ ਸਰੀਰ ਦੇ ਸਾਧਨ ਮੁੱਖ ਤੌਰ 'ਤੇ ਆਮ ਸਰੀਰਕ ਵਾਧੇ ਵੱਲ ਲੱਗੇ ਹੁੰਦੇ ਹਨ। ਪਰ ਕਿਸ਼ੋਰ ਅਵਸਥਾ ਵਿੱਚ ਇੱਕ ਜੈਵਿਕ ਮੋੜ ਆਉਂਦਾ ਹੈ: ਆਮ ਵਾਧਾ ਹੌਲੀ ਹੋ ਜਾਂਦਾ ਹੈ ਤੇ ਪ੍ਰਜਣਨ ਊਤਕ ਪਰਿਪੱਕ ਹੋਣ ਲੱਗਦੇ ਹਨ। ਇਸ ਦੌਰ ਨੂੰ <span class=\"k\">ਜਵਾਨੀ (puberty)</span> ਕਹਿੰਦੇ ਹਨ। ਸਰੀਰ ਖ਼ਾਸ <span class=\"k\">ਲਿੰਗ ਹਾਰਮੋਨ</span> — ਮਰਦਾਂ ਵਿੱਚ ਟੈਸਟੋਸਟੀਰੋਨ ਤੇ ਔਰਤਾਂ ਵਿੱਚ ਐਸਟ੍ਰੋਜਨ — ਬਣਾਉਣ ਲੱਗਦਾ ਹੈ, ਜੋ ਪ੍ਰਜਣਨ ਲਈ ਸਰੀਰ ਨੂੰ ਤਿਆਰ ਕਰਦੇ ਹਨ।",
  "In childhood the body's resources go mainly into general body growth. But in the early teens a biological shift occurs: general growth slows and the reproductive tissues begin to mature. This stage is called <span class=\"k\">puberty</span>. The body starts making special <span class=\"k\">sex hormones</span> \u2014 testosterone in males and oestrogen in females \u2014 that trigger the changes preparing the body for reproduction."),
]

READINGS["8"] = [
 ("ਵਿਰਾਸਤ ਦੇ ਲੁਕੇ ਕਾਰਕ", "Heredity's Hidden Factors",
  "1860 ਦੇ ਦਹਾਕੇ ਵਿੱਚ ਇੱਕ ਮੱਠ ਦੇ ਸ਼ਾਂਤ ਬਗ਼ੀਚੇ ਵਿੱਚ ਗ੍ਰੇਗਰ ਮੈਂਡਲ ਨਾਂ ਦੇ ਸੰਤ ਨੇ ਸੱਤ ਸਾਲ ਹਜ਼ਾਰਾਂ ਮਟਰ ਦੇ ਪੌਦੇ ਉਗਾ ਕੇ ਗਿਣੇ। ਉਸ ਨੇ ਵੇਖਿਆ ਕਿ ਲੰਬੇ ਤੇ ਮਧਰੇ ਪੌਦੇ ਦੇ ਮੇਲ ਤੋਂ ਸਾਰੀ ਸੰਤਾਨ ਲੰਬੀ ਨਿਕਲੀ — ਮਧਰਾਪਣ ਲੁਪਤ ਹੋ ਗਿਆ। ਪਰ ਉਨ੍ਹਾਂ ਲੰਬੇ ਪੌਦਿਆਂ ਦੇ ਆਪਸੀ ਮੇਲ ਤੋਂ ਹਰ ਚਾਰ ਵਿੱਚੋਂ ਲਗਭਗ ਇੱਕ ਪੌਦਾ ਮੁੜ ਮਧਰਾ ਨਿਕਲਿਆ। ਮੈਂਡਲ ਨੇ ਸਮਝਿਆ ਕਿ ਗੁਣ <span class=\"k\">ਲੁਕੇ ਕਾਰਕਾਂ</span> — ਜਿਨ੍ਹਾਂ ਨੂੰ ਅੱਜ ਅਸੀਂ <span class=\"k\">ਜੀਨ</span> ਕਹਿੰਦੇ ਹਾਂ — ਰਾਹੀਂ ਲੰਘਦੇ ਹਨ।",
  "In the 1860s, in the quiet garden of a monastery, a monk named Gregor Mendel spent seven years growing and counting thousands of pea plants. He saw that crossing a tall plant with a short one gave offspring that were all tall \u2014 shortness seemed to vanish. Yet breeding those tall plants together brought the short trait back in about one plant in four. Mendel realised traits are carried by <span class=\"k\">hidden factors</span>, which we now call <span class=\"k\">genes</span>."),

 ("ਪ੍ਰਭਾਵੀ ਅਤੇ ਅਪ੍ਰਭਾਵੀ", "Dominant and Recessive",
  "ਹਰ ਜੀਵ ਨੂੰ ਹਰ ਗੁਣ ਲਈ ਦੋ ਕਾਰਕ ਮਿਲਦੇ ਹਨ — ਇੱਕ ਮਾਂ ਤੋਂ, ਇੱਕ ਪਿਤਾ ਤੋਂ। ਕਦੇ-ਕਦੇ ਇੱਕ ਕਾਰਕ ਦੂਜੇ ਨੂੰ ਦਬਾ ਦਿੰਦਾ ਹੈ। ਜੋ ਗੁਣ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ, ਉਸ ਨੂੰ <span class=\"k\">ਪ੍ਰਭਾਵੀ (dominant)</span> ਕਹਿੰਦੇ ਹਨ, ਤੇ ਜੋ ਲੁਕਿਆ ਰਹਿੰਦਾ ਹੈ, ਉਸ ਨੂੰ <span class=\"k\">ਅਪ੍ਰਭਾਵੀ (recessive)</span>। ਮੈਂਡਲ ਦੇ ਲੰਬੇ (Tt) ਪੌਦੇ ਵਿੱਚ ਮਧਰੇਪਣ ਦਾ ਕਾਰਕ ਲੁਕਿਆ ਰਹਿੰਦਾ ਹੈ। ਦੋ ਅਜਿਹੇ ਪੌਦਿਆਂ ਦੇ ਮੇਲ ਤੋਂ ਅਗਲੀ ਪੀੜ੍ਹੀ ਵਿੱਚ ਲੰਬੇ ਤੇ ਮਧਰੇ ਦਾ ਅਨੁਪਾਤ <span class=\"k\">3:1</span> ਬਣਦਾ ਹੈ।",
  "Every organism gets two factors for each trait \u2014 one from each parent. Sometimes one factor masks the other. The trait that shows is called <span class=\"k\">dominant</span>, and the one that stays hidden is <span class=\"k\">recessive</span>. In Mendel's tall (Tt) plant, the factor for shortness is hidden. Crossing two such plants gives a next generation with tall and short in a ratio of <span class=\"k\">3:1</span>."),

 ("ਮੁੰਡਾ ਜਾਂ ਕੁੜੀ?", "Boy or Girl?",
  "ਬੱਚਾ ਮੁੰਡਾ ਹੋਵੇਗਾ ਜਾਂ ਕੁੜੀ, ਇਹ <span class=\"k\">ਲਿੰਗ ਗੁਣਸੂਤਰਾਂ</span> ਉੱਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਔਰਤਾਂ ਵਿੱਚ ਦੋ X ਗੁਣਸੂਤਰ (XX) ਹੁੰਦੇ ਹਨ ਤੇ ਮਰਦਾਂ ਵਿੱਚ ਇੱਕ X ਤੇ ਇੱਕ Y (XY)। ਮਾਂ ਹਮੇਸ਼ਾ X ਗੁਣਸੂਤਰ ਦਿੰਦੀ ਹੈ, ਪਰ ਪਿਤਾ X ਜਾਂ Y ਦੇ ਸਕਦਾ ਹੈ। ਜੇ ਸ਼ੁਕਰਾਣੂ X ਲਿਆਵੇ ਤਾਂ ਬੱਚਾ ਕੁੜੀ (XX), ਤੇ ਜੇ Y ਲਿਆਵੇ ਤਾਂ ਮੁੰਡਾ (XY) ਹੁੰਦਾ ਹੈ। ਇਸ ਲਈ ਬੱਚੇ ਦਾ ਲਿੰਗ <span class=\"k\">ਪਿਤਾ</span> ਵੱਲੋਂ ਤੈਅ ਹੁੰਦਾ ਹੈ, ਨਾ ਕਿ ਮਾਂ ਵੱਲੋਂ।",
  "Whether a baby is a boy or a girl depends on the <span class=\"k\">sex chromosomes</span>. Females have two X chromosomes (XX) and males have one X and one Y (XY). The mother always gives an X, but the father can give either X or Y. If the sperm carries X the child is a girl (XX); if it carries Y the child is a boy (XY). So the child's sex is decided by the <span class=\"k\">father</span>, not the mother."),
]

READINGS["9"] = [
 ("ਟੁੱਟਿਆ ਹੋਇਆ ਤੀਲਾ", "The Broken Straw",
  "ਕੀ ਤੁਸੀਂ ਵੇਖਿਆ ਹੈ ਕਿ ਪਾਣੀ ਦੇ ਗਿਲਾਸ ਵਿੱਚ ਪਿਆ ਤੀਲਾ ਸਤ੍ਹਾ ਉੱਤੇ ਟੁੱਟਿਆ ਜਿਹਾ ਦਿਸਦਾ ਹੈ? ਅਸਲ ਵਿੱਚ ਤੀਲਾ ਨਹੀਂ ਮੁੜਦਾ, ਰੋਸ਼ਨੀ ਮੁੜਦੀ ਹੈ। ਜਦੋਂ ਰੋਸ਼ਨੀ ਹਵਾ ਤੋਂ ਪਾਣੀ ਜਾਂ ਕੱਚ ਵਿੱਚ ਜਾਂਦੀ ਹੈ ਤਾਂ ਹੌਲੀ ਹੋ ਕੇ ਦਿਸ਼ਾ ਬਦਲ ਲੈਂਦੀ ਹੈ; ਇਸ ਨੂੰ <span class=\"k\">ਅਪਵਰਤਨ (refraction)</span> ਕਹਿੰਦੇ ਹਨ। ਇਹੀ ਝੁਕਾਅ ਵੱਡਦਰਸ਼ੀ ਸ਼ੀਸ਼ੇ ਨੂੰ ਧੁੱਪ ਇੱਕ ਬਿੰਦੂ 'ਤੇ ਇਕੱਠੀ ਕਰਨ ਦਿੰਦਾ ਹੈ ਤੇ ਐਨਕ ਨੂੰ ਧੁੰਦਲੀ ਨਜ਼ਰ ਠੀਕ ਕਰਨ।",
  "Have you noticed that a straw in a glass of water looks broken at the surface? The straw is not really bending \u2014 the light is. When light passes from air into water or glass it slows down and changes direction, an effect called <span class=\"k\">refraction</span>. This same bending lets a magnifying glass gather sunlight to a point and a spectacle lens correct blurry vision."),

 ("ਸ਼ੀਸ਼ੇ ਅਤੇ ਪਰਾਵਰਤਨ", "Mirrors and Reflection",
  "ਦਰਪਣ <span class=\"k\">ਪਰਾਵਰਤਨ (reflection)</span> ਰਾਹੀਂ ਕੰਮ ਕਰਦੇ ਹਨ — ਉਹ ਰੋਸ਼ਨੀ ਨੂੰ ਇੰਨੀ ਸਹੀ ਤਰ੍ਹਾਂ ਵਾਪਸ ਮੋੜਦੇ ਹਨ ਕਿ ਸਾਨੂੰ ਆਪਣਾ ਚਿਹਰਾ ਦਿਸਦਾ ਹੈ। ਸਮਤਲ ਦਰਪਣ ਸਿੱਧਾ ਬਿੰਬ ਬਣਾਉਂਦਾ ਹੈ, ਪਰ ਮੁੜੇ ਹੋਏ ਦਰਪਣ ਬਿੰਬ ਨੂੰ ਵੱਡਾ ਜਾਂ ਛੋਟਾ ਕਰ ਸਕਦੇ ਹਨ। <span class=\"k\">ਅਵਤਲ (concave)</span> ਦਰਪਣ ਰੋਸ਼ਨੀ ਇਕੱਠੀ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਟਾਰਚ ਤੇ ਗੱਡੀ ਦੀਆਂ ਹੈੱਡਲਾਈਟਾਂ ਵਿੱਚ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਦਕਿ <span class=\"k\">ਉੱਤਲ (convex)</span> ਦਰਪਣ ਵੱਡਾ ਖੇਤਰ ਦਿਖਾਉਂਦਾ ਹੈ, ਇਸ ਲਈ ਗੱਡੀ ਦੇ ਪਿਛਲੇ ਸ਼ੀਸ਼ੇ ਵਿੱਚ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।",
  "Mirrors work by <span class=\"k\">reflection</span> \u2014 they bounce light back so precisely that we see our own face. A plane mirror gives an upright image, but curved mirrors can enlarge or shrink it. A <span class=\"k\">concave</span> mirror gathers light, so it is used in torches and car headlights, while a <span class=\"k\">convex</span> mirror shows a wider view, which is why it is used as a vehicle's rear-view mirror."),

 ("ਰੋਸ਼ਨੀ ਨੂੰ ਕਾਬੂ ਕਰਨਾ", "Taming the Light",
  "ਕੱਚ ਤੇ ਧਾਤ ਨੂੰ ਧਿਆਨ ਨਾਲ ਢਾਲ ਕੇ ਮਨੁੱਖ ਨੇ ਰੋਸ਼ਨੀ ਨੂੰ ਕਾਬੂ ਕਰਨਾ ਸਿੱਖਿਆ। ਲੈੱਨਜ਼ ਦੀ <span class=\"k\">ਸ਼ਕਤੀ</span> ਦੱਸਦੀ ਹੈ ਕਿ ਇਹ ਰੋਸ਼ਨੀ ਨੂੰ ਕਿੰਨਾ ਮੋੜਦਾ ਹੈ ਤੇ ਇਸ ਨੂੰ <span class=\"k\">ਡਾਇਓਪਟਰ</span> ਵਿੱਚ ਮਾਪਿਆ ਜਾਂਦਾ ਹੈ। ਦੋ ਲੈੱਨਜ਼ਾਂ ਨੂੰ ਜੋੜ ਕੇ ਵਿਗਿਆਨੀਆਂ ਨੇ <span class=\"k\">ਸੂਖ਼ਮਦਰਸ਼ੀ</span> ਬਣਾਈ, ਜਿਸ ਨਾਲ ਬਿਮਾਰੀ ਫੈਲਾਉਣ ਵਾਲੇ ਕੀਟਾਣੂ ਵੇਖੇ ਗਏ, ਤੇ <span class=\"k\">ਦੂਰਦਰਸ਼ੀ</span>, ਜਿਸ ਨਾਲ ਦੂਰ ਦੀਆਂ ਆਕਾਸ਼ਗੰਗਾਵਾਂ। ਇੰਜ ਰੋਸ਼ਨੀ ਦੇ ਸਧਾਰਨ ਨਿਯਮਾਂ ਨੇ ਵਿਗਿਆਨ ਦੀ ਦੁਨੀਆਂ ਖੋਲ੍ਹ ਦਿੱਤੀ।",
  "By carefully shaping glass and metal, humans learned to tame light. The <span class=\"k\">power</span> of a lens tells how strongly it bends light and is measured in <span class=\"k\">dioptres</span>. By combining lenses, scientists built the <span class=\"k\">microscope</span> to see disease-causing germs and the <span class=\"k\">telescope</span> to see distant galaxies. Thus the simple rules of light opened up the world of science."),
]

READINGS["10"] = [
 ("ਅਸਮਾਨ ਨੀਲਾ ਕਿਉਂ?", "Why Is the Sky Blue?",
  "ਸੂਰਜ ਦੀ ਚਿੱਟੀ ਰੋਸ਼ਨੀ ਅਸਲ ਵਿੱਚ ਸਤਰੰਗੀ ਦੇ ਸਾਰੇ ਰੰਗਾਂ ਦਾ ਮਿਸ਼ਰਣ ਹੈ। ਜਦੋਂ ਇਹ ਵਾਯੂਮੰਡਲ ਦੇ ਛੋਟੇ ਅਣੂਆਂ ਨਾਲ ਟਕਰਾਉਂਦੀ ਹੈ, ਤਾਂ <span class=\"k\">ਨੀਲੀ</span> ਰੋਸ਼ਨੀ ਸਭ ਤੋਂ ਵੱਧ ਖਿੰਡਦੀ ਹੈ — ਇਸ ਨੂੰ <span class=\"k\">ਪ੍ਰਕੀਰਣ (scattering)</span> ਕਹਿੰਦੇ ਹਨ। ਇਸੇ ਕਾਰਨ ਦਿਨ ਵੇਲੇ ਅਸਮਾਨ ਹਰ ਪਾਸਿਓਂ ਨੀਲਾ ਦਿਸਦਾ ਹੈ। ਸੂਰਜ ਡੁੱਬਣ ਵੇਲੇ ਰੋਸ਼ਨੀ ਨੂੰ ਵੱਧ ਹਵਾ ਵਿੱਚੋਂ ਲੰਘਣਾ ਪੈਂਦਾ ਹੈ, ਇਸ ਲਈ ਨੀਲਾ ਖਿੰਡ ਜਾਂਦਾ ਹੈ ਤੇ ਸਿਰਫ਼ ਲਾਲ-ਸੰਤਰੀ ਰੰਗ ਸਾਡੀਆਂ ਅੱਖਾਂ ਤੱਕ ਪਹੁੰਚਦੇ ਹਨ।",
  "The Sun's white light is really a mix of all the rainbow colours. When it hits the tiny molecules of the atmosphere, <span class=\"k\">blue</span> light is scattered the most \u2014 an effect called <span class=\"k\">scattering</span>. That is why the daytime sky looks blue from every direction. At sunset the light must travel through much more air, so the blue is scattered away and only the reds and oranges reach our eyes."),

 ("ਕੁਦਰਤੀ ਕੈਮਰਾ", "The Natural Camera",
  "ਮਨੁੱਖੀ ਅੱਖ ਇੱਕ ਕਮਾਲ ਦਾ ਕੁਦਰਤੀ ਕੈਮਰਾ ਹੈ। ਰੋਸ਼ਨੀ <span class=\"k\">ਕੌਰਨੀਆ</span> ਤੇ <span class=\"k\">ਲੈੱਨਜ਼</span> ਰਾਹੀਂ ਅੰਦਰ ਆਉਂਦੀ ਹੈ ਤੇ ਪਿੱਛੇ <span class=\"k\">ਰੈਟਿਨਾ</span> ਉੱਤੇ ਬਿੰਬ ਬਣਾਉਂਦੀ ਹੈ। ਲੈੱਨਜ਼ ਆਪਣੀ ਮੋਟਾਈ ਬਦਲ ਕੇ ਨੇੜੇ ਤੇ ਦੂਰ ਦੀਆਂ ਚੀਜ਼ਾਂ ਉੱਤੇ ਫੋਕਸ ਕਰਦਾ ਹੈ — ਇਸ ਸਮਰੱਥਾ ਨੂੰ <span class=\"k\">ਸਮਾਯੋਜਨ (accommodation)</span> ਕਹਿੰਦੇ ਹਨ। <span class=\"k\">ਆਈਰਿਸ</span> ਪੁਤਲੀ ਦਾ ਆਕਾਰ ਬਦਲ ਕੇ ਅੰਦਰ ਆਉਣ ਵਾਲੀ ਰੋਸ਼ਨੀ ਦੀ ਮਾਤਰਾ ਕਾਬੂ ਕਰਦੀ ਹੈ, ਜਿਵੇਂ ਕੈਮਰੇ ਦਾ ਅਪਰਚਰ।",
  "The human eye is an amazing natural camera. Light enters through the <span class=\"k\">cornea</span> and <span class=\"k\">lens</span> and forms an image on the <span class=\"k\">retina</span> at the back. The lens changes its thickness to focus on near and far objects, an ability called <span class=\"k\">accommodation</span>. The <span class=\"k\">iris</span> changes the size of the pupil to control how much light enters, just like a camera's aperture."),

 ("ਸੱਤ ਰੰਗਾਂ ਦਾ ਪੱਖਾ", "The Fan of Seven Colours",
  "ਜਦੋਂ ਚਿੱਟੀ ਰੋਸ਼ਨੀ ਕੱਚ ਦੇ <span class=\"k\">ਪ੍ਰਿਜ਼ਮ</span> ਵਿੱਚੋਂ ਲੰਘਦੀ ਹੈ ਤਾਂ ਇਹ ਸੱਤ ਰੰਗਾਂ ਵਿੱਚ ਵੰਡੀ ਜਾਂਦੀ ਹੈ; ਇਸ ਨੂੰ <span class=\"k\">ਵਿਖੇਪਣ (dispersion)</span> ਕਹਿੰਦੇ ਹਨ। ਹਰ ਰੰਗ ਥੋੜ੍ਹਾ ਵੱਖਰੇ ਕੋਣ 'ਤੇ ਮੁੜਦਾ ਹੈ — ਜਾਮਣੀ ਸਭ ਤੋਂ ਵੱਧ ਤੇ ਲਾਲ ਸਭ ਤੋਂ ਘੱਟ। ਬਾਰਿਸ਼ ਤੋਂ ਬਾਅਦ ਹਵਾ ਵਿੱਚ ਲੱਖਾਂ ਪਾਣੀ ਦੀਆਂ ਬੂੰਦਾਂ ਛੋਟੇ ਪ੍ਰਿਜ਼ਮਾਂ ਵਾਂਗ ਕੰਮ ਕਰਦੀਆਂ ਹਨ ਤੇ ਅਸਮਾਨ ਵਿੱਚ <span class=\"k\">ਸਤਰੰਗੀ ਪੀਂਘ</span> ਬਣਾਉਂਦੀਆਂ ਹਨ। ਇਹ ਸਾਬਤ ਕਰਦਾ ਹੈ ਕਿ ਚਿੱਟੀ ਰੋਸ਼ਨੀ ਕਈ ਰੰਗਾਂ ਦਾ ਮੇਲ ਹੈ।",
  "When white light passes through a glass <span class=\"k\">prism</span> it splits into seven colours \u2014 an effect called <span class=\"k\">dispersion</span>. Each colour bends by a slightly different angle, violet the most and red the least. After rain, millions of water droplets in the air act like tiny prisms and paint a <span class=\"k\">rainbow</span> across the sky, proving that white light is really a blend of many colours."),
]

READINGS["11"] = [
 ("ਬਿਜਲੀ ਦੀ ਨਦੀ", "The River of Electricity",
  "ਤਾਰ ਵਿੱਚ ਵਗਦੀ ਬਿਜਲੀ ਨਦੀ ਵਿੱਚ ਵਗਦੇ ਪਾਣੀ ਵਰਗੀ ਹੈ। ਚਾਰਜਾਂ ਨੂੰ ਅੱਗੇ ਧੱਕਣ ਵਾਲਾ ਧੱਕਾ <span class=\"k\">ਵੋਲਟੇਜ</span> ਹੈ, ਹਰ ਸਕਿੰਟ ਲੰਘਦਾ ਚਾਰਜ <span class=\"k\">ਧਾਰਾ (current)</span> ਹੈ, ਤੇ ਵਹਾਅ ਨੂੰ ਹੌਲੀ ਕਰਨ ਵਾਲੀ ਚੀਜ਼ <span class=\"k\">ਪ੍ਰਤੀਰੋਧ (resistance)</span> ਹੈ। ਜਰਮਨ ਅਧਿਆਪਕ ਜੌਰਜ ਓਹਮ ਨੇ ਲੱਭਿਆ ਕਿ ਕਈ ਪਦਾਰਥਾਂ ਵਿੱਚ ਧਾਰਾ ਵੋਲਟੇਜ ਦੇ ਸਿੱਧੀ ਅਨੁਪਾਤੀ ਹੁੰਦੀ ਹੈ — ਇਸੇ ਨੂੰ <span class=\"k\">ਓਹਮ ਦਾ ਨਿਯਮ</span> ਕਹਿੰਦੇ ਹਾਂ।",
  "Electricity flowing in a wire is like water flowing in a river. The push that drives the charges is the <span class=\"k\">voltage</span>, the charge passing each second is the <span class=\"k\">current</span>, and anything that slows the flow is the <span class=\"k\">resistance</span>. The German teacher Georg Ohm found that in many materials the current is directly proportional to the voltage \u2014 a relationship we still call <span class=\"k\">Ohm's law</span>."),

 ("ਤਾਰ ਗਰਮ ਕਿਉਂ ਹੁੰਦੀ ਹੈ?", "Why Does a Wire Heat Up?",
  "ਜਦੋਂ ਚਾਰਜਾਂ ਨੂੰ ਵੱਧ ਪ੍ਰਤੀਰੋਧ ਵਿੱਚੋਂ ਧੱਕਿਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਉਹ ਟਕਰਾ ਕੇ ਊਰਜਾ <span class=\"k\">ਤਾਪ</span> ਵਜੋਂ ਛੱਡਦੇ ਹਨ — ਇਸੇ ਨੂੰ <span class=\"k\">ਬਿਜਲੀ ਦਾ ਤਾਪ ਪ੍ਰਭਾਵ</span> ਕਹਿੰਦੇ ਹਨ। ਬਲਬ ਦਾ ਫ਼ਿਲਾਮੈਂਟ ਤੇ ਹੀਟਰ ਦੀ ਕੁੰਡਲੀ ਇਸੇ ਕਰਕੇ ਚਮਕਦੇ ਤੇ ਗਰਮ ਹੁੰਦੇ ਹਨ। ਪੈਦਾ ਹੋਈ ਊਰਜਾ ਧਾਰਾ ਦੇ ਵਰਗ, ਪ੍ਰਤੀਰੋਧ ਤੇ ਸਮੇਂ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। ਇਸੇ ਸਿਧਾਂਤ ਉੱਤੇ ਬਿਜਲਈ ਪ੍ਰੈੱਸ, ਟੋਸਟਰ ਤੇ ਗੀਜ਼ਰ ਕੰਮ ਕਰਦੇ ਹਨ, ਪਰ ਬਹੁਤੀ ਗਰਮੀ ਊਰਜਾ ਦਾ ਵਿਅਰਥ ਵੀ ਹੋ ਸਕਦੀ ਹੈ।",
  "When charges are pushed through a high resistance, they collide and release energy as <span class=\"k\">heat</span> \u2014 called the <span class=\"k\">heating effect of current</span>. This is why a bulb's filament and a heater's coil glow and get hot. The energy produced depends on the square of the current, the resistance and the time. Electric irons, toasters and geysers work on this idea, though too much heat can also waste energy."),

 ("ਇੱਕ ਸ਼ਹਿਰ ਨੂੰ ਰੌਸ਼ਨ ਕਰਨਾ", "Lighting Up a City",
  "ਓਹਮ ਦੇ ਸਧਾਰਨ ਨਿਯਮਾਂ ਨੂੰ ਸਮਝ ਕੇ ਇੰਜੀਨੀਅਰ ਛੋਟੇ ਫ਼ੋਨ ਚਾਰਜਰ ਤੋਂ ਲੈ ਕੇ ਪੂਰੇ ਸ਼ਹਿਰ ਨੂੰ ਰੌਸ਼ਨ ਕਰਨ ਵਾਲੇ ਪਾਵਰ ਗਰਿੱਡ ਤੱਕ ਸਭ ਕੁਝ ਬਣਾਉਂਦੇ ਹਨ। ਘਰਾਂ ਵਿੱਚ ਉਪਕਰਣ <span class=\"k\">ਸਮਾਨਾਂਤਰ (parallel)</span> ਜੋੜੇ ਜਾਂਦੇ ਹਨ ਤਾਂ ਜੋ ਹਰ ਇੱਕ ਨੂੰ ਪੂਰਾ ਵੋਲਟੇਜ ਮਿਲੇ ਤੇ ਇੱਕ ਬੰਦ ਹੋਣ 'ਤੇ ਬਾਕੀ ਚੱਲਦੇ ਰਹਿਣ। <span class=\"k\">ਫ਼ਿਊਜ਼</span> ਇੱਕ ਸੁਰੱਖਿਆ ਯੰਤਰ ਹੈ ਜੋ ਬਹੁਤ ਵੱਧ ਧਾਰਾ ਵਗਣ 'ਤੇ ਪਿਘਲ ਕੇ ਸਰਕਟ ਤੋੜ ਦਿੰਦਾ ਹੈ ਤੇ ਅੱਗ ਲੱਗਣ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ।",
  "By understanding Ohm's simple rules, engineers design everything from a tiny phone charger to the power grid that lights a whole city. In homes, appliances are connected in <span class=\"k\">parallel</span> so each gets the full voltage and the others keep working if one is switched off. A <span class=\"k\">fuse</span> is a safety device that melts and breaks the circuit if too much current flows, preventing fires."),
]

READINGS["12"] = [
 ("ਬਿਜਲੀ ਮਿਲੀ ਚੁੰਬਕ ਨੂੰ", "Electricity Meets Magnetism",
  "1820 ਵਿੱਚ ਡੈੱਨਮਾਰਕ ਦੇ ਅਧਿਆਪਕ ਹੰਸ ਕ੍ਰਿਸ਼ਚੀਅਨ ਓਰਸਟੈੱਡ ਨੇ ਲੈਕਚਰ ਦੌਰਾਨ ਹੈਰਾਨ ਕਰ ਦੇਣ ਵਾਲੀ ਚੀਜ਼ ਵੇਖੀ। ਜਦੋਂ ਵੀ ਉਹ ਬਿਜਲਈ ਧਾਰਾ ਚਾਲੂ ਕਰਦਾ, ਨੇੜੇ ਪਈ ਕੰਪਾਸ ਦੀ ਸੂਈ ਹਿੱਲ ਜਾਂਦੀ। ਇਸ ਛੋਟੀ ਜਿਹੀ ਹਰਕਤ ਨੇ ਪਹਿਲੀ ਵਾਰ ਸਾਬਤ ਕੀਤਾ ਕਿ <span class=\"k\">ਬਿਜਲੀ ਅਤੇ ਚੁੰਬਕਤਾ</span> ਡੂੰਘੇ ਜੁੜੇ ਹੋਏ ਹਨ। ਵਿਗਿਆਨੀਆਂ ਨੇ ਜਾਣਿਆ ਕਿ ਧਾਰਾ ਵਾਲੀ ਤਾਰ ਦੀ ਕੁੰਡਲੀ ਚੁੰਬਕ ਵਾਂਗ ਵਿਹਾਰ ਕਰਦੀ ਹੈ ਤੇ ਇਸ <span class=\"k\">ਬਿਜਲ-ਚੁੰਬਕ</span> ਨੂੰ ਮਰਜ਼ੀ ਨਾਲ ਚਾਲੂ-ਬੰਦ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
  "In 1820 the Danish teacher Hans Christian Oersted noticed something astonishing during a lecture. Every time he switched on a current, a nearby compass needle twitched. This tiny movement proved for the first time that <span class=\"k\">electricity and magnetism</span> are deeply connected. Scientists soon learned that a coil of wire carrying current behaves like a magnet, and this <span class=\"k\">electromagnet</span> can be switched on and off at will."),

 ("ਗਤੀ ਨੂੰ ਬਿਜਲੀ ਬਣਾਉਣਾ", "Turning Motion into Electricity",
  "ਓਰਸਟੈੱਡ ਨੇ ਵਿਖਾਇਆ ਕਿ ਧਾਰਾ ਚੁੰਬਕਤਾ ਬਣਾਉਂਦੀ ਹੈ; ਮਾਈਕਲ ਫ਼ੈਰਾਡੇ ਨੇ ਉਲਟਾ ਸਵਾਲ ਪੁੱਛਿਆ — ਕੀ ਚੁੰਬਕਤਾ ਧਾਰਾ ਬਣਾ ਸਕਦੀ ਹੈ? ਉਸ ਨੇ ਲੱਭਿਆ ਕਿ ਜਦੋਂ ਕੋਈ ਚੁੰਬਕ ਤਾਰ ਦੀ ਕੁੰਡਲੀ ਦੇ ਨੇੜੇ ਹਿਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਕੁੰਡਲੀ ਵਿੱਚ ਬਿਜਲਈ ਧਾਰਾ ਪੈਦਾ ਹੁੰਦੀ ਹੈ — ਇਸ ਨੂੰ <span class=\"k\">ਬਿਜਲ-ਚੁੰਬਕੀ ਪ੍ਰੇਰਣ</span> ਕਹਿੰਦੇ ਹਨ। ਇਸੇ ਸਿਧਾਂਤ ਉੱਤੇ <span class=\"k\">ਜਨਰੇਟਰ</span> ਕੰਮ ਕਰਦਾ ਹੈ, ਜੋ ਗਤੀ ਦੀ ਊਰਜਾ ਨੂੰ ਬਿਜਲੀ ਵਿੱਚ ਬਦਲ ਕੇ ਦੁਨੀਆਂ ਦੀ ਬਹੁਤੀ ਬਿਜਲੀ ਪੈਦਾ ਕਰਦਾ ਹੈ।",
  "Oersted showed that current makes magnetism; Michael Faraday asked the reverse \u2014 can magnetism make current? He found that moving a magnet near a coil of wire produces a current in the coil, an effect called <span class=\"k\">electromagnetic induction</span>. The <span class=\"k\">generator</span> works on this idea, turning the energy of motion into electricity and producing most of the world's power."),

 ("ਕਲਾਸ ਤੋਂ ਦੁਨੀਆਂ ਤੱਕ", "From Classroom to the World",
  "ਇੱਕ ਕਲਾਸਰੂਮ ਦੇ ਹਾਦਸੇ ਵਜੋਂ ਸ਼ੁਰੂ ਹੋਈ ਖੋਜ ਆਧੁਨਿਕ ਦੁਨੀਆਂ ਦਾ ਇੰਜਣ ਬਣ ਗਈ। ਜਦੋਂ ਧਾਰਾ ਵਾਲੀ ਤਾਰ ਨੂੰ ਚੁੰਬਕੀ ਖੇਤਰ ਵਿੱਚ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਉਸ ਉੱਤੇ ਬਲ ਲੱਗਦਾ ਹੈ — ਇਸੇ ਬਲ ਨਾਲ <span class=\"k\">ਬਿਜਲਈ ਮੋਟਰ</span> ਘੁੰਮਦੀ ਹੈ। ਇਹ ਮੋਟਰਾਂ ਪੱਖੇ ਚਲਾਉਂਦੀਆਂ ਹਨ, ਕਬਾੜ ਵਿੱਚ ਵੱਡੇ ਚੁੰਬਕ ਕਾਰਾਂ ਚੁੱਕਦੇ ਹਨ, ਤੇ ਜਨਰੇਟਰ ਬਿਜਲੀ ਬਣਾਉਂਦੇ ਹਨ। ਘਰੇਲੂ ਸਰਕਟਾਂ ਵਿੱਚ <span class=\"k\">ਅਰਥ ਤਾਰ</span> ਇੱਕ ਸੁਰੱਖਿਆ ਹੈ ਜੋ ਲੀਕ ਹੋਈ ਧਾਰਾ ਨੂੰ ਧਰਤੀ ਵੱਲ ਭੇਜ ਕੇ ਸਾਨੂੰ ਬਿਜਲੀ ਦੇ ਝਟਕੇ ਤੋਂ ਬਚਾਉਂਦੀ ਹੈ।",
  "What began as a classroom accident became the engine of the modern world. When a current-carrying wire sits in a magnetic field, it feels a force \u2014 the very force that spins an <span class=\"k\">electric motor</span>. These motors run fans, giant magnets lift cars in scrapyards, and generators make electricity. In home circuits the <span class=\"k\">earth wire</span> is a safety line that sends leaked current into the ground, protecting us from electric shocks."),
]

READINGS["13"] = [
 ("ਊਰਜਾ ਦਾ ਵਹਾਅ", "The Flow of Energy",
  "ਕੁਦਰਤ ਵਿੱਚ ਕੋਈ ਵੀ ਇਕੱਲਾ ਨਹੀਂ ਰਹਿੰਦਾ। ਘਾਹ ਸੂਰਜ ਦੀ ਰੋਸ਼ਨੀ ਫੜਦਾ ਹੈ, ਟਿੱਡਾ ਘਾਹ ਖਾਂਦਾ ਹੈ, ਡੱਡੂ ਟਿੱਡੇ ਨੂੰ, ਤੇ ਸੱਪ ਡੱਡੂ ਨੂੰ — ਇਹ <span class=\"k\">ਭੋਜਨ ਲੜੀ</span> ਬਣਦੀ ਹੈ, ਜਿਸ ਰਾਹੀਂ ਊਰਜਾ ਇੱਕ ਜੀਵ ਤੋਂ ਦੂਜੇ ਤੱਕ ਲੰਘਦੀ ਹੈ। ਹਰ ਪੜਾਅ 'ਤੇ ਬਹੁਤੀ ਊਰਜਾ ਤਾਪ ਵਜੋਂ ਗੁਆਚ ਜਾਂਦੀ ਹੈ — ਇਸੇ ਨੂੰ <span class=\"k\">10% ਦਾ ਨਿਯਮ</span> ਕਹਿੰਦੇ ਹਨ। ਇਸੇ ਲਈ ਸੱਪ ਹਮੇਸ਼ਾ ਘਾਹ ਦੀਆਂ ਪੱਤੀਆਂ ਨਾਲੋਂ ਬਹੁਤ ਘੱਟ ਹੁੰਦੇ ਹਨ।",
  "In nature nothing lives alone. Grass captures sunlight, a grasshopper eats the grass, a frog eats the grasshopper, and a snake eats the frog \u2014 forming a <span class=\"k\">food chain</span> through which energy passes from one living thing to the next. At each step most of the energy is lost as heat, described by the <span class=\"k\">10% law</span>. That is why there are always far fewer snakes than blades of grass."),

 ("ਕੁਦਰਤ ਦੇ ਸਫ਼ਾਈ ਕਰਮਚਾਰੀ", "Nature's Cleaners",
  "ਸੋਚੋ ਜੇ ਹਰ ਡਿੱਗਿਆ ਪੱਤਾ ਤੇ ਮਰਿਆ ਜੀਵ ਸਦਾ ਪਿਆ ਰਹੇ ਤਾਂ ਕੀ ਹੋਵੇ। <span class=\"k\">ਅਪਘਟਕ (decomposers)</span> — ਜਿਵੇਂ ਬੈਕਟੀਰੀਆ ਤੇ ਉੱਲੀ — ਮਰੇ ਜੀਵਾਂ ਨੂੰ ਤੋੜ ਕੇ ਪੌਸ਼ਟਿਕ ਤੱਤ ਮਿੱਟੀ ਵਿੱਚ ਵਾਪਸ ਭੇਜਦੇ ਹਨ। <span class=\"k\">ਜੈਵ-ਵਿਘਟਨਸ਼ੀਲ</span> ਪਦਾਰਥ ਇਹ ਸੁਖਾਲੇ ਤੋੜ ਦਿੰਦੇ ਹਨ, ਪਰ ਪਲਾਸਟਿਕ ਵਰਗੇ <span class=\"k\">ਅਜੈਵ-ਵਿਘਟਨਸ਼ੀਲ</span> ਪਦਾਰਥ ਸਦੀਆਂ ਤੱਕ ਨਹੀਂ ਗਲਦੇ ਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਪ੍ਰਦੂਸ਼ਿਤ ਕਰਦੇ ਹਨ। ਇਸੇ ਲਈ ਸਾਨੂੰ ਪਲਾਸਟਿਕ ਦੀ ਵਰਤੋਂ ਘਟਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।",
  "Imagine if every fallen leaf and dead animal simply piled up forever. <span class=\"k\">Decomposers</span> \u2014 like bacteria and fungi \u2014 break down dead matter and return nutrients to the soil. They easily break down <span class=\"k\">biodegradable</span> waste, but <span class=\"k\">non-biodegradable</span> materials like plastic do not rot for centuries and pollute the environment. This is exactly why we must reduce our use of plastic."),

 ("ਅਸਮਾਨ ਦੀ ਢਾਲ", "The Shield in the Sky",
  "ਸਾਡੇ ਉੱਪਰ ਵਾਯੂਮੰਡਲ ਵਿੱਚ <span class=\"k\">ਓਜ਼ੋਨ</span> ਦੀ ਇੱਕ ਪਤਲੀ ਪਰਤ ਸਾਰੀ ਜ਼ਿੰਦਗੀ ਨੂੰ ਸੂਰਜ ਦੀਆਂ ਹਾਨੀਕਾਰਕ <span class=\"k\">ਪਰਾਬੈਂਗਣੀ (UV)</span> ਕਿਰਨਾਂ ਤੋਂ ਬਚਾਉਂਦੀ ਹੈ। ਪਰ ਫ਼੍ਰਿੱਜ ਤੇ ਏ.ਸੀ. ਵਿੱਚ ਵਰਤੇ ਜਾਂਦੇ <span class=\"k\">CFC</span> ਰਸਾਇਣ ਇਸ ਢਾਲ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਰਹੇ ਹਨ, ਜਿਸ ਨਾਲ ਇਸ ਵਿੱਚ ਛੇਕ ਬਣ ਗਿਆ। ਚੰਗੀ ਖ਼ਬਰ ਇਹ ਹੈ ਕਿ ਦੁਨੀਆਂ ਭਰ ਦੇ ਦੇਸ਼ਾਂ ਨੇ ਮਿਲ ਕੇ CFC ਘਟਾਏ ਹਨ ਤੇ ਓਜ਼ੋਨ ਪਰਤ ਹੌਲੀ-ਹੌਲੀ ਠੀਕ ਹੋ ਰਹੀ ਹੈ — ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਸਾਂਝੇ ਯਤਨ ਵਾਤਾਵਰਨ ਬਚਾ ਸਕਦੇ ਹਨ।",
  "High above us a thin layer of <span class=\"k\">ozone</span> shields all life from the Sun's harmful <span class=\"k\">ultraviolet (UV)</span> rays. But <span class=\"k\">CFC</span> chemicals used in fridges and air conditioners have damaged this shield, creating a hole in it. The good news is that countries worldwide joined together to cut CFCs, and the ozone layer is slowly healing \u2014 proof that shared effort can protect the environment."),
]

READINGS["14"] = [
 ("ਚੰਗਾ ਬਾਲਣ ਕੀ ਹੁੰਦਾ ਹੈ?", "What Makes a Good Fuel?",
  "ਹਰ ਮਸ਼ੀਨ ਤੇ ਸਰੀਰ ਨੂੰ ਚੱਲਣ ਲਈ ਊਰਜਾ ਚਾਹੀਦੀ ਹੈ, ਪਰ ਹਰ <span class=\"k\">ਊਰਜਾ ਸਰੋਤ</span> ਬਰਾਬਰ ਨਹੀਂ ਹੁੰਦਾ। ਇੱਕ ਚੰਗਾ ਬਾਲਣ ਬਹੁਤ ਸਾਰੀ ਗਰਮੀ ਦਿੰਦਾ ਹੈ (ਉੱਚ <span class=\"k\">ਕੈਲੋਰੀਮਾਨ</span>), ਸੌਖਾ ਮਿਲਦਾ ਹੈ, ਸਸਤਾ ਹੁੰਦਾ ਹੈ, ਸੰਭਾਲਣਾ ਸੁਰੱਖਿਅਤ ਹੁੰਦਾ ਹੈ ਤੇ ਬਲਣ ਵੇਲੇ ਘੱਟ ਧੂੰਆਂ ਤੇ ਸੁਆਹ ਛੱਡਦਾ ਹੈ। ਕੋਈ ਵੀ ਬਾਲਣ ਸੰਪੂਰਨ ਨਹੀਂ ਹੁੰਦਾ, ਇਸ ਲਈ ਸਾਨੂੰ ਲੋੜ ਅਨੁਸਾਰ ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ ਕਰਨੀ ਪੈਂਦੀ ਹੈ ਤੇ ਪ੍ਰਦੂਸ਼ਣ ਬਾਰੇ ਵੀ ਸੋਚਣਾ ਪੈਂਦਾ ਹੈ।",
  "Every machine and body needs energy to run, but not every <span class=\"k\">source of energy</span> is equal. A good fuel gives out a lot of heat (a high <span class=\"k\">calorific value</span>), is easy to get, is cheap, is safe to store, and leaves little smoke and ash when it burns. No fuel is perfect, so we must choose the best one for each need while also thinking about the pollution it causes."),

 ("ਸੂਰਜ ਦਾ ਤੋਹਫ਼ਾ", "The Sun's Gift",
  "ਸੂਰਜ ਧਰਤੀ ਦੀ ਲਗਭਗ ਸਾਰੀ ਊਰਜਾ ਦਾ ਮੂਲ ਸਰੋਤ ਹੈ। ਇਹ ਇੱਕ <span class=\"k\">ਨਵਿਆਉਣਯੋਗ (renewable)</span> ਸਰੋਤ ਹੈ ਜੋ ਅਰਬਾਂ ਸਾਲ ਚੱਲਦਾ ਰਹੇਗਾ। <span class=\"k\">ਸੋਲਰ ਸੈੱਲ</span> ਸੂਰਜ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਸਿੱਧੇ ਬਿਜਲੀ ਵਿੱਚ ਬਦਲਦੇ ਹਨ, ਤੇ <span class=\"k\">ਸੋਲਰ ਕੁੱਕਰ</span> ਤੇ ਵਾਟਰ ਹੀਟਰ ਇਸ ਦੀ ਗਰਮੀ ਵਰਤਦੇ ਹਨ। ਪੌਣ ਊਰਜਾ, ਪਾਣੀ ਊਰਜਾ ਤੇ ਬਾਇਓਮਾਸ ਵੀ ਅਸਲ ਵਿੱਚ ਸੂਰਜੀ ਊਰਜਾ ਦੇ ਹੀ ਰੂਪ ਹਨ। ਪਥਰਾਟ ਬਾਲਣਾਂ ਦੇ ਉਲਟ, ਇਹ ਸਰੋਤ ਖ਼ਤਮ ਨਹੀਂ ਹੁੰਦੇ ਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਘੱਟ ਪ੍ਰਦੂਸ਼ਿਤ ਕਰਦੇ ਹਨ।",
  "The Sun is the ultimate source of almost all of Earth's energy. It is a <span class=\"k\">renewable</span> source that will keep shining for billions of years. <span class=\"k\">Solar cells</span> turn sunlight directly into electricity, while solar cookers and water heaters use its heat. Wind, water and biomass energy are really forms of solar energy too. Unlike fossil fuels, these sources never run out and pollute far less."),

 ("ਪ੍ਰਮਾਣੂ ਦੇ ਅੰਦਰ ਦੀ ਸ਼ਕਤੀ", "The Power Inside the Atom",
  "ਪਰਮਾਣੂ ਦੇ ਨਿਊਕਲੀਅਸ ਵਿੱਚ ਬੇਹਿਸਾਬ ਊਰਜਾ ਲੁਕੀ ਹੁੰਦੀ ਹੈ। ਜਦੋਂ ਯੂਰੇਨੀਅਮ ਵਰਗੇ ਭਾਰੀ ਪਰਮਾਣੂ ਦਾ ਨਿਊਕਲੀਅਸ ਟੁੱਟਦਾ ਹੈ — ਇਸ ਨੂੰ <span class=\"k\">ਨਿਊਕਲੀ ਵਿਖੰਡਨ (fission)</span> ਕਹਿੰਦੇ ਹਨ — ਤਾਂ ਭਾਰੀ ਮਾਤਰਾ ਵਿੱਚ ਗਰਮੀ ਨਿਕਲਦੀ ਹੈ, ਜੋ ਬਿਜਲੀ ਬਣਾਉਣ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ। ਥੋੜ੍ਹਾ ਜਿਹਾ ਬਾਲਣ ਬਹੁਤ ਸਾਰੀ ਊਰਜਾ ਦਿੰਦਾ ਹੈ, ਪਰ ਇਸ ਦੇ ਵੱਡੇ ਖ਼ਤਰੇ ਵੀ ਹਨ: <span class=\"k\">ਰੇਡੀਓਐਕਟਿਵ ਕਚਰਾ</span> ਹਜ਼ਾਰਾਂ ਸਾਲ ਖ਼ਤਰਨਾਕ ਰਹਿੰਦਾ ਹੈ ਤੇ ਕਿਸੇ ਦੁਰਘਟਨਾ ਦੇ ਗੰਭੀਰ ਸਿੱਟੇ ਹੋ ਸਕਦੇ ਹਨ।",
  "Immense energy is locked inside an atom's nucleus. When the nucleus of a heavy atom like uranium is split \u2014 called nuclear <span class=\"k\">fission</span> \u2014 a huge amount of heat is released and used to make electricity. A tiny amount of fuel gives enormous energy, but there are serious risks: <span class=\"k\">radioactive waste</span> stays dangerous for thousands of years, and an accident can have grave consequences."),
]

READINGS["16"] = [
 ("ਸਾਡੀ ਸਾਂਝੀ ਦੌਲਤ", "Our Shared Wealth",
  "ਜੰਗਲ, ਪਾਣੀ, ਕੋਲਾ ਤੇ ਪੈਟਰੋਲੀਅਮ ਸਾਡੇ <span class=\"k\">ਕੁਦਰਤੀ ਸਾਧਨ</span> ਹਨ, ਜੋ ਸਾਰਿਆਂ ਦੀ ਸਾਂਝੀ ਦੌਲਤ ਹਨ। ਇਨ੍ਹਾਂ ਦੀ ਸੋਚ-ਸਮਝ ਕੇ ਵਰਤੋਂ ਨੂੰ <span class=\"k\">ਟਿਕਾਊ ਪ੍ਰਬੰਧਨ (sustainable management)</span> ਕਹਿੰਦੇ ਹਨ — ਭਾਵ ਇੰਨੀ ਵਰਤੋਂ ਕਿ ਸਾਡੀਆਂ ਲੋੜਾਂ ਵੀ ਪੂਰੀਆਂ ਹੋਣ ਤੇ ਆਉਣ ਵਾਲੀਆਂ ਪੀੜ੍ਹੀਆਂ ਲਈ ਵੀ ਬਚੇ। ਇਸ ਦਾ ਸਾਰ <span class=\"k\">ਤਿੰਨ R</span> ਵਿੱਚ ਹੈ: Reduce (ਘਟਾਓ), Reuse (ਮੁੜ ਵਰਤੋ), ਤੇ Recycle (ਪੁਨਰ-ਚਕਰਨ)। ਥੋੜ੍ਹੀ ਵਰਤੋਂ ਹੀ ਸਭ ਤੋਂ ਵੱਡੀ ਬਚਤ ਹੈ।",
  "Forests, water, coal and petroleum are our <span class=\"k\">natural resources</span> \u2014 wealth shared by everyone. Using them wisely is called <span class=\"k\">sustainable management</span>: using them enough to meet our needs while leaving some for future generations. Its essence is the <span class=\"k\">three R's</span>: Reduce, Reuse and Recycle. Using less is the greatest saving of all."),

 ("ਲੋਕਾਂ ਦੇ ਜੰਗਲ", "The People's Forests",
  "ਜੰਗਲ ਸਿਰਫ਼ ਰੁੱਖ ਨਹੀਂ; ਇਹ ਲੱਖਾਂ ਜੀਵਾਂ ਦੇ ਘਰ ਤੇ ਨੇੜਲੇ ਲੋਕਾਂ ਦੀ ਰੋਜ਼ੀ ਹਨ। ਇਸ ਲਈ ਜੰਗਲਾਂ ਦੀ ਸੰਭਾਲ ਵਿੱਚ ਸਥਾਨਕ ਭਾਈਚਾਰੇ ਦੀ ਭਾਗੀਦਾਰੀ ਜ਼ਰੂਰੀ ਹੈ। <span class=\"k\">ਚਿਪਕੋ ਅੰਦੋਲਨ</span> ਵਿੱਚ ਪਿੰਡਾਂ ਦੇ ਲੋਕ, ਖ਼ਾਸ ਕਰ ਔਰਤਾਂ, ਰੁੱਖਾਂ ਨੂੰ ਜੱਫੀ ਪਾ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕੱਟਣ ਤੋਂ ਬਚਾਉਂਦੇ ਸਨ। ਰਾਜਸਥਾਨ ਦੀ <span class=\"k\">ਬਿਸ਼ਨੋਈ</span> ਬਰਾਦਰੀ ਸਦੀਆਂ ਤੋਂ ਰੁੱਖਾਂ ਤੇ ਜੀਵਾਂ ਦੀ ਰੱਖਿਆ ਕਰਦੀ ਆਈ ਹੈ। ਇਹ ਦਿਖਾਉਂਦਾ ਹੈ ਕਿ ਸਥਾਨਕ ਲੋਕ ਜੰਗਲ ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਰਾਖੇ ਹਨ।",
  "A forest is more than trees; it is home to millions of creatures and a livelihood for nearby people. So conserving forests needs the participation of local communities. In the <span class=\"k\">Chipko movement</span>, villagers \u2014 especially women \u2014 hugged trees to stop them being felled. The <span class=\"k\">Bishnoi</span> community of Rajasthan has protected trees and animals for centuries. This shows that local people are often the best guardians of a forest."),

 ("ਮੀਂਹ ਦੀ ਹਰ ਬੂੰਦ", "Every Drop of Rain",
  "ਪਾਣੀ ਜੀਵਨ ਹੈ, ਪਰ ਸਾਫ਼ ਪਾਣੀ ਸੀਮਿਤ ਹੈ। ਸਦੀਆਂ ਤੋਂ ਭਾਰਤ ਦੇ ਲੋਕ <span class=\"k\">ਪਾਣੀ ਸੰਭਾਲ</span> ਲਈ ਸਿਆਣੇ ਢੰਗ ਵਰਤਦੇ ਆਏ ਹਨ। ਵੱਡੇ ਬੰਨ੍ਹ ਬਿਜਲੀ ਤੇ ਸਿੰਚਾਈ ਦਿੰਦੇ ਹਨ, ਪਰ ਇਹ ਲੋਕਾਂ ਨੂੰ ਉਜਾੜਦੇ ਵੀ ਹਨ ਤੇ ਵਾਤਾਵਰਨ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾਉਂਦੇ ਹਨ। ਇਸ ਦੇ ਮੁਕਾਬਲੇ <span class=\"k\">ਮੀਂਹ ਦੇ ਪਾਣੀ ਦੀ ਸੰਭਾਲ</span> ਤੇ ਛੋਟੇ ਤਲਾਬ ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਨੂੰ ਭਰਦੇ ਹਨ ਤੇ ਪਿੰਡ ਦੇ ਕਾਬੂ ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ। ਹਰ ਬੂੰਦ ਬਚਾਉਣਾ ਹੀ ਭਵਿੱਖ ਬਚਾਉਣਾ ਹੈ।",
  "Water is life, but clean water is limited. For centuries the people of India have used clever methods of <span class=\"k\">water harvesting</span>. Large dams provide electricity and irrigation, but they also displace people and harm the environment. In contrast, <span class=\"k\">rainwater harvesting</span> and small local ponds recharge the groundwater and stay under village control. Saving every drop is saving the future."),
]

# sanity: exactly 3 each
assert all(len(v) == 3 for v in READINGS.values()), {k: len(v) for k, v in READINGS.items()}
assert set(READINGS) == set(FILES), (set(FILES) - set(READINGS), set(READINGS) - set(FILES))
