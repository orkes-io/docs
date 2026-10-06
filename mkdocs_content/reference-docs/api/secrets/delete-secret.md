---
title: "Delete Secret"
description: "Use the Orkes Conductor secrets API to delete Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/secrets/delete-secret"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Secret, Delete Secret API, API orchestration, API gateway, role based access control, workflow security"
---

# Delete Secret 

## Quick reference

Use this secrets endpoint to delete Secret. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/secrets/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/secrets/{key}`

Deletes a secret from your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name to delete. | string | Required. | 

## Response

Returns 200 OK, indicating that the secret is deleted. Returns 500 if an invalid secret key is provided.

## Examples

<details>
<summary>Delete a secret</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/secrets/someSecret' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the secret is deleted.

</details>

## Related pages

- [Secrets](/content/reference-docs/api/secrets)
- [Create/Update Secret](/content/reference-docs/api/secrets/create-secret)
- [Get Secret Value by Key](/content/reference-docs/api/secrets/get-secret-value)
- [Check if Secret Exists](/content/reference-docs/api/secrets/check-secret-exists)
- [List All Secrets](/content/reference-docs/api/secrets/list-all-secrets)
- [List Accessible Secrets](/content/reference-docs/api/secrets/list-accessible-secrets)
