(() => {
  const terms = [
    ['cex', '中心化交易所', 'Centralized exchange', '由公司管理交易、帳戶與資產服務的平台。使用者透過平台帳戶完成交易與資產操作。', 'A platform operated by a company that manages trading, accounts, and asset services for its users.', ['CEX']],
    ['pnl', '損益', 'Profit and loss', '一段期間內的獲利或虧損。常見拆分為已實現損益與未實現損益。', 'The profit or loss over a period, commonly split into realized and unrealized amounts.', ['P&L']],
    ['cost-basis', '成本基礎', 'Cost basis', '持有資產的取得成本，是計算損益的重要基準。計算方式必須先明確定義。', 'The acquisition cost of an asset holding and a key input for calculating profit and loss.', ['cost basis']],
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
    ['restatement', '重算修正', 'Restatement', '來源資料或計算規則改變後，重新計算並清楚標示修正結果。', 'A recalculation after source data or rules change, with the corrected result clearly identified.', ['restatement']]
  ].map(([key, zhTerm, enTerm, zh, en, aliases]) => ({ key, zhTerm, enTerm, zh, en, aliases }));

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
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

    function open(termKey) {
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
    search.addEventListener('input', () => render(search.value));
    render();
    return { open };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const glossary = buildDialog();
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
      glossary.open(opener.dataset.termKey || '');
    });

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
