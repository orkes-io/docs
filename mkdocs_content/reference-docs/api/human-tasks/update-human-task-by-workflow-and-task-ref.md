---
title: "Update Human Task by Workflow ID and Task Reference"
description: "Use the Orkes Conductor human tasks API to update Human Task by Workflow ID and Task Reference. Includes endpoint details, authentication, parameters, request."
canonical_route: "reference-docs/api/human-tasks/update-human-task-by-workflow-and-task-ref"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Update Human Task by Workflow ID and Task Reference

## Quick reference

Use this human tasks endpoint to update Human Task by Workflow ID and Task Reference. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/human/tasks/update/taskRef`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/human/tasks/update/taskRef`

Updates a Human task's output data with form field inputs using the workflow ID and task reference name. You can optionally mark the task as complete.

The invoking user should be one of the following:

- Cluster admin
- Task owner of the Human task
- Task claimant

## Query parameters

| Parameter | Description                                                                                               | Type    | Required/ Optional |
| --------- | --------------------------------------------------------------------------------------------------------- | ------- | ------------------ |
| workflowId  | The workflow execution ID that contains the Human task to be updated. | string | Required.          |
| taskRefName | The reference name of the Human task to be updated. | string | Required. | 
| complete | Whether to mark the task as complete or not. Set to `false` to keep the task in progress. Default is `false`. | boolean | Optional. | 
| iteration | The iteration number if the task is inside a loop. Leave empty to update the latest iteration or if the task is not in a loop. | integer | Optional. | 

## Request body

Format the request as an object containing the form field inputs. The request body must match the form fields defined in the Human task, or it will fail validation.

**Example**

```json
{
  "formFieldName": "yourInputHere"
}
```

## Response

Returns 200 OK if the Human task has been updated or completed successfully. Returns 404 if an invalid workflow ID or task reference name is provided.

## Examples

<details>
<summary>Update a Human task’s output</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/update/taskRef?workflowId=ca04d4c8-027a-11f1-913a-226156badb04&taskRefName=human_ref&complete=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "approve": "Yes",
"comments": "lgtm"
}'
```

**Response**

Returns 200 OK, indicating that the Human task’s output has been updated successfully.

</details>

<details>
<summary>Update a Human task's output and complete the task</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/update/taskRef?workflowId=ca04d4c8-027a-11f1-913a-226156badb04&taskRefName=human_ref&complete=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "approve": "Yes",
"comments": "lgtm"
}'
```

**Response**

Returns 200 OK, indicating that the Human task’s output has been updated, and the task has been completed successfully.

</details>
