---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event 

The Event task is used to publish events into eventing systems. It supports various eventing models, including AMQP, Amazon MSK, AWS SQS, Azure Service Bus, Confluent Kafka, Apache Kafka, NATS Messaging, GCP Pub/Sub, and IBM MQ.

An Event task publishes a message to an event queue or topic. The specific eventing system used depends on the configured sink. The sink parameter defines the message broker type, integration name, and queue/topic name. The task execution payload is sent to this sink, and Conductor automatically appends additional system input parameters to the payload.

:::note 
**Prerequisite** - Before configuring the Event task, ensure that the [required message broker is integrated](https://orkes.io/content/category/integrations/message-broker) with Orkes Conductor, and then [create a corresponding event handle](https://orkes.io/content/developer-guides/event-handler). Configuration parameters vary with each eventing system. Refer to the corresponding documentation for detailed integration steps.
:::

## Task parameters

Configure these parameters for the Event task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| sink | The event queue sink in the format: “Type : Config Name : Queue/Topic Name”.<br/><br/>Where,<ul><li>**Type**—The message broker type where the payload is being sent. Supported types:<ul><li>amqp</li><li>sqs</li><li>azure</li><li>kafka</li><li>nats</li><li>gcppubsub</li><li>ibm_mq</li></ul></li><li>**Config Name**—The integration name added to the cluster.</li><li>**Queue/Topic** Name—The name of the queue or topic where the payload is being sent.</li></ul> | Required. |
| inputParameters | The input parameters for the Event task, which can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) or a fixed value. These parameters determine the payload sent to the event sink during task execution. | Optional. |

### Additional system inputs to payload​

Conductor automatically adds the following parameters to the payload. Ensure that these fields are not present in the payload, as they will be overwritten during execution.

* **workflowInstanceId** - Workflow ID from where this event was sent.
* **workflowType** - Name of the workflow definition.
* **workflowVersion** - Version of the workflow definition.
* **correlationId** - Correlation ID of the workflow execution.

**Example**

Given the following task definition:

```json
{
  "name": "event_task",
  "taskReferenceName": "event_task_ref",
  "type": "EVENT",
  "sink": "kafka:integration-name:topic-name",
  "inputParameters": {
    "myKey": "myValue",
    "myNumber": 100
  }
}
```

The execution will produce the following input parameters:

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

## Task configuration

This is the task configuration for an Event task.

```json
  {
     "name": "event",
     "taskReferenceName": "event_ref",
     "type": "EVENT",
     "sink": "messaging-type:integration-name:queue-or-topic-name",
     "inputParameters": {}
   }
```

## Task output

The task output mirrors the payload sent during execution, including system-appended parameters.

## Adding an Event task in UI

**To add an Event task:**

1. In your workflow, select the (**+**) icon and add an **Event** task.
2. In **Sink**, select the required integration and append the topic/queue name. Failure to do so may result in execution errors, as the payload won't have a valid destination.
3. (Optional) Add any additional input parameters.

<center><p><img src="/content/img/ui-guide-event-task.png" alt="Adding event task" width="1024" height="auto"/></p></center>