---
title: "Using Event Handlers"
description: "Learn how to configure event handlers to listen for messages from message brokers and trigger workflow actions such as starting workflows, completing tasks, or."
---

# Using Event Handlers

Event handlers consume messages from a configured broker and run Conductor actions when a condition matches. Use them when a queue, topic, or internal Conductor event should start a workflow, complete a waiting task, update workflow variables, fail a task, or terminate a workflow.

!!! tip "5-minute path"
    Configure the broker integration, choose the sink string, write a condition, choose one action, test with a representative payload, then add idempotency and monitoring before production.

## Configuring event handlers

Prerequisites:

- A supported [message broker](/content/category/integrations/message-broker) is integrated with the cluster.
- The queue or topic exists.
- Conductor has permission to consume from the queue or topic.

Event handler shape:

```json
{
  "name": "payment-events",
  "description": "Start payment workflows from payment events",
  "event": "kafka:payments:payment-events",
  "evaluatorType": "javascript",
  "condition": "$.type == 'payment.authorized'",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "process_payment_event",
        "version": 1,
        "input": {
          "paymentId": "${paymentId}",
          "status": "${status}"
        }
      }
    }
  ],
  "active": true
}
```

| Field | Description |
| ----- | ----------- |
| `name` | Unique event handler name. |
| `event` | Sink string in the format `message-broker-type:integration-name:topic-or-queue`. |
| `evaluatorType` | Use `javascript` for condition evaluation. |
| `condition` | JavaScript expression that must evaluate to `true`. |
| `actions` | One or more actions to run when the condition matches. |
| `active` | Enables or disables the handler. |

Supported sink prefixes include `amqp`, `sqs`, `azure`, `kafka`, `nats`, `gcp_pubsub`, and `ibm_mq`.

### Configuring conditions to filter events

Conditions prevent the handler from processing messages that are not relevant.

Given this payload:

```json
{
  "type": "payment.authorized",
  "paymentId": "pay_123",
  "amount": 2500,
  "metadata": {
    "region": "us-east"
  }
}
```

Example conditions:

```javascript
$.type == "payment.authorized"
$.amount > 1000
$.metadata.region == "us-east"
```

Keep conditions simple. If filtering requires complex business logic, start a workflow and let worker code handle it with tests.

### Referencing payload fields

Use `${fieldName}` to map fields from the message payload into action parameters. Nested fields use dot notation.

| Reference | Resolves to |
| --------- | ----------- |
| `${paymentId}` | `pay_123` |
| `${status}` | Payload field named `status` |
| `${metadata.region}` | `us-east` |

## Configuring actions

An event handler can run one or more actions after the condition evaluates to `true`.

### Complete Task

Use `complete_task` when an external event should unblock a waiting workflow task.

```json
{
  "action": "complete_task",
  "complete_task": {
    "workflowId": "${workflowId}",
    "taskRefName": "${taskRefName}",
    "output": {
      "approved": true,
      "eventId": "${eventId}"
    }
  }
}
```

Use this for callback patterns where the workflow started earlier and is waiting for a broker event.

### Terminate Workflow

Use `terminate_workflow` when an event should stop a running workflow.

```json
{
  "action": "terminate_workflow",
  "terminate_workflow": {
    "workflowId": "${workflowId}",
    "reason": "Terminated by event ${eventId}"
  }
}
```

Use this carefully. Prefer failing a specific task or sending a signal when only part of the workflow should stop.

### Update Variables

Use `update_workflow_variables` to update workflow-level variables from an event.

```json
{
  "action": "update_workflow_variables",
  "update_workflow_variables": {
    "workflowId": "${workflowId}",
    "variables": {
      "paymentStatus": "${status}",
      "providerEventId": "${eventId}"
    }
  }
}
```

Use variables for runtime state that later tasks need to read.

### Fail Task

Use `fail_task` when an external event means a waiting or in-progress task should fail.

```json
{
  "action": "fail_task",
  "fail_task": {
    "workflowId": "${workflowId}",
    "taskRefName": "${taskRefName}",
    "reason": "Rejected by external system"
  }
}
```

Use this when the workflow should follow its configured failure path instead of waiting indefinitely.

### Start Workflow

Use `start_workflow` when each event should create a new workflow execution.

```json
{
  "action": "start_workflow",
  "start_workflow": {
    "name": "process_payment_event",
    "version": 1,
    "correlationId": "${paymentId}",
    "input": {
      "paymentId": "${paymentId}",
      "status": "${status}",
      "eventId": "${eventId}"
    }
  }
}
```

For event sources with at-least-once delivery, use a stable event ID or business ID as an idempotency key where supported by the start path.

## Production notes

- Make actions idempotent. Broker messages can be redelivered.
- Keep conditions small and deterministic.
- Use correlation IDs so executions can be traced back to source events.
- Validate payload shape in the workflow before side effects.
- Monitor failed event-triggered workflows and broker dead-letter queues.
- Prefer starting workflows over embedding complex business logic in event-handler conditions.
