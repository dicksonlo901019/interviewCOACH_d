import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

export function plainText(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function validateSpeakingCards(html, { minimumCards = 1 } = {}) {
  const cards = [...html.matchAll(/<article class="speaking-card"[\s\S]*?<\/article>/g)].map((match) => match[0]);
  assert.ok(cards.length >= minimumCards, `expected at least ${minimumCards} bilingual speaking cards`);

  for (const [index, card] of cards.entries()) {
    const zhIndex = card.indexOf('class="language-block zh"');
    const enIndex = card.indexOf('class="language-block en"');
    assert.ok(zhIndex >= 0 && enIndex > zhIndex, `card ${index + 1} must show Chinese before English`);

    const zh = plainText(card.match(/class="language-block zh"[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? "");
    const en = plainText(card.match(/class="language-block en"[\s\S]*?<p>([\s\S]*?)<\/p>/)?.[1] ?? "");
    assert.ok(zh.length > 35 && zh.length <= 260, `card ${index + 1} needs a concise Chinese answer`);
    assert.ok(en.split(/\s+/).length >= 25 && en.split(/\s+/).length <= 120, `card ${index + 1} needs a concise English answer`);
    assert.doesNotMatch(zh, /[A-Za-z]/, `card ${index + 1} mixes English into its Chinese answer`);
    assert.doesNotMatch(en, /[\u3400-\u9fff]/, `card ${index + 1} mixes Chinese into its English answer`);
  }

  return cards.length;
}

export function validateGlossary(source, { minimumTerms = 1 } = {}) {
  const keys = [...source.matchAll(/^\s*\['([^']+)',/gm)].map((match) => match[1]);
  assert.ok(keys.length >= minimumTerms, `expected at least ${minimumTerms} bilingual glossary terms`);
  assert.equal(new Set(keys).size, keys.length, "glossary keys must be unique");
  assert.match(source, /中文解釋/);
  assert.match(source, /ENGLISH DEFINITION/);
  assert.match(source, /搜尋中文或英文名詞/);
  return keys.length;
}

export function parseQuestionBankData(source) {
  const prefix = "window.BINANCE_QUESTION_BANK = Object.freeze(";
  assert.ok(source.startsWith(prefix), "question-bank data must use the registered browser payload contract");
  assert.ok(source.trimEnd().endsWith(");"), "question-bank data must close the payload contract");
  return JSON.parse(source.slice(prefix.length, source.lastIndexOf(");")));
}

export function validateQuestionBankData(source, { expectedQuestions = 60 } = {}) {
  const bank = parseQuestionBankData(source);
  assert.equal(bank.questions.length, expectedQuestions, `expected exactly ${expectedQuestions} canonical questions`);
  assert.equal(new Set(bank.questions.map((question) => question.id)).size, bank.questions.length, "canonical question IDs must be unique");
  assert.deepEqual(
    Object.fromEntries(bank.categoryOrder.map(({ key }) => [key, bank.questions.filter((question) => question.category === key).length])),
    { cex: 24, pm: 14, ai: 12, general: 10 },
  );
  assert.equal(Object.keys(bank.sourceSnapshots).length, 4, "question-bank data must preserve all four accepted source snapshots");

  for (const question of bank.questions) {
    const requiredStrings = [
      "questionZh", "questionEn", "whatItTestsZh", "whatItTestsEn",
      "answerZh15", "answerEn15", "followUpZh", "followUpEn",
    ];
    requiredStrings.forEach((field) => assert.ok(question[field]?.trim(), `${question.id} requires ${field}`));
    assert.equal(question.answerZhLong.length, 3, `${question.id} requires three Chinese long-answer points`);
    assert.equal(question.answerEnLong.length, 3, `${question.id} requires three English long-answer points`);
    const chineseOral = [question.answerZh15, ...question.answerZhLong, question.followUpZh];
    const englishOral = [question.answerEn15, ...question.answerEnLong, question.followUpEn];
    chineseOral.forEach((answer) => assert.doesNotMatch(answer, /[A-Za-z]/, `${question.id} mixes English into Chinese oral content`));
    englishOral.forEach((answer) => assert.doesNotMatch(answer, /[\u3400-\u9fff]/, `${question.id} mixes Chinese into English oral content`));
    assert.ok(question.answerZh15.length <= 260, `${question.id} Chinese short answer is too long`);
    assert.ok(question.answerEn15.split(/\s+/).length <= 120, `${question.id} English short answer is too long`);
    assert.ok(question.evidence.length >= 1, `${question.id} requires an evidence boundary`);
    assert.equal(question.timingStatus, "TIMING_HOLD", `${question.id} must not claim unrecorded timing verification`);
  }
  return bank.questions.length;
}

export async function validateRegisteredGuide(root, guide, options = {}) {
  const [speaking, glossary, questionBank] = await Promise.all([
    readFile(new URL(`../${guide.speakingPage}`, root), "utf8"),
    readFile(new URL(`../${guide.glossary}`, root), "utf8"),
    guide.questionBank ? readFile(new URL(`../${guide.questionBank}`, root), "utf8") : Promise.resolve(null),
  ]);
  return {
    cards: questionBank ? validateQuestionBankData(questionBank, options) : validateSpeakingCards(speaking, options),
    terms: validateGlossary(glossary, options),
  };
}
