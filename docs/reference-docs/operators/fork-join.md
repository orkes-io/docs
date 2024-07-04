---
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fork/Join 

A Fork/Join task is used to run tasks in parallel. It contains two components: the fork and the join operation. The fork operation lets you run lists of tasks, including [Sub Workflow](./sub-workflow) tasks, in parallel. The fork operation is followed by a join operation that waits on the forked tasks to finish before moving to the next task. This [Join](./join) task collects the outputs from each forked tasks.

## Task configuration
Configure these parameters for the Fork/Join task.

**For the Fork task:**

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| forkTasks | An array of task lists. Each list represents a fork branch that will run in parallel, and each list contains a sequence of task definitions. | Required. |

The [Join](./join) task will run after the forked tasks. Configure the Join task as well to complete the fork-join operations.

**For the Join task:**

| Parameter     | Description                                                                                                                                                                                                | Required/ Optional |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| joinOn | A list of task reference names that the Join task will wait for completion before proceeding with the next task. | Required. |
| expression | The join script, which controls how the Join task completes if specified. | Optional. |


## Task definition
This is the JSON schema for a Fork/Join task definition.

```json
// JSON schema for the Fork task

{
  "name": "fork",
  "taskReferenceName": "fork_ref",
  "inputParameters": {},
  "type": "FORK_JOIN",
  "forkTasks": [
    [ // fork branch
      {//taskDefinition},
      {//taskDefinition}
    ],
    [ // another fork branch ]
  ]
}

// JSON schema for the Join task
{
  "name": "join",
  "taskReferenceName": "join_ref",
  "inputParameters": {},
  "type": "JOIN",
  "joinOn": [
    // List of task reference names that the join should wait for
  ]
}
```

## Task output
There is usually no output for the Fork task. Refer to the Join task to find out more about its output.


## Adding a Fork/Join task in UI
**To add a Fork/Join task:**
1. In your workflow, select the **(+)** icon and add a **Fork/Join** task.
2. Select **Add Fork** to add as many forks as required.
3. In each fork branch, select the **(+)** icon to add tasks.
4. Select the Join task and configure its settings to complete the fork/join operations.

<p><img src="/content/img/ui-guide-fork-join.png" alt="Adding Fork Join" /></p>

## Examples
Here are some examples for using the Fork/Join task.

<details><summary>Sending notifications in parallel</summary>
<p>
IIn this example workflow, three notifications are sent: email, SMS, and HTTP. Since none of these tasks depend on each other, they can be run in parallel with a Fork/Join task. The workflow diagram looks like this:
<p align="center"><img src="/content/img/fork-join-example.png" alt="Fork Join Example" width="90%" height="auto"></img></p>

Each fork runs tasks for each notification type (email, SMS, HTTP) in parallel, meaning that they are run independently. Here is the workflow definition:

```json
// workflow definition

[
  {
    "name": "fork_join",
    "taskReferenceName": "my_fork_join_ref",
    "type": "FORK_JOIN",
    "forkTasks": [
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_email",
          "type": "SIMPLE"
        },
        {
          "name": "email_notification",
          "taskReferenceName": "email_notification_ref",
          "type": "SIMPLE"
        }
      ],
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_sms",
          "type": "SIMPLE"
        },
        {
          "name": "sms_notification",
          "taskReferenceName": "sms_notification_ref",
          "type": "SIMPLE"
        }
      ],
      [
        {
          "name": "process_notification_payload",
          "taskReferenceName": "process_notification_payload_http",
          "type": "SIMPLE"
        },
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
Although there are three forks running in parallel, only two forks are required to continue with the workflow. The parameter `joinOn` is defined so that only email and SMS tasks are to be joined, leaving the HTTP task as optional for the completion of the Join task.

This workflow is completed when the email and SMS notifications are sent and does not depend on the HTTP notification status.

This is the output of notification_join. The output is a map, where the keys are the reference names of tasks being joined and the corresponding values are the outputs of those tasks.

```json
// Join task output

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


<FAQStructuredData faqs={faqs} />

import FAQStructuredData from '@site/src/theme/FAQStructuredData';

export const faqs = [
  {
    question: 'How can we handle the failure of a sub-workflow within a fork-join task so that it does not cause the remaining sub-workflows to fail?',
    answer:
      'You can achieve this by marking all the sub-workflows within the fork as “optional: true”. By default, this attribute is set to "false" during workflow creation, and you need to manually modify it for all sub-workflows prior to execution.',
  },
];