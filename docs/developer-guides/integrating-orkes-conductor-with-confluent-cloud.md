# Integrating Orkes Conductor with Confluent Cloud

This developer guide includes the steps to integrate Orkes Conductor with Confluent Cloud. The integration involves creating a Queue Config in Orkes that maps to a specific topic in the Kafka cluster and provides the associated credentials for the producer and consumer.

:::notePrerequisites
- Identify the Confluent Cloud environment and the specific topic you want Orkes to publish to and consume from.
:::

## Obtaining Client Configuration Credentials from Confluent Cloud

You must obtain specific configuration credentials from the Confluent Cloud, such as API keys and the Bootstrap server.

To obtain the API Keys:

1. From your Confluent Cloud portal, choose your cluster to be integrated with Orkes Conductor and navigate to **API Keys**.
2. Create a new key by clicking **Create Key/+Add key** and select the required access (Global access/Granular access).
3. Note down the values for the **Key** and **Secret**.

<p align="center"><img src="/content/img/generating-api-keys-confluent.png" alt="Generating API Keys from Confluent Cloud" width="100%" height="auto"/></p>

To get the Bootstrap server:

1. Navigate to **Cluster Settings > Endpoints** and copy the **Bootstrap server**.

<p align="center"><img src="/content/img/getting-bootstrap-token.png" alt="Getting Bootstrap token from Confluent Cloud" width="100%" height="auto"/></p>

2. Then, navigate to **Topics** to see the list of topics on this cluster and identify the **Topic name** to use for this integration.

<p align="center"><img src="/content/img/topics.png" alt="Topics in Confluent Cloud" width="100%" height="auto"/></p>

3. Ensure there is network connectivity between your Orkes cluster and Confluent Kafka cluster. 
4. Add the name of your Orkes cluster (the subdomain part of the URL: e.g., test-xyz-std of `https://test-xyz-std.orkesconductor.io`) [as a consumer group name in the ACL settings of your Confluent cluster](https://docs.confluent.io/platform/current/control-center/consumers.html).

:::info
Refer to the [Confluent Cloud official documentation](https://docs.confluent.io/cloud/current/overview.html) for more information.
:::

## Creating Queue Config in Orkes Conductor

:::note
To create a queue config in Orkes Conductor, you must be an admin to the Conductor cluster.
:::

1. If you are not an admin, request your cluster admin to grant admin access from Conductor UI.
2. If you are using [an application](https://orkes.io/content/access-control-and-security/applications) to execute this operation, that application must have an **Admin** role. This is currently not supported in the UI, and you can use the below REST API to accomplish it for an application you have already created. This is available to view in the **_Access Controls_** section in the Orkes UI.

```
POST https://your.conductor.url/api/applications/{appId}/roles/ADMIN
```

### Using REST API to Configure Queue Config

1. Create a queue config using the Orkes Conductor REST API by sending a PUT request with the body. 

```
/api/event/config/kafka/<TOPIC_NAME> 
```

An example is below:

```bash
curl -X 'PUT' \
  'https://<ORKES_CONDUCTOR_DNS_NAME>/api/event/queue/config/kafka/<TOPIC_NAME>' \
  -H 'accept: */*' \
  -H 'X-Authorization: <your auth key>' \
  -H 'Content-Type: application/json' \
  -d '{
   "consumer": {
       "bootstrap.servers": "<BOOTSTRAP_SERVER>",
       "security.protocol": "SASL_SSL",
       "sasl.jaas.config": "org.apache.kafka.common.security.plain.PlainLoginModule required username='\''<API_KEY>'\'' password='\''<API_SECRET>'\'';",
       "sasl.mechanism": "PLAIN",
       "client.dns.lookup": "use_all_dns_ips",
       "session.timeout.ms": "45000",
       "max.poll.records": "2000"
   },
   "producer": {
      "bootstrap.servers": "<BOOTSTRAP_SERVER>",
       "security.protocol": "SASL_SSL",
       "sasl.jaas.config": "org.apache.kafka.common.security.plain.PlainLoginModule required username='\''<API_KEY>'\'' password='\''<API_SECRET>'\'';",
       "sasl.mechanism": "PLAIN",
       "client.dns.lookup": "use_all_dns_ips",
       "session.timeout.ms": "45000",
       "max.poll.records": "2000"
   }
}
'
```

2. Wait a minute (queues are refreshed every 30 seconds, controlled by **conductor.event.processor.queueRefreshPeriod**).

### Verifying Queue Config in Confluent Cloud

On your Confluent UI:

1. Navigate to **Home** > **Environment** > _Choose your cluster_ > **Topics** > _Choose your topic_.
2. Open your topic’s **Messages** tab to view messages.

<p align="center"><img src="/content/img/topics-view.png" alt="Topics in Confluent Cloud" width="100%" height="auto"/></p>

## Creating Workflow in Orkes Conductor 

This step involves creating a workflow with an event task in Orkes Conductor. Here, we are utilizing the Kafka queue as a sink for the event. 

You can quickly build a workflow from UI in Orkes Conductor. 

For this,

1. Navigate to **Definitions > Workflow**, and click the **Define Workflow** button.
2. Create a workflow with an event task with the **Sink type** specified as **_kafka_** and **Name** having the same name as the topic you want to use. 

<p align="center"><img src="/content/img/event-task-confluent.png" alt="Event task in Orkes Conductor" width="100%" height="auto"/></p>

Here’s the JSON for the workflow:

```json
{
 "name": "workflow_name",
 "description": "Sample workflow",
 "version": 1,
 "tasks": [
   {
     "name": "event_task",
     "taskReferenceName": "event_task_ref",
     "type": "EVENT",
     "sink": "kafka:config_name:topic_name",
     "inputParameters": {}
   }
 ],
 "schemaVersion": 2
}
```

### Executing Workflow in Orkes Conductor 

The workflow can be run using different methods. You can use the **Run** button for quick testing, as shown in the image below:

<p align="center"><img src="/content/img/running-workflow-confluent.png" alt="Running workflow from Orkes Conductor UI" width="100%" height="auto"/></p>

Upon successful execution, you can validate the message's delivery by consuming it through the Confluent Cloud portal.