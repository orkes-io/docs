---
title: "Get Prompt"
description: "Use the Orkes Conductor Conductor API to get Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/prompts/get-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Prompt

## Quick reference

Use this Conductor endpoint to get Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/prompts/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/prompts/{name}`

Retrieves a single prompt by name, optionally at a specific version.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to retrieve. | string | Required. | 

## Query parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| version | The version of the prompt to retrieve. | integer | Optional. |

## Response

- Returns 200 OK with the prompt object on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have READ permission on the prompt.
- Returns 404 if no prompt exists with the given name or version.

## Examples

<details>
<summary>Get prompt</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "createTime": 1780303601036,
  "updateTime": 1780303601036,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "population-prompt",
  "template": "What is the population of Russia in 1994?",
  "description": "Updated description",
  "variables": [],
  "integrations": [
    "openAI:gpt-4o"
  ],
  "tags": [],
  "version": 3,
  "temperature": 0.1,
  "topP": 1,
  "responseFormat": "text",
  "stopWords": []
}
```

</details>
