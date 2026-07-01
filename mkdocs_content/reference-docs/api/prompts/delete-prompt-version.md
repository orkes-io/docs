---
title: "Delete Prompt Version"
description: "Use the Orkes Conductor Conductor API to delete Prompt Version. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/prompts/delete-prompt-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Prompt Version

## Quick reference

Use this Conductor endpoint to delete Prompt Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/prompts/{name}/versions/{version}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/prompts/{name}/versions/{version}`

Deletes a specific version of a prompt. If it is the last remaining version, all associated tags and access control entries are also removed.

To delete all versions, use [`DELETE /api/prompts/{name}`](/content/reference-docs/api/prompts/delete-prompt).

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to delete. | string | Required. | 
| version | The version of the prompt to delete. | integer | Required. | 

## Response

- Returns 200 OK with no response body on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have DELETE permission on the prompt.

## Examples

<details>
<summary>Delete a specific prompt version</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt/versions/2' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the specific prompt version was deleted successfully.

</details>
