conductor-csharp
# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-csharp` repository provides the client SDKs to build Task Workers in C#

## Quick Start

1. [Write workers](#Write-workers)
2. [Run workers](#Run-workers)
3. [Worker Configurations](#Worker-Configurations)


### Write workers  

```
 internal class MyWorkflowTask : IWorkflowTask
    {
        public MyWorkflowTask(){}

        public string TaskType => "test_ctask";
        public int? Priority => null;

        public async Task<TaskResult> Execute(Conductor.Client.Models.Task task, CancellationToken token)
        {
           Dictionary<string, object> newOutput = new Dictionary<string, object>();
           newOutput.Add("output", "1");
           return task.Completed(task.OutputData.MergeValues(newOutput));
        }
    }

 internal class MyWorkflowTask2 : IWorkflowTask
    {
        public MyWorkflowTask2(){}

        public string TaskType => "test_ctask2";
        public int? Priority => null;

        public async Task<TaskResult> Execute(Conductor.Client.Models.Task task, CancellationToken token)
        {
           Dictionary<string, object> newOutput = new Dictionary<string, object>();
           //Reuse the existing code written in C#
           newOutput.Add("output", "success");
           return task.Completed(task.OutputData.MergeValues(newOutput));
        }
    }
```

### Run workers
Create main method that does the following:
1. Adds configurations such as metrics, authentication, thread count, Conductor server URL
2. Add your workers
3. Start the workers to poll for work
```
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Conductor.Client.Models;
using Conductor.Client.Extensions;
using Conductor.Client.Interfaces;

using Task = System.Threading.Tasks.Task;

namespace SimpleConductorWorker
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await new HostBuilder()
                .ConfigureServices((ctx, services) =>
                {
                    # Conductor server url
                    services.AddConductorWorker((config) =>
                    {
                        config.ServerUrl = new Uri("http://localhost:8080/api/");
                    });
                    # Optionally, if you are using Conductor server that requires authentication,  setup key_id and secret
                    config.AuthenticationClient = new Conductor.Client.AuthenticationClient()
                    {
                        keyId = "key",
                        keySecret = "secret"
                    };
                    services.AddConductorWorkflowTask<MyWorkflowTask>();
                    services.AddHostedService<WorkflowsWorkerService>();
                })
                .ConfigureLogging(logging =>
                {
                    logging.SetMinimumLevel(LogLevel.Debug);
                    logging.AddConsole();
                })
                .RunConsoleAsync();
        }
    }

    internal class WorkflowsWorkerService : BackgroundService
    {
        private readonly IWorkflowTaskCoordinator workflowTaskCoordinator;
        private readonly IEnumerable<IWorkflowTask> workflowTasks;

        public WorkflowsWorkerService(
            IWorkflowTaskCoordinator workflowTaskCoordinator,
            IEnumerable<IWorkflowTask> workflowTasks
        )
        {
            this.workflowTaskCoordinator = workflowTaskCoordinator;
            this.workflowTasks = workflowTasks;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            foreach (var worker in workflowTasks)
            {
                workflowTaskCoordinator.RegisterWorker(worker);
            }
            # start all the workers so that it can poll for the tasks
            await workflowTaskCoordinator.Start();
        }
    }
}
```
Save above code with workers code in Program.cs and run it using consoleApplication.
Alternatively it can also be hosted as windows service.

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
```
Run above program as console app or windows service
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
    "name": "test_ctask",
    "description": "C# task example",
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
    "name": "workflow_with_csharp_task_example",
    "description": "Workflow with C# Task example",
    "version": 1,
    "tasks": [
      {
        "name": "test_ctask",
        "taskReferenceName": "test_ctask",
        "inputParameters": {},
        "type": "SIMPLE"
      }
    ],
    "inputParameters": [],
    "outputParameters": {
      "workerOutput": "${test_ctask.output}"
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
  'http://localhost:8080/api/workflow/workflow_with_csharp_task_example?priority=0' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{}'
```