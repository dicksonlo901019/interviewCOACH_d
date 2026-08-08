import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(scriptDir, '../content/binance/issue-10-pnl-answers.json');
const outputPath = resolve(scriptDir, '../public/binance/pnl-answers-data.js');
const payload = JSON.parse(await readFile(sourcePath, 'utf8'));
const questions = payload.groups.flatMap((group) => group.questions);

if (questions.length !== 9) throw new Error(`Expected 9 approved questions, found ${questions.length}`);
if (new Set(questions.map((question) => question.id)).size !== questions.length) {
  throw new Error('Approved question IDs must be unique');
}
if (new Set(questions.map((question) => question.question)).size !== questions.length) {
  throw new Error('Approved questions must not be duplicated');
}
if (payload.groups[0]?.targetId !== 'st-3-1-pnl' || payload.groups[0]?.questions.length !== 5) {
  throw new Error('The five Stella questions must map to section 03.01');
}
if (payload.groups[1]?.targetId !== 'st-8' || payload.groups[1]?.questions.length !== 4) {
  throw new Error('The four follow-up questions must map to section 01.05');
}

for (const question of questions) {
  for (const field of ['question', 'boundary']) {
    if (!question[field]?.trim()) throw new Error(`${question.id} requires ${field}`);
  }
  for (const field of ['originalZh', 'spokenZh', 'spokenEn']) {
    if (!Array.isArray(question[field]) || question[field].length === 0 || question[field].some((item) => !item.trim())) {
      throw new Error(`${question.id} requires ${field}`);
    }
  }
  [...question.originalZh, ...question.spokenZh, question.question, question.boundary].forEach((text, index) => {
    const bareLatin = text.replace(/[A-Za-z][A-Za-z0-9& -]*\([^)]*[\u3400-\u9fff][^)]*\)/g, '');
    if (/[A-Za-z]/.test(bareLatin)) throw new Error(`${question.id} Chinese field ${index + 1} contains unexplained English: ${text}`);
  });
  question.spokenEn.forEach((text, index) => {
    if (/[\u3400-\u9fff]/.test(text)) throw new Error(`${question.id} English field ${index + 1} contains Chinese text`);
  });
  question.terms.forEach((term) => {
    if (!term.key || !term.label || !term.definitionZh) throw new Error(`${question.id} has an incomplete term`);
  });
}

const output = `window.BINANCE_PNL_ANSWERS = Object.freeze(${JSON.stringify(payload, null, 2)});\n`;
await writeFile(outputPath, output, 'utf8');
console.log(`Generated ${questions.length} approved PnL answers at ${outputPath}`);
