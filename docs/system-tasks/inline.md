# Inline Task

```json
"type": "INLINE"
```

The inline task helps execute necessary logic at the workflow run-time using an evaluator. The two supported evaluator types are javascript and graaljs.

## Configurations
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

### Input Configurations

| Attribute | Desciption |
| --------- | ---------- |
| evaluatorType | Choose the type of evaluator. Supported evaluators are `graaljs` & `javascript`. Graaljs evaluates the expression using graaljs, and javascript evaluates the expression using nashorn to compute the value. |
| expression | Indicates the expression associated with the type of evaluator. For the javascript evaluator, the Javascript evaluation engine is used to evaluate the expression defined as a string. It must return a value. |

Besides the expression, any of the properties in the input values is accessible as `$.value` for the expression to evaluate.

## Examples

<details><summary>Sample Workflow</summary>
<p>
Add Examples
</p>
</details>