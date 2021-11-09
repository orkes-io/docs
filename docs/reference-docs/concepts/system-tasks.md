---
sidebar_position: 1
---

# System Task

System Tasks are built-in tasks which are general purpose and re-usable workers that runs on the Conductor server.
Having such re-usable general purpose tasks allows you to get started without having to write custom workers.
 
## Available System Tasks

Conductor has the following set of system tasks available.

|Task|Description|Use Case|
|---|---|---|
|HTTP|[HTTP Task](../system-tasks/http-task)|Invoke any HTTP(S) endpoints|
|Inline Code Execution|[Inline Task](../system-tasks/inline-task)|Execute arbitrary lightweight javascript code|
|Event Publishing|[Event Task](../system-tasks/event-task)|External eventing system integration. e.g. amqp, sqs, nats|
|JQ Transform|[JQ Task](../system-tasks/json-jq-task)|Use <a href="https://github.com/stedolan/jq">JQ</a> to transform task input/output|
|Kafka Publish|[Kafka Task](../system-tasks/kafka-publish-task)|Publish messages to Kafka|