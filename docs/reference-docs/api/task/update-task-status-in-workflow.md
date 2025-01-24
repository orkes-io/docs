---
sidebar_position: 2
slug: "/reference-docs/api/task/update-task-status-in-workflow"
description: "This API is used to update the status of a task during a workflow execution."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Task Status in Workflow

**Endpoint:** `POST /tasks/{workflowId}/{taskRefName}/{status}`

Updates the status of a running task in a workflow execution.

## Path parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the workflow containing the task. | string | Required. | 
| taskRefName | The reference name of the task whose status is to be updated. | string | Required. | 
| status | The status to which the task is to be updated. Supported values:<ul><li>**IN_PROGRESS**</li><li>**FAILED**</li><li>**FAILED_WITH_TERMINAL_ERROR**</li><li>**COMPLETED**</li></ul> | string | Required. | 

## Query parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| workerId | The worker name from which the task is being polled, which is the hostname of the pod where the worker is running | string | Optional. | 

## Request body

Format the request to include any additional parameters, such as task output parameters.

**Example**
```json
{
  "taskOutput": "Add this as task output"
}
```

## Response

Returns the task execution ID of the updated task.

## Examples

<details><summary>Update task status in a workflow</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/tasks/3e1baeeb-bdfa-11ef-88e4-ce0afa758ea1/wait_ref/FAILED' \
  -H 'accept: text/plain' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
 "taskOutput": "Add this as task output"
}'
```
**Response**

```json
3e1c723c-bdfa-11ef-88e4-ce0afa758ea1
```
</details>
