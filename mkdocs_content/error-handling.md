---
title: "Handling Failures"
description: "Learn how to configure retries, timeouts, and failure workflows to handle task and workflow failures and maintain reliable workflow execution in Orkes Conductor."
canonical_route: "error-handling"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, AI orchestration, LLM orchestration, MCP gateway, agent workflows"
---

# Handling Failures

Conductor handles failure at the orchestration layer: retry transient task failures, reschedule work when workers disappear, time out stuck execution paths, and start a compensation workflow when a business process cannot complete.

!!! tip "5-minute path"
    Configure retries and timeouts on task definitions, configure an end-to-end timeout on workflow definitions, make workers idempotent, and use a failure workflow for cleanup, rollback, notification, or compensation.

!!! note
    To inspect a specific failed execution, see [Search / Query Executions](/content/developer-guides/debugging-workflows).

## Message delivery guarantees

Conductor uses at-least-once delivery for worker tasks. A task can be delivered more than once if a worker crashes, times out, loses network connectivity, or returns a retryable failure.

This gives workflows durability, but it also means worker code must be idempotent. A retried worker should be safe to run again with the same task input.

Common idempotency patterns:

- Use a business key, such as `orderId` or `paymentId`, when calling external systems.
- Make writes conditional or upsert-based.
- Store external operation IDs in task output.
- Return `FAILED_WITH_TERMINAL_ERROR` for invalid input that should not be retried.
- Use [idempotency keys](/content/idempotency) when starting workflows from APIs, queues, or webhooks that can redeliver.

For AI agents and MCP tools, treat every real-world action as a side effect. A retry can otherwise send the same email twice, create duplicate tickets, post duplicate Slack messages, repeat a payment call, rerun a deployment, or call an external tool after the original request eventually succeeds.

Use these safeguards for side-effecting agent steps:

- Pass a stable idempotency key to every external tool that supports one.
- Store the external operation ID in task output so compensation workflows can find it.
- Put irreversible actions behind a `HUMAN` task or policy check when risk is high.
- Use `failureWorkflow` to undo or mitigate partial work, such as closing a duplicate ticket, voiding a payment authorization, or notifying an operator.
- Prefer `FAILED_WITH_TERMINAL_ERROR` when the agent produced invalid or unsafe input that should not be retried automatically.

## Task retries

Task retries are configured on the task definition. They apply to worker tasks and supported system tasks that use the task definition.

Use retries for transient failures:

- Temporary HTTP 5xx responses
- Rate limits
- Network errors
- Worker restarts
- Short-lived dependency outages

Do not use retries to hide deterministic failures, such as invalid input, missing permissions, or a malformed request.

### Retry configuration

| Parameter | Description |
| --------- | ----------- |
| `retryCount` | Number of retry attempts after the original attempt fails. |
| `retryDelaySeconds` | Delay before the next retry is made available for polling. |
| `retryLogic` | `FIXED`, `LINEAR_BACKOFF`, or `EXPONENTIAL_BACKOFF`. |
| `backoffScaleFactor` | Multiplier used by linear or exponential backoff. |

Example task definition:

```json
{
  "name": "charge_payment",
  "description": "Charge a payment provider",
  "retryCount": 3,
  "retryDelaySeconds": 10,
  "retryLogic": "EXPONENTIAL_BACKOFF",
  "backoffScaleFactor": 2,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "pollTimeoutSeconds": 120,
  "timeoutPolicy": "RETRY",
  "ownerEmail": "payments@example.com"
}
```

With this configuration, a transient failure is retried up to three times. The delay increases according to the retry policy before the task is made available again.

## Task timeouts

Task timeouts protect workflows from workers that disappear, queues that are not being polled, and tasks that exceed their SLA.

### Timeout configuration

| Parameter | What it detects | Typical use |
| --------- | --------------- | ----------- |
| `pollTimeoutSeconds` | Task was scheduled but no worker picked it up. | Missing worker, wrong task name, wrong domain, or queue backlog. |
| `responseTimeoutSeconds` | Worker picked up the task but did not report progress in time. | Worker crash, network issue, or long task without heartbeat/update. |
| `timeoutSeconds` | Task did not reach a terminal state in time. | End-to-end task SLA. |
| `timeoutPolicy` | What Conductor does when timeout occurs. | `RETRY`, `TIME_OUT_WF`, or `ALERT_ONLY`. |

Recommended starting point:

```json
{
  "name": "generate_invoice",
  "retryCount": 2,
  "retryDelaySeconds": 30,
  "retryLogic": "FIXED",
  "pollTimeoutSeconds": 120,
  "responseTimeoutSeconds": 60,
  "timeoutSeconds": 600,
  "timeoutPolicy": "RETRY"
}
```

Use `responseTimeoutSeconds` with worker heartbeats or `IN_PROGRESS` updates for long-running work. Use `pollTimeoutSeconds` to detect insufficient worker capacity or bad routing. Use `timeoutSeconds` as the hard ceiling for a single task attempt.

!!! note
    Set `timeoutSeconds` and `pollTimeoutSeconds` to `0` only when the task is intentionally unbounded. For production workflows, explicit timeouts are usually safer.

## Workflow timeouts

Workflow timeouts protect the full business process. They are configured on the workflow definition and apply across all tasks, waits, retries, and branches.

Use workflow timeouts for:

- Customer-facing SLAs
- Batch windows
- Scheduled maintenance jobs
- Agentic workflows that must stop after a budget
- Flows that should escalate if humans or external systems do not respond

### Timeout configuration

| Parameter | Description |
| --------- | ----------- |
| `timeoutSeconds` | Maximum workflow runtime before timeout. Use `0` for no timeout. |
| `timeoutPolicy` | `TIME_OUT_WF` to time out and terminate the workflow, or `ALERT_ONLY` to record the timeout signal without terminating. |

Example workflow definition:

```json
{
  "name": "order_fulfillment",
  "version": 1,
  "schemaVersion": 2,
  "timeoutPolicy": "TIME_OUT_WF",
  "timeoutSeconds": 1800,
  "tasks": [
    {
      "name": "reserve_inventory",
      "taskReferenceName": "reserve_inventory_ref",
      "type": "SIMPLE"
    }
  ]
}
```

Keep workflow timeout larger than the expected sum of task execution, retry delays, waits, and external dependency latency. If a workflow has a strict SLA, work backward from that SLA and set task-level timeout and retry values accordingly.

## Workflow compensation flows

A compensation flow is a workflow that runs when another workflow fails. In Conductor, this is configured with `failureWorkflow` on the main workflow definition.

Use a failure workflow for:

- Releasing reserved inventory
- Refunding or voiding a payment authorization
- Notifying operators or customers
- Creating an incident or ticket
- Cleaning up side effects created by agent tool calls
- Marking an AI-assisted action as failed for audit and review
- Recording audit data
- Marking a business entity as failed

### Setting a failure workflow

Create the compensation workflow first, then reference it from the main workflow:

```json
{
  "name": "order_fulfillment",
  "version": 1,
  "schemaVersion": 2,
  "failureWorkflow": "order_fulfillment_compensation",
  "timeoutPolicy": "TIME_OUT_WF",
  "timeoutSeconds": 1800,
  "tasks": [
    {
      "name": "reserve_inventory",
      "taskReferenceName": "reserve_inventory_ref",
      "type": "SIMPLE"
    },
    {
      "name": "charge_payment",
      "taskReferenceName": "charge_payment_ref",
      "type": "SIMPLE"
    }
  ]
}
```

Design compensation workflows to be idempotent. They can be retried, and they may run after a partial business process has already changed external systems.

## Choosing the right failure behavior

| Failure mode | Recommended behavior |
| ------------ | -------------------- |
| Dependency returned temporary 5xx | Retry with backoff. |
| Dependency rate limited the request | Retry with longer delay or backoff. |
| Worker crashed after polling | Use `responseTimeoutSeconds` and retry. |
| No worker is polling the queue | Use `pollTimeoutSeconds`, alert, and scale or fix workers. |
| Invalid user input | Fail terminally. Do not retry. |
| Business step failed after side effects | Trigger a failure workflow for compensation. |
| Workflow exceeded customer SLA | Use workflow `timeoutSeconds` and `TIME_OUT_WF`. |
| Human approval took too long | Use task timeout, assignment policy, escalation, or workflow timeout. |

## Production notes

- Make every worker task idempotent.
- Keep retry budgets aligned with user-facing SLAs.
- Prefer `EXPONENTIAL_BACKOFF` for external dependency failures.
- Use `FAILED_WITH_TERMINAL_ERROR` for non-retryable worker failures.
- Alert on repeated task retries and queue depth, not only final workflow failures.
- Use [Metrics and Observability](/content/developer-guides/metrics-and-observability) to monitor retries, timeouts, queue depth, and failure rates.
- Use [Search / Query Executions](/content/developer-guides/debugging-workflows) to inspect the failed task, resolved inputs, and recovery options.
