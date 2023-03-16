---
slug: introducing-webhook-integration-for-conductor
title: Introducing Webhook Integration for Conductor
authors: riza
tags: [Netflix Conductor, orchestration, webhook integration]
---

Previously, sending real-time updates from third-party services to Conductor was back-breaking. And after tons of scrums and brainstorming sessions, we are finally launching the Webhook integration for Conductor.

With the latest version of Conductor, you can now seamlessly integrate Conductor with other third-party services, such as Stripe, Zendesk, Slack, Twitter, and much more, using Webhooks.

<p align="center"><img src="/content/img/integrate-webhook-with-conductor.png" alt="Integrating Webhook with Conductor" width="90%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Now, what is a Webhook?

Webhook is a callback function based on HTTP that accelerates the connection between the Conductor and other third-party systems. It paves the way to receive data from other applications to Conductor.

## And what does this integration do?

You can leverage Webhook to create integration patterns for Conductor workflows. It can be used to create workflows that act on events occurring outside the Conductor. In addition, we’ve added an option to trigger other workflows based on the events received from Webhook. You can enable this while creating the Webhook so that once the Webhook event comes, this workflow gets triggered automatically, thus helping to streamline more processes.

While creating the workflows, you can identify the Webhook task type as ‘WAIT_FOR_WEBHOOK’.

We currently support Webhook integration for GitHub, Slack, Twilio, Stripe, Pagerduty, Zendesk, Twitter, Facebook, and Sendgrid. Apart from that, we’ve included an option called _Custom_ that allows you to integrate Conductor with any third-party systems.

## Here’s how you can configure this in Conductor!

1. Create the workflow to receive the Webhook event.

<p align="center"><img src="/content/img/create-workflow-to-receive-webhook-events.png" alt="Creating workflow to receive events from Webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

2. Create Webhook and verify the Webhook URL.

<p align="center"><img src="/content/img/create-webhook.png" alt="Create Webhook in Conductor" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

3. Run the Workflow.

<p align="center"><img src="/content/img/run-workflow.png" alt="Run workflow in Conductor" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

4. Complete the requested action from the external system, and the workflow gets completed successfully.

<p align="center"><img src="/content/img/completed-workflow.png" alt="A completed workflow after receiving events from Webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

For example, suppose the external system is GitHub, and the requested action is replying with the comment "We’ll get back to you soon!" on every issue creation. In that case, once an issue is created in your GitHub repository, the workflow gets completed successfully.

Wanna know in detail about the configuration steps? Have a look at our documentation on [Integrating Conductor with other systems using Webhook](https://orkes.io/content/docs/reference-docs/system-tasks/webhook-task).

I can’t wait to see what you build!

Do try out our new add-on, and you can always reach us at our [Slack channel](https://app.slack.com/client/T02KG20GJ1Z/C02KJ820XPW) for any queries! We’re always happy to help.

Cheers!

Riza Farheen<br/>
Senior Technical Writer<br/>
Orkes Inc
