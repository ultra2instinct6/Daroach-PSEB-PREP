/* PSEB deck enhancements — shared across all chapters.
   Progress persistence, resume-to-last-slide, searchable slide outline/jump
   navigator (full-text, bilingual), click-counter-to-jump, bookmarks for
   revision, active-recall hide/reveal mode, study-time tracking, presenter
   timer, print/PDF handout, keyboard help overlay, fullscreen, #slide=N
   deep-linking, a site-wide persistent Punjabi/English reading-language
   toggle, Gurmukhi-aware text-to-speech, quiz score tracking, and an
   in-deck Quick Revision flashcard mode (no downloads).
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
  var LANG_KEY = "pseb.lang.v1";
  var SCORE_KEY = "pseb.scores.v1";

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
      ".pseb-tools{position:fixed;top:15px;right:15px;display:flex;gap:8px;z-index:1200;flex-wrap:wrap;justify-content:flex-end;max-width:calc(50vw - 110px)}" +
      ".pseb-tools button{width:40px;height:40px;border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));border-radius:10px;background:var(--deck-panel,rgba(14,14,18,.92));color:var(--deck-aura,#00e5ff);font-size:20px;line-height:1;cursor:pointer;box-shadow:0 12px 28px rgba(0,0,0,.24);transition:background .2s,border-color .2s,color .2s,transform .15s}" +
      ".pseb-tools button:hover{background:var(--deck-aura-soft,rgba(0,229,255,.16));border-color:var(--deck-aura,#00e5ff);color:var(--deck-text,#f8fafc);transform:translateY(-2px)}" +
      ".pseb-tools button#pseb-theme{color:var(--deck-warn,#ffaa00)}" +
      ".pseb-tools button#pseb-font{font-size:17px;font-weight:800;font-family:'Segoe UI',system-ui,sans-serif}" +
      ".pseb-tools button#pseb-lang{font-size:15px;font-weight:800;font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif)}" +
      ".pseb-tools button#pseb-rev{color:var(--deck-warn,#ffaa00)}" +
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
      '<button type="button" id="pseb-lang" title="Reading language \u00b7 \u0a2a\u0a5c\u0a4d\u0a39\u0a3e\u0a08 \u0a26\u0a40 \u0a2d\u0a3e\u0a38\u0a3c\u0a3e (L)" aria-label="Reading language">\u0a2a\u0a70</button>' +
      '<button type="button" id="pseb-rev" title="Quick Revision flashcards (R)" aria-label="Quick Revision flashcards">\u26A1</button>' +
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
          '<dt>L</dt><dd>Reading language \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 / English</dd>' +
          '<dt>R</dt><dd>Quick Revision flashcards</dd>' +
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
        '<input type="search" class="pseb-outline-search" placeholder="Search all slide text (English / \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40) or slide number\u2026" aria-label="Search slides">' +
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
        var match = q === "" || num === q || num.indexOf(q) === 0 || it.title.toLowerCase().indexOf(q) !== -1 || it.text.indexOf(q) !== -1;
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
        oItems.push({ btn: b, index: i, title: title, text: (s.textContent || "").replace(/\s+/g, " ").toLowerCase() });
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
    document.getElementById("pseb-rev").addEventListener("click", function () { if (window.__psebRevToggle) window.__psebRevToggle(); });
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
    enhanceFlagshipLabs();
    initBiReadings();
    installQuizEnhancements();
    patchSpeakWord();

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
    /* Deep links arriving while the deck is already open (same-document hash
       change) must still move the student to the requested slide. */
    window.addEventListener("hashchange", function () {
      var target = hashSlide();
      if (target != null && canNavigate()) jumpTo(target);
    });
    refreshBookmarkBtn();

    var ci = parseCounter();
    if (ci) saveSlide(ci.cur, ci.total);

    document.addEventListener("keydown", function (e) {
      var tag = document.activeElement ? document.activeElement.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) { e.preventDefault(); if (window.__psebShowHelp) window.__psebShowHelp(true); }
      else if (e.key === "Escape") { if (window.__psebShowHelp) window.__psebShowHelp(false); if (window.__psebOutlineShow) window.__psebOutlineShow(false); if (window.__psebFontPopClose) window.__psebFontPopClose(); if (window.__psebRevShow) window.__psebRevShow(false); }
      else if (e.key === "o" || e.key === "O") { e.preventDefault(); if (window.__psebOpenOutline) window.__psebOpenOutline(); }
      else if (e.key === "l" || e.key === "L") { e.preventDefault(); if (window.__psebToggleLang) window.__psebToggleLang(); }
      else if (e.key === "r" || e.key === "R") { e.preventDefault(); if (window.__psebRevToggle) window.__psebRevToggle(); }
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

  // ---- Flagship concept labs shared across chapters ----
  function enhanceFlagshipLabs() {
    document.querySelectorAll(".flagship-lab").forEach(function (lab) {
      lab.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && e.target.matches("[role='button']")) {
          e.preventDefault();
          e.target.click();
        }
      });
    });
    if (document.getElementById("acid-lab")) window.psebAcidMix();
    if (document.getElementById("optics-lab")) window.psebOpticsPosition("beyond");
    if (document.getElementById("vision-lab")) window.psebVisionLoad(0);
    if (document.getElementById("ohm-lab")) window.psebOhmUpdate();
    if (document.getElementById("fleming-lab")) window.psebFlemingLoad(0);
  }

  window.psebAcidMix = function () {
    var lab = document.getElementById("acid-lab");
    if (!lab) return;
    var acid = lab.querySelector("[data-acid]").value;
    var partner = lab.querySelector("[data-partner]").value;
    var cases = {
      metal: {
        title: "Acid + metal -> salt + hydrogen",
        hcl: "Zn + 2HCl -> ZnCl2 + H2 upward arrow",
        h2so4: "Zn + H2SO4 -> ZnSO4 + H2 upward arrow",
        test: "A burning splint gives a pop sound: hydrogen gas.", fx: "bubbles",
        product: "salt-h2", observation: "effervescence", gas: "pop"
      },
      carbonate: {
        title: "Acid + carbonate -> salt + water + carbon dioxide",
        hcl: "Na2CO3 + 2HCl -> 2NaCl + H2O + CO2 upward arrow",
        h2so4: "Na2CO3 + H2SO4 -> Na2SO4 + H2O + CO2 upward arrow",
        test: "Pass the gas through limewater: it turns milky.", fx: "foam",
        product: "salt-water-co2", observation: "effervescence", gas: "lime"
      },
      base: {
        title: "Neutralisation: acid + base -> salt + water",
        hcl: "HCl + NaOH -> NaCl + H2O",
        h2so4: "H2SO4 + 2NaOH -> Na2SO4 + 2H2O",
        test: "No gas forms. The mixture warms because neutralisation is exothermic.", fx: "warm",
        product: "salt-water", observation: "warm", gas: "none"
      },
      oxide: {
        title: "Acid + metal oxide -> salt + water",
        hcl: "CuO + 2HCl -> CuCl2 + H2O",
        h2so4: "CuO + H2SO4 -> CuSO4 + H2O",
        test: "The black copper oxide dissolves; a blue-green salt solution forms.", fx: "colour",
        product: "salt-water", observation: "color", gas: "none"
      }
    };
    var item = cases[partner];
    var vessel = lab.querySelector(".acid-vessel");
    vessel.className = "acid-vessel " + item.fx;
    lab.querySelector(".lab-result-title").textContent = item.title;
    lab.querySelector(".lab-equation").textContent = item[acid];
    lab.querySelector(".lab-explain").textContent = item.test;

    // Verdict against user predictions (only render if any prediction was made)
    var verdict = document.getElementById("predict-verdict");
    if (!verdict) return;
    var pProd = document.getElementById("predict-product");
    var pObs = document.getElementById("predict-observation");
    var pGas = document.getElementById("predict-gas");
    if (!pProd || !pObs || !pGas) return;
    if (!pProd.value && !pObs.value && !pGas.value) {
      verdict.hidden = true;
      return;
    }
    var productLabels = { "salt-h2": "Salt + Hydrogen", "salt-water-co2": "Salt + Water + CO2", "salt-water": "Salt + Water" };
    var obsLabels = { "effervescence": "Effervescence", "warm": "Temperature rise", "color": "Colour shift", "none": "No visible change" };
    var gasLabels = { "pop": "'Pop' sound (H2)", "lime": "Lime water milky (CO2)", "none": "No gas" };
    function row(label, guess, actual) {
      var ok = guess === actual;
      var mark = guess === "" ? "—" : (ok ? "✅" : "❌");
      return "<div class='verdict-row'><span class='vlabel'>" + label + ":</span> <span class='vguess'>" + mark + " You: " + (guess ? (label === "Product" ? productLabels[guess] : label === "Observation" ? obsLabels[guess] : gasLabels[guess]) : "no guess") + "</span> <span class='vactual'>Actual: " + (label === "Product" ? productLabels[actual] : label === "Observation" ? obsLabels[actual] : gasLabels[actual]) + "</span></div>";
    }
    var correct = 0, total = 0;
    [ [pProd, item.product], [pObs, item.observation], [pGas, item.gas] ].forEach(function (pair) {
      if (pair[0].value) { total++; if (pair[0].value === pair[1]) correct++; }
    });
    var score = total ? correct + "/" + total : "0/0";
    verdict.hidden = false;
    verdict.className = "predict-verdict" + (correct === total && total > 0 ? " all-correct" : (correct === 0 ? " none-correct" : " some-correct"));
    verdict.innerHTML = "<div class='verdict-head'>Prediction score: <strong>" + score + "</strong></div>" +
      row("Product", pProd.value, item.product) +
      row("Observation", pObs.value, item.observation) +
      row("Gas test", pGas.value, item.gas);
  };

  window.psebOpticsPosition = function (pos) {
    var lab = document.getElementById("optics-lab");
    if (!lab) return;
    var cases = {
      beyond: { object:"Beyond C", image:"Between C and F", nature:"Real, inverted, diminished", screen:"Can be caught on a screen", left:"57%", height:"42%" },
      atc: { object:"At C", image:"At C", nature:"Real, inverted, same size", screen:"Can be caught on a screen", left:"35%", height:"68%" },
      between: { object:"Between C and F", image:"Beyond C", nature:"Real, inverted, enlarged", screen:"Can be caught on a screen", left:"13%", height:"90%" },
      /* At F the reflected rays leave parallel, so the image is real but forms
         at infinity — there is no screen position that catches it. */
      atf: { object:"At F", image:"At infinity", nature:"Real, inverted, highly enlarged", screen:"Real, but formed at infinity — no screen can catch it", left:"4%", height:"96%" },
      inside: { object:"Between F and P", image:"Behind mirror", nature:"Virtual, erect, enlarged", screen:"Cannot be caught on a screen", left:"88%", height:"86%" }
    };
    var item = cases[pos];
    lab.querySelectorAll("[data-optics-pos]").forEach(function (b) { b.classList.toggle("active", b.dataset.opticsPos === pos); });
    var arrow = lab.querySelector(".optics-image-arrow");
    arrow.style.left = item.left;
    arrow.style.height = item.height;
    arrow.classList.toggle("erect", pos === "inside");
    lab.querySelector(".optics-object").textContent = item.object;
    lab.querySelector(".optics-image").textContent = item.image;
    lab.querySelector(".optics-nature").textContent = item.nature;
    lab.querySelector(".optics-screen").textContent = item.screen;
  };

  var visionCases = [
    { defect:"Myopia", clue:"Distant writing is blurred; rays focus before the retina.", focus:"before", answer:"concave", why:"A concave lens diverges rays first, moving the focus backward onto the retina." },
    { defect:"Hypermetropia", clue:"Nearby print is blurred; rays would focus behind the retina.", focus:"after", answer:"convex", why:"A convex lens converges rays first, pulling the focus forward onto the retina." },
    { defect:"Presbyopia", clue:"An older eye struggles with both near and far focus.", focus:"mixed", answer:"bifocal", why:"A bifocal combines distance and reading corrections in one lens." },
    { defect:"Cataract", clue:"The eye lens has become cloudy rather than focusing at the wrong point.", focus:"cloudy", answer:"surgery", why:"A cataract needs lens-replacement surgery; spectacles cannot clear an opaque lens." }
  ];
  var visionIndex = 0, visionScore = 0, visionAsked = 0, visionAnswered = false;
  window.psebVisionLoad = function (index) {
    var lab = document.getElementById("vision-lab");
    if (!lab) return;
    visionIndex = index % visionCases.length;
    visionAnswered = false;
    var item = visionCases[visionIndex];
    lab.querySelector(".vision-case-name").textContent = item.defect;
    lab.querySelector(".vision-clue").textContent = item.clue;
    lab.querySelector(".vision-feedback").textContent = "Choose the correction that places a clear image on the retina.";
    lab.querySelector(".vision-focus").className = "vision-focus " + item.focus;
    lab.querySelectorAll("[data-lens]").forEach(function (b) { b.disabled = false; b.classList.remove("correct", "incorrect"); });
  };
  window.psebVisionChoose = function (btn) {
    if (visionAnswered) return;
    visionAnswered = true; visionAsked++;
    var lab = document.getElementById("vision-lab"), item = visionCases[visionIndex];
    lab.querySelectorAll("[data-lens]").forEach(function (b) {
      b.disabled = true;
      if (b.dataset.lens === item.answer) b.classList.add("correct");
    });
    if (btn.dataset.lens === item.answer) { visionScore++; btn.classList.add("correct"); }
    else btn.classList.add("incorrect");
    lab.querySelector(".vision-focus").className = "vision-focus retina";
    lab.querySelector(".vision-feedback").innerHTML = "<strong>" + (btn.dataset.lens === item.answer ? "Correct. " : "Correction: " + item.answer + ". ") + "</strong>" + item.why;
    lab.querySelector(".vision-score").textContent = "Score: " + visionScore + " / " + visionAsked;
  };
  window.psebVisionNext = function () { window.psebVisionLoad((visionIndex + 1) % visionCases.length); };

  window.psebOhmUpdate = function () {
    var lab = document.getElementById("ohm-lab");
    if (!lab) return;
    var voltage = Number(lab.querySelector("[data-voltage]").value);
    var resistance = Number(lab.querySelector("[data-resistance]").value);
    var current = voltage / resistance;
    lab.querySelector(".ohm-v").textContent = voltage.toFixed(0) + " V";
    lab.querySelector(".ohm-r").textContent = resistance.toFixed(0) + " ohm";
    lab.querySelector(".ohm-i").textContent = current.toFixed(2) + " A";
    lab.querySelector(".ohm-calc").textContent = "I = V / R = " + voltage + " / " + resistance + " = " + current.toFixed(2) + " A";
    lab.querySelector(".ohm-needle").style.width = Math.min(100, current / 6 * 100) + "%";
    lab.querySelector(".ohm-point").style.left = Math.min(96, voltage / 12 * 92 + 3) + "%";
    lab.querySelector(".ohm-point").style.bottom = Math.min(92, current / 6 * 86 + 5) + "%";
  };
  window.psebOhmPreset = function (voltage, resistance) {
    var lab = document.getElementById("ohm-lab");
    if (!lab) return;
    lab.querySelector("[data-voltage]").value = voltage;
    lab.querySelector("[data-resistance]").value = resistance;
    window.psebOhmUpdate();
  };

  var flemingCases = [
    { field:"Right", current:"Up", answer:"Into page", why:"Field right and current up give force into the page." },
    { field:"Right", current:"Down", answer:"Out of page", why:"Reversing current reverses the force." },
    { field:"Left", current:"Up", answer:"Out of page", why:"Reversing the field reverses the force." },
    { field:"Left", current:"Down", answer:"Into page", why:"Both directions reversed restore the original force direction." },
    { field:"Into page", current:"Right", answer:"Up", why:"Forefinger into page and middle finger right make the thumb point up." },
    { field:"Out of page", current:"Right", answer:"Down", why:"Reversing the field makes the force point down." }
  ];
  var flemingIndex = 0, flemingScore = 0, flemingAsked = 0, flemingAnswered = false;
  window.psebFlemingLoad = function (index) {
    var lab = document.getElementById("fleming-lab");
    if (!lab) return;
    flemingIndex = index % flemingCases.length; flemingAnswered = false;
    var item = flemingCases[flemingIndex];
    lab.querySelector(".fleming-field").textContent = item.field;
    lab.querySelector(".fleming-current").textContent = item.current;
    lab.querySelector(".fleming-feedback").textContent = "Use the left hand: forefinger = field, middle finger = current, thumb = force.";
    lab.querySelectorAll("[data-force]").forEach(function (b) { b.disabled = false; b.classList.remove("correct", "incorrect"); });
  };
  window.psebFlemingChoose = function (btn) {
    if (flemingAnswered) return;
    flemingAnswered = true; flemingAsked++;
    var lab = document.getElementById("fleming-lab"), item = flemingCases[flemingIndex];
    lab.querySelectorAll("[data-force]").forEach(function (b) {
      b.disabled = true;
      if (b.dataset.force === item.answer) b.classList.add("correct");
    });
    if (btn.dataset.force === item.answer) { flemingScore++; btn.classList.add("correct"); }
    else btn.classList.add("incorrect");
    lab.querySelector(".fleming-feedback").innerHTML = "<strong>" + item.answer + ".</strong> " + item.why;
    lab.querySelector(".fleming-score").textContent = "Score: " + flemingScore + " / " + flemingAsked;
  };
  window.psebFlemingNext = function () { window.psebFlemingLoad((flemingIndex + 1) % flemingCases.length); };

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
      ".content-box h2.bi-head{font-size:clamp(1rem,2vw,1.2rem)!important;font-weight:700!important;letter-spacing:.06em;text-transform:uppercase;opacity:.7;margin:0 0 10px!important;padding:0!important;border:0!important;line-height:1.3!important}" +
      ".content-box h2.bi-head::after,.content-box h2.bi-head::before{display:none!important;content:none!important}" +
      ".bi-read-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}" +
      ".bi-title{margin:0;font-size:clamp(1.3rem,3.2vw,1.9rem);line-height:1.2;font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);color:var(--deck-text,#f8fafc)}" +
      ".bi-title .bi-title-en{display:block;font-size:.6em;font-family:'Segoe UI',system-ui,sans-serif;color:var(--deck-aura,#7c9cff);font-weight:600;margin-top:2px}" +
      ".bi-actions{display:flex;gap:8px;flex:none}" +
      ".bi-btn{border:1px solid var(--deck-border-strong,rgba(255,255,255,.18));background:var(--deck-panel,rgba(18,18,24,.92));color:var(--deck-text,#f1f5f9);font-size:.95rem;font-weight:600;padding:8px 13px;border-radius:10px;cursor:pointer;transition:background .18s,border-color .18s,transform .12s;font-family:'Segoe UI',system-ui,sans-serif}" +
      ".bi-btn:hover{background:var(--deck-aura-soft,rgba(124,156,255,.16));border-color:var(--deck-aura,#7c9cff);transform:translateY(-1px)}" +
      ".bi-btn.bi-toggle{background:#4F46E5;border-color:#4F46E5;color:#fff}" +
      ".bi-btn.bi-toggle:hover{background:#4338ca}" +
      ".bi-btn.is-speaking{background:var(--deck-warn,#ffaa00);border-color:var(--deck-warn,#ffaa00);color:#111}" +
      ".bi-body{background:var(--deck-panel,rgba(18,18,24,.6));border:1px solid var(--deck-border,rgba(255,255,255,.08));border-left:5px solid #4F46E5;border-radius:14px;padding:18px 24px}" +
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
    var langBtn = document.getElementById("pseb-lang");
    if (langBtn && !langBtn.__psebWired) {
      langBtn.__psebWired = true;
      langBtn.addEventListener("click", toggleLang);
    }
    applyLang(getLangPref(), false);
    if (window.__psebBiWired) return;
    window.__psebBiWired = true;
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest(".bi-toggle,.bi-listen,.bi-stop") : null;
      if (!t) return;
      var box = t.closest(".bi-reading");
      if (!box) return;
      if (t.classList.contains("bi-toggle")) {
        // A single reading's toggle now drives the shared preference so every
        // reading (in this deck and all others) stays in the chosen language.
        applyLang(box.classList.contains("show-en") ? "pa" : "en", false);
      } else if (t.classList.contains("bi-listen")) {
        biSpeak(box, t);
      } else if (t.classList.contains("bi-stop")) {
        biStop();
      }
    });
  }
  window.psebStopReading = biStop;

  // ---- Site-wide persistent reading language (Punjabi Gurmukhi <-> English) ----
  // One preference, stored in LANG_KEY, applied to every .bi-reading in every
  // chapter. Toggling any reading (or the toolbar ਪੰ/EN button, or key L)
  // switches ALL readings and is remembered across chapters and visits.
  function getLangPref() {
    var v = "";
    try { v = localStorage.getItem(LANG_KEY) || ""; } catch (e) {}
    return v === "en" ? "en" : "pa";
  }
  function applyLang(lang, announce) {
    biStop();
    var toEn = lang === "en";
    var boxes = document.querySelectorAll(".bi-reading");
    Array.prototype.forEach.call(boxes, function (box) {
      box.classList.toggle("show-en", toEn);
      var pa = box.querySelector(".bi-pa"), en = box.querySelector(".bi-en");
      if (pa) pa.hidden = toEn;
      if (en) en.hidden = !toEn;
      var t = box.querySelector(".bi-toggle");
      if (t) {
        t.textContent = toEn ? "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40" : "English";
        t.setAttribute("aria-pressed", toEn ? "true" : "false");
      }
    });
    try { localStorage.setItem(LANG_KEY, toEn ? "en" : "pa"); } catch (e) {}
    var b = document.getElementById("pseb-lang");
    if (b) {
      b.textContent = toEn ? "EN" : "\u0a2a\u0a70";
      b.title = toEn
        ? "Readings: English \u2014 switch to \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 (L)"
        : "Readings: \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 \u2014 switch to English (L)";
    }
    if (announce) toast(toEn ? "Readings in English" : "\u0a2a\u0a5c\u0a4d\u0a39\u0a3e\u0a08 \u0a39\u0a41\u0a23 \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 \u0a35\u0a3f\u0a71\u0a1a (Readings in Punjabi)");
  }
  function toggleLang() { applyLang(getLangPref() === "en" ? "pa" : "en", true); }
  window.__psebToggleLang = toggleLang;

  // ---- Unified quiz feedback + bilingual "why" explanations ----
  // Overrides the per-chapter inline checkAnswer/checkSA (which load before this
  // file) with a single consistent implementation shared by every chapter, so
  // MCQ, True/False and Short-Answer all render the same bilingual feedback card
  // and surface an optional explanation from data-explain / data-explain-pa.
  function qfFindCorrectBtn(qDiv) {
    var c = qDiv.querySelector('.option-btn[data-correct="true"]');
    if (c) return c;
    var btns = qDiv.querySelectorAll(".option-btn");
    for (var i = 0; i < btns.length; i++) {
      var oc = btns[i].getAttribute("onclick") || "";
      if (/checkAnswer\(this,\s*true\s*,/.test(oc)) return btns[i];
    }
    return null;
  }
  function qfExplainHtml(qDiv) {
    var en = qDiv.getAttribute("data-explain");
    var pa = qDiv.getAttribute("data-explain-pa");
    if (!en && !pa) return "";
    var h = '<div class="qf-explain"><div class="qf-explain-label">Why &nbsp;\u00b7&nbsp; ਕਿਉਂ</div>';
    if (en) h += '<div class="qf-explain-en">' + en + "</div>";
    if (pa) h += '<div class="qf-explain-pa punjabi-block">' + pa + "</div>";
    return h + "</div>";
  }
  function enhancedCheckAnswer(btn, isCorrect, isMCQ) {
    var qDiv = btn.closest ? btn.closest(".sub-slide") : null;
    if (!qDiv) return;
    var feedback = qDiv.querySelector(".feedback");
    var nextBtn = qDiv.querySelector(".next-sub-btn");
    var buttons = qDiv.querySelectorAll(".option-btn");
    for (var i = 0; i < buttons.length; i++) buttons[i].disabled = true;
    var correctBtn = qfFindCorrectBtn(qDiv);
    if (isCorrect) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
      if (correctBtn) correctBtn.classList.add("correct");
    }
    var h = '<div class="quiz-feedback ' + (isCorrect ? "is-correct" : "is-incorrect") + '">';
    h += '<div class="qf-status">' + (isCorrect
      ? '\u2713 Correct <span class="qf-pa">(ਸਹੀ)</span>'
      : '\u2717 Incorrect <span class="qf-pa">(ਗਲਤ)</span>') + "</div>";
    if (!isCorrect && correctBtn) {
      var ct = (correctBtn.textContent || "").trim();
      h += '<div class="qf-answer">Correct answer <span class="qf-pa">(ਸਹੀ ਜਵਾਬ)</span>: <strong>' + ct + "</strong></div>";
    }
    h += qfExplainHtml(qDiv) + "</div>";
    if (feedback) feedback.innerHTML = h;
    if (nextBtn) nextBtn.style.display = "block";
    recordQuiz(qDiv, !!isCorrect, correctBtn ? (correctBtn.textContent || "").replace(/\s+/g, " ").trim() : "", "");
  }
  function enhancedCheckSA(btn, expectedEn, expectedPa) {
    var qDiv = btn.closest ? btn.closest(".sub-slide") : null;
    if (!qDiv) return;
    var input = qDiv.querySelector(".sa-input");
    var feedback = qDiv.querySelector(".feedback");
    var nextBtn = qDiv.querySelector(".next-sub-btn");
    var userVal = (input && input.value ? input.value : "").trim().toLowerCase();
    var ok = !!userVal && userVal === (expectedEn || "").toLowerCase();
    if (input) input.disabled = true;
    btn.disabled = true;
    var h = '<div class="quiz-feedback ' + (ok ? "is-correct" : "is-incorrect") + '">';
    h += '<div class="qf-status">' + (ok
      ? '\u2713 Correct <span class="qf-pa">(ਸਹੀ)</span>'
      : '\u2717 Not quite <span class="qf-pa">(ਲਗਭਗ)</span>') + "</div>";
    h += '<div class="qf-answer">' + (ok ? "Answer" : "Expected answer") +
      ' <span class="qf-pa">(ਜਵਾਬ)</span>: <strong>' + (expectedEn || "") + "</strong></div>";
    if (expectedPa) h += '<div class="qf-answer-pa punjabi-block">' + expectedPa + "</div>";
    h += qfExplainHtml(qDiv) + "</div>";
    if (feedback) feedback.innerHTML = h;
    if (nextBtn) nextBtn.style.display = "block";
    recordQuiz(qDiv, ok, expectedEn || "", expectedPa || "");
  }
  function installQuizEnhancements() {
    window.checkAnswer = enhancedCheckAnswer;
    window.checkSA = enhancedCheckSA;
  }

  // ==== Quiz score tracking =================================================
  // Every MCQ / True-False / Short-Answer result is tallied per chapter in
  // SCORE_KEY. Missed questions are remembered (and cleared once answered
  // correctly) so Quick Revision can put them first. Finishing a quiz shows a
  // score toast.
  function readScores() {
    try { return JSON.parse(localStorage.getItem(SCORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function writeScores(s) {
    try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function qText(qDiv) {
    var q = qDiv.getAttribute("data-q") || "";
    if (!q) {
      var el = qDiv.querySelector(".question-text");
      if (el) {
        var clone = el.cloneNode(true);
        var subs = clone.querySelectorAll(".punjabi-block,.punjabi");
        Array.prototype.forEach.call(subs, function (p) { p.parentNode.removeChild(p); });
        q = (clone.textContent || "").replace(/\s+/g, " ").trim();
      }
    }
    return q;
  }
  var quizRun = {};
  function recordQuiz(qDiv, ok, answerEn, answerPa) {
    try {
      if (!qDiv) return;
      var chKey = CH != null ? String(CH) : null;
      if (chKey) {
        var s = readScores();
        var rec = s[chKey] || (s[chKey] = { right: 0, wrong: 0, missed: [] });
        if (!rec.missed) rec.missed = [];
        if (ok) rec.right = (rec.right || 0) + 1; else rec.wrong = (rec.wrong || 0) + 1;
        var q = qText(qDiv);
        if (q) {
          rec.missed = rec.missed.filter(function (m) { return m.q !== q; });
          if (!ok) {
            rec.missed.push({
              q: q,
              a: answerEn || "",
              pa: answerPa || "",
              why: qDiv.getAttribute("data-explain") || "",
              whyPa: qDiv.getAttribute("data-explain-pa") || ""
            });
            if (rec.missed.length > 40) rec.missed = rec.missed.slice(-40);
          }
        }
        writeScores(s);
      }
      var c = qDiv.closest ? qDiv.closest(".sub-slider-container") : null;
      if (c && c.id) {
        var slides = c.querySelectorAll(".sub-slide");
        var total = slides.length;
        var st = quizRun[c.id];
        if (!st || st.total !== total) st = quizRun[c.id] = { done: {}, right: 0, total: total };
        var key = qDiv.id || String(Array.prototype.indexOf.call(slides, qDiv));
        if (st.done[key]) st = quizRun[c.id] = { done: {}, right: 0, total: total }; // retake
        st.done[key] = 1;
        if (ok) st.right++;
        if (Object.keys(st.done).length >= total) {
          toast(st.right === total
            ? "Quiz complete: " + st.right + "/" + total + " \u2014 \u0a36\u0a3e\u0a2c\u0a3e\u0a36! Perfect!"
            : "Quiz complete: " + st.right + "/" + total + " \u2014 missed ones await in \u26A1 Quick Revision");
          delete quizRun[c.id];
        }
      }
    } catch (e) {}
  }

  // ==== Quick Revision: in-deck flashcards (no downloads) ===================
  // Built live from this chapter's Say-It-Back cards (data-q / data-a / data-pa
  // / data-explain). Previously missed quiz questions come first, tagged
  // "Tricky". Again/Got-it queue mimics spaced recall inside the lecture.
  function injectRevStyle() {
    if (document.getElementById("pseb-rev-style")) return;
    var s = document.createElement("style");
    s.id = "pseb-rev-style";
    s.textContent =
      ".pseb-rev-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.65);display:none;align-items:center;justify-content:center;z-index:1300}" +
      ".pseb-rev-backdrop.show{display:flex}" +
      ".pseb-rev{background:#fff;color:#1e293b;max-width:600px;width:92%;max-height:86vh;border-radius:14px;padding:22px 24px;box-shadow:0 20px 50px rgba(0,0,0,.35);font-family:'Segoe UI',system-ui,sans-serif;display:flex;flex-direction:column;gap:14px}" +
      ".pseb-rev-top{display:flex;align-items:center;gap:10px}" +
      ".pseb-rev-top h3{margin:0;font-size:1.2rem;color:#0047BB;flex:1}" +
      ".pseb-rev-count{font-weight:700;color:#64748b;font-size:.95rem;font-variant-numeric:tabular-nums}" +
      ".pseb-rev-close{border:none;background:#f1f5f9;color:#334155;width:32px;height:32px;border-radius:8px;font-size:18px;cursor:pointer}" +
      ".pseb-rev-close:hover{background:#e2e8f0}" +
      ".pseb-rev p,.pseb-rev li{color:#1e293b!important}" +
      ".pseb-rev-card{overflow-y:auto;border:1px solid #e2e8f0;border-left:5px solid #FF5C00;border-radius:12px;padding:18px 20px;background:#f8fafc}" +
      ".pseb-rev-tag{display:inline-block;background:#FF5C00;color:#fff;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:3px 9px;border-radius:999px;margin-bottom:8px}" +
      ".pseb-rev-q{font-size:1.25rem;font-weight:700;line-height:1.5;margin:0}" +
      ".pseb-rev-a{margin-top:14px;padding-top:14px;border-top:1px dashed #cbd5e1}" +
      ".pseb-rev-a[hidden]{display:none}" +
      ".pseb-rev-a .ans{font-size:1.3rem;font-weight:800;color:#0047BB!important;margin:0}" +
      ".pseb-rev-a .ans-pa{font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);font-size:1.15rem;color:#475569!important;margin:4px 0 0}" +
      ".pseb-rev-a .why{margin-top:10px;background:#eef2ff;border-radius:8px;padding:10px 12px;font-size:.98rem;line-height:1.55;color:#1e293b}" +
      ".pseb-rev-a .why .why-pa{font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);color:#475569;display:block;margin-top:4px}" +
      ".pseb-rev-actions{display:flex;gap:10px}" +
      ".pseb-rev-actions button{flex:1;padding:12px;border:none;border-radius:10px;font-size:1rem;font-weight:800;cursor:pointer;font-family:inherit;transition:transform .12s,background .15s}" +
      ".pseb-rev-actions button:active{transform:scale(.97)}" +
      ".pseb-rev-reveal{background:#0047BB;color:#fff}" +
      ".pseb-rev-reveal:hover{background:#003a99}" +
      ".pseb-rev-again{background:#fff7ed;color:#c2410c;border:2px solid #fdba74!important}" +
      ".pseb-rev-again:hover{background:#ffedd5}" +
      ".pseb-rev-got{background:#10B981;color:#fff}" +
      ".pseb-rev-got:hover{background:#0e9f6e}" +
      ".pseb-rev-summary{text-align:center;padding:26px 10px}" +
      ".pseb-rev-summary .big{font-size:1.5rem;font-weight:800;color:#0047BB!important;margin:0 0 8px}" +
      ".pseb-rev-summary p{margin:0;color:#475569!important}";
    document.head.appendChild(s);
  }
  var revState = null;
  var revEls = null;
  function buildRev() {
    if (revEls) return;
    injectRevStyle();
    var back = document.createElement("div");
    back.className = "pseb-rev-backdrop";
    back.setAttribute("role", "dialog");
    back.setAttribute("aria-modal", "true");
    back.setAttribute("aria-label", "Quick Revision flashcards");
    back.innerHTML =
      '<div class="pseb-rev">' +
        '<div class="pseb-rev-top">' +
          '<h3>\u26A1 Quick Revision \u00b7 \u0a24\u0a41\u0a30\u0a70\u0a24 \u0a26\u0a41\u0a39\u0a30\u0a3e\u0a08</h3>' +
          '<span class="pseb-rev-count"></span>' +
          '<button type="button" class="pseb-rev-close" aria-label="Close">\u00d7</button>' +
        '</div>' +
        '<div class="pseb-rev-card"></div>' +
        '<div class="pseb-rev-actions"></div>' +
      '</div>';
    document.body.appendChild(back);
    back.addEventListener("click", function (e) { if (e.target === back) revShow(false); });
    back.querySelector(".pseb-rev-close").addEventListener("click", function () { revShow(false); });
    revEls = {
      back: back,
      count: back.querySelector(".pseb-rev-count"),
      card: back.querySelector(".pseb-rev-card"),
      actions: back.querySelector(".pseb-rev-actions")
    };
  }
  function esc(t) {
    return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function collectRevCards() {
    var cards = [], seen = {};
    var nodes = document.querySelectorAll(".sub-slide.short-answer[data-q]");
    Array.prototype.forEach.call(nodes, function (n) {
      var q = n.getAttribute("data-q"), a = n.getAttribute("data-a");
      if (!q || !a || seen[q]) return;
      seen[q] = 1;
      cards.push({
        q: q, a: a,
        pa: n.getAttribute("data-pa") || "",
        why: n.getAttribute("data-explain") || "",
        whyPa: n.getAttribute("data-explain-pa") || "",
        tricky: false
      });
    });
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
    }
    var chKey = CH != null ? String(CH) : null;
    if (chKey) {
      var rec = readScores()[chKey];
      if (rec && rec.missed && rec.missed.length) {
        var missedByQ = {};
        rec.missed.forEach(function (m) { if (m && m.q) missedByQ[m.q] = m; });
        var tricky = [], rest = [];
        cards.forEach(function (c) {
          if (missedByQ[c.q]) { c.tricky = true; delete missedByQ[c.q]; tricky.push(c); }
          else rest.push(c);
        });
        Object.keys(missedByQ).forEach(function (k) {
          var m = missedByQ[k];
          if (m.a) tricky.push({ q: m.q, a: m.a, pa: m.pa || "", why: m.why || "", whyPa: m.whyPa || "", tricky: true });
        });
        cards = tricky.concat(rest);
      }
    }
    return cards;
  }
  function revRender() {
    var st = revState;
    if (!st || !revEls) return;
    if (!st.queue.length) {
      revEls.count.textContent = "";
      revEls.card.innerHTML =
        '<div class="pseb-rev-summary">' +
          '<p class="big">\u0a36\u0a3e\u0a2c\u0a3e\u0a36! Round complete</p>' +
          '<p>' + st.total + ' card' + (st.total === 1 ? "" : "s") + ' revised \u00b7 ' +
          st.repeats + ' repeat' + (st.repeats === 1 ? "" : "s") + '</p>' +
        '</div>';
      revEls.actions.innerHTML =
        '<button type="button" class="pseb-rev-again">Restart \u21ba</button>' +
        '<button type="button" class="pseb-rev-got">Done \u2713</button>';
      revEls.actions.querySelector(".pseb-rev-again").addEventListener("click", openRev);
      revEls.actions.querySelector(".pseb-rev-got").addEventListener("click", function () { revShow(false); });
      return;
    }
    var c = st.queue[0];
    revEls.count.textContent = (st.total - st.queue.length + 1) + " / " + st.total +
      (st.queue.length > 1 ? " \u00b7 " + (st.queue.length - 1) + " left" : "");
    var h = "";
    if (c.tricky) h += '<span class="pseb-rev-tag">Tricky \u00b7 \u0a14\u0a16\u0a3e</span>';
    h += '<p class="pseb-rev-q">' + esc(c.q) + '</p>';
    h += '<div class="pseb-rev-a" hidden>';
    h += '<p class="ans">' + esc(c.a) + '</p>';
    if (c.pa) h += '<p class="ans-pa">' + esc(c.pa) + '</p>';
    if (c.why || c.whyPa) {
      h += '<div class="why">' + esc(c.why) +
        (c.whyPa ? '<span class="why-pa">' + esc(c.whyPa) + '</span>' : "") + '</div>';
    }
    h += '</div>';
    revEls.card.innerHTML = h;
    revEls.actions.innerHTML =
      '<button type="button" class="pseb-rev-reveal">Show answer \u00b7 \u0a1c\u0a35\u0a3e\u0a2c</button>';
    revEls.actions.querySelector(".pseb-rev-reveal").addEventListener("click", function () {
      var a = revEls.card.querySelector(".pseb-rev-a");
      if (a) a.hidden = false;
      revEls.actions.innerHTML =
        '<button type="button" class="pseb-rev-again">Again \u21ba \u00b7 \u0a2b\u0a3f\u0a30</button>' +
        '<button type="button" class="pseb-rev-got">Got it \u2713 \u00b7 \u0a06 \u0a17\u0a3f\u0a06</button>';
      revEls.actions.querySelector(".pseb-rev-again").addEventListener("click", function () {
        st.repeats++;
        var card = st.queue.shift();
        card.tricky = true;
        st.queue.push(card);
        revRender();
      });
      revEls.actions.querySelector(".pseb-rev-got").addEventListener("click", function () {
        st.queue.shift();
        revRender();
      });
    });
  }
  function revShow(v) {
    if (!revEls && v) buildRev();
    if (revEls) revEls.back.classList.toggle("show", !!v);
  }
  window.__psebRevShow = revShow;
  function openRev() {
    buildRev();
    var cards = collectRevCards();
    if (!cards.length) { toast("No revision cards in this chapter"); return; }
    revState = { queue: cards, total: cards.length, repeats: 0 };
    revRender();
    revShow(true);
  }
  function revToggle() {
    if (revEls && revEls.back.classList.contains("show")) { revShow(false); return; }
    openRev();
  }
  window.__psebRevToggle = revToggle;

  // ==== Gurmukhi-aware text-to-speech =======================================
  // The per-chapter speakWord() is English-only. Wrap it so any text that
  // contains Gurmukhi script is spoken with a Punjabi (pa-IN) voice instead.
  function patchSpeakWord() {
    var orig = window.speakWord;
    window.speakWord = function (text, btn) {
      var t = String(text == null ? "" : text);
      if (/[\u0A00-\u0A7F]/.test(t) && "speechSynthesis" in window) {
        try {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(t);
          u.lang = "pa-IN";
          var v = pickVoice("pa");
          if (v) u.voice = v;
          u.rate = 0.85;
          if (btn) {
            btn.style.backgroundColor = "#D1FAE5";
            u.onend = function () { btn.style.backgroundColor = ""; };
            u.onerror = function () { btn.style.backgroundColor = ""; };
          }
          window.speechSynthesis.speak(u);
          return;
        } catch (e) {}
      }
      if (typeof orig === "function") orig(text, btn);
    };
  }
})();