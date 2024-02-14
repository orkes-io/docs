
# Orkes Conductor Python SDK

Orkes Conductor Python SDK is maintained here: https://github.com/conductor-sdk/conductor-python.

## Install SDK

Create a virtual environment to build your package.

```python
virtualenv conductor
source conductor/bin/activate
```

## Get Conductor Python SDK

SDK needs Python 3.9+.

```python
python3 -m pip install conductor-python
```

## Setup SDK

Point the SDK to the Conductor Server API endpoint.

```python
export CONDUCTOR_SERVER_URL=http://localhost:8080/api
```

(Optionally) If you are using a Conductor server that requires authentication

Check out the documentation on [how to obtain the key and secret from the Conductor server.](https://orkes.io/content/access-control-and-security/applications)

```python
export CONDUCTOR_AUTH_KEY=your_key
export CONDUCTOR_AUTH_SECRET=your_key_secret
```

## Start Conductor Server

```python
docker run --init -p 8080:8080 -p 5000:5000 conductoross/conductor-standalone:3.15.0
```

After starting the server navigate to http://localhost:5000 to ensure the server has started successfully.

## Simple Hello World Application using Conductor

In this section, we will create a simple "Hello World" application that uses Conductor.

### Step 1: Create a Workflow

#### Use Code to create workflows

Create [greetings_workflow.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/greetings_workflow.py) with the following:

```python
from conductor.client.workflow.conductor_workflow import ConductorWorkflow
from conductor.client.workflow.executor.workflow_executor import WorkflowExecutor
from greetings import greet

def greetings_workflow(workflow_executor: WorkflowExecutor) -> ConductorWorkflow:
    name = 'hello'
    workflow = ConductorWorkflow(name=name, executor=workflow_executor)
    workflow.version = 1
    workflow >> greet(task_ref_name='greet_ref', name=workflow.input('name'))
    return workflow
```

(Alternatively) Use JSON to create workflows

Create workflow json with the following:

```json
{
  "name": "hello",
  "description": "hello workflow",
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

Now, register this workflow with the server:

```bash
curl -X POST -H "Content-Type:application/json" \
http://localhost:8080/api/metadata/workflow -d @workflow.json
```

### Step 2: Write Worker

Create [greetings.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/greetings.py) with a simple worker and a workflow function.

:::note
A single workflow application can have workers written in different languages.
:::

```python
from conductor.client.worker.worker_task import worker_task


@worker_task(task_definition_name='greet')
def greet(name: str) -> str:
    return f'Hello my friend {name}'
```

### Step 3: Write your application

Let's add [greetings_main.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/greetings_main.py) with the **main** method:

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
    workflow = register_workflow(workflow_executor)

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

:::note
That's it - you just created your first distributed python app!
:::

### Using Conductor in your application

There are three main ways you will use Conductor when building durable, resilient, distributed applications.

1. Write service workers that implement business logic to accomplish a specific goal - such as initiating payment transfer, getting user information from the database, etc.
2. Create Conductor workflows that implement application state - A typical workflow implements a Saga pattern.
3. Use Conductor SDK and APIs to manage workflows from your application.

## Create and Run Conductor Workers

### Writing Workers

A workflow task represents a unit of business logic that achieves a specific goal, such as checking inventory, initiating payment transfers, etc. Worker implements a task in the workflow. (note: often times, worker and task are used interchangeably in various blogs, docs, etc.)

### Implementing Workers

The workers can be implemented by writing a simple python function and annotating the function with the **@worker_task**. Conductor workers are services (similar to microservices) that follow the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle).

Workers can be hosted along with the workflow or run in a distributed environment where a single workflow uses workers that are deployed and running in different machines/VMS/containers. Keeping all the workers in the same application or running them as a distributed application is a design and architectural choice. Conductor is well suited for both kind of scenarios.

You create or convert any existing python function to a distributed worker by adding **@worker_task** annotation to it. Here is a simple worker that takes **name** as input and returns greetings:

```python
from conductor.client.worker.worker_task import worker_task

@worker_task(task_definition_name='greetings')
def greetings(name: str) -> str:
    return f'Hello, {name}'
```

A worker can take inputs that are primitives - **str**, **int**, **float**, **bool**, etc. or can be complex data classes.

Here is an example worker that uses **dataclass** as part of the worker input.

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

### Managing workers in your application

Workers use a polling mechanism (with long-poll) to check for any available tasks from server periodically. The startup and shutdown of workers are handled by **conductor.client.automator.task_handler.TaskHandler** class.

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
2. Each worker executes a very specific task and produces well-defined output given specific inputs.
3. Workers are meant to be idempotent (or should handle cases where the task that is partially executed gets rescheduled due to timeouts, etc.)
4. Workers do not implement the logic to handle retries, etc., that the Conductor server takes care of.

### System Task Workers

A system task worker is a pre-built, general-purpose worker in your Conductor server distribution.

System tasks automate repeated tasks such as calling an HTTP endpoint, executing lightweight ECMA-compliant javascript code, publishing to an event broker, etc.

#### Wait Task

:::tip
Wait is a powerful way to have your system wait for a certain trigger, such as an external event, a certain date/time, or a duration, such as 2 hours, without having to manage threads, background processes, or jobs.
:::

##### Using code to create WAIT task

```python
from conductor.client.workflow.task.wait_task import WaitTask

# waits for 2 seconds before scheduling the next task
wait_for_two_sec = WaitTask(task_ref_name='wait_for_2_sec', wait_for_seconds=2)

# wait until end of jan
wait_till_jan = WaitTask(task_ref_name='wait_till_jsn', wait_until='2024-01-31 00:00 UTC')

# waits until an API call or an event is triggered
wait_for_signal = WaitTask(task_ref_name='wait_till_jan_end')
```

##### JSON configuration

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

Make a request to an HTTP(S) endpoint. The task allows making GET, PUT, POST, DELETE, HEAD, and PATCH requests.

##### Using code to create an HTTP task

```python
from conductor.client.workflow.task.http_task import HttpTask

HttpTask(task_ref_name='call_remote_api', http_input={
        'uri': 'https://orkes-api-tester.orkesconductor.com/api'
    })
```

##### JSON configuration

```json
{
  "name": "http_task",
  "taskReferenceName": "http_task_ref",
  "type" : "HTTP",
  "uri": "https://orkes-api-tester.orkesconductor.com/api",
  "method": "GET"
}
```

#### Javascript Executor Task

Execute ECMA-compliant Javascript code. It is useful when you need to write a script for data mapping, calculations, etc.

```python
from conductor.client.workflow.task.javascript_task import JavascriptTask

say_hello_js = """
function greetings() {
    return {
        "text": "hello " + $.name
    }
}
greetings();
"""

js = JavascriptTask(task_ref_name='hello_script', script=say_hello_js, bindings={'name': '${workflow.input.name}'})
```

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

#### Json Processing using JQ

[jq](https://jqlang.github.io/jq/) is like sed for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that sed, awk, grep and friends let you play with text.

```python
from conductor.client.workflow.task.json_jq_task import JsonJQTask

jq_script = """
{ key3: (.key1.value1 + .key2.value2) }
"""

jq = JsonJQTask(task_ref_name='jq_process', script=jq_script)
"""

jq = JsonJQTask(task_ref_name='jq_process', script=jq_script)
```

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

### Worker vs. Microservice / HTTP endpoints

:::tip
Workers are a lightweight alternative to exposing an HTTP endpoint and orchestrating using an HTTP task. Using workers is a recommended approach if you do not need to expose the service over HTTP or gRPC endpoints.
:::

There are several advantages to this approach:

1. **No need for an API management layer**: Given there are no exposed endpoints and workers are self load-balancing.
2. **Reduced infrastructure footprint**: No need for an API gateway/load balancer.
3. All the communication is initiated from worker using polling - avoiding need to open up any incoming TCP ports.
4. Workers **self-regulate** when busy; they only poll as much as they can handle. Backpressure handling is done out of the box.
5. Workers can be scaled up / down quickly based on the demand by increasing the no. of processes.

### Deploying Workers in production

Conductor workers can run in the cloud-native environment or on-prem and can easily be deployed like any other Python application. Workers can run a containerized environment, VMs, or on bare-metal just like you would deploy your other Python applications.

## Create Conductor Workflows

Workflow can be defined as the collection of tasks and operators that specify the order and execution of the defined tasks. This orchestration occurs in a hybrid ecosystem that encircles serverless functions, microservices, and monolithic applications.

In this section, we will dive deeper into creating and executing Conductor workflows using Python SDK.

### Creating Workflows

Conductor lets you create the workflows either using Python or JSON as the configuration. Using Python as code to define and execute workflows enables you to build extremely powerful, dynamic workflows and run them on Conductor.

When the workflows are fairly static, they can be designed using the Orkes UI (available when using orkes.io) and using APIs or SDKs to register and run the workflows.

Both the code and configuration approaches are equally powerful and similar in nature to how you treat Infrastructure as Code.

#### Execute dynamic workflows using Code

For cases where the workflows cannot be created statically ahead of time, Conductor is a powerful dynamic workflow execution platform that lets you create very complex workflows in code and execute them. Useful when the workflow is unique for each execution.

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients
from conductor.client.worker.worker_task import worker_task
from conductor.client.workflow.conductor_workflow import ConductorWorkflow


@worker_task(task_definition_name='get_user_email')
def get_user_email(userid: str) -> str:
    return f'{userid}@example.com'


@worker_task(task_definition_name='send_email')
def send_email(email: str, subject: str, body: str):
    print(f'sending email to {email} with subject {subject} and body {body}')


def main():

    # defaults to reading the configuration using following env variables
    # CONDUCTOR_SERVER_URL : conductor server e.g. https://play.orkes.io/api
    # CONDUCTOR_AUTH_KEY : API Authentication Key
    # CONDUCTOR_AUTH_SECRET: API Auth Secret
    api_config = Configuration()

    task_handler = TaskHandler(configuration=api_config)
    task_handler.start_processes()

    clients = OrkesClients(configuration=api_config)
    workflow_executor = clients.get_workflow_executor()
    workflow = ConductorWorkflow(name='dynamic_workflow', version=1, executor=workflow_executor)
    get_email = get_user_email(task_ref_name='get_user_email_ref', userid=workflow.input('userid'))
    sendmail = send_email(task_ref_name='send_email_ref', email=get_email.output('result'), subject='Hello from Orkes',
                          body='Test Email')
    workflow >> get_email >> sendmail

    # Configure the output of the workflow
    workflow.output_parameters(output_parameters={
        'email': get_email.output('result')
    })

    result = workflow.execute(workflow_input={'userid': 'user_a'})
    print(f'\nworkflow output:  {result.output}\n')
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

#### Kitchensink Workflow

See [kitchensink.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/kitchensink.py) for a more complex example.

### Executing Workflows

[WorkflowClient](https://github.com/conductor-sdk/conductor-python/blob/main/src/conductor/client/workflow_client.py) interface provides all the APIs required to work with workflow executions.

```python
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients

api_config = Configuration()
clients = OrkesClients(configuration=api_config)
workflow_client = clients.get_workflow_client() 
```

#### Execute workflow asynchronously

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

#### Execute workflow synchronously

Useful when workflows complete very quickly - usually under 20-30 seconds.

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

Workflows represent te application state. With Conductor, you can query the workflow execution state anytime during its lifecycle. You can also send Signals to the workflow that determines the outcome of the workflow state.

[WorkflowClient](https://github.com/conductor-sdk/conductor-python/blob/main/src/conductor/client/workflow_client.py) is the client interface used to manage workflow executions.

```python
from conductor.client.configuration.configuration import Configuration
from conductor.client.orkes_clients import OrkesClients

api_config = Configuration()
clients = OrkesClients(configuration=api_config)
workflow_client = clients.get_workflow_client()
```

#### Get the execution status

The following method lets you query the status of the workflow execution given the id. When the **include_tasks** is set the response also includes all the completed and in progress tasks.

```
get_workflow(workflow_id: str, include_tasks: Optional[bool] = True) -> Workflow
```

#### Update workflow state variables

Variables inside a workflow are the equivalent of global variables in a program.

```
update_variables(self, workflow_id: str, variables: dict[str, object] = {})
```

#### Terminate running workflows

Terminates a running workflow. Any pending tasks are cancelled and no further work is scheduled for this workflow upon termination. A failure workflow will be triggered, but can be avoided if **trigger_failure_workflow** is set to False.

```
terminate_workflow(self, workflow_id: str, reason: Optional[str] = None, trigger_failure_workflow: bool = False)
```

#### Retry failed workflows

If the workflow has failed due to one of the task failures after exhausting the retries for the task, the workflow can still be resumed by calling the retry.

```
retry_workflow(self, workflow_id: str, resume_subworkflow_tasks: Optional[bool] = False)
```

When a sub-workflow inside a workflow has failed, there are two options:

1. Re-trigger the sub-workflow from the start (Default behavior)
2. Resume the sub-workflow from the failed task (set resume_subworkflow_tasks to True)

#### Restart workflows

A workflow in the terminal state (COMPLETED, TERMINATED, FAILED) can be restarted from the beginning. Useful when retrying from the last failed task is insufficient, and the whole workflow must be started again.

```
restart_workflow(self, workflow_id: str, use_latest_def: Optional[bool] = False)
```

#### Rerun a workflow from a specific task


In the cases where a workflow needs to be restarted from a specific task rather than from the beginning, **re-run** provides that option. When issuing the re-run command to the workflow, you have the ability to specify the id of the task from where the workflow should be restarted (as opposed to from the beginning) and optionally, the input of the workflow can also be changed:

```
rerun_workflow(self, workflow_id: str, rerun_workflow_request: RerunWorkflowRequest)
```

:::tip
Re-run is one of the most powerful features of Conductor, giving you unparalleled control over the restart of workflow.
:::

#### Pause a running workflow

A running workflow can be put to a PAUSED status. A paused workflow lets the currently running tasks be completed but does not schedule any new tasks until resumed.

```
pause_workflow(self, workflow_id: str)
```

#### Resume paused workflow

Resume operation resumes the currently paused workflow, immediately evaluating its state and scheduling the next set of tasks.

```
resume_workflow(self, workflow_id: str)
```

### Searching for workflows

Workflow executions are retained until removed from Conductor. This gives complete visibility into all the executions an application has - regardless of the number of executions. Conductor has a poewrful search API that allows you to search for workflow executions.

```
search(self, start, size, free_text: str = '*', query: str = None) -> ScrollableSearchResultWorkflowSummary
```

- **free_text**: Free text search to look for specific words in the workflow and task input/output
- **query**: SQL like query to search against specific fields in the workflow.

Supported fields for query:

| Field | Description |
| ----- | ----------- |
| status | Workflow status | 
| correlationId	| Correlation Id | 
| workflowType | Name of the workflow | 
| version	| Workflow version |
| startTime	| Start time of the workflow in unix millis |

### Handling Failures, Retries and Rate Limits

Conductor lets you embrace failures rather than worry about failures and complexities that are introduced in the system to handle failures.

All aspects of handling failures, retries, rate limits, etc., are driven by the configuration that can be updated in real time without having to redeploy your application.

#### Retries

Each task in Conductor workflow can be configured to handle failures with retries, along with the retry policy (linear, fixed, exponential backoff) and maximum number of retry attempts allowed.

See [Error Handling](https://orkes.io/content/error-handling) for more details.

#### Rate Limits

What happens when a task is operating on a critical resource that can only handle so many requests at a time? Tasks can be configured to have a fixed concurrency (X request at a time) or a rate (Y tasks/time window).

##### Task Registration

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

Update the task definition:

```
POST /api/metadata/taskdef -d @task_def.json
```

See [task_configure.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/task_configure.py) for a detailed working app.

## Using Conductor in your Application

Conductor SDKs are very lightweight and can easily be added to your existing or new Python app. In this section, we will dive deeper into integrating Conductor in your application.

### Adding Conductor SDK to your application

Conductor Python SDKs are published on PyPi at https://pypi.org/project/conductor-python/

```
pip3 install conductor-python
```

### Testing your workflows

Conductor SDK for Python provides a full feature testing framework for your workflow-based applications. The framework works well with any testing framework you prefer to use without imposing any specific framework.

Conductor server provides a test endpoint **POST /api/workflow/test** that allows you to post a workflow along with the test execution data to evaluate the workflow.

The goal of the test framework is as follows:

1. Ability to test the various branches of the workflow.
2. Confirm the execution of the workflow and tasks given fixed set of inputs and outputs.
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
Workflow workers are your regular python functions and can be tested with any of the available testing frameworks.
:::

#### Example Unit Testing application

See [test_workflows.py](https://github.com/conductor-sdk/conductor-python/blob/main/examples/test_workflows.py) for a fully functional example of how to test a moderately complex workflow with branches.

### Workflow deployments using CI/CD

:::tip
Treat your workflow definitions just like your code. Suppose you are defining the workflows using UI. In that case, we recommend checking the JSON configuration into the version control and using your development workflow for CI/CD to promote the workflow definitions across various environments such as Dev, Test, and Prod.
:::

Here is a recommended approach when defining workflows using JSON:

- Treat your workflow metadata as code.
- Check in the workflow and task definitions along with the application code.
- Use **POST /api/metadata/*** endpoints or MetadataClient (**from conductor.client.metadata_client import MetadataClient**) to register/update workflows as part of the deployment process.
- Version your workflows. If there is a significant change, change the version field of the workflow. See Versioning workflows below for more details.

### Versioning workflows

A powerful feature of Conductor is ability to version workflows. You should increment the version of the workflow when there is a significant change to the definition. You can run multiple versions of the workflow at the same time. When starting a new workflow execution, use the **version** field to specify which version to use. When omitted, the latest (highest numbered) version is used.

- Versioning allows safely testing changes by doing canary testing in production or A/B testing across multiple versions before rolling out.
- A version can be deleted as well, effectively allowing for "rollback" if required.
