---
title: "Scheduling Workflows"
description: "Schedule Orkes Conductor workflows with cron expressions, fixed inputs, timezones, idempotency, monitoring, and production-safe permissions."
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

| Parameter | Use it for |
| --------- | ---------- |
| `name` | Stable schedule identifier. Renaming creates a different schedule. |
| `description` | Human-readable purpose, owner, or runbook context. |
| `cronExpression` | The cadence. Conductor uses 6-field Quartz cron with seconds first. |
| `zoneId` | The timezone used to interpret the cron expression. Use `UTC` unless a business process requires local time. |
| `startWorkflowRequest.name` | Workflow definition to run. The schedule creator must have EXECUTE permission on it. |
| `startWorkflowRequest.version` | Workflow version to run. Omit it to use the latest version, or set it when the schedule must stay pinned. |
| `startWorkflowRequest.input` | Fixed input passed to each workflow execution. |
| `startWorkflowRequest.correlationId` | Correlates executions created by the schedule. |
| `startWorkflowRequest.idempotencyKey` and `idempotencyStrategy` | Prevents duplicate executions when schedule creation or trigger delivery is retried. |
| `startWorkflowRequest.taskToDomain` | Routes worker tasks to a domain-specific worker pool. |
| `scheduleStartTime` and `scheduleEndTime` | Limits when the schedule is active. |
| `paused` | Saves the schedule without running it until resumed. |
| `runCatchupScheduleInstances` | Runs missed schedule instances after downtime when catch-up is desired. |

## Using cron expression

Conductor schedules use Quartz cron syntax with six fields:

```text
second minute hour day-of-month month day-of-week
```

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

### Create from Scheduler

1. Go to **Definitions** > **Scheduler**.
2. Select **+ Define schedule**.
3. Enter a schedule name and description.
4. Choose a cron template or enter a cron expression.
5. Select the timezone.
6. Select the workflow name and version.
7. Enter fixed workflow input, correlation ID, idempotency settings, or task-to-domain mapping if needed.
8. Set start and end times if the schedule should only run inside a window.
9. Save as active, or enable **Pause schedule** if it should not run yet.

### Create from a workflow execution

Use this when a completed execution has the exact workflow, input, and task-to-domain mapping you want to reuse.

1. Go to **Executions** > **Workflow**.
2. Open the completed execution.
3. Select **Actions** > **Create Schedule**.
4. Add the schedule name, cron expression, timezone, and active window.

### Create through the API

Use the API when schedules are managed through deployment automation, platform tooling, or tenant provisioning:

- [Create Schedule](/content/reference-docs/api/schedule/create-schedule)
- [Get All Schedules](/content/reference-docs/api/schedule/get-all-schedules)
- [Pause Schedule](/content/reference-docs/api/schedule/pause-schedule)
- [Resume Schedule](/content/reference-docs/api/schedule/resume-schedule)
- [Delete Schedule](/content/reference-docs/api/schedule/delete-schedule)

## Monitoring scheduled executions

Go to **Executions** > **Scheduler** to inspect scheduled runs. Use this view to see schedule name, workflow name, workflow ID, scheduled time, execution time, status, failure reason, and error details.

For debugging, open the workflow execution from the scheduled execution row. For automation, use the [Search Schedule Executions API](/content/reference-docs/api/schedule/search-schedule-executions).

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
- Tag schedules and workflows together so RBAC can grant teams the right READ and EXECUTE access.
- Avoid very high-frequency schedules unless workers, rate limits, and downstream systems are sized for the load.

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
