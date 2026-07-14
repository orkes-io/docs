---
title: "Get Access Grants for a Resource"
description: "Use the Orkes Conductor Conductor API to get Access Grants for a Resource. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/authorization/get-access-grants-for-resource"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Access Grants for a Resource, Get Access Grants for a Resource API, API orchestration, API gateway, role based access control, workflow security"
---

# Get Access Grants for a Resource

## Quick reference

Use this Conductor endpoint to get Access Grants for a Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/auth/authorization/{type}/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/auth/authorization/{type}/{id}`

Returns all subjects that have been granted access to a specific resource.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| type | The resource type for which access grants are being retrieved. Supported values:<ul><li>WORKFLOW</li><li>WORKFLOW_DEF</li><li>WORKFLOW_SCHEDULE</li><li>EVENT_HANDLER</li><li>TASK_DEF</li><li>TASK_REF_NAME</li><li>TASK_ID</li><li>APPLICATION</li><li>USER</li><li>SECRET_NAME</li><li>ENV_VARIABLE</li><li>TAG</li><li>DOMAIN</li><li>INTEGRATION_PROVIDER</li><li>INTEGRATION</li><li>PROMPT</li><li>USER_FORM_TEMPLATE</li><li>SCHEMA</li><li>CLUSTER_CONFIG</li><li>WEBHOOK</li><li>API_GATEWAY_SERVICE</li><li>API_GATEWAY_SERVICE_ROUTE</li><li>AUTH_CONFIG</li><li>GROUP</li><li>ROLE</li><li>SERVICE_REGISTRY</li></ul> | string | Required. |
| id | The unique identifier of the resource (e.g., the workflow name). | string | Required. |

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| groupBy | Response grouping. Use `access` (default) to group by access type, or `subject` to group by subject. | string | Optional. |

## Response

Returns the access grants for the specified resource, grouped by access type or subject.

## Examples

<details>
<summary>Get grants grouped by access type</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/auth/authorization/WORKFLOW_DEF/rate_limit_test?groupBy=access' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "READ": [
    {
      "type": "USER",
      "id": "jane.doe@acme.com"
    },
    {
      "type": "USER",
      "id": "john.doe@acme.com"
    }
  ],
  "DELETE": [
    {
      "type": "USER",
      "id": "john.doe@acme.com"
    }
  ],
  "CREATE": [
    {
      "type": "USER",
      "id": "john.doe@acme.com"
    }
  ],
  "EXECUTE": [
    {
      "type": "USER",
      "id": "jane.doe@acme.com"
    },
    {
      "type": "USER",
      "id": "john.doe@acme.com"
    }
  ],
  "UPDATE": [
    {
      "type": "USER",
      "id": "john.doe@acme.com"
    }
  ]
}
```

</details>

<details>
<summary>Get grants grouped by subject</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/auth/authorization/WORKFLOW_DEF/rate_limit_test?groupBy=subject' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "USER:john.doe@acme.com": [
    "EXECUTE",
    "CREATE",
    "READ",
    "UPDATE",
    "DELETE"
  ],
  "USER:jane.doe@acme.com": [
    "EXECUTE",
    "READ"
  ]
}
```

</details>
