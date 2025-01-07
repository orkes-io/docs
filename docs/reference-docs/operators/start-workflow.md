---
sidebar_position: 12
slug: "/reference-docs/operators/start-workflow"
description: "The Start Workflow task is used to start another workflow from the current workflow."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Workflow

The Start Workflow task starts another workflow from the current workflow. Unlike the [Sub Workflow](./sub-workflow) task, the workflow triggered by the Start Workflow task will execute asynchronously. That means the current workflow proceeds to its next task without waiting for the started workflow to complete.

A Start Workflow task is considered successful when the requested workflow enters the RUNNING state, regardless of its final status.


## Task parameters
Configure these parameters for the Start Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParameters. **startWorkflow** | A map that includes the requested workflow’s configuration, such as the name and version. | Required. |
| inputParameters. startWorkflow. **name**    | The name of the workflow to be executed. This workflow should have a pre-existing definition in Conductor. | Required. |
| inputParameters. startWorkflow. **version**     | The version of the workflow to be executed. If unspecified, the latest version will be used. | Optional. |
| inputParameters. startWorkflow. **correlationId**     | A unique identifier for the workflow execution, used to correlate the current workflow instance with other workflows. | Optional. |
| inputParameters. startWorkflow. **idempotencyKey**     | A unique, user-generated key to prevent duplicate workflow executions. Idempotency data is retained for the life of the workflow execution. | Optional. |
| inputParameters. startWorkflow. **idempotencyStrategy**     | The idempotency strategy for handling duplicate requests. Supported values:<ul><li>`RETURN_EXISTING`—Return the `workflowId` of the workflow instance with the same idempotency key.</li> <li>`FAIL`—Start a new workflow instance only if there are no workflow executions with the same idempotency key.</li> <li>`FAIL_ON_RUNNING`—Start a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Completed workflows can run again.</li></ul> | Required if `idempotencyKey` is used. |

In addition, you can also configure the requested workflow’s input in `inputParameters.startWorkflow.input`, which will be passed to the invoked workflow.

## Task configuration
This is the task configuration for a Start Workflow task.​

```json
{
  "name": "start_workflow",
  "taskReferenceName": "start_workflow_ref",
  "inputParameters": {
    "startWorkflow": {
      "name": "someName",
      "input": {
        "someParameter": "someValue",
        "anotherParameter": "anotherValue"
      },
      "version": "",
      "idempotencyKey": "",
      "idempotencyStrategy": "RETURN_EXISTING",
      "correlationId":
    }
  },
  "type": "START_WORKFLOW"
}
```

## Task output
The Start Workflow task will return the following parameters.

| Parameter  | Description                              |
| ---------- | ---------------------------------------- |
| workflowId | The workflow ID of the started workflow execution. |

:::note
The Start Workflow task will not return the output of the started workflow.
:::

## Adding a Start Workflow task in UI
**To add a Start Workflow task:**
1. In your workflow, select the **(+)** icon and add a Start Workflow task.
2. Enter the **Workflow name** and **Version**. If the version is unspecified, the latest version will be used.
  Once selected, the workflow’s input parameters will automatically appear if there are any pre-defined ones.
3. (Optional) Enter the **Correlation id**.
4. (Optional) Enter the **Idempotency key** and select the **Idempotency strategy**.
5. (Optional) Add any additional input parameters for the workflow.

<p><img src="/content/img/Task-References/start_workflow_task_reference.png" alt="Screenshot of Start Workflow Task in Orkes Conductor"/></p>


## Examples
Here are some examples for using the Start Workflow task.

<details><summary>Using the Start Workflow task in a workflow</summary>
<p>
To demonstrate the Start Workflow task, consider the following sample workflow. This example shows how to configure a workflow that starts another workflow.

```json
// workflow definition

{
  "name": "sample_start_workflow",
  "description": "Sample Workflow to start a new workflow.",
  "tasks": [
    {
      "name": "start",
      "taskReferenceName": "start_ref",
      "inputParameters": {
        "startWorkflow": {
          "name": "your_workflow_name_to_be_started",
          "version": 3,
          "input": {}
        }
      },
      "type": "START_WORKFLOW"
    }
  ]
}
```

In the Start Workflow task, the input parameters are defined as:

```json
"inputParameters": {
  "startWorkflow": {
    "name": "your_workflow_name_to_be_started",
    "version": 3
  }
},
```

This will start a workflow named “your_workflow_name_to_be_started”, with version 3.

The output shows the generated workflow ID of the started workflow.

```json
// task output

{
  "workflowId": "8ca4184e-6a52-11ed-aaf5-f62716e2ae41"
}
```

To find the newly started workflow execution, go to **Executions** > **Workflow** and search for the workflow containing the Start Workflow task. Select the workflow to view the execution and select the Start Workflow task. The task details Summary tab contains newly-started workflow ID.

<p align="center"><img src="/content/img/start-workflow-output-in-conductor.png" alt="Completed start workflow type" width="100%" height="auto" /></p>

Even if the started workflow is not completed, the main workflow will run to completion.
</p>
</details>