---
title: "Get All Users in Group"
description: "Use the Orkes Conductor groups API to get All Users in Group. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/groups/get-all-users-in-group"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get All Users in Group

## Quick reference

Use this groups endpoint to get All Users in Group. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/groups/{id}/users`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/groups/{id}/users`

Retrieves all users in a group from your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The name of the group. | string | Required. | 

## Response

- Returns an array of user objects. Each user object contains their ID, name, assigned roles with permissions, group memberships, and additional metadata.
- Returns 404 if an invalid group ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get all users in a group</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters/users' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "john.doe@acme.com",
    "name": "John Doe",
    "roles": [
      {
        "name": "USER",
        "permissions": [
          {
            "name": "CREATE_SECRET"
          },
          {
            "name": "API_GATEWAY_MANAGEMENT"
          },
          {
            "name": "CREATE_APPLICATION"
          },
          {
            "name": "CREATE_INTEGRATION"
          },
          {
            "name": "WORKFLOW_SEARCH"
          },
          {
            "name": "CREATE_TASK_DEF"
          },
          {
            "name": "CREATE_WORKFLOW_DEF"
          },
          {
            "name": "CREATE_USER_FORM_TEMPLATE"
          },
          {
            "name": "API_GATEWAY_VIEW"
          }
        ]
      }
    ],
    "groups": [
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
    ],
    "uuid": "8a5e4b67-324b-48cb-bf3e-8273dafd86fd",
    "contactInformation": {}
  },
  {
    "id": "jane.doe@acme.com",
    "name": "Jane Doe",
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
    "groups": [
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
    ],
    "uuid": "f0c48a60-4310-4b96-8926-e5d1dc3f8a6e",
    "contactInformation": {}
  }
]
```

</details>
