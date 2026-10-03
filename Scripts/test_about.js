#!/usr/bin/env node
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const script = fs.readFileSync(path.join(__dirname, "../assets/about.js"), "utf8");

test("homepage and offline shell include About assets and a labelled native dialog", () => {
  const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const worker = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");
  for (const asset of ["assets/about.js", "assets/about.css"]) {
    assert.ok(html.includes(asset));
    assert.ok(worker.includes(`"./${asset}"`));
  }
  assert.match(html, /<dialog[^>]*id="aboutDialog"[^>]*aria-labelledby="aboutTitle"/);
  assert.match(html, /id="aboutTitle"/);
});

function fixture() {
  let focused = null;
  const classes = new Set();
  function element() {
    return {
      listeners: {}, attributes: {}, visible: true,
      addEventListener(name, handler) { this.listeners[name] = handler; },
      setAttribute(name, value) { this.attributes[name] = value; },
      getClientRects() { return this.visible ? [{}] : []; },
      focus() { focused = this; },
      fire(name, event = {}) { this.listeners[name](event); }
    };
  }
  const triggers = [element(), element()];
  const close = element();
  const back = element();
  const dialog = Object.assign(element(), {
    open: false, scrollTop: 200,
    showModal() { this.open = true; },
    close() { this.open = false; this.fire("close"); },
    getBoundingClientRect() { return { left: 20, right: 400, top: 20, bottom: 600 }; },
    querySelectorAll() { return [close, back]; }
  });
  const document = {
    getElementById() { return dialog; },
    querySelectorAll() { return triggers; },
    body: { classList: { add(c) { classes.add(c); }, remove(c) { classes.delete(c); } } }
  };
  vm.runInNewContext(script, { document });
  return { triggers, dialog, close, back, classes, focused: () => focused };
}

test("About includes all requested video links and the existing ABIM purchase destination", () => {
  const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const about = html.slice(html.indexOf('<dialog class="about-dialog"'), html.indexOf("</dialog>"));
  const abim = fs.readFileSync(path.join(__dirname, "../abim.html"), "utf8");
  const purchaseUrl = "https://deepakroar2.gumroad.com/l/bolo-abim";
  const urls = [
    "https://www.youtube.com/watch?v=6o5RprIJmfA",
    "https://www.youtube.com/watch?v=fXMrZvcduOw",
    "https://www.youtube.com/watch?v=M5WLtRaZOqI",
    purchaseUrl
  ];
  const links = Array.from(about.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g));
  for (const url of urls) {
    const matching = links.filter(link => link[1].includes(`href="${url}"`));
    assert.equal(matching.length, 1, url);
    assert.match(matching[0][1], /target="_blank"/);
    assert.match(matching[0][1], /rel="noopener noreferrer"/);
    assert.match(matching[0][2], /New tab/);
  }
  assert.ok(abim.includes(`href="${purchaseUrl}"`));
  assert.match(about, /It is not about the money/);
  assert.match(about, /working on this project independently/);
  assert.match(about, /expand to multiple languages/);
  assert.match(about, /not a finding about PSEB examination marking/);
});

test("the board-preparation product is branded BOLO.IM without breaking Gumroad compatibility", () => {
  const home = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const page = fs.readFileSync(path.join(__dirname, "../abim.html"), "utf8");
  const purchaseUrl = "https://deepakroar2.gumroad.com/l/bolo-abim";
  assert.match(page, /<title>BOLO\.IM — Internal Medicine Board Prep<\/title>/);
  assert.match(page, /<h1 id="licenseTitle">BOLO\.IM Full Access<\/h1>/);
  assert.match(page, /BOLO\.IM is an independently developed educational tool/);
  assert.doesNotMatch(page, /BOLO\.ABIM/);
  assert.match(home, /class="abim-launch"[^>]*aria-label="Open BOLO\.IM/);
  assert.match(home, /class="abim-launch-label">BOLO\.IM<\/span>/);
  assert.ok(page.includes(`href="${purchaseUrl}"`));
  assert.ok(fs.readFileSync(path.join(__dirname, "../assets/abim-license.js"), "utf8")
    .includes('const PRODUCT = "bolo-abim"'));
});

test("either credit opens About, resets scroll and updates both triggers", () => {
  for (const index of [0, 1]) {
    const f = fixture();
    f.triggers[index].fire("click");
    assert.equal(f.dialog.open, true);
    assert.equal(f.dialog.scrollTop, 0);
    assert.ok(f.classes.has("about-open"));
    f.triggers.forEach(t => assert.equal(t.attributes["aria-expanded"], "true"));
  }
});

test("About ends with a bilingual AI disclosure that does not promise exhaustive review", () => {
  const html = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
  const disclosure = html.match(/<section class="about-ai-disclosure"[\s\S]*?<\/section>/);
  assert.ok(disclosure);
  assert.match(disclosure[0], /aria-labelledby="aboutAiTitle"/);
  assert.match(disclosure[0], /including parts of this About text/);
  assert.match(disclosure[0], /do not guarantee that every item is accurate/);
  assert.match(disclosure[0], /wrong answer keys, translation errors/);
  assert.match(disclosure[0], /current PSEB textbooks/);
  assert.match(disclosure[0], /never use this website to make patient-care decisions/);
  assert.match(disclosure[0], /lang="pa"/);
  assert.match(html.slice(html.indexOf(disclosure[0]) + disclosure[0].length), /^\s*<\/footer>\s*<\/article>\s*<\/dialog>/);
});

test("close and back-to-learning restore focus and release scroll lock", () => {
  for (const control of ["close", "back"]) {
    const f = fixture();
    f.triggers[1].fire("click");
    f[control].fire("click");
    assert.equal(f.dialog.open, false);
    assert.equal(f.classes.has("about-open"), false);
    assert.equal(f.focused(), f.triggers[1]);
    f.triggers.forEach(t => assert.equal(t.attributes["aria-expanded"], "false"));
  }
});

test("Escape closes without leaking to homepage shortcuts", () => {
  const f = fixture();
  f.triggers[0].fire("click");
  let prevented = false;
  let stopped = false;
  f.dialog.fire("keydown", {
    key: "Escape",
    preventDefault() { prevented = true; },
    stopPropagation() { stopped = true; }
  });
  assert.equal(f.dialog.open, false);
  assert.ok(prevented && stopped);
});

test("backdrop click dismisses but a press inside the card does not", () => {
  const f = fixture();
  f.triggers[0].fire("click");
  f.dialog.fire("pointerdown", { target: f.dialog, clientX: 25, clientY: 25 });
  f.dialog.fire("click", { target: f.dialog, clientX: 10, clientY: 10 });
  assert.equal(f.dialog.open, true);
  const outside = { target: f.dialog, clientX: 10, clientY: 10 };
  f.dialog.fire("pointerdown", outside);
  f.dialog.fire("click", outside);
  assert.equal(f.dialog.open, false);
});

test("closing after a responsive breakpoint change focuses the visible credit", () => {
  const f = fixture();
  f.triggers[0].fire("click");
  f.triggers[0].visible = false;
  f.dialog.close();
  assert.equal(f.focused(), f.triggers[1]);
});
