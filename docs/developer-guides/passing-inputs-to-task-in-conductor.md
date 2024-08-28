import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Dynamic Task Inputs

When you start a Conductor workflow, you can pass inputs to the workflow - which can be used as parameters for various steps in the workflow. As the tasks progress in a workflow - each task will create its own outputs. So how can this data from previous tasks be used in the steps succeeding it? In Conductor, data can be passed to a task in different ways, such as from workflow inputs/outputs, prior task inputs/outputs, variables, and secrets.

Let’s take a look at how to define this.

## Expression

The task inputs are evaluated using the following expression:

export const text = `"variableName" : "\${type.subtype.jsonpath}"`;

<div className="passingDataReference">
    {text}
</div>


Let’s break down this __expression__:

| Attribute | Description |
| -- | -- |
|**variableName**|A string that represents the variable name you want to assign this expression output.|
|**${...}**|A notation that indicates the variable that would be dynamically replaced at run time.|
|**type**|One of the following options:<table><tr><td>__workflow__ : Refers to the workflow instance</td></tr><tr><td>__task_reference_name__ : Refers to a task in a workflow by its reference name</td></tr></table>|
|**subtype**|One of the following options:<table><tr><td>__input__ : Refers to the input of the `type` = (`workflow` or `task-ref`)</td></tr><tr><td>__output__ : Refers to the output of the `type` = (`workflow` or `task-ref`)</td></tr><tr><td>__secrets__ : Refers to secrets in the system, accessed with `type` = `workflow`</td></tr><tr><td>__variables__ : Refers to variables of the workflow, accessed with `type` = `workflow`</td></tr></table>|
|**jsonpath**|[JSONPath](https://goessner.net/articles/JsonPath/) expression (look for examples below). If we are referring to variables/secrets, this will be the variable/secret name.|

## Sample Expressions

<Tabs className={"headerFix"}>
<TabItem value="Workflow Inputs" label="Workflow Inputs" className={"paddedContent"}>

If the task inputs are taken from workflow inputs,

```json
"key": "${workflow.input.somekey}"
```

This expression defines a property called **key**, with a value derived from the input parameter __somekey__ provided to the current workflow.

</TabItem>
<TabItem value="Task Outputs" label="Task Outputs"  className={"paddedContent"}>
If the task inputs are taken from the preceding task output,

```json
"key": "${task_reference_name.output.somekey}"
```

In summary, this expression defines a property called **key**, with a value derived from the output parameter __somekey__ from a task with reference __task_reference_name__.
This value cannot be run under the following situations:
* Task with the reference specified doesn't exist
* Task has not executed when this reference was looked up
* Task didn't produce this output value

</TabItem>
<TabItem value="Secrets" label="Secrets"  className={"paddedContent"}>
If the task inputs are taken from a secret,

```json
"key": "${workflow.secrets.your_secret_name_stored_in_conductor}"
```

In summary, this expression defines a property called **key**, with a value that is replaced dynamically with the secret value for name __your_secret_name_stored_in_conductor__. This value cannot be run under the following situations
* Secret does not exist

During execution, if the workflow doesn't have permission to read the secret, it will fail with an error saying so.
</TabItem>
<TabItem value="Workflow Variables" label="Workflow Variables"  className={"paddedContent"}>
If the task inputs are taken from variables,

```json
"key": "${workflow.variables.variable_name}"
```

In summary, this expression defines a property called **key**, with a value that is replaced dynamically with the variable name __variable_name__. This value cannot be run under the following situations:
* Variable does not exist

</TabItem>
</Tabs>

Depending on the context from where the data is being passed, the expression can take the following variants:

| Workflow Attribute | Description |
| ------------------ | ----------- |
| input | **${workflow.input.somevalue}** <br/>If the workflow has an input parameter “**_somevalue_**”, then the same parameter can be referred to using this expression.|
| output | **${workflow.output.somevalue}** <br/>If the workflow has an output parameter “**_somevalue_**”, then the same parameter can be referred to using this expression.|
| status | **${workflow.status}** <br/>This expression can be used when you want to check the workflow status and proceed. The possible values the expression can return are _RUNNING, PAUSED, TIMED_OUT, TERMINATED, FAILED,_ or _COMPLETED_.|
| workflowId | **${workflow.workflowId}** <br/>This expression can be used when you need to retrieve the workflowId of the current workflow.|
| parentWorkflowId | **${workflow.parentWorkflowId}** <br/>This expression can be used in the sub-workflows to retrieve the workflowId of the parent workflow.|
| parentWorkflowTaskId | **${workflow.parentWorkflowTaskId}** <br/>This expression can be used in the sub-workflows to retrieve the subworkflow’s task execution Id in the parent workflow.|
| workflowType | **${workflow.workflowType}** <br/>This expression can be used to retrieve the workflow name.|
| version | **${workflow.version}** <br/>This expression can be used when you need to retrieve the version of the current workflow.|
| correlationId | **${workflow.correlationId}** <br/>This expression can be used when you need to retrieve the correlationId provided to the current workflow instance.|
| schemaVersion | **${workflow.schemaVersion}** <br/>This expression can be used to retrieve the schema version of the current workflow.|
| variables | **${workflow.variables.variable_name}** <br/>This expression is used when a variable name is already stored in the workflow definition, and you need to retrieve the variable name in the preceding tasks.|
| createTime | **${workflow.createTime}** <br/>This expression can be used to retrieve the workflow execution time.|
| secrets | **${workflow.secrets.secret_name}** <br/>This expression can be used to retrieve the secret values without exposing them directly in the workflow definitions. Referring using this expression ensures that it takes the value dynamically while executing the workflow.|
| taskToDomain | **${workflow.taskToDomain.domain_name}** <br/>This expression can be used to retrieve the domain name used while invoking the workflow.|

## Detailed Examples

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

:::tip
The expression format is based on [JSON Path](https://goessner.net/articles/JsonPath/) and you can construct complex input params based on the syntax.
:::

</details>

<details><summary>Task Inputs referred from Secrets​​</summary>

Let’s assume that a secret named “api_key” is stored on your Conductor console, and you need to refer to this secret. The sample expression can look like this:

```json
"taskInputKey": "${workflow.secrets.api_key}"
```

If the `api_key` has value `Xxhhjiu0nbfdinvdHyj`. Then the task input becomes:

```json
"taskInputKey": "Xxhhjiu0nbfdinvdHyj"
```
:::tip
Referring to task inputs using the secret functionality ensures that your secrets are not exposed in the workflow definitions; instead, it takes the value dynamically while executing the workflow.
:::
</details>

<details><summary>Task Inputs referred from Variables​</summary>

If the variable name is stored via the [Set Variable](/content/reference-docs/operators/set-variable) task, the JSON looks like this:

```json
     "name": "set_variable_task_anmz4_ref",
     "taskReferenceName": "set_variable_task_anmz4_ref",
     "inputParameters": {
       "name": "Orkes"
     },
     "type": "SET_VARIABLE",
```

So, here the variable `name` is set to `Orkes`.  We can refer to this variable in the same workflow as follows:

```json
    "variable_name": "${workflow.variables.name}"
```

This results in **"variable_name": "Orkes"**.
</details>

## Task Input Templates

While creating task definitions, you can define the task input templates. These values will be supplied to each execution of the task and can be overridden within the workflow. It means that the parameters are included in the task definition, and whenever the task is used in a workflow, these parameters would be included by default in the workflow.

While [creating a task definition](/content/reference-docs/api/metadata/creating-task-definitions), you can define the task input template as follows:

Using UI forms:

<p align="center"><img src="/content/img/task-input-template-in-task-definition.png" alt="Task input template in task definition" width="70%"
                       height="auto"/></p>

Using JSON code:

```json
{
 "name": "test-task",
 "description": "Edit or extend this sample task. Set the task name to get started",
 "retryCount": 3,
 "timeoutSeconds": 3600,
 "inputKeys": [],
 "outputKeys": [],
 "inputTemplate": {
   "key": "value"
 },
 "ownerEmail": "name@example.com"
}
```

Adding this task to the workflow definition would already include the parameters supplied via the input task template.

<p align="center"><img src="/content/img/workflow-definition-with-task-input-template.png" alt="Workflow definition with task input template supplied already" width="90%"
                       height="auto"/></p>

These values can also be overridden by supplying input parameters to the task in the workflow definition.

<p align="center"><img src="/content/img/overriding-values.png" alt="Overriding task input template parameters from Workflow definition" width="90%"
                       height="auto"/></p>

Here, initially, some **“key”** were supplied through input templates. Now, when the same **“key”** was provided as input parameters in the workflow definition, the values got overridden. 

:::note
You cannot view the input templates in the workflow definition JSON code as they are part of only task definitions. But, on clicking the task, you can view the input templates supplied from the UI. 
:::

<FAQStructuredData faqs={faqs} />

import FAQStructuredData from '../../src/theme/FAQStructuredData';

export const faqs = [
  {
    question: 'Why do I get JSONPath error messages?',
    answer:
      "JSONPath error messages occur when there is an issue with the JSON expression due to incorrect syntax or an invalid path.",
  },
  {
    question: 'What happens when an incorrect task reference name is provided in the JSON expression?',
    answer:
      'The task reference names should be unique in a workflow. You may get errors while executing the workflow if you have provided an incorrect task reference name.',
  },
  {
    question:
      'What happens if my JSONPath expression is incorrect?',
    answer: 'Incorrect JSONPath expressions may result in a null value instead of the expected output.',
  },
  {
    question:
      'How can I check if the data was passed correctly?',
    answer: 'You can verify if the data was passed correctly by checking the input/output fields of the task.',
  },
  {
    question:
      'Can I hard code inputs?',
    answer: 'Yes, you can provide hard-coded inputs. This becomes useful when you have a reusable task with configurable options that can be applied in different workflow contexts.',
  },
  {
    question:
      'When should I use Set Variables (Global Variables)?',
    answer: 'Set Variable can be used when you need to store a variable and use it later across different tasks & workflows.',
  },
];

