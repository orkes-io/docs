---
sidebar_position: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set Variable

The Set Variable task allows you to create workflow variables or update them with new values. The task is used to track a shared variable at the workflow level across tasks, and these variables can be accessed or overwritten in any subsequent task in the workflow.

Variables can be initialized and updated at any point in the workflow. Once a variable is initialized, it can be accessed in any subsequent task using the expression `${workflow.variables.variableName}` (replacing variableName with the actual variable name). Initialized values can be overwritten by a subsequent Set Variable task.

## Task configuration
To configure the Set Variable task, set your desired variables and their respective values in `inputParameters`. The values can be set in two ways:
- Hard-coded in the workflow definition, or
- A variable input that is defined in real-time during workflow execution.

## Task definition

This is the JSON schema for a Set Variable task definition.

```json
{
  "name": "set_variable",
  "taskReferenceName": "set_variable_ref",
  "type": "SET_VARIABLE",
  "inputParameters": {
    "variableName": "value"
  }
}
```

## Adding a Set Variable task in UI
**To add a Set Variable task:**
1. In your workflow, select the **(+)** icon and add a **Set Variable** task.
2. In **Variables**, add the desired workflow variables that will be initialized or replaced with a new value.
3. For each workflow variable, configure the following:
    - **Type**—the variable type, which can be a string, number, boolean, null, or object/array.
    - **Key**—the variable name.
    - **Value**—the variable value, which can be a variable input (for example, `${workflow.input.someKey}`) or a hard-coded value.

<p><img src="/content/img/ui-guide-set-variable.png" alt="Adding set variable" /></p>

## Examples

Here are some examples for using the Set Variable task.

<details><summary>Using the Set Variable task in a workflow</summary>
<p>
In this example workflow, a username is stored as a variable so that it can be reused in other tasks that require the username.

```json
// workflow definition

{
  "name": "Welcome_User_Workflow",
  "description": "Designate a user to be welcomed",
  "tasks": [
    {
      "name": "set_name",
      "taskReferenceName": "set_name_ref",
      "type": "SET_VARIABLE",
      "inputParameters": {
        "name": "${workflow.input.userName}"
      }
    },
    {
      "name": "greet_user",
      "taskReferenceName": "greet_user_ref",
      "inputParameters": {
        "var_name" : "${workflow.variables.name}"
      },
      "type": "SIMPLE"
    },
    {
      "name": "send_reminder_email",
      "taskReferenceName": "send_reminder_email_ref",
      "inputParameters": {
        "var_name" : "${workflow.variables.name}"
      },
      "type": "SIMPLE"
    }
  ]
}
```
In the example above, `set_name` is a Set Variable Task that takes a variable input for `name`. In subsequent tasks, the `name` is later referenced using `${workflow.variables.name}`.
</p>
</details>