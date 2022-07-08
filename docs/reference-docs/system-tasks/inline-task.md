---
sidebar_position: 11
---

# Inline Task

```json
"type": "INLINE"
```
## Introduction

Inline Task helps execute necessary logic at Workflow run-time,
using an evaluator. There are two supported evaluators as of now:

|name|description|
|---|---|
| value-param | Use a parameter directly as the value |
| javascript | Evaluate Javascript expressions and compute value |

## Use Cases

Consider a scenario, we have to run simple evaluations in
Conductor server while creating Workers. Inline task can be used to run these
evaluations using an evaluator engine.

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

Following are the parameters in the above example :

1. `"evaluatorType"` - Type of the evaluator. 
Supported evaluators: value-param, javascript which evaluates 
javascript expression.	

2. `"expression"` - Expression associated with the type of evaluator. 
For javascript evaluator, Javascript evaluation engine is used to 
evaluate expression defined as a string. Must return a value.	

Besides expression, any of the properties in the input values is accessible as `$.value` for the expression
to evaluate. 

The task output can then be referenced in downstream tasks 
like: `"${inline_test.output.result}"`

## Examples in Codelabs

* [Task to Domain A/B testing](/content/docs/codelab/taskToDomain#ab-with-an-inline-task) - This workflow uses a the JavaScript `Math.random()` to decide an outcome - either send the next task to the main worker, or to the worker named 'Doug.'