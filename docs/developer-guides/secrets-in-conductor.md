---
sidebar_position: 6
---
# Using Secrets in Conductor

Often times we have requirements where sensitive values are used in workflows. In such situations **secrets** can be 
used to hide these sensitive values on the UI. Examples of these values are usernames, passwords, API keys, authorization tokens, etc.

## Creating Secrets

Follow the below steps to create and store secrets in Conductor:

1. From your Orkes Conductor Console, navigate to the **Secrets** option from the left menu. The *Secrets* page lists all the secrets associated with your account that you have access to
2. Click **Add Secrets** and provide the following values:<ul><li>**Secret Name** - Reference name for your secret.</li><li>**Secret Value**</li></ul>
3. Clicking **Add** saves the secret

## Using Secrets in Workflow

Once the secret is created, we can use them in the workflow using the variable **${workflow.secrets.secret_name}**.
Refer to this [article](/content/developer-guides/passing-data-in-conductor) on how to pass values to tasks and sub workflows

## Managing Secrets

We can manage secrets on the UI as we as using the APIs.  

## Adding Tags to Secrets

Conductor also provides the provision to add tags to secret keys. This helps in granting permissions to the secret to an entity with tag based access.
Read more about using tags for permissions [here](/content/access-control-and-security/tags)

## Additional Use Cases

In addition to using secrets for sensitive values, we can also use it when we need to use a variable that is specific to an environment.
For example - `${workflow.secrets.env-variable-1}` - here `env-variable-1` is not necessarily a secret but a value that could be configured 
differently in each environment such as UAT vs Production.

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

When we run this workflow, as long as the permissions exist, the value 

`${workflow.secrets.sampletask-api-token}`

will be replaced with the value stored in the secrets repository.

