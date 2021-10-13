---
sidebar_position: 5
---

# Fork Task

### What is FORK Task?

Fork Task is used to schedule parallel set of tasks, specified by `"type":"FORK_JOIN"`.

### What is a common FORK Task use case?

If there is a scenario where, we need to schedule and run set of tasks
in parallel. FORK Task would be the best option to use.


### How is it defined?

```json
[
    {
        "name": "fork_join",
        "taskReferenceName": "forkx",
        "type": "FORK_JOIN",
        "forkTasks": [
          [
            {
              "name": "task_10",
              "taskReferenceName": "task_A",
              "type": "SIMPLE"
            },
            {
              "name": "task_11",
              "taskReferenceName": "task_B",
              "type": "SIMPLE"
            }
          ],
          [
            {
              "name": "task_21",
              "taskReferenceName": "task_Y",
              "type": "SIMPLE"
            },
            {
              "name": "task_22",
              "taskReferenceName": "task_Z",
              "type": "SIMPLE"
            }
          ]
        ]
    },
    {
        "name": "join",
        "taskReferenceName": "join2",
        "type": "JOIN",
        "joinOn": [
          "task_B",
          "task_Z"
        ]
    }
]
```

When executed, task_A and task_Y are scheduled to be executed at the same time.


### NOTE

#### A Join task MUST follow FORK_JOIN

Workflow definition MUST include a Join task definition followed by FORK_JOIN task. Forked task can be a Sub Workflow, allowing for more complex execution flows.

### FAQs
