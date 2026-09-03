/* BOLO.INSTINCT — offline service worker.

   Goal: a student on intermittent rural/mobile data can open the app, visit a
   chapter once, and from then on load and complete that whole deck with no
   connectivity at all.

   Strategy map
     • App shell (menu, MCQ engine, shared CSS/JS, MathJax, icons)
         -> precached on install so the very first offline visit works.
     • Chapter decks / interactive slides (HTML documents) and the app's own
       CSS/JS -> Stale-While-Revalidate: instant from cache, silently
       refreshed in the background so a deploy reaches students on the next
       visit without ever blocking on the network.
     • Heavy immutable assets (MathJax bundle, fonts, images)
         -> Cache-First; they are never re-downloaded on a metered connection.
     • Anything else / navigation misses -> network, falling back to the
       cached shell so the student never sees the browser error page.

   Bump CACHE_VERSION to force a full re-fetch of every cached asset. */

"use strict";

var CACHE_VERSION = "v1";
var CACHE_PREFIX = "bolo-instinct";
var SHELL_CACHE = CACHE_PREFIX + "-shell-" + CACHE_VERSION;
var CONTENT_CACHE = CACHE_PREFIX + "-content-" + CACHE_VERSION;
var CURRENT_CACHES = [SHELL_CACHE, CONTENT_CACHE];

/* Reuse the single source of truth for the chapter catalog. chapters.js is a
   classic script that assigns to `window`, so alias it inside the worker. */
self.window = self;
try { importScripts("./assets/chapters.js"); } catch (e) { /* offline install edge case */ }

var CHAPTERS = self.PSEB_CHAPTERS || [];

/* Core assets — everything needed to boot the app and render any deck. */
var SHELL_ASSETS = [
  "./",
  "./index.html",
  "./mcq.html",
  "./assets/chapters.js",
  "./assets/glossary.js",
  "./assets/sci-term.js",
  "./assets/search-index.js",
  "./assets/pwa.js",
  "./assets/bmc-coffee.js",
  "./assets/deck-enhance.js",
  "./assets/deck-theme-init.js",
  "./assets/deck-theme.css",
  "./assets/deck-ch01-05.css",
  "./assets/deck-ch06-07.css",
  "./assets/deck-ch08-13.css",
  "./assets/gurmukhi-type.css",
  "./assets/print.css",
  "./assets/favicon.svg",
  "./assets/mathjax/tex-mml-svg.js",
  "./manifest.webmanifest"
];

var STATIC_RE = /\.(?:css|js|svg|png|jpe?g|gif|webp|woff2?|ttf|otf|json|webmanifest)$/i;
/* Large, effectively immutable payloads — never re-download on mobile data. */
var IMMUTABLE_RE = /(?:\/mathjax\/|\.(?:woff2?|ttf|otf|png|jpe?g|gif|webp)$)/i;

function isHtmlRequest(request) {
  if (request.mode === "navigate") return true;
  var accept = request.headers.get("accept") || "";
  return accept.indexOf("text/html") !== -1 || /\.html?($|\?)/i.test(request.url);
}

/* Fail-soft precache: one missing file must never abort the whole install. */
function precache(cache, urls) {
  return Promise.all(urls.map(function (url) {
    return cache.add(new Request(url, { cache: "reload" }))["catch"](function () { return null; });
  }));
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (cache) { return precache(cache, SHELL_ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key.indexOf(CACHE_PREFIX) === 0 && CURRENT_CACHES.indexOf(key) === -1) {
          return caches["delete"](key);
        }
        return null;
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* event.waitUntil() is called after the dispatch tick, which some engines
   reject; respondWith already keeps the event alive, so failing is harmless. */
function keepAlive(event, promise) {
  if (!event) return;
  try { event.waitUntil(promise); } catch (e) { /* already extended */ }
}

/* Look in the runtime cache first, then fall back to any other cache (i.e.
   the install-time shell). Order matters: a bare caches.match() scans caches
   in creation order and would keep serving the frozen install-time copy of a
   shell asset forever, since refreshes are only ever written to the runtime
   cache. */
function matchCached(request, cacheName) {
  return caches.open(cacheName)
    .then(function (cache) { return cache.match(request); })
    .then(function (hit) { return hit || caches.match(request); });
}

function cacheFirst(request, cacheName, event) {
  return matchCached(request, cacheName).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response && (response.ok || response.type === "opaque")) {
        var copy = response.clone();
        keepAlive(event, caches.open(cacheName).then(function (c) { return c.put(request, copy); }));
      }
      return response;
    });
  });
}

function staleWhileRevalidate(request, cacheName, event, offlineFallback) {
  return matchCached(request, cacheName).then(function (cached) {
    var networkFetch = fetch(request).then(function (response) {
      if (response && response.ok) {
        var copy = response.clone();
        return caches.open(cacheName).then(function (cache) {
          return cache.put(request, copy);
        }).then(function () { return response; });
      }
      return response;
    })["catch"](function () { return null; });
    /* Serve the cached copy immediately; keep the worker alive until the
       background refresh has landed in the cache for the next visit. */
    keepAlive(event, networkFetch);
    if (cached) return cached;
    return networkFetch.then(function (response) {
      if (response) return response;
      return offlineFallback ? caches.match(offlineFallback) : Response.error();
    });
  });
}

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  var url;
  try { url = new URL(request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (isHtmlRequest(request)) {
    event.respondWith(
      staleWhileRevalidate(request, CONTENT_CACHE, event, "./index.html")["catch"](function () {
        return caches.match("./index.html");
      })
    );
    return;
  }

  if (STATIC_RE.test(url.pathname)) {
    var strategy = IMMUTABLE_RE.test(url.pathname) ? cacheFirst : staleWhileRevalidate;
    event.respondWith(
      strategy(request, CONTENT_CACHE, event)["catch"](function () {
        return caches.match(request);
      })
    );
    return;
  }

  event.respondWith(
    fetch(request)["catch"](function () { return caches.match(request); })
  );
});

/* Messages from assets/pwa.js -------------------------------------------- */
self.addEventListener("message", function (event) {
  var data = event.data || {};

  if (data.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  /* Warm the cache with a list of URLs (used to pre-pull the whole syllabus
     when the student taps "Save all chapters offline"). */
  if (data.type === "CACHE_URLS" && Array.isArray(data.urls)) {
    event.waitUntil(
      caches.open(CONTENT_CACHE).then(function (cache) {
        return precache(cache, data.urls);
      }).then(function () {
        if (event.source) event.source.postMessage({ type: "CACHE_URLS_DONE", count: data.urls.length });
      })
    );
    return;
  }

  if (data.type === "CACHE_ALL_CHAPTERS") {
    var urls = CHAPTERS.map(function (ch) { return "./" + ch.file; });
    event.waitUntil(
      caches.open(CONTENT_CACHE).then(function (cache) {
        return precache(cache, urls);
      }).then(function () {
        if (event.source) event.source.postMessage({ type: "CACHE_URLS_DONE", count: urls.length });
      })
    );
  }
});
