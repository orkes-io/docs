---
title: "Executing Workflows"
description: "Execute Orkes Conductor workflows by starting asynchronously, executing synchronously, scheduling runs, or triggering workflows from events and gateways."
canonical_route: "developer-guides/running-workflows"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Executing Workflows"
---

# Executing Workflows

Running a workflow means creating a workflow execution from a saved workflow definition. In production, the important choice is not "how do I click run?" It is whether the caller should wait for a result, fire and forget, run on a clock, or react to an external event.

!!! tip "5-minute path"
    Use **start** for durable asynchronous execution, **execute** for request/response calls that need an immediate result, and **schedules** for recurring or future runs. Use webhooks, events, or gateways when another system should trigger the workflow.

## Choose how to run a workflow

| Need | Use | Start here |
| ---- | --- | ---------- |
| Start a workflow and return the workflow ID immediately | Asynchronous start | [Start Workflow Execution API](/content/reference-docs/api/workflow/start-workflow-execution) |
| Start a workflow and wait for output or a specific task | Synchronous execute | [Synchronous Workflow Execution API](/content/reference-docs/api/workflow/synchronous-workflow-execution) |
| Run the same workflow on a cron cadence or future window | Schedule | [Scheduling Workflows](/content/developer-guides/scheduling-workflows) |
| Test a workflow manually with visible inputs and outputs | Conductor UI | [Run workflows from the UI](/content/how-to-videos/run-workflow) |
| Start workflows from application code | SDKs or workflow-as-code | [SDKs](/content/category/sdks) |
| Start workflows from SaaS or external HTTP callbacks | Webhooks | [Webhook Integration](/content/developer-guides/webhook-integration) |
| Start workflows from message brokers or CDC events | Event handlers | [Event Handler](/content/developer-guides/event-handler) |
| Expose a workflow as a real-time API or MCP tool | API Gateway or MCP Gateway | [Gateway](/content/developer-guides/mcp-api-gateway) |

## Start vs execute

### Start asynchronously

Returns a `workflowId` immediately. Use it for long-running workflows, background jobs, retries, human approval, agentic workflows, and event-driven automation. The caller should poll, search, receive a callback, or open the execution in the UI to learn the final outcome.

### Execute synchronously

Returns workflow state, output, or the state of a blocking task. Use it for short workflows, API-style request/response flows, tests, and gateway-backed services. Keep timeout and latency budgets explicit; do not make long human or wait flows block callers.

### Schedule

Creates a workflow execution each time the schedule fires. Use it for recurring jobs, maintenance workflows, scans, reports, and time-based automation. Timezone, catch-up behavior, idempotency, and workflow version selection matter.

## Start asynchronously

Use asynchronous start when the workflow should continue independently after the request is accepted. This is the default production pattern for durable execution.

```http
POST /api/workflow/{name}
```

The request body is the workflow input:

```json
{
  "orderId": "ord_123",
  "region": "us-east"
}
```

Use query parameters and headers when you need a specific version, correlation ID, priority, or idempotency key. Idempotency is important for APIs, webhooks, and queues that may retry the same request.

## Execute synchronously

Use synchronous execute when the caller needs a response from the workflow before continuing.

```http
POST /api/workflow/execute/{name}/{version}
```

Synchronous execution can wait for the workflow to finish, wait for a specific task reference, or return after a timeout. This works well for short workflows and API orchestration, especially when exposed through the [API Gateway](/content/developer-guides/api-gateway).

For production APIs, keep the workflow path short and predictable. If the workflow can wait for humans, external events, long retries, or agent loops, start it asynchronously and return the `workflowId`.

## Schedule or trigger automatically

Use a schedule when time is the trigger. Schedules run workflow executions using cron expressions and fixed input. They are a good fit for nightly jobs, periodic scans, cleanup, renewals, reports, and recurring maintenance.

Use webhooks or event handlers when an external system is the trigger:

- [Webhooks](/content/developer-guides/webhook-integration) receive HTTP callbacks from external systems.
- [Event handlers](/content/developer-guides/event-handler) react to broker or internal Conductor events.
- [MCP Gateway](/content/developer-guides/mcp-gateway) exposes workflows as tools that agents can call.
- [API Gateway](/content/developer-guides/api-gateway) exposes workflows as HTTP endpoints.

## Production notes

- Use explicit workflow versions when changing behavior could affect callers or scheduled jobs.
- Add idempotency keys for retried API calls, webhook callbacks, and event sources.
- Prefer asynchronous start for workflows with human tasks, WAIT tasks, retries, or long-running workers.
- Keep synchronous execution for short request/response flows with clear timeouts.
- Monitor executions through [Search / Query Executions](/content/developer-guides/debugging-workflows) and [Metrics and Observability](/content/developer-guides/metrics-and-observability).
- Protect start permissions with [RBAC](/content/category/access-control-and-security), especially for schedules, gateways, and application credentials.

## Next pages

- [Scheduling Workflows](/content/developer-guides/scheduling-workflows)
- [Start Workflow Execution API](/content/reference-docs/api/workflow/start-workflow-execution)
- [Synchronous Workflow Execution API](/content/reference-docs/api/workflow/synchronous-workflow-execution)
- [Webhook Integration](/content/developer-guides/webhook-integration)
- [Event Handler](/content/developer-guides/event-handler)

## Related pages

- [Workflows](/content/developer-guides/workflows)
- [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code)
- [Import BPMN Files as Workflows](/content/developer-guides/convert-bpmn-to-workflows)
- [Versioning Workflows](/content/developer-guides/versioning-workflows)
- [Scheduling Workflows](/content/developer-guides/scheduling-workflows)
- [Sending Signals to Workflows](/content/developer-guides/sending-signals-to-workflows)
