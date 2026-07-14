---
title: "Get Tags from Integration Resource"
description: "Use the Orkes Conductor integrations API to get Tags from Integration Resource. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/integrations/get-tags-from-integration-resource"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Get Tags from Integration Resource

## Quick reference

Use this integrations endpoint to get Tags from Integration Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/integrations/provider/{name}/integration/{integration_name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/integrations/provider/{name}/integration/{integration_name}/tags`

Retreive tags from an integration resource. 

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration which contains the resources. This is the integration name, not the provider name. For example, if you have created an OpenAI integration named `openAI`, use `openAI`. | string | Required. | 
| integration_name | The name of the specific resource from which tags are to be retrieved, which can be:<ul><li>the model name for AI/LLMs</li><li>the index name for databases</li><li>the table name for RDBMS</li></ul> | string | Required. | 

## Response

Returns an array of tag objects, each containing a key-value pair.

## Examples

<details>
<summary>Get tags from an integration resource</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "test",
    "value": "tag"
  }
]
```

</details>
