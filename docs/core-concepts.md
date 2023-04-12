# Core Concepts

Orkes Conductor is a platform for building distributed systems. Fundamentally it takes care of orchestrating your flows reliably through various pieces in your applications such as code, functions, APIs and more. The process of orchestrating using Conductor revolves around three main concepts: Tasks, Workers and Workflows.

<p style={{textAlign: "center"}}><img src="/content/img/anatomy.png" alt="adding a secret via UI" width="500" style={{paddingBottom: 20, paddingTop: 20}} /></p>

## Tasks

A Task represents a unit of work or a step in your flow, such as making an HTTP call, sending an email, processing data files or executing some logic. A task is the basic building block of a workflow that can be further classified into __operators__, __system__ tasks, or __custom__ code workers.

An [Operator](/content/category/reference-docs/operators) in a workflow is your programming language construct, such as a switch, loop, fork/join or return statement, whereas a [System task](/content/category/reference-docs/system-tasks) is a pre-built task used for most common operators, such as an event task, HTTP task, polling an endpoint, and many more.

## Workers

A worker is responsible for executing a task. Operators and System tasks are handled by the Conductor server, whereas the user-defined tasks is managed by applications implementing them. This worker will poll Conductor server to receive and execute any scheduled any work. 
Conductor passes the inputs to the task worker for execution and collects the output back and the process continues to the next step as per the workflow definition.

Conductor is agnostic to how the workers are deployed and provides lightweight SDKs in all major languages that allow you to expose existing functionality as Conductor Workers. Workers can run on bare metal, containers, VMs, or as serverless functions.

## Workflows

Workflow can be defined as the collection of tasks and operators that specifies the order and execution of the defined tasks. This orchestration occurs in a hybrid ecosystem that encircles serverless functions, microservices, and monolithic applications. Furthermore, as the Conductor is language agnostic, the orchestration can be across any programming language.

```c
Workflow = {Tasks + Workers}
```

## Related Topics

* [Use cases and Templates](/content/category/templates)
* [Operators](/content/category/reference-docs/operators)
* [System Tasks](/content/category/reference-docs/system-tasks)
* [Custom Worker](/content/getting-started/adding-custom-code-worker)
* [Clients and SDKs](/content/category/sdks)
