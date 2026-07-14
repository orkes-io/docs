---
title: "Discover and Register Service Endpoints"
description: "Use the Orkes Conductor remote services API to discover and Register Service Endpoints. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/discover-service-endpoints"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Discover and Register Service Endpoints, Discover and Register Service Endpoints API, API orchestration, API gateway"
---

# Discover and Register Service Endpoints

## Quick reference

Use this remote services endpoint to discover and Register Service Endpoints. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service/{name}/discover`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service/{name}/discover`

Fetches the available endpoints from a registered service. If `create` is set to `true`, the fetched endpoints are registered as methods within the service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service from which the endpoints are to be fetched. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| create | Whether to register the fetched endpoints as methods within the service. Default is `false`. | boolean | Optional. | 

## Response

Returns 200 OK with an array of discovered method objects, each including the operation name, method name, method type, input and output types, request parameters, content types, and deprecation status.

## Examples

<details>
<summary>Fetch service endpoints</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service/petstore/discover?create=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "operationName": "uploadFile",
    "methodName": "/pet/{petId}/uploadImage",
    "methodType": "POST",
    "inputType": "uploadFile_Request",
    "outputType": "ApiResponse",
    "requestParams": [
      {
        "name": "petId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "requestContentType": "multipart/form-data",
    "responseContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "addPet",
    "methodName": "/pet",
    "methodType": "POST",
    "inputType": "Pet",
    "requestParams": [],
    "requestContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "updatePet",
    "methodName": "/pet",
    "methodType": "PUT",
    "inputType": "Pet",
    "requestParams": [],
    "requestContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "findPetsByStatus",
    "methodName": "/pet/findByStatus",
    "methodType": "GET",
    "outputType": "findPetsByStatus_Response",
    "requestParams": [
      {
        "name": "status",
        "type": "query",
        "required": true,
        "schema": {
          "type": "array"
        }
      }
    ],
    "description": "Multiple status values can be provided with comma separated strings",
    "deprecated": false
  },
  {
    "operationName": "findPetsByTags",
    "methodName": "/pet/findByTags",
    "methodType": "GET",
    "outputType": "findPetsByTags_Response",
    "requestParams": [
      {
        "name": "tags",
        "type": "query",
        "required": true,
        "schema": {
          "type": "array"
        }
      }
    ],
    "description": "Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
    "deprecated": true
  },
  {
    "operationName": "updatePetWithForm",
    "methodName": "/pet/{petId}",
    "methodType": "POST",
    "inputType": "updatePetWithForm_Request",
    "requestParams": [
      {
        "name": "petId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "requestContentType": "application/x-www-form-urlencoded",
    "deprecated": false
  },
  {
    "operationName": "deletePet",
    "methodName": "/pet/{petId}",
    "methodType": "DELETE",
    "requestParams": [
      {
        "name": "api_key",
        "type": "header",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "petId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "deprecated": false
  },
  {
    "operationName": "getPetById",
    "methodName": "/pet/{petId}",
    "methodType": "GET",
    "outputType": "Pet",
    "requestParams": [
      {
        "name": "petId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "responseContentType": "application/json",
    "description": "Returns a single pet",
    "deprecated": false
  },
  {
    "operationName": "getInventory",
    "methodName": "/store/inventory",
    "methodType": "GET",
    "outputType": "getInventory_Response",
    "requestParams": [],
    "description": "Returns a map of status codes to quantities",
    "deprecated": false
  },
  {
    "operationName": "placeOrder",
    "methodName": "/store/order",
    "methodType": "POST",
    "inputType": "Order",
    "outputType": "Order",
    "requestParams": [],
    "requestContentType": "application/json",
    "responseContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "deleteOrder",
    "methodName": "/store/order/{orderId}",
    "methodType": "DELETE",
    "requestParams": [
      {
        "name": "orderId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "description": "For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors",
    "deprecated": false
  },
  {
    "operationName": "getOrderById",
    "methodName": "/store/order/{orderId}",
    "methodType": "GET",
    "outputType": "Order",
    "requestParams": [
      {
        "name": "orderId",
        "type": "path",
        "required": true,
        "schema": {
          "type": "integer",
          "format": "int64"
        }
      }
    ],
    "responseContentType": "application/json",
    "description": "For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions",
    "deprecated": false
  },
  {
    "operationName": "createUsersWithListInput",
    "methodName": "/user/createWithList",
    "methodType": "POST",
    "inputType": "createUsersWithListInput_Request",
    "requestParams": [],
    "requestContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "updateUser",
    "methodName": "/user/{username}",
    "methodType": "PUT",
    "inputType": "User",
    "requestParams": [
      {
        "name": "username",
        "type": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "requestContentType": "application/json",
    "description": "This can only be done by the logged in user.",
    "deprecated": false
  },
  {
    "operationName": "deleteUser",
    "methodName": "/user/{username}",
    "methodType": "DELETE",
    "requestParams": [
      {
        "name": "username",
        "type": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "description": "This can only be done by the logged in user.",
    "deprecated": false
  },
  {
    "operationName": "getUserByName",
    "methodName": "/user/{username}",
    "methodType": "GET",
    "outputType": "User",
    "requestParams": [
      {
        "name": "username",
        "type": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "responseContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "loginUser",
    "methodName": "/user/login",
    "methodType": "GET",
    "outputType": "loginUser_Response",
    "requestParams": [
      {
        "name": "username",
        "type": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "password",
        "type": "query",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "deprecated": false
  },
  {
    "operationName": "logoutUser",
    "methodName": "/user/logout",
    "methodType": "GET",
    "requestParams": [],
    "deprecated": false
  },
  {
    "operationName": "createUsersWithArrayInput",
    "methodName": "/user/createWithArray",
    "methodType": "POST",
    "inputType": "createUsersWithArrayInput_Request",
    "requestParams": [],
    "requestContentType": "application/json",
    "deprecated": false
  },
  {
    "operationName": "createUser",
    "methodName": "/user",
    "methodType": "POST",
    "inputType": "User",
    "requestParams": [],
    "requestContentType": "application/json",
    "description": "This can only be done by the logged in user.",
    "deprecated": false
  }
]
```

</details>
