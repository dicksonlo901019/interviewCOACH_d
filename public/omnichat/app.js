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

  const glossaryEnglishNames = new Map([
    ['AI 代理人', 'AI Agent'],
    ['技能規範', 'Skill'],
    ['任務協調器', 'Orchestrator'],
    ['上下文組裝', 'Context Assembly'],
    ['角色登錄表', 'Agent Registry'],
    ['任務契約', 'Task Envelope'],
    ['交接契約', 'Handoff Contract'],
    ['產物清單', 'Artifact Manifest'],
    ['獨立審查者', 'Independent Reviewer'],
    ['狀態機', 'State Machine'],
    ['冪等鍵', 'Idempotency Key'],
    ['受控重播', 'Controlled Replay'],
    ['優雅降級', 'Graceful Degradation'],
    ['受控自主性', 'Bounded Autonomy'],
    ['提示注入', 'Prompt Injection'],
    ['工具呼叫', 'Tool Calling'],
    ['驗收條件', 'Acceptance Criteria'],
    ['待辦事項梳理', 'Backlog Refinement'],
    ['顧客 360', 'Customer 360'],
    ['身份解析', 'Identity Resolution'],
    ['權威資料來源', 'Source of Truth'],
    ['整合式顧客檔案', 'Unified Profile'],
    ['同意管理', 'Consent Management'],
    ['顧客旅程', 'Customer Journey'],
    ['可觀測性', 'Observability'],
    ['資料脈絡', 'Data Lineage'],
    ['資料結構', 'Schema'],
    ['身份識別值', 'Identifier'],
    ['顧客檔案', 'Customer Profile'],
    ['事件對帳', 'Reconciliation'],
    ['租戶', 'Tenant'],
    ['PRD', 'Product Requirements Document (PRD)'],
    ['AC', 'Acceptance Criteria (AC)'],
    ['SLO', 'Service Level Objective (SLO)'],
    ['SLA', 'Service Level Agreement (SLA)'],
    ['KPI', 'Key Performance Indicator (KPI)'],
    ['MVP', 'Minimum Viable Product (MVP)'],
    ['CEX', 'Centralized Exchange (CEX)'],
    ['KYC', 'Know Your Customer (KYC)'],
    ['KYT', 'Know Your Transaction (KYT)'],
    ['AML', 'Anti-Money Laundering (AML)'],
    ['API', 'Application Programming Interface (API)'],
    ['SDK', 'Software Development Kit (SDK)'],
    ['NFT', 'Non-Fungible Token (NFT)'],
    ['LLM', 'Large Language Model (LLM)'],
    ['C2C', 'Customer-to-Customer (C2C)'],
    ['B2C', 'Business-to-Customer (B2C)'],
    ['DLQ', 'Dead Letter Queue (DLQ)'],
    ['RBAC', 'Role-Based Access Control (RBAC)'],
    ['PII', 'Personally Identifiable Information (PII)'],
    ['RAG', 'Retrieval-Augmented Generation (RAG)'],
    ['ITT', 'Intent-to-Treat (ITT)'],
    ['MDE', 'Minimum Detectable Effect (MDE)'],
    ['WBS', 'Work Breakdown Structure (WBS)'],
    ['DoR', 'Definition of Ready (DoR)'],
    ['DoD', 'Definition of Done (DoD)'],
    ['CDP', 'Customer Data Platform (CDP)'],
    ['CRM', 'Customer Relationship Management (CRM)'],
    ['EIP-712', 'Ethereum Improvement Proposal 712 (EIP-712)'],
  ]);

  const glossary = [
    ['AI 代理人', '以 LLM 為推理核心，由執行環境組裝上下文、選擇工具、執行步驟並根據結果繼續或停止的任務角色。'],
    ['技能規範', '提供給 Agent 的可重用工作說明，定義步驟、必要輸入、輸出格式、品質條件與禁止事項；它本身不會主動呼叫 LLM。'],
    ['任務協調器', '判斷任務處於哪個階段，選擇對應 Agent 與 Skill，並根據 gate 結果決定下一步。'],
    ['上下文組裝', '把使用者需求、規則、Skill、已核准產物與權限邊界整理成 LLM 當次可使用的輸入。'],
    ['角色登錄表', '記錄可用 Agent、角色責任、觸發條件、輸入輸出與禁止事項的結構化登錄表。'],
    ['任務契約', '每次任務的結構化說明，包含目標、來源、限制、交付物、驗收條件、未知與停止條件。'],
    ['交接契約', '定義角色之間交付時必須提供的產物、狀態、證據、責任與完成條件。'],
    ['產物清單', '登錄每個產物的位置、版本、來源、狀態、負責角色與審查關係，供後續追溯。'],
    ['獨立審查者', '使用與執行者分離的上下文，依原始需求、驗收條件、證據與實際產物重新判定通過或退回。'],
    ['狀態機', '用明確狀態、允許的轉移與例外規則描述物件生命週期，避免任意跳轉。'],
    ['冪等鍵', '用來辨識同一操作的唯一鍵，讓重複請求不會重複產生副作用。'],
    ['受控重播', '在先確認範圍、副作用與去重規則後，受控地重新處理失敗或漏掉的事件。'],
    ['優雅降級', '部分能力故障時保留安全的核心服務，並停用或降級非必要功能。'],
    ['受控自主性', '把 Agent 的資料、工具、動作與停止條件限制在預先核准的範圍內。'],
    ['提示注入', '惡意內容企圖用文字指令改寫 Agent 規則、竊取資料或誘導越權行動的攻擊。'],
    ['工具呼叫', '模型依核准介面呼叫外部工具完成查詢或動作；工具權限與參數仍需受控。'],
    ['驗收條件', '可驗證需求是否完成的條件，宜清楚描述正常、例外與失敗情境。'],
    ['待辦事項梳理', '團隊定期釐清、拆分、排序與補足待辦工作的活動，讓後續規劃可執行。'],
    ['顧客 360', '帶有資料來源、更新時間、權限與衝突規則的顧客整合視圖，不代表資料越多越完整。'],
    ['身份解析', '依可驗證識別資訊判斷不同紀錄是否屬於同一人，並保留合併證據、信心與拆分能力。'],
    ['權威資料來源', '某項資料發生衝突時，被明確指定為裁決依據的來源；通常需要逐欄位定義。'],
    ['整合式顧客檔案', '把多來源識別、屬性、事件與同意狀態整理成可追溯且可使用的顧客檔案。'],
    ['同意管理', '顧客針對特定目的、渠道與市場所給予或撤回的資料使用及聯繫同意。'],
    ['顧客旅程', '依進入條件、狀態、規則、動作、退出與例外編排的顧客互動流程。'],
    ['可觀測性', '透過指標、日誌與追蹤理解系統內部狀態，並能定位異常與復原結果。'],
    ['資料脈絡', '記錄資料來自哪裡、經過哪些轉換以及被哪些下游使用的追溯資訊。'],
    ['資料結構', '資料欄位、型別、必要性與語意所形成的結構契約。'],
    ['身份識別值', '用來辨識顧客或帳戶的值，例如會員 ID、email、電話或渠道 ID。'],
    ['顧客檔案', '彙整顧客識別、屬性、事件與狀態的資料物件，須保留來源與治理規則。'],
    ['事件對帳', '比對多個系統的紀錄與狀態，找出差異並透過可追溯流程修正。'],
    ['租戶', '多租戶系統中的單一客戶或組織邊界，其資料與權限必須和其他租戶隔離。'],
    ['WalletConnect', '讓錢包與應用程式建立連線並交換簽署請求的通訊協定；不代表應用程式取得私鑰。'],
    ['Smart Contract', '部署在區塊鏈上、依程式規則自動執行的合約程式；上鏈後的變更與風險需特別治理。'],
    ['State Machine', '用明確狀態、允許的轉移與例外規則描述物件生命週期，避免任意跳轉。'],
    ['EIP-712', '以太坊的結構化資料簽署標準，讓錢包能顯示較可讀的簽署內容並降低盲簽風險。'],
    ['Social CDP', '整合社群渠道與顧客資料的 CDP，用來建立可治理的顧客視圖、受眾與旅程。'],
    ['Customer 360', '帶有資料來源、更新時間、權限與衝突規則的顧客整合視圖，不代表資料越多越完整。'],
    ['Identity Resolution', '依可驗證識別資訊判斷不同紀錄是否屬於同一人，並保留合併證據、信心與拆分能力。'],
    ['Source of Truth', '某項資料發生衝突時，被明確指定為裁決依據的權威來源；通常需要逐欄位定義。'],
    ['Unified Profile', '把多來源識別、屬性、事件與同意狀態整理成可追溯且可使用的顧客檔案。'],
    ['Canonical Model', '跨來源共同採用的標準資料模型，用一致物件與欄位語意降低整合差異。'],
    ['Deterministic Matching', '只用明確且可驗證的規則配對身份，例如經驗證的會員 ID；不靠機率猜測。'],
    ['Idempotency Key', '用來辨識同一操作的唯一鍵，讓重複請求不會重複產生副作用。'],
    ['Controlled Replay', '在先確認範圍、副作用與去重規則後，受控地重新處理失敗或漏掉的事件。'],
    ['Graceful Degradation', '部分能力故障時保留安全的核心服務，並停用或降級非必要功能。'],
    ['Human Approval', '高影響動作在執行前必須由有權限的人確認，Agent 不能自行略過。'],
    ['Human Gate', '流程中由人做出核准、拒絕或範圍決策的控制點。'],
    ['Bounded Autonomy', '把 Agent 的資料、工具、動作與停止條件限制在預先核准的範圍內。'],
    ['Prompt Injection', '惡意內容企圖用文字指令改寫 Agent 規則、竊取資料或誘導越權行動的攻擊。'],
    ['Tool Calling', '模型依核准介面呼叫外部工具完成查詢或動作；工具權限與參數仍需受控。'],
    ['Fine-tuning', '以特定資料調整模型行為；適合穩定任務模式，不等於提供即時外部知識。'],
    ['Definition of Ready', '工作進入 Sprint 前應具備的最低條件，例如範圍、驗收、依賴與風險已足以估算。'],
    ['Definition of Done', '工作可視為完成前必須滿足的共同標準，例如測試、監控、文件與回滾準備。'],
    ['Acceptance Criteria', '可驗證需求是否完成的條件，宜清楚描述正常、例外與失敗情境。'],
    ['Backlog Refinement', '團隊定期釐清、拆分、排序與補足待辦工作的活動，讓後續規劃可執行。'],
    ['Sprint Planning', '團隊依優先順序、依賴與可用產能，選定 Sprint 目標與承諾範圍。'],
    ['Decision Log', '記錄重要決策、理由、選項、負責人與日期，供後續追溯與版本變更比對。'],
    ['Version Drift', '執行中的工作所依據版本落後於已核准來源，可能造成範圍或驗收不一致。'],
    ['Scrum Board', '呈現待辦工作狀態、負責角色、阻塞與流動情況的敏捷工作看板。'],
    ['Given／When／Then', '驗收條件寫法：先描述前置狀態、發生的行為，再描述應觀察到的結果。'],
    ['Sub-task', '為完成一個 Task 所拆出的更小執行單位；不應失去上層目標與驗收脈絡。'],
    ['Non-goal', '本次交付刻意不處理的範圍，用來防止團隊或 Agent 自行擴張需求。'],
    ['Dependency', '工作開始或完成前所依賴的決策、資料、設計、服務或其他團隊交付。'],
    ['Capacity', '團隊在特定期間可投入的有效工作量，需扣除維運、假期與既有承諾。'],
    ['Handoff', '角色或系統交接工作時，明確傳遞狀態、輸入、產物、責任與完成條件。'],
    ['Rollout', '把新能力依風險分階段開放給更多使用者、流量或市場的發布策略。'],
    ['Backlog', '尚未排入執行、依價值與風險持續排序和釐清的產品工作清單。'],
    ['Sprint', 'Scrum 中有固定時間範圍的交付週期，團隊在其中追求一個明確目標。'],
    ['Epic', '跨多個 Story 的較大成果或問題範圍，應能連回產品目標與成功條件。'],
    ['Story', '從使用者或營運角色角度描述可獨立驗收的價值切片。'],
    ['Task', '完成 Story 所需的具體執行工作，通常由專業 owner 拆解與估算。'],
    ['PRD', 'Product Requirements Document；記錄問題、目標、範圍、流程、限制與驗收依據的產品需求文件。'],
    ['AC', 'Acceptance Criteria 的縮寫；用來驗證需求是否符合預期的明確條件。'],
    ['SLO', 'Service Level Objective；團隊對服務可靠性或效能設定的內部目標，例如可用性與延遲。'],
    ['SLA', 'Service Level Agreement；對客戶或合作方承諾的服務水準及未達成時的處理方式。'],
    ['KPI', 'Key Performance Indicator；用來判斷產品或營運目標是否達成的關鍵績效指標。'],
    ['MVP', 'Minimum Viable Product；以最小必要範圍驗證核心假設與交付風險的產品版本。'],
    ['CEX', 'Centralized Exchange；由中心化平台管理帳戶、資產紀錄與交易流程的加密資產交易所。'],
    ['KYC', 'Know Your Customer；核驗客戶身份與資格的流程，不等於 CRM 的跨來源身份合併。'],
    ['KYT', 'Know Your Transaction；分析交易與資金流風險的流程，通常用於合規監控。'],
    ['AML', 'Anti-Money Laundering；防制洗錢的政策、控制、監控與通報體系。'],
    ['API', 'Application Programming Interface；系統間以明確請求、回應與權限契約交換資料或操作能力的介面。'],
    ['SDK', 'Software Development Kit；供開發者整合特定平台能力的一組程式庫、工具與文件。'],
    ['NFT', 'Non-Fungible Token；在區塊鏈上代表獨特資產或權利的不可替代代幣。'],
    ['LLM', 'Large Language Model；能理解與生成自然語言的模型，仍需權限、驗證與失敗處理。'],
    ['C2C', 'Customer-to-Customer；由平台媒合顧客彼此交易的模式，通常需要更完整的信任與爭議治理。'],
    ['B2C', 'Business-to-Customer；由企業直接向顧客提供商品或服務的模式。'],
    ['Webhook', '來源系統在事件發生時主動送出的通知；接收端仍需處理重複、延遲、亂序與漏送。'],
    ['Schema Drift', '資料欄位、型別或語意未同步變更，導致上下游解析或判斷不一致。'],
    ['Suppression', '當身份、同意或資格不確定時，先阻止訊息或高風險動作執行的安全機制。'],
    ['Reconciliation', '比對多個系統的紀錄與狀態，找出差異並透過可追溯流程修正。'],
    ['Observability', '透過指標、日誌與追蹤理解系統內部狀態，並能定位異常與復原結果。'],
    ['Telemetry', '系統為監控與分析所產生的結構化指標、事件、日誌或追蹤資料。'],
    ['Data Lineage', '資料從來源、轉換到使用位置的可追溯路徑，用來判斷品質與責任。'],
    ['Lineage', '記錄資料來自哪裡、經過哪些轉換以及被哪些下游使用的追溯資訊。'],
    ['Data Minimization', '只收集、讀取與保留完成特定目的所必要的最少資料。'],
    ['Cross-tenant', '涉及不同租戶資料或權限邊界；必須避免一個客戶讀取或影響另一個客戶。'],
    ['Release Gate', '上線前必須通過的核准與品質條件，例如測試、監控、風險與回滾準備。'],
    ['Rollback', '發現異常時，把版本、設定或流量恢復到已知安全狀態的機制與流程。'],
    ['Guardrail', '用來限制風險或阻止不良結果的指標、規則或停止條件。'],
    ['Journey', '依進入條件、狀態、規則、動作、退出與例外編排的顧客互動流程。'],
    ['Segment', '依條件判斷在特定時間點符合資格的顧客集合；動態分群會隨資料更新。'],
    ['Consent', '顧客針對特定目的、渠道與市場所給予或撤回的資料使用及聯繫同意。'],
    ['Profile', '彙整顧客識別、屬性、事件與狀態的資料物件，須保留來源與治理規則。'],
    ['Identifier', '用來辨識顧客或帳戶的值，例如會員 ID、email、電話或渠道 ID。'],
    ['Identity', '代表顧客或帳戶身份的識別集合與關聯；不同系統可能持有不同識別值。'],
    ['Schema', '資料欄位、型別、必要性與語意所形成的結構契約。'],
    ['Tenant', '多租戶系統中的單一客戶或組織邊界，其資料與權限必須和其他租戶隔離。'],
    ['Audit', '以可追溯證據檢查誰做了什麼、依據為何及結果如何的治理能力。'],
    ['Idempotency', '同一操作重做一次或多次，最終結果仍與執行一次相同的性質。'],
    ['Retry', '暫時性失敗後依退避與上限重新嘗試；不應無限重送或製造重複副作用。'],
    ['DLQ', 'Dead Letter Queue；收納多次處理仍失敗的事件，供告警、調查與受控重播。'],
    ['RBAC', 'Role-Based Access Control；依角色授予最小必要權限，而非逐人任意開放。'],
    ['PII', 'Personally Identifiable Information；可直接或間接識別個人的資料。'],
    ['Audit Log', '不可任意竄改的操作紀錄，應保留誰在何時對什麼做了什麼及其結果。'],
    ['RAG', 'Retrieval-Augmented Generation；回答前檢索核准來源，讓模型依可追溯內容生成。'],
    ['ITT', 'Intent-to-Treat；按最初分組計算實驗效果，避免因後續行為造成選擇偏誤。'],
    ['MDE', 'Minimum Detectable Effect；在指定樣本與統計條件下，實驗能可靠辨識的最小效果。'],
    ['WBS', 'Work Breakdown Structure；把交付目標依成果與工作層級拆成可管理單位。'],
    ['DoR', 'Definition of Ready 的縮寫；用來判斷工作是否已具備進入 Sprint 的條件。'],
    ['DoD', 'Definition of Done 的縮寫；用來判斷工作是否真正完成並可安全交付。'],
    ['CDP', 'Customer Data Platform；整合多來源顧客資料，建立可治理的 profile 與 audience。'],
    ['CRM', 'Customer Relationship Management；支援顧客關係、互動與營運流程的系統。'],
  ].map(([term, definition]) => ({
    term,
    englishName: glossaryEnglishNames.get(term) || term,
    definition,
  }));

  const glossaryAliases = [
    ['標準資料模型', 'Canonical Model'],
    ['確定性配對', 'Deterministic Matching'],
    ['人工核准', 'Human Approval'],
    ['人工關卡', 'Human Gate'],
    ['模型微調', 'Fine-tuning'],
    ['就緒定義', 'Definition of Ready'],
    ['完成定義', 'Definition of Done'],
    ['Sprint 規劃', 'Sprint Planning'],
    ['Scrum 看板', 'Scrum Board'],
    ['子任務', 'Sub-task'],
    ['上線關卡', 'Release Gate'],
    ['跨租戶', 'Cross-tenant'],
    ['社群 CDP', 'Social CDP'],
    ['遙測資料', 'Telemetry'],
    ['抑制', 'Suppression'],
    ['事件通知', 'Webhook'],
    ['大型主題', 'Epic'],
    ['使用者故事', 'Story'],
    ['任務', 'Task'],
    ['資料最小化', 'Data Minimization'],
    ['版本漂移', 'Version Drift'],
    ['資料結構漂移', 'Schema Drift'],
    ['稽核紀錄', 'Audit Log'],
    ['稽核', 'Audit'],
    ['客群', 'Segment'],
    ['回滾', 'Rollback'],
    ['風險防護條件', 'Guardrail'],
    ['智能合約', 'Smart Contract'],
    ['決策紀錄', 'Decision Log'],
    ['非目標', 'Non-goal'],
    ['依賴', 'Dependency'],
    ['產能', 'Capacity'],
    ['交接', 'Handoff'],
    ['分階段上線', 'Rollout'],
    ['風險護欄', 'Guardrail'],
    ['身份', 'Identity'],
    ['冪等性', 'Idempotency'],
    ['重試', 'Retry'],
  ];

  glossaryAliases.forEach(([term, englishName]) => {
    const source = glossary.find((item) => item.term.toLowerCase() === englishName.toLowerCase());
    if (source) glossary.push({ term, englishName, definition: source.definition });
  });

  const glossaryByTerm = new Map(glossary.map((item) => [item.term.toLowerCase(), item]));
  const glossaryTerms = [...glossary].sort((a, b) => b.term.length - a.term.length);
  const isAsciiWord = (value) => /^[A-Za-z0-9 -]+$/.test(value);

  function findGlossaryMatch(text, fromIndex = 0) {
    const lower = text.toLowerCase();
    let best = null;
    glossaryTerms.forEach((item) => {
      const needle = item.term.toLowerCase();
      let index = lower.indexOf(needle, fromIndex);
      while (index >= 0 && isAsciiWord(item.term)) {
        const before = text[index - 1] || '';
        const after = text[index + item.term.length] || '';
        if (!/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after)) break;
        index = lower.indexOf(needle, index + 1);
      }
      if (index < 0) return;
      if (!best || index < best.index || (index === best.index && item.term.length > best.item.term.length)) {
        best = { index, item, matchedText: text.slice(index, index + item.term.length) };
      }
    });
    return best;
  }

  function annotateGlossary(root = document) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) continue;
      if (parent.closest('script, style, code, kbd, textarea, input, button, a, summary, .glossary-term, [aria-hidden="true"]')) continue;
      if (findGlossaryMatch(node.nodeValue)) nodes.push(node);
    }

    nodes.forEach((textNode) => {
      const text = textNode.nodeValue;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      let match = findGlossaryMatch(text, cursor);
      while (match) {
        if (match.index > cursor) fragment.append(text.slice(cursor, match.index));
        const span = document.createElement('span');
        span.className = 'glossary-term';
        span.tabIndex = 0;
        span.setAttribute('role', 'term');
        span.setAttribute('aria-describedby', 'glossary-tooltip');
        span.setAttribute('aria-label', `${match.matchedText}，英文原名：${match.item.englishName}。${match.item.definition}`);
        span.dataset.glossary = match.item.term.toLowerCase();
        span.textContent = match.matchedText;
        fragment.append(span);
        cursor = match.index + match.item.term.length;
        match = findGlossaryMatch(text, cursor);
      }
      if (cursor < text.length) fragment.append(text.slice(cursor));
      textNode.replaceWith(fragment);
    });
  }

  function showGlossaryTooltip(termElement) {
    const item = glossaryByTerm.get(termElement.dataset.glossary);
    const tooltip = $('#glossary-tooltip');
    if (!item || !tooltip) return;
    tooltip.innerHTML = `<strong>${escapeHtml(item.term)}</strong><em>英文原名／全名：${escapeHtml(item.englishName)}</em><span>${escapeHtml(item.definition)}</span>`;
    tooltip.hidden = false;
    tooltip.classList.add('show');
    const rect = termElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const margin = 12;
    const idealLeft = rect.left + rect.width / 2 - tooltipRect.width / 2;
    const left = Math.min(window.innerWidth - tooltipRect.width - margin, Math.max(margin, idealLeft));
    const placeBelow = rect.top < tooltipRect.height + 22;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = placeBelow ? `${rect.bottom + 10}px` : `${rect.top - tooltipRect.height - 10}px`;
  }

  function hideGlossaryTooltip() {
    const tooltip = $('#glossary-tooltip');
    if (!tooltip) return;
    tooltip.classList.remove('show');
    tooltip.hidden = true;
  }

  const languageReplacements = [
    ['Senior Product Manager', '資深產品經理'],
    ['production-grade Agent architecture', '正式環境等級的 AI Agent 架構'],
    ['system/data architecture', '系統／資料架構'],
    ['System／Data', '系統／資料'],
    ['Context Assembly', '背景組裝'],
    ['permission-filtered', '經權限過濾'],
    ['vertical stories', '垂直使用者故事'],
    ['vertical WBS', '垂直切分 WBS'],
    ['role reviews', '角色審查'],
    ['local reviewer', '本機審查者'],
    ['domain understanding', '領域理解'],
    ['updated time', '更新時間'],
    ['append-only', '只新增、不覆寫'],
    ['Product Manager', '產品經理'],
    ['Product Lead', '產品主管'],
    ['3 PM＋2 Design', '3 位 PM＋2 位設計師'],
    ['3位PM＋2位Design', '3 位 PM＋2 位設計師'],
    ['Medium–Strong adjacent fit', '中高程度的相鄰經驗匹配'],
    ['platform craft', '平台產品能力'],
    ['production runtime', '正式環境的執行環境'],
    ['PM Cross-Review', 'PM Cross-Review'],
    ['re-review', '重新審查'],
    ['margin／liquidation risk', '保證金／強平風險'],
    ['margin engine', '保證金引擎'],
    ['Grid的margin／lifecycle', 'Grid 的保證金／生命週期'],
    ['體驗與 margin', '體驗與毛利'],
    ['refund 與 margin', '退款與毛利'],
    ['ACV or margin', '年度合約價值（ACV）或毛利'],
    ['trading bot', '交易機器人'],
    ['Data Lineage', '資料脈絡'],
    ['Data Minimization', '資料最小化'],
    ['State Machine', '狀態機'],
    ['Canonical Model', '標準資料模型'],
    ['Deterministic Matching', '確定性配對'],
    ['Idempotency Key', '冪等鍵'],
    ['Controlled Replay', '受控重播'],
    ['Graceful Degradation', '優雅降級'],
    ['Human Approval', '人工核准'],
    ['Human Gate', '人工關卡'],
    ['Bounded Autonomy', '受控自主性'],
    ['Prompt Injection', '提示注入'],
    ['Tool Calling', '工具呼叫'],
    ['Fine-tuning', '模型微調'],
    ['Definition of Ready', '就緒定義（DoR）'],
    ['Definition of Done', '完成定義（DoD）'],
    ['Acceptance Criteria', '驗收條件'],
    ['Backlog Refinement', '待辦事項梳理'],
    ['Sprint Planning', 'Sprint 規劃'],
    ['Scrum Board', 'Scrum 看板'],
    ['Sub-task', '子任務（Sub-task）'],
    ['Release Gate', '上線關卡'],
    ['Cross-tenant', '跨租戶'],
    ['Social CDP', '社群 CDP'],
    ['Telemetry', '遙測資料'],
    ['Suppression', '抑制'],
    ['Webhook', '事件通知（Webhook）'],
    ['Epic', '大型主題（Epic）'],
    ['Story', '使用者故事（Story）'],
    ['Task', '任務（Task）'],
    ['Why Omnichat', '為何選擇 Omnichat'],
    ['AI Agent', 'AI Agent'],
    ['direct Customer 360 production ownership', '顧客 360 正式環境責任的直接證據'],
    ['kill switch', '緊急停止開關'],
    ['DLQ age', 'DLQ 滯留時間'],
    ['before／after', '變更前／後'],
    ['planner／router', '規劃器／路由器'],
    ['entry condition', '進入條件'],
    ['event contract', '事件契約'],
    ['data model', '資料模型'],
    ['business outcome', '商業成果'],
    ['customer outcome', '顧客成果'],
    ['decision table', '決策表'],
    ['decision log', '決策紀錄'],
    ['service conversation', '客服對話'],
    ['user intent', '使用者意圖'],
    ['chain confirmation', '鏈上確認'],
    ['platform projection', '平台映射狀態'],
    ['smart contract', '智能合約'],
    ['Customer 360', '顧客 360'],
    ['Identity Resolution', '身份解析'],
    ['Source of Truth', '權威資料來源'],
    ['Unified Profile', '整合式顧客檔案'],
    ['product architecture', '產品架構'],
    ['system architecture', '系統架構'],
    ['data architecture', '資料架構'],
    ['version drift', '版本漂移'],
    ['schema drift', '資料結構漂移'],
    ['customer journey', '顧客旅程'],
    ['customer profile', '顧客檔案'],
    ['Identifier', '身份識別值'],
    ['Identity', '身份'],
    ['Profile', '顧客檔案'],
    ['Consent', '同意管理'],
    ['Segment', '客群'],
    ['Journey', '顧客旅程'],
    ['Observability', '可觀測性'],
    ['Reconciliation', '事件對帳'],
    ['Lineage', '資料脈絡'],
    ['Schema', '資料結構'],
    ['Tenant', '租戶'],
    ['Audit Log', '稽核紀錄'],
    ['Audit', '稽核'],
    ['production engineering ownership', '正式環境的工程實作責任'],
    ['production ownership', '正式環境的實作責任'],
    ['enterprise rollout', '企業級全面導入'],
    ['Technical Deep Dive', '技術深挖'],
    ['technical trade-off', '技術取捨'],
    ['Technical Collaboration', '技術協作'],
    ['Candidate Experience Deep Dive', '候選人經歷深挖'],
    ['Integration Reliability', '整合可靠性'],
    ['Failure Recovery', '失敗復原'],
    ['Agent Architecture', 'AI Agent 架構'],
    ['Evaluation／Safety', '評估／安全'],
    ['Agentic Workflow', 'AI Agent 工作流程'],
    ['System／Data Architecture', '系統／資料架構'],
    ['Observability／Recovery／Scale／Trade-off', '可觀測性／復原／規模／取捨'],
    ['RBAC／Consent／PII／Audit', 'RBAC／同意管理／PII／稽核'],
    ['Direct Evidence', '直接證據'],
    ['direct-domain fit', '直接領域經驗匹配'],
    ['direct CRM candidate', '具直接 CRM 經驗的候選人'],
    ['Senior scope', '資深職級責任範圍'],
    ['Source@version', '來源與版本'],
    ['Problem／Context', '問題／背景'],
    ['Scope＋Non-goal', '範圍＋非目標'],
    ['Role owner', '負責角色'],
    ['Release／Rollback', '發布／回滾'],
    ['approved artifacts', '已核准產物'],
    ['approved artifact', '已核准產物'],
    ['independent reviewer', '獨立審查者'],
    ['correction loop', '修正循環'],
    ['user approval gate', '使用者核准關卡'],
    ['artifact folders', '產物資料夾'],
    ['artifact manifest', '產物清單'],
    ['handoff contract', '交接契約'],
    ['decision boundary', '決策邊界'],
    ['customer-visible result', '顧客可見結果'],
    ['user-visible pending／failed', '使用者可見的待處理／失敗狀態'],
    ['operator visibility', '營運可見性'],
    ['operator recovery', '營運復原流程'],
    ['operator queue', '營運待處理佇列'],
    ['failure modes', '失敗模式'],
    ['failure mode', '失敗模式'],
    ['error path', '錯誤路徑'],
    ['happy path', '正常路徑'],
    ['review gate', '審查關卡'],
    ['launch gate', '上線關卡'],
    ['recovery boundary', '復原邊界'],
    ['recovery requirement', '復原需求'],
    ['recovery completion', '復原完成率'],
    ['recovery SLA', '復原服務水準'],
    ['reference architecture', '參考架構'],
    ['enterprise governance', '企業級治理'],
    ['enterprise SaaS commercial ownership', '企業級 SaaS 商業責任'],
    ['field-level authority', '欄位層級權威來源'],
    ['semantic diff', '語意差異比對'],
    ['least privilege', '最小權限'],
    ['PII minimization', '個資最小化'],
    ['high-impact', '高影響'],
    ['human decision', '人工決策'],
    ['re-approval', '重新核准'],
    ['release-ready', '可發布'],
    ['estimate by owner', '由負責角色估算'],
    ['no blocker', '無阻塞'],
    ['STALE_REVIEW_REQUIRED', '版本過期，需重新審查'],
    ['full sync', '完整同步'],
    ['rate limit', '流量限制'],
    ['golden dataset', '黃金測試資料集'],
    ['false-merge cost', '錯誤合併成本'],
    ['human review', '人工審查'],
    ['manual review', '人工審查'],
    ['manual termination', '手動終止'],
    ['manual action', '人工操作'],
    ['action-time recheck', '執行前重新檢查'],
    ['stable control', '穩定控制組'],
    ['treatment-control', '實驗組與控制組'],
    ['repeat-purchase difference', '重購率差異'],
    ['incremental contribution margin', '增量貢獻毛利'],
    ['Primary metric', '主要指標'],
    ['Primary', '主要'],
    ['Secondary', '次要'],
    ['Leading', '前導'],
    ['incrementality', '增量效果'],
    ['operational definition', '操作型定義'],
    ['data quality', '資料品質'],
    ['data-quality', '資料品質'],
    ['customer segment', '客群'],
    ['product line', '產品線'],
    ['shared platform capability', '共用平台能力'],
    ['shared capability', '共用能力'],
    ['product area owner', '產品領域負責人'],
    ['domain owner', '領域負責人'],
    ['business invariant', '業務不變條件'],
    ['unit economics', '單位經濟效益'],
    ['root cause', '根本原因'],
    ['blast radius', '影響範圍'],
    ['runbook', '操作手冊'],
    ['kill-switch', '緊急停止開關'],
    ['bounded retry', '有限次重試'],
    ['bounded AI', '受控 AI'],
    ['bounded automation', '受控自動化'],
    ['low-confidence', '低信心'],
    ['tool correctness', '工具呼叫正確性'],
    ['grounding', '依據一致性'],
    ['fallback', '備援處理'],
    ['timeout', '逾時'],
    ['latency', '延遲'],
    ['throughput', '處理量'],
    ['freshness', '資料新鮮度'],
    ['dedupe', '去重'],
    ['duplicate', '重複'],
    ['unauthorized action', '未授權動作'],
    ['stuck state', '卡住狀態'],
    ['correlation ID', '關聯識別碼'],
    ['occurred_at', '事件發生時間'],
    ['display name', '顯示名稱'],
    ['shared phone', '共用電話'],
    ['remediation', '修正處理'],
    ['normalize', '格式標準化'],
    ['conflict check', '衝突檢查'],
    ['reversible', '可逆'],
    ['irreversible change', '不可逆變更'],
    ['in-flight work', '執行中的工作'],
    ['write-back', '回寫'],
    ['technical design', '技術設計'],
    ['technical review', '技術審查'],
    ['implementation quality', '實作品質'],
    ['implementation', '實作'],
    ['engineering build', '工程建置'],
    ['Engineering', '工程團隊'],
    ['Product Case', '產品案例'],
    ['Story Bank', '案例庫'],
    ['Question Bank', '題庫'],
    ['Quick Review', '快速複習'],
    ['Role Scorecard', '職位評估'],
    ['Domain Brief', '領域速讀'],
    ['Evidence Mapping', '證據映射'],
    ['Global Search', '全文搜尋'],
    ['Your Questions', '反問題庫'],
    ['Practice', '練習'],
    ['READY', '已備妥'],
    ['DEMONSTRATED', '已實證'],
    ['PROPOSED', '規劃中（PROPOSED）', true],
    ['UNKNOWN', '待確認（UNKNOWN）', true],
    ['HOLD', '保留（HOLD）', true],
    ['DIRECT', '直接證據（DIRECT）', true],
    ['INFERENCE', '推論（INFERENCE）', true],
    ['RECOMMENDATION', '建議（RECOMMENDATION）', true],
    ['proposed', '規劃中', true],
    ['Unknown', '待確認', true],
    ['direct', '直接', true],
    ['inference', '推論', true],
    ['recommendation', '建議', true],
    ['ownership', '責任範圍'],
    ['owner', '負責角色'],
    ['handoff', '交接'],
    ['rollout', '分階段上線'],
    ['guardrails', '風險護欄'],
    ['guardrail', '風險護欄'],
    ['trade-off', '取捨'],
    ['scope', '範圍'],
    ['non-goal', '非目標'],
    ['dependencies', '依賴'],
    ['dependency', '依賴'],
    ['estimate', '估算'],
    ['risk', '風險'],
    ['release', '發布'],
    ['state', '狀態'],
    ['failure', '失敗'],
    ['recovery', '復原'],
    ['requirements', '需求'],
    ['requirement', '需求'],
    ['workflow', '工作流程'],
    ['approval', '審批'],
    ['reviewer', '審查者'],
    ['review', '審查'],
    ['evidence', '證據'],
    ['production', '正式環境'],
    ['enterprise', '企業級'],
    ['metrics', '指標'],
    ['metric', '指標'],
    ['baseline', '基準值'],
    ['threshold', '門檻'],
    ['sample', '樣本數'],
    ['duration', '實驗期間'],
    ['quality', '品質'],
    ['cost', '成本'],
    ['adoption', '採用率'],
    ['cycle-time', '交付週期'],
    ['operator', '營運人員'],
    ['queue', '待處理佇列'],
    ['module', '模組'],
    ['roadmap', '路線圖'],
    ['domain', '領域'],
    ['provider', '服務商'],
    ['merge', '合併'],
    ['split', '拆分'],
    ['incident', '事故'],
    ['claim', '主張'],
    ['role', '角色'],
    ['artifact', '產物'],
    ['gate', '關卡'],
    ['Gap', '缺口'],
    ['action', '動作'],
    ['tool', '工具'],
    ['event', '事件'],
    ['contract', '契約'],
    ['decision', '決策'],
    ['version', '版本'],
    ['customer', '顧客'],
    ['authority', '權威來源'],
    ['permission', '權限'],
    ['model', '模型'],
    ['channel', '渠道'],
    ['outcome', '成果'],
    ['retry', '重試'],
    ['data', '資料'],
    ['policy', '政策'],
    ['business', '商業'],
    ['source', '來源'],
    ['migration', '遷移'],
    ['eligibility', '資格'],
    ['deterministic', '確定性規則'],
    ['purpose', '目的'],
    ['trace', '追蹤紀錄'],
    ['write', '寫入'],
    ['integration', '整合'],
    ['order', '訂單'],
    ['options', '選項'],
    ['manual', '人工'],
    ['request', '請求'],
    ['harm', '傷害'],
    ['rollback', '回滾'],
    ['access', '存取'],
    ['rule', '規則'],
    ['conflict', '衝突'],
    ['read', '讀取'],
    ['exception', '例外'],
    ['object', '物件'],
    ['delivery', '交付'],
    ['architecture', '架構'],
    ['shared', '共用'],
    ['market', '市場'],
    ['reason', '原因'],
    ['replay', '重播'],
    ['pause', '暫停'],
    ['human', '人工'],
    ['draft', '草稿'],
    ['cache', '快取'],
    ['consistency', '一致性'],
    ['Board', '看板'],
    ['callback', '回呼'],
    ['feedback', '回饋'],
    ['flow', '流程'],
    ['problem', '問題'],
    ['impact', '影響'],
    ['value', '價值'],
    ['trigger', '觸發'],
    ['refund', '退款'],
    ['stale', '過期'],
    ['product', '產品'],
    ['actor', '角色'],
    ['context', '背景'],
    ['intent', '意圖'],
    ['peer', '同儕'],
    ['Design', '設計'],
    ['case', '案例'],
    ['service', '服務'],
    ['staged', '分階段'],
    ['cadence', '節奏'],
    ['plan', '計畫'],
    ['test', '測試'],
    ['idempotency', '冪等性'],
    ['pending', '待處理'],
    ['error', '錯誤'],
    ['success', '成功'],
    ['admin', '後台管理'],
    ['auth', '驗證'],
    ['raw', '原始'],
    ['volume', '量體'],
    ['time', '時間'],
    ['fail', '失敗'],
    ['closed', '已關閉'],
    ['map', '映射'],
    ['cases', '案例'],
    ['enrollment', '進入旅程'],
    ['before', '之前'],
    ['after', '之後'],
    ['signature', '簽章'],
    ['retention', '留存'],
    ['expiry', '到期'],
    ['query', '查詢'],
    ['export', '匯出'],
    ['publish', '發布'],
    ['retrieval', '檢索'],
    ['security', '安全'],
    ['approved', '已核准'],
    ['planner', '規劃器'],
    ['validation', '驗證'],
    ['acceptance', '驗收'],
    ['coverage', '覆蓋範圍'],
    ['ticket', '工作票'],
    ['wallet', '錢包'],
    ['account', '帳戶'],
    ['platform', '平台'],
    ['Why', '為何'],
    ['common', '常見'],
    ['Custom', '客製'],
    ['Productization', '產品化'],
    ['invariant', '不變條件'],
    ['content', '內容'],
    ['flag', '標記'],
    ['Prioritization', '優先排序'],
    ['capacity', '產能'],
    ['boundary', '邊界'],
    ['reopen', '重新開啟'],
    ['strong', '強'],
    ['internal', '內部'],
    ['evaluation', '評估'],
    ['commerce', '電商'],
    ['reconcile', '對帳'],
    ['communicate', '溝通'],
    ['constraints', '限制'],
    ['Stakeholder', '利害關係人'],
    ['trust', '信任'],
    ['projection', '映射'],
    ['scale', '規模'],
    ['brand', '品牌'],
    ['backfill', '回填'],
    ['entry', '進入條件'],
    ['Sales', '業務'],
    ['redrive', '重新投遞'],
    ['result', '結果'],
    ['approver', '審批者'],
    ['call', '呼叫'],
    ['alert', '告警'],
    ['mismatch', '不一致'],
    ['allowlist', '允許清單'],
    ['support', '支援'],
    ['knowledge', '知識'],
    ['partition', '分區'],
    ['tier', '層級'],
    ['operations', '營運'],
    ['exposure', '曝險'],
    ['tickets', '工作票'],
    ['conversion', '轉換率'],
    ['on-chain', '鏈上'],
    ['off-chain', '鏈下'],
    ['regulator', '監管機關'],
    ['vendor', '供應商'],
    ['Senior', '資深'],
    ['seniority', '職級'],
    ['expert', '專家'],
    ['single', '單一'],
    ['based', '基於'],
    ['economics', '經濟效益'],
    ['workaround', '替代方案'],
    ['configuration', '設定'],
    ['extension', '擴充'],
    ['commercial', '商業'],
    ['default', '預設'],
    ['behavior', '行為'],
    ['feature', '功能'],
    ['multi', '多重'],
    ['problems', '問題'],
    ['governance', '治理'],
    ['confidence', '信心'],
    ['effort', '工作量'],
    ['strategic', '策略'],
    ['reduction', '降低'],
    ['wrong-person', '誤認身份'],
    ['message', '訊息'],
    ['unauthorized', '未授權'],
    ['send', '發送'],
    ['constraint', '限制'],
    ['learning', '學習'],
    ['escaped', '遺漏'],
    ['compatibility', '相容性'],
    ['consumer', '消費端'],
    ['change', '變更'],
    ['payment', '付款'],
    ['reject', '拒絕'],
    ['cancel', '取消'],
    ['accepted', '已接受'],
    ['paid', '已付款'],
    ['completed', '已完成'],
    ['Agent', 'AI Agent'],
    ['propagation', '傳遞規則'],
    ['boolean', '布林值'],
    ['ingestion', '資料匯入'],
    ['executor', '執行器'],
    ['control', '控制'],
    ['component', '元件'],
    ['stack', '技術棧'],
    ['tools', '工具'],
    ['versioned', '具版本控管'],
    ['gateway', '閘道'],
    ['groundedness', '依據一致性'],
    ['eval', '評估'],
    ['measurement', '衡量方案'],
    ['Skills', '技能檔'],
    ['local', '本機'],
    ['automation', '自動化'],
    ['reviews', '審查'],
    ['actual', '實際'],
  ].map(([term, replacement, caseSensitive = false]) => ({ term, replacement, caseSensitive }));

  const sortedLanguageReplacements = [...languageReplacements].sort((a, b) => b.term.length - a.term.length);

  function findLanguageMatch(text, fromIndex = 0) {
    const lower = text.toLowerCase();
    let best = null;
    sortedLanguageReplacements.forEach((item) => {
      const haystack = item.caseSensitive ? text : lower;
      const needle = item.caseSensitive ? item.term : item.term.toLowerCase();
      let index = haystack.indexOf(needle, fromIndex);
      while (index >= 0 && isAsciiWord(item.term)) {
        const before = text[index - 1] || '';
        const after = text[index + item.term.length] || '';
        if (!/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after)) break;
        index = haystack.indexOf(needle, index + 1);
      }
      if (index < 0) return;
      if (!best || index < best.index || (index === best.index && item.term.length > best.item.term.length)) {
        best = { index, item };
      }
    });
    return best;
  }

  function localizeText(value = '') {
    const localizeSegment = (text) => {
      let output = '';
      let cursor = 0;
      let match = findLanguageMatch(text, cursor);
      while (match) {
        output += text.slice(cursor, match.index) + match.item.replacement;
        cursor = match.index + match.item.term.length;
        match = findLanguageMatch(text, cursor);
      }
      return (output + text.slice(cursor))
        .replace(/([\u3400-\u9fff])\s+(?=[\u3400-\u9fff])/g, '$1')
        .replace(/([\u3400-\u9fff])\s+([，。；：！？、）])/g, '$1$2')
        .replace(/（\s+/g, '（')
        .replace(/\s+）/g, '）')
        .replace(/）\s+(?=[\u3400-\u9fff])/g, '）');
    };
    return String(value).split(/(`[^`]*`)/g).map((segment) => {
      if (!(segment.startsWith('`') && segment.endsWith('`'))) return localizeSegment(segment);
      const inner = segment.slice(1, -1);
      const isIdentifier = /^[A-Za-z_][A-Za-z0-9_.@/-]*$/.test(inner);
      return isIdentifier ? segment : `\`${localizeSegment(inner)}\``;
    }).join('');
  }

  function localizeVisibleText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) continue;
      if (parent.closest('script, style, code, kbd, textarea, input, .glossary-term')) continue;
      nodes.push(node);
    }
    nodes.forEach((textNode) => { textNode.nodeValue = localizeText(textNode.nodeValue); });
    $$('[data-copy]').forEach((button) => { button.dataset.copy = localizeText(button.dataset.copy); });
    $$('input[placeholder], textarea[placeholder]').forEach((field) => {
      field.placeholder = localizeText(field.placeholder);
    });
  }

  const caseOralScript = `這題我會分五步回答。先說明，這是我針對 Omnichat 情境設計的方案，不是我過去曾經上線的 CRM／CDP 案例。

第一步，我會先把問題定義清楚。我們不是單純想提高訊息點擊，而是要確認：對可以合法聯繫的首購顧客，首購後的服務和補貨提醒，能不能真的增加 90 天內的回購，同時不增加退訂、投訴或不必要的折扣成本。

第二步是確認資料是否可信。我會以品牌會員資料作為身份基礎，再連結 LINE Login 或 WhatsApp 的渠道識別；購買與退款紀錄則由既有電商訂單系統和門市 POS 提供。這些資料可以形成統一顧客視圖，但不代表全部塞進同一張表。會員、訂單、渠道狀態各有自己的權威來源；如果身份或聯繫同意有衝突，我會先停止聯繫，而不是猜測顧客是誰。

第三步才是設計顧客旅程。符合資格的首購顧客進入後，先提供使用或售後服務，不急著促銷。到了合理的補貨時間，系統再檢查他是否已經回購、是否仍同意聯繫、商品是否有庫存，以及近期是否收到太多訊息；條件都成立才提醒一次。只要顧客已回購、退訂或有未處理的投訴，就立即退出旅程。

第四步是 AI 的角色。我不會讓 AI 自己決定要聯繫誰。只有顧客主動回覆後，AI 才使用核准的商品與訂單資訊協助回答；它不能改身份、改同意狀態、改價格、發優惠券、下單或退款。遇到資料衝突、低信心、投訴或顧客要求真人時，就連同來源和對話紀錄一起交給客服。

最後是驗證。我會在顧客進入時固定分成實驗組和控制組，比較兩組 90 天回購率的差異，而不是只看開信或點擊；同時觀察毛利、退訂、投訴、錯誤身份、未授權發送和客服負荷。實際基準值、樣本數與測試期間都必須用品牌真實資料計算，不在面試案例裡假設數字。

因此我會先從一個市場、一個補貨品類和一個主要渠道做小規模驗證。只有回購與毛利改善，而且隱私、體驗和客服負荷都在安全範圍內，才逐步擴大。這個方案的核心不是讓 AI 多發訊息，而是先把身份、聯繫權限、退出條件和衡量方式設計正確。`;

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
      answer: caseOralScript,
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
      ['Unified Profile', '會員主檔是身份基礎；LINE Login 與 WhatsApp 是渠道識別；電商訂單系統與 POS 提供交易資料；再加上 Consent。MVP 採 deterministic matching，衝突時 suppression。', '系統分層是 Case 設計；實際客戶資料模型與 Source of Truth 為 Unknown。'],
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
      <div class="section-heading-row"><h2>可直接口說｜3 分鐘完整版本</h2><p>先說這是假設案例，再依決策、資料、Journey、AI、衡量與上線順序回答。</p></div>
      <div class="callout answer-script" data-search="${escapeHtml(caseOralScript)}">
        ${caseOralScript.split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
        <div class="boundary-detail evidence-note"><strong>證據邊界：</strong>這是 demonstrated product-thinking workflow，不是你曾完成 Omnichat、CRM／CDP、特定電商或 POS 串接，也不是企業級 AI production rollout 的證明。</div>
      </div>
      <div class="callout"><p><strong>收尾句：</strong>重點不是讓 AI 多發訊息，而是先確認顧客是誰、是否可以聯繫、目前處在旅程的哪個狀態，以及什麼情況必須停止；AI 只在有權限、有可靠來源且可以轉真人的情況下協助對話。</p></div>
      <div class="answer-actions">
        <button class="primary-button start-script" data-seconds="180">開始 03:00 Case 練習</button>
        <button class="copy-button" data-copy="${escapeHtml(caseOralScript)}">複製完整口述稿</button>
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
    const agentSkillOral = '我目前對 AI 代理人、技能規範和 LLM 的實作理解，主要來自產品開發工作流程。AI 代理人是負責執行任務的角色，技能規範是它的工作說明，包含步驟、輸入輸出、品質條件與禁止事項。技能規範不會自己呼叫 LLM，而是由執行環境把使用者需求、技能規範和已核准產物組成上下文，再交給 LLM 產生結果。我最早在奇換橘子使用 Visual Studio Code 搭配 Gemini API，把產品流程拆成產品經理、UI／UX 與前端工程三種角色，以 PRD、線框稿與互動原型作為跨階段產物，並經人工確認後才能交接。後來我把這個方式重構成 Codex Agentic Workflow，加入角色登錄表、任務契約、交接契約、產物清單、狀態機與獨立審查者。我的重點不是讓代理人完全自主，而是讓它在清楚的資料、角色、狀態和人工關卡中工作。';
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
      <div class="section-heading-row"><h2>AI 代理人、技能規範與 LLM 怎麼協作</h2><p>先說清楚角色，再用你實際建立的產品工作流程說明。</p></div>
      <div class="flow" aria-label="AI 代理人、技能規範與 LLM 協作流程">
        ${flowStep('使用者需求', '目標／限制／驗收')}
        <span class="flow-arrow">→</span>${flowStep('任務協調器', '判斷階段與角色')}
        <span class="flow-arrow">→</span>${flowStep('AI 代理人＋技能規範', '上下文組裝／工具邊界')}
        <span class="flow-arrow">→</span>${flowStep('LLM', '理解／推理／產生')}
        <span class="flow-arrow">→</span>${flowStep('驗證與審查', '實際產物／證據／gate')}
        <span class="flow-arrow">→</span>${flowStep('狀態與交接', '登錄／更新／下一角色')}
      </div>
      <div class="callout" data-search="AI Agent Skill LLM Gemini Codex 口述">
        <p><strong>60–90 秒口述：</strong>${escapeHtml(agentSkillOral)}</p>
        <div class="question-actions"><button class="copy-button" data-copy="${escapeHtml(agentSkillOral)}">複製口述回答</button></div>
        <div class="boundary-detail evidence-note"><strong>證據邊界：</strong>Gemini API 為使用者確認，repo 無 runtime log；本案例不使用 RAG implementation 作為經驗錨點，也不主張自建 LLM runtime、Agent 間自主網路通訊或企業級 rollout。</div>
      </div>
      <div class="split-panel"><div><p class="section-label">DEMONSTRATED</p><h3>可直接證明</h3><ul><li>產品經理／UIUX／前端角色型技能規範與固定產物資料夾。</li><li>跨階段使用者核准關卡。</li><li>個人延伸的角色登錄表、交接契約、狀態、產物清單與獨立審查修正循環。</li></ul></div><div class="risk"><p class="section-label">PROPOSED／HOLD</p><h3>不可說成已落地</h3><ul><li>Scrum Board API 寫回與企業級 RBAC／PII 治理。</li><li>正式環境的版本漂移告警、可觀測性與組織全面導入。</li><li>週期時間、品質、採用率或 ROI 改善數字。</li></ul></div></div>
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
    localizeVisibleText(document.body);
    annotateGlossary($('.content-wrap'));
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
    const storyItems = data.stories.map((story) => ({ type: '故事', chapter: 'stories', title: localizeText(`${story.id}｜${story.title}`), excerpt: localizeText(story.answer) }));
    const questionItems = data.questions.map((question) => ({ type: `PM 題庫 ${question.categoryKey}`, chapter: 'questions', title: localizeText(`Q${question.number}｜${question.title}`), excerpt: localizeText(question.answer) }));
    const ctoQuestionItems = data.ctoQuestions.map((question) => ({ type: `CTO 題庫 ${question.categoryKey}`, chapter: 'cto-questions', title: localizeText(`Q${question.number}｜${question.title}`), excerpt: localizeText(question.answer) }));
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
    document.addEventListener('mouseover', (event) => {
      const term = event.target.closest('.glossary-term');
      if (term) showGlossaryTooltip(term);
    });
    document.addEventListener('mouseout', (event) => {
      const term = event.target.closest('.glossary-term');
      if (term && !term.contains(event.relatedTarget)) hideGlossaryTooltip();
    });
    document.addEventListener('focusin', (event) => {
      const term = event.target.closest('.glossary-term');
      if (term) showGlossaryTooltip(term);
    });
    document.addEventListener('focusout', (event) => {
      const term = event.target.closest('.glossary-term');
      if (term) hideGlossaryTooltip();
    });

    document.addEventListener('click', (event) => {
      const glossaryTerm = event.target.closest('.glossary-term');
      if (glossaryTerm) {
        glossaryTerm.focus();
        showGlossaryTooltip(glossaryTerm);
      } else hideGlossaryTooltip();

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
      if (event.key === 'Escape') {
        if (document.activeElement?.classList.contains('glossary-term')) document.activeElement.blur();
        hideGlossaryTooltip();
        closeSidebar();
      }
    });
    window.addEventListener('scroll', hideGlossaryTooltip, true);
    window.addEventListener('resize', hideGlossaryTooltip);
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
