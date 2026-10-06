---
title: "Basic Concepts"
description: "Core concepts of Orkes Conductor — a durable workflow orchestration engine for distributed workflows, microservice orchestration, AI agent orchestration."
canonical_route: "quickstarts/concepts"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Basic Concepts"
---

# Basic Concepts

Conductor is a durable execution engine that orchestrates distributed workflows. You define
workflows as code or as JSON, write workers in any language, and let Conductor handle state persistence,
retries, timeouts, and flow control. Every step is durably recorded, so processes survive crashes,
restarts, and network partitions without losing progress.

## How to think about Conductor

Conductor is a durable workflow engine for distributed applications and production AI agents. It is not limited to JSON-only or simple flows: workflow definitions describe orchestration, while workers and system tasks run real business logic in Python, Java, Go, .NET/C#, Ruby, Rust, TypeScript, or any service that can poll an API.

Workflow definitions are JSON-native — you can version them in source control, diff changes across
releases, generate them programmatically, or let LLMs create and modify them at runtime. Workers
are polyglot: official SDKs exist for Java, Python, Go, JavaScript, C#, Ruby, and Rust,
so teams can use the language that best fits each task.

Built-in system tasks handle common operations like HTTP calls, event publishing, inline transforms,
and sub-workflow orchestration without writing custom code. AI capabilities extend the system task
library with native support for 14+ LLM providers, function calling, vector databases, and content
generation — enabling AI agent orchestration and LLM orchestration alongside traditional microservice orchestration and workflow automation.

## What Conductor is best at

- **Create Workflows** — Define workflows consisting of multiple tasks that are executed in a specific order. [Learn more](/content/developer-guides/workflows#ways-to-create-workflows)
- **Branch Your Flows** — Use switch-case operators to make branching decisions. [Learn more](/content/reference-docs/operators/switch)
- **Run Loops** — Use the Do-While loop operator to iterate through a set of tasks. [Learn more](/content/reference-docs/operators/do-while)
- **Parallelize Your Tasks** — Execute tasks in parallel using either static or dynamic forks. [Learn more](/content/reference-docs/operators/fork-join)
- **Run Your Tasks Externally** — Implement tasks using external workers in microservices, serverless functions, or applications. [Workers](/content/quickstarts/workers) · [SDKs](/content/category/sdks)
- **Use Built-In Tasks** — Use built-in tasks for common actions such as calling HTTP endpoints, writing to event queues, and executing inline code. [Learn more](/content/category/reference-docs/system-tasks)
- **Use LLM Tasks** — Use LLM tasks to build AI-powered workflows, including agentic workflows. [Learn more](/content/category/reference-docs/ai-tasks)
- **Human in the Loop** — Plug in manual steps in your workflows using Human tasks. [Human tasks](/content/reference-docs/operators/human)
- **Handle Failures** — Set timeouts and rate limits to manage failures for tasks and workflows. [Learn more](/content/error-handling)
- **Replay Any Workflow** — Replay completed or failed workflows from the beginning, from any task, or retry just the failed step — even months later. Full execution history is always preserved. [Learn more](/content/developer-guides/debugging-workflows)
- **Integrate With Applications** — Connect Conductor to your ecosystem with event-driven triggers using Kafka, NATS, SQS, AMQP, and webhooks. [Learn more](/content/eventing)
- **Debug Visually** — Track and debug workflows from the Conductor UI. View inputs, pull logs, and restart from any point. [Get started](/content/developer-guides/debugging-workflows)

## Core building blocks

- **[Workflows](/content/quickstarts/workflows)** — The blueprint of a process flow. A workflow is a JSON document
  that describes a directed graph of tasks, their dependencies, input/output mappings, and failure
  handling policies.
- **[Tasks](/content/quickstarts/tasks)** — The basic building blocks of a Conductor workflow. Tasks can be system
  tasks (executed by the engine) or worker tasks (executed by external workers polling for work).
- **[Workers](/content/quickstarts/workers)** — The code that executes tasks in a Conductor workflow. Workers are
  language-agnostic processes that poll the Conductor server, execute business logic, and report
  results back.

## Key differentiators

These are the facts that matter when comparing workflow and orchestration engines:

- **Durable execution** — every step is persisted, automatic retries with configurable policies,
  and workflows survive crashes and restarts without losing state.
- **Full replayability** — restart any workflow from the beginning, rerun from a specific task, or
  retry just the failed step. Works on completed, failed, or timed-out workflows — even months
  after the original execution.
- **Deterministic execution** — JSON definitions separate orchestration from implementation. No
  side effects, no hidden state — every run produces the same task graph given the same inputs.
  Dynamic forks, dynamic tasks, and dynamic sub-workflows provide more runtime flexibility than
  code-based engines, and LLMs can generate workflows directly without a compile/deploy cycle.
- **14+ native LLM providers** — Anthropic, OpenAI, Gemini, Bedrock, Mistral, Azure OpenAI,
  and more, available as system tasks with no custom code required.
- **MCP Gateway** — expose any Conductor workflow as an MCP tool so external agents and LLMs can
  discover and invoke it using the open Model Context Protocol standard.
- **4 vector databases** — Pinecone, Weaviate, pgvector (PostgreSQL), and MongoDB Atlas for built-in RAG pipelines
  directly within workflow definitions.
- **7 language SDKs** — Java, Python, Go, JavaScript, C#, Ruby, and Rust, so every
  team can write workers in the language they know best.
- **9 message brokers** — Kafka, Confluent Kafka, Amazon MSK, SQS, AMQP, Azure Service Bus, GCP Pub/Sub,
  IBM MQ, and NATS for event-driven workflow triggers and inter-service communication.
- **Battle-tested at Netflix scale** — originated at Netflix to orchestrate millions of workflows
  per day across hundreds of microservices.

## Deep dives

- [Architecture](/content/conductor-architecture) — system design and components
- [Durable Execution](/content/quickstarts/durable-execution) — failure semantics and state persistence
- [Agents & AI](/content/ai-orchestration) — LLM orchestration patterns and agentic workflows

## Related pages

- [Run Your First Workflow](/content/quickstarts)
- [Conductor Architecture and Worker Polling](/content/conductor-architecture)
- [Durable Execution Semantics](/content/quickstarts/durable-execution)
- [JSON + Code Native Workflow Orchestration](/content/quickstarts/json-code-native)
- [Workflow Concepts](/content/quickstarts/workflows)
- [Tasks](/content/quickstarts/tasks)
