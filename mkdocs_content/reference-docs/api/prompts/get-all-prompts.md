---
title: "Get All Prompts"
description: "Use the Orkes Conductor Conductor API to get All Prompts. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/prompts/get-all-prompts"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get All Prompts

## Quick reference

Use this Conductor endpoint to get All Prompts. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/prompts`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/prompts`

Retrieves all prompts from the cluster.

## Response

- Returns 200 OK with the prompt objects on success.
- Returns 401 if authentication is required.

## Examples

<details>
<summary>Get all prompts</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/prompts' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1780310666892,
    "updateTime": 1780310666892,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "email-summary",
    "template": "Summarize this email in ${language}: ${email_body}",
    "description": "Summarizes an email",
    "variables": ["email_body", "language"],
    "integrations": ["openAI:gpt-4o"],
    "tags": [],
    "version": 1,
    "temperature": 0.1,
    "topP": 1,
    "responseFormat": "text",
    "stopWords": []
  },
  {
    "createTime": 1780310666903,
    "updateTime": 1780310666903,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "meeting-notes",
    "template": "Summarize the following meeting transcript: ${transcript}",
    "description": "Summarizes a meeting transcript",
    "variables": ["transcript"],
    "integrations": ["openAI:gpt-4o"],
    "tags": [],
    "version": 1,
    "temperature": 0.1,
    "topP": 1,
    "responseFormat": "text",
    "stopWords": []
  }
]
```

</details>
