---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow 

The “Terminate Workflow” task terminates other workflows using their workflow IDs.

## Definitions

```json
{
     "name": "TW",
     "taskReferenceName": "TW_ref",
     "inputParameters": {
       "workflowId": [
         "someWorkflowID", // Single workflow id or an array of workflow ids
       ],
       "terminationReason": "your-termination-reason"
     },
     "triggerFailureWorkflow": true,
     "type": "TERMINATE_WORKFLOW"
   }
```

### Input Parameters

| Attribute         | Description                                                                                                             |
| ----------------- |-------------------------------------------------------------------------------------------------------------------------|
| workflowId        | Provide the workflow IDs of the workflows to be executed. It can be [passed as a parameter](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).                                                                |
| terminationReason | Provide the reason for the workflows being terminated, which can help add context about why the workflow is terminated. It can be [passed as a parameter](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).    |
| triggerFailureWorkflow | Set this to **true** to trigger the failure workflow when the terminate workflow is called. Setting this to **false** will trigger the failure workflow only when the main workflow fails. | 

### Output Parameters

| Attribute           | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| terminatedWorkflows | Returns the set of workflow IDs corresponding to the terminated workflows. |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add the task type **Terminate Workflow**.
2. Add the workflow IDs to terminate the workflows along with the termination reason.
3. Optionally, enable the “Trigger Failure Workflow” option if required. 

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-terminate-workflows-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
   {
     "name": "TW",
     "taskReferenceName": "TW_ref",
     "inputParameters": {
       "workflowId": [
         "487f44f2-21a7-11ef-8b99-ae209b03ac3f"
       ],
       "terminationReason": "Provide the workflow termination reason"
     },
     "triggerFailureWorkflow": true,
     "type": "TERMINATE_WORKFLOW"
   }
```

</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
<p>

Suppose you want to terminate another running workflow using the terminate workflow task.

A sample workflow look like this:

```json
{
 "name": "terminate-workflow-sample-workflow",
 "description": "Sample workflow to demonstrate terminate workflow task",
 "version": 1,
 "tasks": [
   {
     "name": "TW",
     "taskReferenceName": "TW_ref",
     "inputParameters": {
       "workflowId": [
         "289cf124-2240-11ef-8b99-ae209b03ac3f"
       ],
       "terminationReason": "The workflow is terminated due to xxxxxxxxxxx."
     },
     "type": "TERMINATE_WORKFLOW"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "devrel@orkes.io"
}
```

On running the workflow, the workflow with the mentioned workflow ID “289cf124-2240-11ef-8b99-ae209b03ac3f” gets terminated. You can confirm the workflow execution and get the terminated workflow IDs from the workflow's output.

<p align="center"><img src="/content/img/terminate-workflow.png" alt="Terminate Workflow - Successful execution" width="90%" height="auto"></img></p>

To verify this, navigate to **Executions > Workflow** and search using the terminated workflow ID.

<p align="center"><img src="/content/img/verifying-terminated-workflow.png" alt="Verifying the terminated workflow from executions" width="90%" height="auto"></img></p>

Click on the workflow ID to view the execution. 

<p align="center"><img src="/content/img/terminated-workflow.png" alt="View of the terminated workflow" width="90%" height="auto"></img></p>

You can also view the reason for the termination we provided (in the terminate workflow task) here.

</p>
</details>