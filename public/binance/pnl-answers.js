(() => {
  'use strict';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function paragraphGroup(language, paragraphs) {
    const block = element('section', `approved-answer-block ${language}`);
    block.lang = language === 'en' ? 'en' : 'zh-Hant';
    paragraphs.forEach((text) => block.append(element('p', '', text)));
    return block;
  }

  function labelledBlock(label, language, paragraphs) {
    const wrap = element('section', 'approved-answer-layer');
    wrap.append(element('h4', '', label), paragraphGroup(language, paragraphs));
    return wrap;
  }

  function termBlock(question) {
    const wrap = element('section', 'approved-answer-layer approved-terms');
    wrap.append(element('h4', '', '本題英文名詞解釋'));
    if (!question.terms.length) {
      wrap.append(element('p', 'approved-term-note', question.termNote));
      return wrap;
    }
    const list = element('ul', 'approved-term-list');
    question.terms.forEach((term) => {
      const item = document.createElement('li');
      const trigger = element('button', 'approved-term-trigger', term.label);
      trigger.type = 'button';
      trigger.dataset.termKey = term.key;
      trigger.setAttribute('aria-label', `${term.label}：${term.definitionZh}開啟完整名詞解釋`);
      item.append(trigger, element('span', '', term.definitionZh));
      list.append(item);
    });
    wrap.append(list);
    return wrap;
  }

  function createCard(question, index) {
    const card = element('article', 'approved-answer-card');
    card.id = question.id.toLowerCase();
    card.dataset.approvedQuestion = question.id;
    card.dataset.search = [question.question, ...question.originalZh, ...question.spokenZh, ...question.spokenEn, question.boundary].join(' ').toLowerCase();

    const header = element('header', 'approved-answer-header');
    header.append(element('span', 'approved-answer-number', String(index + 1).padStart(2, '0')), element('h3', '', question.question));
    card.append(
      header,
      labelledBlock('中文原版本', 'zh', question.originalZh),
      labelledBlock('中文易口說版', 'zh', question.spokenZh),
      labelledBlock('英文口說版', 'en', question.spokenEn),
      termBlock(question),
    );
    const boundary = element('section', 'approved-answer-layer approved-boundary');
    boundary.append(element('h4', '', '本題證據與責任邊界'), element('p', '', question.boundary));
    card.append(boundary);
    return card;
  }

  function renderGroup(group) {
    const page = document.getElementById(group.targetId);
    const body = page?.querySelector('.chapter-body');
    if (!body) return;
    const section = element('section', 'approved-answer-set');
    section.dataset.approvedAnswerSet = group.targetId;
    const intro = element('header', 'approved-answer-set-header');
    intro.append(
      element('p', 'approved-answer-kicker', 'GitHub Issue(議題) #10 已確認內容'),
      element('h2', '', group.label),
      element('p', '', '每題依序為中文原版本、中文易口說版、英文口說版、英文名詞解釋，以及證據與責任邊界。'),
    );
    section.append(intro);
    group.questions.forEach((question, index) => section.append(createCard(question, index)));
    const research = body.querySelector(':scope > .research-notes');
    body.insertBefore(section, research || null);

    const searchText = group.questions.flatMap((question) => [question.question, ...question.originalZh, ...question.spokenZh, ...question.spokenEn]).join(' ').toLowerCase();
    document.querySelectorAll(`a[href="#${group.targetId}"][data-search]`).forEach((link) => {
      link.dataset.search = `${link.dataset.search} ${searchText}`;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const payload = window.BINANCE_PNL_ANSWERS;
    if (!payload?.groups) return;
    payload.groups.forEach(renderGroup);
    document.dispatchEvent(new CustomEvent('binance:pnl-answers-ready'));
  });
})();
