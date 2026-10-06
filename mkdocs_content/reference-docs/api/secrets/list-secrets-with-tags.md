---
title: "List Secrets with Tags"
description: "Use the Orkes Conductor secrets API to list Secrets with Tags. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/secrets/list-secrets-with-tags"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, List Secrets with Tags, List Secrets with Tags API, API orchestration, API gateway"
---

# List Secrets with Tags

## Quick reference

Use this secrets endpoint to list Secrets with Tags. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/secrets-v2`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/secrets-v2`

Retrieves all secret names that the user has permission to grant access to, along with their tags.

## Response

Returns 200 OK with an array of objects. Each object contains:

- `name`: The secret name (string)
- `tags`: An array of tag objects with key and value properties

## Examples

<details>
<summary>List secrets with tags</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets-v2' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "tags": [
      {
        "key": "env",
        "value": "prod"
      }
    ],
    "name": "atlassian-token"
  },
  {
    "tags": [],
    "name": "payment_api_token"
  },
  {
    "tags": [
      {
        "key": "team",
        "value": "backend"
      }
    ],
    "name": "GITHUB_TOKEN"
  },
  {
    "tags": [],
    "name": "openai_api_key"
  }
]
```

</details>

## Related pages

- [Secrets](/content/reference-docs/api/secrets)
- [Create/Update Secret](/content/reference-docs/api/secrets/create-secret)
- [Delete Secret](/content/reference-docs/api/secrets/delete-secret)
- [Get Secret Value by Key](/content/reference-docs/api/secrets/get-secret-value)
- [Check if Secret Exists](/content/reference-docs/api/secrets/check-secret-exists)
- [List All Secrets](/content/reference-docs/api/secrets/list-all-secrets)
