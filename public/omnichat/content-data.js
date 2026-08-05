// Generated from interviews/omnichat source material. Do not edit by hand.
window.INTERVIEW_DATA = {
  "builtAt": "2026-08-06",
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
      "answer": "我帶領五人產品與設計團隊，從零建立一個 CEX 平台。面對帳戶、錢包、交易、返佣、風控、審批和營運後台，我先定義帳戶與資產模型，再依交易主流程、風險控制和營運能力拆成模組，並在進入開發前確認依賴。團隊最後在四個月內完成平台上線；我的核心貢獻是產品架構、優先順序和跨區協作。",
      "deep": "**你本人做了什麼？** 定義架構、模組、優先順序、review gate，並協調台灣與杜拜產品端。",
      "boundary": "不說「我一個人打造整間交易所」或「完整擁有所有工程架構」。\n不說四個月上線帶來未記載的收入、用戶或交易量。"
    },
    {
      "id": "S2",
      "title": "BANXA／法幣買幣：把第三方 handoff 做成完整狀態流程",
      "answer": "法幣買幣整合的難點，是平台、KYC 供應商、付款和訂單各有自己的狀態。我負責把資格檢查、第三方交接、待付款、拒絕、取消、退款、異常和完成整理成同一套流程，並定義顧客看到什麼、營運人員能查到什麼。這讓正常與例外情況都有共同規則；我的責任是產品流程，不是 API 或支付清算實作。",
      "deep": "**外部與內部狀態衝突怎麼辦？** 先定 Source of Truth、可回復狀態與人工處理入口，不能只覆寫成最後一次 callback。",
      "boundary": "不說親自實作 BANXA API、webhook、retry／DLQ 或支付清算。\n不引用 conversion、交易額或 provider SLA。"
    },
    {
      "id": "S3",
      "title": "Futures Grid：與工程處理限制，不把意見不同變成人際衝突",
      "answer": "規劃 Grid 產品時，我們希望支援完整策略，但工程限制牽涉共用保證金、強平、流動性和機器人避險。我沒有用「需求一定要做」壓過限制，而是把策略狀態、風險提示、手動終止和未解問題寫清楚，讓團隊逐項決定可安全交付的範圍。這是一個技術取捨案例，不是一場我會誇大的工程衝突。",
      "deep": "**最後誰決策？** 依風險與可行性由產品、工程及相關 owner 共同 review；資料庫未記錄個別決策者，不補寫。",
      "boundary": "不塑造「我說服工程」的英雄敘事。\n不說本人開發 margin engine、trading bot 或量化演算法程式。"
    },
    {
      "id": "S4",
      "title": "PM Cross-Review：保留 owner，也降低單點盲區",
      "answer": "面對第三方整合和複雜邏輯，我發現單一 PM 從頭做到尾，容易漏掉跨系統狀態。我的調整不是增加一層簽核，而是保留一位 PM 負責到底，並在架構、關鍵邏輯和資料流成形時加入同儕審查。另一位 PM 專門挑戰假設、例外和狀態，提早發現盲區，同時不模糊責任。",
      "deep": "**如何避免 review 變官僚？** 只在高風險架構、共用 data model、跨 module contract 設 gate。",
      "boundary": "不說已帶過六位 PM；已證範圍是五人產品／設計團隊，其中三位 PM、兩位 Design。\n不把此故事用作個人失敗或量化品質提升證據。"
    },
    {
      "id": "S5",
      "title": "多層審批與風控：高影響操作不能只靠 UI 隱藏",
      "answer": "我設計交易所後台時，提款、返佣、KYC 國籍和期貨風控等設定都可能造成重大影響，不能只靠隱藏按鈕控制。我把操作拆成角色、風險等級、一到六層可配置審批、狀態和稽核要求，並保留拒絕、重設和人工處理路徑。重點是把治理放進產品模型，而不是上線前才補一個簽核按鈕。",
      "deep": "**所有操作都多層簽核嗎？** 不會；層級應依風險與組織政策配置，避免低風險流程被治理成本拖垮。",
      "boundary": "不說是 AML／資安專家或宣稱量化降低 fraud。\n不展示敏感權限表、帳號或內部風控閾值。"
    },
    {
      "id": "S6",
      "title": "NFT on-chain／off-chain reconciliation：先定誰的狀態算數",
      "answer": "在 Xchanger NFT 規劃中，提領安全不只看鏈上交易，也要處理平台和鏈上狀態不一致。我負責定義錢包連接、簽署、資產轉移和對帳需求，要求把各階段以誰的狀態為準、如何確認，以及營運人員能看到什麼說清楚。這是產品流程規劃，不是智能合約實作。",
      "deep": "**Source of Truth 是鏈上嗎？** 資產所有權通常看鏈上，但平台 workflow、資格與展示仍有自己的狀態；需定義 reconciliation，而不是一句話全部交給鏈。",
      "boundary": "不說完成 production WalletConnect、smart contract 或監控系統。\n不宣稱降低資產事故或完成多少筆交易。"
    },
    {
      "id": "S7",
      "title": "MODA 溝通：把一次做滿調整成 B2C 先行、C2C 後續",
      "answer": "Xchanger 規劃遊戲道具交易時，原本希望同時處理 B2C 和 C2C，但 C2C 的交易與治理複雜度更高。我整理資料流、平台邏輯和 KYC／營運控制，支持與數位發展部溝通；得到的方向是先做 B2C，再逐步申請開放 C2C。這不是直接拒絕需求，而是把高風險範圍轉成可治理的分階段路線。",
      "deep": "**你拒絕了誰？** 不應這樣說；是依 regulator feedback 調整 rollout，並非候選人單獨否決 stakeholder。",
      "boundary": "不說已取得政府核准或正式 launch。\n不把外部建議改寫成候選人單獨的策略勝利。"
    },
    {
      "id": "S8",
      "title": "角色型 AI Workflow：把「用 AI 加快開發」收斂成產品流程",
      "answer": "「用 AI 加快產品開發」太模糊，所以我先把它拆成角色、輸入、產物和核准關卡：PM 產出 PRD，設計師接續使用流程，前端工程再使用已確認的產物；每個階段都要放到固定位置，並由使用者確認後才能往下。這讓 AI 從模糊想法變成可檢查的工作流程；目前證據只支持流程結構，不支持企業導入或量化成效。",
      "deep": "**為什麼不是一個 Agent 全做？** 分角色讓輸入、輸出、責任與錯誤位置可見，也方便人類在關鍵節點介入。",
      "boundary": "不說原公司全面採用、提升特定百分比或 days-to-hours。\n不把個人 Codex 延伸歸因成公司職務成果。"
    },
    {
      "id": "S9",
      "title": "Sumsub／Authme KYC：快速建立陌生 domain 的決策模型",
      "answer": "接觸 KYC 供應商時，我先把文件、人臉或機器審核、資格、人工審核、拒絕和恢復放進交易流程，再比較 Sumsub、Authme 能不能支援。這讓陌生領域的學習直接回到產品決策。我的責任是供應商研究和整合流程，不是 SDK 開發。",
      "deep": "**怎麼知道學到足夠？** 能畫出角色、資料、狀態、失敗與 decision boundary，並讓 domain／engineering owner review。",
      "boundary": "不說親自整合 SDK／API、負責 webhook 或完成 production rollout。\n不虛構幾天學會、KYC 通過率或審核效率。"
    }
  ],
  "questions": [
    {
      "number": 1,
      "title": "為什麼想加入 Omnichat？",
      "framework": "產品問題吸引力 → 可轉移能力 → 真實缺口",
      "answer": "我想加入 Omnichat，是因為它處理的不是單一訊息功能，而是把顧客資料、不同渠道和營運流程連成可持續的平台。這和我過去處理第三方整合、多狀態、權限與後台治理的問題很接近。我沒有直接 CRM／CDP 任職經驗，但我希望把成熟的平台產品方法帶到顧客生命週期場景，這也是這個角色吸引我的地方。",
      "followUp": "你最想先負責哪個 module？／為什麼不留在 Web3？",
      "boundary": "不要暗示 Omnichat 已指定 module；不要貶低 Web3 或說只是想換產業。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 2,
      "title": "為什麼是 Senior PM，而不是一般 PM？",
      "framework": "scope → decision quality → leadership without inflation",
      "answer": "我把自己定位為 Senior PM，主要不是因為年資，而是我已經能獨立拆解複雜平台、帶領三位 PM 和兩位設計師，並推動跨區團隊完成交付。我知道怎麼把帳戶、狀態、風險、審批和第三方整合整理成可執行的產品範圍，也知道哪些限制不能假裝不存在。我不會說自己第一天就是 CRM 專家，但我有能力降低進入新領域時的交付風險。",
      "followUp": "最能證明 seniority 的決策？／你親自做什麼？",
      "boundary": "用 S1；不把團隊上線說成個人完成，不聲稱管理工程團隊。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 3,
      "title": "你能為 PM Lead 帶來什麼？",
      "framework": "三項能力 → 具體做法 → 不越權",
      "answer": "我能帶來三件事：把複雜需求拆成可交付範圍、處理第三方整合與高風險流程，以及在保留單一負責人的前提下做必要的同儕審查。加入後我會先理解六位 PM 現有分工，再把共用資料、狀態和例外提早拉出來對齊，不會一開始就重做流程或假設自己有跨產品的決策權。",
      "followUp": "第一個月具體產出？／如果 PM Lead 不想改流程？",
      "boundary": "引用 S4；不說已帶過六位 PM或已知內部痛點。",
      "categoryKey": "A",
      "category": "Why Omnichat／Why Role"
    },
    {
      "number": 4,
      "title": "你沒有 CRM／CDP 經驗，為何能勝任？",
      "framework": "承認 Gap → 可轉移 evidence → 降低風險方法",
      "answer": "這個缺口是真的，我不會把交易所或 KYC 經驗換個名字說成 CRM。能直接轉移的是我處理第三方交接、多狀態、資料責任、權限審批和營運修復的能力；我也已經補足 Customer 360、身份解析、聯繫同意和顧客旅程的基礎。加入後我會先理解真實資料模型與客戶問題，再從邊界清楚的模組開始交付。",
      "followUp": "底層相似，為何不算直接經驗？／前三十天怎麼補？",
      "boundary": "不得說「其實都一樣」或自稱 CRM expert。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 5,
      "title": "Identity Resolution 跟 KYC 有什麼不同？",
      "framework": "各自目的 → 相交處 → 不可互換",
      "answer": "兩者處理的是不同問題。KYC 是確認這個人是誰、能不能使用特定服務；身份解析則是判斷不同系統裡的會員 ID、電話或渠道帳號，是否屬於同一位顧客。我的 KYC 經驗可以支持證據、資格和人工審查的思考，但顧客資料的合併、拆分與聯繫同意傳遞，仍要依 CRM 的實際資料模型重新學習。",
      "followUp": "email 相同可以直接 merge 嗎？／誤合併如何處理？",
      "boundary": "不要把 deterministic matching 說成萬無一失，也不虛構既有 merge production 經驗。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 6,
      "title": "你會如何快速補上 CRM Domain？",
      "framework": "object map → real cases → supervised delivery",
      "answer": "我會用三步補足。先把顧客、識別資料、聯繫同意、訂單、渠道和旅程的關係畫清楚；再和 PM、工程、客服及業務一起看真實客戶案例與常見整合問題；最後挑一個邊界清楚的題目，在領域負責人審查下完成基準、MVP 和衡量方式。重點不是只上課，也不是還沒理解現況就承諾重做 CDP。",
      "followUp": "怎麼知道已學會？／若文件與實際系統不同？",
      "boundary": "不要承諾固定天數成為專家；以 review 通過與可交付結果驗證。",
      "categoryKey": "B",
      "category": "CRM／CDP Gap"
    },
    {
      "number": 7,
      "title": "大客戶要求客製功能，你怎麼決定接不接？",
      "framework": "problem → repeatability → architecture／economics／risk → decision",
      "answer": "我不會先問「這位客戶夠不夠大」，而是先確認他真正要達成的結果，以及目前有沒有替代做法。接著看這個需求是否會在其他客戶重複出現、能不能用設定解決、會不會破壞共用資料或增加長期維護與合規風險。可重用就產品化；只有單一客戶需要時，採有邊界的服務；如果會破壞核心且成本無法承擔，就縮小範圍或拒絕。",
      "followUp": "最大客戶威脅流失呢？／誰做最後決定？",
      "boundary": "這是方法，不是既有完整 commercial case；不要虛構 ACV 或 margin。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 8,
      "title": "如何把三個客戶的不同需求抽象成平台能力？",
      "framework": "jobs／invariants／variants → common model → migration",
      "answer": "我會先忽略三位客戶各自的功能名稱，改看他們共同要完成什麼、涉及哪些角色、資料、狀態和例外。共同部分做成平台規則，差異再分成政策、設定、內容或真正需要擴充的能力。這樣可以避免把三套客製條件直接塞進核心，也能為共用能力指定清楚的負責人、版本和預設行為。",
      "followUp": "何時接受 feature flag？／如何避免過度抽象？",
      "boundary": "不要聲稱已在 multi-tenant CRM 完成產品化；這是相鄰能力與方法。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 9,
      "title": "Sales 已承諾客戶，但產品做不到，你怎麼處理？",
      "framework": "確認承諾 → options／impact → decision owner → customer recovery",
      "answer": "我會先把 Sales 實際承諾的內容、客戶真正需要的結果和時程確認清楚，再和工程整理可行選項，例如縮小範圍、先用人工服務、測試版或分階段交付。由有決策權的人選定方案後，對客戶重新說清楚範圍、責任與驗收方式。若涉及隱私或資料安全，不能因為商務壓力就跳過必要檢查。",
      "followUp": "如果 Sales 不同意？／如何保住關係？",
      "boundary": "不把 Sales 描述成問題；現有資料沒有這個真實事件，不要用第一人稱過往成果口吻。",
      "categoryKey": "C",
      "category": "Enterprise Custom Request Productization"
    },
    {
      "number": 10,
      "title": "你如何排 CRM 平台 Roadmap？",
      "framework": "outcome → segments／problems → enablers → evidence／risk",
      "answer": "我會先確認這個階段要改善哪一類客戶結果，再找出主要阻礙。需求會分成顧客看得到的功能、支撐它的平台能力，以及可靠性與治理工作；排序時一起看影響範圍、價值、證據、投入和風險。資料品質、身份或聯繫同意如果是前置條件，也要明確排進去。Roadmap 對我來說是一連串取捨，不只是功能日期表。",
      "followUp": "技術債怎麼排？／Revenue request 一定優先嗎？",
      "boundary": "不引用不存在的 Omnichat roadmap 或假分數。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 11,
      "title": "如何在成長功能和資料品質間取捨？",
      "framework": "harm／dependency → minimum quality gate → staged delivery",
      "answer": "我會看資料錯誤的後果。如果可能傳錯人、在未獲同意時發訊息，或讓成效根本無法判斷，資料品質就必須是上線門檻；如果只是低風險欄位不完整，可以縮小受眾、標示未知並用小流量驗證。重點不是把資料全部修完，也不是先上再說，而是先達到這個功能所需的最低可靠條件。",
      "followUp": "如何量化 data quality？／什麼情況停發？",
      "boundary": "可引用 05 Case；門檻必須由真實 baseline 與 owner 決定。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 12,
      "title": "需求很多、工程容量不足時怎麼辦？",
      "framework": "capacity constraint → outcome slices → dependencies → explicit cuts",
      "answer": "我會先把所有需求改寫成要解決的結果，再找出能獨立完成的最小切片，而不是每個項目都平均砍一點。比較時看顧客價值、風險、依賴、學習價值和延後成本，並清楚列出這一輪不做什麼。過去做 CEX 時，我也是先守住主流程、資產可追溯、風控和營運能力，再擴充延伸功能。",
      "followUp": "誰不滿怎麼辦？／如何處理 urgent request？",
      "boundary": "不把「四個月」當成任何產品都能複製的承諾。",
      "categoryKey": "D",
      "category": "Roadmap／Prioritization"
    },
    {
      "number": 13,
      "title": "六位 PM 共用平台，如何避免互相踩線？",
      "framework": "ownership map → shared contracts → decision cadence",
      "answer": "我會先把產品區域、共用資料和介面的負責人分清楚，並寫明哪些決策可以由單一 PM 做、哪些需要跨團隊審查。平常由負責人決定；只有影響多個模組、高風險或難以回復的變更，才進同儕審查並留下決策紀錄。核心原則是責任仍然單一，不把共同協作變成沒有人真正負責。",
      "followUp": "衝突誰決定？／shared metric 歸誰？",
      "boundary": "不假設 Omnichat 現行分工，也不說已管理六位 PM。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 14,
      "title": "你會怎麼做 PM Peer Review？",
      "framework": "risk trigger → reviewer lens → SLA → owner retains decision",
      "answer": "我不會讓所有需求都進同儕審查，只在共用資料、跨系統契約、高風險操作或重大顧客影響時啟動。Reviewer 檢查問題、狀態、例外、指標和不做範圍，但不接管方案；原負責人回應並保留決策權。之後同時看是否減少晚期阻塞與重開需求，以及審查本身是否拖慢交付。",
      "followUp": "Reviewer 和 owner 都不讓步？／小需求也 review 嗎？",
      "boundary": "既有 S4 沒有量化成效；衡量方式是未來方法。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 15,
      "title": "另一位 PM 改了 shared object，影響你的 roadmap，怎麼辦？",
      "framework": "impact discovery → compatibility options → joint decision → migration",
      "answer": "我會先確認他改了什麼、哪些模組正在使用、什麼時候受影響，以及顧客會看到什麼，不先把它變成人際或資源衝突。接著一起比較相容舊版、開新版本、加轉接層或安排遷移的成本，並指定共用負責人與遷移計畫。若變更不可逆又影響多個模組，就交由 PM Lead 或架構負責人決定，之後把契約測試與變更通知補進流程。",
      "followUp": "如果已經上線？／誰承擔 migration？",
      "boundary": "這是情境題方法，不包裝成發生過的 Omnichat／CEX incident。",
      "categoryKey": "E",
      "category": "六位 PM／Shared Platform"
    },
    {
      "number": 16,
      "title": "請白板畫 Customer 360 的核心資料模型。",
      "framework": "Customer → Identifier → Consent → Event／Order → Segment／Journey",
      "answer": "我會先在中央畫「顧客」，再向外連五類資料。第一是會員 ID、電話和渠道帳號等身份識別；第二是依目的、渠道和市場保存的聯繫同意；第三是互動事件；第四是有狀態的訂單與對話；第五是顧客目前所屬的分群和旅程。最後在每一類資料旁標出來源、更新時間、存取權限和衝突時由誰裁決。這張圖是通用模型，不代表 Omnichat 現況。",
      "followUp": "地址相同可 merge 嗎？／shared phone 怎麼辦？",
      "boundary": "這是 domain understanding，不是候選人過去 production schema。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 17,
      "title": "兩個 profile 要不要 merge，怎麼決定？",
      "framework": "strong evidence → conflict check → reversible action → audit",
      "answer": "我會先問「有沒有足夠強的證據證明是同一個人」。MVP 只用已驗證的會員連結或具唯一性規則的識別資料；顯示名稱、相似行為或共用電話不能直接合併。合併前先檢查衝突，高影響情況交人工確認；合併後要保留原因與來源，也要能拆分和修復。聯繫同意不會因為資料合併就自動放寬。",
      "followUp": "錯 merge 已發訊息怎麼辦？／何時用 probabilistic match？",
      "boundary": "不聲稱零誤合併；probabilistic expansion 要另有 evaluation 與 risk gate。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 18,
      "title": "同一欄位多個系統不同值，誰算數？",
      "framework": "field-level authority → freshness／validity → conflict state",
      "answer": "我不會用「最後更新的值一定正確」當通用規則，而是逐項定義資料責任。例如訂單由電商或 POS 負責，會員資料由 CRM 負責，送達與封鎖狀態由渠道負責。聯繫同意還要看目的、市場和撤回時間。當下無法判斷時，先保留衝突與來源，高風險操作停止執行，再交給指定負責人對帳處理。",
      "followUp": "POS 延遲怎麼辦？／客服手動修改呢？",
      "boundary": "實際權威來源須依 Omnichat 客戶架構確認，不能視為內部現況。",
      "categoryKey": "F",
      "category": "Data Model／Customer 360"
    },
    {
      "number": 19,
      "title": "Webhook 重複、延遲、亂序時怎麼設計？",
      "framework": "contract → idempotency／ordering → retry／DLQ → reconciliation",
      "answer": "我會先確保每個事件能被唯一辨識，並帶有對象、版本和發生時間，這樣重複收到時不會重做，較舊事件也不會覆蓋新狀態。暫時性失敗才有限次重試，無法自動處理的事件要隔離並可追蹤，再用查詢或全量對帳補漏。PM 要定義顧客看到什麼、營運人員怎麼處理和重播會不會產生副作用；底層佇列由工程負責。",
      "followUp": "沒有 idempotency key 呢？／重播會再發訊息嗎？",
      "boundary": "retry／DLQ 是目前 domain method，不說成過去已 production 實作。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 20,
      "title": "第三方顯示成功、平台顯示失敗怎麼處理？",
      "framework": "freeze action → evidence／SoT → reconcile → communicate",
      "answer": "我會先停止後續不可逆操作，不直接再送一次。接著保留雙方請求、回傳和時間紀錄，確認這個狀態應由哪一方裁決，再用查詢或受控對帳把結果收斂。在確認前，顧客看到的是「處理中」或「待確認」，而不是假裝成功；營運端則要有負責人、處理時限和修復入口。這和我過去規劃第三方支付狀態與 NFT 對帳的問題結構相近。",
      "followUp": "多久後轉人工？／如果 provider 查不到？",
      "boundary": "不說做過 CRM connector incident；不虛構 SLA。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 21,
      "title": "Connector failure 何時 pause Journey？",
      "framework": "harm threshold → blast radius → safe degradation",
      "answer": "我的判斷標準是：這個故障會不會讓我們聯繫錯人、在沒有同意時發送、忽略已回購或造成重複訊息。如果會，就暫停受影響的客戶、分群或渠道；如果只是非關鍵資料延遲，可以降級並標示資料較舊。修復後要先核對狀態，再受控恢復，已經過時的訊息不補發。",
      "followUp": "誰有 kill switch？／如何恢復？",
      "boundary": "門檻和 authority 是 Unknown，需由 Product、Engineering、Ops、Privacy 對齊。",
      "categoryKey": "G",
      "category": "Integration Failure"
    },
    {
      "number": 22,
      "title": "如何證明 Journey 真的提高回購？",
      "framework": "eligible cohort → stable control → ITT → primary＋guardrails",
      "answer": "我會在顧客符合首購條件時，就用同一個顧客 ID 固定分成實驗組和控制組，等每位顧客完成 90 天觀察期後，再比較兩組真正的回購率。歷史資料用來估算基準和所需樣本，並另外看增量毛利。開信、點擊或 AI 處理比例可以幫助診斷，但不能代替「是否真的多了回購」這個結果。",
      "followUp": "樣本不夠？／跨渠道污染怎麼辦？",
      "boundary": "baseline、MDE、sample、duration 都是 TBD，不能給漂亮假數字。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 23,
      "title": "Leading metrics 與 Guardrails 怎麼選？",
      "framework": "causal chain → failure diagnostics → harm／economics",
      "answer": "我會沿著旅程挑前導指標：有多少顧客符合資格、成功進入、準時收到訊息、有效回覆，以及 AI 或真人是否解決問題。風險指標則看退訂、投訴、身份錯誤、未授權或重複發送、AI 錯誤、客服積壓、退款和毛利。每個指標都要先說清楚分母、觀察期間、去重方式、資料來源和負責人。",
      "followUp": "Open rate 高算成功嗎？／哪個 guardrail 零容忍？",
      "boundary": "不要把 leading metric 上升稱為 business success；法律／隱私事件依 policy 處理。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 24,
      "title": "結果不顯著，但客戶很喜歡，怎麼決定？",
      "framework": "power／data quality → segment effect → cost／strategic value → next test",
      "answer": "我不會因為結果不顯著就立刻說功能沒用，也不會因為客戶喜歡就宣布成功。先檢查樣本是否足夠、資料有沒有問題、觀察期是否完成，以及其他活動是否污染實驗。只有原計畫已允許續收，或觀察期尚未成熟，才依原規則繼續；否則應提出新假設、開新實驗。如果它帶來的是服務價值而不是回購價值，就要改用另一個目標和成本標準評估。",
      "followUp": "客戶堅持 rollout？／何時停止？",
      "boundary": "避免事後挑 segment 或改 primary metric 美化結果。",
      "categoryKey": "H",
      "category": "Journey／Metrics"
    },
    {
      "number": 25,
      "title": "工程不同意你的方案，怎麼辦？",
      "framework": "共同 outcome → facts／constraints → options／trade-offs → decision owner",
      "answer": "我會先把「不同意」拆成具體問題：是做不到、不可靠、成本太高，還是範圍太大。請工程提出可行選項與失敗情況後，我把使用者價值、風險、時程和驗收放在同一張表比較。能縮小 MVP 就縮小，不能承擔的限制就變成上線門檻；超出雙方權限時交給明確的負責人決定。我的真實證據是技術取捨，不會把它包裝成激烈衝突。",
      "followUp": "最後你讓步過嗎？／如果 CTO 直接決定？",
      "boundary": "不要塑造總是說服工程，也不要編造個別衝突細節。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 26,
      "title": "如何處理 PM、Sales、CS 對優先級意見不同？",
      "framework": "separate requests from outcomes → common evidence → decision cadence",
      "answer": "我會先把三方意見改寫成同一套問題：要改善什麼客戶結果、影響多少人、證據是什麼、時效多急，以及做錯的成本。用共同標準比較，而不是用職稱投票。小範圍且可回復的決策由負責人做；跨產品或重大商業取捨才進正式審查。決定後也要記錄這次不做什麼、何時重新評估，以及由誰對外溝通。",
      "followUp": "CEO request 呢？／如何避免分析太久？",
      "boundary": "這是管理方法，不聲稱發生過同一個 Omnichat 場景。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 27,
      "title": "請說一次你調整高風險需求的案例。",
      "framework": "original scope → external constraint → phased roadmap → ownership limit",
      "answer": "在 Xchanger 規劃遊戲道具交易時，原本同時考慮平台對顧客與顧客對顧客兩種模式。我整理 KYC、資料流、平台規則和營運控制，支援與數位發展部溝通；得到的方向是先做 B2C，再逐步處理 C2C 所需申請。我因此把完整需求改成分階段 Roadmap。這不是我單獨否決需求，也不能宣稱已獲正式核准或產生上線成效。",
      "followUp": "如何保留 C2C 未來能力？／對內怎麼溝通？",
      "boundary": "引用 S7，保留 regulator feedback、個人 ownership 與結果邊界。",
      "categoryKey": "I",
      "category": "Stakeholder／Conflict"
    },
    {
      "number": 28,
      "title": "前三十天你會做什麼？",
      "framework": "learn product／customer／team → map → baseline",
      "answer": "前 30 天我會先弄清楚自己負責的模組、決策邊界和目前的成功標準。接著實際走過產品與測試環境，旁聽客戶訪談、導入或問題檢討，並和 PM、工程、設計、客服及業務一起畫出顧客、身份、訂單、聯繫同意和旅程的資料流。交付物會是產品知識圖、主要問題、已知失敗和未知清單，而不是一開始就重做 Roadmap。",
      "followUp": "如何避免只在學習？／第一個 quick win？",
      "boundary": "不知道能否取得 sandbox／客戶訪談；產出應依實際 access 調整。",
      "categoryKey": "J",
      "category": "90-Day Plan"
    },
    {
      "number": 29,
      "title": "第 31–60 天的可驗證成果是什麼？",
      "framework": "select one problem → baseline → solution options → reviewed MVP",
      "answer": "第 31 到 60 天，我會從整合、旅程、後台流程或資料品質中挑一個價值明確、邊界清楚的問題。和工程確認資料責任、狀態、錯誤路徑、投入和不做範圍，再建立基準、主要指標與風險指標。這階段的成果是一份通過客戶、領域和技術審查的 MVP 與衡量計畫，不會在不了解團隊節奏前承諾一定上線。",
      "followUp": "問題怎麼選？／若 baseline 不可得？",
      "boundary": "不預設第一個問題或公司 release cadence；資料不可判定時先修 instrumentation。",
      "categoryKey": "J",
      "category": "90-Day Plan"
    },
    {
      "number": 30,
      "title": "到第 90 天，怎樣算成功？",
      "framework": "team trust＋decision quality＋delivery evidence",
      "answer": "到第 90 天，我希望至少讓一個範圍清楚的 MVP 完成驗證，或進入有明確負責人、驗收與上線門檻的開發階段。同時把整合方式、例外、指標和決策整理成可重用的規則。成功不是宣稱我三個月就改造了 CDP，而是團隊能確認我可以獨立負責一個問題、誠實管理領域缺口，並做出可追溯的決策。",
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
      "answer": "我會先說明這是通用參考架構，不代表 Omnichat 現況。白板由左到右分成四層：最左是 CRM、電商／POS 和 LINE／WhatsApp 等資料來源；中間先驗證、去重並保留原始事件，再處理顧客身份與聯繫同意；右邊由分群和旅程決定動作，最後透過渠道或有邊界的 AI 執行。送達、轉換、失敗和真人交接結果都要回流。整張圖底部再補權限、個資、稽核、監控與對帳。實際元件、流量和服務目標仍要和工程及資料團隊確認。",
      "followUp": "為何 raw event 與 profile projection 分開？／哪裡 fail closed？／multi-tenant 邊界在哪？",
      "boundary": "這是 domain model；不說成過去做過 CRM architecture。白板把 `UNKNOWN: Omnichat actual stack／scale` 寫在右上角。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 2,
      "title": "Customer 360 的 canonical model 會有哪些核心物件？",
      "framework": "Customer＋Identifier＋Consent＋Event／Order＋Conversation＋Segment／Journey；lineage／version／authority",
      "answer": "我會把顧客當成中央主體，再連五類物件：各來源的身份識別、依品牌與渠道保存的聯繫同意、不可隨意覆寫的互動事件、有狀態的訂單與對話，以及有版本和時間的分群與旅程紀錄。每一項資料都要知道從哪裡來、何時更新、誰有權修改、衝突時誰裁決。否則只是把資料拼在一起，還不能稱為可治理的 Customer 360。",
      "followUp": "Profile attribute 與 event 如何同步？／delete／tombstone 怎麼辦？",
      "boundary": "候選人有 account／wallet／state 的相鄰能力，沒有 direct Customer 360 production ownership。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 3,
      "title": "Identity Resolution 怎麼做 merge／split？",
      "framework": "strong evidence → conflict／shared-value check → reversible merge → downstream remediation",
      "answer": "我的原則是先保守合併，再確保能拆回來。MVP 只採已驗證的會員連結或有唯一性規則的強識別；姓名、相似行為或共用電話不能直接合併。每次合併都要保留規則、原因、來源與前後狀態，聯繫同意也不會因此放寬。如果發現誤合併，就先停止高影響操作、隔離受影響資料，再拆分並追查下游。機率式配對要等到測試資料、人工審查和回復流程成熟後才考慮。",
      "followUp": "兩人共用電話？／錯 merge 後已發訊息怎麼辦？",
      "boundary": "KYC 是 identity verification／eligibility，不等於 CRM identity resolution。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 4,
      "title": "多個系統對同一欄位衝突，Source of Truth 怎麼定？",
      "framework": "field-level authority → validity／purpose → event time／version → conflict state／reconciliation",
      "answer": "我不會把「最後寫入」當成通用答案，而是逐項指定權威來源。例如訂單和退款由交易系統負責，渠道是否可達由渠道供應商負責，旅程狀態由編排系統負責，聯繫同意則要看目的、市場和撤回時間。發生衝突時先看資料契約、驗證狀態和事件版本；如果仍不能裁決，就保留衝突與來源，高風險動作先停止，再交由指定負責人對帳。",
      "followUp": "manual override 的 authority？／舊 backfill 把刪除資料復活？",
      "boundary": "可引用 CEX／NFT reconciliation requirements 的思考；不說做過 CRM field-level SoT。",
      "categoryKey": "A",
      "category": "System／Data Architecture"
    },
    {
      "number": 5,
      "title": "Webhook 重複、延遲、亂序與漏送，產品和系統如何處理？",
      "framework": "event contract → persist／dedupe → ordering／state rule → retry／DLQ → API reconciliation",
      "answer": "我會把問題拆成「不要重做、不要倒退、不要漏掉」三件事。事件需要唯一識別、對象、發生時間和版本；收到後先可靠保存，重複事件不重做，較舊事件也不能覆蓋新狀態。暫時性錯誤才有限次重試，無法自動處理的事件進隔離區，再用 API 或全量對帳補漏。PM 要定義顧客看到的狀態、營運處理入口和重播副作用；佇列與儲存方案由工程負責。",
      "followUp": "來源沒有 event ID？／重播會不會再發訊息？",
      "boundary": "這是 `RECOMMENDATION`；過往未證 production retry／DLQ ownership。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 6,
      "title": "Idempotency key 應該怎麼選？",
      "framework": "business operation identity → scope／TTL → stored result → side effects",
      "answer": "冪等鍵要代表同一個業務意圖，而不只是某一次網路請求。例如一個來源事件可以用租戶、來源和事件 ID 組合；一個旅程動作則要包含顧客、旅程版本和節點。產品上最重要的是先定義「哪些操作算同一件事」以及保留多久，確保重試不會重複發訊息、重複建單或重複改狀態。跨服務的一致性方案再由工程選擇。",
      "followUp": "Key 永久保存嗎？／第三方 timeout 但其實成功？",
      "boundary": "不替 Engineering 選資料庫或宣稱親自實作；重點是 business invariant。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 7,
      "title": "Retry、DLQ 與 reconciliation 的責任如何分開？",
      "framework": "transient recovery／isolation／truth convergence",
      "answer": "三者處理的問題不同。重試是處理短暫失敗，所以要有次數上限與退避；死信佇列是隔離不能安全自動處理的事件，必須有分類、告警和負責人；對帳則是回到權威來源重新比較，用來處理漏送、部分成功或長期不一致。最後的判斷不是系統有沒有多試幾次，而是業務狀態是否真的收斂。",
      "followUp": "DLQ 積壓何時 pause Journey？／redrive 前要驗證什麼？",
      "boundary": "不能虛構 SLA／queue throughput；threshold `TBD`。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 8,
      "title": "第三方顯示成功、平台顯示失敗，你怎麼 recovery？",
      "framework": "freeze irreversible action → collect correlation evidence → query authority → reconcile／communicate",
      "answer": "我會先停止後續不可逆操作，不直接重送。接著保留雙方請求、回傳、時間與關聯紀錄，確認這個狀態應由哪一方裁決，再用查詢或對帳確認。顧客先看到「處理中」或「待確認」，營運端有明確負責人和修復入口。如果最後仍無法確認，就依風險選擇取消、人工審查或補償，而不是猜測成功。",
      "followUp": "provider 查詢也 unavailable？／補償會造成什麼風險？",
      "boundary": "`DIRECT` 可引用 BANXA 的多狀態產品規劃；不說曾處理此 production incident。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 9,
      "title": "Schema drift 或錯誤 backfill 如何避免污染 Journey？",
      "framework": "versioned contract → quarantine／dry run → replay flag → activation suppression → audit",
      "answer": "我會先把資料變更和歷史回填都當成可能影響顧客的發布。資料結構要有版本與契約測試，不相容的資料先隔離，不能默默塞預設值。歷史回填要先限定範圍、保存來源快照並做試跑，預設不能觸發今天的顧客旅程。完成後要比較筆數、狀態分布和對帳差異，由負責人確認後才重新啟用。",
      "followUp": "如何處理 producer 先升版？／歷史事件是否重算 segment？",
      "boundary": "這是通用設計；沒有既有 production backfill 成果。",
      "categoryKey": "B",
      "category": "Integration Reliability／Failure Recovery"
    },
    {
      "number": 10,
      "title": "Enterprise CRM 的 RBAC 怎麼設計？",
      "framework": "subject／role／resource／action／scope → least privilege → approval／audit",
      "answer": "我會先從「可以對什麼資料做什麼事」開始，而不是只看職稱。讀取顧客資料、匯出個資、修改分群、發布旅程和管理租戶都要分開授權，並受到租戶、品牌、市場和環境限制。高影響操作要加入雙人覆核、再次驗證或限時權限。最後稽核要能回答誰在什麼理由下改了什麼、前後差異是什麼，以及由誰核准。",
      "followUp": "RBAC 不夠時要 ABAC 嗎？／break-glass 怎麼管？",
      "boundary": "`DIRECT` 是多層 approval／risk requirements；enterprise RBAC implementation 是 `RECOMMENDATION`。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 11,
      "title": "Consent 與 PII 權限怎麼進入 Journey／Agent runtime？",
      "framework": "purpose-bound consent → action-time check → minimization → fail closed → proof",
      "answer": "聯繫同意不能只存一個勾選值，至少要知道是哪位顧客、哪個品牌與市場、什麼目的、哪個渠道、目前狀態和證明來源。顧客進入旅程時可以先檢查，但真正發送或執行 AI 工具前要再確認；已撤回、被封鎖或狀態不明就停止。AI 只取得完成任務所需的最少欄位，敏感資料遮罩，紀錄決策依據但不複製完整個資。",
      "followUp": "Consent service timeout？／merge 後 Consent 怎麼處理？",
      "boundary": "不宣稱具法律 interpretation 或 Consent platform ownership；Legal／Privacy 是 approval owner。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 12,
      "title": "Audit log 要記什麼？怎麼避免 audit 本身成為 PII 風險？",
      "framework": "who／what／why／when／source／result → tamper evidence → minimization／retention／access",
      "answer": "我會優先記錄會改變資料或造成外部影響的操作，例如合併顧客、匯出資料、發布旅程、AI 工具呼叫和人工覆寫。每筆紀錄要能回答誰、以什麼角色、對哪個租戶、依哪個版本、為什麼操作、誰核准，以及結果如何。稽核紀錄本身也要最小化個資，不需要保存完整提示或對話；敏感值可遮罩並限制存取與保留期限。底層儲存方式由安全與工程團隊決定。",
      "followUp": "如何支援調查又能刪除資料？／誰可以看 audit？",
      "boundary": "不說符合未證實的認證標準。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 13,
      "title": "Cross-tenant data leakage 如何防？",
      "framework": "tenant context at auth／storage／retrieval／tool → tests → monitoring／kill switch",
      "answer": "租戶邊界不能由前端或模型自己提供，而要由伺服器驗證後產生。資料查詢、快取、檢索、工具憑證和事件都必須綁定同一租戶，AI 能看到的內容和工具也依租戶限制。測試要刻意驗證跨租戶讀寫一定失敗，監控則找範圍不一致。只要懷疑資料外洩，就先停止受影響能力、保全紀錄，再啟動隱私與安全處理流程。",
      "followUp": "shared index／cache 怎麼辦？／support admin 的跨 tenant access？",
      "boundary": "是 architecture recommendation，不是過往 incident／certification claim。",
      "categoryKey": "C",
      "category": "RBAC／Consent／PII／Audit"
    },
    {
      "number": 14,
      "title": "你會觀測哪些層次，才知道系統真的健康？",
      "framework": "infra／integration → data → business state → customer harm → operator recovery",
      "answer": "我會分五層觀測，而不是只看 API 有沒有回 200。整合層看錯誤、重試和積壓；資料層看新鮮度、重複、格式拒絕與對帳差異；業務層看旅程是否卡住或重複執行；AI 看回答依據、工具正確性、轉人工、延遲和成本；營運層看待處理量與修復是否完成。每個告警都要有負責人、處理方式、影響範圍和暫停或回復權限。",
      "followUp": "哪些是 SLI？／怎麼避免 alert fatigue？",
      "boundary": "沒有 Omnichat SLO 或 volume；不填假 threshold。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 15,
      "title": "遇到部分系統失效，如何 graceful degradation？",
      "framework": "classify criticality → preserve truth／consent → degrade read／write → communicate → recover",
      "answer": "我會先判斷故障會不會讓系統聯繫錯人、忽略同意狀態、看錯訂單或重複執行高影響操作。如果會，受影響的租戶、分群或渠道就停止；如果只是非關鍵補充資料延遲，可以標示資料較舊並降級服務。AI 也可以從可執行動作退成只讀回答，再退到真人。恢復時先核對狀態，已過時的訊息不補發。",
      "followUp": "誰決定 fail open？／如何最小化 blast radius？",
      "boundary": "這是 future design；不虛構 incident。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 16,
      "title": "Cost、latency、quality 怎麼取捨？",
      "framework": "task criticality → deterministic first → model routing／cache → SLO＋quality guardrail → unit economics",
      "answer": "我會先把不能出錯的部分固定下來：身份、聯繫同意、資格和不可逆操作用明確規則處理；只有需要理解語意、而且可以轉人工或回復的工作才交給 LLM。簡單任務用規則或較小模型，複雜推理才升級。衡量時看整段任務的成功率、延遲、逾時和每個有效解決的成本，不只比較模型單價。實際門檻要用真實流量和商業價值決定。",
      "followUp": "Streaming 會改善什麼、不改善什麼？／cache stale 怎麼辦？",
      "boundary": "不給未驗證 token cost／latency 數字。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 17,
      "title": "Scalability 你會先問哪些問題？",
      "framework": "workload／burst／tenant fairness → state／consistency → quota／partition → degradation／capacity test",
      "answer": "我會先問規模和尖峰：每天有多少事件與訊息、尖峰多高、最大的客戶多大，以及一個旅程會同時展開多少動作。接著把使用者必須立即得到結果的流程，和可以排隊處理的工作分開。產品端要先定哪些可以延遲、哪些不能遺失、過期後還要不要執行，以及容量不足時如何告知營運人員；配額、分區和背壓等技術方案由工程決定。",
      "followUp": "大型 tenant 突發 campaign？／公平與付費 tier 如何取捨？",
      "boundary": "Omnichat scale `UNKNOWN`；不聲稱做過同等規模。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 18,
      "title": "Consistency、availability、latency 衝突時怎麼決策？",
      "framework": "business invariant／harm → strong vs eventual by object → user state／reconciliation",
      "answer": "我不會要求整個系統都採同一種一致性，而是看錯誤成本。聯繫同意、顧客合併和不可逆操作偏向正確性，資料不確定就停止；分析報表或非關鍵補充資料可以稍後一致，但要標示更新時間。如果訂單延遲可能造成錯發，執行前就回到權威來源重查；若確認需要時間，先顯示處理中，而不是假裝成功。",
      "followUp": "如何量化 staleness budget？／跨區域呢？",
      "boundary": "可連結 CEX／BANXA state product thinking；不宣稱分散式系統實作 ownership。",
      "categoryKey": "D",
      "category": "Observability／Recovery／Scale／Trade-off"
    },
    {
      "number": 19,
      "title": "請畫 production-grade Agent architecture。",
      "framework": "trigger → context → policy → planner／router → tools → validation → human → action → trace／eval",
      "answer": "我會把架構畫成六個關卡。先確認租戶、使用者和任務；再只組裝已核准且有權存取的資料；接著由政策層決定哪些動作可讀、可寫或禁止。模型只能產生符合結構的計畫，工具入口再檢查白名單、最小權限和重複執行保護。結果還要經來源、業務規則與權限驗證，高影響或低信心就交給人，最後才執行並留下完整紀錄。任何關鍵依賴失效，都退回固定流程或真人。",
      "followUp": "Prompt injection 在哪攔？／planner output 怎麼驗？",
      "boundary": "`DIRECT` 是 role／artifact／gate workflow；production runtime 是 `PROPOSED`。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 20,
      "title": "何時用 deterministic workflow，何時用 Agent？",
      "framework": "variance／judgment／reversibility／risk → hybrid boundary",
      "answer": "判斷原則是「能不能清楚列出規則，以及做錯能不能回復」。法遵、權限、金額、狀態轉移和可枚舉流程優先用固定工作流；需要理解非結構內容、比較選項或產生建議，而且結果可以驗證或撤回時，才使用 Agent。實務上通常是固定規則包住 Agent：Agent 提建議，系統驗證，必要時人核准，真正執行仍走受控介面。",
      "followUp": "如果 Agent 比 rule 準？／如何避免 workflow 太僵硬？",
      "boundary": "不能把所有 automation稱 Agentic；不宣稱既有 production accuracy。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 21,
      "title": "RAG、Tool Calling、Fine-tuning 怎麼選？",
      "framework": "knowledge freshness／action need／behavior consistency",
      "answer": "我會先看問題缺的是知識、動作還是穩定行為。需要最新且可引用的公司或客戶知識時用 RAG；需要查詢或改變外部狀態時用工具呼叫，但先做權限、參數與重複執行檢查；只有任務很穩定、已有足夠高品質資料時，才考慮微調。三者可以組合，但 RAG 不保證答案正確，微調也不能取代權限與最新資料。",
      "followUp": "RAG 找錯文件怎麼辦？／何時不值得 fine-tune？",
      "boundary": "不聲稱訓練過 production model。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 22,
      "title": "Agent tool permission 怎麼做 bounded autonomy？",
      "framework": "read／draft／write tiers → allowlist／scope → precondition → approval → postcondition／audit",
      "answer": "我會把工具動作分成讀取、產生草稿、可回復寫入和高影響寫入四級。權限要綁定租戶、操作者、目的和有效期限，工具也只暴露必要欄位。每次執行前先檢查政策與業務條件；發訊息、改聯繫同意、合併顧客或退款等高影響動作，預設禁止或需要人工核准。執行後再驗證結果並留下稽核，也要能按工具、租戶或流程立即停用。",
      "followUp": "Human rubber stamp 怎麼防？／permission cache stale？",
      "boundary": "不說已實作 enterprise permission gateway。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 23,
      "title": "你會怎麼做 AI evaluation？",
      "framework": "task taxonomy → golden dataset → offline／online → safety／operations → decision rule",
      "answer": "我不會只給 Agent 一個總分，而是把任務拆成檢索、回答、工具計畫、實際執行和交接逐段評估。測試集要同時包含正常、模糊、惡意、權限不足、個資、過期資料、工具失敗和轉人工案例。離線先看回答有沒有依據、引用和工具是否正確；線上再看任務成功、重開、人工接受、轉人工、延遲、成本和傷害。關鍵案例要有人標註，每個版本也要有上線與回復門檻。",
      "followUp": "Grounded但答案沒用？／dataset drift？",
      "boundary": "本地 reviewer是方法證據；沒有 enterprise golden-set 結果。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 24,
      "title": "Low-confidence、tool failure 與 human handoff 怎麼設計？",
      "framework": "detect → stop／clarify → preserve context → assign → SLA／feedback",
      "answer": "低信心不能只相信模型自己說「我不確定」，還要看資料是否足夠、有沒有衝突、權限是否允許，以及工具回傳是否正常。能安全澄清時只問必要的一題；否則停止動作並轉真人。交接內容要包含顧客意圖、已確認與未知事項、使用來源、嘗試過的工具、錯誤和建議下一步，而且摘要不能取代原始紀錄。真人佇列滿載時也要誠實告知狀態，不假裝已解決。",
      "followUp": "何時自動 retry tool？／怎麼衡量 handoff quality？",
      "boundary": "不虛構 handoff SLA；role owner／threshold TBD。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 25,
      "title": "Prompt injection／惡意文件怎麼處理？",
      "framework": "treat content as data → source trust／isolation → policy outside model → tool confirmation → adversarial eval",
      "answer": "我會把外部訊息和檢索到的文件都視為不可信資料，它們可以提供內容，但不能改寫系統規則或工具權限。上下文要標示來源與信任層級，並隔離租戶和文件範圍；高風險指令必須由伺服器驗證，必要時再經人工核准，不能讓模型自己組憑證或目標位置。測試要涵蓋間接提示注入、資料外傳和跨租戶案例，發現異常就先停用工具並保全紀錄。",
      "followUp": "文件本來就包含操作指引？／模型繞過 regex？",
      "boundary": "不把prompt filter當唯一防線；不宣稱零風險。",
      "categoryKey": "E",
      "category": "Agent Architecture／Evaluation／Safety"
    },
    {
      "number": 26,
      "title": "PM 應該懂到多深，才不會越權？",
      "framework": "own problem／invariant／acceptance／risk；partner on options；Engineering owns how",
      "answer": "PM 要懂到能把需求變成可驗證的系統行為：誰能做什麼、哪些規則不能破壞、有哪些狀態與錯誤、權限和服務目標是什麼，以及營運如何修復。也要能追問一致性、遷移、成本和失敗情況。但服務、資料庫、佇列、分區、估時和程式品質仍由工程負責。我的價值是把技術取捨帶回顧客結果與風險，不是假裝自己做過底層實作。",
      "followUp": "工程只給一個方案？／何時 challenge architecture？",
      "boundary": "清楚說 ownership，不用術語包裝工程能力。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 27,
      "title": "Engineering 認為需求成本太高，你怎麼做 technical trade-off？",
      "framework": "restate outcome → expose constraints／failure → options including status quo → reversible slice／decision owner",
      "answer": "我會先問成本真正來自規模、一致性、遷移、安全，還是需求範圍。接著固定使用者結果和不能破壞的規則，再比較縮小範圍、接受較舊資料、增加人工處理、分階段發布或延後等選項。每個選項都說清楚價值、風險、是否可回復、依賴和營運成本，再由對應負責人決定。我可以用 Grid 和 BANXA 的產品取捨證明這套方法，但不會虛構一場工程衝突。",
      "followUp": "你何時會接受 manual workaround？／technical debt如何記？",
      "boundary": "`HOLD-DISAGREEMENT-001` 維持 HOLD。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 28,
      "title": "你如何定 release gate 與 rollback？",
      "framework": "risk-based gates → staged exposure → monitor → authority／runbook → learning",
      "answer": "我會先看做錯的傷害、是否可回復、影響範圍，以及能不能快速發現，再決定上線門檻。最低要確認驗收、權限與安全、資料品質、關鍵監控、客服與營運準備，以及回復方式；先內部測試，再小範圍試行和逐步放量。暫停條件、誰能執行回復、如何保留狀態與修復顧客資料，都要事前決定。程式完成不等於產品可以安全上線。",
      "followUp": "Rollback比向前修復更危險？／資料migration如何回？",
      "boundary": "不提供假 exposure percentage或事故案例。",
      "categoryKey": "F",
      "category": "Technical Collaboration／Trade-off"
    },
    {
      "number": 29,
      "title": "四個月 0→1 CEX，架構與優先順序怎麼切？",
      "framework": "business／risk core → account／wallet／state → approval／ops → review／non-goal → ownership",
      "answer": "這段是我的直接經驗。我帶領三位 PM 和兩位設計師，負責產品架構、優先順序與跨區協作。四個月的範圍先守住帳戶、錢包、資產可追溯、交易主流程、KYC／風控、關鍵審批與營運可見性，再擴充返佣和 Grid 等能力；並用模組化需求與同儕審查，提早發現跨模組的狀態和例外。技術設計與實作由工程負責，我不會補造交易量或事故改善數字。",
      "followUp": "你砍了什麼？／最大dependency？／如何驗收資產一致性？",
      "boundary": "只用已證四個月／團隊範圍；完整scope cut與實際衝突細節若來源不足就說記錄中沒有。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 30,
      "title": "BANXA／法幣整合，你的 product contract 是什麼？",
      "framework": "eligibility → provider handoff → state map → callback／query → customer＋operator recovery",
      "answer": "我的直接責任是規劃平台資格、第三方 KYC 交接，以及訂單從建立、付款、完成到退款、拒絕和取消的狀態，並連結顧客畫面與營運控制。我會先定義誰建立訂單、何時算接受、付款或完成，狀態衝突時由誰裁決、逾時顯示什麼，以及如何查詢和對帳。這套方法可以遷移到 CRM 串接，但重試、失敗佇列與 API 實作不是我的過往責任。",
      "followUp": "callback與query不同怎麼辦？／如何避免double purchase？",
      "boundary": "不說支付清算、SLA或production incident。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 31,
      "title": "Grid 系統最難的 technical trade-off 是什麼？",
      "framework": "strategy flexibility／state complexity／risk clarity／operations",
      "answer": "我的直接責任是規劃中性、做多、做空、等差與等比網格，以及保證金、預估強平、手動終止和後台可見性。最難的取捨是在策略彈性與顧客能理解的風險之間；每多一種設定，都會增加狀態、例外和客服成本。所以 MVP 要限制選項、清楚顯示估算與終止結果，並讓營運人員能追蹤。量化模型、撮合和程式實作由工程負責。",
      "followUp": "estimated liquidation與actual不同？／manual terminate部分成功？",
      "boundary": "不虛構volume／retention lift或真實loss incident。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 32,
      "title": "KYC／Approval 經驗如何遷移到 enterprise governance？",
      "framework": "eligibility／evidence → role／risk tier → maker-checker → exception／audit",
      "answer": "我的直接經驗包含 KYC 供應商流程、文件與資格要求，以及一到六層的高風險審批。我會遷移的是把操作按風險分級，把讀取、修改和核准分開，保留原因與稽核紀錄，並提供人工審查和重設路徑。這套方法能用來思考 CRM 發布、個資匯出或 Agent 的高影響工具，但不代表我做過聯繫同意平台、Sumsub SDK 或安全架構。",
      "followUp": "六層是否過度設計？／如何避免rubber stamp？",
      "boundary": "多層數字只屬既有 approval artifact；不可套成Omnichat建議層數。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 33,
      "title": "NFT reconciliation 經驗如何回答 Source of Truth？",
      "framework": "intent／signature／on-chain state／off-chain projection → mismatch → manual recovery",
      "answer": "我的直接責任是規劃 WalletConnect、EIP-712、資產轉移和非託管對帳需求。我會把使用者意圖、簽署、鏈上確認和平台顯示拆成不同狀態，平台不能顯示超過鏈上權威狀態；有差異時要顯示待確認、重新查詢，並提供營運可見性與稽核。這是需求規劃經驗，不是我實作智能合約、索引器或處理正式環境事故。",
      "followUp": "Chain reorg？／signature成功但transaction未送出？",
      "boundary": "metadata、royalty、listing與production outcome維持 HOLD。",
      "categoryKey": "G",
      "category": "Candidate Experience Deep Dive"
    },
    {
      "number": 34,
      "title": "請白板從一份 PRD 拆到 Scrum Board tickets。",
      "framework": "approved contract → vertical WBS → ticket schema → role reviews → Board／release",
      "answer": "我會先固定已核准的 PRD 版本，確認 MVP、主要流程、不做範圍、限制、驗收和依賴都足夠。接著依進入條件、主要流程、例外、營運處理、衡量和發布，拆成可獨立驗收的使用者故事。每張票都要帶來源、問題、範圍、不做事項、驗收、依賴、風險和角色負責人；估時先保留給工程。PM／PJM、設計、工程和 QA 審查後才寫入 Board；缺決策或版本漂移就停止。已證的是本機的角色、產物和獨立審查流程，Board 自動化仍是建議方案。",
      "followUp": "為何不是一個PRD section一張票？／ticket太大如何拆？",
      "boundary": "使用 `09-agentic-pjm-workflow.md` 白板圖；不說已在企業全面導入。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    },
    {
      "number": 35,
      "title": "Agent 如何避免擴 scope、處理 version drift 與權限？",
      "framework": "source pinning／bidirectional trace → diff／stale state → draft-only RBAC／approval → audit",
      "answer": "每張票都要回指已核准文件的編號、版本和需求，生成後做雙向覆蓋檢查；沒有來源的內容只能標成範圍變更建議，不能直接加入。文件更新時，Agent 比較差異，把受影響的票標成需要重審，不覆寫進行中的工作；由 PM 決定範圍、工程重估、QA 更新測試。Agent 預設只讀核准資料、只寫草稿，不能自行指派、估時、轉狀態或發布，所有工具呼叫與核准都要可追溯。",
      "followUp": "已進Sprint怎麼辦？／如何處理PII與cross-tenant board data？",
      "boundary": "production drift detector／Board API／RBAC是 proposed，不是已證 deployment。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    },
    {
      "number": 36,
      "title": "如何衡量 Agentic PJM pilot，而不自我美化？",
      "framework": "baseline → shadow comparison → quality／risk／operations／cost → staged permission",
      "answer": "我會先量人工基線，例如從 PRD 到準備完成的時間、澄清次數、範圍重開、缺少驗收或依賴，以及審查時間。第一階段只讓 Agent 產生草稿、不寫入 Board，再比較人工接受率、來源依據、需求覆蓋、修改幅度和風險發現；同時觀察延遲、失敗、核准等待和成本。只有品質和風險指標達到事前門檻，才考慮受控寫入。我的現有證據只支持工作流程結構與本機審查，不支持企業導入成效。",
      "followUp": "Acceptance高但團隊變慢？／如何避免只挑容易ticket？",
      "boundary": "不得使用days-to-hours、ROI、adoption、defect reduction等未證數字。",
      "categoryKey": "H",
      "category": "Agentic Workflow × PJM"
    }
  ]
};
