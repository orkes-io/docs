---
slug: "../quickstarts/create-first-workflow"
description: ""
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

**Step 1: Configure access and create workflow**

To define a workflow, you must provide a MetadataClient and a WorkflowExecutor, which requires a Configuration object with the Conductor Server info. Here's an example of how to do that:

``` python
from conductor.client.configuration.configuration import Configuration
from conductor.client.configuration.settings.authentication_settings import AuthenticationSettings
from conductor.client.orkes.orkes_metadata_client import OrkesMetadataClient
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor

configuration = Configuration(
    server_api_url=SERVER_API_URL, // eg: https://developers.orkes.cloud/api
    debug=False,
    authentication_settings=AuthenticationSettings(key_id=KEY_ID, key_secret=KEY_SECRET)
)

metadata_client = OrkesMetadataClient(configuration)

workflow_executor = WorkflowExecutor(configuration)
workflow = ConductorWorkflow(
    executor=workflow_executor,
    name='python_workflow_example_from_code',
    description='Python workflow example from code'
)
```

**Step 2: Add tasks to workflow**

After creating an instance of a ConductorWorkflow, you can add tasks to it. There are two possible ways to do that:
* method: add
* operator: >>

``` python
from conductor.client.workflow.task.simple_task import SimpleTask

simple_task_1 = SimpleTask(
    task_def_name='python_simple_task_from_code_1',
    task_reference_name='python_simple_task_from_code_1'
)
workflow.add(simple_task_1)

simple_task_2 = SimpleTask(
    task_def_name='python_simple_task_from_code_2',
    task_reference_name='python_simple_task_from_code_2'
)
workflow >> simple_task_2
```

You can add input parameters to your workflow:

``` python
workflow.input_parameters(["a", "b"])
```

**Step 3: Register workflow**

Register your workflow at the Conductor Server:

``` python
from conductor.client.http.models.workflow_def import WorkflowDef

workflowDef = workflow.to_workflow_def()
metadata_client.register_workflow_def(workflowDef, True)
```


**Step 4: Run workflow**

Your first workflow is now created. Give your workflow a test run:


``` python
from conductor.client.http.models import StartWorkflowRequest

request = StartWorkflowRequest()
request.name = 'python_workflow_example_from_code'
request.version = 1
request.input = {'name': 'Orkes'}

workflow_run = workflow_client.execute_workflow(
        start_workflow_request=request, 
        wait_for_seconds=12)

```


</TabItem>

<TabItem value="java" label="Java">

**Step 1: Create workflow**

Create a ConductorWorkflow Instance.
``` java
ConductorWorkflow<GetInsuranceQuote> conductorWorkflow = new WorkflowBuilder<GetInsuranceQuote>(executor)
    .name("sdk_workflow_example")
    .version(1)
    .ownerEmail("hello@example.com")
    .description("Example Workflow")
    .timeoutPolicy(WorkflowDef.TimeoutPolicy.TIME_OUT_WF, 100)
    .add(new SimpleTask("calculate_insurance_premium", "calculate_insurance_premium"))
    .add(new SimpleTask("send_email", "send_email"))
    .build();
```


**Step 2: Add tasks to workflow**

After creating an instance of a ConductorWorkflow, you can add tasks to it using the `add` method. The task inputs configured using the `input` method.
``` java
builder.add(
        new SimpleTask("send_email", "send_email")
                .input("email", "${workflow.input.email}")
                .input("subject", "Your insurance quote for the amount ${generate_quote.output.amount}")
);
```

**Step 3: Register workflow**

``` java
//Returns true if the workflow is successfully created
boolean registered = workflow.registerWorkflow();
```

**Step 4: Run workflow**

Start the execution of the workflow based on the definition registered on the server. Use the register method to register a workflow on the server before executing.
``` java
//Returns a completable future
CompletableFuture<Workflow> execution = conductorWorkflow.execute(input);

//Wait for the workflow to complete -- useful if workflow completes within a reasonable amount of time
Workflow workflowRun = execution.get();

//Get the workflowId
String workflowId = workflowRun.getWorkflowId();

//Get the status of workflow execution
WorkflowStatus status = workflowRun.getStatus();

```

</TabItem>

<TabItem value="javascript" label="JavaScript">

**Step 1: Configure access and create workflow**
``` javascript
import {
  OrkesApiConfig,
  orkesConductorClient,
  TaskRunner,
  simpleTask,
} from "@io-orkes/conductor-javascript";

//API client instance with server address and authentication details
const clientPromise = orkesConductorClient({
  keyId: "XXX",
  keySecret: "XXXX",
  serverUrl: "SERVER_URL", // eg: https://developers.orkes.cloud/api
});

const client = await clientPromise;

//Create new workflow executor
const executor = new WorkflowExecutor(client);

// Using Factory function to create a workflow
const factoryWf = {
  name: "my_first_workflow",
  version: 1,
  ownerEmail: "user@example.com",
  tasks: [simpleTask("simple_task_ref", "simple_task", {})],
  inputParameters: [],
  outputParameters: {},
  timeoutSeconds: 0,
};
```

**Step 2: Register workflow**

``` javascript
const workflow = executor.registerWorkflow(true, factoryWf);
```


**Step 3: Run workflow**

Use Workflow Executor to start the previously-registered workflow.

``` javascript
const executor = new WorkflowExecutor(client);
const executionId = await executor.startWorkflow({ name, version, input: {} });
```

</TabItem>

<TabItem value="csharp" label="C#">

**Step 1: Configure access and create workflow**
```csharp
using Conductor.Client;
using Conductor.Definition;
using Conductor.Executor;

ConductorWorkflow GetConductorWorkflow()
{
    return new ConductorWorkflow()
        .WithName("my_first_workflow")
        .WithVersion(1)
        .WithOwner("developers@orkes.io")
            .WithTask(new SimpleTask("simple_task_2", "simple_task_1"))
            .WithTask(new SimpleTask("simple_task_1", "simple_task_2"));
}

var configuration = new Configuration();

var conductorWorkflow = GetConductorWorkflow();
var workflowExecutor = new WorkflowExecutor(configuration);
```

**Step 2: Register workflow**
``` csharp
workflowExecutor.RegisterWorkflow(
    workflow: conductorWorkflow
    overwrite: true
);
```

**Step 3: Run workflow**
``` csharp
var workflowId = workflowExecutor.StartWorkflow(conductorWorkflow);
```

</TabItem>

<TabItem value="go" label="Go">

**Step 1: Configure access and create workflow**
``` go
// API client instance with server address and authentication details
apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
        "https://developers.orkes.cloud/api",
    ))

// Create new workflow executor
executor := executor.NewWorkflowExecutor(apiClient)

// Create a new ConductorWorkflow instance
conductorWorkflow := workflow.NewConductorWorkflow(executor).
    Name("my_first_workflow").
    Version(1).
    OwnerEmail("developers@orkes.io")
```

**Step 2: Add tasks to workflow**
``` go
conductorWorkflow.
	Add(workflow.NewSimpleTask("simple_task_2", "simple_task_1")).
    Add(workflow.NewSimpleTask("simple_task_1", "simple_task_2"))
```

**Step 3: Register workflow**
``` go
conductorWorkflow.Register(true)        //Overwrite the existing definition with the new one
```


**Step 4: Execute workflow**

Use Workflow Executor to start the previously-registered workflow.

``` go
//Input can be either a map or a struct that is serializable to a JSON map
workflowInput := map[string]interface{}{}

workflowId, err := executor.StartWorkflow(&model.StartWorkflowRequest{
    Name:  conductorWorkflow.GetName(),
    Input: workflowInput,
})
```

</TabItem>

<TabItem value="clojure" label="Clojure">

**Step 1: Add tasks**

``` clojure
(defn create-tasks
  "Returns workflow tasks"
  []
  (vector (sdk/simple-task (:get-user-info constants) (:get-user-info constants) {:userId "${workflow.input.userId}"})
          (sdk/switch-task "emailorsms" "${workflow.input.notificationPref}" {"email" [(sdk/simple-task (:send-email constants) (:send-email constants) {"email" "${get_user_info.output.email}"})]
                                                                              "sms" [(sdk/simple-task (:send-sms constants) (:send-sms constants) {"phoneNumber" "${get_user_info.output.phoneNumber}"})]} [])))
```


**Step 2: Create workflow**

```clojure
(defn create-workflow
  "Returns a workflow with tasks"
  [tasks]
  (merge (sdk/workflow (:workflow-name constants) tasks) {:inputParameters ["userId" "notificationPref"]}))
  
;; creates a workflow with tasks 
(-> (create-tasks) (create-workflow))
```


**Step 3: Register workflow**

```clojure
(defn
  register-workflow-def-using-client
  "Takes a client and a workflow definition in edn, will register a worflow in conductor"
  ([client workflow overwrite]
   (client "workflow" :method :post :body workflow :query-params {"overwrite" overwrite}))
  ([client workflow] (register-workflow-def-using-client client workflow false)))
```

**Step 4: Run workflow**

```clojure
(def workflow-request {:name "SomeWFName"
                       :version 1
                       :input {"userId" "jim"
                               "notificationPref" "sms"}})

(wr/start-workflow options workflow-request)
```

</TabItem>
</Tabs>


## B. Visual workflow editor

Use the visual workflow editor in Orkes Platform to create your workflows.

**To create a workflow:**
1. Log in to your Orkes cluster or the [Orkes Developer Edition](https://developers.orkes.cloud/).
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
    3. Set the evaluation criteria to `Value-Param` and enter the evaluation cases in **Switch cases**. In this case, select **Add more switch cases** and enter United States. This creates a new branch, where its tasks are only executed if the evaluation criteria is met. \
        The parameter to be evaluated will be `switchCaseValue`, which will be wired to a variable input based on the previous `get-user` task output.
    4. To do so, in Script params, enter `${get-user_ref.output.response.body.results[0].location.country}` as the value for switchCaseValue. This is a dynamic variable, which is expressed in JSONPath syntax.
3. The final task will send a notification to the user if they are located in United States.
    1. In the United States branch of the Switch task, add a HTTP task.
    2. Enter the task name `send-notification` in **Task definition**.
    3. Set the **URL** as [https://orkes-api-tester.orkesconductor.com/api](https://orkes-api-tester.orkesconductor.com/api), which will serve as the mock notification endpoint, with POST as the **Method**.
    
    Alternatively, you can copy the JSON code below into the **Code** tab of the workflow builder.

``` json
// workflow definition in JSON

{
 "name": "myFirstWorkflow",
 "description": "Workflow using a Switch task and HTTP tasks.",
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
     "type": "HTTP"
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
           "name": "send-notification",
           "taskReferenceName": "send-notification_ref",
           "inputParameters": {
             "uri": "https://orkes-api-tester.orkesconductor.com/api",
             "method": "POST",
             "accept": "application/json",
             "contentType": "application/json",
             "encode": true
           },
           "type": "HTTP"
         }
       ]
     },
     "defaultCase": []
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