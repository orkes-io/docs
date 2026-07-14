---
title: "Worker Concepts"
description: "Learn about workers in Conductor — the code that executes tasks in workflows, written in any language and hosted anywhere you choose."
canonical_route: "quickstarts/workers"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# Workers
A worker is responsible for executing a task in a workflow. Each type of worker implements the core functionality of each task, handling the logic as defined in its code.

System task workers are managed by Conductor within its JVM, while `SIMPLE` task workers are to be implemented by yourself. These workers can be implemented in any programming language of your choice (Python, Java, JavaScript, C#, Go, Ruby, and Rust) and hosted anywhere outside the Conductor environment.

!!! Note
    Conductor provides a set of worker frameworks in its SDKs. These frameworks come with features like polling threads, metrics, and server communication, making it easy to create custom workers.

These workers communicate with the Conductor server via HTTP, allowing them to poll for tasks and update the task status. Learn more in [Architecture](/content/conductor-architecture).


## How workers work

1. **Poll** — The worker polls the Conductor server for tasks of a specific type.
2. **Execute** — The worker receives a task, executes the business logic, and produces an output.
3. **Report** — The worker reports the task result (COMPLETED or FAILED) back to the server.

Conductor handles scheduling, retries, and state persistence. Your worker just focuses on business logic.


## Worker principles

Keep these in mind when implementing a worker:

- **Stateless** — Workers should not retain workflow-specific state between invocations. Any state needed across steps should be passed through task inputs/outputs, not held in worker memory.
- **Idempotent** — Conductor may retry or reschedule a task, so a worker's logic should produce the same result (and avoid unintended side effects) if invoked more than once for the same input.
- **No built-in retry logic** — Workers should not implement their own retry or backoff logic. Retries, timeouts, and rescheduling are handled entirely by the Conductor server via the task definition's retry settings.


## Worker configuration

Workers are configured through the task definition on the Conductor server. Key settings:

| Parameter | Description |
| :--- | :--- |
| `retryCount` | Number of times Conductor retries a failed task. |
| `retryDelaySeconds` | Delay between retries. |
| `responseTimeoutSeconds` | Max time for a worker to respond after polling. |
| `timeoutSeconds` | Overall SLA for task completion. |
| `pollTimeoutSeconds` | Max time for a worker to poll before timeout. |
| `rateLimitPerFrequency` | Max task executions per frequency window. |
| `concurrentExecLimit` | Max concurrent executions across all workers. |

See [Task Definitions](/content/reference-docs/api/metadata/creating-task-definitions) for the full reference.


## Scaling task workers

Workers can be scaled independently of the Conductor server:

- **Horizontal scaling** — Run multiple instances of the same worker. Conductor distributes tasks across all polling workers automatically.
- **Rate limiting** — Use `rateLimitPerFrequency` to control throughput per task type.
- **Concurrency limits** — Use `concurrentExecLimit` to cap parallel executions.
- **Domain isolation** — Use [task domains](/content/developer-guides/task-to-domain) to route tasks to specific worker groups.

See [Scaling Workers](/content/developer-guides/scaling-workers) for detailed guidance.
