#!/usr/bin/env node
/* Short-answer grading tests.

   Grading used to be a literal string comparison, which failed every one of
   the 30 answers that expect four or more words. The rules are now forgiving
   enough to accept a correct answer phrased differently and still strict
   enough to reject a different concept, so both halves need guarding.

   Run from the repository root:  node Scripts/test_short_answers.js
*/

const fs = require("fs");
const src = fs.readFileSync(require("path").join(__dirname, "..", "assets", "deck-enhance.js"), "utf8");
const start = src.indexOf("  var SA_STOP = {");
const end = src.indexOf("  window.__psebGradeSA");
global.window = {};
eval(src.slice(start, end));
const g = gradeShortAnswer;

let pass = 0, fail = 0;
const t = (typed, expected, want, note) => {
  const got = g(typed, expected);
  if (got === want) { pass++; return; }
  fail++;
  console.log(`  FAIL want=${want} got=${got}  typed="${typed}"  expected="${expected}"  ${note||""}`);
};

console.log("A) exact answers must still pass (regression over the real corpus)");
process.chdir(require("path").join(__dirname, ".."));
const dirs = fs.readdirSync(".").filter(x => x.startsWith("Chapter ")).sort();
let n = 0;
for (const d of dirs) {
  const f = d + "/" + fs.readdirSync(d).find(x => x.endsWith(".html"));
  const h = fs.readFileSync(f, "utf8");
  for (const m of h.matchAll(/checkSA\(\s*'?this'?\s*,\s*'((?:[^'\\]|\\.)*)'/g)) {
    const exp = m[1].replace(/\\u0027/g, "'");
    n++;
    t(exp, exp, true, "(verbatim)");
    t(exp.toUpperCase(), exp, true, "(case)");
    t("  " + exp + " .", exp, true, "(padding/punctuation)");
  }
}
console.log(`   checked ${n} expected answers x3 variants`);

console.log("B) reasonable rephrasings should pass");
[["coal and petroleum","Coal and petroleum"],["coal & petroleum","Coal and petroleum"],
 ["blue fades and reddish brown copper deposits","Blue colour fades and reddish-brown copper deposits"],
 ["it absorbs moisture and turns back into gypsum","It absorbs moisture and slowly turns back into gypsum"],
 ["rust","Rust (hydrated iron oxide)"],["hydrated iron oxide","Rust (hydrated iron oxide)"],
 ["generator","Generator"],["calorific value","Calorific value"],
 ["same atoms on both side","Same atoms on both sides"],
 ["air sacs in the lungs","Air sacs in lungs"],
 ["nitrogn","Nitrogen"],["Al2O3","Al2O3"],["electricty","Electricity"],
 ["about 15 km/h","About 15 km/h"],["15 km h","About 15 km/h"],
 ["air pollution and greenhouse gases","Air pollution and greenhouse gas emissions"]
].forEach(([u,e]) => t(u,e,true));

console.log("C) wrong answers must still fail");
[["nuclear fusion","Nuclear fission"],["tertiary consumers","Primary consumers"],
 ["oxygen","Nitrogen"],["decomposition","Combination"],["anode","Cathode"],
 ["","Methane"],["blue","Blue colour fades and reddish-brown copper deposits"],
 ["coal","Coal and petroleum"],["reducing agent","Oxidizing agent"],
 ["endothermic","Exothermic reaction"],["water","Methane"],
 ["magnesium hydroxide","Calcium hydroxide"],["fusion","Fission"]
].forEach(([u,e]) => t(u,e,false));

console.log(`\npass=${pass} fail=${fail}`);
process.exitCode = fail ? 1 : 0;
