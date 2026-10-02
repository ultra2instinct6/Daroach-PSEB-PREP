#!/usr/bin/env node
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const html = fs.readFileSync(path.join(__dirname, "../abim.html"), "utf8");

function fixture() {
  const context = {
    ABIM_QUESTIONS: [{ id: "cv-test", system: "CV" }, { id: "id-test", system: "ID" }],
    collected: new Set(["cv-test:0", "cv-test:1", "id-test:0", "stale:0"]),
    reviewSystem: "ALL", reviewQueue: [], reviewMode: false, reviewShown: true,
    reviewStats: {}, filterRow: { hidden: false }, announcer: { textContent: "" },
    allowed: true, rendered: 0,
    findCard(key) { return key !== "stale:0"; },
    dueKeys() { return ["cv-test:0", "id-test:0"]; },
    reviewAllowed() { return context.allowed; },
    renderReview() { context.rendered++; }
  };
  vm.createContext(context);
  const start = html.indexOf("  function keySystem(key)");
  const end = html.indexOf("  function exitReview()", start);
  assert.ok(start >= 0 && end > start);
  vm.runInContext(html.slice(start, end), context);
  return context;
}

test("section review includes only due cards from the selected system", () => {
  const c = fixture();
  c.reviewSystem = "CV";
  c.startReview();
  assert.deepEqual(Array.from(c.reviewQueue), ["cv-test:0"]);
  assert.equal(c.reviewMode, true);
  assert.equal(c.reviewShown, false);
  assert.equal(c.reviewStats.total, 1);
});

test("practice-all includes saved future cards but excludes stale and other-system keys", () => {
  const c = fixture();
  c.reviewSystem = "CV";
  c.startReview(true);
  assert.deepEqual(Array.from(c.reviewQueue).sort(), ["cv-test:0", "cv-test:1"]);
  c.reviewSystem = "ALL";
  c.startReview(true);
  assert.equal(c.reviewQueue.length, 3);
  assert.equal(c.collected.size, 4);
});

test("blocked section switches leave the current queue and screen untouched", () => {
  const c = fixture();
  c.allowed = false;
  c.reviewQueue = ["keep-current:0"];
  c.startReview(true);
  assert.deepEqual(c.reviewQueue, ["keep-current:0"]);
  assert.equal(c.rendered, 0);
  assert.equal(c.reviewMode, false);
});
