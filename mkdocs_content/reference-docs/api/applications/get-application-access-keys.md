---
title: "Get Application Access Keys"
description: "Use the Orkes Conductor applications API to get Application Access Keys. Includes endpoint details, authentication, parameters, request bodies, response."
---

# Get Application Access Keys

## Quick reference

Use this applications endpoint to get Application Access Keys. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/applications/{id}/accessKeys`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/applications/{id}/accessKeys`

Retrieves all access keys for an application from your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application whose access keys will be retrieved. | string | Required. |

## Response

Returns an array containing the following access key details:

| Parameter | Description|
| --------- | ---------- |
| id | The access key ID. | 
| createdAt | Creation timestamp in Unix time (milliseconds). | 
| status | The status of the access key. Can be `ACTIVE` or `INACTIVE`. | 

Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Get an application’s access keys</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/applications/db66991f-206f-4695-8fe9-f5d53976c9a8/accessKeys' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "deb14bc8-f081-11f0-bba8-b670bc6a0f4a",
    "createdAt": 1768310102690,
    "status": "ACTIVE"
  },
  {
    "id": "614ed5d3-035c-11f1-913a-226156badb04",
    "createdAt": 1770383073037,
    "status": "ACTIVE"
  }
]
```

</details>
