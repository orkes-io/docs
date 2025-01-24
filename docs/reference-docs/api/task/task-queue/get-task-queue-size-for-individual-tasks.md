---
sidebar_position: 3
slug: "/reference-docs/api/task/task-queue/get-task-queue-size-for-individual-tasks"
description: "This API is used to retrieve the task queue size for a specific task in your Conductor cluster."
---

# Get Task Queue Size for Individual Tasks

**Endpoint:** `GET /tasks/queue/sizes`

Gets the task queue size for a specified task type. The queue size represents the number of tasks of the given type waiting to be processed.

## Query parameters

| Parameter  | Description | Type | Required/Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskType | The type of the task to be queried. For predefined tasks, this indicates the task type, such as _HTTP_. For user-defined tasks, it corresponds to the name of the task definition, such as _python_worker_. | string | Required. | 

## Response

Returns the queue size of the specified task type.

## Examples

<details><summary>Get task queue for HTTP tasks</summary>

**Request**

```bash
curl -X 'GET' \
  'https://<YOUR_CLUSTER>/api/tasks/queue/sizes?taskType=HTTP' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>'
```
**Response**

```json
{
  "HTTP": 3
}
```
</details>

