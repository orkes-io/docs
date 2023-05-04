# How to connect to Azure Service Bus?

The following property needs to be set in your cluster's Conductor Server.

```json
conductor.event.queues.azure-bus.connectionString="Endpoint=sb://<service-bus-name>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<AccessKey>"
```

This can be retrieved from Azure portal.

:::note
Currently a cluster can only connect to one Azure Service Bus instance.
:::

Once connection properties are added, we use the [Event](/content/reference-docs/system-tasks/event)  task to publish messages to the service bus queues. An example definition is shown below.

```json
{
  "name": "event",
  "taskReferenceName": "event",
  "inputParameters": {<// Payload>},
  "type": "EVENT",
  "sink": "azure:<QUEUE NAME>"
}
```
