import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Integrating Webhook with Orkes Conductor

Webhooks are user-driven HTTP callback functions that facilitate the connection between Orkes Conductor and other third-party systems. Webhook sends data from one system to another when an event occurs. By leveraging Webhooks, workflows can be built to act on events outside the Conductor environment. You can also trigger other workflows in Conductor based on the received Webhook events.

Orkes Conductor currently supports the Webhook integration with the following third-party applications:

* GitHub
* Slack
* Twilio
* Stripe
* Pagerduty
* Zendesk
* Twitter
* Facebook
* Sendgrid

Apart from this, you can also use the option “Custom” to integrate with other third-party applications.

## Integrating with Webhook

Webhook Integration with Orkes Conductor consists of the following steps:

1. Create a workflow to receive the webhook event. The workflow includes a task with the type **WAIT_FOR_WEBHOOK**. 
2. Create a Webhook and verify the URL.
3. Run Workflow.
4. The workflow gets completed on completing the requested action from the external system.

## Webhook Verification Methods

The Webhook, once created in Orkes Conductor, would generate a Webhook URL that receives the Webhook event from outside the Conductor environment. This URL would initially be unverified. Orkes Conductor supports three verification methods:

* Header Verification
* Signature Verification
* Challenge Verification

To have a detailed look at the Webhook APIs and the configuration steps, refer [WAIT FOR WEBHOOK](https://orkes.cloud/content/reference-docs/system-tasks/webhook) task.