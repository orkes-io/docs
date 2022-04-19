# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-go` repository provides the client SDKs to build Task Workers in Go

## Quick Start

1. [Setup conductor-go package](#Setup-conductor-go-package)
1. [Write worker as a function](#Write-worker-as-a-function)
1. [Run workers](#Run-workers)
1. [Configuration](#Configuration)

### Setup-conductor-go-package

Create a folder to build your package:
```shell
$ mkdir conductor-go/
$ cd conductor-go/
```

Create a `go.mod` file inside this folder, with this content:
```
module conductor_test

go 1.18

require (
	github.com/conductor-sdk/conductor-go v1.0.8
)
```

Now you may be able to create your workers and main function.

### Write worker as a function
You can download [this code](examples/task_execute_function/task_execute_function.go) into the repository folder with:
```shell
$ wget "https://github.com/conductor-sdk/conductor-go/blob/main/examples/task_execute_function/task_execute_function.go"
```

### Run workers
You can download [this code](examples/main/main.go) into the repository folder with:
```shell
$ wget "https://github.com/conductor-sdk/conductor-go/blob/main/examples/main/main.go"
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

### Authentication settings (optional)
Use if your conductor server requires authentication
* keyId: Key
* keySecret: Secret for the Key

```go
authenticationSettings := settings.NewAuthenticationSettings(
    "keyId",
    "keySecret",
),
```

### External Storage Settings (optional)
Use if you would like to upload large payload at an external storage
You may define max payload size and threshold for uploading, also with a function capable of returning the path where it is stored.

```go
externalStorageSettings := settings.NewExternalStorageSettings(
	4,  // taskOutputPayloadThresholdKB
	10, // taskOutputMaxPayloadThresholdKB
	external_storage_handler.UploadAndGetPath, // External Storage Handler function
),
```

### HTTP Settings (optional)

* baseUrl: Conductor server address. e.g. http://localhost:8000 if running locally

```go
httpSettings := settings.NewHttpSettings(
    "https://play.orkes.io/api",
	externalStorageSettings,
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
	"go_task_example",              // task definition name
	task_execute_function.Example1, // task execution function
	1,                              // parallel go routines amount
	5000,                           // 5000ms
)
```
