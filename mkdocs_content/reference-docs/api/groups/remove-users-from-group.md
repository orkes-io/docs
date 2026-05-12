---
title: "Remove Single User from Group"
description: "Use the Orkes Conductor groups API to remove Single User from Group. Includes endpoint details, authentication, parameters, request bodies, response behavior."
---

# Remove Single User from Group

## Quick reference

Use this groups endpoint to remove Single User from Group. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/groups/{groupId}/users/{userId}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/groups/{groupId}/users/{userId}`

Removes an individual user from an existing group in your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupId | The name of the group.  | string | Required. |
| userId | The email ID of the user to remove from the group. The user must already be a member of the group. | string | Required. | 

## Response

- Returns 200 OK, indicating that the user has been removed from the group. 
- Returns 404 if an invalid group name or user ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Remove an individual user from the group</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters/users/john.doe%40acme.com' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the user has been removed from the group.

</details>
