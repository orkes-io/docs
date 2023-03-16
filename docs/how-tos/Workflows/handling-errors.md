---
sidebar_position: 1
---

# Workflow Failure

When a workflow fails, there are 2 ways to handle the exception.

## `failureWorkflow`

In your main workflow definition, you can configure a workflow to run upon failure by adding the following parameter to the workflow:

```json
"failureWorkflow": "<name of your failure workflow>",
```

When there is an issue with your workflow, Conductor will start the failure workflow. By default, three parameters are passed:

- _reason_ Reason for the failure.
- _workflowId_: Use this to pull the details of the failed workflow.
- _failureStatus_ Status for the workflow
- _failureTaskId_ taskId of the task because of which the workflow failed.

> The `reason` parameter will, by default, have text similar to `Workflow is FAILED by TERMINATE task: 84eb2dcb-ebfd-11ec-b770-12aa5996f545`. If a workflow fails via a TERMINATE task, the `terminateReason` parameter in the TERMINATE task can be used to override the default `reason` text.

> If the worker task is failed. Setting `reasonForIncompletion` in the taskResult from worker will set the reason in the failure workflow input.

### Example

Here is a sample failure workflow that sends a message to Slack when the workflow fails. It posts the reason and the workflowId into a slack message - to allow for quick debugging:

```JSON
{
  "name": "shipping_failure",
  "description": "workflow for failures with Bobs widget workflow",
  "version": 1,
  "tasks": [
    {
      "name": "slack_message",
      "taskReferenceName": "send_slack_message",
      "inputParameters": {
        "http_request": {
          "headers": {
            "Content-type": "application/json"
          },
          "uri": "https://hooks.slack.com/services/<Unique Slack generated Key goes here>",
          "method": "POST",
          "body": {
            "text": "workflow: ${workflow.input.workflowId} failed. ${workflow.input.reason}"
          },
          "connectionTimeOut": 5000,
          "readTimeOut": 5000
        }
      },
      "type": "HTTP",
      "retryCount": 3
    }
  ],
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
}
```

### Example Use Case

The [check_address](/content/docs/usecases/US_post_office) use case has several terminate tasks that run a failure workflow. The `address_error` task overrides the `terminateReason` parameter.
