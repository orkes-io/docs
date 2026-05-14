---
title: "Get Integration List"
description: "Use the Orkes Conductor integrations API to get Integration List. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/integrations/get-integration-list"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Integration List

## Quick reference

Use this integrations endpoint to get Integration List. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/all`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/all`

Returns a flat list of integration names available to the caller. Designed for lightweight lookups, such as UI dropdowns, rather than full integration details.

## Query parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| category | The category of the integration to filter by. Supported values:<ul><li>AI_MODEL: For [AI/LLM](/content/category/integrations/ai-llm) integrations.</li><li>VECTOR_DB: For [Vector database](/content/category/integrations/vector-databases) integrations.</li><li>MESSAGE_BROKER: For [message broker](/content/category/integrations/message-broker) integrations.</li><li>CLOUD: For [cloud provider](/content/category/integrations/cloud-provider) integrations.</li><li>RELATIONAL_DB: For [relational database](/content/category/integrations/rdbms) integrations.</li><li>GIT: For [Git repository](/content/integrations/git-repository) integrations.</li><li>EMAIL: For [email provider](/content/integrations/email/sendgrid) integrations.</li></ul> | string | Optional. | 
| activeOnly | Whether to retrieve only active integrations. Set to `false` to include all integrations including inactive ones. Default is `true`. | boolean | Optional. | 

## Response

Returns a list of integration name strings. Each entry follows the format `"providerName:apiName"` for integrations with sub-APIs (for example, `"openAI:gpt-4o`"), or `"providerName"` for integrations with no sub-APIs.
 
## Examples

<details>
<summary>Get all integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/all?activeOnly=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  "Weaviate:SampleProducts",
  "openAI:chatgpt-4o-latest",
  "openAI:text-embedding-3-large",
  "openAI:text-embedding-ada-002",
  "openAI:gpt-4o",
  "Pinecone:doc",
  "azure-openai:o3-mini",
  "mistral:codestral-latest",
  "open-ai-test:gpt-4o",
  "claude-test:claude-sonnet-4-6"
]
```

</details>

<details>
<summary>Get all active integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/all?activeOnly=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  "Weaviate:SampleProducts",
  "openAI:chatgpt-4o-latest",
  "openAI:text-embedding-3-large",
  "openAI:text-embedding-ada-002",
  "openAI:gpt-4o",
  "Pinecone:doc",
  "azure-openai:o3-mini",
  "mistral:codestral-latest"
]
```
</details>

<details>
<summary>Get all AI_MODEL integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/all?type=AI_MODEL&activeOnly=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  "openAI:chatgpt-4o-latest",
  "openAI:text-embedding-3-large",
  "openAI:text-embedding-ada-002",
  "openAI:gpt-4o",
  "azure-openai:o3-mini",
  "mistral:codestral-latest",
  "open-ai-test:gpt-4o",
  "claude-test:claude-sonnet-4-6"
]
```

</details>
