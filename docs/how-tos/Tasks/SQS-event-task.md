# Tasks sending and receiving SQS messages

Amazon's Simple Queueing Service (SQS) is a handy way to send messages across systems.  SQS support is included in Conductor, but requires a few changes to the Conductor instance to work properly.

In this example, we will:

* Configure Conductor for SQS messaging 
* Set up an SQS mewssage queue at AWS
* Build a workflow with an EVENT task that sends messages to our SQS queue.
* Add an EVENT to Conductor that will complete a WAIT event in the same workflow.

In this way, this example follows the path of an SQS message from creation in Conductor to AWS, and then back into Conductor.

## Configuring Conductor for SQS

In your instance of Conductor, we will need to edit a few configurations:

1. First edit  `/server/src/main/resources/application.properties` (around line 60).  The default queue type may be set to SQS, but we must enable the queues, and establish which AWS account is to be used:

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

## AWS environmental variables

You'll need to set 4 AWS environmental variables on the machine running Conductor. from your AWS account, you can copy three of the credentials:

```bash
export AWS_ACCESS_KEY_ID="{key_id}"
export AWS_SECRET_ACCESS_KEY="{access_key}"
export AWS_SESSION_TOKEN="{token_value}}"
```

You'll also want to set your AWS region
```bash
export  AWS_REGION = "{the region you are setting up the queue in}"
```


## Creating an SQS Queue

In your AWS account, open Amazon SQS (search for it in the search bar), and choose `Create queue`. Create a queue by entering a name, and scrolling to the botttom to `create queue`.  In a minute or so, your new queue will appear in the queue list.

<p align="center"><img src="/content/img/sqs_queue_list.jpg" alt="filtered SQS queue list" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Building your workflow

Now we will build a workflow to send and receive the SQS messages.  You can find the JSON on the [Orkes Playground](https://play.orkes.io/WorkflowDef/event_testing).

<p align="center"><img src="/content/img/sqs_workflow.jpg" alt="workflow sending and receiving tasks" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This workflow has two forks: 

* On the left fork there is just one task `task_1`.  It is a WAIT task, and it is waiting for a message from the SQS server.
> Note: for the SQS message to COMPLETE the task, we'll need to create a Conductor EVENT.
* The right fork has two tasks. `task_2` is also a WAIT task, but it just waits for 10s before completing and moving the workflow ahead.  On the completetion of `task_2`, the EVENT task `send_sqs_messsage` fires.

The reason for the delay in `task_2` to is to ensure that `task_1` is initialized and waiting for the event to come in before the SQS message is sent out.

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

It is important to note that we have the workflow name, and the workflowInstanceId for the specific invocation of the workflow.

We are almost there.  If we ran this workflow now - the right side of the FORK would complete, but there is no EVENT to tell Conductor how to complete `task_1`.

## Adding an Event

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

We have named the even `complete_task_event` and the event is a message from our SQS message queue `sqs:conductor_doug_testing`.  The action is `complete_task`, and we want to complete task_ref_1 from the workflowInstanceId that is in the body the SQS message.

## Example 

When we invoke the workflow:

<p align="center"><img src="/content/img/sqs_workflow_start.jpg" alt="startung the SQS workflow" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Both task_1 and task_2 are IN_PROGRESS.  

<p align="center"><img src="/content/img/sqs_workflow_task2_complete.jpg" alt="wait task complete sqs task about to fire" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Once the WAIT poll task completes task_2, the SQS task fires, and sends a message to AWS.  You can poll for messages in your SQS queue (in your queue - click "send/receive messages" and there is a "poll for tasks" button), and see the message pass through:

<p align="center"><img src="/content/img/sqs_workflow_message_queue.jpg" alt="SQS message arriving at AWS on it's way to task_1" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

This message triggers our EVENT, and the event COMPLETES `task_1`.

<p align="center"><img src="/content/img/sqs_workflow_complete.jpg" alt="completed workflow upon arrival of the SQS message to the event" width="500" style={{paddingBottom: 40, paddingTop: 40}} /></p>

There we have it.  We have configured Conductor to send and receive SQS messages to our AWS instance.  WE built an EVENT task to send the messages, and created an event listener to receive events from AWS, and perform actions in our workflow (in this case sending a COMPLETED status to a WAIT task.)

