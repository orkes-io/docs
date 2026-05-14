---
title: "Assign Role to Application"
description: "Use the Orkes Conductor applications API to assign Role to Application. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/applications/assign-role-to-application"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Assign Role to Application

## Quick reference

Use this applications endpoint to assign Role to Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/applications/{applicationId}/roles/{role}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/applications/{applicationId}/roles/{role}`

Assigns roles to an already created application in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| applicationId | The unique ID of the application to which the role will be assigned. | string | Required. |
| role | The role to assign for application. Supported values:<br/><br/>The following roles are available to any user with access to applications:<ul><li>`WORKER`: Can poll and execute tasks for which it has Execute permissions for. This role should be granted to a task worker application that is responsible for polling and executing a task.</li><li>`METADATA_API`: Can create and view workflow definitions, task definitions, and user forms. This role should be granted to an application that is responsible for retrieving and managing workflow and task definitions, such as for testing or CI/CD integration purposes.</li><li>`APPLICATION_CREATOR`: Can create and view applications. This role should be granted to an application that is responsible for managing other applications in the cluster.</li></ul>The following roles can only be granted by a cluster Admin:<ul><li>`UNRESTRICTED_WORKER`: Worker role with full access to poll and execute any task in the cluster.</li><li>`METADATA_MANAGER`: Can manage all workflow and task definitions in the cluster, including performing any action regardless of workflow or task ownership. Can view and manage API Gateway configurations. Can create integrations and secrets.</li><li>`WORKFLOW_MANAGER`: Can view, execute, and manage all workflow executions in the system, including start, pause, resume, rerun, retry, restart, terminate, and delete actions. Has execute and read access to workflow and task definitions.</li><li>`APPLICATION_MANAGER`: Can create, update, and delete any application in the cluster. Can also view and manage API Gateway configurations.</li><li>`ADMIN`: Full control over that particular application, including creating, viewing, modifying, deleting, and executing it.</li></ul> | string | Required. |

## Response

- Returns 200 OK, indicating that the role is assigned to the application.
- Returns 404 if an invalid application ID is provided.
- Returns 403 Forbidden if a non-admin user attempts to assign an unrestricted role.

## Examples

<details>
<summary>Assign a role to an application</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344/roles/METADATA_API' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

Returns 200 OK, indicating that the role is assigned to the application.

</details>
