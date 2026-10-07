const { onRequest } = require("firebase-functions/v2/https");

// Public health endpoint only. Authenticate future business routes.
exports.api = onRequest({
  region: "us-central1", invoker: "public", maxInstances: 2,
  minInstances: 0, memory: "256MiB", timeoutSeconds: 30
}, require("./handler"));
