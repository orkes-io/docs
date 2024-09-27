---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Fork

The Dynamic Fork task is used to run tasks in parallel, with the forking behavior (such as the number of forks) determined at run-time. This contrasts with the Fork/Join task, where the forking behavior is defined at workflow creation. Like the Fork/Join task, the Dynamic Fork task is followed by a join operation that waits on the forked tasks to finish before moving to the next task. This Join task collects the outputs from each forked task.

Unlike the Fork/Join task, a Dynamic Fork task can only run one task per fork. A sub-workflow can be utilized if there is a need for multiple tasks per fork.

There are two ways to run the Dynamic Fork task:
* **Each fork runs a different task**—Use `dynamicForkTasksParam` and `dynamicForkTasksInputParamName`.
* **All forks run the same task**—Use `forkTaskName` and `forkTaskInputs` for any task type, or `forkTaskWorkflow` and `forkTaskInputs` for Sub Workflow tasks.


## Task configuration

Configure these parameters for the Dynamic Fork task. The input payload for the forked tasks should correspond with its expected input. For example, if the forked tasks are HTTP tasks, its input should include the method and URI.

**For the Fork task:**

<Tabs>
<TabItem value="Config-Different tasks" label="For different tasks">

The dynamic fork executes each task in the array specified by `dynamicForkTasksParam` with its corresponding input specified by `dynamicForkTasksInputParamName`. The number of forks created at runtime depends on the array of tasks specified.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| dynamicForkTasksParam | The input parameter key whose value will be used to schedule each task on a different fork. For example, "dynamicTasks", which will then be specified as an input parameter in the Dynamic Fork task. | Required. |
| inputParamters. **dynamicTasks**    | An array of tasks that will run in parallel. Each array element is a task definition that corresponds to a separate fork branch. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. |
| dynamicForkTasksInputParamName | The input parameter key whose value will be used to pass the required input parameters for each forked task. For example, "dynamicTasksInput", which will then be specified as an input parameter in the Dynamic Fork task.  | Required. |
| inputParameters. **dynamicTasksInput**   | A map where the keys are the task reference names for each fork and the values are the input parameters that will be passed into its matching task. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).    | Required. |

</TabItem>

<TabItem value="Config-Same task any" label="For the same task (any task type)">

The dynamic fork executes the task specified by `forkTaskName` for each element of `forkTaskInputs`. The number of forks created at runtime depends on the number of `forkTaskInputs` sent. Configure these parameters to execute any task type except Sub Workflow tasks.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParamters. **forkTaskName**    | The name of the task that will be executed in each fork. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). | Required. |
| inputParameters. **forkTaskInputs**   | An array of JSON inputs for each forked branch. The number of array elements determines the number of branches in the dynamic fork. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).    | Required. |

</TabItem>

<TabItem value="Config-Same task sub-workflow" label="For the same task (sub-workflows)">

The dynamic fork executes the workflow specified by `forkTaskWorkflow` and `forkTaskWorkflowVersion` for each element of `forkTaskInputs`. The number of forks created at runtime depends on the number of `forkTaskInputs` sent. Configure these parameters to execute a Sub Workflow task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParamters. **forkTaskWorkflow** | The name of the workflow that will be executed in each fork. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).  | Required. |
| inputParamters. **forkTaskWorkflowVersion**    | The version of the workflow to be executed. If unspecified, the latest version will be used.  | Required. |
| inputParameters. **forkTaskInputs**   | An array of JSON inputs for each forked branch. The number of array elements determines the number of branches in the dynamic fork. It can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).    | Required. |

</TabItem>
</Tabs>

The [Join](./join) task will run after the forked tasks. Configure the Join task as well to complete the fork-join operations.

**For the Join task:**

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| joinOn | A list of task reference names that the Join task will wait for completion before proceeding with the next task. | Required. |
| expression | The join script, which controls how the Join task completes if specified. | Optional. |



## Task definition

This is the JSON schema for a Dynamic Fork task definition.

<Tabs>
<TabItem value="Different tasks" label="Run different tasks">

```json
// JSON schema for the Dynamic Fork task
{
  "name": "fork_join_dynamic",
  "taskReferenceName": "fork_join_dynamic_ref",
  "inputParameters": {
    "dynamicTasks": [ // name of the tasks to execute
      {
        "name": "http",
        "taskReferenceName": "http_ref",
        "type": "HTTP",
        "inputParameters": {}
      },
      { // another task definition }

    ], 
    "dynamicTasksInput": { // inputs for the tasks
      "taskReferenceName" : {
        "key": "value",
        "key": "value"
      },
      "anotherTaskReferenceName" : {
        "key": "value",
        "key": "value"
      }
    }
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks", // input parameter key that will hold the task names to execute
  "dynamicForkTasksInputParamName": "dynamicTasksInput" // input parameter key that will hold the input parameters for each task
}


// JSON schema for the Join task
{
  "name": "join",
  "taskReferenceName": "join_ref",
  "inputParameters": {},
  "type": "JOIN",
  "joinOn": []
}
```
</TabItem>

<TabItem value="Same task any" label="Run the same task (any task type)">

```json
// JSON schema for the Dynamic Fork task
{
  "name": "fork_join_dynamic",
  "taskReferenceName": "fork_join_dynamic_ref",
  "inputParameters": {
    "forkTaskName": "",
    "forkTaskInputs": []
  },
  "type": "FORK_JOIN_DYNAMIC"
}

// JSON schema for the Join task
{
  "name": "join",
  "taskReferenceName": "join_ref",
  "inputParameters": {},
  "type": "JOIN",
  "joinOn": []
}
```
</TabItem>

<TabItem value="Same task sub-workflow" label="Run the same task (sub-workflows)">

```json
// JSON schema for the Dynamic Fork task
{
  "name": "fork_join_dynamic",
  "taskReferenceName": "fork_join_dynamic_ref",
  "inputParameters": {
    "forkTaskWorkflow": "",
    "forkTaskWorkflowVersion": "",
    "forkTaskInputs": []
  },
  "type": "FORK_JOIN_DYNAMIC"
}

// JSON schema for the Join task
{
  "name": "join",
  "taskReferenceName": "join_ref",
  "inputParameters": {},
  "type": "JOIN",
  "joinOn": []
}
```
</TabItem>
</Tabs>

:::note
forkTaskName and forkTaskInputs will take precedence even if dynamicForkTasksParam and dynamicForkTasksInputParamName are present in the task definition.
:::

## Adding a Dynamic Fork task in UI

**To add a Dynamic Fork task:**

<Tabs>
<TabItem value="Different tasks" label="For different tasks">

1. In your workflow, select the **(+)** icon and add a **Dynamic Fork **task.
2. In **Input parameters**, set the parameter Type for dynamicTasks and dynamicTasksInput as **Object/Array**.
3. Configure the dynamicTask parameter as an array of task definitions.
4. Configure the dynamicTasksInput parameter as a map of input parameters for each task.
5. Select the Join task and configure its settings to complete the fork/join operations.

</TabItem>

<TabItem value="Same task" label="For the same task">

1. In your workflow, select the **(+)** icon and add a **Dynamic Fork **task.
2. In **Input parameters**, remove all current parameters and add the following parameters and its values:
    * `forkTaskWorkflow`, `forkTaskWorkflowVersion`, and `forkTaskInputs` for Sub Workflow tasks.
    * `forkTaskName` and `forkTaskInputs` for all other task types.
3. Select the Join task and configure its settings to complete the fork/join operations.

<p><img src="/content/img/Task-References/dynamic_fork_task_reference.png" alt="Screenshot of Dynamic Fork Task in Orkes Platform"/></p>

</TabItem>
</Tabs>


## Examples

Here are some examples for using the Dynamic Fork task.

<details><summary>Running different tasks</summary>

To run a different task per fork in a dynamic fork, you must use `dynamicForkTasksParam` and `dynamicForkTasksInputParamName`. Here is an example workflow of a Dynamic Fork task running different tasks.

```json
// workflow definition

{
  "name": "DynamicForkExample",
  "description": "This workflow runs different tasks in a dynamic fork.",
  "version": 1,
  "tasks": [
    {
      "name": "fork_join_dynamic",
      "taskReferenceName": "fork_join_dynamic_ref",
      "inputParameters": {
        "dynamicTasks": [
          {
            "name": "inline",
            "taskReferenceName": "task1",
            "type": "INLINE",
            "inputParameters": {
              "expression": "(function () {\n  return $.input;\n})();",
              "evaluatorType": "graaljs"
            }
          },
          {
            "name": "http",
            "taskReferenceName": "task2",
            "type": "HTTP",
            "inputParameters": {
              "method": "GET",
              "connectionTimeOut": 3000,
              "readTimeOut": "3000",
              "accept": "application/json",
              "contentType": "application/json",
              "encode": true
            }
          },
          {
            "name": "x_test_worker_0",
            "taskReferenceName": "simple_ref",
            "type": "SIMPLE"
          }
        ],
        "dynamicTasksInput": {
          "task1": {
            "input": "one"
          },
          "task2": {
            "uri": "https://orkes-api-tester.orkesconductor.com/api"
          },
          "task3": {
            "input": {
              "someKey": "someValue"
            }
          }
        }
      },
      "type": "FORK_JOIN_DYNAMIC",
      "dynamicForkTasksParam": "dynamicTasks",
      "dynamicForkTasksInputParamName": "dynamicTasksInput"
    },
    {
      "name": "join",
      "taskReferenceName": "join_ref",
      "inputParameters": {},
      "type": "JOIN",
      "joinOn": []
    }
  ],
  "inputParameters": [],
  "outputParameters": {},
  "schemaVersion": 2
}
```
</details>

<details><summary>Running the same task — Simple task</summary>

In this example workflow, the Dynamic Fork task runs a worker task called `update_fruit_list_task` in parallel. The task input takes from the workflow input, which contains the number of new fruits.

```json
// workflow definition

{
  "name": "dynamic_workflow_array_simple",
  "description": "Update fruit list",
  "version": 1,
  "tasks": [
    {
      "name": "fork_join_dynamic",
      "taskReferenceName": "fork_join_dynamic_ref",
      "inputParameters": {
        "forkTaskName": "update_fruit_list_task",
        "forkTaskInputs": "${workflow.input.fruits}"
      },
      "type": "FORK_JOIN_DYNAMIC"
    },
    {
      "name": "join",
      "taskReferenceName": "join_ref",
      "inputParameters": {},
      "type": "JOIN",
      "joinOn": []
    }
  ],
  "inputParameters": [
    "fruits"
  ],
  "outputParameters": {},
  "schemaVersion": 2
}
```

Here, `forkTaskInputs` is a variable array input that determines the number of forks. At run-time, if the input payload for “fruits” contains three JSON objects, there will be three forks created:


```json
// workflow input payload

{
  "fruits": [
    {
      "inventoryNo": 5,
      "fruit": "apple"
    },
    {
      "inventoryNo": 20,
      "fruit": "orange"
    },
    {
      "inventoryNo": 3,
      "fruit": "kiwi"
    }
  ]
}
```

During execution, Conductor will insert an additional parameter called `index` into each JSON object, which is used to represent its array index.

```json
// one input instance for the Dynamic Fork task at run-time

{
  "fruit" : "kiwi",
  "inventoryNo" : 3,
  "__index": 2 // index of the element in the source array
}
```

<p align="center"><img src="/content/img/Task-References/dynamic_fork_task-fruit_example_input_UI.png" alt="UI screenshot of one input instance for the Dynamic Fork task at run-time" width="70%" height="auto"/></p>

If simple values are used in `forkTaskInputs`, such as `"fruits" = ["apple", "orange", "kiwi"]`, Conductor will set each array element in a parameter called `input`, like so: 

```json
// one input instance for the Dynamic Fork task at run-time

{
  "input" : "apple", // input value
  "__index" : 0 // index of the element in the source array
}
```
</details>

<details><summary>Running the same task — HTTP task</summary>

In this example, the dynamic fork runs HTTP tasks in parallel. The provided input in `forkTaskInputs` contains the typical payload expected in a HTTP task. 

```json
// workflow definition

{
  "name": "dynamic_workflow_array_http",
  "description": "Dynamic workflow array - run HTTP tasks",
  "tasks": [
    {
      "name": "dynamic_workflow_array_http",
      "taskReferenceName": "dynamic_workflow_array_http_ref",
      "inputParameters": {
        "forkTaskName": "HTTP",
        "forkTaskInputs": [
          {
            "uri" : "https://orkes-api-tester.orkesconductor.com/get"
          },
          {
            "uri" : "https://orkes-api-tester.orkesconductor.com/get",
            "method" : "GET"
          }
        ]
      },
      "type": "FORK_JOIN_DYNAMIC"
    },
    {
      "name": "dynamic_workflow_array_http_join",
      "taskReferenceName": "dynamic_workflow_array_http_join_ref",
      "type": "JOIN"
    }
  ]
}
```

:::tip
The parameter `method` has a default value of GET and need not be specified if the HTTP call is GET.
:::
</details>

<details><summary>Running the same task — Sub Workflow task</summary>
In this example, the dynamic fork runs Sub Workflow tasks in parallel.

```json
// workflow definition

{
  "name": "dynamic_workflow_array_sub_workflow",
  "description": "Dynamic workflow array - run sub workflow tasks",
  "tasks": [
    {
      "name": "dynamic_workflow_array_sub_workflow",
      "taskReferenceName": "dynamic_workflow_array_sub_workflow_ref",
      "inputParameters": {
        "forkTaskWorkflow": "extract_user",
        "forkTaskWorkflowVersion": "1",
        "forkTaskInputs": [
          {
            "input" : "value1"
          },
          {
            "input" : "value2"
          }
        ]
      },
      "type": "FORK_JOIN_DYNAMIC"
    },
    {
      "name": "dynamic_workflow_array_sub_workflow_join",
      "taskReferenceName": "dynamic_workflow_array_sub_workflow_join_ref",
      "type": "JOIN"
    }
  ]
}
```
</details>