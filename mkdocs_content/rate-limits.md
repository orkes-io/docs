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

When the limit is reached, Conductor holds additional task executions in `PENDING` until capacity becomes available.

### Rate limit configuration

| Field | Purpose |
| ----- | ------- |
| `rateLimitPerFrequency` | Maximum number of task executions allowed in the frequency window. `0` disables this limit. |
| `rateLimitFrequencyInSeconds` | Window size in seconds for `rateLimitPerFrequency`. |
| `concurrentExecLimit` | Maximum number of task executions that can be in progress at the same time. `0` disables this limit. |

Example task definition:

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

With `rateLimitPerFrequency` set to `12` and `rateLimitFrequencyInSeconds` set to `5`, Conductor schedules at most 12 executions every 5 seconds, or about 144 executions per minute.

`concurrentExecLimit` is different: it limits in-flight work, not starts per time window. Use both when a dependency has both request-rate and concurrency limits.

## Workflow rate limits

Workflow rate limits control concurrent workflow executions. New executions beyond the limit remain running with the first task pending until capacity is available.

Use workflow rate limits when:

- A workflow should not run too many copies at once.
- Each tenant, customer, account, or correlation group needs its own concurrency cap.
- A scheduled workflow must avoid overlapping runs.
- A workflow fans out to expensive downstream work.

### Rate limit configuration

Configure workflow rate limits in the workflow definition.

| Field | Purpose |
| ----- | ------- |
| `rateLimitConfig.rateLimitKey` | Fixed or dynamic key used to group executions. |
| `rateLimitConfig.concurrentExecLimit` | Maximum concurrent executions for each key. |

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
