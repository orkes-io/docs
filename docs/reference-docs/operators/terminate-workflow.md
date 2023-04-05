import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Workflow Task

The Terminate Workflow task is used to terminate other workflows using their workflow IDs.

## Definitions

```json
{
  "name": "terminate_workflow_task",
  "taskReferenceName": "terminate_workflow_task_ref",
  "inputParameters": {
    "workflowId": "someWorkflowID",
    "terminationReason": "a termination reason"
  },
  "type": "TERMINATE_WORKFLOW"
}
```

### Input Parameters

| Attribute         | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| workflowId        | Provide the workflow IDs of the workflow to be executed.                                                                        |
| terminationReason | Provide the reason for the workflows being terminated. It helps in giving a clear picture as to why the workflow is terminated. |

### Output Parameters

| Attribute           | Description                                                                           |
| ------------------- | ------------------------------------------------------------------------------------- |
| terminatedWorkflows | Includes the set of workflow IDs corresponding to the workflows that were terminated. |

## Examples

<Tabs>
<TabItem value="JSON" label="JSON">

```json
{
  "name": "terminate_workflow_example",
  "taskReferenceName": "terminate_ref",
  "inputParameters": {
    "workflowId": ["0ea3b193-7268-4886-aa97-d6ed170de854", "${workflow.input.idProvidedFromWorkflowInput}"],
    "terminationReason": "Custom reason for termination"
  },
  "type": "TERMINATE_WORKFLOW"
}
```

</TabItem>
<TabItem value="Java" label="Java">

<!-- Todo: @gardusig -->
```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

<!-- Todo: @gardusig -->
```go

```

</TabItem>
<TabItem value="Python" label="Python">

<!-- Todo: @gardusig -->
```python

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

<!-- Todo: @gardusig -->
```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

<!-- Todo: @gardusig -->
```javascript

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- Todo: @gardusig -->
```clojure

```

</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
<p>

Suppose another running workflow is to be terminated; you can create a workflow with the workflow IDs to be terminated.

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
       "workflowId": "ff2c8cdc-d20e-11ed-b1a7-ce4d7ef052ad"
     },
     "type": "TERMINATE_WORKFLOW",
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "riza.farheen@orkes.io",
 "timeoutPolicy": "ALERT_ONLY",
}
```
If you run this workflow, the workflow with the mentioned workflowId gets terminated, and you can get the terminatedWorkflowIds from the execution page.

<p align="center"><img src="/content/img/terminate-workflow.png" alt="Terminate Workflow - Successful execution" width="90%" height="auto"></img></p>

You can copy and paste this ID into the workflow execution URL to view the terminated workflow.

<p align="center"><img src="/content/img/terminated-workflow.png" alt="View of the terminated workflow" width="90%" height="auto"></img></p>

A warning message is displayed indicating that the workflow was terminated.

</p>
</details>