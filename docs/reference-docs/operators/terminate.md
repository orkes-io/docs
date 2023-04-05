import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Task

The Terminate task is a task that can terminate the workflow with a termination status and reason.

## Definitions

```json
{
  "name": "terminate_task",
  "taskReferenceName": "terminate_task_ref",
  "inputParameters": {
    "terminationStatus": "COMPLETED",
    "terminationReason": "Task completed successfully.",
    "workflowOutput": {
      "Some-Key": "Some-Value"
    }
  },
  "type": "TERMINATE"
}
```
* The Terminate task can modify the workflow's output with a given parameter and act as a return statement for conditions where you want to terminate your workflow.

### Input Parameters

| Attribute         | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| terminationStatus | Indicates the termination status. It can take values **COMPLETED**, **FAILED**, or **TERMINATED**. |
| workflowOutput    | Provide the expected workflow output.                                                              |
| terminationReason | Provide a reason to give a clear understanding of the termination status.                          |

### Output Parameters

| Attribute | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| output    | The content of **workflowOutput** from the inputParameters. An empty object if **workflowOutput** is not set. |

## Examples

<Tabs>
<TabItem value="JSON"  lable="JSON">

```json
{
 "name": "terminate",
 "taskReferenceName": "terminate_ref",
 "inputParameters": {
     "terminationStatus": "COMPLETED",
     "terminationReason": "Some reason",
     "workflowOutput": { "result": "${task0.output}"}
 },
 "type": "TERMINATE"
}
```

</TabItem>
<TabItem value="Java" label="Java">

```java
new Terminate(
  String taskReferenceName, 
  Workflow.WorkflowStatus terminationStatus, 
  String reason
)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
workflow.NewTerminateTask(
  taskRefName string, 
  status model.WorkflowStatus, 
  terminationReason string,
) *TerminateTask
```

</TabItem>
<TabItem value="Python" label="Python">

```python
conductor.client.workflow.task.TerminateTask(
  task_ref_name: str, 
  status: WorkflowStatus, 
  termination_reason: str
)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
TerminateTask(
  string taskReferenceName, 
  WorkflowStatus.StatusEnum terminationStatus = WorkflowStatus.StatusEnum.FAILED, 
  string workflowId = null, 
  string terminationReason = null
)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
terminateTask = (
  taskReferenceName: string,
  status: "COMPLETED" | "FAILED",
  terminationReason?: string
): TerminateTaskDef
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- Todo: @gardusig -->
```clojure

```

</TabItem>
</Tabs>

<details><summary>Sample Example</summary>
<p>
Suppose in a workflow, we have to make a decision to ship the courier with the shipping service providers based on input provided while running the workflow. If the input provided while running the workflow does not match with the available shipping providers, then the workflow will fail and return. If the input provided matches, then it goes ahead.
<br/>
Here is a snippet that shows the default switch case terminating the workflow:

```json
{
 "name": "switch_task",
 "taskReferenceName": "switch_task",
 "type": "SWITCH",
 "defaultCase": [
     {
     "name": "terminate",
     "taskReferenceName": "terminate",
     "type": "TERMINATE",
     "inputParameters": {
         "terminationStatus": "FAILED",
         "terminationReason":"Shipping provider not found."
     }     
   }
  ]
}
```

Workflow gets created as shown in the diagram.

![Conductor UI - Workflow Diagram](/img/tutorial/Terminate_Task.png)
</p>
</details>