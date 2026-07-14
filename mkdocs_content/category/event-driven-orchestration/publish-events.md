---
title: "Publish Events"
description: "Publish messages from workflows to external event systems such as Kafka, Confluent Kafka, Amazon MSK, AMQP/RabbitMQ, NATS, AWS SQS, Azure Service Bus, GCP."
canonical_route: "category/event-driven-orchestration/publish-events"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Publish Events, event-driven orchestration, webhooks"
---

# Publish Events

Publish messages from workflows to external event systems such as Kafka, Confluent Kafka, Amazon MSK, AMQP/RabbitMQ, NATS, AWS SQS, Azure Service Bus, GCP Pub/Sub, and IBM MQ, plus internal Conductor event sinks.

Use these pages when a workflow should publish a message as part of durable execution.

Use the Event task to publish messages from a workflow to configured event sinks.

## Event Task

The Event task publishes a message to a configured sink — an internal Conductor event queue, or an external system such as Kafka, SQS, or another broker — as a step in the workflow, without waiting for a response. Use it when a downstream system or workflow needs to be notified as part of durable execution, and see the [Event Task reference](/content/reference-docs/system-tasks/event) for the full input/output schema, sink configuration, and examples.


## In this section

- [Event Publishing Recipes](/content/eventing)
- [Change Data Capture](/content/developer-guides/enabling-cdc-on-conductor-workflows)
