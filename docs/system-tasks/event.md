# Event Task

```json
"type" : "EVENT"
```

EVENT is a task used to publish an event into one of the supported eventing systems in Conductor. Conductor supports the following eventing models:
* SQL (type: sqs)
* Kafka (type: kafka)

## Configurations

Configuration for publishing an event into SQS to notify an external system.

```json
{
   "type": "EVENT",
   "sink": "sqs:sqs_queue_name"
}
```

Configuration for publishing an event into Kafka to notify an external system.

```json
{
   "type": "EVENT",
   "sink": "kafka:external_event_name"
}
```

### Input Parameters

| Attribute | Description |
| --------- | ----------- |
| sink | Provide the event queue in the format of prefix:location. The Prefix is either ```sqs```, or ```kafka```, and location specifies the actual queue name. e.g., "```sqs:send_email_queue```"

### Output Parameters

The tasks' output is sent as a payload to the external event. In the case of SQS, the task's output is sent as a payload to the SQS message.

## Supported Queuing Systems​

Conductor has support for the following external event queueing systems as part of the OSS build.

* SQS (prefix: sqs)
* [NATS](https://github.com/Netflix/conductor-community/tree/main/event-queue) (prefix: nats)
* [AMQP](https://github.com/Netflix/conductor-community/tree/main/event-queue/amqp) (prefix: amqp_queue or amqp_exchange)

## Examples

<Tabs>
 <TabItem value="JSON" lable="JSON">
</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Sending SQS messages</summary>
<p>

See [Sending SQS messages](https://orkes.io/content/docs/how-tos/Tasks/SQS-event-task) tutorial for an example EVENT task.
</p>
</details>