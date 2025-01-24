---
sidebar_position: 9
slug: "/reference-docs/api/workflow/resume-workflow"
description: "This API is used to resume a paused workflow execution."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Resume Workflow

**Endpoint:** `PUT /api/workflow/{workflowId}/resume` 

Resumes a paused workflow execution. This method has no effect if the workflow is not paused.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| workflowId | The execution ID of the paused workflow to be resumed. | string | Required. |

## Examples

<details><summary>Resume workflow execution</summary>

**Request**

```
curl -X 'PUT' \
  'https://&lt;YOUR-CLUSTER>/api/workflow/2ce9207f-d4a6-11ef-87b1-b2b27c52ebde/resume' \
  -H 'accept: */*' \
  -H 'X-Authorization: &lt;TOKEN>'
```

**Response**

Returns 200 OK, indicating that the workflow execution has resumed successfully.

</details>