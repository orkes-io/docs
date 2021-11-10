---
sidebar_position: 1
---

# Task Configurations

In this article we will explore the options available for configuring a task.

### Task Definition Fields

|Field Name|Description|
|---|---|
| name | A unique name for this task in the Conductor ecosystem |
| description | A brief description of what the task does. Useful when publishing a task that can be re-used |
| inputKeys | The list of keys that this task expects as input |
| outputKeys | The list of keys that this task produces as output |
| retryCount | The number of times this task should be retried when a failure occurs |
| retryLogic | Retries will be performed based on this configuration when a failure occurs. Options are: `FIXED`, `EXPONENTIAL_BACKOFF` |
| retryDelaySeconds | Time interval between retry attempts|
| concurrentExecLimit | The number of tasks that can be executed concurrently. Use this for rate limiting|
| rateLimitPerFrequency | Frequency setting for rate limiting - no. of instances per frequency|
| rateLimitFrequencyInSeconds | Frequency setting for rate limiting - time frame per frequency|
| timeoutSeconds | The overall time limit under which this task should successfully complete. If the task exceeds this time from when it was first polled, Conductor will apply the timeout policy configured |
| timeoutPolicy | The policy that is applied when this task times out. Options are: `RETRY`, `TIME_OUT_WF`, `ALERT_ONLY` |
| responseTimeoutSeconds | The time limit under which a task should be updated back once its polled by a client. If a client fails to update within this time, the task will be scheduled for another execution|
| pollTimeoutSeconds | If the task isn't polled by this time, the task will timeout|
| inputTemplate | An input template for this task which can be leveraged for default values|
| createTime | Time when this task was created, auto populated by the system |
| updateTime | Time when this task was last updated, auto populated by the system |
| createdBy | Metadata for storing the user / system that created this task definition |
| updatedBy | Metadata for storing the user / system that last updated this task definition |
| ownerApp | A metadata tag that can be used to store the name of the app/service owning this task |

Here is a task template payload with commonly used fields:

```json
{
  "createdBy": "user",
  "name": "sample_task_name_1",
  "description": "This is a sample task for demo",
  "responseTimeoutSeconds": 10,
  "timeoutSeconds": 30,
  "inputKeys": [],
  "outputKeys": [],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryCount": 3,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 5,
  "inputTemplate": {},
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1
}
```

### Best Practices

1. Refer to [Task Timeouts](./task-timeouts) for additional information on how the various timeout settings work
2. Refer to [Monitoring Task Queues](./monitoring-task-queues) on how to monitor task queues
