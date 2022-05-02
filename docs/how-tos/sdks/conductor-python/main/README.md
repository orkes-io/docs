# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-python` repository provides the client SDKs to build Task Workers in Python

## Quick Start

- [Netflix Conductor Client SDK](#netflix-conductor-client-sdk)
  - [Quick Start](#quick-start)
    - [Virtual Environment Setup](#virtual-environment-setup)
    - [Local Environment Setup](#local-environment-setup)
    - [Write worker](#write-worker)
    - [Run workers](#run-workers)
    - [Running Conductor server locally in 2-minute](#running-conductor-server-locally-in-2-minute)
    - [Execute workers](#execute-workers)
    - [Create your first workflow](#create-your-first-workflow)
  - [Worker Configurations](#worker-configurations)
    - [Server Configurations](#server-configurations)
    - [Metrics](#metrics)
    - [Authentication](#authentication)
  - [C/C++ Support](#cc-support)
    - [1. Export your C++ functions as `extern "C"`:](#1-export-your-c-functions-as-extern-c)
    - [2. Compile and share its library:](#2-compile-and-share-its-library)
    - [3. Use the C++ library in your python worker](#3-use-the-c-library-in-your-python-worker)
  - [Unit Tests](#unit-tests)
    - [Simple validation](#simple-validation)
    - [Run with code coverage](#run-with-code-coverage)

### Virtual Environment Setup

```shell
$ virtualenv conductor
$ source conductor/bin/activate
```
Install `conductor-python` package
```shell
$ python3 -m pip install conductor-python
```

### Local Environment Setup

```shell
$ git clone https://github.com/conductor-sdk/conductor-python.git
$ cd conductor-python/
$ python3 -m pip install .
$ python3 ./src/example/main/main.py
```

### Write worker    

Worker examples:
- [C++](src/example/worker/cpp/)
- [Python](src/example/worker/python/)
### Run workers

`main.py` [example](src/example/main/main.py)

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
Worker configuration is handled via `Configuration` object passed when initializing `TaskHandler`

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

### 1. Export your C++ functions as `extern "C"`:
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
