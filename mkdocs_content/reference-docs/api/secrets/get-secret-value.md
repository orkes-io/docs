---
title: "Get Secret Value by Key"
description: "Use the Orkes Conductor secrets API to get Secret Value by Key. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Get Secret Value by Key

## Quick reference

Use this secrets endpoint to get Secret Value by Key. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/secrets/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/secrets/{key}`

Retrieves a secret value using its key. 

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name whose value is to be retrieved. | string | Required. | 

## Response

- Returns 200 OK with the secret value as plain text.
- Returns 404 if an invalid secret key is provided.

## Examples

<details>
<summary>Get a secret value by key</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets/someSecret' \
  -H 'accept: text/plain' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```
someValue
```

</details>
