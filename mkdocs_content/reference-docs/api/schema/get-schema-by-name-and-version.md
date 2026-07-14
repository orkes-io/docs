---
title: "Get Schema by Name and Version"
description: "Use the Orkes Conductor schemas API to get Schema by Name and Version. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/schema/get-schema-by-name-and-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Schema by Name and Version

## Quick reference

Use this schemas endpoint to get Schema by Name and Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/schema/{name}/{version}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/schema/{name}/{version}`

Retrieves a schema definition by its name and version.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schema to retrieve.| string | Required. | 
| version | The version to retrieve. | integer | Required. | 

## Response

Returns a schema object containing the specified version of the schema definition. Returns 404 if an invalid path parameter is provided.

## Examples

<details>
<summary>Get a schema by name and version</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/schema/itemSchema/2' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "createTime": 1770719857291,
  "updateTime": 1770719857291,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "itemSchema",
  "version": 2,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/product.schema.json",
    "type": "object",
    "properties": {
      "productId": {
        "description": "The unique identifier for a product",
        "type": "integer"
      },
      "productName": {
        "description": "Name of the product",
        "type": "string"
      },
      "productType": {
        "description": "Type of the product",
        "type": "string"
      }
    },
    "required": [
      "productId"
    ]
  }
}
```

</details>
