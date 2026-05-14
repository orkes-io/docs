---
title: "Replace Tags in a Task Definition"
description: "Use the Orkes Conductor tags API to replace Tags in a Task Definition. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/tags/replace-tags-in-a-task-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Replace Tags in a Task Definition

## Quick reference

Use this tags endpoint to replace Tags in a Task Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/metadata/task/{taskName}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/metadata/task/{taskName}/tags`

Replaces all existing tags in a task definition with the new tags provided in the request. If the task definition has multiple tags, they will all be replaced with the tags specified in the request body.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| taskName | The name of the task definition in which the tags are to be replaced.| string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key       | The tag key.                                     | string | Required.         |
| value     | The tag value.                                   | string | Required.         |

## Response

- Returns 200 OK, indicating that the tag has been replaced in the task definition.
- Returns 404 if the task definition does not exist.

## Examples

<details>
<summary>Replace a tag from a task definition</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/simple/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "environment",
    "value": "testing"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been replaced in the task definition.

</details>

<details>
<summary>Replace with multiple tags in a task definition</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/simple/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "env",
    "value": "prod"
  },
  {
    "key": "team",
    "value": "backend"
  }
]
]'
```

**Response**

Returns 200 OK, indicating that the tags have been replaced in the task definition.

</details>
