import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const sourceUrls = [
  new URL("app/page.tsx", root),
  new URL("app/layout.tsx", root),
  new URL("app/quick-overview.tsx", root),
  new URL("app/stablecoin-quick-modules.tsx", root),
  new URL("app/floating-search.tsx", root),
  new URL("app/glossary.tsx", root),
  new URL("app/coach/page.tsx", root),
  new URL("content/ctbc-blockchain-regulation-15min-cram.md", root),
  new URL("content/quick-stablecoin-search-index.md", root),
  new URL("content/ctbc-deep-research-interview-addendum.md", root),
  new URL("content/ctbc-virtual-asset-stablecoin-pm-interview-prep.md", root),
];

async function render(path = "/") {
  const workerUrl = new URL("dist/server/index.js", root);
  const [workerStat, ...sourceStats] = await Promise.all([
    stat(workerUrl),
    ...sourceUrls.map((url) => stat(url)),
  ]);
  const newestSource = Math.max(...sourceStats.map(({ mtimeMs }) => mtimeMs));
  assert.ok(
    workerStat.mtimeMs >= newestSource,
    "dist is older than the interview source; run npm run build before rendered tests",
  );

  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the current CTBC interview workspace", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="zh-Hant"/i);
  assert.match(html, /<title>\u4e2d\u570b\u4fe1\u8a17\uff5c\u865b\u64ec\u8cc7\u7522 PM \u9762\u8a66\u4f5c\u6230\u5ba4<\/title>/i);
  assert.match(html, /\u4e2d\u570b\u4fe1\u8a17\u865b\u64ec\u8cc7\u7522\u8207\u7a69\u5b9a\u5e63\u7522\u54c1\u7d93\u7406\uff5c\u8077\u4f4d\u5feb\u901f\u7406\u89e3/);
  assert.match(html, /AI \u9762\u8a66\u6559\u7df4/);
  assert.match(html, /\u958b\u555f\u5373\u6642\u67e5\u8a62/);
});

test("keeps handbook, research, search, glossary, navigation, and coach wired to current sources", async () => {
  const [page, layout, overview, search, glossary, coach, handbook] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/quick-overview.tsx", root), "utf8"),
    readFile(new URL("app/floating-search.tsx", root), "utf8"),
    readFile(new URL("app/glossary.tsx", root), "utf8"),
    readFile(new URL("app/coach/page.tsx", root), "utf8"),
    readFile(new URL("content/ctbc-virtual-asset-stablecoin-pm-interview-prep.md", root), "utf8"),
  ]);

  assert.match(page, /ctbc-blockchain-regulation-15min-cram\.md\?raw/);
  assert.match(page, /ctbc-deep-research-interview-addendum\.md\?raw/);
  assert.match(page, /ctbc-virtual-asset-stablecoin-pm-interview-prep\.md\?raw/);
  assert.match(page, /<QuickOverview \/>/);
  assert.match(page, /<FloatingSearch chapters=\{chapters\} onSelect=\{goTo\} \/>/);
  assert.match(page, /<GlossaryEnhancer rootId=\{active\.id\} \/>/);
  assert.match(page, /window\.history\.replaceState\(null, "", `#\$\{id\}`\)/);
  assert.match(page, /href="\.\/coach\/"/);
  assert.match(layout, /title:\s*"\u4e2d\u570b\u4fe1\u8a17\uff5c\u865b\u64ec\u8cc7\u7522 PM \u9762\u8a66\u4f5c\u6230\u5ba4"/);
  assert.match(overview, /\u5b8c\u6574\u8cc7\u683c\u689d\u4ef6/);
  assert.match(overview, /StablecoinQuickModules/);
  assert.match(search, /\u627e\u4e0d\u5230「\{query\.trim\(\)\}」\u7684\u76f8\u95dc\u5167\u5bb9/);
  assert.match(search, /aria-label="\u5373\u6642\u641c\u5c0b\u7db2\u7ad9\u5167\u5bb9"/);
  assert.match(glossary, /term: "DD"/);
  assert.match(glossary, /term: "PoC"/);
  assert.match(glossary, /aria-haspopup/);
  assert.match(glossary, /role="dialog"/);
  assert.match(coach, /\u8f09\u5165\u793a\u7bc4\u554f\u984c/);
  assert.match(coach, /\u8cc7\u6599\u6c92\u6709\u5beb、\u5c65\u6b77\u6c92\u6709\u505a\u904e\u7684\u4e8b/);
  assert.match(handbook, /JD \u8b49\u64da\u908a\u754c/);
  assert.match(handbook, /FATF\uff1a2026 Stablecoins and Unhosted Wallets/);
});

test("includes the two requested research expansions and GitHub Pages build", async () => {
  const [stablecoin, research, pagesHome, pagesCoach] = await Promise.all([
    readFile(new URL("app/stablecoin-quick-modules.tsx", root), "utf8"),
    readFile(new URL("content/ctbc-deep-research-interview-addendum.md", root), "utf8"),
    readFile(new URL("pages-dist/index.html", root), "utf8"),
    readFile(new URL("pages-dist/coach/index.html", root), "utf8"),
  ]);
  assert.match(stablecoin, /\u7a69\u5b9a\u5e63\u767c\u884c\u5546\u7684 AML\/CFT/);
  assert.match(stablecoin, /USD1/);
  assert.match(stablecoin, /Bank Admission/);
  assert.match(research, /R2\. \u5168\u7403\u9280\u884c\u5982\u4f55\u628a Crypto \u7d0d\u5165\u5408\u898f\u696d\u52d9/);
  assert.match(research, /R6\. Crypto Compliance Stack/);
  assert.match(research, /Reusable KYC/);
  assert.match(research, /Fireblocks/);
  assert.match(pagesHome, /interviewCOACH_d\/assets/);
  assert.match(pagesCoach, /interviewCOACH_d\/assets/);
});

test("server-renders the interview coach route", async () => {
  const response = await render("/coach");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AI \u9762\u8a66\u6559\u7df4/);
  assert.match(html, /\u958b\u59cb\u6536\u97f3/);
  assert.match(html, /\u7b49\u5f85\u554f\u984c/);
  assert.match(html, /\u97f3\u8a0a\u4e0d\u6703\u5132\u5b58\u5728\u672c\u7db2\u7ad9/);
});
