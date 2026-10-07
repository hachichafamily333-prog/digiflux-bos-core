# Official application deployment

The public application is maintained in:
https://github.com/hachichafamily333-prog/-digiflux-client-os

Official URL: https://digifluxos-agentic.web.app
Firebase project: digifluxos
Hosting site: digifluxos-agentic
Build output: apps/web/dist

This core repository contains a placeholder public/index.html, not the application.
Its automatic public deployment is disabled to avoid overwriting the official site.
Do not deploy the core placeholder to digifluxos-agentic.

Develop application changes in -digiflux-client-os, run pnpm verify, and integrate
final versions into its main branch. Its firebase-hosting workflow builds and
deploys Hosting only using FIREBASE_SERVICE_ACCOUNT_DIGIFLUXOS.

Keep Firebase on Spark for no billing, within free quotas.
No Cloud Billing API activation is required.
