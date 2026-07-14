---
title: "Event Publishing Recipes"
description: "Examples for publishing events to Kafka, NATS, RabbitMQ, SQS, and other event sinks from Orkes Conductor workflows."
canonical_route: "eventing"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, event-driven orchestration, webhooks, Kafka orchestration, RabbitMQ orchestration"
---

# Event-driven recipes

### Publish events to a message broker

Use the `EVENT` task type to publish messages. The `sink` field determines the destination, in the format `message-broker-type:integration-name:topic-or-queue-name`. The `integration-name` is the name you gave the broker connection when you added it under **Integrations > Connections and Resources**.

**Kafka:**

```json
{
  "name": "publish_to_kafka",
  "taskReferenceName": "kafka_event",
  "type": "EVENT",
  "sink": "kafka:<your-integration-name>:order-events",
  "inputParameters": {
    "orderId": "${workflow.input.orderId}",
    "status": "PROCESSED"
  }
}
```

**NATS:**

```json
{
  "name": "publish_to_nats",
  "taskReferenceName": "nats_event",
  "type": "EVENT",
  "sink": "nats:<your-integration-name>:order-events",
  "inputParameters": {
    "orderId": "${workflow.input.orderId}",
    "status": "PROCESSED"
  }
}
```

**AMQP (RabbitMQ):**

```json
{
  "name": "publish_to_amqp",
  "taskReferenceName": "amqp_event",
  "type": "EVENT",
  "sink": "amqp:<your-integration-name>:order-events",
  "inputParameters": {
    "orderId": "${workflow.input.orderId}",
    "status": "PROCESSED"
  }
}
```

**Sink format reference:**

| Message Broker | Type Keyword | Sink Format |
|---|---|---|
| Apache Kafka | `kafka` | `kafka:integration-name:topic-name` |
| Confluent Kafka | `kafka_confluent` | `kafka_confluent:integration-name:topic-name` |
| Amazon MSK | `kafka` | `kafka:integration-name:topic-name` |
| AWS SQS | `sqs` | `sqs:integration-name:queue-name` |
| AMQP (RabbitMQ) | `amqp` | `amqp:integration-name:queue-or-exchange-name` |
| Azure Service Bus | `azure` | `azure:integration-name:topic-or-queue-name` |
| GCP Pub/Sub | `gcp_pubsub` | `gcp_pubsub:integration-name:topic-name` |
| IBM MQ | `ibm_mq` | `ibm_mq:integration-name:queue-name` |
| NATS | `nats` | `nats:integration-name:subject-name` |

See the [Event task reference](/content/reference-docs/system-tasks/event) for the full parameter list, and [Message Broker Integrations](/content/category/integrations/message-broker) for how to connect each broker.

---

### Listen for events to trigger workflows

Register event handlers to start workflows automatically when messages arrive on a queue or topic. The `event` field uses the same `message-broker-type:integration-name:topic-name` format as the Event task's `sink`.

**Kafka event handler:**

```json
{
  "name": "kafka_order_handler",
  "event": "kafka:<your-integration-name>:order-events",
  "condition": "$.status == 'NEW'",
  "evaluatorType": "javascript",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "process_order",
        "input": {
          "orderId": "${orderId}",
          "payload": "${$}"
        }
      }
    }
  ],
  "active": true
}
```

**NATS event handler:**

```json
{
  "name": "nats_notification_handler",
  "event": "nats:<your-integration-name>:notifications",
  "condition": "true",
  "evaluatorType": "javascript",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "handle_notification",
        "input": { "data": "${$}" }
      }
    }
  ],
  "active": true
}
```

**AMQP event handler:**

```json
{
  "name": "amqp_task_handler",
  "event": "amqp:<your-integration-name>:task-queue",
  "condition": "true",
  "evaluatorType": "javascript",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "process_task",
        "input": { "taskData": "${$}" }
      }
    }
  ],
  "active": true
}
```

Event handlers are registered from the Conductor UI, not a public REST endpoint — see [Using Event Handlers](/content/developer-guides/event-handler) for the full setup flow, including conditions, evaluators, and all available actions.

---

### Complete a task from an external event

Use a `WAIT` task to pause a workflow until an external system sends an event. An event handler listens for that event and completes the task, resuming the workflow.

**Workflow with WAIT task:**

```json
{
  "name": "order_with_approval",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "process_order",
      "taskReferenceName": "process",
      "type": "SIMPLE"
    },
    {
      "name": "wait_for_approval",
      "taskReferenceName": "approval_wait",
      "type": "WAIT"
    },
    {
      "name": "ship_order",
      "taskReferenceName": "ship",
      "type": "SIMPLE"
    }
  ]
}
```

**Event handler to complete the WAIT task:**

```json
{
  "name": "approval_event_handler",
  "event": "kafka:<your-integration-name>:approval-events",
  "condition": "$.approved == true",
  "evaluatorType": "javascript",
  "actions": [
    {
      "action": "complete_task",
      "complete_task": {
        "workflowId": "${workflowId}",
        "taskRefName": "approval_wait",
        "output": {
          "approvedBy": "${approvedBy}",
          "approvedAt": "${timestamp}"
        }
      }
    }
  ],
  "active": true
}
```

When a message with `approved: true` arrives on the `approval-events` Kafka topic, the handler completes the `WAIT` task and the workflow continues to `ship_order`.

Register the workflow definition via the Metadata API, then create the event handler from the Conductor UI:

```shell
curl -X POST '<YOUR-CLUSTER-URL>/api/metadata/workflow' \
  -H 'Content-Type: application/json' \
  -H "X-Authorization: $TOKEN" \
  -d @order_with_approval.json
```
