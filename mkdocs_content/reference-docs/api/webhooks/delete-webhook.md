---
title: "Delete Webhook"
description: "Use the Orkes Conductor webhooks API to delete Webhook. Includes endpoint details, authentication, parameters, request bodies, response behavior, and examples."
canonical_route: "reference-docs/api/webhooks/delete-webhook"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, event-driven orchestration, webhooks, Kafka orchestration, RabbitMQ orchestration"
---

# Delete Webhook 

## Quick reference

Use this webhooks endpoint to delete Webhook. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `DELETE` `/api/metadata/webhook/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `DELETE /api/metadata/webhook/{id}`

Deletes a webhook by its ID.

## Path parameters

| Paramaeter | Description | Type | Required |
| ---------- | ----------- | ---- | -------- |
| id | The unique identifier of the webhook to delete. | string | Required. |

## Response

Returns 200 OK, indicating that the webhook has been deleted successfully.

Returns 404 if an invalid webhook ID is provided.

## Examples

<details>
<summary>Delete a webhook</summary>

**Request**

```bash
curl -X 'DELETE' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook/8dbbddbf-e22b-4635-9fcb-c9e03965ac2e' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns 200 OK, indicating that the webhook has been deleted successfully.

</details>
