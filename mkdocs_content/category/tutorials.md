---
title: "Cookbook"
description: "Orkes Conductor cookbook with workflow recipes for microservices, dynamic parallelism, retries, timers, scheduling, gateways, and human review."
---

# Cookbook

Production-ready workflow recipes. Each recipe includes the complete JSON workflow definition and commands to register and run it.

<div class="grid cards" markdown>

-   **[Microservice orchestration](/content/general-templates)**

    HTTP service chains, conditional branching, parallel HTTP calls with Fork/Join.

-   **[Dynamic parallelism](/content/cookbook/dynamic-parallelism)**

    Dynamic forks — different tasks per branch, fan-out with same task, parallel sub-workflows.

-   **[Wait and timer patterns](/content/cookbook/wait-and-timers)**

    Fixed delays, scheduled execution, external signals, and human-in-the-loop approvals.

-   **[Task timeouts and retries](/content/cookbook/task-timeouts-and-retries)**

    Exponential backoff with cap and jitter, lease extension for long-running workers, hard SLA with totalTimeoutSeconds, and thundering herd prevention.

-   **[Scheduled workflows](/content/cookbook/workflow-scheduling)**

    Cron-triggered execution, catchup after downtime, bounded time windows, input parameterization, and concurrent execution handling.

-   **[Dynamic workflows as code](/content/cookbook/dynamic-workflows)**

    Workflow as code in Python — sequential chains, conditional branching, parallel execution, loops, sub-workflows, and runtime-generated definitions.

-   **[Human in the loop](/content/developer-guides/orchestrating-human-tasks)**

    User forms, assignments, approvals, escalations, and human review steps inside durable workflows.

-   **[Gateway tutorials](/content/tutorials/mcp)**

    End-to-end examples for exposing workflows as HTTP APIs and MCP tools.

</div>
