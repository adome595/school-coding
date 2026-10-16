module.exports = async (req, res) => {
  const key = process.env.TINYFISH_API_KEY;
  const city = (req.query.city || "").toString().trim();
  if (!key || !city) {
    res.status(400).json({ error: !key ? "TINYFISH_API_KEY not set" : "Missing city" });
    return;
  }
  try {
    const upstream = await fetch(
      "https://api.search.tinyfish.ai?" +
        new URLSearchParams({
          query: `"${city}" travel guide attractions neighborhoods`,
          location: "US",
          language: "en",
        }),
      { headers: { "X-API-Key": key } }
    );
    const data = await upstream.json().catch(() => ({}));
    const results = (data.results || [])
      .filter((r) => !/[£$€]\s?\d|\d+\s?(usd|eur|gbp)|under \d+/i.test(r.title + " " + r.snippet))
      .slice(0, 5)
      .map((r) => ({ title: r.title, url: r.url, snippet: r.snippet || "" }));
    res.status(upstream.ok ? 200 : 502).json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};