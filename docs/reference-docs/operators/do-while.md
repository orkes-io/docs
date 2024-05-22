---
sidebar_position: 2
---

# Do While

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Do While task sequentially executes a list of tasks as long as a condition is __true__. The list of tasks is executed first before the condition is checked, even for the first iteration, just like a regular __do .. while__ task in programming languages.

## Definitions

```json
    {
      "name": "do_while_task",
      "taskReferenceName": "do_while_task_ref",
      "type": "DO_WHILE",
      "loopCondition": "", // Condition
      "loopConditionType": "value-param",
      "loopOver": [
        // List of tasks to be executed in the loop
      ]
    }
```
* When scheduled, each task of this loop will see its **taskReferenceName** concatenated with **__i**, with **i** being the iteration number, starting at 1. **Warning**: **taskReferenceName** containing arithmetic operators must not be used.
* Each time the task is performed, the output is saved and indexed by the iteration value. This makes it possible for the condition to check the output of a specific task iteration. (E.g., **$.taskReferenceName['iteration]['first_task']**).
* The DO_WHILE task is set to *FAILED* as soon as one of the loopTask fails. In such cases, for the retry, the iteration starts from 1.

### Input Parameters

| Attributes    | Description                                                                                                                                                                                                                    |
| ------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| loopCondition | Indicates the condition to be evaluated after every iteration. Supported types are **value-param**, and **ECMASCRIPT**.  If an exception occurs during evaluation, the task is set to FAILED_WITH_TERMINAL_ERROR. |
| loopOver      | Includes the list of tasks to be executed as long as the condition is evaluated to `true`.                                                                                                                                       |
| keepLastN (No of iterations to keep) | Specify the number of required iterations. On enabling this option, this value is set to 2 by default. You can also choose the option “No limits” based on your preference. |

### Output Parameters

| Attributes | Description                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iteration  | Indicates the iteration number, which is the current one while executing, and the final one once the loop is finished.                                                                                  |
| i          | Iteration number as a string mapped to the task references names and their output.                                                                                                                      |

:::note
* Domain or isolation group execution is unsupported.
* Nested DO_WHILE is unsupported. However, we can achieve a similar functionality as the DO_WHILE task supports SUB_WORKFLOW as a loopOver task.
* Since loopOver tasks will be executed in a loop inside the scope of a parent, the do-while task may not work as expected if it includes branching that crosses outside the DO_WHILE task.
* Branching inside the loopOver task is supported.
:::
## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Do While`.
2. Select the loop condition type.
3. Add the condition.
4. Add the list of tasks in the loop.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-do-while-task.png" alt="Adding Do While" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "do_while_example",
      "taskReferenceName": "do_while_example_ref_1",
      "inputParameters": {},
      "type": "DO_WHILE",
      "loopCondition": "(function () {\n  if ($.do_while_example_ref_1['iteration'] < 3) {\n    return true;\n  }\n  return false;\n})();",
      "loopOver": [
        {
          "name": "sample_loop_task",
          "taskReferenceName": "sample_loop_task",
          "inputParameters": {
            "http_request": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "connectionTimeOut": 3000,
              "readTimeOut": "3000",
              "accept": "application/json",
              "contentType": "application/json"
            }
          },
          "type": "HTTP"
        }
      ],
      "evaluatorType": "graaljs"
    }
```

</TabItem>
</Tabs>

<details><summary>Sample Workflow</summary>
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

The above definition will produce the following execution, assuming three executions occurred (alongside **first_task__1**, **first_task__2**, **first_task__3**, **second_task__1**, **second_task__2**, and **second_task__3**):

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

<details><summary>Using Iteration Key</summary>
<p>
Sometimes, you may want to use the iteration value/counter in the tasks used in the loop. In this example, an API call is made to GitHub (to the Netflix Conductor repository), but each loop increases the pagination.

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
                    "uri": "https://api.github.com/repos/ntflix/conductor/stargazers?page=${get_all_stars_loop_ref.output.iteration}&per_page=100",
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

* The Loop **taskReferenceName** is "get_all_stars_loop_ref".
* In the **loopCondition**, the term **$.get_all_stars_loop_ref['iteration']** is used.
* In tasks embedded in the loop, **${get_all_stars_loop_ref.output.iteration}** is used. In this case, it defines which page of results the API should return.

</p>
</details>
