/* BOLO.FLASH supplemental PSEB Class 10 Science concept content.

   overrides — upgrades legacy short-answer cards that predate bilingual
               explanations.
   cards     — 61 additional board-focused cards, balanced between scientific
               vocabulary recall and concept/application recall.
*/
(function () {
  "use strict";

  var overrides = {
    "Combination means join or break?": {
      q: "What happens in a combination reaction?",
      a: "Two or more reactants combine to form one product",
      pa: "ਦੋ ਜਾਂ ਵੱਧ ਅਭਿਕਾਰਕ ਮਿਲ ਕੇ ਇੱਕ ਉਤਪਾਦ ਬਣਾਉਂਦੇ ਹਨ",
      ex: "A combination reaction has multiple reactants but a single product, such as CaO + H2O -> Ca(OH)2.",
      exPa: "ਸੰਯੋਜਨ ਕਿਰਿਆ ਵਿੱਚ ਕਈ ਅਭਿਕਾਰਕ ਪਰ ਇੱਕ ਹੀ ਉਤਪਾਦ ਹੁੰਦਾ ਹੈ, ਜਿਵੇਂ CaO + H2O -> Ca(OH)2।"
    },
    "What is the valency of Aluminum (Al)?": {
      q: "What is the valency of aluminium (Al)?",
      pa: "3",
      ex: "Aluminium has three valence electrons and usually loses all three to form Al3+.",
      exPa: "ਐਲੂਮੀਨੀਅਮ ਦੇ ਤਿੰਨ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨ ਹੁੰਦੇ ਹਨ ਅਤੇ ਇਹ ਆਮ ਤੌਰ ਤੇ ਤਿੰਨੇ ਗੁਆ ਕੇ Al3+ ਬਣਾਉਂਦਾ ਹੈ।"
    },
    "What is the valency of Oxygen (O)?": {
      pa: "2",
      ex: "Oxygen needs two electrons to complete its outer shell, so its valency is 2.",
      exPa: "ਆਕਸੀਜਨ ਨੂੰ ਆਪਣਾ ਬਾਹਰੀ ਖੋਲ ਪੂਰਾ ਕਰਨ ਲਈ ਦੋ ਇਲੈਕਟ੍ਰਾਨ ਚਾਹੀਦੇ ਹਨ, ਇਸ ਲਈ ਇਸ ਦੀ ਸੰਯੋਜਕਤਾ 2 ਹੈ।"
    },
    "Cross the valencies (Al=3, O=2). What is the formula for Aluminum Oxide?": {
      q: "Cross the valencies (Al = 3, O = 2). What is the formula of aluminium oxide?",
      pa: "Al2O3",
      ex: "Two Al3+ ions balance three O2- ions, giving the neutral formula Al2O3.",
      exPa: "ਦੋ Al3+ ਆਇਨ ਤਿੰਨ O2- ਆਇਨਾਂ ਦੇ ਚਾਰਜ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਦੇ ਹਨ, ਇਸ ਲਈ ਸੂਤਰ Al2O3 ਹੈ।"
    },
    "Tooth decay starts when the pH of the mouth is lower than...": {
      pa: "5.5",
      ex: "Below pH 5.5, acids produced by bacteria begin dissolving tooth enamel.",
      exPa: "pH 5.5 ਤੋਂ ਘੱਟ ਹੋਣ ਤੇ ਬੈਕਟੀਰੀਆ ਵੱਲੋਂ ਬਣੇ ਤੇਜ਼ਾਬ ਦੰਦਾਂ ਦੀ ਇਨੈਮਲ ਨੂੰ ਘੋਲਣਾ ਸ਼ੁਰੂ ਕਰਦੇ ਹਨ।"
    },
    "What acid is injected during a bee sting?": {
      pa: "ਮੈਥਾਨੋਇਕ ਐਸਿਡ",
      ex: "At textbook level, the acidic sting is associated with methanoic acid and can be relieved with a mild base such as baking soda.",
      exPa: "ਪਾਠਕ੍ਰਮ ਅਨੁਸਾਰ ਮਧੂ-ਮੱਖੀ ਦੇ ਤੇਜ਼ਾਬੀ ਡੰਗ ਨੂੰ ਮੈਥਾਨੋਇਕ ਐਸਿਡ ਨਾਲ ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ ਅਤੇ ਬੇਕਿੰਗ ਸੋਡੇ ਵਰਗਾ ਹਲਕਾ ਖਾਰ ਰਾਹਤ ਦੇ ਸਕਦਾ ਹੈ।"
    },
    "Acids give which ion in water?": {
      pa: "H+ ਆਇਨ",
      ex: "Acids ionise in water to produce H+ ions, which exist mainly as hydronium ions, H3O+.",
      exPa: "ਤੇਜ਼ਾਬ ਪਾਣੀ ਵਿੱਚ ਆਇਨੀਕਰਨ ਕਰਕੇ H+ ਆਇਨ ਦਿੰਦੇ ਹਨ, ਜੋ ਮੁੱਖ ਤੌਰ ਤੇ ਹਾਈਡਰੋਨੀਅਮ H3O+ ਰੂਪ ਵਿੱਚ ਹੁੰਦੇ ਹਨ।"
    },
    "Bases give which ion in water?": {
      pa: "OH- ਆਇਨ",
      ex: "Bases dissociate or react with water to increase the concentration of hydroxide ions, OH-.",
      exPa: "ਖਾਰ ਪਾਣੀ ਵਿੱਚ ਵਿਘਟਿਤ ਜਾਂ ਕਿਰਿਆ ਕਰਕੇ ਹਾਈਡਰਾਕਸਾਈਡ OH- ਆਇਨਾਂ ਦੀ ਸੰਘਣਤਾ ਵਧਾਉਂਦੇ ਹਨ।"
    },
    "Acid + Metal gives...": {
      pa: "ਲੂਣ + ਹਾਈਡਰੋਜਨ ਗੈਸ",
      ex: "A reactive metal displaces hydrogen from a dilute acid, producing a salt and hydrogen gas.",
      exPa: "ਕਿਰਿਆਸ਼ੀਲ ਧਾਤ ਪਤਲੇ ਤੇਜ਼ਾਬ ਵਿੱਚੋਂ ਹਾਈਡਰੋਜਨ ਨੂੰ ਵਿਸਥਾਪਿਤ ਕਰਕੇ ਲੂਣ ਅਤੇ ਹਾਈਡਰੋਜਨ ਗੈਸ ਬਣਾਉਂਦੀ ਹੈ।"
    },
    "What is the formula for Bleaching Powder?": {
      pa: "CaOCl2",
      ex: "Bleaching powder is represented in Class 10 chemistry by the formula CaOCl2.",
      exPa: "ਦਸਵੀਂ ਜਮਾਤ ਦੀ ਰਸਾਇਣ ਵਿਗਿਆਨ ਵਿੱਚ ਬਲੀਚਿੰਗ ਪਾਊਡਰ ਦਾ ਸੂਤਰ CaOCl2 ਲਿਖਿਆ ਜਾਂਦਾ ਹੈ।"
    },
    "Heating Gypsum to 373K produces what?": {
      pa: "ਪਲਾਸਟਰ ਆਫ ਪੈਰਿਸ",
      ex: "Heating gypsum at about 373 K removes part of its water of crystallisation and forms calcium sulphate hemihydrate.",
      exPa: "ਜਿਪਸਮ ਨੂੰ ਲਗਭਗ 373 K ਤੇ ਗਰਮ ਕਰਨ ਨਾਲ ਕ੍ਰਿਸਟਲੀ ਜਲ ਦਾ ਕੁਝ ਹਿੱਸਾ ਨਿਕਲ ਜਾਂਦਾ ਹੈ ਅਤੇ ਕੈਲਸ਼ੀਅਮ ਸਲਫੇਟ ਹੇਮੀਹਾਈਡਰੇਟ ਬਣਦਾ ਹੈ।"
    },
    "What mild base is used as an antacid?": {
      pa: "ਮਿਲਕ ਆਫ ਮੈਗਨੀਸ਼ੀਆ",
      ex: "Milk of magnesia, Mg(OH)2, neutralises excess acid in the stomach.",
      exPa: "ਮਿਲਕ ਆਫ ਮੈਗਨੀਸ਼ੀਆ Mg(OH)2 ਪੇਟ ਦੇ ਵਾਧੂ ਤੇਜ਼ਾਬ ਨੂੰ ਉਦਾਸੀਨ ਕਰਦਾ ਹੈ।"
    },
    "Should you add acid to water or water to acid?": {
      pa: "ਤੇਜ਼ਾਬ ਨੂੰ ਹੌਲੀ-ਹੌਲੀ ਪਾਣੀ ਵਿੱਚ ਪਾਓ",
      ex: "Always add acid slowly to water because dilution releases heat; adding water to concentrated acid can cause dangerous splashing.",
      exPa: "ਤੇਜ਼ਾਬ ਨੂੰ ਹਮੇਸ਼ਾ ਹੌਲੀ-ਹੌਲੀ ਪਾਣੀ ਵਿੱਚ ਪਾਓ ਕਿਉਂਕਿ ਪਤਲਾ ਕਰਨ ਸਮੇਂ ਤਾਪ ਨਿਕਲਦਾ ਹੈ; ਸੰਘਣੇ ਤੇਜ਼ਾਬ ਵਿੱਚ ਪਾਣੀ ਪਾਉਣ ਨਾਲ ਛਿੱਟੇ ਪੈ ਸਕਦੇ ਹਨ।"
    },
    "An acid that completely ionizes in water is called?": {
      pa: "ਪ੍ਰਬਲ ਤੇਜ਼ਾਬ",
      ex: "A strong acid ionises almost completely in aqueous solution, producing a high concentration of hydronium ions.",
      exPa: "ਪ੍ਰਬਲ ਤੇਜ਼ਾਬ ਜਲੀ ਘੋਲ ਵਿੱਚ ਲਗਭਗ ਪੂਰੀ ਤਰ੍ਹਾਂ ਆਇਨੀਕਰਨ ਕਰਕੇ ਹਾਈਡਰੋਨੀਅਮ ਆਇਨਾਂ ਦੀ ਵੱਧ ਸੰਘਣਤਾ ਦਿੰਦਾ ਹੈ।"
    },
    "What color does phenolphthalein turn in an acidic solution?": {
      pa: "ਰੰਗਹੀਣ",
      ex: "Phenolphthalein is colourless in acidic and neutral solutions but turns pink in a basic solution.",
      exPa: "ਫੀਨੋਲਫਥੇਲੀਨ ਤੇਜ਼ਾਬੀ ਅਤੇ ਉਦਾਸੀਨ ਘੋਲ ਵਿੱਚ ਰੰਗਹੀਣ ਹੁੰਦੀ ਹੈ, ਪਰ ਖਾਰੀ ਘੋਲ ਵਿੱਚ ਗੁਲਾਬੀ ਹੋ ਜਾਂਦੀ ਹੈ।"
    },
    "What gas is usually produced when an acid reacts with a carbonate?": {
      pa: "ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ",
      ex: "Acid plus carbonate produces a salt, water, and carbon dioxide, which turns limewater milky.",
      exPa: "ਤੇਜ਼ਾਬ ਅਤੇ ਕਾਰਬੋਨੇਟ ਦੀ ਕਿਰਿਆ ਨਾਲ ਲੂਣ, ਪਾਣੀ ਅਤੇ ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ ਬਣਦੇ ਹਨ; ਇਹ ਗੈਸ ਚੂਨੇ ਦੇ ਪਾਣੀ ਨੂੰ ਦੁੱਧੀਆ ਕਰਦੀ ਹੈ।"
    },
    "What is the common name of Sodium bicarbonate?": {
      pa: "ਬੇਕਿੰਗ ਸੋਡਾ",
      ex: "Sodium hydrogencarbonate, NaHCO3, is commonly called baking soda.",
      exPa: "ਸੋਡੀਅਮ ਹਾਈਡਰੋਜਨਕਾਰਬੋਨੇਟ NaHCO3 ਦਾ ਆਮ ਨਾਮ ਬੇਕਿੰਗ ਸੋਡਾ ਹੈ।"
    },
    "Which acid is present in curd?": {
      pa: "ਲੈਕਟਿਕ ਐਸਿਡ",
      ex: "Lactic acid formed by bacterial action gives curd its characteristic sour taste.",
      exPa: "ਬੈਕਟੀਰੀਆ ਦੀ ਕਿਰਿਆ ਨਾਲ ਬਣਿਆ ਲੈਕਟਿਕ ਐਸਿਡ ਦਹੀਂ ਨੂੰ ਖੱਟਾ ਸੁਆਦ ਦਿੰਦਾ ਹੈ।"
    },
    "Metal oxides are basic or acidic in nature?": {
      pa: "ਆਮ ਤੌਰ ਤੇ ਖਾਰੀ",
      ex: "Most metal oxides are basic, although oxides such as Al2O3 and ZnO are amphoteric.",
      exPa: "ਜ਼ਿਆਦਾਤਰ ਧਾਤ ਆਕਸਾਈਡ ਖਾਰੀ ਹੁੰਦੇ ਹਨ, ਹਾਲਾਂਕਿ Al2O3 ਅਤੇ ZnO ਵਰਗੇ ਆਕਸਾਈਡ ਉਭੈਧਰਮੀ ਹਨ।"
    },
    "Non-metal oxides are basic or acidic in nature?": {
      pa: "ਆਮ ਤੌਰ ਤੇ ਤੇਜ਼ਾਬੀ",
      ex: "Most non-metal oxides are acidic, while a few such as CO and NO are neutral.",
      exPa: "ਜ਼ਿਆਦਾਤਰ ਅਧਾਤ ਆਕਸਾਈਡ ਤੇਜ਼ਾਬੀ ਹੁੰਦੇ ਹਨ, ਜਦਕਿ CO ਅਤੇ NO ਵਰਗੇ ਕੁਝ ਆਕਸਾਈਡ ਉਦਾਸੀਨ ਹਨ।"
    },
    "Malleable means...": {
      pa: "ਪਤਲੀਆਂ ਚਾਦਰਾਂ ਵਿੱਚ ਕੁੱਟਿਆ ਜਾ ਸਕਣਾ",
      ex: "Malleability is the property that allows a material to be hammered or rolled into thin sheets.",
      exPa: "ਕੁਟੀਣਯੋਗਤਾ ਉਹ ਗੁਣ ਹੈ ਜਿਸ ਨਾਲ ਕਿਸੇ ਪਦਾਰਥ ਨੂੰ ਕੁੱਟ ਕੇ ਜਾਂ ਰੋਲ ਕਰਕੇ ਪਤਲੀਆਂ ਚਾਦਰਾਂ ਬਣਾਈਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।"
    },
    "Ductile means...": {
      pa: "ਪਤਲੀਆਂ ਤਾਰਾਂ ਵਿੱਚ ਖਿੱਚਿਆ ਜਾ ਸਕਣਾ",
      ex: "Ductility is the property that allows a material to be drawn into thin wires.",
      exPa: "ਤਣਨਯੋਗਤਾ ਉਹ ਗੁਣ ਹੈ ਜਿਸ ਨਾਲ ਕਿਸੇ ਪਦਾਰਥ ਨੂੰ ਖਿੱਚ ਕੇ ਪਤਲੀਆਂ ਤਾਰਾਂ ਬਣਾਈਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ।"
    },
    "Why do ionic compounds have high melting points?": {
      pa: "ਆਇਨਾਂ ਵਿਚਕਾਰ ਮਜ਼ਬੂਤ ਸਥਿਰ-ਬਿਜਲੀ ਆਕਰਸ਼ਣ",
      ex: "A large amount of energy is needed to overcome the strong electrostatic forces holding oppositely charged ions together.",
      exPa: "ਵਿਰੋਧੀ ਚਾਰਜ ਵਾਲੇ ਆਇਨਾਂ ਨੂੰ ਜੋੜ ਕੇ ਰੱਖਣ ਵਾਲੀਆਂ ਮਜ਼ਬੂਤ ਸਥਿਰ-ਬਿਜਲੀ ਬਲਾਂ ਨੂੰ ਤੋੜਨ ਲਈ ਬਹੁਤ ਊਰਜਾ ਚਾਹੀਦੀ ਹੈ।"
    },
    "What reaction is used to join railway tracks?": {
      pa: "ਥਰਮਿਟ ਕਿਰਿਆ",
      ex: "The highly exothermic reduction of iron oxide by aluminium produces molten iron that welds railway tracks.",
      exPa: "ਐਲੂਮੀਨੀਅਮ ਦੁਆਰਾ ਆਇਰਨ ਆਕਸਾਈਡ ਦੀ ਬਹੁਤ ਊਸ਼ਮਾਕਸ਼ੇਪੀ ਅਪਚਯ ਕਿਰਿਆ ਪਿਘਲਾ ਲੋਹਾ ਬਣਾਉਂਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਰੇਲ ਪਟੜੀਆਂ ਜੋੜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।"
    },
    "In electrolytic refining, pure metal deposits on the...": {
      pa: "ਕੈਥੋਡ",
      ex: "The impure metal is the anode, a thin sheet of pure metal is the cathode, and pure metal deposits on the cathode.",
      exPa: "ਅਸ਼ੁੱਧ ਧਾਤ ਐਨੋਡ ਅਤੇ ਸ਼ੁੱਧ ਧਾਤ ਦੀ ਪਤਲੀ ਚਾਦਰ ਕੈਥੋਡ ਹੁੰਦੀ ਹੈ; ਸ਼ੁੱਧ ਧਾਤ ਕੈਥੋਡ ਉੱਤੇ ਜਮਦੀ ਹੈ।"
    },
    "Which metals react only with steam?": {
      pa: "ਐਲੂਮੀਨੀਅਮ, ਜ਼ਿੰਕ ਅਤੇ ਲੋਹਾ",
      ex: "In the Class 10 reactivity series, aluminium, zinc, and iron do not react with cold or hot water but react with steam to form oxide and hydrogen.",
      exPa: "ਦਸਵੀਂ ਜਮਾਤ ਦੀ ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ ਅਨੁਸਾਰ ਐਲੂਮੀਨੀਅਮ, ਜ਼ਿੰਕ ਅਤੇ ਲੋਹਾ ਠੰਡੇ ਜਾਂ ਗਰਮ ਪਾਣੀ ਨਾਲ ਨਹੀਂ, ਪਰ ਭਾਫ਼ ਨਾਲ ਕਿਰਿਆ ਕਰਕੇ ਆਕਸਾਈਡ ਅਤੇ ਹਾਈਡਰੋਜਨ ਬਣਾਉਂਦੇ ਹਨ।"
    },
    "Brass is an alloy of Copper and what?": {
      pa: "ਜ਼ਿੰਕ",
      ex: "Brass is mainly an alloy of copper and zinc.",
      exPa: "ਪੀਤਲ ਮੁੱਖ ਤੌਰ ਤੇ ਤਾਂਬੇ ਅਤੇ ਜ਼ਿੰਕ ਦੀ ਮਿਸ਼ਰ ਧਾਤ ਹੈ।"
    },
    "Heating a carbonate ore in limited air is called?": {
      pa: "ਕੈਲਸੀਨੇਸ਼ਨ",
      ex: "Calcination heats a carbonate ore in limited or no air to convert it into its oxide.",
      exPa: "ਕੈਲਸੀਨੇਸ਼ਨ ਵਿੱਚ ਕਾਰਬੋਨੇਟ ਅਯਸਕ ਨੂੰ ਘੱਟ ਜਾਂ ਬਿਨਾਂ ਹਵਾ ਦੇ ਗਰਮ ਕਰਕੇ ਉਸ ਦਾ ਆਕਸਾਈਡ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ।"
    },
    "What is the process of heating a sulphide ore in excess air called?": {
      pa: "ਰੋਸਟਿੰਗ",
      ex: "Roasting heats a sulphide ore strongly in excess air to convert it mainly into the metal oxide.",
      exPa: "ਰੋਸਟਿੰਗ ਵਿੱਚ ਸਲਫਾਈਡ ਅਯਸਕ ਨੂੰ ਵਾਧੂ ਹਵਾ ਵਿੱਚ ਤੇਜ਼ ਗਰਮ ਕਰਕੇ ਮੁੱਖ ਤੌਰ ਤੇ ਧਾਤ ਆਕਸਾਈਡ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ।"
    },
    "Which non-metal is lustrous (shiny)?": {
      pa: "ਆਇਓਡੀਨ",
      ex: "Iodine is a non-metal with a lustrous surface, making it a standard exception to the usual dull appearance of non-metals.",
      exPa: "ਆਇਓਡੀਨ ਚਮਕਦਾਰ ਸਤਹ ਵਾਲੀ ਅਧਾਤ ਹੈ, ਇਸ ਲਈ ਇਹ ਅਧਾਤਾਂ ਦੇ ਆਮ ਫਿੱਕੇ ਰੂਪ ਦਾ ਪ੍ਰਮੁੱਖ ਅਪਵਾਦ ਹੈ।"
    },
    "Which metal is the best conductor of electricity?": {
      pa: "ਚਾਂਦੀ",
      ex: "Silver has the highest electrical conductivity among metals, though copper is used more widely because it is cheaper.",
      exPa: "ਧਾਤਾਂ ਵਿੱਚ ਚਾਂਦੀ ਦੀ ਬਿਜਲੀ ਚਾਲਕਤਾ ਸਭ ਤੋਂ ਵੱਧ ਹੈ, ਪਰ ਘੱਟ ਕੀਮਤ ਕਾਰਨ ਤਾਂਬਾ ਵੱਧ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ।"
    },
    "Corrosion of copper forms a layer of what color?": {
      pa: "ਹਰਾ",
      ex: "Copper develops a green coating of basic copper carbonate after slow reaction with moist air and carbon dioxide.",
      exPa: "ਤਾਂਬਾ ਨਮੀ ਵਾਲੀ ਹਵਾ ਅਤੇ ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ ਨਾਲ ਹੌਲੀ ਕਿਰਿਆ ਕਰਕੇ ਬੇਸਿਕ ਕਾਪਰ ਕਾਰਬੋਨੇਟ ਦੀ ਹਰੀ ਪਰਤ ਬਣਾਉਂਦਾ ਹੈ।"
    },
    "Compounds with the same molecular formula but different structures are called...": {
      pa: "ਸੰਰਚਨਾਤਮਕ ਸਮਾਵਯਵੀ",
      ex: "Structural isomers have the same molecular formula but different arrangements of atoms and therefore different structures.",
      exPa: "ਸੰਰਚਨਾਤਮਕ ਸਮਾਵਯਵੀਆਂ ਦਾ ਅਣੂ ਸੂਤਰ ਇੱਕੋ ਹੁੰਦਾ ਹੈ ਪਰ ਪਰਮਾਣੂਆਂ ਦੀ ਵਿਵਸਥਾ ਅਤੇ ਸੰਰਚਨਾ ਵੱਖਰੀ ਹੁੰਦੀ ਹੈ।"
    },
    "Atomic size across a period (left to right)...": {
      pa: "ਘਟਦਾ ਹੈ",
      ex: "Across a period, increasing nuclear charge pulls electrons in the same shell closer, so atomic size generally decreases.",
      exPa: "ਪੀਰੀਅਡ ਵਿੱਚ ਖੱਬੇ ਤੋਂ ਸੱਜੇ ਨਾਭਿਕੀ ਚਾਰਜ ਵਧਦਾ ਹੈ ਅਤੇ ਉਸੇ ਖੋਲ ਦੇ ਇਲੈਕਟ੍ਰਾਨ ਨੇੜੇ ਖਿੱਚੇ ਜਾਂਦੇ ਹਨ, ਇਸ ਲਈ ਪਰਮਾਣੂ ਆਕਾਰ ਆਮ ਤੌਰ ਤੇ ਘਟਦਾ ਹੈ।"
    },
    "Atomic size down a group (top to bottom)...": {
      pa: "ਵਧਦਾ ਹੈ",
      ex: "Each step down a group adds a new electron shell, so atomic size generally increases.",
      exPa: "ਗਰੁੱਪ ਵਿੱਚ ਹੇਠਾਂ ਜਾਣ ਨਾਲ ਹਰ ਕਦਮ ਤੇ ਨਵਾਂ ਇਲੈਕਟ੍ਰਾਨ ਖੋਲ ਜੁੜਦਾ ਹੈ, ਇਸ ਲਈ ਪਰਮਾਣੂ ਆਕਾਰ ਆਮ ਤੌਰ ਤੇ ਵਧਦਾ ਹੈ।"
    },
    "Does metallic character increase or decrease down a group?": {
      pa: "ਵਧਦਾ ਹੈ",
      ex: "Down a group, outer electrons are farther from the nucleus and are lost more easily, so metallic character increases.",
      exPa: "ਗਰੁੱਪ ਵਿੱਚ ਹੇਠਾਂ ਬਾਹਰੀ ਇਲੈਕਟ੍ਰਾਨ ਨਾਭਿਕ ਤੋਂ ਦੂਰ ਹੁੰਦੇ ਹਨ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਨਿਕਲਦੇ ਹਨ, ਇਸ ਲਈ ਧਾਤਵੀ ਗੁਣ ਵਧਦਾ ਹੈ।"
    },
    "Does metallic character increase or decrease across a period (left to right)?": {
      pa: "ਘਟਦਾ ਹੈ",
      ex: "Across a period, atoms hold their valence electrons more strongly, so the tendency to lose electrons and metallic character decrease.",
      exPa: "ਪੀਰੀਅਡ ਵਿੱਚ ਖੱਬੇ ਤੋਂ ਸੱਜੇ ਪਰਮਾਣੂ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨਾਂ ਨੂੰ ਵੱਧ ਮਜ਼ਬੂਤੀ ਨਾਲ ਫੜਦੇ ਹਨ, ਇਸ ਲਈ ਇਲੈਕਟ੍ਰਾਨ ਗੁਆਉਣ ਦੀ ਪ੍ਰਵਿਰਤੀ ਅਤੇ ਧਾਤਵੀ ਗੁਣ ਘਟਦੇ ਹਨ।"
    },
    "Which type of current periodically reverses its direction, unlike the current from a cell?": {
      ex: "Alternating current changes direction periodically. A 50 Hz supply completes 50 cycles each second and reverses direction twice per cycle.",
      exPa: "ਪਰਿਵਰਤਨਸ਼ੀਲ ਧਾਰਾ ਸਮੇਂ-ਸਮੇਂ ਤੇ ਦਿਸ਼ਾ ਬਦਲਦੀ ਹੈ। 50 Hz ਸਪਲਾਈ ਹਰ ਸਕਿੰਟ 50 ਚੱਕਰ ਪੂਰੇ ਕਰਦੀ ਹੈ ਅਤੇ ਹਰ ਚੱਕਰ ਵਿੱਚ ਦੋ ਵਾਰ ਦਿਸ਼ਾ ਬਦਲਦੀ ਹੈ।"
    },
    "What is the frequency of AC supply in India?": {
      ex: "The standard mains frequency in India is 50 Hz, meaning 50 complete alternating-current cycles each second.",
      exPa: "ਭਾਰਤ ਵਿੱਚ ਮਿਆਰੀ ਮੇਨਜ਼ ਆਵਿਰਤੀ 50 Hz ਹੈ, ਅਰਥਾਤ ਹਰ ਸਕਿੰਟ ਪਰਿਵਰਤਨਸ਼ੀਲ ਧਾਰਾ ਦੇ 50 ਪੂਰੇ ਚੱਕਰ।"
    },
    "The commercial unit of electrical energy is the ___?": {
      q: "How many joules of energy equal one commercial unit of electricity?",
      a: "3.6 x 10^6 joules",
      pa: "3.6 x 10^6 ਜੂਲ",
      ex: "One commercial unit is 1 kWh = 1000 W x 3600 s = 3.6 x 10^6 J.",
      exPa: "ਇੱਕ ਵਪਾਰਕ ਯੂਨਿਟ 1 kWh = 1000 W x 3600 s = 3.6 x 10^6 J ਹੁੰਦਾ ਹੈ।"
    },
    "According to Ohm's Law, what physical condition must stay constant while measuring V and I?": {
      q: "What must remain constant when verifying Ohm's law?",
      a: "Temperature of the conductor",
      pa: "ਚਾਲਕ ਦਾ ਤਾਪਮਾਨ",
      ex: "For a given conductor, V is directly proportional to I only while its temperature and other physical conditions remain constant.",
      exPa: "ਦਿੱਤੇ ਚਾਲਕ ਲਈ V ਸਿਰਫ਼ ਤਦੋਂ I ਦੇ ਸਿੱਧੇ ਅਨੁਪਾਤ ਵਿੱਚ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਇਸ ਦਾ ਤਾਪਮਾਨ ਅਤੇ ਹੋਰ ਭੌਤਿਕ ਹਾਲਤਾਂ ਸਥਿਰ ਰਹਿਣ।"
    },
    "Name one traditional water harvesting system.": {
      q: "Which traditional Rajasthan system stores runoff behind a long earthen embankment for farming?",
      a: "Khadin",
      pa: "ਖਾਦੀਨ",
      ex: "A khadin captures runoff behind an earthen bund so water slowly soaks into agricultural soil.",
      exPa: "ਖਾਦੀਨ ਮਿੱਟੀ ਦੇ ਬੰਨ੍ਹ ਪਿੱਛੇ ਵਹਿੰਦਾ ਪਾਣੀ ਰੋਕਦਾ ਹੈ ਤਾਂ ਜੋ ਇਹ ਹੌਲੀ-ਹੌਲੀ ਖੇਤੀਬਾੜੀ ਵਾਲੀ ਮਿੱਟੀ ਵਿੱਚ ਸਮਾ ਜਾਵੇ।"
    },
    "Who hugged trees during the Chipko movement?": {
      q: "Who protected trees by embracing them during the Chipko movement?",
      a: "Village women and local communities",
      pa: "ਪਿੰਡ ਦੀਆਂ ਔਰਤਾਂ ਅਤੇ ਸਥਾਨਕ ਭਾਈਚਾਰੇ",
      ex: "Local villagers, prominently women, embraced trees to resist commercial felling and protect community forest resources.",
      exPa: "ਸਥਾਨਕ ਪਿੰਡ ਵਾਸੀਆਂ, ਖ਼ਾਸ ਕਰ ਔਰਤਾਂ, ਨੇ ਵਪਾਰਕ ਕਟਾਈ ਦਾ ਵਿਰੋਧ ਕਰਨ ਅਤੇ ਜੰਗਲੀ ਸਰੋਤ ਬਚਾਉਣ ਲਈ ਰੁੱਖਾਂ ਨੂੰ ਜੱਫੀ ਪਾਈ।"
    }
  };

  var cards = [
    { ch: 1, q: "Why is a magnesium ribbon cleaned before it is burned?", a: "To remove the magnesium oxide coating", pa: "ਮੈਗਨੀਸ਼ੀਅਮ ਆਕਸਾਈਡ ਦੀ ਪਰਤ ਹਟਾਉਣ ਲਈ", ex: "The oxide coating blocks direct contact between magnesium and oxygen; rubbing exposes fresh metal so it burns readily.", exPa: "ਆਕਸਾਈਡ ਦੀ ਪਰਤ ਮੈਗਨੀਸ਼ੀਅਮ ਅਤੇ ਆਕਸੀਜਨ ਦਾ ਸਿੱਧਾ ਸੰਪਰਕ ਰੋਕਦੀ ਹੈ; ਰਗੜਨ ਨਾਲ ਤਾਜ਼ਾ ਧਾਤ ਖੁੱਲ੍ਹ ਜਾਂਦੀ ਹੈ ਅਤੇ ਆਸਾਨੀ ਨਾਲ ਸੜਦੀ ਹੈ.", vvip: true },
    { ch: 1, q: "What is observed when lead nitrate solution is mixed with potassium iodide solution?", a: "A yellow precipitate of lead iodide forms", pa: "ਲੈੱਡ ਆਇਓਡਾਈਡ ਦਾ ਪੀਲਾ ਅਵਖੇਪ ਬਣਦਾ ਹੈ", ex: "This double displacement reaction produces insoluble yellow PbI2 while potassium nitrate remains in solution.", exPa: "ਇਸ ਦੋਹਰੇ ਵਿਸਥਾਪਨ ਕਿਰਿਆ ਵਿੱਚ ਅਘੁਲਣਸ਼ੀਲ ਪੀਲਾ PbI2 ਬਣਦਾ ਹੈ ਅਤੇ ਪੋਟਾਸ਼ੀਅਮ ਨਾਈਟਰੇਟ ਘੋਲ ਵਿੱਚ ਰਹਿੰਦਾ ਹੈ.", vvip: true },

    { ch: 2, q: "Why does dry hydrogen chloride gas not change the colour of dry blue litmus paper?", a: "HCl produces acidic ions only in the presence of water", pa: "HCl ਕੇਵਲ ਪਾਣੀ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਤੇਜ਼ਾਬੀ ਆਇਨ ਬਣਾਉਂਦਾ ਹੈ", ex: "Without water, HCl cannot ionise to form hydronium ions, so dry litmus shows no colour change.", exPa: "ਪਾਣੀ ਤੋਂ ਬਿਨਾਂ HCl ਆਇਨੀਕਰਨ ਕਰਕੇ ਹਾਈਡਰੋਨੀਅਮ ਆਇਨ ਨਹੀਂ ਬਣਾ ਸਕਦਾ, ਇਸ ਲਈ ਸੁੱਕੇ ਲਿਟਮਸ ਦਾ ਰੰਗ ਨਹੀਂ ਬਦਲਦਾ.", vvip: true },
    { ch: 2, q: "Which gas is released at the cathode during the chlor-alkali process?", a: "Hydrogen gas", pa: "ਹਾਈਡਰੋਜਨ ਗੈਸ", ex: "Electrolysis of brine gives chlorine at the anode, hydrogen at the cathode, and sodium hydroxide in solution.", exPa: "ਬਰਾਈਨ ਦੇ ਬਿਜਲੀ ਅਪਘਟਨ ਨਾਲ ਐਨੋਡ ਤੇ ਕਲੋਰੀਨ, ਕੈਥੋਡ ਤੇ ਹਾਈਡਰੋਜਨ ਅਤੇ ਘੋਲ ਵਿੱਚ ਸੋਡੀਅਮ ਹਾਈਡਰਾਕਸਾਈਡ ਬਣਦੇ ਹਨ.", vvip: true },

    { ch: 3, q: "How are highly reactive metals such as sodium and aluminium extracted from their compounds?", a: "By electrolytic reduction of their molten compounds", pa: "ਉਨ੍ਹਾਂ ਦੇ ਪਿਘਲੇ ਯੋਗਿਕਾਂ ਦੇ ਬਿਜਲੀ ਅਪਘਟਨੀ ਅਪਚਯ ਦੁਆਰਾ", ex: "Metals high in the reactivity series cannot be reduced by carbon, so electricity is used to obtain them.", exPa: "ਕਿਰਿਆਸ਼ੀਲਤਾ ਲੜੀ ਦੇ ਉੱਪਰਲੇ ਧਾਤਾਂ ਨੂੰ ਕਾਰਬਨ ਨਾਲ ਅਪਚਿਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਇਸ ਲਈ ਉਨ੍ਹਾਂ ਨੂੰ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਬਿਜਲੀ ਵਰਤੀ ਜਾਂਦੀ ਹੈ.", vvip: true },
    { ch: 3, q: "In what volume ratio are concentrated hydrochloric acid and nitric acid mixed to make aqua regia?", a: "3:1", pa: "3:1", ex: "Aqua regia contains three parts concentrated HCl and one part concentrated HNO3 and can dissolve gold.", exPa: "ਐਕਵਾ ਰੀਜੀਆ ਵਿੱਚ ਤਿੰਨ ਹਿੱਸੇ ਸੰਘਣਾ HCl ਅਤੇ ਇੱਕ ਹਿੱਸਾ ਸੰਘਣਾ HNO3 ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਹ ਸੋਨੇ ਨੂੰ ਘੋਲ ਸਕਦਾ ਹੈ.", vvip: true },

    { ch: 4, q: "Why can carbon form four covalent bonds?", a: "It has a valency of four", pa: "ਇਸ ਦੀ ਸੰਯੋਜਕਤਾ ਚਾਰ ਹੈ", ex: "Carbon has four valence electrons and completes its octet by sharing four electrons, producing four covalent bonds.", exPa: "ਕਾਰਬਨ ਦੇ ਚਾਰ ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨ ਹਨ ਅਤੇ ਚਾਰ ਇਲੈਕਟ੍ਰਾਨ ਸਾਂਝੇ ਕਰਕੇ ਅੱਠਕ ਪੂਰਾ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਚਾਰ ਸਹਿ-ਸੰਯੋਜਕ ਬੰਧ ਬਣਾਉਂਦਾ ਹੈ.", vvip: true },
    { ch: 4, q: "By which group do two successive members of a homologous series differ?", a: "A CH2 group", pa: "ਇੱਕ CH2 ਸਮੂਹ", ex: "Successive homologues differ by CH2, so their molecular masses differ by 14 u.", exPa: "ਸਮਜਾਤੀ ਲੜੀ ਦੇ ਲਗਾਤਾਰ ਮੈਂਬਰਾਂ ਵਿੱਚ CH2 ਦਾ ਅੰਤਰ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਉਨ੍ਹਾਂ ਦੇ ਅਣੂ ਭਾਰ ਵਿੱਚ 14 u ਦਾ ਅੰਤਰ ਹੁੰਦਾ ਹੈ.", vvip: true },
    { ch: 4, q: "Which catalyst is commonly used to hydrogenate vegetable oils?", a: "Nickel", pa: "ਨਿਕਲ", ex: "Hydrogen is added across carbon-carbon double bonds in the presence of nickel to convert unsaturated oil into a more saturated fat.", exPa: "ਨਿਕਲ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਹਾਈਡਰੋਜਨ ਕਾਰਬਨ-ਕਾਰਬਨ ਦੋਹਰੇ ਬੰਧਾਂ ਨਾਲ ਜੁੜ ਕੇ ਅਸੰਤ੍ਰਿਪਤ ਤੇਲ ਨੂੰ ਵੱਧ ਸੰਤ੍ਰਿਪਤ ਚਰਬੀ ਵਿੱਚ ਬਦਲਦਾ ਹੈ.", vvip: true },

    { ch: 5, q: "What is the fundamental basis of the modern periodic table?", a: "Increasing atomic number", pa: "ਵਧਦਾ ਪਰਮਾਣੂ ਅੰਕ", ex: "The modern periodic law states that element properties are periodic functions of atomic number.", exPa: "ਆਧੁਨਿਕ ਆਵਰਤੀ ਨਿਯਮ ਅਨੁਸਾਰ ਤੱਤਾਂ ਦੇ ਗੁਣ ਪਰਮਾਣੂ ਅੰਕ ਦੇ ਆਵਰਤੀ ਫਲ ਹਨ.", vvip: true },
    { ch: 5, q: "What common electronic feature do elements in the same group usually have?", a: "The same number of valence electrons", pa: "ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨਾਂ ਦੀ ਇੱਕੋ ਗਿਣਤੀ", ex: "A shared valence-electron count gives group elements similar chemical properties.", exPa: "ਸੰਯੋਜਕ ਇਲੈਕਟ੍ਰਾਨਾਂ ਦੀ ਇੱਕੋ ਗਿਣਤੀ ਕਾਰਨ ਇੱਕ ਗਰੁੱਪ ਦੇ ਤੱਤਾਂ ਦੇ ਰਸਾਇਣਕ ਗੁਣ ਮਿਲਦੇ-ਜੁਲਦੇ ਹੁੰਦੇ ਹਨ.", vvip: true },
    { ch: 5, q: "What does the period number tell us about an atom?", a: "The number of occupied electron shells", pa: "ਭਰੇ ਹੋਏ ਇਲੈਕਟ੍ਰਾਨ ਖੋਲਾਂ ਦੀ ਗਿਣਤੀ", ex: "All elements in one period have the same number of occupied shells, equal to the period number.", exPa: "ਇੱਕੋ ਪੀਰੀਅਡ ਦੇ ਸਾਰੇ ਤੱਤਾਂ ਵਿੱਚ ਭਰੇ ਹੋਏ ਖੋਲਾਂ ਦੀ ਗਿਣਤੀ ਇੱਕੋ ਅਤੇ ਪੀਰੀਅਡ ਅੰਕ ਦੇ ਬਰਾਬਰ ਹੁੰਦੀ ਹੈ.", vvip: true },

    { ch: 6, q: "Which enzyme in saliva begins the digestion of starch?", a: "Salivary amylase", pa: "ਲਾਰ ਐਮਾਈਲੇਜ਼", ex: "Salivary amylase breaks starch into simpler sugars while food is still in the mouth.", exPa: "ਲਾਰ ਐਮਾਈਲੇਜ਼ ਭੋਜਨ ਮੂੰਹ ਵਿੱਚ ਹੋਣ ਸਮੇਂ ਹੀ ਸਟਾਰਚ ਨੂੰ ਸਰਲ ਸ਼ੱਕਰਾਂ ਵਿੱਚ ਤੋੜਨਾ ਸ਼ੁਰੂ ਕਰਦਾ ਹੈ.", vvip: true },
    { ch: 6, q: "How do villi help the small intestine absorb digested food?", a: "They greatly increase the surface area for absorption", pa: "ਇਹ ਅਵਸ਼ੋਸ਼ਣ ਲਈ ਸਤਹ ਖੇਤਰ ਬਹੁਤ ਵਧਾਉਂਦੀਆਂ ਹਨ", ex: "Numerous thin-walled villi contain blood capillaries and lacteals that quickly carry absorbed nutrients away.", exPa: "ਬਹੁਤ ਸਾਰੀਆਂ ਪਤਲੀ ਭਿੱਤ ਵਾਲੀਆਂ ਵਿਲਾਈ ਵਿੱਚ ਰਕਤ ਕੇਸ਼ਿਕਾਵਾਂ ਅਤੇ ਲੈਕਟੀਅਲ ਹੁੰਦੇ ਹਨ ਜੋ ਅਵਸ਼ੋਸ਼ਿਤ ਪੋਸ਼ਕ ਤੱਤ ਜਲਦੀ ਲੈ ਜਾਂਦੇ ਹਨ.", vvip: true },
    { ch: 6, q: "Which artery carries deoxygenated blood from the heart to the lungs?", a: "Pulmonary artery", pa: "ਫੇਫੜਾ ਧਮਨੀ", ex: "The pulmonary artery is an exception to the usual artery pattern because it carries deoxygenated blood from the right ventricle.", exPa: "ਫੇਫੜਾ ਧਮਨੀ ਆਮ ਧਮਨੀ ਨਿਯਮ ਦਾ ਅਪਵਾਦ ਹੈ ਕਿਉਂਕਿ ਇਹ ਸੱਜੇ ਨਿਲੇ ਤੋਂ ਆਕਸੀਜਨ-ਰਹਿਤ ਖੂਨ ਫੇਫੜਿਆਂ ਤੱਕ ਲੈ ਜਾਂਦੀ ਹੈ.", vvip: true },
    { ch: 6, q: "What is the structural and functional unit of a kidney?", a: "Nephron", pa: "ਨੇਫਰੋਨ", ex: "Each nephron filters blood, selectively reabsorbs useful substances, and helps form urine.", exPa: "ਹਰ ਨੇਫਰੋਨ ਖੂਨ ਛਾਣਦਾ ਹੈ, ਲਾਭਦਾਇਕ ਪਦਾਰਥਾਂ ਦਾ ਚੋਣਵਾਂ ਮੁੜ-ਅਵਸ਼ੋਸ਼ਣ ਕਰਦਾ ਹੈ ਅਤੇ ਪਿਸ਼ਾਬ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ.", vvip: true },

    { ch: 7, q: "Which plant hormone causes a shoot to bend towards light?", a: "Auxin", pa: "ਆਕਸਿਨ", ex: "Auxin accumulates more on the shaded side, causing greater cell elongation there and bending the shoot towards light.", exPa: "ਆਕਸਿਨ ਛਾਂ ਵਾਲੇ ਪਾਸੇ ਵੱਧ ਇਕੱਠਾ ਹੋ ਕੇ ਉੱਥੇ ਕੋਸ਼ਿਕਾਵਾਂ ਦੀ ਵੱਧ ਲੰਬਾਈ ਕਰਦਾ ਹੈ ਅਤੇ ਤਣਾ ਪ੍ਰਕਾਸ਼ ਵੱਲ ਮੁੜਦਾ ਹੈ.", vvip: true },
    { ch: 7, q: "Which plant hormone inhibits growth and promotes stomatal closure during water stress?", a: "Abscisic acid", pa: "ਐਬਸਿਸਿਕ ਐਸਿਡ", ex: "Abscisic acid acts mainly as a growth inhibitor and helps reduce water loss by closing stomata.", exPa: "ਐਬਸਿਸਿਕ ਐਸਿਡ ਮੁੱਖ ਤੌਰ ਤੇ ਵਾਧਾ ਰੋਕਣ ਵਾਲਾ ਹਾਰਮੋਨ ਹੈ ਅਤੇ ਰੰਧਰ ਬੰਦ ਕਰਕੇ ਪਾਣੀ ਦੀ ਹਾਨੀ ਘਟਾਉਂਦਾ ਹੈ.", vvip: true },
    { ch: 7, q: "Which part of the forebrain is responsible for thinking, memory, and voluntary actions?", a: "Cerebrum", pa: "ਸੇਰੀਬ੍ਰਮ", ex: "The cerebrum receives sensory information, supports intelligence and memory, and controls voluntary movement.", exPa: "ਸੇਰੀਬ੍ਰਮ ਸੰਵੇਦੀ ਜਾਣਕਾਰੀ ਲੈਂਦਾ ਹੈ, ਬੁੱਧੀ ਅਤੇ ਯਾਦਦਾਸ਼ਤ ਨਾਲ ਜੁੜਿਆ ਹੈ ਅਤੇ ਇੱਛਾਧੀਨ ਹਰਕਤਾਂ ਨੂੰ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ.", vvip: true },
    { ch: 7, q: "Which hormone prepares the body for a fight-or-flight response?", a: "Adrenaline", pa: "ਐਡ੍ਰੀਨਲਿਨ", ex: "Adrenaline raises heart rate, breathing rate, and blood supply to muscles during an emergency.", exPa: "ਐਡ੍ਰੀਨਲਿਨ ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਦਿਲ ਅਤੇ ਸਾਹ ਦੀ ਗਤੀ ਅਤੇ ਮਾਸਪੇਸ਼ੀਆਂ ਵੱਲ ਖੂਨ ਦੀ ਸਪਲਾਈ ਵਧਾਉਂਦਾ ਹੈ.", vvip: true },

    { ch: 8, q: "Which asexual method of reproduction is seen in Hydra?", a: "Budding", pa: "ਮੁਕੁਲਨ", ex: "A small outgrowth develops on Hydra by repeated cell division and later separates as a new individual.", exPa: "ਹਾਈਡਰਾ ਉੱਤੇ ਵਾਰ-ਵਾਰ ਕੋਸ਼ਿਕਾ ਵਿਭਾਜਨ ਨਾਲ ਇੱਕ ਛੋਟਾ ਉਭਾਰ ਬਣਦਾ ਹੈ ਜੋ ਬਾਅਦ ਵਿੱਚ ਨਵੇਂ ਜੀਵ ਵਜੋਂ ਵੱਖ ਹੋ ਜਾਂਦਾ ਹੈ.", vvip: true },
    { ch: 8, q: "Why is vegetative propagation useful for plants such as banana that produce few or no viable seeds?", a: "It rapidly produces new plants with the desired parental traits", pa: "ਇਹ ਚਾਹੇ ਹੋਏ ਮਾਤਾ-ਪਿਤਾ ਦੇ ਗੁਣਾਂ ਵਾਲੇ ਨਵੇਂ ਪੌਦੇ ਤੇਜ਼ੀ ਨਾਲ ਬਣਾਉਂਦਾ ਹੈ", ex: "Vegetative parts can reproduce seedless plants and preserve useful traits because the offspring are genetically similar to the parent.", exPa: "ਵਨਸਪਤੀ ਭਾਗ ਬੀਜ-ਰਹਿਤ ਪੌਦਿਆਂ ਨੂੰ ਵਧਾ ਸਕਦੇ ਹਨ ਅਤੇ ਸੰਤਾਨ ਮੂਲ ਪੌਦੇ ਵਰਗੀ ਹੋਣ ਕਰਕੇ ਲਾਭਦਾਇਕ ਗੁਣ ਬਚੇ ਰਹਿੰਦੇ ਹਨ.", vvip: false },
    { ch: 8, q: "Which contraceptive method also reduces the risk of sexually transmitted infections?", a: "Condom", pa: "ਕੰਡੋਮ", ex: "A condom is a barrier method that prevents sperm from entering the female reproductive tract and reduces exchange of infected body fluids.", exPa: "ਕੰਡੋਮ ਇੱਕ ਰੋਕ ਵਿਧੀ ਹੈ ਜੋ ਸ਼ੁਕਰਾਣੂਆਂ ਨੂੰ ਇਸਤਰੀ ਪ੍ਰਜਨਨ ਮਾਰਗ ਵਿੱਚ ਜਾਣ ਤੋਂ ਰੋਕਦੀ ਹੈ ਅਤੇ ਸੰਕਰਮਿਤ ਸਰੀਰਕ ਤਰਲਾਂ ਦੇ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਨੂੰ ਘਟਾਉਂਦੀ ਹੈ.", vvip: true },
    { ch: 8, q: "What is the main function of the placenta during pregnancy?", a: "Exchange of nutrients, oxygen, and wastes between mother and embryo", pa: "ਮਾਂ ਅਤੇ ਭ੍ਰੂਣ ਵਿਚਕਾਰ ਪੋਸ਼ਕ ਤੱਤਾਂ, ਆਕਸੀਜਨ ਅਤੇ ਅਪਸ਼ਿਸ਼ਟਾਂ ਦਾ ਅਦਾਨ-ਪ੍ਰਦਾਨ", ex: "The placenta provides a large exchange surface while keeping maternal and foetal blood from directly mixing.", exPa: "ਪਲੇਸੈਂਟਾ ਵੱਡਾ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਸਤਹ ਦਿੰਦਾ ਹੈ ਅਤੇ ਮਾਂ ਤੇ ਭ੍ਰੂਣ ਦੇ ਖੂਨ ਨੂੰ ਸਿੱਧਾ ਮਿਲਣ ਤੋਂ ਰੋਕਦਾ ਹੈ.", vvip: true },

    { ch: 9, q: "What is a dominant trait?", a: "A trait expressed even when only one copy of its allele is present", pa: "ਉਹ ਗੁਣ ਜੋ ਐਲੀਲ ਦੀ ਇੱਕ ਪ੍ਰਤੀ ਹੋਣ ਤੇ ਵੀ ਪ੍ਰਗਟ ਹੁੰਦਾ ਹੈ", ex: "In a heterozygous individual, the dominant allele determines the visible trait while the recessive allele is masked.", exPa: "ਵਿਸ਼ਮਯੁਗਮੀ ਜੀਵ ਵਿੱਚ ਪ੍ਰਭਾਵੀ ਐਲੀਲ ਦਿੱਖਣ ਵਾਲਾ ਗੁਣ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ ਅਤੇ ਮੰਦ ਐਲੀਲ ਢੱਕਿਆ ਰਹਿੰਦਾ ਹੈ.", vvip: true },
    { ch: 9, q: "Which parent determines the sex of a human child?", a: "The father", pa: "ਪਿਤਾ", ex: "All eggs carry X, while sperm carry either X or Y; therefore the fertilising sperm determines XX or XY.", exPa: "ਸਾਰੇ ਅੰਡਾਣੂ X ਲੈ ਕੇ ਆਉਂਦੇ ਹਨ, ਜਦਕਿ ਸ਼ੁਕਰਾਣੂ X ਜਾਂ Y ਲੈ ਸਕਦੇ ਹਨ; ਇਸ ਲਈ ਨਿਸ਼ੇਚਨ ਕਰਨ ਵਾਲਾ ਸ਼ੁਕਰਾਣੂ XX ਜਾਂ XY ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ.", vvip: true },
    { ch: 9, q: "Why are acquired traits generally not inherited?", a: "They do not change the DNA of reproductive cells", pa: "ਇਹ ਪ੍ਰਜਨਨ ਕੋਸ਼ਿਕਾਵਾਂ ਦੇ DNA ਨੂੰ ਨਹੀਂ ਬਦਲਦੇ", ex: "Changes developed during an organism's lifetime affect body cells but are not normally passed through gametes.", exPa: "ਜੀਵਨ ਦੌਰਾਨ ਵਿਕਸਿਤ ਤਬਦੀਲੀਆਂ ਸਰੀਰਕ ਕੋਸ਼ਿਕਾਵਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦੀਆਂ ਹਨ ਪਰ ਆਮ ਤੌਰ ਤੇ ਯੁਗਮਕਾਂ ਰਾਹੀਂ ਅੱਗੇ ਨਹੀਂ ਜਾਂਦੀਆਂ.", vvip: true },
    { ch: 9, q: "How can geographical isolation contribute to speciation?", a: "It stops gene flow so separated populations accumulate different variations", pa: "ਇਹ ਜੀਨ ਪ੍ਰਵਾਹ ਰੋਕਦਾ ਹੈ ਅਤੇ ਵੱਖਰੀਆਂ ਆਬਾਦੀਆਂ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਭਿੰਨਤਾਵਾਂ ਇਕੱਠੀਆਂ ਹੁੰਦੀਆਂ ਹਨ", ex: "Over many generations, selection and genetic changes can make isolated populations unable to interbreed.", exPa: "ਕਈ ਪੀੜ੍ਹੀਆਂ ਵਿੱਚ ਚੋਣ ਅਤੇ ਆਨੁਵੰਸ਼ਿਕ ਤਬਦੀਲੀਆਂ ਵੱਖਰੀਆਂ ਆਬਾਦੀਆਂ ਨੂੰ ਆਪਸ ਵਿੱਚ ਪ੍ਰਜਨਨ ਕਰਨ ਦੇ ਅਯੋਗ ਬਣਾ ਸਕਦੀਆਂ ਹਨ.", vvip: false },

    { ch: 10, q: "What is the mirror formula for a spherical mirror?", a: "1/f = 1/v + 1/u", pa: "1/f = 1/v + 1/u", ex: "Using the Cartesian sign convention, focal length f, image distance v, and object distance u satisfy this relation.", exPa: "ਕਾਰਟੀਸੀਅਨ ਚਿੰਨ੍ਹ ਪਰੰਪਰਾ ਅਨੁਸਾਰ ਫੋਕਸ ਦੂਰੀ f, ਪ੍ਰਤੀਬਿੰਬ ਦੂਰੀ v ਅਤੇ ਵਸਤੂ ਦੂਰੀ u ਇਸ ਸੰਬੰਧ ਨੂੰ ਮੰਨਦੇ ਹਨ.", vvip: true },
    { ch: 10, q: "What sign does the power of a concave lens have?", a: "Negative", pa: "ਰਿਣਾਤਮਕ", ex: "A concave lens has a negative focal length under the Cartesian sign convention, so P = 1/f is also negative.", exPa: "ਕਾਰਟੀਸੀਅਨ ਚਿੰਨ੍ਹ ਪਰੰਪਰਾ ਅਨੁਸਾਰ ਅਵਤਲ ਲੈਂਸ ਦੀ ਫੋਕਸ ਦੂਰੀ ਰਿਣਾਤਮਕ ਹੁੰਦੀ ਹੈ, ਇਸ ਲਈ P = 1/f ਵੀ ਰਿਣਾਤਮਕ ਹੈ.", vvip: true },
    { ch: 10, q: "Why are convex mirrors used as rear-view mirrors in vehicles?", a: "They give an erect, diminished image and a wide field of view", pa: "ਇਹ ਸਿੱਧਾ, ਛੋਟਾ ਪ੍ਰਤੀਬਿੰਬ ਅਤੇ ਵਿਸ਼ਾਲ ਦ੍ਰਿਸ਼ ਖੇਤਰ ਦਿੰਦੇ ਹਨ", ex: "A convex mirror lets the driver see a larger region behind the vehicle, though objects appear smaller.", exPa: "ਉੱਤਲ ਦਰਪਣ ਚਾਲਕ ਨੂੰ ਵਾਹਨ ਦੇ ਪਿੱਛੇ ਵੱਡਾ ਖੇਤਰ ਵੇਖਣ ਦਿੰਦਾ ਹੈ, ਭਾਵੇਂ ਵਸਤੂਆਂ ਛੋਟੀਆਂ ਦਿਸਦੀਆਂ ਹਨ.", vvip: true },
    { ch: 10, q: "How is the refractive index of a medium related to the speed of light in it?", a: "n = c/v", pa: "n = c/v", ex: "Refractive index equals the speed of light in vacuum divided by its speed in the medium.", exPa: "ਅਪਵਰਤਨ ਅੰਕ ਖਲਾਅ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ ਦੀ ਗਤੀ ਨੂੰ ਮਾਧਿਅਮ ਵਿੱਚ ਇਸ ਦੀ ਗਤੀ ਨਾਲ ਭਾਗ ਦੇਣ ਦੇ ਬਰਾਬਰ ਹੈ.", vvip: true },

    { ch: 11, q: "Which lens corrects hypermetropia?", a: "Convex lens", pa: "ਉੱਤਲ ਲੈਂਸ", ex: "A convex lens converges incoming rays so a hypermetropic eye can focus a near object's image on the retina.", exPa: "ਉੱਤਲ ਲੈਂਸ ਆਉਣ ਵਾਲੀਆਂ ਕਿਰਨਾਂ ਨੂੰ ਇਕੱਠਾ ਕਰਦਾ ਹੈ ਤਾਂ ਜੋ ਦੂਰ-ਦ੍ਰਿਸ਼ਟੀ ਵਾਲੀ ਅੱਖ ਨੇੜਲੀ ਵਸਤੂ ਦਾ ਪ੍ਰਤੀਬਿੰਬ ਰੇਟੀਨਾ ਉੱਤੇ ਬਣਾ ਸਕੇ.", vvip: true },
    { ch: 11, q: "What age-related eye defect occurs when accommodation decreases because the eye lens loses flexibility?", a: "Presbyopia", pa: "ਪ੍ਰੈਸਬਾਇਓਪੀਆ", ex: "With age, weak ciliary muscles and a less flexible lens move the near point farther away.", exPa: "ਉਮਰ ਨਾਲ ਸਿਲੀਅਰੀ ਮਾਸਪੇਸ਼ੀਆਂ ਕਮਜ਼ੋਰ ਅਤੇ ਲੈਂਸ ਘੱਟ ਲਚਕੀਲਾ ਹੋ ਜਾਂਦਾ ਹੈ, ਜਿਸ ਨਾਲ ਨੇੜਲਾ ਬਿੰਦੂ ਦੂਰ ਹੋ ਜਾਂਦਾ ਹੈ.", vvip: true },
    { ch: 11, q: "What is the scattering of light by colloidal particles called?", a: "Tyndall effect", pa: "ਟਿੰਡਲ ਪ੍ਰਭਾਵ", ex: "Fine suspended particles scatter a beam and make its path visible, as in sunlight passing through smoke.", exPa: "ਬਹੁਤ ਬਾਰੀਕ ਝੂਲਦੇ ਕਣ ਪ੍ਰਕਾਸ਼ ਕਿਰਨ ਨੂੰ ਖਿਲਾਰ ਕੇ ਇਸ ਦਾ ਰਸਤਾ ਦਿਖਾਉਂਦੇ ਹਨ, ਜਿਵੇਂ ਧੂੰਏਂ ਵਿੱਚੋਂ ਲੰਘਦੀ ਧੁੱਪ.", vvip: true },
    { ch: 11, q: "Why does the clear daytime sky appear blue?", a: "Shorter blue wavelengths are scattered more strongly by the atmosphere", pa: "ਛੋਟੀ ਤਰੰਗ-ਲੰਬਾਈ ਵਾਲਾ ਨੀਲਾ ਪ੍ਰਕਾਸ਼ ਵਾਯੂਮੰਡਲ ਦੁਆਰਾ ਵੱਧ ਖਿਲਰਦਾ ਹੈ", ex: "Air molecules scatter shorter visible wavelengths much more than longer red wavelengths, sending blue light toward our eyes.", exPa: "ਹਵਾ ਦੇ ਅਣੂ ਛੋਟੀ ਦਿੱਖਣਯੋਗ ਤਰੰਗ-ਲੰਬਾਈ ਨੂੰ ਲੰਬੀ ਲਾਲ ਤਰੰਗ-ਲੰਬਾਈ ਨਾਲੋਂ ਵੱਧ ਖਿਲਾਰਦੇ ਹਨ, ਇਸ ਲਈ ਨੀਲਾ ਪ੍ਰਕਾਸ਼ ਸਾਡੀਆਂ ਅੱਖਾਂ ਤੱਕ ਆਉਂਦਾ ਹੈ.", vvip: true },

    { ch: 12, q: "What remains the same through every resistor connected in series?", a: "Electric current", pa: "ਬਿਜਲੀ ਧਾਰਾ", ex: "A series circuit has only one path, so the same current passes through every component.", exPa: "ਲੜੀਵਾਰ ਸਰਕਟ ਵਿੱਚ ਕੇਵਲ ਇੱਕ ਰਸਤਾ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਹਰ ਉਪਕਰਣ ਵਿੱਚੋਂ ਇੱਕੋ ਧਾਰਾ ਲੰਘਦੀ ਹੈ.", vvip: true },
    { ch: 12, q: "What remains the same across every branch connected in parallel?", a: "Potential difference", pa: "ਵਿਭਵ ਅੰਤਰ", ex: "Each parallel branch connects to the same two points of the source, so each has the same voltage.", exPa: "ਹਰ ਸਮਾਂਤਰ ਸ਼ਾਖਾ ਸਰੋਤ ਦੇ ਇੱਕੋ ਦੋ ਬਿੰਦੂਆਂ ਨਾਲ ਜੁੜਦੀ ਹੈ, ਇਸ ਲਈ ਹਰ ਸ਼ਾਖਾ ਉੱਤੇ ਇੱਕੋ ਵੋਲਟੇਜ ਹੁੰਦਾ ਹੈ.", vvip: true },
    { ch: 12, q: "Which formula relates electric power, potential difference, and current?", a: "P = VI", pa: "P = VI", ex: "Electrical power is the rate of energy transfer and equals voltage multiplied by current.", exPa: "ਬਿਜਲੀ ਸ਼ਕਤੀ ਊਰਜਾ ਦੇ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਦੀ ਦਰ ਹੈ ਅਤੇ ਵਿਭਵ ਅੰਤਰ ਨੂੰ ਧਾਰਾ ਨਾਲ ਗੁਣਾ ਕਰਨ ਦੇ ਬਰਾਬਰ ਹੈ.", vvip: true },
    { ch: 12, q: "Why is an electric fuse connected in the live wire?", a: "To break the supply when current exceeds the safe value", pa: "ਸੁਰੱਖਿਅਤ ਮੁੱਲ ਤੋਂ ਵੱਧ ਧਾਰਾ ਹੋਣ ਤੇ ਸਪਲਾਈ ਤੋੜਨ ਲਈ", ex: "The fuse wire melts during overload or short circuit and disconnects the appliance from the high-potential live supply.", exPa: "ਵੱਧ ਭਾਰ ਜਾਂ ਸ਼ਾਰਟ ਸਰਕਟ ਸਮੇਂ ਫਿਊਜ਼ ਤਾਰ ਪਿਘਲ ਕੇ ਉਪਕਰਣ ਨੂੰ ਉੱਚ ਵਿਭਵ ਵਾਲੀ ਲਾਈਵ ਸਪਲਾਈ ਤੋਂ ਵੱਖ ਕਰ ਦਿੰਦੀ ਹੈ.", vvip: true },

    { ch: 13, q: "Which rule gives the direction of the magnetic field around a straight current-carrying conductor?", a: "Right-hand thumb rule", pa: "ਸੱਜੇ ਹੱਥ ਦਾ ਅੰਗੂਠਾ ਨਿਯਮ", ex: "Point the right thumb along conventional current; the curled fingers show the circular magnetic-field direction.", exPa: "ਸੱਜੇ ਹੱਥ ਦਾ ਅੰਗੂਠਾ ਪਰੰਪਰਾਗਤ ਧਾਰਾ ਵੱਲ ਰੱਖੋ; ਮੁੜੀਆਂ ਉਂਗਲਾਂ ਚੱਕਰੀ ਚੁੰਬਕੀ ਖੇਤਰ ਦੀ ਦਿਸ਼ਾ ਦਿਖਾਉਂਦੀਆਂ ਹਨ.", vvip: true },
    { ch: 13, q: "Which rule gives the direction of force on a current-carrying conductor in a magnetic field?", a: "Fleming's left-hand rule", pa: "ਫਲੇਮਿੰਗ ਦਾ ਖੱਬੇ ਹੱਥ ਦਾ ਨਿਯਮ", ex: "With thumb, forefinger, and middle finger mutually perpendicular, they represent force, field, and current respectively.", exPa: "ਅੰਗੂਠਾ, ਪਹਿਲੀ ਅਤੇ ਵਿਚਲੀ ਉਂਗਲ ਆਪਸ ਵਿੱਚ ਲੰਬ ਰੱਖਣ ਤੇ ਇਹ ਕ੍ਰਮਵਾਰ ਬਲ, ਖੇਤਰ ਅਤੇ ਧਾਰਾ ਦੀ ਦਿਸ਼ਾ ਦੱਸਦੇ ਹਨ.", vvip: true },
    { ch: 13, q: "What energy conversion occurs in an electric generator?", a: "Mechanical energy to electrical energy", pa: "ਯਾਂਤ੍ਰਿਕ ਊਰਜਾ ਤੋਂ ਬਿਜਲੀ ਊਰਜਾ", ex: "Rotating a coil in a magnetic field changes magnetic flux and induces electric current.", exPa: "ਚੁੰਬਕੀ ਖੇਤਰ ਵਿੱਚ ਕੁੰਡਲੀ ਘੁਮਾਉਣ ਨਾਲ ਚੁੰਬਕੀ ਫਲਕਸ ਬਦਲਦਾ ਹੈ ਅਤੇ ਬਿਜਲੀ ਧਾਰਾ ਪ੍ਰੇਰਿਤ ਹੁੰਦੀ ਹੈ.", vvip: true },
    { ch: 13, q: "What does the magnetic field pattern of a current-carrying solenoid resemble?", a: "The field of a bar magnet", pa: "ਛੜ ਚੁੰਬਕ ਦਾ ਖੇਤਰ", ex: "A solenoid has distinct north and south ends and a strong, nearly uniform field inside.", exPa: "ਸੋਲੇਨਾਇਡ ਦੇ ਸਪਸ਼ਟ ਉੱਤਰੀ ਅਤੇ ਦੱਖਣੀ ਸਿਰੇ ਹੁੰਦੇ ਹਨ ਅਤੇ ਅੰਦਰ ਮਜ਼ਬੂਤ, ਲਗਭਗ ਇਕਸਾਰ ਖੇਤਰ ਹੁੰਦਾ ਹੈ.", vvip: true },

    { ch: 14, q: "What energy conversion occurs in a hydroelectric power plant?", a: "Stored gravitational potential energy of water becomes electrical energy", pa: "ਪਾਣੀ ਦੀ ਸੰਚਿਤ ਗੁਰੁਤਵੀ ਸਥਿਤਿਜ ਊਰਜਾ ਬਿਜਲੀ ਊਰਜਾ ਬਣਦੀ ਹੈ", ex: "Falling water turns turbines, converting potential energy to kinetic, mechanical, and finally electrical energy.", exPa: "ਡਿੱਗਦਾ ਪਾਣੀ ਟਰਬਾਈਨ ਘੁਮਾਉਂਦਾ ਹੈ ਅਤੇ ਸਥਿਤਿਜ ਊਰਜਾ ਨੂੰ ਗਤਿਜ, ਯਾਂਤ੍ਰਿਕ ਅਤੇ ਅੰਤ ਵਿੱਚ ਬਿਜਲੀ ਊਰਜਾ ਵਿੱਚ ਬਦਲਦਾ ਹੈ.", vvip: true },
    { ch: 14, q: "Which semiconductor is commonly used to make solar cells?", a: "Silicon", pa: "ਸਿਲਿਕਾਨ", ex: "Solar cells commonly use silicon junctions to convert sunlight directly into electricity.", exPa: "ਸੌਰ ਸੈੱਲ ਆਮ ਤੌਰ ਤੇ ਸਿਲਿਕਾਨ ਜੰਕਸ਼ਨਾਂ ਨਾਲ ਧੁੱਪ ਨੂੰ ਸਿੱਧਾ ਬਿਜਲੀ ਵਿੱਚ ਬਦਲਦੇ ਹਨ.", vvip: true },
    { ch: 14, q: "Why do wind farms require large areas of land?", a: "Many turbines must be widely spaced to capture steady wind", pa: "ਸਥਿਰ ਹਵਾ ਫੜਨ ਲਈ ਬਹੁਤ ਟਰਬਾਈਨਾਂ ਨੂੰ ਦੂਰ-ਦੂਰ ਲਗਾਉਣਾ ਪੈਂਦਾ ਹੈ", ex: "Closely packed turbines interfere with one another's airflow, so commercial wind farms spread machines over a large site.", exPa: "ਬਹੁਤ ਨੇੜੇ ਟਰਬਾਈਨਾਂ ਇੱਕ ਦੂਜੇ ਦੇ ਹਵਾ ਪ੍ਰਵਾਹ ਵਿੱਚ ਰੁਕਾਵਟ ਪਾਂਦੀਆਂ ਹਨ, ਇਸ ਲਈ ਵਪਾਰਕ ਪਵਨ ਫਾਰਮ ਵੱਡੇ ਖੇਤਰ ਵਿੱਚ ਫੈਲਾਏ ਜਾਂਦੇ ਹਨ.", vvip: false },
    { ch: 14, q: "What is biomass?", a: "Plant and animal material used as a source of energy", pa: "ਊਰਜਾ ਸਰੋਤ ਵਜੋਂ ਵਰਤਿਆ ਜਾਣ ਵਾਲਾ ਪੌਧਾ ਅਤੇ ਜੰਤੂ ਪਦਾਰਥ", ex: "Wood, crop residue, and animal dung store chemical energy originally derived mainly from sunlight.", exPa: "ਲੱਕੜ, ਫਸਲੀ ਬਚਤ ਅਤੇ ਪਸ਼ੂਆਂ ਦਾ ਗੋਬਰ ਰਸਾਇਣਕ ਊਰਜਾ ਸੰਭਾਲਦੇ ਹਨ ਜੋ ਮੁੱਖ ਤੌਰ ਤੇ ਸੂਰਜੀ ਪ੍ਰਕਾਸ਼ ਤੋਂ ਆਉਂਦੀ ਹੈ.", vvip: false },
    { ch: 14, q: "What long-term hazard makes nuclear power waste difficult to manage?", a: "It remains dangerously radioactive for long periods", pa: "ਇਹ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਖਤਰਨਾਕ ਰੇਡੀਓਧਰਮੀ ਰਹਿੰਦਾ ਹੈ", ex: "Spent nuclear material must be securely isolated because ionising radiation can damage living tissue for many years.", exPa: "ਵਰਤਿਆ ਨਾਭਿਕੀ ਪਦਾਰਥ ਸੁਰੱਖਿਅਤ ਤੌਰ ਤੇ ਅਲੱਗ ਰੱਖਣਾ ਪੈਂਦਾ ਹੈ ਕਿਉਂਕਿ ਆਇਨੀਕਰਨ ਵਿਕਿਰਣ ਕਈ ਸਾਲ ਜੀਵਤ ਤੰਤੂਆਂ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾ ਸਕਦਾ ਹੈ.", vvip: true },
    { ch: 14, q: "What minimum temperature difference is generally needed between warm surface water and cold deep water for ocean thermal energy conversion?", a: "About 20 degrees Celsius", pa: "ਲਗਭਗ 20 ਡਿਗਰੀ ਸੈਲਸੀਅਸ", ex: "OTEC needs a temperature difference of about 20 degrees Celsius to run its heat-engine cycle effectively.", exPa: "ਸਮੁੰਦਰੀ ਤਾਪ ਊਰਜਾ ਪਰਿਵਰਤਨ ਨੂੰ ਤਾਪ ਇੰਜਣ ਚੱਕਰ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਚਲਾਉਣ ਲਈ ਲਗਭਗ 20 ਡਿਗਰੀ ਸੈਲਸੀਅਸ ਦਾ ਅੰਤਰ ਚਾਹੀਦਾ ਹੈ.", vvip: true },

    { ch: 15, q: "What role do decomposers play in an ecosystem?", a: "They break down dead matter and recycle nutrients", pa: "ਇਹ ਮਰੇ ਪਦਾਰਥ ਨੂੰ ਤੋੜ ਕੇ ਪੋਸ਼ਕ ਤੱਤ ਮੁੜ ਚੱਕਰ ਵਿੱਚ ਲਿਆਉਂਦੇ ਹਨ", ex: "Bacteria and fungi convert complex remains into simpler substances that producers can use again.", exPa: "ਬੈਕਟੀਰੀਆ ਅਤੇ ਫਫੂੰਦ ਜਟਿਲ ਮਰੇ ਅਵਸ਼ੇਸ਼ਾਂ ਨੂੰ ਸਰਲ ਪਦਾਰਥਾਂ ਵਿੱਚ ਬਦਲਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਨੂੰ ਉਤਪਾਦਕ ਮੁੜ ਵਰਤ ਸਕਦੇ ਹਨ.", vvip: true },
    { ch: 15, q: "What does the ten percent law state?", a: "Only about 10 percent of energy passes to the next trophic level", pa: "ਕੇਵਲ ਲਗਭਗ 10 ਪ੍ਰਤੀਸ਼ਤ ਊਰਜਾ ਅਗਲੇ ਪੋਸ਼ੀ ਪੱਧਰ ਤੱਕ ਜਾਂਦੀ ਹੈ", ex: "Most energy is used in life processes or released as heat, limiting the number of trophic levels in a food chain.", exPa: "ਜ਼ਿਆਦਾਤਰ ਊਰਜਾ ਜੀਵਨ ਕਿਰਿਆਵਾਂ ਵਿੱਚ ਵਰਤੀ ਜਾਂ ਤਾਪ ਵਜੋਂ ਨਿਕਲ ਜਾਂਦੀ ਹੈ, ਇਸ ਲਈ ਭੋਜਨ ਲੜੀ ਦੇ ਪੋਸ਼ੀ ਪੱਧਰ ਸੀਮਿਤ ਰਹਿੰਦੇ ਹਨ.", vvip: true },
    { ch: 15, q: "What is biological magnification?", a: "The increasing concentration of persistent pollutants at higher trophic levels", pa: "ਉੱਚੇ ਪੋਸ਼ੀ ਪੱਧਰਾਂ ਤੇ ਅਵਿਘਟਨਸ਼ੀਲ ਪ੍ਰਦੂਸ਼ਕਾਂ ਦੀ ਵਧਦੀ ਸੰਘਣਤਾ", ex: "Chemicals such as some pesticides are not easily broken down, so top consumers accumulate the highest concentrations.", exPa: "ਕੁਝ ਕੀਟਨਾਸ਼ਕਾਂ ਵਰਗੇ ਰਸਾਇਣ ਆਸਾਨੀ ਨਾਲ ਨਹੀਂ ਟੁੱਟਦੇ, ਇਸ ਲਈ ਚੋਟੀ ਦੇ ਉਪਭੋਗਤਾਵਾਂ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਧ ਸੰਘਣਤਾ ਇਕੱਠੀ ਹੁੰਦੀ ਹੈ.", vvip: true },
    { ch: 15, q: "What makes a substance biodegradable?", a: "Microorganisms can break it into simpler harmless substances", pa: "ਸੂਖਮਜੀਵ ਇਸ ਨੂੰ ਸਰਲ ਨਿਰਹਾਨੀ ਪਦਾਰਥਾਂ ਵਿੱਚ ਤੋੜ ਸਕਦੇ ਹਨ", ex: "Natural biological processes decompose biodegradable waste, unlike persistent materials such as many plastics.", exPa: "ਕੁਦਰਤੀ ਜੈਵਿਕ ਕਿਰਿਆਵਾਂ ਜੈਵ-ਅਪਘਟਨੀ ਅਪਸ਼ਿਸ਼ਟ ਨੂੰ ਤੋੜ ਦਿੰਦੀਆਂ ਹਨ, ਪਰ ਕਈ ਪਲਾਸਟਿਕ ਵਰਗੇ ਪਦਾਰਥ ਟਿਕੇ ਰਹਿੰਦੇ ਹਨ.", vvip: true },

    { ch: 16, q: "What does Refuse mean among the 5 R's?", a: "Say no to products that are unnecessary or environmentally harmful", pa: "ਬੇਲੋੜੇ ਜਾਂ ਵਾਤਾਵਰਣ ਲਈ ਹਾਨੀਕਾਰਕ ਉਤਪਾਦਾਂ ਨੂੰ ਨਾ ਕਹਿਣਾ", ex: "Refusing single-use items prevents waste before resources and energy are spent making them.", exPa: "ਇਕ-ਵਾਰ ਵਰਤੋਂ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ ਨੂੰ ਇਨਕਾਰ ਕਰਨ ਨਾਲ ਉਨ੍ਹਾਂ ਨੂੰ ਬਣਾਉਣ ਲਈ ਸਰੋਤ ਅਤੇ ਊਰਜਾ ਖਰਚ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਕਚਰਾ ਰੁਕਦਾ ਹੈ.", vvip: true },
    { ch: 16, q: "What does Repurpose mean among the 5 R's?", a: "Use an old item for a new useful purpose", pa: "ਪੁਰਾਣੀ ਚੀਜ਼ ਨੂੰ ਨਵੇਂ ਲਾਭਦਾਇਕ ਕੰਮ ਲਈ ਵਰਤਣਾ", ex: "Repurposing extends a product's life, such as turning a worn tyre into a garden planter.", exPa: "ਨਵਾਂ ਉਦੇਸ਼ ਦੇਣ ਨਾਲ ਚੀਜ਼ ਦੀ ਉਮਰ ਵਧਦੀ ਹੈ, ਜਿਵੇਂ ਪੁਰਾਣੇ ਟਾਇਰ ਨੂੰ ਬਾਗ਼ ਦੇ ਗਮਲੇ ਵਜੋਂ ਵਰਤਣਾ.", vvip: false },
    { ch: 16, q: "What was the main aim of the Chipko movement?", a: "To protect forest trees from commercial felling", pa: "ਜੰਗਲ ਦੇ ਰੁੱਖਾਂ ਨੂੰ ਵਪਾਰਕ ਕਟਾਈ ਤੋਂ ਬਚਾਉਣਾ", ex: "Local people, especially women, embraced trees to resist cutting and defend forest resources that supported their lives.", exPa: "ਸਥਾਨਕ ਲੋਕਾਂ, ਖ਼ਾਸ ਕਰ ਔਰਤਾਂ, ਨੇ ਰੁੱਖਾਂ ਨੂੰ ਜੱਫੀ ਪਾ ਕੇ ਕਟਾਈ ਦਾ ਵਿਰੋਧ ਕੀਤਾ ਅਤੇ ਜੀਵਨ-ਆਧਾਰ ਜੰਗਲੀ ਸਰੋਤਾਂ ਦੀ ਰੱਖਿਆ ਕੀਤੀ.", vvip: true },
    { ch: 16, q: "What is watershed management?", a: "Coordinated conservation of soil and water in a drainage area", pa: "ਜਲ-ਨਿਕਾਸ ਖੇਤਰ ਵਿੱਚ ਮਿੱਟੀ ਅਤੇ ਪਾਣੀ ਦੀ ਸਾਂਝੀ ਸੰਭਾਲ", ex: "Check dams, contour barriers, vegetation, and local planning reduce runoff, erosion, and groundwater loss.", exPa: "ਛੋਟੇ ਬੰਨ੍ਹ, ਸਮੋਚ ਰੋਕਾਂ, ਵਨਸਪਤੀ ਅਤੇ ਸਥਾਨਕ ਯੋਜਨਾ ਵਹਾਅ, ਮਿੱਟੀ ਕਟਾਅ ਅਤੇ ਭੂਜਲ ਹਾਨੀ ਘਟਾਉਂਦੇ ਹਨ.", vvip: true },
    { ch: 16, q: "Name one major social cost of building a large dam.", a: "Displacement of local communities", pa: "ਸਥਾਨਕ ਭਾਈਚਾਰਿਆਂ ਦਾ ਉਜਾੜਾ", ex: "Large reservoirs can submerge villages and farmland, forcing people to relocate and lose established livelihoods.", exPa: "ਵੱਡੇ ਜਲਾਸ਼ਯ ਪਿੰਡਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਦੀ ਜ਼ਮੀਨ ਨੂੰ ਡੁਬੋ ਸਕਦੇ ਹਨ, ਜਿਸ ਨਾਲ ਲੋਕਾਂ ਨੂੰ ਘਰ ਅਤੇ ਰੋਜ਼ੀ ਛੱਡਣੀ ਪੈਂਦੀ ਹੈ.", vvip: true },
    { ch: 16, q: "Why must coal and petroleum be conserved?", a: "They are finite non-renewable resources formed over millions of years", pa: "ਇਹ ਲੱਖਾਂ ਸਾਲਾਂ ਵਿੱਚ ਬਣੇ ਸੀਮਿਤ ਅਨਵਿਆਉਣਯੋਗ ਸਰੋਤ ਹਨ", ex: "They are consumed far faster than nature replaces them, and burning them also causes pollution and climate change.", exPa: "ਇਹ ਕੁਦਰਤ ਦੁਆਰਾ ਮੁੜ ਬਣਨ ਨਾਲੋਂ ਕਿਤੇ ਤੇਜ਼ ਵਰਤੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਇਨ੍ਹਾਂ ਨੂੰ ਸਾੜਨ ਨਾਲ ਪ੍ਰਦੂਸ਼ਣ ਤੇ ਜਲਵਾਯੂ ਪਰਿਵਰਤਨ ਵੀ ਹੁੰਦਾ ਹੈ.", vvip: true },
    { ch: 16, q: "Which Rajasthan community is famous for protecting khejri trees and wildlife?", a: "Bishnoi community", pa: "ਬਿਸ਼ਨੋਈ ਭਾਈਚਾਰਾ", ex: "The Bishnoi tradition treats protection of trees and animals as a community duty and is a classic conservation example.", exPa: "ਬਿਸ਼ਨੋਈ ਪਰੰਪਰਾ ਰੁੱਖਾਂ ਅਤੇ ਜਾਨਵਰਾਂ ਦੀ ਰੱਖਿਆ ਨੂੰ ਭਾਈਚਾਰਕ ਫ਼ਰਜ਼ ਮੰਨਦੀ ਹੈ ਅਤੇ ਸੰਰੱਖਣ ਦੀ ਪ੍ਰਸਿੱਧ ਉਦਾਹਰਣ ਹੈ.", vvip: true }
  ];

  window.PSEB_FLASH_EXTRA_CONCEPTS = {
    overrides: overrides,
    cards: cards
  };
})();
