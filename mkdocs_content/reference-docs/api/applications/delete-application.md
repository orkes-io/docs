---
title: "Delete Application"
description: "Use the Orkes Conductor applications API to delete Application. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/delete-application"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Application, Delete Application API, API orchestration, API gateway"
---

# Delete Application

## Quick reference

Use this applications endpoint to delete Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/applications/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/applications/{id}`

Deletes an application from your Conductor cluster. 

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application to delete. | string | Required. |

## Response

- Returns a message indicating that the application has been deleted. 
- Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Delete an application</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "message": "Deleted Application '243a8a88-9f77-48b2-9429-76793a123344'"
}
```

</details>

## Related pages

- [Applications](/content/reference-docs/api/applications)
- [Create Application](/content/reference-docs/api/applications/create-application)
- [Assign Role to Application](/content/reference-docs/api/applications/assign-role-to-application)
- [Create an Access Key for Application](/content/reference-docs/api/applications/create-application-access-key)
- [Update Application](/content/reference-docs/api/applications/update-application)
- [Toggle Access Key Status](/content/reference-docs/api/applications/toggle-access-key-status)
