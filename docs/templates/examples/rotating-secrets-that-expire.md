import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';
import CodeBlock from '@theme/CodeBlock';

# Rotating Secrets Used in Workflows

A common use case is when a secret managed by Conductor is an access token with an expiry. Such tokens are used in cases where we need to supply an authorization header for a REST endpoint or as an API Key for an external service, etc.

Tokens that expire require a periodic refresh, and this can be easily achieved using a system worker task that can update the secret. This system worker does the same function as a custom worker updating a secret.

Refer to this link for the documentation on how to use this worker: [Update Secret](/content/reference-docs/system-tasks/update-secret).

## Workflow Definition to Rotate Secrets

In the following definition, we are using a worker to update the secret after retrieving a new secret using the HTTP endpoint:

```json lines
{
  "name": "update_rotate_secrets_tracker_app",
  "description": "Workflow to retrieve and update secrets",
  "version": 1,
  "tasks": [
    {
      "name": "retrieve_token",
      "taskReferenceName": "retrieve_token",
      "inputParameters": {
        "uri": "https://conductor-server.orkesconductor.io/api/token",
        "method": "POST",
        "accept": "application/json",
        "contentType": "application/json",
        "body": {
          "keyId": "${workflow.secrets.appKeyId}",
          "keySecret": "${workflow.secrets.appKeySecret}"
        },
        "outputFilter": {
          "_secrets": {
            "token": "$${retrieve_token.output.response.body.token}"
          }
        }
      },
      "type": "HTTP"
    },
    {
      "name": "update_secret_task",
      "taskReferenceName": "update_secret_task_ref",
      "inputParameters": {
        "_secrets": {
          "secretKey": "my_secret_holding_a_token",
          "secretValue": "${retrieve_token.output._secrets.token}"
        }
      },
      "type": "UPDATE_SECRET"
    }
  ],
  "schemaVersion": 2
}
```

In the example above, we use an HTTP worker to fetch a new token and update a secret that holds this token. This is a common use case where you need to use a permanent credential to retrieve a temporary token that needs to be periodically refreshed. Use this workflow to configure token refresh in Conductor ecosystem.


Take note of how we use `_secrets` to mask the output of a specific value from the HTTP response. This also uses the feature called `_outputFilters`, which uses a JSON path expression to extract a specific value from the response body.

:::note
Using a combination of

1. `_secrets` to mask outputs.
2. `_outputFilters` to extract a specific json expression.
3. `UPDATE_SECRET` worker to update secrets.
4. A scheduler config to run this periodically (configure this to run at an interval that would be safe to refresh the
   token).

we are able to manage and refresh a token as a secret, which can be used in any workflow.
:::