---
title: "Toggle Access Key Status"
description: "Use the Orkes Conductor applications API to toggle Access Key Status. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/toggle-access-key-status"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Toggle Access Key Status, Toggle Access Key Status API, API orchestration, API gateway, role based access control, workflow security"
---

# Toggle Access Key Status

## Quick reference

Use this applications endpoint to toggle Access Key Status. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/applications/{applicationId}/accessKeys/{keyId}/status`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/applications/{applicationId}/accessKeys/{keyId}/status`

Toggles the status of an access key. The access key can be either `ACTIVE` or `INACTIVE`. This endpoint toggles the current status to the opposite state.

Use this endpoint to temporarily disable an access key without deleting it, or to re-enable a previously disabled key.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| applicationId | The unique ID of the application for which the access key status will be changed. | string | Required. |
| keyId | The access key ID whose status is to be updated. | string | Required. |

## Response

Returns 200 OK when the access key status is successfully toggled. 

| Parameter | Description |
| --------- | ----------- |
| id | The access key ID. | 
| createdAt | Creation timestamp in Unix time (milliseconds). | 
| status | The updated status. Can be `ACTIVE` or `INACTIVE`. | 

Returns 404 if an invalid path parameter is provided.

## Examples

<details>
<summary>Toggle an access key status</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/applications/243a8a88-9f77-48b2-9429-76793a123344/accessKeys/dea0f780-0739-11f1-9b1b-c6f35360b671/status' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

```json
{
  "id": "dea0f780-0739-11f1-9b1b-c6f35360b671",
  "createdAt": 1770808055564,
  "status": "INACTIVE"
}
```

</details>
