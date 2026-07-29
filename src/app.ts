import fs from 'node:fs';
import path from 'node:path';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';

export function getVersion(): string {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as { version: string };
  return pkg.version;
}

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      // Never log auth-related headers or cookies, even if present in a request.
      redact: ['req.headers.authorization', 'req.headers.cookie'],
    },
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
    index: 'index.html',
  });

  app.get('/api/health', async () => {
    return {
      status: 'online',
      version: getVersion(),
      timestamp: new Date().toISOString(),
    };
  });

  return app;
}
