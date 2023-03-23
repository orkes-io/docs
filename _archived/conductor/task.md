---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Task Definition

Tasks are the building blocks of workflow in Conductor. A task can be an operator, system task, or custom code written in any programming language.

Conductor maintains a registry of worker tasks. A task MUST be registered before being used in a workflow.

### Example Configuration

```json
{
  "name": "encode_task",
  "description": "Sample Encoding task",
  "retryCount": 3,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 600,
  "timeoutSeconds": 1200,
  "pollTimeoutSeconds": 3600,
  "timeoutPolicy": "TIME_OUT_WF",
  "responseTimeoutSeconds": 1200,
  "rateLimitFrequencyInSeconds": 60,
  "rateLimitPerFrequency": 50,
}
```


| Field                                              | Description                                                                                                                                                                                                                                     | Notes                                    |
|----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| name                                               | Provide a unique name to identify the task.                                                                                                                                                                            | This field is mandatory.                                  |
| description                                        | Include a description that indicates the purpose of the task.                                                                                                                                                                                                                         | This field is optional.                                 |
| retryCount                                         | The number of retries to attempt when a task fails.                                                                                                                                                                                      | Default value is 3.                            |
| retryDelaySeconds                                  | Indicates the time (in seconds) to wait before each retry occurs.                                                                                                                                                                    | Default value is 60 seconds.                   |
| retryLogic                                         | Indicates the mechanism for the retries.                                                                                                                                                                                                                       | It can take any of the following values: <ul><li>FIXED - Every retry occurs as per the time set under **retryDelaySeconds**</li>EXPONENTIAL_BACKOFF - Every retry occurs as per **retryDelaySeconds*2^(retryCount)**<li>LINEAR_BACKOFF : Reschedule after **retryDelaySeconds backoffRate attemptNumber**</li></ul>      |
| timeoutSeconds                                     | Time (in seconds) after which the task is marked as **TIMED_OUT**, if not completed after transitioning to **IN_PROGRESS** status for the first time.                                                                                                   | No timeout occurs if the value is set to 0.                  |
| pollTimeoutSeconds                                 | Time (in seconds), after which the task is marked as **TIME_OUT** if not polled by a worker.                                                                                                                                                        | No timeout occurs if the value is set to 0.                 |
| timeoutPolicy                                      | Indicates the condition at which the task should time out.                                                                                                                                                                                                                           | It can take any of the following values: <ul><li>RETRY - Retries the task again.</li><li>TIME_OUT_WF - The status of the task is marked as **TIMEOUT** and the task is terminated.</li><li>ALERT_ONLY - Registers a counter (task_timeout)</li></ul><br/>**Note:**To create a task that never times out, set **timeoutSeconds** and **pollTimeoutSeconds** to 0. |
| responseTimeoutSeconds                             | Set a time to reschedule the task if the task status is not updated. It is the heartbeat mechanism that automates the task process when it fails due to errors/network failures. | The default value is 3600 seconds.                         |
| backoffScaleFactor                                 | Must be greater than 0. Scale factor for linearity of the backoff                                                                                                                                                                               | defaults to 1                            |
| inputKeys                                          | An array of keys for the task’s expected input.                                                                                              | <ul><li>**inputKeys** can be considered as parameters and return values for the Task.</li><li>Consider the task Definition as being represented by an interface: **(value1, value2 .. valueN) someTaskDefinition(key1, key2 .. keyN);**</li><li>However, these parameters are not strictly enforced at the moment. Both **inputKeys** and **outputKeys** act as a documentation for task re-use. The tasks in workflow need not define all of the keys in the task definition.</li><li>In the future, this can be extended to be a strict template that all task implementations must adhere to, just like interfaces in programming languages.</li></ul>                                |
| outputKeys                                         | An array of keys for the task’s expected output.                                                                                                                                                                    | <ul><li>**outputKeys** can be considered as parameters and return values for the Task.</li><li>Consider the task Definition as being represented by an interface: **(value1, value2 .. valueN) someTaskDefinition(key1, key2 .. keyN);**</li><li>However, these parameters are not strictly enforced at the moment. Both **inputKeys** and **outputKeys** act as a documentation for task re-use. The tasks in workflow need not define all of the keys in the task definition.</li><li>In the future, this can be extended to be a strict template that all task implementations must adhere to, just like interfaces in programming languages.</li></ul>                              |
| inputTemplate                                      | Allows defining default values. It can be overridden by values provided in Workflow. See [Using inputTemplate](#using-inputtemplate) below.                                                                                                                                                                                          | This field is optional.                                |
| concurrentExecLimit                                | Indicates the number of tasks that can be executed at any given time.                                                                                                                                                                                         | For example, if you have 1000 task executions waiting in the queue, and 1000 workers polling this queue for tasks, but if you have set concurrentExecLimit to 10, only 10 tasks would be given to workers (which would lead to starvation). If any of the workers finish execution, a new task(s) will be removed from the queue, while still keeping the current execution count to 10.                                 |
| rateLimitFrequencyInSeconds, rateLimitPerFrequency | <ul><li>**rateLimitiFrequencyInSeconds** sets the frequency window, which is the duration to be used in events per duration.</li><li>**rateLimitPerFrequency** defines the number of tasks that can be given to workers per given frequency window.</li></ul><br/>**Note:** Rate limiting is only supported for the Redis-persistence module and is not available with other persistence layers.                                                                                                                                              | For example, let’s set **rateLimitiFrequencyInSeconds=5**, and **rateLimitPerFrequency=12**. This means, our frequency window is of 5 seconds duration, and for each frequency window, the Conductor would only give 12 tasks to workers. So, in a given minute, the Conductor would only give 12*(60/5) = 144 tasks to workers irrespective of the number of workers that are polling for the task.<br/> Note that, unlike **concurrentExecLimit**, rate limiting doesn't take into account the tasks that are already in progress/completed. Even if all the previous tasks are executed within 1 sec, or would take a few days, the new tasks are still given to workers at configured frequency, 144 tasks per minute in the above example.                               |
| ownerEmail | This field will be auto-populated with your email address. | | 

### Using inputTemplate

* **inputTemplate** allows to define default values, which can be overridden by values provided in Workflow.
* Eg: In your Task Definition, you can define your inputTemplate as:

```json
"inputTemplate": {
    "url": "https://some_url:7004"
}
```

* Now, in your workflow Definition, when using above task, you can use the default **url** or override with something else in the task's **inputParameters**.

```json
"inputParameters": {
    "url": "${workflow.input.some_new_url}"
}
```