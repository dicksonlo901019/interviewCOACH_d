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

export async function validateRegisteredGuide(root, guide, options = {}) {
  const [speaking, glossary] = await Promise.all([
    readFile(new URL(`../${guide.speakingPage}`, root), "utf8"),
    readFile(new URL(`../${guide.glossary}`, root), "utf8"),
  ]);
  return {
    cards: validateSpeakingCards(speaking, options),
    terms: validateGlossary(glossary, options),
  };
}
