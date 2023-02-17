# Wait For Webhook Task

```json
"type" : "WAIT_FOR_WEBHOOK"
```

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

## Configurations

```json
{
     "inputParameters": {
       "matches": {
         "$['event']['type']": "message"
       }
     }
}
```

### Input Parameters

#### Writing Custom Matches​

In the above example, you can see that the matches are described as follows:

This means that the incoming event payload has JSON path `event.type` and it must be a `message` in order to match the webhook event with this task. You can define any custom JSON path based on the incoming event payload and write matches accordingly. You can also add multiple matches within the matches. All the matches will be calculated as AND operations within the matches.

```json
"matches": 
{
    "$['event']['type']": "message",
    "$['event']['text']": "hello",
}
```

For example, the above one will be used to match the webhook event payload where `event.type` is `message` AND `event.text` is `hello`.
<br/>
In order to match all the webhook events, the matches should be kept empty.

```json
"matches": 
{
}
```
<Tabs>
 <TabItem value="JSON" lable="JSON">
</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
</Tabs>

## Supported Webhook Verification Methods by Conductor

Conductor supports the incoming Webhooks over HTTPS with the following verification methods:

1. **Header Verification** - Validates a predefined header and value.
2. **Signature Verification** - Validates the payload signature. This validation requires configuring the secret and header key on the Conductor side. And when the request comes, the Conductor will calculate the request payload hash and match it with the pre-configured header value.
3. **Challenge Verification** - Used when the third-party system sends a challenge request that the Conductor server responds to establish trust.

## Creating Webhook

Now you have created your workflow. Let’s create a Webhook now.

1. Navigate to **Webhooks** from the Conductor server.
2. Click **New Webhook**.
3. You need to fill in the following details:

| Field      | Description |
| ----------- | ----------- |
| Webhook Name | Provide a unique name for your Webhook. |
| Workflow To Receive Webhook Event | Provide the workflow name that is supposed to receive this webhook event. |
| Source Platform | Choose the platform from which this webhook event is going to be invoked. The currently supported platforms are GitHub, Slack, Twilio, Stripe, Pagerduty, Zendesk, Twitter, Facebook, Sendgrid & Custom. <br/> **Note**: You can use the option custom for unsupported systems. |
| Start workflow when webhook events come | Check this option to start a new workflow based on the data received from the webhook event. Once enabled, you need to choose the workflow to be executed. |

<p align="center"><img src="/content/img/New-Webhook-Creation-in-Conductor.png" alt="Creating new Webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

4. Click **Create** button, and the Conductor will generate a Webhook URL, which will be unverified.

## Different Types of Webhook

Now you’ve seen the basic steps of creating a Webhook. Depending on the Webhook type, you need to configure some additional fields apart from the basic configurations. 

### 1. Header-based Verifier Webhook

For this type of Webhook, each request must contain all the headers with the keys and values specified. The request will be ignored if the keys and values are not specified.

<p align="center"><img src="/content/img/Creating-a-header-based-verifier-Webhook-in-Conductor.png" alt="Header-based verifier webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### 2. Challenge-based Verifier Webhook

For this type of Webhook, the initial invocation must have a challenge parameter and the same will be returned. This way, the Conductor marks the URL as verified. You can view this on the Webhook page. The Conductor would automatically accept the subsequent requests. 
<br/>
If the URL is not verified, then all the requests will be ignored until the URL verification is completed via the challenge mechanism. The systems that support the challenge-based verifiers are Slack and Facebook.

<p align="center"><img src="/content/img/Creating-a-challenge-based-verifier-Webhook-in-Conductor.png" alt="Challenge-based verifier webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

### 3. Signature-based Verifier Webhook

This type of Webhook is configured using the token from the source platform. This token is used to verify the signature of the request. The systems that support the signature-based verifiers are GitHub, Twilio, Stripe, Pagerduty, Zendesk & Twitter.

| System      | Header for request verification |
| ----------- | ----------- |
| GitHub | <ul><li>Header **X-Hub-Signature 256** will be used to request verification. It is the request body’s HMAC hex digest and is spawned using the SHA-256 hash function and the secret as the HMAC key.</li><li>**[secret](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#setting-your-secret-token)** - Provide the GitHub account’s secret key.</li></ul>|
| Twilio | <ul><li>Header **X-Twilio-Signature** will be used to request verification.</li><li>**[AuthToken](https://www.twilio.com/docs/usage/security)** - Provide your AuthToken from the Twilio console.</li></ul> |
| Stripe | <ul><li>Header **Stripe-Signature** will be used to request verification.</li><li>**[endpointSecret](https://stripe.com/docs/webhooks/signatures)** - Provide your endpoint’s secret for Webhook from Stripe.</li></ul>|
| Pagerduty | <ul><li>Header **x-pagerduty-signature** will be used to request verification.</li><li>**[secret](https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTkz-verifying-signatures)** - Provide your Pagerduty’s secret token.</li></ul>|
| Zendesk | <ul><li>Header **X-Zendesk-Webhook-Signature** will be used to request verification.</li><li>**[SIGNING_SECRET](https://developer.zendesk.com/documentation/event-connectors/webhooks/verifying/#retrieving-a-webhooks-signing-secret-key)** - Provide your Zendesk’s signing secret for Webhook.</li></ul>|
| Twitter | <ul><li>Header **x-twitter-webhooks-signature** will be used to request verification.</li><li>**[TWITTER_CONSUMER_SECRET](https://developer.twitter.com/en/docs/twitter-api/enterprise/account-activity-api/guides/securing-webhooks)** - Provide your Twitter app’s consumer secret.</li></ul>|

<p align="center"><img src="/content/img/Creating-a-signature-based-verifier-Webhook-in-Conductor.png" alt="Signature-based verifier webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

* Click **Create** button, and the Conductor will generate a Webhook URL. The generated URL is to be copied to the platform from which the Webhook will be invoked. The URL status will be **Unverified** now.

<p align="center"><img src="/content/img/Webhook-with-an-unverified-URL-in-Conductor.png" alt="Webhook with an unverified URL" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The process of verifying the URL varies with the Webhook type.

* **Header-based verifiers** - The URL is marked as verified when the first Webhook event comes with all the header keys and values configured.
* **Challenge-based verifiers** - The URL is marked as verified when the challenge request comes from the system.
* **Signature-based verifiers** - The URL is marked as verified when the request comes with the header configured and when the request payload hash in the header and the calculated hash on the Conductor side match.

This is what a Webhook with a verified URL looks like.

<p align="center"><img src="/content/img/Webhook-with-a-verified-URL-in-Conductor.png" alt="Webhook with a verified URL" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Run Workflow

Once the URL is verified, you can run the workflow. 

1. From **Conductor**, click on **Run Workflow**.
2. Choose your workflow under the field **Workflow Name**.
3. Click **Run Workflow**.
4. To check the workflow execution status, click on the generated workflow ID. It would be in the **RUNNING** state.

<p align="center"><img src="/content/img/Sample-Webhook-Workflow-in-RUNNING-status.png" alt="Webhook workflow in RUNNING status" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

5. Complete the requested action from the external system. For example, if the external system is Slack and the action is posting updates to a channel. Open Slack and send the text message to the channel. 
6. The workflow executes and the status changes to **COMPLETED**.

<p align="center"><img src="/content/img/Sample-Webhook-Workflow-in-COMPLETED-status.png" alt="Webhook workflow in COMPLETED status" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

**Note**: If you have enabled the option to **Start workflow when webhook event comes**, the event payload will be passed as input to the specified workflow.

## Examples

<details><summary>Sending messages in a Slack channel</summary>
<p>
Integrating Conductor with other systems using Webhook can be leveraged to cases like creating chatbots, employee onboarding processes, automated scrum updates, automated issue creation on support channel messages, etc. Now, let’s visualize a sample case where you need to send a message in a Slack channel.
<br/>

1. Create workflows to send a message in a Slack channel.
2. Create a Slack app that has permission to post to the Slack channel. Then, navigate to **Features > Incoming Webhooks**, and turn on **Activate Incoming Webhooks**.

<p align="center"><img src="/content/img/Activate-incoming-webhooks-for-Slack-app.png" alt="Activating incoming webhooks for Slack app to enable permission to post in channels" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

3. Create a webhook that listens for events from Slack. Check the above-mentioned example for creating Webhook.
4. Once the unverified URL is generated, you can use this URL in the Slack app. Under **Features > Event Subscriptions**, turn on the toggle button **Enable Events**. Provide the unverified URL of the Webhook under the field **Request URL**.

<p align="center"><img src="/content/img/Enabling-events-for-Slack-app.png" alt="Enabling events for connecting webhook with Slack app" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

5. The URL would now be verified in both the Slack app and the Conductor side.
6. Save the Webhook.
7. Run the workflow. The current status of the workflow will be RUNNING. 
8. Open the Slack app and send the text message to the channel.
9. The Workflow is completed now.

</p>
</details>