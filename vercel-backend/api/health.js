const DEFAULT_ORIGINS = [
  "https://dicksonlo901019.github.io",
];

function allowedOrigins() {
  return new Set(
    (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(","))
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

export default function handler(request, response) {
  const origin = request.headers.origin;
  if (origin && allowedOrigins().has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
  }

  response.status(200).json({
    ok: true,
    service: "interviewcoach-d-realtime-api",
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    accessPinConfigured: Boolean(process.env.COACH_ACCESS_PIN),
  });
}
