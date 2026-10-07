const base = process.argv[2] || 'https://digifluxos.web.app';
async function verify() {
  const page = await fetch(base, { signal: AbortSignal.timeout(15000) });
  if (!page.ok || !(await page.text()).includes('DigiFlux Agentic OS')) throw new Error('Hosting check failed');
  const api = await fetch(base + '/api/health', { signal: AbortSignal.timeout(15000) });
  if (!api.ok || (await api.json()).status !== 'online') throw new Error('API check failed');
  const missing = await fetch(base + '/api/unknown', { signal: AbortSignal.timeout(15000) });
  if (missing.status !== 404) throw new Error('API routing check failed');
}
for (let attempt = 1; attempt <= 6; attempt++) {
  try { await verify(); console.log('Hosting and API verified: ' + base); break; }
  catch (error) {
    if (attempt === 6) throw error;
    console.log('Deployment not ready (attempt ' + attempt + '/6)');
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
