---
sidebar_position: 7
slug: "/reference-docs/system-tasks/wait-for-webhook"
description: "The Wait for Webhook task pauses the workflow until it receives a signal from a webhook."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait For Webhook 

A webhook is an HTTP-based callback function that facilitates communication between the Conductor and other third-party systems. It can be used to receive data from other applications to the Conductor. Conductor supports Webhook integration with the following platforms:

* GitHub
* Microsoft Teams
* SendGrid
* Slack
* Stripe

Additionally, the Custom option can be used to integrate other systems.

For a full guide on how to use Webhook tasks, refer to [Webhook Integrations](https://orkes.io/content/developer-guides/webhook-integration).

## Task parameters 

Configure these parameters for the Wait for Webhook task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**matches** | The conditions that incoming event payloads must meet to trigger the webhook. Can be string, number, boolean, null, or object/array. | Required. |

### Writing custom matches​

In the example below, the matches are described as follows:

```json
"matches":
{
   "$['event']['type']": "message"
}
```

Any custom JSON path based on the incoming event payload can be defined to write matches accordingly. This configuration means that the incoming event payload must have a JSON path `event.type`, and it must be a message to match the webhook event with this task.

Multiple matches can also be added within the `matches` section. All the matches will be calculated as AND operations within the matches.

```json
   "matches" : {
       "$['event']['type']": "message",
       "$['event']['text']": "hello",
   }
```

For example, the configuration above will match the webhook event payload where `event.type` is `message` AND `event.text` is `hello`.


## Task configuration

This is the task configuration for a Wait for Webhook task.

```json
{
  "name": "webhook",
  "taskReferenceName": "webhook_ref",
  "inputParameters": {
    "matches": {
      "$['event']['type']": "message",
      "$['event']['text']": "Hello"
    }
  },
  "type": "WAIT_FOR_WEBHOOK"
}
```

## Task output

During execution, the task processes incoming webhook events based on the configured criteria. The task will return parameters depending on the specific event payload received, such as the event identifier, event type, and event data containing relevant details.

## Adding a Wait for Webhook task in UI

**To add a Wait for Webhook task:**

1. In your workflow, select the (**+**) icon and add a **Wait for Webhook **task.
2. Add the **Input matches**.

<center><p><img src="/content/img/webhook-ui-guide.png " alt="Webhook UI" width="100%" height="auto"/></p></center>


## Examples

Here are some examples for using the Wait for Webhook task.

<details><summary>Incoming Webhook using cURL</summary>
<p>

See an example of [passing an incoming request to Webhook using cURL commands](https://orkes.io/content/templates/examples/custom-conductor-webhook-using-curl).

</p>
</details>

<details><summary>Incoming Webhook using Postman</summary>
<p>

See an example of [passing an incoming request to Webhook using Postman](https://orkes.io/content/templates/examples/incoming-webhook-using-postman).

</p>
</details>

<details><summary>Sample Workflow for Slack Webhook - Creating StandUp Bot</summary>
<p>

See an example of [creating a standup bot using Slack Webhook.](https://orkes.io/blog/create-standup-bot-using-conductor-slack-integration/).

</p>
</details>

<details><summary>Sample Workflow for Slack Webhook - Automating Slack Greetings</summary>
<p>

See an example of [automating Slack Greetings using Slack Webhook.](https://orkes.io/blog/automating-slack-greetings-to-community-with-orkes-conductor/).

</p>
</details>