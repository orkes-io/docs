---
title: "Scheduling Workflows"
description: "Schedule Orkes Conductor workflows with cron expressions, fixed inputs, timezones, idempotency, monitoring, and production-safe permissions."
canonical_route: "developer-guides/scheduling-workflows"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Scheduling Workflows"
---

# Scheduling Workflows

Use schedules when time should start the workflow. A schedule creates workflow executions on a cron cadence, in a selected timezone, with a fixed workflow name and input payload.

Schedules are best for recurring automation: nightly reconciliation, certificate renewals, compliance scans, cleanup jobs, report generation, reminders, and periodic health checks. If an external event should start the workflow, use [webhooks](/content/developer-guides/webhook-integration), [event handlers](/content/developer-guides/event-handler), or a [gateway](/content/developer-guides/mcp-api-gateway) instead.

!!! tip "5-minute path"
    Create a schedule, choose the cron cadence and timezone, select the workflow name, provide fixed input, decide whether to run the latest or a specific workflow version, then monitor the resulting scheduled executions.

## When to use schedules

| Need | Use a schedule? | Better option |
| ---- | --------------- | ------------- |
| Run a workflow every hour, day, week, or month | Yes | Not applicable |
| Run a workflow once in a future time window | Yes | Start manually if it should run immediately |
| Run the same workflow with different fixed inputs at different cadences | Yes | Create one schedule per cadence/input set |
| React to a webhook from another system | No | [Webhook Integration](/content/developer-guides/webhook-integration) |
| React to a queue, topic, or CDC event | No | [Event Handler](/content/developer-guides/event-handler) |
| Return an immediate response to an API caller | No | [Synchronous Workflow Execution](/content/reference-docs/api/workflow/synchronous-workflow-execution) |

## Schedule parameters

Most schedules only need a name, cron expression, timezone, workflow name, and input. Use the [Create Schedule API](/content/reference-docs/api/schedule/create-schedule) for the full request schema.

| Parameter | Description | Required/Optional |
| --------- | ----------- | ------------------ |
| `name` | Stable schedule identifier. Must be alphanumeric and can include underscores. Renaming an existing schedule creates a new one. | Required. |
| `description` | Human-readable purpose, owner, or runbook context. | Optional. |
| `cronExpression` | The cadence. Conductor uses 6-field Quartz cron with seconds first. See [Using cron expression](#using-cron-expression). | Required. |
| `zoneId` | The timezone used to interpret the cron expression. Use `UTC` unless a business process requires local time. | Required. |
| `startWorkflowRequest` | A JSON object containing the details of the workflow to be scheduled. | Required. |
| `startWorkflowRequest.name` | Workflow definition to run. The schedule creator must have EXECUTE permission on it. | Required. |
| `startWorkflowRequest.version` | Workflow version to run. Omit it to use the latest version, or set it when the schedule must stay pinned. | Optional. |
| `startWorkflowRequest.input` | Fixed input passed to each workflow execution. | Optional. |
| `startWorkflowRequest.correlationId` | Correlates executions created by the schedule. | Optional. |
| `startWorkflowRequest.idempotencyKey` | A unique, user-generated key to prevent duplicate workflow executions. Idempotency data is retained throughout the life of the workflow execution. | Optional. |
| `startWorkflowRequest.idempotencyStrategy` | The idempotency strategy for handling duplicate requests: `RETURN_EXISTING` (return the workflowId of the existing instance), `FAIL` (start a new instance only if none exists with the same key), or `FAIL_ON_RUNNING` (start a new instance only if none is RUNNING or PAUSED with the same key). | Required if `idempotencyKey` is used. |
| `startWorkflowRequest.priority` | The priority of the workflow. Supports values from 0-99 and can be passed as a variable. | Optional. |
| `startWorkflowRequest.taskToDomain` | Routes worker tasks to a domain-specific worker pool. | Optional. |
| `scheduleStartTime` | The start time for the schedule in Unix timestamp format (in milliseconds), based on the local timezone. | Optional. |
| `scheduleEndTime` | The end time for the schedule in Unix timestamp format (in milliseconds), based on the local timezone. | Optional. |
| `paused` | Whether the schedule is paused upon saving. If `true`, the schedule will not run until resumed. Default is `false`. | Optional. |
| `runCatchupScheduleInstances` | If `true`, executes any pending schedules, such as when the server starts after downtime. | Optional. |

## Using cron expression

The `cronExpression` defines the cadence of the scheduler using a 6-field string. An asterisk (`*`) denotes a blank entry.

```
* * * * * *
```

The terms, listed from left to right, are as follows:

- Second: Allowed values are 0-59.
- Minute: Allowed values are 0-59.
- Hour: Allowed values are 0-23.
- Day of Month: Allowed values are 1-31.
- Month: Allowed values are 1-12 or JAN-DEC.
- Day of Week: Allowed values are 1-7 or MON-SUN.

Examples:

| Cadence | Expression |
| ------- | ---------- |
| Every hour | `0 0 * ? * *` |
| Every 15 minutes | `0 */15 * ? * *` |
| Every day at 2:00 AM UTC | `0 0 2 ? * *` |
| Every Monday at 9:00 AM | `0 0 9 ? * MON` |
| First day of every month at midnight | `0 0 0 1 * ?` |

Quartz also supports common macros:

| Macro | Meaning |
| ----- | ------- |
| `@yearly` or `@annually` | Once a year at midnight on January 1 |
| `@monthly` | Once a month at midnight on the first day of the month |
| `@weekly` | Once a week at midnight on Sunday |
| `@daily` or `@midnight` | Once a day at midnight |
| `@hourly` | Once every hour |

!!! info
    Quartz cron is not the same as standard 5-field Unix cron. The first field is seconds, and `?` is commonly used for "no specific value" in either day-of-month or day-of-week.

When a schedule starts a workflow, Conductor injects scheduler metadata into the workflow input:

```json
{
  "_executedTime": 1735606800000,
  "_startedByScheduler": "nightly_reconciliation",
  "_executionId": "schedule-execution-id",
  "_scheduledTime": 1735606800000
}
```

## Schedule configuration

This minimal request creates a daily schedule that starts a workflow at 2:00 AM UTC:

```json
{
  "name": "nightly_reconciliation",
  "description": "Run account reconciliation every day at 2:00 AM UTC.",
  "cronExpression": "0 0 2 ? * *",
  "zoneId": "UTC",
  "paused": false,
  "runCatchupScheduleInstances": false,
  "startWorkflowRequest": {
    "name": "reconcile_accounts",
    "input": {
      "region": "us"
    },
    "correlationId": "nightly_reconciliation"
  }
}
```

For API usage, send the schedule definition to:

```http
POST /api/scheduler/schedules
```

## Configuring a schedule

You can create schedules from the Scheduler UI, from a completed workflow execution, or through the API.

=== "Using Conductor UI (Scheduler)"

    1. Go to **Definitions** > **Scheduler**.
    2. Select **+ Define schedule**.
    3. Enter a schedule name and description.
    4. Choose a cron template or enter a cron expression.
    5. Select the timezone.
    6. Select the workflow name and version.
    7. Enter fixed workflow input, correlation ID, idempotency settings, or task-to-domain mapping if needed.
    8. Set start and end times if the schedule should only run inside a window.
    9. Save as active, or enable **Pause schedule** if it should not run yet.

    From the Scheduler definitions list, use **Quick filters** to narrow schedules by active/inactive status, and **Quick search** to find one by name or by tag (format `tagKey:tagValue`, for example `team:marketing`). The row actions let you **Pause**, **Clone**, **Add/Edit Tags**, or **Delete** a schedule.

    <p align="center"><img src="/content/img/actions-on-scheduler.png" alt="Quick search, quick filters, and row actions on the Scheduler definitions list" width="90%" height="auto"></img></p>

    If the schedule is active, the list also shows its next run time.

    <p align="center"><img src="/content/img/next-run-time-for-workflow-schedule.png" alt="Next run time column on the Scheduler definitions list" width="90%" height="auto"></img></p>

=== "Conductor UI (Workflow Execution)"

    Use this when a completed execution has the exact workflow, input, and task-to-domain mapping you want to reuse.

    1. Go to **Executions** > **Workflow**.
    2. Open the completed execution.
    3. Select **Actions** > **Create Schedule**.
    4. Add the schedule name, cron expression, timezone, and active window.

    <p align="center"><img src="/content/img/schedule-from-executions.png" alt="Create Schedule option in the Actions menu of a workflow execution" width="90%" height="auto"></img></p>

=== "Using API"

    Use the API when schedules are managed through deployment automation, platform tooling, or tenant provisioning:

    - [Create Schedule](/content/reference-docs/api/schedule/create-schedule)
    - [Get All Schedules](/content/reference-docs/api/schedule/get-all-schedules)
    - [Pause Schedule](/content/reference-docs/api/schedule/pause-schedule)
    - [Resume Schedule](/content/reference-docs/api/schedule/resume-schedule)
    - [Delete Schedule](/content/reference-docs/api/schedule/delete-schedule)


## Monitoring scheduled executions

Go to **Executions** > **Scheduler** to inspect scheduled runs. Use this view to see schedule name, workflow name, workflow ID, scheduled time, execution time, status, failure reason, and error details.

For debugging, open the workflow execution from the scheduled execution row. Select multiple rows and use **Bulk Action** to pause, resume, restart, retry, or terminate them together.

<p align="center"><img src="/content/img/scheduler-executions.jpg" alt="Scheduled workflow executions list with rows selected and the Bulk Action menu" width="90%" height="auto"></img></p>

For automation, use the [Search Schedule Executions API](/content/reference-docs/api/schedule/search-schedule-executions), or select **Show as code** next to Search to get the current search as cURL or JavaScript.

<p align="center"><img src="/content/img/show-as-code-scheduler-executions.png" alt="Show as code option next to the Search button on the scheduled executions page" width="90%" height="auto"></img></p>

## Troubleshooting schedules

| Problem | What to check |
| ------- | ------------- |
| Schedule did not run | Confirm it is not paused, the current time is inside the start/end window, and the cron expression matches the selected timezone. |
| Workflow did not start | Confirm the schedule creator still has EXECUTE permission on the workflow and the workflow version exists. |
| Schedule auto-paused | Retrieve the schedule and check `pausedReason`. A security error usually means the creator lost permission on the workflow. |
| Wrong run time | Check `zoneId`. Prefer `UTC` for infrastructure schedules and use local zones only for business-time schedules. |
| Duplicate workflow executions | Add an idempotency key and strategy if retry behavior could create duplicate starts. |
| Missed runs after downtime | Decide whether `runCatchupScheduleInstances` should be enabled for this schedule. |

To resolve a schedule paused by permission loss:

1. Restore EXECUTE permission on the workflow for the schedule creator.
2. Resume the schedule manually or through the API.

## Production notes

- Pin `startWorkflowRequest.version` when the schedule must keep using a known workflow definition.
- Leave version unset only when "always run latest" is intentional.
- Use idempotency keys for schedules that trigger side effects.
- Give schedules descriptive names that include owner, cadence, and purpose.
- Avoid very high-frequency schedules unless workers, rate limits, and downstream systems are sized for the load.

!!! tip "Granting team access to schedules"
    Non-admin users can only view and interact with schedules they have READ access to. Creators are automatically granted full access to the schedules they create.
    
    To give a team access to schedules an admin created, use tags and a user group:
    
    1. Add the same tag to the schedule and its workflow.
    2. Create a user group.
    3. Grant that group EXECUTE and READ access on the tag.
    
    **Example:** A data engineering team manages ETL schedules. Tag the ETL workflow and its schedules with `data-etl`, create a "Data Engineers" user group, then grant that group EXECUTE and READ on the `data-etl` tag. Everyone in the group can now interact with the tagged schedule and workflow.

## Frequently asked questions

### How do I set up a crontab to schedule a workflow every 15 minutes?

Use this Quartz cron expression:

```text
0 */15 * ? * *
```

### What is the smallest granularity to set up a schedule?

The scheduler supports second-level granularity on a best-effort basis. For production schedules, use at least a 30-second gap unless the workflow and downstream systems are designed for higher frequency.

### Can I get a summary of schedules that ran during a period?

Yes. Use **Executions** > **Scheduler** and filter by time range, or use the [Search Schedule Executions API](/content/reference-docs/api/schedule/search-schedule-executions).

### What happens if the workflow definition changes after a schedule is created?

If the schedule is pinned to a workflow version, it keeps using that version. If no version is set, the schedule runs the latest version. Update the schedule when workflow inputs or behavior change.

### How do I set up a crontab to schedule a workflow every 90 minutes?

Cron does not directly support 90-minute intervals because the minute field only supports values from 0 to 59. Use two schedules:

```text
0 0 0/3 * * ?
```

```text
0 30 1/3 * * ?
```

Together, these run the workflow every 90 minutes: 14:30, 16:00, 17:30, 19:00, and so on.
