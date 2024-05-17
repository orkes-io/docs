---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event 

An Event task in Orkes Conductor is a system task used to publish an event into one of the supported eventing systems. The supported eventing models include:

- [AMQP](https://orkes.io/content/integrations/message-broker/amqp)
- [Amazon MSK](https://orkes.io/content/integrations/message-broker/amazon-msk)
- [AWS SQS](https://orkes.io/content/integrations/message-broker/aws-sqs)
- [Azure Service Bus](https://orkes.io/content/integrations/message-broker/azure-service-bus)
- [Confluent Kafka](https://orkes.io/content/integrations/message-broker/confluent-kafka)
- [Apache Kafka](https://orkes.io/content/integrations/message-broker/apache-kafka)
- [NATS Messaging](https://orkes.io/content/integrations/message-broker/nats-messaging)
- [GCP Pub Sub](https://orkes.io/content/integrations/message-broker/gcp-pub-sub)
- [IBM MQ](https://orkes.io/content/integrations/message-broker/ibm-mq)

:::note Pre-requisites:
- [Integrate the required message broker with Orkes Conductor](https://orkes.io/content/category/integrations/message-broker)
- [Create an event handler in Orkes Conductor](https://orkes.io/content/developer-guides/event-handler)<br/><br/>
The configuration parameters vary with the eventing systems. Refer to the corresponding documentation for detailed steps on adding integration.
:::

## Definitions​

An example configuration of publishing an event to Confluent Kafka:

```json
   {
     "name": "event",
     "taskReferenceName": "event_ref",
     "type": "EVENT",
     "sink": "kafka_confluent:John-Test:topic-name",
     "inputParameters": {}
   }
```

## Input Parameters​

| Parameter | Description |
| --------- | ----------- |
| sink | Provide the event queue sink. The UI drop-down lists the message broker integrations added to the Conductor cluster by default. Choose the required integration and add the topic/queue name along with the sink.<br/><br/>For example, the drop-down lists the sink for the above example as **_kafka_confluent:John-Test_**. Edit the sink manually to include the topic name, making it **_kafka_confluent:John-Test:topic-name_**. |
| inputParameters | Provide the required input parameters so the task execution will be sent as the payload to the event sink. |

### Additional System Inputs to Payload​

Conductor will add the following parameters to the payload, ensuring these fields are not present in the original payload as they will be overwritten during execution:

- workflowInstanceId - Workflow ID from where this event was sent.
- workflowType - Name of the workflow definition.
- workflowVersion - Version of the workflow definition.
- correlationId - Correlation ID of the workflow execution.

For example, 

Given the following task definition:

```json
   {
     "name": "event_task",
     "taskReferenceName": "event_task_ref",
     "type": "EVENT",
     "sink": "kafka:external_event_name",
     "inputParameters": {
       "myKey": "myValue",
       "myNumber": 100
     }
   }
```

The execution will produce the following output:

```json
    {
      "myKey": "myValue",
      "myNumber": 100,
      "workflowInstanceId" : "967b19ae-10d1-4b23-b0e7-ae324524dac0",
      "workflowType" : "my-workflow-name",
      "workflowVersion" : "1",
      "correlationId" : "fbdcafd2-69c7-4b75-8dd1-653e33d48746",
    }
```

## Output Parameters​

The task will produce the payload it sent as the output.



## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **EVENT**.
2. Select the sink type from the integrations added to the cluster.
3. Add the topic name along with the sink.
4. Provide the required input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-event-task.png" alt="Adding event task" width="1024" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
   {
     "name": "event",
     "taskReferenceName": "event_ref",
     "type": "EVENT",
     "sink": "kafka_confluent:John-Test:topic-name",
     "inputParameters": {}
   }
```

</TabItem>
</Tabs>


