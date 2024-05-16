# Integrating Apache Kafka with Orkes Conductor

This developer guide includes the steps to integrate Apache Kafka with Orkes Conductor. This integration lets you connect the self-managed Apache Kafka, Amazon MSK, and Confluent Kafka clusters with the Conductor to publish/receive messages to/from topics.

## Get Configuration Credentials from Apache Kafka

Before beginning the integration process in Orkes Conductor, you must obtain specific configuration credentials from the Kafka cluster, such as the Bootstrap server, Schema registry URL, and API keys.

The configuration steps vary depending on the type of Kafka cluster to be integrated. 

### Case - 1: Getting configuration credentials from self-managed Apache Kafka.

Refer to the [official Apache Kafka documentation](https://kafka.apache.org/documentation/) for setting up Apache Kafka locally. Get the bootstrap server and API keys & secrets for integrating with Conductor.

### Case - 2: Getting configuration credentials from Confluent Kafka.

To obtain the API keys from Confluent Kafka:

1. From the [Confluent Cloud portal](https://confluent.cloud/), choose the cluster to be integrated with Orkes Conductor and navigate to **Cluster Overview > API Keys**.
2. Create a new key by clicking **Create Key/+Add key** and selecting the required access (_Global access/Granular access_).
3. Note down the values for the key and secret.

<p align="center"><img src="/content/img/generating-api-keys-confluent.png" alt="Generating API Keys from Confluent Cloud" width="100%" height="auto"/></p>

To get the Bootstrap server from Confluent Kafka:

1. Navigate to **Cluster Overview > Cluster Settings > Endpoints** and copy the **Bootstrap server**.

<p align="center"><img src="/content/img/getting-bootstrap-token.png" alt="Getting Bootstrap token from Confluent Cloud" width="100%" height="auto"/></p>

2. Then, navigate to **Topics** to see the list of topics on this cluster and identify the **Topic name** to use for this integration.

<p align="center"><img src="/content/img/topics.png" alt="Topics in Confluent Cloud" width="100%" height="auto"/></p>

To get the Schema registry server, API key & secret (This is only required if you are integrating with a schema registry):

1. Go to **Clients > Add new client**.
2. Under the “Copy the configuration snippet for your clients” section, copy the Schema Registry URL and download the Schema Registry API Key. The downloaded file will contain the Schema Registry API key and secret.

<p align="center"><img src="/content/img/schema-registry-url.png" alt="Getting Schema Registry URL" width="100%" height="auto"/></p>

### Case - 3: Getting configuration credentials from Amazon MSK.

To get the Bootstrap server:

1. Login to [Amazon MSK console](https://console.aws.amazon.com/msk/).
2. Once logged in, the table lists all the clusters under the account for the current region.
3. Choose your cluster, and click _View client information_ on the cluster summary page. This gives the bootstrap broker and the Apache ZooKeeper connection string.

[Refer to the official Amazon MSK documentation for more details](https://docs.aws.amazon.com/msk/latest/developerguide/msk-get-bootstrap-brokers.html).

## Integrating with Apache Kafka as a Message Broker

Once you have the configuration credentials from the Kafka cluster, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **Apache Kafka**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-apache-kafka.png" alt="Integration configuration for Apache Kafka" width="60%" height="auto"/></p>

| Parameters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify the integration. |
| Bootstrap Server | Provide the bootstrap server of the Apache Kafka cluster. |
| Sending Protocol | Choose the required sending protocol for the integration. It can take two values: <ul><li>**String** - Messages are sent as simple string data.</li><li>**AVRO** - Messages are serialized using AVRO. [Not supported for Amazon MSK clusters]</li></ul>If you are integrating with a schema registry, choose AVRO as the sending protocol. |
| Connection Security | Choose the security mechanism for connecting to the Kafka cluster. It can take values:<ul><li>**SASL_SSL / PLAIN** - Secure connection using SASL (Simple Authentication and Security Layer) with SSL encryption.  [Not supported by Amazon MSK].</li><li>**SASL_SSL / SCRAM-SHA-256 / JKS** - Secure connection using SASL with SCRAM-SHA-256 authentication and SSL encryption. [Not supported by Amazon MSK].</li><li>**SASL_SSL/SCRAM-SHA-512** - Secure connection using SASL with SCRAM-SHA-512 authentication and SSL encryption. [Supported only for Amazon MSK].</li><li>**PLAIN TEXT** - Plain text connection without any encryption or authentication.</li></ul> |
| Username | If authentication is enabled (SASL_SSL), provide the username to authenticate with the Kafka cluster.<br/><br/>**Note**: For AVRO configuration, provide the API key copied previously as the username. |
| Password | Provide the password associated with the username to authenticate the connection.<br/><br/>**Note**: For AVRO configuration, provide the API secret copied previously as the password. |
| Schema Registry URL | Provide the Schema Registry URL from the Apache Kafka console.<br/><br/>**Notes:**<ul><li>This field is only applicable if the **_Sending Protocol_** is chosen as **_AVRO_**.</li><li>Not supported for Amazon MSK clusters.</li></ul> |
| Schema Registry Auth Type | Specifies the authentication mechanism for connecting to the schema registry. It can be of the following types:<ul><li>Password in URL</li><li>Schema Registry User Info (Key/Password)</li><li>NONE</li></ul>**Notes:**<ul><li>This field is only applicable if the **_Sending Protocol_** is chosen as **_AVRO_**.</li><li>Not supported for Amazon MSK clusters.</li></ul> |
| Schema Registry API Key | Provide the Schema Registry API Key from the Kafka console.<br/><br/>**Notes:**<ul><li>This field is only applicable if the **_Sending Protocol_** is chosen as **_AVRO_**.</li><li>Not supported for Amazon MSK clusters.</li></ul> |
| Schema Registry API Secret | Provide the Schema Registry API Secret from the Kafka console.<br/><br/>**Notes:**<ul><li>This field is only applicable if the **_Sending Protocol_** is chosen as **_AVRO_**.</li><li>Not supported for Amazon MSK clusters.</li></ul> |
| Value Subject Name Strategy | Defines the strategy for constructing the subject name under which the AVRO schema will be registered in the schema registry. It can take the following values:<ul><li>_io.confluent.kafka.serializers.subject.TopicNameStrategy_</li><li>_io.confluent.kafka.serializers.subject.RecordNameStrategy_</li><li>_io.confluent.kafka.serializers.subject.TopicRecordNameStrategy_</li></ul>**Notes:**<ul><li>This field is only applicable for **_AVRO_** configuration.</li><li>Not supported for Amazon MSK clusters.</li></ul> | 
| Truststore type | If SSL encryption is enabled, provide the type and password for the trust store containing the CA certificates used to verify the Kafka broker's SSL certificate. It can be of the following types:<ul><li>NONE</li><li>JKS - Upload the Java JKS trust store file with CAs.</li><li>PEM - Upload the PEM certificate file</li></ul>**Note:** Not supported for Amazon MSK clusters. | 
| Trust Store Password | If the trust store type is JKS, provide the password for the trust store.<br/><br/>**Note:** Not supported for Amazon MSK clusters. | 
| Consumer Group ID | Enter the Consumer Group ID from Kafka. This unique identifier helps manage message processing, load balancing, and fault tolerance within consumer groups. |
| Description | Provide a description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Conductor console.
2. Click the **+ Define event handler** option from the top-right corner of the window.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-apache-kafka.png" alt="Configuring Event Handler for Apache Kafka Integration" width="60%" height="auto"/></p>

| Event Handler Parameters | Description | 
| ------------------------ | ----------- |
| Name | Provide a name to identify your event handler definition. |
| Event | Provide the event integration you have created in the following format:<br/><br/>**Type : Config Name : Topic Name**<br/><br/>Example: **kafka:integration-test:topic-name**<br/><br/>**Note**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the topic name you want to publish/receive messages. | 
| Condition | Provide the ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. |
| Actions | Choose the required actions to be carried out when sending/receiving the events to/from Apache Kafka. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul> Each type of action requires and supports a particular set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. |

A sample JSON for the event handler is as follows:

```json
{
 "name": "kafka-event-handler",
 "event": "kafka:kafka-test:topic-name",
 "condition": "true",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "event-handler-test",
       "version": 1
     },
     "expandInlineJSON": false
   }
 ],
 "active": false,
 "evaluatorType": "javascript",
 "createdBy": "devrel@orkes.io"
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

<p align="center"><img src="/content/img/rbac-apache-kafka.png" alt="Configuring RBAC for Apache Kafka Integration" width="60%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the Apache Kafka topic as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **Define Workflow** button.
2. Create a workflow and add an event task at the required point with the **Sink** in the format **kafka:kafka-test:topic-name**, where “kafka-test” is the integration name and “topic-name” is the topic to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-apache-kafka.png" alt="Event task for Apache Kafka Integration in Orkes Conductor" width="100%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-apache-kafka.png" alt="Running workflow from Orkes Conductor UI" width="100%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the Apache Kafka console. 

The action added in the event handler definition was to start the workflow **event-handler-test**. You can verify this from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-apache-kafka.png" alt="Starting workflow on sending events" width="100%" height="auto"/></p>