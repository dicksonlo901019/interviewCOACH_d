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
const chapters = [quickChapter, ...researchChapters, ...handbookChapters];
const chapterIds = new Set(chapters.map((chapter) => chapter.id));

export default function Home() {
  const [activeId, setActiveId] = useState("quick");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeId);
  const active = chapters[activeIndex] ?? quickChapter;

  const results = useMemo(() => {
    if (!deferredQuery) return [];
    return chapters.filter((chapter) => `${chapter.title} ${chapter.source}`.toLowerCase().includes(deferredQuery));
  }, [deferredQuery]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const initialHashFrame = chapterIds.has(hash)
      ? window.requestAnimationFrame(() => setActiveId(hash))
      : 0;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if (chapterIds.has(next)) {
        setActiveId(next);
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
    setMenuOpen(false);
    setQuery("");
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell full-handbook">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`} aria-label="面試準備目錄">
        <button className="sidebar-brand" onClick={() => goTo("quick")} aria-label="前往職位快速理解">
          <span className="mark">CT</span>
          <span><b>虛擬資產 PM</b><small>INTERVIEW ROOM</small></span>
        </button>

        <div className="toc-label"><span>完整目錄</span><i>{chapters.length} CHAPTERS</i></div>
        <nav className="toc handbook-toc">
          <p className="toc-group">即時工具</p>
          <a className="toc-tool-link" href="./coach/">
            <span>AI</span><b>AI 面試教練</b><small>即時逐字稿與回答骨架</small>
          </a>
          <p className="toc-group">快速複習</p>
          <button className={activeId === "quick" ? "active" : ""} onClick={() => goTo("quick")}>
            <span>Q</span><b>職位快速理解</b><small>最新職缺資訊整理</small>
          </button>
          <p className="toc-group">研究補強</p>
          {researchChapters.map((chapter) => (
            <button key={chapter.id} className={activeId === chapter.id ? "active" : ""} onClick={() => goTo(chapter.id)}>
              <span>{chapter.number}</span><b>{chapter.shortTitle}</b>
            </button>
          ))}
          <p className="toc-group">完整手冊</p>
          {handbookChapters.map((chapter) => (
            <button key={chapter.id} className={activeId === chapter.id ? "active" : ""} onClick={() => goTo(chapter.id)}>
              <span>{chapter.number}</span><b>{chapter.shortTitle}</b>
            </button>
          ))}
        </nav>
        <div className="sidebar-foot"><span>完整收錄</span><b>3 份研究文件</b><small>完整手冊＋Deep Research 補強</small></div>
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
              <span>{active.group}</span>
              <b>{active.number}</b>
              <small>{activeId === "quick" ? "最新職缺資訊整理" : "完整保留 Markdown 內容"}</small>
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
