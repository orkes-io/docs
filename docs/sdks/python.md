
# Python SDK

Orkes Conductor Python SDK is maintained here: https://github.com/conductor-sdk/conductor-python.

## Install Conductor Python SDK

Before installing Conductor Python SDK, it is a good practice to set up a dedicated virtual environment as follows:

```python
virtualenv conductor
source conductor/bin/activate
```

### Get Conductor Python SDK

The SDK requires Python 3.9+. To install the SDK, use the following command:

```python
python3 -m pip install conductor-python
```

## Hello World Application Using Conductor

In this section, we will create a simple "Hello World" application that executes a "greetings" workflow managed by Conductor.

### Step 1: Create Workflow

#### Creating Workflows by Code

Create [greetings_workflow.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/helloworld/greetings_workflow.py) with the following:

```python
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor
from greetings_worker import greet

def greetings_workflow(workflow_executor: WorkflowExecutor) -> ConductorWorkflow:
    name = 'greetings'
    workflow = ConductorWorkflow(name=name, executor=workflow_executor)
    workflow.version = 1
    workflow >> greet(task_ref_name='greet_ref', name=workflow.input('name'))
    return workflow
```

#### (Alternatively) Creating Workflows in JSON

Create `greetings_workflow.json` with the following:

```json
{
  "name": "greetings",
  "description": "Sample greetings workflow",
  "version": 1,
  "tasks": [
    {
      "name": "greet",
      "taskReferenceName": "greet_ref",
      "type": "SIMPLE",
      "inputParameters": {
        "name": "${workflow.input.name}"
      }
    }
  ],
  "timeoutPolicy": "TIME_OUT_WF",
  "timeoutSeconds": 60
}
```

Workflows must be registered to the Conductor server. Use the API to register the greetings workflow from the JSON file above:

```shell
curl -X POST -H "Content-Type:application/json" \
http://localhost:8080/api/metadata/workflow -d @greetings_workflow.json
```

:::note
To use the Conductor API, the Conductor server must be up and running (see [Running over Conductor standalone (installed locally)](/content/sdks/python#running-workflows-on-conductor-standalone-installed-locally)).
:::

### Step 2: Write Task Worker

Using Python, a worker represents a function with the worker_task decorator. Create [greetings_worker.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/helloworld/greetings_worker.py) file as illustrated below:

:::note
A single workflow can have task workers written in different languages and deployed anywhere, making your workflow polyglot and distributed!
:::

```python
from conductor.client.worker.worker_task import worker_task


@worker_task(task_definition_name='greet')
def greet(name: str) -> str:
    return f'Hello {name}'
```

Now, we are ready to write our main application, which will execute our workflow.

### Step 3: Write Hello World Application

Let's add [helloworld.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/helloworld/helloworld.py) with a `main` method:

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor
from greetings_workflow import greetings_workflow


def register_workflow(workflow_executor: WorkflowExecutor) -> ConductorWorkflow:
    workflow = greetings_workflow(workflow_executor=workflow_executor)
    workflow.register(True)
    return workflow


def main():
    # The app is connected to http://localhost:8080/api by default
    api_config = Configuration()

    workflow_executor = WorkflowExecutor(configuration=api_config)

    # Registering the workflow (Required only when the app is executed the first time)
    workflow = register_workflow(workflow_executor)

    # Starting the worker polling mechanism
    task_handler = TaskHandler(configuration=api_config)
    task_handler.start_processes()

    workflow_run = workflow_executor.execute(name=workflow.name, version=workflow.version,
                                             workflow_input={'name': 'Orkes'})

    print(f'\nworkflow result: {workflow_run.output["result"]}\n')
    print(f'see the workflow execution here: {api_config.ui_host}/execution/{workflow_run.workflow_id}\n')
    task_handler.stop_processes()


if __name__ == '__main__':
    main()
```

## Running Workflows on Conductor Standalone (Installed Locally)

### Setup Environment Variable

Set the following environment variable to point the SDK to the Conductor Server API endpoint:

```shell
export CONDUCTOR_SERVER_URL=http://localhost:8080/api
```

### Start Conductor Server

To start the Conductor server in a standalone mode from a Docker image, type the command below:

```shell
docker run --init -p 8080:8080 -p 5000:5000 conductoross/conductor-standalone:3.15.0
```

To ensure the server has started successfully, open Conductor UI on [http://localhost:5000](http://localhost:5000).

### Execute Hello World Application

To run the application, type the following command:

```shell
python helloworld.py
```

Now, the workflow is executed, and its execution status can be viewed from Conductor UI ([http://localhost:5000](http://localhost:5000/)).

Navigate to the **Executions** tab to view the workflow execution.

Open the Workbench tab and try running the 'greetings' workflow. You will notice that the workflow execution fails. This is because the task_handler.stop_processes() [helloworld.py] function is called and stops all workers included in the app, and therefore, there is no worker up and running to execute the tasks.

Now, let's update the app `helloworld.py`.

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor
from greetings_workflow import greetings_workflow


def register_workflow(workflow_executor: WorkflowExecutor) -> ConductorWorkflow:
    workflow = greetings_workflow(workflow_executor=workflow_executor)
    workflow.register(True)
    return workflow


def main():
    # points to http://localhost:8080/api by default
    api_config = Configuration()

    workflow_executor = WorkflowExecutor(configuration=api_config)

    # Needs to be done only when registering a workflow one-time
    # workflow = register_workflow(workflow_executor)

    task_handler = TaskHandler(configuration=api_config)
    task_handler.start_processes()

    # workflow_run = workflow_executor.execute(name=workflow.name, version=workflow.version,
                                             workflow_input={'name': 'World'})

    # print(f'\nworkflow result: {workflow_run.output["result"]}\n')
    # print(f'see the workflow execution here: {api_config.ui_host}/execution/{workflow_run.workflow_id}\n')
    
    # task_handler.stop_processes()


if __name__ == '__main__':
    main()
```

By commenting the lines that execute the workflow and stop the task polling mechanism, we can re-run the app and run the workflow from the Conductor UI. The task is executed successfully.

## Running Workflows on Orkes Conductor

For running the workflow in Orkes Conductor,

- Update the Conductor server URL to your cluster name.

```shell
export CONDUCTOR_SERVER_URL=https://[cluster-name].orkesconductor.io/api
```

- If you want to run the workflow on the Orkes Developer Edition, set the Conductor Server variable as follows:

```shell
export CONDUCTOR_SERVER_URL=https://developer.orkescloud.com/api
```

- Orkes Conductor requires authentication. [Obtain the key and secret from the Conductor server](https://www.youtube.com/watch?v=f1b5vZRKn2Q) and set the following environment variables.

```shell
export CONDUCTOR_AUTH_KEY=your_key
export CONDUCTOR_AUTH_SECRET=your_key_secret
```

Run the application and view the execution status from Conductor's UI Console.

:::note
That's it - you just created and executed your first distributed Python app!
:::

## Learn More about Conductor Python SDK

There are three main ways you can use Conductor when building durable, resilient, distributed applications.

1. Write service workers that implement business logic to accomplish a specific goal - such as initiating payment transfer, getting user information from the database, etc.
2. Create Conductor workflows that implement application state - A typical workflow implements the saga pattern.
3. Use Conductor SDK and APIs to manage workflows from your application.

## Create and Run Conductor Workers

### Writing Workers

A Workflow task represents a unit of business logic that achieves a specific goal, such as checking inventory, initiating payment transfer, etc. A worker implements a task in the workflow.

### Implementing Workers

The workers can be implemented by writing a simple Python function and annotating the function with the `@worker_task`. Conductor workers are services (similar to microservices) that follow the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).

Workers can be hosted along with the workflow or run in a distributed environment where a single workflow uses workers deployed and running in different machines/VMs/containers. Whether to keep all the workers in the same application or run them as a distributed application is a design and architectural choice. Conductor is well suited for both kinds of scenarios.

You can create or convert any existing Python function to a distributed worker by adding `@worker_task` annotation to it. Here is a simple worker that takes name as input and returns greetings:

```python
from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name='greetings')
def greetings(name: str) -> str:
    return f'Hello, {name}'
```

A worker can take inputs which are primitives - `str`, `int`, `float`, `bool` etc. or can be complex data classes.

Here is an example worker that uses `dataclass` as part of the worker input.

```python
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

### Managing Workers in Application

Workers use a polling mechanism (with a long poll) to check for any available tasks from the server periodically. The startup and shutdown of workers are handled by the `conductor.client.automator.task_handler.TaskHandler` class.

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration

def main():
    # points to http://localhost:8080/api by default
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

### Design Principles for Workers

Each worker embodies the design pattern and follows certain basic principles:

1. Workers are stateless and do not implement a workflow-specific logic.
2. Each worker executes a particular task and produces well-defined output given specific inputs.
3. Workers are meant to be idempotent (Should handle cases where the partially executed task, due to timeouts, etc, gets rescheduled).
4. Workers do not implement the logic to handle retries, etc., that is taken care of by the Conductor server.

### System Task Workers

A system task worker is a pre-built, general-purpose worker in your Conductor server distribution.

System tasks automate repeated tasks such as calling an HTTP endpoint, executing lightweight ECMA-compliant javascript code, publishing to an event broker, etc.

#### Wait Task

:::tip
Wait is a powerful way to have your system wait for a specific trigger, such as an external event, a particular date/time, or duration, such as 2 hours, without having to manage threads, background processes, or jobs.
:::

**Using Code to Create Wait Task**

```python
from conductor.client.workflow.task.wait_task import WaitTask

# waits for 2 seconds before scheduling the next task
wait_for_two_sec = WaitTask(task_ref_name='wait_for_2_sec', wait_for_seconds=2)

# wait until end of jan
wait_till_jan = WaitTask(task_ref_name='wait_till_jsn', wait_until='2024-01-31 00:00 UTC')

# waits until an API call or an event is triggered
wait_for_signal = WaitTask(task_ref_name='wait_till_jan_end')
```

**JSON Configuration**

```json
{
  "name": "wait",
  "taskReferenceName": "wait_till_jan_end",
  "type": "WAIT",
  "inputParameters": {
    "until": "2024-01-31 00:00 UTC"
  }
}
```

#### HTTP Task

Make a request to an HTTP(S) endpoint. The task allows for GET, PUT, POST, DELETE, HEAD, and PATCH requests.

**Using Code to Create HTTP Task**

```python
from conductor.client.workflow.task.http_task import HttpTask

HttpTask(task_ref_name='call_remote_api', http_input={
        'uri': 'https://orkes-api-tester.orkesconductor.com/api'
    })
```

**JSON Configuration**

```json
{
  "name": "http_task",
  "taskReferenceName": "http_task_ref",
  "type" : "HTTP",
  "uri": "https://orkes-api-tester.orkesconductor.com/api",
  "method": "GET"
}
```

#### JavaScript Executor Task

Execute ECMA-compliant JavaScript code. It is useful when writing a script for data mapping, calculations, etc.

**Using Code to Create Inline Task**

```python
from conductor.client.workflow.task.javascript_task import JavaScriptTask

say_hello_js = """
function greetings() {
    return {
        "text": "hello " + $.name
    }
}
greetings();
"""

js = JavaScriptTask(task_ref_name='hello_script', script=say_hello_js, bindings={'name': '${workflow.input.name}'})
```

**JSON Configuration**

```json
{
  "name": "inline_task",
  "taskReferenceName": "inline_task_ref",
  "type": "INLINE",
  "inputParameters": {
    "expression": " function greetings() {\n  return {\n            \"text\": \"hello \" + $.name\n        }\n    }\n    greetings();",
    "evaluatorType": "graaljs",
    "name": "${workflow.input.name}"
  }
}
```

#### JSON Processing using JQ

[Jq](https://jqlang.github.io/jq/) is like sed for JSON data - you can slice, filter, map, and transform structured data with the same ease that sed, awk, grep, and friends let you play with text.

**Using Code to Create JSON JQ Transform Task**

```python
from conductor.client.workflow.task.json_jq_task import JsonJQTask

jq_script = """
{ key3: (.key1.value1 + .key2.value2) }
"""

jq = JsonJQTask(task_ref_name='jq_process', script=jq_script)
```

**JSON Configuration**

```json
{
  "name": "json_transform_task",
  "taskReferenceName": "json_transform_task_ref",
  "type": "JSON_JQ_TRANSFORM",
  "inputParameters": {
    "key1": "k1",        
    "key2": "k2",
    "queryExpression": "{ key3: (.key1.value1 + .key2.value2) }",
  }
}
```

### Worker vs. Microservice/HTTP Endpoints

:::tip
Workers are a lightweight alternative to exposing an HTTP endpoint and orchestrating using HTTP tasks. Using workers is a recommended approach if you do not need to expose the service over HTTP or gRPC endpoints.
:::

There are several advantages to this approach:

1. **No need for an API management layer** : Given there are no exposed endpoints and workers are self-load-balancing.
2. **Reduced infrastructure footprint** : No need for an API gateway/load balancer.
3. All the communication is initiated by workers using polling - avoiding the need to open up any incoming TCP ports.
4. Workers **self-regulate** when busy; they only poll as much as they can handle. Backpressure handling is done out of the box.
5. Workers can be scaled up/down quickly based on the demand by increasing the number of processes.

### Deploying Workers in Production

Conductor workers can run in the cloud-native environment or on-prem and can easily be deployed like any other Python application. Workers can run a containerized environment, VMs, or bare metal like you would deploy your other Python applications.

## Create Conductor Workflows

Workflow can be defined as the collection of tasks and operators that specify the order and execution of the defined tasks. This orchestration occurs in a hybrid ecosystem that encircles serverless functions, microservices, and monolithic applications.

This section will dive deeper into creating and executing Conductor workflows using Python SDK.

### Creating Workflows

Conductor lets you create the workflows using either Python or JSON as the configuration.

Using Python as code to define and execute workflows lets you build extremely powerful, dynamic workflows and run them on Conductor.

When the workflows are relatively static, they can be designed using the Orkes UI (available when using Orkes Conductor) and APIs or SDKs to register and run the workflows.

Both the code and configuration approaches are equally powerful and similar in nature to how you treat Infrastructure as Code.

### Execute Dynamic Workflows Using Code

For cases where the workflows cannot be created statically ahead of time, Conductor is a powerful dynamic workflow execution platform that lets you create very complex workflows in code and execute them. It is useful when the workflow is unique for each execution.

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients
from conductor.client.worker.worker_task import worker_task
from conductor.client.workflow.conductor_workflow import ConductorWorkflow

#@worker_task annotation denotes that this is a worker
@worker_task(task_definition_name='get_user_email')
def get_user_email(userid: str) -> str:
    return f'{userid}@example.com'

#@worker_task annotation denotes that this is a worker
@worker_task(task_definition_name='send_email')
def send_email(email: str, subject: str, body: str):
    print(f'sending email to {email} with subject {subject} and body {body}')


def main():

    # defaults to reading the configuration using following env variables
    # CONDUCTOR_SERVER_URL : conductor server e.g. https://developer.orkescloud.com/api
    # CONDUCTOR_AUTH_KEY : API Authentication Key
    # CONDUCTOR_AUTH_SECRET: API Auth Secret
    api_config = Configuration()

    task_handler = TaskHandler(configuration=api_config)  
    #Start Polling
    task_handler.start_processes()

    clients = OrkesClients(configuration=api_config)
    workflow_executor = clients.get_workflow_executor()
    workflow = ConductorWorkflow(name='dynamic_workflow', version=1, executor=workflow_executor)
    get_email = get_user_email(task_ref_name='get_user_email_ref', userid=workflow.input('userid'))
    sendmail = send_email(task_ref_name='send_email_ref', email=get_email.output('result'), subject='Hello from Orkes',
                          body='Test Email')
    #Order of task execution
    workflow >> get_email >> sendmail

    # Configure the output of the workflow
    workflow.output_parameters(output_parameters={
        'email': get_email.output('result')
    })
    #Run the workflow
    result = workflow.execute(workflow_input={'userid': 'user_a'})
    print(f'\nworkflow output:  {result.output}\n')
    #Stop Polling
    task_handler.stop_processes()


if __name__ == '__main__':
    main()
```

```python
>> python3 dynamic_workflow.py 

2024-02-03 19:54:35,700 [32853] conductor.client.automator.task_handler INFO     created worker with name=get_user_email and domain=None
2024-02-03 19:54:35,781 [32853] conductor.client.automator.task_handler INFO     created worker with name=send_email and domain=None
2024-02-03 19:54:35,859 [32853] conductor.client.automator.task_handler INFO     TaskHandler initialized
2024-02-03 19:54:35,859 [32853] conductor.client.automator.task_handler INFO     Starting worker processes...
2024-02-03 19:54:35,861 [32853] conductor.client.automator.task_runner INFO     Polling task get_user_email with domain None with polling interval 0.1
2024-02-03 19:54:35,861 [32853] conductor.client.automator.task_handler INFO     Started 2 TaskRunner process
2024-02-03 19:54:35,862 [32853] conductor.client.automator.task_handler INFO     Started all processes
2024-02-03 19:54:35,862 [32853] conductor.client.automator.task_runner INFO     Polling task send_email with domain None with polling interval 0.1
sending email to user_a@example.com with subject Hello from Orkes and body Test Email

workflow output:  {'email': 'user_a@example.com'}

2024-02-03 19:54:36,309 [32853] conductor.client.automator.task_handler INFO     Stopped worker processes...
```

See [dynamic_workflow.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/dynamic_workflow.py) for a fully functional example.

#### Kitchen-Sink Workflow

For a more complex workflow example with all the supported features, see [kitchensink.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/kitchensink.py).

### Executing Workflows

The [WorkflowClient](https://github.com/conductor-sdk/conductor-python/blob/main/src/conductor/client/workflow_client.py) interface provides all the APIs required to work with workflow executions.

```python
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients

api_config = Configuration()
clients = OrkesClients(configuration=api_config)
workflow_client = clients.get_workflow_client() 
```

#### Execute Workflow Asynchronously

Useful when workflows are long-running.

```python
from conductor.client.http.models import StartWorkflowRequest

request = StartWorkflowRequest()
request.name = 'hello'
request.version = 1
request.input = {'name': 'Orkes'}
# workflow id is the unique execution id associated with this execution
workflow_id = workflow_client.start_workflow(request)
```

#### Execute Workflow Synchronously

Applicable when workflows complete very quickly - usually under 20-30 seconds.

```python
from conductor.client.http.models import StartWorkflowRequest

request = StartWorkflowRequest()
request.name = 'hello'
request.version = 1
request.input = {'name': 'Orkes'}

workflow_run = workflow_client.execute_workflow(
        start_workflow_request=request, 
        wait_for_seconds=12)
```

### Managing Workflow Executions

:::note
See [workflow_ops.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/workflow_ops.py) for a fully working application that demonstrates working with the workflow executions and sending signals to the workflow to manage its state.
:::

Workflows represent the application state. With Conductor, you can query the workflow execution state anytime during its lifecycle. You can also send signals to the workflow that determines the outcome of the workflow state.

[WorkflowClient](https://github.com/conductor-sdk/conductor-python/blob/main/src/conductor/client/workflow_client.py) is the client interface used to manage workflow executions.

```python
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients

api_config = Configuration()
clients = OrkesClients(configuration=api_config)
workflow_client = clients.get_workflow_client()
```

#### Get Execution Status

The following method lets you query the status of the workflow execution given the id. When the  `include_tasks` is set, the response also includes all the completed and in-progress tasks.

```python
get_workflow(workflow_id: str, include_tasks: Optional[bool] = True) -> Workflow
```

#### Update Workflow State Variables

Variables inside a workflow are the equivalent of global variables in a program.

```python
update_variables(self, workflow_id: str, variables: dict[str, object] = {})
```

#### Terminate Running Workflows

Used to terminate a running workflow. Any pending tasks are canceled, and no further work is scheduled for this workflow upon termination. A failure workflow will be triggered but can be avoided if `trigger_failure_workflow` is set to False.

```python
terminate_workflow(self, workflow_id: str, reason: Optional[str] = None, trigger_failure_workflow: bool = False)
```

#### Retry Failed Workflows

If the workflow has failed due to one of the task failures after exhausting the retries for the task, the workflow can still be resumed by calling the retry.

```python
retry_workflow(self, workflow_id: str, resume_subworkflow_tasks: Optional[bool] = False)
```

When a sub-workflow inside a workflow has failed, there are two options:

1. Re-trigger the sub-workflow from the start (Default behavior).
2. Resume the sub-workflow from the failed task (set `resume_subworkflow_tasks` to True).

#### Restart Workflows

A workflow in the terminal state (COMPLETED, TERMINATED, FAILED) can be restarted from the beginning. Useful when retrying from the last failed task is insufficient, and the whole workflow must be started again.

```python
restart_workflow(self, workflow_id: str, use_latest_def: Optional[bool] = False)
```

#### Rerun Workflow from a Specific Task

In the cases where a workflow needs to be restarted from a specific task rather than from the beginning, rerun provides that option. When issuing the rerun command to the workflow, you can specify the task ID from where the workflow should be restarted (as opposed to from the beginning), and optionally, the workflow's input can also be changed.

```python
rerun_workflow(self, workflow_id: str, rerun_workflow_request: RerunWorkflowRequest)
```

:::tip
Rerun is one of the most powerful features Conductor has, giving you unparalleled control over the workflow restart.
:::

#### Pause Running Workflow

A running workflow can be put to a PAUSED status. A paused workflow lets the currently running tasks complete but does not schedule any new tasks until resumed.

```python
pause_workflow(self, workflow_id: str)
```

#### Resume Paused Workflow

Resume operation resumes the currently paused workflow, immediately evaluating its state and scheduling the next set of tasks.

```python
resume_workflow(self, workflow_id: str)
```

### Searching for Workflows

Workflow executions are retained until removed from the Conductor. This gives complete visibility into all the executions an application has - regardless of the number of executions. Conductor has a powerful search API that allows you to search for workflow executions.

```python
search(self, start, size, free_text: str = '*', query: str = None) -> ScrollableSearchResultWorkflowSummary
```

- **free_text**: Free text search to look for specific words in the workflow and task input/output.
- **query_**: SQL-like query to search against specific fields in the workflow.

Here are the supported fields for **query**:

| Field | Description |
| ----- | ----------- | 
| status | The status of the workflow. | 
| correlationId	| The ID to correlate the workflow execution to other executions. |
| workflowType | The name of the workflow. |
| version | The version of the workflow. | 
| startTime	| The start time of the workflow is in milliseconds. |

### Handling Failures, Retries and Rate Limits

Conductor lets you embrace failures rather than worry about the complexities introduced in the system to handle failures.

All the aspects of handling failures, retries, rate limits, etc., are driven by the configuration that can be updated in real time without re-deploying your application.

#### Retries

Each task in the Conductor workflow can be configured to handle failures with retries, along with the retry policy (linear, fixed, exponential backoff) and maximum number of retry attempts allowed.

See [Error Handling](https://orkes.io/content/error-handling) for more details.

#### Rate Limits

What happens when a task is operating on a critical resource that can only handle a few requests at a time? Tasks can be configured to have a fixed concurrency (X request at a time) or a rate (Y tasks/time window).

**Task Registration**

```python
from conductor.client.configuration.configuration import Configuration
from conductor.client.http.models import TaskDef
from conductor.client.orkes_clients import OrkesClients


def main():
    api_config = Configuration()
    clients = OrkesClients(configuration=api_config)
    metadata_client = clients.get_metadata_client()

    task_def = TaskDef()
    task_def.name = 'task_with_retries'
    task_def.retry_count = 3
    task_def.retry_logic = 'LINEAR_BACKOFF'
    task_def.retry_delay_seconds = 1

    # only allow 3 tasks at a time to be in the IN_PROGRESS status
    task_def.concurrent_exec_limit = 3

    # timeout the task if not polled within 60 seconds of scheduling
    task_def.poll_timeout_seconds = 60

    # timeout the task if the task does not COMPLETE in 2 minutes
    task_def.timeout_seconds = 120

    # for the long running tasks, timeout if the task does not get updated in COMPLETED or IN_PROGRESS status in
    # 60 seconds after the last update
    task_def.response_timeout_seconds = 60

    # only allow 100 executions in a 10-second window! -- Note, this is complementary to concurrent_exec_limit
    task_def.rate_limit_per_frequency = 100
    task_def.rate_limit_frequency_in_seconds = 10

    metadata_client.register_task_def(task_def=task_def)
```

```json
{
  "name": "task_with_retries",
  
  "retryCount": 3,
  "retryLogic": "LINEAR_BACKOFF",
  "retryDelaySeconds": 1,
  "backoffScaleFactor": 1,
  
  "timeoutSeconds": 120,
  "responseTimeoutSeconds": 60,
  "pollTimeoutSeconds": 60,
  "timeoutPolicy": "TIME_OUT_WF",
  
  "concurrentExecLimit": 3,
  
  "rateLimitPerFrequency": 0,
  "rateLimitFrequencyInSeconds": 1
}
```

**Update Task Definition**

```shell
POST /api/metadata/taskdef -d @task_def.json
```

See [task_configure.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/task_configure.py) for a detailed working app.

## Using Conductor in your Application

Conductor SDKs are lightweight and can easily be added to your existing or new Python app. This section will dive deeper into integrating Conductor in your application.

### Adding Conductor SDK to Your Application

Conductor Python SDKs are published on PyPi @ [https://pypi.org/project/conductor-python/](https://pypi.org/project/conductor-python/):

```shell
pip3 install conductor-python
```

### Testing Workflows

Conductor SDK for Python provides a complete feature testing framework for your workflow-based applications. The framework works well with any testing framework you prefer without imposing any specific framework.

The Conductor server provides a test endpoint `POST /api/workflow/test` that allows you to post a workflow along with the test execution data to evaluate the workflow.

The goal of the test framework is as follows:

1. Ability to test the various branches of the workflow.
2. Confirm the workflow execution and tasks given a fixed set of inputs and outputs.
3. Validate that the workflow completes or fails given specific inputs.

Here are example assertions from the test:

```python

...
test_request = WorkflowTestRequest(name=wf.name, version=wf.version,
                                       task_ref_to_mock_output=task_ref_to_mock_output,
                                       workflow_def=wf.to_workflow_def())
run = workflow_client.test_workflow(test_request=test_request)

print(f'completed the test run')
print(f'status: {run.status}')
self.assertEqual(run.status, 'COMPLETED')

...
```

:::note
Workflow workers are your regular Python functions and can be tested with any available testing framework.
:::

#### Example Unit Testing Application

See [test_workflows.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/test_workflows.py) for a fully functional example of how to test a moderately complex workflow with branches.

### Workflow Deployments Using CI/CD

:::tip
Treat your workflow definitions just like your code. Suppose you are defining the workflows using UI. In that case, we recommend checking the JSON configuration into the version control and using your development workflow for CI/CD to promote the workflow definitions across various environments such as Dev, Test, and Prod.
:::

Here is a recommended approach when defining workflows using JSON:

- Treat your workflow metadata as code.
- Check in the workflow and task definitions along with the application code.
- Use `POST /api/metadata/*` endpoints or MetadataClient (from `conductor.client.metadata_client import MetadataClient`) to register/update workflows as part of the deployment process.
- Version your workflows. If there is a significant change, change the version field of the workflow. See versioning workflows below for more details.

### Versioning Workflows

A powerful feature of Conductor is the ability to version workflows. You should increment the version of the workflow when there is a significant change to the definition. You can run multiple versions of the workflow at the same time. When starting a new workflow execution, use the **version** field to specify which version to use. When omitted, the latest (highest-numbered) version is used.

- Versioning allows safely testing changes by doing canary testing in production or A/B testing across multiple versions before rolling out.
- A version can also be deleted, effectively allowing for "rollback" if required.

Check out more [examples](https://github.com/conductor-sdk/conductor-python/tree/main/examples).