---
title: "Release Human Task"
description: "Use the Orkes Conductor human tasks API to release Human Task. Includes endpoint details, authentication, parameters, request bodies, response behavior, and."
canonical_route: "reference-docs/api/human-tasks/release-human-task"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, API orchestration, API gateway, service orchestration, workflow tasks, workflow workers, task queues"
---

# Release Human Task

**Endpoint:** `POST /api/human/tasks/{taskId}/release`

Releases a previously claimed Human task. Use this endpoint if the user is unable to complete the task so that another user can claim it.

The invoking user should be one of the following:

- Cluster admin
- Task owner of the Human task
- Task claimant

## Path parameters

| Parameter | Description                                                        | Type   | Required/ Optional |
| --------- | ------------------------------------------------------------------ | ------ | ------------------ |
| taskId    | The task ID of the Human task execution to be released. | string | Required.          |

## Response

Returns 200 OK, indicating that the Human task has been released successfully. Returns 400  if an invalid task execution ID is provided or if the Human task is in the ASSIGNED state.

## Examples

<details>
<summary>Release a claimed Human task</summary>

**Request**

```shell
curl -X 'POST' \
  'https://<YOUR-SERVER-URL>/api/human/tasks/d9de569a-025f-11f1-913a-226156badb04/release' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -d ''
```

**Response**

Returns 200 OK, indicating that the Human task has been released successfully.

</details>
