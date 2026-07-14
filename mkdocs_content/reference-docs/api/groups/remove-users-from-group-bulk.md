---
title: "Remove Users from Group in Bulk"
description: "Use the Orkes Conductor groups API to remove Users from Group in Bulk. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/groups/remove-users-from-group-bulk"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Remove Users from Group in Bulk

## Quick reference

Use this groups endpoint to remove Users from Group in Bulk. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/groups/{groupId}/users`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/groups/{groupId}/users`

Remove users from an existing group in bulk. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupId | The name of the group.  | string | Required. |

## Request body

Format the request body as an array of user email IDs. Each user must already be a member of the group.

**Example**

```json
[
  "user1@example.com",
  "user2@example.com",
  "user3@example.com"
]
```

## Response

- Returns 200 OK when the users have been successfully removed from the group.
- Returns 404 if an invalid group name or user ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Remove users from a group in bulk</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters/users' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  "john.doe@acme.com",
"jane.doe@acme.com"
]'
```

**Response**

Returns 200 OK, indicating that the users have been removed from the group.

</details>
