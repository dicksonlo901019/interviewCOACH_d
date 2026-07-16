"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

type SearchableChapter = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  source: string;
  group: string;
};

type SearchResult = SearchableChapter & { snippet: string };

const suggestions = ["穩定幣", "AML", "跨境支付", "薪資"];

function plainText(source: string) {
  return source
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*|`_\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeSnippet(chapter: SearchableChapter, query: string) {
  const text = plainText(chapter.source);
  const normalizedText = text.toLocaleLowerCase("zh-Hant");
  const matchAt = normalizedText.indexOf(query);
  if (matchAt < 0) return text.slice(0, 130);
  const start = Math.max(0, matchAt - 38);
  const end = Math.min(text.length, matchAt + query.length + 92);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

export function FloatingSearch({ chapters, onSelect }: { chapters: readonly SearchableChapter[]; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("zh-Hant"));

  const results = useMemo<SearchResult[]>(() => {
    if (!deferredQuery) return [];
    return chapters.flatMap((chapter) => {
      const searchable = `${chapter.title} ${chapter.shortTitle} ${chapter.source}`.toLocaleLowerCase("zh-Hant");
      if (!searchable.includes(deferredQuery)) return [];
      return [{ ...chapter, snippet: makeSnippet(chapter, deferredQuery) }];
    });
  }, [chapters, deferredQuery]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen((isOpen) => {
          if (isOpen) window.requestAnimationFrame(() => toggleRef.current?.focus());
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openSearch = () => {
    setOpen(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeSearch = () => {
    setOpen(false);
    window.requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const chooseResult = (id: string) => {
    onSelect(id);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className={`floating-search ${open ? "open" : ""}`}>
      {open ? (
        <aside id="live-site-search" className="floating-search-panel" aria-label="即時查詢網站內容">
          <header>
            <div><span>LIVE SEARCH</span><strong>即時查詢</strong></div>
            <button type="button" onClick={closeSearch} aria-label="關閉即時查詢">×</button>
          </header>
          <label className="floating-search-input">
            <span aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`搜尋全部 ${chapters.length} 章內容…`}
              aria-label="即時搜尋網站內容"
              autoComplete="off"
            />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label="清除即時搜尋">清除</button> : null}
          </label>

          <div className="floating-search-body" aria-live="polite">
            {!deferredQuery ? (
              <div className="floating-search-empty">
                <p>輸入關鍵字，即時搜尋職位、法規、產品與面試話術。</p>
                <div>{suggestions.map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
              </div>
            ) : results.length ? (
              <>
                <p className="floating-search-count">找到 <strong>{results.length}</strong> 個相關章節</p>
                <div className="floating-search-results">
                  {results.map((result) => (
                    <button type="button" key={result.id} onClick={() => chooseResult(result.id)}>
                      <span>{result.group} · {result.number}</span>
                      <strong>{result.shortTitle}</strong>
                      <small>{result.snippet}</small>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="floating-search-empty"><p>找不到「{query.trim()}」的相關內容，請嘗試其他關鍵字。</p></div>
            )}
          </div>
        </aside>
      ) : null}

      <button
        ref={toggleRef}
        type="button"
        className="floating-search-toggle"
        onClick={open ? closeSearch : openSearch}
        aria-label={open ? "收合即時查詢" : "開啟即時查詢"}
        aria-expanded={open}
        aria-controls="live-site-search"
      >
        <span aria-hidden="true" />
        <b>{open ? "收合" : "即時查詢"}</b>
      </button>
    </div>
  );
}
