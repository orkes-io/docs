---
title: "System Tasks"
description: "Overview of built-in system tasks in Conductor — HTTP, Event, Human, Wait, Inline, Kafka Publish, JSON JQ Transform, LLM orchestration, MCP function calling."
canonical_route: "category/reference-docs/system-tasks"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# System Tasks

System tasks are built-in tasks that run on the Conductor server. They execute without external workers, allowing you to build workflows using common operations out of the box.

## Available system tasks

| System Task | Type | Description |
| :--- | :--- | :--- |
| [HTTP](/content/reference-docs/system-tasks/http) | `HTTP` | Call any HTTP/REST endpoint. Supports GET, POST, PUT, DELETE with headers, body, and connection/read timeouts. |
| [Inline](/content/reference-docs/system-tasks/inline) | `INLINE` | Execute lightweight JavaScript or Python expressions server-side using GraalJS. Useful for data transformation, validation, and simple logic. |
| [Event](/content/reference-docs/system-tasks/event) | `EVENT` | Publish events to external systems — Kafka, NATS, NATS Streaming, AMQP (RabbitMQ), SQS, or Conductor's internal queue. |
| [Wait](/content/reference-docs/operators/wait) | `WAIT` | Pause workflow execution until a specified time, duration, or external signal. |
| [Human](/content/reference-docs/operators/human) | `HUMAN` | Wait for an external signal, typically a human approval or manual action. The task stays `IN_PROGRESS` until completed via API. |
| [Kafka Publish](/content/reference-docs/system-tasks/kafka-publish) | `KAFKA_PUBLISH` | Publish messages directly to a Kafka topic with configurable serializers and headers. |
| [JSON JQ Transform](/content/reference-docs/system-tasks/jq-transform) | `JSON_JQ_TRANSFORM` | Transform JSON data using [jq](https://jqlang.org/) expressions. Powerful for reshaping, filtering, and aggregating data. |
| [No Op](/content/reference-docs/system-tasks/noop) | `NOOP` | Do nothing. Useful as a placeholder or to merge branches in fork/join patterns. |
| [JDBC](/content/reference-docs/system-tasks/jdbc) | `JDBC` | Execute SQL queries and updates against relational databases (MySQL, PostgreSQL, Oracle, etc.) with connection pooling and transaction management. |

## Operators (flow control)

These are also system tasks but control workflow execution flow rather than performing work:

| Operator | Type | Description |
| :--- | :--- | :--- |
| [Fork/Join](/content/reference-docs/operators/fork-join) | `FORK_JOIN` | Execute tasks in parallel branches, then join. |
| [Dynamic Fork](/content/reference-docs/operators/dynamic-fork) | `FORK_JOIN_DYNAMIC` | Dynamically create parallel branches at runtime. |
| [Join](/content/reference-docs/operators/join) | `JOIN` | Wait for parallel branches to complete. |
| [Switch](/content/reference-docs/operators/switch) | `SWITCH` | Conditional branching based on expressions or values. |
| [Do While](/content/reference-docs/operators/do-while) | `DO_WHILE` | Loop over tasks until a condition is met. |
| [Sub Workflow](/content/reference-docs/operators/sub-workflow) | `SUB_WORKFLOW` | Execute another workflow as a task. |
| [Start Workflow](/content/reference-docs/operators/start-workflow) | `START_WORKFLOW` | Start another workflow asynchronously (fire-and-forget). |
| [Set Variable](/content/reference-docs/operators/set-variable) | `SET_VARIABLE` | Set or update workflow-level variables. |
| [Terminate](/content/reference-docs/operators/terminate) | `TERMINATE` | Terminate the workflow with a specified status. |
| [Dynamic](/content/reference-docs/operators/dynamic) | `DYNAMIC` | Determine the task type to execute at runtime. |

## AI & LLM tasks

Conductor is the only open-source workflow engine with native AI system tasks. These tasks require the `ai` module to be enabled and provide direct integration with 14+ LLM providers, 3 vector databases, and MCP servers — no external frameworks or custom workers needed.

### LLM

| Task | Type | Description |
| :--- | :--- | :--- |
| Chat Completion | `LLM_CHAT_COMPLETE` | Multi-turn conversational AI with optional tool calling. Supports all major LLM providers. |
| Text Completion | `LLM_TEXT_COMPLETE` | Single prompt completion. |

**Supported providers:** Anthropic (Claude), OpenAI (GPT), Azure OpenAI, Google Gemini, AWS Bedrock, Mistral, Cohere, HuggingFace, Ollama, Perplexity, Grok (xAI), StabilityAI, and more. Switch providers by changing a configuration parameter — no code changes required.

### Embeddings & Vector Search

| Task | Type | Description |
| :--- | :--- | :--- |
| Generate Embeddings | `LLM_GENERATE_EMBEDDINGS` | Convert text to vector embeddings. |
| Store Embeddings | `LLM_STORE_EMBEDDINGS` | Store pre-computed embeddings in a vector database. |
| Index Text | `LLM_INDEX_TEXT` | Store text with auto-generated embeddings in a vector database. |
| Search Index | `LLM_SEARCH_INDEX` | Semantic search using a text query. |
| Search Embeddings | `LLM_SEARCH_EMBEDDINGS` | Search using embedding vectors directly. |

**Supported vector databases:** Pinecone, pgvector (PostgreSQL), and MongoDB Atlas Vector Search. These enable RAG (retrieval-augmented generation) pipelines as standard Conductor workflows.

### Content Generation

| Task | Type | Description |
| :--- | :--- | :--- |
| Generate Image | `GENERATE_IMAGE` | Generate images from text prompts. |
| Generate Audio | `GENERATE_AUDIO` | Text-to-speech synthesis. |
| Generate Video | `GENERATE_VIDEO` | Generate videos from text or image prompts (async). |
| Generate PDF | `GENERATE_PDF` | Convert markdown to PDF documents. |

### MCP (Model Context Protocol)

| Task | Type | Description |
| :--- | :--- | :--- |
| List MCP Tools | `LIST_MCP_TOOLS` | List available tools from an MCP server. |
| Call MCP Tool | `CALL_MCP_TOOL` | Execute a tool on an MCP server. |

MCP integration enables Conductor workflows to discover and use tools from any MCP-compatible server, and to expose Conductor workflows as MCP tools for use by LLMs and AI agents.

## Deprecated

| Task | Replacement |
| :--- | :--- |
| Lambda | Use [Inline](/content/reference-docs/system-tasks/inline) instead. |
| Decision | Use [Switch](/content/reference-docs/operators/switch) instead. |
