---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event 

EVENT is a task used to publish an event into one of the supported eventing systems in Conductor. Conductor supports the following eventing models:
* AWS SQS (type: sqs)
* Azure Service Bus (type: azure)
* Kafka (type: kafka)

All of these requires additional configuration to enable connectivity.

## Definitions

Configuration for publishing an event into AWS SQS to notify an external system.

```json
    {
      "name": "event_task",
      "taskReferenceName": "event_task_ref",
      "type": "EVENT",
      "sink": "sqs:sqs_queue_name",
      "inputParameters" : {
        // payload
      }
    }
```

Use the sink prefix depending on the type of sink you are using - ex: `azure:` for Azure Service Bus


## Input Parameters

| Attribute       | Description                                                                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sink            | Provide the event queue in the format of prefix:location. The Prefix is either **sqs**, or **kafka**, and the location specifies the actual queue name. e.g., **sqs:send_email_queue**. |
| inputParameters | All of the input params to this task execution will be sent as the payload to the event sink                                                                                            |

### Additional System Inputs to Payload

Conductor will add the following parameters to the payload, so it is important to ensure that these fields are not present in the original payload as they will be overwritten during execution

* __workflowInstanceId__ - workflow id from where this event was sent
* __workflowType__ - Name of the workflow definition
* __workflowVersion__ - Version of the workflow definition
* __correlationId__ - Correlation id of the workflow execution

For example, for the definition below, 

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
when executed will produce the following output
```json name=Output
    {
      "myKey": "myValue",
      "myNumber": 100,
      "workflowInstanceId" : "967b19ae-10d1-4b23-b0e7-ae324524dac0",
      "workflowType" : "my-workflow-name",
      "workflowVersion" : "1",
      "correlationId" : "fbdcafd2-69c7-4b75-8dd1-653e33d48746",
    }
```

## Output Parameters

The task will produce the payload it sent as the output.


## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type EVENT
2. Select the sink type
3. Add the sink name
4. Add input parameters

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-event-task.png" alt="Adding event task" width="350" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

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

</TabItem>
</Tabs>


<details><summary>Tasks sending and receiving SQS messages in OSS</summary>

Amazon's Simple Queueing Service (SQS) is a handy way to send messages across systems.  SQS support is included in Conductor but requires a few changes to the Conductor instance to work properly.

In this example, we will:

* Configure Conductor for SQS messaging 
* Set up an SQS message queue at AWS
* Build a workflow with an EVENT task that sends messages to our SQS queue.
* Add an EVENT to Conductor that will complete a WAIT event in the same workflow.

In this way, this example follows the path of an SQS message from creation in Conductor to AWS and then back into Conductor.

**Configuring Conductor for SQS**

In your instance of Conductor, we will need to edit a few configurations:

1. First edit  `/server/src/main/resources/application.properties` (around line 60).  The default queue type may be set to SQS, but we must enable the queues and establish which AWS account is to be used:

```java
# Default event queue type to listen on for wait task
conductor.default-event-queue.type=sqs
conductor.event-queues.sqs.enabled=true
conductor.event-queues.sqs.authorized-accounts={your AWS account number}
```

2. Second, in `annotations-processor/awssqs-event-queue/src/main/java/com/netflix/conductor/SQSEventQueueConfiguration.java`, add the following Bean:

```java
    @Bean
    AWSCredentialsProvider createAWSCredentialsProvider() {
        return new DefaultAWSCredentialsProviderChain();
    }

```

**AWS Environmental Variables**

You'll need to set 4 AWS environmental variables on the machine running Conductor. From your AWS account, you can copy three of the credentials:

```bash
export AWS_ACCESS_KEY_ID="{key_id}"
export AWS_SECRET_ACCESS_KEY="{access_key}"
export AWS_SESSION_TOKEN="{token_value}}"
```

You'll also want to set your AWS region
```bash
export  AWS_REGION = "{the region you are setting up the queue in}"
```


**Creating an SQS Queue**

In your AWS account, open Amazon SQS (search for it in the search bar) and choose `Create queue`. Create a queue by entering a name and scrolling to the bottom to `create queue`.  Your new queue will appear in the queue list in a minute or so.

<p align="center"><img src="/content/img/sqs_queue_list.jpg" alt="filtered SQS queue list" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

**Building your workflow**

Now we will build a workflow to send and receive the SQS messages.  You can find the JSON on the [Orkes Playground](https://play.orkes.io/WorkflowDef/event_testing).

<p align="center"><img src="/content/img/sqs-workflow.png" alt="workflow sending and receiving tasks" width="50%" height="auto" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This workflow has two forks: 

* On the left fork, there is just one task `task_1`.  It is a WAIT task, waiting for a message from the SQS server.
> Note: for the SQS message to COMPLETE the task, we'll need to create a Conductor EVENT.
* The right fork has two tasks. `task_2` is also a WAIT task, but it just waits for 10s before completing and moving the workflow ahead.  On the completion of `task_2`, the EVENT task `send_sqs_messsage` fires.

The reason for the delay in `task_2` is to ensure that `task_1` is initialized and waiting for the event to come in before the SQS message is sent out.

Here's the definition of `send_sqs_message`:

```json
{
    "name": "send_sqs_message",
    "taskReferenceName": "send_sqs_message_ref",
    "inputParameters": {},
    "type": "EVENT",
    "sink": "sqs:conductor_doug_testing"
    }

```

When this fires, a message is sent to the `conductor_doug_testing` SQS queue at AWS.  We could send data on the inputParameters, if desired.

Here is the default payload sent to AWS in the SQS message

```json
{
        "workflowType":"event_testing",
        "correlationId":null,
        "workflowVersion":1,
        "asyncComplete":false,
        "workflowInstanceId":"266ac320-7179-4a11-908e-0758458037a1",
        "sink":"sqs:conductor_doug_testing"
        }
```

It is important to note that we have the workflow name and the workflowInstanceId for the specific invocation of the workflow.

We are almost there.  If we run this workflow now - the right side of the FORK would complete, but there is no EVENT to tell Conductor how to complete `task_1`.

**Adding an Event**

To add an event, use the `POST /api/event/` endpoint.  Here's the body used in this example:

```json
{
  "name": "complete_task_event",
  "event": "sqs:conductor_doug_testing",
  "actions": [
    {
      "action": "complete_task",
      "complete_task": {
        "workflowId": "${workflowInstanceId}",
		"taskRefName": "task_1_ref",
        "input": {
        }
      }
    }
  ],
  "active": true
}
```

We have named the event `complete_task_event` and the event is a message from our SQS message queue `sqs:conductor_doug_testing`.  The action is `complete_task`, and we want to complete task_ref_1 from the workflowInstanceId that is in the body of the SQS message.

When we invoke the workflow:

<p align="center"><img src="/content/img/sqs-workflow-start.png" alt="startung the SQS workflow" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Both task_1 and task_2 are IN_PROGRESS.  

<p align="center"><img src="/content/img/sqs-workflow-task2-complete.png" alt="wait task complete sqs task about to fire" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Once the WAIT poll task completes task_2, the SQS task fires and sends a message to AWS.  You can poll for messages in your SQS queue (in your queue - click "send/receive messages" and there is a "poll for tasks" button) and see the message pass through:

<p align="center"><img src="/content/img/sqs_workflow_message_queue.jpg" alt="SQS message arriving at AWS on it's way to task_1" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This message triggers our EVENT, and the event COMPLETES `task_1`.

<p align="center"><img src="/content/img/sqs-workflow-complete.png" alt="completed workflow upon arrival of the SQS message to the event" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

There we have it.  We have configured Conductor to send and receive SQS messages to our AWS instance. We built an EVENT task to send the messages and created an event listener to receive events from AWS and perform actions in our workflow (In this case, sending a COMPLETED status to a WAIT task.)

</details>