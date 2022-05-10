# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-go` repository provides the client SDKs to build Task Workers in Go

## Quick Start

1. [Setup conductor-go package](#Setup-conductor-go-package)
2. [Run workers](#Run-workers)
3. [Configuration](#Configuration)

### Setup conductor go package

Create a folder to build your package:
```shell
mkdir conductor-go/
cd conductor-go/
```

Create a go.mod file for dependencies
```go
module conductor_test

go 1.18

require (
	github.com/conductor-sdk/conductor-go v1.1.1
)
```

Now, create simple worker implentation
```go
package main

import (
	"github.com/conductor-sdk/conductor-go/pkg/http_model"
	"github.com/conductor-sdk/conductor-go/pkg/model"
	"github.com/conductor-sdk/conductor-go/pkg/model/enum/task_result_status"
	"github.com/conductor-sdk/conductor-go/pkg/settings"
	"github.com/conductor-sdk/conductor-go/pkg/worker"
	log "github.com/sirupsen/logrus"
	"os"
)

func init() {
	log.SetFormatter(&log.JSONFormatter{})
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func Worker(t *http_model.Task) (taskResult *http_model.TaskResult, err error) {
	taskResult = model.GetTaskResultFromTask(t)
	taskResult.OutputData = map[string]interface{}{
		"task": "task_1",
		"key3": 3,
		"key4": false,
	}
	taskResult.Status = task_result_status.COMPLETED
	err = nil
	return taskResult, err
}

func main() {
	taskRunner := worker.NewTaskRunner(
		settings.NewAuthenticationSettings(
			__KEY__,
			__SECRET__,
		),
		settings.NewHttpSettings(
			"https://play.orkes.io",
		),
	)

	taskRunner.StartWorker(
		"go_task_example",
		Worker,
		2,
		10,
	)

	taskRunner.WaitWorkers()
}

```

Install dependencies.  This will download all the required dependencies 
```shell
go get
```
**Note:**
Replace `KEY` and `SECRET` by obtaining a new key and secret from Orkes Playground as described [Generating Access Keys for Programmatic Access](https://orkes.io/content/docs/getting-started/concepts/access-control#access-keys) 


### Run workers
Start the workers by running `go run`
```shell
go run main.go
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
)
```

### Worker Settings

You can create a new worker by calling `workerOrkestrator.StartWorker` with:
* taskType : Task definition name (e.g `"go_task_example"`)
* executeFunction : Task Execution Function (e.g. `example.TaskExecuteFunctionExample1` from `example` folder)
* threadCount : Amount of Go routines to be executed in parallel for new worker (e.g. `1`, single thread)
* pollIntervalInMillis : Amount of ms to wait between polling for task

```go
taskRunner.StartWorker(
	"go_task_example",              // task definition name
	Worker, // task execution function
	1,                              // thread count
	1000,                           // polling interval in milli-seconds
)
```
### Start a workflow using APIs
```go

apiClient := conductor_http_client.NewAPIClient(
    settings.NewAuthenticationSettings(
        KEY,
        SECRET,
    ),
    settings.NewHttpSettings(
        "https://play.orkes.io",
    ),
)

workflowClient := *&conductor_http_client.WorkflowResourceApiService{
    APIClient: apiClient,
}
workflowId, _, _ := workflowClient.StartWorkflow(
    context.Background(),
    map[string]interface{}{},
    "PopulationMinMax",
    &conductor_http_client.WorkflowResourceApiStartWorkflowOpts{},
)
log.Info("Workflow Id is ", workflowId)
	
```
