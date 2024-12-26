---
slug: "../quickstarts/create-first-workflow"
description: "In this quickstart, learn how to build your first Conductor workflow."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart 1: Create Your First Workflow

As you will have learned in [Core Concepts](../core-concepts), Conductor’s core orchestration unit is a workflow. In this quickstart, you will learn how to create your first Conductor workflow.

**Approaches to create workflows**

In Conductor, workflow definitions are stored as JSON. To create a workflow, you can use one of the following ways:
* **Workflow as code**—Using the Conductor SDKs, define your workflow in your preferred language.
* **Visual workflow editor**—Using Orkes Platform, define your workflow visually, which is formatted as JSON under the hood.

**Static vs dynamic workflows**

With Conductor, you can define workflows statically (ahead of time) or dynamically (at runtime). This quickstart will teach you how to creating static workflows using your preferred approach. Once you master this, you can dive into creating [dynamic workflows as code](../developer-guides/write-workflows-using-code).

**Tasks in workflows**

A workflow definition consists of a collection of tasks and operators and specifies the order and execution of the defined tasks. Conductor provides a set of system tasks and operators, but you can also write your own custom worker tasks. This is a powerful feature which you will learn more in [Quickstart 2](write-workers).

For this quickstart, let’s begin by using system tasks to create your first workflow.


## Quickstart overview
1. Create a workflow definition consisting of system tasks and operators.
2. Register the workflow definition to the Conductor server.
3. Run the workflow.


## Before you begin

Ensure that you have [prepared your tools and access](../quickstarts#preparing-your-tools).


## A. Workflow as code

Create a project for your workflow client.

<Tabs groupId="language">
<TabItem value="python" label="Python">

This sample Python code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/python/quickstarts/create-your-first-workflow).

``` python
from conductor.client.http.models import StartWorkflowRequest
from conductor.client.configuration.configuration import Configuration
from conductor.client.configuration.settings.authentication_settings import AuthenticationSettings
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor
from conductor.client.workflow.task.simple_task import SimpleTask
from conductor.client.workflow.task.http_task import HttpTask
from conductor.client.workflow.task.switch_task import SwitchTask


def main():
    # Sign up at https://developer.orkescloud.com and create an application.
    # Use your application's Key ID and Key Secret here:
    conf = Configuration(base_url='https://developer.orkescloud.com',
                         authentication_settings=AuthenticationSettings(key_id='_CHANGE_ME_',
                                                                        key_secret='_CHANGE_ME_'))

    # A WorkflowExecutor instance is used to register and execute workflows.
    executor = WorkflowExecutor(conf)

    # Create the workflow definition.
    workflow = ConductorWorkflow(
        executor=executor,
        name='myFirstWorkflow',
        description='Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.',
        version=1
    )

    # Create the tasks.
    httpTask = HttpTask('get-user_ref', {'uri': 'https://randomuser.me/api/'})
    switchTask = SwitchTask('user-criteria_ref', '${get-user_ref.output.response.body.results[0].location.country}').switch_case(
        'United States', SimpleTask('helloWorld', 'simple_ref').input(
            key='user', value='${get-user_ref.output.response.body.results[0].name.first}'))

    # Add the tasks to the workflow using `add` method or the `>>` operator.
    workflow.add(httpTask)
    workflow >> switchTask

    # Register the workflow.
    workflow.register(True)
    print(f"Registered workflow {workflow.name}")

    # Start the workflow.
    request = StartWorkflowRequest()
    request.name = 'myFirstWorkflow'
    request.version = 1
    id = executor.start_workflow(request)
    print(f"Started workflow {id}")


if __name__ == '__main__':
    main()

```
</TabItem>

<TabItem value="java" label="Java">

This sample Java code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/java/quickstarts/create-your-first-workflow).

``` java
import com.netflix.conductor.sdk.workflow.def.ConductorWorkflow;
import com.netflix.conductor.sdk.workflow.def.WorkflowBuilder;
import com.netflix.conductor.sdk.workflow.def.tasks.Http;
import com.netflix.conductor.sdk.workflow.def.tasks.SimpleTask;
import com.netflix.conductor.sdk.workflow.def.tasks.Switch;
import com.netflix.conductor.sdk.workflow.executor.WorkflowExecutor;
import io.orkes.conductor.client.ApiClient;

import java.util.Map;

public class WorkflowAsCode {

    public static void main(String[] args) {
        // Sign up at https://developer.orkescloud.com and create an application.
        // Use your application's Key ID and Key Secret here:
        ApiClient client = ApiClient.builder()
                .basePath("https://developer.orkescloud.com/api")
                .credentials("_CHANGE_ME_", "_CHANGE_ME_")
                .build();

        // A WorkflowExecutor instance is used to register and execute workflows.
        int pollingInterval = 50;
        WorkflowExecutor executor = new WorkflowExecutor(client, pollingInterval);

        // Create the workflow definition.
        ConductorWorkflow<Object> workflow = new WorkflowBuilder<>(executor)
                .name("myFirstWorkflow")
                .version(1)
                .description("Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.")
                .add(new Http("get-user_ref").url("https://randomuser.me/api/"))
                // This switch task will execute the "helloWorld" task if the user's country is "United States"
                .add(new Switch("user-criteria_ref", "${get-user_ref.output.response.body.results[0].location.country}")
                        .switchCase("United States", new SimpleTask("helloWorld", "simple_ref")
                                .input("user", "${get-user_ref.output.response.body.results[0].name.first}")))
                .build();

        // Register the workflow with overwrite = true and registerTasks = true.
        workflow.registerWorkflow(true, true);

        // Start the workflow.
        String id = executor.startWorkflow(workflow.getName(), workflow.getVersion(), Map.of());
        System.out.printf("Started workflow %s%n", id);

        executor.shutdown();
    }

}
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

This sample JavaScript code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/javascript/quickstarts/create-your-first-workflow).

``` javascript
import {
  orkesConductorClient,
  WorkflowExecutor,
  httpTask,
  simpleTask,
  switchTask,
} from "@io-orkes/conductor-javascript";

// Sign up at https://developer.orkescloud.com and create an application.
// Use your application's Key ID and Key Secret here:
const config = {
  serverUrl: "https://developer.orkescloud.com/api",
  keyId: "_CHANGE_ME_",
  keySecret: "_CHANGE_ME_",
};

const client = await orkesConductorClient(config);
// A WorkflowExecutor instance is used to register and execute workflows.
const executor = new WorkflowExecutor(client);

// Create the workflow definition.
const wf = {
  name: "myFirstWorkflow",
  version: 1,
  description:
    "Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.",
  tasks: [
    httpTask("get-user_ref", { uri: "https://randomuser.me/api/" }),
    switchTask(
      "user-criteria_ref",
      "${get-user_ref.output.response.body.results[0].location.country}",
      {
        "United States": [
          simpleTask("simple_ref", "helloWorld", {
            user: "${get-user_ref.output.response.body.results[0].name.first}",
          }),
        ],
      }
    ),
  ],
};

// Register the workflow with overwrite = true.
await executor.registerWorkflow(true, wf);

// Start the workflow.
const id = await executor.startWorkflow({name: wf.name, version: wf.version});
console.log(`Started workflow: ${id}`);
client.stop()

```

</TabItem>

<TabItem value="csharp" label="C#">

This sample C# code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/csharp/quickstarts/create-your-first-workflow).

```csharp
using Conductor.Client.Authentication;
using Conductor.Client.Models;
using Conductor.Client;
using Conductor.Definition;
using Conductor.Executor;
using Conductor.Definition.TaskType;

// Sign up at https://developer.orkescloud.com and create an application.
// Use your application's Key ID and Key Secret here:
var conf = new Configuration
{
    BasePath = "https://developer.orkescloud.com/api",
    AuthenticationSettings = new OrkesAuthenticationSettings("_CHANGE_ME_", "_CHANGE_ME_")
};

// A WorkflowExecutor instance is used to register and execute workflows.
var executor = new WorkflowExecutor(conf);

// Create the workflow definition.
var worfklow = new ConductorWorkflow()
        .WithName("myFirstWorkflow")
        .WithDescription("Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.")
        .WithVersion(1)
        .WithTask(new HttpTask("get-user_ref", new HttpTaskSettings { uri = "https://randomuser.me/api/" }))
        .WithTask(new SwitchTask("user-criteria_ref", "${get-user_ref.output.response.body.results[0].location.country}")
            .WithDecisionCase("United States",
                [new SimpleTask("helloWorld", "simple_ref").WithInput("user", "${get-user_ref.output.response.body.results[0].name.first}")]));

// Register the workflow with overwrite = true.
executor.RegisterWorkflow(
    workflow: worfklow,
    overwrite: true
);

// Start the workflow.
var workflowId = executor.StartWorkflow(new StartWorkflowRequest(name: worfklow.Name, version: worfklow.Version));
Console.WriteLine($"Started Workflow: {workflowId}");

```

</TabItem>

<TabItem value="go" label="Go">

This sample Go code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/go/quickstarts/create-your-first-workflow).

``` go
package main

import (
	"fmt"
	"log"

	"github.com/conductor-sdk/conductor-go/sdk/client"
	"github.com/conductor-sdk/conductor-go/sdk/model"
	"github.com/conductor-sdk/conductor-go/sdk/settings"
	"github.com/conductor-sdk/conductor-go/sdk/workflow"
	"github.com/conductor-sdk/conductor-go/sdk/workflow/executor"
)

// Sign up at https://developer.orkescloud.com and create an application.
// Use your application's Key ID and Key Secret here:
const SERVER_URL = "https://developer.orkescloud.com/api"
const KEY_ID = "_CHANGE_ME_"
const SECRET = "_CHANGE_ME_"

var (
	apiClient = client.NewAPIClient(
		settings.NewAuthenticationSettings(KEY_ID, SECRET),
		settings.NewHttpSettings(SERVER_URL))
	// A WorkflowExecutor instance is used to register and execute workflows.
	workflowExecutor = executor.NewWorkflowExecutor(apiClient)
)

func main() {
	// Create the workflow definition.
	wf := workflow.NewConductorWorkflow(workflowExecutor).
		Name("myFirstWorkflowGo").
		Version(1).
		Description("Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.")

	httpTask := workflow.NewHttpTask("get-user_ref", &workflow.HttpInput{Uri: "https://randomuser.me/api/"})
	switchTask := workflow.NewSwitchTask("user-criteria_ref", "${get-user_ref.output.response.body.results[0].location.country}").
		SwitchCase("United States", workflow.NewSimpleTask("helloWorld", "simple_ref").Input("user", "${get-user_ref.output.response.body.results[0].name.first}"))

	wf.Add(httpTask)
	wf.Add(switchTask)
	
	// Register the workflow with overwrite = true.
	err := wf.Register(true)
	if err != nil {
		log.Fatalf("Failed to register workflow: %v", err)
	}
	fmt.Printf("Registered workflow: %s\n", wf.GetName())

	// Start the workflow.
	id, err := workflowExecutor.StartWorkflow(&model.StartWorkflowRequest{
		Name:    wf.GetName(),
		Version: wf.GetVersion(),
	})

	if err != nil {
		log.Fatalf("Error when starting workflow: %v", err)
	}
	fmt.Printf("Started workflow: %s\n", id)
}

```

</TabItem>

<TabItem value="clojure" label="Clojure">

This sample Clojure code demonstrates how to create, register, and execute a workflow in Conductor. 

Check out the full project [here](https://github.com/conductor-oss/conductor-apps/tree/main/clojure/quickstarts/create-your-first-workflow).

``` clojure
(ns wac.core
  (:require [io.orkes.workflow-resource :as wr]
            [io.orkes.sdk :as sdk]
            [io.orkes.metadata :as metadata])
  (:gen-class))

; Sign up at https://developer.orkescloud.com and create an application.
; Use your application's Key ID and Key Secret here:
(def options
  {:app-key "_CHANGE_ME_"
   :app-secret "_CHANGE_ME_"
   :url "https://developer.orkescloud.com/api/"})

; Function that creates the tasks.
(defn create-tasks
  []
  (vector (sdk/http-task "get-user_ref" {:uri "https://randomuser.me/api/"})
          (sdk/switch-task "user-criteria_ref" "${get-user_ref.output.response.body.results[0].location.country}"
                           {"United States" [(sdk/simple-task "simple_ref"
                                                              "helloWorld"
                                                              {"user"
                                                               "${get-user_ref.output.response.body.results[0].name.first}"})]}
                           [])))

; Function that creates the workflow definition.
(defn create-workflow
  [tasks]
  (merge (sdk/workflow "myFirstWorkflow" tasks)))

(defn -main
  []
  ; Register the workflow with overwrite = true
  (metadata/register-workflow-def options (-> (create-tasks) (create-workflow)) true)
  ; Start the workflow
  (let [workflow-id (wr/start-workflow options {:name "myFirstWorkflow" :version 1})]
    (println "Started workflow:" workflow-id)))

```

</TabItem>
</Tabs>


## B. Visual workflow editor

Use the visual workflow editor in Orkes Platform to create your workflows.

**To create a workflow:**
1. Log in to your Orkes cluster or the [Orkes Developer Edition](https://developer.orkescloud.com/).
2. In the left navigation menu, go to **Definitions** > **Workflow**.
3. Select **(+) Define workflow**.
4. Enter a Name and Description for your workflow.
5. To add tasks to the workflow, select the **(+)** icon in the visual workflow diagram.
6. To register the workflow, select **Save** > **Confirm**.

<p align="center"><img src="/content/img/getting-started/getting_started-visual_workflow_editor.png" alt="Screenshot of visual workflow editor in Orkes Platform." width="100%" height="auto"></img></p>


Once created, you can run your workflow by going to the **Run** tab and selecting **Run workflow**.


## Tutorial — your first workflow:

Follow along to build your first workflow, which is a conditional notification flow based on the user’s location.

1. The first task will retrieve the user information through an HTTP endpoint.
    1. Add an HTTP task to the workflow.
    2. Enter the task name `get-user` in **Task definition**.
    3. Set the **URL** as [https://randomuser.me/api/](https://randomuser.me/api/) with GET as the **Method**.
2. The next task will evaluate the user information based on a set criteria. In this case, we want the workflow to send a notification only if the user is located in United States.
    1. Add a Switch task to the workflow.
    2. Enter the task name `user-criteria` in **Task definition**.
    3. Set the evaluation criteria to `Value-Param` and enter the evaluation cases in **Switch cases**. In this case, select **Add more switch cases** and enter United States. This creates a new branch, where its tasks are only executed if the evaluation criteria is met.
        The parameter to be evaluated will be `switchCaseValue`, which will be wired to a variable input based on the previous `get-user` task output.
    4. To do so, in Script params, enter `${get-user_ref.output.response.body.results[0].location.country}` as the value for switchCaseValue. This is a dynamic variable, which is expressed in JSONPath syntax.
3. The final task will send a notification to the user if they are located in United States.
    1. In the United States branch of the Switch task, add a HTTP task.
    2. Enter the task name `send-notification` in **Task definition**.
    3. Set the **URL** as [https://orkes-api-tester.orkesconductor.com/api](https://orkes-api-tester.orkesconductor.com/api), which will serve as the mock notification endpoint, with POST as the **Method**.
    
    Alternatively, you can copy the JSON code below into the **Code** tab of the workflow builder.

``` json
{
  "name": "myFirstWorkflow",
  "description": "Workflow that greets a user. Uses a Switch task, HTTP task, and Simple task.",
  "version": 1,
  "tasks": [
    {
      "name": "get-user",
      "taskReferenceName": "get-user_ref",
      "inputParameters": {
        "uri": "https://randomuser.me/api/",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "encode": true
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
      "loopOver": [],
      "onStateChange": {},
      "permissive": false
    },
    {
      "name": "user-criteria",
      "taskReferenceName": "user-criteria_ref",
      "inputParameters": {
        "switchCaseValue": "${get-user_ref.output.response.body.results[0].location.country}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "United States": [
          {
            "name": "helloWorld",
            "taskReferenceName": "simple_ref",
            "inputParameters": {
              "user": "${get-user_ref.output.response.body.results[0].name.first}"
            },
            "type": "SIMPLE",
            "decisionCases": {},
            "defaultCase": [],
            "forkTasks": [],
            "startDelay": 0,
            "joinOn": [],
            "optional": false,
            "defaultExclusiveJoinTask": [],
            "asyncComplete": false,
            "loopOver": [],
            "onStateChange": {},
            "permissive": false
          }
        ]
      },
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue",
      "onStateChange": {},
      "permissive": false
    }
  ],
  "inputParameters": [],
  "outputParameters": {},
  "failureWorkflow": "",
  "schemaVersion": 2
}
```

4. Save and register your workflow.

Your first workflow is now created. Give it a test run.

Now that you have gotten a hang of creating workflows, you can make them more powerful by using Worker tasks, which execute custom logic just like any regular function. Head to the next quickstart to learn more.