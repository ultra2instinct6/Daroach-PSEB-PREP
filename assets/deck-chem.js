/* BOLO.INSTINCT — chemical & mathematical typesetting.

   The decks were authored with Unicode chemistry ("2FeSO₄·7H₂O(s) --Heat→
   Fe₂O₃(s) + SO₂(g) ↑"). That reads acceptably but the subscripts sit on the
   baseline of whatever font happens to be installed, reaction conditions are
   drawn as ASCII ("--Heat→"), and gas/precipitate markers are loose arrows.

   Rather than rewrite thousands of equations by hand across sixteen chapters,
   this module upgrades them at runtime:

     1. Read the authored equation (Unicode, <sub>/<sup>, HTML entities).
     2. Transpile it to mhchem source — but only when every term parses as a
        real chemical species. Generic schematics ("A + B → AB"), word
        equations ("Acid + Metal → Salt") and process chains ("Nostrils →
        Trachea → Alveoli") are deliberately left exactly as they were.
     3. Render with KaTeX + mhchem, swapping the markup in only after the
        render succeeds.

   Because the original markup stays in place until a render succeeds, a
   missing/blocked KaTeX simply leaves the deck looking the way it always has.
   KaTeX is vendored under assets/katex rather than pulled from a CDN: these
   decks are used offline over rural mobile data, and the service worker
   precaches the local copy.

   Public API (window.PSEBChem):
     renderEquation(src, opts) -> HTML string, or null if it will not parse.
     toMhchem(text)            -> "\ce{...}" source, or null if not chemistry.
     upgrade(root)             -> upgrade every eligible node under root.
     ready(fn)                 -> run fn once KaTeX has loaded (or failed).

   Authors can also opt in explicitly, which bypasses all the sniffing:
     <span data-ce="CuSO4 + Fe -> FeSO4 + Cu"></span>
     <span data-tex="R_s = R_1 + R_2"></span>
*/

(function () {
  "use strict";

  var SUB = "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
  var SUP = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079";

  var ELEMENTS = ("H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn " +
    "Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm " +
    "Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu " +
    "Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og").split(" ");
  var ELEMENT_SET = {};
  for (var ei = 0; ei < ELEMENTS.length; ei++) ELEMENT_SET[ELEMENTS[ei]] = true;

  /* Common polyatomic abbreviations that are written as a unit in school
     chemistry and are not decomposable into element symbols. */
  var GROUP_SET = { R: true, X: true, Me: true, Et: true, Ph: true };

  /* Words that are really reaction *conditions*, not reactants. On the left of
     an arrow they belong above it; on the right they are an energy term. */
  var CONDITIONS = {
    heat: "\\Delta",
    "\u0394": "\\Delta",
    delta: "\\Delta",
    electricity: "\\text{Electricity}",
    electrolysis: "\\text{Electrolysis}",
    sunlight: "\\text{Sunlight}",
    light: "\\text{Light}",
    chlorophyll: "\\text{Chlorophyll}"
  };
  var ENERGY_WORDS = { energy: true, heat: true, light: true };

  function decodeEntities(s) {
    if (s.indexOf("&") === -1) return s;
    var el = document.createElement("textarea");
    el.innerHTML = s;
    return el.value;
  }

  /* Flatten authored markup into a single parseable line: <sub>2</sub> and the
     Unicode subscript ₂ must end up meaning the same thing. */
  function flatten(node) {
    var out = "";
    for (var i = 0; i < node.childNodes.length; i++) {
      var c = node.childNodes[i];
      if (c.nodeType === 3) { out += c.nodeValue; continue; }
      if (c.nodeType !== 1) continue;
      var tag = c.tagName.toLowerCase();
      if (tag === "br") { out += "\n"; continue; }
      var inner = flatten(c);
      if (tag === "sub") out += "_{" + inner.trim() + "}";
      else if (tag === "sup") out += "^{" + inner.trim() + "}";
      else out += inner;
    }
    return out;
  }

  function normalize(text) {
    var s = decodeEntities(String(text));
    s = s.replace(/\u00a0/g, " ");
    /* Unicode scripts -> explicit markers so one parser handles both styles. */
    s = s.replace(/[\u2080-\u2089]+/g, function (run) {
      var d = "";
      for (var i = 0; i < run.length; i++) d += SUB.indexOf(run[i]);
      return "_{" + d + "}";
    });
    s = s.replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207a\u207b]+/g, function (run) {
      var d = "";
      for (var i = 0; i < run.length; i++) {
        var ch = run[i];
        if (ch === "\u207a") d += "+";
        else if (ch === "\u207b") d += "-";
        else d += SUP.indexOf(ch);
      }
      return "^{" + d + "}";
    });
    s = s.replace(/(\d+)?\u00bd/g, function (_, n) { return n ? (2 * +n + 1) + "/2" : "1/2"; });
    s = s.replace(/(\d+)?\u00bc/g, function (_, n) { return n ? (4 * +n + 1) + "/4" : "1/4"; });
    s = s.replace(/(\d+)?\u00be/g, function (_, n) { return n ? (4 * +n + 3) + "/4" : "3/4"; });
    s = s.replace(/\u2192|\u27f6|\u2794|-->/g, "->");
    s = s.replace(/\u21cc|\u21c4|<=>|<-->/g, "<=>");
    s = s.replace(/\u2191/g, " ^UP ").replace(/\u2193/g, " ^DOWN ");
    s = s.replace(/\u22c5|\u00b7|\u2022/g, ".");
    s = s.replace(/\u2212/g, "-");
    return s.replace(/\s+/g, " ").trim();
  }

  /* Strict species check. This is what keeps "Acid + Metal -> Salt" and
     "Nostrils -> Trachea" out of mhchem: "Acid" would silently render as the
     actinium-ish nonsense "Ac id", so anything whose letters do not decompose
     into real element symbols is rejected outright. */
  function isFormula(body) {
    if (!body || /\s/.test(body)) return false;
    var s = body.replace(/[()\[\]]/g, "").replace(/\./g, "");
    s = s.replace(/\^\{[^}]*\}/g, "").replace(/_\{[^}]*\}/g, "");
    s = s.replace(/\d+\/\d+/g, "").replace(/\d/g, "");
    if (!s) return false;
    var seen = 0;
    while (s.length) {
      var two = s.slice(0, 2);
      var one = s.slice(0, 1);
      if (two.length === 2 && /^[A-Z][a-z]$/.test(two) && (ELEMENT_SET[two] || GROUP_SET[two])) {
        s = s.slice(2);
      } else if (ELEMENT_SET[one] || GROUP_SET[one]) {
        s = s.slice(1);
      } else {
        return false;
      }
      seen++;
      if (seen > 40) return false;
    }
    return true;
  }

  /* "_{2}" / "^{3+}" markers back to mhchem's bare notation. mhchem wants
     H2O and Fe^3+, not H_{2}O. */
  function toMhchemBody(body) {
    return body
      .replace(/_\{([^}]*)\}/g, "$1")
      .replace(/\^\{([^}]*)\}/g, function (_, v) { return "^" + v; });
  }

  var STATE_RE = /\((s|l|g|aq)\)$/;
  /* A parenthesised note that follows a species after a space — "CO₂(g)
     (excess)" — is an annotation, not part of the formula. */
  var NOTE_RE = /\s+\(([^()]{1,18})\)$/;
  /* "A + B → AB" style schematics: letters standing in for "some substance". */
  var PLACEHOLDER_RE = /^[A-E]{1,3}$/;

  function texEscape(s) {
    return String(s).replace(/([{}\\$&#^_%~])/g, "\\$1");
  }

  function parseTerm(raw) {
    var t = raw.trim();
    if (!t) return null;

    var term = {
      phase: "", marker: "", coeff: "", body: "", note: "",
      condition: null, energy: false, placeholder: false
    };

    if (/\^UP$/.test(t)) { term.marker = " ^"; t = t.replace(/\s*\^UP$/, "").trim(); }
    else if (/\^DOWN$/.test(t)) { term.marker = " v"; t = t.replace(/\s*\^DOWN$/, "").trim(); }

    var low = t.toLowerCase().replace(/[.,]$/, "");
    if (CONDITIONS[low]) {
      term.condition = CONDITIONS[low];
      term.energy = !!ENERGY_WORDS[low];
      term.body = "\\text{" + t.charAt(0).toUpperCase() + t.slice(1) + "}";
      return term;
    }
    if (ENERGY_WORDS[low]) {
      term.energy = true;
      term.body = "\\text{" + t.charAt(0).toUpperCase() + t.slice(1) + "}";
      return term;
    }

    var nm = NOTE_RE.exec(t);
    if (nm && !/^(s|l|g|aq)$/.test(nm[1])) { term.note = nm[1]; t = t.slice(0, nm.index).trim(); }

    var st = STATE_RE.exec(t);
    if (st) { term.phase = "(" + st[1] + ")"; t = t.slice(0, st.index).trim(); }

    var co = /^(\d+\/\d+|\d+(?:\.\d+)?)\s*(?=[A-Z(]|e\^)/.exec(t);
    if (co && !/^\d+$/.test(t)) { term.coeff = co[1]; t = t.slice(co[0].length).trim(); }

    if (PLACEHOLDER_RE.test(t)) term.placeholder = true;
    else if (/^e\^\{-\}$/.test(t) || t === "e-") {
      /* Half-equations carry a free electron, which mhchem spells "e-" and
         which would otherwise fail the element check. */
      term.body = "e-";
      return term;
    } else if (!isFormula(t)) return null;

    term.body = toMhchemBody(t);
    return term;
  }

  function termSource(term) {
    var coeff = term.coeff ? term.coeff + " " : "";
    var note = term.note ? " $\\text{(" + texEscape(term.note) + ")}$" : "";
    return coeff + term.body + term.phase + term.marker + note;
  }

  function conditionSource(raw) {
    var c = raw.trim().replace(/^-+|-+$/g, "").trim();
    if (!c) return "";
    var low = c.toLowerCase();
    if (CONDITIONS[low]) return "[" + CONDITIONS[low] + "]";
    /* "373K", "1073 K", "500°C" are temperatures: \pu typesets the unit. */
    var temp = /^(\d+(?:\.\d+)?)\s*(K|\u00b0C|\u00baC|C)$/.exec(c);
    if (temp) {
      var unit = temp[2] === "K" ? "K" : "\\degree C";
      return "[\\pu{" + temp[1] + " " + unit + "}]";
    }
    return "[\\text{" + texEscape(c) + "}]";
  }

  /* Unicode / HTML chemistry -> mhchem source. Returns null when the string is
     not confidently a chemical equation, which is the common case for the
     physics and biology decks. */
  function toMhchem(text) {
    var s = normalize(text);
    if (!s || s.length > 260) return null;

    /* "Roasting: 2ZnS + 3O₂ → …" — the deck labels some reactions. Keep the
       label as prose and typeset only the reaction after it. */
    var label = "";
    var lm = /^([A-Za-z][A-Za-z ]{1,22}):\s+(?=\S)/.exec(s);
    if (lm) { label = lm[1]; s = s.slice(lm[0].length); }

    var hasArrow = s.indexOf("->") !== -1 || s.indexOf("<=>") !== -1;
    /* An "=" means this is an algebraic formula (V = IR), not a reaction. */
    if (/[=<>]/.test(s.replace(/<=>/g, "").replace(/->/g, ""))) return null;

    if (!hasArrow) {
      /* A lone species such as "CH₄" still deserves real subscripts. The digit
         requirement keeps bare physics symbols ("V", "I") out. */
      var only = parseTerm(s);
      if (!only || only.condition || only.energy || only.placeholder) return null;
      if (!/\d/.test(only.body)) return null;
      return wrapLabel(label, "\\ce{" + termSource(only) + "}");
    }

    /* A chain of two or more arrows is a flow diagram, not a reaction. */
    if ((s.match(/->/g) || []).length > 1) return null;

    var arrow = s.indexOf("<=>") !== -1 ? "<=>" : "->";
    var cond = "";
    /* "--Heat->" / "--373K->": the dashes are an ASCII stand-in for a label
       that belongs above the arrow, which is where it actually goes. */
    var dashed = /\s*--\s*([^-\s][^-]*?)\s*-*->/.exec(s);
    if (dashed) {
      cond = conditionSource(dashed[1]);
      s = s.slice(0, dashed.index) + " -> " + s.slice(dashed.index + dashed[0].length);
    }

    var parts = s.split(arrow);
    if (parts.length !== 2) return null;

    var sides = [];
    var placeholders = 0, species = 0;
    for (var p = 0; p < 2; p++) {
      var terms = parts[p].split(/\s\+\s/);
      var parsed = [];
      for (var i = 0; i < terms.length; i++) {
        var term = parseTerm(terms[i]);
        if (!term) return null;
        if (term.placeholder) placeholders++;
        else if (!term.condition && !term.energy) species++;
        parsed.push(term);
      }
      sides.push(parsed);
    }
    /* Either it is a schematic (A + B → AB) or it is real chemistry. A mix
       means we guessed wrong about one of the terms, so do not touch it. */
    if (placeholders && species) return null;

    var left = [], right = [], realLeft = 0, realRight = 0, i2;
    for (i2 = 0; i2 < sides[0].length; i2++) {
      var lt = sides[0][i2];
      if (lt.condition) { if (!cond) cond = "[" + lt.condition + "]"; continue; }
      if (lt.energy) continue;
      left.push(termSource(lt));
      realLeft++;
    }
    for (i2 = 0; i2 < sides[1].length; i2++) {
      var rt = sides[1][i2];
      /* On the product side "+ Energy"/"+ Heat" is information, not a
         condition — it is how the deck marks an exothermic reaction. */
      right.push(termSource(rt));
      if (!rt.energy && !rt.condition) realRight++;
    }
    if (!realLeft || !realRight) return null;

    var op = arrow === "<=>" ? "<=>" : "->";
    return wrapLabel(label, "\\ce{" + left.join(" + ") + " " + op + cond + " " + right.join(" + ") + "}");
  }

  function wrapLabel(label, ce) {
    return label ? "\\text{" + texEscape(label) + ":}\\;" + ce : ce;
  }

  /* ---- Algebraic formulas (physics decks) -------------------------------
     "R<sub>s</sub> = R<sub>1</sub> + R<sub>2</sub>", "V = I × R", "R = ρL / A".
     These are already almost LaTeX once <sub>/<sup> are flattened; the work is
     mapping Unicode operators and, crucially, refusing anything that is really
     a sentence ("n = speed of light in vacuum (c) / speed in medium (v)"). */

  var GREEK = {
    "\u03c1": "\\rho", "\u03bb": "\\lambda", "\u03b8": "\\theta", "\u0394": "\\Delta",
    "\u03bc": "\\mu", "\u03a9": "\\Omega", "\u03c0": "\\pi", "\u03b1": "\\alpha",
    "\u03b2": "\\beta", "\u03b3": "\\gamma", "\u03bd": "\\nu", "\u03c9": "\\omega",
    "\u03b5": "\\varepsilon", "\u03c6": "\\phi", "\u03b4": "\\delta", "\u03a3": "\\Sigma"
  };
  /* Longest first so "kWh" is matched before "W". */
  var UNITS = ["kWh", "dioptre", "kJ", "MJ", "kW", "MW", "mW", "Wh", "mol", "cm", "mm",
    "km", "nm", "mA", "kV", "mV", "Hz", "min", "kg", "J", "W", "V", "A", "C", "K", "N", "D"];

  function normalizeTex(text) {
    var s = decodeEntities(String(text)).replace(/\u00a0/g, " ");
    s = s.replace(/[\u2080-\u2089]+/g, function (run) {
      var d = ""; for (var i = 0; i < run.length; i++) d += SUB.indexOf(run[i]);
      return "_{" + d + "}";
    });
    s = s.replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]+/g, function (run) {
      var d = ""; for (var i = 0; i < run.length; i++) d += SUP.indexOf(run[i]);
      return "^{" + d + "}";
    });
    return s.replace(/\s+/g, " ").trim();
  }

  /* A side such as "ρL / A" or "1/R_{p}" becomes a real stacked fraction. */
  function fracify(side) {
    var parts = side.split(/(\s[+\-]\s)/);
    for (var i = 0; i < parts.length; i += 2) {
      var seg = parts[i];
      if ((seg.match(/\//g) || []).length !== 1) continue;
      var bits = seg.split("/");
      var num = bits[0].trim(), den = bits[1].trim();
      if (!num || !den) continue;
      parts[i] = " \\frac{" + num + "}{" + den + "} ";
    }
    return parts.join("");
  }

  function toTex(text) {
    var s = normalizeTex(text);
    if (!s || s.length > 160) return null;
    /* Arrows mean a process chain or a reaction, both handled elsewhere. */
    if (/[\u2192\u27f6\u21cc]|->/.test(s)) return null;
    if (!/[=\u221d]/.test(s)) return null;

    var units = [];
    s = s.replace(/[\u00d7]/g, " \\times ")
         .replace(/[\u00f7]/g, " \\div ")
         .replace(/\u221d/g, " \\propto ")
         .replace(/\u21d2/g, " \\;\\Rightarrow\\; ")
         .replace(/\u2248/g, " \\approx ")
         .replace(/\u2260/g, " \\neq ")
         .replace(/\u2264/g, " \\leq ")
         .replace(/\u2265/g, " \\geq ")
         .replace(/\u2212/g, "-")
         .replace(/[\u2032']/g, "^{\\prime}")
         .replace(/\u00b0/g, "^{\\circ}");

    s = s.replace(/[\u0370-\u03ff]/g, function (ch) { return GREEK[ch] ? " " + GREEK[ch] + " " : ch; });
    if (/[\u0370-\u03ff]/.test(s)) return null;

    /* A bare letter is a *variable* (V = W/Q), not a unit. Only treat it as a
       unit when it trails a number, as in "1 kWh" or "3.6 × 10⁶ J". */
    for (var u = 0; u < UNITS.length; u++) {
      var re = new RegExp("([0-9}]\\s*)(" + UNITS[u] + ")(?![A-Za-z])", "g");
      s = s.replace(re, function (_, pre, unit) {
        units.push(unit);
        return pre + "\u0001" + (units.length - 1) + "\u0001";
      });
    }

    /* Whatever is left must be symbols, not prose. Strip script contents and
       LaTeX commands first so "\propto" and "R_{total}" are not misread. */
    var probe = s.replace(/\\[a-zA-Z]+/g, " ")
                 .replace(/[_^]\{[^}]*\}/g, " ")
                 .replace(/\u0001\d+\u0001/g, " ");
    if (/[A-Za-z]{3,}/.test(probe)) return null;
    if (/[^\x20-\x7e\u0001]/.test(probe)) return null;

    s = s.split(/(=|\\;\\Rightarrow\\;|\\propto)/).map(function (seg, i) {
      return i % 2 ? seg : fracify(seg);
    }).join(" ");

    s = s.replace(/\u0001(\d+)\u0001/g, function (_, i) {
      return "\\,\\text{" + texEscape(units[+i]) + "}";
    });
    return s.replace(/\s+/g, " ").trim();
  }

  /* ---- KaTeX loading ---------------------------------------------------- */

  var base = (function () {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/[^/]*$/, "");
    var tag = document.querySelector('script[src*="deck-chem.js"], script[src*="deck-enhance.js"]');
    if (tag && tag.src) return tag.src.replace(/[^/]*$/, "");
    return "../assets/";
  })();

  var state = "idle";
  var waiting = [];

  function flush() {
    var q = waiting;
    waiting = [];
    for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) {} }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadKatex() {
    if (state !== "idle") return;
    state = "loading";

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = base + "katex/katex.min.css";
    document.head.appendChild(css);

    /* Preloading the two faces that carry almost every glyph in a chemical
       equation keeps the swap from reflowing a second time when they land. */
    ["KaTeX_Main-Regular", "KaTeX_Math-Italic"].forEach(function (f) {
      var l = document.createElement("link");
      l.rel = "preload";
      l.as = "font";
      l.type = "font/woff2";
      l.crossOrigin = "anonymous";
      l.href = base + "katex/fonts/" + f + ".woff2";
      document.head.appendChild(l);
    });

    loadScript(base + "katex/katex.min.js")
      .then(function () { return loadScript(base + "katex/mhchem.min.js"); })
      .then(function () {
        state = window.katex ? "ready" : "failed";
        flush();
      })["catch"](function () {
        state = "failed";
        flush();
      });
  }

  function ready(fn) {
    if (state === "ready" || state === "failed") { fn(); return; }
    waiting.push(fn);
    loadKatex();
  }

  /* ---- Rendering -------------------------------------------------------- */

  function renderEquation(src, opts) {
    if (!window.katex || !src) return null;
    opts = opts || {};
    try {
      return window.katex.renderToString(src, {
        displayMode: !!opts.displayMode,
        throwOnError: true,
        strict: false,
        output: "html",
        trust: false
      });
    } catch (e) {
      return null;
    }
  }

  var UPGRADE_SELECTOR = [
    "[data-ce]",
    "[data-tex]",
    ".equation",
    ".classifier-eq",
    ".salt-eq",
    ".salt-formula",
    ".ca-overall-eq",
    ".ca-halfeq-eq",
    ".mm-eq",
    ".lab-equation",
    ".ozone-lab__eq"
  ].join(",");

  function sourceFor(el) {
    var ce = el.getAttribute("data-ce");
    if (ce) return { src: "\\ce{" + ce + "}", explicit: true };
    var tex = el.getAttribute("data-tex");
    if (tex) return { src: tex, explicit: true };
    var flat = flatten(el);
    var mh = toMhchem(flat);
    if (mh) return { src: mh, explicit: false };
    var tx = toTex(flat);
    return tx ? { src: tx, explicit: false } : null;
  }

  function upgradeEl(el) {
    if (el.getAttribute("data-chem-state")) return false;
    /* Widgets rewrite their own equation nodes constantly (the balancer, the
       classifier); they opt in per render instead of being auto-upgraded. */
    if (el.hasAttribute("data-chem-skip")) return false;

    var info;
    try { info = sourceFor(el); } catch (e) { info = null; }
    if (!info) { el.setAttribute("data-chem-state", "plain"); return false; }

    var html = renderEquation(info.src, { displayMode: false });
    if (!html) { el.setAttribute("data-chem-state", "plain"); return false; }

    /* Freeze the height the student already sees so the swap cannot nudge the
       rest of the slide — the brief explicitly calls out layout shift. */
    var h = el.offsetHeight;
    if (h) el.style.minHeight = h + "px";

    el.setAttribute("data-chem-source", info.src);
    if (!el.hasAttribute("data-chem-fallback")) {
      el.setAttribute("data-chem-fallback", el.innerHTML);
    }
    el.innerHTML = '<span class="pseb-ce">' + html + "</span>";
    el.setAttribute("data-chem-state", "katex");
    /* Screen readers and copy-paste should still get the plain formula. */
    var plain = (decodeEntities(flatten(el)) || "").trim();
    if (!plain) el.setAttribute("aria-label", info.src);
    return true;
  }

  function upgrade(root) {
    root = root || document;
    var nodes = root.querySelectorAll ? root.querySelectorAll(UPGRADE_SELECTOR) : [];
    var n = 0;
    for (var i = 0; i < nodes.length; i++) {
      if (upgradeEl(nodes[i])) n++;
    }
    return n;
  }

  /* Drills rewrite their equation node for every new question (the reaction
     classifier, the balancer's read-out). Without this they would render once
     and then fall back to raw Unicode for the rest of the set. */
  var observer = null;
  function watch() {
    if (observer || typeof MutationObserver === "undefined") return;
    observer = new MutationObserver(function (muts) {
      var todo = [];
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        var el = t.nodeType === 1 ? t : t.parentNode;
        if (!el || !el.closest) continue;
        var host = el.closest(UPGRADE_SELECTOR);
        /* Our own swap-in is what produces .pseb-ce; ignoring it is what
           stops this observer from re-triggering itself forever. */
        if (!host || host.querySelector(".pseb-ce")) continue;
        if (todo.indexOf(host) === -1) todo.push(host);
      }
      if (!todo.length) return;
      observer.disconnect();
      for (var j = 0; j < todo.length; j++) {
        var h = todo[j];
        h.removeAttribute("data-chem-state");
        h.removeAttribute("data-chem-fallback");
        h.style.minHeight = "";
        try { upgradeEl(h); } catch (e) {}
      }
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  /* Render a single string into an element on demand — used by widgets that
     build their equations in JavaScript. Falls back to the supplied Unicode. */
  function renderInto(el, src, fallbackHtml, opts) {
    if (!el) return false;
    var html = renderEquation(src, opts);
    if (!html) {
      if (fallbackHtml != null) el.innerHTML = fallbackHtml;
      return false;
    }
    el.innerHTML = '<span class="pseb-ce">' + html + "</span>";
    return true;
  }

  function injectStyle() {
    if (document.getElementById("pseb-chem-css")) return;
    var st = document.createElement("style");
    st.id = "pseb-chem-css";
    st.textContent =
      ".pseb-ce .katex{font-size:1.08em;color:inherit}" +
      ".pseb-ce .katex .mord.text{font-family:inherit}" +
      /* Long reactions must wrap on a 375px phone instead of forcing the
         slide into horizontal scroll. */
      ".pseb-ce{display:inline-block;max-width:100%}" +
      "[data-chem-state='katex']{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch}" +
      "@media(max-width:768px){.pseb-ce .katex{font-size:1em}}" +
      "@media print{[data-chem-state='katex']{overflow:visible}}";
    document.head.appendChild(st);
  }

  var api = {
    renderEquation: renderEquation,
    renderInto: renderInto,
    toMhchem: toMhchem,
    toTex: toTex,
    normalize: normalize,
    flatten: flatten,
    sourceFor: sourceFor,
    isFormula: isFormula,
    upgrade: upgrade,
    ready: ready,
    get available() { return state === "ready"; }
  };

  if (typeof window !== "undefined") window.PSEBChem = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;

  if (typeof document !== "undefined" && document.createElement) {
    var start = function () {
      injectStyle();
      ready(function () {
        if (state !== "ready") return;
        upgrade(document);
        watch();
        document.documentElement.setAttribute("data-katex", "on");
        try {
          document.dispatchEvent(new CustomEvent("pseb:chem-ready"));
        } catch (e) {}
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }
})();
