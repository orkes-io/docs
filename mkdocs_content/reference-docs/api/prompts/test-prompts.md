---
title: "Test Prompts"
description: "Use the Orkes Conductor Conductor API to test Prompts. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/prompts/test-prompts"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Test Prompts, Test Prompts API, API orchestration, API gateway"
---

# Test Prompts

## Quick reference

Use this Conductor endpoint to test Prompts. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/prompts/test`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/prompts/test`

Tests a raw prompt string against a specified LLM integration and returns the model response. The prompt does not need to be saved in Conductor. This endpoint can be used to test ad-hoc prompt text before creating or updating a prompt.

## Request Body

| Parameter | Description                                    | Type   | Required/ Optional |
| --------- | ---------------------------------------------- | ------ | ------------------ |
| llmProvider | The name of the LLM provider integration in Conductor to test the prompt with. | string | Required | 
| model | The model name within the LLM provider to test the prompt with. | string | Required. | 
| prompt | The prompt text to test. | string | Required. | 
| promptVariables | Key-value pairs to substitute into the prompt template. | Array of strings | Optional. | 
| temperature | The temperature for the prompt. | integer | Optional. | 
| topP | Top-p nucleus sampling parameter. | integer | Optional. | 
| maxTokens | Maximum tokens to generate. 0 means, it  uses the provider default. | integer | Optional. | 
| stopWords | The stop sequences for generation. | Array of strings | Optional. | 
| response_format | The output format of the prompt. Whether `text` or `json`. | string | Optional. | 

## Response

- Returns 200 OK with the raw model output as a plain-text string on success.
- Returns 401 if authentication is required.
- Returns 403 if the caller does not have READ access to the specified `llmProvider:model`.

## Examples

<details>
<summary>Test a prompt</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/prompts/test' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>' \
  -d '{
  "llmProvider": "openAI",
  "model": "gpt-4o",
  "prompt": "What is the current population of `${country}`? What was the population in `${year}`?",
  "promptVariables": {
    "country": "Japan",
    "year": "1994"
  },
  "temperature": 0.1,
  "topP": 0.9,
  "stopWords": [],
  "response_format": "text"
}'
```

**Response**

Returns 200 OK with the raw model output as a plain-text string on success.

```json
As of the latest data available up to October 2023, Japan's population is estimated to be around 124 million people. In 1994, the population of Japan was approximately 125 million. Please note that these figures are estimates and can vary based on the source and the methodology used for population counting.
```

</details>
