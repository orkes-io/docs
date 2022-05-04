---
sidebar_position: 1
---
# Sub Workflow
```json
"type" : "SUB_WORKFLOW"
```
### Introduction
Sub Workflow task allows for nesting a workflow within another workflow.

### Use Cases

Suppose we want to include another workflow inside our current workflow. In that
case, Sub Workflow Task would be used.

**Examples**
* The ```Do-While``` Task does not allow nested ```Do-While``` tasks.  But  it does permit a subworkflow that can have a ```Do-While``` loop inside it.
* ```Dynamic Forks ``` can only contain one task. But that one task can be a subworkflow containing many additional tasks.

### Configuration

Sub Workflow task is defined directly inside the workflow with `"SUB_WORKFLOW"`.

#### Inputs

**Parameters:**

|name|type|description|
|---|---|---|
| subWorkflowParam | Map[String, Any] | See below |

**subWorkflowParam**

|name|type|description|
|---|---|---|
| name | String | Name of the workflow to execute |
| version | Integer | Version of the workflow to execute |
| taskToDomain | Map[String, String] | Allows scheduling the sub workflow's tasks per given mappings. See [Task Configurations](/content/docs/how-tos/Tasks/task-configurations) for instructions to configure taskDomains. |
| workflowDefinition | [WorkflowDefinition](/content/docs/how-tos/Workflows/create-workflow) | Allows starting a subworkflow with a dynamic workflow definition. |

#### Output

|name|type|description|
|---|---|---|
| subWorkflowId | String | Subworkflow execution Id generated when running the subworkflow |


### Examples

Imagine that a colleague has created a address verification workflow:

<p align="center"><img src="/content/img/postage_rate_workflow.png" alt="example workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

If you wanted to add this functionality to another workflow, it would be possible to copy all 201 lines of JSON and insert it into your workflow.  However, any updates made by your colleague will not be reflected in your workflow - you have a "frozen in time" version of the code.

Instead, we can call the existing workflow as a ```SUB_WORKFLOW``` task.  

```
{
      "name": "postage_rate_subworkflow",
      "taskReferenceName": "postage_rate_subworkflow_ref",
      "inputParameters": {},
      "type": "SUB_WORKFLOW",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "subWorkflowParam": {
        "name": "shipping_rate",
        "version": 1
      },
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }

```

<p align="center"><img src="/content/img/subworkflow_in_action.png" alt="example workflow with subworkflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Not only is your workflow more readable, with easier to edit JSON, but it will update with the ```postage_rate``` workflow.


