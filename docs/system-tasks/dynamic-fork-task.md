---
sidebar_position: 6
---

# Dynamic Fork Task


### What is Dynamic FORK Task?

A dynamic fork is same as FORK_JOIN task. Except that the list of tasks 
to be forked is provided at runtime using task's input.

### What is a common Dynamic FORK Task use case?

Dynamic Fork Task can be useful when number of tasks to be forked 
is not fixed and varies based on the input.

### How is it defined?

Dynamic FORK task is defined directly inside the workflow with
`"type":"FORK_JOIN_DYNAMIC"`.


### Example of Dynamic FORK Task

Following is an example of Dynamic Fork Task which can be defined inside the
workflow.


```json
{
  "inputParameters": {
     "dynamicTasks": "${taskA.output.dynamicTasksJSON}",
     "dynamicTasksInput": "${taskA.output.dynamicTasksInputJSON}"
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
}
```
Following are the parameters in the above definition :

1. `"dynamicForkTasksParam"` - Name of the parameter that contains list
   of workflow task configuration to be executed in parallel.

2. `"dynamicForkTasksInputParamName"` - Name of the parameter whose value
   should be a map with key as forked task's reference name and value as
   input the forked task.

Consider taskA's output as:

```json
{
  "dynamicTasksInputJSON": {
    "forkedTask1": {
      "width": 100,
      "height": 100,
      "params": {
        "recipe": "jpg"
      }
    },
    "forkedTask2": {
      "width": 200,
      "height": 200,
      "params": {
        "recipe": "jpg"
      }
    }
  },
  "dynamicTasksJSON": [
    {
      "name": "encode_task",
      "taskReferenceName": "forkedTask1",
      "type": "SIMPLE"
    },
    {
      "name": "encode_task",
      "taskReferenceName": "forkedTask2",
      "type": "SIMPLE"
    }
  ]
}
```

When executed, the dynamic fork task will schedule two parallel task
of type "encode_task" with reference names "forkedTask1" and "forkedTask2"
and inputs as specified by `dynamicTasksInputJSON`.
