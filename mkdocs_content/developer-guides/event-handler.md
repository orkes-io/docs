---
title: "Using Event Handlers"
description: "Learn how to configure event handlers in Orkes Conductor to listen for messages from brokers and trigger actions like starting workflows or completing tasks."
canonical_route: "developer-guides/event-handler"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, event-driven orchestration, webhooks, Kafka orchestration, RabbitMQ orchestration"
---

# Using Event Handlers

Event handlers in Orkes Conductor listen for messages from message brokers and trigger workflow actions based on configurable conditions. When an event handler receives a message from a message broker, it can trigger one of the following actions:

- Complete a task
- Terminate a workflow
- Update variables
- Fail a task
- Start a new workflow

!!! tip "5-minute path"
    To get an event handler running quickly: configure the broker integration, choose the sink string, write a condition, choose one action, and test with a representative payload. Add idempotency and monitoring before moving to production.

## Creating an event handler

!!! info "Prerequisites"
    Before configuring an event handler, ensure the following:
    - A supported [message broker](/content/category/integrations/message-broker) is integrated with your Conductor cluster.
    - The target queue or topic already exists in the message broker.
    - Conductor has permission to consume messages from the configured queue or topic.

**To configure an event handler:**

1. Go to **Definitions** > **Event Handler** from the left menu on your Conductor cluster.
2. Select **+ Define event handler**.
3. Configure the event handler parameters:

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| name | A unique name for the event handler. | Required. | 
| description | A description of the event handler.| Optional. | 
| event | The event queue sink in the format:<br/> **message-broker-type:integration-name:topic/queue-name**.<br/>Where,<ul><li>**message-broker-type**: The message broker type from where the payload is being received. Supported types:<ul><li>amqp</li><li>sqs</li><li>azure</li><li>kafka</li><li>nats</li><li>gcp_pubsub</li><li>ibm_mq</li></ul></li><li>**integration-name**: The integration name added to the cluster.</li><li>**topic/queue-name**: The name of the queue or topic where the payload is being received.</li></ul><span class="table-note"><strong>Warning:</strong> When configuring via the Conductor UI, the **Event** field lists only message broker integrations configured in your cluster. Select the required integration and append the topic name or queue name. Failure to do so may result in execution errors, as the payload won't have a valid destination.</span> | Required. | 
| condition | An ECMAScript (JavaScript) function to control message processing. The function should return `true` for the event handler to process the message. [Learn more about filtering events](#filter-events-with-conditions). | Required. | 
| evaluatorType | The type of evaluator for the condition. Currently supports `javascript`. | Required. | 
| actions | An array of actions to perform. Each action requires specific input parameters. Supported actions include:<ul><li>[complete_task](/content/developer-guides/event-handler#complete-task)</li><li>[terminate_workflow](/content/developer-guides/event-handler#terminate-workflow)</li><li>[update_workflow_variables](/content/developer-guides/event-handler#update-variables)</li><li>[fail_task](/content/developer-guides/event-handler#fail-task)</li><li>[start_workflow](/content/developer-guides/event-handler#start-workflow)</li></ul> | Required. |
| active | Whether the event handler is enabled. Set to `true` to enable the event handler or `false` to disable it. | Required. |


<p align="center"><img src="/content/img/creating-event-handler-ui-method.png" alt="Creating event handler via UI in Orkes Conductor" width="100%" height="auto"/></p>

4. Select **Save** > **Confirm Save**.

**Example JSON Schema**

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

### Filter events with conditions

Use ECMAScript expressions to filter events based on their payload. Use `${$}` to reference the entire payload.

**Example**

Given the following payload:

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

The following expressions can be used in **condition** with the indicated results:

| Expression | Result | 
| ---------- | ------ | 
| $.version > 1 | true |
| $.version > 10 | false | 
| $.metadata.length == 300 | true | 

### Reference payload fields

The variable substitution syntax `${fieldName}` lets you pass values from the incoming message payload into your action parameters. Fields are referenced by their key name; nested fields use dot notation.

For example, given this message payload:

```json
{
  "workflowId": "4c87e4f6-06b7-11f1-8cfa-e2ee94ec02d4",
  "waitTaskRefName": "wait_for_lambda_ref",
  "updateTask": true,
  "data": {
    "field_1": "value_1",
    "field_2": "value_2"
  }
}
```

The following references resolve as shown:

| Reference | Resolved value | 
| --------- | -------------- |
| `${workflowId}` | 4c87e4f6-06b7-11f1-8cfa-e2ee94ec02d4 | 
| `${waitTaskRefName}` | wait_for_lambda_ref | 
| `${data.field_1}` | value_1 | 

The same fields are accessible in the `condition` expression using `$.fieldName` syntax (for example, `$.updateTask == true`).

## Configuring actions 

Actions are executed only after the event handler's `condition` evaluates to `true`. An event handler's `actions` array can trigger multiple actions based on the events received. Orkes Conductor supports the following action types:

- [Complete Task](#complete-task)
- [Terminate Workflow](#terminate-workflow)
- [Update Variables](#update-variables)
- [Fail Task](#fail-task)
- [Start Workflow](#start-workflow)

### Complete Task

The `complete_task` action marks a task as complete. You can identify the task to complete using one of the following methods:

* Using `workflowId` and `taskRefName`.
* Using `taskId`.

**Example Payload**

=== "Using workflowId and taskRefName"

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
             "key": "value"
           }
         }
       }
     ]
    }
    ```

=== "Using taskId"

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


**Parameters**

| Parameter | Description | Required/ Optional |
| --------- | ----------- | ----------------- |
| actions. **action** | The action to be triggered on receiving events. Set this to `complete_task`.| Required.|
| actions. complete_task. **workflowId** | The workflow execution ID that contains the task to be completed. | Required if using `workflowId` and `taskRefName`method. |
| actions. complete_task. **taskRefName** | The reference name of the task to be marked as completed. | Required if using `workflowId` and `taskRefName`method. |
| actions. complete_task. **taskId** | The task execution ID of the task to be marked as completed. | Required if using `taskId`method. |
| actions. complete_task. **output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. | Optional. | 

### Terminate Workflow

The `terminate_workflow` action terminates a running workflow.

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
       "workflowId": "${event.payload.workflowId}",
       "terminationReason": "A termination reason"
     }
   }
 ]
}
```

**Parameters**

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| actions. **action** | The action to be triggered on receiving events. Set this to `terminate_workflow`. | Required. | 
| actions. terminate_workflow. **workflowId** | The execution ID of the workflow to be terminated. | Required. | 
| actions. terminate_workflow. **terminationReason** |The reason for termination. | Required. | 

### Update Variables

The `update_workflow_variables` action updates variables in a running workflow. This is useful for controlling inputs in a long-running workflow.

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

**Parameters**

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| actions. **action** | The action to be triggered on receiving events. Set this to `update_workflow_variables`.| Required. | 
| actions. update_workflow_variables. **workflowId** | The execution ID of the workflow whose variables need to be updated. | Required. | 
| actions. update_workflow_variables. **appendArray** | If set to `true`, all list (array) variables in the workflow are appended with new values instead of being replaced. This can be used to collect data from a series of events into a single workflow. | Optional. | 
| actions. update_workflow_variables. **variables** | The variables to be updated in the workflow. Can be string, number, boolean, null, or object/array. | Required.| 

### Fail Task

The `fail_task` action marks a task as failed. You can identify the task to fail using one of the following methods:

* Using `workflowId` and `taskRefName`.
* Using `taskId`.

**Example Payload**

=== "Using workflowId and taskRefName"

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

=== "Using taskId"

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


**Parameters**

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- |
| actions. **action** | The action to be triggered on receiving events. Set this to `fail_task`. | Required. | 
| actions. fail_task. **workflowId** | The execution ID of the workflow that contains the task to be marked as failed. | Required if using `workflowId` and `taskRefName`method. |
| actions. fail_task. **taskRefName** | The reference name of the task to be marked as failed. | Required if using `workflowId` and `taskRefName`method. | 
| actions. fail_task. **taskId** | The task execution ID of the task to be marked as failed. | Required if using `taskId` method. |
| actions. fail_task. **output** | The output data to be sent along with the completion. Can be string, number, boolean, null, or object/array. | Optional. | 

### Start Workflow

The `start_workflow` action starts a new workflow instance.

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

**Parameters**

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ----------------- | 
| actions. **action** | The action to be triggered on receiving events. Set this to `start_workflow`. | Required. | 
| actions. start_workflow. **name** | The name of the workflow to be executed. This workflow should have a pre-existing definition in Conductor. | Required. | 
| actions. start_workflow. **version** | The version of the workflow to be executed. If unspecified, the latest version will be used. | Required. | 
| actions. start_workflow. **correlationId** | A unique identifier for the workflow execution, used to correlate the current workflow instance with other workflows. | Optional. | 
| actions. start_workflow. **idempotencyKey** |A unique, user-generated key to prevent duplicate workflow executions. Supports `${fieldName}` substitution from the event payload (for example, `${orderId}`). Static strings are passed through unchanged. Idempotency data is retained for the life of the workflow execution.| Optional. | 
| actions. start_workflow. **idempotencyStrategy** | The idempotency strategy for handling duplicate requests. Supported values:<ul><li>`RETURN_EXISTING`: Return the `workflowId` of the workflow instance with the same idempotency key.</li> <li>`FAIL`: Start a new workflow instance only if there are no workflow executions with the same idempotency key.</li> <li>`FAIL_ON_RUNNING`: Start a new workflow instance only if there are no RUNNING or PAUSED workflows with the same idempotency key. Completed workflows can run again.</li></ul> | Required if `idempotencyKey` is used. | 
| actions. start_workflow. **input** | The input data to be passed to the new workflow. Can be string, number, boolean, null, or object/array. | Optional. | 
| actions. start_workflow. **taskToDomain** | A mapping of task reference names to domain-specific values to [route the task to defined workers](https://orkes.io/content/developer-guides/task-to-domain). | Optional. | 

#### Ordering behavior with Kafka

Kafka guarantees message ordering within a partition. However, when an event handler triggers a `start_workflow` action, workflow creation is processed concurrently, meaning two messages from the same partition may result in workflows starting in a different order than the messages arrived.

If ordering matters for your use case:

- Use a consistent partition key for messages that must be processed in order, so they land on the same partition.
- Use `idempotencyKey` on the `start_workflow` action to prevent duplicate workflows from being created if a message is redelivered.
- Handle ordering inside the workflow; pass a sequence number or timestamp in the event payload and use it within the workflow to detect and respond to out-of-order execution.
