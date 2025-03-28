---
slug: "/integrations/message-broker/aws-sqs"
description: "Learn how to integrate AWS SQS with your Orkes Conductor cluster."
---

# Integrating AWS SQS with Orkes Conductor

This developer guide includes the steps to integrate AWS SQS with Orkes Conductor. This integration lets you connect your AWS SQS to Conductor to publish and receive messages from queues.

## Get Configuration Credentials from AWS SQS

Before beginning the integration process in Orkes Conductor, you must get specific configuration credentials from your Amazon SQS account.

- AWS Account ID & region where the SQS is located.
- Amazon Resource Name (ARN) to identify & access the queue. ARN is generally of the format **arn:aws:sqs:region:account-id:queue-name**. 
- External ID - When you assume a role belonging to another account in AWS, you need to provide the external ID, an ID that can be used in an IAM role trust policy to designate the person to assume the role. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).
- Access Key & Secret from AWS SQS account. 

Refer to the [AWS SQS official documentation](https://docs.aws.amazon.com/sqs/) on how to get these credentials. 

## Integrating with AWS SQS as a Message Broker

Now, you have the required configuration credentials from AWS SQS. Let’s integrate with Orkes Conductor.

1. Navigate to **Integrations** from the left menu on the Orkes Conductor cluster.
2. Click **+ New integration** from the top-right corner.
3. Under the **Message Broker** section, choose **AWS SQS.**
Click **+Add** and provide the following parameters:

<p align="center"><img src="/content/img/integration-aws-sqs.png" alt="Integration configuration for AWS SQS" width="50%" height="auto"/></p>

| Parameters | Description |
| ---------- | ----------- |
| Name | A name to identify your integration. |
| Connection Type | Choose the required connection type. Depending upon how the connection is to be established, it can take the following values:<ul><li>**Current Conductor Role** - Choose this if you are using the current Conductor role to establish the connection.</li><li>**Assume External Role** - Choose this if you are assuming a role belonging to another AWS account. [Learn more](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html).</li><li>**Access Key/Secret** - Choose this if you are establishing the connection using the access key and secret.</li></ul> | 
| Region | The valid AWS region where the SQS is located. | 
| Account ID | Your AWS Account ID. This field is optional.<br/><br/>**Note**: If ARN is not used for the “Sink” in the workflow definition, the account ID should be used. | 
| Role ARN | The Amazon Resource Name (ARN) required for setting up the connection.<br/><br/>**Note**: This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| External ID | If applicable, provide the external ID for assuming the role.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Assume External Role_**. |
| Access Key | The AWS Access Key.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Access Secret | The AWS Access Secret.<br/><br/>**Note:**This field is applicable only if the **_Connection Type_** is chosen as **_Access Key/Secret_**. |
| Description | A description of the integration. |

5. You can toggle on the **Active** button to activate the integration instantly.
6. Click **Save**.

## Creating Event Handlers in Orkes Conductor 

The integration is created successfully now. The next step is to create an event handler in Orkes Conductor.

To do this:

1. Navigate to **Definitions > Event Handler** from the left menu on your Orkes Conductor cluster.
2. Click the **+ Define event handler** option from the top-right corner.
3. Create an event handler with the following configurations:
<p align="center"><img src="/content/img/event-handler-aws-sqs.png" alt="Configuring Event Handler for AWS SQS Integration" width="70%" height="auto"/></p>

| Event Handler Parameters | Description |
| ------------------------ | ----------- |
| Name | A name to identify your event handler definition. |
| Event | The event integration you have created in the following format:<br/><br/>**Type : Config Name : Queue Name**<br/><br/>Example: **sqs:john-test:arn:aws:sqs:us-east-1:XXXXXXXXX:eventstest-1**<br/><br/>**Notes**: The drop-down automatically lists the integration you’ve added to the Conductor cluster. You can choose that and add the queue name you want to publish/receive messages. |
| Condition  | The ECMAScript to control the message processing if required. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Actions | Choose the required actions to be carried out on sending/receiving the events to/from AWS SQS. It can take the following values:<ul><li>Complete Task</li><li>Terminate Workflow</li><li>Update Variables</li><li>Fail Task</li><li>Start Workflow</li></ul>Each type of action requires and supports a certain set of input parameters. Check out the [event handler documentation](https://orkes.io/content/developer-guides/event-handler#configuring-an-event-handler) for more details. | 
| Active | Set this to true or false. It determines if the event handler is running or not. | 

A sample JSON for the event handler is as follows:

```json
{
 "name": "sqs-event-handler",
 "event": "sqs:sqstest:arn:aws:sqs:us-east-1:XXXXXXXXXXXXXX:eventstest-1",
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
5. Click **Add Permissions**. This ensures that all the group members can access these integration models in their workflows.

<p align="center"><img src="/content/img/rbac-confluent-sqs.png" alt="Configuring RBAC for AWS SQS Integration" width="50%" height="auto"/></p>

Similarly, you can also provide permissions to [applications](https://orkes.io/content/access-control-and-security/applications#configuring-application).

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the SQS queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **+ Define Workflow** button.
2. Create a workflow with an event task with the Sink in the format **sqs:john-test:arn:aws:sqs:us-east-1:XXXXXXXXX:eventstest-1**, where “john-test” is the integration name and “**arn:aws:sqs:us-east-1:XXXXXXXXX:eventstest-1**” is the ARN pointing to the SQS queue to which the Conductor should send/receive messages.

<p align="center"><img src="/content/img/event-task-sqs.png" alt="Event task in Orkes Conductor" width="70%" height="auto"/></p>

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run Workflow** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-sqs.png" alt="Running workflow from Orkes Conductor UI" width="70%" height="auto"/></p>

Upon successful execution, go to AWS Web Console for that SQS queue, poll for messages, and inspect the payload to verify the message is consumed.

<p align="center"><img src="/content/img/aws-console.png" alt="AWS Console" width="70%" height="auto"/></p>

The action added in the event handler definition was to start the workflow “**event-handler-test**”. You can verify the same from the **Executions > Workflow** page.

<p align="center"><img src="/content/img/event-handler-action-sqs.png" alt="Starting workflow on consuming events" width="90%" height="auto"/></p>