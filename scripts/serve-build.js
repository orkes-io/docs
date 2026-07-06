const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const BASE_URL = "/content";
const PORT = Number(process.env.PORT || 3025);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function cleanRequestPath(requestPath) {
  let clean = decodeURIComponent(requestPath);
  if (clean === "/" || clean === BASE_URL) return "";
  if (clean.startsWith(`${BASE_URL}/`)) clean = clean.slice(BASE_URL.length + 1);
  clean = clean.replace(/^\/+/, "");
  const normalized = path.posix.normalize(clean);
  return normalized === "." || normalized.startsWith("../") ? "" : normalized;
}

function candidateFiles(route) {
  const file = path.join(BUILD_DIR, route);
  const candidates = [];
  if (!route || route.endsWith("/")) {
    candidates.push(path.join(BUILD_DIR, route, "index.html"));
    const withoutTrailingSlash = route.replace(/\/+$/, "");
    if (withoutTrailingSlash) {
      candidates.push(`${path.join(BUILD_DIR, withoutTrailingSlash)}.html`);
    }
  } else {
    if (!path.extname(route)) {
      candidates.push(`${file}.html`);
      candidates.push(path.join(file, "index.html"));
    }
    candidates.push(file);
  }
  return candidates;
}

function resolveFile(route) {
  for (const candidate of candidateFiles(route)) {
    if (!fs.existsSync(candidate)) continue;
    const stat = fs.statSync(candidate);
    if (stat.isFile()) return candidate;
    if (stat.isDirectory()) {
      const index = path.join(candidate, "index.html");
      if (fs.existsSync(index)) return index;
    }
  }
  return path.join(BUILD_DIR, "404.html");
}

function sendUnavailable(res) {
  if (!res.headersSent) {
    res.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
  }
  res.end("Site is rebuilding — refresh in a moment.");
}

function sendFile(res, file, method) {
  if (!fs.existsSync(file)) {
    sendUnavailable(res);
    return;
  }
  const status = file.endsWith("404.html") ? 404 : 200;
  const ext = path.extname(file);
  res.writeHead(status, {
    "content-type": mimeTypes[ext] || "application/octet-stream",
  });
  if (method === "HEAD") {
    res.end();
    return;
  }
  const stream = fs.createReadStream(file);
  stream.on("error", () => sendUnavailable(res));
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const route = cleanRequestPath(url.pathname);
  sendFile(res, resolveFile(route), req.method);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving MkDocs build at http://127.0.0.1:${PORT}${BASE_URL}/`);
});
