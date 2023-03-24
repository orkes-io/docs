import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set Variable

Set Variable allows you to set the workflow variables by creating or updating them with new values.

## Configurations

```json
{
      "name": "set_variable",
      "taskReferenceName": "set_variable_task_ref",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "some keys": "some keys"
      }
    }
```

### Input Parameters

**Variables** - The variables can be initialized in the workflow definition as well as during the workflow run. Once a variable is initialized, it can be read or overwritten with a new value by any other task. Variables can be used to manage a state across all your tasks.

## Examples​

<Tabs>
<TabItem value="JSON" label="JSON">

```json
{
     "name": "Set_Name",
     "taskReferenceName": "Set_Name_ref",
     "type": "SET_VARIABLE",
     "inputParameters": {
       "name": "Orkes"
     }
   },
```
</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
<TabItem value="Javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
<p>
Suppose in a workflow, we have to store a value in a variable and then, later in the workflow, reuse the value stored in the variable just as we do in programming; in such scenarios, the <i><b>Set Variable</b></i> task can be used<br/>

<br/>Following is the workflow definition with the SET_VARIABLE task.

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
  ],
}
```

The above example shows that the task **Set_Nam**e is a Set Variable Task, and the variable name is set to **Orkes**. Later in the workflow, it is referenced by **${workflow.variables.name}** in another task.
</p>
</details>