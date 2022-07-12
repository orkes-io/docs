---
slug: workflow-orchestration-vs-choreography
title: Workflow Orchestration vs. Workflow Choreography- What Are the Differences?
authors: CameronPavey
tags: [Netflix Conductor, choreography, orchestration, 2022]
image: https://imgur.com/dLuGoby.png
---
# Workflow Orchestration vs. Workflow Choreography: What Are the Differences?

The microservice architecture pattern has been steadily gaining popularity in recent years. This architecture decomposes larger applications into smaller, more easily managed components.

While this can eliminate some of the challenges of working with large [monolithic applications](https://www.mulesoft.com/resources/api/microservices-vs-monolithic), breaking applications down into multiple decoupled pieces also presents some new challenges, such as determining how the microservices will communicate with each other. 

This article compares two different approaches that offer solutions to this problem. These approaches are *workflow orchestration* and *workflow choreography*. While these concepts are similar in some regards, there are also key differences. This article highlights these differences by comparing the two concepts using the following criteria:

- **Definition:** How is each concept defined?
- **Scalability:** How well does each approach scale as applications increase in size and scope?
- **Communication:** How do microservices communicate and transact data under each approach?
- **Strengths:** What are the benefits afforded by each approach?
- **Limitations:** What are the limitations of each approach?
- **Tools:** What tools, if any, are there to help you facilitate each approach?

## Definition

Before delving into the specific differences between these two approaches, it is good to have a high-level understanding of the definitions and goals of each. 

*Workflow orchestration* describes an approach in which a single, centralized service—commonly known as the “orchestrator”—is responsible for invoking other services and handling and combining their responses to execute a composite business workflow. 

In this approach, the orchestrator is aware of the big picture and the role played by each service. However, the services are not aware of anything beyond their interactions with the orchestrator.

![Workflow orchestration](https://i.imgur.com/N6MsZha.png)

On the other hand, *workflow choreography* is a decentralized approach in which each service is responsible for invoking and responding to adjacent services. 

This decentralization means that each service is aware of a small piece of the big picture, but only those parts in which the service plays an active role. The services are otherwise unaware of their overall position and relevance concerning the business workflow under execution.

![Workflow choreography](https://i.imgur.com/d8CxnKE.png)

## Scalability

One of the key benefits of decomposing a system into microservices is that it enables better scalability. Whether your microservices are running in containers or dedicated virtual machines, there’s almost always a way to scale the number of instances of a given microservice up or down to meet demand at any given time. 

With this in mind, it’s essential to consider the potential impact on scalability when it comes to either orchestration or choreography.

One immediate concern is whether the scalability of the services themselves is affected. In both approaches, the services can be abstracted away behind load balancers, such as those offered by [AWS](https://aws.amazon.com/elasticloadbalancing/), or the load balancing functionality in [Kubernetes](https://kubernetes.io/). 

Behind this abstraction, individual services can theoretically scale independently of any other concerns. In light of this, the next consideration is whether the orchestration and choreography patterns are scalable.

When considering orchestration, you need to account for a centralized component. This component—the orchestrator—will vary depending on your implementation, but one example is [Netflix Conductor](https://conductor.netflix.com/), an open source workflow orchestration platform. 

Conductor is inherently scalable in this instance, claiming to support workloads “from a single workflow to millions of concurrent processes,” which would suggest that orchestration can be entirely scalable; that said, the degree to which this is the case will be somewhat affected by whichever tool is used to fill the role of orchestrator.

On the other hand, choreography has fewer considerations when it comes to scalability. The entire system should inherit this scalability as long as the services themselves are scalable, along with any other “connective pieces,” such as message brokers. 

## Communication

How the services communicate with each other is another key consideration when differentiating between orchestration and choreography. While the choice between these two approaches doesn’t necessarily dictate which mechanisms your services can use to communicate, it does help inform the specifics of how you would use these mechanisms in a given scenario. 

Firstly, in orchestration, as you know, a central process is responsible for when and how services are invoked. In the case of a synchronous system where the orchestrator makes HTTP calls to services in series, the communication might look something like the following diagram.

![Synchronous orchestration](https://i.imgur.com/w6ZYvyq.png)

Alternatively, you might wish to take an asynchronous approach, in which a message broker is used to store the information about jobs that the services must complete. In this case, your communication would look something like the following diagram. 

![Asynchronous orchestration](https://i.imgur.com/GYRbuYo.png)

The orchestrator is now responsible for reading messages pushed by individual services and pushing messages so that other individual services can act on them.

In contrast, in workflow choreography, there is no central orchestrator and, thus, no central process that decides how services should be invoked. A given service may receive a request and act upon it, directly invoking whatever other services it needs. In a synchronous approach, this might look something like the following diagram.

![Synchronous choreography](https://i.imgur.com/M7VWdd3.png)

As you can see, each service is responsible for invoking and responding to any adjacent services as needed. This behavior is also true for asynchronous communication, with the main difference being the inclusion of a message broker instead of direct HTTP calls.

![Asynchronous choreography](https://i.imgur.com/wYquiFJ.png)

In this asynchronous approach to workflow choreography, each service subscribes to and publishes specific message types directly, rather than an orchestrator being responsible for mediating communication between services. 

## Strengths

As with most architectural patterns, each approach has strengths and limitations. The orchestration pattern reduces point-to-point communication between services by shifting the contextual awareness of the workflow to the orchestrator. 

With this awareness, the orchestrator can be more resilient when individual services fail. Suppose a given service fails to respond as expected. In that case, the orchestrator can elegantly handle the error in several ways, whether by retrying immediately, re-queuing the task for later, or even just logging information about the error in greater detail than would otherwise be possible.

Workflow choreography also offers some benefits. Because each service is only concerned with other adjacent services and not with the overall shape of the system, it can be somewhat easier to add, change, and remove individual services frequently without disrupting other parts of the system. 

Eliminating the orchestrator from your architecture also removes a potential bottleneck or point of failure. Choreography is also typically well-aligned with the serverless architecture pattern, as it supports scalable, short-lived services without the need for a long-running orchestrator.

## Limitations

There are some limitations to each approach that need to be considered when comparing orchestration and choreography. 

In orchestration, you need to account for a potential single point of failure, which is the orchestrator. If the orchestrator suffers from degraded performance or an outage, the entire system will be affected, even if the other microservices are still operational. 

Because of this, it’s important to ensure that the orchestrator has redundancy and failover capabilities where possible. Similarly, having an orchestrator means that all of your services are tightly coupled to that orchestrator when it comes to execution.

On the other hand, when using choreography, rather than having a single point of failure, responsibility for the system’s resilience is now distributed. Any given service could fail at any time, and without a centralized orchestrator, recovery and diagnostics can be a lot harder.

In some cases, it may be possible to push a job to a queue to be retried, but in many cases, it might be necessary to abort the workflow and log as much information as possible. Because choreographed workflows lack a holistic context, the breadth of information you can log at this stage is typically somewhat diminished.

## Tools

Workflow orchestration and choreography are both architectural patterns and, as such, can be implemented in many ways. Orchestration, in particular, has the added requirement of the orchestrator itself. There are [numerous orchestration tools](https://github.com/meirwah/awesome-workflow-engines) that can fulfill this role, such as [Netflix Conductor](https://conductor.netflix.com/) and the fully managed, cloud-based version of Conductor, [Orkes](https://orkes.io/).

On the choreography side, there aren’t necessarily any specific tools, as choreography doesn’t require any specialized components like an orchestrator. Instead, you would do well to ensure that all of your services communicate over clearly defined, well-known APIs and that you have a robust logging and error management solution in place, such as those offered by [Sentry](https://sentry.io/welcome/) or [Datadog](https://docs.datadoghq.com/tracing/error_tracking/).

Both approaches still rely heavily on individual microservices, so tools and techniques that make microservices easier to manage could be beneficial, regardless of the approach you decide to take. These include things like [load balancers](https://aws.amazon.com/elasticloadbalancing/) and container orchestration (not to be confused with workflow orchestration) tools like [Kubernetes](https://kubernetes.io/).

## Wrapping Up

This article explained the key differences between workflow orchestration and workflow choreography. You’ve seen how these two approaches differ and where they’re similar. The strengths and weaknesses of each have been touched upon, as well as some tools you can consider to help implement either approach. 

Both approaches are technically valid and can work for your solution if implemented correctly. If you’re interested in learning more about orchestration, consider [Orkes](https://orkes.io/), a fully managed, cloud-based version of Netflix Conductor.
