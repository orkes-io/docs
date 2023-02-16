import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait

```json
"type" : "WAIT"
```

The Wait task is used when the workflow needs to be paused for an external signal to continue.
<br/>

# Configurations

WAIT is used when the workflow needs to wait and pause for external signals, such as a human intervention (like manual approval) or an event coming from an external source, such as Kafka or SQS.

## Input Parameters

| Attributes | Description | 
| -- | -- |
| Wait type | Indicates the type of wait period. Supported types include **duration**, **until**, and **signal**. <ul><li><b>duration</b> - Specifies the wait duration in the format `“x hours x days x minutes x seconds”`. The accepted units in this field are *days*, *d*, *hrs*, *hours*, *h*, *minutes*, *mins*, *m*, *seconds*, *secs*, and *s*.</li><li><b>until</b> - Used to wait until a specified date & time, including the timezone. The date/time can be supplied in the format: `yyyy-mm-dd HH:mm`. For example, `2023-02-17 03:15 GMT+04:00`.</li><li><b>signal</b> - Can be configured if the workflow needs to wait for an external signal, such as a manual approval or an event from an external source, such as SQS or Kafka.</li></ul> | 

## Examples
 <Tabs>
 <TabItem value="JSON" lable="JSON">

 ```json
{
 "taskType": "WAIT",
 "inputParameters": {
   "duration": "2 days 3 hours" 
 }
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

<details><summary>Simple Example</summary>
<p>
The following wait task remains blocked until Dec 25, 2023, 9 am PST.

```json
{
 "name":"wait_until_date",
 "taskReferenceName":"wait_until_date_ref",
 "taskType": "WAIT",
 "inputParameters": {
   "until": "2023-12-25 09:00 PST"
 }
}
```
</p>
</details>

<details><summary>Add More</summary>
<p>
</p>
</details>