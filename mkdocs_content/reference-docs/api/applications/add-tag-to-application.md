---
title: "Add Tag to Application"
description: "Use the Orkes Conductor applications API to add Tag to Application. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/applications/add-tag-to-application"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tag to Application, Add Tag to Application API, API orchestration, API gateway"
---

# Add Tag to Application

## Quick reference

Use this applications endpoint to add Tag to Application. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/applications/{id}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/applications/{id}/tags`

Adds tags to an application. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| id | The unique identifier of the application to which the tags are to be added. | string | Required. |

## Request body

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

**Example for adding multiple tags in a single request:**

```json
[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
```

## Response

Returns 200 OK, indicating that tags have been added to the application.

## Examples

<details>
<summary>Add a single tag to an application</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/applications/bcd1886f-3e98-4f28-ba49-1174f6482f15/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "someKey",
    "value": "someValue"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the application.

</details>

<details>
<summary>Add multiple tags to an application</summary>

**Request**

```shell
curl -X 'PUT' \
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
]'
```

**Response**

Returns 200 OK, indicating that tags have been added to the application. 

</details>
