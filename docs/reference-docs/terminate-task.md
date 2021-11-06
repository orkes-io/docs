---
sidebar_position: 1
---
# Terminate Task

## What is a Terminate Task?

Task that can terminate a workflow with a given status and modify the
workflow's output with a given parameter. It can act as a `"return"` statement
for conditions where you simply want to terminate your workflow.

## Common Use Cases

Consider a scenario, if you have a decision where the first condition
is met, you want to execute some tasks, otherwise you want to finish
your workflow.

## Configuration / Properties

Terminate task is defined directly inside the workflow with type
`TERMINATE`.

```json
{
  "name": "terminate",
  "taskReferenceName": "terminate0",
  "inputParameters": {
      "terminationStatus": "COMPLETED",
      "workflowOutput": "${task0.output}"
  },
  "type": "TERMINATE",
  "startDelay": 0,
  "optional": false
}
```

### Inputs

**Parameters:**

|name|type|description|notes|
|---|---|---|---|
|terminationStatus|String|can only accept "COMPLETED" or "FAILED"|task cannot be optional|
|workflowOutput|Any|Expected workflow output||

### Output

**Outputs:**

|name|type|description|
|---|---|---|
|output|Map|The content of `workflowOutput` from the inputParameters. An empty object if `workflowOutput` is not set.|

## Examples

Let's consider the same example we had in [Switch Task](/docs/reference-docs/switch-task).

Suppose in a workflow, we have to take decision to ship the courier with the shipping
service providers on the basis of input provided while running the workflow.
If the input provided while running workflow does not match with the available
shipping providers then the workflow will fail and return. If input provided 
matches then it goes ahead.

We will create the Workflow with the following definition :

```json
{
  "name": "Terminate_Task_Shipping_Info",
  "description": "Terminate_Task_Shipping_Info",
  "version": 1,
  "ownerEmail":"abc@example.com",
  "tasks": [
  {
    "name": "shipping_info",
    "taskReferenceName": "shipping_info",
    "inputParameters": {
        },
    "type": "SIMPLE"
  },
  {
  "name": "switch_task",
  "taskReferenceName": "switch_task",
  "inputParameters": {
    "case_value_param": "${workflow.input.service}"
  },
  "type": "SWITCH",
  "ownerEmail":"abc@example.com",
  "evaluatorType": "value-param",
  "expression": "case_value_param",
  "defaultCase": [
   {
  "name": "terminate",
  "taskReferenceName": "terminate",
  "inputParameters": {
      "terminationStatus": "FAILED"
  },
  "type": "TERMINATE",
  "startDelay": 0
}
   ],
  "decisionCases": {
    "fedex": [
      {
        "name": "ship_via_fedex",
        "taskReferenceName": "ship_via_fedex",
        "inputParameters": {
        },
        "type": "SIMPLE"
      }
    ],
    "ups": [
      {
        "name": "ship_via_ups",
        "taskReferenceName": "ship_via_ups",
        "inputParameters": {
        },
        "type": "SIMPLE"
      }
    ]
  }
}
],
  "restartable": true,
  "workflowStatusListenerEnabled": true,
  "schemaVersion": 2
}
```

Workflow gets created as shown in the diagram.

![Conductor UI - Workflow Diagram](/img/tutorial/Terminate_Task.png)

Note : We have provided `"terminationStatus": "FAILED"` inside Terminate Task.
Hence, it will return as `failed` if workflow goes in that direction.


We can see in the below picture status as `FAILED` even though the all the task executed
successfully. That happens because, we returned status as `FAILED` in terminate task.

![Conductor UI - Workflow Diagram](/img/tutorial/Terminate_Task_Run.png)


If we had provided `"terminationStatus": "COMPLETED"` inside Terminate Task. It would have
returned as `completed`, as shown in the below picture.

![Conductor UI - Workflow Diagram](/img/tutorial/Terminate_Task_Successful.png)


## FAQs

TODO: Gotchas and other nuances

1. Question 1
    1. Answer

1. Question 2
    1. Answer
