---
title: "Using Task Input Templates"
description: "Learn how to define task input templates in task definitions and use them as default inputs when configuring tasks in workflows in Orkes Conductor."
---

# Using Task Input Templates

Task input templates define default input parameters on a task definition. Every workflow task that uses that task definition receives those defaults unless the workflow task configuration overrides them.

!!! tip "5-minute path"
    Put shared defaults in `inputTemplate`, keep workflow-specific values in the workflow task `inputParameters`, and only template values that should apply across every use of that task type.

## When to use task input templates

Use templates for defaults shared by many workflows:

- Static service paths
- Default headers
- Common retry metadata passed to workers
- Provider or integration names
- Feature flags used by the worker
- Default task payload shape

Do not use templates for per-workflow data, secrets, customer-specific values, or values that should be obvious in the workflow definition.

## Configure a task input template

Add `inputTemplate` to the task definition:

```json
{
  "name": "send_notification",
  "description": "Send a notification message",
  "ownerEmail": "platform@example.com",
  "retryCount": 3,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "inputTemplate": {
    "channel": "email",
    "priority": "normal",
    "headers": {
      "source": "conductor"
    }
  }
}
```

The template supports strings, numbers, booleans, nulls, arrays, and objects.

## Override template values in a workflow

Workflow task input overrides template values with the same key:

```json
{
  "name": "send_notification",
  "taskReferenceName": "send_notification_ref",
  "type": "SIMPLE",
  "inputParameters": {
    "recipient": "${workflow.input.email}",
    "message": "${workflow.input.message}",
    "priority": "high"
  }
}
```

In this example, `channel` and `headers` come from the task definition template. `priority` is overridden by the workflow task configuration.

## Runtime behavior

Task input templates are stored on the task definition, not inside each workflow definition. During execution, Conductor applies the template and then applies the workflow task input parameters.

The effective task input is:

```json
{
  "channel": "email",
  "priority": "high",
  "headers": {
    "source": "conductor"
  },
  "recipient": "customer@example.com",
  "message": "Your order has shipped"
}
```

## Production notes

- Keep templates small and stable. Large templates make workflow behavior harder to inspect.
- Avoid putting secrets in templates. Use [secrets](/content/developer-guides/secrets-in-conductor).
- Document any required override keys in the task definition description.
- Remember that changing a task definition template can affect every workflow using that task definition.
