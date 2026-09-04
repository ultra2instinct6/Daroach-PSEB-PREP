/* BOLO.INSTINCT — lecture video registry + lazy YouTube modal.
   ------------------------------------------------------------------
   Loaded by the 12 decks that carry a high-yield demonstration clip.
   Everything is classic ES5-style script so it keeps working over the
   file: scheme and inside the offline PWA shell, exactly like
   assets/chapters.js and assets/deck-enhance.js.

   Contract with the decks: any element carrying data-video="<conceptKey>"
   gets a discreet trigger button injected after its first heading. No
   iframe exists anywhere in the DOM until that button is clicked, and the
   iframe is destroyed (not merely hidden) when the modal closes, so audio
   can never keep playing behind a slide.

   Chapter numbers below are the canonical catalog numbers from
   assets/chapters.js (window.PSEB_CHAPTERS[].n), not the legacy folder
   numbers. Chapters 5, 14, 15 and 16 are deliberately excluded to keep
   the bandwidth budget low. */
(function () {
  "use strict";

  /**
   * @typedef {Object} LectureVideo
   * @property {string} id           YouTube video id.
   * @property {number} chapterNumber Catalog chapter number (PSEB_CHAPTERS[].n).
   * @property {string} conceptKey   Slide anchor, matches data-video="…".
   * @property {string} labelEn      English title shown in the modal header.
   * @property {string} labelPa      Gurmukhi title shown in the modal header.
   * @property {string} channel      Source channel, credited in the footer.
   * @property {string} duration     Runtime as m:ss, shown on the trigger.
   * @property {string} url          Canonical watch URL (fallback link).
   */

  /** @type {Object.<number, LectureVideo[]>} */
  var LECTURE_VIDEOS = {
    /* ---- Phase 1: high-yield core practicals & organ mechanics ---- */
    1: [
      {
        id: "epDGHnwaVJY",
        chapterNumber: 1,
        conceptKey: "magnesium-ribbon",
        labelEn: "Burning Magnesium Ribbon",
        labelPa: "\u0a2a\u0a4d\u0a30\u0a2f\u0a4b\u0a17: \u0a2e\u0a48\u0a17\u0a28\u0a40\u0a38\u0a3c\u0a40\u0a05\u0a2e \u0a30\u0a3f\u0a2c\u0a28 \u0a26\u0a3e \u0a2c\u0a32\u0a23\u0a3e",
        channel: "Make Me Scientific",
        duration: "2:14",
        url: "https://www.youtube.com/watch?v=epDGHnwaVJY"
      },
      {
        id: "b9ZBeilw_mQ",
        chapterNumber: 1,
        conceptKey: "electrolysis-water",
        labelEn: "Electrolysis of Water (2:1 Ratio)",
        labelPa: "\u0a2a\u0a4d\u0a30\u0a2f\u0a4b\u0a17: \u0a2a\u0a3e\u0a23\u0a40 \u0a26\u0a3e \u0a2c\u0a3f\u0a1c\u0a32\u0a08 \u0a05\u0a2a\u0a18\u0a1f\u0a28",
        channel: "Manocha Academy",
        duration: "1:00",
        url: "https://www.youtube.com/watch?v=b9ZBeilw_mQ"
      }
    ],
    6: [
      {
        id: "jBt5jZSWhMI",
        chapterNumber: 6,
        conceptKey: "heart-circulation",
        labelEn: "Blood Flow Through the Heart",
        labelPa: "3D \u0a10\u0a28\u0a40\u0a2e\u0a47\u0a38\u0a3c\u0a28: \u0a26\u0a3f\u0a32 \u0a35\u0a3f\u0a71\u0a1a \u0a32\u0a39\u0a42 \u0a26\u0a3e \u0a17\u0a47\u0a5c",
        channel: "Neural Academy",
        duration: "2:12",
        url: "https://www.youtube.com/watch?v=jBt5jZSWhMI"
      },
      {
        id: "uGS2lRRbhM0",
        chapterNumber: 6,
        conceptKey: "nephron-filtration",
        labelEn: "Nephron Structure & Urine Formation",
        labelPa: "3D \u0a10\u0a28\u0a40\u0a2e\u0a47\u0a38\u0a3c\u0a28: \u0a28\u0a48\u0a2b\u0a30\u0a4b\u0a28 \u0a26\u0a40 \u0a2c\u0a23\u0a24\u0a30",
        channel: "Demystifying Science",
        duration: "4:44",
        url: "https://www.youtube.com/watch?v=uGS2lRRbhM0"
      }
    ],
    13: [
      {
        id: "wdVgmIPBUAs",
        chapterNumber: 13,
        conceptKey: "electric-motor",
        labelEn: "Electric Motor & Commutator",
        labelPa: "3D \u0a10\u0a28\u0a40\u0a2e\u0a47\u0a38\u0a3c\u0a28: \u0a2c\u0a3f\u0a1c\u0a32\u0a08 \u0a2e\u0a4b\u0a1f\u0a30 \u0a26\u0a40 \u0a15\u0a3e\u0a30\u0a1c-\u0a35\u0a3f\u0a27\u0a40",
        channel: "Visual Learning",
        duration: "3:39",
        url: "https://www.youtube.com/watch?v=wdVgmIPBUAs"
      }
    ],

    /* ---- Phase 2: physics optics & circuits ---- */
    10: [
      {
        id: "5pZRI4hg21E",
        chapterNumber: 10,
        conceptKey: "concave-ray-diagrams",
        labelEn: "Concave Mirror Image Formation",
        labelPa: "\u0a15\u0a3f\u0a30\u0a28 \u0a1a\u0a3f\u0a71\u0a24\u0a30: \u0a05\u0a35\u0a24\u0a32 \u0a26\u0a30\u0a2a\u0a23",
        channel: "EasyPhysi",
        duration: "0:56",
        url: "https://www.youtube.com/watch?v=5pZRI4hg21E"
      }
    ],
    11: [
      {
        id: "Av1ZiN9P01s",
        chapterNumber: 11,
        conceptKey: "vision-defects",
        labelEn: "Myopia & Hypermetropia Correction",
        labelPa: "\u0a26\u0a4d\u0a30\u0a3f\u0a38\u0a3c\u0a1f\u0a40 \u0a26\u0a4b\u0a38\u0a3c \u0a05\u0a24\u0a47 \u0a38\u0a41\u0a27\u0a3e\u0a30",
        channel: "7activestudio",
        duration: "4:24",
        url: "https://www.youtube.com/watch?v=Av1ZiN9P01s"
      },
      {
        id: "Aggi0g67uXM",
        chapterNumber: 11,
        conceptKey: "prism-dispersion",
        labelEn: "Dispersion of Light by a Prism",
        labelPa: "\u0a2a\u0a4d\u0a30\u0a3f\u0a1c\u0a3c\u0a2e \u0a26\u0a41\u0a06\u0a30\u0a3e \u0a35\u0a30\u0a23-\u0a35\u0a3f\u0a16\u0a47\u0a2a\u0a23",
        channel: "ABC Education",
        duration: "2:35",
        url: "https://www.youtube.com/watch?v=Aggi0g67uXM"
      }
    ],
    12: [
      {
        id: "WQjGeCGuC1o",
        chapterNumber: 12,
        conceptKey: "ohms-law",
        labelEn: "Ohm's Law Circuit Setup",
        labelPa: "3D \u0a10\u0a28\u0a40\u0a2e\u0a47\u0a38\u0a3c\u0a28: \u0a13\u0a39\u0a2e \u0a26\u0a3e \u0a28\u0a3f\u0a2f\u0a2e",
        channel: "Visual Learning",
        duration: "3:08",
        url: "https://www.youtube.com/watch?v=WQjGeCGuC1o"
      }
    ],

    /* ---- Phase 3: molecular reactions & genetics ---- */
    2: [
      {
        id: "bRu2nwFK9O8",
        chapterNumber: 2,
        conceptKey: "acid-metal-pop-test",
        labelEn: "Acid + Metal Pop Test",
        labelPa: "\u0a24\u0a47\u0a1c\u0a3c\u0a3e\u0a2c + \u0a27\u0a3e\u0a24 \u0a05\u0a24\u0a47 \u0a2a\u0a4c\u0a2a \u0a1f\u0a48\u0a38\u0a1f",
        channel: "Raquel Yoong",
        duration: "1:58",
        url: "https://www.youtube.com/watch?v=bRu2nwFK9O8"
      }
    ],
    3: [
      {
        id: "Wodyxtv-ngQ",
        chapterNumber: 3,
        conceptKey: "electrolytic-refining",
        labelEn: "Electrolytic Refining of Copper",
        labelPa: "\u0a24\u0a3e\u0a02\u0a2c\u0a47 \u0a26\u0a3e \u0a2c\u0a3f\u0a1c\u0a32\u0a08 \u0a38\u0a3c\u0a41\u0a71\u0a27\u0a40\u0a15\u0a30\u0a28",
        channel: "Classontheweb",
        duration: "1:37",
        url: "https://www.youtube.com/watch?v=Wodyxtv-ngQ"
      }
    ],
    4: [
      {
        id: "YnyYsEBJ80I",
        chapterNumber: 4,
        conceptKey: "soap-micelles",
        labelEn: "Soap Cleansing Action & Micelles",
        labelPa: "\u0a38\u0a3e\u0a2c\u0a23 \u0a26\u0a40 \u0a38\u0a2b\u0a3c\u0a3e\u0a08 \u0a2a\u0a4d\u0a30\u0a15\u0a3f\u0a30\u0a3f\u0a06 \u0a05\u0a24\u0a47 \u0a2e\u0a3f\u0a38\u0a48\u0a32",
        channel: "L-gic",
        duration: "1:06",
        url: "https://www.youtube.com/watch?v=YnyYsEBJ80I"
      }
    ],
    7: [
      {
        id: "Nn2RHLWST-k",
        chapterNumber: 7,
        conceptKey: "reflex-arc",
        labelEn: "Reflex Arc & Synapse",
        labelPa: "\u0a2a\u0a4d\u0a30\u0a24\u0a40\u0a35\u0a30\u0a24\u0a40 \u0a1a\u0a3e\u0a2a \u0a2a\u0a4d\u0a30\u0a23\u0a3e\u0a32\u0a40",
        channel: "FuseSchool - Global Education",
        duration: "2:35",
        url: "https://www.youtube.com/watch?v=Nn2RHLWST-k"
      }
    ],
    8: [
      {
        id: "kYya36gfz_Y",
        chapterNumber: 8,
        conceptKey: "double-fertilization",
        labelEn: "Double Fertilization in Plants",
        labelPa: "\u0a2a\u0a4c\u0a26\u0a3f\u0a06\u0a02 \u0a35\u0a3f\u0a71\u0a1a \u0a26\u0a4b\u0a39\u0a30\u0a3e \u0a28\u0a3f\u0a38\u0a3c\u0a47\u0a1a\u0a28",
        channel: "Bio_tutorial by KD",
        duration: "1:12",
        url: "https://www.youtube.com/watch?v=kYya36gfz_Y"
      }
    ],
    9: [
      {
        id: "Mehz7tCxjSE",
        chapterNumber: 9,
        conceptKey: "mendel-genetics",
        labelEn: "Mendel's Monohybrid Pea Experiment",
        labelPa: "\u0a2e\u0a48\u0a02\u0a21\u0a32 \u0a26\u0a3e \u0a2e\u0a1f\u0a30\u0a3e\u0a02 \u0a26\u0a3e \u0a2a\u0a4d\u0a30\u0a2f\u0a4b\u0a17",
        channel: "TED-Ed",
        duration: "3:07",
        url: "https://www.youtube.com/watch?v=Mehz7tCxjSE"
      }
    ]
  };

  window.PSEB_LECTURE_VIDEOS = LECTURE_VIDEOS;

  /* Flat conceptKey -> video index, so a deck resolves its clips even if the
     body is missing data-chapter. */
  var BY_CONCEPT = {};
  Object.keys(LECTURE_VIDEOS).forEach(function (n) {
    LECTURE_VIDEOS[n].forEach(function (v) { BY_CONCEPT[v.conceptKey] = v; });
  });

  /** @returns {LectureVideo|null} */
  function findVideo(conceptKey) {
    if (!conceptKey) return null;
    var chapter = parseInt(document.body.getAttribute("data-chapter"), 10);
    var list = LECTURE_VIDEOS[chapter];
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].conceptKey === conceptKey) return list[i];
      }
    }
    return BY_CONCEPT[conceptKey] || null;
  }
  window.PSEB_FIND_LECTURE_VIDEO = findVideo;

  var CSS =
    ".lv-trigger{display:inline-flex;align-items:center;gap:8px;margin:2px 0 18px;padding:9px 16px;" +
      "font-family:var(--deck-font-ui,system-ui,sans-serif);font-size:0.95rem;font-weight:600;line-height:1.2;" +
      "color:var(--deck-aura,#00e5ff);background:var(--deck-panel-soft,rgba(255,255,255,0.05));" +
      "border:1px solid var(--deck-border-strong,rgba(255,255,255,0.16));border-radius:999px;cursor:pointer;" +
      "max-width:100%;text-align:left;transition:background-color 160ms ease,color 160ms ease,border-color 160ms ease;}" +
    ".lv-trigger:hover,.lv-trigger:focus-visible{background:var(--deck-aura,#00e5ff);color:#050507;border-color:transparent;}" +
    ".lv-trigger:focus-visible{outline:2px solid var(--deck-warn,#ffaa00);outline-offset:2px;}" +
    ".lv-trigger .lv-play{font-size:0.9em;}" +
    ".lv-trigger .lv-dur{font-weight:500;opacity:0.78;font-variant-numeric:tabular-nums;}" +
    ".lv-trigger .gurmukhi{padding-top:0;padding-bottom:0;line-height:1.5;}" +

    ".lv-backdrop{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;" +
      "padding:16px;background:rgba(0,0,0,0.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}" +
    ".lv-backdrop.show{display:flex;}" +
    ".lv-dialog{width:min(960px,100%);max-height:92vh;overflow-y:auto;display:flex;flex-direction:column;gap:12px;" +
      "padding:18px;border-radius:18px;background:var(--deck-panel-strong,#141419);color:var(--deck-text,#f8fafc);" +
      "border:1px solid var(--deck-border-strong,rgba(255,255,255,0.16));box-shadow:var(--deck-shadow,0 28px 80px rgba(0,0,0,0.72));" +
      "font-family:var(--deck-font-ui,system-ui,sans-serif);}" +
    ".lv-head{display:flex;align-items:flex-start;gap:12px;}" +
    ".lv-titles{flex:1 1 auto;min-width:0;}" +
    ".lv-title-en{margin:0 !important;padding:0 !important;border:0 !important;font-size:1.15rem !important;" +
      "font-weight:700 !important;color:var(--deck-aura,#00e5ff) !important;line-height:1.35 !important;" +
      "text-align:left !important;text-transform:none !important;letter-spacing:normal !important;background:none !important;}" +
    ".lv-title-en::before,.lv-title-en::after{content:none !important;display:none !important;}" +
    ".lv-title-pa{display:block;margin-top:2px;font-size:1rem;font-weight:600;color:var(--deck-text,#f8fafc);" +
      "line-height:1.85;padding-bottom:0.18em;overflow:visible;}" +
    ".lv-close{flex:0 0 auto;width:38px;height:38px;border-radius:50%;cursor:pointer;font-size:1.2rem;line-height:1;" +
      "color:var(--deck-text,#f8fafc);background:var(--deck-panel-soft,rgba(255,255,255,0.05));" +
      "border:1px solid var(--deck-border-strong,rgba(255,255,255,0.16));}" +
    ".lv-close:hover,.lv-close:focus-visible{background:var(--deck-danger,#ef4444);color:#fff;border-color:transparent;}" +
    ".lv-frame{position:relative;flex:0 0 auto;width:100%;" +
      /* Cap the width from the available height so the 16:9 box is never
         squashed by the dialog's max-height on short/landscape screens. */
      "max-width:max(260px, calc((92vh - 150px) * 16 / 9));margin:0 auto;" +
      "aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;}" +
    "@supports not (aspect-ratio:16/9){.lv-frame{height:0;padding-bottom:56.25%;}}" +
    ".lv-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}" +
    ".lv-offline{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;" +
      "gap:10px;padding:20px;text-align:center;font-size:0.95rem;color:var(--deck-muted,#9aa7ba);}" +
    ".lv-offline a{color:var(--deck-aura,#00e5ff);}" +
    ".lv-meta{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:0.82rem;color:var(--deck-muted,#9aa7ba);}" +
    ".lv-meta a{color:var(--deck-muted,#9aa7ba);}" +

    "@media (max-width:600px){" +
      ".lv-trigger{font-size:0.85rem;padding:8px 13px;margin-bottom:14px;}" +
      ".lv-dialog{padding:13px;border-radius:14px;gap:10px;}" +
      ".lv-title-en{font-size:1rem;}.lv-title-pa{font-size:0.92rem;}" +
      ".lv-backdrop{padding:12px 10px;}" +
    "}" +
    "@media (max-width:400px){.lv-backdrop{padding:10px 8px;}.lv-dialog{padding:11px;}.lv-trigger{font-size:0.8rem;}}" +
    "@media print{.lv-trigger,.lv-backdrop{display:none !important;}}";

  function injectCss() {
    if (document.getElementById("lv-styles")) return;
    var s = document.createElement("style");
    s.id = "lv-styles";
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------------- Modal ---------------- */

  var backdrop = null;
  var frameHost = null;
  var titleEnEl = null;
  var titlePaEl = null;
  var metaEl = null;
  var closeBtn = null;
  var lastFocused = null;
  var openVideo = null;

  function buildModal() {
    if (backdrop) return;

    backdrop = document.createElement("div");
    backdrop.className = "lv-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "lv-title-en");

    var dialog = document.createElement("div");
    dialog.className = "lv-dialog";

    var head = document.createElement("div");
    head.className = "lv-head";

    var titles = document.createElement("div");
    titles.className = "lv-titles";
    /* A div with an explicit heading role, not an <h2>: every deck stylesheet
       decorates h2 with !important rules (flourishes, 2rem type, underlines)
       that would otherwise leak into the modal. */
    titleEnEl = document.createElement("div");
    titleEnEl.className = "lv-title-en";
    titleEnEl.id = "lv-title-en";
    titleEnEl.setAttribute("role", "heading");
    titleEnEl.setAttribute("aria-level", "2");
    titlePaEl = document.createElement("span");
    titlePaEl.className = "lv-title-pa gurmukhi";
    titlePaEl.setAttribute("lang", "pa");
    titles.appendChild(titleEnEl);
    titles.appendChild(titlePaEl);

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lv-close";
    closeBtn.setAttribute("aria-label", "Close video");
    closeBtn.innerHTML = "&#10005;";
    closeBtn.addEventListener("click", close);

    head.appendChild(titles);
    head.appendChild(closeBtn);

    frameHost = document.createElement("div");
    frameHost.className = "lv-frame";

    metaEl = document.createElement("div");
    metaEl.className = "lv-meta";

    dialog.appendChild(head);
    dialog.appendChild(frameHost);
    dialog.appendChild(metaEl);
    backdrop.appendChild(dialog);
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) close(); });
    /* The decks bind swipe navigation on document; keep gestures made inside
       the modal from paging the slide underneath. */
    ["touchstart", "touchend", "touchmove", "click", "keydown"].forEach(function (type) {
      backdrop.addEventListener(type, function (e) { e.stopPropagation(); }, false);
    });
  }

  function mountFrame(video) {
    frameHost.innerHTML = "";
    if (navigator.onLine === false) {
      var off = document.createElement("div");
      off.className = "lv-offline";
      off.innerHTML =
        "<div>\u26a1 You are offline \u2014 this clip streams from YouTube.</div>" +
        '<div><a href="' + video.url + '" target="_blank" rel="noopener noreferrer">Open on YouTube when back online</a></div>';
      frameHost.appendChild(off);
      return;
    }
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + video.id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = video.labelEn;
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("loading", "eager");
    frameHost.appendChild(iframe);
  }

  function open(video) {
    if (!video) return;
    injectCss();
    buildModal();
    lastFocused = document.activeElement;
    openVideo = video;

    titleEnEl.textContent = video.labelEn;
    titlePaEl.textContent = video.labelPa;
    metaEl.innerHTML = "";
    var credit = document.createElement("span");
    credit.textContent = "\u25b6 " + video.channel + " \u00b7 " + video.duration;
    var link = document.createElement("a");
    link.href = video.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Watch on YouTube \u2197";
    metaEl.appendChild(credit);
    metaEl.appendChild(link);

    mountFrame(video);
    backdrop.classList.add("show");
    if (closeBtn.focus) closeBtn.focus();
  }

  function close() {
    if (!backdrop || !backdrop.classList.contains("show")) return;
    backdrop.classList.remove("show");
    /* Blank the src first so the network stream stops even on browsers that
       keep a detached iframe alive for a tick, then drop the node entirely. */
    var iframe = frameHost.querySelector("iframe");
    if (iframe) iframe.src = "about:blank";
    frameHost.innerHTML = "";
    openVideo = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }

  function isOpen() { return !!(backdrop && backdrop.classList.contains("show")); }

  window.PSEB_LECTURE_VIDEO_MODAL = { open: open, close: close, isOpen: isOpen };

  /* Capture phase so this runs before the per-deck arrow-key handler and the
     deck-enhance shortcut handler, both of which bind on document. */
  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }
    if (e.key === "Tab") {
      /* Two focusable stops only (close button, YouTube link) — keep Tab inside. */
      var stops = backdrop.querySelectorAll("button, a[href], iframe");
      if (!stops.length) return;
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      return;
    }
    /* Everything else (arrows, o, l, r, f, p, +/-…) must not reach the deck. */
    e.stopPropagation();
  }, true);

  /* ---------------- Trigger injection ---------------- */

  function buildTrigger(video) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lv-trigger";
    btn.setAttribute("data-video-trigger", video.conceptKey);
    btn.setAttribute("aria-haspopup", "dialog");
    btn.title = video.labelEn + " \u00b7 " + video.channel + " \u00b7 " + video.duration;

    var play = document.createElement("span");
    play.className = "lv-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "\u25b6";

    var en = document.createElement("span");
    en.textContent = "3D /";

    var pa = document.createElement("span");
    pa.className = "gurmukhi";
    pa.setAttribute("lang", "pa");
    pa.textContent = "\u0a2a\u0a4d\u0a30\u0a2f\u0a4b\u0a17 \u0a35\u0a47\u0a16\u0a4b";

    var dur = document.createElement("span");
    dur.className = "lv-dur";
    dur.textContent = "(" + video.duration + ")";

    btn.appendChild(play);
    btn.appendChild(en);
    btn.appendChild(pa);
    btn.appendChild(dur);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      open(video);
    });
    return btn;
  }

  function mountTriggers() {
    injectCss();
    var hosts = document.querySelectorAll("[data-video]");
    Array.prototype.forEach.call(hosts, function (host) {
      var video = findVideo(host.getAttribute("data-video"));
      if (!video) return;
      var box = host.classList.contains("content-box") ? host : (host.querySelector(".content-box") || host);
      if (box.querySelector("[data-video-trigger]")) return;
      var btn = buildTrigger(video);
      var heading = box.querySelector("h1, h2, h3");
      if (heading && heading.parentNode === box && heading.nextSibling) box.insertBefore(btn, heading.nextSibling);
      else if (heading && heading.parentNode === box) box.appendChild(btn);
      else box.insertBefore(btn, box.firstChild);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountTriggers);
  } else {
    mountTriggers();
  }
})();
