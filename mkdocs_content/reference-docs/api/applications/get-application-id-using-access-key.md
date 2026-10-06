---
title: "Get Application ID using Access Key"
description: "Use the Orkes Conductor applications API to get Application ID using Access Key. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/applications/get-application-id-using-access-key"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Application ID using Access Key, Get Application ID using Access Key API, API orchestration, API gateway, role based access control, workflow security"
---

# Get Application ID using Access Key

## Quick reference

Use this applications endpoint to get Application ID using Access Key. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/applications/key/{accessKeyId}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/applications/key/{accessKeyId}`

Retrieves an application's ID using its access key. Use this endpoint to find the application to which an access key belongs.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| accessKeyId | The access key ID used to look up the application. | string | Required. |

## Response

Returns an application object with the following details:

| Parameter | Description|
| --------- | ---------- |
| id | The application ID. | 
| name | The application name. | 
| createdBy | Email of the user who created the application. | 
| updatedBy | Email of the user who last updated the application. | 
| createTime | Creation timestamp in Unix time (milliseconds). | 
| updateTime | Last update timestamp in Unix time (milliseconds). |

Returns 404 if an invalid access key ID is provided.

## Examples

<details>
<summary>Get an application’s ID using its access key</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/applications/key/deb14bc8-f081-11f0-bba8-b670bc6a0f4a' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "id": "db66991f-206f-4695-8fe9-f5d53976c9a8",
  "name": "AGENTIC-INTERVIEW",
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "createTime": 1768310094272,
  "updateTime": 1768310094272
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
