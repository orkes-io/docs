---
title: "Get Tags from Webhook"
description: "Use the Orkes Conductor webhooks API to get Tags from Webhook. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/webhooks/get-tags-from-webhook"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, event-driven orchestration, webhooks, Kafka orchestration, RabbitMQ orchestration"
---

# Get Tags from Webhook

## Quick reference

Use this webhooks endpoint to get Tags from Webhook. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/webhook/{id}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/webhook/{id}/tags`

Retrieves the tags associated with a webhook.

## Path parameters

| Paramaeter | Description | Type | Required |
| ---------- | ----------- | ---- | -------- |
| id | The unique identifier of the webhook from which the tags are to be retrieved. | string | Required. |

## Response

Returns an array of tag objects, each containing a key-value pair.

## Examples

<details>
<summary>Get tags from a webhook</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook/897f37a7-f2a4-11f0-97ee-8e75126ccff4/tags' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "key": "frontend",
    "value": "PR"
  }
]
```

</details>
