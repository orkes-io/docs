---
title: "Create/Update Secret"
description: "Use the Orkes Conductor secrets API to create/Update Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Create/Update Secret

## Quick reference

Use this secrets endpoint to create/Update Secret. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/secrets/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/secrets/{key}`

Creates or updates a secret in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name. | string | Required. | 

## Request body

Format the request body with the secret value as a JSON string. For example:

```
"secretValue"
```

## Response

Returns 200 OK, indicating that the secret value is created or updated.

## Examples

<details>
<summary>Create a secret</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/secrets/someSecret' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '"mySecretValue"'
```

**Response**

Returns 200 OK, indicating that the secret is created.

</details>

<details>
<summary>Update a secret</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/secrets/someSecret' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '"updatedValue"'
```

**Response**

Returns 200 OK, indicating that the secret value is updated.

</details>
