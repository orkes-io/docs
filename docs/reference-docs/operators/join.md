---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Join 

A JOIN task is used in conjunction with a **FORK_JOIN** or **FORK_JOIN_DYNAMIC** task to join all the tasks within the forks. 

## Definitions

```json
{
  "name": "join_task",
  "taskReferenceName": "join_task_ref",
  "type": "JOIN",
  "joinOn": [
    // List of task reference names that this join should be waiting for
  ]
}
```

:::note
In the **FORK_JOIN** task, the JOIN task waits for a list of zero or more of the forked tasks to be completed. However, when used with a **FORK_JOIN_DYNAMIC** task, it implicitly waits for all the dynamically forked tasks to complete.
:::

### Input Parameters

| Attribute | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| joinOn    | A list of task reference names that this JOIN task will wait for completion. |

### Output Parameters

The output is a map, where the keys are the names of task references being joined.

## Examples


<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type `Fork Join`.
2. Add the forks.
3. Select the paired Join task and select joinOn params.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/ui-guide-join-task.png" alt="Adding Join task" width="500" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON Example">

```json
    {
      "name": "join_on_forked_tasks",
      "taskReferenceName": "join_on_forked_tasks",
      "type": "JOIN",
      "joinOn": [
        "http_task_3",
        "http_task_2",
        "http_task_1"
      ]
    }
```

</TabItem>
</Tabs>


<details><summary>Simple Example</summary>
<p>

Here is an example of a JOIN task. This task will wait for the completion of tasks **my_task_ref_1** and **my_task_ref_2** as specified by the joinOn attribute.

```json
    {
      "name": "join_task",
      "taskReferenceName": "my_join_task_ref",
      "type": "JOIN",
      "joinOn": [
        "my_task_ref_1",
        "my_task_ref_2"
      ]
    }
```
</p>
</details>

<details><summary>Example with Fork/Join Task ignoring one fork</summary>
<p>

Here is an example of a JOIN task used in conjunction with a FORK_JOIN task. The 'FORK_JOIN' spawns three tasks. An **email_notification** task, a **sms_notification** task, and a **http_notification** task. Email and SMS are usually the best-effort delivery systems. However, in the case of an HTTP-based notification, you get a return code, and you can retry until it succeeds or eventually give up. When you set up a notification workflow, you may decide to continue if you kicked off an email and sms notification. In that case, you can decide to joinOn those specific tasks only. However, the **http_notification** task will still continue to execute, but it will not block the rest of the workflow from proceeding.

```json
    [
      {
        "name": "fork_join",
        "taskReferenceName": "my_fork_join_ref",
        "type": "FORK_JOIN",
        "forkTasks": [
          [
            {
              "name": "email_notification",
              "taskReferenceName": "email_notification_ref",
              "type": "SIMPLE"
            }
          ],
          [
            {
              "name": "sms_notification",
              "taskReferenceName": "sms_notification_ref",
              "type": "SIMPLE"
            }
          ],
          [
            {
              "name": "http_notification",
              "taskReferenceName": "http_notification_ref",
              "type": "SIMPLE"
            }
          ]
        ]
      },
      {
        "name": "notification_join",
        "taskReferenceName": "notification_join_ref",
        "type": "JOIN",
        "joinOn": [
          "email_notification_ref",
          "sms_notification_ref"
        ]
      }
    ]
```

Here is what the output of **notification_join** will look like. The output is a map, where the keys are the names of task references being joined. The corresponding values are the outputs of those tasks.

```json
    {
      "email_notification_ref": {
        "email_sent_at": "2021-11-06T07:37:17+0000",
        "email_sent_to": "test@example.com"
      },
      "sms_notification_ref": {
        "sms_sent_at": "2021-11-06T07:37:17+0129",
        "sms_sent_to": "+1-xxx-xxx-xxxx"
      }
    }
```
</p>
</details>