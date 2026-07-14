---
title: "Delete Integration Provider"
description: "Use the Orkes Conductor integrations API to delete Integration Provider. Includes endpoint details, authentication, parameters, request bodies."
canonical_route: "reference-docs/api/integrations/delete-integration-provider"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration"
---

# Delete Integration Provider

## Quick reference

Use this integrations endpoint to delete Integration Provider. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/integrations/provider/{name}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/integrations/provider/{name}`

Deletes an integration provider from Conductor cluster.

## Path parameters

| Parameter | Description                                      | Type   | Required/ Optional |
| --------- | ------------------------------------------------ | ------ | ------------------ |
| name | The name of the integration to delete. | string | Required. | 

## Response

Returns 200 OK, indicating that the integration has been deleted.

## Examples

<details>
<summary>Delete an integration provider</summary>

**Request**

```shell
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/integrations/provider/openAI-marketing' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the integration has been deleted.

</details>
