---
title: "Import BPMN Files as Workflows"
description: "Learn how to convert BPMN files into Orkes Conductor workflows. Upload .bpmn or XML files and migrate your existing process definitions with no code required."
canonical_route: "developer-guides/convert-bpmn-to-workflows"
updated: "2026-05-14"
keywords: "Orkes Conductor, workflow orchestration, Import BPMN Files as Workflows"
---

# Import BPMN Files as Workflows

!!! info "Available since"
    - v5.0.1 and later

In Orkes Conductor, you can quickly convert BPMN (Business Process Model and Notation) files into workflow definitions. This simplifies the migration from BPMN-based systems by supporting standard XML and BPMN formats. Whether you’re transitioning from legacy tools or starting with predefined processes, the BPMN importer enables a fast, code-free transition into the Conductor ecosystem.

!!! tip "5-minute path"
    Import the BPMN file, inspect the generated workflow JSON, normalize task reference names, add retries and timeouts, then test the workflow with representative input.

## Importing BPMN files

**To import a BPMN file:**

1. Go to **Definitions** > **Workflow** from the left navigation menu on your Conductor cluster.
2. Select the **⏷** icon next to **+ Define workflow**.
3. From the dropdown menu, select **Import BPMN**.
   <p align="center"><img src="/content/img/import-bpmn.png" alt="Importing BPMN files" width="100%" height="auto"></img></p>
4. Import files using one of the following methods:
    - **Select file**: Upload a .bpmn file from your local device.
    - **Drag and drop**: Drop the BPMN files directly into the designated area in the UI.
    - **Code**: Paste the raw XML content of your BPMN directly in the code tab.
   <p align="center"><img src="/content/img/bpmn-importer.png" alt="BPMN Importer" width="50%" height="auto"></img></p>
5. The **Workflow Name** field is pre-filled with the file name by default. Edit it if you want to use a different name.
6. Toggle **Overwrite workflow** on to replace an existing workflow definition with the same name.  Disable this option if you want to prevent overwrites.
7. Select **Import**.

The BPMN file is converted into workflow definitions in Orkes Conductor. Each process defined in the imported BPMN file is converted into an equivalent Orkes Conductor workflow definition. 
 
<p align="center"><img src="/content/img/converting-bpmn-to-workflow.gif" alt="BPMN Importer" width="100%" height="auto"></img></p>

After importing, the newly created workflows appear in **Definitions** > **Workflows**. 

The import will fail with an error if the BPMN file:

- Contains a circular reference
- Has multiple start events
- Is incomplete or malformed

## Validate the generated workflow

The BPMN importer converts supported BPMN structure into a Conductor workflow definition. After import, the workflow behaves like any other Conductor workflow: it can be versioned, started by API, tested, monitored, and edited. Inspect the generated workflow definition rather than trusting the visual shape alone.

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

Check the following after every BPMN import:

- Workflow `name`, `version`, `description`, and `ownerEmail`.
- Task names and `taskReferenceName` values. Use stable reference names because downstream expressions and recovery operations depend on them.
- Inputs expected by each task and output mappings used by downstream tasks.
- Branches, joins, loops, waits, and sub-process equivalents.
- Retry, timeout, and compensation behavior. Register task definitions for worker tasks, and add `retryCount`, `retryLogic`, `timeoutSeconds`, `responseTimeoutSeconds`, and `pollTimeoutSeconds` where needed.
- Schemas, if workflow or task input contracts must be validated.
- A failure workflow, if the process needs compensation.

## Production notes

- BPMN import is a migration tool, not a replacement for reviewing the generated workflow contract.
- Imported workflows should go through the same testing and versioning process as hand-authored workflows.
- Keep existing URLs and external callers pinned to known workflow versions while migrating.
- Use [Versioning Workflows](/content/developer-guides/versioning-workflows) and [Executing Workflows](/content/developer-guides/running-workflows) before moving traffic.

## Related pages

- [Workflows](/content/developer-guides/workflows)
- [Write Workflows Using Code](/content/developer-guides/write-workflows-using-code)
- [Build Workflows Using Conductor UI](/content/developer-guides/build-workflows-using-ui)
- [Versioning Workflows](/content/developer-guides/versioning-workflows)
- [Executing Workflows](/content/developer-guides/running-workflows)
- [Scheduling Workflows](/content/developer-guides/scheduling-workflows)
