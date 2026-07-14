---
title: "Update Application"
description: "Use the Orkes Conductor applications API to update Application. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/update-application"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Update Application, Update Application API, API orchestration, API gateway"
---

# Update Application

## Quick reference

Use this applications endpoint to update Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/applications/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/applications/{id}`

Updates an existing application in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application to update. | string | Required. |

## Request body

Format the request body with the updated application name. 

| Parameter | Description |
| --------- | ----------- |
| name | The updated name of the application. | string | Required. | 

## Response

Returns the updated application object.

| Parameter | Description |
| --------- | ----------- |
| id | Unique identifier for the application. | 
| name | Name of the application. | 
| createdBy | Email of the user who created the application. | 
| updatedBy | Email of the user who last updated the application. | 
| createTime | Creation timestamp in Unix time (milliseconds). | 
| updateTime | Last update timestamp in Unix time (milliseconds). | 

Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Update an existing application</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "updatedSampleApplication"
}'
```

**Response**

```json
{
  "id": "243a8a88-9f77-48b2-9429-76793a123344",
  "name": "updatedSampleApplication",
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "createTime": 1770797022913,
  "updateTime": 1770808746159
}
```

</details>
