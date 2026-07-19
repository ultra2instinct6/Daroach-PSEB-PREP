# PSEB Class 10 Science — Reading Plan & Log

This log records the full audit and rebuild of the **Reading Comprehension** slides across all 16 chapter decks.

## What changed

- **Before:** 28 readings, all **English-only**, unevenly spread. Three chapters (Life Processes, Sources of Energy, Sustainable Management) had **no** reading at all; several had only one.
- **After:** a standard **3 readings per chapter (48 total)**, each **Punjabi-first (Gurmukhi) with an English toggle** and text-to-speech, grouped into a "Reading Corner" right after each chapter cover.
- Every old English-only reading was removed and replaced; key terms are highlighted and mirrored across both languages so a native-Punjabi learner can read first in Punjabi, then check English.
- The bilingual reading component (styling, language toggle, TTS) lives once in `assets/deck-enhance.js`; content lives in `Scripts/readings_data.py`; `Scripts/build_readings.py` regenerates the slides.

## New reading plan (48 readings)

| Ch | Chapter | # | ਪੰਜਾਬੀ ਸਿਰਲੇਖ (Punjabi title) | English title |
|----|---------|---|------------------------------|---------------|
| 1 | Chemical Reactions & Equations | 1 | ਪੁੰਜ ਦੀ ਸੰਭਾਲ ਦਾ ਨਿਯਮ | The Law of Conservation of Mass |
| 1 | Chemical Reactions & Equations | 2 | ਜੀਵਨ ਦੀ ਤਪਸ਼ | The Heat of Life |
| 1 | Chemical Reactions & Equations | 3 | ਖ਼ਾਮੋਸ਼ ਵਿਨਾਸ਼ਕਾਰੀ | The Silent Destroyers |
| 2 | Acids, Bases and Salts | 1 | ਲਿਟਮਸ ਦਾ ਜਾਦੂ | The Magic of Litmus |
| 2 | Acids, Bases and Salts | 2 | ਤੇਜ਼ਾਬੀ ਵਰਖਾ ਦਾ ਸੰਕਟ | The Acid Rain Crisis |
| 2 | Acids, Bases and Salts | 3 | ਬੇਕਿੰਗ ਸੋਡਾ ਜਵਾਲਾਮੁਖੀ | The Baking Soda Volcano |
| 3 | Metals and Non-metals | 1 | ਐਲੂਮੀਨੀਅਮ ਦੀ ਢਾਲ | The Anodising Shield |
| 3 | Metals and Non-metals | 2 | ਥਰਮਿਟ ਵੈਲਡਿੰਗ | The Thermit Welding Process |
| 3 | Metals and Non-metals | 3 | ਕਾਂਸੀ ਯੁੱਗ ਦੀ ਸਵੇਰ | The Dawn of the Bronze Age |
| 4 | Carbon and its Compounds | 1 | ਹੀਰਾ ਅਤੇ ਪੈਨਸਿਲ | The Diamond and the Pencil |
| 4 | Carbon and its Compounds | 2 | ਸੱਪ ਅਤੇ ਚੱਕਰ | The Serpent and the Ring |
| 4 | Carbon and its Compounds | 3 | ਸਾਬਣ ਦੀ ਰੱਸਾਕਸ਼ੀ | The Soap Tug-of-War |
| 5 | Periodic Classification | 1 | ਮੈਂਡਲੀਵ ਦਾ ਦਲੇਰ ਦਾਅ | Mendeleev's Bold Gamble |
| 5 | Periodic Classification | 2 | ਮੋਜ਼ਲੇ ਦੀ ਐਕਸ-ਰੇ ਕ੍ਰਾਂਤੀ | Moseley's X-Ray Revolution |
| 5 | Periodic Classification | 3 | ਟੇਢੀ-ਮੇਢੀ ਲਕੀਰ | The Zig-Zag Line |
| 6lp | Life Processes | 1 | ਸਾਨੂੰ ਜ਼ਿੰਦਾ ਕੀ ਰੱਖਦਾ ਹੈ? | What Keeps Us Alive? |
| 6lp | Life Processes | 2 | ਹਰੀ ਰਸੋਈ | The Green Kitchen |
| 6lp | Life Processes | 3 | ਲਹੂ ਦੇ ਦੋ ਸਫ਼ਰ | Two Journeys of Blood |
| 6cc | Control and Coordination | 1 | ਪ੍ਰਤੀਕਿਰਿਆ ਕਿਉਂ? | Why Respond? |
| 6cc | Control and Coordination | 2 | ਨਸਾਂ ਦੀ ਗਤੀ-ਸੀਮਾ | The Speed Limit of Nerves |
| 6cc | Control and Coordination | 3 | ਹੌਲੀ, ਪਰ ਸਿਆਣੇ | Slower, But Smart |
| 7 | How do Organisms Reproduce | 1 | ਪ੍ਰਜਣਨ ਦੀ ਊਰਜਾ ਕੀਮਤ | The Energy Cost of Reproduction |
| 7 | How do Organisms Reproduce | 2 | ਬਚਾਅ ਦੀ ਚਾਸ਼ਨੀ | The Spice of Survival |
| 7 | How do Organisms Reproduce | 3 | ਪਰਿਪੱਕਤਾ ਵੱਲ ਮੋੜ | The Shift to Maturity |
| 8 | Heredity and Evolution | 1 | ਵਿਰਾਸਤ ਦੇ ਲੁਕੇ ਕਾਰਕ | Heredity's Hidden Factors |
| 8 | Heredity and Evolution | 2 | ਪ੍ਰਭਾਵੀ ਅਤੇ ਅਪ੍ਰਭਾਵੀ | Dominant and Recessive |
| 8 | Heredity and Evolution | 3 | ਮੁੰਡਾ ਜਾਂ ਕੁੜੀ? | Boy or Girl? |
| 9 | Light: Reflection & Refraction | 1 | ਟੁੱਟਿਆ ਹੋਇਆ ਤੀਲਾ | The Broken Straw |
| 9 | Light: Reflection & Refraction | 2 | ਸ਼ੀਸ਼ੇ ਅਤੇ ਪਰਾਵਰਤਨ | Mirrors and Reflection |
| 9 | Light: Reflection & Refraction | 3 | ਰੋਸ਼ਨੀ ਨੂੰ ਕਾਬੂ ਕਰਨਾ | Taming the Light |
| 10 | The Human Eye & Colourful World | 1 | ਅਸਮਾਨ ਨੀਲਾ ਕਿਉਂ? | Why Is the Sky Blue? |
| 10 | The Human Eye & Colourful World | 2 | ਕੁਦਰਤੀ ਕੈਮਰਾ | The Natural Camera |
| 10 | The Human Eye & Colourful World | 3 | ਸੱਤ ਰੰਗਾਂ ਦਾ ਪੱਖਾ | The Fan of Seven Colours |
| 11 | Electricity | 1 | ਬਿਜਲੀ ਦੀ ਨਦੀ | The River of Electricity |
| 11 | Electricity | 2 | ਤਾਰ ਗਰਮ ਕਿਉਂ ਹੁੰਦੀ ਹੈ? | Why Does a Wire Heat Up? |
| 11 | Electricity | 3 | ਇੱਕ ਸ਼ਹਿਰ ਨੂੰ ਰੌਸ਼ਨ ਕਰਨਾ | Lighting Up a City |
| 12 | Magnetic Effects of Electric Current | 1 | ਬਿਜਲੀ ਮਿਲੀ ਚੁੰਬਕ ਨੂੰ | Electricity Meets Magnetism |
| 12 | Magnetic Effects of Electric Current | 2 | ਗਤੀ ਨੂੰ ਬਿਜਲੀ ਬਣਾਉਣਾ | Turning Motion into Electricity |
| 12 | Magnetic Effects of Electric Current | 3 | ਕਲਾਸ ਤੋਂ ਦੁਨੀਆਂ ਤੱਕ | From Classroom to the World |
| 13 | Our Environment | 1 | ਊਰਜਾ ਦਾ ਵਹਾਅ | The Flow of Energy |
| 13 | Our Environment | 2 | ਕੁਦਰਤ ਦੇ ਸਫ਼ਾਈ ਕਰਮਚਾਰੀ | Nature's Cleaners |
| 13 | Our Environment | 3 | ਅਸਮਾਨ ਦੀ ਢਾਲ | The Shield in the Sky |
| 14 | Sources of Energy | 1 | ਚੰਗਾ ਬਾਲਣ ਕੀ ਹੁੰਦਾ ਹੈ? | What Makes a Good Fuel? |
| 14 | Sources of Energy | 2 | ਸੂਰਜ ਦਾ ਤੋਹਫ਼ਾ | The Sun's Gift |
| 14 | Sources of Energy | 3 | ਪ੍ਰਮਾਣੂ ਦੇ ਅੰਦਰ ਦੀ ਸ਼ਕਤੀ | The Power Inside the Atom |
| 16 | Sustainable Management of Natural Resources | 1 | ਸਾਡੀ ਸਾਂਝੀ ਦੌਲਤ | Our Shared Wealth |
| 16 | Sustainable Management of Natural Resources | 2 | ਲੋਕਾਂ ਦੇ ਜੰਗਲ | The People's Forests |
| 16 | Sustainable Management of Natural Resources | 3 | ਮੀਂਹ ਦੀ ਹਰ ਬੂੰਦ | Every Drop of Rain |

**Total: 48 readings across 16 decks.**
