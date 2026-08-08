import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

function collectAttribute(html, attribute) {
  return [...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map(
    (match) => match[1],
  );
}

test("publishes the approved Binance coach as an isolated Pages route", async () => {
  const [source, built, ctbcRoot] = await Promise.all([
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("pages-dist/binance/index.html", root), "utf8"),
    readFile(new URL("pages-dist/index.html", root), "utf8"),
  ]);

  assert.equal(built, source, "the Pages build must copy the approved artifact byte-for-byte");
  assert.match(source, /<html[^>]+lang="zh-Hant"/i);
  assert.match(source, /<title>Binance Asset Module｜Interview Coach<\/title>/);
  assert.match(source, /id="nav-toggle"/);
  assert.match(source, /id="focus-toggle"/);
  assert.match(source, /src="\.\/interactions\.js\?v=20260808-binance-interactions5" defer/);

  assert.match(ctbcRoot, /中國信託/);
  assert.match(ctbcRoot, /虛擬資產 PM 面試作戰室/);
});

test("keeps every Binance internal link resolvable", async () => {
  const html = await readFile(new URL("public/binance/index.html", root), "utf8");
  const allIds = collectAttribute(html, "id");
  const ids = new Set(allIds);
  const internalTargets = collectAttribute(html, "href")
    .filter((href) => href.startsWith("#"))
    .map((href) => decodeURIComponent(href.slice(1)));

  assert.ok(internalTargets.length > 100, "expected the complete interview guide navigation");
  assert.equal(ids.size, allIds.length, "every internal anchor target must be globally unique");
  for (const target of internalTargets) {
    assert.ok(ids.has(target), `missing internal anchor target: #${target}`);
  }
  assert.match(html, /\.page:target,\.page:has\(:target\)\{display:block\}/);
  assert.match(html, /body:has\(\.page:target,\.page :target\) #quick:not\(:target\)\{display:none\}/);
});

test("retains quick review, five core tasks, chapter paging, menu, and focus controls", async () => {
  const html = await readFile(new URL("public/binance/index.html", root), "utf8");
  const taskGrid = html.match(/<div class="task-grid">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const pagerLinks = [...html.matchAll(/<nav class="pager">([\s\S]*?)<\/nav>/g)]
    .flatMap((match) => collectAttribute(match[1], "href"));

  assert.match(html, /class="quick-link"[^>]+href="#quick"|href="#quick" class="quick-link"/);
  assert.equal((taskGrid.match(/<a href=/g) ?? []).length, 5);
  assert.ok(pagerLinks.length > 100, "expected previous, overview, and next links throughout");
  assert.match(html, /class="menu-label"[^>]*for="nav-toggle"|for="nav-toggle" class="menu-label"/);
  assert.match(html, /class="focus-label"[^>]*for="focus-toggle"|for="focus-toggle" class="focus-label"/);
  assert.match(html, /class="exit-focus"[^>]*for="focus-toggle"|for="focus-toggle" class="exit-focus"/);
  assert.doesNotMatch(html, /\.topbar \.focus-label\{display:none\}/);
  assert.match(html, /@media\(max-width:600px\)[^{]*\{[\s\S]*?\.search-top\{display:none\}/);
});
