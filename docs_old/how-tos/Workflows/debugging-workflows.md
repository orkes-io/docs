---
sidebar_position: 1
---

# Troubleshooting Workflows

Conductor UI is a tool that we can leverage for troubleshooting issues with workflows. Refer to the following articles to search and view
your workflow execution.

1. [Searching Workflows](/content/docs/how-tos/Workflows/searching-workflows)
2. [View Workflow Executions](/content/docs/how-tos/Workflows/view-workflow-executions)

## Debugging Executions

Open a workflow execution to see the diagram of the workflow.  Successful tasks appear in green.  

If a task in the workflow has failed, its color in the diagram will be red. Clicking on the task will give more details as to why the task failed.

The following fields are useful in debugging:

|Field Name|Description|
|---|---|
| Task Detail > Summary > Reason for Incompletion | If an exception were thrown by the worker, it would be captured and displayed here|
| Task Detail > Summary > Worker | The worker instance is where this failure last occurred. Useful to dig for detailed logs if not already captured by Conductor|
| Task Detail > Input | Verify if the task inputs were computed and provided correctly to the task|
| Task Detail > Output | If the output of a previous task is used as an input to your next task, refer here for what was produced|
| Task Detail > Logs | If your task is supplying logs, we could look at that here|
| Task Detail > Retried Task - Select an instance | If your task was retried, we could see all the attempts and corresponding details here|

Note: We can also access the task list from **Tasks > Task List** tab.

Here is a screen grab of the fields referred above.

![Debugging Wowkflow Execution](/img/tutorial/workflow_debugging.png)

## Recovering From Failures

Once we have resolved the underlying issue of workflow execution failure, we might want to replay or retry failed
workflows. The UI has functions that would allow us to do this:

The **Actions** button provides the following options:

|Action Name|Description|
|---|---|
| Restart with Current Definitions | Restart this workflow from the beginning using the same version of the workflow definition that originally ran this workflow execution. This is useful if the workflow definition has changed and we want to retain this instance in the original version|
| Restart with Latest Definitions | Restart this workflow from the beginning using the latest definition of the workflow. If we made changes to the definition, we could use this option to re-run this flow with the latest version| 
| Retry - From failed task | Retry this workflow from the failed task| 

<br/>

> **Note:** Conductor configurations allow your tasks to be retried automatically for transient failures.
> Refer to the task configuration options on how to leverage this.  
