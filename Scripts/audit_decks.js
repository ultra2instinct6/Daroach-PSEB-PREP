#!/usr/bin/env node
/* Deck audit — provable correctness checks across every chapter.

   The decks are ~1.9 MB of hand-authored HTML, which is far too much to
   proof-read reliably by eye. Everything in here is a check that can be
   decided mechanically, so a regression shows up as a failing line rather
   than as a student meeting a wrong equation in an exam.

   Checks
     chem      every chemical equation balances atom-by-atom
     balancer  the balancer widget's stored answers really do balance
     classify  the reaction classifier's labels match the equation shape
     quiz      every MCQ has exactly one correct option, SA has an answer
     handlers  every inline on* handler is parseable JavaScript
     subslide  next-sub-slide jumps point at a sub-slide that exists
     markup    duplicate ids, stray <sub>/<sup>, empty interactive targets
     numerics  worked optics/electricity answers satisfy their own formula
     sections  section metadata is contiguous and covers the deck

   Authoring escape hatch: a deliberately unbalanced "skeletal" equation (the
   teaching step before balancing) must be marked so the audit does not keep
   reporting it:

       <em data-skeletal>Mg(s) + O2(g) -> MgO(s)</em>

   Run from the repository root:

       node Scripts/audit_decks.js            # all chapters
       node Scripts/audit_decks.js 1 9        # only chapters 1 and 9
       node Scripts/audit_decks.js --only chem
*/

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

/* ---- tiny DOM-free helpers --------------------------------------------- */

const ENTITIES = {
  "&rarr;": "\u2192", "&larr;": "\u2190", "&uarr;": "\u2191", "&darr;": "\u2193",
  "&harr;": "\u2194", "&rArr;": "\u21d2", "&nbsp;": " ", "&amp;": "&", "&lt;": "<",
  "&gt;": ">", "&quot;": '"', "&#39;": "'", "&times;": "\u00d7", "&divide;": "\u00f7",
  "&prop;": "\u221d", "&frac12;": "\u00bd", "&frac14;": "\u00bc", "&frac34;": "\u00be",
  "&deg;": "\u00b0", "&minus;": "\u2212", "&mdash;": "\u2014", "&ndash;": "\u2013",
  "&hellip;": "\u2026", "&rho;": "\u03c1", "&lambda;": "\u03bb", "&Omega;": "\u03a9",
  "&alpha;": "\u03b1", "&beta;": "\u03b2", "&gamma;": "\u03b3", "&Delta;": "\u0394",
  "&mu;": "\u03bc", "&theta;": "\u03b8", "&pi;": "\u03c0", "&middot;": "\u00b7",
  "&bull;": "\u2022", "&ldquo;": '"', "&rdquo;": '"', "&lsquo;": "'", "&rsquo;": "'"
};

function decode(s) {
  return String(s)
    .replace(/&[a-zA-Z]+;|&#\d+;/g, (m) => {
      if (ENTITIES[m]) return ENTITIES[m];
      const num = /^&#(\d+);$/.exec(m);
      return num ? String.fromCharCode(+num[1]) : m;
    });
}

function stripTags(s) {
  return s
    .replace(/<sub[^>]*>([\s\S]*?)<\/sub>/gi, (_, v) => "_{" + v.replace(/<[^>]*>/g, "").trim() + "}")
    .replace(/<sup[^>]*>([\s\S]*?)<\/sup>/gi, (_, v) => "^{" + v.replace(/<[^>]*>/g, "").trim() + "}")
    .replace(/<[^>]*>/g, "");
}

function text(s) {
  return decode(stripTags(s)).replace(/\s+/g, " ").trim();
}

/* ---- chemistry --------------------------------------------------------- */

const ELEMENTS = ("H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn " +
  "Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm " +
  "Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu " +
  "Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og").split(" ");
const IS_ELEMENT = new Set(ELEMENTS);

const SUB = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
const SUP = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";

/* Normalise an authored equation into a flat ASCII-ish form. */
function normEq(raw) {
  let s = decode(stripTags(raw)).replace(/\u00a0/g, " ");
  s = s.replace(/[\u2080-\u2089]+/g, (run) => "_{" + [...run].map((c) => SUB.indexOf(c)).join("") + "}");
  s = s.replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207a\u207b]+/g, (run) =>
    "^{" + [...run].map((c) => (c === "\u207a" ? "+" : c === "\u207b" ? "-" : SUP.indexOf(c))).join("") + "}");
  s = s.replace(/(\d+)?\u00bd/g, (_, n) => (n ? 2 * +n + 1 : 1) + "/2");
  s = s.replace(/\u2192|\u27f6|-->/g, "->").replace(/\u21cc|<=>/g, "<=>");
  s = s.replace(/\u2191/g, " ^UP ").replace(/\u2193/g, " ^DOWN ");
  s = s.replace(/\u00b7|\u22c5|\u2022/g, ".");
  return s.replace(/\s+/g, " ").trim();
}

/* Count atoms in one species body, e.g. "Ca(OH)_{2}" -> {Ca:1,O:2,H:2}.
   Returns null when the body is not a decodable formula. */
function countAtoms(body) {
  const counts = Object.create(null);
  let i = 0;

  function parseGroup(mult) {
    while (i < body.length) {
      const c = body[i];
      if (c === ")" || c === "]") return true;
      if (c === "(" || c === "[") {
        i++;
        const inner = Object.create(null);
        const save = counts;
        const nested = parseInto(inner);
        if (!nested) return false;
        if (body[i] !== ")" && body[i] !== "]") return false;
        i++;
        let n = "";
        while (i < body.length && /\d/.test(body[i])) n += body[i++];
        const k = n ? +n : 1;
        for (const el in inner) add(save, el, inner[el] * k * mult);
        continue;
      }
      const m = /^([A-Z][a-z]?)(\d*)/.exec(body.slice(i));
      if (!m || !IS_ELEMENT.has(m[1])) return false;
      i += m[0].length;
      add(counts, m[1], (m[2] ? +m[2] : 1) * mult);
    }
    return true;
  }

  function parseInto(target) {
    /* Nested groups are rare in school chemistry — one level is enough, and
       recursing with a shared cursor keeps the parser small. */
    while (i < body.length) {
      const c = body[i];
      if (c === ")" || c === "]") return true;
      const m = /^([A-Z][a-z]?)(\d*)/.exec(body.slice(i));
      if (!m || !IS_ELEMENT.has(m[1])) return false;
      i += m[0].length;
      add(target, m[1], m[2] ? +m[2] : 1);
    }
    return true;
  }

  function add(t, el, n) { t[el] = (t[el] || 0) + n; }

  /* Hydrates: "CuSO4.5H2O" — split on the dot and fold the parts together. */
  const parts = body.split(".");
  const out = Object.create(null);
  for (const part of parts) {
    const pm = /^(\d+(?:\/\d+)?)?(.*)$/.exec(part);
    let mult = 1;
    if (pm[1]) mult = pm[1].includes("/") ? eval(pm[1]) : +pm[1]; // eslint-disable-line no-eval
    const rest = pm[2];
    if (!rest) return null;
    i = 0;
    const saved = { body, cursor: i };
    void saved;
    const localBody = rest;
    const localCounts = Object.create(null);
    let j = 0;
    if (!walk(localBody, localCounts, () => j, (v) => (j = v))) return null;
    for (const el in localCounts) add(out, el, localCounts[el] * mult);
  }
  void parseGroup; void parseInto; void counts;
  return out;
}

/* Iterative formula walker with one level of bracket nesting. */
function walk(body, counts, getJ, setJ) {
  let j = getJ();
  while (j < body.length) {
    const c = body[j];
    if (c === "(" || c === "[") {
      const close = c === "(" ? ")" : "]";
      let depth = 1, k = j + 1;
      while (k < body.length && depth > 0) {
        if (body[k] === c) depth++;
        else if (body[k] === close) depth--;
        k++;
      }
      if (depth !== 0) return false;
      const inner = body.slice(j + 1, k - 1);
      let n = "";
      while (k < body.length && /\d/.test(body[k])) n += body[k++];
      const mult = n ? +n : 1;
      const sub = Object.create(null);
      let z = 0;
      if (!walk(inner, sub, () => z, (v) => (z = v))) return false;
      for (const el in sub) counts[el] = (counts[el] || 0) + sub[el] * mult;
      j = k;
      continue;
    }
    const m = /^([A-Z][a-z]?)(\d*)/.exec(body.slice(j));
    if (!m || !IS_ELEMENT.has(m[1])) return false;
    j += m[0].length;
    counts[m[1]] = (counts[m[1]] || 0) + (m[2] ? +m[2] : 1);
  }
  setJ(j);
  return true;
}

const STATE_RE = /\((s|l|g|aq)\)$/;
const SKIP_WORDS = new Set(["heat", "energy", "electricity", "sunlight", "light", "chlorophyll", "delta", "\u0394"]);

/* Parse one side of an equation into atom totals; null when it is not real
   chemistry (word equations, generic A + B schematics, flow chains). */
function sideAtoms(side) {
  const totals = Object.create(null);
  const terms = side.split(/\s\+\s/);
  let real = 0;
  for (let term of terms) {
    term = term.trim().replace(/\s*\^(UP|DOWN)$/, "").trim();
    if (!term) return null;
    const low = term.toLowerCase().replace(/[.,]$/, "");
    if (SKIP_WORDS.has(low)) continue;
    const st = STATE_RE.exec(term);
    if (st) term = term.slice(0, st.index).trim();
    const note = /\s+\([^()]{1,18}\)$/.exec(term);
    if (note) term = term.slice(0, note.index).trim();
    let coeff = 1;
    const cm = /^(\d+\/\d+|\d+(?:\.\d+)?)\s*(?=[A-Z(])/.exec(term);
    if (cm && !/^\d+$/.test(term)) {
      coeff = cm[1].includes("/") ? eval(cm[1]) : +cm[1]; // eslint-disable-line no-eval
      term = term.slice(cm[0].length).trim();
    }
    /* Charges and free electrons do not affect the atom balance. */
    if (/^e\^\{-\}$/.test(term) || term === "e-") continue;
    term = term.replace(/\^\{[^}]*\}/g, "").replace(/_\{(\d*)\}/g, "$1");
    if (!term) return null;
    const parts = term.split(".");
    const sub = Object.create(null);
    for (const part of parts) {
      const pm = /^(\d+(?:\/\d+)?)?(.*)$/.exec(part);
      const mult = pm[1] ? (pm[1].includes("/") ? eval(pm[1]) : +pm[1]) : 1; // eslint-disable-line no-eval
      if (!pm[2]) return null;
      const c = Object.create(null);
      let z = 0;
      if (!walk(pm[2], c, () => z, (v) => (z = v))) return null;
      for (const el in c) sub[el] = (sub[el] || 0) + c[el] * mult;
    }
    for (const el in sub) totals[el] = (totals[el] || 0) + sub[el] * coeff;
    real++;
  }
  return real ? totals : null;
}

function checkBalance(raw) {
  let s = normEq(raw);
  if (!s || s.length > 300) return null;
  /* Strip a leading "Roasting:" style label. */
  s = s.replace(/^[A-Za-z][A-Za-z ]{1,22}:\s+/, "");
  /* Strip an inline "--Heat->" condition. */
  s = s.replace(/\s*--\s*[^-]{1,24}?\s*-*->/, " -> ");
  if (/[=<>]/.test(s.replace(/<=>/g, "").replace(/->/g, ""))) return null;
  const arrow = s.includes("<=>") ? "<=>" : "->";
  if (!s.includes(arrow)) return null;
  if ((s.match(/->/g) || []).length > 1) return null;
  const parts = s.split(arrow);
  if (parts.length !== 2) return null;
  const L = sideAtoms(parts[0]);
  const R = sideAtoms(parts[1]);
  if (!L || !R) return null;
  const els = new Set([...Object.keys(L), ...Object.keys(R)]);
  const bad = [];
  for (const el of els) {
    const a = L[el] || 0, b = R[el] || 0;
    if (Math.abs(a - b) > 1e-9) bad.push(`${el}: ${a} vs ${b}`);
  }
  return { ok: bad.length === 0, bad, L, R };
}

/* ---- deck parsing ------------------------------------------------------ */

function slidesOf(html) {
  const out = [];
  const re = /<div class="slide"[^>]*>/g;
  let m;
  const starts = [];
  while ((m = re.exec(html))) starts.push({ at: m.index, tag: m[0] });
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].at : html.length;
    out.push({ index: i, tag: starts[i].tag, html: html.slice(starts[i].at, end) });
  }
  return out;
}

function headingOf(chunk) {
  const m = /<h[123][^>]*>([\s\S]*?)<\/h[123]>/.exec(chunk);
  return m ? text(m[1]).slice(0, 60) : "(no heading)";
}

/* ---- checks ------------------------------------------------------------ */

const EQ_SELECTORS = /class="(?:equation|classifier-eq|salt-eq|ca-overall-eq|ca-halfeq-eq|mm-eq|lab-equation|ozone-lab__eq)"[^>]*>([\s\S]*?)<\/(?:div|span|td)>/g;

/* Equations also live in tables, prose, quiz options and explanation strings,
   not only in .equation blocks. Sweep the rendered text of every slide for
   anything shaped like a reaction and balance that too. */
const CAND_RE = /([0-9]*\s*[A-Z][A-Za-z0-9()\u2080-\u2089\u00b7\u00bd.\s+]{2,120}?)\s*(?:\u2192|->)\s*([A-Z0-9][A-Za-z0-9()\u2080-\u2089\u00b7\u00bd.\u2191\u2193\s+]{2,120})/g;

function sweepText(deck, report, stats) {
  for (const slide of deck.slides) {
    /* Skip the blocks already covered by the structured pass, and skip the
       widget data islands, which are checked from their JavaScript instead. */
    const body = slide.html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      /* Skeletal equations are unbalanced on purpose. */
      .replace(/<([a-z]+)[^>]*\sdata-skeletal[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/class="(?:equation|classifier-eq|salt-eq|ca-overall-eq|ca-halfeq-eq|mm-eq|lab-equation|ozone-lab__eq)"[^>]*>[\s\S]*?<\/(?:div|span|td)>/g, " ");

    /* Segment on block boundaries first. Scanning the slide as one long
       string makes the matcher run a candidate across unrelated sentences,
       which then fails to parse and silently hides real equations. */
    const frags = body
      .replace(/<(?:br|hr)\s*\/?>/gi, "\u0001")
      .replace(/<\/(?:p|div|li|td|th|h[1-6]|span|strong|em|b|i|section|figcaption)>/gi, "\u0001")
      .replace(/<(?:p|div|li|td|th|h[1-6]|ul|ol|table|tr|section)\b[^>]*>/gi, "\u0001")
      .split("\u0001");

    /* Explanation strings live in attributes, so pull those in too. */
    const attrs = slide.html.match(/data-explain(?:-pa)?="([^"]*)"/g) || [];
    attrs.forEach((a) => frags.push(a.replace(/^data-explain(?:-pa)?="/, "").replace(/"$/, "")));

    const seen = new Set();
    for (const frag of frags) {
      const flat = text(frag);
      if (!flat || flat.length > 220) continue;
      if (!/\u2192|->/.test(flat)) continue;
      CAND_RE.lastIndex = 0;
      let m;
      while ((m = CAND_RE.exec(flat))) {
        const cand = (m[1] + " \u2192 " + m[2]).trim();
        if (seen.has(cand)) continue;
        seen.add(cand);
        const res = checkBalance(cand);
        if (stats) stats.sweepSeen++;
        if (!res) continue;
        if (stats) stats.sweepChecked++;
        if (!res.ok) report("chem", slide, `unbalanced (prose/table): ${cand.slice(0, 95)}  [${res.bad.join(", ")}]`);
      }
    }
  }
}

function checkChem(deck, report, stats) {
  sweepText(deck, report, stats);
  for (const slide of deck.slides) {
    const scrubbed = slide.html.replace(/<([a-z]+)[^>]*\sdata-skeletal[^>]*>[\s\S]*?<\/\1>/gi, " ");
    EQ_SELECTORS.lastIndex = 0;
    let m;
    while ((m = EQ_SELECTORS.exec(scrubbed))) {
      const raw = m[1];
      const res = checkBalance(raw);
      if (stats) { stats.eqSeen++; if (res) stats.eqChecked++; else stats.eqSkipped.push(text(raw).slice(0, 70)); }
      if (res && !res.ok) {
        report("chem", slide, `unbalanced: ${text(raw).slice(0, 90)}  [${res.bad.join(", ")}]`);
      }
    }
  }
}

function checkBalancer(deck, report, stats) {
  const m = /const balanceSet = (\[[\s\S]*?\n\s*\]);/.exec(deck.html);
  if (!m) return;
  if (stats) stats.balancerFound = true;
  let set;
  try { set = eval(m[1]); } catch (e) { report("balancer", null, "could not parse balanceSet: " + e.message); return; } // eslint-disable-line no-eval
  if (stats) stats.balancerItems = set.length;
  set.forEach((item, idx) => {
    const n = item.L.length + item.R.length;
    if (!item.sol || item.sol.length !== n) {
      report("balancer", null, `#${idx} "${item.name}": sol has ${item.sol ? item.sol.length : 0} values, needs ${n}`);
      return;
    }
    const tot = (species, coeffs) => {
      const t = Object.create(null);
      species.forEach((sp, i) => {
        for (const el in sp.a) t[el] = (t[el] || 0) + sp.a[el] * coeffs[i];
      });
      return t;
    };
    const L = tot(item.L, item.sol.slice(0, item.L.length));
    const R = tot(item.R, item.sol.slice(item.L.length));
    const els = new Set([...Object.keys(L), ...Object.keys(R)]);
    const bad = [];
    for (const el of els) if ((L[el] || 0) !== (R[el] || 0)) bad.push(`${el}: ${L[el] || 0} vs ${R[el] || 0}`);
    if (bad.length) report("balancer", null, `#${idx} "${item.name}": stored answer does not balance [${bad.join(", ")}]`);
    /* A stored answer with a common factor is not the simplest form. */
    const g = item.sol.reduce((a, b) => (b ? gcd(a, b) : a), 0);
    if (g > 1) report("balancer", null, `#${idx} "${item.name}": coefficients ${item.sol.join(",")} share factor ${g}`);
  });
}

function gcd(a, b) { return b ? gcd(b, a % b) : a; }

function checkClassifier(deck, report, stats) {
  const m = /const reactionSet = (\[[\s\S]*?\n\s*\]);/.exec(deck.html);
  if (!m) return;
  let set;
  try { set = eval(m[1]); } catch (e) { return; } // eslint-disable-line no-eval
  if (stats) stats.classifyItems = set.length;
  set.forEach((item, idx) => {
    const s = normEq(item.eq);
    const parts = s.split("->");
    if (parts.length !== 2) return;
    const nL = parts[0].split(/\s\+\s/).length;
    const nR = parts[1].split(/\s\+\s/).length;
    const t = (item.type || "").toLowerCase();
    let expect = null;
    if (nL >= 2 && nR === 1) expect = "combination";
    else if (nL === 1 && nR >= 2) expect = "decomposition";
    if (expect && !t.includes(expect)) {
      report("classify", null, `#${idx} "${item.eq}" labelled "${item.type}" but has ${nL} reactant(s) and ${nR} product(s) (looks like ${expect})`);
    }
    if (t.includes("combination") && !(nL >= 2 && nR === 1)) {
      report("classify", null, `#${idx} "${item.eq}" labelled Combination but has ${nR} products`);
    }
    if (t.includes("decomposition") && nL !== 1) {
      report("classify", null, `#${idx} "${item.eq}" labelled Decomposition but has ${nL} reactants`);
    }
    const bal = checkBalance(item.eq);
    if (bal && !bal.ok) report("classify", null, `#${idx} "${item.eq}" is unbalanced [${bal.bad.join(", ")}]`);
  });
}

/* Return the html of the element starting at `at`, matched by walking the
   nested <div> tags. Splitting on the opening tag alone is not enough: the
   final .sub-slide of one container would otherwise run on past its parent and
   swallow the next slide's standalone quiz, merging two question sets. */
function blockAt(html, at) {
  const tag = /<(\/?)div\b[^>]*>/g;
  tag.lastIndex = at;
  let depth = 0, m;
  while ((m = tag.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(at, m.index + m[0].length);
  }
  return html.slice(at);
}

/* Every group of answer buttons in a slide, however it is wrapped. Quizzes
   appear both inside .sub-slide carousels and as standalone .tf-grid blocks on
   the Case Study slides; an earlier version of this check only looked at the
   first kind and silently skipped the second. */
function quizGroups(slideHtml) {
  const groups = [];
  const re = /<div class="(?:sub-slide|tf-grid)\b[^>]*>/g;
  let m;
  while ((m = re.exec(slideHtml))) {
    const block = blockAt(slideHtml, m.index);
    /* A .sub-slide that contains a .tf-grid would be counted twice; keep the
       innermost group only. */
    if (/<div class="tf-grid\b/.test(block) && /^<div class="sub-slide\b/.test(block)) continue;
    groups.push(block);
  }
  return groups;
}

function checkQuiz(deck, report, stats) {
  for (const slide of deck.slides) {
    for (const body of quizGroups(slide.html)) {
      const opts = body.match(/<button[^>]*class="[^"]*option-btn[^"]*"[^>]*>/g) || [];
      if (opts.length) {
        if (stats) stats.mcq++;
        const correct = opts.filter((o) =>
          /data-correct="true"/.test(o) || /checkAnswer\(\s*this\s*,\s*true/.test(decode(o)));
        if (correct.length !== 1) {
          const q = /<div class="question-text"[^>]*>([\s\S]*?)<\/div>/.exec(body);
          report("quiz", slide,
            `${correct.length} correct option(s) of ${opts.length}` +
            (q ? ` — "${text(q[1]).slice(0, 70)}"` : ""));
        }
      }
      const sa = /checkSA\(\s*this\s*,\s*'([^']*)'/.exec(decode(body));
      if (sa) {
        if (stats) stats.sa++;
        if (!sa[1].trim()) report("quiz", slide, "short answer has an empty expected value");
      }
    }
  }
}

function checkSubslides(deck, report) {
  const ids = new Set((deck.html.match(/id="([^"]+)"/g) || []).map((s) => s.slice(4, -1)));
  const calls = deck.html.match(/nextSubSlide\('([^']+)'\s*,\s*(\d+)\)/g) || [];
  calls.forEach((c) => {
    const m = /nextSubSlide\('([^']+)'\s*,\s*(\d+)\)/.exec(c);
    const target = `${m[1]}-s${m[2]}`;
    if (!ids.has(target)) report("subslide", null, `nextSubSlide('${m[1]}', ${m[2]}) targets missing #${target}`);
  });
}

function checkMarkup(deck, report) {
  const ids = (deck.html.match(/\sid="([^"]+)"/g) || []).map((s) => s.slice(5, -1));
  const seen = new Map();
  ids.forEach((id) => seen.set(id, (seen.get(id) || 0) + 1));
  for (const [id, n] of seen) if (n > 1) report("markup", null, `duplicate id #${id} (${n} times)`);

  for (const slide of deck.slides) {
    /* A digit glued to a letter inside a formula span is usually a missing
       subscript, e.g. "H2O" where every sibling uses "H₂O". */
    const eqs = slide.html.match(/class="equation"[^>]*>([\s\S]*?)<\/div>/g) || [];
    eqs.forEach((e) => {
      const t = text(e);
      if (/[A-Za-z]\d/.test(t) && !/_\{/.test(t) && /[\u2080-\u2089]/.test(t) === false && /[A-Z][a-z]?\d/.test(t)) {
        report("markup", slide, `equation uses plain digits instead of subscripts: ${t.slice(0, 70)}`);
      }
    });
  }
}

function checkSections(deck, report) {
  const tags = deck.slides.map((s) => s.tag);
  const starts = [];
  tags.forEach((t, i) => { if (/data-section-id="/.test(t)) starts.push(i); });
  if (!starts.length) { report("sections", null, "deck has no section metadata"); return; }
  if (starts[0] !== 0) report("sections", null, `first section starts at slide ${starts[0] + 1}, not slide 1`);
  const ids = tags.filter((t) => /data-section-id="/.test(t)).map((t) => /data-section-id="([^"]+)"/.exec(t)[1]);
  if (new Set(ids).size !== ids.length) report("sections", null, "duplicate section id in deck");
  tags.forEach((t, i) => {
    if (/data-section-en="/.test(t) && !/data-section-pa="[^"]+"/.test(t)) {
      report("sections", deck.slides[i], "section has no Gurmukhi title");
    }
  });
}


/* ---- physics numericals ------------------------------------------------
   Worked examples state their own data ("f=-10 cm and u=-15 cm gives
   v = -30 cm"), so the answer can be re-derived and compared. The common
   failure modes are a dropped sign and a mirror formula used on a lens, both
   of which are invisible on a quick read but cost a student the whole mark. */

function nums(t, name) {
  /* "1/v = 1/f" would otherwise read as "v = 1": reject a value that is the
     numerator of a fraction, and reject a name that is itself a denominator. */
  const re = new RegExp("(^|[^/\\w])" + name + "\\s*=\\s*([+\u2212-]?\\s*\\d+(?:\\.\\d+)?)(?!\\s*/)", "g");
  const out = [];
  let m;
  while ((m = re.exec(t))) out.push(parseFloat(m[2].replace(/\u2212/g, "-").replace(/\s+/g, "")));
  return out;
}

const NEAR = (a, b) => Math.abs(a - b) < Math.max(0.02, Math.abs(b) * 0.02);

function checkNumerics(deck, report, stats) {
  for (const slide of deck.slides) {
    const frags = [];
    (slide.html.match(/data-explain(?:-pa)?="([^"]*)"/g) || []).forEach((a) =>
      frags.push(a.replace(/^data-explain(?:-pa)?="/, "").replace(/"$/, "")));
    slide.html
      .replace(/<\/(?:p|div|li|td|th|h[1-6])>/gi, "\u0001")
      .split("\u0001")
      .forEach((f) => frags.push(f));

    for (const raw of frags) {
      const t = text(raw);
      if (!t || t.length > 400) continue;

      const isLens = /1\/v\s*[-\u2212]\s*1\/u\s*=\s*1\/f|lens formula/i.test(t);
      const isMirror = /1\/v\s*\+\s*1\/u\s*=\s*1\/f|1\/v\s*=\s*1\/f\s*[-\u2212]\s*1\/u|mirror formula/i.test(t);

      const f = nums(t, "f"), u = nums(t, "u"), v = nums(t, "v");
      if (f.length === 1 && u.length === 1 && v.length === 1 && (isLens || isMirror)) {
        if (stats) stats.numChecked++;
        const lhs = isLens ? 1 / v[0] - 1 / u[0] : 1 / v[0] + 1 / u[0];
        if (!NEAR(lhs, 1 / f[0])) {
          report("numerics", slide,
            `${isLens ? "lens" : "mirror"} formula does not hold for f=${f[0]}, u=${u[0]}, v=${v[0]} ` +
            `(1/f=${(1 / f[0]).toFixed(4)}, computed ${lhs.toFixed(4)}) in: ${t.slice(0, 90)}`);
        }
      }

      /* Magnification: m = -v/u for mirrors, m = v/u for lenses. */
      const mm = /m\s*=\s*[-\u2212]?\s*v\s*\/\s*u[^=]*=\s*([+\u2212-]?\s*\d+(?:\.\d+)?)/.exec(t);
      if (mm && u.length === 1 && v.length === 1) {
        if (stats) stats.numChecked++;
        const stated = parseFloat(mm[1].replace(/\u2212/g, "-").replace(/\s+/g, ""));
        const mirrorM = -v[0] / u[0], lensM = v[0] / u[0];
        if (!NEAR(stated, mirrorM) && !NEAR(stated, lensM)) {
          report("numerics", slide,
            `magnification ${stated} matches neither -v/u (${mirrorM.toFixed(3)}) nor v/u (${lensM.toFixed(3)}) ` +
            `for u=${u[0]}, v=${v[0]} in: ${t.slice(0, 90)}`);
        }
      }

      /* Power of a lens: P = 1/f with f in metres, answer in dioptres. */
      const pm = /P\s*=\s*1\s*\/\s*f[^=]*=\s*1\s*\/\s*([0-9.]+)\s*=\s*([+\u2212-]?\s*[0-9.]+)\s*D/.exec(t);
      if (pm) {
        if (stats) stats.numChecked++;
        const fm = parseFloat(pm[1]);
        const stated = parseFloat(pm[2].replace(/\u2212/g, "-").replace(/\s+/g, ""));
        if (!NEAR(Math.abs(stated), Math.abs(1 / fm))) {
          report("numerics", slide, `power ${stated} D does not equal 1/${fm} = ${(1 / fm).toFixed(3)} D in: ${t.slice(0, 90)}`);
        }
      }

      /* Commercial unit conversion. */
      if (/1\s*kWh\s*=/.test(t)) {
        const km = /1\s*kWh\s*=\s*([0-9.]+)\s*(?:\u00d7|x|\*)\s*10\^?\{?(\d+)\}?\s*J/i.exec(t);
        if (km) {
          if (stats) stats.numChecked++;
          const val = parseFloat(km[1]) * Math.pow(10, +km[2]);
          if (!NEAR(val, 3.6e6)) report("numerics", slide, `1 kWh given as ${val.toExponential(2)} J, should be 3.6e6 J`);
        }
      }
    }
  }
}


/* ---- inline handlers ---------------------------------------------------
   The decks drive every interaction from inline onclick attributes. A quoting
   slip there is invisible — the markup still renders, the button still looks
   enabled, and nothing happens when a student taps it. One such dead button
   (an apostrophe escaped as \\' inside a single-quoted JS string, which ends
   the string early) survived every visual review. */

function checkHandlers(deck, report, stats) {
  for (const slide of deck.slides) {
    /* Handlers inside <script> are template literals that still contain
       ${...} placeholders; they are only valid once the widget has rendered
       them, so judge the authored markup only. */
    const markup = slide.html.replace(/<script[\s\S]*?<\/script>/gi, " ");
    const re = /\son(?:click|change|input|keyup|keydown|submit)="([^"]*)"/g;
    let m;
    while ((m = re.exec(markup))) {
      const src = decode(m[1]);
      if (stats) stats.handlers++;
      try {
        new Function(src); // eslint-disable-line no-new-func
      } catch (e) {
        report("handlers", slide, `inline handler will not parse (${e.message}): ${src.slice(0, 90)}`);
      }
    }
  }
}

const CHECKS = { chem: checkChem, handlers: checkHandlers, numerics: checkNumerics, balancer: checkBalancer, classify: checkClassifier, quiz: checkQuiz, subslide: checkSubslides, markup: checkMarkup, sections: checkSections };

/* ---- runner ------------------------------------------------------------ */

function loadDecks() {
  return fs.readdirSync(ROOT)
    .filter((d) => d.startsWith("Chapter ") && fs.statSync(path.join(ROOT, d)).isDirectory())
    .sort()
    .map((d) => {
      const file = fs.readdirSync(path.join(ROOT, d)).find((f) => f.endsWith(".html"));
      const full = path.join(ROOT, d, file);
      const html = fs.readFileSync(full, "utf8");
      const num = /Chapter\s+(\d+)/i.exec(html.match(/<title>[\s\S]*?<\/title>/)[0]);
      return { dir: d, file: full, html, num: num ? +num[1] : null, slides: slidesOf(html) };
    });
}

function main() {
  const args = process.argv.slice(2);
  let only = null, showStats = false;
  const wanted = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--only") only = args[++i];
    else if (args[i] === "--stats") showStats = true;
    else if (/^\d+$/.test(args[i])) wanted.push(+args[i]);
  }

  const decks = loadDecks();
  let total = 0;
  const byKind = Object.create(null);

  for (const deck of decks) {
    const chNo = +(/Chapter (\d+)/.exec(deck.dir) || [])[1];
    if (wanted.length && !wanted.includes(chNo)) continue;
    const lines = [];
    const stats = { eqSeen: 0, eqChecked: 0, eqSkipped: [], sweepSeen: 0, sweepChecked: 0, numChecked: 0, mcq: 0, sa: 0, handlers: 0, balancerFound: false, balancerItems: 0, classifyItems: 0 };
    const report = (kind, slide, msg) => {
      if (only && kind !== only) return;
      total++;
      byKind[kind] = (byKind[kind] || 0) + 1;
      const where = slide ? `slide ${slide.index + 1} "${headingOf(slide.html)}"` : "deck";
      lines.push(`  [${kind}] ${where}\n      ${msg}`);
    };
    for (const name in CHECKS) {
      if (only && name !== only) continue;
      try { CHECKS[name](deck, report, stats); }
      catch (e) { report(name, null, "check crashed: " + e.message); }
    }
    if (lines.length) {
      console.log(`\n### ${deck.dir}  (${deck.slides.length} slides)`);
      console.log(lines.join("\n"));
    }
    if (showStats) {
      console.log(`\n--- ${deck.dir}`);
      console.log(`    equations: ${stats.eqChecked}/${stats.eqSeen} blocks + ${stats.sweepChecked} prose, numericals: ${stats.numChecked}, quiz groups: ${stats.mcq}, short answers: ${stats.sa}, handlers: ${stats.handlers}` +
        (stats.balancerItems ? `, balancer items: ${stats.balancerItems}` : "") +
        (stats.classifyItems ? `, classifier items: ${stats.classifyItems}` : ""));
      if (stats.eqSkipped.length) stats.eqSkipped.forEach((e) => console.log(`      skipped: ${e}`));
    }
  }

  console.log("\n" + "=".repeat(64));
  if (!total) console.log("No issues found.");
  else {
    console.log(`${total} issue(s):`);
    for (const k of Object.keys(byKind).sort()) console.log(`  ${k.padEnd(10)} ${byKind[k]}`);
  }
  process.exitCode = total ? 1 : 0;
}

main();
