(function () {
  "use strict";

  const STORAGE_KEY = "bolo_abim_license_key";
  const VERIFY_URL = "https://api.gumroad.com/v2/licenses/verify";
  const PRODUCT = "bolo-abim";
  const url = new URL(location.href);
  const redirectKey = url.searchParams.get("license_key");
  const adminRequested = url.searchParams.has("admin");
  const hasRedirectKey = url.searchParams.has("license_key");
  // Remove receipt credentials before analytics or third-party checkout code runs.
  if (hasRedirectKey || adminRequested) {
    url.searchParams.delete("license_key");
    url.searchParams.delete("admin");
    history.replaceState(history.state, "", url);
  }

  let resolveAccess;
  let unlocked = false;
  const ready = new Promise(resolve => { resolveAccess = resolve; });
  window.BOLO_ABIM_ACCESS = Object.freeze({ ready, isUnlocked: () => unlocked });

  function savedKey() {
    const card = window.BOLO_MEMCARD;
    // Purchases belong to this browser/device, not an individual learner slot.
    return card && card.rawGet ? card.rawGet(STORAGE_KEY) : localStorage.getItem(STORAGE_KEY);
  }
  function storeKey(key) {
    const card = window.BOLO_MEMCARD;
    if (card && card.rawSet) card.rawSet(STORAGE_KEY, key);
    else localStorage.setItem(STORAGE_KEY, key);
  }

  function initialize() {
    const backdrop = document.getElementById("licensePaywall");
    const app = document.getElementById("abimApp");
    const form = document.getElementById("licenseForm");
    const input = document.getElementById("licenseKey");
    const button = document.getElementById("verifyLicenseBtn");
    const error = document.getElementById("licenseError");
    let busy = false;

    function showError(message) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
    }
    function unlock() {
      if (unlocked) return;
      unlocked = true;
      backdrop.hidden = true;
      app.inert = false;
      app.removeAttribute("aria-hidden");
      document.body.classList.remove("abim-access-locked");
      resolveAccess();
    }
    async function verify(key) {
      if (busy || unlocked) return;
      key = key.trim();
      if (!key) {
        showError("Enter the license key from your Gumroad receipt.");
        input.focus();
        return;
      }
      busy = true;
      button.disabled = true;
      button.textContent = "Verifying...";
      input.readOnly = true;
      form.setAttribute("aria-busy", "true");
      error.hidden = true;
      input.removeAttribute("aria-invalid");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(VERIFY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            product_permalink: PRODUCT,
            license_key: key,
            increment_uses_count: "true"
          }),
          signal: controller.signal,
          credentials: "omit",
          referrerPolicy: "no-referrer"
        });
        let data;
        try { data = await response.json(); }
        catch (parseError) {
          console.error("Gumroad returned an unreadable verification response.");
          showError("The license service returned an unreadable response. Please try again.");
          return;
        }
        if (!data || typeof data !== "object") {
          showError("The license service returned an unexpected response. Please try again.");
          return;
        }
        if (!response.ok || data.success !== true) {
          showError(typeof data.message === "string" && data.message.trim()
            ? data.message : "Invalid license key");
          return;
        }
        if (!data.purchase || typeof data.purchase !== "object" ||
            Array.isArray(data.purchase)) {
          showError("The license service did not confirm a purchase. Please try again.");
          return;
        }
        if (data.purchase.refunded === true || data.purchase.chargebacked === true ||
            data.purchase.disputed === true) {
          showError("This purchase was refunded or disputed and cannot unlock access. Contact the seller if this is unexpected.");
          return;
        }
        try { storeKey(key); }
        catch (storageError) {
          console.error("Verified ABIM access could not be remembered on this device.");
          showError("License verified, but this browser could not save it. Access is unlocked for this visit; enable local storage to remember it.");
          // Do not show a success-shaped persistence result: explain it before unlocking.
          window.alert("License verified. Your browser could not save the key; you will need to verify again on your next visit.");
        }
        input.value = "";
        unlock();
      } catch (networkError) {
        console.error("Gumroad license verification could not complete.");
        showError(controller.signal.aborted
          ? "Verification timed out. Check your connection and try again."
          : "Unable to reach Gumroad. Check your connection and try again.");
      } finally {
        clearTimeout(timeout);
        busy = false;
        button.disabled = false;
        button.textContent = "Verify & Unlock";
        input.readOnly = false;
        form.setAttribute("aria-busy", "false");
      }
    }

    // Capture events as well as using inert: app shortcuts cannot run behind the gate.
    ["click", "pointerdown", "contextmenu", "keydown"].forEach(type => {
      document.addEventListener(type, event => {
        if (unlocked || backdrop.contains(event.target)) return;
        // Gumroad mounts checkout in a shadow root outside our paywall.
        const checkout = event.target.shadowRoot && event.target.shadowRoot.querySelector("iframe");
        if (checkout && checkout.src) {
          const host = new URL(checkout.src).hostname;
          if (host === "gumroad.com" || host.endsWith(".gumroad.com")) return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
      }, true);
    });
    backdrop.addEventListener("keydown", event => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); }
      if (event.key !== "Tab") return;
      const controls = Array.from(backdrop.querySelectorAll("input, button:not(:disabled), a[href]"));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      verify(input.value);
    });

    if (hasRedirectKey) {
      input.value = redirectKey || "";
      verify(input.value);
    } else if (adminRequested) {
      showError("URL administrator bypass is not supported. Enter a purchased Gumroad license key.");
    } else {
      try {
        const key = savedKey();
        if (typeof key === "string" && key.trim()) { unlock(); return; }
      } catch (storageError) {
        console.error("Saved ABIM activation could not be read.");
        showError("Saved activation could not be read. Enter your key to unlock this visit.");
      }
    }
    input.focus();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
