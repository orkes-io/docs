---
title: "Skip Human Task"
description: "Use the Orkes Conductor human tasks API to skip Human Task. Includes endpoint details, authentication, parameters, request bodies, response behavior."
canonical_route: "reference-docs/api/human-tasks/skip-human-task"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Skip Human Task

## Quick reference

Use this human tasks endpoint to skip Human Task. It is intended for automation scripts, CI/CD jobs, backend services, and internal tools that need to manage Orkes Conductor programmatically.

- **Method and path**: `POST` `/api/human/tasks/{taskId}/skip`
- **Authentication**: Requires Orkes Conductor API credentials with permission for the target resource.
- **Inputs**: Use the path parameters, query parameters, and request body fields documented below.
- **Output**: Returns the Conductor API response for the requested operation. Check the response examples and status codes before wiring the endpoint into production automation.
- **Operational note**: Treat API calls as part of your deployment or runtime control plane. Log request IDs, handle 4xx/5xx responses, and avoid embedding secrets in workflow definitions or source code.


**Endpoint**: `POST /api/human/tasks/{taskId}/skip`

Skips an assigned Human task. Use this endpoint if an existing assignment needs to be skipped before it is claimed.

The invoking user should be one of the following:

- Cluster admin
- Task owner of the Human task
- Task claimant

## Path parameters

| Parameter | Description                                                        | Type   | Required/ Optional |
| --------- | ------------------------------------------------------------------ | ------ | ------------------ |
| taskId    | The task ID of the Human task execution to be skipped. | string | Required.          |

## Query parameters

| Parameter | Description                                                        | Type   | Required/ Optional |
| --------- | ------------------------------------------------------------------ | ------ | ------------------ |
| reason    | A reason for skipping the task. | string | Optional.          |

## Response

Returns 200 OK, indicating that the Human task has been skipped successfully. Returns 400  if an invalid task execution ID is provided or if the Human task has no assignee.

## Examples

<details>
<summary>Skip an assigned Human task</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/9f860711-0265-11f1-913a-226156badb04/skip?reason=P0%20priority' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

Returns 200 OK, indicating that the Human task has been skipped successfully.

</details>
