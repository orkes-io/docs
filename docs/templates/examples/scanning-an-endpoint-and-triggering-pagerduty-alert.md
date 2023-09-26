import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Alerting using PagerDuty with Conductor Workflows

As we know, Netflix Conductor (a.k.a Orkes Conductor) is a power orchestration engine. In this example we can look at
how to scan an endpoint and trigger an alert if required. This needs to be done periodically. Orkes Conductor has the
features to support this and in this article we can explore how to achieve this.

## Requirements

Let's say we have an endpoint that lets we search for data. And this endpoint supports a timestamp based search by
specifying from and to window. Using this API, we can search for specific scenarios such as failures that may have
happened during a time window and then whenever the API returns any records, we have to call our support engineers via a
tool called as PagerDuty. PagerDuty is a 3rd party system that can help with alerting users and supports features such
as on-call schedules, escalations etc. 

In this example we are using pagerduty, but in reality we can connect to any system that offers an endpoint based
integration, often called as Webhooks. Similar alerting systems are OpsGenie, Squadcast, Datadog etc.


## Alert Design 

To scan for failures, we need to poll this endpoint every minute and look for failure instances that may have occured
during a window. This window is a sliding window - so we can index it of the schedule kick off time. Say for example - (
now - 10 minutes) or (now - 5 minutes). This is effectively the last 10 mins or the last 5 mins.

Once we detect records, we need to be able to make the integration webhook calls into the 3rd party systems to trigger
the required alerts.

Here is the design diagram for this alert:

TODO

## Workflows for Alerts

As we know, we can replicate whiteboard based flows in Conductor almost as is. The following definition shows how the
above logic is implemented. 

Workflow image:

TODO

We can try to run this against Conductor itself. When we run workflows using Conductor, one of the requirements is that
we need to track for failures. So in this example that is what we are doing. We are looking to find failure instances of
the workflow `sample_tracker_workflow` on the playground environment of Orkes Conductor in a 10 minute window.

:::tip
We are using a JavaScript task called as INLINE to compute the start time and end time for making the API query to
Conductor. We can have very custom logic in here to customize for our alerting requirements.
:::

A switch task with Javascript condition checks if the situation warrants an alert, and if yes, we make a webhook call to
alert our users using Pagerduty. Voila! we have our alert configured!

## Configuring and Running Alerts

Of course, we are not done yet, as we also need figure a bunch of pending things:

1. Managing the API token to make the API calls into Conductor
2. Scheduling the alert workflow to run at the per minute interval

### Managing API tokens

Invoking an endpoint to scan for failures will often involve some sort of authorization. And this authorization will be
typically be using some token that may expire. Here we look at a similar scenario and configure a secret that will hold
the API token to query conductor. And [this article](/content/templates/examples/rotating-secrets-that-expire) describes in detail on how we can maintain that token by periodically
refreshing it.


### Scheduling the Alerts

TODO