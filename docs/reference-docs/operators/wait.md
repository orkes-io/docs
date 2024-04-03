---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait

The wait task is used when the workflow needs to be paused for an external signal to continue. It is used when the workflow needs to wait and pause for external signals, such as a human intervention (like manual approval).

## Definitions

```json
   {
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "type": "WAIT",
     "inputParameters": {
       "until": "2024-04-30 15:20 GMT+04:00",
       "key": "${workflow.input.value}"
     }
   }
```

### Input Parameters

|Parameter | Description |
| -------- | ----------- | 
| Wait type | Indicates the type of wait period. Supported types include **_until_**, **_duration_**, and **_signal_**.<ul><li>**Until** - Used to wait until a specified date & time, including the timezone. The date/time can be supplied in the format: **YYYY-MM-DD hh:mm a/pm**. For example, 2024-04-30 15:20 GMT+04:00.<ul><li>On choosing the date & time, it displays the computed value. This value can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul></li><li>**Duration** - Specifies the wait duration in the format **x hours x days x minutes x seconds**. The accepted units in this field are _days_, _d_, _hrs_, _hours_, _h_, _minutes_, _mins_, _m_, _seconds_, _secs_, and _s_.</li><ul><li>**_Variable_** - The duration can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor).</li></ul><li>**Signal** - Configure this option if the workflow needs to wait for an external signal, such as a manual approval.</li></ul> |
| inputParameters | Configure the input parameters required for the task. It can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor). |

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Wait**.
2. Select the wait type and provide its configuration.

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
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "type": "WAIT",
     "inputParameters": {
       "until": "2024-04-30 15:20 GMT+04:00",
       "key": "${workflow.input.value}"
     }
   }
```

</TabItem>
</Tabs>


<details><summary>Simple Workflow</summary>
<p>
The following task waits until Dec 25, 2026, 9 am GST. Yes, that's right, 2026!
</p>

```json
{
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "type": "WAIT",
     "inputParameters": {
       "until": "2026-12-25 09:00 GMT+04:00"
     }
   }
```

</details>