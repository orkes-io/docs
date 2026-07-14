---
title: "Get Available Human Tasks Display Names"
description: "Use the Orkes Conductor human tasks API to get Available Human Tasks Display Names."
canonical_route: "reference-docs/api/human-tasks/get-available-human-tasks-display-names"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, AI orchestration, LLM orchestration, MCP gateway, agent workflows, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Get Available Human Tasks Display Names

## Quick reference

Use this human tasks endpoint to get Available Human Tasks Display Names. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `GET` `/api/human/tasks/getTaskDisplayNames`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `GET /api/human/tasks/getTaskDisplayNames`

Retrieves a list of Human task display names available to the user. Use this endpoint to populate dropdown menus or filters in your application.

## Query parameters

| Parameter | Description                                                       | Type   | Required/ Optional |
| --------- | ----------------------------------------------------------------- | ------ | ------------------ |
| searchType | The type of search. Supported values:<ul><li>`ADMIN`: Returns all Human task display names in the cluster. Must be used by cluster admins. Other users cannot retrieve any data when called.</li><li>`INBOX`: Returns Human task display names assigned to the requesting user.</li></ul> | string | Required.          |

## Response

Returns an array of Human task display names as strings.

When `searchType` is set as `ADMIN`, the response returns all the Human task display names available in the cluster.

When `searchType` is set to `INBOX`, the response returns all the Human task display names available to the requesting user.

## Examples

<details>
<summary>Get all available Human task display names for ADMIN search</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/getTaskDisplayNames?searchType=ADMIN' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns an array of all Human task display names available in the cluster. 

```json
[
  "Approval",
  "Approve Claim",
  "Design Work Intake",
  "High risk - Fraud dispute",
  "LoanApproval",
  "Low risk - Fraud dispute",
  "Medium risk - Fraud dispute",
  "Pick your assets",
  "Reviewer 1",
  "Reviewer2",
  "sample",
  "test",
  "which veggie"
]
```

</details>

<details>
<summary>Get all available Human task display names for INBOX search</summary>

**Request**

```shell
curl -X 'GET' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/getTaskDisplayNames?searchType=INBOX' \
  -H 'accept: application/json' \
  -H 'X-Authorization: <TOKEN>'
```

**Response**

Returns an array of Human task display names assigned to the requesting user.

```json
[
  "Approval",
  "Medium risk - Fraud dispute"
]
```

</details>
