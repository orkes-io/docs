# Availability Monitoring for HTTP Endpoints

Availability and uptime are paramount for any application or service that serves your customers or provides critical services otherwise. There are many ways to incorporate this fundamental capability while deploying and operating your service (e.g., deploy across multiple availability zones to host your DNS records in more than one DNS service). However, you still need to be prepared to be alerted and respond if all fails.

That is where a service that continuously checks the availability of your service by sending and receiving an HTTP response comes in. This service will initiate a request and ensure that a 200 OK is received within a specified time. If that does not happen, it will re-attempt (to take into account any transient issues), and if the response is still not received, or if the response is not as expected (e.g., 200 OK), then an alert is fired (e.g., by posting a Slack message).

This template provides a Conductor workflow definition that does just that, and you can easily run it on a continuous schedule in Conductor. As with all Orkes-provided templates, you can customize it for your specific case (e.g., check every minute) and use it as often as you need. 

## How Conductor makes it easy to monitor services

Leveraging Conductor is a great option for this use case due to the flexibility Conductor offers to define it easily for your specific needs. Using the UI or directly in the code, you can set the right parameters for your use case.  Want to send an alert to your cloud monitoring platform in addition to sending a message to Slack? You can do that and more. 

Conductor also makes it easy to customize this (and any other) workflow to your specific needs. Do you need the response times to be different? Just change that in the task definition. In addition to all these, you get out-of-the-box monitoring and historical metrics for this health checker. One way you could use that is by seeing how the endpoint had been performing in terms of availability for the last thirty days - A great way to demonstrate how your service has been doing against its availability SLA.

Conductor is also a perfect choice when it comes to running a series of steps on a predefined schedule, and that's something this use case needs. And with the ability to get started and go to production in a matter of minutes, using Conductor supercharges your velocity and agility!

## Conductor features used 

- [Workflows](https://orkes.io/content/core-concepts)
- [HTTP System Task](https://orkes.io/content/reference-docs/system-tasks/http)
- [Inline Task](https://orkes.io/content/reference-docs/system-tasks/inline)
- [Sub Workflows](https://orkes.io/content/reference-docs/operators/sub-workflow)
- [Switch Operator](https://orkes.io/content/reference-docs/operators/switch)
- [Scheduler](https://orkes.io/content/developer-guides/scheduling-workflows)

## How to use the template

When you click on **Use this Template** in the workflow explorer, you will be navigated to the workflow definition page where you can see the name of the workflow as **Monitor-HTTP-Endpoint-Availability**. This template is free for you to use as is, or you can modify it for your specific use case.

Let's look at what this workflow does and how to run it!

<p align="center"><img src="/content/img/monitoring-http-endpoint-workflow.png" alt="Monitoring HTTP Endpoint Workflow" width="70%" height="auto"></img></p>

### Workflow Logic

The input parameters to this workflow are:

- **endpoint_url** - An HTTP(S) endpoint that you want to monitor continuously for availability, e.g., https://orkes.io/content/. 
- **notification_type** - Specifies how you want to be notified if the endpoint being monitored is down. Supported values are:
    * SMS
    * EMAIL
    * SLACK
    * PAGERDUTY
- **notification_to** - Specifies the email or phone number to send the notification to. This is applicable only if the *notification_type* is SMS or EMAIL.
- **notification_from** - Specifies the email or phone number to be shown as the originator for this notification. This is applicable only if the *notification_type* is SMS or EMAIL. For SLACK and PAGERDUTY, this can be null.

Here is an example of the payload that goes in as inputs to this workflow. 

```
{
 "notification_type": "SMS",
 "endpoint_url": "https://example.com/",
 "notification_from": "14084084084",
 "notification_to": "12062062052"
}
```

This input specifies that the HTTP endpoint to monitor is https://www.example.com and that in the case of a failure, you want to get notified via SMS that is sent through Twilio. 

Here is another example that should fail since the domain name is invalid. Here, you want to get notified via Slack. 

```
{
 "notification_type": "SLACK",
 "endpoint_url": "https://orkes.iot/"
}
```

- The first step in the workflow is an HTTP System Task (remember, [System Tasks](https://orkes.io/content/category/reference-docs/system-tasks) are tasks that execute inside Conductor and for which you do not need to write external worker implementations) to send a GET request to the specified endpoint. 
- The next step is to get the current timestamp, which is done using an [Inline Task](https://orkes.io/content/reference-docs/system-tasks/inline).
- The output of the HTTP task is then passed to the next step in the workflow, which is an operator, [Switch Task](https://orkes.io/content/reference-docs/operators/switch), that will decide if the response indicates a success or failure scenario.
- If a **200 OK** was returned in the previous step, the Switch task sends the execution on the success path, which essentially goes directly to the end of the workflow. 
- If any other value was returned, or if the HTTP System Task itself failed (e.g., DNS error), the Switch task will send the execution to the failure path.
- The failure path invokes a sub-workflow called **Notify-Channels** so that the failure message can be sent via the notification type specified in the input of the original workflow. The first step in that sub-workflow is to check and see if the *notification_type* is one of the supported formats. Then, it executes a series of steps to send the notification through that channel. 

In the template provided, we are using the below providers for sending the notification depending on the type. This list also specifies what the parameters required by the provider are. 

:::note
To ensure security for your provider-specific credentials, it is strongly recommended to store them securely as [Secrets](https://orkes.io/content/developer-guides/secrets-in-conductor) in Orkes Conductor, and the caller of the original workflow needs to be explicitly granted permissions to these secrets. As a best practice, we would recommend you to create [an User Group](https://orkes.io/content/access-control-and-security/users-and-groups#groups) in Orkes Conductor and add the caller of the parent workflow along with any other individuals who require access to these secrets during the workflow invocations. Then, add the credentials from the provider one by one as a Secret, and in the earlier created group, provide read access to those secrets.
:::

:::info
Please ensure to update the workflow definitions with your own values for each of these secrets so that they are specific to your setup. Running the workflow without doing so will result in a non-authorized error.
:::

<table>
    <tr>
        <th>Notification Type</th>
        <th>Provider</th>
        <th>Credentials Required</th>
        <th>Associated Secret Reference in Workflow Definition</th>
    </tr>
    <tr>
        <td rowspan="2">SMS</td>
        <td rowspan="2">Twilio</td>
        <td>The account id of your Twilio account.<ol><li>From your <a href="https://console.twilio.com/">Twilio</a> console, navigate to <strong>Account Info &gt; Account SID</strong> and copy the account ID.</li></ol></td>
        <td rowspan="2">orkes_template_twillio_account_id</td>
    </tr>
    <tr>
        <td>Authentication token from your Twilio account.<ol><li>From your Twilio console, navigate to <strong>Account Info &gt; Auth Token</strong> and copy the token.</li></ol></td>
    </tr>
    <tr>
        <td>EMAIL</td>
        <td>Sendgrid</td>
        <td>API key obtained from Sendgrid.<ol><li>From your <a href="https://app.sendgrid.com/settings/api_keys">Sendgrid</a> account, navigate to <strong>Settings &gt; API Keys</strong></li><li>Click <strong>Create API Key</strong> and provide a name for your key.</li><li>Choose the <strong>API Key Permissions</strong> as <strong>Full Access.</strong></li><li>Copy and keep your key securely, as it would be shown only once.</li></ol></td>
        <td>orkes_template_sendgrid_api_key</td>
    </tr>
    <tr>
        <td>SLACK</td>
        <td>Slack</td>
        <td>Custom webhook obtained from Slack to post to a specific channel.</td>
        <td>orkes_template_slack_webhook</td>
    </tr>
    <tr>
        <td>PAGERDUTY</td>
        <td>Pagerduty</td>
        <td>Routing key for sending messages to a particular channel defined in Pagerduty.<ol><li>In your Pagerduty account, create a <strong>Service</strong>.</li><li>Click on the created service and click <strong>Integrations</strong> sub-tab.</li><li><strong>Click +Add an integration</strong>, and choose <strong>Events API V2</strong>.</li><li>Once the integration is added, click on 🔽 near to the integration name.</li><li>Copy the 32 digit <strong>Integration Key</strong>, which is the routing key to be used in the workflow.</li></ol></td>
        <td>orkes_template_pagerduty_eventsv2_integration_key</td>
    </tr>
</table>

Depending upon how you wish to notify, you can configure the required provider and get the required credentials. This needs to be saved as a [secret](https://orkes.io/content/developer-guides/secrets-in-conductor) in your Conductor console as with the mentioned secret name in the above table. This seamlessly helps you run the workflow.

If any of the parameters listed above are not readable or are wrong, the workflow execution will fail. Therefore, it is important to test this ahead of time to ensure you have the values set correctly.

Once the notifications are completed, the sub-workflow returns, and the caller workflow (i.e., this workflow) finishes its execution.

:::note
For SMS & Email notifications, we have used the service providers Twilio & Sendgrid, respectively, for illustration purposes. You can use any service provider of your choice.
:::

Of course, this is just a starting point. The power of the Conductor model is that you can customize this workflow (and any other ones!) to your needs. You can add additional steps (e.g., write to a log file) or add a different provider (e.g., use Opsgenie for incident notifications). The possibilities are endless, and you can easily build this workflow to do exactly what you want, and, without any effort, scale it up as much as you want!

### Workflow Invocation 

You can invoke the workflow in many different ways. However, the best practice for an availability monitoring workflow is to schedule the workflow at predefined cadences.

#### Scheduler

One of the features of Orkes Conductor is that you can specify that a particular workflow should be run at a predefined cadence. Once the schedule is set, Orkes Conductor will invoke it at that cadence without any further action from you. This invocation option is a great choice for the HTTP availability monitoring workflow. 

Here’s how to schedule workflows:
1. From your Conductor console, navigate to **Definitions > Scheduler** from the left menu.
2. Click the **Define Schedule** button from the top right corner. 
3. Provide a schedule name, choose your workflow name and version to be scheduled, and set your schedule using the cron expression. Refer to [this document](https://orkes.io/content/developer-guides/scheduling-workflows) for detailed information on all the parameters. 
5. Click **Save Schedule**.

#### REST

As with any workflow in Conductor, you can invoke it by calling the REST endpoint of the Conductor server and specifying the workflow name, version, and input data.

You can use the following API to start a workflow execution:

```
POST /api/workflow/{name}
```

Refer to the [start workflow API doc](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) for more info. 

#### Conductor UI

You can navigate to the **Run Workflow** button on the left side of your Conductor UI, and from there, select the workflow's name, the version to use, and the input parameters. Using the example variables to invoke through the UI is a great way to test this workflow.

<p align="center"><img src="/content/img/run-workflow-from-ui-http-endpoint-monitoring-template.png" alt=" Monitoring HTTP Endpoint Workflow UI Execution" width="90%" height="auto"></img></p>