---
title: "Delete Tags from Integration Resource"
description: "Use the Orkes Conductor integrations API to delete Tags from Integration Resource."
canonical_route: "reference-docs/api/integrations/delete-tags-from-integration-resource"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Tags from Integration Resource

## Quick reference

Use this integrations endpoint to delete Tags from Integration Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/integrations/provider/{name}/integration/{integration_name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/integrations/provider/{name}/integration/{integration_name}/tags`

Delete tags from an integration resource. 

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration which contains the resources. This is the integration name, not the provider name. For example, if you have created an OpenAI integration named `openAI`, use `openAI`. | string | Required. | 
| integration_name | The name of the specific resource from which tags are to be deleted, which can be:<ul><li>the model name for AI/LLMs</li><li>the index name for databases</li><li>the table name for RDBMS</li></ul> | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key | The tag key to be removed. | string | Required. | 
| value | The tag value to be removed. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the integration resource.

## Examples

<details>
<summary>Delete a tag from an integration resource</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "test",
    "value": "tag"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the resource.

</details>
