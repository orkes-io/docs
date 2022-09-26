---
sidebar_position: 1
---
# Dynamic Task
```json
"type" : "DYNAMIC"
```

## Introduction
Dynamic Task allows to execute one of the registered Tasks dynamically at run-time.
It accepts the task name to execute as `taskToExecute` in `inputParameters`.

## Use Cases 

Consider a scenario when we have to make decision of executing a task dynamically i.e. while the workflow is still running. In such cases, Dynamic Task would be useful.
fined directly inside the workflow with type `DYNAMIC`.

## Inputs

Following are the input parameters :

|name|description|
|---|---|
| dynamicTaskNameParam| Name of the task to be called during workflow execution. 

### Dynamic SUBWORKFLOW
If there is a possibility that the task called is a SUBWORKFLOW, you must also add:
 
 ```json
   "subWorkflowParam": {
        "name": "workflow_name",
        "version": <workflow version>
      },
```

If `subWorkflowParam` are present, and the DYNAMIC workflow calls a task type that is not a SUBWORKFLOW, these parameters will be ignored.

## Output

During execution, the DYNAMIC task is replaced in the workflow with whatever task is called dynamically.  The output during execution is whatever the output of the called task normally outputs.

## Examples

Suppose in a workflow, we have to take decision to ship the courier, but the decision is made during execution:

```json
{
  "name": "Shipping_Flow",
  "description": "Ships smartly on the basis of Shipping info",
  "version": 1,
  "tasks": [
    {
      "name": "shipping_info",
      "taskReferenceName": "shipping_info",
      "inputParameters": {
      },
      "type": "SIMPLE"
    },
    {
      "name": "shipping_task",
      "taskReferenceName": "shipping_task",
      "inputParameters": {
         // highlight-next-line
        "taskToExecute": "${shipping_info.output.shipping_service}"
      },
      "type": "DYNAMIC",
      "dynamicTaskNameParam": "taskToExecute"
    }

  ],
  "restartable": true,
  "ownerEmail":"abc@example.com",
  "workflowStatusListenerEnabled": true,
  "schemaVersion": 2
}
```

The `shipping_info` task generates an output that is used to determine which task is run in the `shipping_task` DYNAMIC task.  

The line `"taskToExecute": "${shipping_info.output.shipping_service}"` reads the shipping_service output from `shipping_info`.

In this example, there are two possible outputs`ship_via_fedex` or `ship_via_ups`


### Workflow Definition

Here is the workflow with the DYNAMIC task:


![Conductor UI - Workflow Diagram](/img/tutorial/ShippingWorkflow.png)


### Workflow Execution 

Now, assume a workflow execution, where `shipping_info` outputs:

```json
{
  "shipping_service": "ship_via_fedex"
}
```

The DYNAMIC task `shipping_task` has been replaced with `ship_via_fedex`:


![Conductor UI - Workflow Run](/img/tutorial/ShippingWorkflowRunning.png)

if the output is:

```json
{
  "shipping_service": "ship_via_ups"
}
```
The DYNAMIC task `shipping_task` has been replaced with `ship_via_ups`:

![Conductor UI - Workflow Run](/img/tutorial/ShippingWorkflowUPS.png)


## Common Errors 

If the incorrect task name or the task that doesn't exist is provided then the workflow fails and
we get the error `"Invalid task specified. Cannot find task by name in the task definitions."`

If the null reference is provided in the task name then also the workflow fails and we get the
error `"Cannot map a dynamic task based on the parameter and input. Parameter= taskToExecute, input= {taskToExecute=null}"`
