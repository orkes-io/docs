---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event 

An Event task is used to publish an event into one of the supported eventing systems. The supported eventing models include:

- [AMQP](https://orkes.io/content/integrations/message-broker/amqp)
- [Amazon MSK](https://orkes.io/content/integrations/message-broker/amazon-msk)
- [AWS SQS](https://orkes.io/content/integrations/message-broker/aws-sqs)
- [Azure Service Bus](https://orkes.io/content/integrations/message-broker/azure-service-bus)
- [Confluent Kafka](https://orkes.io/content/integrations/message-broker/confluent-kafka)
- [Apache Kafka](https://orkes.io/content/integrations/message-broker/apache-kafka)
- [NATS Messaging](https://orkes.io/content/integrations/message-broker/nats-messaging)
- [GCP Pub Sub](https://orkes.io/content/integrations/message-broker/gcp-pub-sub)
- [IBM MQ](https://orkes.io/content/integrations/message-broker/ibm-mq)

To utilize this functionality, you must first [integrate the required message broker](https://orkes.io/content/category/integrations/message-broker) with Orkes Conductor followed by [creating an event handler](https://orkes.io/content/developer-guides/event-handler) in Orkes Conductor. The configuration parameters vary with the eventing systems. Refer to the corresponding documentation for detailed steps on adding integration.

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

| Attribute | Description |
| --------- | ----------- |
| sink | Specifies the event queue sink, which is of the format:<br/><br/>**Type : Config Name : Queue/Topic Name**<br/>where,<ul><li>_Type_ - The type is message broker type where payload is being sent. These are the supporters types:<ul><li>AMQP - amqp</li><li>AWS SQS - sqs</li><li>Azure Service Bus - azure</li><li>Apache Kafka - kafka</li><li>NATS Messaging - nats</li><li>GCP Pub Sub - gcppubsub</li><li>IBM MQ - ibm_mq</li></ul></li><li>*Config Name* - The integration name added to the cluster.</li><li>*Queue/Topic Name* - The name of the queue or topic where the payload is being sent.</li></ul>If you are using Conductor UI, the UI drop-down lists available message broker integration in the Conductor cluster. Select the required integration and append the topic/queue name. For example, the drop-down lists the sink for the above example as **kafka_confluent:John-Test**. Edit the sink to append the topic name, making it **kafka_confluent:John-Test:topic-name**. |
| inputParameters | Provide the required input parameters so the task execution will be sent as the payload to the event sink. |
| optional | Enabling this option renders the task optional. The workflow continues unaffected by the task's outcome, whether it fails or remains incomplete. |

### Additional System Inputs to Payload​

Conductor automatically adds the following parameters to the payload. Ensure these fields aren’t present in the payload, as they will be overwritten during execution.

- workflowInstanceId - Workflow ID from where this event was sent.
- workflowType - Name of the workflow definition.
- workflowVersion - Version of the workflow definition.
- correlationId - Correlation ID of the workflow execution.

For example, given the following task definition:

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

The task produces the payload it sent as the output.

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Event**.
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
 <TabItem value="JSON" label="JSON">

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


