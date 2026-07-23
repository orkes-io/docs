const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const LEGACY_BASE_URL = "/content";
const LEGACY_SITE_URLS = ["https://orkes.io/content/", "http://orkes.io/content/"];
const BASE_URL = normalizeBaseUrl(process.env.DOCS_BASE_URL || "/content");
const SITE_URL = normalizeSiteUrl(process.env.DOCS_SITE_URL || "https://orkes.io/content/");

function normalizeBaseUrl(value) {
  const clean = String(value || "").trim().replace(/\/+$/, "");
  if (!clean || clean === "/") return "";
  return clean.startsWith("/") ? clean : `/${clean}`;
}

function normalizeSiteUrl(value) {
  const clean = String(value || "").trim();
  if (!clean) return "https://orkes.io/content/";
  return clean.endsWith("/") ? clean : `${clean}/`;
}

function rewriteLegacySiteUrl(value) {
  for (const legacySiteUrl of LEGACY_SITE_URLS) {
    if (legacySiteUrl === SITE_URL) continue;
    if (value.startsWith(legacySiteUrl)) return `${SITE_URL}${value.slice(legacySiteUrl.length)}`;
    if (value === legacySiteUrl.slice(0, -1)) return SITE_URL;
  }
  return null;
}

function posixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function listFiles(dir, predicate) {
  const files = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    for (const entry of fs.readdirSync(current)) {
      const full = path.join(current, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (!predicate || predicate(full)) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files.sort();
}

function routeForHtml(file) {
  const rel = posixPath(path.relative(BUILD_DIR, file));
  if (rel === "index.html") return "";
  if (rel.endsWith("/index.html")) return stripHtmlFromRoute(rel.slice(0, -"/index.html".length));
  return stripHtmlFromRoute(rel.replace(/\.html$/, ""));
}

function stripHtmlFromRoute(route) {
  let next = route.replace(/\.html$/, "");
  next = next.replace(/\/index$/, "");
  next = next.replace(/^_routes\//, "");
  if (next === "index") return "";
  return next;
}

function isAssetHref(href) {
  return /\.(css|js|json|png|jpg|jpeg|gif|svg|webp|ico|txt|xml|map|woff2?|ttf|eot|pdf|zip)([#?].*)?$/i.test(
    href,
  );
}

function toCanonicalPath(href, currentRoute) {
  if (!href) return href;
  const legacySiteUrl = rewriteLegacySiteUrl(href);
  if (legacySiteUrl) return legacySiteUrl;
  if (/^(https?:|mailto:|tel:|javascript:|data:)/.test(href)) {
    if (!href.startsWith(SITE_URL)) return href;
    const pathPart = href.slice(SITE_URL.length);
    return `${SITE_URL}${stripHtmlFromRoute(pathPart)}`;
  }
  if (href.startsWith("#") || href.startsWith("//")) return href;
  if (isAssetHref(href)) return href;

  const split = href.match(/^([^#?]*)([?#].*)?$/);
  const pathPart = split ? split[1] : href;
  const suffix = split && split[2] ? split[2] : "";

  if (pathPart.startsWith(`${BASE_URL}/`) || pathPart === `${BASE_URL}` || pathPart === `${BASE_URL}/`) {
    const route = stripHtmlFromRoute(pathPart.slice(BASE_URL.length).replace(/^\//, ""));
    return route ? `${BASE_URL}/${route}${suffix}` : `${BASE_URL}/${suffix}`;
  }

  if (
    BASE_URL !== LEGACY_BASE_URL &&
    (pathPart.startsWith(`${LEGACY_BASE_URL}/`) || pathPart === LEGACY_BASE_URL || pathPart === `${LEGACY_BASE_URL}/`)
  ) {
    const route = stripHtmlFromRoute(pathPart.slice(LEGACY_BASE_URL.length).replace(/^\//, ""));
    return route ? `${BASE_URL}/${route}${suffix}` : `${BASE_URL}/${suffix}`;
  }

  if (pathPart.endsWith(".html") || pathPart === "." || pathPart === "./") {
    const currentDir = currentRoute ? path.posix.dirname(currentRoute) : "";
    const resolved = path.posix.normalize(path.posix.join("/", currentDir, pathPart));
    const route = stripHtmlFromRoute(resolved.replace(/^\//, ""));
    return route ? `${BASE_URL}/${route}${suffix}` : `${BASE_URL}/${suffix}`;
  }

  return href;
}

function rewriteHtml(file) {
  const currentRoute = routeForHtml(file);
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    /\b(href|src|content)=["']([^"']+)["']/g,
    (all, attr, href) => `${attr}="${toCanonicalPath(href, currentRoute)}"`,
  );
  fs.writeFileSync(file, html);
}

function dropOneParentDirSegment(href) {
  return href.startsWith("../") ? href.slice(3) : href;
}

function addOneParentDirSegment(href) {
  return `../${href}`;
}

function isRelativeHref(href) {
  return !/^(https?:|mailto:|tel:|javascript:|data:|#|\/\/|\/)/.test(href);
}

// Material stores the site root as a relative path in its __config JSON
// ("base":"../.."). The search worker builds the search_index.json URL from that
// base, so it must shift in lockstep with the asset depth below. Otherwise a flat
// (no-trailing-slash) page keeps the deeper base, requests /search/search_index.json
// at the DOMAIN ROOT, gets 403, and the uncaught error crashes the whole Material
// bundle — search, palette toggle, and sidebar scroll all die together.
function shiftConfigBaseDepth(html, delta) {
  return html.replace(/("base"\s*:\s*")([^"']*)(")/, (all, pre, val, post) => {
    const depth = (val.match(/\.\./g) || []).length;
    const next = Math.max(0, depth + delta);
    const v = next === 0 ? "." : Array(next).fill("..").join("/");
    return `${pre}${v}${post}`;
  });
}

function rewriteAssetDepthForRouteAlias(html) {
  html = html.replace(/\b(href|src|content)=["']([^"']+)["']/g, (all, attr, href) => {
    if (!isAssetHref(href) || !href.startsWith("../")) return all;
    return `${attr}="${dropOneParentDirSegment(href)}"`;
  });
  return shiftConfigBaseDepth(html, -1);
}

function rewriteAssetDepthForTrailingSlashAlias(html) {
  html = html.replace(/\b(href|src|content)=["']([^"']+)["']/g, (all, attr, href) => {
    if (!isAssetHref(href) || !isRelativeHref(href)) return all;
    return `${attr}="${addOneParentDirSegment(href)}"`;
  });
  return shiftConfigBaseDepth(html, +1);
}

function copyRouteAliasHtml(file) {
  const rel = posixPath(path.relative(BUILD_DIR, file));
  if (rel === "index.html" || rel === "404.html") return;
  const publicRel = stripHtmlFromRoute(rel);
  const htmlTarget = path.join(BUILD_DIR, `${publicRel}.html`);
  if (rel.startsWith("_routes/")) {
    fs.mkdirSync(path.dirname(htmlTarget), { recursive: true });
    // Files under _routes/ sit one directory deeper than their public alias,
    // so their relative asset paths (skipped by rewriteHtml's canonical-path
    // pass) have one extra "../" that must be dropped when copying out.
    const html = fs.readFileSync(file, "utf8");
    fs.writeFileSync(htmlTarget, rewriteAssetDepthForRouteAlias(html));
  }
}

function createTrailingSlashAliases() {
  let count = 0;
  const htmlFiles = listFiles(BUILD_DIR, (file) => file.endsWith(".html"));
  for (const file of htmlFiles) {
    const rel = posixPath(path.relative(BUILD_DIR, file));
    if (rel === "index.html" || rel === "404.html" || rel.endsWith("/index.html")) continue;

    const route = stripHtmlFromRoute(rel);
    if (!route) continue;

    const aliasDir = path.join(BUILD_DIR, route);
    const aliasFile = path.join(aliasDir, "index.html");
    if (fs.existsSync(aliasDir) && !fs.statSync(aliasDir).isDirectory()) {
      console.warn(`Skipping trailing-slash alias for ${rel}: ${posixPath(path.relative(BUILD_DIR, aliasDir))} is a file.`);
      continue;
    }

    fs.mkdirSync(aliasDir, { recursive: true });
    // The alias sits one directory level deeper than the original flat file, so its
    // relative asset paths (skipped by rewriteHtml's canonical-path pass, which already
    // ran before this step) need one more "../" prepended — same bug class as
    // rewriteAssetDepthForRouteAlias above, just the opposite direction.
    const html = fs.readFileSync(file, "utf8");
    const source = rewriteAssetDepthForTrailingSlashAlias(html);
    if (fs.existsSync(aliasFile) && fs.readFileSync(aliasFile, "utf8") === source) continue;
    fs.writeFileSync(aliasFile, source);
    count += 1;
  }
  return count;
}

function rewriteSearchIndex(file) {
  if (!fs.existsSync(file)) return;
  let json = fs.readFileSync(file, "utf8");
  json = json.replace(/"location":"([^"]+?)\.html(#[^"]*)?"/g, (_all, route, hash = "") => {
    const clean = stripHtmlFromRoute(route);
    return `"location":"${clean}${hash}"`;
  });
  fs.writeFileSync(file, json);
}

function canonicalSiteUrl(href) {
  if (!href.startsWith(SITE_URL)) return href;
  const route = stripHtmlFromRoute(href.slice(SITE_URL.length));
  return route ? `${SITE_URL}${route}` : SITE_URL;
}

function rewriteSitemap(file) {
  if (!fs.existsSync(file)) return;
  const xml = fs.readFileSync(file, "utf8").replace(
    /<loc>([^<]+)<\/loc>/g,
    (_all, href) => `<loc>${canonicalSiteUrl(href)}</loc>`,
  );
  fs.writeFileSync(file, xml);
  fs.writeFileSync(`${file}.gz`, zlib.gzipSync(xml));
}

function main() {
  const htmlFiles = listFiles(BUILD_DIR, (file) => file.endsWith(".html"));
  for (const file of htmlFiles) rewriteHtml(file);
  for (const file of htmlFiles) copyRouteAliasHtml(file);
  fs.rmSync(path.join(BUILD_DIR, "_routes"), { recursive: true, force: true });
  const aliasCount = createTrailingSlashAliases();
  rewriteSearchIndex(path.join(BUILD_DIR, "search", "search_index.json"));
  rewriteSitemap(path.join(BUILD_DIR, "sitemap.xml"));
  console.log(`Postprocessed ${htmlFiles.length} MkDocs HTML files. Added ${aliasCount} trailing-slash aliases.`);
}

main();
