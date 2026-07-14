---
title: "Get Circuit Breaker Status"
description: "Use the Orkes Conductor remote services API to get Circuit Breaker Status. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/remote-services/get-circuit-breaker-status"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Circuit Breaker Status

## Quick reference

Use this remote services endpoint to get Circuit Breaker Status. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/registry/service/{name}/circuit-breaker/status`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/registry/service/{name}/circuit-breaker/status`

Retrieves the current circuit breaker status for a service. 

!!! info "Note"
    The circuit breaker is initialized only after at least one request has been made to the service. If no request has been made yet, this endpoint returns `NOT_FOUND`.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service whose circuit breaker status is to be retrieved. | string | Required. | 

## Response

Returns a 200 OK with the circuit breaker status, including the service name, previous and current states, transition timestamp, and a status message.

## Examples

<details>
<summary>Get circuit breaker status</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/registry/service/petstore/circuit-breaker/status' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "service": "petstore",
  "previousState": "NOT_FOUND",
  "currentState": "NOT_FOUND",
  "transitionTimestamp": 0,
  "message": "No active circuit breaker for service: petstore. Execute a request to the service to initialize the circuit breaker."
}
```

</details>
