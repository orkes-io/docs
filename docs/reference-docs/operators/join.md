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

<table>
<tr>
<td><b> Attribute </b></td> <td><b> Description </b></td>
</tr>
<tr>
<td>joinOn</td>
<td>A list of task reference names that this JOIN task will wait for completion.</td>
</tr>
<tr>
<td>Join Script</td>
<td> This is an optional field. When checked, you must provide a script to control how the join task completes. <p>A sample script looks like this:</p>

```javascript
(function(){
 let results = {};
 let pendingJoinsFound = false;
 if($.joinOn){
   $.joinOn.forEach((element)=>{
     if($[element] && $[element].status !== 'COMPLETED'){
       results[element] = $[element].status;
       pendingJoinsFound = true;
     }
   });
   if(pendingJoinsFound){
     return {
       "status":"IN_PROGRESS",
       "reasonForIncompletion":"Pending",
       "outputData":{
         "scriptResults": results
       }
     };
   }
   // To complete the Join - return true OR an object with status = 'COMPLETED' like above.
   return true;
 }
})();
```

<p>

The script will have access to a variable called **$.joinOn**, which is an array of task references mapped to this join, and the output data of each joined task, such as **$[‘task-reference-name’]**.

</p>
<p>You can define the script so that the task status can be checked, and if any pending joins are found, you can configure it to change the task status to IN_PROGESS until it's completed. If not, you can also proceed with the required task status and complete it as needed. It can also return the join task result as composed by the script. The script can be modified to suit your use case.</p>
</td>
</tr>
</table>

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

<details><summary>Example with Join Script</summary>

Consider a fork-join task having 2 forks, of which both of them are sub-workflows. While defining a task, there is a field called “optional”, which is set to false by default. You must enable this option, which is the precondition for the join script to work well.

<p align="center"><img src="/content/img/join-task-example-using-script.png" alt="Join task example" width="70%"
                       height="auto"/></p>

In this case, both fork tasks should be marked as optional. 

And the join task is joined using the following join script.

```javascript
(function(){
 let results = {};
 let pendingJoinsFound = false;
 if($.joinOn){
   $.joinOn.forEach((element)=>{
     if($[element] && $[element].status !== 'COMPLETED'){
       results[element] = $[element].status;
       pendingJoinsFound = true;
     }
   });
   if(pendingJoinsFound){
     return {
       "status":"IN_PROGRESS",
       "reasonForIncompletion":"Pending",
       "outputData":{
         "scriptResults": results
       }
     };
   }
   // To complete the Join - return true OR an object with status = 'COMPLETED' like above.
   return true;
 }
})();
```
This ensures the join task completes only if all the forks are completed. If any pending joins are found, the script will return the join task status to IN_PROGRESS and will get completed only on completing the fork tasks. 

If we run the workflow, you can see that the join has not been completed and is waiting for the second fork to complete. As per the script, this returns the join task to an in-progress state and remains until the pending joins are completed.

<p align="center"><img src="/content/img/join-task-in-progress-state.png" alt="Join task not completed and returned to in progress state" width="80%"
                       height="auto"/></p>

The join task gets completed after fixing the issue with the second fork task.

<p align="center"><img src="/content/img/join-task-completed-state.png" alt="Join task completed" width="60%"
                       height="auto"/></p>

So this ensures that the workflow gets completed only on completing all the pending joins as per the script.

</details>