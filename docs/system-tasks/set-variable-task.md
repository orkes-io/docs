---
sidebar_position: 16
---

# Set Variable Task

### What is Set Variable Task?

This task allows us to set workflow variables by creating or updating them 
with new values.

### What is a Set Variable Task use case?

Variables can be initialized in the workflow definition as well as during
the workflow run. Once a variable was initialized it can be read or
overwritten with a new value by any other task.

### How is it defined?

Set Variable task is defined directly inside the workflow with type 
`SET_VARIABLE`.


### Example of Set Variable Task

Following is an example of Set Variable Task which can be defined inside the
workflow.

```json
{
  "type": "SET_VARIABLE",
  "name": "set_stage_start",
  "taskReferenceName": "set_stage_start",
  "inputParameters": {
    "stage": "START"
  }
}
```

Later in that workflow, the variable can be referenced 
by `"${workflow.variables.stage}"`.


### FAQs



