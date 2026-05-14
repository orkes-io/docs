---
title: "Get Integration Resource"
description: "Use the Orkes Conductor integrations API to get Integration Resource. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/integrations/get-integration-resource"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Integration Resource

## Quick reference

Use this integrations endpoint to get Integration Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/provider/{name}/integration/{integration_name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/provider/{name}/integration/{integration_name}`

Retrieves an integration resource from Conductor cluster. Integration resources apply to AI/LLMs, vector databases, and RDBMS, where the resources are models, indexes, and tables respectively.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration resource to retrieve. This is the integration name, not the provider name. For example, if you have created an OpenAI integration named `openAI`, use `openAI`. | string | Required. | 
| integration_name | The name of the specific resource to retrieve, which can be:<ul><li>the model name for AI/LLMs</li><li>the index name for databases</li><li>the table name for RDBMS</li></ul> | string | Required. | 

## Response

Returns the integration resource object with its configuration details and enabled status.

## Examples

<details>
<summary>Get an integration resource</summary>

The following request retrieves the gpt-4o model resource from the openAI integration.

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "createTime": 1777623244640,
  "updateTime": 1777623489870,
  "createdBy": "john.doe@acme.com",
  "updatedBy": "john.doe@acme.com",
  "integrationName": "openAI",
  "api": "gpt-4o",
  "description": "Updated description for GPT-4o model",
  "configuration": {},
  "enabled": true,
  "tags": []
}
```

</details>
