---
title: "Get Workflow"
description: "Learn how the Get Workflow task retrieves details of a workflow execution using its workflow ID in Orkes Conductor."
canonical_route: "reference-docs/operators/get-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Get Workflow, Get Workflow task"
---

# Get Workflow 

The Get Workflow task retrieves the details of a workflow execution using its workflow ID. 

!!! note
    You can get the workflow details only if you have at least read permission for the workflow. Otherwise, the workflow will fail with an error message:
    <p align="center"><img src="/content/img/error-no-access.png" alt="Error message on having no access to workflow execution" width="80%" height="auto" /></p>

## Task parameters

Configure these parameters for the Get Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParameters. **id** | The workflow ID of the workflow to be retrieved. It can be [passed as a dynamic variable](/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. |
| inputParameters. **includeTasks** | Whether to retrieve the task details or not. The default value is `false`. | Optional. |

The following are generic configuration parameters that can be applied to the task and are not specific to the Get Workflow task.

<details>
<summary>Other generic parameters</summary>

Here are other parameters for configuring the task behavior.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| optional | Whether the task is optional. <br/><br/>If set to`true`, any task failure is ignored, and the workflow continues with the task status updated to `COMPLETED_WITH_ERRORS`. However, the task must reach a terminal state. If the task remains incomplete, the workflow waits until it reaches a terminal state before proceeding. | Optional. | 

</details>

## Task configuration

This is the task configuration for a Get Workflow task.


```json
{
  "name": "get_workflow",
  "taskReferenceName": "get_workflow_ref",
  "inputParameters": {
    "id": "<WORKFLOW-ID>",
    "includeTasks": true
  },
  "type": "GET_WORKFLOW"
}
```

## Task output

The Get Workflow task returns the execution details of the workflow identified by the specified workflow ID, including task execution details when **Include tasks** is enabled.

## Examples

Here are some examples for using the Get Workflow task.

<details>
<summary>Using the Get Workflow task in a workflow</summary>
<p>

The following example demonstrates how to configure a workflow that retrieves the details of another workflow execution.

**To create a workflow:**

1. Go to **Definitions** > **Workflow**, from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In the **Code** tab, paste the following workflow definition:

```json
{
 "name": "GetWorkflowDemo",
 "description": "Sample Workflow",
 "version": 1,
 "tasks": [
   {
     "name": "get_workflow",
     "taskReferenceName": "get_workflow_ref",
     "inputParameters": {
       "id": "${workflow.input.workflowId}",
       "includeTasks": true
     },
     "type": "GET_WORKFLOW"
   }
 ],
 "inputParameters": [
   "workflowId"
 ],
 "schemaVersion": 2
}
```

4. Select **Save** > **Confirm**.

**To run the workflow:**

1. Go to the **Run** tab, and enter the **Input params**. For example:

```json
{
 "workflowId": "8440b876-e7c5-11f0-a0ca-c60c4ebc4813"// Replace with your workflow ID
}
```

2. Select **Execute**.

Once the workflow starts, the Get Workflow task retrieves the details of the specified workflow execution.

To verify the result, select the **Get Workflow** task in the execution view and open the **Output** tab. The output contains the workflow execution details for the provided workflow ID.

If **Include tasks** is set to true, the output also includes the list of tasks associated with the workflow execution. If set to false, only workflow-level metadata is returned.

<p><img src="/content/img/get-workflow-output.png" alt="Output of the Get Workflow task"/></p>

This allows you to inspect the current state, status, and execution details of an existing workflow from within another workflow.

</p>
</details>

## Related pages

- [Operators](/content/category/reference-docs/operators)
- [Switch](/content/reference-docs/operators/switch)
- [Do While](/content/reference-docs/operators/do-while)
- [Wait](/content/reference-docs/operators/wait)
- [Dynamic](/content/reference-docs/operators/dynamic)
- [Set Variable](/content/reference-docs/operators/set-variable)
