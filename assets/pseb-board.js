/* PSEB board-exam component library — Chapters 10-16.

   Three components, all vanilla and dependency-free:

     PSEBBoard.badges(spec)      blueprint metadata chips (marks / PYQ / Bloom)
     NumericalScaffold           4-step progressive reveal for numericals,
                                 with a sign-convention pre-check
     DiagramLabelPractice        mask-and-reveal hotspot labelling on an
                                 inline SVG, bilingual on reveal

   ---------------------------------------------------------------------------
   Why plain JS and not the requested .tsx
   ---------------------------------------------------------------------------
   The brief asked for React + TypeScript components. This app has no build
   step, no bundler and no package.json: every deck is a standalone HTML file
   loading classic scripts, which is also what lets the whole syllabus work
   offline and over the file:// scheme. Adding React + a toolchain would
   contradict the brief's own constraint of keeping the bundle small for
   entry-level Android devices (React + ReactDOM alone is ~45 KB gzipped
   against the ~7 KB of this file), and would break offline/file:// support.

   So the components are implemented with the same props-in / render-out shape
   the brief describes, and the type contracts are expressed as JSDoc
   @typedefs below — these are checked by the TypeScript language service in
   VS Code exactly like .d.ts types, without shipping a compiler.

   ---------------------------------------------------------------------------
   Authoring
   ---------------------------------------------------------------------------
   Each component is declared in the deck HTML as an empty container with its
   spec inline as JSON, so the data sits next to where it renders and no
   central registry has to be kept in sync:

     <div class="pseb-numerical">
       <script type="application/json">{ ...NumericalSpec... }</script>
     </div>

     <div class="pseb-diagram-practice">
       <script type="application/json">{ ...DiagramSpec... }</script>
     </div>

   Both are hydrated on DOMContentLoaded. A malformed spec degrades to a
   visible authoring error rather than a blank slide. */

/**
 * PSEB blueprint mark weighting.
 * @typedef {"1M_OBJECTIVE"|"2M_SHORT"|"3M_NUMERICAL_OR_DIAGRAM"|"5M_LONG_DERIVATION"} PsebMarks
 */

/**
 * Revised-Bloom level the item is pitched at.
 * @typedef {"Knowledge"|"Application"|"Analysis"} BloomLevel
 */

/**
 * Blueprint metadata carried by every tagged item.
 * @typedef {Object} BoardMeta
 * @property {PsebMarks}   [pseb_marks]     Mark weighting.
 * @property {string}      [pyq_tag]        e.g. "PSEB 2023 Set A".
 * @property {BloomLevel}  [bloom_taxonomy] Cognitive level.
 */

/**
 * A bilingual string pair. Both halves always render; the language toggle
 * only changes emphasis, never presence, so layout cannot shift.
 * @typedef {{en: string, pa?: string}} Bi
 */

/**
 * One known or unknown quantity in a numerical.
 * @typedef {Object} NumVar
 * @property {string}  sym            Symbol, e.g. "u".
 * @property {string}  [val]          Value with sign, e.g. "-30". Omit for unknowns.
 * @property {string}  [unit]         Unit, e.g. "cm".
 * @property {string}  [note]         Short reason, e.g. "object is always in front".
 * @property {boolean} [neg]          Flag the sign for emphasis.
 */

/**
 * A single line of the worked substitution.
 * @typedef {Object} NumStep
 * @property {string} expr    Monospace expression line.
 * @property {string} [note]  Plain-language reason for this line.
 */

/**
 * Sign-convention pre-check shown before any working.
 * @typedef {Object} SignCheck
 * @property {Bi}       question   Prompt.
 * @property {string[]} options    Option labels.
 * @property {number}   answer     Index of the correct option.
 * @property {Bi}       why        Explanation revealed after answering.
 */

/**
 * Full spec for one scaffolded numerical.
 * @typedef {Object} NumericalSpec
 * @property {Bi}          title
 * @property {BoardMeta}   [meta]
 * @property {SignCheck}   [signCheck]
 * @property {NumVar[]}    given
 * @property {NumVar[]}    find
 * @property {string}      formula
 * @property {string}      [formulaNote]
 * @property {NumStep[]}   steps
 * @property {string}      answer        Final value WITH its unit.
 * @property {Bi}          [meaning]     What the answer physically means.
 */

/**
 * One labelled point on a diagram, positioned in percent of the stage box.
 * @typedef {Object} Hotspot
 * @property {number} x      0-100, percent from left.
 * @property {number} y      0-100, percent from top.
 * @property {string} en     English label.
 * @property {string} pa     Gurmukhi label.
 * @property {string} [note] Examiner-facing detail revealed with the label.
 */

/**
 * Full spec for one mask-and-reveal diagram.
 * @typedef {Object} DiagramSpec
 * @property {Bi}        title
 * @property {BoardMeta} [meta]
 * @property {string}    svg         Inline SVG markup for the figure.
 * @property {Hotspot[]} hotspots
 * @property {Bi}        [tip]       Standing note shown under the figure.
 */

(function () {
  "use strict";
  if (window.PSEBBoard) return;

  /* ---------------------------------------------------------------- utils */

  /** Escape text destined for innerHTML. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Render a bilingual pair with the Gurmukhi half tagged for the font stack. */
  function bi(pair, paClass) {
    if (!pair) return "";
    var out = esc(pair.en || "");
    if (pair.pa) {
      out += '<span class="' + (paClass || "pa") + '" lang="pa">' + esc(pair.pa) + "</span>";
    }
    return out;
  }

  var MARK_LABEL = {
    "1M_OBJECTIVE": "1 Mark · Objective",
    "2M_SHORT": "2 Marks · Short",
    "3M_NUMERICAL_OR_DIAGRAM": "3 Marks · Num/Diagram",
    "5M_LONG_DERIVATION": "5 Marks · Long"
  };

  /**
   * Render blueprint metadata as badges.
   * @param {BoardMeta} meta
   * @returns {string} HTML, or "" when there is nothing to show.
   */
  function badges(meta) {
    if (!meta) return "";
    var out = "";
    if (meta.pseb_marks && MARK_LABEL[meta.pseb_marks]) {
      out += '<span class="pseb-badge" data-marks="' + esc(meta.pseb_marks) + '">' +
             esc(MARK_LABEL[meta.pseb_marks]) + "</span>";
    }
    if (meta.pyq_tag) {
      out += '<span class="pseb-badge" data-pyq="1">★ ' + esc(meta.pyq_tag) + "</span>";
    }
    if (meta.bloom_taxonomy) {
      out += '<span class="pseb-badge" data-bloom="' + esc(meta.bloom_taxonomy) + '">' +
             esc(meta.bloom_taxonomy) + "</span>";
    }
    return out ? '<div class="pseb-badges">' + out + "</div>" : "";
  }

  /** Read and parse the inline JSON spec of a component container. */
  function readSpec(host) {
    var tag = host.querySelector('script[type="application/json"]');
    if (!tag) return null;
    try {
      return JSON.parse(tag.textContent);
    } catch (e) {
      /* Surface authoring errors instead of rendering an empty slide. */
      host.innerHTML = '<div class="pseb-dia-note">Component spec could not be parsed: ' +
                       esc(e.message) + "</div>";
      return null;
    }
  }

  /* ------------------------------------------------ NumericalScaffold */

  /** @param {NumVar} v */
  function varChip(v) {
    var neg = v.neg || (typeof v.val === "string" && v.val.trim().charAt(0) === "-");
    var val = v.val == null ? "?" : v.val;
    return '<span class="pseb-var' + (neg ? " is-neg" : "") + '">' +
             '<span class="pseb-var-sym">' + esc(v.sym) + "</span>" +
             '<span class="pseb-var-val">= ' + esc(val) + (v.unit ? " " + esc(v.unit) : "") + "</span>" +
             (v.note ? '<span class="pseb-var-note">' + esc(v.note) + "</span>" : "") +
           "</span>";
  }

  /* Step names are bilingual and both halves are always present, so toggling
     the reading language never changes the box height. */
  var STEP_NAMES = [
    { en: "Step 1 · Given", pa: "ਦਿੱਤਾ ਹੈ" },
    { en: "Step 2 · To Find", pa: "ਪਤਾ ਕਰਨਾ ਹੈ" },
    { en: "Step 3 · Formula", pa: "ਸੂਤਰ" },
    { en: "Step 4 · Solution & Answer", pa: "ਕਦਮ-ਦਰ-ਕਦਮ ਹੱਲ ਅਤੇ ਉੱਤਰ" }
  ];

  function stepShell(i, innerHTML) {
    var n = STEP_NAMES[i];
    return '<div class="pseb-step" data-step="' + i + '"' + (i === 0 ? "" : " hidden") + ">" +
             '<span class="pseb-step-label">' + esc(n.en) +
               ' <span class="pa" lang="pa">/ ' + esc(n.pa) + "</span></span>" +
             '<div class="pseb-step-body">' + innerHTML + "</div>" +
           "</div>";
  }

  /**
   * Mount one scaffolded numerical.
   * @param {HTMLElement} host
   * @param {NumericalSpec} spec
   */
  function mountNumerical(host, spec) {
    var html = '<div class="pseb-num-head">' + badges(spec.meta) +
                 '<p class="pseb-num-title">' + esc(spec.title.en) + "</p>" +
                 (spec.title.pa ? '<p class="pseb-num-title-pa" lang="pa">' + esc(spec.title.pa) + "</p>" : "") +
               "</div>";

    if (spec.signCheck) {
      var sc = spec.signCheck;
      html += '<div class="pseb-sign" data-sign>' +
                '<p class="pseb-sign-q">🧭 ' + bi(sc.question, "pa") + "</p>" +
                '<div class="pseb-sign-opts">' +
                  sc.options.map(function (o, i) {
                    return '<button type="button" class="pseb-sign-opt" data-opt="' + i + '">' + esc(o) + "</button>";
                  }).join("") +
                "</div>" +
                '<div class="pseb-sign-why" hidden>' + bi(sc.why, "pa") + "</div>" +
              "</div>";
    }

    html += stepShell(0, '<div class="pseb-vars">' + spec.given.map(varChip).join("") + "</div>");
    html += stepShell(1, '<div class="pseb-vars">' + spec.find.map(varChip).join("") + "</div>");
    html += stepShell(2, '<div class="pseb-formula">' + esc(spec.formula) + "</div>" +
                         (spec.formulaNote ? '<div class="pseb-work-note">' + esc(spec.formulaNote) + "</div>" : ""));

    var work = '<div class="pseb-work">' + spec.steps.map(function (s) {
      return '<div class="pseb-work-line">' + esc(s.expr) +
             (s.note ? '<span class="pseb-work-note">— ' + esc(s.note) + "</span>" : "") + "</div>";
    }).join("") + "</div>";
    work += '<div class="pseb-answer">✅ ' + esc(spec.answer) +
            (spec.meaning ? '<span class="pseb-answer-mean">' + bi(spec.meaning, "pa") + "</span>" : "") +
            "</div>";
    html += stepShell(3, work);

    html += '<div class="pseb-num-nav">' +
              '<button type="button" class="pseb-num-btn ghost" data-act="back" disabled>&larr; Back</button>' +
              '<button type="button" class="pseb-num-btn" data-act="next">Next step &rarr;</button>' +
              '<div class="pseb-num-pips">' +
                [0, 1, 2, 3].map(function (i) {
                  return '<span class="pseb-pip' + (i === 0 ? " is-on" : "") + '"></span>';
                }).join("") +
              "</div>" +
            "</div>";

    host.innerHTML = html;

    var at = 0;
    var steps = host.querySelectorAll(".pseb-step");
    var pips = host.querySelectorAll(".pseb-pip");
    var back = host.querySelector('[data-act="back"]');
    var next = host.querySelector('[data-act="next"]');

    function render() {
      for (var i = 0; i < steps.length; i++) steps[i].hidden = i > at;
      for (var j = 0; j < pips.length; j++) pips[j].classList.toggle("is-on", j <= at);
      back.disabled = at === 0;
      next.disabled = at === steps.length - 1;
      next.textContent = at === steps.length - 2 ? "Reveal answer →" : "Next step →";
    }
    next.addEventListener("click", function () { if (at < steps.length - 1) { at++; render(); } });
    back.addEventListener("click", function () { if (at > 0) { at--; render(); } });
    render();

    var signBox = host.querySelector("[data-sign]");
    if (signBox && spec.signCheck) {
      var why = signBox.querySelector(".pseb-sign-why");
      signBox.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".pseb-sign-opt") : null;
        if (!btn || btn.disabled) return;
        var picked = parseInt(btn.getAttribute("data-opt"), 10);
        var opts = signBox.querySelectorAll(".pseb-sign-opt");
        for (var i = 0; i < opts.length; i++) {
          opts[i].disabled = true;
          /* Always mark the correct option, so a wrong pick still teaches
             the rule rather than only reporting failure. */
          if (i === spec.signCheck.answer) opts[i].classList.add("is-right");
          else if (i === picked) opts[i].classList.add("is-wrong");
        }
        why.hidden = false;
      });
    }
  }

  /* --------------------------------------------- DiagramLabelPractice */

  /**
   * Mount one mask-and-reveal diagram.
   * @param {HTMLElement} host
   * @param {DiagramSpec} spec
   */
  function mountDiagram(host, spec) {
    var total = spec.hotspots.length;
    var html = badges(spec.meta) +
               '<p class="pseb-num-title">' + esc(spec.title.en) + "</p>" +
               (spec.title.pa ? '<p class="pseb-num-title-pa" lang="pa">' + esc(spec.title.pa) + "</p>" : "");

    /* The marker stays a small numbered dot for its whole life. An earlier
       build expanded it into the full bilingual label in place, which on a
       600x300 figure buried the very diagram the student is meant to read —
       so the label is published to the legend below instead. */
    html += '<div class="pseb-dia-stage"><div class="pseb-dia-fig">' + spec.svg +
              spec.hotspots.map(function (h, i) {
                return '<button type="button" class="pseb-hotspot" data-hs="' + i + '"' +
                         ' style="left:' + h.x + "%;top:" + h.y + '%"' +
                         ' aria-label="Reveal label ' + (i + 1) + ': ' + esc(h.en) + '">' +
                         (i + 1) +
                       "</button>";
              }).join("") +
            "</div></div>";

    html += '<ol class="pseb-legend">' + spec.hotspots.map(function (h, i) {
      return '<li class="pseb-leg" data-leg="' + i + '">' +
               '<span class="pseb-leg-n">' + (i + 1) + "</span>" +
               '<span class="pseb-leg-txt">' +
                 '<b class="pseb-leg-en">' + esc(h.en) + "</b>" +
                 '<span class="pseb-leg-pa" lang="pa">' + esc(h.pa) + "</span>" +
                 (h.note ? '<span class="pseb-leg-note">' + esc(h.note) + "</span>" : "") +
               "</span></li>";
    }).join("") + "</ol>";

    if (spec.tip) html += '<div class="pseb-dia-note">\uD83D\uDCA1 ' + bi(spec.tip, "pa") + "</div>";
    html += '<div class="pseb-dia-bar">' +
              '<button type="button" class="pseb-num-btn ghost" data-act="all">Reveal all</button>' +
              '<button type="button" class="pseb-num-btn ghost" data-act="reset">Reset \u21ba</button>' +
              '<span class="pseb-dia-score" data-score>0 / ' + total + " labelled</span>" +
            "</div>";

    host.innerHTML = html;

    var spots = host.querySelectorAll(".pseb-hotspot");
    var legs = host.querySelectorAll(".pseb-leg");
    var score = host.querySelector("[data-score]");

    function refresh() {
      score.textContent = host.querySelectorAll(".pseb-hotspot.is-open").length + " / " + total + " labelled";
    }
    function open(i) {
      spots[i].classList.add("is-open");
      legs[i].classList.add("is-open");
      refresh();
    }

    host.addEventListener("click", function (e) {
      if (!e.target.closest) return;
      var hs = e.target.closest(".pseb-hotspot");
      if (hs) { open(parseInt(hs.getAttribute("data-hs"), 10)); return; }
      var leg = e.target.closest(".pseb-leg");
      if (leg) { open(parseInt(leg.getAttribute("data-leg"), 10)); return; }
      var act = e.target.closest("[data-act]");
      if (!act) return;
      var a = act.getAttribute("data-act");
      if (a === "all") {
        for (var i = 0; i < spots.length; i++) open(i);
      } else if (a === "reset") {
        for (var j = 0; j < spots.length; j++) {
          spots[j].classList.remove("is-open");
          legs[j].classList.remove("is-open");
        }
        refresh();
      }
    });
    refresh();
  }

  /* ------------------------------------------------------------- hydrate */

  function hydrate(root) {
    var scope = root || document;
    var nums = scope.querySelectorAll(".pseb-numerical");
    for (var i = 0; i < nums.length; i++) {
      if (nums[i].__psebDone) continue;
      var ns = readSpec(nums[i]);
      if (!ns) continue;
      nums[i].__psebDone = true;
      try { mountNumerical(nums[i], ns); } catch (e) {
        nums[i].innerHTML = '<div class="pseb-dia-note">Numerical failed to render: ' + esc(e.message) + "</div>";
      }
    }
    var dias = scope.querySelectorAll(".pseb-diagram-practice");
    for (var j = 0; j < dias.length; j++) {
      if (dias[j].__psebDone) continue;
      var ds = readSpec(dias[j]);
      if (!ds) continue;
      dias[j].__psebDone = true;
      try { mountDiagram(dias[j], ds); } catch (e) {
        dias[j].innerHTML = '<div class="pseb-dia-note">Diagram failed to render: ' + esc(e.message) + "</div>";
      }
    }
  }

  window.PSEBBoard = {
    badges: badges,
    hydrate: hydrate,
    mountNumerical: mountNumerical,
    mountDiagram: mountDiagram
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { hydrate(); });
  } else {
    hydrate();
  }
}());
