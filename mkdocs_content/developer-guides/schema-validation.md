---
title: "Input/Output Schema Validation"
description: "Learn how to define schemas that validate workflow inputs, outputs, and task parameters to ensure payload structure before workflow execution."
canonical_route: "developer-guides/schema-validation"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Input/Output Schema Validation"
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

1. Go to **Definitions > Schemas** from the left navigation menu on your Conductor cluster.
2. Select **+ New schema**.
3. In the schema editor, add your schema definition in the `data` object. Fill out at least `$schema`, `$id`, `type`, and `properties` as outlined in the [JSON Schema spec](https://json-schema.org/).

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

Attach schemas through the task definition, task configuration, or workflow definition. If the version is unspecified, the latest schema version is used.

=== "Task definition"

    1. Go to **Definitions > Task**.
    2. Select a task definition to add a schema to.
    3. In the **Schema** section, select a schema to use as an **Input Schema** or **Output Schema**.
    4. Select a **Version** for the schema.
    5. Switch on the **Enforce schema** toggle.
    6. Select **Save** in the top right.

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

    <p align="center"><img src="/content/img/adding-schema-to-task-definition.png" alt="Screenshot of adding a schema to a task definition" width="90%" height="auto"></img></p>

=== "Task configuration"

    Schema validation at the task-configuration level is currently supported for **Worker (Simple)** and **Yield** task types.

    1. Go to **Definitions > Workflow**.
    2. Select a workflow.
    3. In the visual workflow builder, select the task to add a task-level schema to.
    4. Select a schema to use as an **Input Schema** or **Output Schema**.
    5. Select a **Version** for the schema.
    6. Select **Save > Confirm** in the top right.

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

    <p align="center"><img src="/content/img/adding-schema-to-task-configuration.png" alt="Screenshot of adding a schema to a task configuration in the workflow definition" width="90%" height="auto"></img></p>

=== "Workflow definition"

    1. Go to **Definitions > Workflow**.
    2. Select the workflow to add a workflow-level schema to.
    3. In the **Workflow** tab, go to **Schema and Parameters > Workflow Schema**.
    4. Select a schema to use as an **Input Schema** or **Output Schema**.
    5. Select a **Version** for the schema.
    6. Select **Save > Confirm** in the top right.

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

    <p align="center"><img src="/content/img/add-schema-to-workflow.png" alt="Screenshot of adding a schema to the workflow definition" width="90%" height="auto"></img></p>


Once the schema is added, modify your workflow or task inputs/outputs to match the schema. Use task-definition validation when every use of a task should follow the same contract. Use task-configuration validation when a shared task is used differently by one workflow.

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

<details markdown="1">
<summary>Applying a schema in a task definition</summary>

This example demonstrates how to define a schema, apply it directly to a task definition, and use it in a workflow.

**Step 1: Create a schema definition**

1. Go to **Definitions > Schemas**.
2. Select **+ New schema**.
3. In the **Code** tab, paste the following schema:

```json
{
  "name": "productSchema",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "productId": { "type": "integer" }
    },
    "required": ["productId"]
  }
}
```

4. Select **Save**.

**Step 2: Add the schema to a task definition**

1. Go to **Definitions > Task**.
2. Select an existing task, or create a new one.
3. In the **Schema** section, select the created schema (`productSchema`) to use as the **Input Schema**.
4. Select a **Version** for the schema.
5. Switch on the **Enforce schema** toggle.
6. Select **Save** in the top right. Note the task name (`my_Task` here), since it will be referenced in the workflow.

<p align="center"><img src="/content/img/enforcing-input-schema-for-a-task-definition.png" alt="Enforcing schema to a task definition" width="90%" height="auto"></img></p>

**Step 3: Add the task to a workflow definition**

1. Go to **Definitions > Workflow**.
2. Select **+ Define workflow** and paste the following in the **Code** tab:

```json
{
  "name": "schema_task_definition_example",
  "description": "Example",
  "version": 1,
  "tasks": [
    {
      "name": "my_Task",
      "taskReferenceName": "my_Task_ref",
      "inputParameters": {
        "productId": "${workflow.input.productId}"
      },
      "type": "SIMPLE"
    }
  ],
  "inputParameters": ["productId"],
  "schemaVersion": 2
}
```

3. Select **Save > Confirm**.
4. Select the task and update its **Task Definition** to the one created in Step 2 — this ensures the schema is actually applied.

<p align="center"><img src="/content/img/update-task-definition-in-workflow.png" alt="Updating task definition in a workflow" width="90%" height="auto"></img></p>

5. Save the workflow.

**Step 4: Run the workflow**

1. Go to the **Run** tab and enter a valid integer for **Input params**, for example `{ "productId": 25 }`.
2. Select **Execute**.

Since this is a `SIMPLE` worker task with no registered worker, the task remains `SCHEDULED`. For demonstration, manually mark the task as completed from the Conductor UI (see [Writing Workers](/content/developer-guides/using-workers) for running real worker tasks).

<p align="center"><img src="/content/img/completing-workflow.gif" alt="Completing task manually from Conductor UI" width="90%" height="auto"></img></p>

The workflow completes successfully, confirming the input matched the schema.

Now rerun with an invalid `productId`, for example `{ "productId": "abc" }`. The workflow fails immediately at the task execution stage, since the input does not match the schema (expected integer).

<p align="center"><img src="/content/img/schema-validation-failed-for-task-definition.png" alt="Schema validation failed for the task definition" width="90%" height="auto"></img></p>

</details>

<details markdown="1">
<summary>Applying a schema in a task configuration</summary>

This example demonstrates defining a schema and applying it at the task-configuration level within a workflow. Unlike a task-definition schema, a task-configuration schema applies only to that specific task instance in the workflow.

**Step 1: Create a schema definition**

1. Go to **Definitions > Schemas**.
2. Select **+ New schema**.
3. In the **Code** tab, paste the following schema:

```json
{
  "name": "productSchema",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "productId": { "type": "integer" }
    },
    "required": ["productId"]
  }
}
```

4. Select **Save**.

**Step 2: Add the schema to a task configuration**

1. Go to **Definitions > Workflow**.
2. Select **+ Define workflow** and paste the following in the **Code** tab:

```json
{
  "name": "SampleDemo",
  "description": "Example workflow",
  "version": 1,
  "tasks": [
    {
      "name": "simple_1",
      "taskReferenceName": "simple_ref_1",
      "inputParameters": {
        "productId": "${workflow.input.productId}"
      },
      "type": "SIMPLE"
    }
  ],
  "inputParameters": ["productId"],
  "schemaVersion": 2
}
```

3. Select **Save > Confirm**.
4. Open the workflow in the visual editor and select the worker task.
5. Select the created schema (`productSchema`) to use as the **Input Schema**, and select a **Version**.
6. Make sure the input parameter is set to `${workflow.input.productId}`.
7. Select **Save > Confirm**.

<p align="center"><img src="/content/img/enforcing-schema-in-task-configuration.png" alt="Enforcing schema validation to a task configuration" width="90%" height="auto"></img></p>

**Step 3: Run the workflow**

1. Go to the **Run** tab and enter a valid value, for example `{ "productId": 100 }`.
2. Select **Execute**.

Since this is a `SIMPLE` worker task with no registered worker, the task remains `SCHEDULED`. For demonstration, manually mark the task as completed from the Conductor UI. The workflow completes successfully, confirming the input matched the schema.

<p align="center"><img src="/content/img/successful-execution-task-configuration.gif" alt="Successful workflow execution" width="90%" height="auto"></img></p>

Now rerun with an invalid `productId`, for example `{ "productId": "abc" }`. Conductor validates the task input against the attached schema — since `productId` is defined as an integer but a string was provided, validation fails before the task can run. The task is immediately marked `FAILED_WITH_TERMINAL_ERROR`, meaning it cannot proceed or be retried automatically. Because this failure is terminal, the workflow also transitions to `FAILED`.

<p align="center"><img src="/content/img/schema-validation-failed-for-task-configuration.png" alt="Schema validation failed for a task configuration" width="90%" height="auto"></img></p>

</details>

<details markdown="1">
<summary>Applying a schema in a workflow definition</summary>

This example demonstrates defining a schema and applying it at the workflow-definition level. A workflow-level schema validates the workflow input itself, before any tasks begin execution.

**Step 1: Create a schema definition**

1. Go to **Definitions > Schemas**.
2. Select **+ New schema**.
3. In the **Code** tab, paste the following schema — it enforces that all workflow runs provide a `customerId` of type string:

```json
{
  "name": "customerSchema",
  "version": 1,
  "type": "JSON",
  "data": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "customerId": { "type": "string" }
    },
    "required": ["customerId"]
  }
}
```

4. Select **Save**.

**Step 2: Add the schema to a workflow definition**

1. Go to **Definitions > Workflow**.
2. Select **+ Define workflow** and paste the following in the **Code** tab:

```json
{
  "name": "schema_workflow_definition_example",
  "description": "Workflow-level schema validation example",
  "version": 1,
  "tasks": [
    {
      "name": "log_customer",
      "taskReferenceName": "log_customer_ref",
      "type": "INLINE",
      "inputParameters": {
        "customerId": "${workflow.input.customerId}",
        "expression": "true",
        "evaluatorType": "graaljs"
      }
    }
  ],
  "inputParameters": ["customerId"],
  "schemaVersion": 2
}
```

3. Select **Save > Confirm**.
4. In the **Workflow** tab, go to **Schema and Parameters > Workflow Schema**.
5. In **Input Schema**, select the schema (`customerSchema`) created above, and select a **Version**.
6. Select **Save > Confirm**.

<p align="center"><img src="/content/img/enforcing-input-schema-for-a-workflow-definition.png" alt="Enforcing schema validation to a workflow definition" width="90%" height="auto"></img></p>

**Step 3: Run the workflow**

1. Go to the **Run** tab and enter a valid `customerId`, for example `{ "customerId": "CUST-001" }`.
2. Select **Execute**.

Since the workflow input matches the required schema (string type), validation succeeds, the Inline task executes immediately, and the workflow completes.

<p align="center"><img src="/content/img/successful-execution-workflow-definition.png" alt="Successful workflow execution" width="90%" height="auto"></img></p>

Now rerun with an invalid input, for example `{ "customerId": 123 }`. Execution does not even begin, because workflow-level validation runs first — Conductor detects that `customerId` is expected to be a string but an integer was passed, and blocks the workflow from starting.

<p align="center"><img src="/content/img/schema-validation-failed-for-workflow-definition.png" alt="Schema validation failed for a workflow definition" width="90%" height="auto"></img></p>

</details>

## Related pages

- [Workflows](/content/developer-guides/workflows)
- [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code)
- [Build Workflows Using Conductor UI](/content/developer-guides/build-workflows-using-ui)
- [Import BPMN Files as Workflows](/content/developer-guides/convert-bpmn-to-workflows)
- [Versioning Workflows](/content/developer-guides/versioning-workflows)
- [Executing Workflows](/content/developer-guides/running-workflows)
