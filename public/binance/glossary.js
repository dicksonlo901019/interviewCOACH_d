(() => {
  const terms = [
    ['binance', '幣安', 'Binance', '全球加密資產交易平台；本文件不推測其未公開的內部公式或系統架構。', 'A global crypto-asset platform. This guide does not infer its unpublished formulas or system architecture.', ['Binance']],
    ['cex', '中心化交易所', 'Centralized exchange', '由公司管理交易、帳戶與資產服務的平台。使用者透過平台帳戶完成交易與資產操作。', 'A platform operated by a company that manages trading, accounts, and asset services for its users.', ['CEX']],
    ['pnl', '損益', 'Profit and loss', '特定期間內的獲利與虧損結果；實際計算必須先定義帳戶範圍、價格、費用、時間與外部資金流。', 'The profit or loss over a period. The account scope, prices, fees, time rules, and external cash flows must be defined before calculation.', ['P&L', 'PnL']],
    ['usdt', '泰達幣', 'USDT', '與美元價值連動的穩定幣，常作為加密資產估值或交易的顯示單位。', 'A stablecoin linked to the value of the US dollar and often used as a display unit for crypto-asset valuation or trading.', ['USDT']],
    ['cost-basis', '成本基礎', 'Cost basis', '持有資產的取得成本，是計算損益的重要基準。計算方式必須先明確定義。', 'The acquisition cost of an asset holding and a key input for calculating profit and loss.', ['cost basis']],
    ['weighted-average', '加權平均法', 'Weighted average', '將不同時間與價格取得的資產合併計算平均成本的方法。', 'A method that combines assets acquired at different times and prices to calculate an average cost.', ['weighted average']],
    ['fifo', '先進先出法', 'FIFO', '假設最早取得的資產最先被出售或處分的成本計算方法。', 'A cost method that assumes the earliest acquired assets are sold or disposed of first.', ['FIFO']],
    ['realized-unrealized', '已實現與未實現損益', 'Realized and unrealized P&L', '已實現損益來自已完成的交易；未實現損益則依目前持倉與市場價格估算。', 'Realized P&L comes from completed trades; unrealized P&L estimates the value change of open positions.', ['realized', 'unrealized']],
    ['account-matrix', '帳戶矩陣', 'Account matrix', '列出不同帳戶、資產與產品的適用規則，用來避免漏算或重複計算。', 'A map of account, asset, and product rules used to prevent omissions and double counting.', ['matrix']],
    ['asset-snapshot', '資產快照', 'Asset snapshot', '在指定時間點保存使用者資產狀態，方便查詢、比對與重算。', 'A saved view of a user’s assets at a specific time for lookup, comparison, and recalculation.', ['snapshot']],
    ['valuation', '資產估值', 'Asset valuation', '用一致的價格來源與時間點，把不同資產換算成可比較的價值。', 'The use of consistent prices and timestamps to express different assets in comparable values.', ['valuation']],
    ['source-of-truth', '權威資料來源', 'Source of truth', '團隊共同認定的主要資料來源。遇到衝突時，必須依預先定義的優先順序判斷。', 'The agreed primary data source, with a defined priority when sources conflict.', ['SSOT', 'source of truth']],
    ['data-lineage', '資料血緣', 'Data lineage', '記錄資料從哪裡來、經過哪些轉換，以及最後被哪些功能使用。', 'A record of where data comes from, how it changes, and where it is used.', ['lineage']],
    ['reconciliation', '對帳', 'Reconciliation', '比對兩個以上的資料來源，找出金額、狀態或筆數不一致的原因。', 'The comparison of two or more data sources to find and explain mismatches.', ['recon']],
    ['invariant', '恆等規則', 'Invariant', '系統在正常狀況下必須一直成立的計算或狀態規則。', 'A calculation or state rule that must always remain true when the system is operating correctly.', ['invariant']],
    ['exception-taxonomy', '例外分類', 'Exception taxonomy', '用一致方式分類異常，讓團隊知道問題的類型、責任與處理順序。', 'A consistent classification of anomalies that clarifies type, ownership, and handling priority.', ['taxonomy']],
    ['canonical-id', '標準識別碼', 'Canonical identifier', '跨系統共用的唯一識別方式，用來避免同一筆資料被誤認為不同項目。', 'A shared unique identifier across systems that prevents one record from being treated as multiple items.', ['canonical ID']],
    ['sla', '服務層級協議', 'Service-level agreement', '對外或跨團隊承諾的服務標準，例如處理時限或可用性。', 'A committed service standard, such as response time or availability.', ['SLA']],
    ['slo', '服務層級目標', 'Service-level objective', '團隊用來管理服務品質的內部量化目標。', 'An internal measurable target used to manage service quality.', ['SLO']],
    ['prd', '產品需求文件', 'Product requirements document', '說明問題、目標、範圍、流程、驗收方式與風險的產品文件。', 'A product document covering the problem, goals, scope, flows, acceptance criteria, and risks.', ['PRD']],
    ['kyc', '認識你的客戶', 'Know your customer', '金融服務用來確認客戶身分並評估風險的流程。', 'The process financial services use to verify customer identity and assess risk.', ['KYC']],
    ['two-factor', '雙重驗證', 'Two-factor authentication', '登入或執行敏感操作時，要求第二種驗證方式以提高安全性。', 'A second verification method required for login or sensitive actions to improve security.', ['2FA']],
    ['travel-rule', '資金移轉規則', 'Travel Rule', '虛擬資產移轉時，服務提供者需依規定交換必要的發送方與接收方資訊。', 'A rule requiring virtual-asset service providers to exchange required sender and recipient information.', ['Travel Rule']],
    ['manual-review', '人工審查', 'Manual review', '系統無法安全自動判斷時，交由授權人員進一步確認。', 'A review by an authorized person when the system cannot make a safe automated decision.', ['manual review']],
    ['audit-trail', '稽核軌跡', 'Audit trail', '保存誰在何時做了什麼變更，讓後續能追查與還原決策。', 'A record of who changed what and when, enabling later investigation and decision reconstruction.', ['audit trail']],
    ['rollout', '分階段發布', 'Phased rollout', '先讓部分使用者使用新功能，確認穩定後再逐步擴大。', 'A release approach that starts with a limited audience and expands after stability is confirmed.', ['rollout']],
    ['rollback', '回復版本', 'Rollback', '新版本出現重大問題時，回到先前穩定版本或關閉變更。', 'Returning to a stable version or disabling a change when a release causes a serious problem.', ['rollback']],
    ['guardrail', '保護指標', 'Guardrail metric', '用來確認主要目標改善時，沒有同時傷害安全、品質或其他關鍵結果。', 'A metric that checks whether progress on a main goal harms safety, quality, or another key outcome.', ['guardrail']],
    ['data-freshness', '資料新鮮度', 'Data freshness', '資料距離最新狀態的時間差，用來判斷畫面或計算是否仍可信。', 'The age of data relative to the latest state, used to judge whether a view or calculation is still reliable.', ['freshness']],
    ['restatement', '歷史損益重算', 'Restatement', '因延遲事件、價格修正、定義變更或資料回補，依核准規則重新計算歷史損益。', 'A recalculation of historical profit and loss under approved rules after late events, price corrections, definition changes, or data backfills.', ['restatement']],
    ['blast-radius', '影響範圍', 'Blast radius', '一個問題影響到多少使用者、帳戶、資產、地區或系統，用來判斷嚴重度與處理順序。', 'The users, accounts, assets, regions, or systems affected by a problem, used to assess severity and response priority.', ['blast radius']],
    ['ledger-mismatch', '帳務資料不一致', 'Ledger mismatch', '兩個應該一致的帳務來源出現金額、狀態或筆數差異，需要進一步對帳與追查。', 'A difference in amount, status, or record count between ledger sources that should agree and therefore requires reconciliation.', ['ledger mismatch']],
    ['event-delay', '事件延遲', 'Event delay', '一筆事件已發生，但尚未在下游資料或畫面中更新，可能造成短暫的不一致。', 'A delay between an event occurring and appearing in downstream data or the user interface, which can create a temporary mismatch.', ['event delay']],
    ['authoritative-ledger', '權威帳務服務', 'Authoritative ledger service', '被指定為帳戶餘額與帳務狀態主要依據的服務，其他資料應以它為準進行比對。', 'The designated primary service for account balances and ledger states, used as the reference when other data is compared.', ['authoritative ledger service']]
  ].map(([key, zhTerm, enTerm, zh, en, aliases]) => ({ key, zhTerm, enTerm, zh, en, aliases }));
  const termByKey = new Map(terms.map((term) => [term.key, term]));

  function annotateTerms() {
    const aliasMap = new Map();
    terms.forEach((term) => {
      [term.enTerm, ...term.aliases].forEach((alias) => {
        const normalized = alias.trim().toLowerCase();
        if (normalized.length >= 3 && !aliasMap.has(normalized)) aliasMap.set(normalized, term);
      });
    });
    const aliases = [...aliasMap.keys()].sort((a, b) => b.length - a.length);
    const escaped = aliases.map((alias) => alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const matcher = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

    document.querySelectorAll('.language-block.en, .research-notes-content').forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach((textNode) => {
        if (!textNode.nodeValue?.trim()) return;
        if (textNode.parentElement?.closest('button, a, code, pre, script, style, [data-term-key], .language-label')) return;
        matcher.lastIndex = 0;
        if (!matcher.test(textNode.nodeValue)) return;
        matcher.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        for (const match of textNode.nodeValue.matchAll(matcher)) {
          const term = aliasMap.get(match[0].toLowerCase());
          if (!term || match.index === undefined) continue;
          fragment.append(document.createTextNode(textNode.nodeValue.slice(lastIndex, match.index)));
          const trigger = element('button', 'inline-term-trigger', match[0]);
          trigger.type = 'button';
          trigger.dataset.termKey = term.key;
          trigger.setAttribute('aria-label', `${match[0]}：${term.zhTerm}。開啟名詞解釋`);
          fragment.append(trigger);
          lastIndex = match.index + match[0].length;
        }
        fragment.append(document.createTextNode(textNode.nodeValue.slice(lastIndex)));
        textNode.replaceWith(fragment);
      });
    });
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function buildPreview() {
    const preview = element('div', 'glossary-preview');
    preview.id = 'glossary-preview';
    preview.setAttribute('role', 'tooltip');
    preview.setAttribute('aria-live', 'polite');
    preview.hidden = true;
    document.body.append(preview);

    function hide() {
      document.querySelectorAll('[data-term-key].is-previewing').forEach((trigger) => trigger.classList.remove('is-previewing'));
      preview.classList.remove('show');
      preview.hidden = true;
    }

    function show(trigger) {
      const term = termByKey.get(trigger.dataset.termKey);
      if (!term) return;
      document.querySelectorAll('[data-term-key].is-previewing').forEach((item) => item.classList.remove('is-previewing'));
      trigger.classList.add('is-previewing');
      preview.replaceChildren(
        element('strong', '', term.zhTerm),
        element('em', '', term.enTerm),
        element('span', '', term.zh),
        element('span', '', term.en),
        element('small', '', '點按可開啟完整名詞解釋 · Press to open the full glossary'),
      );
      preview.hidden = false;
      preview.classList.add('show');
      if (window.matchMedia('(max-width: 900px)').matches) return;
      const rect = trigger.getBoundingClientRect();
      const previewRect = preview.getBoundingClientRect();
      const margin = 12;
      const left = Math.min(Math.max(margin, rect.left + (rect.width - previewRect.width) / 2), window.innerWidth - previewRect.width - margin);
      const below = rect.bottom + previewRect.height + margin < window.innerHeight;
      preview.style.left = `${left}px`;
      preview.style.top = below ? `${rect.bottom + 10}px` : `${Math.max(margin, rect.top - previewRect.height - 10)}px`;
    }

    return { hide, show };
  }

  function buildDialog() {
    const dialog = element('dialog', 'glossary-dialog');
    dialog.id = 'glossary-dialog';
    dialog.setAttribute('aria-labelledby', 'glossary-title');

    const head = element('div', 'glossary-head');
    const titleWrap = element('div');
    const title = element('h2', '', '名詞解釋');
    title.id = 'glossary-title';
    titleWrap.append(title, element('p', '', 'Glossary · 中文說明在上，英文說明在下'));
    const close = element('button', 'glossary-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', '關閉名詞解釋');
    head.append(titleWrap, close);

    const searchWrap = element('div', 'glossary-search-wrap');
    const search = element('input', 'glossary-search');
    search.type = 'search';
    search.placeholder = '搜尋中文或英文名詞';
    search.setAttribute('aria-label', '搜尋名詞');
    searchWrap.append(search);
    const list = element('div', 'glossary-list');
    dialog.append(head, searchWrap, list);
    document.body.append(dialog);

    function render(query = '') {
      const normalized = query.trim().toLowerCase();
      const filtered = terms.filter((term) => [term.zhTerm, term.enTerm, term.zh, term.en, ...term.aliases]
        .join(' ').toLowerCase().includes(normalized));
      list.replaceChildren();
      if (!filtered.length) {
        list.append(element('p', 'glossary-empty', '找不到符合的名詞。\nNo matching term found.'));
        return;
      }
      filtered.forEach((term) => {
        const entry = element('article', 'glossary-entry');
        entry.id = `term-${term.key}`;
        entry.dataset.termKey = term.key;
        entry.append(element('span', 'glossary-term-zh', term.zhTerm), element('span', 'glossary-term-en', term.enTerm));
        const zh = element('div', 'glossary-definition');
        zh.lang = 'zh-Hant';
        zh.append(element('b', '', '中文解釋'), element('p', '', term.zh));
        const en = element('div', 'glossary-definition');
        en.lang = 'en';
        en.append(element('b', '', 'ENGLISH DEFINITION'), element('p', '', term.en));
        entry.append(zh, en);
        list.append(entry);
      });
    }

    let returnFocus = null;

    function open(termKey, opener) {
      returnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
      search.value = '';
      render();
      dialog.showModal();
      if (termKey) {
        requestAnimationFrame(() => {
          const target = dialog.querySelector(`[data-term-key="${CSS.escape(termKey)}"]`);
          if (target) {
            target.classList.add('is-selected');
            target.scrollIntoView({ block: 'center' });
          }
        });
      } else {
        requestAnimationFrame(() => search.focus());
      }
    }

    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      dialog.close();
    });
    dialog.addEventListener('close', () => {
      const target = returnFocus;
      returnFocus = null;
      if (target instanceof HTMLElement && target.isConnected) target.focus();
    });
    search.addEventListener('input', () => render(search.value));
    render();
    return { open };
  }

  document.addEventListener('DOMContentLoaded', () => {
    annotateTerms();
    const glossary = buildDialog();
    const preview = buildPreview();
    const topbar = document.querySelector('.topbar');
    if (topbar && !topbar.querySelector('[data-glossary-open]')) {
      const button = element('button', 'glossary-open', '名詞解釋');
      button.type = 'button';
      button.dataset.glossaryOpen = '';
      const focus = topbar.querySelector('.focus-label');
      topbar.insertBefore(button, focus || null);
    }

    document.addEventListener('click', (event) => {
      const opener = event.target.closest('[data-glossary-open], [data-term-key]');
      if (!opener) return;
      preview.hide();
      glossary.open(opener.dataset.termKey || '', opener);
    });

    document.querySelectorAll('[data-term-key]').forEach((trigger) => {
      trigger.setAttribute('aria-describedby', 'glossary-preview');
    });
    document.addEventListener('mouseover', (event) => {
      const trigger = event.target.closest('[data-term-key]:not(.glossary-entry)');
      if (trigger) preview.show(trigger);
    });
    document.addEventListener('mouseout', (event) => {
      const trigger = event.target.closest('[data-term-key]:not(.glossary-entry)');
      if (trigger && !trigger.contains(event.relatedTarget)) preview.hide();
    });
    document.addEventListener('focusin', (event) => {
      const trigger = event.target.closest('[data-term-key]:not(.glossary-entry)');
      if (trigger) preview.show(trigger);
    });
    document.addEventListener('focusout', (event) => {
      const trigger = event.target.closest('[data-term-key]:not(.glossary-entry)');
      if (trigger && !trigger.contains(event.relatedTarget)) preview.hide();
    });
    window.addEventListener('scroll', preview.hide, true);
    window.addEventListener('resize', preview.hide);

    const cardSearch = document.querySelector('[data-card-search]');
    if (cardSearch) {
      cardSearch.addEventListener('input', () => {
        const query = cardSearch.value.trim().toLowerCase();
        document.querySelectorAll('.speaking-card').forEach((card) => {
          card.hidden = Boolean(query) && !card.dataset.search.toLowerCase().includes(query);
        });
      });
    }
  });
})();
