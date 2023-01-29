---
sidebar_position: 4
---

# Terminate Workflow Task

```json
"type" : "TERMINATE_WORKFLOW"
```

### Introduction
TERMINATE_WORKFLOW is a task used to terminate one or more workflows using workflow IDs.

### Use Cases
Consider a use case where you want to terminate a long-running workflow (or a set of workflows) from another, unrelated workflow.

### Configuration

#### Input Configuration

| Attribute         | Description                                                                                                                                                                 |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| workflowId        | Either a workflow ID or a list of workflow IDs.                                                                                                                             |
| terminationReason | Optional text used to update the reason for the workflows being terminated. |

#### Output Configuration
Task output will contain the field "terminatedWorkflows", which is a set of workflow IDs corresponding to the workflows that were terminated.

## Example

Sample task

```json
{
  "name": "terminate_workflow_example",
  "taskReferenceName": "terminate_wfs_1",
  "inputParameters": {
    "workflowId": ["0ea3b193-7268-4886-aa97-d6ed170de854", "${workflow.input.idProvidedFromWorkflowInput}"],
    "terminationReason": "Custom reason for termination"
  },
  "type": "TERMINATE_WORKFLOW"
}
```