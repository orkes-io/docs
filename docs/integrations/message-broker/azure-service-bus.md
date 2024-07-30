# Integrating Azure Service Bus with Orkes Conductor

This developer guide includes the steps to integrate Azure Service Bus with Orkes Conductor. This integration lets you connect your Azure Service Bus to Conductor to publish and receive messages from queues.

## Get Configuration Credentials from Azure Service Bus

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials, such as the endpoint and namespace of the service bus.

- Refer to the official documentation on [how to get the namespace](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-topics-subscriptions-portal#create-a-namespace-in-the-azure-portal).
- The endpoint is part of the connection string of the service bus. Refer to the official documentation on [how to get the connection string (containing the endpoint)](https://learn.microsoft.com/en-us/azure/connectors/connectors-create-api-servicebus?tabs=consumption#get-connection-string-for-service-bus-namespace) of the service bus.

## Integrating with Azure Service Bus as a Message Broker

Now, you have the required configuration credentials from Azure Service Bus. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **Azure Service Bus**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-azure-service-bus.png" alt="Integration configuration for Azure Service Bus" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Connection Type | Choose the required connection type. It can take the following values:<ul><li>Connection String</li><li>Password Less</li></ul> |
| Endpoint | The endpoint of the service bus. [Refer to the previous section on how to get this.](/content/integrations/message-broker/azure-service-bus#get-configuration-credentials-from-azure-service-bus)<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Connection String_**. |
| Namespace | The namespace of the service bus. [Refer to the previous section on how to get this.](/content/integrations/message-broker/azure-service-bus#get-configuration-credentials-from-azure-service-bus)<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Password Less_**. |
| Description | A description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click the **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-azure-service-bus.png" alt="Configuring Event Handler for Azure Service Bus Integration" width="50%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify your event handler definition. |
| Event | The event integration you have created in the following format:<br/><br/>**Type : Config Name : Queue Name**<br/><br/>Example: **azure:azureendpoint:events-test-1**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the queue name you want to publish/receive messages. | 
| Condition | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out on sending or receiving the events to/from Azure Service Bus. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul> Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. |

A sample JSON for the event handler is as follows:

```json
{
 "name": "asb-endpoint-event-handler",
 "event": "azure:azureendpoint:events-test-1",
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

<p align="center"><img src="/content/img/rbac-azure-service-bus.png" alt="Configuring RBAC for Azure Service Bus Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the Azure Service Bus queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow with an event task with the **Sink** in the format **azure:john-test:events-test-1**, where “john-test” is the integration name and “events-test-1”, is the queue to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-azure-service-bus.png" alt="Event task in Orkes Conductor" width="80%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-azure-service-bus.png" alt="Running workflow from Orkes Conductor UI" width="80%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the Azure Service Bus console. 

The action added in the event handler definition was to start the workflow **event-handler-test**. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-azure-service-bus.png" alt="Starting workflow on consuming events" width="80%" height="auto"/></p>