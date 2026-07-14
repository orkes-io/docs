---
title: "Add Users to Group in Bulk"
description: "Use the Orkes Conductor groups API to add Users to Group in Bulk. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/groups/add-users-to-group-bulk"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Users to Group in Bulk, Add Users to Group in Bulk API, API orchestration, API gateway"
---

# Add Users to Group in Bulk

## Quick reference

Use this groups endpoint to add Users to Group in Bulk. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/groups/{groupId}/users`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/groups/{groupId}/users`

Add users to an existing group in bulk. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupId | The name of the group.  | string | Required. |

## Request body

Format the request body as an array of user email IDs. Each user must already exist in the Conductor cluster.

**Example**

```json
[
  "user1@example.com",
  "user2@example.com",
  "user3@example.com"
]
```

## Response

- Returns 200 OK when the users have been successfully added to the group.
- Returns 404 if an invalid group name or user ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Add users to a group in bulk</summary>

**Request**

```shell
curl -X 'POST' \
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

Returns 200 OK, indicating that the users have been added to the group.

</details>
