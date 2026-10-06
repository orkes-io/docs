---
title: "Close Circuit Breaker"
description: "Use the Orkes Conductor remote services API to close Circuit Breaker. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/remote-services/close-circuit-breaker"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Close Circuit Breaker, Close Circuit Breaker API, API orchestration, API gateway"
---

# Close Circuit Breaker 

## Quick reference

Use this remote services endpoint to close Circuit Breaker. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/registry/service/{name}/circuit-breaker/close`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/registry/service/{name}/circuit-breaker/close`

Manually forces the circuit breaker to the closed state, resuming normal traffic to the service. 

!!! info "Note"
    The circuit breaker is initialized only after at least one request has been made to the service. If the service does not exist or the circuit breaker has not been initialized yet, this endpoint returns 404.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the service whose circuit breaker is to be closed. | string | Required. | 

## Response

Returns a 200 OK with the circuit breaker status, including the service name, previous and current states, transition timestamp, and a status message.

## Examples

<details>
<summary>Close circuit breaker</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/registry/service/petstore/circuit-breaker/close' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "service": "petstore",
  "previousState": "OPEN",
  "currentState": "CLOSED",
  "transitionTimestamp": 0,
  "message": "Circuit breaker transitioned from OPEN to CLOSED"
}
```

</details>

## Related pages

- [Remote Services API Reference](/content/reference-docs/api/remote-services)
- [Create Service](/content/reference-docs/api/remote-services/create-service)
- [Clone Service](/content/reference-docs/api/remote-services/clone-service)
- [Get Service](/content/reference-docs/api/remote-services/get-service)
- [Delete Service](/content/reference-docs/api/remote-services/delete-service)
- [Get All Services](/content/reference-docs/api/remote-services/get-all-services)
