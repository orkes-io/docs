---
title: "Monitor HTTP Endpoints"
description: "Learn how to use an endpoint monitoring workflow that checks an HTTP endpoint and sends an email alert when the endpoint fails or returns a non-200 status code."
canonical_route: "templates/availability-monitoring-for-http-endpoints"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Monitor HTTP Endpoints"
---

# Monitor HTTP Endpoints

This tutorial shows how to build a workflow in Orkes Conductor that monitors the health of an HTTP endpoint and sends an email alert when the endpoint is unreachable or returns an unexpected status code.

The workflow sends a GET request to a specified URL, evaluates the response, and triggers a SendGrid email notification if the endpoint returns anything other than HTTP 200.

In this tutorial, you will:

- Integrate SendGrid as the email provider
- Build a workflow that checks an endpoint and alerts on failure
- Run the workflow and verify the alert behavior

To follow along, ensure you have access to the free [Developer Edition](https://developer.orkescloud.com/).

## The endpoint monitoring workflow

This workflow polls a specified HTTP endpoint and routes execution based on the response status code. It uses a SendGrid integration to deliver alert emails when the endpoint check fails.

Here is the workflow that you'll build in this tutorial:

<p align="center"><img src="/content/img/monitoring-http-endpoint-workflow.png" alt="HTTP Endpoint Monitoring workflow" width="50%" height="auto"></img></p>

**Workflow inputs:**

- **URL**: The HTTP(S) endpoint to be monitored using the workflow.
- **sender_email**: The sender email address to display the alert.
- **customer_email**:The recipient email address for alert notifications.

**Example input payload:**

```json
{
 "URL": "https://orkes.io/",
 "sender_email": "verified-sender@example.com",
 "customer_email": "alerts@example.com"
}
```

**Workflow logic:**

- The workflow begins with an [HTTP task](https://orkes.io/content/reference-docs/system-tasks/http) that sends a GET request to the specified endpoint.
- Next, the [Switch task](https://orkes.io/content/reference-docs/operators/switch) evaluates the HTTP status code to determine if the response indicates a success (200) or failure. Only HTTP 200 is treated as success; valid 2xx codes such as 201 and 204 also trigger the failure path.
  - If the response status code is **200**, a [Set Variable task](https://orkes.io/content/reference-docs/operators/set-variable) sets a success flag, and the workflow completes.
  - For any other response or failure (e.g., DNS error), the [Switch task](https://orkes.io/content/reference-docs/operators/switch) routes the execution to the **defaultCase** path.
- In the **defaultCase** path, a [SendGrid task](https://orkes.io/content/reference-docs/system-tasks/sendgrid) sends an email notification using the provided sender and recipient addresses. The subject and message content indicate that the endpoint health check failed.
- After sending the alert, a [Terminate task](https://orkes.io/content/reference-docs/operators/terminate) ends the workflow with the reason “**did not receive 200 status code**.”

**Workflow output:**

The workflow completes successfully on a 200 response, or terminates with an alert email and a failure reason for any other outcome.

### Step 1: Integrate SendGrid

The workflow uses SendGrid to send alert emails. Before building the workflow, add a SendGrid integration to your Conductor cluster and verify a sender email address.

#### Get your SendGrid API key

Retrieve your API key from your [SendGrid account](https://app.sendgrid.com/).

#### Add the SendGrid integration

**To add a SendGrid integration:**

1. Go to **Integrations** > **Connections and Resources** from the left navigation menu on your Conductor cluster.
2. Select **+ New integration**.
3. Create the integration by providing the following mandatory parameters:
  - **Integration name**: A name for the integration. Let’s use **_SendGrid_**.
  - **API Key**:  Enter your API key retrieved from the SendGrid console.
  - **Description**: A description for the integration.
4. Ensure that the **Active** toggle is switched on, then select Save.

For the SendGrid integration to work, the [sender email must be verified](https://www.twilio.com/docs/sendgrid/ui/sending-email/sender-verification#adding-a-sender).

**To verify the sender email:**

1. Go to [**Marketing** > **Senders**](https://mc.sendgrid.com/senders) from the left menu on your SendGrid account.
2. Select **Create New Sender**.
3. Enter the following mandatory parameters:
  - From Name
  - From Email Address
  - Reply to
  - Company Address
  - City
  - Country
  - Nickname

<p align="center"><img src="/content/img/sender-creation.jpg" alt="Adding a sender in SendGrid portal" width="100%" height="auto"></img></p>

4. Select **Save**.

This saves the sender to your SendGrid portal and sends a verification email. Once the verification link in the email is clicked, the sender’s status is updated to *verified* in the SendGrid portal.

<p align="center"><img src="/content/img/sender-verified.jpg" alt="Sender verified in SendGrid portal" width="100%" height="auto"></img></p>

### Step 2: Create the workflow

**To create the workflow:**

1. Go to **Definitions** > **Workflow** and select **+ Define workflow**.
2. In the **Code** tab, paste the following JSON:

```json
{
  "name": "HTTP_EndPoint_Monitoring",
  "description": "This workflow is designed to monitor the health of a specified HTTP endpoint",
  "version": 1,
  "tasks": [
    {
      "name": "check_endpoint",
      "taskReferenceName": "check_endpoint_ref",
      "inputParameters": {
        "uri": "${workflow.input.URL}",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "encode": true
      },
      "type": "HTTP",
      "optional": true
    },
    {
      "name": "check_status",
      "taskReferenceName": "check_status_ref",
      "inputParameters": {
        "status_code_input": "${check_endpoint_ref.output.response.statusCode}"
      },
      "type": "SWITCH",
      "evaluatorType": "value-param",
      "expression": "status_code_input",
      "decisionCases": {
        "200": [
          {
            "name": "set_success_flag",
            "taskReferenceName": "set_success_flag_ref",
            "inputParameters": {
              "status_code": true
            },
            "type": "SET_VARIABLE"
          }
        ]
      },
      "defaultCase": [
        {
          "name": "sending_failure_alert",
          "taskReferenceName": "sending_failure_alert_ref",
          "inputParameters": {
            "from": "${workflow.input.sender_email}",
            "to": "${workflow.input.customer_email}",
            "subject": "HTTP endpoint failure",
            "contentType": "text/plain",
            "content": "This is an automated email to inform you that your HTTP endpoint has failed a health check.",
            "sendgridConfiguration": "SendGrid"
          },
          "type": "SENDGRID"
        },
        {
          "name": "terminate",
          "taskReferenceName": "terminate_ref",
          "inputParameters": {
            "terminationStatus": "TERMINATED",
            "terminationReason": "did not receive 200 status code"
          },
          "type": "TERMINATE"
        }
      ]
    }
  ],
  "inputParameters": [
    "URL",
    "customer_email",
    "sender_email"
  ],
  "schemaVersion": 2
}
```

3. Select **Save** > **Confirm**.

After saving, update the SendGrid task with your actual values:

4. In **SendGrid Configuration**, replace **_SendGrid_** with your integration name from [Step 1](/content/templates/availability-monitoring-for-http-endpoints#step-1-integrate-sendgrid) if it differs.

### Step 3: Run the workflow

**To run the workflow:**

1. From the `HTTP_EndPoint_Monitoring` workflow definition, go to the **Run** tab.
2. Enter the **Input Params**. For example:

```json
{
 "URL": "https://orkes.io/", 
 "sender_email": "<YOUR-SENDGRID-VERIFIED-EMAIL>",
 "customer_email": "<ALERT-RECEIVER-EMAIL>" 
}
```

3. Select **Execute**.

<p align="center"><img src="/content/img/http-endpoint-workflow-sample-execution.gif" alt="Sample execution for HTTP endpoint monitoring workflow" width="80%" height="auto"></img></p>

If the monitored HTTP endpoint is healthy, the workflow follows the success path (**200**) and completes successfully.

<p align="center"><img src="/content/img/run-workflow-from-ui-http-endpoint-monitoring-template.png" alt="Sample workflow executed successfully" width="80%" height="auto"></img></p>

If the endpoint is down, the workflow follows the **defaultCase**, sends an alert email, and ends with a termination reason.

<p align="center"><img src="/content/img/endpoint-monitoring-template-default-path-execution.png" alt="Endpoint monitoring template’s default execution path" width="80%" height="auto"></img></p>

The user receives an alert email through SendGrid.

<p align="center"><img src="/content/img/sendgrid-alert-email.png" alt="Alert email received via SendGrid" width="80%" height="auto"></img></p>

## Workflow modifications

You can customize this workflow to fit your needs. For example

- **Add notification channels**: Replace or supplement SendGrid with Slack, Microsoft Teams, or Opsgenie for incident management.
- **Integrate with ticketing systems**: Use an HTTP task to open a Jira or Zendesk ticket automatically on failure.
- **Customize alert content**: Update the SendGrid task's subject and message body to include additional context such as the endpoint URL or failure reason.
- **Add escalation logic**: Chain additional Switch or HTTP tasks to route critical failures to on-call teams.
