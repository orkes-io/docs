---
title: "Delete Tags from Integration Provider"
description: "Use the Orkes Conductor integrations API to delete Tags from Integration Provider. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/integrations/delete-tags-from-integration-provider"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Tags from Integration Provider

## Quick reference

Use this integrations endpoint to delete Tags from Integration Provider. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/integrations/provider/{name}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/integrations/provider/{name}/tags`

Deletes tags from an integration provider.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration provider from which the tags are to be deleted. | string | Required. | 

## Request Body

The request body should be an array of tag objects.

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| key | The tag key. | string | Required. | 
| value | The tag value. | string | Required. | 

## Response

Returns 200 OK, indicating that tags have been deleted from the integration provider.

## Examples

<details>
<summary>Delete a single tag from an integration provider</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "docs"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tag has been deleted from the integration provider.

</details>

<details>
<summary>Delete multiple tags from an integration provider</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "team",
    "value": "docs"
  },
  {
    "key": "team",
    "value": "marketing"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tags have been deleted from the integration provider.

</details>
