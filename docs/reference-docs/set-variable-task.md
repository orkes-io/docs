---
sidebar_position: 1
---

# Set Variable Task

```json
"type" : "SET_VARIABLE"
```
### Introduction
Set Variable allows us to set workflow variables by creating or updating them
with new values.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/kR2OI8eHri0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

### Use Cases

Variables can be initialized in the workflow definition as well as during
the workflow run. Once a variable was initialized it can be read or
overwritten with a new value by any other task. Variables can be used to manage a state across all your tasks.

### Configuration

Set Variable task is defined directly inside the workflow with type
`SET_VARIABLE`.

### Examples

Suppose in a workflow, we have to store a value in a variable and then later in
workflow reuse the value stored in the variable just as we do in programming, in such
scenarios `Set Variable` task can be used.

Following is the workflow definition with `SET_VARIABLE` task.

```json
{
  "name": "Set_Variable_Workflow",
  "description": "Set a value to a variable and then reuse it later in the workflow",
  "version": 1,
  "tasks": [
    {
      "name": "Set_Name",
      "taskReferenceName": "Set_Name",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "name": "Orkes"
      }
    },
    {
      "name": "Read_Name",
      "taskReferenceName": "Read_Name",
      "inputParameters": {
        "var_name" : "${workflow.variables.name}"
      },
      "type": "SIMPLE"
    }
  ],
  "restartable": true,
  "ownerEmail":"abc@example.com",
  "workflowStatusListenerEnabled": true,
  "schemaVersion": 2
}
```

In the above example, it can be seen that the task `Set_Name` is a Set Variable Task and
the variable `name` is set to `Orkes` and later in the workflow it is referenced by
`"${workflow.variables.name}"` in another task.
