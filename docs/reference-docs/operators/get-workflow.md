---
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Workflow 

The Get Workflow task retrieves the details of a workflow execution using its workflow ID. 

:::note
You can get the workflow details only if you have at least read permission for the workflow. Otherwise, the workflow will fail with an error message like this:
<p align="center"><img src="/content/img/error-no-access.png" alt="Error message on having no access to workflow execution" width="80%" height="auto" /></p>
:::

## Task parameters

Configure these parameters for the Get Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParameters. **id** | The workflow ID of the workflow to be retrieved. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. |
| inputParameters. **includeTasks** | Whether to retrieve the task details or not. The default value is false. | Required. |


## Task configuration

This is the task configuration for a Get Workflow task.


```json
{
  "name": "get_workflow",
  "taskReferenceName": "get_workflow_ref",
  "inputParameters": {
    "id": "e27cf59c-0851-11ef-9a82-c62f15439f28",
    "includeTasks": true
  },
  "type": "GET_WORKFLOW"
}
```

## Task output
The Get Workflow task will return all the details of the retrieved workflow. View an example [here](https://play.orkes.io/execution/35d05a0f-0856-11ef-84f1-2e15deb1615b?tab=workflowInputOutput).

## Adding a Get Workflow task in UI
**To add a Get Workflow task:**
1. In your workflow, select the **(+)** icon and add a **Get Workflow** task.
2. Enter the **Workflow ID**.
3. (Optional) Check **Include tasks** if needed.
