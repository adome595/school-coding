module.exports = async (req, res) => {
  try {
    const payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const upstream = await fetch("https://ignav.com/api/fares/one-way", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.IGNAV_API_KEY,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const body = await upstream.text();
    console.log("one-way ->", upstream.status, payload);
    if (!upstream.ok) console.log(body.slice(0, 500));
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};