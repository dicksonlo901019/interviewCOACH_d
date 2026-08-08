import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateGlossary, validateSpeakingCards } from "./helpers/interview-content-standard.mjs";

const root = new URL("../", import.meta.url);

test("publishes the bilingual speaking cards and shared interaction assets", async () => {
  const [source, built, sourceGlossary, builtGlossary, sourceStyles, builtStyles, sourceGuide, builtGuide, sourceSpeech, builtSpeech] = await Promise.all([
    readFile(new URL("public/binance/speaking/index.html", root), "utf8"),
    readFile(new URL("pages-dist/binance/speaking/index.html", root), "utf8"),
    readFile(new URL("public/binance/glossary.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/glossary.js", root), "utf8"),
    readFile(new URL("public/binance/enhancements.css", root), "utf8"),
    readFile(new URL("pages-dist/binance/enhancements.css", root), "utf8"),
    readFile(new URL("public/binance/bilingual-guide.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/bilingual-guide.js", root), "utf8"),
    readFile(new URL("public/binance/speech.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/speech.js", root), "utf8"),
  ]);

  assert.equal(built, source);
  assert.equal(builtGlossary, sourceGlossary);
  assert.equal(builtStyles, sourceStyles);
  assert.equal(builtGuide, sourceGuide);
  assert.equal(builtSpeech, sourceSpeech);
  assert.match(source, /href="\.\.\/"/);
  assert.match(source, /data-card-search/);
  assert.match(source, /data-glossary-open/);
  assert.match(source, /src="\.\.\/glossary\.js\?v=20260808-binance-bilingual6" defer/);
  assert.match(source, /src="\.\.\/speech\.js\?v=20260808-binance-audio11" defer/);
  assert.match(sourceGlossary, /showModal\(\)/);
  assert.match(sourceGlossary, /搜尋中文或英文名詞/);
});

test("adds bilingual speech controls to every spoken answer", async () => {
  const [speaking, guide, main, speech] = await Promise.all([
    readFile(new URL("public/binance/speaking/index.html", root), "utf8"),
    readFile(new URL("public/binance/bilingual-guide.js", root), "utf8"),
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("public/binance/speech.js", root), "utf8"),
  ]);
  assert.equal((speaking.match(/data-speech-pilot/g) ?? []).length, 15);
  assert.match(speaking, /<article class="speaking-card" id="intro" data-speech-pilot/);
  assert.match(speaking, /<article class="speaking-card" id="unknown" data-speech-pilot/);
  assert.match(guide, /pair\.dataset\.speechPilot = ''/);
  assert.doesNotMatch(guide, /id === 'st-2'.*speechPilot/);
  assert.match(main, /src="\.\/speech\.js\?v=20260808-binance-audio11" defer/);
  assert.match(speech, /SpeechSynthesisUtterance/);
  assert.match(speech, /control\.voice\.lang\.replace/);
  assert.match(speech, /google us english/i);
  assert.match(speech, /\^samantha\$/i);
  assert.match(speech, /cantonese\|hong kong/);
  assert.match(speech, /\^zh-\(tw\|cn\|sg\)\$/);
  assert.doesNotMatch(speech, /startsWith\(`\$\{prefix\}-`\)/);
  assert.match(speech, /Choose an English voice/);
  assert.match(speech, /voiceSelect\.value/);
  assert.doesNotMatch(speech, /localStorage/);
  assert.match(speech, /synth\.pause\(\)/);
  assert.match(speech, /synth\.resume\(\)/);
  assert.match(speech, /synth\.cancel\(\)/);
  assert.match(speech, /voiceschanged/);
  assert.deepEqual([...speech.matchAll(/\[0\.8, 1, 1\.2\]/g)].length, 1);
});

test("keeps every spoken answer Chinese-first, English-second, and language-separated", async () => {
  const html = await readFile(new URL("public/binance/speaking/index.html", root), "utf8");
  assert.equal(validateSpeakingCards(html, { minimumCards: 15 }), 15);
});

test("offers a substantial, unique bilingual glossary", async () => {
  const source = await readFile(new URL("public/binance/glossary.js", root), "utf8");
  assert.equal(validateGlossary(source, { minimumTerms: 30 }), 30);
  assert.match(source, /function annotateTerms\(\)/);
  assert.match(source, /inline-term-trigger/);
  assert.match(source, /\['blast-radius'/);
  assert.match(source, /\['ledger-mismatch'/);
});

test("renders every full-guide chapter as Chinese-first and English-second", async () => {
  const source = await readFile(new URL("public/binance/bilingual-guide.js", root), "utf8");
  const ids = [...source.matchAll(/^\s*'([^']+)': \{/gm)].map((match) => match[1]);
  const pairs = [...source.matchAll(/\n\s+zh: '([^']*(?:’[^']*)*)',\n\s+en: '([^']*(?:’[^']*)*)'/g)];
  assert.equal(ids.length, 42);
  assert.equal(pairs.length, 42);
  const titleBlock = source.match(/const chineseTitles = \{([\s\S]*?)\n  \};/)?.[1] ?? "";
  const titles = [...titleBlock.matchAll(/^\s*'[^']+': '([^']+)'/gm)].map((match) => match[1]);
  assert.equal(titles.length, 42);
  titles.forEach((title, index) => assert.doesNotMatch(title, /[A-Za-z]/, `full-guide title ${index + 1} mixes English into Chinese`));
  const phaseBlock = source.match(/const phaseTitles = \[([\s\S]*?)\n  \];/)?.[1] ?? "";
  const phases = [...phaseBlock.matchAll(/^\s*'([^']+)'/gm)].map((match) => match[1]);
  assert.equal(phases.length, 7);
  phases.forEach((title, index) => assert.doesNotMatch(title, /[A-Za-z]/, `navigation phase ${index + 1} mixes English into Chinese`));
  for (const [index, pair] of pairs.entries()) {
    assert.doesNotMatch(pair[1], /[A-Za-z]/, `full-guide answer ${index + 1} mixes English into Chinese`);
    assert.doesNotMatch(pair[2], /[\u3400-\u9fff]/, `full-guide answer ${index + 1} mixes Chinese into English`);
    assert.ok(pair[1].length >= 45, `full-guide Chinese answer ${index + 1} is too short`);
    assert.ok(pair[2].split(/\s+/).length >= 20, `full-guide English answer ${index + 1} is too short`);
  }
  assert.match(source, /'pb-4-5'/);
  assert.match(source, /data\.bilingualQuick|dataset\.bilingualQuick/);
  assert.match(source, /先練會說出口的答案，再讀研究資料/);
  assert.match(source, /問題是單一使用者、帳戶、資產或地區/);
  assert.match(source, /whether the issue affects one user, account, asset, or region/);
  assert.match(source, /完整研究底稿（非口說稿）/);
  assert.match(source, /nodes\.forEach\(\(node\) => content\.append\(node\)\)/);
  assert.match(source, /body\.append\(pair, research\)/);
  assert.doesNotMatch(source, /body\.replaceChildren\(pair\)/);
  assert.match(source, /function normalizeNavigation\(\)/);
  assert.match(source, /function revealResearchTarget\(\)/);
});

test("links the full guide to the speaking cards without changing the CTBC root", async () => {
  const [main, ctbc] = await Promise.all([
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("pages-dist/index.html", root), "utf8"),
  ]);
  assert.match(main, /href="\.\/speaking\/"/);
  assert.match(main, /中文在上，英文在下/);
  assert.match(main, /src="\.\/bilingual-guide\.js\?v=20260808-binance-bilingual7" defer/);
  assert.match(main, /src="\.\/glossary\.js\?v=20260808-binance-bilingual6" defer/);
  assert.match(ctbc, /中國信託/);
  assert.doesNotMatch(ctbc, /雙語口說卡/);
});
