---
sidebar_position: 3
slug: "/reference-docs/api/workflow/get-workflow-by-id"
description: "This API is used to retrieve a workflow execution based on its workflow ID."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow by ID

**Endpoint:** `GET /api/workflow/{workflowId}`

Gets a workflow’s execution details using its workflow ID.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the workflow whose details are to be fetched. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| includeTasks | If set to true, all task execution details will be fetched in a `tasks` array. Default is true. | boolean | Optional. |
| summarize | **Note:** This parameter is deprecated. There is no effect when configured. <br/><br/> Whether the workflow details will be summarized. | boolean | Optional. |

## Response

Returns a JSON object containing the workflow’s execution details.

## Examples

<details><summary>Get workflow with task execution details</summary>

**Request**

```
curl -X 'GET' \
  'https://&lt;YOUR-CLUSTER>/api/workflow/6f5aa0f1-b871-11ef-b090-be4a9a728270?includeTasks=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>'
```

**Response**

```
{
  "ownerApp": "",
  "createTime": 1733998281080,
  "updateTime": 1733998281080,
  "createdBy": "user@example.com",
  "status": "RUNNING",
  "endTime": 0,
  "workflowId": "6f5aa0f1-b871-11ef-b090-be4a9a728270",
  "tasks": [],
  "input": {},
  "output": {},
  "taskToDomain": {},
  "failedReferenceTaskNames": [],
  "workflowDefinition": {
    "createTime": 1728528754591,
    "updateTime": 1728529067708,
    "name": "simple-worker-project",
    "description": "Java worker",
    "version": 1,
    "tasks": [
      {
        "name": "simple-java-worker",
        "taskReferenceName": "simple-java-worker_ref",
        "inputParameters": {},
        "type": "SIMPLE",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "taskDefinition": {
          "createTime": 0,
          "updateTime": 0,
          "name": "simple-java-worker",
          "retryCount": 3,
          "timeoutSeconds": 0,
          "inputKeys": [],
          "outputKeys": [],
          "timeoutPolicy": "TIME_OUT_WF",
          "retryLogic": "FIXED",
          "retryDelaySeconds": 60,
          "responseTimeoutSeconds": 3600,
          "inputTemplate": {},
          "rateLimitPerFrequency": 0,
          "rateLimitFrequencyInSeconds": 1,
          "backoffScaleFactor": 1,
          "totalTimeoutSeconds": 0,
          "enforceSchema": false
        },
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      }
    ],
    "inputParameters": [],
    "outputParameters": {},
    "failureWorkflow": "",
    "schemaVersion": 2,
    "restartable": true,
    "workflowStatusListenerEnabled": false,
    "ownerEmail": "user@example.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0,
    "variables": {},
    "inputTemplate": {},
    "enforceSchema": true
  },
  "priority": 0,
  "variables": {},
  "lastRetriedTime": 0,
  "failedTaskNames": [],
  "history": [],
  "rateLimited": false,
  "startTime": 1733998281080,
  "workflowVersion": 1,
  "workflowName": "simple-worker-project"
}
```

</details>


<details><summary>Get workflow without task execution details</summary>

**Request**

```
curl -X 'GET' \
  'https://&lt;YOUR_CLUSTER>/api/workflow/6f5aa0f1-b871-11ef-b090-be4a9a728270?includeTasks=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>'
```

**Response**

```
{
  "ownerApp": "",
  "createTime": 1733998281080,
  "updateTime": 1733998281080,
  "createdBy": "user@example.com",
  "status": "RUNNING",
  "endTime": 0,
  "workflowId": "6f5aa0f1-b871-11ef-b090-be4a9a728270",
  "tasks": [
    {
      "taskType": "simple-java-worker",
      "status": "SCHEDULED",
      "inputData": {
        "_createdBy": "user@example.com"
      },
      "referenceTaskName": "simple-java-worker_ref",
      "retryCount": 0,
      "seq": 1,
      "pollCount": 0,
      "taskDefName": "simple-java-worker",
      "scheduledTime": 1733998281088,
      "startTime": 0,
      "endTime": 0,
      "updateTime": 0,
      "startDelayInSeconds": 0,
      "retried": false,
      "executed": false,
      "callbackFromWorker": true,
      "responseTimeoutSeconds": 3600,
      "workflowInstanceId": "6f5aa0f1-b871-11ef-b090-be4a9a728270",
      "workflowType": "simple-worker-project",
      "taskId": "6f5bd972-b871-11ef-b090-be4a9a728270",
      "callbackAfterSeconds": 0,
      "outputData": {},
      "workflowTask": {
        "name": "simple-java-worker",
        "taskReferenceName": "simple-java-worker_ref",
        "inputParameters": {},
        "type": "SIMPLE",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "taskDefinition": {
          "createTime": 0,
          "updateTime": 0,
          "name": "simple-java-worker",
          "retryCount": 3,
          "timeoutSeconds": 0,
          "inputKeys": [],
          "outputKeys": [],
          "timeoutPolicy": "TIME_OUT_WF",
          "retryLogic": "FIXED",
          "retryDelaySeconds": 60,
          "responseTimeoutSeconds": 3600,
          "inputTemplate": {},
          "rateLimitPerFrequency": 0,
          "rateLimitFrequencyInSeconds": 1,
          "backoffScaleFactor": 1,
          "totalTimeoutSeconds": 0,
          "enforceSchema": false
        },
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      },
      "rateLimitPerFrequency": 0,
      "rateLimitFrequencyInSeconds": 1,
      "workflowPriority": 0,
      "iteration": 0,
      "subworkflowChanged": false,
      "firstStartTime": 0,
      "queueWaitTime": 0,
      "loopOverTask": false,
      "taskDefinition": {
        "createTime": 0,
        "updateTime": 0,
        "name": "simple-java-worker",
        "retryCount": 3,
        "timeoutSeconds": 0,
        "inputKeys": [],
        "outputKeys": [],
        "timeoutPolicy": "TIME_OUT_WF",
        "retryLogic": "FIXED",
        "retryDelaySeconds": 60,
        "responseTimeoutSeconds": 3600,
        "inputTemplate": {},
        "rateLimitPerFrequency": 0,
        "rateLimitFrequencyInSeconds": 1,
        "backoffScaleFactor": 1,
        "totalTimeoutSeconds": 0,
        "enforceSchema": false
      }
    }
  ],
  "input": {},
  "output": {},
  "taskToDomain": {},
  "failedReferenceTaskNames": [],
  "workflowDefinition": {
    "createTime": 1728528754591,
    "updateTime": 1728529067708,
    "name": "simple-worker-project",
    "description": "Java worker",
    "version": 1,
    "tasks": [
      {
        "name": "simple-java-worker",
        "taskReferenceName": "simple-java-worker_ref",
        "inputParameters": {},
        "type": "SIMPLE",
        "decisionCases": {},
        "defaultCase": [],
        "forkTasks": [],
        "startDelay": 0,
        "joinOn": [],
        "optional": false,
        "taskDefinition": {
          "createTime": 0,
          "updateTime": 0,
          "name": "simple-java-worker",
          "retryCount": 3,
          "timeoutSeconds": 0,
          "inputKeys": [],
          "outputKeys": [],
          "timeoutPolicy": "TIME_OUT_WF",
          "retryLogic": "FIXED",
          "retryDelaySeconds": 60,
          "responseTimeoutSeconds": 3600,
          "inputTemplate": {},
          "rateLimitPerFrequency": 0,
          "rateLimitFrequencyInSeconds": 1,
          "backoffScaleFactor": 1,
          "totalTimeoutSeconds": 0,
          "enforceSchema": false
        },
        "defaultExclusiveJoinTask": [],
        "asyncComplete": false,
        "loopOver": [],
        "onStateChange": {},
        "permissive": false
      }
    ],
    "inputParameters": [],
    "outputParameters": {},
    "failureWorkflow": "",
    "schemaVersion": 2,
    "restartable": true,
    "workflowStatusListenerEnabled": false,
    "ownerEmail": "user@example.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0,
    "variables": {},
    "inputTemplate": {},
    "enforceSchema": true
  },
  "priority": 0,
  "variables": {},
  "lastRetriedTime": 0,
  "failedTaskNames": [],
  "history": [],
  "rateLimited": false,
  "startTime": 1733998281080,
  "workflowName": "simple-worker-project",
  "workflowVersion": 1
}
```
</details>