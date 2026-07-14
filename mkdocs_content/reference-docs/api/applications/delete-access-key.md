---
title: "Delete Access Key"
description: "Use the Orkes Conductor applications API to delete Access Key. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/delete-access-key"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Access Key, Delete Access Key API, API orchestration, API gateway, role based access control, workflow security"
---

# Delete Access Key

## Quick reference

Use this applications endpoint to delete Access Key. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/applications/{applicationId}/accessKeys/{keyId}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/applications/{applicationId}/accessKeys/{keyId}`

Deletes an existing access key from an application in your Conductor cluster. 

!!! warning
    Deleting an access key is permanent and cannot be undone. Any applications using this key will lose access immediately.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| applicationId | The unique ID of the application for which the access key will be deleted. | string | Required. |
| keyId | The access key ID to be deleted. | string | Required. |

## Response

Returns a message indicating that the specified application key has been deleted.

Returns 404 if an invalid path parameter is provided.

## Examples

<details>
<summary>Delete an access key from the application</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344/accessKeys/dea0f780-0739-11f1-9b1b-c6f35360b671' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "message": "Deleted Access key 'dea0f780-0739-11f1-9b1b-c6f35360b671'"
}
```

</details>
