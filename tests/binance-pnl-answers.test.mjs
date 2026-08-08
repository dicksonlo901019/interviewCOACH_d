import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  parseApprovedPnlAnswers,
  validateApprovedPnlAnswers,
  validateRegisteredGuide,
} from "./helpers/interview-content-standard.mjs";

const root = new URL("../", import.meta.url);
const testRoot = new URL("./", import.meta.url);

function pageSection(html, id) {
  const start = html.indexOf(`<section id="${id}"`);
  assert.notEqual(start, -1, `missing section #${id}`);
  const end = html.indexOf("</section><section id=", start);
  return html.slice(start, end === -1 ? undefined : end);
}

test("generates the nine approved Issue #10 answers from the registered authority source", async () => {
  const [authority, generated, registrySource] = await Promise.all([
    readFile(new URL("content/binance/issue-10-pnl-answers.json", root), "utf8"),
    readFile(new URL("public/binance/pnl-answers-data.js", root), "utf8"),
    readFile(new URL("interview-guides.json", root), "utf8"),
  ]);
  const registry = JSON.parse(registrySource);
  const guide = registry.guides.find(({ slug }) => slug === "binance");

  assert.deepEqual(parseApprovedPnlAnswers(generated), JSON.parse(authority));
  assert.equal(validateApprovedPnlAnswers(generated), 9);
  assert.equal(guide.detailedAnswersSource, "content/binance/issue-10-pnl-answers.json");
  assert.equal(guide.detailedAnswers, "public/binance/pnl-answers-data.js");
  assert.equal(guide.detailedAnswersApp, "public/binance/pnl-answers.js");
  const result = await validateRegisteredGuide(testRoot, guide, {
    expectedQuestions: 60,
    minimumTerms: 34,
  });
  assert.equal(result.detailedAnswers, 9);
});

test("renders every detailed answer in the required order and target section", async () => {
  const [html, app, builtHtml, builtData, sourceData, builtApp] = await Promise.all([
    readFile(new URL("public/binance/index.html", root), "utf8"),
    readFile(new URL("public/binance/pnl-answers.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/index.html", root), "utf8"),
    readFile(new URL("pages-dist/binance/pnl-answers-data.js", root), "utf8"),
    readFile(new URL("public/binance/pnl-answers-data.js", root), "utf8"),
    readFile(new URL("pages-dist/binance/pnl-answers.js", root), "utf8"),
  ]);

  assert.equal(builtHtml, html);
  assert.equal(builtData, sourceData);
  assert.equal(builtApp, app);
  assert.match(html, /src="\.\/pnl-answers-data\.js\?v=20260808-binance-pnl-answers1" defer/);
  assert.match(html, /src="\.\/pnl-answers\.js\?v=20260808-binance-pnl-answers1" defer/);
  assert.match(app, /labelledBlock\('中文原版本',[\s\S]*labelledBlock\('中文易口說版',[\s\S]*labelledBlock\('英文口說版',[\s\S]*termBlock\(question\)/);
  assert.match(app, /本題證據與責任邊界/);
  assert.match(app, /body\.insertBefore\(section, research \|\| null\)/);
  assert.match(app, /link\.dataset\.search = `\$\{link\.dataset\.search\} \$\{searchText\}`/);

  const pnlSection = pageSection(html, "st-3-1-pnl");
  const followUpSection = pageSection(html, "st-8");
  assert.doesNotMatch(pnlSection, /st-3-1--stella-可能問|你做過 PnL 到什麼深度？|成本價怎麼算？Deposit/);
  assert.doesNotMatch(followUpSection, /隨機插入追問：internal transfer、late event、source conflict、restatement/);
});

test("keeps term previews keyboard-operable and restores the opener after Escape closes the dialog", async () => {
  const [glossary, app, styles] = await Promise.all([
    readFile(new URL("public/binance/glossary.js", root), "utf8"),
    readFile(new URL("public/binance/pnl-answers.js", root), "utf8"),
    readFile(new URL("public/binance/enhancements.css", root), "utf8"),
  ]);

  assert.match(app, /trigger\.type = 'button'/);
  assert.match(app, /trigger\.dataset\.termKey = term\.key/);
  assert.match(app, /trigger\.setAttribute\('aria-label'/);
  assert.match(glossary, /document\.addEventListener\('mouseover'/);
  assert.match(glossary, /document\.addEventListener\('focusin'/);
  assert.match(glossary, /function open\(termKey, opener\)/);
  assert.match(glossary, /dialog\.addEventListener\('close'/);
  assert.match(glossary, /dialog\.addEventListener\('keydown'[\s\S]*event\.key !== 'Escape'[\s\S]*dialog\.close\(\)/);
  assert.match(glossary, /target\.focus\(\)/);
  assert.match(styles, /@media \(max-width: 900px\)[\s\S]*\.glossary-preview[\s\S]*bottom: 12px/);
  assert.match(styles, /\.approved-term-trigger/);
});
