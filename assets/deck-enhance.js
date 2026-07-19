/* PSEB deck enhancements — shared across all chapters.
   Progress persistence, resume-to-last-slide, searchable slide outline/jump
   navigator, click-counter-to-jump, bookmarks for revision, active-recall
   hide/reveal mode, study-time tracking, presenter timer, print/PDF handout,
   keyboard help overlay, fullscreen, and #slide=N deep-linking.
   Loaded by each chapter via <script src="../assets/deck-enhance.js"></script>.
   Runs after the chapter's own inline script; navigation adapts to either
   window.goToSlide (ch 1-5) or window.moveSlide (ch 6-13). */
(function () {
  "use strict";
  if (window.__psebEnhanced) return;
  window.__psebEnhanced = true;

  var PROGRESS_KEY = "pseb.progress.v1";
  var LAST_KEY = "pseb.last.v1";
  var BOOKMARK_KEY = "pseb.bookmarks.v1";
  var STUDY_KEY = "pseb.study.v1";
  var FONTSCALE_KEY = "pseb.fontscale.v1";
  var DECK_THEME_KEY = "pseb.decktheme.v1";

  var FS_MIN = 60, FS_MAX = 140, FS_STEP = 10, FS_DEFAULT = 100;
  var THEME_ICONS = {
    instinct: {
      outline: "\u2637",
      bookmarkOff: "\u2727",
      bookmarkOn: "\u2726",
      recall: "\u25C9",
      print: "\u2399",
      timer: "\u23F1",
      fullscreen: "\u26F6",
      theme: "\u25CF",
      font: "A",
      help: "?"
    },
    legacy: {
      outline: "\u2630",
      bookmarkOff: "\u2606",
      bookmarkOn: "\u2605",
      recall: "\u25CE",
      print: "\u2399",
      timer: "\u23F1",
      fullscreen: "\u26F6",
      theme: "\u25D0",
      font: "A",
      help: "?"
    }
  };

  function clampScale(v) {
    v = Math.round(v / FS_STEP) * FS_STEP;
    if (v < FS_MIN) v = FS_MIN;
    if (v > FS_MAX) v = FS_MAX;
    return v;
  }
  function getScale() {
    var v = parseInt(localStorage.getItem(FONTSCALE_KEY), 10);
    if (isNaN(v)) return FS_DEFAULT;
    return clampScale(v);
  }
  function applyRootScale(v) {
    // Content typography is rem-based, so scaling the root font-size
    // proportionally resizes all slide text (including mobile media queries),
    // while enhancement chrome is pinned in px so controls stay fixed.
    document.documentElement.style.fontSize = v === FS_DEFAULT ? "" : v + "%";
  }
  // Apply the saved scale as early as possible to avoid any flash of unscaled text.
  applyRootScale(getScale());

  var m = /Chapter\s+(\d+)/i.exec(document.title || "");
  var CH = m ? parseInt(m[1], 10) : null;

  function injectDeckThemeCss() {
    if (document.getElementById("pseb-deck-theme-css")) return;
    var l = document.createElement("link");
    l.id = "pseb-deck-theme-css";
    l.rel = "stylesheet";
    l.href = "../assets/deck-theme.css";
    document.head.appendChild(l);
  }
  function chapterTone() {
    if (CH == null) return "chem";
    if (CH >= 1 && CH <= 5) return "chem";
    if (CH >= 6 && CH <= 9) return "bio";
    if (CH >= 10 && CH <= 14) return "phy";
    return "env";
  }
  function getDeckTheme() {
    var v = "";
    try { v = localStorage.getItem(DECK_THEME_KEY) || ""; } catch (e) {}
    return v === "legacy" ? "legacy" : "instinct";
  }
  function applyDeckTheme(v) {
    v = v === "legacy" ? "legacy" : "instinct";
    document.documentElement.setAttribute("data-deck-theme", v);
    document.documentElement.setAttribute("data-subject-tone", chapterTone());
    try { localStorage.setItem(DECK_THEME_KEY, v); } catch (e) {}
    refreshDeckChrome();
  }
  function toggleDeckTheme() {
    var next = getDeckTheme() === "legacy" ? "instinct" : "legacy";
    document.documentElement.classList.add("pseb-theme-switching");
    applyDeckTheme(next);
    toast(next === "legacy" ? "Colorway: Classic light" : "Colorway: Instinct dark");
    setTimeout(function () { document.documentElement.classList.remove("pseb-theme-switching"); }, 420);
  }
  function setBtn(id, text, title) {
    var btn = document.getElementById(id);
    if (!btn) return null;
    btn.textContent = text;
    if (title) {
      btn.title = title;
      btn.setAttribute("aria-label", title);
    }
    return btn;
  }
  function refreshDeckChrome() {
    var legacy = getDeckTheme() === "legacy";
    var icons = THEME_ICONS[legacy ? "legacy" : "instinct"];
    setBtn("pseb-outline", icons.outline, "Slide outline (O)");
    setBtn("pseb-recall", icons.recall, "Active recall: hide answers (H)");
    setBtn("pseb-print", icons.print, "Print / save as PDF (P)");
    setBtn("pseb-timer-btn", icons.timer, "Presenter timer (T)");
    setBtn("pseb-fs", icons.fullscreen, "Toggle fullscreen (F)");
    var themeBtn = setBtn("pseb-theme", icons.theme, legacy ? "Colorway: Classic light (C)" : "Colorway: Instinct dark (C)");
    setBtn("pseb-font", icons.font, "Text size (\u2212 / +)");
    setBtn("pseb-help-btn", icons.help, "Keyboard shortcuts (?)");
    if (themeBtn) themeBtn.classList.toggle("pseb-theme-legacy", legacy);
    refreshBookmarkBtn();
  }
  applyDeckTheme(getDeckTheme());
  injectDeckThemeCss();

  function readProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
  }
  function parseCounter() {
    var el = document.getElementById("counter");
    if (!el) return null;
    var mm = /(\d+)\s*\/\s*(\d+)/.exec(el.textContent || "");
    if (!mm) return null;
    return { cur: parseInt(mm[1], 10) - 1, total: parseInt(mm[2], 10) };
  }
  function saveSlide(cur, total) {
    if (CH == null) return;
    try {
      var all = readProgress();
      var p = all[CH] || {};
      p.visited = true;
      if (total) p.total = total;
      p.lastSlide = cur;
      if (total && cur >= total - 1) p.done = true;
      all[CH] = p;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
      localStorage.setItem(LAST_KEY, String(CH));
    } catch (e) {}
  }
  function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } catch (e) {}
  }
  function totalSlides() {
    var c = parseCounter();
    return c ? c.total : (document.querySelectorAll(".slide").length || 0);
  }
  function currentIndex() {
    var c = parseCounter();
    return c ? c.cur : 0;
  }
  function canNavigate() {
    return typeof window.goToSlide === "function" || typeof window.moveSlide === "function";
  }
  function jumpTo(index) {
    var total = totalSlides();
    if (typeof index !== "number" || index < 0) index = 0;
    if (total && index > total - 1) index = total - 1;
    if (typeof window.goToSlide === "function") { window.goToSlide(index); return; }
    if (typeof window.moveSlide === "function") { window.moveSlide(index - currentIndex()); }
  }
  function slideTitle(slide, i) {
    var h = slide.querySelector("h1, h2, h3");
    var t = h ? (h.textContent || "").replace(/\s+/g, " ").trim() : "";
    if (t.length > 64) t = t.slice(0, 64) + "\u2026";
    return t || ("Slide " + (i + 1));
  }
  function readBookmarks() {
    try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || {}; } catch (e) { return {}; }
  }
  function writeBookmarks(b) {
    try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(b)); } catch (e) {}
  }
  function isBookmarked(i) {
    if (CH == null) return false;
    var b = readBookmarks();
    return (b[CH] || []).indexOf(i) !== -1;
  }
  function toggleBookmark(i) {
    if (CH == null) return false;
    var b = readBookmarks();
    var arr = b[CH] || [];
    var pos = arr.indexOf(i);
    var added;
    if (pos === -1) { arr.push(i); arr.sort(function (a, c) { return a - c; }); added = true; }
    else { arr.splice(pos, 1); added = false; }
    if (arr.length) b[CH] = arr; else delete b[CH];
    writeBookmarks(b);
    return added;
  }
  function todayKey() {
    var d = new Date(), mo = d.getMonth() + 1, da = d.getDate();
    return d.getFullYear() + "-" + (mo < 10 ? "0" : "") + mo + "-" + (da < 10 ? "0" : "") + da;
  }
  function addStudySeconds(sec) {
    if (!sec || sec <= 0) return;
    try {
      var s = JSON.parse(localStorage.getItem(STUDY_KEY)) || {};
      if (!s.days) s.days = {};
      var k = todayKey();
      s.days[k] = (s.days[k] || 0) + sec;
      s.lastDay = k;
      localStorage.setItem(STUDY_KEY, JSON.stringify(s));
    } catch (e) {}
  }
  function hashSlide() {
    var mm = /(?:slide|s)=(\d+)/i.exec(location.hash || "");
    if (mm) { var n = parseInt(mm[1], 10); if (n >= 1) return n - 1; }
    return null;
  }
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "pseb-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 1600);
  }
  function refreshBookmarkBtn() {
    var btn = document.getElementById("pseb-bookmark");
    if (!btn) return;
    var on = isBookmarked(currentIndex());
    var icons = THEME_ICONS[getDeckTheme() === "legacy" ? "legacy" : "instinct"];
    btn.textContent = on ? icons.bookmarkOn : icons.bookmarkOff;
    btn.classList.toggle("pseb-bm-on", on);
    btn.title = (on ? "Remove bookmark" : "Bookmark this slide") + " (B)";
  }
  function doToggleBookmark() {
    if (CH == null) { toast("Bookmarks unavailable here"); return; }
    var i = currentIndex();
    var added = toggleBookmark(i);
    refreshBookmarkBtn();
    toast(added ? "Bookmarked slide " + (i + 1) : "Bookmark removed");
  }
  var recallOn = false;
  function setRecall(v) {
    recallOn = v;
    document.body.classList.toggle("pseb-recall-on", v);
    if (!v) {
      var rv = document.querySelectorAll(".content-box.pseb-revealed");
      Array.prototype.forEach.call(rv, function (b) { b.classList.remove("pseb-revealed"); });
    }
    var btn = document.getElementById("pseb-recall");
    if (btn) btn.classList.toggle("pseb-bm-on", v);
    toast(v ? "Active recall: tap a box to reveal" : "Active recall off");
  }
  function toggleRecall() { setRecall(!recallOn); }
  function clearRecallReveals() {
    if (!recallOn) return;
    var rv = document.querySelectorAll(".content-box.pseb-revealed");
    Array.prototype.forEach.call(rv, function (b) { b.classList.remove("pseb-revealed"); });
  }
  function injectPrintCss() {
    if (document.getElementById("pseb-print-css")) return;
    var l = document.createElement("link");
    l.id = "pseb-print-css";
    l.rel = "stylesheet";
    l.media = "print";
    l.href = "../assets/print.css";
    document.head.appendChild(l);
  }
  function buildOverlay() {
    var style = document.createElement("style");
    style.textContent =
      "html,body{overscroll-behavior-x:none!important}" +
      ".pseb-tools{position:fixed;top:15px;right:15px;display:flex;gap:8px;z-index:1200}" +
      ".pseb-tools button{width:40px;height:40px;border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));border-radius:10px;background:var(--deck-panel,rgba(14,14,18,.92));color:var(--deck-aura,#00e5ff);font-size:20px;line-height:1;cursor:pointer;box-shadow:0 12px 28px rgba(0,0,0,.24);transition:background .2s,border-color .2s,color .2s,transform .15s}" +
      ".pseb-tools button:hover{background:var(--deck-aura-soft,rgba(0,229,255,.16));border-color:var(--deck-aura,#00e5ff);color:var(--deck-text,#f8fafc);transform:translateY(-2px)}" +
      ".pseb-tools button#pseb-theme{color:var(--deck-warn,#ffaa00)}" +
      ".pseb-tools button#pseb-font{font-size:17px;font-weight:800;font-family:'Segoe UI',system-ui,sans-serif}" +
      ".pseb-font-pop{position:fixed;top:64px;right:15px;z-index:1250;background:var(--deck-panel-strong,#141419);color:var(--deck-text,#f8fafc);border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.28);padding:12px;display:none;flex-direction:column;gap:10px;font-family:'Segoe UI',system-ui,sans-serif;width:210px}" +
      ".pseb-font-pop.show{display:flex}" +
      ".pseb-font-pop .row{display:flex;align-items:center;gap:8px}" +
      ".pseb-font-pop .step{flex:none;width:46px;height:46px;border:none;border-radius:10px;background:var(--deck-aura,#00e5ff);color:#050507;font-size:22px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:background .15s}" +
      ".pseb-font-pop .step:hover{background:var(--deck-warn,#ffaa00)}" +
      ".pseb-font-pop .step:disabled{opacity:.4;cursor:default;background:var(--deck-faint,#657386)}" +
      ".pseb-font-pop .val{flex:1;text-align:center;font-size:18px;font-weight:800;font-variant-numeric:tabular-nums}" +
      ".pseb-font-pop .lbl{font-size:12px;font-weight:700;color:var(--deck-muted,#9aa7ba);text-transform:uppercase;letter-spacing:.5px;text-align:center}" +
      ".pseb-font-pop .reset{border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));background:var(--deck-panel-soft,rgba(255,255,255,.045));color:var(--deck-aura,#00e5ff);font-weight:700;font-size:13px;padding:8px;border-radius:8px;cursor:pointer}" +
      ".pseb-font-pop .reset:hover{background:var(--deck-aura-soft,rgba(0,229,255,.16))}" +
      ".pseb-help-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.6);display:none;align-items:center;justify-content:center;z-index:1300}" +
      ".pseb-help-backdrop.show{display:flex}" +
      ".pseb-help{background:#fff;color:#333;max-width:420px;width:90%;border-radius:12px;padding:28px 30px;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:'Segoe UI',system-ui,sans-serif}" +
      ".pseb-help h3{margin:0 0 14px;color:#0047BB;font-size:1.4rem}" +
      ".pseb-help dl{display:grid;grid-template-columns:auto 1fr;gap:8px 16px;margin:0}" +
      ".pseb-help dt{font-weight:700;color:#FF5C00}" +
      ".pseb-help dd{margin:0}" +
      ".pseb-help .close{margin-top:20px;width:100%;padding:10px;border:none;border-radius:8px;background:#0047BB;color:#fff;font-weight:700;cursor:pointer}" +
      ".pseb-outline-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.6);display:none;align-items:center;justify-content:center;z-index:1300}" +
      ".pseb-outline-backdrop.show{display:flex}" +
      ".pseb-outline{background:#fff;color:#333;max-width:520px;width:92%;max-height:80vh;border-radius:12px;padding:22px 24px;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:'Segoe UI',system-ui,sans-serif;display:flex;flex-direction:column}" +
      ".pseb-outline h3{margin:0 0 14px;color:#0047BB;font-size:1.3rem}" +
      ".pseb-outline-list{overflow-y:auto;display:flex;flex-direction:column;gap:4px}" +
      ".pseb-outline-item{display:flex;align-items:center;gap:10px;text-align:left;width:100%;padding:9px 12px;border:none;border-radius:8px;background:#f1f5f9;color:#1e293b;font-size:1rem;cursor:pointer;transition:background .15s}" +
      ".pseb-outline-item:hover{background:#e0e7ff}" +
      ".pseb-outline-item.current{background:#0047BB;color:#fff;font-weight:700}" +
      ".pseb-outline-num{flex:none;min-width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;background:rgba(0,0,0,.08);border-radius:6px;font-size:.85rem;font-weight:700}" +
      ".pseb-outline-item.current .pseb-outline-num{background:rgba(255,255,255,.25)}" +
      ".pseb-outline-search{width:100%;padding:9px 12px;margin-bottom:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:.95rem;font-family:inherit;color:#1e293b}" +
      ".pseb-outline-search:focus{outline:none;border-color:#0047BB}" +
      ".pseb-outline-item.hidden{display:none}" +
      ".pseb-outline-empty{padding:14px;text-align:center;color:#64748b;font-size:.9rem;display:none}" +
      ".pseb-timer{position:fixed;bottom:15px;left:15px;z-index:1200;display:none;align-items:center;gap:8px;background:rgba(15,23,42,.9);color:#fff;padding:8px 12px;border-radius:10px;box-shadow:0 3px 10px rgba(0,0,0,.3);font-family:'Segoe UI',system-ui,sans-serif}" +
      ".pseb-timer.show{display:flex}" +
      ".pseb-timer-time{font-variant-numeric:tabular-nums;font-size:1.1rem;font-weight:700;min-width:56px;text-align:center;letter-spacing:.5px}" +
      ".pseb-timer button{width:28px;height:28px;border:none;border-radius:6px;background:rgba(255,255,255,.15);color:#fff;font-size:.9rem;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:background .15s}" +
      ".pseb-timer button:hover{background:rgba(255,255,255,.3)}" +
      ".pseb-tools button.pseb-bm-on{background:#FF5C00}" +
      ".pseb-outline-star{margin-left:auto;color:#FF5C00;font-size:1rem;flex:none}" +
      ".pseb-toast{position:fixed;bottom:66px;left:50%;transform:translateX(-50%) translateY(10px);background:rgba(15,23,42,.95);color:#fff;padding:10px 18px;border-radius:10px;font-family:'Segoe UI',system-ui,sans-serif;font-size:14px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:1400}" +
      ".pseb-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}" +
      ".pseb-recall-on .content-box{filter:blur(7px);cursor:pointer;transition:filter .2s;-webkit-user-select:none;user-select:none}" +
      ".pseb-recall-on .content-box.pseb-revealed{filter:none;-webkit-user-select:auto;user-select:auto}" +
      ".pseb-recall-hint{position:fixed;top:62px;left:50%;transform:translateX(-50%);background:rgba(255,92,0,.95);color:#fff;padding:6px 14px;border-radius:99px;font-family:'Segoe UI',system-ui,sans-serif;font-size:13px;font-weight:700;z-index:1200;display:none;box-shadow:0 3px 10px rgba(0,0,0,.25)}" +
      ".pseb-recall-on .pseb-recall-hint{display:block}" +
      "@media(max-width:768px){.pseb-tools{flex-wrap:wrap;justify-content:flex-end;max-width:calc(100vw - 30px);gap:6px}.pseb-tools button{width:38px;height:38px;font-size:18px}.pseb-tools button#pseb-font{font-size:16px}.pseb-font-pop{width:200px}" +
      ".side-nav{top:auto!important;bottom:14px!important;transform:none!important;height:48px!important;min-width:96px!important;width:auto!important;padding:0 18px!important;font-size:1rem!important;font-weight:800!important;font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif)!important;letter-spacing:.3px;display:flex!important;align-items:center;justify-content:center;gap:6px;opacity:1!important;z-index:160!important;background:var(--deck-aura,#00e5ff)!important;color:#050507!important;border:1px solid var(--deck-aura,#00e5ff)!important;border-radius:12px!important;box-shadow:0 10px 24px var(--deck-aura-soft,rgba(0,229,255,.16))!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:transform .12s,background .2s,border-color .2s,color .2s!important}" +
      ".side-nav::after{font-size:.62rem;font-weight:700;letter-spacing:.6px;opacity:.95}" +
      ".left-nav::after{content:'BACK'}.right-nav::after{content:'NEXT'}" +
      ".side-nav:active:not(:disabled){transform:scale(.94)!important;background:var(--deck-warn,#ffaa00)!important;border-color:var(--deck-warn,#ffaa00)!important;color:#050507!important;box-shadow:0 8px 20px rgba(0,0,0,.3)!important}" +
      ".side-nav:hover:not(:disabled){background:var(--deck-aura,#00e5ff)!important;color:#050507!important;transform:none!important;box-shadow:0 10px 24px var(--deck-aura-soft,rgba(0,229,255,.16))!important}" +
      ".side-nav:disabled{opacity:.32!important;pointer-events:none}" +
      ".left-nav{left:14px!important;right:auto!important}.right-nav{right:14px!important;left:auto!important}" +
      ".slide-counter{top:12px!important;bottom:auto!important;left:12px!important;right:auto!important;z-index:150!important}}";
    document.head.appendChild(style);

    var tools = document.createElement("div");
    tools.className = "pseb-tools";
    tools.innerHTML =
      '<button type="button" id="pseb-outline" title="Slide outline (O)" aria-label="Slide outline">\u2630</button>' +
      '<button type="button" id="pseb-bookmark" title="Bookmark this slide (B)" aria-label="Bookmark this slide">\u2606</button>' +
      '<button type="button" id="pseb-recall" title="Active recall: hide answers (H)" aria-label="Active recall mode">\u25C9</button>' +
      '<button type="button" id="pseb-print" title="Print / save as PDF (P)" aria-label="Print or save as PDF">\u2399</button>' +
      '<button type="button" id="pseb-timer-btn" title="Presenter timer (T)" aria-label="Presenter timer">\u23F1</button>' +
      '<button type="button" id="pseb-fs" title="Fullscreen (F)" aria-label="Toggle fullscreen">\u26F6</button>' +
      '<button type="button" id="pseb-theme" title="Colorway (C)" aria-label="Colorway">\u25CF</button>' +
      '<button type="button" id="pseb-font" title="Text size (\u2212 / +)" aria-label="Text size">A</button>' +
      '<button type="button" id="pseb-help-btn" title="Keyboard shortcuts (?)" aria-label="Keyboard shortcuts">?</button>';
    document.body.appendChild(tools);
    refreshDeckChrome();

    var fontPop = document.createElement("div");
    fontPop.className = "pseb-font-pop";
    fontPop.setAttribute("role", "dialog");
    fontPop.setAttribute("aria-label", "Text size");
    fontPop.innerHTML =
      '<div class="lbl">Text size</div>' +
      '<div class="row">' +
        '<button type="button" class="step" id="pseb-font-dec" aria-label="Smaller text">\u2212</button>' +
        '<div class="val" id="pseb-font-val">100%</div>' +
        '<button type="button" class="step" id="pseb-font-inc" aria-label="Larger text">+</button>' +
      '</div>' +
      '<button type="button" class="reset" id="pseb-font-reset">Reset to 100%</button>';
    document.body.appendChild(fontPop);

    var fontValEl = fontPop.querySelector("#pseb-font-val");
    var fontDecEl = fontPop.querySelector("#pseb-font-dec");
    var fontIncEl = fontPop.querySelector("#pseb-font-inc");

    function refreshFontUI() {
      var v = getScale();
      if (fontValEl) fontValEl.textContent = v + "%";
      if (fontDecEl) fontDecEl.disabled = v <= FS_MIN;
      if (fontIncEl) fontIncEl.disabled = v >= FS_MAX;
    }
    function setScale(v, announce) {
      v = clampScale(v);
      try { localStorage.setItem(FONTSCALE_KEY, String(v)); } catch (e) {}
      applyRootScale(v);
      refreshFontUI();
      if (announce) toast("Text size " + v + "%");
    }
    function showFontPop(v) {
      var open = v == null ? !fontPop.classList.contains("show") : v;
      fontPop.classList.toggle("show", open);
      if (open) refreshFontUI();
    }
    window.__psebSetScale = setScale;
    window.__psebRefreshFontUI = refreshFontUI;

    document.getElementById("pseb-font").addEventListener("click", function (e) { e.stopPropagation(); showFontPop(); });
    document.getElementById("pseb-theme").addEventListener("click", toggleDeckTheme);
    fontDecEl.addEventListener("click", function () { setScale(getScale() - FS_STEP, true); });
    fontIncEl.addEventListener("click", function () { setScale(getScale() + FS_STEP, true); });
    fontPop.querySelector("#pseb-font-reset").addEventListener("click", function () { setScale(FS_DEFAULT, true); });
    fontPop.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { fontPop.classList.remove("show"); });
    window.__psebFontPopClose = function () { fontPop.classList.remove("show"); };
    refreshFontUI();

    var back = document.createElement("div");
    back.className = "pseb-help-backdrop";
    back.setAttribute("role", "dialog");
    back.setAttribute("aria-modal", "true");
    back.innerHTML =
      '<div class="pseb-help">' +
        '<h3>Keyboard shortcuts</h3>' +
        '<dl>' +
          '<dt>\u2190 \u2192</dt><dd>Previous / next slide</dd>' +
          '<dt>Home</dt><dd>First slide</dd>' +
          '<dt>End</dt><dd>Last slide</dd>' +
          '<dt>O</dt><dd>Slide outline / search / jump</dd>' +
          '<dt>B</dt><dd>Bookmark slide for revision</dd>' +
          '<dt>H</dt><dd>Active recall (hide / reveal)</dd>' +
          '<dt>P</dt><dd>Print / save as PDF</dd>' +
          '<dt>T</dt><dd>Presenter timer</dd>' +
          '<dt>F</dt><dd>Toggle fullscreen</dd>' +
          '<dt>C</dt><dd>Switch slide colorway</dd>' +
          '<dt>\u2212 / +</dt><dd>Smaller / larger text</dd>' +
          '<dt>0</dt><dd>Reset text size</dd>' +
          '<dt>?</dt><dd>Show this help</dd>' +
          '<dt>Esc</dt><dd>Close dialogs</dd>' +
        '</dl>' +
        '<button type="button" class="close">Got it</button>' +
      '</div>';
    document.body.appendChild(back);

    function showHelp(v) { back.classList.toggle("show", v); }
    document.getElementById("pseb-fs").addEventListener("click", toggleFullscreen);
    document.getElementById("pseb-help-btn").addEventListener("click", function () { showHelp(true); });
    back.addEventListener("click", function (e) { if (e.target === back) showHelp(false); });
    back.querySelector(".close").addEventListener("click", function () { showHelp(false); });
    window.__psebShowHelp = showHelp;

    injectPrintCss();

    var oBack = document.createElement("div");
    oBack.className = "pseb-outline-backdrop";
    oBack.setAttribute("role", "dialog");
    oBack.setAttribute("aria-modal", "true");
    oBack.innerHTML =
      '<div class="pseb-outline">' +
        '<h3>Slides</h3>' +
        '<input type="search" class="pseb-outline-search" placeholder="Filter or type a slide number\u2026" aria-label="Filter slides">' +
        '<div class="pseb-outline-list"></div>' +
        '<div class="pseb-outline-empty">No matching slides.</div>' +
      '</div>';
    document.body.appendChild(oBack);

    var oSearch = oBack.querySelector(".pseb-outline-search");
    var oEmpty = oBack.querySelector(".pseb-outline-empty");
    var oItems = [];

    function outlineShow(v) {
      oBack.classList.toggle("show", v);
      if (!v && oSearch) oSearch.blur();
    }
    function outlineFilter() {
      var q = (oSearch.value || "").trim().toLowerCase();
      var shown = 0;
      oItems.forEach(function (it) {
        var num = String(it.index + 1);
        var match = q === "" || num === q || num.indexOf(q) === 0 || it.title.toLowerCase().indexOf(q) !== -1;
        it.btn.classList.toggle("hidden", !match);
        if (match) shown++;
      });
      oEmpty.style.display = shown ? "none" : "block";
    }
    function openOutline() {
      var list = oBack.querySelector(".pseb-outline-list");
      list.innerHTML = "";
      oItems = [];
      var slides = document.querySelectorAll(".slide");
      var cur = currentIndex();
      Array.prototype.forEach.call(slides, function (s, i) {
        var title = slideTitle(s, i);
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pseb-outline-item" + (i === cur ? " current" : "");
        var num = document.createElement("span");
        num.className = "pseb-outline-num";
        num.textContent = String(i + 1);
        b.appendChild(num);
        b.appendChild(document.createTextNode(" " + title));
        if (isBookmarked(i)) {
          var star = document.createElement("span");
          star.className = "pseb-outline-star";
          star.textContent = "\u2605";
          b.appendChild(star);
        }
        b.addEventListener("click", function () {
          jumpTo(i);
          outlineShow(false);
        });
        list.appendChild(b);
        oItems.push({ btn: b, index: i, title: title });
      });
      oSearch.value = "";
      outlineFilter();
      outlineShow(true);
      var curEl = list.querySelector(".current");
      if (curEl && curEl.scrollIntoView) curEl.scrollIntoView({ block: "center" });
      if (oSearch.focus) setTimeout(function () { oSearch.focus(); }, 30);
    }
    oSearch.addEventListener("input", outlineFilter);
    oSearch.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        var q = (oSearch.value || "").trim();
        var total = totalSlides();
        if (/^\d+$/.test(q)) {
          var n = parseInt(q, 10);
          if (n >= 1 && (!total || n <= total)) { jumpTo(n - 1); outlineShow(false); }
          return;
        }
        var visible = oItems.filter(function (it) { return !it.btn.classList.contains("hidden"); });
        if (visible.length) { jumpTo(visible[0].index); outlineShow(false); }
      } else if (e.key === "Escape") {
        e.preventDefault();
        outlineShow(false);
      }
    });
    oBack.addEventListener("click", function (e) { if (e.target === oBack) outlineShow(false); });
    document.getElementById("pseb-outline").addEventListener("click", openOutline);
    document.getElementById("pseb-print").addEventListener("click", function () { window.print(); });
    window.__psebOpenOutline = openOutline;
    window.__psebOutlineShow = outlineShow;

    var counterEl = document.getElementById("counter");
    if (counterEl && !counterEl.getAttribute("onclick")) {
      counterEl.style.cursor = "pointer";
      if (!counterEl.title) counterEl.title = "Jump to slide";
      counterEl.addEventListener("click", openOutline);
    }

    var timer = document.createElement("div");
    timer.className = "pseb-timer";
    timer.setAttribute("role", "status");
    timer.setAttribute("aria-live", "off");
    timer.innerHTML =
      '<button type="button" id="pseb-timer-toggle" title="Start / pause" aria-label="Start or pause timer">\u23F8</button>' +
      '<span class="pseb-timer-time" id="pseb-timer-time">00:00</span>' +
      '<button type="button" id="pseb-timer-reset" title="Reset" aria-label="Reset timer">\u21BA</button>';
    document.body.appendChild(timer);

    var tElapsed = 0, tRunning = false, tInt = null, tLast = 0;
    function tFmt(total) {
      var mm = Math.floor(total / 60), ss = total % 60;
      return (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    }
    function tRender() { document.getElementById("pseb-timer-time").textContent = tFmt(Math.floor(tElapsed)); }
    function tTick() {
      var now = Date.now();
      tElapsed += (now - tLast) / 1000;
      tLast = now;
      tRender();
    }
    function tStart() {
      if (tRunning) return;
      tRunning = true;
      tLast = Date.now();
      tInt = setInterval(tTick, 250);
      document.getElementById("pseb-timer-toggle").textContent = "\u23F8";
    }
    function tPause() {
      tRunning = false;
      if (tInt) { clearInterval(tInt); tInt = null; }
      document.getElementById("pseb-timer-toggle").textContent = "\u25B6";
    }
    function tReset() { tElapsed = 0; tLast = Date.now(); tRender(); }
    function timerShow(v) {
      timer.classList.toggle("show", v);
      if (v) tStart(); else tPause();
    }
    function timerToggleVisible() { timerShow(!timer.classList.contains("show")); }
    document.getElementById("pseb-timer-toggle").addEventListener("click", function () { if (tRunning) { tPause(); } else { tStart(); } });
    document.getElementById("pseb-timer-reset").addEventListener("click", tReset);
    document.getElementById("pseb-timer-btn").addEventListener("click", timerToggleVisible);
    window.__psebTimerToggle = timerToggleVisible;
    tRender();

    var recallHint = document.createElement("div");
    recallHint.className = "pseb-recall-hint";
    recallHint.textContent = "Active recall \u2014 tap a box to reveal";
    document.body.appendChild(recallHint);

    document.getElementById("pseb-bookmark").addEventListener("click", doToggleBookmark);
    document.getElementById("pseb-recall").addEventListener("click", toggleRecall);
    document.addEventListener("click", function (e) {
      if (!recallOn) return;
      var box = e.target && e.target.closest ? e.target.closest(".content-box") : null;
      if (box && !box.classList.contains("pseb-revealed")) box.classList.add("pseb-revealed");
    });
    refreshBookmarkBtn();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildOverlay();
    enhanceInteractives();
    initBiReadings();

    var counter = document.getElementById("counter");
    if (counter && "MutationObserver" in window) {
      var obs = new MutationObserver(function () {
        var c = parseCounter();
        if (c) saveSlide(c.cur, c.total);
        refreshBookmarkBtn();
        clearRecallReveals();
      });
      obs.observe(counter, { childList: true, characterData: true, subtree: true });
    }

    try {
      var hs = hashSlide();
      if (hs != null && canNavigate()) {
        jumpTo(hs);
      } else if (CH != null && canNavigate()) {
        var all = readProgress();
        var p = all[CH];
        var total = totalSlides();
        if (p && typeof p.lastSlide === "number" && p.lastSlide > 0 && (!total || p.lastSlide < total)) {
          jumpTo(p.lastSlide);
        }
      }
    } catch (e) {}
    refreshBookmarkBtn();

    var ci = parseCounter();
    if (ci) saveSlide(ci.cur, ci.total);

    document.addEventListener("keydown", function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) { e.preventDefault(); if (window.__psebShowHelp) window.__psebShowHelp(true); }
      else if (e.key === "Escape") { if (window.__psebShowHelp) window.__psebShowHelp(false); if (window.__psebOutlineShow) window.__psebOutlineShow(false); if (window.__psebFontPopClose) window.__psebFontPopClose(); }
      else if (e.key === "o" || e.key === "O") { e.preventDefault(); if (window.__psebOpenOutline) window.__psebOpenOutline(); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); if (window.__psebSetScale) window.__psebSetScale(getScale() - FS_STEP, true); }
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); if (window.__psebSetScale) window.__psebSetScale(getScale() + FS_STEP, true); }
      else if (e.key === "0") { e.preventDefault(); if (window.__psebSetScale) window.__psebSetScale(FS_DEFAULT, true); }
      else if (e.key === "p" || e.key === "P") { e.preventDefault(); window.print(); }
      else if (e.key === "t" || e.key === "T") { if (window.__psebTimerToggle) window.__psebTimerToggle(); }
      else if (e.key === "c" || e.key === "C") { toggleDeckTheme(); }
      else if (e.key === "b" || e.key === "B") { doToggleBookmark(); }
      else if (e.key === "h" || e.key === "H") { toggleRecall(); }
      else if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
      else if (e.key === "Home" && canNavigate()) { e.preventDefault(); jumpTo(0); }
      else if (e.key === "End" && canNavigate()) { e.preventDefault(); jumpTo(totalSlides() - 1); }
    });


    var studyLast = Date.now();
    function flushStudy() {
      if (document.visibilityState === "visible") {
        var now = Date.now();
        var delta = Math.round((now - studyLast) / 1000);
        if (delta > 0 && delta <= 60) addStudySeconds(delta);
        studyLast = now;
      } else {
        studyLast = Date.now();
      }
    }
    setInterval(flushStudy, 15000);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") studyLast = Date.now(); else flushStudy();
    });
    window.addEventListener("pagehide", flushStudy);
  });

  // ---- Flip-card tap/keyboard support + cloze hint tooltips ----
  function enhanceInteractives() {
    try {
      var containers = document.querySelectorAll(".flip-container");
      containers.forEach(function (fc) {
        if (fc.__psebFlip) return;
        fc.__psebFlip = true;
        var card = fc.querySelector(".flip-card");
        if (!card) return;
        if (!fc.getAttribute("tabindex")) fc.setAttribute("tabindex", "0");
        fc.setAttribute("role", "button");
        fc.setAttribute("aria-label", "Flip card");
        var toggle = function () { card.classList.toggle("flipped"); };
        fc.addEventListener("click", toggle);
        fc.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            toggle();
          }
        });
      });
    } catch (e) {}
    try {
      document.querySelectorAll(".cloze-blank[data-hint]").forEach(function (b) {
        var h = b.getAttribute("data-hint");
        if (h && !b.getAttribute("title")) b.setAttribute("title", "Hint: " + h);
      });
    } catch (e) {}
  }

  // ---- Pick-and-drop labelling / sorting engine (click a chip, then click a target) ----
  window.psebPick = function (item) {
    if (item.classList.contains("pd-placed")) return;
    var g = item.closest(".pd-game");
    if (!g) return;
    var wasSel = item.classList.contains("pd-sel");
    g.querySelectorAll(".pd-item.pd-sel").forEach(function (b) { b.classList.remove("pd-sel"); });
    if (!wasSel) item.classList.add("pd-sel");
  };
  window.psebDrop = function (target) {
    var g = target.closest(".pd-game");
    if (!g) return;
    var sel = g.querySelector(".pd-item.pd-sel");
    if (!sel) return;
    if (sel.dataset.target === target.dataset.target) {
      sel.classList.remove("pd-sel");
      sel.classList.add("pd-placed");
      var drop = target.querySelector(".pd-drop") || target;
      var chip = document.createElement("span");
      chip.className = "pd-chip";
      chip.textContent = sel.textContent;
      drop.appendChild(chip);
      sel.style.display = "none";
      target.classList.add("pd-filled");
      if (g.querySelectorAll(".pd-item:not(.pd-placed)").length === 0) {
        var m = g.querySelector(".pd-done");
        if (m) m.style.display = "block";
      }
    } else {
      target.classList.add("pd-wrong");
      setTimeout(function () { target.classList.remove("pd-wrong"); }, 450);
    }
  };
  window.psebReset = function (btn) {
    var g = btn.closest(".pd-game");
    if (!g) return;
    g.querySelectorAll(".pd-item").forEach(function (b) {
      b.classList.remove("pd-sel", "pd-placed");
      b.style.display = "";
    });
    g.querySelectorAll(".pd-target").forEach(function (t) {
      t.classList.remove("pd-filled", "pd-wrong");
      var drop = t.querySelector(".pd-drop");
      if (drop) drop.innerHTML = "";
    });
    var m = g.querySelector(".pd-done");
    if (m) m.style.display = "none";
  };

  // ==== Bilingual (Punjabi-first) reading component ==========================
  // Markup: .bi-reading > .bi-body > (.bi-pa[lang=pa] + .bi-en[lang=en][hidden])
  // Controls: .bi-toggle (swap language) · .bi-listen (TTS) · .bi-stop
  function injectBiReadingStyle() {
    if (document.getElementById("pseb-bi-style")) return;
    var s = document.createElement("style");
    s.id = "pseb-bi-style";
    s.textContent =
      ".bi-reading{max-width:920px;margin:0 auto;text-align:left}" +
      ".bi-read-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}" +
      ".bi-title{margin:0;font-size:clamp(1.7rem,4.5vw,2.5rem);line-height:1.25;font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);color:var(--deck-text,#f8fafc)}" +
      ".bi-title .bi-title-en{display:block;font-size:.62em;font-family:'Segoe UI',system-ui,sans-serif;color:var(--deck-aura,#7c9cff);font-weight:600;margin-top:2px}" +
      ".bi-actions{display:flex;gap:8px;flex:none}" +
      ".bi-btn{border:1px solid var(--deck-border-strong,rgba(255,255,255,.18));background:var(--deck-panel,rgba(18,18,24,.92));color:var(--deck-text,#f1f5f9);font-size:1rem;font-weight:600;padding:9px 14px;border-radius:10px;cursor:pointer;transition:background .18s,border-color .18s,transform .12s;font-family:'Segoe UI',system-ui,sans-serif}" +
      ".bi-btn:hover{background:var(--deck-aura-soft,rgba(124,156,255,.16));border-color:var(--deck-aura,#7c9cff);transform:translateY(-1px)}" +
      ".bi-btn.bi-toggle{background:#4F46E5;border-color:#4F46E5;color:#fff}" +
      ".bi-btn.bi-toggle:hover{background:#4338ca}" +
      ".bi-btn.is-speaking{background:var(--deck-warn,#ffaa00);border-color:var(--deck-warn,#ffaa00);color:#111}" +
      ".bi-body{background:var(--deck-panel,rgba(18,18,24,.6));border:1px solid var(--deck-border,rgba(255,255,255,.08));border-left:5px solid #4F46E5;border-radius:14px;padding:22px 26px}" +
      ".bi-pa{font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);font-size:clamp(1.25rem,3.4vw,1.7rem);line-height:1.9;margin:0;color:var(--deck-text,#f1f5f9)}" +
      ".bi-en{font-size:clamp(1.15rem,3vw,1.5rem);line-height:1.75;margin:0;color:var(--deck-text,#e9eef7)}" +
      ".bi-pa .k,.bi-en .k{color:var(--deck-aura,#7c9cff);font-weight:700}" +
      ".bi-tag{display:inline-block;font-size:.8rem;font-weight:700;letter-spacing:.03em;background:#4F46E5;color:#fff;padding:3px 10px;border-radius:999px;font-family:'Segoe UI',system-ui,sans-serif;vertical-align:middle}";
    document.head.appendChild(s);
  }

  var biVoices = [];
  function loadBiVoices() {
    try { biVoices = window.speechSynthesis ? window.speechSynthesis.getVoices() : []; } catch (e) { biVoices = []; }
  }
  function pickVoice(lang) {
    if (!biVoices.length) loadBiVoices();
    var pref = lang === "pa" ? ["pa-in", "pa-", "hi-in", "hi-"] : ["en-in", "en-gb", "en-us", "en-"];
    for (var p = 0; p < pref.length; p++) {
      for (var i = 0; i < biVoices.length; i++) {
        var vl = (biVoices[i].lang || "").toLowerCase();
        if (vl.indexOf(pref[p]) === 0 || vl.indexOf(pref[p]) !== -1) return biVoices[i];
      }
    }
    return null;
  }
  function biStop() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    document.querySelectorAll(".bi-listen.is-speaking").forEach(function (b) {
      b.classList.remove("is-speaking");
      b.textContent = b.getAttribute("data-idle") || b.textContent;
    });
  }
  function biSpeak(box, btn) {
    if (!("speechSynthesis" in window)) { alert("Text-to-speech is not supported in this browser."); return; }
    biStop();
    var enShown = box.classList.contains("show-en");
    var el = box.querySelector(enShown ? ".bi-en" : ".bi-pa");
    if (!el) return;
    var lang = enShown ? "en" : "pa";
    var text = (el.innerText || el.textContent || "").trim();
    if (!text) return;
    window.speechSynthesis.cancel();
    try { window.speechSynthesis.resume(); } catch (e) {}
    var voice = pickVoice(lang);
    var sentences = (text.match(/[^.!?।]+[.!?।]*/g) || [text]).map(function (s) { return s.trim(); }).filter(Boolean);
    var i = 0;
    if (!btn.getAttribute("data-idle")) btn.setAttribute("data-idle", btn.textContent);
    btn.classList.add("is-speaking");
    btn.textContent = "🔊 …";
    function next() {
      if (i >= sentences.length) { biStop(); return; }
      var u = new SpeechSynthesisUtterance(sentences[i]);
      u.lang = enShown ? "en-IN" : "pa-IN";
      if (voice) u.voice = voice;
      u.rate = 0.9;
      u.onend = function () { i++; next(); };
      u.onerror = function () { i++; next(); };
      window.speechSynthesis.speak(u);
    }
    next();
  }
  function initBiReadings() {
    injectBiReadingStyle();
    if (window.speechSynthesis && typeof window.speechSynthesis.onvoiceschanged !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadBiVoices;
    }
    loadBiVoices();
    if (window.__psebBiWired) return;
    window.__psebBiWired = true;
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".bi-toggle,.bi-listen,.bi-stop") : null;
      if (!t) return;
      var box = t.closest(".bi-reading");
      if (!box) return;
      if (t.classList.contains("bi-toggle")) {
        biStop();
        var toEn = !box.classList.contains("show-en");
        box.classList.toggle("show-en", toEn);
        var pa = box.querySelector(".bi-pa"), en = box.querySelector(".bi-en");
        if (pa) pa.hidden = toEn;
        if (en) en.hidden = !toEn;
        t.textContent = toEn ? "ਪੰਜਾਬੀ" : "English";
        t.setAttribute("aria-pressed", toEn ? "true" : "false");
      } else if (t.classList.contains("bi-listen")) {
        biSpeak(box, t);
      } else if (t.classList.contains("bi-stop")) {
        biStop();
      }
    });
  }
  window.psebStopReading = biStop;
})();
