## Building Hello World application: Part 1

In this code lab, we'll start with a simple "Hello World" application, but will extend our "Hello World" in order to several new Conductor tasks into our workflow.

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

We'll also walk through how we can use version control to ensure that different versions of the workflow will work even as we make changes.

TODO add image of completed WF

## Requirements

You'll need to have Conductor running locally [natively](/server), or in a [Docker server](/running-locally-docker).  To run the Java worker, you'll need to have Java installed.

## A Simple Hello World (version 0.1)

Our initial Hello World will - on intiation - call a task (and underlying Java Worker) that will return the text "Hello World."  Its a very simple use case, and not one that you'd typicaly use Conductor for, but we'll use this extremely simple example as the foundation of our knowledge to build a larger orchestration workflow.

To get this workflow up and running, we'll need to create a task, a worker, and  workflow.

### Creating a task

Our ```helloWorld``` task will be called by the workflow.  When it is called, it will place a task in the worker queue for the workers to pickup and run.  The results are returned to the task from the worker - which is then passed backto thw workflow.

Our ```helloworld``` task takes no inputs, and provides no inputs to the Java application (they would appear in the ```inputKeys``` array).  The output of this task will be the response from the Java app.  Based on this definition, we can create the JSON that defines this task:

helloworld_task.json
```
{
"name": "hello_world",
"retryCount": 3,
"timeoutSeconds": 5,
"pollTimeoutSeconds": 5,
"inputKeys": [
  
],
"outputKeys": [
  "hw_response"
],
"timeoutPolicy": "TIME_OUT_WF",
"retryLogic": "FIXED",
"retryDelaySeconds": 5,
"responseTimeoutSeconds": 5,
"concurrentExecLimit": 100,
"rateLimitFrequencyInSeconds": 30,
"rateLimitPerFrequency": 50,
"ownerEmail": "devrel@orkes.io"
}
```

This task will add this to the worker queue.  It will retry 3 times, timing out after 5 seconds.  The output will appear in the reponse JSON with a key of ```hw_response```.

The curl command to add this task to Conductor is:

```
curl -X 'POST' \
  'http://localhost:8080/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[ <JSON above>]'
```

### Creating the workflow

The workflow inside conductor defines all of the tasks that will be run (and the order that they will run in.)  In this case, we will define a workflow with just the one task.

We'll version this as 1, asn version numbers can only be integers.

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
    }
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

WE now have everything in our Conductor instance ready to go to run this application.  The only missing piece is the Java app that will create the "hello world!" message.

### The Java app

The Java app can be found in the [orkesworkers](https://github.com/orkes-io/orkesworkers) repository. The easiest way to get this to run is to clone this repository, and then run the ```OrkesWorkersApplication.java``` application. This application will poll every second to the url specified in the [application.properties](https://github.com/orkes-io/orkesworkers/blob/main/src/main/resources/application.properties) file (choose ```conductor.server.url=http://localhost:8080/api/```)

The worker is called ```helloworld.java```, and looks as follows:

```
@Component
public class helloworld implements Worker {
    @Override
    public String getTaskDefName() {
        return "hello_world_task_java";
    }

    @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.addOutputData("hw_response", "Hello World!");
        result.setStatus(TaskResult.Status.COMPLETED);
        return result;
    }
}
```

We name the task, and in the TaskResult - send the "hello world!" response back to Conductor.

If we look at the workflow at localhost:5000/workflowDef/helloworld, we'll see a diagram similar to:

![workflow screenshot](img/hw_workflow1.png)

We now can test our workflow!

## Running our First Hello World

We can now send a POST:
> Note that for version 1 of ```hello world```, no parameters need be sent.

```
curl -X 'POST' \
  'http://localhost:8080/api/workflow/hello_world?version=1' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

This API call responds with a workflowId.  Check the workflowId in the Conductor UI at:
```http://localhost:5000/execution/<workflowId>```
or by calling the api:

```
curl -X 'GET' \
  'http://localhost:8080/api/workflow/<workflowId>?includeTasks=true' \
  -H 'accept: */*'
```

In both cases, we can see the outputData of our workflow. 

```
      "outputData": {
        "hw_response": "Hello World!"
      },
```

## Next Steps

In the next step of this code lab, we'll extend the "hello world" to be more friendly and customized.  In the next step, we'll determine the time of day and wish our 'hello worlders' a good morning/afternoon/evening.

[Read on to part 2](../helloworld2)