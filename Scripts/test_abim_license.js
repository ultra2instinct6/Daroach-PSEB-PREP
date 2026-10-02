#!/usr/bin/env node
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const code = fs.readFileSync(path.join(__dirname, "../assets/abim-license.js"), "utf8");

function fixture({ query = "", saved = null, response, fetchError, timeoutError, bodyTimeout = false, storageFails = false, storageRejects = false, acknowledge = true, accepted = "true", theme = "NEON" } = {}) {
  const nodes = {};
  let focused = null, calls = 0, request = null, replaced = null, key = saved;
  for (const id of ["licensePaywall", "abimApp", "licenseForm", "licenseKey", "verifyLicenseBtn", "licenseError", "disclaimerModal", "acceptDisclaimerBtn", "accessTheme"]) {
    nodes[id] = {
      hidden: ["licenseError", "licensePaywall"].includes(id), inert: id === "abimApp", value: "", attributes: {},
      listeners: {}, textContent: "",
      addEventListener(type, fn) { this.listeners[type] = fn; },
      setAttribute(name, value) { this.attributes[name] = value; },
      removeAttribute(name) { delete this.attributes[name]; },
      focus() { focused = id; },
      contains(node) {
        return id === "disclaimerModal" ? node === nodes.acceptDisclaimerBtn || node === nodes.accessTheme :
          node === nodes.licenseKey || node === nodes.licenseForm;
      },
      querySelectorAll() { return id === "disclaimerModal" ? [nodes.accessTheme, nodes.acceptDisclaimerBtn] : [nodes.licenseKey, nodes.verifyLicenseBtn]; }
    };
  }
  const document = {
    readyState: "complete", listeners: {},
    body: {
      attributes: {},
      setAttribute(name, value) { this.attributes[name] = value; },
      getAttribute(name) { return this.attributes[name]; },
      classList: { remove(name) { document.removedClass = name; } }
    },
    querySelectorAll() { return [nodes.accessTheme]; },
    getElementById(id) { return nodes[id]; },
    addEventListener(type, fn) { this.listeners[type] = fn; }
  };
  const window = {
    BOLO_MEMCARD: {
      rawGet() { return key; },
      rawSet(name, value) {
        assert.equal(name, "bolo_abim_license_key");
        if (storageFails) throw new Error("Synthetic unavailable storage");
        if (storageRejects) return false;
        key = value;
        return true;
      }
    },
    alert(message) { window.alerted = message; }
  };
  const context = {
    window, document, URL, URLSearchParams, AbortController, clearTimeout,
    localStorage: {
      getItem(name) {
        if (name === "bolo_abim_disclaimer_accepted") return accepted;
        assert.equal(name, "bolo.theme.v1");
        return JSON.stringify({ theme });
      },
      setItem(name, value) {
        assert.equal(name, "bolo.theme.v1");
        theme = JSON.parse(value).theme;
      }
    },
    setTimeout(fn, delay) { return setTimeout(fn, (timeoutError || bodyTimeout) && delay === 15000 ? 5 : delay); },
    console: { error() {} },
    location: { href: "https://example.test/abim.html" + query },
    history: { state: null, replaceState(state, title, url) { replaced = String(url); } },
    async fetch(url, options) {
      calls++;
      request = { url, options };
      if (fetchError) throw new Error("Synthetic network failure");
      if (timeoutError) {
        return new Promise((resolve, reject) => {
          options.signal.addEventListener("abort", () => reject(new Error("Synthetic timeout")));
        });
      }
      return {
        ok: true,
        async json() {
          if (bodyTimeout) {
            return new Promise((resolve, reject) => {
              options.signal.addEventListener("abort", () => reject(new Error("Synthetic body timeout")));
            });
          }
          if (response === "unreadable") throw new SyntaxError("Synthetic malformed JSON");
          return response || { success: true, purchase: { refunded: false, chargebacked: false } };
        }
      };
    }
  };
  vm.runInNewContext(code, context);
  if (acknowledge) nodes.acceptDisclaimerBtn.listeners.click();
  return {
    nodes, window, document,
    get calls() { return calls; }, get request() { return request; },
    get key() { return key; }, get replaced() { return replaced; }, get focused() { return focused; },
    get accepted() { return accepted; },
    async settle() { await new Promise(resolve => setImmediate(resolve)); },
    async submit(value) {
      nodes.licenseKey.value = value;
      nodes.licenseForm.listeners.submit({ preventDefault() {} });
      await this.settle();
    }
  };
}

test("locked by default and empty submission never calls Gumroad", async () => {
  const f = fixture();
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
  assert.equal(f.nodes.abimApp.inert, true);
  await f.submit("   ");
  assert.equal(f.calls, 0);
  assert.match(f.nodes.licenseError.textContent, /Enter/);
});

test("verified activation uses the exact Gumroad form and device storage", async () => {
  const f = fixture();
  await f.submit(" TEST-LICENSE ");
  assert.equal(f.calls, 1);
  assert.equal(f.request.url, "https://api.gumroad.com/v2/licenses/verify");
  assert.equal(f.request.options.method, "POST");
  assert.equal(f.request.options.headers["Content-Type"], "application/x-www-form-urlencoded");
  assert.deepEqual(Object.fromEntries(f.request.options.body), {
    product_permalink: "bolo-abim", license_key: "TEST-LICENSE", increment_uses_count: "true"
  });
  assert.equal(f.key, "TEST-LICENSE");
  assert.equal(f.nodes.abimApp.inert, false);
  assert.equal(f.nodes.licensePaywall.hidden, true);
  await f.window.BOLO_ABIM_ACCESS.ready;
});

test("cached activation unlocks without increasing Gumroad use count", () => {
  const f = fixture({ saved: "TEST-CACHED" });
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), true);
  assert.equal(f.calls, 0);
});

test("URL key is cleaned immediately and verified even when a cache exists", async () => {
  const f = fixture({ query: "?mode=abim&license_key=TEST-REDIRECT#study", saved: "OLD-KEY" });
  assert.equal(f.replaced, "https://example.test/abim.html?mode=abim#study");
  await f.settle();
  assert.equal(f.calls, 1);
  assert.equal(f.key, "TEST-REDIRECT");
});

test("admin URL is cleaned but never bypasses licensing", async () => {
  const f = fixture({ query: "?admin=TEST-NOT-A-LICENSE&mode=abim" });
  await f.settle();
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
  assert.equal(f.calls, 0);
  assert.match(f.nodes.licenseError.textContent, /not supported/);
  assert.equal(f.replaced, "https://example.test/abim.html?mode=abim");
});

for (const scenario of [
  { name: "invalid", response: { success: false, message: "Invalid license key" } },
  { name: "refunded", response: { success: true, purchase: { refunded: true } } },
  { name: "chargebacked", response: { success: true, purchase: { chargebacked: true } } },
  { name: "disputed", response: { success: true, purchase: { disputed: true } } },
  { name: "missing purchase", response: { success: true } },
  { name: "malformed JSON", response: "unreadable" },
  { name: "network failure", fetchError: true }
]) {
  test(scenario.name + " stays locked and shows an error", async () => {
    const f = fixture(scenario);
    await f.submit("TEST-INVALID");
    assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
    assert.equal(f.key, null);
    assert.equal(f.nodes.licenseError.hidden, false);
    assert.ok(f.nodes.licenseError.textContent);
    assert.equal(f.nodes.verifyLicenseBtn.disabled, false);
  });
}

test("storage failure unlocks this visit but explicitly warns it is not remembered", async () => {
  const f = fixture({ storageFails: true });
  await f.submit("TEST-VALID");
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), true);
  assert.equal(f.key, null);
  assert.match(f.window.alerted, /could not save/);
});

test("memory-card rawSet returning false explicitly warns about visit-only activation", async () => {
  const f = fixture({ storageRejects: true });
  await f.submit("TEST-VALID");
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), true);
  assert.equal(f.key, null);
  assert.match(f.window.alerted, /could not save/);
});

test("duplicate submissions issue only one request", async () => {
  const f = fixture();
  f.nodes.licenseKey.value = "TEST-VALID";
  const submit = () => f.nodes.licenseForm.listeners.submit({ preventDefault() {} });
  submit();
  submit();
  await f.settle();
  assert.equal(f.calls, 1);
});

test("background shortcuts are blocked but Gumroad shadow checkout is interactive", () => {
  const f = fixture();
  let prevented = false;
  const event = {
    target: f.nodes.abimApp,
    preventDefault() { prevented = true; },
    stopImmediatePropagation() {}
  };
  f.document.listeners.keydown(event);
  assert.equal(prevented, true);
  prevented = false;
  event.target = {
    shadowRoot: { querySelector() { return { src: "https://deepakroar2.gumroad.com/l/bolo-abim" }; } }
  };
  f.document.listeners.keydown(event);
  assert.equal(prevented, false);
});

test("an invalid redirect does not authorize from an older cache or erase it", async () => {
  const f = fixture({
    query: "?license_key=TEST-INVALID", saved: "TEST-CACHED",
    response: { success: false, message: "Invalid license key" }
  });
  await f.settle();
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
  assert.equal(f.key, "TEST-CACHED");
  assert.equal(f.replaced, "https://example.test/abim.html");
});

test("a hung verification times out and enables retry", async () => {
  const f = fixture({ timeoutError: true });
  await f.submit("TEST-TIMEOUT");
  await new Promise(resolve => setTimeout(resolve, 15));
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
  assert.match(f.nodes.licenseError.textContent, /timed out/);
  assert.equal(f.nodes.verifyLicenseBtn.disabled, false);
});

test("a timeout reading the response body is reported as a timeout, not invalid JSON", async () => {
  const f = fixture({ bodyTimeout: true });
  await f.submit("TEST-BODY-TIMEOUT");
  await new Promise(resolve => setTimeout(resolve, 15));
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
  assert.equal(f.key, null);
  assert.match(f.nodes.licenseError.textContent, /timed out/);
  assert.equal(f.nodes.verifyLicenseBtn.disabled, false);
  assert.equal(f.nodes.licenseKey.readOnly, false);
});

test("every unlicensed visit starts with disclaimer before purchase or license entry", () => {
  const f = fixture({ acknowledge: false });
  assert.equal(f.nodes.disclaimerModal.hidden, false);
  assert.equal(f.nodes.licensePaywall.hidden, true);
  assert.equal(f.calls, 0);
  f.nodes.acceptDisclaimerBtn.listeners.click();
  assert.equal(f.nodes.disclaimerModal.hidden, true);
  assert.equal(f.nodes.licensePaywall.hidden, false);
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), false);
});

for (const accepted of [null, "false", "TRUE", "", "true"]) {
  test("returning purchasers must acknowledge each visit despite stored value " + JSON.stringify(accepted), async () => {
    const f = fixture({ saved: "TEST-CACHED", accepted, acknowledge: false });
    let started = false;
    f.window.BOLO_ABIM_ACCESS.ready.then(() => { started = true; });
    await f.settle();
    assert.equal(started, false);
    assert.equal(f.nodes.licensePaywall.hidden, true);
    assert.equal(f.nodes.disclaimerModal.hidden, false);
    assert.equal(f.nodes.abimApp.inert, true);
    assert.equal(f.focused, "acceptDisclaimerBtn");
    f.nodes.acceptDisclaimerBtn.listeners.click();
    await f.settle();
    assert.equal(f.accepted, accepted);
    assert.equal(started, true);
    assert.equal(f.nodes.disclaimerModal.hidden, true);
    assert.equal(f.nodes.abimApp.inert, false);
  });
}

test("receipt verification is deferred until acknowledgement and starts study after success", async () => {
  const f = fixture({ query: "?license_key=TEST-NEW-LICENSE", acknowledge: false });
  assert.equal(f.calls, 0);
  assert.equal(f.replaced, "https://example.test/abim.html");
  await f.submit("TEST-CANNOT-SUBMIT-YET");
  assert.equal(f.calls, 0);
  f.nodes.acceptDisclaimerBtn.listeners.click();
  await f.settle();
  assert.equal(f.key, "TEST-NEW-LICENSE");
  assert.equal(f.nodes.disclaimerModal.hidden, true);
  assert.equal(f.window.BOLO_ABIM_ACCESS.isUnlocked(), true);
  await f.submit("TEST-DUPLICATE");
  assert.equal(f.calls, 1);
});

test("disclaimer blocks outside events and traps keyboard focus without dismissing", () => {
  const f = fixture({ saved: "TEST-CACHED", acknowledge: false });
  let blocked = 0;
  for (const key of [" ", "Enter", "1", "2", "3", "4"]) {
    f.document.listeners.keydown({
      target: f.nodes.abimApp, key,
      preventDefault() { blocked++; }, stopImmediatePropagation() {}
    });
  }
  assert.equal(blocked, 6);
  let stopped = false;
  f.document.activeElement = f.nodes.acceptDisclaimerBtn;
  f.nodes.disclaimerModal.listeners.keydown({
    key: "Tab", stopPropagation() { stopped = true; }, preventDefault() {}
  });
  assert.equal(stopped, true);
  assert.equal(f.focused, "accessTheme");
  assert.equal(f.nodes.disclaimerModal.hidden, false);
});

test("gate restores Classic theme and switching themes persists continuity", () => {
  const f = fixture({ theme: "CLASSIC", acknowledge: false });
  assert.equal(f.document.body.getAttribute("data-theme"), "CLASSIC");
  f.nodes.accessTheme.listeners.click();
  assert.equal(f.document.body.getAttribute("data-theme"), "NEON");
  assert.equal(f.nodes.accessTheme.textContent, "Theme: Neon");
});

test("checkout events remain blocked until the upfront notice is acknowledged", () => {
  const f = fixture({ acknowledge: false });
  let blocked = false;
  f.document.listeners.click({
    target: { shadowRoot: { querySelector() { return { src: "https://deepakroar2.gumroad.com/l/bolo-abim" }; } } },
    preventDefault() { blocked = true; },
    stopImmediatePropagation() {}
  });
  assert.equal(blocked, true);
  assert.equal(f.nodes.disclaimerModal.hidden, false);
});
