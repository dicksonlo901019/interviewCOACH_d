window.BINANCE_QUESTION_BANK = Object.freeze({
  "version": "2026-08-08",
  "status": "FORMAL_V1_INDEPENDENTLY_ACCEPTED_TIMING_HOLD",
  "sourceSnapshots": {
    "01-cex-domain-knowhow.md": "eadd7ddf9c2f2a4b9b61981933dd0c52645c86d056034fbd2a39b577600b8c8a",
    "02-product-management-domain-knowhow.md": "e9803d222f77bb326b90225da8e9c9bbb73d3926150f4bc4e61113e3ca89367f",
    "03-ai-agent-workflow-domain-knowhow.md": "0882e9627f8c86bd8e9c572c6b79f1a2ca8ff40b48df5b7e071634ecab847e9c",
    "04-general-interview-questions.md": "837c7b5ecb89d3770d3c76c40d99507fd3265e17ecf37b90108e424ebf864375"
  },
  "categoryOrder": [
    {
      "key": "cex",
      "zh": "中心化交易所",
      "en": "CEX Domain Know-how"
    },
    {
      "key": "pm",
      "zh": "產品管理",
      "en": "Product Management Domain Know-how"
    },
    {
      "key": "ai",
      "zh": "人工智慧工作流程",
      "en": "AI Agent Workflow Domain Know-how"
    },
    {
      "key": "general",
      "zh": "通用",
      "en": "General Interview Questions"
    }
  ],
  "questions": [
    {
      "id": "CEX-001",
      "slug": "cex-001",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "餘額、可用餘額、鎖定餘額與權益",
      "questionZh": "餘額、可用餘額、鎖定餘額與權益有什麼不同？為什麼不同帳戶不能直接相加？",
      "questionEn": "What is the difference between balance, available balance, locked balance, and equity, and why can’t balances across accounts simply be added together?",
      "whatItTestsZh": "是否理解帳戶狀態、負債與跨帳戶彙總語意",
      "whatItTestsEn": "Understanding of account states, liabilities, and cross-account aggregation",
      "answerZh15": "這些數字回答不同問題；先凍結帳戶範圍、負債、鎖定狀態與估值方式，才可以做跨帳戶彙總。",
      "answerEn15": "They answer different questions. I would first define account scope, liabilities, locked states, and valuation rules before calculating a consolidated total.",
      "answerZhLong": [
        "餘額表示帳戶持有量；可用餘額還要扣除掛單、保證金、審核或風控保留；鎖定餘額仍可能屬於使用者資產。",
        "權益通常還會納入部位估值、未實現損益、負債與利息。現貨、資金、保證金、合約與理財帳戶的物件和時點語意不同，直接相加可能重複計算。",
        "我過去做過帳戶／錢包矩陣與資產快照需求；若是幣安，我會先確認其實際帳戶分類與權威來源，不從外部資料猜公式。"
      ],
      "answerEnLong": [
        "Balance represents holdings in an account. Available balance excludes amounts reserved by orders, margin, reviews, or risk controls, while locked funds may still belong to the user.",
        "Equity can also include position valuation, unrealized profit and loss, liabilities, and interest. Spot, funding, margin, futures, and earn products have different objects and timing semantics, so direct addition may double-count assets.",
        "I have direct experience defining account and wallet matrices and asset snapshots. For Binance, I would confirm its actual account taxonomy and authoritative sources rather than infer an internal formula."
      ],
      "followUpZh": "哪些狀態會阻擋交易、轉帳或提領？",
      "followUpEn": "Which states block trading, transfers, or withdrawals?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-002",
      "slug": "cex-002",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "內部轉帳與鏈上提領",
      "questionZh": "內部轉帳會不會產生損益？它與鏈上提領有什麼差異？",
      "questionEn": "Does an internal transfer create profit and loss, and how is it different from an on-chain withdrawal?",
      "whatItTestsZh": "是否能區分內部資金移動、外部資金流與鏈上風險",
      "whatItTestsEn": "Ability to distinguish internal movement, external cash flow, and on-chain risk",
      "answerZh15": "在合併投資組合範圍內，內部轉帳只是資產位置改變，不應創造損益；鏈上提領則多了網路、地址、費用與不可逆風險。",
      "answerEn15": "Within a consolidated portfolio, an internal transfer only changes asset location and should not create profit or loss. An on-chain withdrawal adds network, address, fee, and irreversibility risks.",
      "answerZhLong": [
        "內部轉帳可在來源帳戶顯示轉出、目的帳戶顯示轉入，但合併總資產不應因此增加或減少。",
        "來源扣款與目的入帳應以同一個標準識別碼連結；若兩邊完成時間不同，需要在途狀態，避免重複計算。",
        "鏈上提領另有地址、網路、手續費、廣播、確認數與追回限制，所以狀態、警示與復原承諾不能與平台內轉帳完全共用。"
      ],
      "answerEnLong": [
        "A source account may show a transfer out and a destination account may show a transfer in, but consolidated assets should not change.",
        "Both sides should share a canonical transfer identifier. If debit and credit complete at different times, the product needs an in-transit state to prevent double counting.",
        "On-chain withdrawals also involve network selection, destination addresses, fees, broadcasting, confirmations, and limited recovery. Their states and warnings therefore cannot be identical to internal transfers."
      ],
      "followUpZh": "一邊已扣、一邊未入時如何顯示？",
      "followUpEn": "How should the product display a debit that has completed before the corresponding credit?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-003",
      "slug": "cex-003",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "訂單、成交、帳本與交易紀錄",
      "questionZh": "order（訂單）、fill（成交回報）、ledger entry（帳本分錄）與 transaction record（交易紀錄）是同一件事嗎？",
      "questionEn": "Are an order, a fill, a ledger entry, and a transaction record the same object?",
      "whatItTestsZh": "是否理解交易上游物件與資產流水的可追溯關係",
      "whatItTestsEn": "Understanding of upstream trading objects and asset traceability",
      "answerZh15": "不是；訂單是意圖、成交是執行事實、帳本分錄是資產變動，交易紀錄則是使用者可理解的活動視圖。",
      "answerEn15": "No. An order is intent, a fill is an execution fact, a ledger entry records an asset movement, and a transaction record is a user-facing activity view.",
      "answerZhLong": [
        "一張訂單可以沒有成交，也可以拆成多筆成交；掛單時可能只把可用餘額轉為鎖定餘額。",
        "每筆成交會帶出價格、數量、費用與部位變化，再形成對應帳本分錄。充值、獎勵或調整沒有交易訂單，也仍會產生帳本事件。",
        "活動頁可以統一搜尋與呈現，但底層物件不能被壓成同一種紀錄；否則部分成交、取消與費用就無法正確追溯。"
      ],
      "answerEnLong": [
        "An order may remain unfilled or generate multiple fills. Placing it may only move funds from available to locked.",
        "Each fill has price, quantity, fee, and position effects that generate ledger entries. Deposits, rewards, and adjustments can create ledger events without any trading order.",
        "The activity page can provide a unified search experience, but the underlying objects must remain distinct so partial fills, cancellations, and fees stay traceable."
      ],
      "followUpZh": "為什麼掛單後可用餘額下降但仍沒有成交紀錄？",
      "followUpEn": "Why can available balance fall before any trade is recorded?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-004",
      "slug": "cex-004",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "期間損益、已實現與未實現損益",
      "questionZh": "你會如何定義今日 PnL（損益），並區分已實現與未實現損益？",
      "questionEn": "How would you define daily profit and loss and distinguish realized from unrealized profit and loss?",
      "whatItTestsZh": "是否能先定義範圍、切點與資金流，再談損益公式",
      "whatItTestsEn": "Ability to define scope, cutoff, and cash flows before proposing a profit-and-loss formula",
      "answerZh15": "我不先背公式；先定義投資組合範圍、切點、外部資金流、估值價格與損益組成，再區分已確認結果和未結束部位估值。",
      "answerEn15": "I would not start with a memorized formula. I would first define portfolio scope, cutoff, external cash flows, valuation prices, and components, then separate confirmed outcomes from open-position estimates.",
      "answerZhLong": [
        "常見概念是期末權益減期初權益，再排除外部流入並加回外部流出，但這只是一般原理，不是幣安內部公式。",
        "未實現損益依參考價估算未結束部位；已實現損益則由出售、平倉或結算確認，並可能納入交易費、資金費與利息。",
        "我做過每日損益可視化與泰達幣估值需求；實作前仍會凍結帳戶範圍、時區、價格來源、費用與更正政策。"
      ],
      "answerEnLong": [
        "A common portfolio concept is ending equity minus beginning equity, excluding external inflows and adding external outflows. That is a domain principle, not Binance’s internal formula.",
        "Unrealized profit and loss estimates open positions using a reference price. Realized profit and loss is confirmed through a sale, close, or settlement and may include trading fees, funding, and interest.",
        "I have worked on daily profit-and-loss visibility and USDT valuation requirements. Before implementation, I would still freeze account scope, timezone, price source, fee treatment, and correction policy."
      ],
      "followUpZh": "法幣買幣算外部流入還是交易？",
      "followUpEn": "Should a fiat purchase be treated as an external inflow or a trade?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-005",
      "slug": "cex-005",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "成本基礎與外部轉入資產",
      "questionZh": "成本基礎應使用 weighted average（加權平均）還是 FIFO（先進先出）？外部存入資產的成本怎麼處理？",
      "questionEn": "Should cost basis use weighted average or FIFO, and how should externally deposited assets be handled?",
      "whatItTestsZh": "是否理解成本基礎取決於用途與資料完整性",
      "whatItTestsEn": "Understanding that cost basis depends on purpose and data completeness",
      "answerZh15": "沒有脫離用途的唯一方法；先確認是投資表現、交易分析、對帳單還是稅務用途，外部存入成本未知時也不能假裝知道。",
      "answerEn15": "There is no single method without a defined purpose. The product must distinguish performance, trading analysis, statements, and tax use without pretending to know an external acquisition cost.",
      "answerZhLong": [
        "加權平均容易解釋；先進先出需要逐批歷史。不同用途、地區與產品可能要求不同方法。",
        "外部存入的原始買入成本平台通常不可得，可選擇不納入現貨成本、以存入時公平價作參考，或標示未知並允許受控調整。",
        "產品經理要凍結納入交易、費用處理、轉帳規則、重設條件、調整權限與版本說明，避免同一成本數字被誤用於不同目的。"
      ],
      "answerEnLong": [
        "Weighted average is easier to explain, while FIFO requires lot-level history. Different purposes, jurisdictions, and products may require different methods.",
        "For an external deposit, the platform may exclude it from spot cost, use fair value at deposit time as a reference, or mark the cost as unknown with controlled adjustment.",
        "The product manager must define covered transactions, fee treatment, transfer rules, reset conditions, adjustment permissions, and version disclosure so one number is not reused for incompatible purposes."
      ],
      "followUpZh": "使用者手動調整成本後如何保留稽核紀錄？",
      "followUpEn": "How should a manual cost adjustment remain auditable?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-006",
      "slug": "cex-006",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "價格來源與平倉後損益差異",
      "questionZh": "mark price（標記價格）、index price（指數價格）與 last price（最新成交價）如何影響損益？",
      "questionEn": "How do mark price, index price, and last price affect profit and loss?",
      "whatItTestsZh": "是否能解釋價格來源、估值與實際成交結果差異",
      "whatItTestsEn": "Ability to explain price sources, valuation, and execution differences",
      "answerZh15": "三種價格用途不同；未實現損益只是估算，平倉結果還會受到實際成交價、滑價、費用、資金費與利息影響。",
      "answerEn15": "They serve different purposes. Unrealized profit and loss is only an estimate, while the final result also depends on execution price, slippage, fees, funding, and interest.",
      "answerZhLong": [
        "最新成交價直覺但可能受短期異常成交影響；指數價格是多市場參考；標記價格常用於衍生品公平估值與風險控制。",
        "如果頁面不揭露價格來源、更新時間與適用範圍，使用者會把估算值誤認為可實現收益。",
        "我會分開顯示部位損益、預估費用、資金費／利息與已平倉損益，並讓價格來源與時間可追溯。"
      ],
      "answerEnLong": [
        "Last price is intuitive but can be distorted by an abnormal trade. Index price is a multi-market reference, while mark price is commonly used for fair valuation and derivatives risk control.",
        "If the interface does not disclose the price source, timestamp, and scope, users may mistake an estimate for realizable profit.",
        "I would separate position profit and loss, estimated fees, funding or interest, and closed profit and loss, with traceable price sources and timestamps."
      ],
      "followUpZh": "價格過期時應顯示舊值還是停止計算？",
      "followUpEn": "Should the product show a stale value or stop calculating when prices are outdated?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-007",
      "slug": "cex-007",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "事件時間、更正與歷史重算",
      "questionZh": "延遲事件或價格修正後，歷史損益要不要重算？為什麼不能直接覆寫原始紀錄？",
      "questionEn": "Should historical profit and loss be recalculated after a late event or price correction, and why should the original record not be overwritten?",
      "whatItTestsZh": "是否理解事件時間、版本、更正與重編的稽核要求",
      "whatItTestsEn": "Understanding of event time, versioning, correction, and restatement auditability",
      "answerZh15": "依核准的重編政策處理；可以重算，但必須保留版本、原始事件、更正事件與差異說明。",
      "answerEn15": "It depends on the approved restatement policy. Recalculation can be valid, but the product must preserve versions, original events, correction events, and an explanation of the difference.",
      "answerZhLong": [
        "業務發生時間、系統處理時間與最終結算時間可能不同，混用會讓每日損益和流水跨日錯置。",
        "更正不能無痕覆寫原始紀錄，應保留原始事件、反向或調整事件、原因、時間與關聯識別碼。",
        "若政策允許重算，我會記錄定義版本、價格版本、切點與重算時間，並確保圖表、明細、匯出與摘要使用同一版本或清楚揭露差異。"
      ],
      "answerEnLong": [
        "Event time, processing time, and settlement time may differ. Mixing them can place daily profit and loss and transactions in the wrong reporting period.",
        "A correction should not silently overwrite history. The original event, reversal or adjustment, reason, timestamp, and relationship identifier should remain auditable.",
        "If recalculation is allowed, I would retain definition and price versions, cutoff, and recomputation time, while keeping charts, details, exports, and summaries consistent or explicitly explaining differences."
      ],
      "followUpZh": "哪些使用者需要收到重編通知？",
      "followUpEn": "Which users should be notified about a restatement?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-008",
      "slug": "cex-008",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "帳本與複式記帳",
      "questionZh": "ledger（帳本）與 wallet（錢包）有什麼差異？為什麼 double-entry ledger（複式帳本）重要？",
      "questionEn": "What is the difference between a ledger and a wallet, and why is a double-entry ledger important?",
      "whatItTestsZh": "是否理解託管交易所帳本與產品／工程責任邊界",
      "whatItTestsEn": "Understanding of custodial ledgers and product-versus-engineering ownership",
      "answerZh15": "錢包是保管與操作介面，帳本記錄使用者權利義務；複式分錄讓每次資產移動都有來源與去向，便於稽核與對帳。",
      "answerEn15": "A wallet is a custody and interaction concept, while a ledger records rights and obligations. Double entry gives every asset movement a source and destination for audit and reconciliation.",
      "answerZhLong": [
        "在託管型交易所，應用程式餘額通常代表內部帳本上的使用者權益，不等於每位使用者都有獨立鏈上錢包餘額。",
        "轉帳、成交、費用與更正應形成平衡分錄，避免資產無根據增加或消失；不平衡時要區分時間差、對應錯誤與真實缺陷。",
        "我有設計三層帳戶／資產架構與對帳需求的經驗，但不會宣稱實作帳本引擎，也不會推測幣安的內部帳本架構。"
      ],
      "answerEnLong": [
        "In a custodial exchange, an app balance usually represents a user entitlement in an internal ledger, not a separate on-chain wallet balance for every user.",
        "Transfers, fills, fees, and corrections should produce balanced postings so assets do not appear or disappear without cause. An imbalance must be classified as timing, mapping, or a genuine defect.",
        "I have direct product experience defining a three-layer account and asset structure and reconciliation requirements, but I would not claim ownership of a ledger engine or infer Binance’s architecture."
      ],
      "followUpZh": "一筆成交通常會影響哪些帳戶與費用分錄？",
      "followUpEn": "Which accounts and fee postings can a single fill affect?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-009",
      "slug": "cex-009",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "全量對帳範圍與公式",
      "questionZh": "全量對帳的核心公式是什麼？為什麼不能只把所有資料拉出來比一次？",
      "questionEn": "What is the core reconciliation equation, and why is one large comparison of all data insufficient?",
      "whatItTestsZh": "是否能把對帳公式轉成可裁決的資料契約",
      "whatItTestsEn": "Ability to turn a reconciliation equation into an adjudicable data contract",
      "answerZh15": "期初餘額加有效流入、減有效流出並納入調整，應等於期末餘額；但必須先定義物件、權威來源、時間切點、容差與例外負責人。",
      "answerEn15": "Beginning balance plus valid inflows, minus valid outflows, including approved adjustments, should equal ending balance. But objects, authoritative sources, cutoffs, tolerance, and exception owners must be defined first.",
      "answerZhLong": [
        "公式只是起點；對帳至少要區分業務事件對帳本分錄、帳本變動對期末餘額，以及內部權益對外部保管資產。",
        "每個業務領域要先定義資料粒度、標準識別碼、事件／處理／結算時間、精度、容差與差異裁決者，否則只是無法裁決的大型查詢。",
        "我做過資產快照、第三方金流對應與對帳需求；對幣安的「全量」範圍、基準值與服務負責人仍會逐一確認。"
      ],
      "answerEnLong": [
        "The equation is only a starting point. Reconciliation should distinguish business events versus ledger postings, ledger movements versus ending balances, and internal entitlements versus externally custodied assets.",
        "Each domain needs a defined grain, canonical identifiers, event, processing and settlement times, precision, tolerance, and an owner who can adjudicate differences. Otherwise, a large query cannot produce accountable decisions.",
        "I have worked on asset snapshots, third-party payment mapping, and reconciliation requirements. For Binance, I would still confirm the actual full-scope domains, baselines, and service owners."
      ],
      "followUpZh": "第一週你會向每個業務方索取哪些資料？",
      "followUpEn": "What would you request from each business owner during the first week?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-010",
      "slug": "cex-010",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "對帳例外與冪等性",
      "questionZh": "對帳差異都是錯誤嗎？為什麼 idempotency（冪等性）會影響資產正確性？",
      "questionEn": "Is every reconciliation difference a defect, and why does idempotency affect asset correctness?",
      "whatItTestsZh": "是否能分類差異並防止重試造成重複資產事件",
      "whatItTestsEn": "Ability to classify differences and prevent duplicate asset events from retries",
      "answerZh15": "差異可能是時間差、資料缺陷或有效業務例外；冪等控制則防止同一操作重試後重複入帳或扣款。",
      "answerEn15": "A difference may be timing, a data defect, or a valid business exception. Idempotency prevents the same retried operation from creating duplicate credits or debits.",
      "answerZhLong": [
        "時間差可能是鏈上已確認但內部尚未入帳；資料缺陷包含遺失、重複或錯誤對應；業務例外則可能是人工審查、凍結或沖正。",
        "每類差異都要有原因碼、影響範圍、處理負責人、時限與使用者溝通方式，不能一律當成工程錯誤。",
        "冪等性要以業務操作識別碼為基礎；重試應回傳既有結果或延續原狀態，不能建立新的資產事件或重複顯示。"
      ],
      "answerEnLong": [
        "A timing difference may occur when a blockchain transaction is confirmed but internal crediting is incomplete. Data defects include missing, duplicate, or incorrectly mapped events, while business exceptions include review, freeze, or reversal states.",
        "Each category needs a reason code, impact scope, owner, service expectation, and user communication path. It should not automatically be treated as an engineering bug.",
        "Idempotency should use a business-operation identifier. A retry should return the original outcome or continue the same state, rather than create another asset event or duplicate user record."
      ],
      "followUpZh": "大量時間差如何避免淹沒真正缺陷？",
      "followUpEn": "How would you prevent timing differences from hiding genuine defects?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-011",
      "slug": "cex-011",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "充值確認與入帳狀態",
      "questionZh": "為什麼鏈上已確認不一定代表平台已入帳可用？不同網路為何需要不同確認數？",
      "questionEn": "Why does on-chain confirmation not always mean that a deposit is credited and available, and why do networks require different confirmation counts?",
      "whatItTestsZh": "是否理解鏈上確認、內部入帳與風控狀態",
      "whatItTestsEn": "Understanding of chain confirmation, internal crediting, and risk states",
      "answerZh15": "鏈上確認只是其中一步；平台還要驗證資產、網路、地址、標籤、確認門檻、內部入帳與風險／法遵狀態。",
      "answerEn15": "On-chain confirmation is only one step. The platform still validates the asset, network, address, memo, confirmation threshold, internal crediting, and risk or compliance state.",
      "answerZhLong": [
        "使用者旅程至少要區分偵測到、確認中、鏈上確認、內部入帳或審查、已入帳與可使用，不能只用「成功／失敗」。",
        "不同網路的最終性、重組風險與出塊時間不同；確認門檻是速度與回滾風險的取捨，應由錢包、安全與風控負責人核准。",
        "我做過充提、錢包矩陣與風控需求；幣安的實際狀態機和確認數仍是內部定義，不會從公開資料推測。"
      ],
      "answerEnLong": [
        "The user journey should distinguish detected, confirming, on-chain confirmed, internal crediting or review, credited, and available states rather than only success or failure.",
        "Networks differ in finality, reorganization risk, and block time. Confirmation thresholds trade speed for rollback risk and should be approved by wallet, security, and risk owners.",
        "I have direct experience with deposit, withdrawal, wallet-matrix, and risk requirements. Binance’s actual state machine and confirmation numbers remain internal definitions that I would not infer from public sources."
      ],
      "followUpZh": "確認數足夠但仍未入帳時怎麼診斷？",
      "followUpEn": "How would you diagnose a deposit that has enough confirmations but is still not credited?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-012",
      "slug": "cex-012",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "錯誤網路、地址標籤與追回",
      "questionZh": "使用者選錯網路或填錯 memo（地址標籤）時，產品應怎麼處理？",
      "questionEn": "How should the product handle a wrong network selection or an incorrect memo?",
      "whatItTestsZh": "是否能設計操作前防錯與操作後受限追回",
      "whatItTestsEn": "Ability to design pre-submit prevention and constrained post-error recovery",
      "answerZh15": "操作前要動態防錯，操作後要能追蹤與說明是否支援追回，但不能承諾資產一定可找回。",
      "answerEn15": "The product should prevent errors before submission and provide traceable recovery guidance afterward, without promising that assets can always be recovered.",
      "answerZhLong": [
        "充值或提領前要依資產顯示支援網路、地址格式、標籤要求、最低金額與高風險警示，複製與掃碼後仍要讓使用者確認。",
        "發生異常後，以交易識別碼、地址、標籤、網路與金額建立可追蹤案件，告知需要補充的資料、負責團隊與處理狀態。",
        "是否能追回取決於保管能力、網路、政策與人工成本；介面應清楚揭露限制，不以模糊客服訊息或保證取代真實狀態。"
      ],
      "answerEnLong": [
        "Before a deposit or withdrawal, the product should display supported networks, address formats, memo requirements, minimum amounts, and high-risk warnings for the selected asset. Copying or scanning should not remove the confirmation step.",
        "After an error, the case should be traceable through transaction identifier, address, memo, network, and amount, with required evidence, owner, and status.",
        "Recovery depends on custody capability, network, policy, and operational cost. The interface should disclose those limits rather than offer a vague support message or guarantee."
      ],
      "followUpZh": "哪些錯誤可以在送出前被系統攔截？",
      "followUpEn": "Which errors can the system prevent before submission?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-013",
      "slug": "cex-013",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "提領狀態與熱／冷錢包",
      "questionZh": "提領需要哪些使用者可見狀態？hot wallet（熱錢包）與 cold wallet（冷錢包）如何影響體驗？",
      "questionEn": "Which user-visible states are required for withdrawals, and how do hot and cold wallets affect the experience?",
      "whatItTestsZh": "是否能把提領、保管流動性與使用者狀態連結",
      "whatItTestsEn": "Ability to connect withdrawal states, custody liquidity, and user experience",
      "answerZh15": "狀態必須說清資產是否已扣、是否可取消、目前由誰處理及失敗後如何恢復；熱／冷錢包的安全與流動性取捨會影響等待時間。",
      "answerEn15": "States must explain deduction, cancellation, processing ownership, and failure recovery. Hot and cold wallet tradeoffs affect waiting time and liquidity.",
      "answerZhLong": [
        "至少要能表達已提交、審核中、處理中、已廣播、完成、失敗、拒絕或取消，並附時間、交易識別碼與下一步。",
        "熱錢包支援日常流動性與快速簽署；冷錢包降低線上攻擊暴露，但可能增加調撥、審核與等待時間。",
        "產品經理負責可理解狀態、預估時間、維護溝通與升級路徑，不應推測幣安的錢包比例、簽署架構或調撥邏輯。"
      ],
      "answerEnLong": [
        "The product should represent submitted, under review, processing, broadcast, completed, failed, rejected, and cancelled states, with timestamps, transaction identifiers, and next actions.",
        "Hot wallets support daily liquidity and fast signing. Cold wallets reduce online attack exposure but may add rebalancing, review, and waiting time.",
        "The product manager owns understandable states, estimated timing, maintenance communication, and escalation paths, but should not infer Binance’s wallet ratios, signing architecture, or treasury logic."
      ],
      "followUpZh": "失敗後餘額何時恢復可用？",
      "followUpEn": "When should funds become available again after a failed withdrawal?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-014",
      "slug": "cex-014",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "風控與法遵需求產品化",
      "questionZh": "PM（產品經理）在風控／法遵需求中負責什麼？KYC（客戶身分驗證）、AML（反洗錢）、制裁篩查與 Travel Rule（轉帳資訊規則）有何不同？",
      "questionEn": "What does a product manager own in risk and compliance requirements, and how do KYC, AML, sanctions screening, and the Travel Rule differ?",
      "whatItTestsZh": "是否能將核准政策產品化而不取代法遵判斷",
      "whatItTestsEn": "Ability to productize approved policy without replacing compliance judgment",
      "answerZh15": "政策由風控與法遵負責人核准；產品經理把政策轉成可測試狀態、操作流程、使用者文案與稽核紀錄，不自行發明門檻。",
      "answerEn15": "Risk and compliance owners approve policy. The product manager converts it into testable states, operational flows, user communication, and audit records without inventing thresholds.",
      "answerZhLong": [
        "客戶身分驗證確認使用者身分與風險資料；反洗錢監控處理可疑活動；制裁篩查檢查受限制對象；轉帳資訊規則處理轉出方與受益方資料。",
        "產品契約要記錄政策來源、版本、地區、生效日、觸發條件、所需證據、允許／阻擋／保留／人工審查、申訴與稽核。",
        "我做過身分驗證供應商身分驗證、交易資格、文件提交與風控需求；實際政策判斷仍由風控／法遵負責，我負責產品化與跨團隊對接。"
      ],
      "answerEnLong": [
        "KYC verifies customer identity and risk information. AML monitoring addresses suspicious activity. Sanctions screening checks restricted parties, while the Travel Rule concerns originator and beneficiary information for qualifying transfers.",
        "The product contract should preserve policy source, version, region, effective date, trigger, evidence, allow, block, hold, review, appeal, and audit behavior.",
        "I have direct experience with identity-verification providers verification, transaction eligibility, document submission, and risk requirements. Policy decisions still belong to risk and compliance owners; I own productization and coordination."
      ],
      "followUpZh": "哪些風控理由可以向使用者揭露？",
      "followUpEn": "Which risk reasons can be disclosed to users?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-015",
      "slug": "cex-015",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "風控阻擋與使用者體驗",
      "questionZh": "如何在風控阻擋與使用者體驗之間取得平衡？",
      "questionEn": "How would you balance risk controls with user experience?",
      "whatItTestsZh": "是否能以安全防護條件管理風控與體驗取捨",
      "whatItTestsEn": "Ability to balance risk and experience with safety guardrails",
      "answerZh15": "先確保政策覆蓋與資產安全，再降低不必要的誤判、重複提交與不可解釋等待；不能用轉換率壓過安全要求。",
      "answerEn15": "I would protect policy coverage and asset safety first, then reduce unnecessary false positives, repeated submissions, and unexplained waiting. Conversion cannot override safety requirements.",
      "answerZhLong": [
        "先把不可妥協的政策與安全條件寫成防護條件，再分析哪些摩擦來自重複資料、狀態不清或誤判。",
        "指標同時看政策覆蓋、誤判審查率、審查時間、放棄率、申訴結果、客服接觸與資產損失防護，不只看通過率。",
        "產品經理優化資料預填、進度說明與復原路徑；門檻、例外與覆核權仍由風控／法遵負責人決定。"
      ],
      "answerEnLong": [
        "I would express non-negotiable policy and safety conditions as guardrails, then identify friction caused by duplicate data, unclear states, or false positives.",
        "Metrics should cover policy coverage, false-positive review rate, review time, abandonment, appeal outcome, support contacts, and asset-loss guardrails rather than only approval rate.",
        "The product manager can improve prefilled data, progress communication, and recovery paths, while thresholds, exceptions, and override authority remain with risk and compliance owners."
      ],
      "followUpZh": "如何證明優化沒有削弱政策覆蓋？",
      "followUpEn": "How would you prove that an improvement did not weaken policy coverage?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-016",
      "slug": "cex-016",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "錢包頁面優先順序與總覽",
      "questionZh": "錢包所有頁面應先優化哪裡？好的資產總覽至少要回答什麼？",
      "questionEn": "Where would you begin improving all wallet pages, and what must a good asset overview answer?",
      "whatItTestsZh": "是否能依使用者傷害排序錢包體驗問題",
      "whatItTestsEn": "Ability to prioritize wallet experience by user harm",
      "answerZh15": "先修錯誤資料，再處理資金受阻、風險傷害與狀態不清，最後才是視覺美化；總覽要回答有多少、在哪裡、為何變動及何時更新。",
      "answerEn15": "Fix wrong data, blocked funds, risk harm, and unclear states before visual polish. The overview must explain amount, location, change, and freshness.",
      "answerZhLong": [
        "我會先建立總覽、帳戶、資產明細、轉帳、充值、提領、損益、流水與受限狀態的頁面／旅程清單。",
        "優先順序是錯誤、受阻、風險、難以理解、緩慢／不一致，再到視覺；這能先降低資產信任與操作傷害。",
        "總覽應可下鑽到帳戶、資產與交易，顯示可用／鎖定／待處理／負債、估值幣別、價格來源、更新時間與異常復原路徑。"
      ],
      "answerEnLong": [
        "I would inventory overview, account, asset detail, transfer, deposit, withdrawal, profit and loss, activity, and restricted-state journeys.",
        "I would prioritize wrong, blocked, risky, unclear, slow or inconsistent, and finally visual issues. This addresses trust and asset harm before cosmetics.",
        "The overview should drill down to accounts, assets, and transactions and show available, locked, pending, and liability states, valuation currency, price source, freshness, and recovery paths."
      ],
      "followUpZh": "你會如何衡量使用者是否更信任資產頁面？",
      "followUpEn": "How would you measure whether users trust the asset pages more?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-017",
      "slug": "cex-017",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "過期資料與流水可追溯性",
      "questionZh": "資料更新中應顯示舊數字還是空白？交易紀錄最重要的是什麼？",
      "questionEn": "Should the product show stale data or a blank state during an update, and what matters most in transaction history?",
      "whatItTestsZh": "是否能管理資料新鮮度與交易紀錄追溯",
      "whatItTestsEn": "Ability to manage data freshness and transaction traceability",
      "answerZh15": "依使用者傷害分級；估值可顯示有時間標記的舊值，但可提餘額必須來自權威來源，所有資產變動都要可搜尋、解釋與追溯。",
      "answerEn15": "It depends on user harm. Valuation may show timestamped stale data, but withdrawable balance requires authority, and every asset movement must remain traceable.",
      "answerZhLong": [
        "投資組合估值可短暫顯示舊值，但要標示更新時間、過期或部分資料；高風險操作不能拿分析快取冒充可操作餘額。",
        "超過容許時間後應明確失敗，提供重新整理、明細或客服追蹤，不應悄悄顯示舊數字。",
        "流水要有穩定識別碼、類型、金額、費用、來源／目的帳戶、狀態、時間、鏈上識別碼、更正關聯、時區與匯出版本。"
      ],
      "answerEnLong": [
        "A portfolio estimate may briefly display an old value if freshness and partial status are explicit. A high-risk action must not use an analytics cache as an actionable balance.",
        "Beyond an acceptable threshold, the interface should fail visibly and offer refresh, details, or support traceability instead of silently showing old data.",
        "Activity records need stable identifiers, type, amount, fee, source and destination account, status, timestamps, on-chain reference, correction links, timezone, and export version."
      ],
      "followUpZh": "哪些欄位必須即時、哪些可以延遲？",
      "followUpEn": "Which fields must be real-time and which may tolerate delay?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-018",
      "slug": "cex-018",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "權威來源、資料契約與準確度取捨",
      "questionZh": "資產模組只能有一個權威來源嗎？產品經理要如何與資料／工程團隊對齊準確度和即時性？",
      "questionEn": "Does the asset module need one source of truth, and how should a product manager align accuracy and freshness with data and engineering teams?",
      "whatItTestsZh": "是否能定義欄位權威來源與產品語意契約",
      "whatItTestsEn": "Ability to define field-level authority and a product semantic contract",
      "answerZh15": "不是整個模組只有一個來源，而是每個欄位、物件與決策有明確權威來源；準確度與即時性要依使用者決策分層。",
      "answerEn15": "The module does not need one source for everything. Each field, object, and decision needs an authoritative source, while accuracy and freshness should be tiered by the user decision involved.",
      "answerZhLong": [
        "帳本可負責資產權益、交易服務負責訂單／成交、部位服務負責部位、價格服務負責估值；實際負責範圍需逐項確認。",
        "產品經理交付語意契約：定義、粒度、納入／排除、來源血緣、時間、幣別、精度、延遲事件、範例、真值表、回補與負責人。",
        "可提餘額以權威與安全優先；估值可容許短延遲但要揭露時間；歷史報表可較慢，但必須完整、可重算、有版本。"
      ],
      "answerEnLong": [
        "A ledger may own entitlements, a trading service may own orders and fills, a position service may own positions, and a price service may own valuation references. Actual ownership must be confirmed field by field.",
        "The product manager provides a semantic contract covering definition, grain, inclusion, source lineage, time, currency, precision, late events, examples, truth tables, backfill, and owners.",
        "Withdrawable balance prioritizes authority and safety. Valuation may tolerate short delay with freshness disclosure, while historical reporting may be slower but must be complete, recomputable, and versioned."
      ],
      "followUpZh": "每個業務方都說自己是權威來源時怎麼辦？",
      "followUpEn": "What would you do if every business team claims to be the authoritative source?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-019",
      "slug": "cex-019",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "新損益邏輯安全上線與指標",
      "questionZh": "如何安全上線新的損益公式或彙總邏輯？資產模組應看哪些指標？",
      "questionEn": "How would you safely launch a new profit-and-loss formula or aggregation, and which metrics should the asset module track?",
      "whatItTestsZh": "是否能安全發布資料邏輯並建立多面向指標",
      "whatItTestsEn": "Ability to launch data logic safely and define balanced metrics",
      "answerZh15": "先版本化定義、雙軌計算與多層對帳，再分階段發布；指標要同時涵蓋任務結果、資料品質、可靠性與營運負荷。",
      "answerEn15": "Version the definition, run parallel calculation and multi-level reconciliation, then release in stages. Metrics should cover task outcomes, data quality, reliability, and operational load.",
      "answerZhLong": [
        "先建立範例、黃金案例與邊界案例，做歷史回測、影子計算與新舊差異分析。",
        "從內部使用者、小流量到分階段發布，監控差異、過期、錯誤、延遲與客服訊號，並預先定義暫停、回復與重編溝通。",
        "指標包括任務完成、資產不符客服量、對帳差異、遺失／重複／延遲事件、過期顯示、錯誤率與人工審查積壓；基準和目標必須由內部資料確認。"
      ],
      "answerEnLong": [
        "I would create examples, golden cases, and edge cases, then run historical backtests, shadow calculations, and old-versus-new discrepancy analysis.",
        "Rollout would move from internal users to a small cohort and staged expansion, monitoring discrepancies, staleness, errors, latency, and support signals with predefined pause, rollback, and restatement communication.",
        "Metrics include task completion, asset-mismatch support contacts, reconciliation gaps, missing, duplicate, and late events, stale displays, error rates, and review backlog. Baselines and targets require internal data."
      ],
      "followUpZh": "什麼條件會觸發暫停或回復？",
      "followUpEn": "Which conditions would trigger a pause or rollback?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-020",
      "slug": "cex-020",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "撮合、費用、槓桿與清算",
      "questionZh": "常見撮合優先順序、maker（掛單方）／taker（吃單方）費用、槓桿與清算如何影響資產與損益？",
      "questionEn": "How do matching priority, maker and taker fees, leverage, and liquidation affect assets and profit and loss?",
      "whatItTestsZh": "是否理解撮合、費用、槓桿與清算對資產下游的影響",
      "whatItTestsEn": "Understanding of downstream asset effects from matching, fees, leverage, and liquidation",
      "answerZh15": "常見限價訂單簿採價格優先、同價時間優先；資產與損益應依實際成交、費用、部位與清算分錄，而不是只看下單價格。",
      "answerEn15": "A common order book uses price, then time priority. Assets and profit and loss follow fills, fees, positions, and liquidation entries rather than order price alone.",
      "answerZhLong": [
        "一張訂單可部分成交；未成交部分仍鎖定資產，取消後應釋放。每筆成交可能依掛單方／吃單方費率與付費幣別產生不同費用。",
        "在部位數量相同時，槓桿主要改變保證金、投資報酬率百分比與清算風險，不直接改變由價格差與部位大小決定的絕對損益。",
        "清算會產生平倉、已實現損益、費用、保證金與負債變化；撮合與清算演算法由交易／風控負責人管理，資產產品經理確保下游語意一致。"
      ],
      "answerEnLong": [
        "One order can be partially filled. The unfilled amount remains locked and should be released after cancellation. Each fill may generate different maker or taker fees and fee assets.",
        "For the same position size, leverage primarily changes required margin, return percentage, and liquidation risk rather than the absolute profit and loss driven by price movement and position size.",
        "Liquidation creates position closure, realized profit and loss, fees, margin, and liability changes. Trading and risk owners manage matching and liquidation algorithms; the asset product manager keeps downstream semantics consistent."
      ],
      "followUpZh": "為什麼下單價格不能直接用來計算損益？",
      "followUpEn": "Why should the order price not be used directly to calculate profit and loss?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-021",
      "slug": "cex-021",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "交易所經歷、真實範圍與個人職責",
      "questionZh": "你參與的交易所是否真實營運？具備哪些能力？你本人負責哪些部分？",
      "questionEn": "Was the exchange you worked on a real operating product, what capabilities did it include, and what did you personally own?",
      "whatItTestsZh": "是否能誠實證明交易所真實範圍與個人 ownership（負責範圍）",
      "whatItTestsEn": "Ability to establish exchange credibility and personal ownership without overclaiming",
      "answerZh15": "我參與的是兩個中心化交易所產品，直接負責產品架構與需求，不把工程實作、法遵核准或未證實營運指標算成自己的成果。",
      "answerEn15": "I owned product architecture and requirements for exchange products related to Fameex and TopOne, without claiming engineering implementation, compliance approval, or unverified operating metrics.",
      "answerZhLong": [
        "我在亞太滿譽從產品經理升任產品主管，帶領 3 位產品與 2 位設計，並與海外產品及工程團隊協作，完成四個月的 0→1 交易所發布。",
        "我的直接範圍包括帳戶／錢包矩陣、資產與快照需求、充提、審批、返佣、法幣／虛擬資產流程、網格交易與風控產品規則。",
        "工程架構與程式實作由工程團隊負責；客戶身分驗證與法遵政策由相應負責人核准。我不主張交易量、收入或完整生產事故等未提供證據的結果。"
      ],
      "answerEnLong": [
        "At Asia Pacific Manyu, I progressed from product manager to product lead, led three product managers and two designers, and collaborated with overseas product and engineering teams on a four-month zero-to-one exchange launch.",
        "My direct scope included account and wallet matrices, asset and snapshot requirements, deposits and withdrawals, approvals, rebates, fiat and crypto flows, grid trading, and risk-control product rules.",
        "Engineering owned technical architecture and implementation, while KYC and compliance policy required the relevant owners’ approval. I do not claim unsupported trading volume, revenue, or production incident results."
      ],
      "followUpZh": "哪些成果有直接證據，哪些只屬可轉移能力？",
      "followUpEn": "Which outcomes have direct evidence and which are only transferable capabilities?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-022",
      "slug": "cex-022",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "九十秒資產控制中心提案",
      "questionZh": "請用九十秒說明你的資產控制中心提案。",
      "questionEn": "Please explain your asset control center proposal in ninety seconds.",
      "whatItTestsZh": "是否能用九十秒說清資產控制中心的問題、方案與價值",
      "whatItTestsEn": "Ability to explain the asset control center problem, solution, and value in ninety seconds",
      "answerZh15": "我建議先統一帳戶、資產、餘額狀態與業務事件，再用總覽、損益與活動紀錄回答使用者最重要的四個資產問題。",
      "answerEn15": "I would align accounts, assets, balance states, and business events first, then use overview, profit and loss, and activity history to answer four essential asset questions.",
      "answerZhLong": [
        "我的提案不是再做一次錢包改版，而是建立資產控制中心。它先解決資料語義分散，再處理畫面呈現。",
        "產品要讓使用者回答四個問題：我有多少、資產在哪裡、為什麼變動、某筆錢現在怎麼了，並能下鑽到可信任的明細與狀態。",
        "這能把損益、對帳、充提與風險要求放進同一套產品語言；它是我的建議方向，不代表幣安現行架構或內部路線圖。"
      ],
      "answerEnLong": [
        "My proposal is not another wallet redesign. It is an asset control center that addresses fragmented data semantics before changing the interface.",
        "The product should help users answer four questions: how much do I have, where are my assets, why did they change, and what happened to a specific movement, with traceable detail and states.",
        "This creates one product language for profit and loss, reconciliation, money movement, and risk controls. It is my recommendation, not a claim about Binance’s current architecture or roadmap."
      ],
      "followUpZh": "為什麼只改錢包首頁不能解決這個問題？",
      "followUpEn": "Why would a wallet-homepage redesign be insufficient?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-023",
      "slug": "cex-023",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "帳戶、資產、餘額狀態與業務事件",
      "questionZh": "資產控制中心如何整理複雜的帳戶與資產資料？",
      "questionEn": "How would the asset control center organize complex account and asset data?",
      "whatItTestsZh": "是否能區分帳戶、資產、餘額狀態與業務事件",
      "whatItTestsEn": "Ability to distinguish accounts, assets, balance states, and business events",
      "answerZh15": "先分開帳戶、資產、餘額狀態與業務事件，再依使用者問題組合總覽、損益與活動紀錄。",
      "answerEn15": "Separate accounts, assets, balance states, and business events first, then compose overview, profit and loss, and activity history around user questions.",
      "answerZhLong": [
        "帳戶是資產所在的產品容器；資產是幣種或部位；餘額狀態說明可用、鎖定、等待或負債；業務事件則解釋數字為什麼改變。",
        "總覽可以依帳戶與資產彙整，損益可以依成本與變動解釋，活動紀錄則保留訂單、成交、帳務分錄與充提之間的關聯。",
        "共用定義不代表底層只有一種物件；產品層統一使用者理解，底層仍保留各自識別、狀態與稽核能力。"
      ],
      "answerEnLong": [
        "An account is the product container, an asset is the currency or position, a balance state explains whether value is available, locked, pending, or owed, and a business event explains why the number changed.",
        "Overview can aggregate by account and asset, profit and loss can explain cost and changes, and activity history can preserve relationships among orders, fills, ledger entries, deposits, and withdrawals.",
        "Shared definitions do not mean one underlying object. The product layer unifies user understanding while source systems preserve their identifiers, states, and auditability."
      ],
      "followUpZh": "統一活動紀錄為什麼不等於把所有物件合併？",
      "followUpEn": "Why does unified activity history not mean merging every underlying object?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "CEX-024",
      "slug": "cex-024",
      "category": "cex",
      "categoryZh": "中心化交易所",
      "categoryEn": "CEX Domain Know-how",
      "titleZh": "提案推進順序、指標與證據邊界",
      "questionZh": "你會如何分階段推進資產控制中心並衡量成效？",
      "questionEn": "How would you phase the asset control center proposal and measure success?",
      "whatItTestsZh": "是否能以證據與風險分階段推進，而不發明內部目標",
      "whatItTestsEn": "Ability to phase the proposal with evidence and risk without inventing internal targets",
      "answerZh15": "先確認決策權、資料來源與基準，再驗證一個高風險且邊界清楚的範圍，最後才擴大到跨帳戶體驗。",
      "answerEn15": "Confirm decision rights, data sources, and baselines first, validate one high-risk and well-bounded area, and only then expand to the cross-account experience.",
      "answerZhLong": [
        "第一階段確認帳戶分類、定義版本、權威來源、決策負責人與主要差異；沒有內部資料前，不自行排定承諾日期。",
        "第二階段選一個高風險但邊界清楚的範圍，完成定義、對帳、介面與異常處理；通過驗收後才擴大到跨帳戶總覽與整體體驗。",
        "成效同時看使用者理解、對帳差異、資料完整度、更新時間、異常恢復、客服需求與人工負擔；基準與目標必須由內部資料確認。"
      ],
      "answerEnLong": [
        "The first stage confirms account taxonomy, definition versions, authoritative sources, decision owners, and major discrepancies. I would not invent committed dates without internal evidence.",
        "The second stage selects one high-risk but well-bounded area and completes its definition, reconciliation, interface, and exception handling. Expansion follows only after acceptance.",
        "Success should combine user comprehension, reconciliation gaps, completeness, freshness, exception recovery, support demand, and manual workload. Baselines and targets require internal data."
      ],
      "followUpZh": "哪些內容是你的建議，哪些仍然未知？",
      "followUpEn": "Which parts are recommendations and which remain unknown?",
      "evidence": [
        "DOMAIN_PRINCIPLE",
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-001",
      "slug": "pm-001",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "主管角色中最困難的事與反思",
      "questionZh": "你擔任產品主管時遇過最困難的事情是什麼？後來如何調整？",
      "questionEn": "What was the most difficult part of becoming a product lead, and how did you adjust?",
      "whatItTestsZh": "主管的自我覺察、授權與修正能力",
      "whatItTestsEn": "Leadership self-awareness, delegation, and correction",
      "answerZh15": "剛升任主管時，我曾把管理責任與自己執行混在一起；後來重新界定決策、執行與審查責任，保留專案負責人負責範圍。",
      "answerEn15": "When I first became a lead, I mixed management responsibility with individual execution. I later clarified decision, execution, and review responsibilities while preserving each product manager’s ownership.",
      "answerZhLong": [
        "當時我一方面要交付複雜交易所需求，一方面要帶領 3 位產品與 2 位設計，初期容易因擔心品質而介入過深。",
        "我後來讓每位產品經理保留專案負責範圍，只在主要架構、跨系統資料流與高風險邏輯設置審查點，再加入同儕審查。",
        "這降低了單一負責人的盲點，也讓我從「替團隊做」轉為「建立判斷機制」。目前沒有可公開的量化前後差異，我不會補造數字。"
      ],
      "answerEnLong": [
        "I was delivering complex exchange requirements while leading three product managers and two designers. At first, concern about quality made me intervene too deeply.",
        "I then kept each product manager accountable for their project and added review points only for core architecture, cross-system data flow, and high-risk logic, followed by peer review.",
        "This reduced single-owner blind spots and shifted my role from doing work for the team to building a better decision mechanism. I do not have a verified before-and-after metric, so I would not invent one."
      ],
      "followUpZh": "你如何判斷何時介入、何時授權？",
      "followUpEn": "How do you decide when to intervene and when to delegate?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-002",
      "slug": "pm-002",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "流程與交付品質改善",
      "questionZh": "你推動過哪些產品流程或交付品質改善？",
      "questionEn": "What product-process or delivery-quality improvements have you introduced?",
      "whatItTestsZh": "是否能用機制提高需求與交付品質",
      "whatItTestsEn": "Ability to improve requirement and delivery quality through mechanisms",
      "answerZh15": "我把產品需求文件模組化、技術預審與產品經理同儕審查串成一套前置品質機制，讓複雜邏輯在工程開發前被挑戰。",
      "answerEn15": "I combined modular product requirements, technical pre-review, and product-manager peer review into an early quality mechanism that challenged complex logic before engineering implementation.",
      "answerZhLong": [
        "問題不是文件格式難看，而是不同產品經理對狀態、例外與資料流的表達不一致，工程常在後段才發現理解落差。",
        "我統一需求模組、流程圖、頁面元件與例外欄位，並在高風險需求進開發前安排技術預審與另一位產品經理的交叉檢查。",
        "權威履歷記錄 100% 需求元件化與約 80% 複雜邏輯前期對齊；我會把這些限定在該工作情境，不延伸成所有專案的普遍成效。"
      ],
      "answerEnLong": [
        "The issue was not document appearance. Different product managers described states, exceptions, and data flows inconsistently, so engineering discovered gaps late.",
        "I standardized requirement modules, flows, page components, and exception fields, then added technical pre-review and peer review for high-risk requirements before development.",
        "The authoritative resume records full requirement componentization and roughly 80 percent early alignment on complex logic. I keep those figures scoped to that specific work context rather than generalize them to every project."
      ],
      "followUpZh": "如何避免同儕審查變成額外簽核層？",
      "followUpEn": "How do you prevent peer review from becoming another approval layer?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-003",
      "slug": "pm-003",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "敏捷、瀑布與需求準備",
      "questionZh": "你使用過瀑布式或敏捷開發嗎？如何確保需求在 sprint（衝刺週期）開始前可執行？",
      "questionEn": "Have you used waterfall or agile delivery, and how do you ensure requirements are actionable before a sprint begins?",
      "whatItTestsZh": "是否理解方法以外的需求準備與範圍控制",
      "whatItTestsEn": "Understanding of readiness and scope control beyond methodology labels",
      "answerZh15": "我兩種方式都用過；方法不是重點，關鍵是進入開發前把目標、範圍、狀態、例外、驗收與依賴對齊。",
      "answerEn15": "I have used both. The method matters less than aligning the objective, scope, states, exceptions, acceptance criteria, and dependencies before development begins.",
      "answerZhLong": [
        "早期客戶專案較偏瀑布式；交易所 0→1 交付採兩週衝刺週期，以模組化需求與技術預審降低後段返工。",
        "我會用準備完成定義檢查問題、使用者、非目標、流程、狀態、例外、驗收條件、資料與外部依賴。",
        "若進入衝刺後仍發現關鍵需求不清，先判斷是否阻擋目標；必要時縮小範圍或退出該項工作，並保留決策紀錄，而不是讓工程自行猜測。"
      ],
      "answerEnLong": [
        "Earlier client projects were more waterfall-oriented, while the zero-to-one exchange delivery used two-week sprints supported by modular requirements and technical pre-review.",
        "My definition of ready covers the problem, user, non-goals, flow, states, exceptions, acceptance criteria, data, and external dependencies.",
        "If a critical ambiguity appears during a sprint, I assess whether it blocks the sprint goal. I either reduce scope or remove the item and document the decision rather than ask engineering to guess."
      ],
      "followUpZh": "為什麼工程需要需求消化時間？",
      "followUpEn": "Why does engineering need time to review requirements before a sprint?",
      "evidence": [
        "DIRECT",
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-004",
      "slug": "pm-004",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "策略優先順序與防護條件",
      "questionZh": "需求很多且公司收益、客戶成果、團隊負荷與時程衝突時，你如何排優先順序？",
      "questionEn": "How do you prioritize when company revenue, customer outcomes, team load, and schedule conflict?",
      "whatItTestsZh": "策略優先順序、取捨與防護條件",
      "whatItTestsEn": "Strategic prioritization, tradeoffs, and guardrails",
      "answerZh15": "我先定義不可犧牲的安全與法遵條件，再以目標、客群問題、可重用性、商業價值、成本／風險與成功指標比較，而不是只套固定優先級標籤。",
      "answerEn15": "I define non-negotiable safety and compliance guardrails first, then compare objectives, user problems, repeatability, business value, cost, risk, and success measures rather than rely only on P0-to-P5 severity.",
      "answerZhLong": [
        "先確認公司目標與使用者傷害；資產安全、法遵和重大可靠性是防護條件，不能被短期收益壓過。",
        "對其他需求比較受影響客群、問題嚴重度、可重用性、策略／商業價值、機會成本、依賴與可逆性。",
        "固定優先級標籤適合事件分級，但產品路線圖還要有結果指標和不做的理由。估時由工程負責人提供，我不自行編造精準工期。"
      ],
      "answerEnLong": [
        "I begin with the company objective and potential user harm. Asset safety, compliance, and critical reliability are guardrails that short-term revenue cannot override.",
        "For other needs, I compare affected users, problem severity, repeatability, strategic and commercial value, opportunity cost, dependencies, and reversibility.",
        "P0-to-P5 is useful for incident severity, but roadmap decisions also need outcome metrics and an explicit reason for not doing something. Engineering owners provide estimates; I do not invent precise timelines."
      ],
      "followUpZh": "如果執行長要求插單，你如何回應？",
      "followUpEn": "How would you respond if the CEO requested an urgent change?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-005",
      "slug": "pm-005",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "大客戶需求、範圍變更與產品化",
      "questionZh": "面對高價值客戶持續追加需求，你如何判斷要客製、產品化、延後或拒絕？",
      "questionEn": "How do you decide whether a high-value customer request should be customized, productized, deferred, or rejected?",
      "whatItTestsZh": "客戶期待、範圍控制與產品化判斷",
      "whatItTestsEn": "Customer expectation, scope control, and productization judgment",
      "answerZh15": "不以客戶名稱直接決定；先釐清問題、承諾與時限，再比較可重用性、策略價值、架構代價、維運成本及不做的風險。",
      "answerEn15": "I do not prioritize by customer name alone. I clarify the problem, commitment, and deadline, then compare repeatability, strategic value, architectural cost, maintenance burden, and the risk of not acting.",
      "answerZhLong": [
        "先區分真正的使用者問題、銷售承諾、法規必須項與偏好的解法，並把新增範圍對時程、成本與品質的影響透明化。",
        "若多個目標客群可重用且符合產品策略，進產品路線圖；若只對單一客戶有效，需有清楚商業價值、隔離方式與維運責任；否則提出替代方案或拒絕。",
        "我過去有客戶專案與平台產品經驗，但沒有可證明的標準企業軟體服務產品化關鍵績效指標，因此回答會停在決策方法和可轉移案例。"
      ],
      "answerEnLong": [
        "I separate the real user problem, sales commitment, regulatory requirement, and preferred solution, then make the impact on schedule, cost, and quality visible.",
        "If the need is reusable across target customers and fits strategy, it belongs on the roadmap. A single-customer customization needs clear commercial value, isolation, and maintenance ownership; otherwise, I offer an alternative or decline it.",
        "I have client-project and platform-product experience, but no verified standard B2B SaaS productization KPI, so I keep the answer at the decision framework and transferable evidence level."
      ],
      "followUpZh": "誰有權核准範圍與時程變更？",
      "followUpEn": "Who has authority to approve scope and schedule changes?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-006",
      "slug": "pm-006",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "回饋回流產品路線圖",
      "questionZh": "產品上線後，你如何收集客戶問題並決定哪些進入產品路線圖？",
      "questionEn": "After launch, how do you collect customer problems and decide which ones belong on the product roadmap?",
      "whatItTestsZh": "是否能把回饋轉為可驗證的產品路線圖決策",
      "whatItTestsEn": "Ability to convert feedback into testable roadmap decisions",
      "answerZh15": "先把零散回饋轉成可比較的問題資料，再以客群、頻率、傷害、策略、可重用性與驗證方式決定，不把聲量直接當優先級。",
      "answerEn15": "I turn fragmented feedback into comparable problem evidence, then assess user segment, frequency, harm, strategy, repeatability, and validation rather than treating volume as priority.",
      "answerZhLong": [
        "我過去由客服彙整問題，每週與營運負責人檢視；下一步會把來源、旅程、使用者類型、問題、影響、證據與目前處置標準化。",
        "合併重複回饋後，判斷是缺陷、操作理解、單一客戶需求或可重用產品機會，再比較目標與成本／風險。",
        "若進入路線圖，必須先定義要改變的使用者行為、成功指標與防護指標。我不會把尚未驗證的回饋流程說成已提升留存。"
      ],
      "answerEnLong": [
        "In a previous role, customer service collected issues and I reviewed them weekly with the operations lead. I would further standardize source, journey, user type, problem, impact, evidence, and current workaround.",
        "After deduplication, I classify the item as a defect, comprehension issue, single-customer request, or reusable product opportunity, then compare objectives, cost, and risk.",
        "If it enters the roadmap, it needs a target behavior change, success metric, and guardrail. I would not claim that an unmeasured feedback process improved retention."
      ],
      "followUpZh": "如何處理高聲量但低影響的需求？",
      "followUpEn": "How would you handle a high-volume but low-impact request?",
      "evidence": [
        "DIRECT",
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-007",
      "slug": "pm-007",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "交付後營運與持續迭代",
      "questionZh": "你過去的產品交付後是否持續營運與迭代？",
      "questionEn": "Did your previous products continue operating and iterating after delivery?",
      "whatItTestsZh": "對持續營運責任與自身經驗缺口的誠信",
      "whatItTestsEn": "Honesty about continuous operations ownership and experience gaps",
      "answerZh15": "交易所產品有持續處理營運、風控、客服與迭代需求；早期部分客戶專案則偏一次性交付，我會清楚區分，不把它包裝成完整軟體服務生命週期。",
      "answerEn15": "The exchange products required ongoing operations, risk, support, and iteration. Some earlier client projects were closer to one-time delivery, and I distinguish that honestly from a full software-as-a-service lifecycle.",
      "answerZhLong": [
        "早期電商與客戶專案較偏接案交付，持續產品探索與留存責任有限，這是我的直接經驗缺口。",
        "在交易所情境，我有處理客服問題分類、營運後台、充提／風控規則、資產快照與產品迭代，但沒有完整保存所有量產結果的關鍵績效指標。",
        "面對軟體服務角色，我會用既有營運準備、例外處理與回饋回路作可轉移證據，同時直接說明正式企業軟體服務經驗仍需補強。"
      ],
      "answerEnLong": [
        "Earlier e-commerce and client projects were more delivery-oriented, with limited ownership of continuous discovery and retention. That is a direct experience gap.",
        "In the exchange context, I worked on support classification, operations tooling, deposit, withdrawal, and risk rules, asset snapshots, and iteration, but I do not have verified KPIs for every production result.",
        "For a software-as-a-service role, I would use operational readiness, exception handling, and feedback loops as transferable evidence while stating that formal B2B SaaS experience remains a gap."
      ],
      "followUpZh": "你如何建立持續探索節奏？",
      "followUpEn": "How would you establish a continuous-discovery cadence?",
      "evidence": [
        "DIRECT",
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-008",
      "slug": "pm-008",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "上線準備與營運賦能",
      "questionZh": "新功能上線前，你如何讓營運與客服理解流程、異常與處理方式？",
      "questionEn": "How do you prepare operations and customer service for a new feature launch?",
      "whatItTestsZh": "上線準備、營運賦能與角色分工",
      "whatItTestsEn": "Launch readiness, operational enablement, and role ownership",
      "answerZh15": "我把上線準備當成交付的一部分：建立正常／異常流程、角色權限、操作手冊、演練、常見問題、查帳方式與升級路徑。",
      "answerEn15": "I treat operational readiness as part of delivery by defining happy and exception paths, permissions, guides, simulations, frequently asked questions, reconciliation methods, and escalation routes.",
      "answerZhLong": [
        "在法幣買幣與使用者間交易情境，我整理前台、後台與第三方的狀態對應，包含正常流程、失敗、待審、對帳與復原。",
        "上線前透過操作手冊、錄影、常見問題與情境演練，讓營運／客服知道可自行處理什麼、需要查哪些識別碼，以及何時升級。",
        "產品經理負責產品行為與準備完整性；營運負責日常處理，工程負責技術診斷。若監控或回復條件未就緒，我會建議暫停發布。"
      ],
      "answerEnLong": [
        "For fiat purchase and peer-to-peer trading flows, I mapped front-end, admin, and third-party states, including success, failure, review, reconciliation, and recovery.",
        "Before launch, I used guides, recordings, frequently asked questions, and scenario rehearsals so operations and support knew what they could resolve, which identifiers to inspect, and when to escalate.",
        "Product owns behavior and readiness, operations owns daily handling, and engineering owns technical diagnosis. If monitoring or rollback conditions are not ready, I would recommend pausing the release."
      ],
      "followUpZh": "上線後第一週要監控什麼？",
      "followUpEn": "What would you monitor during the first week after launch?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-009",
      "slug": "pm-009",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "內部產品與面向客戶工作的差異",
      "questionZh": "從內部產品轉到同時面對內外部客戶，工作方式有什麼不同？",
      "questionEn": "How does working with external customers differ from working mainly on internal products?",
      "whatItTestsZh": "面向外部客戶時的商業與期待管理",
      "whatItTestsEn": "Commercial and expectation management with external customers",
      "answerZh15": "外部客戶多了商業承諾、期待管理與關係風險；但核心仍是把問題、決策、範圍、責任與驗收標準寫清楚。",
      "answerEn15": "External customers add commercial commitments, expectation management, and relationship risk, but the core discipline is still to clarify problems, decisions, scope, ownership, and acceptance.",
      "answerZhLong": [
        "內部產品可以直接依共同目標協作；外部客戶還要處理合約、承諾時點、不同成熟度、隱性需求與資訊不對稱。",
        "我會在會議後留下問題、假設、範圍、非目標、決策人、依賴、風險和下一步，避免口頭期待成為無限追加。",
        "我的直接證據較多來自跨區產品、第三方服務與客戶專案，不會宣稱已具備大型企業顧問的完整銷售與帳戶責任。"
      ],
      "answerEnLong": [
        "Internal teams can often work from shared objectives. External customers also introduce contracts, commitment dates, different maturity levels, hidden needs, and information asymmetry.",
        "After each discussion, I document the problem, assumptions, scope, non-goals, decision owner, dependencies, risks, and next steps so verbal expectations do not become unlimited scope.",
        "My direct evidence is stronger in cross-region product work, third-party integrations, and client projects. I would not claim full enterprise consulting sales and account ownership."
      ],
      "followUpZh": "客戶與內部團隊對成功定義不同時怎麼辦？",
      "followUpEn": "What would you do when the customer and internal team define success differently?",
      "evidence": [
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-010",
      "slug": "pm-010",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "多專案、資源與解法品質",
      "questionZh": "同時負責兩至三個不同階段的專案時，你如何管理時程、資源、期待與解法品質？",
      "questionEn": "How would you manage schedule, resources, expectations, and solution quality across two or three projects at different stages?",
      "whatItTestsZh": "多專案容量、依賴與品質治理",
      "whatItTestsEn": "Multi-project capacity, dependency, and quality governance",
      "answerZh15": "我先建立各專案的結果、階段、決策時點、依賴與風險，再依瓶頸安排容量；不能用同一份待辦清單假裝資源沒有衝突。",
      "answerEn15": "I define outcomes, stages, decision points, dependencies, and risks for each project, then allocate capacity around bottlenecks rather than pretend one task list removes resource conflicts.",
      "answerZhLong": [
        "每個專案建立一頁狀態：目標、目前階段、下一個決策、負責人、依賴、風險、發布條件與需要管理層決定的事項。",
        "依風險與不可逆時點排優先順序，限制同時進行的高複雜工作；資源不足時提出縮小範圍、調整順序或延後，而不是讓品質默默下降。",
        "我負責優先順序、範圍與跨團隊決策；工程估時與技術品質由工程負責人確認，解法專業也需要對應顧問或領域負責人審查。"
      ],
      "answerEnLong": [
        "Each project gets a one-page status covering objective, stage, next decision, owner, dependencies, risks, release gates, and management decisions required.",
        "I prioritize by risk and irreversible deadlines and limit concurrent high-complexity work. When capacity is insufficient, I propose reducing scope, changing sequence, or delaying rather than silently reducing quality.",
        "I own priority, scope, and cross-team decisions. Engineering owners confirm estimates and technical quality, while relevant consultants or domain owners review solution expertise."
      ],
      "followUpZh": "兩個專案同時紅燈時如何取捨？",
      "followUpEn": "How would you choose when two projects become critical at the same time?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-011",
      "slug": "pm-011",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "模糊需求與困難客戶探索",
      "questionZh": "面對需求不清楚、溝通困難且產業陌生的客戶，你如何推進？",
      "questionEn": "How would you move forward with a difficult customer in an unfamiliar industry when requirements are unclear?",
      "whatItTestsZh": "在模糊與陌生領域中的探索能力",
      "whatItTestsEn": "Discovery in ambiguous and unfamiliar domains",
      "answerZh15": "不急著接功能清單；先對齊業務結果、使用者、現況、限制與決策人，再用小型可驗證產出縮小不確定性。",
      "answerEn15": "I would not accept a feature list immediately. I first align on business outcome, user, current process, constraints, and decision owner, then use a small testable artifact to reduce uncertainty.",
      "answerZhLong": [
        "先訪談決策者與第一線使用者，畫出現況流程、痛點、例外、資料與責任，並把互相矛盾的說法列成待決問題。",
        "將需求改寫成問題假設與成功條件，使用流程圖、低擬真原型或樣本資料做最小驗證，避免直接承諾完整解法。",
        "若資訊、資料權限或領域知識不足，明確標記保留且不可主張，請客戶／顧問／工程負責人補齊，並讓決策紀錄可追溯。"
      ],
      "answerEnLong": [
        "I interview decision-makers and frontline users, map the current process, pain points, exceptions, data, and responsibilities, and record contradictory statements as open decisions.",
        "I reframe requests as problem hypotheses and success conditions, then use a flow, low-fidelity prototype, or sample data for the smallest useful validation before committing to a full solution.",
        "If information, data permission, or domain knowledge is missing, I mark it as HOLD and request confirmation from the customer, consultant, or engineering owner with a traceable decision record."
      ],
      "followUpZh": "客戶拒絕提供資料時怎麼辦？",
      "followUpEn": "What would you do if the customer refused to provide required data?",
      "evidence": [
        "TRANSFERABLE",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-012",
      "slug": "pm-012",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "企業方案價值、售前與不採用",
      "questionZh": "企業為什麼要購買 AI（人工智慧）方案，而不只讓員工使用一般工具？售前如何證明價值？",
      "questionEn": "Why should an enterprise buy an AI solution instead of simply giving employees general AI tools, and how would presales demonstrate value?",
      "whatItTestsZh": "企業價值主張、售前驗證與停止判斷",
      "whatItTestsEn": "Enterprise value proposition, presales validation, and stop decisions",
      "answerZh15": "企業付費的不是聊天介面，而是可治理的工作流程、資料權限、系統整合、品質驗證、稽核與持續營運責任。",
      "answerEn15": "The enterprise is not paying for a chat interface. It is paying for a governable workflow, data permissions, integration, quality validation, auditability, and ongoing operational responsibility.",
      "answerZhLong": [
        "先找到高頻、耗時、錯誤成本明確且有資料邊界的工作，不以「使用人工智慧」本身作價值主張。",
        "用現況基準、最小概念驗證、品質／時間／風險指標和人工核准點證明可行性，同時揭露整合、資料與採用成本。",
        "若客戶選擇不採用，要確認是價值不足、風險、預算、時機或變革成本，保留學習並決定縮小試點、延後或停止，不用話術硬推。"
      ],
      "answerEnLong": [
        "I start with a frequent, costly workflow that has measurable error impact and clear data boundaries rather than positioning AI itself as the value.",
        "I use a current-state baseline, a small proof of concept, quality, time, and risk measures, and explicit human approvals to test value while disclosing integration, data, and adoption costs.",
        "If the customer chooses not to proceed, I identify whether the blocker is value, risk, budget, timing, or change cost, then decide whether to narrow, defer, or stop rather than push with sales language."
      ],
      "followUpZh": "如何避免概念驗證成功卻無法導入？",
      "followUpEn": "How do you avoid a successful proof of concept that cannot be adopted?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-013",
      "slug": "pm-013",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "產品經理的技術深度與角色界線",
      "questionZh": "產品／專案經理如何維持足夠技術深度，又不取代工程？",
      "questionEn": "How does a product or project manager maintain enough technical depth without replacing engineering?",
      "whatItTestsZh": "產品技術深度與工程 ownership（負責範圍）界線",
      "whatItTestsEn": "Product technical depth and engineering ownership boundaries",
      "answerZh15": "我需要理解資料、狀態、介面、失敗模式與取捨，才能做產品決策；技術設計、估時與實作品質仍由工程負責。",
      "answerEn15": "I need to understand data, states, interfaces, failure modes, and tradeoffs to make product decisions, while technical design, estimates, and implementation quality remain engineering responsibilities.",
      "answerZhLong": [
        "我會理解系統物件、資料來源、狀態機、權限、介面契約、錯誤與復原，並把它們轉成可驗收的產品行為。",
        "透過技術預審、範例資料、真值表與失敗情境驗證需求，不以記住框架名稱或寫程式假裝技術深度。",
        "我曾處理交易所帳戶／帳本需求、應用程式介面文件與人工智慧工作流程，但工程設計、部署與生產事故處理不屬於我可主張的負責範圍。"
      ],
      "answerEnLong": [
        "I understand system objects, data sources, state machines, permissions, interface contracts, errors, and recovery, then translate them into testable product behavior.",
        "I validate requirements through technical pre-review, sample data, truth tables, and failure scenarios rather than pretend that framework names or coding equal technical depth.",
        "I have worked on exchange account and ledger requirements, API documentation, and AI workflows, but I do not claim engineering design, deployment, or production incident ownership."
      ],
      "followUpZh": "被追問到不熟的技術時怎麼回答？",
      "followUpEn": "How do you respond when asked about a technical area you do not know?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "PM-014",
      "slug": "pm-014",
      "category": "pm",
      "categoryZh": "產品管理",
      "categoryEn": "Product Management Domain Know-how",
      "titleZh": "帶人範圍、公平審查與改善證據",
      "questionZh": "你帶過多少人？如何處理成員認為審查不公平，並證明對方真的改善？",
      "questionEn": "How many people have you led, how do you handle a team member who considers your review unfair, and how do you prove improvement?",
      "whatItTestsZh": "帶人範圍、審查公平性與改善證據",
      "whatItTestsEn": "Leadership scope, review fairness, and evidence of improvement",
      "answerZh15": "我帶領 3 位產品與 2 位設計；我會以事前公開、與結果相關的標準審查，將回饋落到可觀察行為，而不是要求對方接受我的版本。",
      "answerEn15": "I led three product managers and two designers. I use visible, outcome-based standards and turn feedback into observable behavior rather than require acceptance of my version.",
      "answerZhLong": [
        "權威履歷支持我帶領 5 人產品／設計團隊，但正式人事上的直屬關係仍有未完整文件化之處，因此我會說「帶領」而不擴張成全部正式直屬部屬。",
        "若成員認為不公平，先請他指出標準、證據或程序的問題，再共同回到使用者問題、商業規則、資料狀態與驗收條件，而不是比較個人偏好。",
        "改善要看下一次是否能獨立提出假設、證據、方案與取捨，並追蹤重複缺陷是否下降。目前沒有已確認的量化輔導成果，維持未知。"
      ],
      "answerEnLong": [
        "The authoritative resume supports leadership of a five-person product and design team. Formal reporting relationships are not fully documented, so I say that I led the team rather than claim that everyone was a direct report.",
        "If someone considers a review unfair, I ask which standard, evidence, or process is disputed, then return to the user problem, business rules, data states, and acceptance criteria rather than personal preference.",
        "Improvement means independently presenting assumptions, evidence, options, and tradeoffs in the next assignment and reducing repeated defects. I do not have a verified coaching metric, so it remains unknown."
      ],
      "followUpZh": "如果對方仍不同意你的判斷怎麼辦？",
      "followUpEn": "What would you do if the team member still disagreed with your judgment?",
      "evidence": [
        "DIRECT",
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-001",
      "slug": "ai-001",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "實際做到哪裡與責任邊界",
      "questionZh": "你如何使用 AI agent（人工智慧代理）？哪些是你完成的，哪些仍是構想？",
      "questionEn": "How have you used AI agents, what did you personally implement, and what remains proposed?",
      "whatItTestsZh": "是否誠實區分已展示工作流程、提案與 HOLD",
      "whatItTestsEn": "Ability to separate demonstrated workflow, proposals, and HOLD claims",
      "answerZh15": "我已展示角色型技能、產物資料夾與使用者確認關卡；自動估時、分派、正式看板寫入與生產部署仍是提案，不是已上線成果。",
      "answerEn15": "I demonstrated role-based skills, artifact folders, and user approval gates. Automated estimation, assignment, production-board writes, and deployment remain proposals rather than launched outcomes.",
      "answerZhLong": [
        "任職版可直接支持我把產品、設計與前端拆成角色型技能，使用固定產物資料夾與使用者確認關卡。",
        "個人延伸另有本地交接契約、狀態、產物清單、事件紀錄與獨立審查修正迴圈；這不等於公司正式制度或生產代理平台。",
        "工單自動建立、估時、分人、第一輪品質保證與部署是建議方向，需要人類負責人、權限、稽核與回復機制；我不會說成公司正式全面導入。"
      ],
      "answerEnLong": [
        "The employment-version evidence supports role-based skills for product, design, and front-end work, fixed artifact folders, and user approval gates.",
        "My personal local extension also includes handoff contracts, state, an artifact manifest, event logs, and an independent-review correction loop. This is not a company-wide process or a production agent platform.",
        "Automated ticket creation, estimation, assignment, first-pass quality assurance, and deployment are proposed directions that require human owners, permissions, audit, and rollback. I do not present them as an enterprise rollout."
      ],
      "followUpZh": "哪一個步驟目前仍需要最多人工判斷？",
      "followUpEn": "Which step currently requires the most human judgment?",
      "evidence": [
        "DIRECT",
        "HOLD"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-002",
      "slug": "ai-002",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "完整工作流程與交接契約",
      "questionZh": "你的完整 AI（人工智慧）工作流程如何運作？",
      "questionEn": "How does your complete AI-assisted workflow operate?",
      "whatItTestsZh": "是否能說清角色、產物、交接與人工關卡",
      "whatItTestsEn": "Ability to explain roles, artifacts, handoffs, and human gates",
      "answerZh15": "核心不是一個長提示詞，而是角色型技能、核准的上游產物、約定資料夾與使用者確認關卡之間都有明確輸入、輸出與停止條件。",
      "answerEn15": "The core is not one long prompt. Role-based skills, approved upstream artifacts, contracted folders, and user approval gates have explicit inputs, outputs, and stop conditions.",
      "answerZhLong": [
        "先把商業需求整理成問題、使用者、流程、狀態、例外、非目標與驗收條件，再形成版本化產品需求文件。",
        "每個角色只讀取核准的上游產物，並把輸出放入約定資料夾；更進階的設計字典與語意映射目前維持保留且不可主張，不列為已證實任職成果。",
        "每一階段先由人檢查再交接；上游版本漂移、缺少非目標、權限不明或驗收不可測時，流程停止並標記保留且不可主張，不讓代理自行補猜。"
      ],
      "answerEnLong": [
        "Business needs are first converted into a problem, user, flow, states, exceptions, non-goals, and acceptance criteria, producing a versioned product-requirements document.",
        "Each role reads only an approved upstream artifact and writes its output to the contracted folder. More advanced design dictionaries and semantic mapping remain HOLD rather than demonstrated employment outcomes.",
        "A human reviews every stage before handoff. The workflow stops and marks HOLD when an upstream version changes, non-goals are missing, permissions are unclear, or acceptance criteria are not testable."
      ],
      "followUpZh": "如何確認下游讀到的是正確版本？",
      "followUpEn": "How do you ensure that downstream work uses the correct version?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-003",
      "slug": "ai-003",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "工具名稱與技術誠信",
      "questionZh": "你提到的 Skill Creator（技能建立工具）屬於哪個產品或框架？如果記不確定怎麼辦？",
      "questionEn": "Which product or framework does the Skill Creator you mentioned belong to, and what would you do if you were unsure?",
      "whatItTestsZh": "工具名稱、版本與不確定資訊的技術誠信",
      "whatItTestsEn": "Technical integrity around tool names, versions, and uncertainty",
      "answerZh15": "我會先說清使用時的產品、版本與用途；若名稱或版本無法當場確認，就直接標示不確定，會後查證，不用相似名詞補答案。",
      "answerEn15": "I state the product, version, and purpose used. If the exact attribution is uncertain, I say so and verify it afterward rather than substitute a similar term.",
      "answerZhLong": [
        "技術可信度來自可重現的輸入、輸出與限制，不是堆疊工具名稱。我會先描述它在流程中負責建立可重用角色指令或技能規格。",
        "再說明當時使用的環境與版本；若不同產品也有相似名稱，要避免混用。",
        "不確定時我會回答：「我記得它的功能與產物，但產品歸屬或版本需要確認。」這比猜測安全，也保留後續查證紀錄。"
      ],
      "answerEnLong": [
        "Technical credibility comes from reproducible inputs, outputs, and limitations, not a list of tool names. I would first explain that the capability created reusable role instructions or skill specifications in the workflow.",
        "I would then identify the environment and version used and avoid mixing similarly named features across products.",
        "If uncertain, I would say, “I remember the function and artifact, but I need to confirm the product attribution or version.” That is safer than guessing and preserves a verification trail."
      ],
      "followUpZh": "你如何管理工具版本變更？",
      "followUpEn": "How do you manage tool-version changes?",
      "evidence": [
        "DIRECT",
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-004",
      "slug": "ai-004",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "哪些方法有效、哪些無效",
      "questionZh": "這套 AI（人工智慧）工作流程中，哪些方法有效，哪些無效？",
      "questionEn": "Which methods worked in your AI workflow, and which did not?",
      "whatItTestsZh": "是否能提出可觀察的有效／無效方法而不虛構成效",
      "whatItTestsEn": "Ability to identify effective and ineffective methods without inventing outcomes",
      "answerZh15": "有效的是明確角色、結構化交接、版本與人類確認；無效的是依賴單次長提示詞，讓模型自行補齊缺失決策。",
      "answerEn15": "Explicit roles, structured handoffs, versions, and human confirmation worked. A single long prompt that allowed the model to fill in missing decisions did not.",
      "answerZhLong": [
        "有效方法包括把需求拆成可驗收欄位、讓每個角色只讀核准來源、輸出固定格式，以及在階段間保留確認關卡。",
        "可以安全說明的限制是：單一長提示詞、缺少非目標或讓下游直接猜上游意圖，會增加輸出漂移風險；這是工作流程判斷，不是已量化生產結果。",
        "我能證明角色型技能、資料夾契約、使用者確認關卡與本地審查迴圈；速度提升、團隊採用率與生產品質關鍵績效指標均維持保留且不可主張。"
      ],
      "answerEnLong": [
        "Effective methods included converting requirements into testable fields, allowing each role to read only approved sources, enforcing output formats, and preserving approval gates between stages.",
        "A safe limitation is that one long prompt, missing non-goals, or downstream guessing increases output-drift risk. This is workflow judgment rather than a measured production result.",
        "I can support role-based skills, folder contracts, user approval gates, and a local review loop. Speed improvement, team adoption, and production-quality KPIs remain HOLD."
      ],
      "followUpZh": "你如何區分真正改善與主觀覺得比較快？",
      "followUpEn": "How do you distinguish real improvement from a subjective sense of speed?",
      "evidence": [
        "DIRECT",
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-005",
      "slug": "ai-005",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "知識庫、檢索與權威來源",
      "questionZh": "知識庫如何運作？AI agent（人工智慧代理）如何取得商業與產品資料？",
      "questionEn": "How does the knowledge base work, and how does an AI agent access business and product data?",
      "whatItTestsZh": "權威來源、檢索、權限與無答案處理",
      "whatItTestsEn": "Source authority, retrieval, permissions, and no-answer handling",
      "answerZh15": "代理不應任意搜尋所有檔案；先定義權威來源、版本、權限與檢索範圍，再回傳可引用片段，缺證據時停止。",
      "answerEn15": "The agent should not search every file freely. It needs authoritative sources, versions, permissions, and retrieval scope, with cited evidence and a stop condition when evidence is missing.",
      "answerZhLong": [
        "我的直接證據是角色讀取指定資料夾中的核准上游產物；企業知識庫或檢索增強生成實作屬保留且不可主張，以下只回答建議的產品契約。",
        "若使用檢索，文件需有來源、版本、有效日期、權限與分段識別碼；輸出應能連回引用，並處理衝突、過期和查無結果。",
        "涉及客戶資料、個人資料或機密時，先做最小權限、遮罩與稽核；若沒有權限或權威來源，代理標記保留且不可主張，由人處理。"
      ],
      "answerEnLong": [
        "My direct evidence is limited to roles reading approved upstream artifacts from specified folders. Enterprise knowledge-base or retrieval-augmented-generation implementation remains HOLD, so the rest is a proposed product contract.",
        "A retrieval system should preserve source, version, effective date, permission, and chunk identifiers. Outputs should link to citations and handle conflicts, stale sources, and no-result cases.",
        "Customer, personal, or confidential data requires least privilege, masking, and audit. Without authority or an approved source, the agent should mark HOLD and escalate to a human."
      ],
      "followUpZh": "兩個權威文件互相矛盾時怎麼辦？",
      "followUpEn": "What should happen when two authoritative documents conflict?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-006",
      "slug": "ai-006",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "何時使用代理、何時使用一般自動化",
      "questionZh": "什麼時候應使用 AI agent（人工智慧代理），什麼時候一般自動化就夠了？",
      "questionEn": "When should you use an AI agent, and when is standard automation sufficient?",
      "whatItTestsZh": "是否能選擇一般自動化、協作助手或代理",
      "whatItTestsEn": "Ability to choose among automation, copilots, and agents",
      "answerZh15": "規則穩定、輸入結構化且結果可決定時，用一般自動化；需要處理非結構資訊、規劃與工具選擇時才考慮代理，並加上核准與停止條件。",
      "answerEn15": "Use standard automation for stable rules, structured inputs, and deterministic outcomes. Consider an agent when the task needs interpretation, planning, or tool selection, with approvals and stop conditions.",
      "answerZhLong": [
        "固定格式轉換、明確條件判斷與可重複應用程式介面流程優先使用決定式自動化，成本與測試更可控。",
        "代理適合目標清楚但路徑需要判斷、資料是半結構或需要組合工具的任務；不能用在權限不清或錯誤不可逆的場景直接自主執行。",
        "我會比較任務變異、容錯、可逆性、資料敏感度、評估方法和人類審查成本，再決定是自動化、協作助手或代理。"
      ],
      "answerEnLong": [
        "Fixed-format transformation, explicit condition checks, and repeatable API flows should prefer deterministic automation because cost and testing are easier to control.",
        "Agents fit tasks with a clear goal but variable path, semi-structured information, or multiple tools. They should not autonomously execute irreversible actions when permissions are unclear.",
        "I compare task variability, error tolerance, reversibility, data sensitivity, evaluation method, and human-review cost before choosing automation, a copilot, or an agent."
      ],
      "followUpZh": "哪些任務你一定不會交給代理自主執行？",
      "followUpEn": "Which tasks would you never allow an agent to execute autonomously?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-007",
      "slug": "ai-007",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "任務契約、人類核准與停止條件",
      "questionZh": "一個可靠的代理任務契約應包含什麼？人類應在哪裡核准？",
      "questionEn": "What should a reliable agent task contract contain, and where should humans approve?",
      "whatItTestsZh": "任務契約、人類核准與停止條件",
      "whatItTestsEn": "Task contracts, human approval, and stop conditions",
      "answerZh15": "至少要有目標、核准來源、輸入、輸出、非目標、權限、驗收、負責人、停止與失敗回復；高影響寫入前必須由人核准。",
      "answerEn15": "It needs a goal, approved sources, inputs, outputs, non-goals, permissions, acceptance, owner, stop conditions, and failure recovery. A human must approve high-impact writes.",
      "answerZhLong": [
        "任務契約記錄目標、版本化來源、允許工具、資料範圍、預期產物、驗收條件、不可做事項與最大嘗試次數。",
        "產品需求文件、工單、估時、分派、發布與權限變更都有不同負責人；代理可產生草稿，但正式寫入、承諾或不可逆操作前需要對應人類負責人核准。",
        "缺來源、版本衝突、權限不明、個人資料風險或驗收不可測時應停止，保留事件紀錄並回到保留且不可主張／需要決策。"
      ],
      "answerEnLong": [
        "The task contract records the goal, versioned sources, allowed tools, data scope, expected artifact, acceptance criteria, prohibited actions, and maximum attempts.",
        "Product requirements, tickets, estimates, assignments, releases, and permission changes have different owners. The agent may draft, but the accountable human approves formal writes, commitments, and irreversible actions.",
        "Missing sources, version conflicts, unclear permissions, personal-data risk, or untestable acceptance should stop the workflow, preserve an event record, and return HOLD or NEEDS_DECISION."
      ],
      "followUpZh": "核准人沒有回應時代理可以繼續嗎？",
      "followUpEn": "Can the agent continue if the approver does not respond?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-008",
      "slug": "ai-008",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "自動估時、分派與工作看板權限",
      "questionZh": "為什麼不應讓 AI agent（人工智慧代理）直接自動估時、分人並修改正式工作看板？",
      "questionEn": "Why should an AI agent not directly estimate work, assign people, and modify the production work board?",
      "whatItTestsZh": "是否尊重估時、分派與正式看板的 owner（負責人）",
      "whatItTestsEn": "Respect for accountable owners of estimates, assignments, and official boards",
      "answerZh15": "估時與分派涉及能力、承諾、依賴與人員責任；代理可以整理輸入和提出建議，但不能替工程或主管做承諾。",
      "answerEn15": "Estimation and assignment involve capability, commitment, dependencies, and personnel accountability. An agent can organize inputs and recommend, but it cannot make commitments for engineering or management.",
      "answerZhLong": [
        "代理缺少即時容量、隱性依賴、技能差異與組織承諾，精準數字容易製造虛假確定性。",
        "安全流程是先把需求拆成可估項目、標記假設與風險，再由工程負責人估時、主管確認容量與分派，最後才寫入正式看板。",
        "若要逐步自動化，先採讀取或草稿權限，記錄建議與人類修改差異，評估穩定後才擴權；我目前沒有已上線的自動估時／分派成果。"
      ],
      "answerEnLong": [
        "An agent lacks real-time capacity, hidden dependencies, skill differences, and organizational commitments, so precise numbers can create false certainty.",
        "A safer flow decomposes requirements into estimable items with assumptions and risks, then lets engineering owners estimate, managers confirm capacity and assignment, and only afterward writes to the official board.",
        "Automation should begin with read or draft permission and compare recommendations with human edits before expanding authority. I do not have a launched automated estimation or assignment result."
      ],
      "followUpZh": "如何評估代理的估時建議是否有幫助？",
      "followUpEn": "How would you evaluate whether agent-generated estimates are useful?",
      "evidence": [
        "DOMAIN_PRINCIPLE",
        "HOLD"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-009",
      "slug": "ai-009",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "評估、回歸與可觀測性",
      "questionZh": "如何證明代理輸出可靠，而不是只成功展示一次？",
      "questionEn": "How do you prove that an agent is reliable rather than demonstrate one successful example?",
      "whatItTestsZh": "評估、回歸、失敗分類與可觀測性",
      "whatItTestsEn": "Evaluation, regression, failure taxonomy, and observability",
      "answerZh15": "建立代表性測試集、明確評分規則與人工基準，並在模型、提示詞、工具或來源版本變更後做回歸測試。",
      "answerEn15": "Build a representative test set, explicit scoring rules, and a human baseline, then run regression tests whenever the model, prompt, tool, or source version changes.",
      "answerZhLong": [
        "從真實任務建立黃金測試集，覆蓋正常、邊界、錯誤、權限與無答案案例，評估正確性、引用、完整性與安全。",
        "記錄模型、提示詞、工具結構、來源版本、輸入、輸出、耗時、成本、重試、人工修改與失敗分類，才知道問題出在哪一層。",
        "版本變更先離線回歸，再小範圍發布；重大錯誤、無來源答案或權限違規觸發暫停與回復。目標值需由真實基準建立，不先編數字。"
      ],
      "answerEnLong": [
        "I build a golden set from real tasks covering normal, edge, error, permission, and no-answer cases, then score correctness, citations, completeness, and safety.",
        "I record model, prompt, tool schema, source version, input, output, latency, cost, retries, human edits, and failure category so the team can locate the cause.",
        "Version changes go through offline regression and limited rollout. Severe errors, unsupported answers, or permission violations trigger pause and rollback. Targets require a real baseline rather than invented numbers."
      ],
      "followUpZh": "人工評分不一致時怎麼辦？",
      "followUpEn": "What would you do when human evaluators disagree?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-010",
      "slug": "ai-010",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "個人資料、權限與稽核",
      "questionZh": "企業 AI agent（人工智慧代理）如何處理個人資料、機密、權限與稽核？",
      "questionEn": "How should an enterprise AI agent handle personal data, confidential information, permissions, and auditability?",
      "whatItTestsZh": "個人資料、最小權限與稽核要求",
      "whatItTestsEn": "Personal data, least privilege, and audit requirements",
      "answerZh15": "採最小權限、資料最小化、用途限制與完整稽核；代理不因能讀到資料就自動取得使用與寫入權。",
      "answerEn15": "Apply least privilege, data minimization, purpose limitation, and complete auditability. Access to data does not automatically grant permission to use or write it.",
      "answerZhLong": [
        "先盤點資料分類、用途、保存、地區與負責人，只提供完成任務所需的最小欄位，必要時遮罩或匿名化。",
        "讀取、產生草稿、對外傳送與正式寫入分開授權；敏感操作需要人類核准，憑證不能出現在提示詞或日誌。",
        "稽核紀錄保留使用者、代理、工具、來源、版本、輸入摘要、輸出、核准、時間與結果。實際法規政策由法遵／資安負責人確認，產品經理負責產品化。"
      ],
      "answerEnLong": [
        "Inventory data classification, purpose, retention, region, and owner, then provide only the minimum fields required for the task, with masking or anonymization where needed.",
        "Separate permission to read, draft, transmit externally, and write formally. Sensitive actions require human approval, and credentials must not appear in prompts or logs.",
        "Audit records should preserve user, agent, tool, source, version, input summary, output, approval, time, and result. Compliance and security owners confirm policy; the product manager productizes it."
      ],
      "followUpZh": "哪些資料不應進入模型上下文？",
      "followUpEn": "Which data should never enter model context?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-011",
      "slug": "ai-011",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "模型、提示詞、工具與來源版本",
      "questionZh": "模型、提示詞、工具結構或來源版本改變時，如何防止工作流程回歸？",
      "questionEn": "How do you prevent workflow regression when the model, prompt, tool schema, or source version changes?",
      "whatItTestsZh": "模型、提示詞、工具與來源的版本治理",
      "whatItTestsEn": "Version governance for models, prompts, tools, and sources",
      "answerZh15": "將所有依賴版本化並綁定測試結果；任何一層變更都先跑相同測試集，再比較差異並保留回復版本。",
      "answerEn15": "Version every dependency and bind it to evaluation results. Any change should run the same test set, compare differences, and retain a rollback version.",
      "answerZhLong": [
        "每次執行記錄模型、提示詞、技能、工具結構、核准來源與產物版本，避免「同一流程」其實讀到不同契約。",
        "變更先用黃金測試集比較正確性、格式、引用、安全、耗時與成本，並檢查下游是否仍能讀取交接產物。",
        "只有通過門檻才小範圍發布；若發生契約破壞、權限問題或關鍵品質下降，就回復舊版本。我有版本／交接設計經驗，但不宣稱已管理企業生產模型發布。"
      ],
      "answerEnLong": [
        "Each run records model, prompt, skill, tool schema, approved sources, and artifact versions so the “same workflow” cannot silently use a different contract.",
        "Changes run against a golden set for correctness, format, citations, safety, latency, and cost, including whether downstream stages can still consume the handoff artifact.",
        "Only passing changes receive limited rollout. Contract breakage, permission issues, or critical quality loss triggers rollback. I have version and handoff-design experience, but I do not claim enterprise production model-release ownership."
      ],
      "followUpZh": "來源文件更新是否一定要重跑所有流程？",
      "followUpEn": "Does every source-document update require rerunning the entire workflow?",
      "evidence": [
        "DIRECT",
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "AI-012",
      "slug": "ai-012",
      "category": "ai",
      "categoryZh": "人工智慧工作流程",
      "categoryEn": "AI Agent Workflow Domain Know-how",
      "titleZh": "AI 能力缺口與兩週上手計畫",
      "questionZh": "你的正式 AI（人工智慧）經驗有限，若只有兩週熟悉產品並開始面對客戶，你會如何補足差距？",
      "questionEn": "Your formal AI experience is limited. How would you close the gap if you had two weeks to learn the product and begin facing customers?",
      "whatItTestsZh": "學習計畫、客戶準備與能力邊界",
      "whatItTestsEn": "Learning plan, customer readiness, and capability boundaries",
      "answerZh15": "我會把兩週目標定為能安全完成探索、文件與低風險溝通，不假裝成領域專家；高風險解法與承諾仍需資深顧問或工程核准。",
      "answerEn15": "My two-week goal would be safe discovery, documentation, and low-risk communication rather than pretending to be a domain expert. High-risk solution commitments still require senior consultant or engineering approval.",
      "answerZhLong": [
        "第一週建立產品地圖：目標客群、核心使用情境、資料、模型／工具、權限、已知限制、案例、常見失敗與支援流程，並跟關鍵負責人校正。",
        "第二週跟隨觀察客戶會議、重做一個既有案例、產出問題清單與會議摘要，再由資深同事審查後逐步承擔部分討論。",
        "我可以獨立做需求探索、流程整理、原型與決策紀錄；架構承諾、資安／法遵判斷、估時與正式部署需要對應負責人確認。"
      ],
      "answerEnLong": [
        "In week one, I build a product map covering target users, core use cases, data, models and tools, permissions, known limits, reference cases, common failures, and support flow, then validate it with key owners.",
        "In week two, I shadow customer meetings, reproduce one existing case, prepare question lists and meeting summaries, and gradually own part of the discussion after senior review.",
        "I can independently run discovery, map flows, create prototypes, and document decisions. Architecture commitments, security or compliance judgments, estimates, and formal deployment require the accountable owners."
      ],
      "followUpZh": "兩週後如何證明你已能獨立處理部分工作？",
      "followUpEn": "How would you prove after two weeks that you can own part of the work independently?",
      "evidence": [
        "DIRECT",
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-001",
      "slug": "gen-001",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "60–90 秒自我介紹",
      "questionZh": "請在 60–90 秒內介紹你自己。",
      "questionEn": "Please introduce yourself in 60 to 90 seconds.",
      "whatItTestsZh": "資歷、職涯主線、角色適配與表達結構",
      "whatItTestsEn": "Seniority, career narrative, role fit, and communication structure",
      "answerZh15": "我有約十年產品管理經驗，近年聚焦中心化交易所、資產帳戶、交易系統與風控，也建立過人工智慧輔助產品交付流程。",
      "answerEn15": "I have around ten years of product management experience, recently focused on centralized exchanges, asset accounts, trading systems, risk controls, and AI-assisted product delivery.",
      "answerZhLong": [
        "我有約十年產品管理經驗，從客戶型數位產品走到去中心化網路、交易系統與平台產品。",
        "最相關的經歷是從產品經理升任產品主管，帶領 3 位產品與 2 位設計，和跨區團隊在四個月內完成 0→1 中心化交易所發布；我負責帳戶／錢包矩陣、資產快照、充提、審批、風控與對帳等產品需求。",
        "最近我也設計角色式人工智慧工作流程，把需求轉成產品文件、線框圖與原型。我的強項是把複雜規則、資料語意與跨團隊責任整理成可交付產品；工程與資料實作仍由對應團隊負責。"
      ],
      "answerEnLong": [
        "I have around ten years of product management experience, progressing from client-facing digital products into Web3, trading systems, and platform products.",
        "In my most relevant role, I progressed from product manager to product lead, led three product managers and two designers, and worked with cross-regional teams on a four-month zero-to-one exchange launch. My product scope included account and wallet matrices, asset snapshots, deposits and withdrawals, approvals, risk controls, and reconciliation requirements.",
        "More recently, I designed a role-based AI workflow from requirements to product documents, wireframes, and prototypes. My strength is turning complex rules, data semantics, and cross-team ownership into deliverable products, while engineering and data teams own implementation."
      ],
      "followUpZh": "哪段經歷最能代表你的資深程度？",
      "followUpEn": "Which experience best demonstrates your seniority?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-002",
      "slug": "gen-002",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "最喜歡的產品類型",
      "questionZh": "你做過的產品中最喜歡哪一類？為什麼？",
      "questionEn": "Which type of product have you enjoyed most, and why?",
      "whatItTestsZh": "產品動機、價值觀與長期興趣",
      "whatItTestsEn": "Product motivation, values, and long-term interest",
      "answerZh15": "我最喜歡交易與資產平台，因為使用者回饋直接、資料和狀態要求嚴謹，而且產品決策會同時影響信任、風險與商業結果。",
      "answerEn15": "I enjoy trading and asset platforms because user feedback is direct, data and state requirements are rigorous, and product decisions affect trust, risk, and business outcomes at the same time.",
      "answerZhLong": [
        "交易產品需要把帳戶、資產、價格、成交、風控與營運流程連起來，這類複雜系統最符合我的長處。",
        "使用者能快速感受到報價、餘額、充提和交易結果是否正確，產品經理不能只做頁面，也要能理解資料與例外。",
        "我喜歡這種高責任、快速回饋的環境，但不會用未公開公司資訊或誇大的營運數字證明熱情；我會用實際產品範圍和決策說明。"
      ],
      "answerEnLong": [
        "Trading products connect accounts, assets, prices, execution, risk, and operations, which fits my strength in complex system design.",
        "Users immediately notice whether quotes, balances, deposits, withdrawals, and trade results are correct, so a product manager must understand data and exceptions rather than only pages.",
        "I enjoy that high-responsibility, fast-feedback environment, but I would not use confidential company information or inflated operating numbers to demonstrate motivation. I use actual product scope and decisions."
      ],
      "followUpZh": "你不喜歡哪類產品？",
      "followUpEn": "Which type of product do you enjoy less?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-003",
      "slug": "gen-003",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "目前狀態與離職原因",
      "questionZh": "你目前還在原公司嗎？為什麼離開上一份工作？",
      "questionEn": "Are you still with your previous company, and why did you leave?",
      "whatItTestsZh": "任職狀態、離職誠信與下一步方向",
      "whatItTestsEn": "Employment status, departure integrity, and next direction",
      "answerZh15": "我的最後工作日是 2026 年 6 月 30 日，離開背景是組織調整與人力縮編，不是主動裸辭或績效問題。",
      "answerEn15": "My last working day was June 30, 2026. The role ended because of organizational restructuring and headcount reduction, not a voluntary resignation or performance issue.",
      "answerZhLong": [
        "我已離開奇換橘子，最後工作日是 2026 年 6 月 30 日；原因是組織調整與人力縮編。",
        "在該角色中，我累積了去中心化網路錢包、資產對帳需求與人工智慧輔助產品流程經驗。",
        "我現在希望下一個角色更直接使用我在中心化交易所帳戶、資產資料、交易產品與複雜平台交付的核心能力。我不會把離職改寫成主動尋求挑戰。"
      ],
      "answerEnLong": [
        "I have left Xchanger, and my final working day was June 30, 2026. The reason was organizational restructuring and headcount reduction.",
        "In that role, I gained experience in Web3 wallet flows, asset-reconciliation requirements, and AI-assisted product workflows.",
        "I am now looking for a role that more directly uses my strengths in centralized-exchange accounts, asset data, trading products, and complex platform delivery. I do not rewrite the departure as a voluntary search for a new challenge."
      ],
      "followUpZh": "你離職後如何準備下一份工作？",
      "followUpEn": "How have you prepared for your next role since leaving?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-004",
      "slug": "gen-004",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "為什麼公司、職位與現在",
      "questionZh": "為什麼想加入這家公司、應徵這個角色，而且是現在？",
      "questionEn": "Why do you want to join this company in this role, and why now?",
      "whatItTestsZh": "公司／角色動機與證據型適配",
      "whatItTestsEn": "Company and role motivation grounded in evidence",
      "answerZh15": "我會把動機連到角色真正要解決的問題、我的直接證據與需要深化的能力，而不是只說品牌或產業熱門。",
      "answerEn15": "I connect my motivation to the real problem the role solves, my direct evidence, and the capability I want to deepen rather than only mention brand or industry popularity.",
      "answerZhLong": [
        "先指出職務中的核心問題，例如資產總覽、損益、流水、資料準確度、客戶產品化或人工智慧工作流程治理。",
        "再連到我的直接證據：中心化交易所帳戶／錢包矩陣、資產快照、充提／風控／對帳需求、五人產品設計團隊與人工智慧輔助產品交付。",
        "最後說明規模化資料、正式企業軟體服務或生產人工智慧部署是需要深化的部分。這樣同時表達價值與真實缺口，不用泛泛說「想挑戰自己」。"
      ],
      "answerEnLong": [
        "I begin with the role’s core problem, such as asset overview, profit and loss, transaction history, data accuracy, customer productization, or AI-workflow governance.",
        "I connect that problem to direct evidence: exchange account and wallet matrices, asset snapshots, deposit, withdrawal, risk, and reconciliation requirements, leadership of a five-person product and design team, and AI-assisted delivery.",
        "I then state the area I still need to deepen, such as scaled data systems, formal software-as-a-service experience, or production AI deployment. That shows both value and an honest gap rather than a generic desire for challenge."
      ],
      "followUpZh": "如果同時有其他機會，這份工作的選擇標準是什麼？",
      "followUpEn": "If you have other opportunities, how would you evaluate this one?",
      "evidence": [
        "DIRECT",
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-005",
      "slug": "gen-005",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "轉換跑道與產品／專案角色偏好",
      "questionZh": "你是在轉換跑道嗎？比較喜歡產品經理還是專案經理？",
      "questionEn": "Are you changing career direction, and do you prefer product management or project management?",
      "whatItTestsZh": "職涯方向與產品／專案角色承諾",
      "whatItTestsEn": "Career direction and commitment to product versus project roles",
      "answerZh15": "我的核心仍是產品管理；我可以承擔專案治理與客戶協作，但長期價值在於問題定義、產品判斷與可重用能力，而不是純行政排程。",
      "answerEn15": "Product management remains my core. I can own project governance, but my long-term value is problem definition, product judgment, and reusable capabilities rather than administrative scheduling alone.",
      "answerZhLong": [
        "我的十年主線是產品規劃、流程／系統設計、跨團隊交付與持續改善，不是從零轉入完全陌生職能。",
        "專案管理的時程、資源、風險與期待管理是我工作的一部分；如果角色還需要理解產品、客戶問題與解法品質，我能接受並貢獻。",
        "如果角色實際只剩行政追蹤，則與我的長期方向不符。我會在面試中確認產品決策權、客戶責任、交付範圍與成功標準，不把職稱當唯一判斷。"
      ],
      "answerEnLong": [
        "My ten-year career path has consistently involved product planning, process and system design, cross-team delivery, and improvement. This is not a complete career reset.",
        "Schedule, resources, risk, and expectation management are part of my work. I can contribute when a project role also requires understanding products, customer problems, and solution quality.",
        "If the role is only administrative tracking, it would not fit my long-term direction. I therefore clarify product authority, customer responsibility, delivery scope, and success criteria rather than judge only by title."
      ],
      "followUpZh": "什麼職責會讓你長期留下？",
      "followUpEn": "Which responsibilities would make the role sustainable for you long term?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-006",
      "slug": "gen-006",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "壓力、快速上手與承諾",
      "questionZh": "角色壓力大、客戶難溝通，且需要快速上手，你有心理準備嗎？",
      "questionEn": "This role is high-pressure, involves difficult customers, and requires fast learning. Are you prepared for that?",
      "whatItTestsZh": "壓力下的風險意識、學習與支援判斷",
      "whatItTestsEn": "Risk awareness, learning, and support judgment under pressure",
      "answerZh15": "我可以接受高強度與邊做邊學，但不會用「我抗壓」取代風險管理；我會先確認目標、支援、權限與不能獨立承諾的範圍。",
      "answerEn15": "I can work at high intensity and learn while delivering, but pressure never replaces risk management. I clarify goals, support, authority, and commitments I cannot make independently.",
      "answerZhLong": [
        "我曾在小團隊、跨區協作與四個月 0→1 發布中工作，熟悉高密度決策與複雜依賴。",
        "新領域我會建立產品地圖、跟隨觀察會議、重做既有案例，並用問題清單與決策紀錄加速上手，而不是假裝第一天就懂。",
        "我可以獨立做探索、流程、文件與低風險溝通；架構、法遵、資安、估時與商業承諾要由相應負責人核准。可持續壓力需要清楚優先順序，不是無限承接。"
      ],
      "answerEnLong": [
        "I have worked in small teams, cross-regional collaboration, and a four-month zero-to-one launch, so I understand dense decisions and complex dependencies.",
        "In a new domain, I build a product map, shadow meetings, reproduce an existing case, and use question lists and decision records rather than pretend to understand everything immediately.",
        "I can independently own discovery, flows, documentation, and low-risk communication. Architecture, compliance, security, estimates, and commercial commitments require accountable owners. Sustainable pressure still needs clear priorities."
      ],
      "followUpZh": "什麼情況下你會要求更多支援？",
      "followUpEn": "When would you request additional support?",
      "evidence": [
        "DIRECT",
        "TRANSFERABLE"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-007",
      "slug": "gen-007",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "理想主管與團隊文化",
      "questionZh": "你期待什麼樣的主管與團隊文化？",
      "questionEn": "What kind of manager and team culture do you prefer?",
      "whatItTestsZh": "主管與團隊文化偏好",
      "whatItTestsEn": "Manager and team-culture preferences",
      "answerZh15": "我期待目標與成功標準清楚、重大取捨有人協助決策，同時讓專業角色有發揮空間；團隊能尊重事實並及早揭露風險。",
      "answerEn15": "I value clear objectives and success criteria, decision support for major tradeoffs, professional autonomy, fact-based discussion, and early risk disclosure.",
      "answerZhLong": [
        "我希望主管說明產品目標、成功標準與重大決策背景，並在跨部門衝突時協助整合，不需要介入每個執行細節。",
        "我重視就事論事、相互尊重、權限與保密邊界，以及能在問題還可控時提出風險。",
        "加入後我會先理解既有治理，再透過文件標準化、技術預審或適合的人工智慧工具逐步改善，不會一開始就要求團隊全面改變。"
      ],
      "answerEnLong": [
        "I expect a manager to explain product goals, success criteria, and the context behind major decisions and to help resolve cross-functional conflicts without controlling every execution detail.",
        "I value respectful, fact-based discussion, appropriate permission and confidentiality boundaries, and raising risks while they are still manageable.",
        "After joining, I first understand existing governance, then improve collaboration gradually through documentation standards, technical pre-review, or appropriate AI tools rather than demand immediate organization-wide change."
      ],
      "followUpZh": "你最難適應哪種文化？",
      "followUpEn": "Which type of culture is hardest for you to adapt to?",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-008",
      "slug": "gen-008",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "臨時切換英文",
      "questionZh": "如果會議臨時切換成英文，你如何維持清楚的報告？",
      "questionEn": "How would you stay clear if a meeting suddenly switched to English?",
      "whatItTestsZh": "臨時英文切換下的理解與結構化表達",
      "whatItTestsEn": "Comprehension and structured communication during an English switch",
      "answerZh15": "我會先確認問題，再用「問題、建議、風險、需要的決定」四段短句回答；聽不清楚就請對方重述，不假裝理解。",
      "answerEn15": "I confirm the question, then answer in four short parts: problem, recommendation, risk, and decision needed. If I miss something, I ask for clarification rather than pretend to understand.",
      "answerZhLong": [
        "我會先說：「讓我用英文整理這個決定與主要風險。」必要時確認對方是在問頁面、資料還是執行狀態。",
        "英文報告只保留四件事：目前問題、影響範圍、我的建議與原因、尚需哪位負責人確認什麼。",
        "我的英文程度是中等，這是需要持續練習的風險；我用短句與結構確保內容正確，不追求華麗詞彙，也不因緊張補造事實。"
      ],
      "answerEnLong": [
        "I begin with, “Let me summarize the decision and the main risks in English.” If needed, I clarify whether the question concerns the page experience, data definition, or execution status.",
        "I keep the update to the current problem, affected scope, my recommendation and rationale, and the decision or confirmation needed from an owner.",
        "My English level is intermediate and requires continued practice. I use short sentences and structure to protect accuracy rather than pursue sophisticated vocabulary or add unverified facts under pressure."
      ],
      "followUpZh": "請用 30 秒英文報告一個資料問題。",
      "followUpEn": "Please give a 30-second English update on a data issue.",
      "evidence": [
        "DIRECT"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-009",
      "slug": "gen-009",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "合約、職級、工作型態與薪資",
      "questionZh": "你是否接受合約職？薪資期待與到職條件是什麼？",
      "questionEn": "Are you open to a contract role, and what are your compensation and start-date expectations?",
      "whatItTestsZh": "合約風險、條件確認與薪資溝通成熟度",
      "whatItTestsEn": "Contract-risk assessment, term clarification, and compensation maturity",
      "answerZh15": "我願意認真評估，但會先確認首約期間、續約條件、雇主實體、福利、工作型態與職級範圍，再討論具體薪資。",
      "answerEn15": "I am open to evaluating it seriously, but I would first confirm contract length, renewal conditions, legal employer, benefits, work model, and level before discussing a specific number.",
      "answerZhLong": [
        "這類角色如果工作內容與我的中心化交易所資產經驗高度吻合，我不會因合約形式直接排除。",
        "決定前要取得書面資訊：首約是否為 6–12 個月或 12 個月、續約評估時間／條件、法定雇主與薪資發放實體、福利、試用／終止條款、工作地與時區。",
        "我目前會先了解完整總報酬、職級與適用市場，再提出具體薪資期待，不在資訊不足時先報一個缺乏依據的區間；法律與稅務條款則需要專業人士確認。"
      ],
      "answerEnLong": [
        "I would not reject a contract role when the work strongly matches my centralized-exchange asset experience.",
        "Before deciding, I would request written details on whether the initial term is six to twelve months or a fixed twelve months, the renewal review, legal and payroll entity, benefits, probation or termination terms, location, and timezone.",
        "I would first understand total compensation, level, and the applicable market before giving a specific expectation. I would not anchor on an unsupported range while key information is missing, and I would have legal or tax terms reviewed professionally."
      ],
      "followUpZh": "合約未續約的最大風險你如何評估？",
      "followUpEn": "How would you evaluate the risk that the contract is not renewed?",
      "evidence": [
        "UNKNOWN"
      ],
      "timingStatus": "TIMING_HOLD"
    },
    {
      "id": "GEN-010",
      "slug": "gen-010",
      "category": "general",
      "categoryZh": "通用",
      "categoryEn": "General Interview Questions",
      "titleZh": "候選人反問與面試收尾",
      "questionZh": "面試最後你會問面試官什麼？",
      "questionEn": "What would you ask the interviewer at the end of the interview?",
      "whatItTestsZh": "反問題品質、角色判斷與面試收尾",
      "whatItTestsEn": "Quality of candidate questions, role judgment, and interview closing",
      "answerZh15": "我會問角色前六個月的成功標準、目前最大問題、決策權與跨團隊分工，再確認流程與合約未知，不問網站可查到的資訊。",
      "answerEn15": "I ask about six-month success, the biggest current problem, decision authority, cross-team ownership, and unresolved process or contract details rather than information already available online.",
      "answerZhLong": [
        "先問結果：「這個角色前六個月最需要改變什麼？成功會用哪些可觀察結果判斷？」",
        "再問運作：「目前最難的是定義、資料品質、組織協作還是交付？產品、資料、工程、風控與法遵的決策分工如何？」",
        "最後問條件：「高階英文會議常見報告格式是什麼？下一步流程、合約期間、續約與工作型態何時能取得書面資訊？」不預設面試官已承諾答案。"
      ],
      "answerEnLong": [
        "I begin with outcomes: “What should this role change during the first six months, and which observable results would define success?”",
        "I ask about operating reality: “Is the hardest problem definition, data quality, organizational alignment, or delivery, and how are decisions divided across product, data, engineering, risk, and compliance?”",
        "I close with conditions: “What English update format is common in executive meetings, and when will written details on the process, contract term, renewal, and work model be available?” I do not assume commitments that have not been made."
      ],
      "followUpZh": "如果只能問一題，你會選哪一題？",
      "followUpEn": "If you could ask only one question, which would you choose?",
      "evidence": [
        "DOMAIN_PRINCIPLE"
      ],
      "timingStatus": "TIMING_HOLD"
    }
  ]
});
