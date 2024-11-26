---
slug: "/error-handling"
description: "Conductor is built to handle failure and guarantee execution in the long run. Configure various resilience parameters for your workflows and tasks."
---

# Handling Failures

Orkes Conductor automatically handles transient workflow and task failures without the need to write custom code. Various failure-handling configurations can be set ahead of time, which will take effect during execution.

For tasks, you can configure the following resilience parameters in its task definition:

* Retries
* Timeouts
* Rate limits

For workflows, you can configure the following resilience parameters in its workflow definition:

* Compensation flows (known as failure workflow in Conductor)

:::note
To deal with workflow failures post-execution, refer to [Debugging Workflows](/developer-guides/debugging-workflows).
:::


## Message delivery guarantees

Conductor guarantees at least once message delivery, meaning all messages are persistent and will be delivered to task workers one or more times. In the event of failure, the message will be delivered more than once. This semantic ensures that:
1. If a workflow has started, it will run to completion as long as all its tasks are completed.
2. If a task worker fails due to restarts, crashes, or other issues, the message will be redelivered to another worker node that is alive and responding.


## Task retries

Automatic retries are a key strategy for handling transient task failures. If a task fails to complete, the Conductor server will make the task available for polling again after a given duration.


### Retry configuration

You can configure retry behavior for tasks in its **task definition**. The parameters for defining a task’s retry behavior are:
* Retry count
* Retry logic
* Retry delay seconds
* Backoff scale factor

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ------------------ |
| retryCount        | The maximum number of times that the task will be retried. Default value is 3. | Required. | 
| retryLogic        | The policy that determines when to schedule each retry. Supported values: <ul><li>**`FIXED`**—Reschedules the task after the given duration=`retryDelaySeconds`.</li> <li>**`LINEAR_BACKOFF`**—Reschedules after the given duration=`retryDelaySeconds` * `backoffScaleFactor` * `retryCount`.</li> <li>**`EXPONENTIAL_BACKOFF`**—Reschedules the task after the given duration=`retryDelaySeconds` * (`backoffScaleFactor` ^ `retryCount`).</li></ul>     | Required. | 
| retryDelaySeconds  | The base value duration to wait before the task is made available for polling again. This provides time for the task service to recover from any transient failure before it is retried. Default value is 60. <br/><br/> **Note:** The actual duration depends on the retry policy set in retryLogic.                           | Required. | 
| backoffScaleFactor | The value multiplied with `retryDelay` in order to determine the interval for Linear or Exponential Backoff retry. Default value is 1.  | Required. | 

**Example**

``` json
// task definition
{
  "name": "someTaskDefName",
  ...
  "retryCount": 3,
  "retryLogic": "FIXED|EXPONENTIAL_BACKOFF|LINEAR_BACKOFF",
  "retryDelaySeconds": 1,
  "backoffScaleFactor": 1
}
```

### Example retry behavior

<p align="center"><img src="/content/img/dev-guides/handling_failures-retry_example.jpg" alt="Diagram showing how the Conductor server and worker interact in the event of a retry." width="100%" height="auto"></img></p>


Based on the retry configuration in the above figure, the following sequence of events will occur in the event of a retry:
1. Worker (W1) polls the Conductor server for task T1 and receives the task.
2. After processing the task, the worker determines that the task execution is a failure and reports to the server with a `FAILED` status after 10 seconds.
3. The server will persist this failed execution of T1.
4. A new task T1 execution is created and scheduled for polling. Based on the retry configuration, the task will be available for polling after 5 seconds


## Task timeouts

A task timeout can occur if:
* There are no workers available for a given task type. This could be due to longer-than-expected system downtime or a system misconfiguration.
* The worker receives the message but dies before completely processing the task, so the task never reaches completion.
* The worker has completed the task but could not communicate with the Conductor server due to network failures, the server being down, or other issues.


### Timeout configuration

You can configure timeout behavior for tasks in its **task definition** to handle the various abovementioned cases. The parameters for a task’s timeout behavior are:
* Poll timeout seconds
* Response timeout seconds
* Timeout seconds
* Timeout policy


| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ------------------ |
| pollTimeoutSeconds     | The maximum duration in seconds that a worker has to poll a task before it gets marked as `TIMED_OUT`. When configured with a value > 0, Conductor will wait for the task to be picked up by a worker. <br/> <br/> Useful for detecting a backlogged task queue with insufficient workers. <br/> <br/> Default value is 3600.     | Required. | 
| responseTimeoutSeconds | The maximum duration in seconds that a worker has to respond to the server with a status update before it gets marked as `TIMED_OUT`. When configured with a value > 0, Conductor will wait for the worker to return a status update, starting from when the task was picked up. <br/><br/> If a task requires more time to complete, the worker can respond with the `IN_PROGRESS` status. <br/> <br/> Default value is 600.           | Required. | 
| timeoutSeconds         | The maximum duration in seconds for the task to reach a terminal state before it gets marked as `TIMED_OUT`. When configured with a value > 0, Conductor will wait for the task to complete, starting from when the task was picked up. <br/><br/> Useful for governing the overall SLA for completion. <br/><br/> Default value is 3600. | Required. | 
| timeoutPolicy          | The policy for how the Conductor server should handle the timeout. Supported values: <ul><li><strong>RETRY</strong>—The task is retried again based on the retry configuration.</li> <li><strong>TIME_OUT_WF</strong>—The task is marked as TIMED_OUT and terminated, which also terminates the workflow as TIMED_OUT.</li> <li><strong>ALERT_ONLY</strong>—A counter is registered and an alert is sent. No further action is taken.</li></ul> <br/><br/> **Note:** The ALERT_ONLY option should be used only when you have your own metrics monitoring system to send alerts.                                            | Required. | 


:::note
 To configure tasks that never timeout, set `timeOutSeconds` and `pollTimeoutSeconds` to 0.
:::

**Example**

```json
// task definition
{
  "name": "someTaskDefName",
  ...
  "retryCount": 3,
  "retryLogic": "FIXED|EXPONENTIAL_BACKOFF|LINEAR_BACKOFF",
  "retryDelaySeconds": 1,
  "backoffScaleFactor": 1
}
```

### Example timeout behavior

<details><summary>Poll timeout</summary>
In the figure below, task T1 isn’t polled by the worker within 60 seconds, so Conductor marks it as `TIMED_OUT`.


<p align="center"><img src="/content/img/dev-guides/handling_failures-poll_timeout_example.jpg" alt="Diagram showing how the Conductor server and worker interact in the event of a poll timeout." width="100%" height="auto"></img></p>

</details>

<details><summary>Response timeout</summary>

<p align="center"><img src="/content/img/dev-guides/handling_failures-response_timeout_example.jpg" alt="Diagram showing how the Conductor server and worker interact in the event of a response timeout." width="100%" height="auto"></img></p>


Based on the timeout configuration in the above figure, the following sequence of events will occur in the event of a delayed worker response:
1. At 0 seconds, the worker polls the Conductor server for task T1 and receives it. T1 is marked as IN_PROGRESS by the server.
2. The worker starts processing the task, but the worker instance dies during the execution.
3. At 20 seconds (T1’s  `responseTimeoutSeconds`), the server marks T1 as TIMED_OUT since the worker has not updated the task within the configured duration.
4. A new instance of task T1 is scheduled based on the retry configuration.
5. At 25 seconds, the retried instance of T1 is available for polling after the `retryDelaySeconds` (5) has elapsed.

</details>

<details><summary>Poll timeout</summary>

<p align="center"><img src="/content/img/dev-guides/handling_failures-timeout_example.jpg" alt="Diagram showing how the Conductor server and worker interact in the event of a timeout." width="100%" height="auto"></img></p>

Based on the timeout configuration in the above figure, the following sequence of events will occur when a task cannot be completed within the given duration:
1. At 0 seconds, a worker polls the Conductor server for task T1 and receives the task. T1 is marked as `IN_PROGRESS` by the server.
2. The worker starts processing the task but is unable to complete it within the response timeout. The worker updates the server with T1 set to an IN_PROGRESS status and a callback of 9 seconds.
3. The server puts T1 back in the queue but makes it invisible and the worker continues to poll for the task but does not receive T1 for 9 seconds.
4. After 9 seconds, the worker receives T1 from the server but is still unable to finish processing the task. As such, the worker updates the server again with a callback of 9 seconds.
5. The same cycle repeats for the next few seconds.
6. At 30 seconds (T1 timeout), the server marks T1 as TIMED_OUT because it is not in a terminal state after first being moved to IN_PROGRESS status. The server schedules a new task based on the retry count.
7. At 32 seconds, the worker finishes processing T1 and updates the server with COMPLETED status. The server ignores this update since T1 has already been moved to a terminal status (TIMED_OUT).

</details>


## Task rate limits

Rate limits on tasks are a key strategy for managing task load and worker capacity. When the number of tasks scheduled within a given duration exceeds the defined rate limit, the Conductor server will place the additional tasks in a PENDING status. Once an IN_PROGRESS task is completed, the rate limit is freed up, and the server will make the next PENDING task available for polling.


### Rate limit configuration

You can configure rate limit behavior for tasks in its **task definition**. The parameters for defining a task’s rate limit behavior are:
* Rate limit
* Rate limit frequency
* Concurrent executions

| Parameter | Description | Required/ Optional | 
| --------- | ----------- | ------------------ |
| rateLimitPerFrequency   | The maximum number of task executions that can be scheduled in a given duration. Default value is 0. | Required. | 
| rateLimitFrequencyInSeconds       | The duration, in seconds, specified for the rate limit. Default value is 1. | Required. | 
| concurrentExecLimit | The number of task executions that can be scheduled concurrently. Default value is 0. | Required. | 


:::note
To configure tasks with no rate limits, set `rateLimitPerFrequency` and `concurrentExecLimit` to 0.
:::

**Example**

```json
// task definition
{
  "name": "someTaskDefName",
  "pollTimeoutSeconds": 3600,
  "responseTimeoutSeconds": 600,
  "timeoutSeconds": 3600,
  "timeoutPolicy": "TIME_OUT_WF",
}
```

## Workflow compensation flows

A compensation flow can be configured to take place when a workflow execution fails (FAILED status). Known as a **failure workflow** in Conductor, this failure workflow must be created in Conductor and added to the main workflow definition. 

When triggered, the failure workflow receives the failed workflow details, such as its workflow ID and tasks, as input. This enables you to implement compensating logic to handle the failure.


### Setting a failure workflow

You can set a failure workflow for a workflow in its **workflow definition**. Before setting the failure workflow, ensure that you have created it first.

**To set a failure workflow:**
1. Go to **Definitions** > **Workflow**.
2. Select the workflow that you want to add a failure workflow to.
3. In the **Workflow** tab on the right, scroll down to **Failure workflow name** and select the failure workflow from the dropdown box.
4. Select **Save** > **Confirm save**.

<p align="center"><img src="/content/img/dev-guides/caching_task_outputs-UI_screen.png" alt="Configuring failure workflow in UI." width="100%" height="auto"></img></p>

**Example**

```json
// workflow definition
{
  ...
  "failureWorkflow": "<name of the workflow that will run upon failure>"
}
```
