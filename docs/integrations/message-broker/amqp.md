---
slug: "/integrations/message-broker/amqp"
description: "Learn how to integrate AMQP with your Orkes Conductor cluster."
---

# Integrating AMQP with Orkes Conductor

This developer guide includes the steps to integrate AMQP with Orkes Conductor. This integration lets you connect your AMQP to Conductor to publish and receive messages from queues.

## Get Configuration Credentials from AMQP

Before beginning the integration process in Orkes Conductor, you must obtain specific configuration credentials from AMQP, such as protocol, username, password, host, port, and virtual host. 

Refer to the official [AMQP documentation](https://www.cloudamqp.com/docs/index.html) on how to get these configuration parameters. 

## Integrating with AMQP as a Message Broker

Now, you have the required configuration credentials from AMQP. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on your Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **AMQP**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-amqp.png" alt="Integration configuration for AMQP" width="50%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Protocol | The communication protocol to be used. It can be ‘amqp’ or ‘amqps’ (Recommended for secure connections). |
| Username | The username to authenticate and authorize the connection. |
| Password | The password associated with the provided username. |
| Host | The hostname of the server where the message broker is running. |
| Port | The port number on the host where the message broker is running. The default port for AMQPS is 5671, and the default port for AMQP is 5672. |
| Virtual Host | The virtual host namespace. In AMQP, a virtual host is a namespace that allows multiple messaging environments to coexist within a single broker. |
| Description | A description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-amqp.png" alt="Configuring Event Handler for AMQP Integration" width="50%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify your event handler definition. |
| Event | The event integration you have created in the following format:<br/><br/>**Type : Config Name : Queue Name**<br/><br/>Example: **amqp:amqp-test:queue-name**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the queue name you want to publish/receive messages. |
| Condition | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out on sending or receiving the events to/from AMQP. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. |

A sample JSON for the event handler is as follows:

```json
{
 "name": "amqp-endpoint-event-handler",
 "event": "amqp:amqptest:events-test-1",
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

Once the integration is added, the next step is to determine who can access these integrations.

The permissions can be granted to applications/groups within the Orkes Conductor cluster.

To provide explicit permission to Groups:

1. From the left menu on your Orkes Conductor cluster, navigate to **Access Control > Groups**.
2. Create a new group or choose an existing group.
3. Under the **Permissions** section, click **+Add Permission**.
4. From the **Integrations** sub-tab, choose the integration with required permissions.
5. Click **Add Permissions.** This ensures that all the group members can access these integration models in their workflows.

<p align="center"><img src="/content/img/rbac-amqp.png" alt="Configuring RBAC for AMQP Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the AMQP queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow with an event task with the **Sink** in the format **amqp:amqp-test:queue-name**, where “amqp-test” is the integration name and “queue-name” is the queue to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-amqp.png" alt="Event task in Orkes Conductor" width="70%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-amqp.png" alt="Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the AMQP console. 

The action added in the event handler definition was to start the workflow **event-handler-test**. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-amqp.png" alt="Starting workflow on consuming events" width="90%" height="auto"/></p>