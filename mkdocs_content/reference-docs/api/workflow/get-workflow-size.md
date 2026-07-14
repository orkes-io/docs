---
title: "Get Workflow Size"
description: "Use the Orkes Conductor workflows API to get Workflow Size. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/workflow/get-workflow-size"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Workflow Size, Get Workflow Size API, API orchestration, API gateway"
---

# Get Workflow Size

!!! info "Available since"
    - v5.4.2 and later

Endpoint: `GET /api/workflow/{workflowId}/size`

Returns the current serialized payload size of a workflow execution. Use this to identify workflows approaching the size limit before they get truncated.

## Path parameters

| Parameter  | Description                                                       | Type   | Required/ Optional |
| ---------- | ----------------------------------------------------------------- | ------ | ------------------ |
| workflowId | The execution ID of the workflow to retrieve the size for.        | string | Required.          |

## Response

Returns the size details of the specified workflow execution.

| Parameter  | Description                                                       | 
| ---------- | ----------------------------------------------------------------- | 
| sizeBytes | Current serialized size of the workflow, including all tasks, in bytes. | 
| limitBytes | Configured maximum workflow size in bytes. | 
| ratio | The ratio of current size to the limit. A value of 0 indicates no limit is configured. | 

## Examples

<details>
<summary>Get workflow size</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/workflow/93116479-7459-11f1-94df-8e188c22e250/size' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "sizeBytes": 3881,
  "limitBytes": 20971520,
  "ratio": 0.00018506050109863282
}
```

</details>
