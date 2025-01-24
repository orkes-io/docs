---
sidebar_position: 1
slug: "/reference-docs/api/metadata/creating-task-definitions"
description: "Tasks are the building blocks of workflow in Orkes Conductor. This API is used to create task definitions in Orkes Conductor."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Task Definition

**Endpoint:** `POST /api/metadata/taskdefs`

Creates a new task definition.

## Request body

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| name | A unique name for the task. | string | Required. |
| description | A brief description of the task. | string | Optional. |
| [retryCount](https://orkes.io/content/error-handling#task-retries) | The number of retry attempts if the task fails. | integer | Optional. |
| [retryDelaySeconds](https://orkes.io/content/error-handling#task-retries) | The time (in seconds) to wait before each retry attempt. | integer | Optional. | 
| [backOffScaleFactor](https://orkes.io/content/error-handling#task-retries) | The value multiplied with _retryDelaySeconds_ to determine the interval for retry. | integer | Optional. | 
| [retryLogic](https://orkes.io/content/error-handling#task-retries) | The policy that determines the retry mechanism for the tasks. Supported values:<ul><li>**FIXED–**Retries after a fixed interval defined by _retryDelaySeconds_.</li><li>**LINEAR_BACKOFF–**Retries occur with a delay that increases linearly based on _retryDelaySeconds_ x _backoffScaleFactor_ x _attemptNumber_.</li><li>**EXPONENTIAL_BACKOFF–**Retries occur with a delay that increases exponentially based on  _retryDelaySeconds_ x (_backoffScaleFactor_ ^ _attemptNumber_).</li></ul> | string | Optional. | 
| [rateLimitPerFrequency](https://orkes.io/content/error-handling#task-rate-limits) | The maximum number of task executions that can be scheduled in a given duration. | integer | Optional. |
| [rateLimitFrequencyInSeconds](https://orkes.io/content/error-handling#task-rate-limits) | The frequency window (in seconds) for the rate limit. | integer | Optional. | 
| [concurrentExecLimit](https://orkes.io/content/error-handling#task-rate-limits) | The number of task executions that can be executed concurrently. | integer | Optional. | 
| [timeOutSeconds](https://orkes.io/content/error-handling#task-timeouts) | Time (in seconds) for the task to reach a terminal state before it gets marked as _TIMED_OUT_. No timeout occurs if the value is set to 0.	| integer | Required. | 
| [responseTimeoutSeconds](https://orkes.io/content/error-handling#task-timeouts) | The maximum duration in seconds that a worker has to respond to the server with a status update before it gets marked as _TIMED_OUT_. | integer | Optional. |
| [pollTimeoutSeconds](https://orkes.io/content/error-handling#task-timeouts) | Time (in seconds), after which the task is marked as _TIMED_OUT_ if not polled by a worker. No timeout occurs if the value is set to 0. | integer | Optional. | 
| [timeoutPolicy](https://orkes.io/content/error-handling#task-timeouts) | The policy for handling timeout. Supported values:<ul><li>**RETRY–**Retries the task based on the retry configuration.</li><li>**TIME_OUT_WF–**The task is marked as _TIMED_OUT_ and is terminated, which also sets the workflow status as _TIMED_OUT_.</li><li>**ALERT_ONLY**–An alert message is logged when the timeout occurs.</li></ul>To create a task that never times out, set _timeoutSeconds_ and _pollTimeoutSeconds_ to 0. | string | Optional. |
| [totalTimeoutSeconds](https://orkes.io/content/error-handling#task-timeouts) | The total duration (in seconds) after which the task will be _TIMED_OUT_, regardless of the retry configuration. Once this duration is reached, no further retries will be attempted. | integer | Required. | 
| enforceSchema | Whether to enforce input/output schema validation for all instances of the task. Set to _true_ to enable validation or _false_ to disable. | boolean | Optional. |
| inputSchema | The schema parameters to be used as input schema for the task definition. Learn more about [creating and using schemas](https://orkes.io/content/developer-guides/schema-validation). | object | Required if _enforceSchema_ is set to _true_. | 
| outputSchema | The schema parameters to be used as output schema for the task definition. Learn more about [creating and using schemas](https://orkes.io/content/developer-guides/schema-validation). | object | Required if _enforceSchema_ is set to _true_. | 
| inputTemplate | The default template values to be supplied for every instance of the task definition. Learn more about [using input templates](https://orkes.io/content/developer-guides/task-input-templates). | object | Optional. | 
| inputKeys | Keys representing the expected input for the task. | array | Optional. | 
| outputKeys | Keys representing the expected output from the task. | array | Optional. | 
| tags | A key-value map to add tags to the task definition. Each tag consists of a key associated with a corresponding value. | object | Optional. | 
| ownerEmail | The email address of the user creating the task definition. | string | Required. | 

## Examples

<details><summary>Create a new task definition</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -d '{
  "name": "sample-api-test",
  "description": "Task created using API",
  "retryCount": 3,
  "timeoutSeconds": 3600,
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 60,
  "responseTimeoutSeconds": 600,
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1,
  "ownerEmail": "john.doe@acme.com",
  "pollTimeoutSeconds": 3600,
  "inputKeys": [
    "abc"
  ],
  "outputKeys": [
    "xyz"
  ],
  "inputTemplate": {
    "someKey": "someValue"
  },
  "backoffScaleFactor": 1,
  "concurrentExecLimit": 0
}'
```
**Response**

Returns 200 OK, indicating that the task definition has been created successfully.
</details>