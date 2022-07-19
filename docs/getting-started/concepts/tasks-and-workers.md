---
sidebar_position: 1
---

# Workers and Tasks
  
## Worker
A worker is responsible for executing a task.  Operator and System tasks are handled by the Conductor server.  User defined tasks need to have a worker running in a different environment.  This worker will poll Conductor's task queue to see if it has any work scheduled by the server.

Workers can be implemented in any language, and Conductor's [SDKs](/content/docs/how-tos/SDKs) provide support for worker framework that provides features such as polling threads, metrics and server communication that makes creating workers easy.

Each worker embodies Microservice design pattern and follows certain basic principles:

1. Workers are stateless and do not implement a workflow specific logic.  
2. Each worker executes a very specific task and produces well defined output given specific inputs.
3. Workers are meant to be idempotent (or should handle cases where the task that partially executed gets rescheduled due to timeouts etc.)
4. Workers do not implement the logic to handle retries etc, that is taken care by the Conductor server.

## Tasks
Tasks are the building blocks of workflow in Conductor.  A task can be an [operator](operators), [system task](system-tasks) 
or custom code [Worker](#worker) written in **any** programming language.

A typical Conductor workflow is a list of tasks that are executed until completion or the termination of the workflow. 


To learn more about tasks:

* [Creating tasks](/content/docs/how-tos/Tasks/creating-tasks)
* [Updating tasks](/content/docs/how-tos/Tasks/updating-tasks)
* [Reusing tasks](/content/docs/how-tos/Tasks/reusing-tasks)
* [Task to Domain](/content/docs/how-tos/Tasks/reusing-tasks)
* [Task Configurations](/content/docs/how-tos/Tasks/task-configurations)
* [Task Input Parameters](/content/docs/how-tos/Tasks/task-inputs)
* [Task Lifecycle](/content/docs/how-tos/Tasks/task-lifecycle)