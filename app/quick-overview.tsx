import type { ReactNode } from "react";
import { StablecoinQuickModules } from "./stablecoin-quick-modules";

const keywords = [
  "企業客戶解決方案",
  "穩定幣與虛擬資產",
  "銀行合規與風險控制",
  "跨部門產品交付",
  "國際策略合作",
  "商業模式設計",
];

const qualifications = [
  "具備 3 年以上數位金融、網路科技或區塊鏈產業產品企劃經驗",
  "擅長產品設計、專案管理與企劃提案",
  "熟悉穩定幣、虛擬資產交易業務，或具備區塊鏈知識",
  "具備反洗錢或虛擬資產相關證照尤佳",
  "具備國際區塊鏈產業工作或合作經驗尤佳",
  "具備專業商用英語能力，會日語或其他第二外語尤佳",
];

const productDirections = [
  "虛擬資產保管", "穩定幣收付款", "跨境支付與清算", "VASP Banking",
  "企業穩定幣資金管理", "鏈上與鏈下資產對帳", "Tokenised Deposit",
  "Blockchain Settlement", "KYA、KYT 與交易監控服務",
];

const internalPartners = [
  "開發與資訊架構", "法遵與洗錢防制", "法務", "風險管理", "資訊安全",
  "稽核", "作業與營運", "企業金融", "國際金融", "財務與會計",
];

const externalPartners = [
  "海外銀行", "VASP 或交易所", "穩定幣發行商", "Blockchain Analytics 公司",
  "Custody 技術商", "MPC、HSM 或錢包基礎設施廠商", "Travel Rule Provider",
  "金融科技與新創公司",
];

const deliveryOutputs = [
  "可開發的產品需求", "可執行的作業流程", "可審核的風險控制",
  "可追溯的系統紀錄", "可對企業客戶交付的解決方案",
];

const strategyQuestions = [
  "應優先支援 USDT、USDC 或其他穩定幣？",
  "銀行應自行建設保管能力，還是與外部 Custodian 合作？",
  "如何與海外銀行或金融科技公司完成跨境清算？",
  "哪些產品功能應自行開發，哪些應採用外部供應商？",
  "企業客戶願意為哪些服務付費？",
  "收費應採保管費、交易費、兌換價差或 API 費用？",
  "在法規未完全明確時，應正式推出、限制範圍，還是先進行 PoC？",
];

const complianceStages = [
  {
    title: "入金前與入金階段",
    items: [
      "來源地址篩查", "高風險地址辨識", "制裁、詐騙、Mixer、暗網或被盜資產標籤檢查",
      "Direct exposure 與 indirect exposure 判斷", "風險分數與阻擋門檻",
      "高風險資產隔離", "避免異常資產自動歸集至主錢包",
    ],
  },
  {
    title: "交易監控階段",
    items: [
      "KYT Transaction Monitoring", "拆單或結構化交易偵測", "快速轉移偵測",
      "跨鏈與 Chain-hopping 分析", "客戶 KYC 資料與鏈上活動比對",
      "Alert 產生", "案件調查與升級",
    ],
  },
  {
    title: "高風險案件處理",
    items: [
      "暫停交易或提領", "將地址加入內部 Watchlist", "保存 TxID、地址、資金流與客戶資料",
      "升級至 AML、法遵或風險人員", "配合可疑交易申報", "配合司法或執法機關",
      "與交易所、Custodian 或穩定幣發行商協作",
    ],
  },
];

const pmResponsibilities = [
  "系統何時產生警示", "何時限制交易或提領", "哪個角色具有處理權限",
  "案件如何被升級", "必須保存哪些證據", "如何串接鏈上分析供應商",
  "如何留下完整 Audit Trail", "如何解除限制", "如何控制誤判與客戶影響",
];

const roleWeights = [
  ["虛擬資產與穩定幣產品／商業方案", 30],
  ["產品設計與專案落地", 25],
  ["銀行合規、風控與 AML 整合", 20],
  ["國際合作與供應商管理", 15],
  ["企業客戶研究與提案", 10],
] as const;

const strongMatches = [
  "超過職缺要求的產品企劃與專案管理年資", "國際 Crypto 與交易所工作經驗",
  "熟悉虛擬資產交易與帳戶架構", "熟悉充值、提領與錢包流程",
  "具備 KYC 與第三方 SDK 串接經驗", "具備交易風控、審批及後台流程經驗",
  "具備法幣與 Crypto 轉換場景經驗", "能撰寫 PRD、流程圖與系統需求",
  "具備跨國團隊合作與英文工作經驗", "具備 Web3 錢包、WalletConnect 與鏈上交互經驗",
];

const experienceTranslations = [
  ["充值與提領", "虛擬資產收付及保管流程"],
  ["交易所帳戶架構", "客戶資產帳戶與總帳管理"],
  ["風控攔截", "Transaction Monitoring 與產品控制點"],
  ["KYC SDK 串接", "客戶盡職調查與第三方合規整合"],
  ["錢包管理", "Digital Asset Custody Infrastructure"],
  ["C2C／P2P 風控", "法幣與虛擬資產交易風險管理"],
  ["交易後台", "Operations 與 Case Management"],
  ["資產對帳", "On-chain／Off-chain Reconciliation"],
  ["第三方服務串接", "Strategic Partner Integration"],
  ["權限與審批", "Governance、Approval Workflow 與 Audit Trail"],
];

const gaps = [
  "台灣銀行監理與內部治理語言", "企業級穩定幣支付與清算模式",
  "MPC、HSM、冷熱錢包與私鑰治理", "Blockchain Analytics 工具實務",
  "KYT、Travel Rule 與地址風險分析", "可疑交易申報與案件管理流程",
  "AML 或虛擬資產相關證照",
];

const answerSteps = [
  "客戶場景", "客戶痛點", "商業價值", "法規與業務邊界", "產品流程",
  "AML 與風險控制", "技術與外部供應商整合", "營運與異常處理", "上線策略", "成功指標",
];

function SectionHeading({ number, title, lead }: { number: string; title: string; lead?: string }) {
  return (
    <header className="quick-section-heading">
      <span>{number}</span>
      <div><h2>{title}</h2>{lead ? <p>{lead}</p> : null}</div>
    </header>
  );
}

function BulletList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return <ul className={className}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function SplitList({ title, items }: { title: string; items: readonly string[] }) {
  return <div className="quick-list-panel"><h4>{title}</h4><BulletList items={items} /></div>;
}

function Workstream({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="quick-workstream"><div className="quick-workstream-title"><span>{number}</span><h3>{title}</h3></div>{children}</section>;
}

export function QuickOverview() {
  return (
    <div className="quick-overview">
      <header className="quick-hero">
        <p className="quick-kicker">CTBC DIGITAL TECHNOLOGY · ROLE BRIEF</p>
        <h1>中國信託虛擬資產與穩定幣產品經理｜職位快速理解</h1>
        <p className="quick-summary">這個職位並不是單純負責交易所功能，也不是專職進行洗錢調查或黑錢包追蹤。</p>
        <blockquote>虛擬資產與穩定幣產品策略及解決方案 PM，負責把國際區塊鏈商業模式，轉化為銀行可以合規營運、技術交付，並提供給企業客戶使用的金融產品。</blockquote>
        <div className="quick-keywords" aria-label="職位核心關鍵詞">{keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
        <nav className="quick-anchor-nav" aria-label="快速複習新增主題">
          <a href="#research-2">全球銀行買賣模式</a>
          <a href="#chapter-8">台灣銀行 MVP</a>
          <a href="#chapter-25">買入／賣出風控</a>
          <a href="#quick-usdt-aml">USDT AML/CFT</a>
          <a href="#quick-issuer-freeze">發行商凍結</a>
          <a href="#quick-stablecoin-compare">穩定幣比較</a>
          <a href="#quick-usd1">USD1</a>
          <a href="#quick-bank-admission">銀行准入框架</a>
        </nav>
      </header>

      <section className="quick-section">
        <SectionHeading number="01" title="完整資格條件" />
        <ol className="quick-numbered-list">{qualifications.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="quick-section quick-section-soft">
        <SectionHeading number="02" title="三項核心工作" lead="研究、協調與合作最後都必須收斂成銀行可營運、可交付的產品。" />
        <div className="quick-workstreams">
          <Workstream number="1" title="規劃企業級虛擬資產與穩定幣解決方案">
            <p>透過市場趨勢調研、企業客戶訪談、國際銀行與金融科技同業分析、國際區塊鏈產業研究，完成商業模式與產品功能規劃。</p>
            <h4>可能涵蓋的產品方向</h4>
            <div className="quick-inline-list">{productDirections.map((item) => <span key={item}>{item}</span>)}</div>
          </Workstream>
          <Workstream number="2" title="協調銀行內外部單位，完成產品交付">
            <p>此職位不只負責研究或提案，也必須實際推動產品落地。</p>
            <div className="quick-split-lists">
              <SplitList title="銀行內部單位" items={internalPartners} />
              <div><SplitList title="外部合作單位" items={externalPartners} /><a className="quick-cross-link" href="#research-6">查看 R6：Crypto Compliance Stack</a></div>
            </div>
            <div className="quick-output-line"><strong>PM 要把區塊鏈業務需求轉化為</strong>{deliveryOutputs.map((item) => <span key={item}>{item}</span>)}</div>
          </Workstream>
          <Workstream number="3" title="推動國際策略合作與創新商業模式">
            <p>此職位同時具有 Product Strategy、Partnership 與 Solution Consulting 的性質。</p>
            <BulletList items={strategyQuestions} className="quick-question-list" />
          </Workstream>
        </div>
      </section>

      <section className="quick-section">
        <SectionHeading number="03" title="AML 與鏈上追蹤在職位中的位置" lead="它們不是職位的全部，而是整體產品方案中的一個模組：Blockchain Compliance、Transaction Monitoring 與 Case Management。" />
        <div className="quick-compliance-grid">
          {complianceStages.map((stage) => <SplitList key={stage.title} title={stage.title} items={stage.items} />)}
        </div>
        <p className="quick-note">AML／KYT 是整體合規產品的一個模組，完整供應商與控制架構請見 <a href="#research-6">R6 Crypto Compliance Stack</a>。</p>
        <div className="quick-role-boundary">
          <h3>PM 與法遵人員的職責差異</h3>
          <p>PM 通常不是最終判定某筆資金是否涉及犯罪的人，也不是單獨決定向穩定幣發行商提出凍結要求的人。</p>
          <strong>PM 負責設計</strong>
          <BulletList items={pmResponsibilities} />
        </div>
      </section>

      <StablecoinQuickModules />

      <section className="quick-section quick-section-soft">
        <SectionHeading number="06" title="為什麼 AML 證照只是「尤佳」" />
        <div className="quick-contrast">
          <div><h3>不是職位主體</h3><BulletList items={["AML Investigator", "MLRO", "制裁調查員", "純法遵專員", "可疑交易申報人員"]} /></div>
          <div><h3>必備能力主軸</h3><BulletList items={["產品企劃", "專案管理", "穩定幣與虛擬資產業務", "國際區塊鏈產業合作", "企業客戶需求分析", "商用英語", "跨部門產品落地"]} /></div>
        </div>
        <p className="quick-note">AML 是重要的產品領域知識與風險框架，但不是唯一工作主軸。</p>
      </section>

      <section className="quick-section">
        <SectionHeading number="07" title="職位能力權重" />
        <div className="quick-bars">
          {roleWeights.map(([label, percent]) => (
            <div className="quick-bar" key={label}>
              <div><strong>{label}</strong><b>{percent}%</b></div>
              <span aria-hidden="true"><i style={{ width: `${percent}%` }} /></span>
            </div>
          ))}
        </div>
        <p className="quick-note">只談 AML 會把職位理解得太窄；只談交易所產品，則可能無法呈現銀行需要的風險、治理與企業金融思維。</p>
      </section>

      <section className="quick-section quick-section-soft">
        <SectionHeading number="08" title="Dickson 與職缺的匹配度" lead="產品與 Crypto 原生經驗屬強匹配；主要補強方向是銀行監理、企業級清算與合規工具實務。" />
        <div className="quick-match-grid">
          <SplitList title="強匹配項目" items={strongMatches} />
          <SplitList title="主要能力缺口" items={gaps} />
        </div>
        <h3 className="quick-subtitle">用銀行語言重新包裝經驗</h3>
        <div className="quick-translation-table" role="table" aria-label="Crypto 經驗與銀行職缺表達對照">
          <div className="quick-translation-head" role="row"><span role="columnheader">原本的 Crypto／交易所經驗</span><span role="columnheader">適合職缺的表達</span></div>
          {experienceTranslations.map(([from, to]) => <div className="quick-translation-row" role="row" key={from}><span role="cell">{from}</span><strong role="cell">{to}</strong></div>)}
        </div>
      </section>

      <section className="quick-section">
        <SectionHeading number="09" title="面試定位" />
        <div className="quick-script-list">
          <blockquote>我理解這個職位不是單純將交易所產品搬進銀行，而是從企業客戶的跨境支付、資產保管與資金管理場景出發，在法遵、AML、資安及作業風險要求下，設計可以由銀行正式營運並交付的虛擬資產與穩定幣解決方案。</blockquote>
          <blockquote>我的價值是把 Crypto 原生業務、產品流程及技術語言，轉化為銀行能治理、能審核、能交付，也能向企業客戶商業化的產品方案。</blockquote>
        </div>
      </section>

      <section className="quick-section quick-section-soft">
        <SectionHeading number="10" title="面試回答框架" lead="遇到產品、商業或案例題時，依序把問題說完整。" />
        <ol className="quick-stepper">{answerSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
      </section>

      <section className="quick-conclusion">
        <span>QUICK CONCLUSION</span>
        <h2>中國信託要找的不是單純懂 Crypto 的 PM，也不是純 AML 調查人員，而是能把虛擬資產業務轉化為銀行級企業金融產品的人。</h2>
        <p>此職位的核心問題是：</p>
        <blockquote>中國信託如何在可控制法遵、資產、技術與作業風險的前提下，把虛擬資產、穩定幣與區塊鏈能力，轉化為可向企業客戶交付的新金融產品。</blockquote>
      </section>
    </div>
  );
}
