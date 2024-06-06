---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow 

The "Terminate Workflow" task allows for the termination of other workflows using their workflow IDs. It allows users to terminate single or multiple workflows with optional parameters for specifying termination reasons and triggering failure workflows.

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
| workflowId        | Specifies the workflow ID(s) of the workflows to be terminated. It can be a single ID or an array of IDs. It can also be [passed as a parameter](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).                                                                |
| terminationReason | PProvide a reason for terminating the workflows, aiding in understanding the context of the termination. It can be [passed as a parameter](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).    |
| triggerFailureWorkflow | When set to ‘true’, triggers the failure workflow associated with the workflow to be terminated.  Enabling this option means that the failure workflow of the terminated workflow will be triggered. | 

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

To demonstrate the terminate workflow task, consider the following sample workflow. This example shows how to configure a workflow that terminates another running workflow.

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

Upon running the workflow, the workflow with the specified ID “289cf124-2240-11ef-8b99-ae209b03ac3f” will be terminated.

<p align="center"><img src="/content/img/terminate-workflow.png" alt="Terminate Workflow - Successful execution" width="90%" height="auto"></img></p>

To verify this, navigate to **Executions > Workflow** and search using the terminated workflow ID.

<p align="center"><img src="/content/img/verifying-terminated-workflow.png" alt="Verifying the terminated workflow from executions" width="90%" height="auto"></img></p>

Click on the workflow ID to view the execution. 

<p align="center"><img src="/content/img/terminated-workflow.png" alt="View of the terminated workflow" width="90%" height="auto"></img></p>

You can also view the reason for the termination we provided (in the terminate workflow task) here.

</p>
</details>

<details><summary>Sample Workflow - With “Trigger Failure Workflow” Enabled</summary>
<p>

Suppose the following workflow is to be terminated, which has a failure workflow set.

<p align="center"><img src="/content/img/workflow-to-be-terminated.png" alt="Workflow to be terminated" width="90%" height="auto"></img></p>

The workflow JSON is as follows:

```json
{
 "name": "test-workflow",
 "description": "test",
 "version": 1,
 "tasks": [
   {
     "name": "simple",
     "taskReferenceName": "simple_ref",
     "inputParameters": {},
     "type": "SIMPLE"
   }
 ],
 "failureWorkflow": "failure",
 "schemaVersion": 2,
 "ownerEmail": "devrel@orkes.io"
}
```

Now, let’s run the workflow and obtain its workflow ID.

<p align="center"><img src="/content/img/workflow-id-of-workflow-to-be-terminated.png" alt="Getting the workflow ID of the workflow to be terminated" width="90%" height="auto"></img></p>

As the above image shows, the workflow ID is `8c14384c-2400-11ef-ad70-52278f6d0e42`. 

Next, create a workflow to terminate the above running workflow.

<p align="center"><img src="/content/img/terminate-workflow-sample.png" alt="Main workflow with terminate workflow task" width="40%" height="auto"></img></p>

The JSON for the workflow is as follows:

```json
{
 "name": "terminate-workflow-demo",
 "description": "Sample workflow",
 "version": 1,
 "tasks": [
   {
     "name": "TW",
     "taskReferenceName": "TW_ref",
     "inputParameters": {
       "workflowId": [
         "8c14384c-2400-11ef-ad70-52278f6d0e42"
       ],
       "terminationReason": "Workflow is terminated.",
       "triggerFailureWorkflow": true
     },
     "type": "TERMINATE_WORKFLOW"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "devrel@orkes.io"
}
```

Let’s look at the input parameters for the terminate workflow task:

```json
 {
     "name": "TW",
     "taskReferenceName": "TW_ref",
     "inputParameters": {
       "workflowId": [
         "8c14384c-2400-11ef-ad70-52278f6d0e42"
       ],
       "terminationReason": "Workflow is terminated.",
       "triggerFailureWorkflow": true
     },
     "type": "TERMINATE_WORKFLOW"
   }
```

- workflowId - The above running workflow’s workflowId is provided as an input parameter, with a termination reason.
- The option to trigger failure workflow is enabled.

Now, let’s run this workflow.

<p align="center"><img src="/content/img/running-terminate-workflow-demo.png" alt="Running terminate workflow demo" width="100%" height="auto"></img></p>

Upon completion, the workflow with the ID `8c14384c-2400-11ef-ad70-52278f6d0e42` will be terminated.

Let’s look at the execution of the terminated workflow:

1. Navigate to **Executions > Workflow**.
2. Search using the workflow ID.

<p align="center"><img src="/content/img/terminated-workflow-execution.png" alt="Execution of the terminated workflow" width="100%" height="auto"></img></p>

The warning at the top gives the termination reason specified in the workflow. You can also see that the failure workflow is triggered.

Click “Triggered failure workflow” (indicated in the above image) to view the failure workflow’s execution.

<p align="center"><img src="/content/img/failure-workflow-triggered.png" alt="Triggered failure workflow" width="40%" height="auto"></img></p>

</p>
</details>