---
sidebar_position: 3
slug: "/reference-docs/api/task/task-queue/get-task-queue-size-for-individual-tasks"
description: "This API is used to retrieve the task queue size for a specific task in your Conductor cluster."
---

# Get Task Queue Size for Individual Tasks

Used to retrieve the task queue size for a particular task in your Conductor instance.

## Input Payload

| Attribute | Decsription |
| --------- | ----------- |
| taskType | The name of the task to be queried. |

## API Endpoint

```
GET /tasks/queue/sizes
```

Returns the task queue size of the queried task.