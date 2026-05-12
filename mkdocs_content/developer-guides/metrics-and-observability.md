---
title: "Metrics and Observability"
description: "Learn how to use metrics dashboards and observability tools to monitor workflow executions and analyze workflow performance in Orkes Conductor."
---

# Metrics and Observability

Orkes Conductor exposes workflow and task metrics that can be used in Prometheus, Grafana, Datadog, and other observability systems. Use these metrics to answer operational questions: Are workflows failing? Are queues backing up? Are workers polling? Are tasks getting slower? Are retries hiding an upstream outage?

!!! tip "5-minute path"
    Start with four signals: failed workflows, timed-out tasks, task queue depth, and worker poll rate. Add latency percentiles once the basic health checks are in place.

## Dashboard setup

For Orkes-hosted cloud deployments, metrics integrations are enabled with the Orkes team. For customer-hosted or on-prem deployments, connect your own Prometheus-compatible monitoring stack to the Conductor metrics endpoint and build dashboards in Grafana or Datadog.

Use the Conductor UI for quick inspection, but treat Prometheus queries and alert rules as the production source of truth. They can be versioned, reviewed, tested, and shared across environments.

## Conductor metrics

### Workflow metrics

| Metric | Type | Useful labels | Use it for |
| ------ | ---- | ------------- | ---------- |
| `workflow_completed_seconds` | Timer | `workflowName`, `quantile` | Workflow duration and latency percentiles. |
| `workflow_completed_seconds_count` | Counter | `workflowName`, `status` | Completion rate, failure rate, and timeout rate. |
| `workflow_running` | Gauge | `workflowName` | In-flight executions and stuck workflow detection. |
| `workflow_start_request_seconds_count` | Counter | `workflowName` | Workflow start rate and traffic spikes. |

### Task metrics

| Metric | Type | Useful labels | Use it for |
| ------ | ---- | ------------- | ---------- |
| `task_completed_seconds` | Timer | `taskType`, `quantile` | Task latency and slow dependency detection. |
| `task_completed_seconds_count` | Counter | `taskType`, `status` | Task success, failure, and timeout rates. |
| `task_queue_depth` | Gauge or counter | `taskType` | Backlog, insufficient workers, or stuck polling. |
| `task_poll_request_seconds_count` | Counter | `taskType` | Worker poll activity and worker availability. |

## Useful PromQL patterns

Failure rate by workflow:

```promql
sum by (workflowName) (
  rate(workflow_completed_seconds_count{status="FAILED"}[5m])
)
```

Timeout rate by task type:

```promql
sum by (taskType) (
  rate(task_completed_seconds_count{status="TIMED_OUT"}[5m])
)
```

Queue depth by task type:

```promql
sum by (taskType) (
  task_queue_depth
)
```

Worker polling rate:

```promql
sum by (taskType) (
  rate(task_poll_request_seconds_count[5m])
)
```

Workflow p95 duration:

```promql
histogram_quantile(
  0.95,
  sum by (workflowName, le) (
    rate(workflow_completed_seconds_bucket[5m])
  )
)
```

Metric bucket names can vary by metrics backend and exporter configuration. If your backend exposes summary quantiles instead of histogram buckets, use the available `quantile` label instead of `histogram_quantile`.

## Alerting starting points

| Alert | Example condition | First response |
| ----- | ----------------- | -------------- |
| Workflow failures | Failed workflow rate is above baseline for 5 minutes. | Search failed executions by workflow name and inspect `reasonForIncompletion`. |
| Task timeouts | Timed-out task rate is above baseline. | Check `responseTimeoutSeconds`, worker logs, dependency health, and queue depth. |
| Queue backlog | `task_queue_depth` increases while poll rate is flat or zero. | Scale workers, check task domain routing, and verify worker credentials. |
| No worker polling | Poll rate drops to zero for a task type with scheduled work. | Check worker deployment, network access, and permissions. |
| Long workflow duration | p95 or p99 duration exceeds SLA. | Inspect slow tasks, retries, wait tasks, and external dependencies. |

## Debug from metrics to execution

Metrics tell you where to look; execution records tell you why the workflow failed.

1. Use the metric labels to identify the workflow name or task type.
2. Search executions for that workflow and status.
3. Fetch the full execution JSON.
4. Inspect the failed or slow task.
5. Correlate `workflowId`, `taskId`, `correlationId`, and `workerId` with application logs.

Example search:

```shell
curl -sS -G "$CONDUCTOR_SERVER_URL/workflow/search" \
  -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
  --data-urlencode 'query=status=FAILED AND workflowType=payment_flow' \
  --data-urlencode 'size=20' \
  --data-urlencode 'sort=startTime:DESC'
```

## Configuring alerts via Grafana

Create alert rules from the PromQL queries you use in dashboards. Keep the alert tied to a clear runbook action, not just a chart threshold.

Recommended alert metadata:

- Workflow or task type
- Status being measured
- Time window
- Severity
- Runbook link
- Expected owner
- Links to [Search / Query Executions](/content/developer-guides/debugging-workflows) and [Handling Failures](/content/error-handling)

## Production notes

- Use correlation IDs when starting workflows so alerts can connect directly to business entities.
- Alert on rates and sustained windows, not single failed executions.
- Track queue depth and poll rate together. Queue depth alone does not tell you whether workers are missing or just busy.
- Separate workflow-level alerts from task-level alerts. Workflow failure rate tells you customer impact; task metrics tell you where to fix it.
- Keep dashboard and alert definitions in source control when possible.
