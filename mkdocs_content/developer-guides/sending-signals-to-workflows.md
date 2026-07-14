---
title: "Sending Signals to Workflows"
description: "Learn how to send signals to control workflow execution, including pausing, resuming, restarting, rerunning, or terminating workflows in Orkes Conductor."
canonical_route: "developer-guides/sending-signals-to-workflows"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Sending Signals to Workflows"
---

# Sending Signals to Workflows

Signals let applications and operators control workflow executions after they start. Use them to pause or resume work, retry failed executions, rerun with changed inputs, complete waiting tasks, or terminate work that should stop.

!!! tip "5-minute path"
    Use REST APIs or SDKs for automation, keep manual UI actions for recovery/debugging, and always record the workflow ID, task reference name, status, reason, and output used by the signal.

## Run workflow

Start a workflow when you want a new execution.

| Mode | API | Use when |
| ---- | --- | -------- |
| Async start | [Start Workflow Execution](/content/reference-docs/api/workflow/start-workflow-execution) | The caller only needs the workflow ID. |
| Sync execute | [Execute Workflow Synchronously](/content/reference-docs/api/workflow/synchronous-workflow-execution) | The caller needs the workflow or task output in the response. |

Async start example:

```http
POST /api/workflow/order_fulfillment
Content-Type: application/json

{
  "orderId": "ORD-1001",
  "customerId": "CUST-9"
}
```

Use sync execution for request/response flows, including API Gateway routes. Use async execution for durable background work, long-running jobs, or workflows that include human approval.

## Pause workflow

Pause a running workflow when you need to stop scheduling new tasks while preserving execution state.

Use the [Pause Workflow](/content/reference-docs/api/workflow/pause-workflow) API on a running workflow.

```http
PUT /api/workflow/{workflowId}/pause
```

Use pause for operator-controlled holds, incident response, external dependency outages, or planned maintenance. Already running worker tasks may still finish; the pause prevents the workflow from advancing further.

## Resume workflow

Resume a paused workflow after the external condition is resolved.

Use the [Resume Workflow](/content/reference-docs/api/workflow/resume-workflow) API on a paused workflow.

```http
PUT /api/workflow/{workflowId}/resume
```

Before resuming, verify that the dependency or data condition that caused the pause has actually been fixed. Resuming without the fix usually just moves the failure forward.

## Restart workflow

Restart begins a terminal workflow again from the beginning using the same workflow input.

Use the [Restart Workflow](/content/reference-docs/api/workflow/restart-workflow) API on a terminal workflow.

```http
POST /api/workflow/{workflowId}/restart
```

Use restart when:

- The original input is still valid.
- The failure was transient.
- You want to replay the whole workflow.

Restart options determine whether Conductor uses the original workflow definition or the latest definition. Use the original definition for forensic replay. Use the latest definition only when you intentionally want a fixed workflow definition to handle the same input.

!!! note
    When restarting, the same inputs are always reused. If you need to change workflow input, correlation ID, or task-to-domain mapping, use rerun instead of restart.

## Rerun workflow

Rerun lets you re-execute a workflow while changing input, correlation ID, or task-to-domain mapping. The original workflow (execution) ID is retained.

Use the [Rerun Workflow](/content/reference-docs/api/workflow/rerun-workflow) API to rerun the workflow from the beginning with updated inputs.

```http
POST /api/workflow/{workflowId}/rerun
Content-Type: application/json

{
  "workflowInput": {
    "orderId": "ORD-1001",
    "customerId": "CUST-9",
    "priority": "manual-review"
  },
  "correlationId": "order-ORD-1001",
  "taskToDomain": {
    "fraud_review": "review-team-a"
  }
}
```

Use rerun when the previous execution should be corrected with new input rather than replayed exactly.

### Rerun workflow from task

Rerun from a task when earlier tasks are still valid and only a later task or branch needs to be re-executed.

Use the [Rerun Workflow](/content/reference-docs/api/workflow/rerun-workflow) API to rerun from a specific task, with the option to provide updated task inputs.

```http
POST /api/workflow/{workflowId}/rerun
Content-Type: application/json

{
  "reRunFromTaskId": "8b8c3f7a-8f8d-4f83-89bf-0a84c9c4b446",
  "taskInput": {
    "retryReason": "corrected address"
  }
}
```

Use this for targeted repair. Do not use it to hide non-idempotent behavior; workers should still tolerate retries and duplicate deliveries.

## Retry from failed task

Retry resumes a failed workflow from its failed task.

Use the [Retry Failed Workflow](/content/reference-docs/api/workflow/retry-failed-workflow) API to retry from the last failed task.

```http
POST /api/workflow/{workflowId}/retry
```

Use retry when the workflow failed because of a transient worker, network, service, or dependency issue and the task input is still valid. Fix deterministic bugs or bad input before retrying, otherwise the same task will fail again.

## Update task status

Update a task when an external system or human action must complete, fail, or progress a task. This is common for [Wait](/content/reference-docs/operators/wait), [Human](/content/reference-docs/operators/human), and externally completed tasks.

Use the [Update Task Status in Workflow](/content/reference-docs/api/task/update-task-status-in-workflow) API.

```http
POST /api/tasks/{workflowId}/{taskRefName}/COMPLETED
Content-Type: application/json

{
  "paymentId": "pay_123",
  "approved": true
}
```

Supported statuses include:

| Status | Use when |
| ------ | -------- |
| `COMPLETED` | The external action succeeded and the workflow can continue. |
| `FAILED` | The action failed but normal retry behavior may apply. |
| `FAILED_WITH_TERMINAL_ERROR` | The action failed and should not be retried. |
| `IN_PROGRESS` | The task should remain active with updated state. |

Use task reference names, not display names. Keep output small and structured because downstream tasks can reference it.

## Terminate workflow

Terminate stops a running workflow and marks it terminal.

Use the [Terminate Workflow](/content/reference-docs/api/workflow/terminate-workflow) API on an ongoing workflow.

```http
DELETE /api/workflow/{workflowId}?reason=cancelled-by-customer
```

Terminate when the work is no longer valid: user cancellation, duplicate request, compliance hold, or an operator decision to stop the execution. Include a reason so operators can distinguish intentional termination from failures.

## Production notes

- Store workflow IDs and correlation IDs in the calling system so recovery actions can target the right execution.
- Prefer idempotent workers because retry, restart, and rerun may repeat side effects.
- Use task output schemas for externally signaled tasks when downstream code depends on the signal payload.
- Restrict signal APIs with application permissions; recovery operations are powerful production controls.
- Emit an audit event from the caller when automated runbooks send pause, retry, rerun, update-task, or terminate signals.

## Related pages

- [Workflows](/content/developer-guides/workflows)
- [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code)
- [Import BPMN Files as Workflows](/content/developer-guides/convert-bpmn-to-workflows)
- [Versioning Workflows](/content/developer-guides/versioning-workflows)
- [Executing Workflows](/content/developer-guides/running-workflows)
- [Scheduling Workflows](/content/developer-guides/scheduling-workflows)
