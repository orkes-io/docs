# Workflow Retries, Failures and Rate Limits


## Setting workflow retries

TODO

## Workflow failure

When a workflow fails, there are two ways to handle the exception:

* Create a `failureWorkflow` that runs on workflow failure (see [detailed documentation](/content/docs/how-tos/Workflows/handling-errors#failureworkflow))
* Create a custom implementation of the Workflow Status Listener, and add `setWorkflowStatusListenerEnabled` to your workflow ([more details](https://github.com/Netflix/conductor/issues/1017#issuecomment-468869173)).

## Rate limiting your workflow

In order to not harm your workers or other downstream projects, it may be required to rate limit your workflows.  This can be done by 

TODO