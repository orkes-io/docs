import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Debugging Workflows

Orkes Conductor provides a visual representation of workflows that aids in quickly troubleshooting issues. The Conductor UI allows users to inspect workflow executions, facilitating rapid identification and resolution of problems.

## Searching and Viewing Workflow Executions​

All workflow executions are listed on the **Executions > Workflow** page. By default, users can only view executions of permitted workflows.

<p align="center"><img src="/content/img/workflow-executions.png" alt="Workflow Executions page" width="90%"
                       height="auto"/></p>

The workflow execution data can be filtered by searching through workflow name, workflow ID, correlation ID, idempotency key, status, time period, and free text search. Turn on **SQL format** to view the workflow execution data in SQL format.

Additionally, you can view the workflow execution as code directly from the UI by clicking the arrow in the Search button and selecting **Show as code**. 

<p align="center"><img src="/content/img/show-as-code-in-workflow-search.png" alt="Show as code option in Workflow Search" width="90%"
                       height="auto"/></p>

This would show the workflow search data in different codes. You can get the workflow search data in cURL and JavaScript formats.


<p align="center"><img src="/content/img/workflow-search-in-code.png" alt="Workflow search data in code" width="90%"
                       height="auto"/></p>

:::note
Partial searches using wildcards `*` are supported for workflow names. For example, searching for **test*** will display all workflows with names containing "test".

<p align="center"><img src="/content/img/workflow-partial-search.png" alt="Workflow search with wildcard support"
                       width="90%" height="auto"/></p>
:::

### Viewing Individual Workflow Execution

Click on a specific execution to view detailed information. A sample execution looks like this:

<p align="center"><img src="/content/img/sample-workflow-execution.png" alt="Sample Workflow Executions page"
                       width="90%" height="auto"/></p>

The page consists of the following sub-tabs:

* **Diagram** - Visual representation of the workflow's status; tasks are color-coded (green for successful, red for failed, orange for completed with errors).
* **Task List** - Details of tasks within the workflow.
* **Timeline** -  Chronological timeline of task execution times, with zoom functionality for accuracy.
* **Summary** - Includes key details such as workflow ID, status, version, start/end time, and duration.
* **Workflow Input/Output** - Lists inputs and outputs of the workflow.
* **JSON** - Complete JSON representation of the workflow.
* **Variables** - Displays variables passed using the set variable task.
* **Task-to-Domain** - Mapping of tasks to domains used in the workflow execution.

Each of these tabs gives the details that can help debug workflow issues.

## Debugging Executions

The **Diagram** tab on the workflow execution page visually represents task statuses:

<p align="center"><img src="/content/img/types-of-errors.png" alt="Different types of errors in a failed workflow"
                       width="80%" height="auto"/></p>

* Green: Successful tasks
* Red: Failed tasks
* Orange: Tasks completed with errors


:::tip
A task ends up with the status “Completed with Errors” only when it is marked as __optional:true__ in the workflow definition. The default value of this setting is false, so it needs to be explicitly set to continue the workflow even when there are errors.
:::


Clicking on the failed task gives the failure details. The following fields are helpful in debugging:

| Field | Description | 
| -- | -- |
| Summary > Reason for Incompletion | This field displays the reason for task incompletion. It can capture details such as exceptions thrown by the worker, task-related exceptions such as failed to invoke HTTP endpoints, etc. |
| Summary > Worker | This field shows the worker instance that polled the task. It can help dig logs if not captured by the Conductor. |
| Input | You can verify if the task inputs were computed and provided correctly. |
| Output | You can verify the task’s output details here. If the task’s output is supplied as the next task’s input, such details can be verified from here. | 
| Logs | You can get the logs from this tab if the task supplies logs. |
| Attempt | If your task was retried, you can see all the attempts and corresponding details here. |

Here is a screen grab of the fields referred above.

<p align="center"><img src="/content/img/failure-reasons-of-task.png" alt="Failure reasons for the task" width="100%" height="auto"></img></p>

## Recovering From Failures​

Once the issues regarding the workflow execution failure are resolved, you can retry the failed workflows. The **Actions** button towards the top-right corner of the execution page provides the following options:

<p align="center"><img src="/content/img/workflow-recovery.png" alt="Workflow Recovery Options" width="80%" height="auto"></img></p>

| Action | Description                                                                                                                                                                                                                                                     |
| ------ |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Terminate | Terminates the workflow and changes the workflow status to **TERMINATED**.                                                                                                                                                                                      |
| Restart with current definitions | Restart the workflow from the beginning using the same version of the workflow definition that originally ran this execution. This is useful if the workflow definition has changed and you want to retain this instance of the original version.                |
| Restart with latest definitions | Restart this workflow from the beginning using the latest definition of the workflow. If you've made changes to the definition, you could use this option to re-run the flow with the latest version.                                                             |
| Retry - from failed task | Retries the workflow from the failed task.                                                                                                                                                                                                                      |
| Re-run Workflow | Clicking on this takes to the **Run Workflow** page, where you can rerun the workflow. While running, you can change the workflow input parameters, idempotency key, correlation ID, and task to domain mapping.                |                                      

:::tip
Check out the documentation on native [retry and error handling](https://orkes.io/content/error-handling) features, which enable tasks to be automatically retried in the event of transient failures.
:::