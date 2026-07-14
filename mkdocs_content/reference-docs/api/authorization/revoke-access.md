---
title: "Revoke Access"
description: "Use the Orkes Conductor Conductor API to revoke Access. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/authorization/revoke-access"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Revoke Access, Revoke Access API, API orchestration, API gateway, role based access control, workflow security"
---

# Revoke Access

## Quick reference

Use this Conductor endpoint to revoke Access. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/auth/authorization`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/auth/authorization`

Removes access from a user, group, or role over a specific resource. 

## Request body

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| subject.**type** | The type of subject whose access is being revoked. Supported values:<ul><li>**user**: A user in Orkes Conductor.</li><li>**role**: A system/custom role.</li><li>**group**: A group in Orkes Conductor.</li></ul> | string | Required. | 
| subject.**id** | The identifier of the subject.<ul><li>For the type `user`, it must be the email.</li><li>For the type `role`, it must be the role name. For example, `ADMIN`.</li><li>For the type `group`, it must be the group name in Conductor.</li></ul> | string | Required. | 
| target.**type** | The resource type from which access is being revoked.  Supported values: <ul><li>WORKFLOW_DEF</li><li>TASK_DEF</li><li>SECRET_NAME</li><li>APPLICATION</li><li>INTEGRATION_PROVIDER</li><li>PROMPT</li><li>WORKFLOW_SCHEDULE</li><li>EVENT_HANDLER</li><li>WEBHOOK</li><li>ENV_VARIABLE</li><li>SCHEMA</li><li>TAG</li></ul> | string | Required. |
| target.**id** | The unique identifier of the resource (e.g., the workflow name) to revoke access from. | string | Required. | 
| **access** | The set of access types to revoke. Supported values:<ul><li>READ</li><li>CREATE</li><li>UPDATE</li><li>DELETE</li><li>EXECUTE</li></ul> | array of strings | Required. |

## Response

Returns a confirmation message.

## Examples

<details>
<summary>Revoke a user’s READ and EXECUTE access to a workflow definition</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/auth/authorization' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "subject": {
      "type": "user",
      "id": "jane.doe@acme.com"
    },
    "target": {
      "type": "WORKFLOW_DEF",
      "id": "rate_limit_test"
    },
    "access": ["READ", "EXECUTE"]
  }
'
```

**Response**

This revokes the user’s READ and EXECUTE access over the workflow named `rate_limit_test`.

```json
{
  "message": "Removed permission"
}
```

</details>

## Related pages

- [Authorization](/content/reference-docs/api/authorization)
- [Grant Access](/content/reference-docs/api/authorization/grant-access)
- [Get Access Grants for a Resource](/content/reference-docs/api/authorization/get-access-grants-for-resource)
- [List Grants for a Subject](/content/reference-docs/api/authorization/list-grants-for-subject)
- [Revoke Grants for a Subject](/content/reference-docs/api/authorization/revoke-grants-for-subject)
