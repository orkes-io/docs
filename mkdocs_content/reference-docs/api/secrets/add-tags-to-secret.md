---
title: "Add Tags to Secret"
description: "Use the Orkes Conductor secrets API to add Tags to Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/secrets/add-tags-to-secret"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tags to Secret, Add Tags to Secret API, API orchestration, API gateway, role based access control, workflow security"
---

# Add Tags to Secret

## Quick reference

Use this secrets endpoint to add Tags to Secret. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/secrets/{key}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/secrets/{key}/tags`

Adds tags to a secret. You can add a single tag or multiple tags in one request. If a tag with the same key already exists, this operation will update its value.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key name to which the tags are to be added. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

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

Returns 404 if an invalid secret key is provided.

## Response

Returns 200 OK, indicating that tags have been added to the secret.

## Examples

<details>
<summary>Add a single tag to a secret</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/secrets/my_secret/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "env",
    "value": "prod"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been added to the secret.

</details>

<details>
<summary>Add multiple tags to a secret</summary>

**Request**

```shell
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/secrets/my_token/tags' \
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

Returns 200 OK, indicating that tags have been added to the secret. 

</details>
