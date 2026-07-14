---
title: "Get Tags from a Task Definition"
description: "Use the Orkes Conductor tags API to get Tags from a Task Definition. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/tags/get-tags-from-task-definition"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from a Task Definition, Get Tags from a Task Definition API, API orchestration, API gateway, workflow tasks, task queues"
---

# Get Tags from a Task Definition

## Quick reference

Use this tags endpoint to get Tags from a Task Definition. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/task/{taskName}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/task/{taskName}/tags`

Retrieves the tags associated with a task definition.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| taskName | The name of the task definition from which the tags are to be retrieved.| string | Required. | 

## Response

Returns a JSON array of tag objects associated with the task definition. Each object includes:

- key (string): The tag key.
- value (string): The tag value.

Returns an empty array `[]` if no tags are associated with the task definition.

## Examples

<details>
<summary>Get tags from a task definition</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/task/sample-api-test/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns a JSON array of tag objects associated with the task definition.

```json
[
  {
    "key": "team",
    "value": "apac"
  },
  {
    "key": "team",
    "value": "engineering"
  }
]
```

</details>
