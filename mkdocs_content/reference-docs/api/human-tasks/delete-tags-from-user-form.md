---
title: "Delete Tags from User Form"
description: "Use the Orkes Conductor human tasks API to delete Tags from User Form. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/delete-tags-from-user-form"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Tags from User Form, Delete Tags from User Form API, API orchestration, API gateway"
---

# Delete Tags from User Form

## Quick reference

Use this human tasks endpoint to delete Tags from User Form. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/human/template/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/human/template/{name}/tags`

Deletes tags from a user form.

## Path parameters

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
| name      | The name of the user form from which the tags are to be deleted. | string | Required.          |

## Request body

The request body should be an array of tag objects.

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
| key | The tag key to be removed. | string | Required. | 
| value | The tag value to be removed. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the user form.

## Examples

<details>
<summary>Delete a single tag from a user form</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/human/template/EmployeeOnboarding/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <token>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "backend",
    "value": "PR"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the user form.

</details>

<details>
<summary>Delete multiple tags from a user form</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/human/template/EmployeeOnboarding/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  },
{
    "key": "env",
    "value": "prod"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the user form.

</details>
