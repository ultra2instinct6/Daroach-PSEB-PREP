(function () {
  "use strict";

  var THEME_KEY = "pseb.decktheme.v1";
  var FONT_KEY = "pseb.fontscale.v1";
  var FS_MIN = 60;
  var FS_MAX = 140;
  var FS_STEP = 10;
  var FS_DEFAULT = 100;

  function savedTheme() {
    var value = "";
    try { value = localStorage.getItem(THEME_KEY) || ""; } catch (e) {}
    return value === "legacy" ? "legacy" : "instinct";
  }

  function chapterNumber() {
    var match = /Chapter\s+(\d+)/i.exec(document.title || "");
    return match ? parseInt(match[1], 10) : null;
  }

  function subjectTone(chapter) {
    if (chapter == null) return "chem";
    if (chapter >= 1 && chapter <= 5) return "chem";
    if (chapter >= 6 && chapter <= 9) return "bio";
    if (chapter >= 10 && chapter <= 14) return "phy";
    return "env";
  }

  function clampScale(value) {
    value = Math.round(value / FS_STEP) * FS_STEP;
    if (value < FS_MIN) value = FS_MIN;
    if (value > FS_MAX) value = FS_MAX;
    return value;
  }

  function savedScale() {
    var value = NaN;
    try { value = parseInt(localStorage.getItem(FONT_KEY), 10); } catch (e) {}
    return isNaN(value) ? FS_DEFAULT : clampScale(value);
  }

  var root = document.documentElement;
  var scale = savedScale();
  root.setAttribute("data-deck-theme", savedTheme());
  root.setAttribute("data-subject-tone", subjectTone(chapterNumber()));
  if (scale !== FS_DEFAULT) root.style.fontSize = scale + "%";
}());
