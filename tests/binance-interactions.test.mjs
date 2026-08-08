import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("gives the Binance guide a persistent and accessible responsive sidebar", async () => {
  const [html, script, styles] = await Promise.all([
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("public/binance/interactions.js", root), "utf8"),
    readFile(new URL("public/binance/enhancements.css", root), "utf8"),
  ]);

  assert.match(html, /src="\.\/interactions\.js\?v=20260808-binance-interactions6" defer/);
  assert.match(script, /binance-sidebar-collapsed/);
  assert.match(script, /binance-sidebar-collapsed'/);
  assert.match(script, /binance-nav-open/);
  assert.match(script, /localStorage\.setItem\(storageKey/);
  assert.match(script, /aria-keyshortcuts', 'Alt\+M'/);
  assert.match(script, /navToggle\.hidden = true/);
  assert.match(script, /navToggle\.setAttribute\('aria-hidden', 'true'\)/);
  assert.match(script, /menuButton\.removeAttribute\('for'\)/);
  assert.match(script, /event\.altKey && event\.key\.toLowerCase\(\) === 'm'/);
  assert.match(script, /sidebar\.toggleAttribute\('inert', !interactive\)/);
  assert.match(script, /function isKeyboardReachable\(element\)/);
  assert.match(script, /element\.closest\('details:not\(\[open\]\)'\)/);
  assert.match(script, /element\.matches\('summary'\) && element\.parentElement === closedDetails/);
  assert.match(script, /event\.key !== 'Tab'/);
  assert.match(script, /focusHashTarget\(\)/);
  assert.match(script, /aria-current', 'page'/);
  assert.match(script, /document\.addEventListener\('binance:bilingual-ready'/);
  assert.match(styles, /body\.binance-sidebar-collapsed \.app/);
  assert.match(styles, /body\.binance-nav-open[\s\S]*overflow: hidden/);
  assert.match(styles, /\.close-menu[\s\S]*display: none/);
  assert.match(styles, /@media \(max-width: 900px\)[\s\S]*\.close-menu[\s\S]*display: block/);
});

test("previews Binance glossary terms on hover and keyboard focus", async () => {
  const [glossary, styles] = await Promise.all([
    readFile(new URL("public/binance/glossary.js", root), "utf8"),
    readFile(new URL("public/binance/enhancements.css", root), "utf8"),
  ]);

  assert.match(glossary, /function buildPreview\(\)/);
  assert.match(glossary, /preview\.id = 'glossary-preview'/);
  assert.match(glossary, /setAttribute\('role', 'tooltip'\)/);
  assert.match(glossary, /document\.addEventListener\('mouseover'/);
  assert.match(glossary, /document\.addEventListener\('focusin'/);
  assert.match(glossary, /點按可開啟完整名詞解釋/);
  assert.match(glossary, /glossary\.open\(opener\.dataset\.termKey/);
  assert.match(styles, /\.glossary-preview/);
  assert.match(styles, /@media \(max-width: 900px\)[\s\S]*\.glossary-preview[\s\S]*bottom: 12px/);
});
