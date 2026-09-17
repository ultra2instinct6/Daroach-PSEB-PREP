(function () {
  "use strict";

  var THEME_KEY = "pseb.decktheme.v1";
  var FONT_KEY = "pseb.fontscale.v1";
  var FS_MIN = 60;
  var FS_MAX = 140;
  var FS_STEP = 10;
  var FS_DEFAULT = 100;

  function savedTheme() {
    var value = "";
    try { value = localStorage.getItem(THEME_KEY) || ""; } catch (e) {}
    return value === "legacy" ? "legacy" : "instinct";
  }

  function chapterNumber() {
    var match = /Chapter\s+(\d+)/i.exec(document.title || "");
    return match ? parseInt(match[1], 10) : null;
  }

  function subjectTone(chapter) {
    if (chapter == null) return "chem";
    if (chapter >= 1 && chapter <= 5) return "chem";
    if (chapter >= 6 && chapter <= 9) return "bio";
    if (chapter >= 10 && chapter <= 14) return "phy";
    return "env";
  }

  function clampScale(value) {
    value = Math.round(value / FS_STEP) * FS_STEP;
    if (value < FS_MIN) value = FS_MIN;
    if (value > FS_MAX) value = FS_MAX;
    return value;
  }

  function savedScale() {
    var value = NaN;
    try { value = parseInt(localStorage.getItem(FONT_KEY), 10); } catch (e) {}
    return isNaN(value) ? FS_DEFAULT : clampScale(value);
  }

  var root = document.documentElement;
  var scale = savedScale();
  root.setAttribute("data-deck-theme", savedTheme());
  root.setAttribute("data-subject-tone", subjectTone(chapterNumber()));
  if (scale !== FS_DEFAULT) root.style.fontSize = scale + "%";

  /* Page-exit half of the deck transition. deck-theme.css fades the arrival
     veil out on load; here we fade it back in before any same-origin
     navigation (e.g. "← Index"), so leaving a lecture dissolves instead of
     cutting to white. Hash links, new tabs and modified clicks are ignored. */
  function reducedMotion() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  function initExitTransition() {
    setTimeout(function () { document.body.classList.add("deck-entered"); }, 700);
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      var raw = link.getAttribute("href") || "";
      if (!raw || raw.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(raw)) return;
      var url;
      try { url = new URL(link.href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      e.preventDefault();
      /* Stop any "ਸੁਣੋ" narration first — speech synthesis outlives a
         navigation in some browsers, which sounds like a stray voice bleeding
         into the next page. */
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (err) {}
      document.body.classList.add("deck-leaving");
      var target = link.href;
      setTimeout(function () { window.location.href = target; }, reducedMotion() ? 120 : 260);
    });
    window.addEventListener("pageshow", function () {
      document.body.classList.remove("deck-leaving");
    });
    window.addEventListener("pagehide", function () {
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (err) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initExitTransition);
  } else {
    initExitTransition();
  }
}());
