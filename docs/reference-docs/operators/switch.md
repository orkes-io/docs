---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Switch 

The switch task is used for creating branching logic. It is a representation of multiple **if...then...else** or **switch...case** statements in programming.

## Definitions

```json
{
  "name": "switch_task",
  "taskReferenceName": "switch_task_ref",
  "inputParameters": {
    "switchCaseValue": "${workflow.input.service}"
  },
  "type": "SWITCH",
  "evaluatorType": "value-param",
  "expression": "switchCaseValue",
  "defaultCase": [//tasks],
  "decisionCases": {
    "fedex": [//tasks],
    "ups": [//tasks]
  }
}
```
* A switch task takes an expression as input along with multiple branches containing a sequence of tasks to be executed and a *default* branch to be executed if no matching branches are found.
* The output of the **expression** is matched with the name of the branch.
* The expression can be a **javascript** expression or a value parameter that represents the input to the task directly.

### Input Parameters

| Attribute     | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| evaluatorType | Indicates the type of evaluator used. Supported types are **value-param**, **javascript**, and **graaljs**.                                                                                                |
| expression    | The expression depends on the evaluator type. For the **value-param** evaluator, the expression is the input parameter; for the **javascript** and **graaljs** evaluator, it is the javascript expression. |
| decisionCases | Map where the key is possible values that can result from the **expression**, with the value being the list of tasks to be executed.                                                                       |
| defaultCase   | List of tasks to be executed when no matching value is found in the decision case (default condition).                                                                                                         |

#### Types of Evaluators
| Attribute   | Description                                                                                           |
| ----------- |-------------------------------------------------------------------------------------------------------|
| value-param | Use a parameter directly as the value.                                                                |
| javascript  | Evaluate Javascript expressions and compute the value - Legacy.  __Deprecated__ - use graaljs instead. |
| graaljs     | Evaluate Javascript expressions and compute the value. Allows you to use ES6-compatible Javascript.   |


## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Switch`.
2. Click on the (+) icon to add switch cases.
3. Add the value parameter to evaluate for switch.
4. Label the cases with values to match.
5. Add one more task to the cases.
6. Add tasks to default case if applicable.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-switch-task.png" alt="Adding event task" width="720" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
    {
      "name": "switch_example",
      "taskReferenceName": "switch_example_1",
      "inputParameters": {
        "switchCaseValue": "${workflow.input.inputKey1}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "CASE1": [
          // task list for inputKey1 == CASE1
        ],
        "CASE2": [
          // task list for inputKey1 == CASE2
        ]
      },
      "defaultCase": [
        // default task list when inputKey1 does not match any case
      ],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue"
    }
```

</TabItem>
</Tabs>

## Access Switch Case Output
We can access the output of the switch case in subsequent tasks by referring to the output value `selectedCase`. 
For example, if the switch case reference was `switch_example_1` we can access the output value by:

```json
${switch_example_1.output.selectedCase}
```


## Using Javascript Expressions

When using **javascript** or **graaljs** as the evaluator type, the expression can be a javascript expression that returns a string.

The input to the tasks is available as the variables inside the **$** scope within the script.

```json
    "inputParameters" : {
      "shippingType": "${workflow.input.shippingType}"
    }
```

```javascript

    (function () {
      if ($.shippingType == 'EXPRESS') {
        return "FEDEX";
      }
      return "USPS";
    })();

```

<details><summary>Nested Switch case</summary>
<p>
Switch task can be nested just like nested if...then...else.

```json
{
  "decisionCases": {
    "fedex": [//tasks],
    "ups": [
      {
        "taskType": "SWITCH",
        "expression": "$.deliveryType == 'same-day' ? 'same_day' : 'regular'",
        "decisionCases": {
            "same_day": [],
            "regular": [],
        }
      }
    ]
  }
}

```
</p>
</details>

:::tip
Similar to any programming language, you can have other operators inside a switch case, such as nested switches, loops, forks, etc.
:::

## FAQs

### How can I create a JavaScript switch case statement that evaluates whether a given datetime string is older than one month?

You can use the following script:

```javascript
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

It returns “OLDER” or “NEWER” depending on the input date. Check out the [sample workflow execution that runs this switch case](https://play.orkes.io/execution/9be8fb4d-e991-11ed-bb41-9e017806b678) in our playground.