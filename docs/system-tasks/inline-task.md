---
sidebar_position: 11
---

# Inline Task


### What is Inline Task?

Inline Task helps execute necessary logic at Workflow run-time,
using any evaluator engine. Supported evaluators are value-param
evaluator which simply translates the input parameter to output and
javascript evaluator that evaluates Javascript expression.

### What is a common Inline Task use case?

Consider a scenario, we have to run simple evaluations in
Conductor server while creating Workers. Inline task can be used to run these
evaluations using an evaluator engine.

### How is it defined?

Inline task is defined directly inside the workflow with
`"type":"INLINE"`.

### Example of Inline Task
```json
{
  "name": "INLINE_TASK",
  "taskReferenceName": "inline_test",
  "type": "INLINE",
  "inputParameters": {
      "inlineValue": "${workflow.input.inlineValue}",
      "evaluatorType": "javascript",
      "expression": "function scriptFun(){if ($.inlineValue == 1){ return {testvalue: true} } else { return 
{testvalue: false} }} scriptFun();"
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

Besides expression, any value is accessible as `$.value` for the expression
to evaluate.

The task output can then be referenced in downstream tasks 
like: `"${inline_test.output.result.testvalue}"`

