conductor-csharp
# Netflix Conductor Client SDK

To find out more about Conductor visit: [https://github.com/Netflix/conductor](https://github.com/Netflix/conductor)

`conductor-csharp` repository provides the client SDKs to build Task Workers and Clients in C#

## Quick Start
1. [Get Secrets](#Get-Secrets)
2. [Write workers](#Write-workers)
3. [Run workers](#Run-workers)
4. [Worker Configurations](#Worker-Configurations)
5. [Starting workflow](#Starting-workflow)

### Get Secrets
Executing workflow or polling a task from a playground requires keyId and keySecret.
Please follow [guide](https://orkes.io/content/docs/codelab/helloworld#application-permissions) to provision one for your application.

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
1. Search for package called conductor-csharp in microsoft nuget package manager and install it as dependencies. If you are planning to run worker then
Microsoft.Extensions.Hosting is also required.
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
using Conductor.Client;
using System.Collections.Concurrent;

namespace TestOrkesSDK
{
    class Program
    {
        static void Main(string[] args)
        {
            new HostBuilder()
                 .ConfigureServices((ctx, services) =>
                 {
                    // First argument is optional headers which client wasnt to pass.
                     Configuration configuration = new Configuration(new ConcurrentDictionary<string, string>(), 
                         "keyId",
                         "keySecret");
                     services.AddConductorWorker(configuration);
                     services.AddConductorWorkflowTask<MyWorkflowTask>();
                     services.AddHostedService<WorkflowsWorkerService>();
                 })
                 .ConfigureLogging(logging =>
                 {
                     logging.SetMinimumLevel(LogLevel.Debug);
                     logging.AddConsole();
                 })
                 .RunConsoleAsync();
            Console.ReadLine();
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

    internal class MyWorkflowTask : IWorkflowTask
    {
        public MyWorkflowTask() { }

        public string TaskType => "my_ctask";
        public int? Priority => null;

        public async Task<TaskResult> Execute(Conductor.Client.Models.Task task, CancellationToken token)
        {
            Dictionary<string, object> newOutput = new Dictionary<string, object>();
            newOutput.Add("output", 1);
            return task.Completed(task.OutputData.MergeValues(newOutput));
        }
    }
}
```
Save above code with workers code in Program.cs and run it using consoleApplication.
Alternatively it can also be hosted as windows service.

### Worker Configurations
Worker configuration is handled via Configuraiton object passed when initializing TaskHandler

### Starting workflow
Below is the code snippet in order to register and start the workflow,
```
IDictionary<string, string> optionalHeaders = new ConcurrentDictionary<string, string>();
Configuration configuration = new Configuration(optionalHeaders, "keyId", "keySecret");

//Create task definition
MetadataResourceApi metadataResourceApi = new MetadataResourceApi(configuration);
TaskDef taskDef = new TaskDef(name: "test_task");
taskDef.OwnerEmail = "test@test.com";
metadataResourceApi.RegisterTaskDef(new List<TaskDef>() { taskDef});

//Create workflow definition
WorkflowDef workflowDef = new WorkflowDef();
workflowDef.Name = "test_workflow";
workflowDef.OwnerEmail = "test@test.com";
workflowDef.SchemaVersion = 2;

WorkflowTask workflowTask = new WorkflowTask();
workflowTask.Type = "HTTP";
workflowTask.Name = "test_"; //Same as registered task definition.
IDictionary<string, string> requestParams = new Dictionary<string, string>();
requestParams.Add("uri", "https://www.google.com"); //adding a key/value using the Add() method
requestParams.Add("method", "GET");
Dictionary<string, object> request = new Dictionary<string, object>();
request.Add("http_request", requestParams);
workflowTask.InputParameters = request;
workflowDef.Tasks = new List<WorkflowTask>() { workflowTask };
//Run a workflow
WorkflowResourceApi workflowResourceApi = new WorkflowResourceApi(configuration);
Dictionary<string, Object> input = new Dictionary<string, Object>();
//Fill the input map which workflow consumes.
workflowResourceApi.StartWorkflow("test_workflow", input, 1);
Console.ReadLine();
```
Please go through Conductor.Api package to find out supported apis


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