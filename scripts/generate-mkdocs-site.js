const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_DOCS = path.join(ROOT, "docs");
const STATIC_DIR = path.join(ROOT, "static");
const OUT_DIR = path.join(ROOT, "mkdocs_content");
const OVERRIDES_DIR = path.join(ROOT, "mkdocs_overrides");
const DEFAULT_LOCAL_OSS_DOCS = "/Users/viren/workspace/github/conductoross/conductor/docs";
const SHARED_DOCS_CACHE = path.join(ROOT, ".cache", "conductor-oss", "docs");
const OSS_DOCS = resolveOssDocsDir();
const SHARED_DOCS_MAP = loadSharedDocsMap();
const LEGACY_BASE_URL = "/content";
const LEGACY_SITE_URLS = ["https://orkes.io/content/", "http://orkes.io/content/"];
const BASE_URL = normalizeBaseUrl(process.env.DOCS_BASE_URL || "/content");
const SITE_URL = normalizeSiteUrl(process.env.DOCS_SITE_URL || "https://orkes.io/content/");
const SITE_DESCRIPTION =
  "Orkes Conductor is the managed enterprise platform for Conductor OSS, a durable workflow engine for production AI agents and distributed systems.";
const DOCS_LAST_MODIFIED = process.env.DOCS_LAST_MODIFIED || "2026-05-14";
const DEVELOPER_EDITION_URL =
  "https://developer.orkescloud.com/?ga_id=GA1.1.114307086.1749276711&amp;utm_source=google&amp;utm_medium=organic&amp;_gl=1*mi3s3s*_gcl_au*MTU0NDU1MTQuMTc3ODM5MTkyMw..";
const AGENTSPAN_RELATIONSHIP_COPY =
  "Agentspan is the developer-facing agent runtime. Conductor OSS is the durable workflow engine underneath. Orkes Conductor is the managed enterprise platform for operating Conductor-based systems at scale.";

const ORKES_COLOR_REPLACEMENTS = [
  [/Zinc \+ Orange Theme/g, "Zinc + Orkes Purple Theme"],
  [/#f97316/gi, "#6c37bd"],
  [/#ea580c/gi, "#492687"],
  [/#fb923c/gi, "#835edd"],
  [/rgba\(249,\s*115,\s*22,\s*([0-9.]+)\)/gi, "rgba(108, 55, 189, $1)"],
];

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

const ROUTE_METADATA_OVERRIDES = {
  "agentic-workflow-engine": {
    title: "Agentic Workflow Engine",
    description:
      "Use Orkes Conductor as an agentic workflow engine for durable AI agents, reliable tool execution, human approvals, retries, and audit history.",
  },
  "category/tutorials": {
    title: "Cookbook",
    description:
      "Orkes Conductor cookbook with workflow recipes for microservices, dynamic parallelism, retries, timers, scheduling, gateways, and human review.",
  },
  "category/developer-guides": {
    title: "Developer Guides",
    description:
      "Developer guides for building, running, monitoring, and operating Orkes Conductor workflows, workers, AI agents, eventing, gateways, and security.",
  },
  "category/event-driven-orchestration": {
    title: "Event-Driven Orchestration",
    description:
      "Build event-driven workflows with webhooks, event handlers, event publishing tasks, and message broker integrations.",
  },
  "category/access-control-and-security": {
    title: "Role Based Access Control",
    description:
      "Configure role based access control in Orkes Conductor for users, groups, applications, roles, permissions, and tag-based access.",
  },
  "developer-guides/conductor-skills": {
    title: "Build with AI Agents",
    description:
      "Use Conductor Skills to teach AI coding agents to create, run, monitor, debug, and manage Orkes Conductor workflows and workers.",
  },
  "category/integrations": {
    title: "Integration Catalog",
  },
  "reference-docs/api/integrations": {
    title: "Integrations API Reference",
    description:
      "Use the Orkes Conductor Integrations API to manage AI models, vector databases, message brokers, cloud providers, email, Git, and database connections.",
  },
  "developer-guides/mcp-api-gateway": {
    title: "API and MCP Gateway",
  },
  "tutorials/mcp": {
    title: "Gateway Tutorials",
    description:
      "Orkes Conductor tutorials for exposing workflows as HTTP APIs and MCP tools backed by durable workflow execution.",
  },
  "general-templates": {
    title: "Microservice Orchestration",
    description:
      "Cookbook recipes for orchestrating microservices with HTTP service chains, conditional branching, and parallel service calls in Orkes Conductor.",
  },
  "cookbook/dynamic-parallelism": {
    title: "Dynamic Parallelism",
    description:
      "Cookbook recipes for dynamic fork patterns, runtime fan-out, same-task parallelism, and parallel sub-workflows in Orkes Conductor.",
  },
  "cookbook/wait-and-timers": {
    title: "Wait and Timer Patterns",
    description:
      "Cookbook recipes for fixed delays, scheduled waits, external signals, and human approval pauses in Orkes Conductor workflows.",
  },
  "cookbook/task-timeouts-and-retries": {
    title: "Task Timeouts and Retries",
    description:
      "Cookbook recipes for response timeouts, total timeouts, retry policies, exponential backoff, and lease extension in Orkes Conductor.",
  },
  "cookbook/workflow-scheduling": {
    title: "Scheduled Workflows",
    description:
      "Cookbook recipes for cron schedules, catchup windows, bounded execution windows, schedule inputs, and concurrent scheduled workflows.",
  },
  "eventing": {
    title: "Event Publishing Recipes",
    description:
      "Examples for publishing events to Kafka, NATS, RabbitMQ, SQS, and other event sinks from Orkes Conductor workflows.",
  },
  "cookbook/dynamic-workflows": {
    title: "Dynamic Workflows as Code",
    description:
      "Cookbook recipes for code-first workflows, conditional branches, loops, parallel execution, sub-workflows, and runtime-generated definitions.",
  },
  "remote-services": {
    title: "Remote Services Guide",
  },
  "reference-docs/api/remote-services": {
    title: "Remote Services API Reference",
  },
  "reference-docs/api/task": {
    title: "Tasks API Reference",
  },
  "reference-docs/api/workflow": {
    title: "Workflows API Reference",
  },
  "reference-docs/operators/terminate-workflow": {
    title: "Terminate Workflow Operator",
  },
  "reference-docs/operators/human": {
    title: "Human Operator",
  },
  "reference-docs/api/workflow/terminate-workflow": {
    title: "Terminate Workflow API",
  },
  "quickstarts/workflows": {
    title: "Workflow Concepts",
  },
  "quickstarts/tasks": {
    title: "Task Concepts",
  },
  "quickstarts/workers": {
    title: "Worker Concepts",
  },
};

const CATEGORY_PAGE_COPY = {
  "category/getting-started": {
    audience: "Use these pages when you are new to Orkes Conductor or need a reliable path from concepts to a running workflow.",
    outcome:
      "Start with the core model, set up your environment, then move through the quickstarts to write a worker, create a workflow, and monitor an execution.",
  },
  "category/developer-guides": {
    audience:
      "Use these guides when you are designing, operating, or scaling production workflows and agentic applications.",
    outcome:
      "The section follows the main implementation path: build with AI agents, understand why Conductor fits production orchestration, design workflows, configure tasks, expose gateways, govern access, and add human review.",
  },
  "category/conceptual-guides": {
    audience: "Use these pages to understand how Conductor evaluates workflow state, schedules tasks, and coordinates workers.",
    outcome:
      "They are the best foundation before making design decisions about queues, retries, task domains, DAGs, and long-running execution.",
  },
  "category/integrations": {
    audience: "Use this catalog when you need Conductor to connect workflows to models, queues, databases, cloud services, email, or Git.",
    outcome:
      "Choose an integration by system type, configure credentials once, then reuse it from workflows, AI tasks, system tasks, and remote services.",
  },
  "category/integrations/ai-llm": {
    audience: "Use these integrations when workflows need to call LLM providers for chat, completion, extraction, classification, or agents.",
    outcome:
      "Configure model providers such as OpenAI, Anthropic, Bedrock, Vertex AI, Gemini, Mistral, Cohere, Grok, Perplexity, Hugging Face, or Ollama.",
  },
  "category/integrations/vector-databases": {
    audience: "Use these integrations when agentic workflows need embeddings, indexing, retrieval, or RAG over external knowledge.",
    outcome:
      "Connect vector stores such as Pinecone, Postgres pgvector, MongoDB Atlas Vector Search, or Weaviate and call them from AI tasks.",
  },
  "category/integrations/message-broker": {
    audience: "Use these integrations when workflows need event-driven triggers, async messaging, or external queue coordination.",
    outcome:
      "Connect brokers such as Kafka, Confluent, SQS, Azure Service Bus, Pub/Sub, NATS, AMQP, or IBM MQ for reliable event orchestration.",
  },
  "category/integrations/cloud-provider": {
    audience: "Use these pages when workflow tasks need managed cloud credentials, identity, or provider-specific access.",
    outcome:
      "Configure cloud provider connections once and reuse them across workflows and integrations that need authenticated cloud operations.",
  },
  "category/integrations/rdbms": {
    audience: "Use these pages when workflows need to query relational databases or route structured data through database-backed steps.",
    outcome:
      "Set up reusable database connections and combine them with JDBC tasks, schemas, and worker tasks for production data orchestration.",
  },
  "category/integrations/email": {
    audience: "Use these pages when workflows need notification, approval, or lifecycle emails.",
    outcome:
      "Configure email and Git integrations so workflows can send messages, publish status, and connect operational processes to source systems.",
  },
  "category/ref-docs/api": {
    audience: "Use the API reference when you are automating Orkes Conductor from scripts, CI/CD, backend services, or custom tooling.",
    outcome:
      "Each endpoint page should give you the method, path, parameters, request body, response shape, and related workflow or task concepts.",
  },
  "category/reference-docs": {
    audience: "Use the task reference when you need exact behavior for worker tasks, operators, system tasks, and AI task types.",
    outcome:
      "Reference pages explain what each task does, how to configure it, what it returns, and which related primitives to use with it.",
  },
  "category/reference-docs/operators": {
    audience: "Use operators when a workflow needs control flow such as branching, loops, parallelism, waiting, sub-workflows, or termination.",
    outcome:
      "Operators define orchestration structure while workers and system tasks execute the business logic at each step.",
  },
  "category/reference-docs/system-tasks": {
    audience: "Use system tasks when Conductor should execute common operations without requiring a custom worker service.",
    outcome:
      "System tasks cover HTTP calls, transforms, events, waits, JDBC, SendGrid, gRPC, secret updates, and other managed workflow actions.",
  },
  "category/reference-docs/ai-tasks": {
    audience: "Use AI tasks when workflows need model calls, embeddings, indexing, search, document parsing, or MCP tool execution.",
    outcome:
      "AI task pages document provider configuration, model inputs, output fields, and how to build deterministic agentic workflows.",
  },
  "category/reference-docs/alerting-tasks": {
    audience: "Use alerting tasks when workflow failures, checks, or operational events should notify incident-management systems.",
    outcome:
      "Combine alerting tasks with retries, timeouts, rate limits, and compensation workflows for production operations.",
  },
  "category/sdks": {
    audience: "Use SDK pages when you want to define workflows as code, run workers, authenticate clients, or automate workflow operations.",
    outcome:
      "Choose the SDK for your language and start with authentication, workflow registration, task workers, and execution examples.",
  },
  "category/tutorials": {
    audience: "Use tutorials when you want an end-to-end pattern you can adapt, including workflow definitions and operational setup.",
    outcome:
      "Tutorials cover production workflow recipes, gateway-based integrations, human approvals, retries, timers, scheduling, and dynamic workflows.",
  },
  "category/event-driven-orchestration": {
    audience:
      "Use this section when workflows need to react to webhooks, receive events, publish messages, or coordinate with Kafka, RabbitMQ, NATS, SQS, Pub/Sub, and other brokers.",
    outcome:
      "Start with webhooks or event handlers for inbound events, use Event and Kafka Publish tasks for outbound events, and configure message broker integrations before wiring production workflows.",
  },
  "category/event-driven-orchestration/receive-events": {
    audience:
      "Use these pages when external events should start a workflow, resume a waiting workflow, or update execution state.",
    outcome:
      "Choose webhooks for HTTP callbacks, event handlers for broker/internal event sinks, and Wait for Webhook for long-running external callbacks.",
  },
  "category/event-driven-orchestration/publish-events": {
    audience:
      "Use these pages when a workflow should publish a message as part of durable execution.",
    outcome:
      "Use the Event task for configured sinks and the Kafka Publish task for Kafka-specific publishing from a workflow.",
  },
  "category/event-driven-orchestration/webhook-examples": {
    audience:
      "Use these examples when you need a concrete webhook implementation for a custom client or SaaS provider.",
    outcome:
      "Start with custom cURL or Postman examples, then use provider-specific examples for GitHub, Stripe, SendGrid, Microsoft Teams, or Slack.",
  },
  "category/event-driven-orchestration/api-reference": {
    audience:
      "Use these API references when you need to automate event handler or webhook configuration.",
    outcome:
      "Use the Event Handlers API for event handler definitions and the Webhook API for webhook definitions, verification, and tags.",
  },
  "general-templates": {
    audience:
      "Use these recipes when you need common workflow shapes: service orchestration, long-running APIs, branching, loops, dynamic fan-out, scheduling, and workflows as code.",
    outcome:
      "Start with a pattern that matches the execution shape you need, then move into the linked guide or reference page for the exact task and operator details.",
  },
  "tutorials/mcp": {
    audience:
      "Use these tutorials when you want an end-to-end example for exposing a workflow as an HTTP API or as an MCP tool.",
    outcome:
      "Pick the API Gateway tutorial for application-facing HTTP endpoints, or the MCP Gateway tutorial when an AI agent should invoke a governed workflow tool.",
  },
  "webhook-templates": {
    audience:
      "Use these recipes when workflows should start, resume, or deduplicate work from external events, webhooks, or message brokers.",
    outcome:
      "Start with custom webhook setup, then add provider-specific payload handling, idempotency keys, and event handlers as your integration matures.",
  },
  "document-templates": {
    audience:
      "Use these recipes when workflows need to classify, retrieve, approve, or route documents through AI and human review steps.",
    outcome:
      "Start with the document workflow closest to your use case, then adapt the AI model, vector database, approval, and notification steps.",
  },
  "finance-templates": {
    audience:
      "Use these recipes when workflows coordinate financial approvals, fraud disputes, payment checks, or exception handling.",
    outcome:
      "Use the examples as production patterns for combining AI tasks, human review, notifications, and durable failure handling.",
  },
  "category/templates/alerting": {
    audience: "Use these recipes when workflows need to monitor endpoints, detect failures, and trigger operational alerts.",
    outcome:
      "Start with a monitoring or notification workflow, configure the alert provider, then adapt retry and escalation behavior for your production environment.",
  },
  "category/faqs": {
    audience: "Use FAQs for concise answers to common setup, workflow, worker, execution, and troubleshooting questions.",
    outcome:
      "Each answer points to the deeper guide or reference page when you need implementation detail.",
  },
};

const API_RESOURCE_LABELS = {
  applications: "applications",
  "environment-variables": "environment variables",
  groups: "groups",
  "human-tasks": "human tasks",
  integrations: "integrations",
  metadata: "metadata",
  "remote-services": "remote services",
  schedule: "schedules",
  schema: "schemas",
  secrets: "secrets",
  tags: "tags",
  task: "tasks",
  users: "users",
  webhooks: "webhooks",
  workflow: "workflows",
};

const sidebars = require(path.join(ROOT, "sidebars.js"));

const topSections = [
  ["Quickstart", "quickstartSidebar"],
  ["Guides", "guidesSidebar"],
  ["Eventing", "eventingSidebar"],
  ["Cookbook", "cookbookSidebar"],
  ["Agentic Workflow Engine", "aiSidebar"],
  ["SDKs", "sdksSidebar"],
  ["Reference", "referenceSidebar"],
  ["RBAC", "rbacSidebar"],
];

const routeBySource = new Map();
const outByDocId = new Map();
const titleByRoute = new Map();
const generatedPages = new Map();
const docIdBySource = new Map();
const sourceFileByRel = new Map();
const warnings = [];

function resolveOssDocsDir() {
  const configured = process.env.OSS_DOCS_DIR;
  if (configured) {
    const resolved = path.resolve(configured);
    if (fs.existsSync(path.join(resolved, "overrides"))) return resolved;
    if (fs.existsSync(path.join(resolved, "docs", "overrides"))) {
      return path.join(resolved, "docs");
    }
    return resolved;
  }
  if (fs.existsSync(SHARED_DOCS_CACHE)) return SHARED_DOCS_CACHE;
  return DEFAULT_LOCAL_OSS_DOCS;
}

function loadSharedDocsMap() {
  const mapPath = path.join(ROOT, "shared-docs-map.json");
  if (!fs.existsSync(mapPath)) return { pages: [], aliases: {} };
  return JSON.parse(fs.readFileSync(mapPath, "utf8"));
}

function posixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, contents) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function listMarkdownFiles(dir) {
  const files = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current)) {
      const full = path.join(current, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (/\.(mdx|md)$/.test(entry)) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files.sort();
}

function normalizeSharedSource(source) {
  return String(source || "").replace(/^docs\//, "").replace(/^\.\//, "");
}

function localEntry(file) {
  return {
    file,
    sourceRel: sourceRelFromFile(file),
    docId: null,
    route: null,
    shared: false,
  };
}

function sharedEntry(page) {
  const sourceRel = normalizeSharedSource(page.source);
  return {
    file: path.join(OSS_DOCS, sourceRel),
    sourceRel,
    docId: page.docId || docIdFromRel(sourceRel),
    route: page.route,
    shared: true,
  };
}

function sourceDocId(sourceRel) {
  return docIdBySource.get(sourceRel) || docIdFromRel(sourceRel);
}

function collectSourceEntries() {
  if (!fs.existsSync(OSS_DOCS)) {
    throw new Error(
      `OSS docs source not found at ${OSS_DOCS}. Run scripts/fetch-oss-docs.sh or set OSS_DOCS_DIR to a conductor/docs checkout.`,
    );
  }

  const entries = listMarkdownFiles(SOURCE_DOCS).map(localEntry);
  const sharedEntries = (SHARED_DOCS_MAP.pages || []).map(sharedEntry);
  const missing = sharedEntries.filter((entry) => !fs.existsSync(entry.file));
  if (missing.length) {
    const list = missing.map((entry) => `- ${entry.sourceRel}`).join("\n");
    throw new Error(`Missing shared OSS docs. Run scripts/fetch-oss-docs.sh or set OSS_DOCS_DIR.\n${list}`);
  }
  return [...entries, ...sharedEntries];
}

function splitFrontMatter(contents) {
  if (!contents.startsWith("---\n")) {
    return { frontMatter: {}, frontMatterLines: [], body: contents };
  }
  const end = contents.indexOf("\n---", 4);
  if (end === -1) {
    return { frontMatter: {}, frontMatterLines: [], body: contents };
  }
  const raw = contents.slice(4, end);
  const body = contents.slice(contents.indexOf("\n", end + 1) + 1);
  const frontMatter = {};
  const frontMatterLines = raw.split(/\r?\n/);
  for (const line of frontMatterLines) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    frontMatter[key] = value;
  }
  return { frontMatter, frontMatterLines, body };
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function pageTitleForRoute(route, fallbackTitle) {
  const override = ROUTE_METADATA_OVERRIDES[route];
  return (override && override.title) || fallbackTitle;
}

function stripLearnPrefix(value) {
  return String(value || "")
    .replace(/^Learn how to\s+/i, "")
    .replace(/^Learn\s+/i, "")
    .replace(/\.$/, "")
    .trim();
}

function sentenceCase(value) {
  const clean = String(value || "").trim();
  if (!clean) return clean;
  return clean.charAt(0).toLowerCase() + clean.slice(1);
}

function fitMetaDescription(value) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  const sentence = clean.slice(0, 160).replace(/\s+\S*$/, "");
  return `${sentence.replace(/[,.:\-;]\s*$/, "")}.`;
}

function hasProductContext(value) {
  return /(Orkes|Conductor|workflow|API|SDK|task|integration|agent|worker|operator|orchestration|MCP|webhook|service|security|access control|prompt)/i.test(
    value,
  );
}

function apiResourceLabel(route) {
  const parts = route.split("/");
  return API_RESOURCE_LABELS[parts[2]] || "Conductor";
}

function pageDescriptionForRoute(route, fallbackDescription, title) {
  const override = ROUTE_METADATA_OVERRIDES[route];
  if (override && override.description) return override.description;

  const description = String(fallbackDescription || "").trim();
  if (route.startsWith("reference-docs/api/")) {
    const action = sentenceCase(stripLearnPrefix(title));
    return fitMetaDescription(
      `Use the Orkes Conductor ${apiResourceLabel(route)} API to ${action}. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples.`,
    );
  }

  const contextual = description && !/(Orkes|Conductor)/i.test(description)
    ? `${description.replace(/\.$/, "")} in Orkes Conductor.`
    : description;
  if (contextual.length > 165) {
    const fitted = fitMetaDescription(contextual);
    if (!hasProductContext(fitted)) {
      return fitMetaDescription(`${title} in Orkes Conductor: ${description}`);
    }
    return fitted;
  }
  return contextual;
}

function keywordsForRoute(route, title) {
  const haystack = `${route} ${title}`.toLowerCase();
  const keywords = [
    "Orkes Conductor",
    "Conductor",
    "durable execution",
    "workflow orchestration",
    "agentic workflows",
    "AI agents",
    "microservice orchestration",
    "internet-scale orchestration",
  ];

  if (haystack.includes("sdk") || haystack.includes("client")) {
    keywords.push("Conductor SDKs", "workflow workers", "Python SDK", "Java SDK", "Go SDK", "TypeScript SDK");
  }
  if (haystack.includes("ai") || haystack.includes("agent") || haystack.includes("llm") || haystack.includes("mcp")) {
    keywords.push("AI orchestration", "LLM orchestration", "MCP gateway", "agent workflows");
  }
  if (haystack.includes("tutorial") || haystack.includes("cookbook") || haystack.includes("template")) {
    keywords.push("workflow cookbook", "workflow recipes", "Conductor examples");
  }
  if (haystack.includes("api") || haystack.includes("gateway") || haystack.includes("service orchestration")) {
    keywords.push("API orchestration", "API gateway", "service orchestration");
  }
  if (haystack.includes("event") || haystack.includes("webhook") || haystack.includes("kafka") || haystack.includes("rabbitmq")) {
    keywords.push("event-driven orchestration", "webhooks", "Kafka orchestration", "RabbitMQ orchestration");
  }
  if (haystack.includes("rbac") || haystack.includes("access") || haystack.includes("security") || haystack.includes("secret")) {
    keywords.push("role based access control", "workflow security", "access control");
  }
  if (haystack.includes("worker") || haystack.includes("task")) {
    keywords.push("workflow tasks", "workflow workers", "task queues");
  }

  return [...new Set(keywords)].join(", ");
}

function buildFrontMatter(frontMatter, route, title) {
  const lines = [];
  const baseTitle = frontMatter.title || frontMatter.sidebar_label || title;
  const cleanTitle = pageTitleForRoute(route, baseTitle);
  const description = pageDescriptionForRoute(route, frontMatter.description, cleanTitle);

  if (route === "") {
    lines.push("hide:");
    lines.push("  - navigation");
    lines.push("  - toc");
  }

  if (cleanTitle && route !== "") {
    lines.push(`title: ${yamlString(cleanTitle)}`);
  }
  if (description) {
    lines.push(`description: ${yamlString(description)}`);
  }
  if (route !== "") {
    lines.push(`canonical_route: ${yamlString(route)}`);
  }
  lines.push(`updated: ${yamlString(DOCS_LAST_MODIFIED)}`);
  lines.push(`keywords: ${yamlString(keywordsForRoute(route, cleanTitle))}`);

  if (!lines.length) return "";
  return `---\n${lines.join("\n")}\n---\n\n`;
}

function sourceRelFromFile(file) {
  return posixPath(path.relative(SOURCE_DOCS, file));
}

function docIdFromRel(rel) {
  return rel.replace(/\.(mdx|md)$/, "").replace(/\/index$/, "");
}

function normalizeRouteFromSlug(slug, sourceRel) {
  let clean = String(slug || "").trim();
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.slice(1, -1);
  }
  clean = clean.trim();
  if (clean === "/" || clean === "") return "";

  let route;
  if (clean.startsWith("/")) {
    route = clean.slice(1);
  } else {
    const sourceDir = path.posix.dirname(docIdFromRel(sourceRel));
    route = path.posix.normalize(path.posix.join(sourceDir, clean));
  }
  route = route.replace(/^\.\//, "").replace(/\/$/, "");
  return route === "." ? "" : route;
}

function defaultRouteFromSource(sourceRel) {
  return docIdFromRel(sourceRel);
}

function routeToOutRel(route) {
  const sourceRoute = route.startsWith("templates/") ? `_routes/${route}` : route;
  return sourceRoute ? `${sourceRoute}.md` : "index.md";
}

function routeToUrl(route) {
  return route ? `${BASE_URL}/${route}` : `${BASE_URL}/`;
}

function routeFromSidebarHref(href) {
  let clean = String(href || "").trim();
  if (!clean || /^[a-z][a-z0-9+.-]*:/i.test(clean)) return null;
  if (clean.startsWith(`${BASE_URL}/`)) clean = clean.slice(BASE_URL.length + 1);
  else if (clean === BASE_URL) clean = "";
  else if (clean.startsWith(`${LEGACY_BASE_URL}/`)) clean = clean.slice(LEGACY_BASE_URL.length + 1);
  else if (clean === LEGACY_BASE_URL) clean = "";
  else clean = clean.replace(/^\//, "");
  clean = clean
    .replace(/\.html$/, "")
    .replace(/\/$/, "");
  return clean === "." ? "" : clean;
}

function routeFromOutRel(outRel) {
  return outRel
    .replace(/\.md$/, "")
    .replace(/^_routes\//, "")
    .replace(/\/index$/, "");
}

function extractTitle(body, frontMatter, fallback) {
  if (frontMatter.title) return frontMatter.title;
  if (frontMatter.sidebar_label) return frontMatter.sidebar_label;
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/<[^>]+>/g, "").trim();
  return fallback
    .split("/")
    .pop()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function collectRoutes(entries) {
  for (const entry of entries) {
    const file = entry.file || entry;
    const sourceRel = entry.sourceRel || sourceRelFromFile(file);
    const contents = read(file);
    const { frontMatter, body } = splitFrontMatter(contents);
    const route =
      entry.route !== null && entry.route !== undefined
        ? entry.route
        : frontMatter.slug !== undefined
        ? normalizeRouteFromSlug(frontMatter.slug, sourceRel)
        : defaultRouteFromSource(sourceRel);
    const outRel = routeToOutRel(route);
    const docId = entry.docId || docIdFromRel(sourceRel);
    const title = pageTitleForRoute(route, extractTitle(body, frontMatter, docId));

    routeBySource.set(sourceRel, route);
    outByDocId.set(docId, outRel);
    titleByRoute.set(route, title);
    docIdBySource.set(sourceRel, docId);
    sourceFileByRel.set(sourceRel, file);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function routeOrExternalUrl(value) {
  if (!value) return value;
  if (/^(https?:|mailto:|tel:)/.test(value)) return value;
  return routeToUrl(value);
}

function sourceTargetUrl(sourceKey, query, hash) {
  const clean = sourceKey
    .replace(/^\.\//, "")
    .replace(/^(\.\.\/)+/, "")
    .replace(/\/$/, "");
  const route = routeBySource.get(clean);
  if (route !== undefined) {
    return `${routeToUrl(route)}${query}${hash}`;
  }
  const alias = SHARED_DOCS_MAP.aliases && SHARED_DOCS_MAP.aliases[clean];
  if (alias) {
    const keepOriginalHash = /^(https?:|mailto:|tel:)/.test(alias);
    return `${routeOrExternalUrl(alias)}${query}${keepOriginalHash ? hash : ""}`;
  }
  return null;
}

function transformUrl(rawUrl, sourceRel) {
  if (!rawUrl) return rawUrl;
  const legacySiteUrl = rewriteLegacySiteUrl(rawUrl);
  if (legacySiteUrl) return legacySiteUrl;
  if (/^(https?:|mailto:|tel:|javascript:|data:)/.test(rawUrl)) return rawUrl;
  if (rawUrl.startsWith("#")) return rawUrl;
  if (rawUrl.startsWith("//")) return rawUrl;
  if (rawUrl.startsWith(`${BASE_URL}/`) || rawUrl === BASE_URL || rawUrl === `${BASE_URL}/`) {
    return rawUrl;
  }
  if (
    BASE_URL !== LEGACY_BASE_URL &&
    (rawUrl.startsWith(`${LEGACY_BASE_URL}/`) || rawUrl === LEGACY_BASE_URL || rawUrl === `${LEGACY_BASE_URL}/`)
  ) {
    return `${BASE_URL}${rawUrl.slice(LEGACY_BASE_URL.length)}`;
  }

  let url = rawUrl;
  let hash = "";
  const hashIndex = url.indexOf("#");
  if (hashIndex >= 0) {
    hash = url.slice(hashIndex);
    url = url.slice(0, hashIndex);
  }
  let query = "";
  const queryIndex = url.indexOf("?");
  if (queryIndex >= 0) {
    query = url.slice(queryIndex);
    url = url.slice(0, queryIndex);
  }

  if (url.startsWith("/")) {
    return `${BASE_URL}${url}${query}${hash}`;
  }

  if (/\.html$/.test(url)) {
    const sourceDir = path.posix.dirname(sourceRel);
    const target = url.replace(/\.html$/, ".md");
    const sourceKey = path.posix.normalize(path.posix.join(sourceDir, target));
    const targetUrl = sourceTargetUrl(sourceKey, query, hash);
    if (targetUrl) return targetUrl;
  }

  if (/\.(mdx|md)$/.test(url)) {
    const sourceDir = path.posix.dirname(sourceRel);
    let target = url;
    if (target.startsWith("docs/")) {
      target = target.slice("docs/".length);
    } else {
      target = path.posix.normalize(path.posix.join(sourceDir, target));
    }
    const sourceKey = target.replace(/^\.\//, "");
    const targetUrl = sourceTargetUrl(sourceKey, query, hash);
    if (targetUrl) return targetUrl;
  }

  if (!/\.[A-Za-z0-9]+$/.test(url)) {
    const sourceDir = path.posix.dirname(docIdFromRel(sourceRel));
    const candidates = [];
    const normalizedUrl = url.replace(/^\.\//, "").replace(/\/$/, "");
    if (url.startsWith("./") || url.startsWith("../")) {
      candidates.push(path.posix.normalize(path.posix.join(sourceDir, url)));
    } else {
      candidates.push(path.posix.normalize(path.posix.join(sourceDir, url)));
      candidates.push(normalizedUrl);
    }

    for (const candidate of candidates) {
      const clean = candidate.replace(/^\.\//, "").replace(/\/$/, "");
      const outRel = outByDocId.get(clean);
      if (outRel) {
        return `${routeToUrl(routeFromOutRel(outRel))}${query}${hash}`;
      }
      if (titleByRoute.has(clean)) {
        return `${routeToUrl(clean)}${query}${hash}`;
      }
    }
  }

  return rawUrl;
}

function rewriteLinks(body, sourceRel) {
  let output = body.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (all, prefix, url, suffix) => {
    return `${prefix}${transformUrl(url.trim(), sourceRel)}${suffix}`;
  });
  output = output.replace(
    /\b(href|src)=["']([^"']+)["']/g,
    (all, attr, url) => `${attr}="${transformUrl(url, sourceRel)}"`,
  );
  return output;
}

function removeDocusaurusImports(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let inFence = false;
  let removingExport = false;
  let bracketDepth = 0;

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    if (/^import\s+/.test(line.trim())) {
      continue;
    }
    if (/^export\s+const\s+/.test(line.trim())) {
      removingExport = true;
      bracketDepth =
        (line.match(/\[/g) || []).length +
        (line.match(/\{/g) || []).length -
        (line.match(/\]/g) || []).length -
        (line.match(/\}/g) || []).length;
      if (bracketDepth <= 0 && /[;\]]\s*$/.test(line)) {
        removingExport = false;
      }
      continue;
    }
    if (removingExport) {
      bracketDepth +=
        (line.match(/\[/g) || []).length +
        (line.match(/\{/g) || []).length -
        (line.match(/\]/g) || []).length -
        (line.match(/\}/g) || []).length;
      if (bracketDepth <= 0 && /[;\]]\s*$/.test(line.trim())) {
        removingExport = false;
      }
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

function convertTableNote(body) {
  return body.replace(
    /<TableNote\s+title=["']([^"']+)["']>([\s\S]*?)<\/TableNote>/g,
    (_all, title, content) => {
      const inline = content
        .trim()
        .replace(/<\/li>\s*<li>/g, ", ")
        .replace(/<[^>]+>/g, "")
        .trim();
      return `<span class="table-note"><strong>${escapeHtml(title)}:</strong> ${escapeHtml(inline)}</span>`;
    },
  );
}

function convertReactOnlySnippets(body) {
  return body
    .replace(
      /export const text = `([^`]+)`;\s*\n\s*<div className="passingDataReference">\{text\}<\/div>/g,
      (_all, value) => `\`\`\`json\n${value.replace(/\\\$/g, "$")}\n\`\`\``,
    )
    .replace(/\bclassName=/g, "class=");
}

function convertJsxStyles(body) {
  return body
    .replace(/style=\{\{([^}]+)\}\}/g, (_all, styleBody) => {
      const style = styleBody
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => {
          const [rawKey, ...rawValueParts] = part.split(":");
          const key = rawKey
            .trim()
            .replace(/([A-Z])/g, "-$1")
            .toLowerCase();
          let value = rawValueParts.join(":").trim().replace(/^["']|["']$/g, "");
          if (/^\d+$/.test(value)) value = `${value}px`;
          return `${key}: ${value}`;
        })
        .join("; ");
      return `style="${style};"`;
    })
    .replace(/^\s*style="\s*"\s*$/gm, "");
}

function convertCodeBlock(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let inCodeBlock = false;
  let language = "";

  for (const line of lines) {
    if (!inCodeBlock && line.trim().startsWith("<CodeBlock")) {
      const langMatch = line.match(/language=["']([^"']+)["']/);
      language = langMatch ? langMatch[1] : "";
      const hrefMatch = line.match(/href=["']([^"']+)["']/);
      if (hrefMatch) {
        out.push(`*[Complete source file on GitHub](${hrefMatch[1]})*`);
        out.push("");
      }
      out.push(`\`\`\`${language}`);
      inCodeBlock = true;
      continue;
    }
    if (inCodeBlock) {
      if (line.trim().startsWith("</CodeBlock>")) {
        out.push("```");
        inCodeBlock = false;
        continue;
      }
      let next = line;
      next = next.replace(/^\s*\{\s*`/, "");
      next = next.replace(/`\s*\}\s*$/, "");
      out.push(next);
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

function convertAdmonitions(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let inFence = false;
  const stack = [];

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      out.push(stack.length ? `${"    ".repeat(stack.length)}${line}` : line);
      continue;
    }
    if (!inFence) {
      const open = line.match(/^:{3,}\s*(note|info|tip|warning|caution|danger|important)\s*(.*)$/i);
      if (open) {
        const kind = open[1].toLowerCase() === "caution" ? "warning" : open[1].toLowerCase();
        const title = open[2].trim().replace(/:$/, "");
        const label = title ? ` "${title}"` : "";
        out.push(`${"    ".repeat(stack.length)}!!! ${kind}${label}`);
        stack.push(kind);
        continue;
      }
      if (stack.length && /^:{3,}\s*$/.test(line.trim())) {
        stack.pop();
        continue;
      }
    }
    out.push(stack.length ? `${"    ".repeat(stack.length)}${line}` : line);
  }
  return out.join("\n");
}

function getTabLabel(line) {
  const label =
    line.match(/\blabel=["']([^"']+)["']/) ||
    line.match(/\btitle\s*=\s*["']([^"']+)["']/) ||
    line.match(/\bvalue=["']([^"']+)["']/);
  return label ? label[1].trim() : "Tab";
}

function renderTabs(items) {
  const rendered = [];
  for (const item of items) {
    rendered.push(`=== ${JSON.stringify(item.label)}`);
    rendered.push("");
    const body = item.lines.join("\n").replace(/^\n+|\n+$/g, "");
    if (body) {
      for (const line of body.split("\n")) {
        rendered.push(line ? `    ${line}` : "");
      }
    } else {
      rendered.push("    ");
    }
    rendered.push("");
  }
  return rendered;
}

function convertTabs(body) {
  const lines = body.split(/\r?\n/);
  const output = [];
  const stack = [];
  let inFence = false;

  function append(line) {
    const currentGroup = stack[stack.length - 1];
    if (currentGroup && currentGroup.current) {
      currentGroup.current.lines.push(line);
    } else {
      output.push(line);
    }
  }

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      append(line);
      continue;
    }
    if (!inFence && /^<Tabs\b/.test(line.trim())) {
      stack.push({ items: [], current: null });
      continue;
    }
    if (!inFence && /^<TabItem\b/.test(line.trim())) {
      const group = stack[stack.length - 1];
      if (!group) {
        warnings.push(`TabItem without Tabs: ${line}`);
        continue;
      }
      group.current = { label: getTabLabel(line), lines: [] };
      continue;
    }
    if (!inFence && /^<\/TabItem>/.test(line.trim())) {
      const group = stack[stack.length - 1];
      if (group && group.current) {
        group.items.push(group.current);
        group.current = null;
      }
      continue;
    }
    if (!inFence && /^<\/Tabs>/.test(line.trim())) {
      const group = stack.pop();
      const rendered = renderTabs(group ? group.items : []);
      if (stack.length && stack[stack.length - 1].current) {
        stack[stack.length - 1].current.lines.push(...rendered);
      } else {
        output.push(...rendered);
      }
      continue;
    }
    append(line);
  }

  if (stack.length) {
    warnings.push("Unclosed Tabs block found during conversion");
  }

  return output.join("\n");
}

function docCardPlaceholder(sourceRel) {
  const id = sourceDocId(sourceRel);
  let children = collectSidebarChildrenForDoc(id);
  if (!children.length) {
    children = autogeneratedItems(id).filter((child) => routeFromOutRel(child.outRel) !== routeBySource.get(sourceRel));
  }
  if (!children.length) return "";
  const lines = ["", "## In this section", ""];
  for (const child of children) {
    if (!child.outRel) continue;
    const route = routeFromOutRel(child.outRel);
    lines.push(`- [${child.label}](${routeToUrl(route)})`);
  }
  lines.push("");
  return lines.join("\n");
}

function replaceDocCardList(body, sourceRel) {
  return body.replace(/<DocCardList(?:\s+[^>]*)?\s*\/>/g, docCardPlaceholder(sourceRel));
}

function unwrapMdxCodeBlocks(body) {
  return body.replace(/```mdx-code-block\s*\n([\s\S]*?)\n```/g, (_all, content) => content.trim());
}

function collectSidebarChildrenForDoc(docId) {
  const children = [];

  function visit(items) {
    for (const item of items || []) {
      if (typeof item === "string") continue;
      if (!item || typeof item !== "object") continue;
      if (item.type === "category") {
        const link = item.link || {};
        if (link.type === "doc" && link.id === docId) {
          children.push(...flattenNavItems(item.items || []));
        } else {
          visit(item.items || []);
        }
      }
    }
  }

  for (const [_label, sidebarId] of topSections) {
    visit(sidebars[sidebarId]);
  }
  visit(sidebars.integrationsSidebar);
  return children;
}

function flattenNavItems(items) {
  const result = [];
  for (const item of items || []) {
    if (typeof item === "string") {
      const outRel = outByDocId.get(item);
      result.push({ label: titleForOutRel(outRel, item), outRel });
      continue;
    }
    if (!item || typeof item !== "object") continue;
    if (item.type === "doc") {
      const outRel = outByDocId.get(item.id);
      result.push({ label: item.label || titleForOutRel(outRel, item.id), outRel });
    } else if (item.type === "link") {
      const route = routeFromSidebarHref(item.href);
      if (route !== null) result.push({ label: item.label, outRel: routeToOutRel(route) });
    } else if (item.type === "category") {
      const page = categoryPageForLink(item.link, item.label, item.items);
      result.push({ label: item.label, outRel: page && page.outRel });
    } else if (item.type === "autogenerated") {
      result.push(...autogeneratedItems(item.dirName));
    }
  }
  return result.filter((item) => item.outRel);
}

function titleForOutRel(outRel, fallback) {
  if (!outRel) return fallback;
  const route = routeFromOutRel(outRel);
  return titleByRoute.get(route) || fallback;
}

function convertFaqPage(contents) {
  const { frontMatter } = splitFrontMatter(contents);
  const h1Index = contents.indexOf("# General FAQs");
  if (h1Index < 0) return null;
  const scriptStart = contents.indexOf("export const");
  const script = contents
    .slice(scriptStart, h1Index)
    .replace(/export\s+const/g, "const");
  const names = [...script.matchAll(/const\s+([A-Za-z0-9_]+)\s*=/g)].map((match) => match[1]);
  let data = {};
  try {
    data = new Function(`${script}\nreturn { ${names.join(", ")} };`)();
  } catch (error) {
    warnings.push(`Could not evaluate FAQ structured data: ${error.message}`);
  }

  const order = [
    ["Project, maintenance, and product relationship", "projectFaqs"],
    ["Setup, environments, and compliance", "setupFaqs"],
    ["Authentication and access control", "authFaqs"],
    ["Workflow basics and building blocks", "workflowFaqs"],
    ["Workers and task routing", "workerFaqs"],
    ["Running, triggering, and scheduling workflows", "runWorkflowFaqs"],
    ["Data, secrets, and configuration", "dataFaqs"],
    ["Performance, scale, and orchestration patterns", "perfFaqs"],
    ["Workflow execution control and lifecycle", "workflowExecFaqs"],
  ];
  const route = normalizeRouteFromSlug(frontMatter.slug, "faqs/general-faqs.mdx");
  const lines = [buildFrontMatter(frontMatter, route, "General FAQs").trimEnd(), "", "# General FAQs", ""];
  for (const [heading, key] of order) {
    lines.push(`## ${heading}`, "");
    for (const faq of data[key] || []) {
      lines.push(`<details class="faq-item">`);
      lines.push(`<summary>${escapeHtml(faq.question)}</summary>`);
      lines.push("");
      lines.push(escapeHtml(faq.answer));
      lines.push("");
      lines.push(`</details>`, "");
    }
  }
  return lines.join("\n");
}

function cleanMdx(body, sourceRel) {
  let output = body;
  output = unwrapMdxCodeBlocks(output);
  output = convertReactOnlySnippets(output);
  output = convertJsxStyles(output);
  output = convertTableNote(output);
  output = convertCodeBlock(output);
  output = convertAdmonitions(output);
  output = removeDocusaurusImports(output);
  output = replaceDocCardList(output, sourceRel);
  output = output.replace(/<HomePageLanding\s*\/>/g, "");
  output = output.replace(/<FAQStructuredData\s+[^>]+\/>/g, "");
  output = output.replace(/^\s*\{\/\*[\s\S]*?\*\/\}\s*$/gm, "");
  output = convertTabs(output);
  output = rewriteLinks(output, sourceRel);
  return output.replace(/\n{4,}/g, "\n\n\n").trim() + "\n";
}

function endpointForApiPage(body) {
  const match = body.match(/\*\*Endpoint\*\*:\s*`([^`]+)`/i);
  return match ? match[1].trim() : "";
}

function methodFromEndpoint(endpoint) {
  const match = endpoint.match(/^([A-Z]+)\s+/);
  return match ? match[1] : "";
}

function pathFromEndpoint(endpoint) {
  return endpoint.replace(/^[A-Z]+\s+/, "").trim();
}

function enhanceApiReferencePage(body, route, title, description) {
  if (!route.startsWith("reference-docs/api/")) return body;
  if (body.includes("## Quick reference")) return body;

  const endpoint = endpointForApiPage(body);
  if (!endpoint) return body;

  const method = methodFromEndpoint(endpoint);
  const endpointPath = pathFromEndpoint(endpoint);
  const purpose = sentenceCase(stripLearnPrefix(title));
  const resource = apiResourceLabel(route);
  const quickReference = [
    "## Quick reference",
    "",
    `Use this ${resource} endpoint to ${purpose}. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.`,
    "",
    `- **Method and path**: \`${method}\` \`${endpointPath}\``,
    "- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.",
    "- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.",
    "- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.",
    "- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.",
    "",
  ].join("\n");

  return body.replace(/^(# .+\n)/, `$1\n${quickReference}\n`);
}

function insertAfterIntro(body, addition) {
  const cleanAddition = addition.trim();
  if (!cleanAddition) return body;
  const firstLine = cleanAddition.split(/\r?\n/)[0];
  if (body.includes(firstLine)) return body;
  const match = body.match(/^(# .+\n\n[\s\S]*?\n\n)/);
  if (!match) return `${cleanAddition}\n\n${body}`;
  return body.replace(match[0], `${match[0]}${cleanAddition}\n\n`);
}

function insertBeforeHeading(body, heading, addition) {
  const cleanAddition = addition.trim();
  if (!cleanAddition) return body;
  const firstLine = cleanAddition.split(/\r?\n/)[0];
  if (body.includes(firstLine)) return body;
  const marker = `\n## ${heading}`;
  const idx = body.indexOf(marker);
  if (idx === -1) return `${body.trim()}\n\n${cleanAddition}\n`;
  return `${body.slice(0, idx).trimEnd()}\n\n${cleanAddition}\n${body.slice(idx)}`;
}

function appendBeforeNextSteps(body, addition) {
  return insertBeforeHeading(body, "Next steps", addition);
}

function enhancePositioningPage(body, route) {
  let output = body;

  if (route === "ai-orchestration") {
    output = insertAfterIntro(
      output,
      [
        "## Where Conductor fits",
        "",
        "Use your agent framework for reasoning, prompts, graph composition, and model-specific loops. Use Conductor for execution: persisted state, task queues, retries, timeouts, durable human waits, replay, governance, and audit history.",
        "",
        AGENTSPAN_RELATIONSHIP_COPY,
        "",
        "Conductor is the durable runtime under production agents and distributed workflows. It is not a replacement for every agent framework, and it should not be positioned as one. Keep the framework where it helps the model reason; add Conductor where the work must finish reliably.",
      ].join("\n"),
    );
    output = output.replace(
      "If you run agents on a framework like LangChain, CrewAI, or LangGraph without a durable execution backend, you are responsible for:",
      "If you run agents only inside an in-process or non-durable runtime, you are responsible for:",
    );
    output = output.replace(
      "Conductor makes every agent a durable agent — one that survives crashes, retries, and infrastructure failures without losing progress.",
      "Conductor lets you run agents as durable workflows that can survive crashes, retries, and infrastructure failures without losing completed progress.",
    );
    output = output.replace(/any MCP server/g, "any MCP-compatible server");
    output = output.replace(
      "Supports built-in tools: web search, code execution, file search, extended thinking.",
      "Provider and model specific tool features such as web search, code execution, file search, or extended thinking can be passed through when the configured provider supports them.",
    );
  }

  if (route === "ai-orchestration/why-conductor") {
    output = output.replace(
      /Conductor is the original durable workflow orchestration engine[\s\S]*?Here's what that looks like in practice\./,
      "Conductor is a durable workflow engine for production AI agents and distributed systems. Keep your agent framework for reasoning, planning, and model-specific logic; use Conductor when execution must survive process crashes, tool timeouts, human waits, duplicate callbacks, worker deploys, and partial side effects. Here's what that looks like in practice.",
    );
    output = output.replace(
      "Other engines treat LLM calls as generic function calls. You build the abstraction: prompt construction, provider switching, response parsing, token tracking, retry logic. On Conductor, an LLM call is a system task:",
      "In many in-process agent runtimes, LLM calls are ordinary function calls. Teams still need to handle prompt construction, provider switching, response parsing, token tracking, and retry policy. In Conductor, an LLM call can be a system task:",
    );
    output = output.replace("On other engines, this same task requires:", "Without a durable orchestration layer, this same task usually requires:");
    output = output.replace(
      "The agent discovers tools at runtime, the LLM picks the right one, and Conductor executes it with automatic retry, timeout, and full audit trail. Connect to any MCP server — GitHub, Slack, databases, custom APIs — with no wrapper code.",
      "The agent discovers tools at runtime, the LLM picks the right one, and Conductor executes it with automatic retry, timeout, and full audit trail. Connect to MCP-compatible servers such as GitHub, Slack, databases, and custom APIs with a standard tool interface.",
    );
    output = output.replace(
      'On other engines, you write a "Durable MCP" wrapper: a custom activity/worker that connects to the MCP server, marshals requests, handles errors, and logs results. For every MCP server. For every tool type.',
      "Without a durable orchestration layer, teams often write a wrapper that connects to the MCP server, marshals requests, handles errors, and logs results for each tool surface.",
    );
    output = output.replace(
      "On other engines, you implement `wait_condition()` with signal handlers, write the signal routing code, and build the approval UI integration yourself. The pause mechanism is in your workflow code, not in the platform.",
      "Without a platform-level wait state, teams usually implement signal routing, approval storage, and UI integration themselves. The pause mechanism lives in application code instead of the execution runtime.",
    );
    output = output.replace(
      "On other engines, you build the loop in your workflow code. If the process crashes, you either restart from the beginning (burning all tokens again) or build your own checkpointing mechanism.",
      "In an in-process loop, a crash can force a restart from the beginning or require a custom checkpointing mechanism.",
    );
    output = output.replace("This is the capability no other engine can match.", "This is where Conductor's JSON-native runtime is especially useful.");
    output = output.replace("more dynamic than code-based engines", "more dynamic than code-only orchestration patterns");
    output = output.replace(
      "On code-based engines, dynamic workflows require generating source code, compiling it, deploying it, and then executing it. That friction fundamentally limits how dynamically an AI system can operate.",
      "In code-only orchestration, dynamic workflows often require generating source code, compiling it, deploying it, and then executing it. That friction limits how dynamically an AI system can operate.",
    );
    output = output.replace(
      "Pinecone, pgvector, and MongoDB Atlas are supported natively. No LangChain, no custom retrieval workers, no framework dependencies.",
      "Pinecone, pgvector, and MongoDB Atlas are supported natively. Use this when you want retrieval inside the workflow instead of pushing orchestration into a separate RAG framework.",
    );
    output = output.replace(
      "## Guaranteed execution — failure is not a choice",
      "## Durable execution — failures are explicit",
    );
    output = output.replace(
      "On other engines, you build this logging yourself. Every team does it differently, with different coverage and different gaps.",
      "Without platform-level execution history, teams usually build this logging themselves, with uneven coverage and gaps.",
    );
  }

  if (route === "ai-orchestration/durable-agents") {
    output = insertAfterIntro(
      output,
      [
        "## Framework plus durable runtime",
        "",
        "A durable agent is not a different reasoning framework. Keep an agent framework, custom planner, or model-specific loop where it helps with reasoning. Use Conductor for the execution path that must survive failures: state, queues, retries, waits, human approval, compensation, replay, and audit history.",
        "",
        "This is the practical production boundary: the framework decides what should happen next; Conductor makes sure the selected work is executed, recovered, and observable.",
        "",
        "| Scenario | Durable runtime behavior |",
        "| -------- | ------------------------ |",
        "| Agent process dies after planning | Completed planning output is persisted; execution resumes from the next task. |",
        "| Human approval spans days | The workflow remains paused without holding a process or thread. |",
        "| Tool side effect is retried | Idempotency keys and compensation workflows prevent or mitigate duplicate work. |",
      ].join("\n"),
    );
    output = output.replace(
      "Conductor eliminates all of this. Every step of a durable agent workflow is persisted to storage as it completes. If the process dies, the agent resumes from the last completed step — not from the beginning.",
      "Conductor moves these recovery concerns into the workflow runtime. Every completed step of a durable agent workflow is persisted to storage. If the process dies, the agent can resume from the last completed step instead of restarting from the beginning.",
    );
    output = output.replace(
      "Most AI frameworks have no concept of compensation. If your LangChain agent sends an email in step 3 and crashes in step 5, the email is already sent and there is no built-in mechanism to undo it. Conductor's failure workflows solve this.",
      "Many in-process agent runtimes do not provide compensation as a first-class execution primitive. If an agent sends an email in step 3 and crashes in step 5, the email is already sent and the runtime still needs a way to undo, mitigate, or record the partial result. Conductor's failure workflows solve this.",
    );
  }

  if (route === "ai-orchestration/production-agent-architecture") {
    output = insertAfterIntro(
      output,
      [
        "## Agents are distributed systems",
        "",
        "A production agent coordinates models, tools, workers, queues, humans, timers, webhooks, and external callbacks. The agent framework can own reasoning and planning; Conductor owns durable execution, persisted state, task routing, retries, waits, replay, and audit history.",
        "",
        "Use this architecture when the agent takes actions that matter: creating records, updating systems, calling internal services, waiting for approval, or coordinating multiple tools over minutes, hours, or days.",
      ].join("\n"),
    );
    output = output.replace(/any MCP server/g, "any MCP-compatible server");
  }

  if (route === "ai-orchestration/failure-semantics") {
    output = insertAfterIntro(
      output,
      [
        "## Failure-injection checklist",
        "",
        "| Scenario | How to test | Expected durable behavior |",
        "| -------- | ----------- | ------------------------- |",
        "| Crash after LLM plan | Stop the worker or server after the plan task completes. | Completed prompt, response, and token data remain persisted; execution resumes after restart. |",
        "| Tool timeout | Configure a short `responseTimeoutSeconds` and delay the tool response. | Only the timed-out tool task retries; upstream LLM calls are not repeated. |",
        "| Human approval wait | Leave a `HUMAN` task open across a deploy or restart. | The workflow remains paused and resumes when signaled. |",
        "| Worker deploy | Stop an in-flight worker and start a new version. | The task is requeued after timeout and picked up by a new worker. |",
        "| Duplicate side effect risk | Retry a side-effecting tool call with the same business key. | The external system deduplicates or the compensation workflow mitigates the duplicate. |",
        "",
        "## What to measure",
        "",
        "| Metric | Why it matters |",
        "| ------ | -------------- |",
        "| Completion rate | Shows whether agents finish business work instead of only starting it. |",
        "| Recovery time | Measures how quickly workflows resume after crashes, deploys, and dependency failures. |",
        "| Duplicate tool calls | Validates idempotency and side-effect control. |",
        "| State consistency | Confirms that completed LLM/tool outputs are reused instead of recomputed. |",
        "| Manual operator steps | Shows how much recovery work humans still perform. |",
        "| p95 runtime overhead | Quantifies orchestration overhead against reliability gains. |",
        "| Cost and token usage | Shows avoided re-execution for expensive LLM calls. |",
      ].join("\n"),
    );
    output = output.replace('"type": "FORK"', '"type": "FORK_JOIN"');
  }

  if (route === "ai-orchestration/first-ai-agent") {
    output = insertBeforeHeading(
      output,
      "Step 5: Add human approval",
      [
        "## Prove durability",
        "",
        "After the first successful run, prove that the agent is durable instead of just runnable.",
        "",
        "1. Start the agent asynchronously so you can inspect the execution while it runs.",
        "2. Stop a worker, restart the Conductor server, or interrupt the MCP service after one task completes.",
        "3. Start the worker or service again.",
        "4. Open the workflow execution and confirm completed tasks were not repeated and the workflow resumed from the last incomplete step.",
        "",
        "Expected result: completed LLM calls keep their prompts, responses, token usage, and timing. Only the interrupted task is retried.",
      ].join("\n"),
    );
    output = output.replace(/any MCP server/g, "any MCP-compatible server");
  }

  if (route === "ai-orchestration/mcp-integration") {
    output = insertAfterIntro(
      output,
      [
        "## Where MCP fits with Conductor",
        "",
        "Conductor does not replace your agent runtime. It makes tool calls durable and auditable. Use MCP for the standard tool interface; use Conductor for retries, timeouts, state, human approval, compensation, permissions, and execution history behind the tool call.",
        "",
        "For production tools, prefer exposing governed workflows through MCP Gateway instead of giving agents raw access to internal APIs.",
      ].join("\n"),
    );
    output = output.replace(/any MCP server/g, "any MCP-compatible server");
  }

  if (route === "ai-orchestration/token-efficiency") {
    output = output.replace("## Comparison: durable vs non-durable frameworks", "## Comparison: durable vs in-process runtimes");
    output = output.replace("| | Non-durable (LangChain, CrewAI, custom) | Durable (Conductor) |", "| | In-process or non-durable runtime | Durable (Conductor) |");
    output = output.replace(
      "Every crash, retry, pause, or debugging session that would re-execute LLM calls in a non-durable framework is free in Conductor",
      "Every crash, retry, pause, or debugging session that would re-execute LLM calls in an in-process runtime is free in Conductor",
    );
  }

  if (route === "quickstarts/durable-execution") {
    output = insertBeforeHeading(
      output,
      "What persists",
      [
        "## Durability proof scenarios",
        "",
        "Use these scenarios to verify that Conductor is providing durable execution, not just task sequencing.",
        "",
        "| Scenario | Test | Expected result |",
        "| -------- | ---- | --------------- |",
        "| Process kill after LLM plan | Kill the worker or server after an LLM task completes. | The completed LLM output is reused after restart. |",
        "| Tool timeout and retry | Delay a tool beyond `responseTimeoutSeconds`. | Only the tool task retries; prior tasks are preserved. |",
        "| Human wait across deploy | Leave a `HUMAN` task open, deploy, then approve. | The workflow resumes with the approval payload. |",
        "| Worker restart | Stop a worker after polling and before completion. | The task is redelivered after timeout. |",
        "| Duplicate side effect prevention | Retry a side-effecting step with the same business idempotency key. | The external system deduplicates or the failure workflow compensates. |",
      ].join("\n"),
    );
  }

  if (route === "quickstarts/concepts") {
    output = output.replace("## What can Conductor do?", "## What Conductor is best at");
    output = insertAfterIntro(
      output,
      [
        "## How to think about Conductor",
        "",
        "Conductor is a durable workflow engine for distributed applications and production AI agents. It is not limited to JSON-only or simple flows: workflow definitions describe orchestration, while workers and system tasks run real business logic in Python, Java, Go, .NET/C#, Ruby, Rust, TypeScript, or any service that can poll an API.",
      ].join("\n"),
    );
  }

  if (route === "quickstarts/json-code-native") {
    output = output.replace(
      "**Every run is deterministic.** Given the same inputs, a Conductor workflow will schedule the same tasks in the same order, every time. There is no ambient state, no thread-local context, no hidden mutation. This is why [replay](/content/quickstarts/durable-execution#replay-and-recovery) works unconditionally — restart a workflow from three months ago and it re-executes the same graph. Code-based workflow engines that embed orchestration logic alongside business logic cannot make this guarantee without imposing significant constraints on what your code is allowed to do (no random numbers, no system clocks, no uncontrolled I/O).",
      "**Workflow scheduling is explicit.** Given the same workflow definition and inputs, Conductor schedules the same declared tasks in the same order. Side effects live in workers and system tasks, not in hidden process state. This is why [replay](/content/quickstarts/durable-execution#replay-and-recovery) can restart a workflow from a known definition and execution history. Code-first orchestration can make similar guarantees only when workflow code follows strict determinism rules around clocks, randomness, I/O, and external state.",
    );
    output = output.replace(
      "Implementation logic (calling APIs, transforming data, running ML models) lives in workers written in any language.",
      "Implementation logic (calling APIs, transforming data, running ML models) lives in workers written with SDKs in Python, Java, Go, .NET/C#, Ruby, Rust, and TypeScript, or in any service that can poll the task API.",
    );
    output = output.replace(
      "The common assumption is that code-based workflows are more flexible. The opposite is true. Code-based definitions are static at deploy time — to change the workflow, you redeploy.",
      "The common assumption is that code-first workflows are always more flexible. Conductor takes a different approach: flexibility comes from treating the orchestration graph as data. Code-first definitions are often static at deploy time, so changing workflow topology usually means redeploying.",
    );
    output = output.replace(
      "Combined, these primitives make Conductor the most dynamic workflow engine available — not despite using JSON, but because of it. A JSON definition is data, and data is easy to generate, transform, and compose programmatically. Code is not.",
      "Together, these primitives let Conductor support highly dynamic workflows without turning generated source code into the deployment unit. JSON definitions are data, and data is easy to generate, transform, and compose programmatically.",
    );
    output = output.replace(
      "Code-based workflow engines require the workflow topology to be known at compile time.",
      "Code-first workflow engines often require more of the workflow topology to be known before deployment.",
    );
    output = output.replace(
      "Code-based workflow engines require generated code to be compiled, tested, and deployed before it runs — a friction that fundamentally limits how dynamically an AI system can operate.",
      "Code-first workflow approaches often require generated workflow code to be compiled, tested, and deployed before it runs, which adds friction when an AI system needs to create or change orchestration at runtime.",
    );
  }

  if (route === "developer-guides/conductor-skills") {
    output = appendBeforeNextSteps(
      output,
      [
        "## Conductor Skills and Agentspan",
        "",
        "Conductor Skills help AI coding agents create, run, monitor, debug, and manage Conductor workflows and workers. They are authoring and operations instructions for coding agents.",
        "",
        AGENTSPAN_RELATIONSHIP_COPY,
        "",
        "Do not describe Conductor Skills as the agent runtime. Conductor Skills are instructions for AI coding agents. Agentspan is runtime integration for agent applications that need durable execution through Conductor.",
      ].join("\n"),
    );
  }

  if (route === "category/sdks" || route.startsWith("sdks/")) {
    if (route === "category/sdks") {
      output = insertAfterIntro(
        output,
        [
          "## Maintenance and compatibility",
          "",
          "Conductor SDKs are open source under the Conductor OSS organization. Conductor OSS continues as an actively maintained open-source project, with Orkes contributing maintenance, engineering, documentation, and enterprise support.",
          "",
          "Use Orkes Conductor credentials when connecting these SDKs to Orkes clusters. Use local or OSS server configuration when connecting to Conductor OSS.",
        ].join("\n"),
      );
    } else if (route !== "sdks/authentication" && !output.includes("Is this project actively maintained?")) {
      output = insertAfterIntro(
        output,
        [
          '!!! note "Maintenance"',
          "    This SDK is part of the Conductor OSS ecosystem. Conductor OSS remains actively maintained under the Conductor OSS community, with Orkes contributing maintenance, engineering, documentation, and enterprise support.",
        ].join("\n"),
      );
    }
    output = output.replace(
      /Yes\. \[Orkes\]\(https:\/\/orkes\.io\) is the primary maintainer and offers an enterprise SaaS platform for Conductor across all major cloud providers\./g,
      "Yes. Conductor OSS continues as an actively maintained open-source project under the Conductor OSS community, with Orkes contributing maintenance, engineering, documentation, and enterprise support. The original Netflix project history is part of Conductor's origin story; the current project continues under the Conductor OSS organization.",
    );
    output = output.replace(
      /Yes\. This client works with Conductor OSS and Orkes Conductor\. Conductor originated at Netflix and was later contributed to the open-source foundation\./g,
      "Yes. This client works with Conductor OSS and Orkes Conductor. Conductor originated at Netflix and continues under the Conductor OSS community, with Orkes as a major contributor and enterprise maintainer.",
    );
  }

  return output;
}

function demoteExtraH1(body) {
  const lines = body.split(/\r?\n/);
  let seenH1 = false;
  let inFence = false;
  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return line;
      }
      if (inFence || !/^#\s+/.test(line)) return line;
      if (!seenH1) {
        seenH1 = true;
        return line;
      }
      return `#${line}`;
    })
    .join("\n");
}

function transformSharedBody(body, entry) {
  let output = body
    .replace(/\n## ⭐ Conductor OSS[\s\S]*?(?=\n## |\n# |$)/g, "\n")
    .replace(
      /https:\/\/orkes\.io\/content\/docs\/getting-started\/concepts\/access-control/g,
      "/content/category/access-control-and-security",
    )
    .replace(
      /https:\/\/orkes\.io\/content\/how-to-videos\/access-key-and-secret/g,
      "/content/sdks/authentication#retrieving-access-keys",
    );

  output = demoteExtraH1(output);

  if (entry && entry.route === "reference-docs/system-tasks/noop") {
    output +=
      "\n\n## When to use NOOP\n\nUse `NOOP` when a workflow branch needs an explicit successful step but does not need to call a worker, system task, or external service. It is useful as a default branch in a `SWITCH`, a placeholder while building workflow definitions, or a safe join point for generated workflows.\n";
  }

  if (entry && entry.route === "developer-guides/conductor-skills") {
    output = output.replace(
      "# Build with AI agents",
      "# Build with AI Agents",
    );
    output = output.replace(
      "```bash\nexport CONDUCTOR_SERVER_URL=http://localhost:8080/api\n```",
      "```bash\nexport CONDUCTOR_SERVER_URL=http://localhost:8080/api\n```\n\nFor Orkes Conductor, connect to your Orkes cluster API endpoint and provide API credentials:\n\n```bash\nexport CONDUCTOR_SERVER_URL=https://<your-cluster>.orkesconductor.io/api\nexport CONDUCTOR_AUTH_KEY=<your-key>\nexport CONDUCTOR_AUTH_SECRET=<your-secret>\n```",
    );
  }

  if (entry && entry.route === "category/tutorials") {
    output = output.replace(
      /\n-   \*\*\[AI & LLM orchestration recipes\]\([^)]+\)\*\*\n\n    .+\n/g,
      "\n",
    );
    output = output.replace(
      /\n-   \*\*\[Event-driven recipes\]\([^)]+\)\*\*\n\n    .+\n/g,
      "\n",
    );
    output = output.replace(
      /\n<\/div>\s*$/m,
      `\n-   **[Human in the loop](/content/developer-guides/orchestrating-human-tasks)**\n\n    User forms, assignments, approvals, escalations, and human review steps inside durable workflows.\n\n-   **[Gateway tutorials](/content/tutorials/mcp)**\n\n    End-to-end examples for exposing workflows as HTTP APIs and MCP tools.\n\n</div>`,
    );
    output = output.replace(/\n{3,}(-   \*\*\[Dynamic workflows as code\])/g, "\n\n$1");
  }

  return output;
}

function convertEntry(entry) {
  const file = entry.file || entry;
  const sourceRel = entry.sourceRel || sourceRelFromFile(file);
  const contents = read(file);
  const faq = sourceRel === "faqs/general-faqs.mdx" ? convertFaqPage(contents) : null;
  if (faq) return faq;

  const { frontMatter, body } = splitFrontMatter(contents);
  const route = routeBySource.get(sourceRel);
  if (route === "") {
    return makeHomePage();
  }
  const title = extractTitle(body, frontMatter, route);
  const pageTitle = pageTitleForRoute(route, title);
  const pageDescription = pageDescriptionForRoute(route, frontMatter.description, pageTitle);
  const sourceBody = entry.shared ? transformSharedBody(body, entry) : body;
  const cleaned = enhancePositioningPage(
    enhanceApiReferencePage(cleanMdx(sourceBody, sourceRel), route, pageTitle, pageDescription),
    route,
  );
  return `${buildFrontMatter(frontMatter, route, pageTitle)}${cleaned}`;
}

function makeHomePage() {
  return `---
hide:
  - navigation
  - toc
description: "Orkes Conductor documentation for building durable workflows, API orchestration, microservice orchestration, and AI agent orchestration."
---

<div class="home-wrapper">

<div class="hero">
  <h1 class="hero-title">Build unbreakable workflows<br/><span class="hero-highlight">and AI agents.</span></h1>
  <p class="hero-subtitle">Orkes Conductor is the managed enterprise platform for Conductor OSS, a durable workflow engine for production AI agents and distributed systems.</p>
  <p class="hero-differentiators">Keep your frameworks and services. Add durable execution, human waits, retries, replay, and governance.</p>
  <div class="hero-actions">
    <a href="${DEVELOPER_EDITION_URL}" class="btn-primary">Start for free<span class="btn-arrow">&rarr;</span></a>
    <a href="${BASE_URL}/quickstarts" class="btn-ghost">Read the quickstarts</a>
  </div>
  <div class="hero-install"><code>$ npm install -g @conductor-oss/conductor-cli</code></div>
  <div class="hero-ai-card">
    <div class="hero-ai-header">
      <h3>Build with AI Agents</h3>
    </div>
    <div class="hero-ai-body">
      <div class="hero-ai-item">
        <a href="${BASE_URL}/agentic-workflow-engine" class="hero-ai-link">Agentic Workflow Engine &rarr;</a>
        <span class="hero-ai-sub">Persist state, retries, waits, tool calls, and audit history for production agents.</span>
      </div>
      <div class="hero-ai-item">
        <a href="${BASE_URL}/ai-orchestration/production-agent-architecture" class="hero-ai-link">Production Agent Architecture &rarr;</a>
        <span class="hero-ai-sub">Keep reasoning in the agent framework and move execution into Conductor.</span>
      </div>
    </div>
  </div>
</div>

<div class="value-strip">
  <div class="value-item"><div class="value-metric">Persisted state</div><div class="value-label">Resume After Failure</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Isolated retries</div><div class="value-label">Only Failed Steps Retry</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Durable waits</div><div class="value-label">Humans, Timers, Callbacks</div></div>
  <div class="value-divider"></div>
  <div class="value-item"><div class="value-metric">Execution history</div><div class="value-label">Inputs, Outputs, Audit</div></div>
</div>

<div class="features-section" id="built-for-production">
  <div class="section-header-inline">
    <h2>Built for workflows that can't afford to fail.</h2>
  </div>
  <div class="features-grid">
    <div class="feature-card feature-accent">
      <div class="feature-tag">Core</div>
      <h3>Durable execution by default</h3>
      <p>Workflow state is persisted at every step. Survive server restarts, worker crashes, and network failures with retries, timeouts, and compensation flows.</p>
      <a href="${BASE_URL}/error-handling" class="feature-link">Failure semantics &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">Primitives</div>
      <h3>Replay, restart, pause, resume</h3>
      <p>Pause workflows on time, external signals, webhooks, or human approval. Resume safely after minutes, hours, or days.</p>
      <a href="${BASE_URL}/developer-guides/running-workflows" class="feature-link">How it works &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">AI</div>
      <h3>AI agent orchestration</h3>
      <p>Run production agents as durable workflows. Keep agent frameworks for reasoning and use Conductor for state, tool execution, approvals, retries, and auditability.</p>
      <a href="${BASE_URL}/agentic-workflow-engine" class="feature-link">Agentic workflow engine &rarr;</a>
    </div>
    <div class="feature-card">
      <div class="feature-tag">Workers</div>
      <h3>Polyglot workers</h3>
      <p>Write task workers with SDKs in Python, Java, Go, .NET/C#, Ruby, Rust, and TypeScript, or from any service that can poll the task API.</p>
      <a href="${BASE_URL}/developer-guides/using-workers" class="feature-link">Worker guide &rarr;</a>
    </div>
  </div>
</div>

<div class="arch-section">
  <div class="section-header-inline">
    <h2>Understand the engine.</h2>
  </div>
  <div class="arch-grid">
    <a href="${BASE_URL}/conductor-architecture" class="arch-card">
      <div class="arch-number">01</div>
      <h3>Architecture</h3>
      <p>Worker-task queues, persistence, polling, and distributed execution.</p>
    </a>
    <a href="${BASE_URL}/core-concepts" class="arch-card">
      <div class="arch-number">02</div>
      <h3>Core Concepts</h3>
      <p>Workflows, tasks, workers, and workflow executions.</p>
    </a>
    <a href="${BASE_URL}/reference-docs/worker-task" class="arch-card">
      <div class="arch-number">03</div>
      <h3>Worker Tasks</h3>
      <p>How custom workers poll, execute, and complete tasks.</p>
    </a>
    <a href="${BASE_URL}/reference-docs/system-tasks/http" class="arch-card">
      <div class="arch-number">04</div>
      <h3>System Tasks</h3>
      <p>Built-in task primitives for HTTP, events, AI, and more.</p>
    </a>
  </div>
</div>

<div class="resources-section">
  <div class="section-header-inline">
    <h2>More resources.</h2>
  </div>
  <div class="resources-grid">
    <a href="https://www.orkes.io/changelog" class="resource-card">
      <span class="resource-kicker">Product updates</span>
      <h3>Changelog</h3>
      <p>See what's new in Orkes Conductor: features, enhancements, and product updates.</p>
      <span class="resource-link">View changelog &rarr;</span>
    </a>
    <a href="https://orkes.io/academy/" class="resource-card">
      <span class="resource-kicker">Learning</span>
      <h3>Academy</h3>
      <p>Learn workflow orchestration with hands-on labs, structured paths, and certification from Orkes.</p>
      <span class="resource-link">Explore courses &rarr;</span>
    </a>
    <a href="https://orkes.io/blog/" class="resource-card">
      <span class="resource-kicker">Articles</span>
      <h3>Blog</h3>
      <p>Technical use cases, community posts, and product updates from the Orkes team.</p>
      <span class="resource-link">Read blogs &rarr;</span>
    </a>
  </div>
</div>

<div class="faq-section">
  <div class="section-header-inline">
    <h2>Frequently asked questions.</h2>
  </div>
  <div class="faq-grid">
    <details class="faq-item">
      <summary>How do I run Orkes Conductor?</summary>
      <p>Use Developer Edition to start quickly, or follow the setup guide to connect to Orkes Cloud.</p>
    </details>
    <details class="faq-item">
      <summary>Can Orkes Conductor orchestrate AI agents and LLMs?</summary>
      <p>Yes. Orkes Conductor supports native AI tasks, LLM providers, vector databases, MCP tools, and human-in-the-loop workflows. It is the durable execution runtime under production agents.</p>
    </details>
    <details class="faq-item">
      <summary>Is Conductor still maintained?</summary>
      <p>Yes. Conductor OSS continues as an actively maintained open-source project under the Conductor OSS community, with Orkes contributing maintenance, engineering, documentation, and enterprise support.</p>
    </details>
    <details class="faq-item">
      <summary>Is Conductor an AI framework?</summary>
      <p>No. Use agent frameworks for reasoning, prompts, and model-specific loops; use Conductor for durable execution, persisted state, retries, waits, human approval, auditability, and governance.</p>
    </details>
    <details class="faq-item">
      <summary>Can I replay or retry workflows?</summary>
      <p>Yes. Conductor preserves execution state so you can retry failed tasks, rerun from a task, or restart workflows.</p>
    </details>
    <details class="faq-item">
      <summary>Is Orkes Conductor compatible with Conductor OSS?</summary>
      <p>Yes. Orkes Conductor is built on Conductor and keeps compatibility with the core engine and APIs.</p>
    </details>
  </div>
</div>

</div>
`;
}

function generatedPageCopy(route, title, description, flatChildren) {
  if (route === "category/tutorials") {
    return cookbookPageCopy();
  }
  if (route === "tutorials/mcp") {
    return gatewayTutorialPageCopy();
  }
  if (route === "category/event-driven-orchestration") {
    return eventDrivenOrchestrationPageCopy();
  }

  const copy = CATEGORY_PAGE_COPY[route];
  const childLabels = flatChildren.slice(0, 5).map((child) => child.label).filter(Boolean);
  const intro =
    (copy && copy.audience) ||
    `Use this section when you need documentation about ${title.toLowerCase()} in Orkes Conductor.`;
  const outcome =
    (copy && copy.outcome) ||
    `Start with the overview pages, then move into the reference or tutorial that matches the workflow, worker, API, or integration you are implementing.`;
  const lines = [];

  if (description) lines.push(description, "");
  lines.push(intro, "");
  lines.push(outcome, "");

  if (childLabels.length) {
    lines.push("## Recommended path", "");
    lines.push(
      `If you are unsure where to begin, start with ${childLabels
        .map((label) => `**${label}**`)
        .join(", ")}. These pages cover the most common entry points for this section.`,
      "",
    );
  }

  lines.push("## When to use this section", "");
  lines.push(
    `Use these pages to answer implementation questions, compare available primitives, and find the exact guide or reference page for the next step in your Orkes Conductor project.`,
    "",
  );

  return lines;
}

function gatewayTutorialPageCopy() {
  return [
    "Use these Orkes-specific tutorials when you want to expose a Conductor workflow as a callable endpoint.",
    "",
    "Pick API Gateway when an application or internal service should call a workflow over HTTP. Pick MCP Gateway when an AI agent should call a governed workflow as a tool.",
    "",
    "For concepts, configuration details, and production guidance, use **Guides > API Gateway & Service Orchestration**. The links below stay focused on buildable tutorials.",
    "",
  ];
}

function eventDrivenOrchestrationPageCopy() {
  return [
    "Use this section when Conductor workflows need to react to external events, receive webhooks, publish messages, or coordinate with Kafka, RabbitMQ, NATS, SQS, Pub/Sub, IBM MQ, and other event systems.",
    "",
    "The pages here are grouped by job-to-be-done instead of by product feature, so you can move from trigger design to task configuration, broker setup, webhook examples, and API automation without jumping across Guides, Reference, and Integrations.",
    "",
    "## Choose a path",
    "",
    "- Use **Receive Events** when an outside system should start a workflow, resume a waiting workflow, or send callback data.",
    "- Use **Publish Events** when a workflow should emit a message to another system as part of durable execution.",
    "- Use **Message Broker Integrations** before production rollout so Kafka, RabbitMQ/AMQP, NATS, SQS, Azure Service Bus, GCP Pub/Sub, or IBM MQ are configured and permissioned.",
    "- Use **Webhook Examples** when you need a concrete provider or custom webhook implementation.",
    "- Use **API Reference** when event handler or webhook definitions need to be automated.",
    "",
  ];
}

function generatedPageListHeading(route) {
  if (route === "tutorials/mcp") return "Tutorials";
  if (route === "category/event-driven-orchestration") return "Sections";
  return "Pages";
}

function generatedPageListIntro(route) {
  if (route === "tutorials/mcp") {
    return ["Choose the tutorial that matches the caller:", ""];
  }
  if (route === "category/event-driven-orchestration") {
    return ["Start with the section that matches the event flow you are building:", ""];
  }
  return [];
}

function generatedPageLabel(route, child) {
  if (route === "tutorials/mcp") {
    if (child.label === "Build a Feedback API using API Gateway") {
      return "Build a Feedback API using API Gateway";
    }
    if (child.label === "Build a Ticket Service using MCP Gateway") {
      return "Build a Ticket Service using MCP Gateway";
    }
  }
  return child.label;
}

function generatedPageListLine(route, child) {
  const routeForChild = routeFromOutRel(child.outRel);
  const label = generatedPageLabel(route, child);
  if (route === "tutorials/mcp" && label === "Build a Feedback API using API Gateway") {
    return `- [${label}](${routeToUrl(routeForChild)}) - expose a workflow as an HTTP API.`;
  }
  if (route === "tutorials/mcp" && label === "Build a Ticket Service using MCP Gateway") {
    return `- [${label}](${routeToUrl(routeForChild)}) - expose a workflow as an MCP tool for agents.`;
  }
  return `- [${label}](${routeToUrl(routeForChild)})`;
}

function generatedPageListCopy(route, flat) {
  if (!flat.length) return [];
  const lines = [`## ${generatedPageListHeading(route)}`, ""];
  lines.push(...generatedPageListIntro(route));
  for (const child of flat) {
    lines.push(generatedPageListLine(route, child));
  }
  lines.push("");
  return lines;
}

function cookbookPageCopy() {
  return [
    "Production-ready workflow recipes. Each recipe points to the workflow pattern, implementation path, and operational guidance you can adapt for Orkes Conductor.",
    "",
    "Use this cookbook when you want a working orchestration pattern instead of a reference description: microservice orchestration, dynamic parallelism, scheduled automation, retries, waits, gateways, and human review.",
    "",
    "## Recipe categories",
    "",
    `<div class="grid cards" markdown>`,
    "",
    "-   **[Microservice orchestration](/content/general-templates)**",
    "",
    "    HTTP service chains, conditional branching, parallel service calls, long-running APIs, and backend orchestration patterns.",
    "",
    "-   **[Dynamic parallelism](/content/reference-docs/operators/dynamic-fork)**",
    "",
    "    Dynamic forks, fan-out with the same task, fan-out with different tasks, and parallel sub-workflows.",
    "",
    "-   **[Wait and timer patterns](/content/reference-docs/operators/wait)**",
    "",
    "    Fixed delays, scheduled execution, external signals, and human-in-the-loop approvals.",
    "",
    "-   **[Human in the loop](/content/developer-guides/orchestrating-human-tasks)**",
    "",
    "    User forms, assignments, approvals, escalations, and human review steps inside durable workflows.",
    "",
    "-   **[Task timeouts and retries](/content/error-handling)**",
    "",
    "    Exponential backoff, retry limits, response timeouts, workflow timeouts, rate limits, and failure handling.",
    "",
    "-   **[Scheduled workflows](/content/developer-guides/scheduling-workflows)**",
    "",
    "    Cron-triggered execution, catchup behavior, bounded time windows, input parameterization, and concurrent execution handling.",
    "",
    "-   **[Gateway tutorials](/content/tutorials/mcp)**",
    "",
    "    Expose workflows as HTTP APIs and MCP tools backed by durable workflow execution.",
    "",
    "-   **[Dynamic workflows as code](/content/developer-guides/write-workflows-using-code)**",
    "",
    "    Workflow-as-code examples for complex orchestration logic beyond hand-written JSON, including branches, loops, workers, and generated definitions.",
    "",
    `</div>`,
    "",
    "## Recommended path",
    "",
    "1. Use **Microservice orchestration** or **Gateway tutorials** when coordinating APIs, services, and externally callable workflows.",
    "2. Use **Dynamic parallelism** and **Dynamic workflows as code** when the workflow shape depends on runtime input or application logic.",
    "3. Use **Human in the loop** for approvals, assignments, and review checkpoints.",
    "4. Review **Task timeouts and retries** before production rollout so each workflow has explicit failure behavior.",
    "",
  ];
}

function createGeneratedPage(route, title, description, children) {
  if (generatedPages.has(route) || titleByRoute.has(route)) {
    return;
  }
  const pageTitle = pageTitleForRoute(route, title);
  const pageDescription = pageDescriptionForRoute(route, description, pageTitle);
  const flat = flattenNavItems(children || []);
  const lines = [
    "---",
    `title: ${yamlString(pageTitle)}`,
    pageDescription ? `description: ${yamlString(pageDescription)}` : "",
    "---",
    "",
    `# ${pageTitle}`,
    "",
  ].filter((line) => line !== "");
  lines.push(...generatedPageCopy(route, pageTitle, pageDescription, flat));
  lines.push(...generatedPageListCopy(route, flat));
  generatedPages.set(route, lines.join("\n"));
  titleByRoute.set(route, pageTitle);
}

function categoryPageForLink(link, fallbackLabel, children) {
  if (!link) return null;
  if (link.type === "doc") {
    const outRel = outByDocId.get(link.id);
    if (!outRel) warnings.push(`Missing doc link for category ${fallbackLabel}: ${link.id}`);
    return { outRel, label: fallbackLabel };
  }
  if (link.type === "generated-index") {
    const route = normalizeRouteFromSlug(link.slug, "index.md");
    createGeneratedPage(route, link.title || fallbackLabel, link.description || "", children);
    return { outRel: routeToOutRel(route), label: link.title || fallbackLabel };
  }
  return null;
}

function autogeneratedItems(dirName) {
  const prefix = `${dirName.replace(/\/$/, "")}/`;
  const items = [];
  const seenOutRels = new Set();
  for (const [sourceRel, route] of routeBySource.entries()) {
    const id = sourceDocId(sourceRel);
    if (!id.startsWith(prefix)) continue;
    const outRel = routeToOutRel(route);
    if (seenOutRels.has(outRel)) continue;
    seenOutRels.add(outRel);
    items.push({
      id,
      route,
      outRel,
      label: titleByRoute.get(route) || id.split("/").pop(),
      position: readPositionForSource(sourceRel),
    });
  }
  return items
    .sort((a, b) => {
      if (a.position !== b.position) return a.position - b.position;
      return a.label.localeCompare(b.label);
    })
    .map((item) => ({ label: item.label, outRel: item.outRel }));
}

function readPosition(file) {
  const { frontMatter } = splitFrontMatter(read(file));
  const value = Number(frontMatter.sidebar_position);
  return Number.isFinite(value) ? value : 10000;
}

function readPositionForSource(sourceRel) {
  const file = sourceFileByRel.get(sourceRel) || path.join(SOURCE_DOCS, sourceRel);
  if (!fs.existsSync(file)) return 10000;
  return readPosition(file);
}

function navFromItems(items) {
  const nav = [];
  for (const item of items || []) {
    if (typeof item === "string") {
      const outRel = outByDocId.get(item);
      if (outRel) nav.push({ [titleForOutRel(outRel, item)]: outRel });
      else warnings.push(`Missing doc id in nav: ${item}`);
      continue;
    }
    if (!item || typeof item !== "object") continue;
    if (item.type === "doc") {
      const outRel = outByDocId.get(item.id);
      if (outRel) nav.push({ [item.label || titleForOutRel(outRel, item.id)]: outRel });
      else warnings.push(`Missing doc id in nav: ${item.id}`);
      continue;
    }
    if (item.type === "link") {
      const href = String(item.href || "").trim();
      const route = routeFromSidebarHref(href);
      if (route === null) nav.push({ [item.label || href]: href });
      else nav.push({ [item.label || titleForOutRel(routeToOutRel(route), route)]: routeToOutRel(route) });
      continue;
    }
    if (item.type === "category") {
      const page = categoryPageForLink(item.link, item.label, item.items);
      const children = [];
      if (page && page.outRel) {
        children.push({ [page.label || item.label]: page.outRel });
      }
      children.push(...navFromItems(item.items || []));
      nav.push({ [item.label]: children });
      continue;
    }
    if (item.type === "autogenerated") {
      for (const generated of autogeneratedItems(item.dirName)) {
        nav.push({ [generated.label]: generated.outRel });
      }
    }
  }
  return nav;
}

function yamlNav(items, indent = 0) {
  const spaces = " ".repeat(indent);
  const lines = [];
  for (const entry of items) {
    const [[label, value]] = Object.entries(entry);
    if (Array.isArray(value)) {
      lines.push(`${spaces}- ${yamlKey(label)}:`);
      lines.push(...yamlNav(value, indent + 2));
    } else {
      lines.push(`${spaces}- ${yamlKey(label)}: ${value}`);
    }
  }
  return lines;
}

function yamlKey(label) {
  return /[:{}\[\],&*#?|\-<>=!%@`]/.test(label) ? yamlString(label) : label;
}

function createCookbookGeneratedPages() {
  const workflowPatternItems = [
    { type: "doc", id: "tutorials/long-running-apis", label: "Long-Running APIs" },
    { type: "doc", id: "tutorials/api-processing-usps-example", label: "API Orchestration" },
    { type: "doc", id: "tutorials/sequential-http-tasks", label: "Sequential HTTP Tasks" },
    {
      type: "doc",
      id: "tutorials/keep-worker-running-until-condition-true",
      label: "Worker Loops",
    },
    { type: "doc", id: "reference-docs/operators/dynamic-fork", label: "Dynamic Parallelism" },
    { type: "doc", id: "reference-docs/operators/wait", label: "Wait and Timer Patterns" },
    { type: "doc", id: "developer-guides/scheduling-workflows", label: "Scheduled Workflows" },
    { type: "doc", id: "developer-guides/error-handling", label: "Timeouts, Retries, and Compensation" },
    { type: "doc", id: "developer-guides/write-workflows-using-code", label: "Workflows as Code" },
  ];
  const gatewayItems = [
    { type: "doc", id: "tutorials/feedback-tutorial", label: "Build a Feedback API using API Gateway" },
    { type: "doc", id: "tutorials/ticket-service-tutorial", label: "Build a Ticket Service using MCP Gateway" },
  ];
  const eventItems = [
    { type: "doc", id: "developer-guides/webhook-integration", label: "Using Webhooks" },
    { type: "doc", id: "developer-guides/event-handler", label: "Using Event Handlers" },
    { type: "doc", id: "developer-guides/idempotency", label: "Idempotency" },
    { type: "doc", id: "tutorials/custom-conductor-webhook-using-curl", label: "Custom Webhook with cURL" },
    { type: "doc", id: "tutorials/incoming-webhook-using-postman", label: "Incoming Webhook with Postman" },
    {
      type: "doc",
      id: "tutorials/using-idempotency-keys-in-webhook-triggered-workflows",
      label: "Variable Idempotency Keys",
    },
    { type: "doc", id: "tutorials/github-webhook", label: "GitHub Webhook" },
    { type: "doc", id: "tutorials/stripe-webhook", label: "Stripe Webhook" },
    { type: "doc", id: "tutorials/daily-scrum-automation-using-standup-bot", label: "Slack Webhook" },
    { type: "doc", id: "tutorials/sendgrid-webhook", label: "SendGrid Webhook" },
    { type: "doc", id: "tutorials/microsoft-teams-webhook", label: "Microsoft Teams Webhook" },
  ];
  const documentItems = [
    { type: "doc", id: "tutorials/document-approvals", label: "Document Approval" },
    { type: "doc", id: "tutorials/document-classifier", label: "Document Classification" },
    { type: "doc", id: "tutorials/document-retrieval", label: "Document Retrieval Workflow" },
  ];
  const financeItems = [
    { type: "doc", id: "tutorials/finance", label: "Loan Approval Workflow" },
    { type: "doc", id: "tutorials/fraud-dispute", label: "Handling Fraud Disputes" },
  ];
  const alertItems = [
    {
      type: "doc",
      id: "tutorials/scanning-an-endpoint-and-triggering-pagerduty-alert",
      label: "PagerDuty Alert Workflow",
    },
    {
      type: "doc",
      id: "tutorials/availability-monitoring-for-http-endpoints",
      label: "Monitor HTTP Endpoints",
    },
  ];
  const cookbookSections = [
    { type: "doc", id: "cookbook/microservice-orchestration", label: "Microservice orchestration" },
    { type: "doc", id: "cookbook/dynamic-parallelism", label: "Dynamic parallelism" },
    { type: "doc", id: "cookbook/wait-and-timers", label: "Wait and timer patterns" },
    { type: "doc", id: "developer-guides/orchestrating-human-tasks", label: "Human in the loop" },
    { type: "doc", id: "cookbook/task-timeouts-and-retries", label: "Task timeouts and retries" },
    { type: "doc", id: "cookbook/workflow-scheduling", label: "Scheduled workflows" },
    { type: "link", href: "/tutorials/mcp", label: "Gateway tutorials" },
    { type: "doc", id: "cookbook/dynamic-workflows", label: "Dynamic workflows as code" },
  ];

  createGeneratedPage(
    "category/tutorials",
    "Cookbook",
    "Orkes Conductor cookbook with workflow recipes for microservices, dynamic parallelism, retries, timers, scheduling, gateways, and human review.",
    cookbookSections,
  );
  createGeneratedPage(
    "general-templates",
    "Workflow Patterns",
    "Cookbook recipes for common Conductor workflow patterns, including API orchestration, long-running workflows, loops, timers, retries, scheduling, and workflows as code.",
    workflowPatternItems,
  );
  createGeneratedPage(
    "tutorials/mcp",
    "Gateway Tutorials",
    "Orkes Conductor tutorials for exposing workflows as HTTP APIs and MCP tools backed by durable workflow execution.",
    gatewayItems,
  );
  createGeneratedPage(
    "webhook-templates",
    "Events and Webhooks",
    "Cookbook recipes for triggering and resuming Conductor workflows from webhooks, message events, and external systems.",
    eventItems,
  );
  createGeneratedPage(
    "document-templates",
    "Documents",
    "Cookbook recipes for document approval, classification, retrieval, AI processing, and human review workflows.",
    documentItems,
  );
  createGeneratedPage(
    "finance-templates",
    "Finance",
    "Cookbook recipes for finance workflows, including loan approvals, fraud disputes, notifications, and review steps.",
    financeItems,
  );
  createGeneratedPage(
    "category/templates/alerting",
    "Alerts and Notifications",
    "Cookbook recipes for monitoring endpoints, detecting failures, and sending operational alerts from workflows.",
    alertItems,
  );
}

function buildNav() {
  createCookbookGeneratedPages();

  const nav = [];
  for (const [label, sidebarId] of topSections) {
    nav.push({ [label]: navFromItems(sidebars[sidebarId]) });
  }

  const reference = nav.find((entry) => entry.Reference).Reference;
  reference.push({ Integrations: navFromItems(sidebars.integrationsSidebar) });
  nav.push({ Blog: "https://orkes.io/blog/" });

  // Keep legacy indexed category URLs even when their groups are intentionally
  // removed from the visible navigation.
  createGeneratedPage(
    "category/developer-guides",
    "Developer Guides",
    "Explore developer guides for building, running, and managing workflows in Orkes Conductor, covering workers, workflow execution, monitoring, eventing, and orchestration patterns.",
    sidebars.guidesSidebar,
  );

  createGeneratedPage(
    "category/conceptual-guides",
    "Conceptual Guides",
    "Understand the architecture and execution model behind Orkes Conductor workflows, task queues, workers, persistence, and durable orchestration.",
    [
      {
        type: "doc",
        id: "conceptual-guides/architecture",
        label: "Conductor Architecture and Worker Polling",
      },
      { type: "doc", id: "core-concepts" },
    ],
  );

  createGeneratedPage(
    "developer-guides/building-workflows",
    "Building Workflows",
    "Learn the fundamentals of building workflows in Orkes Conductor, including workflow structure, task configuration, parameter wiring, validation, secrets, error handling, and rate limits.",
    [
      { type: "doc", id: "developer-guides/workflows" },
      { type: "doc", id: "developer-guides/write-workflows-using-code" },
      {
        type: "doc",
        id: "developer-guides/build-workflows-using-conductor-ui",
        label: "Build Workflows Using UI",
      },
      { type: "doc", id: "developer-guides/convert-bpmn-to-workflows" },
      { type: "doc", id: "developer-guides/tasks-in-workflows" },
      {
        type: "doc",
        id: "developer-guides/passing-inputs-to-task-in-conductor",
        label: "Parameter Mapping",
      },
      { type: "doc", id: "developer-guides/rate-limits" },
      { type: "doc", id: "developer-guides/error-handling" },
    ],
  );

  createGeneratedPage(
    "workers",
    "Task Workers and Queues",
    "Learn how to configure and manage task workers and queues, including writing workers, scaling them, and routing tasks to the appropriate workers.",
    [
      { type: "doc", id: "developer-guides/using-workers" },
      { type: "doc", id: "developer-guides/scaling-workers" },
      { type: "doc", id: "developer-guides/task-to-domain" },
    ],
  );

  createGeneratedPage(
    "developer-guides/deploying-workflows",
    "Testing, Monitoring, and Querying Workflows",
    "Learn best practices for testing, monitoring, and querying workflow executions, including unit and regression testing, observability metrics, execution search, and CI/CD integration.",
    [
      { type: "doc", id: "developer-guides/unit-and-regression-tests" },
      {
        type: "doc",
        id: "developer-guides/debugging-workflows",
        label: "Search / Query Executions",
      },
      { type: "doc", id: "developer-guides/metrics-and-observability" },
      { type: "doc", id: "developer-guides/integration-with-cicd" },
    ],
  );

  createGeneratedPage(
    "eventing",
    "Eventing",
    "Learn how workflows interact with external systems using event handlers, webhooks, and event publishing for event-driven automation.",
    [
      { type: "doc", id: "developer-guides/event-handler" },
      { type: "doc", id: "developer-guides/webhook-integration" },
    ],
  );

  // Preserve the old Docusaurus /search route even though Material uses a search overlay.
  generatedPages.set(
    "search",
    `---\ntitle: "Search"\ndescription: "Search Orkes Conductor documentation for workflow orchestration, AI agents, APIs, SDKs, integrations, tasks, workers, and operations guides."\n---\n\n# Search\n\nUse the search field in the header to search the Orkes Conductor documentation.\n\nSearch covers developer guides, quickstarts, API references, SDK guides, integration setup, workflow operators, system tasks, AI tasks, tutorials, and operational guidance. Use product terms, task names, endpoint names, SDK languages, or workflow concepts to find the page that matches the implementation detail you need.\n\nFor best results, search for the resource you are configuring, the task type shown in a workflow definition, the API endpoint name, or the operational behavior you are trying to control, such as retries, timeouts, schedules, webhooks, or human approvals.\n`,
  );
  titleByRoute.set("search", "Search");

  return nav;
}

function writeMkdocsConfig(nav) {
  const navLines = yamlNav(nav, 2).join("\n");
const mkdocs = `site_name: Orkes Conductor Documentation
site_description: ${SITE_DESCRIPTION}
site_url: ${SITE_URL}
repo_url: https://github.com/conductor-oss/conductor
edit_uri: ''
strict: false
use_directory_urls: false
docs_dir: mkdocs_content
site_dir: build

nav:
${navLines}

not_in_nav: |
  search.md
  integrations/ai-llm/aws-bedrock-llama2.md

theme:
  name: material
  logo: img/branding/orkes-logo-purple-4x.png
  favicon: img/branding/orkes-favicon-purple.png
  custom_dir: mkdocs_overrides
  palette:
    - scheme: default
      primary: custom
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - scheme: slate
      primary: custom
      toggle:
        icon: material/brightness-4
        name: Switch to light mode
  font: false
  features:
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.indexes
    - navigation.footer
    - navigation.sections
    - navigation.expand
    - navigation.top
    - search.highlight
    - search.suggest
    - content.code.copy
    - content.code.annotate
    - content.tabs.link
    - toc.follow

extra:
  generator: false
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/conductor-oss/conductor
    - icon: fontawesome/brands/slack
      link: https://join.slack.com/t/orkes-conductor/shared_invite/zt-3dpcskdyd-W895bJDm8psAV7viYG3jFA
    - icon: fontawesome/brands/youtube
      link: https://www.youtube.com/@orkesio

extra_css:
  - css/custom.css

plugins:
  - search

markdown_extensions:
  - admonition
  - attr_list
  - md_in_html
  - meta
  - tables
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.details

copyright: Orkes, Inc.
`;
  write(path.join(ROOT, "mkdocs.yml"), mkdocs);
}

function writeOverrides() {
  copyRecursive(path.join(OSS_DOCS, "overrides"), OVERRIDES_DIR);

  write(
    path.join(OVERRIDES_DIR, "partials", "logo.html"),
    `<img class="md-logo__light" src="{{ 'img/branding/orkes-logo-purple-4x.png' | url }}" alt="Orkes">
<img class="md-logo__dark" src="{{ 'img/branding/orkes-logo-purple-inverted-4x.png' | url }}" alt="Orkes">
`,
  );

  const mainPath = path.join(OVERRIDES_DIR, "main.html");
  let main = read(mainPath);
  main = main.replace(
    /{% block extrahead %}/,
    `{% block site_meta %}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  {% set site_meta_desc = page.meta.description if page and page.meta and page.meta.description else config.site_description %}
  {% if site_meta_desc %}
    <meta name="description" content="{{ site_meta_desc }}">
  {% endif %}
  {% if page and page.url %}
    {% if page.url == "index.html" or page.url.endswith("/index.html") %}
      {% set site_meta_path = page.url[:-10] %}
    {% elif page.url.endswith(".html") %}
      {% set site_meta_path = page.url[:-5] %}
    {% else %}
      {% set site_meta_path = page.url %}
    {% endif %}
    <link rel="canonical" href="{{ config.site_url }}{{ site_meta_path }}">
  {% else %}
    <link rel="canonical" href="{{ config.site_url }}">
  {% endif %}
  {% if page.previous_page %}
    <link rel="prev" href="{{ page.previous_page.url | url }}">
  {% endif %}
  {% if page.next_page %}
    <link rel="next" href="{{ page.next_page.url | url }}">
  {% endif %}
  <link rel="icon" href="{{ config.theme.favicon | url }}">
  <meta name="generator" content="mkdocs-{{ mkdocs_version }}, mkdocs-material-9.7.5">
{% endblock %}

{% block htmltitle %}
  {% if page and not page.is_homepage %}
    {% set resolved_title = page.meta.title if page.meta and page.meta.title else page.title %}
    <title>{{ resolved_title | striptags }} | Orkes Docs</title>
  {% else %}
    <title>Orkes Conductor Docs</title>
  {% endif %}
{% endblock %}

{% block extrahead %}`,
  );
  main = main.replace(
    /{% set page_title = page\.title ~ " — " ~ config\.site_name if page and page\.title else config\.site_name ~ " — Durable Execution Engine" %}/,
    `{% set resolved_title = page.meta.title if page and page.meta and page.meta.title else page.title if page and page.title else "" %}
  {% set page_title = resolved_title ~ " | Orkes Docs" if resolved_title else "Orkes Conductor Docs" %}`,
  );
  main = main.replace(
    /{% set page_url = config\.site_url ~ page\.url if page and page\.url else config\.site_url %}/,
    `{% if page and page.url %}
    {% if page.url == "index.html" or page.url.endswith("/index.html") %}
      {% set page_path = page.url[:-10] %}
    {% elif page.url.endswith(".html") %}
      {% set page_path = page.url[:-5] %}
    {% else %}
      {% set page_path = page.url %}
    {% endif %}
  {% else %}
    {% set page_path = "" %}
  {% endif %}
  {% if page and page.meta and page.meta.canonical_route %}
    {% set page_path = page.meta.canonical_route %}
  {% endif %}
  {% set page_url = config.site_url ~ page_path %}
  {% set page_schema_id = page_url ~ "#webpage" %}
  {% set article_schema_id = page_url ~ "#techarticle" %}
  {% set source_code_schema_id = page_url ~ "#sourcecode" %}
  {% set page_keywords = page.meta.keywords if page and page.meta and page.meta.keywords else "Orkes Conductor, durable execution, workflow orchestration, agentic workflows, AI agents" %}
  {% set page_updated = page.meta.updated if page and page.meta and page.meta.updated else "${DOCS_LAST_MODIFIED}" %}`,
  );
  main = main.replace(
    /  <!-- SEO -->\n  <meta name="description" content="{{ page_desc }}" \/>\n  <link rel="canonical" href="{{ page_url }}" \/>/,
    `  <!-- SEO description and canonical are emitted in site_meta. -->`,
  );
  main = main.replace(/https:\/\/conductor-oss\.github\.io\/conductor/g, "https://orkes.io/content");
  main = main.replace(/"name": "Conductor"/g, `"name": "Orkes Conductor"`);
  main = main.replace(
    /"alternateName": \["Conductor OSS", "Netflix Conductor"\]/g,
    `"alternateName": ["Conductor OSS", "Netflix Conductor", "Orkes Conductor"]`,
  );
  main = main.replace(
    /<!-- Structured Data: SoftwareApplication -->[\s\S]*?<\/script>/,
    `<!-- Structured Data: Orkes Conductor -->
  {% if page and page.url != '404.html' %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://orkes.io/#organization",
        "name": "Orkes",
        "url": "https://orkes.io",
        "logo": "{{ config.site_url }}img/branding/orkes-logo-purple-4x.png",
        "sameAs": [
          "https://github.com/orkes-io"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "{{ config.site_url }}#website",
        "name": "Orkes Conductor Documentation",
        "url": "{{ config.site_url }}",
        "publisher": { "@id": "https://orkes.io/#organization" },
        "inLanguage": "en"
      },
      {
        "@type": "WebPage",
        "@id": "{{ page_schema_id }}",
        "url": "{{ page_url }}",
        "name": "{{ page_title }}",
        "description": "{{ page_desc }}",
        "isPartOf": { "@id": "{{ config.site_url }}#website" },
        "about": { "@id": "https://orkes.io/#orkes-conductor" },
        "dateModified": "{{ page_updated }}",
        "inLanguage": "en"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://orkes.io/#orkes-conductor",
        "name": "Orkes Conductor",
        "alternateName": ["Conductor", "Conductor OSS", "Netflix Conductor"],
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "Agentic workflow engine",
        "operatingSystem": "Cloud, Kubernetes, Docker, JVM",
        "description": "{{ config.site_description }}",
        "url": "{{ config.site_url }}",
        "publisher": { "@id": "https://orkes.io/#organization" },
        "maintainer": { "@id": "https://orkes.io/#organization" },
        "programmingLanguage": ["Java", "Python", "Go", "JavaScript", "TypeScript", "C#", "Ruby", "Rust"],
        "keywords": ["agentic workflow engine", "durable execution", "AI agent orchestration", "LLM orchestration", "microservice orchestration", "workflow automation", "MCP", "human in the loop"],
        "isBasedOn": {
          "@type": "SoftwareSourceCode",
          "name": "Conductor OSS",
          "codeRepository": "https://github.com/conductor-oss/conductor",
          "license": "https://www.apache.org/licenses/LICENSE-2.0"
        }
      }
    ]
  }
  </script>
  {% endif %}`,
  );
  main = main.replace(
    /"item": "{{ config\.site_url }}{{ parts\[:loop\.index\] \| join\('\/'\) }}\/{{ part }}"/g,
    `"item": "{{ config.site_url }}{{ parts[:loop.index] | join('/') }}"`,
  );
  main = main.replace(
    /{% set parts = page\.url\.replace\("index\.html", ""\)\.rstrip\("\/"\)\.split\("\/"\) %}/,
    `{% set parts = page_path.rstrip("/").split("/") %}`,
  );
  main = main.replace(
    /<!-- Structured Data: FAQPage \(homepage only\) -->/,
    `<!-- Structured Data: TechArticle -->
  {% if page and page.url and page.url != 'index.html' and page.url != '404.html' %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": "{{ article_schema_id }}",
    "headline": "{{ resolved_title }}",
    "description": "{{ page_desc }}",
    "url": "{{ page_url }}",
    "mainEntityOfPage": { "@id": "{{ page_schema_id }}" },
    "isPartOf": { "@id": "{{ config.site_url }}#website" },
    "about": [
      { "@id": "https://orkes.io/#orkes-conductor" },
      { "@type": "Thing", "name": "durable execution" },
      { "@type": "Thing", "name": "workflow orchestration" },
      { "@type": "Thing", "name": "agentic workflows" }
    ],
    "keywords": "{{ page_keywords }}",
    "datePublished": "{{ page_updated }}",
    "dateModified": "{{ page_updated }}",
    "inLanguage": "en",
    "publisher": { "@id": "https://orkes.io/#organization" },
    "author": { "@id": "https://orkes.io/#organization" }
  }
  </script>
  {% endif %}

  <!-- Structured Data: SoftwareSourceCode (SDK and code examples) -->
  {% if page and page.url and page.url != '404.html' and (
    page_path.startswith("sdks/")
    or page_path.startswith("developer-guides/write-workflows")
    or page_path.startswith("developer-guides/using-workers")
    or page_path.startswith("developer-guides/scaling-workers")
    or page_path == "developer-guides/tasks"
    or page_path.startswith("quickstarts/")
  ) %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": "{{ source_code_schema_id }}",
    "name": "{{ resolved_title }} code examples",
    "description": "Code examples for building Orkes Conductor workflows, workers, and integrations.",
    "url": "{{ page_url }}",
    "isPartOf": { "@id": "{{ article_schema_id }}" },
    "targetProduct": { "@id": "https://orkes.io/#orkes-conductor" },
    "programmingLanguage": ["Python", "Java", "Go", "C#", "Ruby", "Rust", "TypeScript", "JavaScript"],
    "runtimePlatform": "Orkes Conductor",
    "publisher": { "@id": "https://orkes.io/#organization" }
  }
  </script>
  {% endif %}

  <!-- Structured Data: FAQPage (visible FAQ section only) -->`,
  );
  main = main.replace(
    /<!-- Structured Data: FAQPage \((?:homepage only|visible FAQ section only)\) -->[\s\S]*?<\/script>/,
    `<!-- Structured Data: FAQPage (visible FAQ section only) -->
  {% if page and page.url == 'index.html' %}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I run Orkes Conductor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use Developer Edition to start quickly, or follow the setup guide to connect to Orkes Cloud."
        }
      },
      {
        "@type": "Question",
        "name": "Can Orkes Conductor orchestrate AI agents and LLMs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Orkes Conductor supports native AI tasks, LLM providers, vector databases, and human-in-the-loop workflows."
        }
      },
      {
        "@type": "Question",
        "name": "Can I replay or retry workflows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Orkes Conductor preserves execution state so you can retry failed tasks, rerun from a task, or restart workflows."
        }
      },
      {
        "@type": "Question",
        "name": "Is Orkes Conductor compatible with Conductor OSS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Orkes Conductor is built on Conductor and keeps compatibility with the core engine and APIs."
        }
      }
    ]
  }
  </script>`,
  );
  write(mainPath, main);

  const notFoundPath = path.join(OVERRIDES_DIR, "404.html");
  if (fs.existsSync(notFoundPath)) {
    let notFound = read(notFoundPath);
    notFound = notFound
      .replace(/{{ config\.site_url }}quickstart\//g, "{{ config.site_url }}quickstarts")
      .replace(/{{ config\.site_url }}devguide\/ai\//g, "{{ config.site_url }}ai-orchestration");
    write(notFoundPath, notFound);
  }
}

function copySharedAssets(entries) {
  const copied = new Set();
  for (const entry of entries) {
    if (!entry.shared) continue;
    const sourceDir = path.dirname(entry.file);
    const route = routeBySource.get(entry.sourceRel);
    if (route === undefined) continue;
    const routeDir = path.dirname(path.join(OUT_DIR, routeToOutRel(route)));
    if (!fs.existsSync(sourceDir)) continue;
    for (const fileName of fs.readdirSync(sourceDir)) {
      const src = path.join(sourceDir, fileName);
      if (!fs.statSync(src).isFile()) continue;
      if (/\.(md|mdx)$/i.test(fileName)) continue;
      const dest = path.join(routeDir, fileName);
      const key = `${src}\0${dest}`;
      if (copied.has(key)) continue;
      copied.add(key);
      copyRecursive(src, dest);
    }
  }
}

function prepareOutput() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.rmSync(OVERRIDES_DIR, { recursive: true, force: true });
  ensureDir(OUT_DIR);
  copyRecursive(STATIC_DIR, OUT_DIR);
  let customCss = read(path.join(OSS_DOCS, "css", "custom.css"));
  for (const [pattern, replacement] of ORKES_COLOR_REPLACEMENTS) {
    customCss = customCss.replace(pattern, replacement);
  }
  write(path.join(OUT_DIR, "css", "custom.css"), customCss);
  copyRecursive(path.join(OSS_DOCS, "img", "og-conductor.png"), path.join(OUT_DIR, "img", "og-conductor.png"));
  fs.appendFileSync(
    path.join(OUT_DIR, "css", "custom.css"),
    `

/* Orkes docs migration overrides */
:root {
  --c-accent: #6c37bd;
  --c-accent-hover: #492687;
  --c-accent-soft: #f5f4ff;
  --c-accent-border: #dddcf4;
  --c-secondary-accent: #1dcaff;
  --c-header-bg: #1b1730;
  --c-header-border: rgba(255, 255, 255, 0.08);
  --c-header-text: #ffffff;
  --c-header-muted: rgba(255, 255, 255, 0.74);
  --c-header-subtle: rgba(255, 255, 255, 0.08);
  --md-accent-fg-color: var(--c-accent);
}
[data-md-color-scheme="slate"] {
  --c-accent: #baaeff;
  --c-accent-hover: #dddcf4;
  --c-accent-soft: #27223d;
  --c-accent-border: #342960;
  --c-secondary-accent: #1dcaff;
  --c-header-bg: #1b1730;
  --c-header-border: rgba(255, 255, 255, 0.08);
  --c-header-text: #ffffff;
  --c-header-muted: rgba(255, 255, 255, 0.74);
  --c-header-subtle: rgba(255, 255, 255, 0.08);
  --md-accent-fg-color: var(--c-accent);
}
.md-header,
.md-tabs {
  background: var(--c-header-bg) !important;
  color: var(--c-header-text) !important;
  border-bottom-color: var(--c-header-border) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
.md-header[data-md-state="shadow"] {
  box-shadow: none !important;
}
.md-header__title,
.md-header__topic,
.md-header__button,
.md-header .md-icon,
.md-header .md-source,
.md-header .md-source__repository,
.md-header .md-social__link {
  color: var(--c-header-text) !important;
}
.md-tabs__link {
  color: var(--c-header-muted) !important;
  border: 1px solid transparent;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  min-height: 1.8rem;
  padding: 0.25rem 0.62rem;
  transition: color 140ms ease, background 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
}
.md-tabs__item--active > .md-tabs__link,
.md-tabs__link--active,
.md-tabs__link:hover {
  color: var(--c-header-text) !important;
}
.md-tabs__item--active > .md-tabs__link {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.16);
  border-bottom-color: var(--c-secondary-accent);
  box-shadow: none;
  font-weight: 700;
}
.md-tabs__link:hover {
  background: rgba(255, 255, 255, 0.08);
}
.md-tabs__item--active > .md-tabs__link:hover {
  background: rgba(255, 255, 255, 0.12);
}
.md-search__form {
  background: var(--c-header-subtle) !important;
  border: 1px solid var(--c-header-border) !important;
  box-shadow: none !important;
}
.md-search__form:hover,
.md-search__form:focus-within {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.md-search__input,
.md-search__input::placeholder,
.md-search__icon {
  color: var(--c-header-muted) !important;
}
.md-search__input:focus,
.md-search__input:focus::placeholder {
  color: var(--c-header-text) !important;
}
.md-header__button.md-logo {
  width: auto !important;
  height: 2.4rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  margin-right: 0.8rem !important;
  padding: 0 !important;
}
.md-logo img {
  height: 34px !important;
  width: auto !important;
  max-width: 148px;
  object-fit: contain;
}
.md-logo .md-logo__light {
  display: none !important;
}
.md-logo .md-logo__dark {
  display: block !important;
}
[data-md-color-scheme="slate"] .md-logo img {
  filter: none !important;
}
[data-md-color-scheme="slate"] .md-logo .md-logo__light {
  display: none !important;
}
[data-md-color-scheme="slate"] .md-logo .md-logo__dark {
  display: block !important;
}
.section-label,
.install-rec {
  background: color-mix(in srgb, var(--c-accent) 10%, transparent) !important;
  border-color: color-mix(in srgb, var(--c-accent) 20%, transparent) !important;
}
.btn-primary:hover {
  box-shadow: 0 4px 14px color-mix(in srgb, var(--c-accent) 30%, transparent) !important;
}
a.repo-link:hover {
  box-shadow: var(--shadow-elevated), 0 0 20px color-mix(in srgb, var(--c-accent) 15%, transparent) !important;
}
.feature-card.feature-accent {
  background: linear-gradient(135deg, color-mix(in srgb, var(--c-accent) 6%, transparent) 0%, var(--c-bg-secondary) 100%) !important;
}
.lang-logos a:hover {
  background: color-mix(in srgb, var(--c-accent) 10%, transparent) !important;
}
.resources-section {
  padding: 32px 0;
}
.home-wrapper .section-header-inline h2 {
  font-family: var(--font-body) !important;
  font-size: 32px !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  color: var(--c-text) !important;
  letter-spacing: 0;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.diagram-node,
.diagram-task {
  fill: var(--c-bg-tertiary);
}
.diagram-callout {
  fill: var(--c-bg);
  stroke: #9aa3a6;
  stroke-width: 3;
}
.diagram-text {
  fill: var(--c-text);
  font-family: var(--font-body);
  font-size: 22px;
}
.diagram-arrow,
.diagram-curve {
  fill: none;
  stroke: #9aa3a6;
  stroke-width: 3;
}
.diagram-warning {
  fill: #f6b64a;
}
.diagram-warning-text {
  fill: #fff;
  font-family: var(--font-body);
  font-size: 32px;
  font-weight: 700;
}
.diagram-clock-ring {
  fill: none;
  stroke: #9aa3a6;
  stroke-width: 3;
  stroke-dasharray: 26 9;
}
.diagram-tick {
  fill: none;
  stroke: var(--c-text);
  stroke-width: 5;
  stroke-linecap: round;
}
.diagram-failure-arrow {
  fill: none;
  stroke: #d8485a;
  stroke-width: 3;
}
.diagram-subflow rect:first-child {
  fill: transparent;
  stroke: #cbd5d8;
  stroke-width: 3;
  stroke-dasharray: 12 12;
}
.diagram-subflow circle,
.diagram-subflow rect:not(:first-child) {
  fill: #d8dddf;
}
.resources-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.resource-card {
  display: flex;
  flex-direction: column;
  min-height: 210px;
  padding: 22px;
  border: 1px solid var(--c-border-dim);
  border-radius: var(--r-lg);
  background: var(--c-bg-secondary);
  color: var(--c-text) !important;
  text-decoration: none !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.resource-card:hover {
  border-color: var(--c-accent);
  box-shadow: var(--shadow-card);
  transform: translateY(-2px);
}
.resource-kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-text-dim);
  margin-bottom: 16px;
}
.home-wrapper .resource-card h3 {
  font-family: var(--font-body) !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  color: var(--c-text) !important;
  margin: 0 0 10px !important;
  padding: 0 !important;
}
.resource-card p {
  color: var(--c-text-muted);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}
.resource-link {
  margin-top: auto;
  padding-top: 18px;
  color: var(--c-accent);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
}
.md-sidebar--primary .md-nav__title,
.md-sidebar--primary .md-nav__title[for],
.md-sidebar--primary .md-nav__item--section > .md-nav__link {
  background: var(--c-bg) !important;
  z-index: 3;
}
.md-sidebar--primary .md-nav__title,
.md-sidebar--primary .md-nav__title[for] {
  display: block !important;
  position: sticky !important;
  top: 0 !important;
  min-height: 2rem;
  line-height: 1.4;
  padding-top: 0.45rem !important;
  padding-bottom: 0.35rem !important;
}
@media screen and (min-width: 76.25em) {
  .md-sidebar--primary .md-nav__title,
  .md-sidebar--primary .md-nav__title[for] {
    display: none !important;
  }
  .md-sidebar--primary .md-nav--lifted > .md-nav__list > .md-nav__item--active > .md-nav__link {
    display: none !important;
  }
  .md-sidebar--primary .md-nav--lifted > .md-nav__list > .md-nav__item--active > .md-nav {
    margin-top: 0 !important;
  }
}
@media (max-width: 760px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
  .home-wrapper .section-header-inline h2 {
    font-size: 24px !important;
  }
  .resource-card {
    min-height: 0;
  }
}
`,
  );
  writeOverrides();
  write(
    path.join(OUT_DIR, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\nLLMs: ${SITE_URL}llms.txt\nLLMs-Full: ${SITE_URL}llms-full.txt\n`,
  );
}

function stripMarkdownFrontMatter(contents) {
  if (!contents.startsWith("---\n")) return contents;
  const end = contents.indexOf("\n---", 4);
  if (end === -1) return contents;
  return contents.slice(contents.indexOf("\n", end + 1) + 1);
}

function cleanMarkdownForLlms(contents) {
  return stripMarkdownFrontMatter(contents)
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<img\b[^>]*alt=["']([^"']*)["'][^>]*>/gi, (_all, alt) => (alt ? `Image: ${alt}` : ""))
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|details|summary|li|tr|td|th)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&rarr;/g, "->")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function routeMarkdownPath(route) {
  return path.join(OUT_DIR, routeToOutRel(route));
}

function writeLlmsTxt() {
  const routes = [...titleByRoute.keys()]
    .filter((route) => route !== "search")
    .sort();
  const canonicalRoutes = [
    "agentic-workflow-engine",
    "ai-orchestration/production-agent-architecture",
    "ai-orchestration/failure-semantics",
    "ai-orchestration/durable-agents",
    "ai-orchestration/mcp-integration",
    "developer-guides/conductor-skills",
    "developer-guides/write-workflows-using-code",
    "developer-guides/using-workers",
    "quickstarts/durable-execution",
    "quickstarts/json-code-native",
  ].filter((route) => titleByRoute.has(route));
  const canonicalLines = canonicalRoutes.map((route) => `- ${titleByRoute.get(route)}: ${SITE_URL}${route}`);
  const introLines = [
    "# Orkes Conductor Documentation",
    "",
    "This file is a machine-readable version of the public Orkes Conductor documentation for AI systems, developer tools, and search systems.",
    "",
    `Source documentation: ${SITE_URL}`,
    `Full documentation dump: ${SITE_URL}llms-full.txt`,
    "Product: Orkes Conductor",
    "Positioning: Managed enterprise platform for Conductor OSS, a durable workflow engine for production AI agents and distributed systems.",
    "",
    "## What is Orkes Conductor?",
    "",
    "Orkes Conductor is the managed enterprise version of Conductor OSS. It orchestrates production workflows, distributed applications, microservices, APIs, human approvals, and AI agents with durable execution and operational visibility.",
    "",
    "Conductor OSS is the actively maintained open-source durable workflow engine under the Conductor OSS community. Orkes contributes maintenance, engineering, documentation, and enterprise support; the original Netflix project history is part of the origin story, not the current maintenance model.",
    "",
    AGENTSPAN_RELATIONSHIP_COPY,
    "",
    "Conductor Skills are authoring and operations instructions for AI coding agents. They are not the runtime. Agentspan is runtime integration for agent applications that need durable execution through Conductor.",
    "",
    "Conductor is not a replacement for agent frameworks. Use frameworks for reasoning, prompts, graph composition, and model-specific loops; use Conductor for durable execution, persisted state, task queues, retries, timeouts, long waits, human approval, replay, governance, and audit history.",
    "",
    "Use Orkes Conductor when work must survive crashes, retries, timeouts, long waits, external callbacks, human approvals, model calls, and worker failures. Define orchestration in Conductor and keep business logic in workers written in Python, Java, Go, .NET/C#, Ruby, Rust, TypeScript, or any service that can poll an API.",
    "",
    "## Core Capabilities",
    "",
    "- Agentic workflows with LLM tasks, vector databases, prompts, MCP tools, and human-in-the-loop steps.",
    "- Durable workflow execution with persisted state, retries, timeouts, rate limits, compensation workflows, pause, resume, restart, and rerun.",
    "- Polyglot workers that execute business logic outside the orchestrator and scale independently.",
    "- Visual workflow graph, execution debugging, task inputs and outputs, logs, metrics, and observability.",
    "- Enterprise access control, tags, applications, secrets, schedules, webhooks, integrations, and API gateway/MCP gateway.",
    "",
    "## Canonical Agentic Workflow Pages",
    "",
    ...canonicalLines,
    "",
    "## Documentation Index",
    "",
  ];

  const conciseLines = [...introLines];
  for (const route of routes) {
    conciseLines.push(`- ${titleByRoute.get(route)}: ${SITE_URL}${route}`);
  }

  conciseLines.push("");
  conciseLines.push("For full page text, use llms-full.txt. This file is intentionally concise so agents can discover canonical docs without ingesting the entire site.");

  const fullLines = [...introLines, "", "## Full Documentation", ""];

  for (const route of routes) {
    const file = routeMarkdownPath(route);
    if (!fs.existsSync(file)) continue;
    const title = titleByRoute.get(route) || route || "Home";
    const url = `${SITE_URL}${route}`;
    const content = cleanMarkdownForLlms(read(file));
    if (!content) continue;
    fullLines.push(`---`);
    fullLines.push(`URL: ${url}`);
    fullLines.push(`Title: ${title}`);
    fullLines.push(`Route: ${routeToUrl(route)}`);
    fullLines.push(`---`);
    fullLines.push("");
    fullLines.push(content);
    fullLines.push("");
  }

  write(path.join(OUT_DIR, "llms.txt"), `${conciseLines.join("\n")}\n`);
  write(path.join(OUT_DIR, "llms-full.txt"), `${fullLines.join("\n")}\n`);
}

function main() {
  const entries = collectSourceEntries();
  collectRoutes(entries);
  prepareOutput();
  copySharedAssets(entries);
  const nav = buildNav();

  for (const entry of entries) {
    const sourceRel = entry.sourceRel;
    const route = routeBySource.get(sourceRel);
    const outRel = routeToOutRel(route);
    write(path.join(OUT_DIR, outRel), convertEntry(entry));
  }

  for (const [route, contents] of generatedPages.entries()) {
    write(path.join(OUT_DIR, routeToOutRel(route)), contents);
  }

  writeLlmsTxt();

  writeMkdocsConfig(nav);

  const routeList = [...titleByRoute.keys()].sort();
  write(path.join(ROOT, ".mkdocs-routes.txt"), `${routeList.join("\n")}\n`);

  if (warnings.length) {
    console.warn("MkDocs conversion warnings:");
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  const sharedCount = entries.filter((entry) => entry.shared).length;
  console.log(
    `Generated ${entries.length} converted pages (${sharedCount} from shared OSS source) and ${generatedPages.size} generated pages.`,
  );
}

main();
