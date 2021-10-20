---
sidebar_position: 4
---

# Sub Workflow Task


### What is Sub Workflow Task?

Sub Workflow task allows for nesting a workflow within another workflow.

### What is a common Sub Workflow Task use case?

Suppose we want to include another workflow inside our current workflow. In that 
case, Sub Workflow Task would be used.

### How is it defined?

Sub Workflow task is defined directly inside the workflow with `"SUB_WORKFLOW"`.

### Example of Sub Workflow Task

```json
{
    "name": "sub_workflow_task",
    "taskReferenceName": "sub1",
    "type": "SUB_WORKFLOW",
    "inputParameters": {
        "subWorkflowParam": {
            "name": "deployment_workflow",
            "version": 1,
            "taskToDomain": {
                "*": "mydomain"
            },
            "workflowDefinition": {
                "name": "deployment_workflow",
                "description": "Deploys to CDN",
                "version": 1,
                "tasks": [{
                    "name": "deploy",
                    "taskReferenceName": "d1",
                    "type": "SIMPLE",
                    "inputParameters": {
                        "fileLocation": "${workflow.input.encodeLocation}"
                    }
                }],
                "outputParameters": {
                    "cdn_url": "${d1.output.location}"
                },
                "failureWorkflow": "cleanup_encode_resources",
                "restartable": true,
                "workflowStatusListenerEnabled": true,
                "schemaVersion": 2
            }
        },
        "anythingelse": "value"
    }
}
```

Following are the parameters inside `subWorkflowParam` in the above example :

1. `"name"` - Name of the workflow to execute.
2. `"version"` - Version of the workflow to execute.
3. `"taskToDomain"` - Allows scheduling the sub workflow's tasks per given mappings. 
See Task Domains for instructions to configure taskDomains.
4. `"workflowDefinition"` - Allows starting a subworkflow with a dynamic 
workflow definition.

Following are the Outputs :

1. `"subWorkflowId"` - Subworkflow execution Id generated when 
running the subworkflow.





