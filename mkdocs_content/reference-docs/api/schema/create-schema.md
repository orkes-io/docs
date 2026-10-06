---
title: "Create Schema"
description: "Use the Orkes Conductor schemas API to create Schema. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/schema/create-schema"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Create Schema, Create Schema API, API orchestration, API gateway"
---

# Create Schema

## Quick reference

Use this schemas endpoint to create Schema. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/schema`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/schema`

Creates a new schema definition. If a schema with the same name exists, it replaces the existing schema.

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| newVersion | Whether to save a schema as a new version. Default is `false`. | boolean | Optional. | 

## Request body

Currently, schemas can be defined in the [JSON Schema](https://json-schema.org/specification) format. Format the request body with the following parameters:

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the schema.  | string | Required. | 
| version | The version number of the schema. | string | Optional. | 
| type | Set the schema type as `JSON`. | string | Required. | 
| data | Include the JSON Schema parameters here. | object | Required. | 

**Example request body**

```json
{
  "createTime": 1727378396701,
  "updateTime": 1727378396701,
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "name": "itemSchema",
  "version": 1,
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
      }
    },
    "required": [
      "productId"
    ]
  }
}
```

## Response

Returns 200, indicating that the schema has been created successfully.

## Examples

<details>
<summary>Create a new schema</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/schema?newVersion=false' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "itemSchema",
  "version": 1,
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
      }
    },
    "required": [
      "productId"
    ]
  }
}'
```

**Response**

Returns 200, indicating that the schema has been created successfully.

</details>

<details>
<summary>Create a schema with a new version</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/schema?newVersion=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "itemSchema",
  "version": 1,
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
}'
```

**Response**

Returns 200, indicating that the new schema version was created successfully.

</details>

## Related pages

- [Schemas API Reference](/content/reference-docs/api/schema)
- [Get All Schemas](/content/reference-docs/api/schema/get-all-schemas)
- [Get Schema by Name](/content/reference-docs/api/schema/get-schema-by-name)
- [Get Schema by Name and Version](/content/reference-docs/api/schema/get-schema-by-name-and-version)
- [Delete Schema](/content/reference-docs/api/schema/delete-schema)
- [Delete Schema Version](/content/reference-docs/api/schema/delete-schema-version)
