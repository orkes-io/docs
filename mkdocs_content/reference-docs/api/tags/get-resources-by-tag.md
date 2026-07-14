---
title: "Get Resources by Tag"
description: "Use the Orkes Conductor tags API to get Resources by Tag. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/tags/get-resources-by-tag"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Resources by Tag, Get Resources by Tag API, API orchestration, API gateway"
---

# Get Resources by Tag

## Quick reference

Use this tags endpoint to get Resources by Tag. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/metadata/tags/resources`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/metadata/tags/resources`

Retrieves all resources associated with a specific tag key-value pair, filtered by resource type. Use this endpoint to identify which workflows, tasks, schedules, or other resources carry a given tag.

## Query parameters

| Parameter | Description | Type | Required/Optional |
|---|---|---|---|
| tagKey | The tag key to filter resources by. | string | Required. |
| tagValue | The tag value to filter resources by. | string | Required. |
| resourceType | The resource type to filter by. Supported values: <ul><li>`WORKFLOW_DEF` - The workflow definitions.</li><li>`TASK_DEF` - The task definitions.</li><li>`WORKFLOW_SCHEDULE` - The workflow schedules</li><li>`EVENT_HANDLER` - The event handlers.</li><li>`APPLICATION` - The applications in Conductor.</li><li>`SECRET_NAME` - The secrets stored in Conductor.</li><li>`ENV_VARIABLE` - The environment variables stored in Conductor.</li><li>`INTEGRATION_PROVIDER` - The integrations in Conductor.</li><li>`PROMPT` - The AI prompts in Conductor.</li><li>`USER_FORM_TEMPLATE` - The user forms for human task inputs.</li><li>`WEBHOOK` - The webhooks in Conductor.</li><li>`API_GATEWAY_SERVICE` - The Gateway service definitions.</li><li>`AUTH_CONFIG` - The API Gateway authentication configuration.</li></ul> | string | Required. |

## Response

- Returns 200 OK with an array of matching resources.

```json
[
  {
    "id": "string",
    "displayName": "string"
  }
]
```

| Field | Description |
|---|---|
| id | The resource identifier. For `USER_FORM_TEMPLATE`, this is formatted as `templateName/version`. For `WEBHOOK`, this is the webhook UUID. For all other resource types, this matches `displayName`. |
| displayName | The human-readable name shown in the UI. For `WEBHOOK` and `USER_FORM_TEMPLATE`, this may differ from `id`. For all other resource types, `id` and `displayName` are the same. |

- Returns 400 Bad Request if an unsupported `resourceType` value is provided.
- Returns 401 Unauthorized if valid credentials are not provided.

## Examples

<details>
<summary>Get workflow schedules by tag</summary>

The following example retrieves all workflow schedules tagged with `team:backend`.

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/tags/resources?tagKey=team&tagValue=backend&resourceType=WORKFLOW_SCHEDULE' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "annual_upgrade",
    "displayName": "annual_upgrade"
  }
]
```
</details>

<details>
<summary>Get user forms by tag</summary>

The following example retrieves all user forms tagged with `team:docs`.

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/tags/resources?tagKey=team&tagValue=docs&resourceType=USER_FORM_TEMPLATE' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "ApprovalJohn/1",
    "displayName": "ApprovalJohn"
  },
  {
    "id": "InsuranceClaims/1",
    "displayName": "InsuranceClaims"
  }
]
```

</details>

<details>
<summary>Get webhooks by tag</summary>

The following example retrieves all webhooks tagged with `team:docs`.

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/metadata/tags/resources?tagKey=team&tagValue=docs&resourceType=WEBHOOK' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

```json
[
  {
    "id": "897f37a7-f2a4-11f0-97ee-8e75126ccff4",
    "displayName": "CreateJiraTickets"
  }
]
```

</details>

## Related pages

- [Tags](/content/reference-docs/api/tags)
- [List All Tags](/content/reference-docs/api/tags/list-all-tags)
- [List Tags Grouped by Resource Type](/content/reference-docs/api/tags/get-all-tags-grouped)
- [Add Tags to a Task Definition](/content/reference-docs/api/tags/add-tags-to-a-task-definition)
- [Replace Tags in a Task Definition](/content/reference-docs/api/tags/replace-tags-in-a-task-definition)
- [Get Tags from a Task Definition](/content/reference-docs/api/tags/get-tags-from-task-definition)
