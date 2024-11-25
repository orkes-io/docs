import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Event Handlers

Event handlers process incoming messages from external systems and perform actions based on event details. Events can trigger various actions, such as:

* Complete Task
* Terminate Workflow
* Update Variables
* Fail Task
* Start Workflow

:::note Prerequisite
Integrate the required message broker with Orkes Conductor. Refer to the [Integration Guides](https://orkes.io/content/category/integrations/message-broker) for  detailed steps.
:::

## Event handler parameters
Configure these parameters for the Event Handler.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| name | A unique name for the event handler. | Required. | 
| description | A description of the event handler.| Optional. | 
| event | The event queue sink in the format:<br/> “**Type:Config Name:Queue/Topic Name**”.<br/>Where,<ul><li>**Type**–The message broker type where the payload is being received. Supported types:<ul><li>amqp</li><li>sqs</li><li>azure</li><li>kafka</li><li>nats</li><li>gcppubsub</li><li>ibm_mq</li></ul></li><li>**Config Name**–The integration name added to the cluster.</li><li>**Queue/Topic Name**–The name of the queue or topic where the payload is being received.</li></ul> | Required. | 
| condition | An ECMAScript (JavaScript) function to control message processing. The function should return `true` for the message to be processed. [Learn more about filtering events](/content/developer-guides/event-handler#using-conditions-to-filter-events). | Required. | 
| evaluatorType | The type of evaluator for the condition. Supports `javascript’. | Required. | 
| actions | An array of actions to perform. Each action requires specific input parameters. Supported actions include:<ul><li>[complete_task](/content/developer-guides/event-handler#complete-task)</li><li>[terminate_workflow](/content/developer-guides/event-handler#terminate-workflow)</li><li>[update_workflow_variables](/content/developer-guides/event-handler#update-variables)</li><li>[fail_task](/content/developer-guides/event-handler#fail-task)</li><li>[start_workflow](/content/developer-guides/event-handler#start-workflow)</li></ul> | Required. |
| active | Whether the event handler is enabled. Set to `true` to enable the event handler or `false` to disable it. | Required. |

###  Using conditions to filter events

Use the ECMAScript expressions to filter events based on their payload.

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

Use `${$}` to reference the entire payload.

## Actions 

Multiple actions can be triggered based on the events received. Below are the actions and their configuration details.

### Complete Task​

The action to mark a task as completed. There are two methods for marking a task as complete:

* Using `workflowId` and `TaskRefName`.
* Using `taskId`.

**Example Payload**

<Tabs>
<TabItem value="Using workflowId and TaskRefName" label="Using workflowId and TaskRefName">

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

| Parameter | Description | Required/Optional |
| --------- | ----------- | ----------------- |
| actions.**action** | The action to be triggered on receiving events. Set this to `complete_task`.| Required.|
| actions.complete_task.**workflowId** | The ID of the workflow that contains the task to be completed. | Required if using `workflowId` and `taskRefName`method. |
| actions.complete_task.**taskRefName** | The reference name of the task to be marked as completed. | Required if using `workflowId` and `taskRefName`method. |
| actions.complete_task.**taskId** | The task execution ID of the task to be marked as completed. | Required if using `taskId`method. |
| actions.complete_task.**output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. | Optional. | 

### Terminate Workflow​

The action to terminate a running workflow.

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
| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- | 
| actions.**action** | The action to be triggered on receiving events. Set this to `terminate_workflow`. | Required. | 
| actions.terminate_workflow.**workflowId** | The ID of the workflow to be terminated. | Required. | 
| actions.terminate_workflow.**terminationReason** | The reason for terminating the workflow. | Required. | 

### Update Variables​

The action to update variables in a running workflow. Useful for controlling inputs in a long-running workflow.

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

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- | 
| actions.**action** | The action to be triggered on receiving events. Set this to `update_workflow_variables`.| Required. | 
| actions.update_workflow_variables.**workflowId** | The ID of the workflow whose variables need to be updated. | Required. | 
| actions.update_workflow_variables.**appendArray** | If set to `true`, all list (array) variables in the workflow are appended with new values instead of being replaced. This can be used to collect data from a series of events into a single workflow. | Optional. | 
| actions.update_workflow_variables.**variables** | The variables to be updated in the workflow. Can be string, number, boolean, null, or object/array. | Required.| 

### Fail Task​

The action to mark a task as failed. There are two methods for marking a task as failed:

* Using `workflowId` and `TaskRefName`.
* Using `taskId`. 

**Example Payload**

<Tabs>
<TabItem value="Using workflowId and TaskRefName" label="Using workflowId and TaskRefName">

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

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| actions.**action** | The action to be triggered on receiving events. Set this to `fail_task`. | Required. | 
| actions.complete_task.**workflowId** | The ID of the workflow that contains the task to be marked as failed. | Required if using `workflowId` and `taskRefName`method. |
| actions.complete_task.**taskRefName** | The reference name of the task to be marked as failed. | Required if using `workflowId` and `taskRefName`method. | Required if using `workflowId` and `taskRefName`method. |
| actions.complete_task.**taskId** | The task execution ID of the task to be marked as failed. | Required if using `taskId` method. |
| actions.complete_task.**output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. | Optional. | 

### Start Workflow

The action to start a new workflow instance.

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

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- | 
| actions.**action** | The action to be triggered on receiving events. Set this to `start_workflow`. | Required. | 
| actions.start_workflow.**name** | The name of the workflow to be started. | Required. | 
| actions.start_workflow.**version** | The version of the workflow to be started. | Required. | 
| actions.start_workflow.**correlationId** | A unique identifier for the workflow execution, used for correlating related workflows. | Optional. | 
| actions.start_workflow.**idempotencyKey** | A unique key to prevent conflicts with other workflow instances. | Optional. | 
| actions.start_workflow.**idempotencyStrategy** | The idempotency strategy to determine how to handle duplicate requests. Supported values:<ul><li>**RETURN_EXISTING**–Return the `workflowId` of the existing workflow with the same idempotency key.</li><li>**FAIL**–The request will fail if a workflow with the same idempotency key has already been triggered.</li></ul> | Required if ‘idempotencyKey’ is used. | 
| actions.start_workflow.**input** | The input data to be passed to the new workflow. Can be string, number, boolean, null, or object/array. | Optional. | 
| actions.start_workflow.**taskToDomain** | A mapping of task reference names to domain-specific values to [route the task to defined workers](https://orkes.io/content/developer-guides/task-to-domain). | Optional. | 

## Event handler configuration

This is the JSON schema for an event handler.

```json
{
 "name": "sample-event-handler",
 "description": "Sample event handler",
 "event": "message-type:integration-name:queue/topic-name",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
  // action payload
 ],
"active": true
}
```

### Configuring an event handler

<Tabs>
<TabItem value="Using Conductor UI" label="Using Conductor UI">

**To configure an event handler:**
1. Go to **Definitions** > **Event Handler** from the left menu on your Conductor cluster.
2. Click **+Define event handler**.
3. Configure the [event handler parameters](/content/developer-guides/event-handler#event-handler-parameters).
4. Select **Save** > **Confirm Save**.

<p align="center"><img src="/content/img/creating-event-handler-ui-method.png" alt="Creating event handler via UI in Orkes Conductor" width="100%" height="auto"/></p>

:::note
The _Event_ field dropdown lists only the integration added to your Conductor cluster. Select the required integration and append the topic/queue name. Failure to do so may result in execution errors, as the payload won't have a valid destination.
:::

</TabItem>
<TabItem value="Using API" label="Using API">

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
</TabItem>
</Tabs>