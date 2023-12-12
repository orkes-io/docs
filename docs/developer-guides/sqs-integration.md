# Integrating Orkes Conductor with SQS

This developer guide includes the steps to integrate Orkes Conductor with Amazon SQS (Simple Queue Service). The integration involves updating the access policy for the SQS queue & creating a workflow in Orkes Conductor for receiving events from the SQS messaging system.  

## Steps to Integrate Conductor Cluster with External-hosted SQS

**Prerequisites:**

- AWS hosted Conductor cluster
- Access to AWS IAM to manage permissions

### Updating Access Policy for SQS Queue in AWS Cluster

1. [Reach out to the Orkes team](https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg) to identify the IAM roles associated with the Conductor worker and server pods.
2. Navigate to the AWS console and locate the SQS queue.
3. Update the access policy to grant permissions for specific actions (e.g., ReceiveMessages, DeleteMessage, SendMessage, ChangeMessageVisibility, GetQueueAttributes, SetQueueAttributes, GetQueueUrl) to the identified IAM role.

<p align="center"><img src="/content/img/access-policy-aws-web-console.png" alt="Access Policy in AWS Web Console" width="90%"
                       height="auto"/></p>

Here’s a sample policy snippet:

```json
{
      "Sid": "test",
      "Effect": "Allow",
      "Principal": {
        <IAM-from-step-1>
      },
      "Action": "SQS:*",
      "Resource": "arn:aws:sqs:us-west-2:your-aws-account-id:queue-name"
    }
```

### Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing an SQS queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,
1. Navigate to **Definitions > Workflow,** and click the **Define Workflow** button.
2. Create a workflow with an event task using the following JSON template:

```json
{
"name": "event_task",
"taskReferenceName": "event_task_ref",
"inputParameters": {
	"param": "value"
      },
"type": "EVENT",
"decisionCases": {},
"defaultCase": [],
"forkTasks": [],
"startDelay": 0,
"joinOn": [],
"sink": "sqs:arn:aws:sqs:us-west-2:606699376960:crossaccountqueue",
"optional": false,
"defaultExclusiveJoinTask": [],
"asyncComplete": false,
"loopOver": [],
"onStateChange": {}
}
```

3. The [event task](https://orkes.io/content/reference-docs/system-tasks/event) should use a sink of “sqs:full-queue-arn” or a sink of “sqs:https://full-queue-url”. 

:::note
Any usage of SQS in the “event” field of the [event handler](https://orkes.io/content/developer-guides/event-handler) or the “sink” field of the event task must use queue URL or queue ARN.
:::

You can also use the following API to create the workflow:

```
POST /api/metadata/workflow
```

Check out the API doc for more details about [creating a workflow using the API method](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition).

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. For quick testing, you can use the **Run Workflow** button on the left menu on your Orkes Conductor console. 

<p align="center"><img src="/content/img/run-workflow-conductor-ui.png" alt="Running workflow from Conductor UI" width="60%"
                       height="auto"/></p>

Or you can use the [following API to start the workflow execution](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution):

```
POST /api/workflow/{name}
```

Provide the workflow name as the input parameter and run the command. 

The response body of the API request returns the workflow execution ID. 

<p align="center"><img src="/content/img/response-body-in-api-request.png" alt="Workflow execution ID returned in the response body" width="90%"
                       height="auto"/></p>

You can verify the execution status by navigating to **Executions > Workflows** from the Conductor UI and searching using this workflow ID.

<p align="center"><img src="/content/img/workflow-execution-from-conductor-ui.png" alt="Workflow execution from Conductor UI" width="90%"
                       height="auto"/></p>

Upon successful execution, go to AWS Web Console for that SQS queue, poll for messages, and inspect the payload to verify the integration is successful.

<p align="center"><img src="/content/img/aws-console.png" alt="Verifying from AWS console" width="90%"
                       height="auto"/></p>