---
sidebar_label: Schema Validation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Input/Output Schema Validation

Create schemas to define and enforce the payload structure of workflow or task inputs/outputs. 

Once created, schemas can be added to workflow or task definitions:
* A **workflow-level schema** allows you to specify what workflow inputs must be supplied.
* A **task-level schema** allows you to specify a contract that the task worker should follow—in other words, the inputs/outputs that must be wired to/from the task configuration. The task-level schema can be general across workflows (specified in the *task definition*) or unique to a specific workflow (specified in the *task configuration*).

The schema is enforced at runtime. The workflow or task will fail if the inputs/outputs do not pass the validation. This behavior is the main distinction between a *task-level schema* versus the *input keys, output keys, and input templates* in a task definition. The schema enforces validation on a payload, while the latter parameters are non-enforceable guides.


## Schema formats

Currently, schemas can be defined in the [JSON Schema](https://json-schema.org/specification) format. Like workflows, schemas can be versioned.

**Example**
``` json
{
  "createTime": 1727378396701,
  "updateTime": 1727378396701,
  "createdBy": "user@example.com",
  "updatedBy": "user@example.com",
  "name": "itemSchema",
  "version": 1,
  "type": "JSON", // set schema type as JSON Schema
  "data": { // include the JSON Schema parameters here
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/product.schema.json",
    "type": "object",
    "properties": {
      "productId": {
        "description": "The unique identifier for a product",
        "type": "integer"
      },
      "productName": {
        "description": "Name of the product",
        "type": "string"
      }
    },
    "required": [
      "productId"
    ]
  }
}
```

## Using schemas

To enforce validation for input/output payloads, schemas can be added to:
* **A workflow definition**—Enforce workflow inputs.
* **A task definition**—Enforce task inputs/outputs for all instances of the task.
* **A task configuration**—Enforce task inputs/outputs for a specific workflow.

Here is an overview of using schemas in Conductor workflows:
1. Define a schema for a task’s or workflow’s inputs/outputs.
2. Add the schema in a workflow definition, task definition, or task configuration.


### Step 1: Define a schema

The Orkes Platform can be used to define schemas.

**To define a schema:**
1. Log in to your Orkes Conductor cluster.
2. Go to **Definitions** > **Schemas**.
3. Select **(+) New schema** on the top right.
    A schema editor opens.
4. Add your schema definition in the `data` object. Make sure to fill out at least the `$schema`, `$id`,  `type`, and `properties` parameters as outlined in the JSON Schema.

Learn more about creating a JSON Schema in [their documentation](https://json-schema.org/learn/getting-started-step-by-step).


### Step 2: Add schema to workflow or task

If the version is unspecified, the latest schema version will be used.

**To add a schema:**

<Tabs>
<TabItem value="Task-definition" label="Task definition">

1. Go to **Definitions** > **Task**.
2. Select a task definition that you want to add a schema to.
3. In the Schema section, select a schema to use as an **Input Schema** or **Output Schema**.
4. Select a **Version** for the schema.
5. Switch on the **Enforce schema** toggle.
6. Select **Save** in the top right.

``` json
// task definition

{
...
  "inputSchema": {
    "name": "itemSchema",
    "version": 1,
    "type": "JSON"
  },
  "outputSchema": {
    "name": "outputSchema",
    "type": "JSON"
  }
  "enforceSchema": true
}
```

</TabItem>

<TabItem value="Task-configuration" label="Task configuration">

1. Go to **Definitions** > **Workflow**.
2. Select a workflow that you want to add a task-level schema to.
3. In the visual workflow editor, select a task.
4. In the Schema section, select a schema to use as an **Input Schema** or **Output Schema**.
5. Select a **Version** for the schema.
6. Switch on the **Enforce schema** toggle.
7. Select **Save** > **Confirm** in the top right.

``` json
// workflow definition

{
...
  "tasks": [
    {
      "name": "getItem",
      "taskReferenceName": "getItem_ref",
      "inputParameters": {
        "productId": 1,
        "productName": "toy"
      },
      "type": "SIMPLE",
      "taskDefinition": {
        "inputSchema": {
          "createTime": 0,
          "updateTime": 0,
          "name": "itemSchema",
          "type": "JSON"
        },
        "outputSchema": {
          "name": "outputSchema",
          "version": 1,
          "type": "JSON"
        },
        "enforceSchema": true
      }
    }
  ]
}
```

</TabItem>

<TabItem value="Workflow-definition" label="Workflow definition">

1. Go to **Definitions** > **Workflow**.
2. Select a workflow that you want to add a task-level schema to.
3. In the Schema section of the Workflow tab, select a schema to use as an **Input Schema**.
4. Select a **Version** for the schema.
5. Switch on the **Enforce schema** toggle.
6. Select **Save** > **Confirm** in the top right.

``` json
// workflow definition

{
...
  "inputSchema": {
    "name": "itemSchema",
    "version": 1,
    "type": "JSON"
  },
  "enforceSchema": true
}
```

</TabItem>
</Tabs>

Once the schema is added, modify your workflow or task inputs/outputs to match the schema.


## Workflow behavior with schemas

If a workflow does not pass its schema validation, it will not be allowed to execute.

<p align="center"><img src="/content/img/dev-guides/input_output_validation-execution_failure.png" alt="Screenshot of execution failure due to invalid inputs." width="100%" height="auto"></img></p>

If a task does not pass its schema validation, it will fail with a terminal error.

<p align="center"><img src="/content/img/dev-guides/input_output_validation-task_failure.png" alt="Screenshot of task failure due to invalid inputs or outputs." width="100%" height="auto"></img></p>

