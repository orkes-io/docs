---
title: "Get User Permission over Resources"
description: "Use the Orkes Conductor users API to get User Permission over Resources. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/users/get-user-permissions"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get User Permission over Resources

## Quick reference

Use this users endpoint to get User Permission over Resources. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/users/{userId}/permissions`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/users/{userId}/permissions`

Retrieves the permissions that a user has over any resources. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| userId      | The email address of the user whose permissions are to be retrieved.     | string | Required           |

## Response

- Returns an object containing the user's granted access permissions over resources.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get a user’s permission over resources</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/users/john.doe%40acme.com/permissions' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "grantedAccess": [
    {
      "target": {
        "type": "INTEGRATION_PROVIDER",
        "id": "azure_fk"
      },
      "access": [
        "DELETE",
        "UPDATE",
        "READ"
      ]
    },
    {
      "target": {
        "type": "WORKFLOW_DEF",
        "id": "azure"
      },
      "access": [
        "DELETE",
        "UPDATE",
        "READ",
        "CREATE",
        "EXECUTE"
      ]
    }
  ]
}
```

</details>
