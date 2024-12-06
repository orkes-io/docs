---
slug: "/developer-guides/using-workers"
description: "Learn how to set up workers that can be deployed anywhere to service custom tasks in Conductor."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Workers

A worker is a piece of code responsible for executing a task. In Conductor, workers can be implemented in any language and deployed anywhere. Here is the overview for using custom workers:
1. Create a worker project in your preferred language.
2. Set up the worker.
3. Use the worker task in a workflow.


## Creating a worker

To create a worker, you can use Conductor’s polyglot SDKs. These SDKs contain features that make it easier to create workers, such as polling threads, metrics, and server communication.

### Best practices for writing workers

In Conductor, each worker should embody the microservice design pattern and follow these basic principles:
* **Defined I/O**—Each worker executes a specific task and produces a well-defined output, given specific inputs.
* **Statelessness**—Workers are stateless and do not implement workflow-specific logic, like deciding what task comes next.
* **Idempotency**—Workers are meant to be idempotent and should handle cases where partially-executed tasks get rescheduled for completion.
* **Decoupled implementation**—Workers do not implement the logic to handle retries, timeouts, and other implementation details, which are handled by the Conductor server.


### Step 1: Set up your worker project

Begin by creating a project to run workers for your custom task.

<Tabs groupId="language">
<TabItem value="python" label="Python">

For Python projects, it is a good practice to use a virtual environment.


<Tabs>
<TabItem value="mac" label="Mac">

``` shell
// Using venv
python -m venv myProject
source myProject/bin/activate

// Using virtualenv
virtualenv myProject
source myProject/bin/activate
```

</TabItem>

<TabItem value="windows" label="Windows">

``` shell
// Using venv
python -m venv myProject
myProject\Scripts\activate

// Using virtualenv
virtualenv myProject
myProject\Scripts\activate
```
</TabItem>
</Tabs>


</TabItem>


<TabItem value="go" label="Go">

For Go projects, you should initialize your Go module.

``` go
go mod init <module-path>
```

</TabItem>

</Tabs>



### Step 2: Get Conductor SDK

Get [Conductor SDK](../category/sdks) in your preferred language.

<Tabs groupId="language">
<TabItem value="python" label="Python">

``` python
python3 -m pip install conductor-python
```

</TabItem>

<TabItem value="java" label="Java">

**For Gradle:**
``` java
implementation 'org.conductoross:conductor-client:4.0.1'
implementation 'org.conductoross:java-sdk:4.0.1'
implementation 'io.orkes.conductor:orkes-conductor-client:4.0.1' 
```

**For Maven:**
``` xml
<dependency>
    <groupId>org.conductoross</groupId>
    <artifactId>conductor-client</artifactId>
    <version>4.0.1</version>
</dependency>
<dependency>
    <groupId>org.conductoross</groupId>
    <artifactId>java-sdk</artifactId>
    <version>4.0.1</version>
</dependency>
<dependency>
    <groupId>io.orkes</groupId>
    <artifactId>orkes-conductor-client</artifactId>
    <version>4.0.1</version>
</dependency>
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

**npm:**
``` shell
npm i @io-orkes/conductor-javascript
```

**yarn:**
``` bash
yarn add @io-orkes/conductor-javascript
```

</TabItem>

<TabItem value="csharp" label="C#">

``` csharp
dotnet add package conductor-csharp
```

</TabItem>

<TabItem value="go" label="Go">

``` go
go get github.com/conductor-sdk/conductor-go
```

</TabItem>

<TabItem value="clojure" label="Clojure">

Get the Conductor Clojure package from [clojars](https://clojars.org/io.orkes/conductor-clojure).

``` clojure
:deps {org.clojure/clojure {:mvn/version "1.11.0"}
        io.orkes/conductor-clojure {:mvn/version "0.3.0"}}
```

</TabItem>
</Tabs>


### Step 3: Write your worker logic

In general, workers can be instantiated from classes that implement the Worker interface, or that are annotated using a WorkerTask annotation or decorator, depending on the language. A worker in your project may look like this:

<Tabs groupId="language">
<TabItem value="python" label="Python">

``` python
from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name='myTask')
def greet(name: str) -> str:
    return f'Hello {name}'
```

</TabItem>

<TabItem value="java" label="Java">

``` java
import com.netflix.conductor.sdk.workflow.task.InputParam;
import com.netflix.conductor.sdk.workflow.task.WorkerTask;

public class Workers {
    @WorkerTask("myTask")
    public String greeting(@InputParam("name") String name) {
        return ("Hello " + name);
    }
}
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

``` javascript
const worker = {
  taskDefName: "myTask",
  execute: async (task) => {
    console.log(task)
    return {
      outputData: {
        hello: "Hello " + task.inputData?.name,
      },
      status: "COMPLETED",
    };
  },
};
```

</TabItem>

<TabItem value="csharp" label="C#">

``` csharp
[WorkerTask(taskType: "myTask", batchSize: 5, pollIntervalMs: 500, workerId: "csharp-worker")]
public static TaskResult MyTask(Conductor.Client.Models.Task task)
{
    var inputData = task.InputData;
    var result = task.ToTaskResult();
    result.OutputData = new Dictionary<string, object>
    {
        ["message"] = "Hello " + inputData.GetValueOrDefault("name", null)
    };
    return result;
}
```

</TabItem>

<TabItem value="go" label="Go">

``` go
import (
	"fmt"

	"github.com/conductor-sdk/conductor-go/sdk/model"
)

func myTask(task *model.Task) (interface{}, error) {
	return map[string]interface{}{
		"greetings": "Hello, " + fmt.Sprintf("%v", task.InputData["name"]),
	}, nil
}
```

</TabItem>

<TabItem value="clojure" label="Clojure">

``` clojure
(def worker
  {:name "myTask",
   :execute (fn [d]
              (let [name (get-in d [:inputData :name])]
                {:status  "COMPLETED"
                 :outputData {"message" (str "hello "  name)}}))})
```

</TabItem>
</Tabs>


### Step 4: Run your worker

Start the workers using the SDK-provided interface. The interface polls the server for work, executes worker code, and updates the results back to the server.

<Tabs groupId="language">
<TabItem value="python" label="Python">

Run the Python worker by calling a TaskHandler.

``` python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration

task_handler = TaskHandler(configuration=Configuration())
task_handler.start_processes()
task_handler.join_processes()
```

Full worker example: [https://github.com/conductor-oss/python-worker-container/tree/main](https://github.com/conductor-oss/python-worker-container/tree/main)

</TabItem>

<TabItem value="java" label="Java">

Run the annotated Java worker using WorkflowExecutor.

``` java
var client = ApiClient.builder()
        .basePath("https://developer.orkescloud.com/api")
        .credentials("_CHANGE_ME_", "_CHANGE_ME_")
        .build();
int pollingInterval = 50;
var executor = new WorkflowExecutor(client, pollingInterval);
// List of packages  (comma separated) to scan for annotated workers.
// Please note, the worker method MUST be public and the class in which they are defined
// MUST have a no-args constructor
executor.initWorkers("io.orkes.conductor.examples.workers");
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

Import TaskRunner to run the JavaScript worker.

``` javascript
import {
  OrkesApiConfig,
  orkesConductorClient,
  TaskRunner,
} from "@io-orkes/conductor-javascript";

orkesConductorClient({
  keyId: process.env.CONDUCTOR_AUTH_KEY,
  keySecret: process.env.CONDUCTOR_AUTH_SECRET,
  serverUrl: process.env.CONDUCTOR_SERVER_URL,
}).then((client) =>
  new TaskManager(client, [ myWorker ]).startPolling()
);
```

</TabItem>

<TabItem value="csharp" label="C#">

 ``` csharp
ApiExtensions.Configuration = new Configuration
{
    BasePath = "https://developer.orkescloud.com/api",
    AuthenticationSettings = new OrkesAuthenticationSettings("_CHANGE_ME_", "_CHANGE_ME_")
};

var host = WorkflowTaskHost.CreateWorkerHost(
    ApiExtensions.Configuration,
    LogLevel.Information
);
host.Start();
 ```

</TabItem>

<TabItem value="go" label="Go">

Run the Go worker using TaskRunner.

``` go
import (
	"github.com/conductor-sdk/conductor-go/sdk/client"
	"github.com/conductor-sdk/conductor-go/sdk/model"
	"github.com/conductor-sdk/conductor-go/sdk/settings"

	"github.com/conductor-sdk/conductor-go/sdk/worker"
)

apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
    "https://developer.orkescloud.com/api",
))

taskRunner = worker.NewTaskRunnerWithApiClient(apiClient)
taskRunner.StartWorker("myTask", myTask, 1, time.Second*1)
```

</TabItem>

<TabItem value="clojure" label="Clojure">

``` clojure
(defn -main
  [& args]
  ;; Create and run the task executor
  (tr/runner-executer-for-workers options [worker])
  ;; Keep the process running
  (loop []
    (Thread/sleep 1000)
    (recur)))
```

</TabItem>
</Tabs>

For more information on creating workers in your preferred language, refer to the [SDK guides](../category/sdks). 


## Setting up the worker

To use the worker in a workflow, you must register the worker task to the Conductor server, set up authorized access, and launch your worker project.

The worker task cannot begin execution until the worker is connected to the Conductor server. If the workflow is run, the task will remain in the Scheduled status until the worker comes online to service the task.

### Register worker task

All worker tasks must be registered to the Conductor server, which is done by creating a task definition. Tasks can be defined in UI, using API, or SDK.

**To define a worker task:**

<Tabs groupId="method">
<TabItem value="UI" label="Using UI">

1. Go to your Orkes Conductor cluster.
2. In the left navigation menu, go to **Definitions** > **Task**.
3. Select **(+) Define task**.
4. Enter the task details, such as the rate limits, retry settings, timeout settings, and expected inputs and outputs. <br/> The **Name** must match the task name defined previously in your code.
    <p align="center"><img src="/content/img/using-workers/using_workers-define_custom_task.png" alt="Define task in Orkes Platform" width="100%" height="auto"></img></p>
5. Select **Save** > **Confirm Save**.

</TabItem>

<TabItem value="API" label="Using API">

Refer to the [Create Task Definition API](../reference-docs/api/metadata/creating-task-definitions).

</TabItem>
</Tabs>


### Set up authorized access

In Orkes Conductor, an [application account](/category/access-control-and-security#applications) with a Worker role type enables workers to authenticate and authorize against the Conductor server. To set up authorized access, you need to add the worker to an application and grant it Execute permission.

:::note
For well-defined access controls, your worker application should be kept separate from your workflow client application. Learn more about [proper application separation](https://orkes.io/content/access-control-and-security/applications#example-application-setup).
:::

**To set up authorized access:**
1. Configure an application account.
    1. Go to your Orkes Conductor cluster.
    2. In the left navigation menu, go to **Access Control** > **Applications**.
    3. Create a new application or select an application to which you will be adding your worker. <br/> Ensure that the application role has **Worker** enabled.
      <p align="center"><img src="/content/img/using-workers/using_workers-application_roles.png" alt="Add worker to application account in Orkes Platform" width="100%" height="auto"></img></p>
2. Get the application access key for your worker project.
    1. Under Access Keys, select **Create access key** and store your credentials securely.
    2. Set the Key ID and Key Secret in your project.
3. Grant Execute permission to the application.
    1. Under Permissions, select **Add permission**.
    2. Select the **Task** tab and then your worker task.
    3. Enable the **Execute** toggle.
    4. (If [task-to-domain](task-to-domain) is used) In Domain, enter the domain name used in your worker code.
    5. Select **Add Permissions**.

The application account can now execute the worker task.

<p align="center"><img src="/content/img/using-workers/using_workers-app_permissions.png" alt="Add permissions to application account in Orkes Platform" width="100%" height="auto"></img></p>



### Launch the worker

Launch the worker to begin polling the Conductor server. The specific method depends on your language and project configuration.

**Example**
<Tabs>
<TabItem value="Python run" label="Python">

``` bash
python3 worker.py
```
</TabItem>

<TabItem value="Java run" label="Java">

``` bash
./gradlew build run
```


</TabItem>

<TabItem value="JavaScript run" label="JavaScript">

``` bash
node index.js
```
</TabItem>
</Tabs>

## Using the worker task

All custom worker tasks are denoted as [Simple tasks](/reference-docs/worker-task) in Conductor. To use a worker task, add it to a workflow definition.


### Add to workflow

**To add a worker task to a workflow:**

<Tabs groupId="method">
<TabItem value="UI" label="Using UI">

1. Go to your Orkes Conductor cluster.
2. In the left navigation menu, go to **Definitions** > **Workflow**.
3. Select or create a workflow.
4. In the visual workflow editor, select the **(+)** icon to add a new task. There are two ways to add a worker task:
* Search for your task using its task name and select to add it to the workflow.
* Add a **Worker Task (Simple)** and enter the task name in **Task Definition**.
5. Configure the task, such as its inputs, caching, and optionality.
6. On the top right, select **Save** > **Confirm**.

<p align="center"><img src="/content/img/using-workers/using_workers-add_task_to_workflow.png" alt="Add task in Orkes Platform" width="100%" height="auto"></img></p>
</TabItem>

<TabItem value="api add" label="Using API">

Refer to the [Create Workflow Definition](../reference-docs/api/metadata/creating-workflow-definition) or [Update Workflow Definition](../reference-docs/api/metadata/update-workflow-definitions) APIs.
</TabItem>
</Tabs>

### Run workflow

Run the workflow to ensure that your worker has started successfully. If not, return to the previous steps and verify that all details have been entered correctly, such as:
* **Server URL, Key ID, and Key Secret**—Set in your worker project.
* **Execute permissions**—Added for the worker task in your application account.
* (if applicable) **Domain**—The domain in your code matches the domain used during workflow execution and in the application permissions.


## Advanced topics
* Monitor task queues: [Monitoring Task Queues](https://orkes.io/content/developer-guides/monitoring-task-queues)
* Scale up your worker instances: [Metrics for Scaling Workers](https://orkes.io/content/developer-guides/scaling-workers)
* Implement domains for your workers to split the traffic: [Routing Tasks](https://orkes.io/content/developer-guides/task-to-domain)
