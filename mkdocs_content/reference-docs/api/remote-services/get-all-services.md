---
title: "Get All Services"
description: "Use the Orkes Conductor remote services API to get All Services. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/remote-services/get-all-services"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get All Services

## Quick reference

Use this remote services endpoint to get All Services. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service`

Retrieves all services from your Conductor cluster. 

## Response

Returns an array of service objects, each including its type, base URI, registered methods, circuit breaker settings, server URLs, and authentication metadata.

## Examples

<details>
<summary>Get all services</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "name": "petstore",
    "type": "HTTP",
    "serviceURI": "https://petstore.swagger.io/v2/swagger.json",
    "methods": [],
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
    "servers": [
      {
        "url": "https://petstore.swagger.io/v2/swagger.json",
        "type": "OPENAPI_SPEC"
      }
    ]
  },
  {
    "name": "grpcbin",
    "type": "gRPC",
    "serviceURI": "grpcb.in:9000",
    "methods": [],
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
    "servers": []
  }
]
```

</details>
