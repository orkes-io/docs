---
sidebar_position: 3
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

|Attribute | Description |
| -------- | ----------- | 
| Wait type | Indicates the type of wait period. Supported types include **_until_**, **_duration_**, and **_signal_**.<ul><li>**Until** - Used to wait until a specified date & time, including the timezone. The date/time can be supplied in the format: **YYYY-MM-DD hh:mm a/pm**. For example, 2024-04-30 15:20 GMT+04:00.<ul><li>On choosing the date & time, it displays the computed value. This value can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor#expression). See the section below for a [complete example](#sample-workflows).</li></ul></li><li>**Duration** - Specifies the wait duration in the format **x days x hours x minutes x seconds**. The accepted units in this field are _days_, _d_, _hrs_, _hours_, _h_, _minutes_, _mins_, _m_, _seconds_, _secs_, and _s_.</li>**Note**: You can use the duration format to configure the wait period according to your requirements. For example, if you need to wait for 10 mins, you can use this format in your JSON `"inputParameters": {"duration": "10 minutes" }`. Or, you can provide 10 in the minute's field from the UI as shown below:<p align="center"><img src="/content/img/wait-for-10-mins.png" alt="Wait for 10 mins example" width="70%" height="auto"></img></p><ul><li>**_Variable_** - The duration can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor#expression). See the section below for a [complete example](#sample-workflows).</li></ul><li>**Signal** - Configure this option if the workflow needs to wait for an external signal, such as a manual approval.</li></ul> |
| inputParameters | Configure the input parameters required for the task. It can also be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor#expression). See the section below for a [complete example](#sample-workflows). |

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
 <TabItem value="JSON" label="JSON">

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

## Sample Workflows

<details><summary>Case 1 - Using 'Wait type' as 'Until'</summary>

<p>
The following task waits until Dec 25, 2026, 9 AM GST. Yes, that's right, 2026!
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

Now, if you want to pass the wait parameter as a variable, let’s consider that you are passing the variable parameter as a workflow input.

Let’s define the workflow input parameter as “waitUntil”.

```json
 "inputParameters": [
   "waitUntil"
 ],
 ```

 Now, let’s configure the wait type referring to this variable as below:

```json
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "inputParameters": {
       "until": "${workflow.input.waitUntil}"
     },
     "type": "WAIT",
```

Let’s run the workflow using the following input:

```json
{
 "waitUntil": "2024-04-23 15:46 GMT+04:00"
}
```

The workflow waits until 03:46 PM GST (GMT+04:00) on 23rd Apr 2024.

Depending on the use case, the variables can be updated, and the workflow takes the wait parameter from these variables.

</details>

<details><summary>Case 2 - Using 'Wait type' as 'Duration'</summary>

Suppose you have a subscription workflow running that needs the wait period to be 28 days.

Here’s the snippet of the workflow JSON where the wait task is configured to wait for 28 days:

```json
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "inputParameters": {
       "duration": "28 days"
     },
     "type": "WAIT",
```

Or you can also provide 28 under the **_Days_** field from the UI, omitting the rest of the fields like this;

<p align="center"><img src="/content/img/wait-for-28-days.png" alt="Wait for 28 days" width="70%" height="auto"></img></p>

Now, if you want to pass this parameter on as a variable, and the variable is passed as a workflow input called **_waitDuration_**. 

In this case, the workflow JSON is as shown below:

```json
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "inputParameters": {
       "duration": "${workflow.input.waitDuration}"
     },
     "type": "WAIT",
```

Now, let’s run the workflow using the following input:

```json
{
 "waitDuration": "1 mins 02 seconds"
}
```

So, here, the workflow waits for 1 minute & 2 seconds at the configured wait task. 

The accepted units in this field are:

- Days - days, d
- Hours - hours, hrs, h
- Minutes - minutes, mins, m
- Seconds - seconds, secs, s

</details>

<details><summary>Case 3 - Using 'Wait type' as 'Signal'</summary>

Suppose you want the workflow to wait for an external signal to continue.

In that case, you can configure the wait type to be signal, and here’s a snippet of the workflow waiting for an external signal:

```json
   {
     "name": "wait",
     "taskReferenceName": "wait_ref",
     "inputParameters": {},
     "type": "WAIT",
}
```

Once the workflow is run, it will be in a running state, and the wait task will be in an “In Progress” state.

Once the external signal is ready, you can manually mark the task as completed either [using API](https://orkes.io/content/reference-docs/api/task/update-task-status-in-workflow) or from UI, as shown below:

<p align="center"><img src="/content/img/wait-for-signal.png" alt="Wait type configured as signal" width="70%" height="auto"></img></p>

</details>