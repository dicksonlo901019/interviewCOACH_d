const roles = [
  ["01", "數位資產投資入口", "ETF、基金、結構性與代幣化商品；在銀行可執行適合度、揭露、監控與保管的邊界內提供曝險。"],
  ["02", "數位資產託管人", "私鑰、隔離、授權、冷熱錢包、白名單、對帳、稽核及保險；託管不等於 AML 資料分析。"],
  ["03", "Tokenised Deposit／Stablecoin", "區分銀行存款數位表示與發行人贖回義務，管理客群、儲備、贖回、流通地址與 AML。"],
  ["04", "支付、跨境結算與 On-chain FX", "24/7 企業支付、多幣別結算、可程式化付款與即時流動性，降低時間差及資金占用。"],
  ["05", "Tokenized Securities／RWA", "數位債券、基金、黃金、登記、認購贖回、利息、公司行動、生命週期與 DvP。"],
  ["06", "機構交易與市場基礎設施", "BTC／ETH 現貨、OTC、Prime Brokerage、流動性、抵押品與法幣／數位資產結算。"],
] as const;

const institutions = [
  { name: "HSBC Hong Kong", position: "零售投資、企業存款結算與資本市場", clients: "零售、商戶、企業與資本市場客戶", products: "Gold Token、Tokenised Deposit、Orion；已取得牌照並規劃 2026 H2 推出港元穩定幣", crypto: "部分產品為代幣化資產／存款；穩定幣尚屬規劃推出", lesson: "可先由企業金流、代幣化存款與金融商品逐步擴張。", badges: ["Retail Investment", "Tokenised Deposit", "Stablecoin licence"] },
  { name: "J.P. Morgan／Kinexys", position: "機構支付與鏈上交收基礎設施", clients: "企業、金融機構與資本市場參與者", products: "24/7 Payments、Blockchain Deposit Accounts、On-chain FX、Tokenized Assets、商業票據", crypto: "以許可式機構支付與資產交收為主，非零售交易所", lesson: "先解決支付、流動性與資產交收，而不是先做零售幣幣交易。", badges: ["Institutional Only", "24/7 Payments", "Treasury Infrastructure"] },
  { name: "Standard Chartered", position: "機構交易、託管、Prime Services 與 Tokenization", clients: "合資格機構投資人", products: "可交割 BTC／ETH 現貨、Zodia Custody、Zodia Markets、Libeara", crypto: "直接接觸機構級 BTC／ETH，並以合資格 Custodian 結算", lesson: "以既有 FX 介面、機構准入及託管治理降低採用摩擦。", badges: ["Institutional Trading", "Custody", "Prime Services"] },
  { name: "BNY", position: "機構託管與 Asset Servicing", clients: "機構資產管理與資產服務客戶", products: "BTC／ETH Custody；Fireblocks 錢包安全＋Chainalysis 合規分析", crypto: "直接保管 BTC／ETH，供應商與用途由官方明確披露", lesson: "Custody 與 Blockchain Analytics 是不同層，需整合而非混為一談。", badges: ["Institutional Custody", "A 明確模組", "Verified Vendor Stack"] },
] as const;

const layers = [
  ["L1", "KYC／KYB", "證件、人臉、活體、企業、UBO、裝置詐欺", "Sumsub／銀行既有供應商"],
  ["L2", "Sanctions／PEP／Adverse Media", "制裁、PEP、高風險國家、負面新聞、持續監控", "名單與媒體資料商"],
  ["L3", "Wallet Screening", "地址、Entity Label、制裁、駭客、詐騙、Mixer、曝險", "Chainalysis／TRM／Elliptic／MistTrack"],
  ["L4", "KYT／Transaction Monitoring", "入出金、多跳、Bridge、Cross-chain、速度金額頻率、Alert", "Blockchain Analytics"],
  ["L5", "Travel Rule", "VASP Discovery、付款人／收款人資料交換、驗證與放行", "Travel Rule Network"],
  ["L6", "Custody／Wallet Policy", "MPC／HSM、簽署、白名單、權限、多人審批與限額", "Fireblocks／Metaco／Zodia"],
  ["L7", "Case Management", "Triage、EDD、Evidence、Escalation、STR／SAR、Audit Trail", "銀行案件與申報系統"],
  ["L8", "Threat Intelligence／IR", "駭客、Drainer、Phishing、Stolen Funds、追贓與事件應變", "SlowMist／MistTrack"],
] as const;

const evidence = [
  ["BNY", "Chainalysis", "數位資產合規與鏈上分析整合", "A 明確模組"],
  ["BNY", "Fireblocks", "數位資產錢包與安全基礎設施", "A 明確模組"],
  ["Bybit", "Sumsub", "證件、活體與地址驗證", "A 明確模組"],
  ["Coinbase", "Elliptic", "長期 Crypto AML／Analytics 合作", "A／B"],
  ["Revolut", "Elliptic", "資產風險評分與可配置規則", "A 明確模組"],
  ["Chainalysis 公開客戶群", "Chainalysis", "Coinbase、BNY、Bybit、Kraken、MoonPay；個別模組未必披露", "B 客戶關係"],
  ["SlowMist 公開合作群", "SlowMist", "HashKey、OSL、Bitget、OKX、Binance、HTX、Amber、Crypto.com 等；種類未完整披露", "C 合作未披露"],
] as const;

const sourcesR2 = [
  ["HSBC Hong Kong", "HSBC Gold Token product information", "產品頁（持續更新）", "https://www.hsbc.com.hk/investments/products/gold-token/"],
  ["HSBC Global Banking", "Tokenised Deposit Service", "產品頁（持續更新）", "https://www.gbm.hsbc.com/en-gb/solutions/hsbc-tokenised-deposit-service"],
  ["HSBC Hong Kong", "Stablecoin issuer licence announcement", "2026-04-10", "https://www.about.hsbc.com.hk/news-and-media/hsbc-welcomes-hkmas-grant-of-a-hong-kong-stablecoin-issuer-licence"],
  ["HSBC Holdings", "HSBC Orion — Digital assets and currencies", "產品頁（持續更新）", "https://www.hsbc.com/who-we-are/hsbc-and-digital/hsbc-and-digital-assets-and-currencies"],
  ["J.P. Morgan", "Kinexys product material", "產品頁（持續更新）", "https://www.jpmorgan.com/kinexys"],
  ["J.P. Morgan", "Axis Bank USD clearing through Kinexys", "2025-03-26", "https://www.jpmorgan.com/payments/newsroom/axis-bank-usd-clearing-kinexys"],
  ["J.P. Morgan", "Commercial paper issuance on Solana", "2025-12-11", "https://www.jpmorgan.com/about-us/corporate-news/2025/jpmorgan-commercial-paper-issuance-solana-blockchain"],
  ["Reuters", "Axis Bank and J.P. Morgan roll out 24/7 USD payments", "2025-03-27", "https://m.investing.com/news/stock-market-news/indias-axis-bank-jp-morgan-roll-out-anytime-dollar-payments-for-clients-3951153?ampMode=1"],
  ["Reuters", "J.P. Morgan uses Solana for commercial paper issuance", "2025-12-11", "https://ca.finance.yahoo.com/news/j-p-morgan-harnesses-blockchain-150759303.html/"],
  ["Standard Chartered", "Institutional digital asset trading", "2025-07-15", "https://www.sc.com/en/press-release/standard-chartered-launches-digital-asset-trading-for-institutional-clients/"],
  ["BNY", "Digital Asset Custody Platform launch", "2022-10-11", "https://www.bny.com/corporate/global/en/about-us/newsroom/press-release/bny-mellon-launches-new-digital-asset-custody-platform-130305.html"],
] as const;

const sourcesR6 = [
  ["Chainalysis", "Crypto Compliance products and customers", "產品頁（持續更新）", "https://www.chainalysis.com/solutions/crypto-compliance/"],
  ["Chainalysis", "Customer information", "案例頁（持續更新）", "https://www.chainalysis.com/customers/"],
  ["Sumsub", "How Bybit fights fraud and onboards users", "Customer case（合作始於 2021）", "https://sumsub.com/customers/bybit/"],
  ["Sumsub", "Reusable KYC documentation", "文件頁（持續更新）", "https://docs.sumsub.com/docs/reusable-kyc"],
  ["Sumsub", "Crypto compliance product overview", "產品頁（持續更新）", "https://sumsub.com/crypto/"],
  ["Elliptic", "Configurable Alerting and customer evidence", "產品頁（持續更新）", "https://www.elliptic.co/solutions/configurable-alerting"],
  ["Elliptic", "Customer success stories", "案例頁（持續更新）", "https://www.elliptic.co/customers"],
  ["SlowMist", "Company services and disclosed cooperation", "官方網站（持續更新）", "https://www.slowmist.com/"],
  ["Fireblocks", "Digital asset platform", "產品頁（持續更新）", "https://www.fireblocks.com/platforms/"],
] as const;

function SourceCards({ sources }: { sources: readonly (readonly [string, string, string, string])[] }) {
  return <section className="research-source-cards" aria-label="研究來源"><h3>來源卡｜Accessed 2026-07-16</h3><div>{sources.map(([publisher, title, date, url]) => <article key={url}><span>{publisher}</span><strong>{title}</strong><small>Publication date：{date}<br />Accessed date：2026-07-16</small><a href={url} target="_blank" rel="noopener noreferrer">開啟官方／指定來源</a></article>)}</div></section>;
}

function ResearchR2Visual() {
  return <div className="research-visual-block"><header className="research-visual-title"><span>R2 · GLOBAL BANKING</span><h1>全球銀行在區塊鏈與數位資產中的六種角色</h1><p>案例卡涵蓋業務定位、客群、產品、Crypto 接觸程度，以及對中國信託的啟示。</p></header><section><p className="research-eyebrow">SIX BANK ROLES</p><div className="research-role-grid">{roles.map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><section><p className="research-eyebrow">INSTITUTION CASE CARDS</p><div className="institution-grid">{institutions.map((item) => <article key={item.name}><div className="research-badges">{item.badges.map((b) => <span key={b}>{b}</span>)}</div><h3>{item.name}</h3><dl><dt>業務定位</dt><dd>{item.position}</dd><dt>客群</dt><dd>{item.clients}</dd><dt>核心產品</dt><dd>{item.products}</dd><dt>是否直接接觸 Crypto</dt><dd>{item.crypto}</dd><dt>對中國信託的啟示</dt><dd>{item.lesson}</dd></dl></article>)}</div></section><SourceCards sources={sourcesR2} /></div>;
}

function ResearchR6Visual() {
  return <div className="research-visual-block"><header className="research-visual-title"><span>R6 · COMPLIANCE STACK</span><h1>區塊鏈 AML、KYC 與合規科技採購地圖</h1><p>八層控制、供應商證據等級、Reusable KYC 邊界與銀行採購問題一次對齊。</p></header><section><p className="research-eyebrow">EIGHT-LAYER COMPLIANCE STACK</p><div className="research-stack">{layers.map(([n, title, use, vendors]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{use}</p><small>{vendors}</small></div></article>)}</div><p className="research-separation">Custody provider 不等於 AML data provider；執行 Policy 或串接 KYT，不代表擁有非法地址歸因資料庫。</p></section><section><div className="evidence-legend"><span>A 明確模組</span><span>B 客戶關係</span><span>C 合作未披露</span></div><div className="quick-table-wrap"><table><thead><tr><th>機構</th><th>供應商</th><th>公開確認範圍</th><th>證據</th></tr></thead><tbody>{evidence.map((row) => <tr key={`${row[0]}-${row[1]}`}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></section><section className="procurement-architecture"><article><span>交易所典型 Stack</span><p>KYC／KYB → Sanctions／PEP → Wallet Screening＋KYT → Threat Intelligence → Travel Rule → Custody Policy → Internal Risk Engine → Case／STR</p></article><article><span>銀行典型 Stack</span><p>Bank KYC／CDD → Account Risk → Fiat Monitoring → Wallet Screening／KYT → SoF／SoW → Custody Governance → Travel Rule → Regulatory Reporting</p></article></section><SourceCards sources={sourcesR6} /></div>;
}

export function ResearchVisuals({ id }: { id: string }) {
  if (id === "research-2") return <ResearchR2Visual />;
  if (id === "research-6") return <ResearchR6Visual />;
  return null;
}
