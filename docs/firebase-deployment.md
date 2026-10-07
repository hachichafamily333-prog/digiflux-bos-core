# Firebase Hosting deployment

Official URL: https://digifluxos-agentic.web.app
Project: digifluxos
Hosting site: digifluxos-agentic

## User constraint
No billing activation. Keep the Firebase project on the no-cost Spark plan.
Spark is quota-limited. Its current plan must be confirmed in Firebase Console;
this workflow does not inspect or change billing.

## Pipeline
Push approved final changes to master -> GitHub Actions tests -> Google service-account authentication -> deploy Hosting only -> check the official public page.

The GitHub Actions secret is FIREBASE_SERVICE_ACCOUNT_DIGIFLUXOS.
Cloud Billing API is not used and does not need to be enabled.
The workflow does not deploy Functions, Cloud Run, App Hosting, Storage, databases or AI features.
No backend has been implemented.

## Status before this change
Repository authentication succeeded using the newly configured secret.
The previously added optional billing check blocked on SERVICE_DISABLED.
That check has been removed at the user's request.
A successful Hosting deployment and public verification are still required.

## Commands
node --test scripts/hosting.test.mjs
firebase deploy --project digifluxos --only hosting --non-interactive
node scripts/verify-deployment.mjs https://digifluxos-agentic.web.app

Pricing reference: https://firebase.google.com/docs/projects/billing/firebase-pricing-plans
