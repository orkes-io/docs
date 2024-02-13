
# Orkes Conductor Python SDK

Orkes Conductor Python SDK is maintained here: https://github.com/conductor-sdk/conductor-python

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

After starting the server navigate to http://localhost:1234 to ensure the server has started successfully.

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

1. Write service workers that implements business logic to accomplish a specific goal - such as initiate payment transfer, get user information from database etc.
2. Create Conductor workflows that implements application state - A typical workflow implements SAGA pattern
3. Use Conductor SDK and APIs to manage workflows from your application.

- [Create and Run Conductor Workflows](https://github.com/conductor-sdk/conductor-python/blob/main/workers.md)
- [Create Conductor Workflows](https://github.com/conductor-sdk/conductor-python/blob/main/workflows.md)
- [Using Conductor in your Application](https://github.com/conductor-sdk/conductor-python/blob/main/conductor_apps.md)

## Related Topics

- Video Guide on [Getting Access Key and Secret](/content/how-to-videos/access-key-and-secret)