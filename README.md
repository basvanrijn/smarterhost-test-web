# SmarterHost Test Website

Minimal production-ready test website and API built with Node.js, TypeScript, and Fastify.

- `GET /` — plain HTML/CSS page showing the app version and live API status with a refresh button
- `GET /api/health` — JSON health check: `{ status, version, timestamp }`

## Requirements

- Node.js 20+
- npm

## Local development

```bash
npm install
npm run dev
```

The dev server watches for changes and listens on `http://0.0.0.0:3000`.

## Tests

```bash
npm test
```

## Build & run (production)

```bash
npm run build
npm start
```

## Docker

Build and run the container (non-root user, multi-stage build, built-in health check):

```bash
docker build -t smarterhost-test-web .
docker run --rm -p 3000:3000 smarterhost-test-web
```

The app is available at `http://localhost:3000`, and the container reports health via
`GET /api/health` (checked automatically by Docker's `HEALTHCHECK`).

## Configuration

- Port: `3000` (fixed)
- Host: `0.0.0.0`
- `LOG_LEVEL` (optional): Fastify/Pino log level, defaults to `info`

No database, authentication, or secrets are used by this project.
