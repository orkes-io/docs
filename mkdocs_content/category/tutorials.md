---
title: "Cookbook"
description: "Orkes Conductor cookbook with workflow recipes for microservices, dynamic parallelism, retries, timers, scheduling, gateways, and human review."
---
# Cookbook
Production-ready workflow recipes. Each recipe points to the workflow pattern, implementation path, and operational guidance you can adapt for Orkes Conductor.

Use this cookbook when you want a working orchestration pattern instead of a reference description: microservice orchestration, dynamic parallelism, scheduled automation, retries, waits, gateways, and human review.

## Recipe categories

<div class="grid cards" markdown>

-   **[Microservice orchestration](/content/cookbook/microservice-orchestration)**

    HTTP service chains, conditional branching, parallel HTTP calls with Fork/Join.

-   **[Dynamic parallelism](/content/cookbook/dynamic-parallelism)**

    Dynamic forks — different tasks per branch, fan-out with the same task, parallel sub-workflows.

-   **[Wait and timer patterns](/content/cookbook/wait-and-timers)**

    Fixed delays, scheduled execution, external signals, and human-in-the-loop approvals.

-   **[Task timeouts and retries](/content/cookbook/task-timeouts-and-retries)**

    Exponential backoff, lease extension for long-running workers, hard SLA with totalTimeoutSeconds, and concurrency limiting.

-   **[Scheduled workflows](/content/cookbook/workflow-scheduling)**

    Cron-triggered execution, catchup after downtime, bounded time windows, input parameterization, and concurrent execution handling.

-   **[Gateway tutorials](/content/tutorials/mcp)**

    Expose workflows as HTTP APIs and MCP tools backed by durable workflow execution.

-   **[Dynamic workflows as code](/content/cookbook/dynamic-workflows)**

    Workflow as code in Python — sequential chains, conditional branching, parallel execution, loops, sub-workflows, and runtime-generated definitions.

</div>

## Recommended path

1. Use **Microservice orchestration** or **Gateway tutorials** when coordinating APIs, services, and externally callable workflows.
2. Use **Dynamic parallelism** and **Dynamic workflows as code** when the workflow shape depends on runtime input or application logic.
3. Review **Task timeouts and retries** before production rollout so each workflow has explicit failure behavior.

## Pages

- [Microservice orchestration](/content/cookbook/microservice-orchestration)
- [Dynamic parallelism](/content/cookbook/dynamic-parallelism)
- [Wait and timer patterns](/content/cookbook/wait-and-timers)
- [Task timeouts and retries](/content/cookbook/task-timeouts-and-retries)
- [Scheduled workflows](/content/cookbook/workflow-scheduling)
- [Gateway tutorials](/content/tutorials/mcp)
- [Dynamic workflows as code](/content/cookbook/dynamic-workflows)
