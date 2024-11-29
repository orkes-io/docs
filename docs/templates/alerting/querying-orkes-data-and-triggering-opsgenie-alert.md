import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Alerting using Opsgenie with Orkes Conductor Workflows

You can integrate the powerful incident & alerting management tool, Opsgenie, with Orkes Conductor. This makes it easy to quickly send alerts to Opsgenie when failures occur in your application.

This article focuses on implementing a use case that involves periodically polling data through the Conductor API to identify any failed workflows. If there are workflow failures, an alert will be triggered to Opsgenie containing the URL linking to the failed workflows.

## Workflow for Alerts​

The following workflow definition demonstrates the process of initiating Opsgenie alerts along with a specific URL link pointing to failed workflows within a designated time frame.

<p align="center"><img src="/content/img/ops-genie-alerting.png" alt="Alert Workflow" width="40%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Tasks​

The tasks included in the workflow are the Query Processor, Switch, and Opsgenie tasks.

### Query Processor

This system task is designed to do queries against various systems that can be used for alerting. In Conductor, we support the ability to query the following sources:

1. Conductor APIs
2. Conductor Metrics (Prometheus)
3. Conductor Events (Coming soon)

#### Sample Input​

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

In the above sample input, we are querying the workflows *TestFailedWorkflow* and *TestTerminatedWorkflow* with the status “FAILED” or “TERMINATED”, in the last 15 minutes.

We can also pass *correlationIds* and *freeText* just like on the Orkes workflow dashboard.

#### Sample Output​

```json
{
 "result": {
   "count": 1,
   "workflowsUrl": "https://developer.orkescloud.com?rowsPerPage=200&startFrom=1696447143843&startTo=1696448043843&status=FAILED&status=TERMINATED&workflowType=TestFailedWorkflow&workflowType=TestTerminatedWorkflow",
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

You can see that the task will return an output that contains the field “workflowUrl” which is the link to the workflow executions as specified in the input.

Refer to the [Query Processor task](https://orkes.io/content/reference-docs/system-tasks/query-processor) for detailed information about the parameters.

### Switch

A switch task with JavaScript condition checks if there are failed workflows in a given time range, and if yes, makes a webhook call to alert our users using Opsgenie.

### Opsgenie

This system task sends the alert to Opsgenie using the API integration key stored as a secret. The message to be passed is a deep link URL (workflowUrl)  to failed workflows, which is one of the outputs of the Query Processor task.

#### Sample Input​

```json
{
 "alias": "SomeAlias",
 "description": "https://developer.orkescloud.com/rowsPerPage=200&startFrom=1696447143843&startTo=1696448043843&status=FAILED&workflowType=TestFailedWorkflow",
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

Refer to the [Opsgenie task](https://orkes.io/content/reference-docs/system-tasks/opsgenie) for detailed information on the parameters. 

## Workflow JSON​

Here’s the complete JSON of the example workflow:

```json
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
 "schemaVersion": 2,
 "ownerEmail": "abhishek.gupta@orkes.io"
}
```

The workflow is ready, but you need to integrate Opsgenie with Orkes Conductor before testing it out.

## Setting up Opsgenie Integration​

:::info
You need to have an account in [Opsgenie](https://www.atlassian.com/software/opsgenie). 
:::

1. Login to your Opsgenie console, and [create a team in Opsgenie](https://support.atlassian.com/opsgenie/docs/create-a-team-and-add-members/) where the alerts will be sent.
2. Navigate to the **Teams** tab and click on the created team.

<p align="center"><img src="/content/img/opsgenie-configuration.png" alt="Opsgenie teams" width="100%" height="auto"></img></p>

3. From the left menu, choose **Integrations**, and then click **Add integration**.

<p align="center"><img src="/content/img/opsgenie-integration.png" alt="Adding Integration" width="100%" height="auto"></img></p>

4. Choose **API**.

<p align="center"><img src="/content/img/opsgenie-api-integration.png" alt="Adding API Integration" width="100%" height="auto"></img></p>

5. Provide an **Integration name** and click **Continue**.

<p align="center"><img src="/content/img/opsgenie-api-integration-parameters.png" alt="Adding API Integration Parameters" width="60%" height="auto"></img></p>

6. The API key will be generated. Ensure you turn the integration on by clicking the **Turn on integratio**n button.

<p align="center"><img src="/content/img/opsgenie-api-key.png" alt="Opsgenie API integration key" width="100%" height="auto"></img></p>

## Storing Integration API Key as Secret in Orkes Conductor

The copied API key is to be stored as a secret in Orkes Conductor.

For this:

1. Navigate to **Definitions > Secrets** from the left menu on your Orkes Conductor console.
2. Click **Add secret.** Provide a secret name and paste the copied API key in the previous step.

In this example, we stored the secret as OPS_GENIE_TOKEN. This is referred to in the workflow definition as **"token": "${workflow.secrets.OPS_GENIE_TOKEN}".**

Ensure to replace this secret name with your secret name in the workflow definition.

## Scheduling Alerts​

We can automate this by scheduling to run this workflow at regular intervals.

To schedule the workflow:

1. Navigate to **Definitions > Scheduler** on your Orkes Conductor console.
2. Click **Define schedule**.
3. [Create a scheduler](https://orkes.io/content/developer-guides/scheduling-workflows#creating-schedule) using the following cron expression and choose the alert workflow you’ve created:

```json 
0 * * ? * *
```

This lets the workflow run every minute, and the alerts would be triggered and sent every minute.