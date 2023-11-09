import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait For Webhook 

Webhook is an HTTP-based callback function that facilitates the communication between the Conductor and other third-party systems. It can be used to receive data from other applications to the Conductor. Conductor currently supports Webhook integration with the following third-party systems only:

* GitHub
* Slack
* Twilio
* Stripe
* Pagerduty
* Zendesk
* Twitter
* Facebook
* Sendgrid

You can leverage the **Custom** option for integrating other than the above-mentioned third-party systems.

## Definitions

```json
    {
      "name": "webhook_task",
      "taskReferenceName": "webhook_task_ref",
      "inputParameters": {
        "matches": {
          "$['event']['text']": "$.{workflow.input.somevalue}"
        }
      },
      "type": "WAIT_FOR_WEBHOOK"
    }
```

### Input Parameters

#### Writing Custom Matches

In the above example, you can see that the matches are described as follows:

```json
"matches": 
{
    "$['event']['type']": "message"
}
```

This means that the incoming event payload has a JSON path **event.type**, and it must be a **message** in order to match the webhook event with this task. You can define any custom JSON path based on the incoming event payload and write matches accordingly. You can also add multiple matches within the matches. All the matches will be calculated as AND operations within the matches.

```json
    "matches" : {
        "$['event']['type']": "message",
        "$['event']['text']": "hello",
    }
```

For example, the above one will match the webhook event payload where the **event.type** is **message** AND **event.text** is **hello**.

<br/>

<Tabs>
 <TabItem value="JSON" label="JSON Example">

 ```json
    {
      "name": "webhook_task",
      "taskReferenceName": "webhook_task_ref",
      "inputParameters": {
        "matches": {
          "$['event']['text']": "$.{workflow.input.somevalue}"
        }
      },
      "type": "WAIT_FOR_WEBHOOK"
    }
```

</TabItem>
</Tabs>

## Creating Webhook

Let’s create a Webhook now.

1. Navigate to **Definitions > Webhooks** from the left menu of your Conductor console.
2. Click **New Webhook**.
3. You need to fill in the following details:

| Field                                   | Description                                                                                                                                                                                                                                                                     |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Webhook name                            | Provide a unique name for your Webhook.                                                                                                                                                                                                                                         |
| Workflow to receive webhook event       | Provide the workflow name that is supposed to receive this webhook event.                                                                                                                                                                                                       |
| Source platform                         | Choose the platform from which this webhook event is going to be invoked. The currently supported platforms are GitHub, Slack, Twilio, Stripe, Pagerduty, Zendesk, Twitter, Facebook, Sendgrid & Custom. <br/> **Note**: You can use the option custom for unsupported systems. |
| Start workflow when webhook events come | Check this option to start a new workflow based on the data received from the webhook event. Once enabled, you need to choose the workflow to be executed.                                                                                                                      |

4. Click the **Create** button, and the Conductor will generate a Webhook URL, which will be unverified.

:::note
If you have enabled the option to **Start workflow when webhook event comes**, the event payload will be passed as input to the specified workflow.
:::

The generated URL is to be copied to the platform from which the Webhook will be invoked. The URL status will be **Unverified** now.

<p align="center"><img src="/content/img/Webhook-with-an-unverified-URL-in-Conductor.png" alt="Webhook with an unverified URL" width="100%" height="auto"/></p>

Once the URL is verified based on the verification method, this is what a Webhook with a verified URL looks like.

<p align="center"><img src="/content/img/Webhook-with-a-verified-URL-in-Conductor.png" alt="Webhook with a verified URL" width="100%" height="auto"/></p>

## Supported Webhook Verification Methods by Conductor

Conductor supports the incoming Webhooks over HTTPS with the following verification methods:

1. **Header Verification** - Validates a predefined header and value.
2. **Signature Verification** - Validates the payload signature. This validation requires configuring the secret and header key on the Conductor side. And when the request comes, the Conductor will calculate the request payload hash and match it with the pre-configured header value.
3. **Challenge Verification** - Used when the third-party system sends a challenge request that the Conductor server responds to establish trust.

## Different Types of Webhook

### 1. Header-based Verifier Webhook

For this type of Webhook, each request must contain all the headers with the keys and values specified. The request will be ignored if the keys and values are not specified.

<p align="center"><img src="/content/img/Creating-a-header-based-verifier-Webhook-in-Conductor.png" alt="Header-based verifier webhook" width="100%" height="auto" /></p>

So here, the URL is marked as verified when the first Webhook event comes with all the header keys and values configured.

#### [Example - Incoming Webhook using cURL](/content/templates/examples/custom-conductor-webhook-using-curl)

#### [Example - Incoming Webhook using Postman](/content/templates/examples/incoming-webhook-using-postman)

### 2. Challenge-based Verifier Webhook

* For this type of Webhook, the initial invocation must have a challenge parameter, and the same will be returned. This way, the Conductor marks the URL as verified. The Conductor would automatically accept the subsequent requests.
* The URL is marked as verified when the challenge request comes from the system. If the URL is not verified, then all the requests will be ignored until the URL verification is completed via the challenge mechanism. The systems that support the challenge-based verifiers are Slack and Facebook.

<p align="center"><img src="/content/img/Creating-a-challenge-based-verifier-Webhook-in-Conductor.png" alt="Challenge-based verifier webhook" width="100%" height="auto"/></p>

#### [Slack Example - Standup Bot using Orkes Conductor](https://orkes.io/blog/create-standup-bot-using-conductor-slack-integration/)

### 3. Signature-based Verifier Webhook

This type of Webhook is configured using the token from the source platform. This token is used to verify the signature of the request. The systems that support the signature-based verifiers are GitHub, Twilio, Stripe, Pagerduty, Zendesk & Twitter.

| System        | Header for request verification                                                                                                                                                                                                                                                                                                                                                                     |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GitHub        | <ul><li>Header **X-Hub-Signature 256** will be used to request verification. It is the request body’s HMAC hex digest and is spawned using the SHA-256 hash function and the secret as the HMAC key.</li><li>**[secret](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#setting-your-secret-token)** - Provide the GitHub account’s secret key.</li></ul> |
| Twilio        | <ul><li>Header **X-Twilio-Signature** will be used to request verification.</li><li>**[AuthToken](https://www.twilio.com/docs/usage/security)** - Provide your AuthToken from the Twilio console.</li></ul>                                                                                                                                                                                         |
| Stripe        | <ul><li>Header **Stripe-Signature** will be used to request verification.</li><li>**[endpointSecret](https://stripe.com/docs/webhooks/signatures)** - Provide your endpoint’s secret for Webhook from Stripe.</li></ul>                                                                                                                                                                             |
| Pagerduty     | <ul><li>Header **x-pagerduty-signature** will be used to request verification.</li><li>**[secret](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures)** - Provide your Pagerduty’s secret token.</li></ul>                                                                                                                                                                  |
| Zendesk       | <ul><li>Header **X-Zendesk-Webhook-Signature** will be used to request verification.</li><li>**[SIGNING_SECRET](https://developer.zendesk.com/documentation/event-connectors/webhooks/verifying/#retrieving-a-webhooks-signing-secret-key)** - Provide your Zendesk’s signing secret for Webhook.</li></ul>                                                                                         |
| Twitter       | <ul><li>Header **x-twitter-webhooks-signature** will be used to request verification.</li><li>**[TWITTER_CONSUMER_SECRET](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/guides/securing-webhooks)** - Provide your Twitter app’s consumer secret.</li></ul>                                                                                                     |

<p align="center"><img src="/content/img/Creating-a-signature-based-verifier-Webhook-in-Conductor.png" alt="Signature-based verifier webhook" width="100%" height="auto"/></p>

Here the URL is marked as verified when the request comes with the header configured and when the request payload hash in the header and the calculated hash on the Conductor side match.