---
slug: "/integrations/message-broker/nats-messaging"
description: "Learn how to integrate NATS Messaging your Orkes Conductor cluster."
---

# Integrating NATS Messaging with Orkes Conductor

This developer guide includes the steps to integrate NATS Messaging with Orkes Conductor. This integration lets you connect your NATS server to Conductor to publish and receive messages from queues.

## Get Configuration Credentials from NATS Messaging

:::note Pre-Requisites
You must set up NATS messaging before integrating with Orkes Conductor. Refer to the [NATS Messaging official documentation](https://docs.nats.io/running-a-nats-service/introduction/installation) for more details.

Get the following parameters from the NATS server:

- Server name
- [Username & password](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/username_password) if you prefer to authenticate with credentials.
- Stream name & consumer name if the connection mechanism is using consumer.
:::

## Integrating with NATS Messaging as a Message Broker

Once you have the required configuration parameters from NATS Messaging, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **NATS Messaging**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-nats-messaging.png" alt="Integration configuration for NATS Messaging" width="50%" height="auto"/></p>

| Paremeters | Description | 
| ---------- | ----------- |
| Integration Name | A name to identify your integration. | 
| Server | The NATS server name to be integrated with Orkes Conductor. |
| Connection Type | Choose the required connection type for the integration. Supported values:<ul><li>**_Default_** - Standard NATS connection.</li><li>**_Jetstream_** - Advanced NATS connection with streaming capabilities.</li></ul> | 
| Connection Mechanism | Choose the required connection mechanism for the Jetstream connection. Supported values:<ul><li>**_With stream_** - This is the regular approach in a Jetstream connection, where each stream defines how the messages are stored and the retention limits.</li><li>**_With consumer_** - This mechanism acts as an interface for clients to consume a subset of messages stored in a stream.</li></ul> This field is applicable only if the **_Connection Type_** is chosen as **_Jetstream_**.|
| Stream name | The name of the stream for Jetstream connection.<br/><br/>This field is applicable only if the **_Connection Type_** is chosen as **_Jetstream_** and the **_Connection Mechanism_** is chosen as **_With consumer_**. | 
| Consumer name | The name of the consumer for Jetstream connection.<br/><br/>This field is applicable only if the **_Connection Type_** is chosen as **_Jetstream_** and the **_Connection Mechanism_** is chosen as **_With consumer_**. | 
| Consumer type | The type of consumer for Jetstream connection. Supported values:<ul><li>**_Push_** - The server actively delivers messages to the client.</li><li>**_Pull_** - The client requests messages from the server when ready.</li></ul>This field is applicable only if the **_Connection Type_** is chosen as **_Jetstream_** and the **_Connection Mechanism_** is chosen as **_With consumer_**.  | 
| Batch Poll Consumers Count | The number of consumers to be polled per batch when using the **_Pull_** consumer type.<br/><br/>This field is applicable only if the **_Connection Type_** is chosen as **_Jetstream_** and the **_Connection Mechanism_** is chosen as **_With consumer_**. |
| Select security protocol | Choose the security protocol for authenticating the connection. It can take values: <ul><li>**_NONE_**</li><li>**_JWT_** - If JWT is opted, upload the JWT credentials file. </li><li>**_TOKEN_BASED_AUTHENTICATION_** - Obtain the JWT token from your NATS server using an API.</li></ul>| 
| Transport Layer Security | Choose the TLS security mechanism. Supported values:<ul><li>**_NONE_** - No TLS security.</li><li>**_PEM_** - Use PEM files for TLS security.  If PEM is opted for, upload the CA certificate PEM file.</li><li>**_JKS_** - Use Java KeyStore for TLS security. If JKS is opted for, upload the CA certificate JKS file.</li></ul> | 
| Trust Store Authentication | Choose the required trust store authentication type. Supported values:<ul><li>**NONE** - No TLS authentication.</li><li>**_usingPassword_** - If opted, provide the trust store password.</li></ul>This field is applicable only if **_TLS_** is chosen as **_JKS_**. | 
| Authentication Type | Choose the required authentication type. You can opt for **_With Credentials_** or **_Without Credentials_**. |
| Username | The username for authentication. This field is applicable only if the **_Authentication Type_** is chosen as **_With Credentials_**. | 
| Password | The password for authentication. This field is applicable only if the **_Authentication Type_** is chosen as **_With Credentials_**. | 
| Description | A description of the integration. | 

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click the **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-nats.png" alt="Configuring Event Handler for NATS Messaging Integration" width="50%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify your event handler definition. | 
| Event | The event integration you have created in the following format:<br/><br/>**Type : Config Name : Queue Name**<br/><br/>Example: **nats:nats-test:queue-name**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the queue name you want to publish/receive messages. | 
| Condition  | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. |
| Actions | Choose the required actions to be carried out on sending/receiving the events from NATS. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. | 

A sample JSON for the event handler is as follows:

```json
{
 "name": "nats-userpass",
 "event": "nats:natstest:events-test-1.test",
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

<p align="center"><img src="/content/img/rbac-nats.png" alt="Configuring RBAC for Nats Messaging Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the NATS queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow and add an event task at the required point with the **Sink** in the format **nats:Nats-integration-test:queue-name**, where “Nats-integration-test” is the integration name and “queue-name” is the queue to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-nats.png" alt="Event task for NATS Integration in Orkes Conductor" width="80%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow **button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-nats.png" alt="Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the NATS server. 

Check out the official NATS documentation on [enabling monitoring](https://docs.nats.io/running-a-nats-service/configuration/monitoring) & how to [monitor the NATS messaging system](https://docs.nats.io/running-a-nats-service/nats_admin/monitoring).

The action added in the event handler definition was to start the workflow **event-handler-test**. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-nats.png" alt="Starting workflow on sending events" width="100%" height="auto"/></p>