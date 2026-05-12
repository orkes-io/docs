---
title: "Import BPMN Files as Workflows"
description: "Learn how to convert BPMN files into Orkes Conductor workflows. Upload .bpmn or XML files and migrate your existing process definitions with no code required."
---

# Import BPMN Files as Workflows

!!! info "Available since"
    v5.0.1 and later

Use the BPMN importer when you already have process models in BPMN or XML and want to bootstrap equivalent Conductor workflow definitions. Treat the imported workflow as a starting point: review task names, inputs, outputs, error handling, and worker boundaries before using it in production.

!!! tip "5-minute path"
    Import the BPMN file, inspect the generated workflow JSON, normalize task reference names, add retries and timeouts, then test the workflow with representative input.

## What gets imported

The importer converts supported BPMN structure into a Conductor workflow definition. After import, the workflow behaves like any other Conductor workflow: it can be versioned, started by API, tested, monitored, and edited.

Common post-import checks:

- Workflow `name`, `version`, `description`, and `ownerEmail`
- Task names and `taskReferenceName` values
- Inputs expected by each task
- Output mappings used by downstream tasks
- Branches, joins, loops, waits, and sub-process equivalents
- Retry, timeout, and compensation behavior

## Importing BPMN files

Import from **Definitions > Workflows > Import BPMN** in the Conductor UI. You can upload a `.bpmn` file, drag and drop the file, or paste raw BPMN XML.

Before importing into a shared environment, decide whether the importer may overwrite an existing workflow with the same name. For production, prefer creating a new workflow name or version, then promote it deliberately.

## Validate the generated workflow

After import, inspect the generated workflow definition rather than trusting the visual shape alone.

```json
{
  "name": "imported_order_process",
  "version": 1,
  "schemaVersion": 2,
  "tasks": [
    {
      "name": "validate_order",
      "taskReferenceName": "validate_order_ref",
      "type": "SIMPLE",
      "inputParameters": {
        "orderId": "${workflow.input.orderId}"
      }
    }
  ]
}
```

Focus on these production requirements:

- Use stable task reference names because downstream expressions and recovery operations depend on them.
- Register task definitions for worker tasks.
- Add `retryCount`, `retryLogic`, `timeoutSeconds`, `responseTimeoutSeconds`, and `pollTimeoutSeconds` where needed.
- Add schemas if workflow or task input contracts must be validated.
- Add a failure workflow if the process needs compensation.

## Production notes

- BPMN import is a migration tool, not a replacement for reviewing the generated workflow contract.
- Imported workflows should go through the same testing and versioning process as hand-authored workflows.
- Keep existing URLs and external callers pinned to known workflow versions while migrating.
- Use [Versioning Workflows](/content/developer-guides/versioning-workflows) and [Executing Workflows](/content/developer-guides/running-workflows) before moving traffic.
