---
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic 

The dynamic task allows us to execute one of the registered tasks dynamically at run-time. This means you can run a task 
that need not be fixed at the time of workflow definition. The task name could even be supplied as part of workflow input and 
can be mapped to the dynamic task input.

## Definitions

```json
    {
      "name": "dynamic_task",
      "taskReferenceName": "dynamic_task_ref",
      "inputParameters": {
        "taskToExecute": "${workflow.input.somevalue}" // Name of the task to execute
      },
      "type": "DYNAMIC",
      "dynamicTaskNameParam": "taskToExecute" // Name of the input parameter holding the task name to execute
    }
```

### Input Parameters

| Attribute            | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| taskToExecute        | Accepts the task name to execute.                                      |
| dynamicTaskNameParam | Indicates the name of the task to be called during workflow execution. |

If there is a possibility that the task called is a SUBWORKFLOW, you must also add:

```json
    "subWorkflowParam": {
      "name": "workflow_name",
      "version": <workflow version>
    },
```

:::note
If **subWorkflowParam** is present, and the DYNAMIC workflow calls a task type that is not a SUBWORKFLOW, these parameters will be ignored.
:::

### Output Parameters

During execution, the DYNAMIC task is replaced in the workflow with whatever task is called dynamically. The output during execution is whatever the output of the called task.

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Dynamic Task`.
2. Add the task to run by mapping it to a variable representing task name.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-dynamic-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "dynamic_task",
      "taskReferenceName": "dynamic_task_ref",
      "inputParameters": {
        "taskToExecute": "${workflow.input.somevalue}"
      },
      "type": "DYNAMIC",
      "dynamicTaskNameParam": "taskToExecute"
    }
```

</TabItem>
</Tabs>


<details><summary>Shipping Courier</summary>
<p>
Suppose in a workflow, we have to decide to ship the courier, but the decision is to be made during execution. The workflow looks like this:

```json
{
  "name": "Shipping_Flow",
  "description": "Ships smartly on the basis of Shipping info",
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
        "taskToExecute": "${shipping_info.output.shipping_service}"
      },
      "type": "DYNAMIC",
      "dynamicTaskNameParam": "taskToExecute"
    }
  ]
}
```

The **shipping_info** task generates an output that is used to determine which task is run in the **shipping_task** DYNAMIC task. The line **"taskToExecute": "${shipping_info.output.shipping_service}"** reads the **shipping_service** output from **shipping_info**. In this example, there are two possible outputs, **ship_via_fedex** or **ship_via_ups**.

Here is the workflow with the DYNAMIC task:

<p align="center"><img src="/content/img/dynamic-task-example.png" alt="Dynamic Task Example" width="50%" height="auto"></img></p>

Now, assume a workflow execution where **shipping_info** outputs:

```json
{
 "shipping_service": "ship_via_fedex"
}
```

The DYNAMIC task **shipping_task** has been replaced with **ship_via_fedex**:


<p align="center"><img src="/content/img/ship-via-fedex.jpg" alt="Ship Via Fedex" width="50%" height="auto"></img></p>

If the output is:

```json
{
  "shipping_service": "ship_via_ups"
}
```
The DYNAMIC task **shipping_task** has been replaced with **ship_via_ups**:

<p align="center"><img src="/content/img/ship-via-ups.jpg" alt="Ship Via UPS" width="50%" height="auto"></img></p>
</p>
</details>