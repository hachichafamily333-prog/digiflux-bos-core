const { test } = require('node:test');
const assert = require('node:assert/strict');
const { api } = require('./index');
const handler = require('./handler');
const config = require('../firebase.json');
test('Hosting targets the exported API in the same region', () => {
  assert.equal(typeof api, 'function');
  assert.deepEqual(config.hosting.rewrites[0].function, { functionId: 'api', region: 'us-central1' });
  assert.equal(api.__endpoint.region[0], 'us-central1');
});
async function request(path, method = 'GET') {
  const res = { headers: {}, set(k, v) { this.headers[k] = v; }, status(v) { this.code = v; return this; }, json(v) { this.body = v; return this; } };
  await handler({ path, method }, res);
  return res;
}
test('health returns JSON without caching', async () => {
  const res = await request('/api/health');
  assert.equal(res.code, 200);
  assert.equal(res.body.status, 'online');
  assert.equal(res.headers['Cache-Control'], 'no-store');
});
test('unknown routes and writes are rejected', async () => {
  assert.equal((await request('/api/clients')).code, 404);
  assert.equal((await request('/api/health', 'POST')).code, 405);
});
