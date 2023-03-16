---
sidebar_position: 11
---

# Inline Task

```json
"type": "INLINE"
```

## Introduction

The inline task helps execute necessary logic at the workflow run-time using an evaluator. There are two supported evaluators as of now:

| name       | description                                                          |
| ---------- | -------------------------------------------------------------------- |
| javascript | Evaluate Javascript expressions using nashorn and compute the value. |
| graaljs    | Evaluate Javascript expressions using graaljs and compute the value. |

## Use Cases

Consider a scenario where we have to run simple evaluations in the Conductor server while creating Workers. An inline task can be used to run these evaluations using an evaluator engine.

## Configuration

```json
{
  "name": "inline_task_example",
  "taskReferenceName": "inline_task_example",
  "type": "INLINE",
  "inputParameters": {
    "value": "${workflow.input.value}",
    "evaluatorType": "javascript",
    "expression": "function e() { if ($.value == 1){return {\"result\": true}} else { return {\"result\": false}}} e();"
  }
}
```

The following are the parameters in the above example:

1. `"evaluatorType"` - Type of the evaluator. Supported evaluators: graaljs, javascript, which evaluates the javascript expression.

2. `"expression"` - Expression associated with the type of evaluator. For the javascript evaluator, the Javascript evaluation engine is used to evaluate the expression defined as a string. Must return a value.

Besides the expression, any of the properties in the input values is accessible as `$.value` for the expression to evaluate.

The task output can then be referenced in downstream tasks like

`"${inline_test.output.result}"`

## Examples in Codelabs

- [Task to Domain A/B testing](/content/docs/codelab/taskToDomain#ab-with-an-inline-task) - This workflow uses the JavaScript `Math.random()` to decide an outcome - either send the next task to the main worker or to the worker named 'Doug.'
