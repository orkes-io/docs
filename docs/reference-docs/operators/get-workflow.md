---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow 

Get workflow is an operator task that retrieves the workflow execution details using the workflow ID.

## Definitions

```json
   {
     "name": "get_workflow",
     "taskReferenceName": "get_workflow_ref",
     "inputParameters": {
       "id": "e27cf59c-0851-11ef-9a82-c62f15439f28",
       "includeTasks": true
     },
     "type": "GET_WORKFLOW",
   }
```

### Input Parameters

| Parameter | Description |
| --------- | ----------- |
| id | Provide the workflow ID of the workflow. You can also pass this [parameter as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |
| includeTasks | Set this to true or false, depending on whether to retrieve the task details or not. |

:::note
You can get the workflow details only if you have at least read permission to the workflow. Otherwise, the workflow fails with an error message like this:
<p align="center"><img src="/content/img/error-no-access.png" alt="Error message on having no access to workflow execution" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>
:::

### Output Parameters

The workflow output gives all the details of the retrieved workflow. View an example [here](https://play.orkes.io/execution/35d05a0f-0856-11ef-84f1-2e15deb1615b?tab=workflowInputOutput).

## Examples

<Tabs>
<TabItem value="UI" label="UI">


<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Get Workflow`.
2. Provide the workflow ID.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/get-workflow-ui-task.png" alt="Get workflow task from UI" width="560" height="auto"/></p>

</div>
</div>
</div>

</TabItem>
<TabItem value="JSON" label="JSON">

```json
  {
     "name": "get_workflow",
     "taskReferenceName": "get_workflow_ref",
     "inputParameters": {
       "id": "e27cf59c-0851-11ef-9a82-c62f15439f28",
       "includeTasks": true
     },
     "type": "GET_WORKFLOW",
  }
```

</TabItem>
</Tabs>