---
title: "List All Secrets"
description: "Use the Orkes Conductor secrets API to list All Secrets. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# List All Secrets

## Quick reference

Use this secrets endpoint to list All Secrets. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/secrets`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/secrets`

Retrieves all secret names from your Conductor cluster.

## Response

Returns an array of secret names (strings).

## Examples

<details>
<summary>List all secrets</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/secrets' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

```json
[
  "slack-secret",
  "atlassian-token",
  "payment_api_token",
  "sendgrid_api_key",
  "openai_api_key",
  "github_token"
]
```

</details>
