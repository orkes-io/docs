---
sidebar_position: 11
slug: "/reference-docs/api/workflow/rerun-workflow"
description: "This API is used to rerun a workflow from a specific task using on an updated workflow input if needed."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Rerun Workflow

**Endpoint:** `POST /api/workflow/{workflowId}/rerun`

Reruns an ongoing or terminal workflow from a specific *reRunFromTaskId* task, or reruns a terminal workflow execution from the start, with the option to supply updated inputs. When invoked, all previous *reRunFromTaskId* task attempts will be marked as canceled even if they have been completed successfully.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the workflow to be rerun. | string | Required. |

## Request body

Format the request as an object containing the following parameters.

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| reRunFromTaskId | The unique identifier of the task to rerun the workflow from. | string | Optional. |
| reRunFromWorkflowId | The unique identifier of the workflow to be rerun. | string | Optional. |
| correlationId | A unique identifier used to correlate the current workflow execution with other executions of the same workflow. | string | Optional. |
| taskInput | The task inputs for the task identified in _reRunFromTaskId_. If unspecified, the same inputs from the previous run will be used. | object | Optional. |
| workflowInput | The workflow inputs. If unspecified, the same inputs from the previous run will be used. | object | Optional. |

**Example**

``` json
{
  "correlationId": "string",
  "reRunFromTaskId": "string",
  "reRunFromWorkflowId": "string",
  "taskInput": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  },
  "workflowInput": {
    "additionalProp1": {},
    "additionalProp2": {},
    "additionalProp3": {}
  }
}
```

## Response

Returns the supplied *workflowId*.

## Examples

<details><summary>Rerun workflow from a task</summary>

**Request**

```
curl -X 'POST' \
  'https://&lt;YOUR-CLUSTER>/api/workflow/3163f2e3-d4a9-11ef-a114-0af1b159704e/rerun' \
  -H 'accept: text/plain' \
  -H 'X-Authorization: &lt;TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "reRunFromTaskId": "87799dc8-d4b8-11ef-a114-0af1b159704e"
}'
```

**Response**

```
3163f2e3-d4a9-11ef-a114-0af1b159704e
```
</details>