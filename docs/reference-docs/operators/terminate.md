---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate 
The Terminate task is a task that can terminate the current workflow with a termination status and reason. 

## Definitions

```json
    {
      "name": "terminate_task",
      "taskReferenceName": "terminate_task_ref",
      "inputParameters": {
        "terminationStatus": "COMPLETED",
        "terminationReason": "Task completed successfully.",
        "workflowOutput": {
          "Some-Key": "Some-Value"
        }
      },
      "type": "TERMINATE"
    }
```

:::tip
The Terminate task can modify the workflow's output with a given parameter and act as a return statement for conditions where you want to terminate your workflow.
:::

### Input Parameters

| Attribute         | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| terminationStatus | Indicates the termination status. It can take values **COMPLETED**, **FAILED**, or **TERMINATED**. |
| workflowOutput    | Provide the expected workflow output.                                                              |
| terminationReason | Provide a reason to give a clear understanding of the termination status.                          |

### Output Parameters

| Attribute | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| output    | The content of **workflowOutput** from the inputParameters. An empty object if **workflowOutput** is not set. |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Terminate`.
2. Select the state.
3. Add the reason.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-terminate-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "terminate_task_example",
      "taskReferenceName": "terminate_task_example_ref",
      "inputParameters": {
        "terminationStatus": "COMPLETED",
        "terminationReason": "This is a test"
      },
      "type": "TERMINATE"
    }
```

</TabItem>
</Tabs>

<details><summary>Complete Example</summary>
<p>
Suppose in a workflow; we have to make a decision to ship the courier with the shipping service providers based on input provided while running the workflow. If the input provided while running the workflow does not match with the available shipping providers, then the workflow will fail and return. If the input provided matches, then it goes ahead.
<br/>
Here is a snippet that shows the default switch case terminating the workflow:

```json
    {
      "name": "switch_task",
      "taskReferenceName": "switch_task",
      "type": "SWITCH",
      "defaultCase": [
        {
          "name": "terminate",
          "taskReferenceName": "terminate",
          "type": "TERMINATE",
          "inputParameters": {
            "terminationStatus": "FAILED",
            "terminationReason": "Shipping provider not found."
          }
        }
      ]
    }
```

Workflow gets created as shown in the diagram.

<p align="center"><img src="/content/img/terminate-example.png" alt="Terminate Example" width="90%" height="auto"></img></p>

</p>
</details>