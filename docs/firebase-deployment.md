# Firebase: no-billing foundation

User requirement: remain on the free Spark plan; no billing activation or pay-as-you-go services.

## Current architecture
- Firebase Hosting only, serving public/.
- No Cloud Functions, Cloud Run, App Hosting, or Cloud Storage deployment.
- No business backend has been implemented.
- Firestore and email/password or Google sign-in may be considered later within Spark quotas, with appropriate security rules.
- No paid AI calls or SMS authentication without revisiting the user's requirement.

## Deployment
Actions uses FIREBASE_SERVICE_ACCOUNT_DIGIFLUXOS, then checks Google Cloud project billingInfo.
Deployment fails if billingEnabled is true, the response is ambiguous, or the service account cannot verify it.
The account needs permission to read project billing info as well as deploy Hosting.
It deploys only Hosting and checks the live page. It never enables billing.

## Remaining blocker
Google rejected the supplied key with invalid_grant / Invalid JWT Signature.
Configure a valid service-account key in the GitHub Actions secret.
The project's current billing status remains unverified. Keep the project on Spark.
Any already-enabled paid resources must be inspected separately; this change does not delete existing cloud resources.

## Free service limits
Spark has quotas; free does not mean unlimited. At limits, services may stop instead of charging.
See https://firebase.google.com/pricing and https://firebase.google.com/docs/projects/billing/firebase-pricing-plans .

## Checks
node --test scripts/hosting.test.mjs
node --check scripts/check-no-billing.mjs
node --check scripts/verify-deployment.mjs
