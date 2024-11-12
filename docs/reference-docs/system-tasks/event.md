---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event 

The Event task is used to publish events into eventing systems. It supports various eventing models, including AMQP, Amazon MSK, AWS SQS, Azure Service Bus, Confluent Kafka, Apache Kafka, NATS Messaging, GCP Pub/Sub, and IBM MQ.

An Event task publishes a message to an event queue or topic. The specific eventing system used depends on the configured sink. The sink parameter defines the message broker type, integration name, and queue/topic name. The task execution payload is sent to this sink, and Conductor automatically appends additional system input parameters to the payload.

:::note 
**Prerequisite** 
- Integrate the [required message broker](https://orkes.io/content/category/integrations/message-broker) with Orkes Conductor. Configuration parameters vary with message brokers. For detailed integration steps, refer to the corresponding documentation.
- [Create an event handler](https://orkes.io/content/developer-guides/event-handler). 
:::

## Task parameters

Configure these parameters for the Event task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| sink | The event queue sink in the format: “Type : Config Name : Queue/Topic Name”.<br/><br/>Where,<ul><li>**Type**—The message broker type where the payload is being sent. Supported types:<ul><li>amqp</li><li>sqs</li><li>azure</li><li>kafka</li><li>nats</li><li>gcppubsub</li><li>ibm_mq</li></ul></li><li>**Config Name**—The integration name added to the cluster.</li><li>**Queue/Topic** Name—The name of the queue or topic where the payload is being sent.</li></ul> | Required. |
| inputParameters | The input parameters for the Event task, which can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) or a fixed value. These parameters determine the payload sent to the event sink during task execution. | Optional. |

### Additional system inputs to payload​

Conductor automatically adds the following parameters to the payload. Ensure that these fields are not present in the payload, as they will be overwritten during execution.

* **workflowInstanceId**–Workflow ID from where this event was sent.
* **workflowType**–Name of the workflow definition.
* **workflowVersion**–Version of the workflow definition.
* **correlationId**–Correlation ID of the workflow execution.

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

## Examples

Here are some examples for using the Event task.

<details><summary>Using Event task in a workflow</summary>

In this example, we’ll integrate Confluent Kafka with Orkes Conductor to publish messages to a Kafka topic.

1. Integrate Confluent Kafka with Orkes Conductor.
2. Create an Event Handler in Conductor.
3. Create a Workflow with an Event task.
4. Run Workflow.

**Step 1: Integrate Confluent Kafka with Orkes Conductor**

Get the [configuration credentials from the Kafka console](https://orkes.io/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka) and [integrate Kafka as a message broker in Conductor cluster](https://orkes.io/content/integrations/message-broker/confluent-kafka#integrating-with-confluent-kafka-as-a-message-broker).

<center><p><img src="/content/img/confluent-kafka-integration.png" alt="Confluent Kafka sample integration" width="100%" height="auto"/></p></center>

Once the integration is complete, [grant the required permissions to other users in the cluster through user groups](https://orkes.io/content/access-control-and-security/users-and-groups#configuring-groups).

**Step 2: Create an Event Handler in Orkes Conductor**

Next, create an event handler for the added integration. 

**To create an event handler:**

1. Go to **Definitions** > **Event Handlers**, from the left menu in the Conductor cluster. 
2. Select **+ Define event handler** and configure the [parameters](https://orkes.io/content/developer-guides/event-handler#event-handler-configuration).
3. In the `event` field, specify the integration in the following format.

```json
Type : Config Name : Queue/Topic Name
```

For Confluent Kafka:
*  Set the `Type` to `kafka_confluent` (default).
* `Config Name` is the name of the integration created in the previous step.
* `Topic Name` is the Kafka topic for publishing messages.

**Sample Event Handler JSON**

```json
{
 "name": "event-handler-name",
 "event": "kafka_confluent:confluent-kafka-test:topic_0",
 "condition": "",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "http-sample-test",
       "version": 1,
       "correlationId": "",
       "input": {}
     },
     "expandInlineJSON": false
   }
 ],
 "active": true,
 "evaluatorType": "javascript"
}
```

:::note 
If creating the event handler in the Conductor UI, the drop-down selection in the Event field only lists integrations added to the cluster. Select the required integration and ensure to append the topic name.
:::

Save the definition, and click the play button to run it.

<center><p><img src="/content/img/event-handler-definition.png" alt="Creating and running an event handler definition" width="100%" height="auto"/></p></center>

**Step 3: Create a Workflow with an Event task**

This step involves creating a workflow with an Event task. Here, we utilize the Kafka topic as a sink for the event. 

For testing purposes, we can quickly build a workflow using Conductor UI.

**To create a workflow:**

1. Go to **Definitions** > **Workflow**, and select **+ Define Workflow**.
2. Add an Event task with the Sink `kafka_confluent:confluent-kafka-test:topic_0`.
3. In **Input parameters**, add the following parameters:
    - **_schema**—Set it to the topic name, including the schema subject.<br/>To locate the schema subject name from Confluent console:
        - Go to **Home** > **Environment** > [Choose your environment].
        - Under **Schema Registry**, find the subject name.
        <p align="center"><img src="/content/img/subject-name-confluent.png" alt="Identifying subject name in Confluent Kafka" width="80%" height="auto"/></p>
        - Add this subject name as the input parameter: `"_schema": "topic_0-value"`
    - Add all fields in the topic’s schema as the input parameters as well.
        - Locate the schema for your topic by navigating to the **Schema** sub-tab from your topic and selecting **Evolve schema**.
        <p align="center"><img src="/content/img/schema-confluent.png" alt="Identifying Schema parameters" width="80%" height="auto"/></p>
        For example, The topic here is `topic_0`, which has the following schema:
      ```json
             {
              "doc": "Sample schema to help you get started.",
               "fields": [
                     {
                      "doc": "The string is a unicode character sequence.",
                      "name": "my_field3",
                      "type": "string"
                      }
                     ],
                "name": "sampleRecord",
                "namespace": "com.mycorp.mynamespace", //Use a unique `name` and `namespace` to avoid any conflicts.
                "type": "record"
            }
      ```
        Ensure that each field in the schema is mapped as input parameters in the Event task. 

       So, in this example, the input parameters (including the schema fields and schema subject name) are as follows :

      ```json
       "inputParameters": {
       "_schema": "topic_0-value",
       "my_field3": "Some-Value-71gfy"
       },
      ```

Here’s the complete workflow definition JSON:

```json
{
 "name": "Confluent-Kafka-workflow",
 "description": "Sample Workflow for Confluent Kafka Integration",
 "version": 1,
 "tasks": [
   {
     "name": "event",
     "taskReferenceName": "event_ref",
     "inputParameters": {
       "_schema": "topic_0-value",
       "my_field3": "Some-Value-71gfy"
     },
     "type": "EVENT",
     "sink": "kafka_confluent:confluent-kafka-test:topic_name"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "john.doe@acme.com"
}
```

4. Save the workflow.

**Step 4: Run Workflow**

The workflow can be run using different methods. 

<Tabs>
<TabItem value="Run Using API" label="Run Using API">

Use the [Start Workflow Execution](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution) API to run the workflow.

```POST /api/workflow/{name}```
</TabItem>
<TabItem value="Run Using Conductor UI" label="Run Using Conductor UI">

1. Go to **Run Workflow** from the left menu on the Conductor cluster.
2. Select the **Workflow name** and **Version**.
3. Enter the input parameters.
4. Click **Run Workflow**.

<p align="center"><img src="/content/img/running-kafka-workflow-from-ui.png" alt="Identifying Schema parameters" width="80%" height="auto"/></p>
</TabItem>
</Tabs>

Once started, you can track execution progress in **Executions** > **Workflow** in the Conductor UI.

After successful execution, verify the message's delivery in the Confluent portal. 

1. From your cluster details page, navigate to **Topics** in the left menu.
2. In the **Messages** tab, verify that the message is consumed successfully.
<p align="center"><img src="/content/img/verifying-confluent.png" alt="Verifying the consumed message from Confluent Kafka" width="100%" height="auto"/></p>

</details>