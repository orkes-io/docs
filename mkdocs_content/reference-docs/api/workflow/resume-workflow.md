---
title: "Resume Workflow"
description: "Use the Orkes Conductor workflows API to resume Workflow. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/workflow/resume-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
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
