import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event Handler

An event handler processes incoming messages and performs actions based on the event's details. Events can trigger various actions, such as:

* Complete Task
* Terminate Workflow
* Update Variables
* Fail Task
* Start Workflow

## Event Handler Configuration

:::note Prerequisite
Ensure the necessary [message broker is integrated with Orkes Conductor](https://orkes.io/content/category/integrations/message-broker) to receive events.
:::

Once the integration is complete, the next step is to configure an event handler.

To configure via UI:

1. Navigate to **Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click **+ Define event handler** from the top-right corner.
3. Enter the following parameters:

| Parameter | Description |
| --------- | ----------- |
| name | The name of the event handler. |
| description | A description of the event handler. |
| event | The event queue sink in the format: `Type : Config Name : Queue/Topic Name`.<br/>Where,<ul><li>**Type** - The message broker type where the payload is being received. Supported types include:<ul><li>amqp</li><li>sqs</li><li>azure</li><li>kafka</li><li>nats</li><li>gcppubsub</li><li>ibm_mq</li></ul></li><li>**Config Name** - The integration name added to the cluster.</li><li>**Queue/Topic Name** - The name of the queue or topic where the payload is being received.</li></ul>The UI drop-down lists only the integration added to your Orkes Conductor cluster. Select the required integration and ensure you append the topic/queue name. Failure to do so may result in execution errors, as the payload won't have a valid destination. | 
| condition | ECMAScript (JavaScript) function to control message processing. The function should return `true` for the message to be processed. |
| evaluatorType | The type of evaluator for the condition. Set to `javascript` by default. | 
| actions | Array of actions to perform. Each action requires specific input parameters. Supported actions:<ul><li>complete_task</li><li>terminate_workflow</li><li>update_workflow_variables</li><li>fail_task</li><li>start_workflow</li></ul> | 
| active | Set to `true` to enable the event handler or `false` to disable it. | 

This is the JSON schema for the event handler.

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "message-type:integration-name:queue/topic-name",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
  // action payload
 ]
}
```

To configure an event handler via the API, use the `POST /api/event` endpoint with the following JSON payload:

```json
{
 "name": "<NAME of the EVENT HANDLER>",
 "event": "<MESSAGE_TYPE>:<CONFIG_NAME>:<QUEUE_OR_TOPIC_NAME>",
 "condition": "true",
 "actions": [
   {
     "action": "<ACTION>",
     <ACTION INPUT PARAMS>, //Input Params based on the action
     "expandInlineJSON": false
   }
 ],
 "active": true,
 "evaluatorType": "javascript",
 "createdBy": "john.doe@acme.com"
}
```

##  Using Conditions to Filter Events

You can use ECMAScript expressions to filter events based on their payload.

**Example Payload**

```json
{
   "fileType": "AUDIO",
   "version": 3,
   "metadata": {
      "length": 300,
      "codec": "aac"
   }
}
```

The following expressions can be used in condition with the indicated results:

| Expression | Result | 
| ---------- | ------ | 
| $.version > 1 | true |
| $.version > 10 | false | 
| $.metadata.length == 300 | true | 

:::note
To reference the entire payload, use `${$}`.
:::

## Actions 

Based on the events received, several actions can be triggered in Orkes Conductor.

### Complete Task​

Marks a task as completed. It can be done using two methods:

* Using workflowId + TaskRefName
* Using taskId 

**Example Payload**

<Tabs>
<TabItem value="Using workflowId + TaskRefName" label="Using workflowId + TaskRefName">

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "complete_task",
     "expandInlineJSON": false,
     "complete_task": {
       "workflowId": "${workflowId}",
       "taskRefName": "${taskReferenceName}",
       "output": {
         "ket": "value"
       }
     }
   }
 ]
}
```
</TabItem>
<TabItem value="Using taskId" label="Using taskId">

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "complete_task",
     "expandInlineJSON": false,
     "complete_task": {
       "taskId": "${taskId}",
       "output": {
         "key": "value"
       }
     }
   }
 ]
}
```
</TabItem>
</Tabs>

| Parameter | Description |
| --------- | ----------- |
| actions.**action** | Specifies the action to be triggered on receiving events. Set this to `complete_task`.|
| actions.complete_task.**workflowId** | The ID of the workflow that contains the task to be completed (required if using `workflowId + taskRefName` method).| 
| actions.complete_task.**taskRefName** | The reference name of the task to be marked as completed (required if using `workflowId + taskRefName` method). |
| actions.complete_task.**taskId** | The task execution ID of the task to be marked as completed (required if using `taskId` method). | 
| actions.complete_task.**output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. | 

### Terminate Workflow​

Terminates a running workflow.

**Example Payload**

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "terminate_workflow",
     "expandInlineJSON": false,
     "terminate_workflow": {
       "workflowId": "${event.payload.workflowId)",
       "terminationReason": "A termination reason"
     }
   }
 ]
}
```
| Parameter | Description |
| --------- | ----------- |
| actions.**action** | Specifies the action to be triggered on receiving events. Set this to `terminate_workflow`.|
| actions.terminate_workflow.**workflowId** | The ID of the workflow to be terminated. |
| actions.terminate_workflow.**terminationReason** | The reason for terminating the workflow. |

### Update Variables​

Updates variables in a running workflow. Useful for controlling inputs in a long-running workflow.

**Example Payload**

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "update_workflow_variables",
     "expandInlineJSON": false,
     "update_workflow_variables": {
       "workflowId": "${targetWorkflowId}",
       "appendArray": true,
       "variables": {
         "key": "value"
       }
     }
   }
 ]
}
```

| Parameter | Description |
| --------- | ----------- |
| actions.**action** | Specifies the action to be triggered on receiving events. Set this to `update_workflow_variables`.|
| actions.update_workflow_variables.**workflowId** | The ID of the workflow whose variables need to be updated. |
| actions.update_workflow_variables.**appendArray** | If true, all list (array) variables in the workflow will be treated as append instead of replace. This can be used to collect data from a series of events into a single workflow. | 
| actions.update_workflow_variables.**variables** | The variables to be updated in the workflow. Can be string, number, boolean, null, or object/array. |

### Fail Task​

Marks a task as failed. It can be done using two methods:

* Using workflowId + TaskRefName
* Using taskId 

**Example Payload**

<Tabs>
<TabItem value="Using workflowId + TaskRefName" label="Using workflowId + TaskRefName">

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "fail_task",
     "expandInlineJSON": false,
     "fail_task": {
       "workflowId": "${workflowId}",
       "taskRefName": "${taskReferenceName}",
       "output": {
         "key": "value"
       }
     }
   }
 ]
}
```
</TabItem>
<TabItem value="Using taskId" label="Using taskId">

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "fail_task",
     "expandInlineJSON": false,
     "fail_task": {
       "taskId": "${taskId}",
       "output": {
         "key": "value"
       }
     }
   }
 ]
}
```
</TabItem>
</Tabs>

| Parameter | Description |
| --------- | ----------- |
| actions.**action** | Specifies the action to be triggered on receiving events. Set this to `fail_task`.|
| actions.complete_task.**workflowId** | The ID of the workflow that contains the task to be failed (required if using `workflowId + taskRefName`method). | 
| actions.complete_task.**taskRefName** | The reference name of the task to be marked as failed (required if using `workflowId + taskRefName`method). | 
| actions.complete_task.**taskId** | The task execution ID of the task to be marked as failed (required if using `taskId` method). |
| actions.complete_task.**output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. |

### Start Workflow

Starts a new instance of a workflow.

**Example Payload**

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "kafka:sampleConfig:sampleName",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "workflow-name",
       "version": "1",
       "correlationId": "1234",
       "idempotencyKey": "xxxxxx",
       "input": {
         "key": "value"
       },
       "taskToDomain": {
         "key": "value"
       },
       "idempotencyStrategy": "RETURN_EXISTING"
     },
     "expandInlineJSON": false
   }
 ]
}
```

| Parameter | Description |
| --------- | ----------- |
| actions.**action** | Specifies the action to be triggered on receiving events. Set this to `start_workflow`.|
| actions.start_workflow.**name** | The name of the workflow to be started. |
| actions.start_workflow.**version** | The version of the workflow to be started. | 
| actions.start_workflow.**correlationId** | A unique identifier for the workflow execution, used for correlating related workflows. | 
| actions.start_workflow.**idempotencyKey** | A unique key to prevent conflicts with other workflow instances. |
| actions.start_workflow.**idempotencyStrategy** | The idempotency strategy determines how to handle duplicate requests: `RETURN_EXISTING` will return the existing workflow if one with the same idempotency key exists, while `FAIL` will reject the request if a workflow with that idempotency key has already been triggered. |
| actions.start_workflow.**input** | The input data to be passed to the new workflow. Can be string, number, boolean, null, or object/array. | 
| actions.start_workflow.**taskToDomain** | A mapping of task reference names to domain-specific values. This can be used to define task-specific data or configurations. | 