---
slug: workflows-as-a-distributed-transacional-backend
title: Workflows as a Distributed Transactional Backend
authors: viren
tags: [Netflix Conductor, workflow, distributed system, database, app development]
---

In a recent [blog](https://a16z.com/2023/04/14/the-modern-transactional-stack/), a16z discussed the state of the modern transactional stack and called out Orkes Conductor as one of the important frameworks of the modern transactional backend. That article discusses the current state and landscape of application development platforms that provide transaction management capabilities out of the box. In this article, we look at the two main approaches — database-oriented and workflow-oriented transactional backends — and discuss the architecture of an application leveraging each of them and weigh the pros and cons of the two approaches.

## State of Modern App Development

All modern apps are distributed systems. In modern applications, different components or services often need to work together to provide a seamless user experience. For example, a mobile app might need to communicate with a back-end service to retrieve data or process a user’s request. This requires the app and the service to exchange information over a network, which is a key characteristic of a distributed system.

Moreover, modern applications often rely on cloud computing and other infrastructure services, such as databases, message queues, and caching systems, which are distributed by nature. These services provide key features like scalability, fault tolerance, and high availability, all of which are essential for modern applications to meet the demands of a global audience.

The distributed nature of modern applications allows them to be more flexible, scalable, and resilient, which is why they have become the preferred architecture for modern day enterprise software development.

Compare this to a traditional enterprise application where all the requests from clients are executed within a database transaction and all of the data required to serve the need of the application resides in a single application specific database. This works great but creates a pattern of monolith that is harder to scale, change and difficult to maintain in the longer term. Also, there is a question of long running workflows which could span over days if not months or even years, where the question of maintaining application transactions still requires a solution that is not offered by databases.

This brings an important question — if you are adopting an application architecture that is running distributed services, how do you handle transactions that span across multiple services?

## Transactions, Guarantees, and Modern Apps (Are all transactions created equal?)

Consider an order management system:

<p align="center"><img src="/content/img/order-management-system.png" alt="Order Management System" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

An application with multiple services has two types of transactions:

1. **Local to the service**: The *Generate Order* step above creates a new order in the system and inserts details into the order table.
2. **Application level transaction**: The transaction that controls the entire application flow. In the above example, we have a transaction that starts when the order is placed and completes when the flow terminates. Any persistent failures in between have to be reversed in service specific databases.

## Consistency in a Distributed System

We want the systems to be consistent in their state of the world. However, this is often harder to achieve in a distributed system, given multiple factors and the need to coordinate a single transaction across them that could be running for days.

In a traditional database oriented system, the database acts as a transaction coordinator providing the level of consistency that is offered by the database. However, that still does not solve the cases of long running and asynchronous flows where the transaction needs to be updated out of band and managed according to the business requirements.

## Workflow Engines as a Distributed Transactional Backend

Workflows in distributed event driven applications allow services to communicate with each other via events, making it a source of truth for the application state. An orchestrator such as Orkes Conductor acts as a centralized coordinator that maintains the application state and handles the distributed transactions. This is often referred to as a **saga pattern**.

The core idea of the Saga pattern is that long transactions are split into short transactions coordinated by a transaction coordinator such as Orkes Conductor. If each short transaction operation successfully completes, then the global transaction completes normally, and if a step fails, the compensating operations are invoked one at a time in reverse order.

This approach massively simplifies the management of long running distributed transactions and the problem of managing application state across multiple services.

## Distributed Systems and Transactions in a Long Running Process

Managing long running transactions often require different strategies to handle the patterns of “rollback” or compensation. The rollback is typically done by reversing the local transactions via compensation. What gets rolled back and the associated compensation often depends on the current state of the transaction.

For example, in our order management system, if the delivery fails, the compensation logic could be to issue a refund on the credit card, send an email to the user notifying the situation and update the status of the order in the database.

Failure to process credit card transactions could mean canceling the order and sending an email to the user.

With a platform like Orkes Conductor, this is handled via compensation workflows that are triggered when a workflow fails due to an error in the system or a business case validation failure (insufficient inventory). Workflow engines serve two purposes here:

1. A workflow is the source of truth for the application state. Workflow systems can be queried to gain the status of the transaction at any point and it would act as an aggregator across multiple services and their local backend. In the order management example, we could ask the system the status of an order ID, and it will tell us exactly what the order status is and which service it is with.
2. A workflow acts as a distributed transaction coordinator. If a particular step has to fail in the process, the system takes care of running compensation logic as specified in the blueprint.

## Application State vs. Business State

A typical application will have two kinds of states:

1. **Application state**: This defines the state of the application flow as defined by the program to achieve a specific goal — e.g., process order.
2. **Business state**: Typically manages the state of the business entity — e.g., the delivery status of an order. You could have **multiple** application flows that are updating or reading the business state.

These two states are often decoupled. The business state is often updated by an application flow as a step in its workflow as part of the local transaction.

## Database Centric Transactional Stack

One approach is to use a database centric stack that allows you to manage application and business state from a database transaction. This approach has its merits in the simplicity as you can write your entire application with the database managing the overall state.

### Where does this approach start to break down?

While simple, it breaks down as the application logic starts to get more complex. However, there are several downsides to this approach:

- Most of the platform today focuses on typescript/javascript as the language for writing the logic, which limits the libraries ecosystem you can use.
- This architecture lands very well with UI driven applications and simple CRUD applications; however, for application integrations and long running processes, you typically have to integrate with other systems.
- Handling of long running transactions still requires implementing strategies to handle compensation and application specific logic to rollback transactions.
- Harder to implement many of the enterprise integration patterns with external systems.
- A single source of truth ends up creating a monolithic dependency on a single database system making it harder to scale with business complexity. e.g., A single DB to manage a company’s core order management system may not be an ideal solution for enterprises.
- Managing the entire business flow in the code makes it harder to visualize the progress and complicates the debug flow by increasing the meantime to detect and repair when there are issues in the system.

## Orkes Conductor + Business State Manager

The architecture where the workflow engine works alongside business state management workers is not new, and we leveraged this architecture at Netflix successfully across multiple applications where Conductor maintained the application state and dedicated workers managed the business state in a database. (However, that part was not open sourced).

In this architecture, a set of dedicated workers responsible for maintaining the business state are “listening” to the application workflow state and creating the necessary database transactions to reflect the business state. e.g., when the workflow starts, the **onStart** event inserts a new order with the order id in the database and when the workflow completes, the onComplete event updates the status. In this case, the status listeners are the source of writes to the database table, which anyone can read outside of the workflow.

### Reasons why workflow + business state manager works better:

Though it might seem complex at first, the approach scales well with business complexity and growth.

- Greater choice of development ecosystem with polyglot languages/framework choices
- Decoupling of business logic and state management from the database and how/where the business state is stored.
- Being able to scale components independently and ability to create greater re-usability of the services/components with domain ownerships. For example, a platform team could own and scale customer contact services (email, SMS) independent of the use cases they are used with (order management, marketing, etc.).
- Databases that handle business states can be multi-model, ranging from traditional relational databases to NoSQL and specialized databases such as a graph or vector databases for ML workloads.

## Conclusion

Combining the semantics of a database centric approach into the workflow creates a powerful combination that allows building very complex and scalable distributed applications with ease. We believe that this approach provides the best of both worlds and scales much better in terms of handling business complexity as well as application usage growth.

Check us out at [orkes.io](https://orkes.io/) and the open source Netflix Conductor at https://github.com/Netflix/conductor.