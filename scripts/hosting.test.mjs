import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const config = JSON.parse(readFileSync(new URL('../firebase.json', import.meta.url)));
test('deployment configuration enables only static Hosting', () => {
  assert.deepEqual(Object.keys(config), ['hosting']);
  assert.equal(config.hosting.public, 'public');
  assert.equal(config.hosting.site, 'digifluxos-agentic');
  assert.equal(config.hosting.rewrites.some(r => r.function || r.run), false);
});
test('deployment uses only Hosting without Cloud Billing API', () => {
  const workflow = readFileSync(new URL('../.github/workflows/firebase-deploy.yml', import.meta.url), 'utf8');
  assert.ok(workflow.includes('--only hosting'));
  assert.ok(!workflow.includes('--only functions'));
  assert.ok(!workflow.includes('check-no-billing.mjs'));
  assert.ok(!workflow.includes('setup-gcloud'));
});
test('landing page does not rely on a billable API', () => {
  const page = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
  assert.ok(page.includes('DigiFlux Agentic OS'));
  assert.ok(!page.includes("fetch('/api/health')"));
});
