---
title: "Get All Webhooks"
description: "Use the Orkes Conductor webhooks API to get All Webhooks. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
---

# Get All Webhooks

## Quick reference

Use this webhooks endpoint to get All Webhooks. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/webhook`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/webhook`

Retrieves all webhook definitions from the Conductor cluster.

## Response

Returns 200 OK with an array of webhook objects, including parameters such as `id`, `name`, `sourcePlatform`, `verifier`, `webhookExecutionHistory`, and more.

## Examples

<details>
<summary>Get all webhooks</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/webhook' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "name": "Microsoft Teams",
    "id": "fd7s65d350d6-cb68-11f0-ad52-1a3dbaec0535",
    "receiverWorkflowNamesToVersions": {
      "ms_teams_message_ticket": 1
    },
    "urlVerified": true,
    "sourcePlatform": "Microsoft Teams",
    "verifier": "HMAC_BASED",
    "headerKey": "Authorization",
    "secretValue": "***",
    "createdBy": "john.doe@acme.com",
    "webhookExecutionHistory": [
      {
        "eventId": "fd7s71ff5869-cb69-11f0-8389-dacbc68a58cc",
        "matched": true,
        "workflowIds": [
          "fd7s67b9a53e-cb69-11f0-8389-dacbc68a58cc"
        ],
        "payload": "{...}",
        "timeStamp": 1764231419304
      }
    ]
  }
]
```

</details>
