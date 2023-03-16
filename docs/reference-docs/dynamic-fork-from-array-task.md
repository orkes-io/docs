---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Fork Task - Using Arrays

```json
"type" : "FORK_JOIN_DYNAMIC"
```

## Introduction

The dynamic fork is a powerful feature in Conductor that can be used to run parallel executions of the task with dynamism. Think of this as Conductor’s equivalent of stream parallel processing in Java:

```java
arrayItems.stream().parallel().forEach(item -> process(item));
```

Here each item of the array is passed to a method called process.

Conductor allows you to do the same and covers several types of processes.

1. Simple Task - When we need to run a simple custom worker task
2. [HTTP Task](./system-tasks/http-task) - When we need to run the system HTTP workers
3. [Sub Workflows](./sub-workflow-task) - Use this when we want to run more than one task or a series of steps that can be a full-fledged complex flow
4. Other Conductor Task Types - This can also be used for other task types such as EVENT, HUMAN, etc.

### Running Simple Tasks using Dynamic Fork

Run a simple task for each of the inputs provided

| Parameter Name | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| forkTaskName   | Specify the name of the simple task to execute                   |
| forkTaskInputs | Array of inputs - a task will be executed for each of the inputs |

In this example, each task will be executed with the following input:

```json
{
  "inputText": "value1",
  "inputNumber": 1,
  "index": 0 // Added by the system to represent the array index for the object
}
```

**Example:**

```json
{
  "name": "dynamic_workflow_array_simple",
  "description": "Dynamic workflow array - run simple task",
  "version": 1,
  "tasks": [
    {
      "name": "dynamic_workflow_array_simple",
      "taskReferenceName": "dynamic_workflow_array_simple_ref",
      "inputParameters": {
        "forkTaskName": "update_fruit_list_task",
        "forkTaskInputs": [
          {
            "inputText": "value1",
            "inputNumber": 1
          },
          {
            "inputText": "value2",
            "inputNumber": 2
          },
          {
            "inputText": "value3",
            "inputNumber": 3
          }
        ]
      },
      "type": "FORK_JOIN_DYNAMIC",
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "dynamic_workflow_array_simple_join",
      "taskReferenceName": "dynamic_workflow_array_simple_join_ref",
      "type": "JOIN"
    }
  ],
  "schemaVersion": 2,
  "ownerEmail": "boney@orkes.io"
}
```

| [Run it in Orkes Playground](https://play.orkes.io/workflowDef/dynamic_workflow_array_simple) |
| --------------------------------------------------------------------------------------------- |

We can also use simple values or a mix of complex and simple objects.

```json
["apple", "orange", "kiwi"]
```

When using simple values, it will be passed with the key input and an index representing the element's index in the array.

```json
{
  "input": "apple", // Value
  "index": 0 // Index of the element
}
```

### Running HTTP Tasks using Dynamic Fork

To run HTTP, we will use the same parameters as running SIMPLE tasks as shown above and the value of

`forkTaskName` will be `HTTP`

and the inputs you provide will be what the HTTP task expects.

:::tip
`method` has a default value of `GET` and need not be specified if the HTTP call is a `GET`
:::

**Example:**

```json
{
  "name": "dynamic_workflow_array_http",
  "description": "Dynamic workflow array - run HTTP tasks",
  "version": 1,
  "tasks": [
    {
      "name": "dynamic_workflow_array_http",
      "taskReferenceName": "dynamic_workflow_array_http_ref",
      "inputParameters": {
        "forkTaskName": "HTTP",
        "forkTaskInputs": [
          {
            "url": "https://orkes-api-tester.orkesconductor.com/get"
          },
          {
            "url": "https://orkes-api-tester.orkesconductor.com/get",
            "method": "GET"
          }
        ]
      },
      "type": "FORK_JOIN_DYNAMIC",
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "dynamic_workflow_array_http_join",
      "taskReferenceName": "dynamic_workflow_array_http_join_ref",
      "type": "JOIN"
    }
  ],
  "schemaVersion": 2,
  "ownerEmail": "boney@orkes.io"
}
```

| [Run it in Orkes Playground](https://play.orkes.io/workflowDef/dynamic_workflow_array_http) |
| ------------------------------------------------------------------------------------------- |

### Running Sub Workflows using Dynamic Fork

Run a sub-workflow for each of the inputs provided

| Parameter Name          | Description                                                      |
| ----------------------- | ---------------------------------------------------------------- |
| forkTaskWorkflow        | Specify the name of the sub-workflow to execute                  |
| forkTaskWorkflowVersion | Optional version of the workflow to run                          |
| forkTaskInputs          | Array of inputs - a task will be executed for each of the inputs |

:::note
`forkTaskWorkflow` - when this value is present, Conductor treats this as a dynamic fork that runs sub workflows
:::

**Example:**

```json
{
  "name": "dynamic_workflow_array_sub_workflow",
  "description": "Dynamic workflow array - run sub workflow tasks",
  "version": 1,
  "tasks": [
    {
      "name": "dynamic_workflow_array_sub_workflow",
      "taskReferenceName": "dynamic_workflow_array_sub_workflow_ref",
      "inputParameters": {
        "forkTaskWorkflow": "extract_user",
        "forkTaskInputs": [
          {
            "input": "value1"
          },
          {
            "input": "value2"
          }
        ]
      },
      "type": "FORK_JOIN_DYNAMIC",
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "dynamic_workflow_array_sub_workflow_join",
      "taskReferenceName": "dynamic_workflow_array_sub_workflow_join_ref",
      "type": "JOIN"
    }
  ],
  "schemaVersion": 2,
  "ownerEmail": "boney@orkes.io"
}
```

| [Run it in Orkes Playground](https://play.orkes.io/workflowDef/dynamic_workflow_array_sub_workflow) |
| --------------------------------------------------------------------------------------------------- |
