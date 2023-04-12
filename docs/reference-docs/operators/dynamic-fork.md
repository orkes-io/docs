import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dynamic Fork

The Dynamic fork task is used when the number of forks is to be determined at the run-time. Whereas in a regular fork-join task, the number of forks is defined during the workflow creation.

## Definitions

```json
{
  "name": "dynamic",
  "taskReferenceName": "dynamic_ref",
  "inputParameters": {
    "dynamicTasks": "",
    "dynamicTasksInput": ""
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
}
```
* A FORK_JOIN_DYNAMIC can only have one task per fork. A sub-workflow can be utilized if there is a need for multiple tasks per fork.

### Input Parameters

| Attribute                      | Description                                                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| dynamicForkTasksParam          | This JSON array lists the tasks in each fork that is to be created. Each entry corresponds to a separate fork.                     |
| dynamicForkTasksInputParamName | This is a JSON array where the keys are the taskReferenceName for each fork, and the values are the inputParameters for each task. |

The [JOIN](/content/reference-docs/operators/join) task will run after all the dynamic tasks, collecting the output for all tasks. All the tasks must be completed before the JOIN completes the fork.

### Output Parameters

| Attribute | Description                                                                                                                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| joinOn    | This is the output configuration of the JOIN task used in conjunction with the DYNAMIC_FORK_JOIN task. The output of the JOIN task is a map, where the keys are task reference names of the tasks being joined, and the keys are the corresponding outputs of those tasks. |

## Examples

<Tabs>
<TabItem value="UI" label="UI">
</TabItem>
<TabItem value="JSON" label="JSON">

```json
{
  "name": "dynamic",
  "taskReferenceName": "dynamic_ref",
  "inputParameters": {
    "dynamicTasks": "",
    "dynamicTasksInput": ""
  },
  "type": "FORK_JOIN_DYNAMIC",
  "dynamicForkTasksParam": "dynamicTasks",
  "dynamicForkTasksInputParamName": "dynamicTasksInput"
}
```

</TabItem>
<TabItem value="Java" label="Java">

```java
new DynamicFork(
  String taskReferenceName, 
  SimpleTask forkPrepareTask
)
```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
workflow.NewDynamicForkTask(
  taskRefName string, 
  forkPrepareTask TaskInterface,
) *DynamicForkTask
```

</TabItem>
<TabItem value="Python" label="Python">

```python
conductor.client.workflow.task.DynamicForkTask(
  task_ref_name: str, 
  pre_fork_task: TaskInterface, 
  join_task: JoinTask = None,
)
```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp
new Conductor.Definition.TaskType.DoWhileTask(
  string taskReferenceName, 
  string loopCondition, 
  params WorkflowTask[] loopOver
)
```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript
dynamicForkTask = (
  taskReferenceName: string,
  preForkTasks: TaskDefTypes[] = [],
  dynamicTasksInput: string = ""
): ForkJoinDynamicDef
```

</TabItem>
<TabItem value="Clojure" label="Clojure">

<!-- Todo: @gardusig -->
```clojure

```

</TabItem>
</Tabs>

<details><summary>Add Examples</summary>
<p>
</p>
</details>

## Dynamic Fork Task Using Arrays

The dynamic fork is used to run parallel executions of the task with dynamism. Think of this as Conductor’s equivalent of stream parallel processing in Java:

```java
arrayItems.stream().parallel().forEach(item -> process(item));
```

Here each item of the array is passed to a method called process. Conductor allows you to do the same and covers several types of processes.

1. Simple Task - When we need to run a simple custom worker task.
2. [HTTP Task](/content/reference-docs/system-tasks/http) - When we need to run the system HTTP workers.
3. [Sub Workflows](./sub-workflow) - Use this when we want to run more than one task or a series of steps that can be a full-fledged complex flow.
4. Other Conductor Task Types - This can also be used for other task types such as EVENT, WAIT, etc.

<details><summary>Running Simple Tasks using Dynamic Fork​</summary>
<p>
Run a simple task for each of the inputs provided.

| Attribute      | Description                                               |
| -------------- | --------------------------------------------------------- |
| forkTaskName   | Specify the name of the simple task to execute.           |
| forkTaskInputs | Array of inputs - a task will be executed for each input. |

In this example, each task will be executed with the following input:
 
```json
{
  "inputText" : "value1",
  "inputNumber" : 1,
  "index": 0 
}
```
:::note
In the task, there will be a value called **index**, which is inserted by the system to represent the array index for the object.
:::

Example:

```json
{
  "name": "dynamic_workflow_array_simple",
  "description": "Dynamic workflow array - run simple task",
  "tasks": [
    {
      "name": "dynamic_workflow_array_simple",
      "taskReferenceName": "dynamic_workflow_array_simple_ref",
      "inputParameters": {
        "forkTaskName": "update_fruit_list_task",
        "forkTaskInputs": [
          {
            "inputText" : "value1",
            "inputNumber" : 1
          },
          {
            "inputText" : "value2",
            "inputNumber" : 2
          },
          {
            "inputText" : "value3",
            "inputNumber" : 3
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
  ]
}
```
We can also use simple values or a mix of complex and simple objects.
```json
[
  "apple", "orange", "kiwi"
]
```
When using simple values, it will be passed with the key input and an index representing the element's index in the array.
```json
{
  "input" : "apple", // Value
  "index" : 0 // Index of the element
}
```
</p>
</details>

<details><summary>Running HTTP Tasks using Dynamic Fork​</summary>
<p>
To run HTTP, we will use the same parameters as running SIMPLE tasks; as shown above, the value of forkTaskName will be HTTP, and the inputs you provide will be what the HTTP task expects.

:::tip
**method** has a default value of GET and need not be specified if the HTTP call is GET.
:::

Example:
```json
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
            "url" : "https://orkes-api-tester.orkesconductor.com/get"
          },
          {
            "url" : "https://orkes-api-tester.orkesconductor.com/get",
            "method" : "GET"
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
}
```
</p>
</details>

<details><summary>Running Sub Workflows using Dynamic Fork​​</summary>
<p>
Run a sub-workflow for each of the inputs provided

| Attribute               | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| forkTaskWorkflow        | Specify the name of the sub-workflow to be executed.      |
| forkTaskWorkflowVersion | Optional version of the workflow to run.                  |
| forkTaskInputs          | Array of inputs - a task will be executed for each input. |

:::note
**forkTaskWorkflow** - When this value is present, Conductor treats this as a dynamic fork that runs sub workflows.
:::

Example:
```json
{
  "name": "dynamic_workflow_array_sub_workflow",
  "description": "Dynamic workflow array - run sub workflow tasks",
  "tasks": [
    {
      "name": "dynamic_workflow_array_sub_workflow",
      "taskReferenceName": "dynamic_workflow_array_sub_workflow_ref",
      "inputParameters": {
        "forkTaskWorkflow": "extract_user",
        "forkTaskInputs": [
          {
             "input" : "value1"
          },
          {
             "input" : "value2"
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
  ]
}
```
</p>
</details>