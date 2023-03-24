import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sub Workflow

```json
"type" : "SUB_WORKFLOW"
```

## Configurations

```json
    {
     "name": "sub_workflow",
     "taskReferenceName": "sub_workflow_task_ref",
     "type": "SUB_WORKFLOW",
     "subWorkflowParam": {
       "name": "sub-workflow-name",
       "version": 11
     }
   }
```
:::note
* The Do-While task does not allow nested Do-While tasks. But it does permit a sub-workflow that can have a Do-While loop inside it.
* Dynamic Forks can only contain one task. But using the sub-workflow concept, this single task can be a sub-workflow that includes additional tasks.
:::

### Input Parameters

|Attribute|Description|
|---|---|
| subWorkflowParam | It includes the parameters name, version, & taskToDomain. <ul><li>**name** - You need to map this field with the name of the workflow you are planning to execute.</li><li>**version** - Include the version of the workflow to be executed.</li><li>**[taskToDomain](https://orkes.io/content/docs/how-tos/Tasks/task-domains)** - Allows scheduling the sub-workflow tasks per given mappings.</li></ul>|
| inputParameters | The sub-workflow’s input can be coupled to the workflow’s input parameters, or it can be invoked from the output of the preceding task. For example, if you are taking the sub-workflow’s input parameter from the workflow, then you need to initially add this as an input parameter in the parent workflow (workflow to be called as the sub-workflow). Then you can call the same input parameter inside the sub-workflow definition. |

### Output Parameters

|Attribute|Description|
|---|---|
| subWorkflowId | Subworkflow execution ID generated when running the sub-workflow. | 

The output of the sub-workflow is also supplied to the output of the workflow.

## Examples​

<Tabs>
<TabItem value="JSON" label="JSON">

```json
    {
     "name": "sub_workflow_task",
     "taskReferenceName": "sub_workflow_ref",
     "inputParameters": {},
     "type": "SUB_WORKFLOW",
     "subWorkflowParam": {
       "name": "sub-workflow-name",
       "version": 11
     }
   }
```
</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
<TabItem value="Javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Address Verification Workflow</summary>
<p>
Imagine that you have created an address verification workflow:

<p align="center"><img src="/content/img/postage_rate_workflow.png" alt="example workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

If you wanted to add this functionality to another workflow, it would be possible to copy all 201 lines of JSON and insert them into your workflow. However, any updates made by your colleague will not be reflected in your workflow, i.e., you have a "frozen in time" version of the code.
Instead, you can call the existing workflow as a SUB_WORKFLOW task.

```json
{
     "name": "postage_rate_subworkflow",
     "taskReferenceName": "postage_rate_subworkflow_ref",
     "inputParameters": {},
     "type": "SUB_WORKFLOW",
     "decisionCases": {},
     "defaultCase": [],
     "forkTasks": [],
     "startDelay": 0,
     "subWorkflowParam": {
       "name": "shipping_rate",
       "version": 1
     },
   }

```

<p align="center"><img src="/content/img/subworkflow_in_action.png" alt="example workflow with subworkflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This makes your workflow more readable, with easier-to-edit JSON, and will update with the **postage_rate** workflow.
</p>
</details>