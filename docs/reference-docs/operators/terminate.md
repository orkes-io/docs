import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Terminate Task

 ```json
 "type" : "TERMINATE"
 ```

The Terminate task is a task that can terminate the workflow with a termination status and reason.

## Configurations

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

| Attribute | Description |
| -- | -- |
| terminationStatus | Indicates the termination status. It can take values **COMPLETED**, **FAILED**, or **TERMINATED**. | 
| workflowOutput | Provide the expected workflow output. | 
| terminationReason | Provide a reason to give a clear understanding of the termination status. |

### Output Parameters

| Attribute | Description |
| -- | -- |
| output | The content of **workflowOutput** from the inputParameters. An empty object if **workflowOutput** is not set. | 

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
This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
<TabItem value="Javascript" label="Javascript">
    This is a banana 🍌
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