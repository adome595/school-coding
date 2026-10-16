const http = require("http");
const fs = require("fs");
const path = require("path");

function decodeEnv(buf) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buf);
  } catch {
    return new TextDecoder("windows-1257").decode(buf);
  }
}

try {
  for (const line of decodeEnv(fs.readFileSync(path.join(__dirname, ".env"))).split(/\r?\n/)) {
    if (line.trim().startsWith("#")) continue;
    const m = line.match(/^\s*([\p{L}\p{N}_.-]+)\s*=\s*(.*?)\s*$/u);
    if (!m) continue;
    const value = m[2].replace(/^(['"])(.*)\1$/, "$2");
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
} catch {
}

const KEY = process.env.IGNAV_API_KEY;
const TF_KEY = process.env.TINYFISH_API_KEY;
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

if (!KEY) {
  console.error("Add IGNAV_API_KEY=your_key to a .env file next to server.js.");
  process.exit(1);
}

http
  .createServer(async (req, res) => {
    try {
      if (req.url.startsWith("/city-info")) {
  const city = new URL(req.url, "http://localhost").searchParams.get("city")?.trim();
  if (!TF_KEY || !city) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: !TF_KEY ? "TINYFISH_API_KEY not set" : "Missing city" }));
    return;
  }
  const upstream = await fetch(
    "https://api.search.tinyfish.ai?" +
      new URLSearchParams({ query: `Things to do in ${city}` }),
    { headers: { "X-API-Key": TF_KEY } }
  );
  const data = await upstream.json().catch(() => ({}));
  console.log(JSON.stringify(data).slice(0, 1000));
  console.log("GET /city-info ->", upstream.status);
  const results = (data.results || []).slice(0, 5).map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.snippet || "",
  }));
  res.writeHead(upstream.ok ? 200 : 502, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ results }));
  return;
}
      if (req.url.startsWith("/api/")) {
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const upstream = await fetch("https://ignav.com" + req.url, {
          method: req.method,
          headers: { "X-Api-Key": KEY, "Content-Type": "application/json" },
          body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
        });
        const body = await upstream.text();
        console.log(req.method, req.url.split("?")[0], "->", upstream.status);
        if (!upstream.ok) console.log(body.slice(0, 500));
        res.writeHead(upstream.status, { "Content-Type": "application/json" });
        res.end(body);
        return;
      }

      const urlPath = req.url.split("?")[0];
      const rel = urlPath === "/" ? "index.html" : urlPath.slice(1);
      const file = path.normalize(path.join(PUBLIC_DIR, rel));
      if (!file.startsWith(PUBLIC_DIR) || !TYPES[path.extname(file)]) {
        res.writeHead(404).end("Not found");
        return;
      }
      fs.readFile(file, (err, data) => {
        if (err) return res.writeHead(404).end("Not found");
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] });
        res.end(data);
      });
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
  })
  .listen(PORT, () => console.log(`Open http://localhost:${PORT}`));