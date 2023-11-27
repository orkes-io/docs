# Azure Service Bus Integration

This document describes how to configure an instance of Azure Service Bus to talk to Conductor for publishing and consuming events.

## Retrieve SAS Token

In the service bus Shared Access Policies, create a new policy that can send and receive messages. Get the “Primary Connection String” from the policy. You can use an existing policy if you’d like. The retrieved SAS string should look like this:

```
Endpoint=sb://<NAME>.servicebus.windows.net/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KEY>
```

## Configuring Conductor

In your selected Conductor environment, you’d need to configure the Service Bus for connectivity. You can do this via Swagger UI or via direct curl access as shown below. Ensure to take a note of the parameters involved.

<p align="center"><img src="/content/img/azure-service-bus.png" alt="Azure Service Bus" width="100%" height="auto"></img></p>

```shell
curl -X 'PUT' \
  'https://test-postgres.orkesconductor.io/api/event/queue/config/azure/orkes-dev-test' \
  -H 'accept: */*' \
  -H 'X-Authorization: AUTH-TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "connectionString": "Endpoint=sb://<NAME>.servicebus.windows.net/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KEY>"
}'
```

Here’s the JSON payload formatted for better clarity:

```json
{
    "connectionString": "Endpoint=sb://<NAME>.servicebus.windows.net/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KEY>"
}
```

| Parameter | Description |
| --------- | ----------- |
| connectionString | Provide the SAS access key (Primary Connection String from the shared access policies). | 

## Publishing to Conductor

Configure an [EVENT task](https://orkes.io/content/reference-docs/system-tasks/event) anywhere in your workflow, and the body of the message is the inputParameter inputs. The published message body will be in JSON format.

<p align="center"><img src="/content/img/event-task-azure-service-bus-integration.png" alt="Event task in Azure Service Bus integration" width="60%" height="auto"></img></p>

:::note
The UI currently doesn’t let us specify the queue config name, so we will have to edit the code to set the JSON as follows:
```json
{
  "name": "event_task",
  "taskReferenceName": "event_task_ref",
  "inputParameters": {
    "Some-Key-tbdbb": "Some-Value-tbdbb",
    "Some-Key-n5gdr": "Some-Value-n5gdr"
  },
  "type": "EVENT",
  "sink": "azure:orkes-dev-test:test_queue"
}
```
:::

| Parameter | Description |
| --------- | ----------- |
| name | The name of the task. |
| taskReferenceName | The reference name of the task. |
| sink | In the format:<p> **Type : Config Name : Queue Name**</p> <p> Example: **azure:orkes-dev-test:test_queue**</p>|
| type | EVENT |
| inputParameters | The fields of the JSON to be published. | 

The system will insert the following parameters which can be used for determining the source of the event on the consumer side.

| Parameter | Description |
| --------- | ----------- |
| sink | The sink name configured in the Conductor workflow to send this message. |
| workflowType | The name of the workflow definition. |
| correlationId | Correlation ID of the workflow (if available). |
| workflowVersion | The version of the workflow definition. |
| _createdBy | The user who created the workflow. |
| workflowInstanceId | The instance at which the workflow ran. | 

Example of a published message payload:

```json
{
  "Some-Key-tbdbb": "Some-Value-tbdbb",
  "Some-Key-n5gdr": "Some-Value-n5gdr",
  "sink": "azure:orkes-dev-test:test_queue",
  "workflowType": "event_publisher_workflow",
  "correlationId": null,
  "workflowVersion": 1,
  "_createdBy": "boney@orkes.io",
  "workflowInstanceId": "40245471-8a7a-11ee-9ef5-62632c15ba76"
}
```

Here the first two fields are inputs auto-injected by the system and the rest are the ones configured as input parameters for the event task.

## Receiving into Conductor

To receive messages into Conductor - you’d need to configure an event handler. An event handler can then be configured to do many things. Please see the doc on [Event Handler](/content/developer-guides/event-handler) for details.