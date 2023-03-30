import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Passing Data from Task to Task

The inputs to a task can be provided in multiple ways. It can be supplied as workflow inputs or from the preceding task output, or we can even provide hard-coded inputs. 

## Task Inputs referred from Workflow Inputs​

The first method is providing inputs to the task via workflow input. Here the inputs provided via the workflow are evaluated as the task inputs.
When we start a workflow, we can provide inputs to the workflow in a JSON format like this:

```json
{
  "worfklowInputNumberExample": 1,
  "worfklowInputTextExample": "SAMPLE",
  "worfklowInputJsonExample": {
    "nestedKey": "nestedValue"
  }
}
```

We can refer to these values as inputs to the task using the following expression:

```json
{
 "taskInput1Key": "${workflow.input.worfklowInputNumberExample}",
 "taskInput2Key": "${workflow.input.worfklowInputJsonExample.nestedKey}"
}
```

So, here the task will receive the following inputs from the workflow:

```json
{
 "taskInput1Key": 1,
 "taskInput2Key": "nestedValue"
}
```

## Task Inputs referred from other Task Outputs

The next method is to take inputs from the preceding task’s output. Let’s assume that a task with the task reference name **previousTaskReference** produced the following output:

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

So, here the task will receive the following inputs from the previous task:

```json
{
 "taskInput1Key": "outputValue",
 "taskInput2Key": "outputValue-1"
}
```

## Hard Coded Inputs​​

Apart from referring from the workflow inputs / other task outputs, we can also provide hard-coded inputs in the workflow definition. This becomes useful when we have a reusable task with configurable options that can be applied in different workflow contexts.

```json
{
 "taskInput1": "OPTION_A",
 "taskInput2": 100
}
```