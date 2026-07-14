---
title: "Using Secrets"
description: "Learn how to store and reference sensitive values using secrets so credentials and tokens can be used securely in workflows in Orkes Conductor."
canonical_route: "developer-guides/secrets-in-conductor"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, role based access control, workflow security, access control"
---

# Using Secrets

Secrets in Conductor allow you to store and use sensitive data, such as API keys, passwords, authorization tokens, and environment-specific variables, without exposing it directly in workflow definitions. After storing a value as a secret in Conductor, you can reference it by its secret name in your workflows.

If a user does not have access to a referenced secret, the workflow will fail.

## Configuring secrets

Secrets can be created through the Conductor UI or API. For automation and environment promotion, prefer the API so secret setup can be handled by deployment tooling.

=== "Using API"

    Create or update a secret:

    ```shell
    curl -sS -X PUT "$CONDUCTOR_SERVER_URL/secrets/payment_api_token" \
      -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
      -H "Content-Type: application/json" \
      -d '"secret-value"'
    ```

    List secret names:

    ```shell
    curl -sS -X POST "$CONDUCTOR_SERVER_URL/secrets" \
      -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN"
    ```

    Related APIs:

    - [Create or update secret](/content/reference-docs/api/secrets/create-secret)
    - [List all secrets](/content/reference-docs/api/secrets/list-all-secrets)
    - [Check secret exists](/content/reference-docs/api/secrets/check-secret-exists)
    - [Delete secret](/content/reference-docs/api/secrets/delete-secret)

=== "Using Conductor UI"

    **To create a secret:**

    1. Go to **Definitions** > **Secrets** from the left navigation menu on your Conductor cluster.
    2. Select **+ Add secret**.
    3. Enter the following parameters:

    | Parameter    | Description                                                                                         | Required/ Optional |
    | ------------ | --------------------------------------------------------------------------------------------------- | ------------------ |
    | Secret name  | A unique name for the secret. Used to reference the secret in workflow definitions.                 | Required.          |
    | Secret value | The value to be stored as secret. Can be a plain string or a JSON object.                           | Required.          |

    4. Select **Add** to save the secret.


### Using secrets in workflows

To use a secret in a workflow, use the following expression:

```text
${workflow.secrets.secret_name}
```

Here, `secret_name` is the name of the secret saved in Conductor. This expression dynamically retrieves the secret value during workflow execution, ensuring it is not exposed directly in the workflow definition.

If the secret value is a JSON object, you can access individual fields using dot notation:

```text
${workflow.secrets.secret_name.field_name}
```

For example, if a secret named `db-credentials` has the value `{"username": "admin", "password": "secret123"}`, you can reference the username as `${workflow.secrets.db-credentials.username}`.

## Updating secrets

Updating a secret does not require changing or redeploying workflow definitions, since workflows reference the secret name rather than its value. Keep the secret name stable and rotate the value stored behind it.

Secrets can be updated in three ways:

- Using the Conductor UI
- Using the API
- Using the [Update Secret task](/content/reference-docs/system-tasks/update-secret) within a workflow

=== "Using API"

    Use the same `PUT` API used to create a secret to update an existing one:

    ```shell
    curl -sS -X PUT "$CONDUCTOR_SERVER_URL/secrets/payment_api_token" \
      -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
      -H "Content-Type: application/json" \
      -d '"rotated-secret-value"'
    ```

=== "Using Conductor UI"

    **To update the secret:**

    1. Go to **Definitions** > **Secrets**, and select the secret to update.
    2. In **Secret value**, enter the updated value, then select **Edit** to confirm.

    <p align="center"><img src="/content/img/updating-secrets.png" alt="Updating secrets via Conductor UI" width="80%" height="auto"></img></p>

=== "Using Update Secret task"

    Use the [Update Secret](/content/reference-docs/system-tasks/update-secret) task when secrets need to be replaced programmatically within a workflow; for example, when an access token expires and must be rotated automatically.

    ```json
    {
      "name": "update_secret",
      "taskReferenceName": "update_secret_ref",
      "type": "UPDATE_SECRET",
      "inputParameters": {
        "_secrets": {
          "secretKey": "payment_api_token",
          "secretValue": "${refresh_token.output.access_token}"
        }
      }
    }
    ```

    The task requires the following input structure:

    ```json
    {
      "_secrets": {
        "secretKey": "my-secret-name",
        "secretValue": "${workflow.secrets.new-token-secret}"
      }
    }
    ```

    If `_secrets`, `secretKey`, or `secretValue` are missing or empty, the task terminates the workflow immediately.


## Production notes

- Do not put secret values in workflow input, task output, task logs, or inline expressions.
- Use stable secret names and rotate values behind those names.
- Grant read and update permissions narrowly through [Role Based Access Control](/content/category/access-control-and-security).
- Keep secret creation and rotation in deployment automation where possible.
- Test secret access with the same application identity that starts the workflow.

## Examples

<details markdown="1">
<summary>Using a secret in an HTTP task</summary>

Suppose you have a secret named `sampletask-api-token`. Here is an example of how to use this secret in a workflow definition:

```json
// workflow definition
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
```

When this workflow runs, the expression `${workflow.secrets.sampletask-api-token}` will be dynamically replaced with the secret value, provided the user running the workflow has READ permission over the secret.

</details>

<details markdown="1">
<summary>Using a JSON secret with dot notation</summary>

Suppose you have a secret named `db-credentials` with the following JSON value:

```json
{
  "username": "admin",
  "password": "secret123"
}
```

Reference individual fields in a task input using dot notation:

```json
{
  "name": "db_query_task",
  "taskReferenceName": "db_query_task",
  "inputParameters": {
    "username": "${workflow.secrets.db-credentials.username}",
    "password": "${workflow.secrets.db-credentials.password}",
    "query": "SELECT * FROM orders WHERE status = 'pending'"
  },
  "type": "SIMPLE"
}
```

</details>
