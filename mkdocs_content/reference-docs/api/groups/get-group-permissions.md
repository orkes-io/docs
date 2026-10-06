---
title: "Get Group Permission over Resources"
description: "Use the Orkes Conductor groups API to get Group Permission over Resources. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/groups/get-group-permissions"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Group Permission over Resources, Get Group Permission over Resources API, API orchestration, API gateway"
---

# Get Group Permission over Resources

## Quick reference

Use this groups endpoint to get Group Permission over Resources. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/groups/{groupId}/permissions`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/groups/{groupId}/permissions`

Retrieves the permissions that a group has over resources such as workflows, tasks, secrets, environment variables, tags, domains, integrations, and prompts. The invoking user must be an **Admin** to the Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupId | The name of the group from which permissions are to be retrieved.  | string | Required. |

## Response

- Returns the group's granted access permissions.
- Returns 403 if a non-admin invokes the API.

## Examples

<details>
<summary>Get permissions for a group</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/groups/TechWriters/permissions' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "grantedAccess": [
    {
      "target": {
        "type": "TASK_DEF",
        "id": "BUSINESS_RULE"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "WORKFLOW_SCHEDULE",
        "id": "assignPRScheduleaaa"
      },
      "access": [
        "EXECUTE"
      ],
      "tag": "dev:automation"
    },
    {
      "target": {
        "type": "ENV_VARIABLE",
        "id": "sampleKey"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "DOMAIN",
        "id": "sampleDomain"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "SECRET_NAME",
        "id": "my_token"
      },
      "access": [
        "UPDATE"
      ]
    },
    {
      "target": {
        "type": "APPLICATION",
        "id": "bcd1886f-3e98-4f28-ba49-1174f6482f15kj"
      },
      "access": [
        "EXECUTE"
      ],
      "tag": "dev:automation"
    },
    {
      "target": {
        "type": "INTEGRATION",
        "id": "SendGrid"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "APPLICATION",
        "id": "app:bcd1886f-3e98-4f28-ba49-1174f6482f15kj"
      },
      "access": [
        "EXECUTE"
      ],
      "tag": "dev:automation"
    },
    {
      "target": {
        "type": "WORKFLOW_SCHEDULE",
        "id": "assignPRSchedule"
      },
      "access": [
        "EXECUTE"
      ],
      "tag": "dev:automation"
    },
    {
      "target": {
        "type": "PROMPT",
        "id": "Document-Retrieval"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "ENV_VARIABLE",
        "id": "sampleKeyk"
      },
      "access": [
        "EXECUTE"
      ],
      "tag": "dev:automation"
    },
    {
      "target": {
        "type": "WORKFLOW_DEF",
        "id": "Agentic_Security_Example"
      },
      "access": [
        "EXECUTE"
      ]
    },
    {
      "target": {
        "type": "TAG",
        "id": "dev:automation"
      },
      "access": [
        "EXECUTE"
      ]
    }
  ]
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
