---
sidebar_position: 1
---

# Workers and Tasks

## Worker

A worker is responsible for executing a task. Operators and System tasks are handled by the Conductor server, whereas the user-defined tasks need to have a worker running in a different environment. This worker will poll the Conductor's task queue to see if any work has been scheduled by the server. If there is a scheduled task, the worker executes the task and produces the output, provided input is specified. The worker’s output is sent back to the workflow and the process continues as per the defined workflow.

Workers can be implemented in any language. Conductor's [SDKs](https://orkes.io/content/docs/how-tos/SDKs) provide support for worker frameworks that deliver features such as polling threads, metrics and server communication which aids in the worker creation process.

Each worker embodies the microservice design pattern and follows certain basic principles:

- Workers are stateless and do not implement any workflow-specific logic.
- Each worker executes a particular task and produces well-defined output given specific inputs are provided.
- Workers are meant to be idempotent (Or should be able to handle cases where the partially executed tasks get rescheduled due to timeouts).
- Workers do not implement the logic to handle retries etc, which the Conductor server takes care of.

## Tasks

Tasks are the building blocks of a workflow in Conductor. A task can be an [operator](https://orkes.io/content/docs/getting-started/concepts/operators), [system task](https://orkes.io/content/docs/getting-started/concepts/system-tasks)
or custom code [Worker](https://orkes.io/content/docs/how-tos/Workers/write-workers) written in **any** programming language. A typical Conductor workflow is a list of tasks that are executed until completion or the termination of the workflow.

Before being implemented in the workflow, you must register all tasks with the Conductor. You can also reuse a task within multiple workflows. You can begin with [creating tasks](https://orkes.io/content/docs/how-tos/Tasks/creating-tasks), and at a later point, you have the provision to [update](https://orkes.io/content/docs/how-tos/Tasks/updating-tasks)/[reuse](https://orkes.io/content/docs/how-tos/Tasks/reusing-tasks) them. You can also leverage the [task to domain](https://orkes.io/content/docs/how-tos/Tasks/task-domains) functionality where the task debugging and development can be done in the production environment. In addition, the transition between the different states of a task can be visualized from a [task’s lifecycle](https://orkes.io/content/docs/how-tos/Tasks/task-lifecycle).
