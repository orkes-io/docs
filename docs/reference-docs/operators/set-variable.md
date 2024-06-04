---
sidebar_position: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set Variable

Set Variable allows us to set the workflow variables by creating or updating them with new values. Think of these as a temporary state, which you can set in any step and refer back to any steps that execute after setting the value.

## Definitions

```json
    {
      "name": "set_variable",
      "taskReferenceName": "set_variable_task_ref",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "variableName": "value"
      }
    }
```

### Input Parameters

**Variables** - The variables can be initialized in the workflow definition as well as during the workflow run. Once a variable is initialized, it can be read or overwritten with a new value by any other task. Variables can be used to manage a state across all your tasks.

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Set Variable`.
2. Add the parameters to initialize or replace with values.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-set-variable.png" alt="Adding set variable" width="560" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

```json
    {
      "name": "set_variable_example",
      "taskReferenceName": "set_variable_example_ref_1",
      "inputParameters": {
        "organizationName": "${workflow.input.name}",
        "anotherValue": "Hard Coded",
        "objectValue": {
          "sampleKey": "sampleValue"
        }
      },
      "type": "SET_VARIABLE"
    }
```

</TabItem>
</Tabs>


<details><summary>Sample Workflow - Set and Read Variables</summary>
<p>
Suppose in a workflow, we have to store a value in a variable and then, later in the workflow, reuse the value stored in the variable just as we do in programming; in such scenarios, the <i><b>Set Variable</b></i> task can be used.
<br/><br/>

Following is the workflow definition with the SET_VARIABLE task.

```json
{
  "name": "Set_Variable_Workflow",
  "description": "Set a value to a variable and then reuse it later in the workflow",
  "tasks": [
    {
      "name": "Set_Name",
      "taskReferenceName": "Set_Name",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "name": "Orkes"
      }
    },
    {
      "name": "Read_Name",
      "taskReferenceName": "Read_Name",
      "inputParameters": {
        "var_name" : "${workflow.variables.name}"
      },
      "type": "SIMPLE"
    }
  ]
}
```

The above example shows that the task **Set_Name** is a Set Variable Task, and the variable name is set to **Orkes**. Later in the workflow, it is referenced by **${workflow.variables.name}** in another task.
</p>
</details>