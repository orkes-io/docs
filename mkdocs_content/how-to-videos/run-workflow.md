---
title: "Running Workflows in UI"
description: "Learn how to run workflows from the Conductor UI by selecting a workflow version, providing input parameters, and viewing execution details."
canonical_route: "how-to-videos/run-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration"
---

# Running Workflows in UI

This page is kept at its original URL for compatibility. For the developer guide that covers API, SDK, UI, and schedules, see [Executing Workflows](/content/developer-guides/running-workflows).

Use the UI when you want to manually test a workflow, inspect resolved inputs, or reproduce a support/debugging scenario. Use APIs or SDKs for production callers.

!!! tip "5-minute path"
    Select the workflow name and version, provide JSON input, optionally set idempotency/correlation/task-domain values, run the workflow, then open the generated workflow ID to inspect execution details.

## Run workflow

When running a workflow manually, provide:

| Field | Purpose |
| ----- | ------- |
| Workflow name | Workflow definition to execute. |
| Version | Specific version to run. If omitted, the latest version is used. |
| Input params | JSON object passed as `workflow.input`. |
| Idempotency key | Optional key to deduplicate repeated starts. |
| Correlation ID | Optional business ID for search and tracing. |
| Task-to-domain mapping | Optional routing map for worker domains. |

Example input:

```json
{
  "orderId": "ORD-1001",
  "customerId": "CUST-9"
}
```

Example task-to-domain mapping:

```json
{
  "charge_card": "payments-prod"
}
```

After the workflow starts, open the workflow execution ID to inspect status, task inputs, task outputs, retry counts, failures, and final output.

## Workflow run history

The UI keeps a workflow run history for manual executions. Use it to restore a previous form configuration, rerun a test case, or compare execution behavior after a workflow definition change.

For repeatable testing, move important examples into source-controlled fixtures and use the [Test Workflow API](/content/reference-docs/api/workflow/test-workflow) or [Unit and Regression Tests](/content/developer-guides/unit-and-regression-tests).

## Run tasks

Use task testing for fast checks of a single task configuration inside a workflow. It is useful when validating:

- Resolved task input.
- HTTP/gRPC request configuration.
- INLINE or JSON JQ transform logic.
- Domain routing.
- Expected task output shape.

Task tests run as small workflow executions. Open the generated execution ID when you need full task input/output details.
