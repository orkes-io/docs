---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Inline 

Inline tasks enable the execution of essential logic during workflow runtime by evaluating a JavaScript expression using an evaluator like GraalJS.

## Definitions
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

### Input Parameters

| Attribute | Description |
| --------- | ----------- |
| expression | Specifies the JavaScript expression to be evaluated by the GraalJS evaluator. | 
| evaluatorType | Supports GraalJS evaluator. | 
| Script params | Provide the parameters for evaluating the script. Any properties can be accessed as **$.value** for the expression to evaluate. | 

### Output Parameters

| Attribute | Description |
| --------- | ----------- |
| result | Returns the results of the evaluated script. | 

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Inline**.
2. Write the inline ECMAScript.

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

</TabItem>
</Tabs>

:::info
The JSON definition provides a concise string representation of the script. In contrast, the UI representation typically includes formatted indentation and line breaks for better user readability.
:::
