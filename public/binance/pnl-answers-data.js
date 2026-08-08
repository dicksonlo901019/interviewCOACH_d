window.BINANCE_PNL_ANSWERS = Object.freeze({
  "version": "2026-08-08",
  "authority": "https://github.com/dicksonlo901019/interviewCOACH_d/issues/10",
  "sourceBoundary": "interviews/binance-asset-module/evidence/claim-ledger.md",
  "groups": [
    {
      "targetId": "st-3-1-pnl",
      "label": "Stella(面試官姓名)可能問",
      "questions": [
        {
          "id": "BN-PNL-01",
          "question": "你做過 PnL(損益)到什麼深度？",
          "originalZh": [
            "我過去直接規劃過帳戶與錢包架構、資產快照、USDT(泰達幣)估值，以及每日 PnL(損益)可視性需求。我負責產品架構、業務規則、產品需求文件、顯示邏輯與跨團隊對齊，但不是完整成本基礎計算引擎或大型資料處理管線的工程實作者。",
            "若要說明我的能力深度，我能定義要納入哪些帳戶、資產、部位、時間範圍與損益組成，也能把內部移轉、費用、價格來源、延遲資料和對帳差異轉成例外情境與驗收案例。至於 Binance(幣安)實際採用的成本價公式、資料規模與技術架構，我會先和產品、資料、工程及財務會計領域的負責人確認，不會把建議方法說成既有事實。"
          ],
          "spokenZh": [
            "我做過帳戶與錢包架構、資產快照、USDT(泰達幣)估值，以及每日 PnL(損益)顯示需求。",
            "我的責任是定義產品邏輯、資料顯示、例外情境和驗收標準；完整的成本計算引擎與資料管線不是我的工程責任。",
            "如果加入團隊，我會先與產品、資料、工程及財務會計領域的負責人共同確認帳戶範圍、費用、價格、時間和重算規則。我負責把產品語義、案例與驗收標準整理清楚，再由資料及工程團隊決定技術實作。"
          ],
          "spokenEn": [
            "My direct experience includes account and wallet structures, asset snapshots, USDT valuation, and product requirements for daily P&L visibility. I owned the product logic, display rules, edge cases, and acceptance criteria, but I did not implement a full cost-basis engine or large-scale data pipeline.",
            "For this role, I can define the account scope, P&L components, time rules, and validation cases. I would confirm Binance's actual formulas and technical architecture with the relevant domain owners."
          ],
          "terms": [
            {
              "key": "binance",
              "label": "Binance(幣安)",
              "definitionZh": "全球加密資產交易平台；本文件不推測其未公開的內部公式或系統架構。"
            },
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；實際計算必須先定義帳戶範圍、價格、費用、時間與外部資金流。"
            },
            {
              "key": "usdt",
              "label": "USDT(泰達幣)",
              "definitionZh": "與美元價值連動的穩定幣，常作為加密資產估值或交易的顯示單位。"
            }
          ],
          "boundary": "可用過去式說明帳戶與錢包架構、資產快照、USDT(泰達幣)估值與每日 PnL(損益)可視性需求；不可聲稱建置完整成本基礎計算引擎或大型資料處理管線。"
        },
        {
          "id": "BN-PNL-02",
          "question": "成本價怎麼算？存入、提領、內部移轉與費用怎麼處理？",
          "originalZh": [
            "我不會先指定 Weighted Average(加權平均法)或 FIFO(先進先出法)，因為成本價必須先確認用途。投資表現、交易分析、帳戶報表與特定地區的稅務需求，可能需要不同的涵蓋交易、歷史批次與顯示方式。",
            "外部存入的資產，其原始取得成本可能不在平台資料中，因此要依產品目的決定標示為未知、採用存入時間的參考價格，或允許使用者依受控規則補充。提領通常代表資產移出，不應自動視為出售；內部移轉在整體資產組合範圍內原則上不應產生 PnL(損益)，也不應任意重設成本基礎。費用則要先區分交易費、提領費、資金費率、利息或其他損益組成。",
            "我的責任會是定義產品用途、涵蓋範圍、例外情境與計算範例；實際規則要與產品、資料、工程及財務會計領域的負責人共同確認。"
          ],
          "spokenZh": [
            "成本價沒有一個可以直接套用的答案，要先確認這個數字是用於投資表現、交易分析、帳戶報表，還是稅務用途。",
            "外部存入的原始成本可能不知道；提領不一定等於出售；內部移轉原則上不應產生 PnL(損益)；不同費用也要分開分類。",
            "我會和產品、資料、工程及財務會計領域的負責人共同確認這些規則。我負責整理產品語義、案例與驗收標準；資料及工程團隊負責技術設計與實作。"
          ],
          "spokenEn": [
            "I would not choose weighted average or FIFO before confirming the purpose. Investment performance, transaction analysis, account statements, and tax reporting may require different definitions.",
            "The original cost of an external deposit may be unknown. A withdrawal should not automatically be treated as a sale, and an internal transfer should not create P&L or reset the cost basis at the consolidated portfolio level. Fees must be classified, such as trading fees, withdrawal fees, funding, or interest, and their treatment should follow the approved definition. I would align the product rules, examples, and acceptance criteria with the relevant domain owners, while Data and Engineering own the implementation."
          ],
          "terms": [
            {
              "key": "weighted-average",
              "label": "Weighted Average(加權平均法)",
              "definitionZh": "將不同時間與價格取得的資產合併計算平均成本的方法。"
            },
            {
              "key": "fifo",
              "label": "FIFO(先進先出法)",
              "definitionZh": "假設最早取得的資產最先被出售或處分的成本計算方法。"
            },
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；成本、費用與資金流的處理方式必須依核准定義確認。"
            }
          ],
          "boundary": "本題是建議方法，不代表候選人做過完整成本基礎計算引擎；規則須與相關領域負責人共同確認。"
        },
        {
          "id": "BN-PNL-03",
          "question": "如果不同帳戶的 PnL(損益)對不起來，你怎麼找問題？",
          "originalZh": [
            "我會先確認這是真正的計算錯誤，還是涵蓋範圍、時間或規則版本不同。第一步比較雙方納入的帳戶、資產、部位、費用與負債，以及採用的結算時間、價格來源和規則版本。",
            "第二步沿資料流逐層比對期初餘額、有效流水、內部移轉、費用、調整與期末餘額，並用共同且唯一的交易識別碼確認是否出現遺漏、重複、延遲、沖正或對應錯誤。",
            "最後把差異分成時間差、資料缺陷或合理的業務例外。若結果可能誤導使用者或影響資金操作，我會先限制使用或清楚標示異常，再交由正確的產品、資料、工程或業務負責人修正與驗證。我不會把所有差異直接判定為程式錯誤。"
          ],
          "spokenZh": [
            "我會先判斷是數字真的錯，還是兩邊的範圍、時間或規則版本不同。",
            "接著從期初餘額、每筆有效流水、內部移轉、費用和期末餘額逐層比對，找出遺漏、重複、延遲或對應錯誤。",
            "最後把差異分成時間差、資料問題或合理例外，再交給正確的負責人處理。若可能影響使用者，我會先避免錯誤數字繼續被使用。"
          ],
          "spokenEn": [
            "I would first determine whether it is a real calculation error or a difference in scope, time, or definition version. Then I would compare the beginning balance, valid movements, internal transfers, fees, adjustments, and ending balance using common transaction identifiers.",
            "Finally, I would classify the gap as a timing difference, data defect, or valid business exception. If it could mislead users or affect money movement, I would protect users first and assign the correct owner for correction and validation."
          ],
          "terms": [
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；跨帳戶比較前必須先確認範圍、時間與規則版本。"
            }
          ],
          "boundary": "本題使用建議語氣；不可聲稱處理過未提供證據的正式環境 PnL(損益)事故或 Binance(幣安)全業務對帳。"
        },
        {
          "id": "BN-PNL-04",
          "question": "你會先改計算邏輯，還是先改頁面？",
          "originalZh": [
            "我不會直接把它視為計算邏輯與頁面的二選一，第一步是確認產品定義是否正確。如果帳戶範圍、外部資金流、價格來源或結算時間沒有共識，先改任何一層都可能只是把錯誤固定下來。",
            "如果數字確實錯誤，我會先控制使用者傷害，例如清楚標示資料異常、暫停顯示可能誤導的 PnL(損益)，或限制依賴該數字的操作；接著修正資料來源、計算邏輯與對帳規則。若數字正確但使用者看不懂，才優先改善損益組成、時間範圍、更新狀態與明細追溯。",
            "因此我的處理順序是：先確認定義，再保護使用者，接著修正資料與計算，最後改善呈現方式。"
          ],
          "spokenZh": [
            "我不會直接選計算邏輯或頁面，會先確認定義是不是一致。",
            "如果數字錯了，先避免使用者繼續依賴，再修正資料和計算。如果數字正確，只是使用者看不懂，才優先改善頁面說明。",
            "順序是先確認定義、保護使用者、修正計算，最後改善呈現。"
          ],
          "spokenEn": [
            "I would not treat this as a simple choice between calculation logic and the page. First, I would confirm the product definition.",
            "If the number is wrong, I would protect users first and then fix the source, calculation, and reconciliation rules. If the number is correct but difficult to understand, I would improve the components, time range, freshness, and drill-down experience."
          ],
          "terms": [
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；不能只以畫面呈現取代計算與資料驗證。"
            }
          ],
          "boundary": "本題是建議處理順序，不代表候選人處理過未提供證據的正式環境事故。"
        },
        {
          "id": "BN-PNL-05",
          "question": "如何和資料及工程團隊定義取數？",
          "originalZh": [
            "我會先和資料及工程團隊建立共同的資料契約，而不是由產品經理直接指定查詢工具或處理管線。每個欄位都要說清楚使用者用途、資料物件、計算粒度、權威來源、納入與排除規則、時間語義、狀態、精度、更新時效和規則版本。",
            "接著以正常案例和例外案例共同驗證，例如內部移轉、延遲事件、重複事件、沖正、價格修正及部分資料缺失。產品經理負責商業語義、使用者影響、優先級、驗收標準與品質保護指標；資料及工程團隊負責技術設計、實作、效能與執行期間監控。",
            "若不同資料來源發生衝突，我不會自行挑選一個數字，而是回到欄位層級的權威來源與領域負責人完成裁決，並留下決策與驗證紀錄。"
          ],
          "spokenZh": [
            "我會先和資料及工程團隊把每個數字的用途、來源、範圍、時間、狀態和更新頻率定清楚，不會由產品經理直接指定技術工具。",
            "接著用正常案例和例外案例一起驗證，例如內部移轉、延遲、重複、沖正和價格修正。",
            "產品經理負責定義和驗收；資料及工程團隊負責技術設計、實作和效能。"
          ],
          "spokenEn": [
            "I would align with Data and Engineering on a shared data contract instead of prescribing a query tool or pipeline. Each field needs a clear purpose, grain, source of truth, inclusion rules, time semantics, states, precision, freshness, and definition version.",
            "We would validate normal and edge cases together. Product owns the business meaning and acceptance criteria, while Data and Engineering own the technical design, implementation, performance, and runtime monitoring."
          ],
          "terms": [],
          "termNote": "本題中文稿未保留需要另外解釋的英文名詞。",
          "boundary": "候選人負責產品語義、使用者影響、案例與驗收標準；資料及工程團隊負責技術架構、實作、效能與執行期間監控。"
        }
      ]
    },
    {
      "targetId": "st-8",
      "label": "四個追問",
      "questions": [
        {
          "id": "BN-PNL-06",
          "question": "內部移轉應如何影響 PnL(損益)？",
          "originalZh": [
            "在整體資產組合範圍內，內部移轉原則上不應產生 PnL(損益)，因為資產只是從一個帳戶移到另一個帳戶，沒有形成外部資金流或投資結果。",
            "產品上要用共同且唯一的移轉識別碼，連結來源帳戶的扣除與目的帳戶的增加。若一邊已扣除、另一邊尚未入帳，要顯示移轉中或時間差狀態，不能重複計算，也不能直接視為損失。單一帳戶的活動紀錄可以顯示移出與移入，但整體 PnL(損益)必須排除這種內部移動。",
            "是否完整保留原成本基礎，以及不同產品之間的轉換規則，仍要依已核准的成本基礎定義決定。"
          ],
          "spokenZh": [
            "內部移轉原則上不應產生 PnL(損益)，因為只是資產換了帳戶位置。",
            "系統要把移出和移入連結成同一筆移轉。如果只有一邊完成，就要顯示移轉中，不能重複計算或當成損失。",
            "單一帳戶可以顯示移出與移入，但整體損益要排除這筆內部移動。"
          ],
          "spokenEn": [
            "At the consolidated portfolio level, an internal transfer should not create P&L because it only changes the location of the asset.",
            "The source debit and destination credit should share the same transfer identifier. If only one side has completed, the product should show an in-transit or timing-difference state instead of double counting it or treating it as a loss."
          ],
          "terms": [
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；整體資產組合中的內部移轉原則上不應被計為損益。"
            }
          ],
          "boundary": "這是通用產品原則；Binance(幣安)實際的帳戶分類、移轉狀態與成本基礎規則仍須向領域負責人確認。"
        },
        {
          "id": "BN-PNL-07",
          "question": "延遲事件要怎麼處理？",
          "originalZh": [
            "我會先分開業務發生時間、系統處理時間與最終生效時間。這三個時間可能不同，如果混在一起，就會影響每日 PnL(損益)、流水順序與對帳結果。",
            "延遲事件進來時，第一步是依已核准的結算規則判斷它應屬於原期間還是目前期間；第二步判斷這只是時間差，還是資料遺漏或處理管線缺陷；第三步依 Restatement(歷史損益重算)規則決定是否重算歷史結果。",
            "無論是否重算，都要保留事件、規則版本、重算時間與前後差異，確保總覽、明細、圖表與匯出資料使用一致版本。"
          ],
          "spokenZh": [
            "我會先分清楚事件何時發生、系統何時收到，以及何時正式生效。",
            "接著判斷這是正常時間差，還是資料真的遺漏。若影響過去的 PnL(損益)，再依核准規則決定是否重算。",
            "不論是否重算，都要保留版本和前後差異，避免不同頁面顯示不同結果。"
          ],
          "spokenEn": [
            "I would separate event time, processing time, and settlement time. A late event should first be evaluated against the approved cut-off rule and then classified as a timing difference or a real data defect.",
            "The restatement policy determines whether historical P&L should be recalculated. The system should preserve the event, definition version, recompute time, and the difference between the old and new results."
          ],
          "terms": [
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果。"
            },
            {
              "key": "restatement",
              "label": "Restatement(歷史損益重算)",
              "definitionZh": "因延遲事件、價格修正、定義變更或資料回補，依核准規則重新計算歷史損益。"
            }
          ],
          "boundary": "是否重算及歸屬期間必須依已核准規則決定，不能由候選人單方面裁決。"
        },
        {
          "id": "BN-PNL-08",
          "question": "不同資料來源的結果衝突時怎麼辦？",
          "originalZh": [
            "我不會用「哪個團隊說了算」處理，而是先確認每個欄位的權威來源。帳面餘額、可提領金額、資產估值、PnL(損益)組成與使用者看見的狀態，可能分別由不同系統負責。",
            "發生衝突時，我會比較雙方的資料物件、計算粒度、規則版本、業務發生時間、系統處理時間、快照結算時間與資料完整性，確認是語義不同、時間差、對應錯誤還是真實資料缺陷。",
            "如果無法立即裁決，而且可能影響資金或使用者信任，就不應默默挑選一個數字上線。我會先標示異常或限制使用，再由對應的領域負責人裁決，並留下原因、責任人、處理結果與驗證紀錄。"
          ],
          "spokenZh": [
            "不同資料來源衝突時，我不會直接選一個數字，而是先確認每個欄位的權威來源。",
            "接著比較雙方的定義、時間、版本和資料完整性，判斷是時間差、對應問題，還是真正的資料錯誤。",
            "如果可能影響資金或信任，先不要讓錯誤結果被使用，再交由正確的領域負責人裁決。"
          ],
          "spokenEn": [
            "I would not resolve a source conflict by simply choosing one system. I would first define field-level authority because balances, withdrawable amounts, valuations, P&L components, and user-facing statuses may have different authoritative sources.",
            "Then I would compare the grain, definition version, time semantics, cut-off, and completeness. If the conflict could affect funds or user trust, I would prevent the disputed result from being used and escalate it to the correct domain owner."
          ],
          "terms": [
            {
              "key": "pnl",
              "label": "PnL(損益)",
              "definitionZh": "特定期間內的獲利與虧損結果；不同資料來源可能負責不同的損益組成或顯示欄位。"
            }
          ],
          "boundary": "候選人負責釐清欄位權威來源、使用者影響與驗收方式；最終專業裁決由對應的領域負責人完成。"
        },
        {
          "id": "BN-PNL-09",
          "question": "什麼情況需要 Restatement(歷史損益重算)？如何安全執行？",
          "originalZh": [
            "Restatement(歷史損益重算)應由已核准的規則觸發，例如延遲事件、價格修正、錯誤對應、定義變更或資料回補；不是產品經理發現數字不同就自行重算。",
            "執行前要保留舊版結果與規則版本，並以標準案例和歷史資料進行新舊平行比較，確認受影響的帳戶、資產、期間與損益組成。",
            "通過驗證後再依風險分階段套用，並事先定義暫停、回復前一版本與核准責任。",
            "更新後，總覽、明細、圖表、匯出資料與客服說明必須使用一致版本。若使用者看到歷史數字改變，也要能理解修正範圍、時間與原因類型，但不能揭露可能被規避的內部控制細節。"
          ],
          "spokenZh": [
            "歷史損益重算必須依核准規則執行，例如延遲事件、價格修正、定義變更或資料回補，不能由產品經理自行決定。",
            "執行前要保留舊結果，先做新舊平行比較，確認影響範圍，再分階段套用。",
            "分階段套用前，也要先定義暫停、回復前一版本及核准負責人。更新後，總覽、明細、圖表和匯出資料都要使用同一版本。"
          ],
          "spokenEn": [
            "Restatement should follow an approved policy and may be triggered by late events, price corrections, mapping errors, definition changes, or data backfills.",
            "I would preserve the old result and definition version, compare the old and new calculations, identify the affected scope, and define pause, rollback, and approval authority before release. The overview, details, charts, exports, and support explanations must all use the same version."
          ],
          "terms": [
            {
              "key": "restatement",
              "label": "Restatement(歷史損益重算)",
              "definitionZh": "因延遲事件、價格修正、定義變更或資料回補，依核准規則重新計算歷史損益。"
            }
          ],
          "boundary": "本題是建議方法；觸發條件、核准、暫停、回復前一版本與對外說明均須依 Binance(幣安)實際治理規則和領域負責人決定。"
        }
      ]
    }
  ]
});
