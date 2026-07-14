---
title: "Revoke Grants for a Subject"
description: "Use the Orkes Conductor Conductor API to revoke Grants for a Subject. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/authorization/revoke-grants-for-subject"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Revoke Grants for a Subject, Revoke Grants for a Subject API, API orchestration, API gateway"
---

# Revoke Grants for a Subject

## Quick reference

Use this Conductor endpoint to revoke Grants for a Subject. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/auth/subjects/{subjectType}/{subjectId}/grants`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


!!! info "Available since"
    - v5.4.2 and later

**Endpoint**: `DELETE /api/auth/subjects/{subjectType}/{subjectId}/grants`

Revokes all per-instance grants for a subject. Optionally scoped to a specific resource type. Useful for cleanup when a role-level permission is revoked and the associated per-instance grants need to be cleared as well.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| subjectType | The type of subject whose grants are being revoked. Supported values:<ul><li>**USER**: A user in Orkes Conductor.</li><li>**ROLE**: A system/custom role.</li><li>**GROUP**: A group in Orkes Conductor.</li></ul> | string | Required. | 
| subjectId | The unique identifier of the subject (e.g., user email, role name, or group name). | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| resourceType | Filter the revocation by resource type. If not specified, all per-instance grants across all resource types are revoked for the subject. Supported values:<ul><li>WORKFLOW</li><li>WORKFLOW_DEF</li><li>WORKFLOW_SCHEDULE</li><li>EVENT_HANDLER</li><li>TASK_DEF</li><li>TASK_REF_NAME</li><li>TASK_ID</li><li>APPLICATION</li><li>USER</li><li>SECRET_NAME</li><li>ENV_VARIABLE</li><li>TAG</li><li>DOMAIN</li><li>INTEGRATION_PROVIDER</li><li>INTEGRATION</li><li>PROMPT</li><li>USER_FORM_TEMPLATE</li><li>SCHEMA</li><li>CLUSTER_CONFIG</li><li>WEBHOOK</li><li>API_GATEWAY_SERVICE</li><li>API_GATEWAY_SERVICE_ROUTE</li><li>AUTH_CONFIG</li><li>GROUP</li><li>ROLE</li><li>SERVICE_REGISTRY</li></ul> | string | Optional. |

## Response

Returns a confirmation message.

## Examples

<details>
<summary>Revoke grants for a subject</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/auth/subjects/USER/jane.doe%40acme.com/grants?resourceType=WORKFLOW_DEF' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "message": "Revoked grants"
}
```

</details>

## Related pages

- [Authorization](/content/reference-docs/api/authorization)
- [Grant Access](/content/reference-docs/api/authorization/grant-access)
- [Revoke Access](/content/reference-docs/api/authorization/revoke-access)
- [Get Access Grants for a Resource](/content/reference-docs/api/authorization/get-access-grants-for-resource)
- [List Grants for a Subject](/content/reference-docs/api/authorization/list-grants-for-subject)
