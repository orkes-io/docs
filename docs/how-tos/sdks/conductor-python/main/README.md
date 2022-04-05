# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-python` repository provides the client SDKs to build Task Workers in Python

## Quick Start

1. [Create virtual environment](#Virtual-Environment-Setup)
2. [Write worker](#Write-worker)
3. [Run workers](#Run-workers)
4. [Worker Configurations](#Worker-Configurations)
5. [C/C++ Support](#cc-support)

### Virtual Environment Setup

 ```shell
  $ virtualenv conductor
  $ source conductor/bin/activate
```
Install conductor-python package
```shell
python3 -m pip install conductor-python
```

### Write worker    

```python
from conductor.client.http.models.task import Task
from conductor.client.http.models.task_result import TaskResult
from conductor.client.http.models.task_result_status import TaskResultStatus
from conductor.client.worker.worker_interface import WorkerInterface


class SimplePythonWorker(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        
        # Add any outputs that the task should produce as part of the execution
        task_result.add_output_data('key', 'value')
        task_result.add_output_data('temperature', 32)
        
        # Mark the task status as COMPLETED
        task_result.status = TaskResultStatus.COMPLETED
        return task_result
```
### Run workers
Create main method that does the following:
1. Adds configurations such as metrics, authentication, thread count, Conductor server URL
2. Add your workers
3. Start the workers to poll for work

```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.configuration.settings.metrics_settings import MetricsSettings
from conductor.client.http.models.task_result_status import TaskResultStatus
from conductor.client.worker.worker_interface import WorkerInterface
from conductor.client.http.models import Task, TaskResult
from conductor.client.configuration.settings.authentication_settings import AuthenticationSettings
from pathlib import Path
import os


class SimplePythonWorker(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('key1', 'value')
        task_result.add_output_data('key2', 42)
        task_result.add_output_data('key3', False)
        task_result.status = TaskResultStatus.COMPLETED
        return task_result


class WorkerA(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('key', 'A')
        task_result.status = TaskResultStatus.COMPLETED
        return task_result


class WorkerB(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('key', 'B')
        task_result.status = TaskResultStatus.COMPLETED
        return task_result


def main():
    # Create a temp folder for metrics logs
    metrics_dir = str(Path.home()) + '/tmp/'
    if not os.path.isdir(metrics_dir):
        os.mkdir(metrics_dir)

    metrics_settings = MetricsSettings(
        directory=metrics_dir
    )

    # Optionally, if you are using Conductor server that requires authentication,  setup key_id and secret
    auth = AuthenticationSettings(
        key_id='id',
        key_secret='secret'
    )

    # Point to the Conductor Server
    configuration = Configuration(
        base_url='http://localhost:8080',
        debug=True,
        # authentication_settings=auth      # Optional if you are using server that requires authentication
    )

    # Add three workers
    workers = [
        SimplePythonWorker('python_task_example'),
        WorkerA('task_A'),
        WorkerB('task_B'),
    ]

    # Start the worker processes and wait
    with TaskHandler(workers, configuration=configuration, metrics_settings=metrics_settings) as task_handler:
        task_handler.start_processes()
        task_handler.join_processes()


if __name__ == '__main__':
    main()
```

Save this as `main.py`

### Running Conductor server locally in 2-minute
More details on how to run Conductor see https://netflix.github.io/conductor/server/ 

Use the script below to download and start the server locally.  The server runs in memory and no data saved upon exit.
```shell
export CONDUCTOR_VER=3.5.2
export REPO_URL=https://repo1.maven.org/maven2/com/netflix/conductor/conductor-server
curl $REPO_URL/$CONDUCTOR_VER/conductor-server-$CONDUCTOR_VER-boot.jar \
--output conductor-server-$CONDUCTOR_VER-boot.jar; java -jar conductor-server-$CONDUCTOR_VER-boot.jar 
```
### Execute workers
```shell
python ./main.py
```

### Create your first workflow
Now, let's create a new workflow and see your task worker code in execution!

Create a new Task Metadata for the worker you just created

```shell
curl -X 'POST' \
  'http://localhost:8080/api/metadata/taskdefs' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '[{
    "name": "python_task_example",
    "description": "Python task example",
    "retryCount": 3,
    "retryLogic": "FIXED",
    "retryDelaySeconds": 10,
    "timeoutSeconds": 300,
    "timeoutPolicy": "TIME_OUT_WF",
    "responseTimeoutSeconds": 180,
    "ownerEmail": "example@example.com"
}]'
```

Create a workflow that uses the task
```shell
curl -X 'POST' \
  'http://localhost:8080/api/metadata/workflow' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "workflow_with_python_task_example",
    "description": "Workflow with Python Task example",
    "version": 1,
    "tasks": [
      {
        "name": "python_task_example",
        "taskReferenceName": "python_task_example_ref_1",
        "inputParameters": {},
        "type": "SIMPLE"
      }
    ],
    "inputParameters": [],
    "outputParameters": {
      "workerOutput": "${python_task_example_ref_1.output}"
    },
    "schemaVersion": 2,
    "restartable": true,
    "ownerEmail": "example@example.com",
    "timeoutPolicy": "ALERT_ONLY",
    "timeoutSeconds": 0
}'
```

Start a new workflow execution
```shell
curl -X 'POST' \
  'http://localhost:8080/api/workflow/workflow_with_python_task_example?priority=0' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{}'
```


## Worker Configurations
Worker configuration is handled via `Configuraiton` object passed when initializing `TaskHandler`

### Server Configurations
* base_url : Conductor server address.  e.g. `http://localhost:8000` if running locally 
* debug: `true` for verbose logging `false` to display only the errors
* authentication_settings: see below
* metrics_settings: see below

### Metrics
Conductor uses [Prometheus](https://prometheus.io/) to collect metrics.

* directory: Directory where to store the metrics 
* file_name: File where the metrics are colleted. e.g. `metrics.log`
* update_interval: Time interval in seconds at which to collect metrics into the file

### Authentication
Use if your conductor server requires authentication
* key_id: Key
* key_secret: Secret for the Key 

## C/C++ Support
Python is great, but at times you need to call into native C/C++ code. 
Here is an example how you can do that with Conductor SDK.

### 1.  Export your C++ functions as `extern "C"`:
   * C++ function example (sum two integers)
        ```cpp
        #include <iostream>

        extern "C" int32_t get_sum(const int32_t A, const int32_t B) {
            return A + B; 
        }
        ```
### 2. Compile and share its library:
   * C++ file name: `simple_cpp_lib.cpp`
   * Library output name goal: `lib.so`
        ```bash
        $ g++ -c -fPIC simple_cpp_lib.cpp -o simple_cpp_lib.o
        $ g++ -shared -Wl,-install_name,lib.so -o lib.so simple_cpp_lib.o
        ```
     
### 3. Use the C++ library in your python worker
    
```python
from conductor.client.http.models.task import Task
from conductor.client.http.models.task_result import TaskResult
from conductor.client.http.models.task_result_status import TaskResultStatus
from conductor.client.worker.worker_interface import WorkerInterface
from ctypes import cdll

class CppWrapper:
    def __init__(self, file_path='./lib.so'):
        self.cpp_lib = cdll.LoadLibrary(file_path)

    def get_sum(self, X: int, Y: int) -> int:
        return self.cpp_lib.get_sum(X, Y)


class SimpleCppWorker(WorkerInterface):
    cpp_wrapper = CppWrapper()

    def execute(self, task: Task) -> TaskResult:
        execution_result = self.cpp_wrapper.get_sum(1, 2)
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data(
            'sum', execution_result
        )
        task_result.status = TaskResultStatus.COMPLETED
        return task_result
```


## Unit Tests
### Simple validation

```shell
/conductor-python/src$ python3 -m unittest -v
```

### Run with code coverage

```shell
/conductor-python/src$ python3 -m coverage run --source=conductor/ -m unittest
```

Report:

```shell
/conductor-python/src$ python3 -m coverage report
```

Visual coverage results:
```shell
/conductor-python/src$ python3 -m coverage html
```
