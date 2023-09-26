import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Alerting using PagerDuty with Conductor Workflows

As we know, Netflix Conductor (a.k.a Orkes Conductor) is a power orchestration engine. In this example, we can look at how to scan an endpoint and trigger an alert if required. This needs to be done periodically. Orkes Conductor has the features to support this, and we can explore how to achieve this in this article.

## Requirements

Let's say we have an endpoint that lets us search for data. This endpoint supports a timestamp-based search by specifying the from-and-to window. Using this API, we can search for specific scenarios, such as failures that may have happened during a time window, and then whenever the API returns any records, we have to call our support engineers via an alerting tool like PagerDuty. PagerDuty is a 3rd party system that can help with alerting users and supports features such as on-call schedules, escalations, etc.

In this example, we are using PagerDuty, but in reality, we can connect to any system that offers an endpoint-based integration, often called Webhooks. Similar alerting systems are OpsGenie, Squadcast, Datadog, etc.


## Alert Design 

To scan for failures, we need to poll this endpoint every minute and look for failure instances that may have occurred during a window. This window is a sliding window - so we can index it for the scheduled kick-off time. Say, for example - ( now - 10 minutes) or (now - 5 minutes). This is effectively the last 10 mins or the last 5 mins.

Once we detect records, we need to be able to make the integration webhook calls into the 3rd party systems to trigger the required alerts.

Here is the design diagram for this alert:

<p align="center"><img src="/content/img/design-for-alerts.png" alt="Design for Alert Systems" width="30%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Workflows for Alerts

As you know, we can replicate whiteboard-based flows in Conductor almost as is. The following definition shows how the above logic is implemented.

<p align="center"><img src="/content/img/alert-workflow.png" alt="Alert Workflow" width="80%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

| [View in Playground](https://play.orkes.io/workflowDef/track_workflow_failures) |
|--------------------------------------------------------------------------------------------------|

We can try to run this against Conductor itself. When we run workflows using Conductor, one of the requirements is that we need to track failures. So, in this example, that is what we are doing. We are looking to find failure instances of the workflow **sample_tracker_workflow** on the playground environment of Orkes Conductor in a 10-minute window.

:::tip
We are using a JavaScript task called [INLINE](https://orkes.io/content/reference-docs/system-tasks/inline) to compute the start and end times for making the API query to Conductor. We can have any custom logic in here to customize for our alerting requirements.
:::

A switch task with Javascript condition checks if the situation warrants an alert, and if yes, makes a webhook call to alert our users using Pagerduty. Voila! We have our alert configured!

## Configuring and Running Alerts

Of course, we are not done yet, as we also need to figure out a bunch of pending things:

1. Managing the API token to make the API calls into Conductor.
2. Scheduling the alert workflow to run at the per-minute interval.

### Managing API tokens

Invoking an endpoint to scan for failures will often involve some sort of authorization. And this authorization will typically be using some token that may expire. Here, we look at a similar scenario and configure a secret that will hold the API token to query Conductor. This [article](/content/templates/examples/rotating-secrets-that-expire) describes how we can maintain that token by periodically refreshing it.

### Scheduling Alerts

For scheduling the alerts, you can leverage the Workflow Scheduler feature in Orkes Conductor. This lets the workflow at the chosen cadence thus automating the alerting process. 

1. Navigate to **Definitions > Scheduler** on your Orkes Conductor console.
2. Click **Define schedule**.
3. [Create a scheduler](/content/developer-guides/scheduling-workflows#creating-schedule) using the following cron expression and choose the alert workflow you’ve created:

```
0 * * ? * *
```

This lets the workflow run every minute and the alerts would be triggered and sent every minute.