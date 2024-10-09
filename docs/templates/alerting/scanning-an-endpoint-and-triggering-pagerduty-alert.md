import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Alerting using PagerDuty with Conductor Workflows

As we know, Netflix Conductor (a.k.a Orkes Conductor) is a powerful orchestration engine.

In this article, we are looking at implementing a use case:

1. Scan or poll and endpoint periodically
2. Depending on the endpoint response, fire an alert on the system like PagerDuty or OpsGenie

## Requirements

Let's say we have an endpoint that lets us search for data. Assume this endpoint supports a timestamp-based search by specifying a time window. As part of monitoring the application, we need to poll this endpoint periodically. Whenever the endpoint call returns any records, we have to call our support engineers via an alerting tool like PagerDuty.

PagerDuty is a 3rd party system that can help with alerting users and supports features such as on-call schedules, escalations, etc.

In this example, we are using PagerDuty, but we can connect to any system that offers an API-based integration, often called Webhooks. Similar alerting systems are OpsGenie, Squadcast, Datadog, etc.

## Alert Design

To scan for failures, we need to poll this endpoint every minute and look for failure instances that may have occurred
during a window. This window is a sliding window - so we can index it for the scheduled kick-off time. Say, for
example - ( now - 10 minutes) or (now - 5 minutes).

Here is the design diagram for this alert:

<p align="center"><img src="/content/img/design-for-alerts.png" alt="Design for Alert Systems" width="30%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Workflows for Alerts

As you know, we can replicate whiteboard-based flows in Conductor almost as is. The following workflow definition shows
how the above logic is implemented.

<p align="center"><img src="/content/img/alert-workflow.png" alt="Alert Workflow" width="80%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

| [View in Playground](https://play.orkes.io/workflowDef/track_workflow_failures) |
|---------------------------------------------------------------------------------|


```json lines
{
  "name": "track_workflow_failures",
  "description": "Track Workflow Failures",
  "version": 1,
  "tasks": [
    {
      "name": "compute_time_windows",
      "taskReferenceName": "compute_time_windows",
      "inputParameters": {
        "expression": "(function() { \n  let now = new Date();\n  // Earlier start time for testing\n  let fromTime = new Date(now.getTime() - ($.nowMinusStartMinutes * 60 * 1000)).getTime();\n  let toTime = new Date(now.getTime() - ($.nowMinusEndMinutes * 60 * 1000)).getTime();\n  return {\n    fromTime: fromTime,\n    toTime: toTime\n  };\n})();\n",
        "evaluatorType": "graaljs",
        "nowMinusStartMinutes": "${workflow.input.nowMinusStartMinutes}",
        "nowMinusEndMinutes": "${workflow.input.nowMinusEndMinutes}"
      },
      "type": "INLINE"
    },
    {
      "name": "data_query",
      "taskReferenceName": "data_query",
      "inputParameters": {
        "uri": "http://conductor-app.uidev-owkpy-ns.svc.cluster.local:8080/api/workflow/search?start=0&size=20&sort=startTime:DESC&freeText=*&query=workflowType IN (workflowDotMap) AND status IN (FAILED) AND startTime>${compute_time_windows.output.result.fromTime} AND startTime<${compute_time_windows.output.result.toTime}",
        "method": "GET",
        "accept": "application/json",
        "contentType": "application/json",
        "headers": {
          "X-Authorization": "${workflow.secrets.api_token_failure_tracker}"
        },
        "outputFilter": {
          "resultCount": "$${data_query.output.response.body.results.length()}"
        }
      },
      "type": "HTTP"
    },
    {
      "name": "has_failure_workflows",
      "taskReferenceName": "has_failure_workflows",
      "inputParameters": {
        "resultCount": "${data_query.output.resultCount}"
      },
      "type": "SWITCH",
      "defaultCase": [],
      "decisionCases": {
        "true": [
          {
            "name": "inform_on_slack",
            "taskReferenceName": "inform_on_slack",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "body": "Mock slack API"
            },
            "type": "HTTP"
          },
          {
            "name": "call_ops_genie",
            "taskReferenceName": "call_ops_genie",
            "inputParameters": {
              "uri": "https://orkes-api-tester.orkesconductor.com/api",
              "method": "GET",
              "accept": "application/json",
              "contentType": "application/json",
              "body": "Mock OpsGenie API"
            },
            "type": "HTTP"
          }
        ]
      },
      "evaluatorType": "graaljs",
      "expression": "(function () { return $.resultCount === null || $.resultCount > 0; })();"
    }
  ],
  "inputParameters": [
    "nowMinusEndMinutes",
    "nowMinusStartMinutes"
  ],
  "schemaVersion": 2
}
```

In this example, we are looking to find failure instances of the workflow **sample_tracker_workflow** on the playground
environment of Orkes Conductor in a 10-minute window.

An example payload for Pagerduty integration could look like:

Endpoint: `POST https://events.pagerduty.com/v2/enqueue`

```json
{
  "payload": {
    "summary": "My issue summary",
    "severity": "critical",
    "source": "Orkes Conductor",
    "component": "my-component",
    "group": "my-group",
    "class": "my-class",
    "custom_details": {
      "additional-context-1": "arbitrary string 1",
      "additional-context-2": "arbitrary string 2"
    }
  },
  "routing_key": "${workflow.secrets.orkes_pagerduty_integration_key}",
  "event_action": "trigger",
  "client": "my client",
  "client_url": "https://my-url",
  "links": [
    {
      "href": "https://my-cluster.orkesconductor.io/execution/${workflow.workflowId}",
      "text": "Workflow List"
    }
  ],
  "images": []
}
```

:::tip
We are using a JavaScript task called [INLINE](https://orkes.io/content/reference-docs/system-tasks/inline) to compute
the start and end times for making the API query to Conductor. We can have any custom logic here to customize our alerting requirements.
:::

A switch task with JavaScript condition checks if the situation warrants an alert, and if yes, makes a webhook call to
alert our users using Pagerduty. Voilà! We have our alert configured!

## Configuring and Running Alerts

Of course, we are not done yet, as we also need to figure out a bunch of pending things:

1. Managing the API token to make the API calls into Conductor
2. Scheduling the alert workflow to run at the per-minute interval
3. Managing API secrets for PagerDuty or OpsGenie

### Managing API tokens

Invoking an endpoint to scan for failures will often involve some sort of authorization. And this authorization will
typically be using some token that may expire. Here, we look at a similar scenario and configure a secret that will hold
the API token to query Conductor. This [article](/content/templates/examples/rotating-secrets-that-expire) describes how
we can maintain that token by periodically refreshing it.

### Scheduling Alerts

For scheduling the alerts, you can leverage the Workflow Scheduler feature in Orkes Conductor. This lets the workflow at
the chosen cadence, thus automating the alerting process.

1. Navigate to **Definitions > Scheduler** on your Orkes Conductor console.
2. Click **Define schedule**.
3. [Create a scheduler](/content/developer-guides/scheduling-workflows#creating-schedule) using the following cron
   expression and choose the alert workflow you’ve created:

```
0 * * ? * *
```

This lets the workflow run every minute, and the alerts would be triggered and sent every minute.

### Managing API Secrets

Similar to how we maintain API tokens, we can maintain the API keys / secrets for 3rd party systems as a [secret](/content/developer-guides/secrets-in-conductor), and it can be referred in your workflows.

## Video Guide

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/bg3c14gMkQ8?si=P8WlVXLAkqM445lw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe>
</center>