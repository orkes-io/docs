---
slug: distributed-scheduler-in-conductor
title: Distributed Scheduler in Conductor
authors: riza
tags: [Netflix Conductor, orchestration, distributed scheduler]
---

Applications have become an integral part of enterprises in today’s digital world. An efficient application is critical for businesses of all sizes to keep up with today's fast-paced world. A critical part of an application’s lifecycle is scheduling, where you need to run the application at regular intervals to maintain optimal performance and reduce runtime. However, businesses often rely on an external scheduling system to run them at a regular cadence, which increases the implementation complexity and business cost.

<p align="center"><img src="/content/img/distributed-scheduler.jpg" alt="Distributed Scheduler in Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

**What if there is a way to build and schedule apps on a single platform?** Sounds exciting? Yes, with Orkes Conductor, you can! 

Orkes Conductor, built on the battle-tested Netflix Conductor, is a cloud-based platform for building reliable and distributed applications. In this blog post, we’ll look at how Orkes Conductor can run schedules at a regular cadence.

## Conductor for Building Distributed Applications

Before getting into scheduling applications, let’s have a quick look at how applications can be built using Orkes Conductor.

Conductor delivered by Orkes is a powerful tool for building distributed applications. Applications are built as workflows in Conductor, where you combine several individual blocks, called tasks, to complete the application. You can custom-tailor your applications to sync with your business requirements. 

Studies indicate that 70% of an app development time is spent on technicalities such as wiring and managing flow reliability, error handling, observability, etc. With advanced functionalities such as native error handling, language-agnostic, hybrid cloud, stateful serverless, etc., a perfect app-building tool like Conductor can bring this down to 10%. 

In Conductor, apps can be built in 3 ways: directly from Conductor UI, using JSON, or any programming language of your choice. Whether you need to build a simple or complex application with multiple dependencies, Conductor’s app-building capabilities make it a versatile and powerful tool for businesses looking to streamline their application management.

## How does Conductor Scheduler work?

You may want to run your application at a regular cadence depending on your requirements. Conductor’s Scheduler allows you to schedule the execution of your application (workflow) at regular intervals using a Cron Expression. The schedules can be easily set up and managed directly from the Conductor UI, where you can define the cron expression, choose the application (workflow) to be run, and specify fixed inputs if required. You can even view the upcoming scheduled runs. The Scheduler is also seamlessly integrated with Conductor’s core functionalities, such as workflow versioning and task to domain mapping. 

A scheduler is helpful when an application needs to be run at regular intervals, such as every hour, week, month, or year. It can also be used to run the same application at different times using different fixed inputs. Additionally, the scheduler can run at a cadence between a set start date and an end date. You can even schedule overlapping runs, where the same workflow can be run at multiple schedulers based on the requirement. 

Conductor’s scheduler is highly flexible and scalable, allowing you to edit an already running scheduler, and pause/resume it as needed. Users can also fetch detailed information about scheduler executions, including execution time, status, failure reason, error details, and more. A culmination of all these Scheduler features makes Conductor an invaluable tool for all your automation needs. 

## What are the Industrial Applications of Scheduler?

The scheduler has become an indispensable tool across various industries such as IT, healthcare, logistics, finance, manufacturing, etc.

<p align="center"><img src="/content/img/scheduler-applications.jpg" alt="Industrial applications of scheduler" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

In the software development industry, schedulers can automate the testing and deployment process, reducing the time and resources required for these activities if carried out manually.

In healthcare, schedulers can be used to automate processes such as appointment scheduling, sending appointment reminders, and delivering lab reports to patients. 

In sectors like logistics, it can be used to schedule delivery and track shipments. 

The finance industry has extensive use cases where schedulers can automate financial transactions, such as payment processing, invoicing, or other critical financial activities. It enhances accuracy by reducing errors and increasing productivity.     

In the manufacturing industry, schedulers can streamline the production process by automating the execution of various processes at required intervals. 

A scheduler can also be leveraged for automating common tasks such as the onboarding process, invoice generation, and other administrative tasks, reducing manual effort and increasing efficiency. 

## In a nutshell

The Scheduler’s flexibility and scalability allow you to run your applications at regular intervals seamlessly. Industries across the board can benefit from the automation capabilities offered by the Scheduler, reducing manual intervention and increasing efficiency.

Now, why the delay? Try out [Orkes Cloud](https://orkes.io/cloud/) - a fully managed cloud version of Netflix Conductor,  to experience the magic of seamless collaboration and unparalleled productivity. Say goodbye to other scheduling tools and start building and [scheduling](https://orkes.io/content/docs/reference-docs/scheduler) your applications with Orkes Conductor.

Reach out to our [Slack community channel](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW) for any queries.  
