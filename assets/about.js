(function () {
  "use strict";
  var dialog = document.getElementById("aboutDialog");
  var triggers = document.querySelectorAll("[data-open-about]");
  var opener = null;
  var backdropPress = false;

  function outsideCard(event) {
    var rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      opener = trigger;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("about-open");
      triggers.forEach(function (button) { button.setAttribute("aria-expanded", "true"); });
    });
  });
  dialog.querySelectorAll(".about-close, [data-close-about]").forEach(function (button) {
    button.addEventListener("click", function () { dialog.close(); });
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      dialog.close();
    }
  });
  dialog.addEventListener("pointerdown", function (event) {
    backdropPress = event.target === dialog && outsideCard(event);
  });
  dialog.addEventListener("click", function (event) {
    if (backdropPress && event.target === dialog && outsideCard(event)) dialog.close();
    backdropPress = false;
  });
  dialog.addEventListener("close", function () {
    document.body.classList.remove("about-open");
    triggers.forEach(function (button) { button.setAttribute("aria-expanded", "false"); });
    var target = opener && opener.getClientRects().length ? opener :
      Array.from(triggers).find(function (button) { return button.getClientRects().length; });
    if (target) target.focus({ preventScroll: true });
  });
})();
