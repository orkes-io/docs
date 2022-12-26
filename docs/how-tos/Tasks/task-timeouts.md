---
sidebar_position: 1
---

# Task Timeouts

Tasks can be configured to handle various scenarios of timeouts. Here are some scenarios and the relevant configuration
fields.

|Scenario|Configuration|
|---|---|
|A task worker picked up the task but failed to respond back with an update|`responseTimeoutSeconds`|
|A task worker picks up the task and updates progress but fails to complete it within an expected timeframe|`timeoutSeconds`|
|A task is stuck in a retry loop with repeated failures beyond an expected timeframe|`timeoutSeconds`|
|A task doesn't get picked by any workers for a specific amount of time|`pollTimeoutSeconds`|
|The task isn't completed within a specified amount of time despite being picked up by task workers|`timeoutSeconds`|

> `timeoutSeconds` should always be greater than `responseTimeoutSeconds`

### Timeout Seconds

```json
"timeoutSeconds" : 30
```

When configured with a value > `0`, the system will wait for this task to complete successfully until this number of
seconds from when the task is first polled. We can use this to fail a workflow when a task breaches the overall SLA for
completion.

### Response Timeout Seconds

```json
"responseTimeoutSeconds" : 10
```

When configured with a value > `0`, the system will wait for this number of seconds from when the task is polled before
the worker updates back with a status. The worker can keep the task in `IN_PROGRESS` state if it requires more time to
complete.

### Poll Timeout Seconds

```json
"pollTimeoutSeconds" : 10
```

When configured with a value > `0`, the system will wait for this number of seconds for the task to be picked up by a
task worker. Useful when you want to detect a backlogged task queue with not enough workers.
