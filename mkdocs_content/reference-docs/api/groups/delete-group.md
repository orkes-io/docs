---
title: "Delete Group"
description: "Use the Orkes Conductor groups API to delete Group. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/groups/delete-group"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Group, Delete Group API, API orchestration, API gateway"
---

# Delete Group

## Quick reference

Use this groups endpoint to delete Group. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/groups/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/groups/{id}`

Deletes a group permanently from the Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The name of the group to delete. | string | Required. |

## Response

- Returns 200 OK, with a message that the group has been deleted.
- Returns 404 if an invalid group ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Delete a group</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/groups/Writers' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "message": "Deleted group 'Writers'"
}
```

</details>

## Related pages

- [Groups](/content/reference-docs/api/groups)
- [Create/Update Groups](/content/reference-docs/api/groups/create-group)
- [Add Users to Group in Bulk](/content/reference-docs/api/groups/add-users-to-group-bulk)
- [Add Single User to Group](/content/reference-docs/api/groups/add-user-to-group)
- [Remove Users from Group in Bulk](/content/reference-docs/api/groups/remove-users-from-group-bulk)
- [Remove Single User from Group](/content/reference-docs/api/groups/remove-users-from-group)
