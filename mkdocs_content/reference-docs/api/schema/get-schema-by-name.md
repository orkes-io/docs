---
title: "Get Schema by Name"
description: "Use the Orkes Conductor schemas API to get Schema by Name. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schema/get-schema-by-name"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Schema by Name 

## Quick reference

Use this schemas endpoint to get Schema by Name. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/schema/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/schema/{name}`

Retrieves the latest version of a schema definition by its name.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schema to retrieve.| string | Required. | 

## Response

Returns a schema object containing the latest version of the specified schema. Returns 404 if an invalid schema name is provided.

## Examples

<details>
<summary>Get the latest version of a schema</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/schema/FeedbackSchema' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "createTime": 1767678326224,
  "updateTime": 1767678326224,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "FeedbackSchema",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "http://json-schema.org/draft-07/schema",
    "type": "object",
    "properties": {
      "rating": {
        "type": "integer",
        "minimum": 1,
        "maximum": 5
      },
      "comment": {
        "type": "string"
      }
    },
    "required": [
      "rating",
      "comment"
    ]
  }
}
```

</details>
