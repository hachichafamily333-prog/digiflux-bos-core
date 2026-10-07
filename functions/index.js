const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Point d'entrée principal des Agents IA DigiFlux sur Cloud Functions
onRequest((req, res) => {
  logger.info("DigiFlux Agentic OS API invoked!", {structuredData: true});
  res.status(200).json({
    status: "online",
    enterprise: "DigiFlux",
    message: "Bienvenue dans l'API Cloud de l'Agentic OS DigiFlux."
  });
});
