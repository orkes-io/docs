---
title: "Resume Workflow"
description: "Use the Orkes Conductor workflows API to resume Workflow. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/workflow/resume-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Resume Workflow, Resume Workflow API, API orchestration, API gateway"
---

# Resume Workflow

**Endpoint:** `PUT /api/workflow/{workflowId}/resume`

Resumes a paused workflow execution. This method has no effect if the workflow is not paused.

## Path parameters

| Parameter  | Description                                            | Type   | Required/ Optional |
| ---------- | ------------------------------------------------------ | ------ | ------------------ |
| workflowId | The execution ID of the paused workflow to resume. | string | Required.          |

## Response

Returns 200 OK, indicating that the workflow execution has resumed successfully.

Returns 400 if an invalid workflow execution ID is provided.

## Examples

<details>
<summary>Resume workflow execution</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/workflow/2ce9207f-d4a6-11ef-87b1-b2b27c52ebde/resume' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the workflow execution has resumed successfully.

</details>

## Related pages

- [Workflows API Reference](/content/reference-docs/api/workflow)
- [Execute Workflow Asynchronously](/content/reference-docs/api/workflow/start-workflow-execution)
- [Execute Workflow Synchronously](/content/reference-docs/api/workflow/synchronous-workflow-execution)
- [Get Workflow by ID](/content/reference-docs/api/workflow/get-workflow-by-id)
- [Get Workflows by Correlation ID](/content/reference-docs/api/workflow/get-workflows-by-correlation-id)
- [Get Workflow Size](/content/reference-docs/api/workflow/get-workflow-size)
