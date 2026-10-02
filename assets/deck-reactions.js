/* BOLO.INSTINCT — animated reaction schematics.

   The reaction-type concept map used static boxes: a student read "A + B →
   AB" and still had no mental picture of particles joining. These are small
   looping SVG scenes that show the actual motion — particles converging for
   combination, splitting for decomposition, one atom displacing another, and
   a real colour change in a test tube for Fe + CuSO₄.

   Usage:

     <div data-pseb-reaction="combination"></div>
     <div data-pseb-reaction="testtube" data-size="lg"></div>

   Types: combination · decomposition · displacement · double · redox · testtube

   Motion is CSS-driven and stops entirely under prefers-reduced-motion, where
   each scene settles on its final frame so the diagram still reads. */

(function () {
  "use strict";

  var LANG_KEY = "pseb.lang.v1";

  function lang() {
    try { return localStorage.getItem(LANG_KEY) === "en" ? "en" : "pa"; }
    catch (e) { return "pa"; }
  }

  var CAPTIONS = {
    combination: {
      en: "Two reactants move together and join as one product.",
      pa: "ਦੋ ਅਭਿਕਾਰਕ ਮਿਲ ਕੇ ਇੱਕ ਉਤਪਾਦ ਬਣਾਉਂਦੇ ਹਨ।"
    },
    decomposition: {
      en: "Heat splits one compound into simpler substances.",
      pa: "ਤਾਪ ਨਾਲ ਇੱਕ ਯੌਗਿਕ ਸਰਲ ਪਦਾਰਥਾਂ ਵਿੱਚ ਟੁੱਟਦਾ ਹੈ।"
    },
    displacement: {
      en: "The more reactive atom pushes the less reactive one out.",
      pa: "ਵੱਧ ਕਿਰਿਆਸ਼ੀਲ ਪਰਮਾਣੂ ਘੱਟ ਕਿਰਿਆਸ਼ੀਲ ਨੂੰ ਬਾਹਰ ਧੱਕਦਾ ਹੈ।"
    },
    double: {
      en: "Both compounds swap partners; a precipitate settles out.",
      pa: "ਦੋਵੇਂ ਯੌਗਿਕ ਆਇਨ ਬਦਲਦੇ ਹਨ; ਅਵਖੇਪ ਬਣਦਾ ਹੈ।"
    },
    redox: {
      en: "Electrons leave the species being oxidised and join the one being reduced.",
      pa: "ਇਲੈਕਟ੍ਰਾਨ ਆਕਸੀਕ੍ਰਿਤ ਪਦਾਰਥ ਤੋਂ ਨਿਕਲ ਕੇ ਲਘੂਕ੍ਰਿਤ ਪਦਾਰਥ ਨਾਲ ਜੁੜਦੇ ਹਨ।"
    },
    testtube: {
      en: "Blue CuSO₄ fades to pale green FeSO₄ while reddish-brown copper coats the iron nail.",
      pa: "ਨੀਲਾ CuSO₄ ਹਲਕਾ ਹਰਾ FeSO₄ ਬਣ ਜਾਂਦਾ ਹੈ ਅਤੇ ਲੋਹੇ ਦੀ ਕਿੱਲ ਉੱਤੇ ਭੂਰਾ ਤਾਂਬਾ ਜੰਮ ਜਾਂਦਾ ਹੈ।"
    }
  };

  var SCENE_WORDS = {
    oxidised: { en: "OXIDISED", pa: "ਆਕਸੀਕ੍ਰਿਤ" },
    reduced: { en: "REDUCED", pa: "ਲਘੂਕ੍ਰਿਤ" },
    transfer: { en: "electron transfer", pa: "ਇਲੈਕਟ੍ਰਾਨ ਤਬਾਦਲਾ" },
    blue: { en: "CuSO\u2084 (blue)", pa: "CuSO\u2084 (ਨੀਲਾ)" },
    green: { en: "FeSO\u2084 (pale green)", pa: "FeSO\u2084 (ਹਲਕਾ ਹਰਾ)" },
    deposit: { en: "Cu deposits on the nail", pa: "ਕਿੱਲ ਉੱਤੇ Cu ਜੰਮਦਾ ਹੈ" }
  };

  function w(key) {
    var e = SCENE_WORDS[key];
    return e ? (e[lang()] || e.en) : key;
  }

  function injectStyle() {
    if (document.getElementById("pseb-reaction-css")) return;
    var st = document.createElement("style");
    st.id = "pseb-reaction-css";
    st.textContent = [
      ".pseb-rx{--rx-dur:5s;margin:10px 0;display:flex;flex-direction:column;gap:6px;align-items:stretch}",
      ".pseb-rx svg{width:100%;height:auto;display:block;overflow:visible}",
      ".pseb-rx .rx-cap{margin:0;font-size:.78rem;line-height:1.35;color:var(--deck-muted,#9aa7ba);text-align:center;",
      "font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif)}",
      ".pseb-rx text{font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif);font-weight:800}",

      /* --- combination: A and B converge, AB appears ------------------- */
      "@keyframes rxJoinL{0%,8%{transform:translateX(-38px)}45%,100%{transform:translateX(0)}}",
      "@keyframes rxJoinR{0%,8%{transform:translateX(38px)}45%,100%{transform:translateX(0)}}",
      "@keyframes rxPop{0%,42%{opacity:0;transform:scale(.6)}56%,100%{opacity:1;transform:scale(1)}}",
      ".pseb-rx .rx-a{animation:rxJoinL var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-b{animation:rxJoinR var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-ab{transform-box:fill-box;transform-origin:center;animation:rxPop var(--rx-dur) ease-out infinite}",

      /* --- decomposition: AB splits apart ------------------------------ */
      "@keyframes rxSplitL{0%,30%{transform:translateX(16px)}70%,100%{transform:translateX(-26px)}}",
      "@keyframes rxSplitR{0%,30%{transform:translateX(-16px)}70%,100%{transform:translateX(26px)}}",
      "@keyframes rxHeat{0%,22%{opacity:0}34%,62%{opacity:1}80%,100%{opacity:0}}",
      ".pseb-rx .rx-sl{animation:rxSplitL var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-sr{animation:rxSplitR var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-heat{animation:rxHeat var(--rx-dur) ease-in-out infinite}",

      /* --- displacement: A takes B's place, B leaves ------------------- */
      "@keyframes rxEnter{0%,10%{transform:translateX(-46px)}48%,100%{transform:translateX(0)}}",
      "@keyframes rxEject{0%,46%{transform:translateX(0);opacity:1}86%,100%{transform:translateX(52px);opacity:.25}}",
      ".pseb-rx .rx-in{animation:rxEnter var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-out{animation:rxEject var(--rx-dur) ease-in-out infinite}",

      /* --- double displacement: ions swap, precipitate falls ----------- */
      "@keyframes rxSwapUp{0%,12%{transform:translateY(0)}52%,100%{transform:translateY(-46px)}}",
      "@keyframes rxSwapDn{0%,12%{transform:translateY(0)}52%,100%{transform:translateY(46px)}}",
      "@keyframes rxFall{0%,55%{opacity:0;transform:translateY(-12px)}75%{opacity:1}100%{opacity:1;transform:translateY(22px)}}",
      ".pseb-rx .rx-swap-up{animation:rxSwapUp var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-swap-dn{animation:rxSwapDn var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-ppt{animation:rxFall var(--rx-dur) ease-in infinite}",

      /* --- redox: electrons hop across ------------------------------- */
      "@keyframes rxHop{0%,10%{opacity:0;transform:translateX(0)}18%{opacity:1}82%{opacity:1}100%{opacity:0;transform:translateX(128px)}}",
      ".pseb-rx .rx-e{animation:rxHop var(--rx-dur) linear infinite}",
      ".pseb-rx .rx-e2{animation-delay:calc(var(--rx-dur) * .12)}",

      /* --- test tube: solution colour shift + copper deposit ---------- */
      "@keyframes rxLiquid{0%,15%{fill:#1d4ed8}70%,100%{fill:#9fd6a6}}",
      "@keyframes rxCopper{0%,30%{fill:#94a3b8}75%,100%{fill:#a1542b}}",
      "@keyframes rxSpeck{0%,45%{opacity:0}70%,100%{opacity:1}}",
      ".pseb-rx .rx-liquid{animation:rxLiquid var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-nail{animation:rxCopper var(--rx-dur) ease-in-out infinite}",
      ".pseb-rx .rx-speck{animation:rxSpeck var(--rx-dur) ease-in infinite}",

      /* A looping diagram is a vestibular hazard and a distraction while
         reading, so hold every scene on its finished frame instead. */
      "@media(prefers-reduced-motion:reduce){.pseb-rx *{animation:none!important}",
      ".pseb-rx .rx-ab,.pseb-rx .rx-heat,.pseb-rx .rx-ppt,.pseb-rx .rx-speck{opacity:1}",
      ".pseb-rx .rx-liquid{fill:#9fd6a6}.pseb-rx .rx-nail{fill:#a1542b}",
      ".pseb-rx .rx-e{opacity:0}}"
    ].join("");
    document.head.appendChild(st);
  }

  var C = {
    a: "#38bdf8", b: "#fb923c", c: "#a78bfa", d: "#f472b6",
    ink: "#e2e8f0", muted: "rgba(226,232,240,.6)"
  };

  function atom(x, y, r, fill, label) {
    return '<g><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" opacity=".92"/>' +
      '<text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="15" fill="#06121c">' + label + "</text></g>";
  }

  function arrow(x1, x2, y) {
    return '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" stroke="' + C.muted +
      '" stroke-width="2" marker-end="url(#rx-head)"/>';
  }

  var DEFS = '<defs><marker id="rx-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" ' +
    'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.muted + '"/></marker></defs>';

  var SCENES = {
    combination: function () {
      return '<svg viewBox="0 0 330 96" role="img">' + DEFS +
        '<g class="rx-a">' + atom(62, 48, 18, C.a, "A") + "</g>" +
        '<g class="rx-b">' + atom(102, 48, 18, C.b, "B") + "</g>" +
        arrow(142, 192, 48) +
        '<g class="rx-ab"><rect x="214" y="28" width="72" height="40" rx="20" fill="' + C.a + '"/>' +
        '<rect x="250" y="28" width="36" height="40" rx="20" fill="' + C.b + '"/>' +
        '<text x="250" y="54" text-anchor="middle" font-size="16" fill="#06121c">AB</text></g></svg>';
    },
    decomposition: function () {
      return '<svg viewBox="0 0 330 96" role="img">' + DEFS +
        '<rect x="30" y="28" width="72" height="40" rx="20" fill="' + C.c + '"/>' +
        '<text x="66" y="54" text-anchor="middle" font-size="16" fill="#06121c">AB</text>' +
        arrow(126, 176, 48) +
        '<text class="rx-heat" x="151" y="30" text-anchor="middle" font-size="17" fill="#ffaa00">\u0394</text>' +
        '<g class="rx-sl">' + atom(222, 48, 18, C.a, "A") + "</g>" +
        '<g class="rx-sr">' + atom(262, 48, 18, C.b, "B") + "</g></svg>";
    },
    displacement: function () {
      return '<svg viewBox="0 0 330 96" role="img">' + DEFS +
        '<g class="rx-in">' + atom(42, 48, 18, C.a, "A") + "</g>" +
        '<rect x="66" y="28" width="64" height="40" rx="20" fill="' + C.b + '" opacity=".5"/>' +
        '<text x="98" y="54" text-anchor="middle" font-size="15" fill="#06121c">BC</text>' +
        arrow(146, 190, 48) +
        '<rect x="204" y="28" width="62" height="40" rx="20" fill="' + C.a + '"/>' +
        '<text x="235" y="54" text-anchor="middle" font-size="15" fill="#06121c">AC</text>' +
        '<g class="rx-out">' + atom(290, 48, 14, C.b, "B") + "</g></svg>";
    },
    "double": function () {
      return '<svg viewBox="0 0 330 118" role="img">' + DEFS +
        '<g class="rx-swap-dn">' + atom(44, 36, 16, C.a, "A") + "</g>" +
        atom(84, 36, 16, C.b, "B") +
        '<g class="rx-swap-up">' + atom(44, 82, 16, C.c, "C") + "</g>" +
        atom(84, 82, 16, C.d, "D") +
        arrow(124, 174, 59) +
        atom(212, 36, 16, C.c, "C") + atom(252, 36, 16, C.b, "B") +
        '<g class="rx-ppt">' + atom(212, 82, 16, C.a, "A") + atom(252, 82, 16, C.d, "D") +
        '<text x="286" y="89" font-size="16" fill="' + C.muted + '">\u2193</text></g></svg>';
    },
    redox: function () {
      return '<svg viewBox="0 0 330 104" role="img">' + DEFS +
        '<text x="165" y="18" text-anchor="middle" font-size="11" fill="' + C.muted + '">' + w("transfer") + "</text>" +
        '<rect x="14" y="32" width="84" height="40" rx="12" fill="rgba(56,189,248,.18)" stroke="' + C.a + '"/>' +
        '<text x="56" y="57" text-anchor="middle" font-size="15" fill="' + C.ink + '">X</text>' +
        '<text x="56" y="94" text-anchor="middle" font-size="11" fill="' + C.a + '">' + w("oxidised") + "</text>" +
        '<rect x="232" y="32" width="84" height="40" rx="12" fill="rgba(251,146,60,.18)" stroke="' + C.b + '"/>' +
        '<text x="274" y="57" text-anchor="middle" font-size="15" fill="' + C.ink + '">Y</text>' +
        '<text x="274" y="94" text-anchor="middle" font-size="11" fill="' + C.b + '">' + w("reduced") + "</text>" +
        '<g class="rx-e"><circle cx="106" cy="44" r="8" fill="#facc15"/>' +
        '<text x="106" y="48" text-anchor="middle" font-size="10" fill="#1f2937">e\u207b</text></g>' +
        '<g class="rx-e rx-e2"><circle cx="106" cy="62" r="8" fill="#facc15"/>' +
        '<text x="106" y="66" text-anchor="middle" font-size="10" fill="#1f2937">e\u207b</text></g></svg>';
    },
    testtube: function () {
      var specks = "";
      for (var i = 0; i < 7; i++) {
        var cx = 60 + (i % 3) * 7 - 7;
        var cy = 92 + i * 13;
        specks += '<circle class="rx-speck" cx="' + cx + '" cy="' + cy + '" r="3.2" fill="#a1542b" ' +
          'style="animation-delay:calc(var(--rx-dur) * ' + (0.04 * i).toFixed(2) + ')"/>';
      }
      return '<svg viewBox="0 0 320 230" role="img">' +
        '<rect class="rx-liquid" x="40" y="52" width="46" height="150" rx="22" fill="#1d4ed8"/>' +
        '<rect x="38" y="24" width="50" height="180" rx="24" fill="none" stroke="rgba(226,232,240,.5)" stroke-width="3"/>' +
        '<rect x="34" y="18" width="58" height="10" rx="5" fill="rgba(226,232,240,.35)"/>' +
        '<rect class="rx-nail" x="58" y="62" width="10" height="126" rx="5" fill="#94a3b8"/>' +
        specks +
        '<text x="112" y="72" font-size="15" fill="#60a5fa">' + w("blue") + "</text>" +
        '<text x="112" y="98" font-size="15" fill="' + C.muted + '">\u2193</text>' +
        '<text x="112" y="126" font-size="15" fill="#86efac">' + w("green") + "</text>" +
        '<text x="112" y="158" font-size="13" fill="#d97757">' + w("deposit") + "</text>" +
        '<text x="112" y="192" font-size="13" fill="' + C.muted + '">Fe + CuSO\u2084 \u2192 FeSO\u2084 + Cu</text>' +
        "</svg>";
    }
  };

  function build(host) {
    var type = host.getAttribute("data-pseb-reaction");
    var scene = SCENES[type];
    if (!scene) return;

    host.classList.add("pseb-rx");
    if (host.getAttribute("data-duration")) host.style.setProperty("--rx-dur", host.getAttribute("data-duration"));

    var cap = CAPTIONS[type] || { en: "", pa: "" };
    /* The scenes loop, so there is no replay control to add. Switching the
       reading language re-renders the whole scene because several of these
       diagrams carry their labels inside the SVG. */
    function label() {
      host.innerHTML = scene() + '<p class="rx-cap">' + (cap[lang()] || cap.en) + "</p>";
      host.querySelector("svg").setAttribute("aria-label", cap.en);
    }

    host.__psebRxLabel = label;
    label();
  }

  function init(root) {
    injectStyle();
    var nodes = (root || document).querySelectorAll("[data-pseb-reaction]");
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].__psebRxLabel) build(nodes[i]);
    }
  }

  function relabel() {
    var nodes = document.querySelectorAll("[data-pseb-reaction]");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].__psebRxLabel) nodes[i].__psebRxLabel();
    }
  }

  window.PSEBReactions = { init: init, relabel: relabel };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
  document.addEventListener("pseb:lang", relabel);
})();
