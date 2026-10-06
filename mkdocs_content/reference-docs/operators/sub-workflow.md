---
title: "Sub Workflow"
description: "Learn how the Sub Workflow task runs another workflow as part of the current workflow execution in Orkes Conductor."
canonical_route: "reference-docs/operators/sub-workflow"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Sub Workflow, Sub Workflow task"
---

# Sub Workflow

The Sub Workflow task executes another workflow within the current workflow. This allows you to reuse common workflows across multiple workflows. Unlike the [Start Workflow](/content/reference-docs/operators/start-workflow) task, the Sub Workflow task executes synchronously, meaning the parent workflow waits until the sub-workflow completes.

The Sub Workflow task can also be used to overcome the limitations of other tasks:

- Use it in a [Do While](/content/reference-docs/operators/do-while) task to achieve nested Do While loops.
- Use it in a [Dynamic Fork](/content/reference-docs/operators/dynamic-fork) task to execute more than one task in each fork.

## Task parameters

Configure these parameters for the Sub Workflow task.

| Parameter                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Required/ Optional                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| subWorkflowParam                          | A map that includes the sub-workflow’s configuration, such as the name, version, task-to-domain mapping, idempotency key, and priority.                                                                                                                                                                                                                                                                                                                                                          | Required.                             |
| subWorkflowParam. **name**                | The name of the workflow to be executed. This workflow should have a pre-existing definition in Conductor.                                                                                                                                                                                                                                                                                                                                                                                       | Required.                             |
| subWorkflowParam. **version**             | The version of the workflow to be executed. If unspecified or set to 0, the latest version will be used.                                                                                                                                                                                                                                                                                                                                                                                         | Required.                             |
| subWorkflowParam. **workflowDefinition** <br/><br/><span class="table-note"><strong>Available since:</strong> v5.2.21 and later</span>| If the workflow doesn’t have a pre-existing definition in Conductor, enter the definition of the workflow to execute as the sub-workflow.<br/><br/> You can [pass it as a variable string](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) (from workflow input, variables, etc) or as an object or array. The passed workflow definition executes, but isn’t saved on the **Workflow** > **Definitions** page. For example, see [Using the `workflowDefinition` parameter in a Sub Workflow task](/content/reference-docs/operators/sub-workflow#examples). | Optional. | 
| subWorkflowParam. **taskToDomain**        | A map of sub-workflow tasks to specific domains. The keys are the task reference names and the values are the domain names. If unspecified, the taskToDomain of the executing parent workflow will take over.                       | Optional.                             |
| subWorkflowParam. **priority**            | The priority of the subworkflow. Supports values from 0-99 and can be [passed as a dynamic variable](/content/developer-guides/passing-inputs-to-task-in-conductor).<br/>If set, this **priority** overrides the parent workflow’s **priority**. If not, it inherits the parent workflow’s **priority**.                                                                                                                                                                                 | Optional.                             |
| subWorkflowParam. **idempotencyKey**      | A unique, user-generated key to prevent duplicate workflow executions. Idempotency data is retained for the life of the workflow execution.                                                                                                                                                                                                                                                                                                                                                      | Optional.                             |
| subWorkflowParam. **idempotencyStrategy** | The idempotency strategy for handling duplicate requests. Supported values:<ul><li>`RETURN_EXISTING`—Return the `workflowId` of the workflow instance with the same idempotency key.</li> <li>`FAIL`—Start a new workflow instance only if there are no workflow executions with the same idempotency key.</li> <li>`FAIL_ON_RUNNING`—Start a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Completed workflows can run again.</li></ul> | Required if `idempotencyKey` is used. |
| **inputParameters**                        | Defines the input parameters for the sub-workflow. Inputs can reference parent workflow input parameters or outputs from preceding tasks and are passed directly to the invoked sub-workflow. | Optional. |

!!! note "Notes"
    
    - If you are defining the sub-workflow’s input parameters from the parent workflow, you need to add them as an input parameter in the parent workflow and then call the same input parameters inside the sub-workflow definition.
    - If an idempotency strategy is configured in the sub-workflow task configuration and no idempotency key is provided, the sub-workflow task will automatically inherit the idempotency key from its parent workflow.
    - To retry a sub-workflow from a specific task, call the [rerun workflow API](https://orkes.io/content/reference-docs/api/workflow/rerun-workflow) for the sub-workflow execution ID and set `reRunFromTaskId` to the task execution ID. For example:
    ```json
     curl -X POST 'https://<YOUR-CONDUCTOR-CLUSTER>/api/workflow/<SUBWORKFLOW-EXECUTION-ID>/rerun' \
       -H 'Content-Type: application/json' \
       -d '{
        "reRunFromTaskId": "<TASK-EXECUTION-ID>"
      }' \
       -H 'x-authorization: <TOKEN>'
    ```

The following are generic configuration parameters that can be applied to the task and are not specific to the Sub Workflow task.

<details>
<summary>Other generic parameters</summary>

Here are other parameters for configuring the task behavior.

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| optional | Whether the task is optional. <br/><br/>If set to`true`, any task failure is ignored, and the workflow continues with the task status updated to `COMPLETED_WITH_ERRORS`. However, the task must reach a terminal state. If the task remains incomplete, the workflow waits until it reaches a terminal state before proceeding. | Optional. | 

</details>

## Task configuration

This is the task configuration for a Sub Workflow task.

```json
{
     "name": "sub_workflow",
     "taskReferenceName": "sub_workflow_ref",
     "inputParameters": {
       "someKey": "someValue"
     },
     "type": "SUB_WORKFLOW",
     "subWorkflowParam": {
       "name": "<SUB-WORKFLOW-NAME>",
       "version": 3,
       "priority": 5,
       "idempotencyKey": "someKey",
       "idempotencyStrategy": "RETURN_EXISTING",
       "taskToDomain": {
         "someTask": "someDomain"
       }
     }
}
```

## Task output

The Sub Workflow task will return the following parameters.

| Parameter     | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| subWorkflowId | The execution ID of the sub-workflow.                                          |

In addition to the execution ID, the output of the sub-workflow itself is also included in the Sub Workflow task output.

## Examples

Here are some examples for using the Sub Workflow task.

<details>
<summary>Using the Sub Workflow task in a workflow</summary>
<p>

This example demonstrates how to reuse a payment workflow within a larger subscription workflow by utilizing a Sub Workflow task.

Assume you have an existing workflow named `payment_for_subscription` that contains the payment logic for subscriptions. This workflow is relatively long and is used in multiple places.

Instead of copying the payment logic into every workflow that requires it, you can invoke it as a sub-workflow. This ensures that any updates to the payment workflow are automatically reflected wherever it is used.

In the subscription renewal workflow, the payment workflow is added as a Sub Workflow task. When the subscription renewal workflow runs, it executes the sub-workflow synchronously and waits for it to complete before continuing.

This approach enhances maintainability by centralizing payment logic within a single workflow across the organization.

</p>
</details>

<details>
<summary>Using the `workflowDefinition parameter`in a Sub Workflow task</summary>
<p>

This example demonstrates how to dynamically execute a workflow definition passed as an input, without requiring it to be registered on the **Workflow** > **Definitions** page.

In this example, the parent workflow uses a Sub Workflow task and passes the entire workflow definition as a variable (as workflow input). The sub-workflow definition includes a single-step workflow with an HTTP task.

**To create the parent workflow definition:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select **+ Define workflow**.
3. In the **Code** tab, paste the following code:

```json
{
 "name": "SubWorkflowExample",
 "description": "Using the `workflowDefinition parameter` in a Sub Workflow task",
 "version": 1,
 "tasks": [
   {
     "name": "run_dynamic_subworkflow",
     "taskReferenceName": "run_dynamic_subworkflow_ref",
     "inputParameters": {},
     "type": "SUB_WORKFLOW",
     "subWorkflowParam": {
       "workflowDefinition": "${workflow.input.dynamicWorkflow}"
     }
   }
 ],
 "inputParameters": [
   "dynamicWorkflow"
 ],
 "schemaVersion": 2
}
```

4. Select **Save** > **Confirm**.

Run the workflow by dynamically passing the workflow definition. 

**To run the workflow:**

1. Go to the **Run** tab.
2. In **Input Params**, enter the following workflow definition:

```json
{
 "name": "WorkflowCalledAsSubWorkflow",
 "description": "Example",
 "version": 1,
 "tasks": [
   {
     "name": "http",
     "taskReferenceName": "http_ref",
     "type": "HTTP",
     "inputParameters": {
       "uri": "https://orkes-api-tester.orkesconductor.com/api",
       "method": "GET",
       "accept": "application/json",
       "contentType": "application/json",
       "encode": true
     }
   }
 ],
 "schemaVersion": 2
}
```

3. Select **Execute**.

On viewing the execution, verify that the workflow definition was correctly passed by inspecting the input of the Sub Workflow task.

Here, the workflow isn’t saved in your cluster but executes dynamically at runtime. You can view the sub-workflow execution from **Summary** > **Subworkflow ID**.

</p>
</details>

## Related pages

- [Operators](/content/category/reference-docs/operators)
- [Switch](/content/reference-docs/operators/switch)
- [Do While](/content/reference-docs/operators/do-while)
- [Wait](/content/reference-docs/operators/wait)
- [Dynamic](/content/reference-docs/operators/dynamic)
- [Set Variable](/content/reference-docs/operators/set-variable)
