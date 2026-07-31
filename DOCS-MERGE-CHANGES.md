# Docs OSS + Enterprise Merge — What Changed & Why

_Branch: `refactor/docs-oss-enterprise-merge` · target: `orkes.io/content/` (non‑prod S3/CloudFront)_

This document explains the changes in this commit so the team can review and
maintain them. It is a companion to the two planning docs already in the repo:

- **[`DOCS-MERGE-SCOPE.md`](./DOCS-MERGE-SCOPE.md)** — the decision log (what's kept/dropped, 1:1 vs many:1).
- **[`DOCS-REDIRECTS.md`](./DOCS-REDIRECTS.md)** — the old‑URL → new‑URL mapping table.

---

## TL;DR

We merge the **open‑source Conductor docs** (`conductor-oss/conductor`, branch
`agent_docs`) with the **enterprise‑only Orkes docs** in this repo into one site
served at `orkes.io/content/`. The merge happens **at build time** — nothing is
physically copied into the repo. OSS is the source of truth for anything it
covers; the Orkes repo keeps only what OSS doesn't.

Highlights of this commit:

1. **Content merge** — dropped Orkes pages that have a 1:1 OSS counterpart and
   serve the OSS page **at the same Orkes URL**; pulled the full OSS tree so
   OSS‑only pages are available.
2. **Navigation** — new top‑level menus (**AI Cookbook, Deploy, Contribute**),
   OSS‑only pages added to existing sections, and a **duplicate‑menu fix**.
3. **No dead URLs** — added redirects for every previously‑published URL the
   earlier plan missed. A full audit of the live sitemap shows **0 hard 404s**.
4. **Build‑pipeline fixes** — several OSS build‑time behaviors that we were
   silently dropping (SDK intros, snippet includes, mermaid styling, shared
   images) now work.

---

## 1. The merge model (how it works)

`scripts/generate-mkdocs-site.js` generates a MkDocs site from three inputs:

- **Local Orkes content** under `docs/` (enterprise‑only pages).
- **OSS content** fetched into `.cache/conductor-oss` per `shared-docs.lock.yml`
  (repo + `ref: agent_docs`).
- **`shared-docs-map.json`** — the glue:
  - `pages`: an OSS source file → the Orkes **route** it is served at (used to
    serve an OSS page at an existing Orkes URL, no redirect).
  - `aliases`: OSS path → Orkes route, used to rewrite OSS‑internal links.

Output (`mkdocs_content/`, `mkdocs.yml`, `main.py`, `mkdocs_overrides/`, then
`build/`) is **generated on every `npm run build`** and is not meaningful to
hand‑edit.

### Drop → counterpart → (serve or redirect)

Per the strategy in `DOCS-MERGE-SCOPE.md`:

- **1:1** (one Orkes page ↔ one OSS page): delete the local Orkes page and add a
  `shared-docs-map.json` `pages` entry so the OSS page is **served at the same
  Orkes URL** — URL preserved, no redirect.
- **many:1** (several Orkes pages → one OSS page, e.g. the ~200 detailed API
  endpoint pages → OSS's high‑level API pages): serve one canonical page and
  **redirect** the rest (`docs-redirects.json` → `mkdocs-redirects` plugin).

This commit deletes **146 `docs/` pages** under that rule.

---

## 2. Navigation changes (`sidebars.js`)

New top‑level menus mirroring OSS structure and labels:

| Menu | Contents |
|---|---|
| **AI Cookbook** | 20 OSS recipe pages (Overview + Agentic Workflows + AI Agents) |
| **Deploy** | OSS self‑managed deployment + advanced config (Docker, From Source, Hosted, Best Practices, CI/CD, Configuration, Metrics, Advanced) |
| **Contribute** | conductor‑oss project docs (Overview, Repositories, Contribution Guide, Best Practices, Code of Conduct, Get Help) |

OSS‑only pages also added into existing sections:

- **AI Agents** — Agent Concepts, Conductor Agents, Multi‑Agent Architecture,
  Deploying Agents, Agent Configuration, Scheduling Agents, Framework Agent
  Bridges, A2A Integration, + a **Govern** subgroup (Guardrails, Evals).
- **Reference** — Exclusive Join (operator); Kafka Publish / No‑op / Pull
  Workflow Messages (system tasks); Conductor Agents / Bulk / Files API; and a
  **Workflow Definition** group (Workflow Definition, Schemas).
- **Cookbook** — Saga & Compensation, Polling a Long‑Running Job.
- **Developer Guides** — Searching Workflows.
- **Event Orchestration** — an **Overview** (OSS event‑bus) as the first item.
- **Quickstart** — Framework Agent Quickstarts, Conductor for AI Assistants, and
  the OSS Get Started flow (Core Concepts, Connect, Write Your First Worker,
  Conductor Architecture).

### Duplicate‑menu fix

Some pages appeared 2–3× in the sidebar (partly from repointing dropped routes
to shared canonicals, partly pre‑existing). `navFromItems()` now does a
**first‑occurrence‑wins dedupe** across the whole nav, and drops a category that
becomes empty after dedupe. Result: duplicate sidebar items **28 → 0**.

### "Run your first workflow" at the Orkes URL

The OSS `quickstart/first-workflow.md` is served at the existing Orkes URL
**`/content/quickstarts`** (via `shared-docs-map.json` `pages`, docId
`getting-started/quickstart-index`). The old OSS native route redirects, and its
inbound links (incl. the SDK intro) are rewritten to `/quickstarts`.

---

## 3. No dead URLs — the redirect fix (most important)

**The problem:** the live site published Docusaurus **`slug`** URLs (e.g.
`quickstart/concepts.mdx` had `slug: /quickstarts/concepts`), but the earlier
redirect plan keyed redirects on **file‑path routes**. So ~35 real published
URLs had neither a page nor a redirect → **hard 404s** (e.g. `/content/error-handling`,
`/content/quickstarts/workflows`, `/content/ai-agents/*`).

**The fix:** added **35 redirects** to `docs-redirects.json` mapping each dead
published slug URL → the live page/landing where its content now lives (all
targets verified to be real docs so `mkdocs-redirects` generates every stub).

**Verification:** audited **every URL in the production sitemap** (502 URLs) and
**all 448 tracked source pages'** published URLs against a fresh build:

- **0 hard 404s.** Every URL resolves as a real page or a redirect.

> Note on the redirect mechanism: stubs redirect via JS (`location.href`) +
> `<link rel="canonical">` (both correct/absolute). The `<meta http-equiv="refresh">`
> **fallback is currently malformed** across all stubs (a post‑process bug) — it
> only matters for no‑JS clients/crawlers. See Follow‑ups.

---

## 4. Build‑pipeline fixes (`scripts/generate-mkdocs-site.js`, `package.json`, `requirements.txt`)

These were OSS build‑time transforms/assets we were dropping, causing content to
render wrong or empty:

| Fix | Symptom it resolved |
|---|---|
| Adopt OSS **mkdocs‑macros plugin** (vendor `main.py`, add `- macros`) | SDK pages missing the "Start here"/"Featured examples" intro + summary cards |
| Pass through `sdk_page` / `source_repo` / `redirect_to` front matter in `buildFrontMatter` | plugin couldn't see the keys it acts on |
| Adapt `sdk_intro` links for our 1‑level `sdks/` route + `/quickstarts` remap | broken quickstart links in SDK intros |
| **`pymdownx.snippets` `base_path`** → OSS root | `--8<--` JSON includes rendered as empty code blocks (26 pages) |
| **mermaid custom fence** → `main.mermaid_fence` + `PYTHONPATH=$PWD` for `mkdocs build` | diagrams rendered without OSS hand‑drawn styling / `.workflow-diagram` card (37 pages) |
| **Mirror OSS non‑markdown assets** into `docs_dir` (`mirrorOssAssets`) | cross‑directory images broke (framework logos, `architecture/conductor-architecture.png`, etc.) |
| **Skip the OSS site‑root `index.md`** in the full‑tree merge | OSS home clobbered the generated Orkes home |

`requirements.txt` already carries `mkdocs-macros-plugin` and `mkdocs-redirects`.
`package.json` build/serve/start now run `PYTHONPATH=$PWD mkdocs build` so the
macros/superfences config can `import main`.

---

## 5. Deploy (`.github/workflows/deploy-docs-s3.yml`)

The **non‑prod** S3/CloudFront deploy workflow's push trigger is pointed at this
branch:

```yaml
on:
  push:
    branches: [refactor/docs-oss-enterprise-merge]
  workflow_dispatch:
```

- Uses the **same** `marketing-non-prod` GitHub Environment (bucket, CloudFront,
  IAM role) as `docs_site_revamp` — it's environment‑scoped, not branch‑scoped.
- It's the **same target** (`s3://$DOCS_BUCKET/content/`, `--delete`), so this
  branch's deploy **overwrites** whatever was last published there. Non‑prod
  only — it does **not** touch orkes.io production.
- ⚠️ If this branch is later merged into `docs_site_revamp`/`main`, revert this
  trigger so those branches deploy correctly.

---

## 6. How to build & verify locally

```bash
nvm use 22
export OSS_DOCS_DIR=/path/to/conductor            # an agent_docs checkout
export PATH="$PWD/.venv/bin:$PATH"                # mkdocs on PATH
npm run fetch:oss-docs                             # or set OSS_DOCS_DIR
npm run build                                      # generate -> mkdocs build -> postprocess
```

Serve `build/` under a `/content/` prefix to match production paths (internal
links assume `/content/`).

CI (`deploy-docs-s3.yml`) does the same: `fetch:oss-docs` → `npm run build` →
`aws s3 sync build/`. **CI regenerates all build output from source**, so it does
not depend on committed generated files.

---

## 7. Known issues / follow‑ups

- **Redirect `<meta refresh>` fallback is malformed** (`content="/content/…/0; url=…"`)
  across all stubs. Redirects still work via JS + canonical; fix the post‑process
  so no‑JS clients/crawlers also redirect.
- **Doc drift:** `DOCS-REDIRECTS.md` documents schedule endpoints → OSS
  `documentation/api/scheduler`, while `docs-redirects.json` sends them → the
  Orkes `reference-docs/api/schedule` landing. Both resolve; reconcile the docs.
- **Canonical vs. slug:** the 35 slug fixes are **redirects** (old slug →
  current file‑path canonical), which satisfies "no 404" but does not make the
  original slug the canonical URL. If SEO wants the original slugs preserved as
  canonical for the 1:1 pages, that's a larger route‑repoint.
- **Generated build output** (`mkdocs_content/`, `mkdocs.yml`, `main.py`,
  `mkdocs_overrides/`) is currently **tracked** in the repo and churns on every
  build. Since CI regenerates it, consider git‑ignoring + de‑tracking it in a
  follow‑up so diffs stay source‑only.
- **`www.conductor-oss.org` Webflow → GitHub** move is a separate infra track,
  not part of this repo.

---

## 8. Files changed in this commit (source only)

- `sidebars.js` — new menus + section additions + nav dedupe + Quickstart edits
- `scripts/generate-mkdocs-site.js` — macros plugin, snippets base_path, mermaid
  fence, asset mirror, full‑tree + index skip, frontmatter passthrough, redirect
  wiring, first‑workflow remap
- `shared-docs-map.json` — OSS→Orkes `pages` + `aliases` (incl. first‑workflow)
- `shared-docs.lock.yml` — OSS source = `agent_docs`, full tree
- `docs-redirects.json` — old‑URL → new‑URL redirects (incl. the 35 slug fixes)
- `package.json` — `PYTHONPATH` for `mkdocs build`
- `.github/workflows/deploy-docs-s3.yml` — deploy trigger → this branch
- `docs/**` — 146 dropped Orkes pages (served/redirected via the mappings above)
- `DOCS-MERGE-SCOPE.md`, `DOCS-REDIRECTS.md`, `docs-content-overlap-review.md`,
  and this file — planning/decision/explainer docs
