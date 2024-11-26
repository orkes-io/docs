---
slug: "/developer-guides/workflow-version-behavior-on-execution"
description: "Find out how workflow versions intersect with current and new executions."
---

# Workflow Versions at Runtime

The Conductor [workflow can be versioned](https://orkes.io/content/faqs/workflow-versioning), which means you can have multiple versions of the same workflow. 

This document discusses the behavioral pattern of how the workflow version works while the workflow is running. 

## Workflow Versions: General Behavior

**When a workflow is run, each execution is run based on the snapshot of the workflow version at the execution time.**

While running a workflow, there is an option to choose the workflow version. If a version is not selected, it will always run the **latest** version. You can safely add a newer workflow version, and the subsequent execution will pick this newer version. If you want to trigger an older version, you must explicitly run the specific version.

To get a better understanding, let’s have a look at the following illustration:

<p align="center"><img src="/content/img/workflow-version-general-behavior.png" alt="General Behavior of Workflow Version" width="100%"
                       height="auto"/></p>

Suppose a workflow with version V1 is executed at timestamp T1. It will run the workflow definition at that time.

If the workflow definition is updated but with the same version V1:

- In this case, all the previously running executions will run based on the timestamp T1 itself.
- Any new execution with version V1 would run at the latest timestamp, i.e., in this example, at T3. 

If the workflow version is changed to V2:
- On rerunning the workflow (say at T2), it runs based on the latest version V2. 

## Upgrading running workflows to latest definitions

### Conductor UI Method

Any changes to the definition won’t impact if the execution is already running. However, if you want to run the latest version, you can terminate the currently running execution and then use the option to restart with the latest definition. 

<p align="center"><img src="/content/img/step-1-terminate-workflow.png" alt="Step 1 - Terminate the running workflow" width="100%"
                       height="auto"/></p>

<p align="center"><img src="/content/img/step-2-restart-with-latest-definitions.png" alt="Step 1 - Restart with Latest Definitions" width="100%"
                       height="auto"/></p>

In this case, to be consistent with your business flow, you can leverage the [skip task API](https://orkes.io/content/reference-docs/api/workflow/skip-task-from-workflow) to skip the task execution that was already completed.

### API Method

You can use the [workflow upgrade API](/content/reference-docs/api/workflow/upgrade-workflow) to upgrade the running workflow to another version.

### SDKs 

#### C#

Get the complete GitHub project [here](https://github.com/conductor-sdk/conductor-example-csharp-workflow-upgrade). 

In **WorkflowMigration.cs** file, 

```csharp
using Conductor.Api;
using Conductor.Client;
using Conductor.Client.Models;
using static Conductor.Client.Models.TaskResult;
using Conductor.Client.Authentication;

class WorkflowMigration
{

    private static Configuration configuration = new Configuration()
    {
        BasePath = "conductor_url",
        AuthenticationSettings = new OrkesAuthenticationSettings("keyId", "keySecret")
    };

    public static void Main(string[] args)
    {

        string workflowId = args[0];
        string workflowName = args[1];
        int workflowVersion = args[2] != null ? int.Parse(args[2]) : 0;

        // This is the map of new task ref names to expected output.
        var dictionary = args[3].Select(a => a.ToString().Split('='))
                     .ToDictionary(a => a[0], a => a.Length == 2 ? a[1] : null);

        WorkflowResourceApi workflowResourceApi = new WorkflowResourceApi(configuration);
        TaskResourceApi taskResourceApi = new TaskResourceApi(configuration);

        Dictionary<string, Conductor.Client.Models.Task> oldWorkflowTaskMapping = new Dictionary<string, Conductor.Client.Models.Task>();
        HashSet<string> taskNames = new HashSet<string>();

        Workflow workflow = workflowResourceApi.GetExecutionStatus(workflowId, true);
        workflow.Tasks.ForEach(task =>
        {
            if (task.TaskType.Equals(task.ReferenceTaskName) && task.Status.Equals(Conductor.Client.Models.Task.StatusEnum.COMPLETED))
            {
                taskNames.Add(task.ReferenceTaskName);
                oldWorkflowTaskMapping[task.ReferenceTaskName] = task;
            }
        });

        StartWorkflowRequest startWorkflowRequest = new StartWorkflowRequest(name: workflowName, version: workflowVersion == 0 ? null : workflowVersion);

        Dictionary<string, object> input = new Dictionary<string, object>();
        input["_rerunFromWorkflowId"] = workflowId;

        startWorkflowRequest.Input = input;
        Dictionary<string, string> domain = new Dictionary<string, string>();
        taskNames.ToList().ForEach(taskName =>
        {
            domain[taskName] = System.Guid.NewGuid().ToString();
        });
        startWorkflowRequest.TaskToDomain = domain;
        string newWorkflowId = workflowResourceApi.StartWorkflow(startWorkflowRequest);

        workflowResourceApi.Terminate(workflowId, "Terminated because of migration. A new workflow " + newWorkflowId +" has been started");

        Workflow newWorkflow = workflowResourceApi.GetExecutionStatus(newWorkflowId, true);

        while(!newWorkflow.Status.Equals(WorkflowStatus.StatusEnum.COMPLETED))
        {
            newWorkflow = workflowResourceApi.GetExecutionStatus(newWorkflowId, true);
            List<Conductor.Client.Models.Task> inProgressTask = newWorkflow.Tasks.FindAll(task =>
                                                                                        task.Status.Equals(Conductor.Client.Models.Task.StatusEnum.INPROGRESS) ||
                                                                                        task.Status.Equals(Conductor.Client.Models.Task.StatusEnum.SCHEDULED));
            inProgressTask.ForEach(task =>
            {
                if (oldWorkflowTaskMapping.ContainsKey(task.ReferenceTaskName))
                {
                    TaskResult taskResult = new TaskResult(taskId: task.TaskId, workflowInstanceId: task.WorkflowInstanceId);
                    taskResult.Status = StatusEnum.COMPLETED;
                    taskResult.OutputData = oldWorkflowTaskMapping[task.ReferenceTaskName].OutputData;
                    taskResult.TaskId = task.TaskId;
                    taskResourceApi.UpdateTask(taskResult);
                    Console.WriteLine("Task " + task.ReferenceTaskName + " from the workflowId " + newWorkflowId + " has been marked Completed ");
                } else if (dictionary.ContainsKey(task.ReferenceTaskName))
                {
                    TaskResult taskResult = new TaskResult(taskId: task.TaskId, workflowInstanceId: task.WorkflowInstanceId);
                    taskResult.Status = StatusEnum.COMPLETED;
                    Dictionary<string, object> output = new Dictionary<string, object>();
                    output["migration_output"] = dictionary[task.ReferenceTaskName] ?? "no_output";
                    taskResult.OutputData = output;
                    taskResult.TaskId = task.TaskId;
                    taskResourceApi.UpdateTask(taskResult);
                    Console.WriteLine("Task " + task.ReferenceTaskName + " from the workflowId " + newWorkflowId + " has been marked Completed ");
                } else
                {
                    throw new Exception("Task " + task.ReferenceTaskName + " output not provided");
                }
            });
            newWorkflow = workflowResourceApi.GetExecutionStatus(newWorkflowId, true);
        }
        Console.WriteLine("Workflow workflowId " + newWorkflowId + " Completed Successfully");
    }
}
```

- Build your project and replace **conductor_url** with your Conductor server URL.
- From your Conductor server, create an application & generate the [keyId & keySecret](https://orkes.io/content/access-control-and-security/applications#generating-access-keys) & replace the parameters in the above code. 
- Provide [explicit permissions for the application](https://orkes.io/content/access-control-and-security/applications#adding-permissions) to terminate (DELETE) & trigger (EXECUTE) the required workflows. 
- Run the command line argument in the following order:
    - workflowId - Provide the workflowId of the currently running workflow
    - workflowName - Provide the name of the workflow to be run as a replacement
    - workflowVersion - The workflow version of the replacement workflow
    - Map of task_ref_name to output - Provide the map of task_Ref_name, which was newly added and might not be present in the old workflow definition
