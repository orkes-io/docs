# SQS Events

Amazon's Simple Queueing Service (SQS) is a handy way to send messages across systems. SQS support is included in Conductor but requires a few changes to the Conductor instance to work properly.

## Configuring Conductor for SQS

In your Conductor instance, you will need to edit a few configurations:

1. First edit `/server/src/main/resources/application.properties` (around line 60). The default queue type may be set to SQS, but you must enable the queues and establish which AWS account is to be used:

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

## Adding an Event

To add an event, use the `POST /api/event/` endpoint. There are a number of events that can be added:

- Start Workflow: This event will kick off a new workflow invocation.
- Complete Task: If a task is IN_PROGRESS, this will COMPLETE the task, and the workflow will move forward (Often used with the human and the wait tasks).
- Fail Task: If a task is IN_PROGRESS, this will FAIL the task, and the workflow will move forward (Often used with the human and the wait tasks).

Let's look at some examples:

### Start Workflow

This Event does exactly what the name says, it will start a workflow run. In the example below, we're ready to ship an item to a customer:

```json
{
  "name": "start_shipping_workflow",
  "event": "sqs:shipping_start",
  "actions": [
    {
      "action": "start_workflow",
      "start_workflow": {
        "name": "shipping_workflow",
        "version": 1,
        "input": {
          "name": "John Doe",
          "streetaddress": "1 Main Street",
          "city": "New York",
          "state": "NY",
          "zip": "12001"
        }
      }
    }
  ],
  "active": true
}
```

### Complete Task

Imagine you have a workflow that requires a person to sign a document at DocuSign. There would be a WAIT task in the IN_PROGRESS state, waiting for an EVENT so that the workflow can move forward. The message is sent to the `conductor_docusign_completed` SQS queue at AWS, which will fire this event:

```json
{
  "name": "complete_docusign_human_task_event",
  "event": "sqs:conductor_docusign_completed",
  "actions": [
    {
      "action": "complete_task",
      "complete_task": {
        "workflowId": "${workflowInstanceId}",
        "taskRefName": "human_docusign_step_ref",
        "input": {}
      }
    }
  ],
  "active": true
}
```

### Fail Task

Imagine you have a workflow that requires a person to sign a document at DocuSign. There would be a WAIT task in the IN_PROGRESS state, waiting for an EVENT so that the workflow can move forward. In this case, the human refused to sign the document, and the message is sent to the `conductor_docusign_failed` SQS queue at AWS, which will fire this event:

```json
{
  "name": "fail_docusign_human_task_event",
  "event": "sqs:conductor_docusign_failed",
  "actions": [
    {
      "action": "fail_task",
      "fail_task": {
        "workflowId": "${workflowInstanceId}",
        "taskRefName": "human_docusign_step_ref",
        "input": {}
      }
    }
  ],
  "active": true
}
```

For a complete example, including the event task, refer to [Tasks sending and receiving SQS messages](/content/docs/how-tos/Tasks/SQS-event-task).
