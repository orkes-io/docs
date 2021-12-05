---
sidebar_position: 1
---

# System Task

System Tasks (Workers) are built-in tasks that are general purpose and re-usable. They run on the Conductor servers.
Such tasks allow you to get started without having to write custom workers.

## Available System Tasks

Conductor has the following set of system tasks available.

|Task|Description|Use Case|
|---|---|---|
|HTTP|[HTTP Task](../../reference-docs/system-tasks/http-task)|Invoke any HTTP(S) endpoints|
|Inline Code Execution|[Inline Task](../../reference-docs/system-tasks/inline-task)|Execute arbitrary lightweight javascript code|
|Event Publishing|[Event Task](../../reference-docs/system-tasks/event-task)|External eventing system integration. e.g. amqp, sqs, nats|
|JQ Transform|[JQ Task](../../reference-docs/system-tasks/json-jq-transform-task)|Use <a href="https://github.com/stedolan/jq">JQ</a> to transform task input/output|
|Kafka Publish|[Kafka Task](../../reference-docs/system-tasks/kafka-publish-task)|Publish messages to Kafka|