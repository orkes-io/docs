import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Passing Data in Conductor

The data can be passed to a task in different ways, such as from workflow inputs/outputs, task inputs/outputs, variables, and secrets.

Let’s take a look at how the data transfer process occurs.

## Expression

The task inputs are evaluated using the following expression:

```json
"a": "${x.y.z}"
```
Let’s break down the expression:

* **a** - A string that represents the name of a task property.
* **“${...}”** - A notation that indicates the variable that would be dynamically replaced at run time.
* **x** - Since the task input can be taken from either workflows or other tasks, x can take 2 values: **workflow** & **task_reference_name**. A workflow is an object that represents the current workflow, whereas **task_reference_name** is the reference name of the task from which the parameter is to be passed.
* **y** - y can take 4 values.<ul><li>**input** - If the task input is taken from workflow/other task inputs, then y takes the value “input”.</li><li>**output** - If the task input is taken from workflow/other task outputs, then y takes the value “output”.
**variables** - If the task input is taken from previously stored variables (via Start Variable task), then y takes the value “variables”.</li><li>**secrets** - If the task input is taken from stored secrets in Conductor, then y takes the value “secrets”.</li></ul>
* **z** - If we are referring to the input/output parameters of the tasks/workflows, z can take the JSONpath expression. And if we are referring to variables/secrets, z can take the variable/secret name.

Let’s take a look at the expression in different cases.

<Tabs>
<TabItem value="Case 1" label="Case 1">
If the task inputs are taken from workflow inputs, 

```json
"key": "${workflow.input.somekey}"
```
In summary, this expression defines a property called **key**, with a value that is replaced dynamically for the specific input parameter provided to the current workflow. On executing the workflow, the notation **“${...}”** will be replaced by the actual value of “somekey” input parameter from the workflow input.

:::note
Similarly, you can also refer to values from workflow outputs.
:::
</TabItem>
<TabItem value="Case 2" label="Case 2">
If the task inputs are taken from the preceding task output,

```json
"key": "${task_reference_name.output.somekey}"
```

In summary, this expression defines a property called **key**, with a value that is replaced dynamically for a specific output parameter produced from the previous task. On executing the workflow, the notation **“${...}”** will be replaced by the actual value of “somekey” output parameter from the referenced task.

:::note
Similarly, you can also refer to values from task inputs.
:::
</TabItem>
<TabItem value="Case 3" label="Case 3">
If the task inputs are taken from a secret, 

```json
"key": "${workflow.secrets.your_secret_name_stored_in_conductor}"
```

In summary, this expression defines a property called **key**, with a value that is replaced dynamically with the secret name. On executing the workflow, the notation **“${...}”** will be replaced by the referenced secret value stored.
</TabItem>
<TabItem value="Case 4" label="Case 4">
If the task inputs are taken from variables,

```json
"key": "${workflow.variables.variable_name}"
```

In summary, this expression defines a property called **key**, with a value that is replaced dynamically with the variable name. On executing the workflow, the notation **“${...}”** will be replaced by the referenced variable name stored.
</TabItem>
</Tabs>

## Examples

<details><summary>Task Inputs referred from Workflow Inputs​​</summary>
When we start a workflow, we can provide inputs to the workflow in a JSON format like this:

```json

{
 "workflowInputNumberExample": 1,
 "workflowInputTextExample": "SAMPLE",
 "workflowInputJsonExample": {
   "nestedKey": "nestedValue"
 }
}
```

We can refer to these values as inputs to the task using the following expression:

```json
{
"taskInput1Key": "${workflow.input.worfklowInputNumberExample}",
"taskInput2Key": "${workflow.input.workflowInputJsonExample.nestedKey}"
}
```

On evaluating the first expression,

```json
"taskInput1Key": "${workflow.input.workflowInputNumberExample}"
```

* `"${workflow.input.workflowInputNumberExample}"`- Refers to the workflow input parameter **workflowInputNumberExample**.

In the workflow input, the value of **workflowInputNumberExample** is 1, so the value of **taskInput1Key** in this example is also 1.

Similarly, evaluating this expression **"taskInput2Key": "${workflow.input.workflowInputJsonExample.nestedKey}"** would result in **"taskInput2Key": "nestedValue"**.
So, the input to the task referred from the workflow input looks like this:
```json
{
"taskInput1Key": 1,
"taskInput2Key": "nestedValue"
}
```
</details>

<details><summary>Task Inputs referred from other Task Outputs​​​</summary>

Let’s assume that a task with the task reference name **previousTaskReference** produced the following output:

```json
{
"taskOutputKey1": "outputValue",
"taskOutputKey2": {
  "nestedKey1": "outputValue-1"
}
}
```

We can refer to these values as inputs to our new task using the following expression:

```json
{
"taskInput1Key": "${previousTaskReference.output.taskOutputKey1}",
"taskInput2Key": "${previousTaskReference.output.taskOutputKey2.nestedKey1}"
}
```
The above expression can be evaluated using the same mechanism explained above, and finally, the task will receive the following inputs from the previous task output:

```json
{
"taskInput1Key": "outputValue",
"taskInput2Key": "outputValue-1"
}
```

:::info
The expression format is based on [JSON Path](https://goessner.net/articles/JsonPath/) and you can construct complex input params based on the syntax.
:::

</details>

<details><summary>Task Inputs referred from Secrets​​</summary>

Let’s assume that a secret named “api_key” is stored on your Conductor console, and you need to refer to this secret. The sample expression can look like this:

```json
"taskInputKey": "${workflow.secrets.api_key}"
```

If the “api_key” has value “Xxhhjiu0nbfdinvdHyj”. Then the task input becomes:

```json
"taskInputKey": "Xxhhjiu0nbfdinvdHyj"
```
:::note
Referring to task inputs using the secret functionality ensures that your secrets are not exposed in the workflow definitions; instead, it takes the value dynamically while executing the workflow.
:::
</details>

<details><summary>Task Inputs referred from Variables​</summary>

If the variable name is stored via the Set Variable task, the JSON looks like this:

```json
     "name": "set_variable_task_anmz4_ref",
     "taskReferenceName": "set_variable_task_anmz4_ref",
     "inputParameters": {
       "name": "Orkes"
     },
     "type": "SET_VARIABLE",
```

So, here the variable “name” is set to “Orkes”.  We can refer to this variable in the same workflow as follows:

```json
"variable_name": "${workflow.variables.name}"
```

This results in **"variable_name": "Orkes"**.
</details>

## FAQs

**1. Why do I get JSONPath error messages?**

JSONPath error messages occur when there is an issue with the JSON expression due to incorrect syntax or an invalid path. 

**2. What happens when an incorrect task reference name is provided in the JSON expression?**

The task reference names should be unique in a workflow. You may get errors while executing the workflow if you have provided an incorrect task reference name.

**3. What happens if my JSONPath expression is incorrect?**

Incorrect JSONPath expressions may result in a null value instead of the expected output.

**4. How can I check if the data was passed correctly?**

You can verify if the data was passed correctly by checking the input/output fields of the task. 

**5. Can I hard code inputs?**

Yes, you can provide hard-coded inputs. This becomes useful when you have a reusable task with configurable options that can be applied in different workflow contexts.

**6. When should I use Set Variables (Global Variables)?**

Set Variable can be used when you need to store a variable and use it later across different tasks & workflows. 
