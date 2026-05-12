---
title: "Get All Environment Variables"
description: "Use the Orkes Conductor environment variables API to get All Environment Variables. Includes endpoint details, authentication, parameters, request bodies."
---

# Get All Environment Variables

## Quick reference

Use this environment variables endpoint to get All Environment Variables. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/environment`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/environment`

Retrieves all environment variables from your Conductor cluster. 

## Response

Returns an array of objects containing all environment variables with their names and values.

## Examples

<details>
<summary>Get all environment variables</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/environment' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "name": "uri-for-http-task-testing-env",
    "value": "https://xyz.com/api"
  },
  {
    "name": "url",
    "value": "{ \"baseUrl\": \"https://orkes-api-tester.orkesconductor.com/api\", \"timeout\": 5000 }"
  },
  {
    "name": "sampleKey",
    "value": "sampleValue"
  }
]
```

</details>
