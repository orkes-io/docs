---
sidebar_position: 1
---
# Sub Workflow Task

## What is a Sub Workflow Task?

Sub Workflow task allows for nesting a workflow within another workflow.

## Common Use Cases

Suppose we want to include another workflow inside our current workflow. In that
case, Sub Workflow Task would be used.

## Configuration / Properties

Sub Workflow task is defined directly inside the workflow with `"SUB_WORKFLOW"`.

### Inputs

**Parameters:**

|name|type|description|
|---|---|---|
| subWorkflowParam | Map[String, Any] | See below |

**subWorkflowParam**

|name|type|description|
|---|---|---|
| name | String | Name of the workflow to execute |
| version | Integer | Version of the workflow to execute |
| taskToDomain | Map[String, String] | Allows scheduling the sub workflow's tasks per given mappings. See [Task Domains](conductor/configuration/taskdomains/) for instructions to configure taskDomains. |
| workflowDefinition | [WorkflowDefinition](conductor/configuration/workflowdef/) | Allows starting a subworkflow with a dynamic workflow definition. |

### Output

|name|type|description|
|---|---|---|
| subWorkflowId | String | Subworkflow execution Id generated when running the subworkflow |
0
## Examples

Suppose in a workflow, we have to run another workflow. Consider the example that we took
in Dynamic Task. Let's extend that example. Suppose in an E-Commerce website user places
the order we have to take the decision based on the inputs to ship the product via a
courier service. We can run another workflow inside our workflow which we already
created in `Dynamic Task`.

Following task `order_details` fetches data about the order.

```json
{
  "name": "order_details",
  "retryCount": 1,
  "timeoutSeconds": 600,
  "pollTimeoutSeconds": 1200,
  "timeoutPolicy": "TIME_OUT_WF",
  "retryLogic": "FIXED",
  "retryDelaySeconds": 300,
  "responseTimeoutSeconds": 300,
  "concurrentExecLimit": 100,
  "rateLimitFrequencyInSeconds": 60,
  "ownerEmail":"abc@example.com",
  "rateLimitPerFrequency": 1
}
```

Now we will be nesting the workflow named `Shipping_Flow` (defined inside Dynamic Task section)
inside our new Workflow by following definition -

```json
{
  "name": "E_Commerce_Website_Example",
  "description": "E_Commerce_Website_Example",
  "version": 1,
  "tasks": [
    {
      "name": "order_details",
      "taskReferenceName": "order_details",
      "inputParameters": {
      },
      "type": "SIMPLE"
    },
    {
      "name": "Shipping_Flow",
      "taskReferenceName": "Shipping_Flow",
      "type": "SUB_WORKFLOW",
      "inputParameters": {
        "subWorkflowParam": {
          "name": "Shipping_Flow",
          "version": 1,
          "taskToDomain": {
            "*": "mydomain"
          },
          "workflowDefinition": {
            "name": "Shipping_Flow",
            "description": "Ships smartly on the basis of Shipping info",
            "version": 1,
            "tasks": [
              {
                "name": "shipping_info",
                "taskReferenceName": "shipping_info",
                "inputParameters": {
                },
                "type": "SIMPLE"
              },
              {
                "name": "shipping_task",
                "taskReferenceName": "shipping_task",
                "inputParameters": {
                  "taskToExecute": "${shipping_info.output.shipping_service}"
                },
                "type": "DYNAMIC",
                "dynamicTaskNameParam": "taskToExecute"
              }

            ],
            "restartable": true,
            "ownerEmail":"abc@example.com",
            "workflowStatusListenerEnabled": true,
            "schemaVersion": 2
          }
        }
      }
    }

  ],
  "restartable": true,
  "ownerEmail":"abc@example.com",
  "workflowStatusListenerEnabled": true,
  "schemaVersion": 2
}
```

Workflow is the created as shown in the below diagram.

![Conductor UI - Workflow Diagram](/img/tutorial/SubWorkflow.png)

We can see in the above diagram that Workflow named `Shipping_Flow` gets nested inside
the workflow we just created. Hence, in scenarios where we need to nest a workflow inside
another workflow `Set Workflow` task can be used.

We can create workers as we did in `Dynamic Task` section and for running this workflow.

After execution workflow looks like.

![Conductor UI - Workflow Diagram](/img/tutorial/Sub_Workflow_Run.png)



## FAQs

TODO: Gotchas and other nuances

1. Question 1
    1. Answer

1. Question 2
    1. Answer
