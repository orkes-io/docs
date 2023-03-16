---
sidebar_position: 1
---

# Sub Workflow Task

```json
"type" : "SUB_WORKFLOW"
```

### Introduction

Sub Workflow task allows for nesting a workflow within another workflow.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/qRIu-bEn6kk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

### Use Cases

You can leverage sub-workflow tasks in cases where you want to include another workflow within an existing workflow.

**Examples**

- The `Do-While` task does not allow nested `Do-While` tasks. But it does permit a sub-workflow that can have a `Do-While` loop inside it.
- `Dynamic Forks ` can only contain one task. But using the sub-workflow concept, this single task can be a sub-workflow that includes additional tasks.

### Configuration

Sub Workflow task is defined directly inside the workflow with `"SUB_WORKFLOW"`.

#### Inputs

**Parameters:**

| name             | type             | description                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| subWorkflowParam | Map[String, Any] | It includes the parameters _name_, _version_, _taskToDomain_ & _workflowDefinition_. See the below table for detailed info on this.                                                                                                                                                                                                                                                                                                      |
| inputParameters  | Map[String, Any] | The sub workflow’s input can be coupled to the workflow’s input parameters or it can be invoked from the output of the preceding task. For example, if you are taking the sub-workflow’s input parameter from the workflow, then you need to initially add this as an input parameter in the parent workflow (workflow to be called as the sub-workflow). Then you can call the same input parameter inside the sub-workflow definition. |

**subWorkflowParam**

| name               | type                                                                  | description                                                                                                                                                                          |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name               | String                                                                | You need to map this field with the name of the workflow you are planning to execute.                                                                                                |
| version            | Integer                                                               | Include the version of the workflow to be executed.                                                                                                                                  |
| taskToDomain       | Map[String, String]                                                   | Allows scheduling the sub-workflow's tasks per given mappings. See [Task Configurations](/content/docs/how-tos/Tasks/task-configurations) for instructions to configure taskDomains. |
| workflowDefinition | [WorkflowDefinition](/content/docs/how-tos/Workflows/create-workflow) | Allows starting a sub-workflow with a dynamic workflow definition.                                                                                                                   |

#### Output

| name          | type   | description                                                      |
| ------------- | ------ | ---------------------------------------------------------------- |
| subWorkflowId | String | Subworkflow execution ID generated when running the sub-workflow |

The output of the sub-workflow is also supplied to the output of the workflow.

### Examples

Imagine that a colleague has created an address verification workflow:

<p align="center"><img src="/content/img/postage_rate_workflow.png" alt="example workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

If you wanted to add this functionality to another workflow, it would be possible to copy all 201 lines of JSON and insert them into your workflow. However, any updates made by your colleague will not be reflected in your workflow, i.e., you have a "frozen in time" version of the code.

Instead, you can call the existing workflow as a `SUB_WORKFLOW` task.

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

This not only makes your workflow more readable, with easier-to-edit JSON, but it will update with the `postage_rate` workflow.

## Codelab Examples

Visualize an example workflow [Order Fulfillment](https://orkes.io/content/docs/codelab/orderfulfillment6#subworkflow), where a sub-workflow is being called within a dynamic fork.
