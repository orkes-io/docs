---
title: "Pause Workflow"
description: "Use the Orkes Conductor workflows API to pause Workflow. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/workflow/pause-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Pause Workflow, Pause Workflow API, API orchestration, API gateway"
---

# Pause Workflow

**Endpoint:** `PUT /api/workflow/{workflowId}/pause`

Pauses an ongoing workflow execution. Any currently running tasks will be completed, but no new tasks will be scheduled until the workflow is resumed.

## Path parameters

| Parameter  | Description                                    | Type   | Required/ Optional |
| ---------- | ---------------------------------------------- | ------ | ------------------ |
| workflowId | The execution ID of the workflow to pause. | string | Required.          |

## Response

Returns 200 OK, indicating that the workflow execution has paused successfully.

Returns 400 if an invalid workflow execution ID is provided.

## Examples

<details>
<summary>Pause a workflow execution</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/workflow/2ce9207f-d4a6-11ef-87b1-b2b27c52ebde/pause' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the workflow execution has paused successfully.

</details>

## Related pages

- [Workflows API Reference](/content/reference-docs/api/workflow)
- [Execute Workflow Asynchronously](/content/reference-docs/api/workflow/start-workflow-execution)
- [Execute Workflow Synchronously](/content/reference-docs/api/workflow/synchronous-workflow-execution)
- [Get Workflow by ID](/content/reference-docs/api/workflow/get-workflow-by-id)
- [Get Workflows by Correlation ID](/content/reference-docs/api/workflow/get-workflows-by-correlation-id)
- [Get Workflow Size](/content/reference-docs/api/workflow/get-workflow-size)
