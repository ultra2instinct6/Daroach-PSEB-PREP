#!/usr/bin/env node
"use strict";

// Run from the repository root: node Scripts/audit_abim.js
// Structural checks supplement, but do not replace, medical editorial review.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/abim-data.js"), "utf8"), context);
const data = context.window.ABIM_DATA;
const ids = new Set();
const stems = new Set();
const cards = new Set();
const positions = [0, 0, 0, 0];
const systems = {};
let tableCount = 0;

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function text(value, label) {
  assert.equal(typeof value, "string", label);
  assert.ok(value.trim(), label + " must not be empty");
  assert.ok(!/\b(?:TODO|TBD)\b/.test(value) && value.trim() !== "undefined",
    label + " contains a placeholder");
}

assert.equal(data.QUESTIONS.length, 250, "Expected 250 reviewed questions");
for (const q of data.QUESTIONS) {
  const label = q.id;
  text(q.id, "Question ID");
  assert.ok(!ids.has(q.id), "Duplicate ID: " + q.id);
  ids.add(q.id);
  assert.ok(data.SYSTEMS[q.system], label + ": invalid system");
  assert.ok(data.TASKS[q.task], label + ": invalid task");
  systems[q.system] = (systems[q.system] || 0) + 1;
  text(q.vignette, label + ": vignette");
  text(q.leadIn, label + ": lead-in");
  const stem = normalize(q.vignette + " " + q.leadIn);
  assert.ok(!stems.has(stem), label + ": repeated question stem");
  stems.add(stem);
  assert.equal(q.options.length, 4, label + ": four options required");
  q.options.forEach((option, i) => text(option, label + ": option " + i));
  assert.equal(new Set(q.options.map(normalize)).size, 4, label + ": repeated option");
  assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < 4, label + ": invalid answer key");
  positions[q.correct]++;
  text(q.explanation, label + ": explanation");
  const tags = [];
  for (const match of q.explanation.matchAll(/<([^>]+)>/g)) {
    const tag = match[1];
    assert.ok(/^(?:\/?(?:strong|em)|br\s*\/?)$/.test(tag), label + ": unsupported explanation HTML " + tag);
    if (tag === "strong" || tag === "em") tags.push(tag);
    else if (tag[0] === "/") assert.equal(tags.pop(), tag.slice(1), label + ": unbalanced markup");
  }
  assert.equal(tags.length, 0, label + ": unclosed markup");
  assert.equal(q.flashcards.length, 3, label + ": three cards required");
  q.flashcards.forEach((card, i) => {
    const name = label + ":" + i;
    for (const field of ["f", "b", "x", "t", "m"]) text(card[field], name + "." + field);
    assert.ok(card.t.startsWith("Trap:"), name + ": trap prefix missing");
    const pair = normalize(card.f + " " + card.b);
    assert.ok(!cards.has(pair), name + ": identical front/back card");
    cards.add(pair);
    if (card.tb) {
      tableCount++;
      assert.ok(card.tb.h.length >= 2 && card.tb.h.length <= 4, name + ": table columns");
      card.tb.h.forEach((cell) => text(cell, name + ": table header"));
      assert.ok(card.tb.r.length >= 1, name + ": empty table");
      card.tb.r.forEach((row) => {
        assert.equal(row.length, card.tb.h.length, name + ": ragged table");
        row.forEach((cell) => text(cell, name + ": table cell"));
      });
    }
  });
}
assert.equal(cards.size, 750, "Expected 750 unique front/back pairs");
assert.deepEqual(positions, [64, 62, 62, 62], "Stable, balanced answer positions");
for (const [id, mapping] of Object.entries(data.KEY_REMAP || {})) {
  assert.ok(ids.has(id), "Orphan key migration: " + id);
  assert.equal(new Set(mapping).size, 4, "Invalid answer-key migration: " + id);
}

const html = fs.readFileSync(path.join(root, "abim.html"), "utf8");
let inlineCount = 0;
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/\bsrc\s*=/.test(match[1]) || /\btype\s*=\s*["']application\//.test(match[1])) continue;
  new vm.Script(match[2], { filename: "abim.html:inline-" + (++inlineCount) });
}
console.log("ABIM audit passed: 250 questions, 750 cards, " + tableCount + " tables.");
console.log("Answer positions: " + positions.join("/") + "; inline scripts: " + inlineCount);
console.log("Systems: " + JSON.stringify(systems));
