---
sidebar_position: 2
---

# Running First Worker

In this article, we will explore how you can get your first worker task running.

We are hosting the code used in this article [here](https://github.com/orkes-io/orkesworkers). You can clone and use it as a reference
locally.

In the first codelab [Running your First Workflow](/content/docs/getting-started/run/running-first-workflow), we created a simple workflow that used an HTTP [System Task](/content/docs/getting-started/concepts/system-tasks) to run our workflow. System tasks run on the Conductor server - making commonly used functions easy to deploy in your workflow. Now it's time to explore how to run a
custom worker that you will implement yourself.

After completing the steps in this article, you will:

1. Learn about a SIMPLE worker type that runs your custom code.
2. Learn about how a custom worker task runs from your environment and connects to Conductor.

Worker tasks are implemented by your application(s) and run in a separate environment from Conductor. The worker tasks
can be implemented in any language. These tasks talk to the Conductor server via REST/gRPC to poll for tasks and update their
status after execution. In our example, we will be implementing a Java-based worker by leveraging the official [Java Client SDK](/content/docs/how-tos/sdks/java-sdk/worker_sdk). (A full list of [SDKs](/content/docs/how-tos/SDKs))

Worker tasks are identified by task type `SIMPLE` in the workflow JSON definition.

### Step 1 - Register the Worker Task

First, let's create a task definition for "simple_worker". Send a POST request to `/metadata/taskdefs` API endpoint on your
conductor server to register these tasks.

```json
[
  {
    "name": "simple_worker",
    "retryCount": 3,
    "retryLogic": "FIXED",
    "retryDelaySeconds": 10,
    "timeoutSeconds": 300,
    "timeoutPolicy": "TIME_OUT_WF",
    "responseTimeoutSeconds": 180,
    "ownerEmail": "example@gmail.com"
  }
]
```

In the [Running your First Workflow](/content/docs/getting-started/run/running-first-workflow) example, we used the Swagger API UI to make our API calls:

- [Orkes Playground](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config)

- [Local Conductor](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config)

> NOTE: With the Playground, you will need an authentication token. In the dashboard, click your user icon in the top right, and choose the `copy token` option. Back on the Swagger page, click the lock to the right of the endpoint, and paste the token here.

You can also use curl to add a task:

```shell
curl 'http://localhost:8080/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'Referer: ' \
  -H 'Content-Type: application/json' \
  --data-raw '[{"name":"simple_worker", "retryCount":3,"retryLogic":"FIXED","retryDelaySeconds":10,"timeoutSeconds":300,"timeoutPolicy":"TIME_OUT_WF","responseTimeoutSeconds":180,"ownerEmail":"example@gmail.com"}]'
```

> For Orkes Playground, add an additional header line to your curl command: `-H 'X-Authorization: {YourToken}' \` (and replace `http://localhost:8080` with `https://play.orkes.io`). Alternatively, the playground also offers [task creation](https://play.orkes.io/newTaskDef) via the dashboard.

Here is an overview of the task fields that we just created

1. `"name"` : A unique name for your worker.
2. `"retryCount"` : The number of times the Conductor should retry your worker task in the event of an unexpected failure.
3. `"retryLogic"` : `FIXED` - The retry logic - options are `FIXED` and `EXPONENTIAL_BACKOFF`
4. `"retryDelaySeconds"` : Time to wait before retrying (Or the time in the exponential back-off calculation).
5. `"timeoutSeconds"` : Time in seconds, after which the task is marked as `TIMED_OUT`. (This is optional, and some long running tasks do not need this value.)
6. `"timeoutPolicy"` : `TIME_OUT_WF` - Task's timeout policy. Options can be found [here](/content/docs/how-tos/Tasks/task-timeouts).
7. `"responseTimeoutSeconds"` : Must be greater than 0 and less than timeoutSeconds. The task is rescheduled if not updated with a status after this time (heartbeat mechanism). Useful when the worker polls for the task but fails to complete it due to errors/network failure. Defaults to 3600.
8. `"ownerEmail"` : **Mandatory** metadata to manage who created or owns this worker definition in a shared conductor environment.

More details on the fields used and the remaining fields in the task definition can be
found [here](/content/docs/getting-started/concepts/tasks-and-workers#task-definitions).

### Step 2 - Create a Workflow definition

Creating a Workflow definition is similar to creating a task definition. In our workflow, we will use the task we
defined earlier. Note that the same Task definitions can be used in multiple workflows, or for multiple times in the same
Workflow. Conductor references the task via the `taskReferenceName`, so each task invocation in the same workflow must have a unique value in this parameter.

```json
{
  "createTime": 1634021619147,
  "updateTime": 1630694890267,
  "name": "first_sample_workflow_with_worker",
  "description": "First Sample Workflow With Worker",
  "version": 1,
  "tasks": [
    {
      "name": "simple_worker",
      "taskReferenceName": "simple_worker_ref_1",
      "inputParameters": {},
      "type": "SIMPLE"
    }
  ],
  "inputParameters": [],
  "outputParameters": {
    "currentTimeOnServer": "${simple_worker_ref_1.output.currentTimeOnServer}",
    "message": "${simple_worker_ref_1.output.message}"
  },
  "schemaVersion": 2,
  "restartable": true,
  "ownerEmail": "example@email.com",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0
}
```

Notice that in the workflow definition, we are using a single-worker task using the task worker definition we created
earlier. The task is of type `SIMPLE`.

We can use Swagger to add the workflow:

- [Orkes Playground](https://play.orkes.io/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

- [Local Conductor](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/metadata-resource/create)

Here is the curl command to add a workflow to a local version of Conductor (for Orkes Playground, change the domain, and add the `X-Authentication` header as we did in step 1 when adding a task):

```shell
curl 'http://localhost:8080/api/metadata/workflow' \
-H 'accept: */*' \
-H 'Referer: ' \
-H 'Content-Type: application/json' \
--data-raw '{"createTime":1634021619147,"updateTime":1630694890267,"name":"first_sample_workflow_with_worker","description":"First Sample Workflow With Worker","version":1,"tasks":[{"name":"simple_worker","taskReferenceName":"simple_worker_ref_1","inputParameters":{},"type":"SIMPLE"}],"inputParameters":[],"outputParameters":{"currentTimeOnServer":"${simple_worker_ref_1.output.currentTimeOnServer}","message":"${simple_worker_ref_1.output.message}"},"schemaVersion":2,"restartable":true,"ownerEmail":"example@email.com","timeoutPolicy":"ALERT_ONLY","timeoutSeconds":0}'
```

### Step 3 - Starting the Workflow

We've created a task that polls an external workflow and added the task to a workflow. When we run the workflow, Conductor adds a job to the task's queue. Let's do that now:

- Playground: Click `run workflow`, select the workflow by name, and click `run workflow`
- In Swagger, the endpoint to start a workflow is `POST /api/workflow/{workflowName}`.
- Using curl (Same modifications for the playground as above):

```shell
curl 'http://localhost:8080/api/workflow/first_sample_workflow_with_worker' \
  -H 'accept: text/plain' \
  -H 'Referer: ' \
  -H 'Content-Type: application/json' \
  --data-raw '{}'
```

The API path contains the workflow name `first_sample_workflow_with_worker` and our workflow doesn't need any inputs, so the body of the call is an empty JSON string: `{}`.

A successful POST request will return a workflow Id, a unique identifier for the invocation of the workflow. Now, we can visualize the execution of the workflow by navigating to `http://localhost:5000/execution/<workflowId>`.

### Step 4 - Poll for Worker Task

Notice that the workflow is running. If you click on `simple_worker_ref_1` in the diagram, you can see that the task is marked as `SCHEDULED`. Conductor is ready to send this task off for processing, but we have not yet connected our worker to Conductor to do that work.

In the next step, we will create the worker that is used to complete our Conductor task. We'll also connect it to our Conductor instance so that the `simple_worker` tasks can be completed and allow our workflows to be complete.

### Step 5 Building the worker

To simplify this tutorial, we have placed the `simple_worker` worker in a [GitHub repository](https://github.com/orkes-io/orkesworkers/blob/main/build.gradle).

Clone this repository to your local machine, and open it in your IDE of choice. Our worker will poll the conductor server every second to see if there is a task in its queue. For that to happen, we need to tell the worker where our Conductor server is. To do this, we must modify the file `/src/main/resources/application.properties`.

- For a local Conductor installation, change `conductor.server.url` to `http://localhost:8080/api`.

- For Playground, you'll need to [create an application](/content/docs/getting-started/concepts/access-control-applications#configuring-your-application) to create a key/secret that authenticates your worker with the playground, and then add the values of the key and secret to lines 2 and 3 of `application.properties` as indicated.

#### How Workers and Conductor interact

The `OrkesWorkersApplication.java` is the runnable Java application. \* `taskClient` creates an Orkes taskClient, and uses the url (and the Java SDK to create an access token from the Key and secret for Orkes Playground).

- `TaskRunnerConfigurer` grabs a list of workers (there are many in the repository), and creates a thread for each one. These worker threads will poll the Conductor server to find tasks that must be run.

### Step 6: Running your worker

Run your Java application to start running your worker.

After running your application, it will be able to poll and run your worker. Let's go back and load up the previously
created workflow in your UI.

![Conductor UI - Workflow Run](/img/tutorial/successfulWorkerExecution.png)

In your worker, you had this implementation:

```js
result.addOutputData("currentTimeOnServer", currentTimeOnServer);
result.addOutputData("message", "Hello World!");
```

As you can see in the screenshot above, the worker has added these outputs to the workflow run. Play around with this, change the outputs, re-run, and see how it works.

## Summary

Now, we learned how to run a sample workflow in our Conductor installation with a custom worker.
Concepts we touched on:

1. Adding Task (worker) definition
2. Adding Workflow definition with a custom `SIMPLE` task
3. Running Conductor client using the Java SDK

Try out more complex workflows in our other codelabs, or build your own. We've created a number of workflows that you can edit in our [use cases](/content/docs/usecases/image_processing) section.
