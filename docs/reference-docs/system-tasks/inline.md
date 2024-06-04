---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Inline 

The inline task helps execute necessary logic at the workflow run-time using an evaluator. The two supported evaluator types are javascript and graaljs.

## Definitions
```json
    {
      "name": "inline_task_example",
      "taskReferenceName": "inline_task_example_ref",
      "type": "INLINE",
      "inputParameters": {
        "expression": "(function () {\n  return $.value1 + $.value2;\n})();",
        "evaluatorType": "graaljs",
        "value1": 1,
        "value2": 2
      }
    }
```

### Input Parameters

| Attribute     | Desciption                                                                                                                                                                                                                                                                            |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| evaluatorType | Choose the type of evaluator. Supported evaluators are **graaljs** & **javascript**. Graaljs evaluates the expression using graaljs, and javascript evaluates the expression using nashorn to compute the value.                                                                      |
| expression    | Indicates the expression associated with the type of evaluator. For the javascript evaluator, the Javascript evaluation engine is used to evaluate the expression defined as a string. It must return a value. For the graaljs evaluator, graalvm is used to evaluate the expression. |

Besides the expression, any of the properties in the input values is accessible as **$.value** for the expression to evaluate.

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Inline`.
2. Write the inline script using Javascript.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-inline-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
    {
      "name": "inline_task_example",
      "taskReferenceName": "inline_task_example_ref",
      "type": "INLINE",
      "inputParameters": {
        "expression": "(function () {\n  return $.value1 + $.value2;\n})();",
        "evaluatorType": "graaljs",
        "value1": 1,
        "value2": 2
      }
    }
```

</TabItem>
</Tabs>

:::tip
The JSON definition shows a string format of the script; however, on the UI, it will retain the formatting we used and is more readable.
:::
