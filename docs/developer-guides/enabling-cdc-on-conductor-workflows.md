# Enabling CDC (Change Data Capture)

Change Data Capture (CDC) is a design pattern for tracking changes in the source data and replicating the changes to the target systems.

This document outlines Orkes Conductor’s CDC functionality, which enables sending workflow state updates to eventing systems like Kafka, AWS SQS, AMQP, etc.

The major steps for enabling CDC on Conductor workflow include:

1. Add Eventing Integration in Orkes Conductor.
2. Configuring CDC Parameters in Conductor Workflows.
3. Execute Workflows.
4. Verify Changes in Eventing Systems.

## Add Eventing Integration in Orkes Conductor

The first step in enabling workflow CDC is to add the required integration in Orkes Conductor.

Supported integrations include:

<details><summary>AMQP</summary>
<p>

Steps to integrate AMQP with Orkes Conductor.

**Get Configuration Credentials from AMQP**

Before beginning the integration process in Orkes Conductor, you must obtain specific configuration credentials from AMQP, such as protocol, username, password, host, port, and virtual host. 

Refer to the official [AMQP documentation](https://www.cloudamqp.com/docs/index.html) on how to get these configuration parameters. 

**Integrating with AMQP as a Message Broker**

Now, you have the required configuration credentials from AMQP. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **AMQP**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-amqp.png" alt="Integration configuration for AMQP" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Protocol | Specify the communication protocol to be used. It can be ‘amqp’ or ‘amqps’ (Recommended for secure connections). |
| Username | Specify the username to authenticate and authorize the connection. |
| Password | Specify the password associated with the provided username. |
| Host | The hostname of the server where the message broker is running. |
| Port | The port number on the host where the message broker is running. The default port for AMQPS is 5671, and the default port for AMQP is 5672. |
| Virtual Host | Specify the virtual host namespace. In AMQP, a virtual host is a namespace that allows multiple messaging environments to coexist within a single broker. |
| Description | Provide a description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

<details><summary>AWS SQS</summary>
<p>

Steps to integrate AWS SQS with Orkes Conductor.

**Get Configuration Credentials from AWS SQS**

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials from your Amazon SQS account.

- AWS Account ID & region where the SQS is located.
- Amazon Resource Name (ARN) to identify & access the queue. ARN is generally of the format **arn:aws:sqs:region:account-id:queue-name**. 
- External ID - When you assume a role belonging to another account in AWS, you need to provide the external ID, an ID that can be used in an IAM role trust policy to designate the person to assume the role. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).
- Access Key & Secret from AWS SQS account. 

Refer to the [AWS SQS official documentation](https://docs.aws.amazon.com/sqs/) on how to get these credentials. 

**Integrating with AWS SQS as a Message Broker**

Now, you have the required configuration credentials from AWS SQS. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **AWS SQS.**
Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-aws-sqs.png" alt="Integration configuration for AWS SQS" width="50%" height="auto"/></p>

| Parameters | Description |
| ---------- | ----------- |
| Name | Provide a name to identify your event handler definition. |
| Connection Type | Choose the required connection type. Depending upon how the connection is to be established, it can take the following values:<ul><li>**Current Conductor Role** - Choose this if you are using the current Conductor role to establish the connection.</li><li>**Assume External Role** - Choose this if you are assuming a role belonging to another AWS account. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).</li><li>**Access Key/Secret** - Choose this if you are establishing the connection using the access key and secret.</li></ul> | 
| Region | Provide the valid AWS region where the SQS is located. | 
| Account ID | Provide your AWS Account ID. This field is optional.<br/><br/>**Note**: If ARN is not used for the “Sink” in the workflow definition, the account ID should be used. | 
| Role ARN | Specify the Amazon Resource Name (ARN) required for setting up the connection.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| External ID | If applicable, provide the external ID for assuming the role.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| Access Key | Provide the AWS Access Key.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Access Secret | Provide the AWS Access Secret.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Description | Provide a description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

<details><summary>Azure Service Bus</summary>
<p>

Steps to integrate Azure Service Bus with Orkes Conductor.

**Get Configuration Credentials from Azure Service Bus**

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials, such as the endpoint and namespace of the service bus.

- Refer to the official documentation on [how to get the namespace](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-topics-subscriptions-portal#create-a-namespace-in-the-azure-portal).
- The endpoint is part of the connection string of the service bus. Refer to the official documentation on [how to get the connection string (containing the endpoint)](https://learn.microsoft.com/en-us/azure/connectors/connectors-create-api-servicebus?tabs=consumption#get-connection-string-for-service-bus-namespace) of the service bus.

**Integrating with Azure Service Bus as a Message Broker**

Now, you have the required configuration credentials from Azure Service Bus. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **Azure Service Bus**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-azure-service-bus.png" alt="Integration configuration for Azure Service Bus" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Connection Type | Choose the required connection type. It can take the following values:<ul><li>Connection String</li><li>Password Less</li></ul> |
| Endpoint | Provide the endpoint of the service bus. [Refer to the previous section on how to get this.](/content/integrations/message-broker/azure-service-bus#get-configuration-credentials-from-azure-service-bus)<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Connection String_**. |
| Namespace | Provide the namespace of the service bus. [Refer to the previous section on how to get this.](/content/integrations/message-broker/azure-service-bus#get-configuration-credentials-from-azure-service-bus)<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Password Less_**. |
| Description | Provide a description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

<details><summary>Kafka (Apache Kafka, Amazon MSK, Confluent Kafka)</summary>
<p>

Steps to integrate Kafka with Orkes Conductor.

**Get Configuration Credentials from Apache Kafka**

Before beginning the integration process in Orkes Conductor, you must obtain specific configuration credentials from the Kafka cluster, such as the Bootstrap server, Schema registry URL, and API keys.

The configuration steps vary depending on the type of Kafka cluster to be integrated. 

**_Case - 1: Getting configuration credentials from self-managed Apache Kafka._**

Refer to the [official Apache Kafka documentation](https://kafka.apache.org/documentation/) for setting up Apache Kafka locally. Get the bootstrap server and API keys & secrets for integrating with Conductor.

**_Case - 2: Getting configuration credentials from Confluent Kafka._**

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

**_Case - 3: Getting configuration credentials from Amazon MSK._**

To get the Bootstrap server:

1. Login to [Amazon MSK console](https://console.aws.amazon.com/msk/).
2. Once logged in, the table lists all the clusters under the account for the current region.
3. Choose your cluster, and click _View client information_ on the cluster summary page. This gives the bootstrap broker and the Apache ZooKeeper connection string.

[Refer to the official Amazon MSK documentation for more details](https://docs.aws.amazon.com/msk/latest/developerguide/msk-get-bootstrap-brokers.html).

**Integrating with Apache Kafka as a Message Broker**

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

</p>
</details>

<details><summary>NATS Messaging</summary>
<p>

Steps to integrate NATS Messaging with Orkes Conductor.

**Get Configuration Credentials from NATS Messaging**

:::note Pre-Requisites
You must set up NATS messaging before integrating with Orkes Conductor. Refer to the [NATS Messaging official documentation](https://docs.nats.io/running-a-nats-service/introduction/installation) for more details.

Get the following credentials from the NATS server:

- Server name
- [Username & password](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/username_password) if you prefer to authenticate with credentials.
:::

**Integrating with NATS Messaging as a Message Broker**

Once you have the required configuration credentials from NATS Messaging, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **NATS Messaging**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-nats-messaging.png" alt="Integration configuration for NATS Messaging" width="50%" height="auto"/></p>

| Paremeters | Description | 
| ---------- | ----------- |
| Integration Name | A name to identify your integration. | 
| Server | Provide the NATS server name to be integrated with Orkes Conductor. |
| Connection Type | Choose the required connection type for the integration. It can take two values:<ul><li>Default</li><li>Jetstream</li></ul> | 
| Authentication Type | Choose the required authentication type. You can opt for **_With Credentials_** or **_Without Credentials_**. |
| Username | Provide the username for authentication. This field is required only if the **_Authentication Type_** is chosen as **_With Credentials_**. | 
| Password | Provide the password for authentication. This field is required only if the **_Authentication Type_** is chosen as **_With Credentials_**. | 
| Description | Provide a description of the integration. | 

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

<details><summary>GCP Pub Sub</summary>
<p>

Steps to integrate GCP Pub Sub with Orkes Conductor.

**Get Configuration Credentials from GCP Pub Sub**

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials such as project ID, subscription ID, and Service Account JSON from the GCP console.

To get the project ID:

1. Login to [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. Click the drop-down menu on the top left of the console to select your desired project. 
3. The Project ID will be displayed on the dashboard below the project name.

<p align="center"><img src="/content/img/get-project-id.png" alt="Get project ID from Google Cloud Console" width="100%" height="auto"/></p>

Refer to the [official documentation on creating and managing projects in GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects) for more details.

To get the subscription ID:

1. Go to the [Pub/Sub section in the Cloud Console](https://console.cloud.google.com/cloudpubsub). (From the left menu navigation, go to **_Products & solutions_** > **_Categories - Analytics_** > **_Pub/Sub_**)
2. From the left menu, click **Subscriptions** and choose the subscription you want to use, or create a new one.
3. The Subscription ID will be displayed as shown below:

<p align="center"><img src="/content/img/get-subscription-id.png" alt="Get subscription ID from Google Cloud Console" width="100%" height="auto"/></p>

To get the Service Account JSON:

1. From the left menu, navigate to the [IAM & Admin](https://console.cloud.google.com/iam-admin) section.
2. Select **Service Accounts** from the left menu.
3. Click on an existing service account you want to use or create a new one.
4. Under the **Keys** sub-tab, click **_Add Key_**.

<p align="center"><img src="/content/img/get-service-account-json.png" alt="Get Service Account JSON from Google Cloud Console" width="100%" height="auto"/></p>

5. Choose the option **Create new key**.
6. Choose the key type as JSON and click **Create** to generate the JSON key.

<p align="center"><img src="/content/img/get-service-account-json-key.png" alt="Get Service Account JSON key from Google Cloud Console" width="100%" height="auto"/></p>

**Integrating with GCP Pub Sub as a Message Broker**

Once you have the required configuration credentials from GCP Pub Sub, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **GCP Pub Sub**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-gcp-pub-sub.png" alt="Integration configuration for GCP Pub Sub" width="60%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Project ID | Provide the project ID containing the topic. [Refer to the previous section on how to get the project ID](#get-configuration-credentials-from-gcp-pub-sub). |
| Subscription ID | Provide the subscription ID. [Refer to the previous section on how to get the subscription ID](#get-configuration-credentials-from-gcp-pub-sub). |
| Upload Service Account JSON | Upload the Service Account JSON file, which is a key file containing the credentials for authenticating the Orkes Conductor cluster with the GCP Pub Sub services. [Refer to the previous section on how to generate the service account JSON](#get-configuration-credentials-from-gcp-pub-sub). |
| Description | Provide a description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

<details><summary>IBM MQ</summary>
<p>

Steps to integrate IBM MQ with Orkes Conductor.

**Get Configuration Credentials from IBM MQ**

Before beginning the integration process, you must obtain certain configuration parameters from the IBM MQ console, such as hostname, port, [queue manager](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=configuring-creating-queue-managers-multiplatforms), [channel](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=explorer-channels), etc.

You can get the host name & port while setting up IBM MQ. 

Refer to the [official IBM documentation](https://www.ibm.com/docs/en/ibm-mq) for more configuration details.

**Integrating with IBM MQ as a Message Broker**

Once you have the required configuration credentials from IBM MQ, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Conductor cluster.
2. Click **+ New integration** from the top-right corner of your window.
3. Under the **Message Broker** section, choose **IBM MQ**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-ibm-mq-messaging.png" alt="Integration configuration for IBM MQ" width="50%" height="auto"/></p>

| Parameters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Host Name | The hostname or IP address of the IBM MQ server. |
| Port | The port number on which the IBM MQ server is configured to listen for incoming connections. The default port for IBM MQ is 1414, but it usually varies with the required connection. |
| Queue Manager | Specify the queue manager to which Orkes Conductor will connect.<br/><br/>The queue manager should already be configured in your IBM MQ environment. Check out IBM MQ’s official documentation on [configuring queue manager](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=configuring-creating-queue-managers-multiplatforms). | 
| Channel | IBM MQ uses channels to establish connections between clients and queue managers. Specify the channel name the Conductor will use to communicate with IBM MQ. |
| User | The username to authenticate the connection with the IBM MQ server. |
| Password | The password associated with the username to authenticate the connection with the IBM MQ server. |
| Description | Provide a description of the integration. | 

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

</p>
</details>

## Configuring CDC Parameters in Conductor Workflows

The next step is to configure CDC parameters in the workflow.

To set CDC parameters:

1. Create a workflow definition. 
    - Use [API to create workflow definition](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definition).
    <br/>Or
    - Use Conductor UI:
        - Navigate to **Definitions > Workflow** on the Conductor cluster.
        - Click **+Define Workflow.**
        - Create a workflow by [adding required tasks](https://orkes.io/content/category/reference-docs).
2. Set the following fields as specified:
    - Set **"workflowStatusListenerEnabled"** to true.
    - Set **"workflowStatusListenerSink"** to the integration added in the previous step. 

For example, if AMQP is configured (with the integration name “amqp-test”) to a “queue_name,” the sink becomes **amqp:amqp-test:queue-name**.

```json
"workflowStatusListenerEnabled": true,
"workflowStatusListenerSink": "amqp:amqp-test:queue-name"
```

The Conductor UI also supports enabling this directly:

<p align="center"><img src="/content/img/workflow-listener-sink-ui.png" alt="Enabling workflow status listener via UI" width="100%" height="auto"></img></p>

:::tip
The “Workflow listener sink” drop-down field lists the integrations added to the cluster. The topic or queue name must be added manually.

For example, if an AMQP integration is added with the name “amqp-test” the drop-down shows:

<p align="center"><img src="/content/img/workflow-listener-sink-ui-drop-down.png" alt="Drop-down listing the integrations for workflow listener sink" width="100%" height="auto"></img></p>

Choose the integration and add the queue name to this so that the workflow listener sink is updated as follows:

```json
"workflowStatusListenerSink": "amqp:amqp-test:queue-name"
```

:::

3. Save the workflow definition.

## Execute Workflow

The next step is to execute the workflow. Workflows can be run in different ways, such as [using SDKs, APIs](https://orkes.io/content/reference-docs/api/workflow/start-workflow-execution), or Conductor UI.

To run a workflow using Conductor UI:

1. Click the **_Run Workflow_** button from the left menu.
2. Choose the workflow name and version.
3. Click **_Run Workflow_** at the top-right corner.
4. Click on the workflow execution ID generated to view the execution.

<p align="center"><img src="/content/img/run-workflow-ui-method.png" alt="Steps to run workflow from Conductor UI" width="100%" height="auto"></img></p>

The workflow execution begins, and upon any workflow state change, the details are sent to the configured eventing system. To be more specific, an event is triggered when the workflow state transitions from 'Running' to any other state.

<p align="center"><img src="/content/img/workflow-in-running-state.png" alt="Workflow in running state" width="100%" height="auto"></img></p>

## Verifying Changes in Eventing Systems

The final step is to verify that the workflow status changes are reflected in the configured eventing systems.

The settings for each of the eventing systems vary, so ensure to verify under the configured topic/queue name.