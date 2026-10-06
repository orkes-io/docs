const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BUILD_COMMAND = "npm run generate && mkdocs build && node scripts/postprocess-mkdocs-build.js";
const WATCH_TARGETS = ["docs", "sidebars.js", "shared-docs-map.json"];
const DEBOUNCE_MS = 400;

let building = false;
let rebuildQueued = false;
let debounceTimer = null;

function runBuild(onDone) {
  if (building) {
    rebuildQueued = true;
    return;
  }
  building = true;
  const start = Date.now();
  console.log("\n[watch] Rebuilding...");
  const proc = spawn("sh", ["-c", BUILD_COMMAND], { cwd: ROOT, stdio: "inherit" });
  proc.on("exit", (code) => {
    building = false;
    const seconds = ((Date.now() - start) / 1000).toFixed(1);
    if (code === 0) {
      console.log(`[watch] Rebuild done in ${seconds}s — refresh your browser\n`);
    } else {
      console.error(`[watch] Rebuild failed after ${seconds}s (exit ${code}) — fix the error and save again\n`);
    }
    if (onDone) onDone();
    if (rebuildQueued) {
      rebuildQueued = false;
      runBuild();
    }
  });
}

function scheduleRebuild(reason) {
  console.log(`[watch] Change detected: ${reason}`);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => runBuild(), DEBOUNCE_MS);
}

function watchTargets() {
  for (const target of WATCH_TARGETS) {
    const fullPath = path.join(ROOT, target);
    if (!fs.existsSync(fullPath)) continue;
    try {
      fs.watch(fullPath, { recursive: true }, (_eventType, filename) => {
        if (!filename) return scheduleRebuild(target);
        scheduleRebuild(path.join(target, filename));
      });
      console.log(`[watch] Watching ${target}`);
    } catch (error) {
      console.warn(`[watch] Could not watch ${target}: ${error.message}`);
    }
  }
}

console.log("[watch] Running initial build (this can take ~15-30s)...");
execSync(BUILD_COMMAND, { cwd: ROOT, stdio: "inherit" });
console.log("[watch] Initial build done.\n");

watchTargets();
require("./serve-build.js");

console.log("[watch] Edit any file under docs/, sidebars.js, or shared-docs-map.json and save — it will rebuild automatically. Ctrl+C to stop.");
