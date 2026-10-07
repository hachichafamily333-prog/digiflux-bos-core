module.exports = (req, res) => {
  res.set("Cache-Control", "no-store");
  if (!["/", "/api", "/api/", "/health", "/api/health"].includes(req.path)) {
    return res.status(404).json({ error: "not_found" });
  }
  if (req.method !== "GET") {
    res.set("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  return res.status(200).json({ status: "online", enterprise: "DigiFlux" });
};
