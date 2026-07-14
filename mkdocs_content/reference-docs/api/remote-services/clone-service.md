---
title: "Clone Service"
description: "Use the Orkes Conductor remote services API to clone Service. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/remote-services/clone-service"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Clone Service

## Quick reference

Use this remote services endpoint to clone Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/registry/service/{name}/clone`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


!!! info "Available since"
    - v5.4.2 and later

**Endpoint**: `POST /api/registry/service/{name}/clone`

Creates a copy of an existing Remote Service definition under a new name. The clone includes all methods, request parameters, configuration, circuit breaker settings, and authentication metadata from the source service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service to clone. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| newName | The name for the cloned service. | string | Required. | 

## Response

Returns the full service definition of the newly created clone, including all methods, configuration, circuit breaker settings, and authentication metadata.

## Examples

<details>
<summary>Clone a service</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/registry/service/http-services/clone?newName=http-services-2' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

```bash
{
  "name": "http-services-2",
  "type": "HTTP",
  "serviceURI": "https://petstore.swagger.io/v2/swagger.json",
  "methods": [
    {
      "operationName": "pet",
      "methodName": "/v2/pet/{petId}/uploadImage",
      "methodType": "POST",
      "inputType": "uploadFile",
      "outputType": "uploadFile",
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
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet",
      "methodType": "PUT",
      "inputType": "updatePet",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet",
      "methodType": "POST",
      "inputType": "addPet",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet/findByStatus",
      "methodType": "GET",
      "outputType": "findPetsByStatus",
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
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet/findByTags",
      "methodType": "GET",
      "outputType": "findPetsByTags",
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
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet/{petId}",
      "methodType": "GET",
      "outputType": "getPetById",
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
      "deprecated": false
    },
    {
      "operationName": "pet",
      "methodName": "/v2/pet/{petId}",
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
      "operationName": "pet",
      "methodName": "/v2/pet/{petId}",
      "methodType": "POST",
      "inputType": "updatePetWithForm",
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
      "deprecated": false
    },
    {
      "operationName": "store",
      "methodName": "/v2/store/inventory",
      "methodType": "GET",
      "outputType": "getInventory",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "store",
      "methodName": "/v2/store/order",
      "methodType": "POST",
      "inputType": "placeOrder",
      "outputType": "placeOrder",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "store",
      "methodName": "/v2/store/order/{orderId}",
      "methodType": "GET",
      "outputType": "getOrderById",
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
      "deprecated": false
    },
    {
      "operationName": "store",
      "methodName": "/v2/store/order/{orderId}",
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
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/createWithList",
      "methodType": "POST",
      "inputType": "createUsersWithListInput",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/{username}",
      "methodType": "GET",
      "outputType": "getUserByName",
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
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/{username}",
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
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/{username}",
      "methodType": "PUT",
      "inputType": "updateUser",
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
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/login",
      "methodType": "GET",
      "outputType": "loginUser",
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
      "operationName": "user",
      "methodName": "/v2/user/logout",
      "methodType": "GET",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user/createWithArray",
      "methodType": "POST",
      "inputType": "createUsersWithArrayInput",
      "requestParams": [],
      "deprecated": false
    },
    {
      "operationName": "user",
      "methodName": "/v2/user",
      "methodType": "POST",
      "inputType": "createUser",
      "requestParams": [],
      "deprecated": false
    }
  ],
  "requestParams": [],
  "config": {
    "circuitBreakerConfig": {
      "failureRateThreshold": 50,
      "slidingWindowSize": 100,
      "minimumNumberOfCalls": 100,
      "waitDurationInOpenState": 1000,
      "permittedNumberOfCallsInHalfOpenState": 100,
      "slowCallRateThreshold": 50,
      "slowCallDurationThreshold": 100,
      "automaticTransitionFromOpenToHalfOpenEnabled": true,
      "maxWaitDurationInHalfOpenState": 1
    }
  },
  "circuitBreakerEnabled": false,
  "servers": [],
  "useSSL": false,
  "trustCert": false
}
```

</details>
