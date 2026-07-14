---
title: "Add Tags to a Task Definition"
description: "Use the Orkes Conductor tags API to add Tags to a Task Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/tags/add-tags-to-a-task-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tags to a Task Definition, Add Tags to a Task Definition API, API orchestration, API gateway, workflow tasks, task queues"
---

# Add Tags to a Task Definition

## Quick reference

Use this tags endpoint to add Tags to a Task Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/metadata/task/{taskName}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/metadata/task/{taskName}/tags`

Adds tags to a task definition. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| taskName | The name of the task definition to which the tags are to be added.| string | Required. | 

## Request Body

The request body should be a JSON object where each key-value pair represents a tag.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key       | The tag key.                                     | string | Required.         |
| value     | The tag value.                                   | string | Required.         |

To add multiple tags in a single request, include multiple key-value pairs in the same object. For example:

```json
{
"key": "environment",
"value": "production",
"key": "team",
"value": "backend"
}
```

## Response

- Returns 200 OK, indicating that tags have been added to the task definition.
- Returns 404 if the task definition does not exist.

## Examples

<details>
<summary>Add a single tag to a task definition</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/simple/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
"key": "environment",
"value": "production"
}'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the task definition.

</details>


<details>
<summary>Add multiple tags to a task definition</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/simple/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
"key": "environment",
"value": "production",
"key": "team",
"value": "backend"
}'
```

**Response**

Returns 200 OK, indicating that tags have been added to the task definition. 

</details>
