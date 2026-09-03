/* BOLO.INSTINCT — PWA runtime.

   Responsibilities
     1. Register /sw.js (see sw.js) from any page depth, so the menu, the MCQ
        engine and the 16 chapter decks all share one root-scoped worker.
     2. Show a subtle "Offline Mode • Content Cached" indicator whenever the
        device drops connectivity, so students know the session continues.
     3. Expose PSEB_STORE — a tiny durable key/value layer that mirrors the
        existing localStorage keys (chapter completion, reading progress,
        bookmarks, study time, quiz attempts) into IndexedDB. localStorage is
        the fast synchronous path the rest of the app already uses; IndexedDB
        is the resilient copy that survives localStorage eviction and is
        restored automatically on the next boot.

   Classic script, no modules — matches the rest of assets/. */
(function () {
  "use strict";
  if (window.__psebPwa) return;
  window.__psebPwa = true;

  /* ---------- resolve the site root from this script's own URL ---------- */
  function scriptRoot() {
    var el = document.currentScript;
    if (!el) {
      var all = document.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) {
        if ((all[i].src || "").indexOf("assets/pwa.js") !== -1) { el = all[i]; break; }
      }
    }
    if (!el || !el.src) return "./";
    return el.src.replace(/assets\/pwa\.js(?:\?.*)?$/, "");
  }
  var ROOT = scriptRoot();

  /* ================= 1. Service worker registration ================= */
  var registration = null;

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    /* Service workers require a secure context; file:// study copies simply
       fall back to normal browser caching. */
    if (location.protocol !== "https:" && location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1" && location.hostname !== "[::1]") return;

    navigator.serviceWorker.register(ROOT + "sw.js", { scope: ROOT })
      .then(function (reg) { registration = reg; })
      ["catch"](function () { /* registration is best-effort */ });
  }

  function cacheAllChapters() {
    if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return false;
    navigator.serviceWorker.controller.postMessage({ type: "CACHE_ALL_CHAPTERS" });
    return true;
  }

  /* ================= 2. Offline status indicator ================= */
  var badge = null;

  function injectBadgeStyle() {
    if (document.getElementById("pseb-offline-style")) return;
    var s = document.createElement("style");
    s.id = "pseb-offline-style";
    s.textContent = [
      ".pseb-offline{",
      "  position:fixed;left:14px;bottom:16px;z-index:2147483000;",
      "  display:none;align-items:center;gap:8px;",
      "  padding:7px 13px;border-radius:999px;",
      "  background:rgba(16,19,25,0.92);color:#ffd27d;",
      "  border:1px solid rgba(255,170,0,0.42);",
      "  box-shadow:0 8px 26px rgba(0,0,0,0.45);",
      "  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;",
      "  font-size:11.5px;font-weight:600;letter-spacing:.3px;",
      "  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);",
      "  pointer-events:none;max-width:calc(100vw - 28px);",
      "}",
      ".pseb-offline.is-on{display:flex;animation:psebOfflineIn .32s ease;}",
      ".pseb-offline .dot{",
      "  width:7px;height:7px;border-radius:50%;background:#ffaa00;flex:0 0 auto;",
      "  box-shadow:0 0 8px rgba(255,170,0,0.8);animation:psebOfflinePulse 2.2s infinite ease-in-out;",
      "}",
      ".pseb-offline .pa{",
      "  font-family:var(--font-gurmukhi,'Noto Sans Gurmukhi','Mukta Mahee',sans-serif);",
      "  line-height:1.8;padding:.15em 0;opacity:.85;font-weight:500;",
      "}",
      "body[data-theme=\"CLASSIC\"] .pseb-offline,",
      "html[data-deck-theme=\"legacy\"] .pseb-offline{",
      "  background:rgba(255,255,255,0.95);color:#a35a00;",
      "  border-color:rgba(242,106,33,0.35);box-shadow:0 8px 22px rgba(12,38,84,0.16);",
      "}",
      "@keyframes psebOfflineIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}",
      "@keyframes psebOfflinePulse{0%,100%{opacity:1;}50%{opacity:.35;}}",
      "@media (max-width:400px){",
      "  .pseb-offline{left:10px;bottom:12px;font-size:10.5px;padding:6px 11px;gap:6px;}",
      "}",
      "@media (prefers-reduced-motion:reduce){",
      "  .pseb-offline.is-on{animation:none;} .pseb-offline .dot{animation:none;}",
      "}",
      "@media print{.pseb-offline{display:none !important;}}"
    ].join("");
    (document.head || document.documentElement).appendChild(s);
  }

  function buildBadge() {
    if (badge) return badge;
    injectBadgeStyle();
    badge = document.createElement("div");
    badge.className = "pseb-offline";
    badge.setAttribute("role", "status");
    badge.setAttribute("aria-live", "polite");
    badge.innerHTML = '<span class="dot" aria-hidden="true"></span>' +
      "<span>Offline Mode \u2022 Content Cached</span>" +
      '<span class="pa" lang="pa">· ਬਿਨਾਂ ਇੰਟਰਨੈੱਟ ਜਾਰੀ</span>';
    document.body.appendChild(badge);
    return badge;
  }

  /* Lift the badge above any fixed page chrome it would otherwise cover —
     on narrow screens the lecture decks pin their prev/next arrows to the
     bottom-left corner. */
  function positionBadge() {
    if (!badge || !badge.classList.contains("is-on")) return;
    badge.style.bottom = "";
    var base = badge.getBoundingClientRect();
    var lift = 0;
    var all = document.body.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el === badge || badge.contains(el)) continue;
      var cs = window.getComputedStyle(el);
      if (cs.position !== "fixed" || cs.visibility === "hidden" || cs.display === "none") continue;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.left > base.right || r.right < base.left) continue;
      if (r.top > base.bottom || r.bottom < base.top) continue;
      lift = Math.max(lift, window.innerHeight - r.top + 8);
    }
    if (lift) badge.style.bottom = Math.round(lift) + "px";
  }

  function syncOnlineState() {
    var offline = navigator.onLine === false;
    if (!offline && !badge) return;
    buildBadge().classList.toggle("is-on", offline);
    if (offline) positionBadge();
  }

  /* ================= 3. Durable local persistence ================= */
  var DB_NAME = "bolo-instinct";
  var STORE = "kv";
  var dbPromise = null;
  /* Everything the student would lose if localStorage were evicted. */
  var MIRRORED_KEYS = [
    "pseb.progress.v1",   // chapter completion + last slide (reading progress)
    "pseb.last.v1",       // resume target
    "pseb.bookmarks.v1",  // revision bookmarks
    "pseb.study.v1",      // per-day study seconds / streak
    "pseb.fontscale.v1",
    "pseb.decktheme.v1",
    "bolo.theme.v1",
    "bolo_mcq_v1",        // MCQ subject/language preference
    "bolo_mcq_attempts_v1" // MCQ attempts: answers, flags, timings, score
  ];

  function openDb() {
    /* One connection per page: every mirrored localStorage write goes through
       here, and leaving connections open would both churn memory on low-end
       phones and block a future versionchange. */
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) { reject(new Error("no-idb")); return; }
      var req;
      try { req = indexedDB.open(DB_NAME, 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onblocked = function () { reject(new Error("idb-blocked")); };
      req.onsuccess = function () {
        var db = req.result;
        /* Step aside so another tab can upgrade instead of hanging. */
        db.onversionchange = function () { db.close(); dbPromise = null; };
        db.onclose = function () { dbPromise = null; };
        resolve(db);
      };
      req.onerror = function () { dbPromise = null; reject(req.error); };
    });
    dbPromise["catch"](function () { dbPromise = null; });
    return dbPromise;
  }

  function idbSet(key, value) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readwrite");
        tx.objectStore(STORE).put(value, key);
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }

  function idbGet(key) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, "readonly");
        var req = tx.objectStore(STORE).get(key);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }

  function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }

  /* Write to both layers. Used by save() and by the localStorage mirror. */
  function save(key, value) {
    var raw = typeof value === "string" ? value : JSON.stringify(value);
    lsSet(key, raw);
    idbSet(key, raw)["catch"](function () {});
    return raw;
  }

  function load(key, fallback) {
    var raw = lsGet(key);
    if (raw == null) return fallback === undefined ? null : fallback;
    try { return JSON.parse(raw); } catch (e) { return raw; }
  }

  /* Restore anything present in IndexedDB but missing from localStorage —
     this is what makes progress survive a storage eviction or a private-mode
     quota reset between sessions. */
  function hydrate() {
    if (!("indexedDB" in window)) return Promise.resolve();
    return Promise.all(MIRRORED_KEYS.map(function (key) {
      if (lsGet(key) != null) return null;
      return idbGet(key).then(function (raw) {
        if (typeof raw === "string" && raw.length) lsSet(key, raw);
      })["catch"](function () {});
    }));
  }

  /* Mirror forward: whatever the existing synchronous code path writes to
     localStorage is copied into IndexedDB without changing any call sites. */
  function installMirror() {
    if (!("indexedDB" in window) || !window.localStorage) return;
    var proto = window.Storage && window.Storage.prototype;
    if (!proto || proto.__psebMirrored) return;
    var nativeSetItem = proto.setItem;
    proto.setItem = function (key, value) {
      nativeSetItem.call(this, key, value);
      if (this === window.localStorage && MIRRORED_KEYS.indexOf(key) !== -1) {
        idbSet(key, String(value))["catch"](function () {});
      }
    };
    proto.__psebMirrored = true;
  }

  function requestPersistence() {
    /* Ask the browser not to evict our cached decks under storage pressure. */
    try {
      if (navigator.storage && navigator.storage.persist && navigator.storage.persisted) {
        navigator.storage.persisted().then(function (already) {
          if (!already) navigator.storage.persist()["catch"](function () {});
        })["catch"](function () {});
      }
    } catch (e) {}
  }

  window.PSEB_STORE = {
    save: save,
    load: load,
    keys: MIRRORED_KEYS,
    hydrate: hydrate,
    cacheAllChapters: cacheAllChapters,
    isOffline: function () { return navigator.onLine === false; }
  };

  /* ================= boot ================= */
  installMirror();
  hydrate()["catch"](function () {});
  requestPersistence();

  window.addEventListener("online", syncOnlineState);
  window.addEventListener("offline", syncOnlineState);
  window.addEventListener("resize", positionBadge);
  window.addEventListener("load", registerSW);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncOnlineState);
  } else {
    syncOnlineState();
  }
}());
