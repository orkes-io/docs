---
sidebar_position: 7
slug: "/reference-docs/api/workflow/skip-task-from-workflow"
description: "This API is used to skip a specific task in a currently running workflow."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Skip Task in Workflow Execution

**Endpoint:** `PUT /api/workflow/{workflowId}/skiptask/{taskReferenceName}`

Skips a scheduled task in an ongoing workflow using the task reference name. The skipped task’s inputs and outputs can be updated using *skipTaskRequest*.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the running workflow that contains the task to be skipped. | string | Required. |
| taskReferenceName | The reference name of the task to be skipped. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| skipTaskRequest | Contains the skipped task’s inputs and outputs. | object | Required. |
| skipTaskRequest. **taskInput** | The skipped task’s inputs. | object | Optional. |
| skipTaskRequest. **taskOutput** | The skipped task’s outputs. | object | Optional. |

## Examples

<details><summary>Skip a task</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR_CLUSTER>o/api/workflow/18f871a1-d3f8-11ef-a114-0af1b159704e/skiptask/someTask_ref' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the task has been skipped successfully.

</details>