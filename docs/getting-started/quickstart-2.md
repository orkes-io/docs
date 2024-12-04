---
slug: "../quickstarts/write-workers"
description: "In this quickstart, learn how to write your own workers for custom business logic."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart 2: Write Workers

In Conductor, tasks are executed using a worker-queue architecture. System tasks are serviced by Conductor workers, while custom tasks are serviced by the workers that you create. In this quickstart, you will learn how to write your own workers that will execute custom tasks.

**Decoupled by design**

The worker code contains your task logic, which is decoupled from both the task definition (number of retries, rate limits) and the workflow-specific task configuration (inputs from other tasks, optionality).

**Worker deployment**

Conductor workers can run in a cloud-native environment or on-premise. Like any other application, workers can be easily deployed in a container, VM, or bare metal.

For the purpose of this quickstart, we will deploy the worker from your own machine.


## Quickstart overview
1. Create task worker(s) that poll for scheduled tasks at regular interval
2. Create and register task definitions for these workers.
3. Add the custom task to the workflow definition.
4. Grant execution permission to the worker.


## Before you begin

Ensure that you have [prepared your tools and access](../quickstarts#preparing-your-tools).


## Create a worker application

Create a new project for your worker application, keeping it separate from your workflow client.

<Tabs groupId="language">
<TabItem value="python" label="Python">

You can create a worker by writing a Python function and annotating it with a @worker_task decorator.

``` python
from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name='greetings')
def greetings(name: str) -> str:
    return f'Hello, {name}'
```


A worker can take inputs which are primitives (str, int, float, bool, and so on) or complex data classes. Here is an example worker that uses `dataclass` as part of the worker input.


``` python
from conductor.client.worker.worker_task import worker_task
from dataclasses import dataclass

@dataclass
class OrderInfo:
    order_id: int
    sku: str
    quantity: int
    sku_price: float

    
@worker_task(task_definition_name='process_order')
def process_order(order_info: OrderInfo) -> str:
    return f'order: {order_info.order_id}'
```

Workers use a polling mechanism (with a long poll) to check for any available tasks from the server periodically. The startup and shutdown of workers are handled by the conductor.client.automator.task_handler.TaskHandler class.

``` python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration

def main():
    api_config = Configuration()

    task_handler = TaskHandler(
        workers=[],
        configuration=api_config,
        scan_for_annotated_workers=True,
        import_modules=['greetings']  # import workers from this module - leave empty if all the workers are in the same module
    )
    
    # start worker polling
    task_handler.start_processes()

    # Call to stop the workers when the application is ready to shutdown
    task_handler.stop_processes()


if __name__ == '__main__':
    main()
```

</TabItem>

<TabItem value="java" label="Java">

Create a worker class that implements the `Worker` interface and its methods `getTaskDefName()` and `execute(Task task)`.

``` java
import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;

public class SimpleWorker implements Worker {

    @Override
    public String getTaskDefName() {
        return "simple-java-worker";
    }

    @Override
    public TaskResult execute(Task task) {
        TaskResult taskResult = new TaskResult(task);
        taskResult.setStatus(TaskResult.Status.COMPLETED);
        taskResult.getOutputData().put("message", "Hello World!");
        return taskResult;
    }
}
```

Workers use a polling mechanism as defined by the TaskClient. Here is an example of a Java worker application:

``` java
package com.netflix.conductor.gettingstarted;

import java.util.List;

import com.netflix.conductor.client.automator.TaskRunnerConfigurer;
import com.netflix.conductor.client.http.ConductorClient;
import com.netflix.conductor.client.http.TaskClient;
import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;

public class HelloWorker implements Worker {

    @Override
    public TaskResult execute(Task task) {
        var taskResult = new TaskResult(task);
        taskResult.setStatus(TaskResult.Status.COMPLETED);
        taskResult.getOutputData().put("message", "Hello World!");
        return taskResult;
    }

    @Override
    public String getTaskDefName() {
        return "hello_task";
    }

    public static void main(String[] args) {
        var client = new ConductorClient("http://localhost:8080/api");
        var taskClient = new TaskClient(client);
        var runnerConfigurer = new TaskRunnerConfigurer
                .Builder(taskClient, List.of(new HelloWorker()))
                .withThreadCount(10)
                .build();
        runnerConfigurer.init();
    }
}
```

</TabItem>

<TabItem value="javascript" label="JavaScript">


Create a worker function using the following template:

``` javascript
import { ConductorWorker, Task } from "@io-orkes/conductor-javascript";

const worker: ConductorWorker = {
  taskDefName: "task-def-name",
  execute: async (
    task: Task
  ): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> => {},
};
```


Use the `TaskRunner` interface to start the workers, which takes care of polling server for the work, executing worker code, and updating the results back to the server.

``` javascript
import {
  OrkesApiConfig,
  orkesConductorClient,
  TaskRunner,
} from "@io-orkes/conductor-javascript";

const clientPromise = orkesConductorClient({
  keyId: "XXX",
  keySecret: "XXXX",
  serverUrl: "SERVER_URL", // eg: https://developer.orkescloud.com/api
});

const client = await clientPromise;

const taskDefName = "HelloWorldWorker";

const customWorker: ConductorWorker = {
taskDefName,
  execute: async ({ inputData, taskId }) => {
    return {
      outputData: {
        greeting: "Hello World",
      },
      status: "COMPLETED",
    };
  },
};
// Worker Options will take precedence over options defined in the manager

const manager = new TaskManager(client, [customWorker], {
  options: { pollInterval: 100, concurrency: 1 },
});

manager.startPolling();
// You can update all worker settings at once using
manager.updatePollingOptions({ pollInterval: 100, concurrency: 1 });

// You can update a single worker setting using :
manager.updatePollingOptionForWorker(taskDefName, {
  pollInterval: 100,
  concurrency: 1,
});

manager.isPolling // Will resolve to true

await manager.stopPolling();

manager.isPolling // Will resolve to false
```

</TabItem>

<TabItem value="csharp" label="C#">

Create a worker class that implements the `IWorkflowTask` interface.

``` csharp
public class SimpleWorker : IWorkflowTask
{
    public string TaskType { get; }
    public WorkflowTaskExecutorConfiguration WorkerSettings { get; }

    public SimpleWorker(string taskType = "test-sdk-csharp-task")
    {
        TaskType = taskType;
        WorkerSettings = new WorkflowTaskExecutorConfiguration();
    }

    public TaskResult Execute(Task task)
    {
        return task.Completed();
    }
}
```

Use `WorkflowTaskHost` to create a worker host, which requires a configuration object and workers.

``` csharp
using Conductor.Client.Worker;
using System;
using System.Threading.Thread;

var host = WorkflowTaskHost.CreateWorkerHost(configuration, new SimpleWorker());
await host.startAsync();
Thread.Sleep(TimeSpan.FromSeconds(100));
```

</TabItem>

<TabItem value="go" label="Go">

Create a worker function using the following template:

``` go
type ExecuteTaskFunction func(t *Task) (interface{}, error)
```

Here is an example worker in Go:

``` go
func Greet(task *model.Task) (interface{}, error) {
	return map[string]interface{}{
		"hello": "Hello, " + fmt.Sprintf("%v", task.InputData["person_to_be_greated"]),
	}, nil
}
```

Use the `TaskRunner` interface to start the workers, which takes care of polling server for the work, executing worker code, and updating the results back to the server.

``` go
apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
    "https://developer.orkescloud.com/api",
))

taskRunner := worker.NewTaskRunnerWithApiClient(apiClient)
//Start polling for a task by name "simple_task", with a batch size of 1 and 1 second interval
//Between polls if there are no tasks available to execute
taskRunner.StartWorker("simple_task", examples.SimpleWorker, 1, time.Second*1)
//Add more StartWorker calls as needed

//Block
taskRunner.WaitWorkers()
```

</TabItem>

<TabItem value="clojure" label="Clojure">

Create a worker function using the following template:
``` clojure
(def worker
           {:name "cool_clj_task_b",
            :execute (fn [d]
                       [:completed (:inputData d)])})
```

Use the `TaskRunner` interface to start the workers, which takes care of polling server for the work, executing worker code, and updating the results back to the server.

``` clojure
(:require 
            [io.orkes.taskrunner :refer :all])

;; Will  poll for tasks
(def shutdown-task-runner (runner-executer-for-workers options [worker]))

;; Stops polling for tasks
(shutdown-task-runner )
```

</TabItem>
</Tabs>


## Add worker task to a workflow

All worker tasks need to be registered to the Conductor server before it can be added to a workflow. Let’s add a worker to a workflow and give it a test run:
1. Register the task by adding its definition in Conductor.
2. Add a Worker task to a workflow.

### A. Code

<Tabs groupId="language">
<TabItem value="python" label="Python">

Register the task definition to Conductor.

``` python
from conductor.client.http.models.task_def import TaskDef

taskDef = TaskDef(
    name="PYTHON_TASK",
    description="Python Task Example",
    input_keys=["a", "b"]
)
metadata_client.register_task_def(taskDef)
```

Add the Worker task to your workflow.
``` python
workflow >> SimpleTask("simple_task", "simple_task_ref_2")
updatedWorkflowDef = workflow.to_workflow_def()
metadata_client.update_workflow_def(updatedWorkflowDef, True)
```

</TabItem>

<TabItem value="java" label="Java">

Create and register the task definition to Conductor.

``` java
TaskDef taskDef = new TaskDef();
taskDef.setName(your_task_name);
taskDef.setDescription("task to compress image");
taskDef3.setOwnerEmail("test@orkes.io");
taskDef.setRetryCount(3);  // Optional

metadataClient.registerTaskDefs(Arrays.asList(taskDef));
```

Add the Worker task to your workflow.
``` java
builder.add(
        new SimpleTask("send_email", "send_email")
                .input("email", "${workflow.input.email}")
                .input("subject", "Your insurance quote for the amount ${generate_quote.output.amount}")
);
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

Register the task definition to Conductor.

``` javascript
public registerTask(taskDef: TaskDef): Promise<void> {
    return tryCatchReThrow(() =>
      this._client.metadataResource.registerTaskDef([taskDef])
    );
  }
```

Add the Worker task to your workflow.

</TabItem>

<TabItem value="csharp" label="C#">

Register the task definition to Conductor.
``` csharp
{
new TaskDef{Description = ExampleConstants.GetEmailDescription, Name = ExampleConstants.GetEmail },
new TaskDef{Description = ExampleConstants.SendEmailDescription,Name = ExampleConstants.SendEmail}
};

            _metaDataClient.RegisterTaskDef(taskDefs);
```

Add the Worker task to your workflow.
``` csharp
            _metaDataClient.UpdateWorkflowDefinitions(new List<WorkflowDef>(1) { workflow });
```

</TabItem>

<TabItem value="go" label="Go">

Register the task definition to Conductor.

``` go
client.RegisterTaskDef(ctx, taskDefinitions)
```

Add the Worker task to your workflow.

</TabItem>

<TabItem value="clojure" label="Clojure">

Register the task definition to Conductor.

``` clojure
(defn register-tasks-using-client
  "Given a client instance and a list of tasks,
  will register the task in consuctor"
  [client tasks]
  (client "taskdefs" :method :post :body tasks))
```

</TabItem>
</Tabs>



### B. Orkes Platform
1. Register the task definition to Conductor.
    1. In the left navigation menu, go to **Definitions** > **Task**.
    2. Select **(+) Define task**.
    3. Enter the **Name** for the task, which must match the task definition name in your worker code.
    4. Select **Save** > **Confirm Save**.
2. Add the Worker task to your workflow.
    1. In the left navigation menu, go to **Definitions** > **Workflow** and select the workflow to add the task.
    2. In the visual workflow editor, select the **(+)** icon to add a new task. There are two ways to add a worker task:
        * Search for your task using its task name and select it.
        * Add a **Worker Task (Simple)** and enter the task name in Task Definition.
    3. On the top right, select **Save** > **Confirm**.


## Grant execution permission to worker

Finally, your worker application requires programmatic access to the Conductor server. This can be done by creating an application account for your worker application.

**To grant execution permission to worker:**
1. In Orkes Platform, go to **Access Control **> **Applications** and create a new application.
2. Enable the **Worker** application role, which allows the application to poll and update tasks.
3. Generate the application access key and set the Key ID and Key Secret in your project environment variables.

```
export CONDUCTOR_SERVER_URL=<SERVER_URL> // eg: https://developer.orkescloud.com/api
export CONDUCTOR_AUTH_KEY=<KEY_ID>
export CONDUCTOR_AUTH_SECRET=<KEY_SECRET>
```

4. Grant Execute permission to the application.
    1. Under Permissions, select **Add permission**.
    2. Select the **Task** tab and then your worker task.
    3. Enable the **Execute** toggle.
    4. Select **Add Permissions**.

The application account can now execute the worker task.


## Launch the worker

Launch the worker to begin polling the Conductor server. The method depends on your language and project configuration.

**Example**

``` python
python3 main.py
```

When you run the workflow with the Worker task, the task should run to completion. Learn how to deploy the workflow in the next quickstart.