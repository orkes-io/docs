---
title: "Add Single User to Group"
description: "Use the Orkes Conductor groups API to add Single User to Group. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/groups/add-user-to-group"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Add Single User to Group

## Quick reference

Use this groups endpoint to add Single User to Group. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/groups/{groupId}/users/{userId}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/groups/{groupId}/users/{userId}`

Adds an individual user to an existing group in your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupId | The name of the group.  | string | Required. |
| userId | The email ID of the user to add to the group. The user must already exist in the Conductor cluster. | string | Required. |

## Response

- Returns 200 OK, indicating that the user has been added to the group. 
- Returns 404 if an invalid group name or user ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Add an individual user to the group</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters/users/john.doe%40acme.com' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

Returns 200 OK, indicating that the user has been added to the group.

</details>
