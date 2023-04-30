---
slug: long-running-workflows
title: Long Running Workflows
authors: riza
tags: [Netflix Conductor, orchestration, subscriptions, orkes, orkes cloud]
---

<p align="center"><img src="/content/img/subscription-expiry-mail.jpg" alt="Subscription expiry mail received" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Automating Long Running User Subscription Workflows Using Conductor

**Uh-oh, your membership is expiring!**

Emails with similar subjects hit up our inbox every month. Whether you’re a subscriber to monthly food boxes, streaming services, or online courses, they are all long-running processes that can run for an indefinite period of time. 

With the recurring payment industry set to experience booming growth in the coming years, businesses in emerging markets still face challenges in effectively processing subscription payments. In order to overcome these obstacles, enterprises look for solutions that could automate their subscription renewal process. A microservice orchestration platform like Conductor can help in automating your subscription processes. 

This blog post primarily focuses on how you can utilize Conductor as BaaS, which aids in managing your long running subscription workflows. 

Let’s delve deeper into the fascinating properties of Conductor that makes it best suitable for handling your subscription workflows.

## Subscription Workflows 

<p align="center"><img src="/content/img/subscription-workflows-explained.jpg" alt="The Subscription Workflow" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

A subscription workflow begins when a user subscribes to a product/service on a monthly/annual basis. Once the stipulated time period is over, the subscription is to be renewed. For this, a renewal email will be sent to the user, including the payment details and a cancellation option. The payment will be processed if the user decides to renew and stop if they choose to cancel.  On renewal, this process would run again after the stipulated time period, and the process continues indefinitely until canceled by the user. 

The business logic of this use case is simple, however; the practical implementation must be fault-tolerant.

Implementing a subscription can face several challenges, including payment failures due to banking problems and email delivery failures caused by server issues. It’s also vital to ensure that the failure of a single user subscription doesn’t impact the entire system, as multiple user subscriptions need to be managed effectively.

Let’s see how Conductor can automate this as a fault-tolerant process!

## Conductor Workflow for managing Subscriptions

Before beginning the workflow, you need to set up the Conductor server. It can be set up [locally](https://orkes.io/content/docs/getting-started/install/running-locally-docker), or you can utilize the [Orkes Cloud](https://orkes.io/cloud/) version. To test the Conductor in real-time, we offer Conductor [Playground](https://play.orkes.io/), a free tool from Orkes.

For illustration purposes, let’s consider a monthly subscription use case, where the membership is to be renewed every 30 days. The Conductor workflows are built by combining a series of blocks referred to as tasks. The tasks are orchestrated in a defined order to complete the workflow. 

|[Subscription Workflow](https://play.orkes.io/workflowDef/Subscription/1)|
|---|

<p align="center"><img src="/content/img/subscription-workflow.jpg" alt="Subscription workflow from Conductor" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

* The workflow begins when a user subscribes to the service and completes the initial payment. 
* The payment process goes through another series of steps, including choosing the payment method, processing the payment, payment gateway, checking the transaction, retrying the transaction if failed, & refund failed transactions. These steps are included as another workflow and called into the existing workflow using the concept of [sub-workflow](https://orkes.io/content/docs/reference-docs/sub-workflow-task). The payment workflow, which is called as a sub-workflow here, looks like this:
<p align="center"><a href="https://play.orkes.io/workFlowDef/payment_for_subscription"><img src="/content/img/payment-sub-workflow.jpg" alt="Sub workflow for payment processes" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></a></p>

* Next, the workflow should wait for the renewal process. The workflow remains in the waiting period throughout the renewal process. Depending on the subscription mode, the waiting period extends to months or even years. A wait task is utilized for the wait period. Here, we’ve set the wait task to wait until 23 days.
* Once the renewal date approaches, an email notification is sent to the users regarding the renewal/cancellation. The wait period is set to 23 days, and the email notification process is set to 7 days, which makes a total of a 30 day subscription period.  The process of email renewal is again handled via a sub-workflow, where an initial email is sent on the last week of renewal which waits for two days. After that, a reminder mail is sent that waits for another two days. And the final reminder mail is sent on the last day. You can change the 30 day wait period based on your requirements. 
<p align="center"><a href="https://play.orkes.io/workFlowDef/email_for_renewal"> <img src="/content/img/renewal-email-sub-workflow.jpg" alt="Sub workflow for email renewal processes" width="60%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></a></p>

* Then a switch case is used to evaluate the user’s response, and the payment is completed if the renewal is processed. Otherwise, the workflow is terminated after sending an email notification to the users.
* If the membership is renewed, the workflow starts again from the wait period, and the process continues. Here we have utilized the [start workflow](https://orkes.io/content/docs/reference-docs/start-workflow) concept, where the same subscription workflow with a different version is started. The reason for starting with a different version is that, after renewal, the workflow needs to start only from the wait task; hence we have versioned that and utilized the workflow versioning concept here.
<p align="center"><img src="/content/img/subscription-workflow-versions.jpg" alt="Versioning of Subscription workflows" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Making your Subscriptions Fault-Tolerant with Conductor 

Now that you're acquainted with the workflow for handling subscriptions. Let’s see how Conductor helps to make it fault-tolerant.

### Exponential retry policy

The probable questions that you might have could be:

*“How do we handle workflows when the task fails?”* 
*“Will the workflow stop if any of the tasks fails?”*

The answer to all these queries is that Conductor is capable of handling retries on its own. The tasks can be configured to automatically retry if it fails using several retry parameters where you can provide the number of retries, the time in seconds after which the next retry should occur, and so on. So even if any of your tasks in the subscription workflow fails, it retries itself, thus ensuring that your business operations continue seamlessly.

### Scalability

Business requirements change and evolve over time. Here comes the next foremost feature of Conductor; scalability, where you can scale your workflow in accordance with your business requirements. That means, whatever be the changes to your subscription processes, you have the flexibility to effortlessly scale your workflows to accommodate them.

### Code in your preferred language

Whether you prefer Java, Python, Go, C#, Typescript, or Clojure, you can implement your business workflow in any language of your choice. With Conductor, you even have the flexibility to orchestrate workflows across diverse language environments.

### Ability to run thousands to billion of workflows a month

The capability of Conductor to [scale up to billions of workflows per month](https://orkes.io/content/blog/running-a-billion-workflows-per-month-with-netflix-conductor) is genuinely remarkable. With this, managing user subscriptions becomes a simple task. No matter how many users you have, Conductor can effortlessly handle all your subscription workflows without any hassle.

### Sub-Workflows for repeated execution of tasks 

The subscription workflow includes certain activities like payments and email renewal, which contain a bunch of steps to be executed separately. Using sub-workflows, you can create such activities as individual workflows and then call them as sub-workflows within your main workflow. This approach simplifies the complexity of the workflow, streamlines the run-time, and enhances overall efficiency. 

### Workflow versioning

Another critical aspect of Conductor is the ability to version workflows. In the context of the subscription process, it is necessary to rerun the same workflow for each renewal cycle. However, the rerun should only commence from the wait task, excluding any previous tasks. This is achieved through versioning of the workflow in such a way that the second version of the workflow runs for every renewal cycle. 

## Optimize Subscriptions with Conductor - Start Now

From SMBs to large enterprises, Conductor can provide solutions for the varying needs of businesses. With the ability to scale up to billions of workflows a month, it’s no wonder that Conductor is the go-to solution for organizations of all sizes. 

If you’re looking for ways to remodel your subscription process, it’s high time to try Conductor now. With its native abilities for retry, multiple language support, and ability to break down complex workflows into simple workflows, Conductor can seamlessly help streamline your subscription process. 

So what are you waiting for? Start using Conductor now and witness the benefits for yourself. Orkes does offer a [hosted cloud service](https://orkes.io/cloud/) with multi-cloud support. [Get Started with Orkes Cloud](https://share.hsforms.com/1xEcepEiLRUWaN7Nf6Gqb7Qcfl4g) now, and feel free to reach us at our [Slack channel](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW) with any queries you have! Our team is always here to help you!
