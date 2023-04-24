# Error Handling

Handling errors is one of the critical aspect of software development, especially while dealing with the distributed systems.

Orkes Conductor allows you to create applications that are resilient against failures - 
without having to worry about handling error conditions.  

## Execution Guarantees with Conductor
Conductor is built to offer at-least once delivery guarantees.  
This means all the messages are persistent, durable and will be delivered to the task workers at-least once.
This model ensures two things:
1. If a workflow has started, it will complete as long as all the tasks complete.
2. If a task worker fails due to restarts, system going down etc, the message is redlivered to another node which is alive and responding.

## Handling Timeouts 
A timeout can occur if:
1. There are no workers available for a given task type - this could be due to longer downtime in the system or misconfiguration of the system.
2. The worker receives the message and dies before completing processing of the task, so the task never goes to completion state.
3. The worker has completed the processing but was not able to communicate to Conductor server due to network failures or Conductor server being down etc.

Conductor allows configuring tasks with various timeouts to handle such cases: 

#### Poll Timeout Seconds
```json
{
  "taskType": "send_email",
  "pollTimeoutSeconds": 10
}
```
When configured with a value > 0, the system will wait for this number of seconds for the task to be picked up by a task worker. Useful when you want to detect a backlogged task queue with not enough workers.

#### Response Timeout Seconds
```json
{
  "taskType": "send_email",
  "responseTimeoutSeconds": 10
}
```
When configured with a value > 0, the system will wait for this number of seconds from when the task is polled before the worker updates back with a status. The worker can keep the task in IN_PROGRESS state if it requires more time to complete.

#### Timeout Seconds
```json
{
  "taskType": "send_email",
  "timeoutSeconds": 30
}
```
When configured with a value > 0, the system will wait for this task to complete successfully up until this number of seconds from when the task is first polled. We can use this to fail a workflow when a task breaches the overall SLA for completion.

#### Timeout Policies
The policy for timeout dictates how server should handle the case.  

* **RETRY**: Retries the task again.
* **TIME_OUT_WF**: The task status is marked as TIMED_OUT, and the task is terminated.
* **ALERT_ONLY**: Registers a counter and sends an alert.  No further action is taken.  Use when you have your own metrics monitoring to send alerts. 

```json
{
  "timeoutPolicy": "RETRY"
}
```
 
## Handling Failures
One of the key powers of Conductor is that it allows you to create applications without needing to worry about failures. 
However, failures are part of any systems.  Conductor lets you configure automatic retries when a task fails allowing you to seamlessly handle transient errors.

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
* **FIXED**: Reschedule the task after retryDelaySeconds
* **EXPONENTIAL_BACKOFF**: Reschedule the task after retryDelaySeconds * (2 ^ attemptNumber)
* **LINEAR_BACKOFF**: Reschedule after retryDelaySeconds * backoffRate * attemptNumber

### Workflow Failures
Workflow can fail if one of the task fails even after retry attempts or if terminated by a signal or /terminate API call.
Failed workflow transactions can be compensated using a compensating workflows.

Conductor allows you to define a failure workflow name as part of a workflow that is started if the workflow fails.
The failure workflow gets the failed workflow id and tasks as part of the input allowing you to handle any compensating logic.