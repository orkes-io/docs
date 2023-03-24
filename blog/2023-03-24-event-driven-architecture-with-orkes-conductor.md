---
slug: event-driven-architecture-with-orkes-conductor
title: Event Driven Architecture with Orkes Conductor
authors: riza
tags: [Netflix Conductor, orchestration, microservices]
---

A recent prediction from the DevOps community regarding microservice adoption in 2023  indicates that more organizations would adopt microservices architecture over the legacy monolithic architecture. This shift challenges organizations in managing the interactions between individual microservices, especially when they are substantial. This is where an orchestration approach comes in. In this blog post, we will explore the benefits of event-driven architecture with orchestration patterns and how it differs from choreography. 

<p align="center"><img src="/content/img/event-driven-architecture.jpg" alt="Event Driven Architecture" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>


## Event Driven Architecture: Orchestration Vs. Choreography - An Analogy

Microservices allow you to divide your entire fleet of applications into minor services that are independently deployed. An **event-driven architecture** is an approach where individual decoupled services are integrated to implement business logic. An event-driven architecture leverages various events to trigger and communicate between the services. An event is basically a change/update in the state, such as placing or shipping an order.

An event driven architecture has three main components: event producer, router, and consumer. The event producer is the one who creates events for an activity. For example, a customer places an order through a website/application. The event router filters and pushes the event to the appropriate consumers. 

To better understand the concept, let’s consider a hypothetical e-commerce application.

### E-commerce Application as a Microservice

The process of placing an order in an e-commerce application consists of several activities.

<p align="center"><img src="/content/img/e-commerce-application-as-microservice.jpg" alt="A sample E-commerce application illustrating different microservices" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Each service is considered an individual microservices that work together to complete the application. These services may need to communicate with one another for the smooth functioning of the application. 

In a microservice environment, the interaction between these services can be handled in 2 different ways. The first approach is **orchestration**, where a central coordination element determines what each service should do and in what order they should execute. The second approach is **choreography**, a decentralized approach where each service is responsible for consuming events, performing actions, and publishing events individually. Unlike in orchestration, the choreography is not centered around the logic of a centralized coordination element.  

Consider the case of e-commerce applications based on the choreography approach.

The user surfs through the application and adds an item to the cart. This publishes an event to the message broker, which is consumed by the individual microservices. After consuming the event, the microservice performs the required activity & passes the event for the next service to consume. The process continues until the business goal is achieved. 

<p align="center"><img src="/content/img/choreography-in-event-driven-architecture.jpg" alt="Choreography approach in Event Driven Architecture" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You can see that there is no centralized coordination between the services. Any service can consume the event, perform the corresponding action and pass the event for the next service to consume. In this pattern, the order of execution is embedded inside the services themselves.  This approach often leads to a complex architecture with O(N^2) in the connection complexity across services.

Now, suppose the same application is implemented via the orchestration. In that case, all the services are linked to a centralized orchestrator that orchestrates these services in a pre-defined order, thus completing the application. 

<p align="center"><img src="/content/img/orchestration-in-event-driven-architecture.jpg" alt="Orchestration approach in Event Driven Architecture" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

[Orkes Conductor](https://orkes.io/what-is-conductor/), built over battle-tested Netflix Conductor, is an orchestration platform that can build distributed applications in your preferred languages. Before delving into the benefits of event-driven orchestration, let’s look into the drawbacks of choreography. 

## Drawbacks of Choreography

* **Tight Coupling** - Individual services directly contact each other, creating couplings between them. Hence, any change in a process can impact all the connected microservices. This often requires lock-step dependency when upgrading or deploying services, leading to a **distributed monolith**.
* **Distributed Source of Truth** - Application state is maintained across multiple individual microservices backend, making it harder to track process flows and often requires another system to collate state, increasing infrastructure footprint and complexity. 
* **Difficult to Troubleshoot** - As the application flow is embedded inside multiple services, the mean time to detect and resolve could be longer. It often requires a centralized logging service and an understanding of the codebase to troubleshoot flows. Failures in a single service could create a cascading effect creating a larger outage if not handled properly.
* **Challenging Environment for Testing** - Creates a difficult testing environment for the developers as the microservices are interconnected and distributed.
* **Difficult to Maintain** - As the application processes evolve, creating new versions requires adding conditional logic to the services again, leading to a distributed monolith, making it increasingly difficult to understand the service flows without inspecting code.

## Benefits of Orchestration 

Orchestration addresses the drawbacks of choreography by adding a centralized orchestrator that is responsible for communicating across services. In this model, services do not talk to each other and communicate the work only to the orchestrator, who is responsible for coordinating flows across services.

* **Single Source of Truth** - The orchestrator maintains the application state and can be queried to check the state of the process at any time, removing the need to create a separate system to maintain.
* **Truly Stateless Services** - Services become truly stateless and adhere to the single responsibility principle making them easy to develop, scale, and re-use as they do not maintain any state.
* **Increased Resilience** - With no point-to-point communication, applications can be more resilient to failures as the orchestrator can handle common patterns such as rate limits, retries, and failure handling.
* **Better Visibility & Monitoring Capabilities** - With the orchestration pattern, you have central visibility across your distributed applications’ landscape and can quickly identify and resolve issues. This helps to increase productivity and reduce downtime, ultimately reducing the mean time to detect and recover from failures.
* **Faster Time to Market** - The orchestrator makes it easy to rewire existing services or create new flows by wiring existing services very quickly. This enables application teams to be more agile, leading to faster time to market for new ideas and concepts. The orchestrator often handles Versioning, reducing the proliferation of **if..then..else** in the code to create versions.  
* **Testability of the Application Flows** - Platforms like Conductor makes it easy to test application flows as part of your CI/CD, ensuring coverage and confidence in the changes.

## Modernize Event Driven Architecture with Orkes Conductor

Orkes Conductor is an enterprise version of the popular Netflix Conductor, built by the creators of Netflix Conductor, that offers unparalleled scale and the ability to build complex stateful distributed applications. Orkes Conductor is a fully distributed platform removing any single point of failure from the architecture, allowing developers to easily build distributed stateful applications that can survive failures and scale to extreme volumes.

If you are on the hunt for a platform to modernize your event driven architecture, it’s high time to check out [Orkes Conductor](https://orkes.io/). Adopting this powerful tool in your business can undoubtedly provide a competitive edge and drive success in today’s ever-evolving technology landscape.

If you have any queries or need further assistance with Orkes Conductor, we invite you to join our [Slack community](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW) or [set up a meeting with us](https://share.hsforms.com/1TmggEej4TbCm0sTWKFDahwcfl4g)!