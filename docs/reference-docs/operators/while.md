# While Loop

```json
"type" : "DO_WHILE"
```
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Do While task sequentially executes a list of tasks as long as a condition is true. The list of tasks is executed first, before the condition is checked, even for the first iteration.

## Configurations

```json
{
      "name": "do_while_task",
      "taskReferenceName": "do_while_task_ref",
      "type": "DO_WHILE",
      "loopCondition": "",
      "loopConditionType": "value-param",
      "loopOver": [//tasks]
    }
```
* When scheduled, each task of this loop will see its **taskReferenceName** concatenated with **__i**, with **i** being the iteration number, starting at 1. **Warning**: **taskReferenceName** containing arithmetic operators must not be used.
* Each time the task is performed, the output is saved and indexed by the iteration value. This makes it possible for the condition to check the output of a specific task iteration. (E.g., **$.LoopTask['iteration]['first_task']**).
* The DO_WHILE task is set to *FAILED* as soon as one of the loopTask fails. In such cases, for the retry, the iteration starts from 1.

### Input Parameters

| Attributes    | Description                                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| loopCondition | Indicates the condition to be evaluated after every iteration. Supported types are **value-param**, **javascript**, and **graaljs**.  If an exception occurs during evaluation, the task is set to FAILED_WITH_TERMINAL_ERROR. |
| loopOver      | Includes the list of tasks to be executed as long as the condition is true.                                                                                                                                                    |

### Output Parameters​

| Attributes | Description                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iteration  | Indicates the iteration number, which is the current one while executing, and the final one once the loop is finished.                                                                                  |
| i          | Iteration number as a string mapped to the task references names and their output.                                                                                                                      |
| *          | Any state can be stored here if the loopCondition does so. For example, **storage** will exist if loopCondition is **if ($.LoopTask['iteration'] <= 10) {$.LoopTask.storage = 3; true } else {false}**. |

:::note
* Domain or isolation group execution is unsupported.
* Nested DO_WHILE is unsupported. However, we can achieve a similar functionality as the DO_WHILE task supports SUB_WORKFLOW as a loopOver task.
* Since loopOver tasks will be executed in a loop inside the scope of a parent, the do-while task may not work as expected if it includes branching that crosses outside the DO_WHILE task.
* Branching inside the loopOver task is supported.
:::

## Examples

<Tabs>
<TabItem value="JSON" label="JSON">

```json
{
   "name": "Loop Task",
   "taskReferenceName": "LoopTask_ref",
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
       },{
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
</TabItem>

<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Python" label="Python">

```python

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go

```
</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

```
</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```
</TabItem>

<TabItem value="clojure" label="Clojure">

```clojure

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
       },{
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
   ],
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

<details><summary>Using Iteration Key​</summary>
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
