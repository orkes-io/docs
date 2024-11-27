---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Switch 

The Switch task is used for conditional branching logic. It represents if...then...else or switch...case statements in programming, and can be used for any situation where different tasks have to be executed based on different conditions.

A Switch task evaluates an expression, either a simple input parameter key or a complex JavaScript expression, and matches the expression output with the name of each switch case. The appropriate tasks are executed based on the matching branch, which contains a sequence of tasks. The default branch will be executed if no matching branches are found.

## Task parameters

Configure these parameters for the Switch task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| evaluatorType | The type of evaluator used. Supported types: <ul><li>`value-param`—Evaluates a specific input parameter in the Switch task.</li><li>`graaljs`—Evaluates JavaScript expressions and computes the value. Allows you to use ES6-compatible JavaScript.</li></ul> | Required. |
| expression    | The expression that is evaluated by the Switch task. The expression format depends on the evaluator type:<ul><li>For the `value-param` evaluator, the expression is the input parameter key.</li><li>For the `graaljs` evaluator, the expression is the JavaScript expression. </li></ul> | Required. |
| decisionCases | A map of the possible switch cases. The keys are the possible outputs of the evaluated expression, and the values are the list of tasks to be executed in each case.    | Required. |
| defaultCase   | The default branch. Contains the list of tasks to be executed when no matching value is found in the decision cases.                               | Optional. |

## Task configuration

This is the task configuration for a Switch task.

<Tabs>
<TabItem value="value-param" label="value-param">

```json
{
  "name": "switch",
  "taskReferenceName": "switch_ref",
  "inputParameters": {
    "switchCaseValue": "${workflow.input}"
  },
  "type": "SWITCH",
  "decisionCases": {
    "caseName1": [
      {//taskDefinition}
    ],
    "caseName2": [
      {//taskDefinition}, 
      {//taskDefinition}
    ]
  },
  "defaultCase": [
    {//taskDefinition}
  ],
  "evaluatorType": "value-param",
  "expression": "switchCaseValue"
}
```

</TabItem>
<TabItem value="graaljs" label="graaljs">

```json
{
  "name": "switch",
  "taskReferenceName": "switch_ref",
  "inputParameters": {
    "switchCaseValue": "${workflow.input.num}"
  },
  "type": "SWITCH",
  "decisionCases": {
    "apples": [
      {//taskDefinition}
    ],
    "tomatoes":  [
      {//taskDefinition}
    ],
    "oranges":  [
      {//taskDefinition}
    ]
  },
  "defaultCase": [],
  "evaluatorType": "graaljs",
  "expression": "(function () {\n    switch ($.switchCaseValue) {\n      case \"1\":\n        return \"apple\";\n      case \"2\":\n        return \"tomatoes\";\n      case \"3\":\n        return \"oranges\"\n    }\n  }())"
}
```

</TabItem>
</Tabs>


## Task output

The Switch task will return the following parameters.

| Parameter     | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selectedCase | The evaluation result of the Switch task. | 


### Accessing the Switch task output
You can access the output of the Switch task in subsequent tasks by referring to the output value `selectedCase`, using `${switchTaskName.output.selectedCase}` (replacing `switchTaskName` with the actual task reference name).

## Adding a Switch task in UI

**To add a Switch task:**
1. In your workflow, select the **(+)** icon and add a **Switch** task.
2. In **Script params**, add the parameter that will be evaluated in the expression.
3. In **Evaluate**, select the evaluator type and enter the expression.
    * **Value-Param**—Ensure that the expression value matches the parameter key you have defined in Script params.
    * **ECMASCRIPT**—Enter a JavaScript script.
4. In **Switch cases**, label the cases with the relevant parameter values.
5. In your workflow, select the **(+)** icon to add tasks to each switch case.
6. (Optional) Add tasks to the default case.

<p><img src="/content/img/Task-References/switch_task_reference.png" alt="Screenshot of Switch Task in Orkes Platform"/></p>

## Examples
Here are some examples for using the Switch task.
<details><summary>Nested switch case</summary>
<p>
Similar to any programming language, you can use other operators inside a switch case, such as nested switches, loops, forks, and so on.

```json
{
  "name": "switch",
  "taskReferenceName": "switch_ref",
  "inputParameters": {
    "switchCaseValue": "${workflow.input.shipping}"
  },
  "type": "SWITCH",
  "decisionCases": {
    "fedex": [
      {//taskDefinition}
    ],
    "ups": [
      {//taskDefinition
        "name": "nestedSwitch",
        "taskReferenceName": "nestedSwitch_ref",
        "inputParameters": {
          "deliveryType": "${workflow.input.delivery}"
        },
        "type": "SWITCH",
        "decisionCases": {
            "same_day": [      {//taskDefinition}],
            "regular": [      {//taskDefinition}]
        },
        "defaultCase": [],
        "evaluatorType": "graaljs",
        "expression": "$.deliveryType == 'same-day' ? 'same_day' : 'regular'",
      }
    ]
  }
  "defaultCase": [],
  "evaluatorType": "value-param",
  "expression": "switchCaseValue"
}
```
</p>
</details>
<details><summary>JavaScript expressions​</summary>
<p>
When using `javascript` or `graaljs` as the evaluator type, the `expression` can be a JavaScript expression that returns a string. Within the `expression`, the Switch task input parameter is available as the variable inside the $ scope.

**Input parameters for a javascript or graaljs evaluator type:**

``` json
   "inputParameters" : {
     "shippingType": "${workflow.input.shipping}"
   }
```

**Expression for a javascript or graaljs evaluator type:**

``` javascript
((
  function () {
    if ($.shippingType == 'EXPRESS') {
      return "FEDEX";
    }
    return "USPS";
  }
))();
```

</p>
</details>
<details><summary>JavaScript expression that evaluates a datetime string</summary>
<p>
The script below returns `OLDER` or `NEWER` depending on whether the input date is older than one month.

``` javascript
((
  function () {
    const date = new Date($.timestamp);
    const currentDate = new Date();

    // Subtract one month from the current date
    currentDate.setMonth(currentDate.getMonth() - 1);
    if (date < currentDate) {
      return "OLDER";
    }
    return "NEWER"
  }
))();
```

Check out the [sample workflow execution that runs this switch case](https://play.orkes.io/execution/9be8fb4d-e991-11ed-bb41-9e017806b678) in our Playground.
</p>
</details>
