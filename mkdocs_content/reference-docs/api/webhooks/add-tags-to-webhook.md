---
title: "Add Tags to Webhook"
description: "Use the Orkes Conductor webhooks API to add Tags to Webhook. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/webhooks/add-tags-to-webhook"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Add Tags to Webhook, Add Tags to Webhook API, API orchestration, API gateway, event-driven orchestration, webhooks"
---

# Add Tags to Webhook

## Quick reference

Use this webhooks endpoint to add Tags to Webhook. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `PUT` `/api/metadata/webhook/{id}/tags`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `PUT /api/metadata/webhook/{id}/tags`

Adds tags to a webhook. You can add a single tag or multiple tags in one request. This operation updates any existing tags with the provided ones.

## Path parameters

| Paramaeter | Description | Type | Required |
| ---------- | ----------- | ---- | -------- |
| id | The unique identifier of the webhook to which the tags are to be added. | string | Required. |

## Response

Returns 200 OK with an array of webhook objects, including parameters such as `id`, `name`, `sourcePlatform`, `verifier`, `webhookExecutionHistory`, and more.

## Request body

The request body should be an array of tag objects.

| Paramaeter | Description | Type | Required |
| ---------- | ----------- | ---- | -------- |
| key | The tag key. | string | Required. |
| value | The tag value. | string | Required. |

**Example for adding multiple tags in a single request:**

```json
[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
```
## Response

Returns 200 OK, indicating that the tags have been added to the webhook.

## Examples

<details>
<summary>Add a single tag to a webhook</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook/897f37a7-f2a4-11f0-97ee-8e75126ccff4/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "platform",
    "value": "Jira"
  }
]'
```

**Response**

Returns 200 OK, indicating that the tags have been added to the webhook.

</details>

<details>
<summary>Add multiple tags to a webhook</summary>

**Request**

```bash
curl -X 'PUT' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook/897f37a7-f2a4-11f0-97ee-8e75126ccff4/tags' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "key": "dev",
    "value": "automation"
  },
  {
    "key": "backend",
    "value": "PR"
  }
]
'
```

**Response**

Returns 200 OK, indicating that the tags have been added to the webhook.

</details>

## Related pages

- [Webhook API](/content/reference-docs/api/webhooks)
- [Create Webhook](/content/reference-docs/api/webhooks/create-webhook)
- [Update Webhook](/content/reference-docs/api/webhooks/update-webhook)
- [Get Webhook by ID](/content/reference-docs/api/webhooks/get-webhook)
- [Delete Webhook](/content/reference-docs/api/webhooks/delete-webhook)
- [Get All Webhooks](/content/reference-docs/api/webhooks/get-all-webhooks)
