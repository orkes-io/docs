# Extending System Tasks

The [System tasks](content/docs/reference-docs) allows Netflix Conductor to run simple tasks on the server - removing the need to build (and deploy) workers for basic tasks.  This allows for automating more mundane tasks without building specific microservices for them.

However, sometimes it might be necessary to add additional parameters to a System Task to gain the behavior that is desired.

## Example HTTP Task

```json
{
  "name": "get_weather_90210",
  "version": 1,
  "tasks": [
    {
      "name": "get_weather_90210",
      "taskReferenceName": "get_weather_90210",
      "inputParameters": {
        "http_request": {
          "uri": "https://weatherdbi.herokuapp.com/data/weather/90210",
          "method": "GET",
          "connectionTimeOut": 1300,
          "readTimeOut": 1300
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "data": "${get_weather_ref.output.response.body.currentConditions.comment}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}

```

This very simple workflow has a single HTTP Task inside.  No parameters need to be passed, and when run, the HTTP task will return the weather in Beverly Hills, CA.

> This API has a very slow response time. In the HTTP task, the connection is set to time out after 1300ms.  This API *will* work if we allowed for a longer timeout. But, in order to demonstrate adding retries to the HTTP Task, we will artificially force the API call to fail.

By default, the [HTTP Task](/content/docs/reference-docs/http-task) does not have ```retryCount```, ```retryDelaySeconds``` or ```retryLogic``` built in.  Attempting to add these parameters to a HTTP Task results in an error.

## The Solution

We can create a task with the same name with the desired parameters:

```json
{

  "createdBy": "",
  "name": "get_weather_90210",
  "description": "editing HTTP task",
  "retryCount": 3,
  "timeoutSeconds": 5,
  "inputKeys": [],
  "outputKeys": [],
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 5,
  "responseTimeoutSeconds": 5,
  "inputTemplate": {},
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1
}

```

The ```get_weather_90210 task will now run 4 times (it will fail once, and then retry 3 times), with a 5 second delay between attempts.

![fixed backoff failure](/img/http_task_retry_fixed.png)


If we change the ```retryLogic``` to EXPONENTIAL_BACKOFF, the delay between attempts grows exponentially:

1. 5*2^0 = 5 seconds
2. 5*2^1 = 10 seconds
3. 5*2^2 = 20 seconds

![exponential backoff](/img/http_task_retry_backoff.png)

None of these attributes are present in the HTTP task, but by defining a task with the same name, it is possible to add 