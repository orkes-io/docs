---
title: "Create or Update Prompt Version"
description: "Use the Orkes Conductor Conductor API to create or Update Prompt Version. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/prompts/create-prompt-version"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Create or Update Prompt Version

## Quick reference

Use this Conductor endpoint to create or Update Prompt Version. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/prompts/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/prompts/{name}`

Creates a new prompt template or saves to a specific version of an existing one. Supports explicit version targeting or automatic version incrementing.

!!! info "Note"
    If neither `version` nor `autoIncrement=true` is specified, this endpoint always targets version 1, overwriting it. For general-purpose prompt creation and updates, use [`PUT /api/prompts/{name}`](/content/reference-docs/api/prompts/create-prompt) instead.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to create or update. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| description | A description for the prompt. | string | Required. |
| models | The AI model to associate with this prompt, in the format `integrationName:modelName`. The specified integration must exist and the caller must have access to it. | string | Optional. |
| version | Explicit version number to save. Ignored if `autoIncrement=true`. | integer | Optional. |
| autoIncrement | When `true`, automatically sets the version to the current latest version + 1. If no versions exist yet, defaults to version 1. | boolean | Optional. |

## Request body

The prompt text is to be supplied as a raw string. Enclosing quotation marks are stripped automatically.

## Response

- Returns 200 OK with no response body on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have UPDATE permission on the existing prompt.
- Returns 404 if a specified integration does not exist.

## Behavior

- **Version resolution follows this priority order:**
    - If `autoIncrement=true`, it uses `latestVersion + 1` (or 1 if no versions exist yet).
    - If `version` is provided, it uses that explicit version number.
    - Otherwise, it defaults to version 1 (overwrites existing version 1 without preserving metadata).
- **Create vs. Update**: If no version of the prompt exists under `name`, a new prompt is created and the caller is granted full access. If any version already exists, the caller must have `UPDATE` permission.
- **Model association**: Each value in` models` must reference an existing integration in the format `integrationName:modelName`. The caller must have access to each integration.

## Examples

<details>
<summary>Update a prompt</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt?description=Updated%20description&autoIncrement=true' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d 'What is the population of Russia in 1994?'
```

**Response**

Returns 200 OK, indicating that the prompt has been updated successfully. 

</details>
