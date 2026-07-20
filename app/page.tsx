"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import quickRaw from "../content/ctbc-blockchain-regulation-15min-cram.md?raw";
import quickStablecoinRaw from "../content/quick-stablecoin-search-index.md?raw";
import handbookRaw from "../content/ctbc-virtual-asset-stablecoin-pm-interview-prep.md?raw";
import researchRaw from "../content/ctbc-deep-research-interview-addendum.md?raw";
import { MarkdownContent } from "./markdown";
import { QuickOverview } from "./quick-overview";
import { FloatingSearch } from "./floating-search";
import { ResearchVisuals } from "./research-visuals";
import { GlossaryEnhancer } from "./glossary";

type Chapter = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  source: string;
  group: "快速複習" | "研究補強" | "完整手冊";
};

type NavigationPhase = {
  id: string;
  step: string;
  title: string;
  chapterIds: readonly string[];
};

const APP_VERSION = "0.2.0";

function splitHandbook(source: string): Chapter[] {
  const starts = [...source.matchAll(/^##\s+(.+)$/gm)];
  const introEnd = starts[0]?.index ?? source.length;
  const chapters: Chapter[] = [{
    id: "intro",
    number: "00",
    title: "手冊定位與使用原則",
    shortTitle: "使用說明",
    source: source.slice(0, introEnd).trim(),
    group: "完整手冊",
  }];

  starts.forEach((match, index) => {
    const title = match[1].trim();
    const end = starts[index + 1]?.index ?? source.length;
    const numberMatch = title.match(/^(\d+)\.\s*(.+)$/);
    chapters.push({
      id: `chapter-${numberMatch?.[1] ?? index}`,
      number: (numberMatch?.[1] ?? String(index)).padStart(2, "0"),
      title,
      shortTitle: numberMatch?.[2] ?? title,
      source: source.slice(match.index, end).trim(),
      group: "完整手冊",
    });
  });
  return chapters;
}

function splitResearch(source: string): Chapter[] {
  const starts = [...source.matchAll(/^##\s+R(\d+)\.\s+(.+)$/gm)];
  return starts.map((match, index) => ({
    id: `research-${match[1]}`,
    number: `R${match[1]}`,
    title: `R${match[1]}. ${match[2].trim()}`,
    shortTitle: match[2].trim(),
    source: source.slice(match.index, starts[index + 1]?.index ?? source.length).trim(),
    group: "研究補強",
  }));
}

const quickChapter: Chapter = {
  id: "quick",
  number: "QUICK",
  title: "中國信託虛擬資產與穩定幣產品經理｜職位快速理解",
  shortTitle: "職位快速理解",
  source: `${quickRaw.trim()}\n\n${quickStablecoinRaw.trim()}`,
  group: "快速複習",
};

const researchChapters = splitResearch(researchRaw);
const handbookChapters = splitHandbook(handbookRaw);
const chapterCatalog = [quickChapter, ...researchChapters, ...handbookChapters];
const chapterCatalogById = new Map(chapterCatalog.map((chapter) => [chapter.id, chapter]));

const menuMeta: Record<string, { title: string; keywords: string }> = {
  quick: { title: "15 分鐘職位速讀", keywords: "快速複習 職位理解 重點" },
  intro: { title: "使用說明", keywords: "怎麼讀 導覽" },
  "chapter-0": { title: "先背這一句", keywords: "定位 核心結論" },
  "chapter-1": { title: "完整 JD 逐條理解", keywords: "職缺 工作內容 資格" },
  "chapter-2": { title: "JD 適配度診斷", keywords: "履歷 經驗 缺口 匹配" },
  "chapter-3": { title: "60 秒自我介紹", keywords: "開場 自介 英文" },
  "chapter-4": { title: "Why CTBC？Why this role？", keywords: "動機 中信 為什麼" },
  "chapter-5": { title: "穩定幣核心知識", keywords: "stablecoin 儲備 贖回 發行" },
  "chapter-6": { title: "銀行風險地圖", keywords: "風控 買入 賣出 入金 鏈上來源 冷卻期" },
  "chapter-7": { title: "台灣與國際監管現況", keywords: "法規 專法 三讀 GENIUS MiCA 香港" },
  "chapter-8": { title: "跨境穩定幣 PoC", keywords: "產品案例 MVP RFQ OTC 代理交易 買入 賣出" },
  "chapter-9": { title: "高機率主管題與答題骨架", keywords: "面試題 穩定幣買賣 買入 賣出 商業模式" },
  "chapter-10": { title: "面試故事準備", keywords: "STAR 行為題 專案案例" },
  "chapter-11": { title: "回答話術地雷", keywords: "避雷 錯誤說法" },
  "chapter-12": { title: "English rapid-fire", keywords: "英文 英語 面試" },
  "chapter-13": { title: "反問面試官", keywords: "結尾 提問 團隊 產品" },
  "chapter-14": { title: "72 小時強補計畫", keywords: "讀書計畫 準備順序" },
  "chapter-15": { title: "進階一句話", keywords: "金句 短答" },
  "chapter-16": { title: "主要參考來源", keywords: "引用 查證 官方資料" },
  "chapter-17": { title: "Hunter 情報解讀", keywords: "獵頭 薪資 面試情報" },
  "chapter-18": { title: "線上首輪流程預測", keywords: "面試流程 首輪" },
  "chapter-19": { title: "HR 與敏感題", keywords: "薪資 其他機會 身分證 離職" },
  "chapter-20": { title: "線上面試作戰清單", keywords: "設備 穿著 鏡頭 收音" },
  "chapter-21": { title: "區塊鏈在金融業的運用", keywords: "銀行 企業金融 RWA 跨境" },
  "chapter-22": { title: "法規變動與產品影響", keywords: "監管 子法 產品需求" },
  "chapter-23": { title: "高機率追問與短答", keywords: "追問題 買入 賣出 off-ramp on-ramp" },
  "chapter-24": { title: "題目準備優先順序", keywords: "複習 優先級" },
  "chapter-25": { title: "穩定幣 AML 與入金風控", keywords: "USDT 地址凍結 買入 賣出 入金 錢包 交易追蹤" },
  "chapter-26": { title: "九種穩定幣與銀行准入", keywords: "USDT USDC USD1 PYUSD RLUSD 比較" },
  "research-1": { title: "中信區塊鏈三階段演進", keywords: "中國信託 發展 案例" },
  "research-2": { title: "全球銀行與穩定幣買賣", keywords: "BBVA JPMorgan DBS HSBC Anchorpoint 買入 賣出 兌換 交易 託管" },
  "research-3": { title: "台灣銀行監理階梯", keywords: "台灣 VASP 保管 RWA 專法" },
  "research-4": { title: "中信短中長期產品機會", keywords: "產品路線圖 商業模式" },
  "research-5": { title: "研究校正與回答避雷", keywords: "查證 推論 地雷" },
  "research-6": { title: "Crypto Compliance Stack", keywords: "KYC KYT Travel Rule Chainalysis Fireblocks 供應商" },
};

const navigationPhases: readonly NavigationPhase[] = [
  { id: "prepare", step: "01", title: "面試前準備", chapterIds: ["intro", "chapter-14", "chapter-17", "chapter-18", "chapter-20"] },
  { id: "opening", step: "02", title: "開場、自我介紹與動機", chapterIds: ["chapter-0", "chapter-3", "chapter-4", "chapter-1", "chapter-2", "chapter-19"] },
  { id: "industry", step: "03", title: "中信、銀行與產業理解", chapterIds: ["research-1", "research-4", "research-2", "research-3", "chapter-21"] },
  { id: "expertise", step: "04", title: "穩定幣、風控與法規", chapterIds: ["chapter-5", "chapter-26", "chapter-6", "chapter-25", "research-6", "chapter-7", "chapter-22"] },
  { id: "case", step: "05", title: "產品案例與主管問答", chapterIds: ["chapter-8", "chapter-9", "chapter-23", "chapter-24"] },
  { id: "communication", step: "06", title: "行為題、表達與避雷", chapterIds: ["chapter-10", "chapter-11", "research-5", "chapter-12", "chapter-15"] },
  { id: "closing", step: "07", title: "結尾與查證", chapterIds: ["chapter-13", "chapter-16"] },
];

const phaseByChapterId = new Map(navigationPhases.flatMap((phase) => phase.chapterIds.map((chapterId) => [chapterId, phase.id] as const)));
const orderedChapterIds = ["quick", ...navigationPhases.flatMap((phase) => phase.chapterIds)];
const chapters = orderedChapterIds.map((chapterId) => chapterCatalogById.get(chapterId)).filter((chapter): chapter is Chapter => Boolean(chapter));
const chapterIds = new Set(chapters.map((chapter) => chapter.id));

function getMenuTitle(chapter: Chapter) {
  return menuMeta[chapter.id]?.title ?? chapter.shortTitle;
}

function matchesMenuQuery(chapter: Chapter, query: string) {
  if (!query) return true;
  const meta = menuMeta[chapter.id];
  return `${meta?.title ?? ""} ${meta?.keywords ?? ""} ${chapter.shortTitle}`.toLowerCase().includes(query);
}

export default function Home() {
  const [activeId, setActiveId] = useState("quick");
  const [query, setQuery] = useState("");
  const [menuQuery, setMenuQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedPhaseId, setExpandedPhaseId] = useState("prepare");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex] ?? quickChapter;
  const activePhaseId = phaseByChapterId.get(active.id);
  const activePhase = navigationPhases.find((phase) => phase.id === activePhaseId);
  const normalizedMenuQuery = menuQuery.trim().toLowerCase();

  const visiblePhases = useMemo(() => navigationPhases.map((phase) => ({
    ...phase,
    chapters: phase.chapterIds
      .map((chapterId) => chapterCatalogById.get(chapterId))
      .filter((chapter): chapter is Chapter => Boolean(chapter))
      .filter((chapter) => matchesMenuQuery(chapter, normalizedMenuQuery)),
  })).filter((phase) => phase.chapters.length > 0), [normalizedMenuQuery]);

  const results = useMemo(() => {
    if (!deferredQuery) return [];
    return chapters.filter((chapter) => `${chapter.title} ${chapter.source}`.toLowerCase().includes(deferredQuery));
  }, [deferredQuery]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const initialHashFrame = chapterIds.has(hash)
      ? window.requestAnimationFrame(() => {
        setActiveId(hash);
        setExpandedPhaseId(phaseByChapterId.get(hash) ?? "prepare");
      })
      : 0;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if (chapterIds.has(next)) {
        setActiveId(next);
        setExpandedPhaseId(phaseByChapterId.get(next) ?? "prepare");
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      if (initialHashFrame) window.cancelAnimationFrame(initialHashFrame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const goTo = (id: string) => {
    setActiveId(id);
    setExpandedPhaseId(phaseByChapterId.get(id) ?? "prepare");
    setMenuOpen(false);
    setQuery("");
    setMenuQuery("");
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell full-handbook">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`} aria-label="面試準備目錄">
        <button className="sidebar-brand" onClick={() => goTo("quick")} aria-label="前往職位快速理解">
          <span className="mark">CT</span>
          <span><b>虛擬資產 PM</b><small>INTERVIEW ROOM · v{APP_VERSION}</small></span>
        </button>

        <div className="toc-label"><span>面試流程</span><i>{chapters.length} CHAPTERS</i></div>
        <nav className="toc handbook-toc">
          <label className="toc-filter">
            <span>找章節</span>
            <input value={menuQuery} onChange={(event) => setMenuQuery(event.target.value)} placeholder="法規、AML、買入、反問…" aria-label="搜尋面試目錄" />
            {menuQuery ? <button type="button" onClick={() => setMenuQuery("")} aria-label="清除目錄搜尋">×</button> : null}
          </label>
          <p className="toc-group">即時工具</p>
          <a className="toc-tool-link" href="./coach/">
            <span>AI</span><b>AI 面試教練</b><small>即時逐字稿與回答骨架</small>
          </a>
          <p className="toc-group">固定快捷</p>
          <button className={`toc-chapter ${activeId === "quick" ? "active" : ""}`} onClick={() => goTo("quick")}>
            <span>Q</span><b>{getMenuTitle(quickChapter)}</b><small>面試前快速複習</small>
          </button>
          <p className="toc-group">依面試流程</p>
          <div className="toc-phases">
            {visiblePhases.map((phase) => {
              const expanded = Boolean(normalizedMenuQuery) || expandedPhaseId === phase.id;
              return (
                <section key={phase.id} className={`toc-phase ${activePhaseId === phase.id ? "current" : ""}`}>
                  <button
                    type="button"
                    className="toc-phase-toggle"
                    aria-expanded={expanded}
                    aria-controls={`toc-phase-${phase.id}`}
                    onClick={() => setExpandedPhaseId((current) => current === phase.id ? "" : phase.id)}
                  >
                    <span>{phase.step}</span><b>{phase.title}</b><i>{phase.chapters.length}</i>
                  </button>
                  {expanded ? (
                    <div id={`toc-phase-${phase.id}`} className="toc-phase-items">
                      {phase.chapters.map((chapter) => (
                        <button key={chapter.id} className={`toc-chapter ${activeId === chapter.id ? "active" : ""}`} onClick={() => goTo(chapter.id)}>
                          <span>{chapter.number}</span><b>{getMenuTitle(chapter)}</b><small>{chapter.group}</small>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
          {normalizedMenuQuery && visiblePhases.length === 0 ? <p className="toc-empty">找不到章節，試試「穩定幣」、「買入」、「法規」或「反問」。</p> : null}
        </nav>
        <div className="sidebar-foot"><span>流程式面試手冊</span><b>v{APP_VERSION}</b><small>35 章內容 · 7 個面試階段</small></div>
      </aside>

      {menuOpen ? <button className="menu-backdrop" aria-label="關閉目錄" onClick={() => setMenuOpen(false)} /> : null}

      <main className="main-shell">
        <header className="site-header">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="開啟目錄"><i /><i /><i /><span>目錄</span></button>
          <div className="page-identity"><small>{String(activeIndex + 1).padStart(2, "0")} / {chapters.length}</small><strong>{active.shortTitle}</strong></div>
          <label className="search"><span>搜尋</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋全部規劃內容" aria-label="搜尋全部規劃內容" /></label>
        </header>

        {query ? (
          <aside className="search-results" aria-live="polite">
            <div className="section-shell">
              <div className="search-result-head"><strong>全文搜尋結果</strong><button onClick={() => setQuery("")}>清除</button></div>
              {results.length ? results.map((chapter) => (
                <button key={chapter.id} onClick={() => goTo(chapter.id)}><strong>{chapter.title}</strong><span>{chapter.source.replace(/[#>*|\-]/g, " ").slice(0, 150)}…</span></button>
              )) : <p>找不到相符內容，試試「穩定幣」、「薪資」、「English」或「Travel Rule」。</p>}
            </div>
          </aside>
        ) : null}

        <div className="page-panel" key={activeId}>
          <article id={active.id} className={`document-page section-shell ${activeId === "quick" ? "quick-document" : ""}`}>
            <div className="document-meta">
              <span>{active.id === "quick" ? "固定快捷" : activePhase?.title ?? active.group}</span>
              <b>{active.number}</b>
              <small>{activeId === "quick" ? "面試前快速複習" : `${active.group} · 完整保留內容`}</small>
            </div>
            {activeId === "quick" ? <QuickOverview /> : <><ResearchVisuals id={activeId} /><MarkdownContent source={active.source} /></>}
          </article>
          <GlossaryEnhancer rootId={active.id} />

          <div className="chapter-pager section-shell">
            {activeIndex > 0 ? <button className="previous" onClick={() => goTo(chapters[activeIndex - 1].id)}><span>上一章</span><b>{chapters[activeIndex - 1].shortTitle}</b></button> : <span />}
            {activeIndex < chapters.length - 1 ? <button className="next" onClick={() => goTo(chapters[activeIndex + 1].id)}><span>下一章</span><b>{chapters[activeIndex + 1].shortTitle}</b></button> : <span />}
          </div>
        </div>
      </main>
      <FloatingSearch chapters={chapters} onSelect={goTo} />
    </div>
  );
}
