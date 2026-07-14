---
title: "Get Webhook by ID"
description: "Use the Orkes Conductor webhooks API to get Webhook by ID. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/webhooks/get-webhook"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, event-driven orchestration, webhooks, Kafka orchestration, RabbitMQ orchestration"
---

# Get Webhook by ID

## Quick reference

Use this webhooks endpoint to get Webhook by ID. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/webhook/{id}`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/webhook/{id}`

Retrieves a webhook by its ID.

## Path parameters

| Paramaeter | Description | Type | Required |
| ---------- | ----------- | ---- | -------- |
| id | The unique identifier of the webhook to retrieve. | string | Required. |

## Response

Returns 200 OK with the webhook object, including parameters such as `id`, `name`, `sourcePlatform`,` verifier`, `webhookExecutionHistory`, and more.

Returns 404 if an invalid webhook ID is provided.

## Examples

<details>
<summary>Get a webhook by ID</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook/402e5a08-e390-11ef-925c-865827cbc571' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
{
  "name": "Sample Webhhok",
  "id": "402e5a08-e390-11ef-925c-865827cbc571",
  "receiverWorkflowNamesToVersions": {
    "Workflow1": 1,
    "Workflow2": 1
  },
  "urlVerified": true,
  "sourcePlatform": "Custom",
  "verifier": "HEADER_BASED",
  "headers": {
    "key": "value"
  },
  "secretValue": "***",
  "createdBy": "john.doe@acme.com",
  "webhookExecutionHistory": [
    {
      "eventId": "00eb2c0a-e391-11ef-925c-865827cbc571",
      "matched": true,
      "workflowIds": [
        "9b1bf0a4-e390-11ef-ae1e-7a0cdef2b3ba",
        "9ff40596-e390-11ef-ae1e-7a0cdef2b3ba"
      ],
      "payload": "{\"webhookId\":\"402e5a08-e390-11ef-925c-865827cbc571\",\"headers\":{\"x-real-ip\":[\"10.202.10.31\"],\"x-nginx-proxy\":[\"true\"],\"host\":[\"content-team.orkesconductor.io\"],\"connection\":[\"close\"],\"content-length\":[\"53\"],\"x-request-id\":[\"d7063929da4469b7bf63910c4c5459bf\"],\"x-forwarded-host\":[\"content-team.orkesconductor.io\"],\"x-forwarded-port\":[\"443\"],\"x-forwarded-proto\":[\"https\"],\"x-forwarded-scheme\":[\"https\"],\"x-scheme\":[\"https\"],\"key\":[\"value\"],\"content-type\":[\"application/json\"],\"user-agent\":[\"PostmanRuntime/7.43.0\"],\"accept\":[\"*/*\"],\"cache-control\":[\"no-cache\"],\"postman-token\":[\"d60d175a-e4b5-49fb-8cda-78cd1b40ba19\"],\"accept-encoding\":[\"gzip, deflate, br\"]},\"requestParams\":{},\"id\":\"00eb2c0a-e391-11ef-925c-865827cbc571\",\"timeStamp\":1738739739695,\"body\":\"{\\n    \\\"data\\\":\\n    {\\n        \\\"recipientId\\\":\\\"2\\\"\\n    }\\n}\"}",
      "timeStamp": 1738739739695
    }
  ]
}
```

</details>
