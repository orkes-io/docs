---
title: "Get All Schemas"
description: "Use the Orkes Conductor schemas API to get All Schemas. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# Get All Schemas

## Quick reference

Use this schemas endpoint to get All Schemas. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/schema`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/schema`

Retrieves all schemas from your Conductor cluster. 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| short | Whether to return the short version of the schema definition, which has only `name`, `version`, `createTime`, and `updateTime` fields. Default is `false`. | boolean | Optional. | 

## Response

Returns an array of schema objects. Each object contains the retrieved schema definition. When `short=true`, only the `name`, `version`, `createTime`, and `updateTime` fields are returned.

## Examples

<details>
<summary>Get all schemas</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URLS>/api/schema?short=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1770719679827,
    "updateTime": 1770719679827,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
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
          "description": "Name of the car",
          "type": "string"
        }
      },
      "required": [
        "productId"
      ]
    }
  },
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
  },
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
  },
  {
    "createTime": 1763622167039,
    "updateTime": 1763622167039,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "productSchema",
    "version": 1,
    "type": "JSON",
    "data": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "productId": {
          "type": "integer"
        }
      },
      "required": [
        "productId"
      ]
    }
  },
  {
    "createTime": 1769066240839,
    "updateTime": 1769066240839,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "customerSchema",
    "version": 1,
    "type": "JSON",
    "data": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "customerId": {
          "type": "string"
        }
      },
      "required": [
        "customerId"
      ]
    }
  }
]
```

</details>

<details>
<summary>Get all schemas with `short` set to `true`</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/schema?short=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 0,
    "updateTime": 0,
    "name": "itemSchema",
    "version": 1
  },
  {
    "createTime": 0,
    "updateTime": 0,
    "name": "itemSchema",
    "version": 2
  },
  {
    "createTime": 0,
    "updateTime": 0,
    "name": "FeedbackSchema",
    "version": 1
  },
  {
    "createTime": 0,
    "updateTime": 0,
    "name": "productSchema",
    "version": 1
  },
  {
    "createTime": 0,
    "updateTime": 0,
    "name": "customerSchema",
    "version": 1
  }
]
```

</details>
