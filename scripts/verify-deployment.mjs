const base = process.argv[2] || 'https://digifluxos-agentic.web.app';
for (let attempt = 1; attempt <= 6; attempt++) {
  try {
    const res = await fetch(base, { signal: AbortSignal.timeout(15000) });
    if (!res.ok || !(await res.text()).includes('DigiFlux Agentic OS')) throw new Error('Hosting check failed');
    console.log('Hosting verified: ' + base);
    break;
  } catch (error) {
    if (attempt === 6) throw error;
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
