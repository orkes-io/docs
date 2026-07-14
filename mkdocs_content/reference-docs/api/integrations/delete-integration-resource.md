---
title: "Delete Integration Resource"
description: "Use the Orkes Conductor integrations API to delete Integration Resource. Includes endpoint details, authentication, parameters, request bodies, response."
canonical_route: "reference-docs/api/integrations/delete-integration-resource"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Delete Integration Resource, Delete Integration Resource API, API orchestration, API gateway"
---

# Delete Integration Resource

## Quick reference

Use this integrations endpoint to delete Integration Resource. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/integrations/provider/{name}/integration/{integration_name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/integrations/provider/{name}/integration/{integration_name}`

Deletes an integration resource from Conductor cluster. Integration resources apply to AI/LLMs, vector databases, and RDBMS, where the resources are models, indexes, and tables respectively.

## Path Parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration resource to delete. This is the integration name, not the provider name. For example, if you have created an OpenAI integration named `openAI`, use `openAI`. | string | Required. | 
| integration_name | The name of the specific resource to delete, which can be:<ul><li>the model name for AI/LLMs</li><li>the index name for databases</li><li>the table name for RDBMS</li></ul> | string | Required. | 

## Response

Returns 200 OK, indicating that the resource has been deleted.

## Examples

<details>
<summary>Delete an integration resource</summary>

The following request deletes the `gpt-4o` model resource from the `openAI` integration.

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/integration/gpt-4o' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the resource has been deleted.

</details>
