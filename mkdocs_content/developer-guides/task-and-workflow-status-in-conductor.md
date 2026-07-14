---
title: "Workflow and Task Status"
description: "Learn the workflow and task statuses in Orkes Conductor and how they represent execution states such as RUNNING, COMPLETED, FAILED."
canonical_route: "developer-guides/task-and-workflow-status-in-conductor"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# Workflow and Task Status

The workflow and task statuses are crucial to understanding the execution mechanism in Conductor. You can check a workflow execution’s current status and task status [from the Conductor UI](/content/developer-guides/debugging-workflows#inspecting-a-workflow-execution) or [using API](/content/reference-docs/api/workflow/search-workflow-executions).

## Workflow status

Once started, a workflow execution will either be in an ongoing or terminal status.

| Status | Description |
| --------------------------------- | --------------------------------- |
| RUNNING | The workflow is in progress. |
| PAUSED | The workflow is paused by a user or an external event and is awaiting a manual action to resume. |
| COMPLETED | Terminal status where all the tasks in the workflow are completed. |
| TIMED_OUT | Terminal status where the workflow's configured `timeoutSeconds` has elapsed, or a task with `timeoutPolicy: TIME_OUT_WF` has timed out. |
| TERMINATED | Terminal status where an incomplete workflow has been terminated by a user, event, or another workflow. |
| FAILED | Terminal status where the workflow has encountered an error and failed. You can [retry the workflow execution from the failed task](debugging-workflows#recovering-from-failures). |

## Task state transitions

During a workflow execution, each task will go through the state transitions illustrated in the figure below. 

<p align="center"><img src="/content/img/conceptual-guides/workflow_lifecyle-task_states.png" alt="Task state transitions in Conductor." width="100%" height="auto"></img></p>

### Task status
Each task will be in a scheduled, ongoing, or terminal status.

| Status | Description |
| --------------------------------- | --------------------------------- |
| SCHEDULED | The task has been scheduled to be picked up by a worker. |
| IN_PROGRESS | The task is being executed by a worker. | 
| SKIPPED | The task is skipped without executing, and the workflow continues to the subsequent tasks. <br/><br/> Occurs if the [Skip Task API](/content/reference-docs/api/workflow/skip-task-from-workflow) is used in a currently running workflow. |
| TIMED_OUT | The task times out without being completed. <br/><br/> Occurs if the task has been configured with the following timeout parameters in its task definition: <ul><li>timeoutPolicy.</li><li>timeoutSeconds</li><li>pollTimeoutSeconds</li><li>responseTimeoutSeconds</li></ul> |
| CANCELED | The scheduled task has been canceled without being completed because the workflow has been terminated. |
| FAILED | The task failed to complete due to an error, and the workflow can be [retried from the failed task](debugging-workflows#recovering-from-failures). |
| FAILED_WITH_TERMINAL_ERROR | The task failed to complete due to an error and cannot be retried. |
| COMPLETED_WITH_ERRORS | The task has encountered errors but is still completed. <br/><br/> Occurs only when a task is set as optional in the workflow definition and fails during execution. The workflow will continue even when there are errors.  |
| COMPLETED | The task has been successfully completed without any errors. |
