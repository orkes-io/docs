---
slug: "/templates/examples/custom-conductor-webhook-using-curl"
description: "Check out this template on how to create a workflow that uses a cURL webhook."
---

# Incoming Conductor Webhook using cURL

Conductor-Webhook integration can be leveraged to implement most of your business flows. Webhooks can be integrated with Conductor to facilitate communication with other third-party systems such as Slack, Pagerduty, Zendesk, etc.

In this article, let’s look at creating a webhook in Conductor and passing an incoming request to the webhook using cURL commands.

## Creating a Workflow to receive Webhook event

The first step is creating a workflow to receive the incoming webhook event.

In this example, let’s create a sample workflow like this:

<p align="center"><img src="/content/img/sample-webhook-demo-using-curl.png" alt="Workflow that includes webhook task" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

To create a workflow,

1. From your Conductor server, navigate to **Definitions > Workflows** from the left menu.
2. Click **Define Workflow** and create the workflow to implement your business solution. Include the *[WAIT_FOR_WEBHOOK](https://orkes.io/content/reference-docs/system-tasks/wait-for-webhook)* task where you need to receive the signal to the webhook. 

The JSON code for the above workflow is as follows:

```json
{
 "name": "sample-webhook-demo-using-curl",
 "description": "Edit or extend this sample workflow. Set the workflow name to get started",
 "version": 1,
 "tasks": [
   {
     "name": "get_random_fact",
     "taskReferenceName": "get_random_fact",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/api",
         "method": "GET",
         "connectionTimeOut": 3000,
         "readTimeOut": 3000,
         "accept": "application/json",
         "contentType": "application/json"
       }
     },
     "type": "HTTP"
   },
   {
     "name": "webhook_task_vjbw2",
     "taskReferenceName": "webhook_task_vjbw2_ref",
     "inputParameters": {
       "matches": {
         "$['event']['type']": "${workflow.input.type}"
       }
     },
     "type": "WAIT_FOR_WEBHOOK"
   }
 ],
 "inputParameters": [],
 "outputParameters": {
   "data": "${get_random_fact.output.response.body.fact}"
 },
 "schemaVersion": 2,
  "ownerEmail": "riza.farheen@orkes.io"
}
```

## Creating a Webhook in Conductor

Next, you need to create a webhook.

1. From your Conductor server, navigate to **Definitions > Webhooks** from the left menu.
2. Click the **New Webhook** button and create the webhook with the following configurations.

<p align="center"><img src="/content/img/sample-webhook-using-curl.png" alt="Webhook created in Conductor" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

- Provide a webhook name.
- Under the field **_“Workflows To Receive Webhook Event”_**, choose the previously created webhook.
- Since we are sending the signal to the webhook using cURL command, choose the **Source Platform** as **Custom**. 
- Now we need to authenticate the webhook request, and a mechanism to do this is by doing a header match. Add a header **key** and **value** that is only known to your application.
- **Start workflow when webhook event comes** - Enable the option and choose the workflow to be triggered on receiving the webhook event.

3. Click **Create**, and a URL will be generated, which is the webhook URL, that will be unverified.

The URL would remain unverified until the first request comes from the webhook.

## Run Workflow

Next, run the workflow using the **Run Workflow** button from the left menu. Ensure to provide the required input parameters.

<p align="center"><img src="/content/img/running-workflow-curl.png" alt="Running the workflow" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Click on the workflow ID generated to view the execution.

<p align="center"><img src="/content/img/viewing-execution-curl.png" alt="Workflow execution" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

The workflow is now running and is waiting for the signal from the webhook.

Compose a payload that will match the configuration in your WAIT_FOR_WEBHOOK task. For example, if the input matches for the webhook is defined as follows:

```json
"matches": {
     "$['event'][‘type’]": "${workflow.input.type}"
}
```

You need to send a request like this:

```shell
curl -H "Content-Type:application/json" -H "Accept:application/json" \
     -H 'someKey: someValue'    \
     -X POST 'https://developer.orkescloud.com/webhook/169d8857-ed45-4488-aefa-bf62cd8fb415' \
     -d '{"event": {"type" : "type-1"}}'
```

It should include the **_header keys and values_** (same as configured in the webhook), the **_webhook URL_** & the **_input parameter “type”_**, which should be the same as in the workflow input you’ve provided. (We’ve provided “type-1” as the input parameter while running the workflow. So, in this request, too, we’ve provided the same parameter.)

:::note
Ensure that you substitute the values in the provided request with your headers keys/values, webhook URL, and input parameters. 
:::

Next, open **Terminal** on your device and send the above command. Now, open the Webhook you’ve created, and you can see that the URL is now marked as verified. You can also see that an event has been received, and the workflow is triggered.

<p align="center"><img src="/content/img/verified-webhook-curl.png" alt="Verified Webhook" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

If you check the previous workflow execution, you can verify that the webhook task is completed.

<p align="center"><img src="/content/img/completed-webhook-curl.png" alt="Completed Workflow" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Since while creating the webhook, we have configured to start the workflow “workflow-1” when the event comes, you can verify that the workflow has been triggered from the **Workflow > Executions** page.

<p align="center"><img src="/content/img/triggered-workflow-curl.png" alt="Triggered workflow verification from the Workflow executions page" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>