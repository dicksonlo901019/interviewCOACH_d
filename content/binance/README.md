# Binance interview website content sources

`issue-10-pnl-answers.json` is the repository authority for the nine approved answers from GitHub Issue #10. The answer text must remain verbatim unless the issue is explicitly amended.

Synchronization path:

1. Update the authority JSON only after an approved issue change.
2. Run `node scripts/build-binance-pnl-answers.mjs`.
3. Commit the authority JSON and generated `public/binance/pnl-answers-data.js` together.
4. `public/binance/pnl-answers.js` renders the generated payload into sections `03.01` and `01.05`; Vite copies the public files to GitHub Pages byte-for-byte.

Evidence and responsibility boundaries remain governed by `interviews/binance-asset-module/evidence/claim-ledger.md` in the parent career workspace.
