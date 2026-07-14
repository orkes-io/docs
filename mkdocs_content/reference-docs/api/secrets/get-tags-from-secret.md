---
title: "Get Tags from Secret"
description: "Use the Orkes Conductor secrets API to get Tags from Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/secrets/get-tags-from-secret"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Tags from Secret, Get Tags from Secret API, API orchestration, API gateway, role based access control, workflow security"
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

## Related pages

- [Secrets](/content/reference-docs/api/secrets)
- [Create/Update Secret](/content/reference-docs/api/secrets/create-secret)
- [Delete Secret](/content/reference-docs/api/secrets/delete-secret)
- [Get Secret Value by Key](/content/reference-docs/api/secrets/get-secret-value)
- [Check if Secret Exists](/content/reference-docs/api/secrets/check-secret-exists)
- [List All Secrets](/content/reference-docs/api/secrets/list-all-secrets)
