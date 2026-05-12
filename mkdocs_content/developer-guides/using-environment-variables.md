---
title: "Using Environment Variables"
description: "Learn how to define environment variables and reference them in workflow definitions to reuse configuration values across workflows in Orkes Conductor."
---

# Using Environment Variables

Environment variables are cluster-level configuration values that workflows can reference at runtime. Use them for non-sensitive values that vary by environment, such as service URLs, regions, feature flags, thresholds, and JSON configuration blocks.

!!! tip "5-minute path"
    Create an environment variable, reference it as `${workflow.env.variable-name}`, use `.$` when the value is JSON, and keep secrets in [secrets](/content/developer-guides/secrets-in-conductor) instead.

## Creating environment variables

Environment variables can be created through the UI or API. For repeatable deployments, use the API and manage values per cluster or environment.

Create or update a plain-text variable:

```shell
curl -sS -X PUT "$CONDUCTOR_SERVER_URL/environment/payment-api-base-url" \
  -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
  -H "Content-Type: text/plain" \
  -d 'https://payments.example.com'
```

Create or update a JSON variable:

```shell
curl -sS -X PUT "$CONDUCTOR_SERVER_URL/environment/payment-api-config" \
  -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
  -H "Content-Type: text/plain" \
  -d '{"baseUrl":"https://payments.example.com","timeout":5000,"region":"us-east"}'
```

List all environment variables:

```shell
curl -sS "$CONDUCTOR_SERVER_URL/environment" \
  -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN"
```

Related APIs:

- [Create or update environment variable](/content/reference-docs/api/environment-variables/create-environment-variable)
- [Get all environment variables](/content/reference-docs/api/environment-variables/get-all-environment-variables)
- [Get environment variable by key](/content/reference-docs/api/environment-variables/get-environment-value-by-key)
- [Delete environment variable](/content/reference-docs/api/environment-variables/delete-environment-variable)

## Using environment variables in workflow

Reference a plain-text value with:

```text
${workflow.env.variable-name}
```

Reference a JSON value by appending `.$` and then selecting fields:

```text
${workflow.env.payment-api-config.$.baseUrl}
${workflow.env.payment-api-config.$.timeout}
```

Example HTTP task using a plain-text variable:

```json
{
  "name": "call_payment_api",
  "taskReferenceName": "call_payment_api_ref",
  "type": "HTTP",
  "inputParameters": {
    "http_request": {
      "uri": "${workflow.env.payment-api-base-url}/charges/${workflow.input.chargeId}",
      "method": "GET",
      "connectionTimeOut": 3000,
      "readTimeOut": 3000,
      "accept": "application/json",
      "contentType": "application/json"
    }
  }
}
```

Example HTTP task using a JSON variable:

```json
{
  "name": "call_payment_api",
  "taskReferenceName": "call_payment_api_ref",
  "type": "HTTP",
  "inputParameters": {
    "http_request": {
      "uri": "${workflow.env.payment-api-config.$.baseUrl}/charges/${workflow.input.chargeId}",
      "method": "GET",
      "connectionTimeOut": "${workflow.env.payment-api-config.$.timeout}",
      "readTimeOut": "${workflow.env.payment-api-config.$.timeout}",
      "accept": "application/json",
      "contentType": "application/json"
    }
  }
}
```

## Updating environment variables

Updating a variable changes the value used by future workflow executions without changing the workflow definition.

```shell
curl -sS -X PUT "$CONDUCTOR_SERVER_URL/environment/payment-api-base-url" \
  -H "X-Authorization: $CONDUCTOR_AUTH_TOKEN" \
  -H "Content-Type: text/plain" \
  -d 'https://payments-v2.example.com'
```

Before changing a value used by production workflows, check which workflows reference it and verify the expected shape. JSON variables are especially easy to break if a field is renamed.

## Example

Use environment variables to keep workflow definitions portable across dev, staging, and production:

```json
{
  "name": "payment-status-check",
  "description": "Check payment status using environment-specific configuration",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["paymentId"],
  "tasks": [
    {
      "name": "get_payment_status",
      "taskReferenceName": "get_payment_status_ref",
      "type": "HTTP",
      "inputParameters": {
        "http_request": {
          "uri": "${workflow.env.payment-api-config.$.baseUrl}/payments/${workflow.input.paymentId}",
          "method": "GET",
          "connectionTimeOut": "${workflow.env.payment-api-config.$.timeout}",
          "readTimeOut": "${workflow.env.payment-api-config.$.timeout}",
          "headers": {
            "Authorization": "Bearer ${workflow.secrets.payment_api_token}"
          }
        }
      }
    }
  ],
  "outputParameters": {
    "status": "${get_payment_status_ref.output.response.body.status}"
  }
}
```

In this example, the base URL and timeout come from an environment variable, while the credential comes from a secret.

## When to use environment variables vs secrets

| Use | Environment variable | Secret |
| --- | -------------------- | ------ |
| API base URL | Yes | No |
| Feature flag | Yes | No |
| Region or tenant code | Yes | No |
| Numeric timeout or threshold | Yes | No |
| API token | No | Yes |
| Password or private key | No | Yes |
| Webhook signing secret | No | Yes |

## Production notes

- Use environment variables for configuration, not credentials.
- Use stable names that do not include environment names when the same workflow is deployed to multiple clusters.
- Treat JSON variables as a contract. Changing field names can break workflows.
- Prefer small, focused variables over one large global config object.
- Verify permissions for the application identity that starts the workflow.
