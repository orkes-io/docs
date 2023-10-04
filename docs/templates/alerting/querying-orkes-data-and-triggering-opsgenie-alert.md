import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Alerting using OpsGenie with Conductor Workflows

As we know, Netflix Conductor (a.k.a Orkes Conductor) is a powerful orchestration engine.

In this article, we are looking at implementing a use case:

1. Poll for data periodically via the Conductor API to detect for failed workflows
2. If the returned count > 0, fire an alert to OpsGenie with URL for the failed workflows

## Workflow for Alerts

The following workflow definition shows how we can trigger OpsGenie alerts with a deep link for failed workflows in a given time range.

<p align="center"><img src="/content/img/ops-genie-alerting.png" alt="Alert Workflow" width="80%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Tasks

### QUERY_PROCESSOR

This system task is designed to do queries against various systems that can be used for alerting. In Conductor we support the ability to query the following sources:
1. Conductor APIs
2. Metrics API through proxy server (Coming soon...)
3. Conductor Events (Coming soon...)

#### Sample Input
```json
  "workflowNames": [
    "TestFailedWorkflow", "TestTerminatedWorkflow"
  ],
  "startTimeFrom": 15,
  "startTimeTo": 0,
  "correlationIds": null,
  "freeText": null,
  "statuses": [
    "FAILED", "TERMINATED"
  ],
```
In the above example we are trying to query for FAILED or TIMED_OUT workflows of types TestFailedWorkflow and TestTimedOutWorkflow that started in the last 15 minutes.

We can also pass correlationIds and freeText just like we would on the Orkes workflow dashboard.

#### Sample Output
```json
{
  "result": {
    "count": 1,
    "workflowsUrl": "https://play.orkes.io?rowsPerPage=200&startFrom=1696447143843&startTo=1696448043843&status=FAILED&status=TERMINATED&workflowType=TestFailedWorkflow&workflowType=TestTerminatedWorkflow",
    "workflows": [
      {
        "updateTime": "2023-10-04T19:30:39.105Z",
        "version": 1,
        "failedReferenceTaskNames": "simple_task_failed_wf_ref",
        "output": "{}",
        "executionTime": 4632,
        "outputSize": 2,
        "input": "{}",
        "createdBy": "abc.user@orkes.io",
        "reasonForIncompletion": "Terminated",
        "inputSize": 2,
        "workflowType": "TestFailedWorkflow",
        "startTime": "2023-10-04T19:30:34.473Z",
        "endTime": "2023-10-04T19:30:39.105Z",
        "workflowId": "7d0ad68e-62ec-11ee-a4e3-7edd94243909",
        "status": "FAILED"
      }
    ]
  }
}
```

### SWITCH

A switch task with Javascript condition checks if there are failed workflows in given time range, and if yes, makes a webhook call to alert our users using OpsGenie.

### OPS_GENIE

This system task is used to send the alert to OpsGenie by using the API integration key stored as a secret. The message to be passed is a deep link URL to failed workflows that is one of the outputs of the QUERY_PROCESSOR task.

#### Sample Input

```json
{
  "alias": "SomeAlias",
  "description": "https://play.orkes.io/rowsPerPage=200&startFrom=1696447143843&startTo=1696448043843&status=FAILED&workflowType=TestFailedWorkflow",
  "visibleTo": [
    {
      "id": "6e771bf9-8a72-47c2-897d-ccab90df66e2/main",
      "type": "team"
    }
  ],
  "details": {},
  "message": "Failed Worklows detected",
  "priority": "P1",
  "responders": [
    {
      "type": "user",
      "username": "abc.user@orkes.io"
    }
  ],
  "actions": [
    "Restart",
    "AnExampleAction"
  ],
  "entity": "New entity",
  "tags": [
    "OverwriteQuietHours",
    "Critical"
  ],
  "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
}
```

## Workflow JSON

```json lines
{
  "name": "FailedWorkflowOpsGenieAlerter",
  "description": "OpsGenie alerter for failed workflows",
  "version": 1,
  "tasks": [
    {
      "name": "query_processor",
      "taskReferenceName": "query_processor_ref",
      "inputParameters": {
        "queryType": "CONDUCTOR_API",
        "statuses": "${workflow.input.statuses}",
        "workflowNames": "${workflow.input.workflows}",
        "startTimeFrom": "${workflow.input.fromStartedMinsFromNow}",
        "startTimeTo": "${workflow.input.toStartedMinsFromNow}",
        "correlationIds": "${workflow.input.correlationIds}",
        "freeText": "${workflow.input.freeText}"
      },
      "type": "QUERY_PROCESSOR",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "onStateChange": {}
    },
    {
      "name": "has_failure_workflows",
      "taskReferenceName": "has_failure_workflows",
      "inputParameters": {
        "resultCount": "${query_processor_ref.output.result.count}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "true": [
          {
            "name": "ops_genie_task",
            "taskReferenceName": "ops_genie_task_ref",
            "inputParameters": {
              "alias": "${workflow.input.opsGenieAlias}",
              "description": "${query_processor_ref.output.result.workflowsUrl}",
              "visibleTo": "${workflow.input.opsGenieVisibleTo}",
              "message": "Failed Worklows detected",
              "responders": "${workflow.input.opsGenieResponders}",
              "details": {},
              "priority": "${workflow.input.opsGeniePriority}",
              "entity": "${workflow.input.opsGenieEntity}",
              "tags": "${workflow.input.opsGenieTags}",
              "actions": "${workflow.input.opsGenieActions}",
              "token": "${workflow.secrets.OPS_GENIE_TOKEN}"
            },
            "type": "OPS_GENIE",
            "decisionCases": {},
            "defaultCase": [],
            "forkTasks": [],
            "startDelay": 0,
            "joinOn": [],
            "optional": false,
            "defaultExclusiveJoinTask": [],
            "asyncComplete": false,
            "loopOver": [],
            "onStateChange": {}
          }
        ]
      },
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "evaluatorType": "graaljs",
      "expression": "(function () { return $.resultCount != null && $.resultCount > 0; })();",
      "onStateChange": {}
    }
  ],
  "inputParameters": [
    "fromStartedMinsFromNow",
    "toStartedMinsFromNow",
    "workflows",
    "statuses",
    "freeText",
    "correlationIds",
    "opsGenieAlias",
    "opsGenieEntity",
    "opsGeniePriority",
    "opsGenieResponders",
    "opsGenieVisibleTo",
    "opsGenieActions",
    "opsGenieTags",
    "opsGenieDetails",
    "opsGenieEntity"
  ],
  "outputParameters": {},
  "failureWorkflow": "",
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "abhishek.gupta@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {},
  "onStateChange": {}
}
```

## Configuring and Running Alerts

Of course, we are not done yet, as we also need to figure out a bunch of pending things:

1. Scheduling the alert workflow to run at the per-minute interval
2. Managing API secrets for OpsGenie

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

In this case we populate a secret called OPS_GENIE_TOKEN and resolve it in the OPS_GENIE system task input by doing this: 
```"token": "${workflow.secrets.OPS_GENIE_TOKEN}"```
