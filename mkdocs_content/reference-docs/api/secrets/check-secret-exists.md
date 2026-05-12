---
title: "Check if Secret Exists"
description: "Use the Orkes Conductor secrets API to check if Secret Exists. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Check if Secret Exists

## Quick reference

Use this secrets endpoint to check if Secret Exists. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/secrets/{key}/exists`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/secrets/{key}/exists`

Checks whether a secret exists in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name. | string | Required. | 

## Response

Returns 200 OK with a boolean value:

- `true` if the secret exists
- `false` if the secret does not exist

## Examples

<details>
<summary>Check if secret exists (secret found)</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets/atlassian-token/exists' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```
true
```

</details>

<details>
<summary>Check if secret exists (secret not found)</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/secrets/someSecret/exists' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```
false
```

</details>
