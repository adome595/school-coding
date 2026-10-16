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
      if (req.url.startsWith("/api/")) {
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const upstream = await fetch("https://ignav.com" + req.url, {
          method: req.method,
          headers: { "X-Api-Key": KEY, "Content-Type": "application/json" },
          body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
        });
        res.writeHead(upstream.status, { "Content-Type": "application/json" });
        res.end(await upstream.text());
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