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

=== "Using API"

    Use the [Pause Workflow](/content/reference-docs/api/workflow/pause-workflow) API on a running workflow.

    ```http
    PUT /api/workflow/{workflowId}/pause
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select **Actions > Pause**.

    <p align="center"><img src="/content/img/pause-workflow.png" alt="Pausing a workflow from the Conductor UI" width="90%" height="auto"></img></p>


Use pause for operator-controlled holds, incident response, external dependency outages, or planned maintenance. Already running worker tasks may still finish; the pause prevents the workflow from advancing further.

## Resume workflow

Resume a paused workflow after the external condition is resolved.

=== "Using API"

    Use the [Resume Workflow](/content/reference-docs/api/workflow/resume-workflow) API on a paused workflow.

    ```http
    PUT /api/workflow/{workflowId}/resume
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select **Actions > Resume**.

    <p align="center"><img src="/content/img/resume-workflow.png" alt="Resuming a workflow from the Conductor UI" width="90%" height="auto"></img></p>


Before resuming, verify that the dependency or data condition that caused the pause has actually been fixed. Resuming without the fix usually just moves the failure forward.

## Restart workflow

Restart begins a terminal workflow again from the beginning using the same workflow input.

=== "Using API"

    Use the [Restart Workflow](/content/reference-docs/api/workflow/restart-workflow) API on a terminal workflow.

    ```http
    POST /api/workflow/{workflowId}/restart
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someTerminalWorkflow**), select **Actions > Restart with current definitions** or **Actions > Restart with latest definitions**.

    <p align="center"><img src="/content/img/restart-workflow.png" alt="Restarting a workflow from the Conductor UI" width="90%" height="auto"></img></p>


Use restart when:

- The original input is still valid.
- The failure was transient.
- You want to replay the whole workflow.

Restart options determine whether Conductor uses the original workflow definition or the latest definition. Use the original definition for forensic replay. Use the latest definition only when you intentionally want a fixed workflow definition to handle the same input.

!!! note
    When restarting, the same inputs are always reused. If you need to change workflow input, correlation ID, or task-to-domain mapping, use rerun instead of restart.

## Rerun workflow

Rerun lets you re-execute a workflow while changing input, correlation ID, or task-to-domain mapping. The original workflow (execution) ID is retained.

=== "Using API"

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

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someTerminalWorkflow**), select **Actions > Re-run Workflow**. You'll be redirected to the Run Workflow page to update inputs, correlation ID, and task-to-domain mapping.

    <p align="center"><img src="/content/img/rerun-workflow.png" alt="Rerunning a workflow from the Conductor UI" width="90%" height="auto"></img></p>

    !!! note
        The UI cannot rerun a workflow using the same execution ID — it always creates a new execution instance. To retain the original execution ID, use the API.


Use rerun when the previous execution should be corrected with new input rather than replayed exactly.

### Rerun workflow from task

Rerun from a task when earlier tasks are still valid and only a later task or branch needs to be re-executed.

=== "Using API"

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

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select a task in the visual diagram, then select **Re-Run from Task**. The previous attempt is marked `CANCELED`.

    <p align="center"><img src="/content/img/rerun-from-task.png" alt="Rerunning a workflow from a specific task in the Conductor UI" width="90%" height="auto"></img></p>

    !!! note
        To provide updated task inputs, use the API instead.


Use this for targeted repair. Do not use it to hide non-idempotent behavior; workers should still tolerate retries and duplicate deliveries.

## Retry from failed task

Retry resumes a failed workflow from its failed task.

=== "Using API"

    Use the [Retry Failed Workflow](/content/reference-docs/api/workflow/retry-failed-workflow) API to retry from the last failed task.

    ```http
    POST /api/workflow/{workflowId}/retry
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select **Actions > Retry - from failed task**.

    <p align="center"><img src="/content/img/retrying-failed-workflows-in-conductor.png" alt="Retrying a failed workflow from the Conductor UI" width="90%" height="auto"></img></p>


Use retry when the workflow failed because of a transient worker, network, service, or dependency issue and the task input is still valid. Fix deterministic bugs or bad input before retrying, otherwise the same task will fail again.

## Update task status

Update a task when an external system or human action must complete, fail, or progress a task. This is common for [Wait](/content/reference-docs/operators/wait), [Human](/content/reference-docs/operators/human), and externally completed tasks.

=== "Using API"

    Use the [Update Task Status in Workflow](/content/reference-docs/api/task/update-task-status-in-workflow) API.

    ```http
    POST /api/tasks/{workflowId}/{taskRefName}/COMPLETED
    Content-Type: application/json

    {
      "paymentId": "pay_123",
      "approved": true
    }
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select a task in the visual diagram. In the **Summary** tab, select a status in the **Update task** field, optionally add task outputs in the **Code** field, then select **Update**.

    <p align="center"><img src="/content/img/update-task.gif" alt="Updating a task's status from the Conductor UI" width="90%" height="auto"></img></p>

    !!! note
        Once a task is updated via the UI, its worker is automatically set to `conductor-ui`, providing better traceability for manual overrides.


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

=== "Using API"

    Use the [Terminate Workflow](/content/reference-docs/api/workflow/terminate-workflow) API on an ongoing workflow.

    ```http
    DELETE /api/workflow/{workflowId}?reason=cancelled-by-customer
    ```

=== "Using UI"

    In the workflow execution page (**Executions > Workflow > someWorkflow**), select **Actions > Terminate**.

    <p align="center"><img src="/content/img/terminating-task-in-conductor.png" alt="Terminating a workflow from the Conductor UI" width="90%" height="auto"></img></p>


Terminate when the work is no longer valid: user cancellation, duplicate request, compliance hold, or an operator decision to stop the execution. Include a reason so operators can distinguish intentional termination from failures.

## Production notes

- Store workflow IDs and correlation IDs in the calling system so recovery actions can target the right execution.
- Prefer idempotent workers because retry, restart, and rerun may repeat side effects.
- Use task output schemas for externally signaled tasks when downstream code depends on the signal payload.
- Restrict signal APIs with application permissions; recovery operations are powerful production controls.
- Emit an audit event from the caller when automated runbooks send pause, retry, rerun, update-task, or terminate signals.
