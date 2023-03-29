# Error Handling

Error Handling is one of the critical aspects of software development, especially while dealing with distributed systems. Orkes Conductor has native support for error handlings, such as retries, failures, and rate limits.

## Task Rate Limits​

Task rate limits are mechanisms by which the rate of task execution is limited within a workflow. In certain situations, there may be a requirement to limit the task execution to prevent overloading. A rate limit for the task can be set with the following two parameters:

* **rateLimitFrequencyInSeconds**: Sets the frequency window, which specifies the rate limit duration in seconds. 
* **rateLimitPerFrequency**: Specifies the volume of requests that can be completed over the timeframe.

For example, the below configuration will only allow the task to be run 100 times in a minute.

```json
"rateLimitFrequencyInSeconds": 60,
"rateLimitPerFrequency": 100
```

## Task Timeout​

The tasks can be set to timeout after certain seconds. This can be set with the **timeoutSeconds** parameter in the task. For the task to never time out, set this value to 0. 

When the task times out, the **timeoutPolicy** can be used to define what should happen next to the task. The **timeoutPolicy** parameters are:

* **RETRY**: Retries the task again.
* **TIME_OUT_WF**: The task status is marked as TIMED_OUT, and the task is terminated.
* **ALERT_ONLY**: Registers a counter and sends an alert.

## Task Retries​

When a task fails, it can automatically be set to retry using specific parameters. The **retryDelaySeconds** indicates the time in seconds to wait for each retry. The **retryCount** indicates the number of retries to attempt when a task fails. 

The retry mechanism for the failed tasks can be set using the **retryLogic** parameter. It consists of 2 options: 

* **FIXED** - Every retry occurs as per the time set under *retryDelaySeconds*.
* **EXPONENTIAL_BACKOFF** - Every retry occurs as per *retryDelaySeconds*2^(retryCount)*.

The task will fail if the task does not successfully complete after the set number of retries.

## Task Failure​

When a task has failed to execute due to any factors, the status of the task will be changed to **FAILED**. When a task fails, the entire workflow is marked as **FAILED**.

## Workflow Failure​

The workflow can fail due to any reason, and it can be handled in two ways:

* Using **failure workflow** - While creating the workflow definition, you can set the parameter [**failureWorkflow**](https://orkes.cloud/content/reference-docs/api/metadata/workflow-definitions#:~:text=Provide%20the%20workflow%20name%20to%20be%20triggered%20upon%20a%20failure%20of%20the%20execution%20of%20this%20workflow.) that will run the specified workflow on the failure of your current workflow.
* Using **workflow status listener** - Create a custom implementation of the Workflow Status Listener, and add **setWorkflowStatusListenerEnabled** to your workflow. 

## Rate Limiting Workflow​

In order to not harm your workers or other downstream projects, it may be required to rate limit your workflows. In Orkes Conductor, all the APIs are rate limited to specific values. 