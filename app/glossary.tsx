"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type GlossaryEntry = {
  id: string;
  term: string;
  fullName?: string;
  description: string;
  aliases?: string[];
};

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  { id: "dd", term: "DD", fullName: "Due Diligence｜盡職調查", description: "合作、採購或客戶准入前的完整查核。銀行通常會檢視牌照、股權與實質受益人、法遵紀錄、資安、財務、服務水準、營運持續與退場安排。" },
  { id: "poc", term: "PoC", fullName: "Proof of Concept｜概念驗證", description: "在正式開發或全面上線前，用限定客群、情境、額度與期間的小型實驗，驗證技術可行性、商業價值、法遵邊界及主要風險。" },
  { id: "aml-cft", term: "AML／CFT", fullName: "Anti-Money Laundering / Counter-Terrorist Financing", description: "防制洗錢與打擊資恐。涵蓋客戶審查、制裁篩檢、交易監控、可疑活動調查、申報及紀錄留存。", aliases: ["AML/CFT", "AML／CFT"] },
  { id: "aml", term: "AML", fullName: "Anti-Money Laundering｜防制洗錢", description: "辨識、評估並降低犯罪所得進入金融體系的風險，常見控制包括 KYC、交易監控、制裁篩檢及疑似洗錢交易申報。" },
  { id: "kyc", term: "KYC", fullName: "Know Your Customer｜認識你的客戶", description: "確認客戶身分、資金來源、交易目的與風險程度，並在關係存續期間持續更新與監控。" },
  { id: "kyb", term: "KYB", fullName: "Know Your Business｜認識你的企業客戶", description: "針對企業進行身分與風險審查，包括公司登記、業務模式、控制結構、董事及實質受益人。" },
  { id: "ubo", term: "UBO", fullName: "Ultimate Beneficial Owner｜最終實質受益人", description: "最終擁有、控制企業，或實際享有其利益的自然人，是企業客戶審查與反洗錢的重要辨識對象。" },
  { id: "edd", term: "EDD", fullName: "Enhanced Due Diligence｜加強盡職調查", description: "對高風險客戶、交易或司法管轄區採取更深入的審查，例如補充資金來源證明、管理層核准及提高持續監控強度。" },
  { id: "pep", term: "PEP", fullName: "Politically Exposed Person｜重要政治性職務人士", description: "因職務與影響力而可能面臨較高貪腐或洗錢風險的人士；金融機構通常須採取加強審查與持續監控。" },
  { id: "kya", term: "KYA", fullName: "Know Your Address｜認識你的鏈上地址", description: "辨識錢包地址的歸屬、風險標籤與歷史曝險，用於地址准入、白名單及鏈上風險管理。" },
  { id: "kyt", term: "KYT", fullName: "Know Your Transaction｜認識你的交易", description: "分析鏈上資金流、交易對手及風險樣態，建立警示、調查與處置流程；是虛擬資產交易監控的核心能力。" },
  { id: "vasp", term: "VASP", fullName: "Virtual Asset Service Provider｜虛擬資產服務提供者", description: "提供虛擬資產交換、移轉、保管或相關金融服務的業者，例如交易所與部分託管服務商。" },
  { id: "travel-rule", term: "Travel Rule", fullName: "虛擬資產轉帳資訊傳遞規則", description: "要求符合門檻的轉帳由相關業者交換並保存匯款人、收款人等資訊，以利制裁、反洗錢與交易風險控管。" },
  { id: "rwa", term: "RWA", fullName: "Real-World Assets｜現實世界資產代幣化", description: "把債券、基金、黃金、不動產或應收帳款等現實資產的權利，以代幣形式記錄、移轉或結算。" },
  { id: "cbdc", term: "CBDC", fullName: "Central Bank Digital Currency｜央行數位貨幣", description: "由中央銀行發行、以數位形式存在的央行負債，可依設計用於批發金融機構結算或一般民眾支付。" },
  { id: "dvp", term: "DvP", fullName: "Delivery versus Payment｜券款對付", description: "資產交付與款項支付互為條件、同步或原子化完成，以降低一方已交付但另一方未履約的本金風險。" },
  { id: "pvp", term: "PvP", fullName: "Payment versus Payment｜款對款", description: "兩種貨幣的支付互為條件完成，用於降低外匯交易中一方付款、另一方未付款的結算風險。" },
  { id: "mpc", term: "MPC", fullName: "Multi-Party Computation｜多方安全計算", description: "把私鑰簽署能力分散到多方共同運算，不必在單一地點重建完整私鑰，可降低單點失陷風險並支援權限治理。" },
  { id: "hsm", term: "HSM", fullName: "Hardware Security Module｜硬體安全模組", description: "在防竄改硬體中產生、保存與使用密鑰的安全設備，常用於銀行加密、交易簽署與金鑰生命週期管理。" },
  { id: "str", term: "STR", fullName: "Suspicious Transaction Report｜疑似洗錢交易申報", description: "金融機構判斷交易或活動具可疑跡象後，依法向主管機關或金融情報中心提出的申報。" },
  { id: "sar", term: "SAR", fullName: "Suspicious Activity Report｜可疑活動報告", description: "部分司法管轄區對可疑金融活動所使用的申報名稱；實務目的與 STR 相近，但門檻與程序依當地法規而異。" },
  { id: "sla", term: "SLA", fullName: "Service Level Agreement｜服務水準協議", description: "約定可用率、回應時間、處理時限、復原目標、責任與補救措施的服務承諾，是供應商管理的重要依據。" },
  { id: "stp", term: "STP", fullName: "Straight-Through Processing｜直通式處理", description: "交易由前端到清算、入帳或報表盡量自動完成，不需人工介入；STP 率可反映流程效率與例外管理品質。" },
  { id: "bcp", term: "BCP", fullName: "Business Continuity Plan｜營運持續計畫", description: "面對系統中斷、災害或供應商故障時，維持關鍵服務、切換備援並在目標時間內復原的計畫。" },
  { id: "otc", term: "OTC", fullName: "Over-the-Counter｜場外交易", description: "不透過公開交易所撮合，而由交易雙方或做市商直接協議價格、數量與交割條件的交易。" },
  { id: "api", term: "API", fullName: "Application Programming Interface｜應用程式介面", description: "讓不同系統以明確規格交換資料與呼叫功能的介面；銀行產品會特別關注認證、權限、限流、錯誤處理與稽核紀錄。" },
  { id: "custody", term: "Custody", fullName: "虛擬資產保管", description: "代表客戶安全保存與控制虛擬資產，包含私鑰治理、交易審批、資產隔離、對帳、保險、稽核與復原機制。" },
  { id: "tokenised-deposit", term: "Tokenised Deposit", fullName: "代幣化存款", description: "銀行存款以分散式帳本上的代幣形式呈現，仍是發行銀行的存款負債，與由非銀行發行或以儲備資產支持的穩定幣不同。", aliases: ["Tokenised Deposit", "Tokenized Deposit"] },
];

const aliasToEntry = new Map<string, GlossaryEntry>();
const idToEntry = new Map<string, GlossaryEntry>();
for (const entry of GLOSSARY_ENTRIES) {
  idToEntry.set(entry.id, entry);
  for (const alias of entry.aliases ?? [entry.term]) aliasToEntry.set(alias.toLowerCase(), entry);
}

const aliases = [...aliasToEntry.keys()]
  .sort((a, b) => b.length - a.length)
  .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const TERM_PATTERN = new RegExp(`(^|[^A-Za-z0-9])(${aliases.join("|")})(?![A-Za-z0-9])`, "gi");
const SKIP_SELECTOR = "a, button, code, pre, input, textarea, select, [data-glossary-ignore], .term-trigger";

type OpenTerm = { entry: GlossaryEntry; trigger: HTMLButtonElement; left: number; top: number };

function getPosition(trigger: HTMLElement) {
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(360, window.innerWidth - 24);
  const left = Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12));
  const estimatedHeight = 230;
  const below = rect.bottom + 10;
  const top = below + estimatedHeight <= window.innerHeight ? below : Math.max(12, rect.top - estimatedHeight - 10);
  return { left, top };
}

export function GlossaryEnhancer({ rootId }: { rootId: string }) {
  const [openTerm, setOpenTerm] = useState<OpenTerm | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpenTerm((current) => {
      if (!current) return null;
      current.trigger.setAttribute("aria-expanded", "false");
      if (returnFocus) window.requestAnimationFrame(() => current.trigger.focus());
      return null;
    });
  }, []);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(SKIP_SELECTOR) || !node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
        TERM_PATTERN.lastIndex = 0;
        return TERM_PATTERN.test(node.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const textNodes: Text[] = [];
    let node = walker.nextNode();
    while (node) {
      textNodes.push(node as Text);
      node = walker.nextNode();
    }

    const seen = new Set<string>();
    const annotated: HTMLButtonElement[] = [];
    for (const textNode of textNodes) {
      const text = textNode.textContent ?? "";
      TERM_PATTERN.lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let cursor = 0;
      let changed = false;

      for (const match of text.matchAll(TERM_PATTERN)) {
        const entry = aliasToEntry.get(match[2].toLowerCase());
        if (!entry || seen.has(entry.id)) continue;
        const termStart = (match.index ?? 0) + match[1].length;
        fragment.append(text.slice(cursor, termStart));
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "term-trigger";
        trigger.textContent = match[2];
        trigger.dataset.glossaryTerm = entry.id;
        trigger.setAttribute("aria-label", `${match[2]}：點擊查看名詞解釋`);
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-expanded", "false");
        fragment.append(trigger);
        annotated.push(trigger);
        seen.add(entry.id);
        cursor = termStart + match[2].length;
        changed = true;
      }

      if (changed) {
        fragment.append(text.slice(cursor));
        textNode.replaceWith(fragment);
      }
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>(".term-trigger") : null;
      if (!target || !root.contains(target)) return;
      const entry = target.dataset.glossaryTerm ? idToEntry.get(target.dataset.glossaryTerm) : undefined;
      if (!entry) return;
      setOpenTerm((current) => {
        if (current?.trigger === target) {
          target.setAttribute("aria-expanded", "false");
          return null;
        }
        current?.trigger.setAttribute("aria-expanded", "false");
        target.setAttribute("aria-expanded", "true");
        return { entry, trigger: target, ...getPosition(target) };
      });
    };
    root.addEventListener("click", onClick);

    return () => {
      root.removeEventListener("click", onClick);
      for (const trigger of annotated) {
        if (trigger.isConnected) trigger.replaceWith(document.createTextNode(trigger.textContent ?? ""));
      }
      root.normalize();
    };
  }, [rootId]);

  useEffect(() => {
    if (!openTerm) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close(true);
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!popoverRef.current?.contains(target) && !openTerm.trigger.contains(target)) close();
    };
    const onViewportChange = () => close();
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [close, openTerm]);

  if (!openTerm || typeof document === "undefined") return null;
  const titleId = `glossary-title-${openTerm.entry.id}`;
  return createPortal(
    <div
      ref={popoverRef}
      className="glossary-popover"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      data-testid="glossary-popover"
      style={{ left: openTerm.left, top: openTerm.top }}
    >
      <div className="glossary-popover-head">
        <span>名詞解釋</span>
        <button type="button" onClick={() => close(true)} aria-label="關閉名詞解釋">×</button>
      </div>
      <strong id={titleId}>{openTerm.entry.term}</strong>
      {openTerm.entry.fullName ? <small>{openTerm.entry.fullName}</small> : null}
      <p>{openTerm.entry.description}</p>
    </div>,
    document.body,
  );
}
