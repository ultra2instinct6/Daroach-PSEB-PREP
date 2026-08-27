/*
 * bolo.instinct — global "Buy Me a Coffee" support widget
 * Self-contained: injects its own CSS + HTML on any page it is loaded on.
 * Appears site-wide (main menu, chapter decks, interactive slides, MCQ).
 * Handle: https://buymeacoffee.com/bolo.instinct
 */
(function () {
  "use strict";

  if (window.__bmcCoffeeLoaded) return;
  window.__bmcCoffeeLoaded = true;

  var BMC_URL = "https://buymeacoffee.com/bolo.instinct";
  var SEEN_KEY = "bolo.bmc.seen.v1";

  var CSS =
    '.bmc-widget{position:fixed;right:20px;bottom:20px;z-index:2147483000;' +
    'font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;}' +
    '.bmc-toggle{position:relative;display:flex;align-items:center;gap:9px;' +
    'background:linear-gradient(135deg,#FFDD00 0%,#FBB034 100%);color:#3a2b00;' +
    'border:none;border-radius:999px;padding:12px 20px 12px 16px;font-size:0.95rem;' +
    'font-weight:800;letter-spacing:0.3px;cursor:pointer;' +
    'box-shadow:0 10px 26px rgba(251,176,52,0.5),0 2px 6px rgba(0,0,0,0.18);' +
    'transition:transform .2s ease,box-shadow .2s ease;animation:bmc-bob 2.6s ease-in-out infinite;}' +
    '.bmc-toggle:hover{transform:translateY(-3px) scale(1.04);' +
    'box-shadow:0 16px 34px rgba(251,176,52,0.65),0 3px 8px rgba(0,0,0,0.22);}' +
    '.bmc-toggle:active{transform:translateY(-1px) scale(0.99);}' +
    '.bmc-toggle:focus-visible{outline:3px solid #0b56c5;outline-offset:3px;}' +
    '.bmc-toggle-icon{font-size:1.35rem;display:inline-block;transform-origin:70% 90%;' +
    'animation:bmc-wiggle 1.8s ease-in-out infinite;}' +
    '.bmc-ping{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;' +
    'background:#ff4757;box-shadow:0 0 0 rgba(255,71,87,0.6);animation:bmc-ping 1.8s ease-out infinite;}' +
    '.bmc-widget.open .bmc-ping,.bmc-widget.seen .bmc-ping{display:none;}' +
    '.bmc-widget.open .bmc-toggle{animation:none;transform:scale(0.96);padding:12px 14px;}' +
    '.bmc-widget.open .bmc-toggle-label{display:none;}' +
    '.bmc-card{position:absolute;right:0;bottom:64px;width:290px;' +
    'background:linear-gradient(180deg,#ffffff 0%,#fff9e6 100%);' +
    'border:1px solid rgba(251,176,52,0.5);border-radius:18px;padding:20px 20px 18px;' +
    'text-align:center;box-shadow:0 24px 60px rgba(16,42,82,0.32);opacity:0;' +
    'transform:translateY(14px) scale(0.92);transform-origin:bottom right;pointer-events:none;' +
    'transition:opacity .25s ease,transform .25s cubic-bezier(.2,.9,.3,1.3);overflow:hidden;}' +
    '.bmc-widget.open .bmc-card{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}' +
    '.bmc-card::before{content:"";position:absolute;inset:-2px;' +
    'background:conic-gradient(from 0deg,#FFDD00,#FBB034,#f26a21,#FFDD00);' +
    'filter:blur(22px);opacity:0.22;z-index:0;}' +
    '.bmc-card>*{position:relative;z-index:1;}' +
    '.bmc-close{position:absolute;top:8px;right:10px;background:transparent;border:none;' +
    'font-size:1.4rem;line-height:1;color:#9a7b1e;cursor:pointer;z-index:2;padding:2px 6px;' +
    'border-radius:8px;transition:background .15s;}' +
    '.bmc-close:hover{background:rgba(251,176,52,0.18);}' +
    '.bmc-steam{position:absolute;top:12px;left:0;right:0;display:flex;justify-content:center;' +
    'gap:10px;z-index:1;pointer-events:none;}' +
    '.bmc-steam span{width:6px;height:6px;border-radius:50%;background:rgba(251,176,52,0.55);' +
    'opacity:0;animation:bmc-steam 2.8s ease-in-out infinite;}' +
    '.bmc-steam span:nth-child(2){animation-delay:.5s;}' +
    '.bmc-steam span:nth-child(3){animation-delay:1s;}' +
    '.bmc-emoji{font-size:2.4rem;margin:2px 0 4px;animation:bmc-pop 2.4s ease-in-out infinite;}' +
    '.bmc-title{margin:2px 0 6px;font-size:1.4rem;font-weight:900;color:#3a2b00;letter-spacing:0.2px;}' +
    '.bmc-sub{margin:0 0 14px;font-size:0.86rem;line-height:1.45;color:#4a3a10;}' +
    '.bmc-pa{display:block;margin-top:6px;font-size:0.8rem;color:#8a6d2a;}' +
    '.bmc-cta{display:inline-block;background:linear-gradient(135deg,#FFDD00 0%,#FBB034 100%);' +
    'color:#3a2b00;text-decoration:none;font-weight:800;font-size:1rem;padding:11px 22px;' +
    'border-radius:999px;box-shadow:0 8px 20px rgba(251,176,52,0.55);' +
    'transition:transform .18s ease,box-shadow .18s ease;}' +
    '.bmc-cta:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 12px 28px rgba(251,176,52,0.7);}' +
    '.bmc-perks{margin-top:12px;font-size:0.72rem;font-weight:700;color:#8a6d2a;letter-spacing:0.2px;}' +
    '@keyframes bmc-bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}' +
    '@keyframes bmc-wiggle{0%,100%{transform:rotate(0);}20%{transform:rotate(-12deg);}' +
    '40%{transform:rotate(10deg);}60%{transform:rotate(-6deg);}80%{transform:rotate(4deg);}}' +
    '@keyframes bmc-pop{0%,100%{transform:scale(1);}50%{transform:scale(1.14);}}' +
    '@keyframes bmc-ping{0%{box-shadow:0 0 0 0 rgba(255,71,87,0.6);}' +
    '70%{box-shadow:0 0 0 10px rgba(255,71,87,0);}100%{box-shadow:0 0 0 0 rgba(255,71,87,0);}}' +
    '@keyframes bmc-steam{0%{opacity:0;transform:translateY(6px) scale(0.6);}' +
    '30%{opacity:0.7;}100%{opacity:0;transform:translateY(-18px) scale(1.1);}}' +
    '@media (max-width:520px){.bmc-toggle-label{display:none;}.bmc-toggle{padding:12px 14px;}' +
    '.bmc-card{width:min(280px,84vw);}}' +
    '@media (prefers-reduced-motion:reduce){' +
    '.bmc-toggle,.bmc-toggle-icon,.bmc-emoji,.bmc-steam span,.bmc-ping{animation:none;}}' +
    '.bmc-widget.bmc-raise{bottom:92px;}' +
    '@media (max-width:520px){.bmc-widget.bmc-raise{bottom:84px;}}';

  var HTML =
    '<div class="bmc-card" role="dialog" aria-label="Support bolo.instinct" aria-hidden="true">' +
      '<button class="bmc-close" type="button" aria-label="Close">&times;</button>' +
      '<div class="bmc-steam"><span></span><span></span><span></span></div>' +
      '<div class="bmc-emoji">\u2615\u2728</div>' +
      '<h3 class="bmc-title">Fuel the Grind!</h3>' +
      '<p class="bmc-sub">These free bilingual PSEB decks are built on late nights &amp; a lot of chai. ' +
      'If they helped you, buy me one back. ' +
      '<span class="bmc-pa">(\u0a24\u0a41\u0a39\u0a3e\u0a21\u0a3e \u0a38\u0a3e\u0a25 \u0a39\u0a40 \u0a07\u0a39 \u0a15\u0a70\u0a2e \u0a1a\u0a71\u0a32\u0a26\u0a3e \u0a39\u0a48 \u2014 \u0a07\u0a71\u0a15 \u0a15\u0a4c\u0a2b\u0a3c\u0a40 \u0a28\u0a3e\u0a32 \u0a38\u0a3e\u0a25 \u0a26\u0a3f\u0a13\u0964)</span></p>' +
      '<a class="bmc-cta" href="' + BMC_URL + '" target="_blank" rel="noopener noreferrer">\u2615 Buy me a coffee</a>' +
      '<div class="bmc-perks">\ud83d\ude80 Keeps every chapter free \u00b7 \ud83d\udd25 Fuels the next one</div>' +
    '</div>' +
    '<button class="bmc-toggle" type="button" aria-expanded="false" title="Support bolo.instinct \u2615">' +
      '<span class="bmc-ping" aria-hidden="true"></span>' +
      '<span class="bmc-toggle-icon" aria-hidden="true">\u2615</span>' +
      '<span class="bmc-toggle-label">Buy me a coffee</span>' +
    '</button>';

  function init() {
    if (document.getElementById("bmc-widget")) return;

    var style = document.createElement("style");
    style.id = "bmc-coffee-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    var widget = document.createElement("div");
    widget.id = "bmc-widget";
    widget.className = "bmc-widget";
    widget.innerHTML = HTML;
    document.body.appendChild(widget);

    // Lift above bottom-right site chrome (e.g. the main menu's utility hub)
    // so the toggle never covers existing controls.
    if (document.querySelector(".utility-hub")) {
      widget.classList.add("bmc-raise");
    }

    var toggle = widget.querySelector(".bmc-toggle");
    var card = widget.querySelector(".bmc-card");
    var closeBtn = widget.querySelector(".bmc-close");

    var seen = false;
    try { seen = localStorage.getItem(SEEN_KEY) === "1"; } catch (e) {}
    if (seen) widget.classList.add("seen");

    function markSeen() {
      widget.classList.add("seen");
      try { localStorage.setItem(SEEN_KEY, "1"); } catch (e) {}
    }

    function setOpen(open) {
      widget.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (card) card.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) {
        markSeen();
      } else if (card && card.contains(document.activeElement)) {
        // Avoid trapping focus inside an aria-hidden card.
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!widget.classList.contains("open"));
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!widget.contains(e.target)) setOpen(false);
    });

    // Gentle one-time advertisement on a visitor's first ever visit.
    if (!seen) {
      setTimeout(function () {
        if (!widget.classList.contains("open")) setOpen(true);
        markSeen();
      }, 4500);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
