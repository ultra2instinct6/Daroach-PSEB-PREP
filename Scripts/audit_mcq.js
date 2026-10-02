#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const html = fs.readFileSync(path.join(__dirname, "../mcq.html"), "utf8");
const scripts = Array.from(html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi), m => m[1]);
scripts.forEach(script => new vm.Script(script));
const source = scripts.find(s => s.includes("const BANKS ="));
assert.ok(source, "MCQ bank script must exist");
const start = source.indexOf("const BANKS =");
const end = source.indexOf("/* ---------------- Question index", start);
assert.ok(end > start, "MCQ bank boundary must exist");
const banks = vm.runInNewContext(source.slice(start, end) + "\nBANKS;");
const ids = new Set(), prompts = new Set(), counts = {};
function bilingual(value, label) {
  for (const lang of ["pa", "en"]) assert.ok(typeof value?.[lang] === "string" && value[lang].trim(), label + " " + lang);
}
for (const [subject, bank] of Object.entries(banks)) {
  counts[subject] = bank.questions.length;
  for (const q of bank.questions) {
    assert.ok(!ids.has(q.id), "Duplicate id: " + q.id);
    ids.add(q.id);
    assert.ok(!prompts.has(q.prompt.en), "Duplicate prompt: " + q.id);
    prompts.add(q.prompt.en);
    for (const key of ["prompt", "objective", "hint", "trap"]) bilingual(q[key], q.id + " " + key);
    assert.equal(q.options.length, 4, q.id + " option count");
    assert.equal(q.options.filter(o => o.correct === true).length, 1, q.id + " answer key");
    for (const o of q.options) {
      bilingual(o.t, q.id + " option");
      bilingual(o.r, q.id + " rationale");
    }
    if (q.table) {
      const t = q.table;
      assert.ok(Array.isArray(t.headers) && t.headers.length && Array.isArray(t.rows), q.id + " table");
      t.headers.forEach((cell, i) => {
        if (i === 0 && cell.pa === "" && cell.en === "") return;
        bilingual(cell, q.id + " table header");
      });
      t.rows.forEach(row => {
        assert.equal(row.length, t.headers.length, q.id + " table width");
        row.forEach(cell => bilingual(cell, q.id + " table cell"));
      });
    }
  }
}
assert.ok(html.includes(ids.size + " board-pattern questions"), "Metadata count must match");
console.log("MCQ audit passed: " + ids.size + " bilingual questions; " + JSON.stringify(counts));
