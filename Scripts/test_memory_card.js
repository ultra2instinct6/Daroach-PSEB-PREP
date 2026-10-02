#!/usr/bin/env node
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const code = fs.readFileSync(path.join(__dirname, "../assets/memory-card.js"), "utf8");

function fixture() {
  const values = new Map(), warnings = [];
  class Storage {
    get length() { return values.size; }
    key(i) { return Array.from(values.keys())[i] || null; }
    getItem(k) { return values.get(k) ?? null; }
    setItem(k, v) { values.set(k, String(v)); }
    removeItem(k) { values.delete(k); }
  }
  const localStorage = new Storage();
  const window = {
    localStorage, Storage, addEventListener() {},
    dispatchEvent() { return false; }
  };
  const document = {
    readyState: "loading", addEventListener() {},
    getElementsByTagName() { return []; },
    documentElement: { setAttribute() {} },
    body: { appendChild() {} },
    createElement() { return { style: {}, click() {}, remove() {} }; }
  };
  const context = {
    window, document, localStorage, Date, JSON, Promise, Blob,
    URL: { createObjectURL() { return "blob:test"; }, revokeObjectURL() {} },
    CustomEvent: class { constructor(name, options) { this.type = name; this.detail = options.detail; } },
    setTimeout() { return 1; }, clearTimeout() {},
    console: { warn(message) { warnings.push(message); } }
  };
  vm.runInNewContext(code, context);
  return { mc: window.BOLO_MEMCARD, localStorage, values, warnings };
}

test("activation is device-wide, excluded from save files and preserved by slot reset", () => {
  const f = fixture(), mc = f.mc;
  f.localStorage.setItem("bolo_abim_license_key", "TEST-DEVICE");
  f.localStorage.setItem("bolo_abim_disclaimer_accepted", "true");
  f.localStorage.setItem("bolo.abim.v1", '{"cards":["TEST:0"]}');
  f.localStorage.setItem("bolo_mcq_attempts_v1", '{"SCIENCE":{"answers":{"TEST":0}}}');
  for (const key of ["bolo_abim_license_key", "bolo_abim_disclaimer_accepted"]) {
    assert.equal(mc.isScoped(key), false);
    assert.equal(mc.physicalKey(key, 2), key);
  }
  const file = mc.exportSlot(1);
  assert.equal(file.slots[0].data["bolo.abim.v1"], '{"cards":["TEST:0"]}');
  assert.equal(file.slots[0].data.bolo_abim_license_key, undefined);
  assert.equal(file.slots[0].data.bolo_abim_disclaimer_accepted, undefined);
  mc.eraseSlot(1);
  assert.equal(f.values.get("bolo_abim_license_key"), "TEST-DEVICE");
  assert.equal(f.values.get("bolo_abim_disclaimer_accepted"), "true");
  assert.equal(f.values.has("bolo.abim.v1"), false);
});

test("slot import round-trips PSEB and ABIM study keys without importing activation", () => {
  const f = fixture(), mc = f.mc;
  for (const key of ["pseb.progress.v1", "bolo_mcq_attempts_v1", "bolo_mcq_history_v1",
    "bolo_flash_db", "bolo.abim.v1"]) f.localStorage.setItem(key, '{"synthetic":true}');
  const file = mc.exportSlot(1);
  file.slots[0].data.bolo_abim_license_key = "TEST-OLD-EXPORT";
  file.slots[0].data.bolo_abim_disclaimer_accepted = "true";
  mc.createSlot(2, { name: "Synthetic test" });
  mc.importSlot(2, JSON.stringify(file));
  for (const key of Object.keys(file.slots[0].data).filter(k => mc.isScoped(k))) {
    assert.equal(f.values.get("bolo_slot_2::" + key), '{"synthetic":true}');
    assert.equal(f.values.get(key), '{"synthetic":true}');
  }
  assert.equal(f.values.has("bolo_abim_license_key"), false);
  assert.equal(f.values.has("bolo_slot_2::bolo_abim_license_key"), false);
  assert.equal(f.warnings.length, 2);
});

test("whole-card exports include all learner data but no device license", () => {
  const f = fixture();
  f.mc.createSlot(2, { name: "Synthetic second learner" });
  f.mc.rawSet("bolo.abim.v1", '{"learner":1}');
  f.mc.rawSet("bolo_slot_2::bolo.abim.v1", '{"learner":2}');
  f.mc.rawSet("bolo_abim_license_key", "TEST-DEVICE");
  const file = f.mc.exportCard();
  assert.equal(file.slots.length, 2);
  assert.equal(file.slots[0].data["bolo.abim.v1"], '{"learner":1}');
  assert.equal(file.slots[1].data["bolo.abim.v1"], '{"learner":2}');
  assert.equal(JSON.stringify(file).includes("TEST-DEVICE"), false);
});

test("invalid import is rejected before changing existing learner progress", () => {
  const f = fixture();
  f.localStorage.setItem("bolo.abim.v1", '{"keep":"original"}');
  const file = f.mc.exportSlot(1);
  file.slots[0].data.unrecognized_key = "INVALID";
  assert.throws(() => f.mc.importSlot(1, JSON.stringify(file)), /unknown key/);
  assert.equal(f.localStorage.getItem("bolo.abim.v1"), '{"keep":"original"}');
});
