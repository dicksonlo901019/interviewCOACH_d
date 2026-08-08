import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { validateRegisteredGuide } from "./helpers/interview-content-standard.mjs";

const testRoot = new URL("./", import.meta.url);
const repoRoot = new URL("../", import.meta.url);

test("registers every published static interview guide and enforces the shared content standard", async () => {
  const registry = JSON.parse(await readFile(new URL("interview-guides.json", repoRoot), "utf8"));
  const publicEntries = await readdir(new URL("public/", repoRoot), { withFileTypes: true });
  const publishedGuideSlugs = publicEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const registeredSlugs = registry.guides.map((guide) => guide.slug).sort();
  const exemptedSlugs = registry.legacyExemptions.map((guide) => guide.slug).sort();

  assert.equal(registry.standard, "INTERVIEW_CONTENT_STANDARD.md");
  assert.deepEqual([...registeredSlugs, ...exemptedSlugs].sort(), publishedGuideSlugs, "every public interview guide directory must be registered or explicitly grandfathered");
  for (const exemption of registry.legacyExemptions) {
    assert.ok(exemption.reason.includes("future revision must remove this exemption"), "legacy exemptions must expire on the next revision");
  }

  for (const guide of registry.guides) {
    const result = await validateRegisteredGuide(testRoot, guide, {
      minimumCards: guide.slug === "binance" ? 15 : 1,
      minimumTerms: guide.slug === "binance" ? 25 : 1,
    });
    assert.ok(result.cards >= 1);
    assert.ok(result.terms >= 1);
  }
});
