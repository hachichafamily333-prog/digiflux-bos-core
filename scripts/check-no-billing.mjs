import { execFileSync } from 'node:child_process';
const token = execFileSync('gcloud', ['auth', 'print-access-token'], { encoding: 'utf8', timeout: 30000 }).trim();
const res = await fetch('https://cloudbilling.googleapis.com/v1/projects/digifluxos/billingInfo', {
  headers: { Authorization: 'Bearer ' + token }, signal: AbortSignal.timeout(15000)
});
if (!res.ok) {
  const payload = await res.json().catch(() => ({}));
  const error = payload.error || {};
  console.error(JSON.stringify({
    status: error.status,
    message: error.message,
    reasons: (error.details || []).map(detail => ({
      reason: detail.reason,
      service: detail.metadata?.service,
      permission: detail.metadata?.permission
    }))
  }));
  throw new Error('Cannot verify billing status; deployment blocked (HTTP ' + res.status + ')');
}
const info = await res.json();
if (info.billingEnabled !== false) throw new Error('Billing is enabled or unknown; deployment blocked');
console.log('No active billing confirmed for digifluxos');
