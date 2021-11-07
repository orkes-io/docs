---
sidebar_position: 1
---

# Fork Task

### Introduction

A Fork operation in conductor, lets you run a specified list of other tasks or sub workflows in parallel after the fork
task. A fork task is followed by a join operation that waits on the forked tasks or sub workflows to finish. The `JOIN`
task also collects outputs from each of the forked tasks or sub workflows.

### Use Cases

`FORK_JOIN` tasks are typically used when a list of tasks can be run in parallel. E.g In a notification workflow, there
could be multiple ways of sending notifications, i,e e-mail, SMS, HTTP etc.. These notifications are not dependent on
each other, and so they can be run in parallel. In such cases, you can create 3 sub-lists of forked tasks for each of
these operations.

### Configuration

A `FORK_JOIN` task, has a `forkTasks` attribute that expects an array. Each array, is a sub-list of tasks. Each of these
sub-lists and then invoked in parallel. The tasks defined within each sublist can be sequential or any other way as
desired.

A FORK_JOIN task has to be followed by a JOIN operation. The `JOIN` operator specifies which of the forked tasks to `joinOn` (wait for completion)
before moving to the next stage in the workflow.

```json
[
  {
    "name": "fork_join",
    "taskReferenceName": "my_fork_join_ref",
    "type": "FORK_JOIN",
    "forkTasks": [
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_email",
          "type": "SIMPLE"
        },
        {
          "name": "email_notification",
          "taskReferenceName": "email_notification_ref",
          "type": "SIMPLE"
        }
      ],
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_sms",
          "type": "SIMPLE"
        },
        {
          "name": "sms_notification",
          "taskReferenceName": "sms_notification_ref",
          "type": "SIMPLE"
        }
      ],
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_http",
          "type": "SIMPLE"
        },
        {
          "name": "http_notification",
          "taskReferenceName": "http_notification_ref",
          "type": "SIMPLE"
        }
      ]
    ]
  },
  {
    "name": "notification_join",
    "taskReferenceName": "notification_join_ref",
    "type": "JOIN",
    "joinOn": [
      "email_notification_ref",
      "sms_notification_ref"
    ]
  }
]
```

Here is how the output of notification_join will look like. The output is a map, where the keys are the names of task
references that were being `joinOn`. The corresponding values are the outputs of those tasks.

```json

{
  "email_notification_ref": {
    "email_sent_at": "2021-11-06T07:37:17+0000",
    "email_sent_to": "test@example.com"
  },
  "sms_notification_ref": {
    "smm_sent_at": "2021-11-06T07:37:17+0129",
    "sms_sen": "+1-425-555-0189"
  }
}
```

#### Input Configuration

| Attribute      | Description |
| ----------- | ----------- |
| name      | Task Name. A unique name that is descriptive of the task function      |
| taskReferenceName   | Task Reference Name. A unique reference to this task. There can be multiple references of a task within the same workflow definition        |
| type   | Task Type. In this case, `FORK_JOIN`        |
| inputParameters   | The input parameters that will be supplied to this task    |
| forkTasks   | A list of a list of tasks. Each of the outer list will be invoked in parallel.  The inner list can be a graph of other tasks and sub-workflows   |

#### Output Configuration


This is the output configuration of the `JOIN` task that is used in conjunction with the `FORK_JOIN` task. The output of the
`JOIN` task is a map, where the keys are the names of the task reference names where were being `joinOn` and the keys are
the corresponding outputs of those tasks.


| Attribute      | Description |
| ----------- | ----------- |
| result   | The first results returned by the JQ expression     |
| resultList   | A List of results returned by the JQ expression        |
| error | An optional error message, indicating that the JQ query failed processing |

### Best Practices