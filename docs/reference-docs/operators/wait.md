---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait

The Wait task is used when the workflow needs to be paused for an external signal to continue. It is used when the workflow needs to wait and pause for external signals, such as a human intervention (like manual approval) or an event coming from an external source, such as Kafka or SQS.

## Definitions

```json
{
  "name": "wait_task",
  "taskReferenceName": "wait_task_ref",
  "type": "WAIT",
  "inputParameters": {
    "duration": "x days"
  }
}
```

### Input Parameters

| Attributes | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wait type  | Indicates the type of wait period. Supported types include **duration**, **until**, and **signal**. <ul><li><b>duration</b> - Specifies the wait duration in the format **x hours x days x minutes x seconds**. The accepted units in this field are *days*, *d*, *hrs*, *hours*, *h*, *minutes*, *mins*, *m*, *seconds*, *secs*, and *s*.</li><li><b>until</b> - Used to wait until a specified date & time, including the timezone. The date/time can be supplied in the format: **yyyy-mm-dd HH:mm**. For example, **2023-02-17 03:15 GMT+04:00**.</li><li><b>signal</b> - Can be configured if the workflow needs to wait for an external signal, such as a manual approval or an event from an external source, such as SQS or Kafka.</li></ul> |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Wait`
2. Select the type of wait and its configuration

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-wait-task.png" alt="Adding wait task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "wait_task_example",
      "taskReferenceName": "wait_task_example_ref",
      "inputParameters": {
        "duration": "300 seconds"
      },
      "type": "WAIT"
    }
```

</TabItem>
</Tabs>


<details><summary>Simple Example</summary>
<p>
The following wait task waits until Dec 25, {new Date().getFullYear() + 2} 9 am PST. Yes that's right <b>{new Date().getFullYear() + 2}</b>!
</p>

<pre><code className="language-json">{`{
  "name":"wait_until_date",
  "taskReferenceName":"wait_until_date_ref",
  "taskType": "WAIT",
  "inputParameters": {
    "until": "${new Date().getFullYear() + 2}-12-25 09:00 PST"
  }
}
`}
</code></pre>

</details>