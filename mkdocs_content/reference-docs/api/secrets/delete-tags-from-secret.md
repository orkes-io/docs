---
title: "Delete Tags from Secret"
description: "Use the Orkes Conductor secrets API to delete Tags from Secret. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Delete Tags from Secret

## Quick reference

Use this secrets endpoint to delete Tags from Secret. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/secrets/{key}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/secrets/{key}/tags`

Deletes tags from a secret.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The secret key from which the tags are to be deleted. | string | Required. | 

## Request body

The request body should be an array of tag objects.

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The tag key to be removed. | string | Required. |
| value | The tag value to be removed. | string | Required. |

## Response

- Returns 200 OK, indicating that tags have been deleted from the secret. 
- Returns 404 if an invalid secret key is provided.

## Examples

<details>
<summary>Delete a single tag from a secret</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/secrets/my_token/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "backend",
    "value": "PR"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the secret.

</details>

<details>
<summary>Delete multiple tags from a secret</summary>

**Request**

```shell
curl -X 'DELETE' \
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
    "key": "purpose",
    "value": "docs"
  }

]'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the secret.

</details>
