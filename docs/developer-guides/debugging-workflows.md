import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Debugging Workflows

Orkes Conductor provides a visual representation of workflows that aids in quickly troubleshooting issues. Conductor UI provides us with the ability to look into workflow executions which helps in quickly spotting and resolving issues.

## Searching/Viewing Workflow Executions

All recent workflow executions are listed on the **Executions > Workflow** page. This view is filtered by the permissions of the user by default, i.e., users can view the execution of only the permitted workflows.

<p align="center"><img src="/content/img/workflow-executions.png" alt="Workflow Executions page" width="90%"
                       height="auto"/></p>

Data on this page can be filtered by searching through workflow name, workflow ID, correlation ID, status, time period, and past days’ executions. Click on the required execution to view the individual execution of a workflow.

In addition, you can also view the workflow execution as code directly from the UI. For this, click on the arrow in the Search button, and choose “**Show as code**”.

<p align="center"><img src="/content/img/show-as-code-in-workflow-search.png" alt="Show as code option in Workflow Search" width="90%"
                       height="auto"/></p>

This would show the workflow search data in different codes. Currently, you can get them in cURL and Javascript. 

<p align="center"><img src="/content/img/workflow-search-in-code.png" alt="Workflow search data in code" width="90%"
                       height="auto"/></p>

:::note
You can also search for workflow names by inputting partial values with wildcards (*) support. For example, if you want to search for workflow names containing “test”, then search for **test***, and it will display all the workflow definitions with **‘test’** in their name.
<p align="center"><img src="/content/img/workflow-partial-search.png" alt="Workflow search with wildcard support"
                       width="90%" height="auto"/></p>
:::

A sample execution looks like this:

<p align="center"><img src="/content/img/sample-workflow-execution.png" alt="Sample Workflow Executions page"
                       width="90%" height="auto"/></p>

The page consists of the following sub-tabs:

* **Diagram** - Shows the visual representation of the workflow. If the workflow isn’t completed/failed, the diagram indicates the same.
* **Task List** - Includes the details of the tasks within the workflow.
* **Timeline** - A timeline showing the time taken by different tasks for execution.
* **Summary** - Includes the workflow details such as workflow ID, status, version, start/end time, and duration.
* **Workflow Input/Output** - Shows the list of the inputs and outputs of the workflow.
* **JSON** - Include the complete JSON of the workflow.

Each of these tabs gives the details that can help debug workflow issues.

## Debugging Executions

The diagram tab on the workflow execution page shows the workflow diagram. All the successful tasks appear in green, failed ones appear in red, and the ones completed with errors appear in orange.

:::tip
A task ends up with the status “Completed with Errors” only when it is marked as __optional:true__ in the workflow definition. The default value of this setting is false, so it needs to be explicitly set to continue the workflow even when there are errors.
:::

<p align="center"><img src="/content/img/types-of-errors.png" alt="Different types of errors in a failed workflow"
                       width="80%" height="auto"/></p>

Clicking on the failed task gives the failure details. The following fields are helpful in debugging:

| Field | Description | 
| -- | -- |
| Summary > Reason for Incompletion | This field displays the reason for task incompletion. It can capture details such as exceptions thrown by the worker, task-related exceptions such as failed to invoke HTTP endpoints, etc. |
| Summary > Worker | This field shows the worker instance that polled the task. It can help dig logs if not captured by the Conductor. |
| Input | We can verify if the task inputs were computed and provided correctly. |
| Output | We can verify the task’s output details here. If the task’s output is supplied as the next task’s input, such details can be verified from here. | 
| Logs | We can get the logs from this tab if the task supplies logs. |
| Attempt | If your task was retried, we can see all the attempts and corresponding details here. |

Here is a screen grab of the fields referred above.

<p align="center"><img src="/content/img/failure-reasons-of-task.jpeg" alt="Failure reasons for the task" width="100%" height="auto"></img></p>

## Recovering From Failures​

Once the issues are resolved for the workflow execution failure, we might want to retry the failed workflows. The **Actions** button towards the top-right corner of the execution page provides the following options:

<p align="center"><img src="/content/img/workflow-recovery.png" alt="Workflow Recovery Options" width="80%" height="auto"></img></p>

| Action | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Terminate | Terminates the workflow and changes the workflow status to **TERMINATED**.                                                                                                                                                                                      |
| Restart with Current Definitions | Restart the workflow from the beginning using the same version of the workflow definition that originally ran this execution. This is useful if the workflow definition has changed and we want to retain this instance in the original version.                |
| Restart with Latest Definitions | Restart this workflow from the beginning using the latest definition of the workflow. If we’ve made changes to the definition, we could use this option to re-run the flow with the latest version.                                                             |
| Retry - From failed task | Retries the workflow from the failed task.                                                                                                                                                                                                                      |
| Re-run Workflow | Clicking on this takes us to the **Run Workflow** page, where we can rerun the workflow. While running, we can change the workflow input parameters and task to domain mapping.                     |                                      

:::tip
Orkes Conductor has native retry and error handling capabilities, allowing your task to be retried automatically for transient failures. 
:::