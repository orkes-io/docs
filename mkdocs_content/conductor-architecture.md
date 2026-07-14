---
title: "Conductor Architecture and Worker Polling"
description: "Learn the architecture of Orkes Conductor, including the state machine evaluator, task queues, workers, data stores, and APIs used to orchestrate distributed."
canonical_route: "conductor-architecture"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# Conductor Architecture and Worker Polling

To learn how to scale and integrate with Conductor, it is important to understand its system architecture and worker polling mechanism.

Before you read this article, you should understand:

- [What Orkes Conductor is](/content/category/getting-started)
- [Core concepts](/content/core-concepts)

## System architecture

<p align="center"><img src="/content/img/conductor-architecture.jpg" alt="Conductor architecture" width="90%" height="auto" style="padding-bottom: 10px; padding-top: 10px;" /></p>

In Conductor, a workflow contains tasks in a defined order. You can trigger workflows by code, an API call, a cron schedule, webhooks, or external eventing systems such as AWS SQS, Kafka, Azure Service Bus, GCP Pub/Sub, AMQP, NATS, and IBM MQ. The FIFO guarantee applies to task execution within a running workflow. When workflows are triggered by external event systems like Kafka or SQS, ordering depends on how those systems deliver messages and is not covered by Conductor's internal task queue ordering.

In Conductor, workflows are executed on a worker-task queue architecture, where each task type (HTTP, Event, Wait, and so on) has its own dedicated task queue. The key components of Conductor’s core orchestration engine include:

* **State machine evaluator**: Orchestrates workflows by scheduling tasks to their relevant queues and assigning them to active workers when polled. Monitors each task's state and ensures it is completed, retried, or failed as required.
* **Task queues**: Distributed queues for each task type, where tasks are completed on a first-in-first-out basis.
* **Task workers**: Poll the Conductor server via HTTP for tasks, execute tasks, and update the server on the task status. Each worker is responsible for carrying out a specific task type.
* **Data stores** (Postgres and Redis): High-availability persistence stores that maintain workflow and task metadata, task queues, and execution history
* **APIs**: REST APIs for programmatic access to the Conductor server. 

Integrations with tools such as Prometheus and Datadog enable you to collect and monitor system performance data easily. Prometheus metrics can be visualized using Grafana.

The same worker-task queue architecture that orchestrates ordinary workflow tasks also applies when the tasks being orchestrated are AI agent calls, which is why Conductor's design extends naturally to agentic systems.

## Agents are distributed systems

Production AI agents are not just prompt loops. Like the workflows described above, they coordinate model calls, tools, APIs, workers, queues, human decisions, webhooks, and external callbacks. Treat the agent framework as the reasoning layer and Conductor as the execution layer that makes that reasoning durable.

Conductor provides the runtime primitives production agents need:

- **Persisted state** for plans, prompts, tool inputs, tool outputs, retries, approvals, and final results.
- **Task queues** so model calls, MCP tools, HTTP calls, and custom workers can scale independently.
- **Timeouts and retries** so stalled model calls or tools are recovered without restarting the whole agent.
- **Human and wait states** that survive deploys, restarts, and multi-day pauses.
- **Replay and recovery** through retry, rerun, restart, and workflow version snapshots.
- **Audit history** for every tool call, side effect, human approval, and failure.

This is why Conductor is a durable workflow engine for both distributed applications and production AI agents. In both cases, the underlying task workers are what carry out the actual work that Conductor orchestrates, so understanding how workers are implemented and how they poll Conductor is the next step.

## Worker implementation

System task workers are managed by Conductor. On the other hand, external workers can be implemented in any language and can run on any environment, including bare metal, containers, VMs, or serverless functions. Conductor offers [SDKs](/content/category/sdks) with features such as polling threads, metrics, and server communication to simplify worker creation.

## Worker-server polling mechanism

Each worker declares beforehand which tasks it can execute, and the Conductor server assigns tasks to workers accordingly. At runtime, task workers poll the Conductor server to receive and execute scheduled work. Conductor passes task inputs to the worker for execution and collects the outputs, continuing the process according to the workflow definition. 

By default, workers infinitely poll Conductor every 100ms. The polling interval value for each type of worker can be adjusted accordingly based on factors like workload. Here is the polling mechanism in detail:

<p align="center"><img src="/content/img/conceptual-guides/Worker-Interaction-Diagram.jpg" alt="Worker-server interaction with Conductor." width="90%" height="auto" style="padding-bottom: 5px; padding-top: 5px;" /></p>

The following sequence describes how workers poll Conductor and execute workflow tasks:

1. The application starts a workflow execution by interacting with Conductor, which returns a workflow (execution) ID. It can be used to track the workflow's progress and manage its execution.
2. Conductor schedules the first task in the workflow to its task queue.
3. The workers responsible for executing the first task within the workflow poll Conductor for tasks to execute via HTTP. When a task is scheduled, Conductor sends it to the next available worker, which then performs the required work.
4. Periodically, the worker returns the task status to the Conductor (e.g., IN PROGRESS, FAILED, COMPLETED, etc.).
5. Once the first task in the workflow execution is completed, the worker returns the task output to the server, and Conductor schedules the next set of tasks to be performed.

Conductor manages and maintains the workflow state, keeping track of which tasks have been completed and which are still pending. This ensures that the workflow is executed correctly, with each task triggered precisely at the right time.

Using the workflow ID, the application can check the Conductor server for the workflow status at any time. This is particularly useful for asynchronous or long-running workflows, as it enables the application to monitor their progress and take appropriate action, such as pausing or terminating them if needed.
