
# Hello World Codelab 
## Part 1

In this code lab, we'll start with a simple "Hello World" application, but will extend our "Hello World" in order to several new Conductor tasks into our workflow.

When you've completed this code lab, you'll be familiar with:

* Workflows
* Workflow versioning
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

This demo will use the Orkes [Conductor playground](https://play.orkes.io) to run the workflow.  You can get an account for free by signing up with your email or Google account.  Alternatively, you can also use the open source Conductor [installed locally](/docs/getting-started/install/running-locally).

To run the Java worker, you'll need to have Java installed.

## A Simple Hello World 
### (workflow version 1)

Our initial Hello World will - on initiation - call a task (and underlying Java Worker) that will return the text "Hello World."  Its a very simple use case, and not one that you'd typically use Conductor for, but we'll use this extremely simple example as the foundation of our knowledge to build a larger orchestration workflow.

To get this workflow up and running, we'll need to create a task, a worker, and  workflow.

### Creating a task

Our ```helloWorld``` task will be called by the workflow.  When it is called, it will place a task in the worker queue for the workers to pickup and run.  The results are returned to the task from the worker - which is then passed back to the workflow.

Our ```helloworld``` task takes no inputs, and provides no inputs to the Java application (they would appear in the ```inputKeys``` array).  The output of this task will be the response from the Java app.  Based on this definition, we can create the JSON that defines this task:

helloworld_task.json
```
{
"name": "hello_world_<uniquetag>",
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
"ownerEmail": "<your_email>"
}
```

This task will add this to the worker queue.  It will retry 3 times, timing out after 5 seconds.  The output will appear in the response JSON with a key of ```hw_response```.

To add this Task in your Playground:
Click "Task Definitions" in the left navigation, and then click the "Define Task" button in the upper right.  Paste the workflow into the edit field.  Now, change ```<uniquetag>``` in the ```name``` field, and update your e-mail address in the ```ownerEmail``` field.

 > Note: All tasks and workflows require a unique name in the Playground.



### Creating the workflow

The workflow inside conductor defines all of the tasks that will be run (and the order that they will run in.)  In this case, we will define a workflow with just the one task.

We'll version this as 1, as version numbers can only be integers.  Also note that the name will require the same ```<uniquetag>``` added to keep the workflow name unique.

```
{
  "name": "hello_world_<uniquetag>",
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

We now have everything in our Conductor instance ready to go to run this application.  The only missing piece is the Java app that will create the "hello world!" message.

### Application Permissions

The Orkes Playground is a secure workspace, so we will need to create application credentials for your worker.  To do this, click ```Applications``` in the left navigation.  

> Note: if you already have created an application and JWT for the OrkesWorkers github repository, you can edit that application to add the new workflow and task.

Create a new application. In the 2nd table, click the ```+``` icon.

Add your Workflow:
1. Target Type: ```Workflow```
2. Target: ```hello_world_<uniqueid>```
3. Access: ```Execute```

And repeat the process to add the task
1. Target Type: ```Task```
2. Target: ```hello_world_<uniqueid>```
3. Access: ```Execute```

Now we will create an Access Key. This will generate a Key and Secret Id.  We can use these values to generate a JWT Authorization token:

```
curl -s -X "POST" "https://play.orkes.io/api/token"    -H 'Content-Type: application/json; charset=utf-8'    -d '{
 "keyId": "<key>",
 "keySecret": "<secret>"
}'
{"token":"eyJhbGciOiJIUzUxMiJ9.eyJvcmtlc19rZXkiOiJhZWQ0YWFmZi0wZDYyLTRlYTEtOTdlNS04YjBkZDA1MzlmMzMiLCJvcmtlc19jb25kdWN0b3JfdG9rZW4iOnRydWUsInN1YiI6ImFwcDo1OGExMmRjYi1jMmEyLTQ3MDAtYmJjNS1jZDY1YjA3WWI0NDEiLCJpYXQiOjE2NDU4MjIzOTY1Njd9.yDVwu2Y2j111vUwNwbxCOFKn16AUlDXG8-e4oD6wA8QSBbQF38KJhbFiK2IFc4t_DeTi9jKjydKOKKkyw5LqJQ"}
```
Keep this token handy for the next step.

### The Java app

The Java app can be found in the [orkesworkers](https://github.com/orkes-io/orkesworkers) repository. The easiest way to get this to run is to clone this repository, and then run the ```OrkesWorkersApplication.java``` application. 

There are 2 small changes to be made to the [application.properties](https://github.com/orkes-io/orkesworkers/blob/main/src/main/resources/application.properties) file:

1. Choose ```conductor.server.url=https://play.orkes.io/api/``` so that the app polls the correct Conductor server.
2. Set ```conductor.server.auth.token=<tokenId>``` using the tokenId you generated in the last section.


The worker is called ```helloworld.java```, and looks as follows:

```
@Component
public class helloworld implements Worker {
    @Override
    public String getTaskDefName() {
        return "hello_world_<uniquetag>";
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

We name the task (**update the name in the ```return "hello_world_<uniqueId>"``` string to match your task's name**), and in the TaskResult - send the "hello world!" response back to Conductor.

We can examine our workflow by browsing through ```Workflow definitions``` -> ```hello_world_<uniqueid>```.  The url for this page is ```https://play.orkes.io/workflowDef/hello_world_<uniqueId>```

![workflow screenshot](img/hw_playworkflow1.png)






We now can test our workflow!

## Running our First Hello World

We can test our workflow by clicking the ```Run Workflow``` box in the left navigation. Select your workflow name, choose version 1, and leave the input blank (or empty {}), since there are no input parameters:

![running Hello World](img/hw1_runworkflow.png)


As you can see in the screenhot above, submitting the workflow creates a workflowId. clicking this link will take you to the Workflow execution page (the url is ```play.orkes.io/execution/<workflowid>```):

![Hello World execution](img/hw1_execution.png)

Clicking through this page, we can see that the output of the workflow is, as expected "Hello World!"

![output screenshot](img/hw1_output.png)

## Next Steps

In the next step of this code lab, we'll extend the "hello world" to be more friendly and customized.  In the next step, we'll determine the time of day and wish our 'hello worlders' a good morning/afternoon/evening.

We'll also use versioning to ensure that both the original and the updated "Hello World" applications continue to run.

[Read on to part 2](helloworld2)