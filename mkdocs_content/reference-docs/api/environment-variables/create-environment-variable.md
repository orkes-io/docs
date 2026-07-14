---
title: "Create/Update Environment Variable"
description: "Use the Orkes Conductor environment variables API to create/Update Environment Variable."
canonical_route: "reference-docs/api/environment-variables/create-environment-variable"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Create/Update Environment Variable

## Quick reference

Use this environment variables endpoint to create/Update Environment Variable. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/environment/{key}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/environment/{key}`

Creates or updates an environment variable. The requesting user must have either an **Admin** or **Metadata** role. 

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | A unique identifier for the variable. This name will be used to reference the variable in workflow definitions | string | Required. | 

## Request body

Format the request body as plain text or a JSON string. The request body must contain the raw value of the environment variable.

**Example (Plain text):**

```text
keyValue
```

**Example (JSON string):**

```json
{"endpoint": "https://api.example.com", "timeout": 60}
```

## Response

Returns 200, indicating that the environment variable has been created or updated successfully.

## Examples

<details>
<summary>Create a plain-text environment variable</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/environment/keyName' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: text/plain' \
  -d 'keyValue'
```

**Response**

Returns 200, indicating that the environment variable has been created successfully.

</details>

<details>
<summary>Create a JSON-based environment variable</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/environment/url' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: text/plain' \
  -d '{ "baseUrl": "https://orkes-api-tester.orkesconductor.com/api", "timeout": 5000 }'
```

**Response**

Returns 200, indicating that the environment variable has been created successfully.

</details>

<details>
<summary>Update an existing environment variable</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/environment/keyName' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: text/plain' \
  -d 'updatedKeyValue'
```

**Response**

Returns 200, indicating that the environment variable has been updated successfully.

</details>
