---
sidebar_position: 1
---
# Inline Task

## What is a Inline Task?

Inline Task helps execute necessary logic at Workflow run-time,
using any evaluator engine. Supported evaluators are value-param
evaluator which simply translates the input parameter to output and
javascript evaluator that evaluates Javascript expression.

## Common Use Cases

Consider a scenario, we have to run simple evaluations in
Conductor server while creating Workers. Inline task can be used to run these
evaluations using an evaluator engine.

## Configuration / Properties

Inline task is defined directly inside the workflow with
`"type":"INLINE"`.

### Inputs

Following are the input parameters :

|name|type|description|notes|
|---|---|---|---|
|evaluatorType|String|Type of the evaluator. Supported evaluators: `value-param`, `javascript` which evaluates javascript expression.|
|expression|String|Expression associated with the type of evaluator. For `javascript` evaluator, Javascript evaluation engine is used to evaluate expression defined as a string. Must return a value.|Must be non-empty.|

Besides `expression`, any value is accessible as `$.value` for the `expression` to evaluate.

### Output

Following is the output generated :

|name|type|description|
|---|---|---|
|result|Map|Contains the output returned by the evaluator based on the `expression`|

The task output can then be referenced in downstream tasks like:
```"${inline_test.output.result.testvalue}"```

## Examples

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

## FAQs

TODO: Gotchas and other nuances

1. Question 1
    1. Answer

1. Question 2
    1. Answer
