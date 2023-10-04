# Task and Workflow Event Streaming with Orkes Conductor & Azure Event Hub

Streamlining the monitoring and management of tasks and workflows is vital in orchestration. With Orkes Conductor, you can publish and consume task and workflow status change stream events by integrating with the powerful event streaming platform Azure Event Hub. 

In this article, we will explore the steps of publishing and consuming events with Orkes Conductor and Azure Event Hub.

## Publishing Task & Workflow Status Change Stream Events

:::note
Ensure you have set up an account in Azure Event Hub.
:::

Follow the steps to publish the events:

1. In your workflow definition, enable workflow status listener: **`workflowStatusListenerEnabled :true`**.
2. Assign the **`workflowStatusListenerSink : “kafka:event_hub_name”`**, where **event_hub_name** is the name of your Azure Hub Event. Conductor will use this event hub for publishing the events. Refer to the Azure documentation on [creating an event hub using the Azure portal](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-create).
3. Create an event handler configuration in Orkes Conductor using the following cURL command: ([You need to generate a token for this.](https://orkes.io/content/access-control-and-security/applications#generating-token))

```shell
curl -X 'PUT' \
  'https://conductor_server_url/api/event/queue/config/kafka/order_details' \
  -H 'X-Authorization: <JWT Token>'\
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '
{
{
    "consumer": {
        "bootstrap.servers": "boot_strap_server",
        "request.timeout.ms": "60000",
        "security.protocol": "SASL_SSL",
        "sasl.mechanism": "PLAIN",
        "sasl.jaas.config":"org.apache.kafka.common.security.plain.PlainLoginModule required username=\"$ConnectionString\" password=\"azure_connection_string\";"
    },
    "producer": {
        "bootstrap.servers": "boot_strap_server",
        "request.timeout.ms": "60000",
        "security.protocol": "SASL_SSL",
        "sasl.mechanism": "PLAIN",
        "sasl.jaas.config":"org.apache.kafka.common.security.plain.PlainLoginModule required username=\"$ConnectionString\" password=\"azure_connection_string\";"
    }
}

}'
```

:::note Notes
- Update the configuration properties with your details, including the Kafka bootstrap server, security protocol, and SASL mechanism.
- Replace **conductor_server_url** with your Conductor server name.
- The username in the **jaas.config** must be **$connectionString,** and Azure connectionString must be given as the password.
:::

4. Trigger the workflow, and Conductor will publish the event to the specified “**event_hub_name**”.

## Consuming Task & Workflow Status Change Stream Events

Follow the below steps to consume events from Azure Event Hub:

1. Ensure that you have the **connectionString** and **eventHubName** to consume the events. Refer to the Azure documentation on [how to get your connectionString](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send?tabs=connection-string%2Croles-azure-portal#get-the-connection-string). 
2. [Create a console application in Visual Studio](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send?tabs=connection-string%2Croles-azure-portal#create-a-console-application).
3. [Add NuGet package](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send?tabs=connection-string%2Croles-azure-portal#add-the-nuget-packages-to-the-project) ‘**Azure.Messaging.EventHubs**’ to your project.
4. Create a class called **ConsumerExample** and paste the below code into it:

```csharp
using Azure.Messaging.EventHubs.Consumer;

class ConsumerExample
{
    public static void Main(string[] args)
    {
        consume();
        Console.ReadLine();
    }

    async static void consume()
    {
        var connectionString = "connection_string";
        var eventHubName = "event_hub_name";
        var consumerGroup = EventHubConsumerClient.DefaultConsumerGroupName;

        var consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

        try
        {
            await foreach (PartitionEvent partitionEvent in consumer.ReadEventsAsync())
            {
                string readFromPartition = partitionEvent.Partition.PartitionId;
                byte[] eventBodyBytes = partitionEvent.Data.EventBody.ToArray();

                string result = System.Text.Encoding.UTF8.GetString(eventBodyBytes);
                Console.WriteLine("Got message " + result);

            }
        }
        catch (Exception){}
        finally
        {
            await consumer.CloseAsync();
        }
    }
}
```

:::note
This is a sample code for demonstration purposes. You can customize it as per your requirements.
:::

5. Run the Console application, and it will start consuming the events from Azure Event Hub.

:::tip
To consume the latest events, pass **`startReadingAtEarliestEvent: false`** in **`ReadEventsAsync()`** method.
:::

## Reference Docs

- [Guide on Azure Event Hub project setup in .NET](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-send?tabs=passwordless%2Croles-azure-portal)
- [Events hub sample on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/eventhub/Azure.Messaging.EventHubs/samples)
- [Creating Workflow Definition in Orkes Conductor](https://orkes.io/content/reference-docs/api/metadata/creating-workflow-definitions)
