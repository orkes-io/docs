---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Switch Task

```json
"type" : "SWITCH"
```

The switch task is used for creating branching logic. It is a representation of multiple **if...then...else** or **switch...case** statements in programming.

## Configurations

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
* The expression can be a **javascript** expression of a value parameter which represents the input to the task directly.

### Input Parameters

| Attribute     | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| evaluatorType | Indicates the type of evaluator used. Supported types are **value-param**, **javascript**, and **graaljs**.                                                                                                |
| expression    | The expression depends on the evaluator type. For the **value-param** evaluator, the expression is the input parameter; for the **javascript** and **graaljs** evaluator, it is the javascript expression. |
| decisionCases | Map where the key is possible values that can result from the **expression**, with the value being the list of tasks to be executed.                                                                       |
| defaultCase   | List of tasks to be executed when no matching value is found in decision case (default condition).                                                                                                         |

#### Types of Evaluators
| Attribute   | Description                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------- |
| value-param | Use a parameter directly as the value.                                                              |
| javascript  | Evaluate Javascript expressions and compute the value - Legacy.  Deprecated.                        |
| graaljs     | Evaluate Javascript expressions and compute the value. Allows you to use ES6 compatible Javascript. |


## Examples

Workflow with the switch task definition that uses **value-param** evaluatorType:

<Tabs>
<TabItem value="JSON" label="JSON">

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

</TabItem>
<TabItem value="Java" label="Java">

```java
new Switch(
  String taskReferenceName, 
  String caseExpression
)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
workflow.NewSwitchTask(
  taskRefName string, 
  caseExpression string,
) *SwitchTask
```

</TabItem>
<TabItem value="Python" label="Python">

```python
conductor.client.workflow.task.SwitchTask(
  task_ref_name: str, 
  case_expression: str, 
  use_javascript: bool = False
)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
Conductor.Definition.TaskType.SwitchTask(
  string taskReferenceName, 
  string caseExpression, 
  bool useJavascript = false
)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>

<details><summary>Using Javascript expressions</summary>
<p>

When using **javascript** or **graaljs** as the evaluator type, the expression can be a javascript expression that returns a string.

The input to the tasks is available as the variables inside the **$** scope within the script.

```json
{
  "inputParameters": {
      "service": "${workflow.input.service}"
  },
  "expression": "$.service == 'fedex' ? 'fedex' : 'ups'",
}

```
</p>
</details>

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

:::tip Switch task with other operators
Similar to any programming language, you can have other operators inside a switch case, such as nested switch, loops, forks, etc.
:::