---
sidebar_position: 1
---

# Creating Task Definitions


## Creating a task
Tasks can be created using the tasks metadata API:

```http request
POST /api/metadata/taskdefs
```

This API takes an array of new task definitions.


## Parameters in task creation
Here are the fields used to defined the task:

|field|description|Notes|
|---|---|---|
|name|Task Type. <br/>Unique name of the Task that resonates with its function.|Unique|
|description|Description of the task|optional|
|retryCount|No. of retries to attempt when a Task is marked as failure|defaults to 3|
|retryLogic|Mechanism for the retries|See [Retry Logic](#retry-logic) below|
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

> Note: To create a task that never times out, set `timeoutSeconds` to 0 and also set the `pollTimeoutSeconds` to 0.

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



## Examples
### Example using curl

```shell
curl 'http://localhost:8080/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'content-type: application/json' \
  --data-raw '[{"createdBy":"user","name":"sample_task_name_1","description":"This is a sample task for demo","responseTimeoutSeconds":10,"timeoutSeconds":30,"inputKeys":[],"outputKeys":[],"timeoutPolicy":"TIME_OUT_WF","retryCount":3,"retryLogic":"FIXED","retryDelaySeconds":5,"inputTemplate":{},"rateLimitPerFrequency":0,"rateLimitFrequencyInSeconds":1}]'
```

Here's the JSON in the curl body (for better readability):

```json
{
  "createdBy":"user",
  "name":"sample_task_name_1",
  "description":"This is a sample task for demo","responseTimeoutSeconds":10,
  "timeoutSeconds":30,
  "inputKeys":[],
  "outputKeys":[],
  "timeoutPolicy":"TIME_OUT_WF",
  "retryCount":3,
  "retryLogic":"FIXED",
  "retryDelaySeconds":5,
  "inputTemplate":{},
  "rateLimitPerFrequency":0,
  "rateLimitFrequencyInSeconds":1
}
```
### Example using node fetch
>Note that all the quotes in the body must be escaped.
 
```javascript
fetch("http://localhost:8080/api/metadata/taskdefs", {
    "headers": {
        "accept": "*/*",
        "content-type": "application/json",
    },
    "body": "[{\"createdBy\":\"user\",\"name\":\"sample_task_name_1\",\"description\":\"This is a sample task for demo\",\"responseTimeoutSeconds\":10,\"timeoutSeconds\":30,\"inputKeys\":[],\"outputKeys\":[],\"timeoutPolicy\":\"TIME_OUT_WF\",\"retryCount\":3,\"retryLogic\":\"FIXED\",\"retryDelaySeconds\":5,\"inputTemplate\":{},\"rateLimitPerFrequency\":0,\"rateLimitFrequencyInSeconds\":1}]",
    "method": "POST"
});
```
## Best Practices

1. You can update a set of tasks together in this API
2. Task configurations are important attributes that controls the behavior of this task in a Workflow. Refer to [Task Configurations](/content/docs/how-tos/task-configurations) for all the options and details' 
3. You can also use the Conductor Swagger UI to update the tasks

