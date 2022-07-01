# Writing Workers

A worker is responsible for executing a task. 
Operator and System tasks are handled by the Conductor server, while user defined tasks needs to have a worker created that awaits the work to be scheduled by the server for it to be executed.

Worker framework provides features such as polling threads, metrics and server communication.

### Design Principles for Workers
Each worker embodies design pattern and follows certain basic principles:

1. Workers are stateless and do not implement a workflow specific logic. 
2. Each worker executes a very specific task and produces well-defined output given specific inputs. 
3. Workers are meant to be idempotent (or should handle cases where the task that partially executed gets rescheduled due to timeouts etc.)
4. Workers do not implement the logic to handle retries etc, that is taken care by the Conductor server.

### Creating Task Workers
Task worker is implemented using a function that confirms to the following function
```go
type ExecuteTaskFunction func(t *Task) (interface{}, error)
```

Worker returns a struct as the output of the task execution.  The struct MUST be serializable to a JSON map.
If an `error` is returned, the task is marked as `FAILED`

#### Task worker that returns a struct

```go

//TaskOutput struct that represents the output of the task execution
type TaskOutput struct {
    Keys    []string
    Message string
    Value   float64
}

//SimpleWorker function accepts Task as input and returns TaskOutput as result
//If there is a failure, error can be returned and the task will be marked as FAILED
func SimpleWorker(t *model.Task) (interface{}, error) {
    taskResult := &TaskOutput{
        Keys:    []string{"Key1", "Key2"},
        Message: "Hello World",
        Value:   rand.ExpFloat64(),
    }
    return taskResult, nil
}
```

#### Controlling execution for long-running tasks
For the long-running tasks you might want to spawn another process/routine and update the status of the task at a later point and complete the
execution function without actually marking the task as `COMPLETED`.  Use `TaskResult` struct that allows you to specify more fined grained control.

Here is an example of a task execution function that returns with `IN_PROGERSS` status asking server to push the task again in 60 seconds.
```go
func LongRunningTaskWorker(t *model.Task) (interface{}, error) {
	taskResult := model.NewTaskResult(t)
	taskResult.OutputData = map[string]interface{}{}
    
	//Keep the status as IN_PROGRESS
	taskResult.Status = task_result_status.IN_PROGRESS
	//Time after which the task should be sent back to worker
	taskResult.CallbackAfterSeconds = 60
	return taskResult, nil
}
```

## Starting Workers
`TaskRunner` interface is used to start the workers, which takes care of polling server for the work, executing worker code and updating the results back to the server.

```go
apiClient := client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
    "https://play.orkes.io/api",
))

taskRunner := worker.NewTaskRunnerWithApiClient(apiClient)
//Start polling for a task by name "simple_task", with a batch size of 1 and 1 second interval
//Between polls if there are no tasks available to execute
taskRunner.StartWorker("simple_task", examples.SimpleWorker, 1, time.Second*1)
//Add more StartWorker calls as needed

//Block
taskRunner.WaitWorkers()
```

## Task Management APIs

### Get Task Details
```go
task, err := executor.GetTask(taskId)
```

### Updating the Task result outside the worker implementation
#### Update task by id
```go
output :=  &TaskOutput{
Keys:    []string{"Key1", "Key2"},
Message: "Hello World",
Value:   rand.ExpFloat64(),
}
executor.UpdateTask(taskId, workflowInstanceId, task_result_status.COMPLETED, ouptut)
```

#### Update task by Reference Name
```go
output :=  &TaskOutput{
Keys:    []string{"Key1", "Key2"},
Message: "Hello World",
Value:   rand.ExpFloat64(),
}
executor.UpdateTaskByRefName("task_ref_name", workflowInstanceId, task_result_status.COMPLETED, ouptut)
```

### Worker Metrics
We use [Prometheus](https://prometheus.io/) to collect metrics.
When enabled the worker starts an HTTP server which is used to publish metrics, which can be hooked up to a prometheus server to scrap and collect metrics.

#### Starting metrics collection
```go
//Start a go routine.  The default settings  exposes port 2112 on /metrics endpoint
go ProvideMetrics(settings.NewDefaultMetricsSettings())
```

Worker SDK collects the following metrics:


| Name        | Purpose           | Tags  |
| ------------- |:-------------| -----|
| task_poll_error | Client error when polling for a task queue | taskType, includeRetries, status |
| task_execute_error | Execution error | taskType|
| task_update_error | Task status cannot be updated back to server  | taskType |
| task_poll_counter | Incremented each time polling is done  | taskType |
| task_poll_time | Time to poll for a batch of tasks | taskType |
| task_execute_time | Time to execute a task  | taskType |
| task_result_size | Records output payload size of a task | taskType |

Metrics on client side supplements the one collected from server in identifying the network as well as client side issues.

### Next: [Create and Execute Workflows](workflow_sdk.md)