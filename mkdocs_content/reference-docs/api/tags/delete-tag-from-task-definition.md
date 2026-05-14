---
title: "Delete Tag from Task Definition"
description: "Use the Orkes Conductor tags API to delete Tag from Task Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/tags/delete-tag-from-task-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Delete Tag from Task Definition

## Quick reference

Use this tags endpoint to delete Tag from Task Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/metadata/task/{taskName}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/metadata/task/{taskName}/tags`

Removes a specific tag from a task definition based on the provided key-value pair.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| taskName | The name of the task definition from which the tag is to be removed. | string | Required. | 

## Request Body

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

## Response

- Returns 200 OK, indicating that the tag has been removed from the task definition.
- Returns 404 if the specified tag (key-value pair) does not exist for the task definition, or if the task definition itself does not exist.

## Examples

<details>
<summary>Delete a tag from a task definition</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/hello_task/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "key": "team",
  "value": "engineering"
}'
```

**Response**

Returns 200 OK, indicating that the tag has been removed from the task definition.

</details>
