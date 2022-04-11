---
slug: hybrid-cloud-architecture
title: Hybrid Cloud Architecture
authors: nikhilajain
tags: [microservices, cloud, hybrid cloud, 2022]
image: https://i.imgur.com/xLpMrqW.jpg
---

# Hybrid Cloud Architecture

A 2020 survey by the research and advisory firm Gartner has highlighted the rapid pace of innovation in [cloud computing](https://www.gartner.com/smarterwithgartner/gartner-predicts-the-future-of-cloud-and-edge-infrastructure). According to the research, forty percent of enterprise solutions will host their applications on cloud infrastructure by 2023. This shifting trend will cause an increased demand for cloud services, as well as for hybrid cloud architecture.

The [hybrid cloud](https://en.wikipedia.org/wiki/Cloud_computing#Hybrid_cloud) is gaining popularity as enterprise IT leaders seek flexible, scalable options that increase cost efficiency while maintaining control over enterprise data and information. Many organizations combine on-premise infrastructure with private/public cloud resources to meet these needs. 

But without the right strategy, hybrid clouds can pose a number of challenges. Through a hypothetical case study, this article will help you learn about the strengths and limitations of hybrid cloud architecture.

<!-- truncate -->

## What Is Hybrid Cloud Architecture?

Hybrid cloud architecture is a mixture of two or more environments consisting of public and private clouds, on-premise and even edge environments, which work in tandem to run your apps and workloads. While one service might be more suitable for providing security or compliance, an additional one may come into play for elasticity, agility, performance, and cost efficiency.

To understand this further, let's take an example of a fictional shipping company—Get My Shipment. The business manages shipments and deliveries.

## Get My Shipment: A Hypothetical Case Study

The company is undergoing a cloud transformation process. Let's first look at the existing on-premise infrastructure.

### The On-Premise App

The shipping company’s on-premise setup includes an application that allows them to manage shipments and makes sure that deliveries can be made on time. The on-premise application also stores customer-related data and is GDPR compliant.

You can see that users interact with the on-premise application for shipment tracking and managing and also accessing customer-related data. 

![On-premise application](https://i.imgur.com/jQPiXTc.png)

As the company wants to extend the infrastructure and add capabilities, it has to upgrade to a bigger infrastructure and maintain it, and also hire more engineers. Doing so will have associated cost implications. The downside of carrying out this expansion without using cloud infrastructure, is that it lacks flexibility and scalability and is highly cost intensive. 

### Moving to Cloud Infrastructure

To expand the business, the company wants to add a new mobile app for real-time tracking and integrate chat bots to support a larger user base.

The company thus evaluates the options to migrate to a public cloud. The primary concern is that migration should be governed by the company’s own policies. Specifically, Get My Shipment stores customer-centric data and therefore has to adhere to the data protection rules under the GDPR.

Consequently, the company opts for a hybrid cloud setup. It chooses to continue the use of the on-premise app for hosting customer-specific data, while other parts of the application are migrated to a public cloud.

![Hybrid cloud architecture](https://i.imgur.com/gGgdSyU.png)

You can see in the diagram above that the public cloud has a mobile app through which the users interact to get shipment tracking information. With a public cloud offering, Get My Shipment also has a chat bot integration that handles customer queries related to issues like shipments and invoicing. 

### How Does Hybrid Cloud Infrastructure Help Get My Shipment?

With hybrid cloud infrastructure, the company can leverage the benefits offered by the public cloud. These include:

#### Flexibility

Managing and maintaining in-house IT infrastructure can be time- and cost-intensive. Cloud architecture can provide Get My Shipment with IT resources as and when required.

The company can choose to add/release the resources based on their needs. These needs can sometimes be location-specific, and in that case, the distributed infra setup provided by cloud architecture can play a vital role, offering location-specific resource management.

#### Scalability

Get My Shipment is likely to experience seasonal spikes. For example, there could be more shipments over the Christmas period, as this is when people tend to send gifts. The Get My Shipment application might see more traffic on shipment tracking and there could also be more interaction with customer support.

To meet the demand, cloud architecture can provide auto-scaling, where the rules to scale the infrastructure up or down can be defined. As the company doesn't have any scalability options as part of its in-house infrastructure, cloud architecture can provide resilience to deal with these known or unknown application loads by quickly adding new instances to the existing infrastructure.

#### Cost Savings

There is currently no way for Get My Shipment to scale the in-house infrastructure up or down on demand. If they choose a lesser configuration server, the availability of their application is likely to suffer. If they choose a higher configuration server, they might incur more cost. Even if they choose an optimum configuration, there will be scenarios where they could either lose on efficiency or incur more costs.

Many public cloud providers can offer a range of cost-efficient options. For example, Microsoft Azure over Amazon Web Services both provide a pay-as-you-go option, where billing is calculated only on the resources used. This could provide Get My Shipment with the scope to manage infrastructure when demand increases/decreases.

Cloud providers also offer a variety of instances, such as spot or reserved instances, which can lead to significant savings. For example, with spot instances, Get My Shipment can request the unused portion of an instance. The company will be allocated a spot instance if their bid exceeds the spot price, assuming the capacity is available. Spot instances are also more affordable, as they tend to be offered at largely discounted prices. For example, [Amazon’s Spot Instances](https://aws.amazon.com/ec2/spot/) claim to be 90% cheaper than on-demand prices.

However, the flexibility, scalability, and cost savings offered by cloud infrastructure come with certain trade-offs which will be discussed below.

### What Are the Challenges of Hybrid Cloud Infrastructure for Get My Shipment?

While hybrid cloud infrastructure comes with several advantages, Get My Shipment should also consider the challenges of this type of infrastructure and how to mitigate them. 

#### Barriers in the Migration Process

Cloud infrastructure can provide a virtual environment for Get My Shipment. With their code running on a virtual environment, migrating from one provider to another should be easy. Portability is the key advantage of cloud, as it reduces dependency on the underlying hardware, platform, and tools.

That said, Get My Shipment’s IT infrastructure is an independent entity, so setting up on the cloud is not guaranteed to be easy. Every provider has a set of rules/ways in which their infrastructure is set up, like auto-scaling groups, threshold configurations, connection settings, and so on. 

The reality is that migrating from one cloud provider to another could be more challenging than anticipated, and Get My Shipment, like most companies, faces the prospect of vendor lock-in.

#### Vendor Lock-In

Vendor lock-in describes a situation in which Get My Shipment may become constrained to a single cloud provider. Technically the company can leave the cloud service. The most important factor for a business is understanding the cost of switching to another cloud provider. Integration with a cloud provider comes with many specific services and features and the way services/features are integrated varies by provider. Thus, many businesses end up sticking with their original provider due to the cost of switching or the fear that they will lose specific features if they switch.

For example, Get My Shipment—a heavily data-reliant company—may choose its cloud provider based on its provision of database management. Over time, they may realize that there are some flaws in this feature, and consequently want to switch to another vendor. However, if moving a complete application to a new cloud environment proves time and cost-intensive, Get My Shipment might be discouraged from doing so, despite better and cheaper providers being available.

With hybrid cloud architecture, however, the company has the flexibility to integrate with different providers, and design and build the applications that could support different providers if need be. 

Hybrid cloud architecture allows for the distribution of applications/data/services on-premise and across private or public cloud or using a combination of public cloud providers. Ideally, Get My Shipment can utilize Microservice Orchestration to integrate with different cloud providers. An orchestrator reduces complexities of managing multiple cloud providers as it can communicate with multiple cloud providers at same time. This flexibility allows deployments of some of the services on *CloudA* while others are deployed on *CloudB*. It helps in visualizing cost metrics as well. For example, microservice A is memory intensive and the instances with large memory size are available with CloudA in which case you would want to use CloudA for microservice A deployment. Similarly, microservice B requires high end computing and thus needs large computing instances which are available with CloudB at an affordable price and so you would want to use CloudB for microservice B. With an orchestrator in place you can manage these multiple cloud providers, and thus avoid vendor lock-in.


There are multiple cloud providers to choose from and [microservice architecture](https://en.wikipedia.org/wiki/Microservices) makes it efficient to interact with different applications hosted on different platforms. It also makes applications compatible for hosting on different cloud platforms.

Design applications in such a way so that they can be easily moved from one cloud service provider to another.

By being aware of the benefits and downsides of hybrid cloud architecture, Get My Shipment can get the most out of adopting a hybrid approach.

## Who Should Consider Using Hybrid Cloud Architecture?

As you saw with our fictional company, business expansion, acumen, and time requirements showed the need for a hybrid cloud setup. You should also consider hybrid cloud architecture if any of the following are priorities for your application:

- **Security:** For example, if you are a financial institution or a bank where data security is of prime importance, and you want to keep the data behind a firewall and store it on-premise, even if your offices are distributed across locations. The cloud is also a secure place, but some country- or data-governing laws don’t allow the data to leave the country; in this case, on-premise data storage is the best option, combined with public/private cloud for evolving functionality.

- **Connectivity:** For example, you are a stock trader provider and the application provides real-time stock prices, buying/selling, and so on. In this scenario, a user accesses the trader app, which hits a private endpoint. The private cloud endpoint authenticates the user, then provides portfolio details and options to buy/sell/see stocks. User requests to buy/sell/see stocks hit the private endpoint, which requests the real-time stock prices from the stock exchange/stocks real-time data providers hosted on a public cloud. The private and public cloud interactions happen through a point of presence (PoP) that is generally provided by the public cloud service, and with this you get much higher bandwidth capabilities without losing out on the real-time data.

- **Modernization:** When you are using monolith applications that are tightly coupled to the platforms and interconnecting points, it becomes challenging to scale. You might want to deconstruct the application, taking one component out at a time and moving it to a microservice architecture. Microservices are an independent unit designed to perform a business function, allowing you to leverage the scalability provided by the public cloud. With hybrid cloud you get opportunities to modernize one part of the application and deploy it on the cloud, whereas the other parts of the application are still using the old infrastructure. Thus, hybrid cloud gives you an opportunity to slowly and steadily move your monoliths to microservices.

To get the best out of microservices in a cloud environment, microservice orchestration is essential.

## Microservice Orchestration

Although an orchestra involves many musicians independently playing instruments, it’s not an orchestra without the guiding force of a conductor, or orchestrator.

This is how microservice orchestration works. In simple terms, you need to have a central service that orchestrates and calls all the services directly. The service acting as an orchestrator gives you a high-level view of all your business processes and their execution. 

With a loosely coupled architecture, it becomes very difficult to pinpoint what is failing or visualize how the workflow is progressing. But with a microservice orchestration pattern, you should be able to track the failure quickly, fix it, and see the execution of the workflow in the cloud console, giving you a complete picture. 

Designating a microservice as an orchestrator with the sole purpose of orchestrating other microservices is the best way forward to microservice orchestration.

### How Can Microservice Orchestration Simplify the Development of Hybrid Cloud Architecture?

Visualization of your system’s behavior, scale, and needs is an important part of designing a hybrid cloud architecture. You can only design an optimum architecture with sufficient supporting data. In aid of this, microservice orchestration can pave a path of visualizing integration points and workflow progression, giving you an advantage in designing robust hybrid cloud architecture for your system.

Going back to our fictional Get My Shipment company, let’s see how they would make use of microservice orchestration. The orchestration framework designates a service as the orchestrator, which accepts tasks and hands them over to the microservices to process them. 

Whenever a shipment request is created at Get My Shipment, the orchestrator creates a task queue and the microservices will pick these tasks and work on them, communicating on the status of the tasks with the orchestrator. As our orchestrator is a centralized service, it stores its own data so that, if the process is halted or fails, it can resume from the same point. 

You can visualize the workflow of shipments, the delays at different stages and the infrastructure requirements. For instance, if delays in sending text updates to customers are because the SMS service is running on a smaller instance, Get My Shipment can quickly bump up the instance specs to rectify it. 

This is how Get My Shipment, or anyone else migrating to a hybrid approach, can use the benefits provided by microservice orchestration to design and build optimum, scalable hybrid cloud architecture.

The following are some key benefits that microservice orchestration offers which can help you make calculated design decisions for building a hybrid cloud architecture:

### Benefits of Microservice Orchestration

The core strength provided by microservice orchestration is the level of abstraction where each layer exposes an interface to connect with. This creates a multi-layered hierarchical stack where each microservice is very well confined in its boundaries. This hierarchy offers different opportunities that developers can leverage to build robust hybrid cloud architectures:

- The hierarchy offers an opportunity to have intentional design for your systems. That is, it provides architectural readability. With this in place, developers can look at the workflows and identify which infrastructure is best, not only in terms of process efficiency but also in terms of suitability in achieving business objectives. 

- With the intensive tracking provided by the orchestration, you can visualize the problems and where they are occurring. Your business can then take informed decisions on which infrastructure is best suitable to resolve the issues.

- Microservice orchestration also supports multi-vendor association, enabling you to design your hybrid cloud architecture to support multiple public cloud providers.

#### Why Choose Orkes for Microservice Orchestration?

[Orkes](https://orkes.io) offers a orchestration engine that handles microservice orchestration and also provides the benefits listed above to quickly gear up your hybrid cloud setup. 

[Orkes Conductor](https://orkes.io/what-is-conductor/) is a managed workflow orchestration tool best suited for microservices. It has been adopted widely across industries, from media to finance (supporting financial and distributed transactions). It uses a domain-specific language (DSL) to define the process flow, and is a well-established high-performance tool (as tested for high volumes at Netflix for concurrent processing). It uses [chaos engineering principles](https://en.wikipedia.org/wiki/Chaos_engineering) to build robust and highly scalable systems.

## Conclusion

This article illustrated the key benefits of moving from on-premise to hybrid cloud architecture using the hypothetical case of the Get My Shipment company. In short, hybrid cloud architecture can provide the best of both worlds, allowing you to build on the efficiency and leverage the flexibility and scalability of cloud architecture, as well as modernize your monolithic applications, without moving completely away from your on-premise infrastructure.

In this context, microservice orchestration is important to strengthen your application and utilize the flexibility and scalability offered by hybrid cloud architectures. Orkes is a cloud-based, enterprise-grade, fully managed version of [Netflix Conductor](https://netflix.github.io/conductor/) built on a task-based approach to coordinate and execute process flows, and offers full compatibility with the open source version. 

If you want to get the most out of your hybrid cloud architecture and microservices, then get ahead of competition with microservice orchestration offerings provided by [Orkes](https://orkes.io/).
