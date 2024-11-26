---
sidebar_position: 6
slug: "/developer-guides/secrets-in-conductor"
description: "Learn how to securely pass sensitive variables using secrets or masked inputs."
---

# Using Secrets

Sensitive information such as usernames, passwords, API keys, and authorization tokens is often required in workflows. To protect this sensitive data, secrets can be used to hide these values on the user interface. Secrets allow you to securely manage and use sensitive information within workflows without exposing it directly.

Watch how we can manage secrets in Orkes Conductor.

<center><iframe width="510" height="300" src="https://www.youtube.com/embed/kw5qUUaxj_w?si=zRjSe0ENlwx7yiy5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>

## Creating Secrets

To create and store secrets in Conductor:

1. Navigate to **Definitions > Secrets** from the left menu on your Orkes Conductor cluster. The Secrets page will display all the secrets associated with your account.
2. Click **+ Add secret** button in the top-right corner.
3. Enter the following values:

<p align="center"><img src="/content/img/creating-secret.png" alt="Creating secret in Orkes Conductor" width="50%" height="auto"></img></p>

 * **Secret name**: A descriptive name for your secret.
 * **Secret value**: The actual value to be stored as a secret.

4. Click **Add** to save the secret.

### Using Secrets in Workflow​

Once a secret is created, you can use it in your workflow by referencing it as a variable **${workflow.secrets.secret_name}**, where **secret_name** is the actual name of the secret. This expression retrieves the secret value dynamically during workflow execution, ensuring it is not exposed directly in the workflow definitions.

Here is an example workflow definition using a secret:

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
          "readTimeOut": 3000,
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

When this workflow runs, **${workflow.secrets.sampletask-api-token}** will be replaced with the actual secret value, provided the necessary permissions are in place.

### Adding Tags to Secrets​

To add tags to a secret:

1. From the **Definitions > Secrets** page, select the secret to add the tag and click on the tag icon.

<p align="center"><img src="/content/img/adding-tags-to-secret.png" alt="Adding tags to secret in Orkes Conductor" width="100%" height="auto"></img></p>

2. Add the tag in the format **key:value** and click **Save**.

<p align="center"><img src="/content/img/tag-format-secret.png" alt="Tag format for secrets" width="60%" height="auto"></img></p>

Tag-based access control allows you to grant permissions to entities based on the tags. For more information on tag-based permissions, refer to the documentation on [using tags for permissions](https://orkes.io/content/access-control-and-security/tags).


### Updating Secrets

Secrets can be updated in the following ways:

#### Using UI

Users with access to the secret can update it directly through the UI. 

1.  Navigate to **Definitions > Secrets**, and click on the secret name to be updated.
2. Enter the new value in the **Secret value** field, and click Edit to confirm.

The secret value gets instantly updated in the UI.

#### Using Update Secret Task

Tokens that expire (such as access tokens) require periodic refreshes, which can be managed using a system task to update the secret. The update secret task is used to update the secret value, provided the user has permission to update the secret. Learn more about the configuration of the [update secret task](https://orkes.io/content/reference-docs/system-tasks/update-secret).

## Masking Secret Values

When using secret values as inputs/outputs in tasks/workflows, you can manage these values securely by using either **_secrets** or **_masked**.

* **Using _secrets:**

All values stored in the output object with key name: **_secrets** will be hidden.

```json
{
 "_secrets" : {
   "my-secret-key" : "my-secret-value"
 }
}
```

The users with the ability to execute the task will be able to read the task and see its inputs and outputs.

Let’s take an example where you want to hide sensitive data when passing information from one task's output to the input of the next task in a workflow. So, you need to ensure that the input parameters of the subsequent task within the workflow definition are structured in the following manner:

```json
{
"_secrets":
  { "parameter":"${previousTask.output._secrets.someOutputParameter}"
 }
}
```

This structure mandates that any input parameter to be hidden must be nested within the **_secrets** object. This approach ensures that sensitive data is masked adequately during the workflow's execution within the designated **_secrets** section of the input parameters.

* **Using _masked:**

Values stored under the **_masked** key will be automatically masked in the UI and will appear as __***__. For example:

```json
{
"_masked":{"some":"data"}
}
```

This will be displayed as:

```json
{
"_masked":"***"
}
```

:::note
While **_masked** hides the data in the UI, the original data remains intact and is saved during archiving. Should you restart the workflow, the original data will still be accessible.

However, if you opt for **_secrets** instead of **_masked**, there's a different behavior during archiving. Once the workflow reaches a terminal state and is removed from the primary execution store, any data labeled as _secrets will be permanently replaced with ***. Subsequently, attempting to retry the workflow might lead to failures in tasks reliant on that particular data.
:::

## Advanced Applications of Secrets

Secrets in Conductor are versatile and can be used beyond just handling sensitive information. Here are some advanced scenarios for leveraging secrets:

* **Environment-Specific Variables**: Secrets can manage environment-specific configurations, such as different variables between development, testing, and production environments. For example, **${workflow.secrets.env-variable-1}** can be used to define values specific to UAT, production, or any other environment.
* **Dynamic Configuration**: Use secrets to manage dynamic configurations that change based on the execution context or environment. This ensures that workflows can adapt to varying conditions without hardcoding sensitive or environment-specific data directly in the workflow definitions.
* **Token Rotation**: Regular rotation of time-sensitive secrets, such as access tokens, is essential for maintaining security. Implement a strategy to rotate these tokens periodically to ensure they remain valid and secure. For detailed guidance on rotating secrets that expire, refer to the guide on [rotating secrets that expire](https://orkes.io/content/templates/examples/rotating-secrets-that-expire).
