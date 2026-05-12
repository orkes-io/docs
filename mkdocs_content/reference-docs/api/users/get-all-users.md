---
title: "Get All Users"
description: "Use the Orkes Conductor users API to get All Users. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
---

# Get All Users

## Quick reference

Use this users endpoint to get All Users. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/users`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/users`

Retrieves all users from your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| apps      | Whether to include application users in the results. Default is `false`. | string | Required           |

## Response

Returns an array of user objects. Each object contains the user's ID, name, assigned roles with their permissions, group memberships, and contact information.

Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get all users (excluding application users)</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/users?apps=false' \
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
        "name": "ADMIN",
        "permissions": [
          {
            "name": "METADATA_MANAGEMENT"
          },
          {
            "name": "ADMIN_MANAGEMENT"
          },
          {
            "name": "METADATA_VIEW"
          },
          {
            "name": "PERMISSION_MANAGEMENT"
          },
          {
            "name": "USER_MANAGEMENT"
          },
          {
            "name": "EVENT_HANDLER_MANAGEMENT"
          },
          {
            "name": "PROMPT_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_MANAGEMENT"
          },
          {
            "name": "API_GATEWAY_MANAGEMENT"
          },
          {
            "name": "API_GATEWAY_VIEW"
          },
          {
            "name": "PUBLISHER_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_SEARCH"
          },
          {
            "name": "AUTHORIZATION_MANAGEMENT"
          },
          {
            "name": "SCHEDULE_MANAGEMENT"
          },
          {
            "name": "BULK_MANAGEMENT"
          },
          {
            "name": "APPLICATION_MANAGEMENT"
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
              },
              {
                "name": "METADATA_MANAGEMENT"
              },
              {
                "name": "METADATA_VIEW"
              }
            ]
          }
        ],
        "defaultAccess": {},
        "contactInformation": {}
      }
    ],
    "uuid": "f0c48a60-4310-4b96-8926-e5d1dc3f8a6e",
    "contactInformation": {},
    "applicationUser": false,
    "orkesWorkersApp": false,
    "orkesApiGateway": false,
    "orkesApp": false
  }
  ]
```

</details>

<details>
<summary>Get all users (including application users)</summary>

When `apps=true`, the response includes both human users and application users. Application users can be identified by `"applicationUser": true` in the response object, and their `id` field is prefixed with `app:`.

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/users?apps=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "app:db66991f-206f-4695-8fe9-f5d53976c9a8",
    "name": "AGENTIC-INTERVIEW",
    "roles": [
      {
        "name": "METADATA_MANAGER",
        "permissions": [
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
          },
          {
            "name": "API_GATEWAY_VIEW"
          }
        ]
      },
      {
        "name": "ADMIN",
        "permissions": [
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
          },
          {
            "name": "AUTHORIZATION_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_SEARCH"
          },
          {
            "name": "PUBLISHER_MANAGEMENT"
          }
        ]
      },
      {
        "name": "WORKER",
        "permissions": []
      },
      {
        "name": "METADATA_API",
        "permissions": [
          {
            "name": "CREATE_TASK_DEF"
          },
          {
            "name": "CREATE_WORKFLOW_DEF"
          },
          {
            "name": "CREATE_USER_FORM_TEMPLATE"
          }
        ]
      }
    ],
    "groups": [],
    "contactInformation": {},
    "orkesWorkersApp": false,
    "orkesApiGateway": false,
    "applicationUser": true,
    "orkesApp": false
  },
  {
    "id": "john.doe@acme.com",
    "name": "John Doe",
    "roles": [
      {
        "name": "ADMIN",
        "permissions": [
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
          },
          {
            "name": "AUTHORIZATION_MANAGEMENT"
          },
          {
            "name": "WORKFLOW_SEARCH"
          },
          {
            "name": "PUBLISHER_MANAGEMENT"
          }
        ]
      }
    ],
    "groups": [],
    "uuid": "528f53fa-3f64-4a2d-9b5c-f68facad5c8e",
    "contactInformation": {},
    "orkesWorkersApp": false,
    "orkesApiGateway": false,
    "applicationUser": false,
    "orkesApp": false
  }
]
```

</details>
