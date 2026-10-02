/* BOLO.INSTINCT — concave/convex mirror ray-tracing bench.

   The deck previously showed five preset object positions as coloured bars.
   That tells a student *what* the image is but never *why*, because the rays
   are the whole argument. This widget draws the two standard construction
   rays live while the object is dragged along the principal axis, so the
   moment the object crosses F the student watches the reflected rays stop
   converging and the image flip to virtual and erect.

   Markup (everything optional except the attribute itself):

     <div data-pseb-raybench data-mirror="concave"></div>

   Labels follow the deck-wide reading-language preference (pseb.lang.v1), so
   the same widget is bilingual without duplicated markup. */

(function () {
  "use strict";

  var LANG_KEY = "pseb.lang.v1";

  /* World units. The mirror pole sits at x = 0, light arrives from the left,
     and the New Cartesian sign convention applies: distances measured against
     the incident light are negative. */
  var F_CONCAVE = -60;      /* focal length, concave */
  var F_CONVEX = 60;        /* focal length, convex  */
  var OBJ_H = 42;
  var X_MIN = -250, X_MAX = 130;
  var AXIS_Y = 186, SVG_W = 820, SVG_H = 372;
  var SCALE = 1.85;
  var PX = 40 - X_MIN * SCALE;   /* svg x of the pole */

  /* Keep the object a hair away from F: the image distance diverges there and
     the construction would draw an arrow a hundred screens tall. */
  var F_GUARD = 2.5;

  function lang() {
    try { return localStorage.getItem(LANG_KEY) === "en" ? "en" : "pa"; }
    catch (e) { return "pa"; }
  }

  var T = {
    title: { en: "Ray-tracing bench", pa: "ਕਿਰਨ ਰੇਖਾ ਪ੍ਰਯੋਗਸ਼ਾਲਾ" },
    drag: { en: "Drag the object along the principal axis", pa: "ਵਸਤੂ ਨੂੰ ਮੁੱਖ ਧੁਰੇ ਉੱਤੇ ਖਿੱਚੋ" },
    object: { en: "Object", pa: "ਵਸਤੂ" },
    image: { en: "Image", pa: "ਪ੍ਰਤੀਬਿੰਬ" },
    nature: { en: "Nature", pa: "ਪ੍ਰਕਾਰ" },
    size: { en: "Size", pa: "ਆਕਾਰ" },
    real: { en: "Real", pa: "ਵਾਸਤਵਿਕ" },
    virtual: { en: "Virtual", pa: "ਆਭਾਸੀ" },
    inverted: { en: "inverted", pa: "ਉਲਟਾ" },
    erect: { en: "erect", pa: "ਸਿੱਧਾ" },
    magnified: { en: "magnified", pa: "ਵੱਡਾ" },
    diminished: { en: "diminished", pa: "ਛੋਟਾ" },
    same: { en: "same size", pa: "ਬਰਾਬਰ" },
    infinity: { en: "At infinity — reflected rays are parallel", pa: "ਅਨੰਤ ਉੱਤੇ — ਪਰਾਵਰਤਿਤ ਕਿਰਨਾਂ ਸਮਾਂਤਰ ਹਨ" },
    offStage: { en: "Image forms beyond the bench — read v below", pa: "ਪ੍ਰਤੀਬਿੰਬ ਬੈਂਚ ਤੋਂ ਬਾਹਰ ਬਣਦਾ ਹੈ — ਹੇਠਾਂ v ਵੇਖੋ" },
    ray1: { en: "Parallel ray → through F", pa: "ਸਮਾਂਤਰ ਕਿਰਨ → F ਰਾਹੀਂ" },
    ray2: { en: "Ray through F → parallel", pa: "F ਰਾਹੀਂ ਕਿਰਨ → ਸਮਾਂਤਰ" },
    beyondC: { en: "Beyond C", pa: "C ਤੋਂ ਪਰੇ" },
    atC: { en: "At C", pa: "C ਉੱਤੇ" },
    betweenCF: { en: "Between C and F", pa: "C ਅਤੇ F ਵਿਚਕਾਰ" },
    atF: { en: "At F", pa: "F ਉੱਤੇ" },
    insideF: { en: "Between F and P", pa: "F ਅਤੇ P ਵਿਚਕਾਰ" },
    anywhere: { en: "Anywhere in front", pa: "ਦਰਪਣ ਦੇ ਸਾਹਮਣੇ ਕਿਤੇ ਵੀ" },
    screen: { en: "Can be caught on a screen", pa: "ਪਰਦੇ ਉੱਤੇ ਲਿਆ ਜਾ ਸਕਦਾ ਹੈ" },
    noScreen: { en: "Cannot be caught on a screen", pa: "ਪਰਦੇ ਉੱਤੇ ਨਹੀਂ ਲਿਆ ਜਾ ਸਕਦਾ" },
    concave: { en: "Concave", pa: "ਅਵਤਲ" },
    convex: { en: "Convex", pa: "ਉੱਤਲ" }
  };

  function t(key) {
    var e = T[key];
    return e ? (e[lang()] || e.en) : key;
  }

  function svgEl(name, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) el.setAttribute(k, attrs[k]);
    return el;
  }

  function sx(x) { return PX + x * SCALE; }
  function sy(y) { return AXIS_Y - y * SCALE; }

  function injectStyle() {
    if (document.getElementById("pseb-raybench-css")) return;
    var st = document.createElement("style");
    st.id = "pseb-raybench-css";
    st.textContent =
      ".pseb-raybench{--rb-ink:var(--deck-text,#f8fafc);--rb-muted:var(--deck-muted,#9aa7ba);" +
        "--rb-aura:var(--deck-aura,#00e5ff);--rb-warn:var(--deck-warn,#ffaa00);" +
        "margin:18px 0;padding:16px;border-radius:16px;background:var(--deck-panel,rgba(14,14,18,.6));" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.14));" +
        "font-family:var(--deck-font-ui,'Segoe UI',system-ui,sans-serif)}" +
      ".pseb-raybench .rb-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}" +
      ".pseb-raybench .rb-hint{flex:1;min-width:180px;font-size:.85rem;font-weight:700;color:var(--rb-muted)}" +
      ".pseb-raybench .rb-presets{display:flex;flex-wrap:wrap;gap:6px}" +
      ".pseb-raybench .rb-preset{padding:7px 12px;border-radius:999px;cursor:pointer;font:inherit;font-size:.78rem;font-weight:800;" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.14));background:transparent;color:var(--rb-muted)}" +
      ".pseb-raybench .rb-preset:hover,.pseb-raybench .rb-preset[aria-pressed='true']{background:var(--rb-aura);border-color:var(--rb-aura);color:#050507}" +
      ".pseb-raybench .rb-stage{width:100%;height:auto;display:block;touch-action:none;cursor:grab;border-radius:12px;" +
        "background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,0))}" +
      ".pseb-raybench .rb-stage:active{cursor:grabbing}" +
      ".pseb-raybench .rb-stage:focus-visible{outline:2px solid var(--rb-aura);outline-offset:3px}" +
      ".pseb-raybench .rb-grab{cursor:grab}" +
      ".pseb-raybench .rb-read{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:12px}" +
      ".pseb-raybench .rb-cell{padding:9px 12px;border-radius:10px;background:var(--deck-panel-soft,rgba(255,255,255,.05));" +
        "border:1px solid var(--deck-border-strong,rgba(255,255,255,.1))}" +
      ".pseb-raybench .rb-k{display:block;font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--rb-muted)}" +
      ".pseb-raybench .rb-v{display:block;margin-top:3px;font-size:.98rem;font-weight:800;color:var(--rb-ink)}" +
      ".pseb-raybench .rb-v.is-real{color:var(--rb-aura)}" +
      ".pseb-raybench .rb-v.is-virtual{color:var(--rb-warn)}" +
      "@media(max-width:600px){.pseb-raybench{padding:12px}.pseb-raybench .rb-read{grid-template-columns:1fr 1fr}" +
        ".pseb-raybench .rb-preset{font-size:.72rem;padding:6px 10px}}" +
      "@media(prefers-reduced-motion:no-preference){.pseb-raybench .rb-anim{transition:d .12s linear}}";
    document.head.appendChild(st);
  }

  function build(host) {
    var convex = host.getAttribute("data-mirror") === "convex";
    var f = convex ? F_CONVEX : F_CONCAVE;
    var C = 2 * f;
    /* Objects always sit in front of the mirror, i.e. at negative x. */
    var u = convex ? -130 : -200;

    host.classList.add("pseb-raybench");
    host.innerHTML =
      '<div class="rb-top">' +
        '<div class="rb-hint"></div>' +
        '<div class="rb-presets"></div>' +
      '</div>' +
      '<div class="rb-read">' +
        '<div class="rb-cell"><span class="rb-k rb-k-obj"></span><span class="rb-v rb-v-obj"></span></div>' +
        '<div class="rb-cell"><span class="rb-k rb-k-img"></span><span class="rb-v rb-v-img"></span></div>' +
        '<div class="rb-cell"><span class="rb-k rb-k-nat"></span><span class="rb-v rb-v-nat"></span></div>' +
        '<div class="rb-cell"><span class="rb-k rb-k-size"></span><span class="rb-v rb-v-size"></span></div>' +
      '</div>';

    var svg = svgEl("svg", {
      "class": "rb-stage",
      viewBox: "0 0 " + SVG_W + " " + SVG_H,
      role: "application",
      tabindex: "0"
    });
    host.insertBefore(svg, host.querySelector(".rb-read"));

    var defs = svgEl("defs");
    defs.innerHTML =
      '<marker id="rb-tip-obj" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="4.4" markerHeight="4.4" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="#4ade80"/></marker>' +
      '<marker id="rb-tip-img" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="4.4" markerHeight="4.4" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="#ffaa00"/></marker>' +
      '<clipPath id="rb-clip"><rect x="2" y="2" width="' + (SVG_W - 4) + '" height="' + (SVG_H - 4) + '"/></clipPath>';
    svg.appendChild(defs);

    var g = svgEl("g", { "clip-path": "url(#rb-clip)" });
    svg.appendChild(g);

    function line(cls, attrs) {
      var l = svgEl("line", attrs || {});
      l.setAttribute("class", cls);
      g.appendChild(l);
      return l;
    }
    function text(cls, x, y, str) {
      var el = svgEl("text", { x: x, y: y, "text-anchor": "middle", "font-size": "15", "font-weight": "800" });
      el.setAttribute("class", cls);
      el.textContent = str;
      g.appendChild(el);
      return el;
    }

    var MUTED = "rgba(255,255,255,.34)";

    /* Principal axis */
    line("", { x1: 10, y1: AXIS_Y, x2: SVG_W - 10, y2: AXIS_Y, stroke: MUTED, "stroke-width": 1.5 });

    /* Mirror: a shallow arc whose vertex is exactly the pole. A quadratic
       Bezier sits at 0.25·P0 + 0.5·Pc + 0.25·P1 at its midpoint, so the
       control point has to mirror the endpoints for the vertex to land on
       x = 0 rather than drifting off the axis. */
    var bend = convex ? -1 : 1;
    var mEnd = bend * 26;
    var mirrorPath = svgEl("path", {
      d: "M " + sx(mEnd) + " " + sy(118) +
         " Q " + sx(-mEnd) + " " + AXIS_Y + " " + sx(mEnd) + " " + sy(-118),
      fill: "none", stroke: "#94a3b8", "stroke-width": 5, "stroke-linecap": "round"
    });
    g.appendChild(mirrorPath);
    /* Hatching on the silvered back. */
    for (var hi = -5; hi <= 5; hi++) {
      var hy = sy(hi * 21);
      var hx = sx(bend * (26 - Math.abs(hi) * 1.4));
      line("", { x1: hx, y1: hy, x2: hx + bend * 24, y2: hy - 8, stroke: "rgba(148,163,184,.45)", "stroke-width": 2 });
    }

    line("", { x1: sx(C), y1: AXIS_Y - 9, x2: sx(C), y2: AXIS_Y + 9, stroke: MUTED, "stroke-width": 2 });
    line("", { x1: sx(f), y1: AXIS_Y - 9, x2: sx(f), y2: AXIS_Y + 9, stroke: MUTED, "stroke-width": 2 });
    var labC = text("", sx(C), AXIS_Y + 26, "C");
    var labF = text("", sx(f), AXIS_Y + 26, "F");
    var labP = text("", sx(0) - 18, AXIS_Y + 26, "P");
    [labC, labF, labP].forEach(function (el) { el.setAttribute("fill", MUTED); });

    /* Rays — drawn before the arrows so the arrows stay readable on top. */
    function ray(color, dashed) {
      var p = svgEl("polyline", {
        fill: "none", stroke: color, "stroke-width": 2.4, "stroke-linejoin": "round",
        "stroke-linecap": "round"
      });
      if (dashed) p.setAttribute("stroke-dasharray", "7 6");
      g.appendChild(p);
      return p;
    }
    var ray1 = ray("#38bdf8");
    var ray1v = ray("#38bdf8", true);
    var ray2 = ray("#f472b6");
    var ray2v = ray("#f472b6", true);

    var imgArrow = svgEl("line", { stroke: "#ffaa00", "stroke-width": 4.5, "stroke-linecap": "round" });
    imgArrow.setAttribute("marker-end", "url(#rb-tip-img)");
    g.appendChild(imgArrow);

    var objArrow = svgEl("line", { stroke: "#4ade80", "stroke-width": 4.5, "stroke-linecap": "round" });
    objArrow.setAttribute("marker-end", "url(#rb-tip-obj)");
    objArrow.setAttribute("class", "rb-grab");
    g.appendChild(objArrow);

    var objHit = svgEl("circle", { r: 15, fill: "rgba(74,222,128,.18)", stroke: "#4ade80", "stroke-width": 2 });
    objHit.setAttribute("class", "rb-grab");
    g.appendChild(objHit);

    var objLabel = text("", 0, 0, "O");
    objLabel.setAttribute("fill", "#4ade80");
    var imgLabel = text("", 0, 0, "I");
    imgLabel.setAttribute("fill", "#ffaa00");

    var note = text("", SVG_W / 2, 28, "");
    note.setAttribute("fill", "#ffaa00");
    note.setAttribute("font-size", "15");

    /* Legend — the two rays are the whole argument, so name them on the
       canvas. It sits on a backing plate because the reflected rays sweep
       across this corner as the object moves. */
    var legendBg = svgEl("rect", {
      x: 8, y: 8, width: 268, height: 52, rx: 10,
      fill: "rgba(8,10,14,.82)", stroke: "rgba(255,255,255,.1)"
    });
    g.appendChild(legendBg);
    var legend1 = text("", 0, 0, "");
    var legend2 = text("", 0, 0, "");
    [[legend1, "#38bdf8", 30], [legend2, "#f472b6", 50]].forEach(function (spec) {
      spec[0].setAttribute("text-anchor", "start");
      spec[0].setAttribute("x", 44);
      spec[0].setAttribute("y", spec[2]);
      spec[0].setAttribute("fill", spec[1]);
      spec[0].setAttribute("font-size", "13");
      line("", { x1: 20, y1: spec[2] - 4, x2: 38, y2: spec[2] - 4, stroke: spec[1], "stroke-width": 3 });
    });

    var fNote = text("", SVG_W - 16, SVG_H - 14, "f = " + f + " cm   \u00b7   R = " + C + " cm");
    fNote.setAttribute("text-anchor", "end");
    fNote.setAttribute("fill", MUTED);
    fNote.setAttribute("font-size", "13");

    var presets = host.querySelector(".rb-presets");
    var presetSpec = convex
      ? [["anywhere", -130]]
      : [["beyondC", -205], ["atC", C], ["betweenCF", -90], ["atF", f], ["insideF", -32]];
    var presetBtns = presetSpec.map(function (spec) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rb-preset";
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { setU(spec[1], true); });
      presets.appendChild(b);
      return { btn: b, key: spec[0], x: spec[1] };
    });

    function positionKey(x) {
      if (convex) return "anywhere";
      if (Math.abs(x - C) < 6) return "atC";
      if (Math.abs(x - f) < 6) return "atF";
      if (x < C) return "beyondC";
      if (x < f) return "betweenCF";
      return "insideF";
    }

    function solve(x) {
      /* 1/v + 1/u = 1/f, with u = x (negative, in front of the mirror). */
      var denom = x - f;
      if (Math.abs(denom) < 0.0001) return null;
      var v = (x * f) / denom;
      return { v: v, m: -v / x };
    }

    /* Intersection with the mirror plane x = 0 of the line through two points. */
    function atMirror(x1, y1, x2, y2) {
      var tt = (0 - x1) / (x2 - x1);
      return y1 + tt * (y2 - y1);
    }

    function extend(x1, y1, x2, y2, toX) {
      var tt = (toX - x1) / (x2 - x1);
      return { x: toX, y: y1 + tt * (y2 - y1) };
    }

    function pts(list) {
      return list.map(function (p) { return sx(p.x) + "," + sy(p.y); }).join(" ");
    }

    function render() {
      var key = positionKey(u);
      var sol = solve(u);
      var atFocus = !sol || Math.abs(u - f) < F_GUARD || Math.abs(sol.v) > 4000;

      objArrow.setAttribute("x1", sx(u));
      objArrow.setAttribute("y1", sy(0));
      objArrow.setAttribute("x2", sx(u));
      objArrow.setAttribute("y2", sy(OBJ_H));
      objHit.setAttribute("cx", sx(u));
      objHit.setAttribute("cy", sy(OBJ_H));
      objLabel.setAttribute("x", sx(u) - 26);
      objLabel.setAttribute("y", sy(OBJ_H) + 5);

      var tipX = u, tipY = OBJ_H;
      var leftEdge = X_MIN - 10, rightEdge = X_MAX + 10;

      /* Ray 1 — parallel to the axis, reflected through F. */
      var m1y = tipY;
      var r1out = extend(0, m1y, f, 0, leftEdge);

      /* Ray 2 — the standard "through F" ray, which reflects parallel to the
         axis. Using this instead of the ray aimed at C matters visually: the
         C-ray reflects back along its own path, so on screen it looks like a
         single straight line and the student never sees it bounce. */
      var m2y = atMirror(tipX, tipY, f, 0);
      var r2out = { x: leftEdge, y: m2y };

      if (atFocus) {
        /* Object at F: both reflected rays leave parallel, so they never meet
           and no image forms at a finite distance. */
        ray1.setAttribute("points", pts([{ x: tipX, y: tipY }, { x: 0, y: m1y }, r1out]));
        ray2.setAttribute("points", pts([{ x: tipX, y: tipY }, { x: 0, y: -m1y }, { x: leftEdge, y: -m1y }]));
        ray1v.setAttribute("points", "");
        ray2v.setAttribute("points", "");
        imgArrow.setAttribute("x1", 0); imgArrow.setAttribute("x2", 0);
        imgArrow.setAttribute("y1", 0); imgArrow.setAttribute("y2", 0);
        imgLabel.textContent = "";
        note.textContent = t("infinity");
      } else {
        var v = sol.v, hp = sol.m * OBJ_H;
        var real = v < 0;
        note.textContent = "";
        imgLabel.textContent = "I";

        ray1.setAttribute("points", pts([{ x: tipX, y: tipY }, { x: 0, y: m1y }, r1out]));
        ray2.setAttribute("points", pts([{ x: tipX, y: tipY }, { x: 0, y: m2y }, r2out]));

        if (real) {
          ray1v.setAttribute("points", "");
          ray2v.setAttribute("points", "");
        } else {
          /* Virtual: the reflected rays diverge, and it is their dashed
             back-extensions behind the mirror that locate the image. */
          var b1 = extend(0, m1y, f, 0, rightEdge);
          ray1v.setAttribute("points", pts([{ x: 0, y: m1y }, b1]));
          ray2v.setAttribute("points", pts([{ x: 0, y: m2y }, { x: rightEdge, y: m2y }]));
        }

        imgArrow.setAttribute("x1", sx(v));
        imgArrow.setAttribute("y1", sy(0));
        imgArrow.setAttribute("x2", sx(v));
        imgArrow.setAttribute("y2", sy(hp));
        imgArrow.setAttribute("stroke-dasharray", real ? "none" : "8 6");
        imgLabel.setAttribute("x", sx(v) + 22);
        imgLabel.setAttribute("y", Math.max(20, Math.min(SVG_H - 10, sy(hp) + (hp > 0 ? 2 : 6))));

        /* Close to F the image runs off the bench. Say so instead of letting
           the clip path silently swallow the arrow. */
        if (v < X_MIN || v > X_MAX) {
          note.textContent = t("offStage");
          imgLabel.textContent = "";
        }
      }

      /* Read-out */
      legend1.textContent = t("ray1");
      legend2.textContent = t("ray2");
      host.querySelector(".rb-k-obj").textContent = t("object");
      host.querySelector(".rb-k-img").textContent = t("image");
      host.querySelector(".rb-k-nat").textContent = t("nature");
      host.querySelector(".rb-k-size").textContent = t("size");
      host.querySelector(".rb-hint").textContent = t("drag");

      host.querySelector(".rb-v-obj").textContent =
        t(key) + "  ·  u = " + Math.round(u) + " cm";

      var natEl = host.querySelector(".rb-v-nat");
      var imgEl = host.querySelector(".rb-v-img");
      var sizeEl = host.querySelector(".rb-v-size");
      natEl.classList.remove("is-real", "is-virtual");

      if (atFocus) {
        imgEl.textContent = t("infinity");
        natEl.textContent = t("real") + ", " + t("inverted");
        natEl.classList.add("is-real");
        sizeEl.textContent = t("magnified");
      } else {
        var v2 = sol.v, m = sol.m, real2 = v2 < 0;
        imgEl.textContent = "v = " + Math.round(v2) + " cm  ·  m = " + (Math.round(m * 100) / 100);
        natEl.textContent = (real2 ? t("real") : t("virtual")) + ", " + (m < 0 ? t("inverted") : t("erect"));
        natEl.classList.add(real2 ? "is-real" : "is-virtual");
        var am = Math.abs(m);
        sizeEl.textContent = (am > 1.04 ? t("magnified") : am < 0.96 ? t("diminished") : t("same")) +
          "  ·  " + (real2 ? t("screen") : t("noScreen"));
      }

      presetBtns.forEach(function (p) {
        p.btn.textContent = t(p.key);
        p.btn.setAttribute("aria-pressed", positionKey(p.x) === key ? "true" : "false");
      });
      svg.setAttribute("aria-label",
        t(convex ? "convex" : "concave") + " mirror. " +
        t("object") + ": " + t(key) + ". " +
        t("image") + ": " + host.querySelector(".rb-v-nat").textContent);
    }

    function setU(x, snap) {
      var lo = X_MIN + 8, hi = -8;
      u = Math.max(lo, Math.min(hi, x));
      if (!snap) {
        /* Dragging past F would otherwise flicker through a near-infinite
           image; park the object on F and show the parallel-ray case. */
        if (!convex && Math.abs(u - f) < F_GUARD) u = f;
      }
      render();
    }

    function pointerX(evt) {
      var rect = svg.getBoundingClientRect();
      var cx = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
      return (cx * (SVG_W / rect.width) - PX) / SCALE;
    }

    var dragging = false;
    function down(evt) {
      dragging = true;
      svg.focus();
      setU(pointerX(evt));
      evt.preventDefault();
    }
    function move(evt) {
      if (!dragging) return;
      setU(pointerX(evt));
      evt.preventDefault();
    }
    function up() { dragging = false; }

    svg.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    svg.addEventListener("touchstart", down, { passive: false });
    svg.addEventListener("touchmove", move, { passive: false });
    svg.addEventListener("touchend", up);
    svg.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 20 : 6;
      if (e.key === "ArrowLeft") { setU(u - step); e.preventDefault(); e.stopPropagation(); }
      else if (e.key === "ArrowRight") { setU(u + step); e.preventDefault(); e.stopPropagation(); }
    });

    host.__psebRayRender = render;
    render();
  }

  function init(root) {
    injectStyle();
    var nodes = (root || document).querySelectorAll("[data-pseb-raybench]");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].__psebRayRender) continue;
      build(nodes[i]);
    }
  }

  /* The toolbar language toggle must relabel a widget that is already built. */
  function relabel() {
    var nodes = document.querySelectorAll("[data-pseb-raybench]");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].__psebRayRender) nodes[i].__psebRayRender();
    }
  }

  window.PSEBRayBench = { init: init, relabel: relabel };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
  document.addEventListener("pseb:lang", relabel);
})();
