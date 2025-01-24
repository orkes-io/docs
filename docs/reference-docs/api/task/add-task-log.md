---
sidebar_position: 2
slug: "/reference-docs/api/task/add-task-log"
description: "This API is used to log messages associated with a specific task."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Log Task Execution 

**Endpoint:** `POST /tasks/{taskId}/log`

Logs messages or additional details to a specific task execution.

## Path parameters

| Parameter  | Description | Type | Required/ Optional |
| ---------- | ----------- | ---- | ----------------- |
| taskId | The execution ID of the task to log the message. | string | Required. | 

## Request body

Format the request to include the details to be logged for the task. 

**Example**

```json
{"message": "Log this message to the task"}
```
## Examples

<details><summary>Log messages to a task execution</summary>

**Request**

```bash
curl -X 'POST' \
  'https://<YOUR_CLUSTER>/api/tasks/0c658ed7-becd-11ef-a89d-86a819bd92bf/log' \
  -H 'accept: */*' \
  -H 'X-Authorization: <TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"message": "Log this message to the task"}'
```
**Response**

Returns 200 OK, indicating that the message has been logged to the task execution.
</details>
