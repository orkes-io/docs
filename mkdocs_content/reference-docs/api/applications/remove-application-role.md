---
title: "Remove Role from Application"
description: "Use the Orkes Conductor applications API to remove Role from Application. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/applications/remove-application-role"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Remove Role from Application

## Quick reference

Use this applications endpoint to remove Role from Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/applications/{applicationId}/roles/{role}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/applications/{applicationId}/roles/{role}`

Removes an existing role from an application in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| applicationId | The unique ID of the application from which the role will be deleted. | string | Required. |
| role | The role to remove from the application. Supported values:<ul><li>`WORKER`</li><li>`METADATA_API`</li><li>`APPLICATION_CREATOR`</li></ul>The following roles can only be granted by a cluster Admin:<ul><li>`UNRESTRICTED_WORKER`</li><li>`METADATA_MANAGER`</li><li>`WORKFLOW_MANAGER`</li><li>`APPLICATION_MANAGER`</li><li>`ADMIN`</li></ul>For detailed role descriptions, see [Assign Role to Application](/content/reference-docs/api/applications/assign-role-to-application#path-parameters). | string | Required. |

## Response

- Returns 200 OK, indicating that the role is removed from the application.
- Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Remove a role from an application</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344/roles/WORKER' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the role is removed from the application.

</details>
