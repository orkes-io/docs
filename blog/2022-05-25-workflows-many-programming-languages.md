---
slug: workflow-orchestration-many-programming-languages
title: Microservice and Workflow Orchestration with Multiple Languages
authors: Shweta
tags: [Netflix Conductor, microservices, programming, languages, workflows, 2022]
image: https://imgur.com/pYtt6Ky.png
---


# Microservice and Workflow Orchestration with Multiple Languages

In large applications consisting of [loosely coupled microservices](https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/), it makes sense to design the internal architecture of each microservice to suit its function rather than adhere to a single top-down architectural approach. 

By design, each microservice is an independent entity that has its own data as well as business logic. So it’s intuitive to use a design approach and architecture that’s best suited to its requirements, irrespective of high-level [microservices architecture](https://www.bmc.com/blogs/microservices-architecture/). However, detractors would like you to believe that using multiple languages should be avoided as it adds unnecessary complexity and overheads to microservices operations.

But there are multiple use cases where multilanguage architecture makes sense, and technology can be used to efficiently manage the overheads introduced. In this article we will unpack:

* When to build multilanguage microservices.
* The challenges introduced in microservices communication due to the use of multiple languages.
* Some tools and techniques to make multilanguage microservices implementation easier.
<!--truncate -->
## Why Choose Multilanguage Microservices?

In a multilanguage microservices architecture, each microservice is built on a technology stack that suits its requirements the best, irrespective of the internal architecture of other microservices. 

The choice of language and frameworks must be justified on the basis of factors such as which technology would be the best for the services being built, the experience and expertise of your engineers, the demands of your business logic, etc. The following are some of the most common reasons for choosing multilanguage microservices architecture:

### To Leverage Languages and Frameworks For a Specific Task

Expert coders and designers often use the tools at hand to solve a problem, even if these are not the best tools for the job. However, using ill-fitting tools to reach a solution can be time-consuming and waste significant resources. 

Rather than making suboptimal tools work just because they’re part of your technology stack, it makes more sense to seek out and deploy technology that suits your business needs. For instance, a microservice that implements artificial intelligence or machine learning is better off using Python or R, rather than C#. Or, a microservice with a CPU-intensive workload should consider using Golang rather than Node.js.

### To Retain Technical Flexibility 

New tools and technologies are being developed every day for specific types of work, and such tools are easier to adopt when you’re already using a multilanguage microservices environment. 

By design, microservices are independent of each other. However, having a multilanguage ecosystem already in place gives you the freedom to choose new languages and frameworks with even less friction.

### To Better Suit Developer Skills

When your organization employs multilanguage microservices architecture, recruiting, onboarding, and retaining engineers is much easier; candidates with the appropriate skills need not be disregarded just because they’re not well-versed in the languages or frameworks you use. 

In addition, when you give your engineers freedom to choose the tool or technology of their liking—assuming the fit has been justified—they’ll be motivated to take ownership, innovate, and think outside the box.

### For Easier Updating or Migrating of Legacy Applications

If you’re adding new services to the legacy system, or partially or fully migrating it, you’ll likely opt for a new technology stack (or multiple stacks) to make it easier to assemble the development team. 

In this scenario, using multilanguage microservices for your application means you’ll have more options to pick the right tech stack for your business logic and more easily find developers with the relevant skills, as you’re not restricted to candidates proficient in one specific language.

### For Flexibility on Database Use

The database that you use for your microservices can play a large role in your choice of language because different types of databases require different languages. If you’d like to give your teams freedom to choose a database that suits their service the best, using a multilanguage architecture would mean that you don’t need to worry about whether the database they choose can be handled by your existing tech stack. 

## Drawbacks of Applying Multilanguage Microservices 

Everything comes with a cost, and using multiple languages for microservice development is no different. Too many programming languages, technology frameworks, and databases working together primarily raises two challenges:

1.  **Communication between the microservices:** When the same tech stack is being used for all the microservices that make up the application, creating APIs for communication between the microservices is relatively straightforward. When using multiple languages, the number of APIs needed for internal communication can rise dramatically. This will be discussed in more detail in the context of workflow orchestration later in the article.
2.  **Maintenance:** All the languages, frameworks, and database technology need to be well-maintained. You need to update libraries, install new bug fixes, and develop APIs for internal communication. As the number of languages increases, [maintenance challenges grow](https://developer.ibm.com/articles/challenges-and-benefits-of-the-microservice-architectural-style-part-1/) at a faster rate.

Besides this, using multiple languages means you cannot share and reuse common code. Rewriting the same code for different languages can be very time consuming, even if the business logic is the same.

You must weigh the pros and cons of multilanguage microservices architecture carefully before deciding whether it’s appropriate for your application.

## Workflow Orchestration with Multiple Languages

![Rough architecture diagram of API for multilanguage microservices](https://i.imgur.com/Y3Rl9GZ.png)

There is no denying that microservices make it easier to develop, test, deploy, and maintain applications. But, at the end of the day, they also need to implement the business logic workflow, not just make developers’ lives easier. A distributed microservices-based application has many moving parts that must interact and communicate with each other to implement this workflow. 

Typically, microservices can communicate with each other internally via choreography or orchestration techniques. However, for an application that is complex or large, it’s better to orchestrate the workflow via a central orchestrator that:

* contains the end-to-end business logic,
* issues commands to the microservices to execute the business logic, and
* acts according to the response received from worker microservices.

The orchestrator executes the APIs required for communicating with each microservice. As the number of languages increases, so does the number of APIs needed. If this is not done in a scalable way, workflow orchestration may prove to be a choke point for the application. 

However, orchestration tools that support multiple languages concurrently are at varying stages of development and most have yet to fully mature.

## Tools That Facilitate Multilanguage Microservices Architecture

This section highlights some tools that have been developed to solve the internal communication and workflow problems of multilanguage microservices architecture, which cannot be handled by established frameworks like REST and RPC.

### Protocol Buffers

[Protocol Buffers](https://developers.google.com/protocol-buffers), or Protobuf, is a language-independent and platform-neutral data encoding tool developed and maintained by Google. It’s well-suited for internal communication between microservices developed using different languages because its messages include the set of rules for defining and exchanging those messages. It supports a wide range of structured data types. Hence, when you know the internal schema, exchange of data between the microservices becomes super fast and straightforward using Protobuf.

Protobuf supports multiple languages, such as Java, Python, C, C++, Go, Ruby, and more. However, it’s not written in a human readable format, like JSON.

### gRPC

[gRPC](https://grpc.io/) is another alternative you can consider when designing the API for internal communication between your multilanguage microservices. Developed by Google and used extensively by Netflix to scale its services, gRPC is a framework to implement the standard RPC procedures via protocol buffers and HTTP/2. When using gRPC, developers just need to describe the schema, and code is automatically generated in multiple languages, such as Java, Python, Go, C++, Dart, Objective-C, and more.

gRPC supports bidirectional streaming and makes internal communication compact and fast. However, it’s a relatively immature framework and has a steep learning curve. It also has limited browser support. Nevertheless, as long as you only use it for internal communication between polyglot services, you should be good to go.

### Swagger Codegen

API coding is backbreaking work that must be done because it’s essential for communication between the different microservices that make up an application. [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) is a collection of tools that enables your developers to generate server stubs, client SDKs, and API documentation automatically from OpenAPI definition. Its editor enables you to take a design-first approach to developing APIs. 

The API specs developed using the editor can generate boilerplate server code in more than twenty languages, including Java, Ruby, Scala, Python, Go, and more. The latest release supports OAS 3.0.

OpenAPI is language agnostic and hence easier to adopt, but developers must familiarize themselves with [OpenAPI best practices](https://oai.github.io/Documentation/best-practices.html) to make the most of it. Further, because so many languages are supported, developers also need to figure out the tools and utilities that would work best with each language for their unique scenarios.

## Choose a Tool That Best Fits Your Needs 

This article explained how workflow orchestration becomes even more challenging in multilanguage microservices architecture; in short, the more languages the microservices use, the more APIs are required. However, using tools like gRPC enables developers to automatically generate code simply by describing and defining the API interface.

Any API development tool that you decide on will have its advantages and limitations. You need to choose one that fits your needs the best.

When it comes to workflow orchestration success, [Netflix Conductor](https://orkes.io/content/blog/the-genesis-of-netflix-conductor-orkes) is the most popular success story in recent times. It was developed by Netflix engineers as a language-agnostic workflow orchestration tool that also worked well with their legacy application, but has now been adopted by thousands of other organizations for mission-critical applications. 

[Orkes Cloud](https://orkes.io/cloud/) is a fully managed Conductor service delivered as a hosted service. When you use Conductor via Orkes Cloud, your engineers don’t need to worry about setup, tuning, patching, and managing high-performance Conductor clusters. It’s a fully secure service that can scale seamlessly according to your needs. You can start with the free plan to try it out and then pay as you go.
