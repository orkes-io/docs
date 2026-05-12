---
title: "Schema Validation"
description: "Learn how to define schemas that validate workflow inputs, outputs, and task parameters to ensure payload structure before workflow execution in Orkes Conductor."
---

# Input/Output Schema Validation

!!! info "Available since"
    - v4.0.11 and later

Schema validation lets you enforce the shape of workflow inputs, workflow outputs, task inputs, and task outputs. Use it when a workflow is called by external clients, webhooks, API Gateway routes, MCP tools, CI/CD automation, or any producer that should be held to a contract.

!!! tip "5-minute path"
    Create a JSON Schema, attach it to a workflow or task, enable enforcement where applicable, then test one valid payload and one invalid payload before promoting the workflow.

## When to use schemas

| Use schemas when | Use lighter validation when |
| ---------------- | --------------------------- |
| A workflow is called by external systems. | The producer and consumer are controlled by the same service. |
| A task output becomes a contract for downstream systems. | The payload is exploratory or intentionally flexible. |
| You need versioned contracts for CI/CD, API Gateway, MCP tools, or webhooks. | You only need default values, which are better handled with [input templates](/content/developer-guides/task-input-templates). |
| Invalid payloads should fail fast. | Invalid values can be corrected inside worker code. |

## Schema formats

Conductor supports JSON Schema for schema definitions. Schemas are named and versioned, so the same logical contract can evolve without breaking older workflows.

```json
{
  "name": "productInput",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/product-input.schema.json",
    "type": "object",
    "properties": {
      "productId": {
        "type": "integer"
      },
      "productName": {
        "type": "string"
      }
    },
    "required": ["productId"],
    "additionalProperties": false
  }
}
```

## Using schemas

Schemas can be attached in three places:

| Attachment point | Scope |
| ---------------- | ----- |
| Workflow definition | Validates workflow input and/or workflow output. |
| Task definition | Validates every use of that task definition. |
| Task configuration | Validates one task instance inside one workflow. |

If a schema version is not specified, Conductor uses the latest version. For production workflows, pin versions deliberately so schema changes do not alter existing workflows unexpectedly.

### Step 1: Define a schema

Create a schema with a stable name, version, type, and JSON Schema `data` object.

```json
{
  "name": "customerInput",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "customerId": {
        "type": "string"
      },
      "tier": {
        "type": "string",
        "enum": ["standard", "premium"]
      }
    },
    "required": ["customerId"],
    "additionalProperties": false
  }
}
```

Keep schemas small and focused. A workflow input schema should validate the contract at the boundary; worker code can still perform domain-level validation that requires database lookups or external state.

### Step 2: Add schema to workflow or task

Attach schemas through the workflow definition, task definition, or individual task configuration.

**Workflow-level validation**

```json
{
  "name": "customer_onboarding",
  "version": 1,
  "schemaVersion": 2,
  "inputSchema": {
    "name": "customerInput",
    "version": 1,
    "type": "JSON"
  },
  "tasks": [
    {
      "name": "create_customer",
      "taskReferenceName": "create_customer",
      "type": "SIMPLE",
      "inputParameters": {
        "customerId": "${workflow.input.customerId}",
        "tier": "${workflow.input.tier}"
      }
    }
  ]
}
```

**Task-definition validation**

```json
{
  "name": "create_customer",
  "retryCount": 3,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "inputSchema": {
    "name": "customerInput",
    "version": 1,
    "type": "JSON"
  },
  "outputSchema": {
    "name": "customerOutput",
    "version": 1,
    "type": "JSON"
  },
  "enforceSchema": true
}
```

**Task-configuration validation**

```json
{
  "name": "create_customer",
  "taskReferenceName": "create_customer",
  "type": "SIMPLE",
  "inputParameters": {
    "customerId": "${workflow.input.customerId}",
    "tier": "${workflow.input.tier}"
  },
  "taskDefinition": {
    "inputSchema": {
      "name": "customerInput",
      "version": 1,
      "type": "JSON"
    },
    "enforceSchema": true
  }
}
```

Use task-definition validation when every use of a task should follow the same contract. Use task-configuration validation when a shared task is used differently by one workflow.

## Editing schemas

Schemas can be reused by many workflows and tasks. Treat edits as contract changes:

- Create a new schema version for compatible or planned changes.
- Create a new schema name for a different contract.
- Pin workflows to a specific version when stability matters.
- Test both valid and invalid payloads before promoting a schema change.

## Workflow behavior with schemas

Validation happens before the protected work proceeds:

| Validation point | Failure behavior |
| ---------------- | ---------------- |
| Workflow input | The workflow does not start. |
| Workflow output | The workflow fails when the output does not match the schema. |
| Task input | The task fails before worker execution. |
| Task output | The task fails after the worker returns invalid output. |

Schema failures are useful operational signals. They usually mean a producer sent an invalid payload, a worker changed output shape, or a workflow/task version was promoted without updating the schema contract.

## Supported tasks

Task-configuration schema validation is supported for:

- [Worker (Simple)](/content/reference-docs/worker-task)
- [Yield](/content/reference-docs/operators/yield#task-configuration)

Workflow-level schema validation applies to workflow input and output contracts.

## Examples

### Validate workflow input

Schema:

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

Workflow definition:

```json
{
  "name": "validate_order_input",
  "version": 1,
  "schemaVersion": 2,
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

Valid input:

```json
{
  "orderId": "ORD-1001",
  "amount": 42.5
}
```

Invalid input:

```json
{
  "orderId": "ORD-1001",
  "amount": "42.5"
}
```

### Validate worker output

Task definition:

```json
{
  "name": "score_customer",
  "retryCount": 3,
  "timeoutSeconds": 300,
  "responseTimeoutSeconds": 60,
  "outputSchema": {
    "name": "customerScoreOutput",
    "version": 1,
    "type": "JSON"
  },
  "enforceSchema": true
}
```

Output schema:

```json
{
  "name": "customerScoreOutput",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "score": {
        "type": "integer",
        "minimum": 0,
        "maximum": 100
      },
      "riskBand": {
        "type": "string",
        "enum": ["low", "medium", "high"]
      }
    },
    "required": ["score", "riskBand"],
    "additionalProperties": false
  }
}
```
