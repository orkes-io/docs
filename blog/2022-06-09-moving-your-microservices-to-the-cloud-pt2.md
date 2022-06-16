---
slug: Moving-Your-Microservices-to-the-Cloud—Part2
title: Moving Your Microservices to the Cloud—Part 2
authors: MohammedOsman
tags: [Netflix Conductor, microservices, monolith, cloud, workflows, 2022]
image: https://imgur.com/dLuGoby.png
---


# Moving Your Microservices to the Cloud—Part 2

Businesses must be able to provide high-quality, innovative services to clients quickly in order to meet market demand. That can be difficult if an organization’s internal architecture doesn’t offer the needed agility and speed. The tightly coupled nature of [monolithic architecture](https://www.talend.com/resources/monolithic-architecture/) can block an IT team’s ability to make changes, separate team responsibilities, and perform frequent deployments. Microservices can provide a better alternative.

In [microservices architecture](https://microservices.io/), an application is built as a collection of separate, independently deployable services that are loosely coupled and more easily maintained.

In this article, you’ll learn about the benefits of switching to microservices and what factors to consider as you migrate your monolithic application toward microservices architecture.

## Why Use Microservices Architecture?

Structuring your application as microservices offers you a range of benefits. [AWS](https://aws.amazon.com/microservices/) cites several of them, below.

<!--truncate -->

### Agility

Microservices are typically developed by a small team, between three and nine developers, who each have clearly set goals to meet. They can communicate and coordinate better than large teams, improving overall organizational performance.

### Scalability

Microservices are a collection of loosely coupled components that can easily be scaled independently of one another.

For example, say you have an e-commerce application consisting of ordering, checkout, notification, and fulfillment microservices. You’re expecting higher-than-usual traffic, and you don’t want your application performance to degrade because [you’ll lose out on sales](https://www.gigaspaces.com/blog/amazon-found-every-100ms-of-latency-cost-them-1-in-sales). You can quickly scale up the ordering microservice to respond to high demand, and when the demand decreases, you can scale back.

### Easy Deployment

Microservices architecture makes it easy for you to quickly deploy your application incrementally. You don’t need to deploy everything at once; you can gradually deploy each microservice separately and monitor your application. If something goes wrong, you can quickly roll back that microservice.

When combined with continuous integration/continuous deployment (CI/CD) pipelines, microservices architecture helps you more easily deploy and test new features. This also reduces the time to market.

In a monolith application, everything is deployed at once, which means that if something goes wrong in one part of the application, it will impact everything else. You’ll have to roll back your entire application deployment.

### Flexibility in Tools

Teams have the freedom to use the most suitable technology to develop a microservice. For example, if their microservice requires exceptionally high performance, they can use the [Go programming language](https://go.dev/). If they’re accustomed to .NET technology, they can use C#.

Microservices that use different programming languages can still communicate through protocols like [REST](https://www.redhat.com/en/topics/api/what-is-a-rest-api) or [gRPC](https://grpc.io/), or by using [message brokers](https://www.ibm.com/cloud/learn/message-brokers), which all programming languages support.

This also means organizations can hire developers experienced in different programming languages. Monolith developers are typically restricted to a single language.

### Resiliency

Because microservices operate independently, a single microservice failing won’t cause the entire application to fail. This makes the application more resilient. In a monolithic application, the failure of a single part can lead to a complete system failure.

## How Do You Move to Microservices Architecture?

If your team is planning to switch to microservices architecture, there are two main scenarios you need to consider, [according to Microservices.io founder Chris Richardson](https://microservices.io/refactoring/):

- Adding any new functionality as microservices
- Converting monolith modules into microservices

### Add New Functionality as Microservices

If you receive a new feature request for your application, develop it as a microservice. Your organization will gain the accelerated software delivery and other benefits of microservices, plus you’ll avoid introducing technical debt to the monolith that you’d need to migrate as a microservice in the future.

This scenario is straightforward, though, and won’t be the focus of this article.

### Convert Monolith Modules into Microservices

In this scenario, you have a monolith that you’d like to migrate to microservices architecture.

The safest way to do this is to gradually convert the monolith modules into microservices. You’d need to follow an evolutionary approach (gradual migration) rather than a revolutionary approach ([big-bang migration](https://www.datamigrationpro.com/big-bang-data-migration)). In software architecture, this pattern is called a [strangler application](https://microservices.io/patterns/refactoring/strangler-application.html).

For example, imagine you have a module in your e-commerce monolith that performs both checkout and payment handling:

![Checkout and payment module](https://i.imgur.com/M1VJu2E.png)

You’d like to convert it into two microservices. To do that, you can follow a [six-step process](https://microservices.io/refactoring/) proposed by Chris Richardson.

_Note: This example uses two modules for simplicity, but you can generalize it to as many modules as you need._

#### Step 1: Review the Status Quo

First, review your application modules to understand the code and database dependencies.

Say you analyzed the monolith and found a checkout and payment module and an e-commerce database (which holds different application data such as customers, deliveries, and notifications), as shown below:

![Step 1: Status quo](https://i.imgur.com/Bg4zynF.png)

#### Step 2: Split the Code

Split the code of the checkout and payment module into two different modules. The code split will span API controllers, domain objects, common infrastructure logic, and business logic. 

Your architecture should look like the image below. The checkout and payment module will be split into a checkout module and a payment module:

![Step 2: Split the code](https://i.imgur.com/Qdtsprp.png)

#### Step 3: Split the Database

Splitting the microservices’ databases is necessary to ensure information hiding, in which each microservice handles its own data storage and retrieval. This is a difficult endeavor, and there are [many patterns](https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/ch04.html) and techniques to consider, depending on the nature of your database.

After this step, your architecture should look like the following:

![Step 3: Split the database](https://i.imgur.com/dDHRHe0.png)

#### Step 4: Define the Standalone Service

You need to define your modules as standalone microservices. This enables you to independently develop, test, and deploy each service.

Say that you decided to start by defining the payment module as a standalone service. To do that as safely as possible, you’d need to keep the original payment module in the monolith (more on this in step 5).

After defining your payment module as a standalone service, your architecture should look like this:

![Step 4: Define standalone service](https://i.imgur.com/A8KeLeW.png)

#### Step 5: Use the Defined Standalone Service

It’s time to test your new service. The best way to do this is to use a [canary deployment pattern](https://octopus.com/docs/deployments/patterns/canary-deployments). In other words, route a small part of the production traffic to the new payment service (say 10 percent of users) and keep the rest (the remaining 90 percent) with the original module in the monolith. With this approach, you’ll mitigate the risk of your microservice failing.

Keep monitoring your new payment microservice in production and resolve any issues for this small group of users. With time, your new microservice will mature and you’ll be able to route more users to it until you reach 100 percent usage. Your architecture should look like this:

![Step 5: Use the defined standalone service](https://i.imgur.com/naiIbDu.png)

_Note: Several workflow orchestration tools enable you to implement the canary deployment pattern, such as_ [_Kubernetes_](https://phoenixnap.com/kb/kubernetes-canary-deployments)_._

#### Step 6: Remove the Obsolete Service

Once you’ve verified your new payment microservice and routed all users to it, you can ditch the monolith payment module to make your codebase cleaner. Your architecture should now look like the following:

![Step 6: Remove service from monolith](https://i.imgur.com/woynj7h.png)

#### Repeat for Every Module

You’ll need to repeat steps 4-6 for every module in your monolith until you fully achieve a microservices architecture. Your final architecture should look like this:

![Final architecture](https://i.imgur.com/gyeS8qQ.png)

### Workflow Orchestration

After you’ve migrated your application to the microservices architecture, you’ll need to have a mechanism to orchestrate your microservices. Orchestration refers to the process of monitoring, debugging, visualizing, scaling, and managing the state of the microservices. Tools to implement this orchestration include [Netflix Conductor](https://netflix.github.io/conductor/), or [Orkes](https://orkes.io/) for a cloud-hosted service.

## Conclusion

The microservices architecture offers multiple benefits to developers. If you’re planning to migrate your applications to microservices, there are concrete steps you can take to achieve this as smoothly as possible while still maintaining a good user experience (UX).

However, using microservices can introduce [other challenges](https://developers.redhat.com/articles/2022/01/25/disadvantages-microservices), such as greater complexity and the need for high-quality orchestration. You’ll need to analyze your organization’s [current status and business goals](https://docs.microsoft.com/en-us/azure/architecture/guide/technology-choices/microservices-assessment) to decide whether you’re ready to make the switch.

If you are ready to migrate to microservices architecture, consider [Orkes](https://orkes.io/). The cloud-hosted version of Netflix Conductor enables you to build and orchestrate stateful workflows across your microservices. It works with on-premise and cloud applications, and it helps you quickly scale up or down as needed. [Check the documentation](https://orkes.io/content/) to see how Orkes can improve your microservice projects.
