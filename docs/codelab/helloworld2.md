## Building Hello World application: Part 2

In this code lab, we'll start with a simple "Hello World" application, but will extend our "Hello World" in order to several new Conductor tasks into our workflow.

In [Part 1](../helloworld), we build a simple workflow witha  Java worker that outputs the text "Hello World!"

![first workflow](img/hw_workflow1.png)

When you've completed this code lab, you'll be familiar with:

* Workflows
* Tasks
* Simple Java Task
* System Tasks
    * HTTP Task
    * Inline Task
* System Operators
    * Fork/Join
    * Switch

In Part 2 of this code lab, we'll add another task to personalize our workflow.

## Improving on "Hello World"

The initial workflow was very simple, so in this version of Hello World, we'll use the users' IP to determine their location (and thus their time zone and current time).

Since all web requests include the requestor's IP, it can be assumed that the worflow will include the users IP address. We will add another task to make an API call to get the user's location from their IP address.

## The HTTP Task

Conductor has several System Tasks that can be run on the COnductor server,a nd do not need seperate worker applications to complete the task. The HTTP Task is one of these.  We can use this task to ping [https://ip-api.com/](https://ip-api.com/) and get the required information.

This task is added to the workflow.

```
{
  "name": "hello_world",
  "description": "hello world Workflow",
  "version": 1,
  "tasks": [
    {
      "name": "hello_world",
      "taskReferenceName": "hello_world_ref",
      "inputParameters": {},
      "type": "SIMPLE",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": []
    },
    {
    "name": "Get_IP",
    "taskReferenceName": "get_IP",
    "inputParameters": {
        "http_request": {
        "uri": "http://ip-api.com/json/${workflow.input.ipaddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query",
        "method": "GET"
        }
    },
    "type": "HTTP"
    },

  ],
  "outputParameters": {

    "hw_response": "${hello_world_ref.output.hw_response}"

  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": true,
  "ownerEmail": "devrel@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```