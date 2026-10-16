module.exports = async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const upstream = await fetch("https://ignav.com/api/airports" + (params ? "?" + params : ""), {
      headers: {
        "X-Api-Key": process.env.IGNAV_API_KEY,
        "Content-Type": "application/json",
      },
    });
    const body = await upstream.text();
    console.log("airports ->", upstream.status);
    if (!upstream.ok) console.log(body.slice(0, 500));
    res.status(upstream.status).setHeader("Content-Type", "application/json").send(body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};