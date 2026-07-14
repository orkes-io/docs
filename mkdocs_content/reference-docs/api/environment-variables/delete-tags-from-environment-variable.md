---
title: "Delete Tags from an Environment Variable"
description: "Use the Orkes Conductor environment variables API to delete Tags from an Environment Variable. Includes endpoint details, authentication, parameters, request."
canonical_route: "reference-docs/api/environment-variables/delete-tags-from-environment-variable"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Tags from an Environment Variable, Delete Tags from an Environment Variable API, API orchestration, API gateway"
---

# Delete Tags from an Environment Variable

## Quick reference

Use this environment variables endpoint to delete Tags from an Environment Variable. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/environment/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/environment/{name}/tags`

Deletes tags from an environment variable.

## Path parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The name of the environment variable from which the tags are to be deleted. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the environment variable.

## Examples 

<details>
<summary>Delete a single tag from an environment variable</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey/tags' \
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

Returns 200 OK, indicating that the tag has been deleted from the environment variable.

</details>

<details>
<summary>Delete multiple tags from an environment variable</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/environment/sampleKey/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "backend",
    "value": "PR"
  },
{
    "key": "env",
    "value": "prod"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the environment variable.

</details>
