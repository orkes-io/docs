---
title: "Create Application"
description: "Use the Orkes Conductor applications API to create Application. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Create Application

## Quick reference

Use this applications endpoint to create Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/applications`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/applications`

Creates a new [application](/content/category/access-control-and-security#applications) in your Conductor cluster. 

## Request body

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the application.  | string | Required. |

## Response

Returns the newly created application object with following fields.

| Parameter | Description | 
| --------- | ----------- |
| id | Unique identifier for the application. | 
| name | Name of the application. | 
| createdBy | Email of the user who created the application. | 
| updatedBy | Email of the user who last updated the application. | 
| createTime | Creation timestamp in Unix time (milliseconds). | 
| updateTime | Last update timestamp in Unix time (milliseconds). | 

## Examples

<details>
<summary>Create a new application</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/applications' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "SampleApplication"
}'
```

**Response**

```json
{
  "id": "243a8a88-9f77-48b2-9429-76793a123344",
  "name": "SampleApplication",
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "createTime": 1770797022913,
  "updateTime": 1770797022913
}
```

</details>
