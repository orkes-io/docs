conductor-csharp

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
                    services.AddConductorWorker((config) =>
                    {
                        config.ServerUrl = new Uri("http://localhost:8080/api/");
                    });
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

            await workflowTaskCoordinator.Start();
        }
    }

    internal class MyWorkflowTask : IWorkflowTask
    {
        public MyWorkflowTask(){}

        public string TaskType => "my_task";
        public int? Priority => null;

        public async Task<TaskResult> Execute(Conductor.Client.Models.Task task, CancellationToken token)
        {
            var newOutput = new
            {
                Executed = (task.OutputData["executed"] as int? ?? 0) + 1
            };

            if(newOutput.Executed < 10)
            {
                return task.InProgress(
                            log: "Task is still in progress.",
                            callbackAfterSeconds: 2,
                            outputData: task.OutputData.MergeValues(newOutput)
                        );
            }

            return task.Completed(task.OutputData.MergeValues(newOutput));
        }
    }
}
```
