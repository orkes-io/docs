---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sub Workflow

The Sub Workflow task allows another workflow to be executed within the current workflow. This allows you to reuse common workflows across multiple workflows.

The Sub Workflow task can also be used to overcome the limitations of other tasks:
- Use it in a [Do While](./do-while) task to achieve nested Do While loops.
- Use it in a Dynamic Fork task to execute more than one task in each fork.

## Task configuration

Configure these parameters for the Sub Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| subWorkflowParam | A map that includes the sub-workflow’s configuration, such as the name, version, and task-to-domain mapping. | Required. |
| subWorkflowParam. **name**    | The name of the workflow to be executed. This workflow should have a pre-existing definition in Conductor. | Required. |
| subWorkflowParam. **version**     | The version of the workflow to be executed. | Required. |
| subWorkflowParam. **taskToDomain**     | A map of sub-workflow tasks to specific domains. The keys are the task reference names and the values are the domain names. If not given, the taskToDomain of the executing parent workflow will take over. | Optional. |
| subWorkflowParam. **idempotencyKey**     | A user-generated key to avoid duplicating transactions across workflow executions. Idempotency data is retained for the life of the workflow execution. | Optional. |
| subWorkflowParam. **idempotencyStrategy**     | The strategy to use when a duplicate execution is already running. Supported values:<ul><li>`RETURN_EXISTING`—The request will not fail. Instead it will return the workflowId of the workflow which was triggered with the same idempotencyKey.</li><li>`FAIL`—The request will fail if the workflow has been triggered with the same idempotencyKey in the past.</li></ul> | Required if there is an idempotencyKey specified. |

In addition, you can also configure the sub-workflow’s input in `inputParameters`, which will be passed down to the invoked sub-workflow. The sub-workflow’s input can be coupled to the parent workflow’s input parameters, or it can be invoked from the output of the preceding task.

If you are taking the sub-workflow’s input parameters from the parent workflow, you need to add them as an input parameter in the parent workflow and then call the same input parameters inside the sub-workflow definition.


## Task definition

This is the JSON schema for a Sub Workflow task definition.

```json
{
  "name": "sub_workflow",
  "taskReferenceName": "sub_workflow_ref",
  "inputParameters": { // input parameters for the sub workflow},
  "type": "SUB_WORKFLOW",
  "subWorkflowParam": {
    "name": "subworkflowName",
    "version": 3,
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


| Parameter     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| subWorkflowId | The sub-workflow execution ID that is generated when running the sub-workflow. |
In addition to the execution ID, the sub-workflow’s workflow output will also be supplied as the Sub Workflow task output.

## Adding a Sub Workflow task in UI

**To add a Sub Workflow task:**
1. In your workflow, select the **(+)** icon and add a **Sub Workflow** task.
2. Enter the **Workflow name** and **Version**.
  Once selected, the sub-workflow’s input parameters will automatically appear if there are any pre-defined ones.
3. (Optional) Enter the **Idempotency key** and select the **Idempotency strategy**.
4. (Optional) Add any additional input parameters for the sub-workflow.
5. (Optional) Add task to domain mapping for the sub-workflow tasks.

To view the sub-workflow tasks inside the parent workflow, you can check **Expand** to display them in the visual diagram editor.

<p><img src="/content/img/ui-guide-subworkflow-task.png" alt="Adding wait task" /></p>

## Examples

Here are some examples for using the Sub Workflow task.

<details><summary>Using the Sub Workflow task in a workflow</summary>
<p>

Let’s say you have a very long workflow, “payment_for_subscription”, which handles the payment for subscriptions as shown below:

<p align="center"><img src="/content/img/payment-sub-workflow-example.jpg" alt="Payment sub workflow" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

To add this “payment_for_subscription” workflow to a larger subscription workflow, it would be possible to copy and paste the workflow JSON definition over. However, whenever the “payment_for_subscription” workflow is updated, it will not be reflected in the workflow where you have added it. A better way to handle this is to call the “payment_for_subscription” workflow as a sub-workflow in the wider subscription workflow so that any updates to this workflow get reflected in all its parent workflows.

You can add this as a sub-workflow in your required workflow whenever a payment flow is to be implemented:


<p align="center"><img src="/content/img/payment-sub-workflow-in-main-workflow.png" alt="Payment workflow as sub-workflow in a subscription flow" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This is a subscription workflow with multiple instances where payment flow is to be implemented. Here, the previously-created payment workflow is added as sub-workflows.
The above image is a simplified version of the subscription workflow. You can view the entire version in Playground 
[here](https://play.orkes.io/workflowDef/Subscription/).

</p>
</details>

## FAQs

### How do we retry a sub-workflow from a specific task?

You can use the following API to retry a sub-workflow from a specific task. From the Conductor UI, check the task level start time to verify that the preceding tasks are not re-run. Additionally, you can insert a WAIT task before the desired re-run starting point and confirm that it does not transition to the state of that WAIT task.

```shell
 curl -X POST 'https://<conductor_server_dns>/api/workflow/<workflow_id>/rerun' \
   -H 'Content-Type: application/json' \
   -d '{
    "reRunFromTaskId": "<task_execution_id>"
  }' \
   -H 'x-authorization: <auth_token>'
```
