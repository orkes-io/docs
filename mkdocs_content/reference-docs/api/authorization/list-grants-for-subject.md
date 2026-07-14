---
title: "List Grants for a Subject"
description: "Use the Orkes Conductor Conductor API to list Grants for a Subject. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/authorization/list-grants-for-subject"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, List Grants for a Subject, List Grants for a Subject API, API orchestration, API gateway"
---

# List Grants for a Subject

## Quick reference

Use this Conductor endpoint to list Grants for a Subject. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/auth/subjects/{subjectType}/{subjectId}/grants`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


!!! info "Available since"
    - v5.4.2 and later

**Endpoint**: `GET /api/auth/subjects/{subjectType}/{subjectId}/grants`

Lists all per-instance resource grants for a user, group, or role. Available for admin-only, unless the caller is listing their own grants.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| subjectType | The type of subject being granted access. Supported values:<ul><li>**USER**: A user in Orkes Conductor.</li><li>**ROLE**: A system/custom role.</li><li>**GROUP**: A group in Orkes Conductor.</li></ul> | string | Required. | 
| subjectId | The unique identifier of the subject (e.g., user email, role name, or group name). | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| resourceType | The resource type for which access grants are being retrieved. Supported values:<ul><li>WORKFLOW</li><li>WORKFLOW_DEF</li><li>WORKFLOW_SCHEDULE</li><li>EVENT_HANDLER</li><li>TASK_DEF</li><li>TASK_REF_NAME</li><li>TASK_ID</li><li>APPLICATION</li><li>USER</li><li>SECRET_NAME</li><li>ENV_VARIABLE</li><li>TAG</li><li>DOMAIN</li><li>INTEGRATION_PROVIDER</li><li>INTEGRATION</li><li>PROMPT</li><li>USER_FORM_TEMPLATE</li><li>SCHEMA</li><li>CLUSTER_CONFIG</li><li>WEBHOOK</li><li>API_GATEWAY_SERVICE</li><li>API_GATEWAY_SERVICE_ROUTE</li><li>AUTH_CONFIG</li><li>GROUP</li><li>ROLE</li><li>SERVICE_REGISTRY</li></ul> | string | Optional. |

## Response

Returns a list of per-instance resource grants for the subject.

## Examples

<details>
<summary>List grants for a subject</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/auth/subjects/USER/jane.doe%40acme.com/grants?resourceType=SECRET_NAME' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "target": {
      "type": "SECRET_NAME",
      "id": "API_KEY_NEURO"
    },
    "access": [
      "READ",
      "DELETE",
      "CREATE",
      "EXECUTE",
      "UPDATE"
    ]
  }
]
```

</details>
