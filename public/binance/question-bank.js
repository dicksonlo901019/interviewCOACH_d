(() => {
  'use strict';

  const bank = window.BINANCE_QUESTION_BANK;
  const root = document.querySelector('[data-question-bank-root]');
  if (!bank || !root) return;

  const evidenceLabels = {
    DIRECT: ['直接經驗', 'Direct evidence'],
    TRANSFERABLE: ['可轉移能力', 'Transferable capability'],
    DOMAIN_PRINCIPLE: ['領域原則', 'Domain principle'],
    UNKNOWN: ['未知', 'Unknown'],
    HOLD: ['不可主張', 'Hold'],
  };
  const state = { category: 'cex', length: 'short', language: 'both', query: '' };

  function element(tag, className = '', text = '') {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function languageBlock(language, label, content, ordered = false) {
    const block = element('div', `language-block ${language}`);
    block.lang = language === 'zh' ? 'zh-Hant' : 'en';
    block.append(element('span', 'language-label', label));
    if (ordered) {
      const list = element('ol', 'oral-points');
      list.dataset.speechText = '';
      content.forEach((point) => list.append(element('li', '', point)));
      block.append(list);
    } else {
      const paragraph = element('p', '', content);
      paragraph.dataset.speechText = '';
      block.append(paragraph);
    }
    return block;
  }

  function bilingualPair(zh, en, className = '') {
    const pair = element('div', `question-bilingual-pair ${className}`.trim());
    pair.append(
      languageBlock('zh', '中文版', zh),
      languageBlock('en', 'ENGLISH VERSION', en),
    );
    return pair;
  }

  function createAnswerPanel(question, length) {
    const panel = element('section', `answer-panel answer-panel-${length}`);
    panel.dataset.answerLength = length;
    if (length === 'long') panel.hidden = true;
    if (length === 'short') {
      panel.append(
        languageBlock('zh', '15 秒中文版', question.answerZh15),
        languageBlock('en', '15-SECOND ENGLISH VERSION', question.answerEn15),
      );
    } else {
      panel.append(
        languageBlock('zh', '60–90 秒中文版', question.answerZhLong, true),
        languageBlock('en', '60–90-SECOND ENGLISH VERSION', question.answerEnLong, true),
      );
    }
    return panel;
  }

  function createEvidenceBoundary(question) {
    const boundary = element('details', 'answer-boundary');
    const summary = element('summary', '', '回答邊界 · Answer boundary');
    const chips = element('div', 'evidence-chips');
    question.evidence.forEach((key) => {
      const label = evidenceLabels[key] ?? [key, key];
      const chip = element('span', `evidence-chip evidence-${key.toLowerCase()}`);
      chip.append(element('strong', '', label[0]), element('small', '', label[1]));
      chips.append(chip);
    });
    const noteZh = element('p', '', '只把直接證據說成做過；可轉移能力與領域原則使用「我會」回答。未知或不可主張的部分要明確保留。');
    const noteEn = element('p', '', 'Use past tense only for direct evidence. Frame transferable capabilities and domain principles as your approach, and keep unknown or unsupported claims explicit.');
    noteEn.lang = 'en';
    const timing = element('p', 'timing-hold', '口說時間尚未錄音驗證 · Spoken timing not yet verified');
    boundary.append(summary, chips, noteZh, noteEn, timing);
    return boundary;
  }

  function createQuestionCard(question) {
    const article = element('article', 'speaking-card question-bank-card');
    article.id = question.slug;
    article.dataset.category = question.category;
    article.dataset.speechPilot = '';
    article.dataset.search = [
      question.id,
      question.categoryZh,
      question.categoryEn,
      question.titleZh,
      question.questionZh,
      question.questionEn,
      question.whatItTestsZh,
      question.whatItTestsEn,
      question.followUpZh,
      question.followUpEn,
    ].join(' ').toLowerCase();

    const details = element('details', 'question-card-shell');
    const summary = element('summary', 'card-question');
    const identity = element('span', 'question-identity');
    identity.append(
      element('span', 'card-number', question.id),
      element('span', 'category-label', question.categoryZh),
    );
    const questionCopy = element('span', 'question-copy');
    questionCopy.append(
      element('strong', 'question-zh', question.questionZh),
      element('small', 'question-en', question.questionEn),
    );
    const disclosure = element('span', 'question-disclosure', '＋');
    summary.append(identity, questionCopy, disclosure);

    const body = element('div', 'question-card-body');
    const test = element('div', 'what-it-tests');
    test.append(
      element('strong', '', '面試官在測什麼'),
      bilingualPair(question.whatItTestsZh, question.whatItTestsEn, 'test-intent-pair'),
    );
    body.append(
      test,
      createAnswerPanel(question, 'short'),
      createAnswerPanel(question, 'long'),
    );

    const followUp = element('details', 'follow-up-panel');
    followUp.append(
      element('summary', '', '接著可能怎麼追問？ · Likely follow-up'),
      bilingualPair(question.followUpZh, question.followUpEn, 'follow-up-pair'),
    );
    body.append(followUp, createEvidenceBoundary(question));
    details.append(summary, body);
    article.append(details);
    return article;
  }

  function renderCards() {
    const fragment = document.createDocumentFragment();
    bank.questions.forEach((question) => fragment.append(createQuestionCard(question)));
    root.replaceChildren(fragment);
  }

  function updateSegment(group, value) {
    group.querySelectorAll('button').forEach((button) => {
      const active = button.value === value;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function applyFilters() {
    let visible = 0;
    document.body.dataset.answerLength = state.length;
    document.body.dataset.languageFocus = state.language;
    root.querySelectorAll('.question-bank-card').forEach((card) => {
      const categoryMatch = state.category === 'all' || card.dataset.category === state.category;
      const searchMatch = !state.query || card.dataset.search.includes(state.query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
      card.querySelectorAll('[data-answer-length]').forEach((panel) => {
        panel.hidden = panel.dataset.answerLength !== state.length;
      });
    });
    const status = document.querySelector('[data-question-status]');
    if (status) status.textContent = `顯示 ${visible}／${bank.questions.length} 題 · Showing ${visible} of ${bank.questions.length}`;
    const empty = document.querySelector('[data-question-empty]');
    if (empty) empty.hidden = visible !== 0;
  }

  function createCategoryFilters() {
    const group = document.querySelector('[data-category-filters]');
    if (!group) return;
    const categories = [{ key: 'all', zh: '全部題目', en: 'All questions' }, ...bank.categoryOrder];
    categories.forEach((category) => {
      const count = category.key === 'all'
        ? bank.questions.length
        : bank.questions.filter((question) => question.category === category.key).length;
      const button = element('button', 'filter-button');
      button.type = 'button';
      button.value = category.key;
      button.setAttribute('aria-pressed', 'false');
      button.append(
        element('strong', '', `${category.zh} ${count}`),
        element('small', '', category.en),
      );
      button.addEventListener('click', () => {
        state.category = category.key;
        updateSegment(group, state.category);
        applyFilters();
      });
      group.append(button);
    });
    updateSegment(group, state.category);
  }

  function bindControls() {
    createCategoryFilters();
    const search = document.querySelector('[data-question-search]');
    search?.addEventListener('input', () => {
      state.query = search.value.trim().toLowerCase();
      if (state.query) {
        state.category = 'all';
        const group = document.querySelector('[data-category-filters]');
        if (group) updateSegment(group, state.category);
      }
      applyFilters();
    });

    document.querySelectorAll('[data-length-control] button').forEach((button) => {
      button.addEventListener('click', () => {
        state.length = button.value;
        updateSegment(document.querySelector('[data-length-control]'), state.length);
        applyFilters();
        document.dispatchEvent(new CustomEvent('binance:answer-mode-changed'));
      });
    });
    updateSegment(document.querySelector('[data-length-control]'), state.length);

    document.querySelectorAll('[data-language-control] button').forEach((button) => {
      button.addEventListener('click', () => {
        state.language = button.value;
        updateSegment(document.querySelector('[data-language-control]'), state.language);
        applyFilters();
      });
    });
    updateSegment(document.querySelector('[data-language-control]'), state.language);
  }

  function openHashQuestion() {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!(target instanceof HTMLElement) || !target.classList.contains('question-bank-card')) return;
    state.category = 'all';
    const group = document.querySelector('[data-category-filters]');
    if (group) updateSegment(group, state.category);
    applyFilters();
    target.querySelector('.question-card-shell')?.setAttribute('open', '');
    target.scrollIntoView({ block: 'start' });
  }

  renderCards();
  bindControls();
  applyFilters();
  openHashQuestion();
  window.addEventListener('hashchange', openHashQuestion);
  document.dispatchEvent(new CustomEvent('binance:question-bank-ready', { detail: { count: bank.questions.length } }));
})();
