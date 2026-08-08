(() => {
  const chineseTitles = {
    'pb-intro': '完整手冊定位與使用原則',
    'st-intro': '本輪面試定位與資料來源',
    'st-0': '這一輪真正要證明什麼',
    'st-1': '六十分鐘可能流程',
    'st-8': '面試前四天口說與追問練習',
    'pb-8': '面試前三十分鐘檢查清單',
    'pb-0': '一頁結論',
    'pb-1': '角色需求拆解與證據對照',
    'st-2': '六十秒自我介紹',
    'pb-2': '招募面談實戰腳本',
    'st-3-1': '損益資料、成本價與頁面迭代',
    'st-3-2': '錢包應用程式全頁體驗優化',
    'st-3-3': '全量對帳與流水處理',
    'st-3-4': '充值與提現頁面優化',
    'st-3-5': '錢包風險與法遵需求對接',
    'pb-4-1': '你會如何設計帳戶總覽？',
    'pb-4-2': '你會如何定義「今日損益」？',
    'pb-4-3': '跨帳戶損益最容易錯在哪裡？',
    'pb-4-4': '你會如何設計交易紀錄？',
    'pb-4-5': '使用者說「餘額或損益不對」，你如何處理？',
    'pb-4-6': '你如何與資料團隊對齊？',
    'pb-4-7': '資料新鮮度與正確性衝突時怎麼取捨？',
    'pb-4-8': '如何安全上線損益定義或彙總改版？',
    'pb-4-9': '資產模組應看哪些指標？',
    'pb-4-10': '如果要改善資產總覽，你如何找優先級？',
    'pb-4-11': '白板題：帳戶總覽資料流程',
    'st-4': '五項任務的優先排序',
    'pb-3-1': '情境案例一｜四個月完成交易所從零到一上線',
    'pb-3-2': '情境案例二｜把資產頁當成資料產品',
    'pb-3-3': '情境案例三｜法幣與加密貨幣定價及路由',
    'pb-3-4': '情境案例四｜保留負責人並降低單點盲區',
    'pb-3-5': '備用案例｜期貨網格的狀態、保證金與風險',
    'st-5': '領導與交付題',
    'pb-5': '文化適配題',
    'st-6': '前次面試經驗的硬性提醒',
    'st-7': '英文切換練習',
    'st-10': '面試當天十分鐘速查表',
    'st-9': '對本輪面試官的反問',
    'pb-6': '後續主管與小組面談反問',
    'pb-7': '合約、職級與工作型態確認清單',
    'st-11': '面試後立即記錄',
    'pb-9': '面試後紀錄模板'
  };

  const phaseTitles = [
    '本輪策略與面試前準備',
    '開場、定位與角色適配',
    '資產、損益與錢包產品題',
    '對帳、資料治理與技術題',
    '情境案例、領導與文化',
    '英文切換、表達與避雷',
    '反問、合約與面試後'
  ];

  const phaseById = new Map([
    [['pb-intro', 'st-intro', 'st-0', 'st-1', 'st-8', 'pb-8'], phaseTitles[0]],
    [['pb-0', 'pb-1', 'st-2', 'pb-2'], phaseTitles[1]],
    [['st-3-1', 'st-3-2', 'st-3-3', 'st-3-4', 'st-3-5', 'pb-4-1', 'pb-4-2', 'pb-4-3', 'pb-4-4'], phaseTitles[2]],
    [['pb-4-5', 'pb-4-6', 'pb-4-7', 'pb-4-8', 'pb-4-9', 'pb-4-10', 'pb-4-11', 'st-4'], phaseTitles[3]],
    [['pb-3-1', 'pb-3-2', 'pb-3-3', 'pb-3-4', 'pb-3-5', 'st-5', 'pb-5'], phaseTitles[4]],
    [['st-6', 'st-7', 'st-10'], phaseTitles[5]],
    [['st-9', 'pb-6', 'pb-7', 'st-11', 'pb-9'], phaseTitles[6]]
  ].flatMap(([ids, phase]) => ids.map((id) => [id, phase])));

  const answers = {
    'pb-intro': {
      zh: '這份手冊用來準備招募、主管與跨部門面試。先練短答，再讀研究資料。回答時只說有證據支持的經驗；不知道的內容要直接說明，並提出確認方法。',
      en: 'This guide prepares you for recruiter, hiring-manager, and cross-functional interviews. Practice the short answers first, then review the research. Use only evidence-backed experience. When something is unknown, say so clearly and explain how you would verify it.'
    },
    'st-intro': {
      zh: '這一輪的重點是讓面試官快速確認三件事：我的經驗是否貼近職務、我能否清楚處理資產資料問題，以及我是否誠實面對未知。',
      en: 'The goal of this round is to help the interviewer confirm three things quickly: whether my experience matches the role, whether I can handle asset-data problems clearly, and whether I am honest about unknowns.'
    },
    'st-0': {
      zh: '我需要證明自己能把複雜的帳戶、資產與風險問題，整理成清楚的產品決策。我也要分開說明自己的產品責任、工程責任與尚未確認的幣安內部做法。',
      en: 'I need to show that I can turn complex account, asset, and risk problems into clear product decisions. I must also separate my product ownership, engineering ownership, and any Binance-specific practice that has not been confirmed.'
    },
    'st-1': {
      zh: '前十分鐘先用短句建立經驗對照。中段用兩個最相關的案例回答技術與協作問題。最後留下時間確認職務範圍、團隊期待與下一步。',
      en: 'Use the first ten minutes to establish the experience match with concise answers. Use two relevant cases for the technical and collaboration questions. Leave time at the end to confirm the role scope, team expectations, and next steps.'
    },
    'st-8': {
      zh: '四天練習的順序很簡單：先把中文答案說順，再練英文；接著壓縮長句，最後用追問測試證據邊界。每次只修一個問題，避免臨時重寫整套答案。',
      en: 'Use a simple four-day practice sequence: make the Chinese answer natural first, then practice the English version. Shorten long sentences next, and test evidence boundaries with follow-up questions. Fix one problem at a time instead of rewriting everything at the last minute.'
    },
    'pb-8': {
      zh: '面試前只確認必要事項：鏡頭、聲音、履歷、職務說明、三個核心案例與要問的問題。最後三十分鐘不要再加入新的故事或數字。',
      en: 'Before the interview, check only the essentials: camera, audio, résumé, job description, three core examples, and your questions. Do not add new stories or numbers during the final thirty minutes.'
    },
    'pb-0': {
      zh: '我的定位是有交易所、帳戶、錢包與風險經驗的產品負責人。最相關的證據是四個月完成交易所平台從零到一上線，以及資產快照、估值、對帳與充提需求。大型資料平台的工程實作不是我的直接責任。',
      en: 'My positioning is a product lead with experience in exchanges, accounts, wallets, and risk controls. My strongest evidence is a four-month exchange launch and work on asset snapshots, valuation, reconciliation, deposits, and withdrawals. I did not directly own the engineering implementation of a large-scale data platform.'
    },
    'pb-1': {
      zh: '職務最看重資產體驗、損益、對帳、充提與跨團隊交付。我的直接證據涵蓋產品定義、帳戶規則、資產快照、估值與風險需求。幣安的內部架構、資料規模與政策仍需向團隊確認。',
      en: 'The role emphasizes asset experience, profit and loss, reconciliation, deposits and withdrawals, and cross-functional delivery. My direct evidence covers product definitions, account rules, asset snapshots, valuation, and risk requirements. Binance’s internal architecture, data scale, and policies still need to be confirmed with the team.'
    },
    'st-2': {
      zh: '我有約十年產品管理經驗，近年專注在交易所、資產帳戶與風險控制。我曾帶領三位產品經理和兩位設計師，與跨區團隊在四個月內完成交易所平台上線。我負責產品架構、帳戶規則與跨團隊對齊；工程團隊負責技術實作。',
      en: 'I have around ten years of product management experience, with a recent focus on exchanges, asset accounts, and risk controls. I led three product managers and two designers and worked with a cross-regional team to launch an exchange platform in four months. I owned the product structure, account rules, and cross-functional alignment, while engineering owned the implementation.'
    },
    'pb-2': {
      zh: '招募面談要直接回答動機、轉職原因、合約意願與經驗缺口。我的離職原因是組織調整與人力縮編，不是主動離職。對合約職缺保持開放，但要確認期限、續約條件、雇用主與福利。',
      en: 'The recruiter screen should address motivation, departure reason, contract interest, and experience gaps directly. I left because of an organizational adjustment and headcount reduction, not a voluntary resignation. I am open to a contract role, but I need to confirm its length, renewal criteria, employing entity, and benefits.'
    },
    'st-3-1': {
      zh: '我會先定義損益範圍，再談資料與畫面。先確認包含哪些帳戶與資產，再定義成本、價格、費用、轉帳與重算規則。最後用正常案例和例外案例，讓產品、資料與工程用同一套標準驗收。',
      en: 'I would define the profit-and-loss scope before discussing data or screens. First, confirm the included accounts and assets. Then define cost, price, fees, transfers, and recalculation rules. Finally, use normal and edge cases so product, data, and engineering validate the same standard.'
    },
    'st-3-2': {
      zh: '我不會一開始就做視覺改版。我會先找出錯誤餘額、錯誤狀態與被卡住的資金操作，再處理理解困難和視覺一致性。每個流程都要有載入、等待、失敗、受限與恢復狀態。',
      en: 'I would not start with a visual redesign. I would first address wrong balances, wrong statuses, and blocked money movement, then improve comprehension and visual consistency. Every journey needs loading, pending, failed, restricted, and recovery states.'
    },
    'st-3-3': {
      zh: '我會先確認每條業務線要比對什麼、誰負責，以及什麼情況才算一致。接著統一識別方式、時間、狀態與平衡規則。差異要分類、指派負責人並設定處理時限，再從高風險且邊界清楚的範圍逐步擴大。',
      en: 'I would first confirm what each business line reconciles, who owns it, and what counts as a match. Next, align identifiers, time, states, and balance rules. Classify differences, assign owners and response times, then expand from a high-risk but well-bounded area.'
    },
    'st-3-4': {
      zh: '充提優化的重點不是少一個步驟，而是避免不可逆的錯誤。我會優先處理幣種與網路選擇、地址驗證、可用餘額、費用、限額和安全檢查。等待或人工審查時，使用者要知道發生什麼、要做什麼，以及何時能求助。',
      en: 'Deposit and withdrawal optimization is not simply about removing a step. It is about preventing irreversible mistakes. I would prioritize asset and network selection, address validation, available balance, fees, limits, and security checks. During a pending or manual-review state, users should know what happened, what to do, and when to ask for help.'
    },
    'st-3-5': {
      zh: '產品經理不應自行解釋或放寬法規。我會確認政策來源、版本、適用對象、觸發條件與決策負責人，再把政策轉成可測試的產品狀態。使用者要知道下一步，但不能看到可能被規避的控制細節。',
      en: 'A product manager should not interpret or weaken regulation independently. I would confirm the policy source, version, affected users, triggers, and decision owner, then convert the policy into testable product states. Users need a clear next step without seeing control details that could be bypassed.'
    },
    'pb-4-1': {
      zh: '帳戶總覽要讓使用者快速回答三個問題：我有多少資產、資產在哪裡、數字何時更新。我會先定義納入總額的帳戶，再區分可用、鎖定、等待與負債。不同資產要用一致的價格來源和時間換算，內部轉帳也不能重複計算。',
      en: 'An account overview should help users answer three questions quickly: how much they have, where the assets are, and when the numbers were updated. I would define the accounts included in the total, separate available, locked, pending, and liability balances, use consistent prices and timestamps, and prevent double counting from internal transfers.'
    },
    'pb-4-2': {
      zh: '我會先定義計算範圍、起訖時間與外部資金流，再決定成本、價格、費用、獎勵和修正如何處理。畫面不能只顯示一個數字，也要讓使用者看懂期間、帳戶範圍、組成與資料更新時間。',
      en: 'I would first define the calculation scope, start and end times, and external cash flows. Then I would define how cost, price, fees, rewards, and corrections are handled. The screen should explain the period, account scope, components, and data freshness instead of showing only one number.'
    },
    'pb-4-3': {
      zh: '跨帳戶損益最容易因內部轉帳、快照時間、負債估值、費用分類與價格時間不一致而出錯。我會建立帳戶與計算項目的對照表，清楚標示資料來源、定義、時間、負責人與對帳規則。',
      en: 'Cross-account profit and loss often fails because of internal transfers, inconsistent snapshot times, liability valuation, fee classification, or price timestamps. I would build an account-by-component matrix that identifies the source, definition, time, owner, and reconciliation rule for every item.'
    },
    'pb-4-4': {
      zh: '交易紀錄不能把訂單、成交、轉帳、帳務分錄與充提全部當成同一物件。每筆紀錄要有穩定識別碼、類型、金額、費用、帳戶、狀態與時間，並保留更正和沖正的完整歷史。畫面和匯出資料也必須使用同一套定義。',
      en: 'A transaction record should not treat orders, trades, transfers, ledger entries, deposits, and withdrawals as the same object. Each record needs stable identifiers, type, amount, fee, account, status, and time, with a complete history of corrections and reversals. The user interface and exports must use the same definitions.'
    },
    'pb-4-5': {
      zh: '我會先確認影響範圍：問題是單一使用者、帳戶、資產或地區，還是整體系統；問題出在畫面顯示、資產估值、事件延遲，還是帳務資料不一致。接著避免使用者繼續依賴錯誤數字，再逐層比對資料來源、計算與畫面。修正後要驗證受影響對象，並留下監控、對帳與重算紀錄。',
      en: 'I would first confirm the blast radius: whether the issue affects one user, account, asset, or region, or the whole system; and whether it is a display problem, valuation problem, event delay, or ledger mismatch. Next, I would stop users from relying on the wrong number and compare the source data, calculations, and user interface layer by layer. After the fix, I would validate the affected cohort and retain monitoring, reconciliation, and restatement records.'
    },
    'pb-4-6': {
      zh: '我會先和資料團隊對齊商業定義，不會直接指定技術工具。每個欄位都要說清楚用途、計算粒度、資料來源、納入規則、時間、幣別、完整性與更新頻率。產品負責使用者與商業定義，資料和工程負責技術設計與效能。',
      en: 'I would align the business definition with the data team before specifying technical tools. Every field needs a clear purpose, grain, source, inclusion rule, time, currency, completeness standard, and freshness target. Product owns the user and business definition, while data and engineering own the technical design and performance.'
    },
    'pb-4-7': {
      zh: '新鮮度和正確性衝突時，要先看使用者傷害。可提領餘額不能用分析資料代替權威帳務資料；資產估值可以短暫延遲，但必須標示更新時間；歷史報表可以較晚完成，但要能重算並保留版本。',
      en: 'When freshness and accuracy conflict, start with potential user harm. Withdrawable balances must come from an authoritative ledger service, not an analytics summary. Portfolio estimates may be delayed briefly if the timestamp is clear. Historical reports may finish later, but they must be reproducible and versioned.'
    },
    'pb-4-8': {
      zh: '損益定義改版要先保留新舊版本並平行計算，不要直接改使用者結果。先用標準案例和歷史資料比對，再從內部使用者、小群體到分階段發布。上線前要定義監控、暫停與回復權限。',
      en: 'A profit-and-loss definition change should keep old and new versions and run them in parallel before changing user results. Compare standard cases and historical data, then move from internal users to a small cohort and a phased rollout. Define monitoring, pause, and rollback authority before release.'
    },
    'pb-4-9': {
      zh: '資產模組不能只看點擊或轉換。主要結果是使用者能否理解總資產、帳戶分布、損益組成與交易狀態。保護指標要包含對帳差異、資料完整性、更新時間、價格涵蓋、錯誤率與客服量。基準和目標必須用內部資料確認。',
      en: 'An asset module should not be measured only by clicks or conversion. The main outcome is whether users understand total assets, account distribution, profit-and-loss components, and transaction status. Guardrails should include reconciliation gaps, completeness, freshness, price coverage, errors, and support demand. Baselines and targets must be confirmed with internal data.'
    },
    'pb-4-10': {
      zh: '我會先把問題分成錯誤、延遲、不清楚與難以操作，優先處理錯誤和無法恢復的問題。接著比較使用者傷害、證據強度、風險、依賴、可逆性與機會成本，再選一個完整而可驗證的最小範圍。',
      en: 'I would separate problems into wrong, late, unclear, and hard to act on, then prioritize wrong and unrecoverable outcomes. Next, compare user harm, evidence strength, risk, dependencies, reversibility, and opportunity cost, and select the smallest coherent scope that can be validated.'
    },
    'pb-4-11': {
      zh: '資料流程應從權威帳戶與帳務服務開始，經過事件處理、標準識別、彙總、估值和品質檢查，再提供給產品介面。每一層都要有更新時間、錯誤狀態、對帳規則與負責人。這是建議架構，不是幣安現況。',
      en: 'The data flow should start with authoritative account and ledger services, then pass through event processing, canonical identification, aggregation, valuation, and quality checks before reaching the product interface. Every layer needs freshness, error states, reconciliation rules, and ownership. This is a recommended structure, not a claim about Binance’s current architecture.'
    },
    'st-4': {
      zh: '我不會在沒有基準資料時直接排定五項任務。先看是否有資金、信任、法遵或安全傷害，再看影響範圍、發生頻率、營運負擔與策略依賴。最後比較證據、投入與可逆性，決定先做什麼。',
      en: 'I would not rank the five tasks without baseline evidence. First, assess potential harm to funds, trust, compliance, or security. Then consider blast radius, frequency, operational load, and strategic dependencies. Finally, compare evidence, effort, and reversibility before choosing the priority.'
    },
    'pb-3-1': {
      zh: '我曾帶領三位產品經理和兩位設計師，與跨區團隊在四個月內完成交易所平台從零到一上線。我先凍結帳戶、資產、審批與風險骨架，再用模組化需求和前期評審讓團隊平行交付。這個案例證明速度來自提早定義邊界，不是省略治理。',
      en: 'I led three product managers and two designers and worked with a cross-regional team to launch an exchange platform in four months. I first fixed the account, asset, approval, and risk foundations, then used modular requirements and early reviews so teams could deliver in parallel. The lesson is that speed comes from defining boundaries early, not from skipping governance.'
    },
    'pb-3-2': {
      zh: '我的直接責任包括帳戶與錢包對照、資產快照、穩定幣估值和每日損益可視化需求。我沒有負責完整成本計算引擎或大型資料管線的工程實作。若處理跨帳戶損益，我會先和產品、資料與財務領域負責人凍結定義。',
      en: 'My direct ownership included account and wallet mapping, asset snapshots, stablecoin valuation, and daily profit-and-loss visibility requirements. I did not implement a complete cost-basis engine or a large data pipeline. For cross-account profit and loss, I would first align the definition with product, data, and finance-domain owners.'
    },
    'pb-3-3': {
      zh: '我曾設計跨市場定價、異常報價保護、供應商排序與流動性上限。最低價格不一定是最佳結果；還要一起考慮報價有效性、流動性、供應商狀態、風險與失敗後的恢復。現有資料沒有提供正式成效數字，因此我不補造指標。',
      en: 'I worked on cross-market pricing, abnormal-quote protection, provider priority, and liquidity caps. The lowest price is not always the best outcome; quote validity, liquidity, provider status, risk, and recovery also matter. The available evidence does not include production outcome metrics, so I do not add unsupported numbers.'
    },
    'pb-3-4': {
      zh: '我保留單一產品經理負責需求，再讓另一位產品經理在高風險資料流、狀態與例外上提出挑戰。這能提早找出盲點，又不會讓責任分散。評審深度依風險調整，不是所有需求都增加同樣流程。',
      en: 'I keep one product manager accountable for the requirement and ask another product manager to challenge high-risk data flows, states, and exceptions. This finds blind spots early without diluting ownership. Review depth is based on risk instead of adding the same process to every requirement.'
    },
    'pb-3-5': {
      zh: '這個案例可用來說明衍生品策略的狀態、保證金與風險。我能清楚定義方向、網格方式、最低保證金、預估清算價格、訂單拆分與策略生命週期；精確演算法與量化模型仍由工程或量化負責人決定。',
      en: 'This example demonstrates product thinking about derivatives-strategy states, margin, and risk. I can define direction, grid method, minimum margin, estimated liquidation price, order splitting, and strategy lifecycle. The exact algorithms and quantitative models remain the responsibility of engineering or quantitative owners.'
    },
    'st-5': {
      zh: '我剛升任主管時，曾把管理責任和個別產品經理的工作混在一起。後來我改成單一負責人制：產品經理負責日常推進，我負責範圍、關鍵架構、跨模組依賴與風險檢查。這改善了責任清楚度，但我沒有量化缺陷降低幅度。',
      en: 'When I first became a lead, I mixed management responsibility with the work of individual product managers. I later moved to a single-accountable-owner model: the product manager owns daily delivery, while I own scope, critical architecture, cross-module dependencies, and risk checks. This improved ownership clarity, but I do not have a measured defect-reduction figure.'
    },
    'pb-5': {
      zh: '我的工作方式是先分清楚事實、假設與風險，再把問題、決策、負責人、期限和驗收方式寫清楚。我重視使用者信任、誠實邊界、清楚責任與有效挑戰。未知的內部做法要先確認，不會用猜測代替。',
      en: 'My working style separates facts, assumptions, and risks, then makes the problem, decision, owner, deadline, and acceptance method clear. I value user trust, honest boundaries, clear ownership, and effective challenge. I verify unknown internal practices instead of replacing them with guesses.'
    },
    'st-6': {
      zh: '這一輪要避免重講完整履歷、加入敏感或不確定資訊，以及用很長的框架逃避問題。每題先用一句話回答，再補兩到三個重點和一個證據。沒有證據的成果、數字或內部事實都不說。',
      en: 'Avoid retelling the full résumé, adding sensitive or uncertain information, or using a long framework to avoid the question. Answer each question in one sentence, then add two or three points and one piece of evidence. Do not claim outcomes, numbers, or internal facts without support.'
    },
    'st-7': {
      zh: '英文回答要短、直接，而且只使用熟悉的字。先說結論，再說方法和證據；需要時間思考時，可以先確認問題。不要逐字翻譯中文長句，也不要臨時使用不熟悉的術語。',
      en: 'Keep English answers short, direct, and built from familiar words. State the conclusion first, then explain the method and evidence. If you need time, confirm the question before answering. Do not translate long Chinese sentences word for word or improvise unfamiliar terminology.'
    },
    'st-10': {
      zh: '面試當天只記住五件事：先回答、短句、具體證據、清楚邊界、答完就停。若問題涉及幣安內部資料或政策，要說明需要向哪位負責人確認，再提出可驗證的做法。',
      en: 'Remember five things on interview day: answer first, use short sentences, give specific evidence, state boundaries clearly, and stop when the answer is complete. For Binance-specific data or policy, identify the owner who must confirm it, then explain a testable approach.'
    },
    'st-9': {
      zh: '我會詢問團隊目前最重要的資產問題、這個職位前三個月的成功標準，以及產品、資料、工程和風險團隊如何分工。這些問題能幫我理解真實工作，不需要用問題展示自己多懂。',
      en: 'I would ask about the team’s most important asset problem, the success criteria for the first three months, and how product, data, engineering, and risk divide ownership. These questions help me understand the real work instead of using questions to demonstrate knowledge.'
    },
    'pb-6': {
      zh: '主管或小組面談時，我會確認決策權、資料品質責任、近期優先級、跨團隊依賴與失敗後的處理方式。問題要幫助雙方判斷合作方式，也要避免要求不能公開的內部資訊。',
      en: 'In a hiring-manager or panel interview, I would confirm decision rights, data-quality ownership, near-term priorities, cross-team dependencies, and failure handling. The questions should help both sides evaluate collaboration without asking for confidential internal information.'
    },
    'pb-7': {
      zh: '合約職缺要確認合約期限、續約條件、雇用主、薪資、福利、假期、試用安排、工作地點、時區與轉正可能性。先取得書面條款，再比較選項；不把口頭期待當成保證。',
      en: 'For a contract role, confirm the contract length, renewal criteria, employing entity, compensation, benefits, leave, probation terms, location, time zone, and conversion possibility. Obtain written terms before comparing options, and do not treat verbal expectations as guarantees.'
    },
    'st-11': {
      zh: '面試後立即記錄實際問題、自己的回答、追問、未回答好的地方、對方提供的事實與下一步。事實和推測要分開，避免隔天只剩下模糊印象。',
      en: 'Immediately after the interview, record the actual questions, your answers, follow-ups, weak points, facts shared by the interviewer, and next steps. Separate facts from interpretation so the record does not become a vague memory the next day.'
    },
    'pb-9': {
      zh: '紀錄模板要包含時間、面試官、問題、回答證據、未知項目、職務訊號、風險、待辦與回覆期限。只記錄對方真的說過的內容，不自行補上動機或結論。',
      en: 'The interview record should include time, interviewers, questions, evidence used, unknowns, role signals, risks, actions, and response deadlines. Record only what the interviewer actually said, without inventing motives or conclusions.'
    }
  };

  function createLanguageBlock(language, text) {
    const block = document.createElement('section');
    block.className = `language-block ${language}`;
    block.lang = language === 'zh' ? 'zh-Hant' : 'en';
    const label = document.createElement('span');
    label.className = 'language-label';
    label.textContent = language === 'zh' ? '中文版' : 'ENGLISH VERSION';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    block.append(label, paragraph);
    return block;
  }

  function createResearchNotes(nodes) {
    const details = document.createElement('details');
    details.className = 'research-notes';
    const summary = document.createElement('summary');
    summary.textContent = '完整研究底稿（非口說稿）';
    const notice = document.createElement('div');
    notice.className = 'research-notes-notice';
    notice.append(
      createLanguageBlock('zh', '以下保留原始研究、表格、案例、步驟與證據邊界，供深入追問時查閱。它不是直接照讀的口說稿；面試回答請使用上方雙語短答。'),
      createLanguageBlock('en', 'The section below preserves the original research, tables, cases, steps, and evidence boundaries for deeper follow-up. It is reference material, not a script to read aloud. Use the bilingual answer above for the interview response.')
    );
    const content = document.createElement('div');
    content.className = 'research-notes-content';
    nodes.forEach((node) => content.append(node));
    details.append(summary, notice, content);
    return details;
  }

  function normalizeNavigation() {
    Object.entries(chineseTitles).forEach(([id, title]) => {
      document.querySelectorAll(`.sidebar a[href="#${id}"], .topbar a[href="#${id}"]`).forEach((link) => {
        const labels = link.querySelectorAll('span');
        const label = labels[labels.length - 1];
        if (label) label.textContent = title;
        if (link.dataset.search !== undefined) link.dataset.search = `${title} ${answers[id].zh} ${answers[id].en}`;
      });
    });
    document.querySelectorAll('.phase-nav .phase > summary strong').forEach((title, index) => {
      if (phaseTitles[index]) title.textContent = phaseTitles[index];
    });
    document.querySelectorAll('.chapter-page').forEach((page) => {
      const kicker = page.querySelector('.chapter-kicker');
      const number = kicker?.querySelector('span');
      const phase = phaseById.get(page.id);
      if (kicker && number && phase) kicker.replaceChildren(number, document.createTextNode(phase));
    });
    const brand = document.querySelector('.sidebar .brand');
    if (brand) {
      const name = brand.querySelector('.brand-row strong');
      const moduleLabel = brand.querySelector('.brand-row small');
      const round = brand.querySelector('.interview-mini');
      if (name) name.textContent = '面試攻略';
      if (moduleLabel) moduleLabel.textContent = '幣安資產模組';
      if (round?.firstChild) round.firstChild.nodeValue = '直屬主管面試';
    }
    const crumb = document.querySelector('.topbar .crumb');
    if (crumb) {
      const moduleLabel = crumb.querySelector('small');
      const coach = crumb.querySelector('strong');
      if (moduleLabel) moduleLabel.textContent = '幣安資產模組';
      if (coach) coach.textContent = '直屬主管面試攻略';
    }
  }

  function renderQuickPage() {
    const page = document.getElementById('quick');
    if (!page) return;
    const originalNodes = [...page.childNodes];
    const header = document.createElement('header');
    header.className = 'quick-bilingual-header';
    const kicker = document.createElement('p');
    kicker.className = 'chapter-kicker';
    kicker.textContent = '幣安資產產品經理｜面試攻略';
    const title = document.createElement('h1');
    title.textContent = '先練會說出口的答案，再讀研究資料';
    const intro = document.createElement('p');
    intro.textContent = '每個章節都先顯示完整中文，再顯示完整英文。重要英文名詞可停留滑鼠、鍵盤聚焦或點按查看解釋。';
    header.append(kicker, title, intro);

    const pair = document.createElement('div');
    pair.className = 'bilingual-answer quick-answer';
    pair.dataset.bilingualQuick = '';
    pair.append(
      createLanguageBlock('zh', '先準備自我介紹、資產與損益、對帳與異常處理，以及一個領導案例。每題先說結論，再補兩到三個重點。只說有證據支持的經驗；幣安內部做法若未確認，要清楚說明。'),
      createLanguageBlock('en', 'Prepare the self-introduction, asset and profit-and-loss topics, reconciliation and incident handling, and one leadership example first. Answer each question with the conclusion, followed by two or three points. Use only evidence-backed experience and label any unconfirmed Binance-specific practice clearly.')
    );

    const links = document.createElement('nav');
    links.className = 'quick-bilingual-links';
    links.setAttribute('aria-label', '快速開始');
    [
      ['#st-2', '自我介紹'],
      ['#st-3-1', '資產與損益'],
      ['#pb-4-5', '對帳與異常處理'],
      ['#pb-3-1', '領導案例'],
      ['./speaking/', '雙語口說卡']
    ].forEach(([href, label]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      links.append(link);
    });
    const glossary = document.createElement('button');
    glossary.type = 'button';
    glossary.dataset.glossaryOpen = '';
    glossary.textContent = '開啟名詞解釋';
    links.append(glossary);
    const research = createResearchNotes(originalNodes);
    page.append(header, pair, links, research);
  }

  function revealResearchTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    const details = target?.closest('.research-notes');
    if (!details) return;
    details.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    normalizeNavigation();
    renderQuickPage();
    Object.entries(answers).forEach(([id, answer]) => {
      const page = document.getElementById(id);
      const body = page?.querySelector('.chapter-body');
      if (!body) return;
      const title = page.querySelector('.chapter-header h1');
      if (title && chineseTitles[id]) title.textContent = chineseTitles[id];
      const originalNodes = [...body.childNodes];
      const pair = document.createElement('div');
      pair.className = 'bilingual-answer';
      pair.dataset.bilingualAnswer = id;
      pair.dataset.speechPilot = '';
      pair.append(createLanguageBlock('zh', answer.zh), createLanguageBlock('en', answer.en));
      const research = createResearchNotes(originalNodes);
      body.append(pair, research);
    });
    revealResearchTarget();
    window.addEventListener('hashchange', revealResearchTarget);
    document.documentElement.classList.add('bilingual-guide-ready');
    document.dispatchEvent(new CustomEvent('binance:bilingual-ready'));
  });
})();
