---
sidebar_position: 2
slug: "/reference-docs/api/workflow/synchronous-execution"
description: "This API is used to start a workflow execution. The API response returns only after the workflow or a specified task is completed. "
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Execute Workflow Synchronously

**Endpoint:** `POST /api/workflow/execute/{name}`

Starts a workflow execution synchronously. This method returns a response after a specified *waitForSeconds* has passed or when a specified *waitUntilTaskRef* task completes, whichever completes first.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| name | The name of the workflow to be started. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| version | The workflow version. If unspecified, the latest version will be used. | integer | Optional. |


## Request body

Contains the workflow inputs. Format the request as an object containing key-value pairs.

**Example**

``` json
{
  "someKey": "someValue",
  "anotherKey": {}
}
```

## Header parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| X-Idempotency-key | A unique, user-generated key to prevent duplicate workflow executions. Idempotency data is retained for the life of the workflow execution. | string | Optional. |
| X-on-conflict | The idempotency strategy for handling duplicate requests. Supported values: <ul><li>**RETURN_EXISTING**—Return the _workflowId_ of the workflow instance with the same idempotency key.</li> <li>**FAIL**—Start a new workflow instance only if there are no workflow executions with the same idempotency key.</li> <li>**FAIL_ON_RUNNING**—Start a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Completed workflows can run again.</li></ul> | string | Required if _X-Idempotency-key_ is specified. |
| requestId | A user-generated request ID, which can be used to track the API request. | string | Optional. |
| waitUntilTaskRef | The reference name of the task to wait for before returning a response. <br/><br/> **Note:** If the workflow is incomplete, the response will return 206. | string | Optional. |
| waitForSeconds | The duration in seconds to wait before returning a response. Default is 10. | integer | Optional. |

## Response

Returns the workflow output.

## Examples

<details><summary>Execute a workflow synchronously</summary>

**Request**

```
curl -X 'POST' \
  'https://&lt;YOUR-CLUSTER>/api/workflow/execute/someWorkflow' \
  -H 'accept: application/json' \
  -H 'waitForSeconds: 15' \
  -H 'X-Authorization: &lt;TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "input1": "someValue"
  }'
```

**Response**

```
{
  "output": {
    "output1": "anotherValue",
    "output2": "yetAnotherValue"
    "
  }
}
```

</details>