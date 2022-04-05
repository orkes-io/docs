# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-go` repository provides the client SDKs to build Task Workers in Go

## Quick Start

1. [Write worker as a function](#Write-worker-as-a-function)
2. [Run workers](#Run-workers)
3. [Configuration](#Configuration)



### Write worker as a function

```go
package example

import (
	"github.com/netflix/conductor/client/go/conductor_client/model"
	"github.com/netflix/conductor/client/go/conductor_client/model/enum/task_result_status"
	log "github.com/sirupsen/logrus"
)

func TaskExecuteFunctionExample(t *model.Task) (taskResult *model.TaskResult, err error) {
	log.Debug("Executing Task_Execution_Function_Example for", t.TaskType)
	taskResult = model.NewTaskResult(t)
	taskResult.OutputData = map[string]interface{}{
		"task": "task_1",
		"key2": "value2",
		"key3": 3,
		"key4": false,
	}
	taskResult.Logs = append(taskResult.Logs, model.LogMessage{Log: "Hello World"})
	taskResult.Status = task_result_status.COMPLETED
	err = nil
	return taskResult, err
}
```
### Run workers
Create main method that does the following:
1. Adds configurations such as metrics, authentication, thread count, Conductor server URL
2. Add your workers
3. Start the workers to poll for work

You can copy this code and put into `main.go` file

```go
package main

import (
	"os"

	"github.com/netflix/conductor/client/go/example/task_execute_function"
	"github.com/netflix/conductor/client/go/metrics"
	"github.com/netflix/conductor/client/go/orkestrator"
	"github.com/netflix/conductor/client/go/settings"
	log "github.com/sirupsen/logrus"
)

// Example init function that shows how to configure logging
// Using json formatter and changing level to Debug
func init() {
	// Log as JSON instead of the default ASCII formatter.
	log.SetFormatter(&log.JSONFormatter{})
	//Stdout, change to a file for production use case
	log.SetOutput(os.Stdout)
	// Set to debug for demonstration.  Change to Info for production use cases.
	log.SetLevel(log.DebugLevel)
}

// Example main function to start workers
func main() {
	// MetricsSettings is optional,
	// could be nil instead and use default settings
	go metrics.ProvideMetrics(
		settings.NewMetricsSettings(
			"/metrics", // api endpoint
			2112,       // port
		),
	)
	// AuthenticationSettings and HttpSettings are optional,
	// could be nil instead and use default settings
	workerOrkestrator := orkestrator.NewWorkerOrkestrator(
		settings.NewAuthenticationSettings(
			"keyId",     // key id from your application
			"keySecret", // key secret from your application
		),
		settings.NewHttpSettings(
			"https://play.orkes.io/api", // conductor http server url
		),
	)
	workerOrkestrator.StartWorker(
		"go_task_example",              // task definition name
		task_execute_function.Example1, // task execution function
		1,                              // parallel go routines amount
		5000,                           // 5000ms
	)
	workerOrkestrator.StartWorker(
		"go_task_example",              // task definition name
		task_execute_function.Example2, // task execution function
		1,                              // parallel go routines amount
		100,                            // 100ms
	)
	// Wait for all workers to finish, otherwise would terminate them
	workerOrkestrator.WaitWorkers()
}
```

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
go ./main.go
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
    "name": "go_task_example",
    "description": "Go task example",
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
    "name": "workflow_with_go_task_example",
    "description": "Workflow with Go Task example",
    "version": 1,
    "tasks": [
      {
        "name": "go_task_example",
        "taskReferenceName": "go_task_example_ref_1",
        "inputParameters": {},
        "type": "SIMPLE"
      }
    ],
    "inputParameters": [],
    "outputParameters": {
      "workerOutput": "${go_task_example_ref_1.output}"
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
  'http://localhost:8080/api/workflow/workflow_with_go_task_example?priority=0' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{}'
```


## Configuration

### Authentication settings
Use if your conductor server requires authentication
* keyId: Key
* keySecret: Secret for the Key

```go
authenticationSettings := settings.NewAuthenticationSettings(
    "keyId",
    "keySecret",
),
```

### HTTP Settings

* baseUrl: Conductor server address. e.g. http://localhost:8000 if running locally

```go
httpSettings := settings.NewHttpSettings(
    "https://play.orkes.io/api",
)
```

### Metrics Settings
Conductor uses [Prometheus](https://prometheus.io/) to collect metrics.

* apiEndpoint : Address to serve metrics (e.g. `/metrics`)
* port : Port to serve metrics (e.g. `2112`)

With this configuration, you can access metrics via `http://localhost:2112/metrics` after exposing them with:

```go
metricsSettings := settings.NewMetricsSettings(
    "/metrics",
    2112,
)

go metrics.ProvideMetrics(metricsSettings)
```

### Worker Settings

You can create a new worker by calling `workerOrkestrator.StartWorker` with:
* taskType : Task definition name (e.g `"go_task_example"`)
* executeFunction : Task Execution Function (e.g. `example.TaskExecuteFunctionExample1` from `example` folder)
* parallelGoRoutinesAmount : Amount of Go routines to be executed in parallel for new worker (e.g. `1`, single thread)
* pollingInterval : Amount of ms to wait between polling for task

```go
workerOrkestrator.StartWorker(
    "go_task_example",
    example.TaskExecuteFunctionExample1,
    1,
    100,
)
```