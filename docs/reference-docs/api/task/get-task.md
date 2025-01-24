---
sidebar_position: 2
slug: "/reference-docs/api/task/get-task"
description: "This API is used to retrieve the current state and details of a specific task."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Task by ID

**Endpoint:** `GET /tasks/{taskId}`

Gets a task's execution details using its task execution ID.

## Path parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskId | The execution ID of the task to be fetched. | string | Required. | 

## Response

Returns a JSON object containing the task's execution details.

## Examples

<details><summary>Get task using its task execution ID</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/tasks/6f207c78-bdf2-11ef-88e4-ce0afa758ea1' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```
**Response**

```json
{
  "taskType": "WAIT",
  "status": "IN_PROGRESS",
  "inputData": {
    "_createdBy": "john.doe@acme.com"
  },
  "referenceTaskName": "wait_ref",
  "retryCount": 0,
  "seq": 1,
  "pollCount": 1,
  "taskDefName": "wait",
  "scheduledTime": 1734697335733,
  "startTime": 1734697335733,
  "endTime": 0,
  "updateTime": 0,
  "startDelayInSeconds": 0,
  "retried": false,
  "executed": false,
  "callbackFromWorker": true,
  "responseTimeoutSeconds": 0,
  "workflowInstanceId": "0c645656-becd-11ef-a89d-86a819bd92bf",
  "workflowType": "test-workflow",
  "taskId": "0c658ed7-becd-11ef-a89d-86a819bd92bf",
  "callbackAfterSeconds": 2147483647,
  "outputData": {},
  "workflowTask": {
    "inputParameters": {},
    "type": "SIMPLE",
    "decisionCases": {},
    "defaultCase": [],
    "forkTasks": [],
    "startDelay": 0,
    "joinOn": [],
    "optional": false,
    "rateLimited": false,
    "defaultExclusiveJoinTask": [],
    "asyncComplete": false,
    "loopOver": [],
    "onStateChange": {},
    "permissive": false
  },
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 0,
  "workflowPriority": 0,
  "iteration": 0,
  "subworkflowChanged": false,
  "firstStartTime": 0,
  "queueWaitTime": 0,
  "loopOverTask": false,
  "taskDefinition": null
}
```
</details>
