/* BOLO.INSTINCT — Google Analytics 4.

   Loaded from the <head> of every page (menu, MCQ engine, the chapter decks
   and the interactive slides) so traffic is measured site-wide from a single
   file: change the measurement ID here and every page follows.

   Notes for this specific site
     • Offline-first PWA. If gtag.js can't be reached (rural/mobile data drop),
       the calls below simply queue in window.dataLayer and nothing throws, so
       a student's offline session is never affected.
     • sw.js deliberately ignores cross-origin requests, so nothing here is
       intercepted or cached by the service worker.
     • Local previews (file:// and localhost) are NOT reported, so testing on
       your own machine doesn't pollute the real traffic numbers. Append
       ?ga_debug=1 to the URL if you want a local visit to be sent anyway. */

(function () {
  "use strict";

  var MEASUREMENT_ID = "G-R4Y6ESZ7R1";

  /* Guard against a page accidentally including this file twice. */
  if (window.__PSEB_ANALYTICS_LOADED) return;
  window.__PSEB_ANALYTICS_LOADED = true;

  var host = location.hostname;
  var isLocal = location.protocol === "file:" ||
                host === "localhost" ||
                host === "127.0.0.1" ||
                host === "::1" ||
                host === "" ||
                /\.local$/i.test(host);
  var forced = /[?&]ga_debug=1\b/.test(location.search);
  if (isLocal && !forced) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  /* Group hits by the kind of page so the GA4 reports separate "which chapter
     deck is being studied" from menu and MCQ traffic. */
  function contentGroup() {
    var path = decodeURIComponent(location.pathname);
    if (/\/Interactive slides\//i.test(path)) return "Interactive Slide";
    if (/\/mcq\.html$/i.test(path)) return "MCQ Practice";
    if (/\/Chapter \d+/i.test(path)) return "Chapter Deck";
    if (path === "/" || /\/index\.html$/i.test(path)) return "Menu";
    return "Other";
  }

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { content_group: contentGroup() });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
  (document.head || document.documentElement).appendChild(s);
})();
