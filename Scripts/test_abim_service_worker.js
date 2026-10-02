#!/usr/bin/env node
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const code = fs.readFileSync(path.join(__dirname, "../sw.js"), "utf8");

function fixture() {
  const handlers = {}, fetched = [], cached = [];
  const origin = "https://example.test";
  const context = {
    URL, Request, Response,
    self: {
      location: { origin },
      addEventListener(name, handler) { handlers[name] = handler; }
    },
    importScripts() {},
    caches: {
      async open() {
        return {
          async match() { return undefined; },
          async put(request) { cached.push(request.url); }
        };
      },
      async match() { return undefined; }
    },
    async fetch(request) {
      fetched.push(request.url);
      return new Response("<html>Study page</html>", {
        headers: { "Content-Type": "text/html" }
      });
    }
  };
  vm.runInNewContext(code, context);
  return {
    fetched, cached,
    async visit(pathname, method = "GET") {
      let response;
      handlers.fetch({
        request: new Request(origin + pathname, { method }),
        respondWith(promise) { response = promise; },
        waitUntil() {}
      });
      if (response) await response;
      return !!response;
    }
  };
}

test("receipt and admin URLs never enter the service worker cache", async () => {
  const f = fixture();
  for (const url of [
    "/repo/abim.html?license_key=TEST-RECEIPT",
    "/repo/abim.html?mode=abim&license_key=",
    "/repo/abim.html?admin=TEST-ADMIN"
  ]) assert.equal(await f.visit(url), false);
  assert.deepEqual(f.fetched, []);
  assert.deepEqual(f.cached, []);
});

test("ordinary ABIM and public PSEB pages retain offline caching", async () => {
  const f = fixture();
  for (const url of ["/repo/abim.html?mode=abim", "/repo/index.html",
    "/repo/mcq.html", "/repo/flashcards.html",
    "/repo/Chapter%2001%20-%20Chemical%20Reactions/deck.html"]) {
    assert.equal(await f.visit(url), true);
  }
  assert.equal(f.cached.length, 5);
  assert.deepEqual(f.cached, f.fetched);
});

test("POST verification requests are not intercepted", async () => {
  const f = fixture();
  assert.equal(await f.visit("/v2/licenses/verify", "POST"), false);
  assert.deepEqual(f.cached, []);
});
