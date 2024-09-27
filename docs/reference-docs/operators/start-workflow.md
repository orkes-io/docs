---
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start Workflow

The Start Workflow task starts another workflow in the current workflow. Unlike the [Sub Workflow](./sub-workflow) task, the workflow started by the Start Workflow task is decoupled from the current workflow. That means the current workflow proceeds to the next task without waiting for the started workflow to complete.

A Start Workflow task is considered successful when the requested workflow begins or, more precisely, when the requested workflow is in the RUNNING state.

## Task configuration
Configure these parameters for the Start Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParameters. **startWorkflow** | A map that includes the requested workflow’s configuration, such as the name and version. | Required. |
| inputParameters. startWorkflow. **name**    | The name of the workflow to be executed. This workflow should have a pre-existing definition in Conductor. | Required. |
| inputParameters. startWorkflow. **version**     | The version of the workflow to be executed. If unspecified, the latest version will be used. | Optional. |
| inputParameters. startWorkflow. **correlationId**     | The correlation ID to correlate your workflow instance with another running workflow instance. | Optional. |
| inputParameters. startWorkflow. **idempotencyKey**     | A user-generated key to avoid duplicating transactions across workflow executions. Idempotency data is retained for the life of the workflow execution. | Optional. |
| inputParameters. startWorkflow. **idempotencyStrategy**     | The strategy to use when a duplicate execution is already running. Supported values:<ul><li>`RETURN_EXISTING`—The request will not fail. Instead it will return the workflowId of the workflow which was triggered with the same idempotencyKey.</li><li>`FAIL`—The request will fail if the workflow has been triggered with the same idempotencyKey in the past.</li></ul> | Required if there is an idempotencyKey specified. |

In addition, you can also configure the requested workflow’s input in `inputParameters.startWorkflow.input`, which will be passed to the invoked workflow.

## Task definition
This is the JSON schema for a Start Workflow task definition.​

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

<p><img src="/content/img/Task-References/start_workflow_task_reference.png" alt="Screenshot of Start Workflow Task in Orkes Platform"/></p>


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