/* PSEB Class 10 Science — single source of truth for the chapter catalog.
   Loaded by index.html via a classic <script> tag so it works over file://
   (fetch()/JSON modules are blocked on the file: scheme). */
window.PSEB_CHAPTERS = [
  { n: 1,  title: "Chemical Reactions and Equations",           file: "Chapter 01 - Chemical Reactions/Chapter 01 - Chemical Reactions.html",                                     slides: 31, subject: "chemistry",   math: true },
  { n: 2,  title: "Acids, Bases and Salts",                     file: "Chapter 02 - Acids, Bases and Salts/Chapter 02 - Acids, Bases and Salts.html",                             slides: 31, subject: "chemistry",   math: true },
  { n: 3,  title: "Metals and Non-metals",                      file: "Chapter 03 - Metals and Non-metals/Chapter 03 - Metals and Non-metals.html",                               slides: 31, subject: "chemistry",   math: true },
  { n: 4,  title: "Carbon and its Compounds",                   file: "Chapter 04 - Carbon Compounds/Chapter 04 - Carbon Compounds.html",                                         slides: 31, subject: "chemistry",   math: true },
  { n: 5,  title: "Periodic Classification of Elements",        file: "Chapter 05 - Periodic Table/Chapter 05 - Periodic Table.html",                                             slides: 31, subject: "chemistry",   math: true },
  { n: 6,  title: "Life Processes",                             file: "Chapter 06 - Life Processes/Chapter 06 - Life Processes.html",                                             slides: 35, subject: "biology",     math: false },
  { n: 7,  title: "Control and Coordination",                   file: "Chapter 06 - Control and Coordination/Chapter 06 - Control and Coordination.html",                         slides: 31, subject: "biology",     math: false },
  { n: 8,  title: "How do Organisms Reproduce?",                file: "Chapter 07 - How do Organisms Reproduce/Chapter 07 - How do Organisms Reproduce.html",                     slides: 33, subject: "biology",     math: false },
  { n: 9,  title: "Heredity and Evolution",                     file: "Chapter 08 - Heredity/Chapter 08 - Heredity.html",                                                         slides: 31, subject: "biology",     math: false },
  { n: 10, title: "Light: Reflection & Refraction",             file: "Chapter 09 - Light Reflection and Refraction/Chapter 09 - Light Reflection and Refraction.html",           slides: 33, subject: "physics",     math: true },
  { n: 11, title: "The Human Eye & Colourful World",            file: "Chapter 10 - The Human Eye and Colourful World/Chapter 10 - The Human Eye and Colourful World.html",       slides: 32, subject: "physics",     math: false },
  { n: 12, title: "Electricity",                                file: "Chapter 11 - Electricity/Chapter 11 - Electricity.html",                                                   slides: 32, subject: "physics",     math: true },
  { n: 13, title: "Magnetic Effects of Electric Current",       file: "Chapter 12 - Magnetic Effects of Electric Current/Chapter 12 - Magnetic Effects of Electric Current.html", slides: 33, subject: "physics",     math: true },
  { n: 14, title: "Sources of Energy",                          file: "Chapter 14 - Sources of Energy/Chapter 14 - Sources of Energy.html",                                      slides: 32, subject: "physics",     math: false },
  { n: 15, title: "Our Environment",                            file: "Chapter 13 - Our Environment/Chapter 13 - Our Environment.html",                                           slides: 31, subject: "environment", math: false },
  { n: 16, title: "Sustainable Management of Natural Resources", file: "Chapter 16 - Sustainable Management of Natural Resources/Chapter 16 - Sustainable Management of Natural Resources.html", slides: 32, subject: "environment", math: false }
];

window.PSEB_SECTIONS = [
  { key: "chemistry",   label: "Chemistry",   range: [1, 5] },
  { key: "biology",     label: "Biology",     range: [6, 9] },
  { key: "physics",     label: "Physics",     range: [10, 14] },
  { key: "environment", label: "Environment", range: [15, 16] }
];
