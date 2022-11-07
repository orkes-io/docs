---
sidebar_position: 1
---

# System Task

System tasks/Workers are built-in tasks that run on the Conductor servers. They are general-purpose and reusable tasks, and can be implemented faster when compared to user-defined tasks because there isn’t a need to write a custom worker.

## Supported System Tasks

Conductor has the following set of system tasks available.

|Task|Description|Use Case|
|---|---|---|
|HTTP|[HTTP task](https://orkes.io/content/docs/reference-docs/system-tasks/http-task)|Used to invoke any HTTP(S) endpoints.|
|Inline Code Execution|[Inline task](https://orkes.io/content/docs/reference-docs/system-tasks/inline-task)|Used to execute arbitrary lightweight javascript code.|
|Event Publishing|[Event task](https://orkes.io/content/docs/reference-docs/system-tasks/event-task)|Used to publish an event into external eventing systems such as AMQP, SQS, and NATS.|
|JQ Transform|[JSON JQ Transform task](https://orkes.io/content/docs/reference-docs/system-tasks/json-jq-transform-task)|Allows processing of JSON data using <a href="https://github.com/stedolan/jq">JQ</a> tool’s query expression language.|
|Kafka Publish|[Kafka Publish task](https://orkes.io/content/docs/reference-docs/system-tasks/kafka-publish-task)|Used to publish messages to other microservices via Kafka.|
|Business Rules|[Business Rule Task](https://orkes.io/content/docs/reference-docs/system-tasks/business-rule)|Evaluate Business rules from a spreadsheet|
|HTTP Poll|[HTTP Poll Task](https://orkes.io/content/docs/reference-docs/system-tasks/http-poll-task)|Used to invoke any HTTP API until the specified condition matches.|