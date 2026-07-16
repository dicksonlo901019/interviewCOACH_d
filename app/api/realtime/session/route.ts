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

function jsonError(message: string, status: number, code: string) {
  return Response.json({ error: message, code }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonError("AI 教練尚未設定服務金鑰。", 503, "OPENAI_NOT_CONFIGURED");
  }

  const requiredPin = process.env.COACH_ACCESS_PIN;
  if (requiredPin && request.headers.get("x-coach-pin") !== requiredPin) {
    return jsonError("請輸入正確的 AI 教練存取碼。", 401, "INVALID_COACH_PIN");
  }

  const sdp = await request.text();
  if (!sdp || sdp.length > 100_000) {
    return jsonError("無效的即時連線資料。", 400, "INVALID_SDP");
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
    const response = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Safety-Identifier": "ctbc-interview-coach",
      },
      body: form,
    });

    const body = await response.text();
    if (!response.ok) {
      console.error("Realtime session failed", response.status, body.slice(0, 500));
      return jsonError("無法建立 AI 即時連線，請稍後再試。", 502, "REALTIME_SESSION_FAILED");
    }

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/sdp",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Realtime session request failed", error);
    return jsonError("即時服務目前無法連線。", 502, "REALTIME_UNREACHABLE");
  }
}
