---
title: "Task Queues"
description: "Use the Orkes Conductor tasks API to task Queues. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/task/task-queue"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Task Queues

Use the Task Queue APIs to retrieve task queue sizes and polling data for tasks in your Conductor cluster.

Task queue data helps operators understand whether workers are keeping up with scheduled task volume. Use these endpoints to inspect queue depth across all task types, check the queue size for a specific task type, and review poll data that shows whether workers are actively polling the expected queues.

These APIs are useful for dashboards, alerts, worker autoscaling, and incident response. For production systems, monitor both queue size and last poll data so you can distinguish between normal backlog, missing workers, misconfigured task domains, and workers that are online but not polling the expected task type.


## In this section

- [Get Poll Data for All Tasks](/content/reference-docs/api/task/task-queue/get-poll-data-for-all-task)
- [Get Task Queue Size for All Tasks](/content/reference-docs/api/task/task-queue/get-task-queue-size-for-all-tasks)
- [Get Task Queue Size for a Task Type](/content/reference-docs/api/task/task-queue/get-task-queue-size-for-individual-tasks)
