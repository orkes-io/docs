# Integrating Confluent Kafka with Orkes Conductor

This developer guide includes the steps to integrate Confluent Kafka with Orkes Conductor. This integration lets you connect your Confluent Kafka cluster to Conductor to publish and receive messages from queues/topics.

## Get Configuration Credentials from Confluent Kafka

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials such as the Bootstrap server, Schema registry URLs  & API keys from Confluent Cloud.

To obtain the API Keys:

1. From your [Confluent Cloud portal](https://confluent.cloud/), choose your cluster to be integrated with Orkes Conductor and navigate to **Cluster Overview > API Keys**.
2. Create a new key by clicking **Create Key/+Add key** and selecting the required access (Global access/Granular access).
3. Note down the values for the **Key** and **Secret**.

<p align="center"><img src="/content/img/generating-api-keys-confluent.png" alt="Generating API Keys from Confluent Cloud" width="100%" height="auto"/></p>

To get the Bootstrap server:

1. Navigate to **Cluster Overview > Cluster Settings > Endpoints** and copy the **Bootstrap server**.

<p align="center"><img src="/content/img/getting-bootstrap-token.png" alt="Getting Bootstrap token from Confluent Cloud" width="100%" height="auto"/></p>

2. Then, navigate to **Topics** to see the list of topics on this cluster and identify the **Topic name** to use for this integration.

<p align="center"><img src="/content/img/topics.png" alt="Topics in Confluent Cloud" width="100%" height="auto"/></p>

To get the Schema registry server, API key & secret (This is only required if you are integrating with a schema registry):

1. Go to **Clients > Add new client.**
2. Under the **“Copy the configuration snippet for your clients”** section, copy the **_Schema Registry URL_** & download the Schema Registry API Key. The downloaded file will have the Schema Registry API Key & Secret.

<p align="center"><img src="/content/img/schema-registry-url.png" alt="Getting Schema Registry URL" width="100%" height="auto"/></p>

## Integrating with Confluent Kafka as a Message Broker

Now, you have the required configuration credentials from Confluent Kafka. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **Confluent Kafka**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-confluent-kafka.png" alt="Integration configuration for Confluent Kafka" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Bootstrap Server | Provide the bootstrap server for the cluster in your Confluent Kafka. Refer to the previous section on how to [get the bootstrap server](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka). |
| Sending Protocol | Choose the required sending protocol for the integration. It can take two values:<ul><li>String</li><li>AVRO</li></ul>If you are integrating with a schema registry, choose AVRO as the sending protocol. |
| Connection Security | Choose the connection security. Currently supports **_SASL_SSL/PLAIN_**. |
| Username | Provide the [API Key copied previously](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka). |
| Password | Provide the [API Secret copied previously](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka). |
| Schema Registry URL | Provide the Schema Registry URL from the Confluent Kafka console. [Refer to the previous section on how to get this](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka).<br/>This field is only applicable if the **_Sending Protocol_** is chosen as AVRO. |
| Schema Registry API Key | Provide the Schema Registry API Key from the Confluent Kafka console. [Refer to the previous section on how to get this](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka).<br/>This field is only applicable if the **_Sending Protocol_** is chosen as AVRO. |
| Schema Registry API Secret | Provide the Schema Registry API Secret from the Confluent Kafka console. [Refer to the previous section on how to get this](/content/integrations/message-broker/confluent-kafka#get-configuration-credentials-from-confluent-kafka).<br/>This field is only applicable if the **_Sending Protocol_** is chosen as AVRO. |
| Description | Provide a description of the integration. | 

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Conductor console.
2. Click **+ Define event handler** option from the top-right corner of the window.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-confluent-kafka.png" alt="Configuring Event Handler for Confluent Kafka Integration" width="50%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | Provide a name to identify your event handler definition. |
| Event | Provide the event integration you have created in the following format:<br/><br/>**Type : Config Name : Topic Name**<br/><br/>Example: **kafka_confluent:john-test:topic_0**<br/><br/>**Notes**: The drop-down lists the integration you’ve added to the Conductor cluster automatically. You can choose that and add the topic name you want to publish/receive messages. |
| Condition | Provide the ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. |
| Actions | Choose the required actions to be carried out on receiving the events from Kafka. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. |
| Active | Set this to true or false. It determines if the event handler is running or not. |

A sample JSON for the event handler is as follows:

```json
{
 "name": "John-Test",
 "event": "kafka_confluent:John-Test:topic_0",
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

## RBAC - Governance on who can use Integrations

Once the integration is added, the next step is determining who can access these integrations.

The permissions can be granted to applications/groups within the Orkes Conductor cluster.

To provide explicit permission to Groups:

1. From the left menu on your Conductor cluster, navigate to **Access Control > Groups**.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. From the **Integrations** sub-tab, choose the integration with required permissions.
5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows.

<p align="center"><img src="/content/img/rbac-confluent-kafka.png" alt="Configuring RBAC for Confluent Kafka Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the Kafka queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow,** and click the **Define Workflow** button.
2. Create a workflow with an event task with the **Sink** in the format **kafka_confluent:John-Test:topic_0**, where “John-Test” is the integration name and “topic_0” is the topic to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-confluent.png" alt="Event task in Orkes Conductor" width="80%" height="auto"/></p>

3. Under the Input parameters, you need to provide the following parameters:
    - **_schema** - Provide the topic name along with the subject. 
        - To get the subject name, navigate to **Home > Environment** > Choose your environment on your Confluent console. 
        - Under the **Schema Registry** sub-tab, you can get the subject name.
        <p align="center"><img src="/content/img/subject-name-confluent.png" alt="Identifying subject name in Confluent Kafka" width="80%" height="auto"/></p>
        - Provide this subject name as the input parameter “_schema” value while defining the workflow.
4. Add all fields in your topic’s schema as the input parameters in the workflow definition.
    - You can get your schema for the topic by navigating to the “Schema” subtab from your topic and clicking on “Evolve schema”.
     <p align="center"><img src="/content/img/schema-confluent.png" alt="Identifying Schema parameters" width="80%" height="auto"/></p>
     - For example, The topic I’ve chosen here is **_topic_0_**, whose Schema is as follows:
    
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
  "namespace": "com.mycorp.mynamespace",
  "type": "record"
}
```

- Ensure that all the “fields” here are mapped into the workflow definition.

:::note
Ensure to use a unique “name” & “namespace” to avoid any conflicts.
:::

So, in this example, the input parameter is as follows (including the schema fields & schema subject name):

<p align="center"><img src="/content/img/input-parameters-confluent.png" alt="Input Parameters for Confluent Kafka Event" width="80%" height="auto"/></p>

Here’s the JSON for the workflow:

```json
{
 "name": "John-test",
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
     "sink": "kafka_confluent:John-Test:topic_0"
   }
 ],
 "schemaVersion": 2,
 "ownerEmail": "devrel@orkes.io"
}
```

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-confluent.png" alt="Running workflow from Orkes Conductor UI" width="80%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the Confluent Cloud portal. Navigate to the topic and check for messages to verify that the message is consumed successfully.

<p align="center"><img src="/content/img/verifying-confluent.png" alt="Verifying the consumed message from Confluent Kafka" width="100%" height="auto"/></p>

The action added in the event handler definition was to start the workflow **http-sample-test**. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-confluent.png" alt="Starting workflow on consuming events" width="100%" height="auto"/></p>