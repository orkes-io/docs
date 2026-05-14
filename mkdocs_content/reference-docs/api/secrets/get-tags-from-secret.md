---
title: "Get Tags from Secret"
description: "Use the Orkes Conductor secrets API to get Tags from Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/secrets/get-tags-from-secret"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, role based access control, workflow security, access control"
---

# Get Tags from Secret

## Quick reference

Use this secrets endpoint to get Tags from Secret. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/secrets/{key}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/secrets/{key}/tags`

Retrieves the tags associated with a secret.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name from which the tags are to be retrieved. | string | Required. | 

## Response

Returns an array of tag objects, each containing a key-value pair. Returns 404 if an invalid key is provided.

## Examples

<details>
<summary>Get tags from a secret</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets/my_token/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "backend",
    "value": "PR"
  },
  {
    "key": "dev",
    "value": "automation"
  }
]
```

</details>
