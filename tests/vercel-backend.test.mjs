import test from "node:test";
import assert from "node:assert/strict";

import healthHandler from "../vercel-backend/api/health.js";
import realtimeHandler from "../vercel-backend/api/realtime-session.js";

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
    send(value) { this.body = value; return this; },
    end() { return this; },
  };
}

test("Vercel health endpoint reports configuration without exposing secrets", () => {
  const response = createResponse();
  healthHandler({ headers: { origin: "https://dicksonlo901019.github.io" } }, response);
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(typeof response.body.openaiConfigured, "boolean");
  assert.equal(response.headers["access-control-allow-origin"], "https://dicksonlo901019.github.io");
  assert.equal("OPENAI_API_KEY" in response.body, false);
});

test("Vercel Realtime endpoint accepts GitHub Pages CORS preflight", async () => {
  const response = createResponse();
  await realtimeHandler({ method: "OPTIONS", headers: { origin: "https://dicksonlo901019.github.io" } }, response);
  assert.equal(response.statusCode, 204);
  assert.equal(response.headers["access-control-allow-origin"], "https://dicksonlo901019.github.io");
  assert.match(response.headers["access-control-allow-headers"], /X-Coach-Pin/);
});

test("Vercel Realtime endpoint rejects an unapproved browser origin", async () => {
  const response = createResponse();
  await realtimeHandler({ method: "POST", headers: { origin: "https://example.com" } }, response);
  assert.equal(response.statusCode, 403);
  assert.equal(response.body.code, "ORIGIN_NOT_ALLOWED");
});

test("Vercel Realtime endpoint clearly reports a missing server API key", async () => {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const response = createResponse();
  await realtimeHandler({
    method: "POST",
    headers: {
      origin: "https://dicksonlo901019.github.io",
      "content-type": "application/sdp",
    },
  }, response);
  if (previousKey) process.env.OPENAI_API_KEY = previousKey;
  assert.equal(response.statusCode, 503);
  assert.equal(response.body.code, "OPENAI_NOT_CONFIGURED");
});
