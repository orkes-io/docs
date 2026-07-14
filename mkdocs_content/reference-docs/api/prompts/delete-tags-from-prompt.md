---
title: "Delete Tags from Prompt"
description: "Use the Orkes Conductor Conductor API to delete Tags from Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/delete-tags-from-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Tags from Prompt, Delete Tags from Prompt API, API orchestration, API gateway"
---

# Delete Tags from Prompt

## Quick reference

Use this Conductor endpoint to delete Tags from Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/prompts/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/prompts/{name}/tags`

Deletes tags from a prompt.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to remove tags from. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| key | The tag key to be removed. | string | Required. | 
| value | The tag value to be removed. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the prompt.

## Examples

<details>
<summary>Delete a tag from a prompt</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "engineering"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the prompt.

</details>
