---
sidebar_position: 1
---

# Terminate Task

```json
"type" : "TERMINATE"
```

## Introduction

The Terminate task is a task that can terminate a workflow with a given status and modify the workflow's output with a given parameter; it can act as a `return` statement for conditions where you simply want to terminate your workflow.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/FdH0nSgtc0Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Use Cases

Use it when you want to terminate the workflow without continuing the execution.  
For example, if you have a decision where the first condition is met, you want to execute some tasks;
otherwise, you want to finish your workflow.

## Configuration

Terminate task is defined directly inside the workflow with the type
`TERMINATE`.

```json
{
  "name": "terminate",
  "taskReferenceName": "terminate0",
  "inputParameters": {
    "terminationStatus": "COMPLETED",
    "workflowOutput": { "result": "${task0.output}" }
  },
  "type": "TERMINATE",
  "startDelay": 0,
  "optional": false
}
```

### Inputs

**Parameters:**

| name              | type   | description                                                  | notes                       |
| ----------------- | ------ | ------------------------------------------------------------ | --------------------------- |
| terminationStatus | String | Can only accept "COMPLETED" or "FAILED"                      | The task cannot be optional |
| workflowOutput    | Any    | Expected workflow output                                     |                             |
| terminationReason | String | For failed tasks, this reason is passed to a failureWorkflow |

### Output

**Outputs:**

| name   | type | description                                                                                               |
| ------ | ---- | --------------------------------------------------------------------------------------------------------- |
| output | Map  | The content of `workflowOutput` from the inputParameters. An empty object if `workflowOutput` is not set. |

## Examples

Let's consider the same example we had in [Switch Task](/docs/reference-docs/switch-task).

Suppose in a workflow, we have to make a decision to ship the courier with the shipping
service providers on the basis of input provided while running the workflow.
If the input provided while running the workflow does not match with the available
shipping providers, then the workflow will fail and return. If input provided
matches then it goes ahead.

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
        "terminationReason": "Shipping provider not found."
      }
    }
  ]
}
```

Workflow gets created as shown in the diagram.

![Conductor UI - Workflow Diagram](/img/tutorial/Terminate_Task.png)

## Codelab examples

- [Postage Use Case](/content/docs/usecases/US_post_office)
- [Loan Approval](/content/docs/usecases/finance)
- [Order Fulfillment](/content/docs/codelab/orderfulfillment5#terminate-task)

## Best Practices

1. Include the termination reason when terminating the workflow with failure status to make it easy to understand the cause.
2. Include any additional details (e.g., the output of the tasks, switch case, etc.) that help understand the path taken to the termination.
