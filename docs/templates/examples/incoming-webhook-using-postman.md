# Incoming Webhook using Postman

Webhooks can be integrated with Conductor to facilitate communication with other third-party systems such as Slack, Pagerduty, Zendesk, etc.

In this article, let’s look at creating a webhook in Conductor and passing an incoming request to the webhook using Postman.

## Creating Workflow

Consider the following workflow that waits for a webhook event from Postman:

<p align="center"><img src="/content/img/wait-for-webhook-workflow.png" alt="Workflow with webhook task" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

To create a workflow:

1. Navigate to **Workflows > Definitions** from the left menu.
2. Click **Define Workflow** and create a workflow including a [WAIT_FOR_WEBHOOK](https://orkes.io/content/reference-docs/system-tasks/wait-for-webhook) task.

For the WAIT_FOR_WEBHOOK task, the input matches are defined as:

```json
"inputParameters": {
       "matches": {
         "$['data']['recipientId']": "${workflow.input.recipientId}"
       }
     },
```

The complete workflow JSON looks like this:

```json
{
 "name": "sample-webhook",
 "version": 1,
 "tasks": [
   {
     "name": "http_task_uzpd9",
     "taskReferenceName": "http_task_uzpd9_ref",
     "inputParameters": {
       "http_request": {
         "uri": "https://orkes-api-tester.orkesconductor.com/api",
         "method": "GET",
         "connectionTimeOut": 3000,
         "readTimeOut": "3000",
         "accept": "application/json",
         "contentType": "application/json"
       }
     },
     "type": "HTTP",
     "optional": false
   },
   {
     "name": "webhook_task_myey4",
     "taskReferenceName": "webhook_task_myey4_ref",
     "inputParameters": {
       "matches": {
         "$['data']['recipientId']": "${workflow.input.recipientId}"
       }
     },
     "type": "WAIT_FOR_WEBHOOK",
     "optional": false
   }
 ],
 "inputParameters": [
   "recipientId"
 ],
 "schemaVersion": 2,
 "ownerEmail": "riza.farheen@orkes.io"
}
```

Next, create a webhook to invoke this workflow.

## Creating Webhook in Conductor

1. From your Conductor server, navigate to **Webhooks** from the left menu.
2. Click the **New Webhook** button and create the webhook with the following configurations.

<p align="center"><img src="/content/img/sample-webhook.png" alt="Webhook example" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Under the field “Workflows to Receive Webhook Event”, choose the workflow that includes your webhook task created earlier. Since the platform is Postman, let’s choose the **Source Platform** as **Custom**.

Provider a header key and value. Let’s also configure to start the workflow **“start-http-task”** when the webhook event comes from Postman.

On saving the webhook, an unverified URL will be generated, as shown below:

<p align="center"><img src="/content/img/sample-webhook-unverified.png" alt="Webhook with unverified URL" width="70%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Since this is a header-based verifier, the URL will be verified once the first Webhook event comes with all the header keys and values configured. 

## Run Workflow

Next, you must run the workflow by clicking the **Run Workflow** button from the left menu.

When the execution reaches the “WAIT_FOR_WEBHOOK” task, it waits for the event to come from Postman.

<p align="center"><img src="/content/img/webhook-workflow-execution.png" alt="Workflow execution waiting for webhook event" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now, open [Postman](https://www.postman.com/), create a new request with your webhook URL, and change the method to POST. 

Provide the header key and value, and the input matches in JSON format. 

<p align="center"><img src="/content/img/configuring-headers-in-postman-request.jpg" alt="Configuring headers in Postman request" width="80%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Click **Send**, and it should return a 200 OK.

<p align="center"><img src="/content/img/send-request-postman.png" alt="Sending POST request from Postman" width="80%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now, if we return to the webhook, you can see that the event has been received. This triggered the workflow in which the webhook task was added.

<p align="center"><img src="/content/img/workflow-triggered.png" alt="Workflow with webhook task triggered on receiving webhook event" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You can see that the webhook URL has been verified now. And if you check the previous workflow execution, you can verify that it has been completed successfully.

<p align="center"><img src="/content/img/workflow-completed.png" alt="Sample webhook workflow completed" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

We have also configured to start the workflow **“start_http_task”** on receiving this webhook event. You can verify the same from the **Workflow > Executions** page.

<p align="center"><img src="/content/img/workflow-started-when-request-came.png" alt="Workflow triggered when request came from Postman" width="100%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>