---
title: "Delete Workflow Execution"
description: "Use the Orkes Conductor workflows API to delete Workflow Execution. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/workflow/delete-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Workflow Execution

**Endpoint:** `DELETE /api/workflow/{workflowId}/remove`

Deletes a workflow execution from the server using the workflow (execution) ID.

## Path parameters

| Parameter  | Description                                     | Type   | Required/ Optional |
| ---------- | ----------------------------------------------- | ------ | ------------------ |
| workflowId | The execution ID of the workflow to delete. | string | Required.          |

## Query parameters

| Parameter       | Description                                                                                                                                                          | Type    | Required/ Optional |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------ |
| archiveWorkflow | **Note:** This parameter is deprecated. There is no effect when configured. <br/><br/> If set to true, the workflow will be archived instead of permanently deleted. | boolean | Optional.          |

## Response

Returns 200 OK, indicating that the workflow has been deleted successfully.

## Examples

<details>
<summary>Delete workflow execution</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/workflow/373eabef-b846-11ef-b090-be4a9a728270/remove' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the workflow has been deleted successfully.

</details>
