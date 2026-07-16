import type { ReactNode } from "react";

const SOURCES = [
  ["S1", "DefiLlama Stablecoins", "https://defillama.com/stablecoins"],
  ["S2", "Tether Legal", "https://tether.to/legal/"],
  ["S3", "Tether × Chainalysis Secondary Market Monitoring", "https://tether.io/news/tether-enhances-compliance-measures-with-chainalysis-ecosystem-monitoring-solution/"],
  ["S4", "Tether Law Enforcement Requests", "https://tether.to/en/legal/?tab=law-enforcement-requests"],
  ["S5", "Circle Transparency", "https://www.circle.com/transparency"],
  ["S6", "Circle USDC Terms", "https://www.circle.com/legal/usdc-terms"],
  ["S7", "BitGo USD1 Terms", "https://www.bitgo.com/usd1-terms/"],
  ["S8", "USD1 Attestations", "https://www.bitgo.com/usd1/attestations/"],
  ["S9", "Ethena Docs — How USDe Works", "https://docs.ethena.fi/overview/how-usde-works"],
  ["S10", "Sky Protocol — What is USDS", "https://sky.money/blog/what-is-usds"],
  ["S11", "Global Dollar — About USDG", "https://globaldollar.com/about-usdg"],
  ["S12", "Paxos — PYUSD", "https://www.paxos.com/pyusd"],
  ["S13", "Ripple — RLUSD", "https://ripple.com/solutions/stablecoin/"],
  ["S14", "OCC Bulletin 2026-3 — GENIUS Act", "https://www.occ.treas.gov/news-issuances/bulletins/2026/bulletin-2026-3.html"],
  ["S15", "Circle — USDC Reserve Risk Factors", "https://www.circle.com/legal/usdc-risk-factors"],
  ["S16", "BitGo — USD1 Stablecoin-as-a-Service Blueprint", "https://www.bitgo.com/resources/blog/usd1-the-blueprint-for-bitgos-stablecoin-as-a-service/"],
  ["S17", "Ethena Docs — USDe Overview", "https://docs.ethena.fi/"],
  ["S18", "Ethena Docs — USDe Solution Overview", "https://docs.ethena.fi/solution-overview/usde-overview"],
  ["S19", "Sky Protocol — Official Site", "https://sky.money/"],
  ["S20", "Ripple — RLUSD Transparency", "https://ripple.com/solutions/stablecoin/transparency/"],
  ["S21", "Sky Protocol — Supply Dashboard", "https://info.sky.money/supply"],
  ["S22", "World Liberty Financial — USD1 Official", "https://worldlibertyfinancial.com/usd1"],
  ["S23", "Paxos Docs — USDG", "https://docs.paxos.com/guides/stablecoin/usdg"],
  ["S24", "PayPal Developer — PYUSD", "https://developer.paypal.com/dev-center/pyusd/"],
  ["S25", "Ripple — RLUSD Legal Terms", "https://ripple.com/legal/stablecoin/"],
  ["S26", "Ripple Docs — RLUSD Overview", "https://docs.ripple.com/products/stablecoin/overview/rlusd"],
  ["S27", "OCC Bulletin 2026-24", "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-24.html"],
  ["S28", "OCC Bulletin 2026-28", "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-28.html"],
] as const;

const pmControls = [
  "Wallet Screening 應放在哪個節點",
  "哪些風險條件要產生 Alert",
  "哪些情況必須暫停入帳",
  "哪些情況必須禁止提領",
  "是否設置隔離錢包或暫存帳",
  "Case Management 如何建立、分派與升級",
  "角色權限如何切分",
  "高風險處置是否採四眼原則",
  "Blockchain Analytics API 如何串接與降級",
  "Travel Rule 如何交換、驗證與留存資料",
  "何時向發行商提出凍結或調查請求",
  "誤判地址如何申訴與補件",
  "解除限制的條件與核准層級",
  "各調查與處置節點的 SLA",
  "從告警到結案需要哪些 Audit Trail",
] as const;

const controls = [
  { n: "01", title: "客戶盡職調查", items: ["個人 KYC、企業 KYB、UBO 與控制結構", "客戶用途、業務模式及預期交易量", "Source of Funds；必要時 Source of Wealth", "高風險客戶 EDD", "定期及事件觸發式重新審查"] },
  { n: "02", title: "制裁與高風險篩查", items: ["Sanctions／PEP／高風險國家與地區", "受制裁個人、實體、控制公司與錢包", "負面新聞、恐怖融資及擴散融資", "姓名篩查與 Wallet Screening 並存"] },
  { n: "03", title: "鏈上交易與地址監控", items: ["Sanctions Monitoring、Wallet Categorization", "大型錢包、Illicit Transfers 與異常鑄造", "詐騙、被盜、勒索、暗網、Mixer、恐怖融資", "Direct／Indirect Exposure、Chain-hopping 與多層資金流"] },
  { n: "04", title: "地址限制與資產凍結", items: ["Blocklist／Blacklist 與合約層傳送／接收限制", "凍結特定地址 USDT、暫停或終止直接客戶", "依法處理資產並保存凍結、解除與審批紀錄", "限制代幣轉帳能力，不是取得或控制私鑰"] },
  { n: "05", title: "執法合作與申報", items: ["保存身分、地址、TxID、時間與金額", "回應合理合法的法院、政府與執法要求", "協助追蹤詐騙／被盜資金並跨機構協作", "依適用法域進行可疑活動／交易申報"] },
] as const;

const bankFlow = [
  ["01", "客戶准入", "KYC／KYB、UBO、風險評級、穩定幣用途、預期交易量／對手方／鏈別"],
  ["02", "錢包驗證", "Wallet Ownership Verification、地址預篩；辨識 VASP、私人錢包或智慧合約"],
  ["03", "入金偵測", "偵測鏈上交易，驗證 Token Contract／Network、確認數，防止錯鏈與假代幣"],
  ["04", "KYT 評估", "制裁、高風險標籤、Direct／Indirect Exposure、比例、模式與客戶資料比對"],
  ["05", "入帳控制", "正常／延遲／隔離，禁止自動歸集，建立 Alert 與 Case"],
  ["06", "人工調查", "檢視地址資金流、要求客戶說明／Source of Funds、調查對手方、EDD 與升級"],
  ["07", "處置", "解除／維持限制、拒絕或退回、停提、終止關係、STR、聯絡發行商／執法"],
  ["08", "留存紀錄", "客戶、地址、TxID、區塊高度、合約、分數／標籤、補件、審批、通訊與解除理由"],
] as const;

const market = [
  ["1", "USDT", "1,840.59 億美元", "中心化儲備型", "全球交易與流動性主力"],
  ["2", "USDC", "731.69 億美元", "中心化儲備型", "機構、支付與鏈上結算"],
  ["3", "USDS", "65.86 億美元", "協議管理多抵押型", "Sky Protocol 原生穩定幣"],
  ["4", "DAI", "48.56 億美元", "協議管理多抵押型", "傳統 DeFi 穩定幣"],
  ["5", "USD1", "43.48 億美元", "中心化儲備型", "快速成長的新興主流"],
  ["6", "USDe", "40.25 億美元", "合成美元", "加密資產與衍生品避險"],
  ["7", "USDG", "28.89 億美元", "中心化儲備型", "受監管合作網路型"],
  ["8", "PYUSD", "28.40 億美元", "中心化儲備型", "PayPal 支付生態"],
  ["9", "RLUSD", "15.16 億美元", "中心化儲備型", "機構跨境支付與結算"],
] as const;

const comparison = [
  ["品牌／生態", "Tether", "Circle", "World Liberty Financial", "Global Dollar Network", "PayPal", "Ripple", "Sky Protocol", "Ethena"],
  ["發行／管理", "Tether", "Circle", "BitGo 發行／申購贖回；WLF 品牌", "Paxos 體系", "Paxos 為 PayPal 發行", "Standard Custody 等受監管 Ripple 實體", "智慧合約與治理", "Ethena 協議與基礎設施"],
  ["類型", "中心化儲備", "中心化儲備", "中心化儲備", "中心化儲備", "中心化儲備", "中心化儲備", "多抵押協議", "合成美元"],
  ["穩定機制", "儲備與贖回", "高流動性法幣儲備", "現金、政府 MMF 與等價物", "1:1 儲備及 Paxos 贖回", "美元存款與美國國債等", "隔離現金與等價物儲備", "抵押、清算、Oracle、治理", "加密資產＋空頭衍生品"],
  ["直接贖回", "合格 Tether 客戶", "合格 Circle Mint 客戶", "依 BitGo 條款與准入", "Paxos 合格客戶", "依 PayPal／Paxos 資格", "Ripple Mint 企業客戶", "協議與市場機制", "核准 Mint／Redeem"],
  ["地址控制", "有", "有", "依合約與 BitGo 條款", "中心化發行商控制", "中心化發行商控制", "受監管發行商控制", "依治理與模組", "合約、Custodian、Mint 權限並存"],
  ["優勢", "全球流動性與覆蓋", "機構整合、透明度、支付 API", "成長快、BitGo、大型交易所", "監管、合作網路與分潤", "PayPal／Venmo／商戶", "機構定位、跨境、Ripple Payments", "DeFi 可組合與鏈上透明", "資本效率與收益生態"],
  ["主要風險", "發行商、儲備、司法、制裁、聲譽", "發行商、銀行、儲備、集中", "歷史短、集中、治理、聲譽", "採用、網路與流動性集中", "生態集中與市場深度", "規模與 Ripple 生態集中", "抵押、清算、Oracle、治理、合約", "Funding、交易所、Custodian、Basis"],
  ["主要場景", "交易、OTC、跨境美元", "支付、結算、Treasury、RWA", "交易、跨境、DeFi、新興支付", "合作網路、支付、分潤", "消費、商戶、電商", "企業跨境與機構結算", "DeFi、借貸、鏈上 Treasury", "DeFi 收益與專業配置"],
  ["銀行研究優先度", "必須研究", "優先研究", "條件式研究", "優先研究", "優先研究", "優先研究", "PoC／專業客群", "PoC／專業客群"],
] as const;

const coins = [
  { name: "USDT", subtitle: "全球流動性基礎設施", type: "中心化儲備型", advantage: "最大市場深度、交易對與多鏈覆蓋", risk: "發行商、儲備、司法、制裁與聲譽", use: "交易、OTC、跨境美元需求", priority: "必須研究", detail: "銀行需按 Tron、Ethereum 等網路分開評估費用與作業風險，檢查來源地址、OTC／交易所對手、制裁曝險、凍結協作、儲備／贖回及合規 On／Off-ramp。[S2][S3][S4]" },
  { name: "USDC", subtitle: "機構與合規整合主力", type: "中心化儲備型", advantage: "透明度、支付 API、企業 Treasury", risk: "發行商、銀行、儲備與集中化", use: "支付、結算、RWA、On／Off-ramp", priority: "優先研究", detail: "適合企業跨境付款、供應商付款、Treasury、API Payment 與 Tokenized Asset Settlement。第三方儲備確信報告不等於整間公司財報 Audit。[S5][S6]" },
  { name: "USD1", subtitle: "新興主流，條件式准入", type: "中心化儲備型", advantage: "前五市值、BitGo 基礎設施", risk: "歷史短、集中度、治理與聲譽", use: "交易、跨境、DeFi、新興支付", priority: "條件式研究", detail: "品牌與產品方為 WLF，BitGo 負責發行、初始購買／贖回、技術與託管。銀行須釐清法律發行人、儲備、地址權限、確信範圍、持有人／鏈別／交易所集中及真實支付量。[S7][S8]" },
  { name: "USDG", subtitle: "受監管合作網路型", type: "中心化儲備型", advantage: "Paxos 架構、合作網路與分潤", risk: "採用度、流動性與法域差異", use: "聯盟、支付平台與企業網路", priority: "優先研究", detail: "由 Paxos 體系發行並可 1:1 贖回；新加坡與歐洲版本涉及不同監理框架。銀行還要評估分潤模式的法規與會計處理。[S11]" },
  { name: "PYUSD", subtitle: "PayPal 支付生態", type: "中心化儲備型", advantage: "PayPal／Venmo／商戶與 API", risk: "生態集中、資格限制與市場深度", use: "消費、商戶、電商、小額跨境", priority: "優先研究", detail: "Paxos 為 PayPal 發行，支援 Ethereum／Solana，以美元存款與美國國債等支持；適用資格、平台／發行商責任與商戶接受度是重點。[S12]" },
  { name: "RLUSD", subtitle: "機構跨境支付與結算", type: "中心化儲備型", advantage: "受監管實體、Ripple Payments", risk: "規模、Ripple 生態與法域要求", use: "企業跨境、Treasury、機構結算", priority: "優先研究", detail: "由 Standard Custody 等受監管 Ripple 實體發行，儲備隔離，支援 XRP Ledger／Ethereum，並透過 Ripple Mint 與 Ripple Payments 服務機構客戶。[S13]" },
  { name: "USDS／DAI", subtitle: "協議型穩定幣", type: "多抵押協議型", advantage: "DeFi 可組合性與鏈上透明度", risk: "抵押品、清算、Oracle、治理與合約", use: "DeFi、借貸、鏈上 Treasury", priority: "PoC／專業客群", detail: "兩者同屬 Sky／Maker 演進生態但分開流通。應分析抵押品與 RWA、穩定幣曝險、清算、Oracle、治理、緊急處置、集中元件及 1:1 轉換流動性。[S10]" },
  { name: "USDe", subtitle: "合成美元", type: "Synthetic Dollar", advantage: "資本效率與收益型生態", risk: "Funding、交易所、Custodian 與 Basis", use: "DeFi 收益與專業配置", priority: "PoC／專業客群", detail: "以加密資產和空頭衍生品建構 Delta-neutral；須評估 Funding 轉負、交易所／Off-exchange Provider、Custodian、Basis、避險中斷、流動性、合約與 Oracle。[S9]" },
] as const;

const admission = [
  ["01", "Issuer", "法律發行人、品牌方、Mint／Redeem 與持有人責任"],
  ["02", "Regulation", "主管機關、牌照類型與跨法域安排"],
  ["03", "Reserve", "現金、存款、國債、Repo、MMF 與流動性"],
  ["04", "Redemption", "資格、門檻、時間、費用及壓力情境"],
  ["05", "Transparency", "更新頻率、Attestation／Audit 與涵蓋實體"],
  ["06", "Compliance", "Blocklist、制裁、執法合作與二級市場監控"],
  ["07", "Blockchain", "原生／橋接、可升級性、最終性、費用與停機"],
  ["08", "Liquidity", "市值、深度、Spread、OTC 與各鏈流動性"],
  ["09", "Operations", "Custodian、MPC／HSM、對帳、總帳與 BCP"],
  ["10", "Use Case", "需求、聲譽、關係人風險與商業收益"],
] as const;

function Tags({ children }: { children: readonly string[] }) {
  return <div className="quick-module-tags">{children.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function List({ children }: { children: readonly string[] }) {
  return <ul>{children.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Card({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return <article className="quick-info-card">{eyebrow ? <span>{eyebrow}</span> : null}<h3>{title}</h3>{children}</article>;
}

export function StablecoinQuickModules() {
  return (
    <>
      <section id="quick-usdt-aml" className="quick-section quick-section-soft quick-deep-module">
        <header className="quick-section-heading"><span>04</span><div><h2>穩定幣發行商的 AML/CFT 控制</h2><p>以 Tether USD₮ 為例，理解發行商、銀行與 VASP 的責任邊界</p></div></header>
        <Tags>{["ISSUER CONTROL", "KYC／KYB", "SECONDARY MARKET MONITORING", "SANCTIONS", "ADDRESS FREEZE", "LAW ENFORCEMENT"]}</Tags>

        <div className="quick-highlight-card">
          <span>核心結論 · [S2][S3][S4]</span>
          <p>USDT 能在公開區塊鏈與自託管錢包流通，但不是發行商完全無法控制的去中心化原生資產。Tether 對直接鑄造與贖回客戶執行 KYC／KYB，也分析二級市場鏈上資金流，並可依法令、制裁、風險政策或執法要求限制特定地址。</p>
          <strong>發行商控制 ≠ 銀行 AML 外包</strong>
          <p>銀行或 VASP 仍需自行執行 KYC、Wallet Screening、KYT、Travel Rule、案件管理與可疑交易申報。</p>
        </div>

        <h3 className="quick-subtitle">Primary Market 與 Secondary Market</h3>
        <div className="quick-card-grid two">
          <Card eyebrow="直接鑄造／贖回 · [S2]" title="Primary Market｜直接客戶">
            <p>直接向 Tether 購買、鑄造或贖回 USDT 的個人、企業或機構。</p>
            <List>{["KYC／KYB、組織文件、UBO 與控制人", "制裁／PEP、風險評級、業務模式與預期交易量", "Source of Funds；必要時 Source of Wealth 與 EDD", "持續盡職調查與交易監控"]}</List>
            <blockquote>直接鑄造或贖回不等於連接匿名錢包即可操作，必須依客戶驗證及服務條件完成審查。</blockquote>
          </Card>
          <Card eyebrow="交易所／OTC／錢包／DeFi · [S3]" title="Secondary Market｜二級市場持有人">
            <p>透過交易所、OTC、支付平台、錢包或 DeFi 取得 USDT，未必是 Tether 直接客戶。</p>
            <List>{["客戶 KYC 通常由交易所、VASP、銀行或 OTC 負責", "自託管地址未必有公開身分，但交易仍可被鏈上分析", "Tether 不替每位持有人建立銀行帳戶式 KYC", "涉及制裁或犯罪風險時仍可能受到發行商地址限制"]}</List>
            <blockquote>Secondary Market 不代表沒有監控；公開地址、交易與資金流仍可透過 Blockchain Analytics 分析。</blockquote>
          </Card>
        </div>

        <h3 className="quick-subtitle">Tether 的五層 AML/CFT 控制</h3>
        <div className="quick-control-grid">{controls.map((control) => <Card key={control.n} eyebrow={control.n} title={control.title}><List>{control.items}</List></Card>)}</div>

        <div id="quick-issuer-freeze" className="quick-warning-card">
          <h3>地址凍結的正確理解</h3>
          <p>發行商限制的是支援該控制的原生 USDT 合約之轉帳能力，不是取得使用者私鑰。地址與私鑰仍存在，鏈上通常仍顯示餘額，但合約可能拒絕傳送或接收；凍結也不等於資產立即移入 Tether 錢包，後續需依法律與執法程序處理。[S2][S4]</p>
        </div>
        <div className="quick-warning-card amber"><h3>執法請求不是一般客服信件</h3><p>地址限制或資產後續處理通常要有可驗證的機關身分、案件資料、地址、TxID、法律依據與內部法遵／法務核准。一般電子郵件、社群貼文或未能驗證來源的要求，不應直接觸發凍結。</p></div>

        <h3 className="quick-subtitle">可能觸發調查或限制的情境</h3>
        <div className="quick-inline-list risk-tags">{["制裁名單", "詐騙／殺豬盤", "被盜資產", "駭客／勒索", "暗網／Mixer", "恐怖融資", "人口販運／毒品", "受制裁交易所", "法院或執法要求", "拒絕 KYC／KYB", "行為與業務模式不符"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="quick-warning-card amber"><h3>不要把風險規則理解成固定跳數</h3><p>一次直接或間接曝險不等於自動犯罪定論。實務會綜合風險類別、比例、跳數、頻率、時間、客戶背景、合理用途與證明。</p></div>

        <h3 className="quick-subtitle">發行商與銀行／VASP 的責任矩陣</h3>
        <div className="quick-table-wrap"><table><thead><tr><th>控制事項</th><th>穩定幣發行商</th><th>銀行／VASP</th></tr></thead><tbody>{[
          ["直接鑄造／贖回客戶 KYC", "主要負責", "若為自身客戶仍須負責"], ["銀行客戶 KYC／KYB", "不負責取代", "主要負責"], ["USDT 合約層地址限制", "可執行", "通常無法修改合約"], ["入金地址篩查與客戶 KYT", "可做生態監控", "必須自行建置"], ["Travel Rule／可疑交易申報", "依自身法域", "依所在地與業務規則執行"], ["客戶帳戶與客訴", "處理直接客戶／發行商措施", "處理自身帳戶與交易限制"], ["Audit Trail", "保存發行商紀錄", "保存完整銀行決策與操作紀錄"],
        ].map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
        <p className="quick-note">同一筆 USDT 可以同時經過發行商、交易所／VASP 與銀行三套不同控制。</p>

        <h3 className="quick-subtitle">銀行收到 USDT 時的產品流程</h3>
        <ol className="quick-bank-flow">{bankFlow.map(([n, title, text]) => <li key={n}><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>

        <div className="quick-role-boundary"><h3>PM 不是犯罪判定者，而是控制流程設計者</h3><p>PM 要把 AML 政策轉成系統狀態、權限、流程、資料欄位、API、異常處理及操作紀錄。以下 15 項都要能回答：</p><List>{pmControls}</List></div>

        <h3 className="quick-subtitle">常見錯誤說法</h3>
        <div className="quick-myth-grid">{[
          ["USDT 在自託管錢包，Tether 完全碰不到", "Tether 不控制私鑰，但可能在原生合約層限制地址轉帳。"],
          ["Tether 已完成 AML，所以銀行不用再做", "發行商控制不取代銀行對自身客戶、地址與交易的 AML。"],
          ["碰過 Mixer 就一定永久凍結", "Mixer 是風險訊號，仍須結合曝險、背景、目的與證據。"],
          ["所有 USDT 持有人都完成 Tether KYC", "直接鑄造／贖回客戶須驗證；二級市場持有人未必是直接客戶。"],
        ].map(([myth, truth]) => <article key={myth}><del>{myth}</del><p>{truth}</p></article>)}</div>

        <blockquote className="quick-answer-card"><span>面試版回答</span>USDT 的 AML/CFT 可分成發行商層與金融機構層。Tether 對直接鑄造及贖回客戶執行 KYC、KYB、制裁篩查與持續監控，也透過鏈上分析監控二級市場；遇到制裁、詐騙、被盜資產或執法案件，可在代幣合約層限制地址。但銀行仍須自行完成 KYC、Wallet Screening、KYT、Travel Rule、案件管理及申報。PM 的責任是把政策轉為可執行流程、權限、控制點與 Audit Trail。</blockquote>
      </section>

      <section id="quick-stablecoin-compare" className="quick-section quick-deep-module">
        <header className="quick-section-heading"><span>05</span><div><h2>主流穩定幣比較與銀行選擇框架</h2><p>市場規模、穩定機制、發行商控制與銀行適用性不能混為一談</p></div></header>
        <Tags>{["MARKET SIZE", "RESERVE", "REDEMPTION", "COMPLIANCE", "LIQUIDITY", "BANK ADMISSION"]}</Tags>

        <div className="quick-card-grid three">
          <Card eyebrow="MARKET MAINSTREAM" title="市場主流度"><List>{["市值與交易量", "市場深度與交易所覆蓋", "鏈上供應量與使用者覆蓋"]}</List></Card>
          <Card eyebrow="INSTITUTIONAL MATURITY" title="機構成熟度"><List>{["營運年限與監管架構", "儲備透明度與贖回安排", "壓力測試、營運與資安紀錄"]}</List></Card>
          <Card eyebrow="BANK SUITABILITY" title="銀行適用性"><List>{["客戶需求與法律可行性", "AML、地址控制、作業與保管", "流動性、收益、聲譽與關係人風險"]}</List></Card>
        </div>
        <p className="quick-note">市值前五不等於銀行可無條件支援；監管架構完整也不代表一定有足夠流動性。</p>

        <div className="quick-data-head"><div><span>資料快照</span><strong>2026-07-16</strong></div><p>市場數字會持續變動，排名必須與日期一起閱讀。[S1]</p></div>
        <div className="quick-stat-grid"><article><strong>約 3,095 億美元</strong><span>穩定幣總市值</span></article><article><strong>約 59.47%</strong><span>USDT 市占</span></article><article><strong>明顯領先</strong><span>USDT + USDC</span></article><article><strong>市場前五</strong><span>USD1</span></article></div>
        <div className="quick-table-wrap"><table><thead><tr><th>排名</th><th>穩定幣</th><th>約略市值</th><th>分類</th><th>快速定位</th></tr></thead><tbody>{market.map((row) => <tr key={row[1]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
        <div className="quick-warning-card amber"><p>BUIDL、USDY 等具有淨值、收益或證券／基金性質的 Tokenized Treasury／RWA Token，不應與面值固定的支付型穩定幣混為一類。</p></div>

        <h3 className="quick-subtitle">三種穩定機制</h3>
        <div className="quick-card-grid three">
          <Card eyebrow="A" title="中心化儲備型"><p>USDT、USDC、USD1、USDG、PYUSD、RLUSD。由公司或受監管實體發行，以現金、存款、短債或高流動性資產支持；重點是發行商、儲備、Custodian、贖回與法律風險。</p></Card>
          <Card eyebrow="B · [S10]" title="協議管理多抵押型"><p>USDS 與 DAI 透過抵押、清算、Oracle、治理與穩定模組維持價格。兩者屬同一 Sky／Maker 演進生態但仍是分開流通的資產。</p></Card>
          <Card eyebrow="C · [S9]" title="合成美元"><p>USDe 以加密資產加空頭期貨／永續合約構成 Delta-neutral 結構；不是傳統銀行帳戶內的 1:1 法幣儲備。</p></Card>
        </div>

        <h3 className="quick-subtitle">主流穩定幣比較</h3>
        <div className="quick-table-wrap quick-comparison-table"><table><thead><tr><th>項目</th><th>USDT</th><th>USDC</th><th>USD1</th><th>USDG</th><th>PYUSD</th><th>RLUSD</th><th>USDS／DAI</th><th>USDe</th></tr></thead><tbody>{comparison.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
        <p className="quick-note">完整比較依據：[S2][S5][S6][S7][S8][S9][S10][S11][S12][S13]。手機版表格可橫向滑動，Accordion 則提供逐一資產閱讀模式。</p>
        <div className="quick-coin-cards">{coins.map((coin) => <details key={coin.name} id={coin.name === "USD1" ? "quick-usd1" : undefined}><summary><span>{coin.name}</span><strong>{coin.subtitle}</strong><i>{coin.priority}</i></summary><div><dl><dt>類型</dt><dd>{coin.type}</dd><dt>主要優勢</dt><dd>{coin.advantage}</dd><dt>主要風險</dt><dd>{coin.risk}</dd><dt>適用場景</dt><dd>{coin.use}</dd></dl><p className="quick-coin-detail">{coin.detail}</p>{coin.name === "USD1" ? <div className="quick-usd1-status"><b>Market Mainstream：YES</b><b>Institutional Maturity：EMERGING</b><b>Bank Admission：CONDITIONAL</b><p>依本頁 2026-07-16 快照已位居第五，因此市場層面屬主流；但 2025 年才推出，制度成熟度、壓力測試、持有人分散與銀行採用歷史仍短於 USDT／USDC。銀行應額外檢查 BitGo／WLF 法律分工、儲備與確信報告、Mint／Redeem、地址控制、持有人／交易所／鏈別集中度、真實支付量及關係人聲譽風險。[S1][S7][S8]</p></div> : null}</div></details>)}</div>
        <p className="quick-note">USDC 的儲備 Attestation（確信報告）不等於對整間公司完整財務報表的 Audit。協議型也不等於沒有集中或現實資產風險；USDe 的 Reserve Fund 是緩衝，不是銀行存款式 1:1 美元儲備。</p>

        <h3 id="quick-bank-admission" className="quick-subtitle">銀行選擇穩定幣的十項框架</h3>
        <div className="quick-admission-grid">{admission.map(([n, title, text]) => <article key={n}><span>{n}</span><h4>{title}</h4><p>{text}</p></article>)}</div>

        <h3 className="quick-subtitle">中國信託面試用初步產品研究分組</h3>
        <p className="quick-disclaimer">不代表正式銀行准入結論、投資建議或信用評等。</p>
        <div className="quick-card-grid two"><Card eyebrow="GROUP A" title="市場流動性錨點"><p>USDT、USDC：客戶需求與市場深度最高，但風險與監管結構不同，不能只設計一套政策。</p></Card><Card eyebrow="GROUP B" title="支付與機構型優先研究"><p>RLUSD、PYUSD、USDG：較接近跨境支付、企業 Treasury、On／Off-ramp 與結算。</p></Card><Card eyebrow="GROUP C" title="新興主流，條件式准入"><p>USD1：市值已進前五，但須加強集中度、治理、法律責任、關係人與聲譽評估。</p></Card><Card eyebrow="GROUP D" title="PoC／研究或專業客戶"><p>USDS、DAI、USDe：還涉及抵押、清算、Oracle、治理、衍生品、交易所與 Custodian。</p></Card></div>

        <div className="quick-warning-card"><h3>2026 面試校正：GENIUS Act 已制定</h3><p>GENIUS Act 已於 2025-07-18 制定，建立美國支付型穩定幣框架；截至 2026 年，OCC、FinCEN、OFAC 等仍在制定或落實發行資格、儲備、報告、AML/CFT、客戶識別與制裁細則。應說「法律框架已建立、部分執行細則仍落地」，不要說仍只是一般草案。[S14]</p></div>

        <blockquote className="quick-answer-card"><span>面試版結論</span>銀行不能只用市值決定支援哪種穩定幣。USDT 強在流動性與需求，USDC 偏機構整合，PYUSD 偏支付生態，RLUSD 偏企業跨境，USDG 偏合作網路。USD1 按市值已是主流，但制度成熟度仍短於 USDT／USDC，應採條件式准入；USDS、DAI、USDe 則有不同抵押、治理與衍生品風險，不能套用法幣儲備型政策。</blockquote>

        <footer className="quick-source-list"><div><span>資料來源與更新日期</span><strong>Last verified: 2026-07-16</strong></div><ol>{SOURCES.map(([id, name, url]) => <li key={id}><b>{id}</b><a href={url} target="_blank" rel="noopener noreferrer">{name}</a><small>Publisher／Title：{name}<br />Publication date：公告頁依原始來源；產品／文件頁持續更新<br />Accessed date：2026-07-16</small></li>)}</ol></footer>
      </section>
    </>
  );
}
