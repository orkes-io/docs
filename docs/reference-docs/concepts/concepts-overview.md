---
sidebar_position: 1
---

# Overview

There are four primitives that are used with Conductor as you build your applications with it.

## [Tasks](tasks-and-workers.md#Conductor-Tasks)
Tasks are the basic logical unit of work. It has defined inputs and outputs, does a specific activity and returns an execution status of success or failure. 

Conceptually, Conductor is oblivious to the actual work a task does, and similarly the task is oblivious to the state of the execution of the overall application which it expects Conductor to manage and ensure high levels of reliability.

The actual execution of a Task can happen in multiple ways:
* **[External Tasks](tasks-and-workers.md#Conductor-Tasks):** This category is where the task is run external to Conductor as a micro service (e.g. in a container managed through Kubernetes in a public cloud) or it can run as a serverless function at a cloud provider. You can also have your task execute as part of a monolith that you have in your on-premise datacenter. As long as it can connect to Conductor server through REST of gRPC, it will work! 
* **[System Tasks](system-tasks.md)** This category of tasks runs within the Conductor server. A good example is the [HTTP System Task](../system-tasks/http-task.md) which makes an outbound call (internal or Internet routed) to a HTTP service  and returns the results from that call. When you use System Tasks, you do not need to worry about provisioning, deploying and managing the application code for your tasks. 
> Note: The current Conductor nomenclature includes [Operators](operators.md) in the Tasks category. In this documentation, for clarity purposes, we treat them as a separate primitive of Conductor
## [Operators](operators.md)
Operators allows you to wire up your workflows to capture the business logic in an intuitive and flexible way. Specific examples include [SWITCH](../switch-task.md), [FORK](../fork-task.md) and [JOIN](../join-task.md) operators. Leveraging these operators gives you programmability that is also visual and easy to manage. Compare this with embedding your business logic deep in codebases that are distributed among many modules, languages and versions - and having to scramble for hours to understand how logic flows in your application, for example during a live-site issue!

## [Workflows](workflows.md)
A workflow is the central entity that wires up different tasks and operataors to represent an application's business logic. It specifies whcih tasks to schedule when, how their results are combined and how failure scenarios are handled. 

The execution of a workflow that is defined in Conductor involves not only executing the tasks, but also doing so with high levels of reliability at scale. This is possible because Conductor keeps tracks of the execution status for each invocation of a workflow, even when millions of them are running. If a Task is not responding or is failing, Conductor will retry the execution at the specific point, potentially with a different Task Worker.  

Workflows in Conductor are also highly durable. You can have a workflow that stays waiting for as long as needed *(think weeks, months, years)* in a specific point in the execution for a long time *(e.g. monthly subscription billing that happens on the 1st of every month)*.

Conductor's workflows are defined using JSON and results in a visual and intuitive graph representation of the application's components, relationships and flows. This abstraction of business logic is key to making developers & teams more empowered in multiple ways. 
* Developers can move fast by easily adding new tasks or logic flows to a workflow and let Conductor ensure high levels of reliability, scalability and durability.
* A new team member can be easily ramped up since these workflow definitions inherently serve as easy to understand documentation of the applications a team owns
* During livesite issues, a DevOps engineer can quickly see which workflow execution is failing, poinpoint the exact task having issues and get actionable information about what happened and which specific worker instance the problem code was running. This reduces debugging time for critical issues from hours or days to minutes



## [Workers](tasks-and-workers.md#Conductor-Workers)
Workers are the external entities that host and run the code for a Task that is defined in Conductor. 

Once the tasks' code is written to implement a task - you can choose the language you prefer for that, and for [Java](../../how-tos/java-sdk.md), [Python](../../how-tos/python-sdk.md), [Node.js](../../how-tos/nodejs-sdk.md) and [Go](../../how-tos/golang-sdk.md), we have SDKs that make it easy - it is deployed, and will poll the Conductor server to see if there are any Tasks queued for execution. If there are any, Conductor will allocate that for a Worker to execute and will wait for it to respond back with the result. In the event of a failure or a non-response from a Worker, Conductor will retry or gracefully fail in accordance with the behaviour the task creater has specified. 

There are multiple ways in which you can run a Worker
* **Micro Services:** The most common way a worker is imlpemented by Conductor users is by building a micro service to do that and deploying it as a container. This option allows you to have granualirity in your application development, scale your tasks independently, and contain the blast radius of any task level failures.
* **Serverless Functions:** Your Task code can be written as a stateless and serverless function that can be hosted with a serverless provider such as [AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/en-us/services/functions/), [Google Cloud Functions](https://cloud.google.com/functions) etc. Choosing this option to run your Tasks allows you to not have to spend tiem and resources managing a server footprint
* **Monolith:** Many applications run as part of a monolith that encompasses other applications or even entirely different business lines. Conductor fully supports executing workers in these stacks. This gives developers the flexibility to have parts of their application running in micro services and others in a monolith. Customers have used this flexibility to plan and execute their micro services isolation strategy (sometimes along with a cloud migration strategy) and also for their ongoing hybrid operational strategy whcih different parts of their business logic lies in different parts of their backend ecosystem.

## Further Reading
* [Tasks](tasks-and-workers.md#Conductor-Tasks)
* [Workers](tasks-and-workers.md#Conductor-Workers)
* [System Tasks](system-tasks.md)
* [Operators](operators.md)
* [Workflows](workflows.md)



