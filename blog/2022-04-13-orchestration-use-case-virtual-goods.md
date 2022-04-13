---
slug: orchestration-use-case-virtual-goods
title: Microservice Architecture Use Case- Virtual Goods
authors: paulibeabuchi
tags: [microservices, cloud, orchestration, use-case, 2022]
image: https://i.imgur.com/Z5MLRI6.png
---

# Microservice Architecture Use Case: Virtual Goods

Microservice architecture is an architecture where an application is split into separate services, and each service is run and managed independently. In a microservice architecture, every service is focused on handling one major function and is solely responsible for its own data management.

Microservice architecture is often recommended for larger applications because it allows services to be managed by dedicated teams. Testing and deployment also become easier, as they can be carried out independently for each service without affecting the overall application.

In this article, you'll learn what a microservice architecture is and when to use it, and about workflow orchestration, its benefits, and how it can be utilized in a microservice architecture. You'll also look at an example use case of microservice architecture so you can better understand the benefits, strengths, and weaknesses of this style of architecture.
<!--truncate -->
## Why Use Microservice Architecture?

Small applications are usually built in the monolith architectural style, where the application components or services are tightly coupled together in a unified system. They all share a database, and because the services are so interdependent, a change in one service requires a redeployment of the entire application. When the application starts to scale, this can become difficult to manage. That's where microservice architecture comes in. 

In a microservice architecture, the application gets split into stand-alone services. Each service has its own database, and is loosely coupled with other services. A change in one service doesn't necessarily affect all other services, and each service can be managed, tested, and deployed separately. With this architecture, separation of concerns is enforced by default, as different teams are assigned to different services.

Every service establishes a protocol with which they can communicate to each other. This could be through APIs or through defined libraries that are usually known as the service's **client**. So if, for example, a payment component needs to reach an authentication component before approving a transaction, it achieves this through the client (or API) made available by the authentication component.

## Benefits of Microservice Architecture

Microservice architecture can offer many benefits:

- It allows for rapid development of components/services.
- It's more modular than monolithic architecture, allowing components to be added, removed, and deployed independently.
- It facilitates better scalability.
- The overall application is better managed, with dedicated teams assigned to each service.
- Testing and deployment are easier and faster compared to that of a monolith architecture.
- Productivity is improved, since each service functions independently, and developers don't have to worry that testing or other concerns will affect the overall application.
- Fault tolerance is improved, since services are loosely coupled together.

## Hypothetical Use Case for Microservice Architecture

A typical use case for microservice architecture is a large application with multiple components or services that are usually monolithic. In this section, you'll look at how a microservice architecture can be used to model a virtual product—an online music streaming application, which is our hypothetical use case. You'll learn about each service listed, including what they're responsible for and how they can communicate to each other through their APIs.

Below is a diagram of the microservice architecture to be used for this application.

![Microservice architecture for an online music streaming application](https://i.imgur.com/Z5MLRI6.png)

### Overview of Services

In the image above, each microservice is denoted with a unique color to help you distinguish between them as well as other services they communicate with. Each service provides an API to which other services can send HTTP requests and get responses from. Each service has its own database where it stores and accesses the data needed for its processes. Individual services can each use different tech stacks as required or desired by the management team for that service.

As shown in the image, a user’s browser or device can access these services via a specified API gateway. When the user makes a request, it goes through the API, which then routes the request to the corresponding microservice to be processed.

#### Users Service

This service will handle operations related to users of the application. It will contain personal details, preferences, and other information about the users, and will communicate with other services, such as the subscription service, to manage users’ subscriptions.

#### Notifications Service

This service will be responsible for passing information such as offers, new albums or playlists, and other notifications to the users. It will communicate with other services, such as albums or subscriptions, to get relevant information to send to the user. Notifications may take the form of emails, SMS, or in-app notifications.

#### Authentication and Authorization Service

This service will handle all authentication and authorization requests made by the user. It will facilitate user actions like payment transactions from the payments service and login from the users service. 

#### Search Service

This service will be responsible for taking search inputs from users and returning appropriate suggestions and search results. It can communicate with the album and playlist services for information related to users’ search inputs.

#### Albums and Playlists Services

These services, as their names imply, will manage songs. In addition to managing data by artist and album, they'll store playlists created by users, as well as provide users with updates on new or trending albums. These services can communicate updates to the user via the notifications service.

#### Subscriptions Service

This service handles available subscription plans, such as individual, family, and premium plans, for the application. The subscription service can communicate with the payments service, which will process payments depending on the selected subscription plan.

#### Payments Service

This service handles payments from users after they have selected a subscription plan. It communicates with the authentication and authorization service, which authenticates the user and their billing details before the transaction is approved by the payments service. It will also communicate with other services, such as the logging service, where details of the transactions will be logged.

#### Logging Service

This service logs data such as user and transaction details from services like the users service and the payments service. This can help with debugging and provide data that can be analyzed and used for application improvement.

#### Analytics Service

This service stores application data for analysis. It may include things like users’ ages, locations, device types, and usage of the application. The data provided by this service can help improve the business, such as by helping the marketing team target audiences. 

### Strengths Of Microservice Architecture

As noted previously, a microservice architecture can offer some substantial benefits when compared to a traditional monolithic architecture. Strengths include:

- There’s the separation of concerns, as each service is isolated and handles only one major function.
- A failure in one service doesn't affect other services, since they're loosely coupled. For example, if the search service fails, the user cannot search for songs, but they can still stream music from a playlist and make subscription payments.
- Testing and deployment are simpler as they can be done independently. For example, the analytics service can be tested and deployed at a different time from the notification service. 
- Services can be scaled independently. For example, the payments service can be scaled up, and even sold to other platforms that wish to run payment transactions.

### Weaknesses Of Microservice Architecture

For all of its benefits, microservice architecture also comes with some downsides. Weaknesses include:

- It can be expensive to run and maintain, because each service comes with its own costs, such as for engineers and structural facilities.
- Maintaining the application's documentation is more involved, as changes occur regularly, but different services will change at different times.
- In some instances, there may be increased latency issues because certain services require information from other services before they can process requests. For example, the subscriptions service requires a response from the payments service before a new subscription can be finalized.

### When Is Microservice Architecture the Best Fit?

This architecture is best suited for large applications with a large user base, and is best employed as your application starts to scale. It’s better to split the application into separate services as features are added and the user base grows.

## What Is Workflow Orchestration?

A workflow is a sequence of processes where data flows from one process to another. Orchestration, on the other hand, is managing and coordinating a system or a service. Workflow orchestration, then, is an approach that automates processes, reducing the need to manually carry out these tasks.

It's important to note that automation is different from orchestration. While automation involves automating a single process, orchestration deals with automating management and coordination of services.

### Workflow Orchestration in Microservice Architecture

For the hypothetical online streaming application used in this blog post, we can utilize workflow orchestration to define how microservices communicate with one another. If a service can’t be reached, workflow orchestration allows us to specify an automated retry mechanism and enforce a request time-out, preventing the service from retrying indefinitely.

### Benefits of Workflow Orchestration

Some benefits of workflow orchestration:

- It reduces costs, as it minimizes the need for manual operations.
- It improves performance, speed, and productivity.
- Infrastructure management improves, as workflow orchestration helps you get a holistic view of your operation.

### When to Utilize Workflow Orchestration

If you have a large service that requires many manual tasks to maintain the service, then workflow orchestration is for you. A transaction or operation can require actions from multiple services before completion. In the time between initializing and completion, the actions can execute successfully in some services but fail in other services, leading to data inconsistency.

You can employ the saga pattern, which is a failure-management pattern that coordinates transactions between multiple services, to maintain data consistency. When a service fails to complete its local transaction, other microservices involved will run a compensation transaction, which is an orchestrated, asynchronous procedure that rolls back or undoes the changes from the original transaction.

## Conclusion

In this article, you learned what microservice architecture is, why and when it should be used, how it works, and the benefits that it can offer. You also learned how an application can be split into various services and looked at how these services are structured and how they communicate with each other. 

[Orkes Cloud](https://orkes.io/content/docs/getting-started/playground/using-conductor-playground) is a fully managed, cloud-hosted platform built on Netflix Conductor OSS, which is a workflow orchestration engine used for distributed systems. Orkes offers you security, CI/CD (continuous integration/continuous deployment) pipeline orchestrations, cloud infrastructure, and more, and frees you up to focus on your service—not on managing your application. 

