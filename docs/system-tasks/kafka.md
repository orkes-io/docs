import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kafka Publish
```json
"type" : "KAFKA_PUBLISH"
```

A Kafka Publish task is used to push messages to another microservice via Kafka.

## Configurations
```json
{
  "name": "call_kafka",
  "taskReferenceName": "call_kafka",
  "inputParameters": {
    "kafka_request": {
      "topic": "userTopic",
      "value": "Message to publish",
      "bootStrapServers": "localhost:9092",
      "headers": {
    "x-Auth":"Auth-key"    
      },
      "key": "123",
      "keySerializer": "org.apache.kafka.common.serialization.IntegerSerializer"
    }
  },
  "type": "KAFKA_PUBLISH"
}
```
### Input Parameters

| Attribute | Description |
| -- | -- |
| topic | The topic to publish. |
| value | The value to be published to Kafka. | 
| bootStrapServers | bootStrapServers for connecting to given Kafka. |
| headers | A map of additional Kafka headers to be sent along with the request. |
| key | Key to be published. |
| keySerializer | Serializer used for serializing the key published to Kafka. One of the following can be set: <ul><li> **org.apache.kafka.common.serialization.IntegerSerializer**</li><li> **org.apache.kafka.common.serialization.LongSerializer**</li><li> **org.apache.kafka.common.serialization.StringSerializer**</li></ul> Default is the String serializer. |
| requestTimeoutMs | Request timeout while publishing to Kafka. If this value is not given, the value is read from the property kafka.publish.request.timeout.ms. If the property is not, set the value defaults to 100 ms. |
| maxBlockMs | maxBlockMs while publishing to Kafka. If this value is not given, the value is read from the property kafka.publish.max.block.ms. If the property is not set, the value defaults to 500 ms. |

The producer created in the Kafka task is cached. By default, the cache size is 10, and the expiry time is 120000 ms. To change the defaults following can be modified **kafka.publish.producer.cache.size**, **kafka.publish.producer.cache.time.ms** respectively.

## Examples
<Tabs>
 <TabItem value="JSON" lable="JSON">

 ```json
{
  "name": "call_kafka",
  "taskReferenceName": "call_kafka",
  "inputParameters": {
    "kafka_request": {
      "topic": "userTopic",
      "value": "Message to publish",
      "bootStrapServers": "localhost:9092",
      "headers": {
    "x-Auth":"Auth-key"    
      },
      "key": "123",
      "keySerializer": "org.apache.kafka.common.serialization.IntegerSerializer"
    }
  },
  "type": "KAFKA_PUBLISH"
}
```

</TabItem>
<TabItem value="Java" label="Java">
This is a banana 🍌
</TabItem>
<TabItem value="Golang" label="Golang">
    This is a banana 🍌
</TabItem>
<TabItem value="Python" label="Python">
  This is a banana 🍌
</TabItem>
<TabItem value="CSharp" label="CSharp">
  This is a banana 🍌
</TabItem>
<TabItem value="javascript" label="Javascript">
    This is a banana 🍌
</TabItem>
<TabItem value="clojure" label="Clojure">
    This is a banana 🍌
</TabItem>
</Tabs>

<details><summary>Add Examples</summary>
<p>
</p>
</details>