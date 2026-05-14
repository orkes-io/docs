---
title: "Get All Integrations"
description: "Use the Orkes Conductor integrations API to get All Integrations. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/integrations/get-all-integrations"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get All Integrations

## Quick reference

Use this integrations endpoint to get All Integrations. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/`

Retrieves all integrations from your Conductor cluster. This API returns details of the integration along with all their model configurations.

## Query parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| category | The category of the integration to filter. Supported values:<ul><li>AI_MODEL: For [AI/LLM](/content/category/integrations/ai-llm) integrations.</li><li>VECTOR_DB: For [Vector database](/content/category/integrations/vector-databases) integrations.</li><li>MESSAGE_BROKER: For [message broker](/content/category/integrations/message-broker) integrations.</li><li>CLOUD: For [cloud provider](/content/category/integrations/cloud-provider) integrations.</li><li>RELATIONAL_DB: For [relational database](/content/category/integrations/rdbms) integrations.</li><li>GIT: For [Git repository](/content/integrations/git-repository) integrations.</li><li>EMAIL: For [email provider](/content/integrations/email/sendgrid) integrations.</li></ul> | string | Optional. | 
| activeOnly | Whether to retrieve only active integrations. Set to `false` to include all integrations including inactive ones. Default is `true`. | boolean | Optional. | 

## Response

Returns an array of integration objects from the Conductor cluster, including configuration details and associated models or APIs for each integration.
 
## Examples

<details>
<summary>Get all integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/?activeOnly=false' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1768205768602,
    "updateTime": 1768205768602,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "<API_KEY>",
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 1,
    "apis": [
      {
        "createTime": 1768205843203,
        "updateTime": 1768205843203,
        "createdBy": "john.doe@acme.com",
        "updatedBy": "john.doe@acme.com",
        "integrationName": "openAI",
        "api": "chatgpt-4o-latest",
        "description": "",
        "configuration": {},
        "enabled": true
      }
    ]
  },
  {
    "createTime": 1776769063930,
    "updateTime": 1776769133488,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "sendgrid-test",
    "type": "sendgrid",
    "description": "Test",
    "category": "EMAIL",
    "configuration": {
      "api_key": "<API_KEY>"
    },
    "enabled": false,
    "tags": [],
    "modelsCount": 0,
    "apis": []
  }
]
```

</details>

<details>
<summary>Get all active integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/?activeOnly=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1768205768602,
    "updateTime": 1768205768602,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "<API_KEY>",
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 1,
    "apis": [
      {
        "createTime": 1768205843203,
        "updateTime": 1768205843203,
        "createdBy": "john.doe@acme.com",
        "updatedBy": "john.doe@acme.com",
        "integrationName": "openAI",
        "api": "chatgpt-4o-latest",
        "description": "",
        "configuration": {},
        "enabled": true
      }
    ]
  }
]
```
</details>

<details>
<summary>Get all AI_MODEL integrations</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/?category=AI_MODEL&activeOnly=true' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "createTime": 1768205768602,
    "updateTime": 1768205768602,
    "createdBy": "john.doe@acme.com",
    "updatedBy": "john.doe@acme.com",
    "name": "openAI",
    "type": "openai",
    "description": "Please remember to set your api key",
    "category": "AI_MODEL",
    "configuration": {
      "api_key": "<API_KEY>",
      "endpoint": "https://api.openai.com",
      "organizationId": ""
    },
    "enabled": true,
    "tags": [],
    "modelsCount": 1,
    "apis": [
      {
        "createTime": 1768205843203,
        "updateTime": 1768205843203,
        "createdBy": "john.doe@acme.com",
        "updatedBy": "john.doe@acme.com",
        "integrationName": "openAI",
        "api": "chatgpt-4o-latest",
        "description": "",
        "configuration": {},
        "enabled": true
      }
    ]
  }
]
```

</details>
