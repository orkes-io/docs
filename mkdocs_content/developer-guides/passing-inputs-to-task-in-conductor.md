---
title: "Parameter Mapping"
description: "Learn how to map parameters in Orkes Conductor using dynamic expressions, task input templates, masking, and schema validation."
canonical_route: "developer-guides/passing-inputs-to-task-in-conductor"
updated: "2026-05-14"
keywords: "Orkes Conductor, Conductor, durable execution, workflow orchestration, agentic workflows, AI agents, microservice orchestration, internet-scale orchestration, workflow tasks, workflow workers, task queues"
---

# Parameter Mapping

Parameter mapping controls how data moves through a Conductor workflow. Task inputs can be hard-coded or resolved dynamically from workflow input, prior task output, workflow variables, environment variables, secrets, and execution metadata.

!!! tip "5-minute path"
    Start with `${workflow.input.<field>}` for request data, `${task_ref.output.<field>}` for prior task output, `${workflow.variables.<field>}` for shared workflow state, and `${workflow.secrets.<name>}` for credentials. Use task input templates for shared defaults, masking for sensitive values, and schema validation for production contracts.

## Basic expression

Dynamic references use this format:

```json
{
  "key": "${type.path.to.value}"
}
```

| Part | Meaning |
| ---- | ------- |
| `key` | The input parameter name being set. |
| `${...}` | Runtime expression that Conductor resolves during execution. |
| `type` | Source object, such as `workflow`, `workflow.input`, `workflow.variables`, `workflow.env`, `workflow.secrets`, or a task reference name. |
| `path.to.value` | Dot-notation path within the source object. |

Example:

```json
{
  "customerId": "${workflow.input.customerId}",
  "riskScore": "${score_customer.output.score}"
}
```

## Sample expressions

| Expression | Resolves to |
| ---------- | ----------- |
| `${workflow.input}` | Complete workflow input object. |
| `${workflow.input.customerId}` | `customerId` from workflow input. |
| `${workflow.output}` | Workflow output object. |
| `${workflow.workflowId}` | Current workflow execution ID. |
| `${workflow.workflowType}` | Workflow name. |
| `${workflow.version}` | Workflow definition version used by this execution. |
| `${workflow.correlationId}` | Correlation ID for this execution. |
| `${workflow.status}` | Current workflow status. |
| `${workflow.variables.customerTier}` | Workflow variable set by a Set Variable task. |
| `${workflow.env.region}` | Environment variable named `region`. |
| `${workflow.secrets.api_key}` | Secret named `api_key`. The value is masked in execution data. |
| `${task_ref.input}` | Complete input object for `task_ref`. |
| `${task_ref.output}` | Complete output object for `task_ref`. |
| `${task_ref.output.customer.email}` | Nested field from `task_ref` output. |
| `${workflow.parentWorkflowId}` | Parent workflow ID when running as a sub-workflow. |
| `${workflow.parentWorkflowTaskId}` | Parent task execution ID for the Sub Workflow task. |
| `${workflow.taskToDomain.domainName}` | Domain mapping used for this execution. |

If a referenced task has not produced output yet, the expression resolves to `null`. Place tasks in the correct order, or use control-flow operators when a value may not exist on every path.

## Examples

### Referencing workflow inputs

Workflow input:

```json
{
  "userId": "U-1001",
  "userDetails": {
    "country": "US",
    "age": 50
  }
}
```

Task input mapping:

```json
{
  "userId": "${workflow.input.userId}",
  "age": "${workflow.input.userDetails.age}"
}
```

Resolved task input:

```json
{
  "userId": "U-1001",
  "age": 50
}
```

### Referencing other task outputs

Prior task output:

```json
{
  "taxZone": "A",
  "productDetails": {
    "sku": "SKU-1",
    "price": 42.5
  }
}
```

Next task input mapping:

```json
{
  "zone": "${calculate_tax.output.taxZone}",
  "sku": "${calculate_tax.output.productDetails.sku}",
  "price": "${calculate_tax.output.productDetails.price}"
}
```

### Referencing secrets

```json
{
  "name": "call_private_api",
  "taskReferenceName": "call_private_api",
  "type": "HTTP",
  "inputParameters": {
    "http_request": {
      "uri": "https://api.example.com/private",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer ${workflow.secrets.api_key}"
      }
    }
  }
}
```

The resolved secret value is masked in workflow execution data.

### Referencing workflow variables

Set a variable:

```json
{
  "name": "set_customer_context",
  "taskReferenceName": "set_customer_context",
  "type": "SET_VARIABLE",
  "inputParameters": {
    "tier": "${lookup_customer.output.tier}"
  }
}
```

Read it later:

```json
{
  "name": "route_customer",
  "taskReferenceName": "route_customer",
  "type": "SWITCH",
  "evaluatorType": "value-param",
  "expression": "tier",
  "inputParameters": {
    "tier": "${workflow.variables.tier}"
  }
}
```

Workflow variables are scoped to the current workflow execution. They are not automatically shared with parent or child workflows.

### Referencing environment variables

```json
{
  "region": "${workflow.env.region}",
  "apiBaseUrl": "${workflow.env.customer_api_base_url}"
}
```

Use environment variables for non-secret configuration. Use secrets for credentials.

### Referencing data between parent workflow and sub-workflow

Pass data into a sub-workflow:

```json
{
  "name": "run_fraud_review",
  "taskReferenceName": "run_fraud_review",
  "type": "SUB_WORKFLOW",
  "subWorkflowParam": {
    "name": "fraud_review",
    "version": 1
  },
  "inputParameters": {
    "customerId": "${workflow.input.customerId}",
    "riskScore": "${score_customer.output.riskScore}"
  }
}
```

Return data from the sub-workflow by defining output parameters in the child workflow:

```json
{
  "name": "fraud_review",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [],
  "outputParameters": {
    "decision": "${review_task.output.decision}",
    "reason": "${review_task.output.reason}"
  }
}
```

Read the sub-workflow output in the parent:

```json
{
  "decision": "${run_fraud_review.output.decision}",
  "reason": "${run_fraud_review.output.reason}"
}
```

## Task input templates

Task input templates define default input parameters on a task definition. Every workflow task that uses that task definition receives those defaults unless the workflow task configuration overrides them.

Use templates for defaults shared by many workflows:

- Static service paths
- Default headers
- Common worker metadata
- Provider or integration names
- Feature flags used by the worker
- Default task payload shape

Do not use templates for per-workflow data, secrets, customer-specific values, or values that should be obvious in the workflow definition.

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

## Masking sensitive mapped values

Mask sensitive values that should not be exposed in workflow execution payloads, task inputs, task outputs, logs, or archived execution data. Use masking for tokens, API keys, credentials, authorization headers, customer identifiers, and similar data.

| Mechanism | Use when |
| --------- | -------- |
| `_masked` | A task input contains runtime-sensitive values that should remain available for restart/archive behavior. |
| `_secrets` | A task input contains sensitive values that should be permanently replaced with `***` during archiving. |
| `maskedFields` | Specific workflow input or output fields should be masked by name. Available in v5.1.18+/v4.1.68+. |

Use `${workflow.secrets.<secretName>}` for centrally stored credentials:

```json
{
  "name": "charge_payment",
  "taskReferenceName": "charge_payment",
  "type": "HTTP",
  "inputParameters": {
    "http_request": {
      "uri": "https://payments.example.com/charge",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer ${workflow.secrets.payment_api_token}"
      },
      "body": {
        "customerId": "${workflow.input.customerId}",
        "amount": "${workflow.input.amount}"
      }
    }
  }
}
```

Use `_masked` when a sensitive runtime value is produced by one task and consumed by another:

```json
{
  "name": "call_private_api",
  "taskReferenceName": "call_private_api",
  "type": "HTTP",
  "inputParameters": {
    "_masked": {
      "sessionToken": "${create_session.output.sessionToken}"
    },
    "http_request": {
      "uri": "https://api.example.com/private",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer ${call_private_api.input._masked.sessionToken}"
      }
    }
  }
}
```

Use `maskedFields` when specific workflow-level fields should be hidden in execution details:

```json
{
  "name": "payment_workflow",
  "version": 1,
  "schemaVersion": 2,
  "inputParameters": ["customerId", "paymentToken"],
  "maskedFields": ["paymentToken"],
  "tasks": []
}
```

## Schema validation

Schema validation lets you enforce the shape of workflow inputs, workflow outputs, task inputs, and task outputs. Use it when a workflow is called by external clients, webhooks, API Gateway routes, MCP tools, CI/CD automation, or any producer that should be held to a contract.

| Attachment point | Scope |
| ---------------- | ----- |
| Workflow definition | Validates workflow input and/or workflow output. |
| Task definition | Validates every use of that task definition. |
| Task configuration | Validates one task instance inside one workflow. |

Schemas are named and versioned. For production workflows, pin versions deliberately so schema changes do not alter existing workflows unexpectedly.

Example schema:

```json
{
  "name": "orderInput",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "orderId": {
        "type": "string"
      },
      "amount": {
        "type": "number",
        "minimum": 0
      }
    },
    "required": ["orderId", "amount"],
    "additionalProperties": false
  }
}
```

Attach it at the workflow boundary:

```json
{
  "name": "validate_order_input",
  "version": 1,
  "schemaVersion": 2,
  "enforceSchema": true,
  "inputSchema": {
    "name": "orderInput",
    "version": 1,
    "type": "JSON"
  },
  "tasks": [
    {
      "name": "process_order",
      "taskReferenceName": "process_order",
      "type": "SIMPLE",
      "inputParameters": {
        "orderId": "${workflow.input.orderId}",
        "amount": "${workflow.input.amount}"
      }
    }
  ]
}
```

Validation failures are useful operational signals:

| Validation point | Failure behavior |
| ---------------- | ---------------- |
| Workflow input | The workflow does not start. |
| Workflow output | The workflow fails when the output does not match the schema. |
| Task input | The task fails before worker execution. |
| Task output | The task fails after the worker returns invalid output. |

## Troubleshooting

| Symptom | Check |
| ------- | ----- |
| Value resolves to `null` | The referenced task may not have run yet, or the path is wrong. |
| Secret fails to resolve | The workflow/application may not have permission to read the secret. |
| Downstream task receives the whole object | The expression may reference `${task_ref.output}` instead of a specific field. |
| Branch input is missing | The value may only exist on another switch/fork path. |
| Sub-workflow output is missing | The child workflow may not define `outputParameters`. |
| Template value is not applied | The workflow task may override the same key in `inputParameters`, or the task may not use the expected task definition. |
| Sensitive value appears in execution data | Move credentials to secrets, put runtime-sensitive values under `_masked`, or add the field name to `maskedFields`. |
| Schema validation fails | Compare the resolved task or workflow payload with the pinned schema version. |

Use workflow execution details to inspect the resolved input and output for each task. For production contracts, add [schema validation](/content/developer-guides/schema-validation) so invalid payloads fail fast.

## Related pages

- [Masking Parameters](/content/developer-guides/masking-parameters)
- [Task Input Templates](/content/developer-guides/task-input-templates)
- [Schema Validation](/content/developer-guides/schema-validation)
