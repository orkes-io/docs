import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Join Task

```json
"type" : "JOIN"
```

A JOIN task is used in conjunction with a **FORK_JOIN** or **FORK_JOIN_DYNAMIC** task to join all the tasks within the forks. 

## Configurations

```json
{
      "name": "join_task",
      "taskReferenceName": "join_task_ref",
      "type": "JOIN",
      "joinOn": [//task_reference_names]
    }
```
* In the **FORK_JOIN** task, the JOIN task waits for a list of zero or more of the forked tasks to be completed. However, when used with a **FORK_JOIN_DYNAMIC** task, it implicitly waits for all the dynamically forked tasks to complete.

### Input Parameters

| Attribute | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| joinOn    | A list of task reference names that this JOIN task will wait for completion. |

### Output Parameters

The output is a map, where the keys are the names of task references being joined.

## Examples

<Tabs>
<TabItem value="JSON" label="JSON">

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

</TabItem>
<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go

```

</TabItem>
<TabItem value="Python" label="Python">

```python

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```

</TabItem>

<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>

<details><summary>Simple Example​</summary>
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

<details><summary>Example with Fork/Join Task ignoring one fork​</summary>
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