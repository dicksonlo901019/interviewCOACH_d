import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps the Omnichat sidebar collapsible, persistent, and keyboard accessible", async () => {
  const [html, script, styles] = await Promise.all([
    readFile(new URL("public/omnichat/index.html", root), "utf8"),
    readFile(new URL("public/omnichat/app.js", root), "utf8"),
    readFile(new URL("public/omnichat/styles.css", root), "utf8"),
  ]);

  assert.match(html, /id="menu-button"[^>]+aria-keyshortcuts="Alt\+M"/);
  assert.match(html, /id="mobile-brand"[^>]+aria-controls="sidebar"[^>]+aria-expanded="false"/);
  assert.match(script, /omnichat-sidebar-collapsed/);
  assert.match(script, /event\.altKey && event\.key\.toLowerCase\(\) === 'm'/);
  assert.match(script, /function setSidebarInteractive\(interactive\)/);
  assert.match(script, /sidebar\.toggleAttribute\('inert', !interactive\)/);
  assert.match(script, /element\.tabIndex = -1/);
  assert.match(script, /setSidebarInteractive\(!collapsed\)/);
  assert.match(script, /setSidebarInteractive\(open\)/);
  assert.match(script, /aria-current', 'page'/);
  assert.match(script, /sidebarReturnFocus/);
  assert.match(script, /const focusTarget = restoreFocus && sidebarReturnFocus\?\.isConnected/);
  assert.match(script, /if \(focusTarget\) focusTarget\.focus\(\);[\s\S]+setSidebarInteractive\(false\)/);
  assert.match(script, /#sidebar-scrim[\s\S]+event\.stopPropagation\(\)/);
  assert.match(styles, /body\.sidebar-open \{ overflow: hidden; \}/);
  assert.match(styles, /body\.sidebar-collapsed \.main-panel \{ margin-left: 0; \}/);
});

test("supports hover preview, click-to-pin, keyboard toggling, and escape dismissal for glossary terms", async () => {
  const [html, script, styles] = await Promise.all([
    readFile(new URL("public/omnichat/index.html", root), "utf8"),
    readFile(new URL("public/omnichat/app.js", root), "utf8"),
    readFile(new URL("public/omnichat/styles.css", root), "utf8"),
  ]);

  assert.match(html, /滑鼠移入可預覽，點按可固定，按 Esc 關閉/);
  assert.match(html, /id="glossary-tooltip"[^>]+role="tooltip"[^>]+aria-live="polite"/);
  assert.match(script, /span\.setAttribute\('role', 'button'\)/);
  assert.match(script, /span\.setAttribute\('aria-expanded', 'false'\)/);
  assert.match(script, /let glossaryPinnedTerm = null/);
  assert.match(script, /function positionGlossaryTooltip\(termElement\)/);
  assert.match(script, /showGlossaryTooltip\(glossaryTerm, true\)/);
  assert.match(script, /event\.key === 'Enter' \|\| event\.key === ' '/);
  assert.match(script, /hideGlossaryTooltip\(true\)/);
  assert.match(script, /else positionGlossaryTooltip\(glossaryPinnedTerm\)/);
  assert.match(styles, /\.glossary-term\.is-pinned/);
  assert.match(styles, /\.glossary-tooltip\[data-pinned="true"\]/);
  assert.match(styles, /\.glossary-tooltip \{ top: auto !important;[^}]+bottom: 12px/s);
});
