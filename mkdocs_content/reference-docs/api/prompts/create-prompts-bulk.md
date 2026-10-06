---
title: "Create Prompts in Bulk"
description: "Use the Orkes Conductor Conductor API to create Prompts in Bulk. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/prompts/create-prompts-bulk"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Create Prompts in Bulk, Create Prompts in Bulk API, API orchestration, API gateway"
---

# Create Prompts in Bulk

## Quick reference

Use this Conductor endpoint to create Prompts in Bulk. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/prompts/`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/prompts/`

Creates or updates prompts in bulk. New prompts are created with full access granted to the caller. Existing ones are updated if the caller has **UPDATE** permission.

!!! info "Note"
    This endpoint processes prompts sequentially. A validation failure on one prompt (e.g. a missing integration) throws immediately and halts processing of remaining prompts in the list. If the caller lacks **UPDATE** permission on an existing prompt, that prompt is silently skipped.

## Request body

Format the request body as a JSON array of objects. Each object supports the following fields:

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| name | The name of the prompt. | string | Required. | 
| template | The prompt text body. Can contain `${variable}` placeholders. | string | Required. | 
| version | The version of the prompt. | integer | Optional. | 
| description | A description of the prompt. | string | Optional. | 
| integrations | The LLM integrations to associate with this prompt, in the format `integrationName:modelName`. The integration must already exist in your Conductor cluster. | Array of strings | Optional. | 
| temperature | The temperature for the prompt. | integer | Optional. | 
| topP | Top-p nucleus sampling parameter. | integer | Optional. | 
| responseFormat | The output format of the prompt. | string | Optional. | 
| stopWords | The stop sequences for generation. | Array of strings | Optional. | 

## Response

- Returns 200 OK with no response body on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have READ access to a referenced integration.
- Returns 404 if a referenced integration does not exist.

## Examples

<details>
<summary>Create prompts in bulk</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/prompts/' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "name": "email-summary",
    "template": "Summarize this email in ${language}: ${email_body}",
    "description": "Summarizes an email",
    "integrations": ["openAI:gpt-4o"],
    "version": 1,
    "temperature": 0.1,
    "topP": 1.0,
    "responseFormat": "text",
    "stopWords": []
  },
  {
    "name": "meeting-notes",
    "template": "Summarize the following meeting transcript: ${transcript}",
    "description": "Summarizes a meeting transcript",
    "integrations": ["openAI:gpt-4o"],
    "version": 1,
    "temperature": 0.1,
    "topP": 1.0,
    "responseFormat": "text",
    "stopWords": []
  }
]'
```

**Response**

Returns 200 OK, indicating that the prompts have been created successfully.

</details>

## Related pages

- [Prompts](/content/reference-docs/api/prompts)
- [Create or Update Prompt](/content/reference-docs/api/prompts/create-prompt)
- [Create or Update Prompt Version](/content/reference-docs/api/prompts/create-prompt-version)
- [Delete Prompt](/content/reference-docs/api/prompts/delete-prompt)
- [Delete Prompt Version](/content/reference-docs/api/prompts/delete-prompt-version)
- [Get Prompt](/content/reference-docs/api/prompts/get-prompt)
