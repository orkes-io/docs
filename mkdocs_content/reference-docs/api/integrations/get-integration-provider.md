---
title: "Get Integration Provider"
description: "Use the Orkes Conductor integrations API to get Integration Provider. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/integrations/get-integration-provider"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Integration Provider

## Quick reference

Use this integrations endpoint to get Integration Provider. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/provider/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/provider/{name}`

Retrieves an integration provider from Conductor cluster.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration to retrieve. | string | Required. | 

## Response

Returns the integration provider object with its configuration details, enabled status, and associated model count.

## Examples

<details>
<summary>Get an integration provider</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL/api/integrations/provider/openAI' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "createTime": 1764326634134,
  "updateTime": 1764326634134,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "name": "openAI",
  "type": "openai",
  "description": "Test",
  "category": "AI_MODEL",
  "configuration": {
    "api_key": "<API-KEY>",
    "endpoint": "https://api.openai.com",
    "organizationId": ""
  },
  "enabled": true,
  "tags": [],
  "modelsCount": 4
}
```

</details>
