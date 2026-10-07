# Firebase deployment readiness

Target project: `digifluxos`. Default branch: `master`.

## Corrected foundation
- Node.js 22 for Functions and CI.
- Exported public health function `api`, with matching Hosting rewrite and explicit us-central1 region.
- Locked dependencies and reproducible npm ci.
- Pull-request tests; production deploys API before Hosting, then verifies live endpoints.
- Runtime cap: two instances, zero minimum instances.
- Hosting status reflects the health endpoint.
- Authentication uses Application Default Credentials via google-github-actions/auth.

## Required Google / GitHub configuration
Create the repository Actions secret `FIREBASE_SERVICE_ACCOUNT_DIGIFLUXOS` with the service-account JSON for this project. Do not commit it. Prefer migrating to Workload Identity Federation once the deployment service account and Google IAM configuration can be administered.

Verify project billing (Blaze), API enablement, deployer IAM permissions, runtime service account permissions, and public invocation permission for this health endpoint. Do not add business data to the public health route. Add Firebase Auth and authorization before business endpoints; define and test Firestore/Storage rules when those services are introduced.

## Verification on 2026-10-07
- Existing Hosting root returned HTTP 200.
- Existing /api/health returned HTTP 404.
- Three local tests passed (export / region mapping, JSON health, rejected unknown routes and writes).
- Existing GitHub deployment failed because FIREBASE_TOKEN was empty.
- Local Firebase project authentication did not succeed with the supplied service account. This does not establish whether its IAM privileges or billing are correct.

## Release gate
After configuring authentication and merging:
1. GitHub Firebase checks succeed.
2. Production deploy succeeds for Functions and Hosting.
3. Post-deploy Hosting and API checks succeed.
4. Verify billing and IAM in Firebase / Google Cloud.
Until these pass, readiness is pending. The repository is a foundation, not the implemented business application.

## Commands
```sh
npm ci --prefix functions
npm run build --prefix functions
npm test --prefix functions
firebase deploy --project digifluxos --only functions:api --non-interactive
firebase deploy --project digifluxos --only hosting --non-interactive
node scripts/verify-deployment.mjs https://digifluxos.web.app
```
