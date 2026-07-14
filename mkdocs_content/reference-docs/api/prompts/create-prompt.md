---
title: "Create or Update Prompt"
description: "Use the Orkes Conductor Conductor API to create or Update Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/create-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Create or Update Prompt, Create or Update Prompt API, API orchestration, API gateway"
---

# Create or Update Prompt

## Quick reference

Use this Conductor endpoint to create or Update Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/prompts/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/prompts/{name}`

Creates a new prompt or updates the latest version of an existing one. If the prompt does not exist yet, it is created and the caller is granted full access. If it already exists, the caller must have `UPDATE` permission.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to create or update. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| version | Version number to create or update. If omitted, it defaults to 1 for new prompts or the latest version for existing ones. | integer | Optional. | 
| description | A description for the prompt. | string | Required. | 
| models | The AI model to associate with this prompt, in the format `integrationName:modelName`. Repeat this parameter to associate multiple models. The specified integration must exist and the caller must have access to it. | string | Optional. | 

## Request body

The prompt text is to be supplied as a raw string. Enclosing quotation marks are stripped automatically.

## Response

- Returns 200 OK with no response body on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have UPDATE permission on the existing prompt.
- Returns 404 if a specified integration does not exist.

## Behavior

- **Create**: If no prompt with the given `name` exists, a new one is created and full access is granted to the calling user.
- **Update**: If the prompt exists, the template text and description are updated while preserving the original `createdBy` and `createTime` metadata.
- **Version targeting**: If `version` is supplied, that specific version is targeted. Otherwise the latest version is used.
- **Model association**: Each value in `models` must reference an existing integration in the format `integrationName:modelName`. The caller must have access to each integration.

!!! tip
    This is the recommended endpoint for day-to-day prompt management. Use [`POST /api/prompts/{name}`](/content/reference-docs/api/prompts/create-prompt-version) when you need explicit control over version numbering or auto-incrementing.

## Examples

<details>
<summary>Create a prompt</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt?description=A%20population%20prompt' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d 'What is the population of China in 1994?'
```

**Response**

Returns 200 OK, indicating that the prompt has been created successfully. 

</details>
