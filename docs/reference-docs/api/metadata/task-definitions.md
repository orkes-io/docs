---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating Task Definitions

Tasks are the building blocks of workflow in Conductor. A task can be an operator, system task or custom code written in any programming language.

## Configurations

You can configure task definitions directly via UI and using API. The task definitions includes the following parameters:

| Attribute | Description | 
| -- | -- | 
| name | Provide a unique name to identify the task. This field is mandatory. | 
| description | Include a description that indicates the purpose of the task. This field is optional. | 
| retryCount | The number of retries to attempt when a task fails. The default value is 3. |
| retryDelaySeconds | Indicates the time (in seconds) to wait before each retry occurs. The default value is 60. |
| retryLogic | Indicates the mechanism for the retries. It can take any of the following values:<ul><li>**FIXED** - Every retry occurs as per the time set under *retryDelaySeconds*.</li><li>**EXPONENTIAL_BACKOFF** - Every retry occurs as per <i>retryDelaySeconds*2^(retryCount)</i></li></ul> | 
| timeOutSeconds | Time (in seconds) after which the task is marked as **TIMED_OUT** if not completed after transitioning to **IN_PROGRESS** status for the first time. No timeout occurs if the value is set to 0. | 
| pollTimeoutSeconds | Time (in seconds), after which the task is marked as **TIMED_OUT** if not polled by a worker. No timeout occurs if the value is set to 0. | 
| timeoutPolicy | Indicates the condition at which the task should time out. It can take any of the following values:<ul><li>**RETRY** - Retries the task again.</li><li>**TIME_OUT_WF** - The status of the task is marked as TIMEOUT and the task is terminated.</li><li>**ALERT_ONLY** - Registers a counter.</li></ul>**Note:** To create a task that never times out, set *timeoutSeconds* and *pollTimeoutSeconds* to 0. |
| responseTimeoutSeconds | Set a time (in seconds) to reschedule the task if the task status is not updated. Default value is 3600. |
| inputKeys | An array of keys for the task’s expected input. |
| outputKeys | An array of keys for the task’s expected output. |
| inputTemplate | Input templates are defined as part of task definitions. It acts as default input to the task while adding to the workflow. It can be overridden by values provided in Workflow definitions.<br/>**Note**: Since the input templates are part of the task definitions, you cannot see them in the workflow definitions while calling the task. | 
| concurrentExecLimit | Indicates the number of tasks that can be executed at any given time. <br/><br/>For example, if you have 1000 task executions waiting in the queue and 1000 workers polling this queue for tasks, but if you have set *concurrentExecLimit* to 10, only ten tasks would be given to workers (which would lead to starvation). If any of the workers finish execution, a new task(s) will be removed from the queue while still keeping the current execution count to 10. | 
| backOffScaleFactor | The value to be multiplied with retryDelaySeconds in order to determine the interval for retry. | 
| rateLimitFrequencyInSeconds, rateLimitPerFrequency | <ul><li>**rateLimitiFrequencyInSeconds** sets the frequency window, which is the duration to be used in events per duration.</li><li>**rateLimitPerFrequency** defines the number of tasks that can be given to workers per given frequency window.</li></ul>**Note**: Rate limiting is only supported for the Redis persistence module and is unavailable with other persistence layers.<br/><br/>For example, let’s set **rateLimitiFrequencyInSeconds=5**, and **rateLimitPerFrequency=12**. This means our frequency window is 5 seconds in duration, and for each frequency window, the Conductor would only give 12 tasks to workers. So, in a given minute, the Conductor would only give 12*(60/5) = 144 tasks to workers, irrespective of the number of workers polling for the task.<br/>Unlike **concurrentExecLimit**, rate limiting doesn't consider the tasks already in progress/completed. Even if all the previous tasks are executed within 1 sec or would take a few days, the new tasks are still given to workers at configured frequency, 144 tasks per minute in the above example. |
| ownerEmail | This field will be auto-populated with the user's email address. |

<details><summary>Steps to configure via UI</summary>

1. Navigate to **TASKS > Definitions** from the left menu.
2. Create a new task by clicking on the **Define Task** button.
3. You can create the tasks in UI either by directly providing the JSON file:
```json
{
 "name": "sample",
 "description": "Edit or extend this sample task. Set the task name to get started",
 "retryCount": 3,
 "timeoutSeconds": 3600,
 "timeoutPolicy": "TIME_OUT_WF",
 "retryLogic": "FIXED",
 "retryDelaySeconds": 60,
 "responseTimeoutSeconds": 600,
 "rateLimitPerFrequency": 0,
 "rateLimitFrequencyInSeconds": 1,
 "ownerEmail": "name@example.com",
 "pollTimeoutSeconds": 3600,
 "inputKeys": [],
 "outputKeys": [],
 "inputTemplate": {},
 "backoffScaleFactor": 1,
 "concurrentExecLimit": 1
}
```
4. You can also use the **Form** option to create task definitions instead of JSON.
<p align="center"><img src="/content/img/task-definitions-using-form-builder.png" alt="Task Definitions using From builder" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

5. Once the fields are populated with appropriate values, click the **Save and Create New** button.

</details>

## API
```
POST /api/metadata/taskdefs
```