---
title: "Delete Tag from Application"
description: "Use the Orkes Conductor applications API to delete Tag from Application. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/applications/delete-tag-application"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Tag from Application, Delete Tag from Application API, API orchestration, API gateway"
---

# Delete Tag from Application

## Quick reference

Use this applications endpoint to delete Tag from Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/applications/{id}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/applications/{id}/tags`

Deletes tags from an application.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application from which the tags are to be deleted. | string | Required. |

## Request body

The request body should be an array of tag objects.

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The tag key to be removed. | string | Required. | 
| value | The tag value to be removed.| string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the application.

## Examples

<details>
<summary>Delete a single tag from an application</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/applications/db66991f-206f-4695-8fe9-f5d53976c9a8/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the application.

</details>

<details>
<summary>Delete multiple tags from an application</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/applications/bcd1886f-3e98-4f28-ba49-1174f6482f15/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  },
{
    "key": "backend",
    "value": "PR"
  }
]
'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the application.

</details>

## Related pages

- [Applications](/content/reference-docs/api/applications)
- [Create Application](/content/reference-docs/api/applications/create-application)
- [Assign Role to Application](/content/reference-docs/api/applications/assign-role-to-application)
- [Create an Access Key for Application](/content/reference-docs/api/applications/create-application-access-key)
- [Update Application](/content/reference-docs/api/applications/update-application)
- [Toggle Access Key Status](/content/reference-docs/api/applications/toggle-access-key-status)
