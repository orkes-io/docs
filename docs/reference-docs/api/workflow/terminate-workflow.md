---
sidebar_position: 10
slug: "/reference-docs/api/workflow/terminate-workflow"
description: "This API is used to terminate a workflow execution with a termination reason."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow

**Endpoint:** `DELETE /api/workflow/{workflowId}`

Terminates a running workflow, with the option to provide a reason for termination and/or trigger a failure workflow.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the workflow to be terminated. | string | Required. |

## Query parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| reason | The reason for termination. | string | Optional. |
| triggerFailureWorkflow | If set to true, the associated compensation flow (if any) will be triggered. Default is false. <br/><br/> Learn more about compensation flows in [Handling Failures](/error-handling#workflow-compensation-flows). | boolean | Optional. |

## Examples

<details><summary>Terminate a workflow execution</summary>

**Request**

```
curl -X 'DELETE' \
  'https://&lt;YOUR-CLUSTER>/api/workflow/77916c63-d3e7-11ef-87b1-b2b27c52ebde?reason=transaction%20cancelled&triggerFailureWorkflow=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>'
```

**Response**

Returns 200 OK, indicating that the workflow execution has been terminated successfully.

</details>