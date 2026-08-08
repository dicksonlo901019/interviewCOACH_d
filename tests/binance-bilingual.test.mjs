import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateGlossary, validateQuestionBankData } from "./helpers/interview-content-standard.mjs";

const root = new URL("../", import.meta.url);

test("publishes the 60-question bilingual bank and shared interaction assets", async () => {
  const [source, built, sourceGlossary, builtGlossary, sourceStyles, builtStyles, sourceGuide, builtGuide, sourceSpeech, builtSpeech, sourceData, builtData, sourceApp, builtApp] = await Promise.all([
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
    readFile(new URL("public/binance/question-bank-data.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/question-bank-data.js", root), "utf8"),
    readFile(new URL("public/binance/question-bank.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/question-bank.js", root), "utf8"),
  ]);

  assert.equal(built, source);
  assert.equal(builtGlossary, sourceGlossary);
  assert.equal(builtStyles, sourceStyles);
  assert.equal(builtGuide, sourceGuide);
  assert.equal(builtSpeech, sourceSpeech);
  assert.equal(builtData, sourceData);
  assert.equal(builtApp, sourceApp);
  assert.match(source, /href="\.\.\/"/);
  assert.match(source, /data-question-search/);
  assert.match(source, /data-category-filters/);
  assert.match(source, /data-length-control/);
  assert.match(source, /data-language-control/);
  assert.match(source, /data-glossary-open/);
  assert.match(source, /src="\.\.\/question-bank-data\.js\?v=20260808-binance-question-bank1" defer/);
  assert.match(source, /src="\.\.\/question-bank\.js\?v=20260808-binance-question-bank1" defer/);
  assert.match(source, /src="\.\.\/glossary\.js\?v=20260808-binance-question-bank1" defer/);
  assert.match(source, /src="\.\.\/speech\.js\?v=20260808-binance-tingting1" defer/);
  assert.equal(validateQuestionBankData(sourceData), 60);
  assert.match(sourceGlossary, /showModal\(\)/);
  assert.match(sourceGlossary, /搜尋中文或英文名詞/);
});

test("adds bilingual speech controls to every generated oral answer", async () => {
  const [guide, main, speech, questionBankApp] = await Promise.all([
    readFile(new URL("public/binance/bilingual-guide.js", root), "utf8"),
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("public/binance/speech.js", root), "utf8"),
    readFile(new URL("public/binance/question-bank.js", root), "utf8"),
  ]);
  assert.match(questionBankApp, /article\.dataset\.speechPilot = ''/);
  assert.match(questionBankApp, /createAnswerPanel\(question, 'short'\)/);
  assert.match(questionBankApp, /createAnswerPanel\(question, 'long'\)/);
  assert.match(guide, /pair\.dataset\.speechPilot = ''/);
  assert.doesNotMatch(guide, /id === 'st-2'.*speechPilot/);
  assert.match(main, /src="\.\/speech\.js\?v=20260808-binance-tingting1" defer/);
  assert.match(speech, /SpeechSynthesisUtterance/);
  assert.match(speech, /\[data-speech-text\], p/);
  assert.match(speech, /\.answer-panel \.language-block/);
  assert.match(speech, /control\.voice\.lang\.replace/);
  assert.match(speech, /google us english/i);
  assert.match(speech, /\^samantha\$/i);
  assert.match(speech, /\^婷婷\$/i);
  assert.match(speech, /\^zh-cn\$/i);
  assert.match(speech, /const autoSelection = recommended \? voiceKey\(recommended\) : ''/);
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

test("keeps all 60 oral answers bilingual, complete, and evidence-bounded", async () => {
  const source = await readFile(new URL("public/binance/question-bank-data.js", root), "utf8");
  assert.equal(validateQuestionBankData(source), 60);
  assert.match(source, /"id": "CEX-001"/);
  assert.match(source, /"id": "CEX-022"/);
  assert.match(source, /"id": "CEX-024"/);
  assert.match(source, /"id": "PM-014"/);
  assert.match(source, /"id": "AI-012"/);
  assert.match(source, /"id": "GEN-010"/);
  assert.match(source, /"timingStatus": "TIMING_HOLD"/);
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
  assert.equal(ids.length, 50);
  assert.equal(pairs.length, 50);
  const titleBlock = source.match(/const chineseTitles = \{([\s\S]*?)\n  \};/)?.[1] ?? "";
  const titles = [...titleBlock.matchAll(/^\s*'[^']+': '([^']+)'/gm)].map((match) => match[1]);
  assert.equal(titles.length, 50);
  titles.forEach((title, index) => assert.doesNotMatch(title, /[A-Za-z]/, `full-guide title ${index + 1} mixes English into Chinese`));
  const phaseBlock = source.match(/const phaseTitles = \[([\s\S]*?)\n  \];/)?.[1] ?? "";
  const phases = [...phaseBlock.matchAll(/^\s*'([^']+)'/gm)].map((match) => match[1]);
  assert.equal(phases.length, 8);
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
  assert.match(source, /'st-3-1': '\u4e5d十秒提案總覽'/);
  assert.match(source, /'st-3-1-pnl': '\u640d益資料、成本價與頁面迭代'/);
  assert.match(source, /資產控制中心/);
  assert.match(source, /asset control center/);
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
  assert.match(main, /src="\.\/bilingual-guide\.js\?v=20260808-binance-bilingual8" defer/);
  assert.match(main, /src="\.\/glossary\.js\?v=20260808-binance-question-bank1" defer/);
  assert.match(main, /開始 60 題口說練習/);
  assert.match(ctbc, /中國信託/);
  assert.doesNotMatch(ctbc, /60 題雙語口說題庫/);
});
