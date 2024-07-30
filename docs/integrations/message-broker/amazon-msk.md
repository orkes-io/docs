# Integrating Amazon MSK with Orkes Conductor

This developer guide includes the steps to integrate Amazon MSK with Orkes Conductor. This integration lets you connect the Amazon MSK (Kafka) cluster to Conductor to publish and receive messages from queues/topics.

:::note
Amazon MSK configuration is deprecated. Please use [Apache Kafka](https://orkes.io/content/integrations/message-broker/apache-kafka) for all future configurations.
:::

## Get Configuration Credentials from Amazon MSK

Before beginning the integration process in Orkes Conductor, you must get specific credentials, such as the Bootstrap server.

To get the Bootstrap server:

1. Login to [Amazon MSK console](https://console.aws.amazon.com/msk/). 
2. Once logged in, the table lists all the clusters under this account for the current region. 
3. Choose the cluster and click _**View client information**_ on the cluster summary page. This will give you the bootstrap broker and the Apache ZooKeeper connection string. 

[Refer to the official documentation for more details.](https://docs.aws.amazon.com/msk/latest/developerguide/msk-get-bootstrap-brokers.html)

## Integrating with Amazon MSK as a Message Broker

Now, you have the required configuration credentials from Amazon MSK. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **Amazon MSK**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-amazon-msk.png" alt="Integration configuration for Amazon MSK" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify the integration. |
| Bootstrap Server | The bootstrap server for the Amazon MSK cluster. [For instructions on how to get the bootstrap server, refer to the previous section.](/content/integrations/message-broker/amazon-msk#get-configuration-credentials-from-amazon-msk) | 
| Sending Protocol | Choose the sending protocol for the integration. Currently supports **String**. |
| Connection Security | Choose the connection security. Currently supports **_SASL_SSL/SCRAM-SHA-512_**. | 
| Username | The username of the Amazon MSK account. | 
| Password | The password of the Amazon MSK account. | 
| Consumer Group ID | Enter the Consumer Group ID from Kafka. This unique identifier helps manage message processing, load balancing, and fault tolerance within consumer groups. |
| Description | A description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click the **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-amazon-msk.png" alt="Configuring Event Handler for Amazon MSK Integration" width="50%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify the event handler definition. |
| Event | The event integration you have created in the following format:<br/><br/><b>Type : Config Name : Topic Name</b><br/><br/>Example: **kafka_msk:john-test:topic_0**<br/><br/>**Note**: The drop-down automatically lists the integrations you’ve added to the Conductor cluster. You can choose that and add the topic name you want to publish/receive messages. |
| Condition | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out on receiving the events from MSK Kafka. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. |
| Active | Set this to true or false. It determines if the event handler is running or not. |

A sample JSON for the event handler is as follows:

```json
{
 "name": "kafka_msk_event_handler",
 "event": "kafka_msk:kafka_msk_test_string:events-test-1",
 "condition": "true",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "event-handler-test",
       "version": 1,
       "correlationId": "",
       "input": {
         "payload": "${$}"
       }
     },
     "expandInlineJSON": false
   }
 ],
 "active": true,
 "evaluatorType": "javascript"
}
```

## RBAC - Governance on who can use Integrations

Once the integration is added, the next step is determining who can access these integrations.

The permissions can be granted to applications/groups within the Orkes Conductor cluster.

To provide explicit permission to Groups:

1. From the left menu on your Orkes Conductor cluster, navigate to **Access Control > Groups**.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. From the **Integrations** sub-tab, choose the integration with required permissions.
5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows.

<p align="center"><img src="/content/img/rbac-amazon-msk.png" alt="Configuring RBAC for Amazon MSK Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the MSK Kafka queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow with an event task with the **Sink** in the format **kafka_msk:John-Test:topic_0**, where “John-Test” is the integration name and “topic_0” is the topic to which the Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-msk.png" alt="Event task in Orkes Conductor" width="70%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-msk.png" alt="Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the Amazon MSK portal. 

Here, the action added in the event handler definition was to start the workflow “**event-handler-test**”. You can verify this from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-msk.png" alt="Starting workflow on consuming events" width="90%" height="auto"/></p>