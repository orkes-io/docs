---
sidebar_position: 12
---

# Terminate Task


### What is Terminate Task?

Task that can terminate a workflow with a given status and modify the
workflow's output with a given parameter. It can act as a "return" statement 
for conditions where you simply want to terminate your workflow.

### What is a common Terminate Task use case?

Consider a scenario, if you have a decision where the first condition
is met, you want to execute some tasks, otherwise you want to finish
your workflow.

### How is it defined?

Terminate task is defined directly inside the workflow with type
`TERMINATE`.

### Example Workflow Definition

Following is an example of Terminate Task which can be defined inside the
workflow.

```json
{
"name": "terminate",
"taskReferenceName": "terminate0",
"inputParameters": {
"terminationStatus": "COMPLETED",
"workflowOutput": "${task0.output}"
},
"type": "TERMINATE",
"startDelay": 0,
"optional": false
}
```

Following are the parameters - 

1. `"terminationStatus"` - can only accept "COMPLETED" or "FAILED"

2. `"workflowOutput"` - Expected workflow output


### FAQs



