import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildApp } from '../src/app';

test('GET /api/health returns online status, version, and timestamp', async () => {
  const app = buildApp();

  const response = await app.inject({ method: 'GET', url: '/api/health' });
  assert.equal(response.statusCode, 200);

  const body = response.json();
  assert.equal(body.status, 'online');
  assert.equal(typeof body.version, 'string');
  assert.match(body.timestamp, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);

  await app.close();
});
