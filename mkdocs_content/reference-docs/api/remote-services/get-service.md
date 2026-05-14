---
title: "Get Service"
description: "Use the Orkes Conductor remote services API to get Service. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/remote-services/get-service"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Service

## Quick reference

Use this remote services endpoint to get Service. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service/{name}`

Retrieves the details of a specific service.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service to retrieve. | string | Required. | 

## Response

Returns a 200 OK response with service details, including its type, base URI, circuit breaker settings, server URLs, and authentication metadata.

## Examples

<details>
<summary>Get a service</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service/payment-service' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "name": "payment-service",
  "type": "HTTP",
  "serviceURI": "https://payments.internal/api",
  "methods": [],
  "requestParams": [],
  "config": {
    "circuitBreakerConfig": {
      "failureRateThreshold": 60,
      "slidingWindowSize": 100,
      "minimumNumberOfCalls": 100,
      "waitDurationInOpenState": 5000,
      "permittedNumberOfCallsInHalfOpenState": 100,
      "slowCallRateThreshold": 50,
      "slowCallDurationThreshold": 100,
      "automaticTransitionFromOpenToHalfOpenEnabled": true,
      "maxWaitDurationInHalfOpenState": 1
    }
  },
  "circuitBreakerEnabled": true,
  "servers": [],
  "authMetadata": {
    "key": "Authorization",
    "value": "Bearer eyJhbGci..."
  }
}
```

</details>
