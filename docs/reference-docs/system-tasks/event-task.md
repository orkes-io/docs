---
sidebar_position: 4
---

# Event Task
EVENT is a task used to publish an event into one of the supported eventing systems in Conductor.
Conductor supports the the following eventing models:
1. Conductor internal events (type: conductor)
2. SQL (type: sqs)

## Use Case 
Consider a use case where at some point in the execution, an event is published to an external eventing system such as SQS.
Event tasks are useful for creating event based dependencies for workflows and tasks.

Consider an example where we want to publish an event into SQS to notify an external system. 

```json
{
    "type": "EVENT",
    "sink": "sqs:sqs_queue_name",
    "asyncComplete": false
}
```

An example where we want to publish a messase to conductor's internal queuing system.
```json
{
    "type": "EVENT",
    "sink": "conductor:internal_event_name",
    "asyncComplete": false
}
```


## Configuration

#### Input Configuration

| Attribute      | Description |
| ----------- | ----------- |
| name      | Task Name. A unique name that is descriptive of the task function      |
| taskReferenceName   | Task Reference Name. A unique reference to this task. There can be multiple references of a task within the same workflow definition        |
| type   | Task Type. In this case, `EVENT`        |
| sink   | External event queue in the format of `prefix:location`.  Prefix is either `sqs` or `conductor` and `location` sepcifies the actual queue name. e.g. "sqs:send_email_queue" |

#### Output Configuration
Tasks's output are sent as a payload to the external event. In case of SQS the task's output is sent to the SQS message a a payload.

## Supported Queuing Systems
Conductor has support for the following external event queueing systems as part of the OSS build
1. SQS (prefix: sqs)
2. [NATS](https://github.com/Netflix/conductor/tree/main/contribs/src/main/java/com/netflix/conductor/contribs/queue/nats) (prefix: nats)
3. [AMQP](https://github.com/Netflix/conductor/tree/main/contribs/src/main/java/com/netflix/conductor/contribs/queue/amqp) (prefix: amqp_queue or amqp_exchange)
4. Internal Conductor (prefix: conductor) 
To add support for other 