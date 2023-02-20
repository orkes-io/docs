import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

### Input Parameters

| Attribute | Desciption |
| --------- | ---------- |
| evaluatorType | Choose the type of evaluator. Supported evaluators are **graaljs** & **javascript**. Graaljs evaluates the expression using graaljs, and javascript evaluates the expression using nashorn to compute the value. |
| expression | Indicates the expression associated with the type of evaluator. For the javascript evaluator, the Javascript evaluation engine is used to evaluate the expression defined as a string. It must return a value. For the graaljs evaluator, graalvm is used to evaluate the expression. |

Besides the expression, any of the properties in the input values is accessible as **$.value** for the expression to evaluate.

## Examples

<Tabs>
 <TabItem value="JSON" lable="JSON">

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

</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
<p>
Add Examples
</p>
</details>