---
sidebar_position: 10
---

# Dynamic Task

### What is Dynamic Task?

Dynamic Task allows to execute one of the registered Tasks dynamically at run-time. It accepts the task name to execute
in inputParameters.

### What is a Dynamic Task use case?

Consider a scenario, when we have to make decision of executing a task dynamically i.e. while the workflow is still
running. In such cases, Dynamic Task would be useful.

### How is it defined?

Dynamic task is defined directly inside the workflow with type
`DYNAMIC`.

### Example of Dynamic Task

Following is an example of Dynamic Task which can be defined inside the workflow.

```json
{
  "name": "user_task",
  "taskReferenceName": "t1",
  "inputParameters": {
    "taskToExecute": "${workflow.input.dynamicTaskToExecute}"
  },
  "type": "DYNAMIC",
  "dynamicTaskNameParam": "taskToExecute"
}
```

Following are the parameters -

1. `"dynamicTaskNameParam"` - Name of the parameter from the task input whose value is used to schedule the task.
    1. In the above example, the workflow task to execute parameter name is `taskToExecute`
    2. And `taskToExecute` is provided in the input as a reference to `${workflow.input.dynamicTaskToExecute}` - this
       means its the value of the workflow input parameter called `dynamicTaskToExecute`

If the workflow is started with input parameter `dynamicTaskToExecute` value as `fedex_shipping_task`, Conductor will
schedule `fedex_shipping_task` when scheduling this dynamic task.

### FAQs

Example use case:

1. We have pre-defined 2 types of workers
2. When the workflow starts, based on the input parameter, we can decide which worker to run
3. Show example of both workers running
4. Show example of what happens when you try to run a task that doesn't exist
    1. Show what happens if we give a null reference

Sample Use Case

1. Worker 1: Ship via Fedex
2. Worker 2: Ship via UPS
3. Name of workflow : ShippingFlow
4. Start -> Read Shipping Info -> Run Dynamic Shipping Task -> End

Add code, refer to the 

