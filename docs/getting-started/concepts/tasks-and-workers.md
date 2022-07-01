---
sidebar_position: 1
---

# Workers and Tasks
  
## Worker
A worker is responsible for executing a task.  Operator and System tasks are handled by the Conductor server.  User defined tasks need to have a worker running in a different environment.  This worker will poll Conductor's task queue to see if it has any work scheduled by the server.

Workers can be implemented in any language, and Conductor's [SDKs](content/docs/how-tos/SDKs) provide support for worker framework that provides features such as polling threads, metrics and server communication that makes creating workers easy.

Each worker embodies Microservice design pattern and follows certain basic principles:

1. Workers are stateless and do not implement a workflow specific logic.  
2. Each worker executes a very specific task and produces well defined output given specific inputs.
3. Workers are meant to be idempotent (or should handle cases where the task that partially executed gets rescheduled due to timeouts etc.)
4. Workers do not implement the logic to handle retries etc, that is taken care by the Conductor server.

## Tasks
Tasks are the building blocks of workflow in Conductor.  A task can be an [operator](operators), [system task](system-tasks) 
or custom code [Worker](#worker) written in **any** programming language.

A typical Conductor workflow is a list of tasks that are executed until completion or the termination of the workflow. 
### Handling failures, etc
Each task has a associated metadata defined in Conductor server. 
Conductor server makes all the metadata associated with all the tasks at the following API:
```shell script
GET api/metadata/taskdefs
GET api/metadata/taskdefs/{task_def_name}
``` 
### Task Definitions
Task definition metadata specifies how the server handles various failure and cases such as timeouts.
The metadata is defined using JSON:
```json
{
  "name": "task name used in the workflow",
  ...
}
```

Here are the fields used to defined the task:

|field|description|Notes|
|---|---|---|
|name|Task Type. <br/>Unique name of the Task that resonates with its function.|Unique|
|description|Description of the task|optional|
|retryCount|No. of retries to attempt when a Task is marked as failure|defaults to 3|
|retryLogic|Mechanism for the retries|see possible values below|
|retryDelaySeconds|Time to wait before retries|defaults to 60 seconds|
|timeoutPolicy|Task's timeout policy|see possible values below|
|timeoutSeconds|Time in seconds, after which the task is marked as `TIMED_OUT` <br/>if not completed after transitioning to `IN_PROGRESS` status for the first time|No timeouts if set to 0|
|pollTimeoutSeconds|Time in seconds, after which the task is marked as `TIMED_OUT` <br/>if not polled by a worker|No timeouts if set to 0|
|responseTimeoutSeconds|Must be greater than 0 and less than timeoutSeconds. <br/>The task is rescheduled if not updated with a status after this time <br/>(heartbeat mechanism). <br/>Useful when the worker polls for the task but fails to complete due to errors/network failure.|defaults to 3600|
|inputKeys|Array of keys of task's expected input.  Used for documenting task's input. See [Using inputKeys and outputKeys](#using-inputkeys-and-outputkeys). |optional|
|outputKeys|Array of keys of task's expected output.  Used for documenting task's output|optional|
|inputTemplate|See [Using inputTemplate](#using-inputtemplate) below.|optional|
|concurrentExecLimit|Number of tasks that can be executed at any given time.|optional|
|rateLimitFrequencyInSeconds, <br/>rateLimitPerFrequency|See [Task Rate limits](#task-rate-limits) below.|optional| 

### Retry Logic

* FIXED : Reschedule the task after the ```retryDelaySeconds```
* EXPONENTIAL_BACKOFF : Reschedule after ```retryDelaySeconds  * 2^(attemptNumber)```
 
### Timeout Policy

* RETRY : Retries the task again
* TIME_OUT_WF : Workflow is marked as TIMED_OUT and terminated
* ALERT_ONLY : Registers a counter (task_timeout)

### Task Concurrent Execution Limits

* `concurrentExecLimit` limits the number of simultaneous Task executions at any point.  
**Example:**  
If you have 1000 task executions waiting in the queue, and 1000 workers polling this queue for tasks, but if you have set `concurrentExecLimit` to 10, only 10 tasks would be given to workers (which would lead to starvation). If any of the workers finishes execution, a new task(s) will be removed from the queue, while still keeping the current execution count to 10.

### Task Rate limits

> Note: Rate limiting is only supported for the Redis-persistence module and is not available with other persistence layers.

* `rateLimitFrequencyInSeconds` and `rateLimitPerFrequency` should be used together.
* `rateLimitFrequencyInSeconds` sets the "frequency window", i.e the `duration` to be used in `events per duration`. Eg: 1s, 5s, 60s, 300s etc.
* `rateLimitPerFrequency`defines the number of Tasks that can be given to Workers per given "frequency window".  
**Example:**  
Let's set `rateLimitFrequencyInSeconds = 5`, and `rateLimitPerFrequency = 12`. This means, our frequency window is of 5 seconds duration, and for each frequency window, Conductor would only give 12 tasks to workers. So, in a given minute, Conductor would only give 12*(60/5) = 144 tasks to workers irrespective of the number of workers that are polling for the task.  
Note that unlike `concurrentExecLimit`, rate limiting doesn't take into account tasks already in progress/completed. Even if all the previous tasks are executed within 1 sec, or would take a few days, the new tasks are still given to workers at configured frequency, 144 tasks per minute in above example.   

### Using inputKeys and outputKeys

* `inputKeys` and `outputKeys` can be considered as parameters and return values for the Task. 
* Consider the task Definition as being represented by an interface: ```(value1, value2 .. valueN) someTaskDefinition(key1, key2 .. keyN);```
* However, these parameters are not strictly enforced at the moment. Both `inputKeys` and `outputKeys` act as a documentation for task re-use. The tasks in workflow need not define all the keys in the task definition.
* In the future, this can be extended to be a strict template that all task implementations must adhere to, just like interfaces in programming languages.

### Using inputTemplate

* `inputTemplate` allows to define default values, which can be overridden by values provided in Workflow.
* Eg: In your Task Definition, you can define your inputTemplate as:

```json
"inputTemplate": {
    "url": "https://some_url:7004"
}
```

* Now, in your workflow Definition, when using above task, you can use the default `url` or override with something else in the task's `inputParameters`.

```json
"inputParameters": {
    "url": "${workflow.input.some_new_url}"
}
```
