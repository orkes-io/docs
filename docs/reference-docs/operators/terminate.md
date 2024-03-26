---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate 

A task that can terminate the current workflow with a termination status and reason.

## Definitions

```json
{
     "name": "terminate",
     "taskReferenceName": "terminate_ref",
     "inputParameters": {
       "terminationStatus": "TERMINATED",
       "workflowOutput": {
         "key": "value"
       },
       "terminationReason": "${workflow.input.termination-reason}"
     },
     "type": "TERMINATE"
   }
```

### Input Parameters

| Attribute         | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| terminationStatus | Choose the termination status while terminating the workflow. It can take values **COMPLETED**, **FAILED**, or **TERMINATED**. |
| terminationReason | Provide a reason to give a clear understanding of the termination status. The termination reason can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).                          |
| workflowOutput    | Provide the expected workflow output on termination. It can be a string, number, boolean, null or object/array.                                                               |

:::tip
The Terminate task can modify the workflow's output with a given parameter and act as a return statement for conditions where you want to terminate your workflow.
:::

### Output Parameters

| Attribute | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| output    | Returns the workflow output from the defined input parameter. If *workflowOutput* is not set, it returns an empty object. |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Terminate**.
2. Choose the termination status and provide a termination reason.
3. Optionally set the workflow output.

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
     "name": "terminate",
     "taskReferenceName": "terminate_ref",
     "inputParameters": {
       "terminationStatus": "TERMINATED",
       "workflowOutput": {
         "key": "value"
       },
       "terminationReason": "${workflow.input.termination-reason}"
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