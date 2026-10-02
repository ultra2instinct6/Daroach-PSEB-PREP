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

  /* localStorage throws — not just returns null — when storage is blocked
     (Safari Private Browsing, "block all cookies", some Android WebViews) and
     when the origin is over quota. These wrappers keep one unavailable key
     from taking down the whole enhancement layer, so bookmarks, theme and
     language degrade to session-only instead of breaking the deck. */
  function lsGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function lsGetJSON(key) {
    var raw = lsGet(key);
    if (!raw) return {};
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) { return {}; }
  }
  function lsSetJSON(key, value) {
    try { return lsSet(key, JSON.stringify(value)); } catch (e) { return false; }
  }
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
    var v = parseInt(lsGet(FONTSCALE_KEY), 10);
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

  /* Resolve sibling assets from this script's own URL so the engine works
     from a chapter sub-folder, the repository root, or a nested preview. */
  var ASSET_BASE = (function () {
    var s = document.currentScript;
    if (!s) s = document.querySelector('script[src*="deck-enhance.js"]');
    if (s && s.src) return s.src.replace(/[^/]*$/, "");
    return "../assets/";
  })();

  function injectDeckThemeCss() {
    if (document.getElementById("pseb-deck-theme-css")) return;
    var l = document.createElement("link");
    l.id = "pseb-deck-theme-css";
    l.rel = "stylesheet";
    l.href = ASSET_BASE + "deck-theme.css";
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
    var v = lsGet(DECK_THEME_KEY) || "";
    return v === "legacy" ? "legacy" : "instinct";
  }
  function applyDeckTheme(v) {
    v = v === "legacy" ? "legacy" : "instinct";
    document.documentElement.setAttribute("data-deck-theme", v);
    document.documentElement.setAttribute("data-subject-tone", chapterTone());
    lsSet(DECK_THEME_KEY, v);
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
    return lsGetJSON(PROGRESS_KEY);
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
    var all = readProgress();
    var p = all[CH] || {};
    p.visited = true;
    if (total) p.total = total;
    p.lastSlide = cur;
    if (total && cur >= total - 1) p.done = true;
    all[CH] = p;
    lsSetJSON(PROGRESS_KEY, all);
    lsSet(LAST_KEY, String(CH));
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

  /* ==== Intra-lecture sections & breadcrumbs ================================
     A 32-slide deck is a lecture, not a list, but nothing in the chrome told
     the student where in the lecture they were. Slides can now declare which
     sub-topic they belong to:

       <div class="slide" data-section-id="balancing"
            data-section-en="Balancing Equations"
            data-section-pa="ਸਮੀਕਰਣ ਸੰਤੁਲਿਤ ਕਰਨਾ">

     Only the *first* slide of a section needs the attributes; every following
     slide inherits them until the next declaration. That keeps the markup diff
     tiny and makes it impossible for a section to have a gap in the middle. */

  var sectionMap = null;   /* slide index -> section record */
  var sectionList = null;  /* ordered, numbered sections */

  function buildSections() {
    sectionMap = [];
    sectionList = [];
    var slides = document.querySelectorAll(".slide");
    var cur = null;
    for (var i = 0; i < slides.length; i++) {
      var el = slides[i];
      var id = el.getAttribute("data-section-id");
      if (id) {
        cur = {
          id: id,
          en: el.getAttribute("data-section-en") || id,
          pa: el.getAttribute("data-section-pa") || "",
          mins: parseInt(el.getAttribute("data-section-mins"), 10) || 0,
          number: 0,
          first: i,
          slides: []
        };
        /* Front matter (cover, reading corner, vocabulary) is a section but
           not a numbered sub-topic — numbering it would make "1." mean the
           chapter cover rather than the first real idea. */
        if (el.getAttribute("data-section-unnumbered") == null) {
          cur.number = sectionList.filter(function (s) { return s.number; }).length + 1;
        }
        sectionList.push(cur);
      }
      if (cur) cur.slides.push(i);
      sectionMap[i] = cur;
    }
    return sectionList.length;
  }

  function sectionTitle(sec) {
    if (!sec) return "";
    var pa = getLangPref() === "pa" && sec.pa;
    var t = pa ? sec.pa : sec.en;
    return sec.number ? sec.number + ". " + t : t;
  }

  function chapterLabel() {
    if (CH == null) return "";
    return getLangPref() === "pa" ? "\u0a2a\u0a3e\u0a20 " + CH : "Chapter " + CH;
  }

  function refreshCrumb() {
    var bar = document.getElementById("pseb-crumb");
    if (!bar) return;
    if (!sectionList || !sectionList.length) { bar.hidden = true; return; }
    var i = currentIndex();
    var sec = sectionMap[i];
    if (!sec) { bar.hidden = true; return; }
    bar.hidden = false;

    var pos = sec.slides.indexOf(i) + 1;
    bar.querySelector(".pseb-crumb-ch").textContent = chapterLabel();
    var secEl = bar.querySelector(".pseb-crumb-sec");
    secEl.textContent = sectionTitle(sec);
    /* Gurmukhi read by an English voice is unintelligible. */
    secEl.setAttribute("lang", getLangPref() === "pa" && sec.pa ? "pa" : "en");
    bar.querySelector(".pseb-crumb-pos").textContent = pos + "/" + sec.slides.length;
    var of = getLangPref() === "pa" ? " \u0a35\u0a3f\u0a71\u0a1a\u0a4b\u0a02 " : " of ";
    var slideWord = getLangPref() === "pa" ? "\u0a38\u0a32\u0a3e\u0a08\u0a21 " : "slide ";
    bar.setAttribute("aria-label", chapterLabel() + ", " + sectionTitle(sec) + ", " + slideWord + pos + of + sec.slides.length);
  }

  /* Milestone banner — the "section-cover" layout, rendered from the section
     metadata rather than hand-authored on a separate slide. Dropping it onto
     the first slide of each sub-topic means the student gets the signpost
     without the deck gaining sixteen near-empty cover slides. */
  function buildMilestones() {
    if (!sectionList) return;
    var pa = getLangPref() === "pa";
    for (var s = 0; s < sectionList.length; s++) {
      var sec = sectionList[s];
      if (!sec.number) continue;
      var slide = document.querySelectorAll(".slide")[sec.first];
      if (!slide) continue;
      var box = slide.querySelector(".content-box") || slide;

      var el = box.querySelector(".pseb-milestone");
      if (!el) {
        el = document.createElement("div");
        el.className = "pseb-milestone";
        box.insertBefore(el, box.firstChild);
      }

      var goalsRaw = pa
        ? (slide.getAttribute("data-section-goals-pa") || slide.getAttribute("data-section-goals") || "")
        : (slide.getAttribute("data-section-goals") || "");
      var goals = goalsRaw ? goalsRaw.split("|") : [];

      var html =
        '<div class="pseb-milestone-row">' +
          '<span class="pseb-milestone-badge">' +
            (pa ? "\u0a2d\u0a3e\u0a17 " : "Section ") + sec.number +
            '<span class="pseb-milestone-name" lang="' + (pa && sec.pa ? "pa" : "en") + '">' +
              escapeHtml(pa && sec.pa ? sec.pa : sec.en) + "</span>" +
          "</span>";
      if (sec.mins) {
        html += '<span class="pseb-milestone-mins">\u23F1 ~' + sec.mins + (pa ? " \u0a2e\u0a3f\u0a70\u0a1f" : " min") + "</span>";
      }
      html += '<span class="pseb-milestone-mins">' + sec.slides.length + (pa ? " \u0a38\u0a32\u0a3e\u0a08\u0a21" : " slides") + "</span>";
      html += "</div>";

      if (goals.length) {
        html += '<ul class="pseb-milestone-goals" lang="' + (pa && goalsRaw === (slide.getAttribute("data-section-goals-pa") || "") ? "pa" : "en") + '">';
        for (var gi = 0; gi < goals.length; gi++) {
          html += "<li>" + escapeHtml(goals[gi].trim()) + "</li>";
        }
        html += "</ul>";
      }
      el.innerHTML = html;
    }
  }

  function escapeHtml(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function readBookmarks() {
    return lsGetJSON(BOOKMARK_KEY);
  }
  function writeBookmarks(b) {
    return lsSetJSON(BOOKMARK_KEY, b);
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
    var s = lsGetJSON(STUDY_KEY);
    if (!s.days) s.days = {};
    var k = todayKey();
    s.days[k] = (s.days[k] || 0) + sec;
    s.lastDay = k;
    lsSetJSON(STUDY_KEY, s);
  }
  function hashSlide() {
    var mm = /(?:slide|s)=(\d+)/i.exec(location.hash || "");
    if (mm) { var n = parseInt(mm[1], 10); if (n >= 1) return n - 1; }
    /* #section=redox — a teacher can hand out a link to one sub-topic rather
       than "open chapter 1 and scroll to about slide nineteen". */
    var sm = /section=([A-Za-z0-9_-]+)/i.exec(location.hash || "");
    if (sm) {
      if (!sectionList) buildSections();
      for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].id === sm[1]) return sectionList[i].first;
      }
    }
    return null;
  }

  /* Step to the first slide of the previous / next section. Inside a section
     the first press rewinds to that section's own opening slide, which is the
     behaviour people expect from chapter-skip controls on a media player. */
  function jumpSection(dir) {
    if (!sectionList || !sectionList.length || !canNavigate()) return;
    var i = currentIndex();
    var sec = sectionMap[i];
    if (!sec) return;
    var pos = sectionList.indexOf(sec);
    var target;
    if (dir < 0) {
      target = i > sec.first ? sec : sectionList[Math.max(0, pos - 1)];
    } else {
      target = sectionList[Math.min(sectionList.length - 1, pos + 1)];
    }
    if (!target) return;
    jumpTo(target.first);
    toast(sectionTitle(target));
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
  /* ==== Active recall: interactive cloze deletion ==========================
     Masks the key terms on the current slide as tappable [ ??? ] blanks and
     leaves the surrounding sentence intact, so the student has to retrieve
     the term from context rather than stare at a blurred slab. Tapping one
     blank reveals only that term. */
  var recallOn = false;
  var CLOZE_MASK = "[ ??? ]";
  /* Elements whose text is the answer itself, or is too structural to mask. */
  var CLOZE_TARGETS = "strong, b, .accent, .accent-blue, .k, .key-term, .vocab-en";
  var CLOZE_SKIP = /(^|\s)(pseb-|bi-actions|sci-pop|option-btn|sa-input|coef-|bal-|atom-|tracker-)/;

  function clozeEligible(el) {
    if (!el || el.__psebCloze) return false;
    /* Widget scaffolding is instruction, not recall material. Masking a
       walkthrough hint's key words ("balance iron (Fe) first") destroys the
       very hint the student opened it for. Callout headings and progress
       chrome are likewise signposts, not answers. */
    if (el.closest(".pseb-tools, .pseb-rev, .pseb-outline, .sci-pop, .bal-walk, " +
                   ".balancer-eq, .atom-tracker, .pseb-numerical, .pseb-diagram-practice, " +
                   ".board-trap, .pitfall-box, .board-badge, .pyq-tag, .seq-counter, " +
                   ".sub-progress, .rune-row, .bi-actions, .formula-target, " +
                   "button, input, textarea, select")) return false;
    /* Authors can opt a run of prose out explicitly — used on the instruction
       line that introduces an interactive widget. */
    if (el.closest("[data-no-cloze]")) return false;
    var cls = el.getAttribute("class");
    if (cls && CLOZE_SKIP.test(cls)) return false;
    var text = (el.textContent || "").trim();
    /* One-word to short-phrase answers only: masking a whole sentence would
       remove the very context the student needs. */
    if (!text || text.length > 48) return false;
    if (text.split(/\s+/).length > 5) return false;
    /* These decks also use bold for run-in labels ("Raw materials:", "The
       Slope Formula:"). Hiding the label removes the question rather than the
       answer, so anything ending in a colon is left visible. */
    if (/[:：]$/.test(text)) return false;
    /* Bare symbols and operators are UI, not vocabulary: the balancer's
       "Tap + or - to change a number" was being masked into nonsense.
       Require real word content before hiding anything. */
    var letters = text.replace(/[^A-Za-z\u0A00-\u0A7F]/g, "");
    if (letters.length < 2) return false;
    /* An emoji-led run is a callout heading ("\u26A0\uFE0F Board Trap",
       "\uD83D\uDCA1 Word Origins"), never an answer. */
    if (/^[^\w\u0A00-\u0A7F(]/.test(text)) return false;
    /* A heading is the slide's topic, not something to retrieve. */
    if (/^H[1-6]$/.test(el.parentNode && el.parentNode.tagName || "")) return false;
    /* Genuinely interactive or graphical children are left alone. <sci-term>
       is deliberately NOT in this list: sci-term.js binds by delegation on
       document, and the original innerHTML (attributes included) is restored
       on reveal, so the glossary popover keeps working. Excluding it suppressed
       exactly the key terms worth masking — the better a chapter's glossary
       coverage, the more recall it was losing. */
    if (el.querySelector("button, input, textarea, select, img, svg")) return false;
    return true;
  }

  function maskSlide(root) {
    if (!root) return 0;
    var made = 0;
    Array.prototype.forEach.call(root.querySelectorAll(CLOZE_TARGETS), function (el) {
      if (!clozeEligible(el)) return;
      el.__psebCloze = true;
      /* Keep the original markup so reveal is lossless, and freeze the box so
         the layout does not reflow when the mask swaps for the answer. */
      el.setAttribute("data-cloze-html", el.innerHTML);
      el.classList.add("pseb-cloze");
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", "Hidden term, activate to reveal");
      el.textContent = CLOZE_MASK;
      made++;
    });
    return made;
  }

  function revealCloze(el) {
    if (!el || !el.hasAttribute("data-cloze-html")) return;
    el.innerHTML = el.getAttribute("data-cloze-html");
    el.classList.add("is-open");
    el.removeAttribute("role");
    el.removeAttribute("tabindex");
    el.setAttribute("aria-label", "Revealed");
  }

  function unmaskAll() {
    Array.prototype.forEach.call(document.querySelectorAll(".pseb-cloze"), function (el) {
      if (el.hasAttribute("data-cloze-html")) el.innerHTML = el.getAttribute("data-cloze-html");
      el.removeAttribute("data-cloze-html");
      el.removeAttribute("role");
      el.removeAttribute("tabindex");
      el.removeAttribute("aria-label");
      el.classList.remove("pseb-cloze", "is-open");
      el.__psebCloze = false;
    });
  }

  function currentSlideRoot() {
    /* Decks differ: some mark the live slide, others translate a rail. Fall
       back to the slide nearest the middle of the viewport. */
    var active = document.querySelector(".slide.active, .slide.current");
    if (active) return active;
    var slides = document.querySelectorAll(".slide");
    var mid = window.innerWidth / 2, best = null, bestDist = Infinity;
    Array.prototype.forEach.call(slides, function (s) {
      var r = s.getBoundingClientRect();
      if (r.width === 0) return;
      var d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) { bestDist = d; best = s; }
    });
    return best;
  }

  function clearBlur() {
    Array.prototype.forEach.call(document.querySelectorAll(".content-box.pseb-blur"), function (b) {
      b.classList.remove("pseb-blur", "pseb-revealed");
    });
  }
  /* Mask the slide's key terms; if it has none, fall back to blurring the
     whole box so the H key is never a no-op. Returns how many blanks were
     made, so the caller can word the toast correctly. */
  function applyRecallToCurrentSlide() {
    if (!recallOn) return 0;
    var root = currentSlideRoot();
    var made = maskSlide(root);
    if (!made && root) {
      var box = root.querySelector(".content-box");
      if (box) box.classList.add("pseb-blur");
    }
    return made;
  }

  /* A printed handout must contain the actual content, not a page of blanks,
     so masking is lifted for the print render and restored afterwards. */
  window.addEventListener("beforeprint", function () {
    if (recallOn) unmaskAll();
  });
  window.addEventListener("afterprint", function () {
    if (recallOn) applyRecallToCurrentSlide();
  });

  function setRecall(v) {
    recallOn = v;
    document.body.classList.toggle("pseb-recall-on", v);
    var btn = document.getElementById("pseb-recall");
    if (btn) btn.classList.toggle("pseb-bm-on", v);
    if (v) {
      var n = applyRecallToCurrentSlide();
      toast(n ? "Active recall: tap a blank to reveal it"
              : "Active recall: tap the slide to reveal it");
    } else {
      unmaskAll();
      clearBlur();
      toast("Active recall off");
    }
  }
  function toggleRecall() { setRecall(!recallOn); }
  /* Leaving a slide resets its blanks, so returning to it re-tests rather
     than re-showing the answers. */
  function clearRecallReveals() {
    if (!recallOn) return;
    unmaskAll();
    clearBlur();
    applyRecallToCurrentSlide();
  }
  function injectPrintCss() {
    if (document.getElementById("pseb-print-css")) return;
    var l = document.createElement("link");
    l.id = "pseb-print-css";
    l.rel = "stylesheet";
    l.media = "print";
    l.href = ASSET_BASE + "print.css";
    document.head.appendChild(l);
  }
  /* Chemical/mathematical typesetting lives in its own file so a deck that
     wants it gets KaTeX + mhchem without each chapter adding a script tag. */
  function injectChemEngine() {
    if (document.getElementById("pseb-chem-js") || window.PSEBChem) return;
    var s = document.createElement("script");
    s.id = "pseb-chem-js";
    s.src = ASSET_BASE + "deck-chem.js";
    s.defer = true;
    document.head.appendChild(s);
  }
  /* The ray-tracing bench is only meaningful in the optics decks, so it loads
     on demand rather than on every chapter. */
  function injectOpticsEngine() {
    if (document.getElementById("pseb-optics-js") || window.PSEBRayBench) return;
    if (!document.querySelector("[data-pseb-raybench]")) return;
    var s = document.createElement("script");
    s.id = "pseb-optics-js";
    s.src = ASSET_BASE + "deck-optics.js";
    s.defer = true;
    document.head.appendChild(s);
  }
  /* Likewise the animated reaction schematics: chemistry decks only. */
  function injectReactionEngine() {
    if (document.getElementById("pseb-rx-js") || window.PSEBReactions) return;
    if (!document.querySelector("[data-pseb-reaction]")) return;
    var s = document.createElement("script");
    s.id = "pseb-rx-js";
    s.src = ASSET_BASE + "deck-reactions.js";
    s.defer = true;
    document.head.appendChild(s);
  }
  function buildOverlay() {
    var style = document.createElement("style");
    style.textContent =
      "html,body{overscroll-behavior-x:none!important}" +
      ".pseb-tools{position:fixed;top:15px;right:15px;display:flex;gap:7px;z-index:1200;flex-wrap:nowrap;justify-content:flex-end;max-width:calc(50vw - 72px)}" +
      ".pseb-tools button{flex:none;width:38px;height:38px;border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));border-radius:10px;background:var(--deck-panel,rgba(14,14,18,.92));color:var(--deck-aura,#00e5ff);font-size:20px;line-height:1;cursor:pointer;box-shadow:0 12px 28px rgba(0,0,0,.24);transition:background .2s,border-color .2s,color .2s,transform .15s}" +
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
      ".pseb-help{max-height:84vh;overflow-y:auto}" +
      ".pseb-help h4.pseb-help-sub{margin:18px 0 8px;color:#0047BB;font-size:.78rem;font-weight:800;letter-spacing:.09em;text-transform:uppercase}" +
      ".pseb-help h4.pseb-help-sub:first-of-type{margin-top:0}" +
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
      /* ---- Section grouping in the outline ---------------------------- */
      ".pseb-outline-head{display:flex;align-items:center;gap:8px;margin:14px 0 4px;padding:0 4px;font-size:.78rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#0047BB}" +
      ".pseb-outline-head:first-child{margin-top:0}" +
      ".pseb-outline-head::after{content:'';flex:1;height:1px;background:#cbd5e1}" +
      ".pseb-outline-head.hidden{display:none}" +
      ".pseb-outline-mins{order:3;flex:none;color:#64748b;font-weight:700;letter-spacing:.02em;text-transform:none}" +
      /* ---- Sub-topic breadcrumb --------------------------------------- */
      ".pseb-crumb{position:fixed;top:14px;left:16px;z-index:1150;display:flex;align-items:center;gap:7px;" +
        "max-width:min(42vw,520px);padding:7px 14px;border-radius:999px;cursor:pointer;" +
        "background:var(--deck-panel,rgba(14,14,18,.92));border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));" +
        "box-shadow:0 12px 28px rgba(0,0,0,.24);font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif);" +
        "font-size:.82rem;line-height:1.25;color:var(--deck-muted,#9aa7ba);white-space:nowrap;overflow:hidden}" +
      ".pseb-crumb[hidden]{display:none}" +
      ".pseb-crumb:hover{border-color:var(--deck-aura,#00e5ff)}" +
      ".pseb-crumb-ch{flex:none;font-weight:700;color:var(--deck-aura,#00e5ff)}" +
      ".pseb-crumb-sep{flex:none;opacity:.6}" +
      ".pseb-crumb-sec{min-width:0;overflow:hidden;text-overflow:ellipsis;font-weight:700;color:var(--deck-text,#f8fafc);" +
        "font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Segoe UI',system-ui,sans-serif)}" +
      ".pseb-crumb-pos{flex:none;padding:1px 8px;border-radius:999px;background:var(--deck-aura-soft,rgba(0,229,255,.16));" +
        "color:var(--deck-aura,#00e5ff);font-weight:800;font-size:.72rem;font-variant-numeric:tabular-nums}" +
      /* A fixed overlay repeats on every printed page, so the handout keeps
         the milestone banners but drops the floating chrome. */
      "@media print{.pseb-crumb,.pseb-drawer{display:none!important}}" +
      /* ---- Milestone / section-cover banner --------------------------- */
      ".pseb-milestone{display:flex;flex-direction:column;gap:10px;margin:0 0 16px;padding:12px 14px;border-radius:14px;" +
        "background:var(--deck-panel-soft,rgba(255,255,255,.05));border:1px solid var(--deck-border-strong,rgba(255,255,255,.12));" +
        "border-left:5px solid var(--deck-aura,#00e5ff);font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif);text-align:left}" +
      ".pseb-milestone-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}" +
      ".pseb-milestone-badge{display:inline-flex;align-items:center;gap:9px;padding:6px 14px;border-radius:999px;" +
        "background:var(--deck-aura,#00e5ff);color:#050507;font-weight:900;letter-spacing:.09em;text-transform:uppercase;font-size:.7rem}" +
      ".pseb-milestone-name{text-transform:none;letter-spacing:.01em;font-size:.86rem;font-weight:800;" +
        "font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Segoe UI',system-ui,sans-serif)}" +
      ".pseb-milestone-mins{display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:999px;" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));color:var(--deck-muted,#9aa7ba);font-size:.72rem;font-weight:800}" +
      ".pseb-milestone-goals{margin:0;padding-left:1.15em;display:flex;flex-direction:column;gap:5px;" +
        "font-size:.85rem;line-height:1.45;color:var(--deck-muted,#9aa7ba)}" +
      "@media(max-width:600px){.pseb-milestone{padding:10px 11px;gap:8px}.pseb-milestone-badge{font-size:.64rem;padding:5px 11px}" +
        ".pseb-milestone-name{font-size:.78rem}.pseb-milestone-goals{font-size:.78rem}}" +
      /* ---- Mobile overflow drawer ------------------------------------- */
      ".pseb-drawer{position:fixed;top:62px;right:12px;z-index:1250;display:none;width:min(252px,calc(100vw - 24px));" +
        "flex-direction:column;gap:8px;padding:12px;border-radius:14px;background:var(--deck-panel-strong,#141419);" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));box-shadow:0 18px 40px rgba(0,0,0,.4);" +
        "font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif)}" +
      ".pseb-drawer.show{display:flex}" +
      ".pseb-drawer-title{font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--deck-muted,#9aa7ba)}" +
      ".pseb-drawer-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}" +
      ".pseb-drawer-item{display:flex;align-items:center;gap:8px;min-height:44px;padding:8px 10px;border-radius:10px;cursor:pointer;" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.16));background:var(--deck-panel-soft,rgba(255,255,255,.045));" +
        "color:var(--deck-text,#f8fafc);font-size:12px;font-weight:700;font-family:inherit;text-align:left;line-height:1.2}" +
      ".pseb-drawer-item:hover{background:var(--deck-aura-soft,rgba(0,229,255,.16));border-color:var(--deck-aura,#00e5ff)}" +
      ".pseb-drawer-ico{flex:none;width:22px;font-size:16px;text-align:center;color:var(--deck-aura,#00e5ff)}" +
      ".pseb-tools button#pseb-more{font-size:22px;letter-spacing:1px}" +
      ".pseb-tools button#pseb-index{font-size:20px;font-weight:800}" +
      /* Thirteen 38px targets need ~578px of bar, which only exists above about
         1300px. Below that everything non-essential moves into the drawer
         rather than wrapping onto a second row over the slide. */
      "@media(min-width:1300px){.pseb-drawer{display:none!important}.pseb-tools button#pseb-more{display:none}}" +
      "@media(max-width:1299px){.pseb-tools button.pseb-overflow,.pseb-tools button#pseb-coffee{display:none}}" +
      "@media(min-width:769px){.pseb-tools button#pseb-index{display:none}}" +
      ".pseb-timer{position:fixed;bottom:15px;left:15px;z-index:1200;display:none;align-items:center;gap:8px;background:rgba(15,23,42,.9);color:#fff;padding:8px 12px;border-radius:10px;box-shadow:0 3px 10px rgba(0,0,0,.3);font-family:'Segoe UI',system-ui,sans-serif}" +
      ".pseb-timer.show{display:flex}" +
      ".pseb-timer-time{font-variant-numeric:tabular-nums;font-size:1.1rem;font-weight:700;min-width:56px;text-align:center;letter-spacing:.5px}" +
      ".pseb-timer button{width:28px;height:28px;border:none;border-radius:6px;background:rgba(255,255,255,.15);color:#fff;font-size:.9rem;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:background .15s}" +
      ".pseb-timer button:hover{background:rgba(255,255,255,.3)}" +
      ".pseb-tools button.pseb-bm-on{background:#FF5C00}" +
      ".pseb-outline-star{margin-left:auto;color:#FF5C00;font-size:1rem;flex:none}" +
      ".pseb-toast{position:fixed;bottom:66px;left:50%;transform:translateX(-50%) translateY(10px);background:rgba(15,23,42,.95);color:#fff;padding:10px 18px;border-radius:10px;font-family:'Segoe UI',system-ui,sans-serif;font-size:14px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:1400}" +
      ".pseb-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}" +
      /* ---- Active recall: cloze deletion --------------------------------
         Blurring the whole slide hid the context too, so the student had
         nothing to reason from and just switched it off again. Instead each
         key term becomes an individually tappable blank, and the sentence
         around it stays perfectly readable. */
      ".pseb-cloze{display:inline-block;cursor:pointer;border-radius:6px;padding:0 .35em;" +
        "background:var(--deck-aura-soft,rgba(0,229,255,.16));border-bottom:2px dashed var(--deck-aura,#00e5ff);" +
        "color:var(--deck-aura,#00e5ff);font-weight:700;font-family:inherit;font-size:inherit;line-height:inherit;" +
        "-webkit-tap-highlight-color:transparent;transition:background .18s,color .18s}" +
      ".pseb-cloze:hover{background:var(--deck-warn,#ffaa00);color:#080808}" +
      ".pseb-cloze:focus-visible{outline:2px solid var(--deck-warn,#ffaa00);outline-offset:2px}" +
      /* Revealed: fade the real term back in, in place. */
      ".pseb-cloze.is-open{background:transparent;border-bottom-color:transparent;color:inherit;" +
        "font-weight:inherit;padding:0;cursor:default;animation:psebClozeIn .28s ease-out}" +
      "@keyframes psebClozeIn{from{opacity:0;filter:blur(3px)}to{opacity:1;filter:none}}" +
      "@media (prefers-reduced-motion:reduce){.pseb-cloze.is-open{animation:none}}" +
      /* Fallback for slides with no maskable key terms. Before cloze deletion
         existed, active recall simply blurred the whole box; decks that mark
         up few bold terms (Ch 6, 14, 16) would otherwise get nothing at all
         from the H key, which is a loss of capability. Cloze when we can,
         blur when we cannot — H always does something. */
      ".pseb-recall-on .content-box.pseb-blur{filter:blur(7px);cursor:pointer;transition:filter .2s;-webkit-user-select:none;user-select:none}" +
      ".pseb-recall-on .content-box.pseb-blur.pseb-revealed{filter:none;-webkit-user-select:auto;user-select:auto}" +
      ".pseb-recall-hint{position:fixed;top:62px;left:50%;transform:translateX(-50%);background:rgba(255,92,0,.95);color:#fff;padding:6px 14px;border-radius:99px;font-family:'Segoe UI',system-ui,sans-serif;font-size:13px;font-weight:700;z-index:1200;display:none;box-shadow:0 3px 10px rgba(0,0,0,.25)}" +
      ".pseb-recall-on .pseb-recall-hint{display:block}" +
      "@media(max-width:768px){.pseb-tools{flex-wrap:nowrap;justify-content:flex-end;max-width:calc(100vw - 20px);gap:6px}.pseb-tools button{width:38px;height:38px;font-size:18px}.pseb-tools button#pseb-font{font-size:16px}.pseb-font-pop{width:200px}" +
      /* Step 4.1: keep only Index / Language / Recall / Outline / More on the
         bar so it stays a single row at 375px with no horizontal scroll. */
      ".pseb-tools button.pseb-overflow{display:none}" +
      "a.pseb-index-pill{display:none!important}" +
      ".pseb-crumb{top:56px;left:10px;right:10px;max-width:none;padding:5px 11px;font-size:.74rem;gap:6px}" +
      ".pseb-crumb-pos{font-size:.68rem;padding:1px 7px}" +
      ".side-nav{top:auto!important;bottom:14px!important;transform:none!important;height:48px!important;min-width:96px!important;width:auto!important;padding:0 18px!important;font-size:1rem!important;font-weight:800!important;font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif)!important;letter-spacing:.3px;display:flex!important;align-items:center;justify-content:center;gap:6px;opacity:1!important;z-index:160!important;background:var(--deck-aura,#00e5ff)!important;color:#050507!important;border:1px solid var(--deck-aura,#00e5ff)!important;border-radius:12px!important;box-shadow:0 10px 24px var(--deck-aura-soft,rgba(0,229,255,.16))!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;transition:transform .12s,background .2s,border-color .2s,color .2s!important}" +
      ".side-nav::after{font-size:.62rem;font-weight:700;letter-spacing:.6px;opacity:.95}" +
      ".left-nav::after{content:'BACK'}.right-nav::after{content:'NEXT'}" +
      ".side-nav:active:not(:disabled){transform:scale(.94)!important;background:var(--deck-warn,#ffaa00)!important;border-color:var(--deck-warn,#ffaa00)!important;color:#050507!important;box-shadow:0 8px 20px rgba(0,0,0,.3)!important}" +
      ".side-nav:hover:not(:disabled){background:var(--deck-aura,#00e5ff)!important;color:#050507!important;transform:none!important;box-shadow:0 10px 24px var(--deck-aura-soft,rgba(0,229,255,.16))!important}" +
      ".side-nav:disabled{opacity:.32!important;pointer-events:none}" +
      ".left-nav{left:14px!important;right:auto!important}.right-nav{right:14px!important;left:auto!important}" +
      ".slide-counter{top:12px!important;bottom:auto!important;left:12px!important;right:auto!important;z-index:150!important;font-size:.95rem!important;padding:7px 12px!important}}" +
      /* 320–400px: five 38px targets plus the counter no longer fit on one
         row, so tighten the targets rather than let the bar wrap. */
      "@media(max-width:400px){.pseb-tools{gap:5px;right:10px}.pseb-tools button{width:36px;height:36px;font-size:17px}" +
      ".slide-counter{font-size:.85rem!important;padding:6px 10px!important}" +
      ".pseb-crumb{top:52px;font-size:.7rem}}";
    document.head.appendChild(style);

    var tools = document.createElement("div");
    tools.className = "pseb-tools";
    tools.innerHTML =
      '<button type="button" id="pseb-index" title="Back to chapter index" aria-label="Back to chapter index">\u2190</button>' +
      '<button type="button" id="pseb-lang" title="Reading language \u00b7 \u0a2a\u0a5c\u0a4d\u0a39\u0a3e\u0a08 \u0a26\u0a40 \u0a2d\u0a3e\u0a38\u0a3c\u0a3e (L)" aria-label="Reading language">\u0a2a\u0a70</button>' +
      '<button type="button" id="pseb-rev" class="pseb-overflow" title="Quick Revision flashcards (R)" aria-label="Quick Revision flashcards">\u26A1</button>' +
      '<button type="button" id="pseb-outline" title="Slide outline (O)" aria-label="Slide outline">\u2630</button>' +
      '<button type="button" id="pseb-bookmark" class="pseb-overflow" title="Bookmark this slide (B)" aria-label="Bookmark this slide">\u2606</button>' +
      '<button type="button" id="pseb-recall" title="Active recall: hide answers (H)" aria-label="Active recall mode">\u25C9</button>' +
      '<button type="button" id="pseb-print" class="pseb-overflow" title="Print / save as PDF (P)" aria-label="Print or save as PDF">\u2399</button>' +
      '<button type="button" id="pseb-timer-btn" class="pseb-overflow" title="Presenter timer (T)" aria-label="Presenter timer">\u23F1</button>' +
      '<button type="button" id="pseb-fs" class="pseb-overflow" title="Fullscreen (F)" aria-label="Toggle fullscreen">\u26F6</button>' +
      '<button type="button" id="pseb-theme" class="pseb-overflow" title="Colorway (C)" aria-label="Colorway">\u25CF</button>' +
      '<button type="button" id="pseb-font" class="pseb-overflow" title="Text size (\u2212 / +)" aria-label="Text size">A</button>' +
      '<button type="button" id="pseb-help-btn" class="pseb-overflow" title="Keyboard shortcuts (?)" aria-label="Keyboard shortcuts">?</button>' +
      '<button type="button" id="pseb-memcard" class="pseb-overflow" title="Memory card \u00b7 switch learner profile" aria-label="Memory card: switch learner profile" aria-haspopup="dialog">\uD83D\uDCBE</button>' +
      '<button type="button" id="pseb-more" title="More actions" aria-label="More actions" aria-expanded="false">\u22EF</button>';
    document.body.appendChild(tools);
    refreshDeckChrome();

    /* The inline "← Index" pill each deck ships is centred in the top bar,
       which is exactly where the breadcrumb and the clustered tools need to
       be on a phone. Mirror it as a toolbar button and hide the pill there. */
    var indexLink = document.querySelector('body > a[href*="index.html"]');
    if (indexLink) indexLink.classList.add("pseb-index-pill");
    document.getElementById("pseb-index").addEventListener("click", function () {
      location.href = indexLink ? indexLink.getAttribute("href") : "../index.html";
    });

    /* ---- Memory card (assets/memory-card.js) ---------------------------- */
    var memBtn = document.getElementById("pseb-memcard");
    if (window.BOLO_MEMCARD_UI) {
      var memSlot = window.BOLO_MEMCARD.getActiveSlot();
      if (memSlot.meta) memBtn.title = "Memory card \u00b7 Slot " + memSlot.id + ": " + memSlot.meta.name;
      memBtn.addEventListener("click", function () { window.BOLO_MEMCARD_UI.open(); });
    } else {
      memBtn.parentNode.removeChild(memBtn);
    }

    /* ---- Sub-topic breadcrumb ------------------------------------------- */
    var crumb = document.createElement("nav");
    crumb.id = "pseb-crumb";
    crumb.className = "pseb-crumb";
    crumb.hidden = true;
    crumb.innerHTML =
      '<span class="pseb-crumb-ch"></span>' +
      '<span class="pseb-crumb-sep" aria-hidden="true">\u203a</span>' +
      '<span class="pseb-crumb-sec"></span>' +
      '<span class="pseb-crumb-pos"></span>';
    crumb.addEventListener("click", function () { if (window.__psebOpenOutline) window.__psebOpenOutline(); });
    crumb.title = "Jump to a section (O)";
    document.body.appendChild(crumb);
    buildSections();
    buildMilestones();
    refreshCrumb();

    /* ---- Mobile overflow drawer -----------------------------------------
       Eleven icons wrapped onto three rows on a 375px phone and covered the
       slide. Below 768px only the five tools a student uses *while studying*
       stay on the bar; the presentation tools move in here. */
    var drawer = document.createElement("div");
    drawer.className = "pseb-drawer";
    drawer.setAttribute("role", "menu");
    drawer.setAttribute("aria-label", "More actions");
    drawer.innerHTML =
      '<div class="pseb-drawer-title">More actions</div>' +
      '<div class="pseb-drawer-grid"></div>';
    document.body.appendChild(drawer);

    var drawerGrid = drawer.querySelector(".pseb-drawer-grid");
    var DRAWER_SPEC = [
      ["pseb-rev", "\u26A1", "Quick Revision"],
      ["pseb-bookmark", "\u2606", "Bookmark"],
      ["pseb-timer-btn", "\u23F1", "Timer"],
      ["pseb-theme", "\u25CF", "Colorway"],
      ["pseb-font", "A", "Text size"],
      ["pseb-print", "\u2399", "Print / PDF"],
      ["pseb-fs", "\u26F6", "Fullscreen"],
      ["pseb-help-btn", "?", "Shortcuts"],
      ["pseb-memcard", "\uD83D\uDCBE", "Memory Card"],
      ["pseb-coffee", "\u2615", "Support"]
    ];
    /* Rebuilt on open because other modules (the coffee button) dock into the
       toolbar asynchronously and must not be stranded off-screen. */
    function fillDrawer() {
      drawerGrid.innerHTML = "";
      DRAWER_SPEC.forEach(function (spec) {
        var target = document.getElementById(spec[0]);
        if (!target) return;
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pseb-drawer-item";
        b.innerHTML = '<span class="pseb-drawer-ico">' + spec[1] + "</span><span>" + spec[2] + "</span>";
        b.addEventListener("click", function () {
          showDrawer(false);
          /* The font popover anchors to the toolbar button, which is hidden
             here, so let the drawer close before it opens. */
          setTimeout(function () { target.click(); }, 0);
        });
        drawerGrid.appendChild(b);
      });
    }

    function showDrawer(v) {
      var open = v == null ? !drawer.classList.contains("show") : v;
      if (open) fillDrawer();
      drawer.classList.toggle("show", open);
      var mb = document.getElementById("pseb-more");
      if (mb) mb.setAttribute("aria-expanded", open ? "true" : "false");
    }
    document.getElementById("pseb-more").addEventListener("click", function (e) {
      e.stopPropagation();
      showDrawer();
    });
    drawer.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { showDrawer(false); });
    window.__psebDrawerClose = function () { showDrawer(false); };

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
      lsSet(FONTSCALE_KEY, String(v));
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
    /* A phone has no arrow keys, so a list of keystrokes is useless there —
       and a laptop user does not need to be told about swiping. Show the set
       that actually applies to the device in front of the student. */
    var touchDevice = ("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0;
    var gestureHtml =
      '<h4 class="pseb-help-sub">Touch gestures</h4>' +
      '<dl>' +
        '<dt>\u2190 Swipe</dt><dd>Next slide</dd>' +
        '<dt>Swipe \u2192</dt><dd>Previous slide</dd>' +
        '<dt>Double-tap</dt><dd>Active recall (hide / reveal)</dd>' +
        '<dt>Tap \u22EF</dt><dd>Timer, colorway, text size, print</dd>' +
        '<dt>Tap breadcrumb</dt><dd>Jump to another sub-topic</dd>' +
        '<dt>Swipe up / down</dt><dd>Scroll the slide normally</dd>' +
      '</dl>';
    var keyHtml =
      '<h4 class="pseb-help-sub">Keyboard shortcuts</h4>' +
      '<dl>' +
        '<dt>\u2190 \u2192</dt><dd>Previous / next slide</dd>' +
        '<dt>Home</dt><dd>First slide</dd>' +
        '<dt>End</dt><dd>Last slide</dd>' +
        '<dt>O</dt><dd>Slide outline / search / jump</dd>' +
        '<dt>[  ]</dt><dd>Previous / next sub-topic</dd>' +
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
      '</dl>';
    back.innerHTML =
      '<div class="pseb-help">' +
        '<h3>How to move around</h3>' +
        (touchDevice ? gestureHtml + keyHtml : keyHtml) +
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
    var oGroups = [];

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
      /* A section heading is only useful while at least one of its slides is
         still on screen, otherwise filtering leaves orphaned headers. */
      oGroups.forEach(function (g) {
        var any = g.items.some(function (it) { return !it.btn.classList.contains("hidden"); });
        g.head.classList.toggle("hidden", !any);
      });
      oEmpty.style.display = shown ? "none" : "block";
    }
    function openOutline() {
      var list = oBack.querySelector(".pseb-outline-list");
      list.innerHTML = "";
      oItems = [];
      oGroups = [];
      buildSections();
      var slides = document.querySelectorAll(".slide");
      var cur = currentIndex();
      var group = null;
      Array.prototype.forEach.call(slides, function (s, i) {
        var sec = sectionMap && sectionMap[i];
        if (sec && (!group || group.sec !== sec)) {
          var head = document.createElement("div");
          head.className = "pseb-outline-head";
          head.textContent = sectionTitle(sec);
          if (sec.mins) {
            var mins = document.createElement("span");
            mins.className = "pseb-outline-mins";
            mins.textContent = "~" + sec.mins + " min";
            head.appendChild(mins);
          }
          list.appendChild(head);
          group = { sec: sec, head: head, items: [] };
          oGroups.push(group);
        }
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
        var item = { btn: b, index: i, title: title, text: (s.textContent || "").replace(/\s+/g, " ").toLowerCase() };
        oItems.push(item);
        if (group) group.items.push(item);
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
    recallHint.textContent = "Active recall \u2014 tap a blank to reveal it \u00b7 H to reset";
    document.body.appendChild(recallHint);

    document.getElementById("pseb-bookmark").addEventListener("click", doToggleBookmark);
    document.getElementById("pseb-recall").addEventListener("click", toggleRecall);
    document.getElementById("pseb-rev").addEventListener("click", function () { if (window.__psebRevToggle) window.__psebRevToggle(); });
    document.addEventListener("click", function (e) {
      if (!recallOn) return;
      var blurred = e.target && e.target.closest ? e.target.closest(".content-box.pseb-blur") : null;
      if (blurred && !blurred.classList.contains("pseb-revealed")) {
        blurred.classList.add("pseb-revealed");
        return;
      }
      var blank = e.target && e.target.closest ? e.target.closest(".pseb-cloze") : null;
      if (!blank || blank.classList.contains("is-open")) return;
      /* Revealing a blank must not also trigger whatever sits underneath. */
      e.preventDefault();
      e.stopPropagation();
      revealCloze(blank);
    }, true);
    document.addEventListener("keydown", function (e) {
      if (!recallOn) return;
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      var blank = document.activeElement && document.activeElement.closest
        ? document.activeElement.closest(".pseb-cloze")
        : null;
      if (!blank || blank.classList.contains("is-open")) return;
      e.preventDefault();
      revealCloze(blank);
    });
    refreshBookmarkBtn();
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildOverlay();
    injectChemEngine();
    injectOpticsEngine();
    injectReactionEngine();
    enhanceInteractives();
    enhanceFlagshipLabs();
    initBiReadings();
    installQuizEnhancements();
    applyA11y();
    patchSpeakWord();

    var counter = document.getElementById("counter");
    if (counter && "MutationObserver" in window) {
      var obs = new MutationObserver(function () {
        var c = parseCounter();
        if (c) saveSlide(c.cur, c.total);
        refreshBookmarkBtn();
        refreshCrumb();
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
      else if (e.key === "[") { e.preventDefault(); jumpSection(-1); }
      else if (e.key === "]") { e.preventDefault(); jumpSection(1); }
      else if (e.key === "Home" && canNavigate()) { e.preventDefault(); jumpTo(0); }
      else if (e.key === "End" && canNavigate()) { e.preventDefault(); jumpTo(totalSlides() - 1); }
    });


    /* ==== Touch navigation ==================================================
       Every deck ships its own swipe handler, but they differ and some decks
       lack one. This shared layer is deliberately *deferred*: it records the
       slide index at touchstart and only acts if the deck's own handler has
       not already moved on by the time the gesture settles, so a deck with
       swipe keeps exactly one handler and a deck without one gains it. */
    (function installTouchNav() {
      var touchable = ("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0;
      if (!touchable) return;

      var SWIPE_MIN = 50;
      var sx = 0, sy = 0, startIdx = 0, tracking = false;
      var lastTap = 0, lastX = 0, lastY = 0;

      /* Scrollable panels, drills and form controls own their own gestures. */
      var GUARD = ".sub-slider-container,.balancer-panel,.ph-tool,.bohr-app,.reading-box," +
        ".classifier-panel,.pseb-outline,.pseb-help,.pseb-drawer,.pseb-rev-card," +
        "input,textarea,select,button,a,[data-chem-state='katex'],.ray-stage";

      function guarded(target) {
        return !!(target && target.closest && target.closest(GUARD));
      }

      document.addEventListener("touchstart", function (e) {
        if (e.touches.length !== 1) { tracking = false; return; }
        var t = e.changedTouches[0];
        sx = t.screenX; sy = t.screenY;
        startIdx = currentIndex();
        tracking = true;
      }, { passive: true });

      document.addEventListener("touchend", function (e) {
        if (!tracking) return;
        tracking = false;
        var t = e.changedTouches[0];
        var dx = t.screenX - sx, dy = t.screenY - sy;

        /* Double-tap anywhere neutral toggles active recall — the one study
           control a student reaches for constantly on a phone. */
        if (Math.abs(dx) < 16 && Math.abs(dy) < 16) {
          var now = Date.now();
          if (now - lastTap < 320 && Math.abs(t.screenX - lastX) < 40 && Math.abs(t.screenY - lastY) < 40) {
            lastTap = 0;
            if (!guarded(e.target)) { toggleRecall(); }
            return;
          }
          lastTap = now; lastX = t.screenX; lastY = t.screenY;
          return;
        }

        if (Math.abs(dy) > Math.abs(dx)) return;      /* vertical scroll */
        if (Math.abs(dx) < SWIPE_MIN) return;
        if (guarded(e.target)) return;
        if (!canNavigate()) return;

        var dir = dx < 0 ? 1 : -1;
        /* Let the deck's own listener go first; only step in if nothing moved. */
        setTimeout(function () {
          if (currentIndex() !== startIdx) return;
          if (window.__psebDrawerClose) window.__psebDrawerClose();
          jumpTo(startIdx + dir);
        }, 0);
      }, { passive: true });
    })();

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
  /* Voice lists populate asynchronously and are empty in some browsers.
     Match on the language prefix only — a substring match would happily
     return an unrelated locale. */
  function pickVoice(lang) {
    if (!biVoices.length) loadBiVoices();
    var pref = lang === "pa" ? ["pa-in", "pa_in", "pa-", "pa"] : ["en-in", "en-gb", "en-us", "en-", "en"];
    for (var p = 0; p < pref.length; p++) {
      for (var i = 0; i < biVoices.length; i++) {
        var vl = (biVoices[i].lang || "").toLowerCase().replace("_", "-");
        if (vl === pref[p] || vl.indexOf(pref[p] + "-") === 0 || vl.indexOf(pref[p]) === 0) return biVoices[i];
      }
    }
    return null;
  }
  function speechReady() {
    return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";
  }
  function biStop() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    document.querySelectorAll(".bi-listen.is-speaking").forEach(function (b) {
      b.classList.remove("is-speaking");
      b.textContent = b.getAttribute("data-idle") || b.textContent;
    });
  }
  function biSpeak(box, btn) {
    if (!speechReady()) { toast("Text-to-speech is not available in this browser"); return; }
    biStop();
    var enShown = box.classList.contains("show-en");
    var el = box.querySelector(enShown ? ".bi-en" : ".bi-pa");
    if (!el) return;
    var lang = enShown ? "en" : "pa";
    var text = (el.innerText || el.textContent || "").trim();
    if (!text) return;
    var voice = pickVoice(lang);
    /* No Punjabi voice installed (common on desktop and older Android):
       handing Gurmukhi text to an English engine produces silence or
       spelled-out nonsense, and often never fires onend — which is what
       used to leave the button stuck on "speaking". Stop before that. */
    if (lang === "pa" && !voice) {
      toast("No Punjabi voice on this device \u2014 switch to English to listen");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    } catch (e) {}
    var sentences = (text.match(/[^.!?।]+[.!?।]*/g) || [text]).map(function (s) { return s.trim(); }).filter(Boolean);
    var i = 0;
    if (!btn.getAttribute("data-idle")) btn.setAttribute("data-idle", btn.textContent);
    btn.classList.add("is-speaking");
    btn.textContent = "🔊 …";
    function next() {
      if (i >= sentences.length) { biStop(); return; }
      var advanced = false;
      function step() { if (advanced) return; advanced = true; i++; next(); }
      try {
        var u = new SpeechSynthesisUtterance(sentences[i]);
        u.lang = voice && voice.lang ? voice.lang : (enShown ? "en-IN" : "pa-IN");
        if (voice) u.voice = voice;
        u.rate = 0.9;
        u.onend = step;
        u.onerror = step;
        /* Watchdog: a sentence that never reports back must not strand the
           reader on the current sentence forever. */
        setTimeout(step, Math.min(30000, 3000 + sentences[i].length * 130));
        window.speechSynthesis.speak(u);
      } catch (e) {
        biStop();
      }
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
    var v = lsGet(LANG_KEY) || "";
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
    lsSet(LANG_KEY, toEn ? "en" : "pa");
    var b = document.getElementById("pseb-lang");
    if (b) {
      b.textContent = toEn ? "EN" : "\u0a2a\u0a70";
      b.title = toEn
        ? "Readings: English \u2014 switch to \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 (L)"
        : "Readings: \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 \u2014 switch to English (L)";
    }
    if (announce) toast(toEn ? "Readings in English" : "\u0a2a\u0a5c\u0a4d\u0a39\u0a3e\u0a08 \u0a39\u0a41\u0a23 \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40 \u0a35\u0a3f\u0a71\u0a1a (Readings in Punjabi)");
    /* The breadcrumb and the milestone banners name the sub-topic, so they
       follow the reading language too. */
    refreshCrumb();
    buildMilestones();
    /* Widgets with their own bilingual labels relabel themselves from here. */
    try { document.dispatchEvent(new CustomEvent("pseb:lang", { detail: { lang: toEn ? "en" : "pa" } })); }
    catch (e) {}
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
    if (pa) h += '<div class="qf-explain-pa punjabi-block" lang="pa">' + pa + "</div>";
    return h + "</div>";
  }
  /* Resolve the pieces of one quiz item from the button that was pressed.

     Most quizzes live inside a .sub-slide carousel, but the Case Study slides
     put their options straight into the content box with no .sub-slide at all.
     The old code gave up when .sub-slide was missing, so those ten questions
     across Chapters 1-5 silently did nothing when a student tapped an answer.

     Buttons are scoped to their own option group rather than to the whole
     content box, so a slide carrying two quizzes cannot disable both at once. */
  function qfScope(btn) {
    if (!btn || !btn.closest) return null;
    var sub = btn.closest(".sub-slide");
    if (sub) {
      return {
        meta: sub,
        buttons: sub.querySelectorAll(".option-btn"),
        feedback: sub.querySelector(".feedback"),
        next: sub.querySelector(".next-sub-btn"),
        input: sub.querySelector(".sa-input"),
        find: sub
      };
    }
    var box = btn.closest(".content-box") || btn.closest(".slide");
    if (!box) return null;
    var group = btn.closest(".tf-grid") || btn.parentElement || box;
    /* Prefer the .feedback that follows this group; fall back to the box's. */
    var fb = null, n = group ? group.nextElementSibling : null;
    while (n && !fb) {
      if (n.classList && n.classList.contains("feedback")) fb = n;
      n = n.nextElementSibling;
    }
    if (!fb) fb = box.querySelector(".feedback");
    return {
      meta: box,
      buttons: group.querySelectorAll ? group.querySelectorAll(".option-btn") : [],
      feedback: fb,
      next: box.querySelector(".next-sub-btn"),
      input: box.querySelector(".sa-input"),
      find: group.querySelectorAll ? group : box
    };
  }

  function enhancedCheckAnswer(btn, isCorrect, isMCQ) {
    var s = qfScope(btn);
    if (!s) return;
    var qDiv = s.meta;
    var feedback = s.feedback;
    var nextBtn = s.next;
    var buttons = s.buttons;
    for (var i = 0; i < buttons.length; i++) buttons[i].disabled = true;
    var correctBtn = qfFindCorrectBtn(s.find);
    if (isCorrect) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
      if (correctBtn) correctBtn.classList.add("correct");
    }
    var h = '<div class="quiz-feedback ' + (isCorrect ? "is-correct" : "is-incorrect") + '">';
    h += '<div class="qf-status">' + (isCorrect
      ? '\u2713 Correct <span class="qf-pa" lang="pa">(ਸਹੀ)</span>'
      : '\u2717 Incorrect <span class="qf-pa" lang="pa">(ਗਲਤ)</span>') + "</div>";
    if (!isCorrect && correctBtn) {
      var ct = (correctBtn.textContent || "").trim();
      h += '<div class="qf-answer">Correct answer <span class="qf-pa" lang="pa">(ਸਹੀ ਜਵਾਬ)</span>: <strong>' + ct + "</strong></div>";
    }
    h += qfExplainHtml(qDiv) + "</div>";
    if (feedback) feedback.innerHTML = h;
    if (nextBtn) nextBtn.style.display = "block";
    recordQuiz(qDiv, !!isCorrect, correctBtn ? (correctBtn.textContent || "").replace(/\s+/g, " ").trim() : "", "");
  }
  /* ---- Short-answer grading ----------------------------------------------
     The original rule was `typed.toLowerCase() === expected.toLowerCase()`.
     That is fine for "Methane", but 30 of the 401 short answers expect four or
     more words — "Blue colour fades and reddish-brown copper deposits" — and
     nobody types those verbatim. A student who knew the answer was told
     "Not quite", which is both wrong and discouraging.

     Grading now normalises both sides, then:
       * short answers (<= 3 content words) must still match, but survive
         punctuation, plurals, "&" vs "and" and a single-character typo;
       * longer answers are scored on content-word overlap, so a correct
         answer phrased differently is accepted while a wrong one is not. */

  var SA_STOP = {
    a: 1, an: 1, the: 1, of: 1, to: 1, in: 1, on: 1, at: 1, is: 1, are: 1, was: 1,
    and: 1, or: 1, it: 1, its: 1, that: 1, this: 1, with: 1, for: 1, by: 1, from: 1,
    as: 1, be: 1, into: 1, gives: 1, give: 1, forms: 1, form: 1, produces: 1,
    produce: 1, yields: 1, yield: 1, makes: 1, make: 1, called: 1, they: 1, them: 1
  };

  function saNormalise(v) {
    var s = " " + String(v == null ? "" : v).toLowerCase() + " ";
    /* Unicode that students cannot easily type. */
    s = s.replace(/[\u2080-\u2089]/g, function (c) { return String(c.charCodeAt(0) - 0x2080); });
    s = s.replace(/[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]/g, function (c) {
      return "\u00b9\u00b2\u00b3".indexOf(c) >= 0 ? String("\u00b9\u00b2\u00b3".indexOf(c) + 1) : String(c.charCodeAt(0) - 0x2070);
    });
    s = s.replace(/[\u2192\u27f6]|-+>/g, " ");
    s = s.replace(/&/g, " and ").replace(/\+/g, " and ");
    s = s.replace(/[^a-z0-9\u0a00-\u0a7f]+/g, " ");
    return s.replace(/\s+/g, " ").trim();
  }

  function saTokens(v) {
    var out = [], parts = saNormalise(v).split(" ");
    for (var i = 0; i < parts.length; i++) {
      var w = parts[i];
      if (!w || SA_STOP[w]) continue;
      /* Treat simple plurals as the same word. */
      if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) w = w.slice(0, -1);
      out.push(w);
    }
    return out;
  }

  /* One insertion, deletion or substitution apart. */
  function saNearlyEqual(a, b) {
    if (a === b) return true;
    if (Math.abs(a.length - b.length) > 1) return false;
    if (Math.min(a.length, b.length) < 5) return false;
    var i = 0, j = 0, edits = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++edits > 1) return false;
      if (a.length > b.length) i++;
      else if (b.length > a.length) j++;
      else { i++; j++; }
    }
    return edits + (a.length - i) + (b.length - j) <= 1;
  }

  function gradeShortAnswer(typed, expected) {
    var t = saNormalise(typed), e = saNormalise(expected);
    if (!t) return false;
    if (t === e) return true;

    /* "Rust (hydrated iron oxide)" — the parenthetical is elaboration. */
    var bare = String(expected || "").replace(/\s*\([^)]*\)\s*/g, " ");
    if (saNormalise(bare) && t === saNormalise(bare)) return true;

    var et = saTokens(expected), ut = saTokens(typed);
    if (!et.length || !ut.length) return false;

    if (et.length <= 3) {
      if (et.length !== ut.length) {
        /* Allow the bare key term for an answer like "the generator". */
        if (!(et.length === 1 && ut.length === 1)) return false;
      }
      for (var i = 0; i < et.length; i++) {
        if (!saNearlyEqual(et[i], ut[i] || "")) return false;
      }
      return true;
    }

    /* Longer answers: Dice overlap on content words. 0.6 accepts a genuine
       rephrasing while still rejecting a different concept ("nuclear fusion"
       against "nuclear fission" scores 0.5). */
    var hits = 0, used = {};
    for (var a = 0; a < et.length; a++) {
      for (var b = 0; b < ut.length; b++) {
        if (used[b]) continue;
        if (saNearlyEqual(et[a], ut[b])) { used[b] = 1; hits++; break; }
      }
    }
    return (2 * hits) / (et.length + ut.length) >= 0.6;
  }
  window.__psebGradeSA = gradeShortAnswer;

  function enhancedCheckSA(btn, expectedEn, expectedPa) {
    var s = qfScope(btn);
    if (!s) return;
    var qDiv = s.meta;
    var input = s.input;
    var feedback = s.feedback;
    var nextBtn = s.next;
    var typed = input && input.value ? input.value : "";
    var ok = gradeShortAnswer(typed, expectedEn || "");
    if (input) input.disabled = true;
    btn.disabled = true;
    var h = '<div class="quiz-feedback ' + (ok ? "is-correct" : "is-incorrect") + '">';
    h += '<div class="qf-status">' + (ok
      ? '\u2713 Correct <span class="qf-pa" lang="pa">(ਸਹੀ)</span>'
      : '\u2717 Not quite <span class="qf-pa" lang="pa">(ਲਗਭਗ)</span>') + "</div>";
    h += '<div class="qf-answer">' + (ok ? "Answer" : "Expected answer") +
      ' <span class="qf-pa" lang="pa">(ਜਵਾਬ)</span>: <strong>' + (expectedEn || "") + "</strong></div>";
    if (expectedPa) h += '<div class="qf-answer-pa punjabi-block" lang="pa">' + expectedPa + "</div>";
    h += qfExplainHtml(qDiv) + "</div>";
    if (feedback) feedback.innerHTML = h;
    if (nextBtn) nextBtn.style.display = "block";
    recordQuiz(qDiv, ok, expectedEn || "", expectedPa || "");
  }
  function installQuizEnhancements() {
    window.checkAnswer = enhancedCheckAnswer;
    window.checkSA = enhancedCheckSA;
  }

  /* ==== Accessibility pass ================================================
     Applied at runtime so every chapter benefits without touching 16 files.

       * A short-answer box announced as "edit text, blank" tells a screen
         reader user nothing. Name it from its own question.
       * Gurmukhi inside an lang="en" document is read out by an English
         voice, which is unintelligible. Mark it lang="pa".
       * An icon inside a button that already has a visible caption is
         decorative; describing its vector paths just doubles the noise. */
  function applyA11y(root) {
    root = root || document;

    var inputs = root.querySelectorAll(".sa-input");
    for (var i = 0; i < inputs.length; i++) {
      var inp = inputs[i];
      if (!inp.getAttribute("placeholder")) {
        inp.setAttribute("placeholder", "Type your answer \u00b7 \u0a1c\u0a35\u0a3e\u0a2c \u0a32\u0a3f\u0a16\u0a4b");
      }
      if (inp.getAttribute("aria-label") || inp.getAttribute("aria-labelledby")) continue;
      var scope = inp.closest(".sub-slide") || inp.closest(".content-box");
      var q = scope ? scope.querySelector(".question-text") : null;
      var label = q ? (q.textContent || "").replace(/\s+/g, " ").trim() : "";
      inp.setAttribute("aria-label", label ? "Answer: " + label.slice(0, 120) : "Your answer");
    }

    var pa = root.querySelectorAll(".punjabi, .punjabi-block, .punjabi-text");
    for (var p = 0; p < pa.length; p++) {
      if (!pa[p].getAttribute("lang")) pa[p].setAttribute("lang", "pa");
    }

    var svgs = root.querySelectorAll("svg");
    for (var s = 0; s < svgs.length; s++) {
      var svg = svgs[s];
      if (svg.getAttribute("aria-hidden") || svg.getAttribute("aria-label") ||
          svg.getAttribute("role") || svg.querySelector("title")) continue;
      var host = svg.parentElement;
      /* Safe to hide when the control already has a visible name, or when the
         graphic is pure shapes: a screen reader can say nothing useful about
         bare paths, and reading them aloud is pure noise. The deck's own
         diagrams set aria-label or contain <text>, so they are left alone. */
      var namedHost = host && /^(BUTTON|A|LABEL)$/.test(host.tagName) &&
        (host.textContent || "").replace(/\s+/g, "").length;
      if (namedHost || !svg.querySelector("text")) {
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
      }
    }
  }

  // ==== Quiz score tracking =================================================
  // Every MCQ / True-False / Short-Answer result is tallied per chapter in
  // SCORE_KEY. Missed questions are remembered (and cleared once answered
  // correctly) so Quick Revision can put them first. Finishing a quiz shows a
  // score toast.
  function readScores() {
    return lsGetJSON(SCORE_KEY);
  }
  function writeScores(s) {
    return lsSetJSON(SCORE_KEY, s);
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
      /* Progress: mastered vs. total for the session. */
      ".pseb-rev-progress{display:flex;flex-direction:column;gap:5px}" +
      ".pseb-rev-progress-labels{display:flex;justify-content:space-between;font-size:.82rem;font-weight:700;color:#475569;letter-spacing:.02em}" +
      ".pseb-rev-progress-bar{height:8px;border-radius:99px;background:#e2e8f0;overflow:hidden}" +
      ".pseb-rev-progress-fill{height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#10B981,#34d399);transition:width .35s cubic-bezier(.4,0,.2,1)}" +
      /* 3D flip. The scene owns the perspective; the inner element is what
         actually rotates, so both faces stay in the same box and the card
         never "jumps" between question and answer. Nothing between the
         perspective and the rotating element sets `overflow`, which would
         flatten the 3D context in WebKit. */
      ".pseb-rev-scene{perspective:1400px;flex:1;min-height:0;display:flex}" +
      ".pseb-rev-flip{position:relative;flex:1;transition:transform .45s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}" +
      ".pseb-rev-scene.is-flipped .pseb-rev-flip{transform:rotateY(180deg)}" +
      ".pseb-rev-face{backface-visibility:hidden;-webkit-backface-visibility:hidden;box-sizing:border-box;border:1px solid #e2e8f0;border-left:5px solid #FF5C00;border-radius:12px;padding:18px 20px;background:#f8fafc;overflow-y:auto}" +
      ".pseb-rev-front{max-height:56vh}" +
      ".pseb-rev-back{position:absolute;inset:0;transform:rotateY(180deg);border-left-color:#0047BB}" +
      /* Keep the face turned away from the student un-clickable. */
      ".pseb-rev-scene:not(.is-flipped) .pseb-rev-back{pointer-events:none}" +
      ".pseb-rev-scene.is-flipped .pseb-rev-front{pointer-events:none}" +
      ".pseb-rev-tag{display:inline-block;background:#FF5C00;color:#fff;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:3px 9px;border-radius:999px;margin-bottom:8px}" +
      ".pseb-rev-tag.tag-hint{background:#64748b}" +
      ".pseb-rev-q{font-size:1.25rem;font-weight:700;line-height:1.5;margin:0}" +
      /* The answer is now the whole back face, so the divider that used to
         separate it from the question underneath is no longer meaningful. */
      ".pseb-rev-a{margin:0;padding:0}" +
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
      ".pseb-rev-summary p{margin:0;color:#475569!important}" +
      ".pseb-rev-summary .tally{margin-top:12px;font-size:1.05rem;font-weight:700;color:#10B981!important}" +
      "@media (prefers-reduced-motion:reduce){.pseb-rev-flip{transition:none}.pseb-rev-progress-fill{transition:none}}" +
      /* Flipping needs real 3D; if the browser cannot do it, fall back to a
         plain show/hide so the answer is still reachable. */
      "@supports not (transform-style:preserve-3d){" +
        ".pseb-rev-flip{transform:none!important}" +
        ".pseb-rev-back{position:static;transform:none;margin-top:12px}" +
        ".pseb-rev-scene:not(.is-flipped) .pseb-rev-back{display:none}" +
        ".pseb-rev-scene.is-flipped .pseb-rev-front{display:none}" +
      "}";
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
        '<div class="pseb-rev-progress">' +
          '<div class="pseb-rev-progress-labels">' +
            '<span class="pseb-rev-mastered"></span>' +
            '<span class="pseb-rev-total"></span>' +
          '</div>' +
          '<div class="pseb-rev-progress-bar" role="progressbar" aria-label="Cards mastered" aria-valuemin="0" aria-valuenow="0" aria-valuemax="0">' +
            '<div class="pseb-rev-progress-fill"></div>' +
          '</div>' +
        '</div>' +
        '<div class="pseb-rev-scene"><div class="pseb-rev-flip">' +
          '<div class="pseb-rev-face pseb-rev-front"></div>' +
          '<div class="pseb-rev-face pseb-rev-back"></div>' +
        '</div></div>' +
        '<div class="pseb-rev-actions"></div>' +
      '</div>';
    document.body.appendChild(back);
    back.addEventListener("click", function (e) { if (e.target === back) revShow(false); });
    back.querySelector(".pseb-rev-close").addEventListener("click", function () { revShow(false); });
    revEls = {
      back: back,
      count: back.querySelector(".pseb-rev-count"),
      scene: back.querySelector(".pseb-rev-scene"),
      flip: back.querySelector(".pseb-rev-flip"),
      front: back.querySelector(".pseb-rev-front"),
      face: back.querySelector(".pseb-rev-back"),
      progress: back.querySelector(".pseb-rev-progress"),
      progressBar: back.querySelector(".pseb-rev-progress-bar"),
      fill: back.querySelector(".pseb-rev-progress-fill"),
      mastered: back.querySelector(".pseb-rev-mastered"),
      total: back.querySelector(".pseb-rev-total"),
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
  /* Mini-Leitner: "Review again" re-queues the card a few positions later so
     it comes back inside the same session but not immediately, which is the
     whole point of spaced recall. "Mastered" retires it and moves the bar. */
  var REV_REQUEUE_GAP = 5;
  function revProgress() {
    var st = revState;
    if (!st || !revEls) return;
    var pct = st.total ? Math.round((st.mastered / st.total) * 100) : 0;
    revEls.fill.style.width = pct + "%";
    revEls.mastered.textContent = "Mastered: " + st.mastered + " / " + st.total;
    revEls.total.textContent = st.queue.length
      ? st.queue.length + " in queue"
      : "\u0a38\u0a3e\u0a30\u0a47 \u0a39\u0a4b \u0a17\u0a0f \u00b7 all done";
    revEls.progressBar.setAttribute("aria-valuenow", String(st.mastered));
    revEls.progressBar.setAttribute("aria-valuemax", String(st.total));
  }
  function revFlip(v) {
    if (!revEls) return;
    revEls.scene.classList.toggle("is-flipped", !!v);
    /* Keep the hidden face out of the tab order and the a11y tree. */
    revEls.front.setAttribute("aria-hidden", v ? "true" : "false");
    revEls.face.setAttribute("aria-hidden", v ? "false" : "true");
  }
  function sizeFlip() {
    if (!revEls) return;
    var cap = Math.round(window.innerHeight * 0.56);
    var want = Math.max(revEls.front.scrollHeight, revEls.face.scrollHeight);
    revEls.flip.style.minHeight = Math.min(want, cap) + "px";
  }
  function revRender() {
    var st = revState;
    if (!st || !revEls) return;
    if (!st.queue.length) {
      revFlip(false);
      revEls.count.textContent = "";
      revEls.front.innerHTML =
        '<div class="pseb-rev-summary">' +
          '<p class="big">\u0a36\u0a3e\u0a2c\u0a3e\u0a36! Round complete</p>' +
          '<p>' + st.total + ' card' + (st.total === 1 ? "" : "s") + ' revised \u00b7 ' +
          st.repeats + ' repeat' + (st.repeats === 1 ? "" : "s") + '</p>' +
          '<p class="tally">\u2705 Mastered ' + st.mastered + ' / ' + st.total + '</p>' +
        '</div>';
      revEls.face.innerHTML = "";
      revProgress();
      revEls.actions.innerHTML =
        '<button type="button" class="pseb-rev-again">Restart \u21ba</button>' +
        '<button type="button" class="pseb-rev-got">Done \u2713</button>';
      revEls.actions.querySelector(".pseb-rev-again").addEventListener("click", openRev);
      revEls.actions.querySelector(".pseb-rev-got").addEventListener("click", function () { revShow(false); });
      return;
    }
    var c = st.queue[0];
    revFlip(false);
    revEls.count.textContent = Math.min(st.mastered + 1, st.total) + " / " + st.total +
      (st.queue.length > 1 ? " \u00b7 " + (st.queue.length - 1) + " left" : "");

    var front = "";
    if (c.tricky) front += '<span class="pseb-rev-tag">Tricky \u00b7 \u0a14\u0a16\u0a3e</span>';
    else if (c.repeats) front += '<span class="pseb-rev-tag tag-hint">Second look \u00b7 \u0a26\u0a4b\u0a2c\u0a3e\u0a30\u0a3e</span>';
    front += '<p class="pseb-rev-q">' + esc(c.q) + '</p>';
    revEls.front.innerHTML = front;

    var back = '<div class="pseb-rev-a">';
    back += '<p class="ans">' + esc(c.a) + '</p>';
    if (c.pa) back += '<p class="ans-pa">' + esc(c.pa) + '</p>';
    if (c.why || c.whyPa) {
      back += '<div class="why">' + esc(c.why) +
        (c.whyPa ? '<span class="why-pa">' + esc(c.whyPa) + '</span>' : "") + '</div>';
    }
    back += '</div>';
    revEls.face.innerHTML = back;
    /* The back face is absolutely positioned, so the rotating box has to
       reserve the taller of the two faces or a long answer would be clipped
       mid-flip — capped so the modal itself never outgrows the viewport. */
    revEls.flip.style.minHeight = "";
    sizeFlip();

    revProgress();
    revEls.actions.innerHTML =
      '<button type="button" class="pseb-rev-reveal">Show answer \u00b7 \u0a1c\u0a35\u0a3e\u0a2c</button>';
    revEls.actions.querySelector(".pseb-rev-reveal").addEventListener("click", function () {
      revFlip(true);
      sizeFlip();
      revEls.actions.innerHTML =
        '<button type="button" class="pseb-rev-again">\uD83D\uDD01 Review again \u00b7 \u0a2b\u0a3f\u0a30</button>' +
        '<button type="button" class="pseb-rev-got">\u2705 Mastered \u00b7 \u0a06 \u0a17\u0a3f\u0a06</button>';
      revEls.actions.querySelector(".pseb-rev-again").addEventListener("click", function () {
        st.repeats++;
        st.seen++;
        var card = st.queue.shift();
        card.repeats = (card.repeats || 0) + 1;
        /* Splice it back a few cards in, not at the very end, so a short
           deck still re-tests it before the round closes. */
        var at = Math.min(REV_REQUEUE_GAP, st.queue.length);
        st.queue.splice(at, 0, card);
        revRender();
      });
      revEls.actions.querySelector(".pseb-rev-got").addEventListener("click", function () {
        st.queue.shift();
        st.seen++;
        st.mastered++;
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
    revState = { queue: cards, total: cards.length, repeats: 0, mastered: 0, seen: 0 };
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
  // contains Gurmukhi script is spoken with a Punjabi (pa-IN) voice instead —
  // and, when the device has no Punjabi voice at all, say so rather than
  // handing Gurmukhi to an English engine and leaving the button highlighted.
  function patchSpeakWord() {
    var orig = window.speakWord;
    window.speakWord = function (text, btn) {
      var t = String(text == null ? "" : text);
      if (/[\u0A00-\u0A7F]/.test(t)) {
        if (!speechReady()) { toast("Text-to-speech is not available in this browser"); return; }
        var v = pickVoice("pa");
        if (!v) { toast("No Punjabi voice on this device"); return; }
        try {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(t);
          u.voice = v;
          u.lang = v.lang || "pa-IN";
          u.rate = 0.85;
          if (btn) {
            btn.style.backgroundColor = "#D1FAE5";
            var clear = function () { btn.style.backgroundColor = ""; };
            u.onend = clear;
            u.onerror = clear;
            setTimeout(clear, Math.min(12000, 1600 + t.length * 120));
          }
          window.speechSynthesis.speak(u);
          return;
        } catch (e) {
          if (btn) btn.style.backgroundColor = "";
          return;
        }
      }
      if (typeof orig === "function") orig(text, btn);
    };
  }
})();