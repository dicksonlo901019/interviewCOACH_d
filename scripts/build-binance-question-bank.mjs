import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(scriptDir, '../..');
const sourceDir = resolve(workspaceRoot, 'interviews/cross-domain-question-bank');
const outputPath = resolve(scriptDir, '../public/binance/question-bank-data.js');

const sources = [
  { file: '01-cex-domain-knowhow.md', key: 'cex', zh: '中心化交易所', en: 'CEX Domain Know-how' },
  { file: '02-product-management-domain-knowhow.md', key: 'pm', zh: '產品管理', en: 'Product Management Domain Know-how' },
  { file: '03-ai-agent-workflow-domain-knowhow.md', key: 'ai', zh: '人工智慧工作流程', en: 'AI Agent Workflow Domain Know-how' },
  { file: '04-general-interview-questions.md', key: 'general', zh: '通用', en: 'General Interview Questions' },
];

function cleanInline(value = '') {
  return value
    .replace(/&amp;/g, '&')
    .replace(/`/g, '')
    .replace(/\*\*/g, '')
    .replace(/\\([*_])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function naturalizeChineseAnswer(value) {
  let result = cleanInline(value);
  result = result.replace(/\b[A-Za-z][A-Za-z0-9+.-]*(?:[ /／-][A-Za-z0-9+.-]+){0,5}（([^）]+)）/g, '$1');
  const replacements = [
    [/Binance/g, '幣安'],
    [/Fameex 與 TopOne 相關的/g, '兩個'],
    [/Sumsub／Authme/g, '身分驗證供應商'],
    [/Web3/g, '區塊鏈與去中心化產品'],
    [/AI-assisted/g, '人工智慧輔助'],
    [/AI agent/gi, '人工智慧代理'],
    [/AI/g, '人工智慧'],
    [/CEX/g, '中心化交易所'],
    [/PnL/gi, '損益'],
    [/P&L/gi, '損益'],
    [/PM peer review/gi, '產品經理同儕審查'],
    [/PM/g, '產品經理'],
    [/PRD/g, '產品需求文件'],
    [/API/g, '應用程式介面'],
    [/KPI/g, '關鍵績效指標'],
    [/SaaS/g, '軟體即服務'],
    [/CRM/g, '客戶關係管理'],
    [/RAG/g, '檢索增強生成'],
    [/PII/g, '個人識別資訊'],
    [/ETL/g, '資料擷取、轉換與載入'],
    [/LLM/g, '大型語言模型'],
    [/Figma Automation/g, '設計工具自動化'],
    [/IR／DS Dictionary／Semantic Mapping/g, '資訊架構、設計字典與語意映射'],
    [/IR\/DS Dictionary\/Semantic Mapping/g, '資訊架構、設計字典與語意映射'],
    [/DS Dictionary/g, '設計字典'],
    [/Semantic Mapping/g, '語意映射'],
    [/Task Contract/g, '任務契約'],
    [/artifact manifest/gi, '產物清單'],
    [/artifact folder contract/gi, '產物資料夾契約'],
    [/artifact folder/gi, '產物資料夾'],
    [/artifact/gi, '產物'],
    [/handoff contract/gi, '交接契約'],
    [/event log/gi, '事件紀錄'],
    [/reviewer correction loop/gi, '審查修正迴圈'],
    [/reviewer/gi, '審查者'],
    [/ownership/gi, '負責範圍'],
    [/owner/gi, '負責人'],
    [/production board/gi, '正式工作看板'],
    [/production/gi, '正式環境'],
    [/rollout/gi, '全面導入'],
    [/pilot/gi, '試點'],
    [/frontend/gi, '前端'],
    [/local/gi, '本地'],
    [/state/gi, '狀態'],
    [/gate/gi, '確認關卡'],
    [/Skill/g, '技能規範'],
    [/Jira/g, '工作管理工具'],
    [/CEO/g, '執行長'],
    [/P0[–-]P5/g, '固定優先級標籤'],
    [/HOLD/g, '保留且不可主張'],
    [/UNKNOWN/g, '未知'],
    [/DOMAIN_PRINCIPLE/g, '領域原則'],
    [/TRANSFERABLE/g, '可轉移能力'],
    [/DIRECT/g, '直接證據'],
    [/NEEDS_DECISION/g, '需要決策'],
    [/days-to-hours/gi, '由數日縮短至數小時'],
  ];
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });
  return result
    .replace(/\s+/g, ' ')
    .replace(/([\u3400-\u9fff]) +(?=[\u3400-\u9fff])/g, '$1')
    .trim();
}

function naturalizeEnglishAnswer(value) {
  return cleanInline(value)
    .replace(/Fameex and TopOne-related exchange products/gi, 'two centralized-exchange products')
    .replace(/Sumsub and Authme/gi, 'identity-verification providers')
    .replace(/P0[–-]P5/g, 'fixed priority labels');
}

function extract(source, pattern, label, id) {
  const match = source.match(pattern);
  if (!match) throw new Error(`${id}: missing ${label}`);
  return cleanInline(match[1]);
}

function extractLongAnswers(section, language, id) {
  const pattern = language === 'zh'
    ? /\*\*長答核心[^\n]*：\*\*\s*\n\n([\s\S]*?)(?=\n### English)/
    : /\*\*Long-answer core[^\n]*:\*\*\s*\n\n([\s\S]*?)(?=\n### 繁體中文追問)/;
  const match = section.match(pattern);
  if (!match) throw new Error(`${id}: missing ${language} long answer`);
  const block = match[1];
  const points = [...block.matchAll(/(?:^|\n)\d+\.\s+([^\n]+)/g)].map((match) => cleanInline(match[1]));
  if (points.length !== 3) throw new Error(`${id}: expected three ${language} long-answer points, found ${points.length}`);
  return language === 'zh' ? points.map(naturalizeChineseAnswer) : points;
}

function parseTestIntents(markdown) {
  const intents = new Map();
  for (const match of markdown.matchAll(/^\| ((?:CEX|PM|AI|GEN)-\d{3}) \| ([^|]+) \| ([^|]+) \|$/gm)) {
    intents.set(match[1], { zh: cleanInline(match[2]), en: cleanInline(match[3]) });
  }
  return intents;
}

function parseEvidence(sourceLine) {
  const order = ['DIRECT', 'TRANSFERABLE', 'DOMAIN_PRINCIPLE', 'UNKNOWN', 'HOLD'];
  return order.filter((key) => new RegExp(`\\b${key}\\b`).test(sourceLine));
}

function parseQuestions(markdown, sourceConfig) {
  const intents = parseTestIntents(markdown);
  const sectionPattern = /^## ((?:CEX|PM|AI|GEN)-\d{3})｜([^\n]+)\n([\s\S]*?)(?=^---\n\n## |$(?![\s\S]))/gm;
  const questions = [];
  for (const match of markdown.matchAll(sectionPattern)) {
    const id = match[1];
    const section = match[3];
    const intent = intents.get(id);
    if (!intent) throw new Error(`${id}: missing bilingual test intent`);
    const sourceLine = extract(section, /^\*\*來源與狀態\*\*：([^\n]+)$/m, 'source status', id);
    const question = {
      id,
      slug: id.toLowerCase(),
      category: sourceConfig.key,
      categoryZh: sourceConfig.zh,
      categoryEn: sourceConfig.en,
      titleZh: cleanInline(match[2]),
      questionZh: extract(section, /^\*\*題目：\*\* ([^\n]+)$/m, 'Chinese question', id),
      questionEn: extract(section, /^\*\*Question:\*\* ([^\n]+)$/m, 'English question', id),
      whatItTestsZh: intent.zh,
      whatItTestsEn: intent.en,
      answerZh15: naturalizeChineseAnswer(extract(section, /^\*\*15 秒回答[^\n]*：\*\* ([^\n]+)$/m, 'Chinese 15-second answer', id)),
      answerEn15: naturalizeEnglishAnswer(extract(section, /^\*\*15-second answer[^\n]*:\*\* ([^\n]+)$/m, 'English 15-second answer', id)),
      answerZhLong: extractLongAnswers(section, 'zh', id),
      answerEnLong: extractLongAnswers(section, 'en', id).map(naturalizeEnglishAnswer),
      followUpZh: naturalizeChineseAnswer(extract(section, /^### 繁體中文追問\s*\n\s*> ([^\n]+)$/m, 'Chinese follow-up', id)),
      followUpEn: naturalizeEnglishAnswer(extract(section, /^### English follow-up\s*\n\s*> ([^\n]+)$/m, 'English follow-up', id)),
      evidence: parseEvidence(sourceLine),
      timingStatus: 'TIMING_HOLD',
    };
    const chineseOralFields = [question.answerZh15, ...question.answerZhLong, question.followUpZh];
    chineseOralFields.forEach((field, index) => {
      if (/[A-Za-z]/.test(field)) throw new Error(`${id}: Chinese oral field ${index + 1} still contains Latin text: ${field}`);
    });
    const englishOralFields = [question.answerEn15, ...question.answerEnLong, question.followUpEn];
    englishOralFields.forEach((field, index) => {
      if (/[\u3400-\u9fff]/.test(field)) throw new Error(`${id}: English oral field ${index + 1} contains Chinese text: ${field}`);
    });
    questions.push(question);
  }
  return questions;
}

const questions = [];
const snapshots = {};
for (const config of sources) {
  const path = resolve(sourceDir, config.file);
  const markdown = await readFile(path, 'utf8');
  snapshots[config.file] = createHash('sha256').update(markdown).digest('hex');
  questions.push(...parseQuestions(markdown, config));
}

if (questions.length !== 60) throw new Error(`Expected 60 canonical questions, found ${questions.length}`);
if (new Set(questions.map((question) => question.id)).size !== questions.length) throw new Error('Canonical question IDs must be unique');

const payload = {
  version: '2026-08-08',
  status: 'FORMAL_V1_INDEPENDENTLY_ACCEPTED_TIMING_HOLD',
  sourceSnapshots: snapshots,
  categoryOrder: sources.map(({ key, zh, en }) => ({ key, zh, en })),
  questions,
};

const output = `window.BINANCE_QUESTION_BANK = Object.freeze(${JSON.stringify(payload, null, 2)});\n`;
await writeFile(outputPath, output, 'utf8');
console.log(`Generated ${questions.length} oral-practice questions at ${outputPath}`);
