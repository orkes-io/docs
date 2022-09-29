# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-python` repository provides the client SDKs to build Task Workers in Python

### Setup Virtual Environment

```shell
$ virtualenv conductor
$ source conductor/bin/activate
```
Install `conductor-python` package
```shell
$ python3 -m pip install conductor-python
```

### Write a simple worker
```python
from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from conductor.client.configuration.settings.authentication_settings import AuthenticationSettings
from conductor.client.http.models import Task, TaskResult
from conductor.client.http.models.task_result_status import TaskResultStatus
from conductor.client.worker.worker_interface import WorkerInterface


class SimplePythonWorker(WorkerInterface):
    def execute(self, task: Task) -> TaskResult:
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('key1', 'value')
        task_result.add_output_data('key2', 42)
        task_result.add_output_data('key3', False)
        task_result.status = TaskResultStatus.COMPLETED
        return task_result

    def get_polling_interval_in_seconds(self) -> float:
        return 1


def main():
    # Point to the Conductor Server
    configuration = Configuration(
        server_api_url='https://play.orkes.io/api',
        debug=True,
        authentication_settings=AuthenticationSettings(  # Optional if you are using a server that requires authentication
            key_id='KEY',
            key_secret='SECRET'
        )
    )

    # Add three workers
    workers = [
        SimplePythonWorker('python_task_example'),        
    ]

    # Start the worker processes and wait for their completion
    with TaskHandler(workers, configuration) as task_handler:
        task_handler.start_processes()
        task_handler.join_processes()

if __name__ == '__main__':
    main()
```

Start polling for the work

```shell
python main.py
```

See [Using Conductor Playground](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground)
for more details on how to use Playground environment for testing.


## Worker Configurations
Worker configuration is handled via `Configuration` object passed when initializing `TaskHandler`

### Server Configurations
* server_api_url : Conductor server address.  e.g. `http://localhost:8000/api` if running locally 
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
You can use the Python library to call native code written in C++.  Here is an example that calls native C++ library
from the Python worker.
See [simple_cpp_lib.cpp](src/example/worker/cpp/simple_cpp_lib.cpp) 
and [simple_cpp_worker.py](src/example/worker/cpp/simple_cpp_worker.py) for complete working example.

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
