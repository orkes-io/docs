# Retries, Failures and Rate Limits

## Task Rate Limits

Sometimes, a task should not be run at more than a certain rate. A rate limit for the task can be set with the following two parameters:

- `rateLimitFrequencyInSeconds`: Specifies the number of seconds for the rate limit.
- `rateLimitPerFrequency`: Specifies the volume of requests that can be completed over the timeframe.

For example, this will only allow the task to be run 100 times in a minute:

```
"rateLimitFrequencyInSeconds": 60,
"rateLimitPerFrequency": 100
```

## Task Timeout

Tasks can timeout after a set period. This timeframe can be set with the `timeoutSeconds` parameter in the task. If the task should never time out, this can be set to 0.

When a task times out, the `timeoutPolicy` defines what should happen next. The possible parameters are:

- `RETRY`: Run the task again.
- `TIME_OUT_WF`: The workflow is marked as TIMED_OUT and terminated.
- `ALERT_ONLY`: Registers a counter (task_timeout)

## Task Retries

If a task should fail, it can be set to retry using the `retryLogic` parameter. The two options are `FIXED` and `EXPONENTIAL_BACKOFF`.

The retry timing defaults to 60 seconds but can be explicitly set with `retryDelaySeconds`, and the number of retries is default 3, but can be set with `retryCount`.

If the task does not successfully complete after the set number of retries, the task will fail.

## Task Failure

When a task has failed to execute (due to timeout or other failures), the task will change status to FAILED. When a task fails, the entire workflow is set as FAILED.

## Workflow failure

When a workflow fails, there are two ways to handle the exception:

- Create a `failureWorkflow` that runs on workflow failure (see [detailed documentation](/content/docs/how-tos/Workflows/handling-errors#failureworkflow))
- Create a custom implementation of the Workflow Status Listener, and add `setWorkflowStatusListenerEnabled` to your workflow ([more details](https://github.com/Netflix/conductor/issues/1017#issuecomment-468869173)).

## Rate limiting your workflow

In order to not harm your workers or other downstream projects, it may be required to rate limit your workflows.
