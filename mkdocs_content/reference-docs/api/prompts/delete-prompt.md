---
title: "Delete Prompt"
description: "Use the Orkes Conductor Conductor API to delete Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/prompts/delete-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Prompt

## Quick reference

Use this Conductor endpoint to delete Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/prompts/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/prompts/{name}`

Deletes a prompt and all its versions, including all associated tags and access control entries.

To delete a single version rather than the entire prompt, use [`DELETE /api/prompts/{name}/versions/{version}`](/content/reference-docs/api/prompts/delete-prompt-version).

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to delete. | string | Required. | 

## Response

- Returns 200 OK with no response body on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have DELETE permission on the prompt.

## Examples

<details>
<summary>Delete prompt</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the prompt was deleted successfully.

</details>
