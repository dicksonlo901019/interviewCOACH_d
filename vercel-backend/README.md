# Interview Coach Realtime API

Vercel Functions backend for the GitHub Pages interview coach.

## Required environment variables

- `OPENAI_API_KEY`: server-only OpenAI API key.
- `ALLOWED_ORIGINS`: comma-separated browser origins. Defaults to `https://dicksonlo901019.github.io`.
- `COACH_ACCESS_PIN`: optional private access code required through the `X-Coach-Pin` header.

Deploy this directory as an independent Vercel project. Never expose `OPENAI_API_KEY` in the GitHub Pages build.
