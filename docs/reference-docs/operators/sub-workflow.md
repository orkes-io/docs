---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sub Workflow

Sub Workflow allows executing another workflow from within the current workflow. 

## Definitions

```json
    {
      "name": "sub_workflow",
      "taskReferenceName": "sub_workflow_task_ref",
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "sub-workflow-name",
        "version": 1
      }
    }
```

:::tip
* The Do-While task does not allow nested Do-While tasks. But it does permit a sub-workflow that can have a Do-While loop inside it.
* Dynamic Forks can only contain one task. But using the sub-workflow concept, this single task can be a sub-workflow that includes additional tasks.
:::

### Input Parameters

| Attribute        | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subWorkflowParam | It includes the parameters name, version, & taskToDomain. <ul><li>**name** - You need to map this field with the name of the workflow you are planning to execute.</li><li>**version** - Include the version of the workflow to be executed.</li><li>**[taskToDomain](/content/developer-guides/task-to-domain)** - Allows scheduling the sub-workflow tasks per given mappings.</li></ul>                                |
| inputParameters  | The sub-workflow’s input can be coupled to the workflow’s input parameters, or it can be invoked from the output of the preceding task. For example, if you are taking the sub-workflow’s input parameter from the workflow, then you need to initially add this as an input parameter in the parent workflow (workflow to be called as the sub-workflow). Then you can call the same input parameter inside the sub-workflow definition. |

### Output Parameters

| Attribute     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| subWorkflowId | Subworkflow execution ID generated when running the sub-workflow. |

The output of the sub-workflow is also supplied to the output of the workflow.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Sub Workflow`.
2. Select the workflow and version.
3. Add input parameters.
4. Add task to domain if applicable.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-subworkflow-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "sub_workflow_task_example",
      "taskReferenceName": "sub_workflow_task_example_ref_1",
      "inputParameters": {
        "workflowInput": "${workflow.input.sampleInput}"
      },
      "type": "SUB_WORKFLOW",
      "subWorkflowParam": {
        "name": "wait-task-example",
        "tasksToDomain": {
          "*": "mydomain"
        }
      }
    }
```

</TabItem>
</Tabs>

<details><summary>Complete Example</summary>
<p>

Let’s say you have a very long workflow, **“payment_for_subscription”**, which handles the payment for subscriptions as shown below:

<p align="center"><img src="/content/img/payment-sub-workflow-example.jpg" alt="Payment sub workflow" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

If you want to add this workflow to another workflow, copying the list of tasks to the required workflow would be possible. However, whenever this workflow is updated, it won’t be reflected in the workflow where you have added this. A better way to handle this is to call this workflow as a sub-workflow in your original workflow so that any updates to this workflow get reflected in all the workflows where it is called.

So, you can add this as a sub-workflow in your required workflow whenever a payment flow is to be implemented:

<p align="center"><img src="/content/img/payment-sub-workflow-in-main-workflow.png" alt="Payment workflow as sub-workflow in a subscription flow" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This is a subscription workflow with multiple instances where payment flow is to be implemented. Here the previously created payment workflow is added as sub-workflows.

The above image is a simplified version of the subscription workflow. You can view the entire version in Playground here.

| [View in Orkes Playground](https://play.orkes.io/workflowDef/Subscription/) |
|--------------------------------------------------------------------------------------------------|

</p>
</details>