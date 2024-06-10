# Integrating IBM MQ with Orkes Conductor

This developer guide includes the steps to integrate IBM MQ with Orkes Conductor. This integration lets you connect your IBM MQ server to Conductor to publish and subscribe messages to/from IBM MQ.

## Get Configuration Credentials from IBM MQ

Before beginning the integration process, you must obtain certain configuration parameters from the IBM MQ console, such as hostname, port, [queue manager](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=configuring-creating-queue-managers-multiplatforms), [channel](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=explorer-channels), etc.

You can get the host name & port while setting up IBM MQ. 

Refer to the [official IBM documentation](https://www.ibm.com/docs/en/ibm-mq) for more configuration details.

## Integrating with IBM MQ as a Message Broker

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
| Connection Security | Choose the required connection security type. It can take the following values:<ul><li>With Username/Password</li><li>Passwordless</li></ul> | 
| User | The username to authenticate the connection with the IBM MQ server.<br/><br/>**Note**: This field is applicable only if **_Connection Security_** is chosen as **_With Username/Password_**. |
| Password | The password associated with the username to authenticate the connection with the IBM MQ server.<br/><br/>**Note**: This field is applicable only if **_Connection Security_** is chosen as **_With Username/Password_**. |
| Select the preferred messaging method | Choose the messaging approach that suits your communication needs. It can be of the following types:<ul><li>**Topic-based Messaging** -  Allows messages to be broadcasted to multiple subscribers based on the topics of interest, fostering a publish/subscribe model.</li><li>**Queue-based Messaging** -  Allows point-to-point messaging, where messages are sent directly to individual queues for consumption by specific recipients.</li></ul> |
| Topic String | Used to define the criteria for selecting topics in the messaging system. Allows you to specify patterns that match topics of interest. For example, entering ‘finance/’ would subscribe you to all topics under the ‘finance’ category. <br/><br/>**Note**: This field is applicable for **Topic-based Messaging**. | 
| Authentication type | Choose the required authentication type. It can take the following values:<ul><li>**NONE**</li><li>**JKS**</li></ul> |
| Choose Trust Store file | If the authentication is chosen as **JKS**, upload the Java JKS trust store file with CAs. | 
| Password | Provide the password for the trust store. |
| Cipher Suite | A Cipher Suite encompasses a set of algorithms ensuring encryption, key exchange, authentication, and data integrity for secure network communications. Choose the suitable Cipher Suite from the following options:<ul><li>TLS_RSA_WITH_AES_128_CBC_SHA256</li><li>TLS_RSA_WITH_AES_256_CBC_SHA256</li><li>TLS_RSA_WITH_AES_256_GCM_SHA384</li><li>ANY_TLS12</li></ul> | 
| Description | Provide a description of the integration. | 

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Conductor console.
2. Click the **+ Define event handler** option from the top-right corner of the window.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-ibm-mq.png" alt="Configuring Event Handler for IBM MQ Integration" width="70%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | Provide a name to identify your event handler definition. |
| Event | Provide the event integration you have created in the following format:<br/><br/>**Type : Config Name : Queue Name**<br/><br/>Example: **ibm_mq:ibm-mq:queue-name**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the queue name to which you want to publish/receive messages. |
| Condition | Provide the ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out when sending/receiving the events from IBM MQ. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. | 

A sample JSON for the event handler is as follows:

```json
{
 "name": "event-handler-ibm",
 "event": "ibm_mq:ibm-mq:queue_name",
 "evaluatorType": "javascript",
 "condition": "true",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "http-test",
       "version": "1"
     },
     "expandInlineJSON": false
   }
 ]
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
5. Click **Add Permissions.** This ensures that all the group members can access these integration models in their workflows.

<p align="center"><img src="/content/img/rbac-ibm-mq.png" alt="Configuring RBAC for IBM MQ Integration" width="70%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the IBM MQ queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **Define Workflow** button.
2. Create a workflow and add an event task at the required point with the **Sink** in the format **ibm_mq:ibm-mq:queue-name**, where “ibm-mq” is the integration name and “queue-name” is the queue to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-ibm-mq.png" alt="Event task for IBM MQ Integration in Orkes Conductor" width="70%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-ibm-mq.png" alt= "Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the IBM MQ console. 

The action added in the event handler definition was to start the workflow **http-test**. You can verify this from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-ibm-mq.png" alt= "Starting workflow on sending events" width="100%" height="auto"/></p>