/* PSEB — inline scientific-terminology scaffolding.

   Bridges Punjabi conceptual understanding and English pronunciation/spelling.

   Usage (either form works):
     1. Explicit markup authored in a slide:
          <sci-term>Decomposition Reaction</sci-term>
          <sci-term term="Oxidation">this oxidising step</sci-term>
     2. Automatic tagging: on load every glossary term found in slide prose is
        wrapped once per slide, so the 16 existing decks gain the feature
        without touching their markup.

   Tapping/clicking (or Enter/Space on the keyboard) opens an accessible
   popover with the English term, its Gurmukhi equivalent, a syllabic phonetic
   breakdown and a "Listen" button driven by window.speechSynthesis.

   Requires assets/glossary.js to be loaded first. Classic script, no modules,
   so it keeps working over the file:// scheme. */
(function () {
  "use strict";
  if (window.__psebSciTerm) return;
  window.__psebSciTerm = true;

  var G = window.PSEB_GLOSSARY;
  if (!G) return;

  var SPEECH_OK = typeof window.speechSynthesis !== "undefined" &&
    typeof window.SpeechSynthesisUtterance !== "undefined";

  /* ---------------- styles ---------------- */
  function injectStyle() {
    if (document.getElementById("pseb-sci-term-style")) return;
    var s = document.createElement("style");
    s.id = "pseb-sci-term-style";
    s.textContent = [
      /* The trigger deliberately inherits colour/size so it never fights the
         Neon or Classic palette — only a dotted underline marks it. */
      "sci-term,.sci-term{",
      "  display:inline;color:inherit;font:inherit;cursor:pointer;",
      "  border-bottom:1px dashed currentColor;",
      "  text-decoration:none;-webkit-tap-highlight-color:transparent;",
      "  padding-bottom:1px;border-radius:2px;",
      "}",
      "sci-term[data-sci-unknown],.sci-term[data-sci-unknown]{",
      "  border-bottom:0;cursor:inherit;",
      "}",
      "sci-term:focus-visible,.sci-term:focus-visible{",
      "  outline:2px solid currentColor;outline-offset:2px;",
      "}",
      "sci-term[aria-expanded=\"true\"],.sci-term[aria-expanded=\"true\"]{",
      "  background:rgba(0,229,255,0.14);",
      "}",
      ".sci-pop{",
      "  position:fixed;z-index:2147483000;max-width:min(320px,calc(100vw - 20px));",
      "  width:max-content;box-sizing:border-box;",
      "  background:#101319;color:#f2f6ff;",
      "  border:1px solid rgba(0,229,255,0.36);border-radius:12px;",
      "  box-shadow:0 18px 48px rgba(0,0,0,0.55);",
      "  padding:12px 13px 11px;",
      "  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;",
      "  font-size:14px;line-height:1.5;text-align:left;",
      "  opacity:0;transform:translateY(6px);pointer-events:none;",
      "  transition:opacity .16s ease,transform .16s ease;",
      "}",
      ".sci-pop.is-open{opacity:1;transform:translateY(0);pointer-events:auto;}",
      "html[data-deck-theme=\"legacy\"] .sci-pop,",
      "body[data-theme=\"CLASSIC\"] .sci-pop{",
      "  background:#ffffff;color:#182437;border-color:rgba(11,86,197,0.30);",
      "  box-shadow:0 18px 44px rgba(12,38,84,0.22);",
      "}",
      ".sci-pop-en{font-size:15px;font-weight:700;letter-spacing:.2px;margin:0 0 2px;}",
      ".sci-pop-pa{",
      "  font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);",
      "  font-size:15px;line-height:1.8;padding:.15em 0;margin:0 0 6px;color:#8be9ff;",
      "}",
      "body[data-theme=\"CLASSIC\"] .sci-pop-pa,",
      "html[data-deck-theme=\"legacy\"] .sci-pop-pa{color:#0b56c5;}",
      ".sci-pop-ph{",
      "  font-size:12.5px;letter-spacing:.4px;margin:0 0 9px;opacity:.85;",
      "  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;word-break:break-word;",
      "}",
      ".sci-pop-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}",
      ".sci-pop-listen{",
      "  display:inline-flex;align-items:center;gap:6px;",
      "  background:rgba(0,229,255,0.14);color:inherit;",
      "  border:1px solid rgba(0,229,255,0.4);border-radius:999px;",
      "  padding:6px 13px;font-size:12.5px;font-weight:600;cursor:pointer;",
      "  min-height:34px;font-family:inherit;",
      "}",
      ".sci-pop-listen:disabled{opacity:.5;cursor:default;}",
      "body[data-theme=\"CLASSIC\"] .sci-pop-listen,",
      "html[data-deck-theme=\"legacy\"] .sci-pop-listen{",
      "  background:rgba(11,86,197,0.08);border-color:rgba(11,86,197,0.32);",
      "}",
      ".sci-pop-ch{font-size:11.5px;opacity:.6;}",
      ".sci-pop-note{font-size:11.5px;opacity:.7;margin-top:7px;}",
      ".sci-pop-close{",
      "  position:absolute;top:4px;right:5px;width:26px;height:26px;line-height:1;",
      "  background:transparent;color:inherit;border:0;border-radius:50%;",
      "  font-size:17px;cursor:pointer;opacity:.55;font-family:inherit;",
      "}",
      ".sci-pop-close:hover{opacity:1;}",
      "@media (max-width:400px){",
      "  .sci-pop{max-width:calc(100vw - 16px);font-size:13.5px;padding:11px 11px 10px;}",
      "}",
      "@media (prefers-reduced-motion:reduce){",
      "  .sci-pop{transition:none;}",
      "}",
      "@media print{sci-term,.sci-term{border-bottom:0;} .sci-pop{display:none !important;}}"
    ].join("");
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------------- pronunciation engine ---------------- */
  var voices = [];
  function loadVoices() {
    if (!SPEECH_OK) return;
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) { voices = []; }
  }
  if (SPEECH_OK) {
    loadVoices();
    try { window.speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
  }

  function pickEnglishVoice() {
    if (!voices.length) loadVoices();
    var prefs = ["en-in", "en-gb", "en-us", "en-"];
    for (var p = 0; p < prefs.length; p++) {
      for (var i = 0; i < voices.length; i++) {
        if ((voices[i].lang || "").toLowerCase().indexOf(prefs[p]) === 0) return voices[i];
      }
    }
    return null;
  }

  /* Returns true when speech was actually dispatched. */
  function speak(text, onDone) {
    if (!SPEECH_OK || !text) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      var v = pickEnglishVoice();
      if (v) u.voice = v;
      u.lang = v && v.lang ? v.lang : "en-IN";
      u.rate = 0.85;
      u.pitch = 1;
      if (onDone) { u.onend = onDone; u.onerror = onDone; }
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------------- popover ---------------- */
  var pop = null, popEn, popPa, popPh, popCh, popNote, popListen, activeTrigger = null;

  function buildPop() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.className = "sci-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Term pronunciation");
    pop.innerHTML =
      '<button type="button" class="sci-pop-close" aria-label="Close">\u00d7</button>' +
      '<p class="sci-pop-en"></p>' +
      '<p class="sci-pop-pa" lang="pa"></p>' +
      '<p class="sci-pop-ph"></p>' +
      '<div class="sci-pop-row">' +
      '<button type="button" class="sci-pop-listen">\uD83D\uDD0A Listen</button>' +
      '<span class="sci-pop-ch"></span>' +
      "</div>" +
      '<p class="sci-pop-note" hidden></p>';
    document.body.appendChild(pop);
    popEn = pop.querySelector(".sci-pop-en");
    popPa = pop.querySelector(".sci-pop-pa");
    popPh = pop.querySelector(".sci-pop-ph");
    popCh = pop.querySelector(".sci-pop-ch");
    popNote = pop.querySelector(".sci-pop-note");
    popListen = pop.querySelector(".sci-pop-listen");

    pop.querySelector(".sci-pop-close").addEventListener("click", function () { closePop(true); });
    popListen.addEventListener("click", function () {
      var term = popListen.dataset.term || "";
      popListen.textContent = "\uD83D\uDD0A Speaking\u2026";
      var ok = speak(term, function () { popListen.textContent = "\uD83D\uDD0A Listen"; });
      if (!ok) {
        popListen.textContent = "\uD83D\uDD0A Listen";
        showNote("Audio is unavailable on this browser \u2014 use the phonetic guide above.");
      }
    });
    pop.addEventListener("click", function (e) { e.stopPropagation(); });
    return pop;
  }

  function showNote(msg) {
    if (!popNote) return;
    popNote.textContent = msg;
    popNote.hidden = false;
  }

  function position(trigger) {
    var r = trigger.getBoundingClientRect();
    /* Measure at natural size before clamping so width is accurate. */
    pop.style.left = "0px";
    pop.style.top = "0px";
    var pr = pop.getBoundingClientRect();
    var margin = 8;
    var left = r.left + r.width / 2 - pr.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - pr.width - margin));
    var top = r.bottom + 10;
    if (top + pr.height > window.innerHeight - margin) {
      var above = r.top - pr.height - 10;
      top = above >= margin ? above : Math.max(margin, window.innerHeight - pr.height - margin);
    }
    pop.style.left = Math.round(left) + "px";
    pop.style.top = Math.round(top) + "px";
  }

  function openPop(trigger) {
    var entry = G.lookup(trigger.getAttribute("term") || trigger.getAttribute("data-term") || trigger.textContent);
    if (!entry) return;
    buildPop();
    closePop(false);
    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    popEn.textContent = entry.en;
    popPa.textContent = entry.pa;
    popPh.textContent = entry.ph;
    popCh.textContent = entry.ch && entry.ch.length
      ? "Chapter " + entry.ch.join(", ")
      : "";
    popNote.hidden = true;
    popListen.dataset.term = entry.en;
    popListen.textContent = "\uD83D\uDD0A Listen";
    popListen.disabled = !SPEECH_OK;
    if (!SPEECH_OK) showNote("Audio is unavailable on this browser \u2014 use the phonetic guide above.");

    pop.classList.add("is-open");
    position(trigger);
    popListen.focus({ preventScroll: true });
  }

  function closePop(refocus) {
    try { if (SPEECH_OK) window.speechSynthesis.cancel(); } catch (e) {}
    if (pop) pop.classList.remove("is-open");
    if (activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
      if (refocus) activeTrigger.focus({ preventScroll: true });
      activeTrigger = null;
    }
  }

  /* ---------------- trigger wiring ---------------- */
  function isTrigger(el) {
    return el && el.nodeType === 1 &&
      (el.tagName === "SCI-TERM" || (el.classList && el.classList.contains("sci-term")));
  }

  function prepare(el) {
    if (el.dataset.sciReady) return;
    el.dataset.sciReady = "1";
    var entry = G.lookup(el.getAttribute("term") || el.getAttribute("data-term") || el.textContent);
    if (!entry) { el.dataset.sciUnknown = "1"; return; }
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-expanded", "false");
    el.setAttribute("aria-haspopup", "dialog");
    el.setAttribute("title", entry.pa + " \u00b7 " + entry.ph);
    el.setAttribute("aria-label", entry.en + ". Punjabi: " + entry.pa +
      ". Pronounced " + entry.ph.replace(/-/g, " ") + ". Activate to hear it.");
  }

  function prepareAll(root) {
    var nodes = (root || document).querySelectorAll("sci-term,.sci-term");
    for (var i = 0; i < nodes.length; i++) prepare(nodes[i]);
  }

  /* ---------------- auto-tagging of existing slide prose ---------------- */
  var SKIP_TAGS = {
    SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1,
    OPTION: 1, CODE: 1, PRE: 1, KBD: 1, BUTTON: 1, A: 1, SVG: 1, MJX_CONTAINER: 1
  };
  var SKIP_CLASS = /(^|\s)(equation|mm-eq|classifier-eq|fg-formula|atom-row|bohr-info|sci-term|pseb-|cmd-|bi-actions|option-btn|sa-input)/;

  function skippable(node) {
    for (var el = node; el && el !== document.body; el = el.parentNode) {
      if (el.nodeType !== 1) continue;
      if (SKIP_TAGS[el.tagName]) return true;
      if (el.tagName === "SCI-TERM") return true;
      var cls = el.getAttribute && el.getAttribute("class");
      if (cls && SKIP_CLASS.test(cls)) return true;
      if (el.hasAttribute && el.hasAttribute("data-no-sci")) return true;
    }
    return false;
  }

  var matcher = null;
  function buildMatcher() {
    if (matcher) return matcher;
    var parts = G.spellings.map(function (s) {
      return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    });
    /* Longest-first (glossary.js already sorts) so multi-word terms win. */
    matcher = new RegExp("\\b(" + parts.join("|") + ")\\b", "i");
    return matcher;
  }

  function autoTag(scope, seen) {
    var re = buildMatcher();
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
    var targets = [];
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || node.nodeValue.length < 3) continue;
      /* Never split a MathJax delimiter run. */
      if (node.nodeValue.indexOf("$") !== -1 || node.nodeValue.indexOf("\\(") !== -1) continue;
      if (!re.test(node.nodeValue)) continue;
      if (skippable(node.parentNode)) continue;
      targets.push(node);
    }
    for (var i = 0; i < targets.length; i++) {
      var t = targets[i];
      var m = re.exec(t.nodeValue);
      if (!m) continue;
      var entry = G.lookup(m[1]);
      if (!entry || seen[entry.en]) continue;
      seen[entry.en] = true;
      var after = t.splitText(m.index);
      after.nodeValue = after.nodeValue.slice(m[1].length);
      var el = document.createElement("sci-term");
      el.setAttribute("term", entry.en);
      el.textContent = m[1];
      after.parentNode.insertBefore(el, after);
      prepare(el);
    }
  }

  function autoTagDeck() {
    var slides = document.querySelectorAll(".slide");
    if (!slides.length) return;
    for (var i = 0; i < slides.length; i++) {
      /* One highlight per term per slide keeps the page readable. */
      try { autoTag(slides[i], Object.create(null)); } catch (e) {}
    }
  }

  /* ---------------- global listeners ---------------- */
  function init() {
    injectStyle();
    prepareAll(document);
    if (!document.body.hasAttribute("data-no-sci-autotag")) autoTagDeck();

    document.addEventListener("click", function (e) {
      /* Clicks inside the popover (Listen / Close) are handled by their own
         listeners — this capture-phase handler must not treat them as
         "clicked outside" and dismiss the popover first. */
      if (pop && e.target && pop.contains(e.target)) return;
      var t = e.target && e.target.closest ? e.target.closest("sci-term,.sci-term") : null;
      if (t && isTrigger(t) && !t.dataset.sciUnknown) {
        e.preventDefault();
        e.stopPropagation();
        if (activeTrigger === t) closePop(false); else openPop(t);
        return;
      }
      if (activeTrigger) closePop(false);
    }, true);

    document.addEventListener("keydown", function (e) {
      var t = e.target;
      if (isTrigger(t) && (e.key === "Enter" || e.key === " " || e.key === "Spacebar")) {
        e.preventDefault();
        e.stopPropagation();
        openPop(t);
        return;
      }
      if (e.key === "Escape" && activeTrigger) {
        e.stopPropagation();
        closePop(true);
      }
    }, true);

    window.addEventListener("resize", function () { if (activeTrigger) position(activeTrigger); });
    /* Scrolling should follow the term, not dismiss it — moving focus into
       the popover can itself nudge a scroll container. Only dismiss once the
       term has actually scrolled out of view. */
    window.addEventListener("scroll", function () {
      if (!activeTrigger) return;
      var r = activeTrigger.getBoundingClientRect();
      var visible = r.bottom > 0 && r.top < window.innerHeight &&
        r.right > 0 && r.left < window.innerWidth;
      if (visible) position(activeTrigger); else closePop(false);
    }, true);
  }

  window.PSEB_SCI_TERM = {
    prepareAll: prepareAll,
    speak: speak,
    close: function () { closePop(false); },
    speechAvailable: SPEECH_OK
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
