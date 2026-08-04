// Generated from interviews/omnichat source material. Do not edit by hand.
window.INTERVIEW_DATA = {
  "builtAt": "2026-08-01",
  "sourceFiles": [
    "00-gap-report.md",
    "01-role-scorecard.md",
    "03-crm-cdp-domain-brief.md",
    "04-experience-mapping.md",
    "05-repeat-purchase-product-case.md",
    "06-pm-lead-story-bank.md",
    "07-pm-lead-question-bank.md",
    "14-final-cheat-sheet.md",
    "evidence/p1-cto-claim-ledger.md",
    "08-cto-question-bank.md",
    "09-agentic-pjm-workflow.md",
    "15-cto-cheat-sheet.md"
  ],
  "stories": [
    {
      "id": "S1",
      "title": "四個月 0-to-1 CEX：把複雜需求變成可交付架構",
      "answer": "我帶五人產品／設計團隊做 0-to-1 CEX 時，範圍同時包含帳戶、錢包、交易、返佣、風控、審批與營運後台。我沒有把它當成功能清單，而是先定帳戶與資產模型，再按交易主路徑、風險控制與營運能力拆成模組，透過技術預審確認依賴。團隊最後在四個月內完成平台上線；我的核心貢獻是架構、優先順序與跨區協作。",
      "deep": "**你本人做了什麼？** 定義架構、模組、優先順序、review gate，並協調台灣與杜拜產品端。",
      "boundary": "不說「我一個人打造整間交易所」或「完整擁有所有工程架構」。\n不說四個月上線帶來未記載的收入、用戶或交易量。"
    },
    {
      "id": "S2",
      "title": "BANXA／法幣買幣：把第三方 handoff 做成完整狀態流程",
      "answer": "法幣買幣整合的難點是平台、KYC provider、付款與訂單各有自己的狀態。我負責把資格檢查、第三方 handoff、待付款、拒絕、取消、退款、異常與完成拆成同一套 journey，並定義前台提示與後台可見資訊。這讓正常流程和例外都能用共同規則溝通；我的 ownership 是產品流程，不是 API 或支付清算實作。",
      "deep": "**外部與內部狀態衝突怎麼辦？** 先定 Source of Truth、可回復狀態與人工處理入口，不能只覆寫成最後一次 callback。",
      "boundary": "不說親自實作 BANXA API、webhook、retry／DLQ 或支付清算。\n不引用 conversion、交易額或 provider SLA。"
    },
    {
      "id": "S3",
      "title": "Futures Grid：與工程處理限制，不把意見不同變成人際衝突",
      "answer": "Grid 產品規劃時，產品期待是支援完整策略，但工程與系統限制牽涉共用保證金、強平、流動性與 robot hedging。我沒有用「需求一定要做」壓過限制，而是把策略狀態、風險提示、manual termination 與未解問題寫清楚，讓團隊逐項決定可交付範圍。這是一個技術取捨案例，不是我會誇大的衝突故事。",
      "deep": "**最後誰決策？** 依風險與可行性由產品、工程及相關 owner 共同 review；資料庫未記錄個別決策者，不補寫。",
      "boundary": "不塑造「我說服工程」的英雄敘事。\n不說本人開發 margin engine、trading bot 或量化演算法程式。"
    },
    {
      "id": "S4",
      "title": "PM Cross-Review：保留 owner，也降低單點盲區",
      "answer": "面對第三方整合與複雜邏輯，我發現單一 PM 從頭做到尾容易漏掉跨系統狀態。我的調整不是增加一層簽核，而是保留一位 PM 當 owner，在架構、關鍵邏輯與資料流的早期節點加入 peer review。另一位 PM 專門挑戰假設、例外與狀態，降低交付前盲區，同時不稀釋 ownership。",
      "deep": "**如何避免 review 變官僚？** 只在高風險架構、共用 data model、跨 module contract 設 gate。",
      "boundary": "不說已帶過六位 PM；已證範圍是五人產品／設計團隊，其中三位 PM、兩位 Design。\n不把此故事用作個人失敗或量化品質提升證據。"
    },
    {
      "id": "S5",
      "title": "多層審批與風控：高影響操作不能只靠 UI 隱藏",
      "answer": "我設計交易所後台時，提款、返佣、KYC 國籍與期貨風控等設定都可能造成高影響，不能只靠頁面權限。我把操作拆成角色、風險等級、1–6 層可配置審批、狀態與 audit requirement，並保留拒絕、重置與人工處理路徑。重點是把治理放進產品模型，而不是上線前才補一個簽核按鈕。",
      "deep": "**所有操作都多層簽核嗎？** 不會；層級應依風險與組織政策配置，避免低風險流程被治理成本拖垮。",
      "boundary": "不說是 AML／資安專家或宣稱量化降低 fraud。\n不展示敏感權限表、帳號或內部風控閾值。"
    },
    {
      "id": "S6",
      "title": "NFT on-chain／off-chain reconciliation：先定誰的狀態算數",
      "answer": "在 Xchanger NFT 規劃中，提領安全不只看鏈上交易，也要處理平台與鏈上狀態不一致。我負責定義 wallet connection、簽署、資產轉移與 reconciliation requirements，要求把狀態來源、確認與營運可見性說清楚。這是產品流程 ownership，不是 smart contract 實作。",
      "deep": "**Source of Truth 是鏈上嗎？** 資產所有權通常看鏈上，但平台 workflow、資格與展示仍有自己的狀態；需定義 reconciliation，而不是一句話全部交給鏈。",
      "boundary": "不說完成 production WalletConnect、smart contract 或監控系統。\n不宣稱降低資產事故或完成多少筆交易。"
    },
    {
      "id": "S7",
      "title": "MODA 溝通：把一次做滿調整成 B2C 先行、C2C 後續",
      "answer": "Xchanger 規劃遊戲道具交易時，原本要處理 B2C 與 C2C，但 C2C 的交易與治理複雜度更高。我整理產品資料流、平台邏輯與 KYC／營運控制，支持與數位發展部溝通；回饋是先做 B2C，再逐步申請開放 C2C。這不是硬拒絕需求，而是把高風險範圍轉成可治理的分階段路線。",
      "deep": "**你拒絕了誰？** 不應這樣說；是依 regulator feedback 調整 rollout，並非候選人單獨否決 stakeholder。",
      "boundary": "不說已取得政府核准或正式 launch。\n不把外部建議改寫成候選人單獨的策略勝利。"
    },
    {
      "id": "S8",
      "title": "角色型 AI Workflow：把「用 AI 加快開發」收斂成產品流程",
      "answer": "「用 AI 加快產品開發」太模糊，我把它改成角色、輸入、產物與 gate：PM 產出 PRD，UI/UX 接續 flow，Front-End 使用已確認產物；每階段放到固定位置並由使用者確認才往下。AI 因此變成可檢查的 workflow。證據支持結構，不支持企業 rollout 或量化成效。",
      "deep": "**為什麼不是一個 Agent 全做？** 分角色讓輸入、輸出、責任與錯誤位置可見，也方便人類在關鍵節點介入。",
      "boundary": "不說原公司全面採用、提升特定百分比或 days-to-hours。\n不把個人 Codex 延伸歸因成公司職務成果。"
    },
    {
      "id": "S9",
      "title": "Sumsub／Authme KYC：快速建立陌生 domain 的決策模型",
      "answer": "接觸 KYC vendor 時，我先把文件、人臉／機審、資格、人工審核、拒絕與恢復放進交易 journey，再比較 Sumsub、Authme 能否支援。這讓陌生 domain 的學習連回產品決策。我的 ownership 是 research 與 integration flow，不是 SDK 開發。",
      "deep": "**怎麼知道學到足夠？** 能畫出角色、資料、狀態、失敗與 decision boundary，並讓 domain／engineering owner review。",
      "boundary": "不說親自整合 SDK／API、負責 webhook 或完成 production rollout。\n不虛構幾天學會、KYC 通過率或審核效率。"
    }
  ],
  "questions": [
    {
      "number": 1,
      "title": "為什麼想加入 Omnichat？",
      "framework": "產品問題吸引力 → 可轉移能力 → 真實缺口",
      "answer": "我想做的是把多渠道、資料與營運問題變成可持續的平台能力。Omnichat 公開產品涵蓋 Social CDP、Customer Journey 與跨渠道對話，和我過去處理第三方整合、多狀態、權限及後台治理的問題結構相近。我沒有直接 CRM／CDP 任職經驗，這是已知 Gap；吸引我的正是把既有 platform craft 用在新的客戶生命週期場景。",
      "followUp": "你最想先負責哪個 module？／為什麼不留在 Web3？",
      "boundary": "不要暗示 Omnichat 已指定 module；不要貶低 Web3 或說只是想換產業。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 2,
      "title": "為什麼是 Senior PM，而不是一般 PM？",
      "framework": "scope → decision quality → leadership without inflation",
      "answer": "我的 seniority 來自約十年產品經驗、複雜平台 ownership、帶五人產品／設計團隊與跨區交付。我能把帳戶、狀態、風險、審批與第三方 handoff 組成可交付架構，也知道何時保留限制。這不代表我第一天就是 CRM expert，而是能以 Senior PM 的方法降低新 domain 的交付風險。",
      "followUp": "最能證明 seniority 的決策？／你親自做什麼？",
      "boundary": "用 S1；不把團隊上線說成個人完成，不聲稱管理工程團隊。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 3,
      "title": "你能為 PM Lead 帶來什麼？",
      "framework": "三項能力 → 具體做法 → 不越權",
      "answer": "第一是複雜需求拆解，第二是第三方整合與高風險治理，第三是 single-owner 加 risk-based peer review 的協作方法。我會先理解既有分工，再把 common data／state／exception 提早拉出來 review；不會第一天重做流程，也不預設自己有跨 PM 決策權。",
      "followUp": "第一個月具體產出？／如果 PM Lead 不想改流程？",
      "boundary": "引用 S4；不說已帶過六位 PM或已知內部痛點。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 4,
      "title": "你沒有 CRM／CDP 經驗，為何能勝任？",
      "framework": "承認 Gap → 可轉移 evidence → 降低風險方法",
      "answer": "這個 Gap 是真的，我不會把 CEX 或 KYC 改稱 CRM。我可轉移的是第三方 handoff、多狀態、Source of Truth、權限審批與 operator recovery；目前也已能白板說明 Customer 360、Identity、Consent、Segment 與 Journey。加入後我會先對齊真實資料模型、客戶問題與指標，再從範圍清楚的 module 交付。",
      "followUp": "底層相似，為何不算直接經驗？／前三十天怎麼補？",
      "boundary": "不得說「其實都一樣」或自稱 CRM expert。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 5,
      "title": "Identity Resolution 跟 KYC 有什麼不同？",
      "framework": "各自目的 → 相交處 → 不可互換",
      "answer": "KYC 判斷身份與交易資格，Identity Resolution 則判斷不同 identifier 是否屬於同一 customer profile。兩者都需要證據、信心與人工處理，但錯誤後果與資料責任不同。我的 KYC 經驗只能支持 eligibility 與 review gate；Customer 360 的 merge／split、Consent propagation 仍需依 CRM 資料模型重新學習。",
      "followUp": "email 相同可以直接 merge 嗎？／誤合併如何處理？",
      "boundary": "不要把 deterministic matching 說成萬無一失，也不虛構既有 merge production 經驗。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 6,
      "title": "你會如何快速補上 CRM Domain？",
      "framework": "object map → real cases → supervised delivery",
      "answer": "我會先畫 customer、identifier、Consent、event、order、segment、journey 與 channel 的資料流和 Source of Truth；再跟 PM、工程、CS／Sales 看常見 integration failure 與真實客戶案例。最後選一個邊界清楚的問題，在 domain owner review 下完成 baseline、MVP、metrics 與 rollout，而不是只上課或先承諾重構 CDP。",
      "followUp": "怎麼知道已學會？／若文件與實際系統不同？",
      "boundary": "不要承諾固定天數成為專家；以 review 通過與可交付結果驗證。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 7,
      "title": "大客戶要求客製功能，你怎麼決定接不接？",
      "framework": "problem → repeatability → architecture／economics／risk → decision",
      "answer": "先確認客戶結果與 workaround，再看需求是否代表可重複 segment、是否能透過 configuration／extension point 解決、是否污染共用 data model，並比較收入、維護成本、opportunity cost 與合規風險。可重用就產品化；單一需求可用有邊界的服務或 integration；破壞核心且無法承擔就縮範圍或拒絕。",
      "followUp": "最大客戶威脅流失呢？／誰做最後決定？",
      "boundary": "這是方法，不是既有完整 commercial case；不要虛構 ACV 或 margin。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 8,
      "title": "如何把三個客戶的不同需求抽象成平台能力？",
      "framework": "jobs／invariants／variants → common model → migration",
      "answer": "先把原始需求拆成共同 job、角色、資料物件、狀態與例外，找出 invariant；客戶差異則分類為 policy、configuration、content 或真正 extension。共用能力要有 owner、contract、version 與 default behavior；不能只把三套 if-else 塞進核心。S2 的 provider state 與 S4 的 peer review可支持這種拆法。",
      "followUp": "何時接受 feature flag？／如何避免過度抽象？",
      "boundary": "不要聲稱已在 multi-tenant CRM 完成產品化；這是相鄰能力與方法。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 9,
      "title": "Sales 已承諾客戶，但產品做不到，你怎麼處理？",
      "framework": "確認承諾 → options／impact → decision owner → customer recovery",
      "answer": "先確認承諾文字、客戶真正結果、時程與不可逆風險；和工程整理可行選項，例如縮 scope、manual service、beta 或分階段，再由有權 owner 決定。對客戶要給清楚的新範圍、責任與驗收，不讓產品默默接下無限承諾。若涉及隱私或資料安全，不能用商務壓力跳過 gate。",
      "followUp": "如果 Sales 不同意？／如何保住關係？",
      "boundary": "不把 Sales 描述成問題；現有資料沒有這個真實事件，不要用第一人稱過往成果口吻。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 10,
      "title": "你如何排 CRM 平台 Roadmap？",
      "framework": "outcome → segments／problems → enablers → evidence／risk",
      "answer": "先對齊客戶與商業 outcome，再按 segment 找主要 friction；接著把需求分成 customer-facing、platform enabler、reliability／governance。排序同時看 reach、impact、confidence、effort、strategic fit 與 risk reduction，並揭露資料品質、identity、Consent 等 prerequisite。Roadmap 是決策序列，不是 feature 日期清單。",
      "followUp": "技術債怎麼排？／Revenue request 一定優先嗎？",
      "boundary": "不引用不存在的 Omnichat roadmap 或假分數。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 11,
      "title": "如何在成長功能和資料品質間取捨？",
      "framework": "harm／dependency → minimum quality gate → staged delivery",
      "answer": "若資料錯誤會造成 wrong-person message、unauthorized send 或指標不可判定，資料品質是 launch gate；如果只是低風險完整度，可限制 segment、標示 unknown 並小流量驗證。不是「先修完所有資料」或「先上功能再說」，而是依錯誤成本決定最小可靠條件與 rollback。",
      "followUp": "如何量化 data quality？／什麼情況停發？",
      "boundary": "可引用 05 Case；門檻必須由真實 baseline 與 owner 決定。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 12,
      "title": "需求很多、工程容量不足時怎麼辦？",
      "framework": "capacity constraint → outcome slices → dependencies → explicit cuts",
      "answer": "把需求改寫成決策與 outcome，先找最小完整切片，不平均砍每項 scope。每個候選項標出 customer value、風險、依賴、learning value 與延後成本；明確列 not now 和受影響 stakeholder。S1 的做法是先守主路徑、資產可追溯、風控與營運，再擴延伸能力。",
      "followUp": "誰不滿怎麼辦？／如何處理 urgent request？",
      "boundary": "不把「四個月」當成任何產品都能複製的承諾。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 13,
      "title": "六位 PM 共用平台，如何避免互相踩線？",
      "framework": "ownership map → shared contracts → decision cadence",
      "answer": "先定 product area owner、shared object／API owner 與 decision boundary；共用 customer、identity、Consent、event、journey state 要有 schema／version contract。日常由 owner 決定，只有跨 module、高風險或 irreversible change 進 cross-review，decision log 記錄取捨。S4 的原則是 single owner，不是集體 ownership。",
      "followUp": "衝突誰決定？／shared metric 歸誰？",
      "boundary": "不假設 Omnichat 現行分工，也不說已管理六位 PM。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 14,
      "title": "你會怎麼做 PM Peer Review？",
      "framework": "risk trigger → reviewer lens → SLA → owner retains decision",
      "answer": "只在共用 data model、跨系統 contract、高風險 action 或重大 customer impact 啟動。Reviewer 檢查 problem、state、exception、metric、non-goal，不重寫方案；owner 回應並保留決策，超出 boundary 才升級。衡量 late blocker、reopen 與 escaped exception，同時看 review lead time，避免官僚化。",
      "followUp": "Reviewer 和 owner 都不讓步？／小需求也 review 嗎？",
      "boundary": "既有 S4 沒有量化成效；衡量方式是未來方法。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 15,
      "title": "另一位 PM 改了 shared object，影響你的 roadmap，怎麼辦？",
      "framework": "impact discovery → compatibility options → joint decision → migration",
      "answer": "先確認 schema、consumer、timeline 與 customer impact，不把它當資源衝突。一起比較 backward compatibility、versioning、adapter、migration 或延後的成本，指定 shared owner 與 migration plan；若不可逆且跨多 module，由 PM Lead／architecture owner 決策。之後把 contract test 與 change notice 補進流程。",
      "followUp": "如果已經上線？／誰承擔 migration？",
      "boundary": "這是情境題方法，不包裝成發生過的 Omnichat／CEX incident。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 16,
      "title": "請白板畫 Customer 360 的核心資料模型。",
      "framework": "Customer → Identifier → Consent → Event／Order → Segment／Journey",
      "answer": "Customer／Profile 代表一位可被識別與服務的人，具有平台內部 `customer_id`；Email、Phone、LINE／WhatsApp ID、CRM member ID 是可驗證 Identifier，各自有來源與 confidence。Consent 依 purpose、channel、market 保存，不能只放在 profile boolean。Event 原則上 append-only；Order 是有狀態與版本的 business object。Segment 是動態資格，Journey 有版本與 enrollment state；各欄位另定 Source of Truth、lineage、updated time 與 access。",
      "followUp": "地址相同可 merge 嗎？／shared phone 怎麼辦？",
      "boundary": "這是 domain understanding，不是候選人過去 production schema。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 17,
      "title": "兩個 profile 要不要 merge，怎麼決定？",
      "framework": "strong evidence → conflict check → reversible action → audit",
      "answer": "MVP 只用 verified internal member link 或已驗證、具 uniqueness rule 的強訊號；display name、相似行為或 shared phone 不直接 merge。先做 normalize、conflict／shared-value 檢查，高影響情況隔離人工 review。Merge 要保留 lineage、reason、version 與 split／remediation；Consent 不因 merge 自動放寬。",
      "followUp": "錯 merge 已發訊息怎麼辦？／何時用 probabilistic match？",
      "boundary": "不聲稱零誤合併；probabilistic expansion 要另有 evaluation 與 risk gate。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 18,
      "title": "同一欄位多個系統不同值，誰算數？",
      "framework": "field-level authority → freshness／validity → conflict state",
      "answer": "不能讓「最後寫入」自動獲勝。逐欄定 authority：訂單由 commerce／POS、會員屬性由 CRM、delivery／block 由 channel、journey state 由 orchestration；Consent 看 purpose、channel、market 和撤回時間。無法裁決時保存 conflict 與 lineage，對高影響 action 採較安全 suppression，並建立 reconciliation owner。",
      "followUp": "POS 延遲怎麼辦？／客服手動修改呢？",
      "boundary": "實際權威來源須依 Omnichat 客戶架構確認，不能視為內部現況。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 19,
      "title": "Webhook 重複、延遲、亂序時怎麼設計？",
      "framework": "contract → idempotency／ordering → retry／DLQ → reconciliation",
      "answer": "先定 event ID、entity ID、version／occurred_at、schema 與來源；consumer 需 idempotent，舊版本不能覆寫新狀態。暫時錯誤才有上限 retry，永久錯誤隔離並可追蹤；再用 API／full sync reconciliation 補漏。產品要定 customer-visible result、operator queue、replay 副作用與 recovery SLA，不需假裝 PM 親自寫 queue。",
      "followUp": "沒有 idempotency key 呢？／重播會再發訊息嗎？",
      "boundary": "retry／DLQ 是目前 domain method，不說成過去已 production 實作。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 20,
      "title": "第三方顯示成功、平台顯示失敗怎麼處理？",
      "framework": "freeze action → evidence／SoT → reconcile → communicate",
      "answer": "先停止不可逆後續 action，保留兩側 request、callback、timestamp 與 correlation ID；依物件責任判斷哪一方是 authority，再用查詢或 controlled reconciliation 收斂。使用者看到 pending／under review，而不是假成功；operator 有 owner、SLA 與修復入口。S2 的 provider states、S6 的 reconciliation 是相鄰 evidence。",
      "followUp": "多久後轉人工？／如果 provider 查不到？",
      "boundary": "不說做過 CRM connector incident；不虛構 SLA。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 21,
      "title": "Connector failure 何時 pause Journey？",
      "framework": "harm threshold → blast radius → safe degradation",
      "answer": "若 Consent／suppression、identity、order／refund freshness 或 duplicate protection 失去可信度，就 pause 受影響 segment／tenant／channel；若只是非關鍵 enrich field，可降級並標示 stale。pause 要最小化 blast radius，保留 enrollment 與 trace，修復後 controlled replay，且不得補發已過時訊息。",
      "followUp": "誰有 kill switch？／如何恢復？",
      "boundary": "門檻和 authority 是 Unknown，需由 Product、Engineering、Ops、Privacy 對齊。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 22,
      "title": "如何證明 Journey 真的提高回購？",
      "framework": "eligible cohort → stable control → ITT → primary＋guardrails",
      "answer": "顧客首購且通過 eligibility 時，就以 unified customer 固定隨機分 treatment／control；每位顧客完成 90 天觀察窗後，才進 primary outcome 分析，採 intention-to-treat 比較兩組 repeat-purchase rate。歷史已成熟 cohort 用來估 baseline、MDE 與 sample size。另看 incremental contribution margin；attributed revenue、click 或 AI containment 只作診斷，不能替代增量結果。",
      "followUp": "樣本不夠？／跨渠道污染怎麼辦？",
      "boundary": "baseline、MDE、sample、duration 都是 TBD，不能給漂亮假數字。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 23,
      "title": "Leading metrics 與 Guardrails 怎麼選？",
      "framework": "causal chain → failure diagnostics → harm／economics",
      "answer": "Leading 沿因果鏈選 identity eligibility、entry、timely delivery、qualified reply、AI grounded resolution 與 handoff；Guardrails 看 opt-out、complaint、mismerge、unauthorized／duplicate send、AI error／timeout、CS backlog、refund 與 margin。每個 metric 要有分母、窗口、去重、資料來源和 owner。",
      "followUp": "Open rate 高算成功嗎？／哪個 guardrail 零容忍？",
      "boundary": "不要把 leading metric 上升稱為 business success；法律／隱私事件依 policy 處理。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 24,
      "title": "結果不顯著，但客戶很喜歡，怎麼決定？",
      "framework": "power／data quality → segment effect → cost／strategic value → next test",
      "answer": "先查樣本、MDE、SRM、instrumentation、觀察窗成熟度與污染，不能把不顯著直接解讀成沒效果；再看預先定義 segment 與 qualitative evidence。只有原分析計畫已預先定義續收規則，或顧客觀察窗尚未成熟，才能依計畫繼續；否則要形成新假設並開新一輪實驗，不能看完結果後任意延長。若有服務價值但非回購價值，應另立目標與成本決策。",
      "followUp": "客戶堅持 rollout？／何時停止？",
      "boundary": "避免事後挑 segment 或改 primary metric 美化結果。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 25,
      "title": "工程不同意你的方案，怎麼辦？",
      "framework": "共同 outcome → facts／constraints → options／trade-offs → decision owner",
      "answer": "先確認爭點是可行性、可靠性、成本還是 scope；請工程提出 options 與 failure modes，我把使用者價值、風險、時程和驗收放在同一張 decision table。能縮 MVP 就縮，無法承擔的限制列 launch gate；超出雙方 boundary 由明確 owner 決策。S3 是技術取捨證據，不會被我誇大成激烈衝突。",
      "followUp": "最後你讓步過嗎？／如果 CTO 直接決定？",
      "boundary": "不要塑造總是說服工程，也不要編造個別衝突細節。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 26,
      "title": "如何處理 PM、Sales、CS 對優先級意見不同？",
      "framework": "separate requests from outcomes → common evidence → decision cadence",
      "answer": "把各方主張改寫成客戶 outcome、影響範圍、證據、時效與錯誤成本；共用 baseline 與 decision criteria 比較，不用職稱投票。小範圍可逆決策由 owner 做，跨產品或重大 commercial trade-off 進固定 review。決策後記錄 not now 的原因、重新評估條件與對外溝通 owner。",
      "followUp": "CEO request 呢？／如何避免分析太久？",
      "boundary": "這是管理方法，不聲稱發生過同一個 Omnichat 場景。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 27,
      "title": "請說一次你調整高風險需求的案例。",
      "framework": "original scope → external constraint → phased roadmap → ownership limit",
      "answer": "Xchanger 規劃遊戲道具 B2C／C2C 時，我整理 KYC、資料流、平台邏輯與營運控制，支持和數位發展部溝通；回饋是 B2C 先行，再逐步申請 C2C。我把它轉成分階段 roadmap，而不是硬做完整範圍。這不是我單獨否決需求，也沒有正式核准或上線成效可宣稱。",
      "followUp": "如何保留 C2C 未來能力？／對內怎麼溝通？",
      "boundary": "引用 S7，保留 regulator feedback、個人 ownership 與結果邊界。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 28,
      "title": "前三十天你會做什麼？",
      "framework": "learn product／customer／team → map → baseline",
      "answer": "先確認負責 module、decision boundary 與現行 success metric；實際走過產品與 sandbox，旁聽客戶訪談、導入或問題檢討會議，並查看 CS／integration case，畫 customer／identity／Consent／event／order／journey flow。和 PM、Engineering、Design、CS／Sales 對齊 Top problems、known failures 與 owner，產出產品知識圖、資料流、風險／未知清單，不先重做 roadmap。",
      "followUp": "如何避免只在學習？／第一個 quick win？",
      "boundary": "不知道能否取得 sandbox／客戶訪談；產出應依實際 access 調整。",
      "categoryKey": "J",
      "category": "90-Day Plan"
    },
    {
      "number": 29,
      "title": "第 31–60 天的可驗證成果是什麼？",
      "framework": "select one problem → baseline → solution options → reviewed MVP",
      "answer": "從 integration、journey、admin workflow 或 data quality 選一個價值與邊界清楚的問題，建立 baseline、primary／leading／guardrails，和工程確認 Source of Truth、state、error path、effort 與 non-goal。成果是一份已經過 customer／domain／technical review 的 MVP 與 measurement plan，不承諾一定上線。",
      "followUp": "問題怎麼選？／若 baseline 不可得？",
      "boundary": "不預設第一個問題或公司 release cadence；資料不可判定時先修 instrumentation。",
      "categoryKey": "J",
      "category": "90-Day Plan"
    },
    {
      "number": 30,
      "title": "到第 90 天，怎樣算成功？",
      "framework": "team trust＋decision quality＋delivery evidence",
      "answer": "依團隊 cadence，至少讓一個範圍清楚的 MVP／experiment 完成驗證，或進入有明確 owner、驗收與 release gate 的開發階段；同時把 integration pattern、exception、metric 與 decision 沉澱成可重用規則。成功不是「我改造了 CDP」，而是團隊能確認我可獨立負責一個問題、誠實管理 Gap 並做出可追溯決策。",
      "followUp": "沒上線是否失敗？／PM Lead 如何評估你？",
      "boundary": "不承諾固定功能、商業 lift 或組織改造；用實際 scope／access 修正 90-day plan。",
      "categoryKey": "J",
      "category": "90-Day Plan"
    }
  ],
  "ctoQuestions": [
    {
      "number": 1,
      "title": "請白板畫 Omnichat 類 Social CDP／CRM 的高階架構。",
      "framework": "source → ingestion → identity／consent → profile／event → segment／journey → channel／agent → feedback／governance",
      "answer": "我會先標示這是 reference architecture，不是 Omnichat 現況。來源包含 CRM、commerce／POS、LINE／WhatsApp 與 service conversation；進入 ingestion 後做 tenant、auth、schema、dedupe 與 raw event保存，再由 identity／consent 層形成可追溯 profile。Segment／Journey 消費 profile、event 與 eligibility，channel executor 與 bounded AI 執行受控 action；delivery、conversion、failure 與 human handoff 回流。橫向是 RBAC、PII、audit、observability、reconciliation 與 release control。實際 component、SLO、volume 與 owner 都要問 Engineering／Data。",
      "followUp": "為何 raw event 與 profile projection 分開？／哪裡 fail closed？／multi-tenant 邊界在哪？",
      "boundary": "這是 domain model；不說成過去做過 CRM architecture。白板把 `UNKNOWN: Omnichat actual stack／scale` 寫在右上角。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 2,
      "title": "Customer 360 的 canonical model 會有哪些核心物件？",
      "framework": "Customer＋Identifier＋Consent＋Event／Order＋Conversation＋Segment／Journey；lineage／version／authority",
      "answer": "Customer 是平台內的統一主體，Identifier 保存各來源 ID、驗證方式與連結依據；Consent 必須依 brand、market、purpose、channel 保存，不是 profile 上一個 boolean。Event 原則上 append-only，Order 與 Conversation 是有狀態的 business object；Segment membership 與 Journey enrollment 都要有版本與時間。每個欄位要帶 source、updated time、authority 與 access，否則只是資料拼盤，不是可治理 Customer 360。",
      "followUp": "Profile attribute 與 event 如何同步？／delete／tombstone 怎麼辦？",
      "boundary": "候選人有 account／wallet／state 的相鄰能力，沒有 direct Customer 360 production ownership。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 3,
      "title": "Identity Resolution 怎麼做 merge／split？",
      "framework": "strong evidence → conflict／shared-value check → reversible merge → downstream remediation",
      "answer": "MVP 先用 verified internal link 或具 uniqueness rule 的 deterministic identifier；姓名、相似行為、shared phone 不直接 merge。Merge 保存 rule version、reason、lineage、before／after 與 operator，Consent 不因 merge 自動放寬。若誤合併，要能 split 或至少隔離受影響 identity／event，停止高影響 action，追蹤已傳到下游的資料並做 remediation。Probabilistic matching 只有在 golden dataset、false-merge cost、human review 與 rollback成熟後才考慮。",
      "followUp": "兩人共用電話？／錯 merge 後已發訊息怎麼辦？",
      "boundary": "KYC 是 identity verification／eligibility，不等於 CRM identity resolution。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 4,
      "title": "多個系統對同一欄位衝突，Source of Truth 怎麼定？",
      "framework": "field-level authority → validity／purpose → event time／version → conflict state／reconciliation",
      "answer": "我不會用 last-write-wins 當通用答案。Order／refund 可能由 commerce／OMS 負責，channel reachability 由 provider，Journey state 由 orchestration，Consent 依 purpose／market 的指定 authority。先看契約與驗證，再看 occurred_at 與版本；無法裁決時保留 conflict、lineage，對 wrong-person 或 unauthorized action 採 suppression，交由 reconciliation owner處理。",
      "followUp": "manual override 的 authority？／舊 backfill 把刪除資料復活？",
      "boundary": "可引用 CEX／NFT reconciliation requirements 的思考；不說做過 CRM field-level SoT。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 5,
      "title": "Webhook 重複、延遲、亂序與漏送，產品和系統如何處理？",
      "framework": "event contract → persist／dedupe → ordering／state rule → retry／DLQ → API reconciliation",
      "answer": "先定 event ID、entity ID、occurred_at、version、schema、tenant 與 signature；接收後先可靠保存再快速 ack。Consumer 必須 idempotent，舊版本不能覆寫新狀態。暫時錯誤才 retry，永久錯誤進 DLQ 並有 reason、owner、age、redrive；Webhook 做低延遲，API／full sync 做補漏。PM 要定 user-visible pending／failed、operator queue、replay 副作用與 recovery requirement；technical design由 Engineering負責。",
      "followUp": "來源沒有 event ID？／重播會不會再發訊息？",
      "boundary": "這是 `RECOMMENDATION`；過往未證 production retry／DLQ ownership。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 6,
      "title": "Idempotency key 應該怎麼選？",
      "framework": "business operation identity → scope／TTL → stored result → side effects",
      "answer": "Key 要代表同一個業務意圖，而不只是同一 HTTP request，例如 tenant＋source＋event ID，或 customer＋journey version＋node＋eligibility window。要定 collision、retention、重送回傳與跨服務範圍；寫入與外部 action若不能原子化，就需要 state／outbox 等工程方案。產品上要保證重試不造成重複發送、重複建單或重複改狀態。",
      "followUp": "Key 永久保存嗎？／第三方 timeout 但其實成功？",
      "boundary": "不替 Engineering 選資料庫或宣稱親自實作；重點是 business invariant。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 7,
      "title": "Retry、DLQ 與 reconciliation 的責任如何分開？",
      "framework": "transient recovery／isolation／truth convergence",
      "answer": "Retry 解暫時性失敗，要有上限、backoff、expiry 與副作用保護；DLQ 隔離不能安全自動處理的事件，必須有分類、告警、owner 與受控 redrive；reconciliation 用權威來源重新比對，處理漏送、部分成功與長期不一致。三者不是「多試幾次」的不同名字，最後都要回到 business state 是否收斂。",
      "followUp": "DLQ 積壓何時 pause Journey？／redrive 前要驗證什麼？",
      "boundary": "不能虛構 SLA／queue throughput；threshold `TBD`。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 8,
      "title": "第三方顯示成功、平台顯示失敗，你怎麼 recovery？",
      "framework": "freeze irreversible action → collect correlation evidence → query authority → reconcile／communicate",
      "answer": "先停止後續不可逆 action，不直接再送一次；保留 request、callback、correlation ID、時間與兩側狀態。依該物件的 authority 用查詢 API 或對帳確認，使用者先看到 pending／under review，operator 有 queue、owner 與修復入口。若最後無法確認，依風險選 cancel、manual review 或補償，而不是猜成功。",
      "followUp": "provider 查詢也 unavailable？／補償會造成什麼風險？",
      "boundary": "`DIRECT` 可引用 BANXA 的多狀態產品規劃；不說曾處理此 production incident。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 9,
      "title": "Schema drift 或錯誤 backfill 如何避免污染 Journey？",
      "framework": "versioned contract → quarantine／dry run → replay flag → activation suppression → audit",
      "answer": "Schema 要有 version、required／enum／type rules 與 contract test；不相容資料先 quarantine，不默默填 default。Backfill 要有範圍、source snapshot、dry run、dedupe 與 replay flag，預設不能觸發今天的 Journey。完成後比較 counts、state distribution 與 reconciliation gap，再由 owner 解鎖 activation。",
      "followUp": "如何處理 producer 先升版？／歷史事件是否重算 segment？",
      "boundary": "這是通用設計；沒有既有 production backfill 成果。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 10,
      "title": "Enterprise CRM 的 RBAC 怎麼設計？",
      "framework": "subject／role／resource／action／scope → least privilege → approval／audit",
      "answer": "先從 resource 與 action 而非職稱開始，例如 profile read、PII export、segment edit、journey publish、agent tool write、tenant admin。權限要受 tenant、market、brand、purpose 與 environment scope 限制；read／draft／publish／export 分離。高影響 action可加 maker-checker、step-up auth 與 time-bound permission；audit 保存 actor、reason、before／after 與 approver。",
      "followUp": "RBAC 不夠時要 ABAC 嗎？／break-glass 怎麼管？",
      "boundary": "`DIRECT` 是多層 approval／risk requirements；enterprise RBAC implementation 是 `RECOMMENDATION`。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 11,
      "title": "Consent 與 PII 權限怎麼進入 Journey／Agent runtime？",
      "framework": "purpose-bound consent → action-time check → minimization → fail closed → proof",
      "answer": "Consent 要按 subject、controller／brand、market、purpose、channel、status、source、policy version 與 proof 保存。Journey entry 可初篩，但真正發送或 Agent tool action 前要重查；withdrawal、suppression、channel block 或不明狀態採 fail closed。Context assembly只取完成當前任務所需欄位，敏感資料遮罩；trace 記錄決策依據但不把 raw PII無限制複製。",
      "followUp": "Consent service timeout？／merge 後 Consent 怎麼處理？",
      "boundary": "不宣稱具法律 interpretation 或 Consent platform ownership；Legal／Privacy 是 approval owner。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 12,
      "title": "Audit log 要記什麼？怎麼避免 audit 本身成為 PII 風險？",
      "framework": "who／what／why／when／source／result → tamper evidence → minimization／retention／access",
      "answer": "對設定、profile merge、export、journey publish、Agent tool call與 manual override，記 actor、role、tenant、request／event ID、policy／model／artifact version、before／after reference、reason、approver與result。Log 不需要複製完整 prompt 或顧客內容；敏感值可 tokenized／hashed／redacted，並有獨立 access、retention與監控。實作是否採 immutable store由Security／Engineering決定。",
      "followUp": "如何支援調查又能刪除資料？／誰可以看 audit？",
      "boundary": "不說符合未證實的認證標準。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 13,
      "title": "Cross-tenant data leakage 如何防？",
      "framework": "tenant context at auth／storage／retrieval／tool → tests → monitoring／kill switch",
      "answer": "Tenant ID 必須由 server-side auth context產生，不能信任模型或 client傳入；storage query、cache key、vector retrieval、tool credential與event都綁 tenant。測試要有負向 cross-tenant cases；trace與alert看 scope mismatch。Agent 的 context與tool allowlist也按 tenant建立，出現疑似 leakage 就停止受影響功能、保全 evidence並啟動 privacy／security response。",
      "followUp": "shared index／cache 怎麼辦？／support admin 的跨 tenant access？",
      "boundary": "是 architecture recommendation，不是過往 incident／certification claim。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 14,
      "title": "你會觀測哪些層次，才知道系統真的健康？",
      "framework": "infra／integration → data → business state → customer harm → operator recovery",
      "answer": "不能只看 CPU 或 API 200。整合層看 error、retry、DLQ age、rate limit；資料層看 freshness、duplicate、schema rejection、reconciliation gap；業務層看 enrollment state、duplicate／unauthorized action、stuck state；AI 看 grounding、tool correctness、fallback、latency、cost；營運看 queue age與recovery completion。每個 alert 要有 owner、runbook、blast radius與pause／rollback authority。",
      "followUp": "哪些是 SLI？／怎麼避免 alert fatigue？",
      "boundary": "沒有 Omnichat SLO 或 volume；不填假 threshold。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 15,
      "title": "遇到部分系統失效，如何 graceful degradation？",
      "framework": "classify criticality → preserve truth／consent → degrade read／write → communicate → recover",
      "answer": "先判斷失效是否影響 identity、Consent、order／refund、duplicate protection 或 high-impact tool。若這些不可信，受影響 tenant／segment／channel fail closed；若只是非關鍵 enrichment，可顯示 stale／partial並降級。Agent 可以從 action 模式退成只讀 FAQ，再退真人；恢復時 controlled replay，不補發已過時訊息。",
      "followUp": "誰決定 fail open？／如何最小化 blast radius？",
      "boundary": "這是 future design；不虛構 incident。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 16,
      "title": "Cost、latency、quality 怎麼取捨？",
      "framework": "task criticality → deterministic first → model routing／cache → SLO＋quality guardrail → unit economics",
      "answer": "身份、Consent、資格與不可逆 action 優先 deterministic；LLM放在需要語意判斷但可 fallback 的任務。簡單分類用較小模型或規則，複雜推理才升級；approved knowledge可 cache，但要帶 tenant、permission、version與expiry。看端到端 p50／p95、timeout、grounded task success與cost per grounded-resolved outcome，不只token price。閾值以真實流量與 business value決定。",
      "followUp": "Streaming 會改善什麼、不改善什麼？／cache stale 怎麼辦？",
      "boundary": "不給未驗證 token cost／latency 數字。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 17,
      "title": "Scalability 你會先問哪些問題？",
      "framework": "workload／burst／tenant fairness → state／consistency → quota／partition → degradation／capacity test",
      "answer": "先問 event與message volume、峰值、payload、freshness、journey fan-out、largest tenant與 noisy-neighbor；再區分同步 user path與可非同步計算。需要 tenant quota、backpressure、priority、expiry、batch與 partition strategy，但技術選型由 Engineering做。產品上要定哪些工作可延遲、哪些不可丟、過期是否仍執行，以及容量不足時如何告知 operator。",
      "followUp": "大型 tenant 突發 campaign？／公平與付費 tier 如何取捨？",
      "boundary": "Omnichat scale `UNKNOWN`；不聲稱做過同等規模。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 18,
      "title": "Consistency、availability、latency 衝突時怎麼決策？",
      "framework": "business invariant／harm → strong vs eventual by object → user state／reconciliation",
      "answer": "不是整個系統選一種 consistency。Consent suppression、profile merge與不可逆 action偏向正確性／fail closed；analytics、非關鍵enrichment可接受 eventual consistency並標 freshness。若 order state 延遲會導致錯發，就在action前查 authority；若延遲成本高，可先顯示 pending並非假成功。決策以錯誤成本、可逆性與客戶可理解狀態為準。",
      "followUp": "如何量化 staleness budget？／跨區域呢？",
      "boundary": "可連結 CEX／BANXA state product thinking；不宣稱分散式系統實作 ownership。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 19,
      "title": "請畫 production-grade Agent architecture。",
      "framework": "trigger → context → policy → planner／router → tools → validation → human → action → trace／eval",
      "answer": "Trigger 先建立 tenant／actor／intent；Context Assembly只取approved、permission-filtered、versioned資料。Policy先於planner判斷可讀／可寫與禁用 action；planner產生受 schema 限制的計畫，tool gateway使用allowlist、最小權限與idempotency。結果經 groundedness、business rule與permission validation，高影響或低信心進human gate；最後才action，完整 trace送 evaluation與feedback。任一關鍵依賴失效就退 deterministic workflow或真人。",
      "followUp": "Prompt injection 在哪攔？／planner output 怎麼驗？",
      "boundary": "`DIRECT` 是 role／artifact／gate workflow；production runtime 是 `PROPOSED`。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 20,
      "title": "何時用 deterministic workflow，何時用 Agent？",
      "framework": "variance／judgment／reversibility／risk → hybrid boundary",
      "answer": "固定規則、法遵、權限、金額、狀態轉移與可枚舉流程優先 deterministic；需要讀非結構內容、比較選項或生成建議且可驗證／可撤回的部分才用 LLM。常見混合是 deterministic gate與state machine包住 Agent：Agent建議，系統驗證，必要時人核准，執行仍走受控 API。",
      "followUp": "如果 Agent 比 rule 準？／如何避免 workflow 太僵硬？",
      "boundary": "不能把所有 automation稱 Agentic；不宣稱既有 production accuracy。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 21,
      "title": "RAG、Tool Calling、Fine-tuning 怎麼選？",
      "framework": "knowledge freshness／action need／behavior consistency",
      "answer": "需要最新、可引用 tenant knowledge時用RAG；需要查詢或改變外部狀態時用tool calling，但必須先permission、schema validation與idempotency；需要穩定風格或窄任務行為、且已有足夠高品質資料時才考慮fine-tuning。它們可組合，但fine-tuning不替代權限與最新知識，RAG也不保證答案正確。",
      "followUp": "RAG 找錯文件怎麼辦？／何時不值得 fine-tune？",
      "boundary": "不聲稱訓練過 production model。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 22,
      "title": "Agent tool permission 怎麼做 bounded autonomy？",
      "framework": "read／draft／write tiers → allowlist／scope → precondition → approval → postcondition／audit",
      "answer": "權限按 action tier分級：read、draft、reversible write、high-impact write。Credential綁 tenant／actor／purpose／expiry，tool schema只暴露需要欄位；每次呼叫先檢查policy與business precondition，發送、改Consent、merge profile、退款等高影響 action預設禁止或需人核准。執行後驗證postcondition並留下audit；kill switch可按tool、tenant或workflow關閉。",
      "followUp": "Human rubber stamp 怎麼防？／permission cache stale？",
      "boundary": "不說已實作 enterprise permission gateway。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 23,
      "title": "你會怎麼做 AI evaluation？",
      "framework": "task taxonomy → golden dataset → offline／online → safety／operations → decision rule",
      "answer": "先按任務拆 retrieval、answer、tool plan、tool execution、handoff，而不是只給總分。Golden set含 happy、ambiguous、adversarial、permission、PII、outdated、tool failure與handoff cases；離線看 groundedness、citation、tool-call correctness、policy compliance，線上看 task success、reopen、human acceptance、fallback、latency、cost與harm。每版有release gate與rollback trigger；judge model只能是訊號，關鍵case要有人標註。",
      "followUp": "Grounded但答案沒用？／dataset drift？",
      "boundary": "本地 reviewer是方法證據；沒有 enterprise golden-set 結果。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 24,
      "title": "Low-confidence、tool failure 與 human handoff 怎麼設計？",
      "framework": "detect → stop／clarify → preserve context → assign → SLA／feedback",
      "answer": "低信心不只看模型自評，也看retrieval coverage、conflict、permission、tool response與policy。能安全澄清就問一題；否則停止 action並交真人。Handoff要帶 user intent、已確認／未知、來源、attempted tool、error、risk、建議 next step與raw trace reference；summary不取代原始紀錄。Queue沒有capacity時要回覆可預期狀態並允許pause，而不是假裝已解決。",
      "followUp": "何時自動 retry tool？／怎麼衡量 handoff quality？",
      "boundary": "不虛構 handoff SLA；role owner／threshold TBD。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 25,
      "title": "Prompt injection／惡意文件怎麼處理？",
      "framework": "treat content as data → source trust／isolation → policy outside model → tool confirmation → adversarial eval",
      "answer": "外部訊息與retrieved content都視為不可信資料，不能覆寫system policy或tool permission。Context標示來源與trust level，隔離tenant與文件範圍；高風險指令需結構化解析、server-side validation與人核准，不讓模型自由組credential或endpoint。Golden set加入indirect injection、data exfiltration與cross-tenant cases；偵測異常時停用tool、保全trace。",
      "followUp": "文件本來就包含操作指引？／模型繞過 regex？",
      "boundary": "不把prompt filter當唯一防線；不宣稱零風險。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 26,
      "title": "PM 應該懂到多深，才不會越權？",
      "framework": "own problem／invariant／acceptance／risk；partner on options；Engineering owns how",
      "answer": "PM要能定義actor、business invariant、state、error、permission、SLO intent、operational recovery與acceptance，也要能問出consistency、migration、cost與failure mode。但service、database、queue、partition、estimate與implementation quality由Engineering owner。我的價值是讓trade-off回到客戶結果與風險，不是假裝寫過底層系統。",
      "followUp": "工程只給一個方案？／何時 challenge architecture？",
      "boundary": "清楚說 ownership，不用術語包裝工程能力。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 27,
      "title": "Engineering 認為需求成本太高，你怎麼做 technical trade-off？",
      "framework": "restate outcome → expose constraints／failure → options including status quo → reversible slice／decision owner",
      "answer": "先確認真正成本在scale、consistency、migration、security或scope；把使用者outcome與不可破壞invariant固定，再比較縮scope、降低freshness、manual operation、staged rollout與延後。每個選項記value、risk、reversibility、dependency與operational cost；由對應owner決策並留下revisit trigger。我可用Grid的margin／lifecycle與BANXA state規劃作相鄰證據，但不會編一場工程衝突。",
      "followUp": "你何時會接受 manual workaround？／technical debt如何記？",
      "boundary": "`HOLD-DISAGREEMENT-001` 維持 HOLD。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 28,
      "title": "你如何定 release gate 與 rollback？",
      "framework": "risk-based gates → staged exposure → monitor → authority／runbook → learning",
      "answer": "先按 harm、irreversibility、blast radius與detectability定gate。最低包含AC、permission／security、data quality、critical telemetry、support／ops、migration與rollback驗證；再用internal、pilot、small exposure逐步放量。Rollback trigger與authority要事前定義，包含停止新action、保留state、customer／data remediation與re-release條件。code complete不等於product ready。",
      "followUp": "Rollback比向前修復更危險？／資料migration如何回？",
      "boundary": "不提供假 exposure percentage或事故案例。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 29,
      "title": "四個月 0→1 CEX，架構與優先順序怎麼切？",
      "framework": "business／risk core → account／wallet／state → approval／ops → review／non-goal → ownership",
      "answer": "`DIRECT` 是我帶3位PM＋2位Design，負責產品架構、優先順序與跨區協作。切分時先守帳戶／錢包／資產可追溯、交易主路徑、KYC／風控、關鍵審批與營運可見性，再擴返佣、Grid等能力；透過模組化PRD與peer review提早暴露跨模組狀態與例外。Engineering負責technical design與實作，我不會把四個月說成任何平台都可複製，也不補交易量或事故下降。",
      "followUp": "你砍了什麼？／最大dependency？／如何驗收資產一致性？",
      "boundary": "只用已證四個月／團隊範圍；完整scope cut與實際衝突細節若來源不足就說記錄中沒有。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 30,
      "title": "BANXA／法幣整合，你的 product contract 是什麼？",
      "framework": "eligibility → provider handoff → state map → callback／query → customer＋operator recovery",
      "answer": "`DIRECT` 是我規劃平台資格、第三方KYC handoff與order／payment／refund／reject／cancel等狀態，也連結前台與營運控制。產品contract要明確誰建立order、何時視為accepted／paid／completed、哪一方是authority、timeout顯示什麼、如何查詢與reconcile。`INFERENCE` 是在CRM connector我也會用相同方法定state與recovery，但retry／DLQ／API實作不是我的過往ownership。",
      "followUp": "callback與query不同怎麼辦？／如何避免double purchase？",
      "boundary": "不說支付清算、SLA或production incident。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 31,
      "title": "Grid 系統最難的 technical trade-off 是什麼？",
      "framework": "strategy flexibility／state complexity／risk clarity／operations",
      "answer": "`DIRECT` 可說我規劃neutral／long／short、等差／等比、保證金、預估強平、manual termination與admin visibility。產品trade-off是在策略彈性與可理解風險、狀態可恢復之間：每增加設定都會擴大state、edge case與support成本，所以MVP要明確限制、顯示估算與終止結果，讓operator可追蹤。底層quant model、撮合與程式實作由工程負責。",
      "followUp": "estimated liquidation與actual不同？／manual terminate部分成功？",
      "boundary": "不虛構volume／retention lift或真實loss incident。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 32,
      "title": "KYC／Approval 經驗如何遷移到 enterprise governance？",
      "framework": "eligibility／evidence → role／risk tier → maker-checker → exception／audit",
      "answer": "`DIRECT` 是KYC vendor product flow、文件／資格／review requirements，以及1–6層的高風險approval與設定治理。我會遷移的是把action按風險分級、read／write／approve分離、保存reason與audit、設manual review與reset path。這能支持CRM publish、PII export或Agent high-impact tool的設計，但不等於我做過Consent平台、Sumsub SDK或security architecture。",
      "followUp": "六層是否過度設計？／如何避免rubber stamp？",
      "boundary": "多層數字只屬既有 approval artifact；不可套成Omnichat建議層數。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 33,
      "title": "NFT reconciliation 經驗如何回答 Source of Truth？",
      "framework": "intent／signature／on-chain state／off-chain projection → mismatch → manual recovery",
      "answer": "`DIRECT` 的範圍是我規劃WalletConnect、EIP-712、資產轉移與non-custodial reconciliation requirements。產品上要分清使用者intent、signature、chain confirmation與平台projection；平台顯示不應超過權威狀態，mismatch要有pending、recheck、operator visibility與audit。這是requirements planning，不是我實作smart contract、indexer或處理production chain incident。",
      "followUp": "Chain reorg？／signature成功但transaction未送出？",
      "boundary": "metadata、royalty、listing與production outcome維持 HOLD。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 34,
      "title": "請白板從一份 PRD 拆到 Scrum Board tickets。",
      "framework": "approved contract → vertical WBS → ticket schema → role reviews → Board／release",
      "answer": "我先凍結PRD version、MVP、flow、non-goal、constraints、AC與dependency；Agent只讀approved artifacts，先做缺口檢查，再按entry、happy path、exception、operator、measurement、release切vertical stories。每張ticket帶source、problem、scope、non-goal、Given／When／Then AC、dependency、risk、role owner、`UNESTIMATED`、DoR／DoD與rollback。PM／PJM、Design、Engineering、QA review後才可寫Board；缺決策或version drift就HOLD。已證的是role Skills、artifact gate與local reviewer；Board automation是proposed。",
      "followUp": "為何不是一個PRD section一張票？／ticket太大如何拆？",
      "boundary": "使用 `09-agentic-pjm-workflow.md` 白板圖；不說已在企業全面導入。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    },
    {
      "number": 35,
      "title": "Agent 如何避免擴 scope、處理 version drift 與權限？",
      "framework": "source pinning／bidirectional trace → diff／stale state → draft-only RBAC／approval → audit",
      "answer": "每張票要回指artifact ID／version／requirement，產出後做PRD→tickets與tickets→PRD coverage；沒有source的行為標scope-change proposal。Artifact更新時用semantic diff標受影響票為`STALE_REVIEW_REQUIRED`，不覆寫in-flight work；由PM決定scope、工程重估、QA更新coverage。Agent預設read approved＋write draft，不能assign、estimate、transition、release；所有tool call、before／after與approver可audit。",
      "followUp": "已進Sprint怎麼辦？／如何處理PII與cross-tenant board data？",
      "boundary": "production drift detector／Board API／RBAC是 proposed，不是已證 deployment。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    },
    {
      "number": 36,
      "title": "如何衡量 Agentic PJM pilot，而不自我美化？",
      "framework": "baseline → shadow comparison → quality／risk／operations／cost → staged permission",
      "answer": "先量人工基線：PRD到DoR lead time、clarification、scope reopen、missing AC／dependency、escaped requirement、review time。Shadow mode讓Agent產draft但不寫Board，比較human acceptance、grounding、coverage、edit distance與risk finding；再看latency、failure、approval queue與AI cost。只有品質與guardrail達到預先約定門檻，才從draft擴到受控write；若沒有資料就不宣稱提升。我的現有證據只支持workflow structure與local review，不支持enterprise outcome。",
      "followUp": "Acceptance高但團隊變慢？／如何避免只挑容易ticket？",
      "boundary": "不得使用days-to-hours、ROI、adoption、defect reduction等未證數字。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    }
  ]
};
