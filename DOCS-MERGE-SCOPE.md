# Docs merge — scope decisions (working log)

Branch: `refactor/docs-oss-enterprise-merge`

**Model:** `orkes.io/content` = full OSS docs (from `conductor-oss/conductor`, `agent_docs`/`main`) merged at build time with enterprise-only content in `orkes-io/docs`. OSS stays the source of truth for anything it covers; `orkes-io/docs` holds only what OSS doesn't.

### Global rules (apply to every drop)

1. **No orphan drops.** A page is dropped from orkes-docs ONLY if it has a verified OSS counterpart. No counterpart → it stays (keep), regardless of section.
2. **No dead URLs.** Every current `orkes.io/content/...` URL that moves must redirect to its new location (OSS counterpart or the kept-in-orkes path). Nothing 404s.

⇒ Every "drop" is really `drop → {OSS counterpart} → {redirect}`. A drop→counterpart→redirect mapping must exist before any page is removed.

Status legend: 🔒 locked · 🅿️ parked · ⬜ pending

---

## API reference 🔒

Orkes has ~200 per-endpoint pages; OSS (`documentation/api/`) has ~11 section overviews.

- **Keep in orkes-docs — 14 areas (~146 endpoints)** (no OSS equivalent):
  human-tasks (22), integrations (18), applications (15), remote-services (15), prompts (12), tags (11), groups (10), secrets (10), environment-variables (7), webhooks (7), users (6), schema (6), authorization (5), tokens (2).
- **OSS as source of truth — 4 shared areas** (drop Orkes's ~53 detailed endpoint pages, use OSS overviews):
  metadata, workflow (+ startworkflow), task, scheduler/schedule.
- **Pull from OSS — 3 areas Orkes lacks:** agents, bulk, files.

Net Orkes API reference: **200 → ~146 pages**.

---

## RBAC 🔒 (team-confirmed)

Keep in orkes-docs: `access-control-and-security/` — RBAC model, RBAC-management CLI/API refs (skip CLI if none), RBAC landing page + explainer **video** (Conductor RBAC, Agent & API security). *(cc content team)*

## Integrations 🔒 (team-confirmed)

Keep in orkes-docs: reworked `integrations/` (current guide is UI-only) — add category listing pages (Message broker, AI/LLMs, Database, Connected Apps), an "how integrations work" **video**, and a connected-apps **video**.

---

## Operators & system tasks 🔒

Keep Orkes-specific only; OSS owns the shared set.

**Operators**
- OSS as source (drop Orkes copies) — 10 shared: do-while, dynamic, dynamic-fork, fork-join, join, set-variable, start-workflow, sub-workflow, switch, terminate.
- Keep in orkes-docs — 3 Orkes-only: get-workflow, terminate-workflow, yield.
- OSS adds: exclusive-join.

**System tasks**
- OSS as source (drop Orkes copies) — 7 shared: event, http, inline, jdbc, jq-transform, human, wait.
- Keep in orkes-docs — 10 Orkes-only: business-rule, get-signed-jwt, grpc, http-poll, opsgenie, query-processor, sendgrid, update-secret, update-task, wait-for-webhook.
- OSS adds: kafka-publish, noop, pull-workflow-messages, ai-tasks (ai-tasks ties to the parked AI reference).

---

## Developer guides 🔒 (drops subject to the global rules)

**Keep in orkes-docs — Orkes-only (9):** api-gateway, mcp-gateway, remote-services, build-workflows-using-conductor-ui, running-workflows-in-ui, masking-parameters, enabling-cdc-on-conductor-workflows, convert-bpmn-to-workflows, using-ai-prompts.

**Keep — core features OSS hasn't documented (4):** secrets-in-conductor, idempotency, using-environment-variables, caching-task-outputs. *(Drop later if OSS adds a page.)*

**OSS as source (drop) — all counterparts verified in `agent_docs` ✅ (drop → counterpart):**
debugging-workflows→debugging-workflows, scaling-workers→scaling-workers, scheduling-workflows→scheduling-workflows, schema-validation→schema-validation, versioning-workflows→versioning-workflows, workflow-versioning→versioning-workflows, workflow-version-behavior-on-execution→versioning-workflows, conductor-skills→conductor-skills, workflows→workflows, tasks-in-workflows→tasks, using-workers→workers, error-handling→handling-errors, integration-with-cicd→cicd-integration, task-to-domain→taskdomains, unit-and-regression-tests→testing-workflows, passing-inputs-to-task-in-conductor→task-inputs, task-input-templates→task-inputs, write-workflows-using-code→creating-workflows, running-workflows→starting-workflows, sending-signals-to-workflows→sending-signals, orchestrating-human-tasks→human-task, ai-orchestration→ai/llm-orchestration, using-llms-…→ai/llm-orchestration, webhook-integration→incoming-webhooks, metrics-and-observability→documentation/metrics, using-vector-databases-…→ai-tasks, rate-limits→taskdef#task-rate-limits, overview→devguide (landing).

No orphan drops — every dropped guide has a confirmed OSS page. Redirects to be generated from the pairs above (`overview` → OSS devguide landing specifically, not a bare `index`).

---

## Tutorials 🔒

**Keep all 28 in orkes-docs.** None have an OSS counterpart (OSS has no tutorials section; its `labs`/cookbook recipes are different content). So nothing is dropped, URLs unchanged, no redirects needed. These are Orkes product/integration walkthroughs (Stripe, GitHub, Teams, SendGrid, PagerDuty, finance, fraud, document apps, webhooks, etc.).

---

## AI task reference 🔒

**Drop all 13 Orkes pages → OSS `documentation/configuration/workflowdef/systemtasks/ai-tasks`.**
Orkes has 13 per-task pages (`reference-docs/ai-tasks/`: chunk-text, list-files, llm-chat-complete, llm-generate-embeddings, llm-get-document, llm-get-embeddings, llm-index-document, llm-index-text, llm-search-index, llm-store-embeddings, llm-text-complete, parse-document, index); OSS has **one combined** `ai-tasks` page. So all 13 URLs redirect to that single OSS page (**13 → 1**, per-task detail collapses — accepted).

## Foundational sections 🔒 (counterparts verified in `agent_docs` ✅)

**Drop → OSS (verified):**
- `sdks/` (6): csharp→csharp-sdk, golang→go-sdk, java→java-sdk, javascript→js-sdk, python→python-sdk, sdk-index→clientsdks
- `quickstart/` (7): concepts→conductor, durable-execution, json-code-native→json-native, task-lifecycle→tasklifecycle, tasks, workers, workflows
- `conceptual-guides/` (3): architecture→devguide/architecture, directed-acyclic-graph, workflow-and-task-status→workflow-status-events
- `cookbook/` (7): dynamic-parallelism, dynamic-workflows, event-driven, microservice-orchestration, task-timeouts-and-retries, wait-and-timers, workflow-scheduling
- `ai-cookbook/` (10) → OSS `devguide/ai/*` (+ ai-llm-recipes→cookbook/ai-llm)
- `event-driven-orchestration/` (3): publish-events, receive-events→consume-route-events, index→event-driven
- `faqs/general-faqs` → faq
- `core-concepts` → concepts/conductor

**Keep (Orkes-only, no true counterpart):**
- `sdks/authentication` (Orkes JWT/access keys — OSS is open by default)
- `getting-started/` (5 — Orkes Cloud onboarding; OSS quickstart is local/code-first, different content)
- `what-is-orkes-conductor`, `agentic-workflow-engine`, `get-orkes-conductor`, `glossary` (Orkes landing/marketing)

## Verification status

- API shared-4, Operators-10, System-tasks-7 drops → **counterparts verified in `agent_docs` ✅**
- Developer-guides drops (27) → verified ✅
- Foundational drops → verified ✅
- ⇒ **No orphan drops remain.** Every dropped page has a confirmed OSS counterpart.

## Redirects 🔒 (generated)

Full table in **`DOCS-REDIRECTS.md`**, split per the revised strategy: **62 served at the same Orkes URL** (via `shared-docs-map.json` `pages`, no redirect, URL preserved) + **83 many:1 redirects** (API/AI-tasks/dupes). Internal to `orkes.io/content`. `shared-docs-map.json` stays — its aliases handle OSS-internal link rewriting.

**Targets to eyeball (approximate mappings):**
- `conceptual-guides/architecture` → currently points at `devguide/architecture/directed-acyclic-graph`; pick the right OSS architecture page.
- `event-driven-orchestration` (index) → `devguide/cookbook/event-driven` (confirm landing).
- `developer-guides/overview` → not yet mapped (decide target or keep).

## Implementation progress

- **Strategy (revised, cleaner):** for **1:1** counterparts, serve the OSS page **at the existing Orkes URL** via `shared-docs-map.json` `pages` (delete the local Orkes page + add the mapping) — no URL change, no redirect, reuses the proven mechanism (no full-tree rewrite). **many:1** cases (API 53→4, AI-tasks 13→1, and dev-guide dupes sharing one OSS target) → redirect.
- **Stage 1 ✅** `shared-docs.lock.yml` → `agent_docs` + full tree; baseline build green (456 pages) pointed at `OSS_DOCS_DIR=~/Desktop/conductor-oss/conductor`.
- **Build fix ✅** `page_path` now defined at top of `extrahead` in the generate script (was a brittle anchor that `agent_docs`'s `main.html` broke).
- **Pilot ✅** operators (10) + human/wait + system-tasks (5) = 17 pages: local deleted, mapped to OSS, **full `mkdocs build` passes**. OSS content serves at the Orkes URLs.

### Implementation COMPLETE ✅ (full build green)

- **1:1 (66):** OSS served at existing Orkes URLs via `shared-docs-map.json` `pages`; local Orkes pages deleted. URLs preserved.
- **many:1 (86 sources → 13 canonicals):** OSS served at a canonical Orkes URL; **73 redirects** (`docs-redirects.json`) via the `mkdocs-redirects` plugin (added to `requirements.txt`, wired in the generate script). Redirect stubs verified.
- **Build fixes:** `page_path` moved to top of `extrahead` (agent_docs `main.html` broke the old anchor); `shared-docs.lock.yml` → `agent_docs` + full tree.
- **Nav:** deleted routes repointed to canonicals in `sidebars.js` + generate script; collapsed dupes deduped → **0 "missing doc" warnings**.
- **Final tallies:** enterprise pages 448→**303**; OSS served **79**; redirects **73**; full `npm run build` green (needs `OSS_DOCS_DIR=<agent_docs checkout>` and `.venv` on PATH).

### Full-tree merge ✅ (all OSS pages surfaced)

- `collectSourceEntries()` extended to serve **every** OSS page at its native `/content/…` route (skipping the site-root index + routes colliding with mapped/local). **209 OSS pages now served** (was 78); full build green (634 HTML).
- **OSS-nav reuse: REVERTED** (per review — it created duplicate sidebar sections). `oss-nav.json` removed and the `buildNav()` injection backed out. Result: OSS pages are all **served and URL-accessible**, but the OSS-only pages are **not in the sidebar** (the sidebar stays the Orkes `sidebars.js` structure). Nav/IA for the merged OSS content is an open decision (revisit separately).

### Known follow-ups (minor / additive)
- **Cosmetic sidebar dupes:** a few collapsed canonicals (e.g. `reference-docs/api/task`) still appear 2–6× in the generated nav (the generate script auto-composes some nav beyond `sidebars.js`). Not broken (0 warnings); polish later.
- **OSS-only pages NOT surfaced:** this selective approach merges the *overlap*. Brand-new OSS pages Orkes never had (e.g. `design/`, new agent recipes) aren't pulled — add to the map or do a scoped full-tree pull if "merge everything" requires them.

### (superseded) Remaining scale-out
- 1:1 (serve at Orkes URL): dev-guides uniques, quickstart, cookbook, ai-cookbook, conceptual-guides, faqs, core-concepts, event-driven, (sdks already mapped — verify no local collision).
- many:1 → redirects: API 53→4 overviews, AI-tasks 13→1, dev-guide dupes (workflow-versioning/-behavior, task-input-templates, using-llms, orchestrating-human-tasks, using-vector-databases, rate-limits).
- Wire redirects (MkDocs `redirects` plugin), update nav/sidebar, full build + link-check.

## Pending
- ⬜ Build the **drop → OSS counterpart → redirect** mapping for every locked drop (API shared-4/53, operators-10, system-tasks-7, dev-guides ~24)
- ⬜ URL strategy: MkDocs `redirects` plugin vs CloudFront rules
