---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Do While

The Do While task executes a sequence of tasks as long as a given condition is true. The list of tasks is executed first before the condition is checked, even for the first iteration, just like a regular do .. while statement in programming.

When a Do While loop is executed, each task in the loop will have its `taskReferenceName` concatenated with __i, with i as the iteration number starting at 1. If one of the loop task fails, the Do While task status will be set as FAILED and upon retry the iteration number will restart from 1.

## Task configuration

Configure these parameters for the Do While task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| evaluatorType | The type of evaluator used. Supported types: <ul><li>`value-param`—Evaluates a specific input parameter in the Do While task.</li><li>`graaljs`—Evaluates JavaScript expressions and computes the value. Allows you to use ES6-compatible JavaScript.</li></ul> | Required. |
| loopCondition    | The condition that is evaluated by the Do While task after every iteration. The expression format depends on the evaluator type:<ul><li>For the `value-param` evaluator, the expression is the input parameter key.</li><li>For the `javascript` and `graaljs` evaluators, the expression is the JavaScript expression. </li></ul> | Required. |
| loopOver | The list of tasks to be executed as long as the condition is true.   | Required. |
| inputParameters. **keepLastN**   | The number of required iterations. On enabling this option, this value is set to 2 by default. You can also choose not to include this parameter if there are no limits on the number of iterations.    | Optional. |

## Task definition

This is the JSON schema for a Do While task definition.

```json
{
  "name": "do_while",
  "taskReferenceName": "do_while_ref",
  "inputParameters": {},
  "type": "DO_WHILE",
  "loopCondition": "", // Condition
  "evaluatorType": "value-param",
  "loopOver": [ // List of tasks to be executed in the loop
    {//taskDefinition}, 
    {//taskDefinition}
  ]
}
```

## Task output
The Do While task will return the following parameters.

| Parameter     | Description                                                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iteration | The number of iterations. If the Do While task is in progress, `iteration` will show the current iteration number. If the Do While task is completed, `iteration` will show the final number of iterations. | 
| i | The iteration number, mapped to the task references names and their output. | 

In addition to the two parameters above, the output payload may also contain any state stored in `loopCondition`. For example, `storage` will exist as an output parameter if the `loopCondition` is `if ($.LoopTask['iteration'] <= 10) {$.LoopTask.storage = 3; true } else {false}`.

**Example output**

``` json
{
  "1": {
    "taskA_ref": {
      "response": {
        "headers": {},
        "body": {},
        "statusCode": 200
      }
    },
    "taskB_ref": {
      //taskBOutput
    }
  },
  "2": {
    "taskA_ref": {
      "response": {
        "headers": {},
        "body": {},
        "statusCode": 200
      }
    },
    "taskB_ref": {
      //taskBOutput
    }
  },
  "iteration": 2
}
```
### Accessing the Do While task output

Each time a task in the do while loop is completed, the output is saved and indexed by the iteration value. This makes it possible for the condition to check the output of a specific task iteration using `$.TaskName[’iteration’]['loopTask']`, replacing `TaskName` with the actual Do While task reference name and `loopTask` with the loop task reference name.

## Adding a Do While task in UI
**To add a Do While task:**
1. In your workflow, select the **(+)** icon and add a **Do While** task.
2. In **Script params**, add the parameter that will be evaluated in the expression.
3. In **Loop condition**, select the evaluator type and enter the loop condition.
    - **Value-Param**—Ensure that the expression value matches the parameter key you have defined in Script params.
    - **ECMASCRIPT**—Enter a Javascript script.
4. In your workflow, select the **(+)** icon to add tasks to the do while loop.
5. (Optional) Set the number of required iterations by unchecking **No Limits**. There is no limit on the number of iterations by default.

<p><img src="/content/img/Task-References/do_while_task_reference.png" alt="Screenshot of Do While Task in Orkes Platform"/></p>

## Examples
Here are some examples for using the Do While task.


<details><summary>Example Do While task</summary>
<p>

```json
{
  "name": "Loop Task",
  "taskReferenceName": "LoopTask",
  "type": "DO_WHILE",
  "inputParameters": {
    "value": "${workflow.input.value}"
  },
  "loopCondition": "if ( ($.LoopTask['iteration'] < $.value ) || ( $.first_task['response']['body'] > 10)) { false; } else { true; }",
  "loopOver": [
    {
      "name": "first task",
      "taskReferenceName": "first_task",
      "inputParameters": {
        "http_request": {
          "uri": "http://localhost:8082",
          "method": "POST"
        }
      },
      "type": "HTTP"
    },
    {
      "name": "second task",
      "taskReferenceName": "second_task",
      "inputParameters": {
        "http_request": {
          "uri": "http://localhost:8082",
          "method": "POST"
        }
      },
      "type": "HTTP"
    }
  ]
}
```

When executed successfully, the above Do While task will produce the following execution JSON, assuming three iterations occurred:

```json
{
  "taskType": "DO_WHILE",
  "outputData": {
    "iteration": 3,
    "1": {
      "first_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "second_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      }
    },
    "2": {
      "first_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "second_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      }
    },
    "3": {
      "first_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      },
      "second_task": {
        "response": {},
        "headers": {
          "Content-Type": "application/json"
        }
      }
    }
  }
}
```
</p>
</details>

<details><summary>Using the iteration key in a loop task</summary>
<p>
Sometimes, you may want to use the Do While iteration value/counter inside your loop tasks. In this example, an API call is made to a GitHub repository to get all stargazers and each iteration increases the pagination.

The Do While task’s `taskReferenceName` is "get_all_stars_loop_ref". To evaluate the current iteration, the parameter `$.get_all_stars_loop_ref['iteration']` is used in the `loopCondition`. In the HTTP task embedded in the loop, `${get_all_stars_loop_ref.output.iteration}` is used to define which page of results the API should return.


```json
{
  "name": "get_all_stars",
  "taskReferenceName": "get_all_stars_loop_ref",
  "inputParameters": {
    "stargazers": "4000"
  },
  "type": "DO_WHILE",
  "loopCondition": "if ($.get_all_stars_loop_ref['iteration'] < Math.ceil($.stargazers/100)) { true; } else { false; }",
  "loopOver": [
    {
      "name": "100_stargazers",
      "taskReferenceName": "hundred_stargazers_ref",
      "inputParameters": {
        "counter": "${get_all_stars_loop_ref.output.iteration}",
        "http_request": {
          "uri": "https://api.github.com/repos/conductor-oss/conductor/stargazers?page=${get_all_stars_loop_ref.output.iteration}&per_page=100",
          "method": "GET",
          "headers": {
            "Authorization": "token ${workflow.input.gh_token}",
            "Accept": "application/vnd.github.v3.star+json"
          }
        }
      },
      "type": "HTTP",
    }
  ]
}
```

</p>
</details>

## Limitations

There are several limitations for the Do While task:
- **Branching**—Within a Do While task, branching using Switch, Fork/Join, Dynamic Fork tasks are supported. However, the Do While task may not execute as expected if the branching crosses outside its scope, since the loop tasks will be executed within the scope.
- **Nested loops**—Nested Do While tasks are not supported. To achieve a similar functionality as a nested do while loop, you can use a [Sub Workflow](./sub-workflow) task inside the Do While task.
- **Isolation group execution**—Isolation group execution is not supported. However, domain is supported for loop tasks inside the Do While task.

## Errors
If an exception occurs during evaluation of the `loopCondition`, the task is set to `FAILED_WITH_TERMINAL_ERROR`.
