/* BOLO.INSTINCT — 4-slot Memory Card (shared-device learner profiles).

   One phone or family computer is often shared by siblings, cousins or a
   study group. Like a console memory card, the app keeps four independent
   save blocks on the device — no server, no login, no email.

   How it works
     • Must be the FIRST script in <head> on every page. It wraps
       Storage.prototype.getItem/setItem/removeItem so every learner-specific
       localStorage key ("pseb.*", "bolo.*", "bolo_*") is transparently routed
       to the active slot. No existing feature (decks, MCQ engine, flashcards,
       interactive slides, menu) had to change a single call site.
     • Slot 1 uses the original, un-prefixed keys. Existing learners are
       therefore migrated with zero data movement: their history simply
       becomes Slot 1. Slots 2–4 live under "bolo_slot_N::<key>".
     • The registry ("bolo_memory_card_v1") holds slot metadata and the
       active slot. Each page pins the slot it booted with; switching slots
       (here or in another tab) reloads the page so no in-memory state can
       leak into the wrong profile.
     • pwa.js mirrors progress into IndexedDB; it asks physicalKey() for the
       slot-scoped name so the eviction backup stays isolated per slot.

   Public API: window.BOLO_MEMCARD (service) and window.BOLO_MEMCARD_UI
   (modal). Fires a `bolo:slotChanged` DOM event (cancelable — call
   preventDefault() to handle the switch without the default page reload).

   Classic script, no modules — matches the rest of assets/. */
(function () {
  "use strict";
  if (window.BOLO_MEMCARD) return;

  var REGISTRY_KEY = "bolo_memory_card_v1";
  var SLOT_IDS = [1, 2, 3, 4];
  var FILE_FORMAT = "bolo-memory-card";
  var MAX_NAME = 32;        /* what the create / rename form accepts */
  var MAX_STORED_NAME = 48; /* bilingual defaults ("ਸਿੱਖਿਆਰਥੀ 1 / Student 1") */
  /* Suggested learner per block; Slot 1 keeps the generic default so
     existing users' "Main Profile" migration is unchanged. */
  var DEFAULT_NAMES = {
    1: "\u0A38\u0A3F\u0A71\u0A16\u0A3F\u0A06\u0A30\u0A25\u0A40 1 / Student 1",
    2: "Gian",
    3: "Gurdeep",
    4: "Gagan"
  };
  var AVATARS = [
    { id: "atom", icon: "\u269B\uFE0F", label: "Atom" },
    { id: "flask", icon: "\uD83E\uDDEA", label: "Flask" },
    { id: "microscope", icon: "\uD83D\uDD2C", label: "Microscope" },
    { id: "leaf", icon: "\uD83C\uDF3F", label: "Leaf" },
    { id: "magnet", icon: "\uD83E\uDDF2", label: "Magnet" },
    { id: "dna", icon: "\uD83E\uDDEC", label: "DNA" },
    { id: "bolt", icon: "\u26A1", label: "Bolt" },
    { id: "rocket", icon: "\uD83D\uDE80", label: "Rocket" }
  ];
  /* Keys that describe the device, not the learner. */
  var GLOBAL_KEYS = [REGISTRY_KEY, "bolo.bmc.seen.v1", "bolo_abim_disclaimer_accepted"];
  /* Copied into a newly created slot so the app keeps its current look. */
  var INHERITED_KEYS = ["bolo.theme.v1", "pseb.decktheme.v1", "pseb.fontscale.v1"];
  var DEFAULT_CHAPTER_COUNT = 16;

  /* ---------------- native storage access ---------------- */
  var ls = null;
  try { ls = window.localStorage; } catch (e) { ls = null; }
  var proto = window.Storage && window.Storage.prototype;
  var nGet = proto && proto.getItem;
  var nSet = proto && proto.setItem;
  var nRemove = proto && proto.removeItem;
  var nKey = proto && proto.key;

  function rawGet(key) {
    if (!ls) return null;
    try { return nGet.call(ls, key); } catch (e) { return null; }
  }
  function rawSet(key, value) {
    if (!ls) return false;
    try { nSet.call(ls, key, String(value)); return true; } catch (e) { return false; }
  }
  function rawRemove(key) {
    if (!ls) return;
    try { nRemove.call(ls, key); } catch (e) {}
  }
  function rawKeys() {
    var out = [];
    if (!ls) return out;
    try {
      for (var i = 0; i < ls.length; i++) {
        var k = nKey.call(ls, i);
        if (k != null) out.push(k);
      }
    } catch (e) {}
    return out;
  }

  /* ---------------- key routing ---------------- */
  var SLOT_PREFIX_RE = /^bolo_slot_([1-4])::/;

  function isScoped(key) {
    if (typeof key !== "string") return false;
    if (GLOBAL_KEYS.indexOf(key) !== -1) return false;
    if (key.indexOf("bolo_slot_") === 0) return false;
    return key.indexOf("pseb.") === 0 || key.indexOf("bolo.") === 0 || key.indexOf("bolo_") === 0;
  }
  function slotPrefix(slotId) { return "bolo_slot_" + slotId + "::"; }
  function physicalKey(key, slotId) {
    if (!isScoped(key)) return key;
    var id = slotId == null ? pageSlotId : slotId;
    return id === 1 ? key : slotPrefix(id) + key;
  }
  /* Every physical key currently stored for a slot, as {logical: physical}. */
  function slotKeyMap(slotId) {
    var map = {};
    rawKeys().forEach(function (k) {
      if (slotId === 1) {
        if (isScoped(k)) map[k] = k;
      } else {
        var p = slotPrefix(slotId);
        if (k.indexOf(p) === 0 && isScoped(k.slice(p.length))) map[k.slice(p.length)] = k;
      }
    });
    return map;
  }
  function clearSlotData(slotId) {
    var map = slotKeyMap(slotId);
    Object.keys(map).forEach(function (k) { rawRemove(map[k]); });
    idbPurgeSlot(slotId);
  }

  /* ---------------- IndexedDB mirror housekeeping ----------------
     pwa.js restores mirrored keys that vanish from localStorage. Erased or
     overwritten slots must therefore be purged there too, or old progress
     would be "restored" into a fresh profile on the next boot. */
  var idbPromise = null;
  function idbOpen() {
    if (idbPromise) return idbPromise;
    idbPromise = new Promise(function (resolve, reject) {
      if (!("indexedDB" in window)) { reject(new Error("no-idb")); return; }
      var req;
      try { req = indexedDB.open("bolo-instinct", 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains("kv")) req.result.createObjectStore("kv");
      };
      req.onblocked = function () { reject(new Error("idb-blocked")); };
      req.onsuccess = function () {
        var db = req.result;
        db.onversionchange = function () { db.close(); idbPromise = null; };
        resolve(db);
      };
      req.onerror = function () { reject(req.error); };
    });
    idbPromise["catch"](function () { idbPromise = null; });
    return idbPromise;
  }
  function idbPut(key, value) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction("kv", "readwrite");
        tx.objectStore("kv").put(value, key);
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
      });
    })["catch"](function () { return false; });
  }
  function idbGetValue(key) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve) {
        var req = db.transaction("kv", "readonly").objectStore("kv").get(key);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { resolve(undefined); };
      });
    })["catch"](function () { return undefined; });
  }
  function idbPurgeSlot(slotId) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction("kv", "readwrite");
        var req = tx.objectStore("kv").openCursor();
        req.onsuccess = function () {
          var cur = req.result;
          if (!cur) return;
          var k = String(cur.key);
          var m = SLOT_PREFIX_RE.exec(k);
          var owner = m ? parseInt(m[1], 10) : (isScoped(k) ? 1 : 0);
          if (owner === slotId) cur["delete"]();
          cur["continue"]();
        };
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
      });
    })["catch"](function () { return false; });
  }
  function mirroredKeys() {
    return (window.PSEB_STORE && window.PSEB_STORE.keys) || [
      "pseb.progress.v1", "pseb.last.v1", "pseb.bookmarks.v1", "pseb.study.v1",
      "pseb.fontscale.v1", "pseb.decktheme.v1", "bolo.theme.v1",
      "bolo_mcq_v1", "bolo_mcq_attempts_v1", "bolo_mcq_history_v1"
    ];
  }

  /* ---------------- registry ---------------- */
  var registry = null;
  var freshRegistry = false;
  /* A fresh registry must not overwrite the IndexedDB backup until that
     backup has been checked (it may be all that survived an eviction). */
  var idbHold = false;
  var registryReady = null;
  var pageSlotId = 1;
  var suspended = false;

  function nowIso() { return new Date().toISOString(); }
  function isSlotId(v) { return v === 1 || v === 2 || v === 3 || v === 4; }
  function avatarIcon(id) {
    for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i].id === id) return AVATARS[i].icon;
    return AVATARS[0].icon;
  }
  function validAvatar(id) {
    for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i].id === id) return id;
    return AVATARS[0].id;
  }
  function cleanName(name, slotId) {
    var s = String(name == null ? "" : name).replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim();
    if (s.length > MAX_STORED_NAME) s = s.slice(0, MAX_STORED_NAME).trim();
    return s || defaultName(slotId);
  }
  function defaultName(slotId) {
    return DEFAULT_NAMES[slotId] || ("Student " + slotId);
  }
  function emptyStats() {
    return { chaptersStarted: 0, chaptersCompleted: 0, totalBookmarks: 0, streakDays: 0, percent: 0 };
  }
  function makeMeta(slotId, opts) {
    opts = opts || {};
    var t = nowIso();
    return {
      id: slotId,
      name: cleanName(opts.name, slotId),
      avatar: validAvatar(opts.avatar),
      createdDate: opts.createdDate || t,
      lastActive: opts.lastActive || t,
      theme: typeof opts.theme === "string" ? opts.theme : "",
      lang: opts.lang === "en" ? "en" : "pa",
      stats: emptyStats()
    };
  }
  function sanitizeMeta(m, slotId) {
    if (!m || typeof m !== "object") return null;
    var meta = makeMeta(slotId, m);
    if (m.stats && typeof m.stats === "object") {
      Object.keys(meta.stats).forEach(function (k) {
        var v = Number(m.stats[k]);
        if (isFinite(v) && v >= 0) meta.stats[k] = Math.round(v);
      });
    }
    return meta;
  }
  function parseRegistry(raw) {
    var r;
    try { r = JSON.parse(raw); } catch (e) { return null; }
    if (!r || typeof r !== "object" || r.version !== 1 || !r.slots) return null;
    var out = { version: 1, activeSlotId: isSlotId(r.activeSlotId) ? r.activeSlotId : 1, slots: {} };
    SLOT_IDS.forEach(function (id) { out.slots[id] = sanitizeMeta(r.slots[id], id); });
    return out;
  }
  function saveRegistry() {
    var raw = JSON.stringify(registry);
    rawSet(REGISTRY_KEY, raw);
    if (!idbHold) idbPut(REGISTRY_KEY, raw);
  }
  function firstPopulated(exclude) {
    for (var i = 0; i < SLOT_IDS.length; i++) {
      if (SLOT_IDS[i] !== exclude && registry.slots[SLOT_IDS[i]]) return SLOT_IDS[i];
    }
    return 0;
  }
  function hasLegacyData() {
    return rawKeys().some(function (k) { return isScoped(k); });
  }

  /* Reads the registry; on first run wraps any legacy single-profile data
     into Slot 1 (its keys are already Slot 1's keys — nothing to move). */
  function initRegistry() {
    var parsed = parseRegistry(rawGet(REGISTRY_KEY));
    if (!parsed) {
      freshRegistry = true;
      idbHold = true;
      var legacy = hasLegacyData();
      parsed = { version: 1, activeSlotId: 1, slots: { 1: null, 2: null, 3: null, 4: null } };
      parsed.slots[1] = makeMeta(1, {
        name: legacy ? "\u0A2E\u0A41\u0A71\u0A16 \u0A2A\u0A4D\u0A30\u0A4B\u0A2B\u0A3E\u0A08\u0A32 / Main Profile" : "",
        theme: themeOf(1),
        lang: rawGet("pseb.lang.v1") === "en" ? "en" : "pa"
      });
    }
    registry = parsed;
    if (!registry.slots[registry.activeSlotId]) {
      var alt = firstPopulated(0);
      if (alt) registry.activeSlotId = alt;
      else registry.slots[registry.activeSlotId] = makeMeta(registry.activeSlotId, {});
    }
    registry.slots[registry.activeSlotId].lastActive = nowIso();
    saveRegistry();
    return registry;
  }
  function reloadRegistry() {
    var parsed = parseRegistry(rawGet(REGISTRY_KEY));
    if (parsed) registry = parsed;
    return registry;
  }

  /* pwa.js calls this after an eviction wiped localStorage but IndexedDB
     still holds the previous registry. The page keeps its current slot. */
  function restoreRegistry(raw) {
    var parsed = parseRegistry(raw);
    if (!parsed) return false;
    if (!parsed.slots[pageSlotId]) parsed.slots[pageSlotId] = registry.slots[pageSlotId];
    parsed.activeSlotId = pageSlotId;
    registry = parsed;
    freshRegistry = false;
    idbHold = false;
    saveRegistry();
    return true;
  }
  /* Resolves once the registry is settled: on a fresh registry, adopt the
     IndexedDB backup if one exists, otherwise publish the new registry. */
  function settleRegistry() {
    if (!idbHold) return Promise.resolve(registry);
    return idbGetValue(REGISTRY_KEY).then(function (raw) {
      if (!(typeof raw === "string" && raw.length && restoreRegistry(raw))) {
        idbHold = false;
        saveRegistry();
      }
      return registry;
    });
  }

  /* ---------------- per-slot data & stats ---------------- */
  function readSlotJson(slotId, key) {
    var raw = rawGet(slotId === 1 ? key : slotPrefix(slotId) + key);
    if (!raw) return {};
    try { var v = JSON.parse(raw); return v && typeof v === "object" ? v : {}; } catch (e) { return {}; }
  }
  function themeOf(slotId) {
    var t = readSlotJson(slotId, "bolo.theme.v1");
    return typeof t.theme === "string" ? t.theme : "";
  }
  function chapterList() {
    var cat = window.PSEB_CHAPTERS;
    if (cat && cat.length) {
      return cat.map(function (c) { return { id: String(c.n), slides: c.slides }; });
    }
    var out = [];
    for (var i = 1; i <= DEFAULT_CHAPTER_COUNT; i++) out.push({ id: String(i), slides: 0 });
    return out;
  }
  function chapterPct(p, slides) {
    if (!p) return 0;
    if (p.done) return 100;
    var total = p.total || slides;
    if (typeof p.lastSlide === "number" && total) {
      return Math.max(1, Math.min(99, Math.round(((p.lastSlide + 1) / total) * 100)));
    }
    return p.visited ? 5 : 0;
  }
  function dayKey(d) {
    var mo = d.getMonth() + 1, da = d.getDate();
    return d.getFullYear() + "-" + (mo < 10 ? "0" : "") + mo + "-" + (da < 10 ? "0" : "") + da;
  }
  function computeStreak(days) {
    if (!days) return 0;
    var d = new Date();
    if (!days[dayKey(d)]) { d.setDate(d.getDate() - 1); if (!days[dayKey(d)]) return 0; }
    var n = 0;
    while (days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function computeStats(slotId) {
    var progress = readSlotJson(slotId, "pseb.progress.v1");
    var bookmarks = readSlotJson(slotId, "pseb.bookmarks.v1");
    var study = readSlotJson(slotId, "pseb.study.v1");
    var chapters = chapterList();
    var s = emptyStats();
    var sum = 0;
    chapters.forEach(function (c) {
      var p = progress[c.id];
      if (p && (p.visited || p.done || typeof p.lastSlide === "number")) s.chaptersStarted++;
      if (p && p.done) s.chaptersCompleted++;
      sum += chapterPct(p, c.slides);
    });
    s.percent = chapters.length ? Math.round(sum / chapters.length) : 0;
    Object.keys(bookmarks).forEach(function (k) {
      if (Array.isArray(bookmarks[k])) s.totalBookmarks += bookmarks[k].length;
    });
    s.streakDays = computeStreak(study.days);
    return s;
  }
  function recentActivity(slotId) {
    var last = rawGet(physicalKey("pseb.last.v1", slotId));
    if (!last) return null;
    var p = readSlotJson(slotId, "pseb.progress.v1")[last] || {};
    return {
      chapter: parseInt(last, 10) || 0,
      slide: typeof p.lastSlide === "number" ? p.lastSlide + 1 : 0,
      done: !!p.done
    };
  }
  function refreshStats(slotId) {
    reloadRegistry();
    var meta = registry.slots[slotId];
    if (!meta) return null;
    meta.stats = computeStats(slotId);
    meta.theme = themeOf(slotId) || meta.theme;
    var lang = rawGet(physicalKey("pseb.lang.v1", slotId));
    if (lang === "en" || lang === "pa") meta.lang = lang;
    saveRegistry();
    return meta;
  }

  /* Spec-shaped view of a slot's learning data (derived from the live keys). */
  function slotPayload(slotId) {
    var progress = readSlotJson(slotId, "pseb.progress.v1");
    var bookmarks = readSlotJson(slotId, "pseb.bookmarks.v1");
    var chapterProgress = {};
    Object.keys(progress).forEach(function (id) {
      var p = progress[id] || {};
      chapterProgress[id] = {
        currentSlide: typeof p.lastSlide === "number" ? p.lastSlide : 0,
        isCompleted: !!p.done,
        lastAccessed: p.lastAccessed || "",
        bookmarks: Array.isArray(bookmarks[id]) ? bookmarks[id].slice() : [],
        quizScores: p.quizScores && typeof p.quizScores === "object" ? p.quizScores : {}
      };
    });
    return { slotId: slotId, chapterProgress: chapterProgress, keys: slotKeyMap(slotId) };
  }

  /* ---------------- events & page pinning ---------------- */
  function emit(name, detail) {
    var ev;
    try {
      ev = new CustomEvent(name, { detail: detail, cancelable: true });
    } catch (e) {
      ev = document.createEvent("CustomEvent");
      ev.initCustomEvent(name, false, true, detail);
    }
    return window.dispatchEvent(ev);
  }
  function announceSwitch(reason) {
    reloadRegistry();
    var detail = {
      slotId: registry.activeSlotId,
      previousSlotId: pageSlotId,
      reason: reason,
      slot: registry.slots[registry.activeSlotId]
    };
    if (emit("bolo:slotChanged", detail)) {
      /* Writes from the old page must not land in the next profile. */
      suspended = true;
      setTimeout(function () { location.reload(); }, 60);
    }
  }

  /* ---------------- slot operations ---------------- */
  function getRegistry() { return JSON.parse(JSON.stringify(reloadRegistry())); }
  function getActiveSlot() {
    reloadRegistry();
    var id = registry.activeSlotId;
    return { id: id, meta: registry.slots[id], data: slotPayload(id) };
  }
  function switchSlot(targetSlotId) {
    targetSlotId = Number(targetSlotId);
    if (!isSlotId(targetSlotId)) throw new Error("Invalid slot");
    reloadRegistry();
    if (!registry.slots[targetSlotId]) throw new Error("Slot " + targetSlotId + " is empty");
    registry.activeSlotId = targetSlotId;
    registry.slots[targetSlotId].lastActive = nowIso();
    saveRegistry();
    if (targetSlotId !== pageSlotId) announceSwitch("switch");
    return registry.slots[targetSlotId];
  }
  function createSlot(slotId, opts) {
    slotId = Number(slotId);
    if (!isSlotId(slotId)) throw new Error("Slot must be 1\u20134");
    reloadRegistry();
    if (registry.slots[slotId]) throw new Error("Slot " + slotId + " is already in use");
    opts = opts || {};
    clearSlotData(slotId);
    /* Keep the device's current look for the new learner. */
    INHERITED_KEYS.forEach(function (k) {
      var v = rawGet(physicalKey(k));
      if (v != null) {
        rawSet(physicalKey(k, slotId), v);
        if (mirroredKeys().indexOf(k) !== -1) idbPut(physicalKey(k, slotId), v);
      }
    });
    var lang = opts.lang === "en" ? "en" : "pa";
    rawSet(physicalKey("pseb.lang.v1", slotId), lang);
    var meta = makeMeta(slotId, {
      name: opts.name, avatar: opts.avatar, lang: lang,
      theme: typeof opts.theme === "string" ? opts.theme : themeOf(slotId)
    });
    registry.slots[slotId] = meta;
    saveRegistry();
    return meta;
  }
  function eraseSlot(slotId) {
    slotId = Number(slotId);
    if (!isSlotId(slotId)) throw new Error("Invalid slot");
    reloadRegistry();
    clearSlotData(slotId);
    registry.slots[slotId] = null;
    var wasActive = registry.activeSlotId === slotId;
    if (wasActive) {
      var next = 0;
      for (var i = 1; i <= 4 && !next; i++) {
        var cand = ((slotId - 1 + i) % 4) + 1;
        if (registry.slots[cand]) next = cand;
      }
      if (!next) {
        next = 1;
        registry.slots[1] = makeMeta(1, {});
      }
      registry.activeSlotId = next;
      registry.slots[next].lastActive = nowIso();
    }
    saveRegistry();
    /* The page's own profile is gone: nothing it still holds may be saved. */
    if (slotId === pageSlotId) suspended = true;
    if (slotId === pageSlotId || registry.activeSlotId !== pageSlotId) announceSwitch("erase");
    return registry;
  }
  function renameSlot(slotId, opts) {
    slotId = Number(slotId);
    if (!isSlotId(slotId)) throw new Error("Invalid slot");
    opts = opts || {};
    reloadRegistry();
    var meta = registry.slots[slotId];
    if (!meta) throw new Error("Slot " + slotId + " is empty");
    if (opts.name != null) meta.name = cleanName(opts.name, slotId);
    if (opts.avatar != null) meta.avatar = validAvatar(opts.avatar);
    saveRegistry();
    emit("bolo:slotUpdated", { slotId: slotId, slot: meta });
    return meta;
  }

  /* Programmatic progress write for the active slot, stored in the same keys
     the decks use so every screen agrees. */
  function updateProgress(chapterId, upd) {
    upd = upd || {};
    var id = String(chapterId);
    var all = readSlotJson(pageSlotId, "pseb.progress.v1");
    var p = all[id] || {};
    p.visited = true;
    p.lastAccessed = nowIso();
    if (typeof upd.currentSlide === "number" && upd.currentSlide >= 0) p.lastSlide = Math.floor(upd.currentSlide);
    if (typeof upd.isCompleted === "boolean") p.done = upd.isCompleted;
    if (upd.quizResult && typeof upd.quizResult === "object") {
      var q = upd.quizResult;
      p.quizScores = p.quizScores || {};
      p.quizScores[String(q.quizId || "quiz")] = {
        score: Number(q.score) || 0, maxScore: Number(q.maxScore) || 0, date: nowIso()
      };
    }
    all[id] = p;
    localStorage.setItem("pseb.progress.v1", JSON.stringify(all));
    localStorage.setItem("pseb.last.v1", id);
    if (Array.isArray(upd.bookmarks)) {
      var b = readSlotJson(pageSlotId, "pseb.bookmarks.v1");
      b[id] = upd.bookmarks.filter(function (n) { return typeof n === "number"; });
      localStorage.setItem("pseb.bookmarks.v1", JSON.stringify(b));
    }
    return refreshStats(pageSlotId);
  }

  /* ---------------- export / import ---------------- */
  function bundleSlot(slotId) {
    var meta = refreshStats(slotId);
    if (!meta) return null;
    var map = slotKeyMap(slotId);
    var data = {};
    Object.keys(map).sort().forEach(function (k) { data[k] = rawGet(map[k]); });
    return { meta: meta, data: data };
  }
  function fileSafe(s) {
    var out = String(s || "").split(" / ")[0].replace(/[^\w\u0A00-\u0A7F-]+/g, "_").replace(/^_+|_+$/g, "");
    return out || "profile";
  }
  function download(filename, obj) {
    var json = JSON.stringify(obj, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 1500);
    return json;
  }
  function exportSlot(slotId) {
    slotId = Number(slotId);
    var b = bundleSlot(slotId);
    if (!b) throw new Error("Slot " + slotId + " is empty");
    var file = { format: FILE_FORMAT, version: 1, kind: "slot", exportedAt: nowIso(), slots: [b] };
    download("bolo_slot_" + slotId + "_" + fileSafe(b.meta.name) + ".json", file);
    return file;
  }
  function exportCard() {
    var slots = [];
    reloadRegistry();
    SLOT_IDS.forEach(function (id) {
      if (registry.slots[id]) slots.push(bundleSlot(id));
    });
    var file = {
      format: FILE_FORMAT, version: 1, kind: "card", exportedAt: nowIso(),
      activeSlotId: registry.activeSlotId, slots: slots
    };
    var d = new Date();
    download("bolo_memory_card_" + dayKey(d) + ".json", file);
    return file;
  }
  function parseFile(jsonString) {
    var f;
    try { f = typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString; }
    catch (e) { throw new Error("Not a valid save file (JSON could not be read)"); }
    if (!f || f.format !== FILE_FORMAT || f.version !== 1 || !Array.isArray(f.slots) ||
      !f.slots.length || f.slots.length > 4) {
      throw new Error("Not a BOLO.INSTINCT memory card file");
    }
    f.slots.forEach(function (s, i) {
      if (!s || typeof s !== "object" || !s.meta || typeof s.meta !== "object" ||
        typeof s.meta.name !== "string" || !s.data || typeof s.data !== "object" || Array.isArray(s.data)) {
        throw new Error("Save block " + (i + 1) + " is damaged");
      }
      Object.keys(s.data).forEach(function (k) {
        if (!isScoped(k)) throw new Error("Save block " + (i + 1) + " contains an unknown key");
        var v = s.data[k];
        if (v == null) delete s.data[k];
        else if (typeof v !== "string") s.data[k] = JSON.stringify(v);
      });
    });
    return f;
  }
  function writeBlock(slotId, block) {
    clearSlotData(slotId);
    var mirrored = mirroredKeys();
    Object.keys(block.data).forEach(function (k) {
      var phys = physicalKey(k, slotId);
      if (!rawSet(phys, block.data[k])) throw new Error("Device storage is full \u2014 nothing was changed");
      if (mirrored.indexOf(k) !== -1) idbPut(phys, block.data[k]);
    });
    var meta = sanitizeMeta(block.meta, slotId);
    meta.lastActive = nowIso();
    registry.slots[slotId] = meta;
    meta.stats = computeStats(slotId);
  }
  /* Raw copy of slots so a failed import (quota) can be undone. */
  function snapshotSlots(ids) {
    return ids.map(function (id) {
      var map = slotKeyMap(id);
      var data = {};
      Object.keys(map).forEach(function (k) { data[k] = rawGet(map[k]); });
      return { id: id, meta: registry.slots[id], data: data };
    });
  }
  function restoreSnapshot(snap) {
    snap.forEach(function (s) { clearSlotData(s.id); registry.slots[s.id] = null; });
    snap.forEach(function (s) {
      if (!s.meta) return;
      var mirrored = mirroredKeys();
      Object.keys(s.data).forEach(function (k) {
        var phys = physicalKey(k, s.id);
        rawSet(phys, s.data[k]);
        if (mirrored.indexOf(k) !== -1) idbPut(phys, s.data[k]);
      });
      registry.slots[s.id] = s.meta;
    });
  }
  function importSlot(targetSlotId, jsonString) {
    targetSlotId = Number(targetSlotId);
    if (!isSlotId(targetSlotId)) throw new Error("Invalid slot");
    var f = parseFile(jsonString);
    reloadRegistry();
    var snap = snapshotSlots([targetSlotId]);
    try {
      writeBlock(targetSlotId, f.slots[0]);
    } catch (err) {
      restoreSnapshot(snap);
      saveRegistry();
      throw err;
    }
    saveRegistry();
    if (targetSlotId === pageSlotId) announceSwitch("import");
    return registry.slots[targetSlotId];
  }
  function importCard(jsonString) {
    var f = parseFile(jsonString);
    reloadRegistry();
    var snap = snapshotSlots(SLOT_IDS);
    var prevActive = registry.activeSlotId;
    try {
      SLOT_IDS.forEach(function (id) { clearSlotData(id); registry.slots[id] = null; });
      f.slots.forEach(function (block) {
        var id = isSlotId(block.meta.id) && !registry.slots[block.meta.id] ? block.meta.id : 0;
        if (!id) { for (var j = 1; j <= 4 && !id; j++) if (!registry.slots[j]) id = j; }
        writeBlock(id, block);
      });
    } catch (err) {
      restoreSnapshot(snap);
      registry.activeSlotId = prevActive;
      saveRegistry();
      throw err;
    }
    var act = isSlotId(f.activeSlotId) && registry.slots[f.activeSlotId] ? f.activeSlotId : firstPopulated(0);
    registry.activeSlotId = act;
    saveRegistry();
    announceSwitch("import");
    return registry;
  }

  /* ---------------- storage interception ---------------- */
  var statsTimer = null;
  function scheduleStats() {
    if (statsTimer) return;
    statsTimer = setTimeout(function () {
      statsTimer = null;
      if (!suspended) {
        var meta = refreshStats(pageSlotId);
        if (meta) { meta.lastActive = nowIso(); saveRegistry(); }
        emit("bolo:slotUpdated", { slotId: pageSlotId, slot: meta });
      }
    }, 2500);
  }

  function installRouting() {
    if (!ls || !proto || proto.__boloMemcard) return;
    proto.getItem = function (key) {
      if (this === ls && isScoped(key)) return nGet.call(this, physicalKey(key));
      return nGet.apply(this, arguments);
    };
    proto.setItem = function (key, value) {
      if (this === ls && isScoped(key)) {
        if (suspended) return;
        nSet.call(this, physicalKey(key), value);
        scheduleStats();
        return;
      }
      return nSet.apply(this, arguments);
    };
    proto.removeItem = function (key) {
      if (this === ls && isScoped(key)) {
        if (suspended) return;
        return nRemove.call(this, physicalKey(key));
      }
      return nRemove.apply(this, arguments);
    };
    proto.__boloMemcard = true;
  }

  /* Another tab switched profile: this page's state belongs to the old one. */
  window.addEventListener("storage", function (e) {
    if (e.key !== REGISTRY_KEY || e.storageArea !== ls) return;
    var parsed = parseRegistry(e.newValue);
    if (!parsed) return;
    registry = parsed;
    if (parsed.activeSlotId !== pageSlotId || !parsed.slots[pageSlotId]) {
      announceSwitch("external");
    } else {
      emit("bolo:slotUpdated", { slotId: pageSlotId, slot: parsed.slots[pageSlotId] });
    }
  });

  /* ---------------- boot ---------------- */
  if (ls && nGet) {
    initRegistry();
    pageSlotId = registry.activeSlotId;
    installRouting();
    registryReady = settleRegistry();
  } else {
    registry = { version: 1, activeSlotId: 1, slots: { 1: makeMeta(1, {}), 2: null, 3: null, 4: null } };
    registryReady = Promise.resolve(registry);
  }
  document.documentElement.setAttribute("data-memcard-slot", String(pageSlotId));

  window.BOLO_MEMCARD = {
    REGISTRY_KEY: REGISTRY_KEY,
    AVATARS: AVATARS,
    available: !!(ls && nGet),
    initRegistry: initRegistry,
    getRegistry: getRegistry,
    getActiveSlot: getActiveSlot,
    pageSlotId: function () { return pageSlotId; },
    switchSlot: switchSlot,
    createSlot: createSlot,
    eraseSlot: eraseSlot,
    renameSlot: renameSlot,
    updateProgress: updateProgress,
    exportSlot: exportSlot,
    exportCard: exportCard,
    importSlot: importSlot,
    importCard: importCard,
    parseFile: parseFile,
    computeStats: computeStats,
    refreshStats: refreshStats,
    recentActivity: recentActivity,
    avatarIcon: avatarIcon,
    isScoped: isScoped,
    physicalKey: physicalKey,
    slotKeys: function (slotId) { return Object.keys(slotKeyMap(Number(slotId))); },
    populatedSlotIds: function () {
      reloadRegistry();
      return SLOT_IDS.filter(function (id) { return !!registry.slots[id]; });
    },
    wasFresh: function () { return freshRegistry; },
    ready: function () { return registryReady; },
    isSuspended: function () { return suspended; },
    restoreRegistry: restoreRegistry,
    rawGet: rawGet,
    rawSet: rawSet
  };

  /* =====================================================================
     UI — navbar pill + Memory Card manager modal
     ===================================================================== */
  function scriptRoot() {
    var el = document.currentScript;
    if (!el) {
      var all = document.getElementsByTagName("script");
      for (var i = all.length - 1; i >= 0; i--) {
        if ((all[i].src || "").indexOf("assets/memory-card.js") !== -1) { el = all[i]; break; }
      }
    }
    if (!el || !el.src) return "";
    return el.src.replace(/memory-card\.js(?:\?.*)?$/, "");
  }
  var ASSET_ROOT = scriptRoot();
  var MC = window.BOLO_MEMCARD;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function timeAgo(iso) {
    var t = Date.parse(iso);
    if (!t) return "";
    var s = Math.max(0, Math.round((Date.now() - t) / 1000));
    if (s < 60) return "just now";
    var m = Math.round(s / 60);
    if (m < 60) return m + (m === 1 ? " minute ago" : " minutes ago");
    var h = Math.round(m / 60);
    if (h < 24) return h + (h === 1 ? " hour ago" : " hours ago");
    var d = Math.round(h / 24);
    if (d < 30) return d + (d === 1 ? " day ago" : " days ago");
    return new Date(t).toLocaleDateString();
  }

  var cssLoaded = false;
  function ensureCss() {
    if (cssLoaded || document.getElementById("bolo-memcard-css")) { cssLoaded = true; return; }
    var link = document.createElement("link");
    link.id = "bolo-memcard-css";
    link.rel = "stylesheet";
    link.href = ASSET_ROOT + "memory-card.css";
    (document.head || document.documentElement).appendChild(link);
    cssLoaded = true;
  }

  var overlay = null, grid = null, summaryEl = null, statusEl = null, fileInput = null;
  var lastFocus = null;
  var pickImport = null; /* parsed single-slot file awaiting a target */
  var formSlot = 0, formMode = "create";
  var eraseArm = 0, eraseTimer = null;

  function shortName(name) { return String(name || "").split(" / ")[0]; }

  function refreshPills() {
    var reg = MC.getRegistry();
    var meta = reg.slots[pageSlotId];
    var nodes = document.querySelectorAll(".memory-card-pill, [data-memcard-open]");
    Array.prototype.forEach.call(nodes, function (btn) {
      var nameEl = btn.querySelector("#active-slot-name, .mc-pill-name");
      var slotEl = btn.querySelector(".mc-pill-slot");
      if (slotEl) slotEl.textContent = "S" + pageSlotId;
      if (nameEl) nameEl.textContent = meta ? shortName(meta.name) : "Slot " + pageSlotId;
      var label = "Memory card \u00b7 Slot " + pageSlotId + (meta ? ": " + meta.name : "") + ". Switch learner profile";
      btn.setAttribute("aria-label", label);
      btn.title = label;
    });
  }

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.className = "mc-status" + (kind ? " is-" + kind : "");
  }

  function avatarPicker(selected) {
    return '<div class="mc-avatars" role="radiogroup" aria-label="Avatar">' +
      AVATARS.map(function (a, i) {
        var on = a.id === selected || (!selected && i === 0);
        return '<label class="mc-avatar-opt" title="' + a.label + '">' +
          '<input type="radio" name="mc-avatar" value="' + a.id + '"' + (on ? " checked" : "") + '>' +
          '<span aria-hidden="true">' + a.icon + '</span><span class="sr-only">' + a.label + "</span></label>";
      }).join("") + "</div>";
  }

  function nameForm(id, meta) {
    var renaming = !!meta;
    var badge = '<span class="mc-badge">SLOT ' + pad2(id) + "</span>";
    var value = renaming ? meta.name : defaultName(id);
    var max = Math.max(MAX_NAME, value.length);
    return '<article class="mc-slot is-form' + (renaming ? "" : " is-empty") + (renaming && id === pageSlotId ? " is-active" : "") + '" data-slot="' + id + '">' +
      '<form class="mc-form" data-slot="' + id + '" data-mc-mode="' + (renaming ? "rename" : "create") + '">' +
      '<div class="mc-slot-head">' + badge + '<span class="mc-name">' +
      (renaming ? "Rename \u00b7 \u0A28\u0A3E\u0A2E \u0A2C\u0A26\u0A32\u0A4B" : "New save \u00b7 \u0A28\u0A35\u0A3E\u0A02 \u0A38\u0A32\u0A3E\u0A1F") + "</span></div>" +
      '<label class="mc-field"><span>Name \u00b7 \u0A28\u0A3E\u0A2E</span>' +
      '<input type="text" name="name" maxlength="' + max + '" autocomplete="off" spellcheck="false" value="' + esc(value) + '" placeholder="' + esc(defaultName(id)) + '"></label>' +
      avatarPicker(renaming ? meta.avatar : "") +
      (renaming ? "" :
        '<div class="mc-langs" role="radiogroup" aria-label="Reading language">' +
        '<label><input type="radio" name="lang" value="pa" checked> \u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40</label>' +
        '<label><input type="radio" name="lang" value="en"> English</label></div>') +
      '<div class="mc-actions">' +
      '<button type="submit" class="mc-btn mc-primary">' + (renaming ? "\u2714 Save name" : "\u2714 Create &amp; load") + "</button>" +
      '<button type="button" class="mc-btn" data-act="cancel-form">Cancel</button></div>' +
      "</form></article>";
  }

  function slotHtml(id, meta) {
    var badge = '<span class="mc-badge">SLOT ' + pad2(id) + "</span>";
    if (pickImport) {
      return '<article class="mc-slot is-pick' + (meta ? "" : " is-empty") + '" data-slot="' + id + '">' +
        '<div class="mc-slot-head">' + badge + (meta ? '<span class="mc-avatar" aria-hidden="true">' + avatarIcon(meta.avatar) + '</span><span class="mc-name">' + esc(meta.name) + "</span>" : '<span class="mc-name mc-muted">Empty \u00b7 \u0A16\u0A3E\u0A32\u0A40</span>') + "</div>" +
        (meta ? '<p class="mc-warn">Overwrites this save \u00b7 \u0A07\u0A39 \u0A38\u0A47\u0A35 \u0A2C\u0A26\u0A32 \u0A1C\u0A3E\u0A35\u0A47\u0A17\u0A40</p>' : "") +
        '<button type="button" class="mc-btn mc-primary" data-act="import-here" data-slot="' + id + '">\uD83D\uDCE5 Import here \u00b7 \u0A07\u0A71\u0A25\u0A47 \u0A32\u0A4B\u0A21 \u0A15\u0A30\u0A4B</button>' +
        "</article>";
    }
    if (formSlot === id && (formMode === "rename") === !!meta) return nameForm(id, meta);
    if (!meta) {
      return '<article class="mc-slot is-empty" data-slot="' + id + '">' +
        '<div class="mc-slot-head">' + badge + '<span class="mc-name mc-muted">' + esc(defaultName(id)) + "</span></div>" +
        '<button type="button" class="mc-create" data-act="create" data-slot="' + id + '">' +
        '<span class="mc-plus" aria-hidden="true">+</span>' +
        "<span>Create Save Slot</span><span class=\"mc-pa\">\u0A28\u0A35\u0A3E\u0A02 \u0A38\u0A32\u0A3E\u0A1F \u0A2C\u0A23\u0A3E\u0A13</span></button>" +
        "</article>";
    }
    var st = MC.computeStats(id);
    var act = MC.recentActivity(id);
    var isActive = id === pageSlotId;
    var recent = act && act.chapter
      ? "Ch " + pad2(act.chapter) + (act.done ? ": Completed" : act.slide ? ": Slide " + act.slide : ": Started")
      : "No chapters yet \u00b7 \u0A05\u0A1C\u0A47 \u0A15\u0A4B\u0A08 \u0A05\u0A27\u0A3F\u0A06\u0A07 \u0A28\u0A39\u0A40\u0A02";
    var armed = eraseArm === id;
    return '<article class="mc-slot' + (isActive ? " is-active" : "") + '" data-slot="' + id + '">' +
      '<div class="mc-slot-head">' + badge +
      '<span class="mc-avatar" aria-hidden="true">' + avatarIcon(meta.avatar) + "</span>" +
      '<span class="mc-name" lang="' + (/[\u0A00-\u0A7F]/.test(meta.name) ? "pa" : "en") + '">' + esc(meta.name) + "</span>" +
      (isActive ? '<span class="mc-live">IN USE</span>' : "") +
      '<button type="button" class="mc-rename" data-act="rename" data-slot="' + id + '" title="Rename \u00b7 \u0A28\u0A3E\u0A2E \u0A2C\u0A26\u0A32\u0A4B" aria-label="Rename slot ' + id + '">\u270F\uFE0F</button>' +
      "</div>" +
      '<div class="mc-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + st.percent + '" aria-label="Syllabus progress">' +
      '<div class="mc-meter-fill" style="width:' + st.percent + '%"></div></div>' +
      '<div class="mc-meta-row"><span><strong>' + st.percent + "%</strong> syllabus</span>" +
      "<span>" + st.chaptersCompleted + "/" + chapterList().length + " done</span>" +
      "<span>\u2605 " + st.totalBookmarks + "</span>" +
      "<span>\uD83D\uDD25 " + st.streakDays + "d</span></div>" +
      '<p class="mc-recent">' + esc(recent) + ' <span class="mc-muted">\u00b7 ' + esc(timeAgo(meta.lastActive)) + "</span></p>" +
      '<div class="mc-actions">' +
      '<button type="button" class="mc-btn mc-primary' + (isActive ? " is-current" : "") + '" data-act="load" data-slot="' + id + '"' + (isActive ? ' aria-pressed="true"' : "") + ">" +
      (isActive ? "\u25B6 In use \u00b7 \u0A1A\u0A71\u0A32 \u0A30\u0A3F\u0A39\u0A3E" : "\u25B6 Load \u00b7 \u0A35\u0A30\u0A24\u0A4B\u0A02") + "</button>" +
      '<button type="button" class="mc-btn" data-act="export" data-slot="' + id + '" title="Download this save as a backup file">\uD83D\uDCE5 Backup</button>' +
      '<button type="button" class="mc-btn mc-danger' + (armed ? " is-armed" : "") + '" data-act="erase" data-slot="' + id + '">' +
      (armed ? "Tap again to erase" : "\uD83D\uDDD1\uFE0F Erase") + "</button></div>" +
      "</article>";
  }

  function render() {
    if (!overlay) return;
    var reg = MC.getRegistry();
    var used = SLOT_IDS.filter(function (id) { return !!reg.slots[id]; }).length;
    summaryEl.innerHTML = "<span lang=\"pa\">4 \u0A35\u0A3F\u0A71\u0A1A\u0A4B\u0A02 " + used + " \u0A38\u0A32\u0A3E\u0A1F \u0A2D\u0A30\u0A47 \u0A39\u0A28</span> \u00b7 " +
      used + " of 4 Blocks in Use" +
      '<span class="mc-blocks" aria-hidden="true">' +
      SLOT_IDS.map(function (id) { return '<i class="' + (reg.slots[id] ? "on" : "") + (id === pageSlotId ? " cur" : "") + '"></i>'; }).join("") +
      "</span>";
    grid.innerHTML = SLOT_IDS.map(function (id) { return slotHtml(id, reg.slots[id]); }).join("");
    overlay.classList.toggle("is-picking", !!pickImport);
    var pickBar = overlay.querySelector(".mc-pickbar");
    pickBar.hidden = !pickImport;
    if (pickImport) {
      pickBar.querySelector(".mc-pick-name").textContent = pickImport.slots[0].meta.name;
    }
    if (formSlot) {
      var input = grid.querySelector('.mc-form input[name="name"]');
      if (input) { input.focus(); input.select(); }
    }
  }

  function build() {
    if (overlay) return;
    ensureCss();
    overlay = document.createElement("div");
    overlay.className = "mc-overlay";
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="memory-card-container" role="dialog" aria-modal="true" aria-labelledby="mcTitle">' +
      '<header class="mc-header">' +
      '<div><h2 class="mc-title" id="mcTitle"><span lang="pa">\u0A2E\u0A48\u0A2E\u0A4B\u0A30\u0A40 \u0A15\u0A3E\u0A30\u0A21</span> \u00b7 Memory Card <span class="mc-dim">(4 Slots)</span></h2>' +
      '<p class="mc-summary"></p></div>' +
      '<button type="button" class="mc-close" data-act="close" aria-label="Close memory card">\u2715</button>' +
      "</header>" +
      '<div class="mc-pickbar" hidden><span>Choose a slot for <strong class="mc-pick-name"></strong> \u00b7 \u0A38\u0A32\u0A3E\u0A1F \u0A1A\u0A41\u0A23\u0A4B</span>' +
      '<button type="button" class="mc-btn" data-act="cancel-pick">Cancel</button></div>' +
      '<div class="memory-card-grid"></div>' +
      '<p class="mc-status" role="status" aria-live="polite"></p>' +
      '<footer class="mc-footer">' +
      '<button type="button" class="mc-btn" data-act="import">\uD83D\uDCE5 Import Save File \u00b7 <span lang="pa">\u0A38\u0A47\u0A35 \u0A2B\u0A3E\u0A08\u0A32 \u0A32\u0A4B\u0A21 \u0A15\u0A30\u0A4B</span></button>' +
      '<button type="button" class="mc-btn" data-act="export-card">\uD83D\uDCE6 Backup Entire Card</button>' +
      '<p class="mc-note">Saved only on this device \u00b7 no login, works offline. Use Backup to move a profile to another phone.</p>' +
      "</footer>" +
      '<input type="file" class="mc-file" accept=".json,.bolo,application/json" hidden>' +
      "</div>";
    document.body.appendChild(overlay);
    grid = overlay.querySelector(".memory-card-grid");
    summaryEl = overlay.querySelector(".mc-summary");
    statusEl = overlay.querySelector(".mc-status");
    fileInput = overlay.querySelector(".mc-file");

    overlay.addEventListener("click", onClick);
    overlay.addEventListener("submit", onSubmit);
    overlay.addEventListener("keydown", onKey);
    fileInput.addEventListener("change", onFile);
  }

  function open() {
    if (!MC.available) {
      alert("Memory Card needs browser storage, which is blocked on this device (private mode?).");
      return;
    }
    build();
    pickImport = null; formSlot = 0; eraseArm = 0;
    setStatus("");
    render();
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add("mc-lock");
    requestAnimationFrame(function () {
      overlay.classList.add("is-open");
      var cur = overlay.querySelector(".mc-close");
      if (cur) cur.focus();
    });
  }
  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove("is-open");
    overlay.hidden = true;
    document.documentElement.classList.remove("mc-lock");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (pickImport || formSlot) { pickImport = null; formSlot = 0; render(); return; }
      close();
      return;
    }
    if (e.key === "Tab") {
      var f = overlay.querySelectorAll("button:not([disabled]), input:not([type=hidden]):not(.mc-file), [tabindex]:not([tabindex='-1'])");
      var list = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
      if (!list.length) return;
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    /* Keep page-level shortcuts (deck arrows, quiz keys) from firing. */
    e.stopPropagation();
  }

  function onClick(e) {
    /* The modal lives in <body>; page-level delegated handlers (e.g. the
       menu's [data-mode]/[data-action] router) must not see its clicks. */
    e.stopPropagation();
    if (e.target === overlay) { close(); return; }
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var act = btn.getAttribute("data-act");
    var id = Number(btn.getAttribute("data-slot"));
    try {
      if (act !== "erase") eraseArm = 0;
      switch (act) {
        case "close": close(); break;
        case "create": formSlot = id; formMode = "create"; render(); break;
        case "rename": formSlot = id; formMode = "rename"; render(); break;
        case "cancel-form": formSlot = 0; render(); break;
        case "cancel-pick": pickImport = null; render(); setStatus(""); break;
        case "load":
          if (id === pageSlotId) { close(); break; }
          setStatus("Loading slot " + id + "\u2026 \u0A32\u0A4B\u0A21 \u0A39\u0A4B \u0A30\u0A3F\u0A39\u0A3E \u0A39\u0A48", "ok");
          MC.switchSlot(id);
          break;
        case "export":
          MC.exportSlot(id);
          setStatus("Backup saved for slot " + id + ". Keep the file safe.", "ok");
          break;
        case "export-card":
          MC.exportCard();
          setStatus("Full memory card backup downloaded.", "ok");
          break;
        case "erase":
          if (eraseArm !== id) {
            eraseArm = id;
            clearTimeout(eraseTimer);
            eraseTimer = setTimeout(function () { eraseArm = 0; render(); }, 4000);
            render();
            var again = grid.querySelector('[data-act="erase"][data-slot="' + id + '"]');
            if (again) again.focus();
            break;
          }
          eraseArm = 0;
          clearTimeout(eraseTimer);
          var wasPage = id === pageSlotId;
          MC.eraseSlot(id);
          setStatus("Slot " + id + " erased. \u0A38\u0A32\u0A3E\u0A1F \u0A2E\u0A3F\u0A1F\u0A3E \u0A26\u0A3F\u0A71\u0A24\u0A3E \u0A17\u0A3F\u0A06\u0A3E", "ok");
          if (!wasPage) render();
          break;
        case "import":
          fileInput.value = "";
          fileInput.click();
          break;
        case "import-here":
          var file = pickImport;
          pickImport = null;
          var meta = MC.importSlot(id, file);
          setStatus("Imported \u201C" + meta.name + "\u201D into slot " + id + ".", "ok");
          if (id !== pageSlotId) render();
          break;
      }
    } catch (err) {
      setStatus(err && err.message ? err.message : "Something went wrong", "err");
    }
  }

  function onSubmit(e) {
    var form = e.target.closest(".mc-form");
    if (!form) return;
    e.preventDefault();
    var id = Number(form.getAttribute("data-slot"));
    var name = form.elements.name.value;
    var av = form.querySelector('input[name="mc-avatar"]:checked');
    var lang = form.querySelector('input[name="lang"]:checked');
    try {
      if (form.getAttribute("data-mc-mode") === "rename") {
        var meta = MC.renameSlot(id, { name: name, avatar: av ? av.value : null });
        formSlot = 0;
        render();
        setStatus("Slot " + id + " is now \u201C" + meta.name + "\u201D. \u0A28\u0A3E\u0A2E \u0A2C\u0A26\u0A32 \u0A17\u0A3F\u0A06", "ok");
        var btn = grid.querySelector('[data-act="rename"][data-slot="' + id + '"]');
        if (btn) btn.focus();
        return;
      }
      MC.createSlot(id, { name: name, avatar: av ? av.value : "", lang: lang ? lang.value : "pa" });
      formSlot = 0;
      setStatus("Created slot " + id + ". Loading\u2026", "ok");
      render();
      MC.switchSlot(id);
    } catch (err) {
      setStatus(err.message, "err");
    }
  }

  function onFile() {
    var f = fileInput.files && fileInput.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setStatus("That file is too large to be a save file.", "err"); return; }
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = MC.parseFile(String(reader.result || ""));
        if (parsed.kind === "card" || parsed.slots.length > 1) {
          var n = parsed.slots.length;
          if (!confirm("Restore the entire memory card (" + n + " save" + (n === 1 ? "" : "s") + ")?\nThis replaces ALL 4 slots on this device.")) {
            setStatus("Restore cancelled.");
            return;
          }
          MC.importCard(parsed);
          setStatus("Memory card restored. Reloading\u2026", "ok");
          return;
        }
        pickImport = parsed;
        formSlot = 0;
        render();
        setStatus("Pick a slot for this save \u00b7 \u0A38\u0A32\u0A3E\u0A1F \u0A1A\u0A41\u0A23\u0A4B", "ok");
        var first = grid.querySelector('[data-act="import-here"]');
        if (first) first.focus();
      } catch (err) {
        setStatus(err.message, "err");
      }
    };
    reader.onerror = function () { setStatus("Could not read that file.", "err"); };
    reader.readAsText(f);
  }

  /* ---------------- navbar pill ---------------- */
  function bindPills() {
    var nodes = document.querySelectorAll(".memory-card-pill, [data-memcard-open]");
    Array.prototype.forEach.call(nodes, function (btn) {
      if (btn.__mcBound) return;
      btn.__mcBound = true;
      btn.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });
    refreshPills();
  }

  window.BOLO_MEMCARD_UI = { open: open, close: close, refresh: function () { bindPills(); render(); } };

  window.addEventListener("bolo:slotUpdated", function () {
    refreshPills();
    if (overlay && !overlay.hidden && !formSlot && !pickImport && !eraseArm) render();
  });
  window.addEventListener("bolo:slotChanged", function () { refreshPills(); });

  function boot() {
    if (document.querySelector(".memory-card-pill, [data-memcard-open]")) ensureCss();
    bindPills();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
}());
