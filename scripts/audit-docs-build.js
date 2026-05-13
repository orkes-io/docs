const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const LEGACY_BASE_PATH = "/content";
const LEGACY_SITE_URLS = ["https://orkes.io/content/", "http://orkes.io/content/"];
const BASE_PATH = normalizeBaseUrl(process.env.DOCS_BASE_URL || "/content");
const SITE_URL = normalizeSiteUrl(process.env.DOCS_SITE_URL || "https://orkes.io/content/");

const errors = [];
const warnings = [];

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

function stripTags(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function routeForHtml(file) {
  const rel = posixPath(path.relative(BUILD_DIR, file));
  if (rel === "index.html") return "";
  if (rel === "404.html") return "404";
  return rel.replace(/\.html$/, "").replace(/\/index$/, "");
}

function routeUrl(route) {
  return route ? `${SITE_URL}${route}` : SITE_URL;
}

function isAssetPath(value) {
  return /\.(css|js|json|png|jpg|jpeg|gif|svg|webp|ico|txt|xml|map|woff2?|ttf|eot|pdf|zip)([#?].*)?$/i.test(
    value,
  );
}

function startsWithBasePath(value, basePath) {
  if (!basePath) return value.startsWith("/");
  return value === basePath || value === `${basePath}/` || value.startsWith(`${basePath}/`);
}

function isInternalHrefString(href) {
  return startsWithBasePath(href, BASE_PATH) || href.startsWith(SITE_URL) || legacySiteUrlSuffix(href) !== null;
}

function legacySiteUrlSuffix(href) {
  for (const legacySiteUrl of LEGACY_SITE_URLS) {
    if (href.startsWith(legacySiteUrl)) return href.slice(legacySiteUrl.length);
    if (href === legacySiteUrl.slice(0, -1)) return "";
  }
  return null;
}

function htmlPathForRoute(route) {
  if (!route) return path.join(BUILD_DIR, "index.html");
  return path.join(BUILD_DIR, `${route}.html`);
}

function pageExists(route) {
  if (!route) return fs.existsSync(path.join(BUILD_DIR, "index.html"));
  return (
    fs.existsSync(path.join(BUILD_DIR, `${route}.html`)) ||
    fs.existsSync(path.join(BUILD_DIR, route, "index.html")) ||
    fs.existsSync(path.join(BUILD_DIR, route))
  );
}

function readRoute(route) {
  const candidates = [
    htmlPathForRoute(route),
    path.join(BUILD_DIR, route, "index.html"),
    path.join(BUILD_DIR, route),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return fs.readFileSync(candidate, "utf8");
    }
  }
  return "";
}

function attrValue(tag, attr) {
  const match = tag.match(new RegExp(`\\b${attr}=["']([^"']*)["']`, "i"));
  return match ? match[1] : "";
}

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return stripTags(match ? match[1] : "");
}

function extractDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
  return stripTags(match ? match[1] : "");
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["'][^>]*>/i);
  return match ? match[1] : "";
}

function extractH1s(html) {
  return [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
}

function extractArticleText(html) {
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  return stripTags(article ? article[1] : html);
}

function extractIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\bid=["']([^"']+)["']/gi)) {
    ids.add(match[1]);
  }
  return ids;
}

function parseInternalHref(href, currentRoute) {
  if (!href || href.startsWith("#")) {
    return { route: currentRoute, hash: href ? href.slice(1) : "" };
  }
  if (/^(mailto:|tel:|javascript:|data:|#)/i.test(href) || href.startsWith("//")) {
    return null;
  }
  const legacySuffix = legacySiteUrlSuffix(href);
  if (legacySuffix !== null) {
    const [targetPath, hash = ""] = legacySuffix.split("#");
    return { route: targetPath.replace(/\/$/, ""), hash };
  }
  if (/^https?:\/\//i.test(href)) {
    if (!href.startsWith(SITE_URL)) return null;
    const suffix = href.slice(SITE_URL.length);
    const [targetPath, hash = ""] = suffix.split("#");
    return { route: targetPath.replace(/\/$/, ""), hash };
  }
  if (href.startsWith(BASE_PATH)) {
    const suffix = href.slice(BASE_PATH.length).replace(/^\//, "");
    const [targetPath, hash = ""] = suffix.split("#");
    return { route: targetPath.replace(/\/$/, ""), hash };
  }
  if (BASE_PATH !== LEGACY_BASE_PATH && startsWithBasePath(href, LEGACY_BASE_PATH)) {
    const suffix = href.slice(LEGACY_BASE_PATH.length).replace(/^\//, "");
    const [targetPath, hash = ""] = suffix.split("#");
    return { route: targetPath.replace(/\/$/, ""), hash };
  }
  if (href.startsWith("/")) {
    return null;
  }

  const [targetPath, hash = ""] = href.split("#");
  if (isAssetPath(targetPath)) return null;
  const base = currentRoute ? path.posix.dirname(currentRoute) : "";
  const route = path.posix.normalize(path.posix.join(base, targetPath)).replace(/^\.\//, "");
  return { route: route === "." ? "" : route.replace(/\/$/, ""), hash };
}

function decodeAnchor(hash) {
  try {
    return decodeURIComponent(hash);
  } catch (_error) {
    return hash;
  }
}

function auditMetadata(route, html, seenTitles, seenDescriptions) {
  const is404 = route === "404";
  if (is404) return;

  const title = extractTitle(html);
  const description = extractDescription(html);
  const canonical = extractCanonical(html);
  const h1s = extractH1s(html);
  const words = extractArticleText(html).split(/\s+/).filter(Boolean).length;

  if (!title) errors.push(`${route || "/"}: missing <title>`);
  if (title.length > 80) errors.push(`${route || "/"}: title is too long (${title.length} chars): ${title}`);
  if (!title.includes("Orkes")) errors.push(`${route || "/"}: title does not include Orkes brand context: ${title}`);

  if (!description) {
    errors.push(`${route || "/"}: missing meta description`);
  } else {
    if (description.length < 70) errors.push(`${route || "/"}: meta description is too short (${description.length} chars)`);
    if (description.length > 170) errors.push(`${route || "/"}: meta description is too long (${description.length} chars)`);
    if (!/(Orkes|Conductor|workflow|API|SDK|task|integration|agent)/i.test(description)) {
      errors.push(`${route || "/"}: meta description lacks product/query context`);
    }
  }

  if (h1s.length !== 1) errors.push(`${route || "/"}: expected exactly one H1, found ${h1s.length}`);

  if (!canonical) {
    errors.push(`${route || "/"}: missing canonical link`);
  } else if (!canonical.startsWith(SITE_URL)) {
    errors.push(`${route || "/"}: canonical must start with ${SITE_URL}: ${canonical}`);
  } else if (canonical.endsWith(".html")) {
    errors.push(`${route || "/"}: canonical includes .html: ${canonical}`);
  }

  if (seenTitles.has(title)) {
    errors.push(`${route || "/"}: duplicate title also used by ${seenTitles.get(title)}: ${title}`);
  } else {
    seenTitles.set(title, route || "/");
  }
  if (seenDescriptions.has(description)) {
    errors.push(`${route || "/"}: duplicate meta description also used by ${seenDescriptions.get(description)}`);
  } else {
    seenDescriptions.set(description, route || "/");
  }

  if (words < 80) warnings.push(`${route || "/"}: thin rendered article body (${words} words)`);
}

function auditLinks(route, html) {
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (!href || href.startsWith("#")) {
      const hash = href ? href.slice(1) : "";
      if (hash && !extractIds(html).has(decodeAnchor(hash))) {
        errors.push(`${route || "/"}: broken same-page anchor ${href}`);
      }
      continue;
    }
    if (isAssetPath(href)) continue;
    if (href.includes(".html") && isInternalHrefString(href)) {
      errors.push(`${route || "/"}: internal link includes .html: ${href}`);
    }
    if (isInternalHrefString(href) && (href.includes("/_routes/") || href.includes(`${BASE_PATH}/_routes`))) {
      errors.push(`${route || "/"}: internal link exposes _routes: ${href}`);
    }

    const target = parseInternalHref(href, route);
    if (!target) continue;
    if (isAssetPath(target.route)) continue;

    if (!pageExists(target.route)) {
      errors.push(`${route || "/"}: broken internal link ${href}`);
      continue;
    }

    if (target.hash) {
      const targetHtml = target.route === route ? html : readRoute(target.route);
      const ids = extractIds(targetHtml);
      const anchor = decodeAnchor(target.hash);
      if (!ids.has(anchor)) {
        errors.push(`${route || "/"}: broken internal anchor ${href}`);
      }
    }
  }
}

function auditImages(route, html) {
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  for (const image of images) {
    const src = attrValue(image, "src");
    const alt = attrValue(image, "alt").trim();
    if (!alt) errors.push(`${route || "/"}: image missing alt text: ${src || image}`);
    if (/^(image|screenshot|diagram)$/i.test(alt)) {
      errors.push(`${route || "/"}: image has generic alt text: ${src}`);
    }
  }
}

function auditJsonLd(route, html) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const script of scripts) {
    const json = script[1].trim();
    if (!json) continue;
    try {
      JSON.parse(json);
    } catch (error) {
      errors.push(`${route || "/"}: invalid JSON-LD: ${error.message}`);
    }
  }
}

function auditGeneratedFiles() {
  const required = ["robots.txt", "sitemap.xml", "llms.txt"];
  for (const file of required) {
    if (!fs.existsSync(path.join(BUILD_DIR, file))) errors.push(`missing ${file}`);
  }

  const robotsPath = path.join(BUILD_DIR, "robots.txt");
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, "utf8");
    if (!robots.includes(`Sitemap: ${SITE_URL}sitemap.xml`)) {
      errors.push("robots.txt missing content sitemap");
    }
    if (!robots.includes(`LLMs: ${SITE_URL}llms.txt`)) {
      errors.push("robots.txt missing llms.txt discovery hint");
    }
  }

  const llmsPath = path.join(BUILD_DIR, "llms.txt");
  if (fs.existsSync(llmsPath)) {
    const llms = fs.readFileSync(llmsPath, "utf8");
    if (!llms.includes("Product: Orkes Conductor")) errors.push("llms.txt missing product identity");
    if (!llms.includes("agentic workflow engine")) errors.push("llms.txt missing agentic workflow positioning");
    if (!llms.includes("## Documentation Index")) errors.push("llms.txt missing documentation index");
  }
}

function auditMimeSafeHtmlFiles() {
  const files = listFiles(BUILD_DIR);
  for (const file of files) {
    if (path.extname(file)) continue;
    const rel = posixPath(path.relative(BUILD_DIR, file));
    const head = fs.readFileSync(file, "utf8").slice(0, 256).toLowerCase();
    if (head.includes("<!doctype html") || head.includes("<html")) {
      errors.push(`${rel}: extensionless HTML file may be served as application/octet-stream by GitHub Pages`);
    }
  }
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error("Build directory does not exist. Run npm run build first.");
    process.exit(1);
  }

  const htmlFiles = listFiles(BUILD_DIR, (file) => file.endsWith(".html"));
  const seenTitles = new Map();
  const seenDescriptions = new Map();

  for (const file of htmlFiles) {
    const route = routeForHtml(file);
    const html = fs.readFileSync(file, "utf8");
    auditMetadata(route, html, seenTitles, seenDescriptions);
    auditLinks(route, html);
    auditImages(route, html);
    auditJsonLd(route, html);
  }

  auditGeneratedFiles();
  auditMimeSafeHtmlFiles();

  if (warnings.length) {
    console.warn(`Docs audit warnings (${warnings.length}):`);
    for (const warning of warnings.slice(0, 50)) console.warn(`- ${warning}`);
    if (warnings.length > 50) console.warn(`- ... ${warnings.length - 50} more warnings`);
  }

  if (errors.length) {
    console.error(`Docs audit failed (${errors.length} errors):`);
    for (const error of errors.slice(0, 120)) console.error(`- ${error}`);
    if (errors.length > 120) console.error(`- ... ${errors.length - 120} more errors`);
    process.exit(1);
  }

  console.log(`Docs audit passed: ${htmlFiles.length} HTML pages checked.`);
}

main();
