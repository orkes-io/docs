---
sidebar_position: 1
---

# Wait Task

```json
"type" : "WAIT"
```

## Introduction

WAIT is used when the workflow needs to be paused for an external signal to continue.

## Use Cases

WAIT is used when the workflow needs to wait and pause for an external signal, such as a human intervention
(like manual approval) or an event coming from an external source such as Kafka, SQS or Conductor's internal queueing mechanism.

Some use cases where the WAIT task is used:

1. Wait for a certain amount of time (e.g., 2 minutes) or until a certain date time (e.g., 12/25/2022 00:00)
2. To wait for an external signal coming from an event queue mechanism supported by Conductor

## Configuration

- taskType: WAIT
- Wait for a specific amount of time
  format: short: **D**d**H**h**M**m or full: **D**days**H**hours**M**minutes
- The following are the accepted units: _days_, _d_, _hrs_, _hours_, _h_, _minutes_, _mins_, _m_, _seconds_, _secs_, _s_

```json
{
  "taskType": "WAIT",
  "inputParameters": {
    "duration": "2 days 3 hours"
  }
}
```

- Wait until a specific date/time
- E.g., the following Wait task remains blocked until Dec 25, 2022, 9 am PST
- The date/time can be supplied in one of the following formats:
  **yyyy-MM-dd HH:mm**, **yyyy-MM-dd HH:mm**, **yyyy-MM-dd**

```json
{
  "name": "wait_until_date",
  "taskReferenceName": "wait_until_date_ref",
  "taskType": "WAIT",
  "inputParameters": {
    "until": "2022-12-25 09:00 PST"
  }
}
```

## Ending a WAIT when there is no time duration specified

To conclude a WAIT task, there are several endpoints that can be used:

- `api/tasks`: requires `workflowId`, `taskId` and `status`
- `api/queue/update/{workflowId}/{taskRefName}/{status}` **NOTE**: Requires queuing to be set up for your Conductor instance. If you are using Orkes Cloud, this will only work with admin access.
- `api/queue/update/{workflowId}/task/{taskId}/{status}` **NOTE**: Requires queuing to be set up for your Conductor instance. If you are using Orkes Cloud, this will only work with admin access.
