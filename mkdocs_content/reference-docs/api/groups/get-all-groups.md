---
title: "Get All Groups"
description: "Use the Orkes Conductor groups API to get All Groups. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# Get All Groups

## Quick reference

Use this groups endpoint to get All Groups. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/groups`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/groups`

Retrieves all groups from your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Response

Returns an array of group objects, where each object contains the group's ID, description, assigned roles with their permissions, default access configuration, and contact information.

Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get all groups</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/groups' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "Engineers",
    "description": "Engineering",
    "roles": [
      {
        "name": "ADMIN",
        "permissions": [
          {
            "name": "AUTHORIZATION_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_SEARCH"
          },
          {
            "name": "PUBLISHER_MANAGEMENT"
          },
          {
            "name": "API_GATEWAY_VIEW"
          },
          {
            "name": "API_GATEWAY_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_MANAGEMENT"
          },
          {
            "name": "PROMPT_MANAGEMENT"
          },
          {
            "name": "EVENT_HANDLER_MANAGEMENT"
          },
          {
            "name": "USER_MANAGEMENT"
          },
          {
            "name": "PERMISSION_MANAGEMENT"
          },
          {
            "name": "METADATA_VIEW"
          },
          {
            "name": "ADMIN_MANAGEMENT"
          },
          {
            "name": "METADATA_MANAGEMENT"
          },
          {
            "name": "APPLICATION_MANAGEMENT"
          },
          {
            "name": "BULK_MANAGEMENT"
          },
          {
            "name": "SCHEDULE_MANAGEMENT"
          }
        ]
      }
    ],
    "defaultAccess": {},
    "contactInformation": {}
  },
  {
    "id": "TechWriters",
    "description": "A dedicated group for testing for tech writers",
    "roles": [
      {
        "name": "METADATA_MANAGER",
        "permissions": [
          {
            "name": "API_GATEWAY_VIEW"
          },
          {
            "name": "API_GATEWAY_MANAGEMENT"
          },
          {
            "name": "CREATE_INTEGRATION"
          },
          {
            "name": "CREATE_SECRET"
          },
          {
            "name": "METADATA_VIEW"
          },
          {
            "name": "METADATA_MANAGEMENT"
          }
        ]
      }
    ],
    "defaultAccess": {},
    "contactInformation": {}
  }
]
```

</details>
