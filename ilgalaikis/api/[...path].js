const ALLOWED = ["/api/airports", "/api/fares/one-way"];

module.exports = async (req, res) => {
  try {
    const pathname = req.url.split("?")[0];
    if (!ALLOWED.includes(pathname)) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const upstream = await fetch("https://ignav.com" + req.url, {
      method: req.method,
      headers: {
        "X-Api-Key": process.env.IGNAV_API_KEY,
        "Content-Type": "application/json",
      },
      body: ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body),
    });
    const body = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};