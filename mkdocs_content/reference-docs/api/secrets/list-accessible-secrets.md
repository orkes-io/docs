---
title: "List Accessible Secrets"
description: "Use the Orkes Conductor secrets API to list Accessible Secrets. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/secrets/list-accessible-secrets"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, role based access control, workflow security, access control"
---

# List Accessible Secrets

## Quick reference

Use this secrets endpoint to list Accessible Secrets. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/secrets`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/secrets`

Retrieves all secret names that the user has permission to grant access to.

## Response

Returns an array of secret names (strings) that are accessible to the invoked user.

## Examples

<details>
<summary>List accessible secrets</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  "openai_api_key",
  "github_token"
]
```

</details>
