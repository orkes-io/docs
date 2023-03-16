---
slug: why-is-microservice-orchestration-important-now
title: Why is Microservice Orchestration Important Now?
authors: azeez
tags: [Netflix Conductor, Orkes, microservices, 2022]
image: https://imgur.com/LDAaT9m.jpg
---

# Why Is Microservice Orchestration Important Now?

Microservices are a common and popular approach to building modular, scalable software with autonomous services. Large complex products are broken down into individual services responsible for a specific business function, such as user authentication or store checkout.

A microservice-based application might require several services to interact with each other to complete a business scope. The coordination of these interactions is known as a workflow or a saga. There are two models for implementing a workflow: choreography and orchestration. With choreography, you let each part of the system inform the other of its job and let it work out the details, while with orchestration, you rely on a central brain to guide and drive the execution processes.

As orchestrated systems have grown more expansive, the problem of efficiently orchestrating related business logics has become more pronounced. In this article, you will learn about the microservice orchestration workflow and its importance in relation to modern software architecture practices.

## What is Microservice Orchestration?

A microservice orchestration pattern involves a central orchestration service (the orchestrator) that typically contains the entire business workflow logic and issues commands to and awaits responses from worker microservices. Think of this as an orchestra where a central conductor is responsible for keeping the orchestra in sync and coordinating the members to produce a cohesive musical piece. Using orchestrators for your application is essential for efficiently managing applications based on microservices.

Before going into the specifics of microservice orchestration, it is helpful to familiarize yourself with the components of microservice-based architecture. For example, in a microservice-based e-commerce application, the following could come into play during the process of purchasing a product:

- a service for listing all products;

- a service for adding products to the cart and reserving that product from the inventory;

- a service for handling the payment; and

- a service that manages the shipment of the item.

Each of these microservices is autonomous. In other words, microservices can be individually scaled up or down without having to worry about the entire application. However, they are all required to interact with each other to fulfill the purchase. It might be tempting to have the services talk to each other directly as needed. However, as your architecture and the number of services grow, this can quickly get messy and difficult to maintain. This is where orchestration comes into play.

A microservice orchestration workflow is an architectural method of coordinating microservices for software systems and applications, in which loosely coupled services receive commands from a central controller, referred to as the orchestrator. The orchestrator acts as a brain, driving the execution processes; it sends a call to each service and awaits a reply before proceeding. The concept of a microservice orchestration workflow can be best described through a hypothetical use case.

![microservice orchestration workflow architecture diagram](https://i.imgur.com/hRwCweE.png)

The architectural diagram of this hypothetical use case shows the interactions between the various services involved in the process when following an orchestration workflow. Looking at the diagram above:

1. The orchestrator receives a trigger that initializes the workflow, starting with “Products Service.”

2. When this service has created an order with the products in the customer's cart, it returns some response to the orchestrator.

3. The orchestrator then calls the “Inventory Service” to reserve the products in the cart.

4. Next, the orchestrator calls the “Payment Service” to handle the payment.

5. After successful payment, the orchestrator moves on to the “Shipping Service,” which clears the products for shipment.

In a choreography workflow, on the other hand, the microservices are not managed by a central service; however, they are all aware of the business goals and rely on certain events from other services that determine how they function. Each service publishes the actions it has taken to a message stream such as SQS or Kafka. Other services subscribe and listen for events they are interested in from these streams and take the appropriate actions.

![choreography orchestration workflow architecture diagram](https://i.imgur.com/LLFZhep.png)

In the choreography architecture above:

1. The “Products Service” creates an order with the items in the customer's cart and publishes an "Order Created" event to a stream on the messaging platform.

2. The “Inventory Service” and “Payment Service” consume from this message stream. The “Inventory Service” handles reserving the products in the cart, and the “Payment Service” handles the payment and publishes the “Payment Success” event.

3. On receipt of an inventory “Payment Success” event, the “Shipping Service” goes ahead and clears the products that were reserved for shipment to the customer.

## Why is Microservice Orchestration Important?

Microservice architecture involves decomposing your application into a set of services to
improve agility and allow teams to scale. One of the main purposes of this architectural pattern is to have each service as an independently deployable component with well-defined interfaces; in this way, the scope of implemented changes can be limited to a single service.

However, you must coordinate the execution of multiple microservices to deliver the outcomes that users want, and this is why microservice orchestration is important. Orchestration allows you to put a service in charge of the other services. The service in charge is aware of the entire flow that is required and is responsible for putting the other services to work to achieve those aims.

Microservice orchestration enables you to process flows ranging from simple linear workflows to very complex dynamic workflows that run for multiple days with minimal effort and high visibility into the processes. To properly illustrate the benefits you can obtain with an orchestration workflow when managing your microservices, let’s take a look at a case study from Netflix.

Netflix is an enterprise company that has shifted toward orchestration workflows. The streaming service had traditionally used the choreography method, which involves peer-to-peer tasks that are tightly coupled; this became harder to scale with growing business needs and associated increasing complexities like determining what remains for a movie setup to be complete and updating their SLAs.

Later, [Netflix switched to an orchestration workflow](https://netflixtechblog.com/netflix-conductor-a-microservices-orchestrator-2e8d4771bf40) and eventually built their own container orchestration engine—Conductor—which has helped orchestrate over 2.6 million process flows, from simple linear workflows to complex dynamic workflows over multiple days.

### Why Are So Many Developers Adopting This Architectural Paradigm?

As mentioned, there are two major techniques you can use if you need to execute many services to get your desired result. Orchestration, in which a central orchestrator component serves as the coordinator and is in charge of activating each service, and choreography, in which the services perform independently and are only loosely connected.

Developers are increasingly adopting orchestration because it has significant benefits that can make development and management easier for individual microservices without compromising the big picture. However, it should be noted that microservice orchestration is not without its limitations.

## Benefits and Limitations of Microservice Orchestration

There are several benefits and challenges associated with the implementation of an orchestration workflow, many of which are related to how microservices interact with one another to achieve a business outcome.

### Benefits of Microservice Orchestration

**Central observability of process definition, status, and metrics:** The orchestration framework can capture detailed information about each executed process instance, which it can make available for analytics. This allows you to answer questions about specific instances (such as, “Where is my order?”), as well as analytical queries (such as, how many products were ordered).

**Synchronous processes:** These provide a good way to control the process flow. For example, when a product’s service needs to successfully complete before the inventory service is processed.

**Scalable orchestration on cloud-native platforms:** When you scale up these services, you scale with errors in mind. Microservice orchestration provides you with insights into your processes, helping you coordinate various transactions that involve a large number of independent services.

**Single fail point:** Orchestration workflow allows you to easily trace out any error that occurs during the process flow, figure out why it failed, and debug. Writing tests for your microservices is important to help prevent errors from making it to the live service.

### Limitations of Microservice Orchestration

When orchestrating microservices in an enterprise environment, you’ll find that some business functions can require hundreds or even thousands of microservices. Since the orchestration workflow is synchronous, it's possible that such processes will take a long time to finish.

Furthermore, as the orchestrator needs to communicate with each service and get a response before moving to the next, this makes services highly dependent upon each other. Failure at any point could cause the entire process to fail. While for some business processes this is required behavior, others might require the process to complete regardless; for instance, running analytics on an order that’s being processed shouldn’t prevent the checkout flow from being completed.

## Who Can Benefit from Microservice Orchestration?

With microservices gradually becoming the default pattern for managing business logics, a strong architecture is needed for their coordination. Adopting an orchestration workflow could improve the seamless interaction between these services.

Many businesses still implement service-oriented architectures (SOAs) orchestrated by an enterprise service bus (ESB). However, as business needs grow, adding more business logics and microservices to the system can be challenging; the entire flow is not immediately visible, making it harder to alter a service without the risk of disrupting another.

Microservice orchestration offers a solution here, as it helps you visualize the end-to-end processes across your microservices, so you know what services would be affected by your updates, allowing you to easily address your increasing business needs.

More concretely, an orchestration workflow might be ideal for you if one or more of the following are critical for your business:

- The ability to track and manage workflows from a single point.

- A user interface to visualize process flows.

- The ability to synchronously process all tasks.

- The ability to efficiently scale to a high number of concurrently running process flows.

- A queuing service abstracted from clients.

- The requirement to operate services over HTTP or other transport layers such as gRPC.

## Conclusion

In this article, you learned about the importance of keeping your microservices autonomous and flexible. You also learned about the use of microservice orchestration to effectively communicate, visualize, identify, and resolve the challenges of managing microservices.

The downside of the process of building an orchestration system that implements all of the features your business requires is that it’s rather complex and time consuming. A purpose-built framework offering scalable and low-overhead orchestration— like [Netflix’s Conductor](https://netflix.github.io/conductor/), is an open source tool that fits this purpose.

[Orkes](https://orkes.io/) is a platform that offers a fully managed, cloud-hosted version of Conductor with tiered support. Orkes builds on top of Netflix Conductor to abstract out installation, tuning, patching, and managing high-performing Conductor clusters. Learn more about Orkes and get started for free within minutes [here](https://orkes.io/cloud/).
