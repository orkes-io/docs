---
sidebar_position: 1
---

# Workflows, Tasks and Operators

Conductor is a workflow orchestration platform that encompasses the flow of your business logic. To begin with Conductor, you must familiarize yourself with certain basic concepts of Conductor. The process of orchestrating Workflows using Conductor revolves around three main concepts; __Tasks__, __Workers__ and __Workflows__.

This documentation gives you a basic overview of the core concepts of Conductor.


# Tasks

A __Task__ represents the business logic execution such as making an HTTP call, sending an email, or doing work such as processing data files or executing some logic. A task is the fundamental building block of a workflow that can be further classified into __Operators__ and __System task__.

An __Operator__ in a workflow is your programming language construct such as a switch, loop, fork/join or return statement, whereas a __System task__ is a pre-built task used for most common operators, such as an event task, HTTP task and more.

# Workers

The tasks are executed using the __Workers__. The operators and system tasks are handled by the conductor server, whereas the custom user-defined tasks are handled by a worker running outside the conductor server. 

Conductor is agnostic to how the workers are deployed and provide lightweight SDKs in all major languages that allow you to expose existing functionality as Conductor Workers. Workers can run on bare metal, containers, VMs, or as serverless functions.


# Workflows

__Workflow__ can be defined as the collection of tasks and operators that specifies the order and execution of the defined tasks. This orchestration process takes place in a hybrid ecosystem that encircles serverless functions, microservices and monolithic applications. Furthermore, as the Conductor is language agnostic, the orchestration can be across any programming language. 

```
Workflow = {Tasks + Operators}
```
