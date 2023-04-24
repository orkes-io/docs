# Error Handling

Handling errors is one of the critical aspects of software development, especially while dealing with distributed systems.

Orkes Conductor allows you to create applications that are resilient against failures - 
without having to worry about handling error conditions.  

## Execution Guarantees with Conductor
Conductor is built to offer at-least one delivery guarantee. This means all the messages are persistent, durable and will be delivered to the task workers at least once.
This model ensures two things:
1. If a workflow has started, it will complete as long as all the tasks are completed.
2. If a task worker fails due to restarts, the system going down, etc., the message is redelivered to another node that is alive and responding.

## Handling Timeouts 
A timeout can occur if:
1. There are no workers available for a given task type - this could be due to longer downtime in the system or misconfiguration of the system.
2. The worker receives the message and dies before completing the processing of the task, so the task never goes to the completion state.
3. The worker has completed the processing but could not communicate with the Conductor server due to network failures, the Conductor server being down, etc.

Conductor allows configuring tasks with various timeouts to handle such cases: 

### Poll Timeout Seconds
```json
{
  "taskType": "send_email",
  "pollTimeoutSeconds": 10
}
```
When configured with a value > 0, the system will wait for this number of seconds for the task to be picked up by a task worker. Useful when you want to detect a backlogged task queue with insufficient workers.

### Response Timeout Seconds
```json
{
  "taskType": "send_email",
  "responseTimeoutSeconds": 10
}
```
When configured with a value > 0, the system will wait for this number of seconds from when the task is polled before the worker updates back with a status. The worker can keep the task in the **IN_PROGRESS** state if it requires more time to complete.

### Timeout Seconds
```json
{
  "taskType": "send_email",
  "timeoutSeconds": 30
}
```
When configured with a value > 0, the system will wait for this task to complete successfully until this number of seconds from when the task is first polled. We can use this to fail a workflow when a task breaches the overall SLA for completion.

### Timeout Policies
The policy for timeout dictates how the server should handle the case.  

* **RETRY**: Retries the task again.
* **TIME_OUT_WF**: The task status is marked as TIMED_OUT, and the task is terminated.
* **ALERT_ONLY**: Registers a counter and sends an alert.  No further action is taken.  Use when you have your own metrics monitoring to send alerts. 

```json
{
  "timeoutPolicy": "RETRY"
}
```
 
## Handling Failures
One of the key powers of Conductor is that it allows you to create applications without worrying about failures. However, failures are part of any system. Conductor lets you configure automatic retries when a task fails, allowing you to handle transient errors seamlessly.

### Task Failures
Failure policies are defined with `retry*` parameters:
#### Retry Logic
```json
{
  "retryLogic": "FIXED|EXPONENTIAL_BACKOFF|LINEAR_BACKOFF",
  "retryDelaySeconds": 1,
  "backoffRate": 1
}
```
* **FIXED**: Reschedule the task after *retryDelaySeconds*
* **EXPONENTIAL_BACKOFF**: Reschedule the task after _retryDelaySeconds * (2 ^ attemptNumber)_
* **LINEAR_BACKOFF**: Reschedule after *retryDelaySeconds * backoffRate * attemptNumber*

### Workflow Failures
Workflow can fail if one of the tasks fails even after retry attempts if terminated by a signal or using a terminate API call. Failed workflow transactions can be compensated using compensating workflows.

With Conductor, you can specify a name for a failure workflow within your workflow definition, which will be triggered if the main workflow fails. This failure workflow receives the failed workflow's ID and tasks as input, enabling you to implement compensating logic to handle the failure.