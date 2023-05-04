# Task and Workflow Status in Conductor 

The status of the task and workflow is crucial while debugging a workflow from UI. You can look into the workflow and task status to understand the current state of the workflow to identify any potential issues or errors.

In this document, we’ll have a look through different tasks and workflow statuses in Conductor.

## Task Status

| Status | Description |
| ---------------------- | ----------------------- |
| SCHEDULED | The task has been scheduled for a worker to pick up but is not yet picked up by a worker. |
| IN_PROGRESS | The task has been picked up by a worker and is currently being executed. |
| TIMED_OUT | The task status changes to TIMED_OUT based on the following time-out parameters set while [defining the task](https://orkes.cloud/content/reference-docs/api/metadata/creating-task-definitions):<ul><li>**timeOutSeconds** - Time (in seconds), after which the task is marked as TIMED_OUT if not completed after transitioning to IN_PROGRESS status.</li><li>**pollTimeoutSeconds** - Time (in seconds), after which the task is marked as TIMED_OUT if a worker polls it, but is not completed.</li><li>**timeOutPolicy** - If this is set to TIME_OUT_WF, the task status is marked as TIMEOUT, and the task is terminated.</li></ul> **Note:** For the tasks to never timeout, configure **timeOutSeconds** & **pollTimeoutSeconds** to 0.|
| SKIPPED | The task has been skipped from execution, and the workflow continues with the succeeding tasks. <br/>You can use the [skiptask](https://orkes.io/content/reference-docs/api/workflow/skip-task-from-workflow) API to skip a task execution from a currently running workflow.|
| CANCELED | When the workflow is terminated, all the pending tasks within the workflow will be canceled.|
| FAILED_WITH_TERMINAL_ERROR | The status indicates that the task encountered a critical error and cannot be retried. <br/>In addition, you can also set this status manually from a workflow execution view in cases such as exiting early from the configured automatic retries in the task definition.|
| FAILED | The task has been encountered with an error and failed to complete. In this situation, the workflow also fails. You can [retry the workflow execution from failed tasks](https://orkes.cloud/content/developer-guides/debugging-workflows#recovering-from-failures).|
| COMPLETED_WITH_ERRORS | The status indicates that the task has some errors but is completed. <br/>One possible situation when this error can come is while defining a task definition, if the following field is set as **optional:true**, and the task fails during execution. The default value of this setting is **false**, so it needs to be explicitly set to **true** to continue the workflow even when there are errors. |
| COMPLETED | The task has been successfully completed without any errors. |

## Workflow Status

| Status | Description |
| ---------------------- | ----------------------- |
| RUNNING | The workflow is currently in progress and is not yet completed.|
| PAUSED | The workflow is paused by the user or by an external event and is waiting for a manual action to resume.|
| TIMED_OUT | The workflow status changes to TIMED_OUT when one of the tasks is timed out.|
| TERMINATED | The workflow has been terminated by a user or through [another workflow](https://orkes.io/content/reference-docs/operators/terminate-workflow).|
| FAILED | The workflow has encountered an error and has failed. You can [retry the workflow execution from a failed task](https://orkes.cloud/content/developer-guides/debugging-workflows#recovering-from-failures).|
| COMPLETED | All the tasks within the workflow are completed, and hence the workflow is completed successfully. |