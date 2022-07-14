---
sidebar_position: 1
---

# Workflows

At a high level, a workflow encompasses flow of your business logic and orchestrates the flow of service calls.

Conductor workflows are a composition of _Tasks_ and _Operators_.
* An **Operator** in a workflow is your programming language construct such as switch, loop, fork/join or a return statement. 
* A **Task** represents business logic execution such as making an HTTP call, sending email, or doing  work such as processing data files or executing some business logic.

```
Workflow = {Tasks + Operators}
```

# Tasks and Workers
Tasks are executed by Workers that run _outside_ the Conductor server deployment.
Conductor is agnostic to how the workers are deployed and run and provides lightweight SDKs in all major languages that allows you to expose existing functionality as Conductor Workers.
Workers can run on bare metal, on containers, VMs, or as serverless functions.

# System Tasks
Conductor also provides pre-built workers for most commonly used tasks.

Conductor has the following set of system tasks available.

|Task|Description|Use Case|
|---|---|---|
|HTTP|[HTTP Task](../../reference-docs/system-tasks/http-task)|Invoke any HTTP(S) endpoints|
|Inline Code Execution|[Inline Task](../../reference-docs/system-tasks/inline-task)|Execute arbitrary lightweight javascript code|
|Event Publishing|[Event Task](../../reference-docs/system-tasks/event-task)|External eventing system integration. e.g. amqp, sqs, nats|
|JQ Transform|[JQ Task](../../reference-docs/system-tasks/json-jq-transform-task)|Use <a href="https://github.com/stedolan/jq">JQ</a> to transform task input/output|
|Kafka Publish|[Kafka Task](../../reference-docs/system-tasks/kafka-publish-task)|Publish messages to Kafka|
|Business Rules|[Business Rule Task](../../reference-docs/system-tasks/business-rule)|Evaluate Business rules from a spreadsheet|


