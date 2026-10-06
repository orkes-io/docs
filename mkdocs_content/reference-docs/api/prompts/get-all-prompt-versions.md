---
title: "Get All Versions of Prompts"
description: "Use the Orkes Conductor Conductor API to get All Versions of Prompts. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/get-all-prompt-versions"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get All Versions of Prompts, Get All Versions of Prompts API, API orchestration, API gateway"
---

# Get All Versions of Prompts

## Quick reference

Use this Conductor endpoint to get All Versions of Prompts. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/prompts/{name/versions}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/prompts/{name/versions}`

Retrieves all versions of a prompt.

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to retrieve. | string | Required. | 

## Response

- Returns 200 OK with the prompt version objects on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have READ permission on the prompt.
- Returns 404 if no versions are found for the given prompt name.

## Examples

<details>
<summary>Get all versions of prompt</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt/versions' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1780313786302,
    "updateTime": 1780313786302,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "population-prompt",
    "template": "What is the current population of `${country}`? What was the population in `${year}`?",
    "description": "Population prompt",
    "variables": [
      "country",
      "year"
    ],
    "integrations": [
      "openAI:gpt-4o",
      "openAI:chatgpt-4o-latest"
    ],
    "tags": [
      {
        "key": "team",
        "value": "docs"
      }
    ],
    "version": 2
  },
  {
    "createTime": 1769502880756,
    "updateTime": 1780313747596,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "population-prompt",
    "template": "What is the current population of `${country}`? What was the population in `${year}`?",
    "description": "Population prompt",
    "variables": [
      "country",
      "year"
    ],
    "integrations": [
      "openAI:gpt-4o",
      "openAI:chatgpt-4o-latest"
    ],
    "tags": [
      {
        "key": "team",
        "value": "docs"
      }
    ],
    "version": 1
  }
]
```

</details>

## Related pages

- [Prompts](/content/reference-docs/api/prompts)
- [Create or Update Prompt](/content/reference-docs/api/prompts/create-prompt)
- [Create or Update Prompt Version](/content/reference-docs/api/prompts/create-prompt-version)
- [Create Prompts in Bulk](/content/reference-docs/api/prompts/create-prompts-bulk)
- [Delete Prompt](/content/reference-docs/api/prompts/delete-prompt)
- [Delete Prompt Version](/content/reference-docs/api/prompts/delete-prompt-version)
