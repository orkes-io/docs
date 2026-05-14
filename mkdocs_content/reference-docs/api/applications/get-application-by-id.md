---
title: "Get Application by ID"
description: "Use the Orkes Conductor applications API to get Application by ID. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/get-application-by-id"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Application by ID

## Quick reference

Use this applications endpoint to get Application by ID. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/applications/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/applications/{id}`

Retrieves an application's details using its application ID from your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application. | string | Required. |

## Response

Returns an array containing the following access key details:

| Parameter | Description|
| --------- | ---------- |
| id | The application ID. | 
| name | The application name. | 
| createdBy | Email of the user who created the application. | 
| updatedBy | Email of the user who last updated the application. | 
| createTime | Creation timestamp in Unix time (milliseconds). | 
| updateTime | Last update timestamp in Unix time (milliseconds). |

Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Get an application using its ID</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/applications/db66991f-206f-4695-8fe9-f5d53976c9a8' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "id": "db66991f-206f-4695-8fe9-f5d53976c9a8",
  "name": "AGENTIC-INTERVIEW",
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "createTime": 1768310094272,
  "updateTime": 1768310094272
}
```

</details>
