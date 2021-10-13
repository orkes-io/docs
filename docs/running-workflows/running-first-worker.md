---
sidebar_position: 2
---

# Running Your First Worker

In this article we will explore how you can get your first worker task running.

This article follows the quickest way to run your first worker task.

After completing the steps in this article, you will have:

> Knowledge about the worker task

> Idea about how worker task runs in an environment different than conductor



Worker tasks are implemented by your application(s) and run in a separate environment from Conductor. The worker tasks can be implemented in any language. These tasks talk to Conductor server via REST/gRPC to poll for tasks and update its status after execution.

Worker tasks are identified by task type `SIMPLE` in the blueprint.


## Workflow must look like this
![Swagger UI - Metadata - Workflow](/img/tutorial/firstWorkerWorkflow.png)

## Step 1 - Register the Worker Task

First let's create task definition for "simple_worker". We'd like this task to be retried 3 times on failure.

And to timeout after 300 seconds.
i.e. if the task doesn't finish execution within this time limit after transitioning to IN_PROGRESS state, the Conductor server cancels this task and schedules a new execution of this task in the queue.

And a responseTimeout of 180 seconds.

Send a POST request to `/metadata/taskdefs` endpoint to register these tasks.

```json
[{
  "name": "simple_worker",
  "retryCount": 3,
  "retryLogic": "FIXED",
  "retryDelaySeconds": 10,
  "timeoutSeconds": 300,
  "timeoutPolicy": "TIME_OUT_WF",
  "responseTimeoutSeconds": 180,
  "ownerEmail":"example@gmail.com"
}]
```

## Step 2 - Create a workflow definition

Creating Workflow definition is almost similar. We shall use the Task definitions created above.
Note that same Task definitions can be used in multiple workflows, or for multipe times in same Workflow (that's where taskReferenceName is useful).
```json
    "name": "running first worker",
    "description": "This workflow contains our first worker",
    "version": 1,
    "schemaVersion": 2,
    "ownerEmail":"example@gmail.com",
    "tasks": [
        {
            "name": "simple_worker",
            "taskReferenceName": "first_worker",
            "inputParameters": {
                "currentTimeOnServer": "${workflow.input.currentTimeOnServer}"
            },
            "type": "SIMPLE"
        }
 {
   ]
}
```

## Step 3 - Starting the workflow

Send a POST request to `/workflow` with:

```json
{
    "name": "running first worker",
    "version": 2,
    "input": {
    }
}
```

Successful POST request should return a workflow Id, which you can use to find the execution in the UI.


## Poll for Worker Task

Now "simple_worker" task is in `SCHEDULED` state, it is worker's turn to fetch the task, execute it and update Conductor with final status of the task.

Let's add following gradle dependencies in our Springboot Application, these are required to poll this task.

```js reference
https://github.com/orkes-io/orkesworkers/blob/main/build.gradle#L14-L20
```

A class needs to be created which implements Worker and defines its methods.

Make sure the the method 'getTaskDefName' returns string same as the task name we defined in step 1.

```js reference
https://github.com/orkes-io/orkesworkers/blob/main/src/main/java/io/orkes/samples/workers/SimpleWorker.java#L11-L26
```


