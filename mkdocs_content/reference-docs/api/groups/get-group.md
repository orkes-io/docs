---
title: "Get Group by ID"
description: "Use the Orkes Conductor groups API to get Group by ID. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# Get Group by ID

## Quick reference

Use this groups endpoint to get Group by ID. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/groups/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/groups/{id}`

Retrieves details of a specific group from your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The name of the group. | string | Required. | 

## Response

- Returns the group object containing its ID, description, assigned roles with permissions, default access configuration, and contact information.
- Returns 404 if an invalid group ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get a group’s details using its group ID</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "id": "TechWriters",
  "description": "A dedicated group for testing for tech writers",
  "roles": [
    {
      "name": "METADATA_MANAGER",
      "permissions": [
        {
          "name": "METADATA_MANAGEMENT"
        },
        {
          "name": "METADATA_VIEW"
        },
        {
          "name": "CREATE_SECRET"
        },
        {
          "name": "CREATE_INTEGRATION"
        },
        {
          "name": "API_GATEWAY_MANAGEMENT"
        },
        {
          "name": "API_GATEWAY_VIEW"
        }
      ]
    }
  ],
  "defaultAccess": {},
  "contactInformation": {}
}
```

</details>
