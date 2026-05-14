---
title: "Get User by ID"
description: "Use the Orkes Conductor users API to get User by ID. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/users/get-user-by-id"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get User by ID

## Quick reference

Use this users endpoint to get User by ID. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/users/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/users/{id}`

Retrieves details of a specific user from your Conductor cluster. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id      | The email address of the user to retrieve.       | string | Required           |

## Response

- Returns a user object containing the user's ID, name, assigned roles with their permissions, group memberships, and contact information.
- Returns 404 if an invalid user ID is provided.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get a user’s details using its user ID</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/users/john.doe%40acme.com' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
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
```

</details>
