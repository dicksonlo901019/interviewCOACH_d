const DEFAULT_ORIGINS = [
  "https://dicksonlo901019.github.io",
];

const SESSION_INSTRUCTIONS = `你是 Dickson 的繁體中文銀行產品經理面試教練。你的任務是根據使用者傳來的面試問題與準備資料，提供誠實、可直接口語表達的回答骨架。

必要規則：
1. 不得捏造候選人的經歷、證照、職稱、數字或成果。
2. 優先使用傳入的準備資料；資料不足時清楚標示「需依你的真實經驗補充」。
3. 涉及法規時提醒確認資料日期，不把推測寫成確定事實。
4. 回答必須使用繁體中文，先給結論，再談商業價值、銀行角色、風險與落地方式。
5. 每次只輸出以下四個區段，標題與方括號完全一致：
[問題判斷]
[30秒回答]
[90秒回答]
[引用準備資料]
6. 不要輸出 Markdown 表格，不要在區段之前或之後加任何文字。`;

function allowedOrigins() {
  return new Set(
    (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(","))
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function applyCors(request, response) {
  const origin = request.headers.origin;
  if (!origin || !allowedOrigins().has(origin)) return false;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Coach-Pin");
  response.setHeader("Access-Control-Max-Age", "86400");
  response.setHeader("Vary", "Origin");
  return true;
}

function jsonError(response, message, status, code) {
  return response.status(status).json({ error: message, code });
}

async function readSdp(request) {
  if (typeof request.body === "string") return request.body;
  if (Buffer.isBuffer(request.body)) return request.body.toString("utf8");
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100kb",
    },
  },
};

export default async function handler(request, response) {
  if (!applyCors(request, response)) {
    return jsonError(response, "此網站來源未獲准使用 AI 教練。", 403, "ORIGIN_NOT_ALLOWED");
  }

  if (request.method === "OPTIONS") return response.status(204).end();
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    return jsonError(response, "不支援的請求方式。", 405, "METHOD_NOT_ALLOWED");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonError(response, "AI 教練後端已上線，但尚未設定 OpenAI 服務金鑰。", 503, "OPENAI_NOT_CONFIGURED");
  }

  const requiredPin = process.env.COACH_ACCESS_PIN;
  if (requiredPin && request.headers["x-coach-pin"] !== requiredPin) {
    return jsonError(response, "請輸入正確的 AI 教練存取碼。", 401, "INVALID_COACH_PIN");
  }

  const contentType = String(request.headers["content-type"] || "");
  if (!contentType.startsWith("application/sdp")) {
    return jsonError(response, "請求內容必須是 SDP。", 415, "INVALID_CONTENT_TYPE");
  }

  const sdp = await readSdp(request);
  if (!sdp || sdp.length > 100_000 || !sdp.startsWith("v=0")) {
    return jsonError(response, "無效的即時連線資料。", 400, "INVALID_SDP");
  }

  const form = new FormData();
  form.set("sdp", sdp);
  form.set("session", JSON.stringify({
    type: "realtime",
    model: "gpt-realtime-2.1",
    output_modalities: ["text"],
    instructions: SESSION_INSTRUCTIONS,
    audio: {
      input: {
        transcription: {
          model: "gpt-4o-mini-transcribe",
          language: "zh",
        },
        turn_detection: {
          type: "semantic_vad",
          create_response: false,
          interrupt_response: false,
        },
      },
    },
  }));

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Safety-Identifier": "ctbc-interview-coach",
      },
      body: form,
    });
    const body = await openaiResponse.text();
    if (!openaiResponse.ok) {
      console.error("Realtime session failed", openaiResponse.status, body.slice(0, 500));
      return jsonError(response, "無法建立 AI 即時連線，請稍後再試。", 502, "REALTIME_SESSION_FAILED");
    }

    response.status(200);
    response.setHeader("Content-Type", "application/sdp");
    response.setHeader("Cache-Control", "no-store");
    return response.send(body);
  } catch (error) {
    console.error("Realtime session request failed", error);
    return jsonError(response, "即時服務目前無法連線。", 502, "REALTIME_UNREACHABLE");
  }
}
