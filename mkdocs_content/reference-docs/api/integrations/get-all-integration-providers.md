---
title: "Get All Integration Providers"
description: "Use the Orkes Conductor integrations API to get All Integration Providers. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/integrations/get-all-integration-providers"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get All Integration Providers, Get All Integration Providers API, API orchestration, API gateway"
---

# Get All Integration Providers

## Quick reference

Use this integrations endpoint to get All Integration Providers. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/provider`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/provider`

Retrieves all integration providers from your Conductor cluster. Unlike [Get All Integrations](/content/reference-docs/api/integrations/get-all-integrations), this endpoint returns provider metadata and model count only, without any model details.

## Query parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| category | The category of the integration to filter. Supported values:<ul><li>AI_MODEL: For [AI/LLM](/content/category/integrations/ai-llm) integrations.</li><li>VECTOR_DB: For [Vector database](/content/category/integrations/vector-databases) integrations.</li><li>MESSAGE_BROKER: For [message broker](/content/category/integrations/message-broker) integrations.</li><li>CLOUD: For [cloud provider](/content/category/integrations/cloud-provider) integrations.</li><li>RELATIONAL_DB: For [relational database](/content/category/integrations/rdbms) integrations.</li><li>GIT: For [Git repository](/content/integrations/git-repository) integrations.</li><li>EMAIL: For [email provider](/content/integrations/email/sendgrid) integrations.</li></ul> | string | Optional. | 
| activeOnly | Whether to retrieve only active integrations. Set to `false` to include all integrations including inactive ones. Default is `true`. | boolean | Optional. | 

## Response

Returns an array of integration provider objects. Each object includes provider configuration and a `modelsCount` field indicating the number of accessible models. Model details are not embedded.
 
## Examples

<details>
<summary>Get all integration providers</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider?activeOnly=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1772787470214,
    "updateTime": 1773839434450,
    "createdBy": "john.doe@orkes.io",
    "updatedBy": "john.doe@orkes.io",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "xxxxx",
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 3
  },
  {
    "createTime": 1750752182767,
    "updateTime": 1763713203291,
    "createdBy": "john.doe@orkes.io",
    "updatedBy": "john.doe@orkes.io",
    "name": "SendGrid",
    "type": "sendgrid",
    "description": "SendGrid integration",
    "category": "EMAIL",
    "configuration": {
      "api_key": "xxxxx"
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 0
  },
  {
    "createTime": 1764313295504,
    "updateTime": 1764313295504,
    "createdBy": "john.doe@orkes.io",
    "updatedBy": "john.doe@orkes.io",
    "name": "Pinecone",
    "type": "pineconedb",
    "description": "Test",
    "category": "VECTOR_DB",
    "configuration": {
      "api_key": "xxxxx",
      "projectName": "xxxxx",
      "environment": "us-east-1"
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 1
  }
]
```

</details>

<details>
<summary>Get all active integration providers</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider?activeOnly=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1772787470214,
    "updateTime": 1773839434450,
    "createdBy": "john.doe@orkes.io",
    "updatedBy": "john.doe@orkes.io",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "xxxxxxxx,
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 3
  }
]
```
</details>

<details>
<summary>Get all AI_MODEL integrations</summary>

**Request**

```shell
 curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider?category=AI_MODEL&activeOnly=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1772787470214,
    "updateTime": 1773839434450,
    "createdBy": "john.doe@orkes.io",
    "updatedBy": "john.doe@orkes.io",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "xxxxxxx",
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 3
  }
]
```

</details>

## Related pages

- [Integrations API Reference](/content/reference-docs/api/integrations)
- [Create or Update Integration Provider](/content/reference-docs/api/integrations/create-integration-provider)
- [Get Integration Provider](/content/reference-docs/api/integrations/get-integration-provider)
- [Delete Integration Provider](/content/reference-docs/api/integrations/delete-integration-provider)
- [Add Tags to Integration Provider](/content/reference-docs/api/integrations/add-tags-to-integration-provider)
- [Get Tags from Integration Provider](/content/reference-docs/api/integrations/get-tags-from-integration-provider)
