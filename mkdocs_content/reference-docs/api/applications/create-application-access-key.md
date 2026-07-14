---
title: "Create an Access Key for Application"
description: "Use the Orkes Conductor applications API to create an Access Key for Application. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/applications/create-application-access-key"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Create an Access Key for Application, Create an Access Key for Application API, API orchestration, API gateway, role based access control, workflow security"
---

# Create an Access Key for Application

## Quick reference

Use this applications endpoint to create an Access Key for Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/applications/{id}/accessKeys`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/applications/{id}/accessKeys`

Creates an access key for an existing application in your Conductor cluster.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique ID of the application for which the access key will be created. | string | Required. |

## Response

Returns the generated ID and secret for the application.

| Parameter | Description |
| --------- | ----------- |
| id | The access key ID (public identifier). | 
| secret | The access key secret (private credential). The key secret is only shown once and cannot be retrieved again. | 

Returns 404 if an invalid application ID is provided.

## Examples

<details>
<summary>Create an access key for the application</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344/accessKeys' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

```json
{
  "id": "XXXXXXXXXXXXXXXXXXXXXXXXX",
  "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

</details>
