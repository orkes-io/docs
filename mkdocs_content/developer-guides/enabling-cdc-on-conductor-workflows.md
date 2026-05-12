---
title: "Enabling CDC (Change Data Capture)"
description: "Learn how to enable Change Data Capture (CDC) to stream workflow state changes to external message brokers in Orkes Conductor."
---

# Enabling CDC (Change Data Capture)

Change Data Capture sends workflow state-change events to an external message broker. Use it when another system needs to react to workflow lifecycle changes without polling Conductor.

!!! tip "5-minute path"
    Create a broker integration, enable `workflowStatusListenerEnabled`, set `workflowStatusListenerSink`, run a workflow, and verify messages in the target topic or queue.

## Configuring CDC parameters

Prerequisites:

- A supported message broker integration exists in the cluster.
- The target topic or queue exists.
- Conductor has permission to publish to the target.

Add these fields to the workflow definition:

```json
{
  "name": "order_fulfillment",
  "version": 1,
  "schemaVersion": 2,
  "workflowStatusListenerEnabled": true,
  "workflowStatusListenerSink": "kafka:orders-kafka:workflow-status-events",
  "tasks": []
}
```

| Parameter | Description |
| --------- | ----------- |
| `workflowStatusListenerEnabled` | Set to `true` to emit workflow state-change events. |
| `workflowStatusListenerSink` | Broker sink in the format `message-broker-type:integration-name:topic-or-queue`. |

Supported broker prefixes include `amqp`, `sqs`, `azure`, `kafka`, `nats`, `gcp_pubsub`, and `ibm_mq`.

## Using CDC with Kafka and AVRO

!!! info "Supported since"
    v4.1.74 and later, v5.2.8 and later

When using Kafka with AVRO, provide the schema name in workflow input:

```json
{
  "_schema": "ConductorEvent"
}
```

The target schema should include the event metadata your consumers require. A minimal event record commonly includes:

```json
{
  "name": "ConductorEvent",
  "type": "record",
  "fields": [
    { "name": "_schema", "type": "string" },
    { "name": "workflowType", "type": "string" },
    { "name": "eventType", "type": "string" },
    { "name": "workflowInstanceId", "type": "string" },
    { "name": "sink", "type": "string" },
    { "name": "taskId", "type": "string", "default": "" },
    { "name": "workflow", "type": "string", "default": "" },
    { "name": "task", "type": "string", "default": "" }
  ]
}
```

## Verifying CDC events

Start a workflow that has CDC enabled, then read from the configured topic or queue. You should see events as the workflow transitions through states such as `RUNNING`, `COMPLETED`, `FAILED`, `TIMED_OUT`, or `TERMINATED`.

Troubleshooting checklist:

- Confirm the workflow definition has `workflowStatusListenerEnabled: true`.
- Confirm the sink format is correct.
- Confirm the broker integration name matches the integration configured in Conductor.
- Confirm the topic or queue exists.
- Confirm Conductor has publish permissions.
- For AVRO, confirm `_schema` is present and matches the registry.

## Production notes

- CDC is best for event-driven integration, audit streams, and downstream projections.
- Consumers should be idempotent because events can be redelivered.
- Use a schema registry and version schemas deliberately.
- Keep sensitive data out of workflow input if downstream CDC consumers do not need it.
