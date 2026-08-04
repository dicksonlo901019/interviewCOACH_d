(() => {
  'use strict';

  const data = window.INTERVIEW_DATA;
  if (!data) throw new Error('Interview content failed to load.');

  const chapters = [
    { id: 'quick', label: '15 分鐘速讀' },
    { id: 'role', label: '職位與缺口' },
    { id: 'domain', label: 'CRM／CDP 基礎' },
    { id: 'mapping', label: '經驗映射' },
    { id: 'case', label: '90 天回購 Case' },
    { id: 'stories', label: '9 個可用故事' },
    { id: 'questions', label: '30 題 PM Lead 題庫' },
    { id: 'cto-quick', label: 'CTO 15 分鐘速讀' },
    { id: 'agentic-pjm', label: 'Agentic PJM Workflow' },
    { id: 'cto-questions', label: '36 題 CTO 題庫' },
    { id: 'holds', label: '兩個 HOLD', hold: true },
    { id: 'ask', label: '反問 PM Lead' },
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const quickScripts = [
    {
      title: '90 秒自我介紹',
      time: '01:30',
      answer: `我有約十年產品管理經驗，近年主要做 Web3 平台、CEX、法幣／C2C 與 AI 輔助工作流。最能代表我 Senior scope 的經歷，是帶領三位 PM、兩位 Design，和工程及跨區產品團隊，在四個月內完成 0-to-1 CEX 平台交付。\n\n我的核心能力是把複雜平台問題變成可交付決策。第三方 provider 案例中，我負責資格、handoff、交易狀態與營運可見性；Grid 與後台則處理 lifecycle、風險與多層審批。我的 ownership 是產品架構、規則與跨團隊對齊，不是底層工程實作。\n\n我沒有直接 CRM／CDP 經驗，這個 Gap 是真的。我已能白板說明 Customer 360、Identity、Consent 與 Journey，也完成 90 天增量回購 Case。若加入 Omnichat，我會先理解實際資料模型、客戶問題與指標，從範圍清楚的 module 交付，不把相鄰經驗改名。`,
      boundary: '可說：約十年 PM、3 PM＋2 Design、四個月 0-to-1 CEX。不可升級成獨立打造、工程實作或 CRM production ownership。',
    },
    {
      title: 'CRM Gap 45 秒',
      time: '00:45',
      answer: `這個 Gap 是真的，我沒有直接 CRM／CDP 經驗，也不會把 CEX 或 KYC 改稱 CRM。我能轉移的是第三方整合、多狀態、Source of Truth、權限與營運恢復能力；目前也已能白板說明 Customer 360、Identity、Consent、Segment 與 Journey。加入後先對齊真實資料模型、客戶問題與指標，再從邊界清楚的問題交付。`,
      boundary: '領域理解是目前準備成果，不是過去 production ownership；KYC eligibility 不等於 Identity Resolution。',
    },
    {
      title: '90 天回購 Case 3 分鐘',
      time: '03:00',
      answer: `我的決策問題是：對可合法聯繫的首購顧客，服務加補貨提醒是否帶來 90 天增量重購，而且不傷害 Consent、身份、體驗與 margin。\n\n資料上，我會把 CRM member、Shopify／POS order、LINE／WhatsApp identity 與 Consent 放進 Unified Profile，MVP 只用 deterministic matching；身份或 Consent 衝突就 suppression。Journey 在首購時固定分 treatment／control，先做服務，補貨窗口前再檢查資格，只發一次提醒，回購、退訂或投訴立即退出。\n\nAI 只在顧客回覆後進場，只讀核准資料，不改 Profile、Consent、價格、訂單或 Journey；低信心、投訴或 timeout 交真人。Primary metric 是 ITT treatment-control 的 90-day repeat-purchase difference，Secondary 看 incremental contribution margin，並以 opt-out、mismerge、unauthorized send、AI error、latency、cost 與 CS backlog 做 guardrails。Baseline、MDE、sample、duration 都要依真實資料決定，目前是 TBD。`,
      boundary: '這是面試 Case，不是曾在 Omnichat 或 CRM production 上線的成果；沒有 21% uplift 或任何既有實驗數字。',
    },
  ];

  const sourceLinks = `
    <p class="boundary-detail evidence-note">來源：<code>interviews/omnichat/</code> 的 P0 authoritative files、P1 CTO claim ledger、CTO Question Bank、Agentic PJM Workflow 與 CTO Cheat Sheet。本頁若與上游證據邊界衝突，以上游來源為準。</p>
  `;

  function renderNav() {
    $('#chapter-nav').innerHTML = chapters.map((chapter, index) => `
      <button class="nav-item" data-section="${chapter.id}" data-hold="${Boolean(chapter.hold)}">
        <span class="nav-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="nav-label">${chapter.label}</span>
      </button>
    `).join('');
  }

  function renderQuick() {
    $('#section-quick').innerHTML = `
      <p class="section-label">QUICK REVIEW · P0 PM LEAD</p>
      <h1>Omnichat Senior Product Manager｜面試攻略</h1>
      <p class="lede">不是 direct CRM candidate；是能處理複雜平台、第三方整合、狀態與治理的 Senior PM。</p>

      <div class="status-strip" aria-label="材料狀態">
        <div class="status-cell ready"><span class="status-icon">✓</span><div class="status-copy">P0 可完成材料：<strong>READY</strong></div></div>
        <div class="status-cell hold"><span class="status-icon">!</span><div class="status-copy">外部證據缺口：<strong>2 HOLD</strong></div></div>
      </div>

      <div class="section-heading-row">
        <h2>今天先練這三段</h2>
        <p>先講結論，再補證據和邊界；不要逐字背稿。</p>
      </div>
      ${renderBoundarySwitch()}
      <div class="practice-list">
        ${quickScripts.map((item, index) => `
          <details class="practice-item" ${index === 0 ? 'open' : ''} data-search="${escapeHtml(item.title)} ${escapeHtml(item.answer)}">
            <summary>
              <span class="practice-number">${String(index + 1).padStart(2, '0')}</span>
              <span class="practice-title">${item.title}</span>
              <span class="practice-time">${item.time}</span>
              <span class="practice-chevron">→</span>
            </summary>
            <div class="practice-body">
              <p class="answer-script">${escapeHtml(item.answer)}</p>
              <div class="boundary-detail evidence-note">${escapeHtml(item.boundary)}</div>
              <div class="answer-actions">
                <button class="primary-button start-script" data-seconds="${timeToSeconds(item.time)}">開始 ${item.time} 練習</button>
                <button class="copy-button" data-copy="${escapeHtml(item.answer)}">複製口述稿</button>
                <button class="practice-check" data-progress="quick-${index}">標記已練</button>
              </div>
            </div>
          </details>
        `).join('')}
      </div>

      <div class="hold-banner"><span aria-hidden="true">⚠</span><div><strong>HOLD 不代表弱</strong>，只代表目前不能誠實地說成完整案例。</div></div>

      <div class="section-heading-row"><h2>15 分鐘使用順序</h2></div>
      <div class="roadmap">
        <div class="roadmap-step"><span>00–05 MIN</span><h3>守住定位</h3><p>不可踩線、兩個 HOLD、90 秒自介、Why Omnichat、CRM Gap。</p></div>
        <div class="roadmap-step"><span>05–11 MIN</span><h3>喚起證據</h3><p>S1、S2、S5、S4 四張故事卡，再看 90 天回購 Case。</p></div>
        <div class="roadmap-step"><span>11–15 MIN</span><h3>練回答與反問</h3><p>看高機率快問快答，最後選兩題問 PM Lead。</p></div>
      </div>
      ${sourceLinks}
    `;
  }

  function renderRole() {
    $('#section-role').innerHTML = `
      ${chapterIntro('ROLE SCORECARD', '職位與缺口', '整體匹配是 Medium–Strong adjacent fit，不是 direct-domain fit。要讓面試官看到成熟 platform craft，也要讓他放心你不會淡化 CRM／CDP Gap。')}
      <div class="split-panel">
        <div>
          <p class="section-label">最強匹配</p>
          <h3>複雜平台問題可直接遷移</h3>
          <ul>
            <li>約十年 PM 經驗，帶 3 位 PM＋2 位 Design。</li>
            <li>四個月 0-to-1 CEX：產品架構、優先順序、跨區協作。</li>
            <li>第三方 provider handoff、多狀態、例外與營運可見性。</li>
            <li>多角色、1–6 層審批、高風險操作與 audit requirement。</li>
          </ul>
        </div>
        <div class="risk">
          <p class="section-label">最大風險</p>
          <h3>不能把相鄰能力改名</h3>
          <ul>
            <li>沒有直接 CRM／CDP／MarTech 任職經驗。</li>
            <li>沒有已證 enterprise SaaS commercial ownership。</li>
            <li>Omnichat 內部 module、KPI、roadmap 與 PM 分工均為 Unknown。</li>
            <li>工程 disagreement 與完整 failure story 仍缺真實事件證據。</li>
          </ul>
        </div>
      </div>

      <div class="callout"><p><strong>一句定位：</strong>我不是 direct CRM candidate；我是有約十年經驗、能把第三方整合、多狀態、權限與高風險營運需求拆成可交付平台規則，也清楚知道 CRM Gap 與補強方法的 Senior PM。</p></div>

      <div class="section-heading-row"><h2>前 90 天：先降低風險，再證明交付</h2></div>
      <div class="roadmap">
        <div class="roadmap-step"><span>DAY 1–30</span><h3>建立正確問題地圖</h3><p>確認 module、decision boundary、success metric；走過產品與真實客戶／整合案例，畫出資料流、Source of Truth、failure 與 owner。</p></div>
        <div class="roadmap-step"><span>DAY 31–60</span><h3>形成一個可驗證問題</h3><p>選邊界清楚的 integration、journey、admin workflow 或 data-quality 問題，建立 baseline、MVP、metrics、non-goal。</p></div>
        <div class="roadmap-step"><span>DAY 61–90</span><h3>完成受控驗證</h3><p>讓一個 MVP／experiment 完成驗證，或進入具 owner、驗收與 release gate 的開發階段；不承諾重構 CDP。</p></div>
      </div>
      ${sourceLinks}
    `;
  }

  function renderDomain() {
    $('#section-domain').innerHTML = `
      ${chapterIntro('DOMAIN BRIEF', 'CRM／CDP 基礎', '這一章是面試用的白板語言：能說清楚 Customer 360、Identity、Consent、Segment、Journey 與整合可靠性，但不宣稱過去有 production ownership。')}
      <table class="concept-table">
        <thead><tr><th>概念</th><th>先用白話說</th><th>不可混淆</th></tr></thead>
        <tbody>
          <tr><td>CRM</td><td>管理顧客關係、互動與營運流程的系統。</td><td>不是自動等於跨來源統一資料。</td></tr>
          <tr><td>CDP</td><td>把多來源顧客資料整理成可治理、可使用的 profile 與 audience。</td><td>不是把所有資料塞進一張大表。</td></tr>
          <tr><td>Customer 360</td><td>有來源、時間、權限與衝突規則的顧客視圖。</td><td>不是「欄位越多越完整」。</td></tr>
          <tr><td>Identity Resolution</td><td>判斷不同 identifier 是否屬於同一位顧客，並保留證據與可逆性。</td><td>不等於 KYC，也不能看到相同 email 就盲目 merge。</td></tr>
          <tr><td>Segment</td><td>依條件決定誰在當下符合資格。</td><td>Dynamic segment 需要隨資料變動重新計算。</td></tr>
          <tr><td>Journey</td><td>依 entry、state、rule、action、exit 與 exception 編排顧客互動。</td><td>不是排好一串訊息就算完成。</td></tr>
        </tbody>
      </table>

      <div class="section-heading-row"><h2>白板主幹</h2><p>每個物件都要問：誰是 owner、誰是 Source of Truth、衝突怎麼辦。</p></div>
      <div class="flow" aria-label="CRM CDP 資料與旅程流程">
        ${flowStep('來源', 'CRM／Shopify／POS／Channel')}
        <span class="flow-arrow">→</span>
        ${flowStep('Identifier', 'member／email／phone／LINE ID')}
        <span class="flow-arrow">→</span>
        ${flowStep('Profile', 'lineage／confidence／updated time')}
        <span class="flow-arrow">→</span>
        ${flowStep('Consent', 'purpose × channel × market')}
        <span class="flow-arrow">→</span>
        ${flowStep('Segment', 'dynamic eligibility')}
        <span class="flow-arrow">→</span>
        ${flowStep('Journey', 'state／exit／guardrail')}
      </div>

      <div class="content-grid">
        ${domainCard('Identity', 'MVP 先用強且可驗證的 deterministic signal；merge 要能 audit，也要能 split／remediate。Consent 不因 merge 自動放寬。', ['normalize', 'conflict check', 'reversible'])}
        ${domainCard('Source of Truth', '不要讓 last write wins 自動成為規則。逐欄定 authority、freshness 與 conflict state；高風險 action 無法裁決時先 suppression。', ['field-level authority', 'lineage', 'reconciliation'])}
        ${domainCard('Integration Reliability', '事件要有 ID、entity、version／occurred_at 與 schema。PM 的責任是定 customer-visible result、operator queue、replay 副作用與 recovery boundary。', ['idempotency', 'retry／DLQ', 'controlled replay'])}
        ${domainCard('Measurement', '用 stable control 與 ITT 判斷增量；click、open、attributed revenue 是診斷訊號，不是因果證據。每個 metric 要有分母、窗口、去重與 owner。', ['incrementality', 'guardrails', 'operational definition'])}
      </div>
      <div class="boundary-detail hold-banner"><span>!</span><div>API、Webhook、retry、DLQ 可用來回答現在的 domain 理解；描述過往經歷時，不聲稱親自做過工程實作。</div></div>
      ${sourceLinks}
    `;
  }

  function renderMapping() {
    $('#section-mapping').innerHTML = `
      ${chapterIntro('EVIDENCE MAPPING', '經驗映射', 'Evidence mapping 已完成。使用「問題結構可轉移」，不使用「我其實已經做過 CRM」。')}
      ${renderBoundarySwitch()}
      <table class="concept-table">
        <thead><tr><th>相鄰經驗</th><th>已證 ownership</th><th>可遷移到</th><th>不等於</th></tr></thead>
        <tbody>
          <tr><td>0-to-1 CEX</td><td>產品架構、優先順序、review gate、跨區協作</td><td>複雜平台拆解、shared capability、delivery leadership</td><td>Enterprise CRM commercial ownership</td></tr>
          <tr><td>BANXA／法幣 provider</td><td>資格、handoff、order／payment／refund state、前後台需求</td><td>跨系統狀態、failure path、operator visibility</td><td>本人開發 API／支付清算</td></tr>
          <tr><td>Sumsub／KYC</td><td>eligibility、research、integration flow、人工 review gate</td><td>證據、資格、exception 與治理</td><td>Identity Resolution／Customer 360</td></tr>
          <tr><td>Futures Grid</td><td>strategy lifecycle、風險提示、manual termination、後台可見性</td><td>state machine、technical trade-off、launch gate</td><td>Marketing Automation Journey 或真實工程衝突</td></tr>
          <tr><td>多層審批／風控</td><td>角色、1–6 層 approval、狀態、exception、audit requirement</td><td>RBAC、high-impact action、enterprise governance</td><td>Consent platform／AML specialist</td></tr>
          <tr><td>NFT reconciliation</td><td>wallet connection、簽署、資產轉移與 reconciliation requirement</td><td>Source of Truth、跨系統一致性、營運修復</td><td>smart contract 工程實作</td></tr>
          <tr><td>角色型 AI Workflow</td><td>角色、輸入、產物、gate 與使用者確認</td><td>bounded automation、handoff contract、QA gate</td><td>enterprise rollout／量化成效</td></tr>
        </tbody>
      </table>
      <div class="callout"><p><strong>回答骨架：</strong>結論 → 已證證據 → ownership 邊界 → 對職缺的意義。</p><p class="boundary-detail">任何 baseline、uplift、收入、adoption、事故下降或 enterprise AI rollout 數字，如果上游沒有，就不能補。</p></div>
      ${sourceLinks}
    `;
  }

  function renderCase() {
    const steps = [
      ['Decision', '對可合法聯繫的首購顧客，服務＋補貨提醒是否帶來 90 天增量重購，且不傷害 Consent、身份、體驗與 margin。', 'Case 假設；不是已上線成效。'],
      ['Unified Profile', 'CRM member、Shopify／POS order、LINE／WhatsApp identity、Consent；MVP 採 deterministic matching，衝突時 suppression。', '實際客戶資料模型與 Source of Truth 為 Unknown。'],
      ['Segment', '首購、可聯繫、身份與 Consent 有效、未退款／取消；entry 時固定 treatment／control。', '實際 eligibility rule 需由資料與 policy owner 決定。'],
      ['Journey', '先服務，再於補貨窗口前 action-time recheck；一次提醒；回購、退訂、投訴或不再適用即 exit。', '不先假設「發優惠就會回購」。'],
      ['AI Boundary', '只在顧客回覆後進場，只讀核准資料；不改 Profile、Consent、價格、訂單或 Journey；低信心、投訴、timeout 交真人。', '不宣稱 AI model 或 production agent ownership。'],
      ['Metrics', 'Primary＝ITT treatment-control 90-day repeat-purchase difference；Secondary＝incremental contribution margin；Leading 與 guardrails 負責診斷與保護。', 'Baseline、MDE、sample、duration、threshold 都是 TBD。'],
      ['Rollout', 'shadow → small pilot → controlled experiment → staged expansion；identity、Consent、AI safety、latency、cost 或 operations 失控就 pause／rollback。', '實際 release cadence、owner 與 kill-switch authority 為 Unknown。'],
    ];
    $('#section-case').innerHTML = `
      ${chapterIntro('PRODUCT CASE', '90 天回購 Case', '重點不是讓 AI 多發訊息，而是建立正確身份、Consent、狀態與可判定的 Journey，再把 AI 放在可控、可轉真人的位置。')}
      ${renderBoundarySwitch()}
      <div class="case-steps">
        ${steps.map(([title, copy, boundary]) => `<div class="case-step" data-search="${escapeHtml(title)} ${escapeHtml(copy)}"><div><h3>${title}</h3><p>${copy}</p><p class="boundary-detail">${boundary}</p></div></div>`).join('')}
      </div>
      <div class="callout"><p><strong>收尾句：</strong>重點不是讓 AI 多發訊息，而是用 Social CDP 建立正確身份、Consent、狀態與可判定的 Journey，再把 AI 放在有權限、有來源、可轉真人的對話協助位置。</p></div>
      <div class="answer-actions">
        <button class="primary-button start-script" data-seconds="180">開始 03:00 Case 練習</button>
        <button class="practice-check" data-progress="case-main">標記已練</button>
      </div>
      ${sourceLinks}
    `;
  }

  function renderStories() {
    const tagMap = {
      S1: ['leadership', 'roadmap'], S2: ['integration', 'state'], S3: ['trade-off', 'engineering'],
      S4: ['leadership', 'governance'], S5: ['governance', 'risk'], S6: ['data', 'reconciliation'],
      S7: ['scope', 'stakeholder'], S8: ['AI', 'workflow'], S9: ['learning', 'KYC'],
    };
    $('#section-stories').innerHTML = `
      ${chapterIntro('STORY BANK', '9 個可用故事', '每一張都只使用可追溯證據。先說本人決策與動作，再說可證結果；沒有證據的衝突、事故與數字不補寫。')}
      ${renderBoundarySwitch()}
      <div class="toolbar" id="story-filters">
        ${['全部', 'leadership', 'integration', 'governance', 'data', 'AI'].map((tag, index) => `<button class="filter-button ${index === 0 ? 'active' : ''}" data-story-filter="${tag}">${tag}</button>`).join('')}
      </div>
      <div class="story-grid">
        ${data.stories.map((story) => {
          const tags = tagMap[story.id] || [];
          return `<article class="story-card" data-story-tags="${tags.join(' ')}" data-search="${escapeHtml(story.title)} ${escapeHtml(story.answer)}">
            <div class="story-meta"><span>${story.id}</span><button class="practice-check" data-progress="story-${story.id}">標記已練</button></div>
            <h3>${escapeHtml(story.title)}</h3>
            <blockquote>${escapeHtml(story.answer)}</blockquote>
            <div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
            <div class="boundary-detail"><strong>禁止誇大：</strong>${escapeHtml(story.boundary || '依上游 Story Bank 的 ownership 與結果邊界回答。')}<br><strong>可追問：</strong>${escapeHtml(story.deep)}</div>
          </article>`;
        }).join('')}
      </div>
      ${sourceLinks}
    `;
  }

  function renderQuestions() {
    const categories = [...new Map(data.questions.map((question) => [question.categoryKey, question.category])).entries()];
    $('#section-questions').innerHTML = `
      ${chapterIntro('PM LEAD QUESTION BANK', '30 題 PM Lead 題庫', '每題包含回答框架、候選人回答、深挖追問與風險提醒。請練 response cue，不要背全文。')}
      ${renderBoundarySwitch()}
      <div class="toolbar" id="question-filters">
        <button class="filter-button active" data-question-filter="全部">全部 30 題</button>
        ${categories.map(([key, label]) => `<button class="filter-button" data-question-filter="${key}">${key}. ${escapeHtml(label)}</button>`).join('')}
      </div>
      <div class="question-list">
        ${data.questions.map((question) => `
          <article class="question-card" data-question-category="${question.categoryKey}" data-search="${escapeHtml(question.title)} ${escapeHtml(question.answer)}">
            <details>
              <summary>
                <span class="question-number">Q${String(question.number).padStart(2, '0')}</span>
                <span class="question-title">${escapeHtml(question.title)}</span>
                <span class="question-category">${question.categoryKey}. ${escapeHtml(question.category)}</span>
              </summary>
              <div class="question-content">
                <p class="answer-frame">回答框架｜${escapeHtml(question.framework)}</p>
                <p class="question-answer">${escapeHtml(question.answer)}</p>
                <div class="follow-up"><strong>深挖追問：</strong>${escapeHtml(question.followUp)}</div>
                <div class="boundary-detail evidence-note"><strong>風險提醒：</strong>${escapeHtml(question.boundary)}</div>
                <div class="question-actions">
                  <button class="copy-button" data-copy="${escapeHtml(question.answer)}">複製回答</button>
                  <button class="practice-check" data-progress="question-${question.number}">標記已練</button>
                </div>
              </div>
            </details>
          </article>
        `).join('')}
      </div>
      ${sourceLinks}
    `;
  }

  function renderCtoQuick() {
    const anchors = [
      ['System／Data', '來源 → ingestion → identity／consent → profile／event → segment／journey → channel／Agent → feedback。橫向放 RBAC、PII、audit、observability、reconciliation、rollback。', 'Reference architecture；Omnichat stack／scale／SLO 是 UNKNOWN。'],
      ['Integration', 'Event contract要有tenant、event ID、entity、occurred_at、version、schema；idempotent action、bounded retry、DLQ、API reconciliation與operator recovery。', '過往未證 production retry／DLQ implementation ownership。'],
      ['Agent', 'Trigger → Context → Policy → Planner／Router → Tool → Validation → Human Gate／Handoff → Action → Trace／Eval。', '已證role／artifact／gate workflow；production runtime是PROPOSED。'],
      ['PJM', 'Approved PRD → contract check → vertical WBS → ticket draft → PM／Design／Eng／QA review → Board → staged release／rollback。', 'Board write-back與enterprise rollout不是既有成果。'],
    ];
    $('#section-cto-quick').innerHTML = `
      ${chapterIntro('QUICK REVIEW · P1 CTO', 'CTO 15 分鐘速讀', '先守住 ownership 與 UNKNOWN，再用 data、state、failure、permission、observability 與 rollback 回答。')}
      ${renderBoundarySwitch()}
      <div class="status-strip" aria-label="P1 材料狀態">
        <div class="status-cell ready"><span class="status-icon">✓</span><div class="status-copy">P1 本機材料：<strong>READY FOR REVIEW</strong></div></div>
        <div class="status-cell hold"><span class="status-icon">!</span><div class="status-copy">Production／enterprise claims：<strong>HOLD</strong></div></div>
      </div>
      <div class="content-grid">
        ${anchors.map(([title, copy, boundary]) => domainCard(title, `${copy}<span class="boundary-detail evidence-note">${boundary}</span>`, ['decision', 'ownership', 'recovery'])).join('')}
      </div>
      <div class="callout"><p><strong>固定回答語法：</strong>Decision → Objects／Source of Truth → State／Failure → Permission／PII → Observability／Recovery → Metrics／Trade-off → Owner／Unknown。</p></div>
      <div class="section-heading-row"><h2>真實經驗錨點</h2></div>
      <table class="concept-table"><thead><tr><th>題型</th><th>可用 Direct Evidence</th><th>不可升級</th></tr></thead><tbody>
        <tr><td>Architecture／Priority</td><td>3 PM＋2 Design；四個月 0→1 CEX；account／wallet／approval／risk／ops</td><td>獨立 engineering build、交易成果</td></tr>
        <tr><td>Integration</td><td>BANXA／法幣 eligibility、KYC handoff、order／payment／refund／cancel state</td><td>API／queue／支付清算 implementation、incident</td></tr>
        <tr><td>State／Trade-off</td><td>Grid lifecycle、margin／liquidation risk、manual termination、admin visibility</td><td>quant code、volume／retention lift</td></tr>
        <tr><td>Governance</td><td>KYC product flow、1–6 層 approval／risk requirements</td><td>Consent platform、SDK、security architecture</td></tr>
        <tr><td>Agent Workflow</td><td>角色型 Skills、artifact folders、user gate；個人 handoff／state／reviewer</td><td>enterprise rollout、adoption、ROI、days-to-hours</td></tr>
      </tbody></table>
      ${sourceLinks}
    `;
  }

  function renderAgenticPjm() {
    const ticketFields = ['Title', 'Source@version', 'Problem／Context', 'Scope＋Non-goal', 'Given／When／Then AC', 'Dependencies', 'Risk', 'Role owner', 'UNESTIMATED', 'DoR／DoD', 'Release／Rollback', 'Trace'];
    $('#section-agentic-pjm').innerHTML = `
      ${chapterIntro('AGENTIC WORKFLOW × PJM', 'PRD 到 Scrum Board', 'Agent 是受控 delivery copilot：只讀 approved artifacts、預設產 draft；不決定 scope、owner、estimate、architecture 或 release。')}
      ${renderBoundarySwitch()}
      <div class="flow" aria-label="PRD 到 Scrum Board 流程">
        ${flowStep('Approved PRD', 'MVP／flow／non-goal／AC／dependency')}
        <span class="flow-arrow">→</span>${flowStep('Contract Check', 'missing／drift → HOLD')}
        <span class="flow-arrow">→</span>${flowStep('Vertical WBS', 'Epic／Story／Task')}
        <span class="flow-arrow">→</span>${flowStep('Draft Board', 'source／AC／risk／DoR／DoD')}
        <span class="flow-arrow">→</span>${flowStep('Human Review', 'PM／Design／Eng／QA')}
        <span class="flow-arrow">→</span>${flowStep('Release Loop', 'QA／observe／rollback')}
      </div>
      <div class="section-heading-row"><h2>Ticket Contract</h2><p>Owner 只填 role；estimate 預設 UNESTIMATED。</p></div>
      <div class="tag-row">${ticketFields.map((field) => `<span class="tag">${escapeHtml(field)}</span>`).join('')}</div>
      <div class="content-grid">
        ${domainCard('DoR', 'Source／scope／AC／design／dependency／risk review清楚；Engineering可估；未解blocker留在HOLD，不進Sprint。', ['ready', 'estimate by owner', 'no blocker'])}
        ${domainCard('DoD', 'AC＋negative／recovery test、telemetry、security／data、docs／runbook、monitor／rollback與artifact／decision log更新。', ['evidence', 'release-ready', 'learning'])}
        ${domainCard('Version Drift', '比對source hash；受影響票標STALE_REVIEW_REQUIRED，不覆寫in-flight work；PM重決scope、工程重估、QA更新coverage。', ['semantic diff', 'human decision', 're-approval'])}
        ${domainCard('Permission／PII', 'read／draft／write／transition／assign／release分權；tenant隔離、data minimization、high-impact human approval與audit。', ['least privilege', 'PII minimization', 'audit'])}
      </div>
      <div class="split-panel"><div><p class="section-label">DEMONSTRATED</p><h3>可直接證明</h3><ul><li>PM／UIUX／FE role Skills與artifact folders。</li><li>跨階段user approval gate。</li><li>個人handoff／state／artifact／independent reviewer correction loop。</li></ul></div><div class="risk"><p class="section-label">PROPOSED／HOLD</p><h3>不可說成已落地</h3><ul><li>Board API write-back與enterprise RBAC／PII。</li><li>production drift alert、observability與組織 rollout。</li><li>cycle-time、quality、adoption、ROI改善數字。</li></ul></div></div>
      ${sourceLinks}
    `;
  }

  function renderCtoQuestions() {
    const categories = [...new Map(data.ctoQuestions.map((question) => [question.categoryKey, question.category])).entries()];
    $('#section-cto-questions').innerHTML = `
      ${chapterIntro('CTO QUESTION BANK', '36 題 Technical Deep Dive', '完整涵蓋system/data architecture、integration reliability、security、observability、Agent與真實經驗追問。')}
      ${renderBoundarySwitch()}
      <div class="toolbar" id="cto-question-filters">
        <button class="filter-button active" data-cto-question-filter="全部">全部 36 題</button>
        ${categories.map(([key, label]) => `<button class="filter-button" data-cto-question-filter="${key}">${key}. ${escapeHtml(label)}</button>`).join('')}
      </div>
      <div class="question-list">
        ${data.ctoQuestions.map((question) => `
          <article class="question-card cto-question-card" data-question-category="${question.categoryKey}" data-search="${escapeHtml(question.title)} ${escapeHtml(question.answer)}">
            <details><summary><span class="question-number">Q${String(question.number).padStart(2, '0')}</span><span class="question-title">${escapeHtml(question.title)}</span><span class="question-category">${question.categoryKey}. ${escapeHtml(question.category)}</span></summary>
              <div class="question-content"><p class="answer-frame">回答框架｜${escapeHtml(question.framework)}</p><p class="question-answer">${escapeHtml(question.answer)}</p><div class="follow-up"><strong>CTO 深挖：</strong>${escapeHtml(question.followUp)}</div><div class="boundary-detail evidence-note"><strong>紅旗／邊界：</strong>${escapeHtml(question.boundary)}</div><div class="question-actions"><button class="copy-button" data-copy="${escapeHtml(question.answer)}">複製回答</button><button class="practice-check" data-progress="cto-question-${question.number}">標記已練</button></div></div>
            </details>
          </article>`).join('')}
      </div>
      ${sourceLinks}
    `;
  }

  function renderHolds() {
    $('#section-holds').innerHTML = `
      ${chapterIntro('EVIDENCE BOUNDARY', '兩個 HOLD', '這兩題不是回答技巧問題，而是缺少足以還原真實事件的外部證據。在補到真實事件前，安全回答優先於完整敘事。')}
      <div class="hold-grid">
        <article class="hold-card" data-search="工程不同意 disagreement trade-off">
          <span class="hold-id">HOLD-DISAGREEMENT-001</span>
          <h3>工程不同意你的方案</h3>
          <h4>安全回答</h4>
          <p>我有和工程處理複雜限制與 trade-off 的真實案例，但目前可公開資料不足以還原一場雙方立場明確不同的事件。我可以用 Grid 說明如何把限制變成 options、風險與 launch gate，但不會把正常技術討論包裝成衝突。</p>
          <h4>還缺什麼</h4>
          <p>雙方清楚不同的立場、本人做的決策、實際結果，以及可以誠實描述的後續影響。</p>
          <h4>不可偷換</h4>
          <p class="not-allowed">Futures Grid 只能當 technical trade-off，不是工程衝突故事。</p>
        </article>
        <article class="hold-card" data-search="失敗 failure ownership correction">
          <span class="hold-id">HOLD-FAILURE-001</span>
          <h3>請說一次你的失敗</h3>
          <h4>安全回答</h4>
          <p>我有流程改善與技術取捨案例，但目前可公開資料不足以誠實還原完整失敗事件。我不會把一般挑戰包裝成失敗；可以分享 single-owner 加 peer-review 的領導反思，但會清楚說它不是有量化損失的事故。</p>
          <h4>還缺什麼</h4>
          <p>本人做錯的具體決策、造成的負面影響、承擔責任與修正，以及後來可驗證的結果。</p>
          <h4>不可偷換</h4>
          <p class="not-allowed">PM Cross-Review 不是失敗故事；組織調整／人力縮編也不是產品失敗。</p>
        </article>
      </div>
      <div class="hold-banner"><span>!</span><div><strong>補件 Gate：</strong>只有在事件、本人 ownership、負面影響、修正與後續結果都能具體還原後，才可從 HOLD 升級。</div></div>
      ${sourceLinks}
    `;
  }

  function renderAsk() {
    const asks = [
      '這個新增 Headcount 前六個月最希望改善的客戶或產品問題是什麼？',
      '六位 PM 目前如何依 product line、customer segment 或 shared platform capability 分工？',
      'CRM／CDP integration 現在最常卡在資料品質、identity／Consent、客戶客製，還是第三方限制？',
      'Senior PM 對 roadmap、共用 data model 與客戶承諾的 decision boundary 到哪裡？',
      '這個角色前三到六個月的成功，主要看使用、客戶 outcome、交付速度、整合穩定性，還是商業指標？',
    ];
    $('#section-ask').innerHTML = `
      ${chapterIntro('YOUR QUESTIONS', '反問 PM Lead', '不要一次問完五題。依前面的對話選兩題，優先確認第一個問題、decision boundary 與成功標準。')}
      <div class="ask-list">
        ${asks.map((ask, index) => `<div class="ask-item" data-search="${escapeHtml(ask)}"><span class="ask-number">0${index + 1}</span><p>${ask}</p><button class="copy-button" data-copy="${escapeHtml(ask)}">複製</button></div>`).join('')}
      </div>
      <div class="section-heading-row"><h2>面試後立即記錄</h2></div>
      <div class="content-grid">
        ${['真正負責的 module／customer segment', 'PM Lead 說的 success metric', '六位 PM 實際分工與 shared owner', '第一個問題／風險', '下一關需補的技術證據', '我講過但需要修正的 claim'].map((item) => `<label class="editorial-card"><strong>${item}</strong><textarea class="interview-note" data-note="${escapeHtml(item)}" rows="3" placeholder="面試後記在這裡…"></textarea></label>`).join('')}
      </div>
      ${sourceLinks}
    `;
  }

  function chapterIntro(label, title, lede) {
    return `<div class="chapter-intro"><p class="section-label">${label}</p><h1>${title}</h1><p class="lede">${lede}</p></div>`;
  }

  function renderBoundarySwitch() {
    return `<div class="boundary-switch" role="group" aria-label="證據邊界顯示模式">
      <button class="boundary-mode active" data-boundary-mode="safe">只看可講版本</button>
      <button class="boundary-mode" data-boundary-mode="boundary">顯示證據邊界</button>
    </div>`;
  }

  function domainCard(title, copy, tags) {
    return `<article class="editorial-card" data-search="${escapeHtml(title)} ${escapeHtml(copy)}"><h3>${title}</h3><p>${copy}</p><div class="tag-row">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div></article>`;
  }

  function flowStep(title, copy) {
    return `<div class="flow-step"><strong>${title}</strong><small>${copy}</small></div>`;
  }

  function timeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  function renderAll() {
    renderNav();
    renderQuick();
    renderRole();
    renderDomain();
    renderMapping();
    renderCase();
    renderStories();
    renderQuestions();
    renderCtoQuick();
    renderAgenticPjm();
    renderCtoQuestions();
    renderHolds();
    renderAsk();
  }

  let activeChapter = 0;
  function showChapter(id, updateHash = true) {
    const index = chapters.findIndex((chapter) => chapter.id === id);
    if (index < 0) return;
    activeChapter = index;
    $$('.chapter-section').forEach((section) => section.classList.toggle('active', section.id === `section-${id}`));
    $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.section === id));
    $('#chapter-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}`;
    $('#chapter-title').textContent = chapters[index].label;
    $('#footer-chapter').textContent = chapters[index].label;
    $('#previous-chapter').disabled = index === 0;
    $('#next-chapter').disabled = index === chapters.length - 1;
    if (updateHash) history.replaceState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  }

  function openSidebar() {
    document.body.classList.add('sidebar-open');
    $('#sidebar-scrim').hidden = false;
  }
  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    $('#sidebar-scrim').hidden = true;
  }

  let timerRemaining = 15 * 60;
  let timerInterval = null;
  function updateTimerDisplay() {
    const minutes = Math.floor(timerRemaining / 60);
    const seconds = timerRemaining % 60;
    $('#timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    $('#timer-toggle').textContent = timerInterval ? '暫停' : '開始';
  }
  function startTimer(seconds) {
    if (Number.isFinite(seconds)) timerRemaining = seconds;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerRemaining -= 1;
      if (timerRemaining <= 0) {
        timerRemaining = 0;
        clearInterval(timerInterval);
        timerInterval = null;
        showToast('時間到，先停下來檢查結論與邊界。');
      }
      updateTimerDisplay();
    }, 1000);
    updateTimerDisplay();
  }
  function toggleTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      updateTimerDisplay();
    } else {
      if (timerRemaining === 0) timerRemaining = 15 * 60;
      startTimer();
    }
  }

  function setBoundaryMode(mode) {
    const show = mode === 'boundary';
    document.body.classList.toggle('show-boundary', show);
    $$('.boundary-mode').forEach((button) => button.classList.toggle('active', button.dataset.boundaryMode === mode));
    localStorage.setItem('omnichat-boundary-mode', mode);
  }

  function initProgress() {
    $$('.practice-check').forEach((button) => {
      const key = `omnichat-progress-${button.dataset.progress}`;
      const done = localStorage.getItem(key) === 'done';
      button.classList.toggle('done', done);
      button.textContent = done ? '✓ 已練' : '標記已練';
    });
  }

  function toggleProgress(button) {
    const key = `omnichat-progress-${button.dataset.progress}`;
    const nextDone = !button.classList.contains('done');
    localStorage.setItem(key, nextDone ? 'done' : '');
    button.classList.toggle('done', nextDone);
    button.textContent = nextDone ? '✓ 已練' : '標記已練';
  }

  function initNotes() {
    $$('.interview-note').forEach((textarea) => {
      const key = `omnichat-note-${textarea.dataset.note}`;
      textarea.value = localStorage.getItem(key) || '';
      textarea.addEventListener('input', () => localStorage.setItem(key, textarea.value));
    });
  }

  function openSearch(query = '') {
    const dialog = $('#search-dialog');
    if (!dialog.open) dialog.showModal();
    $('#dialog-search-input').value = query;
    runSearch(query);
    setTimeout(() => $('#dialog-search-input').focus(), 30);
  }

  function getSearchIndex() {
    const chapterItems = chapters.map((chapter) => ({ type: '章節', chapter: chapter.id, title: chapter.label, excerpt: $(`#section-${chapter.id}`).textContent.replace(/\s+/g, ' ').trim().slice(0, 180) }));
    const storyItems = data.stories.map((story) => ({ type: '故事', chapter: 'stories', title: `${story.id}｜${story.title}`, excerpt: story.answer }));
    const questionItems = data.questions.map((question) => ({ type: `PM 題庫 ${question.categoryKey}`, chapter: 'questions', title: `Q${question.number}｜${question.title}`, excerpt: question.answer }));
    const ctoQuestionItems = data.ctoQuestions.map((question) => ({ type: `CTO 題庫 ${question.categoryKey}`, chapter: 'cto-questions', title: `Q${question.number}｜${question.title}`, excerpt: question.answer }));
    return [...chapterItems, ...storyItems, ...questionItems, ...ctoQuestionItems];
  }

  function runSearch(query) {
    const normalized = query.trim().toLowerCase();
    const results = $('#search-results');
    if (normalized.length < 2) {
      results.innerHTML = '';
      $('#search-hint').textContent = '輸入至少兩個字，會搜尋章節、故事、PM Lead 與 CTO 題庫。';
      return;
    }
    const matches = getSearchIndex().filter((item) => `${item.title} ${item.excerpt}`.toLowerCase().includes(normalized)).slice(0, 18);
    $('#search-hint').textContent = matches.length ? `找到 ${matches.length} 筆結果` : '沒有找到結果，試試較短的關鍵字。';
    results.innerHTML = matches.map((item) => `<button class="search-result" data-search-chapter="${item.chapter}"><span>${item.type}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.excerpt.slice(0, 110))}${item.excerpt.length > 110 ? '…' : ''}</small></button>`).join('');
  }

  let toastTimeout;
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已複製');
    } catch {
      showToast('瀏覽器未允許複製，請手動選取文字。');
    }
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const nav = event.target.closest('[data-section]');
      if (nav) showChapter(nav.dataset.section);

      const boundary = event.target.closest('[data-boundary-mode]');
      if (boundary) setBoundaryMode(boundary.dataset.boundaryMode);

      const copy = event.target.closest('[data-copy]');
      if (copy) copyText(copy.dataset.copy);

      const progress = event.target.closest('[data-progress]');
      if (progress) toggleProgress(progress);

      const startScript = event.target.closest('.start-script');
      if (startScript) {
        startTimer(Number(startScript.dataset.seconds));
        showToast('計時開始，先講結論。');
      }

      const storyFilter = event.target.closest('[data-story-filter]');
      if (storyFilter) {
        $$('#story-filters .filter-button').forEach((button) => button.classList.toggle('active', button === storyFilter));
        const filter = storyFilter.dataset.storyFilter;
        $$('.story-card').forEach((card) => card.classList.toggle('hidden', filter !== '全部' && !card.dataset.storyTags.split(' ').includes(filter)));
      }

      const questionFilter = event.target.closest('[data-question-filter]');
      if (questionFilter) {
        $$('#question-filters .filter-button').forEach((button) => button.classList.toggle('active', button === questionFilter));
        const filter = questionFilter.dataset.questionFilter;
        $$('.question-card').forEach((card) => card.classList.toggle('hidden', filter !== '全部' && card.dataset.questionCategory !== filter));
      }

      const ctoQuestionFilter = event.target.closest('[data-cto-question-filter]');
      if (ctoQuestionFilter) {
        $$('#cto-question-filters .filter-button').forEach((button) => button.classList.toggle('active', button === ctoQuestionFilter));
        const filter = ctoQuestionFilter.dataset.ctoQuestionFilter;
        $$('.cto-question-card').forEach((card) => card.classList.toggle('hidden', filter !== '全部' && card.dataset.questionCategory !== filter));
      }

      const searchResult = event.target.closest('[data-search-chapter]');
      if (searchResult) {
        $('#search-dialog').close();
        showChapter(searchResult.dataset.searchChapter);
      }
    });

    $('#menu-button').addEventListener('click', openSidebar);
    $('#mobile-brand').addEventListener('click', openSidebar);
    $('#sidebar-close').addEventListener('click', closeSidebar);
    $('#sidebar-scrim').addEventListener('click', closeSidebar);
    $('#previous-chapter').addEventListener('click', () => showChapter(chapters[Math.max(0, activeChapter - 1)].id));
    $('#next-chapter').addEventListener('click', () => showChapter(chapters[Math.min(chapters.length - 1, activeChapter + 1)].id));

    $('#timer-toggle').addEventListener('click', toggleTimer);
    $('#timer-reset').addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRemaining = 15 * 60;
      updateTimerDisplay();
    });

    $('#top-search-trigger').addEventListener('click', () => openSearch());
    $('#search-close').addEventListener('click', () => $('#search-dialog').close());
    $('#dialog-search-input').addEventListener('input', (event) => runSearch(event.target.value));
    $('#sidebar-search-input').addEventListener('input', (event) => {
      if (event.target.value.trim().length >= 2) openSearch(event.target.value);
    });
    $('#search-dialog').addEventListener('click', (event) => {
      if (event.target === $('#search-dialog')) $('#search-dialog').close();
    });

    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
      }
      if (event.key === 'Escape') closeSidebar();
    });
  }

  renderAll();
  bindEvents();
  initProgress();
  initNotes();
  setBoundaryMode(localStorage.getItem('omnichat-boundary-mode') || 'safe');
  updateTimerDisplay();
  const initial = location.hash.replace('#', '');
  showChapter(chapters.some((chapter) => chapter.id === initial) ? initial : 'quick', false);
})();
