---
title: "Rate Limits"
description: "Learn how to configure rate limits for workflows and tasks to control execution throughput and prevent overloading downstream services in Orkes Conductor."
canonical_route: "rate-limits"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Rate Limits

Rate limits control how quickly workflows and tasks execute. Use them to protect downstream services, prevent worker overload, enforce tenant-level limits, and keep a surge of workflow starts from consuming all capacity.

!!! tip "5-minute path"
    Use task rate limits to protect a task queue or downstream dependency. Use workflow rate limits to limit concurrent workflow executions by a fixed or dynamic key.

## Task rate limits

Task rate limits are configured on the task definition. They apply to all workflow tasks that use that task definition.

Use task rate limits when:

- A worker task calls a dependency with a known throughput limit.
- A shared task queue needs protection from burst traffic.
- You need to limit concurrent executions of a specific task type.
- A downstream API has request-per-second or concurrency constraints.

When the number of tasks scheduled within a given period exceeds the defined rate limit, the Conductor server will place the excess tasks in a PENDING state. Once an IN_PROGRESS task is completed, the rate limit is freed up, and the server will make the next PENDING task available for polling.

### Rate limit configuration

You can configure rate limit behavior for tasks in its **task definition**. The parameters for defining a task’s rate limit behavior are:

| Parameter | Description | Required/ Optional |
| --------- | ------------ | ------------------- |
| `rateLimitPerFrequency` | The maximum number of task executions that can be scheduled in a given duration. Default value is 0. | Optional. |
| `rateLimitFrequencyInSeconds` | The frequency window (in seconds) for the rate limit. | Optional. |
| `concurrentExecLimit` | The number of task executions that can be executed concurrently. Default value is 0. <br/><br/> For example, if you have 1000 task executions waiting in the queue and 1000 workers polling it for tasks, but you set `concurrentExecLimit` to 10, only 10 tasks would be given to workers (which would lead to starvation). If any of the workers finish execution, a new task will be removed from the queue while still keeping the current execution count to 10. | Optional. |

!!! note
    To configure tasks with no rate limits, set `rateLimitPerFrequency` and `concurrentExecLimit` to 0.

**Example**

```json
{
  "name": "call_payment_gateway",
  "retryCount": 3,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "rateLimitPerFrequency": 12,
  "rateLimitFrequencyInSeconds": 5,
  "concurrentExecLimit": 20
}
```

For example, let’s set `rateLimitFrequencyInSeconds=5`, and `rateLimitPerFrequency=12`. This means our frequency window is 5 seconds in duration, and for each frequency window, the Conductor would only give 12 tasks to workers. So, in a given minute, the Conductor would only give 12*(60/5) = 144 tasks to workers, irrespective of the number of workers polling for the task.

Unlike `concurrentExecLimit`, rate limiting doesn't consider the tasks already in progress or a terminal state. Even if all the previous tasks are executed within 1 sec or would take a few days, the new tasks are still given to workers at the configured frequency, 144 tasks per minute in the above example.

## Workflow rate limits

Workflow rate limits control concurrent workflow executions. New executions beyond the limit remain running with the first task pending until capacity is available.

Use workflow rate limits when:

- A workflow should not run too many copies at once.
- Each tenant, customer, account, or correlation group needs its own concurrency cap.
- A scheduled workflow must avoid overlapping runs.
- A workflow fans out to expensive downstream work.

When the number of scheduled workflows exceeds the defined rate limit, the Conductor server will place these workflows in a RUNNING state with the first task set to a PENDING status. Once a workflow completes, the rate limit is freed up and the server will schedule the next PENDING task for polling.

### Rate limit configuration

Configure workflow rate limits in the **workflow definition**.

| Parameter | Description | Required/ Optional |
| --------- | ------------ | ------------------- |
| `rateLimitConfig` | A map of the workflow rate limit configuration. | Optional. |
| `rateLimitConfig.rateLimitKey` | A unique identifier to group workflow executions for rate limits. Can be a fixed value (for example, "max") or a dynamic variable from the workflow (for example, `${workflow.input.someKey}`, `${workflow.correlationId}`, `${workflow.workflowType}`, or `${workflow.version}`). | Optional. |
| `rateLimitConfig.concurrentExecLimit` | The number of workflow executions that can run concurrently for each rate limit key. Cannot be passed as a dynamic variable. | Optional. |

Fixed-key example:

```json
{
  "name": "nightly_reconciliation",
  "version": 1,
  "schemaVersion": 2,
  "rateLimitConfig": {
    "rateLimitKey": "global",
    "concurrentExecLimit": 1
  },
  "tasks": []
}
```

### Routing rate limits with dynamic key

Use a dynamic `rateLimitKey` to maintain separate concurrency queues by workflow input.

```json
{
  "name": "tenant_batch_import",
  "version": 1,
  "schemaVersion": 2,
  "rateLimitConfig": {
    "rateLimitKey": "${workflow.input.tenantId}",
    "concurrentExecLimit": 3
  },
  "tasks": []
}
```

In this example, each `tenantId` can have up to three concurrent executions. Traffic from one tenant does not consume the concurrency allowance for another tenant.

### Client SDK methods

When defining workflows in code, set the same rate-limit fields on the workflow definition.

```java
RateLimitConfig rateLimitConfig = new RateLimitConfig();
rateLimitConfig.setRateLimitKey("${workflow.input.tenantId}");
rateLimitConfig.setConcurrentExecLimit(3);
workflowDef.setRateLimitConfig(rateLimitConfig);
```

## Production notes

- Prefer task rate limits for protecting a dependency called by a task.
- Prefer workflow rate limits for controlling whole-process concurrency.
- Use dynamic workflow keys for tenant, account, customer, or correlation-level isolation.
- Monitor queue depth and wait time after adding limits so you know whether callers experience backpressure.
- Do not use rate limits as a substitute for idempotency. They reduce concurrency; they do not deduplicate requests.
