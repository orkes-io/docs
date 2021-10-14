---
sidebar_position: 10
---

# Dynamic Task


### What is Dynamic Task?

Dynamic Task allows to execute one of the registered Tasks dynamically 
at run-time. It accepts the task name to execute in inputParameters.

### What is a Dynamic Task use case?

Consider a scenario, when we have to make decision of executing a task
dynamically i.e. while the workflow is still running. In such cases, Dynamic
Task would be useful.

### How is it defined?

Dynamic task is defined directly inside the workflow with type
`DYNAMIC`.

### Example of Dynamic Task

Following is an example of Dynamic Task which can be defined inside the
workflow.

```json
{
"name": "user_task",
"taskReferenceName": "t1",
"inputParameters": {
"files": "${workflow.input.files}",
"taskToExecute": "${workflow.input.user_supplied_task}"
},
"type": "DYNAMIC",
"dynamicTaskNameParam": "taskToExecute"
}
```

Following are the parameters -

1. `"dynamicTaskNameParam"` - Name of the parameter from the task input whose
value is used to schedule the task. e.g. if the value of the parameter is ABC,
the next task scheduled is of type 'ABC'.


If the workflow is started with input parameter `user_supplied_task` value
as `user_task_2`, Conductor will schedule `user_task_2` when scheduling
this dynamic task.

### FAQs


