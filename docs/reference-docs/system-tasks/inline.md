---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Inline 

The inline task is used to execute scripting logic during workflow runtime by evaluating a JavaScript expression using an evaluator like graalJS. 

## Task configuration

Configure these parameters for the Inline task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**expression** | The JavaScript expression to be evaluated by the GraalJS evaluator. |  Required. | 
| inputParameters.**evaluatorType** | The type of evaluator used. Supported types:<ul><li>`graaljs` - Evaluates the Javascript expression and computes the value.</li></ul> |  Required. | 
| inputParameters | The parameters for evaluating the script. Any property can be accessed as `$.value` for the expression to evaluate. | Required. | 

## Task definition

This is the JSON schema for an Inline task definition.

```json
{
     "name": "inline",
     "taskReferenceName": "inline_ref",
     "type": "INLINE",
     "inputParameters": {
       "expression": "(function () {\n  return $.value1 + $.value2;\n})();",
       "evaluatorType": "graaljs",
       "value1": 1,
       "value2": 2
     }
   }
```

## Task output

The Inline task will return the following parameters.

| Parameter | Description | 
| --------- | ----------- | 
| result | Returns the results of the evaluated script. | 

## Adding an Inline task in UI

**To add an Inline  task:**

1. In your workflow, select the (**+**) icon and add an **Inline** task.
2. In **Script params**, add the parameters that will be evaluated in the expression.
3. Enter the expression to be evaluated in the **Code** section. The JSON definition offers a concise string representation of the script, whereas the UI representation typically incorporates formatted indentation and line breaks to enhance user readability.

<center><p><img src="/content/img/ui-guide-inline-task.png" alt="Adding wait task" width="80%" height="auto"/></p></center>


