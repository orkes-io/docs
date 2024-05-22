---
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow 

The Terminate Workflow task is used to terminate other workflows using their workflow IDs.

## Definitions

```json
    {
      "name": "terminate_workflow_task",
      "taskReferenceName": "terminate_workflow_task_ref",
      "inputParameters": {
        "workflowId": "someWorkflowID", // Single workflow id or an array of workflow ids
        "terminationReason": "a termination reason"
      },
      "type": "TERMINATE_WORKFLOW"
    }
```

### Input Parameters

| Attribute         | Description                                                                                                             |
| ----------------- |-------------------------------------------------------------------------------------------------------------------------|
| workflowId        | Provide the workflow IDs of the workflow to be executed.                                                                |
| terminationReason | Provide the reason for the workflows being terminated. It helps in adding context about why the workflow is terminated. |

### Output Parameters

| Attribute           | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| terminatedWorkflows | Includes the set of workflow IDs corresponding to the workflows that were terminated. |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Terminate Workflow`.
2. Add the parameter for workflow IDs to terminate.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-terminate-workflows-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "terminate-workflows-example",
      "taskReferenceName": "terminate-workflows-example-ref-1",
      "inputParameters": {
        "workflowId": "${workflow.input.workflowIdToTerminate}",
        "terminationReason": "This is a test"
      },
      "type": "TERMINATE_WORKFLOW"
    }
```

</TabItem>
</Tabs>

<details><summary>Complete Example</summary>
<p>

Suppose another running workflow is to be terminated; we can create a workflow with the workflow IDs to be terminated.

A sample workflow may look like this:
```json
    {
  "name": "terminate_workflow",
  "description": "Edit or extend this sample workflow. Set the workflow name to get started",
  "version": 1,
  "tasks": [
    {
      "name": "terminate_hello_world",
      "taskReferenceName": "terminate_hello_world",
      "inputParameters": {
        "workflowId": "a8776d48-7ec9-11ee-8f81-26c6bd51258d"
      },
      "type": "TERMINATE_WORKFLOW"
    }
  ],
  "ownerEmail": "riza.farheen@orkes.io"
}
```
If we run this workflow, the workflow with the mentioned workflowId gets terminated, and we can get the terminatedWorkflowIds from the execution page.

<p align="center"><img src="/content/img/terminate-workflow.png" alt="Terminate Workflow - Successful execution" width="90%" height="auto"></img></p>

We can copy and paste this ID into the workflow execution URL to view the terminated workflow.

<p align="center"><img src="/content/img/terminated-workflow.png" alt="View of the terminated workflow" width="90%" height="auto"></img></p>

A warning message is displayed indicating that the workflow was terminated.

</p>
</details>