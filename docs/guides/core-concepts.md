# Core Concepts

Conductor is a workflow orchestration platform that encompasses the flow of your business logic. To begin with Conductor, you must familiarize yourself with certain basic concepts of Conductor. The process of orchestrating Workflows using Conductor revolves around three main concepts: Tasks, Workers and Workflows.

This documentation gives you a basic overview of the core concepts of Conductor.

## Tasks

A Task represents the business logic execution, such as making an HTTP call, sending an email, processing data files or executing some logic. A task is the fundamental building block of a workflow that can be further classified into Operators, System tasks, or custom code workers written in any programming language.

An [Operator](/content/category/ref-docs/operators) in a workflow is your programming language construct, such as a switch, loop, fork/join or return statement, whereas a [System task](/content/category/ref-docs/system-tasks) is a pre-built task used for most common operators, such as an event task, HTTP task, and more.

## Workers

A worker is responsible for executing a task. Operators and System tasks are handled by the Conductor server, whereas the user-defined tasks need a worker running in a different environment. This worker will poll the Conductor's task queue to see if the server has scheduled any work. If there is a scheduled task, the worker executes the task and produces the output, provided input is specified. The worker’s output is sent back to the workflow, and the process continues as per the defined workflow.

Conductor is agnostic to how the workers are deployed and provides lightweight SDKs in all major languages that allow you to expose existing functionality as Conductor Workers. Workers can run on bare metal, containers, VMs, or as serverless functions.

## Workflows

Workflow can be defined as the collection of tasks and operators that specifies the order and execution of the defined tasks. This orchestration occurs in a hybrid ecosystem that encircles serverless functions, microservices, and monolithic applications. Furthermore, as the Conductor is language agnostic, the orchestration can be across any programming language.

```c
Workflow = {Tasks + Workers}
```