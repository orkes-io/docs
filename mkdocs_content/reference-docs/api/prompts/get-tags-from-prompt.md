---
title: "Get Tags from Prompt"
description: "Use the Orkes Conductor Conductor API to get Tags from Prompt. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/get-tags-from-prompt"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Tags from Prompt

## Quick reference

Use this Conductor endpoint to get Tags from Prompt. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/prompts/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/prompts/{name}/tags`

Retrieves tags from a prompt. 

## Path parameters

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt to retrieve tags from. | string | Required. | 

## Response

Returns 200 OK with an array of tag objects, each containing a key-value pair.

## Examples

<details>
<summary>Get tags from a prompt</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/prompts/population-prompt/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "team",
    "value": "docs"
  },
  {
    "key": "team",
    "value": "engineering"
  }
]
```

</details>
