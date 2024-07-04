---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Wait

The Wait task is used when the workflow needs to be paused before continuing. It is a no-op task used when the workflow needs to wait:
- Until a certain timestamp;
- For a certain duration; or
- For an external trigger.

The Wait task will remain in-progress until a certain point. There are three wait types for the Wait task:
- **Until**—Used to wait until a specified date and time, including the timezone.
- **Duration**—Used to wait until a specified duration in the format: x hours x days x minutes x seconds.
- **Signal**—Used to wait for an external signal.

External signals can come from an event handler, direct API call, or a webhook. For example, the [task update API](https://orkes.io/content/reference-docs/api/task/update-task-status-in-workflow) can be invoked explicitly to mark the Wait task as COMPLETED.

## Task configuration

Configure these parameters for the Wait task.

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| inputParameters | The input parameters for the Wait task, which can be [passed as a variable](https://orkes.io/content/developer-guides/passing-inputs-to-task-in-conductor) or a fixed value. These parameters include those required for the Wait task to complete, which depend on the wait type:<ul><li>`until` for the until wait type</li><li>`duration` for the duration wait type</li></ul> | Required. |
| inputParameters. **until**    | The datetime and timezone in one of the following formats:<ul><li>yyyy-MM-dd HH:mm z</li><li>yyyy-MM-dd HH:mm</li><li>yyyy-MM-dd</li></ul>For example, 2024-04-30 15:20 GMT+04:00. | Required for until wait type. |
| inputParameters. **duration** | The wait duration in the format `x days y hours z minutes aa seconds`. The accepted units in this field are:<ul><li>**days**, or **d** for days</li><li>**hours**, **hrs**, or **h** for hours</li><li>**minutes**, **mins**, or **m** for minutes</li><li>**seconds**, **secs**, or **s** for seconds</li></ul>  | Required for duration wait type. |


## Task definition
This is the JSON schema for a Switch task definition.

<Tabs>
<TabItem value="until" label="until">

```json
{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "until": "2024-04-30 15:20 GMT+04:00"
  }
}
```

</TabItem>

<TabItem value="duration" label="duration">

```json
{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "duration": "10 mins"
  }
}
```

</TabItem>

<TabItem value="signal" label="signal">

```json
{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
  }
}
```

</TabItem>
</Tabs>

## Adding a Wait task in UI
**To add a Wait task:**
1. In your workflow, select the **(+)** icon and add a **Wait** task.
2. Select the **Wait type** and configure it.

<p><img src="/content/img/ui-guide-wait-task.png" alt="Adding wait task" /></p>


## Examples
Here are some examples for using the Wait task.

<details><summary>Until wait type</summary>

<p>
The following task is configured to wait until Dec 25, 2026, 9AM.
</p>

```json
// Wait task definition

{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "until": "2026-12-25 09:00 GMT+04:00"
  }
}
```

To pass the Wait task parameter as a variable, you can define a workflow input parameter and use it in the Wait task.

```json
// workflow definition

"inputParameters": [
  "waitUntil"
],
 ```

The Wait task can reference the workflow input parameter using `${workflow.input.variableName}`, replacing `variableName` with the actual variable name.

```json
// Wait task definition

{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "until": "${workflow.input.waitUntil}"
  }
}
```

Now, the wait timestamp can be defined at runtime. When running the workflow, you can pass the a specific value as the input:

```json
// workflow inputs

{
  "waitUntil": "2024-04-23 15:46 GMT+04:00"
}
```

Based on the input, the workflow waits until 03:46 PM on 23 April 2024.
</details>

<details><summary>Duration wait type</summary>

The following task is configured to wait for 28 days.

```json
// Wait task definition

{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "duration": "28 days"
  }
}
```

<p align="center"><img src="/content/img/wait-for-28-days.png" alt="Wait for 28 days" width="70%" height="auto"></img></p>

To pass the Wait task parameter as a variable, you can define a workflow input parameter and use it in the Wait task.
``` json
// workflow definition

"inputParameters": [
  "waitDuration"
],
```

The Wait task can reference the workflow input parameter using `${workflow.input.variableName}`, replacing `variableName` with the actual variable name.

```json
// Wait task definition

{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {
    "until": "${workflow.input.waitDuration}"
  }
}
```

Now, the wait duration can be defined at runtime. When running the workflow, you can pass the a specific value as the input:

```json
// workflow inputs

{
  "waitDuration": "1 mins 02 seconds"
}
```

Based on the input, the workflow waits for 1 minute 2 seconds.

</details>

<details><summary>Signal wait type</summary>

You can configure the wait type to be signal, which can come from an event handler, direct API call, or webhook.

Here’s a snippet of a Wait task awaiting an external signal from an API call:

```json
{
  "name": "wait",
  "taskReferenceName": "wait_ref",
  "type": "WAIT",
  "inputParameters": {}
}
```

Once the workflow is run, the Wait task will be in an “In Progress” state. Once the external signal is ready, you can manually mark the task as completed either [using API](https://orkes.io/content/reference-docs/api/task/update-task-status-in-workflow) or from UI, as shown below:

<p align="center"><img src="/content/img/wait-for-signal.png" alt="Wait type configured as signal" width="70%" height="auto"></img></p>

</details>