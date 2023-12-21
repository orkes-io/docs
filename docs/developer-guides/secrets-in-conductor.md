---
sidebar_position: 6
---
# Using Secrets in Conductor

Often, we have requirements where sensitive values are used in workflows. In such situations, **secrets** can be 
used to hide these sensitive values on the UI. These values include usernames, passwords, API keys, authorization tokens, etc.

## Creating Secrets

Follow the below steps to create and store secrets in Conductor:

1. From your Orkes Conductor Console, navigate to the **Definitions > Secrets** option from the left menu. The *Secrets* page lists all the secrets associated with your account that you have access to.
2. Click **Add Secrets** and provide the following values:<ul><li>**Secret Name** - Reference name for your secret.</li><li>**Secret Value** - Provide the value to be stored.</li></ul>
3. Clicking **Add** saves the secret.

## Using Secrets in Workflow

Once the secret is created, we can use them in the workflow using the variable **${workflow.secrets.secret_name}**.
Refer to this [article](/content/developer-guides/passing-inputs-to-task-in-conductor) on how to pass values to tasks and sub workflows.

## Managing Secrets

We can manage secrets using the following ways. In each of these methods, the previous value is replaced with the new value, and the operation cannot be rolled back.

### Using UI 

Users with access to the secret can update the secret on the UI. Access the left menu "Definitions > Secrets". 

### Using APIs

The following API endpoints can be invoked with credentials that have permission to update the secret value.

#### Using a Worker

A common use case is when a secret managed by Conductor is an access token with an expiry. Tokens that expire require a periodic refresh, and this can be easily achieved using a system worker task that can update the secret. This system worker does the same function as a custom worker updating a secret.

Refer to this link for the documentation on how to use this worker: [Update Secret](/content/reference-docs/system-tasks/update-secret).

Refer to this link for the documentation on how to use a workflow to rotate secrets: [Rotating Secrets that Expire](/content/templates/examples/rotating-secrets-that-expire).

## Adding Tags to Secrets

Conductor also provides the provision to add tags to secret keys. This helps in granting permissions to the secret to an entity with tag-based access.
Read more about using tags for permissions [here](/content/access-control-and-security/tags).

## Masking/Hiding Secret Values

Often, we might want to use a secret value as a workflow input/output or task input/output. 

Suppose you want to use the secret value as an output of a task. This is when we want to pass this value as input to a subsequent task. In such cases, we can use the following convention to ensure that output value is managed as a secret. This can be achieved in 2 ways: either using **_secrets** or using **_masked**.

All values stored in the output object with key name: **_secrets** will be hidden.

```json
{
 "_secrets" : {
   "my-secret-key" : "my-secret-value"
 }
}
```

:::info
The users with the execute ability to the task will be able to read the task and will be able to see the inputs and outputs.
:::

Let’s take an example where you want to hide sensitive data when passing information from one task's output to the input of the next task in a workflow. So, you need to ensure that the input parameters of the subsequent task within the workflow definition are structured in the following manner:

```json
{
"_secrets":
  { "parameter":"${previousTask.output._secrets.someOutputParameter}"
 }
}
```

This structure mandates that any input parameter to be hidden must be nested within the **_secrets** object. This approach ensures that sensitive data is properly masked during the workflow's execution, within the designated **_secrets** section of the input parameters.

:::note
In addition to **_secret** you can also use **_masked** to hide the sensitive values. 

When working within workflow variables, input/output, and task input/output, utilizing a key labeled **_masked** will automatically mask the enclosed data. For instance:

```json
{
"_masked":{"some":"data"}
}
```
It will look like this:

```json
{
"_masked":"***"
}
```

It's essential to note that despite this masking in the UI, the actual data remains intact and is saved during archiving. Should you restart the workflow, the original data will still be accessible.

However, if you opt for **_secrets** instead of **_masked**, there's a different behavior during archiving. Once the workflow reaches a terminal state and is removed from the primary execution store, any data labeled as **_secrets** will be permanently replaced with ***. Subsequently, attempting to retry the workflow might lead to failures in tasks reliant on that particular data.

:::

## Additional Use Cases

In addition to using secrets for sensitive values, we can use them when we need to use a variable specific to an environment. For example -  `${workflow.secrets.env-variable-1}` - here, `env-variable-1` is not necessarily a secret but a value that could be configured differently in each environment, such as UAT vs. Production.

## Example

Here is a simple workflow definition that uses a secret in one of the tasks:

```json
{
  "name": "workflow-with-a-secret",
  "version": 1,
  "tasks": [
    {
      "name": "sample_task_http",
      "taskReferenceName": "sample_task_http",
      "inputParameters": {
        "http_request": {
          "uri": "https://orkes-api-tester.orkesconductor.com/api",
          "method": "GET",
          "connectionTimeOut": 3000,
          "readTimeOut": "3000",
          "accept": "application/json",
          "contentType": "application/json",
          "headers": {
            "Authorization": "Bearer: ${workflow.secrets.sampletask-api-token}"
          }
        }
      },
      "type": "HTTP"
    }
  ],
  "schemaVersion": 2
}
```

When we run this workflow, as long as the permissions exist, the value `${workflow.secrets.sampletask-api-token}` will be replaced with the value stored in the secrets repository.

