import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';

# Webhook Integrations

Webhooks are user-driven HTTP callback functions that facilitate the connection between Orkes Conductor and external systems. A webhook sends data from one system to another when an event occurs. By leveraging webhooks, workflows can act on events outside the Conductor environment. You can also trigger other workflows in Conductor based on received webhook events.

Orkes Conductor supports webhook integration with the following systems:

* GitHub
* Slack
* Stripe
* Microsoft Teams
* SendGrid

Additionally, you can use the "Custom" option to integrate with other external applications.

**To integrate webhooks with Orkes Conductor:**

1. Create a Workflow with Wait for Webhook task.
2. Create a Webhook in Orkes Conductor.
3. Execute Workflow

## Step 1: Create a Workflow with Wait for Webhook Task

The first step is to create a workflow with a Wait for Webhook task.

1. Navigate to **Definitions > Workflow**, from the left menu on your Orkes Conductor cluster.
2. Click **+ Define Workflow**.
3. In your workflow, select the (**+**) icon and add a **Wait for Webhook** task.
4. Configure the [input matches](https://orkes.io/content/reference-docs/system-tasks/wait-for-webhook).
5. **Save** the workflow definition. 

## Step 2: Create a Webhook in Orkes Conductor

Once the workflow is created, the next step is to create a webhook.

1. Go to **Definitions > Webhooks** from the left menu on your Orkes Conductor cluster.
2. Click **+ New Webhook**.
3. Provide the following information:

<p align="center"><img src="/content/img/creating-webhook-in-orkes-conductor.png" alt="Creating Webhook in Orkes Conductor" width="100%" height="auto"></img></p>

| Parameter | Description | 
|----------|----------|
| Webhook name | A unique name for the webhook. |
| Workflow to receive webhook event | Add the workflows that are supposed to receive this webhook event. (The workflow created in step 1). |
| Source platform | Select the platform from which this webhook event will be invoked. Supported platforms are _GitHub_, _Slack_, _Stripe_, _Microsoft Teams_, _SendGrid_, and _Custom_. Use _Custom_ for unsupported systems. | 
| Start workflow when webhook events come | Enable this option to start a new workflow using data received from the webhook event. Once enabled, specify the workflow name, version, and idempotency key. The event payload will then be passed as input to the chosen workflow. |

4. Click **Save**. An unverified webhook URL will be generated.

<p align="center"><img src="/content/img/Webhook-with-an-unverified-URL-in-Conductor.png" alt="Webhook with an unverified UR" width="100%" height="auto"></img></p>

5. Copy the generated URL to the platform from which the webhook will be invoked. This step varies with the platform being integrated.
6. Once the URLs are verified (using the respective verification method), the URL status will be marked as **Verified**.

<p align="center"><img src="/content/img/Webhook-with-a-verified-URL-in-Conductor.png" alt="Webhook with a verified UR" width="100%" height="auto"></img></p>

This is the JSON schema for a webhook.

```json
{
 "verifier": "HEADER_BASED",
 "secretValue": "***",
 "headers": {
   "appName": "demoApp"
 },
 "name": "webhook-name",
 "id": "7a308c91-4189-4e34-8ddb-347cbbfd82fe",
 "receiverWorkflowNamesToVersions": {
   "sample-webhook": 1
 },
 "workflowsToStart": {
   "start-http-task": 2
 },
 "urlVerified": true,
 "sourcePlatform": "Custom",
 "createdBy": "john.doe@acme.com"
}
```

### Supported Webhook Verification Methods

Conductor supports incoming webhooks over HTTPS with the following verification methods:

1. Header Verification.
2. Signature Verification.
3. Challenge Verification.

### 1. Header-based Verifier Webhook​

A header-based verifier webhook validates a predefined header and value. Each request must contain all the headers with the keys and values specified. The request will be ignored if the keys and values are not specified. The URL is marked as verified when the first webhook event comes with all the header keys and values configured.

<p align="center"><img src="/content/img/Creating-a-header-based-verifier-Webhook-in-Conductor.png" alt="Header-based verifier webhook" width="70%" height="auto"></img></p>

Check out the following examples implementing header-based webhook verification:

* [Incoming Webhook using cURL](https://orkes.io/content/templates/examples/custom-conductor-webhook-using-curl)
* [Incoming Webhook using Postman](https://orkes.io/content/templates/examples/incoming-webhook-using-postman)

### 2. Challenge-based Verifier Webhook​

A challenge-based verifier webhook is used when the external system sends a challenge request that the Conductor server responds to establish trust. The URL is marked as verified when the system receives a challenge request. If the URL is not verified, all requests will be ignored until the URL verification is completed via the challenge mechanism. Slack supports the challenge-based verifier method.

<p align="center"><img src="/content/img/Creating-a-challenge-based-verifier-Webhook-in-Conductor.png" alt="Challenge-based verifier webhook" width="70%" height="auto"></img></p>

Check out the following examples implementing challenge-based webhook verification:

- [Slack Example - Standup Bot using Orkes Conductor](https://orkes.io/blog/create-standup-bot-using-conductor-slack-integration/)
- [Slack Example - Automating Slack Community Greetings](https://orkes.io/blog/automating-slack-greetings-to-community-with-orkes-conductor/)

### 3. Signature-based Verifier Webhook​

A signature-based verifier webhook validates the payload signature. This validation requires configuring the secret and header key on the Conductor side. When the request comes, Conductor calculates the request payload hash and matches it with the pre-configured header value. The systems that support signature-based verifiers are GitHub, Stripe, Microsoft Teams, and SendGrid.

<p align="center"><img src="/content/img/Creating-a-signature-based-verifier-Webhook-in-Conductor.png" alt="Signature-based verifier webhook" width="70%" height="auto"></img></p>

Configure the following parameters for each of the systems while creating webhooks in Orkes Conductor:

| System | Header for request verification | Parameter to be configured in Orkes Conductor |
| ------ | ------------------------------- | --------------------------------------------- |
| GitHub | Header `X-Hub-Signature 256` will be used to request verification. The request body’s HMAC hex digest is spawned using the SHA-256 hash function and the secret as the HMAC key. | [Secret](https://docs.github.com/en/webhooks/using-webhooks/creating-webhooks) - Enter the GitHub account’s secret key. | 
| Stripe | Header `Stripe-Signature` will be used to request verification. | [Endpoint Secret](https://stripe.com/docs/webhooks/signatures) - Enter the endpoint’s secret for Webhook from Stripe. | 
| Microsoft Teams | Header `hmac base64-encoded-signature` will be used to request verification. | [Security token](https://learn.microsoft.com/en-us/microsoftteams/platform/sbs-outgoing-webhooks?tabs=dev&tutorial-step=3) - Enter the security token from Microsoft Teams. | 
| SendGrid | Header `X-Twilio-Email-Event-Webhook-Signature` will be used to request verification. | [Verification key](https://www.twilio.com/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook-security-features#enable-signature-verification) - Enter the Sendgrid Webhook’s verification key. | 

### Verifying Webhook Executions 

To review the webhook events received by Orkes Conductor, navigate to the created webhook and access the webhook execution history. This includes details such as the event ID received, whether the headers are matched, the triggered workflow execution, and the timestamp of when the event was received.

<p align="center"><img src="/content/img/webhook-execution-history.png" alt="Verifying Webhook execution in Orkes Conductor" width="100%" height="auto"></img></p>

## Step 3: Execute Workflow

The workflow can begin in two ways:

1. Automatically triggered when events are received from the webhook.
2. Running the workflow initially and waiting for the webhook event.
    To run the workflow from Conductor UI:
    1. Go to **Run Workflow** from the left menu on your Orkes Conductor cluster.
    2. Select the desired workflow name and version and provide any input parameters as needed.
    3. Specify correlation ID or tasks to domain mapping if required.
    4. On the top right, select **Run Workflow**.

After running the workflow, a workflow ID will be generated. Click on it to monitor the execution progress and view detailed information. The workflow will proceed based on the data received through the webhook events.