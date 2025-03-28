---
slug: "/integrations/message-broker/gcp-pub-sub"
description: "Learn how to integrate GCP Pub Sub with your Orkes Conductor cluster."
---

# Integrating GCP Pub Sub with Orkes Conductor

This developer guide includes the steps to integrate Google Cloud Platform (GCP) Pub Sub with Orkes Conductor. This integration lets you connect your GCP Pub Sub to Conductor to publish and receive messages from topics.

## Get Configuration Credentials from GCP Pub Sub

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials such as project ID, subscription ID, and Service Account JSON from the GCP console.

To get the project ID:

1. Login to [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. If you have multiple projects, click the drop-down menu on the top left of the console to select your desired project. 
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

## Integrating with GCP Pub Sub as a Message Broker

Once you have the required configuration credentials from GCP Pub Sub, let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **GCP Pub Sub**.
4. Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-gcp-pub-sub.png" alt="Integration configuration for GCP Pub Sub" width="60%" height="auto"/></p>

| Paremeters | Description |
| ---------- | ----------- |
| Integration Name | A name to identify your integration. |
| Project ID | The project ID containing the topic. [Refer to the previous section on how to get the project ID](#get-configuration-credentials-from-gcp-pub-sub). |
| Subscription ID | The subscription ID. [Refer to the previous section on how to get the subscription ID](#get-configuration-credentials-from-gcp-pub-sub). |
| Upload Service Account JSON | Upload the Service Account JSON file, which is a key file containing the credentials for authenticating the Orkes Conductor cluster with the GCP Pub Sub services. [Refer to the previous section on how to generate the service account JSON](#get-configuration-credentials-from-gcp-pub-sub). |
| Description | A description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click the **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:

<p align="center"><img src="/content/img/event-handler-gcp-pub-sub.png" alt="Configuring Event Handler for GCP Pub Sub Integration" width="70%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify your event handler definition. |
| Event | The event integration you have created in the following format:<br/><br/>**Type : Config Name : Topic Name**<br/><br/>Example: **gcppubsub:gcp-test:topic-name**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the topic name you want to publish/receive messages. |
| Condition | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out on sending/receiving the events from GCP Pub Sub. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. | 

A sample JSON for the event handler is as follows:

```json
{
 "name": "gcp-pub-sub-event-handler",
 "event": "gcppubsub:gcp-pub-sub-test:gcp-topic-name",
 "condition": "true",
 "actions": [
   {
     "action": "start_workflow",
     "start_workflow": {
       "name": "event-handler-test",
       "version": 1
     },
     "expandInlineJSON": false
   },
 ],
 "active": true,
 "evaluatorType": "javascript",
 "createdBy": "devrel@orkes.io"
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

<p align="center"><img src="/content/img/rbac-gcp-pub-sub.png" alt="Configuring RBAC for GCP Pub Sub Integration" width="70%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the GCP Pub Sub topic as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow and add an event task at the required point with the **Sink** in the format **_gcppubsub:gcp-pub-sub-test:gcp-topic-name_**, where “gcp-pub-sub-test” is the integration name and “gcp-topic-name” is the topic to which Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-gcp-pub-sub.png" alt="Event task for GCP Pub Sub Integration in Orkes Conductor" width="70%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-gcp-pub-sub.png" alt="Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, you can verify the message's delivery through the GCP Pub Sub console. 

The action added in the event handler definition was to start the workflow **event-handler-test**. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-gcp-pub-sub.png" alt="Starting workflow on sending events" width="100%" height="auto"/></p>