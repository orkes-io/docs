---
title: "Tasks"
description: "Learn about tasks in Conductor — the reusable building blocks of workflows, including system tasks, worker tasks, operators, and LLM tasks with 14+ AI."
canonical_route: "quickstarts/tasks"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Tasks"
---

# Tasks

A task is the basic building block of a Conductor workflow. They are reusable and modular, representing steps in your application like processing data files, calling an AI model, or executing some logic.

In Conductor, tasks can be defined, configured, and then executed. Learn more about the distinct but related concepts, **task definition**, **task configuration**, and **task execution** below.


## Types of tasks

Tasks are categorized into three types, enabling you to flexibly build workflows using pre-built tasks, custom logic, or a combination of both:

### System tasks

Conductor ships with built-in, general-purpose [system tasks](/content/category/reference-docs/system-tasks) designed for common uses like calling an HTTP endpoint, publishing events, or running AI inference.

System tasks are managed by Conductor and executed within its server's JVM, allowing you to get started without having to write custom workers.

| Category | Tasks |
|---|---|
| **Core** | HTTP, Inline (script), Event, JSON JQ Transform |
| **AI / LLM** | Chat Completion, Text Completion, Embeddings, Vector Search |

### Worker tasks

Worker tasks (`SIMPLE`) can be used to implement custom logic outside the scope of Conductor's system tasks. Also known as Simple tasks, Worker tasks are implemented by your task workers that run in a separate environment from Conductor.

A minimal worker task configuration and its corresponding Python worker:

This is the task configuration, placed in the workflow's `tasks` array:

```json
{
  "name": "process_payment",
  "taskReferenceName": "process_payment_ref",
  "type": "SIMPLE",
  "inputParameters": {
    "orderId": "${workflow.input.orderId}",
    "amount": "${workflow.input.amount}"
  }
}
```

This is the worker that fulfills it — its `task_definition_name` must match the task's `name` above, and its parameters must match `inputParameters`:

```python
@worker_task(task_definition_name="process_payment")
def process_payment(orderId: str, amount: float) -> dict:
    result = payment_gateway.charge(orderId, amount)
    return {"transactionId": result.id, "status": result.status}
```

### Operators
[Operators](/content/category/reference-docs/operators) are built-in control flow primitives similar to programming language constructs like loops, switch cases, or fork/joins. Like system tasks, operators are also managed by Conductor.


## Task definition

[Task definitions](/content/reference-docs/api/metadata/creating-task-definitions) are used to define a task's default parameters, like inputs and output keys, timeouts, and retries. This provides reusability across workflows, as the registered task definition will be referenced when a task is configured in a workflow definition.

```json
{
  "name": "process_payment",
  "retryCount": 3,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "retryDelaySeconds": 5,
  "backOffScaleFactor": 2,
  "timeoutSeconds": 120,
  "responseTimeoutSeconds": 60,
  "pollTimeoutSeconds": 30
}
```

- **retryCount / retryLogic / retryDelaySeconds** — How many times to retry a failed task, the backoff strategy, and the initial delay between retries.
- **backOffScaleFactor** — The value multiplied with `retryDelaySeconds` to determine the interval for each retry.
- **timeoutSeconds** — Maximum wall-clock time per individual attempt before the task is marked `TIMED_OUT`.
- **responseTimeoutSeconds** — Maximum time to wait for a worker to respond after picking up a task. Useful for detecting unresponsive workers.
- **pollTimeoutSeconds** — Maximum time a worker can hold a long-poll connection before the server releases it.

When using Worker tasks (`SIMPLE`), its task definition must be registered to the Conductor server before it can execute in a workflow. Because system tasks are managed by Conductor, it is not necessary to add a task definition for system tasks unless you wish to customize its default parameters.


## Task configuration

Stored in the `tasks` array of a [workflow definition](/content/quickstarts/workflows#workflow-definition), task configurations make up the workflow-specific blueprint that describes:

- The order and control flow of tasks.
- How data is passed from one task to another through task inputs and outputs.
- Other workflow-specific behavior, like optionality, caching, and schema enforcement.

The specific configuration for each task differs depending on the task type. For system tasks and operators, the task configuration will contain important parameters that control the behavior of the task. For example, the task configuration of an HTTP task will specify an endpoint URL and its templatized payload that will be used when the task executes.

Data is passed between tasks using `${...}` expression syntax. This allows a task to reference outputs from a previous task, workflow inputs, or other context variables:

```json
{
  "name": "send_notification",
  "taskReferenceName": "send_notification_ref",
  "type": "SIMPLE",
  "inputParameters": {
    "recipient": "${workflow.input.email}",
    "paymentId": "${process_payment_ref.output.transactionId}",
    "status": "${process_payment_ref.output.status}"
  }
}
```

For Worker tasks (`SIMPLE`), the configuration will simply contain its inputs/outputs and a reference to its task definition name, because the logic of its behavior will already be specified in the worker code of your application.

There must be at least one task configured in each workflow definition.

## Task execution

A task execution object is created during runtime when an input is passed into a configured task. This object has a unique ID and represents the result of the task operation, including the task status, start time, and inputs/outputs.


## AI and LLM tasks

Conductor includes first-class support for building AI-powered workflows through its AI/LLM [system tasks](/content/category/reference-docs/ai-tasks).

### Supported LLM providers

Conductor integrates with **[14+ LLM providers](/content/category/integrations/ai-llm)** out of the box:

Anthropic, OpenAI, Azure OpenAI, Google Gemini, AWS Bedrock, Mistral, Cohere, HuggingFace, Ollama, Perplexity, Grok, and more.

Each provider is configured once at the server level; workflows reference them by name, making it straightforward to swap models without changing workflow logic.

### Vector databases and RAG

For retrieval-augmented generation (RAG), Conductor supports vector stores including **Pinecone**, **Weaviate**, **pgvector**, and **MongoDB Atlas**. The Embeddings and Vector Search system tasks handle the embedding generation and similarity search steps so that RAG pipelines can be expressed as standard workflows.

## Related pages

- [Run Your First Workflow](/content/quickstarts)
- [Basic Concepts](/content/quickstarts/concepts)
- [Conductor Architecture and Worker Polling](/content/conductor-architecture)
- [Durable Execution Semantics](/content/quickstarts/durable-execution)
- [JSON + Code Native Workflow Orchestration](/content/quickstarts/json-code-native)
- [Workflow Concepts](/content/quickstarts/workflows)
