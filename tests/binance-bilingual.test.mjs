import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateGlossary, validateSpeakingCards } from "./helpers/interview-content-standard.mjs";

const root = new URL("../", import.meta.url);

test("publishes the bilingual speaking cards and shared glossary assets", async () => {
  const [source, built, sourceGlossary, builtGlossary, sourceStyles, builtStyles] = await Promise.all([
    readFile(new URL("public/binance/speaking/index.html", root), "utf8"),
    readFile(new URL("pages-dist/binance/speaking/index.html", root), "utf8"),
    readFile(new URL("public/binance/glossary.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/glossary.js", root), "utf8"),
    readFile(new URL("public/binance/enhancements.css", root), "utf8"),
    readFile(new URL("pages-dist/binance/enhancements.css", root), "utf8"),
  ]);

  assert.equal(built, source);
  assert.equal(builtGlossary, sourceGlossary);
  assert.equal(builtStyles, sourceStyles);
  assert.match(source, /href="\.\.\/"/);
  assert.match(source, /data-card-search/);
  assert.match(source, /data-glossary-open/);
  assert.match(sourceGlossary, /showModal\(\)/);
  assert.match(sourceGlossary, /搜尋中文或英文名詞/);
});

test("keeps every spoken answer Chinese-first, English-second, and language-separated", async () => {
  const html = await readFile(new URL("public/binance/speaking/index.html", root), "utf8");
  assert.equal(validateSpeakingCards(html, { minimumCards: 15 }), 15);
});

test("offers a substantial, unique bilingual glossary", async () => {
  const source = await readFile(new URL("public/binance/glossary.js", root), "utf8");
  assert.equal(validateGlossary(source, { minimumTerms: 25 }), 26);
});

test("links the full guide to the speaking cards without changing the CTBC root", async () => {
  const [main, ctbc] = await Promise.all([
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("pages-dist/index.html", root), "utf8"),
  ]);
  assert.match(main, /href="\.\/speaking\/"/);
  assert.match(main, /中文在上，英文在下/);
  assert.match(main, /src="\.\/glossary\.js" defer/);
  assert.match(ctbc, /中國信託/);
  assert.doesNotMatch(ctbc, /雙語口說卡/);
});
