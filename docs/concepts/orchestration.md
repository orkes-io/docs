---
sidebar_position: 3
---
# Why Conductor

Conductor was built to help Netflix orchestrate microservices-based process flows with the following features:

* A fully distributed server - i.e., no single point of failure achieving very high availability.
* Decoupling workflows from underlying service implementation results in greater reuse and cleaner service implementations.
* Provide visibility and traceability into these process flows.
* Full operational control over workflows with the ability to pause, resume, restart, retry, and terminate.
* Language agnostic - a workflow can have tasks written in multiple languages where each task can be executed using the most suitable language.
* Ability to scale to billions of concurrently running process flows.
* Backed by distributed queuing service abstracted from the clients.
* Handle common themes around rate limits, failure handling, concurrent execution control, etc.

## Why not peer-to-peer choreography?
With peer-to-peer task choreography, we found it was harder to scale with growing business needs and complexities. The pub/sub model worked for the simplest of the flows but quickly highlighted some of the issues associated with the approach:

Process flows are *embedded* within the code of multiple applications. Often, there is tight coupling and assumptions around input/output, SLAs, etc., making it harder to adapt to changing needs.
Almost no way to systematically answer “How much are we done with process X”?

##
//todo: add more stuff here

