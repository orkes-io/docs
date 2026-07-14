---
title: "Add Tags to User Form"
description: "Use the Orkes Conductor human tasks API to add Tags to User Form. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/add-tags-to-user-form"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tags to User Form, Add Tags to User Form API, API orchestration, API gateway"
---

# Add Tags to User Form

## Quick reference

Use this human tasks endpoint to add Tags to User Form. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/human/template/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/human/template/{name}/tags`

Adds tags to a user form. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
| name      | The name of the user form to which the tags are to be added. | string | Required.          |

## Request body

The request body should be an array of tag objects.

| Parameter | Description                              | Type   | Required/ Optional |
| --------- | ---------------------------------------- | ------ | ------------------ |
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

Returns 200 OK, indicating that tags have been added to the user form.

## Examples

<details>
<summary>Add a single tag to a user form</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/human/template/EmployeeOnboarding/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "prod",
    "value": "env"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the user form.

</details>

<details>
<summary>Add multiple tags to a user form</summary>

**Request**

```shell
curl -X 'PUT' \
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
    "key": "backend",
    "value": "PR"
  }
]
'
```

**Response**

Returns 200 OK, indicating that tags have been added to the user form.

</details>
